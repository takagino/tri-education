/**
 * Kadai（きらめく流れ星）クラス
 * 高音帯域（smoothTreble）のエネルギー値にリアルタイム反応し、
 * スピード、尾の伸び、回転、火花の放散がダイナミックに変化します。
 */
class Kadai {
    /**
     * コンストラクタ
     * @param {number} x - 初期発進位置 X
     * @param {number} y - 初期発進位置 Y
     */
    constructor(x, y) {
        // 基準位置・軌道の初期設定
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;

        // 移動速度と進行角度（DEGREES指定）
        this.angle = random(15, 45); // 右下に向かって流れる角度
        this.baseSpeed = random(6, 12);
        this.currentSpeed = this.baseSpeed;

        // 星の回転用プロパティ
        this.rotation = random(360);       // 現在の回転角度
        this.baseRotSpeed = random(-2, 2); // 基本の回転速度
        this.currentRotSpeed = this.baseRotSpeed;

        // ビジュアル属性（HSBカラー：オレンジ〜黄色の範囲）
        this.hue = random(15, 55);
        this.size = random(4, 8);

        // 履歴（尾の描画用）
        this.trail = [];
        this.maxTrailLength = 20;

        // 高音トリガーで放出される火花粒子群
        this.sparks = [];

        // 画面外に出てからの再セット用フラグ
        this.active = true;
    }

    /**
     * 毎フレームの状態更新
     * @param {number} val - smoothTreble の値 (0.0 〜 1.0)
     */
    update(val) {
        // 高音エネルギー（val）に基づく動的な変化の計算
        // 1. 高音が鳴ると移動スピードが急加速
        this.currentSpeed = this.baseSpeed + val * 25;

        // 2. 高音が鳴ると回転スピードも急加速
        let rotDir = this.baseRotSpeed >= 0 ? 1 : -1;
        this.currentRotSpeed = (this.baseRotSpeed + val * 15) * rotDir;
        this.rotation += this.currentRotSpeed;

        // 3. 軌跡の履歴を記録（高音が高いほど尾が長く伸びる）
        this.trail.push({ x: this.x, y: this.y, val: val });
        let currentMaxTrail = floor(map(val, 0, 1, 10, this.maxTrailLength));
        while (this.trail.length > currentMaxTrail) {
            this.trail.shift();
        }

        // 4. 移動（角度に応じたベクトル移動）
        this.x += cos(this.angle) * this.currentSpeed;
        this.y += sin(this.angle) * this.currentSpeed;

        // 5. 高音のピーク時（val > 0.4）に火花を爆発的に放出
        if (val > 0.4) {
            let sparkCount = floor(map(val, 0.4, 1.0, 1, 5));
            for (let i = 0; i < sparkCount; i++) {
                this.sparks.push({
                    x: this.x,
                    y: this.y,
                    vx: cos(this.angle + random(-60, 60)) * random(-2, -8),
                    vy: sin(this.angle + random(-60, 60)) * random(-2, -8),
                    life: 1.0,
                    hue: (this.hue + random(-15, 15) + 360) % 360,
                    size: random(2, 6) * val
                });
            }
        }

        // 6. 火花粒子の更新
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            let s = this.sparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.life -= 0.05; // 徐々に消滅
            if (s.life <= 0) {
                this.sparks.splice(i, 1);
            }
        }

        // 画面外に出たら左上〜上部のランダム位置にリセット
        if (this.x > width + 100 || this.y > height + 100) {
            this.resetPosition();
        }
    }

    /**
     * 画面外に出た際の再配置
     */
    resetPosition() {
        if (random(1) < 0.5) {
            this.x = random(-width * 0.2, width * 0.5);
            this.y = -50;
        } else {
            this.x = -50;
            this.y = random(-height * 0.2, height * 0.5);
        }
        this.trail = [];
        this.hue = random(15, 55);
    }

    /**
     * 星を描画するヘルパーメソッド（DEGREESモード対応）
     */
    drawStar(radius1, radius2, npoints) {
        let angle = 360 / npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < 360; a += angle) {
            let sx = cos(a) * radius2;
            let sy = sin(a) * radius2;
            vertex(sx, sy);
            let sx2 = cos(a + halfAngle) * radius1;
            let sy2 = sin(a + halfAngle) * radius1;
            vertex(sx2, sy2);
        }
        endShape(CLOSE);
    }

    /**
     * 描画処理
     */
    render() {
        push();

        // 加算合成で光の輝きを表現
        blendMode(ADD);
        noStroke();

        // ------------------------------------
        // A. 尾（Trail）の描画（彩度を下げて淡く）
        // ------------------------------------
        for (let i = 0; i < this.trail.length; i++) {
            let pt = this.trail[i];
            let alpha = map(i, 0, this.trail.length, 0, 60);
            let tSize = map(i, 0, this.trail.length, 1, this.size * (1 + pt.val));

            fill(this.hue, 40, 100, alpha); // 彩度を 80 → 40 に
            circle(pt.x, pt.y, tSize);
        }

        // ------------------------------------
        // B. 放出された火花（Sparks）の描画（彩度を下げて淡く）
        // ------------------------------------
        for (let s of this.sparks) {
            fill(s.hue, 50, 100, s.life * 80); // 彩度を 90 → 50 に
            circle(s.x, s.y, s.size * s.life);
        }

        // ------------------------------------
        // C. 流れ星の頭部（星の回転描画）
        // ------------------------------------
        translate(this.x, this.y);
        rotate(this.rotation);

        // 星型（彩度を下げて、中心を白っぽく輝かせる）
        fill(this.hue, 30, 100, 100); // 彩度を 70 → 30 に
        this.drawStar(this.size * 0.8, this.size * 2.2, 5);

        pop();
    }
}