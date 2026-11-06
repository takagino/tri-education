
let bgm;
let fft;

// オブジェクト配列
let bassBounces = [];
let crystalObjects = [];
let spikeBursts = [];

// 音の変化を滑らかにする変数
let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    // BGM読み込み
    bgm = await loadSound('./assets/AK.mp3');

    // FFT解析
    fft = new p5.FFT(64);
    bgm.connect(fft);

    // BGM再生
    bgm.loop();

    // BassBounceを12個生成
    for (let i = 0; i < 12; i++) {
        let x = map(i, 0, 11, width * 0.1, width * 0.9);
        let y = height * 0.8;

        bassBounces.push(new BassBounce(x, y));
    }

    // CrystalObjectを12個生成
    for (let i = 0; i < 12; i++) {
        let x = random(width * 0.25, width * 0.75);
        let y = random(height * 0.2, height * 0.65);

        crystalObjects.push(new CrystalObject(x, y, i % 3));
    }
    // SpikeBurstを生成
    // SpikeBurst生成
    for (let i = 0; i < 12; i++) {

        let x = random(width);
        let y = random(height);

        spikeBursts.push(
            new SpikeBurst(x, y)
        );
    }
}

// 画面クリックで音楽の再生・停止
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

    if (!fft) return;

    // FFT解析
    let spectrum = fft.analyze();

    // 低音
    let rawBass = constrain(
        map(sqrt(spectrum[0]), 0, 0.8, 0.0, 1.0),
        0.0,
        1.0
    );

    // 中音
    let rawMid = constrain(
        map(sqrt(spectrum[12]), 0, 0.4, 0.0, 1.0),
        0.0,
        1.0
    );

    // 高音
    let rawTreble = constrain(
        map(sqrt(spectrum[28]), 0, 0.2, 0.0, 1.0),
        0.0,
        1.0
    );

    // 音の変化を滑らかにする
    smoothBass = lerp(smoothBass, rawBass, 0.2);
    smoothMid = lerp(smoothMid, rawMid, 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.2);

    // 結晶オブジェクトの更新・描画
    for (let crystal of crystalObjects) {
        crystal.update(smoothBass, smoothMid, smoothTreble);
        crystal.render();
    }

    // BassBounceの更新・描画
    for (let bounce of bassBounces) {
        bounce.update(smoothBass, smoothMid);
        bounce.render();
    }
    // ギザギザのネオンビジュアル
    // =================================
    // 背景：SpikeBurst
    // =================================

    for (let spike of spikeBursts) {

        spike.update(
            smoothBass,
            smoothMid,
            smoothTreble
        );

        spike.render();
    }

    // 音楽の状態表示
    fill(0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(24);

    if (!bgm) {
        text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
    } else if (!bgm.isPlaying()) {
        text("▶ 画面クリックで音楽を再生", width / 2, height / 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
