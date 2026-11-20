// ========================================================
// 06_p5playの基礎: 実践ミニゲーム「Coin Hunter」
// ========================================================

let player;
let platforms;
let coins;
let cherry;
let enemies;
let movingPlatform;
let coinSlideStarted = false;
let coinSlideX = -70;
let trapplatforms;
let hiddenPlatformCoin;
let breakablePlatforms;
let enemyTriggerPlatform;
let hasTriggeredEnemy = false;
let fallingEnemyPlatform;
let hasTriggeredFallingEnemy = false;
let upperEnemyPlatform;
let hasTriggeredUpperEnemy = false;
let hasSteppedOnTrapPlatform = false;
let shiftingFloor;
let floorShiftPending = false;
let hasSpawnedFinalCoin = false;
let finalJumpPad;
let finalNormalPlatform;
let hasLandedOnFinalPlatform = false;
let hasLaunchedFromFinalPad = false;
let hasTriggeredBottomEnemy = false;
// ほかのコインをすべて取った後に出現する最後の1枚
const finalCoinPosition = { x: 50, y: 360 };

// 画像アセット用の変数
let playerImg;
let coinImg;
let enemyImg;
let cherryImg;

// コインの固定位置（左右の下段・上段の足場の上）
const coinPositions = [
    { x: 430, y: 360, role: 'floorTrap' },
    { x: 330, y: 30, role: 'redPlatform' },
     { x: 770 , y:  30 },
     { x: 500, y: 270 }
];
let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER', 'CLEAR'
let deathReason = '';
const timeLimitSeconds = 30;
let gameStartedAt = 0;
let remainingSeconds = timeLimitSeconds;
let timerElement;
let fellFromBrokenPlatform = false;

// 画像のプリロード（ゲーム起動前に先読み）
function preload() {
    playerImg = loadImage('assets/player.png');
    coinImg = loadImage('assets/coin.svg');
    enemyImg = loadImage('assets/enemy.svg');
    cherryImg = loadImage('assets/cherry.svg');
}

function setup() {
    new Canvas(800, 500);
    // player.pngの余白を除き、足先までの高さを当たり判定の48pxに合わせる
    // 元の画像ファイルは変更せず、ゲーム内で使う画像だけ調整する
    playerImg = playerImg.get(315, 468, 394, 726);
    playerImg.resize(0, 48);
    document.getElementById('game-container').appendChild(document.querySelector('canvas'));
    timerElement = document.getElementById('game-timer');
}

