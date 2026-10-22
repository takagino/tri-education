// 波紋を保存する配列
let ripples = [];

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  // 波紋を18個作る
  for (let i = 0; i < 250; i++) {
    ripples.push({
      // 波紋が発生する場所
      x: random(width),
      y: random(height),

      // 最初の進行度
      progress: random(1),

      // noise用
      noiseOffset: random(1000),

      // 波紋ごとの色
      hue: random(360),

      // 波紋の最大サイズ
      maxSize: random(110, 180)
    });
  }
}


function draw() {

  // =====================================
  // 背景
  // =====================================

  // 薄い水色
  background(200, 25, 95);


  // =====================================
  // 背景の小さな光
  // =====================================

  noStroke();

  for (let i = 0; i < 40; i++) {

    // noiseで光をゆっくり動かす
    let x = noise(
      i * 5,
      frameCount * 0.001
    ) * width;

    let y = noise(
      i * 8 + 100,
      frameCount * 0.001
    ) * height;

    // 光の色もゆっくり変える
    let lightHue = (
      i * 25 +
      frameCount * 0.1
    ) % 360;

    fill(
      lightHue,
      45,
      100,
      15
    );

    circle(x, y, 4);
  }


  // =====================================
  // 波紋
  // =====================================

  for (let i = 0; i < ripples.length; i++) {

    let ripple = ripples[i];


    // 波紋をゆっくり広げる
    ripple.progress += 0.003;


    // =====================================
    // 波紋が消えたら新しくする
    // =====================================

    if (ripple.progress >= 1) {

      ripple.progress = 0;

      // 新しい場所
      ripple.x = random(width);
      ripple.y = random(height);

      // 新しいnoise
      ripple.noiseOffset = random(1000);

      // 新しい色
      ripple.hue = random(360);

      // 新しい大きさ
      ripple.maxSize = random(110, 180);
    }


    // =====================================
    // 波紋の大きさ
    // =====================================

    // 小さすぎる円を出さないため
    // 20からスタートする
    let radius = map(
      ripple.progress,
      0,
      1,
      20,
      ripple.maxSize
    );


    // =====================================
    // 透明度
    // =====================================

    // 広がるほど透明になる
    let alpha = map(
      ripple.progress,
      0,
      1,
      65,
      0
    );


    // =====================================
    // 波紋の色
    // =====================================

    // ランダムに決めた色から
    // 広がるにつれて少しずつ色を変える
    let currentHue = (
      ripple.hue +
      ripple.progress * 80
    ) % 360;


    push();


    // =====================================
    // 波紋の場所
    // =====================================

    translate(
      ripple.x,
      ripple.y
    );


    // ゆっくり回転
    rotate(
      frameCount * 0.03 +
      i * 20
    );


    // =====================================
    // 波紋の中の色
    // =====================================

    fill(
      currentHue,
      65,
      100,
      alpha * 0.45
    );


    // =====================================
    // 波紋の輪郭
    // =====================================

    stroke(
      currentHue,
      90,
      100,
      alpha
    );

    strokeWeight(2);


    // =====================================
    // noiseで揺れる円を描く
    // =====================================

    beginShape();

    for (let angle = 0; angle <= 360; angle += 4) {

      // noiseで円の輪郭を少し揺らす
      let n = noise(
        ripple.noiseOffset + angle * 0.015,
        frameCount * 0.003
      );

      // 揺れ幅
      let wobble = map(
        n,
        0,
        1,
        -3,
        3
      );

      let r = radius + wobble;

      let x = cos(angle) * r;
      let y = sin(angle) * r;

      vertex(x, y);
    }

    endShape(CLOSE);


    pop();
  }
}