let bgm;
let fft;

// オリジナルVJクラス
let fabric;
let pulse;
let threads;
let tension;

// 音域データ
let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

// 音声読み込み状態
let audioLoadFailed = false;
let audioReady = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  // ① インスタンスを生成
  fabric = new FlowFabric();
  pulse = new PulseRing();
  threads = new ThreadParticle();
  tension = new TensionLine();

  // ② BGM読み込み
  // 描画を止めず、読み込み完了後に音声解析を接続する。
  bgm = loadSound(
    "assets/My_Heart.mp3",
    () => {
      fft = new p5.FFT(0.8, 64);
      fft.setInput(bgm);
      audioReady = true;
    },
    (error) => {
      audioLoadFailed = true;
      console.error("音声ファイルの読み込みに失敗しました", error);
    },
  );
}

// ③ クリックで再生・停止
function mousePressed() {
  userStartAudio();

  if (!audioReady) return;

  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.play();
  }
}

function draw() {
  // 黒背景
  background(220, 30, 5);

  // ④ 音声解析
  if (fft && bgm && bgm.isPlaying()) {
    let spectrum = fft.analyze();

    // 低音
    let rawBass = sqrt(spectrum[0] / 255);

    // 中音
    let rawMid = sqrt(spectrum[12] / 255);

    // 高音
    let rawTreble = sqrt(spectrum[28] / 255);

    // 音の変化を滑らかにする
    smoothBass = lerp(smoothBass, rawBass, 0.2);
    smoothMid = lerp(smoothMid, rawMid, 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.2);
  } else {
    // 停止中は徐々に静かな状態に戻す
    smoothBass = lerp(smoothBass, 0, 0.08);
    smoothMid = lerp(smoothMid, 0, 0.08);
    smoothTreble = lerp(smoothTreble, 0, 0.08);
  }

  // ⑤ 各クラスを更新
  fabric.update(smoothBass, smoothMid, smoothTreble);

  pulse.update(smoothBass);
  threads.update(smoothTreble);
  tension.update(smoothMid);

  // ⑥ レイヤー順に描画

  // 背景：低音の衝撃波
  pulse.render();

  // 中央：音の織物
  fabric.render();

  // 前景：光の繊維
  threads.render();

  // 前景：幾何学的な直線
  tension.render();

  // ⑦ 再生案内
  if (!audioReady || !bgm.isPlaying()) {
    push();

    fill(0, 0, 100);
    noStroke();

    textAlign(CENTER, CENTER);
    textSize(18);

    if (audioLoadFailed) {
      text("音声ファイルを読み込めませんでした", width / 2, height / 2);
    } else if (!audioReady) {
      text("LOADING...", width / 2, height / 2);
    } else {
      text("CLICK TO PLAY", width / 2, height / 2);
    }

    pop();
  }
}

// ⑧ ウィンドウサイズ変更
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