// ゲームステージの生成処理
function createGameWorld() {
    floorShiftPending = false;
    hasSpawnedFinalCoin = false;
    finalJumpPad = null;
    finalNormalPlatform = null;
    hasLandedOnFinalPlatform = false;
    hasLaunchedFromFinalPad = false;
    hasTriggeredBottomEnemy = false;
    // ----------------------------------------------------
    // ① プレイヤーの作成（画像を設定）
    // ----------------------------------------------------
    player = new Sprite(40, 50);
    player.img = playerImg;
    player.scale = 1;           // setupで画像の高さを48pxに調整済み
    player.w = 36;              // コライダー幅
    player.h = 48;              // コライダー高さを画像の表示サイズに合わせる（床に埋まるのを防止）
    player.rotationLock = true; // 転倒防止
    player.bounciness = 0; // 着地時のバウンドを無効化
    player.friction = 0; // 壁に押しつけても摩擦で張りつかず滑り落ちる

    // ----------------------------------------------------
    // ② 足場グループ (platforms): 自分で指定して配置 (static)
    // ----------------------------------------------------
    platforms = new Group();
    trapplatforms = new Group();
    platforms.color = '#a66a3f';
    trapplatforms.color = '#ff0000';
    platforms.collider = 'static';
    trapplatforms.collider = 'static';
    platforms.bounciness = 0;
    trapplatforms.bounciness = 0;

    // 地面
    shiftingFloor = new platforms.Sprite(590, 480, 420, 40);

    // 浮かぶ足場たち（好みの位置に配置）
    // 乗ると崩れる足場は、通常の足場と分けて管理
    breakablePlatforms = new Group();
    breakablePlatforms.color = '#a66a3f';
    breakablePlatforms.collider = 'static';
    breakablePlatforms.bounciness = 0;
    movingPlatform = new breakablePlatforms.Sprite(200, 200, 100, 20);
    movingPlatform.hasStartedMoving = false;
    movingPlatform.hasJumped = false;
    movingPlatform.hasLeftAfterJump = false;
    coinSlideStarted = false;
    coinSlideX = -70;
    let lowerWall = new platforms.Sprite(390, 385, 20, 160);
    lowerWall.color = '#b5b3ac';
    // 根元の土台と陰影は見た目だけ描き、当たり判定は変えない
    lowerWall.draw = function () {
        push();
        rectMode(CORNER);
        noStroke();
        fill('#b5b3ac');
        rect(-10, -80, 20, 160);
        fill('#c2c0b9');
        rect(-10, -80, 2, 150);
        fill('#9e9c95');
        rect(8, -80, 2, 150);

        // 地面がずれる前だけ、土に埋まった小さな土台を表示
        if (shiftingFloor.x - shiftingFloor.w / 2 <= lowerWall.x) {
            fill('#aaa79f');
            rect(-10, 69, 24, 9);
            fill('#c2bfb7');
            rect(-10, 69, 24, 2);
            fill('#8b5936');
            rect(-10, 78, 27, 2);
        }
        pop();
    };
    enemyTriggerPlatform = new platforms.Sprite(450, 300, 180, 20);
    hasTriggeredEnemy = false;
    let upperWall = new platforms.Sprite(300, -126, 20, 400);
    upperWall.color = '#b5b3ac';
    // 上の壁もコンクリートの陰影を付け、根元を足場の下端にそろえる
    upperWall.draw = function () {
        push();
        rectMode(CORNER);
        noStroke();
        fill('#b5b3ac');
        rect(-10, -200, 20, 401);
        fill('#c2c0b9');
        rect(-10, -200, 2, 381);
        fill('#9e9c95');
        rect(8, -200, 2, 381);
        // 赤い足場と同じ高さのコンクリートの根元
        fill('#aaa79f');
        rect(-10, 181, 20, 20);
        fill('#c2bfb7');
        rect(-10, 181, 20, 2);
        fill('#918e87');
        rect(-10, 199, 20, 2);
        pop();
    };
    new platforms.Sprite(40, 80, 100, 20);
    upperEnemyPlatform = new platforms.Sprite(445, 65, 170, 20);
    hasTriggeredUpperEnemy = false;
    hasSteppedOnTrapPlatform = false;
    new trapplatforms.Sprite(335, 65 , 50, 20);
    fallingEnemyPlatform = new platforms.Sprite(720, 180, 180, 20);
    hasTriggeredFallingEnemy = false;

    // ----------------------------------------------------
    // ③ コイングループ (coins): 固定位置に配置 (static)
    // ----------------------------------------------------
    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'static';

    // リトライ時も同じ位置にコインを配置
    for (let position of coinPositions) {
        let coin = new coins.Sprite(position.x, position.y);
        coin.role = position.role;
    }

    // 出現する足場用のコインも、最初からクリアに必要な枚数に含める
    hiddenPlatformCoin = new coins.Sprite(-70, 243);

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

    // ----------------------------------------------------
    // ⑥ チェリーの作成（画像を設定）
    // ----------------------------------------------------
    cherry = new Sprite(770, 250);
    cherry.img = cherryImg;
    cherry.scale = 0.05; // 元画像1254pxを約38pxで表示
    cherry.w = 30; // 当たり判定の幅
    cherry.h = 30; // 当たり判定の高さ
    cherry.collider = 'static';
    player.overlaps(cherry, hitEnemy); // チェリーに触れてもゲームオーバー
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
    updateTimer();
    if (gameState !== 'PLAY') return;
    if (coin.role === 'floorTrap') {
        floorShiftPending = true;
    }
    if (coin === hiddenPlatformCoin) {
        hiddenPlatformCoin = null;
    }
    coin.remove(); // コイン消滅

    // 移動するコインも含め、ほかのコインをすべて取ったら出現
    if (coins.length === 0 && !hasSpawnedFinalCoin) {
        let finalCoin = new coins.Sprite(finalCoinPosition.x, finalCoinPosition.y);
        finalCoin.role = 'final';
        // 壊れる足場の移動先の下に、着地できる普通の床を出す
        finalNormalPlatform = new platforms.Sprite(finalCoinPosition.x, finalCoinPosition.y + 130, 100, 20);
        finalJumpPad = new Sprite(220, 400, 100, 20, 'static');
        finalJumpPad.color = '#bd8759';
        finalJumpPad.bounciness = 0;
        finalJumpPad.friction = 0;
        hasSpawnedFinalCoin = true;
    }

    // 最後のコインを取った瞬間にクリア
    if (coins.length === 0) {
        gameState = 'CLEAR';
    }
}

