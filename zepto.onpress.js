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
        var handleGhostClick = function(e) {
            e.preventDefault();
            e.stopPropagation();
        };
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
            if ((target === e.target) && !hasMoved) {
                $(e.target).trigger('press', e);
                doc.one('click', handleGhostClick); // kills ghostclick on Opera somehow
            }
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