/**
 * Eclipse Striker - sketch.js
 * =================================================================
 * ジョイスティックで移動、明るさセンサーで昼夜属性を反転させるシューティングゲーム
 * =================================================================
 */

let player;
let bullets;
let enemies;
let stars = [];
let particles = [];

let score = 0;
let gameState = 'TITLE'; // 'TITLE', 'PLAY', 'GAMEOVER'
const SPEED = 6;

function setup() {
  new Canvas(480, 640);
  world.gravity.y = 0;

  // 背景の星屑を初期化
  for (let i = 0; i < 60; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      speed: random(1.5, 5),
      size: random(1, 3)
    });
  }

  // 弾グループ
  bullets = new Group();
  bullets.w = 6;
  bullets.h = 16;
  bullets.collider = 'none';

  // 敵グループ
  enemies = new Group();
  enemies.w = 34;
  enemies.h = 34;
  enemies.collider = 'kinematic';

  // 弾と敵の衝突判定
  bullets.overlaps(enemies, (bullet, enemy) => {
    if (bullet.type === enemy.type) {
      // 属性一致：撃破成功！
      createExplosion(enemy.x, enemy.y, enemy.type);
      bullet.remove();
      enemy.remove();
      score += 100;
    } else {
      // 属性不一致：弾かれる！
      createSparks(bullet.x, bullet.y);
      bullet.remove(); // 弾は消えるが敵は無傷
    }
  });

  // タイトル状態の初期化
  initTitle();
}

function initTitle() {
  bullets.removeAll();
  enemies.removeAll();
  particles = [];
  if (player) player.visible = false;
}

function startGame() {
  bullets.removeAll();
  enemies.removeAll();
  particles = [];
  score = 0;

  if (!player) {
    player = new Sprite(width / 2, height - 100, 36, 36);
    player.rotationLock = true;

    // プレイヤーと敵の衝突（ゲームオーバー）
    player.overlaps(enemies, (p, e) => {
      createExplosion(player.x, player.y, 'player');
      gameState = 'GAMEOVER';
    });
  }

  player.x = width / 2;
  player.y = height - 100;
  player.visible = true;
  gameState = 'PLAY';
}

function draw() {
  // 1. キーボードフォールバック（Arduino未接続時の操作）
  Sensor.updateKeyboard();
  if (!Sensor.isConnected) {
    // Spaceキーを押している間は夜モード
    Sensor.isNight = keyIsDown(32);
  }

  // 2. 昼夜に応じた背景の描画
  if (Sensor.isNight) {
    background('#0a0b14'); // 漆黒の宇宙
  } else {
    background('#1a3b68'); // 澄んだ青空
  }

  // 背景の星屑を更新・描画
  drawStars();

  // 3. パーティクルの更新と描画
  updateParticles();

  // 4. ゲーム状態に応じた分岐
  if (gameState === 'TITLE') {
    drawTitleScreen();
  } else if (gameState === 'PLAY') {
    updatePlay();
  } else if (gameState === 'GAMEOVER') {
    drawGameOverScreen();
  }
}

// プレイ中の更新
function updatePlay() {
  let isNight = Sensor.isNight;

  // 自機の移動と画面内制限
  player.vel.x = Sensor.joyX * SPEED;
  player.vel.y = Sensor.joyY * SPEED;
  player.x = constrain(player.x, player.w / 2, width - player.w / 2);
  player.y = constrain(player.y, player.h / 2, height - player.h / 2);

  // 自機の昼夜ビジュアル
  if (isNight) {
    player.color = '#9b59b6'; // 月の影（ダークパープル）
    player.stroke = '#e056fd';
  } else {
    player.color = '#f1c40f'; // 太陽（ゴールドイエロー）
    player.stroke = '#ffffff';
  }

  // オート連射（8フレームごとに自機前方から発射）
  if (frameCount % 8 === 0) {
    let b = new bullets.Sprite(player.x, player.y - player.h / 2);
    b.vel.y = -14;
    b.type = isNight ? 'night' : 'day';
    b.color = isNight ? '#e056fd' : '#ffffff';
  }

  // 画面外の弾を削除（メモリ解放）
  for (let b of bullets) {
    if (b.y < -20) b.remove();
  }

  // 敵のスポーン（スコア上昇で徐々に頻度UP）
  let spawnInterval = max(20, 45 - floor(score / 500) * 3);
  if (frameCount % spawnInterval === 0) {
    let e = new enemies.Sprite(random(40, width - 40), -30);
    e.vel.y = random(2.5, 4.0) + (score / 2000);

    // 属性の決定（50%で白または黒）
    if (random() < 0.5) {
      e.type = 'day';
      e.color = '#ffffff'; // 白い敵（昼属性）
      e.stroke = '#f1c40f';
    } else {
      e.type = 'night';
      e.color = '#1e272e'; // 黒い敵（夜属性）
      e.stroke = '#9b59b6';
    }
  }

  // 画面下部に消えた敵を削除
  for (let e of enemies) {
    if (e.y > height + 40) e.remove();
  }

  // HUD（スコア＆属性）描画
  drawHUD();
}

