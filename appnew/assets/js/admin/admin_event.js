var isRetainData = true;
function adminManageUserClickEvent(){
	unbindobject("#manage_user_bg");
	$("#manage_user_bg").bind("click", function(event){
		$("#live_user_table_div_").hide();
		$("#manage_user_div").show();
		$("#live_users").removeClass("active");
		$("#active_users").addClass("active");
		if(displaycounter == -1) {
			ajaxindicatorstart('fetching user list.. please wait..');
			admin_user_picture = "";
			clearUserSearch();
			adminFetchUserList("N");
			$("#fasearchi").show();
			$("#circle").show();
		} else {
			displayUserListDataRowsDBUI(displaycounter);
		}
	});

	unbindobject("#link_export_users");
	$("#link_export_users").bind("click", function(event){
		ajaxindicatorstart('exporting users.. please wait..');
		displaycounter = -1;
		adminFetchUserList("Y");
		return false;
	});
	unbindobject("#active_users");
	$("#active_users").bind("click", function(event){
		$("#live_users").removeClass("active");
		$("#active_users").addClass("active");
		$("#manage_user_bg").click();
	});
	unbindobject("#live_users");
	$("#live_users").bind("click", function(event){
		$("#active_users").removeClass("active");
		$("#live_users").addClass("active");
		$("#mg_user").hide();
		fetchLiveUsersService();
	});
}

