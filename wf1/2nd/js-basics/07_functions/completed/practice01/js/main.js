function showWelcome() {
    console.log('いらっしゃいませ。');
    console.log('本日のセール品をご覧ください。');
}
showWelcome();
showWelcome();

// 1. アロー関数の定義
const printLog = () => {
    console.log('--- システムチェック開始 ---');
    console.log('異常はありませんでした。');
};

// 2. 関数の呼び出し（2回実行）
printLog();
printLog();

const cartDisplay = document.getElementById('cart-display');
const addCartBtn = document.getElementById('add-cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

// カート内の商品点数
let itemCount = 0;

// カートを空（初期状態）に戻す共通関数を定義
const clearCart = () => {
    itemCount = 0;
    cartDisplay.textContent = 'カートに商品はありません（0点）';
    cartDisplay.classList.remove('has-item');
};

// 1. ページを開いた最初のタイミングで実行
clearCart();

// 2. 「商品をカートに入れる」ボタンが押されたとき
addCartBtn.addEventListener('click', () => {
    itemCount++;
    cartDisplay.textContent = `現在カートに ${itemCount}点 の商品が入っています`;
    cartDisplay.classList.add('has-item');
});

// 3. 「カートを空にする」ボタンが押されたとき（共通関数を呼び出す）
clearCartBtn.addEventListener('click', () => {
    clearCart();
});

const orderDrink = (drink, size = 'M') => {
    console.log(`注文：${drink}（${size}サイズ）`);
};

// 1回目：サイズに 'L' を指定して呼び出す
orderDrink('アイスコーヒー', 'L');

// 2回目：サイズを省略して呼び出す（デフォルトの 'M' が使われる）
orderDrink('オレンジジュース');

const alertBanner = document.getElementById('alert-banner');
const successBtn = document.getElementById('success-btn');
const warningBtn = document.getElementById('warning-btn');
const errorBtn = document.getElementById('error-btn');

// メッセージとクラス名を受け取ってバナーを更新する共通関数
const updateBanner = (message, typeClass) => {
    // 1. テキストを更新
    alertBanner.textContent = message;

    // 2. 既存の状態クラスをすべて外してリセット
    alertBanner.classList.remove('is-success', 'is-warning', 'is-error');

    // 3. 引数で渡された新しい状態クラスを付与
    alertBanner.classList.add(typeClass);
};

// 各ボタンのクリック時に、引数を変えて同じ関数を呼び出す
successBtn.addEventListener('click', () => {
    updateBanner('データの保存が完了しました。', 'is-success');
});

warningBtn.addEventListener('click', () => {
    updateBanner('ストレージの残り容量が少なくなっています。', 'is-warning');
});

errorBtn.addEventListener('click', () => {
    updateBanner('通信エラーが発生しました。再試行してください。', 'is-error');
});

// 税抜価格を受け取り、税込価格（10%加算・切り捨て）を返す関数
const calcTaxPrice = (price) => {
    const taxed = Math.floor(price * 1.1);
    return taxed;
};

// 関数を呼び出して戻り値を受け取る
const coffeeTotal = calcTaxPrice(500);
console.log(`500円の税込価格：${coffeeTotal}円`); // => 500円の税込価格：550円

const priceResult = document.getElementById('price-result');
const coffeeBtn = document.getElementById('coffee-btn');
const lunchBtn = document.getElementById('lunch-btn');

// ブレンドコーヒー（500円）ボタン
coffeeBtn.addEventListener('click', () => {
    const total = calcTaxPrice(500);
    priceResult.textContent = `ブレンドコーヒー：税込 ${total}円`;
});

// ランチセット（1,200円）ボタン
lunchBtn.addEventListener('click', () => {
    const total = calcTaxPrice(1200);
    priceResult.textContent = `ランチセット：税込 ${total}円`;
});