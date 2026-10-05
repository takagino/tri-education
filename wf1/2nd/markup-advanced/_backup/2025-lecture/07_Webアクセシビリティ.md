# 07_Webアクセシビリティ

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

Webアクセシビリティの重要性を体験するためのワークを行います。

## 1-1. キーボード操作体験（マウス・トラックパッド禁止）

**【ワークの目的】**

Webサイトは、マウスやトラックパッドが使える人だけが利用するものではない。

- 手に怪我をしている人
- 手の震えなどで、細かいポインタ操作が難しい人
- スクリーンリーダー（画面読み上げソフト）を利用する視覚障害のある人

これらの方々は、キーボード（またはキーボードに準ずる機器）を使ってWebサイトを操作している。

このワークでは、あえてキーボードだけでサイトを操作し、「マウスが使えない」という状況でWebサイトがどのように機能するかを「体験」する。

 **【覚えておくべき最低限の操作】**

| キー操作 | 実行内容 |
| --- | --- |
| **`Tab`** | **次に**進む（リンクやボタンなど、操作できる要素へフォーカスを移動） |
| **`Shift + Tab`** | **前へ**戻る（フォーカスを逆順に移動） |
| **`Enter`** | 決定する（リンク先へ移動する、フォームを送信する） |
| `Space` | 選択する（ボタンを押す、チェックボックスのON/OFF、ドロップダウンメニューを開く） |
| **`↑` `↓` `←` `→`（矢印キー）** | ドロップダウンメニューやラジオボタンの項目の中を移動する |
| **`Esc`** | 開いたメニューやウィンドウを閉じる |

**【お題01：学生作品ページにたどり着け！】**

