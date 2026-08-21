console.log("読み込み完了！");

document.addEventListener('DOMContentLoaded', () => {
    // 各機能を関数として呼び出すことで、処理の流れを一覧できるように整理
    initHamburgerMenu();
    initPageTopButton();
    initScrollAnimation();
});

/**
 * ハンバーガーメニューの開閉制御
 */
function initHamburgerMenu() {
    const ham = document.querySelector('.hamburger');
    const nav = document.querySelector('.gnav');

    // 要素が存在しないページでのエラー（null参照）を回避
    if (!ham || !nav) return;

    ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

/**
 * ページのトップに戻るボタンの制御
 */
function initPageTopButton() {
    const pagetop = document.querySelector('.pagetop');

    if (!pagetop) return;

    // クリック時のスクロール処理
    pagetop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // スクロール時の表示/非表示切り替え
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            pagetop.classList.add('show');
        } else {
            pagetop.classList.remove('show');
        }
    });
}

/**
 * IntersectionObserverを使ったスクロールアニメーション
 */
function initScrollAnimation() {
    const triggers = document.querySelectorAll('.js-scroll-trigger');

    // アニメーション対象がない場合は処理を終了
    if (triggers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
                // 一度だけアニメーションさせる場合は下記のコメントアウトを外す
                // observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('is-animated');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50% 0px'
    });

    triggers.forEach((el) => {
        observer.observe(el);
    });
}