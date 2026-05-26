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

const wss = new WebSocketServer({ server, path: "/ws" });
const rooms = new Map();

function getRoom(roomCode) {
  const code = String(roomCode || "battle").trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "battle";
  if (!rooms.has(code)) {
    rooms.set(code, {
      p1: null,
      p2: null,
      spectators: new Set()
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

function send(ws, data) {
  if (ws && ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(data));
  }
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

  if (room.p1 === ws) room.p1 = null;
  if (room.p2 === ws) room.p2 = null;
  room.spectators.delete(ws);

  broadcastRoom(ws.roomCode);

  if (!room.p1 && !room.p2 && room.spectators.size === 0) {
    rooms.delete(ws.roomCode);
  }
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
  const { code, room } = getRoom(requestUrl.searchParams.get("room"));
  const requestedSide = requestUrl.searchParams.get("side");

  ws.roomCode = code;
  ws.role = assignRole(room, requestedSide, ws);

  if (ws.role === "spectator") {
    room.spectators.add(ws);
  }

  send(ws, { type: "role", role: ws.role });
  broadcastRoom(code);

  ws.on("message", (raw) => {
    let data;
    try {
      data = JSON.parse(raw.toString());
    } catch {
      return;
    }

    const activeRoom = rooms.get(ws.roomCode);
    if (!activeRoom) return;

    const targets = [];
    if (ws === activeRoom.p1 && activeRoom.p2) targets.push(activeRoom.p2);
    else if (ws === activeRoom.p2 && activeRoom.p1) targets.push(activeRoom.p1);
    else {
      if (activeRoom.p1) targets.push(activeRoom.p1);
      if (activeRoom.p2) targets.push(activeRoom.p2);
    }

    for (const spectator of activeRoom.spectators) targets.push(spectator);

    for (const target of targets) {
      if (target !== ws) send(target, data);
    }
  });

  ws.on("close", () => removeFromRoom(ws));
  ws.on("error", () => removeFromRoom(ws));
});

server.listen(PORT, () => {
  console.log(`Jujutsu Brawl running at http://localhost:${PORT}`);
  console.log("Online mode uses ws://localhost:" + PORT + "/ws");
});
