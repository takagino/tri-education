<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="inner">
      <div class="post-all">

        <?php
        if (have_posts()):
          while (have_posts()):
            the_post();
            get_template_part('template-parts/single', 'post');
          endwhile;
        ?>

          <div class="post-comments">
            <?php
            // コメントが開いているか、コメントが1件以上ある場合に表示
            if (comments_open() || get_comments_number()):
              comments_template();
            endif;
            ?>
          </div>

        <?php
          get_template_part('template-parts/related', 'post');
          get_template_part('template-parts/nav', 'single');
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