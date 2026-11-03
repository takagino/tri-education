// ========================================================
// 06_p5playの基礎: ⭐️ 練習 1: 流れる敵キャラ
// ========================================================
let player;
let floor;
let enemy;
let playerImg;
let enemyImg;

function preload() {
    playerImg = loadImage('../../assets/player.svg');
    enemyImg = loadImage('../../assets/enemy.svg');
}

function setup() {
    new Canvas(800, 500);

    // 主人公
    player = new Sprite(80, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;

    // 地面（まだコライダーは指定しない素のスプライト）
    floor = new Sprite(400, 480, 800, 40);
    floor.color = '#2ed573';

    // 流れる敵キャラ（まだコライダーは指定しない素のスプライト）
    enemy = new Sprite(800, 350);
    enemy.img = enemyImg;
    enemy.scale = 0.09;
    enemy.w = 40;
    enemy.h = 40;
    enemy.vel.x = -4; // 左向きにスーッと流す
}

function draw() {
    clear();
    background('#1e272e');

    let moveSpeed = 5;

    // 左右移動と向きの反転
    if (kb.pressing('left') || kb.pressing('a')) {
        player.vel.x = -moveSpeed;
        player.mirror.x = true;  // 左を向く
    } else if (kb.pressing('right') || kb.pressing('d')) {
        player.vel.x = moveSpeed;
        player.mirror.x = false; // 右を向く
    } else {
        player.vel.x = 0;
    }

    // 上向きジャンプ（無重力）
    if (kb.presses('space')) {
        player.vel.y = -10;
    }

    // 画面端の制限
    player.x = constrain(player.x, 25, width - 25);
}
