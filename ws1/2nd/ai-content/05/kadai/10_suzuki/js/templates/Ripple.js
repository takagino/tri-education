// ============================================================
// Ripple（サイバーパンク風・デジタル波紋リング）
// 点線（セグメント）でできたネオンの輪が、回りながら広がっては
// 中心に戻る、をくり返す部品です。
// 高音が強いと速く回り、セグメントがガタガタ震えます（デジタルノイズ風）。
//
// 使い方：
//   new Ripple(x, y)     … (x, y) を中心に1個作る
//   ripple.update(val)   … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothTreble）
//   ripple.render()      … 描画する
// ============================================================
class Ripple {
    constructor(x, y) {
        this.x = x;                         // 中心のX座標
        this.y = y;                         // 中心のY座標
        this.radius = random(10, 40);       // 今の半径
        this.maxRadius = random(120, 260);  // 最大の半径
        this.speed = random(1.0, 2.5);      // 広がる基本スピード
        this.weight = random(1.5, 3.0);     // 線の太さ

        // サイバーパンクらしい色（シアン・水色・紫・マゼンタ）
        this.hue = random([170, 190, 280, 310]);

        // 輪をいくつのセグメント（短い弧）に分けるか、すき間の割合
        this.segments = floor(random(12, 32));
        this.gap = random(0.3, 0.6);

        // 輪の回転角と回転速度
        this.angle = random(360);
        this.spin = random(0.3, 1) * random([-1, 1]);

        this.val = 0;
        this.alpha = 80;
    }

    update(val) {
        this.val = val;

        // ① 音が強いほど速く広がる
        this.radius += this.speed * (1 + val * 4);

        // ② 音が強いほど速く回る
        this.angle += this.spin * (1 + val * 8);

        // ③ 最大サイズを超えたら中心に戻る（無限ループ）
        let limit = this.maxRadius + val * 150;
        if (this.radius > limit) {
            this.radius = 0;
        }

        // ④ 外へ広がるほど透明にして、自然に消えていくようにする
        this.alpha = map(this.radius / limit, 0, 1, 90, 0);
    }

    render() {
        push();
        translate(this.x, this.y);
        blendMode(ADD); // 光を足し算で重ねてネオンっぽく
        noFill();

        let segAngle = 360 / this.segments;        // 1セグメント分の角度
        let jitter = this.val > 0.4 ? this.val * 12 : 0; // 強い高音のときだけ震える
        let h = (this.hue + this.val * 60) % 360;  // 音が強いほど色が少しずれる

        push();
        rotate(this.angle);
        for (let k = 0; k < this.segments; k++) {
            // セグメントごとに半径をランダムにずらして「ガタガタ」させる
            let r = max(0, this.radius + random(-jitter, jitter));
            let start = k * segAngle;
            let end = start + segAngle * (1 - this.gap);

            // 外側の光（太くて薄い）
            stroke(h, 80, 100, this.alpha * 0.3);
            strokeWeight(this.weight * 3);
            arc(0, 0, r * 2, r * 2, start, end);

            // 芯（細くて明るい）
            stroke(h, 30, 100, this.alpha);
            strokeWeight(this.weight);
            arc(0, 0, r * 2, r * 2, start, end);
        }
        pop();

        // 内側の細い実線リング（逆回りのイメージで、ぼんやり光る）
        stroke(h, 60, 100, this.alpha * 0.3);
        strokeWeight(1);
        circle(0, 0, this.radius * 1.7);

        // 上下左右の照準マーク（ターゲットスコープ風）
        push();
        rotate(-this.angle * 0.5);
        stroke(h, 40, 100, this.alpha * 0.8);
        strokeWeight(1.5);
        for (let i = 0; i < 4; i++) {
            rotate(90);
            line(this.radius + 4, 0, this.radius + 12 + this.val * 15, 0);
        }
        pop();

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }
}
