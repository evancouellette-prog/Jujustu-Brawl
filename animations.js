/* Presentation-only motion. Collision boxes and move timing remain in game.js. */
function motionEase(t) { t = clamp01(t); return t * t * (3 - 2 * t); }

function tickFighterMotion(f) {
  if (!f) return;
  const moving = f.grounded && Math.abs(f.vx) > 0.35 && !f.attacking && !f.blocking && !f.ko && f.stun <= 0;
  f.motionBlend = lerp(f.motionBlend || 0, moving ? Math.min(1, Math.abs(f.vx) / 3) : 0, 0.22);
  f.motionAir = lerp(f.motionAir || 0, f.grounded || f.ko ? 0 : 1, 0.32);
  if (f.motionWasGrounded === false && f.grounded && !f.ko) f.motionLanding = Math.min(1, Math.abs(f.motionLastVy || 0) / 12);
  else f.motionLanding = Math.max(0, (f.motionLanding || 0) - 0.12);
  f.motionWasGrounded = f.grounded;
  f.motionLastVy = f.vy;
  if (f.castPoseTicks > 0) f.castPoseTicks -= 1;
  if (f.ko || f.stun > 0) f.castPoseTicks = 0;
}

function getFighterMotion(f) {
  const travel = !f.ko && !f.attacking && !f.blocking && f.stun <= 0;
  const blend = travel ? (f.motionBlend ?? (f.grounded ? Math.min(1, Math.abs(f.vx) / 3) : 0)) : 0;
  const backward = f.vx * f.dir < -0.1;
  const phase = f.walkCycle || 0;
  const air = f.ko ? 0 : (f.motionAir ?? (f.grounded ? 0 : 1));
  const falling = motionEase((f.vy + 3) / 10);
  const landing = f.motionLanding || 0;
  const step = (offset, hip) => {
    const t = ((phase / (Math.PI * 2) + offset) % 1 + 1) % 1;
    // Long planted phase, then a lifted return: the foot rolls heel-to-toe.
    const swing = t >= 0.58;
    const u = swing ? (t - 0.58) / 0.42 : t / 0.58;
    const stride = (backward ? 9 : 16) * blend;
    const x = (swing ? lerp(-stride, stride, motionEase(u)) : lerp(stride, -stride, u)) * (backward ? -1 : 1);
    return { x: hip + x, y: 124 - (swing ? Math.sin(u * Math.PI) * (backward ? 7 : 15) * blend : 0), roll: (swing ? Math.sin(u * Math.PI) * -0.24 : lerp(-0.1, 0.15, u)) * blend };
  };
  const leftFoot = step(0.5, 15), rightFoot = step(0, 39);
  const airLeft = {x:lerp(4,12,falling),y:lerp(107,121,falling)};
  const airRight = {x:lerp(49,44,falling),y:lerp(100,117,falling)};
  for (const [foot,target] of [[leftFoot,airLeft],[rightFoot,airRight]]) {
    foot.x=lerp(foot.x,target.x,air);foot.y=lerp(foot.y,target.y,air);
  }
  const knee = (hip,foot,front) => ({x:lerp((hip+foot.x)/2+8, front?52:21,air*(1-falling)),y:lerp(101-landing*8,foot.y-22,air)});
  return {blend,backward,air,falling,landing,leftFoot,rightFoot,
    leftKnee:knee(18,leftFoot,false),rightKnee:knee(34,rightFoot,true),
    bob:Math.abs(Math.sin(phase))*3.5*blend,
    tilt:(backward?-0.045:0.075)*blend + (f.vx*f.dir/80)*air,
    squash:landing*0.055,armSwing:Math.cos(phase)*blend};
}

// Two fixed-length bones, one elbow bend: never stretch an arm to reach a pose.
function solvePunchArm(shoulder, target, upper = 23, forearm = 25) {
  const coincident = target.x === shoulder.x && target.y === shoulder.y;
  const dx = coincident ? 1 : target.x - shoulder.x, dy = target.y - shoulder.y;
  const distance = Math.hypot(dx, dy) || 1;
  const reach = Math.max(Math.abs(upper - forearm) + 1, Math.min(upper + forearm - 1, distance));
  const ux = dx / distance, uy = dy / distance;
  const along = (upper * upper - forearm * forearm + reach * reach) / (2 * reach);
  const bend = Math.sqrt(Math.max(0, upper * upper - along * along));
  // Keep one bend direction throughout the strike; changing IK branches snaps elbows.
  const side = 1;
  return { shoulder, elbow: {x: shoulder.x + ux * along - uy * bend * side, y: shoulder.y + uy * along + ux * bend * side},
    fist: {x: shoulder.x + ux * reach, y: shoulder.y + uy * reach} };
}

