/**
 * 01: MedusaArt.js - 深海の発光生物（Bio-Luminescent Medusa）
 * -------------------------------------------------------------
 * 【アルゴリズムの仕組み】
 * 中心から伸びる複数の触手（アーム）を多関節ノードで表現。
 * パーリンノイズ（noise）としなるスプライン曲線（curveVertex）により、
 * まるで海中を漂うクラゲのように有機的・自律的にうねる。
 * 
 * 【センサー連動】
 * - 距離（dist）: 手を近づけると傘が大きく開花・拡散し、脈動が激化する。
 * - 明るさ（light）: 暗くすると深海発光（ネオンシアン〜紫）に変色し、残像が長く伸びる。
 */

class MedusaArt {
  constructor(options = {}) {
    // デフォルト設定と外部設定をマージ
    this.config = Object.assign({
      numArms: 16,           // 触手の本数 [6 〜 32]
      nodesPerArm: 10,       // 関節の数・しなやかさ [4 〜 16]
      baseRadius: 30,        // 核のサイズ [10 〜 80]
      maxSpread: 280,        // 手を近づけた時の最大半径 [150 〜 450]
      pulseSpeed: 0.03,      // 呼吸のスピード [0.01 〜 0.08]
      noiseWiggle: 0.025,    // うねりの細かさ [0.005 〜 0.06]
      baseHue: 180,          // 基本色相 (180=シアン, 320=ピンク, 45=ゴールド) [0 〜 360]
      hueRange: 90,          // 色相の広がり幅 [20 〜 180]
      trailAlpha: 14,        // 残像の濃さ (小さいほど長い光の尾) [6 〜 30]
      strokeW: 2.0,          // 線の太さ [1.0 〜 5.0]
    }, options);

    this.dist = 0.2;
    this.light = 0.8;
  }

  // センサー値の更新（0.0 〜 1.0）
  update(dist, light) {
    this.dist = dist;
    this.light = light;
  }

  // 描画実行
  render() {
    // 1. 半透明の黒で光の残像を残す（暗いほど残像が長くなる）
    let currentTrail = map(this.light, 0, 1, this.config.trailAlpha * 0.5, this.config.trailAlpha * 1.5);
    background(240, 25, 5, currentTrail);

    push();
    translate(width / 2, height / 2);
    rotate(frameCount * 0.005);

    // 手の距離に応じた開花サイズと脈動
    let currentSpread = map(this.dist, 0, 1, this.config.baseRadius, this.config.maxSpread);
    let pulse = sin(frameCount * (this.config.pulseSpeed + this.dist * 0.06)) * (15 + this.dist * 25);

    // 2. 各触手（アーム）を描画
    for (let i = 0; i < this.config.numArms; i++) {
      let baseAngle = (TWO_PI / this.config.numArms) * i;

      push();
      rotate(baseAngle);

      noFill();
      beginShape();

      for (let j = 0; j <= this.config.nodesPerArm; j++) {
        let progress = j / this.config.nodesPerArm; // 根元 0.0 〜 先端 1.0

        // パーリンノイズによる自律的なうねり
        let n = noise(
          i * 0.5,
          j * 0.2,
          frameCount * this.config.noiseWiggle + this.dist * 0.04
        );
        let wiggleAngle = map(n, 0, 1, -PI * 0.35, PI * 0.35) * (1.0 + this.dist * 1.2);

        let segDist = (currentSpread + pulse) * progress;
        let nx = cos(wiggleAngle) * segDist;
        let ny = sin(wiggleAngle) * segDist;

        // 色相計算（暗いほど深海ネオン紫、明るいとシアン）
        let h = (this.config.baseHue + progress * this.config.hueRange + (1.0 - this.light) * 120 + frameCount * 0.2) % 360;
        let s = map(this.light, 0, 1, 95, 70);
        let b = map(progress, 0, 1, 60, 100);
        let alpha = map(this.dist, 0, 1, 60, 95);

        stroke(h, s, b, alpha);
        strokeWeight(map(progress, 0, 1, this.config.strokeW * 1.8, this.config.strokeW * 0.6));

        curveVertex(nx, ny);

        // 先端の発光球
        if (j === this.config.nodesPerArm) {
          fill(h, s, 100, 80);
          noStroke();
          let tipSize = map(this.dist, 0, 1, 5, 16);
          circle(nx, ny, tipSize);
        }
      }
      endShape();

      pop();
    }

    // 3. 中心の核（コア）
    let coreHue = (this.config.baseHue + frameCount * 0.4) % 360;
    fill(coreHue, 80, 100, 70);
    noStroke();
    circle(0, 0, this.config.baseRadius * 0.7 + pulse * 0.4);

    pop();
  }
}
