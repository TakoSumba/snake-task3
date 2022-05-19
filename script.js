import { config } from "./config/config.js";

var snakeBody;
var snakeHeadElement;
var direction;
var container = document.getElementById("container");
var apple;
var game;
var pauseButton = document.getElementById("pause");
var playButton = document.getElementById("play");
var isClicked = false;

pauseButton.onclick = function (event) {
  isClicked = false;
  pauseGame();
};

playButton.onclick = function (event) {
  if (isClicked == true) {
    return;
  } else {
    isClicked = true;
  }
  direction = 39;
  play();
};

setUpGame();
// play();

document.addEventListener("keydown", (e) => {
  const newDirection = e.keyCode;
  if (direction === 37 && newDirection === 39) {
    return;
  }
  if (direction === 39 && newDirection === 37) {
    return;
  }
  if (direction === 38 && newDirection === 40) {
    return;
  }
  if (direction === 40 && newDirection === 38) {
    return;
  }

  direction = newDirection;
});

function move(dir) {
  var top = snakeHeadElement.offsetTop;
  var left = snakeHeadElement.offsetLeft;

  switch (dir) {
    case config.direction.up:
      top -= config.stepSize;
      snakeHeadElement.style.top = top + "px";
      break;
    case config.direction.down:
      top += config.stepSize;
      snakeHeadElement.style.top = top + "px";
      break;
    case config.direction.left:
      left -= config.stepSize;
      snakeHeadElement.style.left = left + "px";
      break;
    case config.direction.right:
      left += config.stepSize;
      snakeHeadElement.style.left = left + "px";
      break;
  }
  if (
    left < 0 ||
    left >= config.boardSize ||
    top < 0 ||
    top >= config.boardSize
  ) {
    pauseGame();
    isClicked = false;
    setUpGame();
    alert("Game over");
  }

  for (let i = 0; i < snakeBody.length - 1; i++) {
    if (
      snakeBody[i].style.top === snakeBody[snakeBody.length - 1].style.top &&
      snakeBody[i].style.left === snakeBody[snakeBody.length - 1].style.left
    ) {
      pauseGame();
      setUpGame();
      alert("Game over");
    }
  }

  if (
    snakeHeadElement.offsetLeft === apple.offsetLeft &&
    snakeHeadElement.offsetTop === apple.offsetTop
  ) {
    eat();
    renderApple();
  }
}

function eat() {
  let square = document.createElement("div");
  square.classList.add("body-segment");  
  container.appendChild(square);
  snakeBody.unshift(square);

  rerenderSnakeBody();
}

function setUpGame() {
  snakeBody = [];

  container.innerHTML = "";

  snakeHeadElement = document.createElement("div");
  snakeHeadElement.setAttribute("id", "snake-head");
  snakeHeadElement.classList.add("body-segment");

  container.appendChild(snakeHeadElement);

  apple = document.createElement("div");
  apple.setAttribute("id", "apple");
  apple.classList.add("apple");
  container.appendChild(apple);

  snakeBody.unshift(snakeHeadElement);

  snakeHeadElement.style.top = 0 + "px";
  snakeHeadElement.style.left = 0 + "px";

  renderApple();
}

function play() {
  game = setInterval(() => {
    rerenderSnakeBody();
    move(direction);
  }, config.speed);
}

function rerenderSnakeBody() {
  for (let i = 0; i < snakeBody.length - 1; i++) {
    snakeBody[i].style.top = snakeBody[i + 1].style.top;
    snakeBody[i].style.left = snakeBody[i + 1].style.left;
  }
}

function pauseGame() {
  clearInterval(game);
}
function renderApple() {
  const appleLeft = 20 * randomIntFromInterval(0, 19);
  const appleTop = 20 * randomIntFromInterval(0, 19);

  apple.style.top = appleTop + "px";
  apple.style.left = appleLeft + "px";
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
