/* Author:
    Max Degterev @suprMax
*/

;(function($) {
    // Zepto touch device detection
    $.os.touch = !(typeof window.ontouchstart === 'undefined');
    
    var touches = {},
        doc = $(document),
        hasMoved = false,
        target;
    
    if ($.os.touch) {
		var handleTouchStart = function(e) {
            touches.x = e.touches[0].pageX;
            touches.y = e.touches[0].pageY;
            hasMoved = false;
            target = e.target;
			
		};
		var handleTouchMove = function(e) {
            if(Math.abs(e.touches[0].pageX - touches.x) > 10 || Math.abs(e.touches[0].pageY - touches.y) > 10) {
                hasMoved = true;
            }
			
		};
		var handleTouchEnd = function(e) {
            if ((target === e.target) && !hasMoved) {
            	$(e.target).trigger('press', e);
				doc.one('click', handleGhostClick); // kills ghostclick on Opera somehow
            }
		};
		var handleGhostClick = function(e) {
			e.preventDefault();
			e.stopPropagation();
		};

        doc.on('touchstart', handleTouchStart);
        doc.on('touchmove', handleTouchMove);
        doc.on('touchend', handleTouchEnd);
    }
    else {
		var handleClick = function(e) {
			$(e.target).trigger('press', e);
		};
        doc.on('click', handleClick);
    }

    $.fn.onpress = function(callb) {
        this.on('press', callb);
    };
})(Zepto);
