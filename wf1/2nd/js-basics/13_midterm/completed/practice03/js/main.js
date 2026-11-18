// チャレンジ1：パスワード検証＆確認一致チェック
const pwMain = document.getElementById('pw-main');
const pwConfirm = document.getElementById('pw-confirm');
const pwMessage = document.getElementById('pw-message');
const pwCheckBtn = document.getElementById('pw-check-btn');
const pwSubmitBtn = document.getElementById('pw-submit-btn');

const showPwMessage = (text, isError) => {
  pwMessage.classList.remove('is-error', 'is-ok');
  pwMessage.textContent = text;

  if (isError) {
    pwMessage.classList.add('is-error');
    pwSubmitBtn.setAttribute('disabled', 'true');
  } else {
    pwMessage.classList.add('is-ok');
    pwSubmitBtn.removeAttribute('disabled');
  }
};

const validatePassword = () => {
  const val1 = pwMain.value;
  const val2 = pwConfirm.value;

  if (val1 === '' || val2 === '') {
    showPwMessage('両方のパスワードを入力してください', true);
    return;
  }

  if (val1.length < 8) {
    showPwMessage('8文字以上で入力してください', true);
    return;
  }

  if (val1 !== val2) {
    showPwMessage('確認用パスワードが一致しません', true);
    return;
  }

  showPwMessage('登録可能な安全なパスワードです', false);
};

pwCheckBtn.addEventListener('click', () => {
  validatePassword();
});

pwSubmitBtn.addEventListener('click', () => {
  pwMessage.textContent = '登録が完了しました';
});

// チャレンジ2：映画チケット料金シミュレーター
const ticketTypeBtns = document.querySelectorAll('.ticket-type-btn');
const lateShowBtn = document.getElementById('late-show-btn');
const ticketMinus = document.getElementById('ticket-minus');
const ticketPlus = document.getElementById('ticket-plus');
const ticketCountEl = document.getElementById('ticket-count');
const ticketTotalEl = document.getElementById('ticket-total');

const ticketPrices = [1800, 1500, 1000];
let ticketIndex = 0;
let ticketCount = 1;
let isLateShow = false;

const calcTicketPrice = (unitPrice, count, lateFlag) => {
  let total = unitPrice * count;
  if (lateFlag) {
    total = Math.floor(total * 0.8);
  }
  return total;
};

const updateTicketView = () => {
  for (let i = 0; i < ticketTypeBtns.length; i++) {
    ticketTypeBtns[i].classList.remove('is-active');
  }
  ticketTypeBtns[ticketIndex].classList.add('is-active');

  ticketCountEl.textContent = ticketCount;
  const finalTotal = calcTicketPrice(ticketPrices[ticketIndex], ticketCount, isLateShow);
  ticketTotalEl.textContent = `合計：${finalTotal}円`;
};

updateTicketView();

for (let i = 0; i < ticketTypeBtns.length; i++) {
  ticketTypeBtns[i].addEventListener('click', () => {
    ticketIndex = i;
    updateTicketView();
  });
}

lateShowBtn.addEventListener('click', () => {
  isLateShow = !isLateShow;
  lateShowBtn.classList.toggle('is-on');

  if (isLateShow) {
    lateShowBtn.textContent = 'レイトショー割引（20%OFF）：ON';
  } else {
    lateShowBtn.textContent = 'レイトショー割引（20%OFF）：OFF';
  }

  updateTicketView();
});

ticketPlus.addEventListener('click', () => {
  if (ticketCount < 6) {
    ticketCount++;
    updateTicketView();
  }
});

ticketMinus.addEventListener('click', () => {
  if (ticketCount > 1) {
    ticketCount--;
    updateTicketView();
  }
});

// チャレンジ3：ビンゴ番号抽選機（1〜15・履歴＆リセット付き）
const bingoCurrent = document.getElementById('bingo-current');
const bingoRemaining = document.getElementById('bingo-remaining');
const bingoDrawBtn = document.getElementById('bingo-draw-btn');
const bingoResetBtn = document.getElementById('bingo-reset-btn');
const bingoHistory = document.getElementById('bingo-history');

let bingoNumbers = [];
let drawnNumbers = [];

const initBingo = () => {
  bingoNumbers = [];
  drawnNumbers = [];

  for (let i = 1; i <= 15; i++) {
    bingoNumbers.push(i);
  }

  bingoCurrent.textContent = '-';
  bingoRemaining.textContent = `残り：${bingoNumbers.length}個`;
  bingoHistory.innerHTML = '';
  bingoDrawBtn.removeAttribute('disabled');
};

