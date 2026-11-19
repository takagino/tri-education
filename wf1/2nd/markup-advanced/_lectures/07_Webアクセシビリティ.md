# 07_Webアクセシビリティ

### HTML+CSS（火1-2 / 水1）

[00_導入](https://app.notion.com/p/00_-3c8bdf471aca80e3a92afe2bc6031e14?pvs=21)

[01_**環境設定と確認課題**](https://app.notion.com/p/01_-3f0bdf471aca80d0b9acf946b73cceaf?pvs=21)

[**02_CSS設計とBEM**](https://app.notion.com/p/02_CSS-BEM-3f1bdf471aca80f7b23cc380f650eb0f?pvs=21)

[03_CSSプリプロセッサ](https://app.notion.com/p/03_CSS-3f1bdf471aca801aaefedf63d430a800?pvs=21)

[04_相対単位の使い分け](https://app.notion.com/p/04_-405bdf471aca801e8053c3b9af7384d2?pvs=21)

[05_モダン・レスポンシブWebデザイン](https://app.notion.com/p/05_Responsive-41abdf471aca8033990ec380f650eb0f?pvs=21)

[06_Webサイトパフォーマンス](https://app.notion.com/p/06_Web-29fbdf471aca8041b8bcda0bb4a2bd70?pvs=21)

[**07_Webアクセシビリティ**](https://app.notion.com/p/07_Web-2a2bdf471aca800d889bc2e2857c3462?pvs=21)

---

# 1. はじめに（体験ワーク）

前回（`06_Webサイトパフォーマンス`）では、「速くて快適なサイト」を作るための計測手法と最適化を学びました。
今回学ぶ **「Webアクセシビリティ」** も、パフォーマンスと同じく **「すべてのユーザーに届けるためのWeb品質」** の柱です。

まずは知識を覚える前に、**「マウスが使えない」「画面が見えない」「色が区別しにくい」状況でWebサイトを使うとどうなるか** を実際に体験してみましょう。

---

## 1-1. キーボード操作体験（マウス・トラックパッド禁止）

**【ワークの目的】**
Webサイトは、マウスやトラックパッドを器用に動かせる人だけが利用するものではありません。
- 手に怪我をしている人、腱鞘炎の人
- 手の震えなどで細かいポインタ操作が難しい人
- スクリーンリーダー（画面読み上げソフト）を利用する視覚障害のある人

これらの方々は、キーボード（またはスイッチ等の入力機器）を使ってWebサイトを操作しています。あえてマウスを触らずに操作し、「どこに今フォーカスがあるか分かるか」「すべてのボタンが押せるか」を体験しましょう。

| キー操作 | 実行内容 |
| --- | --- |
| **`Tab`** | **次へ** 進む（リンクやボタン、入力欄へフォーカスを移動） |
| **`Shift + Tab`** | **前へ** 戻る（フォーカスを逆順に移動） |
| **`Enter`** | 決定する（リンク先へ移動、フォーム送信） |
| **`Space`** | 選択する（ボタンを押す、チェックボックスのON/OFF） |
| **`↑` `↓` `←` `→`** | セレクトボックスやラジオボタン内の移動 |
| **`Esc`** | 開いたメニューやモーダルダイアログを閉じる |

- **【お題01】**：[トライデントコンピュータ専門学校](https://computer.trident.ac.jp/) でキーボードだけで「学生作品ページ」にたどり着けるか試してみよう。
- **【お題02】**：[SmartHR（スマートHR）](https://smarthr.jp/) でキーボードだけでメニューを操作し、どこにフォーカスがあるか見えやすいか確認しよう。

---

## 1-2. スクリーンリーダー体験（デモ）

**【デモの目的】**
- 視覚から聴覚へ。Webサイトを「見る」のではなく「聞く」とき、情報体験がどう変わるかを知る。
- **「なぜ正しいHTMLタグ（`<header>`, `<main>`, `<h1>`, `alt`属性, `<button>`）を書かなければならないのか」** を耳で聞いて実感する。

**【Mac の標準スクリーンリーダー（VoiceOver）】**
- 起動・終了ショートカット：**`Command + F5`**

---

## 1-3. コントラストと色覚シミュレーション体験

**【ワークの目的】**
色覚特性を持つ人や弱視の人、あるいは「真夏の屋外でスマホの画面を見ている人」にとって、薄い文字色や「色だけ」に頼った表現は情報を完全に失う原因になります。

- **【悪い例（色だけに頼った情報）】**：[悪いコントラストと色に頼った例](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/accessibility/bad.html)
- **【良い例（色＋アイコン・コントラスト確保）】**：[良いコントラストと色に頼らない例](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/accessibility/good.html)

**【Chrome デベロッパー・ツールでの視覚障害エミュレート手順】**
1. Chrome検証ツールを開き、右上の「⋮」メニュー ＞ **「その他のツール（More tools）」＞「レンダリング（Rendering）」** を開く（または `Cmd + Shift + P` で `Rendering` を検索）。
2. 一番下にある **「視覚障害をエミュレート（Emulate vision deficiencies）」** から、「霧視（ぼやけた視界）」「1型2色覚」「2型2色覚」「全色盲」を順番に選んで、上記の「悪い例 / 良い例」がどう見えるか比較しよう。

---

# 2. Webアクセシビリティの基礎と2026年の基準

## 2-1. Webアクセシビリティとは？

先ほどのワークで感じた「伝わらない」「操作できない」「区別がつかない」という障壁をなくす取り組みが **Webアクセシビリティ（略称：`a11y`）** です。

> **利用者の障害の有無やその程度、年齢や利用環境にかかわらず、ウェブで提供されている情報やサービスを利用できること、またはその到達度を意味しています。**
> *（デジタル庁「ウェブアクセシビリティ導入ガイドブック」より）*

### なぜ2026年現在、実務で必須スキルになっているのか？
かつてアクセシビリティは「余裕があればやるやさしい配慮」と捉えられがちでした。しかし現在は状況が一変しています。
1. **法制化・義務化の潮流：** 日本では2024年4月に改正障害者差別解消法が施行され、民間事業者にも「合理的配慮の提供」が義務化されました（欧州でも2025年にEAAが施行）。
2. **「やさしい」ではなく「品質・設計」の問題：** スマートフォンでの片手操作、屋外の画面反射、一時的な怪我など、**あらゆる人が一時的・状況的な制約を受ける** ため、アクセシビリティ対応はすべてのユーザーの使いやすさ（UX）とSEO評価を同時に引き上げます。

---

## 2-2. Webアクセシビリティの「ものさし」（WCAG 2.2 と達成基準）

アクセシビリティの高さを測るための世界共通の基準が **WCAG（Web Content Accessibility Guidelines）** です。現在は **WCAG 2.2** が最新の標準基準となっており、日本の国家規格（**JIS X 8341-3**）もこれに準拠しています。

- [WCAG 2.2 日本語訳（WAIC）](https://waic.jp/translations/WCAG22/)

### 達成等級（どこまでやるか？）

| 等級 | 意味 | 現場での目標 |
| --- | --- | --- |
| **レベル A** | 最低限クリアすべき基準 | これが満たせないと利用不可能なユーザーが出る絶対ライン |
| **レベル AA** | **私たちが目指すべき世界標準** | **日本の企業サイト・官公庁・進級展で目指す標準ライン** |
| **レベル AAA** | 極めて高い基準 | 専門的な福祉サイト・公共機関の一部で求められる最高レベル |

### WCAG 2.2 で特に意識したい重要ポイント
WCAG 2.2 では、スマートフォン操作やキーボード操作に関する実用的な基準が強化されています。
- **フォーカスが隠れないこと（2.4.11）：** `Tab` キーで移動したフォーカス先が、固定ヘッダーや追従バナーの下に隠れて見えない状態をなくす。
- **ターゲットのサイズ（2.5.8）：** ボタンやリンクのタップ領域は最小でも `24px × 24px` 以上（推奨は `44px〜48px`）を確保する。
- **ドラッグ操作の代替（2.5.7）：** スライダーや並び替えなどドラッグ操作が必要なUIには、クリック/タップだけでも操作できるボタンを用意する。

---

## 2-3. アクセシビリティの検証・チェックツール

| ツール種別 | ツール名 | できること |
| --- | --- | --- |
| **Chrome内蔵** | **Lighthouse（Accessibility）** | 自動検出できるアクセシビリティエラーを0〜100点で採点・指摘 |
| **Chrome内蔵** | **Elements ＞ Accessibility タブ** | スクリーンリーダーが各要素を「何という名前・役割で認識しているか」を確認 |
| **Chrome拡張機能** | **[axe DevTools](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)** | 実務の現場で最も使われている詳細なアクセシビリティ自動診断ツール |
| **Chrome拡張機能** | **[HeadingsMap](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=ja)** | ページ内の `h1`〜`h6` 見出し構造（目次）に飛び級や抜けがないか一目で確認 |

### 参考になる国内ガイドライン・ギャラリー
- [ウェブアクセシビリティ導入ガイドブック｜デジタル庁](https://www.digital.go.jp/resources/introduction-to-web-accessibility-guidebook)
- [デジタル庁デザインシステム（HTML実装コンポーネント集）](https://design.digital.go.jp/dads/html/?path=/docs/documents-%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB--docs)
- [freeeアクセシビリティー・ガイドライン](https://a11y-guidelines.freee.co.jp/)
- [SmartHR ACCESSIBILITY](https://accessibility.smarthr.co.jp/)
- [AAA11Y（アクセシビリティに優れた国内Webサイトギャラリー）](https://www.aaa11y.com/)

---

## 🛠 ハンズオン用サンプルデータの準備と Step 0（Before計測）

本単元では、アクセシビリティ上の問題をあえて仕込んだサンプルサイト **`accessibility-handson`**（MORI LIBRARY）を、**Lighthouse（Accessibility）** と **キーボード操作** で確認しながら順番に改善していきます。

まずはGoogleドライブから **`accessibility-handson`** フォルダをダウンロードし、普段の授業用フォルダに配置してVS Codeで開きましょう。

[HTML+CSS - Google Drive](https://drive.google.com/drive/folders/1TerVbEHQw_gibRX-d6709S3wUu9QeoBk?usp=sharing)

- **ハンズオン作業用フォルダ**：`accessibility-handson/starter/`（改善前のサイト）
- **完成見本フォルダ**：`accessibility-handson/completed/`（改善後のサイト）

**【見本リンク】**
- [MORI LIBRARY（改善前：starter）](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/accessibility-handson/starter/index.html)
- [MORI LIBRARY（改善後：completed）](https://takagino.github.io/tri-education/wf1/2nd/markup-advanced/accessibility-handson/completed/index.html)

### Step 0：改善前のサイトを計測・体験してみよう
1. `accessibility-handson/starter/index.html` を **Live Server** で起動し、Chromeの **シークレットウィンドウ（`Cmd + Shift + N`）** で開く。
2. **キーボード操作で確認：** マウスに触れず **`Tab` キーだけ** で操作してみよう。今どこにフォーカスがあるか見えない・ハンバーガーボタンやFAQが押せないことを確認しよう。
3. **Lighthouse（Accessibility）で計測：**
   - 検証ツールの「Lighthouse」タブで、カテゴリを **「ユーザー補助（Accessibility）」** にして分析を実行する。
   - 👉 `lang` 属性なし・`alt` なし・コントラスト比不足・`<label>` なし等の警告が出ていることを確認しよう！

---

# 3. 正しいHTMLを書く（セマンティクスと構造）

アクセシビリティ対応の基本は、何か特殊な裏技を使うことではありません。**「正しいHTMLの意味（セマンティクス）に沿ってマークアップすること」** だけで、アクセシビリティ問題の約半分は自動的に解決します。

---

## 3-1. `lang` 属性と `<title>` を正しく設定する

- **`<html lang="ja">`**：ページの主要言語を指定します。これがないと、英語環境のスクリーンリーダーが日本語の文章を英語読みしてしまい、何を言っているか全く聞き取れなくなります。
- **`<title>` タグ**：スクリーンリーダーがページを開いた瞬間に**最初に読み上げる**情報です。下層ページでも全ページ同じタイトルにせず、`ページ名 | サイト名` のように固有のタイトルを付けます。

---

## 3-2. 「見出し（`h1`〜`h6`）」でページの目次を作る

スクリーンリーダーのユーザーの多くは、「見出しジャンプ」機能を使って、**新聞の見出しを斜め読みするように** ページ全体を把握します。

- 見た目（文字の大きさ）のためだけに `<h3>` や `<h4>` を使わず、必ず **`h1` ➔ `h2` ➔ `h3` の順** に階層を飛ばさずマークアップします（大きさはCSSのクラスで調整します）。
- 見出しの文字を画像（PNG等）にする場合は、必ず `alt` 属性に同じ見出しテキストを入れます。

---

## 3-3. 「ランドマーク」でページの地図を作る

`<div>` だけでページ全体を組むのではなく、領域の役割を表すHTML5のランドマーク要素を正しく配置します。スクリーンリーダーは「メインコンテンツへ直接移動」「ナビゲーション一覧へ移動」といったジャンプができるようになります。

| タグ | 役割（ランドマーク） | 注意点 |
| --- | --- | --- |
| `<header>` | サイト全体のヘッダー | ページ最上部に配置 |
| `<nav>` | 主要なナビゲーション | ページ内に複数ある場合（グローバルナビとフッターナビ等）は `aria-label="メインメニュー"` のように区別する |
| **`<main>`** | **ページの中心となるメインコンテンツ** | **1ページに1つだけ必須**（ヘッダー・フッターは含めない） |
| `<aside>` | 補足情報・サイドバー | 本筋から切り離せる関連情報 |
| `<footer>` | サイト全体のフッター | コピーライトや連絡先など |

---

## 3-4. 「リンク（`<a>`）」と「ボタン（`<button>`）」を正しく使い分ける

見た目が同じボタンデザインであっても、HTMLの役割によってタグを厳密に使い分けます。

| タグ | 正しい使い所 | キーボード操作の標準挙動 |
| --- | --- | --- |
| **`<a href="...">`** | **別のページやページ内セクションへ「移動する」とき** | `Enter` キーで移動する |
| **`<button type="button">`** | **メニューを開く、モーダルを出す、送信するなど「アクションを実行する」とき** | `Enter` と `Space` の両方で押せる |

<aside>
⚠️

**`<div>` や `<span>` にクリックイベントを付けてボタンにするのは絶対NG！**

`<div class="menu-btn">` のように作ると、キーボードの `Tab` キーで一切フォーカスが当たらず、スクリーンリーダーにも「ただの文字（または無）」と認識され、**マウスが使えない人は一生メニューを開けなくなります**。アクションを行うUIは必ず `<button>` を使いましょう。

</aside>

---

## 🛠 ハンズオン Step 1：正しいHTML構造に修正しよう（`starter/index.html`）

1. `<html>` に **`lang="ja"`** を追加し、`<title>` を **`MORI LIBRARY | 森の図書館・コミュニティスペース`** に変更する。
2. `<div class="main">`（と対応する閉じ `</div>`）を、ランドマーク要素の **`<main class="main">`** に変更する。
3. Heroセクション内の `<h3>だれでも心地よく過ごせる...</h3>` を、見出し階層を飛ばさない **`<h2>`** に変更する。
4. ヘッダーの `<div class="hamburger" id="js-hamburger">` を **`<button type="button" class="hamburger" id="js-hamburger">`** に変更する。

---

# 4. 画像・リンク・SVG・メディアに「言葉」を添える

目で見れば一目で分かる情報も、テキスト情報（代替テキスト）がなければ音声読み上げユーザーには一切伝わりません。

---

## 4-1. `alt` 属性の正しい書き方（3パターン）

| 画像の種類 | `alt` 属性の書き方 | コード例 |
| --- | --- | --- |
| **① 意味がある写真・図版** | 画像が伝えている内容を簡潔に説明する | `<img src="./images/pic_roast.webp" alt="自家焙煎機で丁寧にローストされるコーヒー豆" width="560" height="400">` |
| **② 装飾目的の画像**<br>（背景模様、区切り線、飾りアイコン） | **`alt=""`**（属性は必須で、中身を空にする）<br>※読み上げから完全にスキップされる | `<img src="./images/deco_line.svg" alt="" width="120" height="8">` |
| **③ リンク・ボタンの中にある画像**<br>（ロゴリンクなど） | 画像の見た目ではなく**「どこへ移動するか / 何をするか」**を書く | `<a href="./index.html"><img src="./images/logo.svg" alt="KOMA ROASTERY トップページへ" width="180" height="32"></a>` |

---

## 4-2. SVGアイコンのアクセシビリティ（2026年必須！）

ロゴやハンバーガーアイコン、矢印アイコンなどに `<svg>` をインラインで書く機会が増えていますが、**何も指定せずに `<svg>` を置くと、スクリーンリーダーが謎の図形や空のグループとして読み上げてしまう** ことがあります。

### ① 装飾用SVG（「詳しく見る →」の横の矢印アイコンなど）
テキストで意味がすでに伝わっている装飾アイコンには、**`aria-hidden="true"`** を付けて読み上げ対象から完全に隠します。

```html
<a class="btn" href="./about.html">
  詳しく見る
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">...</svg>
</a>
```

### ② 意味を持つ単独SVG（アイコンのみの「閉じるボタン」や「SNSリンク」など）
文字がなくSVGだけで意味を伝えるボタンの場合は、親の `<button>` や `<a>` に **`aria-label`** で分かりやすい名前を付け、中の `<svg>` には `aria-hidden="true"` を付けます。

```html
<!-- ⭕️ 文字のない「×」ボタンには aria-label で名前を付け、中のSVGは隠す！ -->
<button type="button" class="modal__close" aria-label="メニューを閉じる">
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">...</svg>
</button>
```

---

## 4-3. 飛び先が分かるリンクテキスト・外部リンク・`<iframe>` の `title`

- **リンクテキスト**：スクリーンリーダーには「ページ内のリンク一覧」だけを読み上げる機能があります。「こちら」「詳しくはこちら」「もっと見る」ばかりが並ぶと、どこに飛ぶか区別できません。
  - ❌ `<a href="works.html">こちら</a>`
  - ⭕️ `<a href="works.html">Webデザイン学科の学生作品一覧を見る</a>`
  - （カード全体がリンクで文言が「MORE」等の場合は、`<a href="..." aria-label="軽井沢テラス・パビリオンの詳細を見る">` のように補足することもできます）
- **外部リンク（`target="_blank"`）やPDFの事前予告**：事前の予告なく新しいタブが開くと、スクリーンリーダーのユーザーは「ブラウザの戻るボタンが効かなくなり、元のページに戻れなくなった」と混乱します。別タブで開くリンクやPDFリンクには、視覚的なアイコンや補足文言を添えます。
  - ⭕️ `<a href="guide.pdf" target="_blank">ガイドブック（PDF / 新しいタブで開きます）</a>`
- **`<iframe>` の `title` 属性**：GoogleマップやYouTubeの埋め込みには、必ず中身を説明する `title` を付けます。
  - ⭕️ `<iframe src="..." title="Google Map: 店舗へのアクセスマップ"></iframe>`

---

## 4-4. `.visually-hidden`（スクリーンリーダー専用テキスト）と大文字表記の罠

### ① 見た目上は隠して、音声読み上げにだけ伝える（`.visually-hidden` / `.sr-only`）
デザイン上は「MORE →」やアイコンしか置けないけれど、スクリーンリーダーには「〇〇の詳細を見る」「新しいタブで開く」といった補足情報を読ませたいときに使う定番のCSSテクニックです。

※ `display: none;` や `visibility: hidden;` を使うと **スクリーンリーダーからも消えてしまう** ため、以下のCSSで「視覚的な表示領域だけ 1px × 1px に切り抜いて隠す」のが2026年現在の標準的な実装です。

```html
<a class="btn" href="./works/01.html">
  MORE <span class="visually-hidden">（軽井沢テラス・パビリオンの詳細を見る）</span>
</a>
```

```scss
// 視覚的には隠すが、スクリーンリーダーにはしっかり読み上げさせる標準クラス
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

### ② 英語の大文字表記はHTMLではなく CSS の `text-transform: uppercase;` で行う
HTMLに直接 `NEWS` や `ABOUT` とすべて大文字で書くと、スクリーンリーダーによっては「ニュース」ではなく **「エヌ・イー・ダブリュー・エス」と1文字ずつアルファベット読み** してしまうことがあります。
HTMLには `News` や `About` と先頭のみ大文字（または小文字）で記述し、デザイン上すべて大文字にしたい場合は CSS で指定しましょう。

```html
<!-- ❌ NG：1文字ずつ「エヌ・イー・ダブリュー・エス」と読まれることがある -->
<h2 class="news__title">NEWS</h2>

<!-- ⭕️ OK：HTMLは自然な表記にし、CSSの text-transform で大文字に見せる -->
<h2 class="news__title">News</h2>
```

```scss
.news__title {
  text-transform: uppercase;
}
```

---

## 🛠 ハンズオン Step 2：代替テキスト・SVG・リンク・`iframe` を改善しよう

1. **`alt` 属性の修正（`starter/index.html`）：**
   - ヘッダーのロゴ画像に **`alt="MORI LIBRARY ホームへ"`** を追加する。
   - Hero画像に **`alt="緑と光に包まれたMORI LIBRARYの閲覧スペース"`** を追加する。
   - 装飾の区切り線（`deco_line.svg`）は `alt="飾り線"` ではなく **`alt=""`**（空）に変更する。
2. **SVGアイコンとリンクテキストの修正（`starter/index.html` / `style.scss`）：**
   - 2つのカードリンク内にある矢印 `<svg>` に **`aria-hidden="true"`** を追加する。
   - 1つ目のカードの「こちら」リンクを **`詳細を見る<span class="visually-hidden">（土曜日の朗読・読書会のお問い合わせへ）</span>`** に変更し、`style.scss` に **`.visually-hidden`** クラスを追加する。
   - 2つ目のカードの別タブリンクを **`資料一覧（PDF / 新しいタブで開きます）`** に変更する。
3. **`iframe` の `title` 属性追加（`starter/index.html`）：**
   - Googleマップの `<iframe>` に **`title="Google Map: MORI LIBRARYへのアクセス"`** を追加する。

---

# 5. 色・コントラスト・動きに配慮する

## 5-1. 色のコントラスト比を確保する（WCAG レベルAA）

背景色と文字色の明度差（コントラスト比）が低いと、弱視の人だけでなく、明るい屋外でスマホを見たときにも文字が読めなくなります。

| 対象テキスト・要素 | 必要なコントラスト比（レベルAA） |
| --- | --- |
| **通常のテキスト**（18pt / 24px未満） | **4.5 : 1 以上** |
| **大きなテキスト**（24px以上、または太字18.67px以上） | **3.0 : 1 以上** |
| **UI部品の境界・アイコン**（入力欄の枠線、グラフ、アイコン） | **3.0 : 1 以上** |

※ Chromeの検証ツール（Elements ＞ Color Picker）を開くと、現在の色が「4.5:1（AA）」を満たしているかリアルタイムでチェックラインが表示されます。

---

## 5-2. 「色だけ」で情報を伝えない

「エラー項目は赤枠」「完了は緑色」のように、色の違いだけに意味を持たせると、色覚特性を持つユーザーやグレースケール画面では区別がつきません。

- **対策：** 色に加えて **「アイコン（✔ / ✖）」「テキスト（【必須】【エラー】）」「下線・太字」** を必ず組み合わせます。

---

## 5-3. 【重要】動き（アニメーション）への配慮：`prefers-reduced-motion`

進級展やポートフォリオ作品でよく使われる「大きなパララックス」「画面全体を横切るスライド」「激しい回転・ズーム演出」は、**前庭障害（めまい・吐き気・画面酔い）** を持つユーザーにとって体調不良を引き起こす危険があります。

OS側で「視差効果を減らす（動きを減らす）」設定をオンにしているユーザーに対して、CSSのメディアクエリ **`@media (prefers-reduced-motion: reduce)`** を使って動きを抑制するのが2026年現在の標準的な配慮です。

```scss
// 通常時：滑らかにスライドしてフェードイン
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// ⭕️ ユーザーがOSで「動きを減らす」を設定している場合は、移動アニメーションをオフにする
@media (prefers-reduced-motion: reduce) {
  .fade-in {
    transform: none;
    transition: opacity 0.2s ease; // 移動をなくし、穏やかなフェードのみ（または即時表示）にする
  }
}
```

---

## 5-4. 自動再生動画・カルーセルの一時停止コントロール（WCAG 2.2.2）

進級展のメインビジュアルでよく使われる **自動再生される背景動画（`<video autoplay loop muted playsinline>`）** や、**自動で切り替わるスライダー（カルーセル）** は、5秒以上動き続ける場合にユーザーが自分の意思で止められないと、文字を読むのに時間がかかる人や集中障害のある人の大きな妨げになります。

- **対策：** 動画やカルーセルの近くに **「一時停止 / 再生ボタン（`<button>`）」** を必ず配置し、キーボード（`Tab` + `Enter`）でも止められるようにします。また、`<video>` 要素自体に `prefers-reduced-motion: reduce` を検知して自動で `video.pause()` するJSを添えるとさらに親切です。

---

## 🛠 ハンズオン Step 3：色・コントラスト・動きへの配慮を追加しよう

1. **コントラスト比の改善（`starter/sass/style.scss`）：**
   - 冒頭の変数をそれぞれ濃い色に変更して保存（Watch Sassでコンパイル）する：
     - `$color-text: #334155;`（薄い `#94a3b8` から変更）
     - `$color-muted: #475569;`（薄い `#cbd5e1` から変更）
     - `$color-accent: #b45309;`（薄い `#f59e0b` から変更）
2. **「色だけ」で伝えない工夫（`starter/index.html`）：**
   - `.events__alert` の先頭に **`<span aria-hidden="true">⚠</span> 【重要】`** を追加する。
3. **動きの抑制対応（`starter/sass/style.scss`）：**
   - `.card` の中に **`@media (prefers-reduced-motion: reduce)`** を追記し、`transition: none;` と `&:hover { transform: none; }` を設定する。

---

# 6. キーボード操作とフォーカス設計（WCAG 2.2準拠）

## 6-1. フォーカスリングを消さない・`:focus-visible` で美しく制御する

`Tab` キーで移動したときに要素の周りに表示される枠線（フォーカスインジケータ）は、キーボード操作における **「今自分がどこにいるかを示す唯一の目印」** です。

```scss
// ❌ 絶対NG：これを書くとキーボード操作が完全に不可能になる
*:focus {
  outline: none;
}

// ⭕️ 2026年の標準：マウスクリック時は出さず、キーボード操作時（:focus-visible）だけくっきり表示する！
:focus-visible {
  outline: 3px solid #256be6; // 視認性の高いコントラストの枠線
  outline-offset: 2px;        // 要素に被らないよう少し外側に離す
}
```

※ リセットCSS（`destyle.css` や `the-new-css-reset` 等）によっては標準のアウトラインが消されている場合があるため、**必ず自分で `:focus-visible` のスタイルを定義** しましょう。

---

## 6-2. 【WCAG 2.2】固定ヘッダーの下にフォーカスが隠れるのを防ぐ（`scroll-margin-top`）

ページ上部に `position: fixed;`（または `sticky`）の固定ヘッダーがある場合、`Tab` キーで下から上に戻ったりページ内リンクにジャンプした際、**フォーカスされた要素が固定ヘッダーの裏に隠れて見えなくなる問題**（WCAG 2.2「2.4.11 フォーカスが隠れないこと」違反）が多発します。

```scss
// 固定ヘッダーの高さが 80px ある場合、すべての要素のスクロール余白を上方向に確保する
html {
  scroll-padding-top: rem(96); // ページ内リンク（#section）のズレ防止
}

a,
button,
input,
select,
textarea {
  scroll-margin-top: rem(96); // Tabキー移動時に固定ヘッダーの下に潜り込むのを防止！
}
```

---

## 6-3. 「スキップリンク」を設置する

ヘッダーにメニューが10個以上あるサイトでは、キーボードユーザーはページを開くたびに `Tab` キーを10回以上押さないと本文に辿り着けません。
ページの先頭に、**普段は視覚的に隠れていて、`Tab` キーを押した瞬間だけ画面左上に現れる「メインコンテンツへスキップ」リンク** を設置しましょう。

```html
<body>
  <a class="skip-link" href="#main-content">メインコンテンツへスキップ</a>
  <header class="header">...</header>
  <main id="main-content" tabindex="-1">...</main>
</body>
```

```scss
// 視覚的には隠すがスクリーンリーダーとキーボードには認識させる（モダンな Visually Hidden）
.skip-link {
  position: fixed;
  top: rem(16);
  left: rem(16);
  z-index: 9999;
  padding: rem(12) rem(20);
  border-radius: rem(6);
  background-color: #111;
  color: #fff;
  font-weight: bold;
  transform: translateY(-200%); // 普段は画面外の上へ隠す
  transition: transform 0.2s ease;

  // キーボードでフォーカスが当たった瞬間だけ画面内に現れる！
  &:focus-visible {
    transform: translateY(0);
    outline: 3px solid #ffd43b;
    outline-offset: 2px;
  }
}
```

---

## 6-4. `tabindex` 属性のルール

- **`tabindex="0"`**：通常フォーカスできない要素をTab移動の対象に加える（ただし原則 `<button>` や `<a>` を使うべき）。
- **`tabindex="-1"`**：Tabキーの順番には入らないが、スキップリンクの飛び先（`<main id="main-content" tabindex="-1">`）やJavaScriptの `.focus()` でフォーカスを移したい要素に使う。
- **❌ `tabindex="1"` 以上の正の数値**：Tabの移動順序が予測不能に壊れるため **使用厳禁** です。

---

## 🛠 ハンズオン Step 4：キーボード操作とフォーカス設計を実装しよう

1. **`:focus-visible` の設定（`starter/sass/style.scss`）：**
   - `*:focus { outline: none; }` を削除し、**`:focus-visible { outline: 3px solid $color-main; outline-offset: 2px; }`** に書き換える。
2. **固定ヘッダー被りの防止（`starter/sass/style.scss`）：**
   - `html { scroll-padding-top: rem(96); }` と `a, button, input, select, textarea, summary { scroll-margin-top: rem(96); }` を追加する。
3. **スキップリンクの設置（`starter/index.html` & `style.scss`）：**
   - `<body>` の直下に `<a class="skip-link" href="#main-content">メインコンテンツへスキップ</a>` を追加し、`<main class="main">` に **`id="main-content" tabindex="-1"`** を付与する。
   - `style.scss` に `.skip-link` のスタイルを追加し、`Tab` キーを1回押したときに画面左上に現れることを確認しよう！

---

# 7. フォームのアクセシビリティ

お問い合わせフォームは、Webサイトの中で最もユーザーが離脱しやすく、アクセシビリティが問われる箇所です。

## 7-1. `<label>` と `for` / `id` の紐付け（必須）

`<label>` の `for` 属性と `<input>` の `id` 属性を一致させることで、スクリーンリーダーが入力欄の項目名を正しく読み上げ、さらにラベル文字をクリック/タップするだけで入力欄にフォーカスが入るようになります。

```html
<div class="form__group">
  <label class="form__label" for="user-email">
    メールアドレス <span class="form__badge">必須</span>
  </label>
  <input
    class="form__input"
    type="email"
    id="user-email"
    name="email"
    autocomplete="email"
    required
    aria-describedby="email-hint"
  >
  <p class="form__hint" id="email-hint">例：info@example.com（半角英数）</p>
</div>
```

## 7-2. フォームで押さえておくべき3つのポイント

1. **`autocomplete` 属性を指定する（WCAG 1.3.5）：** `name`, `email`, `tel`, `postal-code` などを指定しておくと、ブラウザの自動入力機能が働き、文字入力が困難なユーザーの負担を劇的に減らせます。
2. **プレースホルダー（`placeholder`）をラベル代わりにしない：** 入力を始めると消えてしまうため、記憶や認知に負担がかかります。必ず `<label>` を常に表示し、入力例は入力欄の下に注釈として書きます。
3. **`aria-describedby` で補足やエラー文を紐付ける：** 注釈テキストやエラーメッセージに `id` を振り、`<input>` 側の `aria-describedby` と繋ぐと、入力欄にフォーカスしたときに「メールアドレス、必須、例：info@example.com」とセットで読み上げられます。

---

## 🛠 ハンズオン Step 5：フォームをアクセシブルに改善しよう（`starter/index.html`）

1. お名前入力欄の上に **`<label class="form__label" for="user-name">お名前 <span class="form__badge">必須</span></label>`** を追加し、`<input>` に **`autocomplete="name"`** を追加する。
2. メールアドレス入力欄の上に **`<label class="form__label" for="user-email">メールアドレス <span class="form__badge">必須</span></label>`** を追加し、`<input>` に **`autocomplete="email"`** と **`aria-describedby="email-hint"`** を追加する。
3. 「お名前」「メールアドレス」の文字をクリックしたときに、それぞれの入力欄にフォーカスが入ることを確認しよう！

---

# 8. WAI-ARIA とネイティブHTMLの最新ベストプラクティス

ハンバーガーメニューやアコーディオン（FAQ）、モーダルウィンドウなどの「動きのあるUIパーツ」を作る際、見た目だけCSSで作っても、スクリーンリーダーには「今メニューが開いているのか閉じているのか」が伝わりません。

そこで使うのが **WAI-ARIA（ウェイ・アリア）** という補助属性ですが、2026年現在のアプローチには明確な鉄則があります。

---

## 8-1. WAI-ARIA の第一原則：「まずネイティブHTMLを使う」

> **「HTMLの標準要素（ネイティブHTML）で実現できるなら、わざわざ `<div>` と WAI-ARIA で自作しない」**

2026年現在、かつてJavaScriptと複雑なWAI-ARIAを何十行も書いて作っていたUIの多くが、**HTMLの標準タグだけで最初から完全なアクセシビリティ対応済み** として実装できるようになっています！

### ① アコーディオン（FAQ）は `<details>` と `<summary>` を使う
`<details>` タグを使えば、JavaScriptもARIA属性も一切不要で、キーボード操作（Enter/Space）や開閉状態の読み上げに標準対応します。

```html
<!-- ⭕️ HTML標準だけでキーボード操作＆読み上げ完全対応のアコーディオン！ -->
<details class="faq__item">
  <summary class="faq__question">駐車場はありますか？</summary>
  <p class="faq__answer">店舗の裏手に3台分の専用駐車場をご用意しております。</p>
</details>
```

### ② モーダルウィンドウは `<dialog>` 要素を使う
`<dialog>` タグを JavaScript の `dialog.showModal()` で開くと、**「Escキーで閉じる」「モーダルの外側にフォーカスが出ない（フォーカストラップ）」「背景コンテンツの読み上げ無効化」** がすべてブラウザ標準で自動的に機能します。

---

## 8-2. ハンバーガーメニュー等で使う必須の WAI-ARIA 属性

HTML標準タグだけでは表現できない「ハンバーガーメニュー」や「タブ切り替え」では、最小限の WAI-ARIA 属性を正しく付与します。

```html
<!-- ハンバーガーボタン -->
<button
  type="button"
  class="hamburger"
  aria-label="メニューを開く"
  aria-controls="global-nav"
  aria-expanded="false"
>
  <span class="hamburger__line" aria-hidden="true"></span>
</button>

<!-- ドロワーメニュー本体 -->
<nav id="global-nav" class="gnav" aria-label="メインメニュー" hidden>
  <ul class="gnav__list">
    <li><a href="./index.html" aria-current="page">TOP</a></li>
    <li><a href="./about.html">ABOUT</a></li>
  </ul>
</nav>
```

| 属性名 | 役割・意味 | 使い方・JSでの更新 |
| --- | --- | --- |
| **`aria-expanded`** | 制御対象のメニューやアコーディオンが **「現在開いている（`true`）か閉じている（`false`）か」** を伝える | 開いたときに JS で `"true"`、閉じたときに `"false"` に書き換える（同時に `aria-label` も「メニューを閉じる / 開く」に切り替えると完璧）。 |
| **`aria-controls`** | このボタンが **「どの要素（`id`）を開閉するのか」** を関連付ける | 対象要素（`<nav id="global-nav">`）の `id` 名を指定する。 |
| **`aria-current="page"`** | ナビゲーションの中で **「現在開いているページはどれか」** を伝える | 現在のページの `<a>` タグに付与する（色や下線だけでなく音声でも現在地が分かる）。 |
| **`aria-hidden="true"`** | 装飾用の要素や閉じている非表示要素を **スクリーンリーダーから隠す** | 装飾用 `<svg>` やハンバーガーの三本線 `<span>` などに付与する。 |
| **`inert` 属性** | メニューやモーダルが開いている間、背後のコンテンツを **クリックもTabフォーカスも読み上げもすべて無効化** する最新HTML属性 | ドロワーを開いたとき、背後の `<main>` や `<footer>` に `main.inert = true;` を付けるだけで安全な操作制御ができる。 |

---

## 🛠 ハンズオン Step 6：ネイティブHTML & WAI-ARIA を実装して最終計測しよう！

1. **FAQを `<details>` / `<summary>` に変更（`starter/index.html` & `style.scss`）：**
   - `<div class="faq__item js-accordion">` を **`<details class="faq__item">`** に、質問の `<div>` を **`<summary class="faq__question">`** に、回答の `<div>` を **`<p class="faq__answer">`** に書き換える。
   - `style.scss` の `.faq__answer` の `display: none;` を削除し（`<details>` が自動で開閉するため不要）、`.faq__question` に `list-style: revert;` を追加する。
2. **ハンバーガーメニューの WAI-ARIA と `inert` 対応（`starter/index.html` & `js/main.js`）：**
   - `<button class="hamburger" ...>` に **`aria-label="メニューを開く"` `aria-controls="global-nav"` `aria-expanded="false"`** を追加し、中の `<span>` に `aria-hidden="true"`、`<nav>` に **`aria-label="メインメニュー"`** を追加する。
   - `starter/js/main.js` を `completed/js/main.js` と同様に更新し、開閉時に `aria-expanded` / `aria-label` の切り替え、背景の `<main>` / `<footer>` への `inert` 付与、`Esc` キーで閉じる処理を実装する。
3. **🎉 最終計測（After計測）：**
   - シークレットウィンドウの **Lighthouse（Accessibility）** で再度計測し、スコアが **100点** に到達したことと、**`Tab` / `Enter` キーだけ** でFAQやメニューがすべて操作できることを確認しよう！

---

# 9. アクセシビリティ実装チェックリスト

自分のブログや進級展の作品を公開・提出する前に、以下を確認しましょう。

- [ ] **【構造】** `<html lang="ja">` と各ページ固有の `<title>` が設定されているか？
- [ ] **【見出し】** `h1` ➔ `h2` ➔ `h3` と見出しの階層が飛ばずに並んでいるか？
- [ ] **【ランドマーク】** `<header>`, `<nav>`, `<main>`, `<footer>` が正しく配置されているか？
- [ ] **【タグ使い分け】** ページ移動は `<a>`、JSのアクション実行（メニュー開閉など）は `<button>` になっているか？
- [ ] **【代替テキスト】** すべての `<img>` に適切な `alt`（装飾なら `alt=""`）、`<iframe>` に `title`、装飾 `<svg>` に `aria-hidden="true"` があるか？
- [ ] **【色・コントラスト】** 文字と背景のコントラスト比（通常 4.5:1 以上）が確保され、「色だけ」で情報を伝えていないか？
- [ ] **【動きへの配慮】** 派手なアニメーションに `@media (prefers-reduced-motion: reduce)` の配慮があるか？
- [ ] **【キーボード操作】** マウスを使わずに **`Tab` と `Enter` だけで全機能が操作でき**、`:focus-visible` のフォーカス枠が固定ヘッダーに隠れずくっきり見えるか？
- [ ] **【フォーム】** `<label for="...">` と `<input id="...">` が紐付き、`autocomplete` が設定されているか？
- [ ] **【ツール診断】** Lighthouse（Accessibility）や axe DevTools で重大なエラーが `0件`（スコア95〜100点）になっているか？

---

# 10. 実践課題

**サイトのデザインやレイアウトが崩れないよう気をつけながら、「自分のブログ」や「進級展の作品」のアクセシビリティをできる限り改善してください。**

### 実践の進め方
1. **現状の計測とキーボード操作テスト（Before）：**
   - 自分のサイトを **マウスを使わず `Tab` キーだけで** 上から下まで操作してみる（ハンバーガーメニューやフォームが操作できるか？今どこにフォーカスがあるか見えるか？）。
   - Chrome の **Lighthouse（Accessibility）** や **HeadingsMap / axe DevTools** でエラー箇所を確認する。
2. **改善の実施：**
   - 「9. アクセシビリティ実装チェックリスト」に沿って、見出し構造・`<a>` と `<button>` の修正、`alt` / `aria-hidden="true"` の整備、`:focus-visible` と `scroll-margin-top` の追加、`prefers-reduced-motion` 対応、ハンバーガーメニューへの `aria-expanded` 付与などを実装する。
3. **再計測（After）：**
   - 再度 Lighthouse（Accessibility）とキーボード操作テストを行い、エラーが解消されスコアが向上したことを確認する。
