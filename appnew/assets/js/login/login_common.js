/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromLogin(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	if(base64authheader == "") base64authheader = base64auth;
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
}

/**
 * method to call show confirm message
 * @param txt
 * @param type
 * @param duration
 * @param targetdvid
 * @returns {Boolean}
 */
function loginShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm)
{
	if(ispop) showconfirmmsgpopup(txt, type, duration, targetdvid, confirm);
	else {
		if(type == "ASK"){
			showconfirmmsgmain(txt, type, duration, targetdvid, confirm);
		} else {
			$('body').topAlertjs({
				type: type,
				message: txt,
				close: true,
				duration: 10
			});
		}
	}
}

function handleRefresh(){
	if(!setupcomplete){
		admProviderSelectEvent();
		showMessageErrorLogin(login_messages.corpsetupforcecomplete, confirm_Error, false);
		showActionPopup("updatestoragemodal");
	} else {
		//check if url parameters show forum
		if((window.location.href).indexOf("&c=forum") > 0){
			var urlarr = (window.location.href).split("?");
			window.location.href = "forum.html?"+urlarr[1];
		} else {
			$("#divlogin").hide();
			$("#divdrive").hide();
			document.title = "DCirrus Drive";
			admCommonEvents();
			if(loginglobalvariable.timerinterval != null) clearInterval(loginglobalvariable.timerinterval);
			if(timerlogininterval != null) clearInterval(timerlogininterval);
			rearrangeAccountsList = true;
			if(localStorage._zs == "I"){
				//fetchAllFolderListDetails(admpersonaltype);
				$("#adm_personal").click();
			} else {
				//fetchAllFolderListDetails(admsharedtype);
				//check if localstorage change password done
				if(checkDriveQueryParam() == "P"){
					$("#adm_personal").click();
				} else {
					$("#adm_dataroom").click();
				}
			}

			unbindobject("#btn_logout");
			$("#btn_logout").bind("click", function(event){
				logoutapp();
				return false;
			});
		}
	}
}

function setAvailableDomains(){
	externalDomains["EU"] = "eu.dcirrus.io";
	externalDomainNames["EU"] = "Europe";

	externalDomains["AF"] = "dcirrus.io";
	externalDomainNames["AF"] = "USA";

	externalDomains["AS"] = "dcirrus.io";
	externalDomainNames["AS"] = "USA";

	externalDomains["AN"] = "dcirrus.io";
	externalDomainNames["AN"] = "USA";

	externalDomains["NA"] = "dcirrus.io";
	externalDomainNames["NA"] = "USA";

	externalDomains["OC"] = "dcirrus.io";
	externalDomainNames["OC"] = "USA";

	externalDomains["SA"] = "dcirrus.io";
	externalDomainNames["SA"] = "USA";
}

function initFingerprintJS() {
	fetchLogo();

	var ip1="";
	try{
		setAvailableDomains();
		$.getJSON("https://api.ipify.org/?format=json")
			.done(function(e) {
				ip1 = e.ip;
				if(ip1.length > 0 && ip1 != null)
					findContinent(ip1);
				fingerprintJS();
			 })
			.fail(function(error ) {
			console.log( "Request Failed: " + error );
			fingerprintJS();
		});
	}catch(error){
		_tdfrt = "";
		loadLogin();
	}
}

function loginCommonEvents(refreshcaptcha){
	if(refreshcaptcha) loginFetchCaptcha();
	viewPasswordEvent();
	loginswitchacctypeevent();
	enterEvent();
	loginEvent();
	loginSendSignUp();
	loginstaysignedinevent();
	loginAddAccountEvent();
	// checkLengthOfOtp();
	$('#loginid').focus();
}

