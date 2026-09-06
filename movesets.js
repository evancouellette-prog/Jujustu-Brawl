/* Character guide: describes existing mechanics without adding new passives. */
const CHARACTER_PASSIVES = {
  limitless: '', deathnote: '', brawler: '',
  shrine: 'Damage rises as health bars are lost: +14% with two bars left and +28% on the last bar. Heian Sukuna alternates all four arms and punches faster.',
  blackleg: 'Heat: build Heat through combat. At full Heat, the next fire attack deals extra damage and applies burn.',
  hivemind: 'Hive Mind: build Corruption through your creatures and abilities. At full Corruption, the next summon or ability is enhanced.',
  zealot: 'Protoss Shields: a shield worth 25% of maximum HP absorbs damage and regenerates after five seconds without taking damage.',
  spider: 'Spider Sense: a perfect dodge grants a speed boost and refunds cooldowns. Marked opponents take extra combo damage.',
  beast: 'Beast Instinct: reduced hitstun, resistance to damage over time, and a speed burst after a completed combo.',
  jiji: 'Shared Body: Jiji and Evil Eye share HP and Ultimate. Jiji recovers outside combat; Evil Eye builds Rage and can lose control at high Rage.',
  david: 'Built Different: Cyberware Load increases speed and damage. At maximum Load, Cyberpsychosis grants stronger attacks at the cost of control and HP.',
  akira: 'Bucket List: complete the three active goals to earn buffs for the round. Open the notebook to see your current goals.',
  gardener: 'Sun Economy: Sun builds over time, and Sunflowers generate more. Spend Sun on your selected seed packets.'
};

