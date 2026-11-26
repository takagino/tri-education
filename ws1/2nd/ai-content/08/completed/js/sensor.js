// js/sensor.js
const Sensor = {
    isConnected: false,
    rawValue: 0,
    value: 0,      // 0.0 〜 1.0 に調整された値
    minVal: 120,   // 手が遠い時の値（環境に合わせて調整）
    maxVal: 600,   // 手が近い時の値（環境に合わせて調整）

    async connect() {
        if (!('serial' in navigator)) {
            alert('Google Chrome または Microsoft Edge を使用してください。');
            return;
        }

        try {
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            this.isConnected = true;
            console.log('🟢 Arduinoに接続しました');

            const textDecoder = new TextDecoderStream();
            port.readable.pipeTo(textDecoder.writable);
            const reader = textDecoder.readable.getReader();

            let buffer = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += value;
                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    const num = parseInt(line.trim(), 10);
                    if (!isNaN(num)) {
                        this.rawValue = num;
                    }
                }
            }
        } catch (err) {
            console.error(err);
            this.isConnected = false;
        }
    },

    // 毎フレーム draw() の中で呼び出して滑らかな 0.0〜1.0 を得る
    update() {
        if (!this.isConnected) return;
        let clamped = constrain(this.rawValue, this.minVal, this.maxVal);
        let mapped = map(clamped, this.minVal, this.maxVal, 0.0, 1.0);
        this.value = lerp(this.value, mapped, 0.2);
    }
};