// class NoteCircle {
//     constructor(hue, speed, size) {
//         // 画面中央からスタート
//         this.x = width / 2;
//         this.y = height / 2;

//         // 飛び出す角度（0〜360度）をランダムに決める
//         let angle = random(360);

//         // 角度とスピードから、X方向・Y方向の移動量（速度ベクトル）を計算
//         this.vx = cos(angle) * speed;
//         this.vy = sin(angle) * speed;

//         this.size = size;       // 円のサイズ
//         this.hue = hue;       // 色相（0〜360）
//         this.lifespan = 100;  // 寿命（100で出現し、0になると消滅する）
//         this.fadeSpeed = 1.5; // 寿命が減っていく速さ
//     }

//     // 毎フレームの座標移動と寿命の更新
//     update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.lifespan -= this.fadeSpeed; // 寿命を少しずつ減らす
//     }

//     // 描画処理
//     render() {
//         push();
//         translate(this.x, this.y);
//         noStroke();

//         // 寿命（100〜0）に合わせて、円のサイズを this.size から 0 へ徐々に小さくする
//         let currentSize = map(this.lifespan, 100, 0, this.size, 0);

//         // 寿命（lifespan: 100〜0）をそのまま透明度（Alpha）として使う
//         fill(this.hue, 80, 100, this.lifespan);
//         circle(0, 0, currentSize);
//         pop();
//     }

//     // 寿命が尽きたかどうかを判定するメソッド
//     isDead() {
//         return this.lifespan <= 0;
//     }
// }


/**
 * NoteCircle.js
 * p5.js用ビジュアルエフェクトクラス
 *
 * コンセプト：調和振り子（Harmonograph / リサージュ曲線）による幾何学的なワイヤーフレームWeb。
 * キーボードを押した瞬間に画面中央から出現し、周波数比が時間とともに滑らかに変化しながら
 * 複雑で魅力的な光の幾何学模様が外側へと広がり、徐々に消滅していきます。
 */
/**
 * NoteCircle.js - Bioluminescent Fireflies Effect
 */
/**
 * NoteCircle.js - Neon Lightning Laser Effect
 */
/**
 * NoteCircle.js - Triple-Ring Shockwave Effect
 */
/**
 * NoteCircle.js - Spiral Vortex Effect
 */
/**
 * NoteCircle.js
 * p5.js用ビジュアルエフェクトクラス
 *
 * コンセプト：調和振り子（Harmonograph / リサージュ曲線）による幾何学的なワイヤーフレームWeb。
 * キーボードを押した瞬間に画面中央から出現し、周波数比が時間とともに滑らかに変化しながら
 * 複雑で魅力的な光の幾何学模様が外側へと広がり、徐々に消滅していきます。
 */
class NoteCircle {
    /**
     * コンストラクタ：初期状態のセットアップ
     * @param {number} hue - 音階に応じた色相 (0〜330)
     * @param {number} speed - 拡大速度や周波数変化のスピード (2.5〜11.0)
     * @param {number} size - 描画される振幅・スケールの基準値 (35〜110)
     */
    constructor(hue, speed, size) {
        // 1. 発生位置（必須仕様：画面中央）
        this.x = width / 2;
        this.y = height / 2;

        // 2. 引数データの保持
        this.baseHue = hue;
        this.speed = speed;
        this.baseSize = size;

        // 3. 寿命（必須仕様：100からスタート）
        this.lifespan = 100;

        // 4. ハーモノグラフ（調和振り子）用のパラメーター初期設定
        this.scale = 0;                          // 出現時のスケール（0から拡大）
        this.rotation = random(360);             // 発生ごとのランダムな初期回転角
        this.rotSpeed = random(-1.5, 1.5);       // 全体の回転速度

        // X軸・Y軸それぞれの周波数比率（ランダムな整数比＋微小なズレで複雑な波形を生成）
        this.freqX = floor(random(1, 5));
        this.freqY = floor(random(1, 5));
        // 発生ごとに周波数が被らないように調整
        if (this.freqX === this.freqY) {
            this.freqY += 0.5;
        }

        // 周波数を時間経過で滑らかに変化させるための位相・変調速度
        this.phase = random(360);
        this.phaseSpeed = map(this.speed, 2.5, 11.0, 1.0, 3.0); // speed引数を位相変化に反映

        // 描画する解像度（幾何学曲線を形成する頂点の数）
        this.numPoints = 180;
    }

    /**
     * 状態更新処理
     * 毎フレームの拡大、周波数・位相の変化、寿命の減衰を行います。
     */
    update() {
        // スケールを speed に応じて外側へ広げる
        let targetScale = map(this.speed, 2.5, 11.0, 1.2, 3.0);
        this.scale = lerp(this.scale, targetScale, 0.05);

        // 位相を進めて曲線を変形・モーフィングさせる
        this.phase += this.phaseSpeed;

        // 全체를ゆったりと回転させる
        this.rotation += this.rotSpeed;

        // 寿命を減衰させる（フェードアウト）
        this.lifespan -= 1.2;
    }

    /**
     * 描画処理
     * 三角関数（sin, cos）による媒介変数表示を用いてハーモノグラフ曲線を描画します。
     */
    render() {
        push();
        // 描画の基準点をパーティクルの現在位置（画面中央）に移動
        translate(this.x, this.y);
        rotate(this.rotation);

        // 線のみでワイヤーフレームを表現
        noFill();

        // 幾何学網目模様の描画（複数の位相レイヤーを重ねて奥行きを演出）
        for (let layer = 0; layer < 3; layer++) {
            beginShape();
            for (let i = 0; i <= this.numPoints; i++) {
                // angleMode(DEGREES) 前提での角度計算
                let t = map(i, 0, this.numPoints, 0, 360);

                // 調和振り子の媒介変数方程式（リサージュ図形の応用）
                let rad = this.baseSize * this.scale;
                let layerOffset = layer * 15; // レイヤーごとの位相のズレ

                let posX = sin(t * this.freqX + this.phase + layerOffset) * cos(t * 0.5) * rad;
                let posY = cos(t * this.freqY + layerOffset) * sin(t * 0.5) * rad;

                // 線上でHSBカラーを循環させる
                let currentHue = (this.baseHue + map(i, 0, this.numPoints, 0, 90) + layer * 20) % 360;

                // 色相・彩度・明度・透明度（lifespanに連動）
                stroke(currentHue, 80, 100, this.lifespan * 0.7);
                strokeWeight(map(this.lifespan, 100, 0, 2.0, 0.5));

                vertex(posX, posY);
            }
            endShape(CLOSE);
        }

        pop();
    }

    /**
     * 寿命判定（必須仕様）
     * @returns {boolean} 寿命が0以下になったらtrue
     */
    isDead() {
        return this.lifespan <= 0;
    }
}