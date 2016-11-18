<?php if (is_singular()) {
  $postClass = "post-full";
} else {
  $postClass = "post-card";
}
?>
<article id="post-<?php the_ID(); ?>" class="<?php echo $postClass; ?>">
  <figure><img src='<?php echo get_the_post_thumbnail_url(); ?>' alt='<?php echo get_the_title(); ?>' /></figure>
  <header>
<h1 class="entry-title"><?php the_title(); ?></h1>
<?php if (!is_search()) {
    get_template_part('entry', 'meta');
} ?>

</header>
<?php if (is_singular()) {
  get_template_part('entry', 'content');
} else {
  get_template_part('entry', 'summary');
}
?>

<?php
    get_template_part('entry-footer');
?>
</article>
