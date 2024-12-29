// מאגר שחקנים
let players = JSON.parse(localStorage.getItem('players')) || [
    { name: "איבגי", rating: 4.42, attendance: 0 },
    { name: "נתנאל", rating: 3.74, attendance: 0 },
    { name: "אור", rating: 4.7, attendance: 0 }
];

// הצגת רשימת השחקנים
function loadPlayers() {
    const playerList = document.getElementById('playersList');
    playerList.innerHTML = '';
    players.forEach(player => {
        playerList.innerHTML += `<li>${player.name} (דירוג: ${player.rating}, הגעה: ${player.attendance})</li>`;
    });
}

// הצגת שחקנים לבחירה
function selectPlayers() {
    document.getElementById('playerList').style.display = 'none';
    document.getElementById('selectPlayers').style.display = 'block';

    const selectablePlayers = document.getElementById('selectablePlayers');
    selectablePlayers.innerHTML = '';
    players.forEach((player, index) => {
        selectablePlayers.innerHTML += `<li><input type="checkbox" id="player${index}" /> ${player.name} (דירוג: ${player.rating})</li>`;
    });
}

// חלוקה לקבוצות
function divideTeams() {
    const selectedPlayers = players.filter((_, index) => document.getElementById(`player${index}`).checked);
    selectedPlayers.sort((a, b) => b.rating - a.rating);

    const teams = [
        selectedPlayers.slice(0, 4),
        selectedPlayers.slice(4, 8),
        selectedPlayers.slice(8, 12),
        selectedPlayers.slice(12)
    ];

    document.getElementById('selectPlayers').style.display = 'none';
    document.getElementById('teamsDisplay').style.display = 'block';

    teams.forEach((team, index) => {
        const teamDiv = document.getElementById(`team${index + 1}`);
        teamDiv.querySelector('ul').innerHTML = team
            .map(player => `<li>${player.name} (דירוג: ${player.rating})</li>`)
            .join('');
    });
}

// אישור הגעה
function confirmAttendance() {
    players.forEach((player, index) => {
        if (document.getElementById(`player${index}`) && document.getElementById(`player${index}`).checked) {
            player.attendance++;
        }
    });
    localStorage.setItem('players', JSON.stringify(players));
    document.getElementById('teamsDisplay').style.display = 'none';
    document.getElementById('attendance').style.display = 'block';

    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';
    players.forEach(player => {
        attendanceList.innerHTML += `<li>${player.name} (דירוג: ${player.rating}, הגעה: ${player.attendance})</li>`;
    });
}

// טעינת נתונים
window.onload = loadPlayers;
