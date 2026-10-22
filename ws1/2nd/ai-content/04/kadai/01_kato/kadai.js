const FIX_HUE = 330;
const FIX_SATURATION = null;
const FIX_BRIGHTNESS = 90;
const FIX_ALPHA = 60;

function setup() {
    createCanvas(600, 400);
    colorMode(HSB, 360, 100, 100, 100);
    background(13);
    noStroke();
}

function draw() {
    // 位置と大きさをランダムに決める
    let x = random(width);
    let y = random(height);
    let size = random(20, 90);

    // 色を決める
    let h = FIX_HUE !== null ? FIX_HUE : random(360);
    let s = FIX_SATURATION !== null ? FIX_SATURATION : random(100);
    let b = FIX_BRIGHTNESS !== null ? FIX_BRIGHTNESS : random(100);
    let a = FIX_ALPHA !== null ? FIX_ALPHA : random(100);

    fill(h, s, b, a);

    // ハートを描く
    push();
    translate(x, y);
    scale(size / 30);

    beginShape();

    // 数式でハートの輪郭を作る
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
        let heartX = 16 * pow(sin(angle), 3);
        let heartY = -(13 * cos(angle)
            - 5 * cos(2 * angle)
            - 2 * cos(3 * angle)
            - cos(4 * angle));

        vertex(heartX, heartY);
    }

    endShape(CLOSE);

    pop();
}