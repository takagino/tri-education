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