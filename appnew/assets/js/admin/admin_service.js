//Tanmay User
function adminFetchUserList(exp){
	if(displaycounter == -1) {
		ajaxindicatorstart('fetching user list..');
		var type = "GET";
		$("#table_manageuser").empty();
		var extraparamjson = {"export":exp};
		var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/"+localStorage._zw+"/displayUserListDataRowsDB";
		invokeAdapterCallFromAdmin(type,posturl,"","",extraparamjson);

		admSingleUserProfileService();
		adminOTPSettingsService();
		adminFetch2factorAuthService();
	} else {
		displayUserListDataRowsDBUI(displaycounter);
	}
}

function savePasswordService(userid, password){
	ajaxindicatorstart('reseting password.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/resetpassword";
	var sm = {
			 "lawFirmId" : localStorage._zw,
			 "userId" : userid,
			 "newPassword" : password,
			 "action" : "savePasswordServiceAfter"
			};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
}

function adminDeleteUserService(userid, idm, isRetainData) {
	ajaxindicatorstart('deleting user.. please wait..');
	var type = "POST";
	var posturl = "";
	if(isRetainData)
		posturl = cloudApiUrlACMS+"/v1/app/user/0/suspend/delete/RETAIN";
	else
		posturl = cloudApiUrlACMS+"/v1/app/user/0/suspend/delete/NOTRETAIN";
	var sm = {
		"id":userid,
		"lawFirmId":localStorage._zw,
		"action":"adminDeleteUserServiceAfter"
	};
	var extraparamjson = {"rowindex":idm};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
}

function adminDisableUserService(userid, idm) {
	ajaxindicatorstart('blocking user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/suspend";
	var sm = {
				"id":userid,
				"lawFirmId":localStorage._zw,
				"action":"adminDisableUserServiceAfter"
	};
	var extraparamjson = {"rowindex":idm};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
}

function adminEnableUserService(userid, idm) {
	ajaxindicatorstart('unblocking user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/reactivate";
	var sm = {
				"id":userid,
				"lawFirmId":localStorage._zw,
				"action":"adminEnableUserServiceAfter"
	};
	var extraparamjson = {"rowindex":idm};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
}

function admSingleUserProfileService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminSingleUserProfileServiceAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
	if(adminsessioncheckstarted == false){
		adminsessioncheckstarted = true;
		adminStorageCheckSessionService();
	}
}

function getBasicUserDetails() {
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/masterdata/" + localStorage._zw + "/setBasicUserDetails";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminAddUserService(){
	var sm = addUserBuildJSON();
	ajaxindicatorstart('adding user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/add";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
}

function adminUpdateUserService(){
	var sm = addUserBuildJSON();
	ajaxindicatorstart('updating user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/update";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
	if(userimgbase64 !=""){
		var jsonInput = "{\"id\":\"" + document.getElementById("adduser").getAttribute("data-contact-id") + "\"";
				jsonInput += ",\"picture\":\"" + userimgbase64 + "\"}";
		adminUpdateUserPicture(JSON.parse(jsonInput));
		prvuserimg = "";
	}
}

function adminPopulateUserDetailsService(userId) {
	ajaxindicatorstart('fetching user details.. please wait..');
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/" + localStorage._zw + "/" + userId + "/adminPopulateUserDetailsServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

//Tukuna Corporate
function adminfetchCorporateDetailsService(){
	resetClientData();
	var type = admin_Messages.admin_getMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/lawfirm/0/" + localStorage._zw + "/adminfetchCorporateDetailsServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
	adminCheckDataroomClosureService();
}

function adminFetch2factorAuthService(){
	var type = admin_Messages.admin_getMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/lawfirm/0/" + localStorage._zw + "/adminFetch2factorAuthServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function fetchDisclaimerTypes(disid){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/disclaimer/0/get/alltypes";
	var json = {"action": "fetchDisclaimerTypesAfter"};
	var extraparamjson = {"disid":disid};
	invokeAdapterCallFromAdmin(type, posturl, "", json, extraparamjson);
}

function fetchDisclaimerDetails(){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/disclaimer/0/fetch";
	var json = {"action": "fetchDisclaimerDetailsAfter"};
	invokeAdapterCallFromAdmin(type, posturl, "", json, "");
}

function fetchRegionList(selid) {
	var type = admin_Messages.admin_getMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/gets3regions/0/fetchRegionListData";
	var extraparamjson = {"selid":selid};
	invokeAdapterCallFromAdmin(type, posturl, "", "", extraparamjson);
}

function adminSaveClientService(){
	var params = adminSaveCorporateInfoJSON();
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/lawfirm/0/update";
	invokeAdapterCallFromAdmin(type, posturl, "", params, "");
}

function updateDisclaimerDetailsService(params){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/disclaimer/0/update";
	invokeAdapterCallFromAdmin(type, posturl, "", params, "");
}

function addDisclaimerDetailsService(params){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/disclaimer/0/add";
	invokeAdapterCallFromAdmin(type, posturl, "", params, "");
}

//Tukuna Pending device
function adminfetchPenidingDeviceService(){
	$("#pending_Tab").empty();
	var type = "GET";
	var posturl = cloudApiUrlACMS +"/v1/app/device/0/pending/"+localStorage._zw+"/adminfetchPenidingDeviceServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"","","");
}

//Tanmay blocked device
function adminfetchBlockedDeviceService(){
	$("#blocked_Tab").empty();
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/device/0/blocked/"+localStorage._zw+"/adminfetchBlockedDeviceServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"","","");
}

//Tukuna Approved device
function adminfetchApprovedDeviceService(){
	$("#approved_tab").empty();
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/device/0/approved/"+localStorage._zw+"/adminfetchApprovedDeviceServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"","","");
}

//Tanmay blocked device
function adminblockdeviceservice(deviceid, typeaction){
	ajaxindicatorstart('blocking device.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/device/0/block";
	var sm = {
			"lawFirmId":localStorage._zw,
			"id":deviceid,
			"action":"adminblockdeviceserviceafter",
			"comment":$("#admin_block_cmt").val().trim()
	};
	var extraparamjson = {"type":typeaction};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
	hideActionPopup("blockdivccont");
}

function admindeletedeviceservice(deviceid, typeaction) {
	ajaxindicatorstart('deleteing device.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/device/0/delete";
	var sm = {
			"lawFirmId":localStorage._zw,
			"id":deviceid,
			"comment":"Deleted",
			"action":"admindeletedeviceserviceafter"
	};
	var extraparamjson = {"type":typeaction};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
	hideActionPopup("delete_divc_cont");
}

function adminapprovedeviceService(deviceid, typeaction, text){
	ajaxindicatorstart('approving device.. please wait..');
	var startDate = $("#admin_approve_start_date").val();
	var endDate = $("#admin_approve_end_date").val();
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/device/0/approve";
	var sm = {
		"lawFirmId":localStorage._zw,
		"id":deviceid,
		"action":"adminapprovedeviceServiceAfter",
		"startDate":FormatDateToServer(startDate),
		"endDate":FormatDateToServer(endDate),
		"comment":text + " " + $("#admin_approve_cmt").val().trim()
	};
	var extraparamjson = {"type":typeaction};
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
	hideActionPopup("unblockdivccont");
}

function adminUpdateUserPicture(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contactimgupd/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminUpdateUserPictureAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

/**
 * method to fetch device rule ip data from the cloud
 */
function adminFetchDeviceIPData() {
	ajaxindicatorstart('fetching approved ip address list.. please wait..');
	$("#diviplist").empty();
	lastipindex = 0;
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/autoip/0/"+localStorage._zw+"/adminFetchDeviceIPDataAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

/**
 * autosave IP address details to the cloud
 * @param	:	ipAddress
 * @param	:	idm
 *
 */
function adminAutoSaveDeviceRuleIP(ipAddress) {
	ajaxindicatorstart('saving approved ip address.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/autoip/0/add";
	var params = {
		"lawFirmId" : localStorage._zw,
		"ipaddress" : ipAddress,
		"action" : "adminAutoSaveDeviceRuleIPAfter",
		"type" : "type"
	};

	invokeAdapterCallFromAdmin(type, posturl, "", params, "");
}

/**
 * method to delete device rule IP details
 * @param	:	elem
 * @param	:	deleteId
 */
function adminDeleteDeviceRuleIP(deleteId) {
	ajaxindicatorstart('deleting approved ip address.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/autoip/0/"+localStorage._zw+"/"+deleteId+"/adminDeleteDeviceRuleIPAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

/***
*  method to search admin  pending deviec details
*/
function adminPendingDeviceSearchDetails(){
	var jsoninput = adminDeviceSearchBuildJSON();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/devicesearch/0/pending/adminfetchPenidingDeviceServiceAfter";
	var extraParam = {"search":"true"};
	invokeAdapterCallFromAdmin(type, posturl, "", jsoninput, "");

}

/***
*  method to search admin  block deviec details
*/
function adminSearchBlockDetails(){
	var jsoninput = adminDeviceSearchBuildJSON();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/devicesearch/0/blocked/adminfetchBlockedDeviceServiceAfter";
	var extraParam = {"search":"true"};
	invokeAdapterCallFromAdmin(type, posturl, "", jsoninput, "");

}
/***
*  method to search admin  Approve deviec details
*/
function adminApproveDetails(){
	var jsoninput = adminDeviceSearchBuildJSON();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/devicesearch/0/approved/adminfetchApprovedDeviceServiceAfter";
	var extraParam = {"search":"true"};
	invokeAdapterCallFromAdmin(type, posturl, "", jsoninput, "");

}

function adminSingleUserProfileService(isshow){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";;
	posturl = posturl.replace("<ACTION>", "adminSingleUserProfileServiceNewAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminFetchStorageLeftService(openfile){
	var jsonInput = {"attribute1":"1"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/fetchstoragespace/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminFetchStorageLeftServiceAfter");
	var extraparamjson = {"openfile":openfile};
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function adminSaveUserProfileService(jsonInput){
	ajaxindicatorstart('saving profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contactupdate/0/contactname/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminSaveUserProfileServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateUserPicture(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contactimgupd/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminUpdateUserPictureAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminAddUserPhone(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+adminSaveUserPhoneURL;
	posturl = posturl.replace("<ACTION>", "adminaddUserPhoneAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateUserPhone(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+adminSaveUserPhoneURL;
	posturl = posturl.replace("<ACTION>", "adminUpdateUserPhoneAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminAddUserFax(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+adminAddUserFaxURL;
	posturl = posturl.replace("<ACTION>", "adminAddUserFaxAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateUserFax(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+adminSaveUserFaxURL;
	posturl = posturl.replace("<ACTION>", "adminUpdateUserFaxAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminSendReactivationMail(loginid, idm){
	ajaxindicatorstart('sending activation mail.. please wait..');
	var extraParam = {"idm":idm};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/add/userreactvmail/adminSendReactivationMailAfter";
	var params = {
		"loginId" : loginid,
		"lawFirmId" : localStorage._zw
	};
	invokeAdapterCallFromAdmin(type, posturl, "", params, extraParam);
}

function adminUpdateExpiryDateService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/updexp/adminUpdateExpiryDateServiceAfter";
	currentservicemethodafter = "adminUpdateExpiryDateServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateTotalStorageService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/updtstg/adminUpdateStorageServiceAfter";
	currentservicemethodafter = "adminUpdateStorageServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateTotalUsersService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/updtusr/adminUpdateUsersServiceAfter";
	currentservicemethodafter = "adminUpdateUsersServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}
//logo
function adminUpdateLogoService(){
	var jsonInput = {
		"attribute1":"adminUpdateLogoServiceAfter",
		"attribute2":logoimgbase64,
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/lawfirm/0/updatelogo";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminStorageCheckSessionService(){
	//setInterval(function (){
		//if(adminsessioncheckcalled == false){
			adminsessioncheckcalled = true;
			var jsonInput = {"attribute1":"1"};
			var type = updateMethod;
			var posturl = cloudApiUrlACMS+"/v1/app/userlogout/0/schk/<ACTION>";
			posturl = posturl.replace("<ACTION>", "adminStorageCheckSessionServiceAfter");
			invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
		//}
	//}, 300000);
}

function adminOTPSettingsService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/ots/0/fts/<OTPID>/<LAWFIRMID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "admOTPSettingsServiceAfter");
	posturl = posturl.replace("<OTPID>", 0);
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminSaveOTPRecordService(){
	var carrier = "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"-"+$("#mmobilenumber").val();
	var jsonInput = {"otpId":adminotpId,"userId":localStorage._zv,"status":"A","carrieIdentifier":carrier};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/uts/0/update/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminSaveOTPRecordServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminProcessDataroomClosureService() {
	var jsonInput = adminProcessDataroomClosure();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/dataroom/0/archival/init/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminProcessDataroomClosureServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateDataroomClosureService() {
	var jsonInput = adminProcessDataroomClosure();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/dataroom/0/archival/update/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminProcessDataroomClosureServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminCheckDataroomClosureService() {
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/dataroom/0/archival/fetch/status/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminCheckDataroomClosureServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminFetchDataroomClosureService() {
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/dataroom/0/archival/fetch/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminFetchDataroomClosureServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminDeleteDataroomClosureService() {
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/dataroom/0/archival/delete/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminDeleteDataroomClosureServiceAfter");
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function logOutService(){
	ajaxindicatorstart('please wait..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/userlogout/0/logOutServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminAddmultipleUserService() {
	/*var type = updateMethod;
	var posturl = cloudApiUrlACMS + "/v1/app/user/0/add/import/users";
	var formData = new FormData();
	formData.append("file", currentuserfile, currentuserfile.name);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', posturl, true);
	xhr.timeout = 600000;
	xhr.setRequestHeader("Authorization", "Bearer " + getauthtokenfromlocal());
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status == 201) {
				hideActionPopup("multiUserCreationModal");
				$("#btnuserfilechoose").val("");
				var obj = JSON.parse(xhr.response);
				if ((obj.message.length > 0) && (obj.error == true)) {
					adminShowconfirmmsg(obj.message, confirm_Success, 5000, "", false, false);
					ajaxindicatorstop();
				} else {
					adminShowconfirmmsg(admin_Messages.admin_user_add, confirm_Success, 5000, "", false, false);
					$("#btrefresh").click();
				}
			} else {
				ajaxindicatorstop();
				adminShowconfirmmsg(admin_Messages.admin_user_notadding, confirm_Error, 5000, "", false, false);
				$("#btnuserfilechoose").val("");
			}
		}
	};
	xhr.send(formData);*/
	var ext = currentuserfile.name.substring(currentuserfile.name.lastIndexOf(".")+1);
	if(ext.toLowerCase() == "csv"){
		ajaxindicatorstart('please wait..importing users...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS + "/v1/app/user/0/add/import/users";

		var bs = getauthtokenfromlocal();
		const a = document.createElement('a');
		a.style = 'display: none';
		document.body.appendChild(a);

		var formData = new FormData();
		formData.append("file", currentuserfile, currentuserfile.name);

		var xhr = new XMLHttpRequest();
		xhr.open(type, posturl, true);
		xhr.responseType = "blob";
		xhr.setRequestHeader("Authorization",  "Bearer " + bs);
		xhr.onreadystatechange = function (){
			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					hideActionPopup("multiUserCreationModal");
					$("#btnuserfilechoose").val("");
					ajaxindicatorstop();
					var filename = getFileNameFromDispositioon(xhr.getResponseHeader('Content-Disposition'));
					var blob = xhr.response;
					if (navigator.msSaveBlob) {
					  return navigator.msSaveBlob(blob, filename);
					}

					const url = URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					a.click();
					URL.revokeObjectURL(url);
					adminShowconfirmmsg(admin_Messages.admin_user_add, confirm_Info, 5000, "", false, false);
					$("#btrefresh").click();
				} else {
					ajaxindicatorstop();
					adminShowconfirmmsg(admin_Messages.admin_user_notadding, confirm_Error, 5000, "", false, false);
					$("#btnuserfilechoose").val("");
				}
			}
		};
		xhr.send(formData);
	} else {
		adminShowconfirmmsg("Please upload csv file format only.", confirm_Error, 5000, "", false, false);
	}
}

function fetchMetadataMasterService(){
	var type = updateMethod;
	var jsonInput = {"attribute1":"fetchMetadataMasterServiceAfter"};
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/0/master/fetch";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function deleteMetadataMasterService(id){
	var type = updateMethod;
	var jsonInput = {
		"attribute1":"deleteMetadataMasterServiceAfter",
		"attribute2":id
	};
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/0/master/delete";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function addMetadataMasterService(){
	var type = updateMethod;
	var metadataKey = document.getElementById("metadata_key").value;
	if(metadataCount < 30){
		if(metaDataList.indexOf(metadataKey)>-1){
			adminShowconfirmmsg("Metadata key is already exist.", confirm_Error, 5000, "", false, false);
		}else{
			if(metadataKey.length <= 30 && metadataKey.length > 0){
				var jsonInput = {
					"attribute1":"addMetadataMasterServiceAfter",
					"attribute2":metadataKey
				};
				var posturl = cloudApiUrlACMS+"/v1/app/metatdata/0/master/add";
				invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
			}
		}
	}else{
		adminShowconfirmmsg("Metadata list full,Please delete some metadata to enter new metadata.", confirm_Error, 5000, "", false, false);
	}
	
}

function fetchLiveUsersService(){
	ajaxindicatorstart('fetching users.. please wait..');
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/live/"+localStorage._zw+"/fetchLiveUsersServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