// 敵・チェリーへの接触時に死因を記録
function hitEnemy(player, enemy) {
    if (gameState !== 'PLAY') return;
    deathReason = enemy === cherry
        ? 'コインを取るゲームだよ？\nチェリーは毒だよ。'
        : '敵にぶつかってしまった！';
    gameState = 'GAMEOVER';
    player.visible = false; // プレイヤーを非表示
}

// 足元と足場の上面が接している場合だけ接地とする
function isStandingOn(platform) {
    let feetY = player.y + player.h / 2;
    let topY = platform.y - platform.h / 2;
    let overlapWidth = Math.min(player.x + player.w / 2, platform.x + platform.w / 2)
        - Math.max(player.x - player.w / 2, platform.x - platform.w / 2);

    return overlapWidth > 2
        && Math.abs(feetY - topY) < 6
        && player.vel.y >= -0.5
        && player.colliding(platform);
}

// レトロな横スクロールゲーム風の空・雲・遠景
function drawBackground() {
    background('#8ccfff');
    push();
    rectMode(CORNER);
    strokeJoin(MITER);

    // 階段状の輪郭でドット絵風の雲を描く
    const cloudOutline = [
        [0, 24], [12, 24], [12, 12], [28, 12], [28, 0],
        [52, 0], [52, 8], [68, 8], [68, 20], [84, 20],
        [84, 28], [96, 28], [96, 44], [0, 44]
    ];
    for (let cloud of [{ x: 90, y: 105 }, { x: 355, y: 145 }, { x: 650, y: 65 }]) {
        push();
        translate(cloud.x, cloud.y);
        fill('#ffffff');
        stroke('#547b9b');
        strokeWeight(2);
        beginShape();
        for (let point of cloudOutline) {
            vertex(point[0], point[1]);
        }
        endShape(CLOSE);
        noStroke();
        fill('#e1f2ff');
        rect(2, 36, 92, 6);
        pop();
    }

    // 遠くの丘は淡い色にして、足場と見分けやすくする
    noStroke();
    fill('#a3d9b0');
    for (let hill of [{ x: 100, h: 64 }, { x: 470, h: 88 }, { x: 720, h: 48 }]) {
        beginShape();
        vertex(hill.x - 100, height);
        vertex(hill.x - 100, height - 16);
        vertex(hill.x - 72, height - 16);
        vertex(hill.x - 72, height - hill.h / 2);
        vertex(hill.x - 40, height - hill.h / 2);
        vertex(hill.x - 40, height - hill.h);
        vertex(hill.x + 40, height - hill.h);
        vertex(hill.x + 40, height - hill.h / 2);
        vertex(hill.x + 72, height - hill.h / 2);
        vertex(hill.x + 72, height - 16);
        vertex(hill.x + 100, height - 16);
        vertex(hill.x + 100, height);
        endShape(CLOSE);
    }
    pop();
}

// 実時間でカウントし、プレイ中だけ時間切れを判定する
function updateTimer() {
    if (gameState !== 'PLAY') return;
    remainingSeconds = Math.max(0, timeLimitSeconds - (millis() - gameStartedAt) / 1000);
    if (remainingSeconds === 0) {
        deathReason = '時間切れだよ。そんなに疑わなくていいのに...';
        gameState = 'GAMEOVER';
        player.visible = false;
    }
}

