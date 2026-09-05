const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame } = require('./harness.cjs');

function game(t) {
  const g=loadGame(); t.after(()=>g.close());
  g.run(`
    gameState='playing'; gameMode='cpu'; paused=false; gameOver=false; pacifistBot=false;
    player=makeFighter({x:300,w:50,h:128,dir:1,color:'#b88955',accent:'#8b1e22'});
    enemy=makeFighter({x:720,w:54,h:128,dir:-1,color:'#eeeeee',accent:'#999999'});
    player.technique='deathnote';enemy.technique='brawler';
    applyTechniqueStats(player);applyTechniqueStats(enemy);
    player.y=GROUND-player.h;enemy.y=GROUND-enemy.h;
    player.grounded=true;enemy.grounded=true;
    projectiles=[]; hitSparks=[];
  `);
  return g;
}

test('practice clears every roster cooldown and nested plant timer, preserving recovery and buffs', t=>{
  const g=game(t);
  const result=g.run(`(() => {
    pacifistBot=true;gameMode='practice';practiceSettings.noCooldowns=true;
    for(const key of Object.keys(player)) if(key.endsWith('Cooldown') && typeof player[key]==='number') player[key]=123;
    player.davePlantCooldowns={peashooter:90,wallnut:400};
    player.pendingPunchCooldown=true;player.ctLockTimer=99;player.jijiRevertLockTicks=99;
    player.potatoFocusTicks=600;player.ultimateStartup=30;player.attackFrame=7;
    enemy.lightRyukCooldown=444;applyPracticeSettingsTick();
    return {left:Object.entries(player).filter(([k,v])=>k.endsWith('Cooldown')&&typeof v==='number'&&v>0),
      plants:Object.values(player.davePlantCooldowns),pending:player.pendingPunchCooldown,
      focus:player.potatoFocusTicks,startup:player.ultimateStartup,attackFrame:player.attackFrame,
      enemyCooldown:enemy.lightRyukCooldown,ctLock:player.ctLockTimer,revertLock:player.jijiRevertLockTicks};
  })()`);
  assert.equal(result.left.length,0);assert.ok(result.plants.every(n=>n===0));assert.equal(result.pending,false);
  assert.equal(result.focus,600);assert.equal(result.startup,30);assert.equal(result.attackFrame,7);
  assert.equal(result.enemyCooldown,444);assert.equal(result.ctLock,0);assert.equal(result.revertLock,0);
});

test('no cooldown reset leaks into normal play or practice with the option off',t=>{
  const g=game(t);
  assert.equal(g.run(`player.lightRyukCooldown=180;practiceSettings.noCooldowns=true;applyPracticeSettingsTick();player.lightRyukCooldown`),180);
  assert.equal(g.run(`pacifistBot=true;gameMode='practice';practiceSettings.noCooldowns=false;applyPracticeSettingsTick();player.lightRyukCooldown`),180);
});

test('Investigation spawns at the preview endpoint for both directions, diagonals, air and stage edges',t=>{
  const g=game(t);
  const checks=g.run(`(() => {
    const out=[];
    for(const [x,y,dir] of [[300,310,1],[300,150,-1],[0,310,-1],[1500,310,1]]) {
      player.x=x;player.y=y;player.dir=dir;
      for(const aim of [{x:1300,y:-300},{x:0,y:438},{x:340,y:398},{x:1600,y:100}]) {
        player.lightSummonStage=1;player.lightSummonType=null;
        const point=getLightInvestigationPlacement(player,aim);
        const origin=getTechniqueOrigin(player,'nameInvestigation');
        startNameInvestigation(player,0,aim);
        out.push(Math.hypot(point.x-origin.x,point.y-origin.y)<=LIGHT_SUMMON_MAX_RANGE+0.0001 &&
          point.x===player.lightSummonAnchorX && point.y===player.lightSummonAnchorY);
      }
    }return out;
  })()`);
  assert.ok(checks.every(Boolean));
});

