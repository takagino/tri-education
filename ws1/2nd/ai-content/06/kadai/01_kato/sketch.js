// ========================================================
// 06_p5playの基礎: 実践ミニゲーム「Coin Hunter」 (完全進化版)
// ========================================================

let player;
let platforms;
let movingPlatform; // 動く足場
let jumpPad;        // スーパージャンプ台
let coins;
let enemies;

// 画像アセット用の変数
let playerImg;
let coinImg;
let enemyImg;

let totalCoins = 9;     // コインの総数
let collectedCoins = 0; // 集めたコインの数
let lives = 3;          // 残機
let maxTime = 35;       // 制限時間（秒）
let timer = 35;
let startTime = 0;
let clearTime = 0;      // クリアにかかった時間

let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER', 'CLEAR'

// 画像のプリロード（ゲーム起動前に先読み）
function preload() {
    playerImg = loadImage('assets/player.svg');
    coinImg = loadImage('assets/coin.svg');
    enemyImg = loadImage('assets/enemy.svg');
}

function setup() {
    new Canvas(800, 500);
}

// ゲームステージの生成処理
function createGameWorld() {
    // ----------------------------------------------------
    // ① プレイヤーの作成（画像を設定）
    // ----------------------------------------------------
    player = new Sprite(80, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;
    player.rotationLock = true; // 転倒防止

    // ----------------------------------------------------
    // ② 足場グループ (platforms): 固定の足場
    // ----------------------------------------------------
    platforms = new Group();
    platforms.color = '#2ed573';
    platforms.collider = 'static';

    // 地面
    new platforms.Sprite(400, 480, 800, 40);

    // 通常の浮かぶ足場たち
    new platforms.Sprite(180, 380, 140, 20);
    new platforms.Sprite(620, 380, 140, 20);
    new platforms.Sprite(200, 180, 130, 20);
    new platforms.Sprite(600, 180, 130, 20);

    // ----------------------------------------------------
    // ③ 動く足場 (リフト): kinematic を使って左右に自動往復[cite: 1]
    // ----------------------------------------------------
    movingPlatform = new Sprite(400, 300, 140, 20);
    movingPlatform.color = '#1e90ff';
    movingPlatform.collider = 'kinematic';
    movingPlatform.vel.x = 2; // 最初は右へ動く

    // ----------------------------------------------------
    // ④ スーパージャンプ台: bounciness（反発係数）を高めたトランポリンブロック[cite: 1]
    // ----------------------------------------------------
    jumpPad = new Sprite(400, 455, 100, 15);
    jumpPad.color = '#ffa502';
    jumpPad.collider = 'static';
    jumpPad.bounciness = 1.5; // 高く飛び上がる反発力[cite: 1]

    // ----------------------------------------------------
    // ⑤ コイングループ (coins): ステージ全体に散りばめる
    // ----------------------------------------------------
    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'static';

    // 決まった位置＆ランダムにコインを配置
    let coinPositions = [
        { x: 180, y: 320 }, { x: 620, y: 320 },
        { x: 400, y: 220 }, // 動く足場の上あたり
        { x: 200, y: 120 }, { x: 600, y: 120 },
        { x: 100, y: 420 }, { x: 700, y: 420 },
        { x: 350, y: 410 }, { x: 450, y: 410 }
    ];

    for (let pos of coinPositions) {
        new coins.Sprite(pos.x, pos.y);
    }

    // ----------------------------------------------------
    // ⑥ 危険な敵キャラグループ (enemies)
    // ----------------------------------------------------
    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic';

    // ----------------------------------------------------
    // ⑦ 接触イベントの登録 (overlaps)
    // ----------------------------------------------------
    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);
}

// 左右からランダムに敵キャラを流す関数
function spawnEnemy() {
    let fromLeft = random() < 0.5;
    let startX = fromLeft ? -30 : width + 30;
    let speed = random(3.5, 6.5);
    let vx = fromLeft ? speed : -speed;

    let spawnY = random([140, 240, 340, 430]);

    let e = new enemies.Sprite(startX, spawnY);
    e.vel.x = vx;

    if (fromLeft) {
        e.mirror.x = true;
    }
}

