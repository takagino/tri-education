let player;
let target;
let score = 0;
const w = 640;
const h = 480;


function setup() {
    new Canvas(w, h);

    player = new Sprite(w / 2, h / 2, 30, 30);
    player.color = 'yellow';
    player.text = '🐷';
    player.textSize = 20;

    target = new Sprite(random(w), random(h), 20);
    target.color = 'red';
}

function draw() {
    background('skyblue');

    movePlayer();

    if (player.overlaps(target)) {
        target.x = random(w);
        target.y = random(h);
        score++;
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