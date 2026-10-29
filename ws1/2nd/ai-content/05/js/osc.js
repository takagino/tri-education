let osc;
let currentFreq = 0;
let currentNoteName = "";
let circles = []; // ① 画面上の円を管理する配列

const NOTE_MAP = {
    'a': { name: 'ド (C4)', freq: 261.63, hue: 0, speed: 2.5, size: 110 },
    's': { name: 'レ (D4)', freq: 293.66, hue: 35, speed: 3.5, size: 95 },
    'd': { name: 'ミ (E4)', freq: 329.63, hue: 60, speed: 4.5, size: 85 },
    'f': { name: 'ファ (F4)', freq: 349.23, hue: 130, speed: 5.5, size: 75 },
    'g': { name: 'ソ (G4)', freq: 392.00, hue: 190, speed: 6.5, size: 65 },
    'h': { name: 'ラ (A4)', freq: 440.00, hue: 230, speed: 7.5, size: 55 },
    'j': { name: 'シ (B4)', freq: 493.88, hue: 280, speed: 9.0, size: 45 },
    'k': { name: 'ド (C5)', freq: 523.25, hue: 330, speed: 11.0, size: 35 }
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    osc = new p5.Oscillator('triangle');
    osc.amp(0);
    osc.start();
}

function keyPressed() {
    let k = key.toLowerCase();
    if (NOTE_MAP[k]) {
        userStartAudio();

        let note = NOTE_MAP[k];
        currentNoteName = note.name;
        currentFreq = note.freq;

        osc.freq(note.freq);
        osc.amp(0.3, 0.05);

        // ② 新しい円インスタンスを生成して配列に追加
        circles.push(new NoteCircle(note.hue, note.speed, note.size));
    }
}

function keyReleased() {
    osc.amp(0, 0.1);
}

function draw() {
    background(220, 30, 10);

    // ③ 配列内のすべての円を更新・描画（後ろからループして寿命が尽きた円を安全に削除）
    for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].update();
        circles[i].render();

        if (circles[i].isDead()) {
            circles.splice(i, 1); // 配列から削除
        }
    }

    fill(0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("A/S/D/F/G/H/J/K キーを押して演奏してみよう！", width / 2, height / 2 - 40);

    if (currentNoteName !== "") {
        fill(180, 80, 100);
        textSize(36);
        text(`♪ ${currentNoteName} : ${currentFreq} Hz`, width / 2, height / 2 + 30);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}