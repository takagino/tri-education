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

          <section class="related-posts">
            <h2>関連記事</h2>

            <?php
            // 1. 今見ている記事のカテゴリー情報を取得
            $categories = get_the_category();

            // カテゴリーが存在する場合のみサブループを実行
            if (! empty($categories)) :
              $cat_id = $categories[0]->term_id; // 1つ目のカテゴリーのIDを取得

              // 2. 条件を指定
              $args = array(
                'post_type'      => 'post',
                'cat'            => $cat_id,
                'posts_per_page' => 3,
                'post__not_in'   => array(get_the_ID()), // 今の記事IDを除外
                'orderby'        => 'rand',                // ランダム表示
              );

              $related_query = new WP_Query($args);

              if ($related_query->have_posts()) :
                while ($related_query->have_posts()) : $related_query->the_post();
            ?>
                  <!-- パーツの呼び出し -->
                  <?php get_template_part('template-parts/loop', 'post'); ?>

            <?php
                endwhile;
                wp_reset_postdata(); // リセット
              endif;
            endif;
            ?>
          </section>

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