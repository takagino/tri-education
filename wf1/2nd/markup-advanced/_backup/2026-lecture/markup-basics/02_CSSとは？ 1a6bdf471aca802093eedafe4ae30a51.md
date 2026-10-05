# 02_CSSとは？

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

- 授業について（科目のねらい、到達目標、評価の観点）
- HTMLとは？（言葉の意味、誕生の歴史・目的）
- 覚える用語（開始タグ、終了タグ、要素、属性、属性名、属性値）
- 基本的なタグ（h1～h6、p、ul 、ol、li、br、a、img）
- HTML基本構造（html、body、head、文字コード、title）
- DOCTYPE宣言

【課題の確認】

[YUKI](https://takagino.github.io/tri-edu-markup-basics/artist/)

```markup
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>YUKI</title>
  </head>

  <body>
    <h1>YUKI</h1>
    <img src="https://www.billboard-japan.com/common/sys/img/special/00000003/3826/image.jpg" width="800">

    <h2>プロフィール</h2>
    <p>
      日本の歌手。ロックバンドJUDY AND MARYの元ボーカリスト。<br>
      本名、倉持有希。旧姓、磯谷。北海道函館市出身。
    </p>

    <h2>好きな曲ベスト3</h2>
    <ol>
      <li>
        <a href="https://www.youtube.com/watch?v=Lnj1SLrcIJA">JOY</a>
      </li>
      <li>
        <a href="https://www.youtube.com/watch?v=sE35aNNrdvo">ハミングバード</a>
      </li>
      <li>
        <a href="https://www.youtube.com/watch?v=LI8m9wnZqpY">ハローグッバイ</a>
      </li>
    </ol>

    <h2>各種リンク</h2>
    <ul>
      <li>
        <a href="https://www.yukiweb.net/">オフィシャル</a>
      </li>
      <li>
        <a href="https://cosmicbox.net/login.php">ファンクラブ</a>
      </li>
    </ul>
  </body>
</html>

```

---

## **1-2. 各種作業**

- 週の初めはタイピング測定
- 振り返しシートの記入

---

## 1-3. 便利な拡張機能「Live Server」の導入

**【Live Serverの主な機能】**

- **自動更新（ホットリロード）：** VS Codeでファイルを保存（`command + s`）した瞬間、自動的にブラウザが更新され、最新の状態が表示されます。
- **ローカルサーバーの構築：** 自分のPC内に仮想のWebサーバーを立ち上げます。（将来的にJavaScriptや3Dグラフィックスなどを扱う際、ただファイルをダブルクリックで開いただけでは動かない技術があり、このサーバー機能が必須になります）

**【インストール手順】**

1. VS Codeの画面左側にあるアイコンバーから、「拡張機能（4つの四角形が集まったアイコン）」をクリックする。
2. 検索バーに `live server` と入力する。
    
    ![CleanShot 2026-04-16 at 08.46.47@2x.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/CleanShot_2026-04-16_at_08.46.472x.png)
    
3. 検索結果から「Live Server（作成者: Ritwick Dey）」を探す。
※似たような名前の偽物があるため、必ず作成者名とアイコン（紫の電波マーク）を確認すること！
4. 「インストール」ボタンをクリックする。
5. インストールが完了したら、VS Codeを一度再起動（閉じて、もう一度開く）しておくと確実です。

**【起動方法】**

Live Serverを使うための絶対条件として、必ず「**フォルダを開いている状態**」で実行してください。（ファイルだけを単独で開いていると、正常に動作しません）

**方法A：画面右下の「Go Live」ボタンから起動する**

1. VS Codeの画面右下（ステータスバー）にある **「Go Live」** という文字をクリックする。
    
    ![CleanShot 2026-04-16 at 08.47.37@2x.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/CleanShot_2026-04-16_at_08.47.372x.png)
    
2. 自動的にブラウザが立ち上がり、プレビューが表示されます。
※URLが「http://127.0.0.1:5500/...」のようになっていれば成功です！

**方法B：右クリックメニューから起動する**

1. 左側のエクスプローラー（ファイル一覧）から、 `index.html` の上で右クリックする。
2. メニューの中から **「Open with Live Server」** を選択する。
    
    ![CleanShot 2026-04-16 at 08.48.22@2x.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/CleanShot_2026-04-16_at_08.48.222x.png)
    
3. 自動的にブラウザが立ち上がります。

---

# **2. CSSとは？**

## **2-1. Cascading Style Sheets**

**【Cascading（カスケーディング）】**

cascade（カスケード）の現在分詞。（今まさに〜している、〜している状態にある）

cascade（カスケード）とは、何段も連なった小さな滝のこと。転じて、同じものがいくつも数珠つなぎに連結された構造や、連鎖的あるいは段階的に物事が生じる様子を表す。

CSSで使われるcascade（カスケード）の場合、ある要素の見た目を決定する際に、上流で適用された見た目を引き継ぎ、競合する場合は上書きしながら、段階的に設定していくことを意味する。

**【Style Sheet（スタイルシート）】**

スタイルシート (style sheet) とは、構造化文書（例えばHTML）などにおける表示形式を制御する仕組み。見た目と構造を分離するという目的で提唱された。※CSSの場合、一つの文書に複数のスタイルシートを使用することが多いので「sheets」と複数形になっていると高木は予想している。

まとめると、CSSとは、

> **構造化文書の構造とは分離した形で、見た目を段階的に設定していく仕組み**
> 

すなわち、

> **構造を設定する言語が「HTML」、見た目を設定する言語が「CSS」**
> 

---

## **2-2. CSSの歴史**

「何のため？」を知るには、**それが出来た歴史（背景）**を知るべし！

- 1994年、WWW生誕の地であるCERNに勤務するホーコン・ウィウム・リーにより提唱される。
- 1996年12月、Cascading Style Sheets, level 1 (CSS1), 勧告。
- 1998年5月、Cascading Style Sheets, level 2 (CSS2), 勧告。
- 2011年6月、Cascading Style Sheets, level 2 revision 1 (CSS2.1), 勧告。
- 現在、「CSS3」を策定中。

**【W3C勧告とは？】**

W3Cが作成する技術文書にはその成熟までにいくつかの段階があり、技術に関するテストやレビュー、仕様変更を重ね、長い時間をかけて文書の内容を改良している。その流れの中での最後の段階で「仕様が完全に決まり、規格文書が公式に発表される状態」のことを勧告という。

---

# **3. CSSの基本構造**

## **3-1. HTMLファイルの準備**

1. 「Visual Studio Code」を立ち上げる。
2. この単元用のフォルダを作成。（「02」など）
3. フォルダを、マウスでドラッグ&ドロップ。もしくは、メニュー『ファイル > フォルダーを開く...』でフォルダを選択。
4. 「作成者を信頼しますか？」と聞かれたら、「親フォルダーすべてを信頼します」にチェックを入れ、「はい、作成者を信頼します」をクリック。
5. エクスプローラーから「新規ファイル」をクリック。
6. 「`index.html`」と入力して「returnキー」を押す。

※ネット上に公開するファイルは、**すべてアルファベットで保存する**こと。（文字化けや読み込みエラーの原因になる）

※ファイル名を「index.html」にすると、URLへの入力が不要になる。

**【ショートカット】**

- 新規ファイル『`command + n`』
- 保存『`command + s`』
- ブラウザの再読み込み『`command + r`』

---

## 3-2. HTMLの記述

サンプルコードを極力見ないで、基本構造を記述する。

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSSとは？</title>
  </head>
  <body>
    <p>本文です。</p>
  </body>
</html>
```

---

## 3-3. CSSの記述

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSSとは？</title>
    
    <!-- 追加 -->
    <style>
    p { color : red; }
    </style>

  </head>
  <body>
    <p>本文です。</p>
  </body>
</html>
```

**【正式名称】**

![css01.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/css01.png)

![css02.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/css02.png)

- "{" から "}" までの部分を「**宣言ブロック**」という。
- "p" の部分を「**セレクタ（選択子）**」といい、スタイルが適用される対象をしめす。
- "color : red" の部分を「**宣言**」という。
- 宣言のうち、":" より前（上例では "color"）を「**プロパティ（特性）**」という。
- 宣言のうち、":" より後（上例では "red"）を「値」という。

**【書き方のルール】**

- プロパティ、":"、値の前後には空白文字（スペース、タブ、改行など）を自由に入れることができる。
- 大文字小文字は区別されないが、基本的にはすべて小文字で。
- ";"で区切ることにより、複数の宣言を書くことができる。

```html
<style>
p {
  color : red;
  background-color : green;
}
</style>
```

---

## **3-4. どのようなプロパティがあるのか？**

[CSS リファレンス - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference)

---

## **3-5. 記述場所「style属性」**

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSSとは？</title>
  </head>
  <body>
    <p style="color:red; background-color:green;">本文です。</p>
  </body>
</html>
```

htmlとcssが同一文書に混在し「構造化文書の構造とは分離した形」というCSSの概念に反しているので、基本的には使わない。

---

## **3-6. 記述場所「style要素」**

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSSとは？</title>
    
    <style>
    p {
      color : red;
      background-color : green;
    }
    </style>
    
  </head>
  <body>
    <p>本文です。</p>
  </body>
</html>
```

こちらもhtmlとcssが混在してしまうため、実務では基本的には使わない。

※授業では簡略化のため使用する場合がある。

---

## **3-7. 記述場所「外部ファイル」**

現在公開されているほとんどのWebサイトは「外部CSSファイル」を読み込ませて、見た目を設定している。

**【外部ファイル化のメリット】**

- 構造と見た目を分離できる。
- 1つのCSSファイルを複数のHTMLに読み込むことができる。

**【外部ファイルの準備】**

1. エクスプローラーから「新規ファイル」をクリック。
2. 「**style.css**」と入力して「returnキー」を押す。
3. 以下のCSSを書いて保存。

    
    ```css
    /* 文字コードの設定 */
    @charset "UTF-8";
    
    p {
      color : red;
      background-color : green;
    }
    ```
    

<aside>
💡

**注意）**「style.css」が同じフォルダ内にあることを確認すること！

</aside>

**【link要素（HTMLとCSSを紐づけ）】**

現在の文書と外部のリソースとの関係を指定する。

一般的に、「**rel（relationship）属性**」で関係性、「**href（hypertext reference）属性**」でリソースの場所を設定する。

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSSとは？</title>
    <!-- 追加 -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>本文です。</p>
  </body>
</html>
```

**【コメントの書き方】**

```css
/* CSSのコメントアウト */

/*
複数行にわたっても大丈夫
ほとんどのプログラミング言語がこの形
*/
```

**【VSCodeでのコメントアウト】**

- 文字列を選択して、ショートカット『`command + /`』
- 1行すべて選択する場合は「行数」の数字をクリック

---

# **4. 配色関連のプロパティ**

たくさんあるプロパティの中で、最初に覚えるべきは「配色関連」のプロパティ。

```css
p {
  color : red; /* テキストやテキスト装飾の色の値を設定する */
  background-color : green; /* 背景色を設定する */
}
```

---

## **4-1. 色の指定方法**

**【カラーネームで設定する】**

```css
p {
  color : red;
  background-color : green;
}
```

ブラウザによっては使用出来ないものもあり、覚えるのも面倒くさいので普通は使わない。

**【RGB値で設定する】**

```css
p {
  color : rgb(255, 0, 0);

  /*
  color : rgb(red[赤], green[緑], blue[青]);
  値の範囲はそれぞれ [0〜255]
  */

  background-color : rgba(0, 255, 0, 0.5);

  /*
  background-color : rgba(red[赤], green[緑], blue[青], alpha[透明度]);
  透明度の範囲 [0（完全に透明） 〜 1（完全に不透明）]
  */
}
```

文字色にはあまり使われないが、背景色を透明にしたい場合に使われることが多い。

**【HSL値で設定する】**

```css
p {
  color : hsl(30, 100%, 50%);

  /*
  color : hsl(hue[色相], saturation[彩度], lightness[輝度]);
  値の範囲は、
  色相 [0〜360]
  彩度 [0%（灰色） 〜 100%（純色）]
  輝度（きど） [0%（黒） 〜 100%（白）] ※50%で純色
  */

  background-color : hsla(30, 100%, 50%, 0.5);
}
```

[https___qiita-image-store.s3.amazonaws.com_0_112405_0357edb9-ad29-e738-647b-42a1b21caf23.avif](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/https___qiita-image-store.s3.amazonaws.com_0_112405_0357edb9-ad29-e738-647b-42a1b21caf23.avif)

私はあまり使ったことがないが、便利な場面はありそう。

**【HEXコード（16進数カラーコード）で設定する】**

```css
p {
  color : #ff0000;
  background-color : #00ff00;
}
```

![hex.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/hex.png)

- 白）#ffffff = rgb(255, 255, 255)
- 黒）#000000 = rgb(0, 0, 0)
- 赤）#ff0000 = rgb(255, 0, 0)

通常はこの「HEXコード」で指定することがほとんど。

※値を覚えるのは無理なので、その都度調べる。

※「#ffffff」や「#33ff99」のように、赤・緑・青それぞれの2文字が同じ場合、「**#fff**」「**#3f9**」に省略できる。

[16進数](http://www.infonet.co.jp/ueyama/ip/glossary/hexadecimal.html)

---

## **4-2. 色の調べ方**

HEXコード（例えば「#ffffff」）でGoogle検索すると、カラーピッカーと変換ツールが表示されて便利。

※業務でWebサイトをマークアップする場合は、デザイナーが「Figma」などのソフトで制作したデータ通りの色にする必要があるため、デザインデータの色を細かく調べて指定していく。

---

## **4-3. 各種サービス**

**【配色】**

[本当に役立つ配色サービス30選。配色難民の新人デザイナーに捧ぐ](https://liginc.co.jp/399974)

**【Chrome拡張】**

[ColorZilla - Chrome ウェブストア](https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=ja)

---

# **5. テキスト関連のプロパティ**

配色に合わせて、最初に覚えるべきは「テキスト関連」のプロパティ。

## 5-1. 文字の太さ

**`font-weight`**

```css
/* キーワード値を覚える */
p {
  font-weight: normal; /* 通常 */
  font-weight: bold; /* 太字 */
}
```

---

## 5-2. 文字の文体

**`font-style`**

```css
/* キーワード値を覚える */
p {
  font-style: normal; /* 通常体 */
  font-style: italic; /* 筆記体 */
  font-style: oblique; /* 斜体 */
}
```

---

## 5-3. 文字のサイズ

**`font-size`**

```css
/* 絶対的な長さの単位「px」 */
p {
  font-size: 20px;
}
```

[px（ピクセル）って何だ？Webの世界の単位を知ろう｜スタッフブログ｜東京都新宿区のWeb制作会社 - ウェブラボ](https://www.weblab.co.jp/blog/staff/design/8436.html)

※使用できる単位は他にもあるが、今は「px」をしっかり理解すること。

---

## **5-4. 行の高さ**

**`line-height`**

```css
/* 相対的な長さの単位「em」「%」 */
p {
  line-height: 2em; /* フォントサイズの2倍 */
  line-height: 200%; /* フォントサイズの200% */
}
```

![line-height.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/line-height.png)

```css
/* ただし、単位をつけない場合がほとんど */
p {
  line-height: 1.5;
}
```

---

## 5-5. 文字間

**`letter-spacing`**

```css
/*
相対的な長さの単位「em」
「%」は反映されない
*/
p {
  letter-spacing: 0.5em; /* フォントサイズの0.5倍 */
}
```

![letter-spacing.png](02_CSS%E3%81%A8%E3%81%AF%EF%BC%9F/letter-spacing.png)

---

## 5-6. 行揃え

**`text-align`**（テキストアライン）

```css
/* キーワード値を覚える */
 p {
  text-align: left; /* 左揃え（初期値） */
  text-align: right; /* 右揃え */
  text-align: center; /* 中央揃え */
  text-align: justify /* 両端揃え */
}
```

---

## 5-7. その他のプロパティ

**`list-style-type`**

リスト項目要素のマーカーを設定する

```css
ul {
  list-style-type: none; /* none（ナン）と読む */
}
```

---

# 6. **要素に名前をつける（id属性とclass属性）**

## **6-1. id属性**

- 「固有名を割り当てる」
- 同じid名は、**1ページ中に1度**しか使用できない。

```markup
<!-- HTMLの書き方 -->
<h1 id="main">
```

```css
/* CSSの書き方 */
h1#main {
  color: #f00;
}

