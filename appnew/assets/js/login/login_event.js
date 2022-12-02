	var signedinno = false;
	var signedinyes = false;
function viewPasswordEvent(){
	unbindobject("#pass-status");
	$("#pass-status").bind("click", function(event){
		viewPassword('password', 'pass-status');
		return false;
	});
}

function loginswitchacctypeevent(){
	unbindobject("#lipersonalfolder");
	$("#lipersonalfolder").bind("click", function(event){
		loginswitchacctype("lipersonalfolder", "lidataroom");
		$("#divcorporateid").hide();
		$('#loginid').focus();
		return false;
	});

	unbindobject("#lidataroom");
	$("#lidataroom").bind("click", function(event){
		loginswitchacctype("lidataroom", "lipersonalfolder");
		$("#divcorporateid").show();
		$('#loginid').focus();
		enterEvent();
		return false;
	});
}

function loginEvent(){
	unbindobject("#btnlogin");
	$("#btnlogin").bind("click", function(event){
		loginCommon();
		return false;
	});

	unbindobject("#link_domain");
	$("#link_domain").bind("click", function(event){
		window.location.href = redirectDomain;
		return false;
	});

	unbindobject("#link_doaminaccess");
	$("#link_doaminaccess").bind("click", function(event){
		window.location.href = redirectDomain;
		return false;
	});

	unbindobject("#btn_domainnotif");
	$("#btn_domainnotif").bind("click", function(event){
		$("#div_doaminnotif").hide();
	});
}

function loginSendSignUp(){
	unbindobject("#btnsignup");
	$("#btnsignup").bind("click", function(event){
		window.location.href="https://www.dcirrus.io/register/";
		return false;
	});
}

//forgotpassword starts
function forgotswitchacctypeevent(){
	unbindobject("#lipersonalfolderforgot");
	$("#lipersonalfolderforgot").bind("click", function(event){
		loginswitchacctype("lipersonalfolderforgot", "lidataroomfotgot");
		$("#divcorporateidforgot").hide();
		loginForgotPasswordEnterKeyEvent();
		$('#loginidforgot').focus();
		return false;
	});

	unbindobject("#lidataroomfotgot");
	$("#lidataroomfotgot").bind("click", function(event){
		loginswitchacctype("lidataroomfotgot", "lipersonalfolderforgot");
		$("#divcorporateidforgot").show();
		loginForgotPasswordEnterKeyEvent();
		$('#loginidforgot').focus();
		return false;
	});
}

function forgotEvent(){
	unbindobject("#btnforgot");
	$("#btnforgot").bind("click", function(event){
		forgotCommon();
		return false;
	});
}

function forgotredLogin(){
	unbindobject("#btnlogin");
	$("#btnlogin").bind("click", function(event){
		var acctype = "I";
		if($("#corporateidforgot").is(":visible")){
			acctype = "B";
		}
		loadloginurlaccordingtoUserType(acctype);
	});
}
//forgotpass ends

