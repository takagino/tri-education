let player, ground, enemy, enemy2; // 変数追加

function setup() {
    new Canvas(640, 480);
    world.gravity.y = 7;

    ground = new Sprite(320, 400, 500, 20, 'static');

    player = new Sprite(320, 240, 40, 40);
    player.color = 'pink';
    player.text = '🐽';
    player.textSize = 30;

    for (let i = 0; i < 10; i++) {
        let rx = random(0, 640);
        let ry = random(0, 480);

        let rock = new Sprite(rx, ry, 30, 'static');
        rock.text = i;
    }

    enemy = new Sprite(320, 240, 100, 100, 'kinematic');
    enemy.vel.x = 3;
    enemy.vel.y = 3;

    // 2体目の敵を追加
    enemy2 = new Sprite(200, 100, 50, 50, 'kinematic');
    enemy2.vel.x = -5; // 左へ移動
    enemy2.vel.y = 2;  // 下へ移動
}

function draw() {
    background('skyblue');

    let dice = floor(random(0, 100));
    let rx = random(0, 640);

    if (dice < 2) {
        new Sprite(rx, -50, 20);
    } else if (dice > 97) {
        new Sprite(rx, -50, 20, 20);
    }

    if (enemy.x < 0 || enemy.x > 640) {
        enemy.vel.x *= -1;
        let rs = random(100, 200);
        enemy.width = rs;
        enemy.height = rs;
    }

    if (enemy.y < 0 || enemy.y > 480) {
        enemy.vel.y *= -1;
        let rs = random(100, 200);
        enemy.width = rs;
        enemy.height = rs;
    }

    // enemy2 用の跳ね返り処理を追加
    if (enemy2.x < 0 || enemy2.x > 640) {
        enemy2.vel.x *= -1;
        let rs = random(50, 150);
        enemy2.width = rs;
        enemy2.height = rs;
    }

    if (enemy2.y < 0 || enemy2.y > 480) {
        enemy2.vel.y *= -1;
        let rs = random(50, 150);
        enemy2.width = rs;
        enemy2.height = rs;
    }

    // ジャンプできるように条件を変更
    if (kb.presses('up') && (player.colliding(ground) || player.colliding(enemy) || player.colliding(enemy2))) {
        player.vel.y = -7;
    }

    if (kb.pressing('right')) { player.x += 5; }
    if (kb.pressing('left')) { player.x -= 5; }
}