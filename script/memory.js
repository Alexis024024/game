// Constantes y variables globales
const cardValues = ['uno', 'dos', 'tres', 'cuatro', 'boon']; // Nombres de las imágenes (5 cartas, incluyendo la especial)
let cards = []; // Array para almacenar las cartas del juego
let flippedCards = []; // Array para almacenar las cartas volteadas temporalmente
let matchedCards = []; // Array para almacenar las cartas emparejadas
let score = 0; // Puntaje del jugador
let playerName = ''; // Nombre del jugador
let gameStarted = false; // Bandera para indicar si el juego ha iniciado
let startTime, endTime; // Variables para medir el tiempo

// Elementos del DOM
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const memoryContainer = document.getElementById('memory-container');

// Elementos de audio
const music1 = document.getElementById('music1');
const music2 = document.getElementById('music2');
const music3 = document.getElementById('music3');

// Evento para manejar el envío del formulario de inicio de sesión
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    playerName = document.getElementById('player-name').value.trim();
    startMemoryGame();
});

// Función para iniciar el juego de memoria
function startMemoryGame() {
    loginContainer.classList.add('hide');
    memoryContainer.classList.remove('hide');
    score = 0;
    scoreDisplay.textContent = `Puntaje: ${score}`;
    matchedCards = [];
    createGameBoard();
    startTimer();
    playMusic();
}

// Función para crear el tablero del juego
function createGameBoard() {
    shuffleCards();
    gameBoard.innerHTML = '';
    cards.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">
                <img src="../images/${cardValue}.png" alt="${cardValue}">
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para voltear la carta
function flipCard() {
    if (!gameStarted) {
        gameStarted = true;
        startTime = new Date();
        playMusic();
    }
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
        if (this.dataset.value === 'boon') {
            endGame();
        }
    }
}

// Función para verificar si las cartas volteadas coinciden
function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    if (card1.dataset.value === card2.dataset.value) {
        score += 10;
        scoreDisplay.textContent = `Puntaje: ${score}`;
        matchedCards.push(card1, card2);
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

// Función para verificar si se completó el juego
function checkWin() {
    if (matchedCards.length === cards.length - 1) { // Excluyendo la tarjeta boon
        endGame();
    }
}

// Función para guardar el puntaje del jugador (simulación, ajustar según se necesite)
function saveScore(playerName, score, timeTaken) {
    // Aquí puedes implementar la lógica para guardar el puntaje en una tabla o base de datos
    console.log(`Guardando puntaje de ${playerName}: ${score} puntos en ${timeTaken} segundos`);
}

// Función para reiniciar el juego
function restartGame() {
    gameStarted = false;
    startTime = null;
    endTime = null;
    createGameBoard();
    resetTimer();
}

// Función para finalizar el juego
function endGame() {
    endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // Convertir a segundos
    saveScore(playerName, score, timeTaken);
    playMusic3();
    alert(`¡Juego terminado! Has ${matchedCards.length === cards.length - 1 ? 'encontrado todos los pares y' : 'encontrado la imagen Boon y'} tu puntaje es ${score}.`);
    restartGame();
}

// Función para iniciar el temporizador
function startTimer() {
    let seconds = 0;
    timerDisplay.textContent = 'Tiempo: 0s';
    setInterval(() => {
        if (gameStarted) {
            seconds++;
            timerDisplay.textContent = `Tiempo: ${seconds}s`;
        }
    }, 1000);
}

// Función para reiniciar el temporizador
function resetTimer() {
    timerDisplay.textContent = 'Tiempo: 0s';
}

// Función para mezclar las cartas aleatoriamente
function shuffleCards() {
    const pairs = cardValues.slice(0, 4).reduce((acc, val) => acc.concat([val, val]), []); // Crear pares de las primeras 4 cartas
    const shuffledValues = [...pairs, cardValues[4]].sort(() => Math.random() - 0.5); // Mezclar valores y agregar la carta especial
    cards = shuffledValues;
}

// Función para reproducir la música
function playMusic() {
    music1.play();
    music2.pause();
    music3.pause();
}

// Evento para manejar el clic en el botón de reinicio y la música
restartBtn.addEventListener('click', restartGame);

// Llamar a playMusic al inicio del juego
playMusic();
