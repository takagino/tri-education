/**
 * NoteCircle：osc.jsからの入力を楽譜へ渡す接続役。
 * 音符はMusicScoreが五線上に描くため、移動アニメーションは行いません。
 * 既存メインが呼ぶconstructor / update / render / isDeadは維持します。
 */
class NoteCircle {
    constructor(hue, speed, size) {
        this.hue = ((Number(hue) || 0) % 360 + 360) % 360;
        this.speed = speed; // osc.jsとの互換性のため引数を保持。
        this.size = size; // 楽譜の音符の大きさはScoreNote側で統一。
        this.lifespan = 100;

        // この時点で音符を記録し、最初から五線上の正しい位置に置きます。
        const received = MusicScore.receive(this.hue);
        this.entry = received.note;
        const point = MusicScore.position(this.entry, MusicScore.layout(width, height));
        this.x = point.x;
        this.y = point.y;
    }

    update() {
        // 接続役は次のフレームで片付けますが、楽譜の音符は残ります。
        this.lifespan = 0;
    }

    render() {
        push();
        translate(this.x, this.y);
        // 音符はMusicScoreから一度だけ描き、移動や重複表示を防ぎます。
        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
