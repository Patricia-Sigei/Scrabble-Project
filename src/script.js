const boardContainer = document.getElementById("board");
const humanRackContainer = document.getElementById("humanRack"); // Correct rack for human player
const computerRackContainer = document.getElementById("computerRack"); // Rack for computer player

const letters = ["C", "A", "T", "H", "E", "D", "R"];

// Function to generate the Scrabble board
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
        for (let c = 1; c < 16; c++) {
            const col = document.createElement("div");
            let tileName = document.createElement("p");
            tileName.style.color = "black";
            col.appendChild(tileName);

            // Add tile color based on type
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

            col.style.width = "40px";
            col.style.height = "30px";
            col.style.display = "flex";
            col.style.border = "1px solid lightgray";
            col.style.justifyContent = "center";
            col.style.alignItems = "center";

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
function wordRack(container) {
    const row = document.createElement("div");
    row.style.display = "flex"; 

    for (let l = 0; l < letters.length; l++) {
        const rack = document.createElement("div");
        rack.style.width = "50px";
        rack.style.height = "50px";
        rack.style.backgroundColor = "#654321";
        rack.style.margin = "5px";
        rack.style.display = "flex"; 
        rack.style.justifyContent = "center";
        rack.style.alignItems = "center";
        rack.style.borderRadius = "40%";

        let rackLetter = document.createElement("p");
        rackLetter.textContent = letters[l];
        rackLetter.style.color = "white";

        rack.appendChild(rackLetter);
        row.appendChild(rack);

        // Add event listener for drag and drop
        rack.setAttribute('draggable', true); // Make the rack draggable
        rack.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", letters[l]); // Store the letter being dragged
        });
    }

    container.appendChild(row); // Append the rack to the provided container
}

// Drop functionality on the board
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const letter = event.dataTransfer.getData("text/plain");
    const tile = event.target;
    if (tile && tile.style.backgroundColor === "white") {
        tile.innerHTML = `<p style="color: black;">${letter}</p>`;
    }
}

// Initialize the game when the window loads
window.onload = function() {
    genBoard(boardContainer); // Generate the Scrabble board
    wordRack(humanRackContainer); // Generate the human player's rack
    wordRack(computerRackContainer); // Generate the computer's rack

    // Add event listeners for the board tiles (drag and drop functionality)
    const tiles = boardContainer.getElementsByTagName("div");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('dragover', allowDrop);
        tiles[i].addEventListener('drop', drop);
    }

    // Collapsible buttons functionality
    const collapsibleButtons = document.querySelectorAll(".collapsible");
    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
};

