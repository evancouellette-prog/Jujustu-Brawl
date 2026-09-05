/* Shared canvas artwork. Loaded before game.js; drawing runs after game setup. */
function materialGradient(color, x1, y1, x2, y2) {
  const hex = /^#([\da-f]{6})$/i.exec(color);
  if (!hex) return color;
  const n = parseInt(hex[1], 16);
  const rgb = [n >> 16, (n >> 8) & 255, n & 255];
  const tint = amount => `rgb(${rgb.map(v => Math.round(amount > 0 ? v + (255 - v) * amount : v * (1 + amount))).join(',')})`;
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, tint(0.22));
  gradient.addColorStop(0.36, color);
  gradient.addColorStop(0.73, tint(-0.12));
  gradient.addColorStop(1, tint(-0.38));
  return gradient;
}

function drawDetailedBuildings(offset, baseY, color) {
  const cache = drawDetailedBuildings.cache || (drawDetailedBuildings.cache = new Map());
  const key = `${offset}:${baseY}:${color}`;
  let layer = cache.get(key);
  if (!layer) {
    layer = document.createElement('canvas'); layer.width = STAGE_W + 240; layer.height = GROUND;
    const previous = ctx;
    ctx = layer.getContext('2d');
    ctx.translate(120, 0);
    const widths = [68,82,54,98,74,62,86,58,112,70,64,96];
    let x = -120 + offset;
    for(let i=0;x<STAGE_W+120;i++) {
      const width=widths[i%widths.length], height=92+((i*37)%115), top=baseY-height;
      ctx.fillStyle=materialGradient(color,x,top,x+width,baseY);
      ctx.fillRect(x,top,width,height);
      ctx.fillStyle='rgba(6,10,25,0.3)'; ctx.fillRect(x+width-9,top+4,9,height-4);
      ctx.fillStyle='rgba(200,199,217,0.14)'; ctx.fillRect(x,top,width,2);
      // Recessed roof houses, water tanks, and antennas break up the skyline.
      ctx.fillStyle=color;
      ctx.fillRect(x+12,top-7,width*0.46,7);
      if(i%4===0) {
        ctx.strokeStyle=color; ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(x+width*0.67,top);ctx.lineTo(x+width*0.67,top-27);ctx.stroke();
        ctx.fillStyle='#ae877d';ctx.fillRect(x+width*0.67-1,top-28,2,2);
      }
      if(i%4===2) {
        ctx.fillStyle='rgba(15,19,32,0.8)';
        ctx.fillRect(x+18,top-16,20,15);
        ctx.beginPath();ctx.ellipse(x+28,top-16,10,3,0,0,Math.PI*2);ctx.fill();
      }
      for(let wx=x+10;wx<x+width-12;wx+=17) {
        for(let wy=top+15;wy<baseY-12;wy+=22) {
          const lit=(Math.floor((wx-x)/17)+Math.floor((wy-top)/22)*3+i*7)%5<2;
          ctx.fillStyle=lit?'rgba(243,209,145,0.52)':'rgba(110,143,184,0.12)';
          ctx.fillRect(wx,wy,9,13);
          ctx.fillStyle=lit?'rgba(255,244,196,0.28)':'rgba(195,211,226,0.1)';
          ctx.fillRect(wx,wy,9,1);
          ctx.fillStyle='rgba(9,15,28,0.46)';ctx.fillRect(wx+4,wy,1,13);ctx.fillRect(wx,wy+7,9,1);
        }
      }
      ctx.strokeStyle='rgba(7,12,26,0.23)';ctx.lineWidth=1;
      for(let y=top+37;y<baseY;y+=44) {ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+width,y);ctx.stroke();}
      x+=width+16;
    }
    ctx = previous;
    cache.set(key,layer);
  }
  ctx.drawImage(layer,-120,0);
}

