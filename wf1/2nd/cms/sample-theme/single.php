<?php get_header(); ?>
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
              <?php the_post_thumbnail('thumbnail'); ?>
              <h1 class="post-title"><?php the_title(); ?></h1>
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

          <?php endwhile ?>
          <div class="nav-page">
            <ul>
              <li><?php previous_post_link('%link', '←前の記事'); ?></li>
              <li><a href="<?php echo esc_url(home_url('/')); ?>">一覧に戻る</a></li>
              <li><?php next_post_link('%link', '次の記事→'); ?></li>
            </ul>
          </div>
        <?php else: ?>
          <p>記事はありません。</p>
        <?php endif; ?>
      </div>
      <div class="sidebar">
        <?php get_sidebar(); ?>
      </div>
    </div>
  </div>
</main>
<?php get_footer(); ?>