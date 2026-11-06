let bgm;
let fft;

// ① クラスのインスタンス配列
let orbs = [];
let ripples = [];
let waveLines = [];
let stars = [];
let noteSquares = [];
let lightningBolts = [];
let lightningSpawnTimer = 0;
let noteKeys = {
    a: { hue: 285, speed: 3.5 },
    s: { hue: 305, speed: 4.5 },
    d: { hue: 325, speed: 5.5 },
    f: { hue: 190, speed: 4.0 },
    g: { hue: 210, speed: 5.0 },
    h: { hue: 265, speed: 6.0 },
    j: { hue: 300, speed: 7.0 },
    k: { hue: 340, speed: 8.0 }
};

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100);
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

    bgm = await loadSound('assets/twotwothree.mp3');
    bgm.loop();
    fft = new p5.FFT(64);
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

function keyPressed() {
    const note = noteKeys[key.toLowerCase()];
    if (!note) return;

    // Small bursts tie note input to the visualizer's trap palette.
    for (let i = 0; i < 3; i++) {
        stars.push(new NoteStar(note.hue, note.speed, random(22, 48)));
        noteSquares.push(new NoteSquare((note.hue + 24) % 360, note.speed * 0.8, random(18, 42)));
    }
}

function star(x, y, radius1, radius2, npoints) {
    let angle = 360 / npoints;
    let halfAngle = angle / 2;

    beginShape();

    for (let a = 0; a < 360; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);

        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }

    endShape(CLOSE);
}

function makeLightningBolt() {
    const startX = random(width);
    const startY = random(height * 0.08, height * 0.45);
    const endX = constrain(startX + random(-width * 0.42, width * 0.42), 0, width);
    const endY = constrain(startY + random(height * 0.25, height * 0.7), 0, height);
    const segments = floor(random(7, 14));
    const points = [{ x: startX, y: startY }];

    for (let i = 1; i < segments; i++) {
        const t = i / segments;
        points.push({
            x: lerp(startX, endX, t) + random(-width * 0.045, width * 0.045),
            y: lerp(startY, endY, t) + random(-height * 0.025, height * 0.025)
        });
    }
    points.push({ x: endX, y: endY });

    lightningBolts.push({ points, life: 1, hue: random([185, 195, 285, 305]) });

    // Add a short branch off the main bolt for a more natural forked flash.
    if (random() < 0.72 && points.length > 4) {
        const branchIndex = floor(random(2, points.length - 2));
        const origin = points[branchIndex];
        const branchEnd = {
            x: constrain(origin.x + random(-width * 0.2, width * 0.2), 0, width),
            y: constrain(origin.y + random(height * 0.08, height * 0.28), 0, height)
        };
        lightningBolts.push({
            points: [origin, { x: lerp(origin.x, branchEnd.x, 0.45) + random(-28, 28), y: lerp(origin.y, branchEnd.y, 0.45) }, branchEnd],
            life: 0.8,
            hue: 190
        });
    }
}

function updateAndRenderLightning() {
    for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];
        bolt.life -= 0.075;
        if (bolt.life <= 0) {
            lightningBolts.splice(i, 1);
            continue;
        }

        push();
        noFill();
        strokeCap(ROUND);
        strokeJoin(ROUND);
        stroke(bolt.hue, 55, 100, 20 * bolt.life);
        strokeWeight(12 * bolt.life);
        drawBoltPath(bolt.points);
        stroke(bolt.hue, 35, 100, 55 * bolt.life);
        strokeWeight(5 * bolt.life);
        drawBoltPath(bolt.points);
        stroke(0, 0, 100, 100 * bolt.life);
        strokeWeight(1.5 * bolt.life);
        drawBoltPath(bolt.points);
        pop();
    }
}

function drawBoltPath(points) {
    beginShape();
    for (const point of points) vertex(point.x, point.y);
    endShape();
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

    if (bgm && bgm.isPlaying()) {
        lightningSpawnTimer--;
        const bassAttack = rawBass > 0.16 && rawBass > smoothBass * 0.92;
        if (lightningSpawnTimer <= 0 || bassAttack) {
            const burstCount = bassAttack ? floor(random(3, 7)) : floor(random(1, 4));
            for (let i = 0; i < burstCount; i++) makeLightningBolt();
            lightningSpawnTimer = bassAttack ? floor(random(5, 12)) : floor(random(14, 28));
        }
    } else {
        lightningSpawnTimer = 0;
    }

    updateAndRenderLightning();

    // ③ 各クラスに最適な周波数帯域を割り振って更新・描画
    // 【背景レイヤー】Trap-style WaveLine pulses with the kick and 808 bass
    for (let line of waveLines) {
        line.update(smoothBass);
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

    // Update and render stars
    for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].update();
        stars[i].render();

        if (stars[i].isDead()) {
            stars.splice(i, 1);
        }
    }

    for (let i = noteSquares.length - 1; i >= 0; i--) {
        noteSquares[i].update();
        noteSquares[i].render();
        if (noteSquares[i].isDead()) noteSquares.splice(i, 1);
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
