// 閉店後のキャンディ工場。30秒以内にすべてのお菓子を集めます。
let player;
let platforms;
let coins;
let enemies;
let lifts;
let trampoline;
let playerImg;
let candyImages = [];
let enemyImages = [];

const TIME_LIMIT = 30;
// 中央の床からスタートします。被弾後もここに戻ります。
const START_POSITION = { x: 400, y: 438 };
let totalCoins = 8;
let lives = 3;
let collectedCoins = 0;
let gameState = 'START';
let startedAt = 0;
let clearTime = 0;
let finishedElapsed = 0;
let invincibleUntil = 0;
let bounceUntil = 0;
let gameOverReason = '';
let sparkles = [];

function preload() {
    // プレイヤーにはウサギの画像を使います。
    playerImg = loadImage('assets/rabbit.svg');
    candyImages = [loadImage('assets/candy_orange.svg'), loadImage('assets/candy_purple.svg')];
    enemyImages = [loadImage('assets/golem_brown.svg'), loadImage('assets/golem_grey.svg')];
}

function setup() {
    new Canvas(800, 500);
    noSmooth(); // SVGのドット絵をくっきり見せます。
    textFont('sans-serif');
    createGameWorld();
    world.timeScale = 0;
}

function createGameWorld() {
    platforms = new Group();
    platforms.collider = 'static';
    platforms.bounciness = 0;
    platforms.draw = function () { drawWafer(this.w, this.h); };
    new platforms.Sprite(400, 480, 800, 40);
    new platforms.Sprite(220, 365, 160, 20);
    new platforms.Sprite(580, 365, 160, 20);
    new platforms.Sprite(400, 280, 180, 20);
    new platforms.Sprite(200, 180, 140, 20);
    new platforms.Sprite(600, 180, 140, 20);

    // 縦に往復する、キャンディストライプのリフトです。
    lifts = new Group();
    lifts.collider = 'kinematic';
    lifts.bounciness = 0;
    lifts.friction = 1;
    const lift = new lifts.Sprite(725, 335, 110, 18);
    lift.vel.y = -1.25;
    lift.draw = function () {
        push();
        rectMode(CENTER);
        stroke('#76416d');
        strokeWeight(2);
        fill('#fff2fa');
        rect(0, 0, this.w, this.h, 5);
        noStroke();
        fill('#e879ad');
        for (let x = -43; x < 50; x += 20) rect(x, 0, 9, 14, 2);
        pop();
    };

    // グミのジャンプ台は反発係数を1.5にします。
    trampoline = new Sprite(40, 449, 48, 22, 'static');
    trampoline.bounciness = 1.5;
    trampoline.draw = function () {
        push();
        rectMode(CENTER);
        stroke('#418e89');
        strokeWeight(2);
        fill('#8de4c8');
        rect(0, 0, this.w, this.h, 9);
        noStroke();
        fill('#e3fff2');
        rect(0, -5, this.w - 16, 5, 3);
        fill('#276a66');
        textSize(12);
        textAlign(CENTER, CENTER);
        text('↑ ↑ ↑', 0, 3);
        pop();
    };

    coins = new Group();
    coins.collider = 'static';
    // 床と各足場に候補地点を作り、毎回8か所を重複なしで抽選します。
    // どの足場に出るかも変わり、キャンディー同士の間隔は確保します。
    const candySpots = [150, 240, 550, 680, 750].map(x => ({ x, top: 460 }));
    for (const platform of [...platforms].slice(1)) {
        for (const side of [-1, 1]) {
            candySpots.push({
                x: platform.x + side * platform.w / 4,
                top: platform.y - platform.h / 2
            });
        }
    }
    for (let i = 0; i < totalCoins; i++) {
        const spotIndex = floor(random(candySpots.length));
        const spot = candySpots.splice(spotIndex, 1)[0];
        const x = spot.x + random(-8, 8);
        const y = spot.top - random(30, 50);
        const candy = new coins.Sprite(x, y, 44, 22);
        candy.candyImage = candyImages[i % candyImages.length];
        candy.phase = i * 0.8;
        candy.draw = function () {
            push();
            imageMode(CENTER);
            const bob = sin(millis() / 250 + this.phase) * 2;
            image(this.candyImage, 0, bob, 50, 50 * 210 / 510);
            pop();
        };
    }

    enemies = new Group();
    enemies.collider = 'kinematic';
    // どちらのゴーレムも敵です。足場の上を巡回します。
    // 開始直後に中央のプレイヤーと重ならない位置から敵を動かします。
    const patrols = [[560, 439, 290, 660, 1.6], [200, 334, 160, 280, 1.1],
        [600, 149, 555, 645, -0.8]];
    patrols.forEach(([x, y, left, right, velocity], i) => {
        const enemy = new enemies.Sprite(x, y, 36, 40);
        enemy.leftEdge = left;
        enemy.rightEdge = right;
        enemy.vel.x = velocity;
        enemy.baseSpeed = abs(velocity); // 加速の基準を保存し、毎フレームの掛け算による暴走を防ぎます。
        enemy.golemImage = enemyImages[i % enemyImages.length];
        enemy.draw = function () {
            push();
            imageMode(CENTER);
            // 赤い足元の影で、敵であることを見分けやすくします。
            noStroke();
            fill(209, 63, 94, 70);
            ellipse(0, 20, 43, 8);
            image(this.golemImage, 0, -2, 48, 48 * 510 / 540);
            pop();
        };
    });

    player = new Sprite(START_POSITION.x, START_POSITION.y, 30, 44);
    player.rotationLock = true;
    player.bounciness = 0;
    player.friction = 0;
    player.draw = function () {
        // 被弾後の1秒間は点滅し、連続で残機を失わないようにします。
        if (gameState === 'PLAY' && millis() < invincibleUntil && floor(millis() / 90) % 2 === 0) return;
        push();
        imageMode(CENTER);
        // 耳を含めた画像全体を当たり判定の高さに合わせ、縦横比を保ちます。
        image(playerImg, 0, 0, this.h * playerImg.width / playerImg.height, this.h);
        pop();
    };
    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);
    player.collides(trampoline, () => {
        // 上から着地した場合だけ、一定の高さまでボヨーンと跳ねます。
        if (gameState === 'PLAY' && player.y < trampoline.y - trampoline.h / 2 && millis() >= bounceUntil) {
            player.vel.y = -16;
            bounceUntil = millis() + 180;
            addSparkles(player.x, trampoline.y - 10, '#61d6bd');
        }
    });
}

