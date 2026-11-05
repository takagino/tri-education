class EdgeTrail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = this.getInwardAngle(x, y);
        this.hue = random(160, 330);
        this.speed = random(4, 8);
        this.phase = random(360);
        this.distance = 0;
        this.aspectRatio = 3.5;
        this.lifespan = 100;
        this.points = [];
        this.maxPoints = 38;
        this.maxDistance = Math.hypot(width, height) * 1.4;
    }

    getInwardAngle(x, y) {
        // 出現位置に応じて、画面の内側へ向かう角度を選びます。
        const margin = 1;
        let baseAngle;

        if (x <= margin) {
            baseAngle = 0;
        } else if (x >= width - margin) {
            baseAngle = 180;
        } else if (y <= margin) {
            baseAngle = 90;
        } else {
            baseAngle = 270;
        }

        return baseAngle + random(-55, 55);
    }

    update(val) {
        const energy = constrain(val, 0, 1);
        const speed = this.speed * (0.7 + energy * 1.8);
        this.distance += speed;
        this.lifespan -= 1.7;

        // 線の幅と高さが1:3.5になるよう、うねりの振幅を幅から決めます。
        const firstPoint = this.points.length >= this.maxPoints
            ? this.points[1]
            : this.points[0];
        const trailWidth = firstPoint
            ? Math.max(speed, this.distance - firstPoint.x)
            : speed;
        const wave = sin(this.distance * (2.2 + energy * 1.5) + this.phase);
        const localY = wave * (trailWidth / (2 * this.aspectRatio));
        this.points.push({ x: this.distance, y: localY });

        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }

    render() {
        if (this.points.length < 2) return;

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        noFill();
        strokeWeight(2 + (100 - this.lifespan) * 0.025);

        // 古い線分ほど透明にし、短い残像が尾を引くようにします。
        const fade = constrain(this.lifespan / 100, 0, 1);
        for (let i = 1; i < this.points.length; i++) {
            const trailAlpha = (i / this.points.length) * 85 * fade;
            stroke(this.hue, 75, 100, trailAlpha);
            line(
                this.points[i - 1].x,
                this.points[i - 1].y,
                this.points[i].x,
                this.points[i].y
            );
        }
        pop();
    }

    isDead() {
        return this.lifespan <= 0 || this.distance > this.maxDistance;
    }
}
