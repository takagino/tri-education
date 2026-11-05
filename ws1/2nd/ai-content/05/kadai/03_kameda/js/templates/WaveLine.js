class WaveLine {
    constructor(y, optY) {
        this.y = (optY !== undefined) ? optY : y;
        // Y座標の高さに応じて綺麗に7色の虹（レインボー）になるよう色相を配置
        this.baseHue = map(this.y, 0, height, 0, 320);
        this.speed = random(0.04, 0.08);   // 疾走感を出すためスピードアップ
        this.timeOffset = random(1000);
        this.step = 14;
    }

    update(sensor) {
        // ボーカルやメロディが盛り上がると猛スピードで駆け抜ける
        this.timeOffset += this.speed * (1 + sensor * 8);

        // 振れ幅もダイナミックに変化
        this.amplitude = map(sensor, 0, 1, 20, 220);

        // 虹色が流れるように色相を回転
        this.currentHue = (this.baseHue + frameCount * 1.5 + sensor * 90) % 360;

        this.strokeW = map(sensor, 0, 1, 2.0, 6.0);
        this.alpha = map(sensor, 0, 1, 55, 100);
    }

    render() {
        push();
        blendMode(ADD);
        noFill();
        stroke(this.currentHue, 85, 100, this.alpha);
        strokeWeight(this.strokeW);

        let prevX = 0;
        let prevY = this.y + (noise(this.timeOffset) - 0.5) * this.amplitude;

        for (let x = this.step; x <= width; x += this.step) {
            let n = noise(this.timeOffset + x * 0.008);
            let currY = this.y + (n - 0.5) * this.amplitude;
            line(prevX, prevY, x, currY);
            prevX = x;
            prevY = currY;
        }
        pop();
    }
}