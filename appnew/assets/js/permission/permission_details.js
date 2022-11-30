function fetchAllAdmFolderListResponse(response){
	previousidm = "";
	var extraParam = response.extrajsonparam;
	var foldertype = extraParam.foldertype;
	var copy = extraParam.copy;

	if(foldertype == admpersonaltype) admpersonaltyperetrieved = true;
	else if(foldertype == admsharedtype) admsharedtyperetrieved = true;

	if(!copy){
		admcurrentpath = "";
		admcurrentfoldertype = foldertype;
		admcurrentfolderid = 0;
	}

	if((response.error+"") == "false" && response.object != null) {
		admids = 1;
		var data = response.object;
		if(foldertype == admpersonaltype) {
			admPersoanlFoldersList = [];
			admPersoanlFoldersFileCount = [];
			if(data.length>0) $("#"+admpersonalfilesul_+admpersonaltype+"1_0xxx").remove();
		} else if(foldertype == admsharedtype) {
			admSharedFoldersList = [];
			if(data.length>0) $("#"+admpersonalfilesul_+admsharedtype+"1_0xxx").remove();
			else{
				ajaxindicatorstop();
				admShowconfirmmsg(permission_messages.nofoldersareavailable, confirm_Error, 5000, "", false, false);
			}
			admSharedFoldersFileCount = [];
		}

		var folderparnetid = 0;
		if(data != null && data.length > 0 && data != "null") {
			var tempJSON = {};
			var tempJSONPermission = {};
			LoopFolderListZeroLevel(data,copy);
		} else {
			admShowNoDataFoundTable();
		}

		loadTreeResponseOnPageChange(response);
	}

	ajaxindicatorstop();

	admUserListService();

	globalvariable.screenloadednew = true;
	permenabledisablebutton();

	$("#default-tree-"+admcurrentfoldertype).show();
	loggedin = true;
	var pHeight = $(window).height();
	var heightdeduct = 66;
	$('.page-wrapper').css('height', (pHeight-heightdeduct));
	$('.content-page').css('height', (pHeight-heightdeduct));
	$('#default-tree-S').css('height', (pHeight-heightdeduct));

	$(".draghandle").css("width","2px");
	$(".draghandle").css("cursor","ew-resize");
	duePaymentService();
}

/**
 * method to loop through file list
 */
function admLoopFolderList(folderparentid, foldertype){
	var folderList = [];
	if(foldertype == admpersonaltype) {
		folderList = admPersoanlFoldersList;
	} else if(foldertype == admsharedtype) {
		folderList = admSharedFoldersList;
	}

	if(folderList != null && folderList.length > 0){
		var datahtml='';
		for(var i=0;i<folderList.length;i++) {
			datahtml='';
			var folderpath = folderList[i];
			var folderIndex = admListFolderIndexIdMain[folderpath];
			if(folderIndex != null && folderIndex != undefined && folderIndex.length > 0){
				folderIndex = folderIndex + "-";
			} else {
				folderIndex = "";
			}

			var k = [];
			if(foldertype == admpersonaltype ) {
				k = admPersoanlFoldersFileCount[i];
			} else if(foldertype == admsharedtype) {
				k = admSharedFoldersFileCount[i];
			}
			var km = k[folderpath].split("#");
			var folderid = km[0];
			var foldername = folderpath;

			try{
				foldername = foldername.substring(foldername.lastIndexOf("/")+1);
			}catch(error){}

			var nooffiles = km[1];
			var status = km[2];

			var topd = false;
			var topm = false;
			if(foldername.toLowerCase().trim() == "dcirrus"){
				topd = true;
			} else if(foldername.toLowerCase().trim() == "mymobile"){
				topm = true;
			}
			var foldernameact = foldername;

			var gm = adm_parentfolderid[folderid]+""
			adm_parentfolderid[folderid] = "0#"+nooffiles+"#"+folderpath+"#"+foldertype+"#"+status;
			adm_parentfolderpath[folderpath+"#"+foldertype] = "0#"+nooffiles+"#"+folderid+"#"+status+"#"+folderpath;
		}

		if(folderparentid == "0"){
			ajaxindicatorstop();
		}
	}

	admcurrentpath = "";
	admcurrentfoldertype = foldertype;
	admcurrentfolderid = folderparentid;
}

