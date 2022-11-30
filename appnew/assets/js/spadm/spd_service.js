function adminFetchCorporateList(){
	ajaxindicatorstart('fetching corporate list..');
	var type = "POST";
	$("#table_managecorp").empty();
	var sm = {
				 "attribute1" : timezone
			};
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/lawfirmlist/adminFetchCorporateListAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
	//currentservicemethodafter = "adminFetchCorporateListAfter";
	selectedcorpnumber = localStorage._zu;
	$("#mg_header_caption").html("Selected corporate : " + selectedcorpnumber);

	admOTPSettingsService(localStorage._zw);
}

//Tanmay User
function adminFetchUserList(exp){
	if(displaycounter == -1) {
		ajaxindicatorstart('fetching user list..');
		var type = "POST";
		$("#table_manageuser").empty();
		var extraparamjson = {"export":exp};
		var sm = {"attribute1":selectedcorpnumber};
		var posturl = cloudApiUrlACMS+"/v1/app/spc/0/userlist/displayUserListDataRowsDB";
		currentservicemethodafter = "displayUserListDataRowsDB";
		invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
		//admSingleUserProfileService();
	} else {
		displayUserListDataRowsDBUI(displaycounter);
	}
}

function savePasswordService(userid, password){
	ajaxindicatorstart('reseting password.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/resetPassword/atc";
	var sm = {
			 "lawFirmId" : selectedcorpid,
			 "userId" : userid,
			 "newPassword" : password,
			 "action" : "savePasswordServiceAfter"
			};
	currentservicemethodafter = "savePasswordServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
}

function adminDeleteUserService(userid, idm) {
	ajaxindicatorstart('deleting user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/deleteUserById/atc";
	var sm = {
		"id":userid,
		"lawFirmId":selectedcorpid,
		"action":"adminDeleteUserServiceAfter"
	};
	var extraparamjson = {"rowindex":idm};
	currentservicemethodafter = "adminDeleteUserServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
}

function adminDisableUserService(userid, idm) {
	ajaxindicatorstart('blocking user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/blockuser/atc";
	var sm = {
				"id":userid,
				"lawFirmId":selectedcorpid,
				"action":"adminDisableUserServiceAfter/atc"
	};
	var extraparamjson = {"rowindex":idm};
	currentservicemethodafter = "adminDisableUserServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
}

function adminEnableUserService(userid, idm) {
	ajaxindicatorstart('unblocking user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/unblockuser/atc";
	var sm = {
				"id":userid,
				"lawFirmId":selectedcorpid,
				"action":"adminEnableUserServiceAfter"
	};
	var extraparamjson = {"rowindex":idm};
	currentservicemethodafter = "adminEnableUserServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,extraparamjson);
}

function admSingleUserProfileService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "adminSingleUserProfileServiceAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
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
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/adduser/adminAddUserServiceAfter";
	currentservicemethodafter = "adminAddUserServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
}

function adminUpdateUserService(){
	var sm = addUserBuildJSON();
	ajaxindicatorstart('updating user.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/updateuserdetailbyid/adminAddUserServiceAfter";
	currentservicemethodafter = "adminAddUserServiceAfter";
	invokeAdapterCallFromAdmin(type,posturl,"",sm,"");
}

function adminPopulateUserDetailsService(userId) {
	var sm = {"attribute1":selectedcorpnumber,"attribute2":userId};
	ajaxindicatorstart('fetching user details.. please wait..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/userdetailbyid/adminPopulateUserDetailsServiceAfter";
	currentservicemethodafter = "adminPopulateUserDetailsServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", sm, "");
}

//Tukuna Corporate
function adminfetchCorporateDetailsService(){
	resetClientData();
	var type = "POST";
	var sm = {"attribute1":selectedcorpnumber,"attribute2":timeZone};
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/lawfirmbyid/adminfetchCorporateDetailsServiceAfter";
	currentservicemethodafter = "adminfetchCorporateDetailsServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", sm, "");
}

function fetchRegionList(selid) {
	var type = admin_Messages.admin_getMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/gets3regions/0/fetchRegionListData";
	var extraparamjson = {"selid":selid};
	invokeAdapterCallFromAdmin(type, posturl, "", "", extraparamjson);
}

function adminSaveClientService(){
	var params = adminSaveCorporateInfoJSON();
	var sm = {"id":selectedcorpid,"lawFirmDto":params};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/lawfirmsavebyid/atc";
	currentservicemethodafter = "adminSaveClientServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", sm, "");
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
	var minutes = 0;
	if($("#admin_approve_infinite").val() != "infinite"){
		minutes = minutes + parseFloat($("#admin_approve_infinite").val());
	}
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/device/0/approve";
	var sm = {
		"lawFirmId":localStorage._zw,
		"id":deviceid,
		"action":"adminapprovedeviceServiceAfter",
		"approvalDuration" : minutes,
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
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/reactivateusersendemail/adminSendReactivationMailAfter";
	currentservicemethodafter = "adminSendReactivationMailAfter";
	var params = {
		"lawFirmNumber":selectedcorpnumber,
		"userAddDto":{
			"loginId" : loginid,
			"lawFirmId" : selectedcorpid
		}
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

function adminCheckCorporateExistsService(jsonInput){
	var type = "POST";
	var r = cloudApiUrlACMS + "/v1/app/freeuser/0/register/adminCheckCorporateExistsServiceAfter",
	currentservicemethodafter = "adminCheckCorporateExistsServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function admincreateNewCorporateService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS + "/v1/app/spc/0/createlawfirm/admincreateNewCorporateServiceAfter",
	currentservicemethodafter = "admincreateNewCorporateServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function activateUserService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS + "/v1/app/spc/0/activateuser/activateUserServiceAfter",
	currentservicemethodafter = "activateUserServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function activateCorporateService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS + "/v1/app/spc/0/updtact/activateCorporateServiceAfter",
	currentservicemethodafter = "activateCorporateServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function admOTPSettingsService(coprid){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/ots/0/fts/<OTPID>/<LAWFIRMID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "admOTPSettingsServiceAfter");
	posturl = posturl.replace("<OTPID>", 0);
	posturl = posturl.replace("<LAWFIRMID>", coprid);
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function adminProcessDataroomClosureService() {
	var jsonInput = adminProcessDataroomClosure();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/archival/init/adminProcessDataroomClosureServiceAfter";
	currentservicemethodafter = "adminProcessDataroomClosureServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminCheckArchivedFolderService() {
	var jsonInput = {"attribute1":"adminCheckArchivedFolderServiceAfter", "attribute3":selectedcorpid};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/check/archived/folders/exists";
	currentservicemethodafter = "adminCheckArchivedFolderServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminUpdateDataroomClosureService() {
	var jsonInput = adminProcessDataroomClosure();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/archival/update/adminProcessDataroomClosureServiceAfter";
	currentservicemethodafter = "adminProcessDataroomClosureServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminCheckDataroomClosureService() {
	var jsonInput = {"attribute1":selectedcorpid};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/archival/fetch/status/adminCheckDataroomClosureServiceAfter";
	currentservicemethodafter = "adminCheckDataroomClosureServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminFetchDataroomClosureService() {
	var jsonInput = {"attribute1":selectedcorpid};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/archival/fetch/adminFetchDataroomClosureServiceAfter";
	currentservicemethodafter = "adminFetchDataroomClosureServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminDeleteDataroomClosureService() {
	var jsonInput = {"attribute1":selectedcorpid};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/archival/delete/adminDeleteDataroomClosureServiceAfter";
	currentservicemethodafter = "adminDeleteDataroomClosureServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminDeleteDataroomService(){
	var jsonInput = {"attribute1":selectedcorpid};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/dataroom/delete/init/adminDeleteDataroomServiceAfter";
	currentservicemethodafter = "adminDeleteDataroomServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function fetchs3regionsService(){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/fetch/s3regions";
	var json = {"attribute1": "fetchs3regionsServiceAfter"};
	invokeAdapterCall(type, posturl, "", json, "");
}

function adminAddmultipleUserService() {
	var ext = currentuserfile.name.substring(currentuserfile.name.lastIndexOf(".")+1);
	if(ext.toLowerCase() == "csv"){
		ajaxindicatorstart('please wait..importing users...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS + "/v1/app/spc/0/import/users/<LAWFIRMID>";
		posturl = posturl.replace("<LAWFIRMID>", selectedcorpid);

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

					var blob = xhr.response;
					if (navigator.msSaveBlob) {
					  return navigator.msSaveBlob(blob, "userimportstatus.csv");
					}

					const url = URL.createObjectURL(blob);
					a.href = url;
					a.download = "userimportstatus.csv";
					a.click();
					URL.revokeObjectURL(url);
					adminShowconfirmmsg(admin_Messages.admin_user_add, confirm_Success, 5000, "", false, false);
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

function fetchAllModulesService(){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/modules/fetch";
	var json = {"attribute1": "fetchAllModulesServiceAfter"};
	invokeAdapterCall(type, posturl, "", json, "");
}

function fetchCorpModulesService(){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/corp/modules/fetch";
	var json = {"attribute1":"fetchCorpModulesServiceAfter", "attribute2":selectedcorpid};
	invokeAdapterCall(type, posturl, "", json, "");
}

function saveCorpModulesService(json){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/corp/modules/add/update";
	invokeAdapterCall(type, posturl, "", json, "");
}

//logo
function adminUpdateLogoService(){
	var jsonInput = {
		"attribute1":"adminUpdateLogoServiceAfter",
		"attribute2":logoimgbase64,
		"attribute3" : selectedcorpid
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/logo/add/update";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function adminReopenDataroomService() {
	var jsonInput = {
		"attribute1":"adminReopenDataroomServiceAfter",
		"attribute2":selectedcorpid
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/dataroom/reopen";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function downloadReportService(reportType){
	ajaxindicatorstart('please wait downloaing report..');
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/download/0/reports";
	var jsonInput = {
		"attribute1":reportType,
		"attribute2":timeZone
	};
	var filename = "";
	if(reportType == "1"){
		filename = "Active_Dataroom_Report.xlsx";
	}else if(reportType == "2"){
		filename = "Inactive_Dataroom_Report.xlsx";
	}else if(reportType == "3"){
		filename = "All_Dataroom_Report.xlsx";
	}
	var bs = getauthtokenfromlocal();
	const a = document.createElement('a');
	a.style = 'display: none';
	document.body.appendChild(a);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', posturl, true);
	xhr.responseType = "blob";
	xhr.timeout = 0;
	xhr.setRequestHeader('Content-Type', 'application/json');
	//xhr.withCredentials = true;
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			if(xhr.status == 200){
				ajaxindicatorstop();
				var contentDisposition = xhr.getResponseHeader('Content-Disposition');
				var startIndex = contentDisposition.indexOf("filename=") + 9; // Adjust '+ 10' if filename is not the right one.
				var endIndex = contentDisposition.length; //Check if '- 1' is necessary
				//var filename = contentDisposition.substring(startIndex, endIndex);

				var blob = xhr.response;
				if (navigator.msSaveBlob) {
				  return navigator.msSaveBlob(blob, filename);
				}

				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = filename;
				a.click();
				URL.revokeObjectURL(url);
			} else {
				ajaxindicatorstop();
				admShowconfirmmsg("Request could not be sent successfully", confirm_Error, 5000, "", false, false);
			}
		}
	};
	xhr.send(JSON.stringify(jsonInput));
	xhrPool.push(xhr);
}

function fetchLiveUsersService(){
	ajaxindicatorstart('fetching users.. please wait..');
	var corpId = 0;
	if(selectedcorpid == -1)corpId = localStorage._zw;
	else corpId = selectedcorpid;
	var type = "GET";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/live/"+corpId+"/fetchLiveUsersServiceAfter";
	invokeAdapterCallFromAdmin(type, posturl, "", "", "");
}

function archiveDataroomService(){
	var jsonInput = {
		"attribute1":"archiveDataroomServiceAfter",
		"attribute2":selectedcorpid
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/archive/dataroom";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function checkNormalFolderExistsService(){
	var jsonInput = {
		"attribute1":"checkNormalFolderExistsServiceAfter",
		"attribute2":selectedcorpid
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/normal/folder/exists";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function retriveDataroomService(){
	ajaxindicatorstart('Retreving dataroom please wait..');
	var jsonInput = {
		"attribute1":"retriveDataroomServiceAfter",
		"attribute2":selectedcorpid
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/retrive/dataroom";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function updateMaxPollService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/update/max/poll";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function getMaxPollService(){
	var jsonInput = {
		"attribute1":"getMaxPollServiceAfter",
		"attribute2":selectedcorpid
	};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/get/max/poll";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function spdFetchIndexService() {
	ajaxindicatorstart('fetching data.. please wait..');
	var jsonInput = {"attribute1":"spdFetchIndexServiceAfter"};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/search/index";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function spdFetchdataSourceService(indexName, indexId) {
	ajaxindicatorstart('fetching data.. please wait..');
	var extraparamjson = {"indexId":indexId};
	var jsonInput = {"action":"spdFetchdataSourceServiceAfter","indexName":indexName};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/list/data/source";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function spdAddIndexDataSourceService(indexName, indexId, id){
	var extraparamjson = {"indexName":indexName,"id":id};
	var jsonInput = {"action":"spdAddIndexDataSourceServiceAfter","dataSourceIndexId":id,
		"indexId":indexId,"lawFirmNumber":$("#txt_index_corporateid").val().trim()};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/create/data/source";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function spdDeleteIndexDataSourceService(lawFirmNumber, indexName, id){
	var extraparamjson = {"indexName":indexName,"id":id};
	var jsonInput = {"action":"spdDeleteIndexDataSourceServiceAfter","lawFirmNumber":lawFirmNumber};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/delete/data/source";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function spdRemoveIndexDataSourceService(lawFirmNumber, indexName, id){
	var extraparamjson = {"indexName":indexName,"id":id};
	var jsonInput = {"action":"spdRemoveIndexDataSourceServiceAfter","lawFirmNumber":lawFirmNumber};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/delete/data";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function spdSyncIndexDataSourceService(lawFirmNumber, indexName, id){
	var extraparamjson = {"indexName":indexName,"id":id};
	var jsonInput = {"attribute1":"spdSyncIndexDataSourceServiceAfter","attribute2":lawFirmNumber};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/sync/data/source";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, extraparamjson);
}

function spdFetchAutoAITagsService(){
	ajaxindicatorstart('fetching data.. please wait..');
	var jsonInput = {"attribute1":"spdFetchAutoAITagsServiceAfter"};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/fetch/ai/tags";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function spdDeleteAutoAITagsService(id){
	var jsonInput = {"attribute1":"spdDeleteAutoAITagsServiceAfter","attribute3":id};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/delete/ai/tags";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function spdImportAutoAITags(currentuserfile) {
	var ext = currentuserfile.name.substring(currentuserfile.name.lastIndexOf(".")+1);
	if(ext.toLowerCase() == "csv"){
		ajaxindicatorstart('please wait..importing ai tags...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS + "/v1/app/spc/0/import/ai/tags";

		var bs = getauthtokenfromlocal();
		const a = document.createElement('a');
		a.style = 'display: none';
		document.body.appendChild(a);

		var formData = new FormData();
		formData.append("file", currentuserfile, currentuserfile.name);

		var xhr = new XMLHttpRequest();
		xhr.open(type, posturl, true);
		//xhr.responseType = "blob";
		xhr.setRequestHeader("Authorization",  "Bearer " + bs);
		xhr.onreadystatechange = function (){
			if (xhr.readyState === 4) {
				if (xhr.status == 202) {
					adminShowconfirmmsg(admin_Messages.admin_tagsimported, confirm_Success, 5000, "", false, false);
					$("#btn_refresh_tags").click();
				} else {
					ajaxindicatorstop();
					adminShowconfirmmsg(admin_Messages.admin_apiMessageEmptyDataMsg, confirm_Error, 5000, "", false, false);
					$("#btnuserfilechoose").val("");
				}
			}
		};
		xhr.send(formData);
	} else {
		adminShowconfirmmsg("Please upload csv file format only.", confirm_Error, 5000, "", false, false);
	}
}

function spdSaveAutoAITagsDataroomsService(){
	ajaxindicatorstart('saving tags to all corporates.. please wait..');
	var jsonInput = {"attribute1":"spdSaveAutoAITagsDataroomsServiceAfter"};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/spc/0/save/ai/tags/all/corp";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

function updateCorppaymentInfoService(jsonInput){
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/lawfirm/0/update/corporate/paymentinfo";
	invokeAdapterCallFromAdmin(type, posturl, "", jsonInput, "");
}

