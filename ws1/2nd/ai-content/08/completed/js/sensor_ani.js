let hiyoko;

function setup() {
    new Canvas(500, 300);
    world.gravity.y = 0; // 重力は使わない

    hiyoko = new Sprite(250, 150, 64, 64);
    hiyoko.anis.frameDelay = 8;

    hiyoko.addAnis('assets/hiyoko_sheet.png', {
        run: { row: 0, frames: 4 },
        jump: { row: 1, frames: 4 },
        roll: { row: 2, frames: 4, frameDelay: 12 },
        stand: { row: 3, frames: 4 }
    });
    hiyoko.changeAni('stand');
}

function draw() {
    clear();
    background('#1a1f36');

    // センサー未接続時はここで終了
    if (!Sensor.isConnected) return;

    Sensor.update();
    let v = Sensor.value; // 0.0 〜 1.0

    // センサーの値に応じてアニメーションを切り替える
    if (v > 0.7) {
        // 手がとても近い：くるくる転がり続ける！
        hiyoko.changeAni('roll');
    } else if (v > 0.25) {
        // 手が中くらい：走る（近づくほど速く走る！）
        hiyoko.changeAni('run');
        hiyoko.ani.frameDelay = floor(map(v, 0.25, 0.7, 10, 3));
    } else {
        // 手が遠い：待機
        hiyoko.changeAni('stand');
    }

    // センサーの値を画面左上に表示
    fill('#ffffff');
    noStroke();
    textSize(14);
    text(`Sensor: ${v.toFixed(2)} (raw: ${Sensor.rawValue})`, 16, 24);
}

// 画面クリックでArduinoに接続
function mousePressed() {
    if (!Sensor.isConnected) {
        Sensor.connect();
    }
}