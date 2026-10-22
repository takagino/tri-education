
let stars = [];

function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
    randomSeed(24);
    noiseSeed(24);
    for (let i = 0; i < 220; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(0.5, 1.5),
            hue: random([185, 205, 235, 265, 300, 40]),
            phase: random(360),
            speed: random(0.5, 1.4),
            glow: random() > 0.9
        });
    }
    background(235, 45, 5);
}

function draw() {
    background(235, 45, 5, 28);

    let t = frameCount * 0.4;
    noStroke();

    for (let s of stars) {
        let blink = (sin(frameCount * 12 + s.phase) + 1) / 2;
        let alpha = blink > 0.65 ? 100 : 5;
        let size = s.size * map(blink, 0, 1, 0.7, 1.2);
        if (s.glow) {
            fill(s.hue, 45, 100, alpha * 0.12);
            circle(s.x, s.y, size * 5);
        }
        fill(s.hue, 20, 100, alpha);
        circle(s.x, s.y, size);
    }
    push();
    translate(width / 2, height / 2);
    rotate(-2);

    for (let layer = 0; layer < 42; layer++) {
        let points = [];
        let offset = map(layer, 0, 41, -48, 48);

        for (let x = -width / 2 - 5; x <= width / 2 + 5; x += 3) {
            let n = noise(
                x * 0.004,
                layer * 0.07,
                t * 0.003
            );

            let wave =
                sin(x * 0.85 + t * 0.7 + layer * 5) * 9 +
                sin(x * 0.35 - t * 0.5 + layer * 8) * 5 +
                cos(x * 0.18 + t * 0.3 + layer * 3) * 4;

            let y = offset + wave + (n - 0.5) * 22;
            points.push({ x: x, y: y });
        }
        let hue = map(layer, 0, 41, 185, 275);
        noFill();
        stroke(hue, 45, 85, 7);
        strokeWeight(2);
        beginShape();
        for (let p of points) {
            vertex(p.x, p.y);
        }
        endShape();
        stroke(hue, 30, 90, 30);
        strokeWeight(0.3);

        beginShape();
        for (let p of points) {
            vertex(p.x, p.y);
        }
        endShape();
    }

    pop();
}
