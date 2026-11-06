// 高音に合わせてジャンプする音符。p5.jsのグローバルモードで使います。
class SteppingNote {
  constructor(x, y) {
    this.x = x;
    this.y = y; // 着地の基準位置
    this.size = random(30, 46);
    this.hue = random([42, 185, 315]); // 黄色・水色・ピンク
    this.phase = random(360);
    this.speed = random(150, 210);
    this.tilt = random(-6, 6);
    this.energy = 0;
    this.mid = 0;
    this.treble = 0;
    this.kick = 0;
    this.jump = 0;
    this.bounce = random(0.9, 1.1);
  }

  // 第1引数は高音、第2引数は中音。update(val)だけでも使えます。
  update(val, midVal = 0) {
    const treble = Number.isFinite(val) ? constrain(val, 0, 1) : 0;
    const mid = Number.isFinite(midVal) ? constrain(midVal, 0, 1) : 0;
    const dt = constrain(deltaTime / 1000, 0, 0.05);
    const follow = 1 - Math.exp(-22 * dt);
    this.treble += (treble - this.treble) * follow;
    this.mid += (mid - this.mid) * follow;
    this.energy = Math.min(1, this.mid * 0.4 + this.treble * 0.6);
    this.kick = this.treble;

    // 無音でも小さく弾み、中音で大きく、高音でさらに大きく弾みます。
    // 個体ごとに位相と速度が違うので、全員が同じ動きになりません。
    this.phase = (this.phase + this.speed *
      (1 + 0.5 * this.mid + 0.9 * this.treble) * dt) % 360;
    const wave = Math.abs(Math.sin(this.phase * Math.PI / 180));
    const desiredHeight = (20 + 115 * this.mid + 260 * this.treble) * this.bounce;
    // 上端に近づくほど緩やかに高さを制限。強音でも反応が頭打ちになりにくくします。
    const room = Math.max(4, this.y - this.size * 3.6);
    this.jump = Math.pow(wave, 0.8) * (room * (1 - Math.exp(-desiredHeight / room)));
  }

  render() {
    // スタイル・座標変換はこの音符の中だけに適用します。
    push();
    colorMode(HSB, 360, 100, 100, 100);
    angleMode(DEGREES);
    ellipseMode(CENTER);
    blendMode(BLEND);
    translate(this.x, this.y);

    const e = this.energy;
    const s = this.size;
    const step = sin(this.phase);
    // 円形のエフェクトや足は描かず、音符そのものを動かします。
    translate(step * (7 + 30 * e), -this.jump);
    rotate(this.tilt + step * (12 + 30 * e + 22 * this.kick));
    const zoom = 1 + 0.25 * e + 0.3 * this.kick;
    // 着地で少しつぶれ、跳ね上がると伸びる、弾力のある動き。
    const stretch = Math.abs(step) * (0.24 + 0.16 * e) - 0.12;
    scale(zoom * (1 - stretch * 0.5), zoom * (1 + stretch));
    strokeCap(ROUND);

    // 音符の棒・旗・頭。基本図形だけなのでフォントに依存しません。
    stroke(this.hue, 55, 100);
    strokeWeight(s * 0.13);
    line(s * 0.25, -s * 0.48, s * 0.25, -s * 1.65);
    noFill();
    bezier(s * 0.25, -s * 1.65, s * 0.85, -s * 1.35,
      s * 0.85, -s * 1.1, s * 0.48, -s * 0.98);
    noStroke();
    fill(this.hue, 55, 100);
    push();
    translate(0, -s * 0.48);
    rotate(-20);
    ellipse(0, 0, s * 0.7, s * 0.46);
    fill(0, 0, 100, 85);
    ellipse(-s * 0.1, -s * 0.07, s * 0.22, s * 0.1);
    pop();
    pop();
  }
}
