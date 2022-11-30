var tyuio765656kjkhgrtty6767hbhghjhjhjh = "";
var setupcomplete = true;
var disclaimerMessage = "";
var disclaimerTitle = "";
var remembermeOn = false;


//call back method after adapter call
//gets the method to invoked and calls the corresponding local method
//method to be invoked = response.invocationResult.action
function loginsuccess(response)
{
	//alert("success"+response.messageCode);
	if(response != null)
	{
		var data = response;
		var responsecode = data.messageCode + "";

		if(window.location.href.indexOf("/shareholder.html") > 0) {
			ajaxindicatorstop();
			if(responsecode == 415 && screenloadednew == false){
				screenloadednew = true;
				loginRemoveAccount(uniqueidentifieracclist(), false);
				if(localStorage._zt!=1){
					clearauthinlocalstorage();
				}
				loadLogin();
			} else {
				if (responsecode == 433){
					setupcomplete = false;
				}

				if (responsecode == 419){
					showMessageErrorLogin(login_messages.userapprovalrequest, confirm_Error, true);
				} else if (responsecode == 421) {
					showMessageErrorLogin(login_messages.deviceblockedexceedloginBussiness, confirm_Error, true);
				} else if (responsecode == 422) {
						showMessageErrorLogin(login_messages.corporateExpired, confirm_Error, true);
				} else if (responsecode == 428) {
					showMessageErrorLogin(login_messages.corporateExpiredUser, confirm_Error, true);
				} else if (responsecode == 427){
					showMessageErrorLogin(login_messages.deviceblockedexceedloginIndividual, confirm_Error, true);
				} else if (responsecode == 416 || responsecode == 417){
					showMessageErrorLogin(login_messages.deviceblocked, confirm_Error, true);
				} else if (responsecode == 418){
					showMessageErrorLogin(login_messages.deviceblockedbyuser, confirm_Error, true);
				}else if (responsecode == 423){
					showMessageErrorLogin(login_messages.invalidip, confirm_Error, true);
				} else if (responsecode == 434){
					showMessageErrorLogin(login_messages.usernotactivate, confirm_Error, true);
				} else if (responsecode == 415 || responsecode == 420){
					showMessageErrorLogin(login_messages.userblocked, confirm_Error, true);
				} else if (responsecode == 429){
					showMessageErrorLogin(login_messages.userblockedbyadmin, confirm_Error, true);
				} else if (responsecode == 435){
					showMessageErrorLogin(login_messages.userblockedafterthreewrongpassword, confirm_Error, true);
				} else if (responsecode == 424){
					showMessageErrorLogin(login_messages.captchamismatch, confirm_Error, true);
					$("#logincaptcha").val("");
				} else if (responsecode == 425){
					showMessageErrorLogin(login_messages.invalidcredentials, confirm_Error, true);
					$("#password").val("");
				} else if (responsecode == 431){
					showMessageErrorLogin(login_messages.OTPmismatch, confirm_Error, false);
					$("#txt_otp").val("");
				} else if (responsecode == 432){
					showMessageErrorLogin(login_messages.corpsetupincomplete, confirm_Error, false);
				} else if (responsecode == 500){
					//clear the _zz from account trying to login
					if(acclistcurrlogin > -1 && localStorage._zm != null && (localStorage._zm).length > 0 && localStorage._zm != "null"){
						var corporatelistarr = JSON.parse(valdec(localStorage._zm));
						loginRemoveAccount(corporatelistarr[acclistcurrlogin].id, false);
					}
					clearVariablesLoginScreen();
				} else if (data.object == null || data.object == undefined){
					showMessageErrorLogin(login_messages.genericmessage, confirm_Error, true);
					$("#password").val("");
				} else if (data.error == "true"){
					showMessageErrorLogin(login_messages.genericmessage, confirm_Error, true);
					$("#password").val("");
				} else {
					var reasonCode = data.object.reasonCode + "";
					if (reasonCode == 421 || responsecode == 422){
						showMessageErrorLogin(login_messages.deviceblockedexceedloginBussiness, confirm_Error, true);
					} else if (reasonCode == 427 || responsecode == 422){
						showMessageErrorLogin(login_messages.deviceblockedexceedloginIndividual, confirm_Error, true);
					} else if (reasonCode == 420 || reasonCode == 419){
						showMessageErrorLogin(data.message, confirm_Error, true);
					} else if (reasonCode == 416 || reasonCode == 417){
						showMessageErrorLogin(login_messages.deviceblocked, confirm_Error, true);
					} else if (reasonCode == 418){
						showMessageErrorLogin(login_messages.deviceblockedbyuser, confirm_Error, true);
					}else if (reasonCode == 423){
						showMessageErrorLogin(login_messages.invalidip, confirm_Error, true);
					} else {
						if(data.object.lawFirmId > 0){
							afterLoginSuccess(data);
						} else {
							base64auth =  data.object.token;
							loginsendotpCommon();
						}
					}
				}
			}
		} else {
			ajaxindicatorstop();
			//var extraparam = response.extraparam;
			if(responsecode == "415") {
				hidebusyindicator();
				window.location.href="error.html";
				//showconfirmmsgmain(Messages.dashboard_blockedDeviceByAdmin, "ERROR", -1, "");
				//shakti write logout method
			} else if(responsecode == "500") {
				hidebusyindicator();
				window.location.href="error.html";
				//showconfirmmsgmain(data.message, "ERROR", -1, "");
				//shakti write logout method
			}
			else if((data.error+"") == "false")
			{
				afterLoginSuccess(data);
			}
			else if((data.error+"") == "true")
			{
				hidebusyindicator();
				window.location.href="error.html";
				//shakti write logout method
				//loginShowconfirmmsg("Please enter valid credentials", confirm_Error, 5000, "", false, false);
			}
			else
			{
				notloggedin(response);
				window.location.href="error.html";
				//shakti write logout method
			}
		}
	}
	else
	{
		window.location.href="error.html";
		//shakti write logout method
	}
}

