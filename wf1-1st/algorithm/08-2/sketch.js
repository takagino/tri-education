let player;
let target;
let enemies = [];
const enemyCount = 10;
let score = 0;
const w = 640;
const h = 480;


function setup() {
    new Canvas(w, h);

    player = new Sprite(w / 2, h / 2, 30, 30);
    player.color = 'yellow';
    player.text = '🐷';
    player.textSize = 20;

    target = new Sprite(random(w), random(h), 20, 'static');
    target.color = 'red';

    for (let i = 0; i < enemyCount; i++) {
        let enemy = new Sprite(random(w), random(h), 20, 'kinematic');
        enemy.color = 'black';
        enemy.vel.x = 3;
        enemy.vel.y = 3;
        enemies.push(enemy);
    }
}

function draw() {
    background('skyblue');

    movePlayer();

    if (player.overlaps(target)) {
        target.x = random(w);
        target.y = random(h);
        score++;
    }

    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].x < 0 || enemies[i].x > w) {
            enemies[i].vel.x *= -1;
        }
        if (enemies[i].y < 0 || enemies[i].y > h) {
            enemies[i].vel.y *= -1;
        }

        if (player.overlaps(enemies[i])) {
            score = 0;
        }
    }

    textSize(16);
    text('SCORE: ' + score, 10, 20);
}

function movePlayer() {
    if (kb.pressing('right') && player.x < w) { player.x += 5; }
    if (kb.pressing('left') && player.x > 0) { player.x -= 5; }
    if (kb.pressing('up') && player.y > 0) { player.y -= 5; }
    if (kb.pressing('down') && player.y < h) { player.y += 5; }
}