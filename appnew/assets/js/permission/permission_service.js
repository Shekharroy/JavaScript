/**
 * method used to fetching  all folder list  from server.
 */
function fetchAllFolderListDetails() {
	ajaxindicatorstart('loading data.. please wait..');
	admids = 0;
	var type =updateMethod;
	var posturl = cloudApiUrlACMS+admZeroFolderListOnlyURL;
	var jsonInput = {"attribute1":folderType,"attribute2":adm_sorting,"attribute3":"fetchAllAdmFolderListResponse"};
	var extraparamjson = {"level":1,"foldertype":folderType, "copy":false};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

/**
 * method to call list contacts service API
 */
function admUserListService(){
	if(localStorage._zs == "B"){
		var type = fetchMethod;
		var posturl = cloudApiUrlACMS + admfetchContactListBySync;
		posturl = posturl.replace("<ACTION>", "admUserListServiceAfter");
		posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);

		var extraparamjson = "";
		//if(displaysecurity != undefined && displaysecurity != null && displaysecurity == true) extraparamjson = {"displaysecurity":displaysecurity};
		invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
	}
}

function admFolderListAllService(folderId){
	if(folderId > 0) adm_folder_list = null;
	ajaxindicatorstart('expanding folder.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admTreeListURL;
	posturl = posturl.replace("<FOLDERID>", folderId);
	posturl = posturl.replace("<FOLDERTYPE>", admcurrentfoldertype);
	posturl = posturl.replace("<ACTION>", "admFolderListAllServiceAfter");
	var extraparamjson = {"folderId":folderId};
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

function admFetchFolderSharedSecurityService(folderId){
	ajaxindicatorstart('loading data.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchSharedFolderSecurity;
	posturl = posturl.replace("<ACTION>", "admFetchFolderSharedSecurityServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderId);
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

function admSaveSharedFolderSecurityService(jsoninput){
	ajaxindicatorstart('saving permissions.. please wait..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+admAddSharedFolderSecurity;
	posturl = posturl.replace("<ACTION>", "admSaveSharedFolderSecurityServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsoninput, "");
}

function permissionStorageCheckSessionService(){
	//setInterval(function (){
		//if(adminsessioncheckcalled == false){
			var jsonInput = {"attribute1":"1"};
			var type = updateMethod;
			var posturl = cloudApiUrlACMS+"/v1/app/fetchstoragespace/0/<ACTION>";
			posturl = posturl.replace("<ACTION>", "permissionStorageCheckSessionServiceAfter");
			invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
		//}
	//}, 300000);
}

/**
 * method to call webservice to fetch sibling folderpath from folder
 * @param id
 * @param level
 * @param path
 * @param folderhide
 * @param folderType
 * @param folderId
 * @param folderfetch
 */

 function fetchAllFolderListLevelDetails(folderhide, folderType, folderId, folderfetch, cleardata){
	$("#btnuploadfile").show();
	$("#btnuploadfolder").show();
	if(folderId != "" && folderId != undefined){
		var type = fetchMethod;
		var posturl = cloudApiUrlACMS+admFolder_FolderFullListURL;
		posturl = posturl.replace("<ACTION>", "fetchAllAdmFolderChildListResponse");
		posturl = posturl.replace("<MAXLIMIT>", -1);
		posturl = posturl.replace("<FOLDERID>", folderId);
		posturl = posturl.replace("<SORTING>", "DESC`id");
		if(adm_documentmaxlimit <= 0) admtotaldocs = 0;
		var extraparamjson = {"folderhide":folderhide, "foldertype":folderType, "folderfetch":folderfetch, "copy":false, "cleardata":cleardata};
		invokeAdapterCallFromAdm(type, posturl, "","",extraparamjson);
	} else {
		ajaxindicatorstop();
	}
}







