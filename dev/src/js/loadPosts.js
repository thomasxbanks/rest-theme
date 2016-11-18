let url = "//wordpress-rest/wp-json/wp/v2/posts?"

function PostTemplate(post) {
    // Log for Debug
    //console.log(post)
    // Create variables for all the bits you need
    let hero = post._embedded["wp:featuredmedia"]["0"].source_url
    let title = post.title.rendered
    let content = post.excerpt.rendered || post.content.rendered
    let id = post.id
    let permalink = post.link
    let datePost = moment(post.date).format('Do MMMM YYYY')
    let dateUTC = post.date

    // Create the HTML to inject
    let postCard = "<article class='post-card shrink'><figure><img src='" + hero + "' alt='" + title + "' /></figure><header><h1>" + title + "</h1><time datetime='" + dateUTC + "'>" + datePost + "</time></header><div class='post-content'>" + content + "</div><footer><a class='button' href='" + permalink + "'>Read more</a></footer></article>"

    // Inject it!
    jQuery('main').append(postCard)
}

function ActiveNavItem(name) {
    jQuery('.post-filter').removeClass('is-active')
    jQuery('[data-name="' + name + '"]').addClass('is-active')
}

jQuery('button.post-filter').on('click', function() {
    let query = jQuery(this).data('id')
    let type = jQuery(this).data('type')
    FilterPosts(query, type)
})

function NewPostsLayout() {
    // Init Masonry
    jQuery('#rest-container').masonry('reloadItems').masonry({
        // options
        itemSelector: '.post-card',
        columnWidth: 320
    }).on('layoutComplete', function() {
        jQuery('main .shrink').removeClass('shrink')
        jQuery('main').css('background-image', 'url()')
    })
}

function FilterPosts(query, type) {
    // How do we want to grab the data?
    // Define your rules here
    if (type == 'meta_key') {
        var filter = "filter[meta_key]=post_count"
        var order = 'meta_value_num&filter[order]=DESC'
    } else {
        var filter = "filter[" + type + "]=" + query
        var order = 'date'
    }

    // Show the user a loading icon. It gives no real idea of how long it'll take to load but studies show people enjoy this twirly placebo.
    jQuery('main').css('background-image', 'url(https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif)')

    // Take every existing post on the page and hide it
    jQuery('main article').each(function() {
        jQuery(this).addClass('shrink')
    })

    // Do the magic to show the current nav item is...er...current
    ActiveNavItem(jQuery('[data-id="'+query+'"]').data('name'))

    // Go get yo data
    jQuery.ajax({
        type: "GET",
        url: url + filter + "&filter[orderby]=" + order + "&_embed&per_page=100",
        dataType: "JSON",
        success: function(data) {
            // log for debug
            console.log("endpoint:", url + filter + "&filter[orderby]=" + order + "&_embed&per_page=100");
            console.log('load posts', data)

            // Wipe the existing stuff
            jQuery('main').html('')

            // For each post returned...
            jQuery.each(data, function(i, obj) {
                // Whip up a tasty template
                PostTemplate(data[i])

                // When all of the tasty templates have been thoroughly whipped
                if (i == (data.length - 1)) {
                    // Shove them into your markup
                    NewPostsLayout()
                }

            })



            // end of success
        },
        complete: function() {

        }
    })
}
