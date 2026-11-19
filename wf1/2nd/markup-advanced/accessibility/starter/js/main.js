// ❌ 改善前のスクリプト（starter/js/main.js）
// ・<div class="hamburger"> なのでTabでフォーカスできない
// ・aria-expanded や inert の切り替えがない
// ・FAQアコーディオンも <div> なのでキーボード操作ができない

const hamburger = document.getElementById("js-hamburger");
const nav = document.getElementById("global-nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

document.querySelectorAll(".js-accordion").forEach((item) => {
  const question = item.querySelector(".faq__question");
  question.addEventListener("click", () => {
    item.classList.toggle("is-open");
  });
});
