const teams = [];
const players = [];
const results = [];

document.getElementById('teamForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('teamName').value;
  const budget = parseInt(document.getElementById('teamBudget').value);
  teams.push({ name, budget });
  updateTeams();
  document.getElementById('teamForm').reset();
});

document.getElementById('playerForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('playerName').value;
  const basePrice = parseInt(document.getElementById('basePrice').value);
  players.push({ name, basePrice, sold: false });
  updatePlayers();
  document.getElementById('playerForm').reset();
});

document.getElementById('auctionForm').addEventListener('submit', e => {
  e.preventDefault();
  const playerName = document.getElementById('auctionPlayer').value;
  const teamName = document.getElementById('auctionTeam').value;
  const bid = parseInt(document.getElementById('bidAmount').value);

  const player = players.find(p => p.name === playerName);
  const team = teams.find(t => t.name === teamName);

  if (player && team && bid >= player.basePrice && bid <= team.budget && !player.sold) {
    team.budget -= bid;
    player.sold = true;
    results.push({ player: player.name, bid, team: team.name });
    updateResults();
    updatePlayers();
    updateTeams();
  } else {
    alert("Invalid bid or player already sold.");
  }
});

function updateTeams() {
  const list = document.getElementById('teamList');
  const selector = document.getElementById('auctionTeam');
  list.innerHTML = '';
  selector.innerHTML = '';
  teams.forEach(team => {
    list.innerHTML += `<li>${team.name} (Budget: ${team.budget})</li>`;
    selector.innerHTML += `<option value="${team.name}">${team.name}</option>`;
  });
}

function updatePlayers() {
  const list = document.getElementById('playerList');
  const selector = document.getElementById('auctionPlayer');
  list.innerHTML = '';
  selector.innerHTML = '';
  players.forEach(player => {
    const status = player.sold ? "SOLD" : `Base Price: ${player.basePrice}`;
    list.innerHTML += `<li>${player.name} - ${status}</li>`;
    if (!player.sold) {
      selector.innerHTML += `<option value="${player.name}">${player.name}</option>`;
    }
  });
}

function updateResults() {
  const table = document.getElementById('auctionResults');
  table.innerHTML = '';
  results.forEach(result => {
    table.innerHTML += `<tr><td>${result.player}</td><td>${result.bid}</td><td>${result.team}</td></tr>`;
  });
}