//changepassword starts
function changepassEvent(){
	onDeviceReady();
	fetchUserStatusService();

	var url = window.location.href;
	if(url.indexOf("&a") > 0){
		var lawfirmIdq = url.split("&")[2].split("=")[1];
		fetchLogoService(lawfirmIdq);
	} else {
		fetchLogoService();
	}
	unbindobject("#btnchangepass");
	$("#btnchangepass").bind("click", function(event){
		changepassCommon();
		return false;
	});

	unbindobject("#btnlogin");
	$("#btnlogin").bind("click",function(event){
		chagepassstatuschange("changepass");
	});

	unbindobject("#btn_changepass_profile");
	$("#btn_changepass_profile").bind("click", function(event){
		window.location.href="changepassword.html";
		return false;
	});

	unbindobject("#pass-status-old");
	$("#pass-status-old").bind("click", function(event){
		viewPassword('oldpassword', 'pass-status-old');
		return false;
	});

	unbindobject("#pass-status-new");
	$("#pass-status-new").bind("click", function(event){
		viewPassword('newpassword', 'pass-status-new');
		return false;
	});

	unbindobject("#pass-status-confirm");
	$("#pass-status-confirm").bind("click", function(event){
		viewPassword('confirmpassword', 'pass-status-confirm');
		return false;
	});

	$('#oldpassword').passtrength({
		minChars: 6,
		passwordToggle: true,
		tooltip: true
	});

	$('#newpassword').passtrength({
		minChars: 6,
		passwordToggle: true,
		tooltip: true
	});
	$('#confirmpassword').passtrength({
		minChars: 6,
		passwordToggle: true,
		tooltip: true
	});

	$('#oldpassword, #newpassword, #confirmpassword').keypress(function (e) {
		var key = e.which;
	 	if(key == 13){ // the enter key code
	    	$('#btnchangepass').click();
	    	return false;
	  	}
	});
	
	if(window.location.href.indexOf("&s=forgot") > 0){
		$('#change_password_label').html("Reset Your Password");
		$('#btnlogin').hide();
		$('#passOld').hide();
		$('#newpassword').focus();
	}else if(window.location.href.indexOf("&a") > 0){
		$('#change_password_label').html("Set Password To Activate Your Account");
		$('#btnlogin').hide();
		$('#passOld').hide();
		$('#newpassword').focus();
	}else{
		$('#change_password_label').html("Change password");
		$('#passOld').show();
		$('#oldpassword').focus();
	}
	document.querySelector('.cont_principal').className= "cont_principal cont_error_active";
	setTimeout(function(){
		document.getElementById("clogoimg").style.display="";
	}, 500);
	let cssVareusrle1 = $("#ele1")
	cssVareusrle1.css({ 'font-size': '70px' });
	let cssVareusrle2 = $("#ele2")
	cssVareusrle2.css({ 'font-size': '18px' });
}
//changepassword ends

//Enter Key Event STRAT HERE FOR LOGIN
function enterEvent(){
 $('#loginid,#password,#corporateid,#logincaptcha').keypress(function (e) {
  var key = e.which;
  if(key == 13)  // the enter key code
   {
   		$(this).attr("disabled", true);
   		$("#btnlogin").click();
   	}
   	e.stopImmediatePropagation();
 });

 unbindobject("#txt_otp");
 $("#txt_otp").bind("click", function (event) {
 	var enterkey = event.which;
 	if (enterkey == 13) // the enter key code
 	{
 		$(this).attr("disabled", true);
 		$("#btnotpverify").click();
 	}
 	e.stopImmediatePropagation();
 });

}

//Enter Key Event END HERE

