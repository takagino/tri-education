/**
 * 【ハンズオン用】SimplePulseArt.js - 最小のテンプレートクラス
 * -------------------------------------------------------------
 * クラスの基本構造（constructor, update, render）を理解するための
 * 最もシンプルなサンプルです（約35行）。
 */

class SimplePulseArt {
  // 1. 初期化：設定パラメータを受け取る
  constructor(options = {}) {
    this.config = Object.assign({
      baseHue: 200,          // 基本の色相 [0〜360]
      maxRadius: 220,        // 最大半径 [100〜400]
      numRings: 5,           // 同心円の数 [1〜10]
      trailAlpha: 20,        // 残像の濃さ [10〜40]
    }, options);

    this.dist = 0.2;
    this.light = 0.8;
  }

  // 2. センサー値の受取（0.0〜1.0）
  update(dist, light) {
    this.dist = dist;
    this.light = light;
  }

  // 3. 描画
  render() {
    // 背景の残像塗り（暗いほど残像が伸びる）
    let trail = map(this.light, 0, 1, this.config.trailAlpha * 0.5, this.config.trailAlpha * 1.5);
    background(0, 0, 8, trail);

    push();
    translate(width / 2, height / 2); // 画面中央へ

    // 手を近づけると広がる半径
    let spread = map(this.dist, 0, 1, 30, this.config.maxRadius);

    for (let i = 1; i <= this.config.numRings; i++) {
      let r = spread * (i / this.config.numRings);
      let pulse = sin(frameCount * 0.05 + i * 0.5) * (10 + this.dist * 20);

      // 明暗で色相が変化（暗くすると紫・ピンクへ）
      let h = (this.config.baseHue + i * 15 + (1.0 - this.light) * 120) % 360;

      noFill();
      stroke(h, 85, 100, 80);
      strokeWeight(map(this.dist, 0, 1, 2, 5));
      circle(0, 0, (r + pulse) * 2);
    }

    pop();
  }
}
