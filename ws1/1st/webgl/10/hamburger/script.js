// script.js

const btn = document.querySelector(".menu-btn");
const tl = gsap.timeline({ paused: true });

// --- アニメーション手順の登録 ---

// ① メニュー全体を「可視化」する（一瞬で実行）
tl.to(".nav-overlay", {
    visibility: "visible",
    duration: 0
})
    // ② 3色の背景パネルが0.1秒時差で追いかけるように降下する
    .to(".nav-bg", {
        y: "0%",
        duration: 0.6,
        stagger: 0.1,
        ease: "power4.inOut"
    })
    // ③ 小さいラベル文字がフェードイン
    .from(".nav-label", {
        opacity: 0,
        duration: 0.4
    }, "-=0.2")
    // ④ リンク文字が「少し斜めに傾きながら」下から起き上がる
    .from(".nav-item a", {
        y: "130%",
        skewY: 8,       // Y軸方向に8度傾けた状態からスタート
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out"
    }, "-=0.4");


// --- ボタンクリック時の再生・逆再生制御 ---
let isOpen = false;

btn.addEventListener("click", () => {
    if (!isOpen) {
        tl.play();
        btn.textContent = "CLOSE";
        isOpen = true;
    } else {
        tl.reverse();
        btn.textContent = "MENU";
        isOpen = false;
    }
});