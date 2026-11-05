// ============================================================
// StageLight（ライブ会場のムービングライト）
// 天井につるされた照明から光のビームが降り注ぎ、
// 奥の床に楕円形の光だまりを作りながら首を振るクラスです。
// 低音（キック）に合わせてビームが太く明るくなり、
// ドンッと鳴った瞬間にストロボのように光ります。
//
// 使い方：
//   new StageLight(x, y)   … (x, y) に照明を1台つける（画面の上端に並べるのがおすすめ）
//   light.update(val)      … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothBass）
//   light.render()         … 描画する
// ============================================================
class StageLight {
    constructor(x, y) {
        // 照明の位置
        this.x = x;
        this.y = y;

        // サイバーパンクらしい色（シアン・青・紫・マゼンタ）
        this.hue = random([180, 200, 270, 300, 320]);

        // 光が当たる床の位置（奥の床：地平線とブースのあいだ）
        this.floorY = random(height * 0.42, height * 0.56);
        this.targetX = x;

        // 首振り：左右にどれくらい振るか（ピクセル）
        this.swing = random(width * 0.08, width * 0.2);
        this.phase = random(360);           // 首振りのタイミングを照明ごとにずらす
        this.swingSpeed = random(0.6, 1.2); // 首振りの速さ

        // ビームの太さ（床での半分の幅）
        this.beamW = 20;

        // 音の状態
        this.val = 0;
        this.prevVal = 0;
        this.strobe = 0; // ストロボの明るさ（キックの瞬間に 100 → 0 に減っていく）
    }

    update(val) {
        this.val = val;

        // ① 首振り：音が強いほど速く振る
        this.phase += this.swingSpeed * (1 + val * 3);
        this.targetX = this.x + sin(this.phase) * this.swing;

        // ② ビームの太さ：音が強いほど太くなる
        this.beamW = lerp(this.beamW, width * (0.015 + val * 0.04), 0.3);

        // ③ キックの瞬間にストロボを光らせる
        if (val - this.prevVal > 0.04 && val > 0.4) {
            this.strobe = 100;
        }
        this.strobe *= 0.8;

        this.prevVal = val;
    }

    render() {
        push();
        translate(this.x, this.y);
        blendMode(ADD); // 光を足し算で重ねる

        // 照明から見た、床の当たる位置
        let tx = this.targetX - this.x;
        let ty = this.floorY - this.y;

        // 明るさ：ふだんはうっすら、音が強いほど明るく、ストロボでさらに明るく
        let a = 5 + this.val * 15 + this.strobe * 0.12;

        // 光の円すい：「広くて薄い → 狭くて明るい」と3枚重ねて、中心が明るいビームにする
        noStroke();
        for (let k = 3; k >= 1; k--) {
            let w = this.beamW * k / 3;
            fill(this.hue, 70 - k * 10, 100, a);
            quad(-3, 0, 3, 0, tx + w, ty, tx - w, ty);
        }

        // 床の光だまり（床を斜めから見ているので、つぶれた楕円にする）
        for (let k = 3; k >= 1; k--) {
            let w = this.beamW * 2.2 * k / 3;
            fill(this.hue, 60, 100, a * 1.2);
            ellipse(tx, ty, w * 2, w * 0.45);
        }

        // 照明本体（光っている丸いレンズ）
        fill(this.hue, 30, 100, 60 + this.val * 40 + this.strobe * 0.4);
        circle(0, 0, 18 + this.val * 10);
        fill(this.hue, 80, 100, 20 + this.strobe * 0.3);
        circle(0, 0, 50 + this.val * 30);

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }
}
