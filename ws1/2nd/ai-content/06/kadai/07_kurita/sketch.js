let player;
let platforms;
let coins;
let enemies;
let playerImg;
let coinImg;
let bonusCoinImg;
let enemyImg;

let bonusCoins;
let timeLeft = 30;
let gameStartTime = 0;
let bonusTime = 0;
let lives = 3;

let totalCoins = 8;
let gameState = 'START';
let timeDisplay;
let statusDisplay;

function preload() {
    playerImg = loadImage('assets/player.svg');
    coinImg = loadImage('assets/coin_01.svg');
    bonusCoinImg = loadImage('assets/coin_02.svg');
    enemyImg = loadImage('assets/enemy.svg');
}

function setup() {
    createCanvas(800, 500);
    timeDisplay = createDiv('30');
    timeDisplay.style('position', 'absolute');
    timeDisplay.style('font-size', '60px');
    timeDisplay.style('font-weight', 'bold');
    timeDisplay.style('line-height', '1');
    timeDisplay.style('font-family', 'sans-serif');
    timeDisplay.style('color', '#171738');
    timeDisplay.style('pointer-events', 'none');
    timeDisplay.hide();

    statusDisplay = createDiv('');
    statusDisplay.style('position', 'absolute');
    statusDisplay.style('font-family', 'sans-serif');
    statusDisplay.style('line-height', '1.5');
    statusDisplay.style('color', '#f8f1d5');
    statusDisplay.style('pointer-events', 'none');
    statusDisplay.style('white-space', 'nowrap');
    statusDisplay.hide();
}

