// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';

let baseColor = '#595959';
let startFrame = 0;

let player;
let playerImg;
let carImg;
let gameoverImg;
let cars;
let gameTime = 10;

function preload() {
    playerImg = loadImage('./character_gakusei_woman_sailor_02_white.png');
    carImg = loadImage('./kuruma_keitruck_01.png');
    bgImg = loadImage("./background.png");
    gameoverImg = loadImage("./character_daitenshi_01_01_brown.png");
    clearImg = loadImage("./crown_01_gold_red.png");
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

// =========================================================
// 各画面の処理
// =========================================================

// ---------- タイトル画面の処理 ----------
function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textAlign(CENTER, CENTER);

    fill("red");
    textStyle(BOLD);
    textSize(65);
    text("CAR GAME", width / 2, 140);

    fill("white");
    textStyle(NORMAL);
    textSize(30);
    text("↑↓キーで車を避けよう！", width / 2, 220);
    text("Spaceキーでスタート", width / 2, 300);

    // ゲームスタート
    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

// ---------- ゲーム画面の処理 ----------
function initGame() {
    allSprites.removeAll();
    startFrame = frameCount;

    player = new Sprite(100, height / 2, 100, 100);
    player.image = playerImg;
    player.scale = 0.07;

    cars = new Group();
}

function drawGame() {
    image(bgImg, 0, 0, width, height);

    if (frameCount % 7 == 0) {
        let size = random(10, 30);
        let car = new cars.Sprite(width, random(height), 150, 150);
        car.image = carImg;
        car.scale = 0.13;
        car.vel.x = -16;
    }

    if (kb.pressing("up")) {
        player.y -= 5;
    }

    if (kb.pressing("down")) {
        player.y += 5;
    }

    player.y = constrain(player.y, 15, height - 15);

    // タイムの計算
    let currentSec = floor((frameCount - startFrame) / 60);

    // ゲームオーバー
    if (player.overlaps(cars)) {
        initGameOver();
        scene = 'gameover';
    }

    // クリア
    if (currentSec >= gameTime) {
        initResult();
        scene = 'result';
    }

    text("subColor");
    textSize(24);
    textAlign(LEFT, TOP);
    text("TIME : " + (gameTime - currentSec), 10, 10);
}

// ---------- クリア（結果）画面の処理 ----------
function initResult() {
    allSprites.removeAll();
}

function drawResult() {
    background(baseColor);

    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(65);
    textStyle(BOLD);
    text("GAME CLEAR!!", width / 2, 140);

    image(clearImg, width / 2 - 80, height / 2 - 65, 150, 100);


    fill("white");
    textSize(30);
    textStyle(NORMAL);
    text("Spaceキーでタイトルへ", width / 2, 300);

    // タイトルへ戻る
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

// ---------- ゲームオーバー画面の処理 ----------
function initGameOver() {
    allSprites.removeAll();
}

function drawGameOver() {
    background(baseColor);

    fill("red");
    textAlign(CENTER, CENTER);
    textSize(65);
    textStyle(BOLD);
    text("GAME OVER", width / 2, 140);

    image(gameoverImg, width / 2 - 100, height / 2 - 65, 200, 100);

    fill("white");
    textSize(30);
    textStyle(NORMAL);
    text("Spaceキーでタイトルへ", width / 2, 300);

    // タイトルへ戻る
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}