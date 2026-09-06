const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./harness.cjs');
function setup(t,tech='shrine') {
  const g=loadGame();t.after(()=>g.close());
  g.run(`startFromHome(true);finishTechniqueSelect('${tech}');`);return g;
}

test('hit reactions recover on both peers and zero hit state clears old flashes',t=>{
  const g=setup(t);
  const result=g.run(`(()=>{
    gameMode='online';onlineRole='p2';player.hurt=24;player.stun=18;
    const hit=getFighterNetworkState(player);syncHostPlayerToJoiner(hit);
    const visible=player.hurt;
    for(let i=0;i<35;i++)updateFighter(player,enemy);
    const recovered=getFighterNetworkState(player);
    player.hurt=24;player.stun=18;syncHostPlayerToJoiner(recovered);
    enemy.hurt=24;enemy.stun=18;syncRemoteDamageToLocalJoiner({...getFighterNetworkState(enemy),hurt:0,stun:0});
    return {visible,hurt:player.hurt,stun:player.stun,ownHurt:enemy.hurt,ownStun:enemy.stun};
  })()`);
  assert.equal(result.visible,24);
  for(const key of ['hurt','stun','ownHurt','ownStun'])assert.equal(result[key],0);
});

test('leaving an online battle starts clean practice, CPU and local PVP sessions',t=>{
  const g=setup(t);
  for(const mode of ['practice','cpu','pvp']) {
    g.run(`gameMode='online';onlineRole='p2';onlineConnected=true;onlinePlayers={p1:1,p2:1};
      onlineTechniqueChoices={p1:'shrine',p2:'shrine'};currentStageId='protoss';stageHazardsEnabled=true;
      onlineSocket={close(){window.closedOldSocket=true;}};player.hurt=90;enemy.hurt=90;projectiles=[{move:'purple'}];
      keys.add('s');hitStopTicks=30;selectedMode='${mode==='pvp'?'pvp':'cpu'}';startFromHome(${mode==='practice'});finishTechniqueSelect('limitless');`);
    const result=g.run('({mode:gameMode,practice:pacifistBot,enemy:enemy.technique,role:onlineRole,socket:onlineSocket,stage:currentStageId,hazards:stageHazardsEnabled,projectiles:projectiles.length,keys:keys.size,hitStopTicks})');
    assert.equal(result.mode,mode==='pvp'?'pvp':'cpu');assert.equal(result.practice,mode==='practice');
    if(mode==='practice')assert.equal(result.enemy,'dummy');else assert.notEqual(result.enemy,'dummy');
    assert.equal(result.role,null);assert.equal(result.socket,null);assert.equal(result.stage,'city');assert.equal(result.hazards,false);
    assert.equal(result.projectiles,0);assert.equal(result.keys,0);assert.equal(result.hitStopTicks,0);
    assert.equal(g.window.closedOldSocket,true);
  }
});

test('Fuga fires from mouse release and queues early keyboard release until charged',t=>{
  const g=setup(t);
  const mouse=g.run(`(()=>{
    const aim={x:player.x+450,y:player.y+50};prepareFuga(player,aim);
    for(let i=0;i<FUGA_CHARGE_TICKS;i++)updateFighter(player,enemy);
    mouseTechniqueHeld.ct1=true;mouseTechniqueHeld.ct2=true;
    handleTechniqueMouseUp({button:0,clientX:600,clientY:300,preventDefault(){}});
    return {shots:projectiles.filter(p=>p.move==='fuga').length,cooldown:player.fugaCooldown,ce:player.ce};
  })()`);
  assert.equal(mouse.shots,1);assert.ok(mouse.cooldown>0);
  g.run(`startFromHome(true);finishTechniqueSelect('shrine');`);
  const w=g.window;
  w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'s',code:'KeyS'}));
  w.dispatchEvent(new w.KeyboardEvent('keyup',{key:'s',code:'KeyS'}));
  assert.equal(g.run('player.fugaReleaseQueued'),true);
  g.run('for(let i=0;i<FUGA_CHARGE_TICKS+5;i++)updateFighter(player,enemy);');
  assert.equal(g.run("projectiles.filter(p=>p.move==='fuga').length"),1);
  assert.equal(g.run('player.fugaAiming'),false);
});

