let scene = 'title';

let baseColor = 'rgb(0, 166, 255)';
let mainColor = 'rgb(221, 255, 0)';
let subColor = 'rgb(30, 255, 0)';
let accentColor = 'rgb(255, 123, 0)';

let player;
let enemies = [];
let beam = [];

let startFrame = 0;
let surviveTime = 0;

let playerImg;

function preload() {
    playerImg = loadImage('./images/block_ishi.png');
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

function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textSize(40);
    textAlign(CENTER);
    fill(subColor);
    text('SQUARE SURVIVAL', width / 2, height / 2 - 40);

    textSize(20);
    fill(mainColor);
    text('上下キー: 縦移動 / 左右キー: 横移動', width / 2, height / 2 + 20);
    text('縦横に飛び交うレーザーを避け続けろ！', width / 2, height / 2 + 60);
    text('スペースキーでスタート', width / 2, height / 2 + 100);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    enemies = [];
    beam = [];
    startFrame = frameCount;

    player = new Sprite(320, 240, 40, 40);
    playerImg.resize(40, 40);
    player.image = playerImg;
    player.color = subColor;
}

function drawGame() {
    background(baseColor);

    if (kb.pressing('left') && player.x > 20) {
        player.x -= 4;
    }
    if (kb.pressing('right') && player.x < width - 20) {
        player.x += 4;
    }
    if (kb.pressing('up') && player.y > 20) {
        player.y -= 4;
    }
    if (kb.pressing('down') && player.y < height - 20) {
        player.y += 4;
    }

    if (random(0, 1000) < 40) {
        let randomY = random(height / 2 - 240, height / 2 + 240);
        let randomS = random(50, 100);
        let e = new Sprite(width + 20, randomY, randomS, 5, 'kinematic');
        e.color = accentColor;
        e.vel.x = random(-1, -4);
        enemies.push(e);
    }

    if (random(0, 1000) < 32) {
        let randomX = random(width / 2 - 320, width / 2 + 320);
        let randomS = random(50, 100);
        let b = new Sprite(randomX, height / 2 - 260, 5, randomS, 'kinematic');
        b.color = accentColor;
        b.vel.y = random(1, 4);
        beam.push(b);
    }

    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);

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

    for (let i = beam.length - 1; i >= 0; i--) {
        if (beam[i].y < -20) {
            beam[i].remove();
            beam.splice(i, 1);
            continue;
        }

        if (player.overlaps(beam[i])) {
            surviveTime = currentSec;
            initGameOver();
            scene = 'gameover';
            break;
        }
    }
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