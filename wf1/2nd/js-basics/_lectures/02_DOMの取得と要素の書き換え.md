# 02_DOMの取得と要素の書き換え

### JavaScript基礎（月1-2）

[00_導入](https://app.notion.com/p/00_-3c8bdf471aca80718977dd0a6c418f1c?pvs=21)

[01_基礎知識・変数・データ型](https://app.notion.com/p/01_-3eebdf471aca80b885faee84d1ee0e34?pvs=21)

[02_**DOMの取得と要素の書き換え**](https://app.notion.com/p/02_DOM-3eebdf471aca80b2bdf0ccdf290d4f22?pvs=21)

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

# はじめに

- 出欠確認
- 前回の振り返り（変数、const / let、データ型、テンプレートリテラル）
- 前回はブラウザの「Console画面」の中だけで計算や文字の出力を行いました。本日の授業から、いよいよ**「HTMLで書かれた画面の文字やデザインをJavaScriptから自由自在に書き換える」**という、Web制作の醍醐味に入っていきます！

---

## **本日のゴール**

1. **DOM（Document Object Model）** の概念と、HTMLとJavaScriptがつながる仕組みを理解する。
2. **`document.getElementById()`** と **`document.querySelector()`** を使い分け、狙ったHTML要素を正確に取得できる。
3. **`textContent`** と **`innerHTML`** の違いとセキュリティ上の注意点を理解し、要素内のテキストやHTML構造を書き換えられる。
4. **`element.style.◯◯`** を使って、CSSプロパティ（色・背景色・フォントサイズなど）を動的に変更できる。
5. ボタンクリックをきっかけに文字や色が変化するインタラクティブなUIを体験し、次回の本格的なイベント処理につなげる。

---

# 1. 冒頭小テスト（前回の復習・約15分）

前回の「単元1: 基礎知識・変数・データ型」の定着度を確認する小テストです。
Googleフォームにて選択式（4択・全10問）で回答してください。

<aside>
📝

**Googleフォーム 小テスト**
- **制限時間**: 約10〜15分
- **形式**: 4択選択式（A / B / C / D・全10問）
- **対象**: 単元1の復習（変数、データ型、演算子、テンプレートリテラル）
- **回答リンク**: [小テスト回答フォーム（Googleフォーム）](#) ※授業時にURLを案内します

※教員・教材管理用の問題一覧・模範解答・配点はこちら：
👉 [02_小テスト.md](02_%E5%B0%8F%E3%83%86%E3%82%B9%E3%83%88.md)

</aside>

---

# 2. **DOM（Document Object Model）とは？**

## 2-1. **HTMLとJavaScriptをつなぐ架け橋**

これまでの学習では、HTMLは「ブラウザに文章や画像を表示するためのファイル」、JavaScriptは「計算や変数の管理をするプログラミング言語」として別々に扱ってきました。

では、**JavaScriptはどうやってHTMLの文字を変えたり、色を変えたりしているのでしょうか？**

その答えが **DOM（Document Object Model：ドキュメント・オブジェクト・モデル）** です。

<aside>
💡

**身近なたとえで理解するDOM**

- **HTMLファイル**：紙に書かれた**「建物の設計図」**（文字が並んでいるだけの静的なテキスト）
- **ブラウザの処理**：設計図を読み込んで、画面上に実際に触れる**「実物の建物（操縦席）」**を組み立てる
- **DOM**：建物の中にあるドア、照明のスイッチ、看板などを**「外から操作できるリモコンのつまみ（オブジェクト）」**として用意した仕組み
- **JavaScript**：そのリモコンを手にとって、「看板の文字を書き換える」「照明の色を赤にする」と命令を出す人

</aside>

ブラウザはHTMLファイルを読み込むと、HTMLのタグ構造（`<html>`, `<body>`, `<h1>`, `<p>` など）を解析し、JavaScriptから扱える**オブジェクトの集まり**に変換します。
この仕組みのおかげで、JavaScriptは `document` という入り口を通じてHTMLのあらゆる要素を操作できるようになるのです。

---

## 2-2. **DOMツリーの構造**

HTMLはタグの中にタグが入る「入れ子（ネスト）構造」になっています。
ブラウザはこの構造を、木の幹から枝が分かれて葉が茂るような**「ツリー構造（DOMツリー）」**として記憶しています。

```text
               document (最上位の入り口)
                  │
                <html>
         ┌────────┴────────┐
      <head>            <body>
         │                 ├──────────────┐
      <title>             <h1>           <p id="desc">
         │                 │              │
    "マイページ"      "こんにちは！"    "Webの世界へようこそ"
   (テキストノード)   (テキストノード)   (テキストノード)
```

**【DOMツリーの重要な用語】**

- **ノード（Node）**：ツリーを構成する1つひとつの要素や部品のこと。
- **要素ノード（Element Node）**：`<h1>`, `<p>`, `<button>` などのHTMLタグそのもの。
- **テキストノード（Text Node）**：タグの中に書かれている文字そのもの。
- **親ノード / 子ノード**：外側にある要素が「親（Parent）」、内側にある要素が「子（Child）」。

JavaScriptでWebページを動かす基本手順は、いつだって次の**たった2ステップ**です。

1. **操作したい要素をDOMツリーから見つけて連れてくる（要素の取得）**
2. **その要素のプロパティ（文字や見た目）を書き換える（要素の変更）**

---

## 2-3. **開発環境の準備と `<script defer>` の重要作法**

本日の実習環境を準備しましょう。

### 1. フォルダの確認
VSCodeで本日の学習フォルダ **`02_dom`** を開きます。

### 2. ディレクトリ構成
実務の標準的な構成として、HTMLとJavaScriptファイルを分離して作成します。

```text
02_dom/
├── index.html
├── css/
│   └── style.css       （※装飾用CSS）
└── js/
    └── main.js         （※本日コードを書くメインファイル）
```

### 3. `index.html` の作成
以下のHTMLを記述してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>単元2: DOMの取得と要素の書き換え</title>
  <!-- 外部JavaScriptファイルの読み込み -->
  <script defer src="js/main.js"></script>
</head>
<body>
  <h1 id="main-title">JavaScriptで画面を動かそう</h1>
  <p id="intro">この文章はJavaScriptによって書き換えられます。</p>
  <button id="change-btn">内容を変更する</button>
</body>
</html>
```

<aside>
⚠️

**超重要！ `<script defer>` の役割**

HTMLファイルは上から下に向かって順番に読み込まれます。
もし `<head>` の中で `defer` を付けずに `<script src="js/main.js"></script>` と書くと、**まだ下の `<h1>` や `<p>` が画面に作られる前にJavaScriptが実行されてしまいます**。

その結果、「そんな要素はまだ存在しません！」となってしまい、JavaScriptが `null`（空っぽ）を取得してエラーになる事故が起きます。

`defer` 属性を付けておくと、**「HTMLの構造を最後まで全部読み込んでDOMツリーを完成させてから、安全にJavaScriptを実行してね」** という合図になります。現代のWeb制作における超重要ルールです！

</aside>

---

# 3. **HTML要素を取得する（getElementById と querySelector）**

JavaScriptから要素をいじるには、まず「どの要素をいじるか」を指定して連れてこなければなりません。
実務で最もよく使う**2大取得メソッド**を学びましょう。

---

## 3-1. **ID名で要素を取得する：`document.getElementById()`**

HTMLの **`id` 属性** を手掛かりに要素を1つだけ特定して取得する命令です。

```javascript
const 変数名 = document.getElementById('id名');
```

**【コード例】**

```javascript
// HTML: <h1 id="main-title">JavaScriptで画面を動かそう</h1>

const mainTitle = document.getElementById('main-title');
console.log(mainTitle); // <h1 id="main-title">JavaScriptで画面を動かそう</h1>
```

<aside>
⚠️

**初心者が100%ハマる罠：引数に `#` をつけてしまうミス**

CSSではIDを `#main-title` と書きますが、`getElementById` は「ID名で探す」という専用命令なので、**シャープ（`#`）は不要**です！

- ❌ `document.getElementById('#main-title');` （探せなくて `null` になる）
- ⭕ `document.getElementById('main-title');` （IDの名前だけを渡す）

</aside>

---

## 3-2. **CSSセレクタで要素を取得する：`document.querySelector()`**

CSSを書くときと全く同じセレクタ記法（タグ名、クラス名、ID名、属性セレクタなど）を使って要素を取得できる万能メソッドです。

```javascript
const 変数名 = document.querySelector('CSSセレクタ');
```

**【コード例】**

```javascript
// ID名で取得（CSSと同じく # が必要）
const title = document.querySelector('#main-title');

// クラス名で取得（CSSと同じく . が必要）
const introText = document.querySelector('.intro-text');

// タグ名で取得
const heading = document.querySelector('h1');
```

<aside>
💡

**`querySelector` の特徴：最初に一致した「1件」だけを取得する**

同じクラス名を持つ要素がページ内に複数ある場合、`querySelector` は**「HTMLの上から探して最初に見つかった1つだけ」**を取得します。
すべてまとめて取得したい場合は、後の単元5で学習する `querySelectorAll()` を使用します。

</aside>

---

## 3-3. **`getElementById` と `querySelector` の使い分け比較**

どちらを使えばいいのか迷ったときは、以下の表を参考にしてください。

| メソッド | 引数の書き方 | 取得できるもの | 特徴・使い分け |
| :--- | :--- | :--- | :--- |
| **`document.getElementById()`** | `'ID名'`（`#` なし） | 指定したIDの要素（1件） | 処理速度が速い。固有のID（フォームやメインボタン等）を直接狙い撃ちするときに最適。 |
| **`document.querySelector()`** | `'CSSセレクタ'`（`.` や `#` あり） | セレクタに合致する最初の要素（1件） | クラス名、子孫セレクタ（`nav li a`）など柔軟な指定ができる。万能で現代の主流。 |

---

## 3-4. **要素が取得できているか確認する（console.log vs console.dir）**

取得した要素を変数に入れたら、必ずコンソールに出力して中身を確認する習慣をつけましょう。

```javascript
const title = document.getElementById('main-title');

// 1. タグの見た目（HTML構造）を確認したいとき
console.log(title);
// 出力: <h1 id="main-title">JavaScriptで画面を動かそう</h1>

// 2. オブジェクトが持っている「プロパティ一覧（秘密の部屋）」を覗きたいとき
console.dir(title);
// 出力: h1#main-title のツリー（textContent, style, id, innerHTML などがズラリと並ぶ）
```

<aside>
🚨

**もし `null` と表示されたら？**

コンソールに `null` と出た場合、**「要素が見つからなかった（取得に失敗した）」**ことを意味します。
主な原因は次の3点です。慌てずにチェックしましょう！

1. **HTMLのID名やクラス名のスペルミス**（大文字・小文字の違い、ハイフン抜けなど）
2. **`getElementById` に `#` を付けてしまっている**
3. **`<script>` に `defer` が付いておらず、HTMLより先にJSが走ってしまった**

</aside>

---

## 3-5. **特別なショートカット：`document.body`**

`<body>` タグはWebページ全体の親玉要素なので、IDやクラスがなくても **`document.body`** と書くだけで直接取得できます。

```javascript
console.log(document.body); // <body>...</body> 全体が取得できる
```

---

## 💻 **【ミニワーク 1】要素を取得してコンソールに出力してみよう（10分）**

1. `js/main.js` を開き、`index.html` にある `<h1>`、`<p>`、`<button>` の3つの要素を取得して、それぞれ変数に代入してください。
2. それぞれの変数を `console.log()` で出力し、正しく要素が取得できているか確認してください。
3. いずれかの要素を `console.dir()` で出力し、どんなプロパティが存在するかスクロールして眺めてみましょう。

```javascript
// js/main.js の記述例
const mainTitle = document.getElementById('main-title');
const introText = document.getElementById('intro');
const changeBtn = document.querySelector('#change-btn');

console.log(mainTitle);
console.log(introText);
console.log(changeBtn);

console.dir(mainTitle);
```

---

# 4. **要素の内容を書き換える（textContent と innerHTML）**

要素を取得できたら、次はその中身のテキストやHTMLを書き換えてみましょう！

---

## 4-1. **テキストを安全に書き換える：`textContent`**

**`element.textContent`** は、要素の中に含まれる「テキスト情報」を読み取ったり、新しいテキストで上書き（代入）したりするためのプロパティです。

```javascript
// 1. テキストを読み取る（参照）
console.log(mainTitle.textContent); // "JavaScriptで画面を動かそう"

// 2. 新しいテキストで上書きする（代入）
mainTitle.textContent = 'タイトルを書き換えました！';
```

**【テンプレートリテラルとの組み合わせ】**

前回の単元で学んだ変数やテンプレートリテラルと組み合わせることで、動的なメッセージを画面に表示できます。

```javascript
const userName = '佐藤';
const userPoints = 500;

introText.textContent = `${userName}さんの所持ポイントは ${userPoints}pt です。`;
```

---

## 4-2. **HTMLタグごと書き換える：`innerHTML`**

**`element.innerHTML`** は、要素の中身を「HTMLタグを含んだ文字列」として書き換えるプロパティです。
渡された文字列の中に `<span>` や `<strong>` などのタグが含まれている場合、ブラウザはそれを**HTMLタグとして解釈して画面に描画**します。

```javascript
// <strong> タグを含めて書き換える
introText.innerHTML = 'ようこそ！<strong>特別なご案内</strong>があります。';
```

ブラウザで確認すると、「特別なご案内」の部分が太字（`<strong>`）になって表示されます。

---

## 4-3. **`textContent` と `innerHTML` の決定的な違い**

もし `textContent` にHTMLタグを渡すとどうなるでしょうか？

```javascript
// textContent にタグを渡した場合
introText.textContent = '<strong>太字になるかな？</strong>';
// 画面の表示: <strong>太字になるかな？</strong> （タグの文字がそのまま画面に出てしまう！）

// innerHTML にタグを渡した場合
introText.innerHTML = '<strong>太字になるかな？</strong>';
// 画面の表示: 太字になるかな？ （太字として装飾されて表示される）
```

| プロパティ | タグの扱い | 安全性（セキュリティ） | 実務での基本指針 |
| :--- | :--- | :--- | :--- |
| **`textContent`** | タグを解釈せず、ただの文字として扱う | **安全**（悪意あるスクリプトが無効化される） | **原則こちらを使う**（文字を変えるだけなら100%これ） |
| **`innerHTML`** | タグを解釈し、HTML要素として組み立てる | **注意が必要**（XSS脆弱性のリスクあり） | 新しいタグ構造を丸ごと流し込みたい場合のみ使用 |

<aside>
⚠️

**実務の重要セキュリティ：XSS（クロスサイトスクリプティング）の危険性**

もしユーザーが問い合わせフォームなどで入力した名前（例えば `<script>悪意ある攻撃コード</script>`）を、そのまま `innerHTML` で画面に出力してしまうと、**ブラウザがその攻撃コードを本物のプログラムとして実行してしまいます**。
これを **XSS脆弱性** と呼びます。

一方、`textContent` を使っていれば、`<script>` という文字もただのテキスト（記号）として安全に無害化して表示してくれます。
**「文字を変えるだけなら、迷わず `textContent` を使う」** これがWebエンジニアの鉄則です！

</aside>

---

## 💻 **【ミニワーク 2】テキストとHTMLを書き換えてみよう（15分）**

1. `js/main.js` にて、`mainTitle` のテキストを自分の名前に書き換えてみましょう。
2. `introText` の中身を、`innerHTML` を使って一部の単語を `<span style="color: red;">赤色の文字</span>` にした文章に書き換えてみましょう。
3. `textContent` と `innerHTML` それぞれで、ブラウザの表示がどのように異なるか確認してください。

---

# 5. **スタイルを直接変更する（element.style）**

JavaScriptを使うと、要素のCSSスタイルも自由自在にリアルタイム変更できます。

---

## 5-1. **`element.style.◯◯` の基本**

要素の **`style` プロパティ** にドット記法でアクセスし、値を代入します。

```javascript
要素.style.プロパティ名 = '値';
```

**【コード例】**

```javascript
const mainTitle = document.getElementById('main-title');

// 文字色を赤にする
mainTitle.style.color = '#ff3366';

// ページ全体の背景色をダークモードにする
document.body.style.backgroundColor = '#222222';
document.body.style.color = '#ffffff';
```

---

## 5-2. **最重要ルール：ケバブケースからキャメルケースへ！**

CSSでは単語をハイフンで繋ぐ「ケバブケース（`background-color`）」でプロパティ名を書きます。
しかし、JavaScriptではハイフン（`-`）が**引き算の記号**とみなされてしまうため、**キャメルケース（2単語目の先頭を大文字）**に変換して指定しなければなりません！

| CSSでの書き方 | JavaScript（`element.style`）での書き方 |
| :--- | :--- |
| `color` | `element.style.color` |
| `background-color` | `element.style.backgroundColor` |
| `font-size` | `element.style.fontSize` |
| `margin-top` | `element.style.marginTop` |
| `border-radius` | `element.style.borderRadius` |
| `letter-spacing` | `element.style.letterSpacing` |

```javascript
// ❌ NG：ハイフンがあると引き算扱いになりエラー
mainTitle.style.background-color = 'yellow';

// ⭕ OK：キャメルケースで記述する
mainTitle.style.backgroundColor = 'yellow';
```

---

## 5-3. **初心者がハマる罠：単位（`px` 等）の付け忘れ**

CSSで数値プロパティ（`font-size` や `width` など）を指定するとき、数値だけでなく **`'px'` などの単位をつけた「文字列」** として代入する必要があります。

```javascript
// ❌ NG：単位がないためCSSとして無視されてしまう
mainTitle.style.fontSize = 32;

// ⭕ OK：単位を含めた文字列として代入する
mainTitle.style.fontSize = '32px';

// ⭕ 応用：変数とテンプレートリテラルを使う場合
let newSize = 24;
mainTitle.style.fontSize = `${newSize}px`;
```

<aside>
💡

**現場の実践知識：`element.style` の限界と次回の予告**

`element.style.◯◯` を使うと、HTML要素に直接 `style="color: red;"` という「インラインスタイル」が書き込まれます。
インラインスタイルはCSSの優先順位が非常に高いため、手軽に1〜2箇所を変えるには便利ですが、たくさんのスタイルを一度に変更しようとするとJavaScriptのコードがCSSまみれになって管理が破綻してしまいます。

現場のWeb制作では、**「あらかじめCSSに `.is-active` や `.is-dark` などのクラスを用意しておき、JavaScriptからはそのクラスを付け外しするだけにする」** という手法が標準です。
この本格的なクラス操作テクニックは、次週の**単元3**でじっくり学習します！

</aside>

---

## 💻 **【ミニワーク 3】スタイルの変更を体験してみよう（15分）**

1. `mainTitle` のフォントサイズを `'20px'`、文字色を `'#0066cc'` に変更してください。
2. `document.body` の背景色を淡いグレー（`'#f5f5f5'`）に変更してください。
3. デベロッパーツール（Elementsタブ）を開き、`<h1>` や `<body>` に `style="..."` が直接書き込まれている様子を確認してみましょう。

---

# 6. **インタラクションへの第一歩：クリックで書き換える**

ページを開いた瞬間に文字が変わるだけでは、ただHTMLを直接編集したのとあまり変わりません。
**「ユーザーがボタンを押したタイミングで画面が変わる」** というインタラクティブな動きを作ってみましょう！

---

## 6-1. **`addEventListener` の超基本形**

JavaScriptに「〜したときに、この処理を実行してね」と教え込む命令を **イベントリスナー（`addEventListener`）** と呼びます。

```javascript
対象要素.addEventListener('イベントの種類', function () {
  // そのイベントが起きたときに実行したい処理
});
```

今回は最も基本となる **クリックイベント（`'click'`）** を使ってみます。

**【コード例】**

```javascript
const changeBtn = document.getElementById('change-btn');
const mainTitle = document.getElementById('main-title');

changeBtn.addEventListener('click', function () {
  mainTitle.textContent = 'ボタンがクリックされました！🎉';
  mainTitle.style.color = '#e67e22';
});
```

ボタンをクリックした瞬間、見出しの文字と色が一瞬で切り替わったら大成功です！

---

## 6-2. **実践ハンズオン：背景カラーピッカー & メッセージボード（約30分）**

ここまでの知識を総動員して、ボタンを押すとページ全体のテーマカラーとメッセージが切り替わる小さなコンポーネントを作成してみましょう。

### 1. `index.html` にUIを追加する

`<body>` の中身を以下のように更新します。

```html
<div class="card">
  <h1 id="theme-title">今のテーマ：ライトモード</h1>
  <p id="theme-desc">下のボタンを押して、好きなテーマに切り替えてみてください。</p>

  <div class="btn-group">
    <button id="btn-light">☀️ ライト</button>
    <button id="btn-dark">🌙 ダーク</button>
    <button id="btn-ocean">🌊 オーシャン</button>
  </div>
</div>
```

### 2. `css/style.css` で見た目を整える

```css
body {
  font-family: sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  background-color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}

.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.8;
}
```

### 3. `js/main.js` でロジックを実装する

```javascript
// 1. 操作したい要素を取得する
const themeTitle = document.getElementById('theme-title');
const themeDesc = document.getElementById('theme-desc');
const btnLight = document.getElementById('btn-light');
const btnDark = document.getElementById('btn-dark');
const btnOcean = document.getElementById('btn-ocean');

// 2. 「ライト」ボタンをクリックしたときの処理
btnLight.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：☀️ ライトモード';
  themeDesc.innerHTML = '爽やかで明るい日中のテーマです。';
  document.body.style.backgroundColor = '#f0f4f8';
  document.body.style.color = '#333333';
});

// 3. 「ダーク」ボタンをクリックしたときの処理
btnDark.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：🌙 ダークモード';
  themeDesc.innerHTML = '目に優しく落ち着いた夜のテーマです。';
  document.body.style.backgroundColor = '#1a1a2e';
  document.body.style.color = '#e0e0e0';
});

// 4. 「オーシャン」ボタンをクリックしたときの処理
btnOcean.addEventListener('click', function () {
  themeTitle.textContent = '今のテーマ：🌊 オーシャンモード';
  themeDesc.innerHTML = '深海をイメージした<strong>鮮やかなブルー</strong>のテーマです。';
  document.body.style.backgroundColor = '#0f3460';
  document.body.style.color = '#e94560';
});
```

ブラウザでボタンを押してみて、背景色や文字がスムーズに切り替わるか確かめてみましょう！

---

# 7. **⭐︎ 本日の確認クイズ**

本日の学習内容の総まとめクイズです。全問正解を目指しましょう！

### Q1. 構文の空欄補充
IDが `greeting` の段落要素を取得し、その文字を「こんにちは！」に変更したいです。空欄 【 ① 】 と 【 ② 】 に入る適切な単語の組み合わせはどれでしょうか？

```javascript
const msg = document.【 ① 】('greeting');
msg.【 ② 】 = 'こんにちは！';
```

- A) 【 ① 】`querySelector` / 【 ② 】`value`
- B) 【 ① 】`getElementById` / 【 ② 】`textContent`
- C) 【 ① 】`getElementByClass` / 【 ② 】`innerHTML`
- D) 【 ① 】`getElementById` / 【 ② 】`text`

