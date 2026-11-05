class ThreadParticle {
  constructor() {
    this.particles = [];
  }

  update(treble) {
    // 高音が強いときに粒子を生成
    if (treble > 0.45) {
      let count = floor(map(treble, 0.45, 1, 1, 6));

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: random(width * 0.2, width * 0.8),
          y: random(height * 0.25, height * 0.75),
          vx: random(-2, 2),
          vy: random(-2, 2),
          life: 100,
          length: random(5, 25),
        });
      }
    }

    // 粒子を移動
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      p.life -= 2;
    }

    // 寿命が尽きた粒子を削除
    this.particles = this.particles.filter((p) => p.life > 0);

    // 粒子数の上限
    if (this.particles.length > 250) {
      this.particles.splice(0, this.particles.length - 250);
    }
  }

  render() {
    push();

    strokeWeight(0.6);

    for (let p of this.particles) {
      stroke(0, 0, 100, p.life);

      line(p.x, p.y, p.x - p.vx * p.length, p.y - p.vy * p.length);
    }

    pop();
  }
}
