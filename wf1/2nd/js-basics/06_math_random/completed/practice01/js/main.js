const diceResult = document.getElementById('dice-result');
const rollDiceBtn = document.getElementById('roll-dice-btn');

rollDiceBtn.addEventListener('click', () => {
    // 0〜5 のランダム整数に +1 して 1〜6 にする
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    // 画面に表示
    diceResult.textContent = diceNumber;
});

const omikujiResult = document.getElementById('omikuji-result');
const omikujiMessage = document.getElementById('omikuji-message');
const omikujiBtn = document.getElementById('omikuji-btn');

// 運勢の配列
const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];

// 各運勢に対応するメッセージの配列
const messages = [
    '最高の1日になります。新しいことに挑戦してみましょう。',
    '思いがけない嬉しい出来事があるかもしれません。',
    '焦らずマイペースに進むと良い結果につながります。',
    '普段通りの日常に小さな幸せが見つかりそうです。',
    '無理は禁物です。今日はゆっくり休んで体調を整えましょう。'
];

omikujiBtn.addEventListener('click', () => {
    // 0 〜 fortunes.length - 1 のランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * fortunes.length);

    // 画面のテキストを更新
    omikujiResult.textContent = fortunes[randomIndex];
    omikujiMessage.textContent = messages[randomIndex];
});

const cards = document.querySelectorAll('.card');
const drawCardBtn = document.getElementById('draw-card-btn');

drawCardBtn.addEventListener('click', () => {
    // 1. すべてのカードから is-active を削除（リセット）
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('is-active');
    }

    // 2. 0 〜 cards.length - 1 のランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * cards.length);

    // 3. ランダムに選ばれたカードだけに is-active を付与
    cards[randomIndex].classList.add('is-active');
});
