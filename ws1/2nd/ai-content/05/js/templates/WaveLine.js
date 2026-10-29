class WaveLine {
    constructor(y, optY) {
        // 引数が (y) でも (x, y) でも正しくY座標を受け取れるように設定
        this.y = (optY !== undefined) ? optY : y;
        this.baseHue = random(140, 210);    // エメラルド〜シアン系の初期色相
        this.speed = random(0.015, 0.035);  // 横に流れる基本スピード
        this.timeOffset = random(1000);     // ノイズ用の固有の時間
        this.step = 16;                     // 折れ線の細かさ（ピクセル間隔）
    }

    // ★ センサー値（0.0 〜 1.0）を受け取って計算
    update(sensor) {
        // 手が近づくほど波が流れるスピードが加速
        this.timeOffset += this.speed * (1 + sensor * 4);

        // ★ 手が近づくほど振れ幅（折れ線の上下の揺れ）が急拡大！
        // 遠いときは穏やかな波（±15px）、手が近づくと激しい折れ線スパイク（±160px）に！
        this.amplitude = map(sensor, 0, 1, 15, 160);

        // 手が近づくと金色やネオンマゼンタへと色が劇的に変化
        this.currentHue = (this.baseHue + sensor * 150) % 360;

        // 手が近づくと線が太く・明るく発光
        this.strokeW = map(sensor, 0, 1, 1.5, 4.0);
        this.alpha = map(sensor, 0, 1, 50, 95);
    }

    render() {
        push();
        noFill();
        stroke(this.currentHue, 80, 100, this.alpha);
        strokeWeight(this.strokeW);

        // 画面の左端（x = 0）から右端（x = width）まで line() で折れ線を繋ぐ
        let prevX = 0;
        let prevY = this.y + (noise(this.timeOffset) - 0.5) * this.amplitude;

        for (let x = this.step; x <= width; x += this.step) {
            // パーリンノイズで各ポイントの高さを決定（折れ線の波形）
            let n = noise(this.timeOffset + x * 0.006);
            let currY = this.y + (n - 0.5) * this.amplitude;

            // 前の点と現在の点を line() で結んで折れ線グラフにする
            line(prevX, prevY, x, currY);

            prevX = x;
            prevY = currY;
        }

        pop();
    }
}
