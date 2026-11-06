let bgm;
let fft;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    bgm = await loadSound('assets/AK.mp3');
    bgm.loop();
    fft = new p5.FFT(64);
    bgm.connect(fft);
}

function keyPressed() {
    if (key === 'l' || key === 'L') {
        let spectrum = fft.analyze();
        console.table(spectrum);
    }
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
    background(220, 30, 10);

    fill(0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(24);

    if (!bgm) {
        text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
    } else if (!bgm.isPlaying()) {
        text("▶ 画面クリックで音楽を再生", width / 2, height / 2);
    } else {
        text("🎵 音楽を再生中...（クリックで一時停止）", width / 2, height / 2);
    }

    let spectrum = fft.analyze();
    let barWidth = width / spectrum.length;
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {

        // スペクトルの値を、平方根 sqrt()で囲む
        let barHeight = map(sqrt(spectrum[i]), 0, 1.0, 0, height);
        let x = i * barWidth + barWidth / 2;

        fill(180, 80, 100);
        rect(x, height - barHeight / 2 - 25, barWidth - 2, barHeight);

        fill(0, 0, 70);
        textAlign(CENTER, BOTTOM);
        textSize(10);
        text(i, x, height - 5);
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}