function loadLogin(){
	$("#password").val("");
	var fromforgotpass = false;
	if(window.location.href.indexOf("&u=1") > 0){
		fromforgotpass = true;
	}
	if (window.matchMedia("(max-width: 767px)").matches){
		loginShowconfirmmsg(login_messages.noallowedformobile, confirm_Error, 5000, "", false, false);
	} else {
		onDeviceReady();
		if(window.location.href.indexOf("?t=") > 0){
			var tkn = (window.location.href).split("?");
			tkn = tkn[1].replace("t=", "");

			if(_tdfrt == ""){
				_tdfrt = localStorage._zy.toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			}
			clearauthinlocalstorage();
			var posturl = cloudURLACT + "/api.acms/" + loginURL;
			ajaxindicatorstart('loading data.. please wait..');
			localStorage.setItem("_zt", 1);
			localStorage.setItem("_rm", true);
			devicetype = "desktop";
			var sm = {
				"userValidateDto":{
					"userName":"",
					"deviceId":_tdfrt
				},
				"deviceDto":{
					"tokenTemp":tkn,
					"regNew":"browser",
					"deviceType":devicetype,
					"deviceName":"Web Browser",
					"regNew":"browser",
					"deviceId":_tdfrt
				}
			};
			invokeAdapterCall("POST",posturl,"",sm ,"");
		} else {
			var base64authheader = getauthtokenfromlocal();
			if(base64authheader != undefined && base64authheader != null && base64authheader != "" && base64authheader != "null" && base64authheader != "undefined"
				&& !fromforgotpass) {
				handleRefresh();
			} else {
				globalvariable.screenloadednew = true;
				loginresetfieldsonly();
				var url = window.location.href;
				var link = url.split('?t=');
				if(window.location.href.indexOf("?a=view&") < 0 && window.location.href.indexOf("?dfd=") < 0){
					if(localStorage._zt == 1 && !fromforgotpass){
						$("#login_rememberme").attr('checked', true);
						$("#loginid").val(localStorage._zy);

						if(localStorage._zs == "B" || link[1] == "B"){
							if (localStorage._zs == "B") {
								$("#corporateid").val(localStorage._zu);
							}
							$("#lidataroom").click();
						} else {
							if(localStorage._zs == "I" || link[1] == "I"){
								$("#corporateid").val("0");
							}
							$("#lipersonalfolder").click();
						}
						loginCommon();
					} else {
						if(link[1] == "B"){
							if (localStorage._zs == "B") {
								$("#corporateid").val(localStorage._zu);
							}
							$("#lidataroom").click();
						} else if(link[1] == "I"){
							$("#corporateid").val("0");
							$("#lipersonalfolder").click();
						} else {
							$("#corporateid").val("");
							$("#lidataroom").click();
						}
					}

					if(fromforgotpass) {
						cleanURLAtTop();
					}
				} else if(window.location.href.indexOf("?a=view&") > 0){
					if(getauthtokenfromlocal() == "") {
						loginCheckAndPopulateCachedAccount();
						loginShowAllcounts();

					}
				}
			}
		}
	}
}

function viewPassword(passwordfield, passstatusfield){
	var passwordInput = document.getElementById(passwordfield);
	var passStatus = document.getElementById(passstatusfield);

	if (passwordInput.type == 'password'){
		passwordInput.type='text';
		passStatus.className='fa fa-eye-slash';
	}else{
		passwordInput.type='password';
		passStatus.className='fa fa-eye';
	}
}

function loginswitchacctype(activeid,inactiveid){
	//$("#"+activeid).addClass("activetab");
	//$("#"+inactiveid).removeClass("activetab");
	$("#"+activeid).css("background-color", "#05317f !important");
	$("#"+activeid).css("color", "#ffffff");
	$("#"+inactiveid).css("background-color", "#ffffff !important");
	$("#"+inactiveid).css("color", "#000");
}

