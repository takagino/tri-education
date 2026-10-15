const btn = document.getElementById('btn');

// 'is-active' クラスを追加する
btn.classList.add('is-active');
btn.classList.remove('is-active');

btn.addEventListener('click', () => {
    btn.classList.toggle('is-active');

    if (btn.classList.contains('is-active')) {
        btn.textContent = 'ボタンはアクティブ状態です';
    } else {
        btn.textContent = 'ボタンは通常状態です';
    }
});