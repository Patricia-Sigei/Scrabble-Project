const boardContainer = document.getElementById("board");
const humanRackContainer = document.getElementById("humanRack"); 
const computerRackContainer = document.getElementById("computerRack");


// Function to generate the Scrabble board
function genBoard(container) {
    for (let r = 1; r <= 16; r++) {  // Changed: r goes from 1 to 16
        const row = document.createElement("div");
        row.style.display = "flex";
        for (let c = 1; c <= 16; c++) {  // Changed: c goes from 1 to 16
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
            col.style.border = "1px solid lightgrey";
            col.style.justifyContent = "center";
            col.style.alignItems = "center";

            // Star tile at the center (adjusting for 16x16 board)
            if (r === 8 && c === 8) {
                let star = document.createElement("span");
                star.textContent = "★";
                star.style.color = "black";
                star.style.fontSize = "16px";
                tileName.appendChild(star);
            }

            row.appendChild(col);
        }
      col.style.width = "50px";
      col.style.height = "40px";
      col.style.display = "flex";
      col.style.border = "1px solid lightgray";
      col.style.justifyContent = "center";
      col.style.alignItems = "center";    
      row.appendChild(col);
    }
    board.appendChild(row);
  }

window.onload = genBoard;

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
        rack.setAttribute('draggable', true); 
        rack.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", rackLetter.textContent); 
        });
    }

    container.appendChild(row); 
}

// Drop functionality on the board
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let tile = event.target;

    // Handle drop on special tiles like the star
    if (tile.tagName === "SPAN") {
        tile = tile.parentElement.parentElement; 
    } else if (tile.tagName === "P") {
        tile = tile.parentElement; 
    }

    const letter = event.dataTransfer.getData("text/plain");

    // Allow dropping only on empty or white tiles
    if (tile && (tile.style.backgroundColor === "white" || tile.querySelector("span"))) {
        tile.innerHTML = `<p style="color: black;">${letter}</p>`;
    }
}

// Function to reset the tile by clicking
function resetTile(event) {
    const tile = event.target;

    // Handle resetting based on special tile type
    const row = Math.floor(tile.dataset.index / 16) + 1;  // Adjusted for 16x16 board
    const col = (tile.dataset.index % 16) + 1;  // Adjusted for 16x16 board
    
    if (specialTiles.DW.includes(`${row},${col}`)) {
        tile.innerHTML = `<p>DW</p>`;
        tile.style.backgroundColor = "orange";
    } else if (specialTiles.TW.includes(`${row},${col}`)) {
        tile.innerHTML = `<p>TW</p>`;
        tile.style.backgroundColor = "red";
    } else if (specialTiles.DL.includes(`${row},${col}`)) {
        tile.innerHTML = `<p>DL</p>`;
        tile.style.backgroundColor = "lightblue";
    } else if (specialTiles.TL.includes(`${row},${col}`)) {
        tile.innerHTML = `<p>TL</p>`;
        tile.style.backgroundColor = "blue";
    } else if (row === 8 && col === 8) {
        tile.innerHTML = `<p><span style="color: black; font-size: 16px;">★</span></p>`;
        tile.style.backgroundColor = "orange";  // Set the background to "DW" color, which is orange
    } else {
        tile.innerHTML = "";
        tile.style.backgroundColor = "whi


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
