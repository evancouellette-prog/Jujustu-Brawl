const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./harness.cjs');
function setup(t){const g=loadGame();t.after(()=>g.close());g.run(`gameMode='online';onlineRole='p2';gameState='playing';paused=false;onlineWaiting=false;`);return g;}

test('remote motion fills snapshot gaps, caps prediction, snaps teleports and preserves combat state',t=>{
 const g=setup(t);const r=g.run(`(()=>{recordOnlineMotion(player,{...getFighterNetworkState(player),x:100,y:300,vx:4,vy:0,grounded:true},0);
 recordOnlineMotion(player,{...getFighterNetworkState(player),x:112,y:300,vx:4,vy:0,grounded:true},50);
 const a=sampleOnlineMotion(player,66),b=sampleOnlineMotion(player,82),c=sampleOnlineMotion(player,10000);
 const before=JSON.stringify(getFighterNetworkState(player));drawOnlineFighter(player,'');const after=JSON.stringify(getFighterNetworkState(player));
 recordOnlineMotion(player,{...getFighterNetworkState(player),x:800,y:300,vx:0,grounded:true},10001);const snap=sampleOnlineMotion(player,10002);
 return {a,b,c,snap,before,after};})()`);
 assert.ok(r.b.x>r.a.x);assert.ok(r.c.x<=130);assert.equal(r.snap.x,800);assert.equal(r.before,r.after);
});

test('cooldown HUD reuses nodes on updates and removes expired summon rows',t=>{
 const g=setup(t);g.run(`player.technique='deathnote';player.lightSummonType='misa';player.lightSummonTicks=100;updateExtraCooldownHud(playerExtraCooldownsEl,player);`);
 const el=g.window.document.querySelector('[aria-label="player extra cooldowns"]');const first=el.firstElementChild;
 g.run(`for(let i=0;i<60;i++){player.potatoCooldown=i;updateExtraCooldownHud(playerExtraCooldownsEl,player);}`);
 assert.equal(el.firstElementChild,first);
 g.run(`player.lightSummonType=null;player.lightSummonTicks=0;updateExtraCooldownHud(playerExtraCooldownsEl,player);`);
 assert.ok(!el.textContent.includes('MISA'));
});

test('stale socket messages and close events cannot break a newer host/join connection',t=>{
 const g=setup(t);const r=g.run(`(()=>{
 const sockets=[];WebSocket=class {static OPEN=1;constructor(){this.readyState=1;this.events={};sockets.push(this);}addEventListener(k,f){this.events[k]=f;}send(){}close(){this.readyState=3;}};
 connectOnline('first','host');const old=sockets[0];connectOnline('second','join');const fresh=sockets[1];fresh.events.message({data:JSON.stringify({type:'role',role:'p2'})});
 old.events.close();old.events.message({data:JSON.stringify({type:'role',role:'p1'})});
 const current={role:onlineRole,connected:onlineConnected};fresh.events.message({data:'invalid json'});
 fresh.events.message({data:JSON.stringify({type:'room-error',code:'not-found',message:'Check the battle code.'})});fresh.events.close();
 return {...current,title:waitingTitle.textContent};})()`);
 assert.equal(r.role,'p2');assert.equal(r.connected,true);assert.equal(r.title,'Host Not Found');
});

test('snapshot backpressure never drops attack, release, ready or damage messages',t=>{
 const g=setup(t);const r=g.run(`(()=>{const sent=[];onlineSocket={readyState:WebSocket.OPEN,bufferedAmount:50000,send:s=>sent.push(JSON.parse(s))};
 sendOnlineFighterState();sendOnlineInput('light');sendOnlineInput('ct1-release');sendOnlineDamage({damage:1});sendOnlineReady();return sent.map(p=>p.action||p.type);})()`);
 assert.deepEqual(Array.from(r),['light','ct1-release','damage','ready']);
});
