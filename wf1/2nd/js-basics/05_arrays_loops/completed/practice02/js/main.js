const colorPreview = document.getElementById('color-preview');
const colorBtns = document.querySelectorAll('.color-btn');

// 各ボタン（0〜3番目）に対応するカラーコードの配列
const colorCodes = ['#e74c3c', '#27ae60', '#2980b9', '#8e44ad'];

// 4つのボタンすべてにクリックイベントを登録
for (let i = 0; i < colorBtns.length; i++) {
    colorBtns[i].addEventListener('click', () => {
        // クリックされた i番目のボタンの文字と、i番目の色コードを取得
        const colorName = colorBtns[i].textContent;
        const colorCode = colorCodes[i];

        // プレビューエリアの見た目とテキストを更新
        colorPreview.style.backgroundColor = colorCode;
        colorPreview.style.color = '#ffffff';
        colorPreview.textContent = `${colorName}（${colorCode}）`;
    });
}

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// すべてのタブボタンにクリックイベントを登録
for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener('click', () => {
        // Step 1: すべてのタブボタンとタブパネルから is-active を削除
        for (let j = 0; j < tabBtns.length; j++) {
            tabBtns[j].classList.remove('is-active');
            tabPanels[j].classList.remove('is-active');
        }

        // Step 2: クリックされた i番目のボタンと、同じ i番目のパネルに is-active を追加
        tabBtns[i].classList.add('is-active');
        tabPanels[i].classList.add('is-active');
    });
}