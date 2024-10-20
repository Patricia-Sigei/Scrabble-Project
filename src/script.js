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

// function to create a rack of letters in the gameplay container
function wordRack() {
    const rackContainer = document.createElement("div");
    
    // Styling the rack to make it visible
    rackContainer.style.display = "flex";
    rackContainer.style.marginTop = "20px";
    rackContainer.style.justifyContent = "center"; 
    rackContainer.style.padding = "10px";
    rackContainer.style.border = "2px solid black"; 
    rackContainer.style.backgroundColor = "#f8f8f8"; 
    rackContainer.style.borderRadius = "5px";
    rackContainer.style.width = "fit-content";
    
    for (let i = 0; i < predefinedLetters.length; i++) {
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
        tile.id = `tile-${i}`;

        const randomLetter = predefinedLetters[i];
        const letterValue = letters[randomLetter];

        const letterSpan = document.createElement("span");
        letterSpan.textContent = randomLetter;
        letterSpan.style.fontSize = "20px";
        letterSpan.style.color = "black";

        const valueSpan = document.createElement("span");
        valueSpan.textContent = letterValue;
        valueSpan.style.fontSize = "12px";
        valueSpan.style.color = "black";
        valueSpan.style.position = "absolute";
        valueSpan.style.bottom = "2px";
        valueSpan.style.right = "2px";


        tile.appendChild(letterSpan);
        tile.appendChild(valueSpan);
        rackContainer.appendChild(tile);
    }

    boardContainer.appendChild(rackContainer);
}

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
            const col = 8 + step; // moves letters across columns (8, 9, 10)
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
        animateWordToBoard(); // start the animation for the word cat
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
              setTimeout(moveToBoard, 1000); // 1 sec delay for the next move
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