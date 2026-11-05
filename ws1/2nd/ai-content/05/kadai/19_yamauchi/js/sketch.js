const FFT_BINS = 64;
const BASS_BIN = 0;
const MID_BIN = 12;
const TREBLE_BIN = 28;
const AUDIO_PATH = "assets/Sound_Wave.mp3";
const VISUAL_COLUMNS = 6;
const VISUAL_ROWS = 3;

let bgm;
let fft;
let audioError = false;
let showSpectrum = false;
let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;
let clubVisuals = [];

function preload() {
  bgm = loadSound(
    AUDIO_PATH,
    () => {},
    (error) => {
      console.error(`BGM could not be loaded from ${AUDIO_PATH}:`, error);
      audioError = true;
    }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  createClubVisuals();

  fft = new p5.FFT(0.82, FFT_BINS);
  fft.setInput(bgm);
}

function createClubVisuals() {
  clubVisuals = [];
  for (let row = 0; row < VISUAL_ROWS; row++) {
    for (let column = 0; column < VISUAL_COLUMNS; column++) {
      const x = width * (column + 0.5) / VISUAL_COLUMNS;
      const y = height * (row + 0.5) / VISUAL_ROWS;
      clubVisuals.push(new NeonClubVisual(x, y));
    }
  }
}

function draw() {
  background(268, 78, 7, 100);

  if (bgm && bgm.isPlaying()) {
    const spectrum = fft.analyze();
    smoothBass = lerp(smoothBass, readBand(spectrum, BASS_BIN), 0.2);
    smoothMid = lerp(smoothMid, readBand(spectrum, MID_BIN), 0.2);
    smoothTreble = lerp(smoothTreble, readBand(spectrum, TREBLE_BIN), 0.2);
  } else {
    smoothBass = lerp(smoothBass, 0, 0.08);
    smoothMid = lerp(smoothMid, 0, 0.08);
    smoothTreble = lerp(smoothTreble, 0, 0.08);
  }

  const energies = [smoothBass, smoothMid, smoothTreble];
  for (let i = 0; i < clubVisuals.length; i++) {
    const visual = clubVisuals[i];
    visual.update(energies[i % energies.length]);
    visual.render();
  }

  drawPlaybackMessage();

  if (showSpectrum && bgm && bgm.isPlaying()) {
    drawSpectrum(fft.analyze());
  }
}

function readBand(spectrum, index) {
  return constrain(sqrt(spectrum[index] / 255), 0, 1);
}

function drawPlaybackMessage() {
  if (bgm && bgm.isPlaying()) return;

  fill(0, 0, 100, 90);
  textAlign(CENTER, CENTER);
  textSize(20);

  if (audioError) {
    text(`BGMを読み込めませんでした: ${AUDIO_PATH}`, width / 2, height / 2);
  } else {
    text("画面をクリックしてクラブVJをスタート", width / 2, height / 2);
  }
}

function drawSpectrum(spectrum) {
  const graphHeight = min(130, height * 0.22);
  const barWidth = width / FFT_BINS;

  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    const barHeight = (spectrum[i] / 255) * graphHeight;
    const isTunedBin = i === BASS_BIN || i === MID_BIN || i === TREBLE_BIN;
    fill(isTunedBin ? 45 : 190, 75, 100, isTunedBin ? 95 : 48);
    rect(
      i * barWidth + barWidth / 2,
      height - graphHeight / 2 - 42,
      max(1, barWidth - 2),
      barHeight
    );
  }

  fill(0, 0, 100, 90);
  textAlign(LEFT, TOP);
  textSize(12);
  text(
    `D: spectrum  bass[${BASS_BIN}] ${smoothBass.toFixed(2)}  mid[${MID_BIN}] ${smoothMid.toFixed(2)}  treble[${TREBLE_BIN}] ${smoothTreble.toFixed(2)}`,
    12,
    12
  );
}

function mousePressed() {
  userStartAudio();
  if (!bgm || audioError) return;

  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.loop();
  }
}

function keyPressed() {
  if (key === "d" || key === "D") {
    showSpectrum = !showSpectrum;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createClubVisuals();
}
