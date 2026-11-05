class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.phase = random(360);
        this.seedSize = random(15, 55);
        this.hue = random([42, 185, 205, 275, 320]);
    }

    update(sensor) {
        this.phase += 2 + sensor * 9;
        this.radius = this.seedSize + (this.phase % 180);
        this.alpha = map(
            this.radius,
            this.seedSize,
            this.seedSize + 180,
            25 + sensor * 45,
            0,
            true
        );
    }

    render() {
        noFill();

        stroke(this.hue, 80, 100, this.alpha);
        strokeWeight(1 + this.alpha / 18);
        circle(this.x, this.y, this.radius * 2);

        stroke((this.hue + 35) % 360, 70, 100, this.alpha * 0.7);
        strokeWeight(1);
        circle(this.x, this.y, this.radius * 1.4);
    }
}
