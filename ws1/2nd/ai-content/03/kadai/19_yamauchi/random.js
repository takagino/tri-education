let stars = [];
let nebulaClouds = [];

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < 180; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.7, 2.8),
      phase: random(360)
    });
  }

  for (let i = 0; i < 24; i++) {
    nebulaClouds.push({
      x: random(width),
      y: random(height),
      width: random(80, 210),
      height: random(30, 100),
      hue: random([195, 220, 275, 315]),
      phase: random(360)
    });
  }
}

function draw() {
  background(235, 72, 9);
  drawNebula();
  drawStars();
  drawShootingStar();

  push();
  translate(width / 2, height / 2);
  drawAtmosphere();
  drawOrbit(150, 0.7, 190, 70);
  drawOrbit(112, -1.1, 285, 80);
  drawSingularity();
  pop();

  drawCaption();
}

function drawNebula() {
  noStroke();
  for (const cloud of nebulaClouds) {
    const drift = noise(cloud.x * 0.01, frameCount * 0.004) * 18 - 9;
    const pulse = 0.85 + sin(frameCount * 0.6 + cloud.phase) * 0.15;

    fill(cloud.hue, 80, 78, 3);
    ellipse(cloud.x + drift, cloud.y, cloud.width * pulse, cloud.height * pulse);
    fill(cloud.hue + 18, 62, 95, 2);
    ellipse(cloud.x - drift, cloud.y, cloud.width * 0.62, cloud.height * 0.58);
  }
}

function drawStars() {
  noStroke();
  for (const star of stars) {
    const twinkle = map(sin(frameCount * 1.4 + star.phase), -1, 1, 20, 90);
    fill(195, 15, 100, twinkle);
    circle(star.x, star.y, star.size);

    if (star.size > 2.3) {
      stroke(195, 12, 100, twinkle * 0.55);
      strokeWeight(0.7);
      line(star.x - 4, star.y, star.x + 4, star.y);
      line(star.x, star.y - 4, star.x, star.y + 4);
      noStroke();
    }
  }
}

function drawShootingStar() {
  const cycle = frameCount % 240;
  if (cycle > 90 && cycle < 110) {
    const progress = (cycle - 90) / 20;
    const x = lerp(90, 300, progress);
    const y = lerp(35, 145, progress);
    const alpha = sin(progress * 180) * 85;

    stroke(195, 12, 100, alpha);
    strokeWeight(2);
    line(x, y, x - 34, y - 18);
    noStroke();
    fill(195, 10, 100, alpha);
    circle(x, y, 4);
  }
}

function drawAtmosphere() {
  noStroke();
  for (let i = 7; i >= 1; i--) {
    fill(190, 75, 75, 2.5);
    circle(0, 0, i * 48);
  }

  noFill();
  stroke(185, 55, 80, 18);
  strokeWeight(1);
  circle(0, 0, 210);
  circle(0, 0, 310);
}

function drawOrbit(radius, speed, hue, tilt) {
  push();
  rotate(tilt + frameCount * speed * 0.12);
  noFill();
  stroke(hue, 65, 95, 48);
  strokeWeight(1);
  ellipse(0, 0, radius * 2, radius * 0.72);

  const angle = frameCount * speed + tilt;
  const x = cos(angle) * radius;
  const y = sin(angle) * radius * 0.36;

  noStroke();
  fill(hue, 60, 100, 18);
  circle(x, y, 22);
  fill(hue, 35, 100, 95);
  circle(x, y, 6);
  pop();
}

function drawSingularity() {
  const pulse = 1 + sin(frameCount * 1.3) * 0.035;

  push();
  rotate(frameCount * 0.12);

  for (let i = 0; i < 7; i++) {
    const radius = (62 + i * 14) * pulse;
    const sides = i % 2 === 0 ? 12 : 6;
    const shimmer = map(sin(frameCount + i * 35), -1, 1, 32, 78);

    push();
    rotate(i % 2 === 0 ? 0 : 15 + sin(frameCount * 0.35) * 4);
    noFill();
    stroke(185 + i * 14, 65, 100, shimmer);
    strokeWeight(i === 3 ? 1.5 : 0.8);
    drawPolygon(radius, sides);
    pop();
  }

  for (let i = 0; i < 24; i++) {
    const angle = i * 15;
    const innerRadius = 58 * pulse;
    const outerRadius = 148 * pulse;
    const x1 = cos(angle) * innerRadius;
    const y1 = sin(angle) * innerRadius;
    const x2 = cos(angle) * outerRadius;
    const y2 = sin(angle) * outerRadius;

    stroke(190, 55, 100, i % 2 === 0 ? 38 : 18);
    strokeWeight(i % 3 === 0 ? 1 : 0.6);
    line(x1, y1, x2, y2);

    noStroke();
    fill(185 + (i % 5) * 18, 45, 100, 82);
    circle(x2, y2, i % 3 === 0 ? 3 : 1.7);
  }
  pop();

  noStroke();
  fill(275, 80, 100, 10);
  circle(0, 0, 66 * pulse);
  fill(230, 50, 5, 100);
  circle(0, 0, 42 * pulse);

  push();
  rotate(-frameCount * 0.2);
  noFill();
  stroke(190, 25, 100, 78);
  strokeWeight(1.2);
  drawPolygon(48 * pulse, 6);
  pop();
}

function drawPolygon(radius, sides) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    const angle = (360 / sides) * i;
    vertex(cos(angle) * radius, sin(angle) * radius);
  }
  endShape(CLOSE);
}

function drawCaption() {
  noStroke();
  fill(190, 24, 90, 75);
  textAlign(LEFT, CENTER);
  textSize(10);
  textFont("monospace");
  text("NOCTILUCA  /  01", 24, height - 28);

  textAlign(RIGHT, CENTER);
  fill(190, 18, 85, 55);
  text("A LIVING ORBIT", width - 24, height - 28);
}
