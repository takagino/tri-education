# 第1回「Web標準とHTML/CSS拡張」（10/13）

# **1. Web標準とマークアップ言語の基礎**

## **1-1. Web標準（Web Standards）とは**

### **【Web標準の定義と目的】**

**Web標準（Web Standards）** とは、インターネット上でウェブサイトやWebアプリケーションを制作・公開する際に、世界共通で利用できるように定められた標準規格・技術仕様の総称。

かつてブラウザ開発企業（Netscape社とMicrosoft社など）が自社独自のタグや機能を競い合って実装した結果、特定のブラウザでしか正常に表示されない「**ブラウザ戦争**」が起きた。このような事態を防ぎ、どの環境でも同じように閲覧・利用できるようにするために標準化が進められている。

### **【Web標準に準拠するメリット】**

1. **クロスブラウザ・マルチデバイス対応**
    
    PC（Windows, Mac）、スマートフォン（iOS, Android）、タブレットなど、異なるOSやブラウザ（Chrome, Safari, Edge, Firefox等）で意図した通りに表示・動作する。
    
2. **アクセシビリティの向上**
    
    視覚障害者が利用するスクリーンリーダー（音声読み上げソフト）や点字ディスプレイなどの支援技術が、文書の構造を正確に解釈できるようになる。
    
3. **SEO（検索エンジン最適化）効果**
    
    検索エンジンのクローラー（巡回ロボット）が文書の意味や重要度を正しく理解し、検索結果に適切に反映されやすくなる。
    
4. **メンテナンス性と制作効率の向上**
    
    HTML（構造）とCSS（見た目・デザイン）が明確に分離されるため、デザインの変更や更新作業が容易になり、ファイルサイズも軽量化される。
    

---

## **1-2. マークアップ言語の系譜**

Webで使われる言語の歴史的つながりを理解することで、なぜ現在の仕様になっているのかが明確になる。

```
SGML（元祖・汎用マークアップ言語）
  ├── HTML（SGMLをベースにWeb向けに簡略化）
  │     ├── HTML 1.0 〜 HTML 4.01
  │     └── （停滞・仕様分裂）
  │           ↓
  │           HTML5（WHATWG主導でWebアプリ時代に対応）
  │           ↓
  │           HTML Living Standard（バージョンを廃止した現在の生きた標準）
  └── XML（SGMLをベースにデータ交換向けに簡略化。独自タグ定義可能）
        └── XHTML（HTMLをXMLの文法で再定義した厳格な言語）
```

### **【SGML（Standard Generalized Markup Language）】**

1986年にISOで標準化された、文書の構造を定義するための元祖マークアップ言語。非常に高機能で柔軟だが、仕様が巨大で複雑すぎたため、Webブラウザで直接扱うには向いていなかった。

### **【HTML（HyperText Markup Language）】**

SGMLをベースに、Web上のハイパーテキスト（リンク機能を持つ文書）を記述するために作られた言語。タグによって見出しや段落などの意味を持たせる。

### **【XML（Extensible Markup Language）】**

SGMLの複雑な部分を削ぎ落とし、インターネット上でデータをやり取りしやすいように作られた言語。開発者が自由にタグ（タグ名・構造）を定義できるのが最大の特徴。設定ファイルやAPI通信データなどに広く使われる。

### **【XHTML（Extensible HyperText Markup Language）】**

HTMLをXMLの厳格な文法ルールに基づいて再構築した言語。

- タグ名や属性名は必ず**小文字**で記述する。
- すべての要素は必ず**終了タグで閉じる**（空要素も `<br />` や `<img />` のように閉じる）。
- 属性値は必ず**引用符（ダブルクォーテーション等）で囲む**。
- 属性の省略（`checked` 等）は不可で、`checked="checked"` と書く。

### **【HTML Living Standard（現在の標準）】**

従来の「HTML4」「HTML5」のようなメジャーバージョン番号を廃止し、**「常に進化し続ける1つの標準仕様」** として管理されている。新機能の追加や不要な仕様の廃止が継続的に行われている。

---

## **1-3. CSSの標準化とCSSモジュール（CSS Snapshot）**

CSSはHTMLのように単一の仕様書ではなく、機能ごとに独立した「**モジュール（Modules）**」に分割されて策定・進化している。

### **【CSSのモジュール化】**

- CSS1、CSS2の後、巨大化しすぎた仕様を一度に改訂するのが困難になったため、CSS3以降は「セレクタ」「カラー」「フォント」「フレックスボックス」「グリッド」などの単位で**モジュール化**された。
- それぞれのモジュールが独立したペースで策定プロセス（作業草案 → 勧告候補 → W3C勧告）を進めるため、**「CSS4」という全体を一括したメジャーバージョンは存在しない**。
- **W3C勧告済みモジュール：**
    - **`CSS Color Module Level 3`**：2011年に早々とW3C勧告となった（色指定、透明度 `rgba()`、HSLカラー等の仕様）。

### **【CSS Snapshot（CSSスナップショット）】**

- モジュールごとに進行度が異なるため、W3CのCSSワーキンググループが「**現時点で安定して利用できる推奨モジュールの集合体**」として定期的に取りまとめている公式文書を **CSS Snapshot（CSSスナップショット）** と呼ぶ（例: CSS Snapshot 2023など）。

---

# **2. HTML文書の基本構造と文法規則**

## **2-1. HTML文書の骨格**

```markup
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページのタイトル</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Webサイトの見出し</h1>
  </header>
  <main>
    <p>ここに本文が入ります。</p>
  </main>
  <footer>
    <p>&copy; 2026 Sample Inc.</p>
  </footer>
</body>
</html>
```

### **【DOCTYPE宣言（文書型宣言）】**

- **記述：** `<!DOCTYPE html>`
- **役割：**ブラウザに対して「この文書は最新の標準仕様に準拠したHTMLである」ことを宣言する。
- **目的：**これを先頭に書かないと、ブラウザが古い仕様を再現する「**後方互換モード（Quirks Mode）**」で動作し、CSSのレイアウト崩れの原因になる。
    
    DOCTYPEを記述することで「**標準モード（Standards Mode）**」で正確にレンダリングされる。
    
- **試験のポイント：**大文字・小文字は区別されないが、小文字または大文字で簡潔に記述する。HTML4時代のように長いDTD（URL）を書く必要はない。

