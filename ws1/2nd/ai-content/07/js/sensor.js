/**
 * sensor.js - ゲーム用マルチセンサー受信モジュール
 * =================================================================
 * 【機能】
 * 1. Web Serial API を用いて Arduino から CSV データを受信
 * 2. ジョイスティックのデッドゾーン処理 ＆ -1.0〜+1.0 への正規化
 * 3. 明るさセンサーによる昼夜判定（isNight）
 * 4. キーボードによるフォールバック（Arduino未接続でもテスト可能）
 * =================================================================
 */

const Sensor = {
  isConnected: false, // Arduinoと接続中かどうか

  // ゲーム側で参照する加工済みパラメータ
  joyX: 0,            // -1.0 (左) 〜 +1.0 (右)
  joyY: 0,            // -1.0 (上) 〜 +1.0 (下)
  rawLight: 700,      // 明るさ生値（0〜1023）
  isNight: false,     // true: 夜モード / false: 昼モード

  // 調整用パラメータ
  lightThreshold: 400, // 昼夜の境目となる明るさ（部屋の環境に合わせて調整）
  deadZone: 40,        // ジョイスティックの不感帯（遊びの幅）

  /**
   * Web Serial API で Arduino への接続を開始する
   */
  async connect() {
    if (!('serial' in navigator)) {
      alert('お使いのブラウザは Web Serial API に対応していません。Google Chrome または Microsoft Edge を使用してください。');
      return;
    }

    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      this.isConnected = true;
      console.log('🟢 Arduinoコントローラーに接続しました');

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += value;
        const lines = buffer.split('\n');
        buffer = lines.pop(); // 改行で終わっていない不完全な末尾を保持

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // カンマで分割: "joyX,joyY,light"
          const parts = trimmed.split(',');
          if (parts.length >= 3) {
            const rawX = parseInt(parts[0], 10);
            const rawY = parseInt(parts[1], 10);
            const rawL = parseInt(parts[2], 10);

            if (!isNaN(rawX) && !isNaN(rawY) && !isNaN(rawL)) {
              this.updateValues(rawX, rawY, rawL);
            }
          }
        }
      }
    } catch (err) {
      console.error('接続エラーまたは切断されました:', err);
      this.isConnected = false;
    }
  },

  /**
   * 生データをゲーム操作値へ変換
   */
  updateValues(rawX, rawY, rawL) {
    // 1. ジョイスティックの加工（中心512を基準に -512〜+511 へ）
    let dx = rawX - 512;
    let dy = rawY - 512;

    // デッドゾーン処理（中心付近のブレを無視）
    if (Math.abs(dx) < this.deadZone) dx = 0;
    if (Math.abs(dy) < this.deadZone) dy = 0;

    // -1.0 〜 +1.0 の滑らかな範囲に正規化
    this.joyX = Math.max(-1, Math.min(1, dx / (512 - this.deadZone)));
    this.joyY = Math.max(-1, Math.min(1, dy / (512 - this.deadZone)));

    // 2. 明るさセンサーの加工
    this.rawLight = rawL;
    this.isNight = (rawL < this.lightThreshold);
  },

  /**
   * キーボードによるフォールバック更新
   * （Arduino未接続時に draw() 内から毎フレーム呼び出す）
   */
  updateKeyboard() {
    if (this.isConnected) return; // Arduino接続中はキーボード移動をスキップ

    let x = 0;
    let y = 0;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) x -= 1; // A or Left
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) x += 1; // D or Right
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) y -= 1; // W or Up
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) y += 1; // S or Down

    this.joyX = x;
    this.joyY = y;
  }
};

