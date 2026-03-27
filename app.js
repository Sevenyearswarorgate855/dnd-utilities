const soloDie = document.getElementById("soloDie");
const soloMessage = document.getElementById("soloMessage");
const addPlayerButton = document.getElementById("addPlayer");
const rollAllButton = document.getElementById("rollAll");
const rollSoloButton = document.getElementById("rollSolo");
const resetAllButton = document.getElementById("resetAll");
const playersContainer = document.getElementById("players");
const groupResult = document.getElementById("groupResult");
const historyContainer = document.getElementById("history");

let historyEntries = [];

function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function animateSoloDie(result) {
  soloDie.classList.remove("die--rolling");
  void soloDie.offsetWidth;
  soloDie.classList.add("die--rolling");

  window.setTimeout(() => {
    soloDie.textContent = String(result);
  }, 170);
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
  historyEntries = [entry, ...historyEntries].slice(0, 6);
  renderHistory();
}

function getSoloMessage(result) {
  if (result === 20) {
    return "Has sacado 20. Tirada critica.";
  }

  if (result === 1) {
    return "Has sacado 1. Pifia absoluta.";
  }

  if (result >= 15) {
    return `Has sacado ${result}. Muy buena tirada.`;
  }

  return `Has sacado ${result}.`;
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

rollSoloButton.addEventListener("click", () => {
  const result = rollD20();
  animateSoloDie(result);
  soloMessage.textContent = getSoloMessage(result);
  addHistory(`Tirada individual: ${result}`);
});

addPlayerButton.addEventListener("click", () => {
  const nextIndex = playersContainer.querySelectorAll("input").length + 1;
  playersContainer.appendChild(createPlayerInput(nextIndex));
});

rollAllButton.addEventListener("click", () => {
  const players = getPlayers();

  if (players.length < 2) {
    groupResult.textContent = "Necesitas al menos dos jugadores para comparar tiradas.";
    return;
  }

  const highest = Math.max(...players.map((player) => player.roll));
  const winners = players.filter((player) => player.roll === highest);
  const summary = players.map((player) => `${player.name}: ${player.roll}`).join(" | ");

  if (winners.length === 1) {
    groupResult.innerHTML = `<span class="winner">${winners[0].name}</span> gana con <strong>${highest}</strong>.<br><br>${summary}`;
    addHistory(`${winners[0].name} gana con ${highest}. ${summary}`);
    return;
  }

  const tieNames = winners.map((player) => player.name).join(", ");
  groupResult.innerHTML = `<span class="tie">Empate</span> con <strong>${highest}</strong> entre <strong>${tieNames}</strong>.<br><br>${summary}<br><br>Volved a tirar para desempatar.`;
  addHistory(`Empate a ${highest}: ${tieNames}. ${summary}`);
});

resetAllButton.addEventListener("click", () => {
  soloDie.textContent = "20";
  soloMessage.textContent = "Pulsa para hacer una tirada individual.";
  groupResult.textContent = "Esperando una tirada grupal.";
  historyEntries = [];
  renderHistory();
});

renderHistory();
