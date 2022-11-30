var admin_user_picture = "";
var contact_id = 0;
var admin_savedwithpicture = 0;
var lastipindex = 0;
var usersearch = [];
var liveusersearch = [];
var pendingdivsearch = "";
var blockeddivsearch = "";
var approveddivsearch = "";
var searchdone = 0;
var liveusersearchdone = 0;
var admin_comments = [];
var watermarkColor = 0;
var adminsessioncheckcalled = false;
var adminsessioncheckstarted = false;

/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromAdmin(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	if(admbaseauth == ""){
		window.location.href = "error.html";
	} else {
		invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
	}
}

/**
 * method to call show confirm message
 * @param txt
 * @param type
 * @param duration
 * @param targetdvid
 * @returns {Boolean}
 */
function adminShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm)
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

function adminCommonEvents(){
	fetchLogo();
	adminUpdateLogoEvent();
	onDeviceReady();
	//Tanmay
	adminManageUserClickEvent();
	adminUserEvent();
	adminrefreshEvent();
	//Tukuna
	adminCorporateEvent();
	//Tukuna and Tanmay
	adminDeviceEvent();
	adminSerachEvents();
	disablecopypaste();
	adminIpAddEvent();
	adminSeachDeviceEvent();
	adminSearchUser();
	adminPaymentEvents();
	adminUpdateExpiryDate();
	admin_resetpasswordenterkey();
	adminCursorPointInTextField();
	adminDataroomClosureOpenForm();
	adminRedirectHomePage();
	checkPageCorpLogoChange();
	adminDisabledDisclamerDetailsOnNever();
	adminMultiUserEvent();
	$(".inputClass,.inputClass1").attr("autocomplete", "off");
	if(localStorage._zs == "I") {
		$("#searchuserchoice").hide();
	}

	var input = $("#txt_adduser_phone");
	input.intlTelInput(	{
		separateDialCode: true
	});

	input.on("countrychange", function() {
		input.val('')
	});

	$(".iti--allow-dropdown").css("width", "100%");

	var input = $("#mmobilenumber");
	input.intlTelInput(	{
		separateDialCode: true
	});

	input.on("countrychange", function() {
		input.val('')
	});

	$(".iti__selected-flag").css("max-width", "75px");


	/**
	 * Clearable text inputs
	 */
	$(".clearable").each(function() {

	  var $inp = $(this).find("input:text"),
	      $cle = $(this).find(".clearable__clear");

	  $inp.on("input", function(){
	    $cle.toggle(!!this.value);
	  });

	  $cle.on("touchstart click", function(e) {
	    e.preventDefault();
	    $inp.val("").trigger("input");
	  });

	});
	document.addEventListener('click', function (e) {
		adminStorageCheckSessionService();
	});

	if(localStorage._zn==3){
		$("#div_admin_close_dataroom").show();
	} else {
		$("#div_admin_close_dataroom").remove();
	}
}

function adminShowAddUser(){
	admin_user_picture = "";
	admin_savedwithpicture = 0;
	clearUserSearch();
	$("#userprfimg").attr("src", "assets/icons/Layer_1336.png");
	$('#mg_user').hide();
	$('#btnuser').hide();
	$('#adduser').show();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#admin_searchbar").hide();
	var userid = document.getElementById("adduser").getAttribute("data-id")+"";
	$("#txt_adduser_firstname").val("");
	$("#txt_adduser_middlename").val("");
	$("#txt_adduser_lastname").val("");
	$("#txt_adduser_loginid").val("");
	$("#txt_adduser_phone").val("");
	$("#txt_companyname").val("");
	//$("#txt_adduser_fax").val("");
	$("#chk_adduser_admin").prop("checked", false);
	$("#chk_adduser_user").prop("checked", true);
	$("#chk_adduser_sync_dataroom").prop("checked", false);
	$("#chk_adduser_sync_personal").prop("checked", true);
	$("#chk_adduser_autologin").prop("checked", true);
	$("#chk_adduser_module_drive").prop("checked", true);
	$("#chk_adduser_module_admin").prop("checked", false);
	$("#chk_adduser_usb").prop("checked", false);
	$("#chk_adduser_dvd").prop("checked", false);

	$('#txt_adduser_loginid').removeAttr("readonly");
	$('#chk_adduser_sync_dataroom').removeAttr("disabled");
	$('#chk_adduser_sync_personal').removeAttr("disabled");
	$('#chk_adduser_module_admin').removeAttr("disabled");
	$('#chk_adduser_admin').removeAttr("disabled");
	$('#chk_adduser_user').removeAttr("disabled");

	$("#txt_adduser_firstname").removeAttr("readonly");
	$("#txt_adduser_middlename").removeAttr("readonly");
	$("#txt_adduser_lastname").removeAttr("readonly");
	$("#txt_adduser_loginid").removeAttr("readonly");
	$("#txt_adduser_phone").removeAttr("readonly");
	$("#chk_adduser_admin").removeAttr("disabled");
	$("#chk_adduser_user").removeAttr("disabled");
	$("#chk_adduser_sync_dataroom").removeAttr("disabled");
	$("#chk_adduser_sync_personal").removeAttr("disabled");
	$("#chk_adduser_autologin").removeAttr("disabled");
	$("#chk_adduser_module_drive").removeAttr("disabled");
	$("#chk_adduser_module_admin").removeAttr("disabled");
	$("#chk_adduser_usb").removeAttr("disabled");
	$("#chk_adduser_dvd").removeAttr("disabled");
	$("#txt_companyname").removeAttr("readonly");

	$("#admin_user_mobile").val("");
	$("#admin_user_whatsapp").val("");
	$("#admin_user_email").val("");
	$("#chk_user_mobile_security").prop("checked", false);
	$("#chk_user_whatsapp_security").prop("checked", false);
	$("#chk_user_email_security").prop("checked", false);
	$("#chk_user_auth_security").prop("checked", false);

	$("#user_last_login").val("");
	$("#user_created_on").val("");
	$("#more_info_div").hide();
	
	if(twofactorAuth == 1) {
		$("#admin_user_chk_two_factor_auth").prop("checked", true);
		$("#chk_user_email_security").prop("checked", true);
		$("#admin_user_chk_two_factor_auth").attr("disabled", true);
	} else {
		$("#admin_user_chk_two_factor_auth").prop("checked", false);
		$("#admin_user_chk_two_factor_auth").removeAttr("disabled");
	}

	$("#chk_user_mobile_security").removeAttr("disabled");
	$("#chk_user_whatsapp_security").removeAttr("disabled");
	$("#chk_user_email_security").removeAttr("disabled");
	$("#chk_user_auth_security").removeAttr("disabled");

	$("#admin_user_mobile").removeAttr("readonly");
	$("#admin_user_whatsapp").removeAttr("readonly");

	if(userid != "0"){
		$("#adduserconfirm").html("EDIT");
		adminPopulateUserDetailsService(userid);
	} else {
		$("#adduserconfirm").html("SAVE");
	}
}

