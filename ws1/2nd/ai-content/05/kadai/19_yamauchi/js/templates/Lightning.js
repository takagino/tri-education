class Lightning {
  constructor() {
    this.strikeIn = random(0, 3);
    this.flash = 0;
    this.bolts = [];
  }

  update(bass) {
    this.strikeIn--;
    this.flash = max(0, this.flash - 9);

    for (let i = this.bolts.length - 1; i >= 0; i--) {
      this.bolts[i].life--;
      if (this.bolts[i].life <= 0) {
        this.bolts.splice(i, 1);
      }
    }

    if (this.strikeIn <= 0) {
      this.createStrike();
      this.flash = max(this.flash, random(12, 26) + bass * 14);
      this.strikeIn = random(5, 12) / (1 + bass * 0.5);
    }
  }

  createStrike() {
    const startX = random(width * 0.15, width * 0.85);
    const points = [{ x: startX, y: 0 }];
    const segmentCount = 9;
    let x = startX;
    let y = 0;

    for (let i = 1; i <= segmentCount; i++) {
      x = constrain(x + random(-width * 0.055, width * 0.055), 0, width);
      y = (height * 0.72 * i) / segmentCount;
      points.push({ x, y });
    }

    const life = random(12, 24);
    this.bolts.push({ points, weight: 3.5, life, maxLife: life });

    for (let i = 2; i < points.length - 2; i += 2) {
      if (random() < 0.65) {
        const branch = [{ x: points[i].x, y: points[i].y }];
        let branchX = points[i].x;
        let branchY = points[i].y;
        const direction = random() < 0.5 ? -1 : 1;
        for (let j = 0; j < 3; j++) {
          branchX += direction * random(12, 38);
          branchY += random(18, 42);
          branch.push({ x: branchX, y: branchY });
        }
        this.bolts.push({ points: branch, weight: 1.5, life, maxLife: life });
      }
    }
  }

  render() {
    if (this.flash <= 0 && this.bolts.length === 0) return;

    push();
    if (this.flash > 0) {
      noStroke();
      fill(210, 15, 100, this.flash * 0.32);
      rect(width / 2, height / 2, width, height);
    }

    noFill();
    for (const bolt of this.bolts) {
      const alpha = map(bolt.life, 0, bolt.maxLife, 0, 100);
      stroke(195, 40, 100, alpha * 0.55);
      strokeWeight(bolt.weight * 3);
      this.drawBolt(bolt.points);

      stroke(205, 8, 100, alpha);
      strokeWeight(bolt.weight);
      this.drawBolt(bolt.points);
    }
    pop();
  }

  drawBolt(points) {
    for (let i = 1; i < points.length; i++) {
      line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
    }
  }
}
