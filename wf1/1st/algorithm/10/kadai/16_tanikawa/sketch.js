let scene = 'title';

let baseColor = '#00aeff';   // 背景色
let mainColor = '#ffffff';   // 通常の文字
let titleColer = '#ffb9e5'
let accentColor = '#fffa74';
let playerColor = '#C5956B';


let player;
let targets = []; // アイスを入れる配列


// ゲームのルール設定
let MAX_ICES = 10;     // 出現するICEの合計数
let spawnedCount = 0;  // 今までに何個出現したか
let pileCount = 0;// 何個積んだか

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
    fill(titleColer);
    text('アイスツミツミ', width / 2, height / 2 - 40);

    textSize(20);
    fill(accentColor);
    text('1個でも落としたらゲームオーバー！', width / 2, height / 2 + 20);

    fill(mainColor);
    text('左クリックでスタート！', width / 2, height / 2 + 80);

    if (mouse.presses()) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();

    // コーンの生成
    player = new Sprite(width / 2, 480, 50, 50, 'static');
    player.color = playerColor

    targets = [];
    spawnedCount = 0;
    pileCount = 0;

    // 10～30個の間でランダム
    MAX_ICES = floor(random(5, 30));
}

function drawGame() {
    background(baseColor);

    player.x = mouse.x;

    // 1. ICEが出現する（予定数に達するまで）
    if (spawnedCount < MAX_ICES) {
        if (random(0, 100) < 2) { // 約2%の確率で出現
            let t = new Sprite(random(50, width - 50), -20, 50);
            t.vel.y = random(2, 4);
            t.textSize = 25;

            // 下に向かって落ちてくる
            t.vel.y = random(1, 10);

            t.isCaught = false; // ★キャッチされたかどうかのフラグを追加

            targets.push(t);
            spawnedCount++; // 出現した数を1増やす
        }
    }

    // 2. 当たり判定と移動処理
    for (let i = targets.length - 1; i >= 0; i--) {
        let t = targets[i];

        // ▼ すでにキャッチされているアイスの処理 アイスを積む
        if (t.isCaught) {
            t.x = player.x;
            t.y = player.y - 30 - t.stackIndex * 35;
            continue;
        }


        // playerに触れたらキャッチ
        if (t.collides(player)) {
            t.isCaught = true;
            t.stackIndex = pileCount; // このアイスが何段目か
            t.vel.y = 0;
            t.collider = 'none';// もう当たり判定しない
            pileCount++;
        }
        // if (targets[i].collides(player)) {
        //     targets[i].remove();
        //     targets.splice(i, 1);
        //     pileCount++; // 積んだ数を1増やす
        //     continue;
        // }

        // 画面の下（480）に落ちたら、ゲームオーバー
        if (targets[i].y > height + 20) {
            initGameOver();
            scene = 'gameover';
            break; // ループを強制終了
        }
    }

    // 3. UI表示
    textSize(25); textAlign(LEFT); fill(mainColor);
    text('積んだ数: ' + pileCount + ' / ' + MAX_ICES, 10, 40);

    // 4. クリア判定（予定数をすべて積んだら）
    if (pileCount >= MAX_ICES) {
        initResult();
        scene = 'result';
    }
}

function initResult() {
    allSprites.removeAll();
}

function drawResult() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(mainColor);
    text('🥰', width / 2, height / 2 - 40);

    textSize(30);
    fill(accentColor);
    text('おいしい!!!!!', width / 2, height / 2 + 30);

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
    text('😭', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('アイスが落ちちゃった...', width / 2, height / 2 + 30);

    textSize(20);
    fill(mainColor);
    text('スペースキーでリトライ', width / 2, height / 2 + 110);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}