function drawSanjiEyebrow() {
  ctx.save();
  ctx.strokeStyle = '#684719';
  ctx.lineWidth = 1.65;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(15.5, 20.5);
  ctx.quadraticCurveTo(20, 18.4, 24.4, 20);
  ctx.bezierCurveTo(30.2, 22, 28.8, 15.6, 25.1, 16.7);
  ctx.bezierCurveTo(21.7, 17.7, 25, 21.4, 26.4, 19.1);
  ctx.stroke();
  ctx.restore();
}

function drawOutfitFinishing(f, palette) {
  ctx.save();
  // Shade only the cloth/armor silhouette, keeping all existing insignia.
  traceTorsoShape(39, 81);
  ctx.clip();
  const shade = ctx.createLinearGradient(10, 42, 44, 70);
  shade.addColorStop(0, 'rgba(225,237,255,0.16)');
  shade.addColorStop(0.35, 'rgba(255,255,255,0)');
  shade.addColorStop(0.7, 'rgba(6,10,24,0.02)');
  shade.addColorStop(1, 'rgba(6,10,24,0.27)');
  ctx.fillStyle = shade;
  ctx.fillRect(8, 38, 38, 48);
  ctx.strokeStyle = 'rgba(244,240,227,0.18)';
  ctx.lineWidth = 1.1;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(13, 46); ctx.quadraticCurveTo(10, 60, 15, 75); ctx.stroke();
  if (['deathnote', 'blackleg', 'limitless', 'david', 'akira'].includes(f.technique)) {
    // Subtle seam stitching, sleeve folds and a welt pocket.
    ctx.strokeStyle = 'rgba(7,13,26,0.28)';
    ctx.beginPath(); ctx.moveTo(33, 63); ctx.lineTo(40, 62); ctx.moveTo(14, 71); ctx.lineTo(20, 73); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,243,223,0.16)';
    ctx.beginPath(); ctx.moveTo(33, 64.5); ctx.lineTo(40, 63.5); ctx.stroke();
  }
  if (f.technique === 'blackleg' && skinOf(f) === 'wano') {
    ctx.strokeStyle = '#c6a967'; ctx.lineWidth = 0.8;
    for (const [x, y] of [[16, 51], [36, 63], [19, 73]]) {
      ctx.beginPath(); ctx.moveTo(x-3,y); ctx.lineTo(x,y-3); ctx.lineTo(x+3,y); ctx.lineTo(x,y+3); ctx.closePath(); ctx.stroke();
    }
  }
  if (f.technique === 'zealot' || (f.technique === 'brawler' && skinOf(f) === 'warArmor')) {
    ctx.strokeStyle = 'rgba(255,239,188,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(15,44); ctx.quadraticCurveTo(26,48,38,44); ctx.moveTo(16,67); ctx.lineTo(18,77); ctx.stroke();
  }
  ctx.restore();
}

function drawLightHandAction(f, drawArm, palette) {
  if (f.potatoEatingTicks > 0) {
    const age = LIGHT_POTATO_EAT_TICKS - f.potatoEatingTicks;
    const raise = easeOutQuad(clamp01(age / 15));
    const lower = easeOutQuad(clamp01((age - 24) / 16));
    const t = raise * (1 - lower);
    const hand = { x: lerp(39, 30, t), y: lerp(67, 30, t) };
    drawArm({ x: 11, y: 52 }, { x: 10, y: 65 }, { x: 22, y: 69 });
    ctx.fillStyle = materialGradient('#c49540', 14, 64, 32, 85);
    ctx.strokeStyle = '#513626'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(15,64); ctx.lineTo(31,63); ctx.lineTo(32,84); ctx.lineTo(15,85); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#f6dc92'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(17,66); ctx.lineTo(29,65); ctx.moveTo(17,81); ctx.lineTo(29,80); ctx.stroke();
    ctx.fillStyle = '#75412a'; ctx.beginPath(); ctx.ellipse(23,74,5,3,-0.3,0,Math.PI*2); ctx.fill();
    drawArm({ x: 42, y: 52 }, { x: 51, y: 54 - t * 8 }, hand);
    if (age < 23) {
      ctx.fillStyle = '#f5d178'; ctx.strokeStyle = '#ad7b31'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(hand.x-1,hand.y-3,4.6,2.6,-0.7,0,Math.PI*2); ctx.fill(); ctx.stroke();
    } else if (age < 30) {
      ctx.fillStyle = '#edc064';
      for (let i=0;i<3;i++) ctx.fillRect(29+i*3,33+(age-23)*1.3+i*2,1.4,1.4);
    }
    return;
  }
  // Ryuk performs all punches and throws. Light keeps a relaxed stance.
  drawArm({x:42,y:52},{x:49,y:68},{x:44,y:81});
  drawArm({x:11,y:52},{x:4,y:68},{x:8,y:81});
}