/* 要素名は省略できる */
#main {
  color: #f00;
}
```

---

## **6-2. class属性**

- 「種別名を割り当てる」
- 同じclass名を、**1ページ中に何度**でも使用できる。

```markup
<!-- HTMLの書き方 -->
<h2 class="sub">
<p class="sub">
```

```css
/* CSSの書き方 */
h2.sub {
  color: #0f0;
}

p.sub {
  color: #0f0;
}

/* 要素名は省略できる（class名が付いたすべての要素） */
.sub {
  color: #0f0;
}
```

**【名前の付け方】**

- 「aaa」などの意味のない文字列は使用しない。
- 「aka」「dai」「syou」「midashi」などの、日本語をローマ字にしただけの名前はかっこ悪いので使用しない。
- 「red」「big」など、デザインが変わった際にややこしくなるような名前は使用しない。

[CSSのクラス名を決めるときに使うリストをつくりました - Qiita](https://qiita.com/manabuyasuda/items/dbb76ed36970bec95470)

※最近では、デザインをパーツに分け使い回す傾向にあるため、すべての名前に***「class属性」***を使うのがほとんど。

---

# **7. 課題**

前回の課題「**1番好きなアーティストを紹介するページ**」をCSSで装飾する。

**【注意点】**

- できる限り多くのプロパティを使用すること。

**【提出方法】**

1. 新規フォルダ「出席番号_苗字」を作成し、前回の課題で作成したHTMLファイルを複製。
2. 新たに「style.css」を同じ階層に作成し、自由に装飾する。

**【締切】**

**次回授業開始時まで**

**【提出先】**

[02_CSSとは？ - Google Drive](https://drive.google.com/drive/folders/1YYXa4BDgfLI_8rEdBbHLwPMWy_dfnAVb?usp=sharing)

※フォルダごと提出してください。