function adminUserEvent(){
	const togglePassword = document.querySelector('#lblshowpassnew');
	const confirmtogglePassword = document.querySelector('#lblshowpasscnf');
	const password = document.querySelector('#newpassword');
	const confirmpassword = document.querySelector('#confirmpassword');

	unbindobject("#lblshowpassnew");
	$(togglePassword).bind('click', function (event) {
		// toggle the type attribute
		const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
		password.setAttribute('type', type);
		// toggle the eye slash icon
		this.classList.toggle('fa-eye-slash');
	});

	unbindobject("#lblshowpasscnf");
	$(confirmtogglePassword).bind('click', function (event) {
		// toggle the type attribute
		const type = confirmpassword.getAttribute('type') === 'password' ? 'text' : 'password';
		confirmpassword.setAttribute('type', type);
		// toggle the eye slash icon
		this.classList.toggle('fa-eye-slash');
	});

	unbindobject("#resetpassconfirm");
	$("#resetpassconfirm").bind("click", function(event){
		var newpass = $("#newpassword").val();
		var cnfpass = $("#confirmpassword").val();
		if(!checkPasswordStrength(newpass)){
			adminShowconfirmmsg(admin_Messages.admin_passwordformat, confirm_Error, 5000, "", false, false);
			$("#newpassword").focus();
		} else if(newpass != cnfpass){
			adminShowconfirmmsg(admin_Messages.admin_mismatchConfirmPassword, confirm_Error, 5000, "", false, false);
			$("#confirmpassword").focus();
		} else {
			var userid = document.getElementById("modalresetpss").getAttribute("data-id");
			savePasswordService(userid, newpass);
		}
		return false;
	});

	unbindobject("#passwordback");
	$("#passwordback").bind("click", function(event){
		hideActionPopup("modalresetpss");
	});

	unbindobject("#deleteuserconfirm");
	$("#deleteuserconfirm").bind("click", function(event){
		var userid = document.getElementById("deleteusercont").getAttribute("data-id");
		var idm = document.getElementById("deleteusercont").getAttribute("idm");

		var idmlogin = localStorage._zu + "_" + $("#admin_user_detail_col2_"+idm).html().toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
		loginRemoveAccount(idmlogin, true);

		adminDeleteUserService(userid, idm, isRetainData);
	});
	unbindobject("#canceldelete");
	$("#canceldelete").bind("click", function(event){
		hideActionPopup("deleteusercont");
	});

	unbindobject("#retainconfirm");
	$("#retainconfirm").bind("click", function(event){
		isRetainData = true;
		hideActionPopup("retainuserdata");
		showActionPopup("deleteusercont");
	});
	unbindobject("#retaincancel");
	$("#retaincancel").bind("click", function(event){
		isRetainData = false;
		hideActionPopup("retainuserdata");
		showActionPopup("deleteusercont");
	});


	unbindobject("#blockuserconfirm");
	$("#blockuserconfirm").bind("click", function(event){
		var userid = document.getElementById("blockusercont").getAttribute("data-id");
		var idm = document.getElementById("blockusercont").getAttribute("idm");

		var idmlogin = localStorage._zu + "_" + $("#admin_user_detail_col2_"+idm).html().toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
		loginRemoveAccount(idmlogin, true);

		adminDisableUserService(userid, idm);
	});

	unbindobject("#cancelblcok");
	$("#cancelblcok").bind("click", function(event){
		hideActionPopup("blockusercont");
	});

	unbindobject("#unblockuserconfirm");
	$("#unblockuserconfirm").bind("click", function(event){
		var userid = document.getElementById("unblockusercont").getAttribute("data-id");
		var idm = document.getElementById("unblockusercont").getAttribute("idm");
		adminEnableUserService(userid, idm);
	});

	unbindobject("#uncancelblcok");
	$("#uncancelblcok").bind("click", function(event){
		hideActionPopup("unblockusercont");
	});

	unbindobject("#btnuser");
	$("#btnuser").bind("click", function(event){
		if(localStorage._zs == "B") {
			$("#adduser").attr("data-id", 0);
			$("#adduser").attr("data-contact-id", 0);
			$("#adduser").attr("data-contact-phone-id", 0);
			$("#adduser").attr("data-contact-fax-id", 0);
			adminShowAddUser();
			$("#txt_adduser_firstname").focus();
		} else {
			adminShowconfirmmsg(admin_Messages.notpaiduser, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#adduserconfirm");
	$("#adduserconfirm").bind("click", function(event){
		var userid = document.getElementById("adduser").getAttribute("data-id")+"";
		//when creation userid is zero
		//when edit user userid greater than 0
		if(userid == "0"){
			var b = adminValidateUserAdd();
			if(b){
				adminAddUserService();
			}
		} else if(userid != "0"){
			if($(this).html()=="SAVE"){
				var b = adminValidateUserAdd();
				if(b){
					adminUpdateUserService();
				}
			} else if($(this).html()=="EDIT"){
				$(this).html("SAVE");
				$("#txt_adduser_firstname").removeAttr("readonly");
				$("#txt_adduser_middlename").removeAttr("readonly");
				$("#txt_adduser_lastname").removeAttr("readonly");
				$("#txt_adduser_phone").removeAttr("readonly");
				$("#txt_companyname").removeAttr("readonly");
				if(localStorage._zs == "B") {
					$('#chk_adduser_admin').removeAttr("disabled");
					$("#chk_adduser_user").removeAttr("disabled");
					$('#chk_adduser_admin_span').css("color", "#000");
					$("#chk_adduser_user_span").css("color", "#000");
				}
				$("#chk_adduser_usb").removeAttr("disabled");
				$("#chk_adduser_dvd").removeAttr("disabled");
				if(localStorage._zs == "B") {
					$("#chk_adduser_module_drive").removeAttr("disabled");
					$("#chk_adduser_module_admin").removeAttr("disabled");
					$('#chk_adduser_autologin').removeAttr("disabled");
				} else {
					$('#chk_adduser_module_drive_span').css("color", "#ccc");
					$('#chk_adduser_module_admin_span').css("color", "#ccc");
					$('#chk_adduser_autologin_span').css("color", "#ccc");
				}
				$('#changeuserimgfile').removeAttr("disabled");
				if(twofactorAuth != 1) {
					$("#admin_user_chk_two_factor_auth").removeAttr("disabled");
				}
				$("#chk_user_mobile_security").removeAttr("disabled");
				$("#chk_user_whatsapp_security").removeAttr("disabled");
				$("#chk_user_email_security").removeAttr("disabled");
				$("#chk_user_auth_security").removeAttr("disabled");
			}
		}
	});

	unbindobject("#addusercancel");
	$("#addusercancel").bind("click", function(event){
		$('#mg_user').show();
		$('#btnuser').show();
		$("#admin_searchbar").show();
		$('#adduser').hide();
		admin_user_picture = "";

		if(prvuserimg != ""){
			$("#muserimg").attr("src", prvuserimg);
			$("#userimg").attr("src", prvuserimg);
		}
	});

	unbindobject("#changeuserimgfile");
	unbindobject("#userprfimg");
	$("#userprfimg").bind("click",function(event){
		$("#changeuserimgfile").val("");
		$("#changeuserimgfile").click();
	});

	$("#changeuserimgfile").change(function() {
		var file = document.getElementById("changeuserimgfile").files[0];
		if(file.size <= 2,04,800){
			var reader = new FileReader();
				reader.onloadend = function() {
					admin_user_picture = reader.result;
					var c = document.getElementById("adduser").getAttribute("data-contact-id");
					$("#userprfimg").attr("src", admin_user_picture);
					if(document.getElementById("adduser").getAttribute("data-id") == localStorage._zv){
						$("#userimg").attr("src", admin_user_picture);
					}
				}
			reader.readAsDataURL(file);
		} else {
			adminShowconfirmmsg(admin_Messages.userImageSize, confirm_Error, 5000, "", false, false);
		}

    });

	unbindobject("#chk_adduser_sync_dataroom");
	$("#chk_adduser_sync_dataroom").bind("click", function(event){
		if($(this).is(":checked")){
			$("#chk_adduser_sync_personal").prop("checked", false);
		} else {
			$("#chk_adduser_sync_personal").prop("checked", true);
		}
	});

	unbindobject("#chk_adduser_sync_personal");
	$("#chk_adduser_sync_personal").bind("click", function(event){
		if($(this).is(":checked")){
			$("#chk_adduser_sync_dataroom").prop("checked", false);
		} else {
			$("#chk_adduser_sync_dataroom").prop("checked", true);
		}
	});

	unbindobject("#chk_adduser_admin");
	$("#chk_adduser_admin").bind("click", function(event){
		if($(this).is(":checked")){
			$("#chk_adduser_user").prop("checked", false);
			$("#chk_adduser_module_admin").prop("checked", true);
		} else {
			$("#chk_adduser_user").prop("checked", true);
			$("#chk_adduser_module_admin").prop("checked", false);
		}
	});

	unbindobject("#chk_adduser_user");
	$("#chk_adduser_user").bind("click", function(event){
		if($(this).is(":checked")){
			$("#chk_adduser_admin").prop("checked", false);
			$("#chk_adduser_module_admin").prop("checked", false);
			$("#chk_adduser_module_drive").prop("checked", true);
			$("#chk_adduser_module_admin").prop("checked", false);
		} else {
			$("#chk_adduser_admin").prop("checked", true);
			$("#chk_adduser_module_admin").prop("checked", true);
		}
	});

	unbindobject("#chk_adduser_module_admin");
	$("#chk_adduser_module_admin").bind("click", function(event){
		if($(this).is(":checked")){
			$("#chk_adduser_admin").prop("checked", true);
			$("#chk_adduser_user").prop("checked", false);
			$("#chk_adduser_module_drive").prop("checked", true);
			$("#chk_adduser_module_admin").prop("checked", true);
		} else {
			$("#chk_adduser_admin").prop("checked", false);
			$("#chk_adduser_user").prop("checked", true);
		}
	});

	unbindobject("#profIm");
	$("#profIm").bind("click", function(event){
		ajaxindicatorstart('fetching profile.. please wait..');
		adminSingleUserProfileService(true);
		adminFetchStorageLeftService(false);
		showActionPopup("userprofilemodal");
	});

	unbindobject("#btn_admin_close_profile");
	$("#btn_admin_close_profile").bind("click",function(event){
		if(prvuserimg != ""){
			$("#muserimg").attr("src", prvuserimg);
			$("#userimg").attr("src", prvuserimg);
		}
	});

	unbindobject("#btn_save_profile");
	$("#btn_save_profile").bind("click",function(event){
		if($("#mfirstname").val().trim().length == 0){
			adminShowconfirmmsg("Please enter first name", confirm_Error, 5000, "", false, false);
			return false;
		} else if($("#mlastname").val().trim().length == 0){
			adminShowconfirmmsg("Please enter last name", confirm_Error, 5000, "", false, false);
			return false;
		}

		var jsonInput ="{";
		jsonInput += "\"firstName\":\""+$("#mfirstname").val()+"\"";
		jsonInput += ",\"lastName\":\""+$("#mlastname").val()+"\"";
		jsonInput += ",\"middleName\":\""+$("#mmiddlename").val()+"\"";
		jsonInput += ",\"companyName\":\""+$("#mcompany").val()+"\"";
		//jsonInput += ",\"website\":\""+website+"\"";
		jsonInput += ",\"id\":\""+contact_id+"\"";
		jsonInput += "}";
		adminSaveUserProfileService(JSON.parse(jsonInput));

		if(($("#mmobilenumber").val().trim()).length > 0 && phone_id > 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"" + phone_id + "\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"countryCode\":\""+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"\"";
			jsonInput += ",\"phone\":\""+$("#mmobilenumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			adminUpdateUserPhone(JSON.parse(jsonInput));
			if(adminotpId == 1 || adminotpId == 2) adminSaveOTPRecordService();
		} else if(($("#mmobilenumber").val().trim()).length > 0 && phone_id == 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"0\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"countryCode\":\""+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"\"";
			jsonInput += ",\"phone\":\""+$("#mmobilenumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			adminAddUserPhone(JSON.parse(jsonInput));
			if(adminotpId == 1 || adminotpId == 2) adminSaveOTPRecordService();
		}

		if(($("#mfaxnumber").val().trim()).length > 0 && fax_id > 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"" + fax_id + "\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"fax\":\""+$("#mfaxnumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			adminUpdateUserFax(JSON.parse(jsonInput));

		} else if(($("#mfaxnumber").val().trim()).length > 0 && fax_id == 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"0\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"fax\":\""+$("#mfaxnumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			adminAddUserFax(JSON.parse(jsonInput));
		}

		if(userimgbase64 !=""){
			var jsonInput = "{\"id\":\"" + contact_id + "\"";
							jsonInput += ",\"picture\":\"" + userimgbase64 + "\"}";
			adminUpdateUserPicture(JSON.parse(jsonInput));
			prvuserimg = "";
		}
	});

	unbindobject("#muserimg");
	$("#muserimg").bind("click",function(event){
		$("#pickuserimg").val("");
		$("#pickuserimg").click();
	});

	$("#pickuserimg").change(function() {
		var file = document.getElementById("pickuserimg").files[0];
		var reader = new FileReader();
		  reader.onloadend = function() {
			userimgbase64 = reader.result;
			$("#muserimg").attr("src", userimgbase64);
			$("#user-img").attr("src", userimgbase64);
		  }
		var maxSizeKB = 100; //Size in KB
		var maxSize = maxSizeKB * 1024; //File size is returned in Bytes
		if (this.files[0].size > maxSize) {
			$(this).val("");
			adminShowconfirmmsg(admin_Messages.profileimagesizeexceed, confirm_Error, 5000, "", false, false);
			return false;
		}
		reader.readAsDataURL(file);
    });
}

/**
 * method to register bind events for user list
 * @param i
 * @returns {Boolean}
 */
function registerBindEventsForUserListAdmin(i) {
	unbindobject("#disableuserbtn_" + i);
	unbindobject("#enableuserbtn_" + i);
	unbindobject("#div_user_row_" + i+",adminedituser_"+i);
	unbindobject("#admindeleteuser_"+i);
	unbindobject("#resetpassbtn_" + i);
	unbindobject("#adminresendactivation_" + i);

	$("#disableuserbtn_" + i).bind('tap click touch', function(e) {
		e.preventDefault();
		var rowId = this.id;
		rowId = rowId.replace("disableuserbtn_", "");
		var userid = document.getElementById("div_user_row_"+rowId).getAttribute("data-id");
		$("#blockusercont").attr("data-id", userid);
		$("#blockusercont").attr("idm", rowId);
		showActionPopup("blockusercont");
		return false;
	});

	$("#admindeleteuser_" + i).bind('tap click touch', function(e) {
		e.preventDefault();
		var rowId = this.id;
		rowId = rowId.replace("admindeleteuser_", "");
		var userid = document.getElementById("div_user_row_"+rowId).getAttribute("data-id");
		var userStatus = document.getElementById("div_user_row_"+rowId).getAttribute("data-status");
		$("#deleteusercont").attr("data-id", userid);
		$("#deleteusercont").attr("idm", rowId);
		if(userStatus == "P")
			showActionPopup("deleteusercont");
		else
			showActionPopup("retainuserdata");
		return false;
	});

	$("#enableuserbtn_" + i).bind('tap click touch', function(e) {
		e.preventDefault();
		var rowId = this.id;
		rowId = rowId.replace("enableuserbtn_", "");
		var userid = document.getElementById("div_user_row_"+rowId).getAttribute("data-id");
		$("#unblockusercont").attr("data-id", userid);
		$("#unblockusercont").attr("idm", rowId);
		showActionPopup("unblockusercont");
		return false;
	});

	$("#div_user_row_" + i+",adminedituser_"+i).bind('tap click touch', function(e) {
		e.preventDefault();
		if(e.target.id.indexOf("user_more_") < 0){
			var rowId = this.id;
			rowId = rowId.replace("div_user_row_", "");
			rowId = rowId.replace("adminedituser_", "");
			var userid = document.getElementById("div_user_row_"+rowId).getAttribute("data-id");
			$("#adduser").attr("data-id", userid);
			adminShowAddUser();
			return false;
		}
	});

	$("#resetpassbtn_" + i).bind('tap click touch', function(e) {
		e.preventDefault();
		var rowId = this.id;
		rowId = rowId.replace("resetpassbtn_", "");
		var userid = document.getElementById("div_user_row_"+rowId).getAttribute("data-id");
		$("#modalresetpss").attr("data-id", userid);
		$("#newpassword").val("");
		$("#confirmpassword").val("");

		$("#newpassword").attr("type", "password");
		$("#confirmpassword").attr("type", "password");
		showActionPopup("modalresetpss");
		return false;
	});

	$("#adminresendactivation_" + i).bind('tap click touch', function(e) {
		e.preventDefault();
		var idm = (this.id).replace("adminresendactivation_", "");
		var loginid = document.getElementById(this.id).getAttribute("data-loginid");
		adminSendReactivationMail(loginid, idm);
		return false;
	});

	return false;
}

function adminrefreshEvent(){
	unbindobject("#btrefresh");
	$("#btrefresh").bind('click', function(e) {
		clearDeviceSearch();
		clearUserSearch();
		usersearch = "";
		liveusersearch = "";
		if($("#manage_user_bg").hasClass("sidebarliactive")){
			if($("#active_users").hasClass("active")){
				ajaxindicatorstart('fetching user list.. please wait..');
				displaycounter = -1;
				adminFetchUserList("N");
			}else if($("#live_users").hasClass("active")){
				fetchLiveUsersService();
			}
		} else if($("#manage_device_bg").hasClass("sidebarliactive")){
			if($("#pending_req").hasClass("active")){
				ajaxindicatorstart('fetching pending device list.. please wait..');
				adminfetchPenidingDeviceService();
			} else if($("#blocked_req").hasClass("active")){
				ajaxindicatorstart('fetching blocked device list.. please wait..');
				adminfetchBlockedDeviceService();
			} else if($("#approved_req").hasClass("active")){
				ajaxindicatorstart('fetching approved device list.. please wait..');
				adminfetchApprovedDeviceService();
			} else if($("#autoDevice_req").hasClass("active")){
				adminFetchDeviceIPData();
			}
		}
		return false;
	});
}

function adminCorporateEvent() {
	unbindobject("#corporate_Details_bg");
	$("#corporate_Details_bg").bind("click", function (event) {
		ajaxindicatorstart('fetching your Settings.. please wait..');
		adminfetchCorporateDetailsService();
	});

	unbindobject("#btnsavecorp");
	$("#btnsavecorp").bind("click", function (event) {
		if ($(this).html() == "EDIT") {
			$(this).html("SAVE");
			$("#btncorpcancel").show();

			$("#admin_corporate_name").removeAttr("readonly");
			$("#admin_corporate_firstname").removeAttr("readonly");
			$("#admin_corporate_middlename").removeAttr("readonly");
			$("#admin_corporate_lastname").removeAttr("readonly");
			$("#admin_corporate_phone").removeAttr("readonly");
			$("#admin_corporate_email").removeAttr("readonly");
			$("#admin_corporate_place").removeAttr("readonly");
			$("#admin_corporate_street").removeAttr("readonly");
			$("#admin_corporate_city").removeAttr("readonly");
			$("#admin_corporate_state").removeAttr("readonly");
			$("#admin_corporate_zip").removeAttr("readonly");
			$("#admin_corporate_country").removeAttr("readonly");
			$("#admin_watermark_text").removeAttr("readonly");
			$("#disclaimer_title").removeAttr("readonly");
			$("#image-file").removeAttr("disabled");
			$("#lbl_change_upload_logo").css("color", "#000");
			$("#admin_chk_watermark_view").removeAttr("disabled");
			$("#admin_chk_watermark_download").removeAttr("disabled");
			$("#admin_chk_watermark_download_original").removeAttr("disabled");
			$("#admin_chk_prjindex_number").removeAttr("disabled");
			$("#selectTimeZone").removeAttr("disabled");
			$(".watercolor").removeAttr("disabled");
			$("#admin_chk_watermark_left").removeAttr("disabled");
			$("#admin_chk_watermark_top").removeAttr("disabled");
			$("#admin_chk_watermark_right").removeAttr("disabled");
			$("#admin_chk_watermark_bottom").removeAttr("disabled");
			$("#admin_chk_watermark_single").removeAttr("disabled");
			$("#admin_chk_watermark_multiple").removeAttr("disabled");
			$("#disclaimerfrequency").removeAttr("disabled");
			$("#disclaimermsg").removeAttr("disabled");
			$("#disclaimermsg").css("opacity", "1");

			$(".metadata_iv_row").css("display", "block");
			$("#metadata_key").removeAttr("readonly");
		} else if ($(this).html() == "SAVE") {
			if ($("#disclaimer_title").val().trim().length == 0) {
				adminShowconfirmmsg(admin_Messages.admin_dis_title_check, confirm_Error, 5000, "", false, false);
			} else if ($("#admin_corporate_name").val().trim().length == 0) {
				adminShowconfirmmsg("Please enter company name", confirm_Error, 5000, "", false, false);
			} else if ($("#admin_corporate_firstname").val().trim().length == 0) {
				adminShowconfirmmsg("Please enter first name", confirm_Error, 5000, "", false, false);
			} else if ($("#admin_corporate_lastname").val().trim().length == 0 || !validateEmail($("#admin_corporate_email").val().trim())) {
				adminShowconfirmmsg("Please enter last name", confirm_Error, 5000, "", false, false);
			} else if ($("#admin_corporate_email").val().trim().length == 0 || !validateEmail($("#admin_corporate_email").val().trim())) {
				adminShowconfirmmsg("Please enter valid email id", confirm_Error, 5000, "", false, false);
			} else {
				ajaxindicatorstart('saving your corporate details.. please wait..');
				adminSaveClientService();
				if (logoimgbase64 != "") {
					adminUpdateLogoService();
				}
			}
		}
	});

	//If all the checkboxes are disabled Multiple line watermark should be enabled
	var flagL = "0";
	var flagT = "0";
	var flagR = "0";
	var flagB = "0";

	function checkWatermarkDisplayStatus() {
		if ($("#admin_chk_watermark_left").is(":checked")) {
			flagL = "1";
		}
		if ($("#admin_chk_watermark_top").is(":checked")) {
			flagT = "1";
		}
		if ($("#admin_chk_watermark_right").is(":checked")) {
			flagR = "1";
		}
		if ($("#admin_chk_watermark_bottom").is(":checked")) {
			flagB = "1";
		}
		if (flagL == "0" && flagT == "0" && flagR == "0" && flagB == "0" && flagL == "0") {
			$("#admin_chk_watermark_multiple").prop("checked", true);
		}
	}

	unbindobject("#admin_chk_watermark_single");
	$("#admin_chk_watermark_single").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_chk_watermark_multiple").prop("checked", false);
			$("#admin_chk_watermark_left").prop("checked", false);
			$("#admin_chk_watermark_top").prop("checked", false);
			$("#admin_chk_watermark_right").prop("checked", false);
			$("#admin_chk_watermark_bottom").prop("checked", false);
		} else {
			$("#admin_chk_watermark_multiple").prop("checked", true);
		}
	});

	unbindobject("#admin_chk_watermark_multiple");
	$("#admin_chk_watermark_multiple").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_chk_watermark_single").prop("checked", false);
			$("#admin_chk_watermark_left").prop("checked", false);
			$("#admin_chk_watermark_top").prop("checked", false);
			$("#admin_chk_watermark_right").prop("checked", false);
			$("#admin_chk_watermark_bottom").prop("checked", false);
		} else {
			$("#admin_chk_watermark_single").prop("checked", true);
		}
	});


	unbindobject("#admin_chk_watermark_left");
	$("#admin_chk_watermark_left").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_chk_watermark_multiple").prop("checked", false);
			$("#admin_chk_watermark_single").prop("checked", false);
			flagL = "1";
		} else {
			flagL = "0";
			checkWatermarkDisplayStatus();
		}
	});
	unbindobject("#admin_chk_watermark_top");
	$("#admin_chk_watermark_top").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_chk_watermark_multiple").prop("checked", false);
			$("#admin_chk_watermark_single").prop("checked", false);
			flagT = "1";
		} else {
			flagT = "0";
			checkWatermarkDisplayStatus();
		}
	});

	unbindobject("#admin_chk_watermark_right");
	$("#admin_chk_watermark_right").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_chk_watermark_multiple").prop("checked", false);
			$("#admin_chk_watermark_single").prop("checked", false);
			flagR = "1";
		} else {
			flagR = "0";
			checkWatermarkDisplayStatus();
		}
	});

	unbindobject("#admin_chk_watermark_bottom");
	$("#admin_chk_watermark_bottom").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_chk_watermark_multiple").prop("checked", false);
			$("#admin_chk_watermark_single").prop("checked", false);
			flagB = "1";
		} else {
			flagB = "0";
			checkWatermarkDisplayStatus();
		}
	});

	unbindobject("#admin_useremailadd");
	$("#admin_useremailadd").bind("click", function (event) {
		if ($("#btnsavecorp").html() == "SAVE") {
			var val = $("#admin_watermark_text").val().trim();
			if (val.indexOf("[useremail]") < 0) {
				val += " [useremail]";
				$("#admin_watermark_text").val(val);
			}
		}
	});

	unbindobject("#admin_dateadd");
	$("#admin_dateadd").bind("click", function (event) {
		if ($("#btnsavecorp").html() == "SAVE") {
			var val = $("#admin_watermark_text").val().trim();
			if (val.indexOf("[date]") < 0) {
				val += " [date]";
				$("#admin_watermark_text").val(val);
			}
		}
	});
	unbindobject("#admin_ipaddressadd");
	$("#admin_ipaddressadd").bind("click", function (event) {
		if ($("#btnsavecorp").html() == "SAVE") {
			var val = $("#admin_watermark_text").val().trim();
			if (val.indexOf("[ipaddress]") < 0) {
				val += " [ipaddress]";
				$("#admin_watermark_text").val(val);
			}
		}
	});

	unbindobject("#disclaimermsg");
	$("#disclaimermsg").bind("click", function(event){
		$('#txtcontent2').summernote({
		  toolbar: [
			['style', ['bold', 'italic', 'underline']],
			['font', ['strikethrough', 'superscript', 'subscript']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']]
		  ]

		});
		$('#txtcontent2').summernote('code', dis_msg);
		showActionPopup("disclaimermsgmodal", false);
	});

	unbindobject("#btnmsgsave");
	$("#btnmsgsave").bind("click",function(event){
		addDisclaimerDetails();
	});

	unbindobject("#btnmsgexport");
	$("#btnmsgexport").bind("click",function(event){
		exportDisclaimerDetails();
	});

	unbindobject("#btncorpcancel");
	$("#btncorpcancel").bind("click", function (event) {
		$(this).hide();
		ajaxindicatorstart('please wait..');
		adminfetchCorporateDetailsService();
	});
}

