# 06_Webサイトパフォーマンス

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

**【rem】**

```scss
$font-size-base: 16; // html要素のフォントサイズ（ディフォルト）

@function rem($px-value) {
  @return #{math.div($px-value, $font-size-base)}rem;
}

body{
  font-size: rem(14);
}
```

## **1-2. 課題の確認**

[Mache](https://takagino.github.io/doc-markup-advanced/09-mache-rem/completed/index.html)

[doc-markup-advanced/08-cubehaus-rem/completed at main · takagino/doc-markup-advanced](https://github.com/takagino/doc-markup-advanced/tree/main/08-cubehaus-rem/completed)

# 2. 今回学ぶこと

---

- Webサイトパフォーマンスの改善方法

## **2-1. Webサイトパフォーマンスとは**

Webサイトパフォーマンスとは、そのサイトがどれだけ「速く」**表示され、**「快適に」操作できるかを測る総合的な指標。

単にページ全体の読み込みが完了する速さだけではなく、ユーザーの体感として、

1. **表示速度：**
    
    主要なコンテンツが、どれだけ速くユーザーの目に見えるか。
    
2. **応答性：**
    
    ボタンのクリックや入力など、ユーザーの操作にどれだけ速く反応するか。
    
3. **視覚的な安定性：**
    
    読み込み中にレイアウトが予期せずズレたり、ガタついたりしないか。
    

といった、「ユーザー体験の質」が重視される。これらを改善することが、ユーザーにとって「使いやすい」サイトの実現に直結する。

## 2-2. **Webサイトパフォーマンス**がもたらす影響

1. **直帰率の増加：**
    
    読み込みが遅いと、ユーザーはコンテンツを見る前にサイトを閉じてしまう（離脱）。ページの表示が1秒から3秒になるだけで、直帰率は32%増加するというデータもある。
    
2. **ブランドイメージと信頼性の低下：**
    
    サイトの反応が遅い、または表示がガタつくと、ユーザーに「管理されていない」「技術力が低い」といった不信感を与え、ブランドの信頼性を損なう。
    
3. **ユーザー体験（UX）の悪化：**
    
    表示速度や反応が遅いことは、ユーザーに直接的なストレスを与え、顧客満足度（CS）を著しく低下させる。
    
4. **コンバージョン（CV）率の低下：**
    
    サイトが遅いことで購入や問い合わせといった「成果」に至る前にユーザーが諦めてしまい、ECサイトなどでは直接的な売上低下に繋がる。
    
5. **SEO（検索順位）の低下：**
    
    Googleは「ユーザーにとって快適なサイト」を高く評価している。表示速度や安定性は検索順位を決める重要な要因の一つ。
    

# 3. **ページ読込速度を確認する**

---

## 3-1. 数値で確認する（総合診断）

**目的：** サイトの「総合得点」や「どの数値が悪いか」を素早く把握する。

**【Webツール】**

[PageSpeed Insights](https://pagespeed.web.dev/)

**【Chromeデベロッパー・ツール】**

Lighthouseタブ：PageSpeed Insightsのローカル実行版

## 3-2. 上部のリスト（Core Web Vitals）

Googleの定める「快適なユーザー体験」の基準を満たしているかを示す、最も重要な3つの指標（LCP, INP, CLS）と、その診断を助けるための補足データ（FCP, TTFB）。

| 数値 | 意味 | 主な原因 |
| --- | --- | --- |
| **LCP (Largest Contentful Paint)** | メインのコンテンツ（一番大きな画像やテキストブロック）が表示されるまでの時間。 | • 画像のファイルサイズが大きすぎる。
• サーバーの応答が遅い（TTFBが遅い）。
• CSSやJavaScriptが、メインコンテンツの表示を妨げている。 |
| **INP (Interaction to Next Paint)** | ボタンクリックや画面タップ時に、ページが反応するまでの時間。 | ・JavaScriptの処理が重すぎる。 |
| **CLS (Cumulative Layout Shift)** | ページの読み込み中に、レイアウトがどれだけガタついたか。 | • 画像等に`width`と`height`属性が指定されておらず、後から読み込まれた画像が場所を押し広げる。
• Webフォントが読み込まれた瞬間、テキストの大きさが変わり、レイアウトがズレる。 |
| **FCP (First Contentful Paint)** | 何かしら最初のコンテンツ（文字、色、画像など）が表示されるまでの時間。 | • サーバーの応答が遅い（TTFBが遅い）。
• CSSやJavaScriptの読み込みが、最初の表示を「ブロック（妨害）」している。 |
| **TTFB (Time to First Byte)** | ブラウザがリクエストを送ってから、サーバーが"最初の1バイト"を返すまでの時間。 | • サーバー（レンタルサーバーなど）の性能が低い。
• サーバー側で行うデータベースの処理（例: WordPressの処理）が重い。
• ネットワークが混雑している。 |

## 3-3. 下部のリスト（パフォーマンススコアの内訳）

測定ツールが、サイトのパフォーマンスを「0点〜100点」**で採点するための**計算式。

| 数値 | 意味 | 主な原因 |
| --- | --- | --- |
| TBT (Total Blocking Time) | ページがフリーズしていて、ユーザーの操作を受け付けられない合計時間。 | ・JavaScriptの処理が重すぎる。 |
| SI (Speed Index) | ページの目に見えている範囲が、どれだけ速く"埋まっていくか。 | ・LCPやFCPの数値が悪い。
・ページの「上の方」に重い処理や画像が集中している。 |

## 3-4. データの読み込み順や内訳で確認する（精密検査）

目的：なぜスコアが低いのか、その**具体的な原因**を突き止める。

**【Chromeデベロッパー・ツール】**

Networkタブ：ページが読み込んでいる個々のファイル（画像、CSS、JS）のサイズ、数、読み込み順序を詳細に確認できる。

1. ネットワークタブを開いた状態で「スーパーリロード」（`command + shift + r`）を実行する。
2. 一覧の上部にある「サイズ」や「時間」をクリックして、影響の大きいファイルを特定する。
3. 一覧の下部にあるサマリー（概要）欄を見て、ページ全体の数値（リクエスト数, 合計サイズ, 合計時間）を確認する。

## 3-5. 具体的な改善策

- ファイルサイズを減らす。→ LCP や FCP（表示速度）の改善
- リクエスト数を減らす。→ LCP や FCP（表示速度）の改善
- レイアウトシフトを減らす。→ CLS（視覚的な安定性）の改善
- 無駄な遅延を減らす。→ INP や TBT（応答性）の改善
- サーバーからの応答時間を減らす。→ TTFB（最初の応答速度）の改善

# 4. ファイルサイズを減らす（最重要）

---

読み込まれるファイル（CSS、JavaScript、特に画像など）の容量を減らすこと。

![#sanpo.JPG](06_Web%E3%82%B5%E3%82%A4%E3%83%88%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9/sanpo.jpg)

## **4-1. 適切な「画像フォーマット」を選ぶ**

画像の特性に合わせて、最適な形式を選ぶ。

| 形式 | 説明・用途 |
| --- | --- |
| JPG | 写真やグラデーションなど、色数が多い画像。 |
| PNG | 背景を透過させたい画像、ロゴ。 |
| SVG | ロゴ、アイコン、単純な図形。拡大・縮小しても荒れず、ファイルサイズも小さいのが特徴。 |
| WebP / AVIF | JPGやPNGと比べて、画質を保ったままファイルサイズを劇的に小さくできる。 |
| GIF | ロゴ、アイコン、単純な図形。現在はSVGが主流。 |

**【WebPへの変換】**

[PNG・JPEGをWebP画像に一括変換](https://saruwakakun.com/tools/png-jpeg-to-webp/)

[Crushee](https://crushee.app/)

**【適切な「実装」を行う (`<picture>`要素)】**

```markup
<picture>
  <source srcset="images/photo.avif" type="image/avif">
  <source srcset="images/photo.webp" type="image/webp">
  <img src="images/photo.jpg" alt="説明文">
</picture>
```

※2025年現在、WebPのサポート率は97%を超えており、普段は `<img>` 要素でマークアップしても良い。

## **4-2. 不要なメタデータの削除する**

画像にはメタデータと呼ばれる撮影場所などの情報が含まれている。それを削除することで画像の容量を抑えることができる。

**【Webツール】**

[TinyPNG – Compress AVIF, WebP, PNG and JPEG images](https://tinypng.com/)

[画像圧縮ツール あっしゅくま](https://imguma.com/)

**【WordPressのプラグイン】**

[EWWW Image Optimizer](https://ja.wordpress.org/plugins/ewww-image-optimizer/)

## **4-3. CSS・JavaScriptを圧縮（Minify）する**

改行、空白、コメントなど、ブラウザの動作に不要な文字を削除し、ファイルサイズを最小限にする。

**【VSCodeの拡張機能】**

[](https://marketplace.visualstudio.com/items?itemName=miguel-colmenares.css-js-minifier)

**【Chromeの拡張機能】**

[HTML,CSS,JS Minifier & Compressor - Chrome ウェブストア](https://chromewebstore.google.com/detail/htmlcssjs-minifier-compre/fpcmjpmpcceadinjcigjlidljocdjepo?hl=ja)

**【WordPressのプラグイン】**

[Autoptimize](https://ja.wordpress.org/plugins/autoptimize/)

## 4-4. 不要なコードを削除する

[そのCSS、もっと簡潔に書けるかも - Qiita](https://qiita.com/hibikikudo/items/99f70793628ad3568b78)

[2021年に知っておきたいJavaScript最適化技術34選 - Qiita](https://qiita.com/baby-degu/items/396edbaefea64140a5d0)

# 5. リクエスト数を減らす

---

読み込まれるファイル数（CSS、JavaScript、特に画像など）を減らすこと。

<aside>
💡

現在のWebサーバーは「多重化」という技術に対応しており、一度の接続で何十個ものファイルを同時にダウンロードできるため、リクエスト数（ファイルの数）を過度に気にする必要はなくなりつつある。

</aside>

## 5-1. 画像をCSSで表現する（重要）

- **`border-radius`：**角丸のボタン（昔は画像だった）
- **`box-shadow`**：影（昔は画像だった）
- **`linear-gradient()`**：グラデーション背景（昔は画像だった）

[CSSのみのボタンデザイン – 現場で使ってきたボタンアイデア30選 | corto - デザイン制作](https://corto.jp/css-button/)

[コピペで簡単！CSSアイコンの無料マテリアルサイト、CSS LABORATORY](https://design-library.jp/lab/)

## 5-2. ブラウザキャッシュを残す

[ブラウザキャッシュの設定方法【.htaccessの書き方】](https://rentalserver-comparison.net/browser-cache.html)

**【WordPressのプラグイン】**

[【2025調査】WordPress高速化プラグインの速度ランキング（キャッシュプラグイン等） | マニュオン](https://wp-search.org/ja/blog/wordpress-plugin-speed-ranking/)

# 6. **レイアウトシフトを減らす**

---

「後から読み込まれる要素」のために、あらかじめスペースが確保すること。

## 6-1. 画像によるレイアウトシフトを防ぐ（重要）

画像が読み込まれるまで、ブラウザはその画像のサイズが分からず、スペースを確保できない。読み込みが完了した瞬間に、画像が本来の場所を確保しようとして、下にあるコンテンツを「ガタン」と押し下げてしまう。

対策：`<img>`タグに`width`と`height`属性を必ず指定する。

```markup
<img src="image.jpg" alt="...">

<img src="image.jpg" alt="..." width="1600" height="900">

<!--
・単位は必要ない。
・%は使用できない。
-->
```

## 6-2. Webフォントによるレイアウトシフトを防ぐ

Webフォント（例: Noto Sans JP）が読み込まれるまでの間、一時的に標準フォント（例: 游ゴシック）が表示される。Webフォントの読み込みが完了した瞬間、文字の太さや幅の違いからテキスト全体のレイアウトが変わり、ガタつきが発生する。

対策：`font-display: swap;`を指定する。

[font-display - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@font-face/font-display)

**【Google Fontsの場合】**

```markup
<!-- URLの末尾に &display=swap を追加する -->
<link href="https.fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
```

**【自分で`@font-face`を定義する場合】**

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap; /* ← これを追加 */
}
```

**【より高度な設定】**

[Self-HostなGoogle Fontsを使ってPage Speedに怒られないようにする | tm23forest.com](https://tm23forest.com/contents/selfhosted-googlewebfonts-psi-okoraren)

## 6-3. 動画やマップ（iframe）によるレイアウトシフトを防ぐ

Google MapやYouTubeの埋め込み`iframe`も、画像と同様に読み込みに時間がかかる。それまでサイズがゼロのため、読み込み完了時にレイアウトシフトを引き起こす。

対策：CSSの`aspect-ratio`プロパティで、あらかじめ場所（縦横比）を確保する。

```markup
<div class="map-container">
  <iframe src="httpsTo: //www.google.com/maps/embed/..."></iframe>
</div>
```

```css
.map-container {
  width: 100%;
  aspect-ratio: 4 / 3; /*「4:3」の比率のスペースを先に確保 */

  iframe {
    width: 100%;
    height: 100%;
  }
}
```

# 7. **無駄な遅延を減らす**

---

重いスクリプト（JavaScript）の処理や、画面に映っていない画像の読み込みを最適化（賢く読み込ませる）こと。

## 7-1. JavaScriptの読み込みを最適化する

デフォルトでは、ブラウザは`<script>`タグを見つけると、**HTMLの解析を一時停止**し、JavaScriptのダウンロードと実行を最優先する。これが、ページの表示が止まる（フリーズする）最大の原因。

対策：`<script>`タグに `defer` 属性を付ける。

```markup
<script src="main.js"></script>

<script src="main.js" defer></script>

<!--
【deferの効果】
1. HTMLの解析を止めない。
2. JavaScriptをバックグラウンドでダウンロードする。
3. HTMLの解析がすべて完了した後で、JavaScriptを実行する。
-->
```

**【より詳しい説明】**

[WordPressのレンダリングを妨げるリソースの除外の簡単な改善方法｜JSとCSSを非同期で解決](https://blogger-no-mori.com/eliminate-render-blocking-javascript-css/)

## 7-2. 不要な画像の読み込みを遅延させる

ページを開いた瞬間、画面に映っていないページ下部の重い画像（例: フッターの上の画像）まで全て読み込もうとすると、初期表示（LCP）に必要なリソースが奪われ、表示が遅くなる。

対策：ファーストビュー（最初に表示される画面）に**関係のない**`<img>`タグや`<iframe>`タグに `loading="lazy"` 属性を追加する。

```markup
<img src="heavy-image.jpg" alt="..." width="1000" height="500" loading="lazy">
```

<aside>
💡

WordPressでは、この`loading="lazy"`は自動で付与される。

</aside>

## 7-3. CSSの読み込み場所

CSSの読み込みが遅れると、スタイルが当たっていないHTMLが一瞬表示されたり（FOUC）、表示のガタつき（CLS）の原因となる。

対策：`<link>`タグは、`<head>`タグのできるだけ上の方に記述する。

```markup
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mache</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/the-new-css-reset/css/reset.min.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="./js/main.js"></script>
</head>
```

# 8. **サーバーからの応答時間を減らす**

---

## 8-1. 良いサーバーを借りる

「レンタルサーバー 応答速度 ランキング」で検索。

## 8-2. CDN（コンテンツ・デリバリー・ネットワーク）の活用

[CDNとは | CDNの仕組みとメリット | Cloudflare](https://www.cloudflare.com/ja-jp/learning/cdn/what-is-a-cdn/)

# 9. 実践

---

サイトが崩れないよう気をつけて、自分のブログや進級展の作品をできる限り高速化させる。