// ========================================================
// 06_p5playの基礎: 実践ミニゲーム「Coin Hunter」
// ========================================================

let player;
let platforms;
let coins;
let enemies;
let frogs;

// 画像アセット用の変数
let playerImg;
let coinImg;
let enemyImg;
let frogImg;

let totalCoins = 8;
let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER', 'CLEAR'

// 画像のプリロード（ゲーム起動前に先読み）
function preload() {
    playerImg = loadImage('assets/player.svg');
    coinImg = loadImage('assets/coin.svg');
    enemyImg = loadImage('assets/enemy.svg');
    frogImg = loadImage('assets/frog.svg');
}

function setup() {
    new Canvas(800, 500);
}

// ゲームステージの生成処理
function createGameWorld() {
    player = new Sprite(80, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;
    player.rotationLock = true;


    platforms = new Group();
    platforms.color = '#34132B';
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

    for (let i = 0; i < totalCoins; i++) {
        let rx = random(60, width - 60);
        let ry = random(80, 420);
        new coins.Sprite(rx, ry);
    }


    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic'; // 重力で落ちず、真っ直ぐ進む

    frogs = new Group();
    frogs.img = frogImg;
    frogs.scale = 0.09;
    frogs.w = 40;
    frogs.h = 40;
    frogs.collider = 'dynamic';
    frogs.friction = 0.1;
    frogs.bounciness = 0.1;
    frogs.rotationLock = true;

    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);
    player.overlaps(frogs, hitEnemy);

    spawnFrog();
}


function spawnEnemy() {
    let fromLeft = random() < 0.5;
    let startX = fromLeft ? -30 : width + 30;
    let speed = random(3, 6);
    let vx = fromLeft ? speed : -speed;

    // 足場や地面の高さを目安に、流れる高さをランダム選択
    let spawnY = random([150, 250, 350, 435]);

    let e = new enemies.Sprite(startX, spawnY);
    e.vel.x = vx;

    // 進行方向に向きを合わせる（右向きなら反転）
    if (fromLeft) {
        e.mirror.x = true;
    }
}

function spawnFrog() {
    if (frogs.length >= 2) return;

    // 足場に埋まらないよう、少し上の空中に生成して自動で着地させる
    let f = new frogs.Sprite(random(40, width - 40), 400);
    f.vel.y = -3;
}

function updateFrog(frog) {
    // 足場に触れていて、着地しており、さらに「低い確率（3%）」の時だけジャンプする
    if (frog.colliding(platforms) && Math.abs(frog.vel.y) < 1) {
        if (random() < 0.03) {
            frog.vel.y = -9;
            frog.vel.x = random([-4, -3, 3, 4]);
            frog.mirror.x = frog.vel.x < 0;
        }
    }

    if (frog.x < 25 || frog.x > width - 25) frog.vel.x *= -1;
}


function getCoin(player, coin) {
    coin.remove(); // コイン消滅

    // 全てのコインを集めたらクリア！
    if (coins.length === 0) {
        gameState = 'CLEAR';
    }
}


function hitEnemy(player, enemy) {
    gameState = 'GAMEOVER';
    player.visible = false; // プレイヤーを非表示
}

function draw() {
    clear();
    background('#4B3150');

    if (gameState === 'PLAY') {
        let moveSpeed = 5;

        if (kb.pressing('left')) {
            player.vel.x = -moveSpeed;
            player.mirror.x = true;  // 左を向く
        } else if (kb.pressing('right')) {
            player.vel.x = moveSpeed;
            player.mirror.x = false; // 右を向く
        } else {
            player.vel.x = 0;
        }

        if ((kb.presses('space') && player.colliding(platforms))) {
            player.vel.y = -10;
        }


        player.x = constrain(player.x, 25, width - 25);



        if (frameCount % 75 === 0) {
            spawnEnemy();
        }

        if (frameCount % 210 === 0) {
            spawnFrog();
        }

        for (let e of enemies) {
            if (e.x < -60 || e.x > width + 60) {
                e.remove();
            }
        }

        for (let frog of frogs) {
            updateFrog(frog);
        }

    }

    // 全スプライトを明示的に描画
    allSprites.draw();

    // スプライトの上にUIや画面オーバーレイを描画
    if (gameState === 'START') {
        drawOverlay('COIN HUNTER', '#feca57', 'SPACEキーでゲームスタート！');
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'PLAY') {
        drawUI();

    } else if (gameState === 'GAMEOVER') {
        drawOverlay('GAME OVER...', '#ff4757', 'SPACEキーでリトライ');
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'CLEAR') {
        drawOverlay('★ STAGE CLEAR! ★', '#2ed573', 'SPACEキーでもう一度遊ぶ');
        if (kb.presses('space')) {
            startGame();
        }
    }
}

// スコアのUI描画
function drawUI() {
    textAlign(RIGHT, TOP);
    fill('#a4b0be');
    textSize(14);
    text('← → : 移動  /  SPACE : ジャンプ', width - 25, 20);
}

// オーバーレイ画面（タイトル / ゲームオーバー / クリア）の共通描画
function drawOverlay(titleText, titleColor, subText) {
    // 画面全体を半透明の黒で覆う
    noStroke();
    fill(0, 0, 0, 190);
    rectMode(CORNER);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(titleColor);
    textSize(46);
    textStyle(BOLD);
    text(titleText, width / 2, height / 2 - 35);

    fill(255);
    textSize(20);
    textStyle(NORMAL);
    text(subText, width / 2, height / 2 + 40);
}

// ゲーム開始・リセット処理
function startGame() {
    gameState = 'PLAY';

    // 既存のスプライトを全消去して再生成
    allSprites.remove();
    world.gravity.y = 20; // 重力設定
    createGameWorld();
}