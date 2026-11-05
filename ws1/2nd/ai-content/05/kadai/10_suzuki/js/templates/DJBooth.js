// ============================================================
// DJBooth（手前に置かれたDJブースの台）
// 斜め上から見下ろした「台形の天板」と、正面のLEDパネルを描くクラスです。
// 天板の上には左右のCD（CyberDisc）が乗り、真ん中にミキサーがあります。
// 低音が強いほど、ネオンのふちとLEDメーターが明るく光ります。
//
// 使い方：
//   new DJBooth(x, y)     … (x, y) を天板の中心にする
//   booth.update(val)     … val に 0.0〜1.0 の音のエネルギーを渡す（おすすめ：smoothBass）
//   booth.render()        … 描画する
// ============================================================
class DJBooth {
    constructor(x, y) {
        // 天板の中心
        this.x = x;
        this.y = y;

        // 天板の形（奥の辺は短く、手前の辺は長い → 斜め上から見た台形になる）
        this.backY = y - height * 0.14;    // 奥の辺の高さ
        this.frontY = y + height * 0.14;   // 手前の辺の高さ
        this.backW = width * 0.36;         // 奥の辺の半分の幅
        this.frontW = width * 0.48;        // 手前の辺の半分の幅

        this.hue = random(180, 200); // シアン系のネオン
        this.val = 0;
        this.noiseSeed = random(1000);
    }

    update(val) {
        // なめらかに追いかけて、チラつきをおさえる
        this.val = lerp(this.val, val, 0.5);
    }

    render() {
        push();
        let x = this.x;
        let a = 40 + this.val * 60; // ネオンの明るさ

        // ---- 正面のパネル（天板の手前の辺から画面下まで） ----
        noStroke();
        fill(250, 40, 6);
        quad(x - this.frontW, this.frontY, x + this.frontW, this.frontY,
             x + this.frontW, height, x - this.frontW, height);

        // ---- 天板（台形） ----
        fill(250, 30, 11);
        quad(x - this.backW, this.backY, x + this.backW, this.backY,
             x + this.frontW, this.frontY, x - this.frontW, this.frontY);

        blendMode(ADD);

        // 天板のふちのネオンライン（奥の辺・手前の辺・左右の辺）
        noFill();
        stroke(this.hue, 80, 100, a * 0.3);
        strokeWeight(8);
        line(x - this.frontW, this.frontY, x + this.frontW, this.frontY);
        stroke(this.hue, 30, 100, a);
        strokeWeight(2);
        line(x - this.frontW, this.frontY, x + this.frontW, this.frontY);
        stroke(this.hue, 60, 100, a * 0.6);
        strokeWeight(1.5);
        line(x - this.backW, this.backY, x + this.backW, this.backY);
        line(x - this.backW, this.backY, x - this.frontW, this.frontY);
        line(x + this.backW, this.backY, x + this.frontW, this.frontY);

        // 正面パネルのLEDイコライザー（音が強いほどバーが高く伸びる）
        let bars = 40;
        let panelH = height - this.frontY;
        let barW = (this.frontW * 1.6) / bars;
        noStroke();
        for (let i = 0; i < bars; i++) {
            let n = noise(this.noiseSeed + i * 0.15, frameCount * 0.04);
            let h = panelH * (0.08 + this.val * 0.75 * n);
            let bx = x - this.frontW * 0.8 + (i + 0.5) * barW;
            // 左から右へ、シアン → マゼンタのグラデーション
            let hue = map(i, 0, bars - 1, 180, 320);
            fill(hue, 80, 100, 30 + this.val * 60);
            rect(bx, height - h / 2 - panelH * 0.1, barW * 0.6, h);
        }

        // 正面パネルの横ライン（ブースの飾り）
        stroke(this.hue, 60, 100, a * 0.5);
        strokeWeight(1);
        line(x - this.frontW, this.frontY + panelH * 0.12, x + this.frontW, this.frontY + panelH * 0.12);

        // ---- 真ん中のミキサー（天板の上の小さな台形） ----
        this.drawMixer(x, this.y);

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }

    // 天板の中央にミキサーを描く
    drawMixer(cx, cy) {
        let w = width * 0.045;   // ミキサーの半分の幅
        let d = height * 0.1;    // ミキサーの奥行き（半分）

        // ミキサー本体
        blendMode(BLEND);
        noStroke();
        fill(250, 30, 5);
        quad(cx - w * 0.85, cy - d, cx + w * 0.85, cy - d, cx + w, cy + d, cx - w, cy + d);
        blendMode(ADD);

        // レベルメーター：左右2列の目盛りが、音の強さに合わせて下から点灯する
        let segs = 10;
        for (let col = -1; col <= 1; col += 2) {
            for (let i = 0; i < segs; i++) {
                let t = i / segs;
                let sy = lerp(cy + d * 0.8, cy - d * 0.8, t); // 下から上へ
                let lit = t < this.val;                       // 音の強さまで点灯
                // 下は緑、上にいくほど黄色 → 赤（本物のメーターの色）
                let hue = map(i, 0, segs - 1, 120, 0);
                fill(hue, 80, 100, lit ? 90 : 10);
                rect(cx + col * w * 0.4, sy, w * 0.35, d * 0.1);
            }
        }

        // ミキサーのふち
        noFill();
        stroke(this.hue, 60, 100, 50);
        strokeWeight(1);
        quad(cx - w * 0.85, cy - d, cx + w * 0.85, cy - d, cx + w, cy + d, cx - w, cy + d);
    }
}
