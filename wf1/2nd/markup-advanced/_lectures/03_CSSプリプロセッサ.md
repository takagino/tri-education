# 03_CSSプリプロセッサ

### HTML+CSS（火1-2 / 水1）

[00_導入](https://app.notion.com/p/00_-3c8bdf471aca80e3a92afe2bc6031e14?pvs=21)

[01_環境設定と確認課題](https://app.notion.com/p/01_-3f0bdf471aca80d0b9acf946b73cceaf?pvs=21)

[02_CSS設計とBEM](https://app.notion.com/p/02_CSS-BEM-3f1bdf471aca80f7b23cc380f650eb0f?pvs=21)

[**03_CSSプリプロセッサ**](https://app.notion.com/p/03_CSS-27abdf471aca80fead8cd05a2271f051?pvs=21)

---

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
- **Modifier（モディファイア）：** 見た目や状態のバリエーション（`--` で接続、`.btn--info` など）。※基本クラスと併記！
- **Mix（ミックス）：** 「配置用Element」＋「パーツ用Block」を同一タグに併記して、外側余白（margin）の責任を分離する。

<aside>
💡

**前回の予告を覚えていますか？**

「BEMはクラス名が長くなりやすく、素のCSSだと書くのが少し大変…」という唯一のデメリットがありました。

今回学ぶ **「CSSプリプロセッサ（Sass）」** を導入することで、このデメリットが完全に解消され、**信じられないほど爆速かつ美しくBEMが記述できるようになります！**

</aside>

---

## 1-2. 前回の課題の確認

前回取り組んだ課題「03-newslly-bem」の見本コードとプレビューです。

**【Newslly 見本（Webプレビュー）】**

- [Top ページ](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/03-newslly-bem/completed/index.html)
- [About ページ](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/03-newslly-bem/completed/about.html)
- [完成コード（GitHub）](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/03-newslly-bem/completed)

---

# 2. 今回学ぶこと

- CSSプリプロセッサ（Sass / SCSS）とは？
- VSCode拡張機能「Live Sass Compiler」による自動コンパイル環境の構築
- Sassの基本機能（変数、ネスト、親セレクタ参照 `&`、四則演算、Mixin）
- **BEM × Sass の最強の組み合わせ**

**【サンプルデータ】**

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=drive_link)

- **04-newslly-sass**：授業で一緒にマークアップするデータ
- **05-smartspace-sass**：今回の課題データ

**【Newslly 見本（Webプレビュー）】**

- [Top ページ](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/04-newslly-sass/completed/index.html)
- [About ページ](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/04-newslly-sass/completed/about.html)

**【途中経過】**

- [04-newslly-sass/starter（GitHub）](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/04-newslly-sass/starter)

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

> 参考：[State of CSS: Other Tools (Pre/Post-processors)](https://stateofcss.com/)

---

## 3-1. Sassとは？（SASS記法とSCSS記法）

Sass（サス）は「Syntactically Awesome StyleSheets（文法的に最高なスタイルシート）」の略です。

Sassには歴史的に2つの書き方（構文）がありますが、**現在のWeb制作で使われているのは100%「SCSS（エス・シー・エス・エス）」**です。

- **SCSS記法（拡張子 `.scss`）★現在標準**
    - 通常のCSSと完全に同じ波括弧 `{ }` やセミコロン `;` を使う記法。
    - 普通のCSSをそのまま貼り付けても正常に動くため、直感的に学習できる。
- **SASS記法（拡張子 `.sass`）※初期の記法**
    - 波括弧やセミコロンを省略し、インデントだけで表す記法（現在はほとんど使われません）。

※本講義および実務で「Sassを学ぶ」という場合、実質的にはすべて**「SCSS」**のことを指します。ファイル拡張子も必ず **`.scss`** を使用します。

---

## 3-2. コンパイル環境の構築（Live Sass Compiler）

`.scss` ファイルはそのままブラウザに読み込ませても認識されません。
そのため、**「`.scss` を保存した瞬間に、自動で通常の `.css` を書き出す（コンパイルする）」**仕組みを導入します。

本講義では、VSCodeの拡張機能として広く使われている **「Live Sass Compiler（Glenn Marks版）」** を使用します。

### 【ステップ1：拡張機能のインストール】

1. VSCodeの左側メニュー「拡張機能」アイコンを選択（または `Cmd + Shift + X`）。
2. 検索バーに **`Live Sass Compiler`** と入力。
3. 作者が **Glenn Marks**（ID: `glenn2223.live-sass`）となっている拡張機能を探して「インストール」をクリック。

### 【ステップ2：自動起動（watchOnLaunch）と出力先の設定】

Live Sass Compilerは、初期状態では右下の「Watch Sass」を手動でクリックしないと動きません。
しかし、設定を1箇所変更するだけで、**VSCodeでフォルダを開くだけで自動的に監視（Watch）が開始されるようになり、押し忘れトラブルをゼロにできます！**

#### 方法A：設定画面（GUI）から設定する場合
1. VSCodeの「設定」を開く（`Cmd + ,`）。
2. 検索バーに **`watchOnLaunch`** と入力。
3. **「Live Sass Compile > Settings: Watch On Launch」** にチェックを入れる。

#### 方法B：settings.json で一括設定する場合（おすすめ）
`settings.json` に以下の設定を記述すると、自動起動と出力先（`css/` フォルダ）が一発で確実に整います。

```json
{
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
}
```

<aside>
💡

**ポイント：なぜ `~/../css` と書くのか？（どのフォルダを開いていても安心な理由）**

設定値の頭にある **`~`（チルダ）** は、**「VSCodeでどのフォルダを開いているかに関わらず、編集中の `.scss` ファイル自身の場所を基準にする」** という特別な記法です。

これがあるおかげで、大元のまとめフォルダを開いていようが、個別の課題フォルダを開いていようが、常に「編集中の `sass/` フォルダの隣にある `css/` フォルダ」を正確に探して出力してくれます。

</aside>

---

## 3-3. フォルダ構成とおすすめの開き方

### なぜ `sass` フォルダと `css` フォルダを分けるのか？
「HTMLと同じ階層にそのままCSSを出力した方がシンプルでは？」と思うかもしれません。
しかし、Web制作の現場では必ずフォルダを分けて管理します。

1. **ファイルが散らかるのを防ぐ**
   - ルートに `index.html`, `style.scss`, `style.css`, `style.css.map` が並ぶと、ファイルが増えた時に「どれが編集対象で、どれが読み込み用か」が分からなくなります。
2. **「元データ（設計図）」と「成果物」の分離**
   - **「人間が手で編集する設計図（`sass/`）」** と **「プログラムが自動生成した成果物（`css/`）」** をディレクトリで明確に分けるのが、開発における基本的なマナーです。

### おすすめのVSCodeでの開き方
Live Sass Compilerのチルダ設定（`~`）により、まとめフォルダを開いた状態でも問題なくコンパイルされますが、
**「その日に取り組む課題フォルダ（例: `04-newslly-sass`）を直接VSCodeで開く」** ことをおすすめします。

左側のエクスプローラー（ファイルツリー）がすっきりし、Git同期やパスの確認で迷子になりにくくなります。

---

# 4. Sassでできること（基本機能）

まずは実際に手を動かして、Sassの基本機能を体験してみましょう。

**【準備】**
1. VSCodeで `04-newslly-sass` フォルダを開く。
2. フォルダ内に新規フォルダ `sass` を作成する。
3. `sass` フォルダの中に新規ファイル `style.scss` を作成する。
4. ファイル内に適当なスタイルを書いて保存する。
5. 自動的に `css` フォルダが生成され、その中に `style.css` と `style.css.map` が書き出されていれば準備完了です！

**【ディレクトリ構成】**

```text
04-newslly-sass/
  ├── index.html
  ├── about.html
  ├── css/
  │    ├── style.css        ← 自動生成される（直接編集しない！）
  │    └── style.css.map    ← デバッグ用マップファイル
  └── sass/
       └── style.scss       ← 私たちが編集するのはこのファイル！
```

<aside>
⚠️

**注意：`css/style.css` は直接編集しないこと！**

Sassを導入した後は、スタイルはすべて `sass/style.scss` に記述します。
もし `css/style.css` を手作業で編集しても、次に `.scss` を保存した瞬間に上書きされて消えてしまいます。
また、コンパイラが自動で文字コードを管理するため、ファイル冒頭の `@charset "utf-8";` も手動で書く必要はありません。

</aside>

---

## 4-1. 変数（Variables）

ブランドカラーやフォント指定など、サイト内で繰り返し使う値を**変数（`$変数名: 値;`）**として1箇所で定義できます。

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

## 4-3. 親セレクタの参照（`&`）★BEMとの最強タッグ！

ネストの中で **アンパサンド（`&`）** を使うと、**「親セレクタの名前をそのまま参照・展開」**することができます。

### ① 擬似クラス（`:hover`, `:before` など）

```scss
.btn {
  background-color: $color-main;
  color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: $color-accent;
  }
}
```

```css
/* コンパイル後 */
.btn {
  background-color: #202124;
  color: #fff;
  transition: 0.3s;
}

.btn:hover {
  background-color: #FA6980;
}
```

### ② BEMの命名規則と組み合わせる（最大の武器！）

前回のBEMで「Elementは `親Block__element`、Modifierは `親Block--modifier`」と学びました。
アンパサンド（`&`）を使うと、**親のBlock名を二度と手で打ち直す必要がなくなります！**

```scss
/* SCSSでの記述 */
.post {
  padding: 20px;
  background-color: #fff;

  // &__category ➔ .post__category に展開される
  &__category {
    margin-bottom: 10px;
    color: $color-accent;
    font-size: 12px;
  }

  // &__title ➔ .post__title に展開される
  &__title {
    font-size: 18px;
    font-weight: bold;

    // &--border ➔ .post__title--border に展開される
    &--border {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
  }
}
```

```css
/* コンパイル後の CSS */
.post {
  padding: 20px;
  background-color: #fff;
}

.post__category {
  margin-bottom: 10px;
  color: #FA6980;
  font-size: 12px;
}

.post__title {
  font-size: 18px;
  font-weight: bold;
}

.post__title--border {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
```

<aside>
🌟

**感動ポイント！**

生成されるCSSは、詳細度が完全にフラットなシングルクラス（`.post__category`, `.post__title`）です。
SCSS側では綺麗に1つのBlock内にまとまって書けるため、**「可読性の高さ」と「CSS詳細度の低さ」が完璧に両立**します。
これこそが、現代のWeb制作現場で「BEM × Sass」が最強の組み合わせとして愛されている理由です。

</aside>

---

## 4-4. 四則演算とデザインカンプ計算（`sass:math`）

Sassでは、スタイル値の中で加減乗除（`+`, `-`, `*`, `/`）の計算が直接行えます。

```scss
.box {
  width: 100px + 50px;   // 足し算 ➔ 150px
  font-size: 16px - 2px;  // 引き算 ➔ 14px
  padding: 10px * 2;      // 掛け算 ➔ 20px
}
```

### ⚠️ 割り算には `@use 'sass:math';` を使う

CSS自身にも `font: 14px/1.5 sans-serif;` や `grid-column: 1 / 3;` のようにスラッシュ（`/`）を使った区切り表現があります。
そのため、現在のSassでは割り算の記号として `/` を直接使わず、**Sass公式の計算モジュール `math.div()`** を使用するルールになっています。

ファイルの最上部に以下を1行書くだけで利用できます。

```scss
@use 'sass:math';
```

---

### 🎨【デザインカンプ再現の3大公式チートシート】

デザインカンプ（XDやFigma）のプロパティ数値を電卓で計算することなく、**カンプの数値をそのまま放り込める3大公式**です。これだけ覚えておけば実務の計算は困りません！

#### 公式①：行送り（line-height）の計算
- **公式：** `math.div(カンプの行送り値, カンプの文字サイズ)`
- **例：** 文字サイズが `14px`、行送りが `24px` の場合

```scss
body {
  font-size: 14px;
  line-height: math.div(24, 14); // ➔ 1.7142857143
}
```

#### 公式②：文字詰め（letter-spacing）の計算
- **公式：** `#{math.div(カンプの字間値, 1000)}em`
- **例：** XDの字間（AV）が `50` の場合（※1000で割ってemに換算）

```scss
body {
  letter-spacing: #{math.div(50, 1000)}em; // ➔ 0.05em
}
```
*(※ `#{ }` はインターポレーションと呼び、計算結果と単位 `em` を綺麗に結合するための記述です)*

#### 公式③：横幅のパーセント（width %）の計算
- **公式：** `percentage(math.div(ターゲット幅, 親の横幅))`
- **例：** 親の幅が `800px` で、要素の幅が `300px` の場合

```scss
.sidebar {
  width: percentage(math.div(300, 800)); // ➔ 37.5%
}
```

---

## 4-5. 挿入（Mixin）

サイト全体で何度も登場する「スタイルのセット（まとまり）」を定義し、スタンプのように呼び出して使い回す機能です。

### ① 基本：引数なしの単純な共通化

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

---

### ② 発展：引数（パラメータ）を使った柔軟なカスタマイズ

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

---

## 4-6. コメントの使い分け

Sassには2種類のコメント構文があります。

```scss
// 1行コメント：コンパイル後のCSSには出力されない（開発用のメモに最適）

/* 複数行コメント：コンパイル後のCSSにもそのまま残る（クレジットやセクション区切りに使用） */
```

チームメンバー向けのメモや「なぜこのCSSを書いたのか」という思考ログは、`//` で書いておけば本番のCSSファイルが重くならないため重宝します。

---

## 4-7. まとめ：BEM × Sass のコーディング鉄則

1. **ページは複数の「Block」の組み合わせで組み立てる。**
2. **各Blockの内部で、アンパサンド（`&__element`, `&--modifier`）を使ってネスト記述する。**
3. **深すぎるネスト（3階層以上）は詳細度が上がるため避ける。**
4. **モジュール自身には外側の余白（margin）を持たせず、親セクションのElementとMixして配置する。**
5. **よく使うスタイルセット（innerなど）は `@mixin` で共通化する。**
6. **デザインカンプのプロパティ値は、電卓を叩かず `sass:math` の公式を活用する。**

---

# 5. 課題

講義で学んだ「BEM」および「Sass（SCSS）」のルールに則って、課題「05-smartspace-sass」をマークアップしてください。

**【課題データ】**

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=drive_link)

- `05-smartspace-sass.zip`

**【見本】**

- [Top ページ（SmartSpace）](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/05-smartspace-sass/completed/index.html)
- [About ページ（SmartSpace）](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/05-smartspace-sass/completed/about.html)
- [完成コード（GitHub）](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/05-smartspace-sass/completed)

**【提出方法】**

自身のGitHubリポジトリにコミット＆プッシュし、同期（提出）してください。
