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
		return false;
	});

	unbindobject("#lidataroom");
	$("#lidataroom").bind("click", function(event){
		loginswitchacctype("lidataroom", "lipersonalfolder");
		//$("#divcorporateid").show();
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
		return false;
	});

	unbindobject("#lidataroomfotgot");
	$("#lidataroomfotgot").bind("click", function(event){
		loginswitchacctype("lidataroomfotgot", "lipersonalfolderforgot");
		//$("#divcorporateidforgot").show();
		loginForgotPasswordEnterKeyEvent();
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

	$('#newpassword, #confirmpassword').keypress(function (e) {
		var key = e.which;
	 	if(key == 13){ // the enter key code
	    	$('#btnchangepass').click();
	    	return false;
	  	}
	});
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
		signedinno = true;
		disclaimerPopupifAvailable();
		hideActionPopup("divstaysignedinmodal");
	});

	unbindobject("#btnstaysignedinyes");
	$("#btnstaysignedinyes").bind("click", function(event){
		localStorage._zt=1;
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
		} else {
			loginmatchOTPService(trimString($("#txt_otp").val()));
		}
	});

	unbindobject("#link_resned_otp");
	$("#link_resned_otp").bind("click", function(event){
		loginsendotpCommon();
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
 	$("#divloggedinacc_remove_"+id).bind("click",function(event){
 		var id = $(this).attr("id");
 		var idm = id.replace("divloggedinacc_remove_", "");
 		loginRemoveAccount(idm, true);
 		loginresetfieldsonly();
 	});
}