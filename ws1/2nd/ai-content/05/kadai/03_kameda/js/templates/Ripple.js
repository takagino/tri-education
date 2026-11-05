class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(10, 40);
        this.maxRadius = random(140, 280);
        this.speed = random(2.5, 5.0);      // ハイテンポに合わせて拡散スピードを倍増
        this.hue = random([330, 45, 180]);  // ピンク・ゴールド・シアン
        this.weight = random(2.0, 4.0);
    }

    update(sensor) {
        this.energy = sensor;
        this.radius += this.speed * (1 + sensor * 6);

        if (this.radius > this.maxRadius + sensor * 180) {
            this.radius = 0;
            // リセット時に位置と色をランダムに変えて紙吹雪感を出す
            this.x = random(width * 0.1, width * 0.9);
            this.y = random(height * 0.1, height * 0.9);
        }

        this.currentHue = (this.hue + sensor * 120) % 360;
        let progress = this.radius / (this.maxRadius + sensor * 180);
        this.alpha = map(progress, 0, 1, 95, 0);
    }

    render() {
        push();
        translate(this.x, this.y);
        blendMode(ADD);
        noFill();

        // 外側のリング
        stroke(this.currentHue, 80, 100, this.alpha);
        strokeWeight(this.weight + this.energy * 3);
        circle(0, 0, this.radius * 2);

        // 内側のゴールドリング（2重波紋で華やかに）
        stroke((this.currentHue + 40) % 360, 60, 100, this.alpha * 0.7);
        strokeWeight(1.5);
        circle(0, 0, this.radius * 1.4);
        pop();
    }
}