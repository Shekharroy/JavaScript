/**
 * method used to fetching  all folder list  from server.
 */
function fetchAllFolderListDetails(folderType) {
	$("#txt_search_index").val("");

	ajaxindicatorstart('loading data.. please wait..');
	admids = 0;

	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admZeroFolderListOnlyURL;
	var jsonInput = {"attribute1":folderType,"attribute2":adm_sorting,"attribute3":"fetchAllAdmFolderListResponse"};

	var extraparamjson = {"level":1,"foldertype":folderType, "copy":false};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
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
	$("#txt_search_index").val("");
	$("#btnuploadfile").show();
	$("#btnuploadfolder").show();
	if(folderId != ""){
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

/**
 * method to call delete service for folder
 * @param folderpath
 * @param objid
 */
function admDeleteFolderService(params){
	ajaxindicatorstart('processing request.. please wait..');
	var folderid = params.folderid;
	var objid = params.objid;
	var folderType = params.folderType;
	var deletecnf = params.deletecnf;
	var type = deleteMethod;
	var posturl = cloudApiUrlACMS+admFolderActDeleteURL;
	posturl = posturl.replace("<ACTION>", "admDeleteFolderServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderid);

	var extraparamjson = {"objid":objid, "folderid":folderid, "folderType":folderType, "deletecnf":deletecnf};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to call temp delete service for folder
 * @param folderpath
 * @param objid
 */
function admTempDeleteFolderService(params){
	ajaxindicatorstart('processing request.. please wait..');
	var folderid = params.folderid;
	var objid = params.objid;
	var folderType = params.folderType;
	var deletecnf = params.deletecnf;
	var type = deleteMethod;
	var posturl = cloudApiUrlACMS+admTempFolderActDeleteURL;
	posturl = posturl.replace("<ACTION>", "admDeleteFolderServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderid);

	var jsonInput = {attribute1:folderid};

	var extraparamjson = {"objid":objid, "folderid":folderid, "folderType":folderType, "deletecnf":deletecnf};
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
}

/**
 * method to call restore service for folder
 * @param folderpath
 * @param objid
 */
function admRestoreFolderService(folderid, objid){
	var type = deleteMethod;
	var posturl = cloudApiUrlACMS+admFolderRestoreURL;
	posturl = posturl.replace("<ACTION>", "admRestoreFolderServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderid);

	var extraparamjson = {"objid":objid};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to do advance search
 */
function admSearchFilesService(cleardata){
	/*ajaxindicatorstart('loading data.. please wait..');
	var jsonInput = admCreateJsonForSearch();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admSearchURL;
	posturl = posturl.replace("<ACTION>", "fetchAllAdmFolderChildListResponse");
	if(adm_documentmaxlimit <= 0) admtotaldocs = 0;
	var extraparamjson = {"foldertype":admcurrentfoldertype, "folderfetch":false, "cleardata":cleardata};
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);*/
}

/**
 * service method to add new folder
 * @param folderpath
 */
function admAddNewFolderService(folderpath, parentfolderid, folderType){
	var jsonInput = admFolderAddJSON(folderpath, folderType, parentfolderid);

	var type = createMethod;
	var posturl = cloudApiUrlACMS+admFolderAddURL;
	posturl = posturl.replace("<ACTION>", "admAddNewFolderServiceAfter");
	var extraparamjson = {"parentid":parentfolderid};
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
}

/**
 * method to call service to rename folder
 * @param editid
 * @param newpath
 * @param currentpath
 */
function admRenameNewFolderService(newpath, currentpath, folderType, folderId){
	folderEnterdone = false;
	var jsonInput = admFolderRenameJSON(currentpath, newpath, folderType, folderId);
	renameprvfolderpath = currentpath;
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admFolderRenameURL;
	posturl = posturl.replace("<ACTION>", "admRenameNewFolderServiceAfter");
	var extraparamjson = {"folderId":folderId, "pth":newpath};
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
}

/**
 * method to call adm share save urls service
 */
function admShareURLsService(copylink, isfolder){
	var jsonInput = null;
	if(copylink) {
		jsonInput = admShareCopyLinkURLBuildJSON();
		ajaxindicatorstart('generating link...please wait...');
	} else {
		ajaxindicatorstart('Sharing your files...please wait...');
		jsonInput = admShareURLBuildJSON();
	}

	if(jsonInput == false){
		ajaxindicatorstop();
	} else {
		copydocid = 0;
		var type = createMethod;
		var posturl = cloudApiUrlACMS+admShareDocAddURL;
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "-"
			+ (currentdate.getMonth()+1) + "-"
			+ currentdate.getFullYear() + " "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		posturl = posturl.replace("<DATENEW>", datetime);
		posturl = posturl.replace("<ACTION>", "admShareURLsServiceAfter");
		var extraparamjson = {"copylink":copylink, "isfolder":isfolder};
		invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
	}
}

/**
 * method to create inbound share url
 */
function admInboundShareURLsService(){
	ajaxindicatorstart('Sending file deposit request...please wait...');
	var jsonInput = admCreateJSONInboundShare();
	if(jsonInput == false){
			ajaxindicatorstop();
	} else {
		var type = createMethod;
		var posturl = cloudApiUrlACMS+admCreateInboundURL;
		posturl = posturl.replace("<ACTION>", "admInboundShareURLsServiceAfter");
		invokeAdapterCallFromAdm(type,posturl,"",jsonInput,"");
	}
}

/**
 * method to add new email to share cache email
 * @param value
 */
function admShareEmailTagsInsertService(value){
	if(localStorage._zs == "B"){
		var jsonInput = {userId:localStorage._zv, emailId:value, status:'A'};
		var type = createMethod;
		var posturl = cloudApiUrlACMS+admShareEmailAddURL;
		posturl = posturl.replace("<ACTION>", "admShareEmailTagsInsertServiceAfter");
		var extraparamjson = {"email":value};
		invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
	}
}

/**
 * method to update allow print
 */
function admmakeImportanhtService(objid, docId, flag){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admMakeImportantURL;
	posturl = posturl.replace("<DOCID>", docId);
	posturl = posturl.replace("<FLAG>", flag);
	posturl = posturl.replace("<ACTION>", "admmakeImportanhtServiceAfter");
	var extraparamjson = {"objid":objid};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
method to update signed status of document
*/
function admMarkForSignDocService(fileid, signed, objid){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var jsonInput = {"attribute1":fileid, "attribute2":signed};
	var posturl = cloudApiUrlACMS+admUploadDocumentToSignURL;
	var extraparamjson = {"objid":objid};
	posturl = posturl.replace("<ACTION>", "admMarkForSignDocServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

/**
method to update lock status of document
*/
function admMarkForLockDocService(fileid, signed, objid){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var jsonInput = {"attribute1":fileid, "attribute2":signed};
	var extraparamjson = {"objid":objid};
	var posturl = cloudApiUrlACMS+admUploadDocumentToLockURL;
	posturl = posturl.replace("<ACTION>", "admMarkForLockDocServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

/**
 * method to display doc viewer
 * @param docId
 */
function admDisplayDocViewer(docId, idm, viewertype, folderId){
	if(idm == "null" || admopenfilelink) ajaxindicatorstart('Opening document.. please wait..');
	admdocviewerrequested = true;
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admViewerDocsNewURL;
	posturl = posturl.replace("<ACTION>", "admDisplayDocViewerAfter");
	posturl = posturl.replace("<DOCID>", docId);
	posturl = posturl.replace("<VIEWERTYPE>", viewertype);
	var extraparamjson = {"idm":idm,"nointernet":"admDisplayDocViewerAfter", "fdid":folderId, "customheader":{"searchtext":$("#txt_search_index").val()}};
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

function admDownloadZipFile(jsonInput){
	var dcids=(jsonInput.attribute1).split(",");
	jsonInput.attribute3=dcids.length;
	var fname = new Date().getTime()+".zip";
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admdownloadzip;
	posturl = posturl.replace("<ACTION>", "admDownloadZipFileAfter");
	try{admHideFileDownloadProgress(jsonInput.attribute1, "");}catch(error){}

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
	xhr.setRequestHeader("searchtext", $("#txt_search_index").val());
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			if(xhr.status == 200){
				try{admHideFileDownloadProgress(jsonInput.attribute1, "none");}catch(error){}
				if(dcids.length){
					var contentDisposition = xhr.getResponseHeader('Content-Disposition');
					var startIndex = contentDisposition.indexOf("filename=") + 9; // Adjust '+ 10' if filename is not the right one.
					var endIndex = contentDisposition.length; //Check if '- 1' is necessary
					var filename = contentDisposition.substring(startIndex, endIndex);
					fname=filename;
				}
				var blob = xhr.response;
				if (navigator.msSaveBlob) {
					return navigator.msSaveBlob(blob, fname);
				}
				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = fname;
				a.click();
				URL.revokeObjectURL(url);
				if(window.location.href.indexOf("downloaduploaded.html")>0){
					window.location.href="downloadsuccess.html";
				}
			} else {
				if(!abortingajax){
					admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
				}
				try{admHideFileDownloadProgress(jsonInput.attribute1, "none");}catch(error){}
			}
		}
	};
	xhr.send(JSON.stringify(jsonInput));
	xhrPool.push(xhr);
}

function admFetchFolderSizeService(folderId, foldername, idm, org){
	var fname = new Date().getTime()+".zip";
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admfetchFolderSizeURL;
	posturl = posturl.replace("<ACTION>", "admFetchFolderSizeServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderId);
	var jsonInput = {"boolAttribute1":org};
	var extraparamjson = {"folderId":folderId,"foldername":foldername,"idm":idm,"nointernet":"admFetchFolderSizeServiceAfter","boolAttribute1":org};
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
}

function admDownloadFolderService(folderId, foldername, idm, org){
	$("#downloadingstatus_"+folderId).html(dowload_status_preparing);
	$("#downloadclose_"+folderId).html("<img src='assets/img/dcirrus_spins.gif?v=4' style='width:25px;height:25px;margin-left:-6px;'>");
	var actfdname = foldername;
	var foldernm = foldername+".zip";
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admdownloadfolderzip;
	posturl = posturl.replace("<FOLDERID>", folderId);
	posturl = posturl.replace("<ACTION>", "admDownloadFolderServiceAfter");

	var bs = getauthtokenfromlocal();
	const a = document.createElement('a');
	a.style = 'display: none';
 	document.body.appendChild(a);

	$("#downloadingperc_"+folderId).html("1%");
	var myVar = setInterval(function(){
		var k = $("#downloadingperc_"+folderId).html();
		k = k.replace("%", "");
		k = parseFloat(k)+1;
		if(k >= 20) {
			k = 20;
			var mv = folderdownloadft[folderId];
			clearInterval(mv);
			delete folderdownloadft[folderId];
		}
		$("#downloadingperc_"+folderId).html(k+"%");
		$("#downloadingperc_"+folderId).attr("dtid", 0);
	}, 120000);
	folderdownloadft[folderId]=myVar;

	var xhr = new XMLHttpRequest();
	xhr.open('POST', posturl, true);
	//xhr.responseType = "blob";
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
	    if (xhr.readyState === 4) {
			if(xhr.status == 201){
				downloadrunning = false;
				admdownloadFolderQueue();
				$("#adm_download_folder_progress_"+idm).css("display", "none");
				$("#adm_download_folder_progress_img_"+idm).css("display", "none");
				$("#adm_download_folder_"+idm).css("display", "");
				$("#imgclassid_"+idm).removeClass("respons")
				$("#drm_folder_info_"+folderId).css("margin-top", "11px");
				$("#adm_foldername_"+idm).css("margin-top", "14px");
				if(org) $("#adm_download_org_"+idm).css("display", "");
				delete currentdownloadfolders[folderId];
				var blob = JSON.parse(xhr.response);
				if(blob.error == false){
					window.open(blob.object, "_blank");
				}

				try{
					var filename = (blob.object).substring((blob.object).lastIndexOf("?")+1);
					filename = filename.replace("dfd=", "");
					filename = filename.substring(0, filename.indexOf("_"));
				}catch(error){
					admShowconfirmmsg(adm_messages.folderdownloadnotcomplete.replace("<&FOLDERNAME;>", actfdname), confirm_Error, 5000, "", false, false);
				}
				admremovdownloadrow(folderId);
				$("#downloadingperc_"+folderId).html("100%");
				$("#downloadingstatus_"+folderId).html(dowload_status_completed);
				$("#downloadclose_"+folderId).html("<i class='fa fa-times' aria-hidden='true'></i>");
				if(downloadfolderarr.length == 0){
					$("#divdownloadheader").html("All Downloaded Folder Details");
					showActionPopup("modalfolderdownload");
					$("#downloadingperc").hide();
				}
				if($("#tbldownloaddetails").html().length == 0){
					hideActionPopup("modalfolderdownload");
				}
			} else if(xhr.status == 400){
				if(!abortingajax){
					admShowconfirmmsg(adm_messages.foldernofiles.replace("<FOLDER>", actfdname), confirm_Error, 5000, "", false, false);
				}
				$("#adm_download_folder_progress_"+idm).css("display", "none");
				$("#adm_download_folder_progress_img_"+idm).css("display", "none");
				$("#adm_download_folder_"+idm).css("display", "");
				if(org) $("#adm_download_org_"+idm).css("display", "");
				downloadrunning = false;
			} else {
				if(!abortingajax){
					admShowconfirmmsg(adm_messages.folderdownloadnotcomplete.replace("<&FOLDERNAME;>", actfdname), confirm_Error, 5000, "", false, false);
				}
				$("#adm_download_folder_progress_"+idm).css("display", "none");
				$("#adm_download_folder_progress_img_"+idm).css("display", "none");
				$("#adm_download_folder_"+idm).css("display", "");
				if(org) $("#adm_download_org_"+idm).css("display", "");
				delete currentdownloadfolders[folderId];
				downloadrunning = false;
				admremovdownloadrow(folderId);
			}
		}
	};

	xhr.onerror = function(XMLHttpRequest, textStatus, errorThrown) {
		if (XMLHttpRequest.readyState == 4) {
			if(!abortingajax){
				admShowconfirmmsg(adm_messages.folderdownloadnotcomplete.replace("<&FOLDERNAME;>", actfdname), confirm_Error, 5000, "", false, false);
			}
			$("#adm_download_folder_progress_"+idm).css("display", "none");
			$("#adm_download_folder_progress_img_"+idm).css("display", "none");
			$("#adm_download_folder_"+idm).css("display", "");
			if(org) $("#adm_download_org_"+idm).css("display", "");
			downloadrunning = false;
			admremovdownloadrow(folderId);
		}
	}

	xhr.onprogress = function(e) {
		var mv = folderdownloadft[folderId];
		clearInterval(mv);
		delete folderdownloadft[folderId];
		var percent_complete = (e.loaded / e.total)*100;
		var perc = parseInt(percent_complete);
		var mv = folderdownloadft[folderId];
		clearInterval(mv);
		delete folderdownloadft[folderId];
		var initprec = $("#downloadingperc_"+folderId).html();
		initprec = initprec.replace("%", "");
		var prvperc = document.getElementById("downloadingperc_"+folderId).getAttribute("dtid");
		if(parseFloat(perc) > parseFloat(prvperc) && perc == initprec){
			initprec = 1 + perc;
		}else if(parseFloat(perc) > parseFloat(initprec)){
			initprec = perc;
		}

		if(initprec > 100){
			initprec = 100;
		}
		$("#downloadingperc_"+folderId).attr("dtid", perc);
		$("#downloadingperc_"+folderId).html(initprec + "%");
		$("#downloadingstatus_"+folderId).html(dowload_status_running);
		if(perc == 100){
			$("#downloadingstatus_"+folderId).html(dowload_status_completed);
			$("#downloadclose_"+folderId).html("<i class='fa fa-times' aria-hidden='true'></i>");
			if(downloadfolderarr.length == 0){
				$("#divdownloadheader").html("All Downloaded Folder Details");
				showActionPopup("modalfolderdownload");
				$("#downloadingperc").hide();
			}
		}
	};
	xhr.send(JSON.stringify({"boolAttribute1":org}));
	xhrPool.push(xhr);
}

function admgenerateDownloadFolderLink(params){
	var json = {"boolAttribute1":params[1]};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admgenerateDownloadFolderLinkURL;
	posturl = posturl.replace("<FOLDERID>", params[0]);
	posturl = posturl.replace("<ACTION>", "admgenerateDownloadFolderLinkAfter");
	invokeAdapterCallFromAdm(type,posturl,"",json,"");
}

function admDeleteDownloadTempFolderService(foldername){
	var jsonInput = {"attribute1":foldername};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admdownloaddeletefolderzip;
	posturl = posturl.replace("<ACTION>", "admDeleteDownloadTempFolderServiceAfter");
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,"");
}

/**
 * method to call service to rename folder
 * @param editid
 * @param newpath
 * @param currentpath
 */
function admRenameFileService(id, fileName, folderId){
	ajaxindicatorstart('processing request.. please wait..');
	var jsonInput = admFileRenameJSON(id, fileName, folderId);

	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admFileRenameURL;
	posturl = posturl.replace("<ACTION>", "admRenameFileServiceAfter");

	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,"");
}

/**
 * method to call list contacts service API
 */
function admSingleDocumentFetch(docIds, ids){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS + admfetchSingleDocument;
	posturl = posturl.replace("<ACTION>", "admSingleDocumentFetchAfter");
	posturl = posturl.replace("<DOCID>", docIds);

	var extraparamjson = {"ids":ids};
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

function admSingleDocumentFetchOnly(docIds,corpid){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS + admfetchSingleCPDocument;
	posturl = posturl.replace("<ACTION>", "admSingleDocumentFetchOnlyAfter");
	posturl = posturl.replace("<DOCID>", docIds);
	posturl = posturl.replace("<CPID>", corpid);
	var extraparamjson = {"corpid":corpid};
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

/**
 * method to call webservice to delete doc list
 * @param docList
 */
function admDeleteDocs(jsonInput){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	if(jsonInput == "") {
		jsonInput = admBuildDeleteDocsJSON();
	}
	var posturl = cloudApiUrlACMS+admDeleteDocsURL;
	posturl = posturl.replace("<ACTION>", "admDeleteDocsAfter");
	var extraparamjson = {"idm":jsonInput.ids, "permdel":jsonInput.permdel};

	delete jsonInput["ids"];
	delete jsonInput["permdel"];

	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

/**
 * method to call webservice to delete doc list permanently
 * @param docList
 */
function admDeleteDocsPermanent(jsonInput){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	if(jsonInput == "") {
		jsonInput = admBuildDeleteDocsJSON();
	}
	var posturl = cloudApiUrlACMS+admDeleteDocsPermanentURL;
	posturl = posturl.replace("<ACTION>", "admDeleteDocsAfter");
	var extraparamjson = {"idm":jsonInput.ids, "permdel":jsonInput.permdel};

	delete jsonInput["ids"];
	delete jsonInput["permdel"];

	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

/**
 * method to restore trashed documents
 */
function admrestoreTrashedDocs(jsonInput){
	var type = updateMethod;
	if(jsonInput == "") {
		jsonInput = admBuildDeleteDocsJSON();
	}
	var posturl = cloudApiUrlACMS+admrestoreTrashedDocsURL;
	posturl = posturl.replace("<ACTION>", "admrestoreTrashedDocsAfter");

	var extraparamjson = {"idm":jsonInput.ids};
	delete jsonInput["ids"];

	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admDisplaySearchFilesService(){
	$("#searchpopup").slideUp();
	var folderType = admcurrentfoldertype;
	var filename = $("#searchfname").val();
	var tag = $("#searchtag").val().toLowerCase();
	var filetype = $("#searchfiletype").val();
	var uploaddatefrom = $("#dateform").val();
	var uploaddateto = $("#dateto").val();
	var filesizefrommeasure = $("#sizefrom :selected").text();
	var filesizefrom = $("#searchfilefromsize").val();
	var filesizetomeasure = $("#sizeto :selected").text();
	var filesizeto = $("#searchfiletosize").val();
	var flag = -1;
	var metadataValue = $("#searchMetadata").val();
	var metadataDate = $("#metadataDate_value").val();
	try{
		if(metadataDate.length > 0){
			var metadataDatearr = metadataDate.split("-");
			metadataDate = metadataDatearr[2]+"-"+metadataDatearr[1]+"-"+metadataDatearr[0];
		}
    }catch(error){}
	if($("#admflaggedcheckbox").is(":checked")){
		flag = 1;
	} else if($("#admflagcheckbox").is(":checked")){
		flag = 0;
	}

	var lock = -1;
	if($("#admlockcheckbox").is(":checked")){
		lock = 1;
	} else if($("#admunlockcheckbox").is(":checked")){
		lock = 0;
	}

	var sign = -1;
	if($("#admmarkedcheckbox").is(":checked")){
		sign = 1;
	} else if($("#admmarkcheckbox").is(":checked")){
		sign = 0;
	}

	var dtfrom = null;
	try{
		if(uploaddatefrom.length > 0){
			dtfrom = FormatDateToServer(uploaddatefrom);
		}
	}catch(error){}

	var dtto = null;
	try{
		if(uploaddateto.length > 0){
			dtto = FormatDateToServer(uploaddateto);
			dtto = dtto.replace("T00:00:00Z", "T23:59:59Z");
		}
	}catch(error){}

	var metaDate = null;
	try{
		if(metadataDate.length > 0){
			metaDate = FormatDateToServer(metadataDate);
			metaDate = metaDate.replace("T00:00:00Z", "T23:59:59Z");
		}
	}catch(error){}

	var sizefrom = 0;
	try{
		if(filesizefrom == "") filesizefrom = "0";
		if(filesizefrommeasure == "KB"){
			sizefrom = parseFloat(filesizefrom)*1024;
		} else if(filesizefrommeasure == "MB"){
			sizefrom = parseFloat(filesizefrom)*1024*1024;
		} else if(filesizefrommeasure == "GB"){
			sizefrom = parseFloat(filesizefrom)*1024*1024*1024;
		}
	}catch(error){}

	var sizeto = 0;
	try{
		if(filesizeto == "") filesizeto = "0";
		if(filesizetomeasure == "KB"){
			sizeto = parseFloat(filesizeto)*1024;
		} else if(filesizetomeasure == "MB"){
			sizeto = parseFloat(filesizeto)*1024*1024;
		} else if(filesizetomeasure == "GB"){
			sizeto = parseFloat(filesizeto)*1024*1024*1024;
		}
	}catch(error){}

	if(filename.trim().length == 0 && filetype.trim().length == 0 && dtfrom == null && dtto == null && sizefrom == 0
		 && sizeto == 0 && tag.trim().length == 0 && flag == -1 && lock == -1 && sign == -1
		 && metadataValue.trim().length == 0 && metaDate == null){
		admShowconfirmmsg(adm_messages.admssearchfilter, confirm_Error, 5000, "", false, false);
	} else {
		var jsonInput = {
			fileName:filename,
			fileType:filetype,
			folderType:folderType,
			fromCreatedDate:dtfrom,
			toCreatedDate:dtto,
			fromFileSize:sizefrom,
			toFileSize:sizeto,
			tagName:tag,
			flag:flag,
			lock:lock,
			sign:sign,
			maxLimit:-1,
			sorting:"DESC`lastmodified",
			metadataValue:metadataValue,
			metadataDate:metadataDate
		};
		var fileFolderName = filename;
		if(fileFolderName != null && fileFolderName.trim().length > 0){
			fileFolderName = fileFolderName.replaceAll(" ", ",");
			fileFolderName = fileFolderName.replaceAll("'", ",");
			fileFolderName = fileFolderName.replaceAll("-", ",");
			fileFolderName = fileFolderName.replaceAll("\\*", ",");
			fileFolderName = fileFolderName.replaceAll("#", ",");
		}

		var extraparamjson = {"folderType":folderType,"searchName":fileFolderName};
		ajaxindicatorstart('loading data.. please wait..');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS+admSearchURL;
		posturl = posturl.replace("<ACTION>", "admDisplaySearchFilesServiceAfter");
		invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
	}
}

/**
 * method to add tags
 */
function admAddTags(tag, fileId){
	var jsonInput = {
		fileId:fileId,
		userId:localStorage._zv,
		tag:tag,
		status:"A"
	};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admAddTagsURL;
	posturl = posturl.replace("<ACTION>", "admAddTagsAfter");
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,"");
}

/**
 * method to fetch all tags
 */
function admFetchTags(docId){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchTagsURL;
	posturl = posturl.replace("<DOCID>", docId);
	posturl = posturl.replace("<ACTION>", "admFetchTagsAfter");
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

/**
 * method to delete tags
 */
function admDeleteTags(id,docid){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDeleteTagsURL;
	posturl = posturl.replace("<TAGID>", id);
	posturl = posturl.replace("<ACTION>", "admDeleteTagsAfter");
	var extraparamjson = {"docid":docid};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

function admFetchVersion(docId){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchVersionsURL;
	posturl = posturl.replace("<DOCID>", docId);
	posturl = posturl.replace("<ACTION>", "admFetchVersionAfter");
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

function admDeleteVersionService(id,docid){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admVersionsDeleteURL;
	posturl = posturl.replace("<VERSIONID>", id);
	posturl = posturl.replace("<ACTION>", "admDeleteVersionServiceAfter");
	var extraparamjson = {"docid":docid};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to display doc viewer
 * @param docId
 */
function admDisplayDocViewerVersion(docId, versionId, extraparamjson, viewerType){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admViewerDocsVersionURL;
	posturl = posturl.replace("<ACTION>", "admDisplayDocViewerVersionAfter");
	posturl = posturl.replace("<DOCID>", docId);
	posturl = posturl.replace("<VERSIONID>", versionId);
	posturl = posturl.replace("<VIEWERTYPE>", viewerType);
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

/**
 * method to display doc viewer
 * @param docId
 */
function admFetchFoldersByParentId(methodToBeCalled){
	ajaxindicatorstart('loading data.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFolderListOnlyURL;
	posturl = posturl.replace("<ACTION>", "admFetchFoldersByParentIdAfter");
	posturl = posturl.replace("<PARENTID>", admCopyParentId);
	posturl = posturl.replace("<FOLDERTYPE>", admCopyFolderType);
	var extraparamjson = {"action":methodToBeCalled};
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

/**
 * method to call service for copy and move of the documents
 */
function admCopyMoveService(copyFolderType, action, overwrite){
	var jsonInput = admCopyMoveDocListJSON(copyFolderType, action, overwrite);
	if(jsonInput != null){
		var docids = (jsonInput.docIds+"").split(",");
		ajaxindicatorstart('processing request.. please wait..');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS+admCopyMoveDocURL;
		posturl = posturl.replace("<ACTION>", "admCopyMoveServiceAfter");
		var extraparamjson = {"action":action, "length":docids.length};
		invokeAdapterCallFromAdm(type,posturl,"",jsonInput,extraparamjson);
	}else{
		ajaxindicatorstop();
	}
}

/**
method to add document metadata after upload
*/
function admDocAddMetaDataService(jsonInput, refresh){
	jsonInput.boolAttribute1 = isFolderUpload;
	if(refresh) ajaxindicatorstart('loading data.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDocMetaAddURL;
	posturl = posturl.replace("<ACTION>", "admDocAddMetaDataServiceAfter");
	var extraparamjson = {"refresh":refresh};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

/**
 * method to fetch shared security
 * @param folderId
 */
function admFetchFolderSharedSecurityService(folderId, isshow){
	ajaxindicatorstart('loading data.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchSharedFolderSecurity;
	posturl = posturl.replace("<ACTION>", "admFetchFolderSharedSecurityServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderId);
	var extraparamjson = {"isshow":isshow};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to fetch shared security by user
 * @param folderId
 */
function admFetchFolderSharedSecurityUserService(folderId, isshow){
	ajaxindicatorstart('loading data.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchSharedFolderUserSecurity;
	posturl = posturl.replace("<ACTION>", "admFetchFolderSharedSecurityServiceAfter");
	posturl = posturl.replace("<FOLDERID>", folderId);
	var extraparamjson = {"isshow":isshow};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to add new folder shared security
 * @param jsoninput
 */
function admSaveSharedFolderSecurityService(jsoninput){
	ajaxindicatorstart('loading data.. please wait..');
	var type = createMethod;
	var posturl = cloudApiUrlACMS+admAddSharedFolderSecurity;
	posturl = posturl.replace("<ACTION>", "admSaveSharedFolderSecurityServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsoninput, "");
}

function admUpdateSharedFolderSecurityService(jsoninput){
	ajaxindicatorstart('loading data.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admUpdateSharedFolderSecurity;
	posturl = posturl.replace("<ACTION>", "admUpdateSharedFolderSecurityServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsoninput, "");
}

function admDeleteSharedFolderSecurityService(jsoninput){
	ajaxindicatorstart('loading data.. please wait..');
	var type = deleteMethod;
	var posturl = cloudApiUrlACMS+admDeleteSharedFolderSecurity;
	posturl = posturl.replace("<ACTION>", "admUpdateSharedFolderSecurityServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsoninput, "");
}

/**
 * methdo to fetch share mgmt outbound share screen
 */
function admShareMgmtOutboundListService(){
	ajaxindicatorstart('loading data.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchOutboundShareList;
	posturl = posturl.replace("<CASEID>", "0");
	posturl = posturl.replace("<MAXLIMIT>", admsharemgmtmaxlimit);
	posturl = posturl.replace("<SORTBY>", "CREATEDDATE");
	posturl = posturl.replace("<SORTTYPE>", "DESC");
	posturl = posturl.replace("<ACTION>", "admShareMgmtOutboundListServiceAfter");
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

/**
 * method to fetch share mgmt inbound share screen
 */
function admShareMgmtInboundListService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchInboundShareList;
	posturl = posturl.replace("<MAXLIMIT>", admsharemgmtmaxlimit);
	posturl = posturl.replace("<SORTBY>", "CREATEDDATE");
	posturl = posturl.replace("<SORTTYPE>", "DESC");
	posturl = posturl.replace("<ACTION>", "admShareMgmtInboundListServiceAfter");
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

/**
 * method to delete the share
 * @param shareLoginId
 */
function admDeleteOutboundShare(shareLoginId, index){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDeleteOutboundShareList;
	posturl = posturl.replace("<CASEID>", "0");
	posturl = posturl.replace("<ID>", shareLoginId);
	posturl = posturl.replace("<ACTION>", "admDeleteOutboundShareAfter");
	var extraparamjson = {"index":index};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to delete the share
 * @param shareLoginId
 */
function admDeleteInboundShare(shareLoginId, index){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDeleteInboundShareList;
	posturl = posturl.replace("<ID>", shareLoginId);
	posturl = posturl.replace("<ACTION>", "admDeleteInboundShareAfter");
	var extraparamjson = {"index":index};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to update allow download
 * @param shareLoginId
 * @param allowDownload
 */
function admAllowDownloadOutboundShare(shareLoginId, allowDownload){
	var extraparamjson = {"allowed":allowDownload};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admOutboundShareAllowDownloadURL;
	posturl = posturl.replace("<CASEID>", 0);
	posturl = posturl.replace("<SHARELOGINID>", shareLoginId);
	posturl = posturl.replace("<ALLOWDOWNLOAD>", allowDownload);
	posturl = posturl.replace("<ACTION>", "admAllowDownloadOutboundShareAfter");
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to update allow print
 * @param shareLoginId
 * @param allowPrint
 */
function admAllowPrintOutboundShare(shareLoginId, allowPrint, showalert){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admOutboundShareAllowPrintURL;
	posturl = posturl.replace("<CASEID>", 0);
	posturl = posturl.replace("<SHARELOGINID>", shareLoginId);
	posturl = posturl.replace("<ALLOWDOWNLOAD>", allowPrint);
	posturl = posturl.replace("<ACTION>", "admAllowPrintOutboundShareAfter");
	var extraparamjson = {"showalert":showalert, "allowed":allowPrint};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to update allow upload
 * @param shareLoginId
 * @param allowPrint
 */
function admAllowUploadOutboundShare(shareLoginId, allowUpload){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admOutboundShareAllowUploadURL;
	posturl = posturl.replace("<CASEID>", 0);
	posturl = posturl.replace("<SHARELOGINID>", shareLoginId);
	posturl = posturl.replace("<ALLOWUPLOAD>", allowUpload);
	posturl = posturl.replace("<ACTION>", "admAllowUploadOutboundShareAfter");
	var extraparamjson = {"allowed":allowUpload};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

/**
 * method to update allow sign
 * @param shareLoginId
 * @param allowPrint
 */
function admAllowSignOutboundShare(shareLoginId, toSign){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admOutboundShareToSignURL;
	posturl = posturl.replace("<CASEID>", 0);
	posturl = posturl.replace("<SHARELOGINID>", shareLoginId);
	posturl = posturl.replace("<TOSIGN>", toSign);
	posturl = posturl.replace("<ACTION>", "admAllowSignOutboundShareAfter");
	var extraparamjson = {"allowed":toSign};
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

function admInfoInboundShare(shareAccessId){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admOutboundShareAllowPrintURL;
	posturl = posturl.replace("<CASEID>", 0);
	posturl = posturl.replace("<SHARELOGINID>", shareLoginId);
	posturl = posturl.replace("<ALLOWDOWNLOAD>", allowPrint);
	posturl = posturl.replace("<ACTION>", "admAllowPrintOutboundShareAfter");
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

/**
* method to upload annotation documents
*/
function admUploadAnnotationDocument(){
	var type = updateMethod;
	var jsonInput = {"versionNumber":adm_viewer_doc_version, "fileId":adm_viewer_docid, "folderId":adm_viewer_folderid, "folderType":adm_viewer_foldertype, "fileType":adm_viewer_filetype};
	var posturl = cloudApiUrlACMS+admUploadAnnnotatedDocsURL;
	posturl = posturl.replace("<ACTION>", "admUploadAnnotationDocumentAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

/**
method to update signed status of document
*/
function admMarkForSignDocService(fileid, signed, objid){
	var type = updateMethod;
	var jsonInput = {"attribute1":fileid, "attribute2":signed};
	var posturl = cloudApiUrlACMS+admUploadDocumentToSignURL;
	var extraparamjson = {"objid":objid};
	posturl = posturl.replace("<ACTION>", "admMarkForSignDocServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admShowFolderFileListInfoService(id){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admShareInfoURL;
	posturl = posturl.replace("<ID>", id);
	posturl = posturl.replace("<ACTION>", "admShowFolderFileListInfoServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admSingleUserProfileService(isshow){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admSingleUserProfileURL;
	posturl = posturl.replace("<ACTION>", "admSingleUserProfileServiceAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admSaveUserProfileService(jsonInput){
	ajaxindicatorstart('saving profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admSaveUserProfileURL;
	posturl = posturl.replace("<ACTION>", "admSaveUserProfileServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admAddUserPhone(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admAddUserPhoneURL;
	posturl = posturl.replace("<ACTION>", "admaddUserPhoneAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admUpdateUserPhone(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admSaveUserPhoneURL;
	posturl = posturl.replace("<ACTION>", "admUpdateUserPhoneAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admAddUserFax(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admAddUserFaxURL;
	posturl = posturl.replace("<ACTION>", "admAddUserFaxAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admUpdateUserFax(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admSaveUserFaxURL;
	posturl = posturl.replace("<ACTION>", "admUpdateUserFaxAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admUpdateUserPicture(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admAddUserPictureURL;
	posturl = posturl.replace("<ACTION>", "admUpdateUserPictureAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admFetchStorageLeftService(openfile){
	var jsonInput = {"attribute1":"1"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admStorageLeftURL;
	posturl = posturl.replace("<ACTION>", "admFetchStorageLeftServiceAfter");
	var extraparamjson = {"openfile":openfile};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admfetchProjectIndexService(folderId){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchProjectIndexURL;
	posturl = posturl.replace("<FOLDERID>", folderId);
	posturl = posturl.replace("<FOLDERTYPE>", admcurrentfoldertype);
	posturl = posturl.replace("<TIMEZONE>", timeZone.replace("/", "-"));
	posturl = posturl.replace("<ACTION>", "admfetchProjectIndexServiceAfter");

	var bs = getauthtokenfromlocal();
	const a = document.createElement('a');
	a.style = 'display: none';
	document.body.appendChild(a);

	var xhr = new XMLHttpRequest();
	xhr.open(type, posturl, true);
	xhr.responseType = "blob";
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			ajaxindicatorstop();
			var blob = xhr.response;
			if (navigator.msSaveBlob) {
			  return navigator.msSaveBlob(blob, "project_index.xlsx");
			}

			const url = URL.createObjectURL(blob);
			a.href = url;
			a.download = "project_index.xlsx";
			a.click();
			URL.revokeObjectURL(url);
		}
	};
	xhr.send();
	xhrPool.push(xhr);
}

function admRebuildProjectIndexService(){
	admrebuildvar[0] = admTreeFolderSelectedId;
	admrebuildvar[1] = selectednodeid;
	admrebuildvar[2] = admcurrentfolderid;

	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admRebuildProjectIndexURL;
	posturl = posturl.replace("<FOLDERTYPE>", admcurrentfoldertype);
	posturl = posturl.replace("<ACTION>", "admRebuildProjectIndexServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admFolderListAllService(folderId){
	ajaxindicatorstart('expanding folder.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admTreeListURL;
	posturl = posturl.replace("<FOLDERID>", folderId);
	posturl = posturl.replace("<FOLDERTYPE>", admcurrentfoldertype);
	posturl = posturl.replace("<ACTION>", "admFolderListAllServiceAfter");
	var extraparamjson = {"folderId":folderId};
	invokeAdapterCallFromAdm(type, posturl, "", "", extraparamjson);
}

function admSelectedFolderListAllService(){
	var pth = admcurrentpath;
	if(admcurrentpath.indexOf("/") > 0) pth = admcurrentpath.substring(0, admcurrentpath.indexOf("/"));
	ajaxindicatorstart('expanding folder.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admTreeListSelectedFolderURL;
	var jsonInput = {"attribute1":pth,"attribute2":admcurrentfoldertype};
	posturl = posturl.replace("<ACTION>", "admSelectedFolderListAllServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admfolderdownmulti(){
	for(var i=0;i<100;i++){
		admDownloadFolderService1(20976, i);
	}
}

function admDownloadFolderService1(folderId, idm){
	console.log("download start : " + idm);
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admdownloadfolderzip;
	posturl = posturl.replace("<FOLDERID>", folderId);
	posturl = posturl.replace("<ACTION>", "admDownloadFolderServiceAfter");

	var bs = getauthtokenfromlocal();
	var xhr = new XMLHttpRequest();
	xhr.open('POST', posturl, true);
	xhr.responseType = "blob";
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
	    if (xhr.readyState === 4) {
			if(xhr.status == 200){
				console.log("download done : " + idm);
			}
	    }
	};
	xhr.ontimeout = function (e) {
		console.log("download timeout : " + idm);
	};
	xhr.send();
	xhrPool.push(xhr);
}

function admFetchNotifOptionsService(){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotifOptionsURL;
	posturl = posturl.replace("<ACTION>", "admFetchNotifOptionsServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admFetchNotifSettingsService(){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotifSettingsURL;
	posturl = posturl.replace("<ACTION>", "admFetchNotifSettingsServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admInsertNotifSettingsService(json){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotifSettingsAddURL;
	posturl = posturl.replace("<ACTION>", "admInsertNotifSettingsServiceAfter");
	var extraparamjson = {"notifval":json.notificationType};
	invokeAdapterCallFromAdm(type, posturl, "", json, extraparamjson);
}

function admUpdateNotifSettingsService(json){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotifSettingsUpdateURL;
	posturl = posturl.replace("<ACTION>", "admUpdateNotifSettingsServiceAfter");
	var extraparamjson = {"notifval":json.notificationType};
	invokeAdapterCallFromAdm(type, posturl, "", json, extraparamjson);
}

function admDownloadLogsService(jsonInput, logtype, fromdt, fromtime, todt, totime){
	ajaxindicatorstart('please wait downloaing logs..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/genlogs/0/admDownloadLogsServiceAfter";

	var fname = "";
	var filename = "";
	if(logtype.indexOf("1-") == 0){
		var arr = logtype.split("-");
		if(arr[1] == "0"){
			fname = "All_Log";
		} else if(arr[1] == "1"){
			fname = "Upload_Log";
		} else if(arr[1] == "14"){
			fname = "Download_Log";
		} else if(arr[1] == "4"){
			fname = "Delete_Log";
		} else if(arr[1] == "2"){
			fname = "View_Log";
		}
	} else if(logtype == "2"){
		fname = "Share_Log";
	} else if(logtype == "4"){
		fname = "FolderPermission_Log";
	} else if(logtype == "5"){
		fname = "Login_Log";
	} else if(logtype == "6"){
		fname = "ActionOverUsers_Log";
	} else if(logtype == "7"){
		fname = "FilePermission_Log";
	}else if(logtype == "8"){
		fname = "Charts";
	}else if(logtype == "9"){
		fname = "Metadata_Log";
	}else if(logtype == "10"){
		fname = "User_Notification_Freq";
	}else if(logtype == "11"){
		fname = "DCirrus_AI";
	}
	if(logtype == "8"){
		filename = localStorage._zw+"_"+fname+"_"+fromdt+"_"+fromtime+"_"+todt+"_"+totime+".pdf";
	}else{
		filename = localStorage._zw+"_"+fname+"_"+fromdt+"_"+fromtime+"_"+todt+"_"+totime+".csv";
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
				admShowconfirmmsg(adm_Messages.requestnotsent, confirm_Error, 5000, "", false, false);
			}
		}
	};
	xhr.send(JSON.stringify(jsonInput));
	xhrPool.push(xhr);
}

function admCheckFolderSecurityService(folderId){
	ajaxindicatorstart('please wait processing..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFolder_Security_CheckURL;
	posturl = posturl.replace("<FOLDERID>", folderId);
	posturl = posturl.replace("<ACTION>", "admCheckFolderSecurityServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admFolderListAllServiceOnly(folderId,corpid){
	var jsonInput = {"attribute1":folderId,"attribute2":corpid};
	ajaxindicatorstart('expanding folder.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admSingleFolderInfoURL;
	posturl = posturl.replace("<ACTION>", "admFolderListAllServiceOnlyAfter");
	var extraparamjson = {"fdid":folderId};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admOTPSettingsService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/ots/0/fts/<OTPID>/<LAWFIRMID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "admOTPSettingsServiceAfter");
	posturl = posturl.replace("<OTPID>", 0);
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	invokeAdapterCallFromAdm(type, posturl, "", "", "");
}

function admSaveOTPRecordService(){
	var carrier = "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"-"+$("#mmobilenumber").val();
	var jsonInput = {"otpId":admotpId,"userId":localStorage._zv,"status":"A","carrieIdentifier":carrier};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admOTPSaveRecord;
	posturl = posturl.replace("<ACTION>", "admSaveOTPRecordServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admSaveFolderSizeService(){
	var jsonInput = adm_Folder_Size_JSON;
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/updatefoldersize/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "admSaveFolderSizeServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput,"");
}

function admSaveFolderSizeServiceWithSize(fNameAndId, fNameWithSize){
	var jsonInput = adm_Folder_Size_JSON;
	jsonInput.listAttribute1 = [];
	for (const [key, value] of fNameWithSize){
		if(`${key}` != undefined){
			jsonInput.listAttribute1.push(fNameAndId.get(`${key}`)+"#"+`${value}`);
		}
	}
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/updatefoldersize/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "admSaveFolderSizeServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput,"");
}

function admSaveFolderNoofFileService(){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admUpdateNoofFileFolderRecord;
	posturl = posturl.replace("<ACTION>", "admSaveFolderNoofFileServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "","");
}

function admSaveStorageProviderService(){
	ajaxindicatorstart('processing request.. please wait..');
	hideActionPopup("updatestoragemodal");
	var jsonInput = admStorageProviderJson();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admUpdateStorageProvider;
	posturl = posturl.replace("<ACTION>", "admSaveStorageProviderServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput,"");
}

function admSaveFolderSizeSingleFolderIdService(){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admSaveFolderSizeSingleFolderIdURL;
	var jsonInput = {"attribute1":admCopyParentId,"attribute2":JSON.stringify(tempTotalSize),"attribute3":admCopyFolderType};
	posturl = posturl.replace("<ACTION>", "admSaveFolderSizeSingleFolderIdServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admUpdateUserWebNotifTokenService(jsonInput){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/update/web/notification/token";
	posturl = posturl.replace("<ACTION>", "admUpdateUserWebNotifTokenServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admFetchForumNotifService(){
	admFormBusy = true;
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admforumFetchNotifURL;
	var jsonInput = {"action":"admFetchForumNotifServiceAfter"};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admDeleteForumNotifService(threadId){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admforumDeleteNotifURL;
	var jsonInput = {"action":"admDeleteForumNotifServiceAfter", "threadId":threadId};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admOpenFilePermissionService(folderId){
	ajaxindicatorstart('loading data.. please wait..');
	var type = updateMethod;
	var jsonInput = {"docIds":admselecteddocids, "folderId":folderId, "action":"admOpenFilePermissionServiceAfter"};
	var posturl = cloudApiUrlACMS+admfetchFilePermissionURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admfetchActiveLoginIdsService(){
	/*var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admAllUserURL;
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<ACTION>", "admfetchActiveLoginIdsServiceAfter");
	invokeAdapterCallFromAdm(type, posturl, "", "", "");*/
}

function admSaveFilePermissionService(jsonInput){
	ajaxindicatorstart('Saving data.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admAddFilePermissionURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admChangeStorageClassService(folderId, storageClass){
	var jsonInput = {
		"attribute1":folderId,
		"attribute2":storageClass,
		"attribute3":"admChangeStorageClassServiceAfter"
	};
	var extraparamjson = {"storageclass":storageClass};
	ajaxindicatorstart('Preparing to archive folder.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDocChangeStorageClasseURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admChangeNotifStatusService(){
	var jsonInput = {
		"attribute1":"admChangeNotifStatusServiceAfter"
	};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+changeNotifStatusURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admDRMFetchService(fileIds, folderIds){
	ajaxindicatorstart('fetching data.. please wait..');
	var jsonInput = {
		"attribute1":"admDRMFetchServiceAfter",
		"attribute2":fileIds,
		"attribute3":folderIds
	};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDRMFetchURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admDRMAddService(allowPrint, expiryDate, isblocking){
	ajaxindicatorstart('Saving data.. please wait..');
	var extraparamjson = [];
	var jsonInput = {"drmList":[]};
	$('input.admcheckbox:checked').each(function(i, obj) {
		var idm = (this.id).replace("adm_doc_checkbox_", "");
		var docid = $(this).attr("data-id");
		var folderid = $(this).attr("data-folderid");
		var date = new Date();
		var sm = {
			"fileId":docid,
			"folderId":folderid,
			"allowPrint":allowPrint,
			"expiryDate":expiryDate,
			"timeZoneOffsetMinutes":date.getTimezoneOffset(),
			"action":"admDRMAddServiceAfter",
			"isBlockAll": isblocking
		};
		jsonInput.drmList.push(sm);
		extraparamjson.push({"index":idm, "expiryDate":expiryDate});
	});
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDRMAddURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admDRMAddByFolderIdService(allowPrint, expiryDate, folderId, isblocking){
	ajaxindicatorstart('Saving data.. please wait..');
	var extraparamjson = {"folderId": folderId};
	var date = new Date();
	var jsonInput = {
		"attribute1":"admDRMAddByFolderIdServiceAfter",
		"attribute5":folderId,
		"attribute4":allowPrint,
		"attribute6":isblocking,
		"dateAttribute8":expiryDate,
		"attribute7":date.getTimezoneOffset(),
	};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDRMByFolderAddURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admDRMDeleteService(fileIds, folderIds, indexes){
	ajaxindicatorstart('Deleting data.. please wait..');
	var jsonInput = {
		"attribute1":"admDRMDeleteServiceAfter",
		"attribute2":fileIds,
		"attribute3":folderIds
	};
	var extraparamjson = {"indexes":indexes};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDeleteDRMAddURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admDRMDeleteByFolderService(folderId){
	ajaxindicatorstart('Deleting data.. please wait..');
	var jsonInput = {
		"attribute1":"admDRMDeleteServiceAfter",
		"attribute2":"",
		"attribute3":folderId
	};
	var type = updateMethod;
	var extraparamjson = {"folderId": folderId};
	var posturl = cloudApiUrlACMS+admDeleteDRMFolderURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

//method to call backend to get file id list to download in a zip file
function downloadAllfile(startTime,endTime){
	var jsonInput = {"attribute1":"downloadAllFileServiceAfter","attribute8":startTime,"attribute9":endTime};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+allFileDownloadURL;
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput,"");
}

function admRegenerateQRCodeService(){
	ajaxindicatorstart('please wait..');
	var jsonInput = {"attribute1":"admRegenerateQRCodeServiceAfter"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/uts/0/regen/authenticator";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admCheckValidpassService(){
	ajaxindicatorstart('please wait..');
	var jsonInput = {"attribute1":"admCheckValidpassServiceAfter", "attribute2":$("#txt_pass_auth").val().trim()};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/check/valid/user";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admFetchSearchIndexService() {
	ajaxindicatorstart('please wait..');
	var jsonInput = {"attribute1":"admFetchSearchIndexServiceAfter", "attribute2":$("#txt_search_index").val().trim()};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/search/text";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admCheckSearchIndexService() {
	var jsonInput = {"action":"admCheckSearchIndexServiceAfter", "lawFirmNumber":localStorage._zu};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/search/data/source";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admSyncNowSearchIndexService() {
	var jsonInput = {"attribute1":"admSyncNowSearchIndexServiceAfter", "attribute2":localStorage._zu};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/sync/data/source";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admSearchIndexRequestService(){
	var jsonInput = {"attribute1":"admSearchIndexRequestServiceAfter", "attribute2":$("#admcontenttextarea").val()};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/send/ai/enable/request";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admFetchdataSourceService() {
	ajaxindicatorstart('fetching data.. please wait..');
	var jsonInput = {"action":"admFetchdataSourceServiceAfter","lawFirmNumber":localStorage._zu};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/contentsearch/0/list/data/source";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function admFetchAIDocumentService(docId, filename, idm) {
	var extraparamjson = {"docId":docId,"filename":filename, "idm":idm};
	var jsonInput = {"attribute1":"admFetchAIDocumentServiceAfter","attribute2":docId};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/unindexdocviewer/0/view/AI";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admUnlockPdfService(val, captcha, idm) {
	var extraparamjson = {"idm":idm};
	var jsonInput = {"attribute1":"admUnlockPdfServiceAfter","attribute2":val,"attribute3":captcha, "attribute7":selectedFileId};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/unindexdocviewer/0/unlock/view/AI";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function updateUserSortingService(sorting){
	var sortingOrder = 1;
	if(sorting.split("`")[0] == "ASC") sortingOrder = 0;
	else if(sorting.split("`")[0] == "DESC") sortingOrder = 1;
	var jsonInput = {"attribute1":sorting.split("`")[1],"attribute2":sortingOrder};
	var type = "POST";
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/update/user/document/sorting";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}











