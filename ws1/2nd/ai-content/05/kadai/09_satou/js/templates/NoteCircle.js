class NoteCircle {
    constructor(hue, speed, size) {
        // 線の動きは画面中央から始めます。
        this.x = width / 2;
        this.y = height / 2;

        this.hue = hue;
        this.speed = speed;
        this.size = size;

        // NOTE_MAPから、どのキーで作られた線かを調べます。
        const noteKey = Object.keys(NOTE_MAP).find(
            (key) => NOTE_MAP[key].hue === hue
        );
        this.keyCode = noteKey ? noteKey.toUpperCase().charCodeAt(0) : null;

        this.rotation = random(360);
        this.phase = random(360);
        this.verticalSpeed = random(-0.5, 0.5) * (speed / 5);
        this.waveHeight = size * 0.18;

        this.lifespan = 100;
        this.fadeSpeed = 2;
    }

    update() {
        // 線の位置と波の位相を少しずつ動かし、うねる動きを作ります。
        this.y += this.verticalSpeed;
        this.phase += this.speed * 0.8;
        this.rotation += this.speed * 0.25;

        // 線が画面の外へ出ないよう、上下端で折り返します。
        if (this.y < 0 || this.y > height) {
            this.verticalSpeed *= -1;
            this.y = constrain(this.y, 0, height);
        }

        // 対応するキーを押している間は表示を保ち、離すと徐々に消します。
        const keyIsHeld = this.keyCode !== null && keyIsDown(this.keyCode);
        if (keyIsHeld) {
            this.lifespan = 100;
        } else {
            this.lifespan -= this.fadeSpeed;
        }
    }

    render() {
        push();
        translate(this.x, this.y);
        noFill();

        // 画面の左端から右端まで、位相の異なる3本の波線を描きます。
        const segmentCount = Math.max(40, Math.ceil(width / 12));
        const segmentWidth = width / segmentCount;
        const alpha = constrain(this.lifespan, 0, 100);

        strokeWeight(1.5);
        for (let lineIndex = -1; lineIndex <= 1; lineIndex++) {
            stroke(this.hue, 75, 100, alpha * (1 - Math.abs(lineIndex) * 0.2));
            beginShape();

            for (let i = 0; i <= segmentCount; i++) {
                const screenX = i * segmentWidth;
                const localX = screenX - this.x;
                const wave = sin(
                    localX * 0.7 + this.phase + this.rotation + lineIndex * 35
                );
                const lineY = lineIndex * this.size * 0.12 + wave * this.waveHeight;
                vertex(localX, lineY);
            }

            endShape();
        }

        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
