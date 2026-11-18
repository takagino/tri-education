// practice02
const modalContainer = document.getElementById('modal-container');
const openModalBtn = document.getElementById('open-modal-btn');
const closeIconBtn = document.getElementById('close-icon-btn');
const agreeCloseBtn = document.getElementById('agree-close-btn');
const modalOverlay = document.getElementById('modal-overlay');

// モーダルを開く関数
const openModal = () => {
    modalContainer.classList.add('is-open');
};

// モーダルを閉じる関数
const closeModal = () => {
    modalContainer.classList.remove('is-open');
};

// 開くボタンのイベント
openModalBtn.addEventListener('click', () => {
    openModal();
});

// 3つの閉じるトリガーすべてで共通の closeModal を呼び出す
closeIconBtn.addEventListener('click', () => {
    closeModal();
});

agreeCloseBtn.addEventListener('click', () => {
    closeModal();
});

modalOverlay.addEventListener('click', () => {
    closeModal();
});

const spotImage = document.getElementById('spot-image');
const spotTitle = document.getElementById('spot-title');
const spotDesc = document.getElementById('spot-desc');
const spotBtns = document.querySelectorAll('.spot-btn');
const randomSpotBtn = document.getElementById('random-spot-btn');

// スポットデータの配列（4件）
const spotImages = [
    'https://picsum.photos/id/1015/600/340',
    'https://picsum.photos/id/1018/600/340',
    'https://picsum.photos/id/1036/600/340',
    'https://picsum.photos/id/1043/600/340'
];

const spotTitles = [
    '1. 北欧のフィヨルド渓谷',
    '2. ハイランドの深い霧と山並み',
    '3. 白銀に輝く氷河と雪原',
    '4. 夕暮れに染まるアルプスの森'
];

const spotDescs = [
    '氷河が削り出した雄大な断崖絶壁と、鏡のように静かな水面が広がる絶景スポットです。',
    '幻想的な霧が立ち込める山岳地帯で、手つかずの豊かな自然を満喫できます。',
    '見渡す限りの純白の世界が広がり、澄み切った空気と静寂を体験できます。',
    '美しい針葉樹林と切り立つ山々が夕陽に照らされる、ハイキングに人気のエリアです。'
];

// 現在表示中のインデックス番号を記録する変数
let currentIndex = 0;

// 指定された番号（index）のスポットに画面とボタンを一括更新する関数
const showSpot = (index) => {
    // 1. 画像とテキストの更新
    spotImage.setAttribute('src', spotImages[index]);
    spotTitle.textContent = spotTitles[index];
    spotDesc.textContent = spotDescs[index];

    // 2. ボタンの排他制御（全員から外して、index番目だけに付ける）
    for (let i = 0; i < spotBtns.length; i++) {
        spotBtns[i].classList.remove('is-active');
    }
    spotBtns[index].classList.add('is-active');

    // 3. 現在の番号を更新
    currentIndex = index;
};

// 1. ページを開いた初回の表示（0番目を表示）
showSpot(0);

// 2. 各番号ボタンをクリックしたときのイベント設定
for (let i = 0; i < spotBtns.length; i++) {
    spotBtns[i].addEventListener('click', () => {
        showSpot(i);
    });
}

// 3. ランダム選択ボタンをクリックしたときのイベント設定（重複防止付き）
randomSpotBtn.addEventListener('click', () => {
    let newIndex = Math.floor(Math.random() * spotTitles.length);

    // 現在表示中の番号と同じ間は引き直す
    while (newIndex === currentIndex) {
        newIndex = Math.floor(Math.random() * spotTitles.length);
    }

    // 選ばれた番号を渡して共通関数を呼び出す
    showSpot(newIndex);
});