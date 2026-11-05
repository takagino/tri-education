// ============================================================
// CyberDisc（DJブースの回るCD）
// 大きなCDがターンテーブルの上で回転し、音に合わせて
// CDのふちから波紋が広がっていくクラスです。
//
// 使い方：
//   new CyberDisc(x, y)    … (x, y) の位置にCDを1枚作る（画面の左右に置くのがおすすめ）
//   disc.update(val)       … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothTreble）
//   disc.render()          … 描画する
// ============================================================
class CyberDisc {
    constructor(x, y) {
        // CDの中心位置
        this.x = x;
        this.y = y;

        // サイバーパンクらしい色：左のCDはシアン系、右のCDはマゼンタ系にする
        this.hue = (x < width / 2) ? random(180, 200) : random(300, 320);

        // CDの大きさ（直径）：画面の大きさに合わせて大きめにする
        this.baseSize = min(width * 0.36, height * 0.75) * random(0.97, 1.03);
        this.size = this.baseSize;

        // 傾き：CDを斜め上から見下ろしているように、縦方向をこの割合につぶす
        // （1 で真上から、0 に近いほど真横から見た形になる）
        this.tilt = 0.42;

        // 回転：左のCDは右回り、右のCDは左回り（向かい合う2台のターンテーブル）
        this.angle = random(360);
        this.baseSpin = (x < width / 2) ? 1.2 : -1.2;

        // CDから広がる波紋のリスト
        this.ripples = [];
        this.rippleTimer = 0; // 静かなときも、ゆっくり波紋を出すためのタイマー

        // 音の状態を覚えておく変数
        this.val = 0;      // 今のエネルギー
        this.prevVal = 0;  // 1フレーム前のエネルギー（急に強くなったか調べるため）
        this.cooldown = 0; // 波紋を出しすぎないための待ち時間
        this.flash = 0;    // 強い音が来た瞬間のフラッシュの明るさ

        // イコライザーの揺れ方を CD ごとに変えるための値
        this.noiseSeed = random(1000);
    }

    update(val) {
        this.val = val;

        // ① 回転：音が強いほどスクラッチのように速く回る
        this.angle += this.baseSpin * (1 + val * 10);

        // ② サイズ：音が強いほど少しふくらむ（lerp でなめらかに追いかける）
        this.size = lerp(this.size, this.baseSize * (1 + val * 0.12), 0.3);

        // ③ 音が「急に強くなった瞬間」（ビート）に、強い波紋とフラッシュを出す
        //    1回のビートで3重の波紋を、少しずつ間をあけて出す
        if (val - this.prevVal > 0.02 && val > 0.25 && this.cooldown <= 0) {
            for (let k = 0; k < 3; k++) {
                this.emitRipple(true, -k * this.size * 0.06);
            }
            this.flash = 100;
            this.cooldown = 5; // 5フレームは次のビート波紋を出さない
        }
        // 強い音が続いているあいだは、さらに追加で波紋を出し続ける
        if (val > 0.5 && random() < val * 0.3) {
            this.emitRipple(true, 0);
        }

        // ④ 静かなときも、一定間隔で波紋を出す（音が強いほど間隔が短い）
        this.rippleTimer++;
        if (this.rippleTimer > 16 - val * 12) {
            this.emitRipple(false, 0);
            this.rippleTimer = 0;
        }

        // ⑤ 波紋を広げて、だんだん薄くする
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            let r = this.ripples[i];
            r.radius += 3 + val * 10; // 音が強いほど速く広がる
            r.alpha -= r.fade;
            if (r.alpha <= 0) {
                this.ripples.splice(i, 1); // 見えなくなったら消す
            }
        }

        // ⑥ フラッシュを少しずつ暗くし、待ち時間を減らす
        this.flash *= 0.85;
        this.cooldown--;

