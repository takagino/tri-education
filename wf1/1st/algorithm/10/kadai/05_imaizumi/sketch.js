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
let heals = [];
let lives = 3;

let startFrame = 0;
let surviveTime = 0; // 生き残った記録（秒）を入れる箱

let playerImg, monsterImg, portionImg;

function preload() {
    playerImg = loadImage('./image/character_kishi_man_01_blue_black.png');
    monsterImg = loadImage('./image/character_monster_ghost_white.png');
    portionImg = loadImage('./image/portion_01_red.png');
}

function setup() {
    new Canvas(640, 480);
    world.gravity.y = 10; // 下向きの重力を設定
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'endless') {
        drawEndless();
    } else if (scene == 'game1') {
        drawGame1();
    } else if (scene == 'game2') {
        drawGame2();
    } else if (scene == 'game3') {
        drawGame3();
    } else if (scene == 'game4') {
        drawGame4();
    } else if (scene == 'gameover1') {
        drawGameOver1();
    } else if (scene == 'gameover2') {
        drawGameOver2();
    } else if (scene == 'gameover3') {
        drawGameOver3();
    } else if (scene == 'gameover4') {
        drawGameOver4();
    } else if (scene == 'clear1') {
        drawClear1();
    } else if (scene == 'clear2') {
        drawClear2();
    } else if (scene == 'clear3') {
        drawClear3();
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

    textSize(50);
    textAlign(CENTER);
    fill(subColor);
    text('JUMP SURVIVAL', width / 2, height / 2 - 40);

    textSize(20);
    fill(mainColor);
    text('最初に残機❤️が3つ与えられる', width / 2, height / 2 + 40);
    text('残機が0の状態で敵に当たってしまうとゲームオーバー！', width / 2, height / 2 + 70);
    textSize(15);
    text('※ポーションをとると回復できる！', width / 2, height / 2 + 90);
    textSize(20);
    text('難易度1️⃣2️⃣3️⃣', width / 2, height - 60);
    textSize(15);
    text('それぞれの数字キーを押してスタート！', width / 2, height - 20);

    if (kb.presses('1')) {
        initGame();
        scene = 'game1';
    }

    if (kb.presses('2')) {
        initGame();
        scene = 'game2';
    }

    if (kb.presses('3')) {
        initGame();
        scene = 'game3';
    }

    if (kb.presses('0')) {
        initTitle();
        scene = 'endless';
    }
}

function drawEndless() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(subColor);
    text('JUMP SURVIVAL', width / 2, height / 2 - 40);
    textSize(20)
    text('~ENDLESS MODE~', width / 2, height / 2 - 10);

    textSize(25);
    fill(mainColor);
    text('無限に迫り来る敵を避け続けろ', width / 2, height / 2 + 80);
    textSize(15);
    text('スペースを押してスタート！', width / 2, height - 20);

    if (kb.presses('space')) {
        initGame();
        scene = 'game4';
    }
}

function initGame() {
    allSprites.removeAll();
    enemies = [];
    heals = [];
    lives = 3;
    startFrame = frameCount;

    // 足場の生成（絶対に動かない static）
    ground = new Sprite(width / 2, height - 20, width, 40, 'static');
    ground.color = mainColor;

    // プレイヤーの生成（重力を受けるので dynamic）
    player = new Sprite(width / 2, height - 80, 40, 40);
    playerImg.resize(40, 40);
    player.image = playerImg;
}

