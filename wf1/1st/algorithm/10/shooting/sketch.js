// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';

let baseColor = '#2C3E50';   // 背景色（ダークスレートブルー）
let mainColor = '#ECF0F1';   // 通常の文字（白/ライトグレー）
let subColor = '#F1C40F';    // タイトル・クリア時の強調（イエロー）
let accentColor = '#E74C3C'; // 敵・ゲームオーバー・警告（レッド）

let targets = []; // 的（UFO）を入れる配列

// ゲームのルール設定
let MAX_UFOS = 10;     // 出現するUFOの合計数
let spawnedCount = 0;  // 今までに何機出現したか
let destroyedCount = 0;// 何機撃ち落としたか

function setup() {
    new Canvas(640, 480);
    world.gravity.y = 0; // 重力ゼロ
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
function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textSize(40);
    textAlign(CENTER);
    fill(subColor);
    text('UFO DEFENSE', width / 2, height / 2 - 40);

    textSize(20);
    fill(accentColor);
    text('1機でも逃がしたら即ゲームオーバー！', width / 2, height / 2 + 20);

    fill(mainColor);
    text('左クリックでスタート！', width / 2, height / 2 + 80);

    if (mouse.presses()) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    targets = [];
    spawnedCount = 0;
    destroyedCount = 0;
}

function drawGame() {
    background(baseColor);

    // 1. UFOが出現する（予定数に達するまで）
    if (spawnedCount < MAX_UFOS) {
        if (random(0, 100) < 3) { // 約3%の確率で出現
            let t = new Sprite(random(50, width - 50), -20, 40, 40, 'kinematic');
            t.color = accentColor;
            t.text = '🛸';
            t.textSize = 25;

            // 下に向かって落ちてくる（横にも少し揺れる）
            t.vel.y = random(2, 4);
            t.vel.x = random(-1, 1);

            targets.push(t);
            spawnedCount++; // 出現した数を1増やす
        }
    }

    // 2. 当たり判定と逃走判定（★逆順ループ）
    for (let i = targets.length - 1; i >= 0; i--) {

        // マウスでクリックされたら撃破！
        if (targets[i].mouse.presses()) {
            targets[i].remove();
            targets.splice(i, 1);
            destroyedCount++; // 撃破数を1増やす
            continue;
        }

        // 画面の下（480）に逃げられたら、防衛失敗（ゲームオーバー）！
        if (targets[i].y > height + 20) {
            initGameOver();
            scene = 'gameover';
            break; // ループを強制終了
        }
    }

    // 3. UI表示
    textSize(25); textAlign(LEFT); fill(mainColor);
    text('撃破数: ' + destroyedCount + ' / ' + MAX_UFOS, 10, 40);

    // 4. クリア判定（予定数をすべて撃ち落としたら）
    if (destroyedCount >= MAX_UFOS) {
        initResult();
        scene = 'result';
    }
}

function initResult() { allSprites.removeAll(); }
function drawResult() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(subColor);
    text('PERFECT DEFENSE!!', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('地球の平和は守られた！', width / 2, height / 2 + 30);

    textSize(20);
    fill(mainColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 110);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
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
    text('INVASION...', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('地球は侵略された', width / 2, height / 2 + 30);

    textSize(20);
    fill(mainColor);
    text('スペースキーでリトライ', width / 2, height / 2 + 110);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}