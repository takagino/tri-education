function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
    // 背景を薄く重ねて、残像を作る
    background(35, 8, 100, 5);

    let t = frameCount;

    // 呼吸するようなゆっくりした動き
    let breath = (sin(t * 0.8) + 1) / 2;

    // 画面の中心を基準にする
    translate(width / 2, height / 2);

    // 画面全体に広がる柔らかな色
    for (let i = 0; i < 65; i++) {
        push();

        // 自然な揺らぎを作る
        let n1 = noise(i * 0.15, t * 0.003);
        let n2 = noise(i * 0.15 + 50, t * 0.003);

        // 画面全体に色を配置する
        let baseX = (i % 9) * 75 - 300;
        let baseY = floor(i / 9) * 65 - 225;

        let x = baseX + sin(t * 0.2 + i * 30) * 35
            + (n1 - 0.5) * 60;

        let y = baseY + cos(t * 0.18 + i * 25) * 30
            + (n2 - 0.5) * 60;

        translate(x, y);

        // 回転もゆっくりにする
        rotate(sin(t * 0.15 + i * 20) * 10);

        // 丸みのある楕円にする
        let w = 90 + (i % 5) * 30 + breath * 15;
        let h = 70 + (i % 4) * 25 + breath * 10;

        noStroke();

        // 暖かい色を半透明で重ねる
        if (i % 3 === 0) {
            fill(35, 30, 100, 10);
        } else if (i % 3 === 1) {
            fill(350, 20, 100, 9);
        } else {
            fill(25, 35, 100, 10);
        }

        ellipse(0, 0, w, h);

        pop();
    }
}