<details>
<summary>▶︎ 正解と解説を表示</summary>

- **正解：B） 【 ① 】`getElementById` / 【 ② 】`textContent`**
- **解説**：
  引数が `'greeting'`（`#` なし）なので、IDで取得するメソッドは `getElementById` です（もし `querySelector` を使うなら `'#greeting'` と書く必要があります）。
  また、純粋なテキストを書き換えるプロパティは `textContent` です（`value` はフォームの入力欄で使います）。
</details>

---

### Q2. スタイルのプロパティ名変換
CSSの `font-size: 24px;` をJavaScriptから変更するとき、正しい記述はどれでしょうか？

- A) `element.style.font-size = 24;`
- B) `element.style.font-size = '24px';`
- C) `element.style.fontSize = 24;`
- D) `element.style.fontSize = '24px';`

<details>
<summary>▶︎ 正解と解説を表示</summary>

- **正解：D） `element.style.fontSize = '24px';`**
- **解説**：
  JavaScriptの `style` オブジェクトでは、ハイフン区切りのCSSプロパティをキャメルケース（`fontSize`）に変換します。また、値には必ず `'px'` などの単位を含めた文字列として代入する必要があります。
</details>

---

### Q3. セキュリティと使い分け
ユーザーが入力したコメントを安全に画面上に表示したい場合、最も推奨されるプロパティはどれでしょうか？