function drawDeathNoteWritingScene(effect) {
  const age = effect.maxTicks - effect.ticks;
  const fade = Math.min(clamp01(age/10), clamp01(effect.ticks/18));
  const progress = clamp01((age-18)/(LIGHT_DEATH_NOTE_WRITE_TICKS-18));
  ctx.save();
  ctx.globalAlpha = fade;
  ctx.fillStyle = 'rgba(10,10,18,0.86)'; ctx.fillRect(0,0,W,H);
  const halo = ctx.createRadialGradient(W*0.55,H*0.5,10,W*0.55,H*0.5,W*0.55);
  halo.addColorStop(0,'rgba(155,108,57,0.28)'); halo.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = halo; ctx.fillRect(0,0,W,H);
  ctx.translate(W*0.5,H*0.54);
  const sceneScale = Math.min(W/660,H/360);
  ctx.scale(sceneScale,sceneScale);
  const suit = effect.skinId === 'sweats' ? '#808895' : '#aa7848';
  // Light leans over the book, identifiable by his outfit and swept brown hair.
  ctx.fillStyle = materialGradient(suit,-180,-95,-82,105);
  ctx.strokeStyle = '#11121b'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-171,-76); ctx.quadraticCurveTo(-138,-89,-107,-65);
  ctx.lineTo(-62,87); ctx.lineTo(-206,87); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = effect.skinId === 'sweats' ? '#626c7c' : '#eee5d3';
  ctx.beginPath(); ctx.moveTo(-149,-74); ctx.lineTo(-124,-66); ctx.lineTo(-105,4); ctx.lineTo(-148,-2); ctx.closePath(); ctx.fill();
  if (effect.skinId !== 'sweats') {
    ctx.fillStyle = '#76252e'; ctx.beginPath(); ctx.moveTo(-136,-59); ctx.lineTo(-126,-54); ctx.lineTo(-114,-5); ctx.lineTo(-129,2); ctx.closePath(); ctx.fill();
  }
  ctx.save(); ctx.translate(-130,-115); ctx.rotate(0.3);
  ctx.fillStyle = materialGradient('#f1c7a4',-25,-35,28,28);
  ctx.beginPath(); ctx.ellipse(0,0,28,34,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = materialGradient('#6b3f1f',-30,-44,30,12);
  ctx.beginPath(); ctx.moveTo(-28,1); ctx.quadraticCurveTo(-36,-35,-5,-39);
  ctx.quadraticCurveTo(27,-42,31,-6); ctx.lineTo(26,7); ctx.lineTo(21,-9);
  ctx.lineTo(15,2); ctx.lineTo(8,-11); ctx.lineTo(0,3); ctx.lineTo(-7,-10);
  ctx.lineTo(-16,5); ctx.lineTo(-21,-8); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(222,169,102,0.4)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-19,-25); ctx.quadraticCurveTo(3,-36,21,-21); ctx.stroke();
  ctx.restore();
  // Open black cover, layered page edges, and a shaded central spine.
  ctx.fillStyle = '#151419'; ctx.strokeStyle = '#9b8158'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-95,9); ctx.lineTo(24,-6); ctx.lineTo(201,7);
  ctx.lineTo(221,119); ctx.lineTo(21,109); ctx.lineTo(-119,121); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#b8a88b'; ctx.beginPath(); ctx.moveTo(-109,110); ctx.lineTo(20,99); ctx.lineTo(210,110); ctx.lineTo(210,116); ctx.lineTo(20,106); ctx.lineTo(-109,118); ctx.closePath(); ctx.fill();
  ctx.fillStyle = materialGradient('#f5ead1',-80,4,203,112);
  ctx.beginPath(); ctx.moveTo(-88,15); ctx.quadraticCurveTo(-31,3,22,6);
  ctx.quadraticCurveTo(102,-1,195,15); ctx.lineTo(208,108); ctx.quadraticCurveTo(113,93,22,100);
  ctx.quadraticCurveTo(-43,102,-105,111); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#b6a58a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(22,7); ctx.quadraticCurveTo(13,54,22,100); ctx.stroke();
  ctx.strokeStyle = 'rgba(97,84,66,0.16)'; ctx.lineWidth = 0.7;
  for(let i=0;i<5;i++) { ctx.beginPath(); ctx.moveTo(37,44+i*11); ctx.lineTo(184,48+i*11); ctx.stroke(); }
  ctx.fillStyle = '#514332'; ctx.textAlign = 'center'; ctx.font = '600 12px Georgia, serif';
  ctx.fillText('DEATH NOTE',-35,47);
  const name = effect.targetName || 'Opponent';
  ctx.textAlign = 'left'; ctx.font = 'italic 23px Georgia, serif';
  const nameWidth = Math.min(141,ctx.measureText(name).width);
  const tip = {x:37+nameWidth*progress,y:57+Math.sin(progress*50)*1.4};
  ctx.save(); ctx.beginPath(); ctx.rect(35,31,nameWidth*progress+1,37); ctx.clip();
  ctx.fillStyle = '#2d2430'; ctx.fillText(name,37,57,141); ctx.restore();
  // Holding hand and the writing arm connect the pen tip to Light's shoulder.
  const arm = (points,width,color) => {
    ctx.strokeStyle = '#11121b'; ctx.lineWidth = width+5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(...points[0]); for(const q of points.slice(1)) ctx.lineTo(...q); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  };
  arm([[-173,-57],[-194,11],[-103,78]],19,suit);
  ctx.fillStyle = '#e5b891'; ctx.beginPath(); ctx.ellipse(-94,81,13,8,0.2,0,Math.PI*2); ctx.fill();
  arm([[-112,-54],[-75,-14],[tip.x+15,tip.y-23]],22,materialGradient(suit,-105,-60,tip.x,tip.y));
  ctx.strokeStyle = '#ebd5ad'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(tip.x,tip.y); ctx.lineTo(tip.x+23,tip.y-43); ctx.stroke();
  ctx.strokeStyle = '#1c1b23'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(tip.x+5,tip.y-9); ctx.lineTo(tip.x+24,tip.y-45); ctx.stroke();
  ctx.fillStyle = materialGradient('#efc39d',tip.x,tip.y-31,tip.x+26,tip.y-8);
  ctx.beginPath(); ctx.ellipse(tip.x+13,tip.y-22,13,9,-0.6,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#aa7c61'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(tip.x+4,tip.y-20); ctx.lineTo(tip.x+15,tip.y-27); ctx.stroke();
  ctx.restore();
}

