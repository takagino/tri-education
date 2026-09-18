<?php get_header(); ?>
<main>
  <div class="contents">
    <div class="inner">
      <div class="post-all">
        <p class="archive-title">
          <?php if (is_category()): ?>
            <!-- カテゴリー一覧ページの場合 -->
            <?php single_cat_title(); ?>の記事一覧
          <?php elseif (is_tag()): ?>
            <!-- タグ一覧ページの場合 -->
            <?php single_tag_title(); ?>の記事一覧
          <?php elseif (is_month()): ?>
            <!-- 月別アーカイブページの場合 -->
            <?php the_time('Y年n月'); ?>の記事一覧
          <?php elseif (is_search()): ?>
            <!-- 検索結果ページの場合 -->
            「<?php echo get_search_query(); ?>」の検索結果
          <?php else: ?>
            <!-- その他のアーカイブページ -->
            過去の記事一覧
          <?php endif; ?>

          <?php
          if (is_category()):
            echo 'これは、' . single_cat_title('', false) . 'の記事一覧';
          elseif (is_tag()):
            echo single_tag_title('', false) . 'の記事一覧';
          elseif (is_month()):
            echo get_the_time('Y年n月') . 'の記事一覧';
          elseif (is_search()):
            echo get_search_query() . 'の検索結果';
          else:
            echo '過去の記事一覧';
          endif;
          ?>
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