/**
 * 07_controller.ino
 * =================================================================
 * 【機能】
 * ジョイスティック（KY-023: A0, A1）と明るさセンサー（CdS: A2）の
 * アナログ値を読み取り、CSV形式（カンマ区切り1行）でPCへ高速送信します。
 *
 * 【配線】
 * - Arduino 5V  ── ブレッドボード (+)
 * - Arduino GND ── ブレッドボード (-)
 * - ジョイスティック VRX ── Arduino A0 (左右)
 * - ジョイスティック VRY ── Arduino A1 (上下)
 * - ジョイスティック +5V ── ブレッドボード (+)
 * - ジョイスティック GND ── ブレッドボード (-)
 *   (※SWピンは使用しません)
 * - CdSセル 片足 ── ブレッドボード (+)
 * - CdSセル もう片足 ＆ 10kΩ抵抗の片足 ── Arduino A2
 * - 10kΩ抵抗 もう片足 ── ブレッドボード (-)
 * =================================================================
 */

const int PIN_JOY_X = A0; // ジョイスティック X軸（左右）
const int PIN_JOY_Y = A1; // ジョイスティック Y軸（上下）
const int PIN_LIGHT = A2; // 明るさセンサー（CdSセル）

void setup() {
  // 転送レート 9600bps でシリアル通信を開始
  Serial.begin(9600);
}

void loop() {
  // 1. 各ピンからアナログ値（0〜1023）を読み取る
  int joyX  = analogRead(PIN_JOY_X);
  int joyY  = analogRead(PIN_JOY_Y);
  int light = analogRead(PIN_LIGHT);

  // 2. カンマ区切り（CSV形式）で1行にまとめて送信
  // 送信例: "512,508,680\n"
  Serial.print(joyX);
  Serial.print(",");
  Serial.print(joyY);
  Serial.print(",");
  Serial.println(light);

  // 3. 約50fps（1秒間に50回）のペースで送信
  delay(20);
}