function addUserBuildJSON(){
	var userId = document.getElementById("adduser").getAttribute("data-id");
	var contactid = document.getElementById("adduser").getAttribute("data-contact-id");
	var contactphoneid = document.getElementById("adduser").getAttribute("data-contact-phone-id");
	var contactfaxid = document.getElementById("adduser").getAttribute("data-contact-fax-id");
	var contactemailid = document.getElementById("adduser").getAttribute("data-contact-email-id");

	var objectData =
	{
		"id": contactid,
		"userId": userId,
		"firstName": $("#txt_adduser_firstname").val().replace(/ /g, ""),
		"middleName": $("#txt_adduser_middlename").val().replace(/ /g, ""),
		"lastName": $("#txt_adduser_lastname").val().replace(/ /g, ""),
		"fax": null,
		"companyName": $("#txt_companyname").val().replace(/ /g, ""),
		"website": "",
		"stateBar": "",
		"barId": "",
		"picture" : admin_user_picture,
		"status": "A",
		"contactPhoneList": [],
		"contactAddressList": [],
		"contactEmailList": [],
		"contactFaxList": []
	};

	if($("#txt_adduser_phone").val().length > 0){
		objectData.contactPhoneList.push(
		{
			"id" : contactphoneid,
			"contactId" : contactid,
			"countryCode" : $("#txt_adduser_phone").intlTelInput("getSelectedCountryData").dialCode,
			"phone" : $("#txt_adduser_phone").val(),
			"status" : "A",
			"type" :0,
			"phoneTypeDesc"	:  "Office",
			"primary" : 1
	   });
   	}

	/*if($("#txt_adduser_fax").val().length > 0){
		objectData.contactFaxList.push(
		{
			"id" : contactfaxid,
			"contactId" : contactid,
			"countryCode" : 0,
			"fax" : $("#txt_adduser_fax").val(),
			"status" : "A",
			"type" : 0,
			"faxTypeDesc":"Office",
			"primary":1
		});
	}*/

	objectData.contactEmailList.push(
	{
		"id" : contactemailid,
		"contactId" : contactid,
		"email" : $("#txt_adduser_loginid").val().replace(/ /g, ""),
		"status" : "A",
		"type" : 0,
		"emailTypeDesc"	: "Office",
		"primary" : 1
	});
	var userRoleSelected = 1;
	var typeCheckBox = "";
	if($("#chk_adduser_admin").is(":checked")){
	  	typeCheckBox = "ADMIN";
	  	userRoleSelected = 0;
	}else if($("#chk_adduser_user").is(":checked")){
	  	typeCheckBox = "USER";
	}

	var syncType = "P";
	if($("#chk_adduser_sync_dataroom").is(":checked")){
		syncType = "S";
	} else if($("#chk_adduser_sync_personal").is(":checked")){
		syncType = "P";
	}

	var autoLogin = "0";
	if($("#chk_adduser_autologin").is(":checked")){
		autoLogin = "1";
	}

	var otpid = 1;
	var carrieeridentifier = "";
	var otpstatus = "I";
	if($("#admin_user_chk_two_factor_auth").is(":checked")){
		otpstatus = "A";
		otpid = $("input[name='radiosecurity']:checked").val();
		if(otpid == 1 || otpid == 2){
			var code = $("#txt_adduser_phone").intlTelInput("getSelectedCountryData").dialCode;
			carrieeridentifier = "+"+code+"-"+$("#txt_adduser_phone").val();
		} else if(otpid == 3 || otpid == 4){
			carrieeridentifier = $("#txt_adduser_loginid").val();
		}
	}


	var sm = null;
	var userid = document.getElementById("adduser").getAttribute("data-id")+"";

	var userotpdto =
	{
		"otpId": otpid,
		"userId": userid,
		"status": otpstatus,
		"carrieIdentifier": carrieeridentifier
	};
	 if(userid == "0"){
		sm = {
			"lawFirmId": localStorage._zw,
			"userRoleId": userRoleSelected,
			"type": typeCheckBox,
			"role": 0,
			"loginId": $('#txt_adduser_loginid').val().replace(/ /g, ""),
			"action":"adminAddUserServiceAfter",
			"contactsDto": objectData,
			"billingRate": 0,
			"emailAcls": [],
			"moduleAcls": [],
			"deviceAcls": [],
			"expireDays":365,
			"syncType":syncType,
			"autoLogin":autoLogin,
			"fromAdmin":1,
			"accType":localStorage._zs,
			"userOTPDto":userotpdto
		};
	} else{
		sm = {
			"lawFirmId": localStorage._zw,
			"id": userId,
			"userRoleId": userRoleSelected,
			"type": typeCheckBox,
			"role": 0,
			"loginId": $('#txt_adduser_loginid').val().replace(/ /g, ""),
			"action":"adminAddUserServiceAfter",
			"contactsDto": objectData,
			"billingRate": 0,
			"emailAcls": [],
			"moduleAcls": [],
			"deviceAcls": [],
			"expireDays":365,
			"syncType":syncType,
			"autoLogin":autoLogin,
			"userOTPDto":userotpdto
		};
	}

	if($("#chk_adduser_module_drive").is(":checked")){
		sm.moduleAcls.push(1);
	}
	if($("#chk_adduser_module_admin").is(":checked")){
		sm.moduleAcls.push(8);
	}

	if($("#chk_adduser_usb").is(":checked")){
		sm.deviceAcls.push(1);
	}
	if($("#chk_adduser_dvd").is(":checked")){
		sm.deviceAcls.push(2);
	}

	return sm;
}

