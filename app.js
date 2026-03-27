const LANGUAGE_STORAGE_KEY = "d20-tavern-language";
const SESSION_STORAGE_KEY = "d20-tavern-session-v2";
const DEFAULT_LANGUAGE = "en";
const DEFAULT_PLAYERS = ["", ""];
const DEFAULT_DIE = 20;
const DICE_OPTIONS = [4, 6, 8, 10, 12, 20, 100];
const translations = window.D20_TRANSLATIONS || {};
const SUPPORTED_LANGUAGES = Object.keys(translations);

const heroDie = document.getElementById("soloDie");
const panelDie = document.getElementById("soloDiePanel");
const soloMessage = document.getElementById("soloMessage");
const selectedModeLabel = document.getElementById("selectedModeLabel");
const addPlayerButton = document.getElementById("addPlayer");
const rollAllButton = document.getElementById("rollAll");
const rollSoloButton = document.getElementById("rollSolo");
const coinFlipButton = document.getElementById("coinFlip");
const resetAllButton = document.getElementById("resetAll");
const jumpToArenaButton = document.getElementById("jumpToArena");
const heroRollButton = document.getElementById("heroRoll");
const heroGroupButton = document.getElementById("heroGroup");
const installAppButton = document.getElementById("installApp");
const dockRollButton = document.getElementById("dockRoll");
const dockGroupButton = document.getElementById("dockGroup");
const playersContainer = document.getElementById("players");
const groupResult = document.getElementById("groupResult");
const historyContainer = document.getElementById("history");
const arenaSection = document.getElementById("arena");
const revealNodes = document.querySelectorAll(".reveal");
const languageSelect = document.getElementById("languageSelect");
const pageDescription = document.querySelector('meta[name="description"]');
const translatableNodes = document.querySelectorAll("[data-i18n]");
const topbar = document.getElementById("topbar");
const mobileDock = document.getElementById("mobileDock");
const roadmapList = document.getElementById("roadmapList");
const copyrightYear = document.getElementById("copyrightYear");
const dicePicker = document.getElementById("dicePicker");

const state = {
  language: getInitialLanguage(),
  selectedDie: DEFAULT_DIE,
  historyEntries: [],
  lastSoloRoll: null,
  groupResult: { type: "waiting" },
  players: [...DEFAULT_PLAYERS],
  deferredInstallPrompt: null,
};

hydrateSession();

function normalizeLanguage(language) {
  if (!language) {
    return null;
  }

  const exactMatch = SUPPORTED_LANGUAGES.find(
    (supportedLanguage) => supportedLanguage.toLowerCase() === language.toLowerCase()
  );

  if (exactMatch) {
    return exactMatch;
  }

  const lowered = language.toLowerCase();

  if (lowered.startsWith("pt")) return "pt-BR";
  if (lowered.startsWith("es")) return "es";
  if (lowered.startsWith("en")) return "en";
  if (lowered.startsWith("fr")) return "fr";
  if (lowered.startsWith("de")) return "de";
  if (lowered.startsWith("it")) return "it";

  return null;
}

function getInitialLanguage() {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  const normalizedUrlLanguage = normalizeLanguage(urlLanguage);

  if (normalizedUrlLanguage) {
    return normalizedUrlLanguage;
  }

  const storedLanguage = normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));

  if (storedLanguage) {
    return storedLanguage;
  }

  const browserLanguages = [navigator.language, ...(navigator.languages || [])];

  for (const language of browserLanguages) {
    const normalized = normalizeLanguage(language);

    if (normalized) {
      return normalized;
    }
  }

  return DEFAULT_LANGUAGE;
}

function hydrateSession() {
  try {
    const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (!rawSession) {
      return;
    }

    const parsed = JSON.parse(rawSession);

    if (DICE_OPTIONS.includes(parsed.selectedDie)) {
      state.selectedDie = parsed.selectedDie;
    }

    if (Array.isArray(parsed.players) && parsed.players.length > 0) {
      state.players = parsed.players.map((player) => String(player ?? ""));
    }

    if (Array.isArray(parsed.historyEntries)) {
      state.historyEntries = parsed.historyEntries;
    }

    if (parsed.lastSoloRoll && typeof parsed.lastSoloRoll === "object") {
      state.lastSoloRoll = parsed.lastSoloRoll;
    }

    if (parsed.groupResult && typeof parsed.groupResult === "object") {
      state.groupResult = parsed.groupResult;
    }
  } catch (error) {
    console.warn("Unable to restore session state.", error);
  }
}

