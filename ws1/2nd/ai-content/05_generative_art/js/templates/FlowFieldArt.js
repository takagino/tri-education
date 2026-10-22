/**
 * 03: FlowFieldArt.js - オーロラ流線群（Vector Field / Aurora Ribbons）
 * -------------------------------------------------------------------
 * 【アルゴリズムの仕組み】
 * 2Dパーリンノイズ空間から生成される「見えない風のベクトル場（Vector Field）」。
 * 画面いっぱいに放たれた数百本の微粒子（Particle）が、風に身を任せて
 * 光のリボンのように優雅に泳ぎ、長い残像の軌跡を残す。
 * 
 * 【センサー連動】
 * - 距離（dist）: 手を近づけると画面中央に強力な「引力＆乱気流の渦」が発生し、流線が激しく加速・旋回する。
 * - 明るさ（light）: 暗くすると夜空のオーロラのように光が深く滲み、彩度と発光度が極大化。
 */

class FlowFieldArt {
  constructor(options = {}) {
    this.config = Object.assign({
      numParticles: 400,     // 光の流線の本数 [150 〜 800]
      noiseScale: 0.005,     // 渦の大きさ・滑らかさ [0.002 〜 0.015]
      flowSpeed: 2.2,        // 流れる基本スピード [1.0 〜 5.0]
      baseHue: 160,          // 基本色相 (160=エメラルド, 220=コバルト, 300=マゼンタ) [0 〜 360]
      hueRange: 100,         // 色相の広がり幅 [30 〜 180]
      trailAlpha: 10,        // 残像の濃さ (小さいほど長くオーロラが残る) [5 〜 25]
      particleSize: 2.0,     // 流線の太さ [1.0 〜 4.0]
    }, options);

    this.dist = 0.2;
    this.light = 0.8;

    // パーティクルの初期化
    this.particles = [];
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.numParticles; i++) {
      this.particles.push({
        x: random(width || 700),
        y: random(height || 700),
        prevX: 0,
        prevY: 0,
        speed: random(0.8, 1.4),
        seed: random(1000)
      });
    }
  }

  update(dist, light = 0.8) {
    this.dist = dist;
    this.light = light;
  }

  render() {
    // 画面サイズ変更時の再調整
    if (this.particles.length === 0 || width === 0) {
      this.initParticles();
    }

    // 長いオーロラ残像を残す暗黒背景
    let currentTrail = map(this.light, 0, 1, this.config.trailAlpha * 0.5, this.config.trailAlpha * 1.5);
    background(240, 30, 4, currentTrail);

    let currentSpeed = this.config.flowSpeed * (1.0 + this.dist * 2.0);
    let centerX = width / 2;
    let centerY = height / 2;

    for (let p of this.particles) {
      p.prevX = p.x;
      p.prevY = p.y;

      // 1. パーリンノイズによる基本の風向き角度
      let angle = noise(
        p.x * this.config.noiseScale,
        p.y * this.config.noiseScale,
        frameCount * 0.003
      ) * TWO_PI * 3.0;

      // 2. 距離センサー：手を近づけると中央への引力と渦巻きが合成される！
      if (this.dist > 0.05) {
        let dx = centerX - p.x;
        let dy = centerY - p.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (d > 10 && d < 400) {
          let gravityAngle = Math.atan2(dy, dx) + HALF_PI * 0.8; // 渦巻き角
          let force = (1.0 - d / 400) * this.dist * 0.6;
          // ノイズの風と渦巻き引力をブレンド
          angle = lerp(angle, gravityAngle, force);
        }
      }

      // 移動
      p.x += cos(angle) * currentSpeed * p.speed;
      p.y += sin(angle) * currentSpeed * p.speed;

      // 色彩：位置と明るさセンサーでオーロラカラーへ
      let distFromCenter = dist(p.x, p.y, centerX, centerY);
      let progress = constrain(distFromCenter / (width * 0.5), 0, 1);

      let h = (this.config.baseHue + progress * this.config.hueRange + (1.0 - this.light) * 90 + frameCount * 0.1) % 360;
      let s = map(this.light, 0, 1, 95, 75);
      let b = map(this.dist, 0, 1, 75, 100);
      let alpha = map(this.dist, 0, 1, 60, 95);

      stroke(h, s, b, alpha);
      strokeWeight(this.config.particleSize * (1.0 + this.dist * 0.8));
      line(p.prevX, p.prevY, p.x, p.y);

      // 画面外に出たら反対側からリセット
      if (p.x < 0) { p.x = width; p.prevX = width; }
      if (p.x > width) { p.x = 0; p.prevX = 0; }
      if (p.y < 0) { p.y = height; p.prevY = height; }
      if (p.y > height) { p.y = 0; p.prevY = 0; }
    }
  }
}
