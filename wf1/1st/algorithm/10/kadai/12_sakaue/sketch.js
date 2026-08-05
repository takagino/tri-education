let bg;
let player;
let cakes = [];
let burns = [];
let score = 0;

function preload() {
    bg = loadImage("cakeshop.png");
}

function setup() {
    new Canvas(640, 480);

    player = new Sprite(320, 240, 30, 30);
    player.color = "white";
    player.text = "👩‍🍳";
    player.textSize = 20;

    for (let i = 0; i < 5; i++) {
        let cake = new Sprite(
            random(20, 620),
            random(20, 460),
            25,
        );
        cake.color = "white";
        cake.text = "🍰";
        cake.textSize = 45;
        cake.vel.x = random(-2, 2);
        cake.vel.y = random(-2, 2);
        cakes.push(cake);
    }

    for (let i = 0; i < 5; i++) {
        let burn = new Sprite(
            random(20, 620),
            random(20, 460),
            15,
        );
        burn.color = "brown";
        burn.text = "🔥";
        burn.textSize = 45;
        burn.vel.x = random(-3, 3);
        burn.vel.y = random(-3, 3);
        burns.push(burn);
    }
}

function draw() {

    image(bg, 0, 0, width, height);

    movePlayer();
    checkCake();
    checkBurn();

    for (let cake of cakes) {
        if (cake.x < 20 || cake.x > 620) {
            cake.vel.x *= -1;
        }
        if (cake.y < 20 || cake.y > 460) {
            cake.vel.y *= -1;
        }
    }

    for (let burn of burns) {
        if (burn.x < 20 || burn.x > 620) {
            burn.vel.x *= -1;
        }
        if (burn.y < 20 || burn.y > 460) {
            burn.vel.y *= -1;
        }
    }

    fill("black");
    textSize(20);
    text("🍰 Score : " + score, 20, 30);

    let time = 30 - floor(frameCount / 60);
    text("⏰ Time : " + time, 20, 60);

    if (time <= 0) {
        background("#f8d7e5");

        textAlign(CENTER, CENTER);
        textSize(40);

        if (score >= 20) {
            fill("blue");
            text("🎉 CLEAR!! 🎉", width / 2, height / 2);
        } else {
            fill("red");
            text("GAME OVER", width / 2, height / 2);
        }

        noLoop();
    }
}

function movePlayer() {

    if (kb.pressing("left")) {
        player.x -= 5;
    }

    if (kb.pressing("right")) {
        player.x += 5;
    }

    if (kb.pressing("up")) {
        player.y -= 5;
    }

    if (kb.pressing("down")) {
        player.y += 5;
    }

    player.x = constrain(player.x, 15, 625);
    player.y = constrain(player.y, 15, 465);
}

function checkCake() {

    for (let cake of cakes) {

        if (player.overlaps(cake)) {
            score++;

            cake.x = random(20, 620);
            cake.y = random(20, 460);
        }

    }

}

function checkBurn() {

    for (let burn of burns) {

        if (player.overlaps(burn)) {
            score--;

            burn.x = random(20, 620);
            burn.y = random(20, 460);
        }

    }

}
