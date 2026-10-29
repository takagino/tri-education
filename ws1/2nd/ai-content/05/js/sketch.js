let osc;
let currentFreq = 0;
let currentNoteName = "";

// キーボードのキーと音階データ（オブジェクト）
const NOTE_MAP = {
    'a': { name: 'ド (C4)', freq: 261.63 },
    's': { name: 'レ (D4)', freq: 293.66 },
    'd': { name: 'ミ (E4)', freq: 329.63 },
    'f': { name: 'ファ (F4)', freq: 349.23 },
    'g': { name: 'ソ (G4)', freq: 392.00 },
    'h': { name: 'ラ (A4)', freq: 440.00 },
    'j': { name: 'シ (B4)', freq: 493.88 },
    'k': { name: 'ド (C5)', freq: 523.25 }
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    // 三角波（'triangle'）で少し温かみのあるシンセ音にする
    osc = new p5.Oscillator('triangle');
    osc.amp(0);  // 最初は音量を 0（無音）にしておく
    osc.start(); // オシレーターを起動して待機
}

function keyPressed() {
    // 押されたキーを小文字に変換してオブジェクトにあるかチェック
    let k = key.toLowerCase();
    if (NOTE_MAP[k]) {
        userStartAudio();

        let note = NOTE_MAP[k];
        currentNoteName = note.name;
        currentFreq = note.freq;

        // 周波数を設定し、すっと音量を上げる
        osc.freq(note.freq);
        osc.amp(0.3, 0.05); // 0.05秒で音量0.3に立ち上げる
    }
}

function keyReleased() {
    // キーを離したら0.1秒かけて自然に音量を0にする
    osc.amp(0, 0.1);
}

function draw() {
    background(220, 30, 10);

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