function fetchAllAdmFolderListResponse(response){
	admClearFolderFileCache();
	previousidm = "";
	var extraParam = response.extrajsonparam;
	var foldertype = extraParam.foldertype;
	var copy = extraParam.copy;

	abortingajax = true;

	admDefaultSortCheck();

	if(foldertype == admpersonaltype) admpersonaltyperetrieved = true;
	else if(foldertype == admsharedtype) admsharedtyperetrieved = true;

	if(!copy){
		admcurrentpath = "";
		admcurrentfoldertype = foldertype;
		admcurrentfolderid = 0;
	}

	if((response.error+"") == "false" && response.object != null) {
		var folderparnetid = 0;
		var data = response.object;
		if(data != null && data.length > 0 && data != "null") {
			var tempJSON = {};
			var tempJSONPermission = {};

			admLoopFoldeListZeroLevel(data,copy);
		} else {
			admShowNoDataFoundTable();
		}

		loadTreeResponseOnPageChange(response);
	}

	admfetchActiveLoginIdsService();
	admSingleUserProfileService();
	try{
		initializeFirebaseMessaging();
	}catch(error){
		console.log(error);
	}

	if(!admForumDBFetchDone){
		admFetchForumNotifService();
	}

	screenloadednew = true;

	$("#default-tree-S").hide();
	$("#default-tree-P").hide();
	$("#default-tree-"+admcurrentfoldertype).show();

	$("#ul_more").hide();
	admFetchStorageLeftService(false);
	loggedin = true;

	if(foldertype == "P"){
		$("#adm_rebuildindex").show();
		$("#div_perm").attr("title", "Data Room Access Controls");
	}
	// hide rebuild index icon for individual user and show admin icon for individual user;
	if(localStorage._zs == "B") { // B stand for Business User
		$("#dropdownMenuLink").show();
		$("#admin_module_individual").hide();
		$("#adm_rootprjindex").show();

		$("#btn_forum").hide();
		$("#btn_forum_notif").hide();
		if(localStorage._zmd != null && localStorage._zmd != undefined && (localStorage._zmd).split(",").includes("1")){
			$("#btn_forum").show();
			$("#btn_forum_notif").show();
		}

		$("#btn_todolist").hide();
		if(localStorage._zmd != null && localStorage._zmd != undefined && (localStorage._zmd).split(",").includes("5")){
			$("#btn_todolist").show();
		}

		$("#adm_file_permission").show();
		$("#adm_notifications").show();
	}else{
		$("#admin_module_individual").show();
		$("#adm_rebuildindex").hide();
		$("#dropdownMenuLink").hide();
		$("#adm_notifications").hide();
		$("#adm_notifications_hr").remove();
		$("#adm_rootprjindex").hide();
		$("#adm_projectindex").hide();
		$("#btn_forum").hide();
		$("#btn_forum_notif").hide();
		$("#adm_file_permission").hide();
	}
	// hide rebuild index icon for individual user and show admin icon for individual user;

	if(localStorage._zp == "1" && window.location.href.indexOf("drive.html") > 0){
		$("#admin_module").show();
		if(localStorage._zs == "B") {
			$("#adm_rebuildindex").show();
			if(foldertype == "P"){
				$("#adm_file_permission").hide();
			}else{
				$("#adm_file_permission").show();
			}
		} else {
			$("#adm_file_permission").hide();
		}
		$("#div_perm").attr("title", "Folder Access Controls");
		$("#div_admin_controls").show();
	} else {
		$("#admin_module").hide();
		$("#adm_rebuildindex").hide();
		$("#div_admin_controls").hide();
		$("#dropdownMenuLink").hide();
		$("#adm_file_permission").hide();
	}

	ajaxindicatorstop();

	try{
		var urlk = window.location.href.split("?");
		if(urlk.length > 1 && urlk[1].indexOf("a=view") == 0){
			var arr = urlk[1].split("&");
			if(arr.length == 5 || arr.length == 6){
				if(arr[1].replace("b=", "") == "folder"){
					admcurrentfoldertype = arr[2].replace("c=", "");
					var fdId = arr[3].replace("d=", "");
					var corpid = arr[4].replace("e=", "");
					if(corpid == localStorage._zw){
						admFolderListAllServiceOnly(fdId,corpid);
					} else {
						admShowconfirmmsg(adm_messages.foldernotpresentcorporate, confirm_Error, 5000, "", false, false);
					}
				} else if(arr[1].replace("b=", "") == "file"){
					var docid = arr[3].replace("d=", "");
					var corpid = arr[4].replace("e=", "");
					if(corpid == localStorage._zw){
						admSingleDocumentFetchOnly(docid,corpid);
					} else {
						admShowconfirmmsg(adm_messages.filenotpresentcorporate, confirm_Error, 5000, "", false, false);
					}

				}
			}
		}
	}catch(error){
	}

	admDownloadFolderQueryParam();
	cleanURLAtTop();
	admOTPSettingsService();
	admShowHideMoreMenu();

	var pHeight = $(window).height();
	var heightdeduct = 148;
	$('.page-wrapper').css('height', (pHeight-heightdeduct));
	$('.content-page').css('height', (pHeight-heightdeduct));
	// In Individual User Header Change
	if(localStorage._zs == "I"){
		$("#individualId").html("Download");
		$("#adm_download_file").html("Download");
	}

	if(admcurrentfoldertype == admpersonaltype){
		admHighlightPersonalFolder();
	} else {
		admHighlightDataroom();
	}

	$("#btncreatefolderpopup").show();
	$("#ulbtncreatefolderpopup").show();

	if(localStorage._zh != 1){
		showActionPopup("changepassconfirmmodal", false);
	} else if(localStorage._zs == "B" && localStorage._za != 1) {
		admFetchNotifSettingsService();
	}

	var obj = document.getElementById("adm_fileuploadId");
	obj.contentWindow.setFileUploadURL("http://58.168.69.186");

	switchcalled = false;
	abortingajax = false;
}

/**
 * method to loop through file list
 */
