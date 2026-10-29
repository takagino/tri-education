/**
 * Ripple.js - 光の波紋リング（描画部品テンプレート）
 */
class Ripple {
    constructor(x, y) {
        this.x = x;                         // 中心のX座標
        this.y = y;                         // 中心のY座標
        this.radius = random(10, 40);       // 初期の半径
        this.maxRadius = random(120, 260);  // 最大の半径
        this.speed = random(1.0, 2.5);      // 広がる基本スピード
        this.hue = random(160, 220);        // シアン〜青系の初期色相
        this.weight = random(1.5, 3.0);     // 線の太さ
    }

    // ★ センサー値（0.0: 遠い 〜 1.0: 近い）を受け取って更新
    update(sensor) {
        // 手を近づけると波紋が広がるスピードが急加速
        this.radius += this.speed * (1 + sensor * 4);

        // 最大サイズを超えたら中心に戻ってリセット（無限ループ）
        if (this.radius > this.maxRadius + sensor * 150) {
            this.radius = 0;
        }

        // 手を近づけると色相が青からエメラルドグリーン・紫へとシフト
        this.currentHue = (this.hue + sensor * 80) % 360;

        // 外側に広がるほど透明度を下げ、自然にフェードアウトさせる
        let progress = this.radius / (this.maxRadius + sensor * 150);
        this.alpha = map(progress, 0, 1, 80, 0);
    }

    render() {
        push();
        translate(this.x, this.y);

        noFill();                           // 中は塗らない（線のみ）
        stroke(this.currentHue, 70, 100, this.alpha);
        strokeWeight(this.weight);

        // 波紋の同心円を描く
        circle(0, 0, this.radius * 2);
        pop();
    }
}
