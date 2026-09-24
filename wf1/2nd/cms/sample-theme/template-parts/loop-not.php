<p>記事はありませんが、以下の記事はもっとおすすめです。</p>

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