// level1
function drawGame1() {
    background(baseColor);

    // 1. プレイヤーの操作（移動とジャンプ、急降下）
    if (kb.pressing('left') && player.x > 20) {
        player.x -= 4;
    }
    if (kb.pressing('right') && player.x < width - 20) {
        player.x += 4;
    }
    if (kb.presses('space') && player.colliding(ground)) {
        player.vel.y = -8;
    }
    if (kb.presses('shift')) {
        player.vel.y = +10;
    }

    // 2. 敵,回復アイテムが出現する（ランダム）
    if (random(0, 100) < 3) { // 約3%の確率で出現
        let randomY = random(height / 2, height - 60); // 画面下半分のランダムな高さ

        //左右どちらから出現するかランダム
        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(-1, -8); // 左に向かって進む
            enemies.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(1, 8); // 右に向かって進む
            enemies.push(e);
        }
    }

    if (random(0, 100) < 0.6) {
        let randomY = random(height / 2, height - 60);

        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = -1; // 左に向かって進む
            heals.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = 1; // 右に向かって進む
            heals.push(e);
        }
    }

    // 3. タイムの計算と表示（カウントアップ）
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);
    text('❤️×' + lives, 10, 55);

    // 30秒生き残ったらクリア
    if (currentSec >= 30) {
        surviveTime = currentSec;
        initGameOver();
        scene = 'clear1';
        return;
    }

    // 4. 敵の当たり判定と消去（★逆順ループ）
    for (let i = enemies.length - 1; i >= 0; i--) {
        // 画面外（左端）に出たら配列から消す
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1); // ⭐️重要：配列からも削除する
            continue;
        }

        // プレイヤー3回に触れたらゲームオーバー（記録を保存して画面移動）
        if (player.overlaps(enemies[i])) {

            lives--; //残機を減らす

            enemies[i].remove();
            enemies.splice(i, 1);
            if (lives < 0) {
                surviveTime = currentSec; // やられた瞬間のタイムを記録！
                initGameOver();
                scene = 'gameover1';
                break;
            }
        }
    }

    // 5. 回復アイテムの当たり判定
    for (let i = heals.length - 1; i >= 0; i--) {

        // 画面外に出たら削除
        if (heals[i].x < -20) {
            heals[i].remove();
            heals.splice(i, 1);
            continue;
        }

        // プレイヤーが触れたら
        if (player.overlaps(heals[i])) {

            // 残機を1回復
            lives++;

            // 最大3まで
            if (lives > 3) {
                lives = 3;
            }

            // 回復アイテムを消す
            heals[i].remove();
            heals.splice(i, 1);
        }
    }

    if (kb.presses('escape')) {
        initTitle();
        scene = 'title';
    }
}

//level2
function drawGame2() {
    background(baseColor);

    // 1. プレイヤーの操作（移動とジャンプ）
    if (kb.pressing('left') && player.x > 20) {
        player.x -= 4;
    }
    if (kb.pressing('right') && player.x < width - 20) {
        player.x += 4;
    }
    if (kb.presses('space') && player.colliding(ground)) {
        player.vel.y = -8;
    }
    if (kb.presses('shift')) {
        player.vel.y = +10;
    }

    // 2. 敵と回復アイテムが出現する（ランダム）
    if (random(0, 100) < 3) { // 約3%の確率で出現
        let randomY = random(height / 2, height - 60); // 画面下半分のランダムな高さ
        //左右どちらから出現するかランダム
        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(-2, -5); // 左に向かって進む
            enemies.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(2, 5); // 右に向かって進む
            enemies.push(e);
        }
    }

    if (random(0, 100) < 0.3) {
        let randomY = random(height / 2, height - 60);

        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = -1; // 左に向かって進む
            heals.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = 1; // 右に向かって進む
            heals.push(e);
        }
    }

    // 3. タイムの計算と表示（カウントアップ）
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);
    text('❤️×' + lives, 10, 55);

    // 30秒生き残ったらクリア
    if (currentSec >= 30) {
        surviveTime = currentSec;
        initGameOver();
        scene = 'clear2';
        return;
    }

    // 4. 敵の当たり判定と消去（★逆順ループ）
    for (let i = enemies.length - 1; i >= 0; i--) {
        // 画面外（左端）に出たら配列から消す
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1); // ⭐️重要：配列からも削除する
            continue;
        }

        // プレイヤー3回に触れたらゲームオーバー（記録を保存して画面移動）
        if (player.overlaps(enemies[i])) {

            lives--; //残機を減らす

            enemies[i].remove();
            enemies.splice(i, 1);
            if (lives < 0) {
                surviveTime = currentSec; // やられた瞬間のタイムを記録！
                initGameOver();
                scene = 'gameover2';
                break;
            }
        }
    }

    // 5. 回復アイテムの当たり判定
    for (let i = heals.length - 1; i >= 0; i--) {

        // 画面外に出たら削除
        if (heals[i].x < -20) {
            heals[i].remove();
            heals.splice(i, 1);
            continue;
        }

        // プレイヤーが触れたら
        if (player.overlaps(heals[i])) {

            // 残機を1回復
            lives++;

            // 最大3まで
            if (lives > 3) {
                lives = 3;
            }

            // 回復アイテムを消す
            heals[i].remove();
            heals.splice(i, 1);
        }
    }

    if (kb.presses('escape')) {
        initTitle();
        scene = 'title';
    }
}


