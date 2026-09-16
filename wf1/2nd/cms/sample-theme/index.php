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
              <img src="<?php echo esc_url(get_theme_file_uri('/images/pic_post01.jpg')); ?>" alt="">
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
          <ul>
            <li><a href="#">&lt;</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">&gt;</a></li>
          </ul>
        </div>
      </div>
      <div class="sidebar">
        <?php get_sidebar(); ?>
      </div>
    </div>
  </div>
</main>
<?php get_footer(); ?>