<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="post-all">
      <?php
      if (have_posts()):
        while (have_posts()):
          the_post();
      ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>
            <h1 class="post-title"><?php the_title(); ?></h1>
            <div class="post-contents">
              <?php the_content(); ?>
            </div>
          </article>
      <?php
        endwhile;
      endif;
      ?>
    </div>
    <div class="sidebar">
      <?php get_sidebar(); ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>