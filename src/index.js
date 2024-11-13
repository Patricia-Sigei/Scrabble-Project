const moves = document.getElementById("moves");
const row = document.getElementById("row");
let currentLetterIndex = 0; 
let intervalId = null; 
function createSpan(r, c, letter = '') {
    const span = document.createElement("span");
    span.id = `${r},${c}`; 
    span.textContent = letter;
    return span;
}

function genBoard() {
    const bonusPoints = {
        DL: ["4,1", "12,1", "7,3", "9,3", "8,4", "15,4", "3,7", "7,7", "9,7", "13,7", "4,8", "12,8", "3,9", "7,9", "9,9", "13,9", "1,12", "8,12", "15,12", "7,13", "9,13", "4,15", "12,15"],
        TW: ["1,1", "8,1", "15,1", "1,8", "15,8", "1,15", "8,15", "15,15"],
        DW: ["2,2", "14,2", "3,3", "13,3", "4,4", "12,4", "5,5", "11,5", "5,11", "11,11", "4,12", "12,12", "3,13", "13,13", "2,14", "14,14"],
        TL: ["6,2", "10,2", "2,6", "6,6", "10,6", "14,6", "2,10", "6,10", "10,10", "14,10", "6,14", "10,14"]
    };

    for (let r = 1; r < 16; r++) {
        const boardRow = document.createElement("div");
        boardRow.style.display = "flex";

        for (let c = 1; c < 16; c++) {
            const col = document.createElement("div");
            col.classList.add("tile");

            // Bonus points coloring logic
            if (bonusPoints.DL.includes(`${r},${c}`)) {
                col.style.backgroundColor = "lightblue";
                col.textContent = "DL";
            } else if (bonusPoints.DW.includes(`${r},${c}`)) {
                col.style.backgroundColor = "pink";
                col.textContent = "DW";
            } else if (bonusPoints.TL.includes(`${r},${c}`)) {
                col.style.backgroundColor = "royalblue";
                col.textContent = "TL";
            } else if (bonusPoints.TW.includes(`${r},${c}`)) {
                col.style.backgroundColor = "red";
                col.textContent = "TW";
            } else {
                col.style.backgroundColor = "beige";
            }

            col.id = `${r},${c}`;
            boardRow.appendChild(col);
        }
        moves.appendChild(boardRow);
    }
}

// Function to move a letter from the rack to the board
function moveLetterToBoard(letter, targetRow, targetCol) {
    const tile = document.getElementById(`${targetRow},${targetCol}`);
    if (tile) {
        const newSpan = createSpan(targetRow, targetCol, letter);
        tile.appendChild(newSpan);
        removeFromRow(letter); // Remove the letter from the rack
    }
}

// Function to move a letter back to the rack
function moveLetterBackToRow(letter) {
    const column = document.createElement("div");
    column.classList.add("column");
    column.textContent = letter;
    row.appendChild(column);
}

// Function to remove a letter from the row
function removeFromRow(letter) {
    const rackLetter = Array.from(row.children).find(column => column.textContent.trim() === letter);
    if (rackLetter) {
        rackLetter.remove(); 
    }
}

// Array of predefined positions (row, column) for each letter of the word "CAT"
const targetPositions = [
    { row: 8, col: 8 },  // C
    { row: 8, col: 9 },  // A
    { row: 8, col: 10 }  // T
];

// Function to automate the movement of letters to specific positions
function autoMoveLetters() {
    const letters = ['C', 'A', 'T']; // Define the target letters explicitly
    if (currentLetterIndex < letters.length) {
        const letter = letters[currentLetterIndex];
        const { row: targetRow, col: targetCol } = targetPositions[currentLetterIndex];

        // Move the letter to its specific row and column
        moveLetterToBoard(letter, targetRow, targetCol);
        currentLetterIndex++;
    } else {
        // All letters have been moved, wait before removing them from the board
        setTimeout(() => {
            removeAllLettersFromBoard(letters);
        }, 3000); // Wait for 3 seconds after placing the last letter
    }
}

// Function to remove all letters from the board
function removeAllLettersFromBoard(letters) {
    targetPositions.forEach((pos, index) => {
        const { row: targetRow, col: targetCol } = pos;
        const tile = document.getElementById(`${targetRow},${targetCol}`);
        if (tile) {
            const span = tile.querySelector("span");
            if (span) {
                const letter = span.textContent;
                span.remove(); // Remove letter from the board
                moveLetterBackToRow(letter); // Move it back to the rack
            }
        }
    });

    // Reset the current letter index for the next cycle
    currentLetterIndex = 0;
}

// Start the automatic movement of letters
function startAutoMovement() {
    intervalId = setInterval(() => {
        autoMoveLetters();
    }, 1000); // Move each letter every 1 second
}

// Generate the board
genBoard();

// Populate the row (rack) with the letters "C", "A", and "T" along with some other letters
const letters = ['C', 'A', 'T', 'D', 'G', 'O', 'S', 'I', 'F', 'W'];
for (let i = 0; i < letters.length; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    column.textContent = letters[i];
    row.appendChild(column);
}

// Start automatic movement
startAutoMovement();
