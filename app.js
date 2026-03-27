const STORAGE_KEY = "d20-tavern-language";
const SUPPORTED_LANGUAGES = ["es", "en", "pt-BR"];

const translations = {
  es: {
    htmlLang: "es",
    pageTitle: "D20 Tavern | Utilidad fantasy mobile-first",
    pageDescription:
      "Utilidades para Dungeons and Dragons, Baldur's Gate y juegos de fantasia. Incluye tirada d20 individual y comparacion entre varios jugadores.",
    headerAria: "Cabecera",
    languageLabel: "Idioma",
    mobileDockAria: "Acciones rapidas",
    roadmapAria: "Utilidades futuras",
    brandMeta: "Utilidad fantasy pensada para movil",
    topbarBadge: "Telefono primero",
    heroEyebrow: "D&D / Baldur's Gate / Session Tools",
    heroTitle: "Un d20 rapido, claro y comodo desde el movil.",
    heroLead:
      "Pensado para usar con una mano: tirada instantanea, duelo entre jugadores y resultados faciles de leer en cualquier momento de la partida.",
    heroRoll: "Tirar d20 ahora",
    heroGroup: "Ir al duelo",
    fact1Label: "Rapido",
    fact1Text: "Toques grandes y lectura inmediata",
    fact2Label: "Listo",
    fact2Text: "Criticos, pifias y empates visibles",
    fact3Label: "Escalable",
    fact3Text: "Base para mas herramientas de mesa",
    arenaEyebrow: "Live utility",
    arenaTitle: "Altar de tiradas",
    arenaCopy:
      "Lo principal va primero: tirada individual arriba, duelo de grupo debajo y resultados compactos para no perder tiempo durante la sesion.",
    soloEyebrow: "Solo roll",
    soloTitle: "1d20 instantaneo",
    soloBadge: "Uso rapido",
    rollSolo: "Tirar 1d20",
    resetAll: "Reiniciar",
    duelEyebrow: "Party clash",
    duelTitle: "Quien saque mas, gana",
    duelBadge: "Empate automatico",
    addPlayer: "Anadir jugador",
    rollAll: "Tirar para todos",
    historyEyebrow: "Session log",
    historyTitle: "Cronica de tiradas",
    historyCopy: "Historial corto y limpio para consultar rapido quien gano cada ronda.",
    roadmapEyebrow: "Roadmap",
    roadmapTitle: "Lo siguiente",
    roadmapCopy:
      "Cuando esta base ya te guste en movil, podemos seguir con el resto del arsenal.",
    roadmap1Title: "Mas dados",
    roadmap1Copy: "d4, d6, d8, d10, d12 y d100 con el mismo sistema visual.",
    roadmap2Title: "Iniciativa",
    roadmap2Copy: "Orden de combate rapido para party, enemigos y NPCs.",
    roadmap3Title: "Marcadores",
    roadmap3Copy: "Vida, turnos y efectos temporales con controles tactiles.",
    footerCopyrightPrefix: "Copyright",
    footerBuiltFor: "Creado para decisiones fantasy rapidas en mesa y para compartirse en GitHub.",
    dockArena: "Abrir altar",
    dockRoll: "Tirar d20",
    dockGroup: "Duelo",
    playerLabel: "Jugador",
    playerPlaceholder: (index) => `Nombre de Jugador ${index}`,
    soloDefault: "Pulsa para hacer una tirada individual.",
    soloCritical: "Has sacado 20. Critico limpio. Ya puedes decidir.",
    soloFumble: "Has sacado 1. Pifia total. El caos habla primero.",
    soloHigh: (result) => `Has sacado ${result}. Tirada fuerte para cerrar la decision.`,
    soloLow: (result) => `Has sacado ${result}. Resultado flojo para este momento.`,
    soloMid: (result) => `Has sacado ${result}. Resultado listo para comparar.`,
    historyEmpty: "Todavia no hay tiradas registradas.",
    historySolo: (result) => `Tirada individual: ${result}.`,
    historyWinner: (player, roll) => `${player} gana con ${roll}.`,
    historyTie: (players, roll) => `Empate a ${roll}: ${players}.`,
    resultWaiting: "Esperando una tirada grupal.",
    resultNeedTwo: "Necesitas al menos dos jugadores para comparar tiradas.",
    resultWinnerHeadline: (player, roll) => `${player} gana con ${roll}.`,
    resultWinnerCopy: "Decision resuelta. No hace falta desempate.",
    resultTieHeadline: (players, roll) => `Empate con ${roll} entre ${players}.`,
    resultTieCopy: "Toca una nueva ronda para desempatar.",
  },
  en: {
    htmlLang: "en",
    pageTitle: "D20 Tavern | Mobile-first fantasy utility",
    pageDescription:
      "Utilities for Dungeons and Dragons, Baldur's Gate, and fantasy games. Includes a solo d20 roll and multiplayer comparison mode.",
    headerAria: "Header",
    languageLabel: "Language",
    mobileDockAria: "Quick actions",
    roadmapAria: "Upcoming utilities",
    brandMeta: "Mobile-first fantasy utility",
    topbarBadge: "Phone first",
    heroEyebrow: "D&D / Baldur's Gate / Session Tools",
    heroTitle: "A fast, clear d20 built for your phone.",
    heroLead:
      "Made for one-handed use: instant rolls, quick multiplayer duels, and readable results that stay out of the way during a session.",
    heroRoll: "Roll d20 now",
    heroGroup: "Go to duel",
    fact1Label: "Fast",
    fact1Text: "Large touch targets and instant readability",
    fact2Label: "Ready",
    fact2Text: "Criticals, fumbles, and ties are easy to spot",
    fact3Label: "Scalable",
    fact3Text: "A solid base for more table utilities",
    arenaEyebrow: "Live utility",
    arenaTitle: "Roll altar",
    arenaCopy:
      "The main utility comes first: solo roll on top, group duel below, and compact results so you can keep the session moving.",
    soloEyebrow: "Solo roll",
    soloTitle: "Instant 1d20",
    soloBadge: "Quick use",
    rollSolo: "Roll 1d20",
    resetAll: "Reset",
    duelEyebrow: "Party clash",
    duelTitle: "Highest roll wins",
    duelBadge: "Tie detection",
    addPlayer: "Add player",
    rollAll: "Roll for everyone",
    historyEyebrow: "Session log",
    historyTitle: "Roll history",
    historyCopy: "A short, clean history so you can check who won each round at a glance.",
    roadmapEyebrow: "Roadmap",
    roadmapTitle: "What comes next",
    roadmapCopy:
      "Once this mobile foundation feels right, the rest of the toolkit can grow on top of it.",
    roadmap1Title: "More dice",
    roadmap1Copy: "d4, d6, d8, d10, d12, and d100 using the same visual system.",
    roadmap2Title: "Initiative",
    roadmap2Copy: "Fast combat order for party members, enemies, and NPCs.",
    roadmap3Title: "Trackers",
    roadmap3Copy: "HP, turns, and temporary effects with touch-friendly controls.",
    footerCopyrightPrefix: "Copyright",
    footerBuiltFor: "Built for quick fantasy table decisions and public sharing on GitHub.",
    dockArena: "Open altar",
    dockRoll: "Roll d20",
    dockGroup: "Duel",
    playerLabel: "Player",
    playerPlaceholder: (index) => `Player ${index} name`,
    soloDefault: "Tap to make a solo roll.",
    soloCritical: "You rolled 20. Clean critical. You can decide now.",
    soloFumble: "You rolled 1. Total fumble. Chaos speaks first.",
    soloHigh: (result) => `You rolled ${result}. Strong roll to settle the decision.`,
    soloLow: (result) => `You rolled ${result}. Not the strongest moment for destiny.`,
    soloMid: (result) => `You rolled ${result}. Result ready to compare.`,
    historyEmpty: "No rolls have been recorded yet.",
    historySolo: (result) => `Solo roll: ${result}.`,
    historyWinner: (player, roll) => `${player} wins with ${roll}.`,
    historyTie: (players, roll) => `Tie at ${roll}: ${players}.`,
    resultWaiting: "Waiting for a group roll.",
    resultNeedTwo: "You need at least two players to compare rolls.",
    resultWinnerHeadline: (player, roll) => `${player} wins with ${roll}.`,
    resultWinnerCopy: "Decision settled. No tiebreaker needed.",
    resultTieHeadline: (players, roll) => `Tie at ${roll} between ${players}.`,
    resultTieCopy: "Roll again to break the tie.",
  },
  "pt-BR": {
    htmlLang: "pt-BR",
    pageTitle: "D20 Tavern | Utilitario fantasy mobile-first",
    pageDescription:
      "Utilitarios para Dungeons and Dragons, Baldur's Gate e jogos de fantasia. Inclui rolagem solo de d20 e comparacao entre varios jogadores.",
    headerAria: "Cabecalho",
    languageLabel: "Idioma",
    mobileDockAria: "Acoes rapidas",
    roadmapAria: "Utilitarios futuros",
    brandMeta: "Utilitario fantasy pensado para celular",
    topbarBadge: "Celular primeiro",
    heroEyebrow: "D&D / Baldur's Gate / Session Tools",
    heroTitle: "Um d20 rapido, claro e confortavel no celular.",
    heroLead:
      "Feito para usar com uma mao: rolagem instantanea, duelo entre jogadores e resultados faceis de ler durante a sessao.",
    heroRoll: "Rolar d20 agora",
    heroGroup: "Ir para o duelo",
    fact1Label: "Rapido",
    fact1Text: "Toques grandes e leitura imediata",
    fact2Label: "Pronto",
    fact2Text: "Criticos, falhas e empates bem visiveis",
    fact3Label: "Escalavel",
    fact3Text: "Base pronta para mais utilitarios de mesa",
    arenaEyebrow: "Live utility",
    arenaTitle: "Altar de rolagens",
    arenaCopy:
      "O principal vem primeiro: rolagem individual no topo, duelo em grupo abaixo e resultados compactos para a sessao continuar fluindo.",
    soloEyebrow: "Solo roll",
    soloTitle: "1d20 instantaneo",
    soloBadge: "Uso rapido",
    rollSolo: "Rolar 1d20",
    resetAll: "Reiniciar",
    duelEyebrow: "Party clash",
    duelTitle: "Quem tirar mais, vence",
    duelBadge: "Empate automatico",
    addPlayer: "Adicionar jogador",
    rollAll: "Rolar para todos",
    historyEyebrow: "Session log",
    historyTitle: "Historico de rolagens",
    historyCopy: "Um historico curto e limpo para ver rapidamente quem venceu cada rodada.",
    roadmapEyebrow: "Roadmap",
    roadmapTitle: "Proximos passos",
    roadmapCopy:
      "Quando essa base estiver boa no celular, o resto do arsenal pode crescer em cima dela.",
    roadmap1Title: "Mais dados",
    roadmap1Copy: "d4, d6, d8, d10, d12 e d100 com a mesma linguagem visual.",
    roadmap2Title: "Iniciativa",
    roadmap2Copy: "Ordem de combate rapida para party, inimigos e NPCs.",
    roadmap3Title: "Marcadores",
    roadmap3Copy: "Vida, turnos e efeitos temporarios com controles faceis de tocar.",
    footerCopyrightPrefix: "Copyright",
    footerBuiltFor: "Feito para decisoes fantasy rapidas de mesa e para ser compartilhado no GitHub.",
    dockArena: "Abrir altar",
    dockRoll: "Rolar d20",
    dockGroup: "Duelo",
    playerLabel: "Jogador",
    playerPlaceholder: (index) => `Nome do Jogador ${index}`,
    soloDefault: "Toque para fazer uma rolagem individual.",
    soloCritical: "Voce tirou 20. Critico limpo. Ja pode decidir.",
    soloFumble: "Voce tirou 1. Falha total. O caos fala primeiro.",
    soloHigh: (result) => `Voce tirou ${result}. Rolagem forte para fechar a decisao.`,
    soloLow: (result) => `Voce tirou ${result}. Nao foi o melhor momento do destino.`,
    soloMid: (result) => `Voce tirou ${result}. Resultado pronto para comparar.`,
    historyEmpty: "Ainda nao ha rolagens registradas.",
    historySolo: (result) => `Rolagem individual: ${result}.`,
    historyWinner: (player, roll) => `${player} vence com ${roll}.`,
    historyTie: (players, roll) => `Empate em ${roll}: ${players}.`,
    resultWaiting: "Aguardando uma rolagem em grupo.",
    resultNeedTwo: "Voce precisa de pelo menos dois jogadores para comparar as rolagens.",
    resultWinnerHeadline: (player, roll) => `${player} vence com ${roll}.`,
    resultWinnerCopy: "Decisao resolvida. Nao precisa desempatar.",
    resultTieHeadline: (players, roll) => `Empate em ${roll} entre ${players}.`,
    resultTieCopy: "Rolem novamente para desempatar.",
  },
};

