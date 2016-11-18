<?php get_header(); ?>
<nav id="post-filter-container">

    <button data-name="recent" class="post-filter is-active" data-type="cat" data-id="-1">Most Recent</button>
    <button data-name="burton-green" class="post-filter" data-type="cat" data-id="2">Burton Green</button>
    <button data-name="chester" class="post-filter" data-type="cat" data-id="3">Chester</button>
    <button data-name="rhos-on-sea" class="post-filter" data-type="cat" data-id="5">Rhos on Sea</button>
    <button data-name="wall-heath" class="post-filter" data-type="cat" data-id="7">Wall Heath</button>
    <button data-name="west-kirby" class="post-filter" data-type="cat" data-id="8">West Kirby</button>

    <button data-name="travel" class="post-filter" data-type="tag" data-id="travel">Travel</button>
    <button data-name="community" class="post-filter" data-type="tag" data-id="community">Community</button>

    <button data-name="popular" class="post-filter" data-type="meta_key" data-id="popular">Most Popular</button>

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
