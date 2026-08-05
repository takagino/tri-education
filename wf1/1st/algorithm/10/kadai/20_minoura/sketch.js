let scene = 'title';
let baseColor = '#F4F1EA';
let mainColor = '#6B5E51';
let subColor = '#8A9A86';
let accentColor = '#D38C7D';

let player;
let ground;
let enemies = [];
let woman;
let score = 0;

let startFrame = 0;
let surviveTime = 0; // 生き残った記録（秒）を入れる箱

let thankYouTimer = 0; // メッセージを表示する残り時間（フレーム数）
let thankYouX = 0;     // メッセージを出す場所（横）
let thankYouY = 0;     // メッセージを出す場所（縦）
let thankYouMessage = ''; // 一番上の変数宣言のところに追加
let collectedMessages = '';

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
    textAlign(CENTER);
    fill(subColor);
    text('〜おばあちゃんを助けてお礼の言葉をもらおう〜', width / 2, height / 2 - 10);

    textSize(20);
    fill(mainColor);
    text('↑キー: ジャンプ / 左右キー: 移動', width / 2, height / 2 + 50);
    text('スペースキーでスタート！', width / 2, height / 2 + 100);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    enemies = [];
    startFrame = frameCount;
    score = 0;

    // 足場の生成（絶対に動かない static）
    // 即死を防ぐ足場
    ground = new Sprite(100, 450, 50, 50, 'static');
    ground = new Sprite(width / 2, 450, 50, 50, 'static');
    ground = new Sprite(width / 2 + 170, 450, 50, 50, 'static');
    groundA = new Sprite(150, 320, 50, 50, 'static');

    for (let b = 0; b < 5; b += 1) {
        groundB = new Sprite(random(200, 640), random(100, 480), 50, 50, 'static');
    }
    ground.color = mainColor;

    // プレイヤーの生成（重力を受けるので dynamic）
    player = new Sprite(100, height - 80, 40, 40);
    player.text = '🏃';
    player.textSize = 50;
    player.color = subColor;

    // おばあちゃんの生成
    woman = new Sprite(500, random(70, 400), 40, 40, 'static');
    woman.text = '🧑‍🦳';
    woman.textSize = 40;
    woman.color = subColor;

    thankYouTimer = 0;
    collectedMessages = [];
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
    if (kb.presses('up') && (player.colliding(ground) || player.colliding(groundA) || player.colliding(allSprites))) {
        player.vel.y = -8;
    }

    // 2. 敵が出現する（ランダム）
    if (random(0, 100) < 1) { // 約1%の確率で出現
        let randomY = random(50, 450); // 画面下半分のランダムな高さ
        let e = new Sprite(width + 20, randomY, 20, 20, 'kinematic');
        e.text = '🚗💨';
        e.textSize = 50;
        e.color = accentColor;
        e.vel.x = random(-4, -8); // 左に向かって進む
        enemies.push(e);
    }


    if (player.overlaps(woman)) {
        thankYouX = woman.x;
        thankYouY = woman.y;
        thankYouTimer = 90;       // メッセージを表示する長さ（90フレーム＝約1.5秒）
        thankYouMessage = random(['ありがとう', 'さすがだね', 'また頼むよ', 'ヒーローだね'])

        collectedMessages.push(thankYouMessage);

        woman.x = random(30, 610);
        woman.y = random(30, 420);
        score += 1;
    }

    // 3. タイムの計算と表示（カウントアップ）
    let currentSec = floor((frameCount - startFrame) / 60);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + currentSec + '秒', 10, 30);

    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('HELPED GRANDMA:' + score, 10, 60);

    // 4. 敵の当たり判定と消去（★逆順ループ）
    for (let i = enemies.length - 1; i >= 0; i--) {
        // 画面外（左端）に出たら配列から消す
        if (enemies[i].x < -20) {
            enemies[i].remove();
            enemies.splice(i, 1); // ⭐️重要：配列からも削除する
            continue;
        }

        // プレイヤーに触れたらゲームオーバー（記録を保存して画面移動）
        if (player.overlaps(enemies[i]) || (player.y > height)) {
            surviveTime = currentSec; // やられた瞬間のタイムを記録
            initGameOver();
            scene = 'gameover';
            break;
        }
    }

    // ★ お礼メッセージの描画とカウントダウン処理
    if (thankYouTimer > 0) {
        textSize(20);
        textAlign(CENTER);
        fill(accentColor); // ピンク・赤系のアクセントカラーで目立たせる
        text(thankYouMessage, thankYouX, thankYouY);

        thankYouTimer -= 1; // 1フレームごとにタイマーを1減らす
    }

}

function initGameOver() {
    allSprites.removeAll();
}

function drawGameOver() {
    background(baseColor);

    textSize(100);
    textAlign(CENTER);
    fill(mainColor);
    if (score < 5) {
        text('😢', width / 2, height / 2 - 100);
    } else if (score < 10) {
        text('😑', width / 2, height / 2 - 100);
    } else {
        text('😎', width / 2, height / 2 - 100);
    }



    textSize(50);
    textAlign(CENTER);
    fill(accentColor);
    text('GAME OVER...', width / 2, height / 2 - 40);

    textSize(30);
    fill(mainColor);
    text('生存記録: ' + surviveTime + '秒', width / 2, height / 2 + 20); // 記録を発表！

    textSize(30);
    fill(mainColor);
    text('助けたおばあちゃん: ' + score + '人', width / 2, height / 2 + 70); // 記録を発表！

    // 貰ったお礼一覧
    textSize(20);
    textAlign(CENTER);

    let allWords = ['ありがとう', 'さすがだね', 'また頼むよ', 'ヒーローだね'];

    // 4つの言葉をループで順番にチェックして横並びで表示する
    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];

        if (collectedMessages.includes(word)) {
            fill('#ef3e3e');
        } else {
            fill('#dedede');
        }
        let xPos = (width / 2 - 180) + (i * 120);
        text(word, xPos, height / 2 + 130);
    }


    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 180);


    // タイトルへ戻る（もう一度遊べる）
    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}