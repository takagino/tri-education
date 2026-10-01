function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 20);
  colorMode(HSL);
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
}

let x = 0;
let y = 0;
let c = 0;
let d = 0;

function draw() {
  translate(mouseX, mouseY);
  rotate(floor(random(0, 360)));
  scale(10);
  // x = mouseX;
  // y = mouseY;
  c = floor(random(0, 100));
  d = floor(random(10, 100));

  fill(180, 50, c, 0.3);

  if (mouseIsPressed) {
    rect(x, y, d, d);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    clear();
  }
}
