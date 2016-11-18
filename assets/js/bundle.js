"use strict"

// declare variables
let browserWidth, browserHeight, screenWidth, screenHeight, distance, target, device_type, device_name

// What are the screen dimensions?
function screenSize() {
    screenWidth = screen.width
    screenHeight = screen.height
    // log for debug
    console.info(screenWidth, screenHeight)
}


// What are the browser dimensions?
function browserSize() {
    browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    // log for debug
    console.info(browserWidth, browserHeight)
}



// Is this device 'mobile' according to the list?
function isMobile() {
    /**
     * jQuery.browser.mobile (http://detectmobilebrowser.com/)
     *
     * jQuery.browser.mobile will be true if the browser is a mobile device
     *
     **/
    (function(a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (jQuery.browser.mobile) {
        return true
    } else {
        return false
    }
}

// Is this browser IE?
// detect IE
// returns version of IE or false, if browser is not Internet Explorer

function isIE() {
    var ua = window.navigator.userAgent

    // Test values; Uncomment to check result

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // real browser
    return false;


}

"use strict"
//console.log('functions loaded')
// Trigger resize on completion of event
function Debouncer(func, timeout) {
    if (timeout === "") {
        timeout = 200;
    }
    var timeoutID;
    return function() {
        var scope = this,
            args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    };
}

// Scroll to anchor
function ScrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({
        scrollTop: (aTag.offset().top - ((heightMasthead + heightSubnav) - 20))
    }, 900);
}

// Nudge
function Nudge(distance) {
    $("html body").animate({
        scrollTop: distance + "px"
    }, 800);
    return false;
}

// Make a button enabled
function enableButton(target) {
    jQuery(target).prop('disabled', false)
}

// Make a button disabled
function disableButton(target) {
    jQuery(target).prop('disabled', true)
}


// These are the functions that run when each page is loaded
function LoadFunc() {
    browserSize() // Work out browser width and browser height and store as global variables for use later
    screenSize() // Work out screen width and screen height and store as global variables for use later
    jQuery('html').toggleClass('not-jquery is-jquery') // Once jQuery has been detected, switch the flag
    if (isMobile()) {
        jQuery('html').toggleClass('not-mobile is-mobile')
    } // Once mobile status has been detected, switch the flag
    if (isIE()) {
        jQuery('html').toggleClass('not-ie is-ie')
    } // Once Internet Explorer has been detected, switch the flag

    // Using WURFL to detect devices
    var device_type = WURFL.form_factor.toLowerCase()
    var device_name = WURFL.complete_device_name.toLowerCase()
    var device_name = device_name.replace(/\ /g, "-")

    jQuery('html').addClass(" " + device_type)
    jQuery('html').addClass(" " + device_name)

    // @TODO: Remove the below line for production
    jQuery('#masthead h1').html(WURFL.complete_device_name)

    jQuery('#rest-container').masonry({
        // options
        itemSelector: '.post-card',
        columnWidth: 320
    })

}

function returnButtons() {
    jQuery('#load-prev').text('Previous')
    jQuery('#load-next').text('Next')
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

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