function adminDeviceEvent(){
	unbindobject("#manage_device_bg");
	$("#manage_device_bg").bind("click", function(event){
		$("#live_user_table_div_").hide();
		$("#manage_user_div").hide();
		$("#blocked_req").removeClass("active");
		$("#approved_req").removeClass("active");
		$("#autoDevice_req").removeClass("active");
		$("#pending_req").addClass("active");
		$("#pending_Tab").empty();
		$("#autoip_Tab").hide();
		ajaxindicatorstart('fetching pending device list.. please wait..');
		clearDeviceSearch();
		clearUserSearch();
		adminfetchPenidingDeviceService();
		$("#fasearchi").show();
		$("#circle").show();
	});

	unbindobject("#pending_req");
	$("#pending_req").bind("click", function(event){
		$("#blocked_req").removeClass("active");
		$("#approved_req").removeClass("active");
		$("#autoDevice_req").removeClass("active");
		$("#pending_req").addClass("active");
		$("#pending_Tab").empty();
		$("#autoip_Tab").hide();
		ajaxindicatorstart('fetching pending device list.. please wait..');
		clearDeviceSearch();
		clearUserSearch();
		adminfetchPenidingDeviceService();
		$("#fasearchi").show();
		$("#circle").show();
	});

	unbindobject("#blocked_req");
	$("#blocked_req").bind("click", function(event){
		$("#pending_req").removeClass("active");
		$("#approved_req").removeClass("active");
		$("#autoDevice_req").removeClass("active");
		$("#blocked_req").addClass("active");
		$("#blocked_Tab").empty();
		$("#autoip_Tab").hide();
		ajaxindicatorstart('fetching blocked device list.. please wait..');
		clearDeviceSearch();
		clearUserSearch();
		adminfetchBlockedDeviceService();
		$("#fasearchi").show();
		$("#circle").show();
	});

	unbindobject("#approved_req");
	$("#approved_req").bind("click", function(event){
		$("#pending_req").removeClass("active");
		$("#blocked_req").removeClass("active");
		$("#autoDevice_req").removeClass("active");
		$("#approved_req").addClass("active");
		$("#approved_tab").empty();
		$("#autoip_Tab").hide();
		ajaxindicatorstart('fetching approved device list.. please wait..');
		clearDeviceSearch();
		clearUserSearch();
		adminfetchApprovedDeviceService();
		$("#fasearchi").show();
		$("#circle").show();
	});

	unbindobject("#autoDevice_req");
	$("#autoDevice_req").bind("click", function(event){
		$("#pending_req").removeClass("active");
		$("#blocked_req").removeClass("active");
		$("#approved_req").removeClass("active");
		$("#autoDevice_req").addClass("active");
		$("#pending_Tab").hide();
		$("#blocked_Tab").hide();
		$("#approved_tab").hide();
		$("#tableHeadSecDevice").hide();
		$("#autoip_Tab").show();
		clearDeviceSearch();
		clearUserSearch();
		adminFetchDeviceIPData();
		$("#fasearchi").hide();
		$("#circle").hide();
	});

	unbindobject("#cancel_divc_delete");
	$("#cancel_divc_delete").bind("click", function(event){
		hideActionPopup("delete_divc_cont");
	});

	unbindobject("#cancel_divc_block");
	$("#cancel_divc_block").bind("click", function(event){
		hideActionPopup("blockdivccont");
	});

	unbindobject("#cancel_divc_unblock");
	$("#cancel_divc_unblock").bind("click", function(event){
		hideActionPopup("unblockdivccont");
	});

	unbindobject("#blockdeviceconfirm");
	$("#blockdeviceconfirm").bind("click", function(event){
		var type = document.getElementById("blockdivccont").getAttribute("type");
		var deviceid = document.getElementById("blockdivccont").getAttribute("deviceid");
		if($("#admin_block_cmt").val().trim().length > 0){
			adminblockdeviceservice(deviceid, type);
		} else {
			adminShowconfirmmsg("Please enter comment", confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#deletedeviceconfirm");
	$("#deletedeviceconfirm").bind("click", function(event){
		var type = document.getElementById("delete_divc_cont").getAttribute("type");
		var deviceid = document.getElementById("delete_divc_cont").getAttribute("deviceid");
		admindeletedeviceservice(deviceid, type);
	});

	unbindobject("#unblockdeviceconfirm");
	$("#unblockdeviceconfirm").bind("click", function(event){
		var startDate = $("#admin_approve_start_date").val();
		var endDate = $("#admin_approve_end_date").val();
		if ($("#admin_approve_cmt").val().trim().length <= 0) {
			adminShowconfirmmsg(admin_Messages.admin_enterComment, confirm_Error, 5000, "", false, false);
		} else if (startDate.trim().length <= 0) {
			adminShowconfirmmsg(admin_Messages.admin_enterStartDate, confirm_Error, 5000, "", false, false);
		} else if (endDate.trim().length <= 0) {
			adminShowconfirmmsg(admin_Messages.admin_enterEndDate, confirm_Error, 5000, "", false, false);
		} else {
			startDate = new Date(startDate).setHours(0, 0, 0, 0);
			endDate = new Date(endDate).setHours(23, 59, 59, 0);
			var currDate = new Date().setHours(0, 0, 0, 0);
			var type = document.getElementById("unblockdivccont").getAttribute("type");
			var deviceid = document.getElementById("unblockdivccont").getAttribute("deviceid");
			if (startDate < currDate) {
				adminShowconfirmmsg(admin_Messages.device_startDateMsg, confirm_Error, 5000, "", false, false);
			} else if (endDate < currDate || endDate < startDate) {
				adminShowconfirmmsg(admin_Messages.device_endDateMsg, confirm_Error, 5000, "", false, false);
			} else {
				if ($("#pending_req").hasClass("active")) {
					adminapprovedeviceService(deviceid, type, "APPROVED");
				} else if ($("#blocked_req").hasClass("active")) {
					adminapprovedeviceService(deviceid, type, "UNBLOCKED");
				}
			}
		}
	});

	unbindobject("#chk_admin_approve_infinite");
	$("#chk_admin_approve_infinite").bind("click", function(event){
		if($(this).is(":checked")){
			var now = new Date();
			var day = ("0" + now.getDate()).slice(-2);
			var month = ("0" + (now.getMonth() + 1)).slice(-2);
			$("#admin_approve_start_date").val(now.getFullYear()+"-"+(month)+"-"+(day));
			$("#admin_approve_end_date").val(now.getFullYear()+10+"-"+(month)+"-"+(day));
			$("#date_min_div").hide();
		} else {
			$("#admin_approve_start_date").val("");
			$("#admin_approve_end_date").val("");
			$("#date_min_div").show();
		}
	});
}

function adminPendingDeviceEvents(i){
	unbindobject("#btnpendingdvapprove_"+i);
	$("#btnpendingdvapprove_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("btnpendingdvapprove_", "");
		var deviceid = document.getElementById("divpending_"+rowId).getAttribute("data-id");
		$("#unblockdivccont").attr("type", "1");
		$("#unblockdivccont").attr("deviceid", deviceid);
		$("#admin_approve_start_date").val("");
		$("#date_min_div").show();
		$("#admin_approve_end_date").val("");
		$("#chk_admin_approve_infinite").prop("checked", false);
		$("#admin_approve_cmt").val("");
		showActionPopup("unblockdivccont");
	});

	unbindobject("#btnpendingdvblock_"+i);
	$("#btnpendingdvblock_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("btnpendingdvblock_", "");
		var deviceid = document.getElementById("divpending_"+rowId).getAttribute("data-id");
		$("#blockdivccont").attr("type", "1");
		$("#blockdivccont").attr("deviceid", deviceid);
		$("#admin_block_cmt").val("");
		showActionPopup("blockdivccont");
	});
}

function adminBlockedDeviceEvents(i){
	unbindobject("#divblocked_"+i);
	$("#divblocked_"+i).bind("click", function(event){
		if((event.target.id).indexOf("btnblockdvunblock_") < 0 && (event.target.id).indexOf("btnblockdvdelete_") < 0) {
			var rowId = this.id;
			rowId = rowId.replace("divblocked_", "");
			showActionPopup("div_device_comment");
			var commentMsg = admin_comments[i];
			if(commentMsg != undefined && commentMsg != null && commentMsg.length>0){
				var adminString = "";
				for(var j=commentMsg.length-1;checkNullValue(commentMsg) && j>=0; j--)
				{
					var typeCmt = "";
					var typeCmt1 = "";
					if(commentMsg[j].type == "A") {
						typeCmt = "Approved";
					}else if(commentMsg[j].type == "B") {
						typeCmt = "Blocked";
					}
					var commentCreatedDate = Date.parse(commentMsg[j].commented);
					var d = new Date(commentCreatedDate);
					commentCreatedDate = getdatefromtimestamp(d);

					var comment = commentMsg[j].comment;
					if(comment.indexOf("APPROVED ") == 0){
						typeCmt1 = capitalizefirstletterfromallword("APPROVED");
					} else if(comment.indexOf("BLOCKED ") == 0){
						typeCmt1 = capitalizefirstletterfromallword("BLOCKED");
					}
					comment = comment.replace("APPROVED ", "");
					comment = comment.replace("BLOCKED ", "");
					comment = breaktext(capitalizefirstletterfromallword(checkscreenwidthdesc(comment)), 60);
					var commentedby = trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(commentMsg[j].commentBy)), 60);
					if(typeCmt1 == ""){
						typeCmt1 = capitalizefirstletterfromallword(typeCmt);
					}

					if(typeCmt1.length > 0){
						adminString += "<div class='row single' data-id='"+commentMsg[j].id+"'>";
						adminString += "<div class='col-md-4 col-sm-4'>"+comment+"</div>";
						adminString += "<div class='col-md-2 col-sm-2'>"+handleNullValue(typeCmt1)+"</div>";
						adminString += "<div class='col-md-3 col-sm-3'>"+commentCreatedDate+"</div>";
						adminString += "<div class='col-md-3 col-sm-3'>"+commentedby+"</div>";
						adminString += "</div>";
					}
				}
				$("#div_comments_list").html(adminString);
			}
		}
	});

	unbindobject("#cancel_div_comment_"+i);
	$("#cancel_div_comment_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("cancel_div_comment_", "");
		hideActionPopup("device_commnet_div_"+rowId);
	});

	unbindobject("#btnblockdvunblock_"+i);
	$("#btnblockdvunblock_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("btnblockdvunblock_", "");
		var deviceid = document.getElementById("divblocked_"+rowId).getAttribute("data-id");
		$("#unblockdivccont").attr("type", "2");
		$("#unblockdivccont").attr("deviceid", deviceid);
		$("#admin_approve_start_date").val("");
		$("#admin_approve_end_date").val("");
		$("#date_min_div").show();
		$("#chk_admin_approve_infinite").prop("checked", false);
		$("#admin_approve_cmt").val("");
		showActionPopup("unblockdivccont");
	});

	unbindobject("#btnblockdvdelete_"+i);
	$("#btnblockdvdelete_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("btnblockdvdelete_", "");
		var deviceid = document.getElementById("divblocked_"+rowId).getAttribute("data-id");
		$("#delete_divc_cont").attr("type", "2");
		$("#delete_divc_cont").attr("deviceid", deviceid);
		$("#admin_delete_cmt").val("");
		showActionPopup("delete_divc_cont");
	});
}

