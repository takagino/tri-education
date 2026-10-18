// 1. 操作したい要素を取得する
const accordionBtn = document.getElementById('accordion-btn');
const accordionContent = document.getElementById('accordion-content');

// 2. ボタンクリックでクラスをトグル（切り替え）する
accordionBtn.addEventListener('click', () => {
    // 回答コンテンツの開閉
    accordionContent.classList.toggle('is-open');

    // （任意演出）ボタン自身のアイコン回転用
    accordionBtn.classList.toggle('is-open');
});