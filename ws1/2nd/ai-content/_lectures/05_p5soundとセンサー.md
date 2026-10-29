# 05_p5soundとセンサー連携（オーディオビジュアル）

### コンテンツ制作（金1-2）

[00_導入](https://app.notion.com/p/00_-3cebdf471aca8099b067d7a323310d2e?pvs=21)

[01_Arduinoの基礎](https://app.notion.com/p/01_Arduino-3ecbdf471aca805198efd80b40681979?pvs=21)

[02_センサー入力値の調整](https://app.notion.com/p/02_-3f3bdf471aca80408e5acdb3862906cb?pvs=21)

[03_p5jsの基礎](https://app.notion.com/p/03_p5js-3f9bdf471aca80839972fc3e65dda794?pvs=21)

[04_p5jsとセンサー連携](https://app.notion.com/p/04_p5js-401bdf471aca804db4e5d869edc1f966?pvs=21)

[05_p5soundとセンサー連携](https://app.notion.com/p/05_p5sound-408bdf471aca80f49f3be2b477a346e9?pvs=21)

---

# 1. はじめに

## 1-1. 今回学ぶこと

前回（単元4）は、Arduinoの赤外線距離センサーとp5.jsを結合し、JavaScriptの **「クラス（Class）」** と **「ファイル分割（モジュール化）」** を使って、手の動きに反応する美しいジェネラティブアートを作りました。

今回は、そのアートに **「音（サウンド）」** の力を注入します！

Web Audioの強力な拡張ライブラリ **「p5.sound」** を導入し、音楽ファイル（mp3）やマイクの音声をリアルタイムに周波数解析（FFT）して、ビジュアルを音楽に完全シンクロさせます。

さらに、前回学んだ **「ハブ（`sketch.js`）と部品（クラス）の疎結合設計」** の真価を発揮させます。前回作ったクラス（`Orb.js`, `Ripple.js`, `WaveLine.js`）のコードを壊すことなくそのまま流用し、**「音 × 映像 × センサー」が三位一体となった本格的なインタラクティブ・オーディオビジュアル（VJシステム）** を構築します。

- **Web Audio APIの仕組みとブラウザの安全ルール「Autoplay Policy（自動再生の禁止）」**
- **オシレーター（`p5.Oscillator`）による周波数（Hz）の発音と、キーボード楽器の作成**
- **音階のイメージ（色相・スピード・サイズ）を引数で受け取り、弾けて消える円のクラス設計（`NoteCircle`）**
- **p5.soundによるオーディオファイル（mp3/wav）のロード・再生・ループ制御**
- **音の大きさ（音量）をリアルタイムに測る「`p5.Amplitude`」**
- **音を解剖する魔法の数理「高速フーリエ変換（`p5.FFT`）」と周波数帯域（低音 Bass / 中音 Mid / 高音 Treble）**
- **マイク入力（`p5.AudioIn`）への切り替えと、声や拍手でのインタラクション**
- **「クラス設計」の真価：前回の `Orb`, `Ripple`, `WaveLine` を1行も書き換えずに音でドライブする流用術**
- **音響エネルギーを美しく整えるデータパイプライン（`getEnergy` ➔ `map` ➔ `lerp`）**
- **「音（リズム・ビート）」×「センサー（手の接近・明暗）」が掛け合わさるマルチモーダル演出の構築**
- **生成AIを活用して、音や音楽の帯域に反応するオリジナルクラスを改造・量産する**

---

# 2. Web Audioとp5.soundの基礎知識

## 2-1. p5.sound とは？

**p5.sound** は、p5.js の公式アドオンライブラリであり、ブラウザに標準搭載されている高度な音響API **「Web Audio API」** を直感的かつクリエイティブに扱えるようにラップ（簡略化）したものです。

| 項目 | 内容 |
| --- | --- |
| **できること** | 音声ファイルの再生・停止・逆再生・音程変更、マイクからの音声取得、音量・周波数解析（FFT）、音の波形描画、シンセサイザーによる発音、ディレイ・リバーブ・フィルター等のエフェクト処理 |
| **導入方法** | HTMLの `<script>` タグで CDN から読み込むだけ（インストール不要） |
| **公式サイト** | [p5.sound リファレンス（p5js.org/reference/#/libraries/p5.sound）](https://p5js.org/reference/#/libraries/p5.sound) |

---

## 2-2. ブラウザの重要ルール「Autoplay Policy（自動再生の禁止）」

Webで音を扱う際、**全Webエンジニアが必ず直面する最も重要なセキュリティ仕様** があります。
それが **「Autoplay Policy（オートプレイ・ポリシー）」** です。

<aside>
🚨 **なぜ勝手に音が鳴ってはいけないのか？**

昔のWebサイトでは、ページを開いた瞬間に大音量でBGMや動画広告が鳴り響き、ユーザーを驚かせたり公共の場で恥をかかせたりするトラブルが多発しました。
そのため、現在の主要ブラウザ（Chrome, Safari, Edge, Firefox等）はすべて：

**「ユーザーが画面を明示的にクリック（またはタップ・キー押し）するまで、Web Audioの音声出力を自動的にミュート（一時停止）する」**

という厳格なセキュリティロックをかけています。
</aside>

このロックを解除せずに音を再生しようとすると、コンソールに以下のような警告が出ます：
`The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.`

p5.sound では、画面のクリック時やキー操作時などに **`userStartAudio()`** という関数を呼ぶことで、この制約を安全にクリアできます。

---

# 3. プログラムで音を作って鳴らす（周波数とオーディオビジュアル楽器）

音楽ファイル（mp3）を読み込む前に、まずは **プログラム自身の力で「音の波（周波数）」を生成して鳴らす** 体験から始めましょう！
音の高さ（周波数 Hz）の仕組みを体感し、キーボードを叩くと音と光が弾ける「オーディオビジュアル楽器」を作ります。

## 3-1. HTMLの記述と動作確認（p5.js と p5.sound の読み込み）

本単元の作業フォルダを作成し、まずは最小構成の `index.html` と `js/sketch.js` を準備します。

```text
05_audio_visual/
├── index.html
└── js/
    └── sketch.js
```

**`index.html`**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.sound 基礎</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #0b0c10;
    }
  </style>
</head>
<body>
  <!-- ① p5.js ライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5@2/lib/p5.min.js"></script>
  <!-- ② p5.sound アドオンライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5.sound/dist/p5.sound.min.js"></script>

  <!-- ③ p5.js メインスケッチ -->
  <script src="./js/sketch.js"></script>
</body>
</html>
```

HTMLで読み込んだ `p5.js` と `p5.sound` が正常にブラウザに認識されているかを、最小限のコードで確認しましょう。

**`js/sketch.js`（読み込み確認）**

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);

  // ① p5.js のバージョン確認
  console.log("p5.js version:", p5.prototype.VERSION);

  // ② p5.sound が読み込まれているかチェック
  if (typeof p5.Oscillator !== 'undefined') {
    console.log("🟢 p5.sound が正常に読み込まれました！");
    // Web Audio の状態確認（最初は suspended になるのが正常）
    console.log("AudioContext state:", getAudioContext().state);
  } else {
    console.error("🔴 p5.sound の読み込みに失敗しています。HTMLのscriptタグを確認してください。");
  }
}

function draw() {
  background(11, 12, 16);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("p5.js & p5.sound 読み込みテスト中", width / 2, height / 2 - 20);

  fill(136, 146, 176);
  textSize(14);
  text("ブラウザの開発者ツール（F12 / Option+Cmd+I）のコンソールを確認してください", width / 2, height / 2 + 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

<aside>
💡 **コンソール（Console）の確認方法**

ブラウザ上で右クリック ➔ **「検証（Inspect）」**（または `F12` / Macは `Option + Cmd + I`）を押し、**「Console」** タブを開きます。

```text
* Tone.js v15.0.2 *
p5.js version: 2.x.x
🟢 p5.sound が正常に読み込まれました！
AudioContext state: suspended
```

- **「Tone.js v15.x.x」と表示されていれば正常です！**：`p5.sound` は内部のオーディオエンジンとして **Tone.js** を採用しており、読み込み時に自動でこのメッセージを出力します。
- **`suspended`（一時停止中）**：2-2で解説した「Autoplay Policy（ユーザー操作があるまで音声を止める）」が正しく機能している正常な状態です。
</aside>

---

## 3-2. 周波数（Hz）を指定して音を鳴らす（`p5.Oscillator`）

音の正体は **「空気の振動（波）」** です。
1秒間に何回振動するかを **「周波数（単位：Hz / ヘルツ）」** と呼び、この数値が小さいほど「低い音」、大きいほど「高い音」になります。

`p5.sound` の **`p5.Oscillator`（オシレーター / 発振器）** を使うと、プログラムで好きな周波数の音波を生成して鳴らすことができます。

| 波形の種類（引数） | 音色の特徴 |
|---|---|
| **`'sine'`**（サイン波・正弦波） | 最も純粋で丸みのある柔らかい音（時報やフルートのような音） |
| **`'triangle'`**（三角波） | サイン波に近いが、少しだけ倍音を含んだ 따뜻한（あたたかい）音 |
| **`'sawtooth'`**（ノコギリ波） | 倍音を豊富に含む、華やかでエッジの効いたシンセサイザーらしい音 |
| **`'square'`**（矩形波） | ファミコン（8bitゲーム）のBGMのようなレトロなデジタル音 |

まずは画面を押している間だけ音が鳴り、マウスの左右の位置で周波数（音の高さ）が変化するスケッチを書いてみましょう。

**`js/sketch.js`**

```javascript
let osc;
let isPlaying = false;
let currentFreq = 440; // 初期周波数：440Hz（ラ / A4の音）

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  // ① サイン波（'sine'）のオシレーターを生成
  osc = new p5.Oscillator('sine');
  osc.amp(0);  // 最初は音量を 0（無音）にしておく
  osc.start(); // オシレーターを起動して待機
}

function mousePressed() {
  // ② ブラウザのAutoplay制限を解除して音量を上げる
  userStartAudio();
  osc.amp(0.3, 0.05); // 0.05秒かけて音量0.3へ滑らかに上げる（プチッというノイズ防止）
  isPlaying = true;
}

function mouseReleased() {
  // ③ マウスを離したら0.1秒かけて音量を0にする
  osc.amp(0, 0.1);
  isPlaying = false;
}

function draw() {
  background(220, 30, 10);

  if (isPlaying) {
    // マウスのX座標を 200Hz（低い音）〜 800Hz（高い音）にマッピング
    currentFreq = map(mouseX, 0, width, 200, 800);
    osc.freq(currentFreq);

    // 周波数に合わせて円のサイズと色を変化させる
    let hueVal = map(currentFreq, 200, 800, 0, 300);
    let circleSize = map(currentFreq, 200, 800, 300, 80); // 低い音ほど大きく、高い音ほど小さく
    fill(hueVal, 80, 100, 80);
    noStroke();
    circle(mouseX, height / 2, circleSize);
  }

  // 画面テキスト表示
  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textSize(24);
  if (isPlaying) {
    text(`🔊 周波数: ${ currentFreq.toFixed(1) } Hz（マウスを左右に動かしてみよう）`, width / 2, height / 2 - 180);
  } else {
    text("🖱️ 画面をマウスで長押しすると音が鳴ります", width / 2, height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

マウスを押しながら左右に動かしてみてください。
**「周波数（Hz）の数値が小さい＝低い音」「数値が大きい＝高い音」** という関係が直感的にわかります。この感覚が、後半で学ぶ **「周波数解析（FFT）」** の重要な基礎になります！

---

## 3-3. ドレミファソラシドをキーボードに割り当てて鳴らす

周波数の仕組みがわかったら、次はパソコンのキーボード（`A` `S` `D` `F` `G` `H` `J` `K` キー）に **「ド・レ・ミ・ファ・ソ・ラ・シ・ド」** の周波数を割り当てて、ピアノのように演奏できるようにしてみましょう。

### 音階と周波数（Hz）の対応表

| キー | 音名（日本） | 音名（英語） | 周波数（Hz） | 特徴 |
|---|---|---|---|---|
| **`A`** | ド | C4 | `261.63` | 基準となる安定した低めの音 |
| **`S`** | レ | D4 | `293.66` | 少し浮かび上がる音 |
| **`D`** | ミ | E4 | `329.63` | 明るく華やかな響き |
| **`F`** | ファ | F4 | `349.23` | 少し落ち着いた広がりのある音 |
| **`G`** | ソ | G4 | `392.00` | 力強く澄んだ響き |
| **`H`** | ラ | A4 | `440.00` | オーケストラのチューニング基準音（時報の音） |
| **`J`** | シ | B4 | `493.88` | 高いドへ向かう緊張感のある音 |
| **`K`** | ド（高） | C5 | `523.25` | 低いド（261.63Hz）の**ちょうど2倍**の周波数！ |

<aside>
💡 **豆知識：1オクターブ上がると周波数は「2倍」になる**

低い「ド（C4）」の周波数 `261.63Hz` と、1オクターブ高い「ド（C5）」の周波数 `523.25Hz` を比べると、**ちょうど2倍** になっていることがわかります。音楽と数学（物理）はこのように密接に繋がっています。
</aside>

キーボードを押したとき（`keyPressed`）に指定した周波数で音を鳴らし、キーを離したとき（`keyReleased`）に音がスーッと消える **`js/sketch.js`** を作成します。

**`js/sketch.js`**

```javascript
let osc;
let currentNoteName = "";
let currentFreq = 0;

// キーボードのキーと音階データの対応辞書（オブジェクト）
const NOTE_MAP = {
  'a': { name: 'ド (C4)', freq: 261.63 },
  's': { name: 'レ (D4)', freq: 293.66 },
  'd': { name: 'ミ (E4)', freq: 329.63 },
  'f': { name: 'ファ (F4)', freq: 349.23 },
  'g': { name: 'ソ (G4)', freq: 392.00 },
  'h': { name: 'ラ (A4)', freq: 440.00 },
  'j': { name: 'シ (B4)', freq: 493.88 },
  'k': { name: 'ド (C5)', freq: 523.25 }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  // 三角波（'triangle'）で少し温かみのあるシンセ音にする
  osc = new p5.Oscillator('triangle');
  osc.amp(0);  // 最初は音量を 0（無音）にしておく
  osc.start(); // オシレーターを起動して待機
}

function keyPressed() {
  // 押されたキーを小文字に変換して辞書にあるかチェック
  let k = key.toLowerCase();
  if (NOTE_MAP[k]) {
    userStartAudio();

    let note = NOTE_MAP[k];
    currentNoteName = note.name;
    currentFreq = note.freq;

    // 周波数を設定し、すっと音量を上げる
    osc.freq(note.freq);
    osc.amp(0.4, 0.02); // 0.02秒で音量0.4に立ち上げる
  }
}

function keyReleased() {
  // キーを離したら0.2秒かけて自然に音量を0にする
  osc.amp(0, 0.2);
}

function draw() {
  background(220, 30, 10);

  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("🎹 キーボードの [A][S][D][F][G][H][J][K] キーを押して演奏してみよう！", width / 2, height / 2 - 40);

  if (currentNoteName !== "") {
    fill(180, 80, 100);
    textSize(36);
    text(`♪ ${currentNoteName} : ${currentFreq} Hz`, width / 2, height / 2 + 30);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

ブラウザをクリックしてから、キーボードの `A` `S` `D` `F` `G` `H` `J` `K` を順番に叩いてみてください！
綺麗な「ドレミファソラシド」が鳴り響けば成功です。

---

## 3-4. 画面中央からランダムに動き、徐々に消えていく円のクラスを作る

音が鳴るようになったら、次は **「音が鳴った瞬間にビジュアルが弾ける」** 仕組みを作ります。
まずは、**「画面中央からランダムな方向へ飛び出し、徐々に透明になって消えていく円のクラス（`NoteCircle`）」** を設計しましょう。

単元4で学んだ通り、`js/templates/` フォルダを作ってクラスを別ファイル（`NoteCircle.js`）として切り出します。

```text
05_audio_visual/
├── index.html
└── js/
    ├── sketch.js
    └── templates/
        └── NoteCircle.js   // ★ 音に合わせて飛び出す円のクラス
```

### STEP 1：まずは引数なしで動く基本の `NoteCircle.js` を作る

画面中央（`width / 2, height / 2`）で生まれ、ランダムな角度（`0〜360度`）に向かって進みながら、寿命（`lifespan`）が `100` から `0` へと減っていくクラスです。

<aside>
💡 **なぜ `lifespan`（寿命）という変数を使うのか？**

Processing や p5.js の世界的な定番教材（Daniel Shiffman 氏の『The Nature of Code』等）では、出現して消えるオブジェクト（パーティクル）の残り時間を **`this.lifespan`（または `this.lifetime`）** という変数で管理するのが王道パターンです。
`lifespan`（100〜0）を使えば、描画時の**透明度（Alpha）**だけでなく、**円のサイズも寿命に合わせて `map()` で徐々に小さくする**といった連動が簡単に書け、数値が `0` 以下になった瞬間に `isDead()` で配列から安全に削除できます。
</aside>

**`js/templates/NoteCircle.js`（基本版）**

```javascript
class NoteCircle {
  constructor() {
    // 画面中央からスタート
    this.x = width / 2;
    this.y = height / 2;

    // 飛び出す角度（0〜360度）をランダムに決める
    let angle = random(360);
    let speed = 5; // 移動スピード

    // 角度とスピードから、X方向・Y方向の移動量（速度ベクトル）を計算
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;

    this.size = 60;       // 出現時の円のサイズ
    this.hue = 180;       // 色相（0〜360）
    this.lifespan = 100;  // 寿命（100で出現し、0になると消滅する）
    this.fadeSpeed = 1.5; // 寿命が減っていく速さ
  }

  // 毎フレームの座標移動と寿命の更新
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.lifespan -= this.fadeSpeed; // 寿命を少しずつ減らす
  }

  // 描画処理
  render() {
    push();
    translate(this.x, this.y);
    noStroke();

    // 寿命（100〜0）に合わせて、円のサイズも this.size から 0 へ徐々に小さくする
    let currentSize = map(this.lifespan, 100, 0, this.size, 0);

    // 寿命（lifespan: 100〜0）をそのまま透明度（Alpha）として使う
    fill(this.hue, 80, 100, this.lifespan);
    circle(0, 0, currentSize);
    pop();
  }

  // 寿命が尽きたかどうかを判定するメソッド
  isDead() {
    return this.lifespan <= 0;
  }
}
```

**`index.html`** に `NoteCircle.js` の読み込みを追加します（`sketch.js` の前に記述します）：

```html
  <!-- ① p5.js ライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5@2/lib/p5.min.js"></script>
  <!-- ② p5.sound アドオンライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5.sound/dist/p5.sound.min.js"></script>

  <!-- クラス部品の読み込み -->
  <script src="./js/templates/NoteCircle.js"></script>

  <!-- ③ p5.js メインスケッチ -->
  <script src="./js/sketch.js"></script>
```

### STEP 2：`sketch.js` でキーを押すたびに円を出現させる（引数なし版）

3-3で作った `sketch.js` に配列 `circles = []` を追加し、キーを押した瞬間に `circles.push(new NoteCircle())` で円を生み出してみましょう。

**`js/sketch.js`（引数なし版）**

```javascript
let osc;
let circles = []; // 画面上の円を管理する配列
let currentNoteName = "";
let currentFreq = 0;

// キーボードのキーと音階データの対応辞書（オブジェクト）
const NOTE_MAP = {
  'a': { name: 'ド (C4)', freq: 261.63 },
  's': { name: 'レ (D4)', freq: 293.66 },
  'd': { name: 'ミ (E4)', freq: 329.63 },
  'f': { name: 'ファ (F4)', freq: 349.23 },
  'g': { name: 'ソ (G4)', freq: 392.00 },
  'h': { name: 'ラ (A4)', freq: 440.00 },
  'j': { name: 'シ (B4)', freq: 493.88 },
  'k': { name: 'ド (C5)', freq: 523.25 }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // ★ NoteCircle内で角度（0〜360度）を使うため追加
  colorMode(HSB, 360, 100, 100, 100);

  osc = new p5.Oscillator('triangle');
  osc.amp(0);
  osc.start();
}

function keyPressed() {
  let k = key.toLowerCase();
  if (NOTE_MAP[k]) {
    userStartAudio();

    let note = NOTE_MAP[k];
    currentNoteName = note.name;
    currentFreq = note.freq;

    // ① 周波数を設定し、すっと音量を上げる
    osc.freq(note.freq);
    osc.amp(0.4, 0.02);

    // ② 新しい円インスタンスを生成して配列に追加！（まずは引数なし）
    circles.push(new NoteCircle());
  }
}

function keyReleased() {
  osc.amp(0, 0.2);
}

function draw() {
  background(220, 30, 10);

  // ★ 配列内のすべての円を更新・描画（後ろからループして寿命が尽きた円を安全に削除）
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].render();

    if (circles[i].isDead()) {
      circles.splice(i, 1); // 配列から削除
    }
  }

  // 画面テキスト表示
  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("🎹 キーボードの [A]〜[K] キーを押すと音と一緒に円が飛び出します！", width / 2, 40);

  if (currentNoteName !== "") {
    fill(180, 80, 100);
    textSize(28);
    text(`♪ ${currentNoteName} : ${currentFreq} Hz`, width / 2, 80);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

まずはこの状態でブラウザを動かし、キーを叩くたびに画面中央から水色の円がランダムな方向へ飛び出してスーッと消えていくことを確認してください！

---

## 3-5. キーボードに割り当て、それぞれの音階をイメージした色・スピードなどを引数で渡す

3-4で円が飛び出すようになりましたが、今のままではどのキー（ド〜高いド）を押してもすべて同じ色（水色）・同じスピード・同じサイズの円しか出ません。
そこで、`NoteCircle` の **`constructor(hue, speed, size)` に引数を渡せるように進化** させ、音階ごとのイメージをビジュアルに反映させましょう！

### 音階ごとのビジュアルイメージ設計

| キー | 音階 | 音のイメージ | 色相 (`hue`) | スピード (`speed`) | サイズ (`size`) |
|---|---|---|---|---|---|
| **`A`** | ド (C4) | どっしり重い基底の音 | `0`（赤） | `2.5`（ゆっくり） | `110`（特大） |
| **`S`** | レ (D4) | 温かく動き出す音 | `35`（オレンジ） | `3.5` | `95` |
| **`D`** | ミ (E4) | 明るく輝く音 | `60`（黄色） | `4.5` | `85` |
| **`F`** | ファ (F4) | 穏やかで爽やかな音 | `130`（緑） | `5.5` | `75` |
| **`G`** | ソ (G4) | 澄み渡る空のような音 | `190`（シアン） | `6.5` | `65` |
| **`H`** | ラ (A4) | 凛としたクールな音 | `230`（青） | `7.5` | `55` |
| **`J`** | シ (B4) | 鋭く神秘的な音 | `280`（紫） | `9.0` | `45` |
| **`K`** | ド (C5) | 軽やかに弾ける高い音 | `330`（マゼンタ） | `11.0`（高速！） | `35`（小粒） |

### STEP 1：引数を受け取るように `NoteCircle.js` をアップデート

3-4で作った `NoteCircle.js` の `constructor(hue, speed, size)` に引数を追加し、固定値だった `speed`・`size`・`hue` を引数から受け取るように変更します（変更するのは `constructor` 内の数行だけです）。

**`js/templates/NoteCircle.js`（引数対応版）**

```javascript
class NoteCircle {
  // ★ 引数で「色相(hue)」「速さ(speed)」「大きさ(size)」を受け取る！
  constructor(hue, speed, size) {
    // 画面中央からスタート
    this.x = width / 2;
    this.y = height / 2;

    // 飛び出す角度（0〜360度）をランダムに決める
    let angle = random(360);

    // 角度と引数で受け取った speed から、X方向・Y方向の移動量を計算
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;

    this.size = size;     // ★ 引数のサイズを設定
    this.hue = hue;       // ★ 引数の色相を設定
    this.lifespan = 100;  // 寿命（100で出現し、0になると消滅する）
    this.fadeSpeed = 1.5; // 寿命が減っていく速さ
  }

  // 毎フレームの座標移動と寿命の更新
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.lifespan -= this.fadeSpeed; // 寿命を少しずつ減らす
  }

  // 描画処理
  render() {
    push();
    translate(this.x, this.y);
    noStroke();

    // 寿命（100〜0）に合わせて、円のサイズも this.size から 0 へ徐々に小さくする
    let currentSize = map(this.lifespan, 100, 0, this.size, 0);

    // 寿命（lifespan: 100〜0）をそのまま透明度（Alpha）として使う
    fill(this.hue, 80, 100, this.lifespan);
    circle(0, 0, currentSize);
    pop();
  }

  // 寿命が尽きたかどうかを判定するメソッド
  isDead() {
    return this.lifespan <= 0;
  }
}
```

### STEP 2：`sketch.js` で音階ごとの引数を渡して円を生成する

1回のキー押しで少し華やかに見えるよう、1音につき3個の円を同時に飛び出させてみましょう。

**`js/sketch.js`**

```javascript
let osc;
let circles = []; // 画面上の円を管理する配列
let currentNoteInfo = null;

// キーボードと「音階・周波数・色・スピード・サイズ」の対応データ
const NOTE_MAP = {
  'a': { name: 'ド (C4)',   freq: 261.63, hue: 0,   speed: 2.5,  size: 110 },
  's': { name: 'レ (D4)',   freq: 293.66, hue: 35,  speed: 3.5,  size: 95  },
  'd': { name: 'ミ (E4)',   freq: 329.63, hue: 60,  speed: 4.5,  size: 85  },
  'f': { name: 'ファ (F4)', freq: 349.23, hue: 130, speed: 5.5,  size: 75  },
  'g': { name: 'ソ (G4)',   freq: 392.00, hue: 190, speed: 6.5,  size: 65  },
  'h': { name: 'ラ (A4)',   freq: 440.00, hue: 230, speed: 7.5,  size: 55  },
  'j': { name: 'シ (B4)',   freq: 493.88, hue: 280, speed: 9.0,  size: 45  },
  'k': { name: 'ド (C5)',   freq: 523.25, hue: 330, speed: 11.0, size: 35  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // 角度を0〜360度で扱う
  colorMode(HSB, 360, 100, 100, 100);

  osc = new p5.Oscillator('triangle');
  osc.amp(0);  // 最初は音量を 0（無音）にしておく
  osc.start(); // オシレーターを起動して待機
}

function keyPressed() {
  let k = key.toLowerCase();
  if (NOTE_MAP[k]) {
    userStartAudio();

    let note = NOTE_MAP[k];
    currentNoteInfo = note;

    // ① 周波数を設定して音量を上げる
    osc.freq(note.freq);
    osc.amp(0.4, 0.02);

    // ② 音階のイメージ引数（hue, speed, size）を渡して円インスタンスを生成！
    for (let i = 0; i < 3; i++) {
      circles.push(new NoteCircle(note.hue, note.speed, note.size));
    }
  }
}

function keyReleased() {
  // キーを離したら0.2秒かけて自然に音量を0にする
  osc.amp(0, 0.2);
}

function draw() {
  // 少し残像が残るように透明度付きの背景を塗る
  background(220, 30, 8, 25);

  // 配列内のすべての円を更新・描画（後ろからループして消えた円を安全に削除）
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].render();

    // 寿命が尽きた（透明になった）円を配列から削除する
    if (circles[i].isDead()) {
      circles.splice(i, 1);
    }
  }

  // ガイドUIの表示
  drawGuideUI();
}

function drawGuideUI() {
  fill(0, 0, 100, 80);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("🎹 [A]ド [S]レ [D]ミ [F]ファ [G]ソ [H]ラ [J]シ [K]ド を叩いて演奏しよう！", width / 2, 40);

  if (currentNoteInfo) {
    fill(currentNoteInfo.hue, 80, 100);
    textSize(28);
    text(`${currentNoteInfo.name} (${currentNoteInfo.freq} Hz)`, width / 2, 80);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

キーボードの `A`〜`K` をリズミカルに叩いてみてください！
低い「ド（`A`）」を叩くと**大きな赤い円がゆったりと重厚に広がり**、高い「ド（`K`）」を叩くと**小さなピンクの光の粒が高速でスパーク**します。

---

## 3-6. 【練習】生成AIを使ってクラスを改造・新規作成してみよう

ここまでできたら、練習として生成AI（ChatGPT / Claude / Gemini 等）を活用し、`NoteCircle` クラスを改造するか、まったく別の新しいビジュアルクラスを作ってみましょう！

例えば、**「低い音（A〜Fキー）は重厚な波紋クラス、高い音（G〜Kキー）は弾ける星型クラス」** のようにクラスを使い分けると、世界観が一気に広がります。

### クラス改造・新規作成用 AI プロンプト

以下のプロンプトをコピーし、**【作りたい表現・改造内容】** を自分のアイデアに書き換えてAIに入力してください。

```markdown
あなたはクリエイティブコーディング（p5.js）のスペシャリストです。
キーボードで「ドレミファソラシド」を鳴らした瞬間に画面中央から出現し、徐々に消えていくビジュアルエフェクトのJavaScriptクラスを作成してください。

### 1. 作りたい表現・改造内容
【ここに作りたい動きや形を記述してください】
（例:
- 「回転しながら飛び出し、重力に引かれて下へ放物線を描いて落ちていく星型パーティクル」
- 「中央から外側へ向かってリング状の波紋が3重に広がりながら消えていくエフェクト」
- 「ジグザグ（稲妻のよう）にランダム折れ線を描きながら外へ走るネオンレーザー」
- 「螺旋（スパイラル）を描きながら渦巻き状に広がって消えていく光の粒」など）

### 2. 必須のクラス設計（インターフェース仕様）
現在の `sketch.js` からそのまま呼び出せるよう、以下のメソッドと引数を厳守してください：

1. `constructor(hue, speed, size)`:
   - 画面中央（`width / 2`, `height / 2`）を初期位置とすること。
   - 引数で受け取った `hue`（色相: 0〜360）、`speed`（移動や拡大の速さ）、`size`（基本サイズ）を反映させること。
   - 寿命 `this.lifespan = 100` を持ち、時間とともに減少させること。

2. `update()`:
   - 座標の移動、回転角の更新、サイズの変形、および `this.lifespan` の減衰処理を行うこと。

3. `render()`:
   - キャンバスはすでに `colorMode(HSB, 360, 100, 100, 100)` および `angleMode(DEGREES)` に設定されています。
   - 必ず `push()` と `pop()` で囲み、`translate(this.x, this.y)` を使って描画し、透明度には `this.lifespan` を利用すること。

4. `isDead()`:
   - `return this.lifespan <= 0;` で寿命判定を返すこと。

### 3. 出力ルール
- 完成した JavaScript のクラスコードのみを出力してください。
- 初心者にもわかりやすい日本語の解説コメントを付けてください。
```

<aside>
💡 **発展アイデア**
- 新しいクラス（例：`NoteStar.js`）として保存した場合、`index.html` で読み込んだ上で、`sketch.js` の `new NoteCircle(...)` の部分を `new NoteStar(...)` に書き換えるだけで一発で差し替えられます！
- `NOTE_MAP` のデータに `shape: 'star'` などの項目を増やして、音階ごとに呼び出すクラスを変えてみるのもおすすめです。
</aside>

---

# 4. 音楽ファイルを鳴らす（音声ファイルのロードと再生制御）

プログラムで単音を鳴らす仕組みと「周波数（Hz）」の感覚が掴めたら、次はいよいよ好きな音楽ファイル（mp3）を丸ごと読み込み、画面クリックやキーボード操作で再生・一時停止する基本構成を作ってみましょう。

## 4-1. プロジェクトの準備とディレクトリ構成

プロジェクト内に `assets/` フォルダを作成し、BGMとして鳴らしたい音声ファイル（`bgm.mp3`）を配置してください。

```text
05_audio_visual/
├── index.html
├── assets/
│   └── bgm.mp3       // 好きな音楽ファイル（テンポがはっきりした曲がおすすめ）
└── js/
    └── sketch.js
```

<aside>
💡 **音源について**

テンポ感があり、ドラムのキック（低音）やハイハット（高音）がはっきりしている楽曲（EDM、HipHop、エレクトロニック、クラブミュージック等）を選ぶと、後の周波数解析（FFT）でビジュアルが気持ちよく跳ねます。
著作権フリーのBGMサイト（DOVA-SYNDROME、甘茶の音楽工房、OtoLogic等）からダウンロードしたmp3でOKです。
</aside>

---

## 4-2. 音声ファイルのロードと再生制御

続いて、実際に音声ファイル（`bgm.mp3`）を読み込んで再生・停止を制御してみましょう。

p5.js v2 では、JavaScript標準の非同期処理構文である **`async / await`** を `setup()` 関数で直接使用できます。従来の `preload()` 関数を別途書く必要がなくなり、`async function setup()` の中で `await loadSound('assets/bgm.mp3')` と書くことで、音声ファイルの読み込み完了を待機してから初期設定をスマートに行うことができます。

**`js/sketch.js`**

```javascript
let bgm;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  // ① 音声ファイルの非同期読み込み（完了を待機）
  bgm = await loadSound('assets/bgm.mp3');
}

// 画面クリックで再生 / 一時停止
function mousePressed() {
  togglePlay();
}

// スペースキーでも再生 / 一時停止
function keyPressed() {
  if (key === ' ') {
    togglePlay();
  }
}

// 再生と一時停止を切り替える関数
function togglePlay() {
  // ブラウザのAutoplay制約を安全に解除
  userStartAudio();

  // 音声ファイルの読み込みが完了していない場合は何もしない
  if (!bgm) return;

  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.loop(); // ループ再生
  }
}

function draw() {
  background(220, 30, 10);

  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textSize(24);

  if (!bgm) {
    text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
  } else if (bgm.isPlaying()) {
    text("🎵 音楽を再生中...（クリックまたは[Space]で一時停止）", width / 2, height / 2);
  } else {
    text("▶ 画面クリック または [Space] キーで音楽を再生", width / 2, height / 2);
  }
}

// ウィンドウリサイズ対応
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

<aside>
⚠️ **重要：Live Server 等のローカルサーバーで開いてください**

音声ファイルのロード（`loadSound`）はブラウザのセキュリティ仕様（CORSポリシー）により、ローカルファイルを直接ダブルクリックして開く（`file:///...`）とエラーになります。
必ず VS Code の **Live Server 拡張機能** などを使い、`http://127.0.0.1:5500/...` のローカルサーバー環境でブラウザを開いてください。
</aside>

画面をクリックするか、スペースキーを押して、音楽がスムーズにループ再生・一時停止されることを確認してください。

---

# 5. 音を視覚化する（振幅 Amplitude と 周波数解析 FFT）

音が鳴ったら、次は **「音のデータをリアルタイムに数値として取り出す」** ステップに進みます。
音を解析するアプローチには大きく分けて2つあります。

| 解析アプローチ | 使用クラス | 取得データ・数値範囲 | 主な対象（楽器・音） | 向いている演出・視覚効果 |
|---|---|---|---|---|
| **① 音量解析** | `p5.Amplitude` | 全体の音の大きさ (`0.0 〜 1.0`) | 楽曲全体のボリューム | 全体の脈動、明度変化、スケール変化 |
| **② 周波数解析** | `p5.FFT` | **低音 Bass** (`0 〜 255`) | キック、ベース | 迫力・衝撃波（画面の拡大・脈動） |
| **② 周波数解析** | `p5.FFT` | **中音 Mid** (`0 〜 255`) | ボーカル、シンセ | 形状変化・うねり（波打ち・変形） |
| **② 周波数解析** | `p5.FFT` | **高音 Treble** (`0 〜 255`) | ハイハット、シンバル | スパーク・光の粒（火花・きらめき） |

---

## 5-1. 音の大きさ（音量）を測る：`p5.Amplitude`

**`p5.Amplitude`** は、現在鳴っている音の「総合的な音量（振幅の大きさ）」を `0.0（無音）〜 1.0（最大音量）` の数値で返してくれる最もシンプルな解析クラスです。

```javascript
let amplitude;

function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitude = new p5.Amplitude(); // 音量解析オブジェクトの生成
}

function draw() {
  background(220, 30, 10, 20);

  // 現在の音量レベルを取得（0.0 〜 1.0）
  let level = amplitude.getLevel();

  // 音量に合わせて中央の円を拡大
  let size = map(level, 0, 0.5, 50, 400);

  fill(180, 80, 100);
  noStroke();
  circle(width / 2, height / 2, size);
}
```

音量解析だけでも円の大きさをビートに合わせて変化させられますが、これだけでは **「重低音のズシンというドラム」** も **「甲高いシンバルのシャーンという音」** も区別できず、すべてひとまとめに反応してしまいます。

そこで登場するのが、メディアアートやVJ演出の主役である **「周波数解析（FFT）」** です！

---

## 5-2. 音を解剖する魔法の数理：`p5.FFT`（高速フーリエ変換）

### FFT（Fast Fourier Transform）とは？
第3章で「ド（261Hz）〜 高いド（523Hz）」のサイン波・三角波を鳴らしましたが、どんなに複雑な音楽も、数学的には **「様々な高さ（周波数 Hz）の純音（サイン波）が幾重にも重なり合ってできたもの」** です。
FFT（高速フーリエ変換）とは、この混ざり合った音の波を瞬時に分解し、**「どの周波数（低音・中音・高音）が、いまどれくらいの強さで鳴っているか」** を配列として取り出すアルゴリズムです。

### `p5.FFT` の生成と初期設定
```javascript
fft = new p5.FFT(smoothing, bins);
```
- **`smoothing`（平滑化係数 / 0.0〜1.0）**:
  数値をどれくらい滑らかにするか。`0.8` 前後に設定すると、ノイズが抑えられ心地よい追従になります（Lerpと同じ考え方です）。
- **`bins`（周波数分解能 / 16〜1024の2の累乗）**:
  周波数をいくつの帯域に切り分けるか。通常は `64` や `128` で十分高精細です。

---

## 5-3. 3大エネルギー帯域の抽出：`getEnergy()`

`fft.analyze()` を実行すると、周波数のスペクトル配列（波形データ）が生成されます。
さらに便利なのが、人間が直感的に理解しやすい音楽帯域を 0〜255 の数値で一発で取り出せる **`fft.getEnergy()`** メソッドです！

| 帯域キーワード | 周波数帯 | 主な楽器・音の特徴 | VJ・アート演出での定番の役割 |
|---|---|---|---|
| **`"bass"`** | 低音域（約20〜140Hz） | ドラムのキック、ベース音、爆発音 | **画面全体の拡大・衝撃波・カメラシェイク・心臓の脈動** |
| **`"mid"`** | 中音域（約400〜2600Hz） | 人の声（ボーカル）、ピアノ、メロディシンセ | **メインオブジェクトの形状変化・うねり・波打ち** |
| **`"treble"`** | 高音域（約5200〜14000Hz） | ハイハット、シンバル、ベル、金属音 | **光のスパーク、火花、細かなパーティクルの放出、発光** |

### イコライザー波形と3大エネルギーを可視化するコード

実際に周波数波形と3大エネルギー（Bass / Mid / Treble）を画面に描画して観察してみましょう。

**`js/sketch.js`**

```javascript
let bgm;
let fft;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  // 音声ファイルの非同期読み込み
  bgm = await loadSound('assets/bgm.mp3');

  // FFT解析の初期化（平滑化0.8、64バンド）
  fft = new p5.FFT(0.8, 64);
}

// 画面クリックで再生 / 一時停止
function mousePressed() {
  togglePlay();
}

// スペースキーでも再生 / 一時停止
function keyPressed() {
  if (key === ' ') {
    togglePlay();
  }
}

function togglePlay() {
  userStartAudio();
  if (!bgm) return;

  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.loop();
  }
}

function draw() {
  // 残像エフェクト（暗い背景）
  background(220, 30, 10, 25);

  if (!bgm) {
    fill(0, 0, 80);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
    return;
  }

  if (!bgm.isPlaying()) {
    fill(0, 0, 80);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("画面クリック または [Space] キーで音楽を再生してください", width / 2, height / 2);
    return;
  }

  // ① FFT解析を実行（スペクトル配列を取得）
  let spectrum = fft.analyze();

  // ② 3大エネルギーを取得（0 〜 255）
  let bass   = fft.getEnergy("bass");
  let mid    = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  // ③ 画面下部にイコライザー波形を描画
  let barWidth = width / spectrum.length;
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let barHeight = map(spectrum[i], 0, 255, 0, height * 0.4);
    let hueVal = map(i, 0, spectrum.length, 160, 320);
    fill(hueVal, 80, 100, 80);
    rect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
  }

  // ④ 画面中央に 3大エネルギーを円で可視化
  push();
  translate(width / 2, height / 2 - 50);

  // 【低音 Bass】中央の巨大な円（キックでドクンと跳ねる）
  let bassSize = map(bass, 0, 255, 60, 300);
  fill(340, 80, 100, 40);
  circle(0, 0, bassSize * 1.4);
  fill(340, 90, 100, 80);
  circle(0, 0, bassSize);

  // 【中音 Mid】回転する多角形（ボーカル・メロディで変形）
  let midSize = map(mid, 0, 255, 40, 180);
  push();
  rotate(frameCount * 0.02);
  noFill();
  stroke(180, 80, 100, 90);
  strokeWeight(3);
  rectMode(CENTER);
  rect(0, 0, midSize, midSize);
  pop();

  // 【高音 Treble】周囲にきらめく火花（シンバルで弾ける）
  let trebleCount = floor(map(treble, 0, 255, 0, 16));
  stroke(60, 90, 100, 90);
  strokeWeight(4);
  for (let i = 0; i < trebleCount; i++) {
    let angle = TWO_PI / trebleCount * i + frameCount * 0.05;
    let dist = bassSize * 0.7 + random(10, 40);
    point(cos(angle) * dist, sin(angle) * dist);
  }

  pop();

  // 数値デバッグ表示
  fill(0, 0, 100);
  textAlign(LEFT, TOP);
  textSize(14);
  text(`Bass   : ${bass}`, 20, height - 80);
  text(`Mid    : ${mid}`, 20, height - 60);
  text(`Treble : ${treble}`, 20, height - 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

ブラウザで再生してみてください。
低音（バスドラム）が鳴るたびに赤い円がドクンと膨張し、中音でシアンの四角形がゆらぎ、シンバルが鳴ると金色の火花が飛び散るはずです。
このように、**「音を帯域別に分けて異なるビジュアル要素に割り振る」** ことが、本格的なオーディオビジュアル制作の第一歩です。

---

# 6. マイク入力への切り替え（オプション）

音楽ファイルだけでなく、PCの内蔵マイクを使って **「自分の声」** や **「手拍子」「口笛」** でアートを動かすことも極めて簡単に実装できます。

```javascript
let mic;
let fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // マイク入力の初期化と開始
  mic = new p5.AudioIn();
  mic.start();

  // マイクの音声をFFTの入力ソースに設定！
  fft = new p5.FFT(0.8, 64);
  fft.setInput(mic);
}

function touchStarted() {
  userStartAudio(); // マイクの起動ロック解除
}
```

展示作品や体験型インスタレーションで「マイクに声を吹きかけると花が開く」「拍手すると雷が落ちる」といった演出を作りたい場合は、この `p5.AudioIn` を使用してください。

---

# 7. 単元4のクラスをそのまま流用する（モジュール化の真価）

ここからが本単元のハイライトです！

前回（単元4）の講義を思い出してください。私たちは、`sketch.js` の中に全部の処理をごちゃ混ぜに書くのではなく、
- 描画する部品を独立したクラス（`Orb.js`, `Ripple.js`, `WaveLine.js`）として切り分け、
- それぞれ **「外部から数値（`update(val)`）を受け取って動くだけ」** という設計にしました。

| 対象部品（クラス） | 前回（単元4）：センサー連動 | 今回（単元5）：音響連動（VJ） |
|---|---|---|
| **ハブ (`sketch.js`) への入力** | Arduino 距離センサー値 (`0.0 〜 1.0`) | 音楽の周波数解析（`p5.FFT`） |
| **`Orb.js` (発光球)** | `sensorValue`（手の距離で鼓動） | **`normBass`（低音）**：キック音でドクンと鼓動 |
| **`Ripple.js` (波紋)** | `sensorValue`（手の距離で波紋拡大） | **`normTreble`（高音）**：ハイハット音でパッと弾ける |
| **`WaveLine.js` (波線)** | `sensorValue`（手の距離で波立ち） | **`normMid`（中音）**：ボーカル・シンセで波打つ |

前回のクラスのコード（`Orb.js`, `Ripple.js`, `WaveLine.js`）は、**なんと1行も書き換える必要がありません！**
ハブである `sketch.js` の中で、**「渡す数値をセンサー値から、FFTで解析した音のエネルギー（0.0〜1.0）へ差し替えるだけ」** で、前回のジェネラティブアートが瞬時に超絶クオリティのVJアートへと生まれ変わります。

---

## 7-1. ディレクトリ構成の確認

前回の `js/templates/` フォルダの中身をそのまま配置します。

```text
05_audio_visual/
├── index.html
├── assets/
│   └── bgm.mp3
└── js/
    ├── sketch.js
    └── templates/
        ├── Orb.js        // ★ 前回のコードそのまま！
        ├── Ripple.js     // ★ 前回のコードそのまま！
        └── WaveLine.js   // ★ 前回のコードそのまま！
```

**`index.html`** に前回のクラスファイルを読み込ませます：

```html
  <!-- ① p5.js ライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5@2/lib/p5.min.js"></script>
  <!-- ② p5.sound アドオンライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5.sound/dist/p5.sound.min.js"></script>

  <!-- クラス部品テンプレートの読み込み -->
  <script src="./js/templates/Orb.js"></script>
  <script src="./js/templates/Ripple.js"></script>
  <script src="./js/templates/WaveLine.js"></script>

  <!-- メインハブ -->
  <script src="./js/sketch.js"></script>
```

---

## 7-2. 音響エネルギーのデータパイプライン

FFTから取得した `bass`, `mid`, `treble` は `0〜255` の整数です。
前回のクラスたちは `0.0〜1.0` の正規化された数値を受け取る設計になっているため、おなじみの3ステップで整形します：

```javascript
// 1. 低音（0〜255）を 0.0〜1.0 に正規化
let targetBass = map(bass, 0, 255, 0.0, 1.0);

// 2. Lerp平滑化で突発的なカクつきを吸収し、ヌルヌル動かす
smoothBass = lerp(smoothBass, targetBass, 0.15);

// 3. 部品へ届ける！
for (let orb of orbs) {
  orb.update(smoothBass); // ★ オーブに低音を渡す！
  orb.render();
}
```

---

## 7-3. 音響連動VJ `sketch.js` の実装

**`js/sketch.js`**

```javascript
let bgm;
let fft;

// クラスのインスタンス配列
let orbs = [];
let ripples = [];
let waveLines = [];

// 平滑化された音響エネルギー（0.0 〜 1.0）
let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  // 音声ファイルの非同期読み込み
  bgm = await loadSound('assets/bgm.mp3');

  fft = new p5.FFT(0.8, 64);

  // ① Orb（発光球）を30個生成
  for (let i = 0; i < 30; i++) {
    let rx = random(width * 0.1, width * 0.9);
    let ry = random(height * 0.1, height * 0.9);
    orbs.push(new Orb(rx, ry));
  }

  // ② Ripple（波紋）を8個生成
  for (let i = 0; i < 8; i++) {
    let rx = random(width * 0.2, width * 0.8);
    let ry = random(height * 0.2, height * 0.8);
    ripples.push(new Ripple(rx, ry));
  }

  // ③ WaveLine（波打つライン）を5本生成
  for (let i = 0; i < 5; i++) {
    let y = map(i, 0, 4, height * 0.2, height * 0.8);
    waveLines.push(new WaveLine(y));
  }
}

// 画面クリックで再生 / 一時停止
function mousePressed() {
  togglePlay();
}

// スペースキーでも再生 / 一時停止
function keyPressed() {
  if (key === ' ') {
    togglePlay();
  }
}

function togglePlay() {
  userStartAudio();
  if (!bgm) return;

  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.loop();
  }
}

function draw() {
  // 残像エフェクト
  background(220, 30, 8, 20);

  if (!bgm) {
    fill(0, 0, 80);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("⏳ 音声ファイルを読み込み中...", width / 2, height / 2);
    return;
  }

  if (!bgm.isPlaying()) {
    fill(0, 0, 80);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("画面クリック または [Space] キーで VJ をスタート！", width / 2, height / 2);
    return;
  }

  // 1. FFT解析と帯域別エネルギー抽出
  fft.analyze();
  let rawBass   = fft.getEnergy("bass");
  let rawMid    = fft.getEnergy("mid");
  let rawTreble = fft.getEnergy("treble");

  // 2. 正規化とLerp平滑化
  smoothBass   = lerp(smoothBass,   map(rawBass,   0, 255, 0.0, 1.0), 0.15);
  smoothMid    = lerp(smoothMid,    map(rawMid,    0, 255, 0.0, 1.0), 0.15);
  smoothTreble = lerp(smoothTreble, map(rawTreble, 0, 255, 0.0, 1.0), 0.2);

  // 3. 各クラスに最適な周波数帯域を割り振って更新・描画！

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

  // 【前面レイヤー】Orb には重低音（キック・ベースの爆発）を渡す
  for (let orb of orbs) {
    orb.update(smoothBass);
    orb.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

ブラウザで再生してみてください！
- バスドラム（低音）の重低音に合わせて `Orb` がドクンと鼓動して光を放ち、
- メロディ（中音）に合わせて背景の `WaveLine` が生き物のように波打ち、
- ハイハット（高音）に合わせて `Ripple` の波紋がパッパッと弾ける！

前回のクラス設計を一切変えることなく、音響データと完璧に同期した圧巻のオーディオビジュアルが完成しました。
これがプログラミングにおける **「モジュール化（カプセル化）」** の最大のメリットです。

---

# 8. 音 × センサーのマルチモーダル統合（VJシステムの完成）

いよいよ最後のピース、**Arduinoの物理センサー（赤外線距離センサー）** を再び接続します！

```text
「音楽のビートに合わせてアートが自動で跳ねる」
　　＋
「手を近づけると、全体の色相が劇的に変化し、空間が歪む」
```

このように、**「音楽（時間軸のルール）」** と **「フィジカル（空間軸の人間操作）」** が融合したとき、画面を見ている人には **「まるで自分が魔法の手で音楽と映像を直接操っている」** かのような強烈な手応え（マルチモーダル体験）が生まれます。

| 入力ソース | 取得データ | 渡されるクラス | マルチモーダル演出効果 |
|---|---|---|---|
| **🎵 音楽 (`p5.FFT`)**<br>×<br>**✋ Arduino 距離センサー** | 低音（Bass）<br>×<br>手の距離 (`sensorValue`) | **`Orb`**<br>(発光球) | **低音でドクンと跳ね、手を近づけると色相が劇変・激しく鼓動** |
| **🎵 音楽 (`p5.FFT`)**<br>×<br>**✋ Arduino 距離センサー** | 中音（Mid）<br>×<br>手の距離 (`sensorValue`) | **`WaveLine`**<br>(波打つライン) | **メロディで波打ち、手を近づけると振幅とうねりが空間ごと歪む** |
| **🎵 音楽 (`p5.FFT`)**<br>×<br>**✋ Arduino 距離センサー** | 高音（Treble）<br>×<br>手の距離 (`sensorValue`) | **`Ripple`**<br>(波紋) | **シンバルで弾け、手を近づけると波紋の広がりと残像がブースト** |

---

## 8-1. `sensor.js` の復活と HTML への追加

単元4で作成した独立通信モジュール **`js/sensor.js`** をプロジェクトに配置します。

```text
05_audio_visual/
├── index.html
├── assets/
│   └── bgm.mp3
└── js/
    ├── sensor.js     // ★ 単元4の通信モジュール！
    ├── sketch.js     // ★ 統合ハブ
    └── templates/
        ├── Orb.js
        ├── Ripple.js
        └── WaveLine.js
```

**`index.html`** にスクリプトタグを追加します：

```html
  <!-- ① p5.js ライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5@2/lib/p5.min.js"></script>
  <!-- ② p5.sound アドオンライブラリ -->
  <script src="https://cdn.jsdelivr.net/npm/p5.sound/dist/p5.sound.min.js"></script>

  <!-- シリアル通信モジュール -->
  <script src="./js/sensor.js"></script>

  <!-- クラス部品テンプレート -->
  <script src="./js/templates/Orb.js"></script>
  <script src="./js/templates/Ripple.js"></script>
  <script src="./js/templates/WaveLine.js"></script>

  <!-- メインハブ -->
  <script src="./js/sketch.js"></script>
```

---

## 8-2. 統合ハブ `js/sketch.js` の完全実装コード

音楽の周波数エネルギーと、センサーの手の接近値（`0.0〜1.0`）を美しく掛け合わせて各クラスに渡します。

**`js/sketch.js`**

```javascript
/**
 * 05_audio_visual - 音 × 映像 × センサー 統合VJシステム
 */

// センサー調整用定数（環境に合わせて調整）
const SENSOR_MIN = 100;
const SENSOR_MAX = 600;
const SENSOR_LERP = 0.08;

let sensorTarget = 0.0;
let sensorValue  = 0.0; // 0.0 (遠い) 〜 1.0 (近い)

// サウンド & FFT
let bgm;
let fft;

let smoothBass   = 0;
let smoothMid    = 0;
let smoothTreble = 0;

// クラスインスタンス配列
let orbs = [];
let ripples = [];
let waveLines = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  // 音声ファイルの非同期読み込み
  bgm = await loadSound('assets/bgm.mp3');

  fft = new p5.FFT(0.8, 64);

  // インスタンスの一括生成
  for (let i = 0; i < 35; i++) {
    orbs.push(new Orb(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.9)));
  }
  for (let i = 0; i < 10; i++) {
    ripples.push(new Ripple(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8)));
  }
  for (let i = 0; i < 6; i++) {
    let y = map(i, 0, 5, height * 0.15, height * 0.85);
    waveLines.push(new WaveLine(y));
  }
}

// 画面クリックで音楽の再生/一時停止
function mousePressed() {
  togglePlay();
}

function togglePlay() {
  userStartAudio();
  if (!bgm) return;

  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.loop();
  }
}

function draw() {
  // 手を近づけると残像が伸びて幻想的な光の尾を引く演出
  let bgAlpha = map(sensorValue, 0, 1, 25, 8);
  background(220, 30, 8, bgAlpha);

  // ① Arduino センサー値のデータパイプライン処理
  if (Sensor.isConnected) {
    let raw = Sensor.raw;
    let clamped = constrain(raw, SENSOR_MIN, SENSOR_MAX);
    sensorTarget = map(clamped, SENSOR_MIN, SENSOR_MAX, 0.0, 1.0);
    sensorValue = lerp(sensorValue, sensorTarget, SENSOR_LERP);
  }

  // ② 音響解析（FFT）処理
  if (bgm && bgm.isPlaying()) {
    fft.analyze();
    let rawBass   = fft.getEnergy("bass");
    let rawMid    = fft.getEnergy("mid");
    let rawTreble = fft.getEnergy("treble");

    smoothBass   = lerp(smoothBass,   map(rawBass,   0, 255, 0.0, 1.0), 0.15);
    smoothMid    = lerp(smoothMid,    map(rawMid,    0, 255, 0.0, 1.0), 0.15);
    smoothTreble = lerp(smoothTreble, map(rawTreble, 0, 255, 0.0, 1.0), 0.2);
  }

  // ③【マルチモーダル合成】音のビート ＋ 手の距離を合成してクラスへ届ける！
  // 例: 基本は音で跳ねつつ、手を近づけると激しさがブーストされる
  let bassCombined   = constrain(smoothBass   + sensorValue * 0.6, 0.0, 1.0);
  let midCombined    = constrain(smoothMid    + sensorValue * 0.6, 0.0, 1.0);
  let trebleCombined = constrain(smoothTreble + sensorValue * 0.6, 0.0, 1.0);

  // 背景：WaveLine
  for (let line of waveLines) {
    line.update(midCombined);
    line.render();
  }

  // 中景：Ripple
  for (let ripple of ripples) {
    ripple.update(trebleCombined);
    ripple.render();
  }

  // 前景：Orb
  for (let orb of orbs) {
    orb.update(bassCombined);
    orb.render();
  }

  // ④ UI & ステータス表示
  drawStatusUI();
}

function drawStatusUI() {
  push();
  fill(0, 0, 100);
  textSize(14);
  textAlign(LEFT, BOTTOM);

  let serialText = Sensor.isConnected 
    ? `🟢 Arduino 接続中 (raw: ${Sensor.raw} ➔ val: ${sensorValue.toFixed(2)})`
    : `⚪ [C] キーを押して Arduino を接続`;

  let audioText = (bgm && bgm.isPlaying())
    ? `🎵 音楽再生中 (Bass: ${(smoothBass*100).toFixed(0)}% / Treble: ${(smoothTreble*100).toFixed(0)}%)`
    : `❚❚ 音楽停止中（クリックまたは[Space]で再生）`;

  text(`${serialText}  |  ${audioText}`, 20, height - 20);
  pop();
}

// キーボード操作
function keyPressed() {
  // [C] キーで Arduino 接続
  if ((key === 'c' || key === 'C') && !Sensor.isConnected) {
    Sensor.connect();
  }
  // [Space] キーで音楽の再生/一時停止
  if (key === ' ') {
    togglePlay();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

### 体験してみよう！
1. ブラウザをリロードし、**画面をクリック（または `[Space]` キー）** して音楽を再生します。
   （音がリズムに合わせて心地よく画面を揺らします）
2. キーボードの **`[C]` キー** を押し、Arduino Nano R4 のシリアルポートを選択して接続します。
3. センサーの前に手をかざしてみましょう。
   - 音楽のビートに合わせてオーブや波紋が跳ねている空間に、
   - 手をスーッと近づけると、全体の色相が一気にサイバーなネオンカラーに変色し、残像が幾重にも伸び、波打ちが劇的に激しくなります！

音楽という **「時間の波」** と、センサーという **「身体の波」** が一体となった、極めて完成度の高いインタラクティブ・アートの誕生です。

---

# 9. 生成AIを活用したオリジナルVJクラスの量産

単元4と同様に、生成AI（ChatGPT, Claude, Gemini等）を活用して、音とセンサーの両方に反応する **「新しい第4のVJクラス」** を自作してみましょう！

## 9-1. VJクラス生成用 AI プロンプト（テンプレート）

以下のプロンプトをコピーし、**【作りたい演出モチーフ】** を書き換えてAIに入力してください。

```markdown
あなたはクリエイティブコーディング（p5.js）およびオーディオビジュアル（VJ演出）のスペシャリストです。
以下の仕様と共通ルールに厳密に従って、音楽とセンサーに反応する新しいJavaScriptクラスを作成してください。

### 1. 表現したいモチーフ・世界観
【ここに作りたい表現を具体的に記述してください】
（例:
- 「低音（Bass）のキックが鳴ると中心から外側へ高速に幾何学的な破片が飛び散る爆発エフェクト」
- 「高音（Treble）に反応して夜空に細かく弾ける放電レーザー・プラズマスパーク」
- 「中音（Mid）のメロディに合わせて曼荼羅のように多角形が回転・展開する万華鏡ポリゴン」
- 「音量と手の接近に合わせて触手がうねりながら画面を覆うサイバーネオンワーム」など）

### 2. 必須のクラス設計（インターフェース仕様）
クラス名はモチーフに合わせた英単語とし、以下のメソッドを実装してください：

1. `constructor(x, y)`:
   - 座標、基本サイズ、初期色相、寿命、速度などを `this.` プロパティとして設定すること。
   - `random()` を活用して個体ごとに個性を持たせること。

2. `update(energy)`:
   - 引数 `energy` には、音楽の帯域エネルギーと距離センサー値が合成された数値（0.0 〜 1.0）が毎フレーム渡されます。
   - この `energy` を使って、サイズ拡大、移動速度の加速、色相の劇的シフト、回転スピード、透明度のフェードアウトなどを制御してください。
   - 画面外に出た場合や寿命が尽きた際のリセット（再利用）処理を含めてください。

3. `render()`:
   - キャンバスはすでに `colorMode(HSB, 360, 100, 100, 100);` に設定されています。
   - 必ず `push()` と `pop()` で囲み、スタイル汚染を防ぐこと。
   - `translate(this.x, this.y)` を使用し、自身の相対座標で描画命令を記述すること。

### 3. 出力ルール
- 完成した JavaScript のクラスコードのみを出力してください。
- 初心者にもわかりやすい日本語の解説コメントを各行に付けてください。
```

出力されたコードを `js/templates/新しいクラス名.js` として保存し、`index.html` に `<script>` を追加して `sketch.js` から呼び出してみましょう。

---

# 10. 課題

## 10-1. 課題内容
本日の総まとめとして、**「音楽（またはマイク入力）」と「Arduinoの距離センサー」を融合させた、オリジナルのインタラクティブ・オーディオビジュアル（VJ）作品** を制作してください。

### 【制作条件】
1. **p5.sound による周波数解析（FFT）の実装**:
   - `fft.getEnergy()` を使用し、少なくとも2つ以上の周波数帯域（低音 Bass、中音 Mid、高音 Treble など）を抽出して、それぞれ異なるビジュアル要素へマッピングすること。
2. **クラスの活用（3つ以上）**:
   - `Orb`, `Ripple`, `WaveLine` の改造、または生成AIで出力した完全オリジナルクラスを含め、独立したクラスファイルを最低3つ以上組み込むこと。
3. **センサー（Web Serial）との複合演出**:
   - 音のビートに反応するだけでなく、手の距離（または明るさセンサー）によって色・広がり・残像などのビジュアルパラメータがダイナミックに変化すること。
4. **テーマと演出の調律**:
   - 選択した楽曲のジャンル・テンポ（BPM）に合わせて、アートの色彩や動きのスピード感を気持ちよく調律すること。

---

## 10-2. 次回へのステップ
次回（単元7）は、いよいよ **「音楽そのものを自分でプログラミングして創り出す」** 体験へ進みます！
ブラウザ完結の最先端ライブコーディング環境 **「Strudel (https://strudel.cc/ )」** を使ってオリジナルのビートやループトラックを作成し、今日作ったジェネラティブアートと合体させます。お楽しみに！
