let bgm;
let fft;
let audioError = false;

let sodaBubbles = [];
const bubbleCooldown = { bass: 0, mid: 0, treble: 0 };
let lemonSlices = [];
let iceCubes = [];
let sparkles = [];

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
    createSodaScene();

    try {
        // 日本語のファイル名は、ブラウザで先に読み込んでから音声に変換します。
        const response = await fetch('assets/しゅわしゅわハニーレモン350ml.mp3');
        if (!response.ok) throw new Error('音源を読み込めませんでした');
        const buffer = await getAudioContext().decodeAudioData(await response.arrayBuffer());
        bgm = new p5.SoundFile(buffer);
        bgm.loop();
        fft = new p5.FFT(64);
        bgm.connect(fft);
    } catch (error) {
        audioError = true;
        console.error('レモンソーダの音源:', error);
    }
}

function createSodaScene() {
    const unit = min(width, height);
    const portrait = width < height;
    const layout = portrait
        ? [[0.39, 0.43, 0.45], [0.76, 0.23, 0.23], [0.73, 0.68, 0.33], [0.19, 0.76, 0.18]]
        : [[0.43, 0.49, 0.34], [0.72, 0.32, 0.23], [0.67, 0.74, 0.20], [0.19, 0.27, 0.18], [0.88, 0.61, 0.14]];

    // 輪切りは大きさと余白を意識して配置します。
    lemonSlices = layout.map(([x, y, scale]) => {
        const lemon = new LemonSlice(x * width, y * height);
        lemon.size = scale * unit;
        return lemon;
    });

    iceCubes = [[0.12, 0.60], [0.31, 0.18], [0.59, 0.23], [0.85, 0.33],
                [0.31, 0.76], [0.57, 0.65], [0.80, 0.79]].map(([x, y]) => {
        const ice = new SodaIce(x * width, y * height);
        ice.size *= constrain(unit / 720, 0.55, 1.2);
        return ice;
    });

    // 泡は、画面の高さと反応する帯域を対応させます。
    const bands = ["bass", "mid", "treble"];
    const perBand = constrain(floor(width / 122), 5, 11);
    sodaBubbles = bands.flatMap(band => {
        const profile = SodaBubble.profiles[band];
        return Array.from({ length: perBand }, (_, i) => {
            const x = width * (0.065 + 0.87 * (i + random(0.15, 0.85)) / perBand);
            const y = height * random(profile.top, profile.bottom);
            return new SodaBubble(x, y, band);
        });
    });
    for (const band of bands) bubbleCooldown[band] = 0;
    sparkles = [[0.08, 0.20], [0.22, 0.49], [0.36, 0.29], [0.53, 0.18], [0.61, 0.42],
                [0.76, 0.53], [0.91, 0.22], [0.95, 0.47], [0.15, 0.78], [0.41, 0.82],
                [0.51, 0.75], [0.87, 0.86], [0.27, 0.61], [0.94, 0.73]].map(([x, y]) => {
        const star = new SodaSparkle(x * width, y * height);
        star.size *= constrain(unit / 720, 0.62, 1.1);
        return star;
    });
}

function mousePressed() {
    if (!bgm) return;
    userStartAudio();
    if (bgm.isPlaying()) bgm.pause();
    else bgm.play();
}

function draw() {
    // 上は白に近く、下に向かって薄いソーダブルーにします。
    push();
    const gradient = drawingContext.createLinearGradient(0, 0, width * 0.35, height);
    gradient.addColorStop(0, '#eafcff');
    gradient.addColorStop(1, '#bfeef8');
    drawingContext.fillStyle = gradient;
    drawingContext.fillRect(0, 0, width, height);
    pop();

    const spectrum = fft ? fft.analyze() : [];
    const rawBass = constrain(sqrt(spectrum[0] ?? 0) / 0.8, 0, 1);
    const rawMid = constrain(sqrt(spectrum[12] ?? 0) / 0.4, 0, 1);
    const rawTreble = constrain(sqrt(spectrum[28] ?? 0) / 0.2, 0, 1);
    smoothBass = lerp(smoothBass, rawBass, 0.2);
    smoothMid = lerp(smoothMid, rawMid, 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.2);

    // 氷は低音、レモンは中音、きらめきは高音に反応します。
    for (const ice of iceCubes) { ice.update(smoothBass); ice.render(); }
    for (const lemon of lemonSlices) { lemon.update(smoothMid); lemon.render(); }
    const energy = { bass: smoothBass, mid: smoothMid, treble: smoothTreble };
    const accents = { bass: 0, mid: 0, treble: 0 };
    const step = constrain((deltaTime || 16.667) / 16.667, 0.1, 3);
    for (const band of Object.keys(energy)) bubbleCooldown[band] = Math.max(0, bubbleCooldown[band] - step);

    // 一つのアクセントで反応するのは各帯域につき最大2個にします。
    for (const bubble of sodaBubbles) {
        const band = bubble.band;
        const started = bubble.update(energy[band], bubbleCooldown[band] === 0 && accents[band] < 2);
        if (started) accents[band]++;
        bubble.render();
    }
    for (const band of Object.keys(energy)) if (accents[band] > 0) bubbleCooldown[band] = 14;

    for (const star of sparkles) { star.update(smoothTreble); star.render(); }

    if (!bgm || !bgm.isPlaying()) {
        const label = audioError ? '音源を読み込めませんでした' : bgm ? '▶ クリックして再生' : '音源を読み込み中…';
        push();
        noStroke();
        fill(192, 45, 52, 10);
        rect(width / 2, height - 39, 204, 42, 21);
        fill(0, 0, 100, 90);
        rect(width / 2, height - 42, 204, 42, 21);
        fill(192, 68, 35);
        textAlign(CENTER, CENTER);
        textSize(14);
        text(label, width / 2, height - 42);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    createSodaScene();
}