test('Misa is faster and fragile, Soichiro tougher and slower; Focus needs an active summon for Name gain',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    function measure(kind,focus) {
      player.lightSummonType=kind; player.lightSummonTicks=kind?600:0;
      player.lightSummonHealth=100;player.lightSummonMaxHealth=100;
      player.lightSummonAnchorX=enemy.x;player.lightSummonAnchorY=GROUND;
      player.identityProgress=0;player.informationMeter=0;player.potatoFocusTicks=focus?600:0;
      for(let i=0;i<120;i++) updateLightSystems(player,enemy);
      return player.identityProgress;
    }
    return {misa:measure('misa',false),dad:measure('soichiro',false),focus:measure('misa',true),alone:measure(null,true),
      misaHp:LIGHT_SUMMON_STATS.misa.health,dadHp:LIGHT_SUMMON_STATS.soichiro.health};
  })()`);
  assert.ok(result.misa>result.dad);assert.ok(result.focus>result.misa);assert.equal(result.alone,0);
  assert.ok(result.misa<28);assert.ok(result.dad<16);assert.ok(result.misaHp<result.dadHp);
});

test('Potato Chip accelerates cooldowns that are already running and has an eating animation',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    player.lightRyukCooldown=180;player.lightInvestigationCooldown=360;
    const used=usePotatoChip(player);
    const eating=player.potatoEatingTicks;
    const initialCooldown=getLightFocusedCooldown(player,240);
    for(let i=0;i<20;i++) updateFighter(player,enemy);
    return {used,eating,ryuk:player.lightRyukCooldown,investigation:player.lightInvestigationCooldown,
      chip:player.potatoCooldown,name:player.identityProgress,initialCooldown};
  })()`);
  assert.equal(result.used,true);assert.equal(result.eating,40);
  assert.equal(result.ryuk,140);assert.equal(result.investigation,320);
  assert.equal(result.chip,280);assert.equal(result.name,0);assert.equal(result.initialCooldown,240);
});

test('Shinigami Strike travels continuously, hits once with the fist, then returns without duplicating Ryuk',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    const hp=enemy.health;const aim={x:enemy.x+enemy.w/2,y:enemy.y+48};
    const home=getLightRyukHome(player);const cast=startRyukStrike(player,aim);
    const p=projectiles[0];const startsAtHome=p.ryukX===home.x&&p.ryukY===home.y;
    const duplicate=startRyukStrike(player,aim);const samples=[];
    for(let i=0;i<p.startupMax-1;i++) { updateProjectiles(); samples.push({x:p.ryukX,y:p.ryukY}); }
    const before=enemy.health;updateProjectiles();const impact=enemy.health;
    const keptAfterHit=projectiles.includes(p);
    while(projectiles.length) updateProjectiles();
    return {cast,startsAtHome,duplicate,hp,before,impact,finalHp:enemy.health,keptAfterHit,samples,
      finalX:p.ryukX,homeX:home.x,finalY:p.ryukY,homeY:home.y};
  })()`);
  assert.equal(result.cast,true);assert.equal(result.startsAtHome,true);assert.equal(result.duplicate,false);
  assert.equal(result.before,result.hp);assert.ok(result.impact<result.hp);assert.equal(result.finalHp,result.impact);
  assert.equal(result.keptAfterHit,true);assert.equal(result.finalX,result.homeX);assert.equal(result.finalY,result.homeY);
  assert.ok(new Set(result.samples.map(p=>p.x)).size>3);
});

test('Shinigami Strike misses an opponent outside its fist, even if inside the old area',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    const hp=enemy.health;
    startRyukStrike(player,{x:enemy.x-42,y:enemy.y+48});
    while(projectiles.length) updateProjectiles();
    return {hp,after:enemy.health};
  })()`);
  assert.equal(result.hp,result.after);
});

