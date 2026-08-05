let scene = "title";
let playerImg, monsterImg;
let baseColor = "rgb(242, 227, 180)";
let mainColor = "rgb(255, 156, 43)";
let gameoverColor = "rgb(167, 167, 167)"
let startFrame = 0;
let grounds;
let thorn;
let goal;
let enemy;
let balls;
let grounds2;
let grounds3;


function preload() {
  playerImg = loadImage("./image/cat_tanmo_tobimike.png");
  thornImg = loadImage("./image/thorn.svg");
  goalImg = loadImage("./image/fish.svg");
}

function setup() {
  new Canvas(640, 480);
  world.gravity.y = 15;


}

function draw() {
  if (scene === "title") {
    drawTitle();
  } else if (scene === "game") {
    drawGame();
  } else if (scene === "result") {
    drawResult();
  } else if (scene === "gameover") {
    drawGameOver();
  } else if (scene === "nextstage") {
    drawNextStage();
  } else if (scene === "gameover2") {
    drawGameOver2();
  } else if (scene === "title2") {
    drawTitle2();
  } else if (scene === "result2") {
    drawResult2();
  }

  if (kb.pressing('left') && player.x > 15) {
    player.x = player.x - 5;
  }
  if (kb.pressing('right') && player.x < 625) {
    player.x = player.x + 5;
  }

  if (kb.presses('up') && player.colliding(grounds) && player.y > 10) {
    player.vel.y = - 8.5;
  }
  if (kb.pressing('down')) {
    player.y = player.y + 5;
  }

}

function initTitle() {
  allSprites.removeAll();
  startFrame = frameCount;
}

function drawTitle() {
  background(baseColor);


  textSize(20)
  fill("black")
  textAlign("center");
  text("スペースを押してスタート", width / 2, height / 2 - 160);
  text("▲：ジャンプ", width / 2, height / 2 - 40);
  text("◀︎ ▶︎:移動", width / 2, height / 2);
  text("🐟がゴール", width / 2, height / 2 + 100);

  text("ボール・棘に当たる❌", width / 2, height / 2 + 140)
  text("下に落ちる❌", width / 2, height / 2 + 180)

  textSize(30)
  fill("blue")
  text("操作方法", width / 2, height / 2 - 80);
  text("ルール", width / 2, height / 2 + 60)





  if (kb.presses("space")) {
    initGame();
    scene = "game";
  }


}

function initTitle2() {
  allSprites.removeAll();
}
function drawTitle2() {
  background(baseColor);


  textSize(20)
  fill("black")
  textAlign("center");
  text("1：ステージ1", width / 2, height / 2 - 170)
  text("2：ステージ2", width / 2, height / 2 - 150)
  text("▲：ジャンプ", width / 2, height / 2 - 40);
  text("◀︎ ▶︎:移動", width / 2, height / 2);
  text("🐟がゴール", width / 2, height / 2 + 100);

  text("ボール・棘に当たる❌", width / 2, height / 2 + 140)
  text("下に落ちる❌", width / 2, height / 2 + 180)

  textSize(30)
  fill("blue")
  text("操作方法", width / 2, height / 2 - 80);
  text("ルール", width / 2, height / 2 + 60)


  if (kb.presses("1")) {
    initGame();
    scene = "game"
  }
  if (kb.presses("2")) {
    initNextStage();
    scene = "nextstage"
  }
}

function initGame() {
  allSprites.removeAll();
  startFrame = frameCount;

  player = new Sprite(120, 450, 30, 30);
  playerImg.resize(30, 30);
  player.rotationLock = true;  //プレイヤーを回転させない
  player.image = playerImg;

  thorn = new Group();
  thornImg.resize(30, 30);
  thorn.image = thornImg;

  new thorn.Sprite(400, 325, 30, 30, "kinematic");
  new thorn.Sprite(300, 75, 30, 30, "static")

  goal = new Sprite(50, 70, 30, 30, "static");
  goalImg.resize(0, 30);
  goal.image = goalImg;

  grounds = new Group();
  grounds.collider = "static";
  grounds.color = mainColor;
  new grounds.Sprite(100, 470, 200, 20); //一番下　左
  new grounds.Sprite(470, 470, 340, 20); //一番下　右
  new grounds.Sprite(275, 350, 550, 20); //２段目
  new grounds.Sprite(75, 230, 150, 20); //３段目　左
  new grounds.Sprite(470, 230, 340, 20); //３段目　右
  new grounds.Sprite(275, 100, 550, 20); //４段目

  balls = new Group();
  balls.collider = "kinematic";
  balls.color = "red";
}

function drawGame() {


  background(baseColor);


  // タイムの計算
  textSize(20)
  fill("black")
  let currentSec = floor((frameCount - startFrame) / 60);
  text("TIME:", 30, 30)
  text(currentSec, 70, 30)

  // ゲームオーバー
  if (player.colliding(thorn) || player.y > 490 || player.colliding(balls)) {
    initGameOver();
    scene = "gameover"
  }

  if (player.colliding(goal)) {
    initResult();
    scene = "result"
  }

  // クリア
  if (false) {
    initResult();
    scene = "result";
  }

  //  if (frameCount % 60 === 0) {
  //     let ball = new Sprite(-20, 250, 20, "dynamic");
  //     ball.vel.x = 5;
  // }

  if ((frameCount - startFrame) % 120 === 0) {
    let ball = new balls.Sprite(-20, 290, 30);
    ball.vel.x = 5;
  }

  if ((frameCount - startFrame) % 100 === 0) {
    let ball = new balls.Sprite(250, height + 20, 30);

    ball.vel.y = -5;
  }


  if (player.y <= 204 && player.x >= 385) {
    thorn.vel.y = -12;
  }

}

