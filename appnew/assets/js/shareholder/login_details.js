function forgotpassServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var msg = login_messages.forgotpassdone.replace("<EMAILID>", $("#loginidforgot").val());
		loginShowconfirmmsg(msg, confirm_Success, 5000, "", false, false);

		var clearstorage = false;
		if(localStorage._zm != null && (localStorage._zm).length > 0 && localStorage._zm != "null"){
			var accountid = $("#corporateidforgot").val()+"_"+($("#loginidforgot").val()).toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
			var corplist = JSON.parse(valdec(localStorage._zm));
			for(var i=0;i<corplist.length;i++){
				if(accountid == corplist[i].id){
					clearstorage = true;
				}
			}
		} else {
			clearstorage = true;
		}

		if(clearstorage){
			clearauthinlocalstorage();
		}

		var url = window.location.href;
		var link = url.split('?');
		setTimeout(function(){
			window.location.href = "drive.html?"+link[1];
		}, 5000);
	} else {
		if(document.getElementById("divcorporateidforgot").style.display!="none"){
			loginShowconfirmmsg(login_messages.forgotpasserror2, confirm_Error, 5000, "", false, false);
		} else {
			loginShowconfirmmsg(login_messages.forgotpasserror1, confirm_Error, 5000, "", false, false);
		}
	}
}

function changepassServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		loginShowconfirmmsg(login_messages.passchanged, confirm_Success, 5000, "", false, false);
		loginRemoveAccount(uniqueidentifieracclist(), false);
		clearauthinlocalstorage();
		$('#newpassword').val("");
		$('#confirmpassword').val("");
		var url = window.location.href;
		var link = url.split('?');
		setTimeout(function(){
			window.location.href="drive.html?"+link[1];
		}, 5000);
	} else {
		if(response.messageCode == 426){
			loginShowconfirmmsg(login_messages.newpasssameasoldpass, confirm_Error, 5000, "", false, false);
		} else {
			loginShowconfirmmsg(login_messages.passchangeproblem, confirm_Error, 5000, "", false, false);
		}
	}
}

function loginFetchCaptchaAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		 var t = response.objectD;
         $("#imgcaptcha").attr("src", t.img);
	}
}

function loginsendotpserviceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		loginotpget(response.object);
	} else {
		//loginprocess(0);
		//give message
	}
}

function logOutServiceAfter(response){
	ajaxindicatorstop();
	clearauthinlocalstorage();
	base64auth = "";
	hideActionPopup("divotpmodal");
//	setTimeout(function(){window.location.href="drive.html"}, 1000);
}

function logOutServiceSinglrAfter(response){
	ajaxindicatorstop();
}

function logincancelotpserviceAfter(response){
	ajaxindicatorstop();
	//logOutService();
}


function disclaimerAcceptorDeclaineServiceAfter(response){
	var extraParam = response.extrajsonparam.id;
	if(extraParam == 1){
		if(remembermeOn == false){
			if(signedinno){
				loginWithSignedinNo();
			}
			else if(signedinyes){
				loginWithSignedinYes();
			}
		} else {
			hideActionPopup("disclaimerpopup");
			handleRefresh();
		}
	}else if(extraParam == 2){
		loginRemoveAccount(uniqueidentifieracclist(), false);
		clearauthinlocalstorage();
		window.location.href= "drive.html";
	}

}


function checkCorporateDomainServiceAfter(response){
	if(response.responseCode != 500) {
		var apiServerUrl = response.apiServerUrl+"";
		if(apiServerUrl.trim() != "null" && apiServerUrl.trim() != "undefined" && apiServerUrl.trim() != ""){
			if(cloudURLACTDomain != apiServerUrl){
				if(apiServerUrl == externalDomains["EU"]){
					$("#domain_name").html(externalDomainNames["EU"]+" region. ");
					$("#link_domain").html("please click  "+externalDomains["EU"]+" to login");
				}else{
					$("#domain_name").html("the region outside "+externalDomainNames["EU"]+". ");
					$("#link_domain").html("Please click "+apiServerUrl+" to login");
				}
				redirectDomain = cloudURLProtocol + apiServerUrl + "/appnew/drive.html";
				showActionPopup("domainmismatchpopup", false);
			} else{
				loginprocess();
			}
		} else {
			loginprocess();
		}
	} else{
		showMessageErrorLogin(login_messages.invalidcredentials, confirm_Error, true);
	}
}

function changepassStatusServiceAfter(response){
	if(response.extrajsonparam.source == "changepass"){
		window.location.href="drive.html";
	}
}