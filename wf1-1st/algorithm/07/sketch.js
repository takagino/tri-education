let player; // プレイヤー用の変数
let coins = []; // コインを入れる配列
let score = 0;  // スコアを 0 で初期化
let maxCoins = 30;  // クリアに必要な枚数
let targetSec = 15; // Sランクの目標秒数

function setup() {
    new Canvas(640, 480);
    player = new Sprite(320, 240, 30, 30);
    player.color = 'red';

    // コインを30枚ランダムに配置
    for (let i = 0; i < maxCoins; i++) {
        let c = new Sprite(random(20, 620), random(20, 460), 20, 'static');
        c.color = 'gold';
        coins.push(c);
    }
}

function draw() {
    background('skyblue');

    // プレイヤーの移動
    movePlayer();

    // コインとの当たり判定
    for (let i = 0; i < coins.length; i++) {
        if (player.overlaps(coins[i])) {
            coins[i].remove();
            score++; // 拾ったらスコア加算
        }
    }

    let sec = floor(frameCount / 60);

    textSize(16);
    textAlign(RIGHT);
    fill('black');

    // zeroPadding() の戻り値（加工された文字列）がそのまま text() に渡される
    text('TIME: ' + zeroPadding(sec), 630, 20);
    text('SCORE: ' + zeroPadding(score), 630, 50);
    text('RANK: ' + getRank(score, sec), 630, 80);

    checkClear();
}

// 数値(num)を受け取り、2桁にして返す関数
function zeroPadding(num) {
    if (num < 10) {
        return '0' + num; // 10未満なら '0' を結合して返す
    } else {
        return num;       // 10以上なら、そのままの値を返す
    }
}

function movePlayer() {
    if (kb.pressing('right') && player.x < 625) { player.x += 5; }
    if (kb.pressing('left') && player.x > 15) { player.x -= 5; }
    if (kb.pressing('up') && player.y > 15) { player.y -= 5; }
    if (kb.pressing('down') && player.y < 465) { player.y += 5; }
}

function checkClear() {
    if (score == maxCoins) {
        textSize(50);
        textAlign(CENTER);
        fill('red');
        text('CLEAR!!', 320, 240);
        noLoop(); // 完全に停止
    }
}

// スコア(s) と 経過秒数(t) の「2つの値」を受け取る関数
function getRank(s, t) {

    // スコアが25以上、かつ(&&)、時間が15秒以下なら
    if (s >= maxCoins && t <= targetSec) {
        return 'S (神速の達人)';
    } else if (s >= maxCoins / 3 * 2) {
        return 'A (普通の達人)';
    } else if (s >= maxCoins / 2) {
        return 'B (一人前)';
    } else {
        return 'C (初心者)';
    }
}