initBingo();

bingoDrawBtn.addEventListener('click', () => {
  if (bingoNumbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * bingoNumbers.length);
    const pickedNumber = bingoNumbers.splice(randomIndex, 1)[0];

    drawnNumbers.push(pickedNumber);
    bingoCurrent.textContent = pickedNumber;

    let historyHtml = '';
    for (let i = 0; i < drawnNumbers.length; i++) {
      historyHtml += `<span class="ball">${drawnNumbers[i]}</span>`;
    }
    bingoHistory.innerHTML = historyHtml;

    if (bingoNumbers.length > 0) {
      bingoRemaining.textContent = `残り：${bingoNumbers.length}個`;
    } else {
      bingoRemaining.textContent = 'すべて引き終わりました';
      bingoDrawBtn.setAttribute('disabled', 'true');
    }
  }
});

bingoResetBtn.addEventListener('click', () => {
  initBingo();
});

// チャレンジ4：ループ循環スライドショー
const slideImage = document.getElementById('slide-image');
const slideCaption = document.getElementById('slide-caption');
const prevSlideBtn = document.getElementById('prev-slide-btn');
const nextSlideBtn = document.getElementById('next-slide-btn');
const dotBtns = document.querySelectorAll('.dot-btn');

const slideImages = [
  'https://picsum.photos/id/1015/600/280',
  'https://picsum.photos/id/1018/600/280',
  'https://picsum.photos/id/1036/600/280',
  'https://picsum.photos/id/1043/600/280'
];

const slideTitles = [
  '1枚目：静寂のフィヨルド',
  '2枚目：ハイランドの山並み',
  '3枚目：白銀の雪原',
  '4枚目：夕暮れのアルプス'
];

let currentSlide = 0;

const showSlide = (index) => {
  currentSlide = index;
  slideImage.setAttribute('src', slideImages[index]);
  slideCaption.textContent = slideTitles[index];

  for (let i = 0; i < dotBtns.length; i++) {
    dotBtns[i].classList.remove('is-active');
  }
  dotBtns[index].classList.add('is-active');
};

showSlide(0);

nextSlideBtn.addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= slideTitles.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
});

prevSlideBtn.addEventListener('click', () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slideTitles.length - 1;
  }
  showSlide(currentSlide);
});

for (let i = 0; i < dotBtns.length; i++) {
  dotBtns[i].addEventListener('click', () => {
    showSlide(i);
  });
}

// チャレンジ5：3連おみくじガチャ（連続重複防止＆特賞判定）
const tripleGachaBtn = document.getElementById('triple-gacha-btn');
const tripleResultList = document.getElementById('triple-result-list');
const jackpotBanner = document.getElementById('jackpot-banner');

const omikujiTypes = ['大吉', '中吉', '小吉', '末吉'];

// 配列の中に '大吉' が含まれているか判定して true / false を返す関数
const hasDaikichi = (results) => {
  for (let i = 0; i < results.length; i++) {
    if (results[i] === '大吉') {
      return true;
    }
  }
  return false;
};

tripleGachaBtn.addEventListener('click', () => {
  const roundResults = [];
  let lastPick = -1;

  // for文で3回抽選（while文で連続重複を防止）
  for (let i = 0; i < 3; i++) {
    let newPick = Math.floor(Math.random() * omikujiTypes.length);
    while (newPick === lastPick) {
      newPick = Math.floor(Math.random() * omikujiTypes.length);
    }
    roundResults.push(omikujiTypes[newPick]);
    lastPick = newPick;
  }

  // 画面のリストを更新
  let listHtml = '';
  for (let i = 0; i < roundResults.length; i++) {
    listHtml += `<li>${i + 1}回目：${roundResults[i]}</li>`;
  }
  tripleResultList.innerHTML = listHtml;

  // 特賞判定関数を呼び出してバナーを更新
  const isJackpot = hasDaikichi(roundResults);
  if (isJackpot) {
    jackpotBanner.textContent = '大吉が出ました。おめでとうございます。';
    jackpotBanner.classList.add('is-jackpot');
  } else {
    jackpotBanner.textContent = 'また挑戦してみよう';
    jackpotBanner.classList.remove('is-jackpot');
  }
});
