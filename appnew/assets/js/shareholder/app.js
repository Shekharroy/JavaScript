/*
Author : Shakti
Version : 1.0
*/

/**
 * fetch hash value from key
 * @param key
 * returns string
 */

/*window.onbeforeunload = function(event)
{
	 return "Upon refresh from browser it will end your session. Do you wish to continue?";
};*/

/*$( window ).on('unload', function( event ) {
    confirm("Upon refresh from browser it will end your session. Do you wish to continue?");
});*/

function getHashValue(key)
{
  return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
}

/**
 * remove hash value
 */
function removeHash()
{
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

/**
 * method to invoke ondevice ready
 */
function onDeviceReady()
{
	console.log("check new cache test 2");
	language = window.navigator.userLanguage || window.navigator.language;
	selectedformat = formats[language.toLowerCase()];
	timezone = (jstz.determine()).name();

	cloudURLACTDomain = window.location.href;
	cloudURLACTDomain = cloudURLACTDomain.replace(cloudURLProtocol, "");
	cloudURLACTDomain = cloudURLACTDomain.substring(0, cloudURLACTDomain.indexOf("/"));
	cloudURLACT = cloudURLProtocol + cloudURLACTDomain;
	cloudApiUrlACMS = cloudURLProtocol + cloudURLACTDomain + "/api.acms";
	cloudApiUrlACMSServer = cloudURLProtocol + defaultServerDomain + "/api.acms.server";
	timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	document.addEventListener('click', function (e) {
		try{
			if (e.target.className.indexOf("noclick") >= 0) {
				e.preventDefault();
			}
		}catch(error){
		}
    });
}

/**
 * method to fetch the device related information from the url
 */
function fetchdeviceid(skde)
{
	//fetch the device id
	try{
		try
		{
			if(_tdfrt == ""){
				_tdfrt = localStorage._zy.toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			}
			clearauthinlocalstorage();
			var posturl = cloudURLACT + "/api.acms/" + loginURL;
			ajaxindicatorstart('loading data.. please wait..');
			localStorage.setItem("_zt", 1);
			devicetype = "desktop";
			var sm = {
				"userValidateDto":{
					"userName":"",
					"deviceId":_tdfrt
				},
				"deviceDto":{
					"token":skde,
					"regNew":"browser",
					"deviceType":devicetype,
					"deviceName":"Web Browser",
					"regNew":"browser",
					"deviceId":_tdfrt
				}
			};

			invokeAdapterCall("POST",posturl,"",sm ,"");
		}
		catch(error)
		{
			checkErrorPage(null);
			//alert("session closed this is bug is getting fixed...");
			/*var type = "GET";
			var posturl = "/api.acms/v1/admclient/getTime/callplugin";
			var extraparamjson = "";
			base64authheader = getauthtokenfromlocal();
			invokeAdapterCall(type,posturl,base64authheader,"",extraparamjson);*/
		}
	}catch(error){
		checkErrorPage(null);
		//alert("session closed this is bug is getting fixed...");
	}

	$(document).on('dragstart dragenter dragover', function(event) {
	    // Only file drag-n-drops allowed, http://jsfiddle.net/guYWx/16/
	    if ($.inArray('Files', event.originalEvent.dataTransfer.types) > -1) {
	        // Needed to allow effectAllowed, dropEffect to take effect
	        event.stopPropagation();
	        // Needed to allow effectAllowed, dropEffect to take effect
	        event.preventDefault();

	        $('.dropzone').addClass('dropzone-hilight').show();     // Hilight the drop zone
	        dropZoneVisible= true;

	        // http://www.html5rocks.com/en/tutorials/dnd/basics/
	        // http://api.jquery.com/category/events/event-object/
	        event.originalEvent.dataTransfer.effectAllowed= 'none';
	        event.originalEvent.dataTransfer.dropEffect= 'none';

	         // .dropzone .message
	        if($(event.target).hasClass('dropzone') || $(event.target).hasClass('message')) {
	            event.originalEvent.dataTransfer.effectAllowed= 'copyMove';
	            event.originalEvent.dataTransfer.dropEffect= 'move';
	        }
	    }
	}).on('drop dragleave dragend', function (event) {
	    dropZoneVisible= false;

	    dropZoneTimer= setTimeout( function(){
	        if( !dropZoneVisible ) {
	            $('.dropzone').hide().removeClass('dropzone-hilight');
	        }
	    }); // dropZoneHideDelay= 70, but anything above 50 is better
	});
}

function checkErrorPage(response){
	if((window.location.href).indexOf("/drive.html") > 0){
		if(loggedin == false){
			autoLoginCheck(response);
		} else if((response.messageCode == 429 || response.messageCode == 427 || response.messageCode == 424
				|| response.messageCode == 435 || response.messageCode == 419) && $("#divlogin").is(':visible')) {
			loginsuccess(response);
		} else {
			loginRemoveAccount(uniqueidentifieracclist(), false);
			clearauthinlocalstorage();
			window.location.href="error.html";
		}
	} else if(response.messageCode == 415){
		clearVariablesLoginScreen();
	} else {
		loginRemoveAccount(uniqueidentifieracclist(), false);
		clearauthinlocalstorage();
		window.location.href="error.html";
	}
}

/**
 * method to fix the unbind action event
 * @param	: obj
 */
function unbindobject(obj){
	$(obj).unbind( "click" );
	$(obj).unbind( "change" );
	$(obj).unbind( "tap" );
	$(obj).unbind( "keypress" );
	$(obj).unbind( "paste" );
	$(obj).unbind( "copy" );
	$(document).off('tap', obj);
	$(document).off('keyup', obj);
	$(document).off('keypress', obj);
	disablecopypaste();
	disablepasteonly();
}

/**
 * method to get time stamp in local from utc data like T Z format
 * @param	: datestring
 */
function getlocaltimestampfromutcdata(datestring)
{
	if(datestring != "")
	{
		var cloudlastupdated = Date.parse(datestring)- 7*60*60*1000;
		return cloudlastupdated;
	}
	else return 0;
}

/**
 * method to get date from timestamp
 * @param	: dt
 * @param	: boolshowtime
 */
function getdatefromtimestamp(dt,boolshowtime)
{
	var mn = convformats[language.toUpperCase()];
	try{
		var retdt = undefined;
		if(boolshowtime == undefined || boolshowtime == true) retdt = moment(new Date(dt)).format(mn + " hh:mm A");
		else if(boolshowtime != undefined && boolshowtime == false) retdt = moment(new Date(dt)).format(mn);
		if(retdt == "Invalid date")
		{
			return "";
		}
		return retdt;
	}catch(error){}
}

/**
 * method to check screen width and break text
 * @param	: desc
 */
function checkscreenwidthdesc(desc)
{
	if(screen.width < 500)
	{
		return breaktext(desc, 20);
	}
	else
	{
		return desc;
	}
}

/**
 * method to trim overflow characters
 * @param : string
 * return string
 */
function trimOverFlowCharacters(string, threshhold) {
	if(threshhold == undefined || threshhold == null){
		threshhold = 22;
	}
	if(string.length >threshhold) {
		 string = string.substring(0, threshhold) + "...";
		 return string;
	 } else {
		 return string;
	 }
}

/**
 * method to break text after certian numbmer of characters
 * @param	: msgtoconv
 * @param	: threshholdlen
 * return string
 */
function breaktext(msgtoconv, threshholdlen)
{
	var strret = "";
	while(msgtoconv.length > threshholdlen)
	{
		strret = strret + msgtoconv.substring(0, threshholdlen) +"<br/>";
		msgtoconv = msgtoconv.substring(threshholdlen+1);
	}
	strret = strret + " " + msgtoconv;
	return strret;

}

/**
 * method to hide busy indicator
 */
function hidebusyindicator()
{
	if(isMobile.any() == null || isMobile.any() == "null")
	{
		setTimeout($.unblockUI, 10);

	}
	else
	{
		try{busyInd.hide();}catch(error){}
	}
}

/**
 * method is used to store auth token in local storage
 */
function storeauthinlocalstorage(dataValue){
	if(typeof(Storage) !== "undefined")
	{
		localStorage.setItem("_zz", dataValue.tempAttr9);
		localStorage.setItem("_zx", base64authheader);
		localStorage.setItem("_zy", globalvariable.defaultemailid);
		localStorage.setItem("_zw", globalvariable.clientidlong);
		localStorage.setItem("_zu", dataValue.tempAttr2);
		localStorage.setItem("_zk", username);
		localStorage.setItem("_zv", dataValue.userId);
		localStorage.setItem("_zq", dataValue.id);
		localStorage.setItem("_zp", "0");
		localStorage.setItem("_zr", dataValue.tempAttr5);
		localStorage.setItem("_zh", dataValue.forceChangePass);
		localStorage.setItem("_za", dataValue.forceChangeNotif);

		CACHE_STORAGE_ID = base64auth;
		localStorage.setItem("_zo", globalvariable.lawfirmnameglobal);
		localStorage.setItem("_zs", dataValue.accType);
		localStorage.setItem("_zn", dataValue.userRole);

		var usermodes = dataValue.userModuleAcls;
		if(usermodes.includes(8)){
			localStorage.setItem("_zp", "1");
		}

		if(dataValue.corpModules != null) localStorage.setItem("_zmd", dataValue.corpModules.join());

		//admAddAccount(uniqueidentifieracclist());
	}
}

/**
 * method is used to fetch the auth token from local storage
 */
function getauthtokenfromlocal()
{
	if(navigator.cookieEnabled){
		if(typeof(Storage) !== "undefined") return localStorage._zx;
		return "";
	} else {
		admShowconfirmmsg("Please enable cookies to proceed.", confirm_Error, 5000, "", false, false);
	}
}

/**
 * method is used to fetch the client url from the local storage
 */
function getclienturlfromlocal()
{
	if(typeof(Storage) !== "undefined") return localStorage.apprightworklight;
	return "";
}

/**
 * method to fetch get clientid from local store
 */
function getauthtokenfromlocalclientid()
{
	if(typeof(Storage) !== "undefined") return localStorage._zw;
	return "";
}

var replaceurl2 = "http://localhost";
//var replaceurl1 = "http://52.249.185.78:35901";
//var replaceurl1 = "https://dcirrus.co.in";
//var replaceurl1 = "https://dcirrus.io";
var replaceurl1 = "http://localhost";
/**
 * method to call the adapter method to interact to api server
 * @param1	: Method type GET/POST/PUT/DELETE
 * @param2	: post url e.g /api.acms/v1/adm/index
 * @param3	: authentication token
 * @param4	: json input is required for method with inut else pass ""
 * @param5	: extrajsonparamneedtoreturned after callback
 */
function invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam){
	var contentType = "application/json";
	try{
		if(jsonextraparam != null && jsonextraparam != undefined && jsonextraparam != ""){
			if(jsonextraparam.downloadfile == "true"){
				contentType = jsonextraparam.contentType;
			}
		}
	}catch(error){}
	if(posturl.indexOf(cloudURLACTDomain) < 0 && posturl.indexOf("/checkCorporateDomainServiceAfte") < 0){
		posturl = cloudURLACT + posturl;
	}
	if(base64authheader != undefined && base64authheader != null && base64authheader != "" && base64authheader != "null" && base64authheader != "undefined") {

	} else {
		base64authheader = getauthtokenfromlocal();
	}

	//this is checked if login screen is active
	if(window.location.href.indexOf("/drive.html") > 0 && ($("#divlogin").is(':visible') && $("#password").val().trim().length > 0)
		&& posturl.indexOf("/app/uts/0/gen") < 0){
		base64authheader = "";
	}

	var invocationData = undefined;
	posturl = encodeURI(posturl);

	posturl = posturl.replace(replaceurl2, replaceurl1);

	if(jsoninout != undefined && jsoninout != null && jsoninout != "" && jsoninout != "null" && jsoninout != "undefined" && JSON.stringify(jsoninout) != JSON.stringify({})){
		if(base64authheader != undefined && base64authheader != null && base64authheader != "" && base64authheader != "null" && base64authheader != "undefined") {
			$.ajax({
				url: posturl,
				xhrFields: { withCredentials: true },
				data: JSON.stringify(jsoninout)+"",
				//cache: false,
				contentType: contentType,
				//processData: false,
				type: type,
				//timeout: 300000, // sets timeout in seconds
				beforeSend: function (xhr) {xhr.setRequestHeader ("Authorization",  "Bearer " + base64authheader);},
				success: function(response){

					response.extrajsonparam = jsonextraparam;
					apiServiceInteraction_Callback(response);
				},
				error: function(response){

					response.extrajsonparam = jsonextraparam;
					apiServiceInteraction_Callback_Error(response)
				}
			});
		} else {
			$.ajax({
				url: posturl,
				xhrFields: { withCredentials: true },
				data: JSON.stringify(jsoninout)+"",
				//cache: false,
				contentType: contentType,
				//processData: false,
				type: type,
				//timeout: 300000, // sets timeout in seconds
				success: function(response){

					response.extrajsonparam = jsonextraparam;
					apiServiceInteraction_Callback(response);
				},
				error: function(response){

					response.extrajsonparam = jsonextraparam;
					apiServiceInteraction_Callback_Error(response)
				}
			});
		}
	}
	else
	{
		if(base64authheader != undefined && base64authheader != null && base64authheader != "" && base64authheader != "null" && base64authheader != "undefined") {
			if(contentType == "application/json"){
				$.ajax({
					url: posturl,
					xhrFields: { withCredentials: true },
					//cache: false,
					contentType: contentType,
					//processData: false,
					type: type,
					//timeout: 300000, // sets timeout in seconds
					beforeSend: function (xhr) {xhr.setRequestHeader ("Authorization",  "Bearer " + base64authheader);},
					success: function(response){

						response.extrajsonparam = jsonextraparam;
						apiServiceInteraction_Callback(response);
					},
					error: function(response){

						response.extrajsonparam = jsonextraparam;
						apiServiceInteraction_Callback_Error(response)
					}
				});
			} else {
				$.ajax({
					url: posturl,
					xhrFields: { withCredentials: true },
					//cache: false,
					contentType: "application/x-www-form-urlencoded",
					//processData: false,
					type: type,
					//responseType:"arraybuffer",
					//timeout: 300000, // sets timeout in seconds
					beforeSend: function (xhr) {xhr.setRequestHeader ("Authorization",  "Bearer " + base64authheader);},
					success: function(response){
						//response.extrajsonparam = jsonextraparam;
						//apiServiceInteraction_Callback(response);
						//download(response, currentfilenamedownload, "application/zip")
					},
					error: function(response){

						response.extrajsonparam = jsonextraparam;
						apiServiceInteraction_Callback_Error(response)
					}
				});
			}
		} else {
			$.ajax({
				url: posturl,
				xhrFields: { withCredentials: true },
				//cache: false,
				contentType: contentType,
				//processData: false,
				type: type,
				//timeout: 300000, // sets timeout in seconds
				success: function(response){

					response.extrajsonparam = jsonextraparam;
					apiServiceInteraction_Callback(response);
				},
				error: function(response){

					response.extrajsonparam = jsonextraparam;
					apiServiceInteraction_Callback_Error(response)
				}
			});
		}
	}
}

