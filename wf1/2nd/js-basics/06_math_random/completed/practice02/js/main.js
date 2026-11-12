// 出目を保存する変数（最初は6以外の適当な数字にしておく）
let dice = 0;

// 出目が6ではない間、ずっと繰り返す
while (dice !== 6) {
    // 1〜6のランダムな目を生成
    dice = Math.floor(Math.random() * 6) + 1;
    console.log(`出た目: ${dice}`);
}

console.log('6が出たので終了しました');

const drawUntilBtn = document.getElementById('draw-until-btn');
const drawLog = document.getElementById('draw-log');

const omikujiItems = ['大吉', '中吉', '小吉', '吉', '凶'];

drawUntilBtn.addEventListener('click', () => {
    let count = 0;
    let resultIndex = -1; // 最初はどの運勢でもない状態にしておく
    let logHtml = '';

    // 出た運勢が 0（大吉）ではない間、ずっと繰り返す
    while (resultIndex !== 0) {
        count++;
        // 0〜4 のランダムな番号を引く
        resultIndex = Math.floor(Math.random() * omikujiItems.length);

        logHtml += `${count}回目：${omikujiItems[resultIndex]}<br>`;
    }

    logHtml += `<strong>見事、${count}回目で大吉が出ました。</strong>`;
    drawLog.innerHTML = logHtml;
});

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteBtn = document.getElementById('quote-btn');

// 名言リスト
const quotes = [
    'シンプルであることは、複雑であることよりもむずかしい。',
    '失敗したことがない人間というのは、新しいことに挑戦したことがない人間だ。',
    '今日できることを明日に延ばすな。',
    '情熱を持て。さもなければ、どんな簡単な仕事もやり遂げられない。'
];

// 発言者リスト
const authors = [
    'スティーブ・ジョブズ',
    'アルベルト・アインシュタイン',
    'ベンジャミン・フランクリン',
    'ラルフ・ウォルド・エマーソン'
];

// 直前に表示したインデックスを保持する変数（初期値は -1）
let lastIndex = -1;

quoteBtn.addEventListener('click', () => {
    // 1. 新しい番号をランダムに抽選
    let newIndex = Math.floor(Math.random() * quotes.length);

    // 2. 直前と同じ番号である間は、違う番号が出るまで引き直す
    while (newIndex === lastIndex) {
        newIndex = Math.floor(Math.random() * quotes.length);
    }

    // 3. 画面の表示を更新
    quoteText.textContent = `“${quotes[newIndex]}”`;
    quoteAuthor.textContent = `- ${authors[newIndex]}`;

    // 4. 今回の番号を直前の番号として記録
    lastIndex = newIndex;
});

const presenterResult = document.getElementById('presenter-result');
const remainingCount = document.getElementById('remaining-count');
const presenterBtn = document.getElementById('presenter-btn');

// 発表候補者の配列
const members = ['佐藤さん', '鈴木さん', '高橋さん', '田中さん'];

// 初期状態の表示
remainingCount.textContent = `残りの候補：${members.length}人`;

presenterBtn.addEventListener('click', () => {
    // 候補者が残っている場合のみ抽選を実行
    if (members.length > 0) {
        // 1. 現在残っている人数の中からランダムなインデックスを生成
        const randomIndex = Math.floor(Math.random() * members.length);

        // 2. 配列から選ばれた人を削除して取り出す
        const selected = members.splice(randomIndex, 1)[0];

        // 3. 画面の表示を更新
        presenterResult.textContent = selected;

        // 4. 残り人数の判定とメッセージの更新
        if (members.length > 0) {
            remainingCount.textContent = `残りの候補：${members.length}人`;
        } else {
            remainingCount.textContent = '全員の発表順が決まりました。お疲れ様でした。';
            presenterBtn.setAttribute('disabled', 'true');
        }
    }
});
