/**
* <p>Title: validations.js </p>
* <p>Module: ACMS</p>
* <p>Copyright: 2019-2020 DCirrus PVT LTD. All Rights Reserved.</p>
* <p>Company: DCirrus PVT LTD</p>
* <p>Date:7th April 2015<p>
* @version : 1.0
*/

/**
 * method to validate phone number
 * @param e
 * returns true/false
 */
function isValidphoneWithFormat(e){
	var filter = /[A-Za-z!@#$%^&*_=+/"';:\\|\]\[{}]/;
	return filter.test(e);
}

/**
 * method to validate login Id
 * @param e
 * returns true/false
 */
function validateLoginId(e) {
	var re = /^[\-_a-zA-Z0-9.]+$/;
	return re.test(e);
}

/**
 * method to find string has at least one letter
 * @param str
 * returns true/false
 */
function allowOneLetter(str) {

	var status = true;
	  if (str.search(/[a-zA-Z]/) == -1) {

		  status = false;
	  }
	  return status;

	}

/**
 * method to format the phone number/fax number
 * @param1 str
 * @param2 str1
 * @param3 obj
 * returns true/false
 */
function validatePhoneNumber(str,str1,obj) {
	var status = true;
	var P3 = str;
    var P4 = str1;
    if(P4 !=undefined && !isValidphoneWithFormat(P4)) {
    	P4 = P4.replace(/[{()}-]/g, '');
    	if(P3 =="" || P3 ==0)
    	{
    	 if((P4).length<7 || (P4.length>7 && (P4).length<10))
    		 {
    		 	status = false;
    		 }else if(P4.length==7 || P4.length==10){
    			 if((P4).length==7)
                 {
                   P4="(___)" + P4.substr(0,3)+"-"+P4.substr(3);
                   $("#"+obj).val(P4);
                  }
            else
              {
               P4="(" + P4.substr(0,3)+")("+ P4.substr(3,3)+"-"+P4.substr(6)+")";
               $("#"+obj).val(P4);
              }
    		 }
    	}else if(P3==1)
    		{
    		 if((P4).length<10 || P4.length>10){
    			 status = false;
    		 }else if((P4).length==10)
    		       {
    		        P4="(" + P4.substr(0,3)+")("+ P4.substr(3,3)+"-"+P4.substr(6)+")";
    		        $("#"+obj).val(P4);
    		        }
    	}else if(P3>1)
    	   {
    	      if(P4.length<=10) {
    	    	  status = true;
    	      }
    	      else{
    	    	  status = false;
    	      }

    	   }
    }else{
    	  $("#"+obj).val("");
    	  status = false;
    }
	return status;
}

/**
 * method to capitalize all first letter from word
 * @param str
 * returns true/false
 */
function capitalizefirstletterfromallword(str)
{
	if(str != null && str != undefined && str != "null" && str != "undefined" && str != "")
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	else return "";
}

/**
 * method to allow number key for textbox
 * @param evt
 * returns true/false
 */
function isNumberKeyForPhone(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode != 46 && charCode != 40 && charCode != 41 && charCode != 45 && charCode != 43 && charCode != 123 && charCode != 125) return false;
    	return true;
}

/**
 * method to allow number key for textbox
 * @param evt
 * returns true/false
 */
function isNumberKeyForIPAddress(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode > 31 && (charCode < 48 || charCode > 57 || charCode == 190)) && charCode != 46) return false;
    	return true;
}

/**
 * method to allow only numbers for textbox
 * @param evt
 * returns true/false
 */
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode != 46) return false;
    	return true;
}

/**
 * method to allow only numbers for textbox
 * @param evt
 * returns true/false
 */
function isNumberKeyOnly(event) {
	return (event.charCode >= 48 && event.charCode <= 57);
}

/**
 * method to validate login details
 * returns true/false
 */