function adminApprovedDeviceEvents(i){
	unbindobject("#divapproved_"+i);
	$("#divapproved_"+i).bind("click", function(event){
		if((event.target.id).indexOf("btnapprovblock_") < 0 && (event.target.id).indexOf("btnapprovdelete_") < 0) {
			var rowId = this.id;
			rowId = rowId.replace("divapproved_", "");
			showActionPopup("div_device_comment");
			var commentMsg = admin_comments[i];
			if(commentMsg != undefined && commentMsg != null && commentMsg.length>0){
				var adminString = "";
				for(var j=commentMsg.length-1;checkNullValue(commentMsg) && j>=0; j--)
				{
					var typeCmt = "";
					var typeCmt1 = "";
					if(commentMsg[j].type == "A") {
						typeCmt = "Approved";
					}else if(commentMsg[j].type == "B") {
						typeCmt = "Blocked";
					}
					var commentCreatedDate = Date.parse(commentMsg[j].commented);
					var d = new Date(commentCreatedDate);
					commentCreatedDate = getdatefromtimestamp(d);

					var comment = commentMsg[j].comment;
					if(comment.indexOf("APPROVED ") == 0){
						typeCmt1 = capitalizefirstletterfromallword("APPROVED");
					} else if(comment.indexOf("UNBLOCKED ") == 0){
						typeCmt1 = capitalizefirstletterfromallword("UNBLOCKED");
					}
					comment = comment.replace("APPROVED ", "");
					comment = comment.replace("UNBLOCKED ", "");
					comment = breaktext(capitalizefirstletterfromallword(checkscreenwidthdesc(comment)), 60);
					var commentedby = trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(commentMsg[j].commentBy)), 60);
					if(typeCmt1 == ""){
						typeCmt1 = capitalizefirstletterfromallword(typeCmt);
					}

					if(typeCmt1.length > 0){
						adminString += "<div class='col-md-12 col-sm-12 col-xs-12 single' data-id='"+commentMsg[j].id+"'>";
						adminString += "<div class='col-md-4 col-sm-4'>"+comment+"</div>";
						adminString += "<div class='col-md-2 col-sm-2'>"+handleNullValue(typeCmt1)+"</div>";
						adminString += "<div class='col-md-3 col-sm-3'>"+commentCreatedDate+"</div>";
						adminString += "<div class='col-md-3 col-sm-3'>"+commentedby+"</div>";
						adminString += "</div>";
					}
				}
				$("#div_comments_list").html(adminString);
			}
		}
	});

	unbindobject("#cancel_div_comment_"+i);
	$("#cancel_div_comment_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("cancel_div_comment_", "");
		hideActionPopup("device_commnet_div_"+rowId);
	});

	unbindobject("#btnapprovblock_"+i);
	$("#btnapprovblock_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("btnapprovblock_", "");
		var deviceid = document.getElementById("divapproved_"+rowId).getAttribute("data-id");
		$("#blockdivccont").attr("type", "3");
		$("#blockdivccont").attr("deviceid", deviceid);
		$("#admin_block_cmt").val("");
		showActionPopup("blockdivccont");
	});

	unbindobject("#btnapprovdelete_"+i);
	$("#btnapprovdelete_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("btnapprovdelete_", "");
		var deviceid = document.getElementById("divapproved_"+rowId).getAttribute("data-id");
		$("#delete_divc_cont").attr("type", "3");
		$("#delete_divc_cont").attr("deviceid", deviceid);
		$("#admin_delete_cmt").val("");
		showActionPopup("delete_divc_cont");
	});
}

