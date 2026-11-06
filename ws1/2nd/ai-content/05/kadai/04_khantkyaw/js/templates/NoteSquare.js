
class NoteSquare {
    constructor(hue, speed, size) {
        // Start from the center
        this.x = width / 2;
        this.y = height / 2;

        // Random direction
        let angle = random(360);

        this.vx = cos(angle) * speed;
        this.vy = sin(angle) * speed;

        this.size = size;
        this.hue = hue;

        this.rotation = random(360);
        this.rotationSpeed = random(-3, 3);

        this.lifespan = 100;
        this.fadeSpeed = 1.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.rotation += this.rotationSpeed;

        this.lifespan -= this.fadeSpeed;
    }

    render() {
        push();

        translate(this.x, this.y);
        rotate(this.rotation);

        rectMode(CENTER);
        noStroke();

        let currentSize = map(
            this.lifespan,
            100, 0,
            this.size, 0
        );

        fill(this.hue, 80, 100, this.lifespan);

        square(0, 0, currentSize);

        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
