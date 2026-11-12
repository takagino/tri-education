# 06_ループの応用とMathオブジェクト

### JavaScript基礎（月1-2）

[00_導入](https://app.notion.com/p/00_-3c8bdf471aca80718977dd0a6c418f1c?pvs=21)

[01_**基礎知識・変数・データ型**](https://app.notion.com/p/01_-3eebdf471aca80b885faee84d1ee0e34?pvs=21)

[02_DOMの取得と要素の書き換え](https://app.notion.com/p/02_DOM-3eebdf471aca80b2bdf0ccdf290d4f22?pvs=21)

[03_イベント処理とクラス操作](https://app.notion.com/p/03_-3eebdf471aca803c8652dbbe59e55e84?pvs=21)

[04_条件分岐と属性操作](https://app.notion.com/p/04_-3eebdf471aca806498c3dae7d9c63f5a?pvs=21)

[05_配列と繰り返し処理](https://app.notion.com/p/05_-3eebdf471aca801f957ece032296e560?pvs=21)

[06_ループの応用とMathオブジェクト](https://app.notion.com/p/06_-Math-3eebdf471aca8096bb72c68c3a10467e?pvs=21)

[07_関数の定義と活用](https://app.notion.com/p/07_-3eebdf471aca803d968af95d2abfda32?pvs=21)

[08_DOMトラバーサルとイベント委譲](https://app.notion.com/p/08_DOM-3eebdf471aca803bb273f949cc61b1a1?pvs=21)

[09_タイマー処理と非同期アニメーション](https://app.notion.com/p/09_-3eebdf471aca80a5b59ec9ed34701cf5?pvs=21)

[10_オブジェクトとHTML動的生成](https://app.notion.com/p/10_-HTML-3eebdf471aca80038d96fe564ca71dca?pvs=21)

[11_組み込みオブジェクトとスクロール演出](https://app.notion.com/p/11_-3eebdf471aca80f3a0b5d3388b680a82?pvs=21)

[12_フォーム操作とバリデーション](https://app.notion.com/p/12_-3eebdf471aca80f593e9f58639f51660?pvs=21)

[13_最終課題](https://app.notion.com/p/13_-3eebdf471aca806da737c9535074543a?pvs=21)

# 1. はじめに

## 1-1. 確認テスト

- **制限時間：**約10分
- **形式：**4択選択式・全10問
- **対象：**単元05の復習（配列の基礎、インデックスと.length、.push()、for文ループ、querySelectorAllとNodeList、排他制御など）
- **回答リンク：**

---

## 1-2. 本日のゴール

- JavaScriptに標準で備わっている数学用ツール **`Math` オブジェクト** の基本（`Math.random()`、`Math.floor()` など）を理解できる。
- 実務頻出の計算式 **`Math.floor(Math.random() * N)`** を使いこなし、指定した範囲のランダムな整数を自在に生成できる。
- 前週学んだ **「配列」と「ランダム整数」を組み合わせ**、おみくじやバナーのように配列の中からランダムにデータを抽出して画面に反映できる。
- 前週学んだ **`querySelectorAll` と排他制御** を組み合わせ、画面に並んだ複数の要素からランダムに1つだけを選んでアクティブ表示（ハイライト）できる。
- 決まった回数を繰り返す `for` 文に対し、**「条件を満たす間ずっと繰り返す」`while` 文** の動作原理と使い分けを理解できる。
- 実務で必ず求められる **「直前に表示されたデータと同じものが連続して出ない重複防止（連続重複の回避）アルゴリズム」** を自力で実装できる。
- 配列から指定した要素を取り除く **`.splice()`** の基本を理解し、一度選ばれた要素が二度と選ばれない完全重複排除の抽選UIを実装できる。
- 本日の総合課題として、ボタンを押すたびに背景画像とテキストがランダムに切り替わる **「ランダム背景ヒーローセクション（重複防止機能付き）」** を完成させる。

---

## 1-3. 開発環境の準備

本日の演習では、段階的にステップアップしながらコードを書いていきます。
まずは前半の基本演習を行う作業フォルダ **`practice01`** を作成してスタートしましょう。

VSCodeで本日の学習フォルダ **`06_math_random`** を開き、その中に **`practice01`** フォルダを作成します。

【ディレクトリ構成】

```
06_math_random/
└── practice01/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

以下のコードをそれぞれのファイルにコピー＆ペーストして準備してください。

`practice01/index.html`

```markup
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>06_ループの応用とMathオブジェクト</title>
  <link rel="stylesheet" href="css/style.css">
  <script defer src="js/main.js"></script>
</head>
<body>
  <div class="container">
    <h1>Mathオブジェクトとランダム処理</h1>

    <!-- 演習1：サイコロシミュレーター -->
    <section class="demo-box">
      <h2>サイコロを振る</h2>
      <div id="dice-result" class="result-display">-</div>
      <button type="button" id="roll-dice-btn" class="action-btn">サイコロを振る</button>
    </section>

    <!-- 演習2：おみくじUI -->
    <section class="demo-box">
      <h2>本日のおみくじ</h2>
      <div id="omikuji-result" class="result-display">運勢を占おう</div>
      <p id="omikuji-message" class="sub-message">ボタンを押すと今日の運勢が表示されます。</p>
      <button type="button" id="omikuji-btn" class="action-btn">おみくじを引く</button>
    </section>

    <!-- 演習3：ランダム当選カード（querySelectorAll × 排他制御） -->
    <section class="demo-box">
      <h2>プレゼント抽選カード</h2>
      <div class="card-grid">
        <div class="card">A賞：特選ギフト</div>
        <div class="card">B賞：カフェチケット</div>
        <div class="card">C賞：オリジナルステッカー</div>
        <div class="card">D賞：参加賞クーポン</div>
      </div>
      <button type="button" id="draw-card-btn" class="action-btn">当選カードを抽選する</button>
    </section>
  </div>
</body>
</html>
```

`practice01/css/style.css`

```css
@charset "UTF-8";

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  padding: 40px 20px;
  background-color: #f7fafc;
  color: #2d3748;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-box {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.demo-box h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.25rem;
}

.result-display {
  font-size: 2.5rem;
  font-weight: bold;
  padding: 20px;
  background-color: #edf2f7;
  border-radius: 8px;
  margin-bottom: 16px;
  color: #3182ce;
}

.sub-message {
  margin-top: 0;
  margin-bottom: 16px;
  color: #718096;
}

.action-btn {
  padding: 10px 24px;
  background-color: #4299e1;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #3182ce;
}

/* 演習3：カードグリッドとアクティブ状態 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.card {
  padding: 16px;
  background-color: #edf2f7;
  border-radius: 6px;
  font-weight: bold;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.card.is-active {
  background-color: #ebf8ff;
  border-color: #3182ce;
  color: #2b6cb0;
  box-shadow: 0 0 10px rgba(49, 130, 206, 0.3);
}
```

`practice01/js/main.js`

```javascript
// 06_ループの応用とMathオブジェクト
console.log('ready!');
```

ブラウザで `practice01/index.html` を開き、デベロッパーツールのコンソールに `ready!` と表示されれば準備完了です。

---

# 2. 数値の計算とMathオブジェクト

## 2-1. `Math` オブジェクトとは？

JavaScriptには、数学的な計算を簡単に行うための便利ツールがひとまとめになった **`Math` オブジェクト** があらかじめ組み込まれています。

これまでの変数のように `new` を使って作成する必要はなく、いつでもどこでも **`Math.メソッド名()`** と書くだけで様々な計算を実行できます。

---

## 2-2. 端数を処理する3つのメソッド（切り捨て・切り上げ・四捨五入）

Webサイト制作では、「割り算の結果の小数を丸めたい」「画面のピクセル数を整数に揃えたい」という場面がよくあります。
`Math` オブジェクトには、目的に応じた3つの端数処理メソッドが用意されています。

```javascript
const num = 4.6;

// 1. 小数点以下を切り捨てる（床：floor）
console.log(Math.floor(num)); // => 4

// 2. 小数点以下を切り上げる（天井：ceil）
console.log(Math.ceil(num));  // => 5

// 3. 四捨五入する（round）
console.log(Math.round(num)); // => 5
console.log(Math.round(4.4)); // => 4
```

| メソッド | 意味 | 覚え方 | 例（4.6の場合） | 例（4.2の場合） |
|---|---|---|:---:|:---:|
| **`Math.floor(x)`** | **切り捨て** | floor（床：下へ落とす） | `4` | `4` |
| **`Math.ceil(x)`** | **切り上げ** | ceiling（天井：上へ持ち上げる） | `5` | `5` |
| **`Math.round(x)`** | **四捨五入** | round（丸める） | `5` | `4` |

<callout icon="💡" color="gray_bg">
	**実務で最もよく使うのは `Math.floor()`**

	WebデザインやUI制作において、最も頻繁に登場するのは **`Math.floor()`（切り捨て）** です。
	このあと学ぶ「ランダムな整数の生成」や「配列のインデックス番号の計算」において、主役として大活躍します。
</callout>

---

## 2-3. ランダムな小数を生成する：`Math.random()`

Webサイトに「運勢おみくじ」「ランダム背景画像」「アクセスするたびに変わるおすすめ記事」のような偶然性（ランダム要素）を持たせたいときに使うのが **`Math.random()`** です。

```javascript
console.log(Math.random()); // => 0.729183471... のようなランダムな小数
```

### `Math.random()` の最も重要な性質

`Math.random()` は呼び出されるたびに、以下の範囲の数値をランダム（疑似乱数）で1つ返します。

$$0 \le \text{戻り値} < 1$$

- **最小値：** `0`（`0` ちょうどが出る可能性はあります）
- **最大値：** `0.9999999...`（**`1` ちょうどが出ることは絶対にありません**）

<callout icon="⚠️" color="gray_bg">
	**超重要：`Math.random()` は「1未満の小数」しか出ません**

	「サイコロを振りたいから `Math.random() * 6` をそのまま使う」と書いても、`0.12345...` や `3.8291...` のような中途半端な小数が返ってきてしまいます。
	実務で使える「1、2、3...」のような **きれいな整数** を作るには、次に解説する組み合わせテクニックが必須となります。
</callout>

---

## 2-4. 【最重要】0〜N-1 のランダムな整数を生成する黄金公式

Web制作の実務において、何千回と書くことになる定型パターンが **`Math.floor(Math.random() * N)`** です。
この式を使うと、**`0` から `N - 1` までの整数** をランダムに1つ生み出すことができます。

```javascript
// 0, 1, 2, 3, 4 のいずれかの整数をランダムに取得する（N = 5）
const randomNum = Math.floor(Math.random() * 5);
console.log(randomNum);
```

### なぜこの式で「0 〜 N-1 の整数」になるのか？（3ステップ解説）

例として、`N = 5`（5種類のデータから1つ選びたい場合）で考えてみましょう。

1. **`Math.random()` で小数を生成する：**
   `0` 以上 `1` 未満の小数が作られます（例：`0.72`）。
   $$\text{範囲：} 0 \le x < 1$$
2. **`* 5` を掛けて範囲を広げる：**
   最小値は `0 * 5 = 0`、最大値は `0.9999... * 5 = 4.9999...` に広がります。
   $$\text{範囲：} 0 \le x < 5 \quad (0 \sim 4.9999\dots)$$
3. **`Math.floor()` で小数点以下をバッサリ切り捨てる：**
   `0.xxx` は `0` に、`1.xxx` は `1` に、`4.xxx` は `4` になります。
   結果として、現れる整数は **`0, 1, 2, 3, 4` のいずれか** になります。

<callout icon="📌" color="gray_bg">
	**配列のインデックスと完璧に一致する**

	要素数が 5 個の配列（`length` が `5`）のインデックスは `0, 1, 2, 3, 4` でしたね。
	つまり、`Math.floor(Math.random() * 配列の要素数)` と書けば、**配列の中からランダムに1つの要素を選ぶための番号が完璧に手に入ります**。
</callout>

---

## ⭐︎ 練習：サイコロを振ってみよう（1〜6のランダム整数生成）

「サイコロを振る」ボタンをクリックすると、`1` から `6` までの整数がランダムに画面の `#dice-result` に表示されるプログラムを作ってみましょう。

### 仕様・要件

1. 画面上の結果表示エリア（`#dice-result`）とボタン（`#roll-dice-btn`）を取得してください。
2. ボタンがクリックされたときに以下の処理を実行してください。
	- `1` から `6` までの整数をランダムに1つ計算して生成する。
	- 生成した数値を `#dice-result` のテキストとして画面に表示する。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- `Math.floor(Math.random() * 6)` を実行すると、得られる数字の範囲は `0` から `5` までになります。
	- サイコロの目は `1` から `6` なので、出た結果に `+ 1` を足してあげると目的の数値になります。
</callout>

- 正解のソースコード（practice01/js/main.js）

```javascript
const diceResult = document.getElementById('dice-result');
const rollDiceBtn = document.getElementById('roll-dice-btn');

rollDiceBtn.addEventListener('click', () => {
  // 0〜5 のランダム整数に +1 して 1〜6 にする
  const diceNumber = Math.floor(Math.random() * 6) + 1;

  // 画面に表示
  diceResult.textContent = diceNumber;
});
```

ブラウザでボタンを何度かクリックし、1から6までの数字がランダムに表示されることを確認してください。

---

# 3. 配列 × ランダム抽出の実践

## 3-1. ランダムなインデックスの生成

前章の計算式を配列と組み合わせると、配列の中からランダムに1つのデータを取り出すことができます。

```javascript
const omikujiList = ['大吉', '中吉', '小吉', '凶'];

// 配列の長さ（4）を掛けて 0〜3 のランダムな番号を作る
const randomIndex = Math.floor(Math.random() * omikujiList.length);

// ランダムに選ばれた要素を取り出す
console.log(omikujiList[randomIndex]);
```

数字を直接 `4` と書かず、**`omikujiList.length`** を指定するのが鉄則です。
こうすることで、あとから配列に `'末吉'` や `'大凶'` を追加して要素数が変わっても、コードを書き直すことなく自動で新しい要素まで抽選対象に含まれるようになります。

---

## ⭐︎ 練習：おみくじUIを作ろう（ボタンクリックでランダム表示）

「おみくじを引く」ボタンを押すと、配列に用意された運勢と解説メッセージがランダムに画面へ表示されるプログラムを作ってみましょう。

### 仕様・要件

1. 結果表示エリア（`#omikuji-result`）、メッセージ表示エリア（`#omikuji-message`）、「おみくじを引く」ボタン（`#omikuji-btn`）を取得してください。
2. 以下の2つの配列を用意してください（内容は自由にアレンジしても構いません）。
	- 運勢の配列（例：`'大吉'`, `'中吉'`, `'小吉'`, `'吉'`, `'凶'`）
	- それぞれの運勢に対応するアドバイスメッセージの配列（同じ順番・同じ件数で用意）
3. ボタンをクリックしたときに以下の処理を実行してください。
	- 配列の要素数をもとに、`0` から「配列の要素数 - 1」までのランダムなインデックス番号を生成する。
	- 選ばれたインデックス番号を使って、画面の運勢表示とメッセージ表示を同時に更新する。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- ランダムなインデックス番号を生成する式は `Math.floor(Math.random() * 配列.length)` です。
	- 生成した1つのインデックス番号（例：`randomIndex`）を使い、`運勢配列[randomIndex]` と `メッセージ配列[randomIndex]` の両方を取り出すことで、運勢とメッセージをピタッと連動させることができます。
</callout>

- 正解のソースコード（practice01/js/main.js に追記）

```javascript
const omikujiResult = document.getElementById('omikuji-result');
const omikujiMessage = document.getElementById('omikuji-message');
const omikujiBtn = document.getElementById('omikuji-btn');

// 運勢の配列
const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];

// 各運勢に対応するメッセージの配列
const messages = [
  '最高の1日になります。新しいことに挑戦してみましょう。',
  '思いがけない嬉しい出来事があるかもしれません。',
  '焦らずマイペースに進むと良い結果につながります。',
  '普段通りの日常に小さな幸せが見つかりそうです。',
  '無理は禁物です。今日はゆっくり休んで体調を整えましょう。'
];

omikujiBtn.addEventListener('click', () => {
  // 0 〜 fortunes.length - 1 のランダムなインデックスを生成
  const randomIndex = Math.floor(Math.random() * fortunes.length);

  // 画面のテキストを更新
  omikujiResult.textContent = fortunes[randomIndex];
  omikujiMessage.textContent = messages[randomIndex];
});
```

ブラウザでおみくじボタンを押し、運勢とメッセージがランダムに切り替わることを確認してください。

---

## 3-2. `querySelectorAll` と組み合わせたランダムハイライト

前週の単元05では、`document.querySelectorAll()` で取得した複数の要素すべてに対して、`for` 文を使って「全員から `.is-active` を外し、選ばれた要素だけに `.is-active` を付ける（排他制御）」というテクニックを学習しました。

この排他制御に `Math.floor(Math.random() * N)` を組み合わせることで、**「並んでいる複数のカードや候補の中から、ランダムに選ばれた1つだけを強調表示するUI（当選演出・ルーレット演出）」** が作れます。

```javascript
const cards = document.querySelectorAll('.card');

// 1. まず全員から is-active クラスを外す（全員リセット）
for (let i = 0; i < cards.length; i++) {
  cards[i].classList.remove('is-active');
}

// 2. 0 〜 cards.length - 1 のランダムな番号を1つ選ぶ
const randomIndex = Math.floor(Math.random() * cards.length);

// 3. ランダムに選ばれた1枚だけに is-active クラスを付ける
cards[randomIndex].classList.add('is-active');
```

このように、ランダムなインデックス番号は配列から文字列を取り出すためだけでなく、**「複数取得したHTML要素（NodeList）のうち、どの要素をアクティブにするか決める番号」** としても大活躍します。

---

## ⭐︎ 練習：ランダムに1枚のカードをハイライトしよう（querySelectorAll × 排他制御）

「当選カードを抽選する」ボタンを押すと、4枚並んだプレゼントカードの中からランダムに1枚だけが選ばれ、青色の枠線と背景（`.is-active`）で強調表示されるプログラムを作ってみましょう。

### 仕様・要件

1. 画面上の4枚のカード要素（`.card`）を `querySelectorAll` でまとめて取得し、抽選ボタン（`#draw-card-btn`）を取得してください。
2. ボタンをクリックしたときに以下の処理を実行してください。
	- 単元05で学んだ `for` 文を使い、すべてのカードから一旦 `.is-active` クラスを削除してリセットする。
	- `0` から「カードの総数 - 1」までのランダムな整数を1つ生成する。
	- 生成したインデックス番号に該当するカード要素（`cards[randomIndex]`）だけに、`.is-active` クラスを追加する。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- 抽選する前に必ず `for` 文で全員の `.is-active` を消しておかないと、ボタンを押すたびに当選カードがどんどん増えて全員が光ってしまいます。
	- ランダムな番号を決める計算式は、前週学んだ `cards.length` を使って `Math.floor(Math.random() * cards.length)` と記述します。
</callout>

- 正解のソースコード（practice01/js/main.js に追記）

```javascript
const cards = document.querySelectorAll('.card');
const drawCardBtn = document.getElementById('draw-card-btn');

drawCardBtn.addEventListener('click', () => {
  // 1. すべてのカードから is-active を削除（リセット）
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('is-active');
  }

  // 2. 0 〜 cards.length - 1 のランダムなインデックスを生成
  const randomIndex = Math.floor(Math.random() * cards.length);

  // 3. ランダムに選ばれたカードだけに is-active を付与
  cards[randomIndex].classList.add('is-active');
});
```

ブラウザで「当選カードを抽選する」ボタンを何度かクリックし、4枚のうちランダムに選ばれた1枚だけが青く光って切り替わることを確認してください。

---

# 4. `while` 文とループの応用

ここからの学習では、**「直前と同じ結果が連続して出ないようにする重複防止ロジック」** を構築していきます。
前章までの演習コードを残しておくため、`practice01` フォルダを丸ごと複製して `practice02` を用意しましょう。

## 4-1. 演習フォルダの複製と準備

1. VSCodeのエクスプローラー上で、**`practice01`** フォルダを右クリックして「コピー」し、「貼り付け」します。
2. 作成されたフォルダの名前を **`practice02`** に変更します。
3. `practice02` フォルダ内の各ファイルを、以下のコードで置き換えてください（`js/main.js` は一旦空にします）。

【ディレクトリ構成】

```
06_math_random/
├── practice01/  ← 前半の成果物
└── practice02/  ← ここから作業するフォルダ
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

`practice02/index.html`

```markup
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>06_while文と重複防止ロジック</title>
  <link rel="stylesheet" href="css/style.css">
  <script defer src="js/main.js"></script>
</head>
<body>
  <div class="container">
    <h1>while文と重複防止ロジック</h1>

    <!-- 演習1：目標が出るまで回すシミュレーター -->
    <section class="demo-box">
      <h2>「大吉」が出るまで引き続ける</h2>
      <button type="button" id="draw-until-btn" class="action-btn">大吉が出るまで引く</button>
      <div id="draw-log" class="log-area">結果がここに表示されます</div>
    </section>

    <!-- 演習2：連続重複防止メッセージ -->
    <section class="demo-box">
      <h2>名言ジェネレーター（連続重複防止）</h2>
      <blockquote id="quote-text" class="quote-display">ボタンを押してください</blockquote>
      <p id="quote-author" class="quote-author">-</p>
      <button type="button" id="quote-btn" class="action-btn">次の名言を表示</button>
    </section>

    <!-- 演習3：発表者ルーレット（二度と選ばれない抽選） -->
    <section class="demo-box">
      <h2>発表者ルーレット（二度と選ばれない抽選）</h2>
      <div id="presenter-result" class="result-display">誰が当たるかな</div>
      <p id="remaining-count" class="sub-message">残りの候補：4人</p>
      <button type="button" id="presenter-btn" class="action-btn">次の発表者を決める</button>
    </section>
  </div>
</body>
</html>
```

`practice02/css/style.css`

```css
@charset "UTF-8";

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  padding: 40px 20px;
  background-color: #f7fafc;
  color: #2d3748;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-box {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.demo-box h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.25rem;
}

.action-btn {
  padding: 10px 20px;
  background-color: #4299e1;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #3182ce;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.result-display {
  font-size: 2rem;
  font-weight: bold;
  padding: 16px;
  background-color: #edf2f7;
  border-radius: 8px;
  margin-bottom: 12px;
  color: #3182ce;
  text-align: center;
}

.sub-message {
  margin-top: 0;
  margin-bottom: 16px;
  color: #718096;
  text-align: center;
}

.log-area {
  margin-top: 16px;
  padding: 16px;
  background-color: #edf2f7;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  max-height: 180px;
  overflow-y: auto;
  text-align: left;
}

.quote-display {
  margin: 16px 0 8px;
  padding: 16px;
  background-color: #ebf8ff;
  border-left: 4px solid #3182ce;
  font-size: 1.15rem;
  font-weight: 500;
  min-height: 80px;
}

.quote-author {
  text-align: right;
  color: #718096;
  font-style: italic;
  margin-top: 0;
  margin-bottom: 16px;
}
```

`practice02/js/main.js`

```javascript
// practice02
console.log('practice02 ready!');
```

---

## 4-2. `for` 文と `while` 文の違い

単元05で学んだ `for` 文は、「5回繰り返す」「配列の要素数ぶん繰り返す」といった **繰り返す回数があらかじめ決まっているとき** に使う構文でした。

しかし、実際のプログラムでは **「特定の条件が満たされるまで、何回かかるか分からないけれど処理を繰り返したい」** という場面に出会います。
例えば、「サイコロで 6 が出るまで振り直す」「直前と違う番号が出るまで再抽選する」といったケースです。

このような場面で使用するのが **`while` 文** です。

| 構文 | 繰り返す回数 | 主な用途 |
|---|---|---|
| **`for` 文** | **事前に決まっている**（例: 10回、配列の要素数） | 配列の一覧表示、HTMLの一括生成、ボタン全員へのイベント登録 |
| **`while` 文** | **事前に決まっていない**（条件が満たされるまで） | 重複が出なくなるまでの再抽選、ゲームのターン継続、目的の数値が出るまでの試行 |

---

## 4-3. `while` 文の基本構文と動作原理

```javascript
while (条件式) {
  // 条件式が true の間、何度も繰り返し実行される処理
}
```

条件式が `true` である限り、`{ }` の中の処理が延々と繰り返されます。
各周回の開始時に条件が判定され、`false` になった瞬間にループを抜けて次の行へ進みます。

```javascript
let count = 0;

// count が 3 未満である間は繰り返す
while (count < 3) {
  console.log(`現在のカウント: ${count}`);
  count++; // 値を増やさないと無限ループになる
}

console.log('ループ終了');
```

コンソールの出力結果：

```
現在のカウント: 0
現在のカウント: 1
現在のカウント: 2
ループ終了
```

<callout icon="🚨" color="gray_bg">
	**最重要警告：無限ループに注意**

	`while` 文の中で、条件式を `false` に変化させる処理（例：`count++` や新しい値の再代入）を書き忘れると、条件が一生 `true` のままとなり、ブラウザが完全にフリーズ（無限ループ）します。
	`while` 文を書くときは、**「いつか必ず条件が false になってループを抜ける保証があるか」** を常に意識してください。
</callout>

---

## ⭐︎ 練習：while文の基本動作を体験しよう（コンソール演習）

画面の操作（DOM操作）に入る前に、まずはコンソールを使って `while` 文の動作感覚を掴みましょう。
「サイコロを振って、目的の目（`6`）が出るまで何度も振り続ける」という処理を書いてみます。

### 仕様・要件

1. サイコロの出目を保持する変数 `dice` を用意してください（初期値は `6` 以外の数値、例えば `0`）。
2. `while` 文を使い、**「出目が 6 ではない間」** 以下の処理を繰り返してください。
	- `1` から `6` までのランダムな整数を計算し、変数 `dice` に上書き代入する。
	- コンソールに `出た目: ${dice}` と出力する。
3. ループが終了した直後に、コンソールに `6が出たので終了しました` と出力してください。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- 条件式は「6ではない間」なので、比較演算子を使い `while (dice !== 6)` と記述します。
	- もし `let dice = 6;` と最初から 6 を入れてしまうと、1回もループが回らずに終わってしまいます。最初からループを回すため、最初は必ず 6 以外の値を入れておきます。
	- 1から6のランダム整数は、セクション2で学んだ `Math.floor(Math.random() * 6) + 1` です。
</callout>

- 正解のソースコード（practice02/js/main.js）

```javascript
// 出目を保存する変数（最初は6以外の適当な数字にしておく）
let dice = 0;

// 出目が6ではない間、ずっと繰り返す
while (dice !== 6) {
  // 1〜6のランダムな目を生成
  dice = Math.floor(Math.random() * 6) + 1;
  console.log(`出た目: ${dice}`);
}

console.log('6が出たので終了しました');
```

ブラウザをリロード（再読み込み）するたびに、2回で終わることもあれば10回以上続いてから終わることもあり、条件が満たされるまで自動で繰り返される様子がコンソールで確認できます。

---

## ⭐︎ 練習：目標の数字が出るまでおみくじを引き続けるシミュレーター

`while` 文を使って、「大吉（インデックス番号 0）」が出るまで何度もおみくじを引き続け、何回目で大吉が出たかを画面にログ出力する処理を作ってみましょう。

### 仕様・要件

1. ボタン（`#draw-until-btn`）とログ表示エリア（`#draw-log`）を取得してください。
2. ボタンをクリックしたときに以下の処理を実行してください。
	- 試行回数をカウントする変数（初期値 `0`）と、結果のログ文字列を溜める変数を用意する。
	- 出た運勢のインデックス番号を保持する変数を用意する（初期値は `-1` など、大吉以外の値）。
	- `while` 文を使い、**「出たインデックス番号が 0（大吉）ではない間」** 以下の処理を繰り返す：
		- 回数カウントを `1` 増やす。
		- ランダムな運勢インデックス（`0` 〜 `4`）を生成して変数に上書きする。
		- 「何回目：〇〇」というテキストをログ文字列に追加する。
	- ループを抜けた後、画面の `#draw-log` に「〇回目で大吉が出ました」という最終結果とともに全試行履歴を表示する。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- 繰り返しの条件式は「大吉ではない間」なので、不等号演算子を使い `while (出た番号 !== 0)` と記述します。
	- 最初からループを回すため、ループ前の初期値には `0` 以外の数値（例: `-1`）を入れておきます。
	- ログの改行には `<br>` タグを使用し、最後に `.innerHTML` で流し込みます。
</callout>

- 正解のソースコード（practice02/js/main.js に上書き）

```javascript
const drawUntilBtn = document.getElementById('draw-until-btn');
const drawLog = document.getElementById('draw-log');

const omikujiItems = ['大吉', '中吉', '小吉', '吉', '凶'];

drawUntilBtn.addEventListener('click', () => {
  let count = 0;
  let resultIndex = -1; // 最初はどの運勢でもない状態にしておく
  let logHtml = '';

  // 出た運勢が 0（大吉）ではない間、ずっと繰り返す
  while (resultIndex !== 0) {
    count++;
    // 0〜4 のランダムな番号を引く
    resultIndex = Math.floor(Math.random() * omikujiItems.length);

    logHtml += `${count}回目：${omikujiItems[resultIndex]}<br>`;
  }

  logHtml += `<strong>見事、${count}回目で大吉が出ました。</strong>`;
  drawLog.innerHTML = logHtml;
});
```

ブラウザでボタンを押すと、1回で大吉が出ることもあれば、7回や10回かかって大吉が出ることもあり、何回ループするか分からない処理を `while` 文が見事に制御している様子を確認できます。

---

# 5. 実践制作：直前と同じ値が出ない「重複防止」ロジック

## 5-1. ランダムUIの落とし穴：「2回連続で同じものが出る」問題

おみくじや名言ジェネレーター、ランダム背景画像のUIを作ったとき、テスターやユーザーから必ず寄せられるクレームがあります。

> 「ボタンを押したのに、画面がまったく変わりません。バグですか？」

実際にはバグではなく、ランダム抽選の結果として **たまたま2回連続で同じデータ（例: 2回続けて『中吉』）が選ばれてしまった** だけです。
しかし、ユーザーから見ると「ボタンを押したのに反応しなかった」ように見えてしまい、UIの使い勝手を大きく損ねてしまいます。

これを防ぐのが、実務で必須となる **「連続重複防止（直前と同じ値を除外する）アルゴリズム」** です。

---

## 5-2. 重複防止の鉄則アルゴリズム

ロジックの考え方はとてもシンプルです。

<callout icon="📌" color="gray_bg">
	**重複防止アルゴリズムの思考ステップ**

	1. **【記憶】** 直前に表示したインデックス番号を、外側の変数 `lastIndex` に記録しておく。
	2. **【抽選】** 新しいインデックス番号 `newIndex` をランダムに1つ選ぶ。
	3. **【再抽選判定（while文）】** もし「新しく選んだ番号」が「直前の番号（`lastIndex`）」と全く同じだった場合、**違う番号が出るまで何度でもサイコロを振り直す**。
	4. **【更新 & 記録】** 違う番号が確定したら画面を更新し、次回の判定のために `lastIndex = newIndex` と記録を更新する。
</callout>

```javascript
// 直前の番号を保存しておく変数（初期値は存在しないインデックス -1）
let lastIndex = -1;

// ボタンがクリックされたときの処理
btn.addEventListener('click', () => {
  // 1. まず新しい番号をランダムに引く
  let newIndex = Math.floor(Math.random() * items.length);

  // 2. 直前と同じ番号である間、違う番号が出るまで引き直す
  while (newIndex === lastIndex) {
    newIndex = Math.floor(Math.random() * items.length);
  }

  // 3. 画面の表示を更新する
  result.textContent = items[newIndex];

  // 4. 次回のために、今回の番号を直前の番号として記録を更新する
  lastIndex = newIndex;
});
```

「直前と同じである間は、違う値になるまで引き直す」という処理に、まさに `while` 文が最適であることが分かります。

---

## ⭐︎ 練習：名言ジェネレーターを作ろう（連続重複防止機能付き）

ボタンを押すたびに名言が切り替わり、**何度連続でボタンをクリックしても決して同じ名言が続けて表示されない** プログラムを実装してみましょう。

### 仕様・要件

1. 画面上の名言テキスト（`#quote-text`）、発言者（`#quote-author`）、ボタン（`#quote-btn`）を取得してください。
2. 名言の配列と、対応する発言者の配列を用意してください（少なくとも3件以上のデータを用意）。
3. イベントリスナーの外側に、直前に表示したインデックス番号を記録しておく変数（初期値 `-1`）を定義してください。
4. ボタンがクリックされたときに以下の処理を実行してください。
	- `while` 文を使い、直前に表示したインデックス番号と一致しない新しいランダムインデックス番号を決定する。
	- 決定した番号のデータを使い、名言と発言者の表示テキストを更新する。
	- 次回のクリックに備えて、直前のインデックス番号の記録を今回選ばれた番号で上書き保存する。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- 直前番号を記録する変数をクリックイベントの関数の中に書いてしまうと、クリックするたびに変数がリセットされてしまいます。必ずイベントリスナーの「外側（上部）」で宣言してください（単元04の復習）。
	- ループ処理の構造は以下のようになります：
	  まずランダムな番号を1つ生成し、`while (新しい番号 === 前回の番号)` の条件が満たされる間、新しい番号の生成を繰り返します。
</callout>

- 正解のソースコード（practice02/js/main.js に追記）

```javascript
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteBtn = document.getElementById('quote-btn');

// 名言リスト
const quotes = [
  'シンプルであることは、複雑であることよりもむずかしい。',
  '失敗したことがない人間というのは、新しいことに挑戦したことがない人間だ。',
  '今日できることを明日に延ばすな。',
  '情熱を持て。さもなければ、どんな簡単な仕事もやり遂げられない。'
];

// 発言者リスト
const authors = [
  'スティーブ・ジョブズ',
  'アルベルト・アインシュタイン',
  'ベンジャミン・フランクリン',
  'ラルフ・ウォルド・エマーソン'
];

// 直前に表示したインデックスを保持する変数（初期値は -1）
let lastIndex = -1;

quoteBtn.addEventListener('click', () => {
  // 1. 新しい番号をランダムに抽選
  let newIndex = Math.floor(Math.random() * quotes.length);

  // 2. 直前と同じ番号である間は、違う番号が出るまで引き直す
  while (newIndex === lastIndex) {
    newIndex = Math.floor(Math.random() * quotes.length);
  }

  // 3. 画面の表示を更新
  quoteText.textContent = `“${quotes[newIndex]}”`;
  quoteAuthor.textContent = `- ${authors[newIndex]}`;

  // 4. 今回の番号を直前の番号として記録
  lastIndex = newIndex;
});
```

ブラウザでボタンを素早く連打してみてください。何度押しても必ず直前と異なる名言に切り替わり、「同じものが連続して動いていないように見える現象」が完全に解消されたことを実感してください。

---

# 6. 配列から要素を削除する：`.splice()` と完全重複排除

## 6-1. 配列から指定した位置の要素を取り除く：`配列.splice()`

単元05では、配列の末尾に新しいデータを追加する `.push()` を学習しました。
反対に、配列の中にある特定のデータを削除したいときに使う代表的な命令が **`配列.splice()`** です。

```javascript
配列.splice(取り除きたいインデックス, 削除する個数);
```

例えば、3つの果物が入った配列から、1番目の要素（`'ばなな'`）を1つだけ削除してみます。

```javascript
const fruits = ['りんご', 'ばなな', 'みかん'];

// インデックス 1 から 1 個だけ削除する
const removed = fruits.splice(1, 1);

console.log(fruits);  // => ['りんご', 'みかん']（配列が2個に縮む）
console.log(removed); // => ['ばなな']（取り除かれた要素が配列で返される）
```

<callout icon="💡" color="gray_bg">
	**`.splice()` の特徴**

	- 指定したインデックスのデータが配列から完全に切り取られます。
	- 削除された分、配列の `.length` も自動的に減ります。
	- 戻り値として「切り取られた要素」が配列の形で返されます（`removed[0]` で取り出せます）。
</callout>

---

## 6-2. 「二度と選ばれない」完全重複排除の仕組み

先ほどのセクション5で実装した「連続重複防止（直前と同じ値を除外）」は、あくまで **直前と同じものが続けて出ないようにする仕組み** でした。そのため、A → B → A のように、別のデータを挟めば過去に出たものが再び選ばれます。

しかし、実際のWebサイトやアプリでは、**「一度選ばれたデータは二度と選ばれない（箱の中からくじを引いて捨てる）」** という完全重複排除のロジックが必要になる場面があります。

- 授業の発表順ルーレット（一度当たった人は二度と当たらない）
- プレゼント抽選・ビンゴ大会（一度出た番号は除外される）
- クイズゲームの出題（同じ問題が重複して出題されない）

この「二度と出ない抽選」は、**`Math.random()` でランダムに選んだインデックスを、その都度 `.splice()` で配列から削除していく** ことで極めてシンプルに実現できます。

```javascript
// 候補者の配列
const members = ['佐藤', '鈴木', '高橋', '田中'];

// 1. 現在の要素数（4個）からランダムにインデックスを選ぶ（0〜3）
const randomIndex = Math.floor(Math.random() * members.length);

// 2. 選ばれた人を配列から切り取って取り出す
const picked = members.splice(randomIndex, 1)[0];
console.log(`${picked}さんが選ばれました`);

// 3. 配列の中身は3人に減っているため、次回は残りの3人から選ばれる
console.log(`残りの候補：${members.length}人`);
```

ボタンを押すごとに配列の要素が減っていき、最後は `members.length === 0`（空っぽ）になるため、全ての候補者を1回ずつ綺麗に抽選し終えることができます。

---

## ⭐︎ 練習：発表者ルーレットを作ろう（選ばれた人を配列から削除）

「次の発表者を決める」ボタンを押すと、配列に用意された候補者の中からランダムに1人が選ばれ、選ばれた人は配列から削除されて残りの候補人数が減っていくプログラムを作ってみましょう。

### 仕様・要件

1. 画面上の結果表示エリア（`#presenter-result`）、残り人数表示（`#remaining-count`）、ボタン（`#presenter-btn`）を取得してください。
2. 4名の発表候補者名を入れた配列 `presenters` を定義してください。
3. 画面の初期表示として、残り人数表示エリアに現在の候補者人数を表示してください（例：`残りの候補：4人`）。
4. ボタンをクリックしたときに以下の処理を実行してください。
	- 配列の中にまだ候補者が残っている（`presenters.length > 0`）場合に処理を実行する。
	- 現在残っている配列の要素数をもとに、ランダムなインデックス番号を1つ生成する。
	- `presenters.splice(randomIndex, 1)[0]` で配列から選ばれた人を抜き出す。
	- 抜き出した発表者名を `#presenter-result` に表示し、残り人数を更新する。
	- もし今回の抽選で配列がちょうど空になった場合は、メッセージに「全員の発表順が決まりました。お疲れ様でした。」と案内し、ボタンを無効化する。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- 残りの候補人数は、単元05で学んだ `presenters.length` で取得できます。
	- ボタンを押せなくする無効化処理には、単元04で学んだ `presenterBtn.setAttribute('disabled', 'true')` を使用します。
</callout>

- 正解のソースコード（practice02/js/main.js に追記）

```javascript
const presenterResult = document.getElementById('presenter-result');
const remainingCount = document.getElementById('remaining-count');
const presenterBtn = document.getElementById('presenter-btn');

// 発表候補者の配列
const presenters = ['佐藤さん', '鈴木さん', '高橋さん', '田中さん'];

// 初期状態の表示
remainingCount.textContent = `残りの候補：${presenters.length}人`;

presenterBtn.addEventListener('click', () => {
  // 候補者が残っている場合のみ抽選を実行
  if (presenters.length > 0) {
    // 1. 現在残っている人数の中からランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * presenters.length);

    // 2. 配列から選ばれた人を削除して取り出す
    const selected = presenters.splice(randomIndex, 1)[0];

    // 3. 画面の表示を更新
    presenterResult.textContent = selected;

    // 4. 残り人数の判定とメッセージの更新
    if (presenters.length > 0) {
      remainingCount.textContent = `残りの候補：${presenters.length}人`;
    } else {
      remainingCount.textContent = '全員の発表順が決まりました。お疲れ様でした。';
      presenterBtn.setAttribute('disabled', 'true');
    }
  }
});
```

ブラウザでボタンを4回クリックしてみてください。毎回異なる人が順番に選ばれて候補から消えていき、4人全員が選ばれた瞬間にボタンが無効化されることを確認してください。

---

# 7. 本日の総合課題

## 7-1. 課題概要：ランダム背景ヒーローセクションの実装

本日の総仕上げとして、Webサイトのトップページでユーザーの目を惹く演出としてよく使われる **「ランダム背景ヒーローセクション（重複防止機能付き）」** を作成します。

ボタンを押す（またはリロードする）たびに、ヒーローセクションの **背景画像**、**メインタイトル**、**撮影地名（サブテキスト）** がセットでランダムに切り替わり、かつ **直前と同じ画像が2回連続で出ない** 本格的なUIを完成させましょう。

---

## 7-2. 演習ファイルの準備

これまでの練習フォルダ（`practice02`）を丸ごと複製し、フォルダ名を **`randomHero`** に変更してください。

【ディレクトリ構成】

```
06_math_random/
├── practice01/     ← 前半の成果物
├── practice02/     ← 後半の成果物
└── randomHero/     ← ★本日の総合課題用フォルダ
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

`randomHero` フォルダ内の各ファイルを、以下のコードで上書きしてください（`js/main.js` は中身を空にして、自力でJavaScriptを記述していきます）。

`randomHero/index.html`

```markup
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>06_課題：ランダムヒーローセクション</title>
  <link rel="stylesheet" href="css/style.css">
  <script defer src="js/main.js"></script>
</head>
<body>
  <!-- ヒーローヘッダーエリア -->
  <header id="hero-header" class="hero-header">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span id="hero-tag" class="hero-tag">FEATURED TRIP</span>
      <h1 id="hero-title">未知なる世界の絶景へ旅立とう</h1>
      <p id="hero-location" class="hero-location">スイス・アルプス連峰</p>
      <button type="button" id="change-bg-btn" class="hero-btn">景色を変える</button>
    </div>
  </header>

  <!-- 補足コンテンツエリア -->
  <main class="main-content">
    <h2>四季折々の絶景ギャラリー</h2>
    <p>「景色を変える」ボタンをクリックすると、背景画像とタイトルがランダムに切り替わります。直前と同じ画像が連続して表示されない重複防止ロジックが組み込まれています。</p>
  </main>
</body>
</html>
```

`randomHero/css/style.css`

```css
@charset "UTF-8";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  color: #2d3748;
}

/* ヒーローセクション全体 */
.hero-header {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
}

/* 写真の上の黒グラデーション（文字を読みやすくするオーバーレイ） */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
}

/* ヒーロー内のテキスト群 */
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
  padding: 24px;
  max-width: 720px;
}

.hero-tag {
  display: inline-block;
  font-size: 0.85rem;
  letter-spacing: 2px;
  background-color: #3182ce;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
  font-weight: bold;
}

.hero-content h1 {
  font-size: 2.2rem;
  margin: 0 0 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-location {
  font-size: 1.1rem;
  margin: 0 0 24px;
  opacity: 0.9;
}

.hero-btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: bold;
  color: #2d3748;
  background-color: #ffffff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background-color 0.2s;
}

.hero-btn:hover {
  background-color: #edf2f7;
  transform: translateY(-2px);
}

/* 本文エリア */
.main-content {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
  line-height: 1.8;
}
```

`randomHero/js/main.js`

```javascript
// randomHero
console.log('randomHero ready!');
```

---

## 7-3. 仕様・要件

### 必須要件（基本機能）

1. **必要なHTML要素の取得**：
	- ヒーロー全体要素（`#hero-header`）
	- タイトル表示要素（`#hero-title`）
	- 撮影地表示要素（`#hero-location`）
	- 切り替えボタン（`#change-bg-btn`）
2. **データの準備（配列）**：
	- 以下の3つの配列を用意してください（各4件以上の要素を用意すること）：
		- 背景画像のURL配列（`imageUrls`）：高解像度の風景画像URL
		- キャッチコピー配列（`titles`）：各写真に合わせた魅力的な見出し
		- 撮影地名配列（`locations`）：各写真の撮影場所テキスト
3. **連続重複防止機能（while文）**：
	- 直前に表示したインデックス番号を記録する変数を保持すること。
	- ボタンをクリックした際、`while` 文を用いて **「直前の番号と異なるインデックス番号」が選ばれるまで再抽選** すること。
4. **画面表示の更新**：
	- 選ばれたインデックス番号のデータを使って、以下の3箇所を同時に更新すること：
		- `#hero-header` のインラインスタイル `backgroundImage`（例：`url("...")` の形式で設定）
		- `#hero-title` のテキスト
		- `#hero-location` のテキスト
	- 今回選ばれたインデックス番号を、直前番号として記録変数に保存すること。
5. **初期表示の自動実行**：
	- ページを開いた（リロードした）最初の瞬間にもランダムな画像とテキストが1つ選ばれ、画面に反映されていること。

<callout icon="💡" color="gray_bg">
	**ヒント**
	- 背景画像のCSSスタイルを変更するには、単元02で学んだ `.style.backgroundImage` を使用します。
	  値は `url("${imageUrls[newIndex]}")` のように `url(...)` で囲む必要があります。
	- ページ読み込み直後の初回ランダム表示と、ボタンクリック時のイベントリスナーの両方に画面更新の処理を記述します。
	- ネット上のダミー画像には、安定して取得できるUnsplashやPicsumの画像URL（例: `https://images.unsplash.com/...` や `https://picsum.photos/id/.../1200/600`）を活用できます。
</callout>

---

## 7-4. 解答例と解説

自力で実装に挑戦したあと、以下の解答例を開いてコードを確認してみましょう。

- 正解のソースコード（randomHero/js/main.js）

```javascript
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
```

<callout icon="💡" color="gray_bg">
	**次回（単元07）への伏線：同じ処理を1つにまとめる「関数」の登場**

	今回のコードを見ると、ページ初回表示時とボタンクリック時で、画面の背景やテキストを更新する処理を2回ほぼ同じ形で書いていることに気づいたでしょうか。
	次回の単元07では、このように重複した処理を1つに部品化していつでも呼び出せる **「関数（Function）」** の仕組みをじっくり学びます。お楽しみに。
</callout>

---

## 7-5. 提出方法・期限

`06_math_random` フォルダ内に **`practice01`**、**`practice02`**、**`randomHero`** の3つのフォルダが揃っていることを確認し、来週の授業開始までにGitHubへ同期（commit & push）してください。