test('Purple and WCS charge 1.5 seconds, focus briefly, aim continuously and fire exactly once',t=>{
  const g=setup(t);
  for(const tech of ['limitless','shrine']) {
    g.run(`startFromHome(true);finishTechniqueSelect('${tech}');player.ultimateMeter=MAX_ULTIMATE;beginUltimateAim(player,{x:900,y:300});`);
    assert.equal(g.run('ultCutscene'),null);
    assert.equal(g.run('ultimateScreenEffect.ticks'),0);
    g.run('releaseUltimateAim(player);for(let i=0;i<89;i++)updateUltimateState(player);');
    assert.equal(g.run('projectiles.length'),0);
    assert.equal(g.run('player.ultimateAiming'),true);
    g.run(`player.ultimateAimPoint={x:player.x+500,y:player.y-200};updateUltimateState(player);`);
    assert.equal(g.run('player.ultimateFinalCharge'),15);
    assert.ok(g.run('getCameraTargetZoom()')>g.run('W/Math.min(STAGE_W,Math.max(W,Math.abs(enemy.x-player.x)+312))'));
    const packet=g.run('getFighterNetworkState(player)');assert.equal(packet.ultimateAimTicks,90);assert.equal(packet.ultimateFinalCharge,15);
    g.run('for(let i=0;i<15;i++)updateUltimateState(player);');
    assert.equal(g.run('projectiles.length'),1);assert.ok(g.run('projectiles[0].vy')<0);
    assert.equal(g.run('projectiles[0].move'),tech==='limitless'?'purple':'worldSlash');
    g.run('for(let i=0;i<60;i++)updateUltimateState(player);');assert.equal(g.run('projectiles.length'),1);
  }
});

test('Sukuna points along aim, Purple converges, and Simple Domain keeps Sukuna arm counts',t=>{
  const g=setup(t);
  const result=g.run(`(()=>{
    player.ultimateAiming=true;player.ultimateAimTicks=45;player.ultimateFinalCharge=0;
    const counts=[];
    for(const skin of ['default','shibuya']){player.skinId=skin;const arms=[];
      drawSorcererCastArms(player,(s,e,h)=>arms.push({s,e,h}),getTechniqueSkin(player,false));
      counts.push(arms.length);for(const a of arms.slice(0,2))if(Math.abs(Math.hypot(a.h.x-a.e.x,a.h.y-a.e.y)-25)>.001)throw Error('Stretched arm');}
    player.ultimateAiming=false;player.simpleDomainTicks=360;player.simpleDomainFlash=18;drawSimpleDomainEffect(player);
    player.technique='limitless';player.ultimateAiming=true;player.stun=0;const cores=[];
    const original=drawEnergyCore;drawEnergyCore=(x,y,r,kind)=>cores.push({x,y,r,kind});
    player.ultimateAimTicks=0;drawSorcererCastArms(player,()=>{},getTechniqueSkin(player,false));const separated=cores.splice(0);
    player.ultimateAimTicks=90;drawSorcererCastArms(player,()=>{},getTechniqueSkin(player,false));drawEnergyCore=original;
    return {counts,separated,merged:cores};
  })()`);
  assert.deepEqual(Array.from(result.counts),[4,2]);assert.equal(result.separated.length,2);
  assert.notEqual(result.separated[0].y,result.separated[1].y);
  assert.equal(result.merged.length,1);assert.equal(result.merged[0].kind,'purple');
});

test('stage UI follows host authority and stable snapshots reuse the controls DOM',t=>{
  const g=setup(t);g.window.dispatchEvent(new g.window.Event('DOMContentLoaded'));
  g.run(`gameMode='online';onlineRole='p2';currentStageId='city';stageHazardsEnabled=false;updateStageSelectionControls();`);
  assert.equal(g.run("chooseStage('space',true)"),false);
  assert.equal(g.run('currentStageId'),'city');
  for(const button of g.window.document.querySelectorAll('.stage-chip'))assert.equal(button.disabled,true);
  assert.equal(g.window.document.getElementById('stageHazardToggle').disabled,true);
  g.run(`applyOnlineStageChoice({role:'p1',stage:'zen',hazards:true});`);assert.equal(g.run('currentStageId'),'zen');
  g.run(`onlineRole='p1';updateStageSelectionControls();`);assert.equal(g.run("chooseStage('space',false)"),true);
  g.run('updateControlsVisibility();');const first=g.window.document.querySelector('.controls-grid').firstElementChild;
  g.run('for(let i=0;i<40;i++)updateControlsVisibility();');
  assert.equal(g.window.document.querySelector('.controls-grid').firstElementChild,first);
});

test('movesets cover every character, leave undefined passives blank, and close without disturbing the mode',t=>{
  const g=setup(t);
  g.run('openMovesetsScreen();');
  const screen=g.window.document.getElementById('movesetsScreen');assert.equal(screen.classList.contains('hidden'),false);
  for(const tech of Array.from(g.run('Object.keys(CHARACTER_SKINS)'))) {
    g.run(`showCharacterMoveset('${tech}');`);
    assert.ok(screen.querySelectorAll('tbody tr').length>=3,tech);
    assert.ok(screen.querySelector('#movesetName').textContent.length>0);
  }
  g.run("showCharacterMoveset('limitless');");assert.equal(screen.querySelector('#movesetPassive').textContent,'');
  g.run("showCharacterMoveset('shrine');");assert.ok(screen.querySelector('#movesetPassive').textContent.includes('14%'));
  g.run('closeMovesetsScreen();');assert.equal(screen.classList.contains('hidden'),true);assert.equal(g.run('pacifistBot'),true);
  assert.deepEqual(g.messages,[]);
});