function getCoin(character, candy) {
    // 終了後のコールバックや、同じキャンディーの二重取得を防ぎます。
    if (gameState !== 'PLAY' || candy.collected) return;
    if (elapsedSeconds() >= TIME_LIMIT) { finishGame('GAMEOVER', 'TIME UP! 工場が閉まりました'); return; }
    candy.collected = true;
    addSparkles(candy.x, candy.y, '#edab45');
    candy.remove();
    collectedCoins++;
    if (collectedCoins === totalCoins) {
        clearTime = elapsedSeconds();
        finishGame('CLEAR');
    }
}

function hitEnemy() {
    if (gameState !== 'PLAY' || millis() < invincibleUntil) return;
    lives--;
    if (lives <= 0) { finishGame('GAMEOVER', 'ゴーレムにつかまってしまった！'); return; }
    player.x = START_POSITION.x;
    player.y = START_POSITION.y;
    player.vel.x = 0;
    player.vel.y = 0;
    invincibleUntil = millis() + 1000;
}

function elapsedSeconds() {
    return (millis() - startedAt) / 1000;
}

// 表示も敵の加速も、同じ残り時間を使って切り替えます。
function remainingSeconds() {
    if (gameState === 'START') return TIME_LIMIT;
    if (gameState === 'PLAY') return max(0, TIME_LIMIT - elapsedSeconds());
    return max(0, TIME_LIMIT - finishedElapsed);
}

function finishGame(state, reason = '') {
    finishedElapsed = min(TIME_LIMIT, elapsedSeconds());
    gameState = state;
    gameOverReason = reason;
    world.timeScale = 0; // 終了画面では敵・足場・プレイヤーを止めます。
}