- A) `innerHTML`
- B) `textContent`
- C) `outerHTML`
- D) `style`

<details>
<summary>▶︎ 正解と解説を表示</summary>

- **正解：B） `textContent`**
- **解説**：
  ユーザーが入力したデータには、悪意のある `<script>` タグなどの攻撃コード（XSS）が含まれるリスクがあります。`textContent` を使用すれば、HTMLタグを解釈せず純粋なテキストとして無害化して描画してくれるため、セキュリティ上最も安全です。
</details>

---

# 8. **本日の確認課題（約45分）**

授業の総仕上げとして、以下の仕様を満たすWebコンポーネントを各自作成してください。
分からないところがあれば、その場で講師やSAに質問して解決しましょう！

---

## 課題名：**インタラクティブな「プロフィールカード」の作成**

ボタンを押すことで、カードに表示されている人物のプロフィール情報（名前・自己紹介・ステータス・テーマカラー）が動的に切り替わるUIを作成してください。

### 【作成・提出場所】
- 作業フォルダ：`02_dom/`
- ファイル構成：
  - `02_dom/index.html`
  - `02_dom/css/style.css`
  - `02_dom/js/main.js`

---

## **採点基準（ルーブリック）**

| レベル | 目標点 | 達成要件 |
| :--- | :---: | :--- |
| **必須要件** | **60点** | 1. `document.getElementById()` または `document.querySelector()` を用いて必要な要素を正しく取得できている。<br>2. ボタンをクリックしたときに、`textContent` を用いて見出し（名前）のテキストが書き換わる。<br>3. コンソールにエラーが出ていない。 |
| **標準要件** | **80点** | 必須要件に加えて：<br>4. 少なくとも2つ以上の切り替えボタン（例：「モードA」「モードB」）が存在し、それぞれ異なる情報に切り替わる。<br>5. `innerHTML` を使って、一部のテキストに `<span>` や `<strong>` などの装飾タグを含めた書き換えを行っている。<br>6. `element.style.◯◯` を用いて、カードの背景色や文字色などのCSSスタイルを動的に変更している。 |
| **発展要件** | **100点** | 標準要件に加えて：<br>7. 3種類以上の状態（例：「ノーマルモード」「戦闘モード」「おやすみモード」など）を用意し、アイコンやレイアウトサイズなど複数のプロパティが豊かに変化する。<br>8. テンプレートリテラル（`${}`）を用いて、変数に定義したステータス数値（HPやレベル、好感度など）を組み込んだ文章を動的に生成している。<br>9. BEM命名規則に基づいた整ったCSS設計で記述されている。 |

