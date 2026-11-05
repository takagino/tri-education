class LightningBolt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = random(height * 0.25, height * 0.45);
        this.segmentCount = floor(random(9, 16));
        this.hue = random([48, 55, 190]);
        this.fallSpeed = random(3, 5);
        this.angle = random(-4, 4);
        this.lifespan = 100;
        this.points = [{ x: 0, y: 0 }];
        this.branches = [];

        // 折れ線の頂点と、小さな枝分かれをランダムに作ります。
        for (let i = 1; i <= this.segmentCount; i++) {
            const previous = this.points[i - 1];
            const nextY = (this.length / this.segmentCount) * i;
            const nextX = previous.x + random(-this.length * 0.07, this.length * 0.07);
            this.points.push({ x: nextX, y: nextY });

            if (i < this.segmentCount && random() < 0.3) {
                const branchLength = random(this.length * 0.04, this.length * 0.12);
                this.branches.push({
                    x1: nextX,
                    y1: nextY,
                    x2: nextX + random([-1, 1]) * branchLength,
                    y2: nextY + branchLength * random(0.35, 0.8)
                });
            }
        }
    }

    update(val) {
        const energy = constrain(val, 0, 1);
        // 音が強いほど落下が速く、雷の揺れも大きくなります。
        this.y += this.fallSpeed + energy * 7;
        this.x += sin(frameCount * 8 + this.length) * (0.5 + energy * 2);
        this.lifespan -= 0.8;
        this.energy = energy;
    }

    render() {
        const alpha = constrain(this.lifespan, 0, 100);
        const energy = this.energy || 0;

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        noFill();

        // 複数の太さと透明度で重ね、光っているように描きます。
        for (let layer = 3; layer >= 0; layer--) {
            const weight = 2 + energy * 4 + layer * 3;
            const layerAlpha = alpha * (layer === 0 ? 1 : 0.18);
            stroke(this.hue, 35 + energy * 35, 100, layerAlpha);
            strokeWeight(weight);

            beginShape();
            for (const point of this.points) {
                vertex(point.x, point.y);
            }
            endShape();

            for (const branch of this.branches) {
                line(branch.x1, branch.y1, branch.x2, branch.y2);
            }
        }
        pop();
    }

    isDead() {
        return this.lifespan <= 0 || this.y - this.length > height;
    }
}
