let bgm;
let fft;

// ① クラスのインスタンス配列
let ripples = [];
let waveLines = [];
let edgeTrails = [];
let lightningBolts = [];
let lightningSpawnTimer = 0;

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    bgm = await loadSound('assets/bgm.mp3');
    bgm.loop();
    fft = new p5.FFT(64);
    bgm.connect(fft);

    // ② インスタンスの生成
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

    lightningSpawnTimer = floor(random(35, 75) / 15);
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

    // 画面の端から短い間隔で線を出し、低音に合わせて動かします。
    if (frameCount % 10 === 0) {
        const edge = floor(random(4));
        let x;
        let y;

        if (edge === 0) {
            x = 0;
            y = random(height);
        } else if (edge === 1) {
            x = width;
            y = random(height);
        } else if (edge === 2) {
            x = random(width);
            y = 0;
        } else {
            x = random(width);
            y = height;
        }

        edgeTrails.push(new EdgeTrail(x, y));
    }

    for (let i = edgeTrails.length - 1; i >= 0; i--) {
        const trail = edgeTrails[i];
        trail.update(smoothBass);
        trail.render();
        if (trail.isDead()) {
            edgeTrails.splice(i, 1);
        }
    }

    // 画面中央上部から、音に反応する雷をランダムな間隔で落とします。
    lightningSpawnTimer--;
    if (lightningSpawnTimer <= 0) {
        lightningBolts.push(new LightningBolt(
            width / 2 + random(-width * 0.08, width * 0.08),
            -height * 0.3
        ));
        lightningSpawnTimer = floor(random(35, 75) / 15);
    }

    for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];
        bolt.update(smoothTreble);
        bolt.render();
        if (bolt.isDead()) {
            lightningBolts.splice(i, 1);
        }
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