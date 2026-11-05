class NeonClubVisual {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(min(width, height) * 0.045, min(width, height) * 0.085);
    this.hue = random(0, 360);
    this.sides = floor(random(3, 8));
    this.rotation = random(360);
    this.rotationSpeed = random(-0.45, 0.45);
    this.energy = 0;
  }

  update(val) {
    const energy = constrain(val, 0, 1);
    this.energy = lerp(this.energy, energy, 0.35);
    this.rotation += this.rotationSpeed * (1 + this.energy * 12);
  }

  render() {
    const pulse = 1 + this.energy * 0.9;
    const radius = this.size * pulse;
    const hue = (this.hue + frameCount * 0.35 + this.energy * 100) % 360;

    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    blendMode(ADD);
    noFill();

    for (let layer = 2; layer >= 0; layer--) {
      const layerRadius = radius * (1 + layer * 0.24);
      const alpha = (22 + this.energy * 62) / (layer + 1);
      stroke((hue + layer * 32) % 360, 80, 100, alpha);
      strokeWeight(1 + this.energy * 3);

      beginShape();
      for (let i = 0; i < this.sides; i++) {
        const angle = (360 / this.sides) * i;
        const beatDeform = 1 + this.energy * 0.3 * sin(frameCount * 5 + i * 70);
        vertex(
          cos(angle) * layerRadius * beatDeform,
          sin(angle) * layerRadius * beatDeform
        );
      }
      endShape(CLOSE);
    }

    const spokeCount = this.sides * 2;
    for (let i = 0; i < spokeCount; i++) {
      const angle = (360 / spokeCount) * i;
      const innerRadius = radius * 0.5;
      const outerRadius = radius * (1.3 + this.energy * (0.8 + (i % 3) * 0.2));
      stroke((hue + i * 19) % 360, 65, 100, 28 + this.energy * 72);
      strokeWeight(1 + this.energy * 2);
      line(
        cos(angle) * innerRadius,
        sin(angle) * innerRadius,
        cos(angle) * outerRadius,
        sin(angle) * outerRadius
      );
    }

    noStroke();
    fill((hue + 45) % 360, 45, 100, 16 + this.energy * 50);
    circle(0, 0, radius * (0.4 + this.energy * 0.5));
    blendMode(BLEND);
    pop();
  }
}