const downloadFile = (() => {
  const a = document.createElement('a');
  a.style = 'display: none';
  document.body.appendChild(a);

  return (data, fileName, type = 'octet/stream') => {
    const blob = new Blob([data], { type });

    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(blob, fileName);
    }

    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  };
})();

/**
 * call back method after adapter call
 * gets the method to invoked and calls the corresponding local method
 * method to be invoked = response.invocationResult.action
 */
function apiServiceInteraction_Callback(response){
	if(response != null && response != undefined){
		var data = response;
		if(response.objectD == undefined) data.objectD = data.object;
		else if(response.object == undefined) data.object = data.objectD;

		data.statusCode = data.messageCode + "";
		var responsecode = data.messageCode + "";

		var filedownload = false;
		try{
			if(currentfilenamedownload.length>0){
				filedownload = true;
				downloadFile(data, currentfilenamedownload, currentdownloadtype);
				currentfilenamedownload = "";
				ajaxindicatorstop();

			}
		}catch(error){}

		if(!filedownload){
			if((window.location.href).indexOf("/forgotpassword.html") > 0 && responsecode == "420"){
				showMessageErrorLogin(login_messages.userblocked, confirm_Error, true);
				ajaxindicatorstop();
				setTimeout(function(){ location.reload(true); }, 500);
			}
			else if((window.location.href).indexOf("/forgotpassword.html") > 0 && responsecode == "419"){
				showMessageErrorLogin(login_messages.usernotactivateforgotpassword, confirm_Error, true);
				ajaxindicatorstop();
				setTimeout(function(){ location.reload(true); }, 3000);
			}
			else if(responsecode == "429" || responsecode == "427" || responsecode == "415" || responsecode == "416" || responsecode == "417" || responsecode == "420" || responsecode == "422" || responsecode == "423" || responsecode == "428" || responsecode == "435")
			{
				checkErrorPage(data);
				//alert("session closed this is bug is getting fixed...");
			}
			else if(responsecode == "432" || responsecode == "434")
			{
				window[data.action](data);
			}
			else if(responsecode == "433" && (getauthtokenfromlocal() == "" || getauthtokenfromlocal() == undefined))
			{
				window[data.action](data);
			}
			else if(responsecode == "433" && getauthtokenfromlocal() != "")
			{
				ajaxindicatorstop();
				$("#password").val("");
				admProviderSelectEvent();
				showMessageErrorLogin(login_messages.corpsetupforcecomplete, confirm_Error, false);
				showActionPopup("updatestoragemodal");
			}
			else if(responsecode == "500")
			{
				window[data.action](data);
			}
			else if(responsecode == "419")
			{
				checkErrorPage(data);
			}
			else if(responsecode == "418")
			{
				window[data.action](data);
			}
			else if(data.statusCode == "200" || data.statusCode == "201" || data.statusCode == "202" || data.statusCode == "0")
			{
				var mk = currentservicemethodafter;
				currentservicemethodafter = "";
				if(mk.length > 0){
					window[mk](data);
				} else {
					window[data.action](data);
				}
			}
			else if(data.statusCode == "421")
			{
				if(window.location.href.indexOf("/drive.html") > 0) {
					checkErrorPage(data);
				}
			}
			else if(data.statusCode == "424")
			{
				if(window.location.href.indexOf("/drive.html") > 0) {
					checkErrorPage(data);
				}
			}
			else if(data.statusCode == "425" || data.statusCode == "426" || responsecode == "431")
			{
				window[data.action](data);
			}
			else if(data.statusCode == 436){
				if((window.location.href).indexOf("forum.html") >= 0) forumShowconfirmmsg(global_messages.modulepermdenied + " Forum", confirm_Error, 5000, "", false, false);
			} else {
				indexeddatafetchdone = true;
				notindexeddatafetchdone = true;
				hidebusyindicator();
			}
		}
	}
	else
	{
		indexeddatafetchdone = true;
		notindexeddatafetchdone = true;
		hidebusyindicator();
	}
}

