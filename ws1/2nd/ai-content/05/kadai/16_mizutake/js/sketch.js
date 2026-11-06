let bgm;
let fft;
let resonanceGarden;

// 音域メーターにも表示する、平滑化済みの各エネルギーです。
let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    resonanceGarden = new ResonanceGarden(width / 2, height / 2);

    bgm = await loadSound('assets/bgm.mp3');
    bgm.loop();
    // 1024点解析で低い周波数を細かく分け、重低音を捉えやすくします。
    fft = new p5.FFT(1024);
    bgm.connect(fft);
}

function mousePressed() {
    userStartAudio();
    if (!bgm) return;

    if (bgm.isPlaying()) {
        bgm.pause();
    } else {
        bgm.play();
    }
}

function draw() {
    background(230, 48, 8);

    if (!fft || !resonanceGarden) {
        fill(0, 0, 100);
        textAlign(CENTER, CENTER);
        textSize(20);
        text('音源を読み込み中...', width / 2, height / 2);
        return;
    }

    // FFTの周波数データから、重低音と旋律の形を直接作ります。
    const spectrum = fft.analyze();
    resonanceGarden.update(spectrum);
    smoothBass = resonanceGarden.bassEnergy;
    smoothMid = resonanceGarden.melodyEnergy;
    smoothTreble = resonanceGarden.highEnergy;
    resonanceGarden.render();

    // 再生状態は上部に置き、中央のビジュアルを隠さないようにします。
    push();
    fill(0, 0, 100, 90);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    if (!bgm || !bgm.isPlaying()) {
        text('▶ 画面クリックで音楽を再生', width / 2, 28);
    } else {
        text('重低音とメロディに反応中', width / 2, 28);
    }
    pop();

    // 調整しやすいよう、重低音・メロディ・高音の反応量を表示します。
    push();
    const meters = [
        { label: '重低音', value: smoothBass, hue: 28 },
        { label: 'メロディ', value: smoothMid, hue: 185 },
        { label: '高音', value: smoothTreble, hue: 275 }
    ];
    const meterWidth = Math.min(190, (width - 48) / 3);
    const gap = 12;
    const startX = (width - (meterWidth * 3 + gap * 2)) / 2;
    const labelY = height - 58;
    const barY = height - 30;
    textAlign(LEFT, CENTER);
    textSize(12);
    noStroke();

    for (let i = 0; i < meters.length; i++) {
        const meter = meters[i];
        const x = startX + i * (meterWidth + gap);
        fill(0, 0, 92);
        text(`${meter.label}  ${meter.value.toFixed(2)}`, x, labelY);
        fill(0, 0, 25, 90);
        rect(x + meterWidth / 2, barY, meterWidth, 8, 4);
        if (meter.value > 0) {
            fill(meter.hue, 78, 100, 95);
            rect(x + meterWidth * meter.value / 2, barY, meterWidth * meter.value, 8, 4);
        }
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (resonanceGarden) {
        resonanceGarden.x = width / 2;
        resonanceGarden.y = height / 2;
    }
}
