// ========================================================
// 06_p5playの基礎: ⭐️ 練習 2: 浮かぶ足場 (static)
// ========================================================
let player;
let floor;
let platform;
let enemy;
let playerImg;
let enemyImg;

function preload() {
    playerImg = loadImage('../../assets/player.svg');
    enemyImg = loadImage('../../assets/enemy.svg');
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

    // 地面（static で固定！）
    floor = new Sprite(400, 480, 800, 40, 'static');
    floor.color = '#2ed573';

    // 浮かぶ足場（static で空中に固定！）
    platform = new Sprite(220, 380, 160, 20, 'static');
    platform.color = '#2ed573';

    // 流れる敵キャラ（kinematic で重力を無視して等速直進！）
    enemy = new Sprite(800, 350, 'kinematic');
    enemy.img = enemyImg;
    enemy.scale = 0.09;
    enemy.w = 40;
    enemy.h = 40;
    enemy.vel.x = -4; // 左へ進む
}

function draw() {
    clear();
    background('#1e272e');

    let moveSpeed = 5;

    // 左右移動と向きの反転
    if (kb.pressing('left') || kb.pressing('a')) {
        player.vel.x = -moveSpeed;
        player.mirror.x = true;
    } else if (kb.pressing('right') || kb.pressing('d')) {
        player.vel.x = moveSpeed;
        player.mirror.x = false;
    } else {
        player.vel.x = 0;
    }

    // ジャンプ
    if (kb.presses('space')) {
        player.vel.y = -11;
    }

    // 画面端の制限
    player.x = constrain(player.x, 25, width - 25);
}
