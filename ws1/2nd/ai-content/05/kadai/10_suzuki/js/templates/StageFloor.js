// ============================================================
// StageFloor（奥へ続くネオンのステージの床）
// 地平線の一点（消失点）に向かって線が集まる「遠近法のグリッド」を描き、
// 床が手前へ流れてくるように動かすクラスです。画面に奥行き（3D感）を出します。
// 低音が強いほど、床が速く流れて明るく光ります。
//
// 使い方：
//   new StageFloor(x, y)   … (x, y) を消失点（地平線の中心）にする
//   floor.update(val)      … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothBass）
//   floor.render()         … 描画する
// ============================================================
class StageFloor {
    constructor(x, y) {
        // 消失点（線が集まる地平線上の点）
        this.x = x;
        this.y = y;

        this.hue = random(270, 300); // 紫系のグリッド
        this.scroll = 0;             // 床が手前へ流れる量（0〜1をくり返す）
        this.rows = 18;              // 横線の本数
        this.cols = 28;              // 奥へ伸びる縦線の本数
        this.val = 0;
    }

    update(val) {
        this.val = val;

        // ① 床を手前へ流す：音が強いほど速い
        this.scroll += 0.01 + val * 0.05;
        if (this.scroll >= 1) {
            this.scroll -= 1;
        }
    }

    render() {
        push();
        blendMode(ADD);
        let depth = height - this.y; // 地平線から画面下までの高さ

        // 地平線のぼんやりした光（奥のステージが光っているイメージ）
        noStroke();
        for (let k = 0; k < 6; k++) {
            fill(this.hue + 20, 80, 100, 3 + this.val * 4);
            rect(width / 2, this.y, width, 10 + k * 25);
        }

        // 奥へ伸びる縦線：消失点から画面下の端まで放射状に引く
        strokeWeight(1);
        for (let i = 0; i <= this.cols; i++) {
            let bottomX = map(i, 0, this.cols, -width, width * 2);
            stroke(this.hue, 80, 100, 15 + this.val * 30);
            line(this.x, this.y, bottomX, height);
        }

        // 横線：遠いほど間隔がせまくなるように、1 / z で位置を決める（遠近法）
        for (let i = 0; i < this.rows; i++) {
            let z = i + 1 - this.scroll;  // 奥行き（1 が一番手前、大きいほど奥）
            let y = this.y + depth / z;   // 奥ほど地平線に近づく
            let a = (20 + this.val * 60) / z + 5; // 奥ほど暗くする
            stroke(this.hue, 70, 100, a);
            strokeWeight(2 / z + 0.5);    // 奥ほど細くする
            line(0, y, width, y);
        }

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }
}
