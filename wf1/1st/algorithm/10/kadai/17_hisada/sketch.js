// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';

let baseColor = '#FDF5E6';   // 背景色（ウォームホワイト）
let mainColor = '#4A4A4A';   // 通常の文字（ダークグレー）
let subColor = '#8B5A2B';    // タイトル・強調・床（木のようなブラウン）
let accentColor = '#D9534F'; // ゲームオーバー・警告（レッド）

let ground;
let boxes = []; // 落としたブロックを入れる配列
let score = 0;  // 積んだ数
let edge = 300; //1辺の長さ


let finalScore = 0;


function preload() {
    cookieImg = loadImage('chocolate_truffle_matcha.png'); // ★追加
}
function setup() {
    new Canvas(640, 480);
    world.gravity.y = 10; // 下向きの重力を設定
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    }
    else if (scene == 'game') {
        drawGame();
    }
    else if (scene == 'gameover') {
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
    text('TOWER BALANCER', width / 2, height / 2 - 40);

    textSize(20);
    fill(accentColor);
    text('クリックでアイスを落として積み上げろ！', width / 2, height / 2 + 20);

    fill(mainColor);
    text('左クリックでスタート！', width / 2, height / 2 + 80);

    if (mouse.presses()) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    boxes = [];
    score = 0;

    // 床の生成（★わざと画面より狭くして、落ちやすくする）
    ground = new Sprite(width / 2, height - 90, 400, 'triangle', 'static');
    ground.rotation = 180;
    ground.color = subColor;


}

function drawGame() {
    background(baseColor);

    // 1. クリックでブロックを生成（★落とす場所はマウスのX座標、高さは固定）
    if (mouse.presses()) {
        // 上空（y=50）から落とす

        let b = new Sprite(mouse.x, 100);
        b.img = cookieImg;
        b.scale = 0.1;
        b.diameter = 50;


        boxes.push(b);
        score++; // 積んだ数を増やす
    }

    // 2. スコアの表示
    textSize(30);
    textAlign(LEFT);
    fill(mainColor);
    text('SCORE: ' + score + ' 個', 10, 40);

    // 3. ゲームオーバー判定（どれか1つでも画面下に落ちたら終了）
    for (let i = 0; i < boxes.length; i++) {
        // 画面の下端（480）より下に落ちたら
        if (boxes[i].y > height + 20) {
            finalScore = score; // 最終スコアを保存
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
    fill(subColor);
    text('記録: ' + finalScore + ' 個', width / 2, height / 2 + 20);

    textSize(20);
    fill(mainColor);
    text('左クリックでタイトルへ', width / 2, height / 2 + 100);

    if (mouse.presses()) {
        initTitle();
        scene = 'title';
    }
}