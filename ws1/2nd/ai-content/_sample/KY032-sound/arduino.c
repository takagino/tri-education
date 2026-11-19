const int micPin = A0;
const int sampleWindow = 20; // サンプリング幅（ミリ秒）

void setup() { Serial.begin(9600); }

void loop() {
  unsigned long startMillis = millis();
  unsigned int signalMax = 0;
  unsigned int signalMin = 1023;

  // 20ms間の最大値と最小値をサンプリング
  while (millis() - startMillis < sampleWindow) {
    int sample = analogRead(micPin);
    if (sample < 1023) {
      if (sample > signalMax) {
        signalMax = sample;
      } else if (sample < signalMin) {
        signalMin = sample;
      }
    }
  }

  // 振幅（ピーク間の差）を音の大きさとして計算
  int peakToPeak = signalMax - signalMin;

  // 0〜1023の音量値として送信
  Serial.println(peakToPeak);
}