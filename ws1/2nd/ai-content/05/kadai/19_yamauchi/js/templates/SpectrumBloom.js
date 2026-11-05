class SpectrumBloom {
  constructor() {
    this.bass = 0;
    this.mid = 0;
    this.treble = 0;
  }

  update(bass, mid, treble) {
    this.bass = bass;
    this.mid = mid;
    this.treble = treble;
  }

  render() {
    const baseRadius = min(width, height) * 0.16;
    const rotation = frameCount * (0.12 + this.mid * 0.9);
    const hue = (185 + this.treble * 125) % 360;

    push();
    translate(width / 2, height / 2);
    rotate(rotation);
    noFill();

    for (let ring = 0; ring < 4; ring++) {
      const radius = baseRadius * (0.55 + ring * 0.25 + this.bass * 0.55);
      stroke(hue, 75, 100, 34 + this.treble * 52);
      strokeWeight(1 + this.treble * 2);
      circle(0, 0, radius * 2);
    }

    const spokeCount = 24;
    for (let i = 0; i < spokeCount; i++) {
      const angle = (360 / spokeCount) * i;
      const pulse = sin(frameCount * 2 + i * 19) * (8 + this.treble * 30);
      const innerRadius = baseRadius * (0.32 + this.bass * 0.25);
      const outerRadius = baseRadius * (1.25 + this.mid * 0.65) + pulse;

      stroke((hue + i * 3) % 360, 65, 100, 25 + this.treble * 65);
      strokeWeight(1 + this.treble * 2.5);
      line(
        cos(angle) * innerRadius,
        sin(angle) * innerRadius,
        cos(angle) * outerRadius,
        sin(angle) * outerRadius
      );
    }

    noStroke();
    fill(hue, 55, 100, 12 + this.bass * 25);
    circle(0, 0, baseRadius * (0.6 + this.bass * 0.8));
    pop();
  }
}
