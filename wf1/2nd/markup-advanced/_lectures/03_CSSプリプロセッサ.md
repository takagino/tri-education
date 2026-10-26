# 03_CSSプリプロセッサ

### HTML+CSS（火1-2 / 水1）

[00_導入](https://app.notion.com/p/00_-3c8bdf471aca80e3a92afe2bc6031e14?pvs=21)

[01_**環境設定と確認課題**](https://app.notion.com/p/01_-3f0bdf471aca80d0b9acf946b73cceaf?pvs=21)

[**02_CSS設計とBEM**](https://app.notion.com/p/02_CSS-BEM-3f1bdf471aca80f7b23cc380f650eb0f?pvs=21)

[03_CSSプリプロセッサ](https://app.notion.com/p/03_CSS-3f1bdf471aca801aaefedf63d430a800?pvs=21)

# 1. はじめに

## 1-1. 前回の復習

**【良いマークアップの4箇条】**

- **PREDICTABLE（予測しやすい）：** クラス名を見ただけで役割や影響範囲が直感的にわかること。
- **REUSABLE（再利用しやすい）：** 同じパーツを何度もゼロから書かず、使い回せること。
- **MAINTAINABLE（保守しやすい）：** 修正時に他のパーツを壊さず（副作用なく）安全に更新できること。
- **SCALABLE（拡張しやすい）：** ページ数やチームメンバーが増えても破綻しないこと。

**【4箇条を達成するための2つの武器】**

1. デザインおよびマークアップを「**モジュール（再利用可能な部品）**」単位で考えること。
2. マークアップの「**ルール（BEM）**」を設定すること。

**【BEMのおさらい】**

- **Block（ブロック）：** どこに移動させても自立して機能する独立した部品（`.intro`, `.card`, `.btn` など）。
- **Element（エレメント）：** Blockを構成する中身の要素（`__` で接続、`.intro__title` など）。※孫つなぎ禁止！
- **Modifier（モディファイア）：** 見た目や状態のバリエーション（`-` で接続、`.btn--info` など）。※基本クラスと併記！
- **Mix（ミックス）：** 「配置用Element」＋「パーツ用Block」を同一タグに併記して、外側余白（margin）の責任を分離する。

---

## 1-2. 前回の課題

[Newslly](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/03-newslly-bem/completed/)

[About | Newslly](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/03-newslly-bem/completed/about.html)

[tri-education/wf1/2nd/markup-advanced/03-newslly-bem/completed at main · takagino/tri-education](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/03-newslly-bem/completed)

---

# 2. 今回学ぶこと

- CSSプリプロセッサ（Sass / SCSS）とは？
- VSCode拡張機能「Live Sass Compiler」による自動コンパイル環境の構築
- Sassの基本機能（変数、ネスト、親セレクタ参照 `&`、四則演算、Mixin）
- **BEM × Sass の最強の組み合わせ**

---

## **2-1. サンプルデータ**

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

- **04-newslly-sass**：授業で一緒にマークアップするデータ
- **05-Fitness-sass**：今回の課題データ

---

## **2-2. 見本（Webプレビュー）**

[Newslly](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/04-newslly-sass/completed/)

[ABOUT | Newslly](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/04-newslly-sass/completed/about.html)

---

## **2-3. 途中経過**

[tri-education/wf1/2nd/markup-advanced/04-newslly-sass/starter at main · takagino/tri-education](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/04-newslly-sass/starter)

---

# 3. CSSプリプロセッサとは？

「プリプロセッサ（Preprocessor）」とは、直訳すると**「前処理を行うプログラム」**という意味です。

通常のCSSはプログラミング言語ではないため、「変数で色を一括管理する」「入れ子で綺麗に整理する」「デザインカンプの数値をそのまま計算する」といった処理が苦手です。

そこで、**「人間が書きやすく保守しやすい特別な構文（Sassなど）でスタイルを書き、それをブラウザが解釈できる通常のCSSへと自動変換（コンパイル）する」**という仕組みが作られました。これがCSSプリプロセッサです。

**【主なCSSプリプロセッサ】**

- **Sass（SCSS）：** 世界中・日本中のWeb制作現場でデファクトスタンダードとして使われている（シェア圧倒的No.1）。
- PostCSS
- Less
- Lightning CSS

**【参考】**

[State of CSS 2025: Other Tools](https://2025.stateofcss.com/en-US/other-tools/#pre_post_processors)

---

## 3-1. Sassとは？（SASS記法とSCSS記法）

Sass（サス）は「Syntactically Awesome StyleSheets（文法的に最高なスタイルシート）」の略です。

Sassには歴史的に2つの書き方（構文）がありますが、**現在のWeb制作で使われているのは100%「SCSS（エス・シー・エス・エス）」**です。

- **SCSS記法（拡張子 `.scss`）★現在標準**
    - 通常のCSSと完全に同じ波括弧 `{ }` やセミコロン `;` を使う記法。
    - 普通のCSSをそのまま貼り付けても正常に動くため、直感的に学習できる。
- **SASS記法（拡張子 `.sass`）※初期の記法**
    - 波括弧やセミコロンを省略し、インデントだけで表す記法（現在はほとんど使われません）。
    - 

※本講義および実務で「Sassを学ぶ」という場合、実質的にはすべて**「SCSS」**のことを指します。ファイル拡張子も必ず **`.scss`** を使用します。

---

## 3-2. コンパイル環境の構築（Live Sass Compiler）

`.scss` ファイルはそのままブラウザに読み込ませても認識されません。
そのため**、「`.scss` を保存した瞬間に、自動で通常の `.css` を書き出す（コンパイルする）」**仕組みを導入します。

本講義では、VSCodeの拡張機能として広く使われている **「Live Sass Compiler（Glenn Marks版）」** を使用します。

**【ステップ1：拡張機能のインストール】**

1. VSCodeの左側メニュー「拡張機能」アイコンを選択。
2. 検索バーに **`Live Sass Compiler`** と入力。
3. 作者が「**Glenn Marks」**となっている拡張機能を探して「インストール」をクリック。

**【ステップ2：自動起動（watchOnLaunch）と出力先の設定】**

Live Sass Compilerは、初期状態では右下の「Watch Sass」を手動でクリックしないと動きません。
しかし、設定を1箇所変更するだけで、**VSCodeでフォルダを開くだけで自動的に監視（Watch）が開始されるようになり、押し忘れトラブルをゼロにできます。**

**方法A：設定画面（GUI）から設定する場合**

1. VSCodeの「設定」を開く（`Cmd + ,`）。
2. 検索バーに **`watchOnLaunch`** と入力。
3. **「Live Sass Compile > Settings: Watch On Launch」** にチェックを入れる。

**方法B：settings.json で一括設定する場合（おすすめ）**

`settings.json` に以下の設定を記述すると、自動起動と出力先（`css/` フォルダ）が一発で確実に整います。

```json
// VSCode起動時に自動でSassの監視を開始（クリック忘れ防止！）
"liveSassCompile.settings.watchOnLaunch": true,

// CSSの出力先とフォーマットの設定
"liveSassCompile.settings.formats": [
	{
		"format": "expanded",
    "extensionName": ".css",
    "savePath": "~/../css" // scssファイルがあるフォルダの隣にある「css」フォルダに出力
  }
],

// ソースマップ（デバッグ用）を生成する
"liveSassCompile.settings.generateMap": true
```

**【ステップ3：sassフォルダとファイルを作成して動作確認】**

設定ができたら、早速実際にファイルを作成して自動コンパイルを体験してみましょう。
（本日の課題フォルダ `04-newslly-sass` をVSCodeで開いた状態で作業します）

1. **`sass` フォルダを新規作成する**
    - プロジェクト内（`index.html` と同じ階層）に **`sass`** フォルダを作成します。
2. **`style.scss` ファイルを新規作成する**
    - 作成した `sass/` フォルダの中に、新規ファイル **`style.scss`** を作成します。
3. **適当なスタイルを書いて保存（`Cmd + S`）する**
    - 動作確認のため、以下のようなコードを書いて保存してみましょう。
    
    ```scss
    body {
      margin: 0;
    }
    ```
    
4. **どこに何が生成されたか確認する！**
    - 保存した瞬間、VSCodeの左側エクスプローラー（ファイル一覧）を見てみましょう。
    - `sass/` フォルダの隣に、自動で **`css/`** フォルダが作成され、その中に **`style.css`** と **`style.css.map`** が書き出されていれば成功です。
        
        ![Snapzy_2026-10-19_19-28-15_443.png](03_CSS%E3%83%97%E3%83%AA%E3%83%97%E3%83%AD%E3%82%BB%E3%83%83%E3%82%B5/Snapzy_2026-10-19_19-28-15_443.png)
        

```
04-newslly-sass/
  ├── css/              ← 保存した瞬間に自動生成される！（直接編集しない）
  │    ├── style.css    ← ブラウザが読み込む通常のCSS
  │    └── style.css.map← デバッグ用のマップファイル
  └── sass/
       └── style.scss   ← 私たちが編集する設計図
```

<aside>
⚠️

**自動生成されない場合**

VSCode右下のステータスバーを確認してください。`Watching...` となっていれば監視中です。

もし `Watch Sass` と表示されている場合は、クリックして監視を開始してください（またはVSCodeを一度再起動してみてください）。

</aside>

<aside>
💡

**なぜ `~/../css` と書くのか？**

設定値の頭にある **`~`（チルダ）** は、**「VSCodeでどのフォルダを開いているかに関わらず、編集中の `.scss` ファイル自身の場所を基準にする」** という特別な記法です。

これがあるおかげで、大元のまとめフォルダを開いていようが、個別の課題フォルダを開いていようが、常に「編集中の `sass/` フォルダと同じディレクトリにある `css/` フォルダ」を正確に探して出力してくれます。

</aside>

---

# 4. Sassでできること（基本機能）

ステップ3で作成した **`sass/style.scss`** を使って、Sassの便利な基本機能を体験していきましょう。

<aside>
⚠️

**注意：`css/style.css` は直接編集しないこと**

Sassを導入した後は、スタイルはすべて `sass/style.scss` に記述します。
もし `css/style.css` を手作業で編集しても、次に `.scss` を保存した瞬間に上書きされて消えてしまいます。

また、コンパイラが自動で文字コードを管理するため、ファイル冒頭の `@charset "utf-8";` も手動で書く必要はありません。

</aside>

---

## 4-1. 変数（Variables）

ブランドカラーやフォント指定など、サイト内で繰り返し使う値を変数**（`$変数名: 値;`）**として1箇所で定義できます。

```scss
// 変数の定義
$color-text: #888;
$color-main: #202124;
$color-accent: #FA6980;

$font-family-base: Helvetica, Arial, sans-serif;

// 変数の使用
body {
  color: $color-text;
  font-family: $font-family-base;
}

.title {
  color: $color-main;
}

.link {
  color: $color-accent;
}
```

```css
/* コンパイル後の CSS */
body {
  color: #888;
  font-family: Helvetica, Arial, sans-serif;
}

.title {
  color: #202124;
}

.link {
  color: #FA6980;
}
```

<aside>
💡

**現場のコツ：プレフィックスでグループ化する**

`$color-text`, `$color-main`, `$color-accent` のように、単語の頭を `$color-` で揃えておくと、VSCodeで `$color-` と打った瞬間に一覧が入力補完候補として表示されるため、カラーコードを一切覚える必要がなくなります。

</aside>

---

## 4-2. ネスト（入れ子構造）

HTMLの階層構造と同じように、CSSセレクタを入れ子（ネスト）にして記述できます。

```scss
body {
  color: $color-text;
  font-family: $font-family-base;

  img {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
  }
}
```

```css
/* コンパイル後の CSS */
body {
  color: #888;
  font-family: Helvetica, Arial, sans-serif;
}

body img {
  max-width: 100%;
  height: auto;
  vertical-align: bottom;
}
```

<aside>
⚠️

**ネストの注意点：深すぎるネストは避ける**

ネストは便利ですが、`header { nav { ul { li { a { ... } } } } }` のように何階層も深くネストすると、生成されるCSSセレクタが長くなり詳細度が高くなってしまいます。
ネストの深さは**原則2〜3階層まで**に抑えるのが健全なCSSを保つ鉄則です。

</aside>

---

## 4-3. 親セレクタの参照（`&`）

ネストの中で **アンパサンド（`&`）** を使うと、**「親セレクタの名前をそのまま参照・展開」**することができます。

**① 擬似クラス（`:hover`, `:before` など）**

```scss
.btn {
  background-color: $color-accent;
  color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: $color-main;
  }
}
```

```css
/* コンパイル後 */
.btn {
  background-color: #FA6980;
  color: #fff;
  transition: 0.3s;
}

.btn:hover {
  background-color: #202124;
}
```

**② BEMの命名規則と組み合わせる**

前回のBEMで「Elementは `親Block__element`、Modifierは `親Block--modifier`」と学びました。
アンパサンド（`&`）を使うと、**親のBlock名を二度と手で打ち直す必要がなくなります。**

```scss
/* SCSSでの記述 */
.header {
  padding: 30px 0 60px;
  text-align: center;

  &__inner {
	  max-width: 88%;
	  width: 800px;
	  margin-left: auto;
	  margin-right: auto;
  }
}
```

```css
/* コンパイル後の CSS */
.header {
  padding: 30px 0 60px;
  text-align: center;
}

.header__inner {
	max-width: 88%;
	width: 800px;
	margin-left: auto;
	margin-right: auto;
}
```

<aside>
💡

生成されるCSSは、詳細度が完全にフラットなシングルクラス（`.post__category`, `.post__title`）です。

SCSS側では綺麗に1つのBlock内にまとまって書けるため、**「可読性の高さ」と「CSS詳細度の低さ」が完璧に両立**します。
これこそが、現代のWeb制作現場で「BEM × Sass」が最強の組み合わせとして愛されている理由です。

</aside>

---

## ⭐️ 練習

ヘッダーとフッターを完成させてみましょう。

---

## 4-4. 四則演算（`sass:math`）

Sassでは、スタイル値の中で加減乗除（`+`, `-`, `*`, `/`）の計算が直接行えます。

```scss
.box {
  width: 100px + 50px;   // 足し算 ➔ 150px
  font-size: 16px - 2px;  // 引き算 ➔ 14px
  padding: 10px * 2;      // 掛け算 ➔ 20px
}
```

**【割り算の設定】**

CSS自身にも `font: 14px/1.5 sans-serif;` や `grid-column: 1 / 3;` のようにスラッシュ（`/`）を使った区切り表現があります。
そのため、現在のSassでは割り算の記号として `/` を直接使わず、**Sass公式の計算モジュール `math.div()`** を使用するルールになっています。

ファイルの最上部に以下を1行書くだけで利用できます。

```scss
@use 'sass:math';

.box {
  width: 100px + 50px;
  font-size: 16px - 2px;
  padding: 10px * 2;
  line-height: math.div(24, 14); // 割り算 ➔ 1.7142857143
}
```

---

## 4-5. デザインカンプ再現の3大公式チートシート

デザインカンプ（XDやFigma）のプロパティ数値を電卓で計算することなく、**カンプの数値をそのまま放り込める3大公式**です。これだけ覚えておけば実務の計算は困りません。

**【行間（line-height）の計算】**

```scss
/* **公式：** math.div(行送り値, 文字サイズ) */

body {
  font-size: 14px;
  line-height: math.div(24, 14); // ➔ 1.7142857143
}
```

**【文字間（letter-spacing）の計算】**

```scss
/* **公式：** #{math.div(字間値, 1000)}em */

body {
  letter-spacing: #{math.div(50, 1000)}em; // ➔ 0.05em
}
```

※ `#{ }` はインターポレーションと呼び、計算結果と単位 `em` を綺麗に結合するための記述です。

**【横幅のパーセント（width %）の計算】**

```scss
/* **公式：** percentage(math.div(ターゲット幅, 親の横幅)) */

.sidebar {
  width: percentage(math.div(300, 800)); // ➔ 37.5%
}
```

---

## 4-6. 挿入（Mixin）

サイト全体で何度も登場する「スタイルのセット（まとまり）」を定義し、スタンプのように呼び出して使い回す機能です。

**【基本：引数なしの単純な共通化】**

例えば、コンテナ枠の最大幅と中央揃え（`inner`）を共通化してみましょう。

```scss
// 1. @mixin でスタイルを定義する
@mixin inner() {
  max-width: 800px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
}

// 2. @include で呼び出す
.header__inner {
  @include inner();
}

.footer__inner {
  @include inner();
}
```

```css
/* コンパイル後の CSS */
.header__inner {
  max-width: 800px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
}

.footer__inner {
  max-width: 800px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
}
```

**【発展：引数（パラメータ）を使った柔軟なカスタマイズ】**

「基本は最大幅800pxだけど、特定の場所だけ1200pxに広げたい」といった場合、**引数（初期値付き）**を渡すことができます。

```scss
// 初期値（デフォルト値）を指定した引数
@mixin inner($mw: 800px, $w: 88%) {
  max-width: $mw;
  width: $w;
  margin-left: auto;
  margin-right: auto;
}

.header__inner {
  @include inner(); // 初期値（800px, 88%）が適用される
}

.footer__inner {
  @include inner(1200px, 100%); // 1200px, 100% で上書き適用される
}
```

```css
/* コンパイル後の CSS */
.header__inner {
  max-width: 800px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
}

.footer__inner {
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
```

<aside>
💡

**「変更頻度が高い値」を引数の先頭に置くコツ**

引数には初期値（デフォルト値）を設定できますが、**「どの順番で引数を並べるか」** が日々の使いやすさを大きく左右します。

Sassでは引数を前から順番に受け取るため、**1つ目の引数だけを上書きしたいときは、2つ目以降の記述を省略** できます。

```scss
// 1つ目の $mw だけを 1000px に上書き（2つ目の $w は初期値 88% が自動適用！）
.news__inner {
  @include inner(1000px);
}
```

もしこれが `@mixin inner($w: 88%, $mw: 800px)` のように逆の順番になっていたらどうでしょうか？
幅（`$mw`）を変えたいだけなのに、変更しない `$w` まで `@include inner(88%, 1000px);` と毎回書く必要が出てしまいます。

そのため、mixinを自作するときは、**「変更・上書きする可能性が一番高い引数（例：幅や背景色など）を1つ目に持ってくる」** のが実務における設計の鉄則です。

</aside>

---

## 4-7. コメントの使い分け

Sassには2種類のコメント構文があります。

```scss
// 1行コメント：コンパイル後のCSSには出力されない（開発用のメモに最適）

/* 複数行コメント：コンパイル後のCSSにもそのまま残る（クレジットやセクション区切りに使用） */
```

チームメンバー向けのメモや「なぜこのCSSを書いたのか」という思考ログは、`//` で書いておけば本番のCSSファイルが重くならないため重宝します。

---

## 4-8. まとめ：BEM × Sass のコーディング鉄則

1. **ページは複数の「Block」の組み合わせで組み立てる。**
2. **各Blockの内部で、アンパサンド（`&__element`, `&--modifier`）を使ってネスト記述する。**
3. **深すぎるネスト（3階層以上）は詳細度が上がるため避ける。**
4. **モジュール自身には外側の余白（margin）を持たせず、親セクションのElementとMixして配置する。**
5. **よく使うスタイルセット（innerなど）は `@mixin` で共通化する。**
6. **デザインカンプのプロパティ値は、電卓を叩かず `sass:math` の公式を活用する。**

**【その他のSassの機能】**

[Sass: Sass Basics](https://sass-lang.com/guide/)

---

# 5. 課題

「BEM＆Sass」のルールに則って「05-Fitness-sass」をマークアップする。

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

**【注意点】**

- よく出てくる色は変数にすること。
- フォントファミリーが2種類あるので、変数にすること。
- inner（その他必要なもの）をmixinにすること。
- 行間やも文字間の計算はSassの機能を使って行うこと。