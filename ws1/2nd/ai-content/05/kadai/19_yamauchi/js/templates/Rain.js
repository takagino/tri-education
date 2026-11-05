class Rain {
  constructor(count) {
    this.drops = Array.from({ length: count }, () => this.createDrop(true));
  }

  createDrop(randomizeY = false) {
    return {
      x: random(width),
      y: randomizeY ? random(height) : random(-height * 0.2, 0),
      length: random(8, 20),
      speed: random(5, 11),
      drift: random(-1, 1)
    };
  }

  update(mid) {
    for (let i = 0; i < this.drops.length; i++) {
      const drop = this.drops[i];
      drop.y += drop.speed * (1 + mid * 1.8);
      drop.x += drop.drift * (1 + mid);

      if (drop.y > height || drop.x < -20 || drop.x > width + 20) {
        this.drops[i] = this.createDrop();
      }
    }
  }

  render() {
    push();
    noFill();
    stroke(195, 25, 100, 38);
    strokeWeight(1);
    for (const drop of this.drops) {
      line(drop.x, drop.y, drop.x - drop.drift * 2, drop.y + drop.length);
    }
    pop();
  }
}
