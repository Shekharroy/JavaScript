function loginService(json){
	ajaxindicatorstart('please wait while validating credentials..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+loginURL;
	invokeAdapterCallFromLogin(type, posturl, "", json, "");
}

function forgotpassService(posturl){
	ajaxindicatorstart('please wait while sending request..');
	var type = createMethod;

	posturl = cloudApiUrlACMS+posturl;
	invokeAdapterCallFromLogin(type, posturl, "", "", "");
}

function changepassService(json){
	ajaxindicatorstart('please wait while changing password..');
	var type = createMethod;

	var posturl = cloudApiUrlACMS+changepassURL;
	posturl = posturl.replace("<ACTION>", "changepassServiceAfter");
	invokeAdapterCallFromLogin(type, posturl, "", json, "");
}

function changepassStatusService(json, source){
	var type = createMethod;
	var posturl = cloudApiUrlACMS+changePassStatusURL;
	var extraparamjson = {"source": source+""};
	invokeAdapterCallFromLogin(type, posturl, "", json, extraparamjson);
	localStorage._zh = 1;
}

function loginFetchCaptcha(){
	$("#logincaptcha").val("");
	ajaxindicatorstart('please wait while fetching info..');
	var type = createMethod;

	var posturl = cloudApiUrlACMS+fetchcaptchaURL;
	posturl = posturl.replace("<ACTION>", "loginFetchCaptchaAfter");
	invokeAdapterCallFromLogin(type, posturl, "", "", "");
}

function logOutServiceSingle(token){
	localStorage._rm = false;
	var type = createMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/userlogout/0/logout/action";
	var json = {"attribute1":token};
	invokeAdapterCall(type, posturl, "", json, "");
}

function loginsendotpservice(json){
	ajaxindicatorstart('please wait..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/uts/0/gen/loginsendotpserviceAfter";
	invokeAdapterCall(type,posturl,base64auth,json,"")
}

function loginmatchOTPService(OTP){
	ajaxindicatorstart('please wait verifying OTP..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/uts/0/match/loginsuccess";
	//invokeAdapterCall(type,posturl,baseAuth,json,"");

	$.ajax({
		url: posturl,
		contentType: "application/json",
		type: type,
		beforeSend: function (xhr) {xhr.setRequestHeader ("AUHOTP",  OTP);xhr.setRequestHeader ("Authorization",  "Bearer " + base64auth);},
		success: function(response){
			response.extrajsonparam = "";
			apiServiceInteraction_Callback(response);
		},
		error: function(response){
			response.extrajsonparam = "";
			apiServiceInteraction_Callback_Error(response)
		}
	});
}

function logincancelotpservice(){
	ajaxindicatorstart('please wait..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/uts/0/cancelotp/logincancelotpserviceAfter";
	invokeAdapterCall(type,posturl,base64auth,"","")
}

function disclaimerAcceptorDeclaineService(id){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/disclaimer/0/update/disclaimer";
	var extraparamjson = {"id": id};
	var json = {"id": id,
				"action": "disclaimerAcceptorDeclaineServiceAfter"};
	invokeAdapterCall(type, posturl, "", json, extraparamjson);
}

function checkCorporateDomainService(lawfirmid){
	var type = "GET";
	var posturl = cloudApiUrlACMSServer+"/v1/lawfirm/server/<LAWFIRMID>/<ACTION>";
		posturl = posturl.replace("<LAWFIRMID>", lawfirmid);
	posturl = posturl.replace("<ACTION>", "checkCorporateDomainServiceAfter");
	invokeAdapterCall(type, posturl, "", "", "");
}

function findContinent(ip1){
	var posturl = "https://ipapi.co/<DOMAIN>/json";
  posturl = posturl.replace("<DOMAIN>", ip1);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', posturl, true);
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			if(xhr.status == 200){
				var ret = JSON.parse(xhr.responseText);
				currentContinent = ret.continent_code;
				if(cloudURLACTDomain != externalDomains[currentContinent]){
					if(externalDomainNames[currentContinent] == "USA"){
						$("#current_domain").html("outside Europe ");
					}else $("#current_domain").html("Europe ");
					$("#link_doaminaccess").html("click "+externalDomains[currentContinent]+" to login");
					redirectDomain = "https://"+externalDomains[currentContinent]+"/appnew/drive.html";
					$("#div_doaminnotif").show();
				}
			} else {
				console.log("Error in fetching continent");
			}
		}
	};
	xhr.send(null);
	xhrPool.push(xhr);
}
function fetchUserStatusService(){
	var userId = "";
	var lawfirmId = "";
	var url = window.location.href;
	if(url.indexOf("&a") > 0){
		userId = url.split("&")[1].split("=")[1];
		lawfirmId = url.split("&")[2].split("=")[1];
		var key = url.split("&")[3].split("=")[1];

		var attribute5 = "";
		if(url.indexOf("&s=forgot") > 0) {
			attribute5 = "FORGOTPASS";
		}
		var type = createMethod;
		var posturl = cloudApiUrlACMS+"/v1/publicapi/changepassword/0/fetch/user/status";
		var json = {
			"attribute1": "fetchUserStatusServiceAfter",
			"attribute2": lawfirmId,
			"attribute3": userId,
			"attribute4": key,
			"attribute5": attribute5
		};
		localStorage._zx = "";
		invokeAdapterCall(type, posturl, "", json, "");
	}else{
		userId = localStorage._zv;
		lawfirmId = localStorage._zw;
		$("#main_div_changepass").show();
		$('#newpassword').focus();
	}
}