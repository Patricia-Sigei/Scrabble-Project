document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game"); // Static board container

    const bonusPoints = {
        DL: ["4,1", "12,1", "7,3", "9,3", "8,4", "15,4", "3,7", "7,7", "9,7", "13,7", "4,8", "12,8", "3,9", "7,9", "9,9", "13,9", "1,12", "8,12", "15,12", "7,13", "9,13", "4,15", "12,15"],
        TW: ["1,1", "8,1", "15,1", "1,8", "15,8", "1,15", "8,15", "15,15"],
        DW: ["2,2", "14,2", "3,3", "13,3", "4,4", "8,8", "12,4", "5,5", "11,5", "5,11", "11,11", "4,12", "12,12", "3,13", "13,13", "2,14", "14,14"],
        TL: ["6,2", "10,2", "2,6", "6,6", "10,6", "14,6", "2,10", "6,10", "10,10", "14,10", "6,14", "10,14"]
    };

    function genBoard(container) {
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

                col.id = position;
                row.appendChild(col);
            }
            boardDiv.appendChild(row);
        }
        container.appendChild(boardDiv);
    }

    genBoard(gameContainer); // Generate static board in "game" container
});