const MOVE_EXPLANATIONS = {
  'Blue':'Aimed energy that pulls the opponent toward it. Hold to charge.',
  'Red':'Aimed energy that pushes the opponent away. Hold to charge.',
  'Teleport':'Hold to choose a destination, then release to move there.',
  'Blue Punch':'Charge a close-range sequence of Blue-enhanced punches.',
  'Infinity':'Toggle a defensive barrier that consumes Cursed Energy.',
  'Hollow Purple':'Red and Blue merge for 1.5 seconds. A brief camera focus leads into the aimed projectile.',
  'World Cutting Slash':'Point toward your aim for 1.5 seconds, then fire after a brief camera focus.',
  'Dismantle':'Fire an aimed slash across the arena.',
  'Cleave':'Cut a close-range area along your aim.',
  'Fuga':'Hold to charge the fire arrow and release to fire. An early release queues the shot until ready.',
  'RCT':'Hold to restore HP by spending Cursed Energy.',
  'Domain Expansion':'Use a full Ultimate meter and sufficient Cursed Energy to open your domain.',
  'Simple Domain':'Create a temporary defensive field to counter domain pressure.',
  'Binding Vow':'Choose a temporary vow to change one of Sukuna’s techniques.',
  'Shinigami Strike':'Ryuk rushes to your aim and strikes with his fist.',
  'Name Investigation':'Place Misa or Soichiro at the investigation marker to gather Name progress.',
  'Potato Chip':'Recover HP and accelerate existing cooldowns. Active investigators also gather Name faster.',
  'Death Note':'With full Name progress, write the opponent’s name to release the ultimate.',
  'Ground Break':'Throw a piece of ground as a ranged attack.',
  'Flying Dash':'Rush through the air toward the opponent.',
  'War Stomp':'Send waves along the ground in both directions.',
  'Diable Jambe':'Use a fire-enhanced kick.',
  'Mutton Shot':'Launch a close-range kick sequence.',
  'Sky Walk':'Kick the air to gain height. Attack during Sky Walk to dive.',
  'Throw Utensil':'Throw the currently selected utensil; each type has a different effect.',
  'Switch Utensil':'Cycle the available utensils.',
  'Cook':'Recover HP during the cooking action.',
  'Ifrit Jambe':'Power up your fire attacks and unlock the Boeuf Burst finisher near the end.',
  'Demobat Swarm':'Summon flying creatures to pressure the opponent.',
  'Demodog Hunt':'Summon a ground creature that pursues the opponent.',
  'Upside Down Slip':'Move through the ground; recast to erupt.',
  'Bone Snap':'Use a close-range control attack.',
  'The Upside Down':'Pull the battle into Vecna’s ultimate area.',
  'Charge':'Rush forward with your psi blades.',
  'Psi Blade Flurry':'Strike repeatedly at close range.',
  'Whirlwind':'Hold for a spinning blade attack; release to stop.',
  'Warp Reinforcements':'Call allied Protoss units into the battle.',
  'Web Shot':'Mark the opponent with a web. Recast to zip toward the mark.',
  'Web Barrage':'Apply web pressure; a webbed opponent can be cocooned.',
  'Web Swing':'Swing through the arena and attack to deliver a flying kick.',
  'Spider Rush':'Rush into close-range pressure.',
  'Friendly Neighborhood':'Activate Spider-Man’s ultimate combat boost.',
  'First Fang':'Thrust forward with both swords.',
  'Third Fang':'Advance while attacking with both blades.',
  'Fifth Fang':'Unleash a flurry of cuts.',
  'Eighth Form':'Rush forward explosively.',
  'Seventh Form':'Activate Spatial Awareness for a temporary movement advantage.',
  'Tenth Fang':'Spin with both blades.',
  'Rampaging Beast':'Power up Beast Breathing and gain the Palisade Bite finisher.',
  'Transform':'Switch between Jiji and Evil Eye.',
  'Spirit Blast':'Fire a ranged spirit projectile.',
  'Soccer Strike':'Kick a projectile toward the opponent.',
  'Evil Spirit Blast':'Fire Evil Eye’s faster spirit projectile.',
  'Berserker Rush':'Rush forward in Evil Eye form.',
  'Spiritual Acceptance':'Activate the ultimate for your current form.',
  'Gorilla Arms':'Use a powerful launching melee attack.',
  'Projectile Launcher':'Fire David’s ranged weapon.',
  'Sandevistan':'Gain a burst of movement speed.',
  'Cyber Skeleton':'Activate David’s ultimate enhancement.',
  'Joy Ride':'Rush with Akira’s vehicle attack.',
  'Volt Punch':'Deliver an electrically charged punch.',
  'Overtime':'Build Work while committing to the action.',
  'Cold Beer':'Restore HP at a Work cost.',
  'Shark Suit':'Activate a temporary defensive suit.',
  'Bucket List notebook':'Show your current goals and progress.',
  'Bucket List!':'Spend Work on an ultimate whose strength scales with your progress.',
  'Plant Food':'Temporarily empower one of your plants.',
  'Crazy Garden':'Boost Sun production and accelerate seed cooldowns.'
};

function getMovesetRows(technique) {
  const holder = document.createElement('div');
  holder.innerHTML = technique === 'gardener'
    ? '<span><kbd>Left Click</kbd> Seed Packet 1</span><span><kbd>Right Click</kbd> Seed Packet 2</span><span><kbd>S</kbd> Seed Packet 3</span><span><kbd>F</kbd> Seed Packet 4</span><span><kbd>R</kbd> Plant Food</span><span><kbd>T</kbd> Auto / Manual Aim</span><span><kbd>C</kbd> Crazy Garden</span>'
    : getTechniqueControlHtml(technique);
  if (technique === 'shrine' || technique === 'limitless') holder.innerHTML += getExtraBattleControlHtml(technique);
  const bound = {S:'specialAim',C:'ultimate',R:'rct',F:'infinity',T:'bluePunch'};
  return Array.from(holder.children).map(row => {
    const keys = Array.from(row.querySelectorAll('kbd')).map(kbd => {
      const text = kbd.textContent;
      const key = text.replace('Hold ','');
      const action = bound[key];
      const usesBinding = action && (['specialAim','ultimate'].includes(action) || ['shrine','limitless'].includes(technique));
      kbd.remove();
      return usesBinding ? text.replace(key,controlKeyLabel(action)) : text;
    });
    const name = row.textContent.trim();
    const match = Object.keys(MOVE_EXPLANATIONS).sort((a,b)=>b.length-a.length).find(key=>name.includes(key));
    return {input:keys.join(' + '),name,description:match ? MOVE_EXPLANATIONS[match] : ''};
  });
}