function adminSerachEvents(){
	unbindobject(".searchSec");
	$(".searchSec").bind("click", function(event){
		$("#overlay_user").hide();
		$("#overlay_divc").hide();
		if(($("#mg_user").is(":visible") || $("#live_user_table_div_").is(":visible")) && !$("#overlay_user").is(":visible")){
			$("#overlay_user").show();
			$("#overlay_divc").hide();
		} else if($("#mg_divc").is(":visible") && !$("#overlay_divc").is(":visible")){
			$("#overlay_user").hide();
			$("#overlay_divc").show();
		}
	});

	unbindobject("#closesearchuser");
	$("#closesearchuser").bind("click", function(event){
		clearUserSearch();
		$("#overlay_user").hide();
		$("#overlay_divc").hide();
		$(".clearable__clear").hide();
	});

	unbindobject("#closesearchdevice");
	$("#closesearchdevice").bind("click", function(event){
		clearDeviceSearch();
		clearUserSearch();
		$("#overlay_user").hide();
		$("#overlay_divc").hide();
		$(".clearable__clear").hide();
	});
}

/**
 * method to register the bind events for device rules ip
 * @param ip
 * @returns {Boolean}
 */
function registerBindEventsForDeviceRulesIpAdmin(id) {
	unbindobject("#deleteDeviceRuleId_"+id);
	$("#deleteDeviceRuleId_"+id).bind('click', function(event){
		var rowId = this.id;
		var id = document.getElementById(this.id).getAttribute("data-id");
		adminDeleteDeviceRuleIP(id);
		return false;
	});
}

