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
const playersContainer = document.getElementById("players");
const groupResult = document.getElementById("groupResult");
const historyContainer = document.getElementById("history");
const arenaSection = document.getElementById("arena");
const revealNodes = document.querySelectorAll(".reveal");

let historyEntries = [];

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
    }, 150 + index * 20);
  });

  setDieState(result);
}

function renderHistory() {
  historyContainer.innerHTML = "";

  if (historyEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history__empty";
    empty.textContent = "Todavia no hay tiradas registradas.";
    historyContainer.appendChild(empty);
    return;
  }

  historyEntries.forEach((entry) => {
    const item = document.createElement("p");
    item.className = "history__item";
    item.textContent = entry;
    historyContainer.appendChild(item);
  });
}

function addHistory(entry) {
  historyEntries = [entry, ...historyEntries].slice(0, 8);
  renderHistory();
}

function getSoloMessage(result) {
  if (result === 20) {
    return "Has sacado 20. Critico limpio. La mesa ya tiene respuesta.";
  }

  if (result === 1) {
    return "Has sacado 1. Pifia total. El caos decide por ti.";
  }

  if (result >= 16) {
    return `Has sacado ${result}. Tirada fuerte para cerrar la decision.`;
  }

  if (result <= 5) {
    return `Has sacado ${result}. No es el dia del destino.`;
  }

  return `Has sacado ${result}. Resultado listo para decidir.`;
}

function createPlayerInput(index) {
  const label = document.createElement("label");
  label.className = "player-row";

  const title = document.createElement("span");
  title.textContent = `Jugador ${index}`;

  const input = document.createElement("input");
  input.type = "text";
  input.value = `Jugador ${index}`;

  label.append(title, input);
  return label;
}

function getPlayers() {
  const inputs = [...playersContainer.querySelectorAll("input")];

  return inputs.map((input, index) => ({
    name: input.value.trim() || `Jugador ${index + 1}`,
    roll: rollD20(),
  }));
}

function pulseResultPanel() {
  groupResult.classList.remove("result-panel--flash");
  void groupResult.offsetWidth;
  groupResult.classList.add("result-panel--flash");
}

function renderRollTags(players) {
  return `
    <div class="result-rolls">
      ${players
        .map(
          (player) =>
            `<span class="result-roll">${player.name}: <strong>${player.roll}</strong></span>`
        )
        .join("")}
    </div>
  `;
}

function runSoloRoll() {
  const result = rollD20();
  animateDie(result);
  soloMessage.textContent = getSoloMessage(result);
  addHistory(`Tirada individual: ${result}`);
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
    {
      threshold: 0.18,
    }
  );

  revealNodes.forEach((node) => {
    if (!node.classList.contains("reveal--visible")) {
      observer.observe(node);
    }
  });
}

rollSoloButton.addEventListener("click", runSoloRoll);
heroRollButton.addEventListener("click", runSoloRoll);

addPlayerButton.addEventListener("click", () => {
  const nextIndex = playersContainer.querySelectorAll("input").length + 1;
  playersContainer.appendChild(createPlayerInput(nextIndex));
});

rollAllButton.addEventListener("click", () => {
  const players = getPlayers();

  if (players.length < 2) {
    groupResult.innerHTML = '<p class="result-panel__intro">Necesitas al menos dos jugadores para comparar tiradas.</p>';
    pulseResultPanel();
    return;
  }

  const highest = Math.max(...players.map((player) => player.roll));
  const winners = players.filter((player) => player.roll === highest);
  const rollTags = renderRollTags(players);

  if (winners.length === 1) {
    groupResult.innerHTML = `
      <p class="result-panel__headline"><span class="winner">${winners[0].name}</span> gana con <strong>${highest}</strong>.</p>
      <p class="result-panel__intro">Decision resuelta. No hace falta desempate.</p>
      ${rollTags}
    `;
    addHistory(`${winners[0].name} gana con ${highest}.`);
    pulseResultPanel();
    return;
  }

  const tieNames = winners.map((player) => player.name).join(", ");
  groupResult.innerHTML = `
    <p class="result-panel__headline"><span class="tie">Empate</span> con <strong>${highest}</strong> entre <strong>${tieNames}</strong>.</p>
    <p class="result-panel__intro">Toca una nueva ronda para desempatar.</p>
    ${rollTags}
  `;
  addHistory(`Empate a ${highest}: ${tieNames}.`);
  pulseResultPanel();
});

resetAllButton.addEventListener("click", () => {
  [heroDie, panelDie].forEach((die) => {
    die.textContent = "20";
    die.classList.remove("die--critical", "die--fumble", "die--rolling");
  });

  soloMessage.textContent = "Pulsa para hacer una tirada individual.";
  groupResult.innerHTML = '<p class="result-panel__intro">Esperando una tirada grupal.</p>';
  historyEntries = [];
  renderHistory();
});

jumpToArenaButton.addEventListener("click", () => {
  arenaSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

heroGroupButton.addEventListener("click", () => {
  arenaSection.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    rollAllButton.focus();
  }, 400);
});

renderHistory();
revealOnScroll();