function adminValidateUserAdd(){
	var firstName = $("#txt_adduser_firstname").val();
	var lastName = $("#txt_adduser_lastname").val();
	var loginid = $("#txt_adduser_loginid").val();
	var companyName = $("#txt_companyname").val();
	var adminchecked = $("#chk_adduser_admin").is(":checked");
	var userchecked = $("#chk_adduser_user").is(":checked");
	var dataroomsyncchecked = $("#chk_adduser_sync_dataroom").is(":checked");
	var personalsyncchecked = $("#chk_adduser_sync_personal").is(":checked");
	var drivemodulechecked = $("#chk_adduser_module_drive").is(":checked");
	var adminmodulechecked = $("#chk_adduser_module_admin").is(":checked");
	var otpid = 0;
	if(localStorage._zs == "B" && $("#admin_user_chk_two_factor_auth").is(":checked")){
		otpid = $("input[name='radiosecurity']:checked").val();
	}
	var ctd = "";
	if(otpid == 1 || otpid == 2) ctd = $("#txt_adduser_phone").val();
	else if(otpid == 3 || otpid == 4) ctd = loginid;

	if(firstName.trim().length == 0){
		adminShowconfirmmsg(Contact_Messages.enterFirstNameCN, confirm_Error, 5000, "", false, false);
		return false;
	} else 	if(lastName.trim().length == 0){
		adminShowconfirmmsg(Contact_Messages.enterLastNameCN, confirm_Error, 5000, "", false, false);
		return false;
	} else 	if(loginid.trim().length == 0 || !validateEmail(loginid)){
		adminShowconfirmmsg(Contact_Messages.enterValidLoginCN, confirm_Error, 5000, "", false, false);
		return false;
	} else 	if(!adminchecked && !userchecked){
		adminShowconfirmmsg(admin_Messages.admin_selectadminuser, confirm_Error, 5000, "", false, false);
		return false;
	} else 	if(!dataroomsyncchecked && !personalsyncchecked){
		adminShowconfirmmsg(admin_Messages.admin_selectsynctype, confirm_Error, 5000, "", false, false);
		return false;
	} else 	if(!drivemodulechecked && !adminmodulechecked){
		adminShowconfirmmsg(admin_Messages.admin_selectmoduletype, confirm_Error, 5000, "", false, false);
		return false;
	} else if(twofactorAuth == 1 && localStorage._zs == "B" && (!$("#admin_user_chk_two_factor_auth").is(":checked") || otpid == 0 || ctd.trim().length == 0)){
		adminShowconfirmmsg(admin_Messages.admin_entertwofactor, confirm_Error, 5000, "", false, false);
		return false;
	} else if(localStorage._zs == "B" && $("#admin_user_chk_two_factor_auth").is(":checked") && (otpid == 0 || ctd.trim().length == 0)){
		adminShowconfirmmsg(admin_Messages.admin_entertwofactor, confirm_Error, 5000, "", false, false);
		return false;
	}  else if(companyName.trim().length == 0){
		adminShowconfirmmsg(Contact_Messages.enterCompanyNameCN, confirm_Error, 5000, "", false, false);
		return false;
	} else {
		return true;
	}
}

