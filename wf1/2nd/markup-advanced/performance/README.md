# 授業ハンズオン：LUMINA EXHIBITION 2026（Webサイトパフォーマンス改善）

デジタルアート展「**LUMINA EXHIBITION 2026**」の特設LP（`index.html`）を題材に、Chrome DevTools の **Lighthouse** と **Networkタブ** でスコア・通信量を計測しながら、段階的に高速化を実装していくハンズオン演習データです。

---

## 1. Before（`starter/`）と After（`completed/`）の比較

| 項目 | ❌ 改善前（`starter/`） | ⭕️ 改善後（`completed/`） |
| --- | --- | --- |
| **画像合計サイズ** | **約 12.6 MB**（未圧縮・巨大PNG 5枚） | **約 41 KB**（WebP / AVIF / SVG：約 **99.6% 削減**） |
| **LCP（最大視覚コンテンツ）** | 3.5MBのメイン画像に誤って `loading="lazy"` が付いており大幅に遅延 | 19KBのAVIF/WebP ＋ `fetchpriority="high"` で瞬時に表示 |
| **CLS（レイアウトシフト）** | `<img>` に `width` / `height` がなく、読み込み時に下がガタンとズレる | 全画像に `width` / `height`、マップ枠に `aspect-ratio: 16 / 9` を指定し **CLS 0.000** |
| **TBT / INP（応答性・JS）** | `<head>` 内の同期JS＋450msの初期化ブロック＋`scroll` イベント監視 | `defer` 属性 ＋ `IntersectionObserver` ＋ GPU合成（`transform`）で **TBT 0ms** |
| **Webフォント・CSS** | CSS内の `@import` で6ウェイト全てを直列読み込み（`display=swap` なし） | `<head>` 内の `preconnect` ＋ 2ウェイト（400, 700）のみ ＋ `display=swap` ＋ CSS圧縮 |

---

## 2. ハンズオンの進め方（全6ステップ）

講義資料『`06_Webサイトパフォーマンス.md`』の各章にある **【🛠 ハンズオン Step 0 〜 Step 6】** に沿って進めます。