/**
 * call back method after adapter call
 * gets the method to invoked and calls the corresponding local method
 * method to be invoked = response.invocationResult.action
 */
function apiServiceInteraction_Callback_Error(response)
{
	try{
		hideRefreshLoading();
	}catch(error){

	}
	reloadDataDashBoardFlag = true;
	isThreadRunning = 0;

	try{
		ajaxindicatorstop();
		if(response.status == 400 || response.status == 404){
			checkErrorPage(response);
		} else if(response.status == 500 && currentservicemethodafter == "fetchAllAdmFolderListResponse"){
			autoLoginCheck(response);
		} else if(response.status == 0 || response.status == 503){
			try{
				$('body').topAlertjs({
					type: confirm_Error,
					message: "Server is not reachable. Please check your internet connection and try again later.",
					close: true,
					duration: 10
				});
				$(".rowdropdownmenu").removeClass("show");
				response.extrajsonparam.nointernetexists=true;
				window[response.extrajsonparam.nointernet](response.extrajsonparam);
			}catch(error){}
		}
	}
	catch(error){}
}

/**
 * method to get local worklight server url
 * @param	: clientid
 */
function getlocalworklightserverurlACMS(clientid)
{
 	if(clientid != "")
 	{
  		var url = cloudApiUrl.replace("{clientId}",clientid);
		displaybusyindicator(Messages.dashboard_waitWhileCheckingCredentials);
  		$.ajax({
   			url: url,
   			cache: false,
   			contentType: "application/json",
   			processData: false,
   			type: "GET",
   			timeout: 10000,
   			success: function(data){
    			if(data != undefined && data.worklightServerUrl != "")
    			{
     				remoteaddress = data.clientIP;
     				data.worklightServerUrl = worklightServerUrl;
    			}
    			else
    			{
     				hidebusyindicator();
     				showconfirmmsgmain(data.message, confirm_Error, 5000, "");
    			}
   			},
   			error: function(error){
    			hidebusyindicator();
    		}
  		});
 	}
}

/**
 * method to generate random number
 */
function generateRandomNumber(){
	return Math.random();
}

/**
 * method to check extension image and return correct image file url
 * @param fileExtension
 * @returns {String}
 */
function checkFileExtention(fileExtension)
{
	imageName="docfile_Cls";
	//var fileExtension=fileExten.toLowerCase();
	try{
	 if(fileExtension.toLowerCase()=='pdf'){
		  imageName="pdffile_Cls";
	  }else if(fileExtension.toLowerCase()=='ppt' || fileExtension.toLowerCase()=='pptx'){
		  imageName="powerpoint_Cls";
	  }else if(fileExtension.toLowerCase()=='doc' || fileExtension.toLowerCase()=='docx'){
		  imageName="wordfile_Cls";
	  }else if(fileExtension.toLowerCase() == "xls" || fileExtension.toLowerCase() == "xlsx"){
		  imageName="xlsfile_Cls";
	  }
	  else if(fileExtension.toLowerCase() == "txt"){
		  imageName="textfile_Cls";
	  }
	  else if(fileExtension.toLowerCase()=='gif' || fileExtension.toLowerCase()=='jpeg' || fileExtension.toLowerCase()=='png' || fileExtension.toLowerCase()=='x-png' || fileExtension.toLowerCase()=='jpg')
	  {
		  imageName="imgfile_Cls";
	  }
	  else
	  {
		  imageName="docfile_Cls";
	  }
  }catch(error){}
	 return imageName;
}

/**
 * method to check viewer compatible
 * @param fileExtension
 * @returns {Boolean}
 */
function checkViewerExtention(fileExtension, size){
	if(size > 5368709120) return false;
	if(fileExtension != null && (fileExtension.toLowerCase()=='pdf' || fileExtension.toLowerCase()=='ppt' || fileExtension.toLowerCase()=='pptx'
		|| fileExtension.toLowerCase()=='doc' || fileExtension.toLowerCase()=='docx' || fileExtension.toLowerCase() == "xls"
		|| fileExtension.toLowerCase() == "xlsx" || fileExtension.toLowerCase() == "csv" || fileExtension.toLowerCase() == "txt"
		|| fileExtension.toLowerCase()=='gif' || fileExtension.toLowerCase()=='jpeg' || fileExtension.toLowerCase()=='png'
		|| fileExtension.toLowerCase()=='jpg' || fileExtension.toLowerCase()=='tiff' || fileExtension.toLowerCase()=='tif'
		|| fileExtension.toLowerCase()=='eml' || fileExtension.toLowerCase()=='msg'	|| fileExtension.toLowerCase()=='js'
  		|| fileExtension.toLowerCase()=='docm' || fileExtension.toLowerCase()=='pptm' || fileExtension.toLowerCase() == "xml"
		|| fileExtension.toLowerCase() == "bmp" || fileExtension.toLowerCase()=='rtf'))
		return true;
  	else return false;
  	return true;
}

function initDatePicker(){
	//$("#importdate").Zebra_DatePicker();
	$('#importdate').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#dateBetweenFromId').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#dateBetweenToId').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#bucketFileDateId').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#autoReplyStartDate').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#autoReplyEndDate').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});

	//index pop up date
	$('#indexDocumentDate').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#casedetailscasefilingdateedit').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#casedetailscaseoriginationdateedit').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('#casedetailscasemeaningfulldateedit').Zebra_DatePicker({
		  dtformat: 'm/d/Y'
	});
	$('.Zebra_DatePicker_Icon').bind("click", function(e) { // enter key code is 13
		$('.Zebra_DatePicker').show();
	});
}

/*
 * used to check file size or image size
 */
function checkFileSize(size)
{
	if(size<=2000000)
		return true;
	else
		return false;
}

/**
 * method to check the file type if image
 * @param filename
 * @returns {Boolean}
 */
function checkFileTypeImage(filename){
	var extension = filename.substring(filename.lastIndexOf(".")+1);
	extension = extension.toLowerCase();
	if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "bmp" || extension == "tif" || extension == "gif" || extension == "jpe") return true;
	return false;
}

/**
 * method to convert date to US Format
 * @param dateVal
 * @returns
 */
function formatDateLocale() {
	var d = new Date();
	return d.toLocaleString();
}

/**
 * Method to format date to API server format
 * @param : obj
 */
function FormatDateToServer(val, time) {
	var returnDate = "";
	if(val !=""){
		if(time == true) returnDate = moment(val).format('YYYY-MM-DD HH:MM');
		else returnDate = moment(val).format('YYYY-MM-DD');
		returnDate = formatAddTZDate(returnDate, time);
	}
	return returnDate;
}

/**
 * method to convert date to US Format
 * @param dateVal
 * @returns
 */
function formatDateUSWithOffset(dateVal, timepresent) {
	var formatUSg = "MM/DD/YYYY";
	var rettime = "";
	if(timepresent) {
		rettime = dateVal.substring(dateVal.indexOf(" ")+1);
		rettime = " " + convertTo12HourFormat(rettime);
		dateVal = dateVal.substring(0, dateVal.indexOf(" "));
	}
	if(dateVal !="") return dateVal = moment(dateVal).format(formatUSg) + rettime;
	return "";
}

function formatAddTZDate(dt, timepresenet){
	var rettime = "00:00";
	if(timepresenet){
		rettime = dt.substring(dt.indexOf(" ")+1);
		dt = dt.substring(0, dt.indexOf(" "));
	}
	dt = moment(dt).format("YYYY-MM-DD");
	dt = dt + "T" + rettime + ":00Z";
	return dt;
}

function formatUpdateTZDate(dt, timepresenet){
	if(timepresenet){
		dt = dt.replace("T", " ");
		dt = dt.substring(0, dt.lastIndexOf(":"));
	}else{
		dt = dt.substring(0, dt.indexOf("T"));
	}
	dt=formatDateUS(dt, timepresenet);

	if(timepresenet){
		var time = dt.substring(dt.indexOf(" ")+1);
		var rettime = convertTo12HourFormat(time);
		dt = dt.substring(0, dt.indexOf(" ")) + " " + rettime;
	}

	return dt;
}

/*
 * Function used to convert image or document to base64 formate.
 */
