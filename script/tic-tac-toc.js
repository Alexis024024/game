document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-btn');
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const ticTacToeContainer = document.getElementById('tic-tac-toe-container');
    const winnerDisplay = document.getElementById('winner');

    let player1, player2;
    let currentPlayer;
    let gameBoard;
    let gameActive;

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        player1 = document.getElementById('player1-name').value.trim();
        player2 = document.getElementById('player2-name').value.trim();
        if (player1 && player2) {
            startGame();
        }
    });

    resetButton.addEventListener('click', resetGame);

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function startGame() {
        loginContainer.classList.add('hide');
        ticTacToeContainer.classList.remove('hide');
        currentPlayer = player1;
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        resetButton.classList.add('hide');
        winnerDisplay.textContent = '';
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (gameBoard[index] !== '' || !gameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer === player1 ? 'X' : 'O';

        if (checkWinner()) {
            gameActive = false;
            winnerDisplay.textContent = `¡${currentPlayer} gana!`;
            resetButton.classList.remove('hide');
        } else if (!gameBoard.includes('')) {
            gameActive = false;
            winnerDisplay.textContent = '¡Es un empate!';
            resetButton.classList.remove('hide');
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        startGame();
    }
});
