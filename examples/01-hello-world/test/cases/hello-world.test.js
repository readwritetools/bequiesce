// @common
import Hello from '../../codebase/hello-world.class';

//@using
var hello = new Hello(iso639);
var isValid = hello.isValid();
var lang = hello.englishEquivalent;
var isLatin = hello.isLatin();
var isNordic = hello.isNordic();
var isCyrillic = hello.isCyrillic();
var isArabic = hello.isArabic();
var isSouthAsian = hello.isSouthAsian();
var isEastAsian = hello.isEastAsian();
var isRTL = hello.isRTL();


// @testing
var iso639 = "en";				;; isValid == true	&& lang == "English" 		&& isLatin == true			&& isNordic == false	&& isCyrillic == false		&& isArabic == false	&& isSouthAsian == false	&& isEastAsian == false	&& isRTL == false
var iso639 = "yo";				;; isValid == true	&& lang == "Yoruba" 		&& isLatin == true			&& isNordic == false	&& isCyrillic == false		&& isArabic == false	&& isSouthAsian == false	&& isEastAsian == false	&& isRTL == false
var iso639 = "mr";				;; isValid == true