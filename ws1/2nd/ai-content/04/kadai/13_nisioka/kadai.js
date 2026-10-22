function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);                 // 角度は度数法（0〜360度）
    colorMode(HSB, 360, 100, 100, 100); // 色彩はHSBモード
}
function draw() {
    // ========================================
    // 1. 背景：深い闇と長い残像
    // ========================================

    // 背景を完全に消さず、半透明の色を重ねることで残像を作る
    // アルファ値を小さくすると、軌跡が長く残る
    background(230, 80, 5, 20);


    // ========================================
    // 2. 時間と呼吸のリズム
    // ========================================

    // フレーム数を時間として利用する
    let t = frameCount * 0.6;

    // sin() を使って、ゆっくりとした呼吸のリズムを作る
    // 値が -1 ～ 1 の間を往復する
    let breath = sin(t);

    // 呼吸に合わせて透明度を変化させる
    let glowAlpha = map(breath, -1, 1, 20, 70);

    // 呼吸に合わせて大きさを変化させる
    let pulseScale = map(breath, -1, 1, 0.85, 1.15);


    // ========================================
    // 3. 水底から昇る思考の泡
    // ========================================

    // 泡を複数配置して、それぞれ異なる動きを与える
    for (let i = 0; i < 18; i++) {

        // 泡ごとに異なる速度を設定する
        let speed = 2 + (i % 5) * 0.12;

        // 泡が画面下から上へ移動する
        let y = height - ((frameCount * speed + i * 73) % (height + 80));

        // noise() を使って、水流のような左右の揺らぎを作る
        let noiseX = noise(i * 10, frameCount * 0.006);

        // noise() の値を画面の左右方向に変換する
        let x = map(noiseX, 0, 1, 70, width - 70);

        // 泡ごとに大きさを変える
        let bubbleSize = 8 + (i % 4) * 5;

        // 泡ごとに色を変える
        // 交互にシアンとアンバーを使用する
        let hueValue;

        if (i % 3 === 0) {
            hueValue = 38;  // アンバー（琥珀色）
        } else {
            hueValue = 185; // シアン（水色）
        }

        // 泡ごとの呼吸のタイミングを少しずらす
        let localBreath = sin(t + i * 25);

        // 呼吸に合わせて泡の大きさを変化させる
        let localScale = map(localBreath, -1, 1, 0.8, 1.2);

        // 泡の透明度も呼吸に合わせて変化させる
        let localAlpha = map(localBreath, -1, 1, 20, 65);


        // ----------------------------------------
        // 泡の描画
        // ----------------------------------------

        push();

        // 泡の位置へ移動する
        translate(x, y);

        // 少しずつ回転させる
        rotate(frameCount * 0.2 + i * 17);

        // 泡の大きさを呼吸に合わせて変える
        scale(localScale);

        // 輪郭だけの円を描く
        noFill();
        stroke(hueValue, 55, 100, localAlpha);
        strokeWeight(1.2);

        circle(0, 0, bubbleSize);

        // 円の内側に小さな光を配置する
        noStroke();
        fill(hueValue, 30, 100, localAlpha * 0.5);

        circle(
            bubbleSize * 0.15,
            -bubbleSize * 0.15,
            bubbleSize * 0.25
        );

        // 描画設定を元に戻す
        pop();
    }


    // ========================================
    // 4. 中央の思考の核
    // ========================================

    // キャンバス中央に、ゆっくり脈動する光を作る
    push();

    translate(width / 2, height / 2);

    // 中央の光も呼吸するように拡大・縮小する
    scale(pulseScale);

    // 時間とともにゆっくり回転させる
    rotate(frameCount * 0.15);

    // 中心に大きな円を描く
    noFill();
    stroke(185, 45, 100, glowAlpha);
    strokeWeight(1);

    circle(0, 0, 70);

    // ----------------------------------------
    // 中心を囲む幾何学模様
    // ----------------------------------------

    // ひし形を重ねて、思考が広がるような印象にする
    for (let i = 0; i < 4; i++) {

        push();

        // 角度をずらしながら配置する
        rotate(i * 45);

        // ひし形を描く
        noFill();
        stroke(38, 45, 100, glowAlpha * 0.7);
        strokeWeight(1);

        beginShape();
        vertex(0, -45);
        vertex(22, 0);
        vertex(0, 45);
        vertex(-22, 0);
        endShape(CLOSE);

        pop();
    }

    // 中心に小さなアンバーの光を置く
    noStroke();
    fill(38, 40, 100, glowAlpha);

    circle(0, 0, 8);

    pop();


    // ========================================
    // 5. 水底から広がる波紋
    // ========================================

    // 画面下部から、ゆっくり広がる波紋を描く
    for (let i = 0; i < 5; i++) {

        // 波紋が少しずつ広がる
        let waveSize = (frameCount * 0.8 + i * 90) % 450;

        // 大きさに応じて透明度を下げる
        let waveAlpha = map(waveSize, 0, 450, 35, 0);

        push();

        // 波紋の中心を画面下部に置く
        translate(width / 2, height + 20);

        // 波紋を描く
        noFill();
        stroke(185, 40, 90, waveAlpha);
        strokeWeight(1);

        // 横長の楕円にすることで、水面を思わせる波紋にする
        ellipse(0, 0, waveSize * 1.5, waveSize * 0.35);

        pop();
    }
}