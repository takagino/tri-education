class Orb {
  // 1. コンストラクタ：初期状態の設定
  constructor(x, y) {
    this.x = x;                         // 初期X座標
    this.y = y;                         // 初期Y座標
    this.baseSize = random(20, 60);     // ランダムな基本サイズ
    this.hue = random(180, 260);        // 青〜紫系のランダムな色相
    this.timeOffset = random(1000);     // 個体ごとの固有のノイズ時間
    this.speed = random(0.005, 0.02);   // ゆらめきのスピード
    this.pulseSpeed = random(2, 4);     // 呼吸のスピード（度数法）
  }

  // 2. 状態の更新メソッド（位置のゆらぎやサイズ計算）
  update() {
    this.timeOffset += this.speed;
    this.pulse = sin(frameCount * this.pulseSpeed) * 12;
  }

  // 3. 描画メソッド
  render() {
    // 個体ごとのノイズ座標を計算
    let moveX = (noise(this.timeOffset) - 0.5) * 200;
    let moveY = (noise(this.timeOffset + 100) - 0.5) * 200;

    push();
    translate(this.x + moveX, this.y + moveY);

    // 外側の光
    fill(this.hue, 80, 100, 30);
    circle(0, 0, (this.baseSize + this.pulse) * 1.8);

    // 中心の核
    fill(this.hue, 60, 100, 90);
    circle(0, 0, this.baseSize + this.pulse);
    pop();
  }
}