function resetClientData(){
	$("#admin_corporate_name").val("");
	$("#admin_s3_name").val("");
	$("#admin_corporate_firstname").val("");
	$("#admin_corporate_middlename").val("");
	$("#admin_corporate_lastname").val("");
	$("#admin_corporate_phone").val("");
	$("#admin_corporate_email").val("");
	$("#admin_corporate_fax").val("");
	$("#admin_corporate_place").val("");
	$("#admin_corporate_street").val("");
	$("#admin_corporate_city").val("");
	$("#admin_corporate_state").val("");
	$("#admin_corporate_zip").val("");
	$("#admin_corporate_country").val("");
	$("#admin_corporate_startdate").val("");
	$("#admin_corporate_expirydate").val("");
}

function adminFormatDateToDisplayUS(val) {
	var returnDate = "";
	if(val !=""){
		var dateMsg = moment(val).format('MM/DD/YYYY');
		returnDate = dateMsg;
	}
	return returnDate;
}

function adminFormatDateToServer(val) {
	var returnDate = "";
	if(val !=""){
		var dateMsg = moment(val).format('YYYY-MM-DD');
		returnDate = dateMsg;
	}
	return returnDate;
}

function adminSaveCorporateInfoJSON() {
	var editclientid = localStorage._zw;
	var s3id = document.getElementById('mg_corp').getAttribute("data-s3");
	var addrid = document.getElementById('mg_corp').getAttribute("data-addrid");
	var detailid = document.getElementById('admin_corporate_firstname').getAttribute("data-id");

	var currentDate = new Date(); // for now
	var currentTime = "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "Z";
	var startDate = adminFormatDateToServer($('#admin_corporate_startdate').val());
	var watermarkText = $('#admin_watermark_text').val();
	var watermarkDisplay = "0,0,0";
	if ($('#admin_chk_watermark_view').is(':checked')) {
		watermarkDisplay = "1";
	} else {
		watermarkDisplay = "0";
	}

	if ($('#admin_chk_watermark_download').is(':checked')) {
		watermarkDisplay = watermarkDisplay + ",1";
	} else {
		watermarkDisplay = watermarkDisplay + ",0";
	}

	if ($('#admin_chk_watermark_download_original').is(':checked')) {
		watermarkDisplay = watermarkDisplay + ",1";
	} else {
		watermarkDisplay = watermarkDisplay + ",0";
	}

	var showProjectIndexNo = 0;
	if ($('#admin_chk_prjindex_number').is(':checked')) {
		showProjectIndexNo = 1;
	}

	var twoFactorAuth = 0;
	if($('#admin_chk_two_factor_auth').is(':checked')){
		twoFactorAuth = 1;
	}

	var timeZone = $("#selectTimeZone").val();

	var watermarkDisplayTypeStright = "1";
	var watermarkDisplayTypeAcross = "1";
	var watermarkDisplayType;
	var watermarkDisplayFlag = "0";
	if ($('#admin_chk_watermark_left').is(':checked')) {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",1";
		watermarkDisplayFlag = "1";
	} else {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",0";
	}

	if ($('#admin_chk_watermark_top').is(':checked')) {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",1";
		watermarkDisplayFlag = "1";
	} else {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",0";
	}

	if ($('#admin_chk_watermark_right').is(':checked')) {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",1";
		watermarkDisplayFlag = "1";
	} else {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",0";
	}

	if ($('#admin_chk_watermark_bottom').is(':checked')) {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",1";
		watermarkDisplayFlag = "1";
	} else {
		watermarkDisplayTypeStright = watermarkDisplayTypeStright + ",0";
	}

	if ($('#admin_chk_watermark_single').is(':checked')) {
		watermarkDisplayTypeAcross = "2,1";
	} else {
		watermarkDisplayTypeAcross = "2,0";
	}

	if ($('#admin_chk_watermark_multiple').is(':checked')) {
		watermarkDisplayTypeAcross = watermarkDisplayTypeAcross + ",1";
	} else {
		watermarkDisplayTypeAcross = watermarkDisplayTypeAcross + ",0";
	}

	if (watermarkDisplayFlag == "1") {
		watermarkDisplayType = watermarkDisplayTypeStright;
	} else {
		watermarkDisplayType = watermarkDisplayTypeAcross;
	}
    dis_title = $('#disclaimer_title').val();
	dis_type = $('#disclaimerfrequency').val();

	var params = {
		"id": editclientid,
		"clientName": $('#admin_corporate_name').val(),
		"startDate": startDate + currentTime,
		"lawFirmDetails": [],
		"lawFirmAddress": [],
		"serverUrl": cloudURLACT,
		"serviceServerUrl": cloudURLACT,
		"s3RegionId": s3id,
		"watermarkText": watermarkText,
		"watermarkDisplay": watermarkDisplay,
		"watermarkColor": watermarkColor,
		"showProjectIndexNo": showProjectIndexNo,
		"timeZone": timeZone,
		"watermarkDisplayType": watermarkDisplayType,
		"action": "adminSaveClientServiceAfter",
		"twoFactorAuth":twoFactorAuth,
		"rootAccesstoAllAdmins":rootAccesstoAllAdmins
	};

	params.lawFirmDetails.push({
		"id": detailid,
		"firstName": $('#admin_corporate_firstname').val(),
		"middleName": $('#admin_corporate_middlename').val(),
		"lastName": $('#admin_corporate_lastname').val(),
		"emailId": $('#admin_corporate_email').val(),
		"phone": $('#admin_corporate_phone').val(),
		"fax": $('#admin_corporate_fax').val(),
		"faxNumberExt": 0,
		"phoneNumberExt": 0
	});

	params.lawFirmAddress.push({
		"id": addrid,
		"street": $('#admin_corporate_street').val(),
		"city": $('#admin_corporate_city').val(),
		"state": $('#admin_corporate_state').val(),
		"place": $("#admin_corporate_place").val(),
		"country": $("#admin_corporate_country").val(),
		"zipcode": $("#admin_corporate_zip").val()
	});
	return params;
}