        this.prevVal = val;
    }

    // 波紋を1つ追加する
    //   strong … true ならビートの強い波紋
    //   offset … 広がり始める位置のずらし（マイナスにすると少し遅れて出てくる）
    emitRipple(strong, offset) {
        this.ripples.push({
            radius: this.size * 0.5 + offset,     // CDのふちから広がり始める
            alpha: strong ? 100 : 70,             // 弱い波紋もはっきり見える濃さにする
            fade: strong ? 1.1 : 0.9,             // 消えていく速さ（小さいほど遠くまで残る）
            weight: strong ? random(4, 8) : 2.5,  // 線の太さ
            dashed: strong && random() < 0.4,     // 強い波紋の一部は点線（デジタル風）
            hueShift: random([0, 30, -30])        // 色を少しずらして変化をつける
        });
        // 波紋が増えすぎないように上限を決めておく
        if (this.ripples.length > 60) {
            this.ripples.shift();
        }
    }

    render() {
        push();
        translate(this.x, this.y); // CDの中心へ移動
        scale(1, this.tilt);       // 縦につぶして、テーブルに寝かせたCDを斜め上から見た形にする
                                   // （ここから下で描く波紋やイコライザーも、すべてCDと同じ面に寝る）
        blendMode(ADD);            // 光を「足し算」で重ねて、ライブの照明のように光らせる
        this.drawRipples();

        blendMode(BLEND);          // ターンテーブルの側面（厚み）はふつうの重ね方で描く
        this.drawPlatterSide();

        blendMode(ADD);
        this.drawEqualizer();

        blendMode(BLEND);          // CD本体はふつうの重ね方で描く
        this.drawDisc();

        // 強い音の瞬間のフラッシュ（白い光）
        if (this.flash > 1) {
            blendMode(ADD);
            noStroke();
            fill(this.hue, 20, 100, this.flash * 0.2);
            circle(0, 0, this.size * 1.15);
        }

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }

    // ---- CDから広がる波紋 ----
    drawRipples() {
        noFill();
        for (let r of this.ripples) {
            if (r.radius <= 0) continue; // まだ出てきていない（遅れて出る）波紋は描かない
            let h = (this.hue + r.hueShift + 360) % 360;
            let d = r.radius * 2;

            // 外側の光（太くてやや薄い）
            stroke(h, 90, 100, r.alpha * 0.45);
            strokeWeight(r.weight * 3.5);
            circle(0, 0, d);

            // 中間の光（色の濃い部分）
            stroke(h, 85, 100, r.alpha * 0.8);
            strokeWeight(r.weight * 1.6);
            circle(0, 0, d);

            // 芯（明るい線）
            stroke(h, 40, 100, r.alpha);
            strokeWeight(r.weight * 0.8);
            if (r.dashed) {
                // 点線の波紋：短い弧を36個並べ、CDと一緒に回す
                for (let k = 0; k < 36; k++) {
                    let start = k * 10 + this.angle * 0.3;
                    arc(0, 0, d, d, start, start + 5);
                }
            } else {
                circle(0, 0, d);
            }
        }
    }

    // ---- CDのまわりのイコライザー（放射状のバー） ----
    drawEqualizer() {
        let bars = 72;
        let inner = this.size * 0.56; // バーの根元（CDの少し外側）
        strokeWeight(3);
        for (let i = 0; i < bars; i++) {
            // noise でバーごとに長さをばらつかせる（音が強いほど長い）
            let n = noise(this.noiseSeed + i * 0.2, frameCount * 0.05);
            let len = this.size * (0.02 + this.val * 0.25 * n);
            let ang = i * (360 / bars);

            stroke(this.hue, 80, 100, 25 + this.val * 70);
            line(cos(ang) * inner, sin(ang) * inner,
                 cos(ang) * (inner + len), sin(ang) * (inner + len));
        }
    }

    // ---- ターンテーブルの側面（厚み）：立体に見せるための部分 ----
    drawPlatterSide() {
        let s = this.size * 1.06;
        // 画面上で s * 0.05 の厚みに見えるように、つぶした分（tilt）で割っておく
        let th = (this.size * 0.05) / this.tilt;

        // 上の面を下にずらした円と、そのあいだを長方形でうめて「円柱」にする
        noStroke();
        fill(250, 30, 3);
        rect(0, th / 2, s, th);
        circle(0, th, s);

        // 側面の下のふちのネオンライン（手前側の半分だけ見える）
        noFill();
        stroke(this.hue, 80, 100, 30 + this.val * 50);
        strokeWeight(3);
        arc(0, th, s, s, 0, 180);
    }

    // ---- CD本体（ターンテーブルの上で回るCD） ----
    drawDisc() {
        let s = this.size;

        // ターンテーブルの台の上の面（回らない黒いお皿）
        noStroke();
        fill(0, 0, 4);
        circle(0, 0, s * 1.06);

        // 台のふちのネオンリング（音が強いほど太く明るい）
        noFill();
        stroke(this.hue, 80, 100, 50 + this.val * 50);
        strokeWeight(2 + this.val * 6);
        circle(0, 0, s * 1.06);

        push();
        rotate(this.angle); // ここから下はCDと一緒に回る

        // CDの盤面（銀色っぽい暗いグレー）
        noStroke();
        fill(this.hue, 10, 18);
        circle(0, 0, s);

        // データ面の細かいすじ（同心円）
        noFill();
        stroke(0, 0, 60, 18);
        strokeWeight(0.7);
        for (let d = s * 0.4; d < s * 0.98; d += s * 0.025) {
            circle(0, 0, d);
        }

        // 虹色の反射（向かい合う2か所の扇形）… CDが回るとキラッと光って見える
        blendMode(ADD);
        noStroke();
        for (let k = 0; k < 6; k++) {
            let h = (this.hue + k * 25) % 360;
            fill(h, 70, 100, 6 + this.val * 10);
            arc(0, 0, s * 0.98, s * 0.98, k * 6, 30 + k * 6, PIE);
            arc(0, 0, s * 0.98, s * 0.98, 180 + k * 6, 210 + k * 6, PIE);
        }
        blendMode(BLEND);

        // 回転が分かるように、盤面にネオンの目印を4本
        stroke(this.hue, 60, 100, 60);
        strokeWeight(2);
        for (let k = 0; k < 4; k++) {
            let a = k * 90;
            line(cos(a) * s * 0.22, sin(a) * s * 0.22, cos(a) * s * 0.46, sin(a) * s * 0.46);
        }

        // 中央の透明なリング部分
        noStroke();
        fill(0, 0, 30);
        circle(0, 0, s * 0.36);

        // 中央のラベル（音が強いほど明るく光る）
        fill(this.hue, 80, 50 + this.val * 50);
        circle(0, 0, s * 0.28);

        // 真ん中の穴
        fill(0, 0, 3);
        circle(0, 0, s * 0.05);
        pop();
    }
}
