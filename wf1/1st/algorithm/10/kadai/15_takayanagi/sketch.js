let scene = 'title';
let baseColor = '#90eefa';

let startFrame = 0;
let surviveTime = 0;
let life = 3;
let score = 0;

let player;
let coin;
let clearCoin = 10;
let goal;
let playerImg, enemyImg, coinImg, lifeImg, goalImg;
let enemy;
let enemies = [];
let coins = [];
let obstacles;
let ground;

function preload() {
    playerImg = loadImage('./images/player.png');
    enemyImg = loadImage('./images/enemy_1.png');
    coinImg = loadImage('./images/coin.png');
    lifeImg = loadImage('./images/life.png');
    goalImg = loadImage('./images/goal.png');
}

function setup() {
    new Canvas(640, 480);
    world.gravity.y = 10;
}

function draw() {
    if (scene == 'title') {
        drawTitle();
    } else if (scene == 'instruction') {
        drawInstruction();
    } else if (scene == 'game') {
        drawGame();
    } else if (scene == 'result') {
        drawResult();
    } else if (scene == 'clear') {
        drawClear();
    } else if (scene == 'gameover') {
        drawGameOver();
    }
}

function initTitle() {
    allSprites.removeAll();
}

// タイトル画面
function drawTitle() {
    background('#66ccff');

    textAlign(CENTER);

    textSize(20);
    fill('#003366');
    text('〜 姫を救うための 10個の金貨 〜', width / 2, height / 2 - 80);

    textSize(42);
    fill('#ffffff');
    text('コインと騎士の冒険記', width / 2, height / 2 - 20);

    textSize(24);
    fill('#ffff00');
    text('スペースキー を押してスタート！', width / 2, height / 2 + 60);

    textSize(18);
    fill('#003366');
    text('エンターキー であそびかたを見る', width / 2, height / 2 + 100);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }

    if (kb.presses('enter')) {
        scene = 'instruction';
    }
}

// あそびかた画面
function drawInstruction() {
    background('#b2fba5');

    textAlign(CENTER);
    textSize(36);
    fill('#006600');
    text('【 あそびかた 】', width / 2, 70);

    textSize(20);
    textAlign(LEFT);

    let leftX = width / 2 - 210;

    fill('#006600');
    text('■ ソウサホウホウ', leftX, 130);
    fill('#000000');
    textSize(18);
    text('・ 左右キー (← →) : いどう', leftX + 20, 165);
    text('・ スペースキー   : ジャンプ', leftX + 20, 195);

    textSize(20);
    fill('#006600');
    text('■ ルール', leftX, 250);
    fill('#000');
    textSize(18);
    text('・ コインを 10個 あつめよう！', leftX + 20, 285);
    text('・ 10個持った状態で 一番奥のゴール へ行こう！', leftX + 20, 315);
    text('・ てき や 穴 に気をつけてね！', leftX + 20, 345);

    textAlign(CENTER);
    textSize(22);
    fill('#cc0000');
    text('スペースを押すとゲームがはじまるよ！', width / 2, 410);

    textSize(16);
    fill('#006600');
    text('エンターキーでタイトルにもどる', width / 2, 440);

    if (kb.presses('space')) {
        initGame();
        scene = 'game';
    }

    if (kb.presses('enter')) {
        scene = 'title';
    }
}

// ゲームメイン
function initGame() {
    allSprites.removeAll();
    enemies = [];
    startFrame = frameCount;
    score = 0;

    player = new Sprite(width / 2, height / 2, 30, 30);
    playerImg.resize(30, 30);
    player.image = playerImg;
    player.rotationLock = true;
    player.scale = 1;

    ground = new Group();
    ground.collider = 'static';
    ground.color = 'green';

    new ground.Sprite(400, 380, 1000, 40);
    new ground.Sprite(1300, 380, 600, 40);
    new ground.Sprite(2000, 380, 500, 40);

    obstacles = new Group();
    obstacles.collider = 'static';
    obstacles.color = 'orange';

    new obstacles.Sprite(300, 340, 40, 40);
    new obstacles.Sprite(500, 320, 40, 80);
    new obstacles.Sprite(800, 340, 40, 40);
    new obstacles.Sprite(1200, 320, 40, 80);
    new obstacles.Sprite(1050, 340, 40, 40);
    new obstacles.Sprite(1450, 320, 40, 80);
    new obstacles.Sprite(1850, 340, 40, 40);
    new obstacles.Sprite(2100, 320, 40, 80);

    enemyImg.resize(30, 30);
    enemy = new Group();
    enemy.collider = "dynamic";
    enemy.rotationLock = true;
    enemy.friction = 0;
    enemy.image = enemyImg;

    let e1 = new enemy.Sprite(340, 330, 30, 30);
    e1.vel.x = -1.2;

    let e2 = new enemy.Sprite(550, 330, 30, 30);
    e2.vel.x = 1.2;

    let e3 = new enemy.Sprite(700, 330, 30, 30);
    e3.vel.x = 1.2;

    let e4 = new enemy.Sprite(1100, 330, 30, 30);
    e4.vel.x = -1.2;

    let e5 = new enemy.Sprite(1350, 330, 30, 30);
    e5.vel.x = 1.2;

    let e6 = new enemy.Sprite(1900, 330, 30, 30);
    e6.vel.x = -1.2;

    coinImg.resize(30, 30);
    coin = new Group();
    coin.collider = "none";
    coin.image = coinImg;

    new coin.Sprite(400, 340, 40, 40);
    new coin.Sprite(650, 200, 40, 40);
    new coin.Sprite(300, 280, 40, 40);
    new coin.Sprite(500, 240, 40, 40);
    new coin.Sprite(800, 280, 40, 40);
    new coin.Sprite(1120, 340, 40, 40);
    new coin.Sprite(1300, 220, 40, 40);
    new coin.Sprite(1450, 240, 40, 40);
    new coin.Sprite(1950, 340, 40, 40);
    new coin.Sprite(2100, 240, 40, 40);

    goalImg.resize(40, 80);
    goal = new Sprite(2150, 320, 40, 80);
    goal.collider = 'static';
    goal.image = goalImg;
}

