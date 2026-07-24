let player;

function setup() {
    new Canvas(640, 480);

    world.gravity.y = 2;
    new Sprite(320, 400, 640, 20, 'static');

    player = new Sprite(320, 370, 100, 40, 'kinematic');
    player.color = 'yellow';
    player.text = '😎';
    player.textSize = 30;


    // 上から四角を落とす
    for (let i = 0; i < 15; i++) {
        // i を使って計算することで、規則正しく配置する
        let x = 40 + (i * 40);  // 40, 80, 120... と等間隔になる
        let y = -50 - (i * 20); // 少しずつ高さを変えて斜めにする

        if (i == 10) {
            new Sprite(x, y, 100, 100);
            continue;
        }

        new Sprite(x, y, 20, 20);
    }

    let count = 0;
    while (count < 15) {
        // 600から引き算することで、右から左への斜め配置にする
        let x = 600 - (count * 30);
        let y = -100 - (count * 30);

        if (count == 10) {
            new Sprite(x, y, 100);
            count++;
            continue;
        }

        new Sprite(x, y, 20);
        count++;
    }
}

function draw() {
    background('skyblue');

    // プレイヤーのキーボード操作
    if (kb.pressing('right')) {
        player.x += 7;
    }
    if (kb.pressing('left')) {
        player.x -= 7;
    }

    // 画面端のワープ
    if (player.x > 640) {
        player.x = 0;
    } else if (player.x < 0) {
        player.x = 640;
    }
}