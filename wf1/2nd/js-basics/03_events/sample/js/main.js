window.addEventListener('scroll', () => {
    // スクロールされたピクセル数（px）をそのまま回転角度（deg）に変換
    btn.style.transform = `rotate(${window.scrollY}deg)`;
});

const windowWidthText = document.getElementById('window-width');
const windowHeightText = document.getElementById('window-height');

// 画面を開いた瞬間の幅と高さを表示
windowWidthText.textContent = window.innerWidth;
windowHeightText.textContent = window.innerHeight;

// ウィンドウがリサイズされるたびに数値を更新
window.addEventListener('resize', () => {
    windowWidthText.textContent = window.innerWidth;
    windowHeightText.textContent = window.innerHeight;
});