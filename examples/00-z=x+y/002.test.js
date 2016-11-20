//@using
var z = x + y;

//@testing
var x = 1; var y = 2;       ;;   z == 3
var x = 1; var y = 'A';     ;;   z == '1A'
var x = 1; var y = NaN;     ;;   isNaN(z)
var x = 1; var y;           ;;   isNaN(z)
