function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
    background(0, 0, 10);

    let r = random(0, 1);
    let n = noise(frameCount * 0.01);

    // コンソールに数値を表示（小数点以下3桁に揃えて比較）
    console.log("random:", r.toFixed(3), " | noise:", n.toFixed(3));
}