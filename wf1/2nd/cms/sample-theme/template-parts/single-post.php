            <article id="post-<?php the_ID(); ?> <?php post_class('post'); ?>">
                <?php the_post_thumbnail('thumbnail'); ?>
                <h1 class="post-title"><?php the_title(); ?></h1>
                <p class="post-date">
                    <time datetime="<?php echo get_the_date('Y-m-d'); ?>">
                        <?php the_time('Y.m.d'); ?>
                    </time>
                </p>
                <div class="post-contents">
                    <?php the_content(); ?>
                </div>
                <div class="post-info">
                    <ul>
                        <li class="post-category">Category: <?php the_category(' / '); ?></li>
                        <li class="post-tag">Tag: <?php the_tags('', ' / '); ?></li>
                    </ul>
                </div>
            </article>