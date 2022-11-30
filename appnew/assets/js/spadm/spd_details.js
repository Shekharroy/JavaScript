var totalusers = 0;
var totalLiveUser = 0;
var sizeLeft = -1;
var allocatedStorage = -1;
var userimgbase64 = "";
var prvuserimg = "";
var contact_id = "";
var phone_id = "";
var fax_id = "";
var adminSaveUserPhoneURL = "/v1/contactphoneupd/<ACTION>";
var adminSaveUserFaxURL = "/v1/contactfaxupd/<ACTION>";
var adminAddUserPhoneURL = "/v1/contactphoneadd/<ACTION>";
var adminAddUserFaxURL = "/v1/contactfaxadd/<ACTION>";
var totalPersonalStorage = 0;
var totalDataroomStorage = 0;

function adminFetchCorporateListAfter(response){
	displaycounter = -1;
	currentservicemethodafter = "";
	if (searchdone == 0) corpdetails = [];
	$("#manage_user_bg").removeClass("sidebarliactive");
	$("#img_manage_user").removeClass("sidebarliimgactive");
	$("#corporate_Details_bg").addClass("sidebarliactive");
	$("#img_corp_details").addClass("sidebarliimgactive");
	$("#manage_device_bg").removeClass("sidebarliactive");
	$("#img_manage_devices").removeClass("sidebarliimgactive");
	$("#spadmsetting").removeClass("sidebarliactive");
	$("#spadmsearchindex").removeClass("sidebarliactive-ai");
	$("#img_spadmsearchindex").removeClass("sidebarliimgactive");
	$("#spadmtraindoc").removeClass("sidebarliactive");
	$('#mg_corplist').show();
	$('#btncorp').show();
	$('#mg_user').hide();
	$('#btnuserone').hide();
	$("#admin_searchbar").show();
	$('#adduser').hide();
	$('#mg_corp').hide();
	$('#mg_ai').hide();
	$('#mg_train_doc').hide();
	$('#mg_divc').hide();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#overlay_corporate").hide();
	$("#btnuserexport").hide();
	$("#poll_update_div").hide();

	ajaxindicatorstop();
	var details = response;
	if(response.object != undefined) details = response.object;
	$("#table_managecorp").empty();

	if (details != null && details.length > 0) {
		for (var i = 0; i < details.length; i++) {
			addCorporateRow(details[i], i);
			if (searchdone == 0) {
				corpdetails.push(details[i]);
			}
		}
	} else {
		if (searchdone == 1) {
			adminShowconfirmmsg(admin_Messages.admin_norec, confirm_Error, 5000, "", false, false);
		}
		else {
			window.location.href = "error.html";
		}
	}
	searchdone = 0;
	fetchLogoService();
}

