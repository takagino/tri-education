class Orb {
    constructor(x, y) {
        this.x = x;                         // 初期X座標（引数から代入）
        this.y = y;                         // 初期Y座標（引数から代入）
        this.baseSize = random(20, 60);     // ランダムな基本サイズ
        this.hue = random(180, 260);        // 青〜紫系のランダムな色相
        this.timeOffset = random(1000);     // ノイズ用の固有の時間
        this.speed = random(0.005, 0.02);   // ゆらめきのスピード
        this.pulseSpeed = random(2, 4);     // 呼吸のスピード（度数法）
    }

    update(sensor) {
        // 手を近づけると移動スピードが加速
        this.timeOffset += this.speed * (1 + sensor * 3);

        // 手を近づけると脈動が激しくなり、サイズも大きく膨張
        let pulseScale = 12 + sensor * 100;
        this.pulse = sin(frameCount * (this.pulseSpeed + sensor * 3)) * pulseScale;

        // 手を近づけると色相が青からマゼンタ・ピンクへシフト
        this.currentHue = (this.hue + sensor * 100) % 360;
    }

    // 3. 描画メソッド
    render() {
        // 個体ごとのノイズ座標を計算
        let moveX = (noise(this.timeOffset) - 0.5) * 200;
        let moveY = (noise(this.timeOffset + 100) - 0.5) * 200;

        push();
        translate(this.x + moveX, this.y + moveY);

        // 外側の光
        fill(this.hue, 80, 100, 30);
        circle(0, 0, (this.baseSize + this.pulse) * 1.8);

        // 中心の核
        fill(this.hue, 60, 100, 90);
        circle(0, 0, this.baseSize + this.pulse);
        pop();
    }
}
