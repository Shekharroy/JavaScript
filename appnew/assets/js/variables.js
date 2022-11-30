/**
* <p>Title: variables.js </p>
* <p>Module: ACMS</p>
* <p>Copyright: 2019-2020 DCirrus PVT LTD. All Rights Reserved.</p>
* <p>Company: DCirrus PVT LTD</p>
* <p>Date:7th April 2015<p>
* @version : 1.0
*/

/*********************** constants starts *********************/

var cloudURLACT = "";
var cloudURLACTDomain = "";
var cloudURLProtocol = "http://";
var defaultServerDomain = "localhost";
var externalDomains = [];
var externalDomainNames = [];
var cloudApiUrlACMSServer = "";

var loggedin = false;
var timeZone = "";

var formats = {
"ar-sa" : "dd/mm/yy",
"bg-bg" : "dd.m.yy",
"ca-es" : "dd/mm/yy",
"zh-tw" : "yy/m/d",
"cs-cz" : "d.m.yy",
"da-dk" : "dd-mm-yy",
"de-de" : "dd.mm.yy",
"el-gr" : "d/m/yy",
"en-us" : "mm/dd/yy",
"fi-fi" : "d.m.yy",
"fr-fr" : "dd/mm/yy",
"he-il" : "dd/mm/yy",
"hu-hu" : "yy. mm. dd.",
"is-is" : "d.m.yy",
"it-it" : "dd/mm/yy",
"ja-jp" : "yy/mm/dd",
"ko-kr" : "yy-mm-dd",
"nl-nl" : "d-m-yy",
"nb-no" : "dd.mm.yy",
"pl-pl" : "yy-mm-dd",
"pt-br" : "d/m/yy",
"ro-ro" : "dd.mm.yy",
"ru-ru" : "dd.mm.yy",
"hr-hr" : "d.m.yy",
"sk-sk" : "d. m. yy",
"sq-al" : "yy-mm-dd",
"sv-se" : "yy-mm-dd",
"th-th" : "d/m/yy",
"tr-tr" : "dd.mm.yy",
"ur-pk" : "dd/mm/yy",
"id-id" : "dd/mm/yy",
"uk-ua" : "dd.mm.yy",
"be-by" : "dd.mm.yy",
"sl-si" : "d.m.yy",
"et-ee" : "d.mm.yy",
"lv-lv" : "yy.mm.dd.",
"lt-lt" : "yy.mm.dd",
"fa-ir" : "mm/dd/yy",
"vi-vn" : "dd/mm/yy",
"hy-am" : "dd.mm.yy",
"az-latn-az" : "dd.mm.yy",
"eu-es" : "yy/mm/dd",
"mk-mk" : "dd.mm.yy",
"af-za" : "yy/mm/dd",
"ka-ge" : "dd.mm.yy",
"fo-fo" : "dd-mm-yy",
"hi-in" : "dd-mm-yy",
"ms-my" : "dd/mm/yy",
"kk-kz" : "dd.mm.yy",
"ky-kg" : "dd.mm.yy",
"sw-ke" : "m/d/yy",
"uz-latn-uz" : "dd/mm yy",
"tt-ru" : "dd.mm.yy",
"pa-in" : "dd-mm-yy",
"gu-in" : "dd-mm-yy",
"ta-in" : "dd-mm-yy",
"te-in" : "dd-mm-yy",
"kn-in" : "dd-mm-yy",
"mr-in" : "dd-mm-yy",
"sa-in" : "dd-mm-yy",
"mn-mn" : "yy.mm.dd",
"gl-es" : "dd/mm/yy",
"kok-in" : "dd-mm-yy",
"syr-sy" : "dd/mm/yy",
"dv-mv" : "dd/mm/yy",
"ar-iq" : "dd/mm/yy",
"zh-cn" : "yy/m/d",
"de-ch" : "dd.mm.yy",
"en-gb" : "dd/mm/yy",
"es-mx" : "dd/mm/yy",
"fr-be" : "d/mm/yy",
"it-ch" : "dd.mm.yy",
"nl-be" : "d/mm/yy",
"nn-no" : "dd.mm.yy",
"pt-pt" : "dd-mm-yy",
"sr-latn-cs" : "d.m.yy",
"sv-fi" : "d.m.yy",
"az-cyrl-az" : "dd.mm.yy",
"ms-bn" : "dd/mm/yy",
"uz-cyrl-uz" : "dd.mm.yy",
"ar-eg" : "dd/mm/yy",
"zh-hk" : "d/m/yy",
"de-at" : "dd.mm.yy",
"en-au" : "d/mm/yy",
"es-es" : "dd/mm/yy",
"fr-ca" : "yy-mm-dd",
"sr-cyrl-cs" : "d.m.yy",
"ar-ly" : "dd/mm/yy",
"zh-sg" : "d/m/yy",
"de-lu" : "dd.mm.yy",
"en-ca" : "dd/mm/yy",
"es-gt" : "dd/mm/yy",
"fr-ch" : "dd.mm.yy",
"ar-dz" : "dd-mm-yy",
"zh-mo" : "d/m/yy",
"de-li" : "dd.mm.yy",
"en-nz" : "d/mm/yy",
"es-cr" : "dd/mm/yy",
"fr-lu" : "dd/mm/yy",
"ar-ma" : "dd-mm-yy",
"en-ie" : "dd/mm/yy",
"es-pa" : "mm/dd/yy",
"fr-mc" : "dd/mm/yy",
"ar-tn" : "dd-mm-yy",
"en-za" : "yy/mm/dd",
"es-do" : "dd/mm/yy",
"ar-om" : "dd/mm/yy",
"en-jm" : "dd/mm/yy",
"es-ve" : "dd/mm/yy",
"ar-ye" : "dd/mm/yy",
"en-029" : "mm/dd/yy",
"es-co" : "dd/mm/yy",
"ar-sy" : "dd/mm/yy",
"en-bz" : "dd/mm/yy",
"es-pe" : "dd/mm/yy",
"ar-jo" : "dd/mm/yy",
"en-tt" : "dd/mm/yy",
"es-ar" : "dd/mm/yy",
"ar-lb" : "dd/mm/yy",
"en-zw" : "m/d/yy",
"es-ec" : "dd/mm/yy",
"ar-kw" : "dd/mm/yy",
"en-ph" : "m/d/yy",
"es-cl" : "dd-mm-yy",
"ar-ae" : "dd/mm/yy",
"es-uy" : "dd/mm/yy",
"ar-bh" : "dd/mm/yy",
"es-py" : "dd/mm/yy",
"ar-qa" : "dd/mm/yy",
"es-bo" : "dd/mm/yy",
"es-sv" : "dd/mm/yy",
"es-hn" : "dd/mm/yy",
"es-ni" : "dd/mm/yy",
"es-pr" : "dd/mm/yy",
"am-et" : "d/m/yy",
"tzm-latn-dz" : "dd-mm-yy",
"iu-latn-ca" : "d/mm/yy",
"sma-no" : "dd.mm.yy",
"mn-mong-cn" : "yy/m/d",
"gd-gb" : "dd/mm/yy",
"en-my" : "d/m/yy",
"prs-af" : "dd/mm/yy",
"bn-bd" : "dd-mm-yy",
"wo-sn" : "dd/mm/yy",
"rw-rw" : "m/d/yy",
"qut-gt" : "dd/mm/yy",
"sah-ru" : "mm.dd.yy",
"gsw-fr" : "dd/mm/yy",
"co-fr" : "dd/mm/yy",
"oc-fr" : "dd/mm/yy",
"mi-nz" : "dd/mm/yy",
"ga-ie" : "dd/mm/yy",
"se-se" : "yy-mm-dd",
"br-fr" : "dd/mm/yy",
"smn-fi" : "d.m.yy",
"moh-ca" : "m/d/yy",
"arn-cl" : "dd-mm-yy",
"ii-cn" : "yy/m/d",
"dsb-de" : "d. m. yy",
"ig-ng" : "d/m/yy",
"kl-gl" : "dd-mm-yy",
"lb-lu" : "dd/mm/yy",
"ba-ru" : "dd.mm.yy",
"nso-za" : "yy/mm/dd",
"quz-bo" : "dd/mm/yy",
"yo-ng" : "d/m/yy",
"ha-latn-ng" : "d/m/yy",
"fil-ph" : "m/d/yy",
"ps-af" : "dd/mm/yy",
"fy-nl" : "d-m-yy",
"ne-np" : "m/d/yy",
"se-no" : "dd.mm.yy",
"iu-cans-ca" : "d/m/yy",
"sr-latn-rs" : "d.m.yy",
"si-lk" : "yy-mm-dd",
"sr-cyrl-rs" : "d.m.yy",
"lo-la" : "dd/mm/yy",
"km-kh" : "yy-mm-dd",
"cy-gb" : "dd/mm/yy",
"bo-cn" : "yy/m/d",
"sms-fi" : "d.m.yy",
"as-in" : "dd-mm-yy",
"ml-in" : "dd-mm-yy",
"en-in" : "dd-mm-yy",
"or-in" : "dd-mm-yy",
"bn-in" : "dd-mm-yy",
"tk-tm" : "dd.mm.yy",
"bs-latn-ba" : "d.m.yy",
"mt-mt" : "dd/mm/yy",
"sr-cyrl-me" : "d.m.yy",
"se-fi" : "d.m.yy",
"zu-za" : "yy/mm/dd",
"xh-za" : "yy/mm/dd",
"tn-za" : "yy/mm/dd",
"hsb-de" : "d. m. yy",
"bs-cyrl-ba" : "d.m.yy",
"tg-cyrl-tj" : "dd.mm.yy",
"sr-latn-ba" : "d.m.yy",
"smj-no" : "dd.mm.yy",
"rm-ch" : "dd/mm/yy",
"smj-se" : "yy-mm-dd",
"quz-ec" : "dd/mm/yy",
"quz-pe" : "dd/mm/yy",
"hr-ba" : "d.m.yy.",
"sr-latn-me" : "d.m.yy",
"sma-se" : "yy-mm-dd",
"en-sg" : "d/m/yy",
"ug-cn" : "yy-m-d",
"sr-cyrl-ba" : "d.m.yy",
"es-us" : "m/d/yy"};


