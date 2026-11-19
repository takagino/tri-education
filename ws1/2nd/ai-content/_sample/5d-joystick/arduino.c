// ピン定義
const int pinUP = 2;
const int pinDWN = 3;
const int pinLET = 4;
const int pinRHI = 5;
const int pinMID = 6;
const int pinSET = 7;
const int pinRST = 8;

const int pins[] = {pinUP, pinDWN, pinLET, pinRHI, pinMID, pinSET, pinRST};
const char *pinNames[] = {"UP",     "DOWN", "LEFT", "RIGHT",
                          "CENTER", "SET",  "RST"};

void setup() {
  Serial.begin(9600);

  // すべてのピンを内部プルアップに設定（未押下: 1, 押下: 0）
  for (int i = 0; i < 7; i++) {
    pinMode(pins[i], INPUT_PULLUP);
  }
}

void loop() {
  String pressedAction = "NONE";

  // 押されているボタンを走査
  for (int i = 0; i < 7; i++) {
    if (digitalRead(pins[i]) == LOW) {
      pressedAction = pinNames[i];
      break; // 1つ見つかったら決定
    }
  }

  // 判定結果を送信（例: "UP", "LEFT", "NONE"）
  Serial.println(pressedAction);

  delay(40); // チャタリング防止と安定送信用
}