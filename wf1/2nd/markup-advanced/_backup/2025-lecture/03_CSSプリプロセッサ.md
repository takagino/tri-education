# 03_CSSプリプロセッサ

### HTML+CSS

[00_導入](https://app.notion.com/p/00_-262bdf471aca8027951bee528b41d69b?pvs=21)

[01_GitHubの設定](https://app.notion.com/p/01_GitHub-271bdf471aca8044ac6af9cdd32751b1?pvs=21)

[02_BEM](https://app.notion.com/p/02_BEM-272bdf471aca8091a385dcdebd1708a7?pvs=21)

[**03_CSSプリプロセッサ**](https://app.notion.com/p/03_CSS-27abdf471aca80fead8cd05a2271f051?pvs=21)

[**04_Sassによるスマホ対応**](https://app.notion.com/p/04_Sass-28abdf471aca800caad6e31b9753972b?pvs=21)

[05_様々な単位](https://app.notion.com/p/05_-294bdf471aca80b693a3fa61143d8ede?pvs=21)

[06_**Webサイトパフォーマンス**](https://app.notion.com/p/06_Web-29fbdf471aca8041b8bcda0bb4a2bd70?pvs=21)

[**07_Webアクセシビリティ**](https://app.notion.com/p/07_Web-2a2bdf471aca800d889bc2e2857c3462?pvs=21)

[08_複雑なマークアップ](https://app.notion.com/p/08_-2b0bdf471aca803a9433d90ef392f364?pvs=21)

[09_進級展に向けて](https://app.notion.com/p/09_-2bebdf471aca808ba12fd122e1a34137?pvs=21)

# 1. はじめに

---

## 1-1. 前回の復習

**【良いマークアップの4箇条】**

- PREDICTABLE（予測しやすい））
- REUSABLE（再利用しやすい）
- MAINTAINABLE（保守しやすい）
- SCALABLE（拡張しやすい）

【**4箇条を達成するためのポイント**】

1. デザインおよびマークアップを「**モジュール**」単位で考えること。
2. マークアップの「**ルール**」を設定すること。

**【BEM】**

- Webサイトを、以下の3種類の独立したブロックに落とし込んでいく。
    1. Block（ブロック）
    2. Element（エレメント）
    3. Modifier（モディファイア）
- 基本的にはシングルクラス。クラス名は多くても2つまで。
- 子孫セレクタは多くても2つまで。
- ほぼ全ての要素にクラス名を付加する。

## **1-2. 課題の確認**

[Newslly](https://takagino.github.io/doc-markup-advanced/03-newslly-bem/completed/index.html)

[About | Newslly](https://takagino.github.io/doc-markup-advanced/03-newslly-bem/completed/about.html)

[doc-markup-advanced/03-newslly-bem/completed at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/03-newslly-bem/completed)

# 2. 今回学ぶこと

---

- CSSプリプロセッサとは？
- Sassとは？

**【サンプルデータ】**

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

- 04-Newslly-sass：授業で一緒にマークアップするデータ
- 05-SmartSpace-sass.zip：課題データ

**【見本】**

[Newslly](https://takagino.github.io/doc-markup-advanced/04-newslly-sass/completed/index.html)

[ABOUT | Newslly](https://takagino.github.io/doc-markup-advanced/04-newslly-sass/completed/about.html)

**【途中経過】**

[doc-markup-advanced/04-newslly-sass/starter at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/04-newslly-sass/starter)

# **3. CSSプリプロセッサとは？**

---

CSSをよりプログラミングに近い形で表現し、生のCSSよりも可読性や保守性を向上させた言語のこと。CSSにはない、ネスト(入れ子構造)や変数などといった概念があり、より簡潔に、分かりやすく記述することができる。

- **Sass(SCSS)**
- PostCSS
- Less
- Lightning CSS

[State of CSS 2025: Other Tools](https://2025.stateofcss.com/ja-JP/other-tools/#pre_post_processors)

## **3-1. Sassとは？**

Sassは「Syntactically Awesome StyleSheet」の略で、直訳すると「文法的に すごい スタイルシート」という意味。

そのままではブラウザが認識してくれないため、普通のCSSを書きだす（コンパイル）仕組みを作る必要がある。

**【代表的なコンパイル方法】**

- タスクランナー（gulp、gruntなど）
- GUIソフトウェア（[Prepros](https://prepros.io/)など）
- **エディタの拡張機能**

**【拡張機能「DartJS Sass Compiler and Sass Watcher」】**

1. VSCodeの左側メニュー「拡張機能」アイコンを選択。
2. 上部検索フォームに「sass」と入力。
3. 「DartJS Sass Compiler and Sass Watcher」を探してインストール。

![CleanShot 2025-09-26 at 12.57.35@2x.png](03_CSS%E3%83%97%E3%83%AA%E3%83%97%E3%83%AD%E3%82%BB%E3%83%83%E3%82%B5/CleanShot_2025-09-26_at_12.57.352x.png)

## **3-2. 拡張機能の設定**

1. VSCodeの左側メニュー「拡張機能」アイコンを選択。
2. 「DartJS Sass Compiler and Sass Watcher」の項目にある「歯車アイコン」をクリック。
3. メニュー「設定」を選択。

![CleanShot 2025-09-26 at 13.07.43@2x.png](03_CSS%E3%83%97%E3%83%AA%E3%83%97%E3%83%AD%E3%82%BB%E3%83%83%E3%82%B5/CleanShot_2025-09-26_at_13.07.432x.png)

| 機能 | 項目 | 値 |
| --- | --- | --- |
| ベンダープレフィックスを自動付与する | Disable Auto Prefixer | false（チェックしない） |
| ソースマップを有効にする | Disable Source Map | false（チェックしない） |
| CSSの出力形式を指定する | Output Format | cssonly |
| CSSの出力先フォルダを指定する | **Target Directory** | ./css/ |

## ☆ 確認

<aside>
💡

以前、授業の最初に「必ず大元の授業用フォルダを開いてください」とお伝えしましたが、Sassを使い始めるにあたり、このルールを変更します。

今後の授業では、その日に取り組む課題のフォルダ（例: 04-newslly-sass）を直接VSCodeで開くようにしてください。

</aside>

# **4. Sassでできること**

---

**【準備】**

1. フォルダ「04-Newslly-sass」をVSCodeで開く。
2. 新規フォルダ「sass」を作成。
3. 新規ファイル「style.scss」を作成。
4. 何か適当に入力して保存。
5. フォルダ「css」が生成され、複数のファイルが入っていれば成功。

**【今後のディレクトリ構成】**

![CleanShot 2025-09-26 at 14.10.21@2x.png](03_CSS%E3%83%97%E3%83%AA%E3%83%97%E3%83%AD%E3%82%BB%E3%83%83%E3%82%B5/CleanShot_2025-09-26_at_14.10.212x.png)

<aside>
💡

「@charset "utf-8";」を書いても消えてしまうので、今後は記入の必要なし。

</aside>

## 4-1. **変数（Variables）**

```sass
$color-text: #888;
$color-accent: #FA6980;

$font-family-base: Helvetica, Arial, sans-serif;

body {
  color: $color-text;
  font-family: $font-family-base;
}
```

```sass
/* コンパイル結果 */
body {
  color: #888;
  font-family: Helvetica, Arial, sans-serif;
}
```

※「$color-」のようにプレフィックスで揃えることで、VSCodeの自動補完（ヒント）が効きやすくなる。

## 4-2. **ネスト**

```sass
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

```sass
/* コンパイル結果 */
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

※階層が深くなりすぎないように気をつけること。

## 4-3. **親セレクタの参照**

```sass
.footer {
  padding: 100px 0 40px;

  &__copy {
    font-size: 12px;
  }
}

.btn{
	background-color: $color-text;
	
	&:hover{
		background-color: $color-accent;
	}
}
```

```sass
/* コンパイル結果 */
.footer {
  padding: 100px 0 40px;
}

.footer__copy {
  font-size: 12px;
}

.btn{
	background-color: #888;
}

.btn:hover{
	background-color: #FA6980;
}
```

## 4-4. **四則演算**

```sass
.header {
  /* 足し算 */
  width: 100px + 50px;
  /* 引き算 */
  font-size: 16px - 2px;
  /* 掛け算 */
  padding: 10px * 2;
}
```

```sass
/* コンパイル結果 */
.header {
  width: 150px;
  font-size: 14px;
  padding: 20px;
}
```

**【割り算には計算用モジュールが必要】**

割り算の「/」はCSSでも普通に使われるため特別な処理が必要となる。

```sass
/* 計算用モジュールの読み込み */
@use 'sass:math';

body {
	/* 割り算 */
	line-height: math.div(24, 14);
}
```

```sass
/* コンパイル結果 */
body{
	line-height: 1.7142857143;
}
```

**【letter-spacing の計算】**

```sass
@use 'sass:math';

body {
  letter-spacing: math.div(50, 1000) + em;
}

/* もしくは、#{} で計算結果を文字列に変換する*/
body {
  letter-spacing: #{math.div(50, 1000)}em;
}
```

```sass
/* コンパイル結果 */
body{
	letter-spacing: 0.05em;
}
```

**【横幅等のパーセンテージの計算】**

```sass
.footer {
	width: math.div(300, 800) * 100%;
}

/* もしくは、percentage() で囲む */
.footer {
	width: percentage(math.div(300, 800));
}
```

```sass
/* コンパイル結果 */
.footer {
  width: 37.5%;
}
```

## 4-5. **挿入（Mixin）**

```sass
@mixin inner() {
  max-width: 800px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
}

.header {
  &__inner {
    @include inner();
  }
}

.footer {
  &__inner {
    @include inner();
  }
}
```

```sass
/* コンパイル結果 */
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

**【引数の設定】**

```sass
@mixin inner($mw: 800px, $w: 88%) {
  max-width: $mw;
  width: $w;
  margin-left: auto;
  margin-right: auto;
}

.header {
  &__inner {
    @include inner();
  }
}

.footer {
  &__inner {
    @include inner(1200px, 100%);
  }
}

/* 両方とも初期値の場合 */
@include inner();

/* 1つ目の値のみ変更 */
@include inner(1200px);

/* 2つ目の値を変更したい場合は、両方書く必要がある */
/* 変わる可能性が高い値を最初にしておくとよい */
@include inner(800px, 100%);
```

```sass
/* コンパイル結果 */
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

## 4-6. その他

[Sass: Documentation](https://sass-lang.com/documentation/)

**【コメント】**

```sass
// コンパイル後に消えるコメント

/* コンパイル後も消えないコメント */
```

## 4-7. BEMとSassのまとめ

- ページは複数の「Block」の組み合わせで出来ている。
- それぞれの「Block」はその中でしか使えない「Element」と、別の「Block」で構成されている。
- 同じようなデザインが複数箇所にあった場合は、「Block」を使い回せないか考える。（モジュール）
- 「モジュール」は使い回す前提なので、widthやmargin（ボックスモデル）、positionなどレイアウトに関するプロパティは極力指定しない。
- 「モジュール」にレイアウトに関するプロパティを指定する場合は、「Element」をミックスさせて指定する。
- 複数の「Block」や「Element」に同じプロパティが何度も出てくる場合は、「@mixin」でまとめられないかを考える。
- BEMのルールに則っていれば、自分のわかりやすいようにアレンジして良い。ただし、就職後は会社の書き方に従うこと。

# 5. 課題

---

「BEM&Sass」のルールに則って「05_SmartSpace」をマークアップする。

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

**【見本】**

[SmartSpace](https://takagino.github.io/doc-markup-advanced/05-smartspace-sass/completed/index.html)

[SmartSpace](https://takagino.github.io/doc-markup-advanced/05-smartspace-sass/completed/about.html)

**【提出先】**

GitHubに同期する。