function persistSession() {
  const session = {
    selectedDie: state.selectedDie,
    players: state.players,
    historyEntries: state.historyEntries,
    lastSoloRoll: state.lastSoloRoll,
    groupResult: state.groupResult,
  };

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function getText(key) {
  const currentPack = translations[state.language] || {};
  const fallbackPack = translations[DEFAULT_LANGUAGE] || {};
  return currentPack[key] ?? fallbackPack[key] ?? key;
}

function formatText(key, ...args) {
  const value = getText(key);
  return typeof value === "function" ? value(...args) : value;
}

function getDieLabel(sides) {
  return `d${sides}`;
}

function updateUrlLanguage(language) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
}

function setLanguageOptions() {
  [...languageSelect.options].forEach((option) => {
    const pack = translations[option.value];

    if (pack?.nativeLabel) {
      option.textContent = pack.nativeLabel;
    }
  });
}

function renderPlayers() {
  playersContainer.innerHTML = "";

  state.players.forEach((playerName, index) => {
    const label = document.createElement("label");
    label.className = "player-row";

    const title = document.createElement("span");
    title.setAttribute("data-player-label", "");
    title.dataset.playerIndex = String(index + 1);

    const input = document.createElement("input");
    input.type = "text";
    input.value = playerName;
    input.setAttribute("data-player-input", "");
    input.dataset.playerIndex = String(index + 1);

    label.append(title, input);
    playersContainer.appendChild(label);
  });

  updatePlayerFields();
}

function updatePlayerFields() {
  const labels = [...playersContainer.querySelectorAll("[data-player-label]")];
  const inputs = [...playersContainer.querySelectorAll("[data-player-input]")];

  labels.forEach((label, index) => {
    label.textContent = `${formatText("playerLabel")} ${index + 1}`;
  });

  inputs.forEach((input, index) => {
    input.placeholder = formatText("playerPlaceholder", index + 1);
  });
}

function setDiceFace(value) {
  [heroDie, panelDie].forEach((die) => {
    die.textContent = String(value);
  });
}

function clearDieStates() {
  [heroDie, panelDie].forEach((die) => {
    die.classList.remove("die--critical", "die--fumble", "die--rolling");
  });
}

function setDieState(result, sides = state.selectedDie) {
  [heroDie, panelDie].forEach((die) => {
    die.classList.remove("die--critical", "die--fumble");

    if (sides === 20 && result === 20) {
      die.classList.add("die--critical");
    } else if (sides === 20 && result === 1) {
      die.classList.add("die--fumble");
    }
  });
}

function animateDie(value, sides = state.selectedDie) {
  [heroDie, panelDie].forEach((die, index) => {
    die.classList.remove("die--rolling");
    void die.offsetWidth;
    die.classList.add("die--rolling");

    window.setTimeout(() => {
      die.textContent = String(value);
    }, 140 + index * 20);
  });

  setDieState(value, sides);
}

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getPlayerDisplayName(player) {
  if (!player.isDefault && player.name.trim()) {
    return player.name.trim();
  }

  return `${formatText("playerLabel")} ${player.index}`;
}

function getPlayers() {
  const inputs = [...playersContainer.querySelectorAll("[data-player-input]")];

  return inputs.map((input, index) => {
    const name = input.value.trim();
    return {
      index: index + 1,
      name,
      isDefault: name === "",
      roll: rollDie(20),
    };
  });
}

function getSoloDieMessage(result, sides) {
  const dieLabel = getDieLabel(sides);

  if (sides === 20 && result === 20) {
    return formatText("soloCritical");
  }

  if (sides === 20 && result === 1) {
    return formatText("soloFumble");
  }

  if (sides === 20 && result >= 16) {
    return formatText("soloHigh", result);
  }

  if (sides === 20 && result <= 5) {
    return formatText("soloLow", result);
  }

  return formatText("soloDieMessage", result, dieLabel);
}

function getCoinSideLabel(side) {
  return side === "heads" ? formatText("coinHeadsLabel") : formatText("coinTailsLabel");
}

function getSoloMessage(roll) {
  if (!roll) {
    return formatText("soloDefault");
  }

  if (roll.type === "coin") {
    return roll.result === "heads"
      ? formatText("coinHeadsMessage")
      : formatText("coinTailsMessage");
  }

  return getSoloDieMessage(roll.result, roll.sides);
}

