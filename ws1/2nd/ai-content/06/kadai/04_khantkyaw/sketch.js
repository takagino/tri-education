let player;
let platforms;
let coins;
let enemies;

let playerImg;
let enemyImg;
let coinImg;

let totalCoins = 8;
let isGameOver = false;
let isClear = false;
let gameState = 'START';
let dashFrames = 0;
let dashCooldown = 0;
let dashDirection = 1;

function preload() {
    playerImg = loadImage('assets/player.svg');
    enemyImg = loadImage('assets/enemy.svg');
    coinImg = loadImage('assets/coin.svg');
}

function setup() {
    new Canvas(800, 500);

    // 主人公

}

function createGameWorld() {
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

    // Place coins in open air, avoiding platforms and other coins.
    for (let i = 0; i < totalCoins; i++) {
        let position = findCoinPosition();
        new coins.Sprite(position.x, position.y);
    }

    // 接触イベントの登録
    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);

}

function findCoinPosition() {
    const coinRadius = 22;
    const minCoinGap = 48;

    // Try random positions first, rejecting any that touch a platform or coin.
    for (let attempt = 0; attempt < 100; attempt++) {
        const x = random(40, width - 40);
        const y = random(55, height - 55);
        const blockedByPlatform = platforms.some(platform =>
            Math.abs(x - platform.x) < platform.w / 2 + coinRadius &&
            Math.abs(y - platform.y) < platform.h / 2 + coinRadius
        );
        const tooCloseToCoin = coins.some(coin =>
            dist(x, y, coin.x, coin.y) < minCoinGap
        );

        if (!blockedByPlatform && !tooCloseToCoin) return { x, y };
    }

    // Fallback: use open gaps between platform levels if random sampling is unlucky.
    const candidates = [
        [100, 250], [400, 220], [700, 250],
        [100, 100], [400, 100], [700, 100],
        [100, 430], [400, 430], [700, 430]
    ];
    for (const [x, y] of candidates) {
        const blockedByPlatform = platforms.some(platform =>
            Math.abs(x - platform.x) < platform.w / 2 + coinRadius &&
            Math.abs(y - platform.y) < platform.h / 2 + coinRadius
        );
        const tooCloseToCoin = coins.some(coin =>
            dist(x, y, coin.x, coin.y) < minCoinGap
        );
        if (!blockedByPlatform && !tooCloseToCoin) return { x, y };
    }

    // In the unlikely case there is no room for another coin, choose a clear
    // position even if it is near another coin.
    return { x: random(40, width - 40), y: 100 };
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
    if (coins.length === 0) {
        gameState = 'CLEAR';
    }
}

function hitEnemy(player, enemy) {
    // A dash is a brief escape move that lets the player pass through a patrol.
    if (dashFrames > 0) return;
    gameState = 'GAMEOVER';
    player.visible = false;
}

function startGame() {
    gameState = 'PLAY';
    // ★ 既存のスプライトを全消去して真っさらにリセット！
    allSprites.remove();
    world.gravity.y = 20; // 重力を再設定
    dashFrames = 0;
    dashCooldown = 0;
    dashDirection = 1;
    createGameWorld();    // 新しくステージを生成！
}

// 半透明マスクと中央文字を描画する共通関数
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
    text('← → : 移動  /  SPACE : ジャンプ  /  SHIFT : ダッシュ', width - 25, 20);
    textAlign(LEFT, TOP);
    fill(dashCooldown === 0 ? '#2ed573' : '#a4b0be');
    text(dashCooldown === 0 ? 'DASH READY' : 'DASH RECHARGING', 25, 20);
}

function draw() {
    clear();
    background('#1e272e');
    if (gameState === 'PLAY') {
        if (!isGameOver && !isClear) {
            let moveSpeed = 5;

            if (dashCooldown > 0) dashCooldown--;
            if (dashFrames > 0) {
                player.vel.x = dashDirection * 12;
                player.vel.y = 0;
                dashFrames--;
            } else if (kb.presses('shift') && dashCooldown === 0) {
                // Dash in the facing direction for a few frames, then recharge.
                dashDirection = player.mirror.x ? -1 : 1;
                dashFrames = 9;
                dashCooldown = 130;
                player.vel.x = dashDirection * 12;
                player.vel.y = 0;
            } else {

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
            if ((kb.presses('space') || kb.presses('up')) && player.colliding(platforms)) {
                player.vel.y = -11;
            }
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
        drawUI();
    }

    // Cyan streaks trail the player only while the dash is active.
    if (gameState === 'PLAY' && dashFrames > 0 && player) {
        push();
        noStroke();
        for (let i = 1; i <= 4; i++) {
            fill(80, 235, 255, 100 - i * 18);
            ellipse(player.x - dashDirection * i * 13, player.y, 18 - i * 2, 28 - i * 3);
        }
        drawingContext.shadowBlur = 22;
        drawingContext.shadowColor = '#50ebff';
        tint(135, 245, 255);
        player.draw();
        noTint();
        drawingContext.shadowBlur = 0;
        pop();
    } else {
        allSprites.draw();
    }


    if (gameState === 'START') {
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