function updateGame() {
    if (elapsedSeconds() >= TIME_LIMIT) {
        finishGame('GAMEOVER', 'TIME UP! 工場が閉まりました');
        return;
    }
    // 残り10秒では、左右の移動速度を通常の1.5倍にします。
    const moveSpeed = 4.5 * (remainingSeconds() <= 10 ? 1.5 : 1);
    player.vel.x = 0;
    if (kb.pressing('left')) { player.vel.x = -moveSpeed; player.mirror.x = true; }
    if (kb.pressing('right')) { player.vel.x = moveSpeed; player.mirror.x = false; }
    // 横や天井に触れただけではジャンプできないよう、足元の高さも確認します。
    const supports = [...platforms, ...lifts];
    const grounded = supports.some(surface =>
        player.colliding(surface) &&
        abs(player.y + player.h / 2 - (surface.y - surface.h / 2)) < 7
    );
    if (kb.presses('space') && grounded) player.vel.y = -10.5;
    player.x = constrain(player.x, 20, width - 20);
    if (player.y > height + 60) hitEnemy();

    // 残り10秒から、すべてのゴーレムが通常の2.2倍の速さになります。
    const speedMultiplier = remainingSeconds() <= 10 ? 2.2 : 1;
    for (const enemy of enemies) {
        let direction = enemy.vel.x < 0 ? -1 : 1;
        if (enemy.x <= enemy.leftEdge) direction = 1;
        if (enemy.x >= enemy.rightEdge) direction = -1;
        enemy.x = constrain(enemy.x, enemy.leftEdge, enemy.rightEdge);
        enemy.vel.x = direction * enemy.baseSpeed * speedMultiplier;
        enemy.mirror.x = direction < 0;
    }
    for (const lift of lifts) {
        if (lift.y <= 205) lift.vel.y = 1.25;
        if (lift.y >= 365) lift.vel.y = -1.25;
    }
}

function draw() {
    drawFactory();
    if (gameState === 'PLAY') updateGame();
    // 赤い部屋はキャラクターより後ろ、透過した数字は手前に描きます。
    if (gameState === 'PLAY' && remainingSeconds() <= 10) drawAlarmRoom();
    allSprites.draw();
    drawSparkles();
    if (gameState === 'PLAY' && remainingSeconds() <= 10) drawCountdown();
    drawUI();
    if (gameState === 'START') {
        drawOverlay('CANDY FACTORY', '閉店まで30秒。キャンディーを全部集めよう！',
            '2種類のゴーレムに注意！ ミントのグミで大ジャンプ');
    } else if (gameState === 'GAMEOVER') {
        drawOverlay('GAME OVER', gameOverReason, 'SPACE キーでもう一度チャレンジ');
    } else if (gameState === 'CLEAR') {
        drawOverlay('SWEET CLEAR!', `CLEAR TIME: ${clearTime.toFixed(2)}秒！`,
            '全部集めた！ SPACE キーでもう一度遊ぶ');
    }
    if (gameState !== 'PLAY' && kb.presses('space')) startGame();
}