var convformats = {
"AR-SA" : "DD/MM/YY",
"BG-BG" : "DD.M.YYYY",
"CA-ES" : "DD/MM/YYYY",
"ZH-TW" : "YYYY/M/D",
"CS-CZ" : "D.M.YYYY",
"DA-DK" : "DD-MM-YYYY",
"DE-DE" : "DD.MM.YYYY",
"EL-GR" : "D/M/YYYY",
"EN-US" : "MM/DD/YYYY",
"FI-FI" : "D.M.YYYY",
"FR-FR" : "DD/MM/YYYY",
"HE-IL" : "DD/MM/YYYY",
"HU-HU" : "YYYY. MM. DD.",
"IS-IS" : "D.M.YYYY",
"IT-IT" : "DD/MM/YYYY",
"JA-JP" : "YYYY/MM/DD",
"KO-KR" : "YYYY-MM-DD",
"NL-NL" : "D-M-YYYY",
"NB-NO" : "DD.MM.YYYY",
"PL-PL" : "YYYY-MM-DD",
"PT-BR" : "D/M/YYYY",
"RO-RO" : "DD.MM.YYYY",
"RU-RU" : "DD.MM.YYYY",
"HR-HR" : "D.M.YYYY",
"SK-SK" : "D. M. YYYY",
"SQ-AL" : "YYYY-MM-DD",
"SV-SE" : "YYYY-MM-DD",
"TH-TH" : "D/M/YYYY",
"TR-TR" : "DD.MM.YYYY",
"UR-PK" : "DD/MM/YYYY",
"ID-ID" : "DD/MM/YYYY",
"UK-UA" : "DD.MM.YYYY",
"BE-BY" : "DD.MM.YYYY",
"SL-SI" : "D.M.YYYY",
"ET-EE" : "D.MM.YYYY",
"LV-LV" : "YYYY.MM.DD.",
"LT-LT" : "YYYY.MM.DD",
"FA-IR" : "MM/DD/YYYY",
"VI-VN" : "DD/MM/YYYY",
"HY-AM" : "DD.MM.YYYY",
"AZ-LATN-AZ" : "DD.MM.YYYY",
"EU-ES" : "YYYY/MM/DD",
"MK-MK" : "DD.MM.YYYY",
"AF-ZA" : "YYYY/MM/DD",
"KA-GE" : "DD.MM.YYYY",
"FO-FO" : "DD-MM-YYYY",
"HI-IN" : "DD-MM-YYYY",
"MS-MY" : "DD/MM/YYYY",
"KK-KZ" : "DD.MM.YYYY",
"KY-KG" : "DD.MM.YY",
"SW-KE" : "M/D/YYYY",
"UZ-LATN-UZ" : "DD/MM YYYY",
"TT-RU" : "DD.MM.YYYY",
"PA-IN" : "DD-MM-YY",
"GU-IN" : "DD-MM-YY",
"TA-IN" : "DD-MM-YYYY",
"TE-IN" : "DD-MM-YY",
"KN-IN" : "DD-MM-YY",
"MR-IN" : "DD-MM-YYYY",
"SA-IN" : "DD-MM-YYYY",
"MN-MN" : "YY.MM.DD",
"GL-ES" : "DD/MM/YY",
"KOK-IN" : "DD-MM-YYYY",
"SYR-SY" : "DD/MM/YYYY",
"DV-MV" : "DD/MM/YY",
"AR-IQ" : "DD/MM/YYYY",
"ZH-CN" : "YYYY/M/D",
"DE-CH" : "DD.MM.YYYY",
"EN-GB" : "DD/MM/YYYY",
"ES-MX" : "DD/MM/YYYY",
"FR-BE" : "D/MM/YYYY",
"IT-CH" : "DD.MM.YYYY",
"NL-BE" : "D/MM/YYYY",
"NN-NO" : "DD.MM.YYYY",
"PT-PT" : "DD-MM-YYYY",
"SR-LATN-CS" : "D.M.YYYY",
"SV-FI" : "D.M.YYYY",
"AZ-CYRL-AZ" : "DD.MM.YYYY",
"MS-BN" : "DD/MM/YYYY",
"UZ-CYRL-UZ" : "DD.MM.YYYY",
"AR-EG" : "DD/MM/YYYY",
"ZH-HK" : "D/M/YYYY",
"DE-AT" : "DD.MM.YYYY",
"EN-AU" : "D/MM/YYYY",
"ES-ES" : "DD/MM/YYYY",
"FR-CA" : "YYYY-MM-DD",
"SR-CYRL-CS" : "D.M.YYYY",
"AR-LY" : "DD/MM/YYYY",
"ZH-SG" : "D/M/YYYY",
"DE-LU" : "DD.MM.YYYY",
"EN-CA" : "DD/MM/YYYY",
"ES-GT" : "DD/MM/YYYY",
"FR-CH" : "DD.MM.YYYY",
"AR-DZ" : "DD-MM-YYYY",
"ZH-MO" : "D/M/YYYY",
"DE-LI" : "DD.MM.YYYY",
"EN-NZ" : "D/MM/YYYY",
"ES-CR" : "DD/MM/YYYY",
"FR-LU" : "DD/MM/YYYY",
"AR-MA" : "DD-MM-YYYY",
"EN-IE" : "DD/MM/YYYY",
"ES-PA" : "MM/DD/YYYY",
"FR-MC" : "DD/MM/YYYY",
"AR-TN" : "DD-MM-YYYY",
"EN-ZA" : "YYYY/MM/DD",
"ES-DO" : "DD/MM/YYYY",
"AR-OM" : "DD/MM/YYYY",
"EN-JM" : "DD/MM/YYYY",
"ES-VE" : "DD/MM/YYYY",
"AR-YE" : "DD/MM/YYYY",
"EN-029" : "MM/DD/YYYY",
"ES-CO" : "DD/MM/YYYY",
"AR-SY" : "DD/MM/YYYY",
"EN-BZ" : "DD/MM/YYYY",
"ES-PE" : "DD/MM/YYYY",
"AR-JO" : "DD/MM/YYYY",
"EN-TT" : "DD/MM/YYYY",
"ES-AR" : "DD/MM/YYYY",
"AR-LB" : "DD/MM/YYYY",
"EN-ZW" : "M/D/YYYY",
"ES-EC" : "DD/MM/YYYY",
"AR-KW" : "DD/MM/YYYY",
"EN-PH" : "M/D/YYYY",
"ES-CL" : "DD-MM-YYYY",
"AR-AE" : "DD/MM/YYYY",
"ES-UY" : "DD/MM/YYYY",
"AR-BH" : "DD/MM/YYYY",
"ES-PY" : "DD/MM/YYYY",
"AR-QA" : "DD/MM/YYYY",
"ES-BO" : "DD/MM/YYYY",
"ES-SV" : "DD/MM/YYYY",
"ES-HN" : "DD/MM/YYYY",
"ES-NI" : "DD/MM/YYYY",
"ES-PR" : "DD/MM/YYYY",
"AM-ET" : "D/M/YYYY",
"TZM-LATN-DZ" : "DD-MM-YYYY",
"IU-LATN-CA" : "D/MM/YYYY",
"SMA-NO" : "DD.MM.YYYY",
"MN-MONG-CN" : "YYYY/M/D",
"GD-GB" : "DD/MM/YYYY",
"EN-MY" : "D/M/YYYY",
"PRS-AF" : "DD/MM/YY",
"BN-BD" : "DD-MM-YY",
"WO-SN" : "DD/MM/YYYY",
"RW-RW" : "M/D/YYYY",
"QUT-GT" : "DD/MM/YYYY",
"SAH-RU" : "MM.DD.YYYY",
"GSW-FR" : "DD/MM/YYYY",
"CO-FR" : "DD/MM/YYYY",
"OC-FR" : "DD/MM/YYYY",
"MI-NZ" : "DD/MM/YYYY",
"GA-IE" : "DD/MM/YYYY",
"SE-SE" : "YYYY-MM-DD",
"BR-FR" : "DD/MM/YYYY",
"SMN-FI" : "D.M.YYYY",
"MOH-CA" : "M/D/YYYY",
"ARN-CL" : "DD-MM-YYYY",
"II-CN" : "YYYY/M/D",
"DSB-DE" : "D. M. YYYY",
"IG-NG" : "D/M/YYYY",
"KL-GL" : "DD-MM-YYYY",
"LB-LU" : "DD/MM/YYYY",
"BA-RU" : "DD.MM.YY",
"NSO-ZA" : "YYYY/MM/DD",
"QUZ-BO" : "DD/MM/YYYY",
"YO-NG" : "D/M/YYYY",
"HA-LATN-NG" : "D/M/YYYY",
"FIL-PH" : "M/D/YYYY",
"PS-AF" : "DD/MM/YY",
"FY-NL" : "D-M-YYYY",
"NE-NP" : "M/D/YYYY",
"SE-NO" : "DD.MM.YYYY",
"IU-CANS-CA" : "D/M/YYYY",
"SR-LATN-RS" : "D.M.YYYY",
"SI-LK" : "YYYY-MM-DD",
"SR-CYRL-RS" : "D.M.YYYY",
"LO-LA" : "DD/MM/YYYY",
"KM-KH" : "YYYY-MM-DD",
"CY-GB" : "DD/MM/YYYY",
"BO-CN" : "YYYY/M/D",
"SMS-FI" : "D.M.YYYY",
"AS-IN" : "DD-MM-YYYY",
"ML-IN" : "DD-MM-YY",
"EN-IN" : "DD-MM-YYYY",
"OR-IN" : "DD-MM-YY",
"BN-IN" : "DD-MM-YY",
"TK-TM" : "DD.MM.YY",
"BS-LATN-BA" : "D.M.YYYY",
"MT-MT" : "DD/MM/YYYY",
"SR-CYRL-ME" : "D.M.YYYY",
"SE-FI" : "D.M.YYYY",
"ZU-ZA" : "YYYY/MM/DD",
"XH-ZA" : "YYYY/MM/DD",
"TN-ZA" : "YYYY/MM/DD",
"HSB-DE" : "D. M. YYYY",
"BS-CYRL-BA" : "D.M.YYYY",
"TG-CYRL-TJ" : "DD.MM.YY",
"SR-LATN-BA" : "D.M.YYYY",
"SMJ-NO" : "DD.MM.YYYY",
"RM-CH" : "DD/MM/YYYY",
"SMJ-SE" : "YYYY-MM-DD",
"QUZ-EC" : "DD/MM/YYYY",
"QUZ-PE" : "DD/MM/YYYY",
"HR-BA" : "D.M.YYYY.",
"SR-LATN-ME" : "D.M.YYYY",
"SMA-SE" : "YYYY-MM-DD",
"EN-SG" : "D/M/YYYY",
"UG-CN" : "YYYY-M-D",
"SR-CYRL-BA" : "D.M.YYYY",
"ES-US" : "M/D/YYYY"
};