function addDisclaimerDetails(){
	var content = $('#txtcontent2').summernote('code');
	dis_title = $('#disclaimer_title').val();
	dis_type = $('#disclaimerfrequency').val();

	if(content.length == 0 || content == "<p><br></p>"){
		adminShowconfirmmsg(admin_Messages.admin_dis_msg, confirm_Error, 5000, "", false, false);
	} else if(content == dis_msg){
		adminShowconfirmmsg(admin_Messages.admin_dis_msg_nochange, confirm_Error, 5000, "", false, false);
	} else{
		var params = {
			"id": dis_id,
			"type": dis_type,
			"title": dis_title,
			"msg": content,
			"status": 1,
			"action": "addDisclaimerDetailsServiceAfter"
		};
		addDisclaimerDetailsService(params);
	}
}

function adminAddDeviceRuleIP(){
	var strVar="";
	strVar += "<div class='cell iptextclass' style='outline: none; border: none;' id='diviplist_"+lastipindex+"'>";
	strVar += "<span class='cell'>";
	strVar += "<input type='text' class='inputClass1 disablecopypaste' maxlength='3' value='' id='txtDeviceRulesIP1_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)'>";
	strVar += "</span>";
	strVar += "<span class='cell'>.</span>";
	strVar += "<span class='cell'>";
	strVar += "<input type='text' class='inputClass1 disablecopypaste' maxlength='3' value='' id='txtDeviceRulesIP2_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)'>";
	strVar += "</span>";
	strVar += "<span class='cell'>.</span>";
	strVar += "<span class='cell'>";
	strVar += "<input type='text' class='inputClass1 disablecopypaste' maxlength='3' value='' id='txtDeviceRulesIP3_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)'>";
	strVar += "</span>";
	strVar += "<span class='cell'>.</span>";
	strVar += "<span class='cell' style='padding-right: 10px;'>";
	strVar += "<input type='text' class='inputClass1 disablecopypaste' maxlength='3' value='' id='txtDeviceRulesIP4_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)'>";
	strVar += "</span>";
	strVar += "<span class='cell'>&nbsp;<\/span>";
	strVar += "</div>";
	$("#diviplist").append(strVar);
	registerBindEventsForDeviceRulesIpAdmin(lastipindex);
}

/**
 * method build json for block list search
 * @returns {___anonymous68082_68580}
 */
