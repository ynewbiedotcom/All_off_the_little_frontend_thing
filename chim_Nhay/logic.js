const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const heightDisplay = document.getElementById("height");
const startBtn = document.getElementById("start-btn");
const speedInput = document.getElementById("speed-input");
const applyBtn = document.getElementById("apply-btn");

let birdPosition = 200;
let birdGravity = 2;
let birdJump = 30;
let birdJumpDuration = 30;
let birdJumpFrame = 0;
let pipeSpeed = 2;
let pipes = [];
let score = 0;
let gameStarted = false;
let gameLoopId;

function jump() {
  birdJumpFrame = birdJumpDuration;
  birdPosition -= birdJump;
}

function createPipe() {
  const pipe = document.createElement("div");
  pipe.className = "pipe";
  pipe.style.left = "1000px";
  pipe.style.height =
    Math.random() * 0.7 * gameContainer.clientHeight + 50 + "px";
  gameContainer.appendChild(pipe);
  pipes.push(pipe);
}

function updatePipes() {
  pipes.forEach((pipe, index) => {
    const pipeRect = pipe.getBoundingClientRect();
    const birdRect = bird.getBoundingClientRect();

    pipe.style.left = parseInt(pipe.style.left) - pipeSpeed + "px";

    // Remove pipes that are out of the game container
    if (pipeRect.right < 0) {
      gameContainer.removeChild(pipe);
      pipes.splice(index, 1);
    }

    // Check for collision with the bird
    if (
      birdRect.left < pipeRect.right &&
      birdRect.right > pipeRect.left &&
      (birdRect.bottom > pipeRect.top || birdRect.top < pipeRect.bottom)
    ) {
      gameOver();
    }
  });

  if (
    pipes.length === 0 ||
    parseInt(pipes[pipes.length - 1].style.left) < 600
  ) {
    createPipe();
  }
}
let wxx = 0;
function updateBirdPosition() {
  birdJumpFrame -= 1;
  if (birdJumpFrame <= 0) {
    birdGravity += 2;
  }

  birdPosition += birdGravity;
  bird.style.top = birdPosition + "px";
  heightDisplay.textContent = "Height: " + birdPosition;

  if (
    birdPosition < 0 ||
    birdPosition > gameContainer.clientHeight - bird.clientHeight
  ) {
    gameOver();
  }
}

function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
}

function gameOver() {
  alert("Game Over! Your score: " + score);
  clearInterval(gameLoopId);
  location.reload();
}

function gameLoop() {
  updatePipes();
  updateBirdPosition();
  updateScore();
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startBtn.style.display = "none";
    birdPosition = 200;
    birdGravity = 2;
    birdJump = 30;
    birdJumpDuration = 30;
    birdJumpFrame = 0;
    pipeSpeed = 2;
    pipes = [];
    score = 0;
    gameLoopId = setInterval(gameLoop, 100);
    jump();
  }
}

const pipeSpeedInput = document.getElementById("pipe-speed-input");

function checkCollision() {
  const birdRect = bird.getBoundingClientRect();
  pipes.forEach((pipe, index) => {
    const pipeRect = pipe.getBoundingClientRect();

    if (
      birdRect.left < pipeRect.right &&
      birdRect.right > pipeRect.left &&
      (birdRect.bottom > pipeRect.top || birdRect.top < pipeRect.bottom)
    ) {
      gameOver();
    }
  });
}

function updatePipeSpeed() {
  pipeSpeed = parseInt(pipeSpeedInput.value);
}

applyBtn.addEventListener("click", function () {
  updatePipeSpeed();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

startBtn.addEventListener("click", startGame);

applyBtn.addEventListener("click", function () {
  pipeSpeed = parseInt(speedInput.value);
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});
