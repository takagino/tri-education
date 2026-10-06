# 02_CSS設計とBEM

### HTML+CSS（火1-2 / 水1）

[00_導入](https://app.notion.com/p/00_-3c8bdf471aca80e3a92afe2bc6031e14?pvs=21)

[01_**環境設定と確認課題**](https://app.notion.com/p/01_-3f0bdf471aca80d0b9acf946b73cceaf?pvs=21)

[**02_CSS設計とBEM**](https://app.notion.com/p/02_CSS-BEM-3f1bdf471aca80f7b23cc380f650eb0f?pvs=21)

# 1. はじめに

## 1-1. 前回の復習

[Roysha](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/01-practice/completed/)

[tri-education/wf1/2nd/markup-advanced/01-practice/completed at main · takagino/tri-education](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/01-practice/completed)

---

# 2. 今回学ぶこと

前回の確認課題（`01-practice` / Roysha.xd）や前期の授業では、命名規則などのルールを特に決めずに自由にマークアップを行いました。
そうすると、以下のような悩みに直面します。

- **「クラス名が思いつかない…」**（`wrap`, `box1`, `inner2`, `red-text` など適当につけてしまう）
- **「CSSが思った通りに効かない…」**（後から書いたスタイルに負けてしまい、セレクタを長くしたり `!important` を連発してしまう）
- **「デザインの修正が怖い…」**（1箇所のCSSを変更したら、関係ない別の場所のデザインまで崩れてしまった）

個人で制作する小さなページであれば力技で乗り切れますが、複数人のチーム開発や中規模・大規模なWebサイトでは、コードがたちまち破綻してしまいます。

これを解決するのが、今回学ぶ「CSSアーキテクチャ（CSS設計）」**と、Web制作現場の標準ルールである**「BEM」です。

---

## 2-1. ゴールと学習の流れ

1. なぜCSS設計が必要なのか（良いマークアップの4箇条）を理解する。
2. BEM（Block, Element, Modifier, Mix）のルールと命名規則をマスターする。
3. サンプルデータを題材に、モジュール分割とマークアップを一緒に行う。
4. 下層ページ（Helpページ）を自力でBEM設計・実装してみる。
5. 課題データのマークアップに着手し、破綻しないCSSを自力で構築する。

---

## 2-2. サンプルデータ

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=drive_link)

- 02-Roysha-bem：授業で一緒にマークアップするデータ
- 03-Newslly-bem：課題のデータ

**【見本】**

[Roysha](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/02-roysha-bem/completed/)

[Service - Roysha](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/02-roysha-bem/completed/service.html)

[Help - Roysha](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/02-roysha-bem/completed/help.html)

---

## 2-3. 途中経過

[tri-education/wf1/2nd/markup-advanced/02-roysha-bem/starter at main · takagino/tri-education](https://github.com/takagino/tri-education/tree/main/wf1/2nd/markup-advanced/02-roysha-bem/starter)

---

# 3. CSSアーキテクチャとは？

「CSSは書くのは簡単だが、保守するのは最も難しい言語」と言われることがあります。プログラミング言語と違い、タグ名やプロパティの構文自体はシンプルですが、**CSSには「すべてのスタイルがグローバル（Webページ全体に影響する）」という根本的な性質があるため**です。

明確なルールや設計を決めずに思いつきでコードを書き進めると、以下のような典型的な「CSSの崩壊」が起こります。

- **詳細度のインフレ：**スタイルが当たらなくなり、`.main section div.box .title span` のようにセレクタをどんどん長くして無理やり適用させる。
- **`!important` の泥沼化：**最終手段として `!important` を使い始め、後からそのスタイルを打ち消すために別の `!important` を重ねる悪循環に陥る。
- **デグレ（意図しない破壊）：**あるページのデザインを直したはずが、関係ない別のページのレイアウトが崩れてしまう。
- **不要コードの肥大化：**下手に消すとどこが崩れるか分からない恐怖から、古いコードを消せず、下へ下へと修正用CSSを追記し続けてファイルが肥大化する。

こうした問題を防ぎ、**数ヶ月後の自分やチームの誰もが安全に修正・拡張できる状態を保つための計画と設計**を「CSSアーキテクチャ（CSS設計）」と呼びます。

---

## 3-1. 良いマークアップの4箇条

Googleの著名なエンジニアである Philip Walton 氏は、優れたCSSアーキテクチャが満たすべき目標として以下の**4箇条**を提唱しました。

[CSS Architecture](https://philipwalton.com/articles/css-architecture/)

### ① PREDICTABLE（予測しやすい）

- **目標：**クラス名やHTML構造を見ただけで、「どの要素に」「何のために」効いているかが誰でも直感的に理解できること。
- **なぜ重要か**：「このクラスを変更したら画面のどこが変わるのか」が予測できないコードは、修正時に予期せぬ事故を生みます。
- **具体例：**❌ **`box1`**, **`text-red`**, **`left-btn`**：どんな役割なのか、どこで使われているのかが予測できない。

### ② REUSABLE（再利用しやすい）

- **目標：**同じデザインや似たパーツが出てきた際、CSSを新しく書き直すことなく、既存のHTML構造とクラスをそのまま使い回せること。
- **なぜ重要か：**ページごとに似たようなボタンやカードのCSSを毎回ゼロから書いていると、コード量が雪だるま式に増え、修正時の作業量も激増します。
- **具体例：**❌ トップページのボタンは **`.top-btn`**、下層ページのボタンは **`.sub-btn`** と別々にCSSを書く。

### ③ MAINTAINABLE（保守しやすい）

- **目標：**デザインの修正やパーツの追加・削除があった際、既存の他のパーツに悪影響（副作用）を与えずに安全に更新できること。
- **なぜ重要か：**「Aを直したら関係ないBが崩れた」というモグラ叩きを防ぎ、安心して改修できるようにするためです。
- **具体例：**❌ **`section p { margin-bottom: 20px; }`** のようにタグセレクタで大雑把に指定すると、予期せぬ場所の段落余白まで狂ってしまう。

### ④ SCALABLE（拡張しやすい）

- **目標：**サイトの規模が大きくなったり（ページ数の増加）、制作チームに新しいメンバーが増えたりしても、破綻せず低い学習コストで成長できること。
- **なぜ重要か：**1人で作る小規模な1ページなら力技で乗り切れても、中規模・大規模なサイトやチーム制作では、共通の設計思想がないと開発スピードが急激に失速します。

そして、4箇条を達成するために必要な考え方として以下の2点があります。

<aside>

1. デザインおよびマークアップを「**モジュール（再利用可能な部品）**」単位で考えること。
2. チーム全員が迷わず同じように書ける「**命名ルール**」を設定すること。
</aside>

---

## 3-2. モジュール単位で考える

デザインカンプ（XD）を見たとき、最初は「ページの上から下に向かって、見た目の順番通りに1枚の絵としてHTMLを書く」という発想になりがちです。

しかし破綻しないマークアップを行うためには、マークアップに着手する前にまず**カンプ全体を俯瞰し、「共通して使い回せる部品（モジュール）」を拾い集める作業**から始めます。

**【モジュール（コンポーネント）とは】**

Webサイトを構成する「**独立した再利用可能なパーツの塊**」のことです。
まるで「レゴブロック」のように、あらかじめ用意されたブロックを組み合わせて1枚のWebページを組み立てていくイメージです。

<aside>
⚠️

CSS設計の文脈では「パーツ」「コンポーネント」「モジュール」はほぼ同義で使われますが、この講義では「モジュール」という言葉に統一します。

</aside>

**【モジュール化の思考ステップ】**

1. **観察：**カンプ全体を見渡し、複数回登場するパーツや、将来他のページでも使われそうな塊を見つける。
2. **抽象化：**「特定の内容（特定の文章や写真）」にとらわれず、「UIの形と役割」に注目する。
3. **独立化：**そのパーツ単体でどこへ持って行っても崩れないように、外側の余白や特定のレイアウト幅から切り離して設計する。

**【代表的なモジュールの例】**

- **ボタン（`btn`）：**角丸やパディング、文字サイズなど、サイト全体で統一された基本形状を持つ。
    
    ![06.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/06.png)
    
    ![07.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/07.png)
    
    ![08.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/08.png)
    

- **カード（`card`）：**アイコン画像＋見出し＋説明文がひとまとめになった情報ボックス。
    
    ![01.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/01.png)
    
    ![02.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/02.png)
    
- **イントロ（`intro`）：**各セクションの冒頭に配置される「キャッチコピー＋大見出し＋リード文」の導入セット。
    
    ![03.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/03.png)
    
    ![04.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/04.png)
    
    ![05.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/05.png)
    

---

## 3-3. ルールを設定する

個人制作では自分の好きな書き方で書けますが、実際のWeb制作会社やフロントエンド開発の現場では、「コーディングガイドライン（制作ルール）」を策定し、全員がそれに従ってコードを書きます。

- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- [制作ガイドライン（Burnworks）](https://burnworks.com/docs/guidelines/)

【現場で統一されるルールの代表例】

- **ファイル・ディレクトリ構成**: 画像は `images/`、スタイルシートは `css/` など、配置場所を固定化する。
- **画像の命名規則**: **`ico_○○.png`**（アイコン）、**`pic_○○.jpg`**（写真）、**`img_○○.png`**（図版）のようにプレフィックス（接頭辞）で用途を揃える。
- **ID・Classの使い分け：**
    - スタイル（見た目）の適用には **Class のみ**を使用する。
    - ID はページ内リンク（アンカー）や JavaScript の操作フックのみに限定し、CSSセレクタには使用しない（IDは詳細度が高すぎて上書きが困難になるため）。
- **クラスの命名規則**: 単語の繋ぎ方、階層構造の表し方を統一する（これが本単元で学ぶ **BEM** です）。

---

## 3-4. 代表的な命名ルールのアプローチ

世界中のエンジニアが「どうすれば破綻しないCSSが書けるか」を模索した結果、様々なCSS設計手法が生まれました。
現代のWeb制作・フロントエンド開発において、アプローチは大きく以下の**2つの潮流**に分かれます。

| 手法 | 特徴 | メリット | デメリット | 代表例 |
| --- | --- | --- | --- | --- |
| **ユーティリティ型
（**Utility-First） | 見た目や機能ごとに細かく分かれた汎用クラスを、1つのHTML要素に何個も重ねて指定する手法。
（例: **`class="flex items-center text-red-500 p-4"`**） | ・CSSファイルを自分でほぼ書かずに済む
・クラス名の命名に悩む必要がない | ・HTMLのクラス属性が長大化し可読性が落ちる
・HTMLを見ただけでは「何のUIパーツなのか」が分かりにくい | Tailwind CSS |
| **コンポーネント型
（**Component-Based） | 役割を持ったひとかたまりのモジュールとしてクラスを設計し、CSS側で装飾をまとめる手法。
（例: **`class="card card--featured"`**） | ・HTMLがシンプルで構造・意味が伝わりやすい
・パーツ単位での再利用や長期保守に極めて強い | ・事前の設計やクラス命名のルール習得が必要
・CSSファイル自体の記述量が多くなる | **BEM**, FLOCSS, SMACSS |

**【なぜ本授業で「BEM（コンポーネント型）」を学ぶのか？】**

近年はWebアプリケーション開発を中心にユーティリティ型のTailwind CSSも人気を集めていますが、**日本のWeb制作現場（企業の公式Webサイト制作、LP制作、WordPressテーマ開発など）では、圧倒的に「コンポーネント型（BEM / FLOCSS）」がデファクトスタンダード**として採用されています。

また、デザインをモジュール単位で分解し、HTMLをセマンティックに組み立てる思考力は、あらゆるフロントエンド技術の土台となる最も重要な基礎体力です。
そのため本授業では、現場で最も広く使われているコンポーネント型の標準ルール「BEM」を徹底的に習得します。

---

# 4. BEM

BEM（ベム）は、世界的な検索エンジン企業である Yandex 社が大規模なWeb開発を効率化するために考案し、英国の著名なフロントエンドエンジニア Harry Roberts 氏が「MindBEMding」として洗練・普及させた、世界で最も利用されているCSS設計手法（命名規則）です。

Webサイト上のすべての要素を、以下の**3つの役割**に分解して命名します。

<aside>

1. **Block（ブロック）：**独立して存在できるパーツの塊
2. **Element（エレメント）：**Blockを構成する中身の要素（Blockの外では使えない）
3. **Modifier（モディファイア）：**BlockやElementの見た目・状態のバリエーション
</aside>

**【BEMの基本原則とメリット】**

- **ほぼすべての要素にクラス名を付加する**
    
    HTMLのタグ名（`h2`, `p`, `span` など）に直接スタイルを当てず、必ずクラス名を振ってスタイリングします。
    これにより、将来HTMLタグを `h2` から `h3` に変えたり、`div` を `article` に変更したりしても、**CSSが一切壊れない強いマークアップ**になります。
    
- id名はスタイル指定に使用しない
    
    HTMLの `id` 属性は詳細度が非常に高いため、CSSセレクタに使うとスタイルの上書きが極めて困難になります。
    スタイル指定には必ず **クラス（Class）のみ** を使用し、`id` はページ内リンク（アンカー）や JavaScript の操作フックのみに留めます。
    
- Sassとの相性が抜群
    
    クラス名が長くなりやすく、素のCSSでは記述量が増えるという側面がありますが、次回学ぶ「**Sass（SCSS）**」のネスト機能（`&__element`, `&--modifier`）と組み合わせることで、信じられないほど爆速かつ快適に記述できるようになります。
    

---

## 4-1. Block（ブロック）

Webページを構成する**独立した最小単位のモジュール**です。

「別のWebサイトや別のページに単体でポンと移動させても、自立して意味を成すパーツ」がBlockにあたります。

- ヘッダー、フッター、ナビゲーションなどの大枠
- ボタン、カード、セクション導入見出しなどの汎用モジュール

![Snapzy_2026-10-06_21-36-33_063.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/Snapzy_2026-10-06_21-36-33_063.png)

**【命名規則】**

- 単語が1つの場合はそのまま小文字（例: **`.header`**, **`.card`**, **`.intro`**）。
- 単語が複数の場合は、ハイフン1つ（ケバブケース）で繋ぎます（例: **`.global-nav`**, **`.main-visual`**）。
- **名前はなるべく2語以内に収める**のが鉄則です（Block名が長いと、Elementを繋いだ時にクラス名が長大化してしまうため）。

```css
/* 単語が1つの場合 */
.header { }
.intro { }
.card { }
.btn { }

/* 単語が複数の場合（ケバブケース・2語以内推奨） */
.global-nav { }
.main-visual { }
```

---

## 4-2. Element（エレメント）

Blockの内側に属し、**そのBlockを構成する中身の要素**です。

「Blockの外に単体で取り出すと意味を成さない部品（Blockに依存している部品）」がElementにあたります。

- カードの中にある「アイコン」「タイトル」「説明文」
- セクション導入（intro）の中にある「キャッチコピー」「見出し」「本文」

![Snapzy_2026-10-06_22-21-52_942.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/Snapzy_2026-10-06_22-21-52_942.png)

**【命名規則】**

Elementのクラス名は、所属するBlockの名前を継承し、アンダースコアふたつ（`__`）を記述した後にElementの名前を繋ぎます。

```html
<!-- 「intro」ブロックの中の各Element -->
<div class="intro">
  <p class="intro__catch">OUR FEATURES</p>
  <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
  <p class="intro__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
  <a class="btn" href="#">Learn More</a> <!-- ※btnは独立した別Block -->
</div>
```

<aside>
💡

**なぜアンダースコア2つ（ `__`）なのか？**

単語同士を繋ぐハイフン（例: **`main-visual`** の **`-`**）と、階層構造を表す区切りを一目で視覚的に区別するためです。

</aside>

<aside>
⚠️

**特に注意したい「エレメントの孫つなぎ禁止」**

HTMLタグが何段階深く入れ子になっていても、BEMのクラス名でアンダースコアを連続させてはいけません。

```html
<!-- ❌ NG：エレメントの孫つなぎ（HTMLの階層をクラス名に反映してしまっている） -->
<div class="intro">
  <div class="intro__content">
    <h2 class="intro__content__title">見出し</h2>
    <p class="intro__content__text">本文</p>
  </div>
</div>

<!-- ⭕ OK：HTMLが何重に入れ子でも、すべて「introの直属の要素」として命名する -->
<div class="intro">
  <div class="intro__content">
    <h2 class="intro__title">見出し</h2>
    <p class="intro__text">本文</p>
  </div>
</div>
```

</aside>

---

## 4-3. Modifier（モディファイア）

BlockやElementの「見た目」「状態」「振る舞い」のバリエーション（差分）を定義するものです。

日本語で言えば「修飾語」「形容詞」の役割を果たします。

- ボタンの「色違い（緑色、オレンジ色）」や「枠線のみスタイル」
- カードの「影付き」「中央揃え」
- タブやメニューの「選択中（active）」「無効化（disabled）」状態

![06.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/06.png)

![07.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/07.png)

![08.png](02_CSS%E8%A8%AD%E8%A8%88%E3%81%A8BEM/08.png)

**【命名規則】**

Modifierのクラス名は、元のBlockやElementの名前を継承し、ハイフンふたつ（**`--`**）を記述した後にModifierの名前を繋ぎます。

```html
<!-- 基本のカード ＋ 影付きModifier -->
<div class="card card--shadow">
  <img class="card__icon" src="images/ico_home01.png" alt="">
  <dl class="card__content">
    <dt class="card__title">Fully Secure Payment</dt>
    <dd class="card__text">Lorem ipsum dolor sit amet...</dd>
  </dl>
</div>

<!-- ボタンの色・スタイルバリエーション -->
<a class="btn" href="#">基本ボタン（青）</a>
<a class="btn btn--info" href="#">緑色ボタン</a>
<a class="btn btn--warning" href="#">オレンジ色ボタン</a>
<a class="btn btn--outline" href="#">枠線ボタン</a>
```

<aside>
⚠️

**Modifier は必ず基本クラスと併記する**

Modifierはあくまで「差分（変更点）」だけを指定するクラスです。
そのため、**必ずベースとなるクラス（`.btn` や `.card`）と一緒に指定します。**

```html
<!-- ❌ NG：Modifier単体で指定してしまう -->
<a class="btn--info" href="#">ボタン</a>
<!-- これだと幅や角丸、パディングなど基本スタイル（.btn）が一切当たらず崩れる -->

<!-- ⭕ OK：基本クラス ＋ Modifierを併記する -->
<a class="btn btn--info" href="#">ボタン</a>
```

```css
/* CSSの書き方：基本スタイルと差分スタイルの分離 */

/* 1. ベースとなる基本クラス（形状・サイズ・基本色） */
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

/* 2. Modifierクラス（上書きしたいプロパティだけを記述する） */
.btn--info {
  background-color: #2DBE61; /* 背景色だけを上書き */
}

.btn--warning {
  background-color: #F87624; /* 背景色だけを上書き */
}

.btn--outline {
  border: 1px solid #256BE6; /* 枠線をつけ、背景を透明に */
  background-color: transparent;
  color: #256BE6;
}
```

</aside>

---

## 4-4. BlockとElementの関係性

BEMにおいて、Blockは「どこに移動させても自立して機能する独立した部品（カプセル化）」です。そのため、**あるBlockの内側に、別のBlockのElementを直接入れてはいけません。**

これはマークアップの現場で非常に起こりやすい重大なアンチパターンです。典型的な2つのNGパターンを理解しておきましょう。

**【パターン①：無関係なBlockのElementが混入している】**

カードなどの独立した部品の中に、別の部品のElement（**`__○○`**）が急に紛れ込んでしまうケースです。

```html
<!-- ❌ NG：cardブロックの中に、introのエレメントが混入している -->
<div class="card">
  <img class="card__icon" src="images/ico_card01.png" alt="">
  <!-- なぜcardの中に「intro」のエレメントがあるのか？ -->
  <h3 class="intro__title">Fully Secure Payment</h3>
  <p class="intro__text">Lorem ipsum dolor sit amet...</p>
</div>
```

```html
<!-- ⭕ OK：cardブロックの中身は、すべて「card自身のエレメント」にする -->
<div class="card">
  <img class="card__icon" src="images/ico_card01.png" alt="">
  <h3 class="card__title">Fully Secure Payment</h3>
  <p class="card__text">Lorem ipsum dolor sit amet...</p>
  
  <!-- ⭕ OK：別のBlockを入れるのOK -->
  <div class="intro">
	  <p class="intro__catch">OUR FEATURES</p>
    <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
    <p class="intro__text">Lorem ipsum dolor sit amet...</p>
    <a class="btn" href="#">Learn More</a>
  </div>
</div>
```

**【パターン②：親BlockのElementが、内側のBlockの中に入り込んでいる（入れ子の逆転）】**

セクションの中に独立したモジュール（`intro` など）を配置する際、親セクションのElementが、内側の独立モジュールの中に潜り込んでしまうケースです。

```html
<!-- ❌ NG：親セクションのElement（features__info）が、独立ブロック（intro）の内側に潜り込んでいる -->
<section class="features">
  <div class="intro">
    <div class="features__info">
      <p class="intro__catch">OUR FEATURES</p>
      <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
      <p class="intro__text">Lorem ipsum dolor sit amet...</p>
      <a class="btn" href="#">Learn More</a>
    </div>
  </div>
</section>
```

<aside>
💡

**解決策：次の「Mix（ミックス）」を使う**

これらのNGパターンが起こるとルールが破綻し、結局なんでもありになってしまいます。

**1つのHTMLタグに「セクションの配置クラス」と「独立パーツの本体クラス」を同時に付与する（Mix）**ことで、階層をねじれさせることなくスマートに解決できます。

</aside>

---

## 4-5. Mix（ミックス）

1つのHTML要素に対して、「全体のレイアウト・配置を決めるクラス（Element）」**と**「パーツ自身の見た目を決めるクラス（Block）」を両方同時に付与することです。

```html
<section class="features">
  <div class="features__inner">

    <!-- 【配置クラス：features__info】 ＋ 【パーツクラス：intro】 をMix -->
    <div class="features__info intro">
      <p class="intro__catch">OUR FEATURES</p>
      <h2 class="intro__title">Simple and Easy Solution for Transfer Money Safe and Faster Way</h2>
      <p class="intro__text">Lorem ipsum dolor sit amet...</p>
      <a class="btn" href="#">Learn More</a>
    </div>

    <!-- 【配置クラス：features__item】 ＋ 【パーツクラス：card】 をMix -->
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

**【なぜMixを使うのか？（外側余白 margin の責任分離）】**

マークアップで特に起こりやすい失敗が、「モジュール自身（**`.card`** や **`.intro`**）に外側の余白（**`margin`**）や横幅（**`width`**）をつけてしまうこと」です。

```css
/* ❌ NG：モジュール自身に外側の余白をつけてしまう */
.card {
  width: 50%;
  margin-bottom: 40px;
  padding: 30px;
  background-color: #fff;
}
```

もしこのように書いてしまうと、この **`.card`** を他のページ（3列並びのグリッドや、横スクロールエリア）で再利用しようとした瞬間、**`width: 50%`** や **`margin-bottom: 40px`** が邪魔をして**レイアウトが確実に崩壊**します。

モジュールは「どこにでも置けるポータブルな部品」でなければなりません。そこで、Mixを使って**責任を完全に分離**します。

| クラスの役割 | 担当するスタイルプロパティ | 担当クラスの例 |
| --- | --- | --- |
| **モジュール自身（Block）**
➔ パーツの内側の見た目 | `padding`, `background-color`, `border`, `color`, `font-size` など | `.card`
`.intro` |
| **配置用要素（Element）**
➔ パーツの外側の位置関係 | `margin`, `width`, `grid-column`, `flex`, `order` など | `.features__item`
`.features__info` |

```css
/* ⭕ OK：役割を完全に分離する */

/* 1. card自身は、自分の「内側の見た目」しか持たない（どこでも置ける！） */
.card {
  padding: 30px;
  background-color: #fff;
}

/* 2. featuresセクション側が、グリッドでの「配置・外側余白」を決める */
.features__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px 8%;
}

.features__item {
  /* グリッド内の配置や外側余白があればここに書く */
}
```

この「**外側余白（margin）の責任分離**」を徹底するだけで、コードの再利用性と保守性は飛躍的に向上します。

---

# 5. 迷った時の頻出クラス名

クラス名に迷ったときは、「**今名付けようとしているのはBlock（独立パーツ / セクション）なのか、Element（中身の要素）なのか**」を意識して、以下の定番単語から選びましょう。

## 5-1. Block（ブロック）の命名

Blockには大きく分けて「① サイト全体で使い回す汎用パーツ」**と**「② ページ内のセクションを囲む固有の枠組み」の2種類があります。

**【汎用Block：「用途・形状」で命名する】**

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

**【セクション固有Block：セクションの「コンテンツ内容」で命名する】**

`<section>` などの親ブロックは、その場所に何が書かれているか（役割・コンテンツ内容）で命名します。

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

<aside>
💡

**ポイント（Mixとの連動）**

「**`features`** セクションの中に、汎用の **`card`** を並べる」ときは、**`<div class="features__item card">`** のように、

**【セクションのElement（配置）】＋【汎用Block（見た目）】**

をMix します。これにより、「セクション固有のレイアウト」と「使い回せるUIパーツ」が完璧に分離されます。

</aside>

---

## 5-2. Element（エレメント）の命名

Elementは、Blockの内側で「**親Blockのどの部位か**」「**何の情報か**」を表します。（**`block__○○`**）

| カテゴリ | エレメント名（`__○○`） | 用途・意味 |
| --- | --- | --- |
| **枠組み・ラッパー** | **`inner`** | コンテンツの最大幅制限（`max-width`）や中央揃え用の枠 |
|  | **`box`** / **`container`** | 中身をグループ化して包む枠 |
|  | **`list`** | 繰り返し要素を並べるリスト全体の枠（`display: flex` / `grid` をあてる親） |
|  | **`item`** | リストの中の1つ1つの項目 |
| **パーツ部位** | **`header`** / **`head`** | カードやモジュールの上部（タイトルや日付がある場所） |
|  | **`body`** / **`content`** | カードやモジュールの主たる中身（本文がある場所） |
|  | **`footer`** / **`foot`** | カードやモジュールの下部（ボタンやリンクがある場所） |
| **テキスト・情報** | **`title`** | 大見出し、カードのタイトル |
|  | **`catch`** / **`sub-title`** | キャッチコピー、小見出し |
|  | **`lead`** | 導入文、リード文 |
|  | **`text`** / **`desc`** | 本文、説明文（description） |
|  | **`date`** / **`time`** | 日付、公開時間 |
|  | **`category`** / **`tag`** | カテゴリ名、タグ |
|  | **`note`** | 注釈、補足説明、※米印テキスト |
| **画像・視覚** | **`thumb`** (thumbnail) | サムネイル画像（一覧用の正方形・四角形画像） |
|  | **`img`** / **`image`** | 一般的な画像 |
|  | **`visual`** | 写真、メイングラフィック |
|  | **`icon`** / **`ico`** | アイコン画像、シンボル記号 |
|  | **`bg`** | 背景画像、装飾用の背景要素 |
| **アクション** | **`btn`** | ボタン（※`card__btn btn` のようにMixして使用） |
|  | **`link`** | テキストリンク、「詳しくはこちら」リンク |
|  | **`arrow`** | 矢印アイコン・記号 |
|  | **`close`** | 閉じるボタン（モーダルやメニュー用） |

---

## 5-3. Modifier（モディファイア）の命名

Modifierは、BlockやElementの「**状態・色・サイズなどのバリエーション**」を表します。（**`block--○○`** や **`block__element--○○`**）

| カテゴリ | モディファイア名（`--○○`） | 用途・意味 |
| --- | --- | --- |
| **状態（State）** | **`--active`** / **`--current`** | 現在選択されている状態（カレント表示） |
|  | **`--disabled`** | 無効化されている状態（押せないボタンなど） |
|  | **`--open`** / **`--close`** | 開いている / 閉じている状態 |
| **色・テーマ** | **`--primary`** | メインカラー（一番目立たせたい基本色） |
|  | **`--secondary`** | サブカラー（補助的な色） |
|  | **`--invert`** / **`--light`** | 反転色（暗い背景用の白文字・白枠など） |
|  | **`--danger`** / **`--warning`** | 警告・注意色（赤やオレンジ） |
| **形状・スタイル** | **`--outline`** | 枠線のみのスタイル（背景透明） |
|  | **`--shadow`** | 影付きスタイル |
|  | **`--round`** | 角丸・円形スタイル |
| **サイズ** | **`--sm`** / **`--small`** | 小さいサイズ |
|  | **`--lg`** / **`--large`** | 大きいサイズ |
| **配置・並び** | **`--center`** | 中央揃え |
|  | **`--flex`** / **`--reverse`** | 横並び配置、反転並び（画像とテキストの左右入れ替え） |

---

# 6. 実践演習

## 6-1. マークアップ実践フロー（5つの思考ステップ）

コードをいきなりエディタに打ち始めるのではなく、以下の手順で進めるのが標準的なワークフローです。

```
【ステップ1】カンプ分析 ➔ 共通モジュール（intro, card, btn）とセクション（features, payment）を見つける
      ↓
【ステップ2】クラス名設計 ➔ カンプを見ながら命名メモを作る（孫つなぎしない、Mixの箇所を決める）
      ↓
【ステップ3】HTML骨格作成 ➔ クラス名を付けながらセマンティックなHTMLを組む
      ↓
【ステップ4】共通モジュールCSS ➔ まず共通パーツ（.intro, .card, .btn）の見た目だけを完成させる
      ↓
【ステップ5】セクション配置CSS ➔ グリッドやFlexboxでセクションごとのレイアウト・配置を整える
```

---

## 6-2. クラスの個数と子孫セレクタの使い分け（実務の2つの流派）

ここで1つの疑問が生じます。
「もし暗い背景のセクションで、`intro` の文字色を白くしたい場合、どうすべきか？」

実務では、大きく分けて2つのアプローチ（流派）が存在します。

| アプローチ | HTMLの記述 | CSSの記述 | 特徴と現場での評価 |
| --- | --- | --- | --- |
| **A. コンポーネント自立型
（厳格なBEM）** | **`<div class="offer__info intro intro--invert">`** | **`.intro--invert .intro__title { color: #fff; }`** | モジュール自身が色違いのModifierを持つ。
どこでも使い回せるが、**HTMLに指定するクラス名が増えてしまう**。 |
| **B. 文脈（コンテキスト）型
（本授業で採用）** | **`<div class="offer__info intro">`** | **`.offer__info .intro__title { color: #fff; }`** | 親セクションの配置クラスを使って子孫セレクタで白くする。
**HTMLのクラスは2つ以内に美しく収まる**。 |

<aside>
💡

**大切なのは「ルールの中で柔軟に対応するバランス感覚」**

「BEMだから絶対に子孫セレクタを使ってはならない」「クラス名は常に1つでなければならない」とルールに縛られすぎると、かえってHTMLが長大化したりコードが書きづらくなります。

本授業では、「HTMLのクラス名はできる限り少なくする」という基本方針のもと、限定的なバリエーションについては、親の配置用Elementを使った子孫セレクタ（**`.offer__info .intro__title`**）で柔軟に対応するアプローチ（B）を採用しています。

実際の制作現場でも、ルールの基本理念を理解した上で、プロジェクトの規模や読みやすさに応じて柔軟にバランスを取ることが極めて重要です。

</aside>

---

# 7. 課題

「BEM」のルールに則って「03_Newslly-bem」をマークアップする。

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=drive_link)

**【提出方法】**

GitHubに同期する。