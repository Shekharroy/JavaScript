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

	unbindobject("#btnuserexport");
	$("#btnuserexport").bind("click", function(event){
		ajaxindicatorstart('exporting users.. please wait..');
		displaycounter = -1;
		adminFetchUserList("Y");
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



	// unbindobject("#lblshowpassnew");
	// $("#lblshowpassnew").bind("click", function(event){
		// if($(this).html() == "SHOW"){
			// $(this).html("HIDE");
			// $("#newpassword").attr("type", "text");
		// } else if($(this).html() == "HIDE"){
			// $(this).html("SHOW");
			// $("#newpassword").attr("type", "password");
		// }
	// });

	// unbindobject("#lblshowpasscnf");
	// $("#lblshowpasscnf").bind("click", function(event){
		// if($(this).html() == "SHOW"){
			// $(this).html("HIDE");
			// $("#confirmpassword").attr("type", "text");
		// } else if($(this).html() == "HIDE"){
			// $(this).html("SHOW");
			// $("#confirmpassword").attr("type", "password");
		// }
	// });

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
	});

	unbindobject("#passwordback");
	$("#passwordback").bind("click", function(event){
		hideActionPopup("modalresetpss");
	});

	unbindobject("#deleteuserconfirm");
	$("#deleteuserconfirm").bind("click", function(event){
		var userid = document.getElementById("deleteusercont").getAttribute("data-id");
		var idm = document.getElementById("deleteusercont").getAttribute("idm");
		adminDeleteUserService(userid, idm);
	});

	unbindobject("#canceldelete");
	$("#canceldelete").bind("click", function(event){
		hideActionPopup("deleteusercont");
	});

	unbindobject("#blockuserconfirm");
	$("#blockuserconfirm").bind("click", function(event){
		var userid = document.getElementById("blockusercont").getAttribute("data-id");
		var idm = document.getElementById("blockusercont").getAttribute("idm");
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
					$("#chk_adduser_partner").removeAttr("disabled");
					$('#chk_adduser_admin_span').css("color", "#000");
					$("#chk_adduser_user_span").css("color", "#000");
					$("#chk_adduser_partner").css("color", "#000");
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
				$("#chk_user_mobile_security").removeAttr("disabled");
				$("#chk_user_whatsapp_security").removeAttr("disabled");
				$("#chk_user_email_security").removeAttr("disabled");
				$("#chk_user_auth_security").removeAttr("disabled");

				if(twofactorAuth != 1){
					$("#admin_user_chk_two_factor_auth").removeAttr("disabled");
				}
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
			$("#chk_adduser_partner").prop("checked", false);
			$("#chk_adduser_module_admin").prop("checked", true);
		} else {
			$("#chk_adduser_user").prop("checked", true);
			$("#chk_adduser_module_admin").prop("checked", false);
		}
	});

	unbindobject("#chk_adduser_partner");
	$("#chk_adduser_partner").bind("click", function(event){
		if($(this).is(":checked")){
			$("#chk_adduser_user").prop("checked", false);
			$("#chk_adduser_admin").prop("checked", false);
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
			$("#chk_adduser_partner").prop("checked", false);
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
		jsonInput += ",\"id\":\""+contact_id+"\"";
		jsonInput += "}";
		adminSaveUserProfileService(JSON.parse(jsonInput));

		if(($("#mmobilenumber").val().trim()).length > 0 && phone_id > 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"" + phone_id + "\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"phone\":\""+$("#mmobilenumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			adminUpdateUserPhone(JSON.parse(jsonInput));
		} else if(($("#mmobilenumber").val().trim()).length > 0 && phone_id == 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"0\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"phone\":\""+$("#mmobilenumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			adminAddUserPhone(JSON.parse(jsonInput));
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
		reader.readAsDataURL(file);
    });

	unbindobject("#ckb1");
	$("#ckb1").bind("click",function(event){
		$("#increaseuserdiv").hide();
		$("#increasestoragedive").hide();
		$('#txt_add_corp_username').focus();
	});

	unbindobject("#ckb11");
	$("#ckb11").bind("click",function(event){
		$("#increaseuserdiv").show();
		$("#increasestoragedive").show();
		$('#txt_add_corp_username').focus();
	});

}

/**
 * method to register bind events for user list
 * @param i
 * @returns {Boolean}
 */
function registerBindEventsForUserListAdmin(i) {
	unbindobject("#activateuserbtn_" + i);
	unbindobject("#disableuserbtn_" + i);
	unbindobject("#enableuserbtn_" + i);
	unbindobject("#div_user_row_" + i+",adminedituser_"+i);
	unbindobject("#admindeleteuser_"+i);
	unbindobject("#resetpassbtn_" + i);
	unbindobject("#adminresendactivation_" + i);

	$("#activateuserbtn_" + i).bind('tap click touch', function(e) {
		e.preventDefault();
		var rowId = this.id;
		rowId = rowId.replace("activateuserbtn_", "");
		var userid = document.getElementById("div_user_row_"+rowId).getAttribute("data-id");
		var sm = {"attribute1":selectedcorpid,"attribute2":userid};
		activateUserService(sm);
		return false;
	});

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
		$("#deleteusercont").attr("data-id", userid);
		$("#deleteusercont").attr("idm", rowId);
		showActionPopup("deleteusercont");
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
		closeCorporateSearch();
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
		} else if ($("#corporate_Details_bg").hasClass("sidebarliactive")) {
			ajaxindicatorstart('fetching corporate list.. please wait..');
			setTimeout(function () {
				adminFetchCorporateList();
			}, 2000);
		}
		return false;
	});
}