function validateLoginDetails() {
	$("#"+dashboard_loginUserPassword).removeAttr("disabled");
	if($('#loginuseremail').val() == "") $('#loginuseremail').removeAttr("disabled");
	if($("#"+dashboard_loginClientId).val() == "")
	{
		$("#"+dashboard_loginClientId).removeAttr("disabled");
		showhidejquerytextbox(dashboard_loginUserPassword, "hide");
		showhidejquerytextbox(dashboard_loginUserEmail, "hide");
		$("#"+dashboard_loginBtnGetClientUrl).css("display", "");
		$("#"+dashboard_loginButtontnLogin).css("display", "none");
		$('#'+dashboard_loginHeader).show("slow");
		$('#'+dashboard_loginPage).show("slow");
		$("#"+dashboard_loginDivDontent).show("slow");
	}
	else
	{
		showhidejquerytextbox(dashboard_loginUserPassword, "show");
		showhidejquerytextbox(dashboard_loginUserEmail, "show");
		$("#"+dashboard_loginBtnGetClientUrl).css("display", "none");
		$("#"+dashboard_loginButtontnLogin).css("display", "");
//		getworklightserverurlACMS($("#"+dashboard_loginClientId).val());
		getlocalworklightserverurlACMS($("#"+dashboard_loginClientId).val());
	}
}

/**
 * block start to check if the login screen has any default values
 */
function checkdefaultvaluesforlogin()
{
	var apprightclientid = "";
	var apprightuseremail = "";
	if(localStorage._zu != null && localStorage._zu != "" && localStorage._zu != "null"
		&& localStorage._zy != null && localStorage._zy != "" && localStorage._zy != "null")
	{
		apprightclientid = localStorage._zu;
		apprightuseremail = localStorage._zy;
	}

	$('#loginuseremail').val(apprightuseremail);
	$("#"+dashboard_loginClientId).val(apprightclientid);

	if(apprightclientid != "" && apprightclientid != "undefined" && apprightclientid != "null")
	{
		$("#"+dashboard_loginClientId).attr("disabled", "disabled");
	}
	else
	{
		$("#"+dashboard_loginClientId).removeAttr("disabled");
		$("#"+dashboard_loginClientId).val("");
	}

	if(apprightuseremail != "" && apprightuseremail != "undefined" && apprightuseremail != "null")
	{
		$("#"+dashboard_loginUserEmail).attr("disabled", "disabled");
	}
	else
	{
		$("#"+dashboard_loginUserEmail).removeAttr("disabled");
		$('#loginuseremail').val("");
	}
}

//validate phone number
/**
 * method to validate phone number
 * @param	: e
 */
function isValidphone(e){
	var filter = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
	return filter.test(e);
}

/**
 * method to validating email
 * @param	: email
 */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var re = /^[a-zA-Z0-9._@]*$/;
    var bool = re.test(email);
    if((email.split("@")).length > 2){
		bool = false;
	}
    return bool;
}

/**
 * method is used to check null value and return true or false
 * @param	: inputData
 */
function checkNullValue(inputData){

	if(inputData =='null' || inputData=='NULL' || inputData==null || inputData == undefined || inputData == "undefined") return false;
	return true;
}

/**
 * method is used to check null value and replace with blank
 * @param	: inputData
 * return string
 */
function checkNullAndReplaceEmptyValue(inputData) {

	if (inputData == 'null' || inputData == 'NULL' || inputData == null
			|| inputData == 'undefined' || inputData == undefined) {
		inputData = "";
	}
	return inputData;
}

/**
 * method is used to check null value and return value blank if null
 * @param	: inputData
 * return string
 */
function handleNullValue(inputData){

	if(inputData =='null' || inputData=='NULL' || inputData==null || inputData == undefined || inputData == "undefined") return "";
	return inputData;
}

/**
 * method is used to check blank
 * @param	: inputData
 * return string
 */
function checkblankdata(inputData)
{
	if(inputData == "") return false;
	else if(inputData =='null' || inputData=='NULL' || inputData==null || inputData == undefined || inputData == "undefined") return false;
	return true;
}

var isValidDate = function (value, userFormat) {
	var userFormat = userFormat || 'mm/dd/yyyy', // default format
	delimiter = /[^mdy]/.exec(userFormat)[0],
	theFormat = userFormat.split(delimiter),
	theDate = value.split(delimiter),

	isDate = function (date, format) {
		var m, d, y;
		for (var i = 0, len = format.length; i < len; i++) {
		  	if (/m/.test(format[i])) m = date[i];
		  	if (/d/.test(format[i])) d = date[i];
		  	if (/y/.test(format[i])) y = date[i];
		}
		return (m > 0 && m < 13 && y && y.length === 4 && d > 0 && d <= (new Date(y, m, 0)).getDate());
	};

	return isDate(theDate, theFormat);
};

