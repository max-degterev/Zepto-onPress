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
        doc.on('touchstart', function(e) {
            touches.x = e.touches[0].pageX;
            touches.y = e.touches[0].pageY;
            hasMoved = false;
            target = e.target;
        });
        doc.on('touchmove', function(e) {
            if(Math.abs(e.touches[0].pageX - touches.x) > 10 || Math.abs(e.touches[0].pageY - touches.y) > 10) {
                hasMoved = true;
            }
        });
        doc.on('touchend', function(e) {
            ((target === e.target) && !hasMoved) && $(e.target).trigger('press', e);
        });
    }
    else {
        doc.on('click', function(e) {
            $(e.target).trigger('press', e);
        });
    }

    $.fn.onpress = function(callb) {
        this.on('press', callb);
    };
})(Zepto);
