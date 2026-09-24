<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="inner">
      <div class="post-all">

        <p>ページ専用</p>

        <?php
        if (have_posts()):
          while (have_posts()):
            the_post();
            get_template_part('template-parts/page', 'post');
          endwhile;

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