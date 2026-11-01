// 課題：フォトギャラリーの実装

// 1. 要素の取得
const mainImg = document.getElementById('main-img');
const captionText = document.getElementById('caption-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const thumbs = document.querySelectorAll('.thumb-img');

// 現在選択されている画像のインデックス番号（0〜3）
let currentIndex = 0;

// ====================================================
// A. サムネイル画像クリック時の切り替え処理
// ====================================================
for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener('click', () => {
        // 現在のインデックスを、クリックされた番号 i に更新
        currentIndex = i;

        // クリックされたサムネイルの src と alt を取得
        const newSrc = thumbs[currentIndex].getAttribute('src');
        const newAlt = thumbs[currentIndex].getAttribute('alt');

        // メイン画像の src と alt を書き換え
        mainImg.setAttribute('src', newSrc);
        mainImg.setAttribute('alt', newAlt);

        // キャプションテキストを更新
        captionText.textContent = `${currentIndex + 1} / ${thumbs.length} : ${newAlt}`;

        // 全サムネイルから is-active を外し、選択された1枚だけに付ける
        for (let j = 0; j < thumbs.length; j++) {
            thumbs[j].classList.remove('is-active');
        }
        thumbs[currentIndex].classList.add('is-active');
    });
}

// ====================================================
// B. 「次の写真 ▶」ボタンの処理（発展）
// ====================================================
nextBtn.addEventListener('click', () => {
    currentIndex++;

    // 最後の枚数を超えたら先頭（0）に戻す
    if (currentIndex >= thumbs.length) {
        currentIndex = 0;
    }

    const newSrc = thumbs[currentIndex].getAttribute('src');
    const newAlt = thumbs[currentIndex].getAttribute('alt');
    mainImg.setAttribute('src', newSrc);
    mainImg.setAttribute('alt', newAlt);
    captionText.textContent = `${currentIndex + 1} / ${thumbs.length} : ${newAlt}`;

    for (let j = 0; j < thumbs.length; j++) {
        thumbs[j].classList.remove('is-active');
    }
    thumbs[currentIndex].classList.add('is-active');
});

// ====================================================
// C. 「◀ 前の写真」ボタンの処理（発展）
// ====================================================
prevBtn.addEventListener('click', () => {
    currentIndex--;

    // 0より小さくなったら一番最後のインデックス（length - 1）にする
    if (currentIndex < 0) {
        currentIndex = thumbs.length - 1;
    }

    const newSrc = thumbs[currentIndex].getAttribute('src');
    const newAlt = thumbs[currentIndex].getAttribute('alt');
    mainImg.setAttribute('src', newSrc);
    mainImg.setAttribute('alt', newAlt);
    captionText.textContent = `${currentIndex + 1} / ${thumbs.length} : ${newAlt}`;

    for (let j = 0; j < thumbs.length; j++) {
        thumbs[j].classList.remove('is-active');
    }
    thumbs[currentIndex].classList.add('is-active');
});