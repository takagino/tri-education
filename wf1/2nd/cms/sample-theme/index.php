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
            <article id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>
              <div class="thumbnail">
                <?php
                if (has_post_thumbnail()):
                  the_post_thumbnail('large');
                else:
                ?>
                  <img src="<?php echo esc_url(get_theme_file_uri('/images/pic_post01.jpg')); ?>" alt="">
                <?php
                endif;
                ?>
              </div>
              <h2 class="post-title"><?php the_title(); ?></h2>
              <p class="post-date">
                <time datetime="<?php echo get_the_date('Y-m-d'); ?>">
                  <?php the_time('y.m.d'); ?>
                </time>
              </p>
              <div class="post-contents">
                <?php the_excerpt(); ?>
              </div>
              <a class="post-btn" href="<?php the_permalink(); ?>">続きを読む</a>
              <div class="post-info">
                <ul>
                  <li class="post-category">Category: <?php the_category(' / '); ?></li>
                  <li class="post-tag">Tag: <?php the_tags('', ' / '); ?></li>
                </ul>
              </div>
            </article>
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