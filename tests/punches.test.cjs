const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./harness.cjs');
function setup(t){const g=loadGame();t.after(()=>g.close());g.run(`gameOver=false;paused=false;gameState='playing';player.grounded=true;player.y=GROUND-player.h;`);return g;}

test('accepted punches alternate hands, including misses, queues and four Heian arms',t=>{
 const g=setup(t);g.run(`for(const [tech,skin,count] of [['limitless','default',2],['shrine','shibuya',2],['shrine','default',4],['deathnote','default',2]]){
 player.technique=tech;player.skinId=skin;player.attacking=null;player.nextPunchArm=0;player.punchCooldown=0;player.pendingPunchCooldown=false;
 for(let i=0;i<8;i++){
   startAttack(player,'light');if(player.punchArm!==i%count)throw Error('wrong arm '+tech+' '+i);
   const next=player.nextPunchArm;startAttack(player,'light');if(player.nextPunchArm!==next)throw Error('rejected input consumed a hand');
   player.attacking=null;player.stun=10;startAttack(player,'light');if(player.nextPunchArm!==next)throw Error('stun consumed a hand');player.stun=0;
 }
 player.attacking=null;player.punchCooldown=0;player.pendingPunchCooldown=false;
 }`);
});

test('one fist reaches out while guards stay tucked and arm bones keep their lengths',t=>{
 const g=setup(t);const results=g.run(`(()=>{const rows=[];for(const skin of ['default','shibuya'])for(const type of ['light','heavy']){
 player.technique='shrine';player.skinId=skin;player.attacking=type;
 for(let arm=0;arm<getPunchArmCount(player);arm++)for(let dir of [-1,1]){
 player.punchArm=arm;player.dir=dir;const spec=getAttackSpec(player);
 for(let age=0;age<=spec.windup+spec.active+spec.recovery;age++){
 player.attackFrame=age;const pose=getPunchMotion(player);
 for(const a of pose.arms)rows.push([Math.hypot(a.elbow.x-a.shoulder.x,a.elbow.y-a.shoulder.y),Math.hypot(a.fist.x-a.elbow.x,a.fist.y-a.elbow.y)]);
 if(age===spec.windup){if(pose.arms.filter(a=>a.fist.x-a.shoulder.x>30).length!==1)throw Error('multiple punches');
 if(pose.activeArm!==arm)throw Error('wrong striking arm');}
 const drawn=[];drawPunchArms(player,(s,e,h)=>drawn.push(h),pose);if(drawn.length!==getPunchArmCount(player))throw Error('duplicate arms');
 drawFighter(player,'');
 }
 }}return rows;})()`);
 for(const [upper,forearm]of results){assert.ok(Math.abs(upper-23)<1e-8);assert.ok(Math.abs(forearm-25)<1e-8);}
});

test('Heian has the fastest base punches and his barrage cycles once per actual hit',t=>{
 const g=setup(t);const r=g.run(`(()=>{
 player.technique='shrine';player.skinId='default';const fast=['light','heavy'].map(type=>{const a=getAttackSpec(player,type);return a.windup+a.active+a.recovery;});
 const others=[];for(const [tech,skins]of Object.entries(CHARACTER_SKINS))for(const skin of skins){player.technique=tech;player.skinId=skin.id;if(isHeianSukuna(player))continue;others.push(['light','heavy'].map(type=>{const a=getAttackSpec(player,type);return a.windup+a.active+a.recovery;}));}
 player.technique='shrine';player.skinId='default';player.nextPunchArm=0;enemy.health=10000;enemy.maxHealth=10000;enemy.ko=false;
 startSukunaBarrage(player,enemy,10,10);const duration=player.barrageDuration,arms=[];let count=0;
 while(player.barrageTimer>0){updateSukunaBarrage(player,enemy);if(player.barrageHitsDone>count){arms.push(player.punchArm);count=player.barrageHitsDone;if(getPunchMotion(player).drive!==1)throw Error('barrage fist missed damage frame');}}
 return {fast,others,arms,duration};})()`);
 for(const speeds of r.others) for(let i=0;i<2;i++)assert.ok(r.fast[i]<speeds[i]);
 assert.deepEqual(Array.from(r.arms),[0,1,2,3,0,1]);assert.equal(r.duration,24);
});

test('Ryuk alternates attached fists and punch-arm state survives multiplayer packets',t=>{
 const g=setup(t);const r=g.run(`(()=>{player.technique='deathnote';player.skinId='default';player.nextPunchArm=0;const arms=[];
 for(let i=0;i<2;i++){player.attacking=null;projectiles=[];startRyukStrike(player,{x:600,y:280});const p=projectiles[0];arms.push(p.punchArm);
 const packet=compactProjectileForNetwork(p);if(packet.punchArm!==i)throw Error('missing projectile arm');
 const bones=getRyukPunchArms({x:LIGHT_RYUK_REACH,y:LIGHT_RYUK_HAND_Y},p.punchArm);
 if(Math.abs(bones[i].fist.x-LIGHT_RYUK_REACH)>1e-8)throw Error('fist not at contact');
 if(bones[1-i].fist.x-bones[1-i].shoulder.x>15)throw Error('Ryuk double punch');}
 player.technique='shrine';player.skinId='shibuya';player.punchArm=1;player.nextPunchArm=0;
 gameMode='online';onlineRole='p1';applyJoinerFighterStateOnHost(getFighterNetworkState(player));
 return {arms,skin:enemy.skinId,hand:enemy.punchArm,next:enemy.nextPunchArm};})()`);
 assert.deepEqual(Array.from(r.arms),[0,1]);assert.equal(r.skin,'shibuya');assert.equal(r.hand,1);assert.equal(r.next,0);
});