function loginCommon(){
	if(fromexe == false){
		$("#loginid").attr("disabled", false);
		$("#password").attr("disabled", false);
		$("#corporateid").attr("disabled", false);
		$("#logincaptcha").attr("disabled", false);
		var password = trimString($("#password").val());
		var loginid = trimString($("#loginid").val());
		var corporateid = trimString($("#corporateid").val());
		var logincaptcha = trimString($("#logincaptcha").val());

		if(document.getElementById("divcorporateid").style.display=="none"){
			corporateid = "0";
		}
		if(loginid.trim().length == 0 || !validateEmail(loginid)){
			loginShowconfirmmsg(login_messages.enterloginid, confirm_Error, 5000, "", false, false);
		} else if(password.trim().length == 0){
			loginShowconfirmmsg(login_messages.enterpassword, confirm_Error, 5000, "", false, false);
		} else if(corporateid.trim().length == 0 && document.getElementById("divcorporateid").style.display!="none"){
			loginShowconfirmmsg(login_messages.entercorporateid, confirm_Error, 5000, "", false, false);
		} else if(logincaptcha.trim().length == 0 && localStorage._zt == 0){
			loginShowconfirmmsg(login_messages.entercaptcha, confirm_Error, 5000, "", false, false);
		} else {
			if(corporateid != 0) {
				checkCorporateDomainService(corporateid);
			}else {
				loginprocess();
			}
		}
	}
}

function loginsendotpCommon(force){
	$("#txt_otp").val("");
	var loginid = trimString($("#loginid").val());
	var corporateid = trimString($("#corporateid").val());
	var sm = {"attribute1":loginid,"attribute3":corporateid,"attribute4":force};
	loginsendotpservice(sm);
}

function loginprocess(){
	var password = trimString($("#password").val());
	var loginid = trimString($("#loginid").val());
	var corporateid = trimString($("#corporateid").val());
	var logincaptcha = trimString($("#logincaptcha").val());
	if(document.getElementById("divcorporateid").style.display=="none"){
		corporateid = "0";
	}

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var dvcid = loginid.toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	if(_tdfrt == ""){
		_tdfrt = dvcid;
	}
	var json = {
		"userValidateDto":{
			"userName":loginid,
			"password":password,
			"lawFirmNumber":corporateid,
			"deviceId":_tdfrt,
			"captcaStr":logincaptcha,
			"rememberMe":0
		},
		"deviceDto":{
			"lawFirmNumber":corporateid,
			"loginId":loginid,
			"deviceId":_tdfrt,
			"remoteAddress":"1.1.1.1",
			"deviceType":"desktop",
			"deviceName":"Web Browser",
			"remoteAddressV4":"1.1.1.1",
			"geoLocation":"",
			"regNew":"browser"
		}
	};
	//loginService(json, OTP);
	loginService(json);
}

//forgotpass starts
function loadForgot(){
	onDeviceReady();
	if (window.matchMedia("(max-width: 767px)").matches){
		loginShowconfirmmsg(login_messages.noallowedformobile, confirm_Error, 5000, "", false, false);
	} else {
		forgotswitchacctypeevent();
		forgotEvent();
		forgotredLogin();
		var url = window.location.href;
		var link = url.split("?");
		var acctype = link[1].replace("t=","");
		acctype = acctype.replace("&u=1","");
		if(acctype == "B" || link[1] == "B"){
			if (acctype == "B") {
				$("#corporateid").val(localStorage._zu);
			}
				$("#lidataroomfotgot").click();
		} else {
			if(acctype == "I" || link[1] == "I"){
				$("#corporateid").val("0");
			}
				$("#lipersonalfolderforgot").click();
		}
	}
	$('#loginidforgot').focus();
}

