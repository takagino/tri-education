<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="post-all">
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