/**
 * method to validate correct date
 * @param	: inputData
 * return string
 */
//function validateDate(dt)
//{
// var separator = "";
// //if(dt.indexOf(" ") > 0) dt = dt.substring(0, dt.indexOf(" "));
//
//
// if(dt.indexOf("/") > 0)
// {
//  separator = "/";
// }
// else if(dt.indexOf(":") > 0) {
//
//  separator = "/";
//     dt = dt.replace(/:/g, '/');
//    }
// else if(dt.indexOf(" ") > 0) {
//
//  separator = "/";
//     dt = dt.replace(/ /g, '/');
//    }
// else if(dt.indexOf(";") > 0)
// {
//  dt = dt.replace(/;/g, '/');
//  separator = "/";
// }
// else if(dt.indexOf(",") > 0)
// {
//  dt = dt.replace(/,/g, '/');
//  separator = "/";
//    }
// else if(dt.indexOf("-") > 0)
// {
//  separator = "-";
// }
// else if(dt.indexOf("/") > 0)
// {
//  separator = "/";
// }
// else if(!isNaN(dt))
// {
//  if(dt.length == 8)
//  {
//   dt = insert(3, "-",dt);
//   dt = insert(5, "-",dt);
//   separator = "/";
//  }
//  else if(dt.length == 6)
//  {
//   dt = insert(2, "-",dt);
//   dt = insert(5, "-",dt);
//   separator = "/";
//  }
//  /*else if(dt.length == 5)
//  {
//   dt = "0" + dt;
//   dt = insert(2, "-",dt);
//   dt = insert(5, "-",dt);
//  }*/
//  else if(dt.length == 7)
//  {
//   dt = "0" + dt;
//   dt = insert(3, "-",dt);
//   dt = insert(5, "-",dt);
//   separator = "/";
//  }
//  else
//  {
//   return false;
//  }
// }
// else
// {
//  return false;
// }
//
// if(isValidDate(dt, 'yyyy'+separator+'mm'+separator+'dd'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'yy'+separator+'mm'+separator+'dd'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'yyyy'+separator+'dd'+separator+'mm'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'yy'+separator+'dd'+separator+'mm'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'mm'+separator+'dd'+separator+'yyyy'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'mm'+separator+'dd'+separator+'yy'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'dd'+separator+'mm'+separator+'yyyy'))
// {
//  return true;
// }
// else if(isValidDate(dt, 'dd'+separator+'mm'+separator+'yy'))
// {
//  return true;
// }
// else
// {
//  return false;
// }
//
//}
//
//function insert(ind, no, dt)
//   {
//  var v="";
//
//    for(var i=0;i<ind;i++)
//   v+=dt.charAt(i);
//
//  v+=no;
//
//    for(var j=ind;j<dt.length;j++)
//     {
//      v+=dt.charAt(j);
//     }
//
//  return v;
// }
function validateDate(dt)
{
	var separator = "";
	var time = "";
	try{
		if(dt.indexOf(" ") > 0) time = dt.substring(dt.indexOf(" ")+1);
	}catch(error){
		time="";
	}
	if(dt.indexOf(" ") > 0) dt = dt.substring(0, dt.indexOf(" "));
	if(dt.indexOf("/") > 0) separator = "/";
	else return false;

	var ret = false;
	if(isValidDate(dt, 'yyyy'+separator+'mm'+separator+'dd'))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'yy'+separator+'mm'+separator+'dd'))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'yyyy'+separator+'dd'+separator+'mm'))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'yy'+separator+'dd'+separator+'mm'))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'mm'+separator+'dd'+separator+'yyyy'))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'mm'+separator+'dd'+separator+'yy' ))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'dd'+separator+'mm'+separator+'yyyy'))
	{
		ret = true;
	}
	else if(isValidDate(dt, 'dd'+separator+'mm'+separator+'yy' ))
	{
		ret = true;
	}
	else
	{
		return false;
	}

	if(ret == true){
		if(time == "") return true;
		else return validateTime(time);
	}
}



function insert(ind, no, dt){
	var v="";
	for(var i=0;i<ind;i++)
		v+=dt.charAt(i);
	v+=no;
	for(var j=ind;j<dt.length;j++){
		v+=dt.charAt(j);
	}
	return v;
 }

/**
 * method to validate time format
 * @param time
 */
