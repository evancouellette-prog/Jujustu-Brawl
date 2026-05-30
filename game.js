/* FULL UPDATED GAME.JS - generated with requested gameplay/UI/radio changes */
const canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
const playerHealthEl = document.getElementById("playerHealth");
const enemyHealthEl = document.getElementById("enemyHealth");
const playerCeEl = document.getElementById("playerCe");
const enemyCeEl = document.getElementById("enemyCe");
const playerUltimateEl = document.getElementById("playerUltimate");
const enemyUltimateEl = document.getElementById("enemyUltimate");
const playerExtraCooldownsEl = document.getElementById("playerExtraCooldowns");
const enemyExtraCooldownsEl = document.getElementById("enemyExtraCooldowns");
const ctHud = {
  player: [
    {
      slot: document.getElementById("playerCt1Slot"),
      label: document.getElementById("playerCt1Label"),
      fill: document.getElementById("playerCt1Fill"),
      status: document.getElementById("playerCt1Status")
    },
    {
      slot: document.getElementById("playerCt2Slot"),
      label: document.getElementById("playerCt2Label"),
      fill: document.getElementById("playerCt2Fill"),
      status: document.getElementById("playerCt2Status")
    },
    {
      slot: document.getElementById("playerCt3Slot"),
      label: document.getElementById("playerCt3Label"),
      fill: document.getElementById("playerCt3Fill"),
      status: document.getElementById("playerCt3Status")
    }
  ],
  enemy: [
    {
      slot: document.getElementById("enemyCt1Slot"),
      label: document.getElementById("enemyCt1Label"),
      fill: document.getElementById("enemyCt1Fill"),
      status: document.getElementById("enemyCt1Status")
    },
    {
      slot: document.getElementById("enemyCt2Slot"),
      label: document.getElementById("enemyCt2Label"),
      fill: document.getElementById("enemyCt2Fill"),
      status: document.getElementById("enemyCt2Status")
    },
    {
      slot: document.getElementById("enemyCt3Slot"),
      label: document.getElementById("enemyCt3Label"),
      fill: document.getElementById("enemyCt3Fill"),
      status: document.getElementById("enemyCt3Status")
    }
  ]
};
const roundInfoEl = document.getElementById("roundInfo");
const scoreInfoEl = document.getElementById("scoreInfo");
const playerNameEl = document.getElementById("playerName");
const enemyNameEl = document.getElementById("enemyName");
const playerStarsEl = document.getElementById("playerStars");
const enemyStarsEl = document.getElementById("enemyStars");
const pauseButton = document.getElementById("pauseButton");
const homeButton = document.getElementById("homeButton");
const restartButton = document.getElementById("restartButton");
const readyPrompt = document.getElementById("readyPrompt");
const readyButton = document.getElementById("readyButton");
const readyStatus = document.getElementById("readyStatus");
const homeScreen = document.getElementById("homeScreen");
const startFightButton = document.getElementById("startFightButton");
const practiceModeButton = document.getElementById("practiceModeButton");
const practiceSettingsButton = document.getElementById("practiceSettingsButton");
const practiceSettingsScreen = document.getElementById("practiceSettingsScreen");
const practiceSettingsCloseButton = document.getElementById("practiceSettingsCloseButton");
const practiceSettingButtons = Array.from(document.querySelectorAll(".practice-setting-button"));
const practiceDamageMeter = document.getElementById("practiceDamageMeter");
const practiceDamageValue = document.getElementById("practiceDamageValue");
const cpuModeButton = document.getElementById("cpuModeButton");
const pvpModeButton = document.getElementById("pvpModeButton");
const cpuDifficultyPanel = document.getElementById("cpuDifficultyPanel");
const difficultyButtons = Array.from(document.querySelectorAll(".difficulty-button"));
const musicVolumeSliders = Array.from(document.querySelectorAll(".music-volume-slider"));
const musicVolumeValues = Array.from(document.querySelectorAll(".music-volume-value"));
const musicVolumeIcons = Array.from(document.querySelectorAll(".volume-icon"));
const musicToggleButtons = Array.from(document.querySelectorAll(".music-toggle-button"));
const radioScreen = document.getElementById("radioScreen");
const radioOpenButtons = Array.from(document.querySelectorAll(".radio-open-button"));
const radioCloseButton = document.getElementById("radioCloseButton");
const radioTrackTitles = Array.from(document.querySelectorAll(".radio-track-title"));
const radioTrackArtists = Array.from(document.querySelectorAll(".radio-track-artist"));
const musicPrevButtons = Array.from(document.querySelectorAll(".music-prev-button"));
const musicNextButtons = Array.from(document.querySelectorAll(".music-next-button"));
const musicProgressTracks = Array.from(document.querySelectorAll(".music-progress-track"));
const musicProgressFills = Array.from(document.querySelectorAll(".music-progress-fill"));
const musicCurrentTimeEls = Array.from(document.querySelectorAll(".music-time-current"));
const musicDurationEls = Array.from(document.querySelectorAll(".music-time-duration"));
const roomCodeInput = document.getElementById("roomCodeInput");
const hostBattleButton = document.getElementById("hostBattleButton");
const joinBattleButton = document.getElementById("joinBattleButton");
const waitingScreen = document.getElementById("waitingScreen");
const waitingTitle = document.getElementById("waitingTitle");
const waitingCode = document.getElementById("waitingCode");
const waitingCopy = document.getElementById("waitingCopy");
const cancelOnlineButton = document.getElementById("cancelOnlineButton");
const techniqueScreen = document.getElementById("techniqueScreen");
const techniqueButtons = Array.from(document.querySelectorAll(".technique-button"));
const techniquePreviewCanvases = {
  limitless: document.getElementById("limitlessPreview"),
  shrine: document.getElementById("shrinePreview")
};
const pauseScreen = document.getElementById("pauseScreen");
const resumeButton = document.getElementById("resumeButton");
const pauseRestartButton = document.getElementById("pauseRestartButton");
const pauseHomeButton = document.getElementById("pauseHomeButton");
const rivalControls = document.getElementById("rivalControls");
const controlsGrid = document.querySelector("#controlsPanel .controls-grid");
const message = document.getElementById("message");
const messageTitle = document.getElementById("messageTitle");
const messageCopy = document.getElementById("messageCopy");
const countdownOverlay = document.getElementById("countdownOverlay");
const settingsButtons = Array.from(document.querySelectorAll(".settings-button"));
const settingsScreen = document.getElementById("settingsScreen");
const settingsCloseButton = document.getElementById("settingsCloseButton");
const buttonSfxVolumeSlider = document.getElementById("buttonSfxVolumeSlider");
const gameSfxVolumeSlider = document.getElementById("gameSfxVolumeSlider");
const usernameInput = document.getElementById("usernameInput");
const keybindsButton = document.getElementById("keybindsButton");
const keybindScreen = document.getElementById("keybindScreen");
const keybindList = document.getElementById("keybindList");
const keybindWarning = document.getElementById("keybindWarning");
const keybindCloseButton = document.getElementById("keybindCloseButton");
const keybindResetButton = document.getElementById("keybindResetButton");
const PLAYER_NAME_STORAGE_KEY = "jujutsuBrawlPlayerName";
const BUTTON_SFX_VOLUME_STORAGE_KEY = "jujutsuBrawlButtonSfxVolume";
const GAME_SFX_VOLUME_STORAGE_KEY = "jujutsuBrawlGameSfxVolume";

const KEY_BINDINGS_STORAGE_KEY = "jujutsuBrawlKeyBindingsV2";
const DEFAULT_KEY_BINDINGS = {
  moveLeft: "KeyA",
  moveRight: "KeyD",
  jump: "Space",
  light: "KeyW",
  heavy: "KeyE",
  block: "KeyQ",
  dodge: "ShiftLeft",
  rct: "KeyR",
  infinity: "KeyF",
  bluePunch: "KeyT",
  specialAim: "KeyS",
  ultimate: "KeyC",
  throw: "Tab",
  pause: "Escape"
};
const KEY_BINDING_LABELS = {
  moveLeft: "Move Left",
  moveRight: "Move Right",
  jump: "Jump",
  light: "Light Punch",
  heavy: "Heavy Punch",
  block: "Block / Shield",
  dodge: "Dodge",
  rct: "RCT Hold",
  infinity: "Infinity",
  bluePunch: "Blue Amp Punch",
  specialAim: "Teleport / Fuga Aim",
  ultimate: "Ultimate Aim",
  throw: "Throw",
  pause: "Pause"
};
let keyBindings = loadKeyBindings();
let listeningForKeybind = null;

let localPlayerName = "Player";
let buttonSfxVolume = 0.45;
let gameSfxVolume = 0.75;

let uiAudioContext = null;
let displayedReadyCountdown = 0;
let backgroundMusicStarted = false;
let backgroundMusicTimer = 0;
let musicStep = 0;
let nextMusicTime = 0;
let activeMusicMode = "menu";
let musicMasterGain = null;
const MUSIC_VOLUME_STORAGE_KEY = "jujutsuBrawlMusicVolume";
const MUSIC_TRACK_STORAGE_KEY = "jujutsuBrawlMusicTrack";
const RADIO_TRACKS = [
  { title: "Judas", artist: "Lady Gaga", type: "audio", src: "assets/judas.mp3?v=12", style: "battle" },
  { title: "If I Am With You", artist: "Yoshimasa Terui", type: "audio", src: "assets/if-i-am-with-you.mp3", style: "menu" },
  { title: "Kaikai Kitan", artist: "Eve", type: "audio", src: "assets/kaikai-kitan.mp3", style: "battle" },
  { title: "Inferno", artist: "Mrs. GREEN APPLE", type: "audio", src: "assets/inferno.mp3", style: "battle" },
  { title: "Black Catcher", artist: "Vickeblanka", type: "audio", src: "assets/black-catcher.mp3", style: "battle" },
  { title: "Paint It Black", artist: "London Symphony Orchestra", type: "audio", src: "assets/paint-it-black.mp3", style: "menu" },
  { title: "Gurenge", artist: "LiSA", type: "audio", src: "assets/gurenge.mp3", style: "battle" },
  { title: "More Than Words", artist: "Hitsujibungaku", type: "audio", src: "assets/more-than-words.mp3", style: "menu" }
];
let musicVolume = loadSavedMusicVolume();
let musicMuted = false;
let currentRadioTrackIndex = loadSavedTrackIndex();
let lastMusicSeekStamp = 0;
// MUSIC_CONTINUES_THROUGH_MATCH_START
const battleMusic = new Audio();
battleMusic.loop = false;
battleMusic.preload = "auto";
const countdownSound = new Audio("assets/countdown.mp3");
countdownSound.preload = "auto";
countdownSound.volume = 0.95;
const buttonClickSounds = Array.from({ length: 5 }, () => {
  const sound = new Audio("assets/button-click.mp3");
  sound.preload = "auto";
  sound.volume = buttonSfxVolume;
  return sound;
});
let buttonClickSoundIndex = 0;

const MENU_MUSIC_STEP_SECONDS = 60 / 84 / 2;
const BATTLE_MUSIC_STEP_SECONDS = 60 / 146 / 2;


function loadSimpleVolumeSetting(key, fallback) {
  try {
    const saved = Number(window.localStorage.getItem(key));
    if (Number.isFinite(saved)) return Math.max(0, Math.min(1, saved / 100));
  } catch (err) {}
  return fallback;
}

function saveSimpleVolumeSetting(key, value) {
  try { window.localStorage.setItem(key, String(Math.round(value * 100))); } catch (err) {}
}

function openSettingsScreen() {
  if (!settingsScreen) return;
  if (buttonSfxVolumeSlider) buttonSfxVolumeSlider.value = String(Math.round(buttonSfxVolume * 100));
  if (gameSfxVolumeSlider) gameSfxVolumeSlider.value = String(Math.round(gameSfxVolume * 100));
  settingsScreen.classList.remove("hidden");
}

function closeSettingsScreen() {
  if (settingsScreen) settingsScreen.classList.add("hidden");
}




function loadKeyBindings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY_BINDINGS_STORAGE_KEY) || "{}");
    const next = { ...DEFAULT_KEY_BINDINGS };
    const used = new Set();

    Object.keys(DEFAULT_KEY_BINDINGS).forEach((action) => {
      const savedKey = typeof saved[action] === "string" ? saved[action] : DEFAULT_KEY_BINDINGS[action];
      if (savedKey && !used.has(savedKey)) {
        next[action] = savedKey;
        used.add(savedKey);
      } else {
        next[action] = DEFAULT_KEY_BINDINGS[action];
        used.add(next[action]);
      }
    });

    return next;
  } catch (err) {
    return { ...DEFAULT_KEY_BINDINGS };
  }
}

function saveKeyBindings() {
  try {
    window.localStorage.setItem(KEY_BINDINGS_STORAGE_KEY, JSON.stringify(keyBindings));
  } catch (err) {}
}

function getBoundKey(action) {
  return keyBindings?.[action] || DEFAULT_KEY_BINDINGS[action];
}

function isBoundPressed(action) {
  const bound = getBoundKey(action);
  if (!bound) return false;
  return keys.has(bound) || keys.has(String(bound).toLowerCase());
}

function keyName(code) {
  if (!code) return "Unset";
  const names = {
    Space: "Space",
    Tab: "Tab",
    Escape: "Esc",
    ShiftLeft: "Left Shift",
    ShiftRight: "Right Shift",
    ControlLeft: "Left Ctrl",
    ControlRight: "Right Ctrl",
    AltLeft: "Left Alt",
    AltRight: "Right Alt",
    ArrowLeft: "←",
    ArrowRight: "→",
    ArrowUp: "↑",
    ArrowDown: "↓",
    Slash: "/"
  };
  if (names[code]) return names[code];
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  return code;
}

function isKeyAlreadyUsed(action, code) {
  return Object.entries(keyBindings).some(([otherAction, otherCode]) => otherAction !== action && otherCode === code);
}

function renderKeybindList() {
  if (!keybindList) return;
  keybindList.innerHTML = "";

  Object.keys(KEY_BINDING_LABELS).forEach((action) => {
    const row = document.createElement("div");
    row.className = "keybind-row";

    const label = document.createElement("span");
    label.textContent = KEY_BINDING_LABELS[action];

    const button = document.createElement("button");
    button.type = "button";
    button.className = "keybind-set-button";
    button.dataset.action = action;
    button.textContent = listeningForKeybind === action ? "Press a key..." : keyName(getBoundKey(action));
    button.classList.toggle("listening", listeningForKeybind === action);

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      listeningForKeybind = action;
      if (keybindWarning) keybindWarning.textContent = `Press a key for ${KEY_BINDING_LABELS[action]}.`;
      renderKeybindList();
    });

    row.append(label, button);
    keybindList.appendChild(row);
  });
}

function openKeybindScreen() {
  if (!keybindScreen) return;
  listeningForKeybind = null;
  if (keybindWarning) keybindWarning.textContent = "";
  renderKeybindList();
  keybindScreen.classList.remove("hidden");
}

function closeKeybindScreen() {
  if (!keybindScreen) return;
  listeningForKeybind = null;
  keybindScreen.classList.add("hidden");
  renderKeybindList();
  updateControlsPanelKeybindLabels();
}

function setKeyBinding(action, code) {
  if (!action || !code || !DEFAULT_KEY_BINDINGS[action]) return false;

  if (["F5", "F11", "F12"].includes(code)) {
    if (keybindWarning) keybindWarning.textContent = "That key is reserved by the browser.";
    return false;
  }

  if (isKeyAlreadyUsed(action, code)) {
    const usedBy = Object.entries(keyBindings).find(([otherAction, otherCode]) => otherAction !== action && otherCode === code)?.[0];
    if (keybindWarning) keybindWarning.textContent = `${keyName(code)} is already used for ${KEY_BINDING_LABELS[usedBy] || usedBy}.`;
    return false;
  }

  keyBindings[action] = code;
  saveKeyBindings();
  updateControlsPanelKeybindLabels();
  if (keybindWarning) keybindWarning.textContent = `Saved ${KEY_BINDING_LABELS[action]} as ${keyName(code)}.`;
  return true;
}

function resetKeyBindings() {
  keyBindings = { ...DEFAULT_KEY_BINDINGS };
  listeningForKeybind = null;
  saveKeyBindings();
  updateControlsPanelKeybindLabels();
  if (keybindWarning) keybindWarning.textContent = "Defaults restored.";
  renderKeybindList();
}

// DYNAMIC_CONTROLS_KEYBIND_LABEL_PATCH
function controlKeyLabel(action) {
  return keyName(getBoundKey(action));
}

function makeControlKbd(label) {
  return `<kbd>${String(label).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]))}</kbd>`;
}

function updateControlsPanelKeybindLabels() {
  if (!controlsGrid) return;

  controlsGrid.innerHTML = `
    <p><strong>Move</strong>
      <span>${makeControlKbd(controlKeyLabel("moveLeft"))}${makeControlKbd(controlKeyLabel("moveRight"))} walk</span>
      <span>${makeControlKbd(controlKeyLabel("jump"))} jump / double jump</span>
    </p>
    <p><strong>Attack</strong>
      <span>${makeControlKbd(controlKeyLabel("light"))} light punch</span>
      <span>${makeControlKbd(controlKeyLabel("heavy"))} heavy punch</span>
      <span><kbd>Toward</kbd>${makeControlKbd(controlKeyLabel("throw"))} throw</span>
    </p>
    <p><strong>Defend</strong>
      <span>${makeControlKbd(controlKeyLabel("block"))} block</span>
      <span>${makeControlKbd(controlKeyLabel("dodge"))} dodge</span>
    </p>
    <p><strong>Technique</strong>
      <span><kbd>Left Click</kbd> Blue</span>
      <span><kbd>Right Click</kbd> Red / Dismantle</span>
      <span>${makeControlKbd(controlKeyLabel("specialAim"))} Teleport / Fuga aim</span>
      <span>${makeControlKbd(controlKeyLabel("ultimate"))} Ultimate aim</span>
      <span>${makeControlKbd(controlKeyLabel("infinity"))} Infinity</span>
      <span>${makeControlKbd(controlKeyLabel("bluePunch"))} Blue Amp</span>
      <span>${makeControlKbd(controlKeyLabel("rct"))} hold RCT</span>
    </p>
  `;
}



if (keybindsButton) keybindsButton.addEventListener("click", openKeybindScreen);
if (keybindCloseButton) keybindCloseButton.addEventListener("click", closeKeybindScreen);
if (keybindResetButton) keybindResetButton.addEventListener("click", resetKeyBindings);





// CLEAN_NAME_TAG_SYSTEM_PATCH


















function sanitizePlayerName(name, fallback = "Player") {
  const clean = String(name || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 18);
  return clean || fallback;
}

function getLocalPlayerName() {
  if (usernameInput) {
    localPlayerName = sanitizePlayerName(usernameInput.value, "Player");
  }
  return sanitizePlayerName(localPlayerName, "Player");
}

function loadLocalPlayerName() {
  try {
    localPlayerName = sanitizePlayerName(window.localStorage.getItem(PLAYER_NAME_STORAGE_KEY), "Player");
  } catch (err) {
    localPlayerName = "Player";
  }

  if (usernameInput) usernameInput.value = localPlayerName === "Player" ? "" : localPlayerName;
  updatePlayerNameLabels();
}

function saveLocalPlayerName() {
  localPlayerName = getLocalPlayerName();
  try {
    window.localStorage.setItem(PLAYER_NAME_STORAGE_KEY, localPlayerName);
  } catch (err) {}

  updatePlayerNameLabels();
  sendOnlineName();
}

function getPlayerLabel() {
  const mode = typeof gameMode !== "undefined" ? gameMode : "cpu";
  const role = typeof onlineRole !== "undefined" ? onlineRole : null;

  if (mode === "online" && role === "p2") {
    return sanitizePlayerName(onlinePlayerNames.p1, "Player 1");
  }

  return getLocalPlayerName();
}

function getEnemyLabel() {
  const mode = typeof gameMode !== "undefined" ? gameMode : "cpu";
  const role = typeof onlineRole !== "undefined" ? onlineRole : null;

  if (mode === "practice") return "Practice Dummy";
  if (mode === "cpu") return "CPU";

  if (mode === "online") {
    if (role === "p1") return sanitizePlayerName(onlinePlayerNames.p2, "Player 2");
    if (role === "p2") return getLocalPlayerName();
  }

  return "Player 2";
}

function updatePlayerNameLabels() {
  if (playerNameEl) playerNameEl.textContent = getPlayerLabel();
  if (enemyNameEl) enemyNameEl.textContent = getEnemyLabel();
}

function sendOnlineName() {
  if (typeof onlineSocket === "undefined" || typeof onlineConnected === "undefined" || typeof onlineRole === "undefined") return;
  if (!onlineSocket || !onlineConnected || !onlineRole) return;

  try {
    onlineSocket.send(JSON.stringify({
      type: "name",
      role: onlineRole,
      name: getLocalPlayerName()
    }));
  } catch (err) {}
}

function handleOnlineNameMessage(data) {
  if (!data || data.type !== "name") return false;

  const role = data.role === "p2" ? "p2" : "p1";
  onlinePlayerNames[role] = sanitizePlayerName(data.name, role === "p1" ? "Player 1" : "Player 2");
  updatePlayerNameLabels();
  return true;
}


// NAME_TAG_INIT_PATCH
window.setTimeout(() => {
  loadLocalPlayerName();

  if (usernameInput) {
    usernameInput.addEventListener("input", saveLocalPlayerName);
    usernameInput.addEventListener("change", saveLocalPlayerName);
  }
}, 0);

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!uiAudioContext) uiAudioContext = new AudioContextClass();
  if (uiAudioContext.state === "suspended") uiAudioContext.resume();
  return uiAudioContext;
}

function getMusicOutput(audio) {
  if (!musicMasterGain) {
    musicMasterGain = audio.createGain();
    musicMasterGain.gain.setValueAtTime(getEffectiveMusicVolume(), audio.currentTime);
    musicMasterGain.connect(audio.destination);
  }
  return musicMasterGain;
}

function getEffectiveMusicVolume() {
  return musicMuted ? 0 : musicVolume;
}

function loadSavedMusicVolume() {
  try {
    const saved = window.localStorage.getItem(MUSIC_VOLUME_STORAGE_KEY);
    if (saved === null) return 0.85;
    const numeric = Number(saved);
    if (!Number.isFinite(numeric)) return 0.85;
    return Math.max(0, Math.min(1, numeric > 1 ? numeric / 100 : numeric));
  } catch (err) {
    return 0.85;
  }
}

function loadSavedTrackIndex() {
  try {
    const saved = Number(window.localStorage.getItem(MUSIC_TRACK_STORAGE_KEY));
    if (!Number.isFinite(saved)) return 0;
    return ((Math.floor(saved) % RADIO_TRACKS.length) + RADIO_TRACKS.length) % RADIO_TRACKS.length;
  } catch (err) {
    return 0;
  }
}

function saveMusicVolume() {
  try {
    window.localStorage.setItem(MUSIC_VOLUME_STORAGE_KEY, String(Math.round(musicVolume * 100)));
  } catch (err) {
    // Local storage can be unavailable in some browser privacy modes.
  }
}

function saveRadioTrackIndex() {
  try {
    window.localStorage.setItem(MUSIC_TRACK_STORAGE_KEY, String(currentRadioTrackIndex));
  } catch (err) {
    // Local storage can be unavailable in some browser privacy modes.
  }
}

function normalizeTrackIndex(index) {
  return ((Math.floor(index) % RADIO_TRACKS.length) + RADIO_TRACKS.length) % RADIO_TRACKS.length;
}

function getCurrentRadioTrack() {
  return RADIO_TRACKS[currentRadioTrackIndex] || RADIO_TRACKS[0];
}

function formatMusicTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getMusicDuration() {
  return Number.isFinite(battleMusic.duration) && battleMusic.duration > 0 ? battleMusic.duration : 0;
}

function updateMusicProgressUi() {
  const duration = getMusicDuration();
  const currentTime = duration > 0 ? Math.max(0, Math.min(duration, battleMusic.currentTime || 0)) : 0;
  const progress = duration > 0 ? currentTime / duration : 0;
  const progressPercent = Math.max(0, Math.min(100, progress * 100));
  const currentLabel = formatMusicTime(currentTime);
  const durationLabel = duration > 0 ? formatMusicTime(duration) : "--:--";

  musicCurrentTimeEls.forEach((el) => {
    el.textContent = currentLabel;
  });
  musicDurationEls.forEach((el) => {
    el.textContent = durationLabel;
  });
  musicProgressFills.forEach((fill) => {
    fill.style.width = `${progressPercent}%`;
  });
  musicProgressTracks.forEach((track) => {
    track.setAttribute("aria-valuenow", String(Math.round(progressPercent)));
  });
}

function updateMusicToggleButtons() {
  musicToggleButtons.forEach((button) => {
    button.textContent = musicMuted ? "▶" : "⏸";
    button.setAttribute("aria-pressed", String(!musicMuted));
    button.setAttribute("aria-label", musicMuted ? "Play music" : "Pause music");
    button.setAttribute("title", musicMuted ? "Play music" : "Pause music");
  });
}

function updateRadioUi() {
  const track = getCurrentRadioTrack();
  const displayValue = `${Math.round(musicVolume * 100)}%`;
  radioTrackTitles.forEach((title) => {
    title.textContent = track.title;
  });
  radioTrackArtists.forEach((artist) => {
    artist.textContent = track.artist;
  });
  musicVolumeValues.forEach((valueEl) => {
    valueEl.textContent = displayValue;
  });
  musicVolumeSliders.forEach((slider) => {
    const volumeValue = String(Math.round(musicVolume * 100));
    if (String(slider.value) !== volumeValue) slider.value = volumeValue;
    slider.style.setProperty("--volume-progress", `${volumeValue}%`);
  });
  musicVolumeIcons.forEach((icon) => {
    const isSilent = musicVolume <= 0;
    icon.textContent = isSilent ? "\u{1F508}" : "\u{1F50A}";
    icon.classList.toggle("muted", isSilent);
  });
  updateMusicToggleButtons();
  musicPrevButtons.forEach((button) => {
    button.textContent = "⏮";
    button.setAttribute("aria-label", "Previous song");
    button.setAttribute("title", "Previous song");
  });
  musicNextButtons.forEach((button) => {
    button.textContent = "⏭";
    button.setAttribute("aria-label", "Next song");
    button.setAttribute("title", "Next song");
  });
  [...musicPrevButtons, ...musicNextButtons].forEach((button) => {
    button.disabled = RADIO_TRACKS.length < 2;
  });
  updateMusicProgressUi();
}

function setMusicVolume(value) {
  musicVolume = Math.max(0, Math.min(1, Number(value) / 100 || 0));
  saveMusicVolume();
  const effectiveVolume = getEffectiveMusicVolume();
  battleMusic.volume = effectiveVolume;
  if (musicMasterGain && uiAudioContext) {
    musicMasterGain.gain.setTargetAtTime(effectiveVolume, uiAudioContext.currentTime, 0.025);
  }
  updateRadioUi();
  updateBattleMusicState();
}

function setMusicMuted(value) {
  musicMuted = Boolean(value);
  setMusicVolume(musicVolume * 100);
  updateRadioUi();
  if (musicMuted) {
    battleMusic.pause();
  } else {
    startBackgroundMusic();
    updateBattleMusicState();
  }
}

function isLocalAudioHost() {
  return window.location.protocol === "file:"
    || window.location.hostname === "localhost"
    || window.location.hostname === "127.0.0.1";
}

function canUseAudioTrack(track = getCurrentRadioTrack()) {
  return Boolean(track && track.type === "audio" && track.src);
}

function updateBattleMusicState(restart = false) {
  const track = getCurrentRadioTrack();
  const canPlayAudioTrack = canUseAudioTrack(track);

  if (!canPlayAudioTrack) {
    battleMusic.pause();
    return;
  }

  const targetSrc = new URL(track.src, window.location.href).href;

  if (battleMusic.src !== targetSrc) {
    battleMusic.pause();
    battleMusic.src = targetSrc;
    battleMusic.currentTime = 0;
    battleMusic.load();
    updateMusicProgressUi();
  } else if (restart) {
    // Keep the same song playing from the same timestamp when a match starts.
    // Manual track changes still restart because those change battleMusic.src.
    updateMusicProgressUi();
  }

  battleMusic.volume = getEffectiveMusicVolume();

  const shouldPlay = backgroundMusicStarted && !document.hidden && !musicMuted;
  if (shouldPlay) {
    const playPromise = battleMusic.play();
    if (playPromise) {
      playPromise.catch((err) => {
        console.warn("Music play failed:", track.title, track.src, err);
      });
    }
  } else {
    battleMusic.pause();
  }
}

function setRadioTrack(index, autoplay = true, restart = true) {
  currentRadioTrackIndex = normalizeTrackIndex(index);
  saveRadioTrackIndex();

  musicStep = 0;
  if (uiAudioContext) nextMusicTime = uiAudioContext.currentTime + 0.05;
  updateMusicProgressUi();
  updateRadioUi();
  updateBattleMusicState(restart);
  updateMusicProgressUi();
  if (autoplay && !musicMuted) startBackgroundMusic();
}

function playNextSong() {
  setRadioTrack(currentRadioTrackIndex + 1, true, true);
}

function playPreviousSong() {
  setRadioTrack(currentRadioTrackIndex - 1, true, true);
}

function openRadioScreen() {
  if (!radioScreen) return;
  updateRadioUi();
  radioScreen.classList.remove("hidden");
}

function closeRadioScreen() {
  if (!radioScreen) return;
  radioScreen.classList.add("hidden");
}

function seekMusicFromProgressTrack(event) {
  if (event.type === "click" && performance.now() - lastMusicSeekStamp < 90) return;
  if (event.type === "pointerdown") lastMusicSeekStamp = performance.now();
  const duration = getMusicDuration();
  if (duration <= 0) return;
  event.preventDefault();
  const rect = event.currentTarget.getBoundingClientRect();
  const fallbackX = rect.left + rect.width * 0.5;
  const clientX = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : fallbackX;
  const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
  const wasPlaying = !battleMusic.paused && !musicMuted;
  battleMusic.currentTime = Math.max(0, Math.min(duration, ratio * duration));
  updateMusicProgressUi();

  // Seeking should jump to the chosen timestamp, not restart the song.
  if (wasPlaying || backgroundMusicStarted) {
    backgroundMusicStarted = true;
    updateBattleMusicState(false);
  }
}

function playButtonClickSound() {
  const sound = buttonClickSounds[buttonClickSoundIndex % buttonClickSounds.length];
  buttonClickSoundIndex += 1;
  sound.currentTime = 0;
  sound.volume = buttonSfxVolume;
  const playPromise = sound.play();
  if (playPromise) playPromise.catch(playGeneratedButtonClickSound);
}

function playGeneratedButtonClickSound() {
  const audio = getAudioContext();
  if (!audio) return;
  const now = audio.currentTime;

  const lowOsc = audio.createOscillator();
  const lowGain = audio.createGain();
  lowOsc.type = "square";
  lowOsc.frequency.setValueAtTime(190, now);
  lowOsc.frequency.exponentialRampToValueAtTime(92, now + 0.075);
  lowGain.gain.setValueAtTime(0.001, now);
  lowGain.gain.exponentialRampToValueAtTime(0.095, now + 0.005);
  lowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.105);
  lowOsc.connect(lowGain);
  lowGain.connect(audio.destination);
  lowOsc.start(now);
  lowOsc.stop(now + 0.115);

  const highOsc = audio.createOscillator();
  const highGain = audio.createGain();
  highOsc.type = "sine";
  highOsc.frequency.setValueAtTime(920, now);
  highOsc.frequency.exponentialRampToValueAtTime(620, now + 0.045);
  highGain.gain.setValueAtTime(0.001, now);
  highGain.gain.exponentialRampToValueAtTime(0.045, now + 0.004);
  highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  highOsc.connect(highGain);
  highGain.connect(audio.destination);
  highOsc.start(now);
  highOsc.stop(now + 0.07);
}

function playCountdownSound(count) {
  if (count === 3) {
    countdownSound.currentTime = 0;
    countdownSound.volume = 0.95;
    const playPromise = countdownSound.play();
    if (playPromise) playPromise.catch(() => {});
  }
}

function stopCountdownSound() {
  countdownSound.pause();
  countdownSound.currentTime = 0;
}

function scheduleTone(audio, time, frequency, duration, type, volume, filterFrequency = 0) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  if (filterFrequency > 0) {
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterFrequency, time);
    osc.connect(filter);
    filter.connect(gain);
  } else {
    osc.connect(gain);
  }

  gain.connect(getMusicOutput(audio));
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

function scheduleKick(audio, time, volume = 0.09) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(94, time);
  osc.frequency.exponentialRampToValueAtTime(36, time + 0.18);
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
  osc.connect(gain);
  gain.connect(getMusicOutput(audio));
  osc.start(time);
  osc.stop(time + 0.24);
}

function scheduleSnare(audio, time, volume = 0.052) {
  const duration = 0.12;
  const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * duration), audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    const fade = 1 - i / data.length;
    data[i] = (Math.random() * 2 - 1) * fade * fade;
  }

  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1700, time);
  filter.Q.setValueAtTime(0.9, time);
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(getMusicOutput(audio));
  source.start(time);
}

function scheduleHat(audio, time, volume = 0.025) {
  const duration = 0.045;
  const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * duration), audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);

  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(5200, time);
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(getMusicOutput(audio));
  source.start(time);
}

function getMusicMode() {
  return getCurrentRadioTrack().style || "menu";
}

function syncMusicMode(audio) {
  const nextMode = getMusicMode();
  if (activeMusicMode === nextMode) return;
  activeMusicMode = nextMode;
  musicStep = 0;
  nextMusicTime = audio.currentTime + 0.04;
}

function scheduleMenuMusicStep(audio, step, time) {
  const bassNotes = [55, 65.41, 49, 73.42];
  const bellNotes = [220, 246.94, 293.66, 261.63, 196, 246.94, 329.63, 293.66];

  if (step % 4 === 0) scheduleTone(audio, time, bassNotes[(step / 4) % bassNotes.length], 0.58, "triangle", 0.07, 520);
  if (step % 8 === 0) scheduleKick(audio, time + 0.01, 0.045);
  if ([2, 6, 11, 14].includes(step)) scheduleTone(audio, time + 0.04, bellNotes[step % bellNotes.length], 0.34, "sine", 0.044, 1900);
  if (step % 8 === 7) scheduleHat(audio, time + 0.02, 0.036);
}

function scheduleBattleMusicStep(audio, step, time) {
  const bassNotes = [55, 55, 65.41, 73.42, 55, 82.41, 73.42, 49];
  const leadNotes = [220, 261.63, 293.66, 349.23, 392, 349.23, 293.66, 246.94];

  scheduleTone(audio, time, bassNotes[step % bassNotes.length], 0.17, "sawtooth", step % 2 === 0 ? 0.036 : 0.022, 620);
  if ([0, 3, 6, 8, 11, 14].includes(step)) scheduleKick(audio, time);
  if ([4, 12].includes(step)) scheduleSnare(audio, time + 0.015);
  if (step % 2 === 1) scheduleHat(audio, time + 0.018);
  if ([1, 5, 7, 10, 13, 15].includes(step)) scheduleTone(audio, time + 0.035, leadNotes[step % leadNotes.length], 0.12, "square", 0.018, 2200);
}

function scheduleBackgroundMusic() {
  const audio = uiAudioContext;
  if (!audio || audio.state === "closed") return;
  syncMusicMode(audio);
  updateBattleMusicState();
  const track = getCurrentRadioTrack();
  const usingAudioTrack = canUseAudioTrack(track);
  if (musicMuted) {
    nextMusicTime = audio.currentTime + 0.05;
    return;
  }
  if (usingAudioTrack) {
    nextMusicTime = audio.currentTime + 0.05;
    return;
  }
  const stepSeconds = activeMusicMode === "battle" ? BATTLE_MUSIC_STEP_SECONDS : MENU_MUSIC_STEP_SECONDS;
  while (nextMusicTime < audio.currentTime + 0.34) {
    if (activeMusicMode === "battle") {
      scheduleBattleMusicStep(audio, musicStep, nextMusicTime);
    } else {
      scheduleMenuMusicStep(audio, musicStep, nextMusicTime);
    }
    musicStep = (musicStep + 1) % 16;
    nextMusicTime += stepSeconds;
  }
}

function startBackgroundMusic() {
  const audio = getAudioContext();
  if (!audio || backgroundMusicStarted) return;
  backgroundMusicStarted = true;
  activeMusicMode = getMusicMode();
  musicStep = 0;
  nextMusicTime = audio.currentTime + 0.05;
  scheduleBackgroundMusic();
  updateBattleMusicState();
  backgroundMusicTimer = window.setInterval(scheduleBackgroundMusic, 90);
}





// KEYBIND_CAPTURE_HANDLER_CLEAN
document.addEventListener("keydown", (event) => {
  if (!listeningForKeybind) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  const action = listeningForKeybind;
  if (event.code === "Escape") {
    listeningForKeybind = null;
    if (keybindWarning) keybindWarning.textContent = "Cancelled.";
    renderKeybindList();
    return;
  }

  if (setKeyBinding(action, event.code)) {
    listeningForKeybind = null;
  }

  renderKeybindList();
}, true);

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  startBackgroundMusic();
  playButtonClickSound();
}, true);

document.addEventListener("pointerdown", () => {
  startBackgroundMusic();
}, true);

document.addEventListener("keydown", (event) => {
  if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
  startBackgroundMusic();
}, true);

function setCountdownOverlay(value) {
  const isGo = value === "go";
  const count = isGo ? "go" : Math.max(0, Number(value) || 0);
  if (!countdownOverlay) return;

  if (!isGo && count <= 0) {
    stopCountdownSound();
    countdownOverlay.classList.add("hidden");
    countdownOverlay.classList.remove("countdown-pop");
    displayedReadyCountdown = 0;
    return;
  }

  countdownOverlay.textContent = isGo ? "Go!" : String(count);
  countdownOverlay.classList.remove("hidden");
  if (displayedReadyCountdown !== count) {
    countdownOverlay.classList.remove("countdown-pop");
    void countdownOverlay.offsetWidth;
    countdownOverlay.classList.add("countdown-pop");
    playCountdownSound(count);
    displayedReadyCountdown = count;
  }
}

function canUseKeyboardReady() {
  return (
    !homeOpen &&
    !paused &&
    (gameState === "lobby" || gameState === "roundOver") &&
    !readyButton.classList.contains("hidden") &&
    !readyButton.disabled &&
    readyCountdownValue <= 0
  );
}

const W = canvas.width;
const H = canvas.height;
const STAGE_W = 1600;
const GROUND = 438;
const NORMAL_JUMP_VELOCITY = -16.8;
const BASE_PLATFORMS = [
  { x: 255, y: 270, w: 260, h: 22 },
  { x: 665, y: 240, w: 270, h: 22 },
  { x: 1085, y: 270, w: 285, h: 22 }
];
let platforms = BASE_PLATFORMS.map((platform) => ({ ...platform, broken: false }));

function isDroppingThroughPlatform(f) {
  return Boolean(f && f.dropThroughPlatformTicks > 0);
}

function getActivePlatforms() {
  return platforms.filter((platform) => !platform.broken && platform.w > 18);
}

function breakPlatformsNear(x, y, radius = ULT_PLATFORM_BREAK_RADIUS) {
  // Ults carve out only the platform chunk they actually touch instead of deleting the whole platform.
  let brokeAny = false;
  const nextPlatforms = [];
  for (const platform of platforms) {
    if (platform.broken || platform.w <= 18) continue;

    const closestX = Math.max(platform.x, Math.min(platform.x + platform.w, x));
    const closestY = Math.max(platform.y, Math.min(platform.y + platform.h, y));
    const distance = Math.hypot(x - closestX, y - closestY);

    if (distance > radius) {
      nextPlatforms.push(platform);
      continue;
    }

    brokeAny = true;
    const chunkWidth = Math.max(48, Math.min(platform.w, radius * 1.15));
    const cutLeft = Math.max(platform.x, closestX - chunkWidth / 2);
    const cutRight = Math.min(platform.x + platform.w, closestX + chunkWidth / 2);
    const leftWidth = cutLeft - platform.x;
    const rightWidth = platform.x + platform.w - cutRight;

    if (leftWidth > 22) nextPlatforms.push({ ...platform, w: leftWidth, broken: false });
    if (rightWidth > 22) nextPlatforms.push({ ...platform, x: cutRight, w: rightWidth, broken: false });

    if (typeof groundEraseEffects !== "undefined") {
      groundEraseEffects.push({
        x: (cutLeft + cutRight) / 2,
        y: platform.y + platform.h / 2,
        w: Math.max(36, cutRight - cutLeft),
        h: platform.h,
        ticks: 36,
        maxTicks: 36
      });
    }
  }

  if (brokeAny) platforms = nextPlatforms;
  return brokeAny;
}
const GRAVITY = 0.78;
const MAX_HEALTH = 200;
const MAX_CE = 100;
const CE_REGEN_RATE = 0.18;
const CE_LOW_REGEN_BONUS = 0.07;
const LIGHT_HIT_CE_GAIN = 2;
const HEAVY_HIT_CE_GAIN = 5;
const WINS_TO_MATCH = 2;
const BASE_MOVE_SPEED = 5.35;
const LIMITLESS_MOVE_MULTIPLIER = 1.08;
const SHIELD_MAX_TICKS = 180;
const SHIELD_COOLDOWN_TICKS = 90;
const SUKUNA_SHIELD_MAX_TICKS = 300;
const SUKUNA_WEAK_KNOCKBACK_MULTIPLIER = 0.72;
const SUKUNA_PASSIVE_ONE_BAR_DAMAGE = 1.14;
const SUKUNA_PASSIVE_LAST_BAR_DAMAGE = 1.28;
const DODGE_COOLDOWN_TICKS = 54;
const TECHNIQUE_FAST_COOLDOWN = 24;
const TECHNIQUE_HEAVY_COOLDOWN = 34;
const LIMITLESS_CHARGE_MAX_TICKS = 90;
const LIMITLESS_MIN_COSTS = { blue: 12, red: 16 };
const INFINITY_RADIUS = 106;
const INFINITY_MIN_CE = 6;
const INFINITY_TOGGLE_COST = 2;
const INFINITY_CE_DRAIN = 0.14;
const INFINITY_PROJECTILE_SLOW = 0.4;
const INFINITY_PROJECTILE_DRAIN = 0.05;
const GOJO_TELEPORT_RANGE = 340;
const GOJO_TELEPORT_COST = 8;
const GOJO_TELEPORT_COOLDOWN_TICKS = 8 * 60;
const GOJO_BLUE_PUNCH_HOLD_TICKS = Math.round(0.6 * 60);
const GOJO_BLUE_PUNCH_ACTIVE_TICKS = 10 * 60;
const GOJO_BLUE_PUNCH_COOLDOWN_TICKS = 10 * 60;
const GOJO_BLUE_PUNCH_MAX_CHASES = 3;
const GOJO_LIGHT_FINISHER_COOLDOWN_TICKS = 5 * 60;
const ULT_AIM_MIN_HOLD_TICKS = 150;
const ULT_AIM_TOTAL_TICKS = 150;
const ULT_AIM_HOLD_TICKS = 150;
const ULT_FINAL_CHARGE_TICKS = 0;
const ULT_AIM_PREVIEW_ALPHA = 0.5;
const ULT_PLATFORM_BREAK_RADIUS = 70;
const PRACTICE_DUMMY_AUTO_KNOCKBACK_DEFAULT = true;
const GOJO_PUSH_PULL_FINISHER_COOLDOWN_TICKS = 5 * 60;
const FUGA_COOLDOWN_TICKS = 10 * 60;
const FUGA_CHARGE_TICKS = 150;
const RCT_HEAL_BAR_RATIO_PER_SECOND = { limitless: 0.24, shrine: 0.12 };
const RCT_MIN_CE_RATIO = 0.15;
const RCT_MOVE_MULTIPLIER = 0.4;
const RCT_CE_COST_RATIO_PER_SECOND = { limitless: 0.06, shrine: 0.15 };
const RCT_COOLDOWN_TICKS = { limitless: 3 * 60, shrine: 3 * 60 };
const COMBO_RESET_TICKS = 46;
const COMBO_CHAIN_WINDOW = 18;
const PUNCH_COOLDOWN_TICKS = 32;
const SUKUNA_BARRAGE_DURATION_TICKS = 38;
const SUKUNA_BARRAGE_HIT_INTERVAL = 5;
const SUKUNA_BARRAGE_HITS = 6;
const SUKUNA_GRAB_THROW_DURATION_TICKS = 120;
const SUKUNA_GRAB_THROW_RELEASE_DAMAGE = 12;
const BACK_THROW_RANGE = 112;
const BACK_THROW_COOLDOWN_TICKS = 46;
const BACK_THROW_INPUT_BUFFER_TICKS = 18;
const BACK_THROW_CANCEL_WINDOW = 24;
const HITSTOP_LIGHT = 4;
const HITSTOP_HEAVY = 7;
const MAX_ULTIMATE = 100;
const ULT_DAMAGE_GAIN_SCALE = 0.36;
const ULT_BLOCKED_DAMAGE_GAIN_SCALE = 0.14;
const ULT_COMBO_GAIN = 4;
const ULT_PERFECT_DODGE_GAIN = 10;
const ULT_BLOCK_DRAIN_PER_TICK = 0.035;
const HOLLOW_PURPLE_STARTUP_TICKS = 150;
const HOLLOW_PURPLE_RECOVERY_TICKS = 52;
const WORLD_SLASH_STARTUP_TICKS = 150;
const WORLD_SLASH_RECOVERY_TICKS = 52;
const HOLLOW_PURPLE_DAMAGE = 118;
const HOLLOW_PURPLE_BLOCK_CHIP = 0.56;
const WORLD_SLASH_DAMAGE = 118;
const WORLD_SLASH_BLOCK_CHIP = 0.62;
const DOMAIN_CE_REQUIREMENT_RATIO = 0.9;
const DOMAIN_STARTUP_TICKS = 150;
const DOMAIN_CLASH_WINDOW_TICKS = 180;
const DOMAIN_CLASH_TICKS = 180;
const DOMAIN_CT_LOCK_TICKS = 15 * 60;
const UNLIMITED_VOID_TICKS = 10 * 60;
const MALEVOLENT_SHRINE_TICKS = 12 * 60;
const MALEVOLENT_SLASH_INTERVAL = 34;
const MALEVOLENT_CLEAVE_INTERVAL = 180;
const PRACTICE_BOT_RETURN_TICKS = 300;
const TECHNIQUE_STATS = {
  limitless: {
    maxHealth: 360,
    healthBars: 4,
    maxCe: MAX_CE,
    damageTakenMultiplier: 1,
    knockbackTakenMultiplier: 1,
    ceRegenRate: CE_REGEN_RATE + 0.04,
    ceLowRegenBonus: CE_LOW_REGEN_BONUS + 0.02
  },
  shrine: {
    maxHealth: 490,
    healthBars: 5,
    maxCe: 125,
    damageTakenMultiplier: 0.9,
    knockbackTakenMultiplier: 0.9,
    ceRegenRate: CE_REGEN_RATE,
    ceLowRegenBonus: CE_LOW_REGEN_BONUS
  }
};
const keys = new Set();
const params = new URLSearchParams(window.location.search);
const onlineRequested = params.get("online") === "1";
let onlineRoom = params.get("room") || "main";
let onlineSide = params.get("side") || "";

let frame = 0;
let readyCountdownId = 0;
let gameOver = false;
let roundEnding = false;
let roundResolved = false;
let gameState = "home";
let koWinner = null;
let shake = 0;
let hitStopTicks = 0;
const FIXED_STEP = 1000 / 60;
const MAX_CATCH_UP_STEPS = 5;
let lastFrameTime = performance.now();
let fixedAccumulator = 0;
let currentRound = 1;
let playerRounds = 0;
let enemyRounds = 0;
let cameraX = 0;
let cameraZoom = 1;
let mouseAimWorld = { x: W / 2, y: GROUND - 88 };
let pacifistBot = false;
let homeOpen = true;
let paused = false;
let selectedMode = "cpu";
let gameMode = "cpu";
let cpuDifficulty = "medium";
let pendingStartPractice = false;
const practiceSettings = {
  infiniteCe: false,
  dummyDamage: true,
  noCooldowns: false,
  stationaryDummy: true,
  dummyAutoKnockback: PRACTICE_DUMMY_AUTO_KNOCKBACK_DEFAULT
};
let practiceDamageTotal = 0;
let selectedTechnique = "limitless";
let cpuOpponentTechnique = "shrine";
let cpuOpponentTechniqueLocked = false;
let onlineSocket = null;
let onlineRole = null;
let onlineConnected = false;
let onlineWaiting = false;
let onlinePlayers = { p1: 0, p2: 0 };
let onlineTechniqueChoices = { p1: null, p2: null };
let onlinePickedTechnique = false;
let lastOnlineStateSent = 0;
let lastOnlineInputSent = 0;
let lastOnlineInputKey = "";
let lastOnlineFighterSent = 0;
let remoteInput = { left: false, right: false, up: false, down: false, block: false, rct: false, heavy: false, bluePunch: false };
let onlineReady = { p1: false, p2: false };
let onlinePlayerNames = { p1: "Player 1", p2: "Player 2" };
let player1Ready = false;
let player2Ready = false;
let readyCountdownValue = 0;
let lastRoundWinner = null;
let lastOnlineReadySent = 0;
let lastOnlineNameSent = 0;
const mouseTechniqueHeld = { ct1: false, ct2: false, teleport: false, fuga: false };










function getOpponentDisplayName() {
  if (gameMode === "online") {
    if (onlineRole === "p1") return sanitizePlayerName(onlinePlayerNames.p2, "Player 2");
    if (onlineRole === "p2") return sanitizePlayerName(onlinePlayerNames.p1, "Player 1");
  }
  if (gameMode === "practice") return "Practice Dummy";
  if (gameMode === "cpu") return "CPU";
  return "Player 2";
}






// NAME_TAG_SYSTEM_PATCH








function getModeOpponentName() {
  if (gameMode === "practice") return "Practice Dummy";
  if (gameMode === "cpu") return "CPU";
  if (gameMode === "online") {
    if (onlineRole === "p1") return sanitizePlayerName(onlinePlayerNames.p2, "Player 2");
    if (onlineRole === "p2") return sanitizePlayerName(onlinePlayerNames.p1, "Player 1");
  }
  return "Player 2";
}





function sanitizeAimPoint(aimPoint) {
  if (!aimPoint) return null;
  const x = Number(aimPoint.x);
  const y = Number(aimPoint.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {
    x: Math.max(0, Math.min(STAGE_W, x)),
    y: Math.max(-90, Math.min(H + 90, y))
  };
}

function getMouseWorldPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const screenX = (event.clientX - rect.left) * (canvas.width / Math.max(1, rect.width));
  const screenY = (event.clientY - rect.top) * (canvas.height / Math.max(1, rect.height));
  return sanitizeAimPoint({
    x: cameraX + screenX / cameraZoom,
    y: (screenY - getCameraYOffset()) / cameraZoom
  });
}

function getActiveMouseTechniqueFighter() {
  return gameMode === "online" && onlineRole === "p2" ? enemy : player;
}

function getTechniqueOrigin(f, move) {
  return {
    x: f.x + f.w / 2,
    y: f.y + (move === "slash" || move === "cleave" || move === "fuga" ? 48 : 56)
  };
}

function getTechniqueAimVector(f, move, aimPoint = null) {
  const origin = getTechniqueOrigin(f, move);
  const aim = sanitizeAimPoint(aimPoint) || sanitizeAimPoint(f.techniqueAim);
  let dx = aim ? aim.x - origin.x : f.dir;
  let dy = aim ? aim.y - origin.y : 0;
  const rawDistance = Math.hypot(dx, dy);
  const length = rawDistance;
  if (length < 8) {
    dx = f.dir;
    dy = 0;
  } else {
    dx /= length;
    dy /= length;
  }
  const dir = Math.abs(dx) > 0.08 ? Math.sign(dx) : f.dir;
  return { x: dx, y: dy, dir, angle: Math.atan2(dy, dx), origin, distance: aim ? rawDistance : Infinity, aim };
}

function setFighterTechniqueAim(f, aimPoint) {
  const aim = sanitizeAimPoint(aimPoint);
  if (!aim) return null;
  f.techniqueAim = aim;
  const move = getTechniqueMoveKey(f, f.chargingTechnique || 1);
  const aimVector = getTechniqueAimVector(f, move, aim);
  if (Math.abs(aimVector.x) > 0.08) f.dir = aimVector.dir;
  return aim;
}

function updateMouseAimFromEvent(event) {
  mouseAimWorld = getMouseWorldPoint(event) || mouseAimWorld;
  if (gameState === "playing") {
    const fighter = getActiveMouseTechniqueFighter();
    if (fighter && (fighter.chargingTechnique || fighter.ultimateAiming || mouseTechniqueHeld.ct1 || mouseTechniqueHeld.ct2)) {
      setFighterTechniqueAim(fighter, mouseAimWorld);
      if (fighter.ultimateAiming) fighter.ultimateAimPoint = mouseAimWorld;
    }
    if (fighter && mouseTechniqueHeld.teleport) {
      fighter.teleportAiming = true;
      fighter.techniqueAim = mouseAimWorld;
    }
    if (fighter && mouseTechniqueHeld.fuga) {
      fighter.fugaAiming = true;
      fighter.techniqueAim = mouseAimWorld;
    }
  }
  return mouseAimWorld;
}

function getTechniqueCharacterName(technique) {
  return technique === "shrine" ? "Sukuna" : "Gojo";
}

function shouldShowChargePreview(f) {
  if (!f || !f.chargingTechnique) return false;
  if (gameMode === "online") return onlineRole === "p2" ? f === enemy : f === player;
  if (gameMode === "cpu" && f === enemy && f.technique === "limitless") return true;
  return f === player;
}

const cpuSettings = {
  easy: {
    attackChance: 0.18,
    blockChance: 0.12,
    dodgeChance: 0.03,
    jumpChance: 0.1,
    heavyChance: 0.12,
    techniqueChance: 0.12,
    platformChance: 0.12,
    dashChance: 0.02,
    comboChance: 0.04,
    airHopChance: 0.02,
    attackCooldown: 64,
    techniqueCooldown: 82,
    thinkCooldown: 42,
    approachSpeed: 0.68,
    retreatSpeed: 0.58,
    strafeSpeed: 0.32,
    preferredRange: 250,
    spacingBand: 75,
    blockDistance: 78,
    healthMultiplier: 0.72,
    damageMultiplier: 0.82,
    speedMultiplier: 0.86,
    prediction: 3
  },
  medium: {
    attackChance: 0.42,
    blockChance: 0.40,
    dodgeChance: 0.14,
    jumpChance: 0.3,
    heavyChance: 0.32,
    techniqueChance: 0.32,
    platformChance: 0.46,
    dashChance: 0.16,
    comboChance: 0.22,
    airHopChance: 0.07,
    attackCooldown: 36,
    techniqueCooldown: 52,
    thinkCooldown: 20,
    approachSpeed: 1.02,
    retreatSpeed: 0.78,
    strafeSpeed: 0.48,
    preferredRange: 320,
    spacingBand: 85,
    blockDistance: 98,
    healthMultiplier: 1.0,
    damageMultiplier: 1,
    speedMultiplier: 1.0,
    prediction: 8
  },
  hard: {
    attackChance: 0.62,
    blockChance: 0.66,
    dodgeChance: 0.36,
    jumpChance: 0.52,
    heavyChance: 0.46,
    techniqueChance: 0.54,
    platformChance: 0.74,
    dashChance: 0.34,
    comboChance: 0.44,
    airHopChance: 0.16,
    attackCooldown: 22,
    techniqueCooldown: 40,
    thinkCooldown: 11,
    approachSpeed: 1.2,
    retreatSpeed: 0.95,
    strafeSpeed: 0.62,
    preferredRange: 380,
    spacingBand: 95,
    blockDistance: 118,
    healthMultiplier: 1.22,
    damageMultiplier: 1.12,
    speedMultiplier: 1.16,
    prediction: 14
  }
};

const KEY_ACTION_ALIASES = {
  a: "moveLeft", keya: "moveLeft",
  d: "moveRight", keyd: "moveRight",
  " ": "jump", space: "jump",
  w: "light", keyw: "light",
  e: "heavy", keye: "heavy",
  q: "block", keyq: "block",
  shift: "dodge", shiftleft: "dodge", shiftright: "dodge",
  r: "rct", keyr: "rct",
  f: "infinity", keyf: "infinity",
  t: "bluePunch", keyt: "bluePunch",
  s: "specialAim", keys: "specialAim",
  c: "ultimate", keyc: "ultimate",
  tab: "throw"
};

function normalizeKeyName(name) {
  return String(name || "").toLowerCase();
}

function isEventForAction(action, key, code) {
  const bound = normalizeKeyName(getBoundKey(action));
  return normalizeKeyName(key) === bound || normalizeKeyName(code) === bound;
}

function isPressed(...names) {
  return names.some((name) => {
    const raw = normalizeKeyName(name);
    const action = KEY_ACTION_ALIASES[raw];

    // Important: if this key name maps to a bindable action, ONLY check that action's current binding.
    // Do not also check the old raw key, or rebinding A/Space can trigger two actions at once.
    if (action) {
      const bound = normalizeKeyName(getBoundKey(action));
      return keys.has(bound);
    }

    // Non-bindable raw checks still work normally.
    return keys.has(raw);
  });
}

const attacks = {
  light: { damage: 5, windup: 3, active: 5, recovery: 10, range: 42, width: 38, height: 36, knockback: 10 },
  heavy: { damage: 18, windup: 15, active: 8, recovery: 28, range: 55, width: 52, height: 44, knockback: 17 },
  backThrow: { damage: 13, windup: 5, active: 5, recovery: 24, range: 34, width: 36, height: 62, knockback: 16 },
  barrage: { damage: 0, windup: 0, active: 0, recovery: SUKUNA_BARRAGE_DURATION_TICKS, range: 60, width: 70, height: 52, knockback: 0 },
  grabThrow: { damage: 0, windup: 0, active: 0, recovery: SUKUNA_GRAB_THROW_DURATION_TICKS, range: 58, width: 70, height: 62, knockback: 0 }
};

function getAttackSpec(f, type = f.attacking) {
  const base = attacks[type];
  if (!base) return null;
  const attack = { ...base };
  if (f.technique === "limitless" && type !== "backThrow") {
    attack.range += type === "heavy" ? 7 : 8;
    attack.width += type === "heavy" ? 7 : 6;
    attack.windup = type === "heavy" ? Math.max(10, attack.windup - 2) : attack.windup;
    attack.recovery = type === "heavy" ? Math.max(18, attack.recovery - 6) : Math.max(6, attack.recovery - 2);
  } else if (f.technique === "shrine") {
    if (type === "light") {
      attack.windup = 2;
      attack.active = 6;
      attack.recovery = 6;
      attack.knockback += 1;
    } else if (type === "heavy") {
      attack.damage += 3;
      attack.knockback += 3;
      attack.windup = 13;
      attack.recovery = 23;
    }
  }
  if (isDomainVictim(f, "unlimitedVoid") && type !== "backThrow") {
    attack.windup = Math.ceil(attack.windup * 2.55);
    attack.recovery = Math.ceil(attack.recovery * 2.45);
    attack.active = Math.max(2, Math.ceil(attack.active * 0.72));
  }
  if (isDomainOwner(f, "malevolentShrine") && type !== "backThrow") {
    attack.recovery = Math.max(4, Math.ceil(attack.recovery * 0.72));
  }
  return attack;
}

const techniqueMoves = {
  blue: { cost: 22, damage: 7, speed: 10.5, radius: 24, knockback: -18, life: 78 },
  red: { cost: 28, damage: 12, speed: 12, radius: 20, knockback: 23, life: 70 },
  slash: { cost: 18, damage: 13, speed: 13, radius: 20, knockback: 12, life: 66 },
  cleave: { cost: 32, damage: 24, speed: 0, radius: 42, knockback: 22, life: 14 },
  fuga: { cost: 70, damage: 76, speed: 9.2, radius: 20, knockback: 38, life: 100, explosionRadius: 174, cooldown: FUGA_COOLDOWN_TICKS }
};

function getTechniqueMoveKey(f, slot) {
  if (f.technique === "limitless") return slot === 2 ? "red" : "blue";
  if (f.technique === "shrine") return slot === 2 ? "cleave" : "slash";
  return "blue";
}

function getTechniqueDisplayName(move) {
  if (move === "slash") return "DISMANTLE";
  if (move === "fuga") return "FUGA";
  return move.toUpperCase();
}

function getTechniqueCooldownTicks(move) {
  if (move === "fuga") return techniqueMoves.fuga.cooldown;
  return move === "red" || move === "cleave" ? TECHNIQUE_HEAVY_COOLDOWN : TECHNIQUE_FAST_COOLDOWN;
}

function getTechniqueCost(f, move) {
  const spec = techniqueMoves[move];
  if (!spec) return Infinity;
  const multiplier = getCtCostMultiplier(f);
  if (!Number.isFinite(multiplier)) return Infinity;
  if (f.technique !== "limitless") return Math.ceil(spec.cost * multiplier);
  const minCost = LIMITLESS_MIN_COSTS[move] || Math.ceil(spec.cost * 0.6);
  return Math.ceil(Math.min(Math.floor(f.maxCe * 0.5), minCost) * multiplier);
}

function getChargedTechniqueCost(f, move, chargeRatio = 0) {
  const minCost = getTechniqueCost(f, move);
  if (f.technique !== "limitless") return minCost;
  const maxCost = Math.floor(f.maxCe * 0.5);
  return Math.min(maxCost, Math.ceil(minCost + (maxCost - minCost) * Math.max(0, Math.min(1, chargeRatio))));
}

function getTechniqueChargeRatio(f) {
  return Math.max(0, Math.min(1, (f.chargeTicks || 0) / LIMITLESS_CHARGE_MAX_TICKS));
}

function getAffordableChargeRatio(f, move, chargeRatio) {
  const minCost = getTechniqueCost(f, move);
  if (f.ce < minCost) return -1;
  const maxCost = getChargedTechniqueCost(f, move, 1);
  if (maxCost <= minCost) return 0;
  return Math.max(0, Math.min(chargeRatio, (f.ce - minCost) / (maxCost - minCost)));
}

function pickRandomTechnique() {
  return Math.random() < 0.5 ? "limitless" : "shrine";
}

function isValidTechnique(technique) {
  return technique === "limitless" || technique === "shrine";
}

function rollCpuOpponentTechnique(reason = "") {
  cpuOpponentTechnique = pickRandomTechnique();
  cpuOpponentTechniqueLocked = true;
  console.log("[cpu opponent technique]", cpuOpponentTechnique, reason);
  return cpuOpponentTechnique;
}

function ensureCpuOpponentTechnique(reason = "") {
  if (!cpuOpponentTechniqueLocked || !isValidTechnique(cpuOpponentTechnique)) {
    return rollCpuOpponentTechnique(reason);
  }
  console.log("[cpu opponent technique locked]", cpuOpponentTechnique, reason);
  return cpuOpponentTechnique;
}

function clampStageX(x, width = 0) {
  return Math.max(32, Math.min(STAGE_W - width - 32, x));
}

function getCameraTargetX() {
  if (!player || !enemy || STAGE_W <= W) return 0;
  const visibleWorldWidth = W / cameraZoom;
  const fightCenter = getCameraFightCenter();
  return Math.max(0, Math.min(STAGE_W - visibleWorldWidth, fightCenter - visibleWorldWidth / 2));
}

function getCameraFightCenter() {
  if (cinematicZoomTicks > 0 && ultimateFocusOwner) {
    const focus = ultimateFocusOwner === "player" ? player : enemy;
    if (focus) return focus.x + focus.w / 2;
  }
  const playerCenter = player.x + player.w / 2;
  const enemyCenter = enemy.x + enemy.w / 2;
  return (playerCenter + enemyCenter) / 2;
}

function getCameraTargetZoom() {
  if (!player || !enemy) return 1;
  const minX = Math.min(player.x, enemy.x);
  const maxX = Math.max(player.x + player.w, enemy.x + enemy.w);
  const desiredWorldWidth = Math.min(STAGE_W, Math.max(W, maxX - minX + 260));
  const minZoom = W / STAGE_W;
  const baseZoom = Math.max(minZoom, Math.min(1, W / desiredWorldWidth));
  if (cinematicZoomTicks > 0 && ultimateFocusOwner) return Math.max(minZoom, Math.min(1.2, Math.max(baseZoom, baseZoom * 1.18)));
  return baseZoom;
}

function keepFightersInCamera() {
  if (!player || !enemy) return;
  const visibleWorldWidth = W / cameraZoom;
  const maxCameraX = Math.max(0, STAGE_W - visibleWorldWidth);
  const minX = Math.min(player.x, enemy.x);
  const maxX = Math.max(player.x + player.w, enemy.x + enemy.w);
  const margin = Math.min(120, Math.max(54, visibleWorldWidth * 0.12));

  if (minX < cameraX + margin) cameraX = Math.max(0, minX - margin);
  if (maxX > cameraX + visibleWorldWidth - margin) cameraX = Math.min(maxCameraX, maxX + margin - visibleWorldWidth);
  cameraX = Math.max(0, Math.min(maxCameraX, cameraX));
}

function getCameraYOffset() {
  return GROUND * (1 - cameraZoom);
}

function updateCamera(snap = false) {
  const targetZoom = getCameraTargetZoom();
  if (snap) {
    cameraZoom = targetZoom;
  } else if (targetZoom < cameraZoom) {
    cameraZoom = targetZoom;
  } else {
    cameraZoom += (targetZoom - cameraZoom) * 0.035;
  }

  const targetX = getCameraTargetX();
  cameraX = snap ? targetX : cameraX + (targetX - cameraX) * 0.14;
  keepFightersInCamera();
}

let projectiles = [];
let hitSparks = [];
let projectileDisperses = [];
let teleportEffects = [];
let fugaExplosions = [];
let shieldBreakEffects = [];
let worldSlashEffects = [];
let groundEraseEffects = [];
let ultimateChargeEffects = [];
let ultimateScreenEffect = { ticks: 0, maxTicks: 0, kind: "" };
let cinematicZoomTicks = 0;
let ultimateFocusOwner = null;
let pendingDomain = null;
let activeDomain = null;
let domainClash = null;

function makeFighter(config) {
  return {
    x: config.x,
    y: GROUND - config.h,
    w: config.w,
    h: config.h,
    vx: 0,
    vy: 0,
    dir: config.dir,
    speed: BASE_MOVE_SPEED,
    color: config.color,
    accent: config.accent,
    health: MAX_HEALTH,
    maxHealth: MAX_HEALTH,
    healthBars: 3,
    delayedHealth: MAX_HEALTH,
    healthLagDelay: 0,
    ce: MAX_CE,
    maxCe: MAX_CE,
    ceRegenRate: CE_REGEN_RATE,
    ceLowRegenBonus: CE_LOW_REGEN_BONUS,
    ultimateMeter: 0,
    ultimateStartup: 0,
    ultimateRecovery: 0,
    ultimateMove: null,
    ultimateHasReleased: false,
    ultimateAiming: false,
    ultimateAimTicks: 0,
    ultimateFinalCharge: 0,
    ultimateAimPoint: null,
    domainStartup: 0,
    domainAttemptType: null,
    ctLockTimer: 0,
    damageTakenMultiplier: 1,
    knockbackTakenMultiplier: 1,
    outgoingDamageMultiplier: 1,
    technique: "limitless",
    techniqueCooldown: 0,
    techniqueCooldownMax: TECHNIQUE_FAST_COOLDOWN,
    chargingTechnique: 0,
    chargeTicks: 0,
    cpuTechniqueReleaseTicks: 0,
    techniqueAim: null,
    infinityActive: false,
    infinityPulse: 0,
    teleportAiming: false,
    teleportCooldown: 0,
    bluePunchHoldTicks: 0,
    bluePunchActiveTicks: 0,
    bluePunchCooldown: 0,
    bluePunchChases: 0,
    bluePunchFlash: 0,
    gojoLightFinisherCooldown: 0,
    gojoPushPullTimer: 0,
    gojoPushPullAnchorX: null,
    gojoPushPullAnchorY: null,
    gojoPushPullCooldown: 0,
    fugaAiming: false,
    fugaChargeTicks: 0,
    fugaCooldown: 0,
    fugaCooldownMax: FUGA_COOLDOWN_TICKS,
    rctHealing: false,
    rctCooldown: 0,
    lastLightPressTick: -999,
    lastHeavyPressTick: -999,
    grounded: true,
    onPlatform: false,
    attacking: null,
    attackFrame: 0,
    hasHit: false,
    queuedAttack: null,
    comboCount: 0,
    comboTimer: 0,
    comboChainTimer: 0,
    comboLightsUsed: 0,
    comboHeavyUsed: false,
    lastAttackType: null,
    punchCooldown: 0,
    pendingPunchCooldown: false,
    barrageTimer: 0,
    barrageDuration: 0,
    barrageHitsDone: 0,
    barrageDamageRemaining: 0,
    barrageKnockback: 0,
    barrageDir: config.dir,
    barrageTarget: null,
    barrageHeldTimer: 0,
    barrageHeldBy: null,
    barrageLockY: null,
    grabThrowTimer: 0,
    grabThrowDuration: 0,
    grabThrowDamage: 0,
    grabThrowKnockback: 0,
    grabThrowDir: config.dir,
    grabThrowTarget: null,
    grabThrowAim: null,
    grabHeldTimer: 0,
    grabHeldBy: null,
    grabLockY: null,
    blocking: false,
    shieldTicks: SHIELD_MAX_TICKS,
    shieldCooldown: 0,
    shieldHitFlash: 0,
    dodging: 0,
    dodgeCooldown: 0,
    jumpsUsed: 0,
    ko: false,
    lying: false,
    knockdown: false,
    knockdownTimer: 0,
    koRotation: 0,
    koFallDir: 1,
    koTimer: 0,
    hurt: 0,
    stun: 0,
    aiCooldown: 0,
    aiGoal: "idle",
    isPracticeDummy: false,
    practiceIdleTicks: PRACTICE_BOT_RETURN_TICKS,
    practiceHomeX: config.x,
    walkCycle: 0
  };
}

function applyTechniqueStats(f, preserveMeters = false) {
  const stats = TECHNIQUE_STATS[f.technique] || TECHNIQUE_STATS.limitless;
  const healthRatio = f.maxHealth > 0 ? f.health / f.maxHealth : 1;
  const ceRatio = f.maxCe > 0 ? f.ce / f.maxCe : 1;
  f.speed = BASE_MOVE_SPEED * (f.technique === "limitless" ? LIMITLESS_MOVE_MULTIPLIER : 1);
  f.maxHealth = stats.maxHealth;
  f.healthBars = stats.healthBars || 3;
  f.maxCe = stats.maxCe;
  f.ceRegenRate = stats.ceRegenRate;
  f.ceLowRegenBonus = stats.ceLowRegenBonus;
  f.damageTakenMultiplier = stats.damageTakenMultiplier;
  f.knockbackTakenMultiplier = stats.knockbackTakenMultiplier;
  f.health = preserveMeters ? Math.min(f.maxHealth, Math.max(0, healthRatio * f.maxHealth)) : f.maxHealth;
  f.delayedHealth = f.health;
  f.healthLagDelay = 0;
  f.ce = preserveMeters ? Math.min(f.maxCe, Math.max(0, ceRatio * f.maxCe)) : f.maxCe;
  f.ultimateMeter = Math.max(0, Math.min(MAX_ULTIMATE, f.ultimateMeter || 0));
  f.ctLockTimer = preserveMeters ? Math.max(0, f.ctLockTimer || 0) : 0;
  const shieldMax = getShieldMaxTicks(f);
  f.shieldTicks = preserveMeters ? Math.min(shieldMax, Math.max(0, f.shieldTicks || shieldMax)) : shieldMax;
  f.shieldCooldown = preserveMeters ? Math.max(0, f.shieldCooldown || 0) : 0;
  if (f.technique !== "limitless") f.infinityActive = false;
  if (f.technique !== "shrine") {
    f.fugaAiming = false;
    f.fugaChargeTicks = 0;
  }
}

function applyCpuDifficultyStats() {
  if (gameMode !== "cpu" || pacifistBot) return;
  const cpu = cpuSettings[cpuDifficulty] || cpuSettings.medium;
  enemy.speed *= cpu.speedMultiplier;
  enemy.outgoingDamageMultiplier = cpu.damageMultiplier;
  enemy.maxHealth = Math.round(enemy.maxHealth * cpu.healthMultiplier);
  enemy.health = enemy.maxHealth;
  enemy.delayedHealth = enemy.health;
  enemy.healthLagDelay = 0;
  enemy.ce = enemy.maxCe;
}

let player;
let enemy;

function setGameState(nextState, reason = "") {
  if (gameState === nextState) return;
  console.log("[state]", gameState, "->", nextState, reason);
  gameState = nextState;
  updateBattleMusicState(nextState === "playing");
}

function getTechniqueHudMoves(f) {
  if (!f) return [];
  if (isPracticeDummy(f)) return [];
  if (f.technique === "shrine") return ["slash", "cleave", "fuga"];
  return ["blue", "red", "teleport"];
}

function getTechniqueHudState(f, move) {
  const blocked = f.blocking || isHoldingShield(f);
  if (move === "teleport") {
    const cost = GOJO_TELEPORT_COST;
    return {
      cost,
      cooling: (f.teleportCooldown || 0) > 0,
      cooldown: f.teleportCooldown || 0,
      maxCooldown: GOJO_TELEPORT_COOLDOWN_TICKS,
      lowCe: f.ce < cost,
      blocked
    };
  }
  if (move === "fuga") {
    const chargeRatio = Math.max(0, Math.min(1, (f.fugaChargeTicks || 0) / FUGA_CHARGE_TICKS));
    const cost = getTechniqueCost(f, move);
    return {
      cost,
      cooling: (f.fugaCooldown || 0) > 0,
      cooldown: f.fugaCooldown || 0,
      maxCooldown: f.fugaCooldownMax || getTechniqueCooldownTicks(move),
      lowCe: f.ce < cost,
      charging: Boolean(f.fugaAiming),
      chargeRatio,
      blocked
    };
  }
  const cost = getTechniqueCost(f, move);
  return {
    cost,
    cooling: f.techniqueCooldown > 0,
    cooldown: f.techniqueCooldown,
    maxCooldown: f.techniqueCooldownMax || getTechniqueCooldownTicks(move),
    lowCe: f.ce < cost,
    blocked
  };
}

function updateTechniqueCooldownHud(f, slots) {
  const moves = getTechniqueHudMoves(f);
  slots.forEach((hud, index) => {
    if (!hud.slot || !hud.label || !hud.fill || !hud.status) return;
    const move = moves[index];
    hud.slot.classList.toggle("hidden", !move);
    if (!move) return;

    const state = getTechniqueHudState(f, move);
    const maxCooldown = Math.max(1, state.maxCooldown);
    const fillRatio = state.charging
      ? state.chargeRatio
      : state.cooling
      ? 1 - Math.min(1, state.cooldown / maxCooldown)
      : Math.min(1, f.ce / Math.max(1, state.cost));

    hud.label.textContent = getTechniqueDisplayName(move);
    hud.fill.style.width = `${Math.max(0, Math.min(1, fillRatio)) * 100}%`;
    hud.status.textContent = state.charging
      ? state.chargeRatio >= 1 ? "READY" : `${Math.round(state.chargeRatio * 100)}%`
      : state.cooling
      ? `${Math.ceil(state.cooldown / 6) / 10}s`
      : state.blocked ? "BLOCK"
        : state.lowCe ? "NO CE" : "READY";
    hud.slot.classList.toggle("ready", !state.cooling && !state.blocked && !state.lowCe && !state.charging);
    hud.slot.classList.toggle("cooling", state.cooling || state.charging);
    hud.slot.classList.toggle("low-ce", !state.cooling && !state.charging && state.lowCe);
    hud.slot.classList.toggle("blocked", !state.cooling && !state.charging && state.blocked);
  });
}

function syncReadyObject() {
  onlineReady.p1 = player1Ready;
  onlineReady.p2 = player2Ready;
}

function setReadyFlags(p1, p2, reason = "") {
  player1Ready = Boolean(p1);
  player2Ready = Boolean(p2);
  syncReadyObject();
  console.log("[ready state]", { player1Ready, player2Ready, gameState, round: currentRound, reason });
}

function isOnlinePlayerRole(role = onlineRole) {
  return role === "p1" || role === "p2";
}

function isReadyPhase(state = gameState) {
  return state === "lobby" || state === "roundOver";
}

function hasPickedOnlineTechnique() {
  return gameMode !== "online" || !isOnlinePlayerRole() || onlinePickedTechnique;
}

function resetReadyPhase(reason = "") {
  setReadyFlags(false, false, reason);
  readyCountdownValue = 0;
  setCountdownOverlay(0);
  lastOnlineReadySent = 0;
  updateReadyPromptVisibility();
}

function updateReadyPromptVisibility(showButton = false, showWaiting = false) {
  if (!readyPrompt || !readyButton || !readyStatus) return;
  readyPrompt.classList.toggle("hidden", !showButton && !showWaiting);
  readyButton.classList.toggle("hidden", !showButton);
  readyStatus.classList.toggle("hidden", !showWaiting);
  readyStatus.textContent = "Waiting For Other Player";
}

function isPracticeDummy(f) {
  return Boolean(pacifistBot && f && f.isPracticeDummy);
}

function updatePracticeDamageMeter() {
  if (!practiceDamageMeter || !practiceDamageValue) return;
  practiceDamageMeter.classList.add("hidden");
  practiceDamageValue.textContent = "";
}

function updatePracticeSettingsButtonVisibility() {
  if (!practiceSettingsButton) return;
  const show = pacifistBot && !homeOpen;
  practiceSettingsButton.classList.toggle("hidden", !show);
}

function resetPracticeDamage() {
  practiceDamageTotal = 0;
  updatePracticeDamageMeter();
}

function pinStationaryPracticeDummy(f = enemy) {
  if (!isPracticeDummy(f) || !practiceSettings.stationaryDummy) return;
  const homeX = Number.isFinite(f.practiceHomeX) ? f.practiceHomeX : STAGE_W / 2 - f.w / 2;
  f.x = homeX;
  f.y = GROUND - f.h;
  f.vx = 0;
  f.vy = 0;
  f.grounded = true;
  f.onPlatform = false;
  f.knockdown = false;
  f.knockdownTimer = 0;
  f.barrageHeldTimer = 0;
  f.barrageHeldBy = null;
  f.barrageLockY = null;
  f.grabHeldTimer = 0;
  f.grabHeldBy = null;
  f.grabLockY = null;
  f.dodging = 0;
}

function updatePracticeSettingsUi() {
  practiceSettingButtons.forEach((button) => {
    const key = button.dataset.practiceSetting;
    const value = button.dataset.value === "on";
    button.setAttribute("aria-pressed", String(Boolean(practiceSettings[key]) === value));
  });
  updatePracticeDamageMeter();
  updatePracticeSettingsButtonVisibility();
}

function applyFighterDamage(defender, damage) {
  const amount = Math.max(0, Math.ceil(Number(damage) || 0));
  if (amount <= 0) return 0;
  if (isPracticeDummy(defender)) {
    if (practiceSettings.dummyDamage) {
      defender.health = Math.max(0, defender.health - amount);
      defender.healthLagDelay = Math.max(defender.healthLagDelay || 0, 18);

      // Practice dummy reset: refill HP after all bars are depleted,
      // but keep the practice damage meter total going.
      if (defender.health <= 0) {
        defender.health = defender.maxHealth;
        defender.delayedHealth = defender.maxHealth;
        defender.healthLagDelay = 0;
        defender.ko = false;
        defender.lying = false;
        defender.knockdown = false;
        defender.knockdownTimer = 0;
        defender.koTimer = 0;
      }
    }
    updatePracticeDamageMeter();
    pinStationaryPracticeDummy(defender);
    return amount;
  }
  defender.health = Math.max(0, defender.health - amount);
  return amount;
}

function applyPracticeSettingsTick() {
  if (!pacifistBot || !player) return;
  if (practiceSettings.infiniteCe) player.ce = player.maxCe;
  if (practiceSettings.noCooldowns) {
    player.techniqueCooldown = 0;
    player.teleportCooldown = 0;
    player.fugaCooldown = 0;
    player.bluePunchCooldown = 0;
    player.dodgeCooldown = 0;
    player.punchCooldown = 0;
    player.pendingPunchCooldown = false;
    player.rctCooldown = 0;
    player.shieldCooldown = 0;
  }
  pinStationaryPracticeDummy(enemy);
}

function updateControlsVisibility() {
  updateControlsPanel();
  if (!rivalControls) return;
  rivalControls.classList.toggle("hidden", homeOpen || gameMode !== "pvp");
  updatePracticeSettingsButtonVisibility();
  updatePracticeDamageMeter();
}

function getControlledTechniqueForControls() {
  if (gameMode === "online" && onlineRole === "p2") return enemy?.technique || onlineTechniqueChoices.p2 || selectedTechnique;
  return player?.technique || selectedTechnique;
}

function getTechniqueControlHtml(technique) {
  if (technique === "shrine") {
    return '<span><kbd>Left Click</kbd> Dismantle</span><span><kbd>Right Click</kbd> Cleave</span><span><kbd>Hold S</kbd> Fuga</span><span><kbd>Hold C</kbd> Aim Ultimate</span><span><kbd>R</kbd> hold RCT</span>';
  }
  return '<span><kbd>Left Click</kbd> Blue</span><span><kbd>Right Click</kbd> Red</span><span><kbd>Hold S</kbd> Teleport</span><span><kbd>Hold T</kbd> Blue Punch</span><span><kbd>F</kbd> Infinity</span><span><kbd>Hold C</kbd> Aim Ultimate</span><span><kbd>R</kbd> hold RCT</span>';
}

function updateControlsPanel() {
  if (!controlsGrid) return;
  const technique = getControlledTechniqueForControls();
  controlsGrid.innerHTML = `
    <p><strong>Move</strong><span><kbd>A</kbd><kbd>D</kbd> walk</span><span><kbd>Space</kbd> jump / double jump</span></p>
    <p><strong>Attack</strong><span><kbd>W</kbd> light punch</span><span><kbd>E</kbd> heavy punch</span><span><kbd>Toward</kbd><kbd>Tab</kbd> throw</span></p>
    <p><strong>Defend</strong><span><kbd>Q</kbd> block</span><span><kbd>Shift</kbd> dodge</span></p>
    <p><strong>Technique</strong>${getTechniqueControlHtml(technique)}</p>
  `;
}

function resetGame() {
  currentRound = 1;
  playerRounds = 0;
  enemyRounds = 0;
  paused = false;
  pauseScreen.classList.add("hidden");
  clearInterval(readyCountdownId);
  updateControlsVisibility();
  startRound(pacifistBot && !homeOpen ? "playing" : "lobby");
}

function openHomeScreen() {
  homeOpen = true;
  paused = false;
  gameOver = true;
  setGameState("home", "open home");
  roundEnding = false;
  roundResolved = false;
  koWinner = null;
  onlineRole = null;
  onlineConnected = false;
  onlinePlayers = { p1: 0, p2: 0 };
  onlineTechniqueChoices = { p1: null, p2: null };
  onlinePickedTechnique = false;
  cpuOpponentTechniqueLocked = false;
  resetReadyPhase("home");
  lastRoundWinner = null;
  if (onlineSocket) onlineSocket.close();
  onlineSocket = null;
  clearInterval(readyCountdownId);
  keys.clear();
  message.classList.add("hidden");
  updateReadyPromptVisibility();
  pauseScreen.classList.add("hidden");
  if (practiceSettingsScreen) practiceSettingsScreen.classList.add("hidden");
  techniqueScreen.classList.add("hidden");
  resetPracticeDamage();
  updateControlsVisibility();
  hideWaiting();
  homeScreen.classList.remove("hidden");
}

function startFromHome(practiceMode) {
  pendingStartPractice = practiceMode;
  cpuOpponentTechniqueLocked = false;
  if (!practiceMode) {
    selectedMode = "cpu";
    updateHomeModeButtons();
  }
  homeScreen.classList.add("hidden");
  if (practiceSettingsScreen) practiceSettingsScreen.classList.add("hidden");
  techniqueScreen.classList.remove("hidden");
}

function finishTechniqueSelect(technique) {
  selectedTechnique = technique;
  if (onlineRole === "p1" || onlineRole === "p2") {
    onlineTechniqueChoices[onlineRole] = technique;
    onlinePickedTechnique = true;
  }
  homeOpen = false;
  paused = false;
  pacifistBot = pendingStartPractice;
  gameMode = onlineRole || onlineConnected ? "online" : pacifistBot ? "cpu" : selectedMode;
  if (gameMode === "cpu") {
    ensureCpuOpponentTechnique("technique selected");
  } else {
    cpuOpponentTechniqueLocked = false;
  }
  techniqueScreen.classList.add("hidden");
  homeScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");
  updateControlsVisibility();
  resetGame();
  if (gameMode === "online") {
    sendOnlineTechniqueChoice();
    updateOnlineWaiting();
  }
}

function updateHomeModeButtons() {
  cpuModeButton.setAttribute("aria-pressed", String(selectedMode === "cpu"));
  pvpModeButton.setAttribute("aria-pressed", String(selectedMode === "pvp"));
  cpuDifficultyPanel.classList.toggle("hidden", selectedMode !== "cpu");
}

function updateDifficultyButtons() {
  difficultyButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.difficulty === cpuDifficulty));
  });
}

function makeRoomCode() {
  return Math.random().toString(36).slice(2, 7);
}

function cleanRoomCode(value, fallback = "battle") {
  const clean = value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  return clean || fallback;
}

function showWaiting(title, copy) {
  onlineWaiting = true;
  waitingTitle.textContent = title;
  waitingCode.textContent = onlineRoom.toUpperCase();
  waitingCopy.textContent = copy;
  waitingScreen.classList.remove("hidden");
}

function hideWaiting() {
  onlineWaiting = false;
  waitingScreen.classList.add("hidden");
}

function updateOnlineWaiting() {
  if (gameMode !== "online" || !onlineRole) return;
  if (!techniqueScreen.classList.contains("hidden")) return;
  if (!hasPickedOnlineTechnique()) return;
  const wasWaiting = onlineWaiting;
  const hasHost = onlinePlayers.p1 > 0;
  const hasJoiner = onlinePlayers.p2 > 0;

  if (onlineRole === "p1" && !hasJoiner) {
    showWaiting("Waiting For Player 2", "Tell your friend to press Join Battle and enter this code.");
    return;
  }

  if (onlineRole === "p2" && !hasHost) {
    showWaiting("Waiting For Host", "The host has to press Host Battle with this same code.");
    return;
  }

  hideWaiting();
  sendOnlineTechniqueChoice();
  if (wasWaiting && onlineRole === "p1") resetGame();
}

function applyOnlineTechniqueChoice(role, technique, reason = "") {
  if ((role !== "p1" && role !== "p2") || !isValidTechnique(technique)) return;
  const changed = onlineTechniqueChoices[role] !== technique;
  onlineTechniqueChoices[role] = technique;
  if (changed) console.log("[online technique]", { role, technique, reason });

  if (gameMode !== "online" || !player || !enemy) return;
  const fighter = role === "p1" ? player : enemy;
  if (!changed && fighter.technique === technique) return;
  fighter.technique = technique;
  applyTechniqueStats(fighter, true);
  updateControlsVisibility();
  updateHud();
}

function sendOnlineTechniqueChoice() {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || gameMode !== "online") return;
  if (onlineRole !== "p1" && onlineRole !== "p2") return;
  const technique = onlineTechniqueChoices[onlineRole] || selectedTechnique;
  if (!isValidTechnique(technique)) return;
  onlineSocket.send(JSON.stringify({ type: "technique", role: onlineRole, technique }));
}

function sendOnlinePause(value) {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || gameMode !== "online") return;
  onlineSocket.send(JSON.stringify({ type: "pause", paused: value }));
}

function setPaused(value, broadcast = true) {
  if (homeOpen || roundEnding || gameOver || gameState !== "playing") return;
  paused = value;
  pauseScreen.classList.toggle("hidden", !paused);
  if (paused) keys.clear();
  updateBattleMusicState();
  if (broadcast) sendOnlinePause(paused);
}

function startOnlineGame(role) {
  onlineRole = role;
  onlineConnected = true;
  
  
  
  sendOnlineName(); // NAME_SEND_ON_CONNECT
  updatePlayerNameLabels();
sendOnlineName(); // CLEAN_ONLINE_NAME_SEND
  updatePlayerNameLabels();
sendOnlineName(); // ONLINE_NAME_SEND_PATCH
  updatePlayerNameLabels();
homeOpen = false;
  paused = false;
  gameMode = "online";
  setGameState("lobby", "online role assigned");
  pacifistBot = false;
  homeScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");
  message.classList.add("hidden");
  hideWaiting();
  pendingStartPractice = false;
  if (role === "spectator") {
    techniqueScreen.classList.add("hidden");
    showWaiting("Room Full", "This battle already has two players. Try a different code.");
  } else {
    techniqueScreen.classList.remove("hidden");
  }
  scoreInfoEl.textContent = role === "p1" ? "Online P1" : role === "p2" ? "Online P2" : "Spectator";
}

function connectOnline(room = onlineRoom, side = onlineSide) {
  if (onlineSocket) onlineSocket.close();
  onlineRoom = cleanRoomCode(room);
  onlineSide = side;
  onlineRole = null;
  onlineConnected = false;
  onlinePlayers = { p1: 0, p2: 0 };
  onlineTechniqueChoices = { p1: null, p2: null };
  onlinePickedTechnique = false;
  roomCodeInput.value = onlineRoom;
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const socketHost = window.location.protocol === "file:" ? "localhost:8080" : window.location.host;
  const sideQuery = side ? `&side=${encodeURIComponent(side)}` : "";
  onlineSocket = new WebSocket(`${protocol}//${socketHost}/ws?room=${encodeURIComponent(onlineRoom)}${sideQuery}`);

  onlineSocket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === "name") {
      const role = data.role === "p2" ? "p2" : "p1";
      onlinePlayerNames[role] = sanitizePlayerName(data.name, role === "p1" ? "Player 1" : "Player 2");
      updatePlayerNameLabels();
      return;
    }
if (data.type === "role") {
      startOnlineGame(data.role);
      return;
    }

    if (data.type === "room") {
      onlinePlayers = data.players;
      updateOnlineWaiting();
      return;
    }

    if (data.type === "pause") {
      setPaused(Boolean(data.paused), false);
      return;
    }

    if (data.type === "technique") {
      applyOnlineTechniqueChoice(data.role, data.technique, "remote choice");
      return;
    }

    if (data.type === "ready") {
      if (!isReadyPhase(gameState) || (data.phase && !isReadyPhase(data.phase))) return;
      if (data.round && data.round !== currentRound) return;
      if (data.role !== "p1" && data.role !== "p2") return;
      console.log("[ready click remote]", data);
      if (data.role === "p1") setReadyFlags(true, player2Ready, "p1 ready message");
      if (data.role === "p2") setReadyFlags(player1Ready, true, "p2 ready message");
      if (onlineRole === "p1") checkOnlineReadyStart();
      else syncOnlineRoundMessage();
      return;
    }

    if (onlineRole === "p1" && data.type === "input") {
      if (gameState !== "playing") return;
      remoteInput = data.input;
      if (data.aim) setFighterTechniqueAim(enemy, data.aim);
      if (data.action === "light") startAttack(enemy, "light");
      if (data.action === "heavy") startAttack(enemy, "heavy");
      if (data.action === "backThrow") startBackThrow(enemy, false);
      if (data.action === "dodge") startDodge(enemy, getVectorFromInput(remoteInput));
      if (data.action === "jump") jumpFighterWithMove(enemy, (remoteInput.right ? 1 : 0) - (remoteInput.left ? 1 : 0));
      if (data.action === "infinity") toggleInfinity(enemy);
      if (data.action === "ultimate") startUltimate(enemy);
      if (data.action === "ultimate-start") beginUltimateAim(enemy, data.aim);
      if (data.action === "ultimate-release") releaseUltimateAim(enemy, data.aim);
      if (data.action === "fuga-start") prepareFuga(enemy, data.aim);
      if (data.action === "fuga") startFuga(enemy, data.aim);
      if (data.action === "teleport-start") prepareTeleport(enemy, data.aim);
      if (data.action === "teleport") performTeleport(enemy, data.aim);
      if (data.action === "ct1") useTechniqueInput(enemy, 1, data.aim);
      if (data.action === "ct2") useTechniqueInput(enemy, 2, data.aim);
      if (data.action === "ct1-release") releaseTechniqueInput(enemy, 1, data.aim);
      if (data.action === "ct2-release") releaseTechniqueInput(enemy, 2, data.aim);
      return;
    }

    if (onlineRole === "p1" && data.type === "fighter") {
      if (data.fighter && data.fighter.technique) {
        applyOnlineTechniqueChoice("p2", data.fighter.technique, "fighter state");
      }
      return;
    }

    if (onlineRole === "p1" && data.type === "damage") {
      applyOnlineDamageToPlayer(data);
      return;
    }

    if (onlineRole !== "p1" && data.type === "state") {
      Object.assign(player, data.player);
      Object.assign(enemy, data.enemy);
      if (data.player && isValidTechnique(data.player.technique)) {
        onlineTechniqueChoices.p1 = data.player.technique;
      }
      player.ce = data.player.ce;
      player.maxCe = data.player.maxCe;
      player.technique = data.player.technique;
      if (onlineRole === "p2") {
        const ownTechnique = onlineTechniqueChoices.p2 || selectedTechnique;
        if (isValidTechnique(ownTechnique)) {
          enemy.technique = ownTechnique;
          applyTechniqueStats(enemy, true);
        }
      }
      if (data.projectiles) {
        const ownProjectiles = projectiles.filter((p) => p.owner === "enemy");
        const remoteProjectiles = data.projectiles.map((p) => ({ ...p, visualOnly: true }));
        projectiles = ownProjectiles.concat(remoteProjectiles);
      }
      currentRound = data.currentRound;
      playerRounds = data.playerRounds;
      enemyRounds = data.enemyRounds;
      gameOver = data.gameOver;
      roundEnding = data.roundEnding;
      roundResolved = data.roundResolved;
      if (data.gameState) setGameState(data.gameState, "host state");
      if (data.gameState === "playing") {
        gameOver = false;
        roundResolved = false;
        message.classList.add("hidden");
        updateReadyPromptVisibility();
      }
      const incomingReady = data.onlineReady || { p1: data.player1Ready, p2: data.player2Ready };
      if ((gameState === "lobby" || gameState === "roundOver") && player2Ready) incomingReady.p2 = true;
      player1Ready = Boolean(incomingReady.p1);
      player2Ready = Boolean(incomingReady.p2);
      syncReadyObject();
      if (player2Ready && data.onlineReady && data.onlineReady.p2) lastOnlineReadySent = performance.now();
      readyCountdownValue = data.readyCountdownValue || 0;
      setCountdownOverlay(readyCountdownValue);
      lastRoundWinner = data.lastRoundWinner || lastRoundWinner;
      setPaused(Boolean(data.paused), false);
      syncOnlineRoundMessage();
      updateControlsVisibility();
      updateHud();
    }
  });

  onlineSocket.addEventListener("close", () => {
    onlineConnected = false;
    if (gameMode === "online" && !homeOpen) {
      showWaiting("Disconnected", "Go Home and start or join the battle again.");
    }
  });
}

function getOnlineInput() {
  return {
    left: isPressed("a", "keya"),
    right: isPressed("d", "keyd"),
    up: isPressed(" ", "space"),
    down: isPressed("s", "keys"),
    block: isPressed("q", "keyq"),
    rct: isPressed("r", "keyr"),
    heavy: isPressed("e", "keye"),
    bluePunch: isPressed("t", "keyt")
  };
}

function getOnlineAction(key, code, repeat) {
  if (isEventForAction("light", key, code) && !repeat) return "light";
  if (isEventForAction("heavy", key, code) && !repeat) return "heavy";
  if (isEventForAction("dodge", key, code)) return "dodge";
  if (isEventForAction("jump", key, code) && !repeat) return "jump";
  if (isEventForAction("infinity", key, code) && !repeat && enemy?.technique === "limitless") return "infinity";
  if (isEventForAction("ultimate", key, code) && !repeat) return "ultimate-start";
  if (isEventForAction("specialAim", key, code) && !repeat) return enemy?.technique === "shrine" ? "fuga-start" : "teleport-start";
  return null;
}

function getTechniqueReleaseAction(key, code) {
  return null;
}

function getMouseTechniqueAction(button, release = false) {
  if (button === 0) return release ? "ct1-release" : "ct1";
  if (button === 2) return release ? "ct2-release" : "ct2";
  return null;
}

function handleTechniqueMouseDown(event) {
  const action = getMouseTechniqueAction(event.button);
  if (!action) return;
  event.preventDefault();
  const aim = updateMouseAimFromEvent(event);
  if (homeOpen || paused || gameState !== "playing") return;
  const fighter = getActiveMouseTechniqueFighter();
  if (!fighter?.teleportAiming && !fighter?.fugaAiming) {
    mouseTechniqueHeld.teleport = false;
    mouseTechniqueHeld.fuga = false;
  }
  mouseTechniqueHeld[action] = true;
  if (mouseTechniqueHeld.ct1 && mouseTechniqueHeld.ct2) {
    if (fighter?.technique === "shrine" && prepareFuga(fighter, aim)) {
      if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("fuga-start", aim);
      return;
    }
    if (prepareTeleport(fighter, aim)) {
      if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("teleport-start", aim);
      return;
    }
  }

  if (fighter?.fugaAiming || fighter?.teleportAiming) {
    return;
  }
  if (gameMode === "online" && onlineRole === "p2") {
    if (action === "ct1") useTechniqueInput(enemy, 1, aim);
    if (action === "ct2") useTechniqueInput(enemy, 2, aim);
    sendOnlineInput(action, aim);
    return;
  }
  if (action === "ct1") useTechniqueInput(player, 1, aim);
  if (action === "ct2") useTechniqueInput(player, 2, aim);
}

function handleTechniqueMouseUp(event) {
  const action = getMouseTechniqueAction(event.button, true);
  if (!action) return;
  const heldAction = action === "ct1-release" ? "ct1" : "ct2";
  if (!mouseTechniqueHeld[heldAction]) return;
  event.preventDefault();
  const aim = updateMouseAimFromEvent(event);
  if (mouseTechniqueHeld.teleport) {
    const fighter = getActiveMouseTechniqueFighter();
    mouseTechniqueHeld.ct1 = false;
    mouseTechniqueHeld.ct2 = false;
    clearSpecialHoldState(fighter);
    performTeleport(fighter, aim);
    if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("teleport", aim);
    return;
  }
  if (mouseTechniqueHeld.fuga) {
    const fighter = getActiveMouseTechniqueFighter();
    mouseTechniqueHeld.ct1 = false;
    mouseTechniqueHeld.ct2 = false;
    clearSpecialHoldState(fighter);
    startFuga(fighter, aim);
    if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("fuga", aim);
    return;
  }
  mouseTechniqueHeld[heldAction] = false;
  if (gameMode === "online" && onlineRole === "p2") {
    if (action === "ct1-release") releaseTechniqueInput(enemy, 1, aim);
    if (action === "ct2-release") releaseTechniqueInput(enemy, 2, aim);
    sendOnlineInput(action, aim);
    return;
  }
  if (action === "ct1-release") releaseTechniqueInput(player, 1, aim);
  if (action === "ct2-release") releaseTechniqueInput(player, 2, aim);
}


function clearSpecialHoldState(f = null) {
  mouseTechniqueHeld.teleport = false;
  mouseTechniqueHeld.fuga = false;
  if (f) {
    f.teleportAiming = false;
    f.fugaAiming = false;
    f.fugaChargeTicks = 0;
  }
}

function sendOnlineInput(action = null, aim = null) {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || onlineRole !== "p2") return;
  lastOnlineInputKey = JSON.stringify(getOnlineInput());
  lastOnlineInputSent = performance.now();
  const aimPoint = sanitizeAimPoint(aim);
  onlineSocket.send(JSON.stringify({ type: "input",
      localName: getLocalPlayerName(), input: getOnlineInput(), action, aim: aimPoint }));
}

function sendOnlineInputTick(force = false) {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || onlineRole !== "p2" || paused || homeOpen || gameState !== "playing") return;
  const input = getOnlineInput();
  const key = JSON.stringify(input);
  const now = performance.now();
  const activeInput = input.left || input.right || input.up || input.down || input.block || input.rct || input.heavy || input.bluePunch;
  if (!force && key === lastOnlineInputKey && now - lastOnlineInputSent < (activeInput ? 16 : 50)) return;
  lastOnlineInputKey = key;
  lastOnlineInputSent = now;
  const aim = (mouseTechniqueHeld.ct1 || mouseTechniqueHeld.ct2 || mouseTechniqueHeld.teleport || mouseTechniqueHeld.fuga) ? sanitizeAimPoint(mouseAimWorld) : null;
  onlineSocket.send(JSON.stringify({ type: "input", input, action: null, aim }));
}

function getFighterNetworkState(f) {
  return {
    x: f.x,
    y: f.y,
    w: f.w,
    h: f.h,
    vx: f.vx,
    vy: f.vy,
    dir: f.dir,
    speed: f.speed,
    color: f.color,
    accent: f.accent,
    grounded: f.grounded,
    attacking: f.attacking,
    attackFrame: f.attackFrame,
    hasHit: f.hasHit,
    blocking: f.blocking,
    dodging: f.dodging,
    dodgeCooldown: f.dodgeCooldown,
    jumpsUsed: f.jumpsUsed,
    shieldTicks: f.shieldTicks,
    shieldCooldown: f.shieldCooldown,
    shieldHitFlash: f.shieldHitFlash,
    health: f.health,
    maxHealth: f.maxHealth,
    healthBars: f.healthBars,
    delayedHealth: f.delayedHealth,
    ce: f.ce,
    maxCe: f.maxCe,
    ultimateMeter: f.ultimateMeter,
    ultimateStartup: f.ultimateStartup,
    ultimateRecovery: f.ultimateRecovery,
    ultimateMove: f.ultimateMove,
    ultimateHasReleased: f.ultimateHasReleased,
    damageTakenMultiplier: f.damageTakenMultiplier,
    knockbackTakenMultiplier: f.knockbackTakenMultiplier,
    outgoingDamageMultiplier: f.outgoingDamageMultiplier,
    technique: f.technique,
    techniqueCooldown: f.techniqueCooldown,
    techniqueCooldownMax: f.techniqueCooldownMax,
    barrageTimer: f.barrageTimer,
    barrageDuration: f.barrageDuration,
    barrageHitsDone: f.barrageHitsDone,
    barrageDir: f.barrageDir,
    barrageHeldTimer: f.barrageHeldTimer,
    barrageHeldBy: f.barrageHeldBy,
    barrageLockY: f.barrageLockY,
    grabThrowTimer: f.grabThrowTimer,
    grabThrowDuration: f.grabThrowDuration,
    grabThrowDir: f.grabThrowDir,
    grabThrowTarget: f.grabThrowTarget,
    grabThrowAim: f.grabThrowAim,
    grabHeldTimer: f.grabHeldTimer,
    grabHeldBy: f.grabHeldBy,
    grabLockY: f.grabLockY,
    chargingTechnique: f.chargingTechnique,
    chargeTicks: f.chargeTicks,
    techniqueAim: f.techniqueAim,
    infinityActive: f.infinityActive,
    infinityPulse: f.infinityPulse,
    teleportAiming: f.teleportAiming,
    teleportCooldown: f.teleportCooldown,
    bluePunchHoldTicks: f.bluePunchHoldTicks,
    bluePunchActiveTicks: f.bluePunchActiveTicks,
    bluePunchCooldown: f.bluePunchCooldown,
    bluePunchChases: f.bluePunchChases,
    bluePunchFlash: f.bluePunchFlash,
    fugaAiming: f.fugaAiming,
    fugaChargeTicks: f.fugaChargeTicks,
    fugaCooldown: f.fugaCooldown,
    fugaCooldownMax: f.fugaCooldownMax,
    rctHealing: f.rctHealing,
    rctCooldown: f.rctCooldown,
    walkCycle: f.walkCycle,
    onPlatform: f.onPlatform
  };
}

function sendOnlineFighterState() {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || onlineRole !== "p2" || gameState !== "playing") return;
  const now = performance.now();
  if (now - lastOnlineFighterSent < 16) return;
  lastOnlineFighterSent = now;
  onlineSocket.send(JSON.stringify({ type: "fighter", fighter: getFighterNetworkState(enemy) }));
}

function sendOnlineDamage(hit) {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || onlineRole !== "p2") return;
  onlineSocket.send(JSON.stringify({ type: "damage", ...hit }));
}

function sendOnlineReady() {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || !isOnlinePlayerRole()) return;
  lastOnlineReadySent = performance.now();
  console.log("[ready send]", { role: onlineRole, phase: gameState, round: currentRound });
  onlineSocket.send(JSON.stringify({ type: "ready", role: onlineRole, phase: gameState, round: currentRound }));
}

function sendOnlineState() {
  if (!onlineSocket || onlineSocket.readyState !== WebSocket.OPEN || onlineRole !== "p1") return;
  const now = performance.now();
  if (now - lastOnlineStateSent < 16) return;
  lastOnlineStateSent = now;
  onlineSocket.send(JSON.stringify({
    type: "state",
    player,
    enemy,
    currentRound,
    playerRounds,
    enemyRounds,
    gameOver,
    roundEnding,
    roundResolved,
    paused,
    gameState,
    onlineReady,
    player1Ready,
    player2Ready,
    readyCountdownValue,
    lastRoundWinner,
    projectiles: projectiles.filter((p) => p.owner === "player")
  }));
}

function resetRoundActors() {
  platforms = BASE_PLATFORMS.map((platform) => ({ ...platform, broken: false }));
  player = makeFighter({ x: 170, w: 50, h: 128, dir: 1, color: "#2563eb", accent: "#1d4ed8" });
  enemy = makeFighter({ x: STAGE_W - 230, w: 52, h: 128, dir: -1, color: "#dc2626", accent: "#991b1b" });
  projectiles = [];
  hitSparks = [];
  projectileDisperses = [];
  teleportEffects = [];
  fugaExplosions = [];
  shieldBreakEffects = [];
  worldSlashEffects = [];
  groundEraseEffects = [];
  ultimateChargeEffects = [];
  ultimateScreenEffect = { ticks: 0, maxTicks: 0, kind: "" };
  cinematicZoomTicks = 0;
  ultimateFocusOwner = null;
  pendingDomain = null;
  activeDomain = null;
  domainClash = null;
  mouseTechniqueHeld.ct1 = false;
  mouseTechniqueHeld.ct2 = false;
  mouseTechniqueHeld.teleport = false;
  mouseTechniqueHeld.fuga = false;
  if (gameMode === "cpu") {
    ensureCpuOpponentTechnique("reset round actors");
  }
  if (gameMode === "online" && onlineRole === "p2") {
    player.technique = onlineTechniqueChoices.p1 || "limitless";
    enemy.technique = onlineTechniqueChoices.p2 || selectedTechnique;
  } else if (gameMode === "online") {
    player.technique = onlineTechniqueChoices.p1 || selectedTechnique;
    enemy.technique = onlineTechniqueChoices.p2 || "limitless";
  } else {
    player.technique = selectedTechnique;
    enemy.technique = gameMode === "cpu" ? cpuOpponentTechnique : "limitless";
  }
  if (pacifistBot) enemy.technique = "dummy";
  applyTechniqueStats(player);
  applyTechniqueStats(enemy);
  applyCpuDifficultyStats();
  if (pacifistBot) {
    enemy.isPracticeDummy = true;
    enemy.practiceHomeX = STAGE_W / 2 - enemy.w / 2;
    enemy.practiceIdleTicks = PRACTICE_BOT_RETURN_TICKS;
    enemy.x = enemy.practiceHomeX;
    enemy.y = GROUND - enemy.h;
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.grounded = true;
    enemy.onPlatform = false;
    enemy.dir = -1;
    enemy.attacking = null;
    enemy.aiGoal = "dummy";
    resetPracticeDamage();
  }
  koWinner = null;
  shake = 0;
  hitStopTicks = 0;
  updateControlsVisibility();
  updateCamera(true);
}

function startRound(nextState = "playing") {
  console.log("[round start]", { round: currentRound, nextState, gameMode, onlineRole });
  resetRoundActors();
  resetReadyPhase(`start round ${nextState}`);
  lastRoundWinner = null;
  frame = 0;
  fixedAccumulator = 0;
  lastFrameTime = performance.now();
  lastOnlineStateSent = 0;
  lastOnlineInputSent = 0;
  lastOnlineFighterSent = 0;
  setGameState(nextState, "startRound");
  gameOver = nextState !== "playing";
  roundEnding = false;
  roundResolved = nextState !== "playing";
  message.classList.add("hidden");
  updateReadyPromptVisibility();
  readyButton.disabled = false;
  clearInterval(readyCountdownId);
  setCountdownOverlay(0);
  if (nextState === "lobby") {
    updateReadyMessage();
  }
  updateBattleMusicState(nextState === "playing");
  updateHud();
}





function getPlayerLabelColor() {
  return "#ff4b4b";
}

function getEnemyLabelColor() {
  return gameMode === "cpu" ? "#cbd5e1" : "#60a5fa";
}

function getHealthColorClass(f) {
  const ratio = f.maxHealth > 0 ? f.health / f.maxHealth : 0;
  if (ratio > 0.55) return "green";
  if (ratio > 0.25) return "yellow";
  return "red";
}

function getSukunaPassiveLevel(f) {
  if (!f || f.technique !== "shrine" || f.health <= 0) return 0;
  const state = getLayeredHealthState(f.health, f.maxHealth, f.healthBars);
  if (state.activeBars <= 1) return 2;
  if (state.activeBars === 2) return 1;
  return 0;
}

function getSukunaPassiveDamageMultiplier(f) {
  const level = getSukunaPassiveLevel(f);
  if (level >= 2) return SUKUNA_PASSIVE_LAST_BAR_DAMAGE;
  if (level === 1) return SUKUNA_PASSIVE_ONE_BAR_DAMAGE;
  return 1;
}

function getOutgoingDamageMultiplier(f) {
  return (f?.outgoingDamageMultiplier || 1) * getSukunaPassiveDamageMultiplier(f);
}

function getLayeredHealthState(health, maxHealth, barCount) {
  const safeBarCount = Math.max(1, Math.round(barCount || 1));
  const safeMaxHealth = Math.max(1, maxHealth || 1);
  const layerSize = safeMaxHealth / safeBarCount;
  const clampedHealth = Math.max(0, Math.min(safeMaxHealth, health || 0));
  const activeBars = clampedHealth > 0 ? Math.ceil(clampedHealth / layerSize) : 0;
  const layerBaseHealth = Math.max(0, activeBars - 1) * layerSize;
  const activeFill = activeBars > 0 ? Math.max(0, Math.min(1, (clampedHealth - layerBaseHealth) / layerSize)) : 0;

  return {
    activeBars,
    activeFill: activeBars > 0 && activeFill <= 0 ? 1 : activeFill,
    extraBars: Math.max(0, activeBars - 1)
  };
}

function renderSegmentedHealth(el, f) {
  if (!el || !f) return;
  const barCount = Math.max(1, Math.round(f.healthBars || 1));
  if (el.dataset.barCount !== String(barCount) || !el.querySelector(".health-main")) {
    el.dataset.barCount = String(barCount);
    el.innerHTML = "";
    const main = document.createElement("div");
    main.className = "health-main";
    main.innerHTML = '<div class="health-lag"></div><div class="health-current"></div>';
    el.appendChild(main);

    const stack = document.createElement("div");
    stack.className = "health-stack";
    for (let i = 0; i < barCount - 1; i += 1) {
      const stock = document.createElement("div");
      stock.className = "health-stock";
      stack.appendChild(stock);
    }
    el.appendChild(stack);
  }

  if (!Number.isFinite(f.delayedHealth)) f.delayedHealth = f.health;
  if (!Number.isFinite(f._lastHudHealth)) f._lastHudHealth = f.health;
  if (f.health < f._lastHudHealth) f.healthLagDelay = 18;
  if (f.health > f._lastHudHealth) {
    f.delayedHealth = f.health;
    f.healthLagDelay = 0;
  }
  f._lastHudHealth = f.health;
  if (f.delayedHealth < f.health) {
    f.delayedHealth = f.health;
  } else if (f.delayedHealth > f.health) {
    if (f.healthLagDelay > 0) {
      f.healthLagDelay -= 1;
    } else {
      const catchUp = Math.max(0.55, (f.delayedHealth - f.health) * 0.038);
      f.delayedHealth = Math.max(f.health, f.delayedHealth - catchUp);
    }
  }

  const currentState = getLayeredHealthState(f.health, f.maxHealth, barCount);
  const delayedState = getLayeredHealthState(f.delayedHealth, f.maxHealth, barCount);
  const lagFill = delayedState.activeBars > currentState.activeBars
    ? 1
    : delayedState.activeBars < currentState.activeBars ? currentState.activeFill : delayedState.activeFill;
  const colorClass = getHealthColorClass(f);
  const current = el.querySelector(".health-current");
  const lag = el.querySelector(".health-lag");
  if (current) {
    current.className = `health-current ${colorClass}`;
    current.style.width = `${currentState.activeFill * 100}%`;
  }
  if (lag) lag.style.width = `${lagFill * 100}%`;

  const stocks = Array.from(el.querySelectorAll(".health-stock"));
  stocks.forEach((stock, index) => {
    const slotFromBottom = stocks.length - 1 - index;
    const isFull = slotFromBottom < currentState.extraBars;
    stock.className = `health-stock ${isFull ? `full ${colorClass}` : "empty"}`;
  });
}


function getCooldownRatio(current, max) {
  const c = Math.max(0, Number(current) || 0);
  const m = Math.max(1, Number(max) || 1);
  return Math.max(0, Math.min(1, c / m));
}

function getExtraCooldownItems(f) {
  if (!f) return [];

  // Practice dummy should only show HP, not CE/ULT/CT/extra cooldown rows.
  if (gameMode === "practice" && f === enemy) return [];

  const items = [];

  const rctMax = RCT_COOLDOWN_TICKS[f.technique] || 180;
  items.push({ name: "RCT", current: f.rctCooldown || 0, max: rctMax });

  if (f.technique === "limitless") {
    const bluePunchMax = GOJO_BLUE_PUNCH_COOLDOWN_TICKS || 600;
    const stunComboMax = GOJO_PUSH_PULL_FINISHER_COOLDOWN_TICKS || GOJO_LIGHT_FINISHER_COOLDOWN_TICKS || 300;

    items.push({ name: "AMP", current: f.bluePunchCooldown || 0, max: bluePunchMax });
    items.push({ name: "STUN COMBO", current: f.gojoPushPullCooldown || 0, max: stunComboMax });
  }

  return items;
}

function updateExtraCooldownHud(container, f) {
  if (!container) return;

  const items = getExtraCooldownItems(f);
  container.innerHTML = "";

  if (!items.length) {
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");

  items.forEach((item) => {
    const ratio = getCooldownRatio(item.current, item.max);
    const ready = ratio <= 0;

    const row = document.createElement("div");
    row.className = `extra-cooldown ct-slot ${ready ? "ready" : "cooling"}`;

    const label = document.createElement("span");
    label.className = "extra-cooldown-label ct-label";
    label.textContent = item.name;

    const meter = document.createElement("div");
    meter.className = "ct-meter";

    const fill = document.createElement("div");
    fill.className = "extra-cooldown-fill ct-fill";
    fill.style.width = `${ready ? 100 : Math.max(4, ratio * 100)}%`;

    const status = document.createElement("span");
    status.className = "extra-cooldown-status ct-status";
    status.textContent = ready ? "READY" : `${Math.ceil(item.current / 60)}s`;

    meter.appendChild(fill);
    row.append(label, meter, status);
    container.appendChild(row);
  });
}

function setHudElementHidden(el, hidden) {
  if (el) el.classList.toggle("hidden", Boolean(hidden));
}

function updatePracticeDummyHudVisibility() {
  const hideDummyMeters = gameMode === "practice";

  const enemyPanel = enemyHealthEl ? enemyHealthEl.closest(".fighter-panel") : null;
  const enemyCeFrame = enemyCeEl ? enemyCeEl.closest(".ce-frame") : null;
  const enemyUltFrame = enemyUltimateEl ? enemyUltimateEl.closest(".ultimate-frame") : null;
  const enemyCtGrid = ctHud?.enemy?.[0]?.slot ? ctHud.enemy[0].slot.closest(".ct-cooldowns") : null;

  setHudElementHidden(enemyCeFrame, hideDummyMeters);
  setHudElementHidden(enemyUltFrame, hideDummyMeters);
  setHudElementHidden(enemyCtGrid, hideDummyMeters);
  setHudElementHidden(enemyExtraCooldownsEl, hideDummyMeters);
  setHudElementHidden(enemyStarsEl, hideDummyMeters);

  if (enemyPanel) enemyPanel.classList.toggle("practice-hp-only", hideDummyMeters);
}

function updateHud() {
  updatePlayerNameLabels();
  enemyNameEl.classList.toggle("player-two-name", gameMode !== "cpu");
  enemyNameEl.classList.toggle("cpu-name", gameMode === "cpu");
  renderSegmentedHealth(playerHealthEl, player);
  renderSegmentedHealth(enemyHealthEl, enemy);
  playerCeEl.style.width = `${Math.max(0, player.ce / player.maxCe * 100)}%`;
  enemyCeEl.style.width = `${Math.max(0, enemy.ce / enemy.maxCe * 100)}%`;
  if (playerUltimateEl) playerUltimateEl.style.width = `${Math.max(0, Math.min(100, player.ultimateMeter || 0))}%`;
  if (enemyUltimateEl) enemyUltimateEl.style.width = `${Math.max(0, Math.min(100, enemy.ultimateMeter || 0))}%`;
  updateTechniqueCooldownHud(player, ctHud.player);
  updateTechniqueCooldownHud(enemy, ctHud.enemy);
  roundInfoEl.textContent = pacifistBot ? "Practice" : `Round ${currentRound}`;
  scoreInfoEl.textContent = pacifistBot
    ? "No rounds"
    : gameMode === "online" ? `Online ${onlineRole ? onlineRole.toUpperCase() : ""}`
      : gameMode === "pvp" ? "PVP" : `${cpuDifficulty.toUpperCase()} CPU`;
  playerStarsEl.textContent = "★".repeat(playerRounds) + "☆".repeat(Math.max(0, WINS_TO_MATCH - playerRounds));
  enemyStarsEl.textContent = "★".repeat(enemyRounds) + "☆".repeat(Math.max(0, WINS_TO_MATCH - enemyRounds));
  updatePracticeDamageMeter();
  updatePracticeSettingsButtonVisibility();

  updateExtraCooldownHud(playerExtraCooldownsEl, player);
  updateExtraCooldownHud(enemyExtraCooldownsEl, enemy);
  updatePracticeDummyHudVisibility();
}

function finishRound(winner) {
  if (roundResolved) return;
  roundResolved = true;
  gameOver = true;
  roundEnding = false;
  setGameState("roundOver", "finishRound");
  lastRoundWinner = winner;
  resetReadyPhase("round over");

  if (winner === "player") playerRounds += 1;
  if (winner === "enemy") enemyRounds += 1;
  if (playerRounds < WINS_TO_MATCH && enemyRounds < WINS_TO_MATCH) {
    resetRoundActors();
    gameOver = true;
    roundResolved = true;
  }
  updateHud();
  updateReadyMessage();
}

function updateReadyMessage() {
  if (playerRounds >= WINS_TO_MATCH || enemyRounds >= WINS_TO_MATCH) {
    const matchTitle = playerRounds > enemyRounds ? `${getPlayerLabel()} Wins Match` : `${getEnemyLabel()} Wins Match`;
    messageTitle.textContent = matchTitle;
    messageCopy.textContent = `Final score: ${playerRounds} - ${enemyRounds}. Press Restart to run it back.`;
    updateReadyPromptVisibility();
    message.classList.remove("hidden");
    return;
  }

  message.classList.add("hidden");
  let showReadyButton = readyCountdownValue <= 0 && !pacifistBot;
  if (gameMode === "online") {
    if (!hasPickedOnlineTechnique()) {
      updateReadyPromptVisibility();
      return;
    }
    const mineReady = onlineRole === "p2" ? player2Ready : player1Ready;
    showReadyButton = !mineReady && readyCountdownValue <= 0;
  }
  readyButton.textContent = "Ready";
  readyButton.disabled = !showReadyButton;
  setCountdownOverlay(readyCountdownValue);
  const waitingForOtherPlayer = gameMode === "online"
    && readyCountdownValue <= 0
    && ((onlineRole === "p1" && player1Ready && !player2Ready) || (onlineRole === "p2" && player2Ready && !player1Ready));
  updateReadyPromptVisibility(showReadyButton, waitingForOtherPlayer);
}

function startReadyCountdown() {
  if (!(gameState === "lobby" || gameState === "roundOver")) return;
  if (roundEnding || playerRounds >= WINS_TO_MATCH || enemyRounds >= WINS_TO_MATCH) return;
  if (gameMode === "online" && onlineRole !== "p1") return;
  if (gameMode === "online" && (!player1Ready || !player2Ready)) return;
  if (readyCountdownValue > 0) return;
  console.log("[ready countdown start]", { gameState, round: currentRound, player1Ready, player2Ready });
  let count = 3;
  readyCountdownValue = count;
  setCountdownOverlay(count);
  readyButton.disabled = true;
  updateReadyPromptVisibility();
  message.classList.add("hidden");
  clearInterval(readyCountdownId);
  readyCountdownId = setInterval(() => {
    count -= 1;
    readyCountdownValue = count;
    if (count > 0) {
      setCountdownOverlay(count);
      return;
    }

    if (count === 0) {
      setCountdownOverlay("go");
      return;
    }

    clearInterval(readyCountdownId);
    readyCountdownValue = 0;
    setCountdownOverlay(0);
    if (gameState === "roundOver") currentRound += 1;
    startRound("playing");
  }, 1000);
}

function checkOnlineReadyStart() {
  updateReadyMessage();
  if (gameMode === "online" && onlineRole === "p1" && player1Ready && player2Ready) {
    startReadyCountdown();
  }
}

function handleReadyClick() {
  if (gameMode !== "online") {
    startReadyCountdown();
    return;
  }

  if (!hasPickedOnlineTechnique()) {
    techniqueScreen.classList.remove("hidden");
    message.classList.add("hidden");
    return;
  }

  if (!isReadyPhase()) return;
  if (roundEnding || playerRounds >= WINS_TO_MATCH || enemyRounds >= WINS_TO_MATCH || readyCountdownValue > 0) return;
  console.log("[ready click]", { role: onlineRole || "local", gameState, round: currentRound });
  if (onlineRole === "p1") {
    setReadyFlags(true, player2Ready, "p1 clicked");
    sendOnlineReady();
    checkOnlineReadyStart();
  } else if (onlineRole === "p2") {
    setReadyFlags(player1Ready, true, "p2 clicked");
    sendOnlineReady();
    updateReadyMessage();
  } else {
    startReadyCountdown();
  }
}

function syncOnlineRoundMessage() {
  if (gameMode !== "online" || onlineRole === "p1") return;
  if (!hasPickedOnlineTechnique() || !techniqueScreen.classList.contains("hidden")) return;
  if (gameState === "playing") {
    if (!roundEnding && readyCountdownValue <= 0) message.classList.add("hidden");
    return;
  }
  if (gameState === "lobby" || gameState === "roundOver") {
    updateReadyMessage();
  }
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function circleOverlapsRect(x, y, radius, rect) {
  const closestX = Math.max(rect.x, Math.min(x, rect.x + rect.w));
  const closestY = Math.max(rect.y, Math.min(y, rect.y + rect.h));
  return Math.hypot(x - closestX, y - closestY) <= radius;
}

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function distancePointToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq <= 0.0001) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
  return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
}

function segmentsIntersect(a, b, c, d) {
  const cross = (p1, p2, p3) => (p3.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p3.y - p1.y);
  const abC = cross(a, b, c);
  const abD = cross(a, b, d);
  const cdA = cross(c, d, a);
  const cdB = cross(c, d, b);
  return abC * abD <= 0 && cdA * cdB <= 0;
}

function distanceSegmentToSegment(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(
    distancePointToSegment(a.x, a.y, c.x, c.y, d.x, d.y),
    distancePointToSegment(b.x, b.y, c.x, c.y, d.x, d.y),
    distancePointToSegment(c.x, c.y, a.x, a.y, b.x, b.y),
    distancePointToSegment(d.x, d.y, a.x, a.y, b.x, b.y)
  );
}

function lineCapsuleOverlapsRect(x1, y1, x2, y2, radius, rect) {
  if (pointInRect(x1, y1, rect) || pointInRect(x2, y2, rect)) return true;
  const start = { x: x1, y: y1 };
  const end = { x: x2, y: y2 };
  const corners = [
    { x: rect.x, y: rect.y },
    { x: rect.x + rect.w, y: rect.y },
    { x: rect.x + rect.w, y: rect.y + rect.h },
    { x: rect.x, y: rect.y + rect.h }
  ];
  for (let i = 0; i < corners.length; i += 1) {
    const next = corners[(i + 1) % corners.length];
    if (distanceSegmentToSegment(start, end, corners[i], next) <= radius) return true;
  }
  return false;
}

function getRayRectHitDistance(aimVector, maxDistance, radius, rect) {
  if (!rect || maxDistance <= 0) return Infinity;
  const startX = aimVector.origin.x;
  const startY = aimVector.origin.y;
  const endX = startX + aimVector.x * maxDistance;
  const endY = startY + aimVector.y * maxDistance;
  if (!lineCapsuleOverlapsRect(startX, startY, endX, endY, radius, rect)) return Infinity;

  let low = 0;
  let high = maxDistance;
  for (let i = 0; i < 16; i += 1) {
    const mid = (low + high) / 2;
    const midX = startX + aimVector.x * mid;
    const midY = startY + aimVector.y * mid;
    if (lineCapsuleOverlapsRect(startX, startY, midX, midY, radius, rect)) high = mid;
    else low = mid;
  }
  return high;
}

function getTakenDamage(defender, rawDamage) {
  const multiplier = defender.damageTakenMultiplier ?? 1;
  return Math.max(1, Math.ceil(rawDamage * multiplier));
}

function getTakenKnockback(defender, rawKnockback, options = {}) {
  let multiplier = defender.knockbackTakenMultiplier ?? 1;
  if (defender.technique === "shrine" && (options.weak || Math.abs(rawKnockback) <= 12)) multiplier *= SUKUNA_WEAK_KNOCKBACK_MULTIPLIER;
  return rawKnockback * multiplier;
}

function resolvePlatformCollisions(f, prevX, prevY) {
  let landed = false;
  f.onPlatform = false;
  for (const platform of getActivePlatforms()) {
    const prevLeft = prevX;
    const prevRight = prevX + f.w;
    const prevBottom = prevY + f.h;
    const left = f.x;
    const right = f.x + f.w;
    const top = f.y;
    const bottom = f.y + f.h;
    const horizontalOverlap = right > platform.x && left < platform.x + platform.w;

    if (
      f.vy >= 0 &&
      horizontalOverlap &&
      prevBottom <= platform.y + 2 &&
      bottom >= platform.y &&
      top < platform.y
    ) {
      f.y = platform.y - f.h;
      f.vy = 0;
      f.grounded = true;
      f.onPlatform = true;
      f.jumpsUsed = 0;
      landed = true;
      continue;
    }

  }
  return landed;
}

function resetCombo(f) {
  f.comboCount = 0;
  f.comboTimer = 0;
  f.comboChainTimer = 0;
  f.comboLightsUsed = 0;
  f.comboHeavyUsed = false;
  f.lastAttackType = null;
  f.queuedAttack = null;
}

function getMaxComboLights(f) {
  return getPunchHitLimit(f);
}

function getPunchHitLimit(f) {
  return 3;
}

function getOpponent(f) {
  return f === player ? enemy : player;
}

function queuePunchCooldown(f) {
  f.pendingPunchCooldown = true;
  f.comboChainTimer = 0;
  f.queuedAttack = null;
}

function beginPunchCooldown(f) {
  f.pendingPunchCooldown = false;
  f.punchCooldown = Math.max(f.punchCooldown || 0, PUNCH_COOLDOWN_TICKS);
  resetCombo(f);
}

function normalizeDodgeVector(x, y) {
  if (!x && !y) return null;
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

function getVectorFromInput(input) {
  return normalizeDodgeVector((input.right ? 1 : 0) - (input.left ? 1 : 0), (input.down ? 1 : 0) - (input.up ? 1 : 0));
}

function getPlayerDodgeVector() {
  return getVectorFromInput({
    left: isPressed("a", "keya"),
    right: isPressed("d", "keyd"),
    up: isPressed(" ", "space"),
    down: isPressed("s", "keys")
  });
}

function getRivalDodgeVector() {
  return getVectorFromInput({
    left: isPressed("arrowleft"),
    right: isPressed("arrowright"),
    up: isPressed("arrowup"),
    down: isPressed("arrowdown")
  });
}

function canChainAttack(f, type) {
  if (f.punchCooldown > 0 || f.pendingPunchCooldown) return false;
  if (f.comboTimer <= 0 || f.comboChainTimer <= 0 || f.lastAttackType !== "light") return false;
  if (type === "light") return f.comboLightsUsed < getMaxComboLights(f);
  if (type === "heavy") return !f.comboHeavyUsed;
  return false;
}

function isBarrageActive(f) {
  return Boolean(f && f.barrageTimer > 0);
}

function isGrabThrowActive(f) {
  return Boolean(f && f.grabThrowTimer > 0);
}

function isHeldBySpecial(f) {
  return Boolean(f && ((f.barrageHeldTimer || 0) > 0 || (f.grabHeldTimer || 0) > 0));
}

function isSpecialLocked(f) {
  const owner = getFighterOwner(f);
  const clashing = Boolean(owner && domainClash?.attempts?.[owner]);
  return isBarrageActive(f) || isGrabThrowActive(f) || isHeldBySpecial(f) || isUltimateLocked(f) || (f?.domainStartup || 0) > 0 || clashing;
}

function getMoveInputForFighter(f) {
  if (f === player) return (isPressed("d", "keyd") ? 1 : 0) - (isPressed("a", "keya") ? 1 : 0);
  if (gameMode === "cpu" && f === enemy) return Math.sign(enemy.vx) || enemy.dir;
  if (gameMode === "online" && onlineRole === "p1") return (remoteInput.right ? 1 : 0) - (remoteInput.left ? 1 : 0);
  if (gameMode === "online" && onlineRole === "p2") {
    const input = getOnlineInput();
    return (input.right ? 1 : 0) - (input.left ? 1 : 0);
  }
  if (gameMode === "pvp") return (isPressed("arrowright") ? 1 : 0) - (isPressed("arrowleft") ? 1 : 0);
  return 0;
}

function isMovingTowardOpponent(f) {
  const move = getMoveInputForFighter(f);
  return move !== 0 && move === f.dir;
}

function hasBackThrowButtonsHeld(f) {
  const recentComboPress = frame - (f.lastLightPressTick || -999) <= BACK_THROW_INPUT_BUFFER_TICKS &&
    frame - (f.lastHeavyPressTick || -999) <= BACK_THROW_INPUT_BUFFER_TICKS;
  if (recentComboPress) return true;
  if (f === player || (gameMode === "online" && onlineRole === "p2" && f === enemy)) {
    return isPressed("w", "keyw") && isPressed("e", "keye");
  }
  if (gameMode === "pvp" && f === enemy) return isPressed("n", "keyn") && isPressed("m", "keym");
  return true;
}

function noteAttackButtonPress(f, type) {
  if (!f) return;
  if (type === "light") f.lastLightPressTick = frame;
  if (type === "heavy") f.lastHeavyPressTick = frame;
}

function expandRect(rect, pad) {
  return {
    x: rect.x - pad,
    y: rect.y - pad,
    w: rect.w + pad * 2,
    h: rect.h + pad * 2
  };
}

function hasIncomingThreatNearFighter(f) {
  const opponent = getOpponent(f);
  if (!f || !opponent || opponent.ko) return false;
  if (opponent.attacking && !opponent.hasHit) {
    const attack = getAttackSpec(opponent);
    if (attack) {
      const dangerStart = Math.max(0, attack.windup - 7);
      const dangerEnd = attack.windup + attack.active + 5;
      if (
        opponent.attackFrame >= dangerStart &&
        opponent.attackFrame <= dangerEnd &&
        rectsOverlap(expandRect(getHitbox(opponent), 28), expandRect(f, 18))
      ) {
        return true;
      }
    }
  }
  const center = getFighterCenter(f);
  return projectiles.some((projectile) => {
    if (projectile.visualOnly || projectile.hit) return false;
    const incomingOwner = f === player ? "enemy" : "player";
    if (projectile.owner !== incomingOwner) return false;
    const nextX = projectile.x + (projectile.vx || projectile.aimX || projectile.dir || 0) * 8;
    const nextY = projectile.y + (projectile.vy || projectile.aimY || 0) * 8;
    const radius = (projectile.radius || 16) + 40;
    return distancePointToSegment(center.x, center.y, projectile.x, projectile.y, nextX, nextY) <= radius;
  });
}

function canStartBackThrow(f, target, requireButtons = true) {
  if (!target || gameOver || paused || isSpecialLocked(f) || f.rctHealing || f.chargingTechnique || f.fugaAiming || f.stun > 0 || f.dodging > 0 || f.knockdown || f.ko || f.punchCooldown > 0) return false;
  if (f.attacking && (f.attacking === "backThrow" || f.hasHit || f.attackFrame > BACK_THROW_CANCEL_WINDOW)) return false;
  if (!isMovingTowardOpponent(f)) return false;
  if (requireButtons && !hasBackThrowButtonsHeld(f)) return false;
  if (target.ko || target.dodging > 0 || (target.knockdown && target.grounded)) return false;
  const fCenter = getFighterCenter(f);
  const targetCenter = getFighterCenter(target);
  if (Math.abs(fCenter.x - targetCenter.x) > BACK_THROW_RANGE) return false;
  if (Math.abs(fCenter.y - targetCenter.y) > 54) return false;
  return true;
}

function startBackThrow(f, requireButtons = true) {
  const target = getOpponent(f);
  if (!canStartBackThrow(f, target, requireButtons)) return false;
  f.attacking = "backThrow";
  f.attackFrame = 0;
  f.hasHit = false;
  f.queuedAttack = null;
  f.pendingPunchCooldown = false;
  f.blocking = false;
  f.vx *= 0.25;
  return true;
}

function beginAttack(f, type) {
  f.attacking = type;
  f.attackFrame = 0;
  f.hasHit = false;
  f.blocking = false;
  if (type === "heavy") queuePunchCooldown(f);
  if (f.technique === "shrine" && f.grounded) {
    f.vx += f.dir * (type === "heavy" ? 0.75 : 1.05);
  }
}

function startAttack(f, type) {
  if (gameOver || isSpecialLocked(f) || f.rctHealing || f.chargingTechnique || f.fugaAiming || f.stun > 0 || f.dodging > 0 || f.knockdown || f.punchCooldown > 0 || f.pendingPunchCooldown) return;
  if (f.attacking) {
    if (f.hasHit && canChainAttack(f, type)) f.queuedAttack = type;
    return;
  }
  if (f.comboTimer <= 0) resetCombo(f);
  if (f.comboTimer > 0 && f.lastAttackType && !canChainAttack(f, type)) resetCombo(f);
  beginAttack(f, type);
}

function startDodge(f, inputVector = null) {
  if (gameOver || isSpecialLocked(f) || f.dodging > 0 || f.dodgeCooldown > 0 || f.stun > 0 || f.attacking || f.chargingTechnique || f.fugaAiming || f.knockdown) return;
  const perfectDodge = hasIncomingThreatNearFighter(f);
  const vector = inputVector || { x: -f.dir, y: 0 };
  const dodgeSpeed = 14.5;
  f.dodging = f.technique === "limitless" ? 18 : 24;
  f.dodgeCooldown = f.technique === "limitless" ? Math.round(DODGE_COOLDOWN_TICKS * 0.78) : DODGE_COOLDOWN_TICKS;
  f.blocking = false;
  f.vx = vector.x * dodgeSpeed;
  if (vector.y) {
    f.vy = vector.y * dodgeSpeed * 0.86;
    f.grounded = false;
    f.onPlatform = false;
  }
  if (perfectDodge) {
    const center = getFighterCenter(f);
    gainUltimate(f, ULT_PERFECT_DODGE_GAIN);
    spawnHitSpark(center.x, center.y, -f.dir, "blue");
  }
}

function startDash(f) {
  if (gameOver || isSpecialLocked(f) || f.dodging > 0 || f.dodgeCooldown > 0 || f.stun > 0 || f.attacking || f.chargingTechnique || f.fugaAiming || f.knockdown) return;
  f.dodging = f.technique === "limitless" ? 10 : 14;
  f.dodgeCooldown = f.technique === "limitless" ? Math.round(DODGE_COOLDOWN_TICKS * 0.68) : Math.round(DODGE_COOLDOWN_TICKS * 0.82);
  f.blocking = false;
  f.vx = f.dir * 12.5;
}

function startKnockout(attacker, defender) {
  if (roundEnding || roundResolved) return;
  gameOver = true;
  roundEnding = true;
  koWinner = attacker === player ? "player" : "enemy";

  defender.health = 0;
  defender.ko = true;
  defender.lying = false;
  defender.koRotation = 0;
  defender.koFallDir = attacker.dir;
  defender.dir = -attacker.dir;
  defender.koTimer = 0;
  defender.attacking = null;
  defender.blocking = false;
  cancelRct(defender, false);
  defender.dodging = 0;
  defender.stun = 90;
  defender.hurt = 24;
  defender.vx = attacker.dir * 10.5;
  defender.vy = -13.5;
  defender.grounded = false;
  updateHud();
}

function jumpEnemy() {
  if (gameOver || enemy.stun > 0 || enemy.dodging > 0 || enemy.attacking || enemy.knockdown || !enemy.grounded) return;
  enemy.vy = -14.5;
  enemy.grounded = false;
  enemy.jumpsUsed = 1;
  enemy.vx = enemy.dir * enemy.speed * 1.18;
}

function enemyAirHop() {
  if (gameOver || enemy.stun > 0 || enemy.dodging > 0 || enemy.attacking || enemy.knockdown || enemy.jumpsUsed >= 2) return;
  enemy.vy = -5.4;
  enemy.jumpsUsed = 2;
  enemy.vx = enemy.dir * enemy.speed * 2.25;
}

function jumpFighterWithMove(f, moveDir) {
  if (gameOver || paused || f.stun > 0 || f.dodging > 0 || f.knockdown) return;

  if (f.grounded) {
    f.vy = NORMAL_JUMP_VELOCITY;
    f.grounded = false;
    f.jumpsUsed = 1;
    if (moveDir !== 0) {
      const jumpingAway = moveDir === -f.dir;
      f.vx = moveDir * f.speed * (jumpingAway ? 0.86 : 1.05);
    }
    return;
  }

  if (f.jumpsUsed < 2) {
    f.vy = -9.2;
    f.jumpsUsed = 2;
    const airDir = moveDir || Math.sign(f.vx) || f.dir;
    const jumpingAway = airDir === -f.dir;
    f.vx = airDir * f.speed * (jumpingAway ? 2.92 : 3.35);
  }
}

function canStartTechnique(f) {
  return !(gameOver || paused || hasCtLock(f) || isSpecialLocked(f) || f.rctHealing || f.stun > 0 || f.techniqueCooldown > 0 || f.ko || f.knockdown || f.blocking || isHoldingShield(f));
}

function startTechniqueCharge(f, slot, aimPoint = null) {
  if (!canStartTechnique(f) || f.chargingTechnique) return;
  const move = getTechniqueMoveKey(f, slot);
  if (hasCtLock(f) || f.ce < getTechniqueCost(f, move)) return;
  f.chargingTechnique = slot;
  f.chargeTicks = 0;
  f.cpuTechniqueReleaseTicks = 0;
  if (aimPoint) setFighterTechniqueAim(f, aimPoint);
  else f.techniqueAim = null;
  f.blocking = false;
  f.vx *= 0.55;
}

function releaseTechniqueCharge(f, slot, aimPoint = null) {
  if (f.chargingTechnique !== slot) return;
  const move = getTechniqueMoveKey(f, slot);
  const chargeRatio = f.technique === "limitless" ? getAffordableChargeRatio(f, move, getTechniqueChargeRatio(f)) : 0;
  const finalAim = setFighterTechniqueAim(f, aimPoint || f.techniqueAim) || f.techniqueAim;
  f.chargingTechnique = 0;
  f.chargeTicks = 0;
  f.cpuTechniqueReleaseTicks = 0;
  f.techniqueAim = null;
  if (chargeRatio < 0 || f.ko) return;
  startTechnique(f, slot, chargeRatio, finalAim, true);
}

function useTechniqueInput(f, slot, aimPoint = null) {
  startTechniqueCharge(f, slot, aimPoint);
}

function releaseTechniqueInput(f, slot, aimPoint = null) {
  releaseTechniqueCharge(f, slot, aimPoint);
}

function canPrepareTeleport(f) {
  return Boolean(
    f &&
    f.technique === "limitless" &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !hasCtLock(f) &&
    !f.ko &&
    !f.knockdown &&
    f.stun <= 0 &&
    f.dodging <= 0 &&
    !f.attacking &&
    (f.teleportCooldown || 0) <= 0 &&
    f.ce >= getGojoTeleportCost(f)
  );
}

function getTeleportDestination(f, aimPoint = null) {
  const origin = getFighterCenter(f);
  const aim = sanitizeAimPoint(aimPoint) || sanitizeAimPoint(f.techniqueAim) || { x: origin.x + f.dir * GOJO_TELEPORT_RANGE, y: origin.y };
  let dx = aim.x - origin.x;
  let dy = aim.y - origin.y;
  const distance = Math.hypot(dx, dy);
  if (distance > GOJO_TELEPORT_RANGE) {
    dx = dx / distance * GOJO_TELEPORT_RANGE;
    dy = dy / distance * GOJO_TELEPORT_RANGE;
  }
  const centerX = Math.max(32 + f.w / 2, Math.min(STAGE_W - 32 - f.w / 2, origin.x + dx));
  const centerY = Math.max(68, Math.min(GROUND - f.h / 2, origin.y + dy));
  return { x: centerX, y: centerY };
}

function resolveTeleportLanding(f) {
  f.grounded = false;
  f.onPlatform = false;
  for (const platform of getActivePlatforms()) {
    if (!rectsOverlap(f, platform)) continue;
    const fighterCenter = getFighterCenter(f);
    const platformCenter = { x: platform.x + platform.w / 2, y: platform.y + platform.h / 2 };
    if (fighterCenter.y < platformCenter.y) {
      f.y = platform.y - f.h;
      f.grounded = true;
      f.onPlatform = true;
    }
  }
  if (f.y + f.h >= GROUND) {
    f.y = GROUND - f.h;
    f.grounded = true;
    f.onPlatform = false;
  }
  f.x = clampStageX(f.x, f.w);
}

function prepareTeleport(f, aimPoint = null) {
  if (!canPrepareTeleport(f)) return false;
  f.chargingTechnique = 0;
  f.chargeTicks = 0;
  f.cpuTechniqueReleaseTicks = 0;
  f.techniqueAim = sanitizeAimPoint(aimPoint);
  f.teleportAiming = true;
  mouseTechniqueHeld.teleport = f === getActiveMouseTechniqueFighter();
  return true;
}

function performTeleport(f, aimPoint = null) {
  if (!f) return false;
  const teleportCost = getGojoTeleportCost(f);
  const canTeleport = canPrepareTeleport(f) || (f.teleportAiming && f.technique === "limitless" && !hasCtLock(f) && !f.ko && f.ce >= teleportCost);
  f.teleportAiming = false;
  if (!canTeleport) return false;
  const start = getFighterCenter(f);
  const destination = getTeleportDestination(f, aimPoint);
  f.x = destination.x - f.w / 2;
  f.y = destination.y - f.h / 2;
  resolveTeleportLanding(f);
  f.vx = 0;
  f.vy = 0;
  f.ce = Math.max(0, f.ce - teleportCost);
  f.teleportCooldown = GOJO_TELEPORT_COOLDOWN_TICKS;
  f.techniqueAim = null;
  spawnTeleportEffect(start, { x: f.x + f.w / 2, y: f.y + f.h / 2 }, f.dir);
  spawnHitSpark(start.x, start.y, f.dir, "blue");
  spawnHitSpark(f.x + f.w / 2, f.y + f.h / 2, f.dir, "blue");
  updateHud();
  return true;
}

function canPrepareFuga(f) {
  return Boolean(
    f &&
    f.technique === "shrine" &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !hasCtLock(f) &&
    !f.rctHealing &&
    !f.ko &&
    !f.knockdown &&
    f.stun <= 0 &&
    f.dodging <= 0 &&
    !f.attacking &&
    !f.blocking &&
    !isHoldingShield(f) &&
    (f.fugaCooldown || 0) <= 0 &&
    f.ce >= getTechniqueCost(f, "fuga")
  );
}

function canMaintainFugaCharge(f) {
  return Boolean(
    f &&
    f.technique === "shrine" &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !hasCtLock(f) &&
    !f.rctHealing &&
    !f.ko &&
    !f.blocking &&
    !isHoldingShield(f) &&
    (f.fugaCooldown || 0) <= 0 &&
    f.ce >= getTechniqueCost(f, "fuga")
  );
}

function prepareFuga(f, aimPoint = null) {
  if (!canPrepareFuga(f)) return false;
  f.chargingTechnique = 0;
  f.chargeTicks = 0;
  f.cpuTechniqueReleaseTicks = 0;
  f.techniqueAim = sanitizeAimPoint(aimPoint);
  f.fugaAiming = true;
  f.fugaChargeTicks = 0;
  mouseTechniqueHeld.fuga = f === getActiveMouseTechniqueFighter();
  return true;
}

function canReleaseChargedTechnique(f) {
  return Boolean(
    f &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !hasCtLock(f) &&
    !f.rctHealing &&
    !f.ko &&
    f.techniqueCooldown <= 0 &&
    !f.blocking &&
    !isHoldingShield(f)
  );
}

function startTechnique(f, slot, chargeRatio = 0, aimPoint = null, releasingCharge = false) {
  if (releasingCharge ? !canReleaseChargedTechnique(f) : !canStartTechnique(f)) return;
  const move = getTechniqueMoveKey(f, slot);
  const spec = techniqueMoves[move];
  const finalCharge = f.technique === "limitless" ? Math.max(0, Math.min(1, chargeRatio)) : 0;
  const cost = getChargedTechniqueCost(f, move, finalCharge);
  if (!spec || f.ce < cost) return;
  const aimVector = getTechniqueAimVector(f, move, aimPoint);
  if (Math.abs(aimVector.x) > 0.08) f.dir = aimVector.dir;

  f.ce -= cost;
  f.techniqueCooldown = getTechniqueCooldownTicks(move);
  if (isDomainOwner(f, "malevolentShrine")) f.techniqueCooldown = Math.max(8, Math.ceil(f.techniqueCooldown * 0.55));
  f.techniqueCooldownMax = f.techniqueCooldown;
  const chargedLimitless = f.technique === "limitless";
  const voidBoost = isDomainOwner(f, "unlimitedVoid");
  const shrineBoost = isDomainOwner(f, "malevolentShrine");
  const domainRadiusBoost = voidBoost && move === "red" ? 1.45 : voidBoost && move === "blue" ? 1.18 : shrineBoost && move === "cleave" ? 1.2 : 1;
  const radiusScale = (chargedLimitless ? 1 + finalCharge * (move === "red" ? 0.95 : 0.85) : 1) * domainRadiusBoost;
  const finalRadius = spec.radius * radiusScale;
  const previewDistance = getAimPreviewDistance(move, spec, finalCharge, aimVector, f, finalRadius);
  const spawnOffset = move === "cleave" ? previewDistance : Math.min(36, Math.max(0, previewDistance - 6));
  const travelDistance = Math.max(0, previewDistance - spawnOffset);
  const damageScale = (chargedLimitless ? 1 + finalCharge * (move === "red" ? 1.45 : 1.25) : 1) * (voidBoost ? 1.28 : shrineBoost ? 1.12 : 1);
  const knockbackScale = (chargedLimitless ? 1 + finalCharge * (move === "red" ? 1.25 : 1.08) : 1) * (move === "red" ? 1.28 : move === "blue" ? 1.32 : 1) * (voidBoost && move === "blue" ? 1.9 : voidBoost ? 1.32 : shrineBoost ? 1.16 : 1);
  projectiles.push({
    owner: f === player ? "player" : "enemy",
    move,
    x: aimVector.origin.x + aimVector.x * spawnOffset,
    y: aimVector.origin.y + aimVector.y * spawnOffset,
    vx: aimVector.x * spec.speed,
    vy: aimVector.y * spec.speed,
    baseVx: aimVector.x * spec.speed,
    baseVy: aimVector.y * spec.speed,
    radius: finalRadius,
    damage: Math.ceil(spec.damage * damageScale * getOutgoingDamageMultiplier(f)),
    knockback: spec.knockback * knockbackScale,
    dir: aimVector.dir,
    aimX: aimVector.x,
    aimY: aimVector.y,
    angle: aimVector.angle,
    rangeStartX: aimVector.origin.x,
    rangeStartY: aimVector.origin.y,
    rangeEndX: aimVector.origin.x + aimVector.x * previewDistance,
    rangeEndY: aimVector.origin.y + aimVector.y * previewDistance,
    rangeRadius: move === "cleave" ? Math.max(20, spec.radius * 0.55) : finalRadius,
    maxTravel: move === "cleave" ? Infinity : travelDistance,
    traveled: 0,
    life: spec.life + (chargedLimitless ? Math.round(finalCharge * 10) : 0) + (shrineBoost && move === "slash" ? 34 : 0),
    charge: finalCharge,
    hit: false
  });
  updateHud();
}

function startFuga(f, aimPoint = null) {
  if (!f || f.technique !== "shrine") return false;
  const move = "fuga";
  const spec = techniqueMoves.fuga;
  const cost = getTechniqueCost(f, move);
  const canReleaseAimedFuga = f.fugaAiming &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !f.rctHealing &&
    !f.ko &&
    !f.blocking &&
    !isHoldingShield(f) &&
    (f.fugaCooldown || 0) <= 0 &&
    f.ce >= cost &&
    (f.fugaChargeTicks || 0) >= FUGA_CHARGE_TICKS;
  const canFuga = canReleaseAimedFuga;
  f.fugaAiming = false;
  if (!canFuga || !spec || f.ce < cost) {
    f.fugaChargeTicks = 0;
    return false;
  }

  const aimVector = getTechniqueAimVector(f, move, aimPoint || f.techniqueAim);
  if (Math.abs(aimVector.x) > 0.08) f.dir = aimVector.dir;

  f.ce = Math.max(0, f.ce - cost);
  f.fugaCooldown = getTechniqueCooldownTicks(move);
  if (isDomainOwner(f, "malevolentShrine")) f.fugaCooldown = Math.max(90, Math.ceil(f.fugaCooldown * 0.65));
  f.fugaCooldownMax = f.fugaCooldown;
  f.chargingTechnique = 0;
  f.chargeTicks = 0;
  f.fugaChargeTicks = 0;
  f.cpuTechniqueReleaseTicks = 0;
  f.techniqueAim = null;
  f.blocking = false;
  f.vx *= 0.35;

  const previewDistance = getAimPreviewDistance(move, spec, 0, aimVector, f, spec.radius);
  const spawnDistance = Math.min(48, Math.max(0, previewDistance - 8));
  const travelDistance = Math.max(0, previewDistance - spawnDistance);
  projectiles.push({
    x: aimVector.origin.x + aimVector.x * spawnDistance,
    y: aimVector.origin.y + aimVector.y * spawnDistance,
    vx: aimVector.x * spec.speed,
    vy: aimVector.y * spec.speed,
    owner: f === player ? "player" : "enemy",
    move,
    radius: spec.radius,
    explosionRadius: spec.explosionRadius,
    damage: Math.ceil(spec.damage * getOutgoingDamageMultiplier(f)),
    knockback: spec.knockback,
    dir: aimVector.dir,
    aimX: aimVector.x,
    aimY: aimVector.y,
    angle: aimVector.angle,
    rangeStartX: aimVector.origin.x,
    rangeStartY: aimVector.origin.y,
    rangeEndX: aimVector.origin.x + aimVector.x * previewDistance,
    rangeEndY: aimVector.origin.y + aimVector.y * previewDistance,
    maxTravel: travelDistance,
    traveled: 0,
    life: spec.life,
    hit: false
  });
  spawnHitSpark(aimVector.origin.x + aimVector.x * 18, aimVector.origin.y + aimVector.y * 18, aimVector.dir, "fuga");
  updateHud();
  return true;
}

function canShield(f) {
  return !isSpecialLocked(f) && f.grounded && f.dodging <= 0 && !f.attacking && !f.rctHealing && !f.knockdown && f.stun <= 0 && f.shieldCooldown <= 0 && f.shieldTicks > 0 && !f.ko;
}

function getShieldMaxTicks(f) {
  return f?.technique === "shrine" ? SUKUNA_SHIELD_MAX_TICKS : SHIELD_MAX_TICKS;
}

function getShieldCooldownTicks(f) {
  return SHIELD_COOLDOWN_TICKS;
}

function isBlockingAttack(defender, incomingDir) {
  if (!defender.blocking) return false;
  return defender.shieldTicks > 0;
}

function breakShield(defender) {
  if (!defender) return;
  defender.shieldTicks = 0;
  defender.blocking = false;
  defender.shieldCooldown = getShieldCooldownTicks(defender);
  defender.shieldHitFlash = 0;
  spawnShieldBreakEffect(defender);
}

function damageShield(defender, rawPower) {
  if (!defender?.blocking) return;
  const drainMultiplier = defender.technique === "shrine" ? 3.2 : 4.2;
  defender.shieldTicks = Math.max(0, defender.shieldTicks - Math.ceil(rawPower * drainMultiplier + 10));
  defender.shieldHitFlash = 8;
  if (defender.shieldTicks <= 0) {
    breakShield(defender);
  }
}

function canMaintainShield(f) {
  return Boolean(
    f &&
    f.blocking &&
    f.grounded &&
    f.dodging <= 0 &&
    !f.attacking &&
    !f.rctHealing &&
    !f.knockdown &&
    !f.ko &&
    f.shieldTicks > 0
  );
}

function setShielding(f, wantsShield) {
  if (!wantsShield) {
    f.blocking = false;
    return;
  }
  f.blocking = canMaintainShield(f) || canShield(f);
}

function updateShield(f) {
  const shieldMax = getShieldMaxTicks(f);
  if (f.blocking) {
    f.shieldTicks = Math.max(0, f.shieldTicks - 1);
    if (f.shieldTicks <= 0) {
      breakShield(f);
    }
    return;
  }

  if (f.shieldCooldown > 0) {
    f.shieldCooldown -= 1;
    if (f.shieldCooldown <= 0) f.shieldTicks = shieldMax;
  } else if (f.shieldTicks < shieldMax) {
    f.shieldTicks = Math.min(shieldMax, f.shieldTicks + 2);
  } else if (f.shieldTicks > shieldMax) {
    f.shieldTicks = shieldMax;
  }
}

function isInfinityActive(f) {
  return Boolean(f && f.infinityActive && f.technique === "limitless" && f.ce > 0 && !f.ko);
}

function toggleInfinity(f) {
  if (!f || f.technique !== "limitless") return;
  if (f.infinityActive) {
    f.infinityActive = false;
    updateHud();
    return;
  }
  if (gameOver || paused || f.ko || f.knockdown || f.stun > 0 || f.ce < INFINITY_MIN_CE || f.blocking || isHoldingShield(f)) return;
  f.infinityActive = true;
  f.infinityPulse = 0;
  f.ce = Math.max(0, f.ce - INFINITY_TOGGLE_COST);
  f.blocking = false;
  updateHud();
}

function updateInfinity(f) {
  if (!f.infinityActive) return;
  if (f.technique !== "limitless" || f.ko || f.blocking || isHoldingShield(f)) {
    f.infinityActive = false;
    return;
  }
  f.infinityPulse = (f.infinityPulse + 1) % 360;
  f.ce = Math.max(0, f.ce - INFINITY_CE_DRAIN);
  if (f.ce <= 0) f.infinityActive = false;
}

function getRctCooldownTicks(f) {
  return RCT_COOLDOWN_TICKS[f.technique] || RCT_COOLDOWN_TICKS.shrine;
}

function getRctCeCostPerTick(f) {
  const costRatio = RCT_CE_COST_RATIO_PER_SECOND[f.technique] || RCT_CE_COST_RATIO_PER_SECOND.shrine;
  return f.maxCe * costRatio / 60;
}

function getRctHealPerTick(f) {
  const barCount = Math.max(1, Math.round(f.healthBars || 1));
  const currentBarHealth = f.maxHealth / barCount;
  const healRatio = RCT_HEAL_BAR_RATIO_PER_SECOND[f.technique] || RCT_HEAL_BAR_RATIO_PER_SECOND.shrine;
  return currentBarHealth * healRatio / 60;
}

function canStartRct(f) {
  if (!f || gameOver || paused || isSpecialLocked(f) || f.ko || f.knockdown || f.dodging > 0) return false;
  if (f.health >= getCurrentHealthBarCeiling(f) || f.rctCooldown > 0) return false;
  return f.ce >= f.maxCe * RCT_MIN_CE_RATIO;
}

function cancelRct(f, startCooldown = true) {
  if (!f) return;

  const wasHealing = Boolean(f.rctHealing || f.rctActive || f.rctHolding);

  f.rctHealing = false;
  f.rctActive = false;
  f.rctHolding = false;
  f.rctTicks = 0;

  if (startCooldown && wasHealing) {
    f.rctCooldown = Math.max(f.rctCooldown || 0, RCT_COOLDOWN_TICKS[f.technique] || 180);
  }
}

function setRctHealing(f, wantsRct) {
  if (!wantsRct) {
    cancelRct(f, true);
    return;
  }
  if (f.rctHealing || canStartRct(f)) {
    f.rctHealing = true;
    f.blocking = false;
  }
}

function getCurrentHealthBarCeiling(f) {
  const bars = Math.max(1, Number(f.healthBars) || 1);
  const barSize = f.maxHealth / bars;
  const currentHealth = Math.max(0.001, Number(f.health) || 0.001);
  return Math.min(f.maxHealth, Math.ceil(currentHealth / barSize) * barSize);
}

function updateRct(f) {
  if (!f.rctHealing) return;

  const currentBarCeiling = getCurrentHealthBarCeiling(f);

  if (f.ko || f.health >= currentBarCeiling || f.ce <= 0) {
    cancelRct(f, true);
    return;
  }

  const ceCost = getRctCeCostPerTick(f);
  const affordable = ceCost > 0 ? Math.min(1, f.ce / ceCost) : 1;

  f.ce = Math.max(0, f.ce - ceCost);
  f.health = Math.min(currentBarCeiling, f.health + getRctHealPerTick(f) * affordable);
  f.delayedHealth = Math.max(f.delayedHealth || f.health, f.health);

  if (f.ce <= 0 || f.health >= currentBarCeiling) {
    cancelRct(f, true);
  }
}

function isHoldingShield(f) {
  if (f === player) return isPressed("q", "keyq");
  if (gameMode === "pvp") return isPressed("p", "keyp");
  if (gameMode === "online" && onlineRole === "p2") return isPressed("q", "keyq");
  if (gameMode === "online") return remoteInput.block;
  return false;
}

function jumpControlledFighter(f, leftKeys, rightKeys) {
  const moveDir = (isPressed(...rightKeys) ? 1 : 0) - (isPressed(...leftKeys) ? 1 : 0);
  jumpFighterWithMove(f, moveDir);
}

function jumpPlayer() {
  jumpControlledFighter(player, ["a", "keya"], ["d", "keyd"]);
}

function jumpRivalPlayer() {
  jumpControlledFighter(enemy, ["arrowleft"], ["arrowright"]);
}

function getHitbox(f) {
  const attack = getAttackSpec(f);
  return {
    x: f.dir > 0 ? f.x + f.w - 8 : f.x - attack.range,
    y: f.y + 28,
    w: attack.width,
    h: attack.height
  };
}

function getComboDamageScale(attacker) {
  const decay = attacker.technique === "shrine" ? 0.07 : 0.09;
  return Math.max(0.62, 1 - attacker.comboCount * decay);
}

function getComboHitstun(attacker, type, blocked) {
  if (blocked) return 5;
  const base = type === "heavy" ? 24 : attacker.technique === "shrine" ? 16 : 15;
  const minimum = type === "heavy" ? 12 : 8;
  return Math.max(minimum, base - attacker.comboCount * 2);
}

function registerComboHit(attacker, type) {
  attacker.comboCount += 1;
  attacker.comboTimer = COMBO_RESET_TICKS;
  attacker.comboChainTimer = type === "light"
    ? COMBO_CHAIN_WINDOW + (attacker.technique === "shrine" ? 5 : attacker.technique === "limitless" ? 2 : 0)
    : 0;
  attacker.lastAttackType = type;
  if (type === "light") attacker.comboLightsUsed += 1;
  if (type === "heavy") attacker.comboHeavyUsed = true;
  if (attacker.comboCount >= 2) gainUltimate(attacker, ULT_COMBO_GAIN + (type === "heavy" ? 2 : 0));
}

function gainCe(f, amount) {
  f.ce = Math.min(f.maxCe, f.ce + amount);
}

function gainUltimate(f, amount) {
  if (!f || f.ko || isPracticeDummy(f)) return;
  f.ultimateMeter = Math.max(0, Math.min(MAX_ULTIMATE, (f.ultimateMeter || 0) + amount));
}

function drainBlockingUltimate(f) {
  if (!f || f.ultimateMeter <= 0) return;
  if (f.blocking || isHoldingShield(f)) {
    f.ultimateMeter = Math.max(0, f.ultimateMeter - ULT_BLOCK_DRAIN_PER_TICK);
  }
}

function isUltimateLocked(f) {
  return Boolean(f && ((f.ultimateAiming || false) || (f.ultimateFinalCharge || 0) > 0 || (f.ultimateStartup || 0) > 0 || (f.ultimateRecovery || 0) > 0));
}

function canStartUltimate(f) {
  return Boolean(
    f &&
    f.ultimateMeter >= MAX_ULTIMATE &&
    gameState === "playing" &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !f.ko &&
    !f.knockdown &&
    !f.rctHealing &&
    !f.chargingTechnique &&
    !f.fugaAiming &&
    !f.teleportAiming &&
    !f.blocking &&
    !isHoldingShield(f) &&
    f.stun <= 0 &&
    f.dodging <= 0 &&
    !f.attacking &&
    !f.ultimateAiming &&
    (f.ultimateFinalCharge || 0) <= 0
  );
}

function playUltimateChargeSound(kind) {
  const audio = getAudioContext();
  if (!audio) return;
  const now = audio.currentTime;
  if (kind === "hollowPurple") {
    scheduleTone(audio, now, 92, 0.32, "sawtooth", 0.16, 420);
    scheduleTone(audio, now + 0.16, 196, 0.44, "triangle", 0.13, 900);
    scheduleTone(audio, now + 0.34, 392, 0.38, "sine", 0.12, 1800);
  } else {
    scheduleTone(audio, now, 70, 0.22, "square", 0.14, 360);
    scheduleTone(audio, now + 0.11, 118, 0.28, "sawtooth", 0.12, 520);
    scheduleTone(audio, now + 0.25, 54, 0.36, "square", 0.15, 260);
  }
}

function triggerUltimateScreenEffect(kind, ticks) {
  ultimateScreenEffect = { kind, ticks, maxTicks: ticks };
  cinematicZoomTicks = Math.max(cinematicZoomTicks, Math.round(ticks * 0.55));
}

function spawnUltimateChargeEffect(f, kind) {
  const center = getFighterCenter(f);
  ultimateChargeEffects.push({
    owner: f === player ? "player" : "enemy",
    x: center.x,
    y: center.y - 4,
    dir: f.dir,
    kind,
    life: ULT_FINAL_CHARGE_TICKS,
    maxLife: ULT_FINAL_CHARGE_TICKS
  });
}

function startUltimate(f, aimPoint = null) {
  return beginUltimateAim(f, aimPoint);
}


function beginUltimateAim(f, aimPoint = null) {
  if (!canStartUltimate(f)) return false;
  const kind = f.technique === "shrine" ? "worldSlash" : "hollowPurple";
  const aim = sanitizeAimPoint(aimPoint) || sanitizeAimPoint(f.techniqueAim) || mouseAimWorld;
  f.ultimateMove = kind;
  f.ultimateAiming = true;
  f.ultimateAimTicks = 0;
  f.ultimateFinalCharge = 0;
  f.ultimateAimPoint = aim;
  f.ultimateStartup = 0;
  f.ultimateRecovery = 0;
  f.ultimateHasReleased = false;
  f.attacking = null;
  f.attackFrame = 0;
  f.hasHit = false;
  f.queuedAttack = null;
  f.blocking = false;
  f.vx *= 0.35;
  if (aim) setFighterTechniqueAim(f, aim);
  resetCombo(f);
  updateHud();
  return true;
}

function cancelUltimateAim(f) {
  if (!f || !f.ultimateAiming) return;
  f.ultimateAiming = false;
  f.ultimateAimTicks = 0;
  f.ultimateAimPoint = null;
  f.ultimateMove = null;
}

function releaseUltimateAim(f, aimPoint = null) {
  if (!f || !f.ultimateAiming) return false;
  const fullyCharged = (f.ultimateAimTicks || 0) >= ULT_AIM_HOLD_TICKS;
  if (!fullyCharged) {
    cancelUltimateAim(f);
    return false;
  }
  const aim = sanitizeAimPoint(aimPoint) || sanitizeAimPoint(f.ultimateAimPoint) || sanitizeAimPoint(f.techniqueAim) || mouseAimWorld;
  if (aim) setFighterTechniqueAim(f, aim);
  f.ultimateAimPoint = aim;
  f.ultimateAiming = false;
  f.ultimateFinalCharge = 0;
  f.ultimateMeter = 0;
  f.ultimateHasReleased = false;
  f.blocking = false;
  ultimateFocusOwner = getFighterOwner(f);
  cinematicZoomTicks = Math.max(cinematicZoomTicks, 18);
  spawnUltimateChargeEffect(f, f.ultimateMove);
  playUltimateChargeSound(f.ultimateMove);
  releaseUltimate(f);
  updateHud();
  return true;
}

function updateUltimateState(f) {
  if (!f) return;
  if (f.ultimateAiming) {
    f.ultimateAimTicks = Math.min(ULT_AIM_HOLD_TICKS, (f.ultimateAimTicks || 0) + 1);
    f.blocking = false;
    if (f.ultimateAimPoint) setFighterTechniqueAim(f, f.ultimateAimPoint);
    return;
  }
  if ((f.ultimateFinalCharge || 0) > 0) {
    f.ultimateFinalCharge -= 1;
    f.blocking = false;
    f.vx *= 0.48;
    if (f.ultimateAimPoint) setFighterTechniqueAim(f, f.ultimateAimPoint);
    if (f.ultimateFinalCharge <= 0 && !f.ultimateHasReleased) releaseUltimate(f);
    return;
  }
  if (f.ultimateStartup > 0) {
    f.ultimateStartup -= 1;
    f.blocking = false;
    f.vx *= 0.52;
    if (f.ultimateStartup <= 0 && !f.ultimateHasReleased) releaseUltimate(f);
  }
  if (f.ultimateRecovery > 0) {
    f.ultimateRecovery -= 1;
    f.vx *= 0.72;
  }
}

function releaseUltimate(f) {
  f.ultimateHasReleased = true;
  if (f.ultimateMove === "worldSlash") {
    releaseWorldCuttingSlash(f);
  } else {
    releaseHollowPurple(f);
  }
  f.ultimateMove = null;
}

function releaseHollowPurple(f) {
  const center = getFighterCenter(f);
  const aimVector = getTechniqueAimVector(f, "blue", f.ultimateAimPoint || f.techniqueAim);
  if (Math.abs(aimVector.x) > 0.08) f.dir = aimVector.dir;
  const speed = 10.8;
  const radius = 48;
  const origin = { x: center.x + aimVector.x * 54, y: center.y - 14 + aimVector.y * 22 };
  projectiles.push({
    owner: f === player ? "player" : "enemy",
    move: "purple",
    ultimateProjectile: true,
    x: origin.x,
    y: origin.y,
    vx: aimVector.x * speed,
    vy: aimVector.y * speed,
    baseVx: aimVector.x * speed,
    baseVy: aimVector.y * speed,
    radius,
    damage: Math.ceil(HOLLOW_PURPLE_DAMAGE * getOutgoingDamageMultiplier(f)),
    knockback: 43,
    dir: aimVector.dir,
    aimX: aimVector.x,
    aimY: aimVector.y,
    angle: aimVector.angle,
    rangeStartX: origin.x,
    rangeStartY: origin.y,
    rangeEndX: origin.x + aimVector.x * STAGE_W,
    rangeEndY: origin.y + aimVector.y * STAGE_W,
    maxTravel: STAGE_W * 1.05,
    traveled: 0,
    life: 170,
    charge: 1,
    hit: false
  });
  f.ultimateRecovery = HOLLOW_PURPLE_RECOVERY_TICKS;
  f.ultimateAimPoint = null;
  shake = Math.max(shake, 12);
  spawnHitSpark(origin.x, origin.y, aimVector.dir, "purple");
}

function releaseWorldCuttingSlash(f) {
  const center = getFighterCenter(f);
  const aimVector = getTechniqueAimVector(f, "slash", f.ultimateAimPoint || f.techniqueAim);
  if (Math.abs(aimVector.x) > 0.08) f.dir = aimVector.dir;
  const speed = 11.2;
  const radius = 42;
  const origin = { x: center.x + aimVector.x * 48, y: center.y - 8 + aimVector.y * 18 };
  projectiles.push({
    owner: f === player ? "player" : "enemy",
    move: "worldSlash",
    ultimateProjectile: true,
    x: origin.x,
    y: origin.y,
    vx: aimVector.x * speed,
    vy: aimVector.y * speed,
    baseVx: aimVector.x * speed,
    baseVy: aimVector.y * speed,
    radius,
    damage: Math.ceil(WORLD_SLASH_DAMAGE * getOutgoingDamageMultiplier(f)),
    knockback: 44,
    dir: aimVector.dir,
    aimX: aimVector.x,
    aimY: aimVector.y,
    angle: aimVector.angle,
    rangeStartX: origin.x,
    rangeStartY: origin.y,
    rangeEndX: origin.x + aimVector.x * STAGE_W,
    rangeEndY: origin.y + aimVector.y * STAGE_W,
    maxTravel: STAGE_W * 1.05,
    traveled: 0,
    life: 160,
    charge: 1,
    hit: false
  });
  f.ultimateRecovery = WORLD_SLASH_RECOVERY_TICKS;
  f.ultimateAimPoint = null;
  shake = Math.max(shake, 12);
  spawnHitSpark(origin.x, origin.y, aimVector.dir, "slash");
}

function applyWorldSlashHit(attacker, defender, slash) {
  if (!attacker || !defender || defender.ko || defender.dodging > 0) return;
  if (gameMode === "online" && onlineRole === "p1" && attacker === enemy && defender === player) return;
  if (!lineCapsuleOverlapsRect(slash.x1, slash.y1, slash.x2, slash.y2, slash.radius, defender)) return;

  const blocked = isBlockingAttack(defender, attacker.dir);
  const infinityFactor = isInfinityActive(defender) ? 0.82 : 1;
  const baseDamage = blocked ? 0 : Math.ceil(WORLD_SLASH_DAMAGE * infinityFactor);
  const damage = getTakenDamage(defender, baseDamage);
  if (blocked) damageShield(defender, WORLD_SLASH_DAMAGE * 1.35);
  applyFighterDamage(defender, damage);
  cancelRct(defender, false);
  defender.hurt = blocked ? 8 : 24;
  defender.stun = blocked ? 14 : 42;
  if (!blocked) {
    defender.attacking = null;
    defender.attackFrame = 0;
    defender.hasHit = false;
    resetCombo(defender);
    defender.grounded = false;
    defender.knockdown = true;
    defender.knockdownTimer = 32;
    defender.vy = -5.8;
  }
  const knockback = getTakenKnockback(defender, blocked ? 12 : 42);
  defender.vx = attacker.dir * knockback;
  hitStopTicks = Math.max(hitStopTicks, blocked ? HITSTOP_HEAVY : HITSTOP_HEAVY + 4);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 48, attacker.dir, blocked ? "block" : "slash");
  updateHud();

  if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
    sendOnlineDamage({
      damage,
      blocked,
      knockback: Math.abs(knockback),
      dir: attacker.dir,
      aimX: attacker.dir,
      aimY: -0.18,
      stun: defender.stun,
      vy: defender.vy,
      knockdown: defender.knockdown,
      knockdownTimer: defender.knockdownTimer,
      ultimateHit: true,
      playerHealth: defender.health
    });
  }

  if (!pacifistBot && defender.health <= 0) {
    startKnockout(attacker, defender);
  }
}

function spawnGroundErase(x, radius = 86) {
  groundEraseEffects.push({
    x,
    y: GROUND + 3,
    radius,
    life: 42,
    maxLife: 42
  });
}

function getFighterOwner(f) {
  if (f === player) return "player";
  if (f === enemy) return "enemy";
  return null;
}

function getFighterByOwner(owner) {
  if (owner === "player") return player;
  if (owner === "enemy") return enemy;
  return null;
}

function getDomainTypeForFighter(f) {
  return f?.technique === "shrine" ? "malevolentShrine" : "unlimitedVoid";
}

function getDomainDisplayName(type) {
  return type === "malevolentShrine" ? "MALEVOLENT SHRINE" : "UNLIMITED VOID";
}

function hasCtLock(f) {
  return Boolean(f && (f.ctLockTimer || 0) > 0);
}

function isDomainOwner(f, type = null) {
  if (!activeDomain || !f) return false;
  if (type && activeDomain.type !== type) return false;
  return activeDomain.owner === getFighterOwner(f);
}

function isDomainVictim(f, type = null) {
  if (!activeDomain || !f) return false;
  if (type && activeDomain.type !== type) return false;
  return activeDomain.owner !== getFighterOwner(f);
}

function getDomainMovementMultiplier(f) {
  if (isDomainVictim(f, "unlimitedVoid")) return 0.1;
  if (isDomainOwner(f, "unlimitedVoid")) return 1.3;
  if (isDomainOwner(f, "malevolentShrine")) return 1.18;
  return 1;
}

function getDomainJumpMultiplier(f) {
  if (isDomainVictim(f, "unlimitedVoid")) return 0.42;
  if (isDomainOwner(f, "unlimitedVoid")) return 1.08;
  if (isDomainOwner(f, "malevolentShrine")) return 1.08;
  return 1;
}

function getDomainCeRegenMultiplier(f) {
  if (isDomainOwner(f, "unlimitedVoid")) return 2.15;
  if (isDomainOwner(f, "malevolentShrine")) return 1.45;
  return 1;
}

function getCtCostMultiplier(f) {
  if (hasCtLock(f)) return Infinity;
  if (isDomainVictim(f, "unlimitedVoid")) return 2.5;
  if (isDomainOwner(f, "unlimitedVoid")) return 0.62;
  return 1;
}

function getGojoTeleportCost(f) {
  return Math.ceil(GOJO_TELEPORT_COST * getCtCostMultiplier(f));
}

function getDomainAttemptForFighter(f) {
  const owner = getFighterOwner(f);
  if (!owner) return null;
  if (pendingDomain?.owner === owner) return pendingDomain;
  if (domainClash?.attempts?.[owner]) return domainClash.attempts[owner];
  return null;
}

function canStartDomain(f) {
  if (!f || gameState !== "playing" || gameOver || paused || f.ko || f.knockdown || f.stun > 0) return false;
  if (isSpecialLocked(f) || f.attacking || f.dodging > 0 || f.rctHealing || hasCtLock(f)) return false;
  if (activeDomain || domainClash) return false;
  const owner = getFighterOwner(f);
  if (!owner || pendingDomain?.owner === owner) return false;
  if (pendingDomain && frame - (pendingDomain.startFrame || frame) > DOMAIN_CLASH_WINDOW_TICKS) return false;
  return (f.ultimateMeter || 0) >= MAX_ULTIMATE && f.ce >= f.maxCe * DOMAIN_CE_REQUIREMENT_RATIO;
}

function createDomainAttempt(f) {
  const owner = getFighterOwner(f);
  return {
    owner,
    type: getDomainTypeForFighter(f),
    ticks: DOMAIN_STARTUP_TICKS,
    maxTicks: DOMAIN_STARTUP_TICKS,
    startFrame: frame,
    preCe: f.ce,
    preUltimate: f.ultimateMeter
  };
}

function spendDomainCost(f) {
  f.ce = Math.max(0, f.ce - Math.ceil(f.maxCe * DOMAIN_CE_REQUIREMENT_RATIO));
  f.ultimateMeter = 0;
}

function lockFighterForDomainStart(f, type) {
  f.domainStartup = DOMAIN_STARTUP_TICKS;
  f.domainAttemptType = type;
  f.attacking = null;
  f.attackFrame = 0;
  f.hasHit = false;
  f.queuedAttack = null;
  f.blocking = false;
  f.vx *= 0.12;
  resetCombo(f);
}

function startDomainExpansion(f) {
  if (domainClash) return handleDomainClashMash(f);
  if (!canStartDomain(f)) return false;
  const attempt = createDomainAttempt(f);
  spendDomainCost(f);
  lockFighterForDomainStart(f, attempt.type);
  spawnUltimateChargeEffect(f, attempt.type === "malevolentShrine" ? "worldSlash" : "hollowPurple");
  playDomainStartSound(attempt.type);
  triggerUltimateScreenEffect(attempt.type === "malevolentShrine" ? "domainShrine" : "domainVoid", DOMAIN_STARTUP_TICKS);

  if (pendingDomain && pendingDomain.owner !== attempt.owner && frame - pendingDomain.startFrame <= DOMAIN_CLASH_WINDOW_TICKS) {
    startDomainClash(pendingDomain, attempt);
  } else {
    pendingDomain = attempt;
  }
  updateHud();
  return true;
}

function playDomainStartSound(type) {
  const audio = getAudioContext();
  if (!audio) return;
  const now = audio.currentTime;
  scheduleTone(audio, now, type === "malevolentShrine" ? 48 : 64, 0.34, "sawtooth", 0.18, 360);
  scheduleTone(audio, now + 0.18, type === "malevolentShrine" ? 96 : 128, 0.42, "triangle", 0.14, 760);
  scheduleTone(audio, now + 0.42, type === "malevolentShrine" ? 42 : 220, 0.5, "sine", 0.16, 1400);
}

function startDomainClash(first, second) {
  pendingDomain = null;
  domainClash = {
    ticks: DOMAIN_CLASH_TICKS,
    maxTicks: DOMAIN_CLASH_TICKS,
    attempts: {
      [first.owner]: first,
      [second.owner]: second
    },
    playerScore: first.owner === "player" ? 1 : 0,
    enemyScore: first.owner === "enemy" ? 1 : 0,
    lastMashFrame: { player: -999, enemy: -999 }
  };
  const firstFighter = getFighterByOwner(first.owner);
  const secondFighter = getFighterByOwner(second.owner);
  if (firstFighter) lockFighterForDomainStart(firstFighter, first.type);
  if (secondFighter) lockFighterForDomainStart(secondFighter, second.type);
  triggerUltimateScreenEffect("domainClash", DOMAIN_CLASH_TICKS);
  shake = Math.max(shake, 22);
}

function handleDomainClashMash(f) {
  if (!domainClash || !f) return false;
  const owner = getFighterOwner(f);
  if (!owner || !domainClash.attempts?.[owner]) return false;
  if (frame - (domainClash.lastMashFrame?.[owner] || -999) < 3) return true;
  domainClash.lastMashFrame[owner] = frame;
  if (owner === "player") domainClash.playerScore += 1;
  if (owner === "enemy") domainClash.enemyScore += 1;
  spawnHitSpark(f.x + f.w / 2, f.y + 28, f.dir, owner === "player" ? "blue" : "slash");
  return true;
}

function restoreDomainClashLoser(attempt) {
  const loser = getFighterByOwner(attempt.owner);
  if (!loser) return;
  loser.ce = Math.max(loser.ce, attempt.preCe || loser.ce);
  loser.ultimateMeter = Math.max(loser.ultimateMeter || 0, MAX_ULTIMATE * 0.5);
  loser.domainStartup = 0;
  loser.domainAttemptType = null;
  loser.vx *= 0.25;
}

function activateDomainFromAttempt(attempt) {
  const ownerFighter = getFighterByOwner(attempt.owner);
  if (ownerFighter) {
    ownerFighter.domainStartup = 0;
    ownerFighter.domainAttemptType = null;
  }
  activeDomain = {
    owner: attempt.owner,
    type: attempt.type,
    ticks: attempt.type === "malevolentShrine" ? MALEVOLENT_SHRINE_TICKS : UNLIMITED_VOID_TICKS,
    maxTicks: attempt.type === "malevolentShrine" ? MALEVOLENT_SHRINE_TICKS : UNLIMITED_VOID_TICKS,
    slashTimer: 18,
    cleaveTimer: MALEVOLENT_CLEAVE_INTERVAL,
    pulse: 0
  };
  pendingDomain = null;
  domainClash = null;
  cinematicZoomTicks = Math.max(cinematicZoomTicks, 80);
  shake = Math.max(shake, 18);
}

function resolveDomainClash() {
  if (!domainClash) return;
  const playerAttempt = domainClash.attempts?.player;
  const enemyAttempt = domainClash.attempts?.enemy;
  const playerScore = domainClash.playerScore + Math.random() * 0.35;
  const enemyScore = domainClash.enemyScore + Math.random() * 0.35;
  const winnerAttempt = playerScore >= enemyScore ? playerAttempt : enemyAttempt;
  const loserAttempt = winnerAttempt === playerAttempt ? enemyAttempt : playerAttempt;
  if (loserAttempt) restoreDomainClashLoser(loserAttempt);
  if (winnerAttempt) activateDomainFromAttempt(winnerAttempt);
}

function updateDomainClash() {
  if (!domainClash) return;
  domainClash.ticks -= 1;
  const enemyAttempt = domainClash.attempts?.enemy;
  if (gameMode === "cpu" && enemyAttempt && Math.random() < (cpuDifficulty === "hard" ? 0.16 : cpuDifficulty === "medium" ? 0.1 : 0.045)) {
    handleDomainClashMash(enemy);
  }
  if (domainClash.ticks <= 0) resolveDomainClash();
}

function updatePendingDomain() {
  if (!pendingDomain) return;
  pendingDomain.ticks -= 1;
  const starter = getFighterByOwner(pendingDomain.owner);
  if (starter) {
    starter.domainStartup = Math.max(0, pendingDomain.ticks);
    starter.vx *= 0.42;
  }
  if (pendingDomain.ticks <= 0) activateDomainFromAttempt(pendingDomain);
}

function endActiveDomain() {
  if (!activeDomain) return;
  const owner = getFighterByOwner(activeDomain.owner);
  if (owner) {
    owner.ctLockTimer = DOMAIN_CT_LOCK_TICKS;
    owner.chargingTechnique = 0;
    owner.fugaAiming = false;
    owner.teleportAiming = false;
    owner.infinityActive = false;
    resetBluePunchState(owner, true);
  }
  activeDomain = null;
  triggerUltimateScreenEffect("domainClose", 36);
}

function applyDomainCleave(ownerFighter, target) {
  if (!ownerFighter || !target || target.ko || target.dodging > 0) return;
  const blocked = isBlockingAttack(target, ownerFighter.dir);
  const rawDamage = blocked ? 6 : 18;
  const damage = getTakenDamage(target, Math.ceil(rawDamage * getOutgoingDamageMultiplier(ownerFighter)));
  if (blocked) damageShield(target, 38);
  applyFighterDamage(target, damage);
  cancelRct(target, false);
  target.hurt = Math.max(target.hurt, blocked ? 6 : 16);
  target.stun = Math.max(target.stun, blocked ? 8 : 18);
  if (!blocked) {
    target.vx += ownerFighter.dir * getTakenKnockback(target, 12);
    target.vy = Math.min(target.vy, -2.8);
  }
  const center = getFighterCenter(target);
  worldSlashEffects.push({
    x1: center.x - 115,
    y1: center.y - 48,
    x2: center.x + 115,
    y2: center.y + 36,
    radius: 14,
    dir: ownerFighter.dir,
    life: 24,
    maxLife: 24,
    splitDelay: 5,
    branches: []
  });
  spawnHitSpark(center.x, center.y, ownerFighter.dir, blocked ? "block" : "cleave");
  if (!pacifistBot && target.health <= 0) startKnockout(ownerFighter, target);
}

function spawnDomainDismantle(ownerFighter, target) {
  if (!ownerFighter || !target) return;
  const targetCenter = getFighterCenter(target);
  const fromLeft = Math.random() < 0.5;
  const x = fromLeft ? 32 : STAGE_W - 32;
  const y = Math.max(72, Math.min(GROUND - 40, targetCenter.y + (Math.random() - 0.5) * 220));
  const aimX = targetCenter.x + (Math.random() - 0.5) * 150 - x;
  const aimY = targetCenter.y + (Math.random() - 0.5) * 90 - y;
  const length = Math.hypot(aimX, aimY) || 1;
  const speed = 15.5;
  projectiles.push({
    owner: getFighterOwner(ownerFighter),
    move: "slash",
    x,
    y,
    vx: aimX / length * speed,
    vy: aimY / length * speed,
    baseVx: aimX / length * speed,
    baseVy: aimY / length * speed,
    radius: 20,
    damage: Math.ceil(11 * getOutgoingDamageMultiplier(ownerFighter)),
    knockback: 14,
    dir: fromLeft ? 1 : -1,
    aimX: aimX / length,
    aimY: aimY / length,
    angle: Math.atan2(aimY, aimX),
    maxTravel: STAGE_W * 1.1,
    traveled: 0,
    life: 92,
    hit: false
  });
}

function applyActiveDomainTick() {
  if (!activeDomain) return;
  activeDomain.ticks -= 1;
  activeDomain.pulse = (activeDomain.pulse || 0) + 1;
  if (activeDomain.type === "malevolentShrine") {
    const ownerFighter = getFighterByOwner(activeDomain.owner);
    const target = getOpponent(ownerFighter);
    activeDomain.slashTimer -= 1;
    activeDomain.cleaveTimer -= 1;
    if (activeDomain.slashTimer <= 0) {
      activeDomain.slashTimer = MALEVOLENT_SLASH_INTERVAL;
      spawnDomainDismantle(ownerFighter, target);
      if (Math.random() < 0.55) spawnDomainDismantle(ownerFighter, target);
    }
    if (activeDomain.cleaveTimer <= 0) {
      activeDomain.cleaveTimer = MALEVOLENT_CLEAVE_INTERVAL;
      applyDomainCleave(ownerFighter, target);
    }
  }
  if (activeDomain.ticks <= 0) endActiveDomain();
}

function updateDomainSystem() {
  if (gameState !== "playing" || paused || !player || !enemy) return;
  const authoritative = gameMode !== "online" || onlineRole === "p1";
  if (domainClash && authoritative) updateDomainClash();
  else if (domainClash) domainClash.ticks = Math.max(0, (domainClash.ticks || 0) - 1);
  if (!domainClash && pendingDomain && authoritative) updatePendingDomain();
  else if (!domainClash && pendingDomain) pendingDomain.ticks = Math.max(0, (pendingDomain.ticks || 0) - 1);
  if (activeDomain && authoritative) applyActiveDomainTick();
  else if (activeDomain) activeDomain.ticks = Math.max(0, (activeDomain.ticks || 0) - 1);
}

function isBluePunchActive(f) {
  return Boolean(f && f.technique === "limitless" && (f.bluePunchActiveTicks || 0) > 0);
}

function resetBluePunchState(f, keepCooldown = true) {
  if (!f) return;
  f.bluePunchHoldTicks = 0;
  f.bluePunchActiveTicks = 0;
  f.bluePunchChases = 0;
  f.bluePunchFlash = 0;
  if (!keepCooldown) f.bluePunchCooldown = 0;
}

function canChargeBluePunch(f) {
  return Boolean(
    f &&
    f.technique === "limitless" &&
    gameState === "playing" &&
    !gameOver &&
    !paused &&
    !isSpecialLocked(f) &&
    !f.ko &&
    !f.knockdown &&
    !f.blocking &&
    !f.rctHealing &&
    f.stun <= 0 &&
    f.dodging <= 0 &&
    (f.bluePunchCooldown || 0) <= 0 &&
    (f.bluePunchActiveTicks || 0) <= 0
  );
}

function activateBluePunch(f) {
  f.bluePunchActiveTicks = GOJO_BLUE_PUNCH_ACTIVE_TICKS;
  
  f.bluePunchCooldown = Math.max(f.bluePunchCooldown || 0, GOJO_BLUE_PUNCH_COOLDOWN_TICKS);
f.bluePunchHoldTicks = 0;
  f.bluePunchChases = 0;
  f.bluePunchFlash = 18;
  const center = getFighterCenter(f);
  spawnHitSpark(center.x, center.y - 8, f.dir, "blue");
  spawnHitSpark(center.x - f.dir * 18, center.y + 22, -f.dir, "blue");
}

function updateBluePunchCharge(f, heavyHeld) {
  if (!heavyHeld) {
    if ((f.bluePunchHoldTicks || 0) > 0) f.bluePunchHoldTicks = 0;
    return;
  }
  if (!canChargeBluePunch(f)) {
    f.bluePunchHoldTicks = 0;
    return;
  }
  f.bluePunchHoldTicks = Math.min(GOJO_BLUE_PUNCH_HOLD_TICKS, (f.bluePunchHoldTicks || 0) + 1);
  if (f.bluePunchHoldTicks >= GOJO_BLUE_PUNCH_HOLD_TICKS) activateBluePunch(f);
}

function updateBluePunchTimers(f) {
  if (!f) return;
  if (f.technique !== "limitless") {
    resetBluePunchState(f, false);
    return;
  }
  if (f.bluePunchFlash > 0) f.bluePunchFlash -= 1;
  if (f.bluePunchCooldown > 0) f.bluePunchCooldown -= 1;
  if (f.bluePunchActiveTicks > 0) {
    f.bluePunchActiveTicks -= 1;
    f.bluePunchHoldTicks = 0;
    if (f.bluePunchActiveTicks <= 0) {
      f.bluePunchCooldown = GOJO_BLUE_PUNCH_COOLDOWN_TICKS;
      f.bluePunchChases = 0;
      f.bluePunchFlash = 10;
    }
  }
}

function tryGojoBlueComboChase(attacker, defender, comboFinished) {
  if (!comboFinished || !isBluePunchActive(attacker) || attacker.bluePunchChases >= GOJO_BLUE_PUNCH_MAX_CHASES) return false;
  if (!defender || defender.ko || attacker.ko) return false;
  const launchDir = Math.sign(defender.vx) || attacker.dir;
  const start = getFighterCenter(attacker);
  const targetCenter = getFighterCenter(defender);
  const chaseX = targetCenter.x + launchDir * (defender.w * 0.62 + attacker.w * 0.58 + 16);
  const chaseY = Math.min(GROUND - attacker.h, Math.max(70, defender.y + defender.h - attacker.h));

  attacker.x = clampStageX(chaseX - attacker.w / 2, attacker.w);
  attacker.y = chaseY;
  resolveTeleportLanding(attacker);
  attacker.vx = 0;
  attacker.vy = 0;
  attacker.dir = -launchDir;
  attacker.punchCooldown = 0;
  attacker.pendingPunchCooldown = false;
  attacker.attacking = null;
  attacker.attackFrame = 0;
  attacker.hasHit = false;
  attacker.queuedAttack = null;
  attacker.comboCount = 0;
  attacker.comboTimer = COMBO_RESET_TICKS;
  attacker.comboChainTimer = COMBO_CHAIN_WINDOW + 12;
  attacker.comboLightsUsed = 0;
  attacker.comboHeavyUsed = false;
  attacker.lastAttackType = null;
  attacker.bluePunchChases += 1;
  attacker.bluePunchFlash = 16;
  defender.stun = Math.max(defender.stun, 24);
  spawnTeleportEffect(start, { x: attacker.x + attacker.w / 2, y: attacker.y + attacker.h / 2 }, attacker.dir);
  spawnHitSpark(attacker.x + attacker.w / 2, attacker.y + 44, attacker.dir, "blue");
  return true;
}

function startGojoPushPullFinisher(attacker, defender) {
  const center = getFighterCenter(defender);
  defender.gojoPushPullTimer = Math.round(1.4 * 60);
  defender.gojoPushPullAnchorX = defender.x;
  defender.gojoPushPullAnchorY = defender.y;
  attacker.gojoPushPullCooldown = GOJO_PUSH_PULL_FINISHER_COOLDOWN_TICKS;
  defender.knockdown = false;
  defender.knockdownTimer = 0;
  defender.stun = Math.max(defender.stun, defender.gojoPushPullTimer);
  defender.hurt = Math.max(defender.hurt, 22);
  defender.grounded = defender.y + defender.h >= GROUND - 6 || defender.grounded;
  spawnHitSpark(center.x - attacker.dir * 14, center.y - 8, -attacker.dir, "blue");
  spawnHitSpark(center.x + attacker.dir * 18, center.y + 10, attacker.dir, "red");
}

function clearBarrageState(f) {
  f.barrageTimer = 0;
  f.barrageDuration = 0;
  f.barrageHitsDone = 0;
  f.barrageDamageRemaining = 0;
  f.barrageKnockback = 0;
  f.barrageTarget = null;
  f.barrageLockX = null;
  f.barrageLockY = null;
}

function lockBarrageTarget(attacker, defender) {
  if (!Number.isFinite(attacker.barrageLockX)) attacker.barrageLockX = attacker.x;
  if (!Number.isFinite(attacker.barrageLockY)) attacker.barrageLockY = attacker.y;
  if (!Number.isFinite(defender.barrageLockY)) defender.barrageLockY = defender.y;
  attacker.x = clampStageX(attacker.barrageLockX, attacker.w);
  attacker.y = attacker.barrageLockY;
  attacker.vx = 0;
  attacker.vy = 0;
  const targetX = attacker.barrageDir > 0
    ? attacker.x + attacker.w - 2
    : attacker.x - defender.w + 2;
  defender.x = clampStageX(targetX, defender.w);
  defender.y = defender.barrageLockY;
  defender.dir = -attacker.barrageDir;
  defender.vx = 0;
  defender.vy = 0;
  defender.barrageHeldTimer = Math.max(defender.barrageHeldTimer || 0, attacker.barrageTimer + 2);
  defender.barrageHeldBy = attacker === player ? "player" : "enemy";
}

function startSukunaBarrage(attacker, defender, damage, knockback) {
  attacker.attacking = "barrage";
  attacker.attackFrame = 0;
  attacker.hasHit = true;
  attacker.queuedAttack = null;
  attacker.barrageTimer = SUKUNA_BARRAGE_DURATION_TICKS;
  attacker.barrageDuration = SUKUNA_BARRAGE_DURATION_TICKS;
  attacker.barrageHitsDone = 0;
  attacker.barrageDamageRemaining = Math.max(SUKUNA_BARRAGE_HITS, Math.ceil(damage * 3.4));
  attacker.barrageKnockback = Math.max(knockback, 34);
  attacker.barrageDir = attacker.dir;
  attacker.barrageTarget = attacker === player ? "enemy" : "player";
  attacker.barrageLockX = attacker.x;
  attacker.barrageLockY = attacker.y;
  attacker.vx = 0;
  attacker.blocking = false;
  attacker.dodging = 0;

  defender.attacking = null;
  defender.attackFrame = 0;
  defender.hasHit = false;
  defender.knockdown = false;
  defender.knockdownTimer = 0;
  defender.hurt = 10;
  defender.stun = Math.max(defender.stun, SUKUNA_BARRAGE_DURATION_TICKS + 8);
  defender.grounded = defender.grounded || defender.y + defender.h >= GROUND - 4;
  defender.barrageLockY = defender.y;
  cancelRct(defender, false);
  resetCombo(defender);
  lockBarrageTarget(attacker, defender);

  registerComboHit(attacker, "light");
  queuePunchCooldown(attacker);
  gainCe(attacker, LIGHT_HIT_CE_GAIN);
  hitStopTicks = Math.max(hitStopTicks, 3);
  shake = Math.max(shake, 5);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 42, attacker.barrageDir, "light");
  updateHud();
}

function updateSukunaBarrage(attacker, defender) {
  if (!attacker || attacker.barrageTimer <= 0) return false;
  if (!defender || defender.ko || attacker.ko || attacker.technique !== "shrine") {
    clearBarrageState(attacker);
    defender.barrageHeldTimer = 0;
    defender.barrageHeldBy = null;
    defender.barrageLockY = null;
    if (attacker?.attacking === "barrage") attacker.attacking = null;
    return false;
  }

  attacker.attacking = "barrage";
  attacker.hasHit = true;
  attacker.vx = 0;
  attacker.dodging = 0;
  attacker.blocking = false;
  lockBarrageTarget(attacker, defender);
  defender.hurt = Math.max(defender.hurt, 4);
  defender.stun = Math.max(defender.stun, attacker.barrageTimer + 6);

  const elapsed = Math.max(0, (attacker.barrageDuration || SUKUNA_BARRAGE_DURATION_TICKS) - attacker.barrageTimer);
  const shouldHit = elapsed > 0
    && elapsed % SUKUNA_BARRAGE_HIT_INTERVAL === 0
    && attacker.barrageHitsDone < SUKUNA_BARRAGE_HITS;
  if (shouldHit) {
    attacker.barrageHitsDone += 1;
    const hitsLeft = Math.max(1, SUKUNA_BARRAGE_HITS - attacker.barrageHitsDone + 1);
    const hitDamage = Math.max(1, Math.ceil(attacker.barrageDamageRemaining / hitsLeft));
    attacker.barrageDamageRemaining = Math.max(0, attacker.barrageDamageRemaining - hitDamage);
    const barrageDamageDealt = applyFighterDamage(defender, hitDamage);
    gainUltimate(attacker, barrageDamageDealt * ULT_DAMAGE_GAIN_SCALE);
    spawnHitSpark(
      defender.x + defender.w / 2 + attacker.barrageDir * (8 + (attacker.barrageHitsDone % 3) * 4),
      defender.y + 32 + (attacker.barrageHitsDone % 4) * 10,
      attacker.barrageDir,
      "light"
    );
    hitStopTicks = Math.max(hitStopTicks, 2);
    shake = Math.max(shake, 4);
    updateHud();

    if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
      sendOnlineDamage({
        damage: hitDamage,
        blocked: false,
        barrageHold: true,
        knockback: 0,
        stun: defender.stun,
        dir: attacker.barrageDir,
        aimX: 0,
        aimY: 0,
        playerHealth: defender.health
      });
    }
  }

  attacker.barrageTimer -= 1;
  if (attacker.barrageTimer > 0) return true;

  const finalKnockback = getTakenKnockback(defender, attacker.barrageKnockback);
  defender.vx = attacker.barrageDir * finalKnockback;
  defender.vy = -2.4;
  defender.barrageHeldTimer = 0;
  defender.barrageHeldBy = null;
  defender.barrageLockY = null;
  defender.grounded = false;
  defender.onPlatform = false;
  defender.stun = Math.max(defender.stun, 18);
  defender.hurt = Math.max(defender.hurt, 14);
  attacker.comboChainTimer = 0;
  attacker.queuedAttack = null;
  attacker.comboTimer = 0;
  attacker.attacking = null;
  attacker.attackFrame = 0;
  attacker.hasHit = false;
  clearBarrageState(attacker);
  beginPunchCooldown(attacker);
  hitStopTicks = Math.max(hitStopTicks, 5);
  shake = Math.max(shake, 9);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 46, attacker.barrageDir, "heavy");

  if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
    sendOnlineDamage({
      damage: 0,
      blocked: false,
      knockback: Math.abs(finalKnockback),
      stun: defender.stun,
      vy: defender.vy,
      dir: attacker.barrageDir,
      aimX: attacker.barrageDir,
      aimY: -0.2,
      playerHealth: defender.health
    });
  }

  if (!pacifistBot && defender.health <= 0) startKnockout(attacker, defender);
  updateHud();
  return true;
}

function clearGrabThrowState(f) {
  f.grabThrowTimer = 0;
  f.grabThrowDuration = 0;
  f.grabThrowDamage = 0;
  f.grabThrowKnockback = 0;
  f.grabThrowTarget = null;
  f.grabThrowAim = null;
  f.grabThrowLockX = null;
  f.grabThrowLockY = null;
}

function getLiveGrabThrowAim(attacker, defender) {
  const localControlled = attacker === player
    || (gameMode === "online" && onlineRole === "p2" && attacker === enemy)
    || (gameMode === "pvp" && attacker === enemy);
  if (localControlled) return sanitizeAimPoint(mouseAimWorld) || getFighterCenter(defender);
  if (gameMode === "cpu" && attacker === enemy) return getCpuAimPoint(cpuSettings[cpuDifficulty] || cpuSettings.medium);
  return sanitizeAimPoint(attacker.grabThrowAim) || getFighterCenter(defender);
}

function lockGrabThrowTarget(attacker, defender) {
  if (!Number.isFinite(attacker.grabThrowLockX)) attacker.grabThrowLockX = attacker.x;
  if (!Number.isFinite(attacker.grabThrowLockY)) attacker.grabThrowLockY = attacker.y;
  if (!Number.isFinite(defender.grabLockY)) defender.grabLockY = defender.y;
  attacker.x = clampStageX(attacker.grabThrowLockX, attacker.w);
  attacker.y = attacker.grabThrowLockY;
  attacker.vx = 0;
  attacker.vy = 0;
  const targetX = attacker.grabThrowDir > 0
    ? attacker.x + attacker.w - defender.w * 0.18
    : attacker.x - defender.w * 0.82;
  defender.x = clampStageX(targetX, defender.w);
  defender.y = defender.grabLockY;
  defender.vx = 0;
  defender.vy = 0;
  defender.dir = -attacker.grabThrowDir;
  defender.grabHeldTimer = Math.max(defender.grabHeldTimer || 0, attacker.grabThrowTimer + 2);
  defender.grabHeldBy = attacker === player ? "player" : "enemy";
}

function startSukunaGrabThrow(attacker, defender, damage, knockback) {
  attacker.attacking = "grabThrow";
  attacker.attackFrame = 0;
  attacker.hasHit = true;
  attacker.queuedAttack = null;
  attacker.grabThrowTimer = SUKUNA_GRAB_THROW_DURATION_TICKS;
  attacker.grabThrowDuration = SUKUNA_GRAB_THROW_DURATION_TICKS;
  attacker.grabThrowDamage = Math.max(1, Math.ceil(SUKUNA_GRAB_THROW_RELEASE_DAMAGE * getOutgoingDamageMultiplier(attacker)));
  attacker.grabThrowKnockback = Math.max(knockback, 36);
  attacker.grabThrowDir = attacker.dir;
  attacker.grabThrowTarget = attacker === player ? "enemy" : "player";
  attacker.grabThrowAim = getLiveGrabThrowAim(attacker, defender);
  attacker.grabThrowLockX = attacker.x;
  attacker.grabThrowLockY = attacker.y;
  attacker.vx = 0;
  attacker.vy = 0;
  attacker.blocking = false;
  attacker.dodging = 0;

  const damageDealt = applyFighterDamage(defender, damage);
  gainUltimate(attacker, damageDealt * ULT_DAMAGE_GAIN_SCALE);
  cancelRct(defender, false);
  defender.attacking = null;
  defender.attackFrame = 0;
  defender.hasHit = false;
  defender.knockdown = false;
  defender.knockdownTimer = 0;
  defender.hurt = 12;
  defender.stun = Math.max(defender.stun, SUKUNA_GRAB_THROW_DURATION_TICKS + 10);
  defender.grabLockY = defender.y;
  resetCombo(defender);
  lockGrabThrowTarget(attacker, defender);

  registerComboHit(attacker, "heavy");
  queuePunchCooldown(attacker);
  gainCe(attacker, HEAVY_HIT_CE_GAIN);
  hitStopTicks = Math.max(hitStopTicks, HITSTOP_HEAVY);
  shake = Math.max(shake, 8);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 42, attacker.grabThrowDir, "heavy");
  updateHud();

  if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
    sendOnlineDamage({
      damage,
      blocked: false,
      grabHold: true,
      grabHoldTicks: SUKUNA_GRAB_THROW_DURATION_TICKS,
      knockback: 0,
      stun: defender.stun,
      dir: attacker.grabThrowDir,
      aimX: 0,
      aimY: 0,
      playerHealth: defender.health
    });
  }
}

function updateSukunaGrabThrow(attacker, defender) {
  if (!attacker || attacker.grabThrowTimer <= 0) return false;
  if (!defender || defender.ko || attacker.ko || attacker.technique !== "shrine") {
    clearGrabThrowState(attacker);
    if (defender) {
      defender.grabHeldTimer = 0;
      defender.grabHeldBy = null;
      defender.grabLockY = null;
    }
    if (attacker?.attacking === "grabThrow") attacker.attacking = null;
    return false;
  }

  attacker.attacking = "grabThrow";
  attacker.hasHit = true;
  attacker.grabThrowAim = getLiveGrabThrowAim(attacker, defender);
  lockGrabThrowTarget(attacker, defender);
  defender.hurt = Math.max(defender.hurt, 4);
  defender.stun = Math.max(defender.stun, attacker.grabThrowTimer + 8);

  attacker.grabThrowTimer -= 1;
  if (attacker.grabThrowTimer > 0) return true;

  const defenderCenter = getFighterCenter(defender);
  const aim = sanitizeAimPoint(attacker.grabThrowAim) || {
    x: defenderCenter.x + attacker.grabThrowDir * 180,
    y: defenderCenter.y - 70
  };
  let throwX = aim.x - defenderCenter.x;
  let throwY = aim.y - defenderCenter.y;
  let length = Math.hypot(throwX, throwY);
  if (length < 16) {
    throwX = attacker.grabThrowDir;
    throwY = -0.25;
    length = Math.hypot(throwX, throwY);
  }
  const aimX = throwX / length;
  const aimY = throwY / length;
  const throwPower = getTakenKnockback(defender, attacker.grabThrowKnockback);
  const releaseDamage = getTakenDamage(defender, attacker.grabThrowDamage);
  applyFighterDamage(defender, releaseDamage);
  defender.grabHeldTimer = 0;
  defender.grabHeldBy = null;
  defender.grabLockY = null;
  defender.vx = aimX * throwPower;
  defender.vy = aimY * throwPower * 0.62;
  if (aimY > -0.12) defender.vy -= 3.5;
  defender.grounded = false;
  defender.onPlatform = false;
  defender.stun = Math.max(defender.stun, 22);
  defender.hurt = Math.max(defender.hurt, 18);
  defender.knockdown = true;
  defender.knockdownTimer = 28;

  attacker.comboChainTimer = 0;
  attacker.queuedAttack = null;
  attacker.comboTimer = 0;
  attacker.attacking = null;
  attacker.attackFrame = 0;
  attacker.hasHit = false;
  clearGrabThrowState(attacker);
  beginPunchCooldown(attacker);
  hitStopTicks = Math.max(hitStopTicks, HITSTOP_HEAVY);
  shake = Math.max(shake, 13);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 46, Math.sign(aimX) || attacker.grabThrowDir, "heavy");

  if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
    sendOnlineDamage({
      damage: releaseDamage,
      blocked: false,
      knockback: Math.abs(throwPower),
      stun: defender.stun,
      vy: defender.vy,
      knockdown: true,
      knockdownTimer: defender.knockdownTimer,
      dir: Math.sign(aimX) || attacker.grabThrowDir,
      aimX,
      aimY,
      playerHealth: defender.health
    });
  }

  if (!pacifistBot && defender.health <= 0) startKnockout(attacker, defender);
  updateHud();
  return true;
}

function applyBackThrowHit(attacker, defender) {
  attacker.hasHit = true;
  if (pacifistBot && defender === enemy) markPracticeBotAttacked();
  const attack = getAttackSpec(attacker, "backThrow");
  const damage = getTakenDamage(defender, Math.ceil(attack.damage * getOutgoingDamageMultiplier(attacker)));
  const throwDamageDealt = applyFighterDamage(defender, damage);
  gainUltimate(attacker, throwDamageDealt * ULT_DAMAGE_GAIN_SCALE);
  cancelRct(defender, false);
  resetCombo(attacker);
  resetCombo(defender);

  const throwDir = -attacker.dir;
  const behindX = attacker.dir > 0 ? attacker.x - defender.w - 10 : attacker.x + attacker.w + 10;
  defender.x = clampStageX(behindX, defender.w);
  defender.y = Math.min(defender.y, GROUND - defender.h - 6);
  defender.vx = throwDir * getTakenKnockback(defender, attack.knockback);
  defender.vy = -8.4;
  defender.grounded = false;
  defender.onPlatform = false;
  defender.knockdown = true;
  defender.knockdownTimer = 34;
  defender.hurt = 18;
  defender.stun = 30;
  defender.attacking = null;
  defender.attackFrame = 0;
  defender.hasHit = false;
  defender.dir = -attacker.dir;

  attacker.punchCooldown = Math.max(attacker.punchCooldown || 0, BACK_THROW_COOLDOWN_TICKS);
  attacker.comboChainTimer = 0;
  attacker.comboTimer = 0;
  gainCe(attacker, HEAVY_HIT_CE_GAIN);
  hitStopTicks = Math.max(hitStopTicks, HITSTOP_HEAVY);
  shake = Math.max(shake, 12);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + defender.h - 18, throwDir, "heavy");
  updateHud();

  if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
    sendOnlineDamage({
      damage,
      blocked: false,
      knockback: Math.abs(defender.vx),
      dir: throwDir,
      aimX: throwDir,
      aimY: -0.55,
      stun: defender.stun,
      vy: defender.vy,
      knockdown: true,
      knockdownTimer: defender.knockdownTimer,
      throwX: defender.x,
      throwY: defender.y,
      playerHealth: defender.health
    });
  }

  if (!pacifistBot && defender.health <= 0) {
    startKnockout(attacker, defender);
  }
}

function applyHit(attacker, defender) {
  const attack = getAttackSpec(attacker);
  if (roundEnding || defender.ko) return;
  if (defender.knockdown && defender.grounded) return;
  if (!attack || attacker.hasHit) return;
  const activeStart = attack.windup;
  const activeEnd = attack.windup + attack.active;
  if (attacker.attackFrame < activeStart || attacker.attackFrame > activeEnd) return;
  if (defender.dodging > 0) return;
  if (!rectsOverlap(getHitbox(attacker), defender)) return;

  if (attacker.attacking === "backThrow") {
    applyBackThrowHit(attacker, defender);
    return;
  }

  attacker.hasHit = true;
  if (pacifistBot && defender === enemy) markPracticeBotAttacked();
  const attackType = attacker.attacking;
  const comboHitsBefore = attacker.comboCount;
  const isHeavyHit = attackType === "heavy";
  const heavyFinisher = isHeavyHit && comboHitsBefore > 0;
  const finalLightHit = attackType === "light" && comboHitsBefore + 1 >= getPunchHitLimit(attacker);
  const blocked = isBlockingAttack(defender, attacker.dir);
  const bluePunchActive = isBluePunchActive(attacker);
  const comboFinisher = heavyFinisher || finalLightHit;
  const bluePullHit = bluePunchActive && attacker.technique === "limitless" && !blocked && !comboFinisher;
  const gojoRedHeavyFinisher = attacker.technique === "limitless" && heavyFinisher && !blocked;
  const gojoPushPullFinisher = attacker.technique === "limitless" && finalLightHit && !bluePunchActive && !blocked && (attacker.gojoPushPullCooldown || 0) <= 0;
  const rawAttackDamage = Math.ceil(attack.damage * getOutgoingDamageMultiplier(attacker));
  const scaledAttackDamage = blocked ? rawAttackDamage : Math.ceil(rawAttackDamage * getComboDamageScale(attacker));
  const baseDamage = blocked ? 0 : scaledAttackDamage;
  const damage = getTakenDamage(defender, baseDamage);
  if (blocked) damageShield(defender, rawAttackDamage);
  const sukunaBarrageFinisher = attacker.technique === "shrine" && finalLightHit && !blocked;
  if (sukunaBarrageFinisher) {
    const barrageKnockbackScale = 1 + comboHitsBefore * 0.14;
    const barrageKnockback = Math.max(
      getTakenKnockback(defender, attack.knockback * barrageKnockbackScale * 2.2),
      36
    );
    startSukunaBarrage(attacker, defender, damage, barrageKnockback);
    return;
  }
  const sukunaHeavyGrabFinisher = attacker.technique === "shrine" && heavyFinisher && !blocked;
  if (sukunaHeavyGrabFinisher) {
    const grabKnockbackScale = 1 + comboHitsBefore * 0.16;
    const grabKnockback = Math.max(
      getTakenKnockback(defender, attack.knockback * grabKnockbackScale * 1.9),
      38
    );
    startSukunaGrabThrow(attacker, defender, damage, grabKnockback);
    return;
  }
  const meleeDamageDealt = applyFighterDamage(defender, damage);
  gainUltimate(attacker, meleeDamageDealt * (blocked ? ULT_BLOCKED_DAMAGE_GAIN_SCALE : ULT_DAMAGE_GAIN_SCALE));
  cancelRct(defender, false);
  defender.hurt = blocked ? 6 : 14;
  defender.stun = getComboHitstun(attacker, attackType, blocked);
  let comboKnockbackScale = blocked ? 1 : 1 + comboHitsBefore * 0.14;
  if (!blocked && isHeavyHit) comboKnockbackScale *= heavyFinisher ? gojoRedHeavyFinisher ? 2.05 : 1.25 : 0.68;
  if (!blocked && finalLightHit) comboKnockbackScale *= gojoPushPullFinisher ? 0.12 : attacker.technique === "shrine" ? 2.75 : 2.55;
  let knockback = getTakenKnockback(defender, (blocked ? attack.knockback * 0.35 : attack.knockback) * comboKnockbackScale, {
    weak: attackType === "light" && !finalLightHit
  });
  if (gojoRedHeavyFinisher) knockback = Math.max(knockback, 46);
  if (!blocked && finalLightHit && !gojoPushPullFinisher) knockback = Math.max(knockback, attacker.technique === "shrine" ? 40 : 34);
  const knockbackDir = bluePullHit ? -attacker.dir : attacker.dir;
  defender.vx = knockbackDir * knockback;
  if (bluePullHit) {
    defender.vy = Math.min(defender.vy, -1.4);
    defender.stun = Math.max(defender.stun, 18);
    attacker.bluePunchFlash = 10;
  }
  if (!blocked) {
    defender.attacking = null;
    defender.attackFrame = 0;
    defender.hasHit = false;
    resetCombo(defender);
    registerComboHit(attacker, attackType);
    if (heavyFinisher) {
      const pointBlank = Math.abs((attacker.x + attacker.w / 2) - (defender.x + defender.w / 2)) < 72;
      const wasGrounded = defender.grounded;
      defender.grounded = false;
      defender.knockdown = true;
      defender.knockdownTimer = gojoRedHeavyFinisher ? 34 : pointBlank ? 28 : 22;
      defender.vy = gojoRedHeavyFinisher ? -7.4 : pointBlank || !wasGrounded ? -9.2 : -6.8;
      defender.stun = Math.max(defender.stun, gojoRedHeavyFinisher ? 32 : pointBlank ? 26 : 21);
      attacker.comboChainTimer = 0;
      attacker.queuedAttack = null;
      attacker.comboTimer = 0;
    } else if (isHeavyHit) {
      defender.stun = Math.max(defender.stun, 18);
      attacker.comboChainTimer = 0;
      attacker.queuedAttack = null;
      attacker.comboTimer = 0;
    } else if (finalLightHit) {
      if (gojoPushPullFinisher) {
        startGojoPushPullFinisher(attacker, defender);
      } else {
        defender.stun = Math.max(defender.stun, 17);
        defender.grounded = false;
        defender.vy = -2.2;
      }
      attacker.comboChainTimer = 0;
      attacker.queuedAttack = null;
    }
    if (attackType === "heavy" || attacker.comboCount >= getPunchHitLimit(attacker)) {
      queuePunchCooldown(attacker);
    }
  }
  const didBlueChase = tryGojoBlueComboChase(attacker, defender, !blocked && comboFinisher && defender.health > 0);
  if (!blocked) gainCe(attacker, attackType === "heavy" ? HEAVY_HIT_CE_GAIN : LIGHT_HIT_CE_GAIN);
  hitStopTicks = Math.max(hitStopTicks, blocked ? 3 : gojoRedHeavyFinisher ? HITSTOP_HEAVY + 2 : gojoPushPullFinisher ? HITSTOP_HEAVY : heavyFinisher ? HITSTOP_HEAVY : finalLightHit ? 5 : HITSTOP_LIGHT);
  shake = Math.max(shake, blocked ? 4 : gojoRedHeavyFinisher ? 14 : gojoPushPullFinisher ? 12 : didBlueChase ? 12 : heavyFinisher ? 11 : finalLightHit ? 9 : isHeavyHit ? 8 : 7);
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 44, knockbackDir, blocked ? "block" : gojoRedHeavyFinisher ? "red" : gojoPushPullFinisher ? "blue" : bluePullHit || didBlueChase ? "blue" : attackType);
  if (gojoRedHeavyFinisher) {
    spawnHitSpark(defender.x + defender.w / 2 - knockbackDir * 16, defender.y + 58, -knockbackDir, "red");
    spawnHitSpark(defender.x + defender.w / 2 + knockbackDir * 10, defender.y + 34, knockbackDir, "red");
    spawnHitSpark(defender.x + defender.w / 2, defender.y + 72, -knockbackDir, "red");
  }
  updateHud();

  if (!pacifistBot && defender.health <= 0) {
    startKnockout(attacker, defender);
  }

  if (gameMode === "online" && onlineRole === "p2" && attacker === enemy && defender === player) {
    sendOnlineDamage({
      damage,
      blocked,
      knockback,
      stun: defender.stun,
      vy: defender.vy,
      knockdown: defender.knockdown,
      knockdownTimer: defender.knockdownTimer,
      dir: knockbackDir,
      aimX: knockbackDir,
      blueChase: didBlueChase,
      attackerX: didBlueChase ? attacker.x : null,
      attackerY: didBlueChase ? attacker.y : null,
      attackerDir: didBlueChase ? attacker.dir : null,
      attackerBluePunchChases: didBlueChase ? attacker.bluePunchChases : null,
      attackerBluePunchActiveTicks: didBlueChase ? attacker.bluePunchActiveTicks : null,
      gojoRedHeavy: gojoRedHeavyFinisher,
      gojoPushPull: gojoPushPullFinisher,
      playerHealth: defender.health
    });
  }
}

function applyOnlineDamageToPlayer(hit) {
  if (roundEnding || roundResolved || player.ko || pacifistBot) return;
  enemy.hasHit = true;
  const damage = Number(hit.damage) || 0;
  player.health = Math.max(0, player.health - damage);
  if (damage > 0 && !hit.ultimateHit) {
    gainUltimate(enemy, damage * (hit.blocked ? ULT_BLOCKED_DAMAGE_GAIN_SCALE : ULT_DAMAGE_GAIN_SCALE));
  }
  cancelRct(player, true);
  player.hurt = hit.blocked ? 6 : 14;
  player.stun = Number(hit.stun) || (hit.blocked ? 5 : 14);
  if (hit.barrageHold) {
    player.barrageHeldTimer = Math.max(player.barrageHeldTimer || 0, Number(hit.barrageHoldTicks) || 8);
    player.barrageHeldBy = "enemy";
    player.barrageLockY = Number.isFinite(player.barrageLockY) ? player.barrageLockY : player.y;
  }
  if (hit.grabHold) {
    player.grabHeldTimer = Math.max(player.grabHeldTimer || 0, Number(hit.grabHoldTicks) || SUKUNA_GRAB_THROW_DURATION_TICKS);
    player.grabHeldBy = "enemy";
    player.grabLockY = Number.isFinite(player.grabLockY) ? player.grabLockY : player.y;
  }
  if (!hit.barrageHold) {
    player.barrageHeldTimer = 0;
    player.barrageHeldBy = null;
    player.barrageLockY = null;
  }
  if (!hit.grabHold) {
    player.grabHeldTimer = 0;
    player.grabHeldBy = null;
    player.grabLockY = null;
  }
  if (!hit.blocked) {
    player.attacking = null;
    player.attackFrame = 0;
    player.hasHit = false;
    resetCombo(player);
  }
  if (Number.isFinite(Number(hit.throwX))) player.x = clampStageX(Number(hit.throwX), player.w);
  if (Number.isFinite(Number(hit.throwY))) {
    player.y = Math.max(-80, Math.min(GROUND - player.h, Number(hit.throwY)));
  }
  if (hit.blueChase && Number.isFinite(Number(hit.attackerX)) && Number.isFinite(Number(hit.attackerY))) {
    enemy.x = clampStageX(Number(hit.attackerX), enemy.w);
    enemy.y = Math.max(-80, Math.min(GROUND - enemy.h, Number(hit.attackerY)));
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.dir = Number(hit.attackerDir) || enemy.dir;
    enemy.punchCooldown = 0;
    enemy.pendingPunchCooldown = false;
    enemy.attacking = null;
    enemy.attackFrame = 0;
    enemy.hasHit = false;
    if (Number.isFinite(Number(hit.attackerBluePunchChases))) enemy.bluePunchChases = Number(hit.attackerBluePunchChases);
    if (Number.isFinite(Number(hit.attackerBluePunchActiveTicks))) enemy.bluePunchActiveTicks = Number(hit.attackerBluePunchActiveTicks);
  }
  const hitDir = Number(hit.dir) || -1;
  const hitAimX = Number.isFinite(Number(hit.aimX)) ? Number(hit.aimX) : hitDir;
  const hitAimY = Number.isFinite(Number(hit.aimY)) ? Number(hit.aimY) : 0;
  const parsedKnockback = Number(hit.knockback);
  const knockback = Number.isFinite(parsedKnockback) ? parsedKnockback : 8;
  player.vx = hitAimX * knockback;
  if (!hit.blocked && Math.abs(hitAimY) > 0.1) player.vy = Math.min(player.vy, hitAimY * knockback * 0.38);
  if (hit.knockdown) {
    player.knockdown = true;
    player.knockdownTimer = Number(hit.knockdownTimer) || 22;
    player.grounded = false;
    player.vy = Number(hit.vy) || -8;
  }
  if (hit.gojoPushPull) {
    startGojoPushPullFinisher(enemy, player);
  }
  hitStopTicks = Math.max(hitStopTicks, hit.blocked ? 3 : HITSTOP_LIGHT);
  shake = hit.blocked ? 4 : 9;
  spawnHitSpark(player.x + player.w / 2, player.y + 44, hitDir, hit.blocked ? "block" : hit.gojoRedHeavy ? "red" : hit.gojoPushPull ? "blue" : "light");
  if (hit.gojoRedHeavy) spawnHitSpark(player.x + player.w / 2 - hitDir * 16, player.y + 58, -hitDir, "red");
  updateHud();

  if (player.health <= 0 && !hit.barrageHold && !hit.grabHold) {
    startKnockout(enemy, player);
  }
}

function applyProjectileHit(projectile, defender) {
  if (projectile.hit || defender.ko || defender.dodging > 0) return;
  projectile.hit = true;
  if (pacifistBot && defender === enemy) markPracticeBotAttacked();
  const blocked = isBlockingAttack(defender, projectile.dir);
  const blockDamageScale = projectile.move === "purple" ? HOLLOW_PURPLE_BLOCK_CHIP : 0.3;
  const baseDamage = blocked ? 0 : projectile.damage;
  const damage = getTakenDamage(defender, baseDamage);
  if (blocked) damageShield(defender, projectile.damage);
  const projectileDamageDealt = applyFighterDamage(defender, damage);
  const ownerFighter = projectile.owner === "player" ? player : enemy;
  if (!projectile.ultimateProjectile && projectile.move !== "purple" && projectile.move !== "worldSlash") {
    gainUltimate(ownerFighter, projectileDamageDealt * (blocked ? ULT_BLOCKED_DAMAGE_GAIN_SCALE : ULT_DAMAGE_GAIN_SCALE));
  }
  cancelRct(defender, false);
  defender.hurt = blocked ? 6 : 14;
  defender.stun = projectile.move === "purple" ? 30 : projectile.move === "worldSlash" ? 30 : projectile.move === "blue" ? 10 : projectile.move === "cleave" ? 20 : projectile.move === "fuga" ? 24 : 14;
  if (!blocked) {
    defender.attacking = null;
    defender.attackFrame = 0;
    defender.hasHit = false;
    resetCombo(defender);
  }
  const kb = getTakenKnockback(defender, blocked ? projectile.knockback * (projectile.move === "purple" ? 0.48 : 0.35) : projectile.knockback);
  const aimX = Number.isFinite(Number(projectile.aimX)) ? Number(projectile.aimX) : projectile.dir;
  const aimY = Number.isFinite(Number(projectile.aimY)) ? Number(projectile.aimY) : 0;
  const pullPushBoost = projectile.move === "blue" || projectile.move === "red" ? 1.22 : 1;
  const pushX = (projectile.move === "blue" ? -aimX : aimX) * pullPushBoost;
  const pushY = (projectile.move === "blue" ? -aimY : aimY) * pullPushBoost;
  const pushDir = Math.abs(pushX) > 0.08 ? Math.sign(pushX) : projectile.dir;
  const kbPower = Math.abs(kb);
  defender.vx = (Math.abs(pushX) > 0.12 ? pushX : pushDir * 0.12) * kbPower;
  if (!blocked && Math.abs(pushY) > 0.1) defender.vy = Math.min(defender.vy, pushY * kbPower * 0.38);
  if (projectile.move === "purple" || projectile.move === "worldSlash") {
    defender.grounded = false;
    defender.knockdown = true;
    defender.knockdownTimer = Math.max(defender.knockdownTimer || 0, 30);
    defender.vy = Math.min(defender.vy, -7.8);
    spawnGroundErase(defender.x + defender.w / 2, 104);
  }
  hitStopTicks = Math.max(hitStopTicks, blocked ? 3 : (projectile.move === "purple" || projectile.move === "worldSlash") ? HITSTOP_HEAVY + 4 : projectile.move === "cleave" || projectile.move === "fuga" ? HITSTOP_HEAVY : HITSTOP_LIGHT);
  shake = blocked ? 4 : (projectile.move === "purple" || projectile.move === "worldSlash") ? 15 : projectile.move === "fuga" ? 13 : 8;
  spawnHitSpark(defender.x + defender.w / 2, defender.y + 48, pushDir, blocked ? "block" : projectile.move);
  if (projectile.move === "fuga") spawnFugaExplosion(projectile, false);
  updateHud();

  if (gameMode === "online" && onlineRole === "p2" && projectile.owner === "enemy" && defender === player) {
    sendOnlineDamage({
      damage,
      blocked,
      knockback: kbPower,
      dir: pushDir,
      aimX: Math.abs(pushX) > 0.12 ? pushX : pushDir * 0.12,
      aimY: pushY,
      stun: defender.stun,
      vy: defender.vy,
      ultimateHit: projectile.move === "purple",
      playerHealth: defender.health
    });
  }

  if (!pacifistBot && defender.health <= 0) {
    startKnockout(projectile.owner === "player" ? player : enemy, defender);
  }
}

function applyFugaExplosionDamage(projectile, defender) {
  if (!projectile || !defender || defender.ko || defender.dodging > 0) return;
  const radius = projectile.explosionRadius || techniqueMoves.fuga.explosionRadius;
  const center = getFighterCenter(defender);
  const distance = Math.hypot(center.x - projectile.x, center.y - projectile.y);
  if (distance > radius + Math.max(defender.w, defender.h) * 0.32) return;

  const blocked = isBlockingAttack(defender, projectile.dir);
  const falloff = Math.max(0.35, 1 - distance / Math.max(1, radius) * 0.55);
  const baseDamage = Math.ceil(projectile.damage * 0.48 * falloff);
  const damage = getTakenDamage(defender, blocked ? 0 : baseDamage);
  if (blocked) damageShield(defender, projectile.damage * 0.8);
  const explosionDamageDealt = applyFighterDamage(defender, damage);
  gainUltimate(projectile.owner === "player" ? player : enemy, explosionDamageDealt * (blocked ? ULT_BLOCKED_DAMAGE_GAIN_SCALE : ULT_DAMAGE_GAIN_SCALE));
  cancelRct(defender, false);
  defender.hurt = blocked ? 6 : 18;
  defender.stun = blocked ? 8 : 24;

  const awayX = center.x - projectile.x;
  const awayY = center.y - projectile.y;
  const length = Math.hypot(awayX, awayY) || 1;
  const pushX = awayX / length;
  const pushY = awayY / length;
  const knockback = getTakenKnockback(defender, projectile.knockback * 0.86 * falloff);
  defender.vx = pushX * knockback;
  if (!blocked) {
    defender.attacking = null;
    defender.attackFrame = 0;
    defender.hasHit = false;
    resetCombo(defender);
    defender.grounded = false;
    defender.vy = Math.min(defender.vy, pushY * knockback * 0.36 - 5.5);
  }

  hitStopTicks = Math.max(hitStopTicks, blocked ? 4 : HITSTOP_HEAVY);
  shake = Math.max(shake, blocked ? 6 : 14);
  spawnHitSpark(center.x, center.y - 4, Math.sign(pushX) || projectile.dir, blocked ? "block" : "fuga");

  if (gameMode === "online" && onlineRole === "p2" && projectile.owner === "enemy" && defender === player) {
    sendOnlineDamage({
      damage,
      blocked,
      knockback: Math.abs(knockback),
      dir: Math.sign(pushX) || projectile.dir,
      aimX: pushX,
      aimY: pushY - 0.25,
      stun: defender.stun,
      vy: defender.vy,
      playerHealth: defender.health
    });
  }

  if (!pacifistBot && defender.health <= 0) {
    startKnockout(projectile.owner === "player" ? player : enemy, defender);
  }
}

function shouldResolveProjectileHit(projectile, target) {
  if (projectile.visualOnly) return false;
  if (gameMode === "online" && onlineRole === "p1" && projectile.owner === "enemy" && target === player) {
    return false;
  }
  if (gameMode === "online" && onlineRole === "p2" && projectile.owner === "player" && target === enemy) {
    return false;
  }
  return true;
}

function projectileOverlapsTarget(projectile, target) {
  if (projectile.move === "cleave") {
    return lineCapsuleOverlapsRect(
      projectile.rangeStartX ?? projectile.x,
      projectile.rangeStartY ?? projectile.y,
      projectile.rangeEndX ?? projectile.x,
      projectile.rangeEndY ?? projectile.y,
      projectile.rangeRadius ?? Math.max(20, projectile.radius * 0.55),
      target
    );
  }
  const box = { x: projectile.x - projectile.radius, y: projectile.y - projectile.radius, w: projectile.radius * 2, h: projectile.radius * 2 };
  return rectsOverlap(box, target);
}

function projectileHitsTerrain(projectile) {
  if (projectile.move === "cleave") return false;
  const radius = projectile.radius || 0;
  if (projectile.x - radius <= 0 || projectile.x + radius >= STAGE_W) return true;
  if (projectile.y - radius <= 0 || projectile.y + radius >= GROUND) return true;
  return false;
}

function getProjectileInfinityDefender(projectile) {
  if (!projectile || projectile.move === "cleave") return null;
  const defender = projectile.owner === "player" ? enemy : player;
  return isInfinityActive(defender) ? defender : null;
}

function restoreProjectileInfinitySpeed(projectile) {
  if (!projectile.infinityWasSlowed) return;
  if (Number.isFinite(projectile.baseVx)) projectile.vx = projectile.baseVx;
  if (Number.isFinite(projectile.baseVy)) projectile.vy = projectile.baseVy;
  projectile.infinityWasSlowed = false;
}

function applyInfinitySlowToProjectile(projectile) {
  const defender = getProjectileInfinityDefender(projectile);
  if (!defender) {
    restoreProjectileInfinitySpeed(projectile);
    return;
  }
  if (!Number.isFinite(projectile.baseVx)) projectile.baseVx = projectile.vx;
  if (!Number.isFinite(projectile.baseVy)) projectile.baseVy = projectile.vy || 0;
  const center = getFighterCenter(defender);
  const fieldX = center.x;
  const fieldY = center.y - 6;
  const nextX = projectile.x + projectile.vx;
  const nextY = projectile.y + (projectile.vy || 0);
  const distance = distancePointToSegment(fieldX, fieldY, projectile.x, projectile.y, nextX, nextY);
  if (distance > INFINITY_RADIUS + (projectile.radius || 0)) {
    restoreProjectileInfinitySpeed(projectile);
    return;
  }
  projectile.vx = projectile.baseVx * INFINITY_PROJECTILE_SLOW;
  projectile.vy = projectile.baseVy * INFINITY_PROJECTILE_SLOW;
  projectile.infinityWasSlowed = true;
  projectile.infinitySlowTicks = 8;
  if (!projectile.visualOnly) {
    defender.ce = Math.max(0, defender.ce - INFINITY_PROJECTILE_DRAIN);
    if (defender.ce <= 0) defender.infinityActive = false;
  }
}

function updateProjectiles() {
  const activeProjectiles = [];
  for (const p of projectiles) {
    p.visualSpawnAge = (p.visualSpawnAge || 0) + 1; // VISUAL_SPAWN_AGE_INCREMENT_PATCH
    if (p.move === "cleave") {
      p.vx *= 0.84;
      p.vy = (p.vy || 0) * 0.84;
    }
    if (p.infinitySlowTicks > 0) p.infinitySlowTicks -= 1;
    applyInfinitySlowToProjectile(p);
    const stepX = p.vx || 0;
    const stepY = p.vy || 0;
    p.x += stepX;
    p.y += stepY;
    if (p.ultimateProjectile && (p.move === "purple" || p.move === "worldSlash")) {
      if (breakPlatformsNear(p.x, p.y, (p.radius || 36) + 28)) {
        spawnGroundErase(p.x, Math.max(72, (p.radius || 36) + 38));
        spawnHitSpark(p.x, p.y, p.dir || 1, p.move === "purple" ? "purple" : "slash");
      }
    }
    if (Number.isFinite(p.maxTravel)) p.traveled = (p.traveled || 0) + Math.hypot(stepX, stepY);
    p.life -= 1;
    const target = p.owner === "player" ? enemy : player;
    if (shouldResolveProjectileHit(p, target) && !p.hit && projectileOverlapsTarget(p, target)) applyProjectileHit(p, target);
    if (p.hit) continue;

    if (p.move !== "cleave" && Number.isFinite(p.maxTravel) && (p.traveled || 0) >= p.maxTravel) {
      if (Number.isFinite(p.rangeEndX)) p.x = p.rangeEndX;
      if (Number.isFinite(p.rangeEndY)) p.y = p.rangeEndY;
      if (p.move === "fuga") spawnFugaExplosion(p, true);
      else {
        if (p.move === "purple") spawnGroundErase(p.x, 96);
        spawnProjectileDisperse(p);
      }
      continue;
    }

    if (projectileHitsTerrain(p)) {
      if (p.move === "fuga") spawnFugaExplosion(p, true);
      else {
        if (p.move === "purple") spawnGroundErase(p.x, 96);
        spawnProjectileDisperse(p);
      }
      continue;
    }

    const tooFar = p.x <= -80 || p.x >= STAGE_W + 80 || p.y <= -100 || p.y >= H + 100;
    const expired = p.life <= 0;
    if (tooFar || expired) {
      if (p.move === "fuga") spawnFugaExplosion(p, true);
      else {
        if (p.move === "purple") spawnGroundErase(p.x, 88);
        spawnProjectileDisperse(p);
      }
      continue;
    }
    activeProjectiles.push(p);
  }
  projectiles = activeProjectiles;
}

function spawnProjectileDisperse(projectile) {
  if (projectile.move === "cleave") return;
  projectileDisperses.push({
    x: projectile.x,
    y: projectile.y,
    dir: projectile.dir,
    angle: projectile.angle,
    move: projectile.move,
    radius: projectile.radius,
    life: 20,
    maxLife: 20,
    spin: Math.random() * Math.PI * 2
  });
}

function spawnFugaExplosion(projectile, damageTarget = true) {
  const radius = projectile.explosionRadius || techniqueMoves.fuga.explosionRadius;
  fugaExplosions.push({
    x: projectile.x,
    y: projectile.y,
    radius,
    dir: projectile.dir,
    life: 34,
    maxLife: 34,
    spin: Math.random() * Math.PI * 2
  });

  if (damageTarget) {
    const target = projectile.owner === "player" ? enemy : player;
    if (shouldResolveProjectileHit(projectile, target)) applyFugaExplosionDamage(projectile, target);
  }
}

function spawnHitSpark(x, y, dir, kind) {
  const color = kind === "block" ? "#bae6fd" : kind === "purple" ? "#d8b4fe" : kind === "fuga" ? "#fb923c" : kind === "cleave" || kind === "slash" ? "#7f1d1d" : kind === "heavy" || kind === "red" ? "#fb7185" : kind === "blue" ? "#38bdf8" : "#fde68a";
  const life = kind === "purple" ? 24 : kind === "red" ? 20 : kind === "fuga" ? 18 : 14;
  hitSparks.push({ x, y, dir, kind, color, life, maxLife: life });
}

function spawnShieldBreakEffect(f) {
  const center = getFighterCenter(f);
  const shrine = f.technique === "shrine";
  shieldBreakEffects.push({
    x: center.x,
    y: center.y - 4,
    color: shrine ? "#ef4444" : "#7dd3fc",
    darkColor: shrine ? "#020617" : "#e0f2fe",
    life: 24,
    maxLife: 24,
    spin: Math.random() * Math.PI * 2
  });
}

function spawnTeleportEffect(start, end, dir) {
  teleportEffects.push({
    startX: start.x,
    startY: start.y,
    endX: end.x,
    endY: end.y,
    dir,
    life: 24,
    maxLife: 24
  });
}

function updateHitSparks() {
  hitSparks.forEach((spark) => {
    spark.life -= 1;
    spark.x += spark.dir * 0.8;
    spark.y -= 0.15;
  });
  hitSparks = hitSparks.filter((spark) => spark.life > 0);
  projectileDisperses.forEach((effect) => {
    effect.life -= 1;
    effect.x += effect.dir * 0.12;
  });
  projectileDisperses = projectileDisperses.filter((effect) => effect.life > 0);
  teleportEffects.forEach((effect) => {
    effect.life -= 1;
  });
  teleportEffects = teleportEffects.filter((effect) => effect.life > 0);
  fugaExplosions.forEach((effect) => {
    effect.life -= 1;
  });
  fugaExplosions = fugaExplosions.filter((effect) => effect.life > 0);
  shieldBreakEffects.forEach((effect) => {
    effect.life -= 1;
  });
  shieldBreakEffects = shieldBreakEffects.filter((effect) => effect.life > 0);
  worldSlashEffects.forEach((effect) => {
    effect.life -= 1;
  });
  worldSlashEffects = worldSlashEffects.filter((effect) => effect.life > 0);
  groundEraseEffects.forEach((effect) => {
    effect.life -= 1;
  });
  groundEraseEffects = groundEraseEffects.filter((effect) => effect.life > 0);
  ultimateChargeEffects.forEach((effect) => {
    effect.life -= 1;
  });
  ultimateChargeEffects = ultimateChargeEffects.filter((effect) => effect.life > 0);
  if (ultimateScreenEffect.ticks > 0) ultimateScreenEffect.ticks -= 1;
  if (cinematicZoomTicks > 0) cinematicZoomTicks -= 1;
}

function updatePlayer() {
  if (gameOver) return;
  updateBluePunchCharge(player, isPressed("t", "keyt"));
  const canControl = player.stun <= 0 && !player.knockdown && (!isSpecialLocked(player) || player.ultimateAiming);
  setShielding(player, isPressed("q", "keyq"));
  setRctHealing(player, isPressed("r", "keyr"));

  if (canControl && player.dodging <= 0 && !player.blocking) {
    const left = isPressed("a", "keya");
    const right = isPressed("d", "keyd");
    const move = (right ? 1 : 0) - (left ? 1 : 0);
    const backingAway = move !== 0 && move === -player.dir;
    const chargeSlow = player.fugaAiming ? 0.26 : player.chargingTechnique ? 0.28 : 1;
    const rctSlow = player.rctHealing ? RCT_MOVE_MULTIPLIER : 1;
    const moveSpeed = player.speed * (backingAway ? 0.82 : 1) * chargeSlow * rctSlow;
    if (player.attacking) {
      if (move !== 0) player.vx = move * moveSpeed * 0.48;
    } else {
      player.vx = move * moveSpeed;
    }
  } else if (player.grounded && player.dodging <= 0) {
    player.vx *= 0.72;
  }
}

function updateRivalPlayer() {
  if (gameOver) return;
  updateBluePunchCharge(enemy, false);
  const canControl = enemy.stun <= 0 && !enemy.knockdown && (!isSpecialLocked(enemy) || enemy.ultimateAiming);
  setShielding(enemy, isPressed("p", "keyp"));

  if (canControl && enemy.dodging <= 0 && !enemy.blocking) {
    const left = isPressed("arrowleft");
    const right = isPressed("arrowright");
    const move = (right ? 1 : 0) - (left ? 1 : 0);
    const backingAway = move !== 0 && move === -enemy.dir;
    const chargeSlow = enemy.fugaAiming ? 0.26 : enemy.chargingTechnique ? 0.28 : 1;
    const moveSpeed = enemy.speed * (backingAway ? 0.82 : 1) * chargeSlow;
    if (enemy.attacking) {
      if (move !== 0) enemy.vx = move * moveSpeed * 0.48;
    } else {
      enemy.vx = move * moveSpeed;
    }
  } else if (enemy.grounded && enemy.dodging <= 0) {
    enemy.vx *= 0.72;
  }
}

function applyRemoteRivalInput() {
  if (gameOver) return;
  updateBluePunchCharge(enemy, Boolean(remoteInput.bluePunch));
  const canControl = enemy.stun <= 0 && !enemy.knockdown && (!isSpecialLocked(enemy) || enemy.ultimateAiming);
  setShielding(enemy, remoteInput.block);
  setRctHealing(enemy, remoteInput.rct);

  if (canControl && enemy.dodging <= 0 && !enemy.blocking) {
    const move = (remoteInput.right ? 1 : 0) - (remoteInput.left ? 1 : 0);
    const backingAway = move !== 0 && move === -enemy.dir;
    const chargeSlow = enemy.fugaAiming ? 0.26 : enemy.chargingTechnique ? 0.28 : 1;
    const rctSlow = enemy.rctHealing ? RCT_MOVE_MULTIPLIER : 1;
    const moveSpeed = enemy.speed * (backingAway ? 0.82 : 1) * chargeSlow * rctSlow;
    if (enemy.attacking) {
      if (move !== 0) enemy.vx = move * moveSpeed * 0.48;
    } else {
      enemy.vx = move * moveSpeed;
    }
  } else if (enemy.grounded && enemy.dodging <= 0) {
    enemy.vx *= 0.72;
  }
}

function updateRemoteRivalPlayer() {
  applyRemoteRivalInput();
}

function updateOnlineRivalSelf() {
  if (gameOver) return;
  const input = getOnlineInput();
  updateBluePunchCharge(enemy, Boolean(input.bluePunch));
  const canControl = enemy.stun <= 0 && !enemy.knockdown && (!isSpecialLocked(enemy) || enemy.ultimateAiming);
  setShielding(enemy, input.block);
  setRctHealing(enemy, input.rct);

  if (canControl && enemy.dodging <= 0 && !enemy.blocking) {
    const move = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const backingAway = move !== 0 && move === -enemy.dir;
    const chargeSlow = enemy.fugaAiming ? 0.26 : enemy.chargingTechnique ? 0.28 : 1;
    const rctSlow = enemy.rctHealing ? RCT_MOVE_MULTIPLIER : 1;
    const moveSpeed = enemy.speed * (backingAway ? 0.82 : 1) * chargeSlow * rctSlow;
    if (enemy.attacking) {
      if (move !== 0) enemy.vx = move * moveSpeed * 0.48;
    } else {
      enemy.vx = move * moveSpeed;
    }
  } else if (enemy.grounded && enemy.dodging <= 0) {
    enemy.vx *= 0.72;
  }
}

function getFighterCenter(f) {
  return {
    x: f.x + f.w / 2,
    y: f.y + f.h / 2
  };
}

function getCpuAimPoint(cpu) {
  const target = getFighterCenter(player);
  return {
    x: clampStageX(target.x + player.vx * cpu.prediction, 0),
    y: Math.max(76, Math.min(GROUND - 34, target.y - 10 + player.vy * cpu.prediction * 0.45))
  };
}

function getPlatformNearestX(x) {
  let best = null;
  let bestDistance = Infinity;
  for (const platform of getActivePlatforms()) {
    const center = platform.x + platform.w / 2;
    const distance = Math.abs(center - x);
    if (distance < bestDistance) {
      best = platform;
      bestDistance = distance;
    }
  }
  return best;
}

function cpuJumpToward(moveDir, highJump = false) {
  if (gameOver || enemy.stun > 0 || enemy.dodging > 0 || enemy.attacking || enemy.knockdown || !enemy.grounded) return false;
  enemy.vy = highJump ? -17.4 : -15.3;
  enemy.grounded = false;
  enemy.onPlatform = false;
  enemy.jumpsUsed = 1;
  enemy.vx = moveDir * enemy.speed * (highJump ? 1.45 : 1.2);
  return true;
}

function cpuAirHopToward(moveDir, lift = false) {
  if (gameOver || enemy.stun > 0 || enemy.dodging > 0 || enemy.attacking || enemy.knockdown || enemy.jumpsUsed >= 2) return false;
  enemy.vy = lift ? -8.4 : -5.6;
  enemy.jumpsUsed = 2;
  enemy.vx = moveDir * enemy.speed * (lift ? 2.25 : 2.0);
  return true;
}

function getIncomingProjectileThreat() {
  const center = getFighterCenter(enemy);
  return projectiles.some((projectile) => {
    if (projectile.owner !== "player" || projectile.visualOnly || projectile.hit) return false;
    const dx = center.x - projectile.x;
    const dy = center.y - projectile.y;
    const movingTowardEnemy = Math.sign(projectile.vx || projectile.aimX || projectile.dir) === Math.sign(dx || enemy.dir);
    return movingTowardEnemy && Math.abs(dx) < 240 && Math.abs(dy) < 96;
  });
}

function getCpuLimitlessChargeTarget() {
  if (cpuDifficulty === "hard") return 0.42 + Math.random() * 0.3;
  if (cpuDifficulty === "medium") return 0.24 + Math.random() * 0.24;
  return 0.12 + Math.random() * 0.16;
}

function updateCpuTechniqueCharge(cpu) {
  const aim = getCpuAimPoint(cpu);
  if (enemy.fugaAiming) {
    enemy.techniqueAim = aim;
    enemy.aiGoal = "technique";
    enemy.vx *= 0.62;
    const releaseAt = Math.min(FUGA_CHARGE_TICKS, enemy.cpuTechniqueReleaseTicks || FUGA_CHARGE_TICKS);
    if (enemy.fugaChargeTicks >= releaseAt) {
      startFuga(enemy, aim);
    }
    return true;
  }
  if (!enemy.chargingTechnique) return false;
  setFighterTechniqueAim(enemy, aim);
  enemy.aiGoal = "technique";
  enemy.vx *= 0.72;
  if ((enemy.cpuTechniqueReleaseTicks || 0) > 0 && enemy.chargeTicks >= enemy.cpuTechniqueReleaseTicks) {
    releaseTechniqueCharge(enemy, enemy.chargingTechnique, aim);
  }
  return true;
}

function tryCpuTechnique(cpu, distance, force = false) {
  if (enemy.chargingTechnique || enemy.fugaAiming || enemy.attacking || enemy.dodging > 0) return false;
  if (!force && Math.random() > cpu.techniqueChance) return false;

  const aim = getCpuAimPoint(cpu);
  let slot = 1;

  if (enemy.technique === "shrine") {
    const canFuga = distance > 260 && distance < 920 && canPrepareFuga(enemy);
    const fugaChance = cpuDifficulty === "hard" ? 0.34 : cpuDifficulty === "medium" ? 0.2 : 0.08;
    if (canFuga && (force || Math.random() < fugaChance) && prepareFuga(enemy, aim)) {
      enemy.cpuTechniqueReleaseTicks = FUGA_CHARGE_TICKS;
      return true;
    }
    if (!canStartTechnique(enemy)) return false;
    const canCleave = distance < 118 && enemy.ce >= getTechniqueCost(enemy, "cleave");
    const canSlash = distance < 860 && enemy.ce >= getTechniqueCost(enemy, "slash");
    if (canCleave && !force && (cpuDifficulty === "hard" || Math.random() < 0.42)) slot = 2;
    else if (canSlash) slot = 1;
    else return false;
  } else {
    if (!canStartTechnique(enemy)) return false;
    if (distance > 900) return false;
    const useRed = player.attacking || distance < 230 || (!force && Math.random() < (cpuDifficulty === "hard" ? 0.52 : 0.34));
    slot = useRed ? 2 : 1;
    const desiredCharge = getCpuLimitlessChargeTarget();
    const chargeTicks = Math.max(8, Math.round(desiredCharge * LIMITLESS_CHARGE_MAX_TICKS));
    startTechniqueCharge(enemy, slot, aim);
    if (!enemy.chargingTechnique) return false;
    enemy.cpuTechniqueReleaseTicks = chargeTicks;
    return true;
  }

  const cooldownBefore = enemy.techniqueCooldown;
  const ceBefore = enemy.ce;
  startTechnique(enemy, slot, 0, aim);
  return enemy.techniqueCooldown > cooldownBefore || enemy.ce < ceBefore;
}

function handleCpuPlatformMovement(cpu, distance, closeEnoughToHit) {
  const enemyCenter = getFighterCenter(enemy);
  const playerCenter = getFighterCenter(player);
  const playerAbove = player.y + player.h < enemy.y + enemy.h - 42;
  const shouldTakePlatform = playerAbove || (
    cpuDifficulty !== "easy" &&
    distance > 300 &&
    enemy.grounded &&
    Math.random() < cpu.platformChance * 0.025
  );
  if (!shouldTakePlatform || closeEnoughToHit) return false;

  const platform = getPlatformNearestX(playerCenter.x);
  if (!platform) return false;

  const targetX = playerAbove ? playerCenter.x : platform.x + platform.w / 2;
  const moveDir = Math.sign(targetX - enemyCenter.x) || enemy.dir;
  enemy.vx = moveDir * enemy.speed * cpu.approachSpeed;

  if (enemy.grounded && Math.abs(targetX - enemyCenter.x) < 285) {
    cpuJumpToward(moveDir, true);
  } else if (!enemy.grounded && enemy.jumpsUsed < 2 && enemy.vy > -1 && Math.random() < cpu.airHopChance) {
    cpuAirHopToward(moveDir, true);
  }

  return playerAbove;
}

function getCpuDodgeVector(threat = false) {
  if (threat) return normalizeDodgeVector(-enemy.dir, enemy.grounded ? -0.3 : 0);
  if (cpuDifficulty === "hard" && Math.random() < 0.38) return normalizeDodgeVector(-enemy.dir, -0.45);
  return normalizeDodgeVector(-enemy.dir, 0);
}

function markPracticeBotAttacked() {
  if (!pacifistBot || gameMode !== "cpu" || !enemy) return;
  enemy.practiceIdleTicks = 0;
}

function updatePracticeBot() {
  enemy.attacking = null;
  enemy.aiGoal = "practice";
  setShielding(enemy, false);

  const homeX = Number.isFinite(enemy.practiceHomeX) ? enemy.practiceHomeX : STAGE_W / 2 - enemy.w / 2;
  const centerDistance = homeX - enemy.x;
  const playerCloseAttack = player.attacking && Math.abs((player.x + player.w / 2) - (enemy.x + enemy.w / 2)) < 210;
  const incomingProjectile = projectiles.some((p) => p.owner === "player" && !p.visualOnly && !p.hit && Math.abs(p.x - (enemy.x + enemy.w / 2)) < 220 && Math.abs(p.y - (enemy.y + enemy.h / 2)) < 130);

  if (practiceSettings.stationaryDummy) {
    enemy.practiceIdleTicks = PRACTICE_BOT_RETURN_TICKS;
    enemy.dir = (player.x + player.w / 2) < (enemy.x + enemy.w / 2) ? -1 : 1;
    pinStationaryPracticeDummy(enemy);
    return;
  }

  if (enemy.hurt > 0 || enemy.stun > 0 || playerCloseAttack || incomingProjectile) {
    enemy.practiceIdleTicks = 0;
    return;
  }

  enemy.practiceIdleTicks = Math.min(PRACTICE_BOT_RETURN_TICKS, (enemy.practiceIdleTicks || 0) + 1);

  if (enemy.practiceIdleTicks < PRACTICE_BOT_RETURN_TICKS) {
    if (enemy.grounded && Math.abs(enemy.vx) < 0.35) enemy.vx = 0;
    return;
  }

  if (Math.abs(centerDistance) > 8) {
    const moveDir = Math.sign(centerDistance);
    enemy.dir = moveDir;
    const returnSpeed = Math.min(enemy.speed * 0.48, Math.abs(centerDistance) * 0.08);
    enemy.vx = moveDir * returnSpeed;
  } else if (enemy.grounded) {
    enemy.x = homeX;
    enemy.vx *= 0.55;
    if (Math.abs(enemy.vx) < 0.25) enemy.vx = 0;
  }
}

function updateCpuInfinity(incomingThreat) {
  if (enemy.technique !== "limitless" || enemy.rctHealing || enemy.ko || enemy.knockdown || enemy.stun > 0) return;
  const lowCe = enemy.ce < enemy.maxCe * 0.2;
  if (enemy.infinityActive) {
    if (!incomingThreat || lowCe) {
      const offChance = lowCe ? 0.18 : cpuDifficulty === "hard" ? 0.035 : 0.08;
      if (Math.random() < offChance) toggleInfinity(enemy);
    }
    return;
  }
  if (!incomingThreat || enemy.ce < INFINITY_MIN_CE || enemy.aiCooldown > 0) return;
  const chance = cpuDifficulty === "hard" ? 0.82 : cpuDifficulty === "medium" ? 0.55 : 0.28;
  if (Math.random() < chance) {
    toggleInfinity(enemy);
    enemy.aiGoal = "infinity";
    enemy.aiCooldown = Math.max(12, Math.round((cpuSettings[cpuDifficulty] || cpuSettings.medium).thinkCooldown * 0.7));
  }
}

function getCpuSpacing(cpu, distance) {
  const preferredRange = cpu.preferredRange || 420;
  const spacingBand = cpu.spacingBand || 90;
  return {
    preferredRange,
    tooClose: distance < preferredRange - spacingBand,
    tooFar: distance > preferredRange + spacingBand,
    inShootingRange: distance > 150 && distance < (enemy.technique === "shrine" ? 860 : 900)
  };
}

function tryCpuRct(cpu) {
  if (enemy.health >= enemy.maxHealth * 0.72 || enemy.ce < enemy.maxCe * RCT_MIN_CE_RATIO) return false;
  const dangerClose = Math.abs((player.x + player.w / 2) - (enemy.x + enemy.w / 2)) < 150;
  const chance = cpuDifficulty === "hard" ? 0.72 : cpuDifficulty === "medium" ? 0.42 : 0.14;
  if (dangerClose && cpuDifficulty !== "hard") return false;
  if (Math.random() > chance) return false;
  setRctHealing(enemy, true);
  if (!enemy.rctHealing) return false;
  enemy.aiGoal = "rct";
  enemy.aiCooldown = Math.max(28, Math.round(cpu.thinkCooldown * 1.8));
  return true;
}

function tryCpuBluePunch(cpu, distance) {
  if (enemy.technique !== "limitless" || !canChargeBluePunch(enemy)) return false;
  if (distance > 230) return false;
  const chance = cpuDifficulty === "hard" ? 0.5 : cpuDifficulty === "medium" ? 0.28 : 0.08;
  if (Math.random() > chance) return false;
  activateBluePunch(enemy);
  enemy.aiGoal = "bluePunch";
  enemy.aiCooldown = Math.max(18, cpu.thinkCooldown);
  return true;
}

function tryCpuTeleport(cpu, distance) {
  if (enemy.technique !== "limitless" || !canPrepareTeleport(enemy)) return false;
  const chance = cpuDifficulty === "hard" ? 0.32 : cpuDifficulty === "medium" ? 0.16 : 0.04;
  const wantsBehind = distance > 260 || player.attacking || enemy.health < enemy.maxHealth * 0.42;
  if (!wantsBehind || Math.random() > chance) return false;
  const playerCenter = getFighterCenter(player);
  const behindDir = player.dir || -enemy.dir;
  const destination = {
    x: playerCenter.x - behindDir * (82 + Math.random() * 28),
    y: playerCenter.y - (player.grounded ? 0 : 26)
  };
  if (!performTeleport(enemy, destination)) return false;
  enemy.dir = enemy.x + enemy.w / 2 < player.x + player.w / 2 ? 1 : -1;
  enemy.aiGoal = distance > 330 ? "approach" : "pressure";
  enemy.aiCooldown = Math.max(20, Math.round(cpu.thinkCooldown * 1.3));
  return true;
}

function tryCpuThrow(cpu, distance) {
  if (distance > BACK_THROW_RANGE + 8 || enemy.rctHealing) return false;
  const chance = cpuDifficulty === "hard" ? 0.38 : cpuDifficulty === "medium" ? 0.2 : 0.04;
  if (Math.random() > chance) return false;
  enemy.vx = enemy.dir * Math.max(enemy.speed * 0.45, 1);
  if (!startBackThrow(enemy, false)) return false;
  enemy.aiGoal = "throw";
  enemy.aiCooldown = Math.max(24, cpu.attackCooldown);
  return true;
}

function updateEnemyAi() {
  if (gameOver || isSpecialLocked(enemy) || enemy.stun > 0 || enemy.knockdown) return;
  enemy.aiCooldown -= 1;
  const cpu = cpuSettings[cpuDifficulty] || cpuSettings.medium;
  const distance = Math.abs((player.x + player.w / 2) - (enemy.x + enemy.w / 2));
  const lightAttack = getAttackSpec(enemy, "light");
  const lightHitDistance = lightAttack.range + (player.w + enemy.w) / 2 - 10;
  const closeEnoughToHit = distance <= lightHitDistance;
  const tooClose = distance < 54;
  const incomingThreat = getIncomingProjectileThreat();
  const verticalGap = (player.y + player.h) - (enemy.y + enemy.h);
  const spacing = getCpuSpacing(cpu, distance);
  setShielding(enemy, false);

  if (pacifistBot) {
    updatePracticeBot();
    return;
  }

  if (enemy.rctHealing) {
    const away = distance < 250 ? -enemy.dir : Math.sin(frame * 0.05) > 0 ? 1 : -1;
    enemy.vx = away * enemy.speed * 0.25;
    if (enemy.health >= enemy.maxHealth * 0.96 || enemy.ce < enemy.maxCe * 0.08 || incomingThreat) setRctHealing(enemy, false);
    return;
  }

  if (updateCpuTechniqueCharge(cpu)) return;
  updateCpuInfinity(incomingThreat);
  if (enemy.ultimateMeter >= MAX_ULTIMATE && enemy.aiCooldown <= 0) {
    const ultimateChance = cpuDifficulty === "hard" ? 0.18 : cpuDifficulty === "medium" ? 0.08 : 0.025;
    const goodRange = enemy.technique === "shrine" ? distance > 120 : distance > 260;
    if (goodRange && Math.random() < ultimateChance && startUltimate(enemy)) {
      enemy.aiGoal = "ultimate";
      enemy.aiCooldown = cpu.attackCooldown + 48;
      return;
    }
  }

  if (enemy.attacking) {
    if (enemy.hasHit && enemy.comboChainTimer > 0 && !enemy.queuedAttack && Math.random() < cpu.comboChance) {
      const canLight = canChainAttack(enemy, "light");
      const shouldLight = canLight && Math.random() < (enemy.technique === "shrine" ? 0.78 : 0.55);
      startAttack(enemy, shouldLight ? "light" : "heavy");
    }
    return;
  }
  if (enemy.dodging > 0) return;

  if (incomingThreat && enemy.aiCooldown <= 0) {
    if (Math.random() < cpu.dodgeChance + (cpuDifficulty === "hard" ? 0.22 : 0.08)) {
      enemy.aiGoal = "dodge";
      enemy.aiCooldown = Math.max(12, cpu.thinkCooldown);
    } else if (Math.random() < cpu.blockChance) {
      enemy.aiGoal = "block";
      enemy.aiCooldown = Math.max(16, cpu.thinkCooldown);
    }
  }

  if (enemy.aiCooldown <= 0) {
    if (tryCpuRct(cpu)) {
      return;
    } else if (tryCpuTeleport(cpu, distance)) {
      return;
    } else if (tryCpuBluePunch(cpu, distance)) {
      return;
    } else if (tryCpuThrow(cpu, distance)) {
      return;
    } else if (player.attacking && distance < cpu.blockDistance && Math.random() < cpu.blockChance) {
      enemy.aiGoal = "block";
      enemy.aiCooldown = cpu.thinkCooldown;
    } else if (closeEnoughToHit && Math.random() < cpu.attackChance) {
      enemy.aiGoal = Math.random() < cpu.heavyChance ? "heavy" : "light";
      enemy.aiCooldown = cpu.attackCooldown;
    } else if (spacing.inShootingRange && tryCpuTechnique(cpu, distance, !closeEnoughToHit && Math.random() < (cpuDifficulty === "hard" ? 0.62 : 0.42))) {
      enemy.aiGoal = "technique";
      enemy.aiCooldown = cpu.techniqueCooldown;
    } else if (handleCpuPlatformMovement(cpu, distance, closeEnoughToHit)) {
      enemy.aiGoal = "platform";
      enemy.aiCooldown = cpu.thinkCooldown;
    } else if (tooClose && Math.random() < (cpuDifficulty === "hard" ? 0.5 : 0.35)) {
      enemy.aiGoal = "retreat";
      enemy.aiCooldown = Math.max(8, Math.round(cpu.thinkCooldown * 0.55));
    } else if (closeEnoughToHit && Math.random() < cpu.dodgeChance) {
      enemy.aiGoal = "dodge";
      enemy.aiCooldown = Math.max(18, cpu.thinkCooldown);
    } else if (distance > 260 && cpuDifficulty !== "easy" && Math.random() < cpu.dashChance) {
      enemy.aiGoal = "dash";
      enemy.aiCooldown = cpu.thinkCooldown + 8;
    } else if ((player.grounded === false || Math.abs(verticalGap) > 70 || !closeEnoughToHit) && Math.random() < cpu.jumpChance) {
      enemy.aiGoal = "jump";
      enemy.aiCooldown = cpu.thinkCooldown + 8;
    } else {
      enemy.aiGoal = closeEnoughToHit && cpuDifficulty !== "easy" ? "pressure" : spacing.tooFar ? "approach" : "range";
      enemy.aiCooldown = cpu.thinkCooldown;
    }
  }

  if (enemy.aiGoal === "block" && enemy.grounded) {
    setShielding(enemy, true);
    enemy.vx *= 0.65;
    return;
  }

  if (enemy.aiGoal === "dodge") {
    startDodge(enemy, getCpuDodgeVector(incomingThreat));
    return;
  }

  if (enemy.aiGoal === "dash") {
    startDash(enemy);
    enemy.aiGoal = "approach";
    return;
  }

  if (enemy.aiGoal === "jump") {
    if (enemy.grounded) {
      cpuJumpToward(enemy.dir, player.y + player.h < enemy.y + enemy.h - 36);
      return;
    }
    if (enemy.jumpsUsed < 2 && Math.random() < cpu.airHopChance) {
      cpuAirHopToward(enemy.dir, player.y + player.h < enemy.y + enemy.h - 36);
      return;
    }
    enemy.aiGoal = "approach";
  }

  if (enemy.aiGoal === "platform" && handleCpuPlatformMovement(cpu, distance, closeEnoughToHit)) return;

  if (enemy.aiGoal === "light" || enemy.aiGoal === "heavy") {
    if (closeEnoughToHit) {
      startAttack(enemy, enemy.aiGoal);
      return;
    }
    enemy.aiGoal = "approach";
  }

  if (tooClose || enemy.aiGoal === "retreat") {
    enemy.vx = -enemy.dir * enemy.speed * (cpu.retreatSpeed || 0.7);
  } else if (enemy.aiGoal === "pressure") {
    const sway = Math.sin(frame * 0.12) * cpu.strafeSpeed;
    enemy.vx = enemy.dir * enemy.speed * (0.22 + sway * 0.18);
  } else if (enemy.aiGoal === "range" || (!spacing.tooFar && !spacing.tooClose)) {
    const sway = Math.sin(frame * 0.1) * enemy.speed * cpu.strafeSpeed;
    const correction = distance < spacing.preferredRange ? -enemy.dir * enemy.speed * 0.04 : enemy.dir * enemy.speed * 0.18;
    enemy.vx = sway + correction;
  } else {
    enemy.vx = closeEnoughToHit
      ? Math.sin(frame * 0.08) * enemy.speed * cpu.strafeSpeed
      : enemy.dir * enemy.speed * cpu.approachSpeed;
  }
}

function updateFighter(f, opponent) {
  f.rctCooldown = Math.max(0, (f.rctCooldown || 0) - 1);

  if (!f.ko) f.dir = f.x + f.w / 2 < opponent.x + opponent.w / 2 ? 1 : -1;
  updateBluePunchTimers(f);
  if (f.gojoPushPullCooldown > 0) f.gojoPushPullCooldown -= 1;

  if (f.ko) {
    f.attacking = null;
    f.blocking = false;
    f.infinityActive = false;
    f.fugaAiming = false;
    f.fugaChargeTicks = 0;
    f.teleportAiming = false;
    resetBluePunchState(f, true);
    f.rctHealing = false;
    f.ultimateStartup = 0;
    f.ultimateRecovery = 0;
    f.ultimateMove = null;
    f.ultimateHasReleased = false;
    updateShield(f);
    f.dodging = 0;
    f.vy += GRAVITY;
    f.x += f.vx;
    f.y += f.vy;
    f.vx *= f.grounded ? 0.82 : 0.96;
    f.koRotation = Math.min(Math.PI / 2, f.koRotation + 0.075);

    if (f.y + f.h >= GROUND) {
      f.y = GROUND - f.h;
      f.vy = 0;
      f.grounded = true;
      f.onPlatform = false;
      f.lying = true;
      f.vx *= 0.7;
      f.koTimer += 1;
    } else {
      f.grounded = false;
    }

    f.x = clampStageX(f.x, f.w);
    return;
  }

  if (isHeldBySpecial(f)) {
    f.attacking = null;
    f.blocking = false;
    f.rctHealing = false;
    f.ultimateStartup = 0;
    f.ultimateRecovery = 0;
    f.ultimateMove = null;
    f.ultimateHasReleased = false;
    f.chargingTechnique = 0;
    f.fugaAiming = false;
    f.fugaChargeTicks = 0;
    f.teleportAiming = false;
    f.dodging = 0;
    f.vx = 0;
    f.vy = 0;
    if (f.barrageHeldTimer > 0) {
      f.barrageHeldTimer -= 1;
      if (Number.isFinite(f.barrageLockY)) f.y = f.barrageLockY;
    }
    if (f.grabHeldTimer > 0) {
      f.grabHeldTimer -= 1;
      if (Number.isFinite(f.grabLockY)) f.y = f.grabLockY;
    }
    f.stun = Math.max(f.stun, 4);
    return;
  }

  if (f.stun > 0) f.stun -= 1;
  if (f.hurt > 0) f.hurt -= 1;
  if (f.gojoPushPullTimer > 0) {
    f.gojoPushPullTimer -= 1;
    f.stun = Math.max(f.stun, f.gojoPushPullTimer);
    f.hurt = Math.max(f.hurt, 4);
    // Do not pin or zero velocity here. The finisher keeps the opponent stunned,
    // but knockback from later hits/projectiles can still move them normally.
    if (f.gojoPushPullTimer <= 0) {
      f.gojoPushPullAnchorX = null;
      f.gojoPushPullAnchorY = null;
    }
  }
  if (f.dodging > 0) f.dodging -= 1;
  if (f.dodgeCooldown > 0) f.dodgeCooldown -= 1;
  if (f.punchCooldown > 0) f.punchCooldown -= 1;
  if (f.shieldHitFlash > 0) f.shieldHitFlash -= 1;
  if (f.teleportCooldown > 0) f.teleportCooldown -= 1;
  if (f.fugaCooldown > 0) f.fugaCooldown -= 1;
  if (f.knockdownTimer > 0) f.knockdownTimer -= 1;
  if (f.comboChainTimer > 0) f.comboChainTimer -= 1;
  if (f.comboTimer > 0) {
    f.comboTimer -= 1;
    if (f.comboTimer <= 0) resetCombo(f);
  }
  if (f.knockdown && f.grounded && f.knockdownTimer <= 0) f.knockdown = false;
  if (f.techniqueCooldown > 0) f.techniqueCooldown -= 1;
  updateUltimateState(f);
  drainBlockingUltimate(f);
  if (f.teleportAiming && (!canPrepareTeleport(f) || f.ce < GOJO_TELEPORT_COST)) f.teleportAiming = false;
  if (f.fugaAiming && !canMaintainFugaCharge(f)) {
    f.fugaAiming = false;
    f.fugaChargeTicks = 0;
  }
  if (!f.rctHealing && f.ce < f.maxCe) {
    const lowCeBonus = f.ce < f.maxCe * 0.35 ? f.ceLowRegenBonus : 0;
    f.ce = Math.min(f.maxCe, f.ce + f.ceRegenRate + lowCeBonus);
  }
  updateShield(f);
  updateInfinity(f);
  updateRct(f);
  if (f.fugaAiming) {
    f.fugaChargeTicks = Math.min(FUGA_CHARGE_TICKS, (f.fugaChargeTicks || 0) + 1);
    f.blocking = false;
  }
  if (f.chargingTechnique) {
    if (f.ko || f.blocking || f.dodging > 0) {
      f.chargingTechnique = 0;
      f.chargeTicks = 0;
      f.cpuTechniqueReleaseTicks = 0;
    } else {
      f.chargeTicks = f.technique === "limitless"
        ? Math.min(LIMITLESS_CHARGE_MAX_TICKS, f.chargeTicks + 1)
        : 0;
      f.vx *= 0.88;
    }
  }

  if (f.attacking) {
    const attack = getAttackSpec(f);
    f.attackFrame += 1;
    f.vx *= 0.92;
    if (f.attackFrame > attack.windup + attack.active + attack.recovery) {
      const endedAttack = f.attacking;
      const didHit = f.hasHit;
      const nextAttack = f.queuedAttack;
      const canStartQueued = nextAttack && canChainAttack(f, nextAttack);
      f.attacking = null;
      f.attackFrame = 0;
      f.hasHit = false;
      f.queuedAttack = null;
      if (endedAttack === "backThrow" && !didHit) f.punchCooldown = Math.max(f.punchCooldown || 0, Math.round(BACK_THROW_COOLDOWN_TICKS * 0.65));
      else if (f.pendingPunchCooldown) beginPunchCooldown(f);
      else if (canStartQueued) beginAttack(f, nextAttack);
    }
  }
  if (!f.attacking && f.pendingPunchCooldown) beginPunchCooldown(f);

  const prevX = f.x;
  const prevY = f.y;
  f.vy += GRAVITY;
  f.x += f.vx;
  f.y += f.vy;
  if (f.technique === "shrine" && f.grounded && Math.abs(f.vx) > 0.3 && !f.attacking && !f.blocking && f.stun <= 0 && f.dodging <= 0) {
    f.walkCycle = ((f.walkCycle || 0) + Math.abs(f.vx) * 0.065) % (Math.PI * 2);
  } else if (f.grounded && !f.attacking && !f.blocking) {
    f.walkCycle = 0;
  }
  f.vx *= f.grounded ? 0.86 : 0.97;

  const wasGrounded = f.grounded;
  const landedOnPlatform = resolvePlatformCollisions(f, prevX, prevY);
  if (landedOnPlatform && f.knockdown && !wasGrounded) {
    f.stun = Math.max(f.stun, f.knockdownTimer, 16);
    f.knockdownTimer = Math.max(f.knockdownTimer, 16);
    f.vx *= 0.62;
  }
  if (f.y + f.h >= GROUND) {
    const landedFromKnockdown = f.knockdown && !wasGrounded;
    f.y = GROUND - f.h;
    f.vy = 0;
    f.grounded = true;
    f.onPlatform = false;
    f.jumpsUsed = 0;
    if (landedFromKnockdown) {
      f.stun = Math.max(f.stun, f.knockdownTimer, 16);
      f.knockdownTimer = Math.max(f.knockdownTimer, 16);
      f.vx *= 0.62;
    }
  } else if (!landedOnPlatform) {
    f.grounded = false;
    f.onPlatform = false;
  }

  f.x = clampStageX(f.x, f.w);
}

function keepFightersApart() {
  if (!rectsOverlap(player, enemy)) return;
  const playerCenter = player.x + player.w / 2;
  const enemyCenter = enemy.x + enemy.w / 2;
  const overlap = playerCenter < enemyCenter
    ? player.x + player.w - enemy.x
    : enemy.x + enemy.w - player.x;
  const push = overlap / 2 + 0.5;
  if (playerCenter < enemyCenter) {
    player.x -= push;
    enemy.x += push;
  } else {
    player.x += push;
    enemy.x -= push;
  }
  player.x = clampStageX(player.x, player.w);
  enemy.x = clampStageX(enemy.x, enemy.w);
}

function drawCity() {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#202b48");
  sky.addColorStop(0.52, "#7e5060");
  sky.addColorStop(1, "#191622");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, STAGE_W, H);

  ctx.fillStyle = "#ffd56d";
  ctx.beginPath();
  ctx.arc(760, 92, 42, 0, Math.PI * 2);
  ctx.fill();

  drawBuildings(0, 210, "#20283a");
  drawBuildings(46, 260, "#171d2d");
  drawBuildings(0, 318, "#101724");
  drawPlatforms();

  ctx.fillStyle = "#27202a";
  ctx.fillRect(0, GROUND, STAGE_W, H - GROUND);
  ctx.fillStyle = "#333545";
  ctx.fillRect(0, GROUND, STAGE_W, 12);
  ctx.fillStyle = "#f4c95d";
  for (let x = -40; x < STAGE_W; x += 130) {
    ctx.fillRect(x, 487, 72, 6);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fillRect(0, GROUND - 2, STAGE_W, 2);
}

function drawPlatforms() {
  for (const platform of getActivePlatforms()) {
    const metal = ctx.createLinearGradient(0, platform.y, 0, platform.y + platform.h);
    metal.addColorStop(0, "#cbd5e1");
    metal.addColorStop(0.18, "#9ca3af");
    metal.addColorStop(0.58, "#64748b");
    metal.addColorStop(1, "#374151");
    ctx.fillStyle = metal;
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fillRect(platform.x + 4, platform.y + 3, platform.w - 8, 3);
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(platform.x, platform.y + platform.h - 4, platform.w, 4);
    ctx.fillStyle = "#e5e7eb";
    for (let x = platform.x + 20; x < platform.x + platform.w - 12; x += 42) {
      ctx.beginPath();
      ctx.arc(x, platform.y + platform.h / 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#475569";
      ctx.beginPath();
      ctx.arc(x, platform.y + platform.h / 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e5e7eb";
    }
  }
}

function drawBuildings(offset, baseY, color) {
  ctx.fillStyle = color;
  const widths = [68, 82, 54, 98, 74, 62, 86, 58, 112, 70, 64, 96];
  let x = -120 + offset;
  for (let i = 0; x < STAGE_W + 120; i += 1) {
    const width = widths[i % widths.length];
    const height = 92 + ((i * 37) % 115);
    ctx.fillRect(Math.floor(x), baseY - height, width, height);
    ctx.fillStyle = "rgba(255, 224, 113, 0.42)";
    for (let wx = x + 14; wx < x + width - 12; wx += 22) {
      for (let wy = baseY - height + 18; wy < baseY - 18; wy += 28) {
        if ((Math.floor(wx + wy + i * 9) % 3) !== 0) ctx.fillRect(Math.floor(wx), Math.floor(wy), 8, 12);
      }
    }
    ctx.fillStyle = color;
    x += width + 16;
  }
}

function drawViewportBackdrop() {
  ctx.fillStyle = "#202b48";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#27202a";
  ctx.fillRect(0, GROUND, W, H - GROUND);
}

function getTechniqueSkin(f, flash) {
  if (flash) {
    return {
      body: "#ffffff",
      skin: "#ffffff",
      accent: "#ffffff",
      pants: "#ffffff",
      shoe: "#ffffff",
      hair: "#ffffff",
      eye: "#ffffff",
      mark: "#ffffff"
    };
  }

  if (isPracticeDummy(f)) {
    return {
      body: "#facc15",
      skin: "#fbbf24",
      accent: "#111827",
      pants: "#3f2f14",
      shoe: "#111827",
      hair: "#facc15",
      eye: "#111827",
      mark: "#111827"
    };
  }

  if (f.technique === "shrine") {
    return {
      body: "#f4d2c5",
      skin: "#ffd0a6",
      accent: "#dc2626",
      pants: "#2b1720",
      shoe: "#f8fafc",
      hair: "#f472b6",
      eye: "#111827",
      mark: "#7f1d1d"
    };
  }

  return {
    body: "#111827",
    skin: "#ffd0a6",
    accent: "#7dd3fc",
    pants: "#0f172a",
    shoe: "#f8fafc",
    hair: "#f8fafc",
    eye: "#020617",
    mark: "#38bdf8"
  };
}

function drawInfinityField(f) {
  if (!isInfinityActive(f)) {
    f.infinityVisualAge = 0;
    return;
  }

  f.infinityVisualAge = Math.min(14, (f.infinityVisualAge || 0) + 1);

  const center = getFighterCenter(f);
  const fieldY = center.y - 8;
  const grow = Math.min(1, f.infinityVisualAge / 14);
  const easedGrow = 1 - Math.pow(1 - grow, 3);
  const pulse = 1 + Math.sin((f.infinityPulse || frame) * 0.16) * 0.045;
  const radius = INFINITY_RADIUS * pulse * easedGrow;
  const ceRatio = Math.max(0, Math.min(1, f.ce / f.maxCe));
  const spin = frame * 0.035;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = Math.min(1, 0.2 + easedGrow * 0.8);

  const glow = ctx.createRadialGradient(center.x, fieldY, Math.max(1, radius * 0.12), center.x, fieldY, Math.max(2, radius * 1.18));
  glow.addColorStop(0, `rgba(224, 242, 254, ${0.10 + ceRatio * 0.05})`);
  glow.addColorStop(0.42, `rgba(56, 189, 248, ${0.12 + ceRatio * 0.06})`);
  glow.addColorStop(0.78, "rgba(37, 99, 235, 0.08)");
  glow.addColorStop(1, "rgba(14, 165, 233, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(center.x, fieldY, Math.max(1, radius * 1.2), 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 3; i += 1) {
    const r = radius * (0.72 + i * 0.16);
    ctx.strokeStyle = `rgba(191, 219, 254, ${0.42 - i * 0.08})`;
    ctx.lineWidth = 2 + i * 0.9;
    ctx.setLineDash(i === 1 ? [13, 9] : [7, 13]);
    ctx.lineDashOffset = -(frame * (0.65 + i * 0.25));
    ctx.beginPath();
    ctx.ellipse(center.x, fieldY, Math.max(1, r * (1 + i * 0.02)), Math.max(1, r * (0.88 + i * 0.03)), spin * (i + 1), 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(125, 211, 252, 0.7)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 7; i += 1) {
    const a = frame * 0.035 + i * Math.PI * 2 / 7;
    const x = center.x + Math.cos(a) * radius * 0.85;
    const y = fieldY + Math.sin(a) * radius * 0.72;
    ctx.beginPath();
    ctx.arc(x, y, 2.2 + Math.sin(frame * 0.1 + i) * 0.9, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}

function drawRctEffect(f) {
  if (!f || !f.rctHealing) return;
  const center = getFighterCenter(f);
  const pulse = 1 + Math.sin(frame * 0.22) * 0.08;

  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.68)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(center.x, center.y - 2, 38 * pulse, -0.4, Math.PI * 1.25);
  ctx.stroke();
  ctx.strokeStyle = "rgba(248, 250, 252, 0.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(center.x - 7, center.y - 46);
  ctx.lineTo(center.x + 7, center.y - 46);
  ctx.moveTo(center.x, center.y - 53);
  ctx.lineTo(center.x, center.y - 39);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  ctx.beginPath();
  ctx.ellipse(center.x, center.y - 8, 44 * pulse, 58 * pulse, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function shouldShowTeleportPreview(f) {
  if (!f || !f.teleportAiming || f.technique !== "limitless") return false;
  if (gameMode === "online") return onlineRole === "p2" ? f === enemy : f === player;
  return f === player;
}

function drawTeleportPreview(f) {
  if (!shouldShowTeleportPreview(f)) return;
  const origin = getFighterCenter(f);
  const destination = getTeleportDestination(f, f.techniqueAim);
  const pulse = 1 + Math.sin(frame * 0.24) * 0.08;
  ctx.save();
  ctx.globalAlpha = 0.82;
  const beam = ctx.createLinearGradient(origin.x, origin.y, destination.x, destination.y);
  beam.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  beam.addColorStop(0.35, "rgba(125, 211, 252, 0.86)");
  beam.addColorStop(1, "rgba(37, 99, 235, 0.96)");
  ctx.strokeStyle = beam;
  ctx.lineWidth = 8;
  ctx.setLineDash([18, 11]);
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(destination.x, destination.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(224, 242, 254, 0.96)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(destination.x, destination.y);
  ctx.stroke();

  ctx.fillStyle = "rgba(14, 165, 233, 0.18)";
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, 24 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(125, 211, 252, 0.95)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(destination.x, destination.y, 28 * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.86)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(destination.x, destination.y, 16 + Math.sin(frame * 0.32) * 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(56, 189, 248, 0.24)";
  ctx.beginPath();
  ctx.arc(destination.x, destination.y, 20 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function shouldShowFugaPreview(f) {
  if (!f || !f.fugaAiming || f.technique !== "shrine") return false;
  if (gameMode === "online") return onlineRole === "p2" ? f === enemy : f === player;
  return f === player;
}

function drawFugaAimPreview(f) {
  if (!shouldShowFugaPreview(f)) return;
  const move = "fuga";
  const spec = techniqueMoves.fuga;
  const chargeRatio = Math.max(0, Math.min(1, (f.fugaChargeTicks || 0) / FUGA_CHARGE_TICKS));
  const aimVector = getTechniqueAimVector(f, move, f.techniqueAim);
  const previewDistance = getAimPreviewDistance(move, spec, 0, aimVector, f, spec.radius);
  const endX = aimVector.origin.x + aimVector.x * previewDistance;
  const endY = aimVector.origin.y + aimVector.y * previewDistance;
  const pulse = 1 + Math.sin(frame * 0.24) * 0.08;

  ctx.save();
  ctx.globalAlpha = 0.34 + chargeRatio * 0.32;
  const line = ctx.createLinearGradient(aimVector.origin.x, aimVector.origin.y, endX, endY);
  line.addColorStop(0, "rgba(254, 240, 138, 0.8)");
  line.addColorStop(0.45, "rgba(249, 115, 22, 0.88)");
  line.addColorStop(1, "rgba(127, 29, 29, 0.92)");
  ctx.strokeStyle = line;
  ctx.lineWidth = 4 + chargeRatio * 3;
  ctx.lineCap = "round";
  ctx.setLineDash([18, 12]);
  ctx.beginPath();
  ctx.moveTo(aimVector.origin.x, aimVector.origin.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.translate(endX, endY);
  ctx.rotate(aimVector.angle);
  ctx.fillStyle = "rgba(2, 6, 23, 0.78)";
  ctx.beginPath();
  ctx.moveTo(-34, -7);
  ctx.lineTo(22, -7);
  ctx.lineTo(36, 0);
  ctx.lineTo(22, 7);
  ctx.lineTo(-34, 7);
  ctx.lineTo(-22, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(254, 240, 138, 0.86)";
  ctx.beginPath();
  ctx.moveTo(-22, -3);
  ctx.lineTo(20, -3);
  ctx.lineTo(30, 0);
  ctx.lineTo(20, 3);
  ctx.lineTo(-22, 3);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(249, 115, 22, 0.88)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-36, -15);
  ctx.lineTo(-18, 0);
  ctx.lineTo(-36, 15);
  ctx.stroke();

  ctx.rotate(-aimVector.angle);
  ctx.strokeStyle = chargeRatio >= 1 ? "rgba(254, 240, 138, 0.74)" : "rgba(251, 146, 60, 0.36)";
  ctx.lineWidth = 3 + chargeRatio * 3;
  ctx.beginPath();
  ctx.arc(0, 0, spec.explosionRadius * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = chargeRatio >= 1 ? "rgba(254, 240, 138, 0.12)" : "rgba(249, 115, 22, 0.06)";
  ctx.beginPath();
  ctx.arc(0, 0, spec.explosionRadius * 0.72 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(aimVector.angle);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.75})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 26, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * chargeRatio);
  ctx.stroke();
  ctx.restore();
}


function shouldShowUltimateAimPreview(f) {
  if (!f || !f.ultimateAiming) return false;
  if (gameMode === "online") return onlineRole === "p2" ? f === enemy : f === player;
  return f === player;
}

function drawUltimateAimPreview(f) {
  if (!shouldShowUltimateAimPreview(f)) return;
  const kind = f.ultimateMove || (f.technique === "shrine" ? "worldSlash" : "hollowPurple");
  const moveForAim = kind === "worldSlash" ? "slash" : "blue";
  const aimVector = getTechniqueAimVector(f, moveForAim, f.ultimateAimPoint || f.techniqueAim || mouseAimWorld);
  const center = getFighterCenter(f);
  const chargeRatio = Math.max(0, Math.min(1, (f.ultimateAimTicks || 0) / ULT_AIM_HOLD_TICKS));
  const previewRange = STAGE_W * 0.9;
  const endX = aimVector.origin.x + aimVector.x * previewRange;
  const endY = aimVector.origin.y + aimVector.y * previewRange;
  const pulse = 1 + Math.sin(frame * 0.22) * 0.07;

  ctx.save();
  ctx.globalAlpha = ULT_AIM_PREVIEW_ALPHA;
  ctx.lineCap = "round";
  ctx.setLineDash([22, 14]);
  ctx.strokeStyle = kind === "worldSlash" ? "rgba(255, 255, 255, 0.9)" : "rgba(216, 180, 254, 0.9)";
  ctx.lineWidth = kind === "worldSlash" ? 8 : 6;
  ctx.beginPath();
  ctx.moveTo(aimVector.origin.x, aimVector.origin.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.translate(endX, endY);
  ctx.rotate(aimVector.angle);
  if (kind === "worldSlash") {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.96)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, 0, 48, -Math.PI * 0.7, Math.PI * 0.7);
    ctx.stroke();
    ctx.strokeStyle = "rgba(2, 6, 23, 0.96)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(5, 0, 42, -Math.PI * 0.66, Math.PI * 0.66);
    ctx.stroke();
  } else {
    ctx.globalCompositeOperation = "lighter";
    const glow = ctx.createRadialGradient(0, 0, 1, 0, 0, 84);
    glow.addColorStop(0, "rgba(255,255,255,0.9)");
    glow.addColorStop(0.35, "rgba(216,180,254,0.75)");
    glow.addColorStop(1, "rgba(124,58,237,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, 84, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
  ctx.restore();

  ctx.save();
  ctx.translate(center.x, center.y - 10);
  ctx.globalAlpha = 0.92;
  ctx.strokeStyle = chargeRatio >= 1 ? "rgba(255,255,255,0.95)" : kind === "worldSlash" ? "rgba(248,250,252,0.78)" : "rgba(216,180,254,0.78)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 58 * pulse, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * chargeRatio);
  ctx.stroke();
  ctx.strokeStyle = "rgba(2,6,23,0.44)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 66 * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawTeleportEffects() {
  for (const effect of teleportEffects) {
    const t = effect.life / effect.maxLife;
    const age = 1 - t;
    ctx.save();
    ctx.globalAlpha = t;

    const beam = ctx.createLinearGradient(effect.startX, effect.startY, effect.endX, effect.endY);
    beam.addColorStop(0, `rgba(224, 242, 254, ${0.9 * t})`);
    beam.addColorStop(0.5, `rgba(56, 189, 248, ${0.75 * t})`);
    beam.addColorStop(1, `rgba(37, 99, 235, ${0.95 * t})`);
    ctx.strokeStyle = beam;
    ctx.lineCap = "round";
    ctx.lineWidth = 14 * t + 2;
    ctx.beginPath();
    ctx.moveTo(effect.startX, effect.startY);
    ctx.lineTo(effect.endX, effect.endY);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * t})`;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([18 * t + 4, 10]);
    ctx.beginPath();
    ctx.moveTo(effect.startX, effect.startY);
    ctx.lineTo(effect.endX, effect.endY);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const point of [{ x: effect.startX, y: effect.startY }, { x: effect.endX, y: effect.endY }]) {
      const ring = 18 + age * 34;
      ctx.strokeStyle = `rgba(125, 211, 252, ${0.9 * t})`;
      ctx.lineWidth = 4 * t + 1;
      ctx.beginPath();
      ctx.arc(point.x, point.y, ring, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = `rgba(224, 242, 254, ${0.16 * t})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, ring * 0.72, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawSukunaKingPassiveEffect(f) {
  const passiveLevel = getSukunaPassiveLevel(f);
  if (!passiveLevel) return;
  const center = getFighterCenter(f);
  const intensity = passiveLevel >= 2 ? 1 : 0.58;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const groundY = f.y + f.h - 4;

  ctx.strokeStyle = `rgba(127, 29, 29, ${0.58 * intensity})`;
  ctx.lineWidth = passiveLevel >= 2 ? 4 : 3;
  ctx.setLineDash([16, 12]);
  ctx.lineDashOffset = -frame * 0.75;
  ctx.beginPath();
  ctx.ellipse(center.x, groundY, 36 + passiveLevel * 5, 8, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  for (let i = 0; i < 7; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const sway = Math.sin(frame * 0.11 + i * 1.7) * 4;
    const baseX = center.x + (i - 3) * 12 + sway;
    const height = (passiveLevel >= 2 ? 36 : 26) + (i % 3) * 7;
    ctx.fillStyle = i % 2 === 0
      ? `rgba(2, 6, 23, ${0.72 * intensity})`
      : `rgba(127, 29, 29, ${0.58 * intensity})`;
    ctx.beginPath();
    ctx.moveTo(baseX - 6, groundY + 4);
    ctx.quadraticCurveTo(baseX + side * 9, groundY - height * 0.5, baseX + side * 2, groundY - height);
    ctx.quadraticCurveTo(baseX + side * 18, groundY - height * 0.35, baseX + 7, groundY + 4);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = `rgba(248, 113, 113, ${0.82 * intensity})`;
  ctx.lineWidth = passiveLevel >= 2 ? 4 : 3;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = center.x + side * (32 + (i % 3) * 6);
    const y = center.y - 56 + i * 24 + Math.sin(frame * 0.13 + i) * 3;
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x + side * 18, y);
    ctx.lineTo(x + side * 5, y + 13);
    ctx.stroke();
  }

  ctx.restore();
}

function drawGojoBluePunchEffect(f) {
  if (!f || f.technique !== "limitless") return;
  const active = isBluePunchActive(f);
  const chargeRatio = Math.max(0, Math.min(1, (f.bluePunchHoldTicks || 0) / GOJO_BLUE_PUNCH_HOLD_TICKS));
  const flash = Math.max(0, Math.min(1, (f.bluePunchFlash || 0) / 18));
  if (!active && chargeRatio <= 0 && flash <= 0) return;

  const center = getFighterCenter(f);
  const activeRatio = Math.max(0, Math.min(1, (f.bluePunchActiveTicks || 0) / GOJO_BLUE_PUNCH_ACTIVE_TICKS));
  const pulse = 1 + Math.sin(frame * 0.26) * 0.08;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  if (active) {
    const alpha = 0.25 + activeRatio * 0.38 + flash * 0.22;
    ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
    ctx.lineWidth = 4 + flash * 3;
    ctx.setLineDash([18, 10]);
    ctx.lineDashOffset = -frame * 1.2;
    ctx.beginPath();
    ctx.ellipse(center.x, center.y + 4, 48 * pulse, 72 * pulse, 0, -0.25, Math.PI * 1.25);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const side of [-1, 1]) {
      const fistX = center.x + side * (f.w * 0.42 + 9);
      const fistY = f.y + 73 + Math.sin(frame * 0.18 + side) * 3;
      const pullOffset = Math.sin(frame * 0.3 + side) * 6;
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.42 + flash * 0.3})`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(fistX, fistY, 10 + pulse * 3, frame * 0.12, frame * 0.12 + Math.PI * 1.45);
      ctx.stroke();
      ctx.strokeStyle = `rgba(224, 242, 254, ${0.34 + flash * 0.28})`;
      ctx.beginPath();
      ctx.moveTo(fistX + side * (24 + pullOffset), fistY - 8);
      ctx.quadraticCurveTo(fistX + side * 8, fistY - 2, fistX, fistY);
      ctx.moveTo(fistX + side * (22 - pullOffset * 0.5), fistY + 9);
      ctx.quadraticCurveTo(fistX + side * 7, fistY + 3, fistX - side * 1, fistY);
      ctx.stroke();
    }
  }

  if (chargeRatio > 0 && !active) {
    ctx.strokeStyle = `rgba(224, 242, 254, ${0.35 + chargeRatio * 0.45})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(center.x, center.y - 4, 34 + chargeRatio * 22, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * chargeRatio);
    ctx.stroke();
    ctx.fillStyle = `rgba(56, 189, 248, ${0.08 + chargeRatio * 0.13})`;
    ctx.beginPath();
    ctx.ellipse(center.x, center.y + 8, 32 + chargeRatio * 20, 54 + chargeRatio * 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawGojoPushPullEffect(f) {
  if (!f || (f.gojoPushPullTimer || 0) <= 0) return;
  const center = getFighterCenter(f);
  const timerRatio = Math.max(0, Math.min(1, f.gojoPushPullTimer / Math.round(1.4 * 60)));
  const jitter = Math.sin(frame * 1.35) * 5;
  const pulse = 1 + Math.sin(frame * 0.42) * 0.08;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.55 + timerRatio * 0.28;

  ctx.strokeStyle = "rgba(56, 189, 248, 0.82)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(center.x - 9 + jitter, center.y - 2, 28 * pulse, 58 * pulse, -0.25, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(248, 113, 113, 0.82)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(center.x + 9 - jitter, center.y + 2, 30 * pulse, 56 * pulse, 0.25, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineCap = "round";
  for (let i = 0; i < 8; i += 1) {
    const angle = frame * 0.18 + i * Math.PI / 4;
    const radius = 32 + (i % 2) * 16 + Math.sin(frame * 0.22 + i) * 4;
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius * 1.45;
    ctx.strokeStyle = i % 2 === 0 ? "rgba(125, 211, 252, 0.7)" : "rgba(251, 113, 133, 0.7)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(center.x + jitter * 0.4, center.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
  ctx.beginPath();
  ctx.arc(center.x + jitter * 0.6, center.y - 4, 4 + timerRatio * 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSukunaFugaChargeEffect(f) {
  if (!f || f.technique !== "shrine" || !f.fugaAiming) return;
  const center = getFighterCenter(f);
  const chargeRatio = Math.max(0, Math.min(1, (f.fugaChargeTicks || 0) / FUGA_CHARGE_TICKS));
  const pulse = 1 + Math.sin(frame * 0.28) * (0.05 + chargeRatio * 0.05);
  const radius = 28 + chargeRatio * 34;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = chargeRatio >= 1
    ? "rgba(254, 240, 138, 0.92)"
    : `rgba(251, 146, 60, ${0.35 + chargeRatio * 0.36})`;
  ctx.lineWidth = 4 + chargeRatio * 4;
  ctx.setLineDash(chargeRatio >= 1 ? [] : [14, 10]);
  ctx.lineDashOffset = -frame * (0.8 + chargeRatio * 0.6);
  ctx.beginPath();
  ctx.arc(center.x, center.y - 6, radius * pulse, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.06, chargeRatio));
  ctx.stroke();
  ctx.setLineDash([]);

  const glow = ctx.createRadialGradient(center.x, center.y - 4, 2, center.x, center.y - 4, 78 * pulse);
  glow.addColorStop(0, `rgba(254, 240, 138, ${0.18 + chargeRatio * 0.24})`);
  glow.addColorStop(0.48, `rgba(249, 115, 22, ${0.12 + chargeRatio * 0.2})`);
  glow.addColorStop(1, "rgba(127, 29, 29, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(center.x, center.y - 4, 78 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(127, 29, 29, ${0.42 + chargeRatio * 0.38})`;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i += 1) {
    const angle = frame * 0.05 + i * Math.PI * 0.4;
    const inner = radius * (0.45 + chargeRatio * 0.25);
    const outer = radius * (0.95 + chargeRatio * 0.55);
    ctx.beginPath();
    ctx.moveTo(center.x + Math.cos(angle) * inner, center.y - 6 + Math.sin(angle) * inner);
    ctx.lineTo(center.x + Math.cos(angle + 0.28) * outer, center.y - 6 + Math.sin(angle + 0.28) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSukunaGrabThrowHud(f) {
  if (!f || f.grabThrowTimer <= 0) return;
  const center = getFighterCenter(f);
  const aim = sanitizeAimPoint(f.grabThrowAim) || mouseAimWorld;
  const seconds = Math.max(0, f.grabThrowTimer / 60);

  ctx.save();
  ctx.strokeStyle = "rgba(254, 240, 138, 0.72)";
  ctx.lineWidth = 4;
  ctx.setLineDash([14, 9]);
  ctx.lineDashOffset = -frame * 0.65;
  ctx.beginPath();
  ctx.moveTo(center.x, center.y - 18);
  ctx.lineTo(aim.x, aim.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(127, 29, 29, 0.24)";
  ctx.beginPath();
  ctx.arc(aim.x, aim.y, 24 + Math.sin(frame * 0.2) * 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(248, 113, 113, 0.88)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(aim.x, aim.y, 30, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = "900 24px Arial";
  ctx.textAlign = "center";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
  ctx.strokeText(seconds.toFixed(1), center.x, f.y - 36);
  ctx.fillStyle = "#f8fafc";
  ctx.fillText(seconds.toFixed(1), center.x, f.y - 36);
  ctx.font = "900 11px Arial";
  ctx.strokeText("THROW", center.x, f.y - 18);
  ctx.fillStyle = "#fca5a5";
  ctx.fillText("THROW", center.x, f.y - 18);
  ctx.restore();
}

function drawFighter(f, label, labelColor = "rgba(244, 247, 251, 0.9)") {
  const flash = f.hurt > 0 && Math.floor(frame / 3) % 2 === 0;
  const dodgeAlpha = f.dodging > 0 ? 0.48 : 1;
  const running = !f.ko && f.grounded && Math.abs(f.vx) > 0.65 && !f.blocking && f.stun <= 0 && f.dodging <= 0;
  const gojoWalk = running && f.technique === "limitless";
  const shrineWalk = running && f.technique === "shrine";
  const retreating = running && Math.sign(f.vx) === -f.dir;
  const runSpeed = running ? Math.max(0.75, Math.min(1.6, Math.abs(f.vx) / BASE_MOVE_SPEED)) : 1;
  const shrineWalkCycle = f.walkCycle || 0;
  const runFrame = running
    ? shrineWalk
      ? Math.floor(((shrineWalkCycle % (Math.PI * 2)) / (Math.PI * 2)) * 8) % 8
      : Math.floor(frame * runSpeed / (gojoWalk ? 3 : 4)) % 8
    : 0;
  const runPhase = shrineWalk ? shrineWalkCycle : runFrame / 8 * Math.PI * 2;
  const moveDirection = running ? Math.sign(f.vx) * f.dir : 1;
  const shrineStride = shrineWalk ? -Math.cos(shrineWalkCycle) : 0;
  const runCycle = running ? Math.sin(runPhase) : 0;
  const armSwing = running ? (shrineWalk ? shrineStride : Math.sin(frame * runSpeed * 0.24)) * moveDirection : 0;
  const runPoseFrames = shrineWalk ? [-1, -0.85, -0.25, 0.4, 1, 0.85, 0.25, -0.4] : [-1, -0.55, 0, 0.55, 1, 0.55, 0, -0.55];
  const runLiftFrames = shrineWalk ? [0, 1.5, 4.5, 2.4, 0, 1.5, 4.5, 2.4] : [0, 2, 4, 2, 0, 2, 4, 2];
  const runPose = running ? shrineWalk ? shrineStride : runPoseFrames[runFrame] : 0;
  const runCenterLift = running ? runLiftFrames[runFrame] : 0;
  const bob = running ? (gojoWalk ? 0.8 : 1.4) + runCenterLift * (gojoWalk ? 0.35 : 0.55) : 0;
  const jumpPose = !f.grounded && !f.ko;
  const jumpRetreating = jumpPose && Math.sign(f.vx) === -f.dir;
  const jumpCycle = jumpPose ? Math.sin(frame * 0.32) : 0;
  const skin = getTechniqueSkin(f, flash);
  const bodyColor = skin.body;
  const skinColor = skin.skin;
  const pantsColor = skin.pants;
  const shoeColor = skin.shoe;
  const idle = !running && !jumpPose && !f.attacking && !f.blocking && !f.ko ? Math.sin(frame * 0.08) : 0;
  drawSukunaKingPassiveEffect(f);
  drawGojoBluePunchEffect(f);
  drawGojoPushPullEffect(f);
  drawSukunaFugaChargeEffect(f);
  ctx.save();
  ctx.globalAlpha = dodgeAlpha;

  if (!f.onPlatform) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
    ctx.beginPath();
    ctx.ellipse(f.x + f.w / 2, GROUND + 4, f.w * 0.95, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (f.ko || f.lying) {
    ctx.translate(f.x + f.w / 2, f.y + f.h);
    ctx.rotate(f.koFallDir * f.koRotation);
    ctx.scale(f.dir, 1);
    ctx.translate(-f.w / 2, -f.h);
  } else {
    ctx.translate(f.x + f.w / 2, f.y - bob + idle * 0.7);
    ctx.scale(f.dir, 1);
    ctx.translate(-f.w / 2, 0);
  }

  const hipY = 74;
  const kneeY = jumpPose ? 104 : 101;
  const footY = 124;
  const leftHip = { x: 18, y: hipY };
  const rightHip = { x: 34, y: hipY };
  const stride = running ? (retreating ? -runPose * 0.62 : runPose) : 0;
  const risingJump = jumpPose && f.vy < -0.3;
  const fallingJump = jumpPose && !risingJump;
  const stepLiftAmount = shrineWalk ? 4.6 : gojoWalk ? 2.5 : 5.2;
  const leftStepLift = running ? Math.max(0, runPose) * stepLiftAmount + (Math.abs(runPose) < 0.05 ? runCenterLift * 0.45 : 0) : 0;
  const rightStepLift = running ? Math.max(0, -runPose) * stepLiftAmount + (Math.abs(runPose) < 0.05 ? runCenterLift * 0.45 : 0) : 0;
  const kneeBendSize = shrineWalk ? 9 : gojoWalk ? 5 : 8;
  const kneeStride = shrineWalk ? 9 : gojoWalk ? 5 : 8;
  const footStride = shrineWalk ? 16 : gojoWalk ? 9 : 15;
  const leftKneeBend = running ? [-7, -4, 2, 6, 7, 6, 2, -4][runFrame] * (kneeBendSize / 8) : 0;
  const rightKneeBend = running ? [7, 6, 2, -4, -7, -4, 2, 6][runFrame] * (kneeBendSize / 8) : 0;
  const kneeDropScale = shrineWalk ? 0.95 : gojoWalk ? 0.55 : 0.85;
  const leftKneeDrop = running ? [0, 2, 5, 3, 0, 3, 5, 2][runFrame] * kneeDropScale : 0;
  const rightKneeDrop = running ? [0, 3, 5, 2, 0, 2, 5, 3][runFrame] * kneeDropScale : 0;
  const leftKnee = jumpPose
    ? { x: fallingJump ? 20 : 21, y: fallingJump ? 96 : 95 }
    : { x: 16 - stride * kneeStride + leftKneeBend, y: kneeY - leftStepLift + leftKneeDrop };
  const rightKnee = risingJump
    ? { x: 61, y: 77 }
    : jumpPose
      ? { x: 60, y: 79 }
      : { x: 36 + stride * kneeStride + rightKneeBend, y: kneeY - rightStepLift + rightKneeDrop };
  const leftFoot = jumpPose
    ? { x: fallingJump ? -10 : -11, y: fallingJump ? 98 : 96 }
    : { x: 14 - stride * footStride, y: footY - leftStepLift * 0.16 };
  const rightFoot = risingJump
    ? { x: 61, y: 114 }
    : jumpPose
      ? { x: 60, y: 115 }
      : { x: 39 + stride * footStride, y: footY - rightStepLift * 0.16 };
  if (shrineWalk && !jumpPose) {
    const humanStride = Math.max(-1, Math.min(1, shrineStride));
    const leftLift = Math.max(0, Math.sin(shrineWalkCycle)) * 2.4;
    const rightLift = Math.max(0, -Math.sin(shrineWalkCycle)) * 2.4;
    leftFoot.x = 18 - humanStride * 10;
    rightFoot.x = 34 + humanStride * 10;
    leftFoot.y = footY - leftLift;
    rightFoot.y = footY - rightLift;

    const leftKneeDir = leftFoot.x >= leftHip.x ? 1 : -1;
    const rightKneeDir = rightFoot.x >= rightHip.x ? 1 : -1;
    const kneeBend = 4.4 + Math.abs(Math.sin(shrineWalkCycle)) * 1.1;
    leftKnee.x = Math.max(
      Math.min(leftHip.x, leftFoot.x) - 5,
      Math.min(Math.max(leftHip.x, leftFoot.x) + 5, (leftHip.x + leftFoot.x) * 0.5 + leftKneeDir * kneeBend)
    );
    rightKnee.x = Math.max(
      Math.min(rightHip.x, rightFoot.x) - 5,
      Math.min(Math.max(rightHip.x, rightFoot.x) + 5, (rightHip.x + rightFoot.x) * 0.5 + rightKneeDir * kneeBend)
    );
    leftKnee.y = (leftHip.y + leftFoot.y) * 0.5 + 8.5 - leftLift * 0.25;
    rightKnee.y = (rightHip.y + rightFoot.y) * 0.5 + 8.5 - rightLift * 0.25;
  }
  if (!jumpPose && !running) {
    leftFoot.x -= f.technique === "shrine" ? 5 : 3;
    rightFoot.x += f.technique === "shrine" ? 7 : 4;
    leftKnee.x -= f.technique === "shrine" ? 2 : 1;
    rightKnee.x += f.technique === "shrine" ? 3 : 1;
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#020617";
  ctx.lineWidth = 17;
  ctx.beginPath();
  ctx.moveTo(leftHip.x, leftHip.y);
  ctx.lineTo(leftKnee.x, leftKnee.y);
  ctx.lineTo(leftFoot.x, leftFoot.y);
  ctx.moveTo(rightHip.x, rightHip.y);
  ctx.lineTo(rightKnee.x, rightKnee.y);
  ctx.lineTo(rightFoot.x, rightFoot.y);
  ctx.stroke();

  ctx.strokeStyle = pantsColor;
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.moveTo(leftHip.x, leftHip.y);
  ctx.lineTo(leftKnee.x, leftKnee.y);
  ctx.lineTo(leftFoot.x, leftFoot.y);
  ctx.moveTo(rightHip.x, rightHip.y);
  ctx.lineTo(rightKnee.x, rightKnee.y);
  ctx.lineTo(rightFoot.x, rightFoot.y);
  ctx.stroke();

  ctx.strokeStyle = "#020617";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(leftFoot.x - 7, leftFoot.y + 1);
  ctx.lineTo(leftFoot.x + 12, leftFoot.y + 1);
  ctx.moveTo(rightFoot.x - 7, rightFoot.y + 1);
  ctx.lineTo(rightFoot.x + 12, rightFoot.y + 1);
  ctx.stroke();
  ctx.strokeStyle = shoeColor;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(leftFoot.x - 5, leftFoot.y + 1);
  ctx.lineTo(leftFoot.x + 10, leftFoot.y + 1);
  ctx.moveTo(rightFoot.x - 5, rightFoot.y + 1);
  ctx.lineTo(rightFoot.x + 10, rightFoot.y + 1);
  ctx.stroke();

  const lean = f.attacking ? -7 : f.blocking ? 4 : jumpRetreating ? 4 : jumpPose ? -2 : retreating ? 3 : gojoWalk ? -3 + runPose * 0.4 : running ? -5 : f.technique === "shrine" ? -4 : -2;
  ctx.save();
  ctx.translate(lean, 0);
  ctx.rotate((f.technique === "shrine" ? -0.04 : -0.025) + idle * 0.01);

  ctx.fillStyle = "#020617";
  ctx.beginPath();
  ctx.moveTo(13, 34);
  ctx.lineTo(43, 36);
  ctx.lineTo(47, 79);
  ctx.lineTo(29, 86);
  ctx.lineTo(8, 80);
  ctx.lineTo(8, 43);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(15, 36);
  ctx.lineTo(41, 38);
  ctx.lineTo(43, 76);
  ctx.lineTo(29, 82);
  ctx.lineTo(11, 77);
  ctx.lineTo(11, 44);
  ctx.closePath();
  ctx.fill();
  if (f.technique === "limitless") {
    ctx.fillStyle = "#020617";
    ctx.fillRect(11, 32, 32, 12);
  } else if (f.technique === "shrine") {
    ctx.fillStyle = "#ffd0a6";
    ctx.beginPath();
    ctx.moveTo(16, 38);
    ctx.lineTo(40, 39);
    ctx.lineTo(41, 69);
    ctx.lineTo(29, 76);
    ctx.lineTo(14, 70);
    ctx.lineTo(13, 45);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#020617";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(18, 42);
    ctx.quadraticCurveTo(27, 48, 37, 42);
    ctx.moveTo(18, 56);
    ctx.quadraticCurveTo(27, 61, 37, 56);
    ctx.moveTo(27, 42);
    ctx.lineTo(27, 70);
    ctx.moveTo(17, 48);
    ctx.lineTo(13, 62);
    ctx.moveTo(37, 48);
    ctx.lineTo(41, 62);
    ctx.moveTo(19, 51);
    ctx.lineTo(35, 51);
    ctx.moveTo(20, 66);
    ctx.lineTo(34, 66);
    ctx.moveTo(22, 44);
    ctx.lineTo(17, 57);
    ctx.moveTo(32, 44);
    ctx.lineTo(37, 57);
    ctx.stroke();
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.ellipse(27, 67, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(13, 66);
    ctx.quadraticCurveTo(27, 77, 42, 66);
    ctx.stroke();
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(15, 63);
    ctx.quadraticCurveTo(27, 59, 40, 63);
    ctx.moveTo(15, 71);
    ctx.quadraticCurveTo(27, 75, 40, 71);
    ctx.stroke();
  } else if (isPracticeDummy(f)) {
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(17, 40);
    ctx.lineTo(38, 74);
    ctx.moveTo(39, 42);
    ctx.lineTo(15, 72);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
    ctx.fillRect(18, 45, 18, 8);
  }
  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.ellipse(26, 23, 13, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  if (isPracticeDummy(f)) {
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(17, 18);
    ctx.lineTo(23, 25);
    ctx.moveTo(23, 18);
    ctx.lineTo(17, 25);
    ctx.moveTo(30, 18);
    ctx.lineTo(36, 25);
    ctx.moveTo(36, 18);
    ctx.lineTo(30, 25);
    ctx.moveTo(18, 33);
    ctx.quadraticCurveTo(26, 38, 35, 33);
    ctx.stroke();
    ctx.fillStyle = "rgba(17, 24, 39, 0.16)";
    ctx.fillRect(13, 12, 26, 3);
  } else if (f.technique === "limitless") {
    const hairSway = idle;
    ctx.fillStyle = skin.hair;
    ctx.beginPath();
    ctx.moveTo(9 + hairSway * 0.4, 18);
    ctx.lineTo(13 + hairSway * 0.8, 6);
    ctx.lineTo(10 + hairSway, -5);
    ctx.lineTo(19 + hairSway * 0.6, 5);
    ctx.lineTo(22 + hairSway * 1.1, -7);
    ctx.lineTo(27 + hairSway * 0.4, 6);
    ctx.lineTo(35 + hairSway, -5);
    ctx.lineTo(34 + hairSway * 0.5, 8);
    ctx.lineTo(43 + hairSway * 0.8, 6);
    ctx.lineTo(38 + hairSway * 0.4, 18);
    ctx.lineTo(31, 12);
    ctx.lineTo(25, 15);
    ctx.lineTo(18, 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = skin.eye;
    ctx.fillRect(13, 19, 27, 7);
  } else if (f.technique === "shrine") {
    const hairSway = idle;
    ctx.fillStyle = skin.hair;
    ctx.beginPath();
    ctx.moveTo(8 + hairSway * 0.3, 18);
    ctx.lineTo(11 + hairSway * 0.5, 5);
    ctx.lineTo(8 + hairSway * 0.8, -4);
    ctx.lineTo(17 + hairSway * 0.4, 6);
    ctx.lineTo(20 + hairSway * 0.9, -6);
    ctx.lineTo(25 + hairSway * 0.3, 8);
    ctx.lineTo(31 + hairSway * 0.7, -4);
    ctx.lineTo(34 + hairSway * 0.3, 8);
    ctx.lineTo(43 + hairSway * 0.7, 3);
    ctx.lineTo(39 + hairSway * 0.3, 18);
    ctx.lineTo(32, 11);
    ctx.lineTo(27, 16);
    ctx.lineTo(20, 12);
    ctx.lineTo(14, 16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#831843";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = "#020617";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(17, 22);
    ctx.lineTo(24, 24);
    ctx.moveTo(28, 24);
    ctx.lineTo(35, 22);
    ctx.moveTo(18, 31);
    ctx.lineTo(24, 29);
    ctx.moveTo(29, 29);
    ctx.lineTo(35, 31);
    ctx.moveTo(26, 28);
    ctx.lineTo(26, 36);
    ctx.moveTo(21, 17);
    ctx.lineTo(24, 21);
    ctx.moveTo(31, 17);
    ctx.lineTo(28, 21);
    ctx.stroke();
    ctx.fillStyle = "#9d174d";
    ctx.beginPath();
    ctx.moveTo(13, 17);
    ctx.quadraticCurveTo(18, 15, 22, 20);
    ctx.lineTo(20, 33);
    ctx.quadraticCurveTo(16, 31, 14, 25);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#020617";
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.moveTo(18, 22);
    ctx.lineTo(25, 21);
    ctx.lineTo(22, 25);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(28, 21);
    ctx.lineTo(35, 22);
    ctx.lineTo(31, 25);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#020617";
    ctx.fillRect(21, 22, 2, 2);
    ctx.fillRect(31, 22, 2, 2);
  } else {
    ctx.fillStyle = skin.eye;
    ctx.fillRect(31, 22, 4, 4);
  }
  ctx.restore();

  ctx.save();
  ctx.translate(lean, 0);
  const drawArmRig = (shoulder, elbow, hand, color = f.technique === "shrine" ? skinColor : bodyColor, handColor = skinColor) => {
    const useOutline = f.technique !== "shrine";
    const isShrineArm = f.technique === "shrine";
    const strokeArm = (strokeColor, width) => {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(shoulder.x, shoulder.y);
      ctx.lineTo(elbow.x, elbow.y);
      ctx.moveTo(elbow.x, elbow.y);
      ctx.lineTo(hand.x, hand.y);
      ctx.stroke();
    };
    if (useOutline) strokeArm("#020617", 13);
    strokeArm(color, 8);
    if (isShrineArm) {
      ctx.strokeStyle = "rgba(2, 6, 23, 0.45)";
      ctx.lineWidth = 1.7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulder.x + (hand.x > shoulder.x ? 2 : -2), shoulder.y + 2);
      ctx.lineTo(elbow.x + (hand.x > shoulder.x ? 2 : -2), elbow.y);
      ctx.moveTo(elbow.x, elbow.y + 2);
      ctx.lineTo(hand.x, hand.y);
      ctx.stroke();
    }
    if (useOutline) {
      ctx.fillStyle = "#020617";
      ctx.beginPath();
      ctx.arc(shoulder.x, shoulder.y, 5.5, 0, Math.PI * 2);
      ctx.arc(elbow.x, elbow.y, 5, 0, Math.PI * 2);
      ctx.ellipse(hand.x, hand.y, 7, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(shoulder.x, shoulder.y, 3.8, 0, Math.PI * 2);
    ctx.arc(elbow.x, elbow.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = handColor;
    ctx.beginPath();
    ctx.ellipse(hand.x - 1, hand.y - 1, 4.8, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    if (isShrineArm) {
      ctx.strokeStyle = "rgba(127, 29, 29, 0.55)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(elbow.x, elbow.y, 4.8, 0.2, Math.PI * 1.25);
      ctx.moveTo(hand.x - 4, hand.y - 1);
      ctx.lineTo(hand.x + 3, hand.y - 1);
      ctx.stroke();
    }
  };
  if (f.blocking) {
    drawArmRig({ x: 41, y: 48 }, { x: 54, y: 49 }, { x: 57, y: 61 });
    drawArmRig({ x: 12, y: 50 }, { x: 23, y: 58 }, { x: 30, y: 52 });
  }
  if (f.technique === "shrine" && !f.attacking && !jumpPose && !f.blocking) {
    const lowerBreath = running ? runCenterLift * 0.12 : idle * 2;
    const lowerSwing = running ? armSwing * 8 : idle * 1.2;
    drawArmRig(
      { x: 43, y: 63 + lowerBreath },
      { x: 50 - lowerSwing * 0.48, y: 76 + lowerBreath },
      { x: 45 - lowerSwing, y: 88 + lowerBreath * 0.35 },
      skinColor
    );
    drawArmRig(
      { x: 10, y: 64 + lowerBreath },
      { x: 3 + lowerSwing * 0.48, y: 77 + lowerBreath },
      { x: 8 + lowerSwing, y: 89 + lowerBreath * 0.35 },
      skinColor
    );
  }
  if (f.attacking) {
    const attack = getAttackSpec(f);
    const windup = f.attackFrame < attack.windup;
    const active = f.attackFrame >= attack.windup && f.attackFrame <= attack.windup + attack.active;
    if (f.attacking === "barrage") {
      const barragePhase = f.attackFrame * 0.95;
      const armSet = [
        { shoulder: { x: 43, y: 49 }, elbowY: 45, handY: 39, delay: 0 },
        { shoulder: { x: 11, y: 50 }, elbowY: 52, handY: 49, delay: 1.2 },
        { shoulder: { x: 44, y: 64 }, elbowY: 66, handY: 62, delay: 2.4 },
        { shoulder: { x: 9, y: 65 }, elbowY: 72, handY: 75, delay: 3.6 }
      ];
      armSet.forEach((arm, index) => {
        const thrust = Math.max(0, Math.sin(barragePhase + arm.delay));
        const recoil = Math.max(0, -Math.sin(barragePhase + arm.delay)) * 5;
        const reach = 52 + thrust * 27 - recoil;
        const elbowX = 36 + thrust * 20 - index * 1.5;
        const hand = { x: reach + index * 2, y: arm.handY + Math.sin(barragePhase + index) * 4 };
        drawArmRig(
          arm.shoulder,
          { x: elbowX, y: arm.elbowY + Math.cos(barragePhase + index) * 2 },
          hand,
          skinColor
        );
        if (thrust > 0.65) {
          ctx.strokeStyle = `rgba(251, 146, 60, ${0.25 + thrust * 0.28})`;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(hand.x - 16, hand.y);
          ctx.lineTo(hand.x + 12, hand.y + (index % 2 === 0 ? -2 : 2));
          ctx.stroke();
        }
      });
    } else if (f.attacking === "grabThrow") {
      const holdPulse = Math.sin(frame * 0.18) * 2;
      drawArmRig(
        { x: 42, y: 48 },
        { x: 57, y: 47 + holdPulse },
        { x: 68, y: 53 + holdPulse },
        f.technique === "shrine" ? skinColor : bodyColor
      );
      drawArmRig(
        { x: 12, y: 50 },
        { x: 29, y: 47 - holdPulse },
        { x: 42, y: 54 - holdPulse },
        f.technique === "shrine" ? skinColor : bodyColor
      );
      if (f.technique === "shrine") {
        drawArmRig(
          { x: 44, y: 64 },
          { x: 58, y: 63 - holdPulse },
          { x: 70, y: 68 - holdPulse },
          skinColor
        );
        drawArmRig(
          { x: 9, y: 65 },
          { x: 25, y: 66 + holdPulse },
          { x: 40, y: 70 + holdPulse },
          skinColor
        );
      }
    } else if (f.attacking === "backThrow") {
      const pull = windup ? 0 : active ? 1 : 0.45;
      drawArmRig(
        { x: 41, y: 51 },
        { x: 60 - pull * 38, y: 50 + pull * 5 },
        { x: 68 - pull * 58, y: 58 + pull * 9 }
      );
      drawArmRig(
        { x: 12, y: 52 },
        { x: 25 - pull * 20, y: 60 + pull * 5 },
        { x: 34 - pull * 42, y: 63 + pull * 7 }
      );
      if (f.technique === "shrine") {
        drawArmRig(
          { x: 44, y: 64 },
          { x: 53 - pull * 18, y: 75 },
          { x: 47 - pull * 36, y: 86 },
          skinColor
        );
        drawArmRig(
          { x: 9, y: 65 },
          { x: -1 - pull * 10, y: 76 },
          { x: 7 - pull * 28, y: 87 },
          skinColor
        );
      }
    } else {
    const heavy = f.attacking === "heavy";
    const shoulder = { x: 41, y: heavy ? 50 : 57 };
    const elbow = heavy
      ? windup
        ? { x: 47, y: 34 }
        : active ? { x: 57, y: 44 } : { x: 51, y: 60 }
      : windup
        ? { x: 50, y: 52 }
        : active ? { x: 58, y: 56 } : { x: 52, y: 62 };
    const fist = heavy
      ? windup
        ? { x: 37, y: 27 }
        : active ? { x: 76, y: 47 } : { x: 60, y: 66 }
      : windup
        ? { x: 45, y: 44 }
        : active ? { x: 66, y: 56 } : { x: 58, y: 64 };
    drawArmRig(shoulder, elbow, fist);
    drawArmRig(
      { x: 12, y: heavy ? (windup ? 64 : 66) : 52 },
      heavy ? { x: 24, y: windup ? 72 : 73 } : { x: 20, y: windup ? 62 : 64 },
      heavy ? { x: 34, y: windup ? 65 : 67 } : { x: 29, y: windup ? 59 : 61 }
    );
    if (f.technique === "shrine") {
      const extraLift = heavy ? (windup ? -2 : active ? 1 : 0) : (windup ? -1 : active ? 1 : 0);
      const extraReach = active ? 4 : windup ? -2 : 1;
      drawArmRig(
        { x: 44, y: 64 + extraLift },
        { x: 54 + extraReach * 0.2, y: 74 + extraLift },
        { x: 48 + extraReach, y: 86 + extraLift * 0.4 },
        skinColor
      );
      drawArmRig(
        { x: 9, y: 65 - extraLift * 0.2 },
        { x: -2 - extraReach * 0.15, y: 75 - extraLift * 0.2 },
        { x: 7 - extraReach, y: 87 - extraLift * 0.2 },
        skinColor
      );
    }
    }
  } else if (jumpPose) {
    if (f.technique === "shrine") {
      const airSwing = jumpCycle * 2;
      drawArmRig(
        { x: 44, y: 48 },
        { x: 55 + airSwing * 0.2, y: 55 },
        { x: 61 + airSwing, y: 64 },
        skinColor
      );
      drawArmRig(
        { x: 9, y: 49 },
        { x: -2 - airSwing * 0.2, y: 56 },
        { x: -8 - airSwing, y: 65 },
        skinColor
      );
      drawArmRig(
        { x: 43, y: 63 },
        { x: 50 - airSwing * 0.25, y: 75 },
        { x: 44 - airSwing, y: 87 },
        skinColor
      );
      drawArmRig(
        { x: 10, y: 64 },
        { x: 3 + airSwing * 0.25, y: 76 },
        { x: 9 + airSwing, y: 88 },
        skinColor
      );
    } else if (jumpRetreating) {
      const armWave = jumpCycle * 2;
      drawArmRig({ x: 41, y: 48 }, { x: 56, y: 50 + armWave }, { x: 69, y: 46 + armWave });
      drawArmRig({ x: 12, y: 49 }, { x: -2, y: 56 - armWave }, { x: -16, y: 58 - armWave });
    } else {
      if (f.vy > 0.4) {
        drawArmRig({ x: 41, y: 49 }, { x: 58, y: 39 }, { x: 78, y: 53 + jumpCycle * 2 });
        drawArmRig({ x: 12, y: 49 }, { x: -5, y: 39 }, { x: -26, y: 53 - jumpCycle * 2 });
      } else {
        const armWave = jumpCycle * 3;
        drawArmRig({ x: 41, y: 47 }, { x: 59, y: 45 }, { x: 68, y: 33 + armWave });
        drawArmRig({ x: 12, y: 48 }, { x: -6, y: 50 }, { x: -15, y: 64 - armWave });
      }
    }
  } else if (!f.blocking) {
    if (f.technique === "shrine") {
      const upperBreath = running ? runCenterLift * 0.08 : idle * 2;
      const upperSwing = running ? armSwing * 2.4 : idle * 0.45;
      drawArmRig(
        { x: 44, y: 48 + upperBreath },
        { x: 55 - upperSwing * 0.4, y: 57 + upperBreath },
        { x: 59 - upperSwing, y: 67 + upperBreath * 0.3 },
        skinColor
      );
      drawArmRig(
        { x: 9, y: 49 + upperBreath },
        { x: -2 + upperSwing * 0.4, y: 58 + upperBreath },
        { x: -6 + upperSwing, y: 68 + upperBreath * 0.3 },
        skinColor
      );
    } else {
      const runArmSwing = running ? armSwing * 5 : idle * 1.2;
      drawArmRig(
        { x: 42, y: 52 },
        { x: 48 + runArmSwing * 0.45, y: 68 },
        { x: 43 + runArmSwing, y: 82 }
      );
      drawArmRig(
        { x: 11, y: 52 },
        { x: 5 - runArmSwing * 0.45, y: 68 },
        { x: 10 - runArmSwing, y: 82 }
      );
    }
  }

  if (f.blocking) {
    const shieldPower = Math.max(0, Math.min(1, f.shieldTicks / getShieldMaxTicks(f)));
    const hitFlash = Math.max(0, Math.min(1, (f.shieldHitFlash || 0) / 8));
    const bubblePulse = 1 + Math.sin(frame * 0.2) * 0.035;
    const bubbleScale = (0.74 + shieldPower * 0.28) * bubblePulse;
    const shrineShield = f.technique === "shrine";
    const fillColor = shrineShield
      ? `rgba(127, 29, 29, ${0.05 + shieldPower * 0.14 + hitFlash * 0.08})`
      : `rgba(14, 165, 233, ${0.04 + shieldPower * 0.12 + hitFlash * 0.08})`;
    const strokeColor = shrineShield
      ? `rgba(248, 113, 113, ${0.26 + shieldPower * 0.55 + hitFlash * 0.16})`
      : `rgba(196, 241, 255, ${0.24 + shieldPower * 0.58 + hitFlash * 0.16})`;
    const innerColor = shrineShield
      ? `rgba(2, 6, 23, ${0.26 + shieldPower * 0.32})`
      : `rgba(56, 189, 248, ${0.18 + shieldPower * 0.34})`;

    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.ellipse(f.w / 2, 66, 48 * bubbleScale, 78 * bubbleScale, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2 + shieldPower * (shrineShield ? 5 : 4) + hitFlash * 2;
    ctx.beginPath();
    ctx.ellipse(f.w / 2, 66, 50 * bubbleScale, 80 * bubbleScale, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = innerColor;
    ctx.lineWidth = 2;
    ctx.setLineDash(shieldPower < 0.32 || hitFlash > 0 ? [9, 8] : shrineShield ? [12, 12] : [16, 12]);
    ctx.lineDashOffset = -frame * (shrineShield ? 0.7 : 0.55);
    ctx.beginPath();
    ctx.ellipse(f.w / 2, 66, 39 * bubbleScale, 66 * bubbleScale, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (shieldPower < 0.34 || hitFlash > 0) {
      ctx.strokeStyle = shrineShield
        ? `rgba(254, 202, 202, ${0.28 + hitFlash * 0.5})`
        : `rgba(224, 242, 254, ${0.3 + hitFlash * 0.5})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(f.w / 2 - 19, 28);
      ctx.lineTo(f.w / 2 - 4, 44);
      ctx.lineTo(f.w / 2 - 14, 66);
      ctx.moveTo(f.w / 2 + 22, 84);
      ctx.lineTo(f.w / 2 + 5, 102);
      ctx.lineTo(f.w / 2 + 13, 126);
      ctx.stroke();
    }
  }
  ctx.restore();

  ctx.restore();

  drawRctEffect(f);
  drawInfinityField(f);
  drawTeleportPreview(f);
  drawFugaAimPreview(f);
  drawUltimateAimPreview(f);
  drawSukunaGrabThrowHud(f);
  if (shouldShowChargePreview(f)) drawTechniqueAimPreview(f);

  if (label) {
    ctx.font = "800 14px Arial";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.72)";
    ctx.strokeText(label, f.x + f.w / 2, f.y - 10);
    ctx.fillStyle = labelColor;
    ctx.fillText(label, f.x + f.w / 2, f.y - 10);
  }
}

function drawTechniquePreview(canvasEl, technique) {
  if (!canvasEl) return;
  const previewCtx = canvasEl.getContext("2d");
  const previousCtx = ctx;
  const previewFighter = makeFighter({
    x: 450,
    w: technique === "shrine" ? 52 : 50,
    h: 128,
    dir: 1,
    color: technique === "shrine" ? "#dc2626" : "#2563eb",
    accent: technique === "shrine" ? "#991b1b" : "#1d4ed8"
  });
  previewFighter.technique = technique;
  previewFighter.y = GROUND - previewFighter.h;
  applyTechniqueStats(previewFighter);

  ctx = previewCtx;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  const backdrop = ctx.createLinearGradient(0, 0, 0, canvasEl.height);
  backdrop.addColorStop(0, technique === "shrine" ? "#2b1420" : "#142033");
  backdrop.addColorStop(1, "#050814");
  ctx.fillStyle = backdrop;
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(0, canvasEl.height - 20, canvasEl.width, 3);

  const scale = 1.05;
  ctx.save();
  ctx.translate(
    canvasEl.width / 2 - (previewFighter.x + previewFighter.w / 2) * scale,
    canvasEl.height - 13 - (GROUND + 4) * scale
  );
  ctx.scale(scale, scale);
  drawFighter(previewFighter, "");
  ctx.restore();
  ctx = previousCtx;
}

function renderTechniquePreviews() {
  drawTechniquePreview(techniquePreviewCanvases.limitless, "limitless");
  drawTechniquePreview(techniquePreviewCanvases.shrine, "shrine");
}


function drawSukunaModelCleanup(f) {
  if (!f || f.technique !== "shrine") return;

  ctx.save();
  const facing = f.dir || 1;
  const centerX = f.x + f.w / 2;
  const baseY = f.y;
  ctx.translate(centerX, baseY);
  ctx.scale(facing, 1);

  const skin = "#e7b39e";
  const tattoo = "#1b0610";
  const pants = "#171019";
  const pantsLight = "rgba(245, 245, 245, 0.24)";

  // Cover any extra/old eye marks and redraw simpler face with no extra eyes.
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.roundRect(-15, 4, 30, 29, 9);
  ctx.fill();

  // Main eyes only: smaller and meaner.
  ctx.strokeStyle = tattoo;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-10, 16);
  ctx.lineTo(-3, 14);
  ctx.moveTo(10, 16);
  ctx.lineTo(3, 14);
  ctx.stroke();

  // Sukuna-like facial tattoos: forehead mark, cheek/eye lines, chin marks.
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(0, 7);
  ctx.lineTo(0, 13);
  ctx.moveTo(-6, 9);
  ctx.quadraticCurveTo(-11, 10, -13, 14);
  ctx.moveTo(6, 9);
  ctx.quadraticCurveTo(11, 10, 13, 14);
  ctx.moveTo(-13, 21);
  ctx.quadraticCurveTo(-8, 19, -4, 21);
  ctx.moveTo(13, 21);
  ctx.quadraticCurveTo(8, 19, 4, 21);
  ctx.moveTo(-4, 28);
  ctx.lineTo(-1, 32);
  ctx.moveTo(4, 28);
  ctx.lineTo(1, 32);
  ctx.stroke();

  // Torso/arm tattoo bands.
  ctx.lineWidth = 2.7;
  ctx.beginPath();
  ctx.moveTo(-16, 47);
  ctx.quadraticCurveTo(-7, 52, 0, 47);
  ctx.quadraticCurveTo(7, 52, 16, 47);
  ctx.moveTo(-18, 62);
  ctx.lineTo(-6, 68);
  ctx.moveTo(18, 62);
  ctx.lineTo(6, 68);
  ctx.stroke();

  // Remove shoe shapes by painting bare ankle/foot areas and then add foot outline.
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(-12, 92, 13, 6, 0.05, 0, Math.PI * 2);
  ctx.ellipse(13, 92, 13, 6, -0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = tattoo;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-23, 92);
  ctx.quadraticCurveTo(-14, 96, -3, 92);
  ctx.moveTo(3, 92);
  ctx.quadraticCurveTo(14, 96, 24, 92);
  ctx.stroke();

  // Detailed loose pants: waistband, folds, knees, lower-leg folds.
  ctx.strokeStyle = pantsLight;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-21, 66);
  ctx.lineTo(21, 66);
  ctx.moveTo(-17, 73);
  ctx.quadraticCurveTo(-10, 78, -14, 89);
  ctx.moveTo(-5, 69);
  ctx.quadraticCurveTo(-2, 78, -6, 91);
  ctx.moveTo(17, 73);
  ctx.quadraticCurveTo(10, 78, 14, 89);
  ctx.moveTo(5, 69);
  ctx.quadraticCurveTo(2, 78, 6, 91);
  ctx.moveTo(-18, 82);
  ctx.lineTo(-5, 84);
  ctx.moveTo(18, 82);
  ctx.lineTo(5, 84);
  ctx.stroke();

  ctx.restore();
}

function drawEffects() {
  drawGroundEraseEffects();
  drawWorldSlashEffects();
  drawUltimateChargeEffects();
  if (player.attacking && !player.hasHit) drawHitboxHint(player);
  if (enemy.attacking && !enemy.hasHit) drawHitboxHint(enemy);
  drawProjectiles();
  drawProjectileDisperses();
  drawFugaExplosions();
  drawTeleportEffects();
  drawHitSparks();
}

function drawGroundEraseEffects() {
  for (const effect of groundEraseEffects) {
    const t = effect.life / effect.maxLife;
    const age = 1 - t;
    ctx.save();
    ctx.globalAlpha = Math.max(0, t);
    ctx.fillStyle = `rgba(2, 6, 23, ${0.76 * t})`;
    ctx.beginPath();
    ctx.ellipse(effect.x, effect.y, effect.radius * (0.45 + age * 0.7), 8 + age * 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(168, 85, 247, ${0.62 * t})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(effect.x - effect.radius * (0.55 + age), effect.y - 2);
    ctx.lineTo(effect.x - effect.radius * 0.18, effect.y + 6);
    ctx.lineTo(effect.x + effect.radius * 0.22, effect.y - 5);
    ctx.lineTo(effect.x + effect.radius * (0.6 + age), effect.y + 4);
    ctx.stroke();
    ctx.restore();
  }
}

function drawUltimateChargeEffects() {
  for (const effect of ultimateChargeEffects) {
    const fighter = effect.owner === "player" ? player : enemy;
    if (!fighter) continue;
    const center = getFighterCenter(fighter);
    const t = Math.max(0, effect.life / effect.maxLife);
    const age = 1 - t;
    const pulse = 1 + Math.sin(frame * 0.28) * 0.08;
    ctx.save();
    ctx.translate(center.x, center.y - 8);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.7 + 0.25 * t;
    if (effect.kind === "hollowPurple") {
      ctx.strokeStyle = `rgba(125, 211, 252, ${0.68 * t})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(-34 + age * 22, -10, 20 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(248, 113, 113, ${0.68 * t})`;
      ctx.beginPath();
      ctx.arc(34 - age * 22, -10, 20 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      const purpleGlow = ctx.createRadialGradient(0, -10, 1, 0, -10, 56 * pulse);
      purpleGlow.addColorStop(0, `rgba(255, 255, 255, ${0.84 * age})`);
      purpleGlow.addColorStop(0.22, `rgba(216, 180, 254, ${0.74 * age})`);
      purpleGlow.addColorStop(0.62, `rgba(124, 58, 237, ${0.46 * age})`);
      purpleGlow.addColorStop(1, "rgba(76, 29, 149, 0)");
      ctx.fillStyle = purpleGlow;
      ctx.beginPath();
      ctx.arc(0, -10, 56 * pulse, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = `rgba(2, 6, 23, ${0.92 * t})`;
      ctx.lineWidth = 8;
      for (let i = 0; i < 5; i += 1) {
        const y = -38 + i * 17 + Math.sin(frame * 0.13 + i) * 4;
        ctx.beginPath();
        ctx.moveTo(-78 - age * 16, y);
        ctx.lineTo(78 + age * 20, y - 14);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.7 * t})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-86, -6);
      ctx.lineTo(86, -24);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawWorldSlashEffects() {
  for (const effect of worldSlashEffects) {
    const t = effect.life / effect.maxLife;
    const age = 1 - t;
    const crackReady = effect.life < effect.maxLife - effect.splitDelay;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = Math.max(0, t);
    ctx.lineCap = "round";
    ctx.strokeStyle = `rgba(2, 6, 23, ${0.96 * t})`;
    ctx.lineWidth = crackReady ? 10 : 5;
    ctx.beginPath();
    ctx.moveTo(effect.x1, effect.y1);
    ctx.lineTo(effect.x2, effect.y2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(248, 113, 113, ${0.86 * t})`;
    ctx.lineWidth = crackReady ? 4 : 2;
    ctx.beginPath();
    ctx.moveTo(effect.x1, effect.y1);
    ctx.lineTo(effect.x2, effect.y2);
    ctx.stroke();

    if (crackReady) {
      const dx = effect.x2 - effect.x1;
      const dy = effect.y2 - effect.y1;
      const length = Math.hypot(dx, dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      ctx.strokeStyle = `rgba(2, 6, 23, ${0.82 * t})`;
      ctx.lineWidth = 4;
      for (const branch of effect.branches || []) {
        const bx = effect.x1 + dx * branch.t;
        const by = effect.y1 + dy * branch.t;
        const side = Math.sign(branch.offset) || 1;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + nx * branch.length * side, by + ny * branch.length * side + branch.offset * 0.25);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(127, 29, 29, ${0.13 * t})`;
      ctx.beginPath();
      ctx.rect(Math.min(effect.x1, effect.x2), effect.y1 - 24 - age * 18, Math.abs(effect.x2 - effect.x1), 48 + age * 28);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawFugaExplosions() {
  for (const effect of fugaExplosions) {
    const t = effect.life / effect.maxLife;
    const age = 1 - t;
    const radius = effect.radius;
    ctx.save();
    ctx.translate(effect.x, effect.y);
    ctx.globalAlpha = Math.max(0, t);
    ctx.globalCompositeOperation = "lighter";

    const glow = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * (0.35 + age * 0.72));
    glow.addColorStop(0, `rgba(255, 255, 255, ${0.95 * t})`);
    glow.addColorStop(0.16, `rgba(254, 240, 138, ${0.9 * t})`);
    glow.addColorStop(0.46, `rgba(249, 115, 22, ${0.72 * t})`);
    glow.addColorStop(0.78, `rgba(127, 29, 29, ${0.46 * t})`);
    glow.addColorStop(1, "rgba(2, 6, 23, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, radius * (0.36 + age * 0.7), 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(254, 240, 138, ${0.78 * t})`;
    ctx.lineWidth = 8 * t + 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius * (0.18 + age * 0.62), 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(2, 6, 23, ${0.78 * t})`;
    ctx.lineWidth = 5 * t + 1;
    for (let i = 0; i < 8; i += 1) {
      const angle = effect.spin + i * Math.PI / 4;
      const wobble = Math.sin(frame * 0.08 + i) * 0.16;
      const inner = radius * (0.16 + age * 0.25);
      const outer = radius * (0.34 + age * 0.68);
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
      ctx.lineTo(Math.cos(angle + wobble) * outer, Math.sin(angle + wobble) * outer);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(15, 23, 42, ${0.16 * t})`;
    ctx.beginPath();
    ctx.ellipse(-radius * 0.05, radius * 0.12, radius * (0.24 + age * 0.35), radius * (0.16 + age * 0.28), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawShieldBreakEffects() {
  for (const effect of shieldBreakEffects) {
    const t = effect.life / effect.maxLife;
    const age = 1 - t;
    ctx.save();
    ctx.translate(effect.x, effect.y);
    ctx.globalAlpha = Math.max(0, t);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 4 * t + 1;
    ctx.setLineDash([8 + age * 14, 10]);
    ctx.lineDashOffset = -frame * 0.9;
    ctx.beginPath();
    ctx.ellipse(0, 0, 48 + age * 38, 76 + age * 46, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = effect.darkColor;
    ctx.lineWidth = 3 * t + 1;
    ctx.lineCap = "round";
    for (let i = 0; i < 10; i += 1) {
      const angle = effect.spin + i * Math.PI * 0.2;
      const innerX = Math.cos(angle) * (26 + age * 24);
      const innerY = Math.sin(angle) * (42 + age * 30);
      const outerX = Math.cos(angle) * (54 + age * 50);
      const outerY = Math.sin(angle) * (82 + age * 54);
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawProjectileDisperses() {
  for (const effect of projectileDisperses) {
    const t = effect.life / effect.maxLife;
    const age = 1 - t;
    const radius = effect.radius;
    ctx.save();
    ctx.translate(effect.x, effect.y);
    ctx.globalAlpha = t;
    ctx.lineCap = "round";

    if (effect.move === "purple") {
      const spin = frame * 0.22 + effect.spin;
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `rgba(216, 180, 254, ${0.9 * t})`;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.9 + age * 1.85), spin, spin + Math.PI * (1.2 + age));
      ctx.stroke();
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.62 * t})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.55 + age * 1.35), -spin, -spin + Math.PI * 1.4);
      ctx.stroke();
      ctx.strokeStyle = `rgba(248, 113, 113, ${0.58 * t})`;
      for (let i = 0; i < 9; i += 1) {
        const a = spin + i * Math.PI / 4.5;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * radius * 0.28, Math.sin(a) * radius * 0.28);
        ctx.lineTo(Math.cos(a) * radius * (1.8 + age), Math.sin(a) * radius * (1.8 + age));
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    } else if (effect.move === "blue") {
      const spin = frame * 0.18 + effect.spin;
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 * t})`;
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i += 1) {
        const r = radius * (0.55 + age * 1.4 + i * 0.32);
        ctx.beginPath();
        ctx.arc(0, 0, r, spin + i * 1.4, spin + i * 1.4 + Math.PI * (0.7 + age));
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(224, 242, 254, ${0.75 * t})`;
      for (let i = 0; i < 5; i += 1) {
        const a = spin + i * Math.PI * 0.42;
        const r = radius * (1.05 + age * 1.2);
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 2.2 + age * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (effect.move === "red") {
      ctx.strokeStyle = `rgba(248, 113, 113, ${0.85 * t})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.8 + age * 1.5), 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(127, 29, 29, ${0.8 * t})`;
      ctx.lineWidth = 3;
      for (let i = 0; i < 8; i += 1) {
        const a = effect.spin + i * Math.PI / 4;
        const inner = radius * (0.3 + age * 0.75);
        const outer = radius * (0.9 + age * 1.65);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
        ctx.stroke();
      }
    } else {
      const effectAngle = Number(effect.angle);
      if (Number.isFinite(effectAngle)) ctx.rotate(effectAngle);
      else ctx.scale(effect.dir, 1);
      ctx.rotate(-0.14);
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.78 * t})`;
      ctx.lineWidth = 4;
      for (let i = 0; i < 5; i += 1) {
        const y = (i - 2) * 7;
        const spread = age * radius * 1.2;
        ctx.beginPath();
        ctx.moveTo(-radius * 1.1 - spread * 0.4, y);
        ctx.lineTo(radius * 1.1 + spread, y - 8 + i * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(2, 6, 23, ${0.7 * t})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-radius * 1.2 - age * 10, radius * 0.42);
      ctx.lineTo(radius * 1.35 + age * 16, -radius * 0.7);
      ctx.stroke();
    }

    ctx.restore();
  }
}

function drawHitSparks() {
  for (const spark of hitSparks) {
    const t = spark.life / spark.maxLife;
    ctx.save();
    ctx.translate(spark.x, spark.y);
    ctx.globalAlpha = t;
    ctx.strokeStyle = spark.color;
    ctx.lineWidth = spark.kind === "block" ? 3 : 4;
    ctx.lineCap = "round";
    const shrineSpark = spark.kind === "slash" || spark.kind === "cleave";
    const fugaSpark = spark.kind === "fuga";
    if (shrineSpark) {
      ctx.strokeStyle = `rgba(2, 6, 23, ${0.85 * t})`;
      ctx.lineWidth = spark.kind === "cleave" ? 8 : 5;
      ctx.beginPath();
      ctx.moveTo(-spark.dir * 24 * t, -12 * t);
      ctx.lineTo(spark.dir * 24 * t, 12 * t);
      ctx.moveTo(-spark.dir * 18 * t, 14 * t);
      ctx.lineTo(spark.dir * 18 * t, -14 * t);
      ctx.stroke();
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.95 * t})`;
      ctx.lineWidth = spark.kind === "cleave" ? 4 : 3;
    } else if (spark.kind === "blue") {
      ctx.strokeStyle = `rgba(14, 165, 233, ${0.8 * t})`;
      ctx.lineWidth = 3;
      for (let ring = 0; ring < 2; ring += 1) {
        ctx.beginPath();
        ctx.arc(0, 0, (8 + ring * 9) * t, frame * 0.16 + ring, frame * 0.16 + ring + Math.PI * 1.45);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(224, 242, 254, ${0.75 * t})`;
      ctx.lineWidth = 2;
    } else if (spark.kind === "red") {
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(127, 29, 29, ${0.36 * t})`;
      ctx.beginPath();
      ctx.arc(0, 0, 34 * t + 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(190, 18, 60, ${0.85 * t})`;
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(-spark.dir * 38 * t, 0);
      ctx.lineTo(spark.dir * 44 * t, 0);
      ctx.moveTo(0, -28 * t);
      ctx.lineTo(0, 28 * t);
      ctx.stroke();
      ctx.strokeStyle = `rgba(254, 226, 226, ${0.95 * t})`;
      ctx.lineWidth = 3.5;
    } else if (spark.kind === "purple") {
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(88, 28, 135, ${0.45 * t})`;
      ctx.beginPath();
      ctx.arc(0, 0, 46 * t + 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(216, 180, 254, ${0.95 * t})`;
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(-spark.dir * 48 * t, -14 * t);
      ctx.lineTo(spark.dir * 54 * t, 14 * t);
      ctx.moveTo(-spark.dir * 36 * t, 18 * t);
      ctx.lineTo(spark.dir * 40 * t, -18 * t);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.86 * t})`;
      ctx.lineWidth = 3.5;
    } else if (fugaSpark) {
      ctx.strokeStyle = `rgba(249, 115, 22, ${0.92 * t})`;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-spark.dir * 30 * t, 0);
      ctx.lineTo(spark.dir * 34 * t, 0);
      ctx.moveTo(0, -24 * t);
      ctx.lineTo(0, 24 * t);
      ctx.stroke();
      ctx.strokeStyle = `rgba(254, 240, 138, ${0.9 * t})`;
      ctx.lineWidth = 3;
    }
    for (let i = 0; i < (shrineSpark || fugaSpark ? 10 : 7); i += 1) {
      const angle = (Math.PI * 2 / 7) * i + spark.dir * 0.2;
      const inner = 4 + (1 - t) * 5;
      const outer = (spark.kind === "fuga" ? 36 : spark.kind === "cleave" ? 32 : spark.kind === "heavy" || spark.kind === "slash" ? 23 : 16) * t + 5;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
      ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.stroke();
    }
    ctx.fillStyle = shrineSpark ? `rgba(127, 29, 29, ${0.8 * t})` : fugaSpark ? `rgba(254, 240, 138, ${0.9 * t})` : "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(0, 0, 3 + 4 * t, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawLimitlessOrb(move, radius, dir = 1) {
  ctx.save();
  if (move === "red") {
    ctx.scale(dir, 1);
    const pulse = 1 + Math.sin(frame * 0.34) * 0.08;
    const redGlow = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius * 1.75 * pulse);
    redGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    redGlow.addColorStop(0.18, "rgba(254, 202, 202, 0.95)");
    redGlow.addColorStop(0.48, "rgba(239, 68, 68, 0.82)");
    redGlow.addColorStop(1, "rgba(127, 29, 29, 0)");
    ctx.fillStyle = redGlow;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.75 * pulse, radius * 1.35 * pulse, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(248, 113, 113, 0.92)";
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.88, radius * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.beginPath();
    ctx.ellipse(radius * 0.18, -radius * 0.12, radius * 0.34, radius * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(127, 29, 29, 0.72)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-radius * 1.55, -radius * 0.42);
    ctx.lineTo(-radius * 0.35, -radius * 0.16);
    ctx.moveTo(-radius * 1.35, radius * 0.48);
    ctx.lineTo(-radius * 0.24, radius * 0.22);
    ctx.stroke();

    ctx.strokeStyle = "rgba(254, 226, 226, 0.95)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.02, frame * 0.18, frame * 0.18 + Math.PI * 1.15);
    ctx.stroke();
  } else if (move === "blue") {
    const spin = frame * 0.16;
    const pulse = 1 + Math.sin(frame * 0.22) * 0.06;
    const blueGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, radius * 1.8 * pulse);
    blueGlow.addColorStop(0, "rgba(2, 6, 23, 0.95)");
    blueGlow.addColorStop(0.28, "rgba(29, 78, 216, 0.92)");
    blueGlow.addColorStop(0.6, "rgba(56, 189, 248, 0.72)");
    blueGlow.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = blueGlow;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.8 * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(224, 242, 254, 0.9)";
    ctx.beginPath();
    ctx.arc(-radius * 0.15, -radius * 0.12, radius * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(186, 230, 253, 0.9)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.82 + i * 0.28), spin + i * 1.8, spin + i * 1.8 + Math.PI * 1.25);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(14, 165, 233, 0.65)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i += 1) {
      const a = spin + i * Math.PI / 3;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * radius * 1.05, Math.sin(a) * radius * 1.05);
      ctx.lineTo(Math.cos(a + 0.42) * radius * 1.55, Math.sin(a + 0.42) * radius * 1.55);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(224, 242, 254, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius + 6, spin, spin + Math.PI * 1.5);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShrineTechniqueShape(move, radius) {
  ctx.save();
  ctx.rotate(move === "cleave" ? -0.18 : -0.1);
  if (move === "slash") {
    ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
    ctx.beginPath();
    ctx.moveTo(-radius * 1.4, -radius * 0.32);
    ctx.lineTo(radius * 1.65, -radius * 0.95);
    ctx.lineTo(radius * 1.35, -radius * 0.25);
    ctx.lineTo(radius * 1.8, radius * 0.12);
    ctx.lineTo(-radius * 1.2, radius * 0.68);
    ctx.lineTo(-radius * 0.75, radius * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(220, 38, 38, 0.95)";
    ctx.beginPath();
    ctx.moveTo(-radius * 1.1, -radius * 0.2);
    ctx.lineTo(radius * 1.25, -radius * 0.62);
    ctx.lineTo(radius * 0.95, -radius * 0.15);
    ctx.lineTo(radius * 1.38, radius * 0.1);
    ctx.lineTo(-radius * 0.95, radius * 0.48);
    ctx.lineTo(-radius * 0.55, radius * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(15, 23, 42, 0.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-radius * 1.2, radius * 0.45);
    ctx.lineTo(radius * 1.45, -radius * 0.72);
    ctx.stroke();
  } else {
    ctx.fillStyle = "rgba(2, 6, 23, 0.92)";
    ctx.beginPath();
    ctx.moveTo(-radius * 0.7, -radius * 0.85);
    ctx.lineTo(radius * 1.35, -radius * 1.25);
    ctx.lineTo(radius * 0.72, -radius * 0.12);
    ctx.lineTo(radius * 1.45, radius * 0.62);
    ctx.lineTo(-radius * 0.75, radius * 1.1);
    ctx.lineTo(-radius * 0.2, radius * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
    ctx.beginPath();
    ctx.moveTo(-radius * 0.35, -radius * 0.55);
    ctx.lineTo(radius * 0.9, -radius * 0.82);
    ctx.lineTo(radius * 0.42, -radius * 0.05);
    ctx.lineTo(radius * 0.95, radius * 0.42);
    ctx.lineTo(-radius * 0.35, radius * 0.7);
    ctx.lineTo(0, radius * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(127, 29, 29, 0.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-radius * 0.8, radius * 0.95);
    ctx.lineTo(radius * 1.25, -radius * 1.1);
    ctx.moveTo(-radius * 0.6, -radius * 0.75);
    ctx.lineTo(radius * 1.28, radius * 0.58);
    ctx.stroke();
  }
  ctx.restore();
}

function getAimPreviewDistance(move, spec, chargeRatio, aimVector, attacker = null, radius = spec.radius) {
  const aimLimit = Number.isFinite(aimVector?.distance) ? Math.max(8, aimVector.distance) : Infinity;
  const usesExactMouseEnd = move === "cleave" || move === "fuga";
  const domainSlashBoost = attacker && isDomainOwner(attacker, "malevolentShrine");

  const maxDistance = move === "cleave"
    ? domainSlashBoost ? 178 : 118
    : Math.max(120, spec.speed * (spec.life + (move === "blue" || move === "red" ? Math.round(chargeRatio * 10) : 0) + (domainSlashBoost && move === "slash" ? 34 : 0)));

  const target = attacker === player ? enemy : attacker === enemy ? player : null;

  if (usesExactMouseEnd) {
    const distances = [Math.min(maxDistance, aimLimit)];
    if (target && !target.ko) {
      const targetRadius = move === "cleave" ? Math.max(20, spec.radius * 0.55) : radius;
      distances.push(getRayRectHitDistance(aimVector, maxDistance, targetRadius, target));
    }
    return Math.max(8, Math.min(...distances.filter((distance) => Number.isFinite(distance) && distance > 0)));
  }

  // Blue, Red, Dismantle, Hollow Purple, World Slash, and other ranged moves aim toward the mouse
  // but do NOT stop at the mouse. They keep traveling until their own range/lifetime ends.
  const chargedLife = spec.life + (move === "blue" || move === "red" ? Math.round(chargeRatio * 10) : 0) + (domainSlashBoost && move === "slash" ? 34 : 0);
  const fullTravel = Math.max(120, spec.speed * chargedLife);
  const distances = [fullTravel];

  distances.push(
    aimVector.x > 0.001 ? (STAGE_W - radius - aimVector.origin.x) / aimVector.x : Infinity,
    aimVector.x < -0.001 ? (radius - aimVector.origin.x) / aimVector.x : Infinity,
    aimVector.y > 0.001 ? (GROUND - radius - aimVector.origin.y) / aimVector.y : Infinity,
    aimVector.y < -0.001 ? (radius - aimVector.origin.y) / aimVector.y : Infinity
  );

  return Math.max(8, Math.min(...distances.filter((distance) => Number.isFinite(distance) && distance > 0)));
}

function drawTechniqueAimPreview(f) {
  const move = getTechniqueMoveKey(f, f.chargingTechnique);
  const spec = techniqueMoves[move];
  if (!spec) return;
  const chargeRatio = getTechniqueChargeRatio(f);
  const showOnlyChargeOrb = f !== getActiveMouseTechniqueFighter();
  const aimVector = getTechniqueAimVector(f, move, f.techniqueAim);
  const radiusScale = f.technique === "limitless" ? 1 + chargeRatio * (move === "red" ? 0.95 : 0.85) : 1;
  const radius = spec.radius * radiusScale;

  if (move === "blue" || move === "red") {
    const chargeDistance = 38 + chargeRatio * 12;
    ctx.save();
    ctx.translate(
      aimVector.origin.x + aimVector.x * chargeDistance,
      aimVector.origin.y + aimVector.y * chargeDistance
    );
    drawLimitlessOrb(move, radius, aimVector.dir);
    ctx.restore();
  }

  if (showOnlyChargeOrb) return;

  const previewDistance = getAimPreviewDistance(move, spec, chargeRatio, aimVector, f, radius);
  const ghostX = aimVector.origin.x + aimVector.x * previewDistance;
  const ghostY = aimVector.origin.y + aimVector.y * previewDistance;

  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = move === "blue" ? "#7dd3fc" : move === "red" ? "#fecaca" : "#fca5a5";
  ctx.lineWidth = move === "cleave" ? 5 : 3;
  ctx.lineCap = "round";
  if (move === "blue" || move === "red") ctx.setLineDash([12, 9]);
  ctx.beginPath();
  ctx.moveTo(aimVector.origin.x, aimVector.origin.y);
  ctx.lineTo(ghostX, ghostY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.translate(ghostX, ghostY);
  if (move === "blue" || move === "red") {
    drawLimitlessOrb(move, radius, aimVector.dir);
  } else {
    ctx.rotate(aimVector.angle);
    drawShrineTechniqueShape(move, radius);
  }
  ctx.restore();
}

function drawProjectiles() {
  for (const p of projectiles) {
    ctx.save();
    ctx.translate(p.x, p.y);
    const projectileAngle = Number(p.angle);
    const hasProjectileAngle = Number.isFinite(projectileAngle);
    if (p.move === "purple") {
      if (hasProjectileAngle) ctx.rotate(projectileAngle);
      else ctx.scale(p.dir, 1);
      const pulse = 1 + Math.sin(frame * 0.22) * 0.05;
      ctx.globalCompositeOperation = "lighter";
      const glow = ctx.createRadialGradient(0, 0, p.radius * 0.12, 0, 0, p.radius * 2.35 * pulse);
      glow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      glow.addColorStop(0.18, "rgba(216, 180, 254, 0.95)");
      glow.addColorStop(0.46, "rgba(124, 58, 237, 0.84)");
      glow.addColorStop(0.82, "rgba(37, 99, 235, 0.38)");
      glow.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 2.18 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 0.52, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(109, 40, 217, 0.96)";
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 0.84, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(224, 242, 254, 0.9)";
      ctx.beginPath();
      ctx.arc(p.radius * 0.18, -p.radius * 0.18, p.radius * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(248, 113, 113, 0.88)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 1.06, frame * 0.19, frame * 0.19 + Math.PI * 1.35);
      ctx.stroke();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.88)";
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 1.34, -frame * 0.14, -frame * 0.14 + Math.PI * 1.25);
      ctx.stroke();
      ctx.strokeStyle = "rgba(216, 180, 254, 0.62)";
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 3.4, 0);
      ctx.lineTo(-p.radius * 1.1, 0);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
    } else if (p.move === "worldSlash") {
      if (hasProjectileAngle) ctx.rotate(projectileAngle);
      else ctx.scale(p.dir, 1);
      const pulse = 1 + Math.sin(frame * 0.26) * 0.05;
      ctx.lineCap = "round";

      // outer white outline
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.98;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.98)";
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.arc(-p.radius * 0.08, 0, p.radius * 1.34 * pulse, -Math.PI * 0.84, Math.PI * 0.16);
      ctx.stroke();

      // black crescent body
      ctx.strokeStyle = "rgba(2, 6, 23, 0.995)";
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.arc(p.radius * 0.14, 0, p.radius * 1.15 * pulse, -Math.PI * 0.8, Math.PI * 0.12);
      ctx.stroke();

      // inner dark fill streak to sell the slash shape
      ctx.strokeStyle = "rgba(15, 23, 42, 0.92)";
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.arc(p.radius * 0.24, 0, p.radius * 0.9 * pulse, -Math.PI * 0.72, Math.PI * 0.06);
      ctx.stroke();

      // trailing white accent
      ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.25, -p.radius * 0.06);
      ctx.lineTo(-p.radius * 2.85, -p.radius * 0.02);
      ctx.stroke();

      // subtle trailing shadow
      ctx.strokeStyle = "rgba(2, 6, 23, 0.6)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 0.95, p.radius * 0.18);
      ctx.lineTo(-p.radius * 2.4, p.radius * 0.26);
      ctx.stroke();

      ctx.globalCompositeOperation = "source-over";
    } else if (p.move === "red") {
      if (hasProjectileAngle) ctx.rotate(projectileAngle);
      else ctx.scale(p.dir, 1);
      const visualGrow = Math.min(1, ((p.visualSpawnAge || 1) / 10));
      const visualScale = 0.12 + (1 - Math.pow(1 - visualGrow, 3)) * 0.88; // VISUAL_RED_GROW_PATCH
      ctx.scale(visualScale, visualScale);
      const pulse = 1 + Math.sin(frame * 0.34) * 0.08;
      const redGlow = ctx.createRadialGradient(0, 0, p.radius * 0.15, 0, 0, p.radius * 1.75 * pulse);
      redGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      redGlow.addColorStop(0.18, "rgba(254, 202, 202, 0.95)");
      redGlow.addColorStop(0.48, "rgba(239, 68, 68, 0.82)");
      redGlow.addColorStop(1, "rgba(127, 29, 29, 0)");
      ctx.fillStyle = redGlow;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.radius * 1.75 * pulse, p.radius * 1.35 * pulse, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(248, 113, 113, 0.92)";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.radius * 0.88, p.radius * 0.72, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      ctx.beginPath();
      ctx.ellipse(p.radius * 0.18, -p.radius * 0.12, p.radius * 0.34, p.radius * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(127, 29, 29, 0.72)";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.55, -p.radius * 0.42);
      ctx.lineTo(-p.radius * 0.35, -p.radius * 0.16);
      ctx.moveTo(-p.radius * 1.35, p.radius * 0.48);
      ctx.lineTo(-p.radius * 0.24, p.radius * 0.22);
      ctx.stroke();

      ctx.strokeStyle = "rgba(254, 226, 226, 0.95)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 1.02, frame * 0.18, frame * 0.18 + Math.PI * 1.15);
      ctx.stroke();
    } else if (p.move === "blue") {
      const visualGrow = Math.min(1, ((p.visualSpawnAge || 1) / 10));
      const visualScale = 0.12 + (1 - Math.pow(1 - visualGrow, 3)) * 0.88; // VISUAL_BLUE_GROW_PATCH
      ctx.scale(visualScale, visualScale);
      const spin = frame * 0.16;
      const pulse = 1 + Math.sin(frame * 0.22) * 0.06;
      const blueGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, p.radius * 1.8 * pulse);
      blueGlow.addColorStop(0, "rgba(2, 6, 23, 0.95)");
      blueGlow.addColorStop(0.28, "rgba(29, 78, 216, 0.92)");
      blueGlow.addColorStop(0.6, "rgba(56, 189, 248, 0.72)");
      blueGlow.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = blueGlow;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 1.8 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 0.52, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(224, 242, 254, 0.9)";
      ctx.beginPath();
      ctx.arc(-p.radius * 0.15, -p.radius * 0.12, p.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(186, 230, 253, 0.9)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * (0.82 + i * 0.28), spin + i * 1.8, spin + i * 1.8 + Math.PI * 1.25);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(14, 165, 233, 0.65)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i += 1) {
        const a = spin + i * Math.PI / 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * p.radius * 1.05, Math.sin(a) * p.radius * 1.05);
        ctx.lineTo(Math.cos(a + 0.42) * p.radius * 1.55, Math.sin(a + 0.42) * p.radius * 1.55);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(224, 242, 254, 0.78)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius + 6, spin, spin + Math.PI * 1.5);
      ctx.stroke();
    } else if (p.move === "fuga") {
      if (hasProjectileAngle) ctx.rotate(projectileAngle);
      else ctx.scale(p.dir, 1);
      const pulse = 1 + Math.sin(frame * 0.36) * 0.08;
      const flameGlow = ctx.createRadialGradient(-p.radius * 0.5, 0, 1, -p.radius * 0.2, 0, p.radius * 2.9 * pulse);
      flameGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      flameGlow.addColorStop(0.2, "rgba(254, 240, 138, 0.92)");
      flameGlow.addColorStop(0.48, "rgba(249, 115, 22, 0.82)");
      flameGlow.addColorStop(1, "rgba(127, 29, 29, 0)");
      ctx.fillStyle = flameGlow;
      ctx.beginPath();
      ctx.ellipse(-p.radius * 0.25, 0, p.radius * 2.75 * pulse, p.radius * 0.95 * pulse, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(2, 6, 23, 0.92)";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.85, -p.radius * 0.18);
      ctx.lineTo(p.radius * 1.06, -p.radius * 0.18);
      ctx.lineTo(p.radius * 1.86, 0);
      ctx.lineTo(p.radius * 1.06, p.radius * 0.18);
      ctx.lineTo(-p.radius * 1.85, p.radius * 0.18);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(185, 28, 28, 0.96)";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.25, -p.radius * 0.09);
      ctx.lineTo(p.radius * 1.02, -p.radius * 0.09);
      ctx.lineTo(p.radius * 1.55, 0);
      ctx.lineTo(p.radius * 1.02, p.radius * 0.09);
      ctx.lineTo(-p.radius * 1.25, p.radius * 0.09);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(2, 6, 23, 0.96)";
      ctx.beginPath();
      ctx.moveTo(p.radius * 0.72, -p.radius * 0.58);
      ctx.lineTo(p.radius * 2.12, 0);
      ctx.lineTo(p.radius * 0.72, p.radius * 0.58);
      ctx.lineTo(p.radius * 1.02, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(254, 240, 138, 0.95)";
      ctx.beginPath();
      ctx.moveTo(p.radius * 0.88, -p.radius * 0.28);
      ctx.lineTo(p.radius * 1.72, 0);
      ctx.lineTo(p.radius * 0.88, p.radius * 0.28);
      ctx.lineTo(p.radius * 1.08, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(254, 240, 138, 0.92)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.62, 0);
      ctx.lineTo(p.radius * 1.2, 0);
      ctx.stroke();

      ctx.strokeStyle = "rgba(2, 6, 23, 0.82)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.65, -p.radius * 0.52);
      ctx.lineTo(-p.radius * 0.92, 0);
      ctx.lineTo(-p.radius * 1.65, p.radius * 0.52);
      ctx.moveTo(-p.radius * 1.28, -p.radius * 0.44);
      ctx.lineTo(-p.radius * 0.62, 0);
      ctx.lineTo(-p.radius * 1.28, p.radius * 0.44);
      ctx.stroke();

      ctx.fillStyle = "rgba(254, 240, 138, 0.9)";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 2.0, -p.radius * 0.48);
      ctx.quadraticCurveTo(-p.radius * 2.75, 0, -p.radius * 2.0, p.radius * 0.5);
      ctx.quadraticCurveTo(-p.radius * 1.48, 0, -p.radius * 2.0, -p.radius * 0.48);
      ctx.fill();

      ctx.strokeStyle = "rgba(127, 29, 29, 0.92)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.2, -p.radius * 0.28);
      ctx.lineTo(p.radius * 1.25, -p.radius * 0.08);
      ctx.moveTo(-p.radius * 1.2, p.radius * 0.28);
      ctx.lineTo(p.radius * 1.25, p.radius * 0.08);
      ctx.stroke();
    } else if (p.move === "slash") {
      if (hasProjectileAngle) ctx.rotate(projectileAngle);
      else ctx.scale(p.dir, 1);
      ctx.rotate(-0.1);
      ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.4, -p.radius * 0.32);
      ctx.lineTo(p.radius * 1.65, -p.radius * 0.95);
      ctx.lineTo(p.radius * 1.35, -p.radius * 0.25);
      ctx.lineTo(p.radius * 1.8, p.radius * 0.12);
      ctx.lineTo(-p.radius * 1.2, p.radius * 0.68);
      ctx.lineTo(-p.radius * 0.75, p.radius * 0.08);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(220, 38, 38, 0.95)";
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.1, -p.radius * 0.2);
      ctx.lineTo(p.radius * 1.25, -p.radius * 0.62);
      ctx.lineTo(p.radius * 0.95, -p.radius * 0.15);
      ctx.lineTo(p.radius * 1.38, p.radius * 0.1);
      ctx.lineTo(-p.radius * 0.95, p.radius * 0.48);
      ctx.lineTo(-p.radius * 0.55, p.radius * 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(15, 23, 42, 0.95)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 1.2, p.radius * 0.45);
      ctx.lineTo(p.radius * 1.45, -p.radius * 0.72);
      ctx.stroke();
    } else {
      if (hasProjectileAngle) ctx.rotate(projectileAngle);
      else ctx.scale(p.dir, 1);
      ctx.rotate(-0.18);
      const t = p.life / Math.max(1, techniqueMoves.cleave.life);
      ctx.fillStyle = `rgba(2, 6, 23, ${0.92 * t})`;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 0.7, -p.radius * 0.85);
      ctx.lineTo(p.radius * 1.35, -p.radius * 1.25);
      ctx.lineTo(p.radius * 0.72, -p.radius * 0.12);
      ctx.lineTo(p.radius * 1.45, p.radius * 0.62);
      ctx.lineTo(-p.radius * 0.75, p.radius * 1.1);
      ctx.lineTo(-p.radius * 0.2, p.radius * 0.08);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = `rgba(220, 38, 38, ${0.9 * t})`;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 0.35, -p.radius * 0.55);
      ctx.lineTo(p.radius * 0.9, -p.radius * 0.82);
      ctx.lineTo(p.radius * 0.42, -p.radius * 0.05);
      ctx.lineTo(p.radius * 0.95, p.radius * 0.42);
      ctx.lineTo(-p.radius * 0.35, p.radius * 0.7);
      ctx.lineTo(0, p.radius * 0.02);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = `rgba(127, 29, 29, ${0.95 * t})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-p.radius * 0.8, p.radius * 0.95);
      ctx.lineTo(p.radius * 1.25, -p.radius * 1.1);
      ctx.moveTo(-p.radius * 0.6, -p.radius * 0.75);
      ctx.lineTo(p.radius * 1.28, p.radius * 0.58);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawHitboxHint(f) {
  const attack = getAttackSpec(f);
  if (f.attackFrame < attack.windup || f.attackFrame > attack.windup + attack.active) return;
  const box = getHitbox(f);
  ctx.strokeStyle = "rgba(255, 246, 183, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.w, box.h);
}

function draw() {
  updateCamera();
  drawViewportBackdrop();

  ctx.save();
  if (shake > 0) {
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
    shake *= 0.78;
    if (shake < 0.4) shake = 0;
  }
  ctx.translate(0, getCameraYOffset());
  ctx.scale(cameraZoom, cameraZoom);
  ctx.translate(-cameraX, 0);
  drawCity();
  drawEffects();
  drawFighter(player, getPlayerLabel(), getPlayerLabelColor());
  drawFighter(enemy, getEnemyLabel(), getEnemyLabelColor());
  drawShieldBreakEffects();
  ctx.restore();
  drawUltimateScreenEffects();
}

function drawUltimateScreenEffects() {
  if (!ultimateScreenEffect || ultimateScreenEffect.ticks <= 0) return;
  const t = ultimateScreenEffect.ticks / Math.max(1, ultimateScreenEffect.maxTicks);
  const age = 1 - t;
  ctx.save();
  if (ultimateScreenEffect.kind === "hollowPurple") {
    ctx.fillStyle = `rgba(2, 6, 23, ${0.44 * Math.sin(Math.PI * t) + 0.08 * t})`;
    ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.6);
    glow.addColorStop(0, `rgba(168, 85, 247, ${0.12 * t})`);
    glow.addColorStop(0.55, `rgba(37, 99, 235, ${0.08 * t})`);
    glow.addColorStop(1, "rgba(2, 6, 23, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = `rgba(2, 6, 23, ${0.28 * t})`;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `rgba(127, 29, 29, ${0.44 * t})`;
    ctx.lineWidth = 3;
    for (let i = 0; i < 7; i += 1) {
      const y = H * (0.16 + i * 0.12) + Math.sin(frame * 0.09 + i) * 12;
      ctx.beginPath();
      ctx.moveTo(W * 0.08, y);
      ctx.lineTo(W * (0.92 - age * 0.05), y - 34 + i * 5);
      ctx.stroke();
    }
    if (ultimateScreenEffect.kind === "worldSlashRelease") {
      ctx.strokeStyle = `rgba(248, 250, 252, ${0.82 * t})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(W * 0.08, H * 0.52);
      ctx.lineTo(W * 0.92, H * 0.45);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function fixedUpdate() {
  frame += 1;
  if (hitStopTicks > 0) {
    hitStopTicks -= 1;
    updateHitSparks();
    updateHud();
    return;
  }
  if (gameState !== "playing") {
    if (gameMode === "online" && onlineRole === "p2" && (gameState === "lobby" || gameState === "roundOver") && player2Ready && readyCountdownValue <= 0 && performance.now() - lastOnlineReadySent > 500) {
      sendOnlineReady();
    }
    updateHud();
    return;
  }

  if (gameMode === "online" && onlineRole === "p2" && roundResolved && player2Ready && readyCountdownValue <= 0 && performance.now() - lastOnlineReadySent > 500) {
    sendOnlineReady();
  }

  if (!gameOver && !paused && gameMode === "online" && onlineRole === "p2") {
    updateOnlineRivalSelf();
    updateFighter(enemy, player);
    keepFightersApart();
    updateSukunaBarrage(enemy, player);
    updateSukunaGrabThrow(enemy, player);
    applyHit(enemy, player);
    updateProjectiles();
    updateHitSparks();
  } else if (!gameOver && !paused && !(gameMode === "online" && onlineRole !== "p1")) {
    updatePlayer();
    if (gameMode === "online") {
      updateRemoteRivalPlayer();
    } else if (gameMode === "pvp") {
      updateRivalPlayer();
    } else {
      updateEnemyAi();
    }
    updateFighter(player, enemy);
    updateFighter(enemy, player);
    keepFightersApart();
    updateSukunaBarrage(player, enemy);
    updateSukunaGrabThrow(player, enemy);
    if (gameMode !== "online") updateSukunaBarrage(enemy, player);
    if (gameMode !== "online") updateSukunaGrabThrow(enemy, player);
    applyHit(player, enemy);
    if (!(gameMode === "online" && onlineRole === "p1")) applyHit(enemy, player);
    updateProjectiles();
    updateHitSparks();
  } else if (roundEnding && !paused) {
    updateFighter(player, enemy);
    updateFighter(enemy, player);
    updateHitSparks();
    if ((player.lying || enemy.lying) && Math.max(player.koTimer, enemy.koTimer) > 50) {
      finishRound(koWinner);
    }
  }
  applyPracticeSettingsTick();
  updateHud();
}

function loop(now) {
  const elapsed = Math.min(100, now - lastFrameTime);
  lastFrameTime = now;

  if (paused) {
    fixedAccumulator = 0;
  } else {
    fixedAccumulator += elapsed;
    let steps = 0;
    while (fixedAccumulator >= FIXED_STEP && steps < MAX_CATCH_UP_STEPS) {
      fixedUpdate();
      fixedAccumulator -= FIXED_STEP;
      steps += 1;
    }
    if (steps === MAX_CATCH_UP_STEPS) fixedAccumulator = 0;
  }

  draw();
  if (!techniqueScreen.classList.contains("hidden")) renderTechniquePreviews();
  sendOnlineInputTick();
  sendOnlineFighterState();
  sendOnlineState();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (event) => {
  if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
  const key = event.key.toLowerCase();
  const code = event.code.toLowerCase();
  const handledKeys = ["a", "d", "w", "e", "q", "r", "f", "s", "c", " ", "shift", "tab", "arrowleft", "arrowright", "arrowup", "arrowdown", "p", "n", "m", "/", "escape"];
  const handledCodes = ["keya", "keyd", "keyw", "keye", "keyq", "keyr", "keyf", "keys", "keyc", "space", "shiftleft", "shiftright", "tab", "arrowleft", "arrowright", "arrowup", "arrowdown", "keyp", "keyn", "keym", "slash", "escape"];
  if (handledKeys.includes(key) || handledCodes.includes(code)) event.preventDefault();
  if (key === "escape" && !homeOpen) {
    setPaused(!paused);
    return;
  }
  if (homeOpen) return;
  if (paused) return;
  if (isEventForAction("jump", key, code) && !event.repeat && canUseKeyboardReady()) {
    playButtonClickSound();
    handleReadyClick();
    return;
  }
  if (gameState !== "playing") return;
  keys.add(key);
  keys.add(code);
  keys.add(event.key);
  keys.add(event.code);
  if (gameMode === "online" && onlineRole === "p2") {
    if (!event.repeat && isEventForAction("light", key, code)) noteAttackButtonPress(enemy, "light");
    if (!event.repeat && isEventForAction("heavy", key, code)) noteAttackButtonPress(enemy, "heavy");
    if (isEventForAction("throw", key, code) && !event.repeat && startBackThrow(enemy, false)) {
      sendOnlineInput("backThrow");
      return;
    }
    const action = getOnlineAction(key, code, event.repeat);
    if (action === "light") startAttack(enemy, "light");
    if (action === "heavy") startAttack(enemy, "heavy");
    if (action === "dodge") startDodge(enemy, getVectorFromInput(getOnlineInput()));
    if (action === "jump") jumpFighterWithMove(enemy, (getOnlineInput().right ? 1 : 0) - (getOnlineInput().left ? 1 : 0));
    if (action === "infinity") toggleInfinity(enemy);
    if (action === "ultimate") startUltimate(enemy);
    if (action === "ultimate-start") beginUltimateAim(enemy, enemy.techniqueAim || mouseAimWorld);
    sendOnlineInput(action);
    return;
  }
  if (!event.repeat && isEventForAction("light", key, code)) noteAttackButtonPress(player, "light");
  if (!event.repeat && isEventForAction("heavy", key, code)) noteAttackButtonPress(player, "heavy");
  if (isEventForAction("throw", key, code) && !event.repeat && startBackThrow(player, false)) return;
  if (!event.repeat && isEventForAction("light", key, code)) startAttack(player, "light");
  if (!event.repeat && isEventForAction("heavy", key, code)) startAttack(player, "heavy");
  if ((key === "f" || code === "keyf") && !event.repeat) {
    if (player.technique === "limitless") toggleInfinity(player);
  }
  if (isEventForAction("specialAim", key, code) && !event.repeat && !homeOpen && !paused && gameState === "playing") {
    const fighter = gameMode === "online" && onlineRole === "p2" ? enemy : player;
    if (fighter?.technique === "shrine") {
      if (prepareFuga(fighter, mouseAimWorld) && gameMode === "online" && onlineRole === "p2") sendOnlineInput("fuga-start", mouseAimWorld);
    } else if (fighter?.technique === "limitless") {
      if (prepareTeleport(fighter, mouseAimWorld) && gameMode === "online" && onlineRole === "p2") sendOnlineInput("teleport-start", mouseAimWorld);
    }
  }
  if (isEventForAction("ultimate", key, code) && !event.repeat) beginUltimateAim(player, mouseAimWorld);
  if (key === "shift" || code === "shiftleft" || code === "shiftright") startDodge(player, getPlayerDodgeVector());
  if (isEventForAction("jump", key, code) && !event.repeat) jumpPlayer();
  if (gameMode === "pvp") {
    if (!event.repeat && (key === "n" || code === "keyn")) noteAttackButtonPress(enemy, "light");
    if (!event.repeat && (key === "m" || code === "keym")) noteAttackButtonPress(enemy, "heavy");
    if ((key === "n" || code === "keyn" || key === "m" || code === "keym") && startBackThrow(enemy)) return;
    if (!event.repeat && (key === "n" || code === "keyn")) startAttack(enemy, "light");
    if (!event.repeat && (key === "m" || code === "keym")) startAttack(enemy, "heavy");
    if (key === "/" || code === "slash") startDodge(enemy, getRivalDodgeVector());
    if ((key === "arrowup" || code === "arrowup") && !event.repeat) jumpRivalPlayer();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
  const key = event.key.toLowerCase();
  const code = event.code.toLowerCase();
  const releaseAction = getTechniqueReleaseAction(key, code);
  keys.delete(event.key.toLowerCase());
  keys.delete(event.code.toLowerCase());
  if (isEventForAction("rct", event.key, event.code)) {
    cancelRct(player, true); // RCT_RELEASE_STOP_PATCH_EXACT
  }
  keys.delete(event.key);
  keys.delete(event.code);
  if (isEventForAction("specialAim", key, code) && !homeOpen && !paused && gameState === "playing") {
    const active = gameMode === "online" && onlineRole === "p2" ? enemy : player;
    if (active?.fugaAiming) {
      startFuga(active, active?.techniqueAim || mouseAimWorld);
      clearSpecialHoldState(active);
      if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("fuga", active?.techniqueAim || mouseAimWorld);
      return;
    }
    if (active?.teleportAiming) {
      performTeleport(active, active?.techniqueAim || mouseAimWorld);
      clearSpecialHoldState(active);
      if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("teleport", active?.techniqueAim || mouseAimWorld);
      return;
    }
    clearSpecialHoldState(active);
  }
  if (isEventForAction("ultimate", key, code) && !homeOpen && !paused && gameState === "playing") {
    const active = gameMode === "online" && onlineRole === "p2" ? enemy : player;
    const didRelease = releaseUltimateAim(active, active?.ultimateAimPoint || mouseAimWorld);
    if (gameMode === "online" && onlineRole === "p2") sendOnlineInput("ultimate-release", active?.ultimateAimPoint || mouseAimWorld);
    return;
  }
  if (gameMode === "online" && onlineRole === "p2" && releaseAction) {
    if (releaseAction === "ct1-release") releaseTechniqueInput(enemy, 1);
    if (releaseAction === "ct2-release") releaseTechniqueInput(enemy, 2);
    sendOnlineInput(releaseAction);
    return;
  }
  if (!homeOpen && !paused && gameState === "playing") {
    if (releaseAction === "ct1-release") releaseTechniqueInput(player, 1);
    if (releaseAction === "ct2-release") releaseTechniqueInput(player, 2);
  }
});

canvas.addEventListener("contextmenu", (event) => event.preventDefault());
canvas.addEventListener("mousedown", handleTechniqueMouseDown);
window.addEventListener("mousemove", (event) => {
  updateMouseAimFromEvent(event);
});
window.addEventListener("mouseup", handleTechniqueMouseUp);


settingsButtons.forEach((button) => button.addEventListener("click", openSettingsScreen));
if (settingsCloseButton) settingsCloseButton.addEventListener("click", closeSettingsScreen);
if (settingsScreen) settingsScreen.addEventListener("click", (event) => { if (event.target === settingsScreen) closeSettingsScreen(); });
if (buttonSfxVolumeSlider) {
  buttonSfxVolume = loadSimpleVolumeSetting(BUTTON_SFX_VOLUME_STORAGE_KEY, buttonSfxVolume);
  buttonSfxVolumeSlider.value = String(Math.round(buttonSfxVolume * 100));
  buttonSfxVolumeSlider.addEventListener("input", () => {
    buttonSfxVolume = Math.max(0, Math.min(1, Number(buttonSfxVolumeSlider.value) / 100 || 0));
    buttonClickSounds.forEach((sound) => { sound.volume = buttonSfxVolume; });
    saveSimpleVolumeSetting(BUTTON_SFX_VOLUME_STORAGE_KEY, buttonSfxVolume);
  });
}
if (gameSfxVolumeSlider) {
  gameSfxVolume = loadSimpleVolumeSetting(GAME_SFX_VOLUME_STORAGE_KEY, gameSfxVolume);
  gameSfxVolumeSlider.value = String(Math.round(gameSfxVolume * 100));
  gameSfxVolumeSlider.addEventListener("input", () => {
    gameSfxVolume = Math.max(0, Math.min(1, Number(gameSfxVolumeSlider.value) / 100 || 0));
    saveSimpleVolumeSetting(GAME_SFX_VOLUME_STORAGE_KEY, gameSfxVolume);
  });
}
if (usernameInput) {
  usernameInput.addEventListener("input", () => {
    localPlayerName = usernameInput.value.trim().slice(0, 18) || "Player";
    try { window.localStorage.setItem(PLAYER_NAME_STORAGE_KEY, localPlayerName); } catch (err) {}
    updatePlayerNameLabels();
    sendOnlineName();
  });
  loadLocalPlayerName();
}

restartButton.addEventListener("click", resetGame);
readyButton.addEventListener("click", handleReadyClick);
pauseButton.addEventListener("click", () => setPaused(true));
homeButton.addEventListener("click", openHomeScreen);
startFightButton.addEventListener("click", () => startFromHome(false));
practiceModeButton.addEventListener("click", () => startFromHome(true));
if (practiceSettingsButton) {
  practiceSettingsButton.addEventListener("click", () => {
    if (practiceSettingsScreen) practiceSettingsScreen.classList.remove("hidden");
  });
}
if (practiceSettingsCloseButton) {
  practiceSettingsCloseButton.addEventListener("click", () => {
    if (practiceSettingsScreen) practiceSettingsScreen.classList.add("hidden");
  });
}
if (practiceSettingsScreen) {
  practiceSettingsScreen.addEventListener("click", (event) => {
    if (event.target === practiceSettingsScreen) practiceSettingsScreen.classList.add("hidden");
  });
}
practiceSettingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.practiceSetting;
    if (!(key in practiceSettings)) return;
    practiceSettings[key] = button.dataset.value === "on";
    if (key === "dummyDamage") resetPracticeDamage();
    updatePracticeSettingsUi();
  });
});
hostBattleButton.addEventListener("click", () => {
  const room = cleanRoomCode(roomCodeInput.value, makeRoomCode());
  onlineRoom = room;
  roomCodeInput.value = room;
  homeScreen.classList.add("hidden");
  showWaiting("Waiting For Player 2", "Tell your friend to press Join Battle and enter this code.");
  connectOnline(room, "host");
});
joinBattleButton.addEventListener("click", () => {
  const room = cleanRoomCode(roomCodeInput.value, "battle");
  onlineRoom = room;
  roomCodeInput.value = roomCodeInput.value.trim() ? room : "";
  homeScreen.classList.add("hidden");
  showWaiting("Joining Battle", "Looking for the host with this code.");
  connectOnline(room, "join");
});
cancelOnlineButton.addEventListener("click", openHomeScreen);
cpuModeButton.addEventListener("click", () => {
  selectedMode = "cpu";
  updateHomeModeButtons();
});
pvpModeButton.addEventListener("click", () => {
  selectedMode = "pvp";
  updateHomeModeButtons();
});
difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cpuDifficulty = button.dataset.difficulty;
    updateDifficultyButtons();
  });
});
setRadioTrack(currentRadioTrackIndex, false);
setMusicVolume(musicVolume * 100);
musicVolumeSliders.forEach((slider) => {
  slider.addEventListener("input", () => setMusicVolume(slider.value));
});
musicToggleButtons.forEach((button) => {
  button.addEventListener("click", () => setMusicMuted(!musicMuted));
});
musicPrevButtons.forEach((button) => {
  button.addEventListener("click", playPreviousSong);
});
musicNextButtons.forEach((button) => {
  button.addEventListener("click", playNextSong);
});
musicProgressTracks.forEach((track) => {
  track.addEventListener("pointerdown", seekMusicFromProgressTrack);
  track.addEventListener("click", seekMusicFromProgressTrack);
});
radioOpenButtons.forEach((button) => {
  button.addEventListener("click", openRadioScreen);
});
if (radioCloseButton) radioCloseButton.addEventListener("click", closeRadioScreen);
if (radioScreen) {
  radioScreen.addEventListener("click", (event) => {
    if (event.target === radioScreen) closeRadioScreen();
  });
}
battleMusic.addEventListener("ended", playNextSong);
battleMusic.addEventListener("loadedmetadata", updateMusicProgressUi);
battleMusic.addEventListener("durationchange", updateMusicProgressUi);
battleMusic.addEventListener("timeupdate", updateMusicProgressUi);
battleMusic.addEventListener("play", updateMusicProgressUi);
battleMusic.addEventListener("pause", updateMusicProgressUi);
battleMusic.addEventListener("error", () => {
  const track = getCurrentRadioTrack();
  console.warn("Music failed to load, but auto-skip is disabled:", track?.title, track?.src, battleMusic.error);
});
techniqueButtons.forEach((button) => {
  button.addEventListener("click", () => finishTechniqueSelect(button.dataset.technique));
});
resumeButton.addEventListener("click", () => setPaused(false));
pauseRestartButton.addEventListener("click", resetGame);
pauseHomeButton.addEventListener("click", openHomeScreen);

resetGame();
updateHomeModeButtons();
updateDifficultyButtons();
updatePracticeSettingsUi();
if (onlineRequested) {
  homeScreen.classList.add("hidden");
  showWaiting(onlineSide === "join" ? "Joining Battle" : "Waiting For Player 2", "Connecting to the online room.");
  connectOnline(onlineRoom, onlineSide);
} else {
  openHomeScreen();
}
startBackgroundMusic();
window.addEventListener("load", startBackgroundMusic);
window.addEventListener("blur", stopCountdownSound);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCountdownSound();
  } else {
    startBackgroundMusic();
  }
});
requestAnimationFrame(loop);


function drawHitStopAimPreviewOverlay() {
  const fightersToCheck = [player, enemy];
  fightersToCheck.forEach((f) => {
    if (!f || !f.ultAiming && !f.isAimingTechnique) return;
    const move = f.ultAiming ? "ultimate" : (f.aimingMove || f.currentAimMove || "projectile");
    const origin = getTechniqueOrigin(f, move);
    const vector = getTechniqueAimVector(f, move, f.techniqueAim || mouseAimWorld);
    const maxRange = move === "ultimate" ? 900 : 520;
    const end = getAimPreviewEndpointWithHitStop(f, move, origin, vector, maxRange);
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = f.technique === "shrine" ? "#ffffff" : "#8fd7ff";
    ctx.lineWidth = 5;
    ctx.setLineDash([18, 10]);
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
  });
}



// RELIABLE_SETTINGS_AND_KEYBINDS_FIX
function forceOpenSettingsScreen() {
  const screen = document.getElementById("settingsScreen");
  if (!screen) return;
  screen.classList.remove("hidden");
}

function forceCloseSettingsScreen() {
  const screen = document.getElementById("settingsScreen");
  if (!screen) return;
  screen.classList.add("hidden");
}

function forceOpenKeybindScreen() {
  const screen = document.getElementById("keybindScreen");
  if (!screen) return;
  listeningForKeybind = null;
  renderKeybindList();
  screen.classList.remove("hidden");
}

function forceCloseKeybindScreen() {
  const screen = document.getElementById("keybindScreen");
  if (!screen) return;
  listeningForKeybind = null;
  screen.classList.add("hidden");
  renderKeybindList();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.classList.contains("settings-button") || button.id === "openSettingsButton" || button.id === "pauseSettingsButton") {
    event.preventDefault();
    forceOpenSettingsScreen();
    return;
  }

  if (button.id === "settingsCloseButton") {
    event.preventDefault();
    forceCloseSettingsScreen();
    return;
  }

  if (button.id === "keybindsButton") {
    event.preventDefault();
    openKeybindScreen();
    return;
  }

  if (button.id === "keybindCloseButton") {
    event.preventDefault();
    closeKeybindScreen();
    return;
  }

  if (button.id === "keybindResetButton") {
    event.preventDefault();
    if (typeof resetKeyBindings === "function") resetKeyBindings();
    return;
  }
}, true);



// ONLINE_NAME_FALLBACK_HANDLER



// SAFE_BUTTON_AND_KEYBIND_RECOVERY_PATCH
window.addEventListener("error", (event) => {
  console.error("Game runtime error:", event.message, event.filename, event.lineno, event.colno);
});

function safeShowScreenById(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

function safeHideScreenById(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.classList.contains("settings-button") || button.id === "openSettingsButton" || button.id === "pauseSettingsButton") {
    safeShowScreenById("settingsScreen");
    return;
  }

  if (button.id === "settingsCloseButton") {
    safeHideScreenById("settingsScreen");
    return;
  }

  if (button.id === "keybindsButton") {
    if (typeof renderKeybindList === "function") renderKeybindList();
    safeShowScreenById("keybindScreen");
    return;
  }

  if (button.id === "keybindCloseButton") {
    safeHideScreenById("keybindScreen");
    return;
  }
}, true);



// RUNTIME_ERROR_VISIBLE_BOX_PATCH
window.addEventListener("error", (event) => {
  const existing = document.getElementById("runtimeErrorBox");
  const box = existing || document.createElement("pre");
  box.id = "runtimeErrorBox";
  box.style.cssText = "position:fixed;left:10px;right:10px;bottom:10px;z-index:99999;max-height:180px;overflow:auto;background:#450a0a;color:#fecaca;border:2px solid #fca5a5;padding:10px;font:12px monospace;white-space:pre-wrap;";
  box.textContent = "JavaScript error:\n" + event.message + "\nLine: " + event.lineno + ":" + event.colno;
  if (!existing) document.body.appendChild(box);
});


// RELIABLE_BATTLE_BUTTONS_FIX
document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;

  if (button.id === "pauseButton") {
    event.preventDefault();
    if (typeof togglePause === "function") togglePause(true);
    else if (typeof setPaused === "function") setPaused(true);
    else {
      paused = true;
      if (pauseScreen) pauseScreen.classList.remove("hidden");
    }
    return;
  }

  if (button.id === "resumeButton") {
    event.preventDefault();
    if (typeof togglePause === "function") togglePause(false);
    else if (typeof setPaused === "function") setPaused(false);
    else {
      paused = false;
      if (pauseScreen) pauseScreen.classList.add("hidden");
    }
    return;
  }

  if (button.id === "homeButton" || button.id === "pauseHomeButton") {
    event.preventDefault();
    if (typeof returnHome === "function") returnHome();
    else if (typeof showHome === "function") showHome();
    else {
      paused = false;
      if (pauseScreen) pauseScreen.classList.add("hidden");
      if (homeScreen) homeScreen.classList.remove("hidden");
      gameState = "home";
      homeOpen = true;
    }
    return;
  }

  if (button.id === "restartButton" || button.id === "pauseRestartButton") {
    event.preventDefault();
    paused = false;
    if (pauseScreen) pauseScreen.classList.add("hidden");
    if (typeof restartMatch === "function") restartMatch();
    else if (typeof resetMatch === "function") resetMatch();
    else if (typeof startSelectedMode === "function") startSelectedMode();
    return;
  }

  if (button.id === "readyButton") {
    event.preventDefault();
    if (typeof setReady === "function") setReady();
    else if (typeof markReady === "function") markReady();
    else if (typeof handleReady === "function") handleReady();
    else {
      player1Ready = true;
      if (gameMode !== "online") player2Ready = true;
      if (typeof updateReadyPrompt === "function") updateReadyPrompt();
      if (typeof maybeStartReadyCountdown === "function") maybeStartReadyCountdown();
    }
    return;
  }

  if (button.id === "practiceSettingsButton") {
    event.preventDefault();
    if (practiceSettingsScreen) practiceSettingsScreen.classList.remove("hidden");
    return;
  }

  if (button.id === "practiceSettingsCloseButton") {
    event.preventDefault();
    if (practiceSettingsScreen) practiceSettingsScreen.classList.add("hidden");
    return;
  }

  if (button.classList.contains("practice-setting-button")) {
    event.preventDefault();
    const key = button.dataset.setting || button.dataset.practiceSetting;
    if (key && practiceSettings && Object.prototype.hasOwnProperty.call(practiceSettings, key)) {
      practiceSettings[key] = !practiceSettings[key];
      if (typeof updatePracticeSettingsUi === "function") updatePracticeSettingsUi();
    }
    return;
  }

  if (button.id === "radioCloseButton") {
    event.preventDefault();
    if (radioScreen) radioScreen.classList.add("hidden");
    return;
  }

  if (button.classList.contains("radio-open-button")) {
    event.preventDefault();
    if (radioScreen) radioScreen.classList.remove("hidden");
    return;
  }

  if (button.classList.contains("music-next-button")) {
    event.preventDefault();
    if (typeof playNextSong === "function") playNextSong();
    return;
  }

  if (button.classList.contains("music-prev-button")) {
    event.preventDefault();
    if (typeof playPreviousSong === "function") playPreviousSong();
    return;
  }

  if (button.classList.contains("music-toggle-button")) {
    event.preventDefault();
    if (typeof setMusicMuted === "function") setMusicMuted(!musicMuted);
    return;
  }
}, true);



// SUKUNA_MODEL_CLEANUP_PATCH
function drawSukunaModelCleanup(f) {
  if (!f || f.technique !== "shrine") return;

  ctx.save();
  const facing = f.dir || 1;
  const centerX = f.x + f.w / 2;
  const baseY = f.y;
  ctx.translate(centerX, baseY);
  ctx.scale(facing, 1);

  const skin = "#e5ad98";
  const tattoo = "#12030a";
  const pantsLight = "rgba(255, 255, 255, 0.28)";

  // Cover old extra eyes / old face details.
  ctx.fillStyle = skin;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(-16, 3, 32, 31, 9);
    ctx.fill();
  } else {
    ctx.fillRect(-16, 3, 32, 31);
  }

  // Main eyes only.
  ctx.strokeStyle = tattoo;
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-11, 16);
  ctx.lineTo(-3, 14);
  ctx.moveTo(11, 16);
  ctx.lineTo(3, 14);
  ctx.stroke();

  // Show-like face tattoos.
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.lineTo(0, 13);
  ctx.moveTo(-7, 9);
  ctx.quadraticCurveTo(-12, 10, -14, 15);
  ctx.moveTo(7, 9);
  ctx.quadraticCurveTo(12, 10, 14, 15);
  ctx.moveTo(-14, 22);
  ctx.quadraticCurveTo(-8, 19, -3, 21);
  ctx.moveTo(14, 22);
  ctx.quadraticCurveTo(8, 19, 3, 21);
  ctx.moveTo(-5, 28);
  ctx.lineTo(-1, 33);
  ctx.moveTo(5, 28);
  ctx.lineTo(1, 33);
  ctx.stroke();

  // Body tattoos.
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(-18, 47);
  ctx.quadraticCurveTo(-7, 54, 0, 48);
  ctx.quadraticCurveTo(7, 54, 18, 47);
  ctx.moveTo(-19, 62);
  ctx.lineTo(-7, 69);
  ctx.moveTo(19, 62);
  ctx.lineTo(7, 69);
  ctx.moveTo(-25, 51);
  ctx.lineTo(-15, 57);
  ctx.moveTo(25, 51);
  ctx.lineTo(15, 57);
  ctx.stroke();

  // Paint over shoes with bare feet.
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(-13, 93, 14, 6, 0.04, 0, Math.PI * 2);
  ctx.ellipse(13, 93, 14, 6, -0.04, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = tattoo;
  ctx.lineWidth = 1.35;
  ctx.beginPath();
  ctx.moveTo(-24, 93);
  ctx.quadraticCurveTo(-14, 97, -2, 93);
  ctx.moveTo(2, 93);
  ctx.quadraticCurveTo(14, 97, 24, 93);
  ctx.stroke();

  // Pants detail.
  ctx.strokeStyle = pantsLight;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-22, 66);
  ctx.lineTo(22, 66);
  ctx.moveTo(-18, 73);
  ctx.quadraticCurveTo(-10, 79, -15, 90);
  ctx.moveTo(-6, 69);
  ctx.quadraticCurveTo(-2, 80, -7, 91);
  ctx.moveTo(18, 73);
  ctx.quadraticCurveTo(10, 79, 15, 90);
  ctx.moveTo(6, 69);
  ctx.quadraticCurveTo(2, 80, 7, 91);
  ctx.moveTo(-19, 82);
  ctx.lineTo(-5, 84);
  ctx.moveTo(19, 82);
  ctx.lineTo(5, 84);
  ctx.stroke();

  ctx.restore();
}



// KEYBIND_DIRECT_BUTTON_INIT
window.addEventListener("load", () => {
  const openButton = document.getElementById("keybindsButton");
  const closeButton = document.getElementById("keybindCloseButton");
  const resetButton = document.getElementById("keybindResetButton");

  if (openButton) openButton.onclick = (event) => {
    event.preventDefault();
    openKeybindScreen();
  };
  if (closeButton) closeButton.onclick = (event) => {
    event.preventDefault();
    closeKeybindScreen();
  };
  if (resetButton) resetButton.onclick = (event) => {
    event.preventDefault();
    resetKeyBindings();
  };
});

// KEYBIND_ALIAS_REBIND_FIX: old default aliases no longer trigger after rebinding.

window.addEventListener("load", () => updateControlsPanelKeybindLabels()); // DYNAMIC_CONTROLS_LOAD_CALL


// VISUAL_UPGRADE_PATCH_INFINITY_WCS_ONLY
function drawInfinityField(f) {
  if (!isInfinityActive(f)) return;
  const center = getFighterCenter(f);
  const fieldY = center.y - 8;
  const pulse = 1 + Math.sin((f.infinityPulse || frame) * 0.16) * 0.045;
  const radius = INFINITY_RADIUS * pulse;
  const ceRatio = Math.max(0, Math.min(1, f.ce / f.maxCe));
  const spin = frame * 0.035;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const glow = ctx.createRadialGradient(center.x, fieldY, radius * 0.12, center.x, fieldY, radius * 1.18);
  glow.addColorStop(0, `rgba(224, 242, 254, ${0.10 + ceRatio * 0.05})`);
  glow.addColorStop(0.42, `rgba(56, 189, 248, ${0.12 + ceRatio * 0.06})`);
  glow.addColorStop(0.78, "rgba(37, 99, 235, 0.08)");
  glow.addColorStop(1, "rgba(14, 165, 233, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(center.x, fieldY, radius * 1.2, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 3; i += 1) {
    const r = radius * (0.72 + i * 0.16);
    ctx.strokeStyle = `rgba(191, 219, 254, ${0.42 - i * 0.08})`;
    ctx.lineWidth = 2 + i * 0.9;
    ctx.setLineDash(i === 1 ? [13, 9] : [7, 13]);
    ctx.lineDashOffset = -(frame * (0.65 + i * 0.25));
    ctx.beginPath();
    ctx.ellipse(center.x, fieldY, r * (1 + i * 0.02), r * (0.88 + i * 0.03), spin * (i + 1), 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(125, 211, 252, 0.7)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 7; i += 1) {
    const a = frame * 0.035 + i * Math.PI * 2 / 7;
    const x = center.x + Math.cos(a) * radius * 0.85;
    const y = fieldY + Math.sin(a) * radius * 0.72;
    ctx.beginPath();
    ctx.arc(x, y, 2.2 + Math.sin(frame * 0.1 + i) * 0.9, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}

function drawWorldSlashEffects() {
  for (const effect of worldSlashEffects) {
    const t = effect.life / effect.maxLife;
    const crackReady = effect.life < effect.maxLife - effect.splitDelay;
    const dx = effect.x2 - effect.x1;
    const dy = effect.y2 - effect.y1;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = Math.max(0, t);
    ctx.lineCap = "round";

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * t})`;
    ctx.lineWidth = crackReady ? 13 : 7;
    ctx.beginPath();
    ctx.moveTo(effect.x1, effect.y1);
    ctx.lineTo(effect.x2, effect.y2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(2, 6, 23, ${0.98 * t})`;
    ctx.lineWidth = crackReady ? 9 : 4;
    ctx.beginPath();
    ctx.moveTo(effect.x1 + nx * 1.5, effect.y1 + ny * 1.5);
    ctx.lineTo(effect.x2 + nx * 1.5, effect.y2 + ny * 1.5);
    ctx.stroke();

    ctx.strokeStyle = `rgba(248, 250, 252, ${0.55 * t})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([18, 12]);
    ctx.lineDashOffset = -frame * 1.2;
    ctx.beginPath();
    ctx.moveTo(effect.x1 - nx * 4, effect.y1 - ny * 4);
    ctx.lineTo(effect.x2 - nx * 4, effect.y2 - ny * 4);
    ctx.stroke();
    ctx.setLineDash([]);

    if (crackReady) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.72 * t})`;
      ctx.lineWidth = 3;
      for (const branch of effect.branches || []) {
        const bx = effect.x1 + dx * branch.t;
        const by = effect.y1 + dy * branch.t;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + nx * branch.offset, by + ny * branch.offset);
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}
