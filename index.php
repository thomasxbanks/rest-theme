<?php get_header(); ?>
<nav id="post-filter-container">
  <button class="post-filter is-active" id="-1">Most Recent</button>
  <button class="post-filter" data-type="cat" data-id="2">Burton Green</button>
  <button class="post-filter" data-type="cat" data-id="3">Chester</button>
  <button class="post-filter" data-type="cat" data-id="5">Rhos on Sea</button>
  <button class="post-filter" data-type="cat" data-id="7">Wall Heath</button>
  <button class="post-filter" data-type="cat" data-id="8">West Kirby</button>
  &nbsp;|&nbsp;
  <button class="post-filter" data-type="tag" data-id="travel">Travel</button>
  <button class="post-filter" data-type="tag" data-id="community">Community</button>
  &nbsp;|&nbsp;
  <button class="post-filter" data-type="meta_key" data-id="-1">Most Popular</button>
</nav>

<main id="rest-container">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php get_template_part( 'entry' ); ?>
<?php comments_template(); ?>
<?php endwhile; endif; ?>
<?php get_template_part( 'nav', 'below' ); ?>
</main>
<?php //get_sidebar(); ?>
<?php get_footer(); ?>
