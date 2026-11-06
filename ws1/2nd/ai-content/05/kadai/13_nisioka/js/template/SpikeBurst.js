
class SpikeBurst {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        // トゲの数
        this.spikeCount = floor(random(16, 24));

        // 基本サイズ
        this.baseSize = random(45, 75);
        this.size = this.baseSize;

        // ネオンカラー
        this.hue = random(170, 310);

        // 音のエネルギー
        this.bass = 0;
        this.mid = 0;
        this.treble = 0;

        // トゲの長さ
        this.currentLengths = [];

        // トゲごとの反応倍率
        this.spikeSensitivity = [];

        // 前フレームの音
        this.previousEnergy = 0;

        // 音の衝撃
        this.impact = 0;

        // トゲごとに個性を設定
        for (let i = 0; i < this.spikeCount; i++) {
            this.currentLengths.push(0);
            this.spikeSensitivity.push(random(0.5, 1.5));
        }

        // 音への反応速度
        this.responseSpeed = 0.65;

        // トゲの鋭さ
        this.sharpness = random(0.25, 0.4);
    }

    // =================================
    // 更新処理
    // =================================

    update(bass, mid, treble) {

        this.bass = constrain(bass, 0, 1);
        this.mid = constrain(mid, 0, 1);
        this.treble = constrain(treble, 0, 1);

        // 全帯域のエネルギーを合成
        let totalEnergy =
            this.bass * 0.45 +
            this.mid * 0.35 +
            this.treble * 0.2;

        // 音の急激な上昇を検出
        let attack = max(
            0,
            totalEnergy - this.previousEnergy
        );

        // 音の衝撃
        this.impact = max(
            this.impact * 0.65,
            attack * 350
        );

        this.previousEnergy = totalEnergy;

        // 全体サイズの変化
        this.size = this.baseSize *
            (1 + totalEnergy * 2.5);

        // =================================
        // トゲの伸び縮み
        // =================================

        for (let i = 0; i < this.spikeCount; i++) {

            // 低音・中音・高音に反応
            let targetLength =
                this.bass * 180 +
                this.mid * 140 +
                this.treble * 110;

            // 音の急激な変化でさらに伸びる
            targetLength += this.impact;

            // トゲごとの反応倍率
            targetLength *= this.spikeSensitivity[i];

            // 音に素早く追従
            this.currentLengths[i] = lerp(
                this.currentLengths[i],
                targetLength,
                this.responseSpeed
            );
        }
    }

    // =================================
    // ギザギザの描画
    // =================================

    drawSpike(layerScale = 1) {

        beginShape();

        for (let i = 0; i < this.spikeCount * 2; i++) {

            let angle = map(
                i,
                0,
                this.spikeCount * 2,
                0,
                360
            );

            let index = floor(i / 2);

            let r;

            if (i % 2 === 0) {

                // 外側のトゲ
                r = this.size +
                    this.currentLengths[index];

            } else {

                // 内側の谷
                r = this.size * this.sharpness;
            }

            r *= layerScale;

            let px = cos(angle) * r;
            let py = sin(angle) * r;

            vertex(px, py);
        }

        endShape(CLOSE);
    }

    // =================================
    // 描画処理
    // =================================

    render() {

        push();

        translate(this.x, this.y);

        let energy =
            this.bass * 0.45 +
            this.mid * 0.35 +
            this.treble * 0.2;

        let h = this.hue;

        // =================================
        // 外側の発光
        // 背景用に透明度を抑える
        // =================================

        noFill();

        stroke(
            h,
            100,
            100,
            12 + energy * 35
        );

        strokeWeight(15 + energy * 10);

        this.drawSpike(1.3);

        // =================================
        // メインのトゲ
        // =================================

        stroke(
            h,
            90,
            100,
            25 + energy * 60
        );

        strokeWeight(2 + energy * 5);

        this.drawSpike(1);

        // =================================
        // 内側のトゲ
        // =================================

        stroke(
            h + 60,
            90,
            100,
            20 + energy * 55
        );

        strokeWeight(2 + energy * 2);

        this.drawSpike(0.55);

        // =================================
        // 中央のコア
        // =================================

        noStroke();

        fill(
            h,
            100,
            100,
            10 + energy * 25
        );

        circle(
            0,
            0,
            35 + energy * 100
        );

        fill(
            h + 30,
            40,
            100,
            30 + energy * 50
        );

        circle(
            0,
            0,
            8 + energy * 35
        );

        pop();
    }
}
