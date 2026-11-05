// 画面いっぱいに散りばめた、小さな音同期の四つ星
class PrismBloom {
    constructor(x, y) {
        this.stars = [];
        this.bass = 0;
        this.mid = 0;
        this.treble = 0;

        for (let i = 0; i < 110; i++) {
            this.stars.push({
                x: random(),
                y: random(),
                size: random(1.5, 4.5),
                phase: random(360),
                rotation: random(360),
                hue: random([42, 185, 205, 275, 320]),
                drift: random(0.4, 1.5)
            });
        }
    }

    update(bass, mid, treble) {
        this.bass = bass;
        this.mid = mid;
        this.treble = treble;
    }

    render() {
        push();
        blendMode(ADD);
        noStroke();

        for (const star of this.stars) {
            const twinkle = 0.5 + 0.5 * sin(frameCount * star.drift + star.phase);
            const x = star.x * width + sin(frameCount * 0.12 + star.phase) * (2 + this.mid * 10);
            const y = star.y * height + cos(frameCount * 0.1 + star.phase) * (2 + this.mid * 8);
            const size = star.size * (0.75 + twinkle * 0.65 + this.bass * 0.45);
            const alpha = 22 + twinkle * 42 + this.treble * 34;

            // 小さな色付きの光のにじみ
            fill(star.hue, 45, 100, alpha * 0.16);
            circle(x, y, size * (3 + this.treble * 1.5));

            // 四つの先端を持つ星
            push();
            translate(x, y);
            rotate(star.rotation + frameCount * 0.08 + this.mid * 12);
            fill(star.hue, 25, 100, alpha);
            beginShape();
            for (let point = 0; point < 8; point++) {
                const angle = point * 45;
                const radius = point % 2 === 0 ? size : size * 0.22;
                vertex(cos(angle) * radius, sin(angle) * radius);
            }
            endShape(CLOSE);

            fill(0, 0, 100, 35 + this.treble * 45);
            circle(0, 0, size * 0.24);
            pop();
        }

        blendMode(BLEND);
        pop();
    }
}