function forgotCommon(){
	var loginid = $("#loginidforgot").val();
	var corporateid = $("#corporateidforgot").val();
	if(document.getElementById("divcorporateidforgot").style.display=="none"){
		corporateid = "0";
	}
	if(loginid.trim().length == 0 || !validateEmail(loginid)){
		loginShowconfirmmsg(login_messages.enterloginid, confirm_Error, 5000, "", false, false);
	} else if(corporateid.trim().length == 0 && document.getElementById("divcorporateidforgot").style.display!="none"){
		loginShowconfirmmsg(login_messages.entercorporateid, confirm_Error, 5000, "", false, false);
	} else {
		var dvcid = loginid.toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
		var posturl = forgotpass;
		posturl = posturl.replace("<LAWFIRMNUMBER>", corporateid);
		posturl = posturl.replace("<DEVICEID>", dvcid);
		posturl = posturl.replace("<DEVICETYPE>", "desktop");
		posturl = posturl.replace("<LOGINID>", loginid);
		posturl = posturl.replace("<ACTION>", "forgotpassServiceAfter");
		forgotpassService(posturl);
	}
}
//forgotpass ends

//changepass starts
function changepassCommon() {
	var json = {};
	var oldpass = $("#oldpassword").val();
	var newpass = $("#newpassword").val();
	var confirmpass = $("#confirmpassword").val();
	if(newpass.trim().length == 0 || !checkPasswordStrength(newpass)){
		loginShowconfirmmsg(login_messages.enternewpassword, confirm_Error, 5000, "", false, false);
	} else if (confirmpass.trim() != newpass.trim()) {
		loginShowconfirmmsg(login_messages.enternewconfirmpass, confirm_Error, 5000, "", false, false);
	} else if (oldpass.trim() == newpass.trim()) {
		loginShowconfirmmsg(login_messages.newpasssameasoldpass, confirm_Error, 5000, "", false, false);
	} else {
		var url = window.location.href;
		if(url.indexOf("&a") > 0){
			var userId = url.split("&")[1].split("=")[1];
			var lawfirmId = url.split("&")[2].split("=")[1];
			var key = url.split("&")[3].split("=")[1];
			json = {
				"deviceId":"",
				"password":oldpass,
				"newPassword":newpass,
				"lawFirmNumber":lawfirmId,
				"userLoginId":"",
				"userId":userId,
				"activated":1,
				"key":key
			};
		}else{
			json = {
				"deviceId":localStorage._zq,
				"password":oldpass,
				"newPassword":newpass,
				"lawFirmNumber":localStorage._zw,
				"userLoginId":localStorage._zy,
				"userId":localStorage._zv,
				"activated":0
			};
		}
		changepassService(json);
	}
}
//changepass ends

function loginotpget(data){
	$("#span_login_id_otp").html(trimString($("#loginid").val().trim()));

	$("#img_auth_qr_code").hide();
	$("#div_error_auth").hide();
	$("#div_error_auth_options").hide();
	$("#checkbox_authenticator").prop("checked", false);
	$("#checkbox_email_auth").prop("checked", false);
	$("#div_otp_text").show();
	$("#img_login_id_otp_message").show();
	$("#span_login_id_otp_message").show();

	if(data.indexOf("#") > 0){
		var qrcode = data.substring(data.indexOf("#")+2);
		$("#img_auth_qr_code").attr("src", qrcode);
		$("#img_auth_qr_code").show();
		$("#div_error_auth").show();
		data = data.substring(0, data.indexOf("#"));
		$("#img_auth_qr_code").attr("data-auth", 1);
	} else {
		var start = new Date;
		timerlogininterval = setInterval(function() {
			var timer = parseInt((new Date - start) / 1000);
			$('#span_timer_login_save_otp').html((otptimer-timer) + " Seconds   ");
			if((otptimer-timer) <= 0){
				clearInterval(timerlogininterval);
				$("#div_resend_otp").show();
				$('#span_timer_login_save_otp').html("OTP Expired");
			} else {
				$("#div_resend_otp").hide();
			}
		}, 1000);
	}
	$("#span_login_id_otp_message").html(data);
	showActionPopup("divotpmodal", false);
	$('#txt_otp').focus();
}

function loginresetfieldsonly(){
	loginpopulateaccountlist();
	if(window.location.href.indexOf("?a=view&") > 0 || window.location.href.indexOf("?dfd=") > 0){
		loginCheckFileFolderView();
	} else {
		$("#loginid").val("");
		$("#password").val("");
		$("#corporateid").val("");
	}
	$("#logincaptcha").val("");
	loginCommonEvents(true);
}

