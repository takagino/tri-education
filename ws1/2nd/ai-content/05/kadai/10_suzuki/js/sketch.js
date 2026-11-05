let bgm;
let fft;

// ① クラスのインスタンス配列
let stageFloors = [];
let stageLights = [];
let laserFans = [];
let djBooths = [];
let cyberDiscs = [];

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
	  // StageFloor（奥へ続く床）：消失点を画面の中央・上から38%の高さに置く
	  for (let i = 0; i < 1; i++) {
	    stageFloors.push(new StageFloor(width / 2, height * 0.38));
	  }

	  // StageLight（天井のムービングライト）を画面の上端に6台並べる
	  for (let i = 0; i < 6; i++) {
	    let rx = map(i, 0, 5, width * 0.08, width * 0.92);
	    stageLights.push(new StageLight(rx, 0));
	  }

	  // LaserFan（ステージ奥のレーザー）を地平線の上に3台並べる
	  for (let i = 0; i < 3; i++) {
	    let rx = map(i, 0, 2, width * 0.3, width * 0.7);
	    laserFans.push(new LaserFan(rx, height * 0.38));
	  }

	  // DJBooth（手前のブースの台）：天板の中心を画面の下のほうに置く
	  for (let i = 0; i < 1; i++) {
	    djBooths.push(new DJBooth(width / 2, height * 0.64));
	  }

	  // CyberDisc（回るCD）をブースの天板の上、左右に2枚置く
	  for (let i = 0; i < 2; i++) {
	    let rx = (i === 0) ? width * 0.27 : width * 0.73;
	    cyberDiscs.push(new CyberDisc(rx, height * 0.64));
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
    background(250, 40, 4); // ライブ会場らしい真っ暗に近い背景

	  let spectrum  = fft.analyze();
	  let rawBass   = constrain(map(sqrt(spectrum[0]), 0, 0.8, 0.0, 1.0), 0.0, 1.0);
	  let rawMid    = constrain(map(sqrt(spectrum[12]), 0, 0.4, 0.0, 1.0), 0.0, 1.0);
	  let rawTreble = constrain(map(sqrt(spectrum[28]), 0, 0.2, 0.0, 1.0), 0.0, 1.0);

    smoothBass = lerp(smoothBass, rawBass, 0.2);
    smoothMid = lerp(smoothMid, rawMid, 0.2);
    smoothTreble = lerp(smoothTreble, rawTreble, 0.2);

    // ③ 各クラスに最適な周波数帯域を割り振って更新・描画
	  //    奥にあるものから順に描くと、手前のものが上に重なって奥行きが出る
	  // 【一番奥】StageFloor（床のグリッド）には低音（キック）を渡す
	  for (let floor of stageFloors) {
	    floor.update(smoothBass);
	    floor.render();
	  }

	  // 【奥のレイヤー】StageLight（天井のムービングライト）には低音（キック）を渡す
	  for (let light of stageLights) {
	    light.update(smoothBass);
	    light.render();
	  }

	  // 【中間レイヤー】LaserFan（ブースのレーザー）には中音（ボーカル・シンセ）を渡す
	  for (let laser of laserFans) {
	    laser.update(smoothMid);
	    laser.render();
	  }

	  // 【手前のレイヤー】DJBooth（ブースの台）には低音（キック）を渡す
	  for (let booth of djBooths) {
	    booth.update(smoothBass);
	    booth.render();
	  }

	  // 【一番手前】CyberDisc（左右の回るCD）には高音（ハイハット・シンバル）を渡す
	  for (let disc of cyberDiscs) {
	    disc.update(smoothTreble);
	    disc.render();
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