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
                // Different IDs for CAT and DARE tiles
                tile.id = i < 3 ? `tile-cat-${i}` : `tile-dare-${i - 3}`;

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
                rackTiles.push(document.getElementById(`tile-cat-${index}`));
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

                    if (boardTile.style.backgroundColor === "orange" || boardTile.style.backgroundColor === "red") {
                        boardTile.style.backgroundColor = "white";
                        boardTile.firstChild.textContent = "";
                    }

                    setTimeout(() => {
                        tile.style.transition = "";
                        tile.style.transform = "";
                        boardTile.appendChild(tile);

                        step++;
                        setTimeout(moveToBoard, 1000); // delay for the next move
                    }, 1000);
                }
            }

            moveToBoard();
        }

        // function to animate the word "DARE" being placed vertically on the board
        function animateWordDAREToBoard() {
            const dareLetters = ["D","A" ,"R", "E"];
            const rackTiles = [];
            
            dareLetters.forEach((_, index) => {
                rackTiles.push(document.getElementById(`tile-dare-${index}`));
            });

            let step = 0;

            function moveToBoard() {
                if (step < 5) {
                    const letter = dareLetters[step];
                    const row = 7 + step; // moves letters vertically starting from row 8
                    if (row === 8) {
                        step++;
                        setTimeout(moveToBoard, 1000); // delay for the next move
                        return;
                    }       
                     const col = 9; // A is in column 9 (same as 'A' in CAT)
                    const boardTile = document.getElementById(`${row},${col}`);
                    const tile = rackTiles[step];

                    // create animation
                    const tileRect = tile.getBoundingClientRect();
                    const boardTileRect = boardTile.getBoundingClientRect();
                    const deltaX = boardTileRect.left - tileRect.left;
                    const deltaY = boardTileRect.top - tileRect.top;

                    tile.style.transition = "transform 1s";
                    tile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

                    if (boardTile.style.backgroundColor === "lightblue") {
                        boardTile.style.backgroundColor = "white";
                        boardTile.firstChild.textContent = "";
                    }

                    setTimeout(() => {
                        tile.style.transition = "";
                        tile.style.transform = "";
                        boardTile.appendChild(tile);

                        step++;
                        setTimeout(moveToBoard, 1000); // delay for the next move
                    }, 1000);
                }
            }

            moveToBoard();
        }

        // function to remove played letters from rack
        function removePlayedLettersFromRack(letters) {
            letters.forEach((letter, index) => {
                const tile = document.getElementById(`tile-dare-${index}`);
                if (tile) tile.remove();
            });
        }

        // Generate board and rack
        genBoard(boardContainer);
        wordRack();

        // Animate the word "CAT" first, then animate "DARE"
        animateWordToBoard();
        setTimeout(animateWordDAREToBoard, 4000); // 4-second delay before animating "DARE"

