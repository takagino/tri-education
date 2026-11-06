class NoteCircle {
    constructor(hue, speed, size) {
        this.centerX = width / 2;
        this.centerY = height / 2;

        this.hue = hue;
        this.speed = speed;
        this.size = size;

        this.lineCount = 40;
        this.lines = [];

        for (let i = 0; i < this.lineCount; i++) {
            let length;

            // 短い線を多めに生成
            let type = random();

            if (type < 0.55) {
                length = random(2, 15);
            } else if (type < 0.85) {
                length = random(15, 50);
            } else {
                length = random(50, 150);
            }

            this.lines.push({
                angle: random(360),
                length: length,
                distance: random(10, 50),
                speed: random(5, 15),
                weight: random(0.5, 2.5)
            });
        }

        this.progress = random(0.05, 0.25);
        this.speedZ = random(0.008, 0.025) * (speed / 5);

        this.lifespan = 100;
    }

    update() {
        this.progress += this.speedZ;
        this.lifespan -= 0.5;
    }

    render() {
        push();

        translate(this.centerX, this.centerY);

        let scaleSize = this.progress * this.progress * 8;

        for (let particle of this.lines) {
            push();

            rotate(particle.angle);

            let start = particle.distance * scaleSize;
            let end = start + particle.length * scaleSize;

            stroke(this.hue, 80, 100, this.lifespan);
            strokeWeight(particle.weight * this.progress);
            strokeCap(ROUND);

            line(start, 0, end, 0);

            pop();
        }

        // 中心の黒い円
        noStroke();
        fill("#000");
        circle(0, 0, 100);

        pop();
    }

    isDead() {
        return this.progress >= 1 || this.lifespan <= 0;
    }
}