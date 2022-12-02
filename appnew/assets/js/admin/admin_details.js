var totalusers = 0;
var totalLiveUser = 0;
var sizeLeft = -1;
var allocatedStorage = -1;
var userimgbase64 = "";
var prvuserimg = "";
var contact_id = "";
var phone_id = "";
var fax_id = "";
var rootAccesstoAllAdmins = "0";
var adminSaveUserPhoneURL = "/v1/app/contactphoneupd/0/<ACTION>";
var adminSaveUserFaxURL = "/v1/app/contactfaxupd/0/<ACTION>";
var adminAddUserPhoneURL = "/v1/app/contactphoneadd/0/<ACTION>";
var adminAddUserFaxURL = "/v1/app/contactfaxadd/0/<ACTION>";
var dis_msg = "";
var dis_type = 0;
var dis_title = "";
var dis_id = 0;
var totalPersonalStorage = 0;
var totalDataroomStorage = 0;
var metadataCount = 0;
var metaDataList = [];

function displayUsercommon(){
	prvuserimg = "";
	if(localStorage._zs == "I") {
		$("#adm_corpd").remove();
	}
	$("#manage_user_bg").addClass("sidebarliactive");
	$("#img_manage_user").addClass("sidebarliimgactive");
	$("#corporate_Details_bg").removeClass("sidebarliactive");
	$("#img_corp_details").removeClass("sidebarliimgactive");
	$("#manage_device_bg").removeClass("sidebarliactive");
	$("#img_manage_devices").removeClass("sidebarliimgactive");
	$('#mg_user').show();
	$('#btnuser').show();
	$('#addicon').show();
	$("#admin_searchbar").show();
	$('#adduser').hide();
	$('#mg_corp').hide();
	$('#mg_divc').hide();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#div_export_users").show();
	if(pagecount > 1){
		$("#tableHeadPages").show();
	} else {
		$("#tableHeadPages").hide();
	}

	var msgWidth = $(window).width() - 100;
	$('#divpages').css("max-width", msgWidth);
	$('#divpages').css("overflow", "auto");
	if ( $.browser.webkit) {
		$('#divpages').addClass("scrollable-element");
	}else{
		$('#divpages').addClass("scrollable-elements");
	}
	adminCheckPersonal();
	ajaxindicatorstop();
}

function displayUserListDataRowsDB(response){
	totalusers = 0;
	totalPersonalStorage = 0;
	totalDataroomStorage = 0;
	displaycounter = 0;
	$("#divpages").html("");

	ajaxindicatorstop();
	var details = response;
	if(response.object != undefined) {
		details = response.object;
		userdetails = details;
		$("#table_manageuser").empty();

		if(localStorage._zs == "B") {
			$("#tableHeadSecI").hide();
			$("#tableHeadSecB").show();
		} else {
			$("#tableHeadSecB").hide();
			$("#tableHeadSecI").show();
		}

		if(details !=null && details.length>0) {
			if(usersearch.length == 0){
				usersearch = details;
			}
			var j = 0;
			pagecount = parseInt(details.length/maxrows) + 1;
			var count = 0;
			userlistarrar = [];
			userlistarrartemp = [];
			for(var i=0;i<details.length;i++){
				totalusers++;
				var personalstorage = details[i].persoanDataUsage;
				try{
					personalstorage = formatBytesDecimal(parseFloat(personalstorage));
				}catch(error){}

				var dataroomstorage = details[i].sharedDataUsage;
				try{
					dataroomstorage = formatBytesDecimal(parseFloat(dataroomstorage));
				}catch(error){}

				totalPersonalStorage = totalPersonalStorage + parseInt(details[i].persoanDataUsage);
				totalDataroomStorage = totalDataroomStorage + parseInt(details[i].sharedDataUsage);

				userlistarrartemp[j] = details[i];
				if((j == maxrows-1) || (count == pagecount-1 && i == details.length-1)) {
					j = 0;
					userlistarrar[count++] = userlistarrartemp;
					$("#divpages").append("<a href='javascript:void(0);' style='color:#9f9797;margin-right:10px;text-decoration:none;' class='pagecount' id='pagecount_"+count+"' onclick='displayUserListDataRowsDBUI("+(count-1)+")'>"+count+"</a>");
					userlistarrartemp = [];
				} else {
					j++;
				}
			}
			$('#totalusercount').html(totalusers);
			displayUserListDataRowsDBUI(displaycounter);
			if(pagecount > 1) $("#tableHeadPages").show();

			if(localStorage._zmd.split(",").includes("8")){
				personalactive = true;
			}else{
				personalactive = false;
			}
			adminCheckPersonal();
			try{
				totalPersonalStorage = formatBytesDecimal(parseFloat(totalPersonalStorage));
			}catch(error){}

			try{
				totalDataroomStorage = formatBytesDecimal(parseFloat(totalDataroomStorage));
			}catch(error){}
			$('#totalpersonalCount').html(totalPersonalStorage);
			$('#totalDataRoomCount').html(totalDataroomStorage);
			try{
				if(response.extrajsonparam.export == "Y") adminExportUsers();
			}catch(error){
				console.log(error);
			}
		} else {
			if(searchdone == 1){
				adminShowconfirmmsg(admin_Messages.admin_norec, confirm_Error, 5000, "", false, false);
			}
		}
		searchdone = 0;
	}
	displayUsercommon();
	duePaymentService();
}

function displayUserListDataRowsDBUI(counter){
	ajaxindicatorstart('fetching users...');
	displaycounter = counter;
	$("#table_manageuser").html("");
	$(".pagecount").css("color", "#9f9797");
	$(".pagecount").css("font-size", "14px");
	$(".pagecount").css("font-weight", "normal");
	$(".pagecount").css("text-decoration", "none");

	$("#pagecount_" + (counter + 1)).css("color", "#2abfc1");
	$("#pagecount_" + (counter + 1)).css("font-size", "17px");
	$("#pagecount_" + (counter + 1)).css("font-weight", "bold");
	$("#pagecount_" + (counter + 1)).css("text-decoration", "underline");

	var details = userlistarrar[counter];
	for(var i=0;i<details.length;i++){
		if(details[i].userId !=0) {
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
			var imagePath = replacenullval(details[i].picture);
			if(imagePath.indexOf("resources/images/") >= 0){
				imagePath = cloudApiUrlACMS + imagePath.replace("resources/images/","/resources/");
			}
			if(imagePath != null && (imagePath+"").length > 0){
				var d = new Date();
				imagePath = imagePath + "?timestamp=" + d.getTime();
			} else {
				imagePath = "assets/icons/Layer_1336.png";
			}

			if(localStorage._zv == details[i].userId) {
				$("#userimg").removeAttr("src");
				$("#userimg").attr("src", imagePath);
			}

			var personalstorage = details[i].persoanDataUsage;
			try{
				personalstorage = formatBytesDecimal(parseFloat(personalstorage));
			}catch(error){}

			var dataroomstorage = details[i].sharedDataUsage;
			try{
				dataroomstorage = formatBytesDecimal(parseFloat(dataroomstorage));
			}catch(error){}

			var datavar = "data-id='"+details[i].userId+"' data-status='"+userstatus+"'";
			var adminString = "";
			adminString += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 admtable_row_padding userrow1' id='div_user_row_"+i+"' "+datavar+">";
			if(localStorage._zs == "B") {
				adminString += "<div class='col-md-4 col-sm-4 userrow2'>";
			} else {
				adminString += "<div class='col-md-4 col-sm-4 userrow2'>";
			}
			adminString += "<img src='"+imagePath+"' class='img-circle' style='width:30px;height:30px;margin-right:5px;margin-top:14px;'>";
			adminString += "<h2 style='display:inline-flex;'>";
			adminString += "<a href='#' style='height:18px;font-size:14px;font-weight:400;line-height:20px;' title='"+userName+"'>"+trimOverFlowCharacters(userName)+"";
			if(localStorage._zv != details[i].userId) {
				adminString += "<br>";
				if(userstatus == "P"){
					if(details[i].activationStatus == 2) {
						adminString += "<span class='blockuser' style='color:red;' id='user_activation_pending_"+i+"'>Activation failed</span>";
					} else {
						adminString += "<span class='blockuser' id='user_activation_pending_"+i+"'>Waiting for Activation</span>";
					}
					userstatusstr = "Waiting for Activation";
				} else if(userstatus == "X"){
					adminString += "<span class='blockuser' style='color:red;' id='user_activation_pending_"+i+"'>Activation failed</span>";
				} else {
					adminString += "<span class='blockColor pointerClass blockuser' id='disableuserbtn_"+i+"' style='display:"+(userstatus == "A" ? "":"none")+"'>Block</span>";
					adminString += "<span class='unblockColor pointerClass blockuser' id='enableuserbtn_"+i+"' style='display:"+(userstatus == "A" ? "none":"")+"'>Unblock</span>";
					userstatusstr = (userstatus == "A" ? "Active":"Blocked");
				}
			}
			adminString += "</a>";
			adminString += "</h2>";
			adminString += "</div>";

			if(localStorage._zs == "B") {
				adminString += "<div class='col-md-3 col-sm-3 userrow6 admin_user_detail_col2' style='padding-top: 19px;' id='admin_user_detail_col2_"+i+"'>"+loginId.toLowerCase()+"</div>";
			} else {
				adminString += "<div class='col-md-4 col-sm-4 userrow6 admin_user_detail_col2' style='padding-top: 19px;' id='admin_user_detail_col2_"+i+"'>"+loginId.toLowerCase()+"</div>";
			}
			adminString += "<div class='co-md-1 col-sm-1' style='padding-top: 19px;' id='admin_user_detail_col2_"+i+"'>"+userType+"</div>";
			if(localStorage._zs != "B"){
				adminString += "<div class='col-md-2 col-sm-2 userrow6 admin_personal_row' style='padding-top: 19px; padding-left:123px;' id='admin_user_detail_col3_"+i+"'>"+personalstorage+"</div>";
			}else{
				adminString += "<div class='col-md-1 col-sm-1 userrow6 admin_personal_row' style='padding-top: 19px; padding-left:19px;' id='admin_user_detail_col3_"+i+"'>"+personalstorage+"</div>";
			}

			if(localStorage._zs == "B") {
				adminString += "<div class='col-md-2 col-sm-2 userrow6' style='padding-top: 19px;padding-left:23px;'>"+dataroomstorage+"</div>";
			}
			adminString += "<div class='col-md-1 col-sm-1 userrow7' style='padding-right:0px;padding-left:5px;padding-top: 15px;'>";
			if(localStorage._zv != details[i].userId){
				adminString += "<div class='dropdown dropdown_class' style='display:flex !important;justify-content:center !important;'>";
				adminString += "<img src='assets/img/layer.png' class='dropdown-toggle' data-toggle='dropdown' style='display:flex !important;justify-content:center;width:25px;height:25px;cursor:pointer !important;' alt='' id='user_more_"+i+"'>";
				adminString += "<div class='dropdown-menu rowdropdownmenupadding0 new-menu' style='transform: translate3d(-45px, 3px, 0px);'>";
				if(localStorage._zv != details[i].userId && userstatus == "X"){
					adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='adminresendactivation_"+i+"' data-loginid='"+loginId.toLowerCase()+"'>Resend Activation Mail</a>";
					adminString += "<a class='dropdown-item' href='#' style='padding:15px;' id='admindeleteuser_"+i+"'>Delete User</a>";
				} else if(localStorage._zv != details[i].userId && userstatus != "P") {
					adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='adminedituser_"+i+"'>Edit User</a>";
					if(details[i].userId != 1) {
						adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='admindeleteuser_" + i + "'>Delete User</a>";
					}
					adminString += "<a class='dropdown-item' href='#' style='padding:15px;' id='resetpassbtn_"+i+"'>Reset Password</a>";
				} else if(localStorage._zv != details[i].userId && userstatus == "P") {
					adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='adminresendactivation_"+i+"' data-loginid='"+loginId.toLowerCase()+"'>Resend Activation Mail</a>";
					adminString += "<a class='dropdown-item' href='#' style='padding:15px;' id='admindeleteuser_"+i+"'>Delete User</a>";
				}
				//adminString += "</ul>";
				adminString += "</div>";
				adminString += "</div>";
			}
			adminString += "</div>";
			adminString += "</div>";
			$("#table_manageuser").append(adminString);
			registerBindEventsForUserListAdmin(i);

		}
	}
	displayUsercommon();
}