function draw() {
    clear();
    drawBackground();
    updateTimer();
    timerElement.textContent = '残り ' + Math.ceil(remainingSeconds) + ' 秒';
    timerElement.classList.toggle('is-urgent', remainingSeconds <= 10);

    // コイン取得後、物理演算の接触処理が終わってから地面をずらす
    if (floorShiftPending) {
        shiftingFloor.x += 120;
        floorShiftPending = false;
    }

    if (gameState === 'PLAY') {
        // --- プレイヤーの操作 ---
        let moveSpeed = hasLaunchedFromFinalPad ? 0 : 5;

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

        // 元の壊れる足場へ着地しようとすると、左下へ移動する
        let movingPlatformTop = movingPlatform.y - movingPlatform.h / 2;
        let feetAboveMovingPlatform = player.y + player.h / 2;
        if (!movingPlatform.hasStartedMoving && !movingPlatform.isBroken
            && player.vel.y >= 0
            && Math.abs(player.x - movingPlatform.x) < (player.w + movingPlatform.w) / 2
            && feetAboveMovingPlatform >= movingPlatformTop - 60
            && feetAboveMovingPlatform <= movingPlatformTop + 6) {
            movingPlatform.hasStartedMoving = true;
        }

        if (movingPlatform.hasStartedMoving && !movingPlatform.isBroken) {
            movingPlatform.x = Math.max(movingPlatform.x - 24, 50 );
            movingPlatform.y = Math.min(movingPlatform.y + 20, 300);
        }

        // 移動した足場は、ジャンプして接触が切れてから次の着地を待つ
        if (movingPlatform && movingPlatform.hasJumped
            && !movingPlatform.isBroken && !player.colliding(movingPlatform)) {
            movingPlatform.hasLeftAfterJump = true;
        }

        // 崩れる足場はジャンプ判定の前に当たり判定をなくす
        for (let i = breakablePlatforms.length - 1; i >= 0; i--) {
            let platform = breakablePlatforms[i];
            let canBreak = platform !== movingPlatform || platform.hasLeftAfterJump;
            if (!platform.isBroken && canBreak && player.y < platform.y
                && player.colliding(platform)) {
                platform.isBroken = true;
                // 元の足場を消し、当たり判定のない破片に置き換える
                for (let direction of [-1, 1]) {
                    let fragment = new breakablePlatforms.Sprite(
                        platform.x + direction * platform.w / 4,
                        platform.y,
                        platform.w / 2 - 2,
                        platform.h
                    );
                    fragment.isBroken = true;
                    fragment.collider = 'none';
                    fragment.vel.x = direction * 3;
                    fragment.vel.y = 12;
                    fragment.rotationSpeed = direction * 10;
                }
                platform.remove();
                fellFromBrokenPlatform = true;
                player.vel.x = 0;
                player.vel.y = Math.max(player.vel.y, 8);
                continue;
            }

            if (platform.isBroken) {
                platform.vel.y += 0.4;
                if (platform.y > height + 80) {
                    platform.remove();
                }
            }
        }

        // 左下の普通の床に一度着地したら、その後のジャンプでは罠を発動しない
        if (finalNormalPlatform && isStandingOn(finalNormalPlatform)) {
            hasLandedOnFinalPlatform = true;
        }

        // 最後のコインへ左下から直行すると、画面下から敵が飛び出す
        if (hasSpawnedFinalCoin && !hasTriggeredBottomEnemy
            && !hasLandedOnFinalPlatform
            && !hasLaunchedFromFinalPad && !fellFromBrokenPlatform
            && player.x <= 180 && player.y + player.h / 2 >= 320
            && player.vel.y > 0) {
            // 100px幅の敵を隙間なく2体並べ、左下への道をふさぐ
            for (let x of [50, 150]) {
                let enemy = new enemies.Sprite(x, height + 50);
                enemy.scale = 0.225; // 通常の敵の2.5倍
                enemy.w = 100;
                enemy.h = 100;
                enemy.overlaps(platforms);
                enemy.overlaps(breakablePlatforms);
                enemy.overlaps(coins);
                enemy.overlaps(enemies);
                enemy.vel.y = -26;
            }
            hasTriggeredBottomEnemy = true;
        }

        // 指定の足場の右半分に足をつけると、右から高速の敵が一度だけ出現
        let triggerTop = enemyTriggerPlatform.y - enemyTriggerPlatform.h / 2;
        let playerFeet = player.y + player.h / 2;
        if (!hasTriggeredEnemy
            && player.x > enemyTriggerPlatform.x
            && player.x < enemyTriggerPlatform.x + enemyTriggerPlatform.w / 2
            && Math.abs(playerFeet - triggerTop) < 6
            && player.colliding(enemyTriggerPlatform)) {
            let enemy = new enemies.Sprite(width + 30, triggerTop - enemies.h / 2);
            enemy.vel.x = -20; // 敵を見てジャンプする時間を確保
            enemy.mirror.x = false;
            hasTriggeredEnemy = true;
        }

        // 右上の足場で画面右端へ進むと、真上から敵が一度だけ落下
        let fallingTriggerTop = fallingEnemyPlatform.y - fallingEnemyPlatform.h / 2;
        if (!hasTriggeredFallingEnemy && player.x >= width - 50
            && Math.abs(playerFeet - fallingTriggerTop) < 6
            && player.colliding(fallingEnemyPlatform)) {
            let enemy = new enemies.Sprite(width - 45, -30);
            enemy.vel.y = 22;
            hasTriggeredFallingEnemy = true;
        }

        // 赤い床に乗ったことを記録する
        let isOnTrapPlatform = trapplatforms.some(isStandingOn);
        if (isOnTrapPlatform) {
            hasSteppedOnTrapPlatform = true;
        }

        // 赤い床から完全に離れ、右の床に体全体が移ってから発動
        let upperPlatformTop = upperEnemyPlatform.y - upperEnemyPlatform.h / 2;
        if (hasSteppedOnTrapPlatform && !hasTriggeredUpperEnemy
            && !isOnTrapPlatform
            && player.x - player.w / 2 >= upperEnemyPlatform.x - upperEnemyPlatform.w / 2
            && isStandingOn(upperEnemyPlatform)) {
            let enemy = new enemies.Sprite(width + 30, upperPlatformTop - enemies.h / 2);
            enemy.vel.x = -20;
            enemy.mirror.x = false;
            hasTriggeredUpperEnemy = true;
        }

        // 移動先に到着した足場からのジャンプは一度だけ可能
        let canJumpFromMovingPlatform = movingPlatform && !movingPlatform.isBroken
            && movingPlatform.x === 50 && movingPlatform.y === 300
            && !movingPlatform.hasJumped && isStandingOn(movingPlatform);

        let isGrounded = platforms.some(isStandingOn) || trapplatforms.some(isStandingOn);

        // 別の足場に着地できたら、床の崩壊による落下は終了
        if (isGrounded || (movingPlatform && !movingPlatform.isBroken && isStandingOn(movingPlatform))) {
            fellFromBrokenPlatform = false;
        }

        // 薄い緑の床に乗ると、画面の上まで吹き飛ばす
        if (finalJumpPad && !hasLaunchedFromFinalPad && isStandingOn(finalJumpPad)) {
            hasLaunchedFromFinalPad = true;
            player.vel.x = 0;
            player.vel.y = -40;
            player.collider = 'none';
        }

        if (!hasLaunchedFromFinalPad && kb.presses('space')
            && (isGrounded || canJumpFromMovingPlatform)) {
            if (canJumpFromMovingPlatform) {
                movingPlatform.hasJumped = true;
            }
            player.vel.y = -11;
        }

        // ★プレイヤーが画面の左右から出ないように制限
        player.x = constrain(player.x, 25, width - 25);

        // コインは従来の条件で左から出現する
        if (!coinSlideStarted && player.vel.y > 0
            && player.x >= 80 && player.x <= 160
            && player.y >= 120 && player.y <= 220) {
            coinSlideStarted = true;
        }

        if (coinSlideStarted && hiddenPlatformCoin) {
            coinSlideX = Math.min(coinSlideX + 30, 80);
            hiddenPlatformCoin.x = coinSlideX + 20;
            hiddenPlatformCoin.y = 300 - 20 / 2 - hiddenPlatformCoin.h / 2 - 125;
        }

        // --- 敵キャラの生成と管理 ---
        // 敵の出現を一時停止（再開時は下の3行のコメントを外す）
        // if (frameCount % 75 === 0) {
        //     spawnEnemy();
        // }

        // 画面外へ通り過ぎた敵キャラは自動削除（メモリ解放）
        for (let i = enemies.length - 1; i >= 0; i--) {
            let e = enemies[i];
            if (e.x < -60 || e.x > width + 60 || e.y < -60 || e.y > height + 60) {
                e.remove();
            }
        }
    }

    // ジャンプ台で画面上へ飛び出すとゲームオーバー
    if (gameState === 'PLAY' && hasLaunchedFromFinalPad && player.y + player.h / 2 < 0) {
        deathReason = 'さあ、宇宙旅行へ！';
        gameState = 'GAMEOVER';
        player.visible = false;
    }

    // プレイヤー全体が画面の下へ落ちたらゲームオーバー
    if (gameState === 'PLAY' && player.y - player.h / 2 > height) {
        deathReason = fellFromBrokenPlatform
            ? 'その床脆いよ。大丈夫？'
            : '足場から落ちてしまった！';
        gameState = 'GAMEOVER';
        player.visible = false;
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
        drawOverlay('GAME OVER...', '#ff4757', deathReason + '\n\nSPACEキーでリトライ');
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
    fill('#203d57');
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
    textLeading(28);
    let messageOffsetY = gameState === 'GAMEOVER' ? 55 : 40;
    text(subText, width / 2, height / 2 + messageOffsetY);
}

// ゲーム開始・リセット処理
function startGame() {
    gameState = 'PLAY';
    deathReason = '';
    fellFromBrokenPlatform = false;

    // 既存のスプライトを全消去して再生成
    allSprites.remove();
    world.gravity.y = 20; // 重力設定
    createGameWorld();
    gameStartedAt = millis();
    remainingSeconds = timeLimitSeconds;
}
