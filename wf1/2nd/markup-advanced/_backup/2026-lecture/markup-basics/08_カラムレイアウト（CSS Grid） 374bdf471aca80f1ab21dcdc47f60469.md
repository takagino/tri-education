# 08_カラムレイアウト（CSS Grid）

### HTML基礎（火1-2 / 木1-2）

[00_導入](https://app.notion.com/p/00_-309bdf471aca804b9644d028147712eb?pvs=21)

[01_HTMLとは？](https://app.notion.com/p/01_HTML-341bdf471aca80669331efd13f58af38?pvs=21)

[02_CSSとは？](https://app.notion.com/p/02_CSS-1a6bdf471aca802093eedafe4ae30a51?pvs=21)

[03_ボックスモデル](https://app.notion.com/p/03_-345bdf471aca80e19333f746e9257dc8?pvs=21)

[04_スタイルの継承](https://app.notion.com/p/04_-34fbdf471aca80269928ddd0952c3b6b?pvs=21)

[05_アウトライン](https://app.notion.com/p/05_-35dbdf471aca80199ee4db9e18976c82?pvs=21)

[06_ブロックレベルとインライン](https://app.notion.com/p/06_-364bdf471aca80cc8307feb9933ef957?pvs=21)

[07_カラムレイアウト（Flexbox）](https://app.notion.com/p/07_-Flexbox-372bdf471aca8056b7ded942a953c2d7?pvs=21)

[08_カラムレイアウト（CSS Grid）](https://app.notion.com/p/08_-CSS-Grid-374bdf471aca80f1ab21dcdc47f60469?pvs=21)

[09_中間課題](https://app.notion.com/p/09_-379bdf471aca80aba78ecd345a7bdf0b?pvs=21)

[10_スマホ対応](https://app.notion.com/p/10_-380bdf471aca80e29b02f33b08e56a03?pvs=21)

[11_要素の配置](https://app.notion.com/p/11_-387bdf471aca80609fb4d88284a6e4dd?pvs=21)

[12_擬似クラス・擬似要素](https://app.notion.com/p/12_-38abdf471aca80a2ab7cdb25176a25bf?pvs=21)

[13_最終課題](https://app.notion.com/p/13_-395bdf471aca80c2bddcc00374834383?pvs=21)

[14_その他の知識](https://app.notion.com/p/14_-39ebdf471aca80089f62d809399f2b61?pvs=21)

https://drive.google.com/drive/folders/1JBRAWjmFyuYLp04VSRHwYxtSyV68yMvO?usp=sharing

# 1. はじめに

## 1-1. 前回の復習

- Flexboxの基本ルール（親要素に「display: flex;」）
- flex-wrap（nowrap、wrap）
- justify-content（flex-start、flex-end、center、space-between、space-around、space-evenly）
- align-items（stretch、flex-start、flex-end、center）
- gap（要素間の余白）

---

## 1-2. 前回の課題

[Newslly](https://takagino.github.io/tri-education/wf1/1st/markup-basics/10-newslly/completed/)

[tri-education/wf1/1st/markup-basics/10-newslly/completed at main · takagino/tri-education](https://github.com/takagino/tri-education/tree/main/wf1/1st/markup-basics/10-newslly/completed)

---

## **1-3. 各種作業**

- 週の初めはタイピング測定
- 振り返りシートの記入

---

# **2. 今回学ぶこと**

- CSS Gridの基本ルール
- 明示的グリッド（枠を先に作るレイアウト）
- 暗黙的グリッド（要素に合わせて枠を増やすレイアウト）
- 横並びレイアウト3つの手法の使い分け（総まとめ）

---

## **2-1. サンプルデータ**

[08_カラムレイアウト（CSS Grid） - Google Drive](https://drive.google.com/drive/folders/1XPmUBf9rjanz0ygjgyBVCoihClejd74u?usp=sharing)

- 11_newslly-grid：授業で一緒にマークアップするデータ
- 12_bluetranding-grid：課題のデータ

<aside>
💡

ダウンロードしたデータはそのままにせず、授業用のフォルダに移動すること。

（データの整理が作業スピードを上げる！）

</aside>

<aside>
💡

ダウンロードしたZIPファイルは削除してもOK。

（不要なデータは削除！ゴミ箱も定期的に空にする！）

</aside>

---

## **2-2. 見本**

[Newslly](https://takagino.github.io/tri-education/wf1/1st/markup-basics/11-newslly-grid/completed/)

---

## **2-3. 途中経過**

- https://github.com/takagino/tri-education/blob/main/wf1/1st/markup-basics/11-newslly-grid/starter/index.html
- https://github.com/takagino/tri-education/blob/main/wf1/1st/markup-basics/11-newslly-grid/starter/style.css

---

## **2-4. どのようにマークアップするか考える**

- 全体の構成は？（header、main、footer）
- セクショニング・コンテンツ（section、article、aside）、見出しのレベルは？
- 画像になる部分は？（今回はこちらで準備したが、本来は自分で書き出す必要がある）
- リンクになる部分は？
- bodyに書くべき共通のプロパティは何か？

---

# 3. CSS Gridの基本ルール

CSS Gridを使うためのルールはたった1つです。

<aside>

**横に並べたい要素たちの『親要素』に `display: grid;` を書く**

</aside>

**【参考資料】**

ただし、CSS Grid は Flexbox 以上に仕組みが複雑で、プロパティもたくさんあります。

以下のサイトに比較的わかりやすくまとめられていますが、無理せず徐々に理解していきましょう。

[【CSS】グリッドの使い方から配置アルゴリズムまで理解する - Qiita](https://qiita.com/aisaka1653/items/c057e93e31c05931fcf6)

---

## 3-1. Flexbox と Grid の違い

- **Flexbox（1次元）：** 1本の「直線（行・または列）」に要素を並べるのが得意。
- **CSS Grid（2次元）：** 縦と横の「マス目」を作るのが得意。

---

# **4. CSS Gridの実践（ハンズオン）**

実際にコードを書きながら、CSS Gridの強力なレイアウト機能を体感していきましょう。

## 4-1. カードレイアウト（明示的グリッド）

まずは、Gridの王道の使い所である「カード型の記事一覧（`.posts`）」を作ります。

**【手順1】親要素をGridにする**

`style.css` の `.posts` に `display: grid;` を追加します。

```css
.posts {
  display: grid; /* 追加：Gridレイアウトを有効化する */
}
```

<aside>
💡

**【重要】デベロッパーツールでGridを可視化しよう！**

ブラウザの検証（デベロッパーツール）を開き、.posts の横に grid というバッジが付いているのを確認しておきましょう。

</aside>

**【手順2】`grid-template-columns` で枠を作る**

```css
.posts {
  display: grid;
  grid-template-columns: 380px 380px; /* 追加：380pxの列（枠）を2つ作る */
}
```

<aside>
💡

このように「あらかじめ枠（トラック）を明確に定義して要素を配置する手法」を、**明示的グリッド**と呼びます。

</aside>

---

## 4-2. 単位 `fr` と `gap`

ピクセルで固定すると、画面幅が変わった時に対応できません。ここでGrid専用の単位 **`fr`** を使って、より現代的で柔軟なコードに書き換えます。

**【手順1】ピクセルから `fr` に書き換え、余白をつける**

先ほどの `380px 380px` を削除し、以下のように書き換えます。

```css
.posts {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 変更：空間を「1：1」の比率で2つに分ける */
  gap: 45px 40px; /* 追加：縦の隙間45px、横の隙間40px */
}
```

<aside>
💡

**単位「`fr`（フラクション）」とは？**

親要素の「余っている空間を、指定した割合（比率）で分割する」というGrid専用の単位です。

`1fr 1fr` と書けば、空間を完璧に「1：1」で2等分してくれます。デベロッパーツールで可視化された線を見ると、自動で均等なマス目が作られていることがわかります。

</aside>

---

## 4-3. ヘッダーのレイアウト（暗黙的グリッド）

次に、一番上のヘッダー（ロゴとナビゲーションの2つの塊）を左右に配置します。

先ほどは「枠を先に作る（明示的）」方法でしたが、今回は「要素に合わせて自動で枠を増やす」というもう一つのアプローチを学びます。

**【手順1】自動で列を追加し続ける設定**

`style.css` の `header .inner` に以下を追加します。

```css
header .inner {
  display: grid;
  grid-auto-flow: column; /* 追加：要素があったら、自動的に「横（列）」に枠を追加していく */
}
```

⭐︎  `header .inner` の中に要素を追加してみよう。

<aside>
💡

`grid-auto-flow: column;` の動きは、Flexboxの `display: flex;` の横並びと全く同じ結果になります

</aside>

**【手順2】左右に振り分け、上下の中央を揃える**

```css
header .inner {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between; /* 追加：自動で作られた枠を、左右の両端に配置する */
  align-items: center; /* 追加：垂直方向の中央に揃える */
}
```

<aside>
💡

**配置プロパティの値の違い（start と flex-start）**

前回のFlexboxの授業では、要素を左寄せ・右寄せする時に `flex-start` や `flex-end` を使いました。しかしCSS Gridでは、頭の `flex-` を外して **`start`** や **`end`** と書くのが正式なルールです。

- **Flexboxの時：** `justify-content: flex-start;`
- **CSS Gridの時：** `justify-content: start;`

※現在はFlexboxでも `start` が使えますが、微妙に解釈が違うので、 `flex-start` と書くようにしましょう。

</aside>

---

## ⭐️ 練習

グローバルナビゲーション  を横並びにして 余白（gap）を設定してみましょう。

---

## 4-4. フッターのリスト（暗黙的と明示的の比較）

最後に、フッターのSNSアイコン（`footer ul`）を横に並べます。

ここでは、「暗黙的グリッド」と、「明示的グリッド」の2つの書き方を比較してみましょう。

**【パターンA】暗黙的グリッドで書いた場合（要素に合わせて枠を増やす）**

```css
footer ul {
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
}
```

👉 **特徴：** 枠の数を決めていないため、SNSアイコンが5個、6個と増えても、絶対に下へ折り返さず、横に無限に並び続けます。

**【パターンB】明示的グリッドで書いた場合（枠の数を固定する）**

```css
footer ul {
  display: grid;
	grid-template-columns: auto auto auto auto; /* 追加：「auto」の幅の列を「4つ」作る */ 
	gap: 20px;
}
```

👉 **特徴：** あらかじめ「4つの枠」しか用意していないため、もし5つ目のSNSアイコンが追加されると、自動的に下の行（2段目）に折り返して配置されます。

<aside>
💡

**`auto` の意味：**

「枠の横幅を、中身（SNSアイコンの画像）にピッタリ合わせる」という意味です。

もしここを `1fr`（余った空間を分け合う）にしてしまうと、4つのアイコンが画面いっぱいに広がって間延びしてしまいます。アイコンのように「中身のサイズをそのまま保って並べたい」時は、`fr` ではなく `auto` を使います。

</aside>

---

## 4-5. `repeat()`

上記のように同じ値（ `auto` など）が何度も繰り返される場合、 `repeat()` で省略することができます。

```css
footer ul {
  display: grid;
	grid-template-columns: repeat(4, auto); /* 変更：「auto」を「4回」繰り返す */ 
	gap: 20px;
}
```

---

# **5. 【まとめ】横並びレイアウトの3大手法**

ここまでで、Web制作で使われる主要な「横に並べる方法」をすべて学びました。

それぞれの特徴と、実務での「使い所」をしっかり整理しておきましょう。

---

## **手法1： `inline-block`（インラインブロック）**

**【特徴】**

文字（インライン）のように横に並びつつ、幅や高さ（ブロック）を持てる「いいとこ取り」の要素。

**【主な使い所：文章の中のパーツ】**

- 文章の横に添える「NEW!」などの小さなバッジ
- テキストの幅に合わせて伸縮する「ボタン」
- ❌ ページ全体などの大きなレイアウトには向いていません

---

## **手法2： Flexbox（フレックスボックス）**

**【特徴】**

「1次元（横一列、または縦一列）」に並べるのが大得意な手法。中身のサイズに合わせて柔軟に伸び縮みしてくれます。

**【主な使い所：一方向に並べるUI】**

- ヘッダーのナビゲーション（メニュー）
- スマホアプリでよく見る「横スクロール」する画像一覧
- アイコンとテキストの横並び

---

## **手法3： CSS Grid（グリッド）**

**【特徴】**

「2次元（縦と横のマス目）」を作るのが大得意な手法。親要素で「枠（空間）」をガッチリ決めてから、そこに要素をはめ込んでいきます。

**【主な使い所：マス目や複雑な配置】**

- 縦横にきっちり並ぶ「カード型の記事一覧」
- 画面全体を「ヘッダー・メイン・サイドバー・フッター」に分割するような大枠のレイアウト
- 写真をタイル状に敷き詰めるギャラリーサイト

---

# 6. 課題

ダウンロードしたフォルダ「12_bluetranding-grid」内のデザインデータをマークアップする。

**【提出方法】**

1. フォルダ内に新しく「index.html」「style.css」を作成しマークアップ。
2. Googleドライブの共有フォルダに提出。

[08_カラムレイアウト（CSS Grid） - Google Drive](https://drive.google.com/drive/folders/1XPmUBf9rjanz0ygjgyBVCoihClejd74u?usp=sharing)