function getPunchRig(f, load, drive, heavy = false) {
  const count = getPunchArmCount(f);
  const activeArm = (f.punchArm || 0) % count;
  const cross = activeArm % 2 === 1;
  const turn = cross ? drive * 0.78 : -drive * 0.08;
  const ready = Math.max(load, drive);
  const rests = [{x:46,y:81},{x:7,y:81},{x:45,y:88},{x:8,y:89}];
  const arms = rests.slice(0, count).map((rest, index) => {
    const rear = index % 2 === 1, lower = index >= 2;
    const shoulder = {x: (rear ? 11 : 42) + (rear ? 29 : -22) * turn, y: (lower ? 65 : 51) - drive * 2};
    const guard = {x: shoulder.x + (rear ? 5 : 3), y: shoulder.y - (lower ? 1 : 6)};
    let target = {x: lerp(rest.x, guard.x, ready), y: lerp(rest.y, guard.y, ready)};
    if (index === activeArm) {
      const cock = {x: shoulder.x + (heavy ? -5 : 5), y: shoulder.y + (heavy ? 5 : -3)};
      const contact = {x: shoulder.x + (heavy ? 44 : 42), y: shoulder.y - (lower ? 10 : heavy ? 7 : 2)};
      target = {x: rest.x + (cock.x-rest.x)*load + (contact.x-rest.x)*drive,
        y: rest.y + (cock.y-rest.y)*load + (contact.y-rest.y)*drive};
    }
    return {...solvePunchArm(shoulder, target), index, striking: index === activeArm};
  });
  const active = arms[activeArm];
  return {load, drive, activeArm, arms, ...active,
    tilt: -load * (heavy ? 0.09 : 0.04) + drive * (heavy ? 0.13 : cross ? 0.09 : 0.05)};
}

function getPunchMotion(f) {
  if (f.attacking === 'barrage') {
    const elapsed = Math.max(0, (f.barrageDuration || SUKUNA_BARRAGE_DURATION_TICKS) - f.barrageTimer - 1);
    const interval = getSukunaBarrageInterval(f);
    const phase = Math.max(0, elapsed - (f.barrageHitsDone || 0)*interval);
    const drive = f.barrageHitsDone > 0 ? 1-motionEase(phase/Math.max(1,interval-1)) : 0;
    return getPunchRig(f, 0, drive);
  }
  const spec = getAttackSpec(f);
  if (!spec || !['light','heavy'].includes(f.attacking)) return null;
  const heavy = f.attacking === 'heavy', age=f.attackFrame;
  const windupEnd=Math.max(0,spec.windup-Math.min(3,spec.windup));
  const anticipation=motionEase(age/Math.max(1,windupEnd));
  const strike=motionEase((age-windupEnd)/Math.max(1,spec.windup-windupEnd));
  const recover=motionEase((age-spec.windup-spec.active)/Math.max(1,spec.recovery));
  const load=anticipation*(1-strike), drive=strike*(1-recover);
  return getPunchRig(f, load, drive, heavy);
}

function drawPunchArms(f, drawArm, motion) {
  // Guarding arms first, the single striking arm last. No duplicate arm pass.
  for (const arm of [...motion.arms.filter(a=>!a.striking), motion.arms[motion.activeArm]]) {
    drawArm(arm.shoulder, arm.elbow, arm.fist);
  }
}

function getRyukPunchArms(hand, activeArm = 0) {
  const drive = hand ? clamp01((hand.x-22)/(LIGHT_RYUK_REACH-22)) : 0;
  const cross = activeArm === 1;
  return [0,1].map(index => {
    const rear = index === 1;
    const shoulder = {x: (rear ? -15 : 16) + (cross ? (rear ? 31 : -24)*drive : 0), y:-72};
    let target = {x:rear?-16:22,y:-46};
    if (hand && index === activeArm) target = {...hand, x:hand.x-(rear?38*(1-drive):0)};
    else if (hand) target = {x:lerp(target.x,shoulder.x+3,drive),y:lerp(-46,-80,drive)};
    return solvePunchArm(shoulder,target,27,28);
  });
}

