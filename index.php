<?php get_header(); ?>
<nav id="post-filter-container">
    <ul class="list-hz">
      <li>
        <button data-name="recent" class="post-filter is-active" data-type="cat" data-id="-1">Most Recent</button>
      </li>
      <li>
        <button data-name="popular" class="post-filter" data-type="meta_key" data-id="popular">Most Popular</button>
      </li>
      <li>
        <span>Venue</span>
        <ul class="drop-down">
          <li><button data-name="all-venues" class="post-filter" data-type="cat" data-id="15">All Venues</button></li>
          <li><button data-name="burton-green" class="post-filter" data-type="cat" data-id="2">Burton Green</button></li>
          <li><button data-name="chester" class="post-filter" data-type="cat" data-id="3">Chester</button></li>
          <li><button data-name="rhos-on-sea" class="post-filter" data-type="cat" data-id="5">Rhos on Sea</button></li>
          <li><button data-name="wall-heath" class="post-filter" data-type="cat" data-id="7">Wall Heath</button></li>
          <li><button data-name="west-kirby" class="post-filter" data-type="cat" data-id="8">West Kirby</button></li>
        </ul>
      </li>
      <li>
        <span>Category</span>
        <ul class="drop-down">
          <li><button data-name="travel" class="post-filter" data-type="tag" data-id="travel">Travel</button></li>
          <li><button data-name="community" class="post-filter" data-type="tag" data-id="community">Community</button></li>
        </ul>
      </li>
    </ul>
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
