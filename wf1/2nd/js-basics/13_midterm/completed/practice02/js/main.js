// 課題6：今日のランチ抽選
const lunchResult = document.getElementById('lunch-result');
const lunchBtn = document.getElementById('lunch-btn');

const lunchMenus = ['カレーライス', '醤油ラーメン', 'ハンバーグ定食', 'サーモン丼', 'パスタ'];

lunchBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * lunchMenus.length);
  lunchResult.textContent = lunchMenus[randomIndex];
});

// 課題7：連続重複防止テーマカラー切り替え
const themeBox = document.getElementById('theme-box');
const themeName = document.getElementById('theme-name');
const themeBtn = document.getElementById('theme-btn');

const themeClasses = ['theme-blue', 'theme-green', 'theme-pink', 'theme-dark'];
const themeLabels = ['オーシャンブルー', 'フォレストグリーン', 'サクラピンク', 'ナイトダーク'];

let lastThemeIndex = -1;

themeBtn.addEventListener('click', () => {
  let newIndex = Math.floor(Math.random() * themeClasses.length);

  while (newIndex === lastThemeIndex) {
    newIndex = Math.floor(Math.random() * themeClasses.length);
  }

  themeBox.classList.remove('theme-blue', 'theme-green', 'theme-pink', 'theme-dark');
  themeBox.classList.add(themeClasses[newIndex]);
  themeName.textContent = `現在のテーマ：${themeLabels[newIndex]}`;

  lastThemeIndex = newIndex;
});

// 課題8：限定景品ガチャ（splice）
const gachaResult = document.getElementById('gacha-result');
const gachaRemaining = document.getElementById('gacha-remaining');
const gachaBtn = document.getElementById('gacha-btn');

const prizes = [
  '特賞：ワイヤレスヘッドホン',
  '1等：ギフト券 3,000円分',
  '2等：オリジナルマグカップ',
  '3等：ロゴステッカー'
];

gachaBtn.addEventListener('click', () => {
  if (prizes.length > 0) {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const picked = prizes.splice(randomIndex, 1)[0];

    gachaResult.textContent = picked;

    if (prizes.length > 0) {
      gachaRemaining.textContent = `残りの景品：${prizes.length}個`;
    } else {
      gachaRemaining.textContent = 'すべての景品が終了しました';
      gachaBtn.setAttribute('disabled', 'true');
    }
  }
});

// 課題9：セール割引シミュレーター（引数とreturn）
const discountResult = document.getElementById('discount-result');
const itemABtn = document.getElementById('item-a-btn');
const itemBBtn = document.getElementById('item-b-btn');

const calcDiscountPrice = (price, rate) => {
  return Math.floor(price * (100 - rate) / 100);
};

itemABtn.addEventListener('click', () => {
  const finalPrice = calcDiscountPrice(10000, 20);
  discountResult.textContent = `割引後価格：${finalPrice}円`;
});

itemBBtn.addEventListener('click', () => {
  const finalPrice = calcDiscountPrice(15000, 30);
  discountResult.textContent = `割引後価格：${finalPrice}円`;
});

// 課題10：おすすめガジェット紹介＆詳細モーダル（総合）
const gadgetBtns = document.querySelectorAll('.gadget-btn');
const gadgetTitle = document.getElementById('gadget-title');
const gadgetPrice = document.getElementById('gadget-price');
const openDetailBtn = document.getElementById('open-detail-btn');

const detailModal = document.getElementById('detail-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeIconBtn = document.getElementById('close-icon-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalGadgetTitle = document.getElementById('modal-gadget-title');
const modalGadgetDesc = document.getElementById('modal-gadget-desc');

const gadgetTitles = ['ワイヤレスイヤホン', 'スマートウォッチ', 'モバイルバッテリー'];
const gadgetPrices = ['12,800円', '24,500円', '4,980円'];
const gadgetDescs = [
  'ノイズキャンセリング機能を搭載し、最大24時間再生可能なコンパクトモデルです。',
  '毎日の歩数や睡眠を自動で記録し、通知も手元で確認できる軽量モデルです。',
  'スマートフォンを約3回フル充電できる大容量と急速充電に対応しています。'
];

let currentGadgetIndex = 0;

const showGadget = (index) => {
  currentGadgetIndex = index;
  gadgetTitle.textContent = gadgetTitles[index];
  gadgetPrice.textContent = gadgetPrices[index];

  for (let i = 0; i < gadgetBtns.length; i++) {
    gadgetBtns[i].classList.remove('is-active');
  }
  gadgetBtns[index].classList.add('is-active');
};

const openDetailModal = () => {
  modalGadgetTitle.textContent = gadgetTitles[currentGadgetIndex];
  modalGadgetDesc.textContent = gadgetDescs[currentGadgetIndex];
  detailModal.classList.add('is-open');
};

const closeDetailModal = () => {
  detailModal.classList.remove('is-open');
};

// 初期表示
showGadget(0);

// 商品ボタンのイベント登録
for (let i = 0; i < gadgetBtns.length; i++) {
  gadgetBtns[i].addEventListener('click', () => {
    showGadget(i);
  });
}

// モーダル開閉のイベント登録
openDetailBtn.addEventListener('click', () => {
  openDetailModal();
});

closeIconBtn.addEventListener('click', () => {
  closeDetailModal();
});

closeModalBtn.addEventListener('click', () => {
  closeDetailModal();
});

modalOverlay.addEventListener('click', () => {
  closeDetailModal();
});
