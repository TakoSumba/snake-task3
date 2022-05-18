var snakeBody;
var snakeHeadElement;
var direction;
var container = document.getElementById("container");
var apple;
var game;

startGame();
play();

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
    case 38:
      top -= 20;
      snakeHeadElement.style.top = top + "px";
      break;
    case 40:
      top += 20;
      snakeHeadElement.style.top = top + "px";
      break;
    case 37:
      left -= 20;
      snakeHeadElement.style.left = left + "px";
      break;
    case 39:
      left += 20;
      snakeHeadElement.style.left = left + "px";
      break;
  }
  if (left < 0 || left >= 400 || top < 0 || top >= 400) {
    // alert('you lost')
  }

  if (
    snakeHeadElement.offsetLeft === apple.offsetLeft &&
    snakeHeadElement.offsetTop === apple.offsetTop
  ) {
    renderApple();

    let square = document.createElement("div");
    square.classList.add("new-segment");
    container.appendChild(square);
    snakeBody.unshift(square);
  }
  for (let i = 0; i < snakeBody.length - 1; i++) {
    if (
      snakeBody[i].style.top === snakeBody[snakeBody.length - 1].style.top &&
      snakeBody[i].style.left === snakeBody[snakeBody.length - 1].style.left
    ) {
      ///////tamashi gavacherot
    }
  }
}

function startGame() {
  snakeBody = [];

  container.innerHTML = "";

  snakeHeadElement = document.createElement("div");
  snakeHeadElement.setAttribute("id", "block");
  snakeHeadElement.classList.add("block-section");

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
    move(direction);
    rerenderSnakeBody();
  }, 150);
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
