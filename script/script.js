function loadGame(gameUrl) {
    playClickSound();
    document.getElementById('game-frame').src = gameUrl;
}

function playClickSound() {
    const audio = new Audio('../audio/click.mp3');
    audio.play();
}
