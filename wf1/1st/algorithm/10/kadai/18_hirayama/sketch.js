// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';
let baseColor = '#F4F1EA';   // 背景色（ベージュ）
let mainColor = '#6B5E51';   // 通常の文字・足場（ブラウン）
let subColor = '#8A9A86';    // プレイヤー・タイトル（セージグリーン）
let accentColor = '#D38C7D'; // 敵・ゲームオーバー（テラコッタ）
let player;
let ground, ceiling, leftWall, rightWall; // 四方の壁を管理する変数
let enemies = [];
let platforms = []; // 流れる段差を管理する配列
let startFrame = 0;
let surviveTime = 0; // 生き残った記録（秒）を入れる箱
let jumpCount = 0;   // ジャンプした回数を記録する変数
let currentGravity = 'down'; // 現在の重力の向き（down, up, left, right）を管理
let arrowImg;
function preload() {
    arrowImg = loadImage('yajirushi_bottom.png');
}
function setup() {
    new Canvas(640, 480);
}
function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'gameover') {
        drawGameOver();
    }
}
// =========================================================
// 各画面の処理
// =========================================================
function initTitle() {
    allSprites.removeAll();
}
function drawTitle() {
    background(baseColor);
    textSize(45);
    textAlign(CENTER);
    fill(subColor);
    text('SANS GRAVITYI', width / 2, height / 2 - 130);


    textSize(18);
    fill(mainColor);
    text('【 操作方法 】', width / 2, height / 2 - 70);
    text('重力が 上・下 の時 ： [左右]キーで移動 / [上下]キーでジャンプ', width / 2, height / 2 - 35);
    text('重力が 左・右 の時 ： [上下]キーで移動 / [左右]キーでジャンプ', width / 2, height / 2 - 5);
    text('0.5秒間に40％の確率で重力が変わるぞ！', width / 2, height / 2 + 45);
    textSize(22);
    fill(mainColor);
    text('スペースキーでスタート！', width / 2, height / 2 + 160);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}
