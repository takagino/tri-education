<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="inner">
      <div class="post-all">
        <p class="archive-title">
          「<?php echo get_search_query(); ?>」の検索結果
        </p>
        <?php
        if (have_posts()):
          while (have_posts()):
            the_post();
        ?>

            <?php get_template_part('template-parts/loop', 'post'); ?>

        <?php
          endwhile;
        endif;
        ?>

        <div class="nav-page">
          <?php
          # argument(引数)
          $arg = array(
            'prev_text' => '<',
            'next_text' => '>',
            'type' => 'list',
            'mid_size' => 1
          );

          the_posts_pagination($arg);
          ?>
        </div>
      </div>
      <div class="sidebar">
        <?php get_sidebar(); ?>
      </div>
    </div>
  </div>
</main>
<?php get_footer(); ?>