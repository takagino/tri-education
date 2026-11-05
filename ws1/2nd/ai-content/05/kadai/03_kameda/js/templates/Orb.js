class Orb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = random(18, 50);
        // ピンク・オレンジ・イエロー・ターフグリーン・シアンのカラフルなペンライト色
        this.hue = random([330, 350, 25, 50, 130, 190, 290]);
        this.currentHue = this.hue;
        this.timeOffset = random(1000);
        this.speed = random(0.02, 0.05);
        this.pulseSpeed = random(6, 12);
    }

    update(sensor) {
        this.energy = sensor;
        this.timeOffset += this.speed * (1 + sensor * 5);

        // ビートに合わせてペンライトのように元気よく膨張・ジャンプ
        let pulseScale = 10 + sensor * 85;
        this.pulse = sin(frameCount * this.pulseSpeed) * pulseScale * sensor;

        // 音が強いほど鮮やかなネオンカラーへシフト
        this.currentHue = (this.hue + sensor * 60) % 360;
    }

    render() {
        // 横揺れ＋ビートに合わせた縦ジャンプ（「うー！うまぴょい！」の動き）
        let moveX = sin(this.timeOffset * 15) * 40;
        let jumpY = -abs(sin(frameCount * 8 + this.timeOffset * 10)) * (15 + this.energy * 110);

        push();
        translate(this.x + moveX, this.y + jumpY);
        blendMode(ADD);
        noStroke();

        let d = max(10, this.baseSize + this.pulse);

        // 外側のネオングロー（this.currentHue を使ってカラフルに発光）
        fill(this.currentHue, 85, 100, 35 + this.energy * 40);
        circle(0, 0, d * 2.0);

        // 中間の光
        fill(this.currentHue, 60, 100, 85);
        circle(0, 0, d);

        // 中心の白い輝き
        fill(0, 0, 100, 90);
        circle(0, 0, d * 0.45);
        pop();
    }
}