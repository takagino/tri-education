let bgm;
let fft;

// ① クラスのインスタンス配列
let orbs = [];
let ripples = [];
let waveLines = [];
let magneticClusters = []; // 追加：磁気クラスターの配列

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    bgm = await loadSound('assets/bgm2.mp3');
    bgm.loop();
    fft = new p5.FFT(64);
    bgm.connect(fft);

    // ② インスタンスの生成
    // Orb（発光球）を30個生成
    for (let i = 0; i < 30; i++) {
        let rx = random(width * 0.1, width * 0.9);
        let ry = random(height * 0.1, height * 0.9);
        orbs.push(new Orb(rx, ry));
    }

    // Ripple（波紋）を8個生成
    for (let i = 0; i < 8; i++) {
        let rx = random(width * 0.2, width * 0.8);
        let ry = random(height * 0.2, height * 0.8);
        ripples.push(new Ripple(rx, ry));
    }

    // WaveLine（波打つライン）を5本生成
    for (let i = 0; i < 5; i++) {
        let y = map(i, 0, 4, height * 0.2, height * 0.8);
        waveLines.push(new WaveLine(y));
    }
    for (let i = 0; i < 5; i++) {
        let rx = random(width * 0.15, width * 0.85);
        let ry = random(height * 0.15, height * 0.85);
        magneticClusters.push(new MagneticCluster(rx, ry));
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

    let spectrum = fft.analyze();
    let rawBass = constrain(map(sqrt(spectrum[0]), 0, 0.8, 0.0, 1.0), 0.0, 1.0);
    let rawMid = constrain(map(sqrt(spectrum[12]), 0, 0.4, 0.0, 1.0), 0.0, 1.0);
    let rawTreble = constrain(map(sqrt(spectrum[28]), 0, 0.2, 0.0, 1.0), 0.0, 1.0);

    smoothBass = lerp(smoothBass, rawBass, 0.2);
    smoothMid = lerp(smoothMid, rawMid, 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.2);

    // ③ 各クラスに最適な周波数帯域を割り振って更新・描画
    // 【背景レイヤー】WaveLine には中音（ボーカル・シンセ旋律）を渡す
    for (let line of waveLines) {
        line.update(smoothMid);
        line.render();
    }

    // 【中間レイヤー】Ripple には高音（シンバル・ビートの粒）を渡す
    for (let ripple of ripples) {
        ripple.update(smoothTreble);
        ripple.render();
    }

    // 【前面レイヤー】Orb には重低音（キック・ベースの爆発）を渡す
    for (let orb of orbs) {
        orb.update(smoothBass);
        orb.render();
    }
    // 【最前面レイヤー】MagneticCluster には低音（smoothBass）を渡して磁力連動させる
    for (let cluster of magneticClusters) {
        cluster.update(smoothBass);
        cluster.render();
    }

    fill(0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(24);

    // 再生時はテキストを出さない
    if (!bgm) {
        text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
    } else if (!bgm.isPlaying()) {
        text("▶ 画面クリックで音楽を再生", width / 2, height / 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}