function renderHistory() {
  historyContainer.innerHTML = "";

  if (state.historyEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history__empty";
    empty.textContent = formatText("historyEmpty");
    historyContainer.appendChild(empty);
    return;
  }

  state.historyEntries.forEach((entry) => {
    const item = document.createElement("p");
    item.className = "history__item";

    if (entry.type === "die") {
      item.textContent = formatText("historySolo", entry.result, getDieLabel(entry.sides));
    } else if (entry.type === "coin") {
      item.textContent = formatText("historyCoin", getCoinSideLabel(entry.result));
    } else if (entry.type === "winner") {
      item.textContent = formatText(
        "historyWinner",
        getPlayerDisplayName(entry.winner),
        entry.roll
      );
    } else if (entry.type === "tie") {
      const names = entry.players.map(getPlayerDisplayName).join(", ");
      item.textContent = formatText("historyTie", names, entry.roll);
    }

    historyContainer.appendChild(item);
  });
}

function addHistory(entry) {
  state.historyEntries = [entry, ...state.historyEntries].slice(0, 10);
  persistSession();
  renderHistory();
}

function renderRollTags(players) {
  return `
    <div class="result-rolls">
      ${players
        .map(
          (player) =>
            `<span class="result-roll">${getPlayerDisplayName(player)}: <strong>${player.roll}</strong></span>`
        )
        .join("")}
    </div>
  `;
}

function pulseResultPanel() {
  groupResult.classList.remove("result-panel--flash");
  void groupResult.offsetWidth;
  groupResult.classList.add("result-panel--flash");
}

function renderGroupResult() {
  const current = state.groupResult;

  if (!current || current.type === "waiting") {
    groupResult.innerHTML = `<p class="result-panel__intro">${formatText("resultWaiting")}</p>`;
    return;
  }

  if (current.type === "error") {
    groupResult.innerHTML = `<p class="result-panel__intro">${formatText("resultNeedTwo")}</p>`;
    return;
  }

  if (current.type === "winner") {
    groupResult.innerHTML = `
      <p class="result-panel__headline"><span class="winner">${formatText(
        "resultWinnerHeadline",
        getPlayerDisplayName(current.winner),
        current.roll
      )}</span></p>
      <p class="result-panel__intro">${formatText("resultWinnerCopy")}</p>
      ${renderRollTags(current.players)}
    `;
    return;
  }

  const tiedNames = current.players.map(getPlayerDisplayName).join(", ");
  groupResult.innerHTML = `
    <p class="result-panel__headline"><span class="tie">${formatText(
      "resultTieHeadline",
      tiedNames,
      current.roll
    )}</span></p>
    <p class="result-panel__intro">${formatText("resultTieCopy")}</p>
    ${renderRollTags(current.allPlayers)}
  `;
}

function renderSelectedDieUI() {
  const dieLabel = getDieLabel(state.selectedDie);
  selectedModeLabel.textContent = formatText("selectedDieMeta", dieLabel);
  heroRollButton.textContent = formatText("rollAction", dieLabel);
  rollSoloButton.textContent = formatText("rollAction", dieLabel);
  dockRollButton.textContent = formatText("rollActionShort", dieLabel);

  [...dicePicker.querySelectorAll("[data-die]")].forEach((button) => {
    button.classList.toggle("dice-chip--active", Number(button.dataset.die) === state.selectedDie);
  });
}

function renderSoloState() {
  if (!state.lastSoloRoll) {
    clearDieStates();
    setDiceFace(state.selectedDie);
    soloMessage.textContent = formatText("soloDefault");
    return;
  }

  if (state.lastSoloRoll.type === "coin") {
    clearDieStates();
    setDiceFace(state.lastSoloRoll.result === "heads" ? "H" : "T");
  } else {
    setDiceFace(state.lastSoloRoll.result);
    setDieState(state.lastSoloRoll.result, state.lastSoloRoll.sides);
  }

  soloMessage.textContent = getSoloMessage(state.lastSoloRoll);
}

function applyStaticTranslations() {
  translatableNodes.forEach((node) => {
    node.textContent = formatText(node.dataset.i18n);
  });

  document.documentElement.lang = formatText("htmlLang");
  document.title = formatText("pageTitle");
  pageDescription.setAttribute("content", formatText("pageDescription"));
  topbar.setAttribute("aria-label", formatText("headerAria"));
  mobileDock.setAttribute("aria-label", formatText("mobileDockAria"));
  roadmapList.setAttribute("aria-label", formatText("roadmapAria"));
  dicePicker.setAttribute("aria-label", formatText("dicePickerLabel"));
  document.getElementById("languageLabel").textContent = formatText("languageLabel");
  languageSelect.setAttribute("aria-label", formatText("languageLabel"));
  languageSelect.value = state.language;
  copyrightYear.textContent = String(new Date().getFullYear());
}

