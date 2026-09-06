const http = require("http");
const fs = require("fs");
const path = require("path");
const { WebSocketServer } = require("ws");

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function safeFilePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = decoded === "/" ? "/index.html" : decoded;
  const fullPath = path.normalize(path.join(PUBLIC_DIR, cleanPath));
  if (!fullPath.startsWith(PUBLIC_DIR)) return null;
  return fullPath;
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {"Content-Type":"application/json", "Cache-Control":"no-store"});
    res.end(JSON.stringify({status:"ok",release:"punch-network-20260906"}));
    return;
  }
  const filePath = safeFilePath(req.url);
  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server, path: "/ws", maxPayload: 256 * 1024,
  perMessageDeflate: {
    threshold: 1024, concurrencyLimit: 4,
    serverNoContextTakeover: true, clientNoContextTakeover: true,
    zlibDeflateOptions: {level: 1, memLevel: 4}
  }
});
const rooms = new Map();

function getRoom(roomCode) {
  const code = String(roomCode || "battle").trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "battle";
  if (!rooms.has(code)) {
    rooms.set(code, {
      p1: null,
      p2: null,
      spectators: new Set(),
      metadata: new Map()
    });
  }
  return { code, room: rooms.get(code) };
}

function roomCounts(room) {
  return {
    p1: room.p1 && room.p1.readyState === room.p1.OPEN ? 1 : 0,
    p2: room.p2 && room.p2.readyState === room.p2.OPEN ? 1 : 0
  };
}

function send(ws, data, encoded = null) {
  if (!ws || ws.readyState !== ws.OPEN) return;
  const text = encoded || JSON.stringify(data);
  const snapshot = data.type === "state" || data.type === "fighter";
  if (snapshot && ws.bufferedAmount > 16384) {
    // Full snapshots supersede older snapshots. Never queue seconds of stale motion.
    if (!ws.pendingSnapshots) ws.pendingSnapshots = new Map();
    ws.pendingSnapshots.set(data.type, text);
    return;
  }
  if (snapshot) ws.pendingSnapshots?.delete(data.type);
  ws.send(text);
}

function broadcastRoom(code) {
  const room = rooms.get(code);
  if (!room) return;

  const payload = { type: "room", players: roomCounts(room) };
  for (const ws of [room.p1, room.p2, ...room.spectators]) {
    send(ws, payload);
  }
}

function removeFromRoom(ws) {
  if (!ws.roomCode) return;
  const room = rooms.get(ws.roomCode);
  if (!room) return;

  const occupied = room.p1 === ws || room.p2 === ws;
  if (room.p1 === ws) room.p1 = null;
  if (room.p2 === ws) room.p2 = null;
  room.spectators.delete(ws);
  if (occupied) for (const key of room.metadata.keys()) if (key.startsWith(ws.role + ":")) room.metadata.delete(key);
  ws.pendingSnapshots?.clear();

  broadcastRoom(ws.roomCode);

  if (!room.p1 && !room.p2 && room.spectators.size === 0) {
    rooms.delete(ws.roomCode);
  }
  ws.roomCode = null;
}

function assignRole(room, requestedSide, ws) {
  const side = String(requestedSide || "").toLowerCase();

  if (side === "host") {
    if (!room.p1 || room.p1.readyState !== room.p1.OPEN) {
      room.p1 = ws;
      return "p1";
    }
    return "spectator";
  }

  if (side === "join") {
    if (!room.p2 || room.p2.readyState !== room.p2.OPEN) {
      room.p2 = ws;
      return "p2";
    }
    return "spectator";
  }

  if (!room.p1 || room.p1.readyState !== room.p1.OPEN) {
    room.p1 = ws;
    return "p1";
  }

  if (!room.p2 || room.p2.readyState !== room.p2.OPEN) {
    room.p2 = ws;
    return "p2";
  }

  return "spectator";
}

wss.on("connection", (ws, req) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const requestedSide = requestUrl.searchParams.get("side");
  const requestedCode = String(requestUrl.searchParams.get("room") || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  const existing = rooms.get(requestedCode);
  if (requestedSide === "join" && (!existing?.p1 || existing.p1.readyState !== ws.OPEN)) {
    send(ws, {type:"room-error",code:"not-found",message:"No host is using that code. Check the code with your friend and try again."});
    ws.close(1008,"Host not found");
    return;
  }
  if ((requestedSide === "host" && existing?.p1?.readyState === ws.OPEN) ||
      (requestedSide === "join" && existing?.p2?.readyState === ws.OPEN)) {
    send(ws, {type:"room-error",code:"full",message:"That spot is already taken. Use another battle code."});
    ws.close(1008,"Room full");
    return;
  }
  const { code, room } = getRoom(requestedCode);

  ws.roomCode = code;
  ws.role = assignRole(room, requestedSide, ws);
  ws.alive = true;
  ws.on("pong", () => { ws.alive = true; });

  if (ws.role === "spectator") {
    room.spectators.add(ws);
  }

  send(ws, { type: "role", role: ws.role });
  for (const entry of room.metadata.values()) send(ws, entry);
  broadcastRoom(code);

  ws.on("message", (raw) => {
    let data;
    try {
      data = JSON.parse(raw.toString());
    } catch {
      return;
    }

    const activeRoom = rooms.get(ws.roomCode);
    if (!activeRoom || !data || typeof data !== "object" || ws.role === "spectator") return;
    if (["role","room","room-error"].includes(data.type)) return;
    if (data.type === "state" && ws !== activeRoom.p1) return;
    if (["fighter","input","damage"].includes(data.type) && ws !== activeRoom.p2) return;
    if (data.type === "stage" && ws !== activeRoom.p1) return;
    if ("role" in data) data.role = ws.role;
    if (["name","technique","stage"].includes(data.type)) activeRoom.metadata.set(ws.role+":"+data.type,data);
    // Serialize once, independent of how many clients receive the message.
    const encoded = JSON.stringify(data);

    const targets = [];
    if (ws === activeRoom.p1 && activeRoom.p2) targets.push(activeRoom.p2);
    else if (ws === activeRoom.p2 && activeRoom.p1) targets.push(activeRoom.p1);
    else {
      if (activeRoom.p1) targets.push(activeRoom.p1);
      if (activeRoom.p2) targets.push(activeRoom.p2);
    }

    for (const spectator of activeRoom.spectators) targets.push(spectator);

    for (const target of targets) {
      if (target !== ws) send(target, data, encoded);
    }
  });

  ws.on("close", () => removeFromRoom(ws));
  ws.on("error", () => removeFromRoom(ws));
});

const snapshotFlush = setInterval(() => {
  for (const ws of wss.clients) {
    if (ws.readyState !== ws.OPEN || ws.bufferedAmount > 16384 || !ws.pendingSnapshots?.size) continue;
    for (const text of ws.pendingSnapshots.values()) ws.send(text);
    ws.pendingSnapshots.clear();
  }
}, 16);
snapshotFlush.unref();
const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (ws.alive === false) { removeFromRoom(ws); ws.terminate(); continue; }
    ws.alive = false;
    ws.ping();
  }
}, 15000);
heartbeat.unref();
wss.on("close", () => { clearInterval(snapshotFlush); clearInterval(heartbeat); });

if (require.main === module) server.listen(PORT, () => {
  console.log(`Universal Brawl running on port ${PORT}`);
});
module.exports = {server,wss,rooms,send};
