(function(){
  var style=document.createElement('style');
  style.textContent='#pauseScreen #pauseSettingsButton{background:#d6b84d!important;color:#1a1a1d!important;border-color:#edf2ff!important;box-shadow:0 4px 0 #7b5a18!important}#pauseScreen #pauseSettingsButton:active{box-shadow:0 2px 0 #7b5a18!important}';
  document.head.appendChild(style);

  function grow(age,maxAge,start){
    age=Math.max(0,Math.min(1,age/maxAge));
    var eased=1-Math.pow(1-age,3);
    return start+eased*(1-start);
  }

  function applyPatch(){
    var canvas=document.getElementById('game');
    var patchCtx=canvas&&canvas.getContext?canvas.getContext('2d'):null;

    if(typeof toggleInfinity==='function'){
      var oldToggle=toggleInfinity;
      toggleInfinity=function(f){
        var was=!!(f&&f.infinityActive);
        var result=oldToggle(f);
        if(result&&f&&f.infinityActive&&!was){
          f.infinityVisualAge=0;
        }
        return result;
      };
    }

    if(patchCtx&&typeof isInfinityActive==='function'&&typeof getFighterCenter==='function'){
      drawInfinityField=function(f){
        if(!f||!isInfinityActive(f)){
          if(f)f.infinityVisualAge=0;
          return;
        }
        f.infinityVisualAge=Math.min(16,(f.infinityVisualAge||0)+1);
        var ctx=patchCtx;
        var center=getFighterCenter(f);
        var fieldY=center.y-8;
        var s=grow(f.infinityVisualAge,16,0.04);
        var t=performance.now()/1000;
        var radius=106*(1+Math.sin(t*9.6)*0.045)*s;
        var ceRatio=Math.max(0,Math.min(1,(f.ce||0)/Math.max(1,f.maxCe||1)));
        var spin=t*2.1;
        ctx.save();
        ctx.globalCompositeOperation='lighter';
        ctx.globalAlpha=Math.min(1,0.12+s*0.88);
        var glow=ctx.createRadialGradient(center.x,fieldY,Math.max(1,radius*0.12),center.x,fieldY,Math.max(2,radius*1.18));
        glow.addColorStop(0,'rgba(224,242,254,'+(0.10+ceRatio*0.05)+')');
        glow.addColorStop(0.42,'rgba(56,189,248,'+(0.12+ceRatio*0.06)+')');
        glow.addColorStop(0.78,'rgba(37,99,235,0.08)');
        glow.addColorStop(1,'rgba(14,165,233,0)');
        ctx.fillStyle=glow;
        ctx.beginPath();
        ctx.arc(center.x,fieldY,Math.max(1,radius*1.2),0,Math.PI*2);
        ctx.fill();
        for(var i=0;i<3;i++){
          var r=radius*(0.72+i*0.16);
          ctx.strokeStyle='rgba(191,219,254,'+(0.42-i*0.08)+')';
          ctx.lineWidth=2+i*0.9;
          ctx.setLineDash(i===1?[13,9]:[7,13]);
          ctx.lineDashOffset=-(t*60*(0.65+i*0.25));
          ctx.beginPath();
          ctx.ellipse(center.x,fieldY,Math.max(1,r*(1+i*0.02)),Math.max(1,r*(0.88+i*0.03)),spin*(i+1),0,Math.PI*2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.strokeStyle='rgba(125,211,252,0.7)';
        ctx.lineWidth=1.5;
        for(var j=0;j<7;j++){
          var a=t*2.1+j*Math.PI*2/7;
          var x=center.x+Math.cos(a)*radius*0.85;
          var y=fieldY+Math.sin(a)*radius*0.72;
          ctx.beginPath();
          ctx.arc(x,y,2.2+Math.sin(t*6+j)*0.9,0,Math.PI*2);
          ctx.stroke();
        }
        ctx.globalCompositeOperation='source-over';
        ctx.restore();
      };
    }
  }

  window.addEventListener('load',applyPatch);
  setTimeout(applyPatch,0);
})();
