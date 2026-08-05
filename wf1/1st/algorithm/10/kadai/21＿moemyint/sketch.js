let scene = 'title';
let baseColor = '#000000';
let mainColor = '#000fff';
let subColor = '#fff000';
let accentColor = '#333333';
let startFrame = 0;

let basket;
let fruits = [];
let bombs = [];
let score = 0;
let life = 3;
let GAME_TIME = 60;

let basketImg;
let candyPurple;
let candyPink;
let candyGreen;
let candyYellow;
let candyBlue;
let bombImg;

function preload() {
    basketImg = loadImage("candy png/kago_brown.png");
    candyPurple = loadImage("candy png/candy_round_purple.png");
    candyPink = loadImage("candy png/candy_round_pink.png");
    candyGreen = loadImage("candy png/candy_round_green.png");
    candyYellow = loadImage("candy png/candy_round_yellow.png");
    candyBlue = loadImage("candy png/candy_round_blue.png");
    bombImg = loadImage("candy png/koseki_iron.png");
}

function setup() {
    new Canvas(640, 480);
    world.gravity.y = 0;
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'result') {
        drawResult();
    } else if (scene == 'gameover') {
        drawGameOver();
    }
}

function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textSize(45);
    textAlign(CENTER);
    fill(mainColor);
    text('Candy Catch Game', width / 2, height / 2);

    textSize(25);
    textAlign(CENTER);
    fill(subColor);
    text('Use the arrow keys to move', width / 2, height / 2 + 50);
    text('Press Space Key To Start!', width / 2, height / 2 + 90);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

/*game start yin*/
function initGame() {
    allSprites.removeAll();
    startFrame = frameCount;

    score = 0;
    life = 3;

    basket = new Sprite(width / 2, 430);

    basket.img = basketImg;
    basket.scale = 0.2;

    basket.collider = "kinematic";
    basket.w = 100;
    basket.h = 40;

    fruits = [];
    bombs = [];

    score = 0;
    life = 3;
    startFrame = frameCount;
}

function drawGame() {
    background(baseColor);
    let currentSec = floor((frameCount - startFrame) / 60);

    /*game ka shikumiko d mr yay*/

    if (kb.pressing("left") && basket.x > 40) {
        basket.x -= 6;
    }

    if (kb.pressing("right") && basket.x < width - 40) {
        basket.x += 6;
    }

    if (frameCount % 40 == 0) {
        spawnFruit();
    }

    for (let i = fruits.length - 1; i >= 0; i--) {

        if (basket.overlaps(fruits[i])) {
            score += 10;
            fruits[i].remove();
            fruits.splice(i, 1);
        }

        if (fruits[i].y > height) {
            life--;
            fruits[i].remove();
            fruits.splice(i, 1);
        }

    }

    if (frameCount % 200 == 0) {
        spawnBomb();
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
        if (basket.overlaps(bombs[i])) {
            initGameOver();
            scene = "gameover";
            return;
        }


        if (bombs[i].y > height) {
            bombs[i].remove();
            bombs.splice(i, 1);
        }
    }

    text("Score : " + score, 20, 30);
    text("Life : " + life, 20, 60);
    text("Time : " + (GAME_TIME - currentSec), 20, 90);

    if (life <= 0) {

        initGameOver();

        scene = "gameover";

    }

    if (currentSec >= 60) {
        initResult();
        scene = "result";
    }

    // if (false) {
    //     initGameover();
    //     scene = 'gameover';
    // }

    // if (false) {
    //     initResult();
    //     scene = 'result';
    // }
}

function initResult() {
    allSprites.removeAll();
}

function drawResult() {
    background(baseColor);
    fill(mainColor)

    textSize(50);
    textAlign(CENTER);
    text('You Win', width / 2, 200);

    textSize(25);
    text("Score:" + score, width / 2, 250);
    text('Press space', width / 2, 300);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function initGameOver() {
    allSprites.removeAll();
}

function drawGameOver() {
    background(mainColor);

    textSize(50);
    textAlign(CENTER);
    fill(baseColor);
    text('Game Over!', width / 2, height / 2 - 50);

    textSize(25);
    fill(accentColor);
    text("Score:" + score, width / 2, height / 2 + 20);
    text('Press enter to retry', width / 2, height / 2 + 90);

    if (kb.presses('enter')) {
        initTitle();
        scene = 'title';
    }
}

function spawnFruit() {

    let fruit = new Sprite(random(30, width - 30), -20);

    let type = floor(random(5));

    if (type == 0) {
        fruit.img = candyPurple;
    } else if (type == 1) {
        fruit.img = candyPink;
    } else if (type == 2) {
        fruit.img = candyGreen;
    } else if (type == 3) {
        fruit.img = candyYellow;
    } else {
        fruit.img = candyBlue;
    }

    fruit.scale = 0.08;
    fruit.vel.y = 4;

    fruits.push(fruit);
}

function spawnBomb() {
    let bomb = new Sprite(random(30, width - 30), -20);

    bomb.img = bombImg;
    bomb.scale = 0.08;
    bomb.vel.y = 2;
    bombs.push(bomb);
}