function addCorporateRow(details, i) {
	var corporatename = capitalizefirstletterfromallword(checkscreenwidthdesc(details.attribute3));
	var corpid = details.attribute1;
	var corpnumber = details.attribute2;
	var expirydate = details.attribute4;
	var status = details.attribute5;
	var archivalStatus = details.attribute10;
	var deleteStatus = details.attribute11;
	var corptype = (details.attribute6 == "I" ? "Individual" : "Business");
	var createdDate = details.attribute7;
	var maindivcolor = (status == "D" ? "color:#FF0000" : "");
	var tooltip = "";
	if (archivalStatus == "1") {
		tooltip = "Archival started";
	} else if (archivalStatus == "2") {
		tooltip = "Archival completed";
	}
	if (deleteStatus == "1") {
		tooltip = "Delete started";
	} else if (deleteStatus == "2") {
		tooltip = "Dataroom Closed";
	}

	var datavar = "data-id='" + corpid + "' data-number='" + corpnumber + "'";
	var adminString = "";
	adminString += "<div class='col-md-12 col-sm-12 col-xs-12 single userrow1' id='div_corp_row_" + i + "' " + datavar + " style='cursor:pointer;padding-top:0px;padding-bottom:9px;" + maindivcolor + "' title='" + tooltip + "'>";
	adminString += "	<div class='col-md-4 col-sm-4 userrow2'>";
	adminString += "		<h2 style='display:inline-flex;'>";
	adminString += "		<a href='#' style='height:18px;font-size:14px;font-weight:400;line-height:20px;' title='" + corporatename + "'>" + trimOverFlowCharacters(corporatename) + "";
	adminString += "			<br>";
	adminString += "		</a>";
	adminString += "		</h2>";
	adminString += "	</div>";
	adminString += "	<div class='col-md-2 col-sm-2 userrow6' style='padding-top: 19px;'>" + corpnumber + "</div>";
	adminString += "	<div class='col-md-2 col-sm-2 userrow6' style='padding-top: 19px;'>" + createdDate + "</div>";
	adminString += "	<div class='col-md-2 col-sm-2 userrow6' style='padding-top: 19px;'>" + expirydate + "</div>";
	adminString += "	<div class='col-md-2 col-sm-2 userrow6' style='padding-top: 19px;'>" + corptype + "</div>";
	adminString += "</div>";
	$("#table_managecorp").append(adminString);
	registerBindEventsForCorpListAdmin(i);
}

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
	$("#spadmsetting").removeClass("sidebarliactive");
	$('#mg_user').show();
	$('#btnuserone').show();
	$("#admin_searchbar").show();
	$('#adduser').hide();
	$('#mg_corp').hide();
	$('#mg_ai').hide();
	$('#mg_train_doc').hide();
	$('#mg_divc').hide();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#overlay_corporate").hide();
	$('#mg_corplist').hide();
	$('#btncorp').hide();
	$('#btnuserexport').show();

	var msgHeight = $(window).height() - 162;
	$('#table_manageuser').height(msgHeight);

	var msgWidth = $(window).width() - 100;
	$('#divpages').css("max-width", msgWidth);
	$('#divpages').css("overflow", "auto");
	if ( $.browser.webkit) {
		$('#divpages').addClass("scrollable-element");
	}else{
		$('#divpages').addClass("scrollable-elements");
	}

	if(pagecount > 1){
		$("#tableHeadPages").show();
	} else {
		$("#tableHeadPages").hide();
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

	var details = response;
	if(response.object != undefined) details = response.object;
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
		if(response.tempObject2){
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
	displayUsercommon();
	fetchLogoService();
}

function displayUserListDataRowsDBUI(counter){
	ajaxindicatorstart('fetching users...');
	displaycounter = counter;
	$("#table_manageuser").html("");
	$(".pagecount").css("color", "#9f9797");
	$(".pagecount").css("font-size", "14px");
    $(".pagecount").css("font-weight", "normal");
	$(".pagecount").css("text-decoration", "none");

	$("#pagecount_"+(counter+1)).css("color", "#2abfc1");
	$("#pagecount_"+(counter+1)).css("font-size", "17px");
    $("#pagecount_"+(counter+1)).css("font-weight", "bold");
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
			var datavar = "data-id='"+details[i].userId+"'";
			var adminString = "";
			adminString += "<div class='col-md-12 col-sm-12 col-xs-12 admtable_row_padding userrow1' id='div_user_row_"+i+"' "+datavar+">";

			if(localStorage._zs == "B") {
				adminString += "<div class='col-md-4 col-sm-4 userrow2'>";
			} else {
				adminString += "<div class='col-md-4 col-sm-4 userrow2'>";
			}
			adminString += "<img src='"+imagePath+"' class='img-circle' style='width:30px;height:30px;margin-right:5px;margin-top:14px;'>";
			adminString += "<h2 style='display:inline-flex;'>";
			adminString += "<a href='#' class='admin_user_detail_col2' style='height:18px;font-size:14px;font-weight:400;line-height:20px;' title='"+userName+"'>"+trimOverFlowCharacters(userName)+"";

				adminString += "<br>";
				if(userstatus == "P"){
					if(details[i].activationStatus == 2) {
						adminString += "<span class='blockuser' style='color:red;' id='user_activation_pending_"+i+"'>Activation failed</span>";
					} else {
						adminString += "<span class='blockuser' id='user_activation_pending_"+i+"'>Waiting for Activation</span>";
					}
					adminString += "&nbsp;&nbsp;&nbsp;<span class='unblockColor pointerClass blockuser' id='activateuserbtn_"+i+"' style='display:"+(userstatus == "A" ? "none":"")+"'>Activate User</span>";
					userstatusstr = "Waiting for Activation";
				} else if(userstatus == "X") {
					adminString += "<span class='blockuser' style='color:red;' id='user_activation_pending_"+i+"'>Activation failed</span>";
				} else {
					adminString += "<span class='blockColor pointerClass blockuser' id='disableuserbtn_"+i+"' style='display:"+(userstatus == "A" ? "":"none")+"'>Block</span>";
					adminString += "<span class='unblockColor pointerClass blockuser' id='enableuserbtn_"+i+"' style='display:"+(userstatus == "A" ? "none":"")+"'>Unblock</span>";
					userstatusstr = (userstatus == "A" ? "Active":"Blocked");
				}

			adminString += "</a>";
			adminString += "</h2>";
			adminString += "</div>";

			adminString += "<div class='col-md-3 col-sm-3 userrow6 admin_user_detail_col2' style='padding-top: 19px;' id='admin_user_detail_col2_"+i+"'>"+loginId.toLowerCase()+"</div>";

			adminString += "<div class='col-md-1 col-sm-1 ' style='padding-top: 19px;' id='admin_user_detail_col2_"+i+"'>"+userType+"</div>";
			adminString += "<div class='col-md-1 col-sm-1 userrow6 spdm_personal_row' style='padding-top: 19px;padding-left:19px;' id='admin_user_detail_col3_"+i+"'>"+personalstorage+"</div>";
			if(localStorage._zs == "B") {
				adminString += "<div class='col-md-2 col-sm-2 userrow6' style='padding-top: 19px;padding-left:23px;'>"+dataroomstorage+"</div>";
			}
			adminString += "<div class='col-md-1 col-sm-1 userrow7' style='padding-right:0px;padding-left:5px;padding-top: 15px;'>";

			adminString += "<div class='dropdown spdm_dropdown_class' style='display:flex !important;justify-content:center !important;'>";
			adminString += "<img src='assets/img/layer.png' class='dropdown-toggle' data-toggle='dropdown' style='display:flex !important;justify-content:center;width:25px;height:25px;cursor:pointer !important;' alt='' id='user_more_"+i+"'>";
			adminString += "<div class='dropdown-menu rowdropdownmenupadding0 new-menu' style='transform: translate3d(-45px, 3px, 0px);'>";
			if(userstatus == "X"){
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='adminresendactivation_"+i+"' data-loginid='"+loginId.toLowerCase()+"'>Resend Activation Mail</a>";
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;' id='admindeleteuser_"+i+"'>Delete User</a>";
			}else if(userstatus != "P") {
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='adminedituser_"+i+"'>Edit User</a>";
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='admindeleteuser_" + i + "'>Delete User</a>";
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;' id='resetpassbtn_"+i+"'>Reset Password</a>";
			} else if(userstatus == "P") {
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;border-bottom:1px solid #ccc;' id='adminresendactivation_"+i+"' data-loginid='"+loginId.toLowerCase()+"'>Resend Activation Mail</a>";
				adminString += "<a class='dropdown-item' href='#' style='padding:15px;' id='admindeleteuser_"+i+"'>Delete User</a>";
			}
			//adminString += "</ul>";
			adminString += "</div>";
			adminString += "</div>";

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
	if(response.error == false && response.messageCode == 201 && response.object != null){
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

				var stringHTML = "<div class='col-md-12 col-sm-12 col-xs-12'>";
				stringHTML += "<br>";
				stringHTML += "<label class='container'>";
				stringHTML += "<input type='checkbox' name='terms' class='label-to-bold-if-checked' "+checked+" id='"+checkBoxId+"'> <span> "+name+"</span>";
				stringHTML += "<span class='checkmark'></span>";
				stringHTML += "</label>";
				stringHTML += "</div>";

			}
		}
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
			displaycounter = -1;
			adminFetchUserList("N");
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
	    $("#adduser").attr("data-contact-id", details.contactDto.id);
		$('#txt_companyname').val(details.contactDto.companyName);
		$('#txt_companyname').attr("readonly", true);

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
		if(details.role == 3) {
			$('#chk_adduser_partner').prop("checked", true);
			$('#chk_adduser_admin').prop("checked", false);
			$("#chk_adduser_user").prop("checked", false);
		}else if(details.type !="") {
			if(details.type == "ADMIN") {
				$('#chk_adduser_partner').prop("checked", false);
				$('#chk_adduser_admin').prop("checked", true);
				$("#chk_adduser_user").prop("checked", false);
			}else if(details.type == "USER"){
				$('#chk_adduser_partner').prop("checked", false);
				$('#chk_adduser_admin').prop("checked", false);
				$('#chk_adduser_user').prop("checked", true);
			}
			if(details.contactDto.userId == localStorage._zv){
				$('#chk_adduser_partner').attr("disabled", true);
				$('#chk_adduser_admin').attr("disabled", true);
				$('#chk_adduser_user').attr("disabled", true);
			}
		}

		if(details.syncType == "P"){
			$('#chk_adduser_sync_personal').prop("checked", true);
			$('#chk_adduser_sync_dataroom').prop("checked", false);
		} else if(details.syncType == "S"){
			$('#chk_adduser_sync_personal').prop("checked", false);
			$('#chk_adduser_sync_dataroom').prop("checked", true);
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
				if(details.moduleAcls[i] == 1){
					$("#chk_adduser_usb").prop("checked", true);
				} else if(details.moduleAcls[i] == 2){
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
		$("#chk_user_auth_security").attr("disabled", true);
		$("#chk_user_email_security").attr("disabled", true);

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

function adminfetchCorporateDetailsServiceAfter(response){
	$("#btncorpcancel").hide();
	var msgHeight = $(window).height() - 134;
	$('#pending_Tab').height(msgHeight);
	ajaxindicatorstop();
	adminCheckDataroomClosureService();

	if (response.error == false && response.object != null) {
		$("#btnsavecorp").html("EDIT");
		var details = response.object;
		if(details !=null) {
			$("#manage_user_bg").removeClass("sidebarliactive");
			$("#img_manage_user").removeClass("sidebarliimgactive");
			$("#manage_device_bg").removeClass("sidebarliactive");
			$("#img_manage_devices").removeClass("sidebarliimgactive");
			$("#corporate_Details_bg").removeClass("sidebarliactive");
			$("#spadmsearchindex").removeClass("sidebarliactive-ai");
			$("#img_spadmsearchindex").removeClass("sidebarliimgactive");
			$("#spadmtraindoc").removeClass("sidebarliactive");
			$("#img_corp_details").addClass("sidebarliimgactive");
			$("#spadmsetting").addClass("sidebarliactive");
			$('#mg_user').hide();
			$("#admin_searchbar").hide();
			$('#adduser').hide();
			$('#mg_divc').hide();
			$('#mg_ai').hide();
			$('#mg_train_doc').hide();
			$('#mg_corp').show();
      		selectedcorpid = response.object.id;
			fetchRegionList(details.s3RegionId);
			$('#mg_corp').attr("data-id", details.id);
			$('#mg_corp').attr("data-s3", details.s3RegionId);

			$('#admin_sp_corp_expirydate').val(details.expiryDate);
			$('#admin_sp_corp_consumed_storage').val(details.consumedStorage);
			$('#admin_sp_total_storage').val(details.allocatedStorage);
			$('#admin_sp_corp_archived_storage').val(details.archivedStorage);
			$('#admin_sp_corp_number_users').val(details.consumedUsers);
			$('#admin_sp_total_uers').val(details.allocatedUsers);
			$("#admin_sp_corp_price").val(details.lawfirmPrice);

			var accType = details.accType;
			corpacctype = accType;
			if(accType == "B"){
				$("#div2factauthdetail").show();
				$("#divshowprjnumber").show();
				$("#divuser2factauthdetail").show();
			} else {
				$("#div2factauthdetail").hide();
				$("#divshowprjnumber").hide();
				$("#divuser2factauthdetail").hide();
			}

			if(accType == "I"){
				$("#admin_sp_total_uers").attr("readonly", true);
				$("#btn_save_user").attr("disabled", true);
			} else {
				$("#admin_sp_total_uers").attr("readonly", false);
				$("#btn_save_user").attr("disabled", false);
			}

			twofactorAuth = details.twoFactorAuth;
			if(twofactorAuth == 1){
				$("#admin_chk_two_factor_auth").prop("checked", true);
			} else {
				$("#admin_chk_two_factor_auth").prop("checked", false);
			}

			rootAccesstoAllAdmins = details.rootAccesstoAllAdmins;
			if(rootAccesstoAllAdmins == 1){
				$("#root_alladmin_access").prop("checked", true);
			} else {
				$("#root_alladmin_access").prop("checked", false);
			}

			$("#admin_corporate_name").val(trimOverFlowCharacters(details.clientName));
			if(details.lawFirmDetails != null && details.lawFirmDetails[0] != null){
				$("#admin_corporate_email").val(details.lawFirmDetails[0].emailId);
				if(details.lawFirmDetails[0].phone !=null && details.lawFirmDetails[0].phone !='' && details.lawFirmDetails[0].phone !="null") {
					var ph = handleNullValue(details.lawFirmDetails[0].phone);
					if(ph == 0) ph = "";
					$("#admin_corporate_phone").val(ph);
				}
			}

			if (details.startDate != null) {
				var sdate = details.startDate.split('T');
				$('#admin_corporate_startdate').val(adminFormatDateToDisplayUS(sdate[0]));
			}
			if (details.expiryDate != null) {
				var edate = details.expiryDate.split('T');
				$('#admin_corporate_enddate').val(adminFormatDateToDisplayUS(edate[0]));
			}

			if (details.waterMarkText != null) {
				$('#admin_watermark_text').val(details.waterMarkText);
			}
			try{
				$('#admin_chk_watermark_view').prop("checked", false);
				$('#admin_chk_watermark_download').prop("checked", false);
				var watermarkdisplay = details.waterMarkDisplay.split(",");
				if (watermarkdisplay[0] == "1") {
					$('#admin_chk_watermark_view').prop("checked", true);
				}
				if (watermarkdisplay[1] == "1") {
					$('#admin_chk_watermark_download').prop("checked", true);
				}
			}catch(error){
			}

			var showProjectIndexNo = details.showProjectIndexNo;
			if (showProjectIndexNo == "1") {
				$('#admin_chk_prjindex_number').prop("checked", true);
			} else {
				$('#admin_chk_prjindex_number').prop("checked", false);
			}

			var timeZone = details.timeZone;
			if(timeZone != null && timeZone != undefined) $("#selectTimeZone").val(timeZone);

			var waterMarkColor = details.waterMarkColor;
			var obj = $('.watermarkcolor')[waterMarkColor];
			$(obj).addClass("active");



			var addressDetails = details.lawFirmAddress;
			if(addressDetails !=null) {
				if(addressDetails.length > 0) {
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
			if(contactDetails !=null) {
				admin_clientContactDetailsLength = contactDetails.length;
				if(contactDetails.length >0) {
					$('#admin_corporate_firstname').val(handleNullValue(contactDetails[0].firstName));
					$('#admin_corporate_middlename').val(handleNullValue(contactDetails[0].middleName));
					$('#admin_corporate_lastname').val(handleNullValue(contactDetails[0].lastName));
					$('#admin_corporate_email').val(handleNullValue(contactDetails[0].emailId));
					var ph = handleNullValue(contactDetails[0].phone);
					if(ph == 0) ph = "";
					$('#admin_corporate_phone').val(ph);
					$('#admin_corporate_fax').val(handleNullValue(contactDetails[0].fax));
					$('#admin_corporate_firstname').attr("data-id", contactDetails[0].id);
				}
			}

			if(details.accType == "B"){
				$("#divuser2factauthdetail").show();
				admOTPSettingsService(details.id);
			} else {
				$("#divuser2factauthdetail").hide();
			}
			fetchAllModulesService();
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

	checkNormalFolderExistsService();
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

function adminSaveClientServiceAfter(response){
	ajaxindicatorstop();
	if (response.error == false && response.object != null) {
		adminShowconfirmmsg(admin_Messages.admin_corporatedetailssaved, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg("Could not process request. please try again.", confirm_Error, 5000, "", false, false);
	}
}

function adminfetchPenidingDeviceServiceAfter(response){
	$("#manage_user_bg").removeClass("sidebarliactive");
	$("#img_manage_user").removeClass("sidebarliimgactive");
	$("#corporate_Details_bg").removeClass("sidebarliactive");
	$("#img_corp_details").removeClass("sidebarliimgactive");
	$("#manage_device_bg").addClass("sidebarliactive");
	$("#img_manage_devices").removeClass("sidebarliimgactive");
	$("#spadmsearchindex").removeClass("sidebarliactive-ai");
	$("#img_spadmsearchindex").removeClass("sidebarliimgactive");
	$("#spadmtraindoc").removeClass("sidebarliactive");
	$('#mg_user').hide();
	$('#btnuserone').hide();
	$("#admin_searchbar").show();
	$('#adduser').hide();
	$('#mg_corp').hide();
	$('#mg_ai').hide();
	$('#mg_train_doc').hide();
	$('#mg_divc').show();
	$("#pending_Tab").show();
	$("#blocked_Tab").hide();
	$("#approved_tab").hide();
	$("#tableHeadSecDevice").show();
	$("#overlay_user").hide();
	$("#overlay_divc").hide();
	$("#overlay_corporate").hide();

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
			adminString += "<div class='col-md-3 col-sm-3'>"+devicName+"</div>";
			adminString += "<div class='col-md-4 col-sm-4'>";
			adminString += "<span>"+remoteAddressVal+"</span>";
			adminString += "<span style='float: right;'>"+recevDateVal+"</span></div>";
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
	$("#overlay_corporate").hide();
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
			var recvdate = Date.parse(details[i].approvedBlocked);
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
			var adminString = "<div class='col-md-12 col-sm-12 col-xs-12 single' id='divblocked_"+i+"' data-id='"+details[i].id+"' style='cursor:pointer;'>";
			adminString += "<div class='col-md-2 col-sm-2' title='"+nm+"'>" + trimOverFlowCharacters(nm, 15);
			adminString += "<div><span class='unblockColor pointerClass' id='btnblockdvunblock_"+i+"'>Unblock</span> | <span class='deleteColor pointerClass' id='btnblockdvdelete_"+i+"'>Delete</span>";
			adminString += "</div>";
			adminString += "</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+handleNullValue(details[i].emailId).toLowerCase()+"</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+devicName+"</div>";
			adminString += "<div class='col-md-4 col-sm-4'>";
			adminString += "<span>"+remoteAddressVal+"</span>";
			adminString += "<span style='float: right;'>"+recevDateVal+"</span></div>";
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
	$("#overlay_corporate").hide();
	admin_comments = [];

	ajaxindicatorstop();
	var details = response;
	if(response.object != undefined) details = response.object;
	if(details != null && details.length > 0){
		var i = 0;
		for(i=0;checkNullValue(details) && i<details.length; i++){
			var commentMsg = "";
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
			var adminString = "<div class='col-md-12 col-sm-12 col-xs-12 single' id='divapproved_"+i+"' data-id='"+details[i].id+"' style='cursor:pointer;'>";
			adminString += "<div class='col-md-2 col-sm-2' title='"+nm+"'>" + trimOverFlowCharacters(nm, 15);
			if(details[i].id != localStorage._zq){
				adminString += "<div><span class='blockColor pointerClass' id='btnapprovblock_"+i+"'>Block</span> | <span class='deleteColor pointerClass' id='btnapprovdelete_"+i+"'>Delete</span></div>";
			}
			adminString += "</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+handleNullValue(details[i].emailId).toLowerCase()+"</div>";
			adminString += "<div class='col-md-3 col-sm-3'>"+devicName+"</div>";
			adminString += "<div class='col-md-4 col-sm-4'>";
			adminString += "<span>"+remoteAddressVal+"</span>";
			adminString += "<span style='float: right;'>"+recevDateVal+"</span></div>";
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
		}
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
	if(response.error == false && response.messageCode == 201 && response.object != null){
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

		$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(name1))));
		$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
		$("#musername").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name)));
		$("#museremail").html(data.loginId);
		$("#muserType").val(data.type);

		if(data.syncType == "P"){
			$("#msynctype").val("Personal Folder Sync");
		} else if(data.syncType == "S"){
			$("#msynctype").val("Shared Folder Sync");
		}

		$("#mfirstname").val(firstname);
		$("#mmiddlename").val(middlename);
		$("#mlastname").val(lastname);
		$("#musercorp").html(localStorage._zu);
		$("#mcompany").val(replacenullval(data.contactDto.companyName));
		var imagePath = replacenullval(data.contactDto.picture);
		contact_id = data.contactDto.id;
		var mobileNumber = "";
		try {
			var arr = data.contactPhoneList;
			if (arr != null && arr.length() > 0) {
				for (var i = 0; i < arr.length(); i++) {
					var primary = arr[i].primary;
					if (primary == 1) {
						mobileNumber = arr[i].phone;
						$("#mmobilenumber").val(replacenullval(mobileNumber));
						phone_id = arr[i].id;
						break;
					}
				}
			}
		}catch(error){
			console.log(error);
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
			console.log(error);
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
	}
}

function adminFetchStorageLeftServiceAfter(response){
	ajaxindicatorstop();
	var extraParam = response.extrajsonparam;
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
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

function admincreateNewCorporateServiceAfter(response){
	ajaxindicatorstop();
	hideActionPopup("createcoprmodal");
	if(response.error == true && response.object == null && response.message == "NOLAWFIRMCREATED"){
		var corptype = $("input[name='MyRadio']:checked").val();
		if(corptype == "I"){
			adminShowconfirmmsg(admin_Messages.admin_individualaccountexists, confirm_Error, 5000, "", false, false);
		} else {
			adminShowconfirmmsg(admin_Messages.admin_corporatecreationerror, confirm_Error, 5000, "", false, false);
		}
	} else {
		if($("#chk_edit_personal_folder_access").is(":checked")){
			var json = {"attribute1":"saveCorpModulesServiceAfter", "listAttribute5":[]};
			json.listAttribute5.push({"attribute2":response.tempObject2,"attribute3":8,"attribute4":1});
			saveCorpModulesService(json);
		}
		adminFetchCorporateList();
	}
}

function activateUserServiceAfter(response){
	ajaxindicatorstop();
	displaycounter = -1;
	adminFetchUserList("N");
	adminShowconfirmmsg(admin_Messages.admin_useractivated, confirm_Success, 5000, "", false, false);
}

function activateCorporateServiceAfter(response){
	ajaxindicatorstop();
	adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
	adminFetchCorporateList();
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
	fetchLogoService();
}

function adminProcessDataroomClosureServiceAfter(response){
	if(response.error == false && response.object == true){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
		hideActionPopup("dataroomclosuremodal");
		adminfetchCorporateDetailsService();
	} else {
		if(response.message=="NOPERMISSION"){
			adminShowconfirmmsg(admin_Messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else {
			if(response.message!="" && response.message!="null"){
				adminShowconfirmmsg(response.message, confirm_Error, 5000, "", false, false);
			} else {
				adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
			}
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
	$("#btn_admin_close_dataroom_delete").hide();
	$("#btn_admin_reopen_dataroom").hide();
	$("#btn_dataroom_close_req_cancel").hide();
	$("#btn_dataroom_close_confirm").hide();
	$("#label_close_dataroom_status").hide();
	$("#btn_dataroom_close_print").hide();
	$("#btn_admin_archive_dataroom").show();
	if(response.error == false && response.object != null){
		$("#btn_admin_close_dataroom").html("Dataroom Archival Details");
		$("#btn_admin_close_dataroom").show();
		$("#btn_dataroom_close_print").show();
		$("#btn_dataroom_close_confirm").html("Update");
		$("#btn_admin_archive_dataroom").hide();
		if(response.object.downloadStatus == 0){
			$("#btnsavecorp").show();
			$("#btn_dataroom_close_req_cancel").show();
			$("#btn_dataroom_close_confirm").show();
		} else if(response.object.downloadStatus == 1){
			$("#btnsavecorp").hide();
			$("#label_close_dataroom_status").show();
			$("#label_close_dataroom_status").html("Dataroom archival download started. Once the download completes you will see the initiate delete dataroom button.");
			$("#btn_admin_archive_dataroom").hide();
		} else if(response.object.downloadStatus == 2){
			$("#btn_admin_close_dataroom_delete").show();
			$("#btn_admin_reopen_dataroom").show();
			$("#btnsavecorp").hide();
			$("#label_close_dataroom_status").hide();
			$("#btn_admin_archive_dataroom").hide();
		}

		if(response.object.deleteStatus == 1){
			$("#btnsavecorp").hide();
			$("#label_close_dataroom_status").show();
			$("#btn_admin_close_dataroom_delete").hide();
			$("#btn_admin_reopen_dataroom").hide();
			$("#label_close_dataroom_status").html("Dataroom delete started. Once the delete completes you will be notified by email.");
			$("#btn_admin_archive_dataroom").hide();
		} else if(response.object.deleteStatus == 2){
			$("#btnsavecorp").hide();
			$("#label_close_dataroom_status").show();
			$("#btn_admin_close_dataroom_delete").hide();
			$("#btn_admin_reopen_dataroom").hide();
			$("#label_close_dataroom_status").html("Dataroom delete is complete.");
			$("#dataroomclosuremodalcaption").html("Dataroom closed");
			$("#btn_admin_archive_dataroom").hide();
			adminFetchDataroomClosureService();
		}
	} else {
		$("#btnsavecorp").show();
		$("#btn_dataroom_close_confirm").html("Confirm");
		$("#btn_admin_close_dataroom").html("Close Dataroom");
		$("#btn_dataroom_close_confirm").show();
		$("#btn_admin_archive_dataroom").show();
	}
}

function adminFetchDataroomClosureServiceAfter(response){
	$("#btn_dataroom_close_print").hide();
	if(response.error == false && response.object != null){
		$("#btn_dataroom_close_print").show();
		adminCloseDataroomResetPopup();
		var data = response.object;
		$("input[name=radioclosedataroom][value='"+data.instantTerminate+"']").prop("checked",true);
		if(data.instantTerminate == 0){
			$("#div_dataroom_close_later_date").show();
			var sdate = data.terminateDate.split('T')[0];
			$('#date_dataroom_close').val(sdate);
			$("#sel_admin_dataroom_close_reason option").filter(function() {
			    return $(this).text() ==data.reason;
			}).prop("selected", true);
			$("#sel_admin_dataroom_close_reason").prop("checked",true);
		}

		$("input[name=radioclosedataroomflashdrive][value='"+data.flashDriveRequired+"']").prop("checked",true);
		$("#sel_dataroom_close_experience").val(data.experience);
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
			$("#div_dataroom_close_experience").show();
			$("#div_dataroom_close_doc_format").show();
			$("#div_dataroom_close_drive_type").show();
			$("#sel_dataroom_close_drive_type").val(data.flashDriveType);
			$("#div_dataroom_close_initby").show();
			$("#txt_dataroom_close_initby").val(data.initiatedBy);
		}

		if (data.reportProjectIndex == 1) {
			$("#chk_dataroom_close_prj_index").prop("checked", true);
		} else $("#chk_dataroom_close_prj_index").prop("checked", false);
		if (data.reportProjectUserList == 1) {
			$("#chk_dataroom_close_user_list").prop("checked", true);
		} else $("#chk_dataroom_close_user_list").prop("checked", false);
		if (data.reportProjectHistory == 1) {
			$("#chk_dataroom_close_history").prop("checked", true);
		} else $("#chk_dataroom_close_history").prop("checked", false);
		if (data.reportProjectPermissionList == 1) {
			$("#chk_dataroom_close_perm_list").prop("checked", true);
		} else $("#chk_dataroom_close_perm_list").prop("checked", false);

		if(data.downloadStatus > 0){
			admindataroomcloseenabledisablelements(true);
		} else {
			admindataroomcloseenabledisablelements(false);
		}

		$("#dataroomclosuremodal").modal("show");
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function adminDeleteDataroomServiceAfter(response){
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
	adminCheckDataroomClosureService();
}

function fetchs3regionsServiceAfter(response){
	if(response.error == false && response.object != null){
		var data = response.object;
		var option = '<option value="-1" selected="">Select</option>';
		for (var i=1;i <= data.length;i++){
		   option += '<option value="'+ i + '">' + data[i-1].description + '</option>';
		}
		$('#sel_add_corp_region').append(option);
	}
}

function fetchAllModulesServiceAfter(response){
	$('#div_modules_box').html("");
	$('#div_modules_super').hide();
	moduleslist = [];
	if(response.error == false && response.object != null){
		var data = response.object;
		var str = "";
		if (data != null && data.length > 0) {
			str += "<div class='col-md-12 col-sm-12 col-xs-12 tabContSingle nopaddingLR'>";
			for (var i = 0; i < data.length; i++) {
				str += "<div class='col-md-4 col-sm-4 col-xs-4'>";
				str += "<input type='checkbox' name='terms' data-id='" + data[i].moduleId + "' id='chk_admin_modules_" + data[i].moduleId + "' class='chk_admin_modules' ";
				if (data[i].moduleId == 8 || (corpacctype =="I")) {
					str += "disabled='disabled'>";
				} else {
					str += ">";
				}
				str += "<span>&nbsp;&nbsp;" + data[i].moduleName + "</span>";
				str += "</div>";
				moduleslist.push({ "id": data[i].moduleId, "name": data[i].moduleName });
			}
			str += "</div>";
		}
		if (str.length > 0) {

			$('#div_modules_box').html(str);
			$('#div_modules_super').show();
			fetchCorpModulesService();
		}

	}
}

function fetchCorpModulesServiceAfter(response){
	if(response.error == false && response.object != null){
		var data = response.object;
		if(data != null && data.length > 0){
			for(var i=0;i<data.length;i++){
				moduleslist.map(function (a) {
					if (a.id == data[i].moduleId && data[i].status == 1) {
						$("#chk_admin_modules_"+a.id).prop("checked", true);
					}
    			});
			}
		}
	}
	getMaxPollService();
}

function saveCorpModulesServiceAfter(response){
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_requestprocessed, confirm_Success, 5000, "", false, false);
		if($("#chk_admin_modules_9").is(":checked")){
			$("#poll_update_div").show();
		}else{
			$("#poll_update_div").hide();
		}
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}



function adminUpdateLogoServiceAfter(response){
	if(response.error == false && response.object != null && localStorage._zw == selectedcorpid){
		const random = Math.random() * 100000;
		$("#clogoimg").attr("src", cloudApiUrlACMS+"/"+response.object+"?v="+random);
		localStorage._zl = response.object;
	}
}

function adminReopenDataroomServiceAfter(response) {
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_dataroom_restored, confirm_Success, 5000, "", false, false);
		adminfetchCorporateDetailsService();
	}
}

function adminCheckArchivedFolderServiceAfter(response){
	var timeout = 10;
	if(response.error == false && response.object == true){
		adminShowconfirmmsg(admin_Messages.admin_dataroom_closure_archived_folder, confirm_Info, 5000, "", false, false);
		timeout = 5000;
	}
	hideActionPopup("dataroomclosuremodal");

	setTimeout(function(){
		adminProcessDataroomClosureService();
	}, timeout);
}

function fetchLiveUsersServiceAfter(response){
	totalLiveUser = 0;
	displaycounter = 0;
	$("#table_liveUser").empty();
	$("#live_user_table_div_").show();
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
}
function adminCheckPersonal() {
	if (personalactive) {
		$(".spdm_personal_header").css("display", "block");
		$(".spdm_personal_row").css("display", "block");
		$(".spdm_more_class").css("padding-left", "0px");
		$(".spdm_dropdown_class").css("padding-left", "0px");
	} else {
		$(".spdm_personal_header").css("display", "none");
		$(".spdm_personal_row").css("display", "none");
		$(".spdm_more_class").css("padding-left", "100px");
		$(".spdm_dropdown_class").css("padding-left", "130px");
	}
}

function archiveDataroomServiceAfter(response){
	if(response.error == false && response.object != null){
		if(response.object == true){
			adminShowconfirmmsg("Request processed successfully.", confirm_Success, 5000, "", false, false);
			$("#btn_admin_archive_dataroom").html("Retrive dataroom");
			$("#btn_admin_archive_dataroom").prop('disabled', false);
		}else{
			adminShowconfirmmsg("Request can't processed.", confirm_Error, 5000, "", false, false);
		}
	}
}

function checkNormalFolderExistsServiceAfter(response){
	$("#btn_admin_archive_dataroom").html("");
	$("#btn_admin_archive_dataroom").hide();
	if(response.error == false && response.object != null){
		if(response.object == "E"){
			$("#btn_admin_archive_dataroom").html("Archival in progress");
			$("#btn_admin_archive_dataroom").prop('disabled', true);
			$("#btn_admin_archive_dataroom").show();
		}else if(response.object == "H"){
			$("#btn_admin_archive_dataroom").html("Retrive dataroom");
			$("#btn_admin_archive_dataroom").prop('disabled', false);
			$("#btn_admin_archive_dataroom").show();
		}else if(response.object == "A"){
			$("#btn_admin_archive_dataroom").html("Archive dataroom");
			$("#btn_admin_archive_dataroom").prop('disabled', false);
			$("#btn_admin_archive_dataroom").show();
		}else if(response.object == "Q"){
			$("#btn_admin_archive_dataroom").html("Retrival in progress");
			$("#btn_admin_archive_dataroom").prop('disabled', true);
			$("#btn_admin_archive_dataroom").show();
		}else if(response.object == ""){
			$("#btn_admin_archive_dataroom").hide();
		}
	}else{
		$("#btn_admin_archive_dataroom").hide();
	}
}

function retriveDataroomServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.object != null){
		if(response.object == true){
			adminShowconfirmmsg("Request processed successfully.", confirm_Success, 5000, "", false, false);
			$("#btn_admin_archive_dataroom").html("Retrival in progress");
			$("#btn_admin_archive_dataroom").prop('disabled', true);
		}else{
			adminShowconfirmmsg("Request can't processed.", confirm_Error, 5000, "", false, false);
		}
	}
}

function updateMaxPollServiceAfter(response){
	if(response.error == false && response.object != null){
		if(response.object == true){
			adminShowconfirmmsg("Request processed successfully.", confirm_Success, 5000, "", false, false);
		}else{
			adminShowconfirmmsg("Request can't processed.", confirm_Error, 5000, "", false, false);
		}
	}
}

function getMaxPollServiceAfter(response){
	if(response.error == false && response.object != null){
		if(response.object != null){
			var dto = response.object;
			$("#admin_input_max_poll").val(dto.maxPolls);
			$("#admin_input_max_agenda").val(dto.maxAgendas);
			$("#admin_input_max_voter").val(dto.maxVoters);
			if($("#chk_admin_modules_9").is(":checked")){
				$("#poll_update_div").show();
			}else{
				$("#poll_update_div").hide();
			}
		}else{
			adminShowconfirmmsg("Request can't processed.", confirm_Error, 5000, "", false, false);
		}
	}
}

function spdFetchIndexServiceAfter(response) {
	ajaxindicatorstop();
	$("#img_spadmsearchindex").removeClass("sidebarliimgactive");
	$("#spadmtraindoc").removeClass("sidebarliactive");
	$("#div_index_list").html("");
	var noindex = false;
	if(response.error == false && response.object != null){
		var data = response.object;
		if(data.length > 0){
			for(var i=0;i<data.length;i++){
				var createdDate = getlocaltimestampfromutcdata(handleNullValue(data[i].createdDate));
				createdDate = getdatefromtimestamp(createdDate, false, "EN-US");
				var status = (data[i].status=="A"?"Active":"Creating");
				var indexName = data[i].indexName;

				var datahtml = "<div class='col-md-12 col-sm-12 col-xs-12 tableHeadSec' style='margin-top: 10px; border: 1px solid #d3d3d3;'>";
				datahtml += "		<div class='col-md-12 col-sm-12 heading'>Index Details</div>";

				datahtml += "		<div class='col-md-2 col-sm-2 heading'>Name : </div>";
				datahtml += "		<div class='col-md-4 col-sm-4 heading' id='div_index_name_"+data[i].id+"'>"+indexName+"("+data[i].edition+")</div>";
				datahtml += "		<div class='col-md-2 col-sm-2 heading'>No Of Datarooms : </div>";
				datahtml += "		<div class='col-md-4 col-sm-4 heading' id='div_index_no_of_datarooms_"+data[i].id+"'>&nbsp;</div>";

				datahtml += "		<div class='col-md-2 col-sm-2 heading'>Documents Synced : </div>";
				datahtml += "		<div class='col-md-4 col-sm-4 heading' id='div_index_doc_synced_"+data[i].id+"'>"+data[i].documentsSynced+"</div>";
				datahtml += "		<div class='col-md-2 col-sm-2 heading'>Storage Consumed : </div>";
				datahtml += "		<div class='col-md-4 col-sm-4 heading' id='div_index_storage_"+data[i].id+"'>"+data[i].storageUsedStr+"</div>";

				datahtml += "		<div class='col-md-2 col-sm-2 heading'>Status : </div>";
				datahtml += "		<div class='col-md-4 col-sm-4 heading' id='div_index_status_"+data[i].id+"'>"+status+"</div>";
				datahtml += "		<div class='col-md-2 col-sm-2 heading'>Created Date : </div>";
				datahtml += "		<div class='col-md-4 col-sm-4 heading' id='div_index_created_"+data[i].id+"'>"+createdDate+"</div>";

				datahtml += "		<div class='col-md-4 col-sm-4 heading' style='margin-top:15px;'>";
				datahtml += "			<button class='btn btn-primary' style='background-color:#23bbf3 !important;outline:#23c2bd;margin-bottom:3px;' id='btn_adddataroomtoindex_"+data[i].id+"'  data-index-name='"+indexName+"' data-index-id='"+data[i].indexId+"' data-id='"+data[i].id+"'>Add Corporate</button>";
				datahtml += "		</div>";
				datahtml += "		<div class='col-md-8 col-sm-8 heading'>&nbsp;";
				datahtml += "			<button class='btn btn-primary' style='background-color:#23bbf3 !important;outline:#23c2bd;margin-bottom:3px;display:none;' id='btn_delete_index_"+data[i].id+"'>Delete Index</button>";
				datahtml += "		</div>";
				datahtml += "		<div class='col-md-12 col-sm-12 col-xs-12 tableHeadSec' style='margin-top: 10px; border: 1px solid #d3d3d3;'>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>Corporate Id</div>";
				datahtml += "			<div class='col-md-3 col-sm-3 heading'>Company Name</div>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>Created Date</div>";
				datahtml += "			<div class='col-md-1 col-sm-1 heading'>Status</div>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>&nbsp;</div>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>&nbsp;</div>";
				datahtml += "		</div>";
				datahtml += "		<div class='col-md-12 col-sm-12 col-xs-12' style='padding-left: 0px; padding-right: 5px;' id='div_index_data_source_list_"+data[i].id+"'>";
				datahtml += "		</div>";
				datahtml += "	</div>";
				$("#div_index_list").append(datahtml);
				spdIndexMultipleIndexEvents(data[i].id);
				spdFetchdataSourceService(indexName, data[i].id);
			}
		} else {
			noindex = true;
		}
	} else {
		noindex = true;
	}

	if(noindex){
		var datahtml = "<div class='col-md-12 col-sm-12 col-xs-12 tableHeadSec' style='margin-top: 10px; border: 1px solid #d3d3d3;'>";
		datahtml += "		<div class='col-md-12 col-sm-12 heading'>No Search Indexes Found</div>";
		datahtml += "	</div>";
		$("#div_index_list").html(datahtml);
	}
	ajaxindicatorstop();
}

function spdFetchdataSourceServiceAfter(response){
	ajaxindicatorstop();
	var nodatasource = false;
	var indexId = response.extrajsonparam.indexId;
	$("#div_index_data_source_list_"+indexId).html("");
	if(response.error == false && response.object != null){
		var data = response.object;
		if(data.length > 0){
			var noofdatarooms = 0;
			for(var i=0;i<data.length;i++){
				var createdDate = getlocaltimestampfromutcdata(handleNullValue(data[i].createdDate));
				createdDate = getdatefromtimestamp(createdDate, false, "EN-US");
				var status = data[i].status;
				if(data[i].status=="A"){
					status = "Active";
				} else if(data[i].status=="P"){
					status = "Creating";
				} else if(data[i].status=="S"){
					status = "Syncing";
				} else if(data[i].status=="D"){
					status = "Deleting";
				}
				var indexName = data[i].indexName;

				var datasourceid = data[i].id;
				var datahtml = "<div class='col-md-12 col-sm-12 col-xs-12 ' style='padding-left:0px;padding-right:5px;'>";
				datahtml += "		<div class='tablebodySec nopaddingLR' id='pending_Tab' style='overflow:auto;border:1px solid #d3d3d3;'>";
				datahtml += "			<div class='col-md-12 col-sm-12 col-xs-12  single'>";
				datahtml += "			<div class='col-md-2 col-sm-2 indexcorporates'>"+data[i].lawFirmNumber+"</div>";
				datahtml += "			<div class='col-md-3 col-sm-3'>"+data[i].companyName+"</div>";
				datahtml += "			<div class='col-md-2 col-sm-2'>"+createdDate+"</div>";
				datahtml += "			<div class='col-md-1 col-sm-1'>"+status+"</div>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>";
				datahtml += "				<button class='btn btn-primary' style='background-color:#23bbf3 !important;outline:#23c2bd;margin-bottom:3px;' id='btn_sync_now_"+datasourceid+"' data-lawfirm='"+data[i].lawFirmNumber+"' data-index-id='"+indexId+"' data-index-name='"+indexName+"'>Sync Now</button>";
				datahtml += "			</div>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>";
				datahtml += "				<button class='btn btn-primary' style='background-color:#23bbf3 !important;outline:#23c2bd;margin-bottom:3px;' id='btn_remove_dataroom_"+datasourceid+"' data-lawfirm='"+data[i].lawFirmNumber+"' data-index-id='"+indexId+"' data-index-name='"+indexName+"'>Delete</button>";
				datahtml += "			</div>";
				datahtml += "			<div class='col-md-2 col-sm-2 heading'>";
				datahtml += "				<button class='btn btn-primary' style='background-color:#23bbf3 !important;outline:#23c2bd;margin-bottom:3px;' id='btn_delete_dataroom_"+datasourceid+"' data-lawfirm='"+data[i].lawFirmNumber+"' data-index-id='"+indexId+"' data-index-name='"+indexName+"'>Delete</button>";
				datahtml += "			</div>";
				datahtml += "		</div>";
				datahtml += "	</div>";
				datahtml += "</div>";
				$("#div_index_data_source_list_"+indexId).append(datahtml);
				if(data[i].status=="A"){
					$("#btn_sync_now_"+datasourceid).show();
					$("#btn_remove_dataroom_"+datasourceid).show();
					$("#btn_delete_dataroom_" + datasourceid).hide();
				} else if (data[i].status == "P") {
					$("#btn_sync_now_" + datasourceid).hide();
					$("#btn_remove_dataroom_"+datasourceid).hide();
					$("#btn_delete_dataroom_" + datasourceid).show();
				} else {
					$("#btn_sync_now_"+datasourceid).hide();
					$("#btn_remove_dataroom_"+datasourceid).hide();
					$("#btn_delete_dataroom_" + datasourceid).hide();
				}
				spdIndexDataSourceEvents(data[i].id);
				$("#div_index_no_of_datarooms_"+indexId).html(++noofdatarooms);
			}
		} else {
			nodatasource = true;
		}
	} else {
		nodatasource = true;
	}

	if(nodatasource){
		var datahtml = "<div class='col-md-12 col-sm-12 col-xs-12 tableHeadSec' style='margin-top: 10px; border: 1px solid #d3d3d3;'>";
		datahtml += "		<div class='col-md-12 col-sm-12 heading'>No Corporates Associated With Search Index</div>";
		datahtml += "	</div>";
		$("#div_index_data_source_list_"+indexId).html(datahtml);
	}
}

function spdAddIndexDataSourceServiceAfter(response) {
	hideActionPopup("div_search_index_add_corporate");
	ajaxindicatorstop();
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_corpaddindex, confirm_Info, 5000, "", false, false);
		spdFetchdataSourceService(response.extrajsonparam.indexName, response.extrajsonparam.id);
	} else if(response.message=="INVALIDCORPORATE"){
		adminShowconfirmmsg(admin_Messages.admin_corpdoesnotexist, confirm_Error, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function spdDeleteIndexDataSourceServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_corpdeleteindexprocess, confirm_Info, 5000, "", false, false);
		spdFetchdataSourceService(response.extrajsonparam.indexName, response.extrajsonparam.id);
	}else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function spdRemoveIndexDataSourceServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_corpdeleteindexprocess, confirm_Info, 5000, "", false, false);
		spdFetchdataSourceService(response.extrajsonparam.indexName, response.extrajsonparam.id);
	}else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function spdSyncIndexDataSourceServiceAfter(response) {
	ajaxindicatorstop();
	if(response.error == false && response.object != null){
		adminShowconfirmmsg(admin_Messages.admin_corpsyncindexprocess, confirm_Info, 5000, "", false, false);
		spdFetchdataSourceService(response.extrajsonparam.indexName, response.extrajsonparam.id);
	}else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function spdFetchAutoAITagsServiceAfter(response) {
	ajaxindicatorstop();
	$("#spdtaglist").empty();
	if(response.error == false && response.object != null){
		$('#notagsfound').hide();
		var data = tagsaisort(response.object, "ASC");
		var j = 0;
		for(var i=0;i<data.length;i++){
			var datahtml = "";
			if((j++)> 0) datahtml += "<hr id='metadata_hr_row_"+data[i].id+"' class='filesonlyrow_hr metadatList' style='margin-top:0px;margin-bottom:0px;width:100%;float:left;border-top:1px solid #ccc;'>";
			datahtml += "<div class='row' id='div_metadata_row_"+data[i].id+"' style='width:100%'>";
			datahtml += "	<div class='col-md-10' style='cursor:pointer;margin-left:5px;'>";
			datahtml += "		<h2 style='margin-top:0px;'>";
			datahtml += "			<a href='javascript:void(0);' style='font-size:16px;font-weight:400;' class='noclick'>";
			datahtml += "				<span style='font-size:16px;word-break: break-word;' class='metaname' id='metadata_"+data[i].id+"'>"+data[i].name+"</span>";
			datahtml += "			</a>";
			datahtml += "		</h2>";
			datahtml += "	</div>";
			datahtml += "	<div class='col-md-1'>";
			if(localStorage._zp == "1"){
				datahtml += "	<i id='icon_auto_tags_delete_"+data[i].id+"' data-id='"+data[i].id+"' class='fa fa-trash font-18 cursor-pointer' title='Delete' style='color:blue;margin-top:10px;'></i>";
			}
			datahtml += "	</div>";
			datahtml += "</div>";
			$("#spdtaglist").append(datahtml);
			spdAutoAiTagsMultiEvents(data[i].id);
		}
	}else {
		$('#notagsfound').show();
	}
}

function spdDeleteAutoAITagsServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.object == true){
		adminShowconfirmmsg(admin_Messages.admin_tagdeleted, confirm_Success, 5000, "", false, false);
		spdFetchAutoAITagsService();
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function spdSaveAutoAITagsDataroomsServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.object == true){
		adminShowconfirmmsg(admin_Messages.admin_tagsavedallcorp, confirm_Success, 5000, "", false, false);
	} else {
		adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
	}
}

function updateCorppaymentInfoServiceAfter(response){
	if(response.error == false && response.object != null){
		if(response.object == true){
			adminShowconfirmmsg(admin_Messages.admin_request_processed, confirm_Success, 5000, "", false, false);
		}else{
			adminShowconfirmmsg(admin_Messages.admin_request_cant_processed, confirm_Error, 5000, "", false, false);
		}
	}
}














