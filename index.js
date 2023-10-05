let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
//get all box elements using array.from, instead of being and htmlcollection, it will  be an array with 9 elements
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
//creating X and 0
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

//use this to fill clicked boxes with null so it won't overlap
let spaces = Array(9).fill(null);

//start Game
const startGame = () => {
  //event listener for box clicks
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};
//function to check if it's a tie
function isTie() {
  return spaces.every((space) => space !== null);
}

//function to handleGameResult()
function handleGameResult() {
  if (playerHasWon()) {
    const winning_blocks = playerHasWon();
    playerText.innerHTML = `${currentPlayer} has won!`;
    winning_blocks.map(
      (box) => (boxes[box].style.backgroundColor = winnerIndicator)
    );

    //Remove event listener so the player cannot click anymore boxes after winning
    boxes.forEach((box) => box.removeEventListener("click", boxClicked));
    //call tie
  } else if (isTie()) {
    playerText.innerHTML = "It's a Tie!";
  }
}
//function for box clicks
function boxClicked(e) {
  const id = e.target.id;
  //if this space is equal to null, it will continue to fill
  if (!spaces[id]) {
    //fill null spaces with current, either equal to X or O
    spaces[id] = currentPlayer;
    //change the value to currentPlayer
    e.target.innerText = currentPlayer;

    //Check for game result (tie or win)
    handleGameResult();

    //if no one has won, switch to the next
    if (!playerHasWon()) {
      currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
  }
}
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

//loop winning combination
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

//reset game with reset button
restartBtn.addEventListener("click", restart);
//function to clear out spaces array and make it null again
function restart() {
  spaces.fill(null);
  //resetting button to clear text
  boxes.forEach((box) => {
    box.innerText = "";
    //resetting box shadow style when
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "TIC TAC TOE";
  currentPlayer = X_TEXT;

  //call startgame again to return event listener that was removed
  startGame();
}

startGame();
