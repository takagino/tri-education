class PulseRing {
  constructor() {
    this.rings = [];
    this.previousBass = 0;
  }

  update(bass) {
    // 低音の急激な上昇を検知
    let beat = bass - this.previousBass;

    if (beat > 0.08 && bass > 0.35) {
      this.rings.push({
        radius: 20,
        alpha: 65,
        speed: 4 + bass * 10,
      });
    }

    this.previousBass = bass;

    for (let ring of this.rings) {
      ring.radius += ring.speed;
      ring.alpha -= 1.2;
    }

    this.rings = this.rings.filter((ring) => ring.alpha > 0);
  }

  render() {
    push();

    translate(width / 2, height / 2);

    noFill();
    strokeWeight(0.7);

    for (let ring of this.rings) {
      stroke(0, 0, 100, ring.alpha);

      beginShape();

      for (let a = 0; a <= 360; a += 5) {
        let distortion = sin(a * 5 + frameCount * 0.5) * 12;

        let r = ring.radius + distortion;

        let x = cos(a) * r;
        let y = sin(a) * r * 0.65;

        vertex(x, y);
      }

      endShape(CLOSE);
    }

    pop();
  }
}