// 星屑の更新と描画
function drawStars() {
  noStroke();
  fill(Sensor.isNight ? 180 : 255, 255, 255, 160);
  for (let s of stars) {
    ellipse(s.x, s.y, s.size, s.size);
    s.y += s.speed;
    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
  }
}

// 撃破エフェクト（パーティクル生成）
function createExplosion(x, y, type) {
  let pColor = type === 'day' ? '#f1c40f' : (type === 'night' ? '#e056fd' : '#e74c3c');
  for (let i = 0; i < 12; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 6);
    particles.push({
      x: x,
      y: y,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      life: 25,
      maxLife: 25,
      size: random(3, 7),
      color: pColor
    });
  }
}

// 弾かれエフェクト（火花）
function createSparks(x, y) {
  for (let i = 0; i < 4; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(2, 5),
      life: 12,
      maxLife: 12,
      size: random(2, 4),
      color: '#ffffff'
    });
  }
}

// パーティクルの一斉更新
function updateParticles() {
  noStroke();
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    let alpha = (p.life / p.maxLife) * 255;
    fill(p.color + hex(floor(alpha), 2));
    ellipse(p.x, p.y, p.size, p.size);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// HUD（ヘッドアップディスプレイ）表示
function drawHUD() {
  push();
  fill(0, 0, 0, 140);
  noStroke();
  rect(0, 0, width, 45);

  fill('#ffffff');
  textSize(16);
  textAlign(LEFT, CENTER);
  text(`SCORE: ${score}`, 20, 22);

  textAlign(RIGHT, CENTER);
  if (Sensor.isNight) {
    fill('#e056fd');
    text('🌙 NIGHT MODE', width - 20, 22);
  } else {
    fill('#f1c40f');
    text('☀️ DAY MODE', width - 20, 22);
  }
  pop();
}

// タイトル画面の描画
function drawTitleScreen() {
  push();
  textAlign(CENTER, CENTER);

  fill('#f1c40f');
  textSize(32);
  text('ECLIPSE STRIKER', width / 2, height / 2 - 90);

  fill('#a4b0be');
  textSize(13);
  text('~ Solar & Shadow STG ~', width / 2, height / 2 - 55);

  fill('#ffffff');
  textSize(14);
  text('【操作方法】', width / 2, height / 2 - 10);
  text('右手: スティックで移動（弾は自動連射）', width / 2, height / 2 + 15);
  text('左手: 光センサーを覆うと【夜】/ 離すと【昼】', width / 2, height / 2 + 38);
  text('※PCキーボード: 矢印/WASD移動、Space長押しで夜', width / 2, height / 2 + 62);

  fill(Sensor.isConnected ? '#2ecc71' : '#e74c3c');
  textSize(15);
  text(Sensor.isConnected ? '🟢 コントローラー接続中' : '🔴 画面をクリックしてArduinoに接続', width / 2, height / 2 + 105);

  fill('#3498db');
  textSize(18);
  text('[ CLICK TO START ]', width / 2, height / 2 + 155);
  pop();
}

// ゲームオーバー画面の描画
function drawGameOverScreen() {
  push();
  textAlign(CENTER, CENTER);

  fill('#e74c3c');
  textSize(38);
  text('GAME OVER', width / 2, height / 2 - 50);

  fill('#ffffff');
  textSize(22);
  text(`FINAL SCORE: ${score}`, width / 2, height / 2 + 10);

  fill('#f1c40f');
  textSize(16);
  text('PRESS [ R ] KEY TO RETRY', width / 2, height / 2 + 60);
  pop();
}

function mousePressed() {
  if (!Sensor.isConnected) {
    Sensor.connect();
  }
  if (gameState === 'TITLE') {
    startGame();
  }
}

function keyPressed() {
  if (gameState === 'GAMEOVER' && (key === 'r' || key === 'R')) {
    startGame();
  }
}

