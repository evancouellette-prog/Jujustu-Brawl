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
    .ct-slot.blocked {
      background: #031827 !important;
      border: 3px solid #e0f2fe !important;
      box-shadow: 0 3px 0 rgba(2, 6, 23, 0.95), 0 0 14px rgba(56, 189, 248, 0.38) !important;
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
    body.enemy-sukuna #enemyCt3Slot {
      background: #280404 !important;
      border-color: #fee2e2 !important;
      box-shadow: 0 3px 0 rgba(45, 10, 10, 0.98), 0 0 14px rgba(248, 113, 113, 0.4) !important;
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
      font-weight: 1000 !important;
      letter-spacing: 0.055em !important;
      text-shadow: 0 2px 0 #000, 0 0 7px #000, 0 0 12px #000 !important;
      line-height: 1.05 !important;
    }

    .ct-slot .ct-label {
      font-size: 1rem !important;
      background: rgba(0, 0, 0, 0.78) !important;
      border: 2px solid rgba(255, 255, 255, 0.58) !important;
      border-radius: 9px !important;
      padding: 2px 8px !important;
      width: fit-content !important;
      margin-inline: auto !important;
    }

    .ct-slot .ct-status,
    .ct-slot.ready .ct-status,
    .ct-slot.cooling .ct-status,
    .ct-slot.low-ce .ct-status,
    .ct-slot.blocked .ct-status {
      font-size: 0.95rem !important;
      color: #fff !important;
      background: rgba(0, 0, 0, 0.86) !important;
      border: 2px solid rgba(255, 255, 255, 0.62) !important;
      border-radius: 9px !important;
      padding: 2px 8px !important;
      box-shadow: none !important;
    }

    .extra-cooldowns {
      gap: 7px !important;
      align-items: stretch !important;
    }

    .extra-cooldown,
    .extra-cooldown.active {
      color: #fff !important;
      font-size: 1.08rem !important;
      font-weight: 1000 !important;
      letter-spacing: 0.05em !important;
      text-shadow: 0 2px 0 #000, 0 0 7px #000, 0 0 12px #000 !important;
      background: linear-gradient(90deg, #1d4ed8, #38bdf8, #e0f2fe) !important;
      border: 3px solid #e0f2fe !important;
      box-shadow: 0 2px 0 rgba(2, 6, 23, 0.92), 0 0 13px rgba(56, 189, 248, 0.42) !important;
      border-radius: 11px !important;
      padding: 5px 11px !important;
      min-height: 30px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: visible !important;
    }

    .extra-cooldown::before,
    .extra-cooldown::after {
      display: none !important;
      content: none !important;
    }

    .extra-cooldown.blue-extra,
    .extra-cooldown.blue-extra.active,
    .extra-cooldown.blue-amp-extra,
    .extra-cooldown.blue-amp-extra.active,
    .extra-cooldown.blue-status,
    .extra-cooldown.blue-status.active,
    .extra-cooldown.blue-amp-status,
    .extra-cooldown.blue-amp-status.active {
      background: linear-gradient(90deg, #1d4ed8, #38bdf8, #e0f2fe) !important;
      border-color: #e0f2fe !important;
      box-shadow: 0 2px 0 #082f49, 0 0 14px rgba(56, 189, 248, 0.55) !important;
    }

    .extra-cooldown.rct-extra,
    .extra-cooldown.rct-extra.active,
    .extra-cooldown.rct-status,
    .extra-cooldown.rct-status.active,
    body.player-sukuna #playerExtraCooldowns .extra-cooldown.rct-extra,
    body.player-sukuna #playerExtraCooldowns .extra-cooldown.rct-status,
    body.enemy-sukuna #enemyExtraCooldowns .extra-cooldown.rct-extra,
    body.enemy-sukuna #enemyExtraCooldowns .extra-cooldown.rct-status {
      background: linear-gradient(90deg, #15803d, #22c55e, #dcfce7) !important;
      border-color: #dcfce7 !important;
      box-shadow: 0 2px 0 #052e16, 0 0 14px rgba(34, 197, 94, 0.5) !important;
    }

    .extra-cooldown.stun-extra,
    .extra-cooldown.stun-extra.active,
    .extra-cooldown.combo-extra,
    .extra-cooldown.combo-extra.active,
    .extra-cooldown.stun-status,
    .extra-cooldown.stun-status.active,
    .extra-cooldown.combo-status,
    .extra-cooldown.combo-status.active {
      background: linear-gradient(90deg, #c2410c, #fb923c, #ffedd5) !important;
      border-color: #ffedd5 !important;
      box-shadow: 0 2px 0 #431407, 0 0 14px rgba(251, 146, 60, 0.52) !important;
    }

    body.player-sukuna #playerExtraCooldowns .extra-cooldown:not(.rct-extra):not(.rct-status):not(.blue-extra):not(.blue-status):not(.blue-amp-extra):not(.blue-amp-status):not(.stun-extra):not(.stun-status):not(.combo-extra):not(.combo-status),
    body.enemy-sukuna #enemyExtraCooldowns .extra-cooldown:not(.rct-extra):not(.rct-status):not(.blue-extra):not(.blue-status):not(.blue-amp-extra):not(.blue-amp-status):not(.stun-extra):not(.stun-status):not(.combo-extra):not(.combo-status) {
      background: linear-gradient(90deg, #991b1b, #ef4444, #fee2e2) !important;
      border-color: #fecaca !important;
      box-shadow: 0 2px 0 #1f0505, 0 0 10px rgba(248, 113, 113, 0.36) !important;
    }

    body.technique-charging #playerCt1Slot,
    body.technique-charging #playerCt2Slot,
    body.technique-charging #playerCt3Slot {
      background: #7c2d12 !important;
      border-color: #ffedd5 !important;
      box-shadow: 0 3px 0 #431407, 0 0 18px rgba(251, 146, 60, 0.62) !important;
    }

    body.technique-charging #playerCt1Slot .ct-fill,
    body.technique-charging #playerCt2Slot .ct-fill,
    body.technique-charging #playerCt3Slot .ct-fill {
      background: linear-gradient(90deg, #ea580c, #fb923c, #ffedd5) !important;
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

  function syncChargingHud() {
    const playerStatuses = [
      document.getElementById("playerCt1Status"),
      document.getElementById("playerCt2Status"),
      document.getElementById("playerCt3Status")
    ];
    const charging = playerStatuses.some((el) => /charge|hold|aim/i.test(el?.textContent || ""));
    document.body.classList.toggle("technique-charging", charging);
  }

  function cleanLabel(text) {
    return String(text || "")
      .replace(/Blue\s*Amp/i, "Blue Amp")
      .replace(/\bAmp\b/i, "Blue Amp")
      .replace(/Infinity/i, "Infinity")
      .replace(/Stun\s*Combo/i, "Stun Combo")
      .trim();
  }

  function typeForText(text) {
    const lower = cleanLabel(text).toLowerCase();
    if (lower.includes("blue amp")) return "blue-amp";
    if (lower.includes("infinity") || lower.includes("blue")) return "blue";
    if (lower.includes("rct")) return "rct";
    if (lower.includes("stun")) return "stun";
    if (lower.includes("combo")) return "combo";
    return "";
  }

  function isStatusText(text) {
    return /^(ready|on|off|low ce|\d+s|\d+\.\d+s|\d+)$/i.test(String(text || "").trim());
  }

  function clearExtraClasses(el) {
    el.classList.remove(
      "blue-extra", "blue-status", "blue-amp-extra", "blue-amp-status",
      "rct-extra", "rct-status", "stun-extra", "stun-status", "combo-extra", "combo-status"
    );
  }

  function classifyContainer(container) {
    let lastType = "";
    Array.from(container.querySelectorAll(".extra-cooldown")).forEach((el) => {
      clearExtraClasses(el);
      const text = cleanLabel(el.textContent);
      if (text && text !== el.textContent) el.textContent = text;

      let type = typeForText(text);
      const status = isStatusText(text);
      if (!type && status) type = lastType;
      if (type && !status) lastType = type;

      if (!type) return;
      el.classList.add(`${type}-${status ? "status" : "extra"}`);
    });
  }

  function classifyExtraCooldowns() {
    [document.getElementById("playerExtraCooldowns"), document.getElementById("enemyExtraCooldowns")]
      .filter(Boolean)
      .forEach(classifyContainer);
  }

  function syncUi() {
    syncPracticeDummyHud();
    syncCharacterCooldownColors();
    syncChargingHud();
    classifyExtraCooldowns();
  }

  window.addEventListener("load", syncUi);
  document.addEventListener("click", () => setTimeout(syncUi, 0), true);
  document.addEventListener("keydown", () => setTimeout(syncUi, 0), true);
  document.addEventListener("keyup", () => setTimeout(syncUi, 0), true);
  setInterval(syncUi, 100);
})();
