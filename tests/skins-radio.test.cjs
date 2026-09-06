const test = require('node:test');
const assert = require('node:assert/strict');
const {loadGame} = require('./harness.cjs');

function game(t) { const g = loadGame(); t.after(() => g.close()); return g; }
function peer(t, role) {
  const g = game(t);
  g.run(`WebSocket = class {
    static OPEN = 1;
    constructor() { this.readyState = 1; this.bufferedAmount = 0; this.events = {}; this.sent = []; }
    addEventListener(k, fn) { this.events[k] = fn; }
    send(s) { this.sent.push(JSON.parse(s)); }
    close() { this.readyState = 3; }
  };
  connectOnline('skins', '${role === 'p1' ? 'host' : 'join'}');
  onlineSocket.events.message({data: JSON.stringify({type:'role',role:'${role}'})});
  onlineSocket.events.message({data: JSON.stringify({type:'room',players:{p1:1,p2:1}})});`);
  return g;
}
function deliver(g, packet) {
  g.window.packet = packet;
  g.run(`onlineSocket.events.message({data:JSON.stringify(window.packet)});`);
}
function send(g, call, type) {
  return JSON.parse(g.run(`onlineSocket.sent=[];${call};JSON.stringify(onlineSocket.sent.find(p=>p.type==='${type}'));`));
}
function outfits(g) { return JSON.parse(g.run(`JSON.stringify([skinOf(player),skinOf(enemy)])`)); }

test('every skin stays with its owner on both peers, including mirror matches and round resets', t => {
  const host = peer(t, 'p1'), joiner = peer(t, 'p2');
  const wardrobe = JSON.parse(host.run('JSON.stringify(CHARACTER_SKINS)'));
  for (const [technique, skins] of Object.entries(wardrobe)) {
    for (let i = 0; i < skins.length; i++) {
      const a = skins[i].id, b = skins[(i + 1) % skins.length].id;
      host.run(`setSelectedSkin('${technique}','${a}');finishTechniqueSelect('${technique}');`);
      joiner.run(`setSelectedSkin('${technique}','${b}');finishTechniqueSelect('${technique}');`);
      deliver(joiner, send(host, 'sendOnlineTechniqueChoice()', 'technique'));
      deliver(host, send(joiner, 'sendOnlineTechniqueChoice()', 'technique'));
      for (const g of [host,joiner]) g.run(`gameState='playing';onlineWaiting=false;lastOnlineFighterSent=-Infinity;lastOnlineStateSent=-Infinity;`);
      deliver(host, send(joiner, 'sendOnlineFighterState()', 'fighter'));
      deliver(joiner, send(host, 'sendOnlineState()', 'state'));
      for (const g of [host, joiner]) {
        assert.deepEqual(outfits(g), [a,b], technique);
        g.run('resetRoundActors();drawFighter(player);drawFighter(enemy);');
        assert.deepEqual(outfits(g), [a,b], `${technique} reset`);
      }
      assert.equal(host.run('JSON.stringify(getTechniqueSkin(player,false))'), joiner.run('JSON.stringify(getTechniqueSkin(player,false))'));
      assert.equal(host.run('JSON.stringify(getTechniqueSkin(enemy,false))'), joiner.run('JSON.stringify(getTechniqueSkin(enemy,false))'));
    }
  }
  assert.deepEqual(host.messages, []);
  assert.deepEqual(joiner.messages, []);
});

test('missing or invalid remote outfits never borrow the local wardrobe; snapshot outfits survive resets', t => {
  for (const role of ['p1','p2']) {
    const g = peer(t, role);
    g.run(`setSelectedSkin('limitless','finalfight');finishTechniqueSelect('limitless');`);
    const other = role === 'p1' ? 'p2' : 'p1';
    deliver(g, {type:'technique',role:other,technique:'limitless',skinId:'not-a-skin'});
    assert.deepEqual(outfits(g), role === 'p1' ? ['finalfight','default'] : ['default','finalfight']);
    assert.equal(g.run(`skinOf({technique:'limitless'})`), 'default');
    // A full owner snapshot must also update the identity saved for the next round.
    g.run(role === 'p1'
      ? `applyJoinerFighterStateOnHost({...getFighterNetworkState(enemy),skinId:'finalfight'});`
      : `syncHostPlayerToJoiner({...getFighterNetworkState(player),skinId:'finalfight'});`);
    g.run('resetRoundActors();');
    assert.deepEqual(outfits(g), ['finalfight','finalfight']);
    deliver(g, {type:'technique',role:other,technique:'shrine'});
    assert.equal(g.run(`skinOf(${role === 'p1' ? 'enemy' : 'player'})`), 'default');
  }
});

test('changing a selected skin updates only its owner and the transmitted selection', t => {
  for (const role of ['p1','p2']) {
    const g = peer(t, role);
    g.run(`finishTechniqueSelect('limitless');onlineSocket.sent=[];setSelectedSkin('limitless','finalfight');`);
    assert.deepEqual(outfits(g), role === 'p1' ? ['finalfight','default'] : ['default','finalfight']);
    assert.equal(g.run(`onlineSocket.sent.find(p=>p.type==='technique').skinId`), 'finalfight');
  }
});

test('all song bars seek at the clicked/tapped fraction without loading or starting music', t => {
  const g = game(t), w = g.window, song = w.document.getElementById('gameSong');
  Object.defineProperty(song, 'duration', {value:200, configurable:true});
  let loads = 0, plays = 0;
  song.load = () => loads++;
  song.play = () => { plays++; return Promise.resolve(); };
  for (const bar of w.document.querySelectorAll('.music-progress-track')) {
    bar.getBoundingClientRect = () => ({left:100,width:400});
    for (const [fraction, type] of [[0,'click'],[0.25,'pointerdown'],[0.5,'click'],[0.75,'pointerdown'],[1,'click']]) {
      bar.querySelector('.music-progress-fill').dispatchEvent(new w.MouseEvent(type, {bubbles:true,cancelable:true,clientX:100+400*fraction,button:0}));
      assert.equal(song.currentTime, 200*fraction);
      assert.equal(bar.getAttribute('aria-valuenow'), String(100*fraction));
    }
    bar.dispatchEvent(new w.KeyboardEvent('keydown', {key:'Home',bubbles:true}));
    bar.dispatchEvent(new w.KeyboardEvent('keydown', {key:'ArrowRight',bubbles:true}));
    assert.equal(song.currentTime, 5);
  }
  assert.equal(loads, 0);
  assert.equal(plays, 0);
  assert.deepEqual(g.messages, []);
});

test('seeks wait for metadata, retry unavailable media, and do not leak into the next song', t => {
  const g = game(t), w = g.window, song = w.document.getElementById('gameSong');
  let duration = NaN;
  Object.defineProperty(song, 'duration', {get:() => duration});
  g.run('applyRadioSeekPercent(0.5)');
  duration = 180;
  song.dispatchEvent(new w.Event('loadedmetadata'));
  assert.equal(song.currentTime, 90);
  let ready = false, time = 90;
  Object.defineProperty(song, 'currentTime', {get:() => time, set:v => {if (!ready) throw new Error('Not ready'); time=v;}});
  assert.equal(g.run('applyRadioSeekPercent(0.75)'), false);
  ready = true;
  song.dispatchEvent(new w.Event('canplay'));
  assert.equal(time, 135);
  duration = NaN;
  g.run('applyRadioSeekPercent(0.8);setRadioTrack(currentRadioTrackIndex+1,false);');
  duration = 100;
  song.dispatchEvent(new w.Event('loadedmetadata'));
  assert.equal(time, 0);
});