// コイン獲得時の処理
function getCoin(player, coin) {
    coin.remove();
    collectedCoins++;

    if (coins.length === 0) {
        clearTime = ((millis() - startTime) / 1000).toFixed(1);
        gameState = 'CLEAR';
    }
}

// 敵キャラ接触時の処理
function hitEnemy(player, enemy) {
    lives--;
    enemy.remove();

    if (lives <= 0) {
        gameState = 'GAMEOVER';
        player.visible = false;
    } else {
        player.x = 80;
        player.y = 380;
        player.vel.x = 0;
        player.vel.y = 0;
    }
}

function draw() {
    clear();
    background('#1e272e');

    if (gameState === 'PLAY') {
        // --- 制限時間の計算 ---
        let elapsedTime = (millis() - startTime) / 1000;
        timer = max(0, ceil(maxTime - elapsedTime));

        if (timer <= 0) {
            gameState = 'GAMEOVER';
            player.visible = false;
        }

        // --- 動く足場 (リフト) の往復移動制御 ---
        if (movingPlatform.x > 580) {
            movingPlatform.vel.x = -2; // 左へ折り返す
        } else if (movingPlatform.x < 220) {
            movingPlatform.vel.x = 2;  // 右へ折り返す
        }

        // --- プレイヤーの操作 ---
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

        // ジャンプ（通常の足場、動く足場、ジャンプ台のいずれかに乗っているとき）
        if (kb.presses('space') && (player.colliding(platforms) || player.colliding(movingPlatform) || player.colliding(jumpPad))) {
            player.vel.y = -11;
        }

        // 画面外に出ないように制限
        player.x = constrain(player.x, 25, width - 25);

        // --- 敵キャラの生成と管理 ---
        if (frameCount % 65 === 0) {
            spawnEnemy();
        }

        for (let e of enemies) {
            if (e.x < -60 || e.x > width + 60) {
                e.remove();
            }
        }
    }

    // スプライト描画
    allSprites.draw();

    // オーバーレイおよびUI描画
    if (gameState === 'START') {
        drawOverlay('COIN HUNTER EX', '#feca57', 'SPACEキーでゲームスタート！');
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'PLAY') {
        drawUI();

    } else if (gameState === 'GAMEOVER') {
        let msg = timer <= 0 ? 'TIME UP! SPACEキーでリトライ' : 'SPACEキーでリトライ';
        drawOverlay('GAME OVER...', '#ff4757', msg);
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'CLEAR') {
        drawOverlay('★ STAGE CLEAR! ★', '#2ed573', `CLEAR TIME: ${clearTime}秒\nSPACEキーでもう一度遊ぶ`);
        if (kb.presses('space')) {
            startGame();
        }
    }
}

// スコア・ライフ・タイマーのUI描画
function drawUI() {
    textAlign(RIGHT, TOP);
    fill('#a4b0be');
    textSize(14);
    text('← → : 移動  /  SPACE : ジャンプ', width - 25, 20);

    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);

    // 残機
    fill('#ff4757');
    let heartIcons = '♥ '.repeat(lives);
    text(`LIVES: ${heartIcons}`, 25, 20);

    // コイン数
    fill('#feca57');
    text(`COINS: ${collectedCoins} / ${totalCoins}`, 25, 45);

    // タイマー
    fill(timer <= 5 ? '#ff4757' : '#ffffff');
    text(`TIME: ${timer}s`, 25, 70);
}

// オーバーレイ画面の共通描画
function drawOverlay(titleText, titleColor, subText) {
    noStroke();
    fill(0, 0, 0, 190);
    rectMode(CORNER);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(titleColor);
    textSize(44);
    textStyle(BOLD);
    text(titleText, width / 2, height / 2 - 45);

    fill(255);
    textSize(18);
    textStyle(NORMAL);
    text(subText, width / 2, height / 2 + 35);
}

// ゲーム開始・リセット処理
function startGame() {
    gameState = 'PLAY';
    collectedCoins = 0;
    lives = 3;
    timer = maxTime;
    startTime = millis();

    allSprites.remove();
    world.gravity.y = 20;
    createGameWorld();
}