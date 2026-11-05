// ============================================================
// WaveLine（サイバーパンク風・デジタルオシロスコープ）
// 画面の左端から右端まで、カクカクした階段状のネオン波形を描く部品です。
// 光の点（スキャナー）が左から右へ走り、音が強いと波が大きく暴れて、
// 色ズレした「残像」の線も現れます。
//
// 使い方：
//   new WaveLine(y)       … 高さ y の位置に1本作る（(x, y) で渡してもOK）
//   line.update(val)      … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothMid）
//   line.render()         … 描画する
// ============================================================
class WaveLine {
    constructor(y, optY) {
        // 引数が (y) でも (x, y) でも正しくY座標を受け取れるようにする
        this.y = (optY !== undefined) ? optY : y;

        // サイバーパンクらしい色（シアン・紫・マゼンタ）
        this.hue = random([180, 290, 320]);

        this.speed = random(0.015, 0.035);  // 波が流れる基本スピード
        this.timeOffset = random(1000);     // noise 用の時間
        this.step = 16;                     // 階段1段の横幅（ピクセル）

        // 左から右へ走るスキャナー（光の点）の位置
        this.scanX = random(width);

        this.val = 0;
        this.amplitude = 15;
    }

    update(val) {
        this.val = val;

        // ① 音が強いほど波が速く流れる
        this.timeOffset += this.speed * (1 + val * 4);

        // ② 音が強いほど波の振れ幅が大きくなる（静か：±15px 〜 強い：±180px）
        this.amplitude = map(val, 0, 1, 15, 180);

        // ③ スキャナーを右へ進める（右端まで行ったら左端へ戻る）
        this.scanX += 6 + val * 20;
        if (this.scanX > width) {
            this.scanX = 0;
        }
    }

    // x の位置の波の高さを計算する（noise で自然な凸凹にする）
    waveY(x) {
        let n = noise(this.timeOffset + x * 0.006);
        // 高さを 6px 単位に丸めて、デジタルっぽいカクカクにする
        return this.y + round(((n - 0.5) * this.amplitude) / 6) * 6;
    }

    // 階段状（横 → 縦 → 横 …）の折れ線を描く
    drawSteps(offsetY) {
        beginShape();
        let prevY = this.waveY(0) + offsetY;
        vertex(0, prevY);
        for (let x = this.step; x <= width + this.step; x += this.step) {
            let y = this.waveY(x) + offsetY;
            vertex(x, prevY); // まず横に進む
            vertex(x, y);     // 次に縦に上がる／下がる
            prevY = y;
        }
        endShape();
    }

    render() {
        push();
        blendMode(ADD); // 光を足し算で重ねてネオンっぽく
        noFill();
        strokeJoin(MITER);

        let a = 40 + this.val * 60; // 音が強いほど明るい

        // 音が強いときは、上下にずれた色違いの「残像」線を出す（グリッチ風）
        if (this.val > 0.35) {
            let off = this.val * 10;
            stroke((this.hue + 40) % 360, 90, 100, a * 0.35);
            strokeWeight(1.5);
            this.drawSteps(-off);
            stroke((this.hue + 320) % 360, 90, 100, a * 0.35);
            this.drawSteps(off);
        }

        // 外側の光（太くて薄い）
        stroke(this.hue, 80, 100, a * 0.25);
        strokeWeight(6 + this.val * 6);
        this.drawSteps(0);

        // 芯（細くて明るい）
        stroke(this.hue, 30, 100, a);
        strokeWeight(1.5 + this.val * 1.5);
        this.drawSteps(0);

        // スキャナー：縦の細い光の線と、波の上を走る光の点
        let sy = this.waveY(this.scanX);
        stroke(this.hue, 60, 100, 15 + this.val * 25);
        strokeWeight(1);
        line(this.scanX, sy - this.amplitude, this.scanX, sy + this.amplitude);

        noStroke();
        fill(this.hue, 60, 100, 40);
        circle(this.scanX, sy, 14 + this.val * 20);
        fill(0, 0, 100, 90);
        circle(this.scanX, sy, 4 + this.val * 4);

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }
}