function adminCorporateEvent(){
	unbindobject("#btncorp");
	$("#btncorp").bind("click", function(event){
		openAddCorporate();
		$('#txt_add_corp_username').focus();
	});

	unbindobject("#spadmsetting");
	$("#spadmsetting").bind("click", function (event) {
		ajaxindicatorstart('fetching your Settings.. please wait..');
		adminfetchCorporateDetailsService();

	});

	unbindobject("#btn_add_corp");
	$("#btn_add_corp").bind("click", function(event){
		createNewCorporate();
	});

	unbindobject("#btn_admin_close_corp");
	$("#btn_admin_close_corp").bind("click", function(event){
		hideActionPopup("createcoprmodal");
	});

	unbindobject("#corporate_Details_bg");
	$("#corporate_Details_bg").bind("click", function(event){
		$("#manage_user_div").hide();
		$("#live_user_table_div_").hide();
		$("#admin_sp_amount_enter").val("");
		$("#admin_sp_days_to_expire").val("");
		adminFetchCorporateList();
	});

	unbindobject("#btnsavecorp");
	$("#btnsavecorp").bind("click", function(event){
		if($(this).html() == "EDIT"){
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
			$("#image-file").removeAttr("disabled");
			$("#lbl_change_upload_logo").css("color", "#000");
			$("#admin_chk_watermark_view").removeAttr("disabled");
			$("#admin_chk_watermark_download").removeAttr("disabled");
			$("#admin_chk_prjindex_number").removeAttr("disabled");
			$("#selectTimeZone").removeAttr("disabled");
			$(".watercolor").removeAttr("disabled");
			$("#admin_chk_two_factor_auth").removeAttr("disabled");
			$("#root_alladmin_access").removeAttr("disabled");
		} else if($(this).html() == "SAVE"){
		$(this).html("EDIT");
		$("#btncorpcancel").hide();
		$("#admin_corporate_name").attr("readonly", "true");
		$("#admin_corporate_firstname").attr("readonly", "true");
		$("#admin_corporate_middlename").attr("readonly", "true");
		$("#admin_corporate_lastname").attr("readonly", "true");
		$("#admin_corporate_phone").attr("readonly", "true");
		$("#admin_corporate_email").attr("readonly", "true");
		$("#admin_corporate_place").attr("readonly", "true");
		$("#admin_corporate_street").attr("readonly", "true");
		$("#admin_corporate_city").attr("readonly", "true");
		$("#admin_corporate_state").attr("readonly", "true");
		$("#admin_corporate_zip").attr("readonly", "true");
		$("#admin_corporate_country").attr("readonly", "true");
		$("#admin_watermark_text").attr("readonly", "true");
		$("#admin_chk_watermark_display").attr("disabled", "true");
		$("#admin_chk_watermark_view").attr("disabled", "true");
		$("#admin_chk_watermark_download").attr("disabled", "true");
		$(".watercolor").attr("disabled", "true");
		$('#admin_chk_prjindex_number').attr("disabled", "true");
		$("#selectTimeZone").attr("disabled", "true");
		$("#admin_chk_two_factor_auth").attr("disabled", "true");
		$("#root_alladmin_access").attr("disabled", "true");
		//logo handle
		selectedCorpImage = "";
		$("#image-file").attr("disabled", "true");
		$("#image-file").val("");
		$("#btn_image_file_remove").hide();
		$("#image-file").show();
		$("#img_logo_preview").hide();
		$("#lbl_upload_logo").show();
		$("#lbl_change_upload_logo").hide();
		$("#lbl_change_upload_logo").css("color", "#cccccc");

			if($("#admin_corporate_name").val().trim().length == 0){
				adminShowconfirmmsg("Please enter company name", confirm_Error, 5000, "", false, false);
			} else if($("#admin_corporate_firstname").val().trim().length == 0){
				adminShowconfirmmsg("Please enter first name", confirm_Error, 5000, "", false, false);
			} else if($("#admin_corporate_lastname").val().trim().length == 0 || !validateEmail($("#admin_corporate_email").val().trim())){
				adminShowconfirmmsg("Please enter last name", confirm_Error, 5000, "", false, false);
			} else if($("#admin_corporate_email").val().trim().length == 0 || !validateEmail($("#admin_corporate_email").val().trim())){
				adminShowconfirmmsg("Please enter valid email id", confirm_Error, 5000, "", false, false);
			} else {
				ajaxindicatorstart('saving your corporate details.. please wait..');
				adminSaveClientService();
				//adminUpdateLogoService();
				if (logoimgbase64 != "") {
					adminUpdateLogoService();
				}


			}
		}
	});

	unbindobject("#admin_useremailadd");
	$("#admin_useremailadd").bind("click", function(event){
		if($("#btnsavecorp").html() == "SAVE"){
			var val = $("#admin_watermark_text").val().trim();
			if(val.indexOf("[useremail]") < 0){
				val += " [useremail]";
				$("#admin_watermark_text").val(val);
			}
		}
	});

	unbindobject("#admin_dateadd");
	$("#admin_dateadd").bind("click", function(event){
		if($("#btnsavecorp").html() == "SAVE"){
			var val = $("#admin_watermark_text").val().trim();
			if(val.indexOf("[date]") < 0){
				val += " [date]";
				$("#admin_watermark_text").val(val);
			}
		}
	});
	unbindobject("#admin_ipaddressadd");
	$("#admin_ipaddressadd").bind("click", function(event){
		if($("#btnsavecorp").html() == "SAVE"){
			var val = $("#admin_watermark_text").val().trim();
			if(val.indexOf("[ipaddress]") < 0){
				val += " [ipaddress]";
				$("#admin_watermark_text").val(val);
			}
		}
	});

	unbindobject("#btncorpcancel");
	$("#btncorpcancel").bind("click", function(event){
		$(this).hide();
		ajaxindicatorstart('please wait..');
		adminfetchCorporateDetailsService();
	});
}

