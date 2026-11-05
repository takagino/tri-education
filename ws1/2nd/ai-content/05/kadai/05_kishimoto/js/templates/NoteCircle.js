class NoteCircle {
  constructor(hue, speed, size) {
    this.x = width / 2;
    this.y = height / 2;

    this.hue = hue;
    this.speed = speed;
    this.size = size;

    // 飛び散る方向
    this.angle = random(360);
    this.vx = cos(this.angle) * speed;
    this.vy = sin(this.angle) * speed;

    // 破片の回転
    this.rotation = random(360);
    this.rotationSpeed = random(-8, 8);

    // 破片の形をランダムにする
    this.points = [];
    let count = floor(random(3, 7));

    for (let i = 0; i < count; i++) {
      let a = (360 / count) * i;
      let r = random(size * 0.3, size * 0.8);

      this.points.push({
        x: cos(a) * r,
        y: sin(a) * r,
      });
    }

    // 光の軌跡
    this.trail = [];
    this.maxTrail = 12;

    // 重力と空気抵抗
    this.gravity = 0.15;
    this.friction = 0.985;

    // 出現時の拡大
    this.scaleValue = 0.9;

    // 寿命
    this.lifespan = 100;
    this.fadeSpeed = 1.5;
  }

  update() {
    // 移動
    this.x += this.vx;
    this.y += this.vy;

    // 重力で徐々に落下
    this.vy += this.gravity;

    // 空気抵抗で少しずつ減速
    this.vx *= this.friction;
    this.vy *= this.friction;

    // 回転
    this.rotation += this.rotationSpeed;

    // 最初に勢いよく拡大する
    if (this.lifespan > 85) {
      this.scaleValue = lerp(this.scaleValue, 1, 0.25);
    } else {
      this.scaleValue *= 0.99;
    }

    // 通過した位置を保存
    this.trail.push({
      x: this.x,
      y: this.y,
    });

    if (this.trail.length > this.maxTrail) {
      this.trail.shift();
    }

    // 寿命を減らす
    this.lifespan -= this.fadeSpeed;
  }

  render() {
    push();

    // 光の軌跡
    noFill();

    for (let i = 1; i < this.trail.length; i++) {
      let p1 = this.trail[i - 1];
      let p2 = this.trail[i];

      let alpha = map(i, 0, this.trail.length, 0, this.lifespan);

      stroke(this.hue, 80, 100, alpha * 0.5);
      strokeWeight(map(i, 0, this.trail.length, 1, this.size * 0.15));

      line(p1.x, p1.y, p2.x, p2.y);
    }

    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scaleValue);

    // 外側の光
    noStroke();
    fill(this.hue, 80, 100, this.lifespan * 0.15);

    beginShape();
    for (let p of this.points) {
      vertex(p.x * 1.3, p.y * 1.3);
    }
    endShape(CLOSE);

    // クリスタルの本体
    fill(this.hue, 65, 100, this.lifespan * 0.75);
    stroke(this.hue, 20, 100, this.lifespan);
    strokeWeight(2);

    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

    // 中心から各頂点へ線を引く
    stroke(this.hue, 15, 100, this.lifespan * 0.6);
    strokeWeight(1);

    for (let p of this.points) {
      line(0, 0, p.x, p.y);
    }

    // 中央の光
    noStroke();
    fill(this.hue, 10, 100, this.lifespan);
    circle(0, 0, this.size * 0.12);

    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

// class NoteCircle {
//   constructor(hue, speed, size) {
//     // 画面中央からスタート
//     this.x = width / 2;
//     this.y = height / 2;

//     // 飛び出す角度（0〜360度）をランダムに決める
//     let angle = random(360);

//     // 角度とスピードから、X方向・Y方向の移動量（速度ベクトル）を計算
//     this.vx = cos(angle) * speed;
//     this.vy = sin(angle) * speed;

//     this.size = size; // 円のサイズ
//     this.hue = hue; // 色相（0〜360）
//     this.lifespan = 100; // 寿命（100で出現し、0になると消滅する）
//     this.fadeSpeed = 1.5; // 寿命が減っていく速さ
//   }

//   update() {
//     this.x += this.vx;
//     this.y += this.vy;
//     this.lifespan -= this.fadeSpeed; // 寿命を少しずつ減らす
//   }

//   render() {
//     push();
//     translate(this.x, this.y);
//     noStroke();

//     // 寿命（100〜0）に合わせて、円のサイズを this.size から 0 へ徐々に小さくする
//     let currentSize = map(this.lifespan, 100, 0, this.size, 0);

//     // 寿命（lifespan: 100〜0）をそのまま透明度（Alpha）として使う
//     fill(this.hue, 80, 100, this.lifespan);
//     circle(0, 0, currentSize);
//     pop();
//   }

//   isDead() {
//     return this.lifespan <= 0;
//   }
// }
