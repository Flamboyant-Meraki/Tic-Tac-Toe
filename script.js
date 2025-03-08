let fields = new Array(9).fill(null);

let currentPlayer = 'fire';

function init() {
    render();
}

function render() {
    const contentSection = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'fire') {
                symbol = '<img src="./assets/img/fire.png" alt="flame">';
            } else if (fields[index] === 'plant') {
                symbol = '<img src="./assets/img/plant.png" alt="leef">';
            } else if (fields[index] === 'water') {
                symbol = '<img src="./assets/img/water.png" alt="waterdrop">';
            }
            tableHtml += `<td onclick="fillFields(${index}, this)">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentSection.innerHTML = tableHtml;
}

function canOverride(currentPlayer, targetField) {
    return (currentPlayer === 'fire' && targetField === 'plant') ||
           (currentPlayer === 'plant' && targetField === 'water') ||
           (currentPlayer === 'water' && targetField === 'fire');
}

function fillFields(index, cell) {
    if (fields[index] === null || canOverride(currentPlayer, fields[index])) {
        fields[index] = currentPlayer;
        cell.innerHTML = `<img src="./assets/img/${currentPlayer}.png" alt="${currentPlayer}">`;
        if (currentPlayer === 'fire') {
            currentPlayer = 'plant';
        } else if (currentPlayer === 'plant') {
            currentPlayer = 'water';
        } else if (currentPlayer === 'water') {
            currentPlayer = 'fire';
        }
    }
    winningGame();
}


function winningGame(){
    const winningCombinations = [
        [0, 1, 2], // erste Reihe
        [3, 4, 5], // zweite Reihe
        [6, 7, 8], // dritte Reihe
        [0, 3, 6], // erste Spalte
        [1, 4, 7], // zweite Spalte
        [2, 5, 8], // dritte Spalte
        [0, 4, 8], // Diagonale von links oben nach rechts unten
        [2, 4, 6]  // Diagonale von rechts oben nach links unten
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Elemente hervorheben
            const cells = document.querySelectorAll('td');
            cells[a].style.backgroundColor = 'yellow';
            cells[b].style.backgroundColor = 'yellow';
            cells[c].style.backgroundColor = 'yellow';
            alert(`${fields[a]} wins!`);
            return true;
        }
    }
    return false;
}