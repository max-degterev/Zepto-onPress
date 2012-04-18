var handler = function(e) {
    e.preventDefault();
    alert('handler');
};
var differentHandler = function(e) {
    e.preventDefault();
    alert('different handler');
};

var altHandler = function(e) {
    e.preventDefault();
    alert('alt handler');
};

$('#bind .fake').onpress(handler);

$('#delegate').onpress('.fake', handler);
$('#delegate').onpress('.fake', altHandler);
$('#delegate').onpress('.fake', differentHandler);
//$('#delegate').offpress('.fake', handler);
//$('#delegate').offpress('.fake', differentHandler);

