/** 中音で回転が速くなる、レモンの輪切り。 */
class LemonSlice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(90, 150);
        this.angle = random(360);
        this.spin = random(0.10, 0.23) * (random() < 0.5 ? 1 : -1);
        this.hue = random(48, 53);
        this.phase = random(360);
        this.energy = 0;
    }

    update(val) {
        const step = constrain((deltaTime || 16.667) / 16.667, 0.1, 3);
        this.energy = lerp(this.energy, constrain(Number.isFinite(val) ? val : 0, 0, 1), 0.16);
        this.angle = (this.angle + this.spin * (1 + this.energy * 5) * step) % 360;
        this.phase = (this.phase + 0.52 * step) % 360;
    }

    render() {
        const d = this.size * (1 + this.energy * 0.16);
        push();
        translate(this.x, this.y + sin(this.phase) * 6);

        // 水色の影と白い縁で、シールのように輪切りを浮かせます。
        noStroke();
        fill(194, 40, 62, 12);
        circle(3, 7, d * 1.06);
        fill(51, 6, 100);
        circle(0, 0, d * 1.07);
        rotate(this.angle);
        fill(this.hue, 76, 99);
        circle(0, 0, d);
        fill(52, 22, 100);
        circle(0, 0, d * 0.86);

        // 果肉のすき間から白い薄皮が見えるよう、扇形を並べます。
        for (let i = 0; i < 8; i++) {
            fill(this.hue - 3 + i % 3 * 2, 48 + i % 2 * 15, 100);
            arc(0, 0, d * 0.77, d * 0.77, i * 45 + 2.7, (i + 1) * 45 - 2.7, PIE);

            // 小さなしずく状の果肉を、房の内側に散らします。
            push();
            rotate(i * 45 + 22.5);
            fill(54, 17, 100, 72);
            ellipse(d * 0.26, -d * 0.034, d * 0.087, d * 0.026);
            ellipse(d * 0.30, d * 0.04, d * 0.065, d * 0.022);
            pop();
        }
        fill(52, 11, 100);
        circle(0, 0, d * 0.098);
        noFill();
        stroke(54, 12, 100, 84);
        strokeWeight(Math.max(1.5, d * 0.014));
        arc(0, 0, d * 0.93, d * 0.93, 192, 251);
        pop();
    }
}
