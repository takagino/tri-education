# 02_CSS設計とBEM

### HTML+CSS

[01_環境設定と確認課題](01_環境設定と確認課題.md) | **02_CSS設計とBEM** | 03_CSSプリプロセッサ

---

# 1. はじめに

## 1-1. 前回の復習と「前期のマークアップ」の壁

前回の確認課題（`01-practice` / Roysha.xd）や前期の授業では、命名規則などのルールを特に決めずに自由にマークアップを行いました。
その際、以下のような悩みに直面しませんでしたか？

- **「クラス名が思いつかない…」**（`wrap`, `box1`, `inner2`, `red-text` など適当につけてしまう）
- **「CSSが思った通りに効かない…」**（後から書いたスタイルに負けてしまい、セレクタを長くしたり `!important` を連発してしまう）
- **「デザインの修正が怖い…」**（1箇所のCSSを変更したら、関係ない別の場所のデザインまで崩れてしまった）

個人で制作する小さなページであれば力技で乗り切れますが、複数人のチーム開発や中規模・大規模なWebサイトでは、コードがたちまち破綻してしまいます。

これを解決するのが、今回学ぶ**「CSSアーキテクチャ（CSS設計）」**と、Web制作現場の標準ルールである**「BEM」**です。

## 1-2. 今回のゴールと学習の流れ

1. **【理解】** なぜCSS設計が必要なのか（良いマークアップの4箇条）を理解する。
2. **【習得】** BEM（Block, Element, Modifier, Mix）のルールと命名規則をマスターする。
3. **【実践】** `02-roysha-bem` のトップページを題材に、モジュール分割とマークアップを一緒に行う。
4. **【演習】** 下層ページ（Helpページ）を自力でBEM設計・実装してみる。
5. **【課題】** `03-newslly-bem` のマークアップ課題に着手し、破綻しないCSSを自力で構築する。

---

# 2. 今回学ぶこと

- CSSアーキテクチャとは？
- マークアップのルール「BEM」

**【サンプルデータ】**

- **02-roysha-bem**：授業で一緒にマークアップするデータ
- **03-newslly-bem**：課題のデータ

**【Roysha 見本（Webプレビュー）】**

