function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    // 最初に一度背景を塗る
    background(230, 80, 15);
}

function draw() {
    // 1. 技術要素：半透明の背景で「長い残像エフェクト」を表現（闇に光が溶け込む）
    background(230, 80, 15, 10);

    // 画面の中央を原点（基準点）に移動
    push();
    translate(width / 2, height / 2);

    // 2. 技術要素：sin() を使った呼吸のような全体的脈動（スケールがゆっくり往復）
    let pulse = sin(frameCount * 0.5); // -1から1の間をゆっくり往復
    let baseScale = map(pulse, -1, 1, 0.9, 1.15);
    scale(baseScale);

    // 複数の幾何学的なレイヤー（光の糸・霧の層）を重ねて描画
    let numLayers = 10;
    for (let i = 0; i < numLayers; i++) {
        push();

        // 3. 技術要素：noise() を使った軌跡の有機的な揺らぎ
        // 時間とインデックスをずらして、レイヤーごとに異なる不規則な回転角度を作る
        let noiseVal = noise(frameCount * 0.003 + i * 0.4);
        let rotAngle = map(noiseVal, 0, 1, -180, 180) + frameCount * 0.15;
        rotate(rotAngle);

        // 色彩パレットの割り当て（スレートグレー、ペールラベンダー、シャンパンゴールド）
        noFill();
        strokeWeight(1.2);

        if (i % 3 == 0) {
            // 薄く差し込むシャンパンゴールドの光
            stroke(45, 45, 90, 35);
        } else if (i % 3 == 1) {
            // 滲むようなペールラベンダー
            stroke(270, 30, 85, 25);
        } else {
            // 青みがかったスレートグレーの影
            stroke(215, 30, 45, 20);
        }

        // 幾何学的なサイズを計算（外側に向かって広がる）
        let baseW = 80 + i * 30;
        let baseH = 60 + i * 25;

        // noiseを使って、形自体も呼吸するように伸縮させる
        let sizeNoise = noise(frameCount * 0.008 + i * 10);
        let currentW = baseW * map(sizeNoise, 0, 1, 0.85, 1.15);
        let currentH = baseH * map(sizeNoise, 0, 1, 0.85, 1.15);

        // 4. 技術要素：push/pop と幾何学的配置（角丸の四角形を回転・配置）
        rect(0, 0, currentW, currentH, 25);

        pop();
    }

    pop();
}