function adminDeviceEvent(){
	unbindobject("#manage_device_bg");
	$("#manage_device_bg").bind("click", function(event){
		$("#blocked_req").removeClass("active");
		$("#approved_req").removeClass("active");
		$("#autoDevice_req").removeClass("active");
		$("#pending_req").addClass("active");
		$("#pending_Tab").empty();
		$("#autoip_Tab").hide();
		ajaxindicatorstart('fetching pending device list.. please wait..');
		clearDeviceSearch();
		clearUserSearch();
		closeCorporateSearch();
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
		closeCorporateSearch();
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
		closeCorporateSearch();
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
		closeCorporateSearch();
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
		closeCorporateSearch();
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
		if($("#admin_approve_infinite").val().trim().length == 0){
			adminShowconfirmmsg("Please enter duration", confirm_Error, 5000, "", false, false);
			$("#admin_approve_infinite").focus();
		} else {
			var type = document.getElementById("unblockdivccont").getAttribute("type");
			var deviceid = document.getElementById("unblockdivccont").getAttribute("deviceid");
			if($("#admin_approve_cmt").val().trim().length > 0){
				if($("#pending_req").hasClass("active")){
					adminapprovedeviceService(deviceid, type, "APPROVED");
				} else if($("#blocked_req").hasClass("active")){
					adminapprovedeviceService(deviceid, type, "UNBLOCKED");
				}
			} else {
				adminShowconfirmmsg("Please enter comment", confirm_Error, 5000, "", false, false);
			}
		}
	});

	unbindobject("#chk_admin_approve_infinite");
	$("#chk_admin_approve_infinite").bind("click", function(event){
		if($(this).is(":checked")){
			$("#admin_approve_infinite").attr("readonly", true);
			$("#admin_approve_infinite").val("infinite");
		} else {
			$("#admin_approve_infinite").removeAttr("readonly");
			$("#admin_approve_infinite").val("");
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
		$("#admin_approve_infinite").val("");
		$("#chk_admin_approve_infinite").prop("checked", false);
		$("#admin_approve_cmt").val("");
		$("#admin_approve_infinite").removeAttr("disabled");
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
		$("#admin_approve_infinite").val("");
		$("#chk_admin_approve_infinite").prop("checked", false);
		$("#admin_approve_cmt").val("");
		$("#admin_approve_infinite").removeAttr("disabled");
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
		$("#overlay_corporate").hide();
		if(($("#mg_user").is(":visible") || $("#live_user_table_div_").is(":visible")) && !$("#overlay_user").is(":visible")){
			clearUserSearch();
			$("#overlay_user").show();
			$("#overlay_divc").hide();
		} else if($("#mg_divc").is(":visible") && !$("#overlay_divc").is(":visible")){
			clearDeviceSearch();
			$("#overlay_user").hide();
			$("#overlay_divc").show();
		}else if($("#mg_corplist").is(":visible") && !$("#overlay_corporate").is(":visible")){
			closeCorporateSearch();
			$("#overlay_user").hide();
			$("#overlay_divc").hide();
			$("#overlay_corporate").show();
		}
	});

	unbindobject("#closesearchuser");
	$("#closesearchuser").bind("click", function(event){
		clearUserSearch();
		clearDeviceSearch();
		closeCorporateSearch();
		$("#overlay_user").hide();
		$("#overlay_divc").hide();
		$("#overlay_corporate").hide();
		$(".clearable__clear").hide();
	});

	unbindobject("#closesearchdevice");
	$("#closesearchdevice").bind("click", function(event){
		clearDeviceSearch();
		clearUserSearch();
		closeCorporateSearch();
		$("#overlay_user").hide();
		$("#overlay_divc").hide();
		$("#overlay_corporate").hide();
		$(".clearable__clear").hide();
	});

	unbindobject("#closesearchcorporate");
	$("#closesearchcorporate").bind("click", function(event){
		clearDeviceSearch();
		clearUserSearch();
		closeCorporateSearch();
		$("#overlay_user").hide();
		$("#overlay_divc").hide();
		$("#overlay_corporate").hide();
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

function adminSearchCorporate(){
	unbindobject("#search_corporate_btn");
	$("#search_corporate_btn").bind("click", function (e) {
		corporateFieldForSearch();
	});

	unbindobject("#search_business_check");
	$("#search_business_check").bind("click", function (e) {
		if($(this).is(":checked")){
			$("#search_individual_check").prop("checked", false);
		} else {
			$("#search_individual_check").prop("checked", true);
		}
	});

	unbindobject("#search_individual_check");
	$("#search_individual_check").bind("click", function (e) {
		if($(this).is(":checked")){
			$("#search_business_check").prop("checked", false);
		} else {
			$("#search_business_check").prop("checked", true);
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
		var corpn = selectedcorpnumber;
		var days = $("#admin_sp_days_to_expire").val();
		if(corpn.trim().length > 0 && days.trim().length > 0){
			var jsonInput = {"attribute1":selectedcorpnumber,"attribute2":days};
			adminUpdateExpiryDateService(jsonInput);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_entercorpexpir, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_save_storage");
	$("#btn_save_storage").bind("click", function(event){
		var corpn = selectedcorpnumber;
		var storage = $("#admin_sp_total_storage").val();
		storage = parseFloat(storage) * 1048576;
		var consumedStorage = $("#admin_sp_corp_consumed_storage").val();
		consumedStorage = parseFloat(consumedStorage) * 1048576;
		if(corpn.trim().length > 0 && storage > 0){
			if(storage >= consumedStorage){
				var jsonInput = {"attribute1":selectedcorpnumber,"attribute2":storage};
				adminUpdateTotalStorageService(jsonInput);
			}else{
				adminShowconfirmmsg(admin_Messages.admin_enterstoragegreaterthenconsumed, confirm_Error, 5000, "", false, false);
			}
		} else {
			adminShowconfirmmsg(admin_Messages.admin_entercorpstorage, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_save_user");
	$("#btn_save_user").bind("click", function(event){
		var corpn = selectedcorpnumber;
		var users = $("#admin_sp_total_uers").val();
		if(corpn.trim().length > 0 && users.trim().length > 0){
			var jsonInput = {"attribute1":selectedcorpnumber,"attribute2":users};
			adminUpdateTotalUsersService(jsonInput);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_entercorpusers, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_save_poll");
	$("#btn_save_poll").bind("click", function(event){
		var corpn = selectedcorpid;
		var maxPoll = $("#admin_input_max_poll").val();
		var maxAgenda = $("#admin_input_max_agenda").val();
		var maxVoter = $("#admin_input_max_voter").val();
		if(maxPoll.trim().length > 0 && maxAgenda.trim().length > 0 && maxVoter.trim().length > 0){
			var jsonInput = {
				"attribute1":corpn,
				"attribute2":maxPoll,
				"attribute3":maxAgenda,
				"attribute4":maxVoter,
				"attribute5":"updateMaxPollServiceAfter"
			};
			updateMaxPollService(jsonInput);
		} else {
			adminShowconfirmmsg("Plese provide all input.", confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_save_amount");
	$("#btn_save_amount").bind("click", function(event){
		var amount = $("#admin_sp_amount_enter").val();
		if(amount.trim().length > 0){
			var jsonInput = {
				"attribute1": "updateCorppaymentInfoServiceAfter",
				"attribute2": selectedcorpid,
				"attribute3": amount,
				"attribute5": "updateMaxPollServiceAfter"
			};
			updateCorppaymentInfoService(jsonInput);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_provide_price, confirm_Error, 5000, "", false, false);
		}
	});
}

function registerBindEventsForCorpListAdmin(idm){
	unbindobject("#div_corp_row_"+idm);
	$("#div_corp_row_"+idm).bind("click", function(event){
		selectedcorpid = $(this).attr("data-id");
		selectedcorpnumber = $(this).attr("data-number");
		$("#mg_header_caption").html("Selected corporate : " + selectedcorpnumber);
		adminfetchCorporateDetailsService();
		return false;
	});

	unbindobject("#disablecoprbtn_"+idm);
	$("#disablecoprbtn_"+idm).bind("click", function(event){
		selectedcorpid = $(this).attr("data-id");
		selectedcorpnumber = $(this).attr("data-number");
		var jsonInput = {"attribute1":selectedcorpnumber, "attribute2":"I"};
		activateCorporateService(jsonInput);
		return false;
	});

	unbindobject("#enablecorpbtn_"+idm);
	$("#enablecorpbtn_"+idm).bind("click", function(event){
		selectedcorpid = $(this).attr("data-id");
		selectedcorpnumber = $(this).attr("data-number");
		var jsonInput = {"attribute1":selectedcorpnumber, "attribute2":"A"};
		activateCorporateService(jsonInput);
		return false;
	});
}

function admincheckcreatecorpradioevent(){
	$('input[type=radio][name=MyRadio]').change(function(){
		if(this.value == 'I'){
			$("#div2factauth").hide();
			$("#divrootaccess").hide();
			$("#divmodules").hide();
		}else if(this.value == 'B'){
			$("#div2factauth").show();
			$("#divrootaccess").show();
			$("#divmodules").show();
		}
	});

	unbindobject("#admin_user_chk_two_factor_auth");
	$("#admin_user_chk_two_factor_auth").bind("click", function(event){
		if($(this).is(":checked") && $("input[name='radiosecurity']:checked").val() == undefined){
			$("input[name=radiosecurity][value='3']").prop("checked",true);
		}else {
			$("input[name=radiosecurity][value='3']").prop("checked",false);
			$("input[name=radiosecurity][value='2']").prop("checked",false);
			$("input[name=radiosecurity][value='1']").prop("checked",false);
			$("input[name=radiosecurity][value='4']").prop("checked",false);
		}
	});

	unbindobject("#chk_user_mobile_security, #chk_user_email_security, #chk_user_auth_security");
	$("#chk_user_mobile_security, #chk_user_email_security, #chk_user_auth_security").bind("click", function(event){
		if($(this).is(":checked")){
			$("#admin_user_chk_two_factor_auth").prop("checked", true);
		}else{
			$("#admin_user_chk_two_factor_auth").prop("checked", false);
		}
	});
}

function admin2factorpopevents(){
	unbindobject("#btnapplyallconfirmdone");
	$("#btnapplyallconfirmdone").bind("click", function(event){
		ajaxindicatorstart('creating corporate..');
		createCorporate();
		hideActionPopup("applyallconfirmmodal");
		return false;
	});

	unbindobject("#btnapplyallconfirmcancel");
	$("#btnapplyallconfirmcancel").bind("click", function(event){
		hideActionPopup("applyallconfirmmodal");
		return false;
	});
}
function spadmCursorPointInTextField(){
	//cursor pint inside create folder text field;
  	$('#modalresetpss').on('shown.bs.modal', function() {
		$('#newpassword').trigger('focus');
  	});
}

function spadmProviderSelectEvent(){
	unbindobject("#sel_storage_provider");
	$("#sel_storage_provider").on('change', function (e) {
		if($(this).val() == 2){
			$("#pid_aws_1").hide();
			$("#pid_aws_2").hide();
			$("#pid_aws_4").hide();
			$("#pid_aws_3").hide();
			$("#pid_file_1").hide();
			$("#pid_file_2").hide();
			$("#pid_file_3").hide();
			$("#div_default_storage_key").show();
			$("#pid_azure_1").show();
			$("#pid_azure_2").show();
		} else if($(this).val() == 1){
			$("#pid_azure_1").hide();
			$("#pid_azure_2").hide();
			$("#pid_file_1").hide();
			$("#pid_file_2").hide();
			$("#pid_file_3").hide();
			$("#div_default_storage_key").show();
			$("#pid_aws_1").show();
			$("#pid_aws_2").show();
			$("#pid_aws_4").show();
			$("#pid_aws_3").show();
		} else if($(this).val() == 3){
			$("#pid_azure_1").hide();
			$("#pid_azure_2").hide();
			$("#pid_aws_1").hide();
			$("#pid_aws_2").hide();
			$("#pid_aws_4").hide();
			$("#pid_aws_3").hide();
			$("#div_default_storage_key").hide();
			$("#pid_file_1").show();
			$("#pid_file_2").show();
			$("#pid_file_3").show();
		}
	});

	unbindobject("#ckbdefkeys");
	$("#ckbdefkeys").on('click', function (e) {
		if(!$(this).is(":checked")) {
			if($("#sel_storage_provider").val() == 2){
				$("#pid_aws_1").hide();
				$("#pid_aws_2").hide();
				$("#pid_aws_4").hide();
				$("#pid_aws_3").hide();
				$("#pid_azure_1").show();
				$("#pid_azure_2").show();
			} else if($("#sel_storage_provider").val() == 1){
				$("#pid_azure_1").hide();
				$("#pid_azure_2").hide();
				$("#pid_aws_1").show();
				$("#pid_aws_2").show();
				$("#pid_aws_4").show();
				$("#pid_aws_3").show();
			}
		} else {
			$("#pid_aws_1").hide();
			$("#pid_aws_2").hide();
			$("#pid_aws_4").hide();
			if($("#sel_storage_provider").val() == 1) $("#pid_aws_3").show();
			$("#pid_azure_1").hide();
			$("#pid_azure_2").hide();
		}
	});
}

function adminDataroomClosureOpenForm(){
  	unbindobject("#btn_admin_close_dataroom");
	$("#btn_admin_close_dataroom").bind("click", function(event){
		$("#dataroomclosuremodalcaption").html("Close Dataroom");
		if($("#btn_dataroom_close_confirm").html() != "Update"){
			var r = confirm(admin_Messages.admin_dataroomclosestartpopup);
			if(r == true){
				adminCloseDataroomResetPopup();
				$("#btn_dataroom_close_print").hide();
				showActionPopup("dataroomclosuremodal");
			}
		} else {
			adminFetchDataroomClosureService();
		}
	});

	unbindobject("#btn_admin_archive_dataroom");
	$("#btn_admin_archive_dataroom").bind("click", function(event){

		if($("#btn_admin_archive_dataroom").html() == "Archive dataroom"){
			var r = confirm("Are sure to archive dataroom");
			if(r == true){
				archiveDataroomService();
				adminShowconfirmmsg("Request processed successfully.", confirm_Success, 5000, "", false, false);
				$("#btn_admin_archive_dataroom").html("Archiving dataroom");
				$("#btn_admin_archive_dataroom").prop('disabled', true);
			}
		}else if($("#btn_admin_archive_dataroom").html() == "Retrive dataroom"){
			var r = confirm("Are sure to retrive dataroom");
			if(r == true){
				retriveDataroomService();
				adminShowconfirmmsg("Request processed successfully.", confirm_Success, 5000, "", false, false);
				$("#btn_admin_archive_dataroom").html("Retrival in progress");
				$("#btn_admin_archive_dataroom").prop('disabled', true);
			}
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

	unbindobject("#btn_admin_close_dataroom_delete");
	$("#btn_admin_close_dataroom_delete").bind("click", function(event){
		var r = confirm(admin_Messages.admin_dataroom_delete);
		if(r == true){
			adminDeleteDataroomService();
			$("#btn_admin_reopen_dataroom").hide();
		}
	});

	unbindobject("#btn_admin_reopen_dataroom");
	$("#btn_admin_reopen_dataroom").bind("click", function(event){
		var r = confirm(admin_Messages.admin_dataroom_reopen);
		if(r == true){
			adminReopenDataroomService();
		}
	});

	unbindobject("#btn_dataroom_close_print");
	$("#btn_dataroom_close_print").bind("click", function(event){
		adminprintdataclosureform();
	});


}

function adminprocessdataroomclosereq(){
	if($("#btn_dataroom_close_confirm").html() == "Update"){
		adminUpdateDataroomClosureService();
	} else {
		adminCheckArchivedFolderService();
	}
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

function spdModuleEventSave(){
	unbindobject("#btn_save_corp_modules");
	$("#btn_save_corp_modules").click(function() {
		var json = {"attribute1":"saveCorpModulesServiceAfter", "listAttribute5":[]};
		$(".chk_admin_modules").each(function(i, obj) {
		    json.listAttribute5.push({"attribute2":selectedcorpid,"attribute3":$(this).attr("data-id"),"attribute4":($(this).is(":checked") ? 1 : 0)});
		});
		saveCorpModulesService(json);
		return false;
	});
}

//admin logo update event
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
		logoimgbase64 = "";
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

function adminCheckIndividualUserCreationRadioButtonSelectedEvent() {
	if ($('#ckb1').is(":checked")) {
		$("#increaseuserdiv").hide();
		$("#increasestoragedive").hide();
	}else if($('#ckb11').is(":checked")){
		$("#increaseuserdiv").show();
		$("#increasestoragedive").show();
	}
}

function reportDownloadEvent(){
	unbindobject("#btnreportdownload");
	$("#btnreportdownload").bind("click", function(){
		$("#reportdownloadmodal").show();
	});
	unbindobject("#btn_download_report_close");
	$("#btn_download_report_close").bind("click", function(){
		$("#reportdownloadmodal").hide();
	});
	unbindobject("#btn_download_report");
	$("#btn_download_report").bind("click", function(){
		var reportType = $("#sel_download_report").val();
		downloadReportService(reportType);
	});
}

function spadmAIEvents(){
	unbindobject("#spadmsearchindex");
	$("#spadmsearchindex").bind("click", function(){
		$("#manage_user_bg").removeClass("sidebarliactive");
		$("#img_manage_user").removeClass("sidebarliimgactive");
		$("#manage_device_bg").removeClass("sidebarliactive");
		$("#img_manage_devices").removeClass("sidebarliimgactive");
		$("#corporate_Details_bg").removeClass("sidebarliactive");
		$("#img_corp_details").removeClass("sidebarliimgactive");
		$("#spadmtraindoc").removeClass("sidebarliactive");
		$("#spadmsetting").removeClass("sidebarliactive");
		$("#spadmsearchindex").addClass("sidebarliactive-ai");
		$("#img_spadmsearchindex").addClass("sidebarliimgactive");
		$('#mg_user').hide();
		$("#admin_searchbar").hide();
		$('#adduser').hide();
		$('#mg_divc').hide();
		$('#mg_corp').hide();
		$('#mg_train_doc').hide();
		$('#mg_ai').show();
		spdFetchIndexService();
		return false;
	});

	unbindobject("#div_index_close");
	$("#div_index_close").bind("click", function(){
		hideActionPopup("div_search_index_add_corporate");
	});

	unbindobject("#div_add_ataroom");
	$("#div_add_ataroom").bind("click", function(){
		if($("#txt_index_corporateid").val().trim().length > 0){
			var found = false;
			$(".indexcorporates").each(function(i, obj) {
				if($(this).html() == $("#txt_index_corporateid").val().trim()){
					found = true;
				}
			});
			if(!found){
				spdAddIndexDataSourceService($("#div_search_index_add_corporate").attr("data-index-name"),
					$("#div_search_index_add_corporate").attr("data-index-id"), $("#div_search_index_add_corporate").attr("data-id"));
			} else {
				adminShowconfirmmsg("Corporate id is already associated with search index.", confirm_Error, 5000, "", false, false);
			}
		} else {
			adminShowconfirmmsg("Enter corporate id.", confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btn_refresh_index");
	$("#btn_refresh_index").bind("click", function(){
		spdFetchIndexService();
	});

unbindobject("#spadmtraindoc");
	$("#spadmtraindoc").bind("click", function(){
		$("#manage_user_bg").removeClass("sidebarliactive");
		$("#img_manage_user").removeClass("sidebarliimgactive");
		$("#manage_device_bg").removeClass("sidebarliactive");
		$("#img_manage_devices").removeClass("sidebarliimgactive");
		$("#corporate_Details_bg").removeClass("sidebarliactive");
		$("#img_corp_details").removeClass("sidebarliimgactive");
		$("#spadmsetting").removeClass("sidebarliactive");
		$("#spadmsearchindex").removeClass("sidebarliactive-ai");
		$("#img_spadmsearchindex").removeClass("sidebarliimgactive");
		$("#spadmtraindoc").addClass("sidebarliactive");
		$('#mg_user').hide();
		$("#admin_searchbar").hide();
		$('#adduser').hide();
		$('#mg_divc').hide();
		$('#mg_corp').hide();
		$('#mg_ai').hide();
		$('#mg_train_doc').show();
		spdFetchAutoAITagsService();
		return false;
	});

	unbindobject("#btn_import_tags");
	$("#btn_import_tags").bind("click", function(){
		currentuserfile = "";
		$("#btnautoaitagschooefile").click();
	});

	$("#btnautoaitagschooefile").on('change', function () {
		spdImportAutoAITags(this.files[0]);
		$("#btnautoaitagschooefile").val("");
	});

	unbindobject("#btn_refresh_tags");
	$("#btn_refresh_tags").bind("click", function(){
		spdFetchAutoAITagsService();
	});

	unbindobject("#btn_save_tags_all_dataroom");
		$("#btn_save_tags_all_dataroom").bind("click", function(){
			spdSaveAutoAITagsDataroomsService();
	});
}

function spdIndexMultipleIndexEvents(id){
	unbindobject("#btn_adddataroomtoindex_"+id);
	$("#btn_adddataroomtoindex_"+id).bind("click", function(){
		$("#txt_index_corporateid").val("");
		$("#div_search_index_add_corporate").attr("data-index-id", $(this).attr("data-index-id"));
		$("#div_search_index_add_corporate").attr("data-index-name", $(this).attr("data-index-name"));
		$("#div_search_index_add_corporate").attr("data-id", $(this).attr("data-id"));
		showActionPopup("div_search_index_add_corporate");
		return false;
	});
}

function spdIndexDataSourceEvents(id){
	unbindobject("#btn_remove_dataroom_"+id);
	$("#btn_remove_dataroom_"+id).bind("click", function(){
		if (confirm("Are you sure to delete this corporate from search index") == true) {
			spdDeleteIndexDataSourceService($(this).attr("data-lawfirm"),$(this).attr("data-index-name"),$(this).attr("data-index-id"));
		}
		return false;
	});

	unbindobject("#btn_delete_dataroom_"+id);
	$("#btn_delete_dataroom_"+id).bind("click", function(){
		if (confirm("Are you sure to delete this corporate from search index") == true) {
			spdRemoveIndexDataSourceService($(this).attr("data-lawfirm"),$(this).attr("data-index-name"),$(this).attr("data-index-id"));
		}
		return false;
	});

	unbindobject("#btn_sync_now_"+id);
	$("#btn_sync_now_"+id).bind("click", function(){
		spdSyncIndexDataSourceService($(this).attr("data-lawfirm"),$(this).attr("data-index-name"),$(this).attr("data-index-id"));
		return false;
	});
}

function spdAutoAiTagsMultiEvents(id){
	unbindobject("#icon_auto_tags_delete_"+id);
	$("#icon_auto_tags_delete_"+id).bind("click", function(){
		spdDeleteAutoAITagsService($(this).attr("data-id"));
		return false;
	});
}