let movesetsReturnFocus = null;
function closeMovesetsScreen() {
  document.getElementById('movesetsScreen')?.classList.add('hidden');
  movesetsReturnFocus?.focus();
}
function showCharacterMoveset(technique) {
  if (!CHARACTER_SKINS[technique]) return;
  const screen = document.getElementById('movesetsScreen');
  screen.querySelector('#movesetName').textContent = getTechniqueCharacterName(technique);
  screen.querySelector('#movesetPassive').textContent = CHARACTER_PASSIVES[technique] || '';
  screen.querySelectorAll('[data-moveset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.moveset===technique)));
  const body = screen.querySelector('tbody');body.replaceChildren();
  for (const move of getMovesetRows(technique)) {
    const row = document.createElement('tr');
    for (const text of [move.input,move.name,move.description]) {const cell=document.createElement('td');cell.textContent=text;row.appendChild(cell);}
    body.appendChild(row);
  }
  screen.querySelector('#movesetBasics').textContent = `${controlKeyLabel('moveLeft')} / ${controlKeyLabel('moveRight')}: move · ${controlKeyLabel('jump')}: jump · ${controlKeyLabel('light')}: light attack · ${controlKeyLabel('heavy')}: heavy attack · ${controlKeyLabel('block')}: block · ${controlKeyLabel('dodge')}: dodge · ${controlKeyLabel('throw')}: throw`;
  drawTechniquePreview(screen.querySelector('canvas'),technique,getSelectedSkin(technique));
}
function openMovesetsScreen() {
  movesetsReturnFocus = document.activeElement;
  document.getElementById('movesetsScreen').classList.remove('hidden');
  showCharacterMoveset(getControlledTechniqueForControls());
  document.getElementById('closeMovesets').focus();
}

(function installMovesets() {
  const screen = document.createElement('section');
  screen.id='movesetsScreen';screen.className='movesets-screen hidden';
  screen.setAttribute('role','dialog');screen.setAttribute('aria-modal','true');screen.setAttribute('aria-labelledby','movesetsTitle');
  screen.innerHTML='<div class="movesets-panel"><header><h2 id="movesetsTitle">Movesets</h2><button id="closeMovesets" type="button">Close</button></header><nav aria-label="Character movesets"></nav><div class="moveset-profile"><canvas width="180" height="160" aria-label="Selected character"></canvas><div><h3 id="movesetName"></h3><h4>Passive</h4><p id="movesetPassive"></p></div></div><p id="movesetBasics"></p><div class="moveset-table"><table><thead><tr><th>Input</th><th>Move</th><th>Effect</th></tr></thead><tbody></tbody></table></div></div>';
  for (const technique of Object.keys(CHARACTER_SKINS)) {
    const button=document.createElement('button');button.type='button';button.dataset.moveset=technique;
    button.textContent=getTechniqueCharacterName(technique);button.addEventListener('click',()=>showCharacterMoveset(technique));screen.querySelector('nav').appendChild(button);
  }
  document.body.appendChild(screen);
  screen.querySelector('#closeMovesets').addEventListener('click',closeMovesetsScreen);
  screen.addEventListener('click',e=>{if(e.target===screen)closeMovesetsScreen();});
  screen.addEventListener('keydown',e=>{
    e.stopPropagation();
    if(e.key==='Escape'){e.preventDefault();closeMovesetsScreen();}
    if(e.key==='Tab'){
      const buttons=Array.from(screen.querySelectorAll('button')),first=buttons[0],last=buttons.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  for(const selector of ['.start-actions','#techniqueScreen .technique-panel','#pauseScreen .home-actions']) {
    const parent=document.querySelector(selector);if(!parent)continue;
    const button=document.createElement('button');button.type='button';button.className='movesets-open';button.textContent='Movesets';
    button.addEventListener('click',openMovesetsScreen);parent.appendChild(button);
  }
})();
