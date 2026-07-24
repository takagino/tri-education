// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';

let baseColor = '#000000';   // 背景色（ブラック）
let mainColor = '#FFFFFF';   // 通常の文字（ホワイト）
let subColor = '#00FFFF';    // タイトル・プレイヤーなど（シアン）
let accentColor = '#FF0044'; // 敵・ゲームオーバーなど（レッド）

let player;
let enemies = [];

let startFrame = 0;
let surviveTime = 0; // 生き残った記録（秒）
let ENEMY_COUNT = 5; // 最初からいる敵の数

function setup() {
    new Canvas(640, 480);
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

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    enemies = [];
    startFrame = frameCount;

    // プレイヤーの生成（画面の中央）
    player = new Sprite(width / 2, height / 2, 30, 30);
    player.color = subColor;

    // 最初からいる敵の生成
    for (let i = 0; i < ENEMY_COUNT; i++) {
        // プレイヤーから少し離れたランダムな場所に生成
        let e = new Sprite(random(20, width - 20), random(20, height - 20), 30, 'kinematic');
        e.color = accentColor;
        e.vel.x = random(-4, 4); // 上下左右にランダムなスピード
        e.vel.y = random(-4, 4);
        enemies.push(e);
    }
}

function drawGame() {
    background(baseColor);

    // 1. プレイヤーの操作（上下左右）＆ 画面から出ない制限
    if (kb.pressing('left') && player.x > 15) { player.x -= 4; }
    if (kb.pressing('right') && player.x < width - 15) { player.x += 4; }
    if (kb.pressing('up') && player.y > 15) { player.y -= 4; }
    if (kb.pressing('down') && player.y < height - 15) { player.y += 4; }

    // 2. タイムの計算と表示
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);

    // 3. 敵の当たり判定と壁の跳ね返り（※数は変わらないので普通のfor文でOK）
    for (let i = 0; i < enemies.length; i++) {

        // 画面の端にぶつかったら跳ね返る（第5回の復習）
        if (enemies[i].x < 15 || enemies[i].x > width - 15) { enemies[i].vel.x *= -1; }
        if (enemies[i].y < 15 || enemies[i].y > height - 15) { enemies[i].vel.y *= -1; }

        // プレイヤーに触れたらゲームオーバー
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
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(accentColor);
    text('GAME OVER...', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('生存記録: ' + surviveTime + '秒', width / 2, height / 2 + 20);

    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}