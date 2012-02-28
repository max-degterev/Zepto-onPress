/* Author:
    Max Degterev @suprMax
    
    Zepto fast buttons without nasty ghostclicks.
    Supports delegation and handlers removal, though removal feels a bit hacky and needs to be tested.
    Highly inspired by http://code.google.com/mobile/articles/fast_buttons.html
    
    Usage
    
    bind:
    $('#someid').onpress(function(event){});
    $('#someid').offpress(function(event){});
    
    delegation:
    $('#someid').onpress('.childNode', function(event){});
    $('#someid').offpress('.childNode', function(event){});
    
*/

;(function($) {
    // Zepto touch device detection
    $.os.touch = !(typeof window.ontouchstart === 'undefined');
    
    var ghostsLifeTime = 1000;
    
    var normalizeArgs = function(args) {
        var callback,
            selector;
            
        if (typeof args[0] === 'function') {
            callback = args[0];
        }
        else {
            selector = args[0];
            callback = args[1];
        }
        return [selector, callback];
    };

    if ($.os.touch) {
        var ghosts = [];

        var touches = {},
            $doc = $(document),
            hasMoved = false,
            handlers = {};
            
        var handleTouchStart = function(e) {
            e.stopPropagation();

            touches.x = e.touches[0].pageX;
            touches.y = e.touches[0].pageY;
            hasMoved = false;
        };

        var handleMove = function(e) {
            if (Math.abs(e.touches[0].pageX - touches.x) > 10 || Math.abs(e.touches[0].pageX - touches.y) > 10) {
                hasMoved = true;
            }
        };

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
        $doc.on('touchmove', handleMove);

        $.fn.onpress = function() {
            var args = normalizeArgs(arguments);
            
            var handleTouchEnd = function(e) {
                e.stopPropagation();

                if (!hasMoved) {
                    args[1].call(this, e);
                    ghosts.push(touches.x, touches.y);
                    window.setTimeout(removeGhosts, ghostsLifeTime);
                }
            };
            
            handlers[args[1]] = handleTouchEnd;

            if (args[0]) {
                this.on('touchstart.onpress', args[0], handleTouchStart);
                this.on('touchend.onpress', args[0], handleTouchEnd);
                this.on('press', args[0], args[1]);
            }
            else {
                this.on('touchstart.onpress', handleTouchStart);
                this.on('touchend.onpress', handleTouchEnd);
                this.on('press', args[1]);
            }
        };
        
        $.fn.offpress = function() {
            var args = normalizeArgs(arguments);
            if (args[1]) {
                if (args[0]) {
                    this.off('.onpress', args[0], handlers[args[1]]);
                    this.off('press', args[0], args[1]);
                }
                else {
                    this.off('.onpress', handlers[args[1]]);
                    this.off('press', args[1]);
                }
                delete handlers[args[1]];
            }
            else {
                if (args[0]) {
                    this.off('.onpress', args[0]);
                    this.off('press', args[0]);
                }
                else {
                    this.off('.onpress');
                    this.off('press');
                }
            }
        };
    }
    else {
        $.fn.onpress = function() {
            var args = normalizeArgs(arguments);
            if (args[0]) {
                this.on('click.onpress', args[0], args[1]);
                this.on('press.onpress', args[0], args[1]);
            }
            else {
                this.on('click.onpress', args[1]);
                this.on('press.onpress', args[1]);
            }
            
        };
        $.fn.offpress = function() {
            var args = normalizeArgs(arguments);
            args[0] ? this.off('.onpress', args[0], args[1]) : this.off('.onpress', args[1]);
        };
    }
})(Zepto);
