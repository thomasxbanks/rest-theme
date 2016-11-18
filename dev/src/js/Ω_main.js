"use strict"

// Events to trigger on window load
jQuery(document).ready(function($) {
    LoadFunc() // Run the load page functions


    jQuery('button[id^="load-"]').on('click', function(){
      let target = jQuery(this).data('page')
      loadPosts(target)
    })

    // Events to trigger on window scroll
    var currentScroll = 0;
    jQuery(window).scroll(function(event) {
        var scroll = jQuery(window).scrollTop()
        if (jQuery(window).scrollTop() > 100) {
            // do foo
        } else {
            // do not foo
        }


        // Directional scroll
        var nextScroll = jQuery(this).scrollTop()
        if (nextScroll > currentScroll) {
            // Scroll down the page
            console.log('you are scrolling down')
        } else {
            // Scroll up the page
            console.log('you are scrolling up')
        }

        currentScroll = nextScroll; //Updates current scroll position
    })


    // end on load
})

// Events to trigger on window resize
jQuery(window).resize(Debouncer(function(e) {
    browserSize() // Work out browser width and browser height and store as global variables for use later
}))
