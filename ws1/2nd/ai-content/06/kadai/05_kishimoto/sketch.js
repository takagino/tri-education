let player;
let enemies;
let playerImg;
let enemyImg;
let platforms;
let coins;
let coinImg;
let hearts;
let heartImg;

let cutLeftImg;
let cutRightImg;

let gameState = "START";

let enemySpawnFrame = 0;
let heartSpawnFrame = 0;
let coinsCollected = 0;
let score = 0;
let lives = 3;
let invincibleTimer = 0;
let attackCooldown = 0;
let attackTimer = 0;
let playFrames = 0;
let facingRight = true;
let attackFacingRight = true;

const TOTAL_COINS = 8;
const MAX_LIVES = 3;

const ENEMY_INTERVAL = 120;
const MIN_ENEMY_INTERVAL = 40;
const DIFFICULTY_STEP = 600;

const INVINCIBLE_TIME = 90;
const ATTACK_INTERVAL = 20;
const ATTACK_DURATION = 12;
const ATTACK_RANGE = 100;
const ATTACK_HEIGHT = 80;
const HEART_INTERVAL = 600;

const JUMP_POWER = -10;
const MOVE_SPEED = 5;

// ----------------------------------
// 画像の読み込み
// ----------------------------------

function preload() {
  playerImg = loadImage("assets/player.svg");
  enemyImg = loadImage("assets/enemy.svg");
  coinImg = loadImage("assets/coin.svg");
  heartImg = loadImage("assets/heart.svg");

  // 攻撃モーション
  cutLeftImg = loadImage("assets/cut_01.svg");
  cutRightImg = loadImage("assets/cut_02.svg");
}

// ----------------------------------
// 初期設定
// ----------------------------------

function setup() {
  new Canvas(800, 500);

  world.gravity.y = 20;
  world.autoStep = false;
}

// ----------------------------------
// コイン取得
// ----------------------------------

function getCoin(p, coin) {
  if (gameState !== "PLAY") return;
  if (coin.removed) return;

  coin.remove();
  coinsCollected++;
  score += 50;

  if (coinsCollected >= TOTAL_COINS) {
    finishGame("CLEAR");
  }
}

// ----------------------------------
// 敵との接触
// ----------------------------------

function hitEnemy(p, enemy) {
  if (gameState !== "PLAY") return;
  if (enemy.removed) return;
  if (invincibleTimer > 0) return;

  // 攻撃中はダメージを受けない
  if (attackTimer > 0) return;

  lives--;
  invincibleTimer = INVINCIBLE_TIME;

  if (lives <= 0) {
    lives = 0;
    finishGame("GAMEOVER");
  }
}

// ----------------------------------
// 回復アイテム取得
// ----------------------------------

function getHeart(p, heart) {
  if (gameState !== "PLAY") return;
  if (heart.removed) return;

  heart.remove();
  lives = min(lives + 1, MAX_LIVES);
}

// ----------------------------------
// ゲーム終了
// ----------------------------------

function finishGame(state) {
  gameState = state;

  if (player && !player.removed) {
    player.vel.x = 0;
    player.vel.y = 0;
    player.visible = true;
  }

  world.autoStep = false;
}

// ----------------------------------
// ゲーム世界の作成
// ----------------------------------

function createGameWorld() {
  // プレイヤー
  player = new Sprite(80, 420);
  player.img = playerImg;
  player.scale = 0.1;
  player.w = 36;
  player.h = 48;
  player.bounciness = 0;
  player.friction = 0;
  player.rotationLock = true;

  // 敵
  enemies = new Group();
  enemies.img = enemyImg;
  enemies.scale = 0.09;
  enemies.w = 40;
  enemies.h = 40;
  enemies.collider = "kinematic";

  // 足場
  platforms = new Group();
  platforms.color = "#2ed573";
  platforms.collider = "static";

  new platforms.Sprite(400, 480, 800, 40);
  new platforms.Sprite(220, 380, 160, 20);
  new platforms.Sprite(580, 380, 160, 20);
  new platforms.Sprite(400, 300, 180, 20);
  new platforms.Sprite(200, 180, 140, 20);
  new platforms.Sprite(600, 180, 140, 20);

  // コイン
  coins = new Group();
  coins.img = coinImg;
  coins.scale = 0.08;
  coins.w = 26;
  coins.h = 34;
  coins.collider = "static";

  for (let i = 0; i < TOTAL_COINS; i++) {
    let rx = random(60, width - 60);
    let ry = random(80, 420);

    new coins.Sprite(rx, ry);
  }

  // 回復アイテム
  hearts = new Group();
  hearts.img = heartImg;
  hearts.scale = 0.08;
  hearts.w = 28;
  hearts.h = 28;
  hearts.collider = "static";

  // 当たり判定
  player.overlaps(coins, getCoin);
  player.overlaps(enemies, hitEnemy);
  player.overlaps(hearts, getHeart);

  enemies.overlaps(platforms);
  enemies.overlaps(coins);
  enemies.overlaps(hearts);

  hearts.overlaps(platforms);
  hearts.overlaps(coins);
}

