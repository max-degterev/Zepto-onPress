var handler = function(e) {
    e.preventDefault();
    this.parentNode.removeChild(this);
};
var differentHandler = function(e) {
    e.preventDefault();
    alert('sup?');
};

var altHandler = function(e) {
    e.preventDefault();
    alert('sup?');
};

$('#bind .fake').onpress(handler);

$('#delegate').onpress('.fake', handler);
$('#delegate').onpress('.fake', altHandler);
$('#delegate').onpress('.fake', differentHandler);
$('#delegate').offpress('.fake', handler);
$('#delegate').offpress('.fake', differentHandler);


$('#delegate .fake').trigger('press');
