class Orb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.seed = random(1000);
        this.size = random(4, 12);
        this.phase = random(360);
        this.hue = random([42, 185, 205, 275, 320]);
    }

    update(sensor) {
        this.phase += 1.2 + sensor * 8;
        this.drift = 1.2 + sensor * 5;
        this.glow = 35 + sensor * 65;
        this.currentHue = lerp(this.hue, 190 + sensor * 90, sensor * 0.7);
    }

    render() {
        let t = frameCount * 0.008 * this.drift;
        let dx = (noise(this.seed + t) - 0.5) * 140 * this.drift;
        let dy = (noise(this.seed + 100 + t) - 0.5) * 110 * this.drift;
        let pulse = 1 + 0.45 * sin(this.phase);
        let x = this.x + dx;
        let y = this.y + dy;

        noStroke();
        fill(this.currentHue, 85, 100, this.glow * 0.2);
        circle(x, y, this.size * pulse * 7);

        fill(this.currentHue, 35, 100, this.glow);
        circle(x, y, this.size * pulse);
    }
}
