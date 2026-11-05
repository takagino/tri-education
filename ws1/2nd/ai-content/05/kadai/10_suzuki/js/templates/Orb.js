// ============================================================
// Orb（サイバーパンク風・ネオンスピーカーノード）
// 六角形のネオン枠の中で光の核が脈打つ「スピーカー」のような部品です。
// 低音（キック）が鳴った瞬間に、衝撃波リングとグリッチ（色ズレ）が起きます。
//
// 使い方：
//   new Orb(x, y)     … (x, y) のあたりに1個作る
//   orb.update(val)   … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothBass）
//   orb.render()      … 描画する
// ============================================================
class Orb {
    constructor(x, y) {
        // 基準の位置（実際は noise でふわふわ漂う）
        this.x = x;
        this.y = y;

        // サイバーパンクらしい色（シアン・青・紫・マゼンタ・ピンク）からランダムに選ぶ
        this.hue = random([180, 200, 280, 310, 330]);

        // 基本サイズと今のサイズ
        this.baseSize = random(20, 50);
        this.size = this.baseSize;

        // 六角形の回転角と、ふだんの回転速度
        this.angle = random(360);
        this.spin = random(-1, 1);

        // 漂う動きのための値（noise 用の時間）
        this.timeOffset = random(1000);
        this.speed = random(0.005, 0.015);

        // 音の状態を覚えておく変数
        this.val = 0;
        this.prevVal = 0; // 1フレーム前の値（キックの瞬間を見つけるため）
        this.kick = 0;    // 衝撃波の強さ（1 → 0 に減っていく）
        this.glitch = 0;  // グリッチ（色ズレ）が残っているフレーム数
    }

    update(val) {
        this.val = val;

        // ① 漂うスピード：音が強いほど速く動く
        this.timeOffset += this.speed * (1 + val * 3);

        // ② 回転：音が強いほど六角形が速く回る
        this.angle += this.spin * (1 + val * 10);

        // ③ サイズ：音が強いほど大きくふくらむ（lerp でなめらかに）
        this.size = lerp(this.size, this.baseSize * (1 + val * 1.2), 0.3);

        // ④ 音が「急に強くなった瞬間」（キック）を見つける
        if (val - this.prevVal > 0.04 && val > 0.4) {
            this.kick = 1;    // 衝撃波スタート
            this.glitch = 6;  // 6フレームだけ色ズレさせる
        }

        // ⑤ 衝撃波とグリッチを少しずつ弱める
        this.kick *= 0.9;
        this.glitch--;

        this.prevVal = val;
    }

    render() {
        // noise で、基準位置のまわりをふわふわ漂わせる
        let moveX = (noise(this.timeOffset) - 0.5) * 200;
        let moveY = (noise(this.timeOffset + 100) - 0.5) * 200;

        push();
        translate(this.x + moveX, this.y + moveY);
        blendMode(ADD); // 光を足し算で重ねてネオンっぽく

        let s = this.size;

        // 後ろのぼんやりした光
        noStroke();
        fill(this.hue, 80, 100, 12 + this.val * 25);
        circle(0, 0, s * 2.2);

        // キックの衝撃波リング（広がりながら薄くなる）
        if (this.kick > 0.05) {
            noFill();
            stroke(this.hue, 50, 100, this.kick * 80);
            strokeWeight(2);
            circle(0, 0, s * (1 + (1 - this.kick) * 4));
        }

        push();
        rotate(this.angle);
        noFill();

        // グリッチ中は、シアンとマゼンタの六角形を左右にずらして重ねる（色ズレ）
        if (this.glitch > 0) {
            let off = random(3, 8);
            strokeWeight(1.5);
            stroke(180, 100, 100, 70);
            this.hexagon(off, 0, s * 0.6);
            stroke(310, 100, 100, 70);
            this.hexagon(-off, 0, s * 0.6);
        }

        // 六角形のネオン枠（太くて薄い光 ＋ 細くて明るい芯）
        stroke(this.hue, 80, 100, 30);
        strokeWeight(4 + this.val * 6);
        this.hexagon(0, 0, s * 0.6);
        stroke(this.hue, 30, 100, 70 + this.val * 30);
        strokeWeight(1.5 + this.val * 2);
        this.hexagon(0, 0, s * 0.6);
        pop();

        // 中心の光る核（音が強いほど大きく明るい）
        noStroke();
        fill(this.hue, 40, 100, 50 + this.val * 50);
        circle(0, 0, s * 0.4 * (1 + this.val));
        fill(0, 0, 100, 60 + this.val * 40);
        circle(0, 0, s * 0.15);

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }

    // 中心 (cx, cy)・半径 r の六角形を描く
    hexagon(cx, cy, r) {
        beginShape();
        for (let i = 0; i < 6; i++) {
            let a = i * 60;
            vertex(cx + cos(a) * r, cy + sin(a) * r);
        }
        endShape(CLOSE);
    }
}