[](https://computer.trident.ac.jp/)

 **【お題02：機能一覧から年末調整に関する資料ダウンロードフォームにたどり着け！】**

[SmartHR（スマートHR）｜シェアNo.1のクラウド人事労務ソフト](https://smarthr.jp/)

## 1-2. スクリーンリーダー体験（デモ）

**【デモの目的】**

- **視覚**から**聴覚**へ。Webサイトを「読む」のではなく「聞く」とはどういうことか、その情報体験の違いを理解する。
- スクリーンリーダーが、Webページをどのように「解釈」しているかを知る。
- 「なぜ正確なHTML（`<header>`, `<h1>`, `alt`属性など）が必須なのか」を、耳で聞いて痛感する。

【MacのVoiceOver】

ショートカット「`command` + `F5`」

## 1-3. コントラスト体験（色覚シミュレーション）

**【ワークの目的】**

色の違いが分かりにくい人、視力が低い人にとって、テキストと背景のコントラストや、「色のみ」に頼った情報伝達は、情報を見失う原因となる。

このワークでは、「色覚特性」を持つ方がWebサイトをどのように体験するかをシミュレーションし、私たちがデザインやコーディングで何を考慮すべきかを学ぶ。

**【悪い例 - 色だけに頼った情報】**

[悪いコントラストと色に頼った例](https://takagino.github.io/doc-markup-advanced/accessibility/bad.html)

**【良い例 - 色に頼らない情報】**

[良いコントラストと色に頼らない例](https://takagino.github.io/doc-markup-advanced/accessibility/good.html)

**【視覚障害のエミュレート】**

1. デベロッパー・ツールを開き、「その他のツール（More tools） > レンダリング（Rendering）」を選択。
2. 「視覚障害をエミュレート（Emulate vision deficiencies）」のドロップダウンから、順番に選んでみる。

# 2. 今回学ぶこと

---

- Webアクセシビリティの改善方法

## 2-1. アクセシビリティとは？

先ほどのワークで感じた、「伝わらない」「操作できない」「区別がつかない」というストレスや不便さこそが、アクセシビリティが解決しようとしている課題そのもの。

**【アクセシビリティの定義】**

<aside>
💡

利用者の障害の有無やその程度、年齢や利用環境にかかわらず、ウェブで提供されている情報やサービスを利用できること、またはその到達度を意味しています。

*（デジタル庁「ウェブアクセシビリティ導入ガイドブック」より）*

</aside>

![web-accessibility_02.jpg](07_Web%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3/web-accessibility_02.jpg)

[Web Accessibility Perspectives Videos: Explore the Impact and Benefits for Everyone](https://www.w3.org/WAI/perspective-videos/)

## 2-2. Webアクセシビリティの「ものさし」

「アクセシビリティが高さ」を測るための、世界共通の「ものさし（規格）」が存在する。

**【WCAG (Web Content Accessibility Guidelines)】**

- **W3C（Webの標準化団体）が定める、事実上の世界標準。**
- 技術の進歩に合わせ改訂されており、2023年10月には最新版の「WCAG 2.2」が勧告された。

[Web Content Accessibility Guidelines (WCAG) 2.2 (日本語訳)](https://waic.jp/translations/WCAG22/)

**【JIS-X 8341-3:2016】**

- WCAGを基にして作られた、日本の国家規格（JIS）。
- 日本の公的機関（デジタル庁など）が準拠を求められている基準は、このJISに基づいている。

[JISX8341-3:2016 高齢者・障害者等配慮設計指針－情報通信における機器，ソフトウェア及びサービス－第３部：ウェブコンテンツ](https://kikakurui.com/x8/X8341-3-2016-01.html)

## 2-3. 達成基準（どこまでやるか？）

WCAGには、A（最低限）、AA（ダブルA）、AAA（トリプルA）の3段階の達成基準（ハードルの高さ）がある。

| **レベル A（低い）** | 最低限、クリアすべき基準。 |
| --- | --- |
| **レベル AA（標準）** | **私たちが目指すべき、事実上の世界標準。** |
| **レベル AAA（高い）** | 専門的なサイト（例: 視覚障害者専用ライブラリ）などで求められる最高レベル。 |

※「WCAG 2.2」を今一度見てみよう。

**【国内企業・団体のアクセシビリティ方針】**

[ウェブアクセシビリティ｜デジタル庁](https://www.digital.go.jp/accessibility-statement)

[名古屋市公式ウェブサイトのウェブアクセシビリティ対応｜名古屋市公式ウェブサイト](https://www.city.nagoya.jp/about/accessibility/1028262/1028263/1028264.html)

[](https://computer.trident.ac.jp/web-accessibility/)

## 2-4. アクセシビリティの確認方法（ツール）

**【Webサービス】**

[PageSpeed Insights](https://pagespeed.web.dev/)

**【Chrome拡張機能】**

[axe DevTools - Web Accessibility Testing - Chrome Web Store](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

**【Chromeデベロッパー・ツール】**

- Lighthouseタブ：PageSpeed Insightsのローカル実行版
- レンダリング機能

## 2-5. その他

**【アクセシビリティに優れたWebギャラリー】**

[AAA11Y (Accessible Website Gallery)](https://www.aaa11y.com/)

**【情報源】**

[ウェブアクセシビリティ導入ガイドブック｜デジタル庁](https://www.digital.go.jp/resources/introduction-to-web-accessibility-guidebook)

[Webアクセシビリティ 逆引きガイドライン｜実践ノウハウ｜エー イレブン ワイ［WebA11y.jp］](https://weba11y.jp/know-how/guidelines/guidelines_index/)

[SmartHR ACCESSIBILITY（スマートHR アクセシビリティ）｜仕組みで解決できることを、やさしさで解決しない。](https://accessibility.smarthr.co.jp/)

[アクセシビリティBlog | ナレッジ | ミツエーリンクス](https://www.mitsue.co.jp/knowledge/blog/a11y/)

[参考情報 — freeeアクセシビリティー・ガイドライン Ver. 202510.0-RELEASE+7.0.0](https://a11y-guidelines.freee.co.jp/explanations/index.html)

# 3. **正しいHTMLを書く**

---

アクセシビリティ対応は、何か特別な作業をすることではない。

私たちが前期から学んできた「セマンティック（意味論的）なHTML」を、手を抜かずに正しく書くことです。

## 3-1. lang属性を正しく設定する

**WHAT：**`<html lang="ja">` のように、そのページの主要な言語を指定する。

**WHY：**スクリーンリーダーに「これは日本語のページです」と教えるため。`lang="en"`のページで日本語を読み上げさせると、奇妙な発音になる（またはその逆）のを防ぐ。

## 3-**2. ページの内容がわかる<title>にする**

**WHAT：**ページの`<title>`タグを、ユニークで分かりやすいものにする。（例：✕ 無題　◎ 学生作品 | Webデザイン学科）

**WHY:** ブラウザのタブに表示されるだけでなく、スクリーンリーダーがページを開いた時に一番最初に読み上げる「このページが何か」を伝える、最も重要な情報だから。

[ページタイトル　［ページ設定］｜実践ノウハウ｜エー イレブン ワイ［WebA11y.jp］](https://weba11y.jp/know-how/guidelines/descriptive-page-title/)

## 3-3. 「見出し」でページの目次を作る

**WHAT：**`h1`〜`h6`を、文書構造（アウトライン）に合わせて正しく使う。

- `<h1>`はページの大見出し。（通常1回のみ）
- `<h2>`の次に`<h4>`が来るなど、階層を飛ばさない。

**WHY：** スクリーンリーダーのユーザーは、「見出しジャンプ」機能を使って、**新聞の目次を読むように**ページ全体を把握するため。

## 3-4. 「ランドマーク」でページの地図を作る

WHAT：`<div>`や`<span>`だけでなく、ページの主要な領域を意味するHTMLタグを正しく使う。

- `<header>`: サイトヘッダー
- `<nav>`: 主要なナビゲーション
- `<main>`: ページの**中心となるコンテンツ**（必須！）
- `<footer>`: サイトフッター

**WHY：**スクリーンリーダーのユーザーは、「ランドマーク」機能で「メインコンテンツへジャンプ」「ナビゲーションへジャンプ」するため。

## 3-5. ボタン」と「リンク」を正しく使い分ける

**WHAT：**

- **`<a>`（リンク）:** 別のページに**移動する**時に使う。
- **`<button>`（ボタン）:** ページ内で**何かを実行する**（メニューを開く、フォームを送信する）時に使う。

**WHY：**

- 見た目は同じでも、スクリーンリーダーは「（リンク）詳しく見る」と「（ボタン）メニューを開く」を明確に区別して読み上げる。
- `<div>`や`<span>`をボタン代わりにすると、キーボード操作（`Tab`キー）でフォーカスできなくなる致命的な問題が発生する。

## 3-6. 便利なツール

**【ブックマークレット】**

[The Nu Html Checkerを用いたHTMLのバリデーション — freeeアクセシビリティー・ガイドライン Ver. 202510.0-RELEASE+7.0.0](https://a11y-guidelines.freee.co.jp/explanations/nu-html-checker.html)

**【Chrome拡張機能】**

[HeadingsMap - Chrome ウェブストア](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=ja)

# 4. 必要な情報を提供する

---

「正しいHTML」という地図（ランドマーク）と目次（見出し）が用意できたら、次は「**そこに何があるか**」という具体的な情報を伝える。

## 4-1. alt属性を正しく設定する（最重要）

**WHAT：**すべての`<img>`タグには、その画像が持つ「意味」を説明する`alt`（代替テキスト）属性が**必須**。

**WHY：**スクリーンリーダーは`alt`属性を読み上げる。これを設定しないと、`"image9548.jpg"` のように**意味不明なファイル名**が読み上げられ、視覚障害のあるユーザーには何の情報も伝わらない。

**【3つの正しい使い方】**

1. **意味がある画像（例: 商品写真、グラフ、ニュース写真）**
    - **書き方：**画像の内容を簡潔に説明する。
    - **コード：**`<img src="red-shoes.jpg" alt="赤色のスニーカー">`
    - **読み上げ：**「赤色のスニーカー」

1. **装飾目的の画像（例: 背景の模様、区切り線）**
    - **書き方：**`alt=""`（**alt属性自体は必須。中身を空**にする）
    - **コード：**`<img src="section-border.png" alt="">`
    - 読み上げ：スクリーンリーダーは完全に無視して、次のコンテンツに進む
    
2. **リンクやボタンになっている画像**
    - **書き方：**その画像が「**どこに飛ぶか**」または「**何をするか**」を書く。
    - **コード：**`<a href="index.html"><img src="logo.png" alt="トライデントコンピュータ専門学校 ホームへ"></a>`

[alt属性の良い事例(つけ方・書き方)｜情報バリアフリーポータルサイト](https://jis8341.net/jirei_sample/jirei_chapter_01.html)

## 4-2. 飛び先の内容がわかるリンクテキストにする

**WHAT**：リンクのテキストは、「そのリンクがどこへ導くか」が具体的にわかる文言にする。

**WHY：**

- スクリーンリーダーのユーザーは、「ページ内のリンク一覧」を読み上げさせて移動することがある。
- もしサイト内のリンクがすべて「こちらへ」「詳細」「もっと見る」だったら、どこに飛ぶリンクなのか全く区別がつかない。

| **良い例** | **悪い例** |
| --- | --- |
| <a>Webデザイン学科の学生作品一覧を見る</a> | <a>こちら</a |
| <a>アクセシビリティ導入ガイドブック（PDF）</a> | <a>詳細</a>  |

## 4-3. iframe要素にはtitle属性を設定する

**WHAT：**Google MapやYouTube動画の埋め込みで使う`<iframe>`には、`title`属性で「その中身が何か」を説明する。

**WHY：**`iframe`は、ページの中にある「別のページ」のようなもの。`title`がないと、スクリーンリーダーのユーザーはその内容はわからない。

**【コード例】**

```markup
<iframe 
  src="httpsTo://http://googleusercontent.com/maps.google.com/..."
  title="Google Map: トライデントコンピュータ専門学校へのアクセス">
</iframe>
```

## 4-4. 便利なツール

**【Chrome拡張機能】**

[SEO META in 1 CLICK - Chrome ウェブストア](https://chromewebstore.google.com/detail/seo-meta-in-1-click/bjogjfinolnhfhkbipphpdlldadpnmhc?hl=ja)

# 5. 色に頼らない設計（コントラストと伝達）

---

## 5-1. 色の「コントラスト比」を確保する

**WHAT：**テキストの色と背景色の「色の差（コントラスト比）」を十分に確保する。

**WHY：**「ぼやけた視界」シミュレーションや、「明るい屋外でスマホを見る」状況でも、情報が確実に読めるようにするため。

**THE RULE：**Webアクセシビリティの国際基準（WCAG）では、本文サイズのテキストには「4.5:1」以上のコントラスト比を確保するよう定めてる。（レベルAA）

## 5-2. 「色だけ」で情報を伝えない

**WHAT：**「エラー＝赤色」「成功＝緑色」のように、色の違いだけを情報伝達の唯一の手段にしてはいけない。

**WHY：**色覚特性を持つ人には、その色の違いが区別できない可能性がある。

**THE RULE：**色は「補助的」なヒントとして使い、必ず**他の方法と組み合わせて情報**を伝えること。

## 5-3. 便利なツール

**【ブックマークレット】**

[グレースケール表示への切り替え方 — freeeアクセシビリティー・ガイドライン Ver. 202510.0-RELEASE+7.0.0](https://a11y-guidelines.freee.co.jp/explanations/grayscale.html)

**【Webサービス】**

[color.adobe.com](https://color.adobe.com/ja/create/color-contrast-analyzer)

# 6. キーボードで操作できるようにする

---

## 6-1. フォーカス・インジケータを**絶対に**消さない

**WHAT：**`Tab`キーで移動したときに、リンクやボタンの周りに表示される「青い枠線」や「アウトライン」のこと。

**WHY：**「今、自分がどこにいるか」を示す唯一の目印となる。

**【やってはいけない指定】**

```css
/* 絶対にやってはいけない！
  これを書いた瞬間、キーボード操作が不可能になります。
*/
a:focus, button:focus, input:focus {
  outline: none;
}
```

**【マウス操作の時だけアウトラインを消す】**

```css
/* マウスでクリックした時は無効 */
:focus {
  outline: none;
}

/* キーボードでフォーカスした時だけ有効 */
:focus-visible {
  /* ブラウザ標準の青枠を出す */
  outline: revert;
  outline-offset: 2px;
}
```

**【resrt.cssを読み込んでいる場合は注意！】**

[Mache](https://takagino.github.io/doc-markup-advanced/09-mache-rem/completed/index.html)

※上記のCSSを追加すること！

## 6-2. 「スキップリンク」を設置する

**WHAT：**ページの冒頭に、`Tab`キーを押した時だけ表示される「本文へ」リンクを設置する。

**WHY：**キーボードユーザーが`Tab`キーを何十回も押してヘッダーをスキップする手間を省き、メインコンテンツに直接ジャンプできるようにするため。

**【実装方法（Visually Hidden）】**

普段は画面外に隠しておき、フォーカスが当たった時だけ表示させる。

```markup
<a href="#main-content" class="skip-link">本文へスキップ</a>
<header>...</header>
<main id="main-content">...</main>
```

```scss
// 画面外に隠すが、スクリーンリーダーには読ませる
.skip-link {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  
  // フォーカスが当たったら表示する
  &:focus {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
  }
}
```

## 6-3. tabindex属性を正しく使う

[【アクセシビリティ】　tabindexを使ってタブキーでフォーカス移動できるようにする方法 - Qiita](https://qiita.com/ogawa_slj/items/8ce5339277aebc8a302c)

## 6-4. 便利なツール

**【Chrome拡張機能】**

[taba11y - Tab order accessibility testing - Chrome Web Store](https://chromewebstore.google.com/detail/taba11y-tab-order-accessi/aocppmckdocdjkphmofnklcjhdidgmga)

# 7. **フォームの最適化**

---

## 7-1. <label>で、何の入力欄かをクリック可能にする

**WHAT：**`<label>`要素の`for`属性の値と、`<input>`要素の`id`属性の値を、必ず同じにする。

**WHY：**

1. **スクリーンリーダーのため：**`for`と`id`が一致していると、スクリーンリーダーは「（入力欄にフォーカスが当たると）"お名前"」と読み上げる。これが無いと、「（入力欄）編集テキスト」としか読まれず、何の入力欄か分からない。
2. **マウス・タッチ操作のため：**「お名前」という**ラベルのテキスト**をクリック（タップ）するだけで、対応する入力欄にフォーカスが当たるようになり、操作性が向上する。

**【コード例】**

```markup
<label>お名前<br>
  <input type="text" name="username" id="username">
</label>

<!-- もしくは -->
<label for="username">お名前</label>
<input type="text" name="username" id="username">
```

## 7-2. その他

[Webアクセシビリティ 逆引きガイドライン｜実践ノウハウ｜エー イレブン ワイ［WebA11y.jp］](https://weba11y.jp/know-how/guidelines/guidelines_index/#category12)

# 8. **WAI-ARIA**

---

[Accessible Rich Internet Applications (WAI-ARIA) 1.2 日本語訳](https://momdo.github.io/wai-aria-1.2/)

[【アクセシビリティ】WAI-ARIAを完全に理解した。 - Qiita](https://qiita.com/degudegu2510/items/dd072655880adbe3f58c)

# 9. 実践

---

サイトが崩れないよう気をつけて、自分のブログや進級展の作品をできる限り改善する。

**【参考】**

[storybook - Storybook](https://design.digital.go.jp/dads/html/?path=/docs/documents-%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB--docs)

※「ハンバーガーメニュー　アクセシビリティ」で検索してみる。