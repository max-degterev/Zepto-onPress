var handler = function(e) {
    e.preventDefault();
    this.parentNode.removeChild(this);
};

var altHandler = function(e) {
    e.preventDefault();
    alert('sup?');
};

$('#bind .fake').onpress(handler);

$('#delegate').onpress('.fake', handler);
$('#delegate').onpress('.fake', altHandler);
$('#delegate').offpress('.fake', handler);


$('#delegate .fake').trigger('press');
