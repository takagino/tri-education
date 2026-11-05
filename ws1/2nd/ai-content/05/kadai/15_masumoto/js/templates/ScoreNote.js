/**
 * ScoreNote：楽譜に残る音符。
 * 担当：音の高さの判定、元の丸と同じ色の保存、音符の形の描画。
 * 音符には寿命を付けず、演奏履歴として保持します。
 */
class ScoreNote {
    static HUES = [0, 35, 60, 130, 190, 230, 280, 330];
    static NAMES = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ", "ド"];

    constructor(hue, index) {
        this.hue = hue;
        this.index = index;
        this.pitch = ScoreNote.findPitch(hue);
    }

    static findPitch(hue) {
        let pitch = 0;
        let closest = Infinity;
        for (let i = 0; i < ScoreNote.HUES.length; i++) {
            const distance = Math.abs(((hue - ScoreNote.HUES[i] + 540) % 360) - 180);
            if (distance < closest) {
                closest = distance;
                pitch = i;
            }
        }
        return pitch;
    }

    render(p, point, gap) {
        p.push();
        p.translate(point.x, point.y);
        const w = gap * 1.15;

        // 低いド（C4）は、五線の下に加線を1本付けます。
        if (this.pitch === 0) {
            p.stroke(215, 15, 85, 65);
            p.strokeWeight(0.9);
            p.line(-w * 0.9, 0, w * 0.9, 0);
        }
        ScoreNote.drawSymbol(p, this, w, 100, gap * 3.2);

        // 音符の下に、ドレミの名前を添えます。
        p.noStroke();
        p.fill(this.hue, 50, 100, 85);
        p.textFont("sans-serif");
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(gap * 0.75);
        p.text(ScoreNote.NAMES[this.pitch], 0, point.bottom - point.y + gap * 2.1);
        p.pop();
    }

    // 楽譜上の音符と、移動中の音符で共通の描画処理です。
    static drawSymbol(p, note, w, alpha, stemLength) {
        p.noStroke();
        p.fill(note.hue, 50, 100, alpha); // 元の丸と同じ色・彩度・明るさ。
        p.push();
        p.rotate(-20);
        p.ellipse(0, 0, w, w * 0.72);
        p.pop();

        const up = note.pitch < 6;
        const stemX = (up ? 1 : -1) * w * 0.42;
        p.stroke(note.hue, 50, 100, alpha);
        p.strokeWeight(Math.max(1, w * 0.1));
        p.line(stemX, 0, stemX, (up ? -1 : 1) * stemLength);
    }
}
