// מאגר שחקנים
let players = JSON.parse(localStorage.getItem('players')) || [
    { name: "איבגי", rating: 4.42, weeks: 0 },
    { name: "נתנאל", rating: 3.74, weeks: 0 },
    { name: "אור", rating: 4.7, weeks: 0 }
];

// טעינת שחקנים
function loadPlayers() {
    const tableBody = document.querySelector('#playersTable tbody');
    tableBody.innerHTML = '';
    players.forEach((player, index) => {
        const row = `<tr>
            <td>${player.name}</td>
            <td>${player.rating}</td>
            <td>${player.weeks}</td>
            <td>
                <button onclick="editPlayer(${index})">עריכה</button>
                <button onclick="deletePlayer(${index})">מחק</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// שמירת שחקנים
function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
    loadPlayers();
}

// הוספת שחקן
function addPlayer() {
    const name = document.getElementById('playerName').value;
    const rating = parseFloat(document.getElementById('playerRating').value);
    const weeks = parseInt(document.getElementById('playerWeeks').value);
    players.push({ name, rating, weeks });
    savePlayers();
    document.getElementById('addPlayerForm').reset();
}

// עריכת שחקן
function editPlayer(index) {
    const player = players[index];
    document.getElementById('playerName').value = player.name;
    document.getElementById('playerRating').value = player.rating;
    document.getElementById('playerWeeks').value = player.weeks;
    players.splice(index, 1);
    savePlayers();
}

// מחיקת שחקן
function deletePlayer(index) {
    players.splice(index, 1);
    savePlayers();
}

// בחירת שחקנים
function divideTeams() {
    const selectedPlayers = players.slice().sort((a, b) => b.rating - a.rating);
    const teams = [
        selectedPlayers.slice(0, 5),
        selectedPlayers.slice(5, 10),
        selectedPlayers.slice(10, 15),
        selectedPlayers.slice(15)
    ];
    teams.forEach((team, index) => {
        const teamDiv = document.getElementById(`team${index + 1}`);
        teamDiv.querySelector('ul').innerHTML = team
            .map(player => `<li>${player.name} (דירוג: ${player.rating})</li>`)
            .join('');
    });
}

// הפעלת הטעינה
window.onload = loadPlayers;