- [Top ページ](https://takagino.github.io/doc-markup-advanced/02-roysha-bem/completed/index.html)
- [Service ページ](https://takagino.github.io/doc-markup-advanced/02-roysha-bem/completed/service.html)
- [Help ページ](https://takagino.github.io/doc-markup-advanced/02-roysha-bem/completed/help.html)
- [完成コード（GitHub）](https://github.com/takagino/doc-markup-advanced/tree/main/02-roysha-bem/completed)

---

# 3. CSSアーキテクチャとは？

以下の**4つの条件**を満たすために、マークアップの前段階で（特にCSSに関する）設計をし、計画を立てること。

> 参考：[CSS Architecture (Philip Walton)](https://philipwalton.com/articles/css-architecture/)

## 3-1. 良いマークアップの4箇条

**PREDICTABLE（予測しやすい）**
HTMLの要素やクラス名、CSSのセレクタやプロパティが、「どの箇所に」「どの範囲で」「何のために」設定されているのかが、「誰が」「いつ」見ても容易に理解できるか？

**REUSABLE（再利用しやすい）**
同じデザイン、もしくは似たようなデザインの箇所があった際、既存のCSSの設定や構造をそのまま使い回すことができるか？

**MAINTAINABLE（保守しやすい）**
デザインやサイトの内容に修正・追加・削除があった際、既存のCSSの設定や構造を見直す必要がないか？（1箇所を直して他の場所が崩れないか？）

**SCALABLE（拡張しやすい）**
サイト・サービス自体が拡大して複雑になったり、チームに新しいメンバーが増えた際にも、学習コストを抑え柔軟に対応できるか？

【**4箇条を達成するためのポイント**】
1. デザインおよびマークアップを「**モジュール**」単位で考えること。
2. マークアップの「**ルール**」を設定すること。

---

## 3-2. モジュール単位で考える

**【モジュールとは】**
サイト内で使い回す（**再利用しやすい**）ことを想定したひとかたまりのパーツで、「コンポーネント」とも呼ばれる。
CSS設計において「パーツ」「コンポーネント」「モジュール」はいずれも同じ物を指して語られることが多いが、この授業では「モジュール」に統一する。

デザインカンプ（XD）を見たとき、まず「どのパーツが共通で使い回せるか？」を観察・分類する習慣をつけよう。

**【モジュールとなりうる箇所の例】**
- **ボタン（btn）**: 背景色やサイズ違いがあっても、ベースとなるボタン構造は共通。
- **カード（card）**: アイコン（画像）＋タイトル＋説明文がセットになった情報単位。
- **イントロ（intro）**: キャッチコピー＋大見出し＋説明文（＋ボタン）がセットになったセクション導入部分。

---

## 3-3. ルールを設定する

ほとんどのWeb制作会社は、独自のルール（コーディングガイドライン）に基づいてマークアップをしている。

- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- [制作ガイドライン（Burnworks）](https://burnworks.com/docs/guidelines/)

**【決めるべきルール】**
- ディレクトリ構成
- 画像ファイルの命名規則
- **ID・Classの命名規則**
- コメントの付け方 など

---

## 3-4. 代表的な命名ルールのアプローチ

世界中で様々なCSS設計手法が考案されてきたが、大きく2つのアプローチに分かれる。

| 手法 | 特徴 | メリット・デメリット | 代表例 |
| --- | --- | --- | --- |
| **ユーティリティ型** | 見た目や機能ごとに細かく分かれたクラスを1つの要素に何個も指定する（例: `flex p-4 text-center text-red`） | CSSをほぼ書かずに済むが、HTMLのクラス名が長大化し意味が読み取りにくい | Tailwind CSS |
| **コンポーネント型** | 役割を持ったひとかたまりのモジュールとしてクラスを設計する（例: `card card--featured`） | クラス名からUIの意味が分かり、破綻しにくい構造を作れる（本授業で採用） | **BEM**, FLOCSS |

本授業では、Web制作現場で最も広く使われているコンポーネント型の標準ルール**「BEM」**を採用する。

---

# 4. BEM

BEM（ベム）は「Block、Element、Modifier」の略で、Webサイトを独立したブロックに落とし込んでいくことで、複雑なページであっても開発を簡単かつ素早く行うことを目的としている。他のルールに比べ、厳格であり強力。

1. **Block（ブロック）**
2. **Element（エレメント）**
3. **Modifier（モディファイア）**

**【特徴】**
- **コンポーネント指向**: 要素の意味と役割に応じてクラスを整理し、**クラス名は多くても2つ程度まで**に抑える。
- **詳細度をフラットに保つ**: 子孫セレクタは原則使わず、クラス単体で指定する（意図しないスタイルの上書きを防ぐ）。
- **ほぼ全ての要素にクラス名を付加する**。
- **id名はスタイル指定に使用しない**（JavaScriptのフックやアンカーリンク用にとどめる）。
- クラス名が長くなりやすくCSSの記述量が増えるため非効率に感じるが、次回学ぶ「**Sass**」を使用することで劇的に解決できる。

---

## 4-1. Block（ブロック）

ヘッダー、フッター、ナビゲーション、サイドバーなどの構成要素や、どこでも使い回せるモジュール（ボタン、カード、セクション導入など）。

Webページ内のすべての要素は「Block」であり、「Block」の組み合わせでWebページは構成されているという考え方。

**【命名規則】**

```css
/* 単語が一つの場合 */
.header {
}

.intro {
}

.card {
}

/* 単語が複数の場合は「ハイフン」でつなげ（ケバブケース）、なるべく2語に収める */
.global-nav {
}

.main-visual {
}
```

---

## 4-2. Element（エレメント）

Blockを構成する要素。Blockの外では独立して使用できないもの。

**【命名規則】**

Elementのクラス名は、Blockの名前を継承し、**アンダースコアふたつ（`__`）**を記述した後にElementの名前をつなげる。

```html
<!-- 「intro」ブロックの例 -->
<div class="intro">
  <p class="intro__catch">OUR FEATURES</p>
  <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  <p class="intro__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
  <a class="btn" href="#">Learn More</a> <!-- ※btnは独立した別Block -->
</div>
```

**【⚠️ 注意事項：Elementをつなげて（ネストして）はいけない】**

HTML構造が何段階入れ子になっていても、**BEMのクラス名でアンダースコアをつなげてはいけない。**

```html
<!-- ❌ NG：エレメントの孫つなぎ -->
<div class="intro">
  <p class="intro__catch">OUR FEATURES</p>
  <div class="intro__content">
    <h2 class="intro__content__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  </div>
</div>

<!-- ⭕ OK：HTMLが入れ子でも、すべてintroのElementとして命名する -->
<div class="intro">
  <p class="intro__catch">OUR FEATURES</p>
  <div class="intro__content">
    <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  </div>
</div>
```

> **理由**
> 1. HTMLの構造が変わるたびにCSSクラス名まで書き直す羽目になり、保守性が低下するため。
> 2. `intro__content__title` のようにクラス名が無駄に長くなってしまうため。

---

## 4-3. Modifier（モディファイア）

Block、もしくはElementの見た目や状態、振る舞いのバリエーションを定義するもの。

**【命名規則】**

Modifierのクラス名は、Block、もしくはElementの名前を継承し、**ハイフンふたつ（`--`）**を記述した後にModifierの名前をつなげる。
基本となるクラス名と併記して指定する。

```html
<!-- 基本のカードに影付きModifierを追加 -->
<div class="card card--shadow">
  <img class="card__icon" src="images/ico_home01.png" alt="">
  <dl class="card__content">
    <dt class="card__title">Fully Secure Payment</dt>
    <dd class="card__text">Lorem ipsum dolor sit amet...</dd>
  </dl>
</div>

<!-- ボタンの色バリエーション（基本クラス + Modifier） -->
<a class="btn btn--info" href="#">Add Bank</a>
<a class="btn btn--warning" href="#">Ask a Question</a>
<a class="btn btn--outline" href="#">View More Offers</a>
```

```css
/* 基本スタイル */
.btn {
  display: block;
  width: 200px;
  padding: 20px 0;
  background-color: #256BE6;
  color: #fff;
  font-weight: bold;
  text-align: center;
  border-radius: 27.5px;
}

/* 変化させたい差分プロパティのみを記述 */
.btn--info {
  background-color: #2DBE61;
}

.btn--warning {
  background-color: #F87624;
}

.btn--outline {
  border: 1px solid #256BE6;
  background-color: transparent;
  color: #256BE6;
}
```

---

## 4-4. Mix（ミックス）

上記の「Block、Element、Modifier」の3つを使用していく中で、最も強力かつ実践的なテクニックが**「Mix（ミックス）」**である。
1つのHTML要素に対して、**「全体のレイアウト・配置を決めるクラス（Element）」**と**「パーツ自身の見た目を決めるクラス（Block）」**を両方同時に付加する。

```html
<section class="features">
  <div class="features__inner">

    <!-- featuresセクション内の配置用Element「features__info」と、共通パーツBlock「intro」をMix -->
    <div class="features__info intro">
      <p class="intro__catch">OUR FEATURES</p>
      <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
      <p class="intro__text">Lorem ipsum dolor sit amet...</p>
      <a class="btn" href="#">Learn More</a>
    </div>

    <!-- featuresセクション内の配置用Element「features__item」と、共通パーツBlock「card」をMix -->
    <div class="features__list">
      <div class="features__item card">
        <img class="card__icon" src="images/ico_card01.png" alt="">
        <dl class="card__content">
          <dt class="card__title">24/7 Services</dt>
          <dd class="card__text">Lorem ipsum dolor sit amet...</dd>
        </dl>
      </div>
      <div class="features__item card">
        <img class="card__icon" src="images/ico_card02.png" alt="">
        <dl class="card__content">
          <dt class="card__title">24/7 Services</dt>
          <dd class="card__text">Lorem ipsum dolor sit amet...</dd>
        </dl>
      </div>
    </div>

  </div>
</section>
```

### 🌟 なぜMixを使うのか？（外側余白marginの責任分離）

`intro` や `card` のようなモジュール自体に `margin`（外側の余白）や固定の `width` を指定してしまうと、別の場所で使い回した時に余白が合わずレイアウトが崩れてしまう。

- **モジュール自身（`.card`, `.intro`）**: 内部の余白（`padding`）、文字色、背景色など**自分の内側の見た目だけ**を持つ。
- **配置用エレメント（`.features__item`, `.features__info`）**: グリッドの幅、外側の余白（`margin`）など**レイアウトの位置関係**を持つ。

このように役割を分離することで、モジュールをどこへ持っていっても100%崩れない完璧な再利用性を実現できる。

---

## 4-5. 【コラム】クラスの個数と子孫セレクタの使い分け（実務の2つの流派）

ここで1つの疑問が生じます。
「もし暗い背景のセクションで、`intro` の文字色を白くしたい場合、どうすべきか？」

実務では、大きく分けて**2つのアプローチ（流派）**が存在します。

| アプローチ | HTMLの記述 | CSSの記述 | 特徴と現場での評価 |
| --- | --- | --- | --- |
| **A. コンポーネント自立型<br>（厳格なBEM）** | `<div class="offer__info intro intro--invert">` | `.intro--invert .intro__title { color: #fff; }` | モジュール自身が色違いのModifierを持つ。<br>どこでも使い回せるが、**HTMLにクラス名が3つ並んでしまう**。 |
| **B. 文脈（コンテキスト）型<br>（本授業で採用）** | `<div class="offer__info intro">` | `.offer__info .intro__title { color: #fff; }` | 親セクションの配置クラスを使って子孫セレクタで白くする。<br>**HTMLのクラスは2つ以内に美しく収まる**。 |

### 💡 ルールの中で柔軟に対応するバランス感覚
「BEMだから絶対に子孫セレクタを使ってはならない」「クラス名は常に1つでなければならない」とルールに縛られすぎると、かえってHTMLが長大化したりコードが書きづらくなります。

本授業では、**「HTMLのクラス名は多くても2つまでに抑える」**という基本方針を大切にするため、暗い背景などの限定的なバリエーションについては、**親の配置用Elementを使った子孫セレクタ（`.offer__info .intro__title`）で柔軟に対応するアプローチ（B）**を採用しています。

プロの現場でも、ルールの基本理念を理解した上で、プロジェクトの規模や読みやすさに応じて柔軟にバランスを取ることが極めて重要です。

---

# 5. 実務で破綻させないための鉄則 & アンチパターン

### 鉄則1：モジュール自身に外側余白（`margin`）をつけない
前述の通り、使い回すモジュールには外側の余白を持たせず、親の配置用Element（Mixしたクラス）側で余白を制御する。

### 鉄則2：見た目や色をそのままクラス名にしない
```html
<!-- ❌ NG：将来「赤色」から「黄色」に変わった時にクラス名と見た目が矛盾する -->
<a class="btn btn--red" href="#">注意</a>
<p class="intro__text-left">左寄せテキスト</p>

<!-- ⭕ OK：役割や意味で命名する -->
<a class="btn btn--danger" href="#">注意</a>
<p class="intro__lead">リード文テキスト</p>
```

### 鉄則3：クラス名は「場所」ではなく「役割」で命名する
「トップページの真ん中にあるから `top-center-box`」のような命名はNG。「お知らせ一覧だから `news-list`」「特徴カードだから `feature-card`」のように、パーツの持つ役割を考えよう。

---

# 6. 【付録】迷った時の頻出クラス名チートシート

クラス名に迷ったときは、「**今名付けようとしているのはBlock（独立パーツ / セクション）なのか、Element（中身の要素）なのか**」を意識して、以下の定番単語から選びましょう。

---

## 6-1. Block（ブロック）の命名

Blockには大きく分けて**「① サイト全体で使い回す汎用パーツ」**と**「② ページ内のセクションを囲む固有の枠組み」**の2種類があります。

### ① 汎用Block：UIの「用途・形状」で命名する
どこに配置されても使い回せるよう、**特定のコンテンツ内容に依存しない名前**をつけます。

| クラス名 | 用途・意味 | 具体的な使われ方 |
| --- | --- | --- |
| **`btn`** | ボタン | リンクボタン、送信ボタン |
| **`card`** | カード型UI | アイコンや画像＋タイトル＋テキストの塊 |
| **`intro`** | 導入・見出し群 | セクション冒頭の「キャッチ＋見出し＋リード文」 |
| **`badge`** / **`label`** | ラベル・バッジ | 「NEW」「おすすめ」「カテゴリ名」などの小さな目印 |
| **`media`** | メディアオブジェクト | 左に画像、右にテキストが並ぶ定番レイアウト |
| **`modal`** | モーダル | ポップアップウィンドウ |
| **`tab`** | タブ | タブ切り替えUI |
| **`accordion`** | アコーディオン | 開閉式のリストUI（FAQなどで使用） |
| **`search-box`** | 検索窓 | 検索フォームの入力枠＋ボタン |

### ② セクション固有Block：セクションの「コンテンツ内容」で命名する
`<section>` などの親ブロックは、その場所に**何が書かれているか（役割・コンテンツ内容）**で命名します。

| クラス名 | コンテンツ内容 | 典型的なセクション |
| --- | --- | --- |
| **`hero`** / **`main-visual`** | メイン看板 | ファーストビューの巨大ビジュアル |
| **`features`** | 特徴・強み | サービスや商品の強み・選ばれる理由 |
| **`services`** | サービス一覧 | 提供している事業・サービス内容 |
| **`about`** | 概要・紹介 | 会社概要、サイトについて、自己紹介 |
| **`news`** / **`topics`** | お知らせ | 最新情報、ブログ記事一覧 |
| **`price`** / **`plan`** | 料金 | 料金体系、プラン一覧 |
| **`faq`** / **`questions`** | よくある質問 | Q&Aリスト、問い合わせ前の疑問解消 |
| **`voice`** / **`review`** | 利用者の声 | ユーザーの口コミ、導入事例インタビュー |
| **`access`** | アクセス | 店舗情報、地図、交通案内 |
| **`contact`** | お問い合わせ | 問い合わせフォーム、連絡先情報 |

> 💡 **ポイント（Mixとの連動）**
> 「`features` セクションの中に、汎用の `card` を並べる」ときは、
> `<div class="features__item card">` のように **【セクションのElement（配置）】＋【汎用Block（見た目）】をMix** します。
> これにより、「セクション固有のレイアウト」と「使い回せるUIパーツ」が完璧に分離されます。

---

## 6-2. Element（エレメント）の命名

Elementは、Blockの内側で「**親Blockのどの部位か**」「**何の情報か**」を表します。
`block__○○` の `○○` に入る頻出単語です。

| カテゴリ | エレメント名（`__○○`） | 用途・意味 |
| --- | --- | --- |
| **枠組み・ラッパー** | **`inner`** | コンテンツの最大幅制限（`max-width`）や中央揃え用の枠 |
| | **`box`** / **`container`** | 中身をグループ化して包む枠 |
| | **`list`** | 繰り返し要素を並べるリスト全体の枠（`display: flex` / `grid` をあてる親） |
| | **`item`** | リストの中の1つ1つの項目 |
| **パーツ部位** | **`header`** / **`head`** | カードやモジュールの上部（タイトルや日付がある場所） |
| | **`body`** / **`content`** | カードやモジュールの主たる中身（本文がある場所） |
| | **`footer`** / **`foot`** | カードやモジュールの下部（ボタンやリンクがある場所） |
| **テキスト・情報** | **`title`** | 大見出し、カードのタイトル |
| | **`catch`** / **`sub-title`** | キャッチコピー、小見出し |
| | **`lead`** | 導入文、リード文 |
| | **`text`** / **`desc`** | 本文、説明文（description） |
| | **`date`** / **`time`** | 日付、公開時間 |
| | **`category`** / **`tag`** | カテゴリ名、タグ |
| | **`note`** | 注釈、補足説明、※米印テキスト |
| **画像・視覚** | **`thumb`** (thumbnail) | サムネイル画像（一覧用の正方形・四角形画像） |
| | **`img`** / **`image`** | 一般的な画像 |
| | **`visual`** | 写真、メイングラフィック |
| | **`icon`** / **`ico`** | アイコン画像、シンボル記号 |
| | **`bg`** | 背景画像、装飾用の背景要素 |
| **アクション** | **`btn`** | ボタン（※`card__btn btn` のようにMixして使用） |
| | **`link`** | テキストリンク、「詳しくはこちら」リンク |
| | **`arrow`** | 矢印アイコン・記号 |
| | **`close`** | 閉じるボタン（モーダルやメニュー用） |

---

## 6-3. Modifier（モディファイア）の命名

Modifierは、BlockやElementの「**状態・色・サイズなどのバリエーション**」を表します。
`block--○○` や `block__element--○○` のようにハイフン2つで繋ぎます。

| カテゴリ | モディファイア名（`--○○`） | 用途・意味 |
| --- | --- | --- |
| **状態（State）** | **`--active`** / **`--current`** | 現在選択されている状態（カレント表示） |
| | **`--disabled`** | 無効化されている状態（押せないボタンなど） |
| | **`--open`** / **`--close`** | 開いている / 閉じている状態 |
| **色・テーマ** | **`--primary`** | メインカラー（一番目立たせたい基本色） |
| | **`--secondary`** | サブカラー（補助的な色） |
| | **`--invert`** / **`--light`** | 反転色（暗い背景用の白文字・白枠など） |
| | **`--danger`** / **`--warning`** | 警告・注意色（赤やオレンジ） |
| **形状・スタイル**| **`--outline`** | 枠線のみのスタイル（背景透明） |
| | **`--shadow`** | 影付きスタイル |
| | **`--round`** | 角丸・円形スタイル |
| **サイズ** | **`--sm`** / **`--small`** | 小さいサイズ |
| | **`--lg`** / **`--large`** | 大きいサイズ |
| **配置・並び** | **`--center`** | 中央揃え |
| | **`--flex`** / **`--reverse`** | 横並び配置、反転並び（画像とテキストの左右入れ替え） |

---

# 7. 実践演習 & 課題

## 7-1. 講義での実践（共創）

1. `02-roysha-bem/data/Roysha.xd` の「Home」を画面で確認する。
2. モジュールとなるパーツ（`intro`, `card`, `btn`）と、ページ固有のセクション構造（`features`, `payment`）を分解する。
3. クラス名を全員で設計し、実際にコードを書いてブラウザで確認する。

## 7-2. プチ演習（下層ページ：Helpページ）

- `02-roysha-bem` の下層ページ（`help.html`）をBEMのルールに則ってマークアップする。
- トップページで作った `intro` や `card` が綺麗に再利用できることを体感してみよう。

## 7-3. 課題：NewsllyのBEMマークアップ

提供されたデザインデータをもとに、ゼロからBEMでマークアップを完成させてGitHub Pagesで公開する。

- **対象カンプ**: `03-newslly-bem/data/Newslly.xd`
- **対象ページ**: `index.html`（トップ）および `about.html`（下層）
- **ポイント**:
  - `post` や `card` などの共通モジュールを見つけ出し、セクション側とMixして組むこと。
  - エレメントの孫つなぎ（`__` の連続）をしないこと。
  - 完成したらGitHubにプッシュし、GitHub Pagesで表示確認を行うこと。

**【見本】**

- [Newslly 完成見本](https://takagino.github.io/doc-markup-advanced/03-newslly-bem/completed/index.html)
- [About | Newslly 完成見本](https://takagino.github.io/doc-markup-advanced/03-newslly-bem/completed/about.html)
- [完成コード（GitHub）](https://github.com/takagino/doc-markup-advanced/tree/main/03-newslly-bem/completed)

**【提出先】**

GitHubリポジトリにコミット＆プッシュし、GitHub PagesのURLを提出する。
