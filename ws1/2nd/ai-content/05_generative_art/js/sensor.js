/**
 * sensor.js - Arduino シリアル通信受信モジュール
 * =================================================================
 * 【役割】
 * Web Serial API を用いて Arduino からのシリアル通信を受信し、
 * 生の数値（Sensor.raw）を保持するだけの純粋な JavaScript モジュールです。
 * 
 * 特定のボタンや HTML 要素（DOM）には一切依存しません。
 * 画面クリック（mousePressed）やキー入力（keyPressed）、
 * 任意のボタンから Sensor.connect() を呼び出すだけで接続できます。
 * 
 * 【使い方】
 * 1. index.html で読み込みます:
 *    <script src="js/sensor.js"></script>
 * 
 * 2. sketch.js でトリガー（クリックやキー等）を設定して接続します:
 *    function keyPressed() {
 *      if (key === 'c' && !Sensor.isConnected) Sensor.connect();
 *    }
 * 
 * 3. draw() 内で生データを参照します:
 *    let raw = Sensor.raw; // センサーの生値（0〜1023）
 * =================================================================
 */

const Sensor = {
  isConnected: false, // 接続中フラグ（true / false）
  raw: 0,             // センサーから届いた最新の生値（0〜1023）

  /**
   * Web Serial API で Arduino への接続を開始する
   */
  async connect() {
    if (!('serial' in navigator)) {
      alert('お使いのブラウザは Web Serial API に対応していません。Google Chrome または Microsoft Edge を使用してください。');
      return;
    }

    try {
      // 1. ポートを選択して開く（転送レート 9600bps）
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      this.isConnected = true;
      console.log('🟢 Arduinoに接続しました');

      // 2. 受信ストリームを文字列としてデコード
      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      let buffer = '';

      // 3. 受信ループ（3章のコードと同じ構造です）
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += value;
        const lines = buffer.split('\n');
        buffer = lines.pop(); // 未完了の行をバッファに残す

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // 文字列から整数へ変換
          const num = parseInt(trimmed, 10);
          if (!isNaN(num)) {
            // ★ 3章で console.log していた値を、変数に保持！
            this.raw = num;
          }
        }
      }
    } catch (err) {
      console.error('Web Serial 接続エラー:', err);
      alert('接続に失敗しました。\n・Arduino IDE のシリアルモニタを閉じてから再接続してください。\n・USBケーブルの接続を確認してください。');
    }
  }
};