function savePasswordServiceAfter(response){
	ajaxindicatorstop();
	hideActionPopup("modalresetpss");
	if (response.object == "true" || response.object == true) {
		adminShowconfirmmsg(admin_Messages.admin_successResetPwd, confirm_Success, 5000, "", false, false);
	}else{
		if(response.message == "PASSWORD_EXISTS"){
			adminShowconfirmmsg(admin_Messages.admin_enterPasswordExists, confirm_Error, 5000, "", false, false);
		} else {
			adminShowconfirmmsg(response.message, confirm_Error, 5000, "", false, false);
		}
		return false;
	}

}

function adminDeleteUserServiceAfter(response){
	ajaxindicatorstop();
	hideActionPopup("deleteusercont");
	if (response.error == false && response.object != null) {
		displaycounter = -1;
		adminFetchUserList("N");
		adminShowconfirmmsg(admin_Messages.admin_userdeleted, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(response.message, confirm_Error, 5000, "", false, false);
	}
}

function adminDisableUserServiceAfter(response){
	ajaxindicatorstop();
	hideActionPopup("blockusercont");
	if (response.error == false && response.object != null) {
		var rowindex = response.extrajsonparam.rowindex;
		$("#disableuserbtn_"+rowindex).hide();
		$("#enableuserbtn_"+rowindex).show();
		adminShowconfirmmsg(admin_Messages.admin_userblocked, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(response.message, confirm_Error, 5000, "", false, false);
	}
}

function adminEnableUserServiceAfter(response){
	ajaxindicatorstop();
	hideActionPopup("unblockusercont");
	if (response.error == false && response.object != null) {
		var rowindex = response.extrajsonparam.rowindex;
		$("#enableuserbtn_"+rowindex).hide();
		$("#disableuserbtn_"+rowindex).show();
		adminShowconfirmmsg(admin_Messages.admin_userunblocked, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(response.message, confirm_Error, 5000, "", false, false);
	}
}

function adminSingleUserProfileServiceAfter(response){
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		var firstname = data.contactDto.firstName;
		var lastname = replacenullval(data.contactDto.lastName)
		$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(firstname + " " + lastname))));
		$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(firstname + " " + lastname)));
		var imagePath = data.contactDto.picture;
		if(imagePath.indexOf("resources/images/") >= 0){
			imagePath = cloudApiUrlACMS + imagePath.replace("resources/images/","/resources/");
		}

		if(imagePath != null && (imagePath+"").length > 0){
			var d = new Date();
  			imagePath = imagePath + "?timestamp=" + d.getTime();
			$("#userimg").attr("src", imagePath);
		} else {
			$("#userimg").attr("src", "assets/img/user_image.png");
		}
		$("#profIm").show();
	}
	fetchLogoService();
}

function setBasicUserDetails(data) {
	if (data.error == false && data.object != null) {
		var details = data.object;
		//for moduleAcls
		var moduleAcls = details.moduleAcls;
		if(moduleAcls !=null && moduleAcls !=undefined){
			$("#"+admin_dynamicModuleAclsUl).empty();
			for(var i = 0;i< moduleAcls.length;i++) {
				var name = moduleAcls[i].name;
				var id = moduleAcls[i].id;
				var aclName = name.replace(/\s+/g, '');
				var lblId = "admin_"+aclName+"Lbl";
				var checkBoxId = "admin_"+aclName;
				/*var hdnId = "admin_"+aclName+"Hdn";
				var checked = "";
				if(name.toLowerCase() !='admin') {
					checked = "checked='"+checked+"'";
				}
				var stringHtml = "";
				stringHtml = "<li><input type='checkbox' id='"+checkBoxId+"' class='"+admin_chkboxCls+"' "+checked+"><label id='"+lblId+"' for='"+checkBoxId+"' class='"+admin_chklblCls+"'>"+name+"<\/label><input type='hidden' id='"+hdnId+"' value='"+id+"' class='"+lblId+"' ><\/li>";
				$("#"+admin_dynamicModuleAclsUl).append(stringHtml);
				dynamicallyRefreshCheckBoxAdmin("#"+checkBoxId);
				if(name.toLowerCase() == "admin") {
					registerAdminUSerCheckBoxClicked(lblId,checkBoxId);
				}*/

				var stringHTML = "<div class='col-md-12 col-sm-12 col-xs-12'>";
				stringHTML += "<br>";
				stringHTML += "<label class='container'>";
				stringHTML += "<input type='checkbox' name='terms' class='label-to-bold-if-checked' "+checked+" id='"+checkBoxId+"'> <span> "+name+"</span>";
				stringHTML += "<span class='checkmark'></span>";
				stringHTML += "</label>";
				stringHTML += "</div>";

			}
		}
	}else{
		//showConfirmMessageAdmin(data.message, confirm_Error, 5000, "", false, false);
	}
}

function adminAddUserServiceAfter(response){
	ajaxindicatorstop();
	admin_savedwithpicture = 0;
	if (response.error == false && response.object != null) {
		if(response.message == "USEREXISTS"){
			adminShowconfirmmsg(admin_Messages.emailidtaken, confirm_Error, 5000, "", false, false);
		} else if(response.message == "USERALLOCATEDEXCEED"){
			adminShowconfirmmsg(admin_Messages.admin_requestallocateuserexeeds, confirm_Error, 5000, "", false, false);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_saveUserSuccessMsg, confirm_Success, 5000, "", false, false);
			if(admin_user_picture.length > 0){
				var jsonInput = "{\"id\":\"" + response.object + "\"";
				jsonInput += ",\"picture\":\"" + admin_user_picture + "\"}";
				admin_savedwithpicture = 1;
				adminUpdateUserPicture(JSON.parse(jsonInput));
			} else {
				displaycounter = -1;
				adminFetchUserList("N");
			}
		}
	}else{
		if(response.message == "USEREXISTS"){
			adminShowconfirmmsg(admin_Messages.emailidtaken, confirm_Error, 5000, "", false, false);
		}  else {
			adminShowconfirmmsg(response.message, confirm_Error, 5000, "", false, false);
		}
	}
}

