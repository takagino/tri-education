
class NoteStar {
    constructor(hue, speed, size) {
        // Starting position: screen center
        this.x = width / 2;
        this.y = height / 2;

        // Random flying direction
        let angle = random(360);

        this.vx = cos(angle) * speed;
        this.vy = sin(angle) * speed;

        // Star properties
        this.size = size;
        this.hue = hue;

        // Rotation
        this.rotation = random(360);
        this.rotationSpeed = random(-5, 5);

        // Twinkle effect
        this.twinkle = random(0, 360);
        this.twinkleSpeed = random(5, 12);

        // Lifetime
        this.lifespan = 100;
        this.fadeSpeed = 1.2;
    }

    update() {
        // Move outward
        this.x += this.vx;
        this.y += this.vy;

        // Rotate
        this.rotation += this.rotationSpeed;

        // Twinkle
        this.twinkle += this.twinkleSpeed;

        // Fade away
        this.lifespan -= this.fadeSpeed;
    }

    render() {
        push();

        translate(this.x, this.y);
        rotate(this.rotation);

        noStroke();

        // Star brightness changes over time
        let brightness = map(
            sin(this.twinkle),
            -1, 1,
            50, 100
        );

        // Star size slightly changes while twinkling
        let currentSize = map(
            sin(this.twinkle),
            -1, 1,
            this.size * 0.6,
            this.size
        );

        // Draw glowing color
        fill(
            this.hue,
            70,
            brightness,
            this.lifespan
        );

        // Five-point star
        star(0, 0, currentSize * 0.25, currentSize, 5);

        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
