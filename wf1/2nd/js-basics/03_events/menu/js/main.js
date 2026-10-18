// 1. 操作したい要素を取得する
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

// 2. ボタンクリックでクラスをトグル（切り替え）する
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-open');
    navMenu.classList.toggle('is-open');
});