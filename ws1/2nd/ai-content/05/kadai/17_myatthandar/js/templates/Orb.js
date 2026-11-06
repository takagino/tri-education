/**
 * Orb.js - 発光オーブの設計図（描画部品テンプレート）
 */
class Orb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = random(20, 60);
        this.hue = random(180, 260);
        this.timeOffset = random(1000);
        this.speed = random(0.005, 0.02);
        this.pulseSpeed = random(2, 4); // 呼吸のスピード（度数法）
    }

    update(sensor) {
        // 手を近づけると移動スピードが加速
        this.timeOffset += this.speed * (1 + sensor * 3);

        // 手を近づけると脈動が激しくなり、サイズも大きく膨張
        let pulseScale = 12 + sensor * 30;
        this.pulse = sin(frameCount * (this.pulseSpeed + sensor * 3)) * pulseScale;

        // 手を近づけると色相が青からマゼンタ・ピンクへシフト
        this.currentHue = (this.hue + sensor * 100) % 360;
    }

    render() {
        let moveX = (noise(this.timeOffset) - 0.5) * 200;
        let moveY = (noise(this.timeOffset + 100) - 0.5) * 200;

        push();
        translate(this.x + moveX, this.y + moveY);

        fill(this.hue, 80, 100, 30);
        circle(0, 0, (this.baseSize + this.pulse) * 1.8);

        fill(this.hue, 60, 100, 90);
        circle(0, 0, this.baseSize + this.pulse);
        pop();
    }
}