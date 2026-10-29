let bgm;
let fft;
let mic;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    bgm = await loadSound('assets/bgm.mp3');
    bgm.loop();
    fft = new p5.FFT(64);

    mic = new p5.AudioIn();
    mic.connect(fft);
}

function keyPressed() {
    if (key === 'l' || key === 'L') {
        let spectrum = fft.analyze();
        console.table(spectrum);
    }
}

function mousePressed() {
    userStartAudio();
    mic.start();

    // if (!bgm) return;

    // if (bgm.isPlaying()) {
    //     bgm.pause();
    // } else {
    //     bgm.play();
    // }
}

function draw() {
    background(220, 30, 10);

    fill(0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(24);

    if (!bgm) {
        text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
    } else if (bgm.isPlaying()) {
        text("🎵 音楽を再生中...（クリックで一時停止）", width / 2, height / 2);
    } else {
        text("▶ 画面クリックで音楽を再生", width / 2, height / 2);
    }

    let spectrum = fft.analyze();
    let barWidth = width / spectrum.length;
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {

        let barHeight = map(sqrt(spectrum[i]), 0, 1.0, 0, height);
        let x = i * barWidth + barWidth / 2;

        fill(180, 80, 100);
        rect(x, height - barHeight / 2 - 25, barWidth - 2, barHeight);

        fill(0, 0, 70);
        textAlign(CENTER, BOTTOM);
        textSize(10);
        text(i, x, height - 5);
    }

    // ① グラフを観察して見つけた番号から 3大エネルギーを取得（sqrtで小さな値を持ち上げる）
    let bass = sqrt(spectrum[0]);  // 低音域（0〜7番あたりでよく跳ねる番号）
    let mid = sqrt(spectrum[12]); // 中音域（8〜23番あたりでよく跳ねる番号）
    let treble = sqrt(spectrum[28]); // 高音域（24〜63番あたりでよく跳ねる番号）

    // ② 3大エネルギー（低音・中音・高音）を3つの円で並べて可視化
    // 【低音 Bass】左の円（赤ピンク）
    let bassSize = map(bass, 0, 1.0, 20, 250);
    fill(340, 80, 100);
    circle(width * 0.25, height * 0.35, bassSize);

    // 【中音 Mid】中央の円（シアン）
    let midSize = map(mid, 0, 1.0, 20, 250);
    fill(180, 80, 100);
    circle(width * 0.5, height * 0.35, midSize);

    // 【高音 Treble】右の円（イエロー）
    let trebleSize = map(treble, 0, 1.0, 20, 250);
    fill(60, 80, 100);
    circle(width * 0.75, height * 0.35, trebleSize);

    // 数値デバッグ表示
    fill(0, 0, 100);
    textAlign(LEFT, TOP);
    textSize(15);
    text(`Bass   : ${bass.toFixed(3)}`, 20, 20);
    text(`Mid    : ${mid.toFixed(3)}`, 20, 45);
    text(`Treble : ${treble.toFixed(3)}`, 20, 70);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}