function adminDeviceSearchBuildJSON(){
	/*var name = $("#first_name").val().trim().toLowerCase();
	if(name.length > 0){
		name = name + " " + $("#middle_name").val().trim().toLowerCase();
	} else {
		name = $("#middle_name").val().trim().toLowerCase();
	}
	if(name.length > 0){
		name = name + " " + $("#last_name").val().trim().toLowerCase();
	} else {
		name = $("#last_name").val().trim().toLowerCase();
	}*/
	var dtfrom = "";
	if($("#search_from_date_div").val().trim().length > 0){
		var dt = $("#search_from_date_div").val().trim().split("-");
		var month = parseFloat(dt[1])-1;
		var d = new Date(dt[0], month, dt[2]);
		dt = moment(d).subtract(330, 'minutes').toDate();
		var hour = dt.getHours();
		var minute = dt.getMinutes();
		dtfrom = FormatDateToServer(dt);
		dtfrom = dtfrom.replace("00:00:00", hour+":"+minute+":00");
	}
	var dtto = "";
	if($("#search_to_date_div").val().trim().length > 0){
		//dtto = FormatDateToServer($("#search_to_date_div").val().trim());
		//dtto = dtto.replace("00:00:00", "23:59:59");
		//dtto = dtto.replace("00:00:00", "18:29:59");

		var dt = $("#search_to_date_div").val().trim().split("-");
		var month = parseFloat(dt[1])-1;
		var d = new Date(dt[0], month, dt[2], 23, 59, 59);
		dt = moment(d).subtract(330, 'minutes').toDate();
		var hour = dt.getHours();
		var minute = dt.getMinutes();
		dtto = FormatDateToServer(dt);
		dtto = dtto.replace("00:00:00", hour+":"+minute+":00");
	}
	var jsoninput = {
		"requestorName":$("#search_req_name").val().trim().toLowerCase().toLowerCase(),
		"emailId":$("#search_mail_id").val().trim().toLowerCase(),
		"deviceName":$("#search_dive_name").val().toUpperCase(),
		"deviceId":"",
		"geolocation":"",
		"ipAddress":$("#search_ip_add").val(),
		"requestedFromDate":dtfrom,
		"requestedToDate":dtto,
		"requestType":"",
		"reasonForRequest":"",
		"lawFirmId":localStorage._zw,
		"status":""
	};
	searchdone = 1;
	return jsoninput;
}

function clearDeviceSearch(){
	$("#search_from_date_div").val("");
	$("#search_to_date_div").val("");
	$("#search_req_name").val("");
	$("#search_mail_id").val("");
	$("#search_dive_name").val("");
	$("#search_ip_add").val("");
}

/**
 * method used to check user list fied for serch
 */
function adminUserListCheckEmptyFieldForSearch(){
	var First = $("#first_name").val().trim();
	var Last = $("#last_name").val().trim();
	var Middle = $("#middle_name").val().trim();
	var Login = $("#log_id").val().trim();
	//var Phone = $("#phone_no").val();
	//var email = $("#email_id").val();

	var attributearr = [];
	var chkVal = false;

	if((First.trim()).length > 0) {
		chkVal = true;
		if($("#active_users").hasClass("active"))
			attributearr[attributearr.length] = "firstName<#HASH;>string<#HASH;>"+First;
		else if($("#live_users").hasClass("active"))
			attributearr[attributearr.length] = "attribute1<#HASH;>string<#HASH;>"+First;
	}
	if((Last.trim()).length > 0) {
		chkVal = true;
		if($("#active_users").hasClass("active"))
			attributearr[attributearr.length] = "lastName<#HASH;>string<#HASH;>"+Last;
		else if($("#live_users").hasClass("active"))
			attributearr[attributearr.length] = "attribute3<#HASH;>string<#HASH;>"+Last;
	}
	if((Middle.trim()).length > 0) {
		chkVal = true;
		if($("#active_users").hasClass("active"))
			attributearr[attributearr.length] = "middleName<#HASH;>string<#HASH;>"+Middle;
		else if($("#live_users").hasClass("active"))
			attributearr[attributearr.length] = "attribute2<#HASH;>string<#HASH;>"+Middle;
	}
	if((Login.trim()).length > 0) {
		chkVal = true;
		if($("#active_users").hasClass("active"))
			attributearr[attributearr.length] = "loginId<#HASH;>string<#HASH;>"+Login;
		else if($("#live_users").hasClass("active"))
			attributearr[attributearr.length] = "attribute4<#HASH;>string<#HASH;>"+Login;
	}
	if($("#search_admin_check").prop("checked") == true){
	     chkVal = true;
	     if($("#active_users").hasClass("active"))
		 	attributearr[attributearr.length] = "userTypeId<#HASH;>string<#HASH;>ADMIN";
		 else if($("#live_users").hasClass("active"))
		 	attributearr[attributearr.length] = "attribute5<#HASH;>string<#HASH;>ADMIN";
	}
	if($("#search_user_check").prop("checked") == true) {
		chkVal = true;
		if($("#active_users").hasClass("active"))
			attributearr[attributearr.length] = "userTypeId<#HASH;>string<#HASH;>USER";
		else if($("#live_users").hasClass("active"))
			attributearr[attributearr.length] = "attribute5<#HASH;>string<#HASH;>USER";
	}

	if(chkVal == true) {
		var response = {"object":""};
		if($("#active_users").hasClass("active")){
			response.object = searchJSONLowerCaseMatchMultiple(usersearch, attributearr);
			searchdone = 1;
		}
		else if($("#live_users").hasClass("active")){
			response.object = searchJSONLowerCaseMatchMultiple(liveusersearch, attributearr);
			liveusersearchdone = 1;
		}
		displaycounter = -1;
		if($("#active_users").hasClass("active"))
			displayUserListDataRowsDB(response);
		else if($("#live_users").hasClass("active"))
			fetchLiveUsersServiceAfter(response);
	}
}

function clearUserSearch(){
	$("#first_name").val("");
	$("#last_name").val("");
	$("#middle_name").val("");
	$("#log_id").val("");
	$("#phone_no").val("");
	$("#email_id").val("");
	$("#search_user_check").prop("checked", false);
	$("#search_admin_check").prop("checked", true);
}

