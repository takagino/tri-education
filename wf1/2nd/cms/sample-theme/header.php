<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo('name'); ?></title>
    <!-- サイトの説明（検索時に出てくる文章） -->
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css/destyle.min.css">
    <link rel="stylesheet" href="<?php
                                    # PHPのコメント
                                    # getがついているタグは値を取得するだけ
                                    echo esc_url(get_stylesheet_uri());
                                    ?>">
    <?php wp_head(); ?>
</head>

<body <?php body_class('test test2'); ?>>
    <?php wp_body_open(); ?>
    <header>
        <div class="inner">
            <h1><a href="<?php echo esc_url(home_url('/')); ?>">Sample Blog</a></h1>
            <nav class="nav-global">
                <ul>
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">HOME</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about/')); ?>">ABOUT</a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">CONTACT</a></li>
                </ul>
            </nav>
        </div>
    </header>