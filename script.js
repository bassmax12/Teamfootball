let players = JSON.parse(localStorage.getItem('players')) || [
    { name: "איבגי", rating: 4.42, weeks: 0 },
    { name: "נתנאל", rating: 3.74, weeks: 0 },
    { name: "אור", rating: 4.7, weeks: 0 },
    { name: "שמואל", rating: 3.37, weeks: 0 },
    { name: "עמרי", rating: null, weeks: 0 },
    { name: "שימי", rating: 4.89, weeks: 0 },
    { name: "חן", rating: 4.32, weeks: 0 },
    { name: "מתן טל", rating: 3.47, weeks: 0 },
    { name: "פרי", rating: 4.16, weeks: 0 },
    { name: "ליאור", rating: 4.95, weeks: 0 },
    { name: "רון", rating: 3.16, weeks: 0 },
    { name: "מתן מנחם", rating: null, weeks: 0 },
    { name: "דניאל", rating: 3.68, weeks: 0 },
    { name: "אלעד", rating: 3.84, weeks: 0 },
    { name: "ניר ישן", rating: 3.0, weeks: 0 },
    { name: "ניר חדש", rating: 4.7, weeks: 0 },
    { name: "עומרי ריבין", rating: 2.95, weeks: 0 },
    { name: "עומר", rating: 3.42, weeks: 0 },
    { name: "ארז גהן", rating: 3.41, weeks: 0 },
    { name: "ארז ביטון", rating: 3.26, weeks: 0 },
    { name: "רן", rating: 3.4, weeks: 0 },
    { name: "דרורי", rating: 3.79, weeks: 0 },
    { name: "אלחנן", rating: 3.05, weeks: 0 },
    { name: "קראדי", rating: 3.5, weeks: 0 },
    { name: "נפתלי", rating: 4.7, weeks: 0 }
];

function loadPlayers() {
    const tableBody = document.querySelector('#playersTable tbody');
    tableBody.innerHTML = '';
    players.forEach((player, index) => {
        const rating = player.rating !== null ? player.rating : "לא ידוע";
        const row = `<tr>
            <td>${player.name}</td>
            <td>${rating}</td>
            <td>${player.weeks}</td>
            <td>
                <button onclick="editPlayer(${index})">עריכה</button>
                <button onclick="deletePlayer(${index})">מחק</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function addPlayer() {
    const name = document.getElementById('playerName').value;
    const rating = parseFloat(document.getElementById('playerRating').value);
    const weeks = parseInt(document.getElementById('playerWeeks').value);
    players.push({ name, rating, weeks });
    savePlayers();
    document.getElementById('addPlayerForm').reset();
}

function editPlayer(index) {
    const player = players[index];
    document.getElementById('playerName').value = player.name;
    document.getElementById('playerRating').value = player.rating !== null ? player.rating : '';
    document.getElementById('playerWeeks').value = player.weeks;
    players.splice(index, 1);
    savePlayers();
}

function deletePlayer(index) {
    players.splice(index, 1);
    savePlayers();
}

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
    loadPlayers();
}

function loadSelectablePlayers() {
    const selectDiv = document.getElementById('playersList');
    selectDiv.innerHTML = '';
    players.forEach((player, index) => {
        const rating = player.rating !== null ? player.rating : "לא ידוע";
        const listItem = `<li>
            <input type="checkbox" name="players" value="${index}">
            ${player.name} (דירוג: ${rating})
        </li>`;
        selectDiv.innerHTML += listItem;
    });
}

function divideTeams() {
    const selectedPlayers = Array.from(document.querySelectorAll('input[name="players"]:checked'))
        .map(input => players[parseInt(input.value)]);
    selectedPlayers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const teams = [
        selectedPlayers.slice(0, 5),
        selectedPlayers.slice(5, 9),
        selectedPlayers.slice(9, 13),
        selectedPlayers.slice(13)
    ];
    teams.forEach((team, index) => {
        const teamDiv = document.getElementById(`team${index + 1}`);
        teamDiv.querySelector('ul').innerHTML = team.map(player => `<li>${player.name} (דירוג: ${player.rating || "לא ידוע"})</li>`).join('');
    });
}

window.onload = loadPlayers;
