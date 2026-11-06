
class NoteBubble {
    constructor(hue, speed, size) {
        // Random starting position
        this.x = random(width * 0.2, width * 0.8);
        this.y = height / 2;

        this.speed = speed * 0.5;

        this.size = size;
        this.hue = hue;

        this.alpha = 100;
        this.lifespan = 100;
        this.fadeSpeed = 0.8;

        // Floating movement
        this.offset = random(360);
        this.wobbleSpeed = random(1, 3);
    }

    update() {
        // Move upward
        this.y -= this.speed;

        // Move gently left and right
        this.x += sin(this.offset) * 1.5;
        this.offset += this.wobbleSpeed;

        // Gradually disappear
        this.lifespan -= this.fadeSpeed;
    }

    render() {
        push();

        translate(this.x, this.y);

        noFill();
        stroke(this.hue, 60, 100, this.lifespan);
        strokeWeight(2);

        let currentSize = map(
            this.lifespan,
            100, 0,
            this.size, 0
        );

        // Bubble body
        circle(0, 0, currentSize);

        // Small highlight
        noStroke();
        fill(0, 0, 100, this.lifespan);

        circle(
            -currentSize * 0.2,
            -currentSize * 0.2,
            currentSize * 0.18
        );

        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