// ---------- クリア（結果）画面の処理 ----------
function initResult() {
  allSprites.removeAll();
}

function drawResult() {
  background(baseColor);

  // タイトルへ戻る
  if (kb.presses("t")) {
    initTitle();
    scene = "title";
  }

  if (kb.presses("n")) {
    initNextStage();
    scene = "nextstage";
  }

  if (kb.presses("r")) {
    initGame();
    scene = "game"
  }

  background("white")

  textSize(40)
  fill("gold")
  text("CREAR", width / 2, height / 2)


  textSize(25)
  fill("black")
  text("t:タイトルに戻る", width / 2, height / 2 + 60);
  text("r:もう一度やる", width / 2, height / 2 + 120)
  text("n:次のステージへ", width / 2, height / 2 + 180);


}

function initResult2() {
  allSprites.removeAll();
}

function drawResult2() {
  background(baseColor);

  // タイトルへ戻る
  if (kb.presses("t")) {
    initTitle2();
    scene = "title2";
  }

  if (kb.presses("r")) {
    initNextStage();
    scene = "nextstage";
  }


  background("white")

  textSize(40)
  fill("gold")
  text("CREAR", width / 2, height / 2)


  textSize(25)
  fill("black")
  text("t:タイトルに戻る", width / 2, height / 2 + 60);
  text("r:もう一度やる", width / 2, height / 2 + 120)


}



// ---------- ゲームオーバー画面の処理 ----------
function initGameOver() {
  allSprites.removeAll();

}

function drawGameOver() {
  background(gameoverColor);

  textSize(40);
  textAlign("center");

  fill("white")
  text("GAME", width / 2 - 60, height / 2);

  fill("red")
  text("OVER", width / 2 + 60, height / 2);


  textSize(25)
  fill("black")
  text("t：タイトルに戻る", width / 2, height / 2 + 60)
  text("c：もう一度やり直す", width / 2, height / 2 + 100)


  // タイトルへ戻る
  if (kb.presses("t")) {
    initTitle();
    scene = "title";
  } else if (kb.presses("c")) {
    initGame();
    scene = "game";
  }


}

function initNextStage() {
  allSprites.removeAll();

  startFrame = frameCount;

  player = new Sprite(120, 450, 30, 30);
  playerImg.resize(30, 30);
  player.rotationLock = true;  //プレイヤーを回転させない
  player.image = playerImg;

  thorn = new Group();
  thornImg.resize(30, 30);
  thorn.image = thornImg;

  new thorn.Sprite(400, 325, 30, 30, "static");
  new thorn.Sprite(425, 325, 30, 30, "static");
  new thorn.Sprite(300, 75, 30, 30, "static");
  new thorn.Sprite(15, 325, 30, 30, "static");
  new thorn.Sprite(45, 325, 30, 30, "static");
  new thorn.Sprite(75, 325, 30, 30, "static");
  new thorn.Sprite(105, 325, 30, 30, "static");
  new thorn.Sprite(135, 325, 30, 30, "static");

  goal = new Sprite(600, 70, 30, 30, "static");
  goalImg.resize(0, 30);
  goal.image = goalImg;

  grounds = new Group();
  grounds.collider = "static";
  grounds.color = "green";
  new grounds.Sprite(100, 470, 200, 20); //一番下　左
  new grounds.Sprite(470, 470, 340, 20); //一番下　右
  new grounds.Sprite(275, 350, 550, 20); //２段目

  new grounds.Sprite(470, 230, 340, 20); //３段目　右
  new grounds.Sprite(540, 100, 280, 20); //４段目


  grounds2 = new Sprite(75, 230, 150, 20, "kinematic"); //３段目　左
  grounds2.color = "green"

  grounds3 = new Sprite(250, 100, 300, 20, "kinematic")
  grounds3.color = "green"

  balls = new Group();
  balls.collider = "kinematic";
  balls.color = "red";
}

function drawNextStage() {
  if (player.colliding(thorn) || player.y > 490 || player.colliding(balls)) {
    initGameOver2();
    scene = "gameover2"

  }

  if (player.colliding(goal)) {
    initResult2();
    scene = "result2"
  }



  // クリア
  if (false) {
    initResult();
    scene = "result";
  }

  background("skyblue");

  if ((frameCount - startFrame) % 120 === 0) {
    let ball = new balls.Sprite(-20, 290, 30);
    ball.vel.x = 5;
  }
  if (player.colliding(grounds2)) {
    grounds2.vel.y = +8;
    grounds3.vel.x = -1;

  }

  if ((frameCount - startFrame) % 120 === 0) {
    let ball = new balls.Sprite(650, 400, 30);
    ball.vel.x = -5;
  }



}

function initGameOver2() {
  allSprites.removeAll();

}

function drawGameOver2() {
  background(gameoverColor);

  textSize(40);
  textAlign("center");

  fill("white")
  text("GAME", width / 2 - 60, height / 2);

  fill("red")
  text("OVER", width / 2 + 60, height / 2);


  textSize(25)
  fill("black")
  text("t：タイトルに戻る", width / 2, height / 2 + 60)
  text("c：もう一度やり直す", width / 2, height / 2 + 100)


  // タイトルへ戻る
  if (kb.presses("t")) {
    initTitle();
    scene = "title";
  } else if (kb.presses("c")) {
    initNextStage();
    scene = "nextstage";
  }


}