const heroDie = document.getElementById("soloDie");
const panelDie = document.getElementById("soloDiePanel");
const soloMessage = document.getElementById("soloMessage");
const addPlayerButton = document.getElementById("addPlayer");
const rollAllButton = document.getElementById("rollAll");
const rollSoloButton = document.getElementById("rollSolo");
const resetAllButton = document.getElementById("resetAll");
const jumpToArenaButton = document.getElementById("jumpToArena");
const heroRollButton = document.getElementById("heroRoll");
const heroGroupButton = document.getElementById("heroGroup");
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

const state = {
  language: getInitialLanguage(),
  historyEntries: [],
  lastSoloResult: null,
  groupResult: { type: "waiting" },
};

function getInitialLanguage() {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  const browserLanguage = navigator.language || "es";

  if (browserLanguage.toLowerCase().startsWith("pt")) {
    return "pt-BR";
  }

  if (browserLanguage.toLowerCase().startsWith("en")) {
    return "en";
  }

  return "es";
}

function getText(key) {
  return translations[state.language][key];
}

function formatText(key, ...args) {
  const value = getText(key);
  return typeof value === "function" ? value(...args) : value;
}

function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function setDieState(result) {
  [heroDie, panelDie].forEach((die) => {
    die.classList.remove("die--critical", "die--fumble");

    if (result === 20) {
      die.classList.add("die--critical");
    } else if (result === 1) {
      die.classList.add("die--fumble");
    }
  });
}

