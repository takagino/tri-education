let hiyoko;
let floor;

function setup() {
    new Canvas(500, 300);
    world.gravity.y = 10; // 重力を設定

    hiyoko = new Sprite(250, 200, 64, 64);
    hiyoko.anis.frameDelay = 8;
    hiyoko.rotationLock = true; // 着地時に回転しないように固定

    hiyoko.addAnis('assets/hiyoko_sheet.png', {
        run: { row: 0, frames: 4 },
        jump: { row: 1, frames: 4 },
        roll: { row: 2, frames: 4, frameDelay: 12 },
        stand: { row: 3, frames: 4 }
    });
    hiyoko.changeAni('stand');

    // 地面となる床を作成
    floor = new Sprite(250, 270, 500, 20, 'static');
    floor.color = '#2ed573';
}

function draw() {
    clear();
    background('#1a1f36');

    // アクション（地面に触れているときだけジャンプ）
    if (kb.presses('up') && hiyoko.colliding(floor)) {
        hiyoko.vel.y = -6; // 上向きの速度を与えて本当に跳び上がる！
        hiyoko.changeAni(['jump', 'stand']);
    }
    if (kb.presses('down') || kb.presses('space')) {
        hiyoko.changeAni(['roll', 'stand']);
    }

    if (hiyoko.ani.name !== 'jump' && hiyoko.ani.name !== 'roll') {
        if (kb.pressing('left')) {
            hiyoko.vel.x = -3;
            hiyoko.scale.x = -1;
            hiyoko.changeAni('run');
        } else if (kb.pressing('right')) {
            hiyoko.vel.x = 3;
            hiyoko.scale.x = 1;
            hiyoko.changeAni('run');
        } else {
            hiyoko.vel.x = 0;
            hiyoko.changeAni('stand');
        }
    }

    // 画面外へのはみ出し防止
    hiyoko.x = constrain(hiyoko.x, 32, width - 32);
}