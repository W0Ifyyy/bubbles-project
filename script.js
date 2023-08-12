var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// c.fillStyle = "rgba(255, 0 , 0, 0.5";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5";
// c.fillRect(300, 300, 100, 100);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "red";
// c.stroke();

// Arc / Circle
// function zmiana() {
//   for (var i = 0; i < 10; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);

// var blue = Math.random() * 245;
// var red = Math.random() * 245;
// var green = Math.random() * 245;
// c.strokeStyle = "rgba(" + blue + "," + red + "," + green + ")";
// c.stroke();
//   }
// }

// zmiana();

// var header = document.getElementById("header");
// var iks = innerWidth / 2;
// var igrek = innerHeight / 2;
// header.innerHTML =
//   '<div id="header" style="position:  absolute; top: ' +
//   igrek +
//   "px; left: " +
//   iks +
//   'px">Bubbles</div><canvas></canvas>';

var maxRadius = 50;
var minRadius = 5;

var colorArray = ["#3370A6", "#04BF68", "#592202", "#D93D04", "#F2845C"];

var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.dx = dx;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();

    this.update = function () {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      // Interakcja
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  };
  this.draw();
}

var circleArray = [];

function init() {
  circleArray = [];
  for (var i = 0; i < 1200; i++) {
    var radius = Math.random() * 5 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = Math.random() - 0.5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
    var circle = new Circle(200, 200, 3, 3, 30);
  }
}
// var x = Math.random() * innerWidth;
// var dx = (Math.random() - 0.5) * 8;
// var radius = 30;
// var y = Math.random() * innerHeight;
// var dy = (Math.random() - 0.5) * 8;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
init();

// position
