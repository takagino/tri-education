# 授業ハンズオン：MORI LIBRARY（Webアクセシビリティ改善）

架空の公共図書館「**MORI LIBRARY**」のサイトを題材に、Chrome DevTools の **Lighthouse（Accessibility）**・**キーボード操作（Tab / Enter）**・**視覚障害エミュレート** を使って、アクセシビリティ問題を段階的に改善していくハンズオン演習データです。

---

## 1. Before（`starter/`）と After（`completed/`）の比較

| 項目 | ❌ 改善前（`starter/`） | ⭕️ 改善後（`completed/`） |
| --- | --- | --- |
| **HTML構造・見出し** | `lang` 属性なし、`<title>` が無題、`<div class="main">`、`h1` の次が `h3`、`<div class="hamburger">` | `lang="ja"`、固有 `<title>`、`<main>` ランドマーク、正しい `h1` ➔ `h2` ➔ `h3`、`<button>` |
| **代替テキスト・SVG** | 画像に `alt` なし、飾り線に `alt="飾り線"`、矢印SVGに `aria-hidden` なし、「こちら」リンク、`iframe` に `title` なし | 適切な `alt` と `alt=""`、`aria-hidden="true"`、`.visually-hidden` で飛び先を明示、`iframe` に `title` |
| **色・コントラスト・動き** | 薄いグレー文字（コントラスト比不足）、赤文字だけの警告、`prefers-reduced-motion` 未対応 | 4.5:1 以上の濃い文字色、アイコン（⚠）＋【重要】併用、`@media (prefers-reduced-motion: reduce)` |
| **キーボード・フォーカス** | `*:focus { outline: none; }` でフォーカスが見えない、スキップリンクなし、固定ヘッダー下に潜り込む | `:focus-visible` でくっきり表示、`.skip-link` 設置、`scroll-margin-top` / `scroll-padding-top` |
| **フォーム** | `<label>` がなく `placeholder` のみ、`autocomplete` や `aria-describedby` なし | `<label for="...">` ＋ `id` 紐付け、`autocomplete`、`aria-describedby` |
| **WAI-ARIA・ネイティブHTML** | `<div>` 自作アコーディオン（キーボード不可）、メニュー開閉の `aria-expanded` / `inert` なし | `<details>`/`<summary>` で標準化、`aria-expanded` / `aria-controls` / `inert` / Escキー対応 |

---

## 2. ハンズオンの進め方（全6ステップ）

1. **Step 0（Before計測）**：`starter/index.html` をシークレットウィンドウで開き、**Lighthouse（Accessibility）** のエラー一覧と、**`Tab` キーのみ** で操作できない箇所を確認する。
2. **Step 1（3章：正しいHTML構造）**：`lang="ja"`、`<title>`、`<main>`、`h2` への修正、`<div class="hamburger">` を `<button type="button">` に変更。
3. **Step 2（4章：代替テキスト・SVG・リンク・iframe）**：`alt` / `alt=""` の設定、`aria-hidden="true"`、`.visually-hidden` によるリンク補足、外部リンク事前予告、`iframe` の `title` 追加。
4. **Step 3（5章：色・コントラスト・動き）**：`$color-text` / `$color-muted` / `$color-accent` のコントラスト改善、重要お知らせへのテキスト併用、`prefers-reduced-motion` 対応。
5. **Step 4（6章：キーボード・フォーカス）**：`*:focus { outline: none; }` を削除して `:focus-visible` を設定、`.skip-link` 追加、`scroll-margin-top` / `scroll-padding-top` 設定。
6. **Step 5（7章：フォーム最適化）**：`<label for="...">`、`autocomplete`、`aria-describedby` の追加。
7. **Step 6（8章：ネイティブHTML & WAI-ARIA）**：FAQを `<details>`/`<summary>` に変更し、`main.js` で `aria-expanded` / `inert` / `Esc` キー対応を実装して **Lighthouse Accessibility 100点** を確認する！
