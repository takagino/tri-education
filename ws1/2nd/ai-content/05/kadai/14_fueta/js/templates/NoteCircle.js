class NoteCircle {
    // ① 引数で「色相(hue)」「速さ(speed)」「大きさ(size)」を受け取る
    constructor(hue, speed, size) {
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(360);
        //let speed = 5;
        this.vx = cos(angle) * speed; // 引数のスピードを直接設定
        this.vy = sin(angle) * speed;
        this.size = size;     // 引数のサイズを設定
        this.hue = hue;       // 引数の色相を設定
        this.lifespan = 100;
        this.fadeSpeed = 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifespan -= this.fadeSpeed;
    }

    render() {
        push();
        translate(this.x, this.y);
        noStroke();

        const life = constrain(this.lifespan / 100, 0, 1);
        const easeOut = 1 - (1 - life) * (1 - life);
        const currentSize = this.size * easeOut;

        // 外側のぼんやりした光から、中心へ重ねる
        fill(this.hue, 70, 100, life * 5);
        circle(0, 0, currentSize * 2.4);

        fill(this.hue, 75, 100, life * 18);
        circle(0, 0, currentSize * 1.6);

        fill(this.hue, 65, 100, life * 45);
        circle(0, 0, currentSize);

        // 明るい中心を加えて、光らせる
        fill(this.hue, 20, 100, life * 85);
        circle(0, 0, currentSize * 0.38);

        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}