function createGameWorld() {
    player = new Sprite(80, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;
    player.rotationLock = true;

    platforms = new Group();
    platforms.color = '#36c9c6';
    platforms.collider = 'static';

    new platforms.Sprite(400, 480, 800, 40);

    new platforms.Sprite(220, 380, 160, 20);
    new platforms.Sprite(580, 380, 160, 20);
    new platforms.Sprite(400, 300, 180, 20);
    new platforms.Sprite(200, 180, 140, 20);
    new platforms.Sprite(600, 180, 140, 20);

    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'static';

    // 通常コイン5枚を配置
    for (let i = 0; i < 5; i++) {
        let rx = random(60, width - 60);
        let ry = random(80, 420);
        new coins.Sprite(rx, ry);
    }

    bonusCoins = new Group();
    bonusCoins.img = bonusCoinImg;
    bonusCoins.scale = 0.08;
    bonusCoins.w = 26;
    bonusCoins.h = 34;
    bonusCoins.collider = 'static';

    // ボーナスコイン3枚を配置（合計8枚）
    new bonusCoins.Sprite(120, 280);
    new bonusCoins.Sprite(400, 220);
    new bonusCoins.Sprite(700, 280);

    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic';

    player.overlaps(coins, getCoin);
    player.overlaps(bonusCoins, getBonusCoin);
    player.overlaps(enemies, hitEnemy);
}

function spawnEnemy() {
    let fromLeft = random() < 0.5;
    let startX = fromLeft ? -30 : width + 30;
    let speed = random(1, 2);
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
    checkAllCoinsCollected();
}

function getBonusCoin(player, bonusCoin) {
    bonusCoin.remove();
    bonusTime += 5;
    checkAllCoinsCollected();
}

function checkAllCoinsCollected() {
    if (coins.length + bonusCoins.length === 0) {
        gameState = 'CLEAR';
    }
}

function hitEnemy(player, enemy) {
    // 敵に当たったら残機を1つ減らす
    lives--;
    enemy.remove();

    if (lives <= 0) {
        gameState = 'GAMEOVER';
        player.visible = false;
    } else {
        // 残機がある場合はスタート地点に戻す
        player.x = 80;
        player.y = 380;
        player.vel.x = 0;
        player.vel.y = 0;
    }
}

function draw() {
    clear();
    background('#171738');
    if (timeDisplay) timeDisplay.hide();
    if (statusDisplay) statusDisplay.hide();

    if (gameState === 'START' || gameState === 'GAMEOVER') {
        drawBrickBackground();
    }

    if (gameState === 'PLAY') {
        // 経過時間に応じて残り時間を更新
        timeLeft = max(0, 30 - floor((millis() - gameStartTime) / 1000) + bonusTime);
        if (timeLeft <= 0) {
            gameState = 'GAMEOVER';
        }

        let moveSpeed = 5;
        if (kb.pressing('left')) {
            player.vel.x = -moveSpeed;
            player.mirror.x = true;
        } else if (kb.pressing('right')) {
            player.vel.x = moveSpeed;
            player.mirror.x = false;
        } else {
            player.vel.x = 0;
        }

        if (kb.presses('space') && player.colliding(platforms)) {
            player.vel.y = -11;
        }

        player.x = constrain(player.x, 25, width - 25);

        if (frameCount % 100 === 0) {
            spawnEnemy();
        }

        for (let e of enemies) {
            if (e.x < -60 || e.x > width + 60) {
                e.remove();
            }
        }
    }

    if (gameState !== 'GAMEOVER') {
        allSprites.draw();
    }

    if (gameState === 'START') {
        drawOverlay('COIN HUNTER', '#feca57', 'SPACEキーでゲームスタート！');
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'PLAY') {
        drawUI();

    } else if (gameState === 'GAMEOVER') {
        for (let sprite of allSprites) {
            sprite.visible = false;
        }
        drawBrickBackground();
        drawOverlay('TIME UP / GAME OVER', '#feca57', '時間切れ！ SPACEキーでリトライ');
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'CLEAR') {
        drawOverlay('★ STAGE CLEAR! ★', '#a8e063', 'SPACEキーでもう一度遊ぶ');
        if (kb.presses('space')) {
            startGame();
        }
    }
}

function drawUI() {
    textAlign(RIGHT, TOP);
    fill('#f8f1d5');
    textSize(14);
    text('← → : 移動  /  SPACE : ジャンプ', width - 25, 20);

    textAlign(LEFT, TOP);
    textSize(24);
    fill('#ff5c5c');
    text('♥ '.repeat(lives), 25, 15);

    if (timeDisplay) {
        const canvasBounds = document.querySelector('canvas').getBoundingClientRect();
        timeDisplay.position(canvasBounds.left + window.scrollX + 20, canvasBounds.top + window.scrollY - 68);
        timeDisplay.html(String(timeLeft));
        timeDisplay.style('color', timeLeft <= 10 ? '#ff5c5c' : '#171738');
        timeDisplay.show();
    }

    let collectedCoins = totalCoins - coins.length - bonusCoins.length;

    if (statusDisplay) {
        const canvasBounds = document.querySelector('canvas').getBoundingClientRect();
        statusDisplay.position(canvasBounds.left + window.scrollX + 150, canvasBounds.top + window.scrollY - 58);
        statusDisplay.html(
            '<div style="display:flex; flex-direction:column; align-items:flex-start; white-space:nowrap;">' +
            '<span style="font-size:14px; color:#80502f;">シルバーコインを取ると +5秒！</span>' +
            '<span style="font-size:18px; color:#171738;">COINS: ' + collectedCoins + ' / ' + totalCoins + '</span>' +
            '</div>'
        );
        statusDisplay.show();
    }
}

function drawBrickBackground() {
    const brickW = 80;
    const brickH = 36;
    const mortar = 4;

    noStroke();
    background('#4a2b20');

    // レンガの目地
    fill('#6b402b');
    for (let y = 0; y < height; y += brickH) {
        rect(0, y, width, mortar);
    }

    // レンガ本体
    for (let row = 0; row < ceil(height / brickH); row++) {
        let offsetX = row % 2 === 0 ? 0 : -brickW / 2;
        for (let x = offsetX; x < width; x += brickW) {
            fill('#a85f35');
            rect(x + mortar / 2, row * brickH + mortar / 2, brickW - mortar, brickH - mortar);

            // レンガ上部のハイライト
            fill('#c47a48');
            rect(x + mortar / 2, row * brickH + mortar / 2, brickW - mortar, 4);
        }
    }
}

function drawOverlay(titleText, titleColor, subText) {
    noStroke();
    textAlign(CENTER, CENTER);
    fill(titleColor);
    textSize(46);
    textStyle(BOLD);
    text(titleText, width / 2, height / 2 - 35);

    fill('#f8f1d5');
    textSize(20);
    textStyle(NORMAL);
    text(subText, width / 2, height / 2 + 40);
}

function startGame() {
    gameState = 'PLAY';
    bonusTime = 0;
    timeLeft = 30;
    gameStartTime = millis();
    lives = 3;

    allSprites.remove();
    world.gravity.y = 20;
    createGameWorld();
}