function adminPopulateUserDetailsServiceAfter(response){
	ajaxindicatorstop();
	if (response.error == false && response.object != null) {
		var details = response.object;
		$('#txt_adduser_firstname').val(details.contactDto.firstName);
	    $('#txt_adduser_middlename').val(replacenullval(details.contactDto.middleName));
	    $('#txt_adduser_lastname').val(replacenullval(details.contactDto.lastName));
	    $('#txt_adduser_loginid').val(details.loginId);
	    $('#txt_adduser_loginid').attr("readonly", true);
		$('#txt_companyname').val(details.contactDto.companyName);
		$('#txt_companyname').attr("readonly", true);
	    $("#adduser").attr("data-contact-id", details.contactDto.id);

		var lastlogin = "Not logged in";
		var lastLoggedInTime = Date.parse(details.contactDto.lastLoggedInDate);
		var d = new Date(lastLoggedInTime);
		lastLoggedInTime = getdatefromtimestamp(d);
		if (lastLoggedInTime.length > 0) lastlogin = lastLoggedInTime;
		$("#user_last_login").val(lastlogin);

		var userCreatedDate = Date.parse(details.contactDto.userCreatedDate);
		var d = new Date(userCreatedDate);
		userCreatedDate = getdatefromtimestamp(d);
		$("#user_created_on").val(userCreatedDate);
		$("#more_info_div").show();

	    var imagePath = replacenullval(details.contactDto.picture);
		if(imagePath.indexOf("resources/images/") >= 0){
			imagePath = cloudApiUrlACMS + imagePath.replace("resources/images/","/resources/");
		}
		if(imagePath != null && (imagePath+"").length > 0){
			var d = new Date();
  			imagePath = imagePath + "?" + d.getTime();
		} else {
			imagePath = "assets/icons/Layer_1336.png";
		}

		$("#userprfimg").attr("src", imagePath);
		prvuserimg = imagePath;

		//for checkbox check like admin/guest
		if(details.type !="") {
			if(details.type == "ADMIN") {
				$('#chk_adduser_admin').prop("checked", true);
				$("#chk_adduser_user").prop("checked", false);
			}else if(details.type == "USER"){
				$('#chk_adduser_admin').prop("checked", false);
				$('#chk_adduser_user').prop("checked", true);
			}
			if(details.contactDto.userId == localStorage._zv){
				$('#chk_adduser_admin').attr("disabled", true);
				$('#chk_adduser_user').attr("disabled", true);
				$('#chk_adduser_admin_span').css("color", "#ccc");
				$('#chk_adduser_user_span').css("color", "#ccc");
			}
		}

		if(details.syncType == "P"){
			$('#chk_adduser_sync_personal').prop("checked", true);
			$('#chk_adduser_sync_dataroom').prop("checked", false);
		} else if(details.syncType == "S"){
			$('#chk_adduser_sync_personal').prop("checked", false);
			$('#chk_adduser_sync_dataroom').prop("checked", true);
		}
		if(localStorage._zs == "I"){
			$("#personal_sync").text("Professional Folder Sync.")
		}else{
			$("#personal_sync").text("Personal Folder Sync.")
		}

		$('#chk_adduser_sync_personal').prop("disabled", true);
		$('#chk_adduser_sync_dataroom').prop("disabled", true);

		if(details.contactDto.userId == localStorage._zv){
			$('#chk_adduser_module_admin').prop("disabled", true);
		}

		if(details.autoLogin == "1"){
			$('#chk_adduser_autologin').prop("checked", true);
		} else if(details.autoLogin == "0"){
			$('#chk_adduser_autologin').prop("checked", false);
		}

		if(localStorage._zs == "I") {
			$('#chk_adduser_autologin_span').css("color", "#ccc");
		}

		try{
			for(var i=0;i<details.moduleAcls.length;i++){
				if(details.moduleAcls[i] == 1){
					$("#chk_adduser_module_drive").prop("checked", true);
				} else if(details.moduleAcls[i] == 8){
					$("#chk_adduser_module_admin").prop("checked", true);
				}
			}
		}catch(error){}

		try{
			for(var i=0;i<details.deviceAcls.length;i++){
				if(details.deviceAcls[i] == 1){
					$("#chk_adduser_usb").prop("checked", true);
				} else if(details.deviceAcls[i] == 2){
					$("#chk_adduser_dvd").prop("checked", true);
				}
			}
		}catch(error){}

		$("#adduser").attr("data-contact-phone-id", 0);
		try{
			for(var i=0;i<details.contactDto.contactPhoneList.length;i++){
				if(details.contactDto.contactPhoneList[i].primary == 1){
					$("#adduser").attr("data-contact-phone-id", details.contactDto.contactPhoneList[i].id);
					var countrycode = "+"+handleNullValue(details.contactDto.contactPhoneList[i].countryCode);
					var ph = countrycode + handleNullValue(details.contactDto.contactPhoneList[i].phone);
					if(ph == 0) ph = "";
					ph = ph.replace("-", "");
					$("#txt_adduser_phone").intlTelInput("setNumber", ph);
					setTimeout(function(){
						$("#txt_adduser_phone").intlTelInput("setNumber", ph);
					},10);
					break;
				}
			}
		}catch(error){}

		$("#adduser").attr("data-contact-fax-id", 0);
		try{
			for(var i=0;i<details.contactDto.contactFaxList.length;i++){
				if(details.contactDto.contactFaxList[i].primary == 1){
					$("#adduser").attr("data-contact-fax-id", details.contactDto.contactFaxList[i].id);
					$("#txt_adduser_fax").val(details.contactDto.contactFaxList[i].fax);
					break;
				}
			}
		}catch(error){}

		$("#adduser").attr("data-contact-email-id", 0);
		try{
			for(var i=0;i<details.contactDto.contactEmailList.length;i++){
				if(details.contactDto.contactEmailList[i].primary == 1){
					$("#adduser").attr("data-contact-email-id", details.contactDto.contactEmailList[i].id);
					break;
				}
			}
		}catch(error){}

		$("#txt_adduser_firstname").attr("readonly", "true");
		$("#txt_adduser_middlename").attr("readonly", "true");
		$("#txt_adduser_lastname").attr("readonly", "true");
	    $("#txt_adduser_phone").attr("readonly", "true");
	    $('#chk_adduser_admin').attr("disabled", "true");
		$("#chk_adduser_user").attr("disabled", "true");
		$("#chk_adduser_usb").attr("disabled", "true");
		$("#chk_adduser_dvd").attr("disabled", "true");
		$("#chk_adduser_module_drive").attr("disabled", "true");
		$("#chk_adduser_module_admin").attr("disabled", "true");
		$('#chk_adduser_autologin').attr("disabled", "true");
		$('#changeuserimgfile').attr("disabled", "true");

		$("#chk_user_mobile_security").prop("checked", false);
		$("#chk_user_whatsapp_security").prop("checked", false);
		$("#chk_user_email_security").prop("checked", false);
		$("#chk_user_auth_security").prop("checked", false);

		$("#admin_user_chk_two_factor_auth").attr("disabled", true);
		$("#chk_user_mobile_security").attr("disabled", true);
		$("#chk_user_whatsapp_security").attr("disabled", true);
		$("#chk_user_email_security").attr("disabled", true);
		$("#chk_user_auth_security").attr("disabled","disabled");

		if(details.userOTPDto != null && details.userOTPDto.otpId > 0){
			$("#admin_user_chk_two_factor_auth").prop("checked", true);

			if(details.userOTPDto.carrieIdentifier != null && details.userOTPDto.carrieIdentifier.length > 0){
				if(details.userOTPDto.otpId == 1){
					$("#chk_user_mobile_security").prop("checked", true);
				} else if(details.userOTPDto.otpId == 2){
					$("#chk_user_whatsapp_security").prop("checked", true);
				} else if(details.userOTPDto.otpId == 3){
					$("#chk_user_email_security").prop("checked", true);
				} else if(details.userOTPDto.otpId == 4){
					$("#chk_user_auth_security").prop("checked", true);
				}
			}
		} else {
			$("#admin_user_chk_two_factor_auth").prop("checked", false);
		}
	}
}

