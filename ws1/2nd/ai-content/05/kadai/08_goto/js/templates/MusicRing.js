// 音域ごとのエネルギーで伸び縮みする背景の輪郭円。
class MusicRing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sizeRatio = random(0.20, 0.34);
    this.hue = random([52, 165, 185]);
    this.weight = random(1.5, 3);
    this.energy = 0;
    this.band = 0; // 0:低音、1:中音、2:高音
  }

  update(val) {
    const energy = Number.isFinite(val) ? constrain(val, 0, 1) : 0;
    const dt = constrain(deltaTime / 1000, 0, 0.05);
    // 拡大・縮小を素早く切り替え、音の強弱を大きく見せます。
    const speed = energy > this.energy ? 24 : 10;
    this.energy += (energy - this.energy) * (1 - Math.exp(-speed * dt));
  }

  render() {
    push();
    colorMode(HSB, 360, 100, 100, 100);
    ellipseMode(CENTER);
    blendMode(BLEND);
    translate(this.x, this.y);
    noFill();
    stroke(this.hue, 35, 100, 30 + 45 * this.energy);
    strokeWeight(this.weight * (1 + 1.8 * this.energy));
    const base = Math.min(width, height) * this.sizeRatio;
    circle(0, 0, base * (0.35 + 4.8 * Math.pow(this.energy, 0.7)));
    pop();
  }
}
