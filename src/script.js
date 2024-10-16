const board = document.getElementById("board");
function genBoard() {
    let specialTiles={
        TW: ["1,1","1,8","1,15","8,1","8,15","15,1","15,8","15,15"],
        DW: ["2,2","2,14","3,3","3,13","4,4","4,12","5,5","5,11","8,8","11,5","11,11","12,4","12,12","13,3","13,13","14,2","14,14"],
        TL:["2,6", "2,10", "6,2", "6,6", "6,10", "6,14", "10,2", "10,6", "10,10", "10,14", "14,6", "14,10"],
        DL:["1,4","1,12", "3,7", "3,9", "4,1", "4,8", "4,15", "7,3","7,7","7,9", "7,13", "8,4", "8,12", "9,3", "9,7", "9,9", "9,13", "12,1", "12,8", "12,15","13,7","13,9", "15,4", "15,12"]
    }

}

  for (let r = 1; r < 16; r++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    for (let c = 1; c < 16; c++) {
      const col = document.createElement("div");
      let tileName=document.createElement("p");
      tileName.style.color="black";
        col.appendChild(tileName);
      if (specialTiles.DW.includes(`${r},${c}`)) {
        col.style.backgroundColor = "orange";
        tileName.textContent="DW";
    
      }
      
      else if (specialTiles.TW.includes(`${r},${c}`)) {
        col.style.backgroundColor = "red";
        tileName.textContent="TW";
      }
      else if (specialTiles.DL.includes(`${r},${c}`)) {
        col.style.backgroundColor = "lightblue";
        tileName.textContent="DL";
      }
      else if (specialTiles.TL.includes(`${r},${c}`)) {
        col.style.backgroundColor = "blue";
        tileName.textContent="TL";
      }
        else {
            col.style.backgroundColor = "white";
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
    // Loop to generate rows and columns
  for (let r = 1; r < 16; r++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    
    for (let c = 1; c < 16; c++) {
      const col = document.createElement("div");
      let tileName = document.createElement("p");
      tileName.style.color = "black";
      col.appendChild(tileName);

      // Apply special tile colors and labels
      if (specialTiles.dws.includes(`${r},${c}`)) {
        col.style.backgroundColor = "orange";
        tileName.textContent = "DW";
      }
    }
}
