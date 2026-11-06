class BassBounce {
    constructor(x, y) {
        // 基準位置
        this.x = x;
        this.y = y;

        // ラインの基本設定
        this.lineCount = floor(random(4, 8));
        this.baseLength = random(30, 60);
        this.lineWidth = random(1, 2.5);

        // ラインの横方向の広がり
        this.spread = random(15, 35);

        // 上方向への動き
        this.burst = 0;
        this.jumpHeight = random(100, 220);

        // 音の変化を記録
        this.previousEnergy = 0;
        this.previousMid = 0;
        this.lastBeatTime = 0;

        // ラインごとの個性
        this.hue = random([180, 190, 210, 260]);
        this.angle = random(-12, 12);

        // 発光の強さ
        this.glow = 0;
    }

    update(bass, mid) {
        let bassRise = bass - this.previousEnergy;
        let midRise = mid - this.previousMid;

        let rise = max(bassRise, midRise);

        if (
            max(bass, mid) > 0.15 &&
            rise > 0.012 &&
            millis() - this.lastBeatTime > 350
        ) {
            this.burst = 1;
            this.lastBeatTime = millis();
        }

        this.burst *= 0.84;
        this.glow = lerp(this.glow, this.burst, 0.25);

        this.previousEnergy = bass;
        this.previousMid = mid;
    }
    render() {
        push();

        translate(this.x, this.y);

        // ビートに合わせて上方向に移動
        let jump = this.burst * this.jumpHeight;

        // ラインの長さ
        let length = this.baseLength + this.burst * 100;

        // 発光設定
        drawingContext.shadowBlur = 10 + this.glow * 25;
        drawingContext.shadowColor = color(this.hue, 90, 100);

        // ラインの描画
        for (let i = 0; i < this.lineCount; i++) {
            let offset = map(
                i,
                0,
                this.lineCount - 1,
                -this.spread,
                this.spread
            );

            // ラインごとに少し角度を変える
            let tilt = this.angle + random(-1, 1);

            // 横方向の位置
            let x = offset;

            // ビートで上方向に伸びる
            let topY = -jump - length * random(0.7, 1.3);

            // ラインの色と太さ
            stroke(
                this.hue,
                35,
                100,
                35 + this.burst * 65
            );

            strokeWeight(
                this.lineWidth + this.burst * 1.5
            );

            // 鋭いラインを描く
            line(
                x,
                0,
                x + tilt,
                topY
            );
        }

        // 中央に強いアクセントライン
        stroke(0, 0, 100, this.burst * 100);
        strokeWeight(2);

        line(
            0,
            0,
            0,
            -jump - length * 1.3
        );

        // 描画設定を戻す
        drawingContext.shadowBlur = 0;

        pop();
    }
}