### **【 <html> 要素】**

- 文書全体の**ルート（最上位）要素**。
- `lang` 属性で言語を指定する（日本語の場合は `lang="ja"`、英語は `lang="en"`）。

<aside>
💡

HTML Living Standardでは、属性値に空白文字や特定の記号が含まれていなければ、**引用符（クォート）の省略が可能**である。

したがって、`<html lang=ja>` という記述は**文法エラーではない（正しい）**。
※実務では可読性や安全性の観点から `lang="ja"` とクォートで囲むことが推奨される。

</aside>

### **【 <head> 要素】**

- 文書の**メタデータ（付加情報）** を格納するコンテナ。ブラウザの描画領域には直接表示されない。
- `<head>` と `<body>` の親要素はともに `<html>` である（兄弟関係）。

### **【 <head> 内の主要な要素】**

- **`<meta charset="utf-8">`**
    
    文書の文字エンコーディングを指定する。文字化けを防ぐため、`<head>` 内の最初の方（`<title>` より前）に記述するのが原則。
    
- **`<title>`**
    
    文書のタイトル。ブラウザのタブ、ブックマーク、検索エンジンの検索結果の見出しとして表示される。**HTML文書に必須の要素**。
    
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**
    
    スマートフォン等の表示領域（ビューポート）の幅をデバイスの画面幅に合わせる指定。レスポンシブWebデザインの必須タグ。
    
- **`<link>`**
    
    外部リソース（CSSファイルやファビコンなど）と文書を結びつける。
    
    ```markup
    <!-- 画面表示用のCSS -->
    <link rel="stylesheet" href="style.css">
    <!-- 画面幅480px以下用のCSS（media属性） -->
    <link rel="stylesheet" href="sp.css" media="screen and (max-width: 480px)">
    <!-- 印刷用のCSS -->
    <link rel="stylesheet" href="print.css" media="print">
    ```
    
- **`<script>`**
    
    JavaScriptファイルを外部から読み込む、またはスクリプトを直接記述する。
    
    ```markup
    <!-- 外部JavaScriptファイルの読み込み -->
    <script src="main.js" defer></script>
    <script src="analytics.js" defer></script>
    ```
    

<aside>
💡

CSSファイル・JavaScriptファイルは、1つのHTML文書に**複数読み込む**ことができる。

</aside>

---

## **2-2. グローバル属性（すべての要素に指定可能）**

特定の要素だけでなく、**HTMLのすべての要素に共通して指定できる属性**を「グローバル属性」と呼ぶ。

| 属性名 | 役割と特徴 | コード例 |
| --- | --- | --- |
| **`id`** | ページ内で**一意（ユニーク）**な識別子。同じid名を同一ページ内で重複指定することは禁止。<br>CSSの `#id` やJavaScript（`document.getElementById`）、ページ内リンク（アンカー）の目印として利用。 | `<section id="news">` |
| **`class`** | 要素の分類・グループ名。同一ページ内で**何度でも同じクラス名を使用可能**。半角スペースで区切ることで、1つの要素に複数のクラスを指定できる。 | `<p class="note alert">` |
| **`style`** | 要素にインラインでCSSを直接指定する。<br>※すべての要素に指定可能だが、保守性の観点から外部CSSが推奨される。 | `<p style="color: red;">` |
| **`title`** | 要素の補足説明。多くのブラウザでマウスカーソルを重ねた際にツールチップとして表示される。 | `<abbr title="World Wide Web">WWW</abbr>` |
| **`lang`** | その要素内のテキストの言語コードを指定する。部分的に他言語が混ざる場合に使用。 | `<span lang="en">Hello</span>` |
| **`hidden`** | 要素がまだ関連性を持たない、または不要であることを示し、ブラウザ上で非表示にする（論理属性）。 | `<div hidden>非表示の内容</div>` |
| **`data-*`** | 開発者が独自のデータを保持するための**カスタムデータ属性**。JavaScriptでのデータ取得・操作に頻繁に使われる。 | `<button data-user-id="123">` |
| **`tabindex`** | Tabキーによるフォーカス移動の順序や可否を制御する（`0` は順序通り、`-1` はプログラムからのみフォーカス可能）。 | `<div tabindex="0">` |

---

## **2-3. HTML5のコンテンツカテゴリと包含ルール**

HTML4以前の「ブロックレベル要素」「インライン要素」という単純な二元論は廃止され、HTML5以降は詳細な「**コンテンツカテゴリ**」によって分類されている。

