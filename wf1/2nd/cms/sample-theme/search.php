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
            get_template_part('template-parts/loop', 'post');
          endwhile;
          get_template_part('template-parts/nav', 'page');
        else:
          get_template_part('template-parts/loop', 'not');
        endif;
        ?>
      </div>
      <div class="sidebar">
        <?php get_sidebar(); ?>
      </div>
    </div>
  </div>
</main>
<?php get_footer(); ?>