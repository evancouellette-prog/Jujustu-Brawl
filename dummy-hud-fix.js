// Runtime UI cleanup for HUD readability and practice-mode display.
(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `
    body.practice-dummy-hud-active .fighter-panel.right > .ce-frame,
    body.practice-dummy-hud-active .fighter-panel.right > .ultimate-frame,
    body.practice-dummy-hud-active .fighter-panel.right > .ct-cooldowns,
    body.practice-dummy-hud-active #enemyExtraCooldowns,
    body.practice-dummy-hud-active #enemyStars {
      display: none !important;
    }

    #homeScreen .home-panel .start-actions .settings-button {
      background: #d6b84d !important;
      color: #1a1a1d !important;
      border-color: #edf2ff !important;
      box-shadow: 0 4px 0 #7b5a18 !important;
    }

    #homeScreen .home-panel .start-actions .settings-button:active {
      box-shadow: 0 2px 0 #7b5a18 !important;
    }

    .ct-slot,
    .ct-slot.ready,
    .ct-slot.cooling,
    .ct-slot.low-ce,
    .ct-slot.blocked,
    .extra-cooldown,
    .extra-cooldown.active {
      color: #fff !important;
      font-weight: 1000 !important;
      letter-spacing: 0.055em !important;
      text-shadow: 0 2px 0 #000, 0 0 7px #000, 0 0 12px #000 !important;
      background: linear-gradient(90deg, #1d4ed8, #38bdf8, #e0f2fe) !important;
      border: 3px solid #e0f2fe !important;
      box-shadow: 0 3px 0 #082f49, 0 0 14px rgba(56, 189, 248, 0.45) !important;
    }

    .ct-slot,
    .ct-slot.ready,
    .ct-slot.cooling,
    .ct-slot.low-ce,
    .ct-slot.blocked {
      min-height: 60px !important;
      padding: 6px !important;
    }

    .ct-slot .ct-meter,
    .ct-slot.ready .ct-meter,
    .ct-slot.cooling .ct-meter,
    .ct-slot.low-ce .ct-meter,
    .ct-slot.blocked .ct-meter {
      background: rgba(2, 6, 23, 0.92) !important;
      border: 1px solid rgba(248, 250, 252, 0.85) !important;
      height: 11px !important;
    }

    .ct-slot .ct-fill,
    .ct-slot.ready .ct-fill,
    .ct-slot.cooling .ct-fill,
    .ct-slot.low-ce .ct-fill,
    .ct-slot.blocked .ct-fill {
      background: linear-gradient(90deg, #1d4ed8, #38bdf8, #e0f2fe) !important;
    }

    body.player-sukuna #playerCt1Slot,
    body.player-sukuna #playerCt2Slot,
    body.player-sukuna #playerCt3Slot,
    body.enemy-sukuna #enemyCt1Slot,
    body.enemy-sukuna #enemyCt2Slot,
    body.enemy-sukuna #enemyCt3Slot,
    body.player-sukuna #playerExtraCooldowns .extra-cooldown,
    body.enemy-sukuna #enemyExtraCooldowns .extra-cooldown {
      background: linear-gradient(90deg, #991b1b, #ef4444, #fee2e2) !important;
      border-color: #fee2e2 !important;
      box-shadow: 0 3px 0 #1f0505, 0 0 14px rgba(248, 113, 113, 0.45) !important;
    }

    body.player-sukuna #playerCt1Slot .ct-fill,
    body.player-sukuna #playerCt2Slot .ct-fill,
    body.player-sukuna #playerCt3Slot .ct-fill,
    body.enemy-sukuna #enemyCt1Slot .ct-fill,
    body.enemy-sukuna #enemyCt2Slot .ct-fill,
    body.enemy-sukuna #enemyCt3Slot .ct-fill {
      background: linear-gradient(90deg, #991b1b, #ef4444, #fee2e2) !important;
    }

    .ct-slot .ct-label,
    .ct-slot .ct-status {
      color: #fff !important;
      font-size: 1rem !important;
      font-weight: 1000 !important;
      letter-spacing: 0.055em !important;
      text-shadow: 0 2px 0 #000, 0 0 7px #000, 0 0 12px #000 !important;
      line-height: 1.05 !important;
    }

    .ct-slot .ct-label,
    .ct-slot .ct-status,
    .ct-slot.ready .ct-status,
    .ct-slot.cooling .ct-status,
    .ct-slot.low-ce .ct-status,
    .ct-slot.blocked .ct-status {
      background: rgba(0, 0, 0, 0.82) !important;
      border: 2px solid rgba(255, 255, 255, 0.68) !important;
      border-radius: 9px !important;
      padding: 2px 8px !important;
      box-shadow: none !important;
      width: fit-content !important;
      margin-inline: auto !important;
    }

    .extra-cooldowns {
      gap: 7px !important;
      align-items: stretch !important;
    }

    .extra-cooldown,
    .extra-cooldown.active {
      font-size: 1.08rem !important;
      border-radius: 11px !important;
      padding: 5px 11px !important;
      min-height: 30px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: visible !important;
    }

    .extra-cooldown *,
    .extra-cooldown.active * {
      color: #fff !important;
      font-weight: 1000 !important;
      text-shadow: 0 2px 0 #000, 0 0 7px #000, 0 0 12px #000 !important;
      background: transparent !important;
      border-color: transparent !important;
      box-shadow: none !important;
      outline: none !important;
    }

    .extra-cooldown::before,
    .extra-cooldown::after,
    .extra-cooldown *::before,
    .extra-cooldown *::after {
      display: none !important;
      content: none !important;
    }
  `;
  document.head.appendChild(style);

  function isVisible(el) {
    return Boolean(el && !el.classList.contains("hidden") && el.offsetParent !== null);
  }

  function panelIsSukuna(prefix) {
    const labels = [
      document.getElementById(`${prefix}Ct1Label`),
      document.getElementById(`${prefix}Ct2Label`),
      document.getElementById(`${prefix}Ct3Label`)
    ].map((el) => (el?.textContent || "").toLowerCase()).join(" ");

    return /dismantle|cleave|fuga|shrine|sukuna/.test(labels);
  }

  function isPracticeModeActive() {
    const practiceButton = document.getElementById("practiceSettingsButton");
    const scoreInfo = document.getElementById("scoreInfo");
    const roundInfo = document.getElementById("roundInfo");

    return isVisible(practiceButton)
      || (scoreInfo && scoreInfo.textContent.trim() === "No rounds")
      || (roundInfo && roundInfo.textContent.trim() === "Practice");
  }

  function syncPracticeDummyHud() {
    document.body.classList.toggle("practice-dummy-hud-active", isPracticeModeActive());
  }

  function syncCharacterCooldownColors() {
    document.body.classList.toggle("player-sukuna", panelIsSukuna("player"));
    document.body.classList.toggle("enemy-sukuna", panelIsSukuna("enemy"));
  }

  function cleanTextNode(node) {
    const original = node.nodeValue || "";
    const fixed = original
      .replace(/Blue\s*Amp/gi, "Blue Amp")
      .replace(/\bAMP\b/g, "Blue Amp")
      .replace(/\bAmp\b/g, "Blue Amp")
      .replace(/Stun\s*Combo/gi, "Stun Combo");
    if (fixed !== original) node.nodeValue = fixed;
  }

  function cleanLabels() {
    document.querySelectorAll(".extra-cooldown").forEach((el) => {
      el.className = "extra-cooldown" + (el.classList.contains("active") ? " active" : "");
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(cleanTextNode);
    });
  }

  function syncUi() {
    syncPracticeDummyHud();
    syncCharacterCooldownColors();
    cleanLabels();
  }

  window.addEventListener("load", syncUi);
  document.addEventListener("click", () => setTimeout(syncUi, 0), true);
  document.addEventListener("keydown", () => setTimeout(syncUi, 0), true);
  document.addEventListener("keyup", () => setTimeout(syncUi, 0), true);
  setInterval(syncUi, 100);
})();
