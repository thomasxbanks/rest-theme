;
(function($, window, document, undefined) {
    let pluginName = 'litebochs',
        defaults = {
            theme: 'dark',
            transition: 'bounce',
            transitionSpeed: '200',
            yourMum: 'epic'
        }

    function Plugin(element, options) {
        this.element = element

        this.options = $.extend({}, defaults, options)

        this._defaults = defaults
        this._name = pluginName

        this.init()
    }

    Plugin.prototype.init = function() {
        // Load the prescriptive styles. @TODO move this into the javscript to minimise the number of files to load.
        $('head').append("<link rel='stylesheet' href='litebochs/litebochs.css'>")
            // Load the FontAwesome CDN for the close icon.
            // @TODO Can this be switched for a standard tiny image or passed through as an option to match branding on individual sites.
        $('body').append("<script src='https://use.fontawesome.com/804ff9ee50.js'></script>")
            // Build the elements that make up the lightbox
        const litebochsControls = "<i aria-label='close lightbox' class='fa fa-fw fa-times'></i>"
        const litebochsContent = "<div data-element='litebochs-content'><div data-element='litebochs-content-inner'></div></div>"
        const litebochs = "<div data-element='litebochs' data-state='closed'>" + litebochsControls + litebochsContent + "</div>"
            // Append the built elements to the page body
        $('body').append(litebochs)
            // Apply the given theme
        $('[data-element="litebochs"]').attr('data-theme', this.options.theme)
                                        .attr('data-transition', this.options.transition)
                                        .attr('data-transition-speed', this.options.transitionSpeed)

        $(this.element).find('img').each(function() {

            $(this).on('click', function() {
                console.log($(this))
                $('[data-element="litebochs-content-inner"]').html('').html('<img src="' + this.currentSrc + '" alt="' + this.alt + '" />')
                openlitebochs()
            })

        })

        // Allow the lightbox to be closed on clicking the close icon
        $('body').on('click', "[aria-label='close lightbox']", function() {
                closelitebochs()
            })
            // Allow the lightbox to be closed on pressing the escape key
        $('body').on('keyup', function(e) {
            if (e.which == 27) {
                closelitebochs()
            }

        })
    }


    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options))
            }
        })
    }


}(jQuery, window, document))

// Function to open the lightbox
function openlitebochs() {
    $('[data-element="litebochs"]').attr('data-state', 'open')
}

// Function to close the lightbox
function closelitebochs() {
    $('[data-element="litebochs"]').attr('data-state', 'closed')
}
