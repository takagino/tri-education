<?php
/**
 * テーマの初期設定
 */
function mytheme_setup() {
  // 1. アイキャッチ画像を有効化
  add_theme_support( 'post-thumbnails' );
  
  // 2. <title>タグの出力をWordPressに任せる（必須）
  add_theme_support( 'title-tag' );
  
  // 3. RSSフィードのリンクを自動出力
  add_theme_support( 'automatic-feed-links' );
  
  // 4. HTML5準拠のマークアップを有効化（現代のテーマ開発で必須）
  add_theme_support( 'html5', array(
    'search-form',
    'comment-form',
    'comment-list',
    'gallery',
    'caption',
    'style',
    'script'
  ) );

  // 5. ブロックエディタの基本スタイルをテーマに適用（Gutenberg対応）
  add_theme_support( 'wp-block-styles' );
  
  // 6. YouTubeなどの埋め込み動画をレスポンシブ対応にする
  add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'mytheme_setup' );

/**
 * タイトルの区切り文字を変更
 */
function mytheme_change_title_separator( $sep ) {
  return ' | ';
}
add_filter( 'document_title_separator', 'mytheme_change_title_separator' );

/**
 * 抜粋の文字数を指定
 */
function mytheme_custom_excerpt_length( $length ) {
  return 10;
}
add_filter( 'excerpt_length', 'mytheme_custom_excerpt_length', 999 );

/**
 * 抜粋の文末文字を指定
 */
function mytheme_custom_excerpt_more( $more ) {
  return ' ... 続く';
}
add_filter( 'excerpt_more', 'mytheme_custom_excerpt_more' );

/**
 * CSSとJavaScriptの読み込み
 */
function mytheme_enqueue_scripts() {
  // リセットCSS
  wp_enqueue_style( 'reset-css', 'https://unpkg.com/modern-css-reset/dist/reset.min.css' );
  
  // メインCSS
  // ★ポイント：filemtime()を使ってファイルの最終更新日時をバージョン番号にする。
  // これにより、CSSを更新するたびに自動でキャッシュがクリアされ、「CSSが反映されない！」というトラブルを防げます。
  wp_enqueue_style( 'my-style', get_stylesheet_uri(), array('reset-css'), filemtime( get_theme_file_path( '/style.css' ) ) );

  // JavaScript（jQueryを依存関係とし、フッターで読み込み）
  if ( is_front_page() ) {
    wp_enqueue_script( 'my-script', get_theme_file_uri( '/script.js' ), array( 'jquery' ), filemtime( get_theme_file_path( '/script.js' ) ), true );
  }
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_scripts' );

/**
 * 固定ページで「抜粋」を有効化
 */
add_post_type_support( 'page', 'excerpt' );

/**
 * カテゴリーとタグのmeta descriptionからpタグを除去
 */
remove_filter( 'term_description', 'wpautop' );
