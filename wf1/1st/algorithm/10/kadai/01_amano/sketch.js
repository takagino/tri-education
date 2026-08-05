let scene = 'title';

let player;
let bullets;
let enemies;
let lastShotFrame = 0;
let shotInterval = 30;
let enemyCount = 0;
let startFrame = 0;
let currentSec
let playerImg

function preload() {
    playerImg = loadImage('./yurei_03.png');
}

function setup() {
    new Canvas(480, 640);
    world.gravity.y = 0;
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'result') {
        drawResult();
    }
}

function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background('orange');

    textSize(30);
    textAlign(CENTER);
    text('spaceを押してスタート', width / 2, height / 2 + 40);
    text('シューティングゲーム', width / 2, height / 2 - 40);

    // ゲームスタート
    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}



function initGame() {
    allSprites.removeAll();
    startFrame = frameCount;

    player = new Sprite(240, 600, 60, 20);
    player.image = playerImg;
    playerImg.resize(40, 40);
    player.color = "blue";
    player.vel.x = 4;

    bullets = new Group();

    enemies = new Group();

    enemyCount = 4;

    for (let i = 0; i < enemyCount; i++) {

        let enemy = new enemies.Sprite(
            80 + i * 100, 100, 50, 50
        );

        enemy.hp = floor(random(1, 5));

        enemy.color = "yellow";
        enemy.text = enemy.hp;
        enemy.textSize = 24;
        enemy.textColor = "black";
    }
}



function drawGame() {
    background('orange');

    currentSec = floor((frameCount - startFrame) / 60);

    textSize(16);
    textAlign(RIGHT);
    fill('black');
    text('TIME: ' + currentSec, 70, 20);

    // プレイヤーを左右に自動移動,速度設定
    if (player.x > width - player.w / 2) {
        player.vel.x = -3;
    }

    if (player.x < player.w / 2) {
        player.vel.x = 3;
    }

    if (kb.presses("space") && frameCount - lastShotFrame >= shotInterval) {
        let bullet = new bullets.Sprite(
            player.x,
            player.y - player.h / 2
        );

        bullet.w = 8;
        bullet.h = 20;
        bullet.color = "gold";
        bullet.vel.y = -8;
        lastShotFrame = frameCount;
    }

    //弾と敵の処理
    for (let bullet of bullets) {
        for (let enemy of enemies) {
            if (bullet.overlaps(enemy)) {
                bullet.remove();
                enemy.hp--;

                enemy.text = enemy.hp;

                if (enemy.hp <= 0) {
                    enemy.remove();
                }
                break;
            }
        }

        if (bullet.y < -20) {
            bullet.remove();
        }
    }

    textAlign(CENTER);
    textSize(24);
    for (let enemy of enemies) {
        text(enemy.count, enemy.x, enemy.y);
    }

    if (enemyCount > 0 && enemies.length == 0) {
        initResult();
        scene = "result";
    }
}


function initResult() {
    allSprites.removeAll();
}


function drawResult() {
    background('orange');

    textSize(25);
    textAlign(CENTER);
    text('gameclear', width / 2, height / 2 - 30);
    text('クリアタイム', width / 2, height / 2 + 10);
    text(currentSec + '秒', width / 2, height / 2 + 40);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function zeroPadding(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}