function base64ArrayBufferACMS(arrayBuffer) {
	  var base64    = ''
	  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

	  var bytes         = new Uint8Array(arrayBuffer)
	  var byteLength    = bytes.byteLength
	  var byteRemainder = byteLength % 3
	  var mainLength    = byteLength - byteRemainder

	  var a, b, c, d
	  var chunk

	  // Main loop deals with bytes in chunks of 3
	  for (var i = 0; i < mainLength; i = i + 3) {
	    // Combine the three bytes into a single integer
	    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

	    // Use bitmasks to extract 6-bit segments from the triplet
	    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
	    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
	    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
	    d = chunk & 63               // 63       = 2^6 - 1

	    // Convert the raw binary segments to the appropriate ASCII encoding
	    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
	  }

	  // Deal with the remaining bytes and padding
	  if (byteRemainder == 1) {
	    chunk = bytes[mainLength]

	    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

	    // Set the 4 least significant bits to zero
	    b = (chunk & 3)   << 4 // 3   = 2^2 - 1

	    base64 += encodings[a] + encodings[b] + '=='
	  } else if (byteRemainder == 2) {
	    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

	    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
	    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

	    // Set the 2 least significant bits to zero
	    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

	    base64 += encodings[a] + encodings[b] + encodings[c] + '='
	  }

	  return base64;
}


/*
 * function used to show native calender to user.
 */
function openAndroidNativeCalender(inputIdForDate) {
	var myNewDate = Date.parse($("#"+inputIdForDate).val()) || new Date();
	if (typeof myNewDate === "number") {
		myNewDate = new Date(myNewDate);
	}
	window.plugins.datePicker.show({
		date : myNewDate,
		mode : "date",
	}, function(returnDate) {
		if (returnDate !== "") {
			var newDate = new Date(returnDate);
			$("#"+inputIdForDate).val(getFormattedDate(newDate));
		}

	});
}

/*
 * function used to show formated date to user.
 */
function getFormattedDate(date) {
	var dayVal = getDayName(parseInt(date.getDay(), 10));
	// var month = getMonthName(parseInt(date.getMonth(), 10));
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (day <= 9) {
		day = "0" + day;
	}
	if (month <= 9) {
		month = "0" + month;
	}
	var year = date.getFullYear();
	// return (dayVal + ", " + month + " " + day + ", " + year);
//	return (year + "-" + month + "-" + day);
	return (month + "/" + day + "/" + year);
}

/*
 * function used to show month calender to user.
 */
function getMonthName(month) {
	var monthName = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
			"Sep", "Oct", "Nov", "Dec" ];
	return monthName[month];
}

/*
 * function used to show day calender to user.
 */
function getDayName(day) {
	var dayName = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
	return dayName[day];
}

/**
 * method to convert to 24 hour format
 * @param time
 * @returns {String}
 */
function convertTo24HourFormat(time){
	var hours = Number(time.match(/^(\d\d?)/)[1]);
    var minutes = Number(time.match(/:(\d\d?)/)[1]);
    if ((time.indexOf("PM") >= 0 || time.indexOf("pm") >= 0) && hours<12)
    {
        hours = hours+12;
    }
    else if ((time.indexOf("AM") >= 0 || time.indexOf("am") >= 0)  && hours==12)
    {
        hours = hours-12;
    }

    var sHours = hours.toString();
    var sMinutes = minutes.toString();

    if(hours<10)
    {
        sHours = "0" + sHours;
    }
    else if(minutes<10) {
        sMinutes = "0" + sMinutes;
    }

    return (sHours + ":" + sMinutes);
}

/**
 * method to convert time to 12 hour format
 * @param time
 * @returns String
 */
function convertTo12HourFormat(time) {
	  // Check correct time format and split into components
	  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	  if (time.length > 1) { // If time format correct
	    time = time.slice (1);  // Remove full string match value
	    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
	    time[0] = +time[0] % 12 || 12; // Adjust hours
	    if((time[0]+"").length == 1) time[0] = "0" + time[0];
	    if((time[2]+"").length == 1) time[2] = "0" + time[2];
	  }
	  var timestr = time.join ('');
	  return timestr;
}

/**
 * get time for date in am/pm format
 * @param date
 * @returns {String}
 */
function formatAMPM12Hour(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'PM' : 'AM';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
	}

/**
 * method to convert minutes to hour and minutes
 * @param minutes
 * @returns {String}
 */
function convertToHoursMinutes(minutes){
	var hours = (Math.floor(minutes / 60))+"";
	if(hours.length == 1) hours = "0" + hours;
    minutes = (minutes % 60)+"";
    if(minutes.length == 1) minutes = "0" + minutes;
    return (hours + ":" + minutes);
}

/**
 * method to get file size units
 * @param bytes
 * @returns {String}
 */
function formatSizeUnits(bytes){
		if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
        else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
        else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
        else if (bytes>1)           {bytes=bytes+' bytes';}
        else if (bytes==1)          {bytes=bytes+' byte';}
        else                        {bytes='0 byte';}
        return bytes;
}

/**
 * method to block a div
 * @param divId
 */
function divRotateProgress(divId){
	$('#'+divId).block({
		message:'',
		css: {
			backgroundColor:'#ff0000',
			opacity: .9,
			filter:"alpha(opacity=90)",
			border:'none',
			width:'90%'
		}
	});
}

/**
 * method to unlock the dev
 * @param divId
 */
function divHideProgress(divId) {
	  $('#'+divId).unblock();
}

/**
 * method to hide back icon for desktop
 * @param divId
 */
function hideBackIconForMobile(divId){
	//hide the back icon except desktop
	if(isMobile.any() == null || isMobile.any() == "null") $("#"+divId).hide();
}

/**
 * method to add days to date
 */
function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

/**
 * method to add days to date
 */
function addMinutes(theDate, minutes) {
	theDate.setMinutes (theDate.getMinutes()+minutes);
	theDate.setMinutes (theDate.getMinutes()+30);
	theDate.setHours (theDate.getHours()+9);
    return theDate;
}

/**
 * method to fetch selected box value
 * @param id
 */
function fetchSelectedBoxValue(id){
	var optionSelected = $("#"+id).find('option:selected');
	return optionSelected.val();
}

/**
 * method to define div resizable
 * @param divId
 */
function divReizable(divId){
	$("#"+divId).resizable({handles: "n, e, s, w, ne, se, sw, nw"});
}

/**
 * method to define div draggable
 * @param divId
 */
function divDraggable(divId){
	//$("#"+divId).draggable({cursor:'move'});
}

/**
 * method to get data attribute from element
 * @param id
 * @param attributeName
 * @returns
 */
function getDataAttributeValue(id, attributeName){
	return document.getElementById(id).getAttribute(attributeName);
}

/**
 * method to set attribute value
 * @param id
 * @param attributeName
 * @param attributeValue
 */
function setDataAttributeValue(id, attributeName, attributeValue){
	$("#"+id).attr(attributeName, attributeValue);
}

/**
 * variable defining the sort format
 */
var sort_by = function(field, reverse, primer){
	var key = primer ?
	function(x){
   		return primer(x[field]);
   	}:function(x){
   		return x[field];
   	};
	reverse = !reverse ? 1 : -1;
	return function (a, b) {
		return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	};
};

function mergeSort (arr, attribute, proptype, direction) {
    if (arr.length < 2) return arr;
    var mid = Math.floor(arr.length /2);
    var subLeft = mergeSort(arr.slice(0,mid), attribute, proptype, direction);
    var subRight = mergeSort(arr.slice(mid), attribute, proptype, direction);

    return merge(subLeft, subRight, attribute, proptype, direction);
}

function merge (a, b, attribute, proptype, direction) {
    var result = [];
    while (a.length >0 && b.length >0){
    	if(direction) {
	    	if(proptype == "number") result.push(a[0][attribute] > b[0][attribute]? a.shift() : b.shift());
	    	else result.push((a[0][attribute]+"").toUpperCase() < (b[0][attribute]+"").toUpperCase()? a.shift() : b.shift());
    	} else {
    		if(proptype == "number") result.push(a[0][attribute] < b[0][attribute]? a.shift() : b.shift());
	    	else result.push((a[0][attribute]+"").toUpperCase() > (b[0][attribute]+"").toUpperCase()? a.shift() : b.shift());
    	}
    }
    return result.concat(a.length? a : b);
}

/**
 * method to sort json by attribute
 * @param data
 * @param prop
 * @param direction
 * @param proptype
 * @returns
 */
function sortJSONByAttribute(data, prop, direction, proptype){

 	if(proptype == "number"){


  		//data.sort(sort_by(prop, direction, parseInt));
 	} else{
  		/*data.sort(sort_by(prop, direction, function(a){
   			if( a == null || a == undefined) return "";
   			else return a.toUpperCase().replace(" ", "");
  		}));*/
 	}

 	data = mergeSort (data, prop, proptype, direction);

 	return data;
}

const alphaNumericSort = (arr = []) => {
   	const sorter = (a, b) => {
		const isNumber = (v) => (+v).toString() === v;

		if(sortfieldnm.length > 0) {
			if(sortfieldnm == "folderPathLastChild" && admindexpresent){
				a = a["folderIndex"] + "-" + a[sortfieldnm];
				b = b["folderIndex"] + "-" + b[sortfieldnm];
			} else if(sortfieldnm == "fileName" && admindexpresent){
				a = a["fileIndex"] + "-" + a[sortfieldnm];
				b = b["fileIndex"] + "-" + b[sortfieldnm];
			} else {
				a = a[sortfieldnm]+"";
				b = b[sortfieldnm]+"";
			}
		}

		if(a != null && b != null && a.length > 0 && b.length > 0){
			if(sortfieldnm == "fileLastModifiedDate"){
				a = getlocaltimestampfromutcdata(a)+"";
				b = getlocaltimestampfromutcdata(b)+"";
			}

			const aPart = a.match(/\d+|\D+/g);
			const bPart = b.match(/\d+|\D+/g);
			let i = 0; let len = Math.min(aPart.length, bPart.length);
			while (i < len && aPart[i] === bPart[i]) { i++; };
				if (i === len) {
					return (aPart.length - bPart.length) * sortorder;
			};
			if (isNumber(aPart[i]) && isNumber(bPart[i])) {
				return (aPart[i] - bPart[i]) * sortorder;
			};
			return aPart[i].localeCompare(bPart[i]) * sortorder;
		} else {
			return 0;
		}
	};
	datatosort.sort(sorter);
};

