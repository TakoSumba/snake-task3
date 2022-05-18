window.onload = function () {
  var snakeBody = [];
  var block = document.getElementById("block");
  snakeBody.unshift(block);
  var container = document.getElementById("container");
  var apple = document.createElement("div");
  apple.setAttribute("id", "apple");
  apple.classList.add("apple");
  container.appendChild(apple);

  var direction;
  renderApple();

  block.style.top = 0 + "px";
  block.style.left = 0 + "px";

  setInterval(() => {
    move(direction);
    rerenderSnakeBody();
  }, 150);

  document.addEventListener("keydown", (e) => {
    direction = e.keyCode;
  });

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function renderApple() {
    const appleLeft = 20 * randomIntFromInterval(0, 19);
    const appleTop = 20 * randomIntFromInterval(0, 19);

    apple.style.top = appleTop + "px";
    apple.style.left = appleLeft + "px";
  }

  function move(direction) {

    var top = block.offsetTop;
    var left = block.offsetLeft;

    switch (direction) {
      case 38:
        top -= 20;
        block.style.top = top + "px";
        break;
      case 40:
        top += 20;
        block.style.top = top + "px";
        break;
      case 37:
        left -= 20;
        block.style.left = left + "px";
        break;
      case 39:
        left += 20;
        block.style.left = left + "px";
        break;
    }
    if (left < 0 || left >= 400 || top < 0 || top >= 400) {
    }

    if (
      block.offsetLeft === apple.offsetLeft &&
      block.offsetTop === apple.offsetTop
    ) {
      renderApple();

      let square = document.createElement("div");
      square.classList.add("new-segment");
      container.appendChild(square);
      snakeBody.unshift(square);
    }
  }
  function rerenderSnakeBody(){
    for(let i=0;i<snakeBody.length-1;i++){
      snakeBody[i].style.top=snakeBody[i+1].style.top;
      snakeBody[i].style.left=snakeBody[i+1].style.left;
    }
  }
};
