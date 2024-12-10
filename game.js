let gameSequence = [];
let playerSequence = [];
let score = 0;
let gameStarted = false;

const colors = ['green', 'red', 'yellow', 'blue'];
const colorToButton = {
  green: document.getElementById('green'),
  red: document.getElementById('red'),
  yellow: document.getElementById('yellow'),
  blue: document.getElementById('blue')
};

document.getElementById('startBtn').addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
  if (!gameStarted) return;
  const color = mapKeyToColor(e.key);
  if (color) playerMove(color);
});

for (let color of colors) {
  colorToButton[color].addEventListener('click', () => playerMove(color));
}

function startGame() {
  score = 0;
  gameSequence = [];
  playerSequence = [];
  gameStarted = true;
  document.getElementById('scoreDisplay').textContent = 'Score: 0';
  nextRound();
}

function nextRound() {
  playerSequence = [];
  gameSequence.push(colors[Math.floor(Math.random() * colors.length)]);
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function flashButton(color) {
  const button = colorToButton[color];
  button.style.opacity = 0.5;
  setTimeout(() => button.style.opacity = 1, 500);
}

function playerMove(color) {
  if (!gameStarted) return;

  playerSequence.push(color);
  flashButton(color);

  const currentRound = playerSequence.length - 1;

  if (playerSequence[currentRound] !== gameSequence[currentRound]) {
    alert('Game Over! Final Score: ' + score);
    gameStarted = false;
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    score++;
    document.getElementById('scoreDisplay').textContent = 'Score: ' + score;
    setTimeout(nextRound, 1000);
  }
}

function mapKeyToColor(key) {
  switch (key.toLowerCase()) {
    case 'g': return 'green';
    case 'r': return 'red';
    case 'y': return 'yellow';
    case 'b': return 'blue';
    default: return null;
  }
}