function drawMovingArms(f,drawArm,skin,motion) {
  const {air,falling,armSwing:s,backward,blend}=motion;
  const frontRest={x:46,y:81},rearRest={x:7,y:81};
  const front={x:lerp(frontRest.x,backward?49-s*4:47-s*14,blend),y:lerp(81,backward?57:65+Math.max(0,s)*6,blend)};
  const rear={x:lerp(rearRest.x,backward?22+s*3:9+s*12,blend),y:lerp(81,backward?62:69-Math.max(0,s)*5,blend)};
  front.x=lerp(front.x,lerp(55,64,falling),air);front.y=lerp(front.y,lerp(30,54,falling),air);
  rear.x=lerp(rear.x,lerp(-3,-13,falling),air);rear.y=lerp(rear.y,lerp(68,56,falling),air);
  drawArm({x:42,y:50},{x:(42+front.x)/2+7,y:(50+front.y)/2+8},front);
  drawArm({x:11,y:51},{x:(11+rear.x)/2-6,y:(51+rear.y)/2+9},rear);
  if(f.technique==='shrine'&&skinOf(f)!=='shibuya') {
    drawArm({x:43,y:64},{x:51-s*3,y:77},{x:45-s*7,y:88-air*11},skin.skin);
    drawArm({x:10,y:65},{x:2+s*3,y:78},{x:8+s*7,y:89-air*10},skin.skin);
  }
}

function beginCastMotion(f,move,angle=0) {
  if(!['limitless','shrine'].includes(f.technique))return;
  f.castPoseMove=move;f.castPoseTicks=18;f.castPoseAngle=angle;
}

function getSorcererCast(f) {
  if(!f||!['limitless','shrine'].includes(f.technique)||f.ko||f.stun>0||f.blocking||f.attacking)return null;
  if(f.domainStartup>0)return {move:'domain',charge:clamp01(1-f.domainStartup/DOMAIN_STARTUP_TICKS),release:0};
  if(f.technique==='shrine'&&f.simpleDomainFlash>0)return {move:'simpleDomain',charge:1,release:0};
  if(f.ultimateAiming||f.ultimateFinalCharge>0||f.ultimateStartup>0)return {move:f.technique==='shrine'?'worldSlash':'purple',charge:clamp01((f.ultimateAimTicks||0)/ULT_AIM_HOLD_TICKS),release:0};
  if(f.fugaAiming)return {move:'fuga',charge:clamp01(f.fugaChargeTicks/getFugaRequiredChargeTicks(f)),release:0};
  if(f.teleportAiming)return {move:'teleport',charge:1,release:0};
  if(f.chargingTechnique)return {move:getTechniqueMoveKey(f,f.chargingTechnique),charge:getTechniqueChargeRatio(f),release:0};
  if(f.castPoseTicks>0)return {move:f.castPoseMove,charge:1,release:1-f.castPoseTicks/18};
  return null;
}

function drawEnergyCore(x,y,r,kind,phase=frame*0.08) {
  ctx.save();ctx.translate(x,y);
  const blue=kind==='blue',purple=kind==='purple';
  const rgb=blue?'63,174,255':purple?'172,107,255':'255,72,88';
  const glow=ctx.createRadialGradient(0,0,r*.12,0,0,r*1.8);
  glow.addColorStop(0,`rgba(${rgb},.72)`);glow.addColorStop(.58,`rgba(${rgb},.22)`);glow.addColorStop(1,`rgba(${rgb},0)`);
  ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,r*1.8,0,Math.PI*2);ctx.fill();
  const core=ctx.createRadialGradient(-r*.22,-r*.23,0,0,0,r);
  core.addColorStop(0,blue?'#040b27':'#fff5ff');core.addColorStop(.3,blue?'#071a4a':'#ffdbe4');
  core.addColorStop(.75,blue?'#276bd5':purple?'#9445e8':'#f73551');core.addColorStop(1,blue?'#b9f5ff':purple?'#e3c9ff':'#ffc1c4');
  ctx.fillStyle=core;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
  ctx.lineCap='round';
  for(let i=0;i<3;i++){
    ctx.strokeStyle=i===0?'rgba(246,250,255,.9)':`rgba(${rgb},.6)`;ctx.lineWidth=i===0?1.5:2.6;
    ctx.beginPath();ctx.ellipse(0,0,r*(1.12+i*.12),r*(.37+i*.11),phase+i*1.1,phase,phase+Math.PI*1.4);ctx.stroke();
  }
  ctx.restore();
}

