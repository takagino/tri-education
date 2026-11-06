/** Staggered neon hit rings with a segmented, percussive trap look. */
class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(8, 38);
        this.maxRadius = random(100, 220);
        this.speed = random(0.8, 1.8);
        this.hue = random(185, 205);
        this.weight = random(1.5, 3);
        this.phase = random(360);
    }

    update(treble) {
        this.radius += this.speed * (1 + treble * 2.5);
        if (this.radius > this.maxRadius + treble * 70) {
            this.radius = random(4, 16);
            this.phase = random(360);
        }

        this.currentHue = (this.hue + treble * 26) % 360;
        let limit = this.maxRadius + treble * 70;
        let progress = this.radius / limit;
        this.alpha = map(progress, 0, 1, 88, 8);
        this.currentTreble = treble;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(this.phase);
        noFill();

        // Dashed angular rings feel more like strobe hits than soft water ripples.
        for (let ring = 0; ring < 3; ring++) {
            let r = this.radius + ring * 10;
            let segments = 12;
            stroke(this.currentHue, 85, 100, this.alpha * (1 - ring * 0.24));
            strokeWeight(max(0.8, this.weight - ring * 0.45));
            for (let i = 0; i < segments; i++) {
                if ((i + ring) % 3 === 1) continue;
                let a1 = (360 / segments) * i;
                let a2 = a1 + (360 / segments) * 0.64;
                line(cos(a1) * r, sin(a1) * r, cos(a2) * r, sin(a2) * r);
            }
        }

        // A few bright ticks flash on high-frequency transients.
        stroke((this.currentHue + 45) % 360, 35, 100, this.alpha * (0.35 + this.currentTreble * 0.65));
        strokeWeight(1.5 + this.currentTreble * 2);
        for (let i = 0; i < 8; i++) {
            let a = i * 45;
            let inner = this.radius + 12;
            let outer = inner + 5 + this.currentTreble * 12;
            line(cos(a) * inner, sin(a) * inner, cos(a) * outer, sin(a) * outer);
        }
        pop();
    }
}
