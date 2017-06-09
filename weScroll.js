/*!
		 * jQuery extend-based plugin for from validations
		 * Author: @weConnectMx
		 * Licensed under the MIT license
		 */

		;(function($){
		    $.fn.extend({
		        weValidate: function( options ) {

		            this.defaultOptions = {};

		            var settings = $.extend({}, this.defaultOptions, options);
		            var errors = true;

		            return this.each(function() {

		                var $this = $(this);
		                jQuery('body').append('<div class="validate"></div>');
		                jQuery.each(options.validate, function(name, value){
		                	$('['+ name +']').append('<div data-name="'+name+'"></div>')
		                });
		            	$this.on('submit', function(){
		                    if(errors == true)
		                    {
		                        setOptions();
		                    }
		                    else
		                    {
		                        MakeSubmit(jQuery(this));
		                    }
		                    return false;
		                });
		            });

		            function setOptions () {
		            	jQuery.each(options.validate, function(name,value){
		            		var as = value.as;
		            		var rules = value.rules.split('|');
		                    jQuery.each(rules, function(ruleName, rule ){
		                        if(jQuery('input[name=' + name +']').val() == '')
		                            require(rule, name, as);
		                        else
		                            error(rule, name, as);

		                    });
		            	});
		            }

		            function isValidEmailAddress(emailAddress) {
		                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		                return pattern.test(emailAddress);
		            }


		            function messages (name, as, other) {
		                if(other == null)
		                {
		                    var message = options.messages[name].replace(':name', as);

		                    //console.log(jQuery('.validate[data-form=' + name + ']'));
		                    return message;
		                    
		                }
		                else
		                {
		                    var message = options.messages[name].replace(':name', as);
		                    var messageother = message.replace(other.name, other.value);

		                    //console.log(jQuery('.validate[data-form=' + name + ']'));
		                    return messageother;
		                }
		            }

		            function show (name,message) {
		                jQuery('div[data-name=' + name + ']').append('<div class="alert alert-danger '+message.class+'">'+message.content+'</div>');
		                jQuery('.' + message.class).fadeIn();

		                setTimeout(function(){
		                    jQuery('.' + message.class).fadeOut();
		                    setTimeout(function(){
		                        jQuery('.' + message.class).remove();
		                    },500);
		                },3000);

		                errors = true;
		            }


		            function create (name) {
		                jQuery('.validate').append('<div data-name="'+name+'"></div>');
		            }

		            function require (rule, name, as) {
		                if(rule == 'required')
		                {
		                    show(name, {class: 'required', content: messages('required', as)});
		                    errors = true;
		                }
		            }

		            function error (rule, name, as) {

		                if(rule.indexOf('min') > -1 )
		                {
		                    var ruleMin = rule.split(':');
		                    var min = ruleMin[1];
		                    if(jQuery('input[name=' + name +']').val().length < min)
		                        show(name, {class: 'min', content:  messages('min', as, {name: ':min', value: min})});
		                    else 
		                        errors = false;

		                }
		                if(rule.indexOf('max') > -1)
		                {
		                    var ruleMin = rule.split(':');
		                    var max = ruleMin[1];
		                    if(jQuery('input[name=' + name +']').val().length > max)
		                        show(name, {class: 'max', content: messages('max', as, {name: ':max', value: max})});
		                    else
		                        errors = false;
		                }
		                if(rule == 'email')
		                {
		                    if(!isValidEmailAddress(jQuery('input[name=' + name +']').val()))
		                        show(name, {class: 'email', content: messages('email', as)});  
		                    else
		                        errors = false;                 
		                }
		                if(rule.indexOf('same') > -1)
		                {
		                    var ruleSame = rule.split(':');
		                    var same = ruleSame[1];
		                    if(options.validate[max] !== null)
		                    {
		                        if(jQuery('input[name=' + name +']').val() !== jQuery('input[name=' + same +']').val())
		                            show(name, {class: 'same', content: messages('same', as, {name: ':same', value: options.validate[same].as})});
		                        else
		                            errors = false;

		                    }
		                    else
		                    {
		                        console.log('Input ' + same + ' invalid');
		                    }
		                }
		            }

		            function MakeSubmit (form) {
		                form.submit();
		            }
		        }

		    });

		})(jQuery);
