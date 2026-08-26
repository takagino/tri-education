<?php

/**
 * テーマの初期設定
 */
function mytheme_setup()
{
    add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
    add_theme_support('title-tag'); // <title>タグの出力をWordPressに任せる（必須）
    add_theme_support('automatic-feed-links'); // RSSフィードのリンクを自動出力（必須）
    add_theme_support('wp-block-styles'); // ブロックエディタの基本スタイルをテーマに適用（Gutenberg対応）
    add_theme_support('responsive-embeds'); // YouTubeなどの埋め込み動画をレスポンシブ対応にする

    // HTML5準拠のマークアップを有効化（現代のテーマ開発で必須）
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // 絵文字のスクリプトとスタイルを削除（読み込み速度向上）
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');

    // セキュリティ強化
    remove_action('wp_head', 'wp_generator'); // WordPressのバージョン情報を削除
    remove_action('wp_head', 'rsd_link'); // EditURI（RSD）のリンクを削除
    remove_action('wp_head', 'wlwmanifest_link'); // wlwmanifest（Windows Live Writer）のリンクを削除
}
add_action('after_setup_theme', 'mytheme_setup');

/**
 * タイトルの区切り文字を変更
 */
function mytheme_change_title_separator($sep)
{
    return ' | ';
}
add_filter('document_title_separator', 'mytheme_change_title_separator');

/**
 * 抜粋の文字数を指定
 */
function mytheme_custom_excerpt_length($length)
{
    return 10; // 10文字に変更
}
// 第3引数の「999」は実行の優先順位（他の設定より確実に優先させるため）
add_filter('excerpt_length', 'mytheme_custom_excerpt_length', 999);

/**
 * 抜粋の文末文字を指定
 */
function mytheme_custom_excerpt_more($more)
{
    return ' ... 続く'; // [...] から変更
}
add_filter('excerpt_more', 'mytheme_custom_excerpt_more');

/**
 * CSSとJavaScriptの読み込み
 */
function mytheme_enqueue_scripts()
{
    // リセットCSSとメインCSS
    wp_enqueue_style('reset-css', 'https://cdn.jsdelivr.net/npm/destyle.css/destyle.min.css');
    wp_enqueue_style('my-style', get_stylesheet_uri(), array('reset-css'), filemtime(get_theme_file_path('/style.css')));
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');

/**
 * Googleフォントの preconnect を設定（※使用する場合）
 */
function mytheme_resource_hints($urls, $relation_type)
{
    if ($relation_type === 'preconnect') {
        array_push($urls, array('rel' => 'preconnect', 'href' => 'https://fonts.googleapis.com'));
        array_push($urls, array('rel' => 'preconnect', 'href' => 'https://fonts.gstatic.com', 1 => 'crossorigin'));
    }
    return $urls;
}
add_filter('wp_resource_hints', 'mytheme_resource_hints', 10, 2);
