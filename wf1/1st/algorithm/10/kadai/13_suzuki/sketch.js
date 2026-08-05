let scene = "title";

let baseColor = "#000000";   // 背景色
let mainColor = "#FFFFFF";   // 通常の文字
let subColor = "#00FFFF";    // プレイヤー
let accentColor = "#FF0044"; // 敵・ゲームオーバー

let player;
let enemies = [];

let startFrame = 0;
let surviveTime = 0;

let ENEMY_COUNT = 3;
let nextEnemyTime = 3;
let gameOverCount = 0;

function setup() {
    new Canvas(500, 1000);
    world.gravity.y = 0;
}

function draw() {
    if (scene == "title") {
        drawTitle();
    } else if (scene == "game") {
        drawGame();
    } else if (scene == "gameover") {
        drawGameOver();
    }
}

// タイトル画面
function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textSize(40);
    textAlign(CENTER);
    fill(subColor);
    text("ESCAPE RUNNER", width / 2, height / 2 - 40);

    textSize(20);
    fill(mainColor);
    text("十字キー：上下左右に移動", width / 2, height / 2 + 20);
    text("スペースキーでスタート！", width / 2, height / 2 + 80);

    if (kb.presses("space")) {
        initGame();
        scene = "game";
    }
}

// ゲーム開始
function initGame() {
    allSprites.removeAll();
    enemies = [];
    startFrame = frameCount;
    nextEnemyTime = 3;

    // プレイヤー
    player = new Sprite(width / 10, height / 2, 30, 30);
    player.color = subColor;

    // 最初の敵を3体作る
    for (let i = 0; i < ENEMY_COUNT; i++) {
        let e = new Sprite(
            random(20, width - 20),
            random(20, height - 20),
            30,
            "kinematic"
        );

        e.color = accentColor;
        e.vel.x = random(-10, 10);
        e.vel.y = random(-10, 10);

        enemies.push(e);
    }
}

// ゲーム画面
function drawGame() {
    background(baseColor);

    // プレイヤー操作
    if (kb.pressing("left") && player.x > 15) {
        player.x -= 8;
    }

    if (kb.pressing("right") && player.x < width - 15) {
        player.x += 8;
    }

    if (kb.pressing("up") && player.y > 15) {
        player.y -= 8;
    }

    if (kb.pressing("down") && player.y < height - 15) {
        player.y += 8;
    }


    let currentSec = floor((frameCount - startFrame) / 60);

    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text("TIME：" + currentSec + "秒", 10, 30);

    // 3秒、6秒、9秒ごとに敵を1体増やす
    if (currentSec >= nextEnemyTime) {
        let e = new Sprite(
            random(20, width - 20),
            random(20, height - 20),
            30,
            "kinematic"
        );

        e.color = accentColor;
        e.vel.x = random(-10, 10);
        e.vel.y = random(-10, 10);

        enemies.push(e);

        nextEnemyTime += 3;
    }


    for (let i = 0; i < enemies.length; i++) {


        if (enemies[i].x < 15 || enemies[i].x > width - 15) {
            enemies[i].vel.x *= -1;
        }


        if (enemies[i].y < 15 || enemies[i].y > height - 15) {
            enemies[i].vel.y *= -1;
        }


        if (player.overlaps(enemies[i])) {
            surviveTime = currentSec;
            initGameOver();
            scene = "gameover";
            break;
        }
    }
}


function initGameOver() {
    allSprites.removeAll();
    gameOverCount++;
}

function drawGameOver() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(accentColor);

    let message = "";

    if (gameOverCount == 1) {
        message = "あれ";
    } else if (gameOverCount == 2) {
        message = "ん？";
    } else if (gameOverCount == 3) {
        message = "まじか";
    } else {
        message = "終わった";
    }

    text(message, width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text(
        "生存記録：" + surviveTime + "秒",
        width / 2,
        height / 2 + 20
    );

    textSize(20);
    fill(subColor);
    text(
        "スペースキーでタイトルへ",
        width / 2,
        height / 2 + 100
    );

    if (kb.presses("space")) {
        initTitle();
        scene = "title";
    }
}