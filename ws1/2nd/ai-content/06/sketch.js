let player;
let floor;
let platforms;
let enemies;
let coin;
let playerImg;
let enemyImg;
let coinImg;

let isGameOver = false;
let isClear = false;

function preload() {
    playerImg = loadImage('assets/player.svg');
    enemyImg = loadImage('assets/enemy.svg');
    coinImg = loadImage('assets/coin.svg');
}

function setup() {
    new Canvas(800, 500);
    world.gravity.y = 20;

    // 主人公
    player = new Sprite(80, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;
    player.bounciness = 0;
    player.rotationLock = true;

    platforms = new Group();
    platforms.color = '#2ed573';
    platforms.collider = 'static';

    new platforms.Sprite(400, 480, 800, 40);

    // 浮かぶ足場たち（好みの位置に配置）
    new platforms.Sprite(220, 380, 160, 20);
    new platforms.Sprite(580, 380, 160, 20);
    new platforms.Sprite(400, 300, 180, 20);
    new platforms.Sprite(200, 180, 140, 20);
    new platforms.Sprite(600, 180, 140, 20);

    // 敵キャラ（kinematic）
    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic'; // 重力で落ちず、真っ直ぐ進む

    // ★ 当たり判定もグループに対して1行書くだけで、出現するすべての敵に適用される！
    player.overlaps(enemies, hitEnemy);

    // コイン（static で空中に配置）
    let rx = random(100, width - 100);
    let ry = random(150, 350);
    coin = new Sprite(rx, ry, 'static');
    coin.img = coinImg;
    coin.scale = 0.08;
    coin.w = 26;
    coin.h = 34;

    // ① コインとの衝突判定
    player.overlaps(coin, getCoin);
}

// コイン獲得処理
function getCoin(player, coin) {
    coin.remove(); // コイン消滅
    isClear = true;
}

// 敵キャラ接触時の処理（★ 練習課題！）
function hitEnemy(player, enemy) {
    isGameOver = true;
    player.visible = false; // プレイヤーを非表示
}

// 左右からランダムに敵キャラを流す関数
function spawnEnemy() {
    let fromLeft = random() < 0.5; // 左右どちらから流すかランダム決定
    let startX = fromLeft ? -30 : width + 30;
    let speed = random(3, 6);
    let vx = fromLeft ? speed : -speed;

    let spawnY = random([150, 250, 350, 435]);

    let e = new enemies.Sprite(startX, spawnY);
    e.vel.x = vx;

    // 進行方向に向きを合わせる（右向きなら反転）
    if (fromLeft) {
        e.mirror.x = true;
    }
}

function draw() {
    clear();
    background('#1e272e');

    let moveSpeed = 5;

    // ゲームプレイ中のみ操作可能
    if (!isGameOver && !isClear) {
        if (kb.pressing('left') || kb.pressing('a')) {
            player.vel.x = -moveSpeed;
            player.mirror.x = true;
        } else if (kb.pressing('right') || kb.pressing('d')) {
            player.vel.x = moveSpeed;
            player.mirror.x = false;
        } else {
            player.vel.x = 0;
        }

        if (kb.presses('space') && player.colliding(platforms)) {
            player.vel.y = -11;
        }

        player.x = constrain(player.x, 25, width - 25);
    } else {
        player.vel.x = 0;
    }

    // 状態テキストの表示
    textAlign(CENTER, CENTER);
    textSize(40);
    if (isGameOver) {
        fill('#ff4757');
        text('GAME OVER', width / 2, height / 2);
    } else if (isClear) {
        fill('#2ed573');
        text('STAGE CLEAR!', width / 2, height / 2);
    }

    // 75フレーム（約1.25秒）ごとに敵キャラを流す
    if (frameCount % 75 === 0) {
        spawnEnemy();
    }

    // ★ 画面外へ通り過ぎた敵キャラは自動削除（メモリ解放）
    for (let e of enemies) {
        if (e.x < -60 || e.x > width + 60) {
            e.remove();
        }
    }
}