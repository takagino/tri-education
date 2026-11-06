/** Neon 808 pulse: a faceted core with a hard-edged halo. */
class Orb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = random(24, 62);
        this.hue = random(278, 315);
        this.timeOffset = random(1000);
        this.speed = random(0.004, 0.012);
        this.pulseSpeed = random(3, 6);
        this.rotation = random(360);
        this.sides = floor(random(5, 8));
    }

    update(bass) {
        this.timeOffset += this.speed * (1 + bass * 7);
        this.pulse = sin(frameCount * (this.pulseSpeed + bass * 5)) * (5 + bass * 24);
        this.currentHue = (this.hue + bass * 28) % 360;
        this.rotation += 0.15 + bass * 1.8;
        this.currentBass = bass;
    }

    render() {
        let moveX = (noise(this.timeOffset) - 0.5) * 130;
        let moveY = (noise(this.timeOffset + 100) - 0.5) * 130;
        let size = max(4, this.baseSize + this.pulse);

        push();
        translate(this.x + moveX, this.y + moveY);
        rotate(this.rotation);
        noStroke();

        // Layered diamond/polygon halos make each bass hit read like a flash.
        fill(this.currentHue, 90, 100, 12 + this.currentBass * 22);
        this.polygon(size * 2.4, this.sides);
        fill(this.currentHue, 85, 100, 22 + this.currentBass * 28);
        this.polygon(size * 1.65, this.sides);
        fill((this.currentHue + 35) % 360, 35, 100, 92);
        this.polygon(size, this.sides);

        // Bright center slit evokes a kick transient / 808 meter.
        fill(0, 0, 100, 80);
        rect(0, 0, max(2, size * 0.08), size * 0.55, 2);
        pop();
    }

    polygon(diameter, sides) {
        beginShape();
        for (let i = 0; i < sides; i++) {
            let a = (360 / sides) * i;
            vertex(cos(a) * diameter / 2, sin(a) * diameter / 2);
        }
        endShape(CLOSE);
    }
}