function applyLanguage(language) {
  const normalizedLanguage = normalizeLanguage(language) || DEFAULT_LANGUAGE;
  state.language = normalizedLanguage;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
  updateUrlLanguage(normalizedLanguage);
  applyStaticTranslations();
  updatePlayerFields();
  renderSelectedDieUI();
  renderSoloState();
  renderGroupResult();
  renderHistory();
}

function runSelectedDieRoll() {
  const result = rollDie(state.selectedDie);
  state.lastSoloRoll = {
    type: "die",
    sides: state.selectedDie,
    result,
  };

  animateDie(result, state.selectedDie);
  soloMessage.textContent = getSoloMessage(state.lastSoloRoll);
  addHistory({ type: "die", sides: state.selectedDie, result });
  persistSession();
}

function runCoinFlip() {
  const result = Math.random() < 0.5 ? "heads" : "tails";
  state.lastSoloRoll = {
    type: "coin",
    result,
  };

  clearDieStates();
  animateDie(result === "heads" ? "H" : "T", null);
  soloMessage.textContent = getSoloMessage(state.lastSoloRoll);
  addHistory({ type: "coin", result });
  persistSession();
}

function setSelectedDie(sides) {
  if (!DICE_OPTIONS.includes(sides)) {
    return;
  }

  state.selectedDie = sides;
  renderSelectedDieUI();

  if (!state.lastSoloRoll) {
    setDiceFace(sides);
  }

  persistSession();
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => {
    if (!node.classList.contains("reveal--visible")) {
      observer.observe(node);
    }
  });
}

function goToArena() {
  arenaSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker registration failed.", error);
    });
  });
}

function setupPwaInstall() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    installAppButton.classList.remove("is-hidden");
  });

  installAppButton.addEventListener("click", async () => {
    if (!state.deferredInstallPrompt) {
      return;
    }

    state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
    state.deferredInstallPrompt = null;
    installAppButton.classList.add("is-hidden");
  });

  window.addEventListener("appinstalled", () => {
    state.deferredInstallPrompt = null;
    installAppButton.classList.add("is-hidden");
  });
}

heroRollButton.addEventListener("click", runSelectedDieRoll);
rollSoloButton.addEventListener("click", runSelectedDieRoll);
dockRollButton.addEventListener("click", runSelectedDieRoll);
coinFlipButton.addEventListener("click", runCoinFlip);

dicePicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-die]");

  if (!button) {
    return;
  }

  setSelectedDie(Number(button.dataset.die));
});

playersContainer.addEventListener("input", (event) => {
  const input = event.target.closest("[data-player-input]");

  if (!input) {
    return;
  }

  const playerIndex = Number(input.dataset.playerIndex) - 1;
  state.players[playerIndex] = input.value;
  persistSession();
});

addPlayerButton.addEventListener("click", () => {
  state.players.push("");
  renderPlayers();
  persistSession();
});

rollAllButton.addEventListener("click", () => {
  const players = getPlayers();

  if (players.length < 2) {
    state.groupResult = { type: "error" };
    renderGroupResult();
    pulseResultPanel();
    persistSession();
    return;
  }

  const highest = Math.max(...players.map((player) => player.roll));
  const winners = players.filter((player) => player.roll === highest);

  if (winners.length === 1) {
    state.groupResult = { type: "winner", winner: winners[0], roll: highest, players };
    addHistory({ type: "winner", winner: winners[0], roll: highest });
    renderGroupResult();
    pulseResultPanel();
    persistSession();
    return;
  }

  state.groupResult = { type: "tie", players: winners, roll: highest, allPlayers: players };
  addHistory({ type: "tie", players: winners, roll: highest });
  renderGroupResult();
  pulseResultPanel();
  persistSession();
});

resetAllButton.addEventListener("click", () => {
  clearDieStates();
  state.selectedDie = DEFAULT_DIE;
  state.lastSoloRoll = null;
  state.groupResult = { type: "waiting" };
  state.historyEntries = [];
  state.players = [...DEFAULT_PLAYERS];

  renderPlayers();
  renderSelectedDieUI();
  renderSoloState();
  renderGroupResult();
  renderHistory();
  persistSession();
});

jumpToArenaButton.addEventListener("click", goToArena);
heroGroupButton.addEventListener("click", goToArena);
dockGroupButton.addEventListener("click", () => {
  goToArena();
  window.setTimeout(() => {
    rollAllButton.focus();
  }, 320);
});

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

setLanguageOptions();
renderPlayers();
renderSelectedDieUI();
applyLanguage(state.language);
renderSoloState();
renderGroupResult();
renderHistory();
revealOnScroll();
setupPwaInstall();
registerServiceWorker();
