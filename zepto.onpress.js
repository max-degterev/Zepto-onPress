/* Author:
	Max Degterev @suprMax
*/

;(function($) {
	// Zepto touch device detection
	$.os.touch = !(typeof window.ontouchstart === 'undefined');
	
	var touches = {},
		doc = $(document),
		hasMoved = false;
		
	doc.on('touchstart', function(e) {
	    touches.startX = e.touches[0].clientX;
	    touches.startY = e.touches[0].clientY;
		hasMoved = false;
	});
	doc.on('touchmove', function(e) {
	    if(Math.abs(e.touches[0].clientX - touches.startX) > 10 || 
	       Math.abs(e.touches[0].clientY - touches.startY) > 10) {
	        hasMoved = true;
	    }
	});

	var handler = function(e) {
		$(e.target).trigger('press', e);
	};
		
	if ($.os.touch) {
		doc.on('touchend', function(e) { hasMoved || handler(e); });
	}
	else {
		doc.on('click', handler);
	}
	
	$.fn.onpress = function(callb) {
		this.on('press', callb);
	};
})(Zepto);
