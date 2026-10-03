/**
 * STUDIO NEXUS - Webサイト インタラクション制御スクリプト
 * 
 * トライデントコンピュータ専門学校 Webデザイン学科 1年生
 * JavaScript基礎演習 最終課題サンプルコード
 *
 * 【授業で学んだ技術要素】
 * 第1回: 基本文法・変数（let, const）
 * 第2回: DOM操作とイベント基礎（querySelector, addEventListener）
 * 第3回: 条件分岐とUI切替（if文, switch文, classList）
 * 第4回: 配列と繰り返し処理（配列, for文）
 * 第5回: 関数の活用（関数宣言, アロー関数）
 * 第6回: 要素の関係性とDOMトラバーサル（parentElement, nextElementSibling）
 * 第7回: タイマー処理とアニメーション（setInterval, setTimeout, clearInterval）
 * 第8回: オブジェクトと組み込みオブジェクト（Date, Math, window, 属性操作）
 * 第9回: フォーム操作とバリデーション（preventDefault, 入力値チェック）
 * 第10回: 実践的なWebサイト制作（コンポーネント連携・総合実装）
 */

// HTMLのパース完了後にスクリプトを実行（安全な初期化）
document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================
    1. ハンバーガーメニュー（第2回・第3回・第5回：関数の活用）
    - スマホ表示時にメニューを開閉する
    - 開閉と連動して背景スクロールを固定（実務必須テクニック）
    - クラス「is-open」の付け外しによりCSS側でアニメーション
  ==================================================== */
  const hamburgerBtn = document.getElementById('js-hamburger');
  const navMenu = document.getElementById('js-nav');
  const menuLinks = document.querySelectorAll('.header__menu-link');

  if (hamburgerBtn && navMenu) {
    // メニューの開閉を切り替える関数（第5回: 関数の活用）
    const toggleMenu = () => {
      const isOpen = hamburgerBtn.classList.toggle('is-open');
      navMenu.classList.toggle('is-open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);

      // メニューが開いている間は背景スクロールを禁止、閉じたら解除
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // メニューを閉じる関数
    const closeMenu = () => {
      hamburgerBtn.classList.remove('is-open');
      navMenu.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    // ハンバーガーボタンクリック時の開閉
    hamburgerBtn.addEventListener('click', toggleMenu);

    // メニュー内のリンクをクリックした時、スマホメニューを閉じる
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', closeMenu);
    }
  }


  /* ====================================================
    2. 文字サイズ変更ボタン（第2回・第3回・イベント委譲・dataset）
    - 親要素でクリックを一括監視（イベント委譲：e.target の活用）
    - ボタンの dataset.size 属性の値を取得
    - html要素（document.documentElement）の data-size 属性を動的に上書き
    - remで指定されたサイト全体のフォントサイズが一括で美しく連動
  ==================================================== */
  const fontSwitcher = document.querySelector('.font-switcher');
  const fontButtons = document.querySelectorAll('.font-switcher__btn');

  if (fontSwitcher) {
    fontSwitcher.addEventListener('click', (e) => {
      // クリックされた要素から最も近いボタンを特定
      const targetBtn = e.target.closest('.font-switcher__btn');
      if (!targetBtn) return; // ボタン以外をクリックした場合は何もしない

      // 1. 全てのボタンから「is-active」クラスを削除
      for (let i = 0; i < fontButtons.length; i++) {
        fontButtons[i].classList.remove('is-active');
      }

      // 2. クリックされたボタンに「is-active」クラスを追加
      targetBtn.classList.add('is-active');

      // 3. datasetからサイズを取得し、html要素へ反映（remのルート基準サイズを変更）
      document.documentElement.setAttribute('data-size', targetBtn.dataset.size);
    });
  }


  /* ====================================================
    3. アコーディオンパネル（第6回：DOMトラバーサルの活用）
    - よくある質問（FAQ）の開閉
    - parentElement や nextElementSibling などの関係性を活用
  ==================================================== */
  const accordionTriggers = document.querySelectorAll('.js-accordion-trigger');

  for (let i = 0; i < accordionTriggers.length; i++) {
    accordionTriggers[i].addEventListener('click', function () {
      // DOMトラバーサル1: 親要素（.faq__item）を取得
      const item = this.parentElement;

      // DOMトラバーサル2: 次の兄弟要素（.faq__answer）を取得
      const answer = this.nextElementSibling;

      // 親要素に「is-open」クラスをトグル（付け外し）
      item.classList.toggle('is-open');

      // 開閉状態に合わせてaria-expandedを更新
      const isOpen = item.classList.contains('is-open');
      this.setAttribute('aria-expanded', isOpen);
    });
  }


  /* ====================================================
    4. スライドショー（第4回・第7回・第8回）
    - オブジェクトと配列によるスライドデータ管理（tag, title, image）
    - スライド本体: innerHTML とテンプレートリテラルで動的生成
    - 丸ボタン: document.createElement で動的生成 ＆ その場でイベント登録
    - setIntervalによる自動再生とホバー時の停止
  ==================================================== */
  // スライド情報のオブジェクト配列（第4回: 配列、第8回: オブジェクト）
  const slideData = [
    {
      tag: 'CREATIVE TECH STUDIO',
      title: 'DIGITAL INNOVATION<br>& DESIGN EXCELLENCE',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80'
    },
    {
      tag: 'FUTURE-READY SOLUTION',
      title: 'SCALABLE ARCHITECTURE<br>& INTERACTIVE UI',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80'
    },
    {
      tag: 'DATA & STRATEGY',
      title: 'DRIVING BUSINESS<br>GROWTH ONLINE',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80'
    }
  ];

  const sliderElement = document.getElementById('js-slider');
  const slidesContainer = document.getElementById('js-slides-container');
  const indicatorsContainer = document.getElementById('js-indicators');
  const prevBtn = document.getElementById('js-slide-prev');
  const nextBtn = document.getElementById('js-slide-next');

  let currentSlide = 0; // 現在表示中のスライド番号（0始まり）
  let slideTimerId = null; // タイマー用変数
  const indicatorDots = []; // 生成した丸ボタンを格納する配列

  if (sliderElement && slidesContainer) {
    // 【1. スライド本体の動的生成】innerHTML と テンプレートリテラルを活用！
    // 複数行にわたるHTML構造をオブジェクトのデータから一気に展開
    let slidesHtml = '';
    for (let i = 0; i < slideData.length; i++) {
      const slide = slideData[i];
      let activeClass = '';
      if (i === 0) {
        activeClass = 'is-active';
      }

      slidesHtml += `
        <article class="hero__slide ${activeClass}">
          <div class="hero__slide-image" style="background-image: linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.7)), url('${slide.image}');"></div>
          <div class="hero__content">
            <span class="hero__badge">${slide.tag}</span>
            <h2 class="hero__title">${slide.title}</h2>
          </div>
        </article>
      `;
    }
    slidesContainer.innerHTML = slidesHtml;

    // 生成したスライド要素をすべて取得
    const slideList = slidesContainer.querySelectorAll('.hero__slide');

    // スライド切り替え関数
    const changeSlide = (index) => {
      // 範囲チェック（最後の次は最初へ、最初の前は最後へ）
      if (index >= slideList.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slideList.length - 1;
      } else {
        currentSlide = index;
      }

      // 全スライドの非アクティブ化
      for (let i = 0; i < slideList.length; i++) {
        slideList[i].classList.remove('is-active');
      }

      // 全インジケーターの非アクティブ化
      for (let i = 0; i < indicatorDots.length; i++) {
        indicatorDots[i].classList.remove('is-active');
      }

      // 対象のスライドとインジケーターをアクティブ化
      slideList[currentSlide].classList.add('is-active');
      indicatorDots[currentSlide].classList.add('is-active');
    };

    // 【2. 丸ボタンの動的生成】document.createElement を使用！
    // 単一要素の生成とイベント登録をその場で同時に行うのに最適
    for (let i = 0; i < slideData.length; i++) {
      // button要素を生成
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.classList.add('hero__indicator-dot');

      // 最初の要素には初期アクティブクラスを付与
      if (i === 0) {
        dot.classList.add('is-active');
      }

      // 属性の追加（テンプレートリテラルを使用）
      dot.setAttribute('data-slide-to', i);
      dot.setAttribute('aria-label', `スライド${i + 1}へ`);

      // 作成したその場でクリックイベントを登録！
      dot.addEventListener('click', () => {
        changeSlide(i);
      });

      // コンテナに追加し、切り替え管理用の配列にも保存（push）
      indicatorsContainer.appendChild(dot);
      indicatorDots.push(dot);
    }

    // 次へボタンのクリックイベント
    nextBtn.addEventListener('click', () => {
      changeSlide(currentSlide + 1);
    });

    // 前へボタンのクリックイベント
    prevBtn.addEventListener('click', () => {
      changeSlide(currentSlide - 1);
    });

    // 自動再生タイマー開始関数（第7回: setInterval）
    const startSlideTimer = () => {
      slideTimerId = setInterval(() => {
        changeSlide(currentSlide + 1);
      }, 5000); // 5秒ごとに自動送り
    };

    // 自動再生タイマー停止関数（第7回: clearInterval）
    const stopSlideTimer = () => {
      if (slideTimerId !== null) {
        clearInterval(slideTimerId);
        slideTimerId = null;
      }
    };

    // 初回タイマースタート
    startSlideTimer();

    // マウスホバーで一時停止、マウスが外れたら再開
    sliderElement.addEventListener('mouseenter', stopSlideTimer);
    sliderElement.addEventListener('mouseleave', startSlideTimer);
  }


  /* ====================================================
    5. モーダルウィンドウ（第8回：templateタグとcloneNode）
    - HTML5の <template> タグからモーダルの骨組みを複製（cloneNode）
    - カードの情報を流し込んで画面に挿入
    - 閉じる時はクローンした要素を削除（remove）してDOMをクリーンに保つ
  ==================================================== */
  const modal = document.getElementById('js-modal');
  const modalOverlay = document.getElementById('js-modal-overlay');
  const modalTemplate = document.getElementById('js-modal-template');
  const modalCards = document.querySelectorAll('.js-modal-open');

  // モーダルを閉じる関数
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // スクロール固定を解除

    // モーダルコンテナ（クローンした要素）をDOMから削除
    const container = modal.querySelector('.modal__container');
    if (container) {
      container.remove();
    }
  };

  // モーダルを開く関数
  const openModal = (card) => {
    // 1. templateタグから中身を複製（ディープクローン: true）
    const clone = modalTemplate.content.cloneNode(true);

    // 2. カードのカスタムデータ属性を取得
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const image = card.getAttribute('data-image');
    const tag = card.getAttribute('data-tag');

    // 3. クローンした要素内の各パーツにデータを流し込む
    const titleElem = clone.querySelector('.js-modal-title');
    const descElem = clone.querySelector('.js-modal-desc');
    const imgElem = clone.querySelector('.js-modal-img');
    const tagElem = clone.querySelector('.js-modal-tag');
    const closeBtn = clone.querySelector('.js-modal-close');

    titleElem.textContent = title;
    descElem.textContent = desc;
    imgElem.setAttribute('src', image);
    imgElem.setAttribute('alt', title);
    tagElem.textContent = tag;

    // 4. クローンした閉じるボタンにその場でイベントを登録
    closeBtn.addEventListener('click', closeModal);

    // 5. モーダル枠内にクローンを挿入して表示
    modal.appendChild(clone);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 背景スクロールを固定
  };

  // 実績カードごとにクリックイベントを登録
  for (let i = 0; i < modalCards.length; i++) {
    modalCards[i].addEventListener('click', function () {
      openModal(this);
    });
  }

  // 背景（オーバーレイ）クリックで閉じる
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }


  /* ====================================================
    6. カテゴリーによる記事絞り込み（第3回・第4回・イベントオブジェクト）
    - 親要素にイベントを1つだけ登録（イベント委譲：e.target の活用）
    - dataset によるカスタムデータ属性のスマートな取得
    - for文とif文によるクラス（is-hidden）の切り替え
  ==================================================== */
  const filterContainer = document.querySelector('.news-filter');
  const filterButtons = document.querySelectorAll('.news-filter__btn');
  const newsItems = document.querySelectorAll('.news-item');

  if (filterContainer) {
    // 親要素（.news-filter）でクリックを一括監視（イベント委譲）
    filterContainer.addEventListener('click', (e) => {
      // クリックされた要素（e.target）がボタンかどうかを特定
      const targetBtn = e.target.closest('.news-filter__btn');
      if (!targetBtn) return; // ボタン以外の余白をクリックした場合は何もしない

      // 1. 全ボタンの「is-active」をリセットし、クリックされたボタンに付与
      for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].classList.remove('is-active');
      }
      targetBtn.classList.add('is-active');

      // 2. 選択されたカテゴリー名を取得（dataset.filter）
      const selectedCategory = targetBtn.dataset.filter;

      // 3. 全記事をループし、カテゴリーが一致するか判定
      for (let i = 0; i < newsItems.length; i++) {
        const itemCategory = newsItems[i].dataset.category;

        // 「すべて」選択時、またはカテゴリーが完全一致する場合に表示
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          newsItems[i].classList.remove('is-hidden');
        } else {
          newsItems[i].classList.add('is-hidden');
        }
      }
    });
  }


  /* ====================================================
    7. 日付と現在時刻の表示（第5回：関数・第7回：タイマー・第8回：Date / padStart）
    - 組み込みDateオブジェクトから現在日時を取得
    - padStart() を使ったゼロ埋め関数で共通化（DRY原則）
    - getMilliseconds() で秒の切り替わりジャストに同期（setTimeoutの再帰呼び出し）
  ==================================================== */
  const dateElement = document.getElementById('js-clock-date');
  const timeElement = document.getElementById('js-clock-time');

  // 数値を2桁にゼロ埋めする共通関数（第5回: 関数の活用、第8回: padStart）
  const padZero = (num) => String(num).padStart(2, '0');

  const updateClock = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // 0始まりのため+1
    const date = padZero(now.getDate());

    const hour = padZero(now.getHours());
    const min = padZero(now.getMinutes());
    const sec = padZero(now.getSeconds());

    // 曜日の取得（第4回: 配列インデックスの活用）
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayName = dayNames[now.getDay()];

    // テンプレートリテラルで日時を出力
    if (dateElement && timeElement) {
      dateElement.textContent = `${year}.${month}.${date} (${dayName})`;
      timeElement.textContent = `${hour}:${min}:${sec}`;
    }

    // 【秒ズレ防止のベストプラクティス】
    // 次の「000ミリ秒（秒が変わる瞬間）」までの残り時間を計算して再帰実行
    const delay = 1000 - now.getMilliseconds();
    setTimeout(updateClock, delay);
  };

  // 初回実行（以降は自動で毎秒ジャストに同期）
  updateClock();


  /* ====================================================
    8. ランダム背景画像（第4回：配列・while文、第8回：Mathオブジェクト）
    - 色味やテイストが異なる高解像度背景画像の配列
    - while文を使って「連続で同じ画像が選ばれない」ように制御（実務品質）
  ==================================================== */
  const randomBgBtn = document.getElementById('js-random-bg-btn');

  // 背景画像の配列（テイストが異なる美しい画像群）
  const bgImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80', // ダークブルー・アブストラクト
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1920&q=80', // カラフル・グラデーション
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80', // サイバー・グリッド
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'  // クール・ミニマル
  ];

  let currentBgIndex = -1; // 現在表示中の背景インデックス

  // ランダムに背景を設定する関数
  const applyRandomBackground = () => {
    let nextIndex = Math.floor(Math.random() * bgImages.length);

    // 【while文の活用】前回と同じ画像が選ばれた場合は、違う番号になるまで再抽選！
    while (nextIndex === currentBgIndex) {
      nextIndex = Math.floor(Math.random() * bgImages.length);
    }
    currentBgIndex = nextIndex;

    // bodyの背景画像を設定（薄いグラデーションを重ねてテキストの可読性を保持）
    document.body.style.backgroundImage = `linear-gradient(rgba(248, 250, 252, 0.85), rgba(248, 250, 252, 0.85)), url('${bgImages[currentBgIndex]}')`;
  };

  // 初回読み込み時にランダム背景を適用
  applyRandomBackground();

  // ボタンをクリックした時にも再抽選
  if (randomBgBtn) {
    randomBgBtn.addEventListener('click', applyRandomBackground);
  }


  /* ====================================================
    9. 外部サイトに自動的に「_blank」を付与（第2回：セレクタ・第8回：属性操作）
    - CSSの前方一致セレクタ（^=）で「http」から始まるリンクだけをピンポイント取得
    - target="_blank" とセキュリティ対策の rel 属性を付与
  ==================================================== */
  // 「http://」または「https://」で始まる外部リンクだけを直接取得
  const externalLinks = document.querySelectorAll('a[href^="http://"], a[href^="https://"]');

  for (let i = 0; i < externalLinks.length; i++) {
    externalLinks[i].setAttribute('target', '_blank');
    externalLinks[i].setAttribute('rel', 'noopener noreferrer'); // セキュリティ対策
  }


  /* ====================================================
    10. トップへ戻るボタン（第8回：windowオブジェクト・スクロール）
    - classList.toggle の第2引数（真偽値）でスマートに1行制御
    - passive: true によるスクロールパフォーマンス最適化
    - クリックでスムーズに先頭へスクロール
  ==================================================== */
  const backToTopBtn = document.getElementById('js-back-to-top');

  if (backToTopBtn) {
    // スクロール量が300pxを超えたら表示（第2引数の真偽値でadd/removeを自動切り替え）
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('is-visible', window.scrollY > 300);
    }, { passive: true });

    // ボタンクリックでページの先頭へスムーズに戻る
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ====================================================
    11. スクロール連動のフェードイン（第8回：windowとgetBoundingClientRect）
    - getBoundingClientRect() で要素の画面上部からの距離を取得
    - window.innerHeight と比較して画面内に入ったら「is-visible」を付与
    - すでに表示された要素は判定をスキップしてパフォーマンスを最適化
  ==================================================== */
  const fadeElements = document.querySelectorAll('.js-fade');

  const checkScrollFade = () => {
    // 画面下部から80px入った位置を発火ラインとする
    const triggerBottom = window.innerHeight - 80;

    for (let i = 0; i < fadeElements.length; i++) {
      const el = fadeElements[i];

      // まだ表示されていない要素だけを判定（表示済みはスキップして軽量化）
      if (!el.classList.contains('is-visible')) {
        const rect = el.getBoundingClientRect();

        // 要素の上端が発火ラインを超えたら表示
        if (rect.top < triggerBottom) {
          el.classList.add('is-visible');
        }
      }
    }
  };

  // 初回チェック（ファーストビュー周辺の要素を即座に表示）
  checkScrollFade();

  // スクロール時にチェック（passive: true でスクロール処理を滑らかに）
  window.addEventListener('scroll', checkScrollFade, { passive: true });


  /* ====================================================
    12. お問い合わせフォームの簡易バリデーション（第9回）
    - e.preventDefault() による送信キャンセル
    - 必須入力、メール形式、文字数、同意チェック
    - closest() による親要素（.contact-form__group）の取得
    - エラー時の自動フォーカス（アクセシビリティ向上）
    - input / change イベントによるエラーの即時解除
  ==================================================== */
  const contactForm = document.getElementById('js-contact-form');
  const successBox = document.getElementById('js-contact-success');
  const resetBtn = document.getElementById('js-contact-reset-btn');

  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const passwordInput = document.getElementById('user-password');
  const messageInput = document.getElementById('user-message');
  const agreeCheckbox = document.getElementById('user-agree');

  if (contactForm) {
    // フォーム送信時のバリデーション
    contactForm.addEventListener('submit', (e) => {
      // 1. デフォルトの送信挙動（画面遷移）をキャンセル
      e.preventDefault();

      let hasError = false;         // エラー全体の判定フラグ
      let firstErrorInput = null;   // 最初にエラーになった入力項目を記録

      // お名前チェック（空文字判定：trim()で前後の空白を除去）
      const groupName = nameInput.closest('.contact-form__group');
      if (nameInput.value.trim() === '') {
        groupName.classList.add('is-error');
        hasError = true;
        if (!firstErrorInput) firstErrorInput = nameInput;
      } else {
        groupName.classList.remove('is-error');
      }

      // メールアドレスチェック（空文字 ＆ 「@」が含まれるか判定）
      // ※ ES2015以降は includes() が直感的。従来の indexOf('@') === -1 でも判定可能
      const groupEmail = emailInput.closest('.contact-form__group');
      if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        groupEmail.classList.add('is-error');
        hasError = true;
        if (!firstErrorInput) firstErrorInput = emailInput;
      } else {
        groupEmail.classList.remove('is-error');
      }

      // パスワードチェック（6文字以上）
      const groupPassword = passwordInput.closest('.contact-form__group');
      if (passwordInput.value.length < 6) {
        groupPassword.classList.add('is-error');
        hasError = true;
        if (!firstErrorInput) firstErrorInput = passwordInput;
      } else {
        groupPassword.classList.remove('is-error');
      }

      // お問い合わせ内容チェック（10文字以上）
      const groupMessage = messageInput.closest('.contact-form__group');
      if (messageInput.value.trim().length < 10) {
        groupMessage.classList.add('is-error');
        hasError = true;
        if (!firstErrorInput) firstErrorInput = messageInput;
      } else {
        groupMessage.classList.remove('is-error');
      }

      // 同意チェックボックス（checked判定）
      const groupAgree = agreeCheckbox.closest('.contact-form__group');
      if (!agreeCheckbox.checked) {
        groupAgree.classList.add('is-error');
        hasError = true;
        if (!firstErrorInput) firstErrorInput = agreeCheckbox;
      } else {
        groupAgree.classList.remove('is-error');
      }

      // エラー項目があれば、最初の入力欄へ自動フォーカス（UX・アクセシビリティ向上）
      if (firstErrorInput) {
        firstErrorInput.focus();
      }

      // エラーが1つもなければ送信成功処理
      if (!hasError) {
        contactForm.classList.add('is-hidden');
        successBox.classList.add('is-active');
        contactForm.reset(); // フォームを初期化
      }
    });

    // ユーザーが入力を修正したとき、エラー表示を即座に解除（リアルタイムフィードバック）
    // イベント委譲（フォーム全体で input と change を監視）
    contactForm.addEventListener('input', (e) => {
      const group = e.target.closest('.contact-form__group');
      if (group) {
        group.classList.remove('is-error');
      }
    });
    contactForm.addEventListener('change', (e) => {
      const group = e.target.closest('.contact-form__group');
      if (group) {
        group.classList.remove('is-error');
      }
    });

    // 「別のメッセージを送信する」ボタンでフォームを再表示
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        successBox.classList.remove('is-active');
        contactForm.classList.remove('is-hidden');
        nameInput.focus(); // 最初の入力欄にフォーカス
      });
    }
  }


  /* ====================================================
    13. パスワードの表示/非表示切り替え（第2回・第3回）
    - inputのtype属性を「password」と「text」で切り替える
  ==================================================== */
  const passwordToggleBtn = document.getElementById('js-password-toggle');

  if (passwordToggleBtn && passwordInput) {
    passwordToggleBtn.addEventListener('click', () => {
      // 現在のtype属性を確認
      const currentType = passwordInput.getAttribute('type');

      if (currentType === 'password') {
        // パスワードを表示
        passwordInput.setAttribute('type', 'text');
        passwordToggleBtn.textContent = '非表示';
        passwordToggleBtn.setAttribute('aria-label', 'パスワードを非表示にする');
      } else {
        // パスワードを隠す
        passwordInput.setAttribute('type', 'password');
        passwordToggleBtn.textContent = '表示';
        passwordToggleBtn.setAttribute('aria-label', 'パスワードを表示する');
      }
    });
  }

});
