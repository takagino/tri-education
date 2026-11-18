// 課題1：いいねボタン＆カウント
const likeStatus = document.getElementById('like-status');
const likeBtn = document.getElementById('like-btn');

let likeCount = 0;

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('is-liked');

  if (likeBtn.classList.contains('is-liked')) {
    likeCount++;
    likeBtn.textContent = '♥ いいね済み';
  } else {
    likeCount--;
    likeBtn.textContent = '♡ いいねする';
  }

  likeStatus.textContent = `現在のいいね数：${likeCount}件`;
});

// 課題2：会員ランク判定
const pointDisplay = document.getElementById('point-display');
const rankBadge = document.getElementById('rank-badge');
const addPointBtn = document.getElementById('add-point-btn');
const resetPointBtn = document.getElementById('reset-point-btn');

let points = 0;

addPointBtn.addEventListener('click', () => {
  points += 15;
  pointDisplay.textContent = `現在のポイント：${points}pt`;

  rankBadge.classList.remove('is-silver', 'is-gold');

  if (points >= 60) {
    rankBadge.textContent = 'ゴールド会員';
    rankBadge.classList.add('is-gold');
  } else if (points >= 30) {
    rankBadge.textContent = 'シルバー会員';
    rankBadge.classList.add('is-silver');
  } else {
    rankBadge.textContent = 'ブロンズ会員';
  }
});

resetPointBtn.addEventListener('click', () => {
  points = 0;
  pointDisplay.textContent = '現在のポイント：0pt';
  rankBadge.textContent = 'ブロンズ会員';
  rankBadge.classList.remove('is-silver', 'is-gold');
});

// 課題3：パスワード表示切り替え
const passwordInput = document.getElementById('password-input');
const togglePwBtn = document.getElementById('toggle-pw-btn');

togglePwBtn.addEventListener('click', () => {
  const currentType = passwordInput.getAttribute('type');

  if (currentType === 'password') {
    passwordInput.setAttribute('type', 'text');
    togglePwBtn.textContent = '隠す';
  } else {
    passwordInput.setAttribute('type', 'password');
    togglePwBtn.textContent = '表示する';
  }
});

// 課題4：持ち物リスト追加
const itemInput = document.getElementById('item-input');
const addItemBtn = document.getElementById('add-item-btn');
const itemList = document.getElementById('item-list');

const items = [];

addItemBtn.addEventListener('click', () => {
  const newItem = itemInput.value;

  if (newItem !== '') {
    items.push(newItem);
    itemInput.value = '';

    let listHtml = '';
    for (let i = 0; i < items.length; i++) {
      listHtml += `<li>${items[i]}</li>`;
    }
    itemList.innerHTML = listHtml;
  }
});

// 課題5：Tシャツサイズ選択（排他制御）
const sizeBtns = document.querySelectorAll('.size-btn');
const sizeResult = document.getElementById('size-result');

for (let i = 0; i < sizeBtns.length; i++) {
  sizeBtns[i].addEventListener('click', () => {
    for (let j = 0; j < sizeBtns.length; j++) {
      sizeBtns[j].classList.remove('is-active');
    }
    sizeBtns[i].classList.add('is-active');
    sizeResult.textContent = `選択中のサイズ：${sizeBtns[i].textContent}`;
  });
}
