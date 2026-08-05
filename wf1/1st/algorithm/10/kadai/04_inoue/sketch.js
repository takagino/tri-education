// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';


// 制限時間の定義
let gameTimeLimit = 20;

let baseColor = '#000831';
let mainColor = '#FFFFFF';
let subColor = '#f91818';
let accentColor = '#ffd500';
let subColor2 = '#0faf37';
let subColor3 = '#fdfeff';

let player;
let presents = [];
let surviveTime = 0
let score = 0;

let startFrame = 0;
let Presents_COUNT = 10; // 最初からいる敵の数

let playerImg;
let images = [];

let resultImg;

let fukidasiImg;


let dorobou;
let dorobouImg;


function preload() {
    playerImg = loadImage('./images/tonakai.png'); // 相対パスで画像を指定

    resultImg = loadImage('./images/santaclaus_red.png');
    fukidasiImg = loadImage('./images/fukidasi.png')

    images.push(loadImage('./images/kutsushita_christmas_knit_red.png'));
    images.push(loadImage('./images/ornament_ball_red.png'));
    images.push(loadImage('./images/present_christmas_gold_ribbon_red.png'));
    images.push(loadImage('./images/present_christmas_red_ribbon_green.png'));
    images.push(loadImage('./images/present_christmas_white_ribbon_green.png'));
    images.push(loadImage('./images/star_lightyellow.png'));
    images.push(loadImage('./images/tebukuro_christmas_knit_red_left.png'));
    images.push(loadImage('./images/boshi_christmas_knit_green.png'));
    images.push(loadImage('./images/candy_candycane_christmas.png'));
    images.push(loadImage('./images/cookie_gingercookie_snowman.png'));
    images.push(loadImage('./images/cake_buchedenoel.png'));
    images.push(loadImage('./images/cookie_gingercookie_christmaswreath_cocoa.png'));

    dorobouImg = loadImage('./images/character_monster_slime_purple.png');

}


function setup() {
    new Canvas(640, 480);
    world.gravity.y = 0; // ⭐️ トップダウンなので重力を「ゼロ」にする！
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'gameclear') {
        drawGameClear();
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
    text('Merry Christmas!', width / 2, height / 2 - 40);
    textSize(19);
    fill(mainColor);
    text('十字キー: 左右に移動', width / 2, height / 2 + 120);
    text('スペースキーでスタート！', width / 2, height / 2 + 150);
    textSize(17);
    fill(subColor2);
    text('サンタさんがクリスマスプレゼントを落としちゃった! 拾ってあげよう', width / 2, height / 2 + 10);
    text('20秒の間でどれだけ拾えるかな？？？', width / 2, height / 2 + 40);

    fill(subColor);
    text('🫟のモンスターに当たると減点！', width / 2, height / 2 + 70);




    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}

function initGame() {
    allSprites.removeAll();
    presents = [];
    score = 0;
    startFrame = frameCount;

    // プレイヤーの生成
    player = new Sprite(width / 2, 400, 50, 50);
    playerImg.resize(50, 50); // 画像をスプライトと同じ 30x30 にリサイズする
    player.image = playerImg

    // どろぼう
    dorobou = new Sprite(random(20, width - 20), random(20, height - 20), 30, 'kinematic');
    dorobouImg.resize(70, 70);
    dorobou.img = dorobouImg;
    dorobou.vel.x = random(1, 3);
    dorobou.vel.y = random(1, 3);

    // プレゼント
    for (let i = 0; i < Presents_COUNT; i++) {
        // プレイヤーから少し離れたランダムな場所に生成
        let p = new Sprite(random(20, width - 20), random(20, height - 20), 30, 'kinematic');
        p.img = random(images);
        p.scale = 0.11;
        p.vel.x = random(1, 4); // 上下左右にランダムなスピード
        p.vel.y = random(1, 4);
        presents.push(p);
    }
}

function drawGame() {
    background(baseColor);

    // 1. プレイヤーの操作（上下左右）＆ 画面から出ない制限
    if (kb.pressing('left') && player.x > 15) { player.x -= 5; }
    if (kb.pressing('right') && player.x < width - 15) { player.x += 5; }


    // 2. タイムの計算と表示
    let elapsedSec = floor((frameCount - startFrame) / 60);
    // 制限時間
    let remainingTime = max(0, gameTimeLimit - elapsedSec);
    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('TIME: ' + remainingTime + '秒', 10, 30);


    textSize(20);
    textAlign(LEFT);
    fill(mainColor);
    text('SCORE:' + score, 10, 60);

    if (remainingTime <= 0) {
        surviveTime = elapsedSec;
        initGameClear();
        scene = 'gameclear';
    }

    // 敵
    if (dorobou) {
        if (dorobou.x < 15 || dorobou.x > width - 15) { dorobou.vel.x *= -1; }
        if (dorobou.y < 15 || dorobou.y > height - 15) { dorobou.vel.y *= -1; }

        // ふれたら
        if (player.overlaps(dorobou)) {
            background(subColor)
            score--;

            dorobou.x = random(50, width - 50);
            dorobou.y = random(50, height - 50);
        }
    }

    // 3. 敵の当たり判定と壁の跳ね返り（※数は変わらないので普通のfor文でOK）
    for (let i = 0; i < presents.length; i++) {

        // 画面の端にぶつかったら跳ね返る（第5回の復習）
        if (presents[i].x < 15 || presents[i].x > width - 15) { presents[i].vel.x *= -1; }
        if (presents[i].y < 15 || presents[i].y > height - 15) { presents[i].vel.y *= -1; }

        // ふれたら
        if (player.overlaps(presents[i])) {
            presents[i].remove();
            score++;

            spawnPresent();
        }
    }



}
function initGameClear() {
    allSprites.removeAll();
}

function drawGameClear() {
    background(subColor3);

    textSize(50);
    textAlign(CENTER);
    fill(subColor2);
    text('GameClear!', width / 2, height / 2);


    textSize(20);
    fill(subColor2);
    text('拾えたプレゼントの数:' + score + '個', width / 2, height / 2 + 50)

    text('RANK: ' + getRank(score), width / 2, height / 2 + 100);


    textSize(20);
    fill(subColor);
    text('スペースキーでタイトルへ', width / 2, height / 2 + 200);


    imageMode(CENTER); // 画像の中心を基準に
    image(resultImg, width / 2 - 100, height / 2 - 90, 60, 60);

    imageMode(CENTER);
    image(fukidasiImg, width / 2 + 40, height / 2 - 140, 220, 80);
    textSize(20);
    fill('#000')
    text('ありがとう！', width / 2 + 40, height / 2 - 135);


    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}



function spawnPresent() {
    let p = new Sprite(random(20, width - 20), random(20, height - 20), 30, 'kinematic');
    p.img = random(images);
    p.scale = 0.11;
    p.vel.x = random(1, 4);
    p.vel.y = random(1, 4);
    presents.push(p);
}

function getRank(s) {

    if (s >= 40) {
        return 'S (優秀トナカイ)';
    } else if (s >= 25
    ) {
        return 'A (普通トナカイ)';
    } else if (s >= 20) {
        return 'B (新人トナカイ)';
    } else {
        return 'C(きみはトナカイ...?)';
    }
}