function adminfetchCorporateDetailsServiceAfter(response) {
	$("#btncorpcancel").hide();
	var msgHeight = $(window).height() - 134;
	$('#pending_Tab').height(msgHeight);
	ajaxindicatorstop();
	if (response.error == false && response.object != null) {
		$("#btnsavecorp").html("EDIT");
		var details = response.object;
		if (details != null) {
			$("#manage_user_bg").removeClass("sidebarliactive");
			$("#img_manage_user").removeClass("sidebarliimgactive");
			$("#manage_device_bg").removeClass("sidebarliactive");
			$("#img_manage_devices").removeClass("sidebarliimgactive");
			$("#corporate_Details_bg").addClass("sidebarliactive");
			$("#img_corp_details").addClass("sidebarliimgactive");
			$('#mg_user').hide();
			$("#admin_searchbar").hide();
			$('#adduser').hide();
			$('#mg_divc').hide();
			$('#mg_corp').show();

			fetchRegionList(details.s3RegionId);
			$('#mg_corp').attr("data-id", details.id);
			$('#mg_corp').attr("data-s3", details.s3RegionId);
			fetchDisclaimerDetails();
			$("#metadataList").empty();
			fetchMetadataMasterService();
			rootAccesstoAllAdmins = details.rootAccesstoAllAdmins;

			$("#admin_corporate_name").val(details.clientName);
			if (details.lawFirmDetails != null && details.lawFirmDetails[0] != null) {
				$("#admin_corporate_email").val(details.lawFirmDetails[0].emailId);
				if (details.lawFirmDetails[0].phone != null && details.lawFirmDetails[0].phone != '' && details.lawFirmDetails[0].phone != "null") {
					var ph = handleNullValue(details.lawFirmDetails[0].phone);
					if (ph == 0) ph = "";
					$("#admin_corporate_phone").val(ph);
				}
			}

			if (details.startDate != null) {
				var sdate = details.startDate.split('T');
				$('#admin_corporate_startdate').val(adminFormatDateToDisplayUS(sdate[0]));
			}
			if (details.expiryDate != null) {
				var edate = details.expiryDate.split('T');
				$('#admin_corporate_expirydate').val(adminFormatDateToDisplayUS(edate[0]));
			}

			if (details.waterMarkText != null) {
				$('#admin_watermark_text').val(details.waterMarkText);
			}
			try {
				$('#admin_chk_watermark_view').prop("checked", false);
				$('#admin_chk_watermark_download').prop("checked", false);
				$("#admin_chk_watermark_download_original").prop("checked", false);
				var watermarkdisplay = details.waterMarkDisplay.split(",");
				if (watermarkdisplay[0] == "1") {
					$('#admin_chk_watermark_view').prop("checked", true);
				}
				if (watermarkdisplay[1] == "1") {
					$('#admin_chk_watermark_download').prop("checked", true);
				}
				if (watermarkdisplay[2] == "1") {
					$('#admin_chk_watermark_download_original').prop("checked", true);
				}
				$('#admin_chk_watermark_left').prop("checked", false);
				$('#admin_chk_watermark_top').prop("checked", false);
				$('#admin_chk_watermark_right').prop("checked", false);
				$('#admin_chk_watermark_bottom').prop("checked", false);
				$('#admin_chk_watermark_single').prop("checked", false);
				$('#admin_chk_watermark_multiple').prop("checked", false);
				var watermarkdisplayTypeCheck = details.watermarkDisplayType;
				if (watermarkdisplayTypeCheck == null){
					$('#admin_chk_watermark_multiple').prop("checked", true);
				} else	{
					var watermarkdisplayType = watermarkdisplayTypeCheck.split(",");
					if (watermarkdisplayType[0] == "1") {
						if (watermarkdisplayType[1] == "1") {
							$('#admin_chk_watermark_left').prop("checked", true);
						}
						if (watermarkdisplayType[2] == "1") {
							$('#admin_chk_watermark_top').prop("checked", true);
						}
						if (watermarkdisplayType[3] == "1") {
							$('#admin_chk_watermark_right').prop("checked", true);
						}
						if (watermarkdisplayType[4] == "1") {
							$('#admin_chk_watermark_bottom').prop("checked", true);
						}
					}
					if (watermarkdisplayType[0] == "2") {
						if (watermarkdisplayType[1] == "1") {
							$('#admin_chk_watermark_single').prop("checked", true);
						}
						if (watermarkdisplayType[2] == "1") {
							$('#admin_chk_watermark_multiple').prop("checked", true);
						}
					}
				}
			} catch (error) {}

			var showProjectIndexNo = details.showProjectIndexNo;
			if (showProjectIndexNo == "1") {
				$('#admin_chk_prjindex_number').prop("checked", true);
			} else {
				$('#admin_chk_prjindex_number').prop("checked", false);
			}

			var timeZone = details.timeZone;
			if (timeZone != null && timeZone != undefined) $("#selectTimeZone").val(timeZone);

			var waterMarkColor = details.waterMarkColor;
			var obj = $('.watermarkcolor')[waterMarkColor];
			$(obj).addClass("active");

			var addressDetails = details.lawFirmAddress;
			if (addressDetails != null) {
				if (addressDetails.length > 0) {
					$('#admin_corporate_street').val(addressDetails[0].street);
					$('#admin_corporate_city').val(addressDetails[0].city);
					$('#admin_corporate_state').val(addressDetails[0].state);
					$('#admin_corporate_zip').val(addressDetails[0].zipcode);
					$('#admin_corporate_place').val(addressDetails[0].place);
					$('#admin_corporate_country').val(addressDetails[0].country);
					$('#mg_corp').attr("data-addrid", addressDetails[0].id);
				}
			}
			var contactDetails = details.lawFirmDetails;
			if (contactDetails != null) {
				admin_clientContactDetailsLength = contactDetails.length;
				if (contactDetails.length > 0) {
					$('#admin_corporate_firstname').val(handleNullValue(contactDetails[0].firstName));
					$('#admin_corporate_middlename').val(handleNullValue(contactDetails[0].middleName));
					$('#admin_corporate_lastname').val(handleNullValue(contactDetails[0].lastName));
					$('#admin_corporate_email').val(handleNullValue(contactDetails[0].emailId));
					var ph = handleNullValue(contactDetails[0].phone);
					if (ph == 0) ph = "";
					$('#admin_corporate_phone').val(ph);
					$('#admin_corporate_fax').val(handleNullValue(contactDetails[0].fax));
					$('#admin_corporate_firstname').attr("data-id", contactDetails[0].id);
				}
			}
		}

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
		$("#disclaimer_title").attr("readonly", "true");
		$("#admin_chk_watermark_display").attr("disabled", "true");
		$("#admin_chk_watermark_view").attr("disabled", "true");
		$("#admin_chk_watermark_download").attr("disabled", "true");
		$('#admin_chk_watermark_download_original').attr("disabled", "true");
		$("#admin_chk_watermark_left").attr("disabled", "true");
		$("#admin_chk_watermark_download").attr("disabled", "true");
		$("#admin_chk_watermark_top").attr("disabled", "true");
		$("#admin_chk_watermark_right").attr("disabled", "true");
		$("#admin_chk_watermark_bottom").attr("disabled", "true");
		$("#admin_chk_watermark_single").attr("disabled", "true");
		$("#admin_chk_watermark_multiple").attr("disabled", "true");
		$(".watercolor").attr("disabled", "true");
		$('#admin_chk_prjindex_number').attr("disabled", "true");
		$("#selectTimeZone").attr("disabled", "true");
		$("#admin_chk_two_factor_auth").attr("disabled", "true");
		$("#disclaimer_title").attr("readonly", "true");
		$("#disclaimerfrequency").attr("disabled", "true");
		$("#disclaimermsg").attr("disabled", "true");
		$("#disclaimermsg").css("opacity", "0.5");

		$("#metadata_key").attr("readonly", "true");



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
		selectedCorpImage = details.logoPath+"";
		if(selectedCorpImage != null && selectedCorpImage != "" && selectedCorpImage != "null" && selectedCorpImage.indexOf("null") < 0){
			$("#btn_image_file_remove").show();
			$("#img_logo_preview").show();
			const random = Math.random() * 100000;
			$("#img_logo_preview").attr("src", cloudApiUrlACMS+"/"+selectedCorpImage+"?v="+random);
			$("#lbl_change_upload_logo").show();
			$("#image-file").hide();
			$("#lbl_upload_logo").hide();
		}
	}
}

function fetchRegionListData(data){
	if (data.error == false && data.object != null) {
		var selid = data.extrajsonparam.selid;
		var details = data.object;
		for(var i=0;i<details.length;i++) {
			if(selid == details[i].id){
				$("#admin_s3_name").val(details[i].description);
				break;
			}
		}
	}
}

function fetchDisclaimerTypesAfter(data){
	if (data.error == false && data.object != null) {
		var disid = data.extrajsonparam.disid;
		var details = data.object;
		for(var i=0;i<details.length;i++) {
			if(disid == details[i].id){
				$("#disclaimerfrequency").val(details[i].id);
				break;
			}
		}
	}
}

function fetchDisclaimerDetailsAfter(data) {
	if (data.error == false && data.object != null) {
		var details = data.object;
		$("#disclaimer_title").val(details.title);
		dis_msg = details.msg;
		dis_type = details.type;
		dis_title = details.title;
		dis_id = details.id;
		fetchDisclaimerTypes(details.type);
	}

}

function adminSaveClientServiceAfter(response){
	ajaxindicatorstop();
	if (response.error == false && response.object != null) {
		var params = {
			"id": dis_id,
			"type": dis_type,
			"title": dis_title,
			"status": 1,
			"action": "updateDisclaimerDetailsAfter"
		};
		updateDisclaimerDetailsService(params);
		adminShowconfirmmsg(admin_Messages.admin_corporatedetailssaved, confirm_Success, 5000, "", false, false);
		ajaxindicatorstart('fetching your corporate details.. please wait..');
		adminfetchCorporateDetailsService();
	} else {
		adminShowconfirmmsg("Could not process request. please try again.", confirm_Error, 5000, "", false, false);
	}
}

function addDisclaimerDetailsServiceAfter(response){
	if (response.error == false && response.object != null) {
		adminShowconfirmmsg(admin_Messages.admin_dis_msg_save, confirm_Success, 5000, "", false, false);
		hideActionPopup("disclaimermsgmodal");
		adminfetchCorporateDetailsService();
	}
}

function adminfetchPenidingDeviceServiceAfter(response){
	$("#manage_user_bg").removeClass("sidebarliactive");
	$("#img_manage_user").removeClass("sidebarliimgactive");
	$("#corporate_Details_bg").removeClass("sidebarliactive");
	$("#img_corp_details").removeClass("sidebarliimgactive");
	$("#manage_device_bg").addClass("sidebarliactive");
	$("#img_manage_devices").addClass("sidebarliimgactive");
	$('#mg_user').hide();
	$('#btnuser').show();
	$('#addicon').hide();
	$("#admin_searchbar").show();
	$('#adduser').hide();
	$('#mg_corp').hide();
	$('#mg_divc').show();
	$("#pending_Tab").show();
	$("#blocked_Tab").hide();
	$("#approved_tab").hide();
	$("#tableHeadSecDevice").show();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#div_export_users").hide();
	$("#divc_date_time_col").html("Date & Time");

	$("#divapproveask").html("Do you want to approve the device?");
	$("#unblockdeviceconfirm").html("APPROVE");

	var msgHeight = $(window).height() - 134;
	$('#pending_Tab').height(msgHeight);

	ajaxindicatorstop();
	var details = response;
	if(response.object != undefined) details = response.object;
	if(details != null && details.length > 0){
		var i = 0;
		for(i=0;checkNullValue(details) && i<details.length; i++){
			//var recvdate = getlocaltimestampfromutcdata(details[i].created);
			//var recvdate = Date.parse(details[i].updated);

			var recvdate = Date.parse(details[i].updated);
			if(checkblankdata(details[i].comments)) {
				commentMsg = details[i].comments;
				recvdate = Date.parse(commentMsg[commentMsg.length-1].commented);
				var d = new Date(recvdate);
				recvdate = getdatefromtimestamp(d);
			}

			var d = new Date(recvdate);
			recvdate = getdatefromtimestamp(d);

			var createdLong = getlocaltimestampfromutcdata(handleNullValue(details[i].created));
			if(details[i].dueDateLong == undefined)
			{
				var templengthOfPending = details[i];
				templengthOfPending["createdLong"] = createdLong;
			}else{
				details[i].createdLong = createdLong;
			}

			var devicName = "";
			if(checkblankdata(details[i].deviceName)){
				devicName = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].deviceName));
			}
			var remoteAddressVal = "";
			if(checkblankdata(details[i].remoteAddress)) {
				remoteAddressVal = checkscreenwidthdesc(details[i].remoteAddress);
			}
			var recevDateVal = "";
			if(checkblankdata(recvdate)) {
				recevDateVal = recvdate;
			}
			var reason = "";
			if(checkblankdata(details[i].reason)) {
				reason = details[i].reason;
			}

			var nm = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].userName));
			var adminString = "<div class='col-md-12 col-sm-12 col-xs-12 single' id='divpending_"+i+"' data-id='"+details[i].id+"' >";
			adminString += "<div class='col-md-2 col-sm-2' title='"+nm+"'>" + trimOverFlowCharacters(nm, 15);
			adminString += "<div><span class='unblockColor pointerClass' id='btnpendingdvapprove_"+i+"'>Approve</span> | <span class='blockColor pointerClass' id='btnpendingdvblock_"+i+"'>Block</span>";
			adminString += "</div>";
			adminString += "</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+handleNullValue(details[i].emailId).toLowerCase()+"</div>";
			adminString += "<div class='col-md-1 col-sm-1' style='width: 13%;'>"+devicName+"</div>";
			adminString += "<div class='col-md-2 col-sm-2'>"+remoteAddressVal+"</div>";
			adminString += "<div class='col-md-3 col-sm-3' style='width: 28%;'>"+recevDateVal+"</div>";
			adminString += "</div>";

			$("#pending_Tab").append(adminString);
			adminPendingDeviceEvents(i);
		}
	} else {
		if(searchdone == 1){
			adminShowconfirmmsg(admin_Messages.admin_norec, confirm_Error, 5000, "", false, false);
		}
	}
	searchdone = 0;
}