function loginstaysignedinevent(){
	unbindobject("#btndisaccept");
	$("#btndisaccept").bind("click", function(event){
		$("#password").val("");
		disclaimerAcceptorDeclaineService("1");
	});

	unbindobject("#btndisdecline");
	$("#btndisdecline").bind("click", function(event){
		disclaimerAcceptorDeclaineService("2");
	});


	unbindobject("#btnstaysignedinno");
	$("#btnstaysignedinno").bind("click", function(event){
		localStorage._rm = false;
		signedinno = true;
		disclaimerPopupifAvailable();
		hideActionPopup("divstaysignedinmodal");
	});

	unbindobject("#btnstaysignedinyes");
	$("#btnstaysignedinyes").bind("click", function(event){
		localStorage._zt=1;
		localStorage._rm = true;
		admAddAccount(uniqueidentifieracclist());
		signedinyes = true;
		disclaimerPopupifAvailableforRememberme();
		hideActionPopup("divstaysignedinmodal");
	});


	unbindobject("#btnotpcancel");
	$("#btnotpcancel").bind("click", function(event){
		clearVariablesLoginScreen();
        base64auth = "";
        hideActionPopup("divotpmodal");
	});

	unbindobject("#btnotpverify");
	$("#btnotpverify").bind("click", function(event){
		if(trimString($("#txt_otp").val()).length == 0){
			showMessageErrorLogin(login_messages.enterotp, confirm_Error);
		// } else if(trimString($("#txt_otp").val()).length > 6) {
		// 	showMessageErrorLogin(login_messages.ritchedmaxlimit, confirm_Error);
		} else {
			loginmatchOTPService(trimString($("#txt_otp").val()));
		}
	});

	unbindobject("#link_resned_otp");
	$("#link_resned_otp").bind("click", function(event){
		loginsendotpCommon($("#img_auth_qr_code").attr("data-auth"));
	});

	unbindobject("#link_error_auth");
	$("#link_error_auth").bind("click", function(event){
		$("#div_error_auth_options").show();
		$("#div_error_auth").hide();
		$("#div_otp_text").hide();
		$("#img_auth_qr_code").hide();
		$("#img_login_id_otp_message").hide();
		$("#span_login_id_otp_message").hide();
	});

	unbindobject("#checkbox_authenticator");
	$("#checkbox_authenticator").bind("click", function(event){
		if($(this).is(":checked")){
			$("#checkbox_email_auth").prop("checked", false);
			$("#div_error_auth_options").hide();
			$("#div_error_auth").show();
			$("#txt_otp").val("");
			$("#txt_otp").focus();
			$("#div_otp_text").show();
			$("#img_auth_qr_code").show();
			$("#img_auth_qr_code").attr("src", "");
			$("#img_login_id_otp_message").show();
			$("#span_login_id_otp_message").show();
		}
	});

	unbindobject("#checkbox_email_auth");
	$("#checkbox_email_auth").bind("click", function(event){
		if($(this).is(":checked")){
			$("#checkbox_authenticator").prop("checked", false);
			$("#div_error_auth_options").hide();
			$("#img_auth_qr_code").hide();
			$("#div_error_auth").show();
			$("#txt_otp").val("");
			$("#txt_otp").focus();
			$("#div_otp_text").show();
			$("#img_auth_qr_code").attr("src", "");
			loginsendotpCommon(1);
		}
	});
}
function loginForgotPass(){
	var acctype = "I";
	if($("#corporateid").is(":visible")){
		acctype = "B";
	}
	window.location.href='forgotpassword.html?t='+acctype+"&u=1";
}

function loginForgotPasswordEnterKeyEvent(){
	$('#loginidforgot,#corporateidforgot').keypress(function (e) {
 		var key = e.which;
 		if(key == 13)  // the enter key code
  		{
			e.stopImmediatePropagation();
    		$('#btnforgot').click();
    		return false;
  		}
		e.stopPropagation();
	});
}

function loadloginurlaccordingtoUserType(acctype){
 		var url = window.location.href;
		var link = url.split("?");
		window.location.href = 'drive.html?t='+acctype+"&u=1";
		return false;
 }

function loginAddAccountEvent(){
	unbindobject("#p_addaccount_login");
 	$("#p_addaccount_login").bind("click",function(event){
		loginswitch(-1);
 	});
}

 function loginSwitchAccountEvent(id){
 	unbindobject("#divloggedinacc_"+id);
 	$("#divloggedinacc_"+id).bind("click",function(event){
 		var id = $(this).attr("id");
 		var idm = id.replace("divloggedinacc_", "");
 		loginswitch(idm);
 	});

 	unbindobject("#divloggedinacc_remove_"+id);
	 $("#divloggedinacc_remove_" + id).bind("click", function (event) {
		localStorage._rm = false;
		 var id = $(this).attr("id");
		 var idm = id.replace("divloggedinacc_remove_", "");
		 var corpls = JSON.parse(valdec(localStorage._zm));
		 for (var i = corpls.length - 1; i >= 0; i--) {
			 if (idm == corpls[i].id) {
				 token = corpls[i].value._zz;
				 acclistcurrlogin = i;
				 break;
			 }
		 }
		 var exists = has_text($('#singnedOut'), 'Signed Out');
		 if (!exists) {
			 logOutServiceSingle(token);
		 }
		 loginRemoveAccount(idm, true);
		 loginresetfieldsonly();
	 });
}

// function checkLengthOfOtp()
// {
//     var fieldLength = document.getElementById('txt_otp').value.length;
//     //Suppose u want 6 number of character
//     if(fieldLength <= 6){
//         return true;
//     }
//     else
//     {
//         showMessageErrorLogin(login_messages.ritchedmaxlimit, confirm_Error);
//     }
// }