/**
 * method to set fav icon
 * @param iconname
 */
function setFavIconApp(iconname, doctitle){
	document.title = doctitle;
	$('#favicon').remove();
	$('#faviconie').remove();
    	$('head').append('<link href="images/'+iconname+'" id="favicon" rel="shortcut icon">');
    	$('head').append('<link rel="shortcut icon" type="image/x-icon" href="images/'+iconname+'"  id="faviconie"/>');
    	try{
    		$("link[rel='shortcut icon'").attr("href","images/"+iconname);
    	}catch(error){
    	}
    	try{
	   	$("link[rel='shortcut icon'").attr("href","images/"+iconname);
	}catch(error){
    	}

}

/**
 * method to check the time fields inputs
 * @param evt
 * @returns {Boolean}
 */
function caseCheckValidTime(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((isNumberKey(evt) && charCode != 46) || charCode == 58)
		return true;
	else
		return false;
}



/**
 * method to highlight text according to class
 * @param classname
 * @param text
 */
function highlightText(classname, text){
	$("."+classname).highlight(text);
}

/**
 * method ot remove highlight
 * @param classname
 */
function removehighlightText(classname){
	$("."+classname).removeHighlight();
}

/**
 * method to search text in json array
 * @param json
 * @param search
 */
function searchJSON(json, attribute, searchtext){
	var vm = undefined;
	$.each(json, function(i, v) {
        if (v[attribute] == searchtext) {
            vm = v;
            if(vm.apprightjsonindex == undefined){
    			vm["apprightjsonindex"] = i;
    		} else {
    			vm.apprightjsonindex = i;
    		}
            return vm;
        }
    });
	return vm;
}

/**
 * method to search text in json array
 * @param json
 * @param search
 */
function searchJSONExactMatchLowerCase(json, attribute, searchtext){
	var vm = undefined;
	$.each(json, function(i, v) {
		searchtext = searchtext.toLowerCase();
		var searchtextattribute = (v[attribute]).toLowerCase();
        if (searchtextattribute == searchtext) {
            vm = v;
            if(vm.apprightjsonindex == undefined){
    			vm["apprightjsonindex"] = i;
    		} else {
    			vm.apprightjsonindex = i;
    		}
            return vm;
        }
    });
	return vm;
}

/**
 * method to search text in json array
 * @param json
 * @param search
 */
function searchJSONLowerCaseMatch(json, attribute, searchtext){
	var vm = new Array();
	$.each(json, function(i, v) {
		var va = (v[attribute]+"").toLowerCase();
		var vs = searchtext.toLowerCase();
        if (va.indexOf(vs) == 0) vm.push(v);
    });
	return vm;
}

/**
 * method to search text in json array for multiple attributes and matches both sides
 * @param json
 * @param attribute array([0] = attribute#value)
 */
function searchJSONLowerCaseMatchMultiple(json, attribute){
	var vm = new Array();
	$.each(json, function(i, v) {
		var found = true;
		for(var j=0;j<=attribute.length-1;j++){
			var attrarr = attribute[j].split("<#HASH;>");
			var attr = attrarr[0];
			var datatype = attrarr[1];
			var searchtext = attrarr[2];
			var va = (v[attr]+"").toLowerCase();
			var vs = searchtext.toLowerCase();
			if(datatype == "string" &&  va.indexOf(vs) < 0) {
				found = false;
			} else if(datatype == "number"){
				va = parseFloat(va);
				vs = parseFloat(vs);
				if(va > vs) found = false;
			}
		}
		if(found == true) vm.push(v);
    });
	return vm;
}

/**
 * method to update json object after update
 * @param objId
 * @param jsonObj
 * @param attribute
 * @param newvalue
 * @returns
 */
function updateSortJSON(objId, jsonObj, attribute, newvalue){
	var dataId = document.getElementById(objId).getAttribute("data-id");
	var vk = searchJSON(jsonObj, "id", dataId);
	if(vk != undefined){
		var indexupdate = vk.apprightjsonindex;
		var vl = jsonObj[indexupdate];
		vl[attribute] = newvalue;
		jsonObj[indexupdate] = vl;
	}
	return jsonObj;
}

/**
 * method to update json object after delete row
 * @param objId
 * @param jsonObj
 * @param attribute
 * @returns
 */
function deleteSortJSON(objId, jsonObj){
	var dataId = document.getElementById(objId).getAttribute("data-id");
	var vk = searchJSON(jsonObj, "id", dataId);
	if(vk != undefined){
		var indexdelete = vk.apprightjsonindex;
		jsonObj.splice(indexdelete, 1);
	}
	return jsonObj;
}

function checkkeyDownDataUserId(targetobjid, descobjid){
	if(document.getElementById(descobjid).getAttribute("data-userid") != undefined){
		$("#"+targetobjid).attr("data-userid", document.getElementById(descobjid).getAttribute("data-userid"));
	}
}

function checkkeyDownDataCaseId(targetobjid, descobjid){
	if(document.getElementById(descobjid).getAttribute("data-case") != undefined){
		$("#"+targetobjid).attr("data-case", document.getElementById(descobjid).getAttribute("data-case"));
	}

	if(document.getElementById(descobjid).getAttribute("data-caseid") != undefined){
		$("#"+targetobjid).attr("data-caseid", document.getElementById(descobjid).getAttribute("data-caseid"));
	}
}

function searchBlankCaseJSON(){
	var jsoninput ={
			name : "",
			caseStatus: 0,
			caseType: 0,
			};
	return jsoninput;
}

function replacenullval(val){
	if(val == null || val == undefined || val.toLowerCase() == "null" || val.toLowerCase() == "undefined") return "";
	else return val;
}

/**
 * method to open viewer in new window
 */
function openDocumentViewerInNewWindow(){
	document.getElementById("xsw").click();
}

function closeAllPopupOnCLickOutside(){
	$('html').click(function(e){

	});
}

/**
 * method to display tree objects
 */
function admDisplayLeftPanelObjects(treecls){
	if(treecls == null || treecls == undefined || treecls == "null" || treecls == "") treecls = "tree";
	$( '.'+treecls+' li' ).each( function() {
		if( $( this ).children( 'ul' ).length > 0 ) {
			$( this ).addClass( 'parent' );
		}
	});

	$( '.'+treecls+' li.parent > a' ).click( function( ) {
		$( this ).parent().toggleClass( 'active' );
		$( this ).parent().children( 'ul' ).slideToggle( 'fast' );
	});
}

/**
 * method to make input value blank
 * @param objid
 */
function makeInputBlank(objid){
	$("#"+objid).val("");
}

/**
 * method to formast phone number for display
 * @param P3
 * @param P4
 * @returns
 */
function formatPhoneNumber(P3, P4){
	P4 = P4.replace(/[{()}-]/g, '');
	if(P3 =="" || P3 ==0){
		if((P4).length<7 || (P4.length>7 && (P4).length<10)){
			return false;
		} else if(P4.length==7 || P4.length==10){
			if((P4).length==7) {
				P4="(___)" + P4.substr(0,3)+"-"+P4.substr(3);
				return P4;
			} else {
				P4="(" + P4.substr(0,3)+")("+ P4.substr(3,3)+"-"+P4.substr(6)+")";
				return P4;
			}
		}
	} else if(P3==1) {
		if((P4).length<10 || P4.length>10) {
			return false;
		} else if((P4).length==10) {
			P4="(" + P4.substr(0,3)+")("+ P4.substr(3,3)+"-"+P4.substr(6)+")";
			return P4;
		}
	} else if(P3>1) {
		if(P4.length<=10) {
			return P4;
		} else {
			return false;
		}
	}
}

/**
 * set default selectedindex
 * @param selectid
 * @param selectedval
 */
function setSelectBoxByVal(selectid, selectedval){
	 var el = $('#'+selectid);
	 // Select the relevant option, de-select any others
	 el.val(selectedval).attr('selected', true).siblings('option').removeAttr('selected');
	 // Initialize the selectmenu
	 //el.selectmenu();
	 try{
		 // jQM refresh
		 el.selectmenu("refresh", true);
	 }catch(error){
		 // Initialize the selectmenu
		 el.selectmenu();
		 // jQM refresh
		 el.selectmenu("refresh", true);
	 }
}

/**
 * Time duration delay for the key press event
 */
$.fn.delayKeyup = function(callback, ms){
    var timer = 0;
    var el = $(this);
    $(this).keyup(function(event){
    	if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 9) return false;
    	clearTimeout (timer);
    	timer = setTimeout(function(){
    		callback(el);
        }, ms);
    });
    return $(this);
};