// ----------------------------------
// ゲーム開始・リトライ
// ----------------------------------

function startGame() {
  world.autoStep = false;
  allSprites.remove();

  coinsCollected = 0;
  score = 0;
  lives = MAX_LIVES;

  enemySpawnFrame = 0;
  heartSpawnFrame = 0;
  invincibleTimer = 0;
  attackCooldown = 0;
  attackTimer = 0;
  playFrames = 0;
  facingRight = true;
  attackFacingRight = true;

  createGameWorld();

  gameState = "PLAY";
  world.autoStep = true;
}

// ----------------------------------
// 敵を生成
// ----------------------------------

function spawnEnemy() {
  let fromLeft = random() < 0.5;
  let startX = fromLeft ? -30 : width + 30;

  let difficulty = floor(playFrames / DIFFICULTY_STEP);
  let speedBonus = min(difficulty * 0.3, 2);

  let speed = random(3, 6) + speedBonus;
  let vx = fromLeft ? speed : -speed;

  let spawnY = random([150, 250, 350, 435]);

  let e = new enemies.Sprite(startX, spawnY);
  e.vel.x = vx;

  if (fromLeft) {
    e.mirror.x = true;
  }
}

// ----------------------------------
// 剣による攻撃
// ----------------------------------

function swordAttack() {
  if (gameState !== "PLAY") return;
  if (attackCooldown > 0) return;

  attackCooldown = ATTACK_INTERVAL;
  attackTimer = ATTACK_DURATION;

  // 攻撃開始時の方向を固定
  attackFacingRight = facingRight;
}

// ----------------------------------
// 剣の当たり判定
// ----------------------------------

function checkSwordHit() {
  if (gameState !== "PLAY") return;
  if (attackTimer <= 0) return;

  const direction = attackFacingRight ? 1 : -1;

  const attackX = player.x + direction * 45;
  const attackY = player.y;

  for (let enemy of [...enemies]) {
    if (enemy.removed) continue;

    const dx = abs(enemy.x - attackX);
    const dy = abs(enemy.y - attackY);

    const hitX = dx < ATTACK_RANGE / 2 + enemy.w / 2;

    const hitY = dy < ATTACK_HEIGHT / 2 + enemy.h / 2;

    if (hitX && hitY) {
      enemy.remove();
      score += 100;
    }
  }
}

// ----------------------------------
// 回復アイテムを生成
// ----------------------------------

function spawnHeart() {
  if (hearts.length > 0) return;
  if (lives >= MAX_LIVES) return;

  let x = random(60, width - 60);
  let y = random(100, 400);

  new hearts.Sprite(x, y);
}

// ----------------------------------
// 画面外の敵を削除
// ----------------------------------

function removeOffscreenEnemies() {
  for (let e of [...enemies]) {
    if ((e.vel.x > 0 && e.x > width + 80) || (e.vel.x < 0 && e.x < -80)) {
      e.remove();
    }
  }
}

// ----------------------------------
// 接地判定
// ----------------------------------

function isGrounded() {
  return player.colliding(platforms) && player.vel.y >= -0.5;
}

// ----------------------------------
// プレイヤー操作
// ----------------------------------

function updatePlayer() {
  if (kb.pressing("left")) {
    player.vel.x = -MOVE_SPEED;
    player.mirror.x = true;
    facingRight = false;
  } else if (kb.pressing("right")) {
    player.vel.x = MOVE_SPEED;
    player.mirror.x = false;
    facingRight = true;
  } else {
    player.vel.x = 0;
  }

  // 接地中のみジャンプ
  if (kb.presses("space") && isGrounded()) {
    player.vel.y = JUMP_POWER;
  }

  // 剣攻撃
  if (kb.presses("z")) {
    swordAttack();
  }

  player.x = constrain(player.x, 25, width - 25);
}

// ----------------------------------
// タイマー更新
// ----------------------------------