function initGame() {
    allSprites.removeAll();
    enemies = [];
    platforms = []; // 配列の初期化
    startFrame = frameCount;
    jumpCount = 0;  // ジャンプ回数のリセット
    // 初期の重力の設定
    currentGravity = 'down';
    world.gravity.x = 0;
    world.gravity.y = 10;

    // 壁
    ground = new Sprite(width / 2, height - 10, width, 20, 'static');
    ground.color = mainColor;

    ceiling = new Sprite(width / 2, 10, width, 20, 'static');
    ceiling.color = mainColor;

    leftWall = new Sprite(10, height / 2, 20, height, 'static');
    leftWall.color = mainColor;

    rightWall = new Sprite(width - 10, height / 2, 20, height, 'static');
    rightWall.color = mainColor;

    // プレイヤーの生成
    player = new Sprite(100, height - 80, 375);
    player.img = 'mark_heart_red.png';
    player.scale = 0.1;      // 元画像の0.1倍の大きさ

    player.debug = true;

    // プレイヤーの回転を止める
    player.rotationLock = true;
    player.rotation = 0;
}
function drawGame() {
    background(baseColor);
    // 背景の矢印（現在の重力を示している）
    drawBackgroundArrow();

    // タイムの計算
    let currentSec = floor((frameCount - startFrame) / 60);

    // 1秒毎に35％の確率で重力が変動する
    if (frameCount > startFrame && (frameCount - startFrame) % 30 == 0) {

        if (random(0, 100) < 40) {
            let directions = ['down', 'up', 'left', 'right'];
            currentGravity = random(directions);

            // 現在の重力を適用する
            if (currentGravity == 'down') { world.gravity.x = 0; world.gravity.y = 10; player.rotation = 0; }
            if (currentGravity == 'up') { world.gravity.x = 0; world.gravity.y = -10; player.rotation = 180; }
            if (currentGravity == 'left') { world.gravity.x = -10; world.gravity.y = 0; player.rotation = 90; }
            if (currentGravity == 'right') { world.gravity.x = 10; world.gravity.y = 0; player.rotation = -90; }
        }
    }

    // すり抜け床の処理
    let onPlatform = false;
    for (let p of platforms) {
        let canRide = false;

        // 重力の判定を変える
        if (currentGravity == 'down') {
            if (player.y + player.halfHeight <= p.y - p.halfHeight + 5 && player.vel.y >= -1) canRide = true;
        } else if (currentGravity == 'up') {
            if (player.y - player.halfHeight >= p.y + p.halfHeight - 5 && player.vel.y <= 1) canRide = true;
        } else if (currentGravity == 'left') {
            if (player.x - player.halfWidth >= p.x + p.halfWidth - 5 && player.vel.x <= 1) canRide = true;
        } else if (currentGravity == 'right') {
            if (player.x + player.halfWidth <= p.x - p.halfWidth + 5 && player.vel.x >= -1) canRide = true;
        }

        if (player.colliding(p) || canRide) {
            player.collides(p); // 衝突させて乗れるようにする
            if (player.colliding(p)) {
                onPlatform = true;
            }
        } else {
            player.overlaps(p); // 突き抜ける
        }
    }

    // 接地判定
    let isGrounded = player.colliding(ground) || player.colliding(ceiling) ||
        player.colliding(leftWall) || player.colliding(rightWall) ||
        onPlatform;

    // 接地している場合は、ジャンプ回数をリセットする
    if (isGrounded) {
        jumpCount = 0;
    }

    // 1. プレイヤーの操作
    let canJump = isGrounded || jumpCount < 2;

    if (currentGravity == 'down' || currentGravity == 'up') {
        // 重力が上下のときは、左右キーで移動
        if (kb.pressing('left') && player.x > 30) player.x -= 4;
        if (kb.pressing('right') && player.x < width - 30) player.x += 4;
    } else {
        // 重力が左右のときは、上下キーで移動
        if (kb.pressing('up') && player.y > 30) player.y -= 4;
        if (kb.pressing('down') && player.y < height - 30) player.y += 4;
    }

    // ジャンプ処理（ジャンプ時に足場の慣性速度をリセット）
    if (currentGravity == 'down' && kb.presses('up') && canJump) {
        player.vel.x = 0;
        if (jumpCount == 0) {
            player.vel.y = -8;
        } else {
            player.vel.y = -4;
        }
        jumpCount++;
    } else if (currentGravity == 'up' && kb.presses('down') && canJump) {
        player.vel.x = 0;
        if (jumpCount == 0) {
            player.vel.y = 8;
        } else {
            player.vel.y = 4;
        }
        jumpCount++;
    } else if (currentGravity == 'left' && kb.presses('right') && canJump) {
        player.vel.y = 0;
        if (jumpCount == 0) {
            player.vel.x = 8;
        } else {
            player.vel.x = 4;
        }
        jumpCount++;
    } else if (currentGravity == 'right' && kb.presses('left') && canJump) {
        player.vel.y = 0;
        if (jumpCount == 0) {
            player.vel.x = -8;
        } else {
            player.vel.x = -4;
        }
        jumpCount++;
    }


    // 2. 敵が出現する
    if (random(0, 150) < 5) {
        let randomY = random(height, height - 460);
        let e = new Sprite(width + 20, randomY, 40, 40, 'kinematic');
        e.img = "hone.png";
        e.scale = 0.1;
        e.vel.x = random(-4, -8);
        enemies.push(e);
    }

    // 3. 段差が出現する
    if (random(0, 100) < 1) {
        let p;
        // 重力に合わせて出現する形と方向を変える！
        if (currentGravity == 'down' || currentGravity == 'up') {
            // 上下重力の時は足場が右から流れる
            let randomY = random(60, height - 60); // 画面全体の高さからランダム
            p = new Sprite(width + 60, randomY, 120, 15, 'kinematic');
            p.color = mainColor;
            p.vel.x = -3;
        } else {
            // 左右重力の時は縦長の足場が上から流れる
            let randomX = random(60, width - 60); // 画面全体の幅からランダム
            p = new Sprite(randomX, -60, 15, 120, 'kinematic');
            p.color = mainColor;
            p.vel.y = 3; // 上から下へ進む
        }
        platforms.push(p);
    }

    // 4. タイムの計算と表示
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 30, 40);

    // 現在の重力の向きを文字で教えてあげる
    fill(accentColor);
    text('GRAVITY: ' + currentGravity.toUpperCase(), 30, 70);

    // 5. 敵の当たり判定と消去
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1);
            continue;
        }

        if (player.overlaps(enemies[i])) {
            surviveTime = currentSec;
            initGameOver();
            scene = 'gameover';
            break;
        }
    }

    // 6. 段差の消去
    for (let i = platforms.length - 1; i >= 0; i--) {
        let p = platforms[i];
        if (p.x < -100 || p.x > width + 100 || p.y < -100 || p.y > height + 100) {
            p.remove();
            platforms.splice(i, 1);
        }
    }
}
function drawBackgroundArrow() {
    push();

    // 画面の真ん中を基準に設定
    translate(width / 2, height / 2);

    // 現在の重力の向きに合わせて画面を回転させる角度を決める
    let angle = 0;
    if (currentGravity == 'down') angle = 0;
    if (currentGravity == 'left') angle = 90;
    if (currentGravity == 'up') angle = 180;
    if (currentGravity == 'right') angle = -90;

    // 決めた角度だけ回す
    rotate(angle);

    // 画像の中心を基準に表示する設定
    imageMode(CENTER);

    tint(255, 100);

    image(arrowImg, 0, 0, 300, 300);

    pop();
}
function initGameOver() {
    allSprites.removeAll();
}
function drawGameOver() {
    background(baseColor);
    textSize(50);
    textAlign(CENTER);
    fill(accentColor);
    text('GAME OVER...', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('生存記録: ' + surviveTime + '秒', width / 2, height / 2 + 20);

    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}