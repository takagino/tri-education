class Sparkle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.phase = random(360);
        this.hue = random([42, 185, 205, 275, 320]);
        this.speed = random(0.2, 0.8);
    }

    update(sensor) {
        this.sensor = sensor;

        // センサーに近づくほど、強く速くきらめく
        this.phase += 2 + sensor * 8;
        this.y -= this.speed * (1 + sensor * 2);
        this.x += sin(this.phase) * 0.4;

        // 画面外に出たら下から再登場
        if (this.y < -20) {
            this.y = height + 20;
            this.x = random(width);
        }
    }

    render() {
        let twinkle = 0.5 + 0.5 * sin(this.phase);
        let sparkleSize = this.size * (0.5 + twinkle + this.sensor * 0.8);
        let alpha = 25 + twinkle * 45 + this.sensor * 25;

        push();
        translate(this.x, this.y);
        rotate(this.phase * 0.2);
        noStroke();

        // ぼんやりした光のにじみ
        fill(this.hue, 65, 100, alpha * 0.18);
        circle(0, 0, sparkleSize * 4);

        // 4つの光の先端を持つ星
        fill(this.hue, 25, 100, alpha);
        beginShape();
        for (let i = 0; i < 8; i++) {
            let angle = i * 45;
            let radius = i % 2 === 0 ? sparkleSize : sparkleSize * 0.18;
            vertex(cos(angle) * radius, sin(angle) * radius);
        }
        endShape(CLOSE);

        // 中心の小さな光
        fill(0, 0, 100, alpha);
        circle(0, 0, sparkleSize * 0.25);

        pop();
    }
}