/*base 64*/
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
};

var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};

/*********************** constants ends *********************/

/*********************** Global variables declaration and initilizations starts  *********************/
//used to track the language
var language = "";
//used to track the selected date format
var selectedformat = "";
//used to identify the timezone
var timezone = "";
//busy indicator
var busyInd = undefined;
//used to track the device id
var deviceid = "";
//used to track the device name
var devicename = "";
//used to track the device type
var devicetype = "";
//used to track the device RemoteAddress
var remoteaddress = "";
//used to track the device RemoteAddressV4
var remoteaddressv4 = "";
//used to store the base64 authentication
var base64auth = "";
//used to store the client id
var clientid = "";
//used to store the email id of the user
var useremail = "";
//used to store the default email id
//var defaultemailid = "";
//used to store the username
var username = "";
//used to store the client id long value
//var clientidlong = "";
//used to store the client name
//var lawfirmnameglobal = "";
//used to store the email id of the user
var useremailid = "";
//used to store the user password
var userpassword = "";
//used to store cache storage id
var CACHE_STORAGE_ID = "";
//used to store the module name from the url
var moduleName = undefined;
//used to store the clicked module name
var notificationClickedModule = undefined;
//used to store the current notifications data
var notificationString = undefined;
//used to store the clicked module number
var moduleclickedNumber = 0;
//used to store the module name for which the notifications came
var amsactive = ",";


