const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const starCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
infoDisplay.textContent = "Circle goes first";

//creating squre boxes by  https://www.youtube.com/watch?v=DRaWr0Dcbl0 time stamp 4:36
function createBoard() {
  starCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");

    //assigning and id to each cell element
    cellElement.id = index;
    //adding function addgo with event listener click
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

//CALL function board
createBoard();

//function for adding circle
function addGo(e) {
  //console.log(e.target);

  //create another div
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);

  //append to put something in the target squares
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "it is now " + go + "'s go.";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  //grab elements with a function of square
  const allSquares = document.querySelector(".square");
  //console.log(allSquares);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    //if circle wins
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      //grab all squres and to remove event listeners by using replacewith
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );

      return;
    }
  });
  //do thesame for Cross wins
  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      //grab all Cross and to remove event listeners by using replacewith
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );

      return;
    }
  });
}
