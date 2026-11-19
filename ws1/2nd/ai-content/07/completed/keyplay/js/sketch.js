// js/sketch.js（第4章・練習3までの完成コード：キーボード版）
let player;
let playerImg;
let bullets;
let bulletImg;
let enemies;
let enemyDayImg;
let enemyNightImg;
let score = 0;
let isNight = false;
let gameState = 'PLAY'; // 'PLAY' | 'GAMEOVER'
let stars = [];
const SPEED = 6;

function preload() {
    playerImg = loadImage('assets/player.png');
    bulletImg = loadImage('assets/bullet.png');
    enemyDayImg = loadImage('assets/enemy_day.png');
    enemyNightImg = loadImage('assets/enemy_night.png');
}

function setup() {
    new Canvas(480, 640);
    world.gravity.y = 0;

    // ① 自機スプライトの作成
    player = new Sprite(playerImg, width / 2, height - 100);
    player.scale = 0.1;
    player.rotationLock = true;

    // ② 弾グループの作成
    bullets = new Group();
    bullets.img = bulletImg;
    bullets.scale = 0.05;

    // ③ 敵グループの作成
    enemies = new Group();
    enemies.img = enemyDayImg;
    enemies.scale = 0.1;
    enemies.collider = 'kinematic';

    // ④ 弾と敵の属性マッチング当たり判定
    bullets.overlaps(enemies, (bullet, enemy) => {
        // 属性が一致している場合 ➔ 撃破成功！
        if (bullet.type === enemy.type) {
            bullet.remove();
            enemy.remove();
            score += 100;
        } else {
            // 属性が不一致の場合 ➔ 弾かれる！
            bullet.remove();
        }
    });

    // ⑤ 自機と敵が当たったときの処理
    player.overlaps(enemies, (p, enemy) => {
        enemy.remove();
        gameState = 'GAMEOVER';
        player.visible = false;
        player.vel.x = 0;
        player.vel.y = 0;
    });

    // ⑥ 背景の星屑を初期化
    for (let i = 0; i < 50; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            speed: random(2, 6),
            size: random(1, 3)
        });
    }
}

function draw() {
    // Spaceキー（32）を押している間は「夜モード」
    isNight = keyIsDown(32);

    // 昼夜に応じた背景色の切り替え
    if (isNight) {
        background('#0a0b14'); // 漆黒の宇宙
    } else {
        background('#1a3b68'); // 澄んだ昼空
    }

    drawStars();

    if (gameState === 'PLAY') {
        // 左右の移動
        if (kb.pressing('left')) {
            player.vel.x = -SPEED;
        } else if (kb.pressing('right')) {
            player.vel.x = SPEED;
        } else {
            player.vel.x = 0;
        }

        // 上下の移動
        if (kb.pressing('up')) {
            player.vel.y = -SPEED;
        } else if (kb.pressing('down')) {
            player.vel.y = SPEED;
        } else {
            player.vel.y = 0;
        }

        player.x = constrain(player.x, player.w / 2, width - player.w / 2);
        player.y = constrain(player.y, player.h / 2, height - player.h / 2);

        // 8フレームごとに現在の属性（day / night）の弾を自動発射
        if (frameCount % 8 === 0) {
            let b = new bullets.Sprite(player.x, player.y - player.h / 2);
            b.vel.y = -14;
            b.type = isNight ? 'night' : 'day';
        }

        // 画面外の弾を削除
        for (let b of bullets) {
            if (b.y < -20) {
                b.remove();
            }
        }

        // 40フレームごとに「昼属性」または「夜属性」の敵を出現
        if (frameCount % 40 === 0) {
            let e = new enemies.Sprite(random(40, width - 40), -30);
            e.vel.y = random(2.5, 4.0);

            if (random() < 0.5) {
                e.type = 'day';
                e.img = enemyDayImg;   // 昼属性の敵画像
            } else {
                e.type = 'night';
                e.img = enemyNightImg; // 夜属性の敵画像
            }
        }

        // 画面外の敵を削除
        for (let e of enemies) {
            if (e.y > height + 40) {
                e.remove();
            }
        }
    }

    // ★ スプライトを先に手動描画する（UIが隠れないようにするため）
    allSprites.draw();

    // ★ ゲーム状態に応じたUI・オーバーレイの描画
    if (gameState === 'PLAY') {
        drawHUD();
    } else if (gameState === 'GAMEOVER') {
        drawGameOver();
    }
}

function drawStars() {
    noStroke();
    fill(255, 255, 255, 180);
    for (let s of stars) {
        ellipse(s.x, s.y, s.size, s.size);
        s.y += s.speed;
        if (s.y > height) {
            s.y = 0;
            s.x = random(width);
        }
    }
}

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
    if (isNight) {
        fill('#e056fd');
        text('🌙 NIGHT MODE', width - 20, 22);
    } else {
        fill('#f1c40f');
        text('☀️ DAY MODE', width - 20, 22);
    }
    pop();
}

function drawGameOver() {
    push();
    noStroke();
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill('#ff4757');
    textSize(42);
    text('GAME OVER', width / 2, height / 2 - 40);

    fill('#ffffff');
    textSize(22);
    text(`FINAL SCORE: ${score}`, width / 2, height / 2 + 15);

    fill('#f1c40f');
    textSize(16);
    text('PRESS [ R ] KEY TO RETRY', width / 2, height / 2 + 65);
    pop();
}

function keyPressed() {
    if (gameState === 'GAMEOVER' && (key === 'r' || key === 'R')) {
        restartGame();
    }
}

function restartGame() {
    score = 0;
    bullets.removeAll();
    enemies.removeAll();
    player.x = width / 2;
    player.y = height - 100;
    player.vel.x = 0;
    player.vel.y = 0;
    player.visible = true;
    gameState = 'PLAY';
}
