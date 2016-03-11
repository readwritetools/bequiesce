//=============================================================================
//
// File:         bequiesce/examples/01-hello-world/codebase/hello-world.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 23, 2015
// Contents:     Bequiesece Hello World codebase
//
//=============================================================================

export default class Hello {
	
    constructor(iso639) {
    	this.table = [
			["ab","Abkhaz","бызшәа"],
			["aa","Afar","Afaraf"],
			["af","Afrikaans","Afrikaans"],
			["ak","Akan","Akan"],
			["sq","Albanian","Shqip"],
			["am","Amharic","አማርኛ"],
			["ar","Arabic","العربية"],
			["an","Aragonese","aragonés"],
			["hy","Armenian","Հայերեն"],
			["as","Assamese","অসমীয়া"],
			["ac","Australian","Ástralic"],
			["av","Avaric","авар мацӀ"],
			["ae","Avestan","avesta"],
			["ay","Aymara","aymar aru"],
			["az","Azerbaijani","azərbaycan dili"],
			["bm","Bambara","bamanankan"],
			["ba","Bashkir","башҡорт теле"],
			["eu","Basque","euskara"],
			["be","Belarusian","беларуская мова"],
			["bn","Bengali","বাংলা"],
			["bh","Bihari","भोजपुरी"],
			["bi","Bislama","Bislama"],
			["bs","Bosnian","bosanski jezik"],
			["br","Breton","brezhoneg"],
			["bg","Bulgarian","български език"],
			["my","Burmese","ဗမာစာ"],
			["ca","Catalan","català"],
			["ch","Chamorro","Chamoru"],
			["ce","Chechen","нохчийн мотт"],
			["ny","Nyanja","chiCheŵa"],
			["zh","Chinese","中文"],
			["cv","Chuvash","чӑваш чӗлхи"],
			["kw","Cornish","Kernewek"],
			["co","Corsican","corsu"],
			["cr","Cree","ᓀᐦᐃᔭᐍᐏᐣ"],
			["hr","Croatian","hrvatski jezik"],
			["cs","Czech","čeština"],
			["da","Danish","dansk"],
			["nl","Dutch","Nederlands"],
			["dz","Dzongkha","རྫོང་ཁ"],
			["en","English","English"],
			["eo","Esperanto","Esperanto"],
			["et","Estonian","eesti keel"],
			["ee","Ewe","Eʋegbe"],
			["fo","Faroese","føroyskt"],
			["fj","Fijian","vosa Vakaviti"],
			["fi","Finnish","suomen kieli"],
			["fr","French","français"],
			["ff","Fula","Fulfulde"],
			["gl","Galician","galego"],
			["ka","Georgian","ქართული"],
			["de","German","Deutsch"],
			["el","Greek","ελληνικά"],
			["gn","Guaraní","Avañe'ẽ"],
			["gu","Gujarati","ગુજરાતી"],
			["ht","Haitian Creole","Kreyòl ayisyen"],
			["hau","Hausa","هَوُسَ"],
			["heb","Hebrew","עברית"],
			["hz","Herero","Otjiherero"],
			["hi","Hindi","हिन्दी"],
			["ho","Hiri Motu","Hiri Motu"],
			["hu","Hungarian","magyar"],
			["ia","Interlingua","Interlingua"],
			["id","Indonesian","Bahasa Indonesia"],
			["ie","Interlingue","Interlingue"],
			["ga","Irish","Gaeilge"],
			["ig","Igbo","Asụsụ Igbo"],
			["ik","Inupiaq","Iñupiaq"],
			["io","Ido","Ido"],
			["is","Icelandic","Íslenska"],
			["it","Italian","italiano"],
			["iu","Inuktitut","ᐃᓄᒃᑎᑐᑦ"],
			["ja","Japanese","日本語"],
			["jv","Javanese","basa Jawa"],
			["kl","Greenlandic","kalaallit oqaasii"],
			["kn","Kannada","ಕನ್ನಡ"],
			["kr","Kanuri","Kanuri"],
			["ks","Kashmiri","कश्मीरी"],
			["kk","Kazakh","қазақ тілі"],
			["km","Khmer","ខ្មែរ"],
			["ki","Kikuyu","Gĩkũyũ"],
			["rw","Kinyarwanda","Ikinyarwanda"],
			["ky","Kyrgyz","Кыргыз тили"],
			["kv","Komi","коми кыв"],
			["kg","Kongo","Kikongo"],
			["ko","Korean","한국어"],
			["ku","Kurdish","كوردی‎"],
			["kj","Kwanyama","Kuanyama"],
			["la","Latin","lingua latina"],
			["lb","Letzeburgesch","Lëtzebuergesch"],
			["lg","Ganda","Luganda"],
			["li","Limburgan","Limburgs"],
			["ln","Lingala","Lingála"],
			["lo","Lao","ພາສາລາວ"],
			["lt","Lithuanian","lietuvių kalba"],
			["lu","Luba-Katanga","Tshiluba"],
			["lv","Latvian","latviešu valoda"],
			["gv","Manx","Gaelg"],
			["mk","Macedonian","македонски јазик"],
			["mg","Malagasy","fiteny malagasy"],
			["ms","Malay","بهاس ملايو‎"],
			["ml","Malayalam","മലയാളം"],
			["mt","Maltese","Malti"],
			["mi","Māori","te reo Māori"],
			["mr","Marathi","मराठी"],
			["mh","Marshallese","Kajin M̧ajeļ"],
			["mn","Mongolian","Монгол хэл"],
			["na","Nauru","Ekakairũ Naoero"],
			["nv","Navajo","Diné bizaad"],
			["nd","Northern Ndebele","isiNdebele"],
			["ne","Nepali","नेपाली"],
			["ng","Ndonga","Owambo"],
			["nb","Norwegian Bokmål","Norsk bokmål"],
			["nn","Norwegian Nynorsk","Norsk nynorsk"],
			["no","Norwegian","Norsk"],
			["ii","Nuosu","ꆈꌠ꒿ Nuosuhxop"],
			["nr","Southern Ndebele","isiNdebele"],
			["oc","Occitan","lenga d'òc"],
			["oj","Ojibwe","ᐊᓂᔑᓈᐯᒧᐎᓐ"],
			["cu","Old Church Slavonic","ѩзыкъ словѣньскъ"],
			["om","Oromo","Afaan Oromoo"],
			["or","Oriya","ଓଡ଼ିଆ"],
			["os","Ossetian","ирон æвзаг"],
			["pa","Punjabi","ਪੰਜਾਬੀ"],
			["pi","Pāli","पाऴि"],
			["fas","Farsi","فارسی"],
			["pl","Polish","język polski"],
			["pus","Pashto","پښتو"],
			["pt","Portuguese","português"],
			["qu","Quechua","Kichwa"],
			["rm","Romansh","rumantsch grischun"],
			["rn","Kirundi","Ikirundi"],
			["ro","Romanian","limba română"],
			["ru","Russian","Русский"],
			["sa","Sanskrit","संस्कृतम्"],
			["sc","Sardinian","sardu"],
			["sd","Sindhi","सिन्धी"],
			["se","Northern Sami","Davvisámegiella"],
			["sm","Samoan","gagana fa'a Samoa"],
			["sg","Sango","yângâ tî sängö"],
			["sr","Serbian","српски језик"],
			["gd","Gaelic","Gàidhlig"],
			["sn","Shona","chiShona"],
			["si","Sinhalese","සිංහල"],
			["sk","Slovak","slovenčina"],
			["sl","Slovene","slovenščina"],
			["so","Somali","af Soomaali"],
			["st","Southern Sotho","Sesotho"],
			["es","Spanish","español"],
			["su","Sundanese","Basa Sunda"],
			["sw","Swahili","Kiswahili"],
			["ss","Swati","SiSwati"],
			["sv","Swedish","svenska"],
			["ta","Tamil","தமிழ்"],
			["te","Telugu","తెలుగు"],
			["tg","Tajik","тоҷикӣ"],
			["th","Thai","ไทย"],
			["ti","Tigrinya","ትግርኛ"],
			["bo","Tibetan","བོད་ཡིག"],
			["tk","Turkmen","Түркмен"],
			["tl","Tagalog","Wikang Tagalog"],
			["tn","Tswana","Setswana"],
			["to","Tonga","faka Tonga"],
			["tr","Turkish","Türkçe"],
			["ts","Tsonga","Xitsonga"],
			["tt","Tatar","татар теле"],
			["tw","Twi","Twi"],
			["ty","Tahitian","Reo Tahiti"],
			["ug","Uyghur","ئۇيغۇرچە‎"],
			["uk","Ukrainian","українська мова"],
			["urd","Urdu","اردو"],
			["uz","Uzbek","Ўзбек‎"],
			["ve","Venda","Tshivenḓa"],
			["vi","Vietnamese","Việt Nam"],
			["vo","Volapük","Volapük"],
			["wa","Walloon","walon"],
			["cy","Welsh","Cymraeg"],
			["wo","Wolof","Wollof"],
			["fy","Western Frisian","Frysk"],
			["xh","Xhosa","isiXhosa"],
			["yid","Yiddish","ייִדיש"],
			["yo","Yoruba","Yorùbá"],
			["za","Zhuang","Saɯ cueŋƅ"],
			["zu","Zulu","isiZulu"]
        ];
    	this.langCode = iso639;
    	this.isValidCode = this.validate639(iso639);
    	this.english = this.lookupEnglishEquivalent();
    	this.native = this.lookupNative();
    	Object.seal(this);
    }
    
    validate639(iso639) {
    	for (let item of this.table) {
    		if (item[0] == iso639)
    			return true;
    	}
    	return false;
    }
    
    lookupEnglishEquivalent() {
    	if (!this.isValid())
        	return "unknown";
    	
    	for (let item of this.table) {
    		if (item[0] == this.langCode)
    			return item[1];
    	}
    	return "error";
    }
    
    lookupNative() {
    	if (!this.isValid())
        	return "unknown";
    	
    	for (let item of this.table) {
    		if (item[0] == this.langCode)
    			return item[2];
    	}
    	return "error";
    }
    
    get languageCode() {
    	return this.langCode;
    }
    
    get englishEquivalent() {
    	return this.english;
    }
    
    get nativeSpelling() {
    	return this.native;
    }

    isValid() {
    	return this.isValidCode;
    }
}

var iso639 = "zu";
var hello = new Hello(iso639);
var isValid = hello.isValid();
var lang = hello.englishEquivalent;
var native = hello.native;
global.__b = (native == "isiZulu");