test('Death Note uses one writing animation and resolves damage once when writing finishes',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    player.identityProgress=100;player.ultimateMeter=MAX_ULTIMATE;
    const hp=enemy.health;const started=startDeathNoteUltimate(player);
    const kind=ultimateScreenEffect.kind;const generic=ultCutscene;
    const consumed=player.identityProgress;
    for(let i=0;i<LIGHT_DEATH_NOTE_WRITE_TICKS-1;i++) updateUltimateState(player);
    const before=enemy.health;updateUltimateState(player);const after=enemy.health;
    for(let i=0;i<50;i++) updateUltimateState(player);
    return {started,hp,before,after,last:enemy.health,kind,generic,consumed,move:player.ultimateMove};
  })()`);
  assert.equal(result.started,true);assert.equal(result.kind,'deathNoteWriting');assert.equal(result.generic,null);
  assert.equal(result.hp,result.before);assert.ok(result.after<result.hp);assert.equal(result.last,result.after);
  assert.equal(result.consumed,0);assert.equal(result.move,null);
});

test('all skins and stages draw, and the cooldown HUD uses the full ability name',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    for(const [tech,skins] of Object.entries(CHARACTER_SKINS)) for(const skin of skins) {
      player.technique=tech;player.skinId=skin.id;applyTechniqueStats(player);drawFighter(player,'');
    }
    player.technique='deathnote';applyTechniqueStats(player);
    for(const id of Object.keys(STAGES)) { currentStageId=id;getStage().draw();drawArenaFinish(); }
    updateHud();
    return {label:ctHud.player[0].label.textContent,unified:ctHud.player.every(h=>h.slot.classList.contains('unified-cooldown'))};
  })()`);
  assert.equal(result.label,'SHINIGAMI STRIKE');assert.equal(result.unified,true);assert.equal(g.messages.length,0);
});

test('remote Ryuk packets retain flight and fist pose without applying damage',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    startRyukStrike(player,{x:enemy.x+27,y:enemy.y+48});
    const original=projectiles[0];updateProjectiles();
    const remote=JSON.parse(JSON.stringify(compactProjectileForNetwork(original)));
    const a=getRyukStrikePose(original),b=getRyukStrikePose(remote),hp=enemy.health;
    projectiles=[remote];while(projectiles.length) updateProjectiles();
    return {same:a.x===b.x&&a.y===b.y&&a.fistX===b.fistX&&a.fistY===b.fistY,visual:remote.visualOnly,hp,after:enemy.health};
  })()`);
  assert.equal(result.same,true);assert.equal(result.visual,true);assert.equal(result.hp,result.after);
});

test('joining player ultimate state animates once on host without duplicate damage',t=>{
  const g=game(t);
  const result=g.run(`(() => {
    gameMode='online';onlineRole='p1';enemy.technique='deathnote';applyTechniqueStats(enemy);
    enemy.identityProgress=100;enemy.ultimateMeter=MAX_ULTIMATE;
    const hp=player.health;
    const remote={...getFighterNetworkState(enemy),deathNoteCastId:1,ultimateMove:'deathNote',ultimateStartup:70,ultimateRecovery:24,ultimateHasReleased:false,potatoEatingTicks:19};
    applyJoinerFighterStateOnHost(remote);const first=ultimateScreenEffect.ticks;
    ultimateScreenEffect.ticks=55;applyJoinerFighterStateOnHost(remote);const duplicateTicks=ultimateScreenEffect.ticks;
    for(let i=0;i<100;i++) updateUltimateState(enemy);
    return {kind:ultimateScreenEffect.kind,first,duplicateTicks,hp,after:player.health,eating:enemy.potatoEatingTicks};
  })()`);
  assert.equal(result.kind,'deathNoteWriting');assert.equal(result.first,94);assert.equal(result.duplicateTicks,55);
  assert.equal(result.hp,result.after);assert.equal(result.eating,19);
});
