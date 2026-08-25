<article id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>

  <?php
  if (has_post_thumbnail()):
    the_post_thumbnail('thumbnail');
  else:
  ?>

    <img src="<?php echo esc_url(get_theme_file_uri('/images/pic_post01.jpg')); ?>" alt="">

  <?php
  endif;
  ?>

  <h2 class="post-title"><?php the_title(); ?></h2>
  <p class="post-date">
    <time datetime="<?php echo get_the_date('Y-m-d'); ?>">
      <?php the_time('Y年n月j日'); ?>
    </time>
  </p>
  <div class="post-contents">
    <?php the_excerpt(); ?>
  </div>
  <a class="post-btn" href="<?php the_permalink(); ?>">続きを読む</a>
  <div class="post-info">
    <ul>
      <li class="post-category">Category: <?php the_category(','); ?></li>
      <li class="post-tag">Tag: <?php the_tags('', ' / '); ?></li>
    </ul>
  </div>
</article>