function adminIpAddEvent(){
	unbindobject("#btnipadd");
	$("#btnipadd").bind("click", function (e) {
		var val1 = $("#txtDeviceRulesIP1_"+lastipindex).val();
		var val2 = $("#txtDeviceRulesIP2_"+lastipindex).val();
		var val3 = $("#txtDeviceRulesIP3_"+lastipindex).val();
		var val4 = $("#txtDeviceRulesIP4_"+lastipindex).val();
		var ipaddr = val1+"."+val2+"."+val3+"."+val4;
		var exists = false;
		if(val1.length > 0 && val2.length > 0 && val3.length > 0 && val4.length > 0){
			for(var i=0;i<lastipindex;i++){
				var val11 = $("#txtDeviceRulesIP1_"+i).val();
				var val21 = $("#txtDeviceRulesIP2_"+i).val();
				var val31 = $("#txtDeviceRulesIP3_"+i).val();
				var val41 = $("#txtDeviceRulesIP4_"+i).val();
				var ip = val11+"."+val21+"."+val31+"."+val41;
				if(ip == ipaddr){
					exists = true;
					break;
				}
			}
			if(!exists){
				adminAutoSaveDeviceRuleIP(ipaddr);
			} else {
				adminShowconfirmmsg(admin_Messages.adminAutoArpprovedExists, confirm_Error, 5000, "", false, false);
			}
		} else {
			adminShowconfirmmsg(admin_Messages.admin_enterValidIpAddress, confirm_Error, 5000, "", false, false);
		}
	});
}