function updateTimers() {
  playFrames++;
  enemySpawnFrame++;
  heartSpawnFrame++;

  if (invincibleTimer > 0) {
    invincibleTimer--;
  }

  if (attackCooldown > 0) {
    attackCooldown--;
  }

  if (attackTimer > 0) {
    attackTimer--;
  }

  let difficulty = floor(playFrames / DIFFICULTY_STEP);

  let currentInterval = max(
    MIN_ENEMY_INTERVAL,
    ENEMY_INTERVAL - difficulty * 10,
  );

  if (enemySpawnFrame >= currentInterval) {
    spawnEnemy();
    enemySpawnFrame = 0;
  }

  if (heartSpawnFrame >= HEART_INTERVAL) {
    spawnHeart();
    heartSpawnFrame = 0;
  }
}

// ----------------------------------
// 無敵時間の点滅
// ----------------------------------

function updatePlayerBlink() {
  if (invincibleTimer > 0) {
    player.visible = floor(invincibleTimer / 5) % 2 === 0;
  } else {
    player.visible = true;
  }
}

// ----------------------------------
// SVGによる攻撃モーション
// ----------------------------------

function drawSwordEffect() {
  if (attackTimer <= 0) return;

  push();

  const direction = attackFacingRight ? 1 : -1;

  // 左右で画像を切り替える
  const cutImg = attackFacingRight ? cutRightImg : cutLeftImg;

  const offsetX = direction * 45;

  const x = player.x + offsetX;
  const y = player.y;

  // 攻撃の進行度
  const progress = 1 - attackTimer / ATTACK_DURATION;

  // 攻撃中に少し拡大
  const size = lerp(65, 105, progress);

  imageMode(CENTER);

  image(cutImg, x, y, size, size);

  pop();
}

// ----------------------------------
// ライフ表示
// ----------------------------------

function drawLives() {
  textAlign(LEFT, TOP);
  textSize(25);
  textStyle(NORMAL);

  for (let i = 0; i < MAX_LIVES; i++) {
    if (i < lives) {
      fill("#ff4757");
    } else {
      fill("#57606f");
    }

    text("♥", 25 + i * 30, 50);
  }
}

// ----------------------------------
// プレイ中のUI
// ----------------------------------

function drawUI() {
  textAlign(RIGHT, TOP);
  fill("#a4b0be");
  textSize(14);
  textStyle(NORMAL);

  text("← → : 移動 / SPACE : ジャンプ / Z : 攻撃", width - 25, 20);

  textAlign(LEFT, TOP);
  fill("#feca57");
  textSize(20);

  text(`COINS : ${coinsCollected} / ${TOTAL_COINS}`, 25, 20);

  drawLives();

  fill("#ffffff");
  textSize(18);

  text(`SCORE : ${score}`, 25, 90);

  let level = floor(playFrames / DIFFICULTY_STEP) + 1;

  textAlign(RIGHT, TOP);
  fill("#70a1ff");
  textSize(16);

  text(`LEVEL : ${level}`, width - 25, 50);
}

// ----------------------------------
// オーバーレイ
// ----------------------------------

function drawOverlay(titleText, titleColor, subText) {
  push();

  noStroke();
  fill(0, 0, 0, 190);

  rectMode(CORNER);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);

  fill(titleColor);
  textSize(46);
  textStyle(BOLD);

  text(titleText, width / 2, height / 2 - 45);

  fill(255);
  textSize(20);
  textStyle(NORMAL);

  text(subText, width / 2, height / 2 + 20);

  if (gameState === "GAMEOVER" || gameState === "CLEAR") {
    fill("#feca57");
    textSize(24);

    text(`SCORE : ${score}`, width / 2, height / 2 + 65);
  }

  pop();
}

// ----------------------------------
// メインループ
// ----------------------------------

function draw() {
  clear();
  background("#1e272e");

  if (gameState === "PLAY") {
    updatePlayer();

    // 攻撃中は毎フレーム命中判定
    checkSwordHit();

    updatePlayerBlink();
    removeOffscreenEnemies();
  }

  // スプライトを描画
  allSprites.draw();

  // 攻撃モーションを手前に描画
  if (gameState === "PLAY") {
    drawSwordEffect();
  }

  if (gameState === "START") {
    drawOverlay("COIN HUNTER", "#feca57", "SPACEキーでゲームスタート！");

    if (kb.presses("space")) {
      startGame();
    }
  } else if (gameState === "PLAY") {
    drawUI();

    // 描画後にタイマー更新
    updateTimers();
  } else if (gameState === "GAMEOVER") {
    drawOverlay("GAME OVER", "#ff4757", "SPACEキーでリトライ");

    if (kb.presses("space")) {
      startGame();
    }
  } else if (gameState === "CLEAR") {
    drawOverlay("GAME CLEAR!", "#2ed573", "SPACEキーでリトライ");

    if (kb.presses("space")) {
      startGame();
    }
  }
}