var cloudApiUrl = cloudURLACT + "/api.acms.server/v1/lawfirm/server/{clientId}/Myaction";
var worklightServerUrl = ":8080";
var cloudApiServerAddress = "";

//used to store the current client id from the notifications
var clientidcurrentfromnotif = -1;
//used to store the plugin value
//var plugin = plugin0;
//used to identify whether the plugin is loaded or not
var valpluginloaded = false;
//used to store the temporaory plugin interver value
var tmplugininterval = undefined;
//used to store the login redirection
var loadingdirect = null;
//used to store the counter varible
var cntr = false;
//used to store the sequence number of all modules
var arrayseq = new Array();
//used to initilize height of the page
var h = 1000;
//used to store the module names in the array
var arrpost = new Array();
//used to store user logged in status
//var loggedinnow = false;
//used to store notification payload
var notificationpayload = undefined;
//used to store notification from resume
var fromresume = false;
//used to store logged in status
//var loggedinalready = false;
var accType = "I";
//used to store geolocation
var geolocation = "";
var cloudApiUrlACMS = cloudURLACT + "/api.acms";

var errormessagetimer = null;
//used for checking what is the current inputbox dropdown box
var inputdropboxcount = -1;

//used for checking wheather logo service invoked or not
var logoServiceInvoked = false;


