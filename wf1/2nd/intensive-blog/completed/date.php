<?php get_header(); ?>
    <main>
      <div class="contents">
        <div class="post-all">
          <?php echo esc_html( get_query_var( 'year' ) ); ?>年<?php echo esc_html( get_query_var( 'monthnum' ) ); ?>月

          <?php
          if(have_posts()):
          while(have_posts()):
          the_post();
          ?>

          <?php get_template_part( 'template-parts/content' ); ?>

          <?php endwhile; ?>

          <div class="nav-page blog">
            <?php
            the_posts_pagination(
              array(
                'mid_size' => 3,
                'next_text' => '>',
                'type' => 'list'
              )
            );
            ?>
          </div>

          <?php else: ?>
          <?php get_template_part( 'template-parts/content', 'none' ); ?>
          <?php endif; ?>
        </div>
        <div class="sidebar">
          <?php get_sidebar(); ?>
        </div>
      </div>
    </main>
<?php get_footer(); ?>
