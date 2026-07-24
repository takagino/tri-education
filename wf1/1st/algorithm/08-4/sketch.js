let player;
let target;
let enemies = [];
let score = 0;
const SW = 640;
const SH = 480;
const ENEMY_COUNT = 10;
const CLEAR_SCORE = 10;


function setup() {
    new Canvas(SW, SH);

    player = new Sprite(SW / 2, SH / 2, 30, 30);
    player.color = 'yellow';
    player.text = '🐷';
    player.textSize = 20;

    target = new Sprite(random(SW), random(SH), 20, 'static');
    target.color = 'red';

    for (let i = 0; i < ENEMY_COUNT; i++) {
        let e = new Sprite(random(SW), random(SH), 20, 'kinematic');
        e.color = 'black';
        e.vel.x = 3;
        e.vel.y = 3;
        enemies.push(e);
    }
}

function draw() {
    background('skyblue');

    movePlayer();
    checkHit();

    let time = floor(frameCount / 60);

    textSize(16);
    text('TIME: ' + time, 10, 20);
    text('SCORE: ' + score + ' / ' + CLEAR_SCORE, 10, 40);

    if (score == CLEAR_SCORE) {
        fill('red');
        textSize(50);
        textAlign(CENTER);
        text('CLEAR!! TIME: ' + time, SW / 2, SH / 2);
        noLoop();
    }
}

function movePlayer() {
    if (kb.pressing('right') && player.x < SW) { player.x += 5; }
    if (kb.pressing('left') && player.x > 0) { player.x -= 5; }
    if (kb.pressing('up') && player.y > 0) { player.y -= 5; }
    if (kb.pressing('down') && player.y < SH) { player.y += 5; }

    if (player.overlaps(target)) {
        target.x = random(SW);
        target.y = random(SH);
        score++;
    }
}

function checkHit() {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].x < 0 || enemies[i].x > SW) { enemies[i].vel.x *= -1; };
        if (enemies[i].y < 0 || enemies[i].y > SH) { enemies[i].vel.y *= -1; };

        if (player.overlaps(enemies[i])) {
            score = 0;
            player.text = '😵';
            player.color = 'red';
        }
    }

    if (score > 0) {
        player.text = '🐷';
        player.color = 'yellow';
    }
}