---

# 9. **まとめ & 次回予告**

## **本日のまとめ**

1. **DOM（Document Object Model）**：HTMLをJavaScriptから扱えるオブジェクトの集まり（ツリー構造）に変換した仕組み。
2. **要素の取得**：
   - `document.getElementById('id名')`：IDで高速に1つ取得（`#` は不要）。
   - `document.querySelector('セレクタ')`：CSSセレクタで柔軟に1つ取得（`.` や `#` が必要）。
3. **内容の書き換え**：
   - `textContent`：純粋なテキストを安全に書き換える（実務の基本原則）。
   - `innerHTML`：HTMLタグを含めて動的に構造を書き換える（XSSに注意）。
4. **スタイルの変更**：
   - `element.style.◯◯`：キャメルケース（`backgroundColor`, `fontSize`）で記述し、単位（`'px'` 等）を忘れずに渡す。
5. **インタラクションの第一歩**：
   - `element.addEventListener('click', function() { ... })` でクリック連動を実現できる。

---

## **次回予告：単元3「イベント処理とクラス操作によるUI切替」**

本日は `element.style` でインラインスタイルを直接書き換えましたが、デザインが複雑になるとJavaScriptのコードが煩雑になってしまいます。

次回は、現場のフロントエンド開発における王道パターンである **「CSSクラスの付け外し（`classList.add`, `classList.remove`, `classList.toggle`）」** を本格的に学びます！

- クリックで動く **「ハンバーガーメニュー」** の開閉アニメーション
- ふわっと浮き出る **「モーダルウィンドウ」** の表示・非表示切り替え

Webサイトで必ず使われる本格的なUIコンポーネント制作に挑戦しますので、どうぞお楽しみに！
