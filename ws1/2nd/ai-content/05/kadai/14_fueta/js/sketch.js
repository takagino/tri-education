let bgm;
let fft;

let orbs = [];
let ripples = [];
let waveLines = [];
let sparkles = [];
let backgroundStars = [];
let prismBloom;

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

// file.js の棒グラフを見ながら曲に合わせて調整する番号
const BASS_INDEX = 2;
const MID_INDEX = 12;
const TREBLE_INDEX = 32;

function preload() {
    soundFormats("mp3");
    bgm = loadSound("./assets/star.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);

    // 64帯域で解析する
    fft = new p5.FFT(0.8, 64);
    bgm.connect(fft);

    for (let i = 0; i < 22; i++) {
        orbs.push(new Orb(random(width), random(height)));
    }

    for (let i = 0; i < 9; i++) {
        ripples.push(new Ripple(random(width), random(height)));
    }

    for (let i = 0; i < 5; i++) {
        const y = map(i, 0, 4, height * 0.15, height * 0.85);
        waveLines.push(new WaveLine(y));
    }

    for (let i = 0; i < 48; i++) {
        sparkles.push(
            new Sparkle(random(width), random(height), random(2, 6))
        );
    }

    // 背景に固定された遠い星。手前のSparkleとは別レイヤー。
    for (let i = 0; i < 190; i++) {
        backgroundStars.push({
            x: random(width),
            y: random(height),
            size: random(0.7, 2.2),
            phase: random(360),
            hue: random([42, 185, 205, 275, 320])
        });
    }

    prismBloom = new PrismBloom(width / 2, height / 2);
}

function mousePressed() {
    userStartAudio();

    if (!bgm) return;

    if (bgm.isPlaying()) {
        bgm.pause();
    } else {
        bgm.loop();
    }
}

function draw() {
    blendMode(BLEND);
    background(245, 55, 8, 100);
    drawStarfield();
    const spectrum = fft.analyze();

    const rawBass = getBandValue(spectrum, BASS_INDEX, 2.8);
    const rawMid = getBandValue(spectrum, MID_INDEX, 3.4);
    const rawTreble = getBandValue(spectrum, TREBLE_INDEX, 4.2);

    smoothBass = lerp(smoothBass, rawBass, 0.16);
    smoothMid = lerp(smoothMid, rawMid, 0.14);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.24);

    // 中音に合わせて揺れる光の帯
    for (const line of waveLines) {
        line.update(smoothMid);
        line.render();
    }

    blendMode(BLEND); // 追加：WaveLineのADDモードを戻す

    // 高音に合わせて広がる波紋
    for (const ripple of ripples) {
        ripple.update(smoothTreble);
        ripple.render();
    }

    // 高音に合わせて瞬く粒子
    for (const sparkle of sparkles) {
        sparkle.update(smoothTreble);
        sparkle.render();
    }

    // 低音・中音・高音を受け取るオリジナルクラス
    prismBloom.update(smoothBass, smoothMid, smoothTreble);
    prismBloom.render();

    // 低音に合わせて動く発光球
    for (const orb of orbs) {
        orb.update(smoothBass);
        orb.render();
    }

    drawPlaybackHint();
}

function drawStarfield() {
    // 青紫から紺へ落ちる、ポップな宇宙のグラデーション
    noStroke();
    for (let i = 0; i < 40; i++) {
        const y = i * height / 40;
        const hue = 238 + sin(i * 8) * 24;
        const brightness = 5 + i * 0.28;
        fill(hue, 78, brightness, 100);
        rect(0, y, width, height / 40 + 1);
    }

    // やわらかいピンク・シアン・紫の星雲
    push();
    blendMode(ADD);
    noStroke();
    fill(285, 75, 55, 3 + smoothMid * 2);
    ellipse(width * 0.22, height * 0.34, width * 0.72, height * 0.5);
    fill(195, 80, 55, 3 + smoothMid * 2);
    ellipse(width * 0.76, height * 0.58, width * 0.68, height * 0.52);
    fill(325, 70, 48, 2 + smoothBass * 2);
    ellipse(width * 0.51, height * 0.84, width * 0.78, height * 0.34);

    // 背景の星はゆっくり瞬き、高音で少し強くきらめく
    for (const star of backgroundStars) {
        const twinkle = 0.5 + 0.5 * sin(frameCount * 1.2 + star.phase);
        const alpha = 24 + twinkle * 55 + smoothTreble * 18;
        const size = star.size * (0.75 + twinkle * 0.65);

        noStroke();
        fill(star.hue, 28, 100, alpha * 0.32);
        circle(star.x, star.y, size * 4.2);
        fill(star.hue, 14, 100, alpha);
        circle(star.x, star.y, size);

        if (star.size > 1.65) {
            stroke(star.hue, 16, 100, alpha * 0.8);
            strokeWeight(0.7);
            line(star.x - size * 2.3, star.y, star.x + size * 2.3, star.y);
            line(star.x, star.y - size * 2.3, star.x, star.y + size * 2.3);
        }
    }
    blendMode(BLEND);
    pop();
}

function getBandValue(spectrum, index, gain) {
    // FFTの値を0〜1に収めて、演出に使う
    return constrain((spectrum[index] / 255) * gain, 0, 1);
}

function drawPlaybackHint() {
    if (bgm && bgm.isPlaying()) return;

    push();
    blendMode(BLEND);
    noStroke();
    fill(0, 0, 100, 90);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("クリックして音楽と映像を再生", width / 2, height / 2);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
