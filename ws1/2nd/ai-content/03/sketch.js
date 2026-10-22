const FIX_HUE = null;        // 色相: 0〜360 で固定、または null（全色ランダム）
const FIX_SATURATION = 85;   // 彩度: 0〜100 で固定、または null（白っぽさランダム）
const FIX_BRIGHTNESS = 95;   // 明度: 0〜100 で固定、または null（暗さランダム）
const FIX_ALPHA = 60;        // 透明度: 0〜100 で固定、または null（透け感ランダム）

function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    // カラーモードを HSB（H:0〜360, S:0〜100, B:0〜100, 透明度:0〜100）に設定
    colorMode(HSB, 360, 100, 100, 100);
    background(15); // 最初に一度だけ濃いダークグレーで塗る
    noStroke();     // 枠線なし
}

function draw() {
    //background(15, 10);

    // 画面のランダムな位置と大きさ
    let x = random(width);
    let y = random(height);
    let size = random(20, 90);

    // 1. 色相（Hue）: 指定があればその値、nullなら 0〜360 のランダム
    let h = (FIX_HUE !== null) ? FIX_HUE : random(360);

    // 2. 彩度（Saturation）: 指定があればその値、nullなら 0〜100 のランダム
    let s = (FIX_SATURATION !== null) ? FIX_SATURATION : random(100);

    // 3. 明度（Brightness）: 指定があればその値、nullなら 0〜100 のランダム
    let b = (FIX_BRIGHTNESS !== null) ? FIX_BRIGHTNESS : random(100);

    // 4. 透明度（Alpha）: 指定があればその値、nullなら 0〜100 のランダム
    let a = (FIX_ALPHA !== null) ? FIX_ALPHA : random(100);

    // 透明度 60% で重ねていくことで、重なり部分が美しく透ける
    translate(x, y);              // 2. 描きたい位置 (x, y) に原点をお引越し
    rotate(random(360));       // 3. 0〜360度 ランダムに回転
    fill(h, s, b, a);
    rect(0, 0, size, size);       // 4. 原点 (0, 0) に正方形を描く！
}