/*********************** Global variables declaration and initilizations ends  *********************/

/********** Dashboard html IDS starts *************/
var dashboard_loginPage = "loginpage";
var dashboard_loginHeader = "loginheader";
var dashboard_loginDivDontent = "logindivcontent";
var dashboard_loginUserEmail = "loginuseremail";
var dashboard_loginUserPassword = "loginuserpassword";
var dashboard_loginClientId = "loginclientid";
var dashboard_loginButtontnLogin = "loginbtnlogin";
var dashboard_loginBtnGetClientUrl = "loginbtngetclienturl";
var dashboard_notificationsPage = "notificationsPage";
var dashboard_notificationsListContent = "notificationsListContent";
var dashboard_notifications_1 = "notifications_1";
var dashboard_notifications_2 = "notifications_2";
var dashboard_notifications_3 = "notifications_3";
var dashboard_notifications_4 = "notifications_4";
var dashboard_notifications_5 = "notifications_5";
var dashboard_notifications_6 = "notifications_6";
var dashboard_notifications_7 = "notifications_7";
var dashboard_notifications_8 = "notifications_8";
var dashboard_notifications_9 = "notifications_9";
var dashboard_navPanel = "nav-panel";
var dashboard_applogoutNotificationsHeader = "applogoutNotificationsHeader";
var dashboard_globalChangePasswordPanel = "globalChangePasswordPanel";
var dashboard_divPage = "divpage";
var dashboard_homeButton = "homebutton";
var dashboard_plugin0 = "plugin0";
var dashboard_divErrorPage = "diverrorpage";
var dashboard_ribbon = "ribbon";
var dashboard_rod = "rod";
var dashboard_waves = "waves";
var dashboard_DivError = "dashboard_DivError";
var dashboard_SpanError = "dashboard_SpanError";
var dashboard_CloseImgError = "dashboard_CloseImgError";
var dashboard_DivErrorPopUp = "dashboard_DivErrorPopUp";
var dashboard_SpanErrorPopUp = "dashboard_SpanErrorPopUp";
var dashboard_CloseImgErrorPopUp = "dashboard_CloseImgErrorPopUp";
var dashboard_div_confirm = "dashboard_div_confirm";
var dashboard_button_confirm_yes = "dashboard_button_confirm_yes";
var dashboard_button_confirm_no = "dashboard_button_confirm_no";
var dashbaord_div_confirmdivmain = "dashbaord_div_confirmdivmain";
var dashbaord_spn_confirmdivmain= "dashbaord_spn_confirmdivmain";
var dashbaord_close_confirmdivmain= "dashbaord_close_confirmdivmain";
var dashboard_mainHeader = "mainHeader";
/********** Dashboard html IDS ends *************/


