//@using
var z = x + y;

//@testing
var x = 1; var y = 2;       ;;   z == 3     &&   Number.isInteger(z)      &&  !isNaN(z)
var x = 1; var y = 'A';     ;;   z == '1A'  &&   (typeof z ==  'string')  &&  isNaN(z)