function admLoopFolderListAddMore(parentid, foldername, folderpath, folderType, folderid, nooffiles, folderPermissions, status, i){
	admSharedFoldersPermission[folderid] = folderPermissions;

	var datahtml='';
	var foldername = folderpath;
	var folderIndex = admListFolderIndexIdMain[folderpath];
	if(folderIndex != null && folderIndex != undefined && folderIndex.length > 0){
		folderIndex = folderIndex + "-";
	} else {
		folderIndex = "";
	}

	try{
		foldername = foldername.substring(foldername.lastIndexOf("/")+1);
	}catch(error){}

	var gm = adm_parentfolderid[folderid]+""
	adm_parentfolderid[folderid] = parentid+"#"+nooffiles+"#"+folderpath+"#"+folderType+"#"+status;
	adm_parentfolderpath[folderpath+"#"+folderType] = parentid+"#"+nooffiles+"#"+folderid+"#"+status+"#"+folderpath;
}

/**
 * method to post action for delete folder
 * @param data
 */
function admDeleteFolderServiceAfter(data){
	ajaxindicatorstop();

	if(data.error == false && data.messageCode == 202){
		var extraparam = data.extrajsonparam;
		var mk = adm_parentfolderid[extraparam.folderid].split("#");// = "0#"+nooffiles+"#"+folderpath+"#"+foldertype+"#"+status;
		delete adm_parentfolderid[extraparam.folderid];
		ajaxindicatorstart('loading data.. please wait..');
		hideActionPopup("deleteconfirmmodal");
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		admDeleteFolderPathLocal(mk[2]);
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(permission_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(permission_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

/**
 * method to post action for delete folder
 * @param data
 */
function admRestoreFolderServiceAfter(data){
	ajaxindicatorstop();
	if(data.error == false && data.messageCode == 202) {
		ajaxindicatorstart('loading data.. please wait..');
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
	} else {
		admShowconfirmmsg(permission_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

/**
 * method yo invoked after service action add new folder service
 * @param data
 */
function admAddNewFolderServiceAfter(data){
	$('#createfoldermodal').modal('hide');
	addNewFolderSetup();
	if(data.error == false && data.messageCode == 201 && data.message != "FOLDEREXISTS"){
		admShowconfirmmsg(permission_messages.createfolderdone, confirm_Success, 5000, "", false, false);
		ajaxindicatorstart('loading data.. please wait..');
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		//admResetTree();
		var parentid = data.extrajsonparam.parentid;
		admFolderListAllService(parentid);
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(permission_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "FOLDEREXISTS"){
			admShowconfirmmsg(permission_messages.folderexists, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(permission_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

/**
 * method to post action rename folder service
 * @param data
 */
function admRenameNewFolderServiceAfter(data){
	hideActionPopup("rename_foldermodal");
	addRenameFolderSetup();
	if(data.error == false && data.messageCode == 202){
		admShowconfirmmsg(permission_messages.renamefolderdone, confirm_Success, 5000, "", false, false);
		ajaxindicatorstart('loading data.. please wait..');
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		admResetTree();
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(permission_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "FOLDEREXISTS"){
			admShowconfirmmsg(permission_messages.folderexists, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(permission_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

/**
 * methiod ot display folders and files from second leve onwards
 * @param response
 */
function fetchAllAdmFolderChildListResponse(response){
	if(response == null || response.error == true || response.object == null){
		admShowconfirmmsg(permission_messages.foldernolongerexists, confirm_Error, 5000, "", false, false);
		setInterval(function () {
			location.reload();
		}, 1000);
	} else {
		$("#admfolderheader").show();
		if (adm_documentmaxlimit == 0) {
			admRefreshDone = true;
			$("#tbldatarows").html("");
			$("#tbldatarows").empty();
			$("#tbldatarows").attr("data-rowdispl", 0);
			if ($("#searchpopup").css("display") == "none") {
				admtotaldocs = 0;
			}
			admDocumentJson = "";
		}

		$("#admallcheckboxlabel").hide();
		//$("#"+adm_lbl).hide();

		if ((response.error + "") == "false" && response.object != null) {
			adm_documentmaxlimit = adm_documentmaxlimit + maxlimitlistadd;
			var data = response.object;
			var extraParam = response.extrajsonparam;
			var foldertype = extraParam.foldertype;
			var folderfetch = extraParam.folderfetch;
			//admDocumentJson = data.unIndexDocumentsList;

			if (data != null && data != "null") {
				downloadallowed = true;
				outshareallowed = true;
				inshareallowed = true;
				deleteallowed = true;
				copyallowed = true;
				moveallowed = true;
				try { if (data.unIndexSharedFolderSecurityDto.download == "N") downloadallowed = false; } catch (error) { }
				try { if (data.unIndexSharedFolderSecurityDto.outboundShare == "N") outshareallowed = false; } catch (error) { }
				try { if (data.unIndexSharedFolderSecurityDto.inboundShare == "N") inshareallowed = false; } catch (error) { }
				try { if (data.unIndexSharedFolderSecurityDto.delete == "N") deleteallowed = false; } catch (error) { }
				try { if (data.unIndexSharedFolderSecurityDto.copy == "N") copyallowed = false; } catch (error) { }
				try { if (data.unIndexSharedFolderSecurityDto.move == "N") moveallowed = false; } catch (error) { }

				try {
					var perm = admSharedFoldersPermission[admcurrentfolderid].split("#");
					if (perm[3] == "N") {
						inshareallowed = false;
					}
				} catch (error) { }

				//populate folders on left
				if ($("#searchpopup").css("display") == "none") {
					admttotalfile = data.noOfFiles;
					try {
						if (data.unIndexFoldersList != null && folderfetch == true) {
							var folderType = admcurrentfoldertype;
							var parentid = admcurrentfolderid;
							var datafolder = data.unIndexFoldersList;
							for (var i = 0; i < datafolder.length; i++) {
								var folderPath = datafolder[i].folderPath;
								var foldername = folderPath;
								admListFolderIndexIdMain[folderPath] = datafolder[i].folderIndex;
								if (folderPath.indexOf("/") > 0) foldername = folderPath.substring(folderPath.lastIndexOf("/") + 1);
								admLoopFolderListAddMore(parentid, foldername, folderPath, folderType, datafolder[i].folderId, datafolder[i].noOfFiles, datafolder[i].folderPermissions, datafolder[i].status, i);
							}
							var dtobj = { error: false, object: data.unIndexFoldersList };
							admFolderListAllServiceAfter(dtobj);
						}
					} catch (error) {
						console.log(error);
					}
				}
			}
		}

		adm_documentfetchdone = true;
		ajaxindicatorstop();
		admSetFolderHeaderCaption();
		var pHeight = $(window).height();
		var heightdeduct = 148;
		$('.page-wrapper').css('height', (pHeight - heightdeduct));
		$('.content-page').css('height', (pHeight - heightdeduct));
	}
}

/**
 * method to build UI for list users after userlist service
 * @param data
 */
function admBuildUserList(response){
	$("#tableHeadPages").hide();
	$("#divpages").html("");
	$("#secttt-one").css("height", "4%");
	displaycounter = 0;
	userlistarrar = [];
	sharedsecuritylen = 0;
	$("#tbl_permission > tbody").empty();
	var data = response.object;
	console.log("data.length == "+data.length);
	// admUserList = sortJSONByAttribute(data, "firstName", true, "string");

	var j = 0;
	pagecount = parseInt(data.length/maxrows) + 1;
	var count = 0;
	userlistarrar = [];
	userlistarrartemp = [];
	for(var i=0;i<=data.length-1;i++){
		userlistarrartemp[j] = data[i];
		if((j == maxrows-1) || (count == pagecount-1 && i == data.length-1)) {
			j = 0;
			userlistarrar[count++] = userlistarrartemp;
			$("#divpages").append("<a href='javascript:void(0);' style='margin-right:10px;' class='pagecount' id='pagecount_"+count+"' "+
			"onclick='admBuildUserListUI("+(count-1)+");'>"+count+"</a>");
			userlistarrartemp = [];
		} else {
			j++;
		}
	}
	admBuildUserListUI(displaycounter);
	if(pagecount > 1){
		$("#tableHeadPages").show();
		$("#secttt-one").css("height", "11%");

		var msgHeight = $(window).height() - 162;
		$('#divtable').height(msgHeight);

		var msgWidth = $(window).width() - 100;
		$('#divpages').css("max-width", msgWidth);
		$('#divpages').css("overflow", "auto");
		if ( $.browser.webkit) {
			$('#divpages').addClass("scrollable-element");
		}else{
			$('#divpages').addClass("scrollable-elements");
		}
	}
}

function admBuildUserListUI(counter){
	$(".pagecount").addClass("pagecounts");
	$(".pagecount").css("color", "#9f9797");
	$(".pagecount").css("font-size", "14px");
	$(".pagecount").css("font-weight", "normal");
	$(".pagecount").css("text-decoration", "none");

	$("#pagecount_" + (counter + 1)).css("color", "#2abfc1");
	$("#pagecount_" + (counter + 1)).css("font-size", "17px");
	$("#pagecount_" + (counter + 1)).css("font-weight", "bold");
	$("#pagecount_" + (counter + 1)).css("text-decoration", "underline");
	fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);

	displaycounter = counter;
	permcurrentval = displaycounter*maxrows;
	sharedsecuritylen = permcurrentval;

	$("#tbl_permission > tbody").empty();
	var data = userlistarrar[counter];
	for(var i=0;i<=data.length-1;i++){
		var username = data[i].firstName;
		if((data[i].middleName + "") != "null" && (data[i].middleName + "") != ""){
			username += " " + data[i].middleName;
		}
		if((data[i].lastName + "") != "null" && (data[i].lastName + "") != ""){
			username += " " + data[i].lastName;
		}
		adm_User_Array[data[i].userId] = username;
		if(localStorage._zv == data[i].userId) {
			if(data[i].userTypeId == "ADMIN") admdidmx = 0;
			else if(data[i].userTypeId == "USER") admdidmx = 1;
			else admdidmx = 2;
		} else {
			var usertype = "";
			if(data[i].userTypeId == "ADMIN") usertype = 1;
			else if(data[i].userTypeId == "USER") usertype = 0;
			else usertype = 2;
			var fontweight = usertype==1?"font-weight:bold":"";

			data[i]["index"+data[i].userId] = sharedsecuritylen;

			var disabled = (parseInt(admTreeFolderSelectedId) > 0 ? " " : " disabled");

			var datahtml = "";
			var datavar = "data-userid='"+data[i].userId+"' data-usertype='"+usertype+"' data-pid='0'";
			datahtml += "<tr id='adm_security_row_"+sharedsecuritylen+"' "+datavar+">";
			var datahtml = "";
			var datavar = "data-userid='"+data[i].userId+"' data-usertype='"+usertype+"' data-pid='0'";
			datahtml += "<tr id='adm_security_row_"+sharedsecuritylen+"' "+datavar+"  style='"+fontweight+"' class='userpermrow'>";
			datahtml += "<th scope='row'>";
			datahtml += "<div class='form-check ml-1 mb-4'>";
			datahtml += "<input type='checkbox' class='form-check-input' data-toggle='tooltip' title='"+username+"' id='adm_security_checkbox_"+sharedsecuritylen+"' "+datavar+ " "+disabled+"/>";
			datahtml += "</div>";
			datahtml += "</th>";
			datahtml += "<td style='word-break: break-word;'>";
			datahtml += username;
			datahtml += "</td>";
			datahtml += "<td style='word-break: break-word; '>"+data[i].loginId+"</td>";
			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_view_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";

			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4' style='margin-left: 43% !important;'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_download_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";

			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4' style='margin-left: 46% !important;'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_download_org_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";

			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_share_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";
			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_deposit_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";
			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_delete_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";
			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_copy_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";
			datahtml += "<td><div class='form-check mt-0 mb-0 mllll-4'>";
			datahtml += "<input type='checkbox' class='form-check-input adm_userpopupcheckboxcustom_Cls' id='adm_sec_checkbox_move_"+sharedsecuritylen+"' "+datavar+" "+disabled+">";
			datahtml += "</div></td>";
			datahtml += "<td><i class='fa fa-repeat fa-lg mt-2 mb-0 mllll-4' aria-hidden='true' style='display:none;' id='adm_sec_checkbox_reset_"+sharedsecuritylen+"' "+datavar+"></i></td>";

			datahtml += "</tr>";
			$("#tbl_permission > tbody").append(datahtml);
			sharedsecuritylen++;
		}
	}
	if(parseInt(admTreeFolderSelectedId) > 0){
		admFetchFolderSharedSecurityService(admTreeFolderSelectedId);
	}
}

function admFolderListAllServiceAfter(response){
	fetchAllFolderListLevelDetails(true, admcurrentfoldertype, response.extrajsonparam.folderId, false, true);
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		admids = 1;
		var foldertype = admcurrentfoldertype;
		var data = response.object;
		if(admFolderTreeLoaded == false || (extraParam != null && extraParam != undefined && extraParam.folderId == 0)){
			if(foldertype == admpersonaltype) {
				admPersoanlFoldersList_local = [];
				admPersoanlFoldersFileCount_local = [];
			} else if(foldertype == admsharedtype) {
				admSharedFoldersList_local = [];
				admSharedFoldersFileCount_local = [];
			}
			admListData = [];
			admListDataId = [];
			admListFolderIndexId = [];
		}

		var folderparnetid = 0;
		if(adm_folder_list != null) data = adm_folder_list;
		else data = folderListSortSort(data, "folder");
		if(data != null && data.length > 0 && data != "null") {
			var tempJSON = {};
			var tempJSONPermission = {};
			for(var i=0;i<=data.length-1;i++){
				tempJSON = {};
				tempJSONPermission = {};
				var folderIndex = data[i].folderIndex;
				if(folderIndex != null && folderIndex != undefined && folderIndex.length > 0){
					folderIndex = folderIndex + "-";
				}

				if(i == 0){
					var fpath = "Root";
					var fdid = 0;
					if(admListData[fpath] == null || admListData[fpath] == undefined){
						tempJSON[fpath] = "0#0#A";
						if(foldertype == admpersonaltype) {
							admPersoanlFoldersList_local.push(fpath+"#0");
							admPersoanlFoldersFileCount_local.push(tempJSON);
						} else if(foldertype == admsharedtype) {
							admSharedFoldersList_local.push(fpath+"#0");
							admSharedFoldersFileCount_local.push(tempJSON);
						}

						admListData[fpath] = "0#0#A";
						admListDataId[fdid] = fpath;
						adm_parentfolderpath[fpath+"#"+foldertype] = "-1#0#0#A#"+fpath;
						admListFolderIndexId[fdid] = 0;
					}
				}

				var fdid = data[i].folderId;
				var actfpath = data[i].folderPath;
				if(actfpath.toLowerCase().indexOf("dcirrus") == 0){
					actfpath = actfpath.replace("dcirrus", "DCirrus Sync");
					if(actfpath.toLowerCase().indexOf("dcirrus") == 0) actfpath = actfpath.replace("DCirrus", "DCirrus Sync");
				}
				var fpath = "Root/"+actfpath;
				var status = data[i].status;
				var nfile = data[i].noOfFiles;
				folderparnetid = data[i].parentFolderId;
				if(admListData[fpath] == null || admListData[fpath] == undefined){
					var nooffilesinfo = fdid + "#" + data[i].noOfFiles + "#" + status;
					tempJSON[fpath] = nooffilesinfo;
					if(foldertype == admpersonaltype) {
						admPersoanlFoldersList_local.push(fpath+"#"+fdid);
						admPersoanlFoldersFileCount_local.push(tempJSON);
					} else if(foldertype == admsharedtype) {
						admSharedFoldersList_local.push(fpath+"#"+fdid);
						admSharedFoldersFileCount_local.push(tempJSON);
					}

					admListData[fpath] = nooffilesinfo;
					admListDataId[fdid] = fpath;
					//adm_parentfolderpath[fpath+"#"+foldertype] = folderparnetid+"#"+nfile"#"+fdid+"#"+status+"#"+fpath;
					admListFolderIndexId[fdid] = data[i].folderIndex;

					if(adm_parentfolderpath[actfpath] == null || adm_parentfolderpath[actfpath] == undefined){
						adm_parentfolderid[fdid] = folderparnetid+"#"+nfile+"#"+actfpath+"#"+foldertype+"#"+status;
						adm_parentfolderpath[actfpath+"#"+foldertype] = folderparnetid+"#"+nfile+"#"+fdid+"#"+status+"#"+actfpath;
					}
				}
			}

			var dataobj = undefined;
			if(foldertype == admpersonaltype ) {
				dataobj = admBuildJSONTree(admPersoanlFoldersList_local);
			} else if(foldertype == admsharedtype) {
				dataobj = admBuildJSONTree(admSharedFoldersList_local);
			}

			admBuildUIFirst(dataobj, foldertype, 1);
		}
		admFolderTreeLoaded = true;
	}

	var treeid = "default-tree-"+admcurrentfoldertype;
	$('#'+treeid).treeview('collapseAll', {silent: true});
	var selectNodeR = -1;

	if(selectednodeid > -1){
		selectNodeR = selectednodeid;
	}

	if(admcurrentfolderid > 0 && admSetSelectedNodeFromMain){
		var nodeId = nodesList[admcurrentfolderid];
		selectNodeR = nodeId;
		admSetSelectedNodeFromMain = false;
	} else if(selectednodeid > -1){
		selectNodeR = selectednodeid;
	}

	if(selectNodeR > -1){
		$('#'+treeid).treeview('revealNode', [ selectNodeR, { silent:true } ]);
		$('#'+treeid).treeview('expandNode', [ selectNodeR, { silent:true } ]);
		$('#'+treeid).treeview('selectNode', [ selectNodeR, { silent:true } ]);
		alldisabled = 1;
		permenableallactions();
	} else {
		$('#'+treeid).treeview('expandNode', [ 0, { silent:true } ]);
		$('#'+treeid).treeview('selectNode', [ 0, { silent:true } ]);
	}

	fetchLogoService();
}

function admUserListServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		if(data != null && data.length > 0){
			if(response.overwrite == undefined || response.overwrite == null ){
				admUserList = sortJSONByAttribute(data, "firstName", true, "string");
			}
			admBuildUserList(response);
		}else{
			$("#tbl_permission > tbody").empty();
		}
	}
}

function admFetchFolderSharedSecurityServiceAfter(response){
	ajaxindicatorstop();
	var show = true;
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		var useridls = ",";
		var sm = [];
		if(data != null && data.length > 0){
			for(var i=0;i<=data.length-1;i++){
				var downloadchecked = data[i].download + "";
				if(downloadchecked == "Y") downloadchecked = true;
				else downloadchecked = false;

				var downloadoriginalchecked = data[i].downloadOriginal + "";
				if(downloadoriginalchecked == "Y" || downloadoriginalchecked == "null") downloadoriginalchecked = true;
				else downloadoriginalchecked = false;

				var outsharechecked = data[i].outboundShare + "";
				if(outsharechecked == "Y") outsharechecked = true;
				else outsharechecked = false;

				var insharechecked = data[i].inboundShare + "";
				if(insharechecked == "Y") insharechecked = true;
				else insharechecked = false;

				var deletechecked = data[i].delete + "";
				if(deletechecked == "Y") deletechecked = true;
				else deletechecked = false;

				var copychecked = data[i].copy + "";
				if(copychecked == "Y") copychecked = true;
				else copychecked = false;

				var movechecked = data[i].move + "";
				if(movechecked == "Y") movechecked = true;
				else movechecked = false;

				sm.push({"userid":data[i].userId,"download":downloadchecked,"downloadOriginal":downloadoriginalchecked,"outshare":outsharechecked,"inshare":insharechecked,"delete":deletechecked,"copy":copychecked,"move":movechecked, "id":data[i].id, "status":data[i].status});
			}
		}
		for(var idm=0;idm<sharedsecuritylen;idm++){
		    var viewidm = "adm_sec_checkbox_view_" + idm;
		    var downloadidm = "adm_sec_checkbox_download_" + idm;
		    var downloadorgidm = "adm_sec_checkbox_download_org_" + idm;
		    var outshareidm = "adm_sec_checkbox_share_" + idm;
		    var inshareidm = "adm_sec_checkbox_deposit_" + idm;
		    var deleteidm = "adm_sec_checkbox_delete_" + idm;
		    var copyidm = "adm_sec_checkbox_copy_" + idm;
		    var moveidm = "adm_sec_checkbox_move_" + idm;
		    var mainidm = "adm_security_checkbox_" + idm;

		    var userid = $("#adm_security_row_"+idm).attr("data-userid");
		    var userType = $("#adm_security_row_"+idm).attr("data-usertype");
			$("#adm_security_row_"+idm).attr("data-pid", "0");
			$("#"+viewidm).prop('checked', true);
			$("#"+mainidm).prop('checked', true);
			$("#"+downloadidm).prop('checked', true);
			$("#"+downloadorgidm).prop('checked', true);
			$("#"+outshareidm).prop('checked', true);
			$("#"+inshareidm).prop('checked', true);
			$("#"+deleteidm).prop('checked', true);
			$("#"+copyidm).prop('checked', true);
			$("#"+moveidm).prop('checked', true);
			$("#adm_security_row_"+idm).attr("data-prvstatus", "true#true#true#true#true#true#true#true");
			sm.forEach(function(entry) {
				if (entry.userid == userid) {
					$("#adm_security_row_"+idm).attr("data-pid", entry.id);
					var prvst = "";
					if(entry.status == "A") {
						$("#"+viewidm).prop('checked', true);
						$("#"+mainidm).prop('checked', true);
						$("#"+downloadidm).prop('checked', entry.download);
						$("#"+downloadorgidm).prop('checked', entry.downloadOriginal);
						$("#"+outshareidm).prop('checked', entry.outshare);
						$("#"+inshareidm).prop('checked', entry.inshare);
						$("#"+deleteidm).prop('checked', entry.delete);
						$("#"+copyidm).prop('checked', entry.copy);
						$("#"+moveidm).prop('checked', entry.move);
						prvst = "true#" + entry.download + "#" + entry.outshare + "#" + entry.inshare + "#" + entry.delete + "#" + entry.copy + "#" + entry.move + "#" + entry.downloadOriginal;
						$("#adm_security_row_"+idm).attr("data-prvstatus", prvst);
					} else if(entry.status == "I") {
						$("#"+viewidm).prop('checked', false);
						$("#"+mainidm).prop('checked', false);
						$("#"+downloadidm).prop('checked', false);
						$("#"+downloadorgidm).prop('checked', false);
						$("#"+outshareidm).prop('checked', false);
						$("#"+inshareidm).prop('checked', false);
						$("#"+deleteidm).prop('checked', false);
						$("#"+copyidm).prop('checked', false);
						$("#"+moveidm).prop('checked', false);
						prvst = "false#false#false#false#false#false#false#false";
						$("#adm_security_row_"+idm).attr("data-prvstatus", prvst);
					}
				}
			});
		}
		for(var i=0;i<sharedsecuritylen;i++){
			permSharedSecuirtyRowEvent(i);
		}
	} else if(response.message == "NOPERMISSION"){
		show = false;
		admShowconfirmmsg(permission_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		window.location.href = "error.html";
	}
}

function admSaveSharedFolderSecurityServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 201){
		admShowconfirmmsg(permission_messages.admsharedfoldersecurityadded, confirm_Success, 5000, "", false, false);
		//permresetall();
		$(".form-check-input").prop("checked", false);
		admFetchFolderSharedSecurityService(admTreeFolderSelectedId);
	}else{
		admShowconfirmmsg(permission_messages.admsharedfoldersecuritynotadded, confirm_Error, 5000, "", false, false);
	}
}

function permissionStorageCheckSessionServiceAfter(response){
	currentservicemethodafter = "";
	if(response.error == true){
		window.location.href = "error.html";
	}
}