- **Step 0（3章）**：改善前のスコアと容量を Networkタブ・Lighthouse で計測する
- **Step 1（4-1）**：巨大PNG4枚を「[画像を一括リサイズ](https://saruwakakun.com/tools/image-resize/)」で縮小（メイン：1200px、カード：600px）した後、「[WebP一括変換](https://saruwakakun.com/tools/png-jpeg-to-webp/)」で `.webp` に変換し、ロゴを `logo.svg` に差し替える
- **Step 2（4-4）**：Live Sass Compiler の設定に `compressed`（`.min.css`）を追加し、`index.html` の読み込み先を `./css/style.min.css` に変更する
- **Step 3（5章）**：全 `<img>` に `width` / `height` 属性を追加し、`.access__map` に `aspect-ratio: 16 / 9;` を指定する
- **Step 4（6-2）**：`style.scss` の `@import` を削除し、`<head>` に `preconnect` ＋ 2ウェイト（`400;700`）＋ `display=swap` を追加する
- **Step 5（6-3）**：`.hero__img` の `loading="lazy"` を削除して `fetchpriority="high"` にし、下部カード画像3枚と Googleマップの `<iframe>` に `loading="lazy"` を追加する
- **Step 6（6-6）**：`<script>` に `defer` を付け、`main.js` を `IntersectionObserver` に切り替え、`.fade-in` を `transform: translateY(24px)` に変更して Lighthouse で再計測する

---

## 3. Lighthouse の警告項目と解決ステップの対応早見表

### ① `INSIGHTS`（インサイト）

| Lighthouse の警告項目（英語 / 日本語） | 原因（`starter` で起きていること） | 解決するステップ |
| --- | --- | --- |
| 🔺 **`Improve image delivery`**（画像配信の改善） | 3000px超の未圧縮PNG画像4枚（約12.6MB）とPNGロゴをそのまま配信している。 | **Step 1**：画像の一括リサイズ＆**WebP変換**、ロゴの **SVG化** |
| 🔺 **`Render-blocking requests`**（レンダリングを妨げるリクエスト） | `<head>` 内の `<script>` に `defer` がなく、CSS内で `@import` を使っている。 | **Step 4 & Step 6**：CSS `@import` 廃止（Step 4）、`<script defer>` 化（Step 6） |
| 🔺 **`Font display`**（フォント表示） | Google FontsのURLに `&display=swap` が付いていない。 | **Step 4**：Google Fontsに **`&display=swap`** と **`preconnect`** を追加 |
| 🔺 **`LCP request discovery`**（LCPリクエストの検出） | ファーストビューのメイン画像（`.hero__img`）に誤って **`loading="lazy"`** が付いている。 | **Step 5**：メイン画像の `loading="lazy"` を削除し、**`fetchpriority="high"`** を追加 |
| 🔺 **`Network dependency tree`**（ネットワーク依存関係ツリー） | `HTML` ➔ `style.css` ➔ `@import`（Google Fonts）の直列読み込みが発生している。 | **Step 4**：`style.scss` から `@import` を消し、`<head>` の `<link>` で並列化 |
| 🟧 **`Use efficient cache lifetimes`** / **`Document request latency`** | Googleマップ（外部サーバー）のリソースやローカルLive Serverの仕様による通知。 | **Step 5**：Googleマップの `<iframe>` に **`loading="lazy"`** を追加して初期通信から除外 |

### ② `DIAGNOSTICS`（診断）

| Lighthouse の警告項目（英語 / 日本語） | 原因（`starter` で起きていること） | 解決するステップ |
| --- | --- | --- |
| 🔺 **`Reduce unused CSS`**（使用していないCSSの削減） | Google Fontsで不要な6ウェイト全てを読み込んでいる（＋初回読込時のGoogleマップのCSS）。 | **Step 4 & Step 5**：フォントを **`wght@400;700` の2ウェイトのみ** に絞り（Step 4）、Googleマップに **`loading="lazy"`** を付与（Step 5） |
| 🔺 **`Minify CSS`**（CSSの最小化） | `style.css` が非圧縮（`expanded`）のまま読み込まれている。 | **Step 2**：Live Sass Compilerで **`style.min.css`（`compressed`）** を出力して読み込む |
| 🟧 **`Image elements do not have explicit width and height`** | 5箇所の `<img>` すべてに `width` と `height` 属性がなく、CLSを起こしている。 | **Step 3**：全 `<img>` に **`width` と `height` 属性**（整数値）を記述 |
| 🟧 **`Avoid enormous network payloads`**（巨大なネットワークペイロードの回避） | 未圧縮PNG画像4枚（12.6MB）＋6ウェイト分の日本語フォントで総容量が約14MBになっている。 | **Step 1 & Step 4**：画像のリサイズ＆**WebP化**（Step 1）とフォントのウェイト削減（Step 4） |
| 🟧 **`Reduce JavaScript execution time`** / **`Minimize main-thread work`** / **`Avoid long main-thread tasks`** | `js/main.js` 内の重い初期化ループ（450msロック）と旧来の `scroll` イベント監視。 | **Step 5 & Step 6**：`main.js` を **`IntersectionObserver`** に変更（Step 6）、Googleマップに **`loading="lazy"`** を付与（Step 5） |

### ③ `PASSED AUDITS`（合格している監査項目 — 自分のブログや進級展作品で警告が出たときの対策）

| 監査項目（英語 / 日本語） | 何をチェックしているか（意味） | 警告が出たときの具体的な改善策 |
| --- | --- | --- |
| 🟢 **`Layout shift culprits`**（レイアウトシフトの原因） | 画面のガタつき（CLS）を引き起こした具体的な要素の特定。 | 指摘された画像に **`width` / `height` 属性** を付けるか、親要素に **`aspect-ratio` / `min-height`** を指定する。 |
| 🟢 **`Optimize DOM size`**（DOMサイズの最適化） | HTMLタグの総数（目安：1,400個以下）やネストの深さ（32階層以下）が過剰でないか。 | 不要なラッパー `<div>` の多重ネストを減らし、シンプルなHTML構造にする。 |
| 🟢 **`Duplicated JavaScript`**（重複したJavaScript） | 同じJSライブラリ（jQueryの重複など）が2重に読み込まれていないか。 | 重複している `<script>` タグや不要なWordPressプラグインを削除する。 |
| 🟢 **`Forced reflow`**（強制リフロー） | JSでスタイル変更直後に `getBoundingClientRect()` 等で座標を毎フレーム読み取り、強制的な再レイアウトを起こしていないか。 | `scroll` イベントでの座標計算をやめ、**`IntersectionObserver`** に置き換える。 |
| ⚪️ **`INP breakdown`**（INPの内訳） | クリック・タップ操作時に発生した遅延の内訳。 | クリックイベント内で重いループ処理や大量のDOM書き換えを行わないようにする。 |
| 🟢 **`Legacy JavaScript`**（レガシーJavaScript） | 古いブラウザ向けの不要な変換コード（Polyfill）が含まれていないか。 | 古いjQueryプラグインを廃止し、モダンな標準JSや最新版のライブラリに置き換える。 |
| 🟢 **`Modern HTTP`**（最新のHTTP：HTTP/2・HTTP/3） | サーバーが多重化通信に対応した **HTTP/2 または HTTP/3** で配信しているか。 | GitHub Pages / Cloudflare / モダンなレンタルサーバーを利用する。 |
| 🟢 **`Optimize viewport for mobile`**（モバイル向けビューポートの最適化） | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` が設定されているか。 | `<head>` 内に適切な `viewport` メタタグを記述する。 |
| 🟢 **`Minify JavaScript`**（JavaScriptの最小化） | JSファイルの空白・改行・コメントが圧縮（Minify）されているか。 | 外部ライブラリは `.min.js` 版を読み込み、自作の大きなJSはMinifyする。 |
| 🟢 **`Reduce unused JavaScript`**（使用していないJavaScriptの削減） | 読み込んでいるのに実行されていないJSコードが多くないか。 | 使っていないJSライブラリ・不要なWordPressプラグインを削除するか、YouTube埋め込みをファサード化する。 |
| ⚪️ **`User Timing marks and measures`** | `performance.mark()` 等による開発者独自計測の表示欄（スコアへの影響なし）。 | 特に対策不要。 |
| ⚪️ **`Avoid non-composited animations`**（非合成アニメーションの回避） | CSSアニメーションが `top`, `left`, `width` 等で毎フレーム再レイアウトを起こしていないか。 | アニメーションさせるプロパティを **`transform`** と **`opacity`** に変更する。 |
| 🟢 **`Page didn't prevent back/forward cache restoration`**（bfcacheの復元を妨げていない） | 「戻る・進む」ボタンでページを瞬時に復元する **bfcache** が有効か。 | JSで非推奨の `window.addEventListener("unload", ...)` を使わないようにする。 |
