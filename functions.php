<?php
add_action('after_setup_theme', 'blankslate_setup');
function blankslate_setup()
{
    load_theme_textdomain('blankslate', get_template_directory().'/languages');
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    add_theme_support('post-thumbnails');
    global $content_width;
    if (!isset($content_width)) {
        $content_width = 640;
    }
    register_nav_menus(
array('main-menu' => __('Main Menu', 'blankslate'))
);
}
add_action('wp_enqueue_scripts', 'blankslate_load_scripts');
function blankslate_load_scripts()
{
    wp_enqueue_script('jquery');
}
add_action('comment_form_before', 'blankslate_enqueue_comment_reply_script');
function blankslate_enqueue_comment_reply_script()
{
    if (get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_filter('the_title', 'blankslate_title');
function blankslate_title($title)
{
    if ($title == '') {
        return '&rarr;';
    } else {
        return $title;
    }
}
add_filter('wp_title', 'blankslate_filter_wp_title');
function blankslate_filter_wp_title($title)
{
    return $title.esc_attr(get_bloginfo('name'));
}
add_action('widgets_init', 'blankslate_widgets_init');
function blankslate_widgets_init()
{
    register_sidebar(array(
'name' => __('Sidebar Widget Area', 'blankslate'),
'id' => 'primary-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => '</li>',
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
));
}
function blankslate_custom_pings($comment)
{
    $GLOBALS['comment'] = $comment; ?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
<?php

}
add_filter('get_comments_number', 'blankslate_comments_number');
function blankslate_comments_number($count)
{
    if (!is_admin()) {
        global $id;
        $comments_by_type = &separate_comments(get_comments('status=approve&post_id='.$id));

        return count($comments_by_type['comment']);
    } else {
        return $count;
    }
}

wp_register_style('main-style', get_template_directory_uri().'/assets/css/style.css', null, null, 'all');
wp_enqueue_style('main-style', get_stylesheet_uri());

wp_register_script('main-script', get_template_directory_uri().'/assets/js/bundle.js', null, null, 'all');
wp_enqueue_script('main-script', get_template_directory_uri().'/assets/js/bundle.js');

wp_register_script('mobile-detect-script', '//wurfl.io/wurfl.js', null, null, 'all');
wp_enqueue_script('mobile-detect-script', '//wurfl.io/wurfl.js');

wp_register_script('datetime-script', '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js', null, null, 'all');
wp_enqueue_script('datetime-script', '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js');

wp_register_script('hmac-script', '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha1.js', null, null, 'all');
wp_enqueue_script('hmac-script', '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha1.js');

wp_register_script('base64-script', '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64-min.js', null, null, 'all');
wp_enqueue_script('base64-script', '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64-min.js');

wp_register_script('masonry-script', 'https://unpkg.com/masonry-layout@4.1/dist/masonry.pkgd.min.js', null, null, 'all');
wp_enqueue_script('masonry-script', 'https://unpkg.com/masonry-layout@4.1/dist/masonry.pkgd.min.js');

add_theme_support( 'post-thumbnails' );


function post_date()
{ ?>
    <time class="datetime" pubdate datetime="<?php echo get_the_date('Y-m-d H:i:s'); ?>" itemprop="datePublished">
        <?php
        $post_date = get_the_time('d, m, Y');
        $current_date = date('d, m, Y');
        if ($post_date == $current_date) {
            $hrs_ago = round((date('U') - get_the_time('U')) / 3600);
            if ($hrs_ago < 1) {
                echo 'less than an hour ago';
            } elseif ($hrs_ago == 1) {
                echo $hrs_ago . ' hour ago';
            } else {
                echo $hrs_ago . ' hours ago';
            }
        } else { ?>
            <?php echo get_the_time('l jS F Y'); ?>
        <?php } ?>
    </time>
<?php }

function my_allow_meta_query( $valid_vars ) {

  $valid_vars = array_merge( $valid_vars, array( 'meta_key', 'meta_value', 'meta_query' ) ); // Omit meta_key, meta_value if you don't need them
  return $valid_vars;
}
add_filter( 'rest_query_vars', 'my_allow_meta_query' );
