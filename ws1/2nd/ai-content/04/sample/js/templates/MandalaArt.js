/**
 * 02: MandalaArt.js - 幾何学曼荼羅・万華鏡（Sacred Geometry）
 * -------------------------------------------------------------
 * 【アルゴリズムの仕組み】
 * 三角関数（cos / sin）と座標変換（push / pop / rotate）による
 * 多重リングのシンメトリー展開。
 * 複数の層（レイヤー）が互い違いに逆回転しながら、
 * 幾何学ポリゴンとリングが万華鏡のように折り重なる。
 * 
 * 【センサー連動】
 * - 距離（dist）: 手を近づけると多層リングが立体的に大きく展開（3D風ワープ）。
 * - 明るさ（light）: 暗くするとゴールド＆ネオンマゼンタのサイバー発光にシフト。
 */

class MandalaArt {
  constructor(options = {}) {
    this.config = Object.assign({
      symmetry: 8,           // シンメトリー角数 (4, 6, 8, 12, 16)
      numLayers: 6,          // 多重リングの層数 [3 〜 10]
      maxRadius: 320,        // 手を近づけた時の最大半径 [150 〜 450]
      rotationSpeed: 0.015,  // 全体の回転スピード [0.005 〜 0.04]
      baseHue: 320,          // 基本色相 (320=マゼンタ, 40=ゴールド, 200=シアン) [0 〜 360]
      hueRange: 60,          // レイヤーごとの色相シフト幅 [20 〜 120]
      trailAlpha: 20,        // 残像の濃さ [10 〜 40]
      strokeW: 2.2,          // 線の太さ [1.0 〜 5.0]
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
    background(260, 30, 4, currentTrail);

    push();
    translate(width / 2, height / 2);

    let baseSpread = map(this.dist, 0, 1, 60, this.config.maxRadius);
    let rotSpeed = this.config.rotationSpeed * (1.0 + this.dist * 1.5);

    // 多重レイヤーの描画
    for (let layer = 1; layer <= this.config.numLayers; layer++) {
      let layerProgress = layer / this.config.numLayers;
      let radius = baseSpread * layerProgress;
      
      // 偶数層と奇数層で逆回転させる
      let direction = (layer % 2 === 0) ? 1 : -1;
      let layerAngle = frameCount * rotSpeed * direction * (1.2 - layerProgress * 0.5);

      push();
      rotate(layerAngle);

      // レイヤーごとの色彩（暗いほど彩度MAX、明暗でゴールド〜マゼンタにシフト）
      let h = (this.config.baseHue + layer * (this.config.hueRange / this.config.numLayers) + (1.0 - this.light) * 100 + frameCount * 0.2) % 360;
      let s = map(this.light, 0, 1, 95, 75);
      let b = map(layerProgress, 0, 1, 70, 100);
      let alpha = map(this.dist, 0, 1, 65, 95);

      stroke(h, s, b, alpha);
      strokeWeight(this.config.strokeW);
      noFill();

      // 各対称軸に幾何学パーツを配置
      for (let i = 0; i < this.config.symmetry; i++) {
        let angle = (TWO_PI / this.config.symmetry) * i;
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;

        push();
        translate(x, y);
        rotate(angle + frameCount * 0.02);

        // 幾何学シンボル（層に応じて円・四角・ダイヤを切り替え）
        let elementSize = map(this.dist, 0, 1, 15, 40) * (1.2 - layerProgress * 0.4);
        
        if (layer % 3 === 0) {
          rect(0, 0, elementSize, elementSize);
        } else if (layer % 3 === 1) {
          circle(0, 0, elementSize);
        } else {
          // ひし形（ダイヤ）
          push();
          rotate(PI / 4);
          rect(0, 0, elementSize * 0.8, elementSize * 0.8);
          pop();
        }
        pop();
      }

      // レイヤーをつなぐ外枠の幾何学多角形
      beginShape();
      for (let i = 0; i <= this.config.symmetry; i++) {
        let angle = (TWO_PI / this.config.symmetry) * i;
        let px = cos(angle) * radius;
        let py = sin(angle) * radius;
        vertex(px, py);
      }
      endShape();

      pop();
    }

    // 中心のシンボル
    let coreH = (this.config.baseHue + frameCount * 0.5) % 360;
    fill(coreH, 80, 100, 80);
    noStroke();
    let corePulse = sin(frameCount * 0.05) * 8;
    circle(0, 0, 25 + corePulse + this.dist * 20);

    pop();
  }
}