function validateTime(time){
 try{
  time = time.replace(/ /g, "");
  time = time.toLowerCase();
  // regular expression to match required time format
     var re = /^(\d{1,2}):(\d{1,2})([ap]m)?$/;
     var regs = time.match(re);
     if(regs) {
      if(regs[3]){
             // 12-hour value between 1 and 12
             if(regs[1] < 0 || regs[1] > 12){
              return false;
             } else if(regs[2] > 59) {
                 return false;
             } else{
              return true;
             }
      }
     }
     return false;
 }catch(error){
  return false;
 }
}

/**
 * method to allow character only in textbox
 * @param event
 * return string
 */
function allowCharactersOnly(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <=125) || charCode == 32) return false;
    return true;
}

/**
 * method to allow date only in textbox
 * @param event
 * return string
 */
function allowDatesOnly(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (isNumberKey(event) || charCode == 45 || charCode == 47) return true;
    	return false;
}

/**
 * method to allow date only in textbox
 * @param event
 * return string
 */
function allowAlphaNumeric(event)
{
	if(allowCharactersOnly(event) || isNumberKey(event)) return true;
    	return false;
}

/**
 * method to validate charactera
 * @param event
 * return string
 */
function validateCharacters(pharse)
{
	var rexp = /^[a-zA-Z0-9\-\_\ ]+$/;
	if(rexp.test(pharse)) return true;
	else return false;
}

/**
 * method to validate alphanumeric
 * @param event
 * return string
 */
function validateAlphaNumeric(pharse)
{
	var rexp = /[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/;
	if(!rexp.test(pharse)) return true;
	else return false;
}

/**
 * method to validate number
 * @param pharse
 * @returns {Boolean}
 */
function validateNumbers(pharse)
{
	var rexp = /^[0-9]+$/;
	if(rexp.test(pharse)) return true;
	else return false;
}

/**
 * this method needs to be removed
 * @param evt
 * @param obj
 * @returns {Boolean}
 */
function checkOnlyNumbers(evt,obj) {
	if(!isNumberKey(evt)) return false;
}

function checkPasswordStrength(password) {
	var number = /([0-9])/;
	var capsalphabets = /([A-Z])/;
	var smallalphabets = /([a-z])/;
	var special_characters = /([~,!,@,$,%,^,&,(,),_,-,#,?,.,*,{,},|,',:,",;,=,+,`])/;
	if(password.length<8) {
		return false;
	} else if(!password.match(number) || !password.match(capsalphabets) || !password.match(smallalphabets) || !password.match(special_characters)
		|| (password.indexOf(',')>0) || (password.indexOf('>')>0) || (password.indexOf('<')>0) || (password.indexOf('/')>0)) {
		return false;
	} else {
		return true;
	}
}

/**
 * method to allow specific characters in textbox
 * @param event
 * return string
 */
function allowCharacter(event, characters)
{
	var character = String.fromCharCode(event.keyCode);
	if(characters.indexOf(","+character+",") < 0){
    	return false;
    } else {
    	return true;
	}
}

function haveDuplicateTextboxValues(classname) {
    var hasDuplicates = false;
    $('.'+classname).each(function () {
        var inputsWithSameValue = $(this).val();
        hasDuplicates = $('.'+classname).not(this).filter(function () {
            return $(this).val() === inputsWithSameValue;
        }).length > 0;
        if (hasDuplicates) return false;
    });
    return hasDuplicates;
}

function haveBlankTextboxValues(classname) {
    var hasblanks = false;
    $('.'+classname).each(function () {
        var txtlen = $(this).val().trim().length;
        if(txtlen == 0) hasblanks = true;
    });
    return hasblanks;
}

function haveSelectDefaultvalue(classname) {
    var hasblanks = false;
    $('.'+classname).each(function () {
        var txtlen = $(this).val();
        if(parseFloat(txtlen) == 0) hasblanks = true;
    });
    return hasblanks;
}

function haveSelectDefaultvalue(classname) {
    var hasblanks = false;
    $('.'+classname).each(function () {
        var txtlen = $(this).val();
        if(parseFloat(txtlen) == 0) hasblanks = true;
    });
    return hasblanks;
}

function haveTextOnlyAscii(classname) {
    var hasonlyascii = true;
    $('.'+classname).each(function () {
		var val = $(this).val();
        if(!stringcheckifnonascii(val)) hasonlyascii = false;
    });
    return hasonlyascii;
}
