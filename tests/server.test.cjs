const test=require('node:test');
const assert=require('node:assert/strict');
const {once}=require('node:events');
const {WebSocket}=require('ws');
const {server,wss,rooms,send}=require('../server.js');
const {loadGame}=require('./harness.cjs');

function client(url){
 const ws=new WebSocket(url);ws.inbox=[];ws.waiters=[];
 ws.on('message',raw=>{const p=JSON.parse(raw);ws.inbox.push(p);for(const f of [...ws.waiters])f();});
 ws.next=predicate=>new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>{cleanup();reject(Error('Expected relay message did not arrive'));},3000);
   const cleanup=()=>{clearTimeout(timer);ws.waiters=ws.waiters.filter(f=>f!==check);};
   const check=()=>{const i=ws.inbox.findIndex(predicate);if(i>=0){const p=ws.inbox.splice(i,1)[0];cleanup();resolve(p);}};
   ws.waiters.push(check);check();
 });
 return ws;
}

test('host/join relay handles wrong codes, full rooms, metadata, compression and a vacated slot',async t=>{
 server.listen(0,'127.0.0.1');await once(server,'listening');
 const url=`ws://127.0.0.1:${server.address().port}/ws`;
 const clients=[];const open=(room,side)=>{const ws=client(`${url}?room=${room}&side=${side}`);clients.push(ws);return ws;};
 t.after(async()=>{for(const ws of clients)ws.terminate();for(const ws of wss.clients)ws.terminate();await new Promise(resolve=>wss.close(resolve));await new Promise(resolve=>server.close(resolve));});
 const missing=open('missing','join');assert.equal((await missing.next(p=>p.type==='room-error')).code,'not-found');assert.equal(rooms.has('missing'),false);
 const host=open('regression','host');assert.equal((await host.next(p=>p.type==='role')).role,'p1');
 host.send(JSON.stringify({type:'name',role:'p1',name:'Host Test'}));
 host.send(JSON.stringify({type:'technique',role:'p1',technique:'shrine',skinId:'shibuya'}));
 const duplicate=open('regression','host');assert.equal((await duplicate.next(p=>p.type==='room-error')).code,'full');
 const join=open('regression','join');assert.equal((await join.next(p=>p.type==='role')).role,'p2');
 assert.equal((await join.next(p=>p.type==='name')).name,'Host Test');
 assert.equal((await join.next(p=>p.type==='technique')).skinId,'shibuya');
 const full=open('regression','join');assert.equal((await full.next(p=>p.type==='room-error')).code,'full');
 join.send(JSON.stringify({type:'input',input:{right:true},action:'light'}));assert.equal((await host.next(p=>p.type==='input')).action,'light');
 assert.ok(host.extensions.includes('permessage-deflate'));assert.ok(join.extensions.includes('permessage-deflate'));
 const g=loadGame();const state=g.run(`({type:'state',player:getFighterNetworkState(player),enemy:getFighterNetworkState(enemy),projectiles:[]})`);g.close();
 const start=join._socket.bytesRead;let rawBytes=0;
 for(let i=0;i<40;i++){const text=JSON.stringify({...state,sequence:i});rawBytes+=Buffer.byteLength(text);host.send(text);}
 await join.next(p=>p.type==='state'&&p.sequence===39);
 const wireBytes=join._socket.bytesRead-start;
 assert.ok(wireBytes<rawBytes*.55,`compression ${wireBytes}/${rawBytes}`);
 t.diagnostic(`40 representative snapshots: ${rawBytes} bytes of JSON, ${wireBytes} received wire bytes`);
 const closed=once(join,'close');join.close();await closed;
 await host.next(p=>p.type==='room'&&p.players.p2===0);
 const replacement=open('regression','join');assert.equal((await replacement.next(p=>p.type==='role')).role,'p2');
});

test('relay keeps the latest pending snapshot while preserving reliable actions',()=>{
 const sent=[];const ws={OPEN:1,readyState:1,bufferedAmount:50000,send:raw=>sent.push(JSON.parse(raw))};
 send(ws,{type:'state',sequence:1});send(ws,{type:'state',sequence:2});send(ws,{type:'input',action:'heavy'});
 assert.equal(ws.pendingSnapshots.size,1);assert.equal(JSON.parse(ws.pendingSnapshots.get('state')).sequence,2);assert.equal(sent[0].action,'heavy');
 ws.bufferedAmount=0;send(ws,{type:'state',sequence:3});assert.equal(ws.pendingSnapshots.size,0);assert.equal(sent[1].sequence,3);
});
