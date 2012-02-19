/* Author:
    Max Degterev @suprMax
	
	$el.onpress - handles ghostclicks, not unsubscribable. Doesn't support delegation.
	$el.on('press') - doesn't handle ghostclicks, unsubscribable. Supports delegation.
	
	Based on http://code.google.com/mobile/articles/fast_buttons.html
*/

;(function($) {
    // Zepto touch device detection
    $.os.touch = !(typeof window.ontouchstart === 'undefined');
    
    var touches = {},
        $doc = $(document),
        hasMoved = false,
        target;
    
    if ($.os.touch) {
		var handleMove = function(e) {
			if (Math.abs(e.touches[0].pageX - touches.x) > 10 || Math.abs(e.touches[0].pageX - touches.y) > 10) {
				hasMoved = true;
			}
		};
		
        $doc.on('touchstart', function(e) {
            touches.x = e.touches[0].pageX;
            touches.y = e.touches[0].pageY;
            hasMoved = false;
            target = e.target;
        });

        $doc.on('touchmove', handleMove);

        $doc.on('touchend', function(e) {
            ((target === e.target) && !hasMoved) && $(e.target).trigger('press', e);
        });
    }
    else {
        $doc.on('click', function(e) {
            $(e.target).trigger('press', e);
        });
    }
	
	if ($.os.touch) {
		var ghosts = [];
    
		var removeGhosts = function() {
			ghosts.splice(0, 2);
		};

		var handleGhosts = function(e) {
			var i, l;
			for (i = 0, l = ghosts.length; i < l; i += 2) {
				if (Math.abs(e.pageX - ghosts[i]) < 25 && Math.abs(e.pageY - ghosts[i + 1]) < 25) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
		};

		$doc.on('click', handleGhosts);

	    $.fn.onpress = function(callback) {
			var touches = {},
				hasMoved = false;
		
			var handleTouchStart = function(e) {
				e.stopPropagation();

				touches.x = e.touches[0].pageX;
				touches.y = e.touches[0].pageY;
				hasMoved = false;
			};
			
			var handleTouchEnd = function(e) {
				e.stopPropagation();

				if (!hasMoved) {
					callback.call(this, e);
					ghosts.push(touches.x, touches.y);
					window.setTimeout(removeGhosts, 2500);
				}
			};

			this.on('touchstart', handleTouchStart);
			$doc.on('touchmove', handleMove);
			this.on('touchend', handleTouchEnd);
	    };
	}
	else {
		$.fn.onpress = function(callback) {
			this.on('click', callback);
		};
	}
})(Zepto);