function animateDie(result) {
  [heroDie, panelDie].forEach((die, index) => {
    die.classList.remove("die--rolling");
    void die.offsetWidth;
    die.classList.add("die--rolling");

    window.setTimeout(() => {
      die.textContent = String(result);
    }, 140 + index * 20);
  });

  setDieState(result);
}

function getSoloMessage(result) {
  if (result === 20) return formatText("soloCritical");
  if (result === 1) return formatText("soloFumble");
  if (result >= 16) return formatText("soloHigh", result);
  if (result <= 5) return formatText("soloLow", result);
  return formatText("soloMid", result);
}

function createPlayerInput(index) {
  const label = document.createElement("label");
  label.className = "player-row";

  const title = document.createElement("span");
  title.setAttribute("data-player-label", "");
  title.dataset.playerIndex = String(index);

  const input = document.createElement("input");
  input.type = "text";
  input.setAttribute("data-player-input", "");
  input.dataset.playerIndex = String(index);

  label.append(title, input);
  return label;
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
      roll: rollD20(),
    };
  });
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

    if (entry.type === "solo") {
      item.textContent = formatText("historySolo", entry.result);
    }

    if (entry.type === "winner") {
      item.textContent = formatText("historyWinner", getPlayerDisplayName(entry.winner), entry.roll);
    }

    if (entry.type === "tie") {
      const names = entry.players.map(getPlayerDisplayName).join(", ");
      item.textContent = formatText("historyTie", names, entry.roll);
    }

    historyContainer.appendChild(item);
  });
}

