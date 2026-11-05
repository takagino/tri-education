class TensionLine {
  constructor() {
    this.lines = [];
  }

  update(mid) {
    if (mid > 0.5 && random() < mid * 0.15) {
      let angle = random(360);

      this.lines.push({
        x: random(width),
        y: random(height),
        angle: angle,
        length: random(100, 500),
        alpha: 70,
      });
    }

    for (let line of this.lines) {
      line.alpha -= 2;
    }

    this.lines = this.lines.filter((line) => line.alpha > 0);

    if (this.lines.length > 30) {
      this.lines.shift();
    }
  }

  render() {
    push();

    strokeWeight(0.5);

    for (let l of this.lines) {
      stroke(0, 0, 100, l.alpha);

      let dx = cos(l.angle) * l.length;
      let dy = sin(l.angle) * l.length;

      line(l.x - dx / 2, l.y - dy / 2, l.x + dx / 2, l.y + dy / 2);
    }

    pop();
  }
}
