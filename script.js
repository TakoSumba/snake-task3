window.onload = function () {
  var block = document.getElementById("block");
  var container = document.getElementById("container");
  var apple = document.createElement("div");
  apple.setAttribute("id", "apple");
  apple.classList.add("apple");
  container.appendChild(apple);
  
  renderApple();

  block.style.top = 0 + "px";
  block.style.left = 0 + "px";

  document.addEventListener("keydown", (e) => {
    var direction = e.keyCode;
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
      console.log("gagvekcaa");
    }
    console.log("top");
    console.log("left", block.offsetLeft);

    if(block.offsetLeft===apple.offsetLeft && block.offsetTop===apple.offsetTop){
      renderApple();
    }
  });

//   setInterval(() => {
    
//   }, 3000);
// };

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function renderApple(){
  const appleLeft = 20 * randomIntFromInterval(0, 19);
    const appleTop = 20 * randomIntFromInterval(0, 19);
   
    apple.style.top = appleTop + "px";
    apple.style.left = appleLeft + "px";
}


}