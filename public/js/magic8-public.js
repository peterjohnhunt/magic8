/*░░░░░░░░░░░░░░░░░░░░░░░░

  STYLE DIRECTORY

	_Variable_Declarations

  ░░░░░░░░░░░░░░░░░░░░░░░░*/
(function($) {
	'use strict';

	var $allInputs 			= $('.magic8 input, input.magic8');

	$allInputs.each(function() {
		var $input     = $(this),
			$wrapper   = $input.parent(),
			$holder    = $wrapper.find('ul.magic8'),
			$options   = $holder.find('li'),
			$ancestors = $input.parents('.magic8'),
			name       = $ancestors.attr('id');

		$ancestors.removeClass('magic8');
		$wrapper.addClass('magic8');

		if( !$input.hasClass('magic8') ){
			$input.addClass('magic8');
		}

		$input.attr('autocomplete', 'off');

		$input.on('focus click', function(){
			$wrapper.addClass('open');
			if( !$holder[0] ){
				$wrapper.append('<ul class="magic8"></ul>');
				$holder = $wrapper.find('ul.magic8');
				$holder.append('<li class="show">Searching...</li>');
				$.ajax({
					url: magic8_ajax_vars.url,
					type: 'POST',
					dataType: 'json',
					data: {
						action: 'magic8',
						nonce: magic8_ajax_vars.nonce,
						name: name
					},
					beforeSend: function( xhr ) {
						$holder.append('<li class="Searching">Searching...</li>');
					},
					success: function( result ) {
						if (result.success) {
							$holder.empty();
							$holder.append(result.data.html);
						}
					},
					complete: function( xhr, status ) {
						$options = $wrapper.find('ul.magic8 li');
						$options.hover(function(){
							$options.removeClass('hovered');
							$(this).addClass('hovered');
						});
						$options.click('click', function(){
							$input.val($(this).text());
							$wrapper.removeClass('open');
							$options.removeClass('hovered');
							$input.trigger('change');
							validateOptions();
						});
						showOptions();
					}
				});
			} else {
				showOptions();
			}
		});

		$input.focusout(function(){
			if( $($options.selector + ':hover')[0] ){
				return;
			}
			$wrapper.removeClass('open');
			$options.removeClass('hovered');
		});

		$input.on('keyup paste',function(e){
			if (e.keyCode !== 13 && e.keyCode !== 27) {
				if( !$wrapper.hasClass('open') ){
					$wrapper.addClass('open');
				}
				showOptions();
				validateOptions();
			}
	    });

		$(document).keydown(function(e) {
			if( $wrapper.hasClass('open') ){
				if (e.keyCode === 13) {
					if ( $options.hasClass('hovered') ) {
						$input.val($options.filter('.hovered').text());
						validateOptions();
					}
					$wrapper.removeClass('open');
					$options.removeClass('hovered');
					$input.trigger('change');
					e.preventDefault();
				} else if (e.keyCode === 27) {
					$wrapper.removeClass('open');
					$options.removeClass('hovered');
					e.preventDefault();
				} else if (e.keyCode === 38) {
					if ( $options.hasClass('hovered') && $options.filter('.hovered').prev('.show')[0]) {
						$options.filter('.hovered').removeClass('hovered').prev('.show').addClass('hovered');
					} else {
						$options.filter('.hovered').removeClass('hovered');
						$options.filter('.show').last().addClass('hovered');
					}
					e.preventDefault();
				} else if (e.keyCode === 40) {
					if ( $options.hasClass('hovered') && $options.filter('.hovered').next('.show')[0]) {
						$options.filter('.hovered').removeClass('hovered').next('.show').addClass('hovered');
					} else {
						$options.filter('.hovered').removeClass('hovered');
						$options.filter('.show').first().addClass('hovered');
					}
					e.preventDefault();
				}
			}
		});

		function showOptions(){
			$options.each(function() {
				var optionText = $(this).text().toLowerCase(),
					inputText = $input.val().toLowerCase();
	            if ( optionText.indexOf(inputText) === 0 ){
	                $(this).addClass('show');
	            } else {
	                $(this).removeClass('show');
	            }
	        });
		}

		function validateOptions(){
			var matched = false;
			$options.each(function() {
				var optionText = $(this).text().toLowerCase(),
					inputText = $input.val().toLowerCase();

				if( optionText === inputText){
					matched = true;
				}
			});

			if( matched ){
				$input.trigger('magic8-match', [$input, $wrapper]);
			} else {
				$input.trigger('magic8-no-match', [$input, $wrapper]);
			}
		}
	});

})(jQuery);
