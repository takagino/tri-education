// ========================================================
// 06_p5playの基礎: ⭐️ 練習 3: 敵との衝突判定
// ========================================================
let player;
let floor;
let platform;
let enemy;
let coin;
let playerImg;
let enemyImg;
let coinImg;

let isGameOver = false;
let isClear = false;

function preload() {
    playerImg = loadImage('../../assets/player.svg');
    enemyImg = loadImage('../../assets/enemy.svg');
    coinImg = loadImage('../../assets/coin.svg');
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

    // 地面と足場（static）
    floor = new Sprite(400, 480, 800, 40, 'static');
    floor.color = '#2ed573';

    platform = new Sprite(220, 380, 160, 20, 'static');
    platform.color = '#2ed573';

    // 敵キャラ（kinematic）
    enemy = new Sprite(800, 350, 'kinematic');
    enemy.img = enemyImg;
    enemy.scale = 0.09;
    enemy.w = 40;
    enemy.h = 40;
    enemy.vel.x = -4;

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

    // ② 敵キャラとの衝突判定（★ 練習課題！）
    player.overlaps(enemy, hitEnemy);
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

        if (kb.presses('space')) {
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
}