function drawUI() {
    push();
    rectMode(CORNER);
    noStroke();
    fill('#fff5fc');
    rect(14, 12, 772, 66, 12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(16);
    fill('#72405d');
    text(`CANDY  ${collectedCoins} / ${totalCoins}   残り ${totalCoins - collectedCoins}個`, 30, 34);
    fill('#d44f7b');
    text(`LIVES  ${'♥ '.repeat(lives)}${'♡ '.repeat(3 - lives)}`, 350, 34);
    const remaining = remainingSeconds();
    fill(remaining <= 10 ? '#c43b53' : '#4b827c');
    textAlign(RIGHT, CENTER);
    text(`TIME  ${remaining.toFixed(1)} 秒`, 768, 34);
    textAlign(LEFT, CENTER);
    textStyle(NORMAL);
    textSize(13);
    fill('#805c73');
    text('← →  移動     SPACE  ジャンプ     ミントのグミ  大ジャンプ', 30, 59);
    pop();
}

// エラー発生中の部屋。ゆっくり赤く明滅し、細いノイズが走ります。
function drawAlarmRoom() {
    push();
    rectMode(CORNER);
    const pulse = (sin(millis() / 380) + 1) / 2;
    noStroke();
    fill(230, 28, 57, 42 + pulse * 28);
    rect(0, 0, width, height);
    fill(218, 32, 68, 18 + pulse * 16);
    for (let i = 0; i < 5; i++) {
        const y = 90 + ((millis() / 35 + i * 83) % (height - 90));
        rect(0, y, width, 2);
    }
    noFill();
    stroke(220, 36, 67, 100 + pulse * 70);
    strokeWeight(7);
    rect(4, 4, width - 8, height - 8, 7);
    pop();
}

// 大きな数字を薄く重ね、プレイヤーやお菓子が透けて見えるようにします。
function drawCountdown() {
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(height * 0.8);
    fill(185, 24, 58, 35);
    stroke(255, 237, 242, 85);
    strokeWeight(2);
    text(ceil(remainingSeconds()), width / 2, height * 0.55);
    noStroke();
    fill('#ba3454');
    textSize(14);
    text('SYSTEM ERROR  /  SPEED UP', width / 2, 96);
    pop();
}

function drawWafer(w, h) {
    push();
    rectMode(CENTER);
    stroke('#aa704d');
    strokeWeight(2);
    fill('#e9b87c');
    rect(0, 0, w, h, 4);
    stroke('#c68b56');
    strokeWeight(1);
    for (let x = -w / 2 + 12; x < w / 2; x += 18) line(x, -h / 2 + 5, x, h / 2 - 2);
    line(-w / 2 + 3, 3, w / 2 - 3, 3);
    stroke('#fff1ce');
    strokeWeight(5);
    line(-w / 2 + 4, -h / 2 + 2, w / 2 - 4, -h / 2 + 2);
    pop();
}

function drawFactory() {
    push();
    background('#d3edf0');
    noStroke();
    // 壁のドット、窓、製造タンクを淡い色で描き、素材を引き立てます。
    fill('#c2e1e6');
    for (let x = 20; x < width; x += 32) {
        for (let y = 100; y < 460; y += 32) circle(x, y, 3);
    }
    rectMode(CORNER);
    for (const x of [30, 325, 660]) {
        fill('#a5d0d9');
        rect(x, 100, 110, 110, 16);
        fill('#eefbff');
        rect(x + 7, 107, 96, 96, 12);
        fill('#c2e5ec');
        rect(x + 52, 107, 6, 96);
        rect(x + 7, 152, 96, 6);
    }
    fill('#b2d8de');
    rect(305, 325, 185, 135, 24, 24, 0, 0);
    fill('#cee8e9');
    rect(315, 335, 165, 125, 18, 18, 0, 0);
    fill('#a0c6cf');
    rect(390, 300, 16, 42);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    fill('#648d99');
    textSize(17);
    text('SWEET WORKS', 400, 385);
    fill('#85bdb8');
    rect(715, 190, 5, 222, 2);
    rect(735, 190, 5, 222, 2);
    pop();
}

function drawOverlay(title, message, detail) {
    push();
    rectMode(CORNER);
    noStroke();
    fill(35, 34, 58, 160);
    rect(0, 0, width, height);
    fill('#fff6fc');
    rect(85, 135, 630, 245, 22);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(39);
    fill('#b64779');
    text(title, width / 2, 190);
    textSize(18);
    fill('#714964');
    text(message, width / 2, 248);
    textStyle(NORMAL);
    textSize(15);
    text(detail, width / 2, 289);
    fill('#3d7c77');
    text('← →  移動     SPACE  ジャンプ / スタート', width / 2, 339);
    pop();
}

function addSparkles(x, y, color) {
    for (let i = 0; i < 12; i++) {
        sparkles.push({ x, y, vx: random(-2, 2), vy: random(-3, -1), life: 1, color });
    }
}

function drawSparkles() {
    push();
    noStroke();
    for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        if (gameState === 'PLAY') {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08;
            p.life -= 0.035;
        }
        const c = color(p.color);
        c.setAlpha(max(0, p.life) * 255);
        fill(c);
        circle(p.x, p.y, 4);
        if (p.life <= 0) sparkles.splice(i, 1);
    }
    pop();
}

function startGame() {
    allSprites.remove();
    sparkles = [];
    lives = 3;
    collectedCoins = 0;
    clearTime = 0;
    finishedElapsed = 0;
    gameOverReason = '';
    invincibleUntil = 0;
    bounceUntil = 0;
    world.gravity.y = 20;
    world.timeScale = 1;
    createGameWorld();
    startedAt = millis();
    gameState = 'PLAY';
}