function admLoopFolderList(folderparentid, foldertype){
	$("#admallcheckboxlabel").hide();
	$("#tbldatarows").empty();
	//$("#admfolderheader").hide();
	admUnSelectAllCheckBox();
	var folderList = [];
	if(foldertype == admpersonaltype) {
		folderList = admPersoanlFoldersList;
	} else if(foldertype == admsharedtype) {
		folderList = admSharedFoldersList;
	}

	if(folderList != null && folderList.length > 0){
		var datahtml='';
		for(var i=0;i<folderList.length;i++) {
			var allowdn = false;
			datahtml='';
			var folderpath = folderList[i];
			var folderIndex = admListFolderIndexIdMain[folderpath];
			if(folderIndex != null && folderIndex != undefined && folderIndex.length > 0){
				folderIndex = folderIndex + "-";
			} else {
				folderIndex = "";
			}
			var folderSize = formatBytesDecimal(admFolderSize[folderpath]);
			var folderDate = admFolderDate[folderpath];

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

			var v = admSharedFoldersPermission[folderid]+"";
			var allowdnorg = false;
			if(localStorage._zs == "I"){
				allowdnorg = false;
			}else{
				allowdnorg = checkButtonPermission(v, 6);
			}
			var allowdn = checkButtonPermission(v, 0);
			var allowshare = checkButtonPermission(v, 1);
			var allowdelete = checkButtonPermission(v, 3);
			var allowupload = checkButtonPermission(v, 2);

			var datavar = "data-id='"+folderid+"' path=\""+folderpath+"\" parentid='"+folderparentid+"' data-status='"+status+"' ";
			datavar += "data-isfolder='true' data-type='"+foldertype+"' data-count='"+nooffiles+"' data-foldername=\""+foldername+"\"";

			var stylefontfile = "";
			var styledisplay = "";
			if(status == "D"){
				stylefontfile = "color:#B74A4A;";
			} else if(topd || topm){
				stylefontfile = "color:forestgreen;";
			}

			if(i>0){
				datahtml += "<hr id='hr_fd_"+i+"' style='margin-top:0px;margin-bottom:0px;'>";
			}

			var folderURL = "javascript:void(0);";
			if(status != "D"){
				folderURL = cloudURLProtocol+cloudURLACTDomain+"/appnew/drive.html?a=view&b=folder&c="+admcurrentfoldertype+"&d="+folderid+"&e="+localStorage._zw+"&f="+status;
			}
			if(admcurrentfoldertype == admpersonaltype) admHighlightPersonalFolder();
			else admHighlightDataroom();
			datahtml += "<div class='row new-row' id='adm_folderrow_"+i+"' "+datavar+">";
			datahtml += "<div class='col-md-4 up' style='cursor:pointer;' id='adm_foldername_"+i+"' "+datavar+">";
			datahtml += "	<img class='respons' src='assets/img/folder.png' alt='' >";
			datahtml += "	<h2 title=\""+foldernameact+"\">";
			if(admFolderArchived(status) || admFolderRestoreInit(status)){
				datahtml += "	<a href='"+folderURL+"' style='height:18px;"+stylefontfile+"font-size:14px;font-weight:400;line-height:20px;color:#7e7878;' class='noclick' ";
				datahtml += "title='"+(admFolderArchived(status) ? "Archived":"Retrieval Initiated")+"'>";
			} else {
				datahtml += "	<a href='"+folderURL+"' style='height:18px;"+stylefontfile+"font-size:14px;font-weight:400;line-height:20px;' class='noclick'>";
			}

			if(topd) {
				datahtml += folderIndex+"DCirrus Sync";
			} else if(topm) {
				datahtml += "MyMobile";
			} else {
				var totalLength = 30;

				if((folderIndex + foldername).length >=totalLength){
					var charRemaining = totalLength - folderIndex.length;
					var lfolderLength = foldername.length;
					var fixedLength = "...".length;
					var displayChar = charRemaining - fixedLength;
					if(lfolderLength > displayChar){
						var foldername = foldername.substring(0,displayChar)+"...";
					}
				}
				datahtml += folderIndex+foldername;
			}
			datahtml += "			<br>";
			if(status == "D"){
				datahtml += " 			<span class='rowspanfoldername' style='"+stylefontfile+"'>";
			} else {
				datahtml += "			<span class='rowspanfoldername'> ";
			}

			if(!admFolderArchived(status) || admFolderRestoreInit(status)){
				if(currentdownloadfolders[folderid] != null && currentdownloadfolders[folderid] != undefined) {
					datahtml += "<span id='adm_download_folder_progress_"+i+"' style='display:;'>Downloading folder...</span>";
				} else {
					datahtml += "<span id='adm_download_folder_progress_"+i+"' style='display:none;'>Downloading folder...</span>";
				}
			}

			datahtml += "			</span>";
			datahtml += "		</a>";
			datahtml += "	</h2>";
			datahtml += "</div>";
			datahtml += "<div class='col-md-1 up text-center' "+datavar+" >";
			datahtml += "<p class='sneha'>&nbsp;</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-md-2 up' "+datavar+" >";
			datahtml += "<p class='sneha'>"+folderDate+"</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-md-1 up text-center' "+datavar+"  style='text-align:center;'>";
			datahtml += "<p class='sneha'>"+folderSize+"</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-md-2 up text-center' "+datavar+" >";
			datahtml += "<p class='sneha'>&nbsp;</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-md-1 up' "+datavar+" >";
			if(allowdn && status != "D" && !topd && !topm && localStorage._zs != "I" && !admFolderArchived(status) && !admFolderRestoreInit(status)) {
				if(currentdownloadfolders[folderid] != null && currentdownloadfolders[folderid] != undefined) {
					//datahtml += "<img class='down' style='cursor:pointer;display:none;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
					//datahtml += "<img src='assets/img/dcirrus_spin.gif?v=3' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:;margin-top:10px;' class='fileviewprogressbar'/>";
				} else {
					//datahtml += "<img class='down text-center' style='cursor:pointer;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
					//datahtml += "<img src='assets/img/dcirrus_spin.gif?v=3' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:none;margin-top:10px;' class='fileviewprogressbar'/>";
				}
			} else {
				datahtml += "<p class='sneha'>&nbsp;</p>";
			}
			datahtml += "</div>";
			datahtml += "<div class='col-md-1 up'>";
			/*datahtml += "<ul class='nav  float-right'>";
			datahtml += "<li class='new-li' data-toggle='dropdown'>";
			if(admSharedFoldersPermission[folderid] != "N#N#N#N#N#N#N" && !admFolderRestoreInit(status)){
				if(admFolderArchived(status)){
					if( localStorage._zp == "1"){
						datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
						datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
						datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='border-bottom-left-radius:18px;border-bottom-right-radius:18px;padding:15px;border-top-left-radius:18px;border-top-right-radius:18px;'><i class='fa fa-repeat rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
						datahtml += "</div>";
					}
				} else if(status == "D"){
					datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
					datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_restore_folder_"+i+"' "+datavar+" style='border-top-left-radius:18px;border-top-right-radius:18px;padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-undo rowdropdownitem' aria-hidden='true'></i>Restore</a>";
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='border-bottom-left-radius: 18px;border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
					datahtml += "</div>";
				} else {
					datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
					datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
					var subdatahtmlshare ="";
					var subdatahtmlrqfiledeposite ="";
					subdatahtmlshare += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_share_folder_"+i+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-share-alt rowdropdownitem' aria-hidden='true'></i>Share</a>";
					subdatahtmlrqfiledeposite += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_inbound_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc; padding:15px;'><i class='fa fa-file rowdropdownitem' aria-hidden='true'></i>Request File Deposit</a>";
					if(!topd && !topm){
						if(allowupload){
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_edit_folder_"+i+"' "+datavar+" style='border-top-left-radius: 18px;border-top-right-radius:18px;padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-pencil rowdropdownitem' aria-hidden='true'></i>Rename</a>";
						}
						if(allowshare){
							datahtml += subdatahtmlshare;
						}
						if(allowupload){
							datahtml += subdatahtmlrqfiledeposite;
						}
						if(allowdnorg){
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_download_org_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-download rowdropdownitem' aria-hidden='true'></i>Download Original</a>";
						}
						if(allowdelete){
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_delete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-trash rowdropdownitem' aria-hidden='true'></i>Delete</a>";
							if(localStorage._zp == "1") datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;border-bottom-left-radius:18px; border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
							else datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;border-bottom-left-radius:18px; border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
						}
						if(localStorage._zp == "1") datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='border-bottom-left-radius:18px; border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
					}else{
						datahtml += subdatahtmlshare;
						datahtml += subdatahtmlrqfiledeposite;
					}
					datahtml += "</div>";
				}
			} else if(!admFolderRestoreInit(status) && localStorage._zp == "1") {
				datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
				datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
				if(!admFolderArchived(status) && !admFolderRestoreInit(status)){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='border-bottom-left-radius:18px;border-bottom-right-radius:18px;padding:15px;border-top-left-radius:18px;border-top-right-radius:18px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
				} else if(admFolderArchived(status)){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='border-bottom-left-radius:18px;border-bottom-right-radius:18px;padding:15px;border-top-left-radius:18px;border-top-right-radius:18px;'><i class='fa fa-repeat rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
				}
				datahtml += "</div>";
			}
			datahtml += "</li>";
			datahtml += "</ul>";*/
			datahtml += "</div>";
			datahtml += "</div>";

			$("#tbldatarows").append(datahtml);
			admFolderClickMoreEvent("adm_foldername_"+i);
			admrowmouseover("adm_folderrow_"+i);
			if(status == "D"){
				admRestoreFolder("adm_restore_folder_"+i);
				admDeletePermanentFolder("adm_permdelete_folder_"+i);
			} else if(admFolderArchived(status)){
				admChangeStorageClass(i);
			} else {
				admDeleteFolderEvent("adm_delete_folder_"+i);
				admEditFolderEvent("adm_edit_folder_"+i);
				admOpenShareRowModal("adm_share_folder_"+i);
				admOpenInboundRowModal("adm_inbound_folder_"+i);
				admopensharedsecurity("adm_share_security_"+i);
				admDeletePermanentFolder("adm_permdelete_folder_"+i);
				if(allowdn && status != "D") admdownloadfolder("adm_download_folder_"+i);
				if(allowdnorg && status != "D") admdownloadfolderOriginal("adm_download_org_"+i);
				admChangeStorageClass(i);
			}
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
	$("#admallcheckboxlabel").show();
	$("#admfolderheader").show();
	admUnSelectAllCheckBox();

	var datahtml='';
	var foldername = folderpath;
	var folderIndex = admListFolderIndexIdMain[folderpath];
	if(folderIndex != null && folderIndex != undefined && folderIndex.length > 0){
		folderIndex = folderIndex + "-";
	} else {
		folderIndex = "";
	}
	var folderSize = formatBytesDecimal(admFolderSize[folderpath]);
	var folderDate = admFolderDate[folderpath];

	try{
		foldername = foldername.substring(foldername.lastIndexOf("/")+1);
	}catch(error){}

	var gm = adm_parentfolderid[folderid]+""
	adm_parentfolderid[folderid] = parentid+"#"+nooffiles+"#"+folderpath+"#"+folderType+"#"+status;
	adm_parentfolderpath[folderpath+"#"+folderType] = parentid+"#"+nooffiles+"#"+folderid+"#"+status+"#"+folderpath;

	var v = admSharedFoldersPermission[folderid]+""
	var allowdnorg = false;
	if(localStorage._zs == "I"){
		allowdnorg = false;
	}else{
		allowdnorg = checkButtonPermission(v, 6);
	}
	var allowdn = checkButtonPermission(v, 0);
	var allowshare = checkButtonPermission(v, 1);
	var allowdelete = checkButtonPermission(v, 3);
	var allowupload = checkButtonPermission(v, 2);

	var datavar = "data-id='"+folderid+"' path=\""+folderpath+"\" parentid='"+parentid+"' data-status='"+status+"' ";
	datavar += "data-isfolder='true' data-type='"+folderType+"' data-count='"+nooffiles+"' data-foldername=\""+foldername+"\"";

	var folderURL = "javascript:void(0);";
	if(status != "D"){
		folderURL = cloudURLProtocol+cloudURLACTDomain+"/appnew/drive.html?a=view&b=folder&c="+admcurrentfoldertype+"&d="+folderid+"&e="+localStorage._zw+"&f="+status;
	}
	if(admcurrentfoldertype == admpersonaltype) admHighlightPersonalFolder();
	else admHighlightDataroom();
	var stylefontfile = "";
	if(status == "D"){
		stylefontfile = "color:#B74A4A;";
	}

	var issyncfolder = false;
	if(folderpath.toLowerCase().indexOf("dcirrus/") == 0 || folderpath.toLowerCase().indexOf("dcirrus sync/") == 0){
		issyncfolder = true;
	}

	if(($("#tbldatarows").html()).length > 0) datahtml += "<hr id='hr_fd_"+i+"' style='margin-top:0px;margin-bottom:0px;'>";

	datahtml += "<div class='row new-row' id='adm_folderrow_"+i+"' "+datavar+">";
	datahtml += "<div class='col-md-4 up' style='cursor:pointer;' id='adm_foldername_"+i+"' "+datavar+">";
	//datahtml += "	<label class='contner'>&nbsp;</label>";
	datahtml += "	<img class='respons' src='assets/img/folder.png' alt='' >";
	var foldernameact = foldername;
	datahtml += "	<h2 title=\""+foldernameact+"\">";
	if(admFolderArchived(status) || admFolderRestoreInit(status)){
		datahtml += "	<a href='"+folderURL+"' style='height:18px;"+stylefontfile+"font-size:14px;font-weight:400;line-height:20px;color:#7e7878;' class='noclick' ";
		datahtml += "title='"+(admFolderArchived(status) ? "Archived":"Retrieval Initiated")+"'>";
	} else {
		datahtml += "	<a href='"+folderURL+"' style='height:18px;"+stylefontfile+"font-size:14px;font-weight:400;line-height:20px;' class='noclick'>";
	}

	var totalLength = 30;

	if((folderIndex + foldername).length >=totalLength){
		var charRemaining = totalLength - folderIndex.length;
		var lfolderLength = foldername.length;
		var fixedLength = "...".length;
		var displayChar = charRemaining - fixedLength;
		if(lfolderLength > displayChar){
			var foldername = foldername.substring(0,displayChar)+"...";
		}
    }
	datahtml += folderIndex+foldername;

	datahtml += "			<br>";
	if(status == "D"){
		datahtml += " 			<span class='rowspanfoldername' style='"+stylefontfile+"'>";
	} else {
		datahtml += "			<span class='rowspanfoldername'> ";
	}

	if(!admFolderArchived(status) && !admFolderRestoreInit(status)) {
		if(currentdownloadfolders[folderid] != null && currentdownloadfolders[folderid] != undefined) {
			datahtml += "<span id='adm_download_folder_progress_"+i+"' style='display:;'>Downloading folder...</span>";
		} else {
			datahtml += "<span id='adm_download_folder_progress_"+i+"' style='display:none;'>Downloading folder...</span>";
		}
	}

	datahtml += "			</span>";
	datahtml += "		</a>";
	datahtml += "	</h2>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up text-center' "+datavar+" >";
	datahtml += "<p class='sneha'>&nbsp;</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-2 up' "+datavar+" >";
	datahtml += "<p class='sneha'>"+folderDate+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up text-center' "+datavar+"  style='text-align:center;'>";
	datahtml += "<p class='sneha'>"+folderSize+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-2 up text-center' "+datavar+" >";
	datahtml += "<p class='sneha'>&nbsp;</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up' "+datavar+" >";
	if(allowdn && status != "D" && !issyncfolder && localStorage._zs != "I" && !admFolderArchived(status) && !admFolderRestoreInit(status)) {
		if(currentdownloadfolders[folderid] != null && currentdownloadfolders[folderid] != undefined) {
			//datahtml += "<img class='down' style='cursor:pointer;display:none;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
			//datahtml += "<img src='assets/img/dcirrus_spin.gif?v=3' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:;margin-top:10px;' class='fileviewprogressbar'/>";
		} else {
			//datahtml += "<img class='down text-center' style='cursor:pointer;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
			//datahtml += "<img src='assets/img/dcirrus_spin.gif?v=3' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:none;margin-top:10px;' class='fileviewprogressbar'/>";
		}
	} else {
		datahtml += "<p class='sneha'>&nbsp;</p>";
	}
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up'>";
	/*datahtml += "<ul class='nav  float-right'>";
	datahtml += "<li class='new-li' data-toggle='dropdown'>";
	if(admSharedFoldersPermission[folderid] != "N#N#N#N#N#N#N" && !admFolderRestoreInit(status)){
		if(admFolderArchived(status)){
			if(!admFolderArchived(admcurrentfolderstatus) && localStorage._zp == "1"){
				datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
				datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
				datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='border-bottom-left-radius:18px;border-bottom-right-radius:18px;padding:15px;border-top-left-radius:18px;border-top-right-radius:18px;'><i class='fa fa-repeat rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
				datahtml += "</div>";
			}
		} else if(status == "D"){
			datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer; '>";
			datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_restore_folder_"+i+"' "+datavar+" style='border-top-left-radius:18px;border-top-right-radius:18px;padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-undo rowdropdownitem' aria-hidden='true'></i>Restore</a>";
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='border-bottom-left-radius: 18px;border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
			datahtml += "</div>";
		} else {
			datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
			datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
			var insidesubdatahtmlshare = "";
			var insidesubdatahtmlrqfiledeposit = "";
			insidesubdatahtmlshare += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_share_folder_"+i+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-share-alt rowdropdownitem' aria-hidden='true'></i>Share</a>";
			insidesubdatahtmlrqfiledeposit += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_inbound_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-file rowdropdownitem' aria-hidden='true'></i>Request File Deposit</a>";

			if(!issyncfolder){
				if(allowupload){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_edit_folder_"+i+"' "+datavar+" style='border-top-left-radius: 18px;border-top-right-radius:18px;padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-pencil rowdropdownitem' aria-hidden='true'></i>Rename</a>";
				}
				if(allowshare){
					datahtml += insidesubdatahtmlshare;
				}
				if(allowupload){
					datahtml += insidesubdatahtmlrqfiledeposit;
				}
				if(allowdnorg){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_download_org_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-download rowdropdownitem' aria-hidden='true'></i>Download Original</a>";
				}
				if(allowdelete){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_delete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-trash rowdropdownitem' aria-hidden='true'></i>Delete</a>";
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='border-bottom-left-radius: 18px;border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
				}
				if(localStorage._zp == "1") datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='padding:15px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
			}else{
				datahtml += insidesubdatahtmlshare;
				datahtml += insidesubdatahtmlrqfiledeposit;
			}
			datahtml += "</div>";
		}
	} else if(!admFolderRestoreInit(status) && localStorage._zp == "1" && !admFolderArchived(admcurrentfolderstatus)) {
		datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
		datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
		if(!admFolderArchived(status) && !admFolderRestoreInit(status)){
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='border-bottom-left-radius:18px;border-bottom-right-radius:18px;padding:15px;border-top-left-radius:18px;border-top-right-radius:18px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
		} else if(admFolderArchived(status)){
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='border-bottom-left-radius:18px;border-bottom-right-radius:18px;padding:15px;border-top-left-radius:18px;border-top-right-radius:18px;'><i class='fa fa-repeat rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
		}
		datahtml += "</div>";
	}
	datahtml += "</li>";
	datahtml += "</ul>";*/
	datahtml += "</div>";
	datahtml += "</div>";

	$("#tbldatarows").append(datahtml);
	admFolderClickMoreEvent("adm_foldername_"+i);
	admrowmouseover("adm_folderrow_"+i);
	if(status == "D"){
		admRestoreFolder("adm_restore_folder_"+i);
		admDeletePermanentFolder("adm_permdelete_folder_"+i);
	} else {
		admDeleteFolderEvent("adm_delete_folder_"+i);
		admEditFolderEvent("adm_edit_folder_"+i);
		admOpenShareRowModal("adm_share_folder_"+i);
		admOpenInboundRowModal("adm_inbound_folder_"+i);
		admopensharedsecurity("adm_share_security_"+i);
		admDeletePermanentFolder("adm_permdelete_folder_"+i);
		if(allowdn && status != "D"){
			admdownloadfolder("adm_download_folder_"+i);
		}
		if(allowdnorg && status != "D") admdownloadfolderOriginal("adm_download_org_"+i);
		admChangeStorageClass(i);
	}

	if(admFolderArchived(admcurrentfolderstatus)){
		$("#ul_more").hide();
	}
}

/**
 * method to post action for delete folder
 * @param data
 */
function admDeleteFolderServiceAfter(data){
	ajaxindicatorstop();
	admUnSelectAllCheckBox();
	if(data.error == false && data.messageCode == 202){
		admClearFolderFileCache();
		var extraparam = data.extrajsonparam;
		var mk = adm_parentfolderid[extraparam.folderid].split("#");// = "0#"+nooffiles+"#"+folderpath+"#"+foldertype+"#"+status;
		delete adm_parentfolderid[extraparam.folderid];
		ajaxindicatorstart('loading data.. please wait..');
		hideActionPopup("deleteconfirmmodal");

		if(extraparam.deletecnf && admcurrentfolderid > 0) {
			var vm = "Root/"+mk[2]+"#"+extraparam.folderid;
			if(admcurrentfoldertype == "S"){
				var index = $.inArray(vm, admSharedFoldersList_local);
				if (index != -1) {
					admSharedFoldersList_local.splice(index, 1);
				}
			} else if(admcurrentfoldertype == "P"){
				var index = $.inArray(vm, admPersoanlFoldersList_local);
				if (index != -1) {
					admPersoanlFoldersList_local.splice(index, 1);
				}
			}
		}

		admSetSelectedNodeFromMain = true;
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		admDeleteFolderPathLocal(mk[2]);
		if(extraparam.deletecnf){
			var nodeId = nodesList[extraparam.folderid];
			var treeid = "default-tree-"+admcurrentfoldertype;
			$('#'+treeid).treeview('deleteNode', [ nodeId, { silent:true } ]);
		}
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
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
		admClearFolderFileCache();
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
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
		admClearFolderFileCache();
		if(localStorage._zp == "1" && admcurrentpath == ""){
			if(data.object.split("#")[2] == 1)
				admShowconfirmmsg(adm_messages.createfolderdonevisibletoalladmins, confirm_Success, 5000, "", false, false);
			else{
				if(localStorage._zs == "B")
					admShowconfirmmsg(adm_messages.createfolderdonenotvisibletoothers, confirm_Success, 5000, "", false, false);
				else
					admShowconfirmmsg(adm_messages.createfolderdone, confirm_Success, 5000, "", false, false);
			}
		} else{
			admShowconfirmmsg(adm_messages.createfolderdone, confirm_Success, 5000, "", false, false);
		}
		ajaxindicatorstart('loading data.. please wait..');
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		//admResetTree();
		var parentid = data.extrajsonparam.parentid;
		admFolderListAllService(parentid);
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "FOLDEREXISTS"){
			admShowconfirmmsg(adm_messages.folderexists, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
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
		admClearFolderFileCache();
		admShowconfirmmsg(adm_messages.renamefolderdone, confirm_Success, 5000, "", false, false);
		renamefolderid = data.extrajsonparam.folderId;
		renamefolderpath = data.extrajsonparam.pth;
		//renamefolderpath = renamefolderpath.substring(renamefolderpath.lastIndexOf("/")+1);
		//renameprvfolderpath = renameprvfolderpath.substring(renameprvfolderpath.lastIndexOf("/")+1);
		var array = [];
		var vm = "Root/"+renameprvfolderpath+"#"+renamefolderid;
		if(admcurrentfoldertype == admpersonaltype) {
			var index = $.inArray(vm, admPersoanlFoldersList_local);
			amdrenamefolderindex = index;
			if (index != -1) {
				admPersoanlFoldersList_local.splice(index, 1);
			}
		} else if(admcurrentfoldertype == admsharedtype) {
			var index = $.inArray(vm, admSharedFoldersList_local);
			amdrenamefolderindex = index;
			if (index != -1) {
				admSharedFoldersList_local.splice(index, 1);
			}
		}

		ajaxindicatorstart('loading data.. please wait..');
		admSetSelectedNodeFromMain = true;
		if(admcurrentfolderid == 0) admFolderTreeLoaded = false;
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		//admResetTree();
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "FOLDEREXISTS"){
			admShowconfirmmsg(adm_messages.folderexists, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

/**
 * method to display folders and files from second level onwards
 * @param response
 */
function fetchAllAdmFolderChildListResponse(response){
	if(!admscrolldone) adm_folder_list = [];
	admscrolldone = false;
	var showheaderbefore = true;
	//$("#admfolderheader").show();
	if(adm_documentmaxlimit == 0){
		admRefreshDone = true;
		$("#tbldatarows").html("");
		$("#tbldatarows").empty();
		$("#tbldatarows").attr("data-rowdispl", 0);
		if($("#searchpopup").css("display") == "none") {
			admtotaldocs = 0;
		}
		admDocumentJson ="";
	}

	$("#admallcheckboxlabel").hide();
	//$("#"+adm_lbl).hide();

	if((response.error+"") == "false" && response.object != null) {
		adm_documentmaxlimit = adm_documentmaxlimit + maxlimitlistadd;
		var data = response.object;
		var extraParam = response.extrajsonparam;
		var foldertype = extraParam.foldertype;
		var folderfetch = extraParam.folderfetch;
		//admDocumentJson = data.unIndexDocumentsList;

		if(data != null && data != "null") {
			downloadallowed = true;
			outshareallowed = true;
			inshareallowed = true;
			deleteallowed = true;
			copyallowed = true;
			moveallowed = true;
			try{if(data.unIndexSharedFolderSecurityDto.download == "N") downloadallowed = false;}catch(error){}
			try{if(data.unIndexSharedFolderSecurityDto.outboundShare == "N") outshareallowed = false;}catch(error){}
			try{if(data.unIndexSharedFolderSecurityDto.inboundShare == "N") inshareallowed = false;}catch(error){}
			try{if(data.unIndexSharedFolderSecurityDto.delete == "N") deleteallowed = false;}catch(error){}
			try{if(data.unIndexSharedFolderSecurityDto.copy == "N") copyallowed = false;}catch(error){}
			try{if(data.unIndexSharedFolderSecurityDto.move == "N") moveallowed = false;}catch(error){}

			try{
				var perm = admSharedFoldersPermission[admcurrentfolderid].split("#");
				if(perm[2] == "N"){
					inshareallowed = false;
				}
			}catch(error){}

			//populate folders on left
			if($("#searchpopup").css("display") == "none"){
				admttotalfile = data.noOfFiles;
				if(data.unIndexFoldersList != null && folderfetch == true){
					admCommonLoopFolderList(data.unIndexFoldersList, folderfetch);
				}

				if(data.unIndexDocumentsList != null && data.unIndexDocumentsList.length > 0){
					$("#admallcheckboxlabel").show();
					admtotaldocs = data.noOfFiles;
					admLoopFileList(data.unIndexDocumentsList, admcurrentfoldertype);
				}
			} else {
				if(data.unIndexDocumentsList != null && data.unIndexDocumentsList.length > 0){
					admtotaldocs = data.totalDocumentCount;
					admLoopFileList(data.unIndexDocumentsList, foldertype);
				}
			}
		}
	}

	adm_documentfetchdone = true;
	admShowHideMoreMenu();
	ajaxindicatorstop();
	if(showheaderbefore) admSetFolderHeaderCaption();
	var pHeight = $(window).height();
	var heightdeduct = 148;
	$('.page-wrapper').css('height', (pHeight-heightdeduct));
	$('.content-page').css('height', (pHeight-heightdeduct));
}

/**
 * method to loop through file list
 */
function admLoopFileList(docList, foldertype){
	//$("#admfolderheader").show();
	$(".filesonlyrow").remove();
	$(".filesonlyrow_hr").remove();
	$("#admallcheckboxlabel").show();
	if(foldertype == null || foldertype == undefined || foldertype == "null" || foldertype == "") foldertype = admcurrentfoldertype;
	if(docList != null && docList.length > 0){
		if(!admFolderArchived(admcurrentfolderstatus) && !admFolderRestoreInit(admcurrentfolderstatus)) $("#ul_more").show();
		var datahtml='';
		var noofrowsstart = parseInt(document.getElementById("tbldatarows").getAttribute("data-rowdispl"));
		var datalen = noofrowsstart + docList.length;

		if(adm_prv_folder_id != admcurrentfolderid){
			adm_prv_folder_id = admcurrentfolderid;
			adm_doc_list = docList;
		} else {
			adm_doc_list = adm_doc_list.concat(docList);
		}
		adm_doc_list = admListSortSort(adm_doc_list, "file");

		var checkedall = admCheckAllChecked();
		var j = noofrowsstart;
		for(var i=0;i<adm_doc_list.length;i++) {
			admLoopFileListCommon(adm_doc_list[i], j, false);
			j++;
		}

		$("#tbldatarows").attr("data-rowdispl", datalen);
	} else {
		adm_doc_list = [];
		$("#ul_more").hide();
		admShowNoDataFoundTable();
	}
}

function admCheckAllChecked(){
	var checkedall = false;
	if($("#admallcheckbox").is(':checked')){
		checkedall = true;
	}
	return checkedall;
}

/**
 * method to invoke actions after contact list service call
 * @param data
 */
function admContactListServiceAfter(data){
	if(data.error == false && data.messageCode == 201){
		var emailids = ",";
		var details = data.object;
		adm_emailIdTags = new Array();
		var i = 0;
		for(i=0;i<=details.length-1;i++){
			var name = details[i].emailId;
			var email = details[i].emailId+"";
			if(email != "null" && email != "undefined" && email.length > 0){
				adm_emailIdTags.push({label:name, value:email});
				if(emailids.indexOf(","+email+",") < 0 && validateEmail(email)){
					if(includes(adm_emailIdArray, email) == false) adm_emailIdArray.push(email);
					emailids = emailids + email + ",";
				}
			}
		}

	}
}

/**
 * method to invoke actions after adm share list API call is done
 * @param data
 */
function admShareURLsServiceAfter(data){
	var extraParam = data.extrajsonparam;
	ajaxindicatorstop();
	var collaborate = false;
	if($("#admshareallowupload").is(":checked") == true) {
		collaborate = true;
	}

	var timeclose = 100;
	if(data.error == false && data.messageCode == 201) {
		if(extraParam != null && extraParam != undefined && extraParam.copylink){
			var linkmessage = adm_messages.sharelinkgenerated;
			if(extraParam.isfolder){
				linkmessage = linkmessage.replace("<LINKTYPE>", "Folder link");
			} else {
				linkmessage = linkmessage.replace("<LINKTYPE>", "File link");
			}
			admShowconfirmmsg(linkmessage, confirm_Success, 5000, "", false, false);
			/* Select the text field */
			var copytext = document.getElementById("admsharecopytext");
			$("#admsharecopytext").show();
			copytext.value = data.object;
			copytext.select();
			copytext.setSelectionRange(0, 99999); /*For mobile devices*/
			/* Copy the text inside the text field */
  			document.execCommand("copy");
  			timeclose = 5000;
		} else if(collaborate){
			admShowconfirmmsg(adm_messages.documentlistcollaborated, confirm_Success, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.documentlistshared, confirm_Success, 5000, "", false, false);
		}
	} else {
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "NOFULLPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}

	setTimeout(function(){
		admShareClose();
	}, timeclose);
}

function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

/**
 * method to execute post inboud share url generate
 * @param data
 */
function admInboundShareURLsServiceAfter(data){
	ajaxindicatorstop();
	admInboundClose();

	if(data.error == false && data.messageCode == 201){
		admShowconfirmmsg(adm_messages.inboundsharecreated, confirm_Success, 5000, "", false, false);
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

/**
 * method to to excete after share email added
 * @param data
 */
function admShareEmailTagsInsertServiceAfter(data){
	if(data.error == false && data.messageCode == 201){
		var extraParam = data.extrajsonparam;
		if(includes(adm_emailIdArray, extraParam.email) == false && validateEmail(extraParam.email)) {
			adm_emailIdArray.push(extraParam.email);
		}
	}
}

function admmakeImportanhtServiceAfter(response){
	var objid = response.extrajsonparam.objid;
	$("#"+objid).removeAttr("disabled");
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		if($("#"+objid).hasClass("flagcommon")){
			$("#"+objid).removeClass("flagcommon");
			$("#"+objid).html("Flagged");
		} else {
			$("#"+objid).addClass("flagcommon");
			$("#"+objid).html("Flag");
		}
	}
}

function admMarkForSignDocServiceAfter(response){
	var extraParam = response.extrajsonparam;
	var objid = extraParam.objid;
	$("#"+objid).removeAttr("disabled");
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 202){
		if($("#"+objid).hasClass("flagcommon")){
			$("#"+objid).removeClass("flagcommon");
			$("#"+objid).html("Marked For Signing");

			objid = objid.replace("admfilesign_", "admfilelock_");
			$("#"+objid).addClass("flagred");
			$("#"+objid).removeClass("flagunlocked");
			$("#"+objid).html("Locked");
		} else {
			$("#"+objid).addClass("flagcommon");
			$("#"+objid).html("Mark For Signing");

			objid = objid.replace("admfilesign_", "admfilelock_");
			$("#"+objid).addClass("flagunlocked");
			$("#"+objid).removeClass("flagred");
			$("#"+objid).html("Unocked");
		}
	}
}

function admMarkForLockDocServiceAfter(response){
	var extraParam = response.extrajsonparam;
	var objid = extraParam.objid;
	$("#"+objid).removeAttr("disabled");
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 202){
		if($("#"+objid).hasClass("flagred")){
			$("#"+objid).addClass("flagunlocked");
			$("#"+objid).removeClass("flagred");
			$("#"+objid).html("<i class='fa fa-lock rowdropdownitem' aria-hidden='true' style='color:#FF0000'></i>Locked").hide();
		} else if($("#"+objid).hasClass("flagunlocked")){
			$("#"+objid).addClass("flagred");
			$("#"+objid).removeClass("flagunlocked");
			$("#"+objid).html("<i class='fa fa-lock rowdropdownitem' aria-hidden='true' style='color:#FF0000'></i>Locked");
		}
	}
}

/**
 * method to display viewer
 * @returns {Boolean}
 */
function admDisplayDocViewerAfter(data){
	admopenfilelink = false;
	ajaxindicatorstop();
	admViewerOpened = 0;
	admdocviewerrequested = false;
	admAttachmentList = "";
	if(data.nointernetexists == true){
		try{
			$("#adm_filenm_progress_"+data.idm).hide();
			$("#adm_filenm_"+data.idm).show();
		}catch(error){}
	} else {
		var idm = data.extrajsonparam.idm;
		if(idm != "null") $("#adm_filenm_progress_"+idm).hide();
		if(idm != "null") $("#adm_filenm_"+idm).show();
		if(data.error == false && data.messageCode == 200){
			if(data.object != null && data.object != "null" && data.object != ""){
				$("#"+adm_Viewer).addClass(adm_popupboxCls);
				$("#"+adm_Viewer).removeClass(admviewerpopupboxCls);
				var $iframe = $("#adm_viewerboxid");
				if ($iframe.length) {
					var url = data.object+"";
					url = url.replace("http://localhost:844", cloudApiServerAddress);
					url = url.replace("https://localhost:844", cloudApiServerAddress);
					url = url.replace("https://localhost:8443", cloudApiServerAddress);
					url = url.replace("https://localhost:443", cloudApiServerAddress);
					url = url.replace("https://localhost:80", cloudApiServerAddress);

					var extraparam = data.extrajsonparam;
					var folderType = extraparam.folderType;
					var idm = extraparam.idm;

					var actURL = url;
					$iframe.attr("height", "100%");

					var extension = "";
					if(actURL.indexOf(".") >= 0) {
						extension = actURL.substring(actURL.lastIndexOf(".")+1);
						extension = extension.toLowerCase();
					}

					hideActionPopup("versionmodal");

					if(extension.toLowerCase() == "flac" || extension.toLowerCase() == "mp4" || extension.toLowerCase() == "m4a"
						|| extension.toLowerCase() == "mp3" || extension.toLowerCase() == "ogv" || extension.toLowerCase() == "ogm"
						|| extension.toLowerCase() == "ogg" || extension.toLowerCase() == "oga" || extension.toLowerCase() == "opus"
						|| extension.toLowerCase() == "webm" || extension.toLowerCase() == "wav"){
						actURL = actURL.replace("index.html?documentId=", "Sample-Documents/");
						window.open(actURL, "_blank");
					} else {
						if(extension.toLowerCase() == "xls" || extension.toLowerCase() == "xlsx"){
							var nURL = actURL.substring(0, actURL.indexOf("#"));
							var bURL = actURL.substring(actURL.indexOf("#")+1);
							var d = new Date();
							var n = d.getTime();
							var fl = actURL.split("#")[1];
							fl = fl.replaceAll('.xlsx', '');
							fl = fl.replaceAll('.xls', '');
							var permission = admSharedFoldersPermission[admcurrentfolderid];
							try{
								var mode = "";
								try{
									if((localStorage._zmd).split(",").includes("3")){
										mode = "&mode=nonsaveedit";
									}
								}catch(erorr){
									console.log(error);
								}
								var prm = permission.split("#");
								if(prm[0] == "N") {
									actURL = nURL + "?file="+bURL+mode+"&v=3&allowprint=N&i="+fl+"&n="+n;
								} else if(prm[0] == "Y") {
									actURL = nURL + "?file="+bURL+mode+"&v=3&allowprint=Y&i="+fl+"&n="+n;
								}
							}catch(error){
								actURL = nURL + "?file="+bURL+mode+"&&v=3&allowprint=Y&i="+fl+"&n="+n;
							}

							var w = window.open(actURL);
							if(idm != "null") w.document.title = document.getElementById("adm_filenm_"+idm).getAttribute("data-filename");
						} else if(actURL.indexOf("adobe/#viewer/") > 0){
							var w = window.open(actURL);
							if(idm != "null") w.documentname = document.getElementById("adm_filenm_"+idm).getAttribute("data-filename");
						} else {
							var permission = admSharedFoldersPermission[admcurrentfolderid];
							if(permission == "N#N#N#N#N#N") {
								actURL = actURL + "&allowprint=N";
							} else {
								try{
									var prm = permission.split("#");
									if(prm[0] == "N") {
										actURL = actURL + "&allowprint=N";
									} else if(prm[0] == "Y") {
										actURL = actURL + "&allowprint=Y";
									}
								}catch(error){
									actURL = actURL + "&allowprint=Y";
								}
							}
							actURL = actURL.replace("index.html?documentId=", "index.html?v=4.14&documentId=");
							$iframe.attr("src",actURL);
							var pHeight = $(window).height()-60;
							var pWidth = $(window).width()-100;
							$iframe.attr("height", pHeight);
							$iframe.attr("width", "100%");
							$("#adm_viewer_modal_lg").css("max-width", "94%");
							showActionPopup("adm_viewer");
						}
					}
				}
			}else{
				admShowconfirmmsg(adm_messages.couldnotopenviewer, confirm_Error, 5000, "", false, false);
				hideActionPopup(adm_screenDimmer, "adm_viewer");
			}
		}else{
			if(data.message == "NOPERMISSION"){
				admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
			} if(data.message == "FILEERROR"){
				admShowconfirmmsg(adm_messages.couldnotopenFile, confirm_Error, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.couldnotopenviewer, confirm_Error, 5000, "", false, false);
			}
		}
	}
}

function admDownloadZipFileAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var url = response.object.attribute1+"";
		url = url.replace("http://localhost:844", cloudApiServerAddress);
    		url = url.replace("https://localhost:844", cloudApiServerAddress);
    		url = url.replace("https://localhost:8443", cloudApiServerAddress);
    		url = url.replace("https://localhost:443", cloudApiServerAddress);
    		url = url.replace("https://localhost:80", cloudApiServerAddress);

		var filenm = url.substring(url.lastIndexOf("/")+1);
		$("#admdownloaddiv").append("<a id='"+admdownloadids_+downloadids+"' download='' href='#'>export</a>");
		if(window.navigator.msSaveOrOpenBlob) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';
			xhr.downloadids = downloadids;
			xhr.filenm = filenm;

			xhr.onload = function(e) {
				if (this.status == 200) {
					var blobObject = this.response;
					window.navigator.msSaveOrOpenBlob(blobObject, this.filenm);
					$("#"+admdownloadids_+this.downloadids).trigger("click");
					document.getElementById(admdownloadids_+downloadids).click();

					try{
						window.external.downloadURL(url);
					}catch(error){

					}
				}
			};
			xhr.send();
			xhrPool.push(xhr);
		} else {
			try{
				//download(url, filenmm);
				//window.webkit.messageHandlers.interOp.postMessage("download:"+url);
				//window.open(url, '_blank');
				$("#"+admdownloadids_+this.downloadids).attr("download", filenm);
				$("#"+admdownloadids_+this.downloadids).attr("href", url);
				$("#"+admdownloadids_+this.downloadids).trigger("click");
            			document.getElementById(admdownloadids_+this.downloadids).click();
			}catch(error){

			}
		}


		downloadids++;
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admDownloadFolderServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var url = response.object.attribute1+"";
		url = url.replace("http://localhost:844", cloudApiServerAddress);
    		url = url.replace("https://localhost:844", cloudApiServerAddress);
    		url = url.replace("https://localhost:8443", cloudApiServerAddress);
    		url = url.replace("https://localhost:443", cloudApiServerAddress);
    		url = url.replace("https://localhost:80", cloudApiServerAddress);

		var filenm = url.substring(url.lastIndexOf("/")+1);
		$("#admdownloaddiv").append("<a id='"+admdownloadids_+downloadids+"' download='' href='#'>export</a>");
		if(window.navigator.msSaveOrOpenBlob) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';
			xhr.downloadids = downloadids;
			xhr.filenm = filenm;

			xhr.onload = function(e) {
				if (this.status == 200) {
					var blobObject = this.response;
					window.navigator.msSaveOrOpenBlob(blobObject, this.filenm);
					$("#"+admdownloadids_+this.downloadids).trigger("click");
					document.getElementById(admdownloadids_+downloadids).click();

					try{
						window.external.downloadURL(url);
					}catch(error){

					}
				}
			};
			xhr.send();
			xhrPool.push(xhr);
		} else {
			try{
				//download(url, filenmm);
				//window.webkit.messageHandlers.interOp.postMessage("download:"+url);
				//window.open(url, '_blank');
				$("#"+admdownloadids_+this.downloadids).attr("download", filenm);
				$("#"+admdownloadids_+this.downloadids).attr("href", url);
				$("#"+admdownloadids_+this.downloadids).trigger("click");
            			document.getElementById(admdownloadids_+this.downloadids).click();
			}catch(error){

			}
		}


		downloadids++;
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admRenameFileServiceAfter(data){
	ajaxindicatorstop();
	hideActionPopup("rename_filemodal");
	var index = document.getElementById("rename_admfilename").getAttribute("index");
	var docid = document.getElementById("rename_admfilename").getAttribute("fileid");
	addRenameFileSetup();
	if(data.error == false && data.messageCode == 202){
		admShowconfirmmsg(adm_messages.filerenamedone, confirm_Success, 5000, "", false, false);
		ajaxindicatorstart('loading data.. please wait..');
		var arr = [];
		arr[docid] = index;
		ajaxindicatorstart('loading data.. please wait..');
		admSingleDocumentFetch(docid, arr);
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "FILEEXISTS"){
			admShowconfirmmsg(adm_messages.fileexists, confirm_Error, 5000, "", false, false);
		} else if(data.message == "LOCKED"){
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admSingleDocumentFetchAfter(data){
	ajaxindicatorstop();
	if(data.error == false && data.messageCode == 200){
		var extraParam = data.extrajsonparam;
		var arr = extraParam.ids;
		datahtml='';
		var docList = data.object;
		try{
			if(docList != null && docList.length > 0){
				for(var i=0;i<docList.length;i++) {
					var index = arr[docList[i].id];
					adm_doc_list.map(function (a) {
						if (a.id == docList[i].id) {
							a.fileName = docList[i].fileName;
							a.status = docList[i].status;
							a.fileSize = docList[i].fileSize;
							a.fileModifiedLongTime = docList[i].fileModifiedLongTime;
							a.fileLastModified = docList[i].fileLastModified;
							a.fileModifiedDate = docList[i].fileModifiedDate;
						}
    				});
					admLoopFileListCommon(docList[i], index, true);
				}
			} else {
				admShowNoDataFoundTable();
			}
		}catch(error){}

		admSetFolderHeaderCaption();
		admSetSearchHeader();
	}
}

function admSingleDocumentFetchOnlyAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 200){
		var docList = response.object;
		try{
			if(docList != null && docList.length > 0){
				var data = docList[0];
				if(checkViewerExtention(data.fileType, data.fileSize)) {
					try {
						//adm_viewer_locked = isLocked;
						admViewerOpened = 1;
						if(data.status != "D"){
							var filesize = data.fileSize;
							if(filesize > 314572800){
								admViewerOpened = 0;
								admShowconfirmmsg(adm_messages.viewermorethan300MB, confirm_Error, 5000, "", false, false);
								setTimeout(function(){
									admStartDefaultDownload(data.id);
								}, 2000);
							} else {
								var fileType = data.fileType;
								var versionNumber = data.versionNumber;
								var filenm = data.fileName;
								var docid = data.id;
								if(filenm.indexOf(".") > 0){
									adm_viewer_docid = docid;
									adm_viewer_doc_version = versionNumber;
									adm_viewer_folderpath = "";
									adm_viewer_foldertype = admcurrentfoldertype;
									adm_viewer_filetype = fileType;
									adm_viewer_folderid = data.folderId;
									adm_viewer_docid_versionid = -1;
									var $iframe = $("#adm_viewerboxid");
									$iframe.attr("src","about:blank");

									var viewtype = localStorage.viewertype+"";
									if(fileType != "doc" && fileType != "docx" && fileType != "docm" && fileType != "ppt" && fileType != "pptx" && fileType != "pptm" && fileType != "pdf"
										&& fileType != "jpeg" && fileType != "jpg" && fileType != "png" && fileType != "tif" && fileType != "tiff" && fileType != "gif"&& fileType != "txt"
										&& fileType != "xml" && fileType != "js" && fileType != "eml" && fileType != "msg" && fileType != "rtf"){
										viewtype = "NORMAL_VIEWER";
									}
									if(viewtype == "undefined" && (fileType == "doc" || fileType == "docx" || fileType == "docm"
											|| fileType == "ppt" || fileType == "pptx" || fileType == "pptm" || fileType == "pdf" || fileType == "rtf")){
										//$(this).hide();
										$("#adm_viewer_type_open").html("Open");
										showActionPopup("adm_viewer_type");
									} else {
										admopenfilelink = true;
										admDisplayDocViewer(data.id, "null", viewtype, adm_viewer_folderid);
									}
									admFolderListAllServiceOnly(data.folderId,response.extrajsonparam.corpid);
								} else {
									admViewerOpened = 0;
									admShowconfirmmsg(adm_messages.couldnotopenFile, confirm_Error, 5000, "", false, false);
								}
							}
						} else {
							admViewerOpened = 0;
							admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
						}
					} catch(error){
						admViewerOpened = 0;
					}
				} else {
					admViewerOpened = 0;
					admShowconfirmmsg(adm_messages.couldnotopenFile, confirm_Error, 5000, "", false, false);
					setTimeout(function(){
						admStartDefaultDownload(data.id);
					}, 2000);
				}
			} else {
				//admShowNoDataFoundTable();
				admShowconfirmmsg(adm_messages.filenotpresentorpermissionnotthere, confirm_Error, 5000, "", false, false);
			}
		}catch(error){}
	} else if((response.error+"") == "true" && response.messageCode == 430) {
		admShowconfirmmsg(adm_messages.filenotpresentcorporate, confirm_Error, 5000, "", false, false);
	} else {
		admShowconfirmmsg(adm_messages.filenotpresentorpermissionnotthere, confirm_Error, 5000, "", false, false);
	}
}

/**
 * method to execute post actions after unindex doc delete webservice
 * @param response
 */
function admDeleteDocsAfter(response){
	admUnSelectAllCheckBox();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		var permdel = response.extrajsonparam.permdel;
		var jsonObj = response.extrajsonparam.idm;
		var keys = Object.keys(jsonObj);
		if(!permdel) {
			var docIds = "";
			for(i=0;i<keys.length;i++){
				if(i == 0) docIds = keys[i];
				else docIds = docIds + "," + keys[i];
			}
			admSingleDocumentFetch(docIds, response.extrajsonparam.idm);
		} else if(permdel) {
			ajaxindicatorstop();
			hideActionPopup("deleteconfirmmodal");
			admhideshowcreatefolderbuttons(true);
			admClearDeleteConfirmModal();
			admRefreshFunction();
			/*for(i=0;i<keys.length;i++){
				var index = jsonObj[keys[i]];
				var status = document.getElementById("adm_doc_row_"+index).getAttribute("data-status");
				if(status == "D"){
					$("#adm_doc_row_"+index).empty();
					$("#adm_doc_row_"+index).remove();
					$("#hr_doc_"+index).remove();
					var datalen = document.getElementById("tbldatarows").getAttribute("data-rowdispl");
					datalen = datalen-1;
					$("#tbldatarows").attr("data-rowdispl", datalen);
					admtotaldocs = admtotaldocs-1;
					admttotalfile = admttotalfile-1;
				}
			}
			admSetFolderHeaderCaption();
			if(temparrdelindex.length > 0) {
				admSingleDocumentFetch(temparrdelindex, response.extrajsonparam.idm);
			}*/
		}
	} else {
		ajaxindicatorstop();
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(response.message == "LOCKED"){
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.docidsdeletedfail, confirm_Error, 5000, "", false, false);
		}
	}
}

/**
 * method to execute post actions after unindex doc delete webservice
 * @param response
 */
function admrestoreTrashedDocsAfter(response){
	admUnSelectAllCheckBox();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		var jsonObj = response.extrajsonparam.idm;
		var keys = Object.keys(jsonObj);
		var docIds = "";
		for(i=0;i<keys.length;i++){
			if(i == 0) docIds = keys[i];
			else docIds = docIds + "," + keys[i];
		}
		admSingleDocumentFetch(docIds, response.extrajsonparam.idm);
	} else {
		ajaxindicatorstop();
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.docidsdeletedfail, confirm_Error, 5000, "", false, false);
		}
	}
}

function admDisplaySearchFilesServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		adm_search_progress = true;
		var folderType = response.extrajsonparam.folderType;
		$("#ul_more").show();
		$("#admallcheckboxlabel").show();
		$("#tbldatarows").html("");

		admtotaldocs = admtotaldocs + response.object.length;
		var docList = response.object;
		adm_doc_list = adm_doc_list.concat(docList);
		adm_doc_list = admListSortSort(adm_doc_list, "file");
		if(adm_doc_list != null && adm_doc_list.length > 0){
			for(var i=0;i<adm_doc_list.length;i++) {
				admLoopFileListCommon(adm_doc_list[i], i, false);
			}
			adm_documentmaxlimit = adm_documentmaxlimit + maxlimitlistadd;
		} else {
			admShowNoDataFoundTable();
		}
		$("#admfolderheader").html("<span id='admtotalfilesheader'>"+admtotaldocs+ " files</span>");
		$("#admfolderheader").show();
	}else{
		admShowconfirmmsg(adm_messages.admnorecordsfound, confirm_Info, 5000, "", false, false);
		norecordsfound = true;
	}

	adm_documentfetchdone = true;
	ajaxindicatorstop();
}

function admAddTagsAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		admShowconfirmmsg(adm_messages.tagadded, confirm_Success, 5000, "", false, false);
		incrtag = 0;
		var docid = document.getElementById("tagmodal").getAttribute("data-fileid");
		admFetchTags(docid);
	} else {
		ajaxindicatorstop();
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admFetchTagsAfter(response){
	ajaxindicatorstop();
	incrtag = 0;
	$("#tbltagrows").html("");
	$("#admtagnewtxt").val("");
	if((response.error+"") == "false" && response.object != null) {
		var details = response.object;
		if(details != null){
			var sm = "";
			for(var i=0;i<=details.length-1;i++){
				var id = details[i].id + "";
				var tag = details[i].tag;
				var fileId = details[i].fileId;
				var datavar = "data-id='"+id+"' data-fileid='"+fileId+"'";
				var taghtml = "";
				if(i > 0) taghtml += "<hr>";
				taghtml += "<div class='row' id='adm_div_TagsPopupIndex_"+i+"' "+datavar+">";
				taghtml += "	<div class='col-md-10'>";
				taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-18'>";
				taghtml += "			<label id='admtagtext_"+i+"'>"+tag+"</label>";
				taghtml += "		</div>";
				taghtml += "	</div>";
				taghtml += "	<div class='col-md-2'>";
				taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-18 cursor-pointer' id='adm_del_Tags_Popup_"+i+"' title='Delete Tag' "+datavar+">";
				taghtml += "			<i class='fa fa-trash' aria-hidden='true'></i>";
				taghtml += "		</div>";
				taghtml += "	</div>";
				taghtml += "</div>";

				$("#tbltagrows").append(taghtml);
				admDeleteTag("adm_del_Tags_Popup_"+i);
				incrtag = i;
			}
		}
	}

	if(incrtag < 9){
		//addNewTagPopupBlankRow();
	}
}

function admDeleteTagsAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		admShowconfirmmsg(adm_messages.tagdeleted, confirm_Success, 5000, "", false, false);
		incrtag = 0;
		var docid = response.extrajsonparam.docid;
		$("#tbltagrows").html("");
		admFetchTags(docid);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admFetchVersionAfter(response){
	incrtag = 0;
	versionincrtag = 0;
	admopenversionpopupstatus = false;
	if((response.error+"") == "false" && response.object != null) {
		var details = response.object;
		if(details != null){
			var sm = "";
			var taghtml = "";
			taghtml += "<div class='row'>";
			taghtml += "	<div class='col-md-1'>";
			taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-bold'>";
			taghtml += "			<label>version</label>";
			taghtml += "		</div>";
			taghtml += "	</div>";
			taghtml += "	<div class='col-md-4'>";
			taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-bold'>";
			taghtml += "			<label>Login Id</label>";
			taghtml += "		</div>";
			taghtml += "	</div>";
			taghtml += "	<div class='col-md-3'>";
			taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-bold'>";
			taghtml += "			<label>Size</label>";
			taghtml += "		</div>";
			taghtml += "	</div>";
			taghtml += "	<div class='col-md-2'>";
			taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-bold'>";
			taghtml += "			<label>Created Date</label>";
			taghtml += "		</div>";
			taghtml += "	</div>";
			taghtml += "	<div class='col-md-2'>";
			taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 font-bold'>";
			taghtml += "			<label>Download</label>";
			taghtml += "		</div>";
			taghtml += "	</div>";
			taghtml += "</div>";
			$("#tblversionrows").append(taghtml);

			for(var i=0;i<=details.length-1;i++){
				var id = details[i].id + "";
				var fileId = details[i].fileId + "";
				var version = details[i].versionNumber;
				var filename = details[i].storageFileName;
				var fileType = details[i].fileType;
				if(version > 1 && filename.indexOf("_"+fileId+"_"+version) > 0){
					var sm = filename.substring(0, filename.lastIndexOf("_"+fileId+"_"+version));
					filename = sm;
				}

				var username = "";
				if(localStorage._zs == "I"){
					username = localStorage._zk;
				}else{
					username = adm_User_Array[details[i].userId];
				}

				username = details[i].loginId+"";
				if(username=="null" || username=="undefined"){
					username = "";
				}

				/*if(filename.indexOf(".") == 0) {
					filename = filename.substring(1);
				} else if(filename.indexOf(".") >= 0) {
					filename = filename.substring(0, filename.lastIndexOf("."));
				}*/

				var filenameact = filename;
				if(filename.length > 23) {
					if(filename.indexOf(".") > 0){
						filename = filename.substring(0, filenameact.lastIndexOf("."));
						if(filename.length > 20) filename = filename.substring(0, 20) + "..." + "." + fileType;
					} else {
						filename = filename.substring(0, 20) + "...";
					}
				}

				var size = parseInt(details[i].fileSize);
				size = size/1000;
				if(size >= 1000) {
					size = size/1000;
					size = size.toFixed(2) + " MB";
				}else{
					size = size.toFixed(2) + " KB";
				}

				var v = admSharedFoldersPermission[admcurrentfolderid]+"";
				var allowdn = false;
				if(v != "null" && v != "undefined" && v.indexOf("Y#") == 0){
					allowdn = true;
				} else if(v == "null" || v == "undefined") {
					allowdn = true;
				} else if(admcurrentfoldertype == admpersonaltype) {
					allowdn = true;
				}

				var fileCreatedDate = getlocaltimestampfromutcdata(handleNullValue(details[i].fileCreatedDate));
				fileCreatedDate = getdatefromtimestamp(fileCreatedDate, false, "EN-US");

				var fileId = details[i].fileId;
				taghtml = "";
				/*taghtml += "<div  id='"+adm_div_VersionPopupIndex_+i+"'>";
				taghtml += "	<ul>";
				taghtml += "		<li class='form-control popupspace table'>";
				taghtml += "			<span class='cell pl5' style='width:7% !important;'><input name='' readonly value='"+version+"' type='text' style='border:0px;'></span>";
				taghtml += "			<span class='cell pl5' style='width:53% !important;'><input name='' readonly value='"+filename+"' type='text' style='border:0px;cursor:pointer;color:#6699cc;' id='"+adm_download_Version_View_Popup_+i+"' data-id='"+id+"' data-fileid='"+fileId+"'></span>";
				taghtml += "			<span class='cell pl5' style='width:10% !important;'><input name='' readonly value='"+fileType+"' type='text' style='border:0px;'></span>";
				taghtml += "			<span class='cell pl5' style='width:15% !important;'><input name='' readonly value='"+size+"' type='text' style='border:0px;'></span>";
				taghtml += "			<span class='cell pl5' style='width:15% !important;'><input name='' readonly value='"+fileCreatedDate+"' type='text' style='border:0px;'></span>";
				taghtml += "			<span class='cell' style='display:none !important;'><span class='delete_new_cls'  id='"+adm_del_Version_Popup_+i+"' title='Delete Version' data-id='"+id+"' data-fileid='"+fileId+"'></span></span>";
				taghtml += "			<span class='cell'><span class='download_new_cls'  id='"+adm_download_Version_Popup_+i+"' title='Download Version' data-id='"+id+"' data-fileid='"+fileId+"' data-size='"+details[i].fileSize+"'></span></span>";
				taghtml += "		</li>";
				taghtml += "	</ul>";
				taghtml += "</div>";*/


				taghtml += "<div class='row'>";
				taghtml += "	<div class='col-md-1'>";
				taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 padding-0'>";
				taghtml += "			<label>"+version+"</label>";
				taghtml += "		</div>";
				taghtml += "	</div>";
				taghtml += "	<div class='col-md-4' style='cursor:pointer;' id='adm_download_Version_View_Popup_"+i+"' data-id='"+id+"' data-fileid='"+fileId+"' data-filetype='"+fileType+"'>";
				taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 padding-0'>";
				//taghtml += "			<label id='adm_version_filenm_"+i+"' class='sneha1' style='cursor:pointer;border:0px;background-color:transparent;text-align:left;margin-top:0px;' title='"+filenameact+"'>"+filename+"</label>";
				taghtml += "			<label id='adm_version_filenm_"+i+"' class='sneha1' style='cursor:pointer;border:0px;background-color:transparent;text-align:left;margin-top:0px;' title='"+username+"'>"+username+"</label>";
				taghtml += "			<img src='assets/img/dcirrus_spins.gif?v=4' width='30px' height='30px' id='adm_version_filenm_progress_"+i+"' style='display:none;'/>";
				taghtml += "		</div>";
				taghtml += "	</div>";
				taghtml += "	<div class='col-md-3'>";
				taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 padding-0'>";
				taghtml += "			<label>"+size+"</label>";
				taghtml += "		</div>";
				taghtml += "	</div>";
				taghtml += "	<div class='col-md-2'>";
				taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 padding-0'>";
				taghtml += "			<label>"+fileCreatedDate+"</label>";
				taghtml += "		</div>";
				taghtml += "	</div>";
				if(allowdn) {
					taghtml += "	<div class='col-md-2' style='cursor:pointer;' id='adm_download_Version_Popup_"+i+"' title='Download Version' data-id='"+id+"' data-fileid='"+fileId+"'>";
					taghtml += "		<div class='form-group custom-mt-form-group margin-bottom-0 padding-0'>";
					taghtml += "			<img class='down' style='cursor:pointer;margin-top:0px;' src='assets/img/lay.png'>";
					taghtml += "		</div>";
					taghtml += "	</div>";
				} else {
					taghtml += "	<div class='col-md-2' style='cursor:pointer;'>&nbsp;</div>";
				}
				taghtml += "</div>";
				$("#tblversionrows").append(taghtml);

				admDeleteVersion("adm_del_Version_Popup_"+i);
				admDownloadversion("adm_download_Version_Popup_"+i);
				admViewversion("adm_download_Version_View_Popup_"+i);
				incrtag = i;
				versionincrtag++;
			}
		}
	}
	//admPrepareVersionURL();
}

function admDeleteVersionServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		admShowconfirmmsg(adm_messages.versiondeleted, confirm_Success, 5000, "", false, false);
		incrtag = 0;
		var docid = response.extrajsonparam.docid;
		$("#"+adm_div_VersionDiv).html("");
		if(versionincrtag == 1) {
			var jsonInput = {"attribute1":docid};
			admDeleteDocs("", jsonInput);
			hideActionPopup(adm_screenDimmer, adm_div_version);
		} else {
			admFetchVersion(docid);
		}
		versionincrtag--;
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admDisplayDocViewerVersionAfter(data){
	admViewerOpened = 0;
	if(data.error == false && data.messageCode == 200){
		var extraParam = data.extrajsonparam;
		$("#adm_version_filenm_progress_"+extraParam.idm).hide();
		$("#adm_version_filenm_"+extraParam.idm).show();
		if(data.object != null && data.object != "null" && data.object != ""){
			var $iframe = $("#adm_viewerboxid");
			if ($iframe.length) {
				var url = data.object+"";
				var actURL = url;
				//$iframe.attr("height", "100%");
				//$iframe.attr("src",url);
				//$("#adm_viewer").css("z-index", "99999999");
				//var pHeight = $(window).height()-50;
				//var pWidth = $(window).width()-100;
				//$iframe.attr("height", pHeight);
				//$iframe.attr("width", "100%");
				//$("#adm_viewer_modal_lg").css("max-width", pWidth);
		        //$("#adm_viewer").modal("show");

				var extension = "";
				if(actURL.indexOf(".") >= 0) {
					extension = actURL.substring(actURL.lastIndexOf(".")+1);
					extension = extension.toLowerCase();
				}

				if(extension == "xls" || extension == "xlsx"){
					var nURL = actURL.substring(0, actURL.indexOf("#"));
					var bURL = actURL.substring(actURL.indexOf("#")+1);
					var d = new Date();
					var n = d.getTime();
					var fl = actURL.split("#")[1];
    				fl = fl.replaceAll('.xlsx', '');
					fl = fl.replaceAll('.xls', '');
					try{
						if(!downloadallowed) {
							actURL = nURL + "?file="+bURL+"&v=3&allowprint=N&i="+fl+"&n="+n;
						} else if(downloadallowed) {
							actURL = nURL + "?file="+bURL+"&v=3&allowprint=Y&i="+fl+"&n="+n;
						}
					}catch(error){
						actURL = nURL + "?file="+bURL+"&v=3&allowprint=Y&i="+fl+"&n="+n;
					}
					var w = window.open(actURL);
					w.document.title = document.getElementById("adm_filenm_"+idm).getAttribute("data-filename");
				} else if(actURL.indexOf("adobe/#viewer/") > 0){
					var nURL = actURL.substring(0, actURL.indexOf("#"));
					if(!downloadallowed) {
						actURL = actURL + "?p=0";
					} else if(downloadallowed) {
						actURL = actURL + "?p=1";
					}
					var w = window.open(actURL);
				} else {
					if(!downloadallowed) {
						actURL = actURL + "&allowprint=N";
					} else if(downloadallowed) {
						actURL = actURL + "&allowprint=Y";
					}
					actURL = actURL.replace("index.html?documentId=", "index.html?v=9.0&documentId=");
					$iframe.attr("src",actURL);
					var pHeight = $(window).height()-60;
					var pWidth = $(window).width()-100;
					$iframe.attr("height", pHeight);
					$iframe.attr("width", "100%");
					$("#adm_viewer_modal_lg").css("max-width", "94%");
					showActionPopup("adm_viewer");
					//$("#adm_viewer").modal("show");
				}
			}
		}else if(data.message == "FILEERROR"){
			admShowconfirmmsg(adm_messages.couldnotopenFile, confirm_Error, 5000, "", false, false);
			$("#adm_version_filenm_progress_"+extraParam.idm).hide();
		}else{
			admShowconfirmmsg(adm_messages.couldnotopenviewer, confirm_Error, 5000, "", false, false);
			hideActionPopup("adm_Viewer");
		}
	}else{
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotopenviewer, confirm_Error, 5000, "", false, false);
		}
		hideActionPopup(adm_screenDimmer, adm_Viewer);
	}
}

