<div id="comments" class="comments-area">

    <!-- コメント一覧の表示 -->
    <?php if (have_comments()) : ?>
        <h2 class="comments-title">テンプレートの見出し</h2>
        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 50,
            ));
            ?>
        </ol>
    <?php endif; ?>

    <!-- コメント入力フォームの表示 -->
    <?php
    comment_form(array(
        'title_reply' => 'コメントを残す',
        'label_submit' => '送信する',
    ));
    ?>

</div>