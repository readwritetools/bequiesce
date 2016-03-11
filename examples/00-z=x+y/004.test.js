//@using sum of two values
var z = x + y;

//@testing invalid inputs
var x = 1;   var y = NaN;     ;;   isNaN(z)
var x = NaN; var y;           ;;   isNaN(z)
var x = 1;   var y;           ;;   isNaN(z)
var x;       var y = 1;       ;;   isNaN(z)
var x = 1;   var y = [];      ;;   isNaN(z)
var x = 1;   var y = {};      ;;   isNaN(z)

//@testing integers
var x = 1;  var y = 2;        ;;   z == 3
var x = -1; var y = -2;       ;;   z == -3
var x = 1; var y = -2;        ;;   z == -1
var x = -1; var y = 2;        ;;   z == 1

//@testing floats
var x = 1.5;  var y = 2;      ;;   z == 3.5
var x = 1; var y = 2.5;       ;;   z == 3.5
