const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./harness.cjs');
function setup(t){const g=loadGame();t.after(()=>g.close());g.run(`gameState='playing';gameMode='practice';pacifistBot=true;paused=false;gameOver=false;player.technique='limitless';applyTechniqueStats(player);player.grounded=true;player.y=GROUND-player.h;`);return g;}

test('motion blends start/stop and landing without changing fighter physics',t=>{
 const g=setup(t);const r=g.run(`(()=>{
  player.vx=4;player.vy=0;player.walkCycle=1.3;const before={x:player.x,y:player.y,health:player.health};
  for(let i=0;i<12;i++)tickFighterMotion(player);const moving=player.motionBlend;
  player.vx=0;tickFighterMotion(player);const stopping=player.motionBlend;
  player.grounded=false;player.vy=10;tickFighterMotion(player);player.grounded=true;player.vy=0;tickFighterMotion(player);
  const landing=player.motionLanding;for(let i=0;i<12;i++)tickFighterMotion(player);
  return {moving,stopping,landing,end:player.motionLanding,phase:player.walkCycle,before,after:{x:player.x,y:player.y,health:player.health}};
 })()`);assert.ok(r.moving>.9&&r.stopping>0&&r.stopping<r.moving);assert.ok(r.landing>0);assert.equal(r.end,0);assert.equal(r.phase,1.3);assert.deepEqual(r.before,r.after);
});

test('punch is extended on the first damaging frame and settles by recovery end',t=>{
 const g=setup(t);const rows=g.run(`(()=>{const rows=[];for(const tech of ['limitless','shrine','brawler','david'])for(const type of ['light','heavy']){
 player.technique=tech;player.attacking=type;const a=getAttackSpec(player);player.attackFrame=a.windup;const hit=getPunchMotion(player);
 player.attackFrame=a.windup+a.active+a.recovery;const rest=getPunchMotion(player);rows.push([hit.drive,rest.drive,rest.load]);}return rows;})()`);
 for(const [hit,rest,load]of rows){assert.equal(hit,1);assert.equal(rest,0);assert.equal(load,0);}
});

test('sorcerer casts preserve arm counts, support aim directions and serialize release pose',t=>{
 const g=setup(t);const rows=g.run(`(()=>{const rows=[];for(const [tech,skin]of [['limitless','default'],['shrine','default'],['shrine','shibuya']])for(const dir of [-1,1])for(const move of ['blue','red','purple','fuga','worldSlash','domain']){
 player.technique=tech;player.skinId=skin;player.dir=dir;player.castPoseMove=move;player.castPoseTicks=17;player.castPoseAngle=dir>0?-.5:-2.6;
 const hands=[];const drawn=drawSorcererCastArms(player,(s,e,h)=>hands.push(h),getTechniqueSkin(player,false));
 rows.push({drawn,count:hands.length,expected:tech==='shrine'&&skin==='default'?4:2,finite:hands.every(h=>Number.isFinite(h.x)&&Number.isFinite(h.y))});}
 player.technique='limitless';beginCastMotion(player,'red',-.5);const packet=getFighterNetworkState(player);
 return {rows,move:packet.castPoseMove,ticks:packet.castPoseTicks,angle:packet.castPoseAngle};})()`);
 for(const r of rows.rows){assert.equal(r.drawn,true);assert.equal(r.count,r.expected);assert.equal(r.finite,true);}assert.equal(rows.move,'red');assert.equal(rows.ticks,18);assert.equal(rows.angle,-.5);
});

test('all skins render through a full movement cycle and sorcerer projectiles animate',t=>{
 const g=setup(t);g.run(`for(const [tech,skins] of Object.entries(CHARACTER_SKINS))for(const skin of skins)for(let i=0;i<24;i++){
 player.technique=tech;player.skinId=skin.id;player.grounded=i<12;player.vx=i<6?4:-3;player.vy=i-18;player.walkCycle=i/24*Math.PI*2;tickFighterMotion(player);drawFighter(player,'');
 }for(const move of ['blue','red','purple','slash','cleave','worldSlash','fuga'])for(let i=0;i<24;i++){
 frame=i;drawSorcererProjectile({move,radius:24,angle:-.4,life:24-i,visualSpawnAge:i});}`);assert.equal(g.messages.length,0);
});