/**
* method to destroy zebra date picker
*/
function destroyDatePicker(objid){
	var zdp = $('#'+objid).data('Zebra_DatePicker');
	zdp.destroy();
}

/**
 * method to remove highlight from text in one cell
 * @param descVal
 * @returns
 */
function removeHighlightCellText(descVal){
	if(descVal.indexOf("highlight") >= 0) {
		descVal = descVal.replace(/<span class=\"highlight\">/g, "");
		descVal = descVal.replace(/<\/span>/g, "");
	}
	return descVal;
}

/**
 * method to allow certain character in dateicker
 * allows A,a,P,p,m, M, space,/ and numbers
 * @returns {Boolean}
 */
function allowDatePickerCharacter(event){
	if(event.keyCode == 13 || event.keyCode == 97 || event.keyCode == 65 || event.keyCode == 80 || event.keyCode == 112
			|| event.keyCode == 32 || event.keyCode == 77 || event.keyCode == 109  || event.keyCode == 58 || event.keyCode == 47
			|| (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 191 || event.keyCode == 8 || event.keyCode == 186 ||  event.keyCode == 9){
		return true;
	}else{
		return false;
	}
}

/**
 * method to reset sorting icons for all modules
 */
function resetSortingIcons(){
	$(".shorting_1_Cls").addClass("shorting_Cls");
	$(".shorting_Cls").removeClass("shorting_1_Cls");
}

/**
 * method to check if event ley code is number only
 * @param event
 */
function allowNumbers(event){
	if(event.keyCode >= 48 && event.keyCode <= 57) return true;
	else return false;
}

function slideUpSuggestion(){
	$(".drp_downscroll").slideUp();
}

function scrollevent(){
	$('html').scroll(function() {
		$("#"+doc_browse_update).hide();
		$("#"+doc_browse_update_upload).hide();
	});
}

/**
 * method ot validate date only
 * @param input
 * @returns {Boolean}
 */
function checkValidateDateOnly(input){
	var validformat=/^\d{2}\/\d{2}\/\d{4}$/; //Basic check for format validity
	if (!validformat.test(input)) {
		return false;
	} else {
		var monthfield=input.split("/")[0];
		var dayfield=input.split("/")[1];
		var yearfield=input.split("/")[2];
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
			return false;
		else
			return true;
	}
	return false;
}

/**
 * method to export to excel
 * @param excelnm
 * @param content
 */
function exportToExcelFile(excelnm, content){
	var txtArea1 = document.getElementById('txtArea1');
	txtArea1.contentWindow.document.open("txt/html","replace");
	txtArea1.contentWindow.document.write(content);
	txtArea1.contentWindow.document.close();
	txtArea1.contentWindow.focus();
	txtArea1.contentWindow.document.execCommand("SaveAs", true, excelnm);
}

/**
 * method to get date in TZ format from timestamp
 * @param timestamp
 * @returns {String}
 */
function getDateFromTimestamp(timestamp){
	if((timestamp+"").length == 10) timestamp = timestamp * 1000;
	if((timestamp+"").length < 13) return "";
	var a = new Date(timestamp);
	//var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = a.getMonth()+1;
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	//var sec = a.getSeconds();
	var time = year + '-' + month + '-' + date + 'T' + hour + ':' + min + ':00Z';
	return time;
}

/**
 * method to return date in TZ format from real date object
 * @param dataobj
 * @returns {String}
 */
function getDateFormatFromNormalDatObject(dataobj){
	var yyyy = dataobj.getFullYear().toString();
	var mm = (dataobj.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = dataobj.getDate().toString();
	var hour = dataobj.getHours();
	var min = dataobj.getMinutes();
	return (yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + 'T' + hour + ':' + min + ':00Z');
}

function ajaxindicatorstart(text)
{
	if($('body').find('#resultLoading').attr('id') != 'resultLoading'){
		$('body').append('<div id="resultLoading" style="display:none"><div class ="refresh_loding_cls"><img src="assets\/img\/acms_loading.gif"><div id="pageloadingtext">'+text+'</div></div><div class="bg"></div></div>');
	}

	$("#pageloadingtext").html(text);

	$('#resultLoading').css({
		'width':'100%',
		'height':'100%',
		'position':'fixed',
		'z-index':'10000000',
		'left':'0',
		'bottom':'0',
		'margin':'auto'
	});

	$('#resultLoading .bg').css({
		'background':'#000000',
		'opacity':'0.7',
		'width':'100%',
		'height':'100%',
		'position':'absolute',
		'top':'0'
	});

	$('#resultLoading>div:first').css({
		'text-align': 'center',
		'position': 'fixed',
		'left':'0',
		'bottom':'0',
		'margin':'auto',
		'font-size':'16px',
		'z-index':'10',
		'color':'#ffffff'

	});

    $('#resultLoading .bg').height('100%');
    $('#resultLoading').show();
    $('body').css('cursor', 'wait');
}

function ajaxindicatorstop(){
	if((window.location.href).indexOf("appnew/drive.html") >= 0){
		if(!admopenfilelink){
			ajaxindicatorstopexc();
		}
	} else {
		ajaxindicatorstopexc();
	}
}

function ajaxindicatorstopexc(){
	$('#resultLoading .bg').height('100%');
	$('#resultLoading').hide();
    $('body').css('cursor', 'default');
}

function trimString(str){
	return str.replace(/\s/g,'');
}

/**
 * method to check extension image and return correct image file url
 * @param fileExtension
 * @returns {String}
 */
function checkFileExtention(fileExtension)
{
	var imageName="assets/img/commonfile_96x96.png";
	try{
	 	if(fileExtension.toLowerCase()=='pdf'){
		  	imageName="assets/img/pdf2_96X96.png";
	  	} else if(fileExtension.toLowerCase()=='ppt' || fileExtension.toLowerCase()=='pptx' || fileExtension.toLowerCase()=='pptm'){
		  	imageName="assets/img/PowerPoint2_96x96.png";
	  	} else if(fileExtension.toLowerCase()=='doc' || fileExtension.toLowerCase()=='docx' || fileExtension.toLowerCase()=='docm' || fileExtension.toLowerCase()=='rtf'){
		  	imageName="assets/img/Word2_96x96.png";
	  	} else if(fileExtension.toLowerCase() == "xls" || fileExtension.toLowerCase() == "xlsx"){
		  	imageName="assets/img/Excel2_96x96.png";
	  	} else if(fileExtension.toLowerCase() == "txt"){
		  imageName="assets/img/txt_96x96.png";
	  	} else if(fileExtension.toLowerCase() == "csv"){
		  imageName="assets/img/csv2_96x96.png";
	  	}else if(fileExtension.toLowerCase() == "xml"){
		  imageName="assets/img/xml_96x96.png";
	  	}else if(fileExtension.toLowerCase() == "js"){
		  imageName="assets/img/js_96x96.png";
	  	}else if(fileExtension.toLowerCase() == "eml" || fileExtension.toLowerCase() == "msg"){
		  imageName="assets/img/eml_96x96.png";
	  	}else if(fileExtension.toLowerCase() == "zip" || fileExtension.toLowerCase() == "rar"){
		  imageName="assets/img/zip_96x96.png";
	  	}else if(fileExtension.toLowerCase()=='gif' || fileExtension.toLowerCase()=='jpeg' || fileExtension.toLowerCase()=='png' ||
	  		fileExtension.toLowerCase()=='x-png' || fileExtension.toLowerCase()=='jpg' || fileExtension.toLowerCase()=='tiff' ||
	  		fileExtension.toLowerCase()=='tif' || fileExtension.toLowerCase() == "bmp") {
		  	imageName="assets/img/google_96x96.png";
	  	} else {
		  	imageName="assets/img/commonfile_96x96.png";
	  	}
  }catch(error){}
	 return imageName;
}

function autocomplete(inp, arr) {
  	var currentFocus;
  	inp.addEventListener("input", function(e) {
      		var a, b, i, val = this.value;
      		closeAllLists();
      		if (!val) { return false;}
      		currentFocus = -1;

      		a = document.createElement("DIV");
      		a.setAttribute("id", this.id + "autocomplete-list");
      		a.setAttribute("class", "autocomplete-items");

      		this.parentNode.appendChild(a);

      		for (i = 0; i < arr.length; i++) {
        		if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          			b = document.createElement("DIV");
          			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          			b.innerHTML += arr[i].substr(val.length);
          			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          			b.addEventListener("click", function(e) {
              				inp.value = this.getElementsByTagName("input")[0].value;
              				closeAllLists();
          			});
          			a.appendChild(b);
        		}
      		}
  	});

  	inp.addEventListener("keydown", function(e) {
      		var x = document.getElementById(this.id + "autocomplete-list");
      		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) { //up
			currentFocus--;
			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
		}
	});

  	function addActive(x) {
		if (!x) return false;
    		removeActive(x);
    		if (currentFocus >= x.length) currentFocus = 0;
    		if (currentFocus < 0) currentFocus = (x.length - 1);
    		x[currentFocus].classList.add("autocomplete-active");
  	}

  	function removeActive(x) {
    		for (var i = 0; i < x.length; i++) {
      			x[i].classList.remove("autocomplete-active");
    		}
  	}

  	function closeAllLists(elmnt) {
    		var x = document.getElementsByClassName("autocomplete-items");
    		for (var i = 0; i < x.length; i++) {
      			if (elmnt != x[i] && elmnt != inp) {
        			x[i].parentNode.removeChild(x[i]);
      			}
    		}
  	}

  	document.addEventListener("click", function (e) {
      		closeAllLists(e.target);
  	});
}

function showActionPopup(popupDivId, closable){
	if(closable == false) {
		$("#"+popupDivId).modal({backdrop: 'static', keyboard: false});
	} else {
		$("#"+popupDivId).modal({backdrop: 'false', keyboard: false});
	}
	//$("#"+popupDivId).modal('show');
	//$('.modal-dialog').draggable();
	admCloseRowDropDown();

	$(".modal").on("resize", function(event, ui) {
	    ui.element.css("margin-left", -ui.size.width/2);
	    ui.element.css("margin-top", -ui.size.height/2);
	    ui.element.css("top", "50%");
	    ui.element.css("left", "50%");

	    $(ui.element).find(".modal-body").each(function() {
	      $(this).css("max-height", 400 + ui.size.height - ui.originalSize.height);
	    });
	});
	$('.modal').resizable();
}

function hideActionPopup(popupDivId){
	$("#"+popupDivId).modal('hide');
	admCloseRowDropDown();
}

function admCloseRowDropDown(){
	setTimeout(function(){
		$(".rowdropdownmenu").removeClass("show");
	}, 20);
}

function includes(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}

function checkIEBrowser(){
	var isIE = false;
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer'){
		var ua = navigator.userAgent,
		re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

		if (re.exec(ua) !== null){
			rv = parseFloat( RegExp.$1 );
		}
		isIE = true;
	} else if(navigator.appName == "Netscape"){
		/// in IE 11 the navigator.appVersion says 'trident'
		/// in Edge the navigator.appVersion does not say trident
		if(navigator.appVersion.indexOf('Trident') === -1) {
			rv = 12;
			isIE = false;
	   	} else {
			rv = 11;
			isIE = true;
		}
	}
	return isIE;
}

