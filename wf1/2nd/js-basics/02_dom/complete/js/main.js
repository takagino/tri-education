// ==========================================
// 1. 操作したいHTML要素を取得する
// ==========================================
const themeTitle = document.getElementById('theme-title');
const btnLight = document.getElementById('btn-light');
const btnDark = document.getElementById('btn-dark');
const btnRetoro = document.getElementById('btn-retoro');

// コンソールで取得できているか確認
console.log('取得した要素の確認:');
console.log(themeTitle);
console.log(btnLight, btnDark, btnRetoro);


// ==========================================
// 2. ボタンのクリックイベントと要素の書き換え
// ==========================================

// ☀️ ライトモードボタン
btnLight.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：☀️ ライトモード';
  document.body.style.backgroundColor = '#f0f4f8';
  document.body.style.color = '#333333';
});

// 🌙 ダークモードボタン
btnDark.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：🌙 ダークモード';
  document.body.style.backgroundColor = '#1a1a2e';
  document.body.style.color = '#e0e0e0';
});

// 🍊 レトロモードボタン
btnRetoro.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：🍊 レトロ';
  document.body.style.backgroundColor = '#fff4c9';
  document.body.style.color = '#8b2f01';
});