function adminChooseWaterMarkColor(obj){
	if($("#btnsavecorp").html() == "SAVE"){
		$(".watermarkcolor").removeClass("active");
		$(obj).addClass("active");
		watermarkColor = $(obj).attr("value");
	}
}

function adminCloseDataroomResetPopup(){
	$("#chk_close_dataroom_later").click();
	$("#admin_dataroom_close_reason").val("");
	$("#chk_close_dataroom_flashdrive_no").click();
}

function adminDataroomCloseFlashDriveClear(){
	$("#txt_dataroom_close_flashdrive_no").val("1");
	$("#txt_dataroom_close_flashdrive_rec_name").val("");
	$("#txt_dataroom_close_flashdrive_rec_email").val("");
	$("#txt_dataroom_close_flashdrive_rec_phone").val("");
	$("#txt_dataroom_close_flashdrive_rec_address").val("");
	$("#chk_dataroom_close_prj_index").attr("checked", true);
	$("#chk_dataroom_close_user_list").attr("checked", true);
	$("#chk_dataroom_close_history").attr("checked", true);
	$("#chk_dataroom_close_perm_list").attr("checked", true);
	$("#sel_dataroom_close_experience").val(4);
	$("#sel_dataroom_close_drive_type").val(0);
	$("#sel_admin_dataroom_close_reason").val(1);
}

function adminDataroomCloseFlashDriveHide(){
	adminDataroomCloseFlashDriveClear();
	$("#div_dataroom_close_flashdrive_no").hide();
	$("#div_dataroom_close_flashdrive").hide();
	$("#div_dataroom_close_flashdrive_name").hide();
	$("#div_dataroom_close_flashdrive_email").hide();
	$("#div_dataroom_close_flashdrive_phone").hide();
	$("#div_dataroom_close_flashdrive_address").hide();
	$("#div_dataroom_close_flashdrive_doc_2").hide();
	$("#div_dataroom_close_doc_format").hide();
	$("#div_dataroom_close_drive_type").hide();
}

function adminDataroomCloseFlashDriveShow(){
	adminDataroomCloseFlashDriveClear();
	$("#div_dataroom_close_flashdrive_no").show();
	$("#div_dataroom_close_flashdrive").show();
	$("#div_dataroom_close_flashdrive_name").show();
	$("#div_dataroom_close_flashdrive_email").show();
	$("#div_dataroom_close_flashdrive_phone").show();
	$("#div_dataroom_close_flashdrive_address").show();
	$("#div_dataroom_close_flashdrive_doc_2").show();
	$("#div_dataroom_close_initby").hide();
	$("#div_dataroom_close_doc_format").show();
	$("#div_dataroom_close_drive_type").show();
}

function adminValidateDataroomClosureFields(){
	var proceed = true;
	var val = $('input[name="radioclosedataroom"]:checked').val();
	if(val == "0" && !isValidDate($("#date_dataroom_close").val(), 'yyyy-mm-dd')){
		proceed = false;
		adminShowconfirmmsg(admin_Messages.admin_enterdataroomclosedate, confirm_Error, 5000, "", false, false);
	} else {
		val = $('input[name="radioclosedataroomflashdrive"]:checked').val();
		if(val == "1"){
			if($("#txt_dataroom_close_flashdrive_no").val().trim().length == 0 || $("#txt_dataroom_close_flashdrive_no").val().trim()=="0"){
				proceed = false;
				adminShowconfirmmsg(admin_Messages.txt_dataroom_close_flashdrive_no, confirm_Error, 5000, "", false, false);
			} else if($("#txt_dataroom_close_flashdrive_rec_name").val().trim().length == 0){
				proceed = false;
				adminShowconfirmmsg(admin_Messages.txt_dataroom_close_flashdrive_rec_name, confirm_Error, 5000, "", false, false);
			} else if($("#txt_dataroom_close_flashdrive_rec_email").val().trim().length == 0){
				proceed = false;
				adminShowconfirmmsg(admin_Messages.txt_dataroom_close_flashdrive_rec_email, confirm_Error, 5000, "", false, false);
			} else if($("#txt_dataroom_close_flashdrive_rec_phone").val().trim().length == 0){
				proceed = false;
				adminShowconfirmmsg(admin_Messages.txt_dataroom_close_flashdrive_rec_phone, confirm_Error, 5000, "", false, false);
			} else if($("#txt_dataroom_close_flashdrive_rec_address").val().trim().length == 0){
				proceed = false;
				adminShowconfirmmsg(admin_Messages.txt_dataroom_close_flashdrive_rec_address, confirm_Error, 5000, "", false, false);
			}
		}
	}
	return proceed;
}

