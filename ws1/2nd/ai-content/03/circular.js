let charImg;

async function setup() {
    createCanvas(640, 480);
    rectMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
    imageMode(CENTER); // 画像の中心を基準座標 (x, y) にする

    // 同じフォルダに保存したローカル画像を読み込む（完了まで待機）
    charImg = await loadImage('character.png');
}

function draw() {
    background(30); // 毎フレーム背景を上書きして、前フレームの絵を消す

    let speed = 1;       // 行き来のスピード（数値を大きくすると速くなる）
    let amplitude = 200;    // 左右に揺れる幅（中心から片道200px）

    // sin() は -1.0 〜 +1.0 をなめらかに往復する
    let wave = sin(frameCount * speed);

    // パターンA：中心座標に (wave * 振り幅) を足し引きする（おすすめ！）
    let x = width / 2 + wave * amplitude;

    // ※パターンB：map() 関数を使う書き方でも同じことができます
    // let x = map(wave, -1, 1, width / 2 - amplitude, width / 2 + amplitude);

    let y = height / 2; // Y座標は画面中央に固定

    image(charImg, x, y, 100, 100);
}