/* Remote presentation only: combat continues to use the received simulation state. */
let onlineMotionSamples = new WeakMap();

function resetOnlineMotion() { onlineMotionSamples = new WeakMap(); }

function recordOnlineMotion(f, packet, now = performance.now()) {
  if (!f || !packet || !Number.isFinite(packet.x) || !Number.isFinite(packet.y)) return;
  const old = onlineMotionSamples.get(f);
  const discontinuity = !old || Math.hypot(packet.x-old.x,packet.y-old.y)>140 ||
    old.technique !== packet.technique || old.ko !== packet.ko || now-old.received>250 ||
    (packet.castPoseMove==='teleport' && packet.castPoseTicks > (old.castPoseTicks || 0));
  onlineMotionSamples.set(f, {
    ...packet, received:now, rendered:now,
    displayX:discontinuity?packet.x:old.displayX,
    displayY:discontinuity?packet.y:old.displayY,
    // Velocity is estimated from successive snapshots, not post-friction vx.
    travelX:!discontinuity && now>old.received ? (packet.x-old.x)/(now-old.received) : 0,
    travelY:!discontinuity && now>old.received ? (packet.y-old.y)/(now-old.received) : 0
  });
}

function sampleOnlineMotion(f, now = performance.now()) {
  const s = onlineMotionSamples.get(f);
  if (!s || gameMode !== 'online' || paused || gameState !== 'playing' || onlineWaiting) return null;
  const age = Math.min(75, Math.max(0,now-s.received));
  const dt = Math.min(50, Math.max(0,now-s.rendered));
  const alpha = 1-Math.exp(-dt/22);
  const targetX = s.x + (Math.abs(s.vx||0)>.1 ? s.travelX*age : 0);
  const targetY = s.y + (!s.grounded ? s.travelY*age : 0);
  s.displayX += (targetX-s.displayX)*alpha;
  s.displayY += (targetY-s.displayY)*alpha;
  s.rendered = now;
  return {x:s.displayX,y:s.displayY,age};
}

function drawOnlineFighter(f, label, color) {
  const remote = gameMode==='online' && (onlineRole==='p2'?f===player:onlineRole==='p1'?f===enemy:true);
  const pose = remote ? sampleOnlineMotion(f) : null;
  if (!pose) return drawFighter(f,label,color);
  const saved = {x:f.x,y:f.y,walkCycle:f.walkCycle,attackFrame:f.attackFrame};
  // Retain object identity for owner/opponent lookups; restore before any simulation.
  try {
    f.x=pose.x; f.y=pose.y;
    if (!f.attacking && f.grounded) f.walkCycle=(f.walkCycle||0)+Math.abs(f.vx||0)*.095*pose.age/FIXED_STEP;
    if (['light','heavy'].includes(f.attacking)) {
      const spec=getAttackSpec(f);
      f.attackFrame=Math.min(spec.windup+spec.active+spec.recovery,f.attackFrame+pose.age/FIXED_STEP);
    }
    drawFighter(f,label,color);
  } finally { Object.assign(f,saved); }
}