function adminProcessDataroomClosure(){
	var isnow = $('input[name="radioclosedataroom"]:checked').val();
	var date = adminFormatDateToServer(new Date())+"T0:0:0Z";
	if(isnow == "0"){
		date = $("#date_dataroom_close").val()+"T23:59:59Z";
	}
	var reason = $("#sel_admin_dataroom_close_reason option:selected").text().trim();
	var flash_drive_required = $('input[name="radioclosedataroomflashdrive"]:checked').val();
	var flash_drive_no = parseFloat($("#txt_dataroom_close_flashdrive_no").val().trim());
	var flash_drive_name = $("#txt_dataroom_close_flashdrive_rec_name").val().trim();
	var flash_drive_email = $("#txt_dataroom_close_flashdrive_rec_email").val().trim();
	var flash_drive_phone = $("#txt_dataroom_close_flashdrive_rec_phone").val().trim();
	var flash_drive_address = $("#txt_dataroom_close_flashdrive_rec_address").val().trim();

	var experience = $("#sel_dataroom_close_experience").val().trim();
	var docFormat = 1;
	var flashDriveType = $("#sel_dataroom_close_drive_type").val().trim();

	var report_prj_index = 0;
	var report_user_list = 0;
	var report_history = 0;
	var report_perm_list = 0;
	if($("#chk_dataroom_close_prj_index").is(":checked")){
		report_prj_index = 1;
	}

	if($("#chk_dataroom_close_user_list").is(":checked")){
		report_user_list = 1;
	}

	if($("#chk_dataroom_close_history").is(":checked")){
		report_history = 1;
	}

	if($("#chk_dataroom_close_perm_list").is(":checked")){
		report_perm_list = 1;
	}

	var json = {
		instantTerminate:isnow,
		terminateDate:date,
		reason:reason,
		flashDriveRequired:flash_drive_required,
		flashDriveQuantity:flash_drive_no,
		flashDriveReceipientName:flash_drive_name,
		flashDriveReceipientEmail:flash_drive_email,
		flashDriveReceipientPhone:flash_drive_phone,
		flashDriveReceipientAddress:flash_drive_address,
		reportProjectIndex:report_prj_index,
		reportProjectUserList:report_user_list,
		reportProjectHistory:report_history,
		reportProjectPermissionList:report_perm_list,
		experience:experience,
		docFormat:docFormat,
		flashDriveType:flashDriveType
	}
	return json;
}

function adminExportUsers(){
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent += "User Name,Login Id, Phone Number, User Type, User Status, Company Name, "
	if(localStorage._zmd.split(",").includes("8")){
		csvContent += "Personal, ";
	}
	csvContent += "Dataroom";

	csvContent += "\r\n";

	var details = userdetails;
	for(var i=0;i<details.length;i++){
		var userName = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].firstName));
		var lastname = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].lastName));
		var middlename = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].middleName));
		if(middlename.length > 0) userName = userName + " " + middlename + " " + lastname;
		else userName = userName + " " + lastname;

		var userEmail = "";
		var userPhone = "";
		var loginId = "";
		var userType=capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].userTypeId));
		if(checkblankdata(details[i].email)) {
			userEmail = checkscreenwidthdesc(details[i].email);
		}

		userPhone = handleNullValue(details[i].phoneNumber);
		if(userPhone == "0") userPhone = "";

		if(checkblankdata(details[i].loginId)) {
			loginId = details[i].loginId;
		}

		if(details[i].phoneNumber == null) details[i].phoneNumber = "";
		if(details[i].userName == null) details[i].userName = "";
		if(details[i].email == null) details[i].email = "";
		if(details[i].loginId == null) details[i].loginId = "";
		var userstatus = details[i].userStatus;
		var userstatusstr = "";
		var personalstorage = details[i].persoanDataUsage;
		try{
			personalstorage = formatBytesDecimal(parseFloat(personalstorage));
		}catch(error){}

		var dataroomstorage = details[i].sharedDataUsage;
		try{
			dataroomstorage = formatBytesDecimal(parseFloat(dataroomstorage));
		}catch(error){}

		if(localStorage._zv != details[i].userId) {
			if(userstatus == "P"){
				userstatusstr = "Waiting for Activation";
			} else {
				userstatusstr = (userstatus == "A" ? "Active":"Blocked");
			}
		}


		var str = userName;
		str += ",";
		str += loginId;
		str += ",";
		str += ((userPhone+"") == "null" || (userPhone+"") == "undefined"? "":userPhone);
		str += ",";
		str += userType;
		str += ",";
		str += (userstatusstr == ""? "Active":userstatusstr);
		str += ",";
		str += ((details[i].companyName+"") == "null" || (details[i].companyName+"") == "undefined"? "":details[i].companyName);
		if(localStorage._zmd.split(",").includes("8")){
			str += ",";
			str += personalstorage;
		}
		str += ",";
		str += dataroomstorage;

		csvContent += str + "\r\n";
	}

	let date = new Date();
	let options = {
	    year: "numeric", month: "numeric",
	    day: "numeric", hour: "2-digit", minute: "2-digit"
	};

	var fileName = localStorage._zw+"_All_Users_"+date.toLocaleTimeString("en-us", options).replaceAll(", ", "_")+".csv";
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", fileName);
	document.body.appendChild(link);
	link.click();
}