/** 低音の拍で、ふわっと弾むソーダの氷。 */
class SodaIce {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(42, 78);
        this.angle = random(-32, 32);
        this.phase = random(360);
        this.energy = 0;
    }

    update(val) {
        const step = constrain((deltaTime || 16.667) / 16.667, 0.1, 3);
        const target = constrain(Number.isFinite(val) ? val : 0, 0, 1);
        this.energy = lerp(this.energy, target, target > this.energy ? 0.32 : 0.10);
        this.phase = (this.phase + 0.8 * step) % 360;
    }

    render() {
        const s = this.size * (1 + this.energy * 0.18);
        push();
        translate(this.x, this.y + sin(this.phase) * 5 - this.energy * 8);
        rotate(this.angle + sin(this.phase) * 7);
        rectMode(CENTER);
        noStroke();
        fill(193, 49, 71, 12);
        rect(3, 5, s, s, s * 0.22);

        // 半透明の四角に、白い反射と青い面を重ねます。
        stroke(193, 36, 75, 46);
        strokeWeight(1.3);
        fill(191, 13, 100, 74);
        rect(0, 0, s, s, s * 0.22);
        noStroke();
        fill(190, 30, 90, 38);
        rect(s * 0.055, s * 0.08, s * 0.70, s * 0.63, s * 0.14);
        fill(185, 3, 100, 87);
        rect(-s * 0.075, -s * 0.31, s * 0.49, s * 0.075, s * 0.0375);
        rect(-s * 0.32, -s * 0.11, s * 0.075, s * 0.31, s * 0.0375);
        fill(188, 10, 100, 77);
        circle(s * 0.20, s * 0.16, s * 0.105);
        pop();
    }
}
