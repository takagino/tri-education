/**
 * MusicScore：楽譜全体の管理。
 * 担当：音符の履歴、五線、段組み、スクロール、p5.jsとの接続。
 * osc.jsは1音につき3個生成するので、ここで音符1つにまとめます。
 */
class MusicScore {
    static notes = [];
    static created = 0;
    static scrollRow = null;
    static instance = null;
    static scrollHandler = null;

    static {
        // osc.jsを書き換えずに、メインの描画後へ楽譜の描画を追加します。
        p5.registerAddon((p5Class, prototype, hooks) => {
            hooks.postsetup = function () { MusicScore.mount(this); };
            hooks.postdraw = function () { MusicScore.render(this); };
            hooks.remove = function () { MusicScore.unmount(); };
        });
    }

    static mount(p) {
        MusicScore.unmount();
        MusicScore.instance = p;
        MusicScore.notes = [];
        MusicScore.created = 0;
        MusicScore.scrollRow = null;

        MusicScore.scrollHandler = (event) => {
            if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const layout = MusicScore.layout(p.width, p.height);
            if (event.key === "Home") MusicScore.scrollRow = 0;
            if (event.key === "End") MusicScore.scrollRow = null;
            if (event.key === "ArrowUp") MusicScore.scrollRow = Math.max(0, layout.firstRow - 1);
            if (event.key === "ArrowDown") {
                MusicScore.scrollRow = Math.min(layout.lastStart, layout.firstRow + 1);
            }
        };
        window.addEventListener("keydown", MusicScore.scrollHandler);
    }

    static unmount() {
        if (MusicScore.scrollHandler) {
            window.removeEventListener("keydown", MusicScore.scrollHandler);
        }
        MusicScore.scrollHandler = null;
        MusicScore.instance = null;
    }

    static receive(hue) {
        // 同じ音を続けて弾いても、3個ごとに新しい音符を追加します。
        const isLeader = MusicScore.created++ % 3 === 0;
        if (isLeader) {
            MusicScore.notes.push(new ScoreNote(hue, MusicScore.notes.length));
            MusicScore.scrollRow = null;
        }
        return { note: MusicScore.notes[MusicScore.notes.length - 1], isLeader };
    }

    static layout(w, h) {
        const gap = Math.max(9, Math.min(16, w / 65));
        const margin = Math.max(16, Math.min(48, w * 0.05));
        const left = margin;
        const right = w - margin;
        const noteStart = left + gap * 5.8;
        const spacing = Math.max(28, Math.min(56, gap * 3.8));
        const columns = Math.max(1, Math.floor((right - noteStart - gap) / spacing) + 1);
        const rowHeight = gap * 9.5;
        const visibleRows = Math.max(1, Math.floor((h - 120) / rowHeight));
        const totalRows = Math.max(1, Math.ceil(MusicScore.notes.length / columns));
        const lastStart = Math.max(0, totalRows - visibleRows);
        const firstRow = MusicScore.scrollRow === null
            ? lastStart : Math.max(0, Math.min(lastStart, MusicScore.scrollRow));
        return { gap, left, right, noteStart, spacing, columns, rowHeight, visibleRows, firstRow, lastStart };
    }

    static position(note, layout) {
        const row = Math.floor(note.index / layout.columns);
        const column = note.index % layout.columns;
        const top = 88 + (row - layout.firstRow) * layout.rowHeight;
        const bottom = top + layout.gap * 4;
        // ト音記号では一番下の線がミ、低いドはその1本下の加線です。
        return {
            x: layout.noteStart + column * layout.spacing,
            y: bottom + (2 - note.pitch) * layout.gap / 2,
            bottom,
            row
        };
    }

    static render(p) {
        if (!p.width || !p.height) return;
        const layout = MusicScore.layout(p.width, p.height);
        p.push();
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.angleMode(p.DEGREES);
        p.background(220, 30, 10);
        p.noStroke();
        p.textFont("sans-serif");
        p.textAlign(p.LEFT, p.CENTER);
        p.fill(0, 0, 100, 85);
        p.textSize(14);
        p.text("A / S / D / F / G / H / J / K で演奏", layout.left, 26);
        p.fill(210, 15, 95, 55);
        p.textSize(11);
        p.text("↑ ↓：楽譜をスクロール　Home / End：最初 / 最新", layout.left, 48);

        for (let row = 0; row < layout.visibleRows; row++) {
            const top = 88 + row * layout.rowHeight;
            p.stroke(215, 15, 85, 35);
            p.strokeWeight(0.8);
            for (let line = 0; line < 5; line++) {
                const y = top + line * layout.gap;
                p.line(layout.left, y, layout.right, y);
            }
            p.noStroke();
            p.fill(210, 12, 95, 85);
            p.textFont("'Apple Symbols', 'Noto Music', serif");
            p.textSize(layout.gap * 5.4);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("𝄞", layout.left + layout.gap * 1.7, top + layout.gap * 2);
        }

        // 古い音符も保存し、画面に入る段の音符だけ描きます。
        const first = layout.firstRow * layout.columns;
        const last = Math.min(MusicScore.notes.length, first + layout.visibleRows * layout.columns);
        for (let i = first; i < last; i++) {
            const note = MusicScore.notes[i];
            note.render(p, MusicScore.position(note, layout), layout.gap);
        }
        p.pop();
    }
}
