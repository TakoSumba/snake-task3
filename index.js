import {Snake} from "./snake.js"

const snake = new Snake("container");

var pauseButton = document.getElementById("pause");
var playButton = document.getElementById("play");

pauseButton.onclick = function (event) {
  snake.pauseGame();
};

playButton.onclick = function (event) {
  if (snake.isPlaying) {
    return;
  } else {
    snake.play();
  }
};

document.addEventListener("keydown", (e) => {
  snake.updateDirection(e.keyCode);
});
