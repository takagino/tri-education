const int touchPin = 2; // TTP223BのSIGピンをD2に接続

void setup() {
  Serial.begin(9600);       // パソコンとのシリアル通信を開始
  pinMode(touchPin, INPUT); // D2ピンを入力モードに設定
}

void loop() {
  // センサーの値を読み取る（触ると HIGH=1, 離すと LOW=0）
  int touchValue = digitalRead(touchPin);

  // 読み取った数値をパソコンに送信して改行
  Serial.println(touchValue);

  // 通信を安定させるための短い待機時間
  delay(50);
}