function loginCheckAndPopulateCachedAccount(){
	loginresetfieldsonly();
	if(localStorage._zm != null && localStorage._zm.length>0){
		corporatelistarr = JSON.parse(valdec(localStorage._zm));
		if(corporatelistarr != null && corporatelistarr.length>0){
			$("#loginid").val(corporatelistarr[0].value._zy);
			$("#corporateid").val(corporatelistarr[0].value._zu);
		}
	}
}

function loginpopulateaccountlist(){
	$("#login_linkallacccounts").hide();
	$("#divdrive").hide();
	if(localStorage._zm != null && localStorage._zm.length>0){
		$("#divloginaccountslist").show();
		$("#divlogin").hide();
		corporatelistarr = JSON.parse(valdec(localStorage._zm));
		if(window.location.href.indexOf("&u=1") > 0){
			$("#divlogin").show();
			$("#divdrive").hide();
			$("#divloginaccountslist").hide();
		}

		var vmstr = "<span href='javascript:void(0);' class='dropdown-item nohover' style='padding:0px 15px 0px 15px;color:#fff;cursor:pointer;margin-bottom:4px;margin-top:10px;height:32px;' id='p_addaccount_login'>";
		vmstr += "<div style='float:left;width:100%;'>";
		vmstr += "<div style='float:left;width:95%;'>Add Account</div>";
		vmstr += "<div style='float:left;width:5%;'>";
		vmstr += "<img src='assets/img/plus_icon.png' alt='' title='remove account' style='height:19px; width:19px; margin-right: 5px;cursor:pointer;'>";
		vmstr += "</div>";
		vmstr += "</div>";
		vmstr += "</span>";
		vmstr += "<hr style='background-color: #fff !important;'>";

		$("#divloggedinacclist").html("");
		$("#divloggedinacclist").append(vmstr);

		for(var i=corporatelistarr.length-1;i>=0;i--){
			//add account list to sweitch account display list
			var str = "<span href='javascript:void(0);' class='dropdown-item nohover' style='padding:0px 15px 0px 15px;color: #fff;cursor: pointer; margin-bottom: 4px; margin-top: 10px;height:62px;' id='divloggedinaccountlist_"+corporatelistarr[i].id+"'>";
				str += "<div style='float:left;width:100%;'>";
					var dm = corporatelistarr[i].value._zo;
					dm = (dm.length > 20 ? (dm.substring(0, 20)+"...") : dm);
					str += "<div style='float:left;width:80%;' id='divloggedinacc_"+corporatelistarr[i].id+"' title='"+corporatelistarr[i].value._zo+"'>";
						if(corporatelistarr[i].value._zs == "I"){
							if(corporatelistarr[i].value._zk != undefined && corporatelistarr[i].value._zk != null &&
								corporatelistarr[i].value._zk != "null" && corporatelistarr[i].value._zk != "") {
								str += corporatelistarr[i].value._zk+"<br>";
							} else {
								str += corporatelistarr[i].value._zy+"<br>";
							}
						} else {
							str += corporatelistarr[i].value._zy+"<br>";
						}
						if(corporatelistarr[i].value._zs == "I"){
							str += "&nbsp;<br>";
							str += "&nbsp;<br>";
						} else {
							str += dm+"<br>";
							str += corporatelistarr[i].value._zu+"<br>";
						}
					str += "</div>";
					str += "<div style='float:left;width:20%;text-align:end;'>";
						str += "<img src='assets/img/minus_icon.png' alt='' title='remove account' style='float:right;height:19px;width:19px;margin-right:5px;cursor:pointer;' id='divloggedinacc_remove_"+corporatelistarr[i].id+"'> ";
						if(i==corporatelistarr.length-1){
							str += "<br>Default";
						}
						if(corporatelistarr[i].value._zz == "" && corporatelistarr[i].id != uniqueidentifieracclist()){
							if(i<corporatelistarr.length-1) str += "<br><br><span id='singnedOut'>Signed Out</span>";
							else str += "<br><span id='singnedOut'>Signed Out</span>";
						}
					str += "</div>";
				str += "</div>";
			str += "</span>";
			str += "<hr style='background-color: #fff !important;' id='divloggedinacc_hr_"+corporatelistarr[i].id+"'>";
			$("#divloggedinacclist").append(str);
			loginSwitchAccountEvent(corporatelistarr[i].id);
		}
		if(corporatelistarr.length>3){
			$("#divloggedinacclist").css("border-top-right-radius", "0px");
			$("#divloggedinacclist").css("border-bottom-right-radius", "0px");
		} else {
			$("#divloggedinacclist").css("border-top-right-radius", "20px");
			$("#divloggedinacclist").css("border-bottom-right-radius", "20px");
		}
		$("#login_linkallacccounts").show();
		$("#btnlogin").css("margin-left", "15%");
	} else {
		$("#loginid").val("");
		$("#password").val("");
		$("#corporateid").val("");
		$("#logincaptcha").val("");
		loginCommonEvents(true);
		$("#divloginaccountslist").hide();
		$("#divlogin").show();
		$("#login_linkallacccounts").hide();
		$("#btnlogin").css("margin-left", "40%");
	}
}