function drawSorcererCastArms(f,drawArm,skin) {
  const cast=getSorcererCast(f);if(!cast)return false;
  const {move,charge,release}=cast;
  const fade=1-motionEase((release-.3)/.7);
  const activeRelease=f.castPoseTicks>0&&!f.chargingTechnique&&!f.fugaAiming&&!f.ultimateAiming&&f.ultimateFinalCharge<=0;
  const right={x:62,y:48},left={x:24,y:59};
  if(move==='domain'||move==='teleport') {right.x=31;right.y=36;left.x=25;left.y=49;}
  else if(move==='fuga'){right.x=70;right.y=47;left.x=lerp(35,12,charge);left.y=43;}
  else if(move==='purple'){right.x=lerp(55,42,charge);right.y=48;left.x=lerp(7,29,charge);left.y=48;}
  else if(move==='worldSlash'){right.x=73;right.y=50;left.x=29;left.y=53;}
  else if(move==='simpleDomain'){right.x=34;right.y=73;left.x=21;left.y=73;}
  else if(move==='slash'||move==='cleave'){right.x=activeRelease?lerp(76,49,motionEase(release)):39;right.y=activeRelease?lerp(42,79,motionEase(release)):29;left.x=15;left.y=61;}
  if(activeRelease&&['blue','red','purple','fuga','worldSlash'].includes(move)) {right.x+=12*(1-release);left.x-=6*(1-release);}
  right.x=lerp(46,right.x,fade);right.y=lerp(81,right.y,fade);left.x=lerp(7,left.x,fade);left.y=lerp(81,left.y,fade);
  const bowHandX=left.x,bowHandY=left.y;
  const aimed=!['domain','teleport','simpleDomain'].includes(move);
  const aimMove=['purple','worldSlash'].includes(move)?(f.technique==='shrine'?'slash':'blue'):move;
  const worldAngle=activeRelease?f.castPoseAngle:getTechniqueAimVector(f,aimMove,f.ultimateAimPoint||f.techniqueAim).angle;
  const aimAngle=aimed?Math.atan2(Math.sin(worldAngle||0),Math.cos(worldAngle||0)*(f.dir||1)):0;
  for(const point of [right,left]) {
    const dx=point.x-26,dy=point.y-50;
    point.x=26+dx*Math.cos(aimAngle)-dy*Math.sin(aimAngle);
    point.y=50+dx*Math.sin(aimAngle)+dy*Math.cos(aimAngle);
  }
  const front=solvePunchArm({x:42,y:50},right),back=solvePunchArm({x:11,y:51},left);
  Object.assign(right,front.fist);Object.assign(left,back.fist);
  drawArm(front.shoulder,front.elbow,right);
  drawArm(back.shoulder,back.elbow,left);
  if(f.technique==='shrine'&&skinOf(f)!=='shibuya'){
    const sign=move==='domain'||move==='worldSlash'||move==='simpleDomain';
    drawArm({x:43,y:64},{x:sign?37:51,y:75},{x:sign?28:47,y:sign?70:87},skin.skin);
    drawArm({x:10,y:65},{x:sign?19:2,y:76},{x:sign?26:8,y:sign?71:88},skin.skin);
  }
  ctx.save();ctx.globalAlpha=fade;
  // Finger signs are attached to the wrist; the faces stay featureless.
  if(move==='worldSlash') {
    ctx.strokeStyle=skin.skin;ctx.lineWidth=2.6;ctx.lineCap='round';ctx.beginPath();
    ctx.moveTo(right.x,right.y);ctx.lineTo(right.x+Math.cos(aimAngle)*13,right.y+Math.sin(aimAngle)*13);ctx.stroke();
  } else if(['domain','teleport','blue','red'].includes(move)){
    ctx.strokeStyle=skin.skin;ctx.lineWidth=2.6;ctx.lineCap='round';ctx.beginPath();
    ctx.moveTo(right.x-1,right.y);ctx.lineTo(right.x+2,right.y-10);ctx.moveTo(right.x+2,right.y);ctx.lineTo(right.x+5,right.y-9);ctx.stroke();
  }
  if(!activeRelease){
    if(move==='blue'||move==='red')drawEnergyCore(right.x+10,right.y-6,4+charge*8,move);
    if(move==='purple'){
      const split=30*(1-motionEase(charge));
      ctx.save();ctx.translate(26,50);ctx.rotate(aimAngle);ctx.translate(-26,-50);
      if(charge<1) {
        drawEnergyCore(76,48-split,10*(1-motionEase((charge-.78)/.22)),'red');
        drawEnergyCore(76,48+split,10*(1-motionEase((charge-.78)/.22)),'blue',-frame*.09);
      }
      if(charge>.65)drawEnergyCore(76,48,22*motionEase((charge-.65)/.35),'purple');
      ctx.restore();
    }
    if(move==='fuga'){
      ctx.save();ctx.translate(26,50);ctx.rotate(aimAngle);ctx.translate(-26,-50);
      const power=.4+charge*.6;ctx.lineCap='round';
      for(const [color,width] of [['rgba(249,115,22,.28)',10],['#ffad38',3],['#fff5bf',1]]){
        ctx.strokeStyle=color;ctx.lineWidth=width*power;ctx.beginPath();ctx.moveTo(62,17);ctx.quadraticCurveTo(88,47,62,77);ctx.moveTo(62,17);ctx.lineTo(bowHandX,bowHandY);ctx.lineTo(62,77);ctx.moveTo(bowHandX,bowHandY);ctx.lineTo(88,47);ctx.stroke();
      }
      ctx.fillStyle='#fff4ae';ctx.beginPath();ctx.moveTo(89,47);ctx.lineTo(80,42);ctx.lineTo(82,47);ctx.lineTo(80,52);ctx.closePath();ctx.fill();
      ctx.restore();
    }
  }
  ctx.restore();return true;
}

