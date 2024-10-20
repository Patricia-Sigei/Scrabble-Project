const boardContainer = document.getElementById("board");
const gameplayContainer = document.getElementById("gameplay");
const letters = ["C", "A", "T", "H", "E", "D", "R"];
// function to generate board. (the container helps in generating the second dynamic board)
function genBoard(container) {
    // identifying index for the premium tiles in the board
    let specialTiles = {
        TW: ["1,1", "1,8", "1,15", "8,1", "8,15", "15,1", "15,8", "15,15"],
        DW: ["2,2", "2,14", "3,3", "3,13", "4,4", "4,12", "5,5", "5,11", "8,8", "11,5", "11,11", "12,4", "12,12", "13,3", "13,13", "14,2", "14,14"],
        TL: ["2,6", "2,10", "6,2", "6,6", "6,10", "6,14", "10,2", "10,6", "10,10", "10,14", "14,6", "14,10"],
        DL: ["1,4", "1,12", "3,7", "3,9", "4,1", "4,8", "4,15", "7,3", "7,7", "7,9", "7,13", "8,4", "8,12", "9,3", "9,7", "9,9", "9,13", "12,1", "12,8", "12,15", "13,7", "13,9", "15,4", "15,12"]
    };
// using for loop to generate the board
    for (let r = 1; r < 16; r++) {
        const row = document.createElement("div");
        row.style.display = "flex";
        for (let c = 1; c < 16; c++) {
// creating the div for the tileName and appending it into their positions in the board
            const col = document.createElement("div");
            let tileName = document.createElement("p");
            tileName.style.color = "black";
            col.appendChild(tileName);
            // styling the double word score tile and appending the DW to depict it
            if (specialTiles.DW.includes(`${r},${c}`)) {
                col.style.backgroundColor = "orange";
                tileName.textContent = "DW";
            }
            // styling the triple word score tiles and appending TW to depict it
            else if (specialTiles.TW.includes(`${r},${c}`)) {
                col.style.backgroundColor = "red";
                tileName.textContent = "TW";
            }
            // styling the double letter score tiles and appending DL to depict it
            else if (specialTiles.DL.includes(`${r},${c}`)) {
                col.style.backgroundColor = "lightblue";
                tileName.textContent = "DL";
            }
            // styling the triple letter score tile and appending TL to depict it
            else if (specialTiles.TL.includes(`${r},${c}`)) {
                col.style.backgroundColor = "blue";
                tileName.textContent = "TL";
            }
            else {
                col.style.backgroundColor = "white";
            }
            col.style.width = "40px";
            col.style.height = "30px";
            col.style.display = "flex";
            col.style.border = "1px solid lightgray";
            col.style.justifyContent = "center";
            col.style.alignItems = "center";
            // creating a span element symbolized as a star to signify the starting point in the middle of the board
            if (r === 8 && c === 8) {
                let star = document.createElement("span");
                star.textContent = "★"; // Using a star character
                star.style.color = "black"; 
                star.style.fontSize = "16px"
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