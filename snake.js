import { config } from "./config/config.js";

export class Snake {
  snakeBody;
  snakeHeadElement;
  direction;
  container;
  apple;
  game;
  isPlaying;

  constructor(containerName) {
    this.container = document.getElementById(containerName);
    this.setUpGame();
  }

  move() {
    const dir = this.direction;
    var top = this.snakeHeadElement.offsetTop;
    var left = this.snakeHeadElement.offsetLeft;

    switch (dir) {
      case config.direction.up:
        top -= config.stepSize;
        this.snakeHeadElement.style.top = top + "px";
        break;
      case config.direction.down:
        top += config.stepSize;
        this.snakeHeadElement.style.top = top + "px";
        break;
      case config.direction.left:
        left -= config.stepSize;
        this.snakeHeadElement.style.left = left + "px";
        break;
      case config.direction.right:
        left += config.stepSize;
        this.snakeHeadElement.style.left = left + "px";
        break;
    }

    this.checkBorders();
    this.checkEatItself();
    this.checkEatApple();
  }

  checkEatItself() {
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      if (
        this.snakeBody[i].style.top ===
          this.snakeBody[this.snakeBody.length - 1].style.top &&
        this.snakeBody[i].style.left ===
          this.snakeBody[this.snakeBody.length - 1].style.left
      ) {
        this.pauseGame();
        this.setUpGame();
        alert("Game over");
        return;
      }
    }
  }

  checkBorders() {
    var top = this.snakeHeadElement.offsetTop;
    var left = this.snakeHeadElement.offsetLeft;

    if (
      left < 0 ||
      left >= config.boardSize ||
      top < 0 ||
      top >= config.boardSize
    ) {
      this.pauseGame();
      this.setUpGame();
      alert("Game over");
      return;
    }
  }

  checkEatApple() {
    if (
      this.snakeHeadElement.offsetLeft === this.apple.offsetLeft &&
      this.snakeHeadElement.offsetTop === this.apple.offsetTop
    ) {
      this.eat();
      this.renderApple();
    }
  }

  eat() {
    let square = document.createElement("div");
    square.classList.add("body-segment");
    this.container.appendChild(square);
    this.snakeBody.unshift(square);

    this.rerenderSnakeBody();
  }

  setUpGame() {
    this.snakeBody = [];

    this.direction = config.direction.right;

    this.container.innerHTML = "";

    this.snakeHeadElement = document.createElement("div");
    this.snakeHeadElement.setAttribute("id", "snake-head");
    this.snakeHeadElement.classList.add("body-segment");

    this.container.appendChild(this.snakeHeadElement);

    this.apple = document.createElement("div");
    this.apple.setAttribute("id", "apple");
    this.apple.classList.add("apple");
    this.container.appendChild(this.apple);

    this.snakeBody.unshift(this.snakeHeadElement);

    this.snakeHeadElement.style.top = 0 + "px";
    this.snakeHeadElement.style.left = 0 + "px";

    this.renderApple();
  }

  play() {
    this.isPlaying = true;
    this.game = setInterval(() => {
      this.rerenderSnakeBody();
      this.move();
    }, config.speed);
  }

  rerenderSnakeBody() {
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      this.snakeBody[i].style.top = this.snakeBody[i + 1].style.top;
      this.snakeBody[i].style.left = this.snakeBody[i + 1].style.left;
    }
  }

  pauseGame() {
    this.isPlaying = false;
    clearInterval(this.game);
  }

  renderApple() {
    const appleLeft = 20 * randomIntFromInterval(0, 19);
    const appleTop = 20 * randomIntFromInterval(0, 19);

    let isOnBody = false;
    for (let i = 0; i < this.snakeBody.length; i++) {
      if (
        this.snakeBody[i].offsetTop === appleTop &&
        this.snakeBody[i].offsetLeft === appleLeft
      ) {
        isOnBody = true;
        break;
      }
    }

    if (isOnBody) {
      this.renderApple();
    } else {
      this.apple.style.top = appleTop + "px";
      this.apple.style.left = appleLeft + "px";
    }
  }

  updateDirection(newDirection) {
    if (
      this.direction === config.direction.left &&
      newDirection === config.direction.right
    ) {
      return;
    }
    if (
      this.direction === config.direction.right &&
      newDirection === config.direction.left
    ) {
      return;
    }
    if (
      this.direction === config.direction.up &&
      newDirection === config.direction.down
    ) {
      return;
    }
    if (
      this.direction === config.direction.down &&
      newDirection === config.direction.up
    ) {
      return;
    }

    this.direction = newDirection;
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
