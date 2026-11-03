# 課題07：KNOT ARCHITECTS（相対単位とBEM設計）

洗練された建築設計事務所「**KNOT ARCHITECTS**」のWebサイト（デスクトップ版 2ページ）を制作する課題です。

Royshaのような一般的なSaaS系レイアウトから離れ、**「非対称グリッド（Asymmetric Grid）」「エディトリアルなタイポグラフィ」「厳選された2セクション構成」** のもと、**Sass関数による相対単位の設計（`rem()`, `ls()`）、`clamp()`、8pxグリッド、そしてBEMのMix（ミックス）とModifier（モディファイヤー）** を実務レベルで定着させます。

---

## 1. 課題概要

- **対象ページ**：
  1. 実績一覧トップ（`index.html`：Hero ＋ Selected Works の **2セクション**）
  2. スタジオ紹介（`about.html`：Philosophy ＋ Atelier/Consultation の **2セクション**）
- **対象デバイス**：デスクトップ版（インナー幅 1240px / 画面幅 1440px想定）
- **デザインカンプ**：Figma
- **使用技術**：HTML5, Sass（SCSS記法, `@use "sass:math"`）, destyle.css

---

## 2. レイアウトとモジュール設計のポイント

### ① Royshaとは一線を画すレイアウト
- **非対称ステートメント**：Heroセクションは、大判ビジュアルの下に「左7割の巨大見出し」と「右5割のリード文」を配置。
- **非対称作品グリッド**：1行目に「2列分をぶち抜く大型フィーチャーカード（`work-card--wide`）」、2行目に「2つの縦型カード」が並ぶ動的構成。
- **エディトリアルリスト**：Aboutページでは、細いボーダーと大きなナンバリング（`01`, `02`, `03`）で区切る建築的なミニマルリスト（`approach-item`）。

### ② BEM MixとModifierの駆使
- **`.sec-head` モジュール**：ナンバリング・タイトル・リード文をまとめた共通ヘッダー。
  - Modifier：`--split`（左右振り分けレイアウト）、`--light`（暗背景用の白文字）。
- **`.work-card` モジュール**：
  - Modifier：**`--wide`**（2カラムスパンの大型カードレイアウト）。
  - BEM Mix：`<li class="works__item work-card work-card--wide">`（グリッドアイテムとブロックのMix）。
  - BEM Mix：`<span class="work-card__tag tag tag--dark">`（タグブロックとのMix）。
- **`.approach-item` モジュール**：
  - Modifier：**`--featured`**（背景アースグレーのハイライト項目）。
- **`.btn` モジュール**：
  - Modifier：**`--pill`**（カプセル型）、**`--text`**（アンダーライン・矢印付きリンク）、**`--dark`**, **`--light`**, **`--sm`**。
  - 内側余白（padding）には `em` を使用し、フォントサイズに連動。

### ③ 相対単位の徹底
- すべてのフォントサイズおよび余白に自作関数 `@function rem($px)` を使用（px直打ちは禁止）。
- Figmaのトラッキング値を自作関数 `@function ls($val)` で `em` に自動変換。
- 大見出しに `clamp()` による流体タイポグラフィを適用。
- 8pxグリッド（8, 16, 24, 32, 48, 64, 96, 120px）による一貫した余白設計。

---

## 3. フォルダ構成

```text
07-knot-rem/
├── README.md               # 本仕様書
├── completed/              # 模範解答（完成見本コード）
│   ├── index.html
│   ├── about.html
│   ├── css/style.css
│   ├── sass/style.scss
│   └── images/
└── starter/                # 学生配布用スターターファイル
    ├── index.html
    ├── about.html
    ├── css/style.css
    ├── sass/style.scss
    └── images/
```

---

## 4. Figmaカンプの作成手順（先生向け）

1. **ローカルサーバーで開く**
   - `07-knot-rem/completed/index.html` をブラウザで開きます。
2. **Figmaでプラグインを実行**
   - Figma上部メニューの `Plugins` ＞ `html.to.design` を起動します。
3. **取り込み**
   - URLを入力して「Desktop (1440px)」を選択し、**Import** を押します。
   - `about.html` も同様にインポートします。
4. **配布**
   - Figmaの共有リンクを発行し、学生に配布します。

