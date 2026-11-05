// ============================================================
// NoteCircle（サイバーパンク風・回路ネオンレーザー）
// キーを押すと画面中央から、基板の配線のように
// 「まっすぐ → 45度に折れる → まっすぐ…」と進むネオンの線が走り、
// だんだん消えていきます。
// osc.js からは new NoteCircle(hue, speed, size) で作られます。
// ============================================================
class NoteCircle {
    // ① 引数で「色相(hue)」「速さ(speed)」「大きさ(size)」を受け取る
    constructor(hue, speed, size) {
        // 配線の出発点（画面中央）
        this.x = width / 2;
        this.y = height / 2;

        // 配線が走る向き：回路らしく 45度きざみ（0, 45, 90, … 315）から選ぶ
        this.angle = floor(random(8)) * 45;

        this.hue = hue;       // 色相（音ごとに色が変わる）
        this.speed = speed;   // 先端が1フレームで進む距離
        this.size = size;     // 直線の長さ・折れ幅・線の太さの基準

        // 線の太さ：size が大きいほど太い配線になる
        this.weight = map(size, 35, 110, 1.5, 4);

        // 配線の角のリスト（「進行方向を x 軸」とした座標で保存し、描画時に rotate で向きを合わせる）
        this.points = [{ x: 0, y: 0 }];
        this.head = { x: 0, y: 0 };   // 今まさに伸びている先端の位置
        this.isStraight = true;       // 次の区間が「直線」か「45度の折れ」か
        this.target = this.planNext(this.head); // 先端が向かっている次の角

        // 枝分かれ（途中から生える短い配線）のリスト
        this.branches = [];

        // 先端の四角いパッド（チップ部品風）の回転角
        this.rot = 0;

        this.lifespan = 100;  // 寿命（100 → 0 で消える）
        this.fadeSpeed = 1.3; // 1フレームで減る寿命
    }

    // 次の角の位置を決める（直線と45度の折れを交互にくり返す）
    planNext(from) {
        let next;
        if (this.isStraight) {
            // まっすぐ前へ進む区間
            let len = random(this.size * 0.6, this.size * 1.5);
            next = { x: from.x + len, y: from.y };
        } else {
            // 斜め45度に折れる区間（前に d 進むあいだに横へ d ずれる → ちょうど45度）
            let d = random(this.size * 0.2, this.size * 0.5);
            // 中心線から離れすぎたら、戻る向きに折れるようにする
            let dir;
            if (from.y > this.size * 0.6) dir = -1;
            else if (from.y < -this.size * 0.6) dir = 1;
            else dir = random() < 0.5 ? -1 : 1;
            next = { x: from.x + d, y: from.y + dir * d };
        }
        this.isStraight = !this.isStraight; // 直線と折れを交互に切り替える
        return next;
    }

    // 角 p から生える短い枝（45度に折れてから直線、先端に丸いパッド）を作る
    makeBranch(p) {
        let dir = random() < 0.5 ? -1 : 1;
        let d = random(this.size * 0.3, this.size * 0.6);
        let len = random(this.size * 0.3, this.size * 0.8);
        return [
            { x: p.x, y: p.y },
            { x: p.x + d, y: p.y + dir * d },       // 45度の折れ
            { x: p.x + d + len, y: p.y + dir * d }  // まっすぐ
        ];
    }

    update() {
        // ② 先端を speed の分だけ前に進める（1フレームで角をまたぐこともあるのでくり返す）
        let remaining = this.speed;
        while (remaining > 0) {
            let dx = this.target.x - this.head.x;
            let dy = this.target.y - this.head.y;
            let toTarget = sqrt(dx * dx + dy * dy); // 次の角までの残り距離

            if (remaining >= toTarget) {
                // 角に到着 → 角を確定して、次の角を決める
                this.head = { x: this.target.x, y: this.target.y };
                this.points.push(this.head);
                remaining -= toTarget;

                // 角に着いたとき、たまに枝分かれさせる（25%の確率）
                if (random() < 0.25) {
                    this.branches.push(this.makeBranch(this.head));
                }
                this.target = this.planNext(this.head);
            } else {
                // 角の手前まで進む
                this.head = {
                    x: this.head.x + (dx / toTarget) * remaining,
                    y: this.head.y + (dy / toTarget) * remaining
                };
                remaining = 0;
            }
        }

        // ③ 出発点も進行方向へほんの少しずつ流す（外へ走っていく感じ）
        this.x += cos(this.angle) * this.speed * 0.1;
        this.y += sin(this.angle) * this.speed * 0.1;

        // ④ 先端パッドを回転させる（速い音ほど速く回る）
        this.rot += this.speed * 2;

        // ⑤ 寿命を減らす
        this.lifespan -= this.fadeSpeed;
    }

    // 頂点リストを折れ線として描く
    drawPolyline(pts) {
        beginShape();
        for (let p of pts) {
            vertex(p.x, p.y);
        }
        endShape();
    }

    // ネオンの光を「太くて薄い線 → 細くて明るい線」の重ね塗りで描く
    drawNeonLine(pts, a, scale) {
        stroke(this.hue, 90, 100, a * 0.15); // 外側のぼんやりした光
        strokeWeight(this.weight * 5 * scale);
        this.drawPolyline(pts);

        stroke(this.hue, 85, 100, a * 0.4);  // 中間の光
        strokeWeight(this.weight * 2.2 * scale);
        this.drawPolyline(pts);

        stroke(this.hue, 25, 100, a);        // 中心の芯（白に近い色）
        strokeWeight(this.weight * scale);
        this.drawPolyline(pts);
    }

    render() {
        push();
        translate(this.x, this.y); // 配線の出発点へ移動
        rotate(this.angle);        // 進行方向へ回転（angleMode は DEGREES）
        blendMode(ADD);            // 光を足し算で重ねてネオンっぽく
        noFill();
        strokeJoin(ROUND);
        strokeCap(ROUND);

        let a = this.lifespan;     // 透明度は lifespan を利用

        // 確定した角 ＋ 今伸びている先端までを1本の配線として描く
        let trace = this.points.concat([this.head]);
        this.drawNeonLine(trace, a, 1);

        // 枝分かれ（細め・少し暗め）と、その先の丸いパッド
        for (let b of this.branches) {
            this.drawNeonLine(b, a * 0.7, 0.6);
            let end = b[b.length - 1];
            stroke(this.hue, 40, 100, a * 0.8);
            strokeWeight(this.weight * 0.8);
            circle(end.x, end.y, this.weight * 4);
        }

        // 角ごとの小さな点（ビア＝基板の穴のイメージ）
        noStroke();
        fill(this.hue, 30, 100, a * 0.9);
        for (let i = 1; i < this.points.length; i++) {
            circle(this.points[i].x, this.points[i].y, this.weight * 1.8);
        }

        // 先端の回転する四角いパッド（rectMode は CENTER）
        push();
        translate(this.head.x, this.head.y);
        rotate(this.rot);
        fill(this.hue, 60, 100, a * 0.4);
        square(0, 0, this.weight * 6);
        fill(this.hue, 10, 100, a);
        square(0, 0, this.weight * 2.5);
        pop();

        blendMode(BLEND); // 他のクラスに影響しないよう元に戻す
        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
