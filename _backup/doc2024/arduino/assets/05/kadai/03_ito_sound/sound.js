let mySound;
let fft;

function preload() {
  mySound = loadSound("maou_14_shining_star.mp3");
}

function setup() {
  colorMode(HSL);
  rectMode(CENTER);
  angleMode(DEGREES);
  createCanvas(window.innerWidth - 20, window.innerHeight - 20);

  mySound.amp(0.5);

  fft = new p5.FFT();
}

let y = 0;
let c = 0;
let d = 0;
preload();

function draw() {
  clear();
  if (mySound.isPlaying()) {
    let waveform = fft.analyze();

    // 平均化して滑らかにする
    let smoothedWaveform = [];
    let smoothingFactor = 10;

    for (let i = 0; i < waveform.length; i++) {
      if (waveform[i] == 0) {
        waveform[i] = 30;
      }
      let sum = 0;
      for (let j = -smoothingFactor; j <= smoothingFactor; j++) {
        let index = i + j;
        if (index >= 0 && index < waveform.length) {
          sum += waveform[index];
        }
      }
      smoothedWaveform[i] = sum / (smoothingFactor * 2 + 1);
      if (smoothedWaveform[i] > 300) {
        smoothedWaveform[i] = 300;
      }
    }

    for (let i = 0; i < 650; i++) {
      let angle = map(i, 0, 650, 0, 360);

      let radius = map(smoothedWaveform[i], 0, 255, 0, width / 2);
      let x = width / 2 + radius * cos(angle);
      console.log(x);
      let y = height / 2 + radius * sin(angle);
      stroke(getColorfulColor(smoothedWaveform[i], max(waveform)));
      line(width / 2, height / 2, x, y);
    }
  }
}

function keyPressed() {
  mySound.loop(); //ループ再生したい場合は「loop()」
}

function keyReleased() {
  mySound.pause(); //一時停止は「pause()」
  clear();
}

function getColorfulColor(value, max) {
  if (value < 0 || value > 1023) {
    throw new Error("Value must be between 0 and 1023");
  }

  // HSV（色相、彩度、明度）を基に色を決定
  const hue = (value / max) * 360; // 0〜1023を0〜360度に変換
  const saturation = 1; // 彩度（1で最大）
  const brightness = 1; // 明度（1で最大）

  // HSVからRGBに変換
  const rgb = hsvToRgb(hue, saturation, brightness);

  // RGB形式で返す
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// HSVからRGBに変換するヘルパー関数
function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}