function admFetchFoldersByParentIdAfter(data){
	ajaxindicatorstop();
	if(data.error == false && data.messageCode == 200){
		var extraParam = data.extrajsonparam;
		var methodToBeCalled = extraParam.action;
		window[methodToBeCalled](data);
	}
}

function admCopyFolderPopulate(data){
	$("#tblfolderrows").html("");
	var folderList = data.object;
	try{
		for(var i=0;i<folderList.length;i++) {
			var topd = false;
			var topm = false;
			var datahtml='';
			var vm = folderList[i].split("#");
			var folderId = vm[0];
			var foldername= vm[1];
			var noOfFiles = vm[2];
			var folderIndex = vm[3];
			if(folderIndex.length > 0){
				folderIndex = folderIndex + "-";
			}
			var status = folderList[i].status;
			var folderpath = foldername;
			adm_copy_parentfolderpath[folderpath] = folderId;

			if(folderpath.indexOf("/") > 0){
				foldername = foldername.substring(folderpath.lastIndexOf("/")+1);
			}

			if(admCopyFolderType == admpersonaltype && foldername.toLowerCase().trim() == "dcirrus"){
				topd = true;
			} else if(admCopyFolderType == admpersonaltype && foldername.toLowerCase().trim() == "mymobile"){
				topm = true;
			}

			var datavar = "data-id='"+folderId+"' path=\""+folderpath+"\" data-count='"+noOfFiles+"' data-foldername=\""+foldername+"\"";

			var stylefontfile = "";
			if(topd || topm){
				stylefontfile = "color:forestgreen;";
			}

			if(i>0){
				datahtml += "<hr>";
			}

			datahtml += "<div class='row new-row copyrow' id='adm_copy_folderrow_"+i+"' "+datavar+" style='margin-right:0px;margin-left:0px;'>";
			datahtml += "<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;' id='adm_copy_foldername_"+i+"' "+datavar+">";
			datahtml += "	<div>";
			datahtml += "		<img class='respons' src='assets/img/folder.png' alt='' style='vertical-align:unset;'>";
			datahtml += "	</div>";
			datahtml += "	<div style='padding-top:12px;'>";
			datahtml += "	<h2 title=\""+folderpath+"\">";
			datahtml += "		<a href='javascript:void(0);' style='height:18px;"+stylefontfile+"font-size:14px;font-weight:400;line-height:20px;color:#23bbf3;'>";
			if(topd) {
				datahtml += folderIndex + "DCirrus Sync";
			} else if(topm) {
				datahtml += "MyMobile";
			} else {
				var totalLength = 30;

				if((folderIndex + foldername).length >=totalLength){
					var charRemaining = totalLength - folderIndex.length;
					var lfolderLength = foldername.length;
					var fixedLength = "...".length;
					var displayChar = charRemaining - fixedLength;
					if(lfolderLength > displayChar){
						var foldername = foldername.substring(0,displayChar)+"...";
					}
				}
				datahtml += folderIndex + foldername;
			}
			datahtml += "			<br>";
			if(status == "D"){
				datahtml += " 			<span class='rowspanfoldername' style='"+stylefontfile+"'>";
			} else {
				datahtml += "			<span class='rowspanfoldername'> ";
			}
			// Below commented line is used for copy/move file count in both user.
			// datahtml += noOfFiles+" files";
			datahtml += "			</span>";
			datahtml += "		</a>";
			datahtml += "	</h2>";
			datahtml += "	</div>";
			datahtml += "</div>";
			datahtml += "</div>";

			$("#tblfolderrows").append(datahtml);
			admCopyFolderClickMoreEvent("adm_copy_folderrow_"+i);
		}
	}catch(error){}
}