function drawGame() {
    background(baseColor);
    let currentSec = floor((frameCount - startFrame) / 60);

    movePlayer();
    moveEnemy();

    player.overlaps(enemy, collectEnemy);
    player.overlaps(coin, collectCoin);
    player.overlaps(goal, reachGoal);

    camera.off();
    textSize(18);
    textAlign(LEFT);
    fill('#000');
    text('TIME: ' + currentSec, 15, 30);
    text('COIN: ' + score + ' / ' + clearCoin, 15, 55);
    camera.on();

    // 穴に落ちた時の処理
    if (player.y > 480) {
        life--;
        surviveTime = currentSec;

        if (life <= 0) {
            initGameOver();
            scene = 'gameover';
        } else {
            initResult();
            scene = 'result';
        }
    }
}

function moveEnemy() {
    for (let e of enemy) {
        if (e.collides(obstacles)) {
            if (e.vel.x > 0) {
                e.vel.x = -1.2;
            } else {
                e.vel.x = 1.2;
            }
        }

        if (abs(e.vel.x) < 0.8) {
            e.vel.x = (e.vel.x < 0) ? -1.2 : 1.2;
        }
    }
}

// 敵に当たった時の処理
function collectEnemy(player, touchedEnemy) {
    life--;
    surviveTime = floor((frameCount - startFrame) / 60);

    if (life <= 0) {
        initGameOver();
        scene = 'gameover';
    } else {
        initResult();
        scene = 'result';
    }
}

function collectCoin(player, touchedCoin) {
    touchedCoin.remove();
    score += 1;
}

// ゴール到達時の処理
function reachGoal(player, reachedGoal) {
    if (score >= clearCoin) {
        surviveTime = floor((frameCount - startFrame) / 60);
        allSprites.removeAll();
        scene = 'clear';
    }
}

function initResult() {
    allSprites.removeAll();
}

// ミス時の結果画面（RESULT）
function drawResult() {
    background(baseColor);
    camera.off();

    textAlign(CENTER);

    textSize(50);
    fill('#000');
    text('RESULT', width / 2, height / 2 - 50);

    textSize(24);
    fill('#cc0000');
    text('生存記録: ' + surviveTime + ' 秒', width / 2, height / 2);

    // ライフ表示
    imageMode(CENTER);
    lifeImg.resize(30, 30);
    for (let i = 0; i < life; i++) {
        let lifeX = (width / 2 - 40) + (i * 40);
        let lifeY = height / 2 + 45;
        image(lifeImg, lifeX, lifeY);
    }

    textSize(20);
    fill('#000');
    text('c : 続けてプレイ', width / 2, height / 2 + 100);
    text('enter : タイトルへ', width / 2, height / 2 + 130);

    if (kb.presses('c')) {
        initGame();
        scene = 'game';
    }

    if (kb.presses('enter')) {
        life = 3;
        initTitle();
        scene = 'title';
    }
}

// ゴール時のクリア画面（GAME CLEAR）
function drawClear() {
    background('#ffff66');

    textAlign(CENTER);

    textSize(50);
    fill('#ff0000');
    text('GAME CLEAR!!', width / 2, height / 2 - 80);

    textSize(22);
    fill('#000');
    text('お姫様を無事に救い出した！', width / 2, height / 2 - 30);

    textSize(28);
    fill('#0000cc');
    text('クリアタイム: ' + surviveTime + ' 秒', width / 2, height / 2 + 25);

    imageMode(CENTER);
    lifeImg.resize(30, 30);
    for (let i = 0; i < life; i++) {
        let lifeX = (width / 2 - 40) + (i * 40);
        let lifeY = height / 2 + 70;
        image(lifeImg, lifeX, lifeY);
    }

    textSize(20);
    fill('#000');
    text('c:続けてプレイ', width / 2, height / 2 + 130);
    text('enter:タイトルへ', width / 2, height / 2 + 160);

    if (kb.presses('c')) {
        initGame();
        scene = 'game';
    }

    if (kb.presses('enter')) {
        life = 3;
        initTitle();
        scene = 'title';
    }
}

function initGameOver() {
    allSprites.removeAll();
}

// ゲームオーバー画面
function drawGameOver() {
    background('#330000');

    textAlign(CENTER);

    textSize(50);
    fill('#ff3333');
    text('GAME OVER...', width / 2, height / 2 - 60);

    textSize(22);
    fill('#ffffff');
    text('お姫様を救うことができませんでした', width / 2, height / 2);

    textSize(26);
    fill('#ffff00');
    text('生存記録: ' + surviveTime + ' 秒', width / 2, height / 2 + 50);

    textSize(20);
    fill('#cccccc');
    text('エンターキーを押してタイトルへ', width / 2, height / 2 + 120);

    life = 3;

    if (kb.presses('enter')) {
        initTitle();
        scene = 'title';
    }
}

// プレイヤー移動
function movePlayer() {
    if (kb.pressing('right')) {
        player.x += 2;
    } else if (kb.pressing('left')) {
        player.x -= 2;
    } else {
        player.vel.x = 0;
    }

    if (kb.presses('space') && (player.colliding(ground) || player.colliding(obstacles))) {
        player.vel.y -= 6;
    }

    camera.x = player.x + 150;
}