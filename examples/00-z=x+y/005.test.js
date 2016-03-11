//@using situation1
var z = x + y;
//@testing proposition/proof1
var x = 1; var y = 2;       ;;   z == 3

//@using situation2
var z = y + x;
//@testing proposition/proof2
var x = 1; var y = 2;       ;;   z == 3

//@using situation3
var z = x + x;
//@testing proposition/proof3
var x = 1;                  ;;   z == 2

//@using situation4
var z = y + y;
//@testing proposition/proof4
var y = 2;                  ;;   z == 4
