const int pinX = A7;
const int pinY = A6;
const int pinSW = A5; // A5（D19）を使用

void setup() {
  Serial.begin(9600);
  pinMode(pinSW, INPUT_PULLUP); // 内部プルアップ有効
}

void loop() {
  int xVal = analogRead(pinX);
  int yVal = analogRead(pinY);
  int swVal = digitalRead(pinSW); // 離すと1、押し込むと0

  // "X,Y,SW" のCSVフォーマットで送信
  Serial.print(xVal);
  Serial.print(",");
  Serial.print(yVal);
  Serial.print(",");
  Serial.println(swVal);

  delay(30);
}