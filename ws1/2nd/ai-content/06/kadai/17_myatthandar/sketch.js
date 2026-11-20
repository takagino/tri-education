// ========================================================
// 06_p5playの基礎: 実践ミニゲーム「Coin Hunter」
// ========================================================

let player;
let platforms;
let movingPlatforms;
let jumpPads;
let coins;
let enemies;

// 画像アセット用の変数（好きな画像ファイルに変更可能）
let playerImg;
let coinImg;
let enemyImg;

let totalCoins = 8;
let collectedCoins = 0;
let lives = 3;
let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER', 'CLEAR'

// タイマー・クリアタイム管理用
const TIME_LIMIT = 30;
let playStartTime = 0;
let timeLeft = TIME_LIMIT;
let clearTime = 0;
let gameOverReason = ''; // 'LIVES' または 'TIMEUP'

// 画像のプリロード（ゲーム起動前に先読み）
function preload() {
    playerImg = loadImage('assets/player.svg');
    coinImg = loadImage('assets/coin.svg');
    enemyImg = loadImage('assets/enemy.svg');
}

function setup() {
    new Canvas(800, 500);
}

// コインが足場・リフト・ジャンプ台に重なる/埋まるか判定
function isOverlappingSolid(x, y, padX = 28, padY = 34) {
    const solids = [...platforms, ...movingPlatforms, ...jumpPads];
    for (let s of solids) {
        let halfW = s.w / 2 + padX;
        let halfH = s.h / 2 + padY;
        if (abs(x - s.x) < halfW && abs(y - s.y) < halfH) {
            return true;
        }
    }
    return false;
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
    // ②-2 動く足場グループ (movingPlatforms): kinematic で自動往復
    // ----------------------------------------------------
    movingPlatforms = new Group();
    movingPlatforms.color = '#1e90ff';
    movingPlatforms.collider = 'kinematic';

    // 左右に往復するリフト
    let hLift = new movingPlatforms.Sprite(400, 230, 120, 18);
    hLift.vel.x = 2.0;
    hLift.minX = 270;
    hLift.maxX = 530;

    // 上下に往復するリフト
    let vLift = new movingPlatforms.Sprite(710, 320, 110, 18);
    vLift.vel.y = -1.8;
    vLift.minY = 200;
    vLift.maxY = 420;

    // ----------------------------------------------------
    // ②-3 スーパージャンプ台グループ (jumpPads): 高反発 (bounciness = 1.5)
    // ----------------------------------------------------
    jumpPads = new Group();
    jumpPads.color = '#ff9f43';
    jumpPads.collider = 'static';
    jumpPads.bounciness = 1.5;

    new jumpPads.Sprite(110, 452, 70, 16);
    new jumpPads.Sprite(690, 452, 70, 16);

    // ----------------------------------------------------
    // ③ コイングループ (coins): 足場と重ならない位置に配置 (static)
    // ----------------------------------------------------
    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'static';

    for (let i = 0; i < totalCoins; i++) {
        let rx, ry;
        let tries = 0;
        do {
            rx = random(60, width - 60);
            ry = random(80, 420);
            tries++;
        } while (isOverlappingSolid(rx, ry) && tries < 100);

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
    // ⑤ 接触イベントの登録 (overlaps / collided)
    // ----------------------------------------------------
    player.overlaps(coins, getCoin);
    player.overlaps(enemies, hitEnemy);
    player.collided(jumpPads, bounceOnJumpPad);
}

// 動く足場の往復移動を更新
function updateMovingPlatforms() {
    for (let lift of movingPlatforms) {
        if (lift.minX !== undefined && lift.maxX !== undefined) {
            if (lift.x <= lift.minX) {
                lift.x = lift.minX;
                lift.vel.x = Math.abs(lift.vel.x);
            } else if (lift.x >= lift.maxX) {
                lift.x = lift.maxX;
                lift.vel.x = -Math.abs(lift.vel.x);
            }
        }

        if (lift.minY !== undefined && lift.maxY !== undefined) {
            if (lift.y <= lift.minY) {
                lift.y = lift.minY;
                lift.vel.y = Math.abs(lift.vel.y);
            } else if (lift.y >= lift.maxY) {
                lift.y = lift.maxY;
                lift.vel.y = -Math.abs(lift.vel.y);
            }
        }
    }
}

// スーパージャンプ台に触れたときの処理
function bounceOnJumpPad(playerSprite, pad) {
    if (playerSprite.y < pad.y) {
        playerSprite.vel.y = -18;
    }
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
    collectedCoins++;

    // 全てのコインを集めたらクリア！
    if (coins.length === 0) {
        clearTime = ((millis() - playStartTime) / 1000).toFixed(1);
        gameState = 'CLEAR';
    }
}

// 敵キャラ接触時の処理（ライフ制：残機3）
function hitEnemy(player, enemy) {
    enemy.remove();
    lives--;

    if (lives <= 0) {
        lives = 0;
        gameOverReason = 'LIVES';
        gameState = 'GAMEOVER';
        player.visible = false;
    } else {
        // プレイヤーをスタート位置に戻す
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
        // --- 制限時間タイマーの更新 ---
        let elapsedSec = (millis() - playStartTime) / 1000;
        timeLeft = max(0, TIME_LIMIT - elapsedSec);

        if (timeLeft <= 0) {
            gameOverReason = 'TIMEUP';
            gameState = 'GAMEOVER';
        }

        // --- 動く足場の更新 ---
        updateMovingPlatforms();

        // --- プレイヤーの操作 ---
        let moveSpeed = 5;

        // 左右移動（進行方向に向きを反転）
        if (kb.pressing('left')) {
            player.vel.x = -moveSpeed;
            player.mirror.x = true;  // 左を向く
        } else if (kb.pressing('right')) {
            player.vel.x = moveSpeed;
            player.mirror.x = false; // 右を向く
        } else {
            player.vel.x = 0;
        }

        // ジャンプ（通常の足場または動く足場の上に立っているときだけジャンプ可能）
        let onGround = player.colliding(platforms) || player.colliding(movingPlatforms);
        if (kb.presses('space') && onGround) {
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
        drawOverlay('COIN HUNTER', '#feca57', '30秒以内に全コインを集めよう！（SPACEでスタート）');
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'PLAY') {
        drawUI();

    } else if (gameState === 'GAMEOVER') {
        let subMsg = gameOverReason === 'TIMEUP'
            ? 'タイムアップ！SPACEキーでリトライ'
            : '残機がなくなりました！SPACEキーでリトライ';
        drawOverlay('GAME OVER...', '#ff4757', subMsg);
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'CLEAR') {
        drawOverlay(
            '★ STAGE CLEAR! ★',
            '#2ed573',
            `CLEAR TIME: ${clearTime}秒！  /  SPACEでもう一度遊ぶ`
        );
        if (kb.presses('space')) {
            startGame();
        }
    }
}

// スコア・残機・タイマーのUI描画
function drawUI() {
    let remainingCoins = coins ? coins.length : totalCoins;
    let hearts = '♥'.repeat(max(0, lives)) + '♡'.repeat(max(0, 3 - lives));

    // 左上：コイン情報・残機・残り時間
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);

    fill('#feca57');
    text(`COINS: ${collectedCoins} / ${totalCoins}  (残り ${remainingCoins})`, 25, 18);

    fill('#ff6b81');
    text(`LIVES: ${hearts}`, 25, 44);

    fill(timeLeft <= 5 ? '#ff4757' : '#70a1ff');
    text(`TIME: ${ceil(timeLeft)}s`, 25, 70);

    // 右上：操作説明
    textAlign(RIGHT, TOP);
    fill('#a4b0be');
    textSize(14);
    textStyle(NORMAL);
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
    collectedCoins = 0;
    lives = 3;
    timeLeft = TIME_LIMIT;
    clearTime = 0;
    gameOverReason = '';
    playStartTime = millis();

    // 既存のスプライトを全消去して再生成
    allSprites.remove();
    world.gravity.y = 20; // 重力設定
    createGameWorld();
}