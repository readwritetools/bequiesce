//=============================================================================
// File:         bequiesce/examples/01-hello-world/test/cases/hello-world.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
//=============================================================================

// @common
var Hello = require('../../../codebase/hello-world.class.js');

// @using simple setup
var hello = new Hello(iso639);
var isValid = hello.isValid();
var lang = hello.englishEquivalent;
var native = hello.native;

// @testing explicitly providing invalid iso639 code
var iso639 = "xx";				;; isValid == false	&& lang == "unknown" 			&& native == "unknown"
var iso639 = "";				;; isValid == false	&& lang == "unknown" 			&& native == "unknown"

// @testing explicitly providing invalid variable type
var iso639 = null;				;; isValid == false	&& lang == "unknown" 			&& native == "unknown"
var iso639 = undefined;			;; isValid == false	&& lang == "unknown" 			&& native == "unknown"
var iso639 = [];				;; isValid == false	&& lang == "unknown" 			&& native == "unknown"
var iso639 = {};				;; isValid == false	&& lang == "unknown" 			&& native == "unknown"

// @testing checking all known languages
var iso639 = "ab";				;; isValid == true	&& lang == "Abkhaz" 			&& native == "бызшәа"
var iso639 = "aa";				;; isValid == true	&& lang == "Afar" 				&& native == "Afaraf"
var iso639 = "af";				;; isValid == true	&& lang == "Afrikaans" 			&& native == "Afrikaans"
var iso639 = "ak";				;; isValid == true	&& lang == "Akan" 				&& native == "Akan"
var iso639 = "sq";				;; isValid == true	&& lang == "Albanian" 			&& native == "Shqip"
var iso639 = "am";				;; isValid == true	&& lang == "Amharic" 			&& native == "አማርኛ"
var iso639 = "ar";				;; isValid == true	&& lang == "Arabic" 			&& native == "العربية"
var iso639 = "an";				;; isValid == true	&& lang == "Aragonese" 			&& native == "aragonés"
var iso639 = "hy";				;; isValid == true	&& lang == "Armenian" 			&& native == "Հայերեն"
var iso639 = "as";				;; isValid == true	&& lang == "Assamese" 			&& native == "অসমীয়া"
var iso639 = "ac";				;; isValid == true	&& lang == "Australian" 		&& native == "Ástralic"
var iso639 = "av";				;; isValid == true	&& lang == "Avaric" 			&& native == "авар мацӀ"
var iso639 = "ae";				;; isValid == true	&& lang == "Avestan" 			&& native == "avesta"
var iso639 = "ay";				;; isValid == true	&& lang == "Aymara" 			&& native == "aymar aru"
var iso639 = "az";				;; isValid == true	&& lang == "Azerbaijani" 		&& native == "azərbaycan dili"
var iso639 = "bm";				;; isValid == true	&& lang == "Bambara" 			&& native == "bamanankan"
var iso639 = "ba";				;; isValid == true	&& lang == "Bashkir" 			&& native == "башҡорт теле"
var iso639 = "eu";				;; isValid == true	&& lang == "Basque" 			&& native == "euskara"
var iso639 = "be";				;; isValid == true	&& lang == "Belarusian" 		&& native == "беларуская мова"
var iso639 = "bn";				;; isValid == true	&& lang == "Bengali" 			&& native == "বাংলা"
var iso639 = "bh";				;; isValid == true	&& lang == "Bihari" 			&& native == "भोजपुरी"
var iso639 = "bi";				;; isValid == true	&& lang == "Bislama" 			&& native == "Bislama"
var iso639 = "bs";				;; isValid == true	&& lang == "Bosnian" 			&& native == "bosanski jezik"
var iso639 = "br";				;; isValid == true	&& lang == "Breton" 			&& native == "brezhoneg"
var iso639 = "bg";				;; isValid == true	&& lang == "Bulgarian" 			&& native == "български език"
var iso639 = "my";				;; isValid == true	&& lang == "Burmese" 			&& native == "ဗမာစာ"
var iso639 = "ca";				;; isValid == true	&& lang == "Catalan" 			&& native == "català"
var iso639 = "ch";				;; isValid == true	&& lang == "Chamorro" 			&& native == "Chamoru"
var iso639 = "ce";				;; isValid == true	&& lang == "Chechen" 			&& native == "нохчийн мотт"
var iso639 = "ny";				;; isValid == true	&& lang == "Nyanja" 			&& native == "chiCheŵa"
var iso639 = "zh";				;; isValid == true	&& lang == "Chinese" 			&& native == "中文"
var iso639 = "cv";				;; isValid == true	&& lang == "Chuvash" 			&& native == "чӑваш чӗлхи"
var iso639 = "kw";				;; isValid == true	&& lang == "Cornish" 			&& native == "Kernewek"
var iso639 = "co";				;; isValid == true	&& lang == "Corsican" 			&& native == "corsu"
var iso639 = "cr";				;; isValid == true	&& lang == "Cree" 				&& native == "ᓀᐦᐃᔭᐍᐏᐣ"
var iso639 = "hr";				;; isValid == true	&& lang == "Croatian" 			&& native == "hrvatski jezik"
var iso639 = "cs";				;; isValid == true	&& lang == "Czech" 				&& native == "čeština"
var iso639 = "da";				;; isValid == true	&& lang == "Danish" 			&& native == "dansk"
var iso639 = "nl";				;; isValid == true	&& lang == "Dutch" 				&& native == "Nederlands"
var iso639 = "dz";				;; isValid == true	&& lang == "Dzongkha" 			&& native == "རྫོང་ཁ"
var iso639 = "en";				;; isValid == true	&& lang == "English" 			&& native == "English"
var iso639 = "eo";				;; isValid == true	&& lang == "Esperanto" 			&& native == "Esperanto"
var iso639 = "et";				;; isValid == true	&& lang == "Estonian" 			&& native == "eesti keel"
var iso639 = "ee";				;; isValid == true	&& lang == "Ewe" 				&& native == "Eʋegbe"
var iso639 = "fo";				;; isValid == true	&& lang == "Faroese" 			&& native == "føroyskt"
var iso639 = "fj";				;; isValid == true	&& lang == "Fijian" 			&& native == "vosa Vakaviti"
var iso639 = "fi";				;; isValid == true	&& lang == "Finnish" 			&& native == "suomen kieli"
var iso639 = "fr";				;; isValid == true	&& lang == "French" 			&& native == "français"
var iso639 = "ff";				;; isValid == true	&& lang == "Fula" 				&& native == "Fulfulde"
var iso639 = "gl";				;; isValid == true	&& lang == "Galician" 			&& native == "galego"
var iso639 = "ka";				;; isValid == true	&& lang == "Georgian" 			&& native == "ქართული"
var iso639 = "de";				;; isValid == true	&& lang == "German" 			&& native == "Deutsch"
var iso639 = "el";				;; isValid == true	&& lang == "Greek" 				&& native == "ελληνικά"
var iso639 = "gn";				;; isValid == true	&& lang == "Guaraní" 			&& native == "Avañe'ẽ"
var iso639 = "gu";				;; isValid == true	&& lang == "Gujarati" 			&& native == "ગુજરાતી"
var iso639 = "ht";				;; isValid == true	&& lang == "Haitian Creole" 	&& native == "Kreyòl ayisyen"
var iso639 = "hau";				;; isValid == true	&& lang == "Hausa" 				&& native == "هَوُسَ"
var iso639 = "heb";				;; isValid == true	&& lang == "Hebrew" 			&& native == "עברית"
var iso639 = "hz";				;; isValid == true	&& lang == "Herero" 			&& native == "Otjiherero"
var iso639 = "hi";				;; isValid == true	&& lang == "Hindi" 				&& native == "हिन्दी"
var iso639 = "ho";				;; isValid == true	&& lang == "Hiri Motu" 			&& native == "Hiri Motu"
var iso639 = "hu";				;; isValid == true	&& lang == "Hungarian" 			&& native == "magyar"
var iso639 = "ia";				;; isValid == true	&& lang == "Interlingua" 		&& native == "Interlingua"
var iso639 = "id";				;; isValid == true	&& lang == "Indonesian" 		&& native == "Bahasa Indonesia"
var iso639 = "ie";				;; isValid == true	&& lang == "Interlingue" 		&& native == "Interlingue"
var iso639 = "ga";				;; isValid == true	&& lang == "Irish" 				&& native == "Gaeilge"
var iso639 = "ig";				;; isValid == true	&& lang == "Igbo" 				&& native == "Asụsụ Igbo"
var iso639 = "ik";				;; isValid == true	&& lang == "Inupiaq" 			&& native == "Iñupiaq"
var iso639 = "io";				;; isValid == true	&& lang == "Ido" 				&& native == "Ido"
var iso639 = "is";				;; isValid == true	&& lang == "Icelandic" 			&& native == "Íslenska"
var iso639 = "it";				;; isValid == true	&& lang == "Italian" 			&& native == "italiano"
var iso639 = "iu";				;; isValid == true	&& lang == "Inuktitut" 			&& native == "ᐃᓄᒃᑎᑐᑦ"
var iso639 = "ja";				;; isValid == true	&& lang == "Japanese" 			&& native == "日本語"
var iso639 = "jv";				;; isValid == true	&& lang == "Javanese" 			&& native == "basa Jawa"
var iso639 = "kl";				;; isValid == true	&& lang == "Greenlandic" 		&& native == "kalaallit oqaasii"
var iso639 = "kn";				;; isValid == true	&& lang == "Kannada" 			&& native == "ಕನ್ನಡ"
var iso639 = "kr";				;; isValid == true	&& lang == "Kanuri" 			&& native == "Kanuri"
var iso639 = "ks";				;; isValid == true	&& lang == "Kashmiri" 			&& native == "कश्मीरी"
var iso639 = "kk";				;; isValid == true	&& lang == "Kazakh" 			&& native == "қазақ тілі"
var iso639 = "km";				;; isValid == true	&& lang == "Khmer" 				&& native == "ខ្មែរ"
var iso639 = "ki";				;; isValid == true	&& lang == "Kikuyu" 			&& native == "Gĩkũyũ"
var iso639 = "rw";				;; isValid == true	&& lang == "Kinyarwanda" 		&& native == "Ikinyarwanda"
var iso639 = "ky";				;; isValid == true	&& lang == "Kyrgyz" 			&& native == "Кыргыз тили"
var iso639 = "kv";				;; isValid == true	&& lang == "Komi" 				&& native == "коми кыв"
var iso639 = "kg";				;; isValid == true	&& lang == "Kongo" 				&& native == "Kikongo"
var iso639 = "ko";				;; isValid == true	&& lang == "Korean" 			&& native == "한국어"
var iso639 = "ku";				;; isValid == true	&& lang == "Kurdish" 			&& native == "كوردی‎"
var iso639 = "kj";				;; isValid == true	&& lang == "Kwanyama" 			&& native == "Kuanyama"
var iso639 = "la";				;; isValid == true	&& lang == "Latin" 				&& native == "lingua latina"
var iso639 = "lb";				;; isValid == true	&& lang == "Letzeburgesch" 		&& native == "Lëtzebuergesch"
var iso639 = "lg";				;; isValid == true	&& lang == "Ganda" 				&& native == "Luganda"
var iso639 = "li";				;; isValid == true	&& lang == "Limburgan" 			&& native == "Limburgs"
var iso639 = "ln";				;; isValid == true	&& lang == "Lingala" 			&& native == "Lingála"
var iso639 = "lo";				;; isValid == true	&& lang == "Lao" 				&& native == "ພາສາລາວ"
var iso639 = "lt";				;; isValid == true	&& lang == "Lithuanian" 		&& native == "lietuvių kalba"
var iso639 = "lu";				;; isValid == true	&& lang == "Luba-Katanga" 		&& native == "Tshiluba"
var iso639 = "lv";				;; isValid == true	&& lang == "Latvian" 			&& native == "latviešu valoda"
var iso639 = "gv";				;; isValid == true	&& lang == "Manx" 				&& native == "Gaelg"
var iso639 = "mk";				;; isValid == true	&& lang == "Macedonian" 		&& native == "македонски јазик"
var iso639 = "mg";				;; isValid == true	&& lang == "Malagasy" 			&& native == "fiteny malagasy"
var iso639 = "ms";				;; isValid == true	&& lang == "Malay" 				&& native == "بهاس ملايو‎"
var iso639 = "ml";				;; isValid == true	&& lang == "Malayalam" 			&& native == "മലയാളം"
var iso639 = "mt";				;; isValid == true	&& lang == "Maltese" 			&& native == "Malti"
var iso639 = "mi";				;; isValid == true	&& lang == "Māori" 				&& native == "te reo Māori"
var iso639 = "mr";				;; isValid == true	&& lang == "Marathi" 			&& native == "मराठी"
var iso639 = "mh";				;; isValid == true	&& lang == "Marshallese" 		&& native == "Kajin M̧ajeļ"
var iso639 = "mn";				;; isValid == true	&& lang == "Mongolian" 			&& native == "Монгол хэл"
var iso639 = "na";				;; isValid == true	&& lang == "Nauru" 				&& native == "Ekakairũ Naoero"
var iso639 = "nv";				;; isValid == true	&& lang == "Navajo" 			&& native == "Diné bizaad"
var iso639 = "nd";				;; isValid == true	&& lang == "Northern Ndebele" 	&& native == "isiNdebele"
var iso639 = "ne";				;; isValid == true	&& lang == "Nepali" 			&& native == "नेपाली"
var iso639 = "ng";				;; isValid == true	&& lang == "Ndonga" 			&& native == "Owambo"
var iso639 = "nb";				;; isValid == true	&& lang == "Norwegian Bokmål" 	&& native == "Norsk bokmål"
var iso639 = "nn";				;; isValid == true	&& lang == "Norwegian Nynorsk" 	&& native == "Norsk nynorsk"
var iso639 = "no";				;; isValid == true	&& lang == "Norwegian" 			&& native == "Norsk"
var iso639 = "ii";				;; isValid == true	&& lang == "Nuosu" 				&& native == "ꆈꌠ꒿ Nuosuhxop"
var iso639 = "nr";				;; isValid == true	&& lang == "Southern Ndebele" 	&& native == "isiNdebele"
var iso639 = "oc";				;; isValid == true	&& lang == "Occitan" 			&& native == "lenga d'òc"
var iso639 = "oj";				;; isValid == true	&& lang == "Ojibwe" 			&& native == "ᐊᓂᔑᓈᐯᒧᐎᓐ"
var iso639 = "cu";				;; isValid == true	&& lang == "Old Church Slavonic" 	&& native == "ѩзыкъ словѣньскъ"
var iso639 = "om";				;; isValid == true	&& lang == "Oromo" 				&& native == "Afaan Oromoo"
var iso639 = "or";				;; isValid == true	&& lang == "Oriya" 				&& native == "ଓଡ଼ିଆ"
var iso639 = "os";				;; isValid == true	&& lang == "Ossetian" 			&& native == "ирон æвзаг"
var iso639 = "pa";				;; isValid == true	&& lang == "Punjabi" 			&& native ==  "ਪੰਜਾਬੀ"
var iso639 = "pi";				;; isValid == true	&& lang == "Pāli" 				&& native == "पाऴि"
var iso639 = "fas";				;; isValid == true	&& lang == "Farsi" 				&& native == "فارسی"
var iso639 = "pl";				;; isValid == true	&& lang == "Polish" 			&& native == "język polski"
var iso639 = "pus";				;; isValid == true	&& lang == "Pashto" 			&& native == "پښتو"
var iso639 = "pt";				;; isValid == true	&& lang == "Portuguese" 		&& native == "português"
var iso639 = "qu";				;; isValid == true	&& lang == "Quechua" 			&& native == "Kichwa"
var iso639 = "rm";				;; isValid == true	&& lang == "Romansh" 			&& native == "rumantsch grischun"
var iso639 = "rn";				;; isValid == true	&& lang == "Kirundi" 			&& native == "Ikirundi"
var iso639 = "ro";				;; isValid == true	&& lang == "Romanian" 			&& native == "limba română"
var iso639 = "ru";				;; isValid == true	&& lang == "Russian" 			&& native == "Русский"
var iso639 = "sa";				;; isValid == true	&& lang == "Sanskrit" 			&& native == "संस्कृतम्"
var iso639 = "sc";				;; isValid == true	&& lang == "Sardinian" 			&& native == "sardu"
var iso639 = "sd";				;; isValid == true	&& lang == "Sindhi" 			&& native == "सिन्धी"
var iso639 = "se";				;; isValid == true	&& lang == "Northern Sami" 		&& native == "Davvisámegiella"
var iso639 = "sm";				;; isValid == true	&& lang == "Samoan" 			&& native == "gagana fa'a Samoa"
var iso639 = "sg";				;; isValid == true	&& lang == "Sango" 				&& native == "yângâ tî sängö"
var iso639 = "sr";				;; isValid == true	&& lang == "Serbian" 			&& native == "српски језик"
var iso639 = "gd";				;; isValid == true	&& lang == "Gaelic" 			&& native == "Gàidhlig"
var iso639 = "sn";				;; isValid == true	&& lang == "Shona" 				&& native == "chiShona"
var iso639 = "si";				;; isValid == true	&& lang == "Sinhalese" 			&& native == "සිංහල"
var iso639 = "sk";				;; isValid == true	&& lang == "Slovak" 			&& native == "slovenčina"
var iso639 = "sl";				;; isValid == true	&& lang == "Slovene" 			&& native == "slovenščina"
var iso639 = "so";				;; isValid == true	&& lang == "Somali" 			&& native == "af Soomaali"
var iso639 = "st";				;; isValid == true	&& lang == "Southern Sotho" 	&& native == "Sesotho"
var iso639 = "es";				;; isValid == true	&& lang == "Spanish" 			&& native == "español"
var iso639 = "su";				;; isValid == true	&& lang == "Sundanese" 			&& native == "Basa Sunda"
var iso639 = "sw";				;; isValid == true	&& lang == "Swahili" 			&& native == "Kiswahili"
var iso639 = "ss";				;; isValid == true	&& lang == "Swati" 				&& native == "SiSwati"
var iso639 = "sv";				;; isValid == true	&& lang == "Swedish" 			&& native == "svenska"
var iso639 = "ta";				;; isValid == true	&& lang == "Tamil" 				&& native == "தமிழ்"
var iso639 = "te";				;; isValid == true	&& lang == "Telugu" 			&& native == "తెలుగు"
var iso639 = "tg";				;; isValid == true	&& lang == "Tajik" 				&& native == "тоҷикӣ"
var iso639 = "th";				;; isValid == true	&& lang == "Thai" 				&& native == "ไทย"
var iso639 = "ti";				;; isValid == true	&& lang == "Tigrinya" 			&& native == "ትግርኛ"
var iso639 = "bo";				;; isValid == true	&& lang == "Tibetan" 			&& native == "བོད་ཡིག"
var iso639 = "tk";				;; isValid == true	&& lang == "Turkmen" 			&& native == "Түркмен"
var iso639 = "tl";				;; isValid == true	&& lang == "Tagalog" 			&& native == "Wikang Tagalog"
var iso639 = "tn";				;; isValid == true	&& lang == "Tswana" 			&& native == "Setswana"
var iso639 = "to";				;; isValid == true	&& lang == "Tonga" 				&& native == "faka Tonga"
var iso639 = "tr";				;; isValid == true	&& lang == "Turkish" 			&& native == "Türkçe"
var iso639 = "ts";				;; isValid == true	&& lang == "Tsonga" 			&& native == "Xitsonga"
var iso639 = "tt";				;; isValid == true	&& lang == "Tatar" 				&& native == "татар теле"
var iso639 = "tw";				;; isValid == true	&& lang == "Twi" 				&& native == "Twi"
var iso639 = "ty";				;; isValid == true	&& lang == "Tahitian" 			&& native == "Reo Tahiti"
var iso639 = "ug";				;; isValid == true	&& lang == "Uyghur" 			&& native == "ئۇيغۇرچە‎"
var iso639 = "uk";				;; isValid == true	&& lang == "Ukrainian" 			&& native == "українська мова"
var iso639 = "urd";				;; isValid == true	&& lang == "Urdu" 				&& native == "اردو"
var iso639 = "uz";				;; isValid == true	&& lang == "Uzbek" 				&& native == "Ўзбек‎"
var iso639 = "ve";				;; isValid == true	&& lang == "Venda" 				&& native == "Tshivenḓa"
var iso639 = "vi";				;; isValid == true	&& lang == "Vietnamese" 		&& native == "Việt Nam"
var iso639 = "vo";				;; isValid == true	&& lang == "Volapük" 			&& native == "Volapük"
var iso639 = "wa";				;; isValid == true	&& lang == "Walloon" 			&& native == "walon"
var iso639 = "cy";				;; isValid == true	&& lang == "Welsh" 				&& native == "Cymraeg"
var iso639 = "wo";				;; isValid == true	&& lang == "Wolof" 				&& native == "Wollof"
var iso639 = "fy";				;; isValid == true	&& lang == "Western Frisian" 	&& native == "Frysk"
var iso639 = "xh";				;; isValid == true	&& lang == "Xhosa" 				&& native == "isiXhosa"
var iso639 = "yid";				;; isValid == true	&& lang == "Yiddish" 			&& native == "ייִדיש"
var iso639 = "yo";				;; isValid == true	&& lang == "Yoruba" 			&& native == "Yorùbá"
var iso639 = "za";				;; isValid == true	&& lang == "Zhuang" 			&& native == "Saɯ cueŋƅ"
var iso639 = "zu";				;; isValid == true	&& lang == "Zulu" 				&& native == "isiZulu"
