let bgm;
let fft;

// ① クラスのインスタンス配列
let steppingNotes = [];
let musicRings = [];

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

    // 各音域に3個ずつ、合計9個の輪郭円を背景に散らします。
    for (let i = 0; i < 9; i++) {
        const ring = new MusicRing(
            width * ((i % 3) + random(0.15, 0.85)) / 3,
            height * (Math.floor(i / 3) + random(0.15, 0.85)) / 3
        );
        ring.band = (i % 3 + Math.floor(i / 3)) % 3;
        musicRings.push(ring);
    }

    // 候補点のうち、ほかの音符から離れた位置を選んで自然に散らします。
    const count = Math.max(6, Math.min(20, Math.floor(width * height / 55000)));
    for (let i = 0; i < count; i++) {
        let best = null;
        let bestDistance = -1;
        for (let attempt = 0; attempt < 30; attempt++) {
            const x = random(width * 0.1, width * 0.9);
            const y = random(height * 0.30, height * 0.94);
            const distance = steppingNotes.reduce((nearest, note) =>
                Math.min(nearest, Math.hypot(x - note.x, y - note.y)), Infinity);
            if (distance > bestDistance) {
                best = { x, y };
                bestDistance = distance;
            }
        }
        steppingNotes.push(new SteppingNote(best.x, best.y));
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
    background(138, 48, 92);

    // 音声の読み込みが完了するまではFFTにアクセスしない
    if (!fft) {
        fill(155, 65, 25);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
        return;
    }

	  let spectrum  = fft.analyze();
	  let rawBass   = constrain(map(sqrt(spectrum[0]), 0, 0.8, 0.0, 1.0), 0.0, 1.0);
	  let rawMid    = constrain(map(sqrt(spectrum[12]), 0, 0.4, 0.0, 1.0), 0.0, 1.0);
	  let rawTreble = constrain(map(sqrt(spectrum[28]), 0, 0.2, 0.0, 1.0), 0.0, 1.0);

    smoothBass = lerp(smoothBass, rawBass, 0.2);
    smoothMid = lerp(smoothMid, rawMid, 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.2);

    // 円を先に描き、その手前に音符を重ねます。
    const bandEnergies = [smoothBass, smoothMid, smoothTreble];
    for (const ring of musicRings) {
        ring.update(bandEnergies[ring.band]);
        ring.render();
    }

    // 最前面で音符を描画
    for (const note of steppingNotes) {
        note.update(smoothTreble, smoothMid);
        note.render();
    }

    fill(155, 65, 25);
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
    const oldWidth = width;
    const oldHeight = height;
    resizeCanvas(windowWidth, windowHeight);
    for (const ring of musicRings) {
        ring.x *= width / Math.max(1, oldWidth);
        ring.y *= height / Math.max(1, oldHeight);
    }
    for (const note of steppingNotes) {
        note.x *= width / Math.max(1, oldWidth);
        note.y *= height / Math.max(1, oldHeight);
    }
}