function loginswitch(id){
	var vm = null;
	if(localStorage._zm != null && (localStorage._zm).length > 0 && localStorage._zm != "null"){
		var corplist = JSON.parse(valdec(localStorage._zm));
		for(var i=0;i<corplist.length;i++){
			if(id == corplist[i].id){
				vm = corplist[i];
				acclistcurrlogin = i;
				break;
			}
		}
	}

	if(vm != null && vm.value._zz != null && (vm.value._zz).length > 0 && vm.value._zz != "null"){
		fetchdeviceid(vm.value._zz);
	} else if(vm != null && vm.value._zz == "" && vm.id == uniqueidentifieracclist()){
		loadLogin();
	} else {
		$("#loginid").val("");
		$("#password").val("");
		$("#corporateid").val("");
		$("#logincaptcha").val("");
		loginCommonEvents(true);
		$("#divloginaccountslist").hide();
		$("#divlogin").show();
		if(vm != null && (vm.value._zu != null && (vm.value._zu).length > 0 && vm.value._zu != "null")) {
			if(vm.value._zs == "I"){
				$("#lipersonalfolder").click();
			} else {
				$("#lidataroom").click();
			}
			$("#loginid").val(vm.value._zy);
			$("#corporateid").val(vm.value._zu);
		}
		$('#loginid').focus();
	}
}

function loginShowAllcounts(){
	$("#divloginaccountslist").show();
	$("#divdrive").hide();
	$("#divlogin").hide();
	$("#disclaimerpopup").hide();

}

function loginCheckFileFolderView(){
	var idcheck = "";
	//for file view
	//if for download link
	if(window.location.href.indexOf("?dfd=") > 0){
		idcheck = (window.location.href).substring((window.location.href).indexOf("_")+1);
		idcheck = (idcheck).substring(0, idcheck.indexOf("_"));
	} else if(window.location.href.indexOf("?a=view&") > 0){
		idcheck = (window.location.href).substring((window.location.href).lastIndexOf("&e="));
		idcheck = idcheck.replace("&e=", "");
	}
	var found = false;
	corporatelistarr = JSON.parse(valdec(localStorage._zm));
	for(var i=corporatelistarr.length-1;i>=0;i--){
		if(corporatelistarr[i].value._zw == idcheck){
			found = true;
			if(corporatelistarr[i].value._zz != null && (corporatelistarr[i].value._zz).length > 0 && corporatelistarr[i].value._zz != "null"){
				handleRefresh();
			} else {
				loginswitch(corporatelistarr[i].id);
			}
			break;
		}
	}
	if(!found){
		loginswitch(-1);
	}
}