function adminSeachDeviceEvent(){
	unbindobject("#search_btn_device");
	$("#search_btn_device").bind("click", function (e) {
		if($("#pending_req").hasClass("active")){
			ajaxindicatorstart('fetching pending device list.. please wait..');
			$("#pending_Tab").empty();
			adminPendingDeviceSearchDetails();
		} else if($("#blocked_req").hasClass("active")){
			ajaxindicatorstart('fetching blocked device list.. please wait..');
			$("#blocked_Tab").empty();
			adminSearchBlockDetails();
		} else if($("#approved_req").hasClass("active")){
			ajaxindicatorstart('fetching approved device list.. please wait..');
			$("#approved_tab").empty();
			adminApproveDetails();
		}
	});
}

function adminSearchUser(){
	unbindobject("#search_user_btn");
	$("#search_user_btn").bind("click", function (e) {
		adminUserListCheckEmptyFieldForSearch();
	});

	unbindobject("#search_admin_check");
	$("#search_admin_check").bind("click", function (e) {
		if($(this).is(":checked")){
			$("#search_user_check").prop("checked", false);
		} else {
			$("#search_user_check").prop("checked", true);
		}
	});

	unbindobject("#search_user_check");
	$("#search_user_check").bind("click", function (e) {
		if($(this).is(":checked")){
			$("#search_admin_check").prop("checked", false);
		} else {
			$("#search_admin_check").prop("checked", true);
		}
	});

	unbindobject("#cancel_divc_block_comment");
	$("#cancel_divc_block_comment").bind("click", function (e) {
		hideActionPopup("div_device_comment");
	});
}

function adminPaymentEvents(){
	unbindobject("#payment_info_bg");
	$("#payment_info_bg").bind("click", function(event){
		window.open("payment.html", "_blank");
	});
}

