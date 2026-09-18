<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- サイトの説明（検索時に出てくる文章） -->
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <?php wp_head(); ?>
</head>

<body <?php body_class('test test2'); ?>>
    <?php wp_body_open(); ?>
    <header>
        <div class="inner">

            <?php if (is_front_page() || is_home()): ?>
                <h1>
                    <a href="<?php echo esc_url(home_url('/')); ?>">Sample Blog</a>
                </h1>
            <?php else: ?>
                <div>
                    <a href="<?php echo esc_url(home_url('/')); ?>">Sample Blog</a>
                </div>
            <?php endif; ?>
            <nav class="nav-global">
                <ul>
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">HOME</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about/')); ?>">ABOUT</a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">CONTACT</a></li>
                </ul>
            </nav>
        </div>
    </header>