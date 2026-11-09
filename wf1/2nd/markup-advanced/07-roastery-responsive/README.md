# 授業演習07：KOMA ROASTERY（モダン・レスポンシブWebデザイン）

自家焙煎スペシャリティコーヒーショップ「**KOMA ROASTERY**」のWebサイト（レスポンシブ対応・2ページ構成）です。
デザインカンプではなく、完成見本（`completed/`）をブラウザの開発者ツール（Chrome DevTools）で要素検証しながら、授業資料『`05_モダン・レスポンシブWebデザイン.md`』のすべての実装テクニック（1〜8章）をライブコーディングで学べるように設計されています。

---

## 1. 基本設計仕様

- **ページ構成**：`index.html`（3セクション） / `about.html`（3セクション）
- **設計方針**：モバイルファースト（基本スタイル＝SP表示 ➔ `@include mq(md)` でPC表示を上書き・追加）
- **インナー幅**：`@mixin inner($mw: 1200px, $w: 88%)`
- **ブレイクポイント**：`700px`（`$breakpoints: ("md": 700px)` / `@media (width >= 700px)`）
- **共通BEMモジュール**：`.header`, `.gnav`, `.footer`, `.intro`, `.btn`, `.card`, `.card-wrapper`

---

## 2. 授業資料『05_モダン・レスポンシブWebデザイン.md』との対応表

| 講義セクション | 実装内容 | 該当箇所（HTML / SCSS） |
| --- | --- | --- |
| **3-1. RWDの3大要素** | Fluid Grid（`%`, `fr`, `rem`） / Fluid Image（`img, picture, video { max-width: 100%; height: auto; }`） | `style.scss` Base領域・各グリッド |
| **3-2. Viewport** | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | 両ページの `<head>` |
| **3-3. モバイルファースト** | SP 1カラムから `@include mq(md)` で横並びを追加（例：`.btn` の `width: 100%` ➔ `width: rem(240)`） | `.btn`, `.header`, `.concept` 等 |
| **4-1 / 5-3. レンジ構文 & Sass管理** | `$breakpoints` マップ ＋ `@mixin mq()`（`@media (width >= $width)`） | `style.scss` 冒頭 |
| **5-4. BEM × Sass ネスト** | 各BEMセレクタの直下に `@include mq(md)` をネストしてパーツ完結 | `style.scss` 全体 |
| **5-5. Sassスターターキット** | `!kit` スニペットと同じ変数・関数（`rem`, `ls`, `pct`）・Mixin（`mq`, `inner`）構成 | `style.scss` 冒頭 |
| **6-1 ① `<br>` の表示切替** | `.u-show-sp`（SPのみ改行） / `.u-hide-sp`（700px以上のみ改行） | `index.html`（`.hero` リード文） / `about.html`（`.pickup` リード文） |
| **6-1 ② 文節 `<span>`** | `.intro__title span { display: inline-block; }` による文節単位の折り返し | 両ページの `.intro__title` |
| **6-1 ③ `<wbr>` + `keep-all`** | `<p class="lead-text">` 内の `<wbr>` ＋ `word-break: keep-all; overflow-wrap: break-word;` | `index.html`（`.concept` リード文） |
| **6-1 ④ `text-wrap`** | 見出しに `text-wrap: balance;`、段落 `p` に `text-wrap: pretty;` | `.intro__title`, `p` |
| **6-2 パターンA：横スクロール表** | `.table-scroll`（`overflow-x: auto`）＋ `.schedule-table`（`min-width: 640px`, `white-space: nowrap`） | `about.html`（Section 2: `.schedule`） |
| **6-2 パターンB：カード変形表** | `.company-table`（SPは `display: block` で縦積み ➔ `700px` 以上で `table-row` / `table-cell`） | `about.html`（Section 3: `.company`） |
| **6-3 ① アートディレクション** | `<picture>` で `700px` 以上は `pic_hero_pc.jpg`（横長）、未満は `pic_hero_sp.jpg`（寄り）に切替 | `index.html`（Section 1: `.hero__image`） |
| **6-3 ② Retina対応（1x / 2x）** | `srcset="./images/img_logo.png 1x, ./images/img_logo@2x.png 2x"` | 両ページの `.header__logo-pic` |
| **6-3 ③ 次世代フォーマット** | `<picture>` で `pic_roast.avif`（8.6KB）➔ `pic_roast.webp`（12.4KB）➔ `pic_roast.png`（206KB）を配信 | `index.html`（Section 2: `.concept__pic`） |
| **7-1. 内包的レスポンシブ** | `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` でメディアクエリ不要の自動折り返し | `index.html`（Section 3: `.menu__list`） |
| **8-1 / 8-2. コンテナクエリ** | `.card-wrapper`（`container-type: inline-size`）＋ `.card`（`@container (width >= 480px)` で2カラム横並び化） | `about.html`（Section 1: `.pickup`） |

