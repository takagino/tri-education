// =========================================================
// グローバル変数・設定値
// =========================================================
let scene = 'title';

let baseColor = '#87cefa';
let mainColor = '#a0522d';
let subColor = '#ffffff';

let player;
let ground;
let bakudanImg;
let pinkImg;
let yellowImg;
let whiteImg;
let blueImg;

let housekiImgs = [];
let bombs;
let housekis;

let score = 0;
let timeLimit = 30; // 制限時間（30秒）
let startFrame = 0;

function preload() {
    bakudanImg = loadImage('./bakudan_chakka.png');
    pinkImg = loadImage('jewelry_round_pink.png');
    yellowImg = loadImage('jewelry_round_yellow.png');
    whiteImg = loadImage('jewelry_round_white.png');
    blueImg = loadImage('jewelry_round_lightblue.png');
}

function setup() {
    new Canvas(640, 905);
    world.gravity.y = 30;


    bakudanImg.resize(30, 30);
    pinkImg.resize(30, 30);
    blueImg.resize(30, 30);
    whiteImg.resize(30, 30);
    yellowImg.resize(30, 30);

    housekiImgs = [pinkImg, yellowImg, whiteImg, blueImg];


    initTitle();
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'result') {
        drawResult();
    }
}

function initTitle() {
    allSprites.removeAll();
}

function drawTitle() {
    background(baseColor);

    textAlign(CENTER, CENTER);
    fill('#000000');
    textSize(48);
    text('宝石拾いゲーム ', width / 2, height / 2 - 70
    );
    text('落ちてくる宝石を拾え', width / 2, height / 2 - 30);

    textSize(24);
    fill('#ffffff');
    text('スペースキーでスタート', width / 2, height / 2 + 60);

    // ゲームスタート
    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }
}


function initGame() {
    allSprites.removeAll();

    score = 0;
    startFrame = frameCount;


    bombs = new Group();
    housekis = new Group();

    player = new Sprite(30, 30, 30, 30);
    ground = new Sprite(width / 2, height - 10, 640, 40, 'static');
    ground.color = mainColor;


    ground.collides(bombs, (g, bomb) => bomb.remove());
    ground.collides(housekis, (g, houseki) => houseki.remove());

    player.overlaps(housekis, (p, houseki) => {
        score += 5;
        houseki.remove();
    });

    player.overlaps(bombs, (p, bomb) => {
        score -= 10;
        bomb.remove();
    });
}

function drawGame() {
    background(baseColor);


    let elapsedFrames = frameCount - startFrame;

    let remainingTime = timeLimit - floor(elapsedFrames / 60);


    if (remainingTime <= 0) {
        remainingTime = 0;
        initResult();
        scene = 'result';
        return;
    }


    if (elapsedFrames % 120 === 0) {
        let x = random(20, width - 20);
        let bomb = new bombs.Sprite(x, 0, 30, 30);
        bomb.image = bakudanImg;
    }


    if (elapsedFrames % 60 === 0) {
        let x = random(20, width - 20);
        let houseki = new housekis.Sprite(x, 0, 30, 30);
        houseki.image = random(housekiImgs);
    }


    if (kb.pressing('right') && player.x < 624) { player.x += 10; }
    if (kb.pressing('left') && player.x > 15) { player.x -= 10; }
    if (kb.pressing('up') && player.y > 15) { player.y -= 10; }
    if (kb.pressing('down') && player.y < 880) { player.y += 10; }


    textSize(24);
    fill('#000');
    textAlign(LEFT, TOP);
    text('SCORE: ' + score, 20, 20);
    text('TIME: ' + remainingTime, 20, 50);
}


function initResult() {

    allSprites.removeAll();
}

function drawResult() {
    background(baseColor);

    textAlign(CENTER, CENTER);

    textSize(40);
    fill('#ffffff');
    text('タイムアップ！', width / 2, height / 2 - 80);

    textSize(32);
    fill('#000000');
    text('スコア', width / 2, height / 2 - 20);

    textSize(64);
    fill('#ff4500');
    text(score + ' 点', width / 2, height / 2 + 50);

    textSize(20);
    fill('#ffffff');
    text('スペースキーでタイトルへ', width / 2, height / 2 + 130);

    if (kb.presses('space')) {
        initTitle();
        scene = 'title';
    }
}