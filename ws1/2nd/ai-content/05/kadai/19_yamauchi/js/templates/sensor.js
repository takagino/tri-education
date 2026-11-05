/**
 * sensor.js - Arduino シリアル通信受信モジュール
 * -------------------------------------------------------------
 * Web Serial API を用いて Arduino からのシリアル通信を受信し、
 * 生の数値（Sensor.raw）を保持するだけの純粋な JavaScript モジュールです。
 */

const Sensor = {
  isConnected: false, // Arduinoと接続中かどうか
  raw: 0,             // センサーから届いた最新の生値（0〜1023）

  // Web Serial API で Arduino への接続を開始する
  async connect() {
    if (!('serial' in navigator)) {
      alert('Google Chrome または Microsoft Edge を使用してください。');
      return false;
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

      // 3. 受信ループ（第3章のコードと全く同じ構造です）
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
            // ★ 第3章で console.log していた値を、変数に保持するだけ！
            this.raw = num;
          }
        }
      }
    } catch (err) {
      console.error('シリアル接続エラー:', err);
    }
  }
};