function todolistUserListService(){
	if(localStorage._zs == "B"){
		var type = fetchMethod;
		var posturl = cloudApiUrlACMS+admfetchContactListBySync;
		posturl = posturl.replace("<ACTION>", "todolistUserListServiceAfter");
		posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
		invokeAdapterCallFromTodoList(type, posturl, "", "", "");
	}
}

function todolistSingleUserProfileService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+todolistSingleUserProfileURL;
	posturl = posturl.replace("<ACTION>", "todolistSingleUserProfileServiceAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromTodoList(type, posturl, "", "", "");
}

function todolistFetchStorageLeftService(){
	var jsonInput = {"attribute1":"1"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/fetchstoragespace/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "todolistFetchStorageLeftServiceAfter");
	var extraparamjson = {"openfile":false};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}

function todolistOTPSettingsService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/ots/0/fts/<OTPID>/<LAWFIRMID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "todolistOTPSettingsServiceAfter");
	posturl = posturl.replace("<OTPID>", 0);
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	invokeAdapterCallFromTodoList(type, posturl, "", "", "");
}

function todolistAddService(json){
	ajaxindicatorstart('adding data.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+todolistnewURL;
	invokeAdapterCallFromTodoList(type, posturl, "", json, "");
}

function todolistEditService(){
	ajaxindicatorstart('updating data.. please wait..');
	var extraparamjson = {"id":$("#divworkflowmodal").attr("data-id"), "refreshrightside":true};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+todolistupdateURL;
	var json = {"id":$("#divworkflowmodal").attr("data-id"),
				"description":$("#txtdescription").val(),
				"eventDesc":$("#txtevent").val(),
				"groupId":0,
				"dueDate":FormatDateToServer($("#txtduedate").val()),
				"remindOn":FormatDateToServer($("#txtremindon").val()),
				"status":1,
				"action":"todolistAddServiceAfter"};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistFetchService(id){
	ajaxindicatorstart('loading data.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+todolistsearchURL;
	var extraparamjson = {"id":id};
	var json = {};
	if(parseFloat(id) > 0) {
		json = {"id":id, "action":"todolistByIdServiceAfter"};
	} else {
		json = {"action":"todolistFetchServiceAfter", "complete":"", "status":"", "fromDueDate":"", "toDueDate":"", "event":"", "description":"", "sortOrder":todolistsortorder,
			"ownEvents":0};
		var statusfilter = $("#selecttodolistfilter").val();
		if(statusfilter == "C"){
			json.complete="C";
		} else if(statusfilter == "P"){
			json.status="P";
		} else if(statusfilter == "D"){
			json.status="D";
		} else if(statusfilter == "A-1"){
			json.ownEvents="1";
		} else if(statusfilter == "C-1"){
			json.complete="C";
			json.ownEvents="1";
		} else if(statusfilter == "P-1"){
			json.status="P";
			json.ownEvents="1";
		} else if(statusfilter == "D-1"){
			json.status="D";
			json.ownEvents="1";
		}

		if(fromDueDate.length > 0){
			json.fromDueDate=FormatDateToServer(fromDueDate);
		}
		if(toDueDate.length > 0){
			json.toDueDate=FormatDateToServer(toDueDate);
		}

		if($("#txtsearch").val().trim().length > 0){
			json.event=$("#txtsearch").val().trim();
			json.description=$("#txtsearch").val().trim();
		}
	}
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistChangeStatusService(params){
	var id = params[0];
	var status = params[1];
	var refreshrightside = params[2];
	ajaxindicatorstart('updating data.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+todolistchangestatusURL;
	var extraparamjson = {"id":id, "refreshrightside":refreshrightside};
	var json = {"attribute1":"todolistChangeStatusServiceAfter", "attribute2":id, "attribute3":status, "attribute4":$("#txtcomment").val().trim()};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistDeleteService(id) {
	ajaxindicatorstart('deleteing data.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+todolistdeleteURL;
	var json = {"attribute1":"todolistDeleteServiceAfter", "attribute2":id};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistImportWorkflowService(){
	var ext = currentfile.name.substring(currentfile.name.lastIndexOf(".")+1);
	if(ext.toLowerCase() == "xlsx" || ext.toLowerCase() == "csv"){
		ajaxindicatorstart('please wait..importing workflow...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS + todolistimportURL;

		var bs = getauthtokenfromlocal();
		const a = document.createElement('a');
		a.style = 'display: none';
		document.body.appendChild(a);

		var formData = new FormData();
		formData.append("file", currentfile, currentfile.name);

		var xhr = new XMLHttpRequest();
		xhr.open(type, posturl, true);
		xhr.responseType = "blob";
		xhr.setRequestHeader("Authorization",  "Bearer " + bs);
		xhr.onreadystatechange = function (){
			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					$("#btnworkflowfilechoose").val("");
					ajaxindicatorstop();

					var filename = getFileNameFromDispositioon(xhr.getResponseHeader('Content-Disposition'));
					var dateObj = new Date();
					var month = dateObj.getUTCMonth() + 1; //months from 1-12
					var day = dateObj.getUTCDate();
					var year = dateObj.getUTCFullYear();
					var hour = dateObj.getHours();
					var minute = dateObj.getMinutes();
					filename = filename.replace(".xlsx", "")+"_"+localStorage._zw+"_"+localStorage._zv+"_"+year+"_"+month+"_"+day+"_"+hour+"_"+minute+"_.xlsx";

					var blob = xhr.response;
					if (navigator.msSaveBlob) {
					  return navigator.msSaveBlob(blob, filename);
					}

					const url = URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					a.click();
					URL.revokeObjectURL(url);
					todoListShowconfirmmsg(todolistmessage.requestprocessed, confirm_Info, 5000, "", false, false);
					$("#btn_search_reset").click();
				} else {
					ajaxindicatorstop();
					todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
					$("#btnuserfilechoose").val("");
				}
			}
		};
		xhr.send(formData);
	} else {
		todoListShowconfirmmsg("Please upload xlsx file format only.", confirm_Error, 5000, "", false, false);
	}
}

function todolistAddCommentService(id) {
	ajaxindicatorstart('adding comment.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+todolistaddcommentURL;
	var json = {"action":"todolistAddCommentServiceAfter", "todoListId":id, "comment":$("#txtcomment").val().trim(), "status":"A", "processId":$("#div_todolist_"+id).attr("data-processid")};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistDeleteCommentService(id) {
	ajaxindicatorstart('deleteing comment.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+todolistdeletecommentURL;
	var json = {"attribute1":"todolistDeleteCommentServiceAfter", "attribute2":id};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistFetchCommentService(id) {
	ajaxindicatorstart('fetching comments.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+todolistfetchcommentURL;
	var json = {"attribute1":"todolistFetchCommentServiceAfter", "attribute2":id, "attribute3":$("#div_todolist_"+id).attr("data-curuser-processid")};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistAddFileService(id, fileId) {
	ajaxindicatorstart('attaching file.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id, "fileId":fileId};
	var posturl = cloudApiUrlACMS+todolistaddFileURL;
	var json = {"action":"todolistAddFileServiceAfter", "todoListId":id, "fileId":fileId, "status":"A", "processId":$("#div_todolist_"+id).attr("data-processid")};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistDeleteFileService(id, fileId) {
	ajaxindicatorstart('detaching file.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id, "fileId":fileId};
	var posturl = cloudApiUrlACMS+todolistdeleteFileURL;
	var json = {"action":"todolistDeleteFileServiceAfter", "todoListId":id, "fileId":fileId};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistFetchFileService(id) {
	ajaxindicatorstart('fetching files.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+todolistfetchFileURL;
	var json = {"action":"todolistFetchFileServiceAfter", "todoListId":id, "processId":$("#div_todolist_"+id).attr("data-curuser-processid")};
	invokeAdapterCallFromTodoList(type, posturl, "", json, extraparamjson);
}

function todolistExportWorkflowService(){
	ajaxindicatorstart('request is being processed...');

	var json = {"action":"todolistFetchServiceAfter", "complete":"", "status":"", "fromDueDate":"", "toDueDate":"", "event":"", "description":"", "sortOrder":todolistsortorder,
				"ownEvents":0};
	var statusfilter = $("#selecttodolistfilter").val();
	if(statusfilter == "C"){
		json.complete="C";
	} else if(statusfilter == "P"){
		json.status="P";
	} else if(statusfilter == "D"){
		json.status="D";
	} else if(statusfilter == "A-1"){
		json.ownEvents="1";
	} else if(statusfilter == "C-1"){
		json.complete="C";
		json.ownEvents="1";
	} else if(statusfilter == "P-1"){
		json.status="P";
		json.ownEvents="1";
	} else if(statusfilter == "D-1"){
		json.status="D";
		json.ownEvents="1";
	}

	if(fromDueDate.length > 0){
		json.fromDueDate=FormatDateToServer(fromDueDate);
	}
	if(toDueDate.length > 0){
		json.toDueDate=FormatDateToServer(toDueDate);
	}

	if($("#txtsearch").val().trim().length > 0){
		json.event=$("#txtsearch").val().trim();
		json.description=$("#txtsearch").val().trim();
	}

	const a = document.createElement('a');
	a.style = 'display: none';
	document.body.appendChild(a);

	var type = updateMethod;
	var bs = getauthtokenfromlocal();
	var posturl = cloudApiUrlACMS+todolistExportURL;
	var xhr = new XMLHttpRequest();
	xhr.open(type, posturl, true);
	xhr.responseType = "blob";
	xhr.timeout = 0;
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				$("#btnworkflowfilechoose").val("");
				ajaxindicatorstop();

				var dateObj = new Date();
				var month = dateObj.getUTCMonth() + 1; //months from 1-12
				var day = dateObj.getUTCDate();
				var year = dateObj.getUTCFullYear();
				var hour = dateObj.getHours();
				var minute = dateObj.getMinutes();
				var filename = getFileNameFromDispositioon(xhr.getResponseHeader('Content-Disposition'));
				filename = filename.replace(".xlsx", "")+"_"+localStorage._zw+"_"+localStorage._zv+"_"+year+"_"+month+"_"+day+"_"+hour+"_"+minute+"_.xlsx";

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
				todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
			}
		}
	};
	xhr.send(JSON.stringify(json));
}

//drive service starts
/**
 * method used to fetching  all folder list  from server.
 */
function fetchAllFolderListDetails() {
	ajaxindicatorstart('loading data.. please wait..');
	admids = 0;

	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admZeroFolderListOnlyURL;
	var jsonInput = {"attribute1":admcurrentfoldertype,"attribute2":adm_sorting,"attribute3":"fetchAllAdmFolderListResponse"};

	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, "");
}

/**
 * method to call webservice to fetch sibling folderpath from folder
 * @param folderId
 * @param folderfetch
 */

function fetchAllFolderListLevelDetails(folderfetch){
	ajaxindicatorstart('loading data.. please wait..');
	$("#btnuploadfile").show();
	$("#btnuploadfolder").show();
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFolder_FolderFullListURL;
	posturl = posturl.replace("<ACTION>", "fetchAllAdmFolderChildListResponse");
	posturl = posturl.replace("<MAXLIMIT>", adm_documentmaxlimit);
	posturl = posturl.replace("<FOLDERID>", admcurrentfolderid);
	posturl = posturl.replace("<SORTING>", "DESC`id");
	if(adm_documentmaxlimit <= 0) admtotaldocs = 0;
	var extraparamjson = {"folderfetch":folderfetch};
	invokeAdapterCallFromTodoList(type, posturl, "","",extraparamjson);
}

function todolistDownloadZipFile(fileId){
	ajaxindicatorstart('downloading file.. please wait..');
	var jsonInput = {"attribute1":fileId, "attribute3":1};
	var fname = new Date().getTime()+".zip";
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admdownloadzip;
	posturl = posturl.replace("<ACTION>", "todolistDownloadZipFileAfter");

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
				var filename = contentDisposition.substring(startIndex, endIndex);
				fname=filename;

				var blob = xhr.response;
				if (navigator.msSaveBlob) {
					return navigator.msSaveBlob(blob, fname);
				}
				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = fname;
				a.click();
				URL.revokeObjectURL(url);
			} else if(xhr.status == 201){
				ajaxindicatorstop();
				todoListShowconfirmmsg(todolistmessage.nopermission, confirm_Error, 5000, "", false, false);
			} else {
				ajaxindicatorstop();
				todoListShowconfirmmsg(todolistmessage.filedelettrash, confirm_Error, 5000, "", false, false);
			}
		}
	};
	xhr.send(JSON.stringify(jsonInput));
	xhrPool.push(xhr);
}
//drive serice ends

//Group code starts
function fetchAllGroupsService() {
	ajaxindicatorstart('loading groups.. please wait..');
	admids = 0;
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+fetchGroupURL;
	var jsonInput = {"status":1,"action":"fetchAllGroupsServiceAfter", "refreshCache":true};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, "");
}

function fetchAllUserGroupsByIdService() {
	ajaxindicatorstart('loading groups.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+fetchUserGroupURL;
	var jsonInput = {"groupId":selectidgroup,"action":"fetchAllUserGroupsByIdServiceAfter"};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, "");
}

function todolistAddUserGroupByUserIdService(){
	ajaxindicatorstart('adding user to group.. please wait..');
	var addjsonInput = {"attribute1":"todolistAddUserGroupServiceAfter", "listAttribute5":[]};
	var deletejsonInput = {"attribute1":"", "attribute2":selectidgroup, "attribute3":"todolistAddUserGroupServiceAfter"};
	var userIds = "0";
	$(".allusergroupcheckbox").each(function(i, obj) {
		var userId = (this.id).replace("div_user_group_row_checkbox_", "");
		if($("#div_user_group_row_"+userId).attr("data-edited")==1 && $(this).is(":checked") && $("#div_user_group_row_"+userId).attr("data-checked")=="false"){
			addjsonInput.listAttribute5.push({"attribute2":userId, "attribute1":selectidgroup});
		} else if($("#div_user_group_row_"+userId).attr("data-edited")==1 && $(this).is(":checked") == false){
			userIds += "," + userId;
		}
	});

	var type = updateMethod;
	if(addjsonInput.listAttribute5.length > 0){
		var posturl = cloudApiUrlACMS+addUserGroupURL;
		invokeAdapterCallFromTodoList(type, posturl, "", addjsonInput, "");
	}

	if(userIds != "0"){
		var posturl = cloudApiUrlACMS+deleteUserGroupURL;
		deletejsonInput.attribute1 = userIds;
		invokeAdapterCallFromTodoList(type, posturl, "", deletejsonInput, "");
	}
}

function todolistDeleteUserGroupByIdService(userId){
	ajaxindicatorstart('deletng user from group.. please wait..');
	var jsonInput = {"action":"todolistDeleteUserGroupByIdServiceAfter", "userId":userId, "groupId":selectidgroup};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+deleteUserGroupURL;
	var extraparamjson = {"userId":userId};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}

function todolistDeleteGroupService(id){
	ajaxindicatorstart('deletng group.. please wait..');
	var jsonInput = {"action":"todolistDeleteGroupServiceAfter", "id":id};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+deleteGroupURL;
	var extraparamjson = {"id":id};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}

function todolistAddGroupService(){
	var id = $("#divnewgroupmodal").attr("data-id");
	ajaxindicatorstart('adding group.. please wait..');
	var jsonInput = {"action":"todolistAddGroupServiceAfter", "groupName":$("#txtgroup").val(), "status":1, "id":id};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+(id > 0 ? updateGroupURL : addGroupURL);
	var extraparamjson = {"id":id};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}
//Group code ends

//flow template code starts
function todolistAddFlowService(jsonInput){
	ajaxindicatorstart('adding workflow template.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+(jsonInput.id == 0 ? flowTemplateAddURL : flowTemplateUpdateURL);
	var extraparamjson = {"id":jsonInput.id};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}

function todolistFetchFlowService(){
	selectedflowid = 0;
	ajaxindicatorstart('fetching workflow templates.. please wait..');
	var jsonInput = {"attribute1":"todolistFetchFlowServiceAfter"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+flowTemplateFetchURL
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, "");
}

function todolistDeleteFlowService(id){
	ajaxindicatorstart('deleting workflow template.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+flowTemplateDeleteURL;
	var extraparamjson = {"id":id};
	var jsonInput = {"attribute1":"todolistDeleteFlowServiceAfter", "attribute2":id};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}
//flow template code ends

function todolistDownloadTemplate(){
	ajaxindicatorstart('request is being processed...');

	const a = document.createElement('a');
	a.style = 'display: none';
	document.body.appendChild(a);

	var type = updateMethod;
	var bs = getauthtokenfromlocal();
	var posturl = cloudApiUrlACMS+downloadTemplateURL;
	var xhr = new XMLHttpRequest();
	xhr.open(type, posturl, true);
	xhr.responseType = "blob";
	xhr.timeout = 0;
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
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
			} else if (xhr.status == 204) {
				ajaxindicatorstop();
				todoListShowconfirmmsg(todolistmessage.downloadtemplategroupsnotfound, confirm_Error, 5000, "", false, false);
			} else {
				ajaxindicatorstop();
				todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
			}
		}
	};
	xhr.send();
}

function todolistCheckFileStatusService(docId, methodname){
	ajaxindicatorstart('checking file status.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admfilestatusURL;
	var extraparamjson = {"docId":docId, "methodname":methodname};
	var jsonInput = {"attribute1":"todolistCheckFileStatusServiceAfter", "attribute2":docId};
	invokeAdapterCallFromTodoList(type, posturl, "", jsonInput, extraparamjson);
}

