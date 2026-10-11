/**
 * 単元2: DOMの取得と要素の書き換え
 * 
 * 授業のハンズオンおよびミニワーク用スクリプトです。
 * 講義資料の手順に沿って、ステップバイステップでコードを記述していきましょう！
 */

// ==========================================
// 1. 操作したいHTML要素を取得する
// ==========================================
const themeTitle = document.getElementById('theme-title');
const themeDesc = document.getElementById('theme-desc');
const btnLight = document.getElementById('btn-light');
const btnDark = document.getElementById('btn-dark');
const btnOcean = document.getElementById('btn-ocean');

// コンソールで取得できているか確認
console.log('取得した要素の確認:');
console.log(themeTitle);
console.log(themeDesc);
console.log(btnLight, btnDark, btnOcean);


// ==========================================
// 2. ボタンのクリックイベントと要素の書き換え
// ==========================================

// ☀️ ライトモードボタン
btnLight.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：☀️ ライトモード';
  themeDesc.innerHTML = '爽やかで明るい日中のテーマです。';
  document.body.style.backgroundColor = '#f0f4f8';
  document.body.style.color = '#333333';
});

// 🌙 ダークモードボタン
btnDark.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：🌙 ダークモード';
  themeDesc.innerHTML = '目に優しく落ち着いた夜のテーマです。';
  document.body.style.backgroundColor = '#1a1a2e';
  document.body.style.color = '#e0e0e0';
});

// 🌊 オーシャンモードボタン
btnOcean.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：🌊 オーシャンモード';
  themeDesc.innerHTML = '深海をイメージした<strong>鮮やかなブルー</strong>のテーマです。';
  document.body.style.backgroundColor = '#0f3460';
  document.body.style.color = '#e94560';
});