![出典：https://vanillaice000.blog.fc2.com/blog-entry-1139.html](https://blog-imgs-161.fc2.com/v/a/n/vanillaice000/contentsmodel_mod.png)

出典：https://vanillaice000.blog.fc2.com/blog-entry-1139.html

### **【主要な7つのカテゴリ】**

| カテゴリ名 | 概要・主な要素 |
| --- | --- |
| **メタデータコンテンツ**<br>（Metadata） | 文書の環境設定や他の文書との関連を定義する（`<head>` 内の要素）。<br>・主な要素： **`base`, `link`, `meta`, `noscript`, `script`, `style`, `title`** |
| **フローコンテンツ**<br>（Flow） | `<body>` 内に現れる通常コンテンツのほとんどすべてが含まれる最上位カテゴリ。 |
| **セクショニングコンテンツ**<br>（Sectioning） | 文書のアウトライン（章、節、項などの論理的構造）を定義する要素。<br>・**`article`**, **`aside`**, **`nav`**, **`section` （この4つのみ）**<br><br>※注意： **`header`, `footer`, `main`** はセクショニングコンテンツには含まれない。 |
| **ヘッディングコンテンツ**<br>（Heading） | セクションの見出しを表す要素。<br>・主な要素： **`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`** |
| **フレージングコンテンツ**<br>（Phrasing） | 文章のテキストおよびテキストレベルのマークアップ（旧インライン要素に近い）。<br>・主な要素： **`span`, `a`, `img`, `strong`, `em`, `b`, `i`, `small`, `ruby`, `code`, `br`, `input`, `label`** |
| **エンベッディッドコンテンツ**<br>（Embedded） | 外部のリソース（画像、動画、外部文書など）をページ内に埋め込む要素。<br>・主な要素： **`img`, `video`, `audio`, `picture`, `iframe`, `canvas`, `svg`, `object`** |
| **インタラクティブコンテンツ**<br>（Interactive） | ユーザーの操作（クリック、入力など）を目的とした要素。<br>・主な要素： **`a`, `button`, `input`, `select`, `textarea`, `details`** |

### **【包含ルール（入れ子制限）】**

- **`p` 要素の中に配置できるもの →** 「**フレージングコンテンツ**」
    - ⭕️ 許可: `<span>`, `<a>`, `<img>`, `<strong>`, `<br>` など
    - ❌ 禁止: `<div>`, `<p>`, `<h1>〜<h6>`, `<ul>`, `<ol>`, `<table>` など
    
- **`span` 要素の中に配置できるもの →** 「**フレージングコンテンツ**」
    - ⭕️ 許可: `<a>`, `<strong>`, `<em>`, `<img>` など
    - ❌ 禁止: `<p>`, `<h1>`, `<ul>`, `<div>` など
    
- **`<a>` 要素の例外（トランスペアレントモデル）**:
    - HTML4まではブロック要素を `<a>` で囲むことは禁止されていたが、HTML5からは **`<a>` 要素で複数のブロック要素（`<div>`, `<h2>`, `<p>` など）やセクション全体を囲むことが公式に認められた**。

---

# **3. セマンティックWebと主要なHTML要素**

## **3-1. セマンティック（意味論的）マークアップとは**

**セマンティックマークアップ** とは、単に見栄え（太字にしたい、枠をつけたい）のためにタグを選ぶのではなく、**「その情報が持つ意味や役割」に合致した正しいタグを用いて構造化すること**。

- 見た目を装飾する目的（赤字にする、レイアウトを組む等）には必ず**CSS**を使用する。
- 意味のないグループ化（単なるレイアウトの都合）には `<div>` や `<span>` を使用する。

---

## **3-2. 構造・セクションを定義する要素**

| 要素名 | 役割・機能・配置ルール |
| --- | --- |
| **`<main>`**<br>（メインコンテンツ） | その文書の中心的・主題となるコンテンツを表す。<br><br>・**制約：** 同一ページ内に表示状態の **`<main>`** 要素は**原則として1つだけ**配置する。<br>・**`article`、`aside`、`footer`、`header`、`nav`** の子要素として配置してはならない。 |
| **`<header>`**<br>（ヘッダー） | 導入部やナビゲーションのグループを表す。ロゴ、見出し、検索フォームなどが含まれる。<br><br>・ページ全体の最上部だけでなく、**`<article>`** や **`<section>`** の導入部としても**同一ページ内に複数配置できる**。 |
| **`<footer>`**<br>（フッター） | 直近のセクションの結びを表す。著作者情報、関連リンク、コピーライトなどが含まれる。<br><br>・**`<header>`** と同様、ページ全体だけでなく、各記事（article）の末尾など**同一ページ内に複数配置できる**。 |
| **`<nav>`**<br>（ナビゲーション） | 現在のページまたは他のページへの**主要なナビゲーションリンクのセクション**を表す。<br><br>・サイト内のすべてのリンクを囲む必要はなく、グローバルナビゲーション、パンくずリスト、ページネーションなどの主要リンクに使う。 |
| **`<section>`**<br>（一般的なセクション） | 文書やアプリの機能的なまとまり（章、節、項など）を表す。<br><br>・そのセクションの主題を示す**見出し（`<h1>` 〜 `<h6>`）を伴う**ことが推奨される。<br>・単なるデザイン用・スタイリング用の枠組みには **`<section>`** ではなく **`<div>`** を使用する。 |
| **`<article>`**<br>（独立した記事） | それ単体で独立して成立し、外部に配布・再利用可能な完結したコンテンツを表す。<br><br>・具体例： ブログの記事、ニュース記事、フォーラムの投稿、商品カードなど。 |
| **`<aside>`**<br>（余談・補足情報） | メインコンテンツとは直接の関連性が薄く、切り離しても成立する補足情報・余談を表す。<br><br>・具体例： サイドバー、用語解説、広告枠、関連記事リンク集など。 |

---

## **3-3. テキスト・図版・注釈のセマンティック要素**

### **【 <h1> 要素 〜 <h6> 要素（見出し）】**

- `<h1>` が最上位で最も重要度が高く、`<h6>` が最下位。
- 適切な階層構造を守り、見出しレベルを飛ばさない（`<h1>` の次にいきなり `<h3>` を使わない）。

```markup
<!-- 適切な見出し階層の例（レベルを飛ばさずに順序正しくマークアップ） -->
<h1>Webデザイン学科</h1>
<section>
  <h2>カリキュラム紹介</h2>
  <p>1年次と2年次で段階的に学びを深めます。</p>
  
  <article>
	  <h3>前期の実習内容</h3>
	  <p>HTML Living Standardと最新CSSのコーディングを学びます。</p>
  </article>
  
  <article>
	  <h3>後期の授業計画</h3>
	  <p>JavaScriptによる動的なWebサイト制作とUIデザインを習得します。</p>
  </article>
</section>

<section>
	<h2>講師紹介</h2>
  <p>業界の第一線で活躍するプロフェッショナルが指導します。</p>
</section>
```

### **【 <figure> 要素 と <figcaption> 要素】**

| 要素名 | 役割・機能 |
| --- | --- |
| **`<figure>`** | 本文から参照される独立した図版（写真、図表、挿絵、コードなど）をまとめる。 |
| **`<figcaption>`** | 図版の**キャプション（表題・説明文）** を表し、`<figure>` の最初または最後の子要素として1つだけ配置できる。 |

```markup
<figure>
  <img src="flower.jpg" alt="満開の桜">
  <figcaption>図1: 春の桜並木</figcaption>
</figure>
```

### **【 <blockquote> 要素 と <cite> 要素】**

| 要素名 | 役割・機能 |
| --- | --- |
| **`<blockquote>`** | 外部からの長い引用・抜粋文を表す（ブロックレベル）。引用元URLは **`cite`** 属性で指定できる。 |
| **`<cite>`** | 作品のタイトル（本の題名、論文名、Webサイト名等）や出典を表す（作者名・人物名そのものには使わない）。 |

```markup
<!-- blockquote（引用文）と cite（引用元の作品名・出典） -->
<blockquote cite="https://example.com/web-history">
  <p>ウェブはすべての人にとってアクセシブルでなければならない。</p>
</blockquote>
<p>出典：<cite>ティム・バーナーズ＝リーの言葉</cite></p>
```

### **【 <strong> 要素 と <b> 要素 の違い】**

| 要素名 | 役割・機能 |
| --- | --- |
| **`<strong>`** | 内容の**強い重要性、深刻さ、緊急性**を表す。 |
| **`<b>`** | 重要性の意味を持たず、実用的な目的で**他と区別して目立たせる**ために太字にする（キーワード、製品名など）。 |

```markup
<!-- strong: 警告や重要性（音声読み上げや意味論で重視される） -->
<p><strong>注意：</strong>提出期限を過ぎた課題は受理されません。</p>

<!-- b: 重要な意味を持たないが、他と区別して目立たせる太字 -->
<p>当学科では <b>HTML</b>、<b>CSS</b>、<b>JavaScript</b> を学びます。</p>
```

### **【 <em> 要素 と <i> 要素 の違い】**

| 要素名 | 役割・機能 |
| --- | --- |
| **`<em>`** | 文脈における**強調・アクセント（強勢）**を表す（音声読み上げで強く発音される）。 |
| **`<i>`** | 強調の意味を持たず、学名、専門用語、慣用句、思考などを斜体で示す。 |

```markup
<!-- em: 文脈での強勢・アクセント（音声読み上げで強調される） -->
<p><em>あなた</em>がそれを実行しなければなりません。</p>

<!-- i: 学名、専門用語、慣用句などの斜体表記 -->
<p>猫の学名は <i>Felis catus</i> です。</p>
```

### **【 <mark> 要素】**

- ユーザーの操作や検索に関連して、**参照用にハイライト（蛍光ペンでマーク）されたテキスト**を表す。

```markup
<!-- 検索結果キーワードのハイライト表示など -->
<p>「Web」の検索結果：HTMLは<mark>Web</mark>ページを作成するための言語です。</p>
```

### **【 <small> 要素】**

- 免責条項、警告、法的制約、著作権表示などの**細則（サイドコメント・スモールプリント）**を表す。
- 単に「文字を小さくしたい」という理由で使ってはならない（文字サイズ変更はCSS）。

```markup
<!-- 細則・免責事項・著作権表示（単に文字を小さくする目的ではない） -->
<p>受講料の分割払いが可能です。<br>
<small>※分割手数料はお客様のご負担となります。</small></p>

<small>&copy; 2026 Trident College. All Rights Reserved.</small>
```

### **【 <time> 要素】**

- 日時や時間を表す。`datetime` 属性で機械が正確に読み取れる形式（ISO 8601形式: `YYYY-MM-DD` 等）を指定する。

```markup
<!-- 日付のみ -->
<time datetime="2026-10-04">2026年10月4日</time>

<!-- 日時（日付＋時刻） -->
<time datetime="2026-10-04T15:00">2026年10月4日 15:00</time>
```

### **【 <address> 要素】**

- その文書や直近の `<article>` の**著作者・管理者の連絡先情報**を表す。住所だけでなくメールアドレスや問い合わせフォームへのリンクを含む。単なる地理的な所在地住所には使わない。

```markup
<footer>
  <address>
    お問い合わせ：<a href="mailto:info@example.com">info@example.com</a><br>
    所在地：愛知県名古屋市中村区名駅X-X-X トライデントビル
  </address>
</footer>
```

### **【 <hr> 要素】**

- 段落レベルでの**テーマの区切り・場面転換**を表す（単なる装飾の水平線ではない）。

```markup
<p>第1章ではマークアップの歴史とWeb標準の変遷について学びました。</p>

<hr> <!-- 話題やテーマの区切り・場面転換 -->

<p>第2章では、実践的なCSSレイアウト手法に進みます。</p>
```

### **【 <pre> 要素 と <code> 要素】**

| 要素名 | 役割・機能 |
| --- | --- |
| **`<code>`** | プログラムのソースコードやコマンド名を表す。 |
| **`<pre>`** | 整形済みテキスト。HTMLファイル内の改行や連続した半角スペースをそのまま画面に反映して表示する。 |

```markup
<!-- インラインでコードを示す場合（code単体） -->
<p>改行には <code>&lt;br&gt;</code> 要素を使用します。</p>

<!-- 複数行のプログラムコードをそのまま表示する場合（pre と code の組み合わせ） -->
<pre>
	<code>function hello() {
	console.log("Hello, World!");
}</code>
</pre>
```

---

## **3-4. 廃止された要素（HTML Living Standardで削除）**

HTML Living Standardでは、「見た目（体裁・装飾）」を直接指定する古い要素は**完全に廃止（仕様から削除）**された。

これらを現在使用すると文法違反となる。

| 廃止された要素 | かつての役割 |
| --- | --- |
| **`<center>`** | コンテンツの中央揃え |
| **`<font>`** | 文字の色、サイズ、フォント指定 |
| **`<big>`** | 文字サイズを大きくする |
| **`<tt>`** | テレタイプ（等幅）フォント表示 |
| **`<strike>`** | 取り消し線を表示 |
| **`<frame><frameset><noframes>`** | 画面を複数に分割して別ページを表示するフレーム機能 |

```markup
<!-- ❌ 非推奨・廃止された古い書き方（HTMLタグで見た目を装飾） -->
<!-- <center><font color="red">重要なお知らせ</font></center> -->

<!-- ⭕ 現代のWeb標準（HTMLで意味・構造を定義し、装飾はCSSで行う） -->
<p class="notice">重要なお知らせ</p>
```

---

# **4. 実務＆試験必須の未習HTML要素**

## **4-1. テーブル（表組み）関連要素**

テーブルは「表形式のデータ（行列の関係性を持つデータ）」を表現するための要素。レイアウト目的で使用してはならない。

### **【主要タグの役割】**

| 要素名 | 主な役割・機能 |
| --- | --- |
| **`<table>`** | 表全体を定義するコンテナ。 |
| **`<caption>`** | 表の**タイトル・表題**。必ず `<table>` の**最初の子要素**として配置する。 |
| **`<tr>`** | 表の「行（Table Row）」を定義する。 |
| **`<th>`** | 表の「見出しセル（Table Header）」を定義する。デフォルトで太字・中央揃えになる。 |
| **`<td>`** | 表の「データセル（Table Data）」を定義する。 |
| **`<thead>`, `<tbody>`, `<tfoot>`** | 表のヘッダー行グループ、本体行グループ、フッター行グループを構造的にグループ化する要素。 |

```markup
<table>
  <caption>月別売上実績</caption>
  <thead>
    <tr>
      <th scope="col">月</th>
      <th scope="col">売上額</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">4月</th>
      <td>1,000,000円</td>
    </tr>
    <tr>
      <th scope="row">5月</th>
      <td>1,200,000円</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">合計</th>
      <td>2,200,000円</td>
    </tr>
  </tfoot>
</table>
```

### **【テーブル関連の主要属性（セル結合・見出し範囲）】**

| 属性名 | 主な役割・機能 |
| --- | --- |
| **`colspan="数値"`** | セルを横方向（列方向）に結合。 |
| **`rowspan="数値"`** | セルを縦方向（行方向）に結合。 |
| **`scope` 属性** | 見出しセル（**`<th>`**）がどのデータセルに対する見出しであるかを支援技術等に明示する属性。

・**`scope="col"`**：そのセルが「列（縦方向・カラム）」の見出しであることを示す。
・**`scope="row"`**：そのセルが「行（横方向・ロー）」の見出しであることを示す。 |

```markup
<!-- scope, colspan, rowspan の活用例 -->
<table border="1">
  <caption>学科別カリキュラムと定員</caption>
  <thead>
    <tr>
      <!-- rowspan="2": 縦に2行分結合 / scope="col": 列の見出し -->
      <th scope="col" rowspan="2">学科名</th>
      <!-- colspan="2": 横に2列分結合 -->
      <th scope="col" colspan="2">授業内容</th>
      <th scope="col" rowspan="2">定員</th>
    </tr>
    <tr>
      <th scope="col">前期</th>
      <th scope="col">後期</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- scope="row": 行の見出し -->
      <th scope="row">Webデザイン学科</th>
      <td>HTML / CSS基礎</td>
      <td>UIデザイン・JavaScript</td>
      <td>30名</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">合計</th>
      <!-- colspan="3": 横に3列分結合 -->
      <td colspan="3">1学科 / 30名</td>
    </tr>
  </tfoot>
</table>
```

---

## **4-2. フォーム関連要素と属性**

ユーザーからデータを受け取り、サーバーへ送信するための対話的インターフェース。

### **【 <form> 要素の基本規則】**

| 原則・規則 | 仕様 |
| --- | --- |
| **入れ子の禁止** | `<form>` の中に別の `<form>` を配置することは文法上禁止。 |
| **DOM操作の可否** | JavaScript / DOM (Document Object Model) でのアクセスや操作が可能（`document.forms` やイベント処理）。 |
| **配置可能な要素** | 入力部品だけでなく、見出し（`<h1>`〜`<h6>`）や段落（`<p>`）などのフローコンテンツも自由に配置できる。 |
| **タグの省略不可** | 開始タグおよび終了タグの省略は文法上認められていない（省略不可）。 |

### **【 <form> 要素の主要属性】**

| 属性名 | 役割・機能 | 値 |
| --- | --- | --- |
| **`action` 属性** | 入力データを送信するプログラムを指定する。 | URL |
| **`method` 属性** | 送信方式（HTTPメソッド）を指定する。 | ・**`get`**：送信データをURLの末尾にクエリ文字列（`?name=value`）として付加して送信。検索フォームなどに使用。URLに表示されるためパスワード等の機密データには不適。<br>・**`post`**：送信データをHTTPリクエストの本文（ボディ）に含めて送信。個人情報、パスワード、大容量データの送信に使用。 |

```markup
<!-- 検索フォーム（GET方式: URL末尾に ?keyword=... としてパラメータ送信） -->
<form action="/search" method="get">
  <input type="search" name="keyword" placeholder="検索キーワード">
  <button type="submit">検索</button>
</form>

<!-- お問い合わせ・ログイン（POST方式: HTTPリクエスト本文にデータを含めて送信） -->
<form action="/contact" method="post">
  <input type="text" name="username" placeholder="お名前">
  <button type="submit">送信</button>
</form>
```

### **【 <label> 要素（ラベル）】**

入力部品とテキストを関連付ける。ラベルテキストをクリックしても入力部品にフォーカスが当たるため、アクセシビリティ・操作性が大幅に向上する。

- **関連付けの方法①（for属性方式）**:
    
    `<label for="user-email">メールアドレス</label><input type="email" id="user-email" name="email">`
    （※`label` の `for` 属性値と、`input` の `id` 属性値を一致させる）
    
- **関連付けの方法②（内包方式）**:
    
    `<label><input type="checkbox" name="agree"> 利用規約に同意する</label>` 
    

```markup
<!-- 関連付けの方法①（for属性方式: labelのfor属性とinputのid属性を一致させる） -->
<label for="user-email">メールアドレス</label>
<input type="email" id="user-email" name="email">

<!-- 関連付けの方法②（内包方式: inputをlabelで囲む） -->
<label>
  <input type="checkbox" name="agree" value="yes"> 利用規約に同意する
</label>
```

### **【 <input> 要素の主要な type 属性】**

`<input>` は終了タグのない空要素。`type` 属性によって外見と機能が劇的に変化する。

| type 値 | 外見と動作 |
| --- | --- |
| **`text`** | 1行の自由テキスト入力欄（デフォルト）。 |
| **`password`** | パスワード入力用。入力文字が伏字（●や*）で隠される。 |
| **`radio`** | **ラジオボタン（単一選択）**。**同じ `name` 属性を持つグループの中で1つだけ**選択できる。 |
| **`checkbox`** | **チェックボックス（複数選択）**。複数の項目を独立してON/OFF選択できる。 |
| **`submit`** | 送信ボタン。クリックするとフォームのデータをaction先へ送信する。 |
| **`button`** | 何もしない汎用ボタン。JavaScriptのクリックイベント（`onclick`）と組み合わせて使用。 |
| **`reset`** | フォーム内のすべての入力項目を初期値にリセットするボタン。 |
| **`hidden`** | 画面上には**一切表示されない隠しフィールド**。ユーザーに見せずに管理用データやIDをサーバーに送信する。 |
| **`file`** | ファイル選択ダイアログを表示し、ファイルをアップロードする。 |
| **`email`** | メールアドレス入力欄。送信時に形式（`@` が含まれるか等）を自動検証。スマホで英字キーボードを表示。 |
| **`tel`** | 電話番号入力欄。スマートフォンで数字テンキーキーボードが自動表示される。 |
| **`number`** | 数値専用入力欄。スピンボタン（上下矢印）が表示される。`min`, `max`, `step` 属性で制御。 |
| **`date`** | 日付入力欄。ブラウザ標準のカレンダーピッカーから選択できる。 |

```markup
<!-- テキスト・パスワード入力 -->
<div>
  <label for="user-name">氏名:</label>
  <input type="text" id="user-name" name="name" placeholder="山田 太郎">
</div>
<div>
  <label for="user-pass">パスワード:</label>
  <input type="password" id="user-pass" name="pass">
</div>

<!-- ラジオボタン（同じname属性でグループ化し、単一選択） -->
<p>学年:</p>
<label><input type="radio" name="grade" value="1" checked> 1年生</label>
<label><input type="radio" name="grade" value="2"> 2年生</label>

<!-- チェックボックス（独立して複数選択可能） -->
<p>興味のある分野:</p>
<label><input type="checkbox" name="skill" value="html" checked> HTML</label>
<label><input type="checkbox" name="skill" value="css"> CSS</label>
<label><input type="checkbox" name="skill" value="js"> JavaScript</label>

<!-- 数値・日付入力 -->
<div>
  <label for="quantity">数量:</label>
  <input type="number" id="quantity" name="quantity" min="1" max="10" step="1" value="1">
</div>
<div>
  <label for="date">予約日:</label>
  <input type="date" id="date" name="date">
</div>

<!-- ファイル選択 -->
<div>
  <label for="upload">作品ファイル:</label>
  <input type="file" id="upload" name="upload" accept=".zip,.pdf">
</div>

<!-- 画面に表示されない隠しフィールド（IDやトークンの送信に使用） -->
<input type="hidden" name="token" value="sec_token_98765">
```

### **【 <select> 要素 と <option> 要素（セレクトボックス）】**

ドロップダウン形式で選択肢を提示する。

| 要素 / 属性 | 役割・機能 |
| --- | --- |
| **`<select>`** | セレクトボックス全体を定義。 |
| **`<option>`** | 選択肢の項目。`value` 属性にサーバーへ送信される値を記述。 |
| **`<optgroup>`** | 選択肢を論理的なグループにまとめる（`label` 属性でグループ名を表示）。 |
| **`selected` 属性** | 初期状態で選択済みにしておく論理属性。 |
| **`disabled` 属性** | その選択肢をグレーアウトして選択不可にする論理属性。 |

```markup
<label for="course-select">希望コース:</label>
<select id="course-select" name="course">
  <!-- disabled selected で選択促進のプレースホルダーにする -->
  <option value="" disabled selected>選択してください</option>
  <optgroup label="デザイン分野">
    <option value="web-design">Webデザイン専攻</option>
    <option value="ui-ux">UI/UX専攻</option>
  </optgroup>
  <optgroup label="開発分野">
    <option value="frontend">フロントエンド専攻</option>
    <option value="backend">バックエンド専攻</option>
  </optgroup>
</select>
```

### **【 <textarea> 要素（複数行テキスト入力）】**

- `<input type="text">` と異なり、**終了タグ（`</textarea>`）が必須**。
- 初期値を設定する場合は、開始タグと終了タグの間にテキストを記述する（`value` 属性は使用しない）。
- `rows`（表示行数）、`cols`（1行あたりの文字幅）属性でサイズを指定できる（CSSで制御することも多い）。

```markup
<label for="inquiry-body">お問い合わせ内容（必須）:</label><br>
<!-- value属性ではなく、開始タグと終了タグの間に初期値を記述 -->
<textarea id="inquiry-body" name="inquiry" rows="5" cols="40" placeholder="お問い合わせ内容をご入力ください" required></textarea>
```

### **【 <button> 要素】**

- クリック可能なボタンを作成する。`<input type="submit">` と異なり、ボタンの中に画像（`<img>`）やアイコン、装飾タグを含められる。
- **注意点**： `<button>` の `type` 属性のデフォルト値は `submit` である。form内に置くと指定なしでも送信ボタンとして動作するため、スクリプト実行用ボタンには必ず `type="button"` を明記する。

```markup
<!-- フォーム送信ボタン（type省略時はデフォルトで submit になる） -->
<button type="submit">
  <span>送信する</span>
</button>

<!-- スクリプト実行用ボタン（誤送信を防ぐため必ず type="button" を指定） -->
<button type="button" onclick="alert('下書きを保存しました')">
  下書き保存
</button>

<!-- 入力リセットボタン -->
<button type="reset">
  入力をクリア
</button>
```

### **【 <fieldset> 要素 と <legend> 要素】**

| 要素 | 役割・機能 |
| --- | --- |
| **`<fieldset>`** | フォーム内の複数の入力項目を論理的なグループとして枠線で囲む。 |
| **`<legend>`** | `<fieldset>` の**最初の子要素**として配置し、そのグループのタイトル（凡例）を表示する。 |

```markup
<fieldset>
  <legend>お届け先情報</legend>
  <div>
    <label for="ship-name">宛名:</label>
    <input type="text" id="ship-name" name="ship_name">
  </div>
  <div>
    <label for="ship-zip">郵便番号:</label>
    <input type="text" id="ship-zip" name="ship_zip">
  </div>
</fieldset>
```

### **【入力制御・検証用属性】**

| 属性名 | 役割・機能 |
| --- | --- |
| **`required`** | 入力必須にする論理属性。未入力のまま送信しようとするとブラウザが警告を出す。 |
| **`placeholder`** | 入力欄に薄い文字で表示するヒントや入力例。※ラベルの代わりにしてはならない。 |
| **`disabled`** | 要素を無効化する。選択や入力ができなくなり、**値もサーバーに送信されない**。 |
| **`readonly`** | 読み取り専用にする。編集はできないが、**値はサーバーに送信される**。 |
| **`maxlength` / `minlength`** | 入力可能な最大・最小文字数。 |
| **`autofocus`** | ページ読み込み時に自動でその入力欄にカーソル（フォーカス）を当てる。 |

```markup
<!-- required: 必須 / placeholder: 入力例 / autofocus: 自動フォーカス -->
<input type="text" name="user_id" required autofocus placeholder="半角英数字8文字以上" minlength="8" maxlength="20">

<!-- readonly: 読み取り専用（編集不可だが値はサーバーに送信される） -->
<input type="text" name="account_type" value="正会員" readonly>

<!-- disabled: 無効化（編集不可で値もサーバーに送信されない） -->
<input type="submit" value="受付停止中" disabled>
```

---

## **4-3. ルビ（ふりがな）関連要素**

日本語や東アジアの言語で、漢字の読み仮名（ルビ）を表示するための専用タグ。

| 要素 | 役割・機能 |
| --- | --- |
| **`<ruby>`** | ルビを振る対象のテキスト全体を囲む。 |
| **`<rt>`**<br>（Ruby Text） | ルビ文字（ふりがな本体）を定義する。通常、親文字の上部に小さく表示される。 |
| **`<rp>`**<br>（Ruby Parentheses） | ルビ非対応の古いブラウザ向けに、ルビを丸括弧などで囲んで表示するための代替指定。<br>ルビ対応ブラウザでは `<rp>` の中身は画面に表示されない。 |

```markup
<ruby>
  漢<rp>（</rp><rt>かん</rt><rp>）</rp>
  字<rp>（</rp><rt>じ</rt><rp>）</rp>
</ruby>
```

---

## **4-4. リスト関連要素の整理**

| 要素 / 属性 | 役割・機能 |
| --- | --- |
| **`<ul>`**<br>（Unordered List） | 順序に意味がない箇条書きリスト。通常、黒丸（行頭文字）で表示される。 |
| **`<ol>`**<br>（Ordered List） | 手順やランキングなど、**順序に意味がある番号付きリスト**。<br><br>・`type` 属性: マーカーの種類（`1`: 数字、`a`: 小文字英字、`A`: 大文字英字、`i`: 小文字ローマ数字、`I`: 大文字ローマ数字）<br>・`start` 属性: 開始番号（例: `start="5"` で5から開始）<br>・`reversed` 属性: カウントダウン（逆順）で番号をつける論理属性 |
| **`<li>`**<br>（List Item） | リストの各項目を表す。`<ul>` または `<ol>` の直下に配置する。 |
| **`<dl>`, `<dt>`, `<dd>`**<br>（説明リスト / 定義リスト） | 用語とその説明、Q&A、メタデータのキー＆バリューなどを表す。<br><br>・**`<dl>`（Description List）**: リスト全体<br>・**`<dt>`（Description Term）**: 用語・項目・質問<br>・**`<dd>`（Description Details）**: 用語の説明・定義・回答<br><br>※1つの `<dt>` に対して複数の `<dd>` を持たせることも可能 |

```markup
<!-- ul: 順序のない箇条書きリスト -->
<ul>
  <li>HTML Living Standard</li>
  <li>CSS3 / 最新仕様</li>
  <li>JavaScript</li>
</ul>

<!-- ol: 順序のある番号付きリスト（start属性、type属性、reversed属性など） -->
<ol start="1" type="1">
  <li>要件定義・企画</li>
  <li>ワイヤーフレーム制作</li>
  <li>HTML/CSSコーディング</li>
  <li>動作検証・公開</li>
</ol>

<!-- dl / dt / dd: 説明・定義リスト（用語説明、Q&A、会社概要など） -->
<dl>
  <dt>Web標準</dt>
  <dd>Webの技術仕様を世界共通で利用できるように定めた国際標準規格。</dd>
  
  <dt>WHATWG</dt>
  <dd>Apple、Mozilla、Googleなどのブラウザベンダーによって設立された標準化団体。</dd>
  <dd>HTML Living Standardの策定とメンテナンスを担当している。</dd>
</dl>
```

---

## **4-5. 埋め込みコンテンツ関連要素（iframe / video / audio）**

外部のWebページやマルチメディア（動画・音声）データをHTML文書内に直接埋め込んで再生・表示するための要素。

### **【 <iframe> 要素（インラインフレーム）】**

現在のHTML文書の中に、**別のHTML文書（外部Webページ）や外部コンテンツ（YouTube動画、Googleマップなど）を矩形領域として埋め込む**要素。

| 属性名 | 役割・機能 |
| --- | --- |
| **`src` 属性** | 埋め込むWebページのURLやコンテンツのパスを指定する。 |
| **`title` 属性** | スクリーンリーダー利用者がそのフレームの内容を理解できるよう、簡潔な説明文を記述する。<br><br>例： `title="会社所在地マップ"` |
| **`width` / `height` 属性** | フレームの幅と高さを指定する（CSSでも制御可能）。 |
| **`loading="lazy"` 属性** | 画面外のiframeの読み込みを遅延させ、ページ全体の初期表示速度を向上させる。 |

```markup
<!-- Googleマップや外部ページの埋め込み例 -->
<iframe
  src="https://www.google.com/maps/embed?..."
  width="600"
  height="450"
  style="border:0;"
  loading="lazy"
  title="トライデントコンピュータ専門学校のアクセスマップ">
</iframe>

<!-- YouTube動画の埋め込み例 -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/xxxxxx"
  title="学科紹介プロモーション動画"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

<aside>
⚠️

**注意：廃止された `<frame>` との違い**

画面全体を分割する `<frame>`、`<frameset>`、`<noframes>` はHTML Living Standardで**完全廃止**された。

</aside>

### **【 <video> 要素（動画の埋め込み）】**

HTML文書内に動画プレイヤーを埋め込んで再生するための専用要素。HTML5以前のようにFlashなどの外部プラグインを必要とせず、ブラウザ標準で動画を再生できる。

| 属性 / 要素 | 役割・機能 |
| --- | --- |
| **`controls` 属性** | 再生・一時停止ボタン、シークバー、音量調節などの**標準再生コントロールUIを表示する**論理属性。<br>これを指定しないと操作パネルが表示されない。 |
| **`autoplay` 属性** | 読み込み完了後に自動再生する論理属性。<br><br>※現在のモダンブラウザでは、ユーザー体験保護のため `muted` 属性を併用しないと自動再生がブロックされる。 |
| **`muted` 属性** | 初期状態で音声を消音（ミュート）にする論理属性。 |
| **`loop` 属性** | 動画終了後に最初から繰り返しループ再生する論理属性。 |
| **`poster` 属性** | 動画が読み込まれる前や再生開始前に表示しておく**サムネイル静止画像（ポスター画像）**のURLを指定する。 |
| **`<source>` 要素** | ブラウザによって再生可能な動画コーデックが異なる場合に対応するため、複数のフォーマット（MP4, WebM等）を優先度順に提示する子要素。 |

```markup
<!-- video要素の基本的な書き方（controls属性の指定） -->
<video
  src="sample-movie.mp4"
  controls
  poster="thumbnail.jpg"
  width="640"
  height="360">
  <p>お使いのブラウザはvideoタグに対応していません。<a href="sample-movie.mp4">動画をダウンロード</a>してご覧ください。</p>
</video>

<!-- 複数フォーマット（WebM, MP4）に対応させた実務的な書き方 -->
<video controls poster="thumbnail.jpg" width="640" height="360">
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
  <p>動画を再生できる環境ではありません。</p>
</video>

<!-- 背景動画などに使われる「自動・ループ・消音」の指定 -->
<video autoplay loop muted playsinline width="100%">
  <source src="background.mp4" type="video/mp4">
</video>
```

### **【 <audio> 要素（音声の埋め込み）】**

HTML文書内に音声・BGM・ポッドキャストなどを埋め込んで再生するための専用要素。

| 属性 / 要素 | 役割・機能 |
| --- | --- |
| **`controls` 属性** | 再生・停止・音量調節などの操作UIを表示する論理属性。<br>`<video>` と同様、これを付与することでブラウザの音声プレイヤーが表示される。 |
| **`autoplay` 属性** | 自動再生を開始する（※ブラウザのポリシーにより無効化される場合が多い）。 |
| **`loop` 属性** | 音声を繰り返し再生する。 |
| **`muted` 属性** | 消音状態で読み込む。 |
| **`<source>` 要素** | MP3, AAC, Ogg, WAV などの複数形式を提示する。 |

```markup
<!-- audio要素の基本的な書き方（controls属性の指定） -->
<audio controls>
  <source src="interview.mp3" type="audio/mpeg">
  <source src="interview.ogg" type="audio/ogg">
  <p>お使いのブラウザはaudioタグに対応していません。</p>
</audio>
```

---

# **5. CSSの優先順位と詳細度（Specificity）**

HTMLとCSSを組み合わせてスタイリングを行う際、同じ要素に対して競合するスタイルが指定された場合にどのルールが適用されるかを決定する仕組みを**カスケード（Cascade）**と呼ぶ。

## **5-1. カスケード（Cascade）と優先順位の基本4階層（強い順）**

同じ要素・プロパティに対して複数のCSSルールが競合した場合、ブラウザは以下の4原則（階層）に従って適用するスタイルを判定する。

1. **`!important` 宣言**: 通常のすべての詳細度やインラインスタイルを上書きして無条件で最優先適用される。
2. **インラインスタイル（HTMLタグ内の `style` 属性）**: `<p style="...">` の直接指定。外部CSSファイルや `<style>` タグ内の記述よりも優先度が高い。
3. **セレクタの詳細度（Specificity）が高いもの**: IDセレクタ、クラスセレクタ、要素セレクタなどの重み付け計算（詳細度ポイント）によって決定される。
4. **ソースコードの後勝ち（記述順序）**: セレクタの詳細度が全く同一の場合、CSSファイル内で**後（下）に記述されたルールが優先**される。

---

## **5-2. セレクタの詳細度（Specificity）の計算規則**

詳細度は **「4つの桁 `(インライン, ID, クラス等, 要素等)`」** または **「ポイント換算（1000点 / 100点 / 10点 / 1点）」** で計算される。

**詳細度計算の鉄則（繰り上がりなし）「下の桁がいくら集まっても、上の桁の1個には絶対に勝てない」** という原則がある。
例えば、クラスセレクタ（10点）をどれだけ多く連結（11個以上重ねても）しても、IDセレクタ（100点）が1つ指定されたルールに勝つことはできない。

| 優先度レベル | 対象となるセレクタ・指定 | 具体例 | 配点（目安） | 4桁表記 |
| --- | --- | --- | --- | --- |
| **最上位** | **`!important`** | `color: red !important;` | **無条件最優先** | — |
| **A（千の位）** | **インラインスタイル** | `<p style="color: blue;">` | **1000点** | `(1, 0, 0, 0)` |
| **B（百の位）** | **IDセレクタ** | `#main`, `#header` | **100点** | `(0, 1, 0, 0)` |
| **C（十の位）** | **クラスセレクタ / 属性セレクタ / 疑似クラス** | `.btn`, `[type="text"]`, `:hover`, `:nth-child()` | **10点** | `(0, 0, 1, 0)` |
| **D（一の位）** | **要素（タイプ）セレクタ / 疑似要素** | `p`, `div`, `h1`, `::before`, `::after` | **1点** | `(0, 0, 0, 1)` |
| **対象外（0点）** | **全称セレクタ（`*`） / 結合子（`>`, `+`, `~`, 半角空白）** | `*`, `>`, `+` | **0点** | `(0, 0, 0, 0)` |

### 【**詳細度計算の実例と比較（競合シミュレーション）**】

```css
/* ① 要素セレクタのみ: 1点 (0, 0, 0, 1) */
p {
  color: black;
}

/* ② クラスセレクタ + 要素セレクタ: 11点 (0, 0, 1, 1) → ①に勝つ */
p.intro {
  color: green;
}

/* ③ クラスを複数重ねた指定: 21点 (0, 0, 2, 1) → ②に勝つ */
div.container p.intro {
  color: blue;
}

/* ④ IDセレクタを含む指定: 101点 (0, 1, 0, 1) → ③に圧勝！ */
/* ※クラスが何個あっても、IDセレクタ（百の位）を含むルールが勝つ */
#content p {
  color: purple;
}

/* ⑤ インラインスタイル: 1000点 (1, 0, 0, 0) → 外部CSSの④に勝つ */
/* 例: <p id="content" style="color: orange;"> ... </p> */

/* ⑥ !important: 最強 → インラインスタイルの⑤すら上書きする */
p {
  color: red !important;
}
```

[Specificity Calculator](https://specificity.keegan.st/)