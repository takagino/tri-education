const btn = document.getElementById('btn');
const message = document.getElementById('message');
const countDisplay = document.getElementById('count');

// ★重要：クリック数を記録する変数はイベントリスナーの「外」で宣言する！
let count = 0;

message.textContent = 'ボタンをクリックしてカウントを増やそう！';

btn.addEventListener('click', () => {
    // 1. カウントを1増やす
    count++;
    countDisplay.textContent = count;

    // 2. カウント数に応じてメッセージを分岐
    if (count >= 30) {
        message.textContent = '30回達成！ゲームクリアです！';
        message.style.color = '#e74c3c';
    } else if (count % 10 === 0) {
        // 10で割った余りが 0 ＝ 10の倍数（10回、20回のとき）
        message.textContent = `${count}回達成！あと少し！`;
        message.style.color = '#0066cc';
    } else {
        message.textContent = 'ボタンをクリックしてカウントを増やそう！';
        message.style.color = '#333333';
    }
});

const image = document.getElementById('main-image');

const src = image.getAttribute('src');
const alt = image.getAttribute('alt');

console.log(src, alt);
