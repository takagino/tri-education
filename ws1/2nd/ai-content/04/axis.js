function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
    textAlign(CENTER, CENTER);
    textSize(12);
}

function draw() {
    background(20); // 濃いダークグレー

    // ① 原点を移動
    //translate(100, 100);

    // ② 原点を軸に回転
    //rotate(45);

    // ③ 原点を中心に拡大・縮小
    //scale(2);

    // ❌ 問題例：for文の中でそのまま座標変換を使うと累積してしまう
    for (let i = 0; i < 5; i++) {
        translate(width / 2, height / 2); // 1回目はwidth/2、2回目はさらにwidth/2）...と累積！
        rotate(random(360));
        rect(0, 0, 100, 100);
    }
}

// ---------------------------------------------------
// 座標系（グリッド線とXY軸）を可視化するヘルパー関数
// ---------------------------------------------------
function drawGrid() {
    strokeWeight(1);

    // 方眼のグリッド線
    stroke(0, 0, 25);
    let gridSize = 40;
    for (let x = -300; x <= 300; x += gridSize) {
        line(x, -300, x, 300);
    }
    for (let y = -300; y <= 300; y += gridSize) {
        line(-300, y, 300, y);
    }

    // X軸
    stroke(0, 80, 100);
    strokeWeight(2);
    line(-260, 0, 260, 0);
    fill(0, 80, 100);
    noStroke();
    text("+X", 275, 0);

    // Y軸
    stroke(120, 80, 100);
    strokeWeight(2);
    line(0, -260, 0, 260);
    fill(120, 80, 100);
    noStroke();
    text("+Y", 0, 275);
}