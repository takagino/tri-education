let bgm;
let fft;

// ① クラスのインスタンス配列
let orbs = [];
let ripples = [];
let waveLines = [];
let neonKaleidos = [];

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    // ※ファイル名を bgm.mp3 に変えた場合は 'assets/bgm.mp3' のままでOKです
    bgm = await loadSound('assets/bgm.mp3');
    bgm.loop();
    fft = new p5.FFT(64);
    bgm.connect(fft);

    // ② インスタンスの生成
    // Orb（ペンライトの光球）を35個生成
    for (let i = 0; i < 35; i++) {
        let rx = random(width * 0.05, width * 0.95);
        let ry = random(height * 0.1, height * 0.9);
        orbs.push(new Orb(rx, ry));
    }

    // Ripple（スパークル波紋）を10個生成
    for (let i = 0; i < 10; i++) {
        let rx = random(width * 0.1, width * 0.9);
        let ry = random(height * 0.1, height * 0.9);
        ripples.push(new Ripple(rx, ry));
    }

    // WaveLine（虹色の疾走ライン）を7本生成
    for (let i = 0; i < 7; i++) {
        let y = map(i, 0, 6, height * 0.15, height * 0.85);
        waveLines.push(new WaveLine(y));
    }

    // NeonKaleido（ウイニングライブ・スター）を12個生成
    for (let i = 0; i < 12; i++) {
        let rx = random(width);
        let ry = random(height * 0.15, height * 0.85);
        neonKaleidos.push(new NeonKaleido(rx, ry));
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
    // ステージ照明：低音が強く鳴った瞬間に背景がほんのりマゼンタ・紫にフラッシュする
    let bgHue = (320 + smoothBass * 40) % 360;
    let bgBri = 8 + smoothBass * 18;
    background(bgHue, 50, bgBri);

    let spectrum = fft.analyze();
    let rawBass = constrain(map(sqrt(spectrum[0]), 0.1, 0.75, 0.0, 1.0), 0.0, 1.0);
    let rawMid = constrain(map(sqrt(spectrum[12]), 0.05, 0.38, 0.0, 1.0), 0.0, 1.0);
    let rawTreble = constrain(map(sqrt(spectrum[28]), 0.02, 0.22, 0.0, 1.0), 0.0, 1.0);

    // ★BPM196の高速ビートに遅れないよう、音の立ち上がりは即座に反応（0.6）、減衰は滑らか（0.2）にする
    smoothBass = lerp(smoothBass, rawBass, rawBass > smoothBass ? 0.6 : 0.2);
    smoothMid = lerp(smoothMid, rawMid, rawMid > smoothMid ? 0.6 : 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, rawTreble > smoothTreble ? 0.6 : 0.2);

    // ③ 各クラスの更新・描画
    // 【背景レイヤー】WaveLine：ボーカル＆メロディ（中音）で虹色に疾走
    for (let line of waveLines) {
        line.update(smoothMid);
        line.render();
    }

    // 【中間レイヤー】Ripple：ブラス＆合いの手（高音）でキラキラ拡散
    for (let ripple of ripples) {
        ripple.update(smoothTreble);
        ripple.render();
    }

    // 【前面レイヤー1】Orb：キック＆ベース（低音）でペンライトのようにジャンプ
    for (let orb of orbs) {
        orb.update(smoothBass);
        orb.render();
    }

    // 【前面レイヤー2】NeonKaleido：ボーカルと低音のミックスでスターバースト
    let liveEnergy = constrain(smoothBass * 0.6 + smoothMid * 0.5, 0.0, 1.0);
    for (let kaleido of neonKaleidos) {
        kaleido.update(liveEnergy);
        kaleido.render();
    }

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