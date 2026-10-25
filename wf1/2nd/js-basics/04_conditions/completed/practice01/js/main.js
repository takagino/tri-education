const btn = document.getElementById('btn');
const message = document.getElementById('message');

btn.addEventListener('click', () => {
    // テスト用のデータ（数値をいろいろ変更してテストしてみましょう）
    const isMember = true;
    const total = 6000;

    if (isMember && total >= 10000) {
        message.textContent = '【送料無料＋20%OFF】プレミアム会員特典が適用されました！';
        message.style.color = '#0066cc';
    } else if (isMember && total >= 5000) {
        message.textContent = '【送料無料】会員特別割引が適用されました！';
        message.style.color = '#27ae60';
    } else {
        message.textContent = '通常送料がかかります（会員登録＋5,000円以上で送料無料）。';
        message.style.color = '#e74c3c';
    }
});