function drawArenaFinish() {
  const atmo = STAGE_ATMOSPHERE[currentStageId];
  if (!atmo) return;
  const left = Math.max(0, cameraX - 80), right = Math.min(STAGE_W, cameraX + W / Math.max(0.35,cameraZoom) + 80);
  ctx.save();
  // The light/dark bevel makes the walkable edge clear at every zoom level.
  const ground = ctx.createLinearGradient(0,GROUND,0,GROUND+130);
  ground.addColorStop(0,'rgba(238,232,213,0.18)'); ground.addColorStop(0.05,'rgba(4,7,16,0.05)');
  ground.addColorStop(1,'rgba(2,5,14,0.64)'); ctx.fillStyle=ground;
  ctx.fillRect(left,GROUND,right-left,150);
  ctx.fillStyle='rgba(255,238,201,0.22)'; ctx.fillRect(left,GROUND,right-left,1.5);
  const wooden = currentStageId === 'sunny';
  const tech = currentStageId === 'protoss' || currentStageId === 'space';
  const natural = ['zen','village','upsideDown'].includes(currentStageId);
  const spacing = wooden ? 80 : tech ? 128 : 104;
  ctx.lineWidth = 1;
  for(let x=Math.floor(left/spacing)*spacing;x<right;x+=spacing) {
    if(natural) {
      ctx.strokeStyle=currentStageId==='zen'?'rgba(241,208,155,0.25)':'rgba(131,129,117,0.22)';
      for(let j=0;j<8;j++) {
        const px=x+(j*37)%spacing, y=GROUND+8+(j*19+x*3)%60;
        ctx.beginPath(); ctx.moveTo(px,y); ctx.quadraticCurveTo(px+5,y-3,px+11,y); ctx.stroke();
      }
    } else {
      ctx.strokeStyle='rgba(0,0,0,0.32)';
      ctx.beginPath(); ctx.moveTo(x,GROUND+5); ctx.lineTo(x+19,GROUND+115); ctx.stroke();
      ctx.strokeStyle='rgba(247,231,208,0.09)';
      ctx.beginPath(); ctx.moveTo(x+2,GROUND+5); ctx.lineTo(x+21,GROUND+115); ctx.stroke();
      if(wooden) {
        ctx.strokeStyle='rgba(37,20,9,0.2)';
        ctx.beginPath(); ctx.moveTo(x+13,GROUND+25); ctx.bezierCurveTo(x+55,GROUND+19,x+35,GROUND+39,x+72,GROUND+33); ctx.stroke();
      } else {
        ctx.fillStyle=tech?'rgba(90,219,231,0.55)':'rgba(255,206,129,0.16)';
        ctx.fillRect(x+10,GROUND+8,tech?24:40,2);
        ctx.fillStyle='rgba(207,216,226,0.26)'; ctx.beginPath(); ctx.arc(x+6,GROUND+7,1.6,0,Math.PI*2); ctx.fill();
      }
    }
  }
  // Restrained glints across the distant horizon complement each stage's palette.
  ctx.strokeStyle=atmo.particle; ctx.globalAlpha=0.14; ctx.lineWidth=1;
  for(let i=0;i<10;i++) {
    const x=(i*281+137)%STAGE_W;
    if(x<left||x>right) continue;
    const y=GROUND-30-(i*47)%160;
    ctx.beginPath(); ctx.moveTo(x-3,y); ctx.lineTo(x+3,y); ctx.moveTo(x,y-3); ctx.lineTo(x,y+3); ctx.stroke();
  }
  ctx.restore();
}

