let currentPlayer = 'X';
let moves = ['','','','','','','','',''];// This is used to keep track of the state of the game board.
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const restartBtn = document.getElementById('restartBtn');
const resultAlert = document.getElementById('resultAlert');

function checkWinner(){       // This is a pattern that will make either X or O player to win 
     const winConditions = [
        [0,1,2],
        [4,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,8],
     ];
    
     for(let condition of winConditions){
        const [a, b, c] = condition;
        if(moves[a] && moves[a] === moves[b] && moves[a] === moves[c]){
            return moves[a];
        }
     }
       if(moves.every(move => move !== '')){
        return 'draw';
       }
       return null;
}
function handleClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (moves[cellIndex] === '') {
      moves[cellIndex] = currentPlayer;    // Assigns the current player's symbol to the cell 
      event.target.textContent = currentPlayer;  // Displays the symbol (X or O) in the clicked cell.

      const winner = checkWinner();      // It will check the winner 
      if (winner) {
        if (winner === 'draw') {
          resultAlert.textContent = 'It\'s a draw!';
        } else {
          resultAlert.textContent = `Player ${winner} wins!`;
        }
        resultAlert.style.display = 'block';
        cells.forEach(cell => {
          cell.removeEventListener('click', handleClick);
        });
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `It's ${currentPlayer}'s turn`;
      }
    }
  }
// This function is used to reset the game everything goes back to intial start up state.
  function restartGame() {
    currentPlayer = 'X';
    moves = ['', '', '', '', '', '', '', '', ''];
    turnDisplay.textContent = `It's ${currentPlayer}'s turn`;
    resultAlert.style.display = 'none';
    cells.forEach(cell => {
      cell.textContent = '';
      cell.addEventListener('click', handleClick);
    });
  }
/*This allows players to make the moves by clicking on the individual
 cells , and a event listener to it. */

  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
// it is responsible for restting the game state , it has event listener to it. 
  restartBtn.addEventListener('click', restartGame);