/********** Dashboard html Classes starts *************/
var dashboard_pageWrapperCls = "pagewrapper";
var dashboard_hdbgCls = "hdbg";
var dashboard_uiGridACls = "ui-grid-a";
var dashboard_navHdCls = "nav-hd";
var dashboard_centerCls = "center";
var dashboard_uiContentCls = "ui-content";
var dashboard_popupFieldCls = "popupfield";
var dashboard_acmFixheaderCls = "acm-fixheader";
var dashboard_dashboardHeaderCls = "dashboardheader";
var dashboard_acmHeaderLeftCls = "acm-header-left";
var dashboard_pl10Cls = "pl10";
var dashboard_acmHeaderRightCls = "acm-header-right";
var dashboard_fullscreenCls = "fullscreen";
var dashboard_acmDashboardPageCls = "acm-dashboard-page";
var dashboard_tableCls = "table";
var dashboard_rowCls = "row";
var dashboard_cellCls = "cell";
var dashboard_acmDbIconCls = "acm-db-icon";
var dashboard_pageTodolistCls = "pageTodolist";
var dashboard_pageCalendarCls = "pageCalendar";
var dashboard_pageActivecaseCls = "pageActivecase";
var dashboard_PageTimesheetCls = "PageTimesheet";
var dashboard_pageCostCls = "pageCost";
var dashboard_pageContactlistCls = "pageContactlist";
var dashboard_slideLeftClassCls = "slide-left-class";
var dashboard_uiPanelFixedCls = "ui-panel-fixed";
var dashboard_acmPanellistCls = "acm-panellist";
var dashboard_specialImage = "specialImage";
var dashboard_uiPage = "ui-page";
var dashboard_uiPageThemeA = "ui-page-theme-a";
var dashboard_uiPageActive = "ui-page-active";
var dashboard_uiPageHeaderFixed = "ui-page-header-fixed";
var dashboard_contentWrpper = "content-wrapper";
var dashboard_parallaxLayer = "parallax-layer";
var dashboard_wave1 = "wave1";
var dashboard_wave2 = "wave2";
var dashboard_wave3 = "wave3";
var dashboard_errorFixHeader = "error-fixheader";
var dashboard_ErrorDivcls = "errorDiv";
var dashboard_closeErrorMessageCls = "closeErrorMessage";
var dashboard_closeErrorMessageCls = "closeErrorMessage";
var dashboard_div_confirmCls = "confirmdiv";
var dashboard_button_confirmCls = "btn-primary";
var dashbaord_div_confirmdivmainCls = "confirmdivmain";
var document_inputdropboxCls = "inputdropbox";
var document_inputdropboxtextboxtmpCls = "inputdropboxtextboxtmp";
var document_inputdropboxlitmpCls = "inputdropboxlitmp";
var localclientName ="DCirrus";
/********** Dashboard html Classes ends *************/


