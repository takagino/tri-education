/**
 * 05: CosmicMeshArt.js - コズミック・星雲メッシュ（Cosmic Network / Constellation）
 * ----------------------------------------------------------------------------------
 * 【アルゴリズムの仕組み】
 * 空間を自律的に浮遊する数十〜数百個の星々（ノード）。
 * 毎フレーム、星同士のユークリッド距離（dist）を総当たり判定し、
 * 一定距離以内に近づいた星同士を自動で光のラインで結ぶ「近接メッシュネットワーク」。
 * 
 * 【センサー連動】
 * - 距離（dist）: 手を近づけると中心に強大な重力（ブラックホール）が発生！星々が一気に中心へ凝縮し、高速で旋回する。
 * - 明るさ（light）: 暗くすると星雲のガス密度が濃くなり、ディープブルーからネオンシアン＆パープルの宇宙星雲へ変化。
 */

class CosmicMeshArt {
  constructor(options = {}) {
    this.config = Object.assign({
      numStars: 80,          // 星（ノード）の数 [30 〜 140]
      connectDist: 95,       // 星同士を結ぶ最大距離 [50 〜 160]
      gravityPower: 1.8,     // 手を近づけた時のブラックホール引力 [0.5 〜 3.5]
      baseSpeed: 1.5,        // 星の基本移動スピード [0.5 〜 3.0]
      baseHue: 220,          // 基本色相 (220=コバルト, 280=星雲パープル, 180=サイバーシアン) [0 〜 360]
      hueRange: 90,          // 色相の広がり幅 [30 〜 180]
      trailAlpha: 16,        // 残像の濃さ [8 〜 30]
      nodeSize: 4.0,         // 星の基本サイズ [2.0 〜 8.0]
    }, options);

    this.dist = 0.2;
    this.light = 0.8;

    this.stars = [];
    this.initStars();
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.config.numStars; i++) {
      this.stars.push({
        x: random(width || 700),
        y: random(height || 700),
        vx: random(-1, 1) * this.config.baseSpeed,
        vy: random(-1, 1) * this.config.baseSpeed,
        radius: random(2, 5),
        phase: random(TWO_PI)
      });
    }
  }

  update(dist, light) {
    this.dist = dist;
    this.light = light;
  }

  render() {
    if (this.stars.length === 0 || width === 0) {
      this.initStars();
    }

    let currentTrail = map(this.light, 0, 1, this.config.trailAlpha * 0.5, this.config.trailAlpha * 1.5);
    background(240, 35, 4, currentTrail);

    let centerX = width / 2;
    let centerY = height / 2;
    let effectiveConnectDist = this.config.connectDist * (1.0 + this.dist * 0.5);

    // 1. 各星の物理挙動（移動 ＋ 重力）
    for (let s of this.stars) {
      // 手を近づけると中心へのブラックホール引力が発生
      if (this.dist > 0.05) {
        let dx = centerX - s.x;
        let dy = centerY - s.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        
        if (d > 20) {
          let force = (this.dist * this.config.gravityPower * 120) / (d + 80);
          let angle = Math.atan2(dy, dx);
          
          // 引力＋垂直方向の旋回力（渦を巻く）
          s.vx += cos(angle) * force + cos(angle + HALF_PI) * (force * 0.6);
          s.vy += sin(angle) * force + sin(angle + HALF_PI) * (force * 0.6);
        }
      }

      // 速度の減衰（暴走防止）
      s.vx *= 0.96;
      s.vy *= 0.96;

      // わずかな自律揺らぎ
      s.vx += cos(frameCount * 0.02 + s.phase) * 0.1;
      s.vy += sin(frameCount * 0.02 + s.phase) * 0.1;

      s.x += s.vx;
      s.y += s.vy;

      // 画面端で跳ね返り
      if (s.x < 0 || s.x > width) s.vx *= -1;
      if (s.y < 0 || s.y > height) s.vy *= -1;
    }

    // 2. 星同士の近接ライン結線（メッシュネットワーク）
    for (let i = 0; i < this.stars.length; i++) {
      let s1 = this.stars[i];

      for (let j = i + 1; j < this.stars.length; j++) {
        let s2 = this.stars[j];
        let d = dist(s1.x, s1.y, s2.x, s2.y);

        if (d < effectiveConnectDist) {
          // 距離が近いほど太く、不透明に光る
          let lineAlpha = map(d, 0, effectiveConnectDist, 80, 0);
          let distFromCenter = dist((s1.x + s2.x) / 2, (s1.y + s2.y) / 2, centerX, centerY);
          let progress = constrain(distFromCenter / (width * 0.5), 0, 1);

          let h = (this.config.baseHue + progress * this.config.hueRange + (1.0 - this.light) * 100 + frameCount * 0.15) % 360;
          let s = map(this.light, 0, 1, 95, 75);
          
          stroke(h, s, 100, lineAlpha);
          strokeWeight(map(d, 0, effectiveConnectDist, 2.0, 0.4));
          line(s1.x, s1.y, s2.x, s2.y);
        }
      }

      // 星ノード自体の描画
      let nodeH = (this.config.baseHue + i * 2 + frameCount * 0.2) % 360;
      fill(nodeH, 80, 100, 90);
      noStroke();
      let starPulse = sin(frameCount * 0.05 + s1.phase) * 1.5;
      circle(s1.x, s1.y, this.config.nodeSize + starPulse + this.dist * 3.0);
    }

    // 中心のブラックホール/コア
    if (this.dist > 0.1) {
      let corePulse = sin(frameCount * 0.1) * 10 * this.dist;
      fill((this.config.baseHue + 180) % 360, 90, 100, this.dist * 60);
      noStroke();
      circle(centerX, centerY, 30 + corePulse);
    }
  }
}