function adminfetchBlockedDeviceServiceAfter(response){
	$("#pending_Tab").hide();
	$("#blocked_Tab").show();
	$("#approved_tab").hide();
	$("#tableHeadSecDevice").show();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#divc_date_time_col").html("Date & Time");
	admin_comments = [];

	$("#divapproveask").html("Do you want to unblock the device?");
	$("#unblockdeviceconfirm").html("UNBLOCK");

	ajaxindicatorstop();
	var details = response;
	if(response.object != undefined) details = response.object;
	if(details != null && details.length > 0){
		var i = 0;
		for(i=0;checkNullValue(details) && i<details.length; i++){
			var commentMsg = "";
			if(checkblankdata(details[i].comments)) commentMsg = details[i].comments;
			//var recvdate = getlocaltimestampfromutcdata(details[i].approvedBlocked);
			var recvdate = Date.parse(details[i].approvedBlocked);
			var d = new Date(recvdate);
			/*var n = d.getTimezoneOffset();
			if(n < 0){
				n = n+30;
				d.setMinutes(d.getMinutes() + n );
			} else {
				n = n-30;
				d.setMinutes(d.getMinutes() + n );
			}*/
			recvdate = getdatefromtimestamp(d);


			var createdLong = getlocaltimestampfromutcdata(handleNullValue(details[i].created));
			if(details[i].dueDateLong == undefined)
			{
				var templengthOfPending = details[i];
				templengthOfPending["createdLong"] = createdLong;
			}else{
				details[i].createdLong = createdLong;
			}

			var devicName = "";
			if(checkblankdata(details[i].deviceName)){
				devicName = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].deviceName));
			}
			var remoteAddressVal = "";
			if(checkblankdata(details[i].remoteAddress)) {
				remoteAddressVal = checkscreenwidthdesc(details[i].remoteAddress);
			}
			var recevDateVal = "";
			if(checkblankdata(recvdate)) {
				recevDateVal = recvdate;
			}
			var reason = "";
			if(checkblankdata(details[i].reason)) {
				reason = details[i].reason;
			}

			var nm = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].userName));
			var adminString = "<div class='col-md-12 col-sm-12 col-xs-12 single' id='divblocked_"+i+"' data-id='"+details[i].id+"' style='cursor:pointer;'>";
			adminString += "<div class='col-md-2 col-sm-2' title='"+nm+"'>" + trimOverFlowCharacters(nm, 15);
			adminString += "<div><span class='unblockColor pointerClass' id='btnblockdvunblock_"+i+"'>Unblock</span> | <span class='deleteColor pointerClass' id='btnblockdvdelete_"+i+"'>Delete</span>";
			adminString += "</div>";
			adminString += "</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+handleNullValue(details[i].emailId).toLowerCase()+"</div>";
			adminString += "<div class='col-md-1 col-sm-1' style='width: 13%;'>"+devicName+"</div>";
			adminString += "<div class='col-md-2 col-sm-2'>"+remoteAddressVal+"</div>";
			adminString += "<div class='col-md-3 col-sm-3' style='width: 28%;'>"+recevDateVal+"</div>";
			adminString += "</div>";

			if(commentMsg.length>0){
				admin_comments[i] = commentMsg;
			}

			$("#blocked_Tab").append(adminString);
			adminBlockedDeviceEvents(i);
		}
	} else {
		if(searchdone == 1){
			adminShowconfirmmsg(admin_Messages.admin_norec, confirm_Error, 5000, "", false, false);
		}
	}
	searchdone = 0;
}

function adminfetchApprovedDeviceServiceAfter(response){
	$("#pending_Tab").hide();
	$("#blocked_Tab").hide();
	$("#approved_tab").show();
	$("#tableHeadSecDevice").show();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#divc_date_time_col").html("Start Date & Time &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; End Date & Time");
	admin_comments = [];

	ajaxindicatorstop();
	var details = response;
	if(response.object != undefined) details = response.object;
	if(details != null && details.length > 0){
		var i = 0;
		for(i=0;checkNullValue(details) && i<details.length; i++){
			var commentMsg = "";
			//var recvdate = getlocaltimestampfromutcdata(details[i].created);
			//var recvdate = Date.parse(details[i].updated);

			var recvdate = Date.parse(details[i].updated);
			if(checkblankdata(details[i].comments)) {
				commentMsg = details[i].comments;
				recvdate = Date.parse(commentMsg[commentMsg.length-1].commented);
				var d = new Date(recvdate);
				recvdate = getdatefromtimestamp(d);
			}

			var d = new Date(recvdate);
			recvdate = getdatefromtimestamp(d);

			var createdLong = getlocaltimestampfromutcdata(handleNullValue(details[i].created));
			if(details[i].dueDateLong == undefined)
			{
				var templengthOfPending = details[i];
				templengthOfPending["createdLong"] = createdLong;
			}else{
				details[i].createdLong = createdLong;
			}

			var devicName = "";
			if(checkblankdata(details[i].deviceName)){
				devicName = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].deviceName));
			}
			var remoteAddressVal = "";
			if(checkblankdata(details[i].remoteAddress)) {
				remoteAddressVal = checkscreenwidthdesc(details[i].remoteAddress);
			}
			var recevDateVal = "";
			if(checkblankdata(recvdate)) {
				recevDateVal = recvdate;
			}
			var reason = "";
			if(checkblankdata(details[i].reason)) {
				reason = details[i].reason;
			}

			var startDate = "";
			if(checkblankdata(details[i].approvedBlocked)) {
				var dt = details[i].approvedBlocked.split("T")[0];
				startDate = dt.split("-")[2]+"/"+dt.split("-")[1]+"/"+dt.split("-")[0]+" 12:00 AM";
			}
			var endDate = "";
			if(checkblankdata(details[i].expiryDate)) {
				var dt = details[i].expiryDate.split("T")[0];
				endDate = dt.split("-")[2]+"/"+dt.split("-")[1]+"/"+dt.split("-")[0]+" 11:59 PM";
			}

			var nm = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].userName));
			var adminString = "<div class='col-md-12 col-sm-12 col-xs-12 single' id='divapproved_"+i+"' data-id='"+details[i].id+"' style='cursor:pointer;'>";
			adminString += "<div class='col-md-2 col-sm-2' title='"+nm+"'>" + trimOverFlowCharacters(nm, 15);
			if(details[i].id != localStorage._zq){
				adminString += "<div><span class='blockColor pointerClass' id='btnapprovblock_"+i+"'>Block</span> | <span class='deleteColor pointerClass' id='btnapprovdelete_"+i+"'>Delete</span></div>";
			}
			adminString += "</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+handleNullValue(details[i].emailId).toLowerCase()+"</div>";
			adminString += "<div class='col-md-1 col-sm-1' style='width: 13%;'>"+devicName+"</div>";
			adminString += "<div class='col-md-2 col-sm-2'>"+remoteAddressVal+"</div>";
			adminString += "<div class='col-md-3 col-sm-3' style='width: 28%;'>"+startDate+"&ensp;&ensp;&ensp;"+endDate+"</div>";
			adminString += "</div>";

			if(commentMsg.length>0){
				admin_comments[i] = commentMsg;
			}

			$("#approved_tab").append(adminString);
			adminApprovedDeviceEvents(i);
		}
	} else {
		if(searchdone == 1){
			adminShowconfirmmsg(admin_Messages.admin_norec, confirm_Error, 5000, "", false, false);
		}
	}
	searchdone = 0;
}

function adminblockdeviceserviceafter(response){
	ajaxindicatorstop();
	if (response.object != null && response.object != undefined) {
		var type = response.extrajsonparam.type;
		adminShowconfirmmsg(admin_Messages.admin_blockSuccessMsg, confirm_Success, 5000, "", false, false);
		if(type == 1){
			$("#pending_req").click();
		} else if(type == 2){
			$("#blocked_req").click();
		} else if(type == 3){
			$("#approved_req").click();
		}
	}
}

function admindeletedeviceserviceafter(response){
	ajaxindicatorstop();
	if (response.object != null && response.object != undefined) {
		var type = response.extrajsonparam.type;
		adminShowconfirmmsg(admin_Messages.admin_deleteDeviceSuccessMsg, confirm_Success, 5000, "", false, false);
		if(type == 1){
			$("#pending_req").click();
		} else if(type == 2){
			$("#blocked_req").click();
		} else if(type == 3){
			$("#approved_req").click();
		}
	}
}

