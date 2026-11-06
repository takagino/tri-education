class NoteCircle {
  constructor(hue, speed, size) {
    // 画面中央から発生
    this.x = width / 2;
    this.y = height / 2;

    // 音階ごとの色・速度・大きさ
    this.hue = hue;
    this.speed = speed;
    this.size = size;

    // C5（高いド）だけレインボー
    this.isRainbow = this.hue === 330;

    // 寿命
    this.lifespan = 100;

    // 経過時間
    this.time = 0;

    // 光の輪の初期半径
    this.radius = this.size * 0.1;

    // 光が広がる速度
    this.expandSpeed = this.speed * 1.75;

    // 光の輪の太さ
    this.ringWidth = this.size * 0.15;

    // 中央の光の強さ
    this.flash = 100;

    // 円の歪みの強さ（大きくすると歪みが強くなる）
    this.distortion = random(0.015, 0.04);

    // 円の歪み方を個体ごとに変える
    this.noiseOffset = random(1000);
  }

  update() {
    // 時間を進める
    this.time++;

    // 徐々に加速しながら広がる
    this.expandSpeed *= 1.025;

    // 円の半径を大きくする
    this.radius += this.expandSpeed;

    // 光の輪を徐々に太くする
    this.ringWidth += this.speed * 0.5;

    // 中央のフラッシュを弱くする
    this.flash *= 0.88;

    // 寿命をゆっくり減らす
    this.lifespan -= 0.6;
  }

  // 少し歪んだ円を描画する関数
  drawDistortedCircle(radius) {
    beginShape();

    // 12度ずつ頂点を配置して軽量化
    for (let angle = 0; angle <= 360; angle += 12) {

      // sin波を組み合わせて自然な歪みを作る
      let wave1 = sin(angle * 4 + this.time * 1.5);
      let wave2 = sin(angle * 7 - this.time * 1.2);

      // 円の半径を少しだけ変化させる
      let distortionAmount =
        (wave1 * 0.7 + wave2 * 0.3) *
        radius *
        this.distortion;

      let r = radius + distortionAmount;

      // 歪んだ円周上の座標
      let x = cos(angle) * r;
      let y = sin(angle) * r;

      vertex(x, y);
    }

    endShape(CLOSE);
  }

  render() {
    push();

    // 画面中央を基準に描画
    translate(this.x, this.y);

    // 寿命に応じた透明度
    let alpha = constrain(this.lifespan, 0, 100);

    noFill();

    // =====================================
    // ① 中央から広がる光の輪
    // =====================================

    if (this.isRainbow) {

      // C5の場合：7色のレインボー
      for (let i = 0; i < 7; i++) {

        let rainbowHue = i * 50;
        let rainbowRadius = this.radius - i * 8;

        if (rainbowRadius > 0) {

          // 虹色の発光
          stroke(
            rainbowHue,
            100,
            100,
            alpha * 0.35
          );

          strokeWeight(this.ringWidth * 1.5);

          this.drawDistortedCircle(rainbowRadius);

          // 鮮やかな虹色の輪
          stroke(
            rainbowHue,
            90,
            100,
            alpha * 0.9
          );

          strokeWeight(this.ringWidth * 0.5);

          this.drawDistortedCircle(rainbowRadius);
        }
      }

    } else {

      // 通常の音階：単色の光

      // 外側の柔らかい発光
      stroke(
        this.hue,
        80,
        100,
        alpha * 0.15
      );

      strokeWeight(this.ringWidth * 3);

      this.drawDistortedCircle(this.radius);

      // メインの光
      stroke(
        this.hue,
        100,
        100,
        alpha * 0.85
      );

      strokeWeight(this.ringWidth);

      this.drawDistortedCircle(this.radius);

      // 白いハイライト
      stroke(
        0,
        0,
        100,
        alpha * 0.9
      );

      strokeWeight(this.ringWidth * 0.2);

      this.drawDistortedCircle(this.radius);
    }

    // =====================================
    // ② 少し遅れて広がる衝撃波
    // =====================================

    if (this.time > 8) {

      let secondRadius = max(
        0,
        this.radius - this.size * 1.5
      );

      let secondHue = this.isRainbow
        ? 50
        : (this.hue + 40) % 360;

      stroke(
        secondHue,
        90,
        100,
        alpha * 0.5
      );

      strokeWeight(this.ringWidth * 0.5);

      this.drawDistortedCircle(secondRadius);
    }

    // =====================================
    // ③ 中央のフラッシュ
    // =====================================

    noStroke();

    if (this.isRainbow) {
      fill(0, 0, 100, this.flash * 0.5);
    } else {
      fill(this.hue, 50, 100, this.flash * 0.3);
    }

    ellipse(0, 0, this.size * 3);

    // 中央の白い光
    fill(0, 0, 100, this.flash);

    ellipse(0, 0, this.size * 0.8);

    // =====================================
    // ④ 外側へ広がる余韻
    // =====================================

    noFill();

    stroke(
      this.isRainbow ? 300 : (this.hue + 20) % 360,
      70,
      100,
      alpha * 0.2
    );

    strokeWeight(2);

    this.drawDistortedCircle(this.radius * 1.15);

    pop();
  }

  isDead() {
    // 寿命が0以下になったら削除
    return this.lifespan <= 0;
  }
}