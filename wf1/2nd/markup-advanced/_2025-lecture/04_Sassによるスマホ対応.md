# 04_Sassによるスマホ対応

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

```sass
// 計算用モジュールの読み込み
@use 'sass:math';

// 変数
$color-text: #31353b;
$color-main: #ff9900;
$color-accent: #f85a47;
$color-heading: #000;
$color-bg: #dbffff;

$font-family-base: Helvetica, Arial, sans-serif;

// 引数と初期値を持った Mixin
@mixin inner($mw: 1000px, $w: 88%) {
  max-width: $mw;
  width: $w;
  margin-left: auto;
  margin-right: auto;
}

/* 実装 -------------------- */

body {
  color: $color-text;
  font-size: 15px;
  font-family: $font-family-base;
  line-height: math.div(26, 15);
  letter-spacing: #{math.div(20, 1000)}em;
}

/* spaces */
.spaces {
  padding-bottom: 120px;

  &__inner {
    @include inner();
    display: grid;
    grid-template-columns: 440fr 500fr;
    column-gap: percentage(math.div(60, 1000));
    align-items: center;
  }
}
```

## **1-2. 課題の確認**

[SmartSpace](https://takagino.github.io/doc-markup-advanced/05-smartspace-sass/completed/index.html)

[doc-markup-advanced/05-smartspace-sass/completed at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/05-smartspace-sass/completed)

**【覚えてほしいテクニック】**

```sass
/* CSSGrid で横に並べた要素を右側に寄せる */

/* gnav */
.gnav {
  &__list {
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    column-gap: 30px;
  }

  &__item {
    font-weight: bold;

    &--active {
      a {
        color: $color-main;
      }
    }
  }

  a {
    transition: color 0.2s;

    &:hover {
      color: $color-main;
    }
  }
}
```

```sass
/* 要素を下に揃える */

/* card */
.card {
  padding: 45px 40px;
  border: 1px solid #a3a3a3;
  border-radius: 20px;
  display: grid;
}

/* customer */
.customer {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-self: end;
  column-gap: percentage(math.div(20, 390));
}
```

```sass
/* 要素の順番を入れ替える */

/* office */
.office {
  padding-bottom: 120px;

  &__inner {
    @include inner();
    display: grid;
    grid-template-columns: 500fr 440fr;
    column-gap: percentage(math.div(60, 1000));
    align-items: center;
  }

  &__info {
    order: 2;
  }

  &__pic {
    order: 1;
  }
}
```

# 2. 今回学ぶこと

---

- スマホ対応の復習
- Sassによるスマホ対応
- その他テクニック

**【サンプルデータ】**

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

- 06-renome-sass.zip：授業で一緒にマークアップするデータ
- 07-cubehaus-sass.zip：課題データ

**【見本】**

[Renome](https://takagino.github.io/doc-markup-advanced/06-renome-sass/completed/index.html)

**【途中経過】**

[doc-markup-advanced/06-renome-sass/starter at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/06-renome-sass/starter)

# **3. スマホ対応（前期）の復習**

---

**【5つのポイント】**

1. Fluid Layout（フルードレイアウト）
2. Fluid Image（フルードイメージ）
3. Media query（メディアクエリ）
4. Breakpoint（ブレイクポイント）
5. Viewport（ビューポート）

## 3-1. **Fluid Layout（フルードレイアウト）**

width, margin, padding を相対単位の % や em、fr などで指定する。

```sass
/* **固定（px）から可変（%）へ変換 */**

column-gap: percentage(math.div(60, 1000));
```

## 3-2. **Fluid Image（フルードイメージ）**

画像も可変にする。

```sass
img {
  max-midth: 100%;
  height: auto;
  vertical-align: middle;
}
```

## 3-3. Media query（メディアクエリ）

画面サイズや解像度などの閲覧環境に応じて適用するスタイルを切り替える。

```sass
/* モバイルファースト（モバイル版を先にマークアップする）
-----------------------------------*/
body{ background-color: #fff; }

/* ウィンドウサイズが600pxより大きい時 */
@media (600px < width) {
  body{ background-color: #f00; }
}

/* ウィンドウサイズが960pxより大きい時 */
@media (960px < width) {
  body{ background-color: #00f; }
}
```

## **3-4. Breakpoint（ブレイクポイント）**

「960px」や「600px」など、メディアクエリでそれぞれ指定している画面幅のこと。

[2025年最新スマホ画面サイズ一覧_iPhone/Android(アンドロイド)のインチ/解像度/大きさ/比較| デジマースブログ](https://blog.digimerce.jp/2018/01/25/4028/)

※自分で決める場合は、「ブレイクポイント 2025」などで検索。

## **3-5. Viewport（ビューポート）**

ブラウザに認識して欲しい表示領域の大きさを指定する。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

# **4. Sassによるスマホ対応**

---

**【今までの書き方】**

```sass
.btn {
	margin-left: auto;
}

/* CSSファイルの下部にまとめて記述 +/
@media (640px <= width) {
	.btn{
		width: 100%;
	}
}
```

**【Sassによる書き方】**

```sass
/* 変数でブレイクポイントを設定 */
$breakpoints: (
  "desktop": 640px,
);

/* Mixin の設定 */
@mixin mq($breakpoint) {
  @media (#{map-get($breakpoints, $breakpoint)} <= width) {
    @content;
  }
}

/* @include で都度呼び出す */
.btn {
	margin-left: auto;

	@include mq(desktop) {
	  width: 100%;
	}
}
```

# **5. スマホ対応のテクニック**

---

## **5-1. 改行の制御**

**【メディアクエリと`<br>`要素】**

```html
<p>
	都会の喧騒を忘れさせる落ち着いた空間で、<br class="br-sp">
  ゆったりと流れる時間をお過ごしください。<br>
  私たちが大切にしているのは、<br class="br-sp">
  目の前の大切な人との会話と食事に心から集中できる、<br class="br-sp">
  温かな「場」をご提供することです。
</p>
```

```sass
@media (640px <= width) {
  .br-sp {
    display: none;
  }
}
```

**【`display: inline-block`と`<span>`要素】**

```html
<div class="concept__text">
	<p>
		<span>都会の喧騒を忘れさせる落ち着いた空間で、</span>
		<span>ゆったりと流れる時間をお過ごしください。</span>
		<span>私たちが大切にしているのは、</span>
		<span>目の前の大切な人との会話と食事に心から集中できる、</span>
		<span>温かな「場」をご提供することです。</span>
	</p>
</div>
```

```sass
.concept__text{
	span {
	  display: inline-block;
  }
}
```

**【`word-break: keep-all;`と`<wbr>`要素】**

```html
<div class="concept__text">
	<p>
		美味しい料理は、<wbr>
    何気ない一日を特別な記念日に変える力があります。<wbr>
    皆様の記憶に残る素敵な一ページの舞台となれることを、<wbr>
    心より願っております。<wbr>
	</p>
</div>
```

```sass
.concept__text{
	p {
	  word-break: keep-all;
  }
}
```

## **5-2. テーブル要素の制御**

```html
<div class="open__table">
	<table>
		<thead>
			<tr>
				<th>曜日</th>
				<th>LUNCH</th>
				<th>DINNER</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>月曜日</th>
				<td>11:30 - 15:00 (L.O. 14:30)</td>
				<td>18:00 - 22:00 (L.O. 21:00)</td>
			</tr>
			<tr>
				<th>火曜日</th>
				<td>11:30 - 15:00 (L.O. 14:30)</td>
				<td>18:00 - 22:00 (L.O. 21:00)</td>
			</tr>
			<tr>
				<th>水曜日</th>
				<td>定休日</td>
				<td>定休日</td>
			</tr>
			<tr>
				<th>木曜日</th>
				<td>11:30 - 15:00 (L.O. 14:30)</td>
				<td>18:00 - 22:00 (L.O. 21:00)</td>
			</tr>
			<tr>
				<th>金曜日</th>
				<td>11:30 - 15:00 (L.O. 14:30)</td>
				<td>18:00 - 24:00 (L.O. 23:00)</td>
			</tr>
			<tr>
				<th>土曜日</th>
				<td>11:00 - 16:00 (L.O. 15:30)</td>
				<td>17:30 - 24:00 (L.O. 23:00)</td>
			</tr>
			<tr>
				<th>日曜日</th>
				<td>定休日</td>
				<td>定休日</td>
			</tr>
		</tbody>
	</table>
</div>
```

```sass
&__table {
	overflow-x: auto;

  table {
    width: 100%;
    min-width: 700px;
  }
}
```

## **5-3. 画像を差し替える**

```html
<picture>
	<source media="(width >= 640px)" srcset="./images/bnr_recruit_lg.png">
  <source media="(width < 640px)" srcset="./images/bnr_recruit_sm.png">
  <img src="./images/bnr_recruit_lg.png" alt="スタッフ募集">
</picture>
```

[<picture>: 画像要素 - HTML | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/picture)

# 6. 課題

---

「BEM&Sass」のルールに則って「cubehaus.xd」をマークアップする。

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

**【見本】**

[CUBE HAUS](https://takagino.github.io/doc-markup-advanced/07-cubehaus-sass/completed/index.html)

- font-familyは「Renome」と同様。
    
    ```css
    font-family: "游ゴシック", "Yu Gothic", Helvetica, Arial, sans-serif;
    ```
    
- ブラウザのサイズ640pxで、メインビジュアルの画像を入れ替えること。
- 経営理念の文章を、ブラウザサイズに合わせて適切な箇所で改行すること。
- 適切にモジュールを設定すること。（例：post、card、customer）

**【途中経過】**

[doc-markup-advanced/07-cubehaus-sass/starter at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/07-cubehaus-sass/starter)

**【提出先】**

GitHubに同期する。