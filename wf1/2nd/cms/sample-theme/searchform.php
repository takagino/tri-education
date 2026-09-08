<form method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <input type="search" name="s" class="search-field" placeholder="キーワード検索..." value="<?php echo get_search_query(); ?>">
    <button type="submit" class="search-submit">
        検索 </button>
</form>