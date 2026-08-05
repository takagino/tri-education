let scene = 'title';

let highScore = 0;
let highTimeScore = 0;

let baseColor = '#000000';   // 背景色（ブラック）
let mainColor = '#FFFFFF';   // 通常の文字（ホワイト）
let subColor = '#00FFFF';    // タイトル・プレイヤーなど（シアン）
let accentColor = '#FF0044'; // 敵・ゲームオーバーなど（レッド）
let wallsColor = "rgba(73, 220, 146, 0.7)"
let CenterWallsColor = 'rgba(255, 52, 52, 0.7)'


let player;

let enemies = [];

let enemiesCount = 0;

let startFrame = 0;
let surviveTime = 0; // 生き残った記録（秒）
let ENEMY_COUNT = 5; // 最初からいる敵の数

let playerImg, monsterImg; // 画像を入れる変数

// ▼ setupの前にこれを追加！
function preload() {
    monsterImg = loadImage('yurei_03.png');
}

function setup() {
    new Canvas(1240, 880);
    world.gravity.y = 0; // ⭐️ トップダウンなので重力を「ゼロ」にする！
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

// =========================================================
// 各画面の処理
// =========================================================
function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textSize(40);
    textAlign(CENTER);
    fill(subColor);
    text('ESCAPE RUNNER', width / 2, height / 2 - 40);

    textSize(20);
    fill(mainColor);
    text('十字キー: 上下左右に移動', width / 2, height / 2 + 20);
    text('スペースキーでスタート！', width / 2, height / 2 + 80);
    text('シフトキーでダッシュ！', width / 2, height / 2 + 140);


    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }

    textSize(20);
    text("最高敵出現数 : " + highScore, width / 2, 300);
    text("最高生存時間 : " + highTimeScore + " 秒", width / 2, 350);

}

function initGame() {
    allSprites.removeAll();
    enemies = [];
    startFrame = frameCount;

    enemiesCount = 0;

    // プレイヤーの生成（画面の中央）
    player = new Sprite(width / 20, height / 2, 40, 40);
    player.color = subColor;

    // 最初からいる敵の生成
    for (let i = 0; i < ENEMY_COUNT; i++) {
        // プレイヤーから少し離れたランダムな場所に生成
        let e = new Sprite(random(20, width - 20), random(20, height - 20), 30, 'kinematic');
        monsterImg.resize(30, 30); // 画像をスプライトと同じ 30x30 にリサイズする
        e.image = monsterImg;
        e.vel.x = random(-6, 6); // 上下左右にランダムなスピード
        e.vel.y = random(-4, 4);
        enemies.push(e);
        enemiesCount++;
    }


    walls = [];

    for (let i = 0; i < 7; i++) {
        let wall = new Sprite(random(100, width - 100), random(100, height - 100), 80, 80, 'static');
        wall.color = wallsColor;
        walls.push(wall);
    }

    CenterWalls = new Sprite(width / 2, height / 2, 50, 50, 'static');
    CenterWalls.color = CenterWallsColor;

}

function drawGame() {
    background(baseColor);

    if (enemies.length < 25 && random(0, 100) < 0.7) {
        let e = new Sprite(random(610, width - 610), random(440, height - 440), 50, 'kinematic');

        monsterImg.resize(50, 50); // 画像をスプライトと同じ 30x30 にリサイズする
        e.image = monsterImg;

        e.vel.x = random(-6, 7); // 上下左右にランダムなスピード
        e.vel.y = random(-6, 7);
        enemies.push(e);
        enemiesCount++;
    }



    // 1. プレイヤーの操作（上下左右）＆ 画面から出ない制限




    let speed = 5;
    if (kb.pressing('shift')) {
        speed = 8;
    }

    if (kb.pressing('left') && player.x > 15) { player.x -= speed; }
    if (kb.pressing('right') && player.x < width - 15) { player.x += speed; }
    if (kb.pressing('up') && player.y > 15) { player.y -= speed; }
    if (kb.pressing('down') && player.y < height - 15) { player.y += speed; }

    // 2. タイムの計算と表示
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);
    text("出現した敵: " + enemiesCount, 10, 50);

    // 3. 敵の当たり判定と壁の跳ね返り（※数は変わらないので普通のfor文でOK）
    for (let i = 0; i < enemies.length; i++) {

        // 画面の端にぶつかったら跳ね返る（第5回の復習）
        if (enemies[i].x < 15 || enemies[i].x > width - 15) { enemies[i].vel.x *= -1; }
        if (enemies[i].y < 15 || enemies[i].y > height - 15) { enemies[i].vel.y *= -1; }

        // プレイヤーに触れたらゲームオーバー
        if (player.overlaps(enemies[i])) {
            surviveTime = currentSec;

            if (enemiesCount > highScore) {
                highScore = enemiesCount;
            }

            if (surviveTime > highTimeScore) {
                highTimeScore = surviveTime;
            }

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
    text("出現した敵 : " + enemiesCount + " 体", width / 2, height / 2 + 60);


    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }


}