function addHistory(entry) {
  state.historyEntries = [entry, ...state.historyEntries].slice(0, 8);
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

function applyStaticTranslations() {
  translatableNodes.forEach((node) => {
    node.textContent = formatText(node.dataset.i18n);
  });

  document.documentElement.lang = translations[state.language].htmlLang;
  document.title = formatText("pageTitle");
  pageDescription.setAttribute("content", formatText("pageDescription"));
  topbar.setAttribute("aria-label", formatText("headerAria"));
  mobileDock.setAttribute("aria-label", formatText("mobileDockAria"));
  roadmapList.setAttribute("aria-label", formatText("roadmapAria"));
  document.getElementById("languageLabel").textContent = formatText("languageLabel");
  languageSelect.setAttribute("aria-label", formatText("languageLabel"));
  languageSelect.value = state.language;
  copyrightYear.textContent = String(new Date().getFullYear());
}

function applyLanguage(language) {
  state.language = language;
  window.localStorage.setItem(STORAGE_KEY, language);
  applyStaticTranslations();
  updatePlayerFields();
  soloMessage.textContent =
    state.lastSoloResult === null ? formatText("soloDefault") : getSoloMessage(state.lastSoloResult);
  renderGroupResult();
  renderHistory();
}

function runSoloRoll() {
  const result = rollD20();
  state.lastSoloResult = result;
  animateDie(result);
  soloMessage.textContent = getSoloMessage(result);
  addHistory({ type: "solo", result });
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

rollSoloButton.addEventListener("click", runSoloRoll);
heroRollButton.addEventListener("click", runSoloRoll);
dockRollButton.addEventListener("click", runSoloRoll);

addPlayerButton.addEventListener("click", () => {
  const nextIndex = playersContainer.querySelectorAll("[data-player-input]").length + 1;
  playersContainer.appendChild(createPlayerInput(nextIndex));
  updatePlayerFields();
});

rollAllButton.addEventListener("click", () => {
  const players = getPlayers();

  if (players.length < 2) {
    state.groupResult = { type: "error" };
    renderGroupResult();
    pulseResultPanel();
    return;
  }

  const highest = Math.max(...players.map((player) => player.roll));
  const winners = players.filter((player) => player.roll === highest);

  if (winners.length === 1) {
    state.groupResult = { type: "winner", winner: winners[0], roll: highest, players };
    addHistory({ type: "winner", winner: winners[0], roll: highest });
    renderGroupResult();
    pulseResultPanel();
    return;
  }

  state.groupResult = { type: "tie", players: winners, roll: highest, allPlayers: players };
  addHistory({ type: "tie", players: winners, roll: highest });
  renderGroupResult();
  pulseResultPanel();
});

resetAllButton.addEventListener("click", () => {
  [heroDie, panelDie].forEach((die) => {
    die.textContent = "20";
    die.classList.remove("die--critical", "die--fumble", "die--rolling");
  });

  state.lastSoloResult = null;
  state.groupResult = { type: "waiting" };
  state.historyEntries = [];
  soloMessage.textContent = formatText("soloDefault");
  renderGroupResult();
  renderHistory();
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

applyLanguage(state.language);
renderGroupResult();
renderHistory();
revealOnScroll();
