            <article id="post-<?php the_ID(); ?> <?php post_class('post'); ?>">
                <?php the_post_thumbnail('thumbnail'); ?>
                <h1 class="post-title"><?php the_title(); ?></h1>
                <div class="post-contents">
                    <?php the_content(); ?>
                </div>

            </article>