# 02_BEM

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

- GitHubの設定
- 同期の方法

## **1-2. 課題の確認**

[LEVEL.5](https://takagino.github.io/doc-markup-advanced/01-practice/completed/index.html)

[doc-markup-advanced/01-practice/completed at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/01-practice/completed)

# 2. 今回学ぶこと

---

- CSSアーキテクチャとは？
- マークアップのルール「BEM」

**【サンプルデータ】**

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

- 02-Roysha-bem：授業で一緒にマークアップするデータ
- 03-Newslly-bem：課題のデータ

**【見本】**

[Roysha](https://takagino.github.io/doc-markup-advanced/02-roysha-bem/completed/index.html)

[Service - Roysha](https://takagino.github.io/doc-markup-advanced/02-roysha-bem/completed/service.html)

[Help - Roysha](https://takagino.github.io/doc-markup-advanced/02-roysha-bem/completed/help.html)

**【途中経過】**

[doc-markup-advanced/02-roysha-bem/starter at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/02-roysha-bem/starter)

# 3. **CSSアーキテクチャとは？**

---

以下の**4つの条件**を満たすために、マークアップの前段階で（特にCSSに関する）設計をし計画を立てること。

**【原文】**

[CSS Architecture](https://philipwalton.com/articles/css-architecture/)

## **3-1. 良いマークアップの4箇条**

**PREDICTABLE（予測しやすい）**

HTMLの要素やクラス名、CSSのセレクタやプロパティが、「どの箇所に」「どの範囲で」「何のために」設定されているのかが、「誰が」「いつ」見ても容易に理解できるか？

**REUSABLE（再利用しやすい）**

同じデザイン、もしくは似たようなデザインの箇所があった際、既存のCSSの設定や構造をそのまま使い回すことができるか？

**MAINTAINABLE（保守しやすい）**

デザインやサイトの内容に修正・追加・削除があった際、既存のCSSの設定や構造を見直す必要がないか？

**SCALABLE（拡張しやすい）**

サイト・サービス自体が拡大して複雑になったり、チームに新しいメンバーが増えた際にも、学習コストを抑え柔軟に対応できるか？

【**4箇条を達成するためのポイント**】

1. デザインおよびマークアップを「**モジュール**」単位で考えること。
2. マークアップの「**ルール**」を設定すること。

## **3-2. モジュール単位で考える**

**【モジュールとは】**

サイト内で使い回す（**再利用しやすい**）ことを想定したひとかたまりのパーツで「コンポーネント」とも呼ばれる。

CSS設計において「パーツ」「コンポーネント」「モジュール」はいずれも同じ物を指して語られることが多いが、この授業では「モジュール」に統一する。

**【モジュールとなりうる箇所その1】**

![06.png](02_BEM/06.png)

![07.png](02_BEM/07.png)

![08.png](02_BEM/08.png)

**【モジュールとなりうる箇所その2】**

![01.png](02_BEM/01.png)

![02.png](02_BEM/02.png)

**【モジュールとなりうる箇所その3】**

![03.png](02_BEM/03.png)

![04.png](02_BEM/04.png)

![05.png](02_BEM/05.png)

## **3-3. ルールを設定する**

ほとんどのweb制作会社は、独自のルールに基いてマークアップをしている。

[Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)

[制作ガイドライン](https://burnworks.com/docs/guidelines/)

**【決めるべきルール】**

- ディレクトリ構成
- 画像ファイルの命名規則
- **ID・Classの命名規則**
- コメントの付け方　などなど

## **3-4. 代表的な汎用ルール**

世界中のフロントエンドエンジニアが考えたルールが多く公開されているが、大きく2つの手法にわけられる。

**【マルチクラス】**

1つの要素に対して複数のクラスを指定する方法。装飾や機能ごとにクラスを分け、それを組み合わせて見た目を作成していく。

[Ja - Scalable and Modular Architecture for CSS](https://smacss.com/ja/)

**【シングルクラス】**

1つの要素に対して2つ程度までのクラスを指定する方法。使用する目的に合わせて、その都度クラスを作成する。（本授業では、こちらのルールを採用する）

[BEM](https://en.bem.info/)

[https://github.com/hiloki/flocss](https://github.com/hiloki/flocss)

# **4. BEM**

---

BEM（ベム）は「Block、Element、Modifier」の略で、Webサイトを独立したブロックに落とし込んでいくことで、複雑なページであっても開発を簡単かつ、素早く行うことを目的としている。他のルールに比べ、厳格であり強力。

1. Block（ブロック）
2. Element（エレメント）
3. Modifier（モディファイア）

**【特徴】**

- 基本的には**シングルクラス**。クラス名は多くても2つまで。
- 子孫セレクタは多くても2つまで。
- ほぼ全ての要素にクラス名を付加する。
- id名は使用しない。
- 同じCSSプロパティが何度も出てくるため不効率に感じるが、次回勉強する「**Sass**」を使用することで解決できる。

## **4-1. Block（ブロック）**

ヘッダー、フッダー、ナビゲーション、サイドバーなどの構成要素や、どこでも使いまわせるモジュールなど。

Webページ内のすべての要素は「Block」であり、「Block」の組み合わせでWebページは構成されているという考え方。

![09.png](02_BEM/09.png)

**【命名規則】**

```css
/* 単語が一つの場合 */
.header{
}

.unit{
}

/* 単語が複数の場合は「ハイフン」でつなげ、なるべく2語に収める */
.global-nav{
}
```

## **4-2. Element（エレメント）**

Blockを構成する要素。Blockの外では独立して使用できないもの。

![10.png](02_BEM/10.png)

**【命名規則】**

Elementのクラス名は、Blcokの名前を継承し、アンダースコアふたつを記述した後にElementの名前をつなげる。

```html
<!-- 「unit」ブロックの例 -->
<div class="unit">
  <p class="unit__catch">OUR FEATURES</p>
  <h2 class="unit__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  <p class="unit__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
  <a class="btn" href="#">Learn More</a>
</div>
```

**【注意事項】**

複数のElementをつなげてはいけない。

```html
<!-- × NG -->
<div class="unit">
  <p class="unit__catch">OUR FEATURES</p>
  <div class="unit__content">
    <h2 class="unit__content__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  </div>
</div>

<!-- ◯ OK -->
<div class="unit">
  <p class="unit__catch">OUR FEATURES</p>
  <div class="unit__content">
    <h2 class="unit__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  </div>
</div>

<!--
理由
・「unit__content__title」は「unit__content」の外部でも使用する可能性があるため。
・単純にクラス名が長くなってしまうため。
-->
```

## **4-3. Modifier（モディファイア）**

Block、もしくはElementの見た目や状態、振る舞いを定義するもの。

![11.png](02_BEM/11.png)

![12.png](02_BEM/12.png)

**【命名規則】**

Modifierのクラス名は、Blcok、もしくはElementの名前を継承し、ハイフンふたつを記述した後にModifierの名前をつなげる。

```html
<div class="card card--shadow">
  <img class="card__icon" src="images/ico_home01.png" alt="">
  <dl class="card__content">
    <dt class="card__title">Fully Secure Payment</dt>
    <dd class="card__text">Lorem ipsum qitame coctetr asipm scing elised eiusmtempor incidid untdolore consistal.</dd>
  </dl>
</div>
```

**【注意事項】**

![13.png](02_BEM/13.png)

例えば上記のように、BlockとElementの両方にModifierをつけなければいけない場合は、「子孫セレクタ」で対応してもよい。

```html
<div class="card card--flex">
  <img class="card__icon" src="images/ico_card05.png" alt="">
  <div class="card__content">
    <h3 class="card__title">Fully Secure Payment</h3>
    <p class="card__text">Lorem ipsum qitame coctetr asipm scing elised eiusmtempor incidid untdolore consistal.</p>
  </div>
</div>
```

```css
.card--flex{
  display: flex;
}

.card--flex .card__icon{
  width: 50px;
  margin-right: 25px;
}

.card--flex .card__content{
  flex: 1;
}
```

## **4-4. Mix（ミックス）**

上記の「Block、Element、Modifier」の3つを使用し、基本的にはシングルクラスでマークアップしていくが、それだけでは無理が生じてくる。その場合、**BlockとElementのルールにしたがっていれば、複数のクラスを付加しても良い*。***

![14.png](02_BEM/14.png)

```html
<section class="features">

	<div class="features__info unit">
	  <p class="unit__catch">OUR FEATURES</p>
	  <h2 class="unit__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
	  <p class="unit__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
	  <a class="btn" href="#">Learn More</a>
	</div>

	<div class="features__list">
	  <div class="features__item card">
	    ・
	    ・
	    ・
	  </div>
	</div>

</section>
```

**【注意事項】**

Block内に、他のBlockのElementを入れてはいけない。

```html
<!-- × NG -->
<section class="features">

	<div class="unit">
	  <div class="features__info">
	    <p class="unit__catch">OUR FEATURES</p>
	    <h2 class="unit__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
	    <p class="unit__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
	    <a class="btn" href="#">Learn More</a>
	  </div>
	</div>

</section>

<!-- ◯ OK（ただし混在しすぎないように） -->
<section class="features">

	<div class="features__content unit">
	  <div class="features__info">
	    <p class="unit__catch">OUR FEATURES</p>
	    <h2 class="unit__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
	    <p class="unit__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
	    <a class="btn" href="#">Learn More</a>
	  </div>
	</div>

</section>
```

## 4-5. その他雑感

- 使い回す前提のモジュールには、レイアウトに関わるプロパティ（width、margin、padding、border、display、postiiton、など）は指定せず、Mixでレイアウトしていく。
- 別の場所に使い回しても要素が変わらない場合（p要素、a要素、など）は、クラス名をつけずに子孫セレクタで制御してもよい。
- クラスは「内容」「機能」「意味合い」等を考慮して、わかりやすい名前にする。

※最低限のルールに則っていれば、自分なりのアレンジはOK。

# **5. 実践**

---

実際の現場では「**BEM**」***の***ルールを独自にアレンジして使用している企業が多い。

まずは、ガチガチのBEMルールに則って、説明・実装をします。

## **☆ 練習**

「BEM」のルールに則って、helpページをマークアップする。

# **6. 課題**

---

「BEM」のルールに則って「03_Newslly-bem」をマークアップする。

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

**【見本】**

[Newslly](https://takagino.github.io/doc-markup-advanced/03-newslly-bem/completed/index.html)

[About | Newslly](https://takagino.github.io/doc-markup-advanced/03-newslly-bem/completed/about.html)

**【提出先】**

GitHubに同期する。