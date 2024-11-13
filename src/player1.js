document.addEventListener("DOMContentLoaded", function () {
    const player1Container = document.getElementById("player1"); 

    const startRow = 8;
    const startCol = 8;

    const bonusPoints = {
        DL: ["4,1", "12,1", "7,3", "9,3", "8,4", "15,4", "3,7", "7,7", "9,7", "13,7", "4,8", "12,8", "3,9", "7,9", "9,9", "13,9", "1,12", "8,12", "15,12", "7,13", "9,13", "4,15", "12,15"],
        TW: ["1,1", "8,1", "15,1", "1,8", "15,8", "1,15", "8,15", "15,15"],
        DW: ["2,2", "14,2", "3,3", "13,3", "4,4", "8,8", "12,4", "5,5", "11,5", "5,11", "11,11", "4,12", "12,12", "3,13", "13,13", "2,14", "14,14"],
        TL: ["6,2", "10,2", "2,6", "6,6", "10,6", "14,6", "2,10", "6,10", "10,10", "14,10", "6,14", "10,14"]
    };

    function genBoard(container, prefix) {
        const boardDiv = document.createElement("div");
        boardDiv.classList.add("game-board");

        for (let r = 1; r <= 15; r++) {
            const row = document.createElement("div");
            row.classList.add("board-row");

            for (let c = 1; c <= 15; c++) {
                const col = document.createElement("div");
                col.classList.add("tile");

                const position = `${r},${c}`;
                if (bonusPoints.DL.includes(position)) {
                    col.style.backgroundColor = "lightblue";
                    col.textContent = "DL";
                } else if (bonusPoints.DW.includes(position)) {
                    col.style.backgroundColor = "pink";
                    col.textContent = "DW";
                } else if (bonusPoints.TL.includes(position)) {
                    col.style.backgroundColor = "royalblue";
                    col.textContent = "TL";
                } else if (bonusPoints.TW.includes(position)) {
                    col.style.backgroundColor = "red";
                    col.textContent = "TW";
                } else {
                    col.style.backgroundColor = "beige";
                }

                col.id = `${prefix}-${position}`;
                row.appendChild(col);
            }
            boardDiv.appendChild(row);
        }
        container.appendChild(boardDiv);
    }

    function wordRack(container) {
        const rackDiv = document.createElement("div");
        rackDiv.id = "word-rack";

        const predefinedLetters = ['C', 'A', 'T', 'F', 'D', 'A', 'R', 'E'];
        predefinedLetters.forEach(letter => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = letter;
            tile.id = `rack-${letter}`;
            rackDiv.appendChild(tile);
        });

        container.appendChild(rackDiv);
    }

    function animateToBoard() {
        const letters = ['C', 'A', 'T'];
        console.log("Starting animation to board...");

        letters.forEach((letter, index) => {
            const rackTile = document.querySelector(`#player1 #rack-${letter}`);
            const boardTile = document.getElementById(`player1-${startRow},${startCol + index}`); // Using prefixed ID

            if (!rackTile || !boardTile) {
                console.error(`Tile not found: rackTile for ${letter} or boardTile at (${startRow},${startCol + index})`);
                return;
            }

            setTimeout(() => {
                console.log(`Moving ${letter} from rack to board position (${startRow},${startCol + index})`);
                boardTile.textContent = letter;
                rackTile.textContent = '';
            }, index * 500);
        });

        setTimeout(returnToRack, letters.length * 500 + 1000);
    }

    function returnToRack() {
        const letters = ['C', 'A', 'T'];
        console.log("Returning animation to rack...");

        letters.forEach((letter, index) => {
            const rackTile = document.querySelector(`#player1 #rack-${letter}`);
            const boardTile = document.getElementById(`player1-${startRow},${startCol + index}`); // Using prefixed ID

            if (!rackTile || !boardTile) {
                console.error(`Tile not found: rackTile for ${letter} or boardTile at (${startRow},${startCol + index})`);
                return;
            }

            setTimeout(() => {
                console.log(`Returning ${letter} from board position (${startRow},${startCol + index}) to rack`);
                boardTile.textContent = '';
                rackTile.textContent = letter;
            }, index * 500);
        });

        setTimeout(animateToBoard, letters.length * 500 + 1000);
    }

    genBoard(player1Container, "player1"); 
    wordRack(player1Container); 
    animateToBoard();           
});
