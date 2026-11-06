/**
 * MagneticCluster.js
 * 磁石のように引き合ったり反発したりする光の粒子クラス
 * 低音（smoothBass）のエネルギーに連動して粒子が外側に弾け飛び、静まると中心に引き戻されます。
 */
class MagneticCluster {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        // サブ粒子の数
        this.numParticles = 14;
        this.particles = [];

        // HSBカラーの色相（ネオンブルー〜パープル〜マゼンタ系の幻想的な色合い）
        this.hue = random(200, 320);

        // 各粒子の初期パラメータを設定
        for (let i = 0; i < this.numParticles; i++) {
            let angle = (360 / this.numParticles) * i;
            let radius = random(40, 90);
            this.particles.push({
                angle: angle,
                baseDist: radius,     // 基準となる中心からの距離
                currentDist: radius,  // 現在の距離（アニメーション用）
                size: random(4, 12),  // 粒子の大きさ
                speed: random(0.5, 2) // 回転速度の係数
            });
        }

        this.rotationAngle = 0;
        this.currentScale = 1.0;
    }

    /**
     * 毎フレームの状態更新
     * @param {number} val - 0.0 〜 1.0 の音響エネルギー（smoothBass）
     */
    update(val) {
        // 音が強く鳴るほど回転が加速する
        this.rotationAngle += 0.8 + val * 6.0;

        // 全体のスケール（低音が強い瞬間にグッと拡大）
        let targetScale = 1.0 + val * 1.8;
        this.currentScale = lerp(this.currentScale, targetScale, 0.2);

        // 各粒子の位置（磁力による伸縮）を更新
        for (let p of this.particles) {
            // 低音が強い時は外側へ反発し、弱い時は基準距離に戻る（引き合う）
            let targetDist = p.baseDist * (1.0 + val * 2.8);
            p.currentDist = lerp(p.currentDist, targetDist, 0.15);

            // 粒子自体の角度も少しずつ回転させる
            p.angle += p.speed * (0.5 + val * 2.5);
        }
    }

    /**
     * 描画処理
     */
    render() {
        push(); // スタイルと座標系をこのクラス内に限定
        translate(this.x, this.y);
        rotate(this.rotationAngle);
        scale(this.currentScale);

        // 1. 粒子同士を結ぶ幻想的な磁力線の描画
        noFill();
        strokeWeight(1);
        beginShape();
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            let px = cos(p.angle) * p.currentDist;
            let py = sin(p.angle) * p.currentDist;
            // HSBモード：色相、彩度、明度、アルファ（透明度）
            stroke(this.hue, 70, 100, 35);
            vertex(px, py);
        }
        endShape(CLOSE);

        // 2. 光の粒子の描画
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            let px = cos(p.angle) * p.currentDist;
            let py = sin(p.angle) * p.currentDist;

            noStroke();
            // 外側のグロー（光の暈）
            fill(this.hue, 60, 100, 25);
            ellipse(px, py, p.size * 3.5);

            // コアの鋭い輝き
            fill(this.hue + 30, 40, 100, 95);
            ellipse(px, py, p.size);
        }

        // 3. 中心核（磁石のコア）の描画
        noStroke();
        fill(this.hue, 80, 100, 50);
        ellipse(0, 0, 18 + this.currentScale * 6);
        fill(this.hue + 50, 20, 100, 90);
        ellipse(0, 0, 8);

        pop(); // 座標系を元に戻す
    }
}