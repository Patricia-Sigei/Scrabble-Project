        const boardContainer = document.getElementById("board");
        const gameplayContainer = document.getElementById("gameplay");
        const letters = {
            'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 
            'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 
            'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
        };

        // Predefined array of letters
        const predefinedLetters = ['C', 'A', 'T', 'D', 'A', 'R', 'E'];

        // Function to generate the board inside gameplay container
        function genBoard(container) {
            let specialTiles = {
                TW: ["1,1", "1,8", "1,15", "8,1", "8,15", "15,1", "15,8", "15,15"],
                DW: ["2,2", "2,14", "3,3", "3,13", "4,4", "4,12", "5,5", "5,11", "8,8", "11,5", "11,11", "12,4", "12,12", "13,3", "13,13", "14,2", "14,14"],
                TL: ["2,6", "2,10", "6,2", "6,6", "6,10", "6,14", "10,2", "10,6", "10,10", "10,14", "14,6", "14,10"],
                DL: ["1,4", "1,12", "3,7", "3,9", "4,1", "4,8", "4,15", "7,3", "7,7", "7,9", "7,13", "8,4", "8,12", "9,3", "9,7", "9,9", "9,13", "12,1", "12,8", "12,15", "13,7", "13,9", "15,4", "15,12"]
            };

            for (let r = 1; r < 16; r++) {
                const row = document.createElement("div");
                row.style.display = "flex";
                for (let c = 1; c < 16; c++){

                    const col = document.createElement("div");
                    let tileName = document.createElement("p");
                    tileName.style.color = "black";
                    col.appendChild(tileName);
                    col.id = `${r},${c}`;
                    col.style.width = "40px";
                    col.style.height = "40px";
                    col.style.display = "flex";
                    col.style.border = "1px solid lightgray";
                    col.style.justifyContent = "center";
                    col.style.alignItems = "center";
                    
                    if (specialTiles.DW.includes(`${r},${c}`)) {
                        col.style.backgroundColor = "orange";
                        tileName.textContent = "DW";
                    } else if (specialTiles.TW.includes(`${r},${c}`)) {
                        col.style.backgroundColor = "red";
                        tileName.textContent = "TW";
                    } else if (specialTiles.DL.includes(`${r},${c}`)) {
                        col.style.backgroundColor = "lightblue";
                        tileName.textContent = "DL";
                    } else if (specialTiles.TL.includes(`${r},${c}`)) {
                        col.style.backgroundColor = "blue";
                        tileName.textContent = "TL";
                    } else {
                        col.style.backgroundColor = "white";
                    }

                    if (r === 8 && c === 8) {
                        let star = document.createElement("span");
                        star.textContent = "★";
                        star.style.color = "black"; 
                        star.style.fontSize = "16px";
                        tileName.appendChild(star);
                    }

                    row.appendChild(col);
                }
                container.appendChild(row);
            }
        }


// Function to create a rack of letters
function wordRack() {
    // Creates a container for the rack (a row of letter tiles)
    const row = document.createElement("div");
    row.style.display = "flex"; 

    // Loop to create a tile for each letter
    for (let l = 0; l< letters.length; l++) {
        // Creates a div for each tile
        const rack = document.createElement("div");
        // Styles the tile
        rack.style.width = "50px";
        rack.style.height = "50px";
        rack.style.backgroundColor = "#654321";
        rack.style.margin = "5px";
        rack.style.display = "flex"; 
        rack.style.justifyContent = "center";
        rack.style.alignItems = "center";
        rack.style.borderRadius = "40%"

        // Creates the letter element and style it
        let rackLetter = document.createElement("p");
        rackLetter.textContent = letters[l];
        rackLetter.style.color = "white";

        // Appends the letter to the rack 
        rack.appendChild(rackLetter);

        // Append the rack to the row
        row.appendChild(rack);
    }

    // append the row of tiles to the gameplay container
    gameplay.appendChild(row);
}

// Call the functions to generate the board and the rack
window.onload = function() {
    genBoard(boardContainer);
    genBoard(gameplayContainer);  
    wordRack();  
}

// function to move the letters from the rack to the board.
