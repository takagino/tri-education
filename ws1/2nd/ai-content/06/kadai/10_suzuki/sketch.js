let prayer;
let enemies;
let floor;
let platforms;

let playerimage;

let enemyimage;

let backgroundImage;

let coins;
let coinImg;

let gameState = 'START';

const PLATFORM_SPEED = 1.5; // 浮く床の上下の速さ
const PLATFORM_RANGE = 60; // 浮く床が中心から動く幅

function preload() {
    playerimage = loadImage('assets/player.svg');
    enemyimage = loadImage('assets/enemy.svg');
    coinImg = loadImage('assets/coin.svg');
    backgroundImage = loadImage('assets/background.png');
}

function setup() {
    new Canvas(800, 500);
    createworld();
    world.timeScale = 0;
}

function startGame() {
    gameState = 'PLAY';
    loop();
    allSprites.remove();
    world.gravity.y = 20;
    world.timeScale = 1;
    createworld();
}

function drawOverlay(titleText, titleColor, subText) {
    // 画面全体を半透明の黒（不透明度190）で覆う
    noStroke();
    fill(0, 0, 0, 190);
    rectMode(CORNER);
    rect(0, 0, width, height);

    // タイトル文字（大きく太字で表示）
    textAlign(CENTER, CENTER);
    fill(titleColor);
    textSize(46);
    textStyle(BOLD);
    text(titleText, width / 2, height / 2 - 35);

    // 操作案内（白文字で表示）
    fill(255);
    textSize(20);
    textStyle(NORMAL);
    text(subText, width / 2, height / 2 + 40);

}

function drawUI() {
    textAlign(RIGHT, TOP);
    fill('#a4b0be');
    textSize(14);
    text('← → : 移動  /  SPACE : ジャンプ', width - 25, 20);
}

function createworld() {
    world.gravity.y = 20;

    player = new Sprite(80, 100, 30);
    player.image = playerimage;
    player.scale = 0.05;
    player.friction = 0.5;
    player.rotationLock = true;

    player.w = 36;
    player.h = 36;

    enemies = new Group();
    enemies.img = enemyimage;
    enemies.scale = 0.05;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic';
    enemies.bounciness = 1;

    floor = new Sprite(400, 480, 800, 40, 'static');
    floor.bounciness = 1;
    floor.color = '#8b2e2e';

    platforms = new Group();
    platforms.collider = 'kinematic';
    platforms.color = '#8b2e2e';
    platforms.bounciness = 1;

    new platforms.Sprite(400, 150, 100, 10);
    new platforms.Sprite(800, 150, 100, 10);
    new platforms.Sprite(0, 150, 100, 10);
    new platforms.Sprite(200, 200, 100, 10);
    new platforms.Sprite(600, 200, 100, 10);

    // platforms はGroupなので、足場を1枚ずつ設定する
    let dir = 1;
    for (let p of platforms) {
        p.x = constrain(p.x, 100, width - 100); // 画面内に収める
        p.homeY = p.y; // 上下移動の中心
        p.vel.y = PLATFORM_SPEED * dir;
        dir *= -1; // 足場ごとに逆向きに動かす
    }

    coins = new Group();
    coins.collider = 'static';
    coins.image = coinImg;
    coins.scale = 0.1;
    for (let i = 0; i < 5; i++) {
        rx = random(100, width - 100);
        ry = random(150, 350);
        new coins.Sprite(rx, ry, 26, 46);
        if(coins[i].overlapping(player) || coins[i].overlaps(platforms)) {
            i--;
        }
    }
    console.log(coins);

    player.overlaps(coins, getCoin);
    player.overlaps(enemies, getgameOver);

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

function draw() {
    clear();
    image(backgroundImage, 0, 0, width, height);

    camera.on();
    allSprites.draw();
    camera.off();

    // ① プレイ中：プレイヤーの移動や敵のループ処理、スコア表示
    if (gameState === 'PLAY') {
        if (frameCount % 75 === 0) {
            spawnEnemy();
        }

        // ★ 画面外へ通り過ぎた敵キャラは自動削除（メモリ解放）
        for (let e of enemies) {
            if (e.x < -60 || e.x > width + 60) {
                e.remove();
            }
        }

        // 浮く床が移動範囲の端まで来たら折り返す
        for (let p of platforms) {
            if (p.y < p.homeY - PLATFORM_RANGE) {
                p.vel.y = PLATFORM_SPEED;
            } else if (p.y > p.homeY + PLATFORM_RANGE) {
                p.vel.y = -PLATFORM_SPEED;
            }
        }

        let moovspeed = 5;

        if (kb.pressing('left')) {
            player.vel.x = -moovspeed;
            player.mirror.x = true;
        } else if (kb.pressing('right')) {
            player.vel.x = moovspeed;
            player.mirror.x = false;
        } else {
            player.vel.x = 0;
        }
        player.x = constrain(player.x, 25, width - 25);



        // 「スペースキーを押した瞬間」かつ「地面（floor）か足場（platform）に乗っている」時だけジャンプ！
        if (kb.presses('space') && (player.colliding(floor) || player.colliding(platforms))) {
            player.vel.y = -11;
        }

        drawUI();
    }
    // ② スタート画面
    else if (gameState === 'START') {
        drawOverlay('COIN HUNTER', '#feca57', 'SPACEキーでゲームスタート！');
        if (kb.presses('space')) {
            startGame();
        }
    }
    // ③ ゲームオーバー画面
    else if (gameState === 'GAMEOVER') {
        drawOverlay('GAME OVER', '#ff4757', 'SPACEキーでリトライ');
        if (kb.presses('space')) {
            startGame();
        }
    }
    // ④ ゲームクリア画面
    else if (gameState === 'CLEAR') {
        drawOverlay('GAME CLEAR!', '#2ed573', 'SPACEキーでリトライ');
        if (kb.presses('space')) {
            startGame();
        }
    }
}

function getgameOver() {
    player.remove();
    gameState = 'GAMEOVER';
    world.timeScale = 0;
}

function getCoin(player, coin) {
    coin.remove();
    if (coins.length === 0) {
        gameState = 'CLEAR';
        world.timeScale = 0;
    }

}