function adminapprovedeviceServiceAfter(response){
	ajaxindicatorstop();
	if (response.object != null && response.object != undefined) {
		var type = response.extrajsonparam.type;
		adminShowconfirmmsg(admin_Messages.admin_approveSuccessMsg, confirm_Success, 5000, "", false, false);
		if(type == 1){
			$("#pending_req").click();
		} else if(type == 2){
			$("#blocked_req").click();
		} else if(type == 3){
			$("#approved_req").click();
		}
	}
}

function adminUpdateUserPictureAfter(response){
	var d = new Date();
	$("#userprfimg").removeAttr("src");
	$("#userprfimg").attr("src", admin_user_picture);
	if(document.getElementById("adduser").getAttribute("data-id") == localStorage._zv){
		d = new Date();
		$("#userimg").removeAttr("src");
  		$("#userimg").attr("src", admin_user_picture);
	}
	if(admin_savedwithpicture == 1){
		adminFetchUserList("N");
	} else if(!response.error && response.object == true){
		adminShowconfirmmsg(admin_Messages.updateAdminImageSuccess, confirm_Success, 5000, "", false, false);
	}
}

function adminFetchDeviceIPDataAfter(data){
	ajaxindicatorstop();
	if (data != null && data != undefined) {
		var ipData = data.object;
		if(ipData !=null && ipData !=undefined) {
			var admin_deviceRuleIPLength = ipData.length;
			for(var ip=0;ip<admin_deviceRuleIPLength;ip++){
				if(ipData[ip].status !="D") {
					var ipAddress = ipData[ip].ipAddress;
					var ipDataArry = ipAddress.split(".");
					var datavar = "data-id="+ipData[ip].id;
					var strVar="";
					strVar += "<div class='cell iptextclass' style='outline: none; border: none;' id='diviplist_"+lastipindex+"' "+datavar+">";
					strVar += "<span class='cell'>";
					strVar += "<input type='text' class='inputClass1 disablecopypaste textC' maxlength='3' value='"+ipDataArry[0]+"' id='txtDeviceRulesIP1_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)' "+datavar+" readonly>";
					strVar += "</span>";
					strVar += "<span class='cell'>.</span>";
					strVar += "<span class='cell'>";
					strVar += "<input type='text' class='inputClass1 disablecopypaste textC' maxlength='3' value='"+ipDataArry[1]+"' id='txtDeviceRulesIP2_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)' "+datavar+" readonly>";
					strVar += "</span>";
					strVar += "<span class='cell'>.</span>";
					strVar += "<span class='cell'>";
					strVar += "<input type='text' class='inputClass1 disablecopypaste textC' maxlength='3' value='"+ipDataArry[2]+"' id='txtDeviceRulesIP3_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)' "+datavar+" readonly>";
					strVar += "</span>";
					strVar += "<span class='cell'>.</span>";
					strVar += "<span class='cell'>";
					strVar += "<input type='text' class='inputClass1 disablecopypaste textC' maxlength='3' value='"+ipDataArry[3]+"' id='txtDeviceRulesIP4_"+lastipindex+"' style='width: 20%;outline: none; border: none; background: none; border-bottom: 1px solid #01acb2;' onkeypress='return isNumberKeyForIPAddress(event)' "+datavar+" readonly>";
					strVar += "</span>";
					strVar += "<span class='cell' id='deleteDeviceRuleId_"+lastipindex+"' "+datavar+" style='cursor:pointer;'>&nbsp;<i class='fa fa-trash' aria-hidden='true'><\/span>";
					strVar += "</div>";
					$("#diviplist").append(strVar);
					registerBindEventsForDeviceRulesIpAdmin(lastipindex);
					lastipindex++;
				}
			}
		}else{

		}
	}else{

	}

	adminAddDeviceRuleIP();
}

function adminAutoSaveDeviceRuleIPAfter(response){
	ajaxindicatorstop();
	if (response != null && response != undefined && !response.error) {
		adminFetchDeviceIPData();
	}
}

function adminDeleteDeviceRuleIPAfter(response){
	ajaxindicatorstop();
	if (response != null && response != undefined && !response.error) {
		adminFetchDeviceIPData();
	}
}

function adminSingleUserProfileServiceNewAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		var firstname = data.contactDto.firstName;
		var lastname = replacenullval(data.contactDto.lastName)
		var middlename = replacenullval(data.contactDto.middleName);
		var name = firstname;
		var name1 = firstname + " " + lastname
		if(middlename.length > 0){
			name = name + " " + middlename;
		}
		if(lastname.length > 0){
			name = name + " " + lastname;
		}

		/*if(name1.length > 20){
			name1 = name1.substring(0, 19);
		}*/
		$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(name1))));
		$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
		$("#musername").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name)));
		$("#museremail").html(data.loginId);
		$("#muserType").val(data.type);

		if(data.syncType == "P"){
			if(localStorage._zs == "I"){
				$("#msynctype").val("Dataroom Sync");
			}else{
				$("#msynctype").val("Personal Folder Sync");
			}
		} else if(data.syncType == "S"){
			$("#msynctype").val("Shared Folder Sync");
		}

		$("#mfirstname").val(firstname);
		$("#mmiddlename").val(middlename);
		$("#mlastname").val(lastname);
		$("#musercorp").html(localStorage._zu);
		//String website = Common.checkNull(obj.getString("website"), "");
		$("#mcompany").val(replacenullval(localStorage._zo));
		var imagePath = replacenullval(data.contactDto.picture);
		contact_id = data.contactDto.id;
		var mobileNumber = "";
		try {
			var arr = data.contactDto.contactPhoneList;
			if (arr != null && arr[0] != null && arr[0] != undefined) {
				//for (var i = 0; i < arr.length(); i++) {
					var i = 0;
					var primary = arr[i].primary;
					if (primary == 1) {
						var countryCode = arr[i].countryCode;
						if(countryCode > 0){
							mobileNumber = "+"+countryCode+replacenullval(arr[i].phone);
							$("#mmobilenumber").intlTelInput("setNumber", mobileNumber);
							setTimeout(function(){
								$("#mmobilenumber").intlTelInput("setNumber", mobileNumber);
							},10);
							phone_id = arr[i].id;
							//break;
						}
					}
				//}
			}
		}catch(error){

		}

		var faxNumber = "";
		try {
			var arrfax = data.contactFaxList;
			if (arrfax != null && arrfax.length() > 0) {
				for (var i = 0; i < arrfax.length(); i++) {
					var primary = arrfax[i].primary;
					if (primary == 1) {
						faxNumber = arrfax[i].fax;
						$("#mfaxnumber").val(replacenullval(faxNumber));
						fax_id = arrfax[i].id;
						break;
					}
				}
			}
		}catch(error){

		}

		if(imagePath.indexOf("resources/images/") >= 0){
			imagePath = cloudApiUrlACMS + imagePath.replace("resources/images/","/resources/");
		}

		if(imagePath != null && (imagePath+"").length > 0){
			$("#muserimg").attr("src", imagePath + "?timestamp=" + new Date().getTime());
			$("#userimg").attr("src", imagePath + "?timestamp=" + new Date().getTime());
			prvuserimg = imagePath + "?timestamp=" + new Date().getTime();
		} else {
			$("#muserimg").attr("src", "assets/img/user_image.png");
			$("#userimg").attr("src", "assets/img/user_image.png");
			prvuserimg = "assets/img/user_image.png";
		}
		$("#profIm").show();
		if(localStorage._zs == "B") {
			$("#musercorp").show();
			$("#pcompany").show();
		} else if(localStorage._zs == "I") {
			$("#musercorp").hide();
			$("#pcompany").hide();
		}

		if(data.userOTPDto != null && data.userOTPDto.status == "A"){
			$("#padvsecurity").show();
			for(var i=0;i<otpsettiongs.length;i++){
				if(otpsettiongs[i].id == data.userOTPDto.otpId){
					$("#adm_user_security_name").html("   " + otpsettiongs[i].name + " : ");
				}
			}

			if(data.userOTPDto.otpId == 1 || data.userOTPDto.otpId == 2){
				if(data.userOTPDto.otpId == 1){
					$("#div_otpcontaineradmin").html('<span style="color: rgb(13, 36, 110); width: 25%; margin-top: 5px; padding-left: 0px;" id="adm_user_security_name">   Mobile Phone : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width: 75%; color: black; font-size: 13px;  padding-left: 82px;" autocomplete="off">');
				}else if(data.userOTPDto.otpId == 2){
					$("#div_otpcontaineradmin").html('<span style="color: rgb(13, 36, 110); width: 25%; margin-top: 5px; padding-left: 0px;" id="adm_user_security_name">   WhatsApp : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width: 75%; color: black; font-size: 13px;  padding-left: 82px;" autocomplete="off">');
				}
				adminotpId = data.userOTPDto.otpId;
				var carr = data.userOTPDto.carrieIdentifier.replace("-", "");
				$("#adm_user_security_carrier").intlTelInput("setNumber", carr);
				setTimeout(function(){
					$("#adm_user_security_carrier").intlTelInput("setNumber", carr);
				}, 10);
				$("#adm_2_fact_enabled").prop("checked", true);
				$("#adm_user_security_name").css("padding-left", "0px");
				$("#adm_user_security_name").css("margin-top", "5px");
				var input = $("#adm_user_security_carrier");
				input.intlTelInput(	{
					separateDialCode: true
				});
			} else if(data.userOTPDto.otpId == 3){
				$("#iti--allow-dropdown").remove();
				$("#div_otpcontaineradmin").html('<span style="color: rgb(13, 36, 110); width: 25%; margin-top: 6px; padding-left: 0px;" id="adm_user_security_name">   Email : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width: 75%;color: black;font-size: 13px;margin-left: -126px;padding-left: 82px;" autocomplete="off">');
				$("#adm_user_security_carrier").val(data.userOTPDto.carrieIdentifier);
				$("#adm_2_fact_enabled").prop("checked", true);
				$("#adm_user_security_name").css("padding-left", "0px");
				$("#adm_user_security_name").css("margin-top", "6px");
				adminotpId = 0;
			}else {
				adminotpId = 0;
			}
		} else {
			$("#pcompany").hide();
		}
	}
}

