function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
    // =========================================================
    // 1. 深い闇に溶け込む長い残像エフェクト
    // =========================================================
    // 深いインディゴ（色相:230, 彩度:80, 明度:15）を透明度10%で毎フレーム重ねる
    background(40, 80, 15, 10);

    // =========================================================
    // パートA：真夜中の静寂（中央でゆっくり呼吸する幾何学の波紋）
    // =========================================================
    push();
    // 画面の中央へ基準点を移動
    translate(width / 2, height / 2);

    // 2. sin() を使った呼吸のような脈動（度数法なので 360度 で1周期）
    // -1 〜 1 の波を作り、scale用の 0.85 〜 1.15 の範囲に変換する
    let centerBreath = map(sin(frameCount * 1.2), -1, 1, 0.85, 1.15);
    scale(centerBreath);

    // 全体を時計回りに少しずつ回転させる
    rotate(frameCount * 0.2);

    // 30度ずつ12方向に幾何学的な線と微光を配置（0〜360度）
    for (let angle = 0; angle < 360; angle += 30) {
        push();
        rotate(angle);

        // 3. noise() を使って中心からの距離を有機的に揺らがせる
        let waveOffset = noise(angle * 0.1, frameCount * 0.008) * 60;
        let radius = 70 + waveOffset;

        // 静かなシアンの微光（細い線と小さな四角形）
        stroke(195, 70, 80, 18);
        strokeWeight(1);
        line(30, 0, radius, 0);

        // 先端で回転する小さな幾何学の欠片
        translate(radius, 0);
        rotate(frameCount * 1.5 + angle);
        noFill();
        stroke(195, 60, 95, 30);
        rect(0, 0, 8, 8);
        pop();
    }
    pop();

    // =========================================================
    // パートB：水底から昇る「思考の泡」と微光
    // =========================================================
    let bubbleCount = 20; // 泡の数

    for (let i = 0; i < bubbleCount; i++) {
        // --- 動きの計算 ---
        // 泡ごとに少しずつ違う上昇スピードを設定
        let speed = 0.4 + (i % 5) * 0.15;
        // 画面の下（height + 50）から上（-50）へ繰り返し昇るY座標
        let totalHeight = height + 100;
        let y = height + 50 - ((frameCount * speed + i * 65) % totalHeight);

        // 3. noise() を使った軌跡の有機的な揺らぎ（水流のような左右の揺れ）
        // i ごとに異なるノイズの道筋を通り、時間（frameCount）で少しずつ変化する
        let n = noise(i * 10, frameCount * 0.004);
        let x = map(n, 0, 1, 40, width - 40);

        // 2. sin() を使った呼吸のような脈動（泡ごとの膨張と明滅）
        // i * 45 を足すことで、すべての泡が同じタイミングで膨らまないようにずらす
        let wave = sin(frameCount * 2 + i * 45);
        let bubbleScale = map(wave, -1, 1, 0.6, 1.3); // 大きさの往復
        let alpha = map(wave, -1, 1, 66, 55);         // 透明度の往復

        // --- 色彩パレットの選択 ---
        // 4つに1つは温もりのある「アンバー（琥珀色: 38）」、それ以外は孤独感のある「シアン（195）」
        let isAmber = (i % 4 === 0);
        let h = isAmber ? 99 : 195;
        let s = isAmber ? 85 : 99;
        let b = isAmber ? 23 : 95;

        // --- 4. push() / pop() と座標変換による描画 ---
        push();
        translate(x, y);                        // 泡の現在地へ移動
        rotate(frameCount * 0.8 + i * 30);      // ゆっくりと回転
        scale(bubbleScale);                     // 呼吸のように拡大・縮小

        // ① 外側の淡い光の輪（泡の輪郭）
        noFill();
        stroke(h, s, b, alpha * 0.7);
        strokeWeight(1.2);
        circle(0, 0, 26);

        // ② 内側に浮かぶ幾何学の結晶（傾いた四角形）
        stroke(h, s - 33, b, alpha);
        strokeWeight(0.8);
        rotate(45); // 45度傾けてひし形にする
        rect(0, 0, 77, 12);

        // ③ 中心に瞬くコア（微光）
        noStroke();
        fill(h, s - 30, 8, alpha * 1.3);
        circle(0, 0, 5);

        pop();
    }
}