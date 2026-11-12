// 1. 要素の取得
const heroHeader = document.getElementById('hero-header');
const heroTitle = document.getElementById('hero-title');
const heroLocation = document.getElementById('hero-location');
const changeBgBtn = document.getElementById('change-bg-btn');

// 2. データの準備（4つの絶景スポット）
const imageUrls = [
    'https://picsum.photos/id/1015/1200/600',
    'https://picsum.photos/id/1018/1200/600',
    'https://picsum.photos/id/1036/1200/600',
    'https://picsum.photos/id/1043/1200/600'
];

const titles = [
    '静寂に包まれる北欧のフィヨルド',
    '霧が流れるスコットランドの大自然',
    'どこまでも広がる白銀の雪原',
    '夕陽に染まる険しいアルプスの稜線'
];

const locations = [
    'ノルウェー / ガイランゲルフィヨルド',
    'イギリス / ハイランド地方',
    'アイスランド / ヴァトナヨークトル氷河',
    'スイス / ベルナー・オーバーラント'
];

// 直前に表示したインデックスを保持する変数
let lastIndex = -1;

// 3. ページを開いた初回にもランダムに表示する
lastIndex = Math.floor(Math.random() * imageUrls.length);
heroHeader.style.backgroundImage = `url("${imageUrls[lastIndex]}")`;
heroTitle.textContent = titles[lastIndex];
heroLocation.textContent = locations[lastIndex];

// 4. ボタンクリック時の切り替え処理（重複防止付き）
changeBgBtn.addEventListener('click', () => {
    // 新しいインデックスをランダムに抽選
    let newIndex = Math.floor(Math.random() * imageUrls.length);

    // 直前と同じ番号である間は、違う番号が出るまで再抽選
    while (newIndex === lastIndex) {
        newIndex = Math.floor(Math.random() * imageUrls.length);
    }

    // 画面の背景画像・テキストを更新
    heroHeader.style.backgroundImage = `url("${imageUrls[newIndex]}")`;
    heroTitle.textContent = titles[newIndex];
    heroLocation.textContent = locations[newIndex];

    // 今回の番号を直前の番号として記録
    lastIndex = newIndex;
});