function adminFetchStorageLeftServiceAfter(response){
	ajaxindicatorstop();
	var extraParam = response.extrajsonparam;
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		//allocatedStorage = parseFloat(data.split("#")[0]);
		//var used = parseFloat(data.split("#")[1]);
		var attr1 = data.attribute1;
		var attr2 = data.attribute2;
		var used = 0;
		if(localStorage._zs == "B") {
			var personal = parseFloat(attr1.split("#")[1]);
			var dataroom = parseFloat(attr1.split("#")[2]);
			$("#mallocatedspacepersonal").html("User Personal Storage : " + formatBytesDecimal(personal));
			$("#mallocatedspacedataroom").html("User Dataroom Storage : " + formatBytesDecimal(dataroom));
			$("#mallocatedspacepersonal").show();
			$("#mallocatedspacedataroom").show();
			allocatedStorage = parseFloat(attr2.split("#")[0]);
			used = parseFloat(attr2.split("#")[1]);
		} else if(localStorage._zs == "I") {
			allocatedStorage = parseFloat(attr1.split("#")[0]);
			used = parseFloat(attr1.split("#")[1]);
		}

		if(localStorage._zmd.split(",").includes("8")){
			$("#mallocatedspacepersonal").show();
		}else{
			$("#mallocatedspacepersonal").hide();
		}

		if(used > allocatedStorage){
			used = allocatedStorage;
		}
		sizeLeft = allocatedStorage - used;
		var perntageused = parseInt(Math.floor(used * 100/allocatedStorage));
		var perntageleft = 100 - perntageused;
		var v1 = formatBytesDecimal(used);
		var v2 = formatBytesDecimal(allocatedStorage);
		$("#mallocatedspace").html("Total Dataroom Storage : " + v1 + " / " + v2);
		if(v1 == v2){
			perntageused = "100";
		}
		$("#mallocatedspace").html("Total Dataroom Storage : " + formatBytesDecimal(used) + " / " + formatBytesDecimal(allocatedStorage));
		$(".counter").attr("data-cp-percentage", perntageused);
		progresscircledynamic();
	}
}

function adminSaveUserProfileServiceAfter(response){
	ajaxindicatorstop();
	var firstname = $("#mfirstname").val();
	var lastname = $("#mlastname").val();
	var middlename = $("#mmiddlename").val();
	var name = firstname;
	var name1 = firstname + " " + lastname
	if(middlename.length > 0){
		name = name + " " + middlename;
	}
	if(lastname.length > 0){
		name = name + " " + lastname;
	}

	/*if(name1.length > 20){
		name1 = name1.substring(0, 19);
	}*/
	$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(name1))));
	$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
	$("#musername").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
	adminShowconfirmmsg("Profile saved successfully.", confirm_Success, 5000, "", false, false);
}

function adminUpdateUserPictureAfter(response){
	$("#muserimg").attr("src", userimgbase64);
	$("#userimg").attr("src", userimgbase64);
}

function adminSendReactivationMailAfter(response){
	ajaxindicatorstop();
	if(response.error == false){
		$("#user_activation_pending_"+response.extrajsonparam.idm).html("Waiting for Activation");
		$("#user_activation_pending_"+response.extrajsonparam.idm).css("color", "black");
		adminShowconfirmmsg(admin_Messages.resendactivationmailsuccess, confirm_Success, 5000, "", false, false);
	}
}

