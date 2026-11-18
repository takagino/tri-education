// 1. 要素の取得
const planBtns = document.querySelectorAll('.plan-btn');
const randomPlanBtn = document.getElementById('random-plan-btn');
const planImage = document.getElementById('plan-image');
const planTitle = document.getElementById('plan-title');
const planUnitPrice = document.getElementById('plan-unit-price');

const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const peopleCount = document.getElementById('people-count');
const totalPrice = document.getElementById('total-price');

const openConfirmBtn = document.getElementById('open-confirm-btn');
const confirmModal = document.getElementById('confirm-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalIcon = document.getElementById('close-modal-icon');
const backBtn = document.getElementById('back-btn');

const modalPlanTitle = document.getElementById('modal-plan-title');
const modalPeopleCount = document.getElementById('modal-people-count');
const modalTotalPrice = document.getElementById('modal-total-price');

// 2. ツアープランのデータ配列
const planTitles = [
    '北海道グルメ満喫 3日間',
    '京都・古都の歴史めぐり 3日間',
    '沖縄美ら海リゾート滞在 4日間'
];

const planImages = [
    'https://picsum.photos/id/1018/700/360',
    'https://picsum.photos/id/1043/700/360',
    'https://picsum.photos/id/1015/700/360'
];

const planPrices = [35000, 28000, 42000];

// 現在の状態を管理するグローバル変数
let currentPlanIndex = 0;
let people = 1;

// 3. 関数①：税込合計金額を計算して return で返す関数
const calcTotal = (unitPrice, count) => {
    return Math.floor(unitPrice * count * 1.1);
};

// 4. 関数②：画面表示を一括更新する関数
const updateView = (index) => {
    currentPlanIndex = index;

    // プラン情報の更新
    planImage.setAttribute('src', planImages[index]);
    planTitle.textContent = planTitles[index];
    planUnitPrice.textContent = planPrices[index];

    // プラン選択ボタンの排他制御
    for (let i = 0; i < planBtns.length; i++) {
        planBtns[i].classList.remove('is-active');
    }
    planBtns[index].classList.add('is-active');

    // 人数と税込合計金額の更新
    peopleCount.textContent = people;
    const total = calcTotal(planPrices[index], people);
    totalPrice.textContent = total;
};

// 5. 関数③：予約確認モーダルを開く関数・閉じる関数
const openConfirmModal = () => {
    const total = calcTotal(planPrices[currentPlanIndex], people);

    modalPlanTitle.textContent = planTitles[currentPlanIndex];
    modalPeopleCount.textContent = `${people}名様`;
    modalTotalPrice.textContent = `${total}円（税込）`;

    confirmModal.classList.add('is-open');
};

const closeConfirmModal = () => {
    confirmModal.classList.remove('is-open');
};

// 6. ページ読み込み時の初回表示
updateView(0);

// 7. プラン選択ボタンのイベント設定
for (let i = 0; i < planBtns.length; i++) {
    planBtns[i].addEventListener('click', () => {
        updateView(i);
    });
}

// 8. おまかせ（ランダム）ボタンのイベント設定（連続重複防止付き）
randomPlanBtn.addEventListener('click', () => {
    let newIndex = Math.floor(Math.random() * planTitles.length);

    while (newIndex === currentPlanIndex) {
        newIndex = Math.floor(Math.random() * planTitles.length);
    }

    updateView(newIndex);
});

// 9. 人数増減ボタンのイベント設定
plusBtn.addEventListener('click', () => {
    people++;
    updateView(currentPlanIndex);
});

minusBtn.addEventListener('click', () => {
    if (people > 1) {
        people--;
        updateView(currentPlanIndex);
    }
});

// 10. モーダル開閉のイベント設定
openConfirmBtn.addEventListener('click', () => {
    openConfirmModal();
});

closeModalIcon.addEventListener('click', () => {
    closeConfirmModal();
});

backBtn.addEventListener('click', () => {
    closeConfirmModal();
});

modalOverlay.addEventListener('click', () => {
    closeConfirmModal();
});