function adminUpdateExpiryDate(){
	unbindobject("#btn_save_expiry");
	$("#btn_save_expiry").bind("click", function(event){
		var corpn = $("#admin_sp_corp_number_expire").val();
		var days = $("#admin_sp_days_to_expire").val();
		if(corpn.trim().length > 0 && days.trim().length > 0){
			var jsonInput = {"attribute1":corpn,"attribute2":days};
			adminUpdateExpiryDateService(jsonInput);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_entercorpexpir, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_save_storage");
	$("#btn_save_storage").bind("click", function(event){
		var corpn = $("#admin_sp_corp_number_storage").val();
		var storage = $("#admin_sp_total_storage").val();
		if(corpn.trim().length > 0 && storage.trim().length > 0){
			var jsonInput = {"attribute1":corpn,"attribute2":storage};
			adminUpdateTotalStorageService(jsonInput);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_entercorpstorage, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_save_user");
	$("#btn_save_user").bind("click", function(event){
		var corpn = $("#admin_sp_corp_number_users").val();
		var users = $("#admin_sp_total_uers").val();
		if(corpn.trim().length > 0 && users.trim().length > 0){
			var jsonInput = {"attribute1":corpn,"attribute2":users};
			adminUpdateTotalUsersService(jsonInput);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_entercorpusers, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#admin_user_chk_two_factor_auth");
	$("#admin_user_chk_two_factor_auth").bind("click", function(event){
		if($(this).is(":checked") && $("input[name='radiosecurity']:checked").val() == undefined){
			$("input[name=radiosecurity][value='3']").prop("checked",true);
		} else {
			$("input[name=radiosecurity][value='3']").prop("checked",false);
			$("input[name=radiosecurity][value='2']").prop("checked",false);
			$("input[name=radiosecurity][value='1']").prop("checked",false);
			$("input[name=radiosecurity][value='4']").prop("checked",false);
		}
	});

	unbindobject("#chk_user_mobile_security, #chk_user_email_security, #chk_user_auth_security");
	$("#chk_user_mobile_security, #chk_user_email_security, #chk_user_auth_security").bind("click", function (event) {
		if ($(this).is(":checked")) {
			$("#admin_user_chk_two_factor_auth").prop("checked", true);
		} else {
			$("#admin_user_chk_two_factor_auth").prop("checked", false);
		}
	});


}
function admin_resetpasswordenterkey(){
	$("#newpassword").keyup(function (event) {
	    if (event.keyCode == 13) {
	       	textboxes = $("#confirmpassword");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	 });

	$("#confirmpassword").keyup(function (event) {
	    if (event.keyCode == 13) {
	       	textboxes = $("#resetpassconfirm");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	 });
}

function adminCursorPointInTextField(){
//cursor pint inside create folder text field;
  	$('#modalresetpss').on('shown.bs.modal', function() {
		$('#newpassword').trigger('focus');
  	});
}

function adminDataroomClosureOpenForm(){
  	unbindobject("#btn_admin_close_dataroom");
	$("#btn_admin_close_dataroom").bind("click", function(event){
		if($("#btn_dataroom_close_confirm").html() != "Update"){
			var r = confirm(admin_Messages.admin_dataroomclosestartpopup);
			if(r == true){
				adminCloseDataroomResetPopup();
				showActionPopup("dataroomclosuremodal");
			}
		} else {
			adminFetchDataroomClosureService();
		}
	});

  	unbindobject("#btn_dataroom_close_cancel");
	$("#btn_dataroom_close_cancel").bind("click", function(event){
		hideActionPopup("dataroomclosuremodal");
	});

	unbindobject("#chk_close_dataroom_now");
	$("#chk_close_dataroom_now").bind("click", function(event){
		$("#div_dataroom_close_later_date").hide();
		$("#date_dataroom_close").val("");
	});

	unbindobject("#chk_close_dataroom_later");
	$("#chk_close_dataroom_later").bind("click", function(event){
		$("#div_dataroom_close_later_date").show();
		$("#date_dataroom_close").val("");
	});

	unbindobject("#chk_close_dataroom_flashdrive_no");
	$("#chk_close_dataroom_flashdrive_no").bind("click", function(event){
		adminDataroomCloseFlashDriveHide();
	});

	unbindobject("#chk_close_dataroom_flashdrive_yes");
	$("#chk_close_dataroom_flashdrive_yes").bind("click", function(event){
		adminDataroomCloseFlashDriveShow();
	});

	unbindobject("#btn_dataroom_close_confirm");
	$("#btn_dataroom_close_confirm").bind("click", function(event){
		var isvalid = adminValidateDataroomClosureFields();
		if(isvalid){
			var val = $('input[name="radioclosedataroom"]:checked').val();
			if(val == "1"){
				var r = confirm(admin_Messages.admin_dataroomclosenow);
				if(r == true){
					adminprocessdataroomclosereq();
				}
			} else {
				adminprocessdataroomclosereq();
			}
		}
	});

	unbindobject("#btn_dataroom_close_req_cancel");
	$("#btn_dataroom_close_req_cancel").bind("click", function(event){
		var r = confirm(admin_Messages.admin_dataroomclosecancel);
		if(r == true){
			adminDeleteDataroomClosureService();
		}
	});

}
function adminRedirectHomePage(){
	unbindobject('#drive_link_admin');
	$('#drive_link_admin').bind("click", function(){
		var url ='drive.html';
			winRef = window.open(url, "_self");
	});
}

function adminprocessdataroomclosereq(){
	if($("#btn_dataroom_close_confirm").html() == "Update"){
		adminUpdateDataroomClosureService();
	} else {
		adminProcessDataroomClosureService();
	}
}

function adminDisabledDisclamerDetailsOnNever(){
	$("select#disclaimerfrequency").click(function () {
		var selectedFrequency = $(this).children("option:selected").val();
		if (selectedFrequency == "1") {
			$("#disclaimer_title").prop("readonly", true);
			$("#disclaimermsg").prop("disabled", true);
			$("#disclaimermsg").css({"opacity": "0.5"});
		} else {
			$("#disclaimer_title").prop("readonly", false);
			$("#disclaimermsg").removeAttr("disabled");
			$("#disclaimermsg").css({"opacity": "1"});
		}
	});
}

function adminMultiUserEvent() {

	unbindobject("#addMultiUser");
	$("#addMultiUser").bind("click", function(){
		$("#uploadcsvlable").html("");
		currentuserfile = "";
		// $("#uploadUsers").hide();
		$("#uploadUsers").prop("disabled",true);
		$("#uploadUsers").css({"opacity": "0.5"})
		showActionPopup("multiUserCreationModal", true);
	});

	unbindobject("#uploadcsv");
	$('#uploadcsv').on('click', function () {
		$("#btnuserfilechoose").click();
    });

	unbindobject("#downloadcsv");
	$("#downloadcsv").click(function() {
		window.open(cloudURLACT+"/appnew/template/template.csv", "_blank");
	});

	$("#btnuserfilechoose").on('change', function () {
		$("#uploadcsvlable").html(this.files[0].name);
		currentuserfile = this.files[0];
		$("#uploadUsers").removeAttr("disabled");
		$("#uploadUsers").css({"opacity": "1"})
		$("#uploadUsers").show();
	});

	unbindobject("#uploadUsers");
	$("#uploadUsers").click(function() {
		adminAddmultipleUserService();
		return false;
	});

}

// file size validation for logo
function adminUpdateLogoEvent(){
	$('#image-file').on('change', function() {
		var maxSizeKB = 50; //Size in KB
		var maxSize = maxSizeKB * 1024; //File size is returned in Bytes
		var ext = (this.files[0].name).substring((this.files[0].name).lastIndexOf(".")+1)+"";
		if(ext.toLowerCase() != "png"){
			adminShowconfirmmsg(admin_Messages.logopngonly, confirm_Error, 5000, "", false, false);
			$(this).val("");
			return false;
		} else if (this.files[0].size > maxSize) {
			$(this).val("");
			adminShowconfirmmsg(admin_Messages.logoimagesizeexceed.replace("<&SIZE;>", "50 KB"), confirm_Error, 5000, "", false, false);
			return false;
		} else {
			if (this.files && this.files[0]) {
				var FR= new FileReader();
				FR.addEventListener("load", function(e) {
					logoimgbase64 = e.target.result;
					$("#img_logo_preview").attr("src", logoimgbase64);
				});
				FR.readAsDataURL( this.files[0] );

				$("#btn_image_file_remove").show();
				$("#img_logo_preview").show();
				$("#lbl_change_upload_logo").show();
				$("#image-file").hide();
				$("#lbl_upload_logo").hide();
			}
		}
	});

	$('#btn_image_file_remove').click(function() {
		if(selectedCorpImage != null && selectedCorpImage != "" && selectedCorpImage != "null" && selectedCorpImage.indexOf("null") < 0){
			adminUpdateLogoService();
		}

		$('#image-file').val("");
		$("#image-file").show();
		$("#btn_image_file_remove").hide();
		$("#img_logo_preview").hide();
		$("#lbl_upload_logo").show();
		$("#lbl_change_upload_logo").hide();
	});

	$('#img_logo_preview').click(function() {
		$('#image-file').click();
	});
}
//Metadata events
function metadataEvent(i){
	unbindobject("#dropdownMetadata");
	$("#dropdownMetadata").bind("click", function(event){
		if($("#dropdownMetadata").hasClass("fa fa-angle-double-right")){
			$("#dropdownMetadata").removeClass("fa fa-angle-double-right");
			$("#dropdownMetadata").addClass("fa fa-angle-double-down");
			$(".metadatapreList").show();
			$(".metadatList").show();
		}else if($("#dropdownMetadata").hasClass("fa fa-angle-double-down")){
			$("#dropdownMetadata").removeClass("fa fa-angle-double-down");
			$("#dropdownMetadata").addClass("fa fa-angle-double-right");
			$(".metadatList").hide();
			$(".metadatapreList").show();
		}
	});

	unbindobject("#addMetadataKey");
	$("#addMetadataKey").bind("click", function(event){
		addMetadataMasterService();
	});

	unbindobject("#metadata_row_"+i);
	$("#metadata_row_"+i).bind("click", function(event){
		var rowId = this.id;
		rowId = rowId.replace("metadata_row_", "");
		deleteMetadataMasterService(rowId);
	});
}