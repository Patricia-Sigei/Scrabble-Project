<<<<<<< Updated upstream
const boardContainer = document.getElementById("board");
const gameplayContainer = document.getElementById("gameplay");
const letters = ["C", "A", "T", "H", "E", "D", "R"];
// function to generate board. (the container helps in generating the second dynamic board)
function genBoard(container) {
    // identifying index for the premium tiles in the board
=======
const boardContainer = document.getElementById("board"); // Assuming this is where the game board should appear
const gameplayContainer = document.getElementById("gameplay"); // This is where animations will happen
const letters = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 
    'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 
    'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

// Predefined array of letters
const predefinedLetters = ['C', 'A', 'T', 'H', 'E', 'D', 'R'];

// Function to generate the board inside gameplay container
function genBoard(container) {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Call the functions to generate the board and the rack
window.onload = function() {
    genBoard(boardContainer);
    genBoard(gameplayContainer);  
    wordRack();  
}

// function to move the letters from the rack to the board.
=======
// function to animate the word "CAT" being placed on the board
function animateWordToBoard() {
    const catLetters = ["C", "A", "T"];
    const rackTiles = [];
    
    catLetters.forEach((_, index) => {
        rackTiles.push(document.getElementById(`tile-${index}`));
    });

    let step = 0;

    function moveToBoard() {
        if (step < 3) {
            const letter = catLetters[step];
            const row = 8;
            const col = 8 + step; 
            const boardTile = document.getElementById(`${row},${col}`);
            const tile = rackTiles[step];

            // create animation
            const tileRect = tile.getBoundingClientRect();
            const boardTileRect = boardTile.getBoundingClientRect();
            const deltaX = boardTileRect.left - tileRect.left;
            const deltaY = boardTileRect.top - tileRect.top;

            tile.style.transition = "transform 1s";
            tile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            //clear dw and star once the letter is placed
            if (boardTile.style.backgroundColor === "orange" || boardTile.style.backgroundColor === "red") {
                boardTile.style.backgroundColor = "white";
                boardTile.firstChild.textContent = "";
            }

            setTimeout(() => {
                //  move the actual tile to the board
                tile.style.transition = "";
                tile.style.transform = "";
                boardTile.appendChild(tile);

                step++;
                setTimeout(moveToBoard, 1000); // delay for the next move
            }, 1000);
        } else {
            setTimeout(() => removePlayedLettersFromRack(catLetters), 1000); // cfter all letters are placed, update the rack
        }
    }

    moveToBoard();
}

// cemove the played letters cat from the rack
function removePlayedLettersFromRack(playedLetters) {
    const remainingLetters = predefinedLetters.filter(letter => !playedLetters.includes(letter));
    
    // clear the rack container
    gameplayContainer.innerHTML = '';

    // redraw the rack with remaining letters
    remainingLetters.forEach((letter, index) => {
        const tile = document.createElement("div");
        tile.style.width = "40px";
        tile.style.height = "40px";
        tile.style.border = "1px solid lightgray";
        tile.style.display = "flex";
        tile.style.justifyContent = "center";
        tile.style.alignItems = "center";
        tile.style.position = "relative";
        tile.style.backgroundColor = "beige";
        tile.style.marginRight = "5px";
        tile.id = `tile-${index}`;

        const letterSpan = document.createElement("span");
        letterSpan.textContent = letter;
        letterSpan.style.fontSize = "20px";
        letterSpan.style.color = "black";

        const valueSpan = document.createElement("span");
        valueSpan.textContent = letters[letter];
        valueSpan.style.fontSize = "12px";
        valueSpan.style.color = "black";
        valueSpan.style.position = "absolute";
        valueSpan.style.bottom = "2px";
        valueSpan.style.right = "2px";

        tile.appendChild(letterSpan);
        tile.appendChild(valueSpan);
        gameplayContainer.appendChild(tile);
    });
}

function initGame() {
    genBoard(boardContainer);
    wordRack(); 
    
    setTimeout(() => {
        animateWordToBoard(); 
    }, 800);
}

// function to animate t dare being placed on the board
function animateWordDAREToBoard() {
  const dareLetters = ["D", "A", "R", "E"];
  const rackTiles = [];
  
  dareLetters.forEach((_, index) => {
      rackTiles.push(document.getElementById(`tile-${index}`));
  });

  let step = 0;

  function moveToBoard() {
      if (step < 4) {
          const letter = dareLetters[step];
          const row = 8;
          const col = 8 + step; // move letters across columns (8, 9, 10, 11) for dare
          const boardTile = document.getElementById(`${row},${col}`);
          const tile = rackTiles[step];

          // create animation
          const tileRect = tile.getBoundingClientRect();
          const boardTileRect = boardTile.getBoundingClientRect();
          const deltaX = boardTileRect.left - tileRect.left;
          const deltaY = boardTileRect.top - tileRect.top;

          tile.style.transition = "transform 1s";
          tile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

          if (boardTile.style.backgroundColor === "orange" || boardTile.style.backgroundColor === "red") {
              boardTile.style.backgroundColor = "white";
              boardTile.firstChild.textContent = "";
          }

          setTimeout(() => {
              
              tile.style.transition = "";
              tile.style.transform = "";
              boardTile.appendChild(tile);

              step++;
              setTimeout(moveToBoard, 1000); 
          }, 1000);
      } else {
          setTimeout(() => removePlayedLettersFromRack(dareLetters), 1000); 
      }
  }

  moveToBoard();
}

function initGame() {
  genBoard(boardContainer); 
  wordRack(); 
  
  setTimeout(() => {
      animateWordToBoard(); 
  }, 800);

  setTimeout(() => {
      animateWordDAREToBoard();
   }, 3000);  // 3 sec delay for dare to start animating
}


// run the game
initGame();
>>>>>>> Stashed changes