function adminUpdateExpiryDateServiceAfter(response){
	currentservicemethodafter = "";
	if(response.error == false){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function adminUpdateStorageServiceAfter(response){
	currentservicemethodafter = "";
	if(response.error == false){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function adminUpdateUsersServiceAfter(response){
	currentservicemethodafter = "";
	if(response.error == false){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function adminStorageCheckSessionServiceAfter(response){
	duePaymentService();
	currentservicemethodafter = "";
	adminsessioncheckcalled = false;
	if(response.error == true){
		window.location.href = "error.html";
	}
}

function admOTPSettingsServiceAfter(response){
	if(response.error == false){
		otpsettiongs = response.object;
		for(var i=0;i<otpsettiongs.length;i++){
			if(otpsettiongs[i].id == 1){
				$("#chk_user_mobile_security_span").html("   " + otpsettiongs[i].name);
			} else if(otpsettiongs[i].id == 2){
				$("#chk_user_whatsapp_security_span").html("   " + otpsettiongs[i].name);
			} else if(otpsettiongs[i].id == 3){
				$("#chk_user_whatsapp_email_span").html("   " + otpsettiongs[i].name);
			} else if(otpsettiongs[i].id == 4){
				$("#chk_user_authenticator_span").html("   " + otpsettiongs[i].name);
			}
		}
	}
}

function adminFetch2factorAuthServiceAfter(response){
	if (response.error == false && response.object != null) {
		var details = response.object;
		var accType = details.accType;
		if(accType == "B"){
			$("#div2factauthdetail").show();
			$("#divshowprjnumber").show();
			$("#divuser2factauthdetail").show();
		} else {
			$("#div2factauthdetail").hide();
			$("#divshowprjnumber").hide();
			$("#divuser2factauthdetail").hide();
		}

		twofactorAuth = details.twoFactorAuth;
		if(twofactorAuth == 1){
			$("#admin_chk_two_factor_auth").prop("checked", true);
		} else {
			$("#admin_chk_two_factor_auth").prop("checked", false);
		}
	}
}


function admaddUserPhoneAfter(response){

}

function admUpdateUserPhoneAfter(response){

}

function adminSaveOTPRecordServiceAfter(response){
	if(response.error == false){
		$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
		setTimeout(function(){
			$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
		},10);
	}
}

function adminProcessDataroomClosureServiceAfter(response){
	if(response.error == false && response.object == true){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
		if($('input[name="radioclosedataroom"]:checked').val() == "1"){
			setTimeout(function(){
				logOutService();
			}, 2000);
		} else {
			hideActionPopup("dataroomclosuremodal");
			adminfetchCorporateDetailsService();
		}
	} else {
		if(response.message=="NOPERMISSION"){
			adminShowconfirmmsg(admin_Messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
		}
	}
}

function adminDeleteDataroomClosureServiceAfter(response){
	if(response.error == false && response.object == true){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
		hideActionPopup("dataroomclosuremodal");
		adminfetchCorporateDetailsService();
	} else {
		if(response.message=="NOPERMISSION"){
			adminShowconfirmmsg(admin_Messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
		}
	}
}

function adminCheckDataroomClosureServiceAfter(response){
	if(response.error == false && response.object != null){
		$("#btn_admin_close_dataroom").html("Dataroom Closure Details");
		$("#btn_dataroom_close_confirm").html("Update");
		$("#btn_dataroom_close_req_cancel").show();
	} else {
		$("#btn_dataroom_close_req_cancel").hide();
		$("#btn_dataroom_close_confirm").html("Confirm");
		$("#btn_admin_close_dataroom").html("Close Dataroom");
	}
}

function adminFetchDataroomClosureServiceAfter(response){
	if(response.error == false && response.object != null){
		adminCloseDataroomResetPopup();
		var data = response.object;
		$("input[name=radioclosedataroom][value='"+data.instantTerminate+"']").prop("checked",true);
		if(data.instantTerminate == 0){
			$("#div_dataroom_close_later_date").show();
			var sdate = data.terminateDate.split('T')[0];
			$('#date_dataroom_close').val(sdate);
			//$("#sel_admin_dataroom_close_reason").val(data.reason);
			$("#sel_admin_dataroom_close_reason option").filter(function() {
				return $(this).text() ==data.reason;
			}).prop("selected", true);
		}

		$("input[name=radioclosedataroomflashdrive][value='"+data.flashDriveRequired+"']").prop("checked",true);
		$("#sel_dataroom_close_experience").val(data.experience);
		$("#div_dataroom_close_experience").show();
		if(data.flashDriveRequired == 1){
			$("#div_dataroom_close_flashdrive_no").show();
			$("#txt_dataroom_close_flashdrive_no").val(data.flashDriveQuantity);
			$("#div_dataroom_close_flashdrive").show();
			$("#div_dataroom_close_flashdrive_name").show();
			$("#txt_dataroom_close_flashdrive_rec_name").val(data.flashDriveReceipientName);
			$("#div_dataroom_close_flashdrive_email").show();
			$("#txt_dataroom_close_flashdrive_rec_email").val(data.flashDriveReceipientEmail);
			$("#div_dataroom_close_flashdrive_phone").show();
			$("#txt_dataroom_close_flashdrive_rec_phone").val(data.flashDriveReceipientPhone);
			$("#div_dataroom_close_flashdrive_address").show();
			$("#txt_dataroom_close_flashdrive_rec_address").val(data.flashDriveReceipientAddress);
			$("#div_dataroom_close_doc_format").show();
			$("#div_dataroom_close_drive_type").show();
			$("#sel_dataroom_close_drive_type").val(data.flashDriveType);
			$("#div_dataroom_close_initby").show();
			$("#txt_dataroom_close_initby").val(data.initiatedBy);
		}

		if(data.reportProjectIndex == 1){
			$("#chk_dataroom_close_prj_index").prop("checked", true);
		}
		if(data.reportProjectUserList == 1){
			$("#chk_dataroom_close_user_list").prop("checked", true);
		}
		if(data.reportProjectHistory == 1){
			$("#chk_dataroom_close_history").prop("checked", true);
		}
		if(data.reportProjectPermissionList == 1){
			$("#chk_dataroom_close_perm_list").prop("checked", true);
		}

		showActionPopup("dataroomclosuremodal");
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function logOutServiceAfter(response){
	ajaxindicatorstop();
	clearauthinlocalstorage();
	base64auth = "";
	setTimeout(function(){window.location.href="drive.html"}, 1000);
}


function adminUpdateLogoServiceAfter(response){
	if(response.error == false && response.object != null){
		const random = Math.random() * 100000;
		var logo = response.object;
		localStorage._zl = (logo.length > 0 ? response.object+"?v="+random : defaultLogoPath);
		$("#clogoimg").attr("src", (localStorage._zl == defaultLogoPath ? localStorage._zl : cloudApiUrlACMS+"/"+localStorage._zl));
		$("#ltext").show();
	}else{
		$("#ltext").hide();
	}
}


function fetchMetadataMasterServiceAfter(response){
	document.getElementById("metadata_key").value = '';
	if(response.error == false && response.object != null){
		if(response.object == "NOPERMISSION"){
			$(".metadata_main_div").css("display", "none");
		}else{
			metaDataList = [];
			metadataCount = response.object.length;
			for(var i=0;i<response.object.length;i++){
				addHTMLRow(i,response.object[i].id,response.object[i].label)
				metaDataList.push(response.object[i].label);
			}
			if(metadataCount>2)$("#dropdownMetadata").show();
			else $("#dropdownMetadata").hide();
		}
	}
}
function addHTMLRow(i,id,label){
		var datahtml = "";
		var metadataPreeListClass = "metadatapreList";
		var styledisplay = "";
		if(i > 1) {
			metadataPreeListClass = "";
			styledisplay = "none";
		}
		if(i> 0) datahtml += "<hr id='hr_metadata_"+id+"' class='filesonlyrow_hr metadatList "+metadataPreeListClass+" ' style='margin-top:0px;margin-bottom:0px;display: ;width: 94%;float: left;margin-left: 12px;border-top: 1px solid #e0dbdb;'>";
		datahtml += "	<div class='metadatList "+metadataPreeListClass+"' id='div_metadata_row_" + id + "' data-id='"+id+"' style='margin-right:0px;margin-left:0px;display:"+styledisplay+"'>";
		datahtml += "		<div class='col-md-11 up'>";
		datahtml += "			<div style='float:left;padding-top:3px;'>";
		datahtml += "				<div id='meta_label_"+id+"' style='font-size: 15px;line-height: 35px;'>" + label + "</div>";
		datahtml += "      	 	</div>";
		datahtml += "		</div>";
		datahtml += "   	<div id='metadata_div_row' class='col-md-1 up metadata_iv_row' style='display:none;'>";
		datahtml += "				<span style='padding-top: 2%;'><i id='metadata_row_" + id + "' class=" + "'fa fa-trash font-18 cursor-pointer' style='color: blue;margin-top: 13px;'></i></span>";
		datahtml += "		</div>";
		datahtml += "	</div>";
		if(i==-1){
			datahtml += "<hr id='hr_metadata_"+id+"' class='filesonlyrow_hr metadatList "+metadataPreeListClass+" ' style='margin-top:0px;margin-bottom:0px;display: ;width: 94%;float: left;margin-left: 12px;border-top: 1px solid #e0dbdb;'>";
			$("#metadataList").prepend(datahtml);
		}
		else $("#metadataList").append(datahtml);
		metadataEvent(id);
}

function deleteMetadataMasterServiceAfter(response){
	if(response.error == false && response.object != null && response.object == true){
		metadataCount--;
		var node = document.getElementById("meta_label_"+response.extrajsonparam.id);
        var label = node.textContent;
		metaDataList.splice(metaDataList.indexOf(label),1);
		$("#div_metadata_row_"+response.extrajsonparam.id).remove();
		$("#hr_metadata_"+(response.extrajsonparam.id-1)).remove();
		$(".metadatList").removeClass("metadatapreList");
		adminShowconfirmmsg("Metadata deleted Successfully.", confirm_Success, 5000, "", false, false);
		if($(".metadatList").size() > 0){
			var obj = $(".metadatList")[0];
			$(obj).addClass("metadatapreList");
		}
		if($(".metadatList").size() > 1){
			var obj = $(".metadatList")[1];
			$(obj).addClass("metadatapreList");
		}
		$(".metadatapreList").show();
		if(metadataCount>2)$("#dropdownMetadata").show();
		else $("#dropdownMetadata").hide();
	} else {
		adminShowconfirmmsg("Unable to delete Metadata.", confirm_Error, 5000, "", false, false);
	}
}

function addMetadataMasterServiceAfter(response){
	if(response.error == false && response.object != null){
		if(response.object.split("#")[0] != 0){
			metadataCount++;
			addHTMLRow(-1,response.object.split("#")[0],response.object.split("#")[1]);
			metaDataList.push(response.object.split("#")[1]);
			$(".metadata_iv_row").css("display", "block");
			if(metadataCount>2)$("#dropdownMetadata").show();
			else $("#dropdownMetadata").hide();
			document.getElementById("metadata_key").value = '';
			adminShowconfirmmsg("Metadata added Successfully.", confirm_Success, 5000, "", false, false);
		}else
			adminShowconfirmmsg("Metadata already exist.", confirm_Error, 5000, "", false, false);
	}
}

function fetchLiveUsersServiceAfter(response){
	totalLiveUser = 0;
	displaycounter = 0;
	$("#divLiveUserpages").html("");
	ajaxindicatorstop();
	if(response.object != undefined) {
		var details = response.object;
		$("#table_liveUser").empty();
		if(details != null && details.length > 0) {
			if(liveusersearch.length == 0){
				liveusersearch = details;
			}
			var j = 0;
			liveuserpagecount = parseInt(details.length/maxrows) + 1;
			var count = 0;
			liveuserlistarrar = [];
			userlistarrartemp = [];
			for(var i=0;i<details.length;i++){
				totalLiveUser++;
				userlistarrartemp[j] = details[i];
				if((j == maxrows-1) || (count == liveuserpagecount-1 && i == details.length-1)) {
					j = 0;
					liveuserlistarrar[count++] = userlistarrartemp;
					$("#divLiveUserpages").append("<a href='javascript:void(0);' style='color:#9f9797;margin-right:10px;text-decoration:none;' class='pagecount' id='liveuserpagecount_"+count+"' onclick='displayLiveUserListDataRowsDBUI("+(count-1)+")'>"+count+"</a>");
					userlistarrartemp = [];
				} else {
					j++;
				}
			}
			$("#totalliveusercount").html(totalLiveUser);
			displayLiveUserListDataRowsDBUI(displaycounter);
			if(liveuserpagecount > 1) $("#tableHeadLiveUserPages").show();
		}else{
			if(liveusersearchdone == 1){
				adminShowconfirmmsg(admin_Messages.admin_norec, confirm_Error, 5000, "", false, false);
			}
		}
		liveusersearchdone = 0;
	}
}

function displayLiveUserListDataRowsDBUI(displaycounter){
	var details = liveuserlistarrar[displaycounter];
	$("#table_liveUser").empty();
	$(".pagecount").css("color", "#9f9797");
	$(".pagecount").css("font-size", "14px");
	$(".pagecount").css("font-weight", "normal");
	$(".pagecount").css("text-decoration", "none");

	$("#liveuserpagecount_" + (displaycounter + 1)).css("color", "#2abfc1");
	$("#liveuserpagecount_" + (displaycounter + 1)).css("font-size", "17px");
	$("#liveuserpagecount_" + (displaycounter + 1)).css("font-weight", "bold");
	$("#liveuserpagecount_" + (displaycounter + 1)).css("text-decoration", "underline");

	for(var i=0;i<details.length;i++){
		var userName = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].attribute1));
		var middleName = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].attribute2));
		var lastname = capitalizefirstletterfromallword(checkscreenwidthdesc(details[i].attribute3));
		userName = userName + " " + middleName + " " + lastname;
		var loginId = "";
		if(checkblankdata(details[i].attribute4)) {
			loginId = details[i].attribute4;
		}
		var userType = details[i].attribute5;
		var loginTime = Date.parse(details[i].dateAttribute8);
		var d = new Date(loginTime);
		loginTime = getdatefromtimestamp(d);
		var adminString = "";
		adminString += "<div class='col-md-12 col-sm-12 col-xs-12 admtable_row_padding userrow1'>";
		adminString += "<div class='col-md-3 col-sm-3 userrow2'>";
		adminString += "<h2 style='display:inline-flex;'>";
		adminString += "<a href='#' style='height:18px;font-size:14px;font-weight:400;line-height:20px;' title='"+userName+"'>"+trimOverFlowCharacters(userName)+"";
		adminString += "</a>";
		adminString += "</h2>";
		adminString += "</div>";
		adminString += "<div class='col-md-3 col-sm-3 userrow6 admin_user_detail_col2' style='padding-top: 19px;'>"+loginId.toLowerCase()+"</div>";
		adminString += "<div class='col-md-2 col-sm-2 ' style='padding-top: 19px;'>"+userType+"</div>";
		adminString += "<div class='col-md-4 col-sm-4 userrow6' style='padding-top: 19px;padding-left:170px;'>"+loginTime+"</div>";
		adminString += "</div>";
		adminString += "</div>";
		$("#table_liveUser").append(adminString);
	}
	$("#live_user_table_div_").show();
}

function adminCheckPersonal(){
	if (personalactive) {
		$(".admin_personal_row_header").css("display", "block");
		$(".admin_personal_row").css("display", "block");
	} else {
		$(".admin_personal_row_header").css("display", "none");
		if(localStorage._zs !="B"){
			$(".admin_personal_row").css("display", "block");
		}else{
			$(".admin_personal_row").css("display", "none");
		}

	}
}