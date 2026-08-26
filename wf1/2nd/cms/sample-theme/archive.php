<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="post-all">
      <?php if (is_category()): ?>
        <!-- カテゴリー一覧ページの場合 -->
        <?php single_cat_title(); ?>の記事一覧
      <?php elseif (is_tag()): ?>
        <!-- タグ一覧ページの場合 -->
        <?php single_tag_title(); ?>の記事一覧
      <?php elseif (is_month()): ?>
        <!-- 月別アーカイブページの場合 -->
        <?php the_time('Y年n月'); ?>の記事一覧
      <?php else: ?>
        <!-- その他のアーカイブページ -->
        過去の記事一覧
      <?php endif; ?>

      <?php
      if (have_posts()):
        while (have_posts()):
          the_post();
      ?>
          <article class="post">
            <div class="thumbnail">
              <?php
              if (has_post_thumbnail()):
                the_post_thumbnail('medium');
              else:
              ?>
                <img src="<?php echo esc_url(get_theme_file_uri('/images/pic_post01.jpg')); ?>" alt="No Image">
              <?php
              endif;
              ?>
            </div>
            <h2 class="post-title"><?php the_title(); ?></h2>
            <p class="post-date">
              <time datetime="<?php echo get_the_date('Y-m-d'); ?>">
                <?php the_time('Y年n月j日'); ?>
              </time>
            </p>
            <div class="post-contents">
              <?php the_excerpt(); ?>
            </div>
            <a class="post-btn" href="<?php the_permalink(); ?>">続きを読む</a>
            <div class="post-info">
              <ul>
                <li class="post-category">Category: <?php the_category(', '); ?></li>
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
          <?php
          $arg = array(
            'mid_size' => 1,
            'prev_text' => '<',
            'next_text' => '>',
            'type' => 'list'
          );
          the_posts_pagination($arg);
          ?>
        </ul>
      </div>
    </div>
    <div class="sidebar">
      <?php get_sidebar(); ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>