//level3
function drawGame3() {
    background(baseColor);

    // 1. プレイヤーの操作（移動とジャンプ）
    if (kb.pressing('left') && player.x > 20) {
        player.x -= 4;
    }
    if (kb.pressing('right') && player.x < width - 20) {
        player.x += 4;
    }
    if (kb.presses('space') && player.colliding(ground)) {
        player.vel.y = -8;
    }
    if (kb.presses('shift')) {
        player.vel.y = +10;
    }

    // 2. 敵と回復アイテムが出現する（ランダム）
    if (random(0, 100) < 3) { // 約3%の確率で出現
        let randomY = random(height / 2, height - 60); // 画面下半分のランダムな高さ
        //左右どちらから出現するかランダム
        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(-4, -8); // 左に向かって進む
            enemies.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(4, 8); // 右に向かって進む
            enemies.push(e);
        }
    }

    if (random(0, 100) < 0.1) {
        let randomY = random(height / 2, height - 60);

        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = -1; // 左に向かって進む
            heals.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = 1; // 右に向かって進む
            heals.push(e);
        }
    }

    // 3. タイムの計算と表示（カウントアップ）
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);
    text('❤️×' + lives, 10, 55);

    // 30秒生き残ったらクリア
    if (currentSec >= 30) {
        surviveTime = currentSec;
        initGameOver();
        scene = 'clear3';
        return;
    }

    // 4. 敵の当たり判定と消去（★逆順ループ）
    for (let i = enemies.length - 1; i >= 0; i--) {
        // 画面外（左端）に出たら配列から消す
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1); // ⭐️重要：配列からも削除する
            continue;
        }

        // プレイヤー3回に触れたらゲームオーバー（記録を保存して画面移動）
        if (player.overlaps(enemies[i])) {

            lives--; //残機を減らす

            enemies[i].remove();
            enemies.splice(i, 1);
            if (lives < 0) {
                surviveTime = currentSec; // やられた瞬間のタイムを記録！
                initGameOver();
                scene = 'gameover3';
                break;
            }
        }
    }

    // 5. 回復アイテムの当たり判定
    for (let i = heals.length - 1; i >= 0; i--) {

        // 画面外に出たら削除
        if (heals[i].x < -20) {
            heals[i].remove();
            heals.splice(i, 1);
            continue;
        }

        // プレイヤーが触れたら
        if (player.overlaps(heals[i])) {

            // 残機を1回復
            lives++;

            // 最大3まで
            if (lives > 3) {
                lives = 3;
            }

            // 回復アイテムを消す
            heals[i].remove();
            heals.splice(i, 1);
        }
    }

    if (kb.presses('escape')) {
        initTitle();
        scene = 'title';
    }
}

