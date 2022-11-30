var dm = window.location.href;
dm = dm.replace(cloudURLProtocol, "");
dm = dm.substring(0, dm.indexOf("/"));
dm = cloudURLProtocol + dm;
let src ="";

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
	var url = window.location.href;
	var isforgotpass = false;
	if(url.indexOf("&s=forgot") > 0) {
		isforgotpass = true;
	}
	if((response.error+"") == "false" && response.object != null) {
		if(response.tempObject1 == 1 && response.tempObject2 == true){
			$("#main_div_changepass").hide();
			if(isforgotpass){
				$("#head1").html("Password changed successfully");
			} else {
				$("#head1").html("Account activated successfully");
			}
			$("#head2").html("You will be redirecting to login page");
			$("#active_account_status_div").show();
		}else{
			//loginShowconfirmmsg(login_messages.passchanged, confirm_Success, 5000, "", false, false);
			$("#head1").html("Password changed successfully.");
			$("#head2").html(login_messages.passchanged);
			$("#active_account_status_div").show();
			$("#main_div_changepass").hide();
			loginRemoveAccount(uniqueidentifieracclist(), false);
			clearauthinlocalstorage();
			$('#newpassword').val("");
			$('#confirmpassword').val("");
		}
		var link = url.split('?');
		setTimeout(function () {
			window.location.href = "drive.html?" + link[1];
		}, 5000);
	} else {
		if(response.messageCode == 426){
			loginShowconfirmmsg(login_messages.oldpasswordwrong, confirm_Error, 5000, "", false, false);
		} else if(response.messageCode == 440){
			if(isforgotpass){
				$("#head1").html("Error in Change Password");
				$("#head2").html("URL is invalid or expired. Please click on the link from your mail to Change Password.");
			} else {
				$("#head1").html("Error in Activation");
				$("#head2").html("URL is invalid or expired. Please click on the link from your mail to activate your account.");
			}
			$("#active_account_status_div").show();
		} else if(response.messageCode == 441){
			if(isforgotpass){
				$("#head1").html("Error in Change Password");
				$("#head2").html("URL is invalid or expired. You have reached maximum no of attempts.Your account is being blocked. Please contact your corporate administrator.");
			} else {
				$("#head1").html("Error in Activation");
				$("#head2").html("URL is invalid or expired. You have reached maximum no of attempts. Your account is being deleted. Please contact your corporate administrator.");
			}
			$("#active_account_status_div").show();
		} else if(response.messageCode == 442){
			$("#head1").html("URL Invalid.");
			$("#head2").html("URL no longer exists.");
			$("#active_account_status_div").show();
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

function fetchUserStatusServiceAfter(response){
	src=response.tempObject5;
	var logopatgh = fetchCorporateLogo();
	document.getElementById("clogoimg1").src = logopatgh;
	var url = window.location.href;
	var isforgotpass = false;
	if(url.indexOf("&s=forgot") > 0) {
		isforgotpass = true;
	}

	if(response.error == false && response.object != null){
		if(url.indexOf("&a") > 0){
			if(isforgotpass && response.object == "A") {
				response.object = "P";
			}
			if(response.object == "P" || response.object == "S"){
				$("#main_div_changepass").show();
				$('#newpassword').focus();
			}else if(response.object == "A"){
				$("#head1").html("Account is already activated");
				$("#active_account_status_div").show();
			}
		}else{
			if (response.object == "A") {
				$("#main_div_changepass").show();
				$('#newpassword').focus();
			} else if (response.object == "S") {
				$("#head1").html("Your account is blocked");
				$("#head2").html("Please contact your administrator");
				$("#active_account_status_div").show();
			}
		}
	}else{
		if(response.messageCode == 432){
			if(isforgotpass) {
				$("#head1").html("Error in Change Password");
			} else {
				$("#head1").html("Error in Activation");
			}
			$("#head2").html("Please contact your administrator");
			$("#active_account_status_div").show();
		} else if(response.messageCode == 440){
			if(isforgotpass) {
				$("#head1").html("Error in Change Password");
				$("#head2").html("URL is invalid or expired.Please click on the link from your mail to Change Password.");
			} else {
				$("#head1").html("Error in Activation");
				$("#head2").html("URL is invalid or expired.Please click on the link from your mail to activate your account.");
			}
			$("#active_account_status_div").show();
		} else if(response.messageCode == 441){
			if(isforgotpass) {
				$("#head1").html("Error in Change Password");
				$("#head2").html("URL is invalid or expired.You have reached maximum no of attempts.Your account is blocked.Please contact your corporate administrator to unblock your account.");
			} else {
				$("#head1").html("Error in Activation");
				$("#head2").html("URL is invalid or expired.You have reached maximum no of attempts.Please contact your corporate administrator to send you a new activation URL.");
			}
			$("#active_account_status_div").show();
		} else if(response.messageCode == 442){
			$("#head1").html("URL Invalid.");
			$("#head2").html("URL no longer exists.");
			$("#active_account_status_div").show();
		}
	}
}
function fetchCorporateLogo() {
	if (handleNullValue(src) != "") {
		return dm + "/api.acms/" + src;
	} else {
		return "assets/img/Dlogobig.png"
	}
}

function handleNullValue(inputData) {
	if (inputData == 'null' || inputData == 'NULL' || inputData == null || inputData == undefined || inputData == "undefined") return "";
	return inputData;
}