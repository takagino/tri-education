// script.js

const wrapper = document.querySelector(".horizontal-wrapper");

gsap.to(wrapper, {
    // ① 横移動させる距離 ＝「コンテナ全体の幅」ー「画面1枚分の幅」
    x: () => -(wrapper.scrollWidth - window.innerWidth),

    ease: "none", // ② ⚠️ スクロール連動時は絶対に "none"（等速）を指定するルール

    scrollTrigger: {
        trigger: ".horizontal-section",
        start: "top top", // 画面の上端にピタッと着いたら固定開始

        // ③ 固定させておく縦スクロールの尺（コンテナの横幅と同じ長さを指定）
        end: () => "+=" + wrapper.scrollWidth,

        scrub: true,
        pin: true,
        invalidateOnRefresh: true, // リサイズ対策
        markers: true
    }
});