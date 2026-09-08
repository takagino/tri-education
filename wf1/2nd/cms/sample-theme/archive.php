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

          <!-- 切り取った跡地に以下を記述 -->
          <?php get_template_part('template-parts/loop', 'post'); ?>

        <?php endwhile; ?>

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

      <?php else: ?>

        <!-- 記事がない場合の処理 -->
        <p>記事がありません。</p>

      <?php endif; ?>
    </div>
    <div class="sidebar">
      <?php get_sidebar(); ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>