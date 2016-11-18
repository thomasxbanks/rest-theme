<?php get_header(); ?>
<section id="content" role="main">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <?php
    $playCount = (int) get_field('post_count');
    ++$playCount;
    update_field('post_count', $playCount);
    echo '<div>This post has been viewed '.$playCount.' time(s).</div>';
  ?>
<?php get_template_part('entry'); ?>
<?php if (!post_password_required()) {
    comments_template('', true);
} ?>
<?php endwhile; endif; ?>
<footer class="footer">
<?php get_template_part('nav', 'below-single'); ?>
</footer>
</section>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