function drawGojoHandEnergy(f,hand) {
  if(f.technique!=='limitless'||!isBluePunchActive(f))return;
  ctx.save();ctx.globalAlpha=.75;drawEnergyCore(hand.x,hand.y,7,'blue');ctx.restore();
}

function drawSukunaSimpleDomain(f) {
  const cx=f.x+f.w/2, feet=f.y+f.h-2;
  const opening=motionEase(1-(f.simpleDomainFlash||0)/18);
  const fade=Math.min(1,f.simpleDomainTicks/24),r=lerp(24,84,opening);
  ctx.save();ctx.globalAlpha=fade;ctx.lineCap='round';
  const aura=ctx.createRadialGradient(cx,feet,8,cx,feet,r);
  aura.addColorStop(0,'rgba(112,34,39,.04)');aura.addColorStop(.8,'rgba(196,62,56,.13)');aura.addColorStop(1,'rgba(196,62,56,0)');
  ctx.fillStyle=aura;ctx.beginPath();ctx.ellipse(cx,feet,r,25,0,0,Math.PI*2);ctx.fill();
  for(const [scale,color,width] of [[1,'#dfa38e',2.5],[.87,'#772d35',4],[1.1,'rgba(247,215,187,.3)',1]]) {
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.ellipse(cx,feet,r*scale,25*scale,0,0,Math.PI*2);ctx.stroke();
  }
  ctx.strokeStyle='#f4c6a3';ctx.lineWidth=1.5;
  for(let i=0;i<12;i++) {
    const angle=i*Math.PI/6;
    ctx.beginPath();ctx.moveTo(cx+Math.cos(angle)*r*.8,feet+Math.sin(angle)*20);
    ctx.lineTo(cx+Math.cos(angle)*r*.95,feet+Math.sin(angle)*24);ctx.stroke();
  }
  ctx.restore();
}

