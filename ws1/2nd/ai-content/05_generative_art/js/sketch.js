/**
 * =================================================================
 * 🎨 【ハブ】sketch.js - アート選択 & パラメータ調整
 * =================================================================
 * 
 * 【使い方】
 * 1. 下の initArt() 関数の中で、使いたいアートのコメント「1つだけ」を外します。
 * 2. そのアートのパラメータ（数値）を自由に書き換えて、自分だけの世界観を作ってください。
 * 3. 画面上のセレクトボックスからリアルタイムに切り替えてプレビューすることも可能です。
 */

let currentArt;

// =================================================================
// 1. 【ここを編集！】アートの選択とパラメータカスタマイズ
// =================================================================
function initArt(artType = "medusa") {

  // ---------------------------------------------------------------
  // 🔰【ハンズオン用】基本パルス（SimplePulseArt）
  // クラスの仕組み（約35行）を学ぶための最小限テンプレート
  // ---------------------------------------------------------------
  if (artType === "simple") {
    currentArt = new SimplePulseArt({
      baseHue: 200,          // 基本の色相 [0〜360]
      maxRadius: 220,        // 最大半径 [100〜400]
      numRings: 5,           // 同心円の数 [1〜10]
      trailAlpha: 20,        // 残像の濃さ [10〜40]
    });
  }

  // ---------------------------------------------------------------
  // 【選択肢①】深海の発光生物（MedusaArt）
  // 触手としなるスプライン曲線、海中を漂う神秘的な生命体
  // ---------------------------------------------------------------
  else if (artType === "medusa") {
    currentArt = new MedusaArt({
      numArms: 16,           // 触手の本数 [6 〜 32]
      nodesPerArm: 10,       // 関節の数・しなやかさ [4 〜 16]
      baseRadius: 30,        // 核のサイズ [10 〜 80]
      maxSpread: 280,        // 手を近づけた時の最大半径 [150 〜 450]
      pulseSpeed: 0.03,      // 呼吸のスピード [0.01 〜 0.08]
      noiseWiggle: 0.025,    // うねりの細かさ [0.005 〜 0.06]
      baseHue: 180,          // 基本色相 (0:赤, 60:黄, 180:シアン, 320:ピンク)
      hueRange: 90,          // 色相の広がり幅 [20 〜 180]
      trailAlpha: 14,        // 残像の濃さ (小さいほど長い光の尾) [6 〜 30]
      strokeW: 2.0,          // 線の太さ [1.0 〜 5.0]
    });
  }

  // ---------------------------------------------------------------
  // 【選択肢②】幾何学曼荼羅・万華鏡（MandalaArt）
  // 多重回転リングと幾何学ポリゴンが重なり合うサイバー曼荼羅
  // ---------------------------------------------------------------
  else if (artType === "mandala") {
    currentArt = new MandalaArt({
      symmetry: 8,           // シンメトリー角数 (4, 6, 8, 12, 16)
      numLayers: 6,          // 多重リングの層数 [3 〜 10]
      maxRadius: 320,        // 手を近づけた時の最大半径 [150 〜 450]
      rotationSpeed: 0.015,  // 全体の回転スピード [0.005 〜 0.04]
      baseHue: 320,          // 基本色相 (320=マゼンタ, 40=ゴールド, 200=シアン)
      hueRange: 60,          // レイヤーごとの色相シフト幅 [20 〜 120]
      trailAlpha: 20,        // 残像の濃さ [10 〜 40]
      strokeW: 2.2,          // 線の太さ [1.0 〜 5.0]
    });
  }

  // ---------------------------------------------------------------
  // 【選択肢③】オーロラ流線群（FlowFieldArt）
  // パーリンノイズの風に乗って泳ぐ数百本の光のリボン・流体
  // ---------------------------------------------------------------
  else if (artType === "flow") {
    currentArt = new FlowFieldArt({
      numParticles: 400,     // 光の流線の本数 [150 〜 800]
      noiseScale: 0.005,     // 渦の大きさ・滑らかさ [0.002 〜 0.015]
      flowSpeed: 2.2,        // 流れる基本スピード [1.0 〜 5.0]
      baseHue: 160,          // 基本色相 (160=エメラルド, 220=コバルト, 300=マゼンタ)
      hueRange: 100,         // 色相の広がり幅 [30 〜 180]
      trailAlpha: 10,        // 残像の濃さ (小さいほど長くオーロラが残る) [5 〜 25]
      particleSize: 2.0,     // 流線の太さ [1.0 〜 4.0]
    });
  }

  // ---------------------------------------------------------------
  // 【選択肢④】咲き乱れるデジタル開花（BotanicalBloomArt）
  // 黄金螺旋に沿って蕾から大輪の花へ一気に満開になるボタニカルアート
  // ---------------------------------------------------------------
  else if (artType === "bloom") {
    currentArt = new BotanicalBloomArt({
      numPetals: 70,         // 花弁の総枚数 [30 〜 150]
      spiralTightness: 3.8,  // 螺旋の巻きの密度 [2.0 〜 6.0]
      maxBloomRadius: 280,   // 満開時の最大半径 [150 〜 420]
      rotationSpeed: 0.008,  // 花全体のゆっくりした回転速度 [-0.02 〜 0.02]
      baseHue: 340,          // 基本色相 (340=桜ピンク, 40=山吹ゴールド, 280=夜光藤色)
      hueRange: 80,          // 外側に向かうグラデーション幅 [20 〜 140]
      trailAlpha: 18,        // 残像の濃さ [10 〜 35]
      petalWidth: 18,        // 花弁の基本幅 [8 〜 35]
    });
  }

  // ---------------------------------------------------------------
  // 【選択肢⑤】コズミック・星雲メッシュ（CosmicMeshArt）
  // 浮遊する星々同士が光の線で結ばれ、重力で凝縮する宇宙ネットワーク
  // ---------------------------------------------------------------
  else if (artType === "cosmic") {
    currentArt = new CosmicMeshArt({
      numStars: 80,          // 星（ノード）の数 [30 〜 140]
      connectDist: 95,       // 星同士を結ぶ最大距離 [50 〜 160]
      gravityPower: 1.8,     // 手を近づけた時のブラックホール引力 [0.5 〜 3.5]
      baseSpeed: 1.5,        // 星の基本移動スピード [0.5 〜 3.0]
      baseHue: 220,          // 基本色相 (220=コバルト, 280=星雲パープル, 180=サイバーシアン)
      hueRange: 90,          // 色相の広がり幅 [30 〜 180]
      trailAlpha: 16,        // 残像の濃さ [8 〜 30]
      nodeSize: 4.0,         // 星の基本サイズ [2.0 〜 8.0]
    });
  }
}

