// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';

let baseColor = '#F4F1EA';   // 背景色（ベージュ）
let mainColor = '#6B5E51';   // 通常の文字・足場（ブラウン）
let subColor = '#8A9A86';    // プレイヤー・タイトル（セージグリーン）
let accentColor = '#D38C7D'; // 敵・ゲームオーバー（テラコッタ）

let player;
let ground;
let enemies = [];

let startFrame = 0;
let surviveTime = 0; // 生き残った記録（秒）を入れる箱

function setup() {
    new Canvas(640, 480);
    world.gravity.y = 10; // 下向きの重力を設定
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
    text('JUMP SURVIVAL', width / 2, height / 2 - 40);

    textSize(20);
    fill(mainColor);
    text('↑キー: ジャンプ / 左右キー: 移動', width / 2, height / 2 + 20);
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

    // 足場の生成（絶対に動かない static）
    ground = new Sprite(width / 2, height - 20, width, 40, 'static');
    ground.color = mainColor;

    // プレイヤーの生成（重力を受けるので dynamic）
    player = new Sprite(100, height - 80, 40, 40);
    player.color = subColor;
}

function drawGame() {
    background(baseColor);

    // 1. プレイヤーの操作（移動とジャンプ）
    if (kb.pressing('left') && player.x > 20) {
        player.x -= 4;
    }
    if (kb.pressing('right') && player.x < width - 20) {
        player.x += 4;
    }
    if (kb.presses('up') && player.colliding(ground)) {
        player.vel.y = -8;
    }

    // 2. 敵が出現する（ランダム）
    if (random(0, 100) < 3) { // 約3%の確率で出現
        let randomY = random(height / 2, height - 60); // 画面下半分のランダムな高さ
        let e = new Sprite(width + 20, randomY, 40, 40, 'kinematic');
        e.color = accentColor;
        e.vel.x = random(-4, -8); // 左に向かって進む
        enemies.push(e);
    }

    // 3. タイムの計算と表示（カウントアップ）
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);

    // 4. 敵の当たり判定と消去（★逆順ループ）
    for (let i = enemies.length - 1; i >= 0; i--) {
        // 画面外（左端）に出たら配列から消す
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1); // ⭐️重要：配列からも削除する
            continue;
        }

        // プレイヤーに触れたらゲームオーバー（記録を保存して画面移動）
        if (player.overlaps(enemies[i])) {
            surviveTime = currentSec; // やられた瞬間のタイムを記録！
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
    text('生存記録: ' + surviveTime + '秒', width / 2, height / 2 + 20); // 記録を発表！

    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    // タイトルへ戻る（もう一度遊べる）
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}