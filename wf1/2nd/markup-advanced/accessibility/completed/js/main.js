// ⭕️ 改善後のスクリプト（completed/js/main.js）
// ・ハンバーガーメニューの開閉時に aria-expanded と aria-label を同期
// ・開いている間は背景の <main> と <footer> に inert を付与してフォーカス抜けを防止
// ・Escキーでメニューを閉じ、元のボタンにフォーカスを戻す
// ・FAQアコーディオンは HTML標準の <details> / <summary> を使うためJS不要！

const hamburger = document.getElementById("js-hamburger");
const nav = document.getElementById("global-nav");
const mainEl = document.querySelector("main");
const footerEl = document.querySelector("footer");

function toggleMenu(open) {
  if (!hamburger || !nav) return;
  nav.classList.toggle("is-open", open);
  hamburger.setAttribute("aria-expanded", String(open));
  hamburger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");

  if (mainEl) mainEl.inert = open;
  if (footerEl) footerEl.inert = open;
}

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    toggleMenu(!isOpen);
  });

  // メニュー内リンクをクリックしたら閉じる
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Escキーでメニューを閉じてボタンにフォーカスを戻す
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburger.getAttribute("aria-expanded") === "true") {
      toggleMenu(false);
      hamburger.focus();
    }
  });
}
