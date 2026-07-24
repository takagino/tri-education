// =========================================================
// 1. グローバル変数・設定値エリア
// =========================================================
let scene = 'title'; // 画面ステート（'title', 'game', 'result', 'gameover'）
let player;
let coins = [];
let score = 0;
let clearTime = 0;   // クリアタイム記録用
let startFrame = 0;  // ★差分計算用：ゲーム開始時のフレーム記録用
const MAX_COINS = 10;  // コインの総数
const TIME_LIMIT = 10; // 制限時間（秒）


// =========================================================
// 2. setup & draw（メインループ）
// =========================================================
function setup() {
    new Canvas(640, 480);
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'result') {
        drawResult();
    } else if (scene == 'gameover') {
        drawGameover();
    }
}


// =========================================================
// 3. タイトル画面（title）
// =========================================================
function drawTitle() {
    background('orange');

    textSize(30);
    textAlign(CENTER);
    fill('#fff');
    text('コイン集めタイムアタック', width / 2, height / 2);

    textSize(16);
    fill('#000');
    text('スペースキーでスタート！', width / 2, height / 2 + 40);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}


// =========================================================
// 4. ゲーム本編画面（game）
// =========================================================
// 【初期化】ゲーム開始瞬間に1回だけ実行される準備関数
function initGame() {
    score = 0;
    startFrame = frameCount; // ★「今、何コマ目か」を開始基準点として記録！
    coins = [];              // 配列も空にリセット
    allSprites.removeAll();  // 全スプライトの消去

    // プレイヤー生成
    player = new Sprite(width / 2, height / 2, 30, 30);
    player.color = 'yellow';
    player.text = '🐷';
    player.textSize = 20;

    // コインをループ生成
    for (let i = 0; i < MAX_COINS; i++) {
        let c = new Sprite(random(width), random(height), 20, 'static');
        c.color = 'gold';
        coins.push(c);
    }
}

// 【毎フレーム描画】ゲーム中のループ処理
function drawGame() {
    background('skyblue');

    movePlayer(); // プレイヤー移動

    // コイン獲得判定
    for (let i = 0; i < coins.length; i++) {
        if (player.overlaps(coins[i])) {
            coins[i].remove();
            score++;
        }
    }

    // ★差分計算：現在のフレームから、開始時のフレームを引き算して秒数にする
    let currentSec = floor((frameCount - startFrame) / 60);

    textSize(16);
    textAlign(LEFT);
    fill('#000');
    text('TIME: ' + currentSec, 10, 20);
    text('SCORE: ' + score + ' / ' + MAX_COINS, 10, 40);

    // タイムオーバー判定
    if (currentSec >= TIME_LIMIT) {
        initGameover();
        scene = 'gameover';
    }
    // クリア判定
    else if (score >= MAX_COINS) {
        clearTime = currentSec; // 最終クリアタイムを保存
        initResult();           // リザルト画面の初期化
        scene = 'result';       // ステートをリザルト画面へ
    }
}

// =========================================================
// 5. リザルト画面（result）
// =========================================================
// 【初期化】リザルト遷移瞬間に1回だけ実行される準備関数
function initResult() {
    allSprites.removeAll(); // プレイヤーや残ったコインを画面から消す
}

// 【毎フレーム描画】結果発表の処理
function drawResult() {
    background('darkgray');

    textSize(30);
    textAlign(CENTER);
    fill('#ff0');
    text('CLEAR TIME: ' + clearTime + ' 秒', width / 2, height / 2);

    textSize(16);
    fill('#fff');
    text('スペースキーでタイトルへ戻る', width / 2, height / 2 + 40);

    if (kb.presses('space')) {
        scene = 'title';
    }
}


// =========================================================
// 6. ゲームオーバー画面（gameover）
// =========================================================
// 【初期化】ゲームオーバー遷移瞬間に1回だけ実行される準備関数
function initGameover() {
    allSprites.removeAll(); // プレイヤーやコインを画面から消す
}

// 【毎フレーム描画】ゲームオーバー画面の処理
function drawGameover() {
    background('black');

    textSize(40);
    textAlign(CENTER);
    fill('#f00');
    text('GAME OVER', width / 2, height / 2 - 20);

    textSize(16);
    fill('#fff');
    text('スペースキーでタイトルへ戻る', width / 2, height / 2 + 30);

    if (kb.presses('space')) {
        scene = 'title'; // ステートをタイトルへ戻す
    }
}


// =========================================================
// 7. 独自の移動関数
// =========================================================
function movePlayer() {
    if (kb.pressing('right') && player.x < width) { player.x += 5; }
    if (kb.pressing('left') && player.x > 0) { player.x -= 5; }
    if (kb.pressing('up') && player.y > 0) { player.y -= 5; }
    if (kb.pressing('down') && player.y < height) { player.y += 5; }
}