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

        let currentSize = map(this.lifespan, 100, 0, this.size, 0);
        fill(this.hue, 80, 100, this.lifespan);
        circle(0, 0, currentSize);
        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}