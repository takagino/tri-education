// ============================================================
// LaserFan（ステージの奥から放たれる扇形レーザー）
// 1か所から何本ものレーザー光線が扇のように広がり、
// 左右にスイープ（首振り）するライブ会場のレーザーショーです。
// 中音が強いほど扇が大きく開き、明るく速く動きます。
//
// 使い方：
//   new LaserFan(x, y)    … (x, y) からレーザーを出す（ステージ奥の地平線に置くのがおすすめ）
//   laser.update(val)     … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothMid）
//   laser.render()        … 描画する
// ============================================================
class LaserFan {
    constructor(x, y) {
        // レーザーの発射位置
        this.x = x;
        this.y = y;

        // ステージの奥（地平線）から、上と外側に向けて放つ
        // （中央のレーザーは真上、左のものは左上、右のものは右上を向く）
        this.baseAngle = atan2(-height * 0.6, (x - width / 2) * 1.5);

        // サイバーパンクらしい色（シアン・緑・マゼンタ）
        this.hue = random([170, 140, 310]);

        // レーザーの本数と長さ
        this.count = floor(random(7, 13));
        this.length = max(width, height) * 1.5;

        // 首振り（スイープ）用の値
        this.phase = random(360);
        this.sweepSpeed = random(0.8, 1.5);
        this.sweep = 0;

        // 扇の開き具合（角度）
        this.spread = 10;

        this.val = 0;
    }

    update(val) {
        this.val = val;

        // ① 扇の開き具合：音が強いほど大きく開く（10度 〜 80度）
        this.spread = lerp(this.spread, 10 + val * 70, 0.2);

        // ② 首振り：音が強いほど速くスイープする
        this.phase += this.sweepSpeed * (1 + val * 4);
        this.sweep = sin(this.phase) * 25;
    }

    render() {
        // 音が小さいときはレーザーを消す（ライブの「静かなパート」の演出）
        if (this.val < 0.1) return;

        push();
        translate(this.x, this.y);
        rotate(this.baseAngle + this.sweep); // 扇全体の向き
        blendMode(ADD);                      // 光を足し算で重ねる

        let a = map(this.val, 0.1, 1, 10, 90); // 音が強いほど明るい

        for (let i = 0; i < this.count; i++) {
            // 1本ずつ、扇の左端から右端まで角度をずらす
            let ang = map(i, 0, this.count - 1, -this.spread / 2, this.spread / 2);
            let h = (this.hue + i * 4) % 360; // 少しずつ色をずらす

            push();
            rotate(ang);

            // 外側の光（太くて薄い）
            stroke(h, 90, 100, a * 0.2);
            strokeWeight(6);
            line(0, 0, this.length, 0);

            // 芯（細くて明るい）
            stroke(h, 40, 100, a);
            strokeWeight(1.5);
            line(0, 0, this.length, 0);
            pop();
        }

        // 発射口の光
        noStroke();
        fill(this.hue, 40, 100, a);
        circle(0, 0, 12 + this.val * 12);

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }
}
