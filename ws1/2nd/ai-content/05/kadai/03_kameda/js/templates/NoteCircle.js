/**
 * NeonKaleido クラス（うまぴょいウイニングライブ仕様）
 * ビートに合わせてジャンプし、ゴールドの星・ハート波形・虹色レーザーを放つ
 */
class NeonKaleido {
    constructor(x, y) {
        this.x = x;
        this.baseY = y;
        this.y = y;

        // 横方向へ駆け抜ける疾走スピード
        this.vx = random(2.5, 6.0);

        // 基本サイズ
        this.baseRadius = random(45, 95);
        this.currentRadius = this.baseRadius;

        // 回転角度とスピード
        this.angle = random(0, 360);
        this.baseRotSpeed = random(1.5, 3.5) * (random() > 0.5 ? 1 : -1);

        // 星の頂点数（5角星または6角星）
        this.points = random([5, 6]);

        // ライブらしい華やかな初期カラー（ピンク・ゴールド・シアン・グリーン）
        this.baseHue = random([330, 350, 45, 55, 140, 190]);
        this.currentHue = this.baseHue;

        this.energy = 0;
        this.bouncePhase = random(0, 360);
    }

    update(val) {
        this.energy = constrain(val, 0.0, 1.0);

        // 1. 「うまぴょい！」の縦ノリジャンプ（音が強いほど高く跳ねる）
        this.bouncePhase += 8 + this.energy * 25;
        let jumpOffset = abs(sin(this.bouncePhase)) * (15 + this.energy * 90);
        this.y = this.baseY - jumpOffset;

        // 2. 右方向へ全力ダッシュ（音が強いとさらに加速）
        this.x += this.vx * (1 + this.energy * 3.5);
        if (this.x > width + this.baseRadius * 2) {
            this.x = -this.baseRadius * 2;
            this.baseY = random(height * 0.15, height * 0.85);
        }

        // 3. ビートで一気に膨張（キレのあるサイズ変化）
        let targetRadius = this.baseRadius * (0.8 + pow(this.energy, 1.2) * 1.8);
        this.currentRadius = lerp(this.currentRadius, targetRadius, 0.45);

        // 4. 高速スピン＆虹色シフト
        this.angle += this.baseRotSpeed * (1 + this.energy * 8);
        this.currentHue = (this.baseHue + frameCount * 2 + this.energy * 120) % 360;
    }

    render() {
        push();
        translate(this.x, this.y);
        blendMode(ADD);

        // --- レイヤー1：ビートが強い時に弾ける虹色紙吹雪レーザー ---
        if (this.energy > 0.25) {
            push();
            rotate(this.angle * 0.5);
            let rayCount = this.points * 2;
            for (let i = 0; i < rayCount; i++) {
                let a = (360 / rayCount) * i;
                let rayHue = (this.currentHue + i * 30) % 360;
                stroke(rayHue, 85, 100, map(this.energy, 0.25, 1, 20, 95));
                strokeWeight(2 + this.energy * 4);

                let r1 = this.currentRadius * 0.5;
                let r2 = this.currentRadius * (1.1 + this.energy * 0.8);
                line(cos(a) * r1, sin(a) * r1, cos(a) * r2, sin(a) * r2);
            }
            pop();
        }

        // --- レイヤー2：外周のキラキラ波形リング（ホットピンク＆ゴールド） ---
        push();
        rotate(-this.angle);
        noFill();
        stroke(this.currentHue, 80, 100, 85);
        strokeWeight(2 + this.energy * 4);

        beginShape();
        for (let a = 0; a < 360; a += 6) {
            let wave = sin(a * this.points * 2 + frameCount * 10) * (this.currentRadius * 0.25 * this.energy);
            let r = this.currentRadius * 0.85 + wave;
            vertex(cos(a) * r, sin(a) * r);
        }
        endShape(CLOSE);
        pop();

        // --- レイヤー3：中心で輝くウイニング・スター（星型） ---
        push();
        rotate(this.angle);
        // 外側の発光（ゴールド〜ピンク）
        fill(45, 90, 100, 35 + this.energy * 50);
        stroke(50, 80, 100, 95);
        strokeWeight(2 + this.energy * 3);

        beginShape();
        let totalVertices = this.points * 2;
        for (let i = 0; i < totalVertices; i++) {
            let a = (360 / totalVertices) * i;
            let r = (i % 2 === 0)
                ? this.currentRadius * 0.75
                : this.currentRadius * 0.3;
            vertex(cos(a) * r, sin(a) * r);
        }
        endShape(CLOSE);

        // 中心の純白ハイライト
        noStroke();
        fill(0, 0, 100, 70 + this.energy * 30);
        circle(0, 0, this.currentRadius * 0.25);
        pop();

        pop();
    }
}