function loginWithSignedinYes(){
	localStorage._zt=1;
	localStorage._rm = true;
	var password = trimString($("#password").val());
	var loginid = trimString($("#loginid").val());
	var corporateid = trimString($("#corporateid").val());
	localStorage.setItem("_zy", loginid.trim());
	admAddAccount(uniqueidentifieracclist());
	if($("#corporateid").is(":hidden")){
		localStorage._zu = "";
	} else {
		localStorage.setItem("_zu", corporateid.trim());
	}
	handleRefresh();
	hideActionPopup("disclaimerpopup");
}

function loginWithSignedinNo(){
	localStorage._zt=0;
	localStorage._rm = false;
	$("#login_rememberme").attr('checked', false);
	$("#password").val("");
	$("#loginid").val("");
	$("#corporateid").val("");
	handleRefresh();
	hideActionPopup("disclaimerpopup");
	admAddAccount(uniqueidentifieracclist());
}

function disclaimerPopupifAvailable(){
	if(loginglobalvariable.timerinterval != null) clearInterval(loginglobalvariable.timerinterval);
		if(disclaimerMessage != null){
		$("#disclaimerpopupheader").html(disclaimerTitle);
		$("#disclaimermsg").html(disclaimerMessage);
		showActionPopup("disclaimerpopup", false);
	} else{
		callRememberme();
	}
}

function callRememberme(){
	if(signedinno){
		loginWithSignedinNo();
	} else if(signedinyes){
		loginWithSignedinYes();
	}
}

function disclaimerPopupifAvailableforRememberme(){
	if(loginglobalvariable.timerinterval != null) clearInterval(loginglobalvariable.timerinterval);
	if(disclaimerMessage != null){
		$("#disclaimerpopupheader").html(disclaimerTitle);
		$("#disclaimermsg").html(disclaimerMessage);
		loginstaysignedinevent();
		showActionPopup("disclaimerpopup", false);
		$("#disclaimermodalbody").scrollTop(0);
	} else{
		handleRefresh();
	}
}

function loginPrepareAccounts(id){
	var rec = null;
	if(localStorage._zm != null && (localStorage._zm).length > 0 && localStorage._zm != "null"){
		corplist = JSON.parse(valdec(localStorage._zm));
		for(var i=corplist.length-1;i>=0;i--){
			if(id == corplist[i].id){
				rec = corplist[i];
				acclistcurrlogin = i;
				break;
			}
		}
	}
	$("#loginid").val("");
		$("#password").val("");
		$("#corporateid").val("");
		$("#logincaptcha").val("");
		loginCommonEvents(true);
		if(rec != null && (rec.value._zu != null && (rec.value._zu).length > 0 && rec.value._zu != "null")) {
			if(rec.value._zs == "I"){
				$("#lipersonalfolder").click();
			} else {
				$("#lidataroom").click();
			}
			$("#loginid").val(rec.value._zy);
			$("#corporateid").val(rec.value._zu);
			loginpopulateaccountlist();
			$("#login_linkallacccounts").show();
			$("#btnlogin").css("margin-left", "15%");
		}
		$("#divloginaccountslist").hide();
		$("#divdrive").hide();
		$("#divlogin").show();
		$('#loginid').focus();
		hideActionPopup("disclaimerpopup");

}

function fingerprintJS(){
	try{
	  	FingerprintJS.load().then(fp => {
	  		// The FingerprintJS agent is ready.
	  		// Get a visitor identifier when you'd like to.
			fp.get().then(result => {
				// This is the visitor identifier:
				_tdfrt = result.visitorId;
				loadLogin();
			});
	  	});
  	}catch(error){
		_tdfrt = "";
		loadLogin();
  	}
}
function chagepassstatuschange(source){
		var sm = {"attribute1":"changepassStatusServiceAfter"};
		changepassStatusService(sm, source);
}