function drawProjectileTrail(p) {
  const speed = Math.hypot(p.vx||0,p.vy||0);
  if (speed < 1 || ['cleave','ryukStrike','groundBreak'].includes(p.move)) return;
  const colors = { red:'#fb7185', blue:'#7dd3fc', purple:'#c4b5fd', worldSlash:'#fda4af', slash:'#fda4af', fuga:'#fdba74', webShot:'#e2e8f0', jijiSoccer:'#e9d5ff', davidRocket:'#fbbf24' };
  const color = colors[p.move] || '#c5dbe6';
  const age = Math.min(1,(p.visualSpawnAge||0)/5);
  const length = Math.min(128,speed*5)*age;
  const radius = Math.min(26,(p.radius||12)*0.45);
  ctx.save(); ctx.rotate(Math.atan2(p.vy||0,p.vx||0));
  const glow = ctx.createLinearGradient(-length,0,5,0);
  glow.addColorStop(0,color+'00'); glow.addColorStop(0.68,color+'40'); glow.addColorStop(1,color+'b0');
  ctx.fillStyle=glow;
  ctx.beginPath(); ctx.moveTo(5,-radius); ctx.quadraticCurveTo(-length*0.4,-radius*0.5,-length,0);
  ctx.quadraticCurveTo(-length*0.4,radius*0.5,5,radius); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=color+'80'; ctx.lineWidth=1.4; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-length*0.75,-radius*0.3); ctx.lineTo(-4,-radius*0.3); ctx.stroke();
  ctx.restore();
}
