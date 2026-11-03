// ========================================================
// 06_p5playの基礎: ⭐️ 練習 4: コインのグループ化
// ========================================================
let player;
let platforms;
let coins;
let enemies;

let playerImg;
let enemyImg;
let coinImg;

let score = 0;
let totalCoins = 8;
let isGameOver = false;
let isClear = false;

function preload() {
    playerImg = loadImage('../../assets/player.svg');
    enemyImg = loadImage('../../assets/enemy.svg');
    coinImg = loadImage('../../assets/coin.svg');
}

function setup() {
    new Canvas(800, 500);
    world.gravity.y = 20;

    // 主人公
    player = new Sprite(80, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;
    player.bounciness = 0;
    player.rotationLock = true;

    // ① 足場グループ (platforms)
    platforms = new Group();
    platforms.color = '#2ed573';
    platforms.collider = 'static';
    new platforms.Sprite(400, 480, 800, 40);
    new platforms.Sprite(220, 380, 160, 20);
    new platforms.Sprite(580, 380, 160, 20);
    new platforms.Sprite(400, 300, 180, 20);
    new platforms.Sprite(200, 180, 140, 20);
    new platforms.Sprite(600, 180, 140, 20);

    // ② 敵キャラグループ (enemies)
    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic';

    // ③ コイングループ (coins) - 練習課題！
    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'static';

    for (let i = 0; i < totalCoins; i++) {
        let rx = random(60, width - 60);
        let ry = random(80, 420);
        new coins.Sprite(rx, ry);
    }

    // 接触イベントの登録
    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);
}

function spawnEnemy() {
    let fromLeft = random() < 0.5;
    let startX = fromLeft ? -30 : width + 30;
    let speed = random(3, 6);
    let vx = fromLeft ? speed : -speed;
    let spawnY = random([150, 250, 350, 435]);

    let e = new enemies.Sprite(startX, spawnY);
    e.vel.x = vx;
    if (fromLeft) {
        e.mirror.x = true;
    }
}

function getCoin(player, coin) {
    coin.remove();
    score += 10;
    if (coins.length === 0) {
        isClear = true;
    }
}

function hitEnemy(player, enemy) {
    isGameOver = true;
    player.visible = false;
}

function draw() {
    clear();
    background('#1e272e');

    if (!isGameOver && !isClear) {
        let moveSpeed = 5;

        // 左右移動
        if (kb.pressing('left') || kb.pressing('a')) {
            player.vel.x = -moveSpeed;
            player.mirror.x = true;
        } else if (kb.pressing('right') || kb.pressing('d')) {
            player.vel.x = moveSpeed;
            player.mirror.x = false;
        } else {
            player.vel.x = 0;
        }

        // 接地判定付きジャンプ
        if (kb.presses('space') && player.colliding(platforms)) {
            player.vel.y = -11;
        }

        player.x = constrain(player.x, 25, width - 25);

        // 敵の生成と管理
        if (frameCount % 75 === 0) {
            spawnEnemy();
        }

        for (let e of enemies) {
            if (e.x < -60 || e.x > width + 60) {
                e.remove();
            }
        }
    } else {
        player.vel.x = 0;
    }

    // スコアと状態の表示
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 20, 20);

    textAlign(CENTER, CENTER);
    textSize(36);
    if (isGameOver) {
        fill('#ff4757');
        text('GAME OVER', width / 2, height / 2);
    } else if (isClear) {
        fill('#2ed573');
        text('STAGE CLEAR!', width / 2, height / 2);
    }
}
