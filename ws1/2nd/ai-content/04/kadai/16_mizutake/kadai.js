const FIX_HUE = null;
const FIX_SATURATION = 90;
const FIX_BRIGHTNESS = 99;
const FIX_ALPHA = 20;

function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);

    colorMode(HSB, 360, 100, 100, 100);
    background("#fff4ff");
    noStroke();
}

function draw() {

    let x = noise(frameCount * 0.03) * width;
    let y = noise(frameCount * 0.03 + 100) * height;
    let size = map(noise(frameCount * 0.04), 0, 1, 20, 90);

    let h = (FIX_HUE !== null) ? FIX_HUE : random(360);

    let s = (FIX_SATURATION !== null) ? FIX_SATURATION : random(100);

    let b = (FIX_BRIGHTNESS !== null) ? FIX_BRIGHTNESS : random(100);

    let a = (FIX_ALPHA !== null) ? FIX_ALPHA : random(100);


    translate(x, y);
    rotate(random(360));
    rect(0, 0, size, size);
    fill(h, s, b, a);
    rect(x, y, size, size);

    fill(h, s, b, a * 0.3);
    ellipse(0, 0, size * 1.8, size * 1.8);
}