/********** Dash board static html data starts  *************/
var dashboard_welcomeMessageHeader = "Welcome To ACMS";
var dashboard_loginBtn = "Login";
var dashboard_connectBtn = "Connect";
var dashboard_ams = "AMS";
var dashboard_todoList = "To Do List";
var dashboard_calender = "Calender";
var dashboard_cost = "Cost";
var dashboard_timeSheet = "TimeSheet";
var dashboard_acm = "ACM";
var dashboard_contact = "Contact";
var dashboard_adm = "ADM";
var dashboard_admin = "Admin";
var dashboard_changePassword = "Change Password";
var dashboard_exit = "Exit";
var dashboard_acms = "ACMS";
var dashboard_default_dateformat = "mm/dd/yyyy";
var dashboard_default_timeformat = " hh:mm am";
var dashboard_default_timeformatNormal = " hh:mm";
/********** Dash board static html data  ends *************/

/********** Service Method Types starts *******************/
var createMethod = "POST";
var updateMethod = "POST";
var deleteMethod = "POST";
var fetchMethod = "GET";
/********** Service Method Types ends *******************/

/********** Confirm Message Type Starts *************/
var confirm_Error = "ERROR";
var confirm_Success = "SUCCESS";
var confirm_Info = "INFO";
var confirm_Ask = "ASK";
/********** Confirm Message Type Ends *************/

