/*!
 * jQuery extend-based plugin for animate scroll
 * Author: @weConnectMx
 * Licensed under the MIT license
 */
;(function($){
    $.fn.extend({
        weScroll: function( options ) {

            this.defaultOptions = {};

            var settings = $.extend({}, this.defaultOptions, options);

            return this.each(function() {

                var $this = $(this);
                //set the target
                var maker = $this.attr('we-maker');
                var target = '[we-target=' + maker + ']';
                //when click scroll to target
                $this.on('click', function(){
                    jQuery("html, body").animate({ 
                        scrollTop: jQuery(target).offset().top 
                    }, {
                        duration: options.speed,
                        easing: options.effect
                    });
                });

            });
        }

    });

})(jQuery);
