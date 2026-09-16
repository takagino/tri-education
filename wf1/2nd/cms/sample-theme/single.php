<!doctype html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Single | Sample Blog</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css/destyle.min.css">
  <link rel="stylesheet" href="<?php
                                echo esc_url(get_stylesheet_uri());
                                ?>">
</head>

<body>
  <header>
    <div class="inner">
      <h1><a href="index.html">Sample Blog</a></h1>
      <nav class="nav-global">
        <ul>
          <li><a href="index.html">HOME</a></li>
          <li><a href="about.html">ABOUT</a></li>
          <li><a href="contact.html">CONTACT</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <div class="contents">
      <div class="inner">
        <div class="post-all">

          <?php
          if (have_posts()):
            while (have_posts()):
              the_post();
          ?>
              <article id="post-<?php the_ID(); ?> <?php post_class('post'); ?>">
                <img src="<?php echo esc_url(get_theme_file_uri('/images/pic_post01.jpg')); ?>" alt="">
                <h2 class="post-title"><?php the_title(); ?></h2>
                <p class="post-date">
                  <time datetime="<?php echo get_the_date('Y-m-d'); ?>">
                    <?php the_time('Y.m.d'); ?>
                  </time>
                </p>
                <div class="post-contents">
                  <?php the_content(); ?>
                </div>
                <div class="post-info">
                  <ul>
                    <li class="post-category">Category: <?php the_category(' / '); ?></li>
                    <li class="post-tag">Tag: <?php the_tags('', ' / '); ?></li>
                  </ul>
                </div>
              </article>

          <?php
            endwhile;
          endif;
          ?>
          <div class="nav-page">
            <ul>
              <li><a href="#">←前の記事</a></li>
              <li><a href="#">一覧に戻る</a></li>
              <li><a href="#">次の記事→</a></li>
            </ul>
          </div>
        </div>
        <div class="sidebar">
          <aside class="side-category">
            <h2 class="side-title">category</h2>
            <ul class="side-list">
              <li><a href="#">日常生活</a></li>
              <li><a href="#">読書</a></li>
              <li><a href="#">作品</a></li>
            </ul>
          </aside>
          <aside class="side-archive">
            <h2 class="side-title">archive</h2>
            <ul class="side-list">
              <li><a href="#">2020年9月</a></li>
              <li><a href="#">2020年8月</a></li>
              <li><a href="#">2020年7月</a></li>
            </ul>
          </aside>
          <aside class="side-about">
            <h2 class="side-title">about</h2>
            <p class="about-name">Yamada Trou</p>
            <ul>
              <li>トライデントコンピュータ専門学校Webデザイン学科</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="inner">
      <ul class="nav-sns">
        <li><a href="#">Twittr</a></li>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Facebook</a></li>
      </ul>
      <p><small>Copyright sample-blog All Rights Reserved.</small></p>
    </div>
  </footer>
</body>

</html>