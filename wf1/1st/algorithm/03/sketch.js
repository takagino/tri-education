let player;

function setup() {
  new Canvas(640, 480);
  world.gravity.y = 10; // 重力を設定
  new Sprite(320, 400, 640, 20, 'static'); // 床

  player = new Sprite(320, 240, 50, 50);
}

function draw() {
  background('black');

  if (kb.pressing('right')) {
    player.x = player.x + 5;
  }

  if (kb.pressing('left')) {
    player.x = player.x - 5;
  }

  if (kb.pressing('up')) {
    player.y = player.y - 5;
  }

  if (kb.pressing('down')) {
    player.y = player.y + 5;
  }

  if (player.x < 25) {
    player.x = 25;
  }

  if (player.x > 640) {
    player.x = 0;
  }

  if (kb.presses('space')) {
    player.vel.y = -10;
  }
}