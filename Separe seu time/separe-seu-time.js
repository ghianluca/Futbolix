let players = [];

function addPlayer() {
  const playerName = document.getElementById('playerName').value.trim();
  const playerSkill = document.getElementById('playerSkill').value.trim();

  if (playerName !== '' && !isNaN(playerSkill) && playerSkill >= 1 && playerSkill <= 10) {
    players.push({ name: playerName, skill: parseInt(playerSkill, 10) });
    updatePlayersList();
    showClearButton();
    notification('Jogador adicionado com sucesso!', 'success');
  } else {
    notification('Por favor, insira um nome válido e uma habilidade entre 1 e 10.', 'error');
  }
}

function updatePlayersList() {
  const playersList = document.getElementById('playersList');
  if(playersList){
    playersList.innerHTML = '';
  
    players.forEach(player => {
      const playerItem = document.createElement('li');
      playerItem.textContent = `${player.name} (Habilidade: ${player.skill})`;
      playersList.appendChild(playerItem);
    });
  }
}

function generateTeams() {
  if (players.length < 2) {

    notification('Adicione pelo menos dois jogadores para separar os times.', 'error');
    return;
  }

  players.sort((a, b) => b.skill - a.skill);

  const teamA = [];
  const teamB = [];

  players.forEach((player, index) => {
    if (index % 2 === 0) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
  });

  displayTeams(teamA, teamB);
  showClearButton();
}

function displayTeams(teamA, teamB) {
  const teamAList = document.getElementById('teamAList');
  const teamBList = document.getElementById('teamBList');

  teamAList.innerHTML = '';
  teamBList.innerHTML = '';

  teamA.forEach(player => {
    const playerItem = document.createElement('li');
    playerItem.textContent = `${player.name} (Habilidade: ${player.skill})`;
    teamAList.appendChild(playerItem);
  });

  teamB.forEach(player => {
    const playerItem = document.createElement('li');
    playerItem.textContent = `${player.name} (Habilidade: ${player.skill})`;
    teamBList.appendChild(playerItem);
  });
}

function clearTeams() {
  document.getElementById('teamAList').innerHTML = '';
  document.getElementById('teamBList').innerHTML = '';
  document.getElementById('clearTeamsButton').style.display = 'none';
}

function showClearButton() {
  const clearButton = document.getElementById('clearTeamsButton');
  if (players.length > 0) {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
}

function notification (message, style) {
  const element = document.getElementsByClassName('notification')[0];
  element.style.display = 'block';
  element.textContent = message;
  element.classList.remove('success', 'error');
  element.classList.add(style);
  setTimeout(() => {
    element.style.display = 'none';
  }, 3000);

}