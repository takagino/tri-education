let player;
let coins = [];
let score = 0;

function setup() {
    new Canvas(640, 480);

    player = new Sprite(320, 240, 30, 30);
    player.color = 'yellow';
    player.text = 0;
    player.textSize = 20;

    for (let i = 0; i < 10; i++) {
        let rx = random(20, 620);
        let ry = random(20, 460);
        let c = new Sprite(rx, ry, 20, 'static');
        c.color = 'gold';
        c.text = i;
        coins.push(c);
    }
}

function draw() {
    background('skyblue');

    drawUI();
    movePlayer();

    for (let i = 0; i < coins.length; i++) {
        if (player.overlaps(coins[i]) && coins[i].text == score) {
            coins[i].remove();
            score++;
            player.text = score;
        }
    }

    if (score == 10) {
        textSize(50);
        fill('red');
        text('CLEAR!!', 220, 240);
        text('TIME: ' + frameCount, 180, 300);

        noLoop();
    }
}

function drawUI() {
    textSize(24);
    fill('black');
    text('TIME: ' + frameCount, 10, 30);
    text('SCORE: ' + score, 10, 60);
}

function movePlayer() {
    if (kb.pressing('right') && player.x < 625) { player.x += 5; }
    if (kb.pressing('left') && player.x > 15) { player.x -= 5; }
    if (kb.pressing('up') && player.y > 15) { player.y -= 5; }
    if (kb.pressing('down') && player.y < 465) { player.y += 5; }
}