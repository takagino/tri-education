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