var currentscreen = "legistdrive";
var globalViewerURL = "";

//global class
var popupClasstoBeClosed = "popupToBeClosed";

var maxlimitlistadd = 100;
var sortingTypeDESC = "DESC";
var sortingTypeASC = "ASC";

//eml and msg viewer attachment list
var admAttachmentList = "";

var customzipfileonly_cls = "customzipfileonly_cls";

//check if legal case id
var request_case_id = 0;
var request_case_name = 0;

var currentfilenamedownload = "";
var currentservicemethodafter = "";
var currentdownloadtype = "";
var prvselectednode = null;

var otptimer = 60;

var _pdxt = "HUHTRGV^%G#gtjiki98uj%gER";
var notificartionarr = [];
var storenotiflocalactive = false;

var xhrPool = [];
var abortingajax = false;

var sortorder = 1;
var sortfieldnm = "";
var datatosort = null;
var admindexpresent = false;

//comma separated values
var excludeurlsinit415arr = "/v1/app/drm/6/";
var postcururl = "";
var defaultLogoPath = "assets/img/logo1.png";


var globalvariable = {
    screenloadednew: false,
	lawfirmnameglobal : "",
	loggedinnow : false,
	loggedinalready : false,
	admForumDBFetchDone : false,
	clientidlong : "",
	defaultemailid : ""
	
}

var selectedFileId = 0;
var paymentwebserviceurl = "/v1/publicapi/login/0/fetch/corporate/expirydate";
