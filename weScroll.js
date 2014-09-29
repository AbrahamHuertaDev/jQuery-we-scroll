/*!
 * jQuery extend-based plugin from from validations
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
                var target = $this.attr('we-maker');
                //when click scroll to target
                $this.on('click', function(){
                    jQuery("html, body").animate({ 
                        scrollTop: jQuery('[we-target=' + target + ']').offset().top 
                    }, {
                        duration: options.speed,
                        easing: options.effect
                    });
                });

            });
        }

    });

})(jQuery);
