class NoteCircle {
    constructor(hue,speed,size) {
        // 画面中央からスタート
        this.x = width / 2;
        this.y = height / 2;

        // 飛び出す角度（0〜360度）をランダムに決める
        let angle = random(360);

        // 角度とスピードから、X方向・Y方向の移動量（速度ベクトル）を計算
        this.vx = cos(angle) * speed;
        this.vy = sin(angle) * speed;

        this.size = size;       // 円のサイズ
        this.hue = hue;       // 色相（0〜360）
        this.lifespan = 100;  // 寿命（100で出現し、0になると消滅する）
        this.fadeSpeed = 1.5; // 寿命が減っていく速さ
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifespan -= this.fadeSpeed; // 寿命を少しずつ減らす
    }
    render() {
        push();
        translate(this.x, this.y);
        noStroke();

        // 寿命（100〜0）に合わせて、円のサイズを this.size から 0 へ徐々に小さくする
        let currentSize = map(this.lifespan, 100, 0, this.size, 0);

        // 寿命（lifespan: 100〜0）をそのまま透明度（Alpha）として使う
        fill(this.hue, 80, 100, this.lifespan);
        circle(0, 0, currentSize);
        pop();
    }

    // 寿命が尽きたかどうかを判定するメソッド
    isDead() {
        return this.lifespan <= 0;
    }
}