/**
 * method to clear local storage
 */
function clearauthinlocalstorage()
{
	if(typeof(Storage) !== "undefined")
	{
		localStorage._zu = "";
		localStorage._zw = "";
		localStorage._zy = "";
		localStorage._zv = "";
		localStorage._zk = "";
		localStorage._zx = "";
		localStorage._zz = "";
		localStorage._zp = "";
		localStorage._zt = "";
		localStorage._zs = "";
		localStorage._zn = "";
		localStorage._zo = "";
		localStorage._zr = "";
		localStorage._zq = "";
		localStorage._zh = "";
		localStorage._za = "";
		CACHE_STORAGE_ID = "";
	}
	base64authheader = "";
	base64auth = "";
	clientid = "";
	useremail = "";
	globalvariable.defaultemailid = "";
	username = "";
	globalvariable.clientidlong = "";
}

function logoutapp(){
	if(base64auth != "") logincancelotpservice();
	logOutService();
}

function disablecopypaste(){
	$('input.disablecopypaste').bind('copy paste', function (e) {
		e.preventDefault();
    });
}

function disablepasteonly(){
	$('input.disablepasteonly').bind('paste', function (e) {
		e.preventDefault();
    });
}

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function formatBytesDecimal(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(1024, i)).toFixed(dm)) + ' ' + sizes[i];
}

function progresscircledynamic() {

  var circleProgress = (function(selector) {
    var wrapper = document.querySelectorAll(selector);
    Array.prototype.forEach.call(wrapper, function(wrapper, i) {
      var wrapperWidth,
        wrapperHeight,
        percent,
        innerHTML,
        context,
        lineWidth,
        centerX,
        centerY,
        radius,
        newPercent,
        speed,
        from,
        to,
        duration,
        start,
        strokeStyle,
        text;

      var getValues = function() {
        wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
        wrapperHeight = wrapperWidth;
        percent = wrapper.getAttribute('data-cp-percentage');
        innerHTML = '<span class="percentage"><strong>' + percent + '</strong> %</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
        wrapper.innerHTML = innerHTML;
        text = wrapper.querySelector(".percentage");
        canvas = wrapper.querySelector(".circleProgressCanvas");
        wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
        context = canvas.getContext('2d');
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        newPercent = 0;
        speed = 1;
        from = 0;
        to = percent;
        duration = 1000;
        lineWidth = 25;
        radius = canvas.width / 2 - lineWidth;
        strokeStyle = wrapper.getAttribute('data-cp-color');
        start = new Date().getTime();
      };

      function animate() {
        requestAnimationFrame(animate);
        var time = new Date().getTime() - start;
        if (time <= duration) {
          var x = easeInOutQuart(time, from, to - from, duration);
          newPercent = x;
          text.innerHTML = Math.round(newPercent) + " %";
          drawArc();
        }
      }

      function drawArc() {
        var circleStart = 1.5 * Math.PI;
        var circleEnd = circleStart + (newPercent / 50) * Math.PI;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = "#ddd";
        context.stroke();
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();

      }
      var update = function() {
        getValues();
        animate();
      }
      update();

      var resizeTimer;
      window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          clearTimeout(resizeTimer);
          start = new Date().getTime();
          update();
        }, 250);
      });
    });

    //
    // http://easings.net/#easeInOutQuart
    //  t: current time
    //  b: beginning value
    //  c: change in value
    //  d: duration
    //
    function easeInOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }

  });

  circleProgress('.counter');

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}

$(document).ready(function() {


    var $content, $modal, $apnData, $modalCon;

    $content = $(".min");


    //To fire modal
    $(".mdlFire").click(function(e) {

        e.preventDefault();

        var $id = $(this).attr("data-target");

        $($id).modal({
            backdrop: false,
            keyboard: false
        });

    });


    $(".modalMinimize").on("click", function() {

        $modalCon = $(this).closest(".mymodal").attr("id");

        $apnData = $(this).closest(".mymodal");

        $modal = "#" + $modalCon;

        $(".modal-backdrop").addClass("display-none");

        $($modal).toggleClass("min");

        if ($($modal).hasClass("min")) {

            $(".minmaxCon").append($apnData);

            $(this).find("i").toggleClass('fa-minus').toggleClass('fa-clone');

        } else {

            $(".container").append($apnData);

            $(this).find("i").toggleClass('fa-clone').toggleClass('fa-minus');

        };

    });

    $("button[data-dismiss='modal']").click(function() {

        $(this).closest(".mymodal").removeClass("min");

        $(".container").removeClass($apnData);

        $(this).next('.modalMinimize').find("i").removeClass('fa fa-clone').addClass('fa fa-minus');

    });

    $(".mymodal").draggable({
	    handle: ".modal-header"
	})

});

/**
method to remove query parameter from URL withourt reloading
*/
function refineURL(){
  //get full URL
  var currURL= window.location.href; //get current address

  //Get the URL between what's after '/' and befor '?'
  //1- get URL after'/'
  var afterDomain= currURL.substring(currURL.lastIndexOf('/') + 1);
  //2- get the part before '?'
  var beforeQueryString= afterDomain.split("?")[0];

  return beforeQueryString;
}

/**
method to clean URL after data population
*/
function cleanURLAtTop(){
	var myNewURL = refineURL();
	//here you pass the new URL extension you want to appear after the domains '/'. Note that the previous identifiers or "query string" will be replaced.
	window.history.pushState("object or string", "Title", "/appnew/" + myNewURL );
}

/**
* remove zero from textbox
* element
**/
function removezeroposval(ele){
	if($(ele).val().length == 1 && $(ele).val().charAt(0) == "0"){
		$(ele).val("");
	} else if($(ele).val().length > 1){
		if($(ele).val().charAt(0) == "0"){
			$(ele).val($(ele).val().substring(1));
		}
	}
}

function checkDriveQueryParam(){
	var folderType = "";
	try{
		var urlk = window.location.href.split("?");
		if(urlk.length > 1 && urlk[1].indexOf("a=view")==0){
			var arr = urlk[1].split("&");
			if(arr.length == 4){
				if(arr[1].replace("b=", "") == "folder"){
					folderType = arr[2].replace("c=", "");
				}
			}
		}
	}catch(error){
		folderType = "";
	}
	return folderType;
}

// Convert special characters to HTML in Javascript
function encondeSplCharToHtml(str){
		 var i = str.length,
	     aRet = [];
		 while (i--) {
		     var iC = str[i].charCodeAt();
		     if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
		         aRet[i] = '&#'+iC+';';
		     } else {
		         aRet[i] = str[i];
		     }
		 }
		return aRet.join('');
}

function autoLoginCheck(response){
	//check if remember me and and send for relogin
	//else display message
	if(localStorage._zt==1){
		$("#divdrive").hide();
		currentservicemethodafter = "loginsuccess";
		if(localStorage._zz != "") {
			fetchdeviceid(localStorage._zz);
		} else {
			ajaxindicatorstop();
		}
	} else if(loggedin == false){
		localStorage._zx = "";
		loginsuccess(response);
	} else {
		loginRemoveAccount(uniqueidentifieracclist(), false);
		clearauthinlocalstorage();
		window.location.href="error.html";
	}
}

function clearVariablesLoginScreen(){
	clearauthinlocalstorage();
	base64auth = "";
	window.location.href="shareholder.html?i=0030020";
}

