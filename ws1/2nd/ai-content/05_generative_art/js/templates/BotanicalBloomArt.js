/**
 * 04: BotanicalBloomArt.js - 咲き乱れるデジタル開花（Generative Botanical Bloom）
 * ---------------------------------------------------------------------------------
 * 【アルゴリズムの仕組み】
 * 自然界の植物（ヒマワリの種やバラの花弁）に見られる「黄金角（約137.5度）」と
 * 対数螺旋の幾何学。多層の花弁（Petal）が中心から外側へ渦を巻きながら展開する。
 * 
 * 【センサー連動】
 * - 距離（dist）: 手を近づけると、硬く閉じていた「蕾（つぼみ）」が一気に大輪の花へ満開に開花！
 * - 明るさ（light）: 暗くすると月夜に発光する「月見草」のように妖艶な夜光カラーに変色。
 */

class BotanicalBloomArt {
  constructor(options = {}) {
    this.config = Object.assign({
      numPetals: 70,         // 花弁の総枚数 [30 〜 150]
      spiralTightness: 3.8,  // 螺旋の巻きの密度 [2.0 〜 6.0]
      maxBloomRadius: 280,   // 満開時の最大半径 [150 〜 420]
      rotationSpeed: 0.008,  // 花全体のゆっくりした回転速度 [-0.02 〜 0.02]
      baseHue: 340,          // 基本色相 (340=桜ピンク, 40=山吹ゴールド, 280=夜光藤色) [0 〜 360]
      hueRange: 80,          // 外側に向かうグラデーション幅 [20 〜 140]
      trailAlpha: 18,        // 残像の濃さ [10 〜 35]
      petalWidth: 18,        // 花弁の基本幅 [8 〜 35]
    }, options);

    this.dist = 0.2;
    this.light = 0.8;
  }

  update(dist, light = 0.8) {
    this.dist = dist;
    this.light = light;
  }

  render() {
    let currentTrail = map(this.light, 0, 1, this.config.trailAlpha * 0.6, this.config.trailAlpha * 1.4);
    background(280, 20, 5, currentTrail);

    push();
    translate(width / 2, height / 2);
    rotate(frameCount * this.config.rotationSpeed);

    // 黄金角（ラジアンで約 2.39996 rad = 137.507度）
    const GOLDEN_ANGLE = 2.39996;

    // 距離センサーで開花率を制御（0.0: つぼみ 〜 1.0: 満開）
    let bloomScale = map(this.dist, 0, 1, 0.25, 1.0);
    let pulse = sin(frameCount * 0.04) * (10 + this.dist * 20);

    for (let i = 0; i < this.config.numPetals; i++) {
      let progress = i / this.config.numPetals; // 中心 0.0 〜 外側 1.0
      
      // 螺旋上の位置計算（フェルマーの螺旋）
      let angle = i * GOLDEN_ANGLE;
      let r = Math.sqrt(i) * this.config.spiralTightness * bloomScale * 12.0;

      let x = cos(angle) * r;
      let y = sin(angle) * r;

      // 花弁の回転角度（中心から外を向くように揃える）
      let petalRotation = angle + HALF_PI;

      push();
      translate(x, y);
      rotate(petalRotation);

      // 色彩：中心から外側へグラデーション（暗くなると月光のブルー・パープルへシフト）
      let h = (this.config.baseHue + progress * this.config.hueRange + (1.0 - this.light) * 110 + frameCount * 0.15) % 360;
      let s = map(this.light, 0, 1, 95, 70);
      let b = map(progress, 0, 1, 60, 100);
      let alpha = map(this.dist, 0, 1, 50, 85);

      fill(h, s, b, alpha);
      stroke((h + 20) % 360, s, 100, alpha * 0.8);
      strokeWeight(1.2);

      // 花弁の形状（細長い楕円＋呼吸）
      let pWidth = (this.config.petalWidth * (0.6 + progress * 0.8)) * bloomScale;
      let pLength = pWidth * (2.2 + sin(frameCount * 0.03 + i * 0.1) * 0.3);

      ellipse(0, 0, pWidth, pLength);

      // 花弁の中央に葉脈のライン
      stroke((h + 40) % 360, s, 100, alpha);
      line(0, -pLength * 0.4, 0, pLength * 0.4);

      pop();
    }

    // 中心の雌しべ・雄しべ（ゴールド発光）
    let pistilH = (this.config.baseHue + 60) % 360;
    fill(pistilH, 90, 100, 90);
    noStroke();
    circle(0, 0, 18 + pulse * 0.3);

    pop();
  }
}
