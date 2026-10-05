# 01_PHPの基礎

# はじめに

## 本日のゴール

- WordPressとは何か
- 開発環境の準備（MAMP）
- PHPの基礎

---

# 2. **WordPressとは？**

WordPressとは、**オープンソース**のブログ用**CMS**の一つ。**PHP**で開発されており、**データベース管理システム**としてMySQLを利用している。利用者の増加やプラグインの導入により、ブログ以外のサイトにも使われるようになっている。

[【2026】CMSシェア率ランキングトップ10！失敗しない選び方 | ホームページ集客講座【初心者用】](https://ts-smartplan.com/?p=3017)

---

## **2-1. 関連用語**

- **オープンソース：**ソフトウェアのソースコードを無償で公開し、誰でも自由に改良・再配布ができるようにしたソフトウェア。
- **CMS：**「Contents Management System：コンテンツ・マネジメント・システム」の略で、テキストや画像などのコンテンツを一元管理し、Web技術者以外がサイトの構築や編集を行えるようにするシステム。
- **PHP：**「PHP: Hypertext Preprocessor」の略で、動的にWebページを生成するために用いられるプログラミング言語の一つ。
- **データベース管理システム：**ハードディスクなどのストレージ装置（外部記憶装置）内に専用の管理領域を設け、データを記録するための構造体の作成や消去、構造の修正、データの書き込み、上書き、削除などを行う。

---

# **3. 開発環境の準備**

HTMLやCSSは、自分のPC内（ローカルホスト・ローカル環境）に保存したファイルでもブラウザで確認できたが、WordPressなどのPHPで書かれたファイルは、サーバー上（リモートホスト・リモート環境）でないと表示や確認ができず、変更のたびにアップロードしなければならない。

そこで今回は、PC内にサーバーと同じ環境を再現できる便利ツールを使用する。

**【代表的なツール】**

- [XAMPP（どちらかというと「Windows」向き）](https://www.apachefriends.org/jp/index.html)
- [MAMP（どちらかというと「Mac」向き）](https://www.mamp.info/)
- [Local by Flywheel（WordPressに特化したツール）](https://localwp.com/)

授業では、PHPやデータベースの勉強のために「MAMP」、WordPressの構築のために「Local」を使用します。

---

## **3-1. MAMPのインストール**

MAMPとは「Macintosh」「Apache」「MySQL」「PHP」の頭文字をとったもので、それぞれのソフトウェアをまとめてインストールできる開発環境構築ツールのこと。

【**MAMPのダウンロード**】

本来は[公式サイト](https://www.mamp.info/en/downloads/)からダウンロードしますが、時間がかかるのでこちらでダウンロードしておきました。

1. Finderメニュー『移動 > サーバへ接続...』を選択。

    ![01.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/01.png)

2. 「**smb://172.16.1.140**」に接続。パスワードを聞かれたら入力（生年月日8桁）。
3. 「pub_配布用folder」を選択し「OK」をクリック。

    ![03.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/03.png)

4. 『2026 > WF1 > 後期 > CMS集中制作』にあるファイルを、デスクトップにドラッグ&ドロップ。

    ![04.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/04.png)


【**MAMPのインストール**】

1. ドラッグ&ドロップしたファイルをダブルクリック。
2. 手順に従ってインストール。
3. アプリケーションフォルダ内に「MAMPフォルダ」と「MAMP PRO」がインストールされるので、『MAMPフォルダ > MAMP』を立ち上げる。（**MAMP PROは使用しない**）

    ![05.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/05.png)


**【動作確認】**

1. 右上の「Start」をクリック。

    ![SCR-20260817-lqcq.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-lqcq.png)

2. 「Start」が「Stop」に変わり、自動的にスタートページが立ち上がったら起動完了。

    ![08.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/08.png)

3. 動作確認ができたら、「Stop」をクリックしてサーバーを終了しておく。

<aside>
💡

カーソルがくるくるして固まってしまった人は、『**`command`** + **`option`** + **`esc`**』で強制終了する。

</aside>

---

## **3-2. ドキュメントルートの変更**

MAMPでは、作成したファイルを「アプリケーション > MAMP > htdocs」に置くことでブラウザに表示させることができる。このファイルの置き場所のことを「**ドキュメントルート**」と呼ぶ。

毎回「htdocs」フォルダにアクセスするのは面倒なので、保存先を変更しておくと便利。

1. 書類（Documents）などの任意の場所に「MAMP」フォルダを新規作成しておく。
2. MAMPメニュー『MAMP > Settings...』、もしくは左上の「Preferences」アイコンを選択。

    ![SCR-20260817-lsez.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-lsez.png)

3. 「Server」タブを選択し、「Document Root:」の項目の「Choose...」ボタンをクリック。

    ![SCR-20260817-ltah.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-ltah.png)

4. 作成した「MAMP」フォルダを選択し、「Choose」をクリック。
5. 「OK」をクリックして設定完了。

---

## **3-3. PHPファイルの表示**

1. MAMPのサーバーを「Start」させておく。
2. 「Visual Studio Code」を立ち上げ、『**`command`** + **`n`**』で新規ファイルを作成。
3. 以下のソースコードを記述。

    ```php
    <?php echo "Hello World!"; ?>
    ```

4. ファイル名 **`hello.php`** とし、先ほど設定した保存場所に保存。
5. スタートページのURLを「**http://localhost:8888/hello.php**」に変更してブラウザを再読み込み。
6. 「Hello World!」と表示されたら成功。

    ![10.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/10.png)


---

## **3-4. ポート番号の変更**

ポート番号とは、コンピュータが通信に使用するプログラムを識別するための番号のこと。IPアドレスを建物の住所にたとえるなら、ポートは個別の部屋、ポート番号は部屋番号に相当する。HTTP通信には通常「80番」が使用される。

WordPressで使用するポート番号は「8888」に設定されているため、「**http://localhost:8888/**」のようにURLにポート番号が表示される。

ポート番号を「80番」に設定することで、「**http://localhost/**」のシンプルな形に変更することができる。

1. MAMPメニュー『MAMP > Settings...』、もしくは左上の「Preferences」アイコンを選択。
2. 「Ports」タブを選択し、Set Web & MySQL ports to：「80 & 3306」をクリック。

    ![SCR-20260817-mast.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mast.png)

3. 「OK」をクリックすると、MAMPのサーバーが自動的に再起動される。
4. 「**http://localhost/hello.php**」の表示を確認して完了。

<aside>
⚠️

エラーが出る人は、他の通信とバッティングしている可能性があるため、初期設定に戻しておく。

</aside>

---

## 3-5. **拡張機能「PHP Intelephense」の導入**

[](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

**【主な機能】**

- **コード補完：**関数やクラス名を途中まで打つと、候補を自動で表示します。
- **コードジャンプ：**関数や変数を選んで、それが定義された場所にすぐ移動できます。
- **エラー検出：**記述ミスや型の間違いなどをリアルタイムで見つけて教えてくれます。
- **フォーマッター：**乱れたコードの見た目やインデントをきれいに整えます。

**【インストール＆設定】**

1. [上記サイト](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)のインストールボタンをクリック。

    ![SCR-20260817-mdzl.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mdzl.png)

2. VSCodeに移動するので、「インストール」をクリック。
3. 左側メニュー「拡張機能」の検索欄に「**@builtin php**」と入力。

    ![SCR-20260817-memc.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-memc.png)

4. 「PHP言語機能」を選択し、「無効にする」をクリック。

    ![SCR-20260817-mesa.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mesa.png)

5. 「拡張機能の再起動」をクリックして完了。

---

# 4. PHPとは？

「PHP: Hypertext Preprocessor」の略。HTML内にPHPを埋め込むことで、動的にWebページを生成することができるプログラミング言語の一つ。

**【PHPでできること】**

- ブログ
- お問い合わせフォーム
- 検索機能
- ログイン機能
- SNS
- ECサイト
- 予約システム　などなど

**【フロントエンドとバックエンドの比較】**

| **項目** | **フロントエンドエンジニア** | **バックエンドエンジニア** |
| --- | --- | --- |
| **領域** | ユーザーの「目に見える」表側 | ユーザーの「目に見えない」裏側 |
| **言語** | HTML, CSS, JavaScript | PHP, データベース (MySQLなど) |
| **役割** | デザインの再現、アニメーション、操作画面の構築 | データの保存・呼び出し、検索やログインなどの処理 |

---

## **4-1. 基本的な書き方**

**【HTMLのみで書かれたページ（静的ページ）】**

**`hello.php`**

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>PHP TEST</title>
</head>
<body>
    <p>2 + 3</p>
</body>
</html>
```

**【PHPが埋め込まれたページ（動的ページ）】**

**`hello.php`**

```php
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>PHP TEST</title>
</head>
<body>
		<!-- 変更 -->
    <p><?php echo 2 + 3; ?></p>
</body>
</html>
```

| 命令 | 説明 |
| --- | --- |
| **`echo`** | 文字列を出力する

※ WordPressでもよく使うので覚えましょう |

---

## **4-2. PHPの文法**

- PHPは、**開始タグ「<?php」**と**終了タグ「?>」**の中に記述し、囲まれた部分を「**PHPブロック**」と呼ぶ。
- 基本的にすべて半角の英数字・記号で入力する。（特に全角スペースに注意）
- 行の末尾には「;（セミコロン）」をつける。
- 改行やスペースは無視されるが、単語（echoなど）の途中に入れてはならない。
- 「<?PHP」「ECHO」などの大文字でも動作するが、紛らわしいので小文字に統一する。
- 「"（ダブルクォーテーション）」や「'（シングルクォーテーション）」で囲んだ部分は文字列として扱われる。

---

## **4-3. コメント**

PHPには2種類の1行コメントと、1種類のブロックコメントがある。

```php
<?php
// スラッシュ2つで1行コメント
# ハッシュ記号で1行コメント

/*
スラッシュとアスタリスクで複数行コメント（ブロックコメント）
*/
?>
```

---

# **5. PHPによるデータの受け渡し**

PHPにデータを渡してやることで、同じソースコードでも違う内容を表示するWebページを作ることができる。受け渡す方法は以下の2つ。

- データを見える形で受け取る「**GET**」
- データを見えない形で受け取る「**POST**」

---

## **5-1. GETメソッド**

**【特徴】**

- データがURLで引き渡される。
- 少量のデータ送信に向いている。
- URLが変わるため「シェア」や「ブックマーク」ができる。

**【HTMLでフォームを作る】**

**`hello.php`**

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>GET TEST</title>
</head>
<body>
    <h1>フォームデータの送信</h1>
    <form action="hello.php" method="get">
        <input type="text" name="comment">
        <input type="submit" value="送信">
    </form>
</body>
</html>
```

⭐️ 入力フォームに何かを入力し「送信」ボタンを押して、URLの変化を見てみよう。

**【データを受け取る】**

**`hello.php`**

```php
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>GET TEST</title>
</head>
<body>
    <h1>フォームデータの送信</h1>
    <form action="hello.php" method="get">
        <input type="text" name="comment">
        <input type="submit" value="送信">
    </form>

    <!-- 追加 -->
    <p>
        <?php
        $comment = $_GET['comment'];
        echo $comment;
        ?>
    </p>
</body>
</html>
```

| 命令 | 説明 |
| --- | --- |
| **`$_GET[ ]`** | [ ]のなかに、受け取りたいフォームの「name属性」を指定することで、データを受け取ることができる。 |

<aside>
💡

悪意のある人がフォームに **`<script>悪さをするプログラム</script>`** などのコードを入力して送信した場合、そのまま **`echo`** で出力すると、ブラウザが「これはプログラムだ」と勘違いして実行してしまいます（これをクロスサイトスクリプティング（XSS）と呼びます）。

そのようなHTMLの特殊文字（**`<`** や **`>`** など）を、「文字列（**`&lt;`** や **`&gt;`**）」に変換し、プログラムとして動かないように無害化（サニタイズ）してくれる関数を使うとセキュリティが向上します。

```php
<?php
$comment = htmlspecialchars($_GET['comment'], ENT_QUOTES, 'UTF-8');
echo $comment;
?>

<?php
# 第1引数 $_GET['comment']： 変換したい元のデータ。
# 第2引数 ENT_QUOTES： 「'（シングルクォーテーション）」と「"（ダブルクォーテーション）」の両方とも変換するという指示ルール。
# 第3引数 'UTF-8'： 文字化けを防ぐための文字コードの指定。
?>
```

</aside>

---

## **5-2. PHPの変数**

```php
// 変数名の前に「$（ドル記号）」を使って定義する
$comment

/*
1文字目にはアルファベットの小文字・大文字、もしくはアンダースコアが使用可能（「a〜z, A〜Z, _」）
2文字目以降には、数字も使用可能
アルファベットの小文字と大文字は区別される
*/
$var
$_var
$VAR345
$str
$STR

# 悪い例
$123var // 先頭に数字は使用できない
$変数 // ※仕様上は動きますが、現場では日本語の使用は厳禁です
```

---

## **5-3. POSTメソッド**

**【特徴】**

- データがHTMLフォームで引き渡される。
- 大容量のデータ送信に向いている。
- URLが変わらないためセキュリティが強い。（ログインなど）

**【HTMLでフォームを作る】**

**`hello.php`**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>POST TEST</title>
</head>

<body>
  <h1>フォームデータの送信</h1>
  <form action="hello.php" method="post">
    <input type="text" name="comment">
    <input type="submit" value="送信">
  </form>
</body>
</html>
```

⭐️ 入力フォームに何かを入力し「送信」ボタンを押して、URLの変化を見てみよう。

**【データを受け取る】**

**`hello.php`**

```php
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>POST TEST</title>
</head>

<body>
  <h1>フォームデータの送信</h1>
  <form action="hello.php" method="post">
    <input type="text" name="comment">
    <input type="submit" value="送信">
  </form>

  <!-- 追加 -->
  <p>
    <?php
      $comment = $_POST['comment'];
      echo $comment;
    ?>
  </p>
</body>
</html>
```

| 命令 | 説明 |
| --- | --- |
| **`$_POST[ ]`** | [ ]のなかに、受け取りたいフォームの「name属性」を指定することで、データを受け取ることができる。 |

<aside>
⚠️

「GETメソッド」よりセキュリティが強いとはいえ、よくわからないままお問い合わせフォームなどを作ってしまうと非常に危険なので、充分注意してください。

</aside>

---

# **6. データベースの操作**

データベースからデータを取得しブラウザに表示してみましょう。

ただし、だいぶ難しいので今回はサンプルコードを用いて体験だけしてみます。

---

## **6-1. データベースの作成**

1. 「MAMP」の「WebStart」をクリックし、スタートページを開く。
2. 上部メニュー『Tools > phpMyAdmin』を選択。

    ![SCR-20260817-mnqy.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mnqy.png)

3. 上部タブ「データベース」をクリックし、下図のように設定し「作成」をクリック。

    ![SCR-20260817-mogq.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mogq.png)

4. 左側のデータベース一覧に「test」が追加されたら完了。

    ![SCR-20260817-mooj.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mooj.png)


---

## **6-2. テーブルの作成**

**【テーブルとは？】**

データベース内でデータを種類ごとにまとめておくもの。（商品テーブル、顧客テーブルなど）

<aside>
💡

「Excel」で例えると、データベース自体が「Excelファイルそのもの」、テーブルが「シート」のようなもの。

![02.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/02.png)

</aside>

**【作成するテーブル「item」】**

| id | name | price |
| --- | --- | --- |
| 1 | コーラ | 100 |
| 2 | お茶 | 80 |
| 3 | コーヒー | 150 |

**【手順】**

1. 「phpMyAdmin」画面で、データベース「test」、「構造タブ」が表示されていることを確認。
2. テーブル名「item」、カラム数「3」として「作成」をクリック。

    ![SCR-20260817-mqcn.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mqcn.png)

3. 下図のように入力し、「保存する」をクリック。

    ![SCR-20260817-mqol.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mqol.png)

4. 3種類のデータを保存できるテーブルが完成。

    ![SCR-20260817-mqzy.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mqzy.png)


**【タイプ（データ型）とは？】**

プログラミング言語などが扱うデータをいくつかの種類に分類し、それぞれについて名称や特性、範囲、扱い方、表記法、メモリ上での記録方式などの規約を定めたもの。

変数に入る値の種類を限定することで、エラーを回避したり、動作を軽くしたりすることができる。

| **`INT`** | 整数データ |
| --- | --- |
| **`VARCHAR`** | 文字データ（今回は最大100文字、それ以降は切り捨て） |

---

## **6-3. データの追加**

データを保存する場所は完成したが、まだデータが空なので、いくつか追加してみましょう。

1. 「phpMyAdmin」画面で、データベース「test」、テーブル「item」が選択されていることを確認。
2. 「挿入」タブを選択、下図のようにデータを入力し「実行」をクリック。

    ![SCR-20260817-mtet.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mtet.png)

3. 「表示」タブを選択し、データが追加されたか確認する。

    ![SCR-20260817-mtpa.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mtpa.png)

4. その他2つのデータも追加する。

    ![SCR-20260817-mucv.png](01_PHP%E3%81%AE%E5%9F%BA%E7%A4%8E/SCR-20260817-mucv.png)


---

## **6-4. データの取得**

**`hello.php`**

```php
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>POST TEST</title>
</head>

<body>
    <?php
    # 1. データベースに接続するための情報を準備します
    $dsn = 'mysql:dbname=test;host=localhost'; # 接続先（testデータベース）
    $user = 'root'; # ユーザー名
    $password = 'root'; # パスワード

    try {
        # 2. 準備した情報を使って、データベースに接続します
        $dbh = new PDO($dsn, $user, $password);
    } catch (PDOException $e) {
        # もし接続に失敗した場合は、エラーメッセージを表示します
        echo $e->getMessage();
    }

    # 3. 「item」テーブルからすべてのデータを取り出すSQL文を実行します
    $query = $dbh->query('SELECT * FROM item');

    ?>

    <table border="1">
        <tr>
            <th>ID</th>
            <th>名前</th>
            <th>価格</th>
        </tr>
        <!-- 4. 取り出したデータを1行ずつ順番に取り出し、データがなくなるまで繰り返します -->
        <?php while ($row = $query->fetch()) { ?>
            <tr>
                <!-- $row['カラム名'] で各データを取り出して、HTMLとして表示します -->
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['price']; ?></td>
            </tr>
        <?php } ?>
    </table>
</body>

</html>
```