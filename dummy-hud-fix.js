// Practice dummy HUD cleanup.
// Keeps dummy health visible while hiding dummy CE, ultimate, CT, and RCT/cooldown UI.
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
  `;
  document.head.appendChild(style);

  function isVisible(el) {
    return Boolean(el && !el.classList.contains("hidden") && el.offsetParent !== null);
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
    const active = isPracticeModeActive();
    document.body.classList.toggle("practice-dummy-hud-active", active);
  }

  window.addEventListener("load", syncPracticeDummyHud);
  document.addEventListener("click", () => setTimeout(syncPracticeDummyHud, 0), true);
  document.addEventListener("keydown", () => setTimeout(syncPracticeDummyHud, 0), true);
  setInterval(syncPracticeDummyHud, 100);
})();