function valenc(plainText){
	var encrypted = plainText;
	try{
		encrypted = CryptoJS.AES.encrypt(plainText, _pdxt);
	}catch(error){
		console.log("valenc : " + error);
	}
	return encrypted;
}

function valdec(encrypted){
	var decrypted = "";
	try{
		decrypted = CryptoJS.AES.decrypt(encrypted, _pdxt);
		decrypted = decrypted.toString(CryptoJS.enc.Utf8);
	}catch(error){
		console.log("valdec : " + error);
	}
	return decrypted;
}

function uniqueidentifieracclist(){
	var ret = "";
	var loginid = localStorage._zy;
	var corpnumber = localStorage._zu;
	if($("#divlogin").is(':visible') && window.location.href.indexOf("&u=1") < 0){
		loginid = $("#loginid").val().trim();
		corpnumber = $("#corporateid").val().trim();
	}
	loginid = loginid.toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
	if(corpnumber.length > 0){
		ret = corpnumber+"_"+loginid;
	}
	return ret;
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank" onMouseOver="this.style.color=\'#0F0\'" onMouseOut="this.style.color=\'#009ce7\'">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" onMouseOver="this.style.color=\'#0F0\'" onMouseOut="this.style.color=\'#009ce7\'">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" onMouseOver="this.style.color=\'#0F0\'" onMouseOut="this.style.color=\'#009ce7\'">$1</a>');

    return replacedText;
}

function abortAllAjaxXhrRequest(){
	try{
		console.log("xhrPool length : " + xhrPool.length);
		$.each(xhrPool, function(idx, jqXHR) {
			jqXHR.abort();
			console.log("xhrPool abort");
		});
	}catch(error){
		console.log("xhrPool abort error " + error);
	}
}

String.prototype.replaceAll = function(strReplace, strWith) {
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

function loginRemoveAccount(id, force){
	if(localStorage._zm != null && localStorage._zm.length>0){
		corporatelistarr = JSON.parse(valdec(localStorage._zm));
		for(var i=corporatelistarr.length-1;i>=0;i--){
			if(id == corporatelistarr[i].id || id == -1){
				var vm = corporatelistarr[i];
				if(!force){
					vm.value._zz = "";
					corporatelistarr[i] = vm;
				} else {
					corporatelistarr.splice(i, 1);
				}
				if(corporatelistarr.length > 0){
					localStorage.setItem("_zm", valenc(JSON.stringify(corporatelistarr)));
				} else {
					localStorage.removeItem("_zm");
				}

				if(id != -1) break;
			}
		}
	}
}

function stringcheckifnonascii(str){
	var hasMoreThanAscii = /^[\u0000-\u007f]*$/.test(str);
	return hasMoreThanAscii;
}

function getFileNameFromDispositioon(disposition){
	var filename = "";
	if (disposition && disposition.indexOf('attachment') !== -1) {
		var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		var matches = filenameRegex.exec(disposition);
		if (matches != null && matches[1]) {
		  filename = matches[1].replace(/['"]/g, '');
		}
	}
	return filename;
}

//Not required section
$(document).ready(function($) {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('firebase-messaging-sw.js').then(function (reg) {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope);
		}).catch(function (error) {
			// registration failed
			console.log('Registration failed with ' + error);
		});
	}

	navigator.serviceWorker.addEventListener('message', function handler(event) {
		console.log('Received a message from service worker: ', event.data);
		storeNotification(event.data);
	});

	onDeviceReady();

	$(document).ajaxSend(function(e, jqXHR, options){
		xhrPool.push(jqXHR);
	});
	$(document).ajaxComplete(function(e, jqXHR, options) {
		xhrPool = $.grep(xhrPool, function(x){return x!=jqXHR});
	});

	var xhrabort = function() {
		$.each(xhrPool, function(idx, jqXHR) {
			jqXHR.abort();
	    });
  	};

	// Variables declarations
	var $wrapper = $('.main-wrapper');
	var $pageWrapper = $('.page-wrapper');
	var $slimScrolls = $('.slimscroll');
	var $sidebarOverlay = $('.sidebar-overlay');
	var $contentPage = $('.content-page');

	// Sidebar
	var Sidemenu = function() {
		this.$menuItem = $('#sidebar-menu a');
	};

	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function(e) {
			if($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if(!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	}
	// Sidebar Initiate
	init();

	// Sidebar overlay
	function sidebar_overlay($target) {
		if($target.length) {
			$target.toggleClass('opened');
			$sidebarOverlay.toggleClass('opened');
			$('html').toggleClass('menu-opened');
			$sidebarOverlay.attr('data-reff', '#' + $target[0].id);
		}
	}

	// Select 2
	if($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}

	// Floating Label
	if($('.floating').length > 0) {
		$('.floating').on('focus blur', function(e) {
			$(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
	}

	// Right Sidebar Scroll
	if($('.msg-list-scroll').length > 0) {
		$('.msg-list-scroll').slimscroll({
			height: '100%',
			color: '#878787',
			disableFadeOut: true,
			borderRadius: 0,
			size: '4px',
			alwaysVisible: false,
			touchScrollStep: 100
		});
		var msgHeight = $(window).height() - 224;
		$('.msg-list-scroll').height(msgHeight);
		$('.msg-sidebar .slimScrollDiv').height(msgHeight);
		$(window).resize(function() {
			var msgrHeight = $(window).height() - 224;
			$('.msg-list-scroll').height(msgrHeight);
			$('.msg-sidebar .slimScrollDiv').height(msgrHeight);
		});
	}

	// Left Sidebar Scroll
	if($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 60;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function() {
			var rHeight = $(window).height() - 60;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}

	// Page wrapper height
	var pHeight = $(window).height();
	//alert((pHeight-224));
	//$pageWrapper.css('min-height', (pHeight-224));
	//$pageWrapper.css('max-height', (pHeight-224));

	var heightdeduct = 118;
	$pageWrapper.css('height', (pHeight-heightdeduct));
	$contentPage.css('height', (pHeight-heightdeduct));
	$(window).resize(function() {
		var prHeight = $(window).height();
		//$pageWrapper.css('min-height', prHeight);
		//$pageWrapper.css('max-height', (prHeight-224));
		//$pageWrapper.css('height', (prHeight-224));
	});

	// Datetimepicker
	if($('.datetimepicker').length > 0) {
		$('.datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY'
		});
	}

	// Datatable
	if($('.datatable').length > 0) {
		$('.datatable').DataTable({
			"bFilter": false,
		});
	}

	// Bootstrap Tooltip
	if($('[data-toggle="tooltip"]').length > 0) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	/*// Mobile Menu
	$(document).on('click', '#open_msg_box', function() {
		$wrapper.toggleClass('open-msg-box');
		return false;
	});*/

	// Lightgallery
	if($('#lightgallery').length > 0) {
		$('#lightgallery').lightGallery({
			thumbnail: true,
			selector: 'a'
		});
	}

	// Incoming call popup
	if($('#incoming_call').length > 0) {
		$('#incoming_call').modal('show');
	}

	// Summernote
	if($('.summernote').length > 0) {
		$('.summernote').summernote({
			height: 200,
			minHeight: null,
			maxHeight: null,
			focus: false
		});

		$('.note-editor .note-editable').css("line-height", 1);
	}

	 // Check all email

    if ($('.checkbox-all').length > 0) {
        $('.checkbox-all').click(function() {
            $('.checkmail').click();
        });
    }
    if ($('.checkmail').length > 0) {
        $('.checkmail').each(function() {
            $(this).click(function() {
                if ($(this).closest('tr').hasClass("checked")) {
                    $(this).closest('tr').removeClass('checked');
                } else {
                    $(this).closest('tr').addClass('checked');
                }
            });
        });
    }

    // Mail important

    if ($('.mail-important').length > 0) {
        $(".mail-important").click(function() {
            $(this).find('i.fa').toggleClass("fa-star");
            $(this).find('i.fa').toggleClass("fa-star-o");
        });
    }

    if ($('.dropdown-toggle').length > 0) {
        $('.dropdown-toggle').click(function() {
            if ($('.main-wrapper').hasClass('open-msg-box')) {
                $('.main-wrapper').removeClass('open-msg-box');
            }
        });
    }

	// Dropfiles
	if($('#drop-zone').length > 0) {
		var dropZone = document.getElementById('drop-zone');
		var uploadForm = document.getElementById('js-upload-form');
		var startUpload = function(files) {
			console.log(files);
		};
		uploadForm.addEventListener('submit', function(e) {
			var uploadFiles = document.getElementById('js-upload-files').files;
			e.preventDefault();
			startUpload(uploadFiles);
		});
		dropZone.ondrop = function(e) {
			e.preventDefault();
			this.className = 'upload-drop-zone';
			startUpload(e.dataTransfer.files);
		};
		dropZone.ondragover = function() {
			this.className = 'upload-drop-zone drop';
			return false;
		};
		dropZone.ondragleave = function() {
			this.className = 'upload-drop-zone';
			return false;
		};
	}

	if((window.location.href).indexOf("index.html") >= 0){
		admCommonEvents();
	} else if((window.location.href).indexOf("userstatistics.html") >= 0){
		commonEvents();
	} else if((window.location.href).indexOf("admin.html") >= 0){
		adminCommonEvents();
	}
});