// =================================================================
// 2. センサー受信用グローバル変数 & 平滑化（Lerp）
// =================================================================
let isConnected = false;
let distTarget = 0.2;     // 距離センサー目標値（0.0: 遠い 〜 1.0: 至近）
let lightTarget = 0.8;    // 明るさセンサー目標値（0.0: 暗黒 〜 1.0: 明るい）

let distCurrent = 0.2;    // Lerpで滑らかに追従する現在値
let lightCurrent = 0.8;

// =================================================================
// 3. p5.js 実行サイクル（setup と draw）
// =================================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  angleMode(RADIANS);

  // 初期アートの生成（デフォルト: medusa）
  initArt("medusa");
}

function draw() {
  // A. マウスによるシミュレーション（Arduino未接続時）
  if (!isConnected) {
    distTarget = constrain(map(mouseX, 0, width, 0.0, 1.0), 0.0, 1.0);
    lightTarget = constrain(map(mouseY, height, 0, 0.0, 1.0), 0.0, 1.0);
  }

  // B. Lerp平滑化（吸い付くような滑らかさを作る）
  distCurrent = lerp(distCurrent, distTarget, 0.08);
  lightCurrent = lerp(lightCurrent, lightTarget, 0.08);

  // UI表示の更新
  const distEl = document.getElementById('dist-val');
  const lightEl = document.getElementById('light-val');
  if (distEl) distEl.textContent = distCurrent.toFixed(2);
  if (lightEl) lightEl.textContent = lightCurrent.toFixed(2);

  // C. 選択中のアートクラスにセンサー値を渡して描画！
  if (currentArt) {
    currentArt.update(distCurrent, lightCurrent);
    currentArt.render();
  }
}

// ウィンドウサイズ変更時に自動リサイズ
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (currentArt && currentArt.initParticles) currentArt.initParticles();
  if (currentArt && currentArt.initStars) currentArt.initStars();
}