function drawSorcererProjectile(p) {
  if(!['blue','red','purple','slash','cleave','worldSlash','fuga'].includes(p.move))return false;
  ctx.save();
  const angle=Number.isFinite(p.angle)?p.angle:(p.dir<0?Math.PI:0);
  ctx.rotate(angle);
  const r=p.radius||20,age=p.visualSpawnAge||0;
  if(['blue','red','purple'].includes(p.move)) {
    drawEnergyCore(0,0,r,p.move);
    const pull=p.move==='blue';
    for(let i=0;i<9;i++){
      const t=((frame*.025+i/9)%1),a=i*Math.PI*2/9+frame*.018;
      const d=r*(pull?2.6-t*1.4:1.1+t*1.4);
      ctx.strokeStyle=`rgba(${pull?'139,224,255':p.move==='purple'?'217,181,255':'255,166,170'},${Math.sin(t*Math.PI)*.65})`;
      ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(Math.cos(a)*d,Math.sin(a)*d*.7);ctx.lineTo(Math.cos(a+.07)*(d+r*.2),Math.sin(a+.07)*(d+r*.2)*.7);ctx.stroke();
    }
  } else if(p.move==='fuga') {
    ctx.lineCap='round';
    for(let i=0;i<7;i++){
      const y=(i-3)*r*.16,tail=r*(2.8+(i%3)*.65);
      const grad=ctx.createLinearGradient(-tail,0,r,0);grad.addColorStop(0,'rgba(194,48,17,0)');grad.addColorStop(.55,'rgba(255,123,25,.55)');grad.addColorStop(1,'#fff3a8');ctx.strokeStyle=grad;ctx.lineWidth=3+(3-Math.abs(i-3))*1.5;
      ctx.beginPath();ctx.moveTo(-tail,y+Math.sin(frame*.35+i)*7);ctx.quadraticCurveTo(-r,y*1.7,r*1.5,0);ctx.stroke();
    }
    ctx.fillStyle='#fff9d9';ctx.beginPath();ctx.moveTo(r*1.75,0);ctx.lineTo(r*.55,-r*.28);ctx.lineTo(r*.85,0);ctx.lineTo(r*.55,r*.28);ctx.closePath();ctx.fill();
  } else {
    const world=p.move==='worldSlash',cleave=p.move==='cleave';
    // Keep Dismantle/Cleave's visible cuts inside their existing art bounds.
    if(!world)ctx.rotate(cleave?-.18:-.1);
    const length=world?r*4.6:cleave?r*2.2:r*3.3;
    const alpha=cleave?Math.min(1,p.life/4):1;
    ctx.globalAlpha=alpha;ctx.lineCap='round';
    const lines=cleave?4:1;
    for(let line=0;line<lines;line++){
      const offset=cleave?(line-1.5)*r*.56:0;
      const centerX=cleave?r*.35:world?0:r*.2;
      for(const [color,width] of [['rgba(234,57,68,.22)',world?22:12],['#111323',world?10:6],['#ffe8e6',world?4:2]]){
        ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(centerX-length*.5,offset+(cleave?r*.3:world?r*.22:r*.86));ctx.lineTo(centerX+length*.5,offset-(cleave?r*.3:world?r*.22:r*.86));ctx.stroke();
      }
    }
    ctx.strokeStyle='rgba(248,113,113,.64)';ctx.lineWidth=1;
    for(let i=0;i<4;i++){
      const x=-length*.35+i*length*.2;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x-8,-9-i%2*4);ctx.moveTo(x+4,0);ctx.lineTo(x+12,8+i%2*4);ctx.stroke();
    }
  }
  ctx.restore();return true;
}

function drawTeleportMotion(effect) {
  const t=1-effect.life/effect.maxLife;
  ctx.save();ctx.globalAlpha=1-t;ctx.lineCap='round';
  for(const [x,y,arrive] of [[effect.startX,effect.startY,false],[effect.endX,effect.endY,true]]){
    const spread=arrive?32*(1-t):10+t*36;
    for(let i=0;i<7;i++){
      const offset=(i-3)*spread/3;
      ctx.strokeStyle=i%2?'rgba(115,216,255,.7)':'rgba(227,249,255,.8)';ctx.lineWidth=i%2?2:1;
      ctx.beginPath();ctx.moveTo(x+offset,y-49+(i%3)*7);ctx.quadraticCurveTo(x+offset*.25,y,x+offset,y+48-(i%3)*6);ctx.stroke();
    }
    ctx.strokeStyle='rgba(167,232,255,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y+48,12+spread,4+spread*.15,0,0,Math.PI*2);ctx.stroke();
  }
  ctx.restore();
}
