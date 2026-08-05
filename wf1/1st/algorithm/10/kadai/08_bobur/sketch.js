let scene = 'title';

let baseColor = '#000';
let mainColor = '#57cb6e';
let subColor = '#ffffff';
let accentColor = 'rgb(255, 248, 57)';

let player;
let enemies = [];

let startFrame = 0;
let surviveTime = 0;
let ENEMY_COUNT = 6;

let stars = [];
let numStars = 120;


function setup() {
    new Canvas(640, 480);
    world.gravity.y = 0;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            twinkleSpeed: (0.02, 0.07),
            offset: random(1000)
        });
    }
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

function drawStarrySky() {
    background(baseColor);
    noStroke();
    for (let s of stars) {
        let b = map(sin(frameCount * s.twinkleSpeed + s.offset), -1, 1, 80, 255);
        fill(255, 255, 255, b);
        ellipse(s.x, s.y, s.size);
    }
}

function drawTitle() {
    drawStarrySky();

    textSize(40);
    textAlign(CENTER);
    fill(subColor);
    text('ESCAPE RUNNER', width / 2, height / 2 - 40);

    textSize(20);
    fill(mainColor);
    text('十字キー: 上下左右に移動', width / 2, height / 2 + 20);
    text('スペースキーでスタート！', width / 2, height / 2 + 80);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    enemies = [];
    startFrame = frameCount;

    player = new Sprite(width / 2, height / 2, 2);
    player.color = subColor;
    player.text = '🦞';
    player.textSize = 50;



    for (let i = 0; i < ENEMY_COUNT; i++) {
        let e = new Sprite(random(20, width - 20), random(20, height - 20), 30, 'kinematic');
        // e.color = accentColor;
        e.vel.x = random(-4, 4);
        e.vel.y = random(-4, 4);
        enemies.push(e);
        e.text = '🦠';
        e.textSize = '40';
    }
}

function drawGame() {
    drawStarrySky();

    if (kb.pressing('left') && player.x > 15) { player.x -= 4; }
    if (kb.pressing('right') && player.x < width - 15) { player.x += 4; }
    if (kb.pressing('up') && player.y > 15) { player.y -= 4; }
    if (kb.pressing('down') && player.y < height - 15) { player.y += 4; }

    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);

    for (let i = 0; i < enemies.length; i++) {

        if (enemies[i].x < 15 || enemies[i].x > width - 15) { enemies[i].vel.x *= -1; }
        if (enemies[i].y < 15 || enemies[i].y > height - 15) { enemies[i].vel.y *= -1; }

        if (player.overlaps(enemies[i])) {
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
    drawStarrySky();

    textSize(50);
    textAlign(CENTER);
    fill(accentColor);
    text('GAME OVER...', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('生存記録: ' + surviveTime + '秒', width / 2, height / 2 + 20);

    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 150);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}
