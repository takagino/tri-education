const btn = document.getElementById('btn');
const mainTitle = document.querySelector('#main-title');

btn.addEventListener('mouseout', () => {
    mainTitle.textContent = 'クリックされました';
    mainTitle.style.color = '#ff0000';
});

window.addEventListener('scroll', () => {
    console.log(`現在のスクロール量：${window.scrollY}px`);
    btn.style.transform = `rotate(${window.scrollY}deg)`;
    document.body.style.backgroundImage = `linear-gradient(${window.scrollY}deg, #ff9a9e, #fad0c4)`;
});

/*
window.addEventListener('DOMContentLoaded', ()=>{ });
DOMツリーが完成したら実行する（ブラウザにはまだ表示されてない）
*/

window.addEventListener('load', () => {
    btn.style.transform = `rotate(${window.scrollY}deg)`;
    document.body.style.backgroundImage = `linear-gradient(${window.scrollY}deg, #ff9a9e, #fad0c4)`;
});

const sizeDisplay = document.getElementById('size-display');

// 画面を開いた瞬間にテンプレートリテラルで一括書き換え
sizeDisplay.textContent = `現在の画面サイズ：${window.innerWidth}px × ${window.innerHeight}px`;

mainTitle.style.fontSize = `${window.innerWidth / 25}px`;

// ウィンドウがリサイズされるたびに数値を更新
window.addEventListener('resize', () => {
    sizeDisplay.textContent = `現在の画面サイズ：${window.innerWidth}px × ${window.innerHeight}px`;
    mainTitle.style.fontSize = `${window.innerWidth / 25}px`;
});

btn.classList.add('is-active', 'is-open');
btn.classList.remove('is-active', 'is-open');
//btn.classList.toggle('is-active', true); addと同じ
//btn.classList.toggle('is-active', false); removeと同じ

btn.addEventListener('click', () => {
    btn.classList.toggle('is-active');
    if (btn.classList.contains('is-active')) {
        btn.textContent = 'アクティブ';
    } else {
        btn.textContent = '通常';
    }
});
