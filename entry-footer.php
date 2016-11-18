<footer class="entry-footer">
  <?php if (is_singular()) { ?>
    <span class="cat-links"><?php _e( 'Categories: ', 'blankslate' ); ?><?php the_category( ', ' ); ?></span>
    <span class="tag-links"><?php the_tags(); ?></span>
    <?php if ( comments_open() ) {
    echo '<span class="meta-sep">|</span> <span class="comments-link"><a href="' . get_comments_link() . '">' . sprintf( __( 'Comments', 'blankslate' ) ) . '</a></span>';
    } ?>
  <?php } else { ?>
    <a class='button' href='<?php echo get_the_permalink(); ?>'>Read more</a>
  <?php }  ?>
</footer>