//エンドレス
function drawGame4() {
    background(baseColor);

    // 1. プレイヤーの操作（移動とジャンプ）
    if (kb.pressing('left') && player.x > 20) {
        player.x -= 4;
    }
    if (kb.pressing('right') && player.x < width - 20) {
        player.x += 4;
    }
    if (kb.presses('space') && player.colliding(ground)) {
        player.vel.y = -8;
    }
    if (kb.presses('shift')) {
        player.vel.y = +10;
    }

    // 2. 敵と回復アイテムが出現する（ランダム）
    if (random(0, 100) < 3) { // 約3%の確率で出現
        let randomY = random(height / 2, height - 60); // 画面下半分のランダムな高さ
        //左右どちらから出現するかランダム
        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(-4, -8); // 左に向かって進む
            enemies.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            monsterImg.resize(20, 20);
            e.image = monsterImg;
            e.vel.x = random(4, 8); // 右に向かって進む
            enemies.push(e);
        }
    }

    if (random(0, 100) < 0.3) {
        let randomY = random(height / 2, height - 60);

        if (random(1) < 0.5) {
            let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = -1; // 左に向かって進む
            heals.push(e);
        } else {
            let e = new Sprite(-20, randomY, 20, 20, 'kinematic');
            portionImg.resize(20, 20);
            e.image = portionImg;
            e.vel.x = 1; // 右に向かって進む
            heals.push(e);
        }
    }

    // 3. タイムの計算と表示（カウントアップ）
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);
    text('❤️×' + lives, 10, 55);

    // 4. 敵の当たり判定と消去（★逆順ループ）
    for (let i = enemies.length - 1; i >= 0; i--) {
        // 画面外（左端）に出たら配列から消す
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1); // ⭐️重要：配列からも削除する
            continue;
        }

        // プレイヤー3回に触れたらゲームオーバー（記録を保存して画面移動）
        if (player.overlaps(enemies[i])) {

            lives--; //残機を減らす

            enemies[i].remove();
            enemies.splice(i, 1);
            if (lives < 0) {
                surviveTime = currentSec; // やられた瞬間のタイムを記録！
                initGameOver();
                scene = 'gameover4';
                break;
            }
        }
    }

    // 5. 回復アイテムの当たり判定
    for (let i = heals.length - 1; i >= 0; i--) {

        // 画面外に出たら削除
        if (heals[i].x < -20) {
            heals[i].remove();
            heals.splice(i, 1);
            continue;
        }

        // プレイヤーが触れたら
        if (player.overlaps(heals[i])) {

            // 残機を1回復
            lives++;

            // 最大3まで
            if (lives > 3) {
                lives = 3;
            }

            // 回復アイテムを消す
            heals[i].remove();
            heals.splice(i, 1);
        }
    }

    if (kb.presses('escape')) {
        initTitle();
        scene = 'title';
    }
}


function initGameOver() {
    allSprites.removeAll();
}

function drawGameOver1() {
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
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game1';
    }

    // タイトルへ戻る（もう一度遊べる）
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function drawGameOver2() {
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
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game2';
    }

    // タイトルへ戻る（もう一度遊べる）
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function drawGameOver3() {
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
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game3';
    }

    // タイトルへ戻る（もう一度遊べる）
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function drawGameOver4() {
    background(baseColor);

    textSize(50);
    fill(mainColor);
    textAlign(CENTER);
    text('生存記録: ' + surviveTime + '秒', width / 2, height / 2 + 20); // 記録を発表！

    textSize(20);
    fill(subColor);
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game4';
    }


    // タイトルへ戻る（もう一度遊べる）
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function drawClear1() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(subColor);
    text('CLEAR!!', width / 2, height / 2 - 40);

    textSize(20);
    fill(subColor);
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game1';
    }

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function drawClear2() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(subColor);
    text('CLEAR!!', width / 2, height / 2 - 40);

    textSize(20);
    fill(subColor);
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game2';
    }

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}

function drawClear3() {
    background(baseColor);

    textSize(50);
    textAlign(CENTER);
    fill(subColor);
    text('CLEAR!!', width / 2, height / 2 - 40);
    text('殿堂入り！', width / 2 + 10, height / 2 + 10);
    textSize(10);
    text('隠しコマンド0️⃣', width - 100, height - 20);
    text('隠しコマンドをタイトル画面で押すと...?', width - 100, height - 10);

    textSize(20);
    fill(subColor);
    text('Rキーでリトライ', width / 2, height / 2 + 80);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 100);

    if (kb.presses('r')) {
        initGame();
        scene = 'game3';
    }

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}
