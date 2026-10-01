let mySound;
let isPlaying = false;
let fft;
let num = 100;
let obj = [];

let img;
function preload() {
  mySound = loadSound("music.mp3");
  img = loadImage("./images/IMG_1292.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  rectMode(CENTER);
  noStroke();
  mySound.amp(0.2);
  fft = new p5.FFT();

  for (let i = 0; i < num; i++) {
    obj.push({
      x: random(width),
      y: random(height),
    });
  }
}
function draw() {
  clear();
  if (!isPlaying) return;

  if (mySound.isPlaying()) {
    let waveform = fft.analyze();
    let len = Math.min(waveform.length, obj.length);
    for (let i = 0; i < len; i++) {
      let value = waveform[i];
      fill(random(270, 300), 100, 50, 0.5);
      let size = map(value, 0, 255, 40, 260);
      image(img, obj[i].x, obj[i].y, size, size);
    }
  }

  let speed;
  if (mouseY < windowHeight / 2) {
    speed = 1;
  } else {
    speed = 1.32;
  }

  mySound.rate(speed);
}

function keyReleased() {
  if (keyCode === 32) {
    isPlaying = false;
    mySound.stop();
  }
}
function keyPressed() {
  if (keyCode === 32) {
    isPlaying = true;
    mySound.loop();
  }
}
