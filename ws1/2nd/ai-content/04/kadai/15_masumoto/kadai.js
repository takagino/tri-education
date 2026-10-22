const FIX_HUE = null;
const FIX_SATURATION = null;
const FIX_BRIGHTNESS = 80;
const FIX_ALPHA = 70;

function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    colorMode(HSB, 360, 100, 100, 100);
    background(60, 80, 90);
}

function draw() {
    // 残像を残しつつ、背景をうっすら上書き
    background(220, 80, 15, 20);

    // ★ 1フレームに描く数を「8個」に増やし、隙間を減らす
    for (let i = 0; i < 6; i++) {
        let x = random(width);
        let y = random(height);

        // ★ サイズを全体的に大きめ（40〜130）にして、画面にみっちり詰まるようにする
        let size = random(40, 110);

        // 先ほどの綺麗なトーン（水色〜青・青紫）の範囲で色をランダムにする
        let h = (FIX_HUE !== null) ? FIX_HUE : random(130, 230);
        let s = (FIX_SATURATION !== null) ? FIX_SATURATION : random(60, 100);
        let b = (FIX_BRIGHTNESS !== null) ? FIX_BRIGHTNESS : random(100);
        let a = (FIX_ALPHA !== null) ? FIX_ALPHA : random(100);

        // 面の四角 と 枠線だけの四角 をランダムに切り替え
        if (random() > 0.3) {
            // 面の四角
            fill(h, s, b, a);
            noStroke();
            rect(x, y, size, size);
        } else {
            // 枠線だけの四角（幾何学的なアクセント）
            noFill();
            stroke(h, s, 100, a + 20);
            strokeWeight(random(1, 3));
            rect(x, y, size, size);
        }
    }
}