/**
 * method to excute post action for copy and move service
 * @param data
 */
function admCopyMoveServiceAfter(data){
	ajaxindicatorstop();
	hideActionPopup("copymodal");
	admUnSelectAllCheckBox();
	if(data.error == false && data.messageCode == 202){
		var extraParam = data.extrajsonparam;
		if(extraParam.action == "copy") {
			if(extraParam.length == 1) {
				admShowconfirmmsg((adm_messages.admcopydone).replace("Files", "File"), confirm_Success, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.admcopydone, confirm_Success, 5000, "", false, false);
			}
		} else {
			if(extraParam.length == 1) {
				admShowconfirmmsg((adm_messages.admmovedone).replace("Files", "File"), confirm_Success, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.admmovedone, confirm_Success, 5000, "", false, false);
			}
		}

		if(extraParam.action == "move") {
			ajaxindicatorstart('loading data.. please wait..');
			admClearFolderFileCache();
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		}
		admSaveFolderSizeSingleFolderIdService();
	} else {
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "LOCKED"){
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admUploadFileAfter(){
	var isVersion = false;
	var jsonInput = {listAttribute4:[]};
	for(var i=0;i<adm_folderPathList_URL_DONE.length;i++){
		var data = adm_folderPathList_URL_DONE[i];

		var extension = "";
		if(data.attribute2.indexOf(".") >= 0) {
			extension = data.attribute2.substring(data.attribute2.lastIndexOf(".")+1);
		}
		var json = {
			userId:localStorage._zv,
			folderId:data.attribute1,
			parentFolderId:data.attribute6,
			storageFileName:data.attribute9,
			fileName:data.attribute2,
			fileSize:data.attribute3,
			fileType:extension,
			status:"A",
			deleteStatus:"",
			folderType:data.attribute5,
			fileUniqueId:"",
			fileId:data.attribute8
		};
		jsonInput.listAttribute4.push(json);
	}

	try{
		if(parseFloat(data.attribute8+"")> 0){
			isVersion = true;
			jsonInput.attribute5 = data.attribute8;
		}
	}catch(error){}

	if (jsonInput.listAttribute4.length > 0) {
		admdefaultMessageUploadSuccess = adm_messages.filesuploadedprocess;
		if (localStorage._zp == "1" && admcurrentpath == "") {
			if (localStorage._zs == "B") {
				if (root_access_folder_notexists == "NotExists1") {
					admdefaultMessageUploadSuccess = adm_messages.filesuploadedprocessvisibletoalladmins;
				} else if (root_access_folder_notexists == "NotExists0") {
					admdefaultMessageUploadSuccess = adm_messages.filesuploadedprocessnotvisibletoothers;
				}
			}
		}
		admShowconfirmmsg(admdefaultMessageUploadSuccess, confirm_Info, 5000, "", false, false);
		admDocAddMetaDataService(jsonInput, true);
	}

	adm_folderPathList_URL_DONE = [];
}

var lockedfilesg = 0;
var indexg = 0;
function admDocAddMetaDataServiceAfter(data) {
	var ref = true;
	uploadinboundcount = uploadinboundcount + data.object.length;
	parent.adm_FolderId_FileName = [];
	ajaxindicatorstop();
	if (data.message.indexOf("UPLOADED-") == 0) {
		var lockedfiles = data.message.split("-")[1];

		if (lockedfiles == "1") {
			lockedfilesg = parseFloat(lockedfiles) + 1;
		} else if (parseFloat(lockedfiles) > 1) {
			lockedfilesg = parseFloat(lockedfiles) + lockedfilesg;
		}
	}
	var msg = adm_messages.lockedfilesuploadedno;
	if (uploadbatchcount >= uploadinboundcount) {
		uploadinboundcount = 0;
		uploadbatchcount = 0;
		if (lockedfilesg == 1) {
			msg = msg.replace("<LOCKEDFILES>", "1 locked file");
			admShowconfirmmsg(msg, confirm_Success, 5000, "", false, false);
		} else if (parseFloat(lockedfiles) > 1) {
			msg = msg.replace("<LOCKEDFILES>", lockedfiles + " locked files");
			admShowconfirmmsg(msg, confirm_Success, 5000, "", false, false);
		}
	}

	if (ref == true) {
		var extraParam = data.extrajsonparam;
		var refresh = extraParam.refresh;
		//if(refresh == true) {
		var match = false;
		for (var i = 0; i < data.object.length; i++) {
			var sk = data.object[i].split("#");
			if (sk[1] == admcurrentfolderid || sk[2] == admcurrentfolderid) {
				match = true;
				break;
			}
		}
		if (match) {
			var mg = adm_messages.filesuploadedsuccessfully1;
			adm_doc_list = [];
			//admShowconfirmmsg("Files uploaded successfully", confirm_Success, 5000, "", false, false);
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		}
		//}
	}
}

/**
 * method to do action after shared security fetched
 * @param response
 */
function admFetchFolderSharedSecurityServiceAfter(response){
	ajaxindicatorstop();
	var show = true;
	var extraParam = response.extrajsonparam;
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		var useridls = ",";
		var sm = [];
		if(data != null && data.length > 0){
			for(var i=0;i<=data.length-1;i++){
				var downloadchecked = data[i].download + "";
				if(downloadchecked == "Y") downloadchecked = true;
				else downloadchecked = false;

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

				sm.push({"userid":data[i].userId,"download":downloadchecked,"outshare":outsharechecked,"inshare":insharechecked,"delete":deletechecked,"copy":copychecked,"move":movechecked, "id":data[i].id, "status":data[i].status});
			}
		}
		var collection = $(".adm_userpopupcheckboxcustom_Cls");
		collection.each(function() {
		    var id = $(this).attr("id");
		    var idm = id.substring(id.lastIndexOf("_")+1);
		    var viewidm = "adm_sec_checkbox_view_" + idm;
		    var downloadidm = "adm_sec_checkbox_download_" + idm;
		    var outshareidm = "adm_sec_checkbox_share_" + idm;
		    var inshareidm = "adm_sec_checkbox_deposit_" + idm;
		    var deleteidm = "adm_sec_checkbox_delete_" + idm;
		    var copyidm = "adm_sec_checkbox_copy_" + idm;
		    var moveidm = "adm_sec_checkbox_move_" + idm;

		    var userid = document.getElementById("adm_security_row_"+idm).getAttribute("data-userid");
		    var userType = document.getElementById("adm_security_row_"+idm).getAttribute("data-usertype");
		    //if(useridls.indexOf(userid) < 0) {
		    	$("#"+id).checkboxradio();
		    	admAddUpdateSharedSecuirtyRow(idm);
		    	document.getElementById("adm_security_row_"+idm).setAttribute("data-pid", "0");
		    	$("#"+id).prop('checked', true);
		    	$("#"+viewidm).prop('checked', true);
				$("#"+downloadidm).prop('checked', true);
				$("#"+outshareidm).prop('checked', true);
				$("#"+inshareidm).prop('checked', true);
				$("#"+deleteidm).prop('checked', true);
				$("#"+copyidm).prop('checked', true);
				$("#"+moveidm).prop('checked', true);
		    	sm.forEach(function(entry) {
				if (entry.userid == userid) {
					if(entry.status == "A") {
						$("#"+viewidm).prop('checked', true);
					} else if(entry.status == "I") {
						$("#"+viewidm).prop('checked', false);
						$("#"+id).prop('checked', false);
					}
					document.getElementById("adm_security_row_"+idm).setAttribute("data-pid", entry.id);
					$("#"+downloadidm).prop('checked', entry.download);
					$("#"+outshareidm).prop('checked', entry.outshare);
					$("#"+inshareidm).prop('checked', entry.inshare);
					$("#"+deleteidm).prop('checked', entry.delete);
					$("#"+copyidm).prop('checked', entry.copy);
					$("#"+moveidm).prop('checked', entry.move);
				}
			});
		});
	} else if(response.message == "NOPERMISSION"){
		show = false;
		admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
	}

	if(show && extraParam.isshow){
		$("#adm_checkboxselectallshare").prop("checked", false);
		$("#adm_checkboxsharesecchild").prop("checked", true);
		showActionPopup("sharesecuritymodal");
	}
}

/**
 * method to respond after shared folder security added
 * @param response
 */
function admSaveSharedFolderSecurityServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 201){
		admShowconfirmmsg(adm_messages.admsharedfoldersecurityadded, confirm_Success, 5000, "", false, false);
	}else{
		admShowconfirmmsg(adm_messages.admsharedfoldersecuritynotadded, confirm_Error, 5000, "", false, false);
	}
	adm_var_permission = "";
}

function admUpdateSharedFolderSecurityServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && (response.messageCode == 201 || response.messageCode == 202)){
		admShowconfirmmsg(adm_messages.admsharedfoldersecurityadded, confirm_Success, 5000, "", false, false);
	}else{
		admShowconfirmmsg(adm_messages.admsharedfoldersecuritynotadded, confirm_Error, 5000, "", false, false);
	}
}

function admShareMgmtOutboundListServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		ldrive_shareOut_docTotal = data.length;
		if(data != null && data.length > 0){
			var arrindex = [];
			var folderList = false;
			for(var i=0;i<data.length;i++){
				var index = admsharemgmtmaxlimit + i;
				var shareuserhtml ="";
				var allowDownload = data[i].allowDownload;
				var allowPrint = data[i].allowPrint;
				var allowUpload = data[i].allowUpload;
				var allowSign = data[i].toSign;
				arrindex[i] = index + "#" + allowDownload + "#" + allowPrint;

				var shareddate = getlocaltimestampfromutcdata(handleNullValue(data[i].shareDate));
				shareddate = getdatefromtimestamp(shareddate, false, "EN-US");

				var expiredate = "";
				try{
					expiredate = getlocaltimestampfromutcdata(handleNullValue(data[i].expiryDate));
					expiredate = getdatefromtimestamp(expiredate, false, "EN-US");
					var dt1970 = new Date('1970-01-01');
					if(expiredate <= dt1970) expiredate = "";
				}catch(error){
					expiredate = "";
				}

				var readonlycheck = "";
				if(data[i].allowDownload == "N"){
					readonlycheck = "checked";
				}
				var printcheck = "";
				if(data[i].allowPrint == "Y"){
					printcheck = "checked";
				}

				var uploadCheck = "";
				if(allowUpload == 1){
					uploadCheck = "checked";
				}

				var tosign = "";
				if(allowSign == 1){
					tosign = "checked";
				}

				var subject = data[i].mailSubject;
				if(subject != null && subject.length > 42){
					subject = subject.substring(0, 42) + "...";
				}

				var datahtml = "";
				var datavar = "data-id='"+data[i].shareLoginId+"' ";
				if(($("#tblsharemgmtrows").html()).length > 0) datahtml += "<hr id='hr_share_"+index+"'>";
				datahtml += "<div class='row new-row' id='adm_sharemgmt_row_"+index+"' "+datavar+" style='padding-top:10px;'>";
				var lsharedemailid = data[i].sharedToEmailId;
				if(data[i].sharedToEmailId.length > 20){
					lsharedemailid = data[i].sharedToEmailId.substr(0,20)+"..."
				}
				datahtml += "<div class='col-md-3 up' title='"+data[i].sharedToEmailId+"'>"+lsharedemailid+"</div>";
				datahtml += "	<div class='col-md-3 up' title='"+data[i].mailSubject+"'>";
				datahtml += "		<span class='font-18 cursor-pointer' id='adm_info_sgmt_"+index+"' title='Folder/Filelist Info' "+datavar+" style='margin-left:15%;'>";
				datahtml += "			<i class='fa fa-info' aria-hidden='true'></i>";
				datahtml += "		</span>";
				datahtml += 		subject;
				datahtml += "	</div>";
				datahtml += "	<div class='col-md-1 up'>"+shareddate+"</div>";
				datahtml += "	<div class='col-md-1 up'>"+expiredate+"</div>";
				datahtml += "	<div class='col-md-4 up' style='padding-left:2%;'>";
				datahtml += "		<label class='contner' style='margin-bottom:16px;'>";
				datahtml += "			<input type='checkbox' id='adm_smgmt_read_checkbox_"+index+"' "+datavar+" "+readonlycheck+">";
				datahtml += "			<span class='checkmark'></span>";
				datahtml += "		</label>";
				datahtml += "		<label class='contner' style='margin-bottom:16px;margin-left:15%;'>";
				datahtml += "			<input type='checkbox' id='adm_smgmt_print_checkbox_"+index+"' "+datavar+" "+printcheck+">";
				datahtml += "			<span class='checkmark'></span>";
				datahtml += "		</label>";
				if(data[i].folderId != 0 || data[i].folderId != "0"){
					datahtml += "		<label class='contner' style='margin-bottom:16px;margin-left:15%;'>";
					datahtml += "			<input type='checkbox' id='adm_smgmt_upload_checkbox_"+index+"' "+datavar+" "+uploadCheck+">";
					datahtml += "			<span class='checkmark'></span>";
					datahtml += "		</label>";

				} else {
					datahtml += "		<label class='contner' style='margin-bottom:16px;margin-left:14%;'>&nbsp;</label>";
				}
				// datahtml += "		<label class='contner' style='margin-bottom:16px;margin-left:15%;'>";
				// datahtml += "			<input type='checkbox' id='adm_smgmt_tosign_checkbox_"+index+"' "+datavar+" "+tosign+">";
				// datahtml += "			<span class='checkmark'></span>";
				// datahtml += "		</label>";
				datahtml += "		<span class='font-18 cursor-pointer' id='adm_del_sgmt_"+index+"' title='Delete' "+datavar+" style='margin-left:15%;'>";
				datahtml += "			<i class='fa fa-trash' aria-hidden='true'></i>";
				datahtml += "		</span>";
				datahtml += "	</div>";
				datahtml += "</div>";
				$("#tblsharemgmtrows").append(datahtml);

				admDeleteFileNameClick("adm_del_sgmt_"+index);
				admShareDownloadChange("adm_smgmt_read_checkbox_"+index);
				admSharePrintChange("adm_smgmt_print_checkbox_"+index);
				admShareUploadChange("adm_smgmt_upload_checkbox_"+index);
				admShareSignChange("adm_smgmt_tosign_checkbox_"+index);
				admShowFolderFileListInfo("adm_info_sgmt_"+index);
			}
		}
		admsharemgmtmaxlimit = admsharemgmtmaxlimit + 100;
	}
}

function admShareMgmtInboundListServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		ldrive_shareOut_docTotal = data.length;
		if(data != null && data.length > 0){
			var arrindex = [];
			var folderList = false;
			for(var i=0;i<data.length;i++){
				var index = admsharemgmtmaxlimit + i;
				var shareddate = getlocaltimestampfromutcdata(handleNullValue(data[i].shareCreatedDate));
				shareddate = getdatefromtimestamp(shareddate, false, "EN-US");

				var subject = data[i].mailSubject;
				if(subject != null && subject.length > 42){
					subject = subject.substring(0, 42) + "...";
				}

				var datahtml = "";
				var datavar = "data-id='"+data[i].unindexShareAccessId+"' data-name=\""+data[i].folderPath+"\" data-foldertype='"+data[i].folderType+"'";
				if(($("#tblinboundrows").html()).length > 0) datahtml += "<hr id='hr_inbound_"+index+"'>";
				datahtml += "<div class='row new-row' id='adm_inboundsharemgmt_row_"+index+"' "+datavar+" style='padding-top:10px;'>";
				var lrfd_emailId = data[i].emailId;
				if(data[i].emailId.length > 20){
					lrfd_emailId = data[i].emailId.substr(0,20)+"...";
				}
				datahtml += "	<div class='col-md-3 up' title='"+data[i].emailId+"'>"+lrfd_emailId+"</div>";
				datahtml += "	<div class='col-md-4 up' title='"+data[i].mailSubject+"'>";
				datahtml += "		<span class='font-18 cursor-pointer' id='adm_info_inbound_sgmt_"+index+"' title='Folder Info' "+datavar+" style='margin-left:15%;'>";
				datahtml += "			<i class='fa fa-info' aria-hidden='true'></i>";
				datahtml += "		</span>";
				datahtml += 		subject;
				datahtml += "	</div>";
				datahtml += "	<div class='col-md-2 up'>"+shareddate+"</div>";
				datahtml += "	<div class='col-md-1 up'>"+data[i].status+"</div>";
				datahtml += "	<div class='col-md-2 up' style='padding-left:4%;'>";
				datahtml += "		<span class='font-18 cursor-pointer' id='adm_del_inboundsgmt_"+index+"' title='Delete' "+datavar+" style='margin-left:15%;'>";
				datahtml += "			<i class='fa fa-trash' aria-hidden='true'></i>";
				datahtml += "		</span>";
				datahtml += "	</div>";
				datahtml += "</div>";
				$("#tblinboundrows").append(datahtml);

				admDeleteInBoundShareClick("adm_del_inboundsgmt_"+index);
				admInfoInBoundShareClick("adm_info_inboundsgmt_"+index);
				admInfoInBoundShareInfoClick("adm_info_inbound_sgmt_"+index);
			}
		}
		admsharemgmtmaxlimit = admsharemgmtmaxlimit + 100;
	}
}

function admDeleteOutboundShareAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var error = response.error+"";
		var data = response.object+"";
		var extraParam = response.extrajsonparam;
		var index = extraParam.index;
		if(error == "false" && data == "true"){
			$("#adm_sharemgmt_row_"+index).remove();
			$("#hr_share_"+index).remove();
			admShowconfirmmsg(adm_messages.docidsdeletedsuccess, confirm_Success, 5000, "", false, false);
		}else{
			admShowconfirmmsg(adm_messages.docidsdeletedfail, confirm_Error, 5000, "", false, false);
		}
	}
}

function admDeleteInboundShareAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var error = response.error+"";
		var data = response.object+"";
		var extraParam = response.extrajsonparam;
		var index = extraParam.index;
		if(error == "false" && data == "true"){
			$("#adm_inboundsharemgmt_row_"+index).remove();
			$("#hr_inbound_"+index).remove();
			admShowconfirmmsg(adm_messages.docidsdeletedsuccess, confirm_Success, 5000, "", false, false);
		}else{
			admShowconfirmmsg(adm_messages.docidsdeletedfail, confirm_Error, 5000, "", false, false);
		}
	}
}

function admAllowDownloadOutboundShareAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		var details = response.object;
		if(details == true) {
			if(extraParam.allowed == "Y"){
				admShowconfirmmsg(adm_messages.allowdownload, confirm_Success, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.blockdownload, confirm_Success, 5000, "", false, false);
			}
		}
	}
}

function admAllowPrintOutboundShareAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var details = response.object;
		var extraParam = response.extrajsonparam;
		var showalert = extraParam.showalert;
		var allowed = extraParam.allowed;
		if(details == true && showalert == "true") {
			if(allowed == "Y"){
				admShowconfirmmsg(adm_messages.allowprint, confirm_Success, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.blockprint, confirm_Success, 5000, "", false, false);
			}
		}
	}
}

function admAllowUploadOutboundShareAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var details = response.object;
		var extraParam = response.extrajsonparam;
		if(details == true) {
			if(extraParam.allowed == "1"){
				admShowconfirmmsg(adm_messages.allowupload, confirm_Success, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.blockupload, confirm_Success, 5000, "", false, false);
			}
		}
	}
}

function admAllowSignOutboundShareAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var details = response.object;
		var extraParam = response.extrajsonparam;
		if(details == true) {
			if(extraParam.allowed == "1"){
				admShowconfirmmsg(adm_messages.allowsign, confirm_Success, 5000, "", false, false);
			} else {
				admShowconfirmmsg(adm_messages.blocksign, confirm_Success, 5000, "", false, false);
			}
		}
	}
}

function admUploadAnnotationDocumentAfter(data){
	if(data.error == false && data.messageCode == 201){

	}
}

function admShowFolderFileListInfoServiceAfter(response){
	ajaxindicatorstop();
	$("#tblsharemgmtinforows").html("");
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		if(data != null && data.length > 0 && data.indexOf("#") < 0){
			for(var i=0;i<data.length;i++){
				var datahtml = "";
				datahtml += "<div class='row new-row'>";
				datahtml += "	<div class='col-md-12 up'>"+data[i].fileName+"</div>";
				datahtml += "</div>";
				datahtml += "<hr>";
				$("#tblsharemgmtinforows").append(datahtml);
			}
		} else if(data != null){
			var m = data.split("#");
			if(m[0] == "P"){
				if(localStorage._zs == "I"){
					$("#tblsharemgmtinforows").html("Folder Type : Data Room<br>Folder Path : " + m[1]);
				}else{
					$("#tblsharemgmtinforows").html("Folder Type : Personal Folder<br>Folder Path : " + m[1]);
				}
			} else {
				$("#tblsharemgmtinforows").html("Folder Type : Data Room<br>Folder Path : " + m[1]);
			}
		}else{
			console.log("data === "+data);
		}
	}else {
		var datahtml = "";
				datahtml += "	<div class='col-md-12 up'>"+adm_messages.sharedfilesfoldersdeleted+"</div>";
				datahtml += "</div>";
				$("#tblsharemgmtinforows").append(datahtml);
	}
	showActionPopup("sharemgmtfileinfo");
}

function admSingleUserProfileServiceAfter(response){
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

		$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(name1))));
		$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
		$("#musername").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name)));
		$("#musername_first").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name)));
		$("#museremail").html(data.loginId);
		$("#museremail_first").html(data.loginId);
		$("#muserType").val(capitalizefirstletterfromallword(checkscreenwidthdesc(data.type)));


		$("#username_switch").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(name1))));
		$("#username_switch").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
		$("#musername_switch").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name)));
		$("#musername_first_switch").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name)));
		$("#museremail_switch").html(data.loginId);
		$("#museremail_first_switch").html(data.loginId);
		$("#muserType_switch").val(capitalizefirstletterfromallword(checkscreenwidthdesc(data.type)));



		if(data.syncType == "P"){
			if(localStorage._zs == "I"){
				$("#msynctype").val("Dataroom Sync");
			}else{
				$("#msynctype").val("Personal Folder Sync");
			}
		} else if(data.syncType == "S"){
			$("#msynctype").val("Dataroom Sync");
		}

		$("#mfirstname").val(firstname);
		$("#mmiddlename").val(middlename);
		$("#mlastname").val(lastname);
		$("#musercorp").html(localStorage._zu);
		$("#musercorp_first").html(localStorage._zu);
		$("#muser_type").html(capitalizefirstletterfromallword(checkscreenwidthdesc(data.type)));
		if(localStorage._zs == "B") {
			$("#musercorp").hide();
			$("#musercorp_first").hide();
		}

		$("#mcompany").val(replacenullval(trimOverFlowCharacters(localStorage._zo)));
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
			$("#muserimg_first").attr("src", imagePath + "?timestamp=" + new Date().getTime());
			$("#user-img").attr("src", imagePath + "?timestamp=" + new Date().getTime());
			prvuserimg = imagePath + "?timestamp=" + new Date().getTime();
		} else {
			$("#muserimg").attr("src", "assets/img/user_image.png");
			$("#muserimg_first").attr("src", "assets/img/user_image.png");
			$("#user-img").attr("src", "assets/img/user_image.png");
			prvuserimg = "assets/img/user_image.png";
		}
		if(localStorage._zp == "0"){
            $("#ulusername").addClass("ulusernamemarginleft20");
        } else if(localStorage._zp == "1"){
            $("#ulusername").removeClass("ulusernamemarginleft20");
        }
		$("#ulusername").show();
		$("#divaccountlist").hide();
		$("#divuserprofile").show();

		if(localStorage._zs == "B") {
			$("#musercorp").show();
			$("#musercorp_first").show();
			$("#pcompany").show();
		} else if(localStorage._zs == "I") {
			$("#musercorp").hide();
			$("#musercorp_first").hide();
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
					$("#div_otpcontainer").html('<span style="color: rgb(13, 36, 110); width: 25%; padding-left: 0px; margin-top: 5px;" id="adm_user_security_name">   Mobile Phone : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width:75%;color:black;font-size:13px;">');
				}else if(data.userOTPDto.otpId == 2){
					$("#div_otpcontainer").html('<span style="color: rgb(13, 36, 110); width: 25%; padding-left: 0px; margin-top: 5px;" id="adm_user_security_name">   WhatsApp : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width:75%;color:black;font-size:13px;">');
				}
				admotpId = data.userOTPDto.otpId;
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
				$("#div_otpcontainer").html('<span style="color: rgb(13, 36, 110); width: 25%; padding-left: 0px; margin-top: 6px;" id="adm_user_security_name">   Email : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width:75%;color:black;font-size:13px;margin-left: -48px;">');
				$("#adm_user_security_carrier").val(data.userOTPDto.carrieIdentifier);
				$("#adm_2_fact_enabled").prop("checked", true);
				$("#adm_user_security_name").css("padding-left", "0px");
				$("#adm_user_security_name").css("margin-top", "6px");
				admotpId = 0;
			}else {
				admotpId = 0;
			}
		} else {
			$("#pcompany").hide();
		}

		admListAccountDisplay();
	}
}

function admSaveUserProfileServiceAfter(response){
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
	$("#musername_first").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
	admShowconfirmmsg("Profile saved successfully.", confirm_Success, 5000, "", false, false);
}

function admaddUserPhoneAfter(response){

}

function admUpdateUserPhoneAfter(response){

}

function admAddUserFaxAfter(response){

}

function admUpdateUserFaxAfter(response){

}

function admUpdateUserPictureAfter(response){
	$("#muserimg").attr("src", userimgbase64);
	$("#muserimg_first").attr("src", userimgbase64);
	$("#user-img").attr("src", userimgbase64);
}

function admFetchStorageLeftServiceAfter(response){
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
			$("#mallocatedspacepersonal").html("User Personal Storage  : " + formatBytesDecimal(personal));
			$("#mallocatedspacedataroom").html("User Dataroom Storage : " + formatBytesDecimal(dataroom));
			$("#mallocatedspacepersonal").show();
			$("#mallocatedspacedataroom").show();
			allocatedStorage = parseFloat(attr2.split("#")[0]);
			used = parseFloat(attr2.split("#")[1]);
		} else if(localStorage._zs == "I") {
			allocatedStorage = parseFloat(attr1.split("#")[0]);
			used = parseFloat(attr1.split("#")[1]);
			$("#mallocatedspacepersonal").hide();
			$("#mallocatedspacedataroom").hide();
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
		$(".counter").attr("data-cp-percentage", perntageused);
		progresscircledynamic();

		if(sizeLeft > 0 && extraParam.openfile == true){
			if(isFileUpload){
				admCloseRowDropDown();
				var iframe = document.getElementById("adm_fileuploadId");
				var elmnt = iframe.contentWindow.document.getElementById("btnuploadfolder");
				elmnt.style.display = "none";
				elmnt = iframe.contentWindow.document.getElementById("btnuploadfile");
				elmnt.style.display = "";
				elmnt = iframe.contentWindow.document.getElementById("dargdropcaptiopn");
				elmnt.innerHTML = "Drag and Drop files here";
				showActionPopup("uploadfilemodal", false);
			} else {
				admCloseRowDropDown();
				var iframe = document.getElementById("adm_fileuploadId");
				var elmnt = iframe.contentWindow.document.getElementById("btnuploadfolder");
				elmnt.style.display = "";
				elmnt = iframe.contentWindow.document.getElementById("btnuploadfile");
				elmnt.style.display = "none";
				elmnt = iframe.contentWindow.document.getElementById("dargdropcaptiopn");
				elmnt.innerHTML = "Drag and Drop folder here";
				showActionPopup("uploadfilemodal", false);
			}
		} else {
			sizeLeft = 0;
			if(extraParam.openfile == true) {
				admSpaceAllocatedOverMessage();
			}
		}
	} else {
		if(extraParam.openfile == true) {
			admSpaceAllocatedOverMessage();
		}
	}
}

function admRebuildProjectIndexServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error){
		fetchtreeindex = false;
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		admFolderTreeLoaded = false;
		admTreeFolderSelectedId = 0;
		selectednodeid = -1;
		admcurrentfolderid = 0;
		admSelectedFolderListAllService();
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admSelectedFolderListAllServiceAfter(response){
	if((response.error+"") == "false") {
		if(response.object != null) admcurrenttreeselectedfolderlist = response.object;
		admFolderListAllService(admTreeFolderSelectedId);
	}
}

function admFolderListAllServiceOnlyAfter(response){
	var notfound = 0;
	ajaxindicatorstop();
	if((response.error+"") == "false") {
		if(response.object != null) {
			var extraParam = response.extrajsonparam;
			var fdpath = response.object.folderPath;
			fetchtreeindex = false;
			admcurrentfolderid = extraParam.fdid;
			admcurrentpath = fdpath;
			admsetfolderpathnow = true;
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
			admFolderTreeLoaded = false;
			admTreeFolderSelectedId = 0;
			selectednodeid = -1;
			admcurrentfolderstatus = response.object.status;
			notfound = 1;
		}
	} else if((response.error+"") == "true" && response.messageCode == 430) {
		admShowconfirmmsg(adm_messages.foldernotpresentcorporate, confirm_Error, 5000, "", false, false);
		notfound = 1;
	}

	if(notfound == 0){
		admShowconfirmmsg(adm_messages.foldernotpresentorpermissionnotthere, confirm_Error, 5000, "", false, false);
	}
}

function admFolderListAllServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		admids = 1;
		var foldertype = admcurrentfoldertype;
		var data = response.object;
		if(admcurrenttreeselectedfolderlist != null){
			data = data.concat(admcurrenttreeselectedfolderlist);
			admcurrenttreeselectedfolderlist = null;
		}
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
				admfolderstatus[data[i].folderId] = data[i].status;

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
						if(amdrenamefolderindex != -1){
							admPersoanlFoldersList_local.splice(amdrenamefolderindex, 0, fpath+"#"+fdid);
							admPersoanlFoldersFileCount_local.splice(amdrenamefolderindex, 0, tempJSON);
						} else {
							admPersoanlFoldersList_local.push(fpath+"#"+fdid);
							admPersoanlFoldersFileCount_local.push(tempJSON);
						}
					} else if(foldertype == admsharedtype) {
						if(amdrenamefolderindex != -1){
							admSharedFoldersList_local.splice(amdrenamefolderindex, 0, fpath+"#"+fdid);
							admSharedFoldersFileCount_local.splice(amdrenamefolderindex, 0, tempJSON);
						} else {
							admSharedFoldersList_local.push(fpath+"#"+fdid);
							admSharedFoldersFileCount_local.push(tempJSON);
						}
					}

					amdrenamefolderindex = -1;
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
	//$("#"+admcurrentliid).click();
	//var classp = document.getElementById(admcurrentliid).getAttribute("path");
	//$("#adm_foldertreeli").click();
	//$(".classp").click();
	var treeid = "default-tree-"+admcurrentfoldertype;
	$('#'+treeid).treeview('collapseAll', {silent: true});

	var selectNodeR = -1;

	if(admrebuildvar.length > 0){
		admTreeFolderSelectedId = admrebuildvar[0];
		selectednodeid = admrebuildvar[1];
		admcurrentfolderid = admrebuildvar[2];
		admSetSelectedNodeFromMain = true;
		admrebuildvar = [];
	}

	if(selectednodeid > -1){
		// expands a given node
		selectNodeR = selectednodeid;
	}

	if(admcurrentfolderid > 0 && admSetSelectedNodeFromMain){
		var nodeId = nodesList[admcurrentfolderid];
		selectNodeR = nodeId;
		admSetSelectedNodeFromMain = false;
		admTreeFolderSelectedId=admcurrentfolderid;
	} else if(selectednodeid > -1){
		selectNodeR = selectednodeid;
	}

	if(selectNodeR > -1){
		//$('#'+treeid).treeview('expandNode', [ 0, { levels: 10, silent:true } ]);
		$('#'+treeid).treeview('revealNode', [ selectNodeR, { silent:true } ]);
		$('#'+treeid).treeview('expandNode', [ selectNodeR, { silent:true } ]);
		$('#'+treeid).treeview('selectNode', [ selectNodeR, { silent:true } ]);
	} else {
		$('#'+treeid).treeview('expandNode', [ 0, { silent:true } ]);
		$('#'+treeid).treeview('selectNode', [ 0, { silent:true } ]);
	}
	//if(prvselectednodeid > -1) $('#'+treeid).treeview('collapseNode', [ prvselectednodeid, { silent: true, ignoreChildren: true } ]);
	prvselectednodeid = -1;

	if(admsetfolderpathnow){
		admsetfolderpathnow = false;
		admSetFolderHeaderCaption();
	}
}

function admDeleteDownloadTempFolderServiceAfter(response){
	console.log(JSON.stringify(response));
}

function admFetchFolderSizeServiceAfter(response){
	var extraParam = response.extrajsonparam;
	if(response.nointernetexists == true){
		$("#adm_download_folder_progress_"+response.idm).css("display", "none");
		$("#adm_download_folder_progress_img_"+response.idm).css("display", "none");
		if(extraParam.boolAttribute1) $("#adm_download_org_"+response.idm).css("display", "");
		else $("#adm_download_folder_"+response.idm).css("display", "");
	} else {
		if((response.error+"") == "false" && response.object != null && response.object != 430) {
			if(!switchcalled){
				var size = formatSizeUnits(response.object);
				downloadfolderarr.push(extraParam.folderId+"#"+extraParam.foldername+"#"+extraParam.idm+"#"+extraParam.boolAttribute1);
				admAddFolderDownloadDetails(extraParam.folderId+"#"+extraParam.foldername+"#"+extraParam.idm+"#"+size+"#"+extraParam.boolAttribute1);
				currentdownloadfolders[extraParam.folderId] = extraParam.idm;
				admdownloadFolderQueue();
			}
		} else if(response.object == 430) {
			$("#adm_download_folder_progress_"+extraParam.idm).css("display", "none");
			$("#adm_download_folder_progress_img_"+extraParam.idm).css("display", "none");
			$("#adm_download_org_"+extraParam.idm).css("display", "");
			$("#adm_download_folder_"+extraParam.idm).css("display", "");
			//open common yes no dialog
			nextMethodToBeCalled = "admgenerateDownloadFolderLink";
			nextMethodParams = [];
			nextMethodParams[0]=extraParam.folderId;
			nextMethodParams[1]=extraParam.boolAttribute1;
			$("#modalconfirmmsg").html(response.message);
			$("#btnmodalconfirmdone").html("Yes");
			$("#btnmodalconfirmcancel").html("No");
			$("#confirmheader").html("Download Confirmation");
			showActionPopup("confirmmodal");
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest + " for folder " + extraParam.foldername, confirm_Error, 5000, "", false, false);
		}
	}
}

function admFetchNotifOptionsServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var notifList = response.object;
		$('#select_notif').empty();
		var html = "";
		for(var i=0;i<notifList.length;i++) {
			var checkedDaily = "";
			var EveryCheck2Hours = "";
			var Never = "";

			if(notificationsettingsval == 1){
					Never = "checked";
			}else if(notificationsettingsval == 2){
					EveryCheck2Hours = "checked";
			}else if(notificationsettingsval == 3){
					checkedDaily = "checked";
			}

			if(notifList[i].name == "Never"){
					html += "<label class='radio-inline' style='margin-right:14%;'><input type='radio' name='notifradio' value='"+notifList[i].notificationType+"'"+Never+" checked>&nbsp;&nbsp;"+notifList[i].name+"</label>";
			}else if(notifList[i].name == "Every 2 Hours"){
					html += "<label class='radio-inline' style='margin-right:14%;' title='You will receive notification every even hours, i.e., at 2am, 4am etc if there is any upload activity'><input type='radio' name='notifradio' value='"+notifList[i].notificationType+"'"+EveryCheck2Hours+">&nbsp;&nbsp;"+notifList[i].name+"&nbsp;&nbsp;<i class='fa fa-info-circle' aria-hidden='true'></i></label>";
			}else if(notifList[i].name == "Daily"){
					html += "<label class='radio-inline' style='margin-right:14%;' title='You will receive notification daily at 8 am if there is any upload activity'><input type='radio' name='notifradio' value='"+notifList[i].notificationType+"'"+checkedDaily+">&nbsp;&nbsp;"+notifList[i].name+"&nbsp;&nbsp;<i class='fa fa-info-circle' aria-hidden='true'></i></label>";
			}
		}
		$("#radio_notif").html(html);
		admNotifRadioButtonClickEvent();
		if(localStorage._zs == "B" && localStorage._za != 1) {
			showActionPopup("notifmodal", false);
		}
	}
}

function admFetchNotifSettingsServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		notificationsettingsval = response.object.notificationType;
		notificationsettingspresent = true;
	} else {
		notificationsettingspresent = false;
	}
	admFetchNotifOptionsService();
}

function admInsertNotifSettingsServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		notificationsettingsval = extraParam.notifval;
		notificationsettingspresent = true;
		admShowconfirmmsg(adm_messages.notifsaved, confirm_Success, 5000, "", false, false);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admUpdateNotifSettingsServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		notificationsettingsval = extraParam.notifval;
		notificationsettingspresent = true;
		admShowconfirmmsg(adm_messages.notifsaved, confirm_Success, 5000, "", false, false);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admCheckFolderSecurityServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false") {
		var allowed = false;
		if(response.object == null){
			allowed = true;
		} else {
			var data = response.object;
			if(data[0].inboundShare == "Y"){
				allowed = true;
			}
		}
		if(allowed){
			if(permcheckactionafter == "rename"){
				var id = permcheckactionafterparams;
				permcheckactionafter = "";
				permcheckactionafterparams = "";

				addRenameFolderSetup();
				var idm = id.substring(id.lastIndexOf("_")+1);
				var currentpath = document.getElementById(id).getAttribute("path");
				var folderType = document.getElementById(id).getAttribute("data-type");
				var folderId = document.getElementById(id).getAttribute("data-id");
				var folderName = $("#admfoldershortname_"+idm).html();
				folderName = document.getElementById(id).getAttribute("data-foldername");

				$("#rename_admfoldername").attr("isfolder", true);
				$("#rename_admfoldername").attr("editid", folderId);
				$("#rename_admfoldername").attr("folderType", folderType);
				$("#rename_admfoldername").attr("currentpath", currentpath);
				$("#rename_admfoldername").attr("placeholder", "Folder Name");
				$("#rename_admfoldername").val(folderName);

				showActionPopup("rename_foldermodal");
			} else if(permcheckactionafter == "renamefile"){
				var locked = document.getElementById(permcheckactionafterparams).getAttribute("data-locked");
				if(locked == 0){
					addRenameFileSetup();
					var status = document.getElementById(permcheckactionafterparams).getAttribute("data-status");
					if(status != "D"){
						var index = (permcheckactionafterparams).replace("admdocrowiconsedit_", "");
						admUnSelectAllCheckBox();
						var fileid = document.getElementById(permcheckactionafterparams).getAttribute("data-id");
						var filename = document.getElementById(permcheckactionafterparams).getAttribute("data-filename");
						var filenamewithoutextension = filename.replace(/\.[^/.]+$/, "");
						var folderid = document.getElementById(permcheckactionafterparams).getAttribute("data-folderid");
						var filetype = document.getElementById(permcheckactionafterparams).getAttribute("data-filetype");
						$("#rename_admfilename").attr("folderid", folderid);
						$("#rename_admfilename").attr("fileid", fileid);
						$("#rename_admfilename").attr("filetype", filetype);
						$("#rename_admfilename").attr("index", index);
						$("#rename_admfilename").val(filenamewithoutextension);
						$("#rename_admfiletype").attr("title", filetype);
						if(filetype.length > 6) {
							filetype = filetype.substring(0, 3) + "...";
						}
						$("#rename_admfiletype").html("."+filetype);
						showActionPopup("rename_filemodal");
					} else {
						admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
					}
				} else {
					admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
				}
			} else {
				$("#btnuploadfile").show();
				$("#btnuploadfolder").show();
				$("#searchpopup").slideUp();
			}
		} else {
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		}
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admOTPSettingsServiceAfter(response){
	if(response.error == false){
		otpsettiongs = response.object;
	}
}

function admSaveOTPRecordServiceAfter(response){
	if(response.error == false){
		if($("#mmobilenumber").val().trim().length > 0){
			$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
			setTimeout(function(){
				$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
			},10);
		}
	}
}

function admSaveFolderSizeServiceAfter(response){
	adm_Folder_Size_JSON = {"listAttribute1":[]};
	adm_Folder_Size_Array = [];
	root_access_folder_notexists = "";
	admSaveFolderNoofFileService();
}

function admSaveFolderNoofFileServiceAfter(response){
	if(response.error == false){
	}
}

function admSaveStorageProviderServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false){
		admShowconfirmmsg(adm_messages.storageproviderdone, confirm_Success, 5000, "", false, false);
		setTimeout(function(){
			window.location.href = "drive.html";
		}, 2000);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admSaveFolderSizeSingleFolderIdServiceAfter(response){
	if(response.error == false){
		admSaveFolderNoofFileService();
	}
}

function admgenerateDownloadFolderLinkAfter(response){
	if(response.error == false){
	}
}

function admFetchForumNotifServiceAfter(response){
	localStorage._ns = "";
	$("#icon_dot_forum_notif").html("");
	$("#icon_dot_forum_notif").hide();
	$("#divforumnotiflist").html("");
	if(response.error == false){
		if(response.object != null){
			admFormNotifList = response.object;
			if(!$("#divforumnotiflist").is(":visible")) $("#icon_dot_forum_notif").show();
			var notarr = [];
			var minus = 0;
			for(var i=0;i<admFormNotifList.length;i++){
				var date = getlocaltimestampfromutcdata(handleNullValue(admFormNotifList[i].date));
				date = getdatefromtimestamp(date, false, "EN-US");
				try{
					admForumNotifListPrep(admFormNotifList[i].threadId, admFormNotifList[i].parentThreadId, admFormNotifList[i].subject, admFormNotifList[i].post, date, admFormNotifList[i].action);
					var sm = {"name":(admFormNotifList[i].threadId+"#"+admFormNotifList[i].parentThreadId),"title":admFormNotifList[i].subject,
						"body":admFormNotifList[i].post, "action":admFormNotifList[i].action};
					notarr.push(sm);
				}catch(error){
					minus++;
				}
			}
			localStorage.setItem("_ns", valenc(JSON.stringify(notarr)));
			$("#icon_dot_forum_notif").html(admFormNotifList.length-minus);
			admFormNotifList = localStorage._ns;
			admFormNotifListCount = admFormNotifList.length-minus;
		}

		if(admFormNotifList != null && admFormNotifList.length == 0){
			hideActionPopup("divforumnotiflistmodal");
		}
	} else {
		hideActionPopup("divforumnotiflistmodal");
	}

	admForumDBFetchDone = true;
	admFormBusy = false;
	admForumCheckNotif();
}

function admDeleteForumNotifServiceAfter(response){

}

function admOpenFilePermissionServiceAfter(response){
	$(".adm_file_perm_checkbox_mark_cls").prop("checked", false);
	$(".adm_file_perm_checkbox_mark_cls").addClass("adm_file_perm_checkbox_cls");
	$(".adm_file_perm_checkbox_mark_cls").removeAttr("disabled");
	$(".tsclspermnouser").hide();
	$("#btn_save_file_perm_close").show();
	$("#btn_save_file_perm").show();
	$("#tbl_permission_header").show();
	if(response.error == false && response.object != null){
		var data = response.object;
		var count = 0;
		for(var i=0;i<data.length;i++){
			if(data[i].loginId != localStorage._zy && data[i].loginId != ""){
				var loginid = (data[i].loginId).toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				$("#div_adm_file_perm_popup_"+loginid).hide();
				$("#adm_file_perm_popup_"+loginid).show();
				$("#adm_file_perm_popup_"+loginid).attr("data-indeterminate-click", "-1");

				if(data[i].status == 1){
					$("#adm_file_perm_popup_"+loginid).prop("checked", true);
				} else {
					$("#adm_file_perm_popup_"+loginid).prop("checked", false);
				}

				if(data[i].folderPerm == 2){
					$("#tr_file_perm_"+loginid).hide();
				} else {
					$("#tr_file_perm_"+loginid).show();
					count++;
				}

				if(data[i].status == 3){
					$("#div_adm_file_perm_popup_"+loginid).show();
					$("#adm_file_perm_popup_"+loginid).hide();
					$("#adm_file_perm_popup_"+loginid).attr("data-indeterminate-click", "0");
				}

				if(data[i].folderPerm == 2){
					$("#adm_file_perm_popup_"+loginid).attr("disabled", true);
					$("#adm_file_perm_popup_"+loginid).removeClass("adm_file_perm_checkbox_cls");
				}

				admFilePermissionCheckBoxEvent("adm_file_perm_popup_"+loginid);
				admFilePermissionDivCheckBoxEvent("div_adm_file_perm_popup_"+loginid);
				admSaveInitialFilePermissionStatus(loginid, data[i].status);
			}
		}
	}

	if(count == 0){
		$(".tsclspermnouser").show();
		$("#btn_save_file_perm_close").hide();
		$("#btn_save_file_perm").hide();
		$("#tbl_permission_header").hide();
	}
	if($("#divmodaldocperm").css('display') == 'none') {
		showActionPopup("divmodaldocperm", false);
	}
	ajaxindicatorstop();
}

function admfetchActiveLoginIdsServiceAfter(response){
	$("#tbldocpermroes").html("");
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		var str = "";
		str += "<table class='table table-sm table-hover' id='tbl_permission'>";
		str += "<thead id='tbl_permission_header'>";
		str += "<tr>";
		str += "<th scope='col'>Login Id</th>";
		str += "<th scope='col'>View<input type='checkbox' class='form-check-input' id='chk_selectall_view' style='margin-left:20px;position:initial'></th>";
		str += "</tr>";
		str += "</thead>";
		str += "<tbody>";
		str += "<tr class='tsclspermnouser' style='display:none;'>";
		str += "<td scope='row' style='word-break: break-word;font-weight:bold;font-size:18px;'>None of the users have permission on the folder</td>";
		str += "<td width='20%' style='text-align:center;'>&nbsp;</td>";
		str += "</tr>";
		for(var i=0;i<data.length;i++){
			if(data[i].loginId != localStorage._zy){
				var id = (data[i].loginId).toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				str += "<tr class='tsclsperm' id='tr_file_perm_"+id+"'>";
				str += "<td scope='row' style='word-break: break-word;'>"+data[i].loginId+"</td>";
				str += "<td width='20%' style='text-align:center;'>";
				str += "<input type='checkbox' class='form-check-input adm_file_perm_checkbox_cls adm_file_perm_checkbox_mark_cls permcls' style='position:initial' id='adm_file_perm_popup_"+id+"' data-id='"+data[i].loginId+"'>";
				str += "<div class='divpermcls' style='width:12px;height:12px;background:#007bff;margin-left:38%;margin-top:2%;display:none;cursor:pointer;border-radius:3px;' id='div_adm_file_perm_popup_"+id+"'></div>";
				str += "</td>";
				str += "</tr>";
			}
		}
		str += "</tbody>";
		str += "</table>";
		$("#tbldocpermroes").html(str);
		admFilePermViewAllEvent();
	}
}

function admSaveFilePermissionServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false){
		admOpenFilePermissionService(admcurrentfolderid);
		admShowconfirmmsg(adm_messages.filepermissionsaved, confirm_Success, 5000, "", false, false);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admDisplayCompanyName(){
	$("#companynameprojectname").html(replacenullval(trimOverFlowCharacters(localStorage._zo)));
	$("#companynameprojectname").attr("title", checkscreenwidthdesc(localStorage._zo));
	$("#companynameprojectname").css({"color":"#009ce7",  "text-align": "justify", "margin-top":"4%"});
}

function admChangeStorageClassServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false){
		if(response.extrajsonparam.storageclass == 1){
			admShowconfirmmsg(adm_messages.admstorageclasschange.replace("<ACTION>", " to send to archive"), confirm_Success, 5000, "", false, false);
		} else if(response.extrajsonparam.storageclass == 2){
			admShowconfirmmsg(adm_messages.admstorageclasschange.replace("<ACTION>", ".It will take 3-5 hours to retrive your data"), confirm_Success, 5000, "", false, false);
		}
		ajaxindicatorstart('loading data.. please wait..');
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admChangeNotifStatusServiceAfter(response){
}

