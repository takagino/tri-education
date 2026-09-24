<aside class="side-search">
    <h2 class="side-title">Search</h2>

    <?php get_search_form(); ?>

</aside>
<aside class="side-category">
    <h2 class="side-title">category</h2>
    <ul class="side-list">
        <?php wp_list_categories(
            array(
                'title_li' => '',
                'show_count' => 1
            )
        ); ?>
    </ul>
</aside>
<aside class="side-archive">
    <h2 class="side-title">archive</h2>
    <ul class="side-list">
        <?php wp_get_archives(
            array(
                'show_post_count' => 1,
            )
        ); ?>
    </ul>
</aside>
<aside class="side-about">
    <h2 class="side-title">about</h2>
    <p class="about-name">Yamada Trou</p>
    <ul>
        <li>トライデントコンピュータ専門学校Webデザイン学科</li>
    </ul>
</aside>
<aside class="side-post">
    <?php
    $args = array(
        'post_type' => 'post',
        'category_name' => 'nobis',
        'orderby' => 'rand',
        'posts_per_page' => 3,
    );

    $custom_query = new WP_Query($args);

    if ($custom_query->have_posts()):
        while ($custom_query->have_posts()):
            $custom_query->the_post();
    ?>
            <?php get_template_part('template-parts/loop', 'post'); ?>
        <?php
        endwhile;
        wp_reset_postdata();
    else:
        ?>
        <p>記事はありません。</p>
    <?php endif; ?>

</aside>