# 02_DOMの取得と要素の書き換え

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
- **対象：**単元1の復習（変数、データ型、演算子、テンプレートリテラル）
- **回答リンク：**

---

## **1-2. 本日のゴール**

1. **`document.getElementById()`** と **`document.querySelector()`** を使い分け、狙ったHTML要素を正確に取得できる。
2. **DOM（Document Object Model）** の仕組みを理解し、HTMLとJavaScriptがつながる構造をイメージできる。
3. **`textContent`** と **`innerHTML`** の違いを理解し、要素内のテキストやHTMLタグ構造を書き換えられる。
4. **`element.style`** を使って、CSSプロパティ（文字色や背景色など）を動的に変更できる。
5. **`addEventListener()`** を使って、ボタンクリックに合わせてテキストやスタイルが変化するページを作成できる。

---

## **1-3. 開発環境の準備**

VSCodeで本日の学習フォルダ「**02_dom」**を開きます。

**【ディレクトリ構成】**

実務の標準的な構成として、HTMLとJavaScriptファイルを分離して作成します。

![Snapzy_2026-10-11_20-03-11_247.png](02_DOM%E3%81%AE%E5%8F%96%E5%BE%97%E3%81%A8%E8%A6%81%E7%B4%A0%E3%81%AE%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88/Snapzy_2026-10-11_20-03-11_247.png)

**`index.html`**

```markup
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02_DOMの取得と要素の書き換え</title>
</head>
<body>
  <h1 id="main-title">JavaScriptで画面を動かそう</h1>
  <p id="intro">この文章はJavaScriptによって書き換えられます。</p>
  <button id="change-btn">内容を変更する</button>
</body>
</html>
```

**【外部JavaScriptファイルの読み込み】**

次に、**`<head>`** タグの中に **`<script>`** タグを追加して、外部JavaScriptファイル（**`js/main.js`**）を読み込みます。

**`index.html`**

```markup
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02_DOMの取得と要素の書き換え</title>
  
  <!-- 追加: defer属性をつけて外部JSを読み込む -->
  <script defer src="js/main.js"></script>
</head>
```

<aside>
💡

**【重要】defer の役割**

HTMLファイルは上から下に向かって順番に読み込まれます。

もし **`<head>`** の中で **`defer`** を付けずに **`<script src="js/main.js"></script>`** と書くと、**まだ下の `<h1>` や `<p>` が画面に作られる前にJavaScriptが実行されてしまいます**。

その結果、「そんな要素はまだ存在しません！」となってしまい、JavaScriptが **`null`**（空っぽ）を取得してエラーになる事故が起きます。

**`defer`** 属性を付けておくと、**「HTMLの構造を最後まで全部読み込んでから、安全にJavaScriptを実行してね」** という合図になります。現代のWeb制作における重要ルールです。

</aside>

**【main.js の読み込み確認】**

ファイルが正しく読み込まれているか確認するために以下のコードを記述して保存してみましょう。

**`js/main.js`**

```jsx
console.log('success!');
```

ブラウザで **`index.html`** を開き、デベロッパーツールの Console（ **`Command + Shift + j`** ）にメッセージが出力されていれば準備完了です。

---

# 2. 要素の取得

Webページを動かすためのすべての第一歩は、**「HTMLに書かれた要素をJavaScriptの世界に連れてくる（取得する）」** ことです。まずは小難しい理屈抜きで、実際に要素を捕まえてコンソールに表示してみましょう。

## 2-1. **ID名で要素を取得する：`document.getElementById()`**

HTMLの **`id` 属性** を手掛かりに要素を1つだけ特定して取得する命令です。

```jsx
const 変数名 = document.getElementById('id名');
```

**【コード例】**

```jsx
// HTML: <h1 id="main-title">JavaScriptで画面を動かそう</h1>

const mainTitle = document.getElementById('main-title');
console.log(mainTitle); // <h1 id="main-title">JavaScriptで画面を動かそう</h1>
```

<aside>
💡

**注意：引数に `#` をつけない（ID名のみを指定する）**

CSSではIDを **`#main-title`** と書きますが、**`getElementById`** は「ID名で探す」という専用命令なので、**シャープ（`#`）は不要**です！

- ❌ **`document.getElementById('#main-title');`** （探せなくて **`null`** になる）
- ⭕ **`document.getElementById('main-title');`** （IDの名前だけを渡す）
</aside>

---

## 2-2. **CSSセレクタで要素を取得する：`document.querySelector()`**

CSSを書くときと全く同じセレクタ記法（タグ名、クラス名、ID名、属性セレクタなど）を使って要素を取得できる万能な命令です。

```jsx
const 変数名 = document.querySelector('CSSセレクタ');
```

**【コード例】**

```jsx
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

すべてまとめて取得したい場合は、後に学習する **`querySelectorAll()`** を使用します。

</aside>

---

## 2-3. **`getElementById` と `querySelector` の使い分け比較**

どちらを使えばいいのか迷ったときは、以下の表を参考にしてください。

| メソッド | 取得できるもの | 特徴・使い分け |
| --- | --- | --- |
| **`document.getElementById()`** | 指定したIDの要素（1件） | 処理速度が速い。
固有のID（フォームやメインボタン等）を直接狙い撃ちするときに最適。 |
| **`document.querySelector()`** | セレクタに合致する最初の要素（1件） | クラス名、子孫セレクタ（**`nav li a`**）など柔軟な指定ができる。
万能で現代の主流。 |

---

## 2-4. **要素が取得できているか確認する**

取得した要素を変数に入れたら、必ずコンソールに出力して中身を確認する習慣をつけましょう。

```jsx
const title = document.getElementById('main-title');

// 1. タグのHTML構造を確認したいとき
console.log(title);
// 出力: <h1 id="main-title">JavaScriptで画面を動かそう</h1>

// 2. その要素が持っている「詳しい情報や設定値の一覧」を確認したいとき
console.dir(title);
// 出力: h1#main-title のツリー（textContent, style, id, innerHTML などがズラリと並ぶ）
```

<aside>
⚠️

**もし `null` と表示されたら？**

コンソールに **`null`** と出た場合、**「要素が見つからなかった（取得に失敗した）」**ことを意味します。主な原因は次の4点です。慌てずにチェックしましょう。

1. **HTMLのID名やクラス名のスペルミス**（大文字・小文字の違い、ハイフン抜けなど）
2. **`getElementById` に `#` を付けてしまっている**
3. **`<script>` に `defer` が付いておらず、HTMLより先にJSが走ってしまった**
4. **外部ファイルのパスが違っていて、そもそも読み込めていない**
</aside>

---

## 2-5. **html要素とbody要素の取得**

Webページの最上位にある **`<html>`** や **`<body>`**  は、**専用のショートカットプロパティ**が用意されています。

```jsx
// <html> 要素（ルート要素）を取得する
console.log(document.documentElement); // <html lang="ja">...</html> 全体が取得できる

// <body> 要素を取得する
console.log(document.body); // <body>...</body> 全体が取得できる
```

<aside>
⚠️

**注意：document.html ではなく document.documentElement を使用する**

**`<body>`** が **`document.body`** なので、**`<html>`** も **`document.html`** と書きたくなりますが、**`document.html` は存在しません（`undefined` になります）**。

正しくは **`document.documentElement`**（ドキュメントのルート要素という意味）と書きます。

実務では、サイト全体のダークモード切り替えや文字サイズ変更（**`<html>`** タグに属性やクラスを付与する処理）などでよく使われます。

</aside>

---

## ⭐︎ 練習

1. `js/main.js` を開き、`index.html` にある `<p>`、`<button>` も要素を取得して、それぞれ変数に代入してください。
2. いずれかの変数を `console.log()` で出力し、正しく要素が取得できているか確認してください。
3. いずれかの要素を `console.dir()` で出力し、三角アイコン（▶）をクリックしてどんなプロパティが存在するかスクロールして眺めてみましょう。

- 正解のソースコード
    
    ```jsx
    // js/main.js の記述例
    const mainTitle = document.getElementById('main-title');
    const introText = document.getElementById('intro');
    const changeBtn = document.querySelector('#change-btn');
    
    // ログ出力
    console.log(mainTitle);
    console.log(introText);
    console.dir(changeBtn);
    ```
    

---

# 3. **DOM（Document Object Model）とDOMツリーの仕組み**

## 3-1. **DOMとは？（HTMLとJavaScriptをつなぐ架け橋）**

**`console.dir()`** を実行したとき、HTMLのタグを取得しただけのはずなのに、**大量の情報や設定値（プロパティ）が詰まったデータ**が表示されたことが確認できたと思います。

HTMLファイルに書かれたコードは、ファイル上では単なる「テキストデータ（文字情報）」です。
しかしブラウザは、HTMLファイルを読み込むと同時に、その中に書かれたタグ（**`<html>`, `<body>`, `<h1>`** など）を解析し、**JavaScriptから操作できるように「たくさんの命令や値・設定項目の塊」としてメモリ上に展開**します。

この**「HTMLをJavaScriptから扱えるように変換した仕組み」**のことを、**DOM（Document Object Model：ドキュメント・オブジェクト・モデル）** と呼びます。

JavaScriptで **`document.getElementById('main-title')`** を実行したとき、取得しているのはHTMLファイルの文字そのものではなく、**ブラウザがメモリ上に展開した要素データ**です。だからこそ、JavaScriptから文字を変えたり色を変えたりといった操作が可能になります。

---

## 3-2. **DOMツリーの構造**

HTMLはタグの中にタグが入る「入れ子（ネスト）構造」になっています。
ブラウザはこの構造を、木の幹から枝が分かれて葉が茂るような**「ツリー構造（DOMツリー）」**として記憶しています。

![出典：[https://beginners-hp.com/javascript/dom.html](https://beginners-hp.com/javascript/dom.html)](https://beginners-hp.com/javascript/image/dom_4.png)

出典：[https://beginners-hp.com/javascript/dom.html](https://beginners-hp.com/javascript/dom.html)

**【DOMツリーの重要な用語】**

| 用語 | 英語表記 | 説明・具体例 |
| --- | --- | --- |
| **ノード** | Node | ツリーを構成する1つひとつの要素や部品の総称 |
| **要素ノード** | Element Node | **`<h1>`, `<p>`, `<button>`** などのHTMLタグそのもの |
| **テキストノード** | Text Node | タグの中に含まれる文字そのもの |
| **親ノード / 子ノード** | Parent / Child Node | 相対的な階層関係。外側の要素が「親」、内側の要素が「子」 |

---

## 3-3. **DOMツリーを実際に可視化してみる（実演ツール紹介）**

HTMLからDOMツリーがどのように組み立てられているかを視覚的に確認できるツールを紹介します。

[DOM Visualizer](https://bioub.github.io/dom-visualizer/)

**【確認手順】**

1. 上記リンクをブラウザで開きます。
2. 画面下部のテキストエリアに、`index.html` のソースコードを貼り付けてみましょう。
    
    ```html
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>単元2: DOMの取得と要素の書き換え</title>
      <script defer src="js/main.js"></script>
    </head>
    <body>
      <h1 id="main-title">JavaScriptで画面を動かそう</h1>
      <p id="intro">この文章はJavaScriptによって書き換えられます。</p>
      <button id="change-btn">内容を変更する</button>
    </body>
    </html>
    ```
    
3. 画面上部に、**`html`** から **`h1, p, button`** へと枝分かれしたツリー図が現れます。

<aside>
💡

**改行や空白も「テキストノード」になる**

ツリーを可視化した際にタグの間に現れる黄色い **`#text`** ノードは、HTMLコード内の**「改行」や「インデント（半角スペース）」**です。

ブラウザは目に見える文章だけでなく、コードを整えるための改行や空白文字もすべてテキストノードとしてDOMツリーに登録します。

</aside>

---

# 4. **要素の内容を書き換える（textContent と innerHTML）**

要素を取得できたら、次はその中身のテキストやHTMLを書き換えてみましょう。

## 4-1. **テキストを安全に書き換える：`textContent`**

**`element.textContent`** は、要素の中に含まれる「テキスト情報」を読み取ったり、新しいテキストで上書き（代入）したりするためのプロパティです。

```jsx
// 1. テキストを読み取る（参照）
console.log(mainTitle.textContent); // "JavaScriptで画面を動かそう"

// 2. 新しいテキストで上書きする（代入）
mainTitle.textContent = 'タイトルを書き換えました！';
```

**【テンプレートリテラルとの組み合わせ】**

前回の単元で学んだ変数やテンプレートリテラルと組み合わせることで、動的なメッセージを画面に表示できます。

```jsx
const day = 12;
const week = '月曜日';

introText.textContent = `今日は${day}日の${week}です。`;
```

---

## 4-2. **HTMLタグごと書き換える：`innerHTML`**

**`element.innerHTML`** は、要素の中身を「HTMLタグを含んだ文字列」として読み取ったり、書き換えたりするためのプロパティです。

```jsx
// 1. HTMLを含んだ中身を読み取る（参照）
console.log(introText.innerHTML);
// 出力: "この文章はJavaScriptによって書き換えられます。"
// （※もし中に <strong> などのタグがあれば、タグも含めた文字列として取得できます）

// 2. HTMLタグを含めて上書きする（代入）
introText.innerHTML = 'ようこそ！<strong>特別なご案内</strong>があります。';
```

ブラウザで確認すると、「特別なご案内」の部分が太字（`<strong>`）になって表示されます。

---

## 4-3. **`textContent` と `innerHTML` の違い**

**`textContent`** と **`innerHTML`** は、「**中身を読み取るとき（参照）**」と「**中身を書き換えるとき（代入）**」の両方で挙動が大きく異なります。

**① 中身を読み取るとき（参照）の違い**

```jsx
// 1. textContent で参照した場合
console.log(document.body.textContent);
// 出力: タグがすべて取り除かれ、body内の「純粋な文字テキスト」だけが取得される

// 2. innerHTML で参照した場合
console.log(document.body.innerHTML);
// 出力: <h1> や <p> などの「HTMLタグ構造を含んだ文字列」がそのまま取得される
```

**② 中身を書き換えるとき（代入）の違い**

```jsx
// 1. textContent にタグを代入した場合
introText.textContent = '<strong>太字になるかな？</strong>';
// 画面の表示: <strong>太字になるかな？</strong>
// （HTMLタグとして解釈されず、タグの文字がそのまま画面に表示される）

// 2. innerHTML にタグを代入した場合
introText.innerHTML = '<strong>太字になるかな？</strong>';
// 画面の表示: 太字になるかな？ （太字に装飾されて表示される）
// （HTMLタグとして解釈され、ブラウザが新しい要素として画面を組み立て直す）
```

<aside>
⚠️

**セキュリティ上の注意：XSS（クロスサイトスクリプティング）の危険性**

もしユーザーが問い合わせフォームなどで入力した文字列（例えば **`<script>攻撃用コード</script>`**）を、そのまま **`innerHTML`** で画面に出力してしまうと、ブラウザがそのスクリプトをプログラムとして実行してしまう脆弱性（XSS）が発生します。

一方、**`textContent`** を使用すれば、**`<script>`** という文字列もタグとして解釈されず、安全に無害化されたテキストとして画面に表示されます。
**「HTMLタグを含める必要がなく、純粋なテキストのみを更新する場合は `textContent` を使用する」** ことが安全なWeb制作の基本原則です。

</aside>

---

## ⭐︎ 練習

1. **`mainTitle`** のテキストを自分の名前に書き換えてみましょう。
2. **`introText`** の中身を、改行を含む文章に書き換えてみましょう。
3. **`changeBtn`** のテキストが太字になるように書き換えてみましょう。（strong要素）

![Snapzy_2026-10-11_21-37-00_164.png](02_DOM%E3%81%AE%E5%8F%96%E5%BE%97%E3%81%A8%E8%A6%81%E7%B4%A0%E3%81%AE%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88/Snapzy_2026-10-11_21-37-00_164.png)

- 正解のソースコード
    
    ```jsx
    mainTitle.textContent = '名前';
    introText.innerHTML = '途中で<br>改行がある文章です。';
    changeBtn.innerHTML = '<strong>内容を変更する</strong>';
    
    // 変数を活用した発展
    let text = changeBtn.textContent;
    changeBtn.innerHTML = `<strong>${text}</strong>`;
    ```
    

---

# 5. **スタイルを直接変更する（element.style）**

JavaScriptを使うと、要素のCSSスタイルも自由自在にリアルタイム変更できます。

## 5-1. **`element.style.◯◯` の基本**

要素の **`style` プロパティ** にドット記法でアクセスし、値を代入します。

```jsx
要素.style.プロパティ名 = '値';
```

**【コード例】**

```jsx
const mainTitle = document.getElementById('main-title');

// 文字色を変更する
mainTitle.style.color = '#ff3366';

// 背景色を変更する
mainTitle.style.backgroundColor = '#f0f4f8';
```

---

## 5-2. **重要ルール：ケバブケースからキャメルケースへ**

CSSでは単語をハイフンで繋ぐ「ケバブケース（`background-color`）」でプロパティ名を書きます。
しかし、JavaScriptではハイフン（**`-`**）が**引き算の記号**とみなされてしまうため、キャメルケース（2単語目の先頭を大文字）に変換して指定しなければなりません。

| CSSでの書き方 | JavaScript（**`element.style`**）での書き方 |
| --- | --- |
| color | element.style.color |
| background-color | element.style.backgroundColor |
| font-size | element.style.fontSize |
| margin-top | element.style.marginTop |

---

## 5-3. **注意点：単位（`px` 等）を含めた文字列で指定する**

CSSで数値プロパティ（**`font-size`** や **`width`** など）を指定するとき、数値だけでなく **`'px'` などの単位をつけた「文字列」** として代入する必要があります。

```jsx
// ❌ NG：単位がないためCSSとして反映されない
mainTitle.style.fontSize = 32;

// ⭕ OK：単位を含めた文字列として代入する
mainTitle.style.fontSize = '32px';

// ⭕ 応用：変数とテンプレートリテラルを使う場合
let newSize = 24;
mainTitle.style.fontSize = `${newSize}px`;
```

<aside>
💡

**`element.style` の特徴とクラス操作への接続**

**`element.style.◯◯`** を使うと、HTML要素に直接 **`style="..."`** という「インラインスタイル」が書き込まれます。
インラインスタイルは局所的なスタイルの変更には手軽ですが、多くのスタイルプロパティを一度に変更しようとするとJavaScript側のコードが複雑になってしまいます。

そのため、Web制作では**「あらかじめCSSに `.is-active` や `.is-dark` などの状態クラスを定義しておき、JavaScriptからはそのクラスを付け外しする」**という手法が広く使われます。このクラス操作テクニックは、次回以降に詳しく学習します。

</aside>

---

## ⭐︎ 練習

**`introText`**  のCSSを自由に変更してみましょう。

---

# 6. **クリックで書き換える**

ページを開いた瞬間に文字が変わるだけでは、ただHTMLを直接編集したのとあまり変わりません。

**「ユーザーがボタンを押したタイミングで画面が変わる」** というインタラクティブな動きを作ってみましょう。

## 6-1. **`addEventListener` の基本形**

JavaScriptに「〜したときに、この処理を実行してね」と教え込む命令を **イベントリスナー（`addEventListener`）** と呼びます。

```jsx
対象要素.addEventListener('イベントの種類', () => {
  // そのイベントが起きたときに実行したい処理
});
```

今回は最も基本となる **クリックイベント（`'click'`）** を使ってみます。

**【コード例】**

```jsx
const changeBtn = document.getElementById('change-btn');
const mainTitle = document.getElementById('main-title');

changeBtn.addEventListener('click', () => {
  mainTitle.textContent = 'ボタンがクリックされました！';
  mainTitle.style.color = '#e67e22';
});
```

ボタンをクリックした瞬間、見出しの文字と色が一瞬で切り替わったら成功です。

<aside>
💡

イベントに関しては、次回以降に詳しく学習します。今は基本の形を体に染み込ませましょう。

</aside>

---

# **7. 本日の確認課題**

ここまでの知識を総動員して、「ボタンを押すとページ全体のテーマカラーとメッセージが切り替わるページ」を作成してみましょう。

**【見本】**

[02_課題「テーマスイッチャー」](https://takagino.github.io/tri-education/wf1/2nd/js-basics/02_dom/complete/)

---

## **7-1. ファイルの準備**

1. **`index.html`** を以下のソースコードに置き換える。
    
    ```markup
    <!DOCTYPE html>
    <html lang="ja">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>02_課題「テーマスイッチャー」</title>
      <script defer src="js/main.js"></script>
    </head>
    
    <body>
      <h1 id="theme-title">今のテーマ：ライトモード</h1>
      <p id="theme-desc">下のボタンを押して、好きなテーマに切り替えてみてください。</p>
    
      <div class="btn-group">
        <button id="btn-light">☀️ ライト</button>
        <button id="btn-dark">🌙 ダーク</button>
        <button id="btn-○○">自由に設定</button>
      </div>
    </body>
    
    </html>
    ```
    
2. **`js/main.js`** の中身を全て削除する。

---

## **7-2. 実装の手順**

まずは「見本」を見ながら、どのような手順で実装していけば良いか頭の中で考えてみましょう。

1. 「自由に設定」ボタンのテーマを考え、id名とテキストを変更する。
2. 操作したい要素（テキスト変更、クリック登録）を取得し、変数に代入する。
3. 各ボタンにクリックイベントを登録する。
4. ボタンをクリックした時に実行したい処理を記述する。（body要素の背景色・文字色を変更する、見出しのテキストを変更する、など）

---

## **7-3. 提出方法・期限**

来週の授業開始までに、GitHubに同期する。