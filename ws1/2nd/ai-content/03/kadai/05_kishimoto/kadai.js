function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  background(232, 38, 7);
}

function draw() {
  background(232, 38, 7, 13);
  let t = frameCount * 0.35;
  push();
  translate(width / 2, height / 2);
  let beat = frameCount % 240;
  let pulse1 = exp(-pow((beat - 15) / 5, 2));
  let pulse2 = exp(-pow((beat - 35) / 7, 2));
  let breathing = sin(t * 0.35) * 0.025;
  let heartbeat = pulse1 * 0.09 + pulse2 * 0.14;
  scale(1 + breathing + heartbeat);
  rotate(sin(t * 0.22) * 3);
  for (let layer = 0; layer < 5; layer++) {
    let hue = 185 + layer * 21;
    for (let line = 0; line < 14; line++) {
      let offset = line * 2.8;
      noFill();
      stroke(hue, 48, 100, 9);
      strokeWeight(line % 5 === 0 ? 1.2 : 0.45);
      beginShape();
      for (let x = -350; x <= 350; x += 7) {
        let n = noise(x * 0.004 + layer * 2, line * 0.045 + t * 0.006);
        let wave =
          sin(x * 0.45 + t + layer * 38) * 24 + cos(x * 0.18 - t * 0.7) * 35;
        let y = wave + (n - 0.5) * 125 + offset + layer * 12 - 70;
        vertex(x, y);
      }
      endShape();
    }
  }
}
