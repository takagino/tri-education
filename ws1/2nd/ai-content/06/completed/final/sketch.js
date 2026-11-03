// ========================================================
// 06_p5playの基礎: 🌟 完成版: Coin Hunter
// ========================================================
// ========================================================
// 06_p5playの基礎: 実践ミニゲーム「Coin Hunter」
// ========================================================

let player;
let platforms;
let coins;
let enemies;

// 画像アセット用の変数
let playerImg;
let coinImg;
let enemyImg;

let score = 0;
let totalCoins = 8;
let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER', 'CLEAR'

// 画像のプリロード（ゲーム起動前に先読み）
function preload() {
    playerImg = loadImage('../../assets/player.svg');
    coinImg = loadImage('../../assets/coin.svg');
    enemyImg = loadImage('../../assets/enemy.svg');
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
    player.scale = 0.1;         // 画像サイズをちょうど良い大きさに調整
    player.w = 36;              // コライダー幅
    player.h = 48;              // コライダー高さを画像の表示サイズに合わせる（床に埋まるのを防止）
    player.rotationLock = true; // 転倒防止

    // ----------------------------------------------------
    // ② 足場グループ (platforms): 自分で指定して配置 (static)
    // ----------------------------------------------------
    platforms = new Group();
    platforms.color = '#2ed573';
    platforms.collider = 'static';

    // 地面
    new platforms.Sprite(400, 480, 800, 40);

    // 浮かぶ足場たち（好みの位置に配置）
    new platforms.Sprite(220, 380, 160, 20);
    new platforms.Sprite(580, 380, 160, 20);
    new platforms.Sprite(400, 300, 180, 20);
    new platforms.Sprite(200, 180, 140, 20);
    new platforms.Sprite(600, 180, 140, 20);

    // ----------------------------------------------------
    // ③ コイングループ (coins): ランダムな位置に配置 (static)
    // ----------------------------------------------------
    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'static';

    // ランダムな位置にコインを8個配置
    for (let i = 0; i < totalCoins; i++) {
        let rx = random(60, width - 60);
        let ry = random(80, 420);
        new coins.Sprite(rx, ry);
    }

    // ----------------------------------------------------
    // ④ 危険な敵キャラグループ (enemies): 左右から流れてくる (kinematic)
    // ----------------------------------------------------
    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic'; // 重力で落ちず、真っ直ぐ進む

    // ----------------------------------------------------
    // ⑤ 接触イベントの登録 (overlaps)
    // ----------------------------------------------------
    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);
}

// 左右からランダムに敵キャラを流す関数
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

// コイン獲得時の処理
function getCoin(player, coin) {
    coin.remove(); // コイン消滅
    score += 10;

    // 全てのコインを集めたらクリア！
    if (coins.length === 0) {
        gameState = 'CLEAR';
    }
}

// 敵キャラ接触時の処理（一発でゲームオーバー）
function hitEnemy(player, enemy) {
    gameState = 'GAMEOVER';
    player.visible = false; // プレイヤーを非表示
}

function draw() {
    clear();
    background('#1e272e');

    if (gameState === 'PLAY') {
        // --- プレイヤーの操作 ---
        let moveSpeed = 5;

        // 左右移動（進行方向に向きを反転）
        if (kb.pressing('left') || kb.pressing('a')) {
            player.vel.x = -moveSpeed;
            player.mirror.x = true;  // 左を向く
        } else if (kb.pressing('right') || kb.pressing('d')) {
            player.vel.x = moveSpeed;
            player.mirror.x = false; // 右を向く
        } else {
            player.vel.x = 0;
        }

        // ジャンプ（足場の上に立っているときだけジャンプ可能）
        if ((kb.presses('space') || kb.presses('up') || kb.presses('w')) && player.colliding(platforms)) {
            player.vel.y = -11;
        }

        // ★プレイヤーが画面の左右から出ないように制限
        player.x = constrain(player.x, 25, width - 25);

        // --- 敵キャラの生成と管理 ---
        // 75フレーム（約1.25秒）ごとに敵キャラを流す
        if (frameCount % 75 === 0) {
            spawnEnemy();
        }

        // 画面外へ通り過ぎた敵キャラは自動削除（メモリ解放）
        for (let e of enemies) {
            if (e.x < -60 || e.x > width + 60) {
                e.remove();
            }
        }
    }

    // ★ 全スプライトを明示的に描画（UIやオーバーレイをスプライトの最前面に重ねるため）
    allSprites.draw();

    // ★ スプライトの上にUIや画面オーバーレイを描画
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
    fill(255);
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
    text(`SCORE: ${score}`, 25, 20);

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
    score = 0;
    gameState = 'PLAY';

    // 既存のスプライトを全消去して再生成
    allSprites.remove();
    world.gravity.y = 20; // 重力設定
    createGameWorld();
}
