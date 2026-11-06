
class CrystalObject {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;

        this.baseSize = random(25, 50);
        this.size = this.baseSize;

        this.rotation = random(0, 360);
        this.rotationSpeed = random(-2, 2);

        this.shake = 0;
        this.glow = 0;

        this.hue = random([180, 190, 210, 260]);

        this.vertices = [];

        let count = floor(random(5, 9));

        for (let i = 0; i < count; i++) {
            let angle = map(i, 0, count, 0, 360);
            let radius = random(0.65, 1.3);

            this.vertices.push({
                x: cos(angle) * radius,
                y: sin(angle) * radius
            });
        }

        // 音の変化を記録
        this.previousEnergy = 0;

        // ビート演出
        this.pulse = 0;
    }

    update(bass, mid, treble) {

        // 担当する音域
        let energy = this.type === 0 ? bass :
            this.type === 1 ? mid : treble;

        // 音の急上昇を検出
        let rise = energy - this.previousEnergy;

        if (rise > 0.015 && energy > 0.12) {
            this.pulse = 1;
        }

        this.pulse *= 0.78;

        this.previousEnergy = energy;

        // 低音：激しく巨大化・縮小
        if (this.type === 0) {
            let targetSize =
                this.baseSize +
                bass * 100 +
                this.pulse * 60;

            this.size = lerp(this.size, targetSize, 0.45);

            this.rotation += this.rotationSpeed + bass * 4;
        }

        // 中音：激しく回転・サイズ変化
        if (this.type === 1) {
            this.rotation +=
                this.rotationSpeed +
                mid * 25 +
                this.pulse * 15;

            let targetSize =
                this.baseSize +
                mid * 65 +
                this.pulse * 30;

            this.size = lerp(this.size, targetSize, 0.4);
        }

        // 高音：激しく振動・発光
        if (this.type === 2) {
            let targetShake =
                treble * 30 +
                this.pulse * 20;

            this.shake = lerp(
                this.shake,
                targetShake,
                0.5
            );

            this.glow = lerp(
                this.glow,
                treble + this.pulse,
                0.4
            );

            let targetSize =
                this.baseSize +
                treble * 60 +
                this.pulse * 35;

            this.size = lerp(this.size, targetSize, 0.45);

            this.rotation +=
                this.rotationSpeed +
                treble * 12;
        }

        // 発光を少しずつ戻す
        this.glow *= 0.96;
    }

    render() {
        push();

        translate(
            this.x + random(-this.shake, this.shake),
            this.y + random(-this.shake, this.shake)
        );

        rotate(this.rotation);

        // 発光
        drawingContext.shadowBlur =
            15 + this.glow * 45 + this.pulse * 30;

        drawingContext.shadowColor =
            color(this.hue, 100, 100);

        // 結晶本体
        fill(
            this.hue,
            75,
            100,
            20 + this.glow * 50
        );

        stroke(
            this.hue,
            45,
            100,
            70 + this.pulse * 30
        );

        strokeWeight(1.5 + this.pulse * 2);

        beginShape();

        for (let v of this.vertices) {
            vertex(
                v.x * this.size,
                v.y * this.size
            );
        }

        endShape(CLOSE);

        // 内側の鋭いライン
        stroke(0, 0, 100, 70 + this.pulse * 30);
        strokeWeight(1 + this.pulse);

        for (let i = 0; i < this.vertices.length; i++) {
            let v = this.vertices[i];

            line(
                0,
                0,
                v.x * this.size,
                v.y * this.size
            );
        }

        drawingContext.shadowBlur = 0;

        pop();
    }
}