function loginfailed(response)
{
	hidebusyindicator();
}

function notloggedin(response)
{
	hidebusyindicator();
	/*if (response.reasonCode || response.reasonCode){
		showconfirmmsgmain(response.reasonCode, "ERROR", -1, "");
	}*/
}

//to display login error messages
function displayErrorMessase(errorMsg) {
	showconfirmmsgmain(errorMsg, "ERROR", -1, "");
	return false;
}

function afterLoginSuccess(data){
	adm_parentfolderid = [];
	admForumDBFetchDone = false;

	data = data.object;
	base64authheader =  data.token;
	base64auth = base64authheader;
	globalvariable.defaultemailid = data.emailId;
	username = data.name;
	if(username.charAt(0) == ' ') username = username.substring(1);
	globalvariable.lawfirmnameglobal = data.tempAttr4;
	globalvariable.clientidlong = data.lawFirmId;
	$("#corporateid").val(data.tempAttr2);
	storeauthinlocalstorage(data);
	hidebusyindicator();
	globalvariable.loggedinnow = true;
	globalvariable.loggedinalready = true;
	accType = data.accType;
	disclaimerMessage = data.disclaimerMessage;
	disclaimerTitle = data.disclaimerTitle;

	var baseauth4 = getauthtokenfromlocal();
	hidebusyindicator();

	if((window.location.href).indexOf("index.html") >= 0 || (window.location.href).indexOf("index1.html") >= 0 || (window.location.href).indexOf("index1.html") >= 0){
		window.location.href="drive.html";
		loginCheckRememberMe();
		if(localStorage._zs == "I"){
			//fetchAllFolderListDetails(admpersonaltype);
			$("#individualId").html("Download");
			$("#adm_download_file").html("Download");
			$("#adm_personal").click();
		} else {
			//fetchAllFolderListDetails(admsharedtype);
			$("#adm_dataroom").click();
		}
	} else if((window.location.href).indexOf("userstatistics.html") >= 0){
		fetchCorporateList();
	} else if((window.location.href).indexOf("admin.html") >= 0){
		adminFetchUserList("N");
	} else if((window.location.href).indexOf("payment.html") >= 0){
		ajaxindicatorstop();
	} else if((window.location.href).indexOf("shareholder.html") >= 0){
		//hideActionPopup("divotpmodal");
		//window.location.href = "drive.html";
		hideActionPopup("divotpmodal");
		if($("#password").val().trim().length > 0 && fromexe == false) {
			$("#span_login_id").html(trimString($("#loginid").val().trim()));
			var start = new Date;
			timerinterval = setInterval(function() {
				var timer = parseInt((new Date - start) / 1000);
				$('#span_timer_login_save').html((otptimer-timer) + " Seconds   ");
				if((otptimer-timer) <= 0){
					clearInterval(timerinterval);
					logoutapp();
				}
			}, 1000);
			showActionPopup("divstaysignedinmodal");
		} else {
			remembermeOn = true;
			disclaimerPopupifAvailableforRememberme();
		}
	}
	$("#password").val("");
}

function showMessageErrorLogin(txt, type, refreshcaptcha){
	if(txt == login_messages.deviceblocked || txt == login_messages.deviceblockedbyuser || txt == login_messages.userblocked || txt == login_messages.userblockedbyadmin
		|| txt == login_messages.userblockedafterthreewrongpassword){
		loginRemoveAccount(uniqueidentifieracclist(), false);
		loginresetfieldsonly();
	} else {
		loginRemoveAccount(uniqueidentifieracclist(), false);
	}

	$('body').topAlertjs({
		type: type,
		message: txt,
		close: true,
		duration: 10
	});
	if((window.location.href).indexOf("admin.html") > 0 || (window.location.href).indexOf("admindrive.html") > 0){
		window.location.href = "drive.html";
	} else {
		loginCommonEvents(refreshcaptcha);
		if(txt != login_messages.OTPmismatch){
			hideActionPopup("divotpmodal");
		}
	}
}

function loginCheckRememberMe(){
	if($("#login_rememberme").is(':checked')){
		localStorage._zt=1;
		var password = trimString($("#password").val().trim());
		var loginid = trimString($("#loginid").val().trim());
		var corporateid = trimString($("#corporateid").val().trim());
		localStorage.setItem("_zy", loginid.trim());
		if($("#corporateid").is(":hidden")){
			localStorage._zu = "";
		} else {
			localStorage.setItem("_zu", corporateid.trim());
		}
	} else {
		localStorage._zt=0;
		$("#login_rememberme").attr('checked', false);
		$("#password").val("");
		$("#loginid").val("");
		$("#corporateid").val("");
	}
}
