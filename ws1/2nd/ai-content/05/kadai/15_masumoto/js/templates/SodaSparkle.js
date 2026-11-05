/** 高音のアクセントで、きゅっと輝く四つ角の星。 */
class SodaSparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(6, 20);
        this.angle = random(-16, 16);
        this.phase = random(360);
        this.hue = random() < 0.70 ? 48 : 347;
        this.glow = 0;
        this.previous = 0;
    }

    update(val) {
        const step = constrain((deltaTime || 16.667) / 16.667, 0.1, 3);
        const value = constrain(Number.isFinite(val) ? val : 0, 0, 1);
        const accent = Math.max(0, value - this.previous);
        this.previous = value;
        this.glow = Math.max(this.glow * pow(0.91, step), constrain(accent * 10, 0, 1));
        this.phase = (this.phase + 0.85 * step) % 360;
    }

    render() {
        const s = this.size * (0.82 + (sin(this.phase) + 1) * 0.09 + this.glow * 0.75);
        push();
        translate(this.x, this.y + sin(this.phase) * 3);
        rotate(this.angle);
        stroke(0, 0, 100, 86);
        strokeWeight(1.5);
        fill(this.hue, 45, 100, 76 + this.glow * 24);
        beginShape();
        // 長い先端と短い谷を交互に置くと、四つ角の星になります。
        for (let i = 0; i < 8; i++) {
            const r = i % 2 === 0 ? s : s * 0.26;
            vertex(cos(i * 45) * r, sin(i * 45) * r);
        }
        endShape(CLOSE);
        pop();
    }
}
