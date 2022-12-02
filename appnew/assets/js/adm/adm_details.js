function fetchAllAdmFolderListResponse(response) {
	admClearFolderFileCache();
	try {
		var urli = window.location.href;
		var urlk = urli.split("?");
		if (urlk.length > 1 && urlk[1].indexOf("a=view") == 0 && urlk[1].indexOf("&b=file") > 0) {
			admcheckiffromurl();
		} else {


			previousidm = "";
			var extraParam = response.extrajsonparam;
			var foldertype = extraParam.foldertype;
			var copy = extraParam.copy;
			localStorage.setItem("_zshort", response.tempObject2);

			abortingajax = true;

			admDefaultSortCheck();
			if (pagecount > 1) {
				$("#tableHeadPages_drive").show();
			} else {
				$("#tableHeadPages_drive").hide();
			}
			if (foldertype == admpersonaltype) admpersonaltyperetrieved = true;
			else if (foldertype == admsharedtype) admsharedtyperetrieved = true;

			if (!copy) {
				admcurrentpath = "";
				admcurrentfoldertype = foldertype;
				admcurrentfolderid = 0;
			}

			if ((response.error + "") == "false" && response.object != null) {
				var folderparnetid = 0;
				var data = response.object;
				if (data != null && data.length > 0 && data != "null") {
					var tempJSON = {};
					var tempJSONPermission = {};

					admLoopFoldeListZeroLevel(data, copy);
				} else {
					admShowNoDataFoundTable();
				}

				loadTreeResponseOnPageChange(response);
			}

			if (localStorage._zp == "1") {
				admfetchActiveLoginIdsService();
			}
			admSingleUserProfileService();
			try {
				initializeFirebaseMessaging();
			} catch (error) {
				console.log(error);
			}

			if (!globalvariable.admForumDBFetchDone) {
				admFetchForumNotifService();
			}

			globalvariable.screenloadednew = true;

			$("#default-tree-S").hide();
			$("#default-tree-P").hide();
			$("#default-tree-" + admcurrentfoldertype).show();

			$("#ul_more").hide();
			admFetchStorageLeftService(false);
			loggedin = true;

			$("#btn_content_sync_now").hide();
			if (foldertype == "P") {
				$("#adm_rebuildindex").show();
				$("#div_perm").attr("title", "Data Room Access Controls");
				$("#btn_content_sync_now").show();
			}

			$("#div_evoting").hide();
			// hide rebuild index icon for individual user and show admin icon for individual user;
			if (localStorage._zs == "B") { // B stand for Business User
				$("#dropdownMenuLink").show();
				$("#admin_module_individual").hide();
				$("#adm_rootprjindex").show();
				$("#metadataValueSearch").show();
				$("#metadataDateSearch").show();

				$("#btn_forum").hide();
				$("#btn_forum_notif").hide();
				if (localStorage._zmd != null && localStorage._zmd != undefined) {
					if ((localStorage._zmd).split(",").includes("1")) {
						$("#btn_forum").show();
						$("#btn_forum_notif").show();
					}

					$("#adm_drm_setting").hide();
					$("#imgrmexe").hide();
					if ((localStorage._zmd).split(",").includes("6") && localStorage._zp == "1" && admcurrentfoldertype == admsharedtypeDB) {
						$("#adm_drm_setting").show();
						$("#imgrmexe").show();
					}

					if ((localStorage._zmd).split(",").includes("9") && localStorage._zp == "1" && admcurrentfoldertype == admsharedtypeDB) {
						$("#div_evoting").show();
						$("#adminCtrlsupportedcontent").css({'min-width': '267px', 'padding-left': '5px'})
					}else if($("#div_evoting").hide()){
						$("#adminCtrlsupportedcontent").css({'min-width': '218px', 'padding-left': '0px !important', 'padding-right': '5px'})
					}
				}

				$("#btn_todolist").hide();
				if (localStorage._zmd != null && localStorage._zmd != undefined && (localStorage._zmd).split(",").includes("5")) {
					$("#btn_todolist").show();
				}

				$("#adm_file_permission").show();
				$("#adm_notifications").show();
			} else {
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

			if (localStorage._zp == "1" && window.location.href.indexOf("drive.html") > 0) {
				$("#admin_module").show();
				if (localStorage._zs == "B") {
					$("#adm_rebuildindex").show();
					if (foldertype == "P") {
						$("#adm_file_permission").hide();
					} else {
						$("#adm_file_permission").show();
					}
				} else {
					$("#adm_file_permission").hide();
				}
				$("#div_perm").attr("title", "Folder Access Controls");
				$("#div_admin_controls").show();
				$("#btn_content_sync_now").show();
			} else {
				$("#admin_module").hide();
				$("#adm_rebuildindex").hide();
				$("#div_admin_controls").hide();
				$("#dropdownMenuLink").hide();
				$("#adm_file_permission").hide();
			}

			ajaxindicatorstop();

			try {
				var urlk = window.location.href.split("?");
				if (urlk.length > 1 && urlk[1].indexOf("a=view") == 0) {
					var arr = urlk[1].split("&");
					if (arr.length == 5 || arr.length == 6) {
						if (arr[1].replace("b=", "") == "folder") {
							admcurrentfoldertype = arr[2].replace("c=", "");
							var fdId = arr[3].replace("d=", "");
							var corpid = arr[4].replace("e=", "");
							if (corpid == localStorage._zw) {
								admFolderListAllServiceOnly(fdId, corpid);
							} else {
								admShowconfirmmsg(adm_messages.foldernotpresentcorporate, confirm_Error, 5000, "", false, false);
							}
						} else if (arr[1].replace("b=", "") == "file") {
							var docid = arr[3].replace("d=", "");
							var corpid = arr[4].replace("e=", "");
							if (corpid == localStorage._zw) {
								admSingleDocumentFetchOnly(docid, corpid);
							} else {
								admShowconfirmmsg(adm_messages.filenotpresentcorporate, confirm_Error, 5000, "", false, false);
							}

						}
					}
				}
			} catch (error) {
			}

			//execute when download all file with an interval with downloaduploaded.html
			//create the link and and open with a new window
			try {
				var urlk = window.location.href.split("?");
				if (urlk.length > 1 && urlk[1].indexOf("ty=du") == 0) {
					var arr = urlk[1].split("&");
					var arr2 = urlk[0].split("/");
					arr2[arr2.length - 1] = "downloaduploaded.html";
					var link = arr2[0];
					for (var i = 1; i < arr2.length; i++) { link = link + "/" + arr2[i] }
					link = link + "?" + urlk[1];
					window.open(link);
				}
			} catch (error) {
			}

			//execute when download poll export file with an interval with downloaduploaded.html
			//create the link and and open with a new window
			try {
				var urlk = window.location.href.split("?");
				if (urlk.length > 1 && (urlk[1].indexOf("pollex=") == 0 || urlk[1].indexOf("voterex=") == 0)) {
					var arr = urlk[1].split("&");
					var arr2 = urlk[0].split("/");
					arr2[arr2.length - 1] = "downloadpolldetails.html";
					var link = arr2[0];
					for (var i = 1; i < arr2.length; i++) { link = link + "/" + arr2[i] }
					link = link + "?" + urlk[1];
					window.open(link);
				}
			} catch (error) {
			}

			admDownloadFolderQueryParam();
			cleanURLAtTop();
			admOTPSettingsService();
			admShowHideMoreMenu();

			var pHeight = $(window).height();
			var heightdeduct = 160;
			if ($("#tableHeadPages_drive").is(":visible")) {
				heightdeduct = 200;
			}
			$('.page-wrapper').css('height', (pHeight - heightdeduct));
			$('.content-page').css('height', (pHeight - heightdeduct));
			// In Individual User Header Change
			if (localStorage._zs == "I") {
				$("#individualId").html("Download");
				$("#adm_download_file").html("Download");
			}

			if (admcurrentfoldertype == admpersonaltype) {
				admHighlightPersonalFolder();
			} else {
				admHighlightDataroom();
			}

			$("#btncreatefolderpopup").show();
			$("#ulbtncreatefolderpopup").show();

			if (localStorage._zh != 1) {
				showActionPopup("changepassconfirmmodal", false);
			} else if (localStorage._zs == "B" && localStorage._za != 1) {
				admFetchNotifSettingsService();
			}

			var obj = document.getElementById("adm_fileuploadId");
			obj.contentWindow.setFileUploadURL("http://58.168.69.186");

			switchcalled = false;
			abortingajax = false;
			fetchLogo();

			if (localStorage._zmd.split(",").includes("8") || localStorage._zs == "I") {
				$(".adm_personal_foldr").css("display", "block");
				$(".copy_move_list").css("display", "block");
				$("#mallocatedspacepersonal").show();
			} else {
				$(".adm_personal_foldr").css("display", "none");
				$(".copy_move_list").css("display", "none");
				$("#mallocatedspacepersonal").hide();
				$("#acopydataroom").removeClass("ultabrightmost");
				$("#acopydataroom").css("padding-left", "35px");
			}
			duePaymentService();
			admCheckSearchIndexService();
			admFetchdataSourceService();
			if(!logoServiceInvoked){
				checkPageCorpLogoChange();
				logoServiceInvoked = true;
			}
			
		}
	} catch (error) { }
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
			var folderHasDRM = admFolderDRM[folderpath];
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
		 	if (status == "E" || status == "H" || status == "Q") {
				datahtml += "<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 up' style='cursor:pointer;' id='adm_foldername_" + i + "' " + datavar + ">";
				datahtml += "<img id='imgclassid_"+i+"' class='respons' src='assets/img/folder.png' alt='' >";
				datahtml += "<span style='margin-left: -31px;margin-top: 28px;position:absolute;font-size:10px;color:white;letter-spacing:1px;display:" + (folderHasDRM == "1" ? "" : "none") + "'' id='drm_folder_info_" + folderid + "' title='Some folders/files have DRM applied'>DRM</span>";
			} else {
				datahtml += "<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 up' style='cursor:pointer; margin-top:14px;' id='adm_foldername_"+i+"' "+datavar+">";
				datahtml += "	<img id='imgclassid_"+i+"' class='respons1' src='assets/img/folder.png' alt='' >";
				datahtml += "	<span style='margin-left: -34px;margin-top: 11px;position:absolute;font-size:10px;color:white;letter-spacing:1px;display:"+(folderHasDRM=="1"?"":"none")+"'' id='drm_folder_info_"+folderid+"' title='Some folders/files have DRM applied'>DRM</span>";
			}

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

			if(status == "E"){
				datahtml += "<span class='flagcommon'>Archival in progress</span>";
			}else if(status == "H"){
				datahtml += "<span class='flagcommon'>Archived</span>";
			}else if(status == "Q"){
				datahtml += "<span class='flagcommon'>Retrieval in progress</span>";
			}

			datahtml += "			</span>";
			datahtml += "		</a>";
			//datahtml += "		<i class='fa fa-info-circle' id='drm_folder_info_"+folderid+"' aria-hidden='true' title='Some folders/files have DRM applied' style='color:#4ab6ff;font-size:14px;margin-top:4px;margin-left:4px;display:"+(folderHasDRM=="1"?"":"none")+"'></i>";
			datahtml += "	</h2>";
			datahtml += "</div>";
			datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up table-content-text-align'   "+datavar+" >";
			datahtml += "<p class='sneha'>&nbsp;</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-xl-2 col-lg-2 col-md-2 col-sm-2 up table-content-text-align'  "+datavar+" >";
			datahtml += "<p class='sneha'>"+folderDate+"</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up table-content-text-align'  "+datavar+">";
			datahtml += "<p class='sneha'>"+folderSize+"</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-xl-2 col-lg-2 col-md-2 col-sm-2 up table-content-text-align'  "+datavar+" >";
			datahtml += "<p class='sneha'>&nbsp;</p>";
			datahtml += "</div>";
			datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up table-content-text-align'  "+datavar+" >";
			if(allowdn && status != "D" && !topd && !topm && localStorage._zs != "I" && !admFolderArchived(status) && !admFolderRestoreInit(status)) {
				if(currentdownloadfolders[folderid] != null && currentdownloadfolders[folderid] != undefined) {
					datahtml += "<img class='down' style='cursor:pointer;display:none;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
					datahtml += "<img src='assets/img/dcirrus_spins.gif?v=4' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:;margin-top:10px;' class='fileviewprogressbar'/>";
				} else {
					datahtml += "<img class='down text-center' style='cursor:pointer;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
					datahtml += "<img src='assets/img/dcirrus_spins.gif?v=4' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:none;margin-top:10px;' class='fileviewprogressbar'/>";
				}
			} else {
				datahtml += "<p class='sneha'>&nbsp;</p>";
			}
			datahtml += "</div>";
			datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up text-center'>";
			datahtml += "<ul class='nav  float-right'>";
			datahtml += "<li class='new-li' data-toggle='dropdown'>";
			if(admSharedFoldersPermission[folderid] != "N#N#N#N#N#N#N" && !admFolderRestoreInit(status) && status != "E"){
				if(admFolderArchived(status)){
					if( localStorage._zp == "1"){
						datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
						datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
						datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='padding:15px;'><i class='fas fa-redo rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
						datahtml += "</div>";
					}
				} else if(status == "D"){
					datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
					datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_restore_folder_"+i+"' "+datavar+" style='padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-undo rowdropdownitem' aria-hidden='true'></i>Restore</a>";
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='padding:15px;'><i class='fas fa-trash-alt rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
					datahtml += "</div>";
				} else {
					datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
					datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu moreall_menu'>";
					var subdatahtmlshare ="";
					var subdatahtmlrqfiledeposite ="";
					if(localStorage._zs == "I" || (localStorage._zmd).split(",").includes("2")){
						subdatahtmlshare += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_share_folder_"+i+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-share-alt rowdropdownitem' aria-hidden='true'></i>Share</a>";
					}
					subdatahtmlrqfiledeposite += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_inbound_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc; padding:15px;'><i class='fa fa-file rowdropdownitem' aria-hidden='true'></i>Request File Deposit</a>";
					if(!topd && !topm){
						if(allowupload){
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_edit_folder_"+i+"' "+datavar+" style='padding:15px;border-bottom:1px solid #ccc;'><i class='fas fa-pencil-alt rowdropdownitem' aria-hidden='true'></i>Rename</a>";
						}
						if(allowshare){
							datahtml += subdatahtmlshare;
						}
						if(allowdnorg){
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_download_org_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-download rowdropdownitem' aria-hidden='true'></i>Download Original</a>";
						}
						if(allowdelete){
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_delete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-trash rowdropdownitem' aria-hidden='true'></i>Delete</a>";
							if(localStorage._zp == "1") datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='padding:15px; border-bottom:1px solid #ccc;'><i class='fas fa-trash-alt rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
							else datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;border-bottom-left-radius:18px; border-bottom-right-radius:18px;padding:15px;'><i class='fas fa-trash-alt rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
						}
						if(allowupload){
							datahtml += subdatahtmlrqfiledeposite;
						}
						if(localStorage._zp == "1"  && localStorage._zs == "B" && (localStorage._zmd).split(",").includes("6") && admcurrentfoldertype == admsharedtypeDB) {
							datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_drm_settings_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-lock rowdropdownitem' aria-hidden='true'></i>DRM Settings</a>";
						}
						if(localStorage._zp == "1" && localStorage._zs == "B" && localStorage._zzs != "FILE") datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='padding:15px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
					}else{
						datahtml += subdatahtmlshare;
						datahtml += subdatahtmlrqfiledeposite;
					}
					datahtml += "</div>";
				}
			} else if(!admFolderRestoreInit(status) && localStorage._zp == "1" && status != "E") {
				datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
				datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
				if(!admFolderArchived(status) && !admFolderRestoreInit(status) && localStorage._zzs != "FILE"){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='padding:15px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
				} else if(admFolderArchived(status)){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='padding:15px;'><i class='fas fa-redo rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
				}
				datahtml += "</div>";
			}
			datahtml += "</li>";
			datahtml += "</ul>";
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
				admDRMFolderSetting(i);
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
	var folderHasDRM = admFolderDRM[folderpath];
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
	if (status == "E" || status == "H" || status == "Q") {
		datahtml += "<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 up' style='cursor:pointer;' id='adm_foldername_" + i + "' " + datavar + ">";
		datahtml += "<img id='imgclassid_"+i+"' class='respons' src='assets/img/folder.png' alt='' >";
		datahtml += "<span style='margin-left: -31px;margin-top: 28px;position:absolute;font-size:10px;color:white;letter-spacing:1px;display:" + (folderHasDRM == "1" ? "" : "none") + "'' id='drm_folder_info_" + folderid + "' title='Some folders/files have DRM applied'>DRM</span>";
	} else {
		datahtml += "<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 up' style='cursor:pointer; margin-top:14px;' id='adm_foldername_"+i+"' "+datavar+">";
		datahtml += "	<img id='imgclassid_"+i+"' class='respons1' src='assets/img/folder.png' alt='' >";
		datahtml += "	<span style='margin-left: -34px;margin-top: 11px;position:absolute;font-size:10px;color:white;letter-spacing:1px;display:"+(folderHasDRM=="1"?"":"none")+"'' id='drm_folder_info_"+folderid+"' title='Some folders/files have DRM applied'>DRM</span>";
	}
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
	if(adm_search_progress && searchName.trim().length > 0){
		var search = searchName.split(",");
		search.forEach(function(item) {
			if(item.trim().length > 0) foldername = hiliter(item, foldername)
		});
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

	if(status == "E"){
		datahtml += "<span class='flagcommon'>Archival in progress</span>";
	}else if(status == "H"){
		datahtml += "<span class='flagcommon'>Archived</span>";
	}else if(status == "Q"){
		datahtml += "<span class='flagcommon'>Retrieval in progress</span>";
	}

	datahtml += "			</span>";
	datahtml += "		</a>";
	//datahtml += "		<i class='fa fa-info-circle' id='drm_folder_info_"+folderid+"' aria-hidden='true' title='Some folders/files have DRM applied' style='color:#4ab6ff;font-size:14px;margin-top:4px;margin-left:4px;display:"+(folderHasDRM=="1"?"":"none")+"'></i>";
	datahtml += "	</h2>";
	datahtml += "</div>";
	datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up table-content-text-align' "+datavar+" >";
	datahtml += "<p class='sneha'>&nbsp;</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-xl-2 col-lg-2 col-md-2 col-sm-2 up table-content-text-align' "+datavar+">";
	datahtml += "<p class='sneha'>"+folderDate+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up table-content-text-align' "+datavar+">";
	datahtml += "<p class='sneha'>"+folderSize+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-xl-2 col-lg-2 col-md-2 col-sm-2 up table-content-text-align' "+datavar+" >";
	datahtml += "<p class='sneha'>&nbsp;</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up table-content-text-align "+datavar+" >";
	if(allowdn && status != "D" && !issyncfolder && localStorage._zs != "I" && !admFolderArchived(status) && !admFolderRestoreInit(status)) {
		if(currentdownloadfolders[folderid] != null && currentdownloadfolders[folderid] != undefined) {
			datahtml += "<img class='down' style='cursor:pointer;display:none;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
			datahtml += "<img src='assets/img/dcirrus_spins.gif?v=4' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:;margin-top:10px;' class='fileviewprogressbar'/>";
		} else {
			datahtml += "<img class='down text-center' style='cursor:pointer;' src='assets/img/lay.png' alt='' "+datavar+" id='adm_download_folder_"+i+"' class='filedownloadclass'>";
			datahtml += "<img src='assets/img/dcirrus_spins.gif?v=4' width='30px' height='30px' id='adm_download_folder_progress_img_"+i+"' style='display:none;margin-top:10px;' class='fileviewprogressbar'/>";
		}
	} else {
		datahtml += "<p class='sneha'>&nbsp;</p>";
	}
	datahtml += "</div>";
	datahtml += "<div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 up text-center'>";
	datahtml += "<ul class='nav  float-right'>";
	datahtml += "<li class='new-li' data-toggle='dropdown'>";
	if(admSharedFoldersPermission[folderid] != "N#N#N#N#N#N#N" && !admFolderRestoreInit(status) && status != "E"){
		if(admFolderArchived(status)){
			if(!admFolderArchived(admcurrentfolderstatus) && localStorage._zp == "1"){
				datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
				datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
				datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='padding:15px;'><i class='fas fa-redo rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
				datahtml += "</div>";
			}
		} else if(status == "D"){
			datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer; '>";
			datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_restore_folder_"+i+"' "+datavar+" style='padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-undo rowdropdownitem' aria-hidden='true'></i>Restore</a>";
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='padding:15px;'><i class='fas fa-trash-alt rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
			datahtml += "</div>";
		} else {
			datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
			datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu moreall_menu'>";
			var insidesubdatahtmlshare = "";
			var insidesubdatahtmlrqfiledeposit = "";
			if(localStorage._zs == "I" || (localStorage._zmd).split(",").includes("2")){
				insidesubdatahtmlshare += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_share_folder_"+i+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-share-alt rowdropdownitem' aria-hidden='true'></i>Share</a>";
			}
			insidesubdatahtmlrqfiledeposit += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_inbound_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-file rowdropdownitem' aria-hidden='true'></i>Request File Deposit</a>";

			if(!issyncfolder){
				if(allowupload){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_edit_folder_"+i+"' "+datavar+" style='padding:15px;border-bottom:1px solid #ccc;'><i class='fas fa-pencil-alt rowdropdownitem' aria-hidden='true'></i>Rename</a>";
				}
				if(allowshare){
					datahtml += insidesubdatahtmlshare;
				}
				if(allowdnorg){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_download_org_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-download rowdropdownitem' aria-hidden='true'></i>Download Original</a>";
				}
				if(allowdelete){
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_delete_folder_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-trash rowdropdownitem' aria-hidden='true'></i>Delete</a>";
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_permdelete_folder_"+i+"' "+datavar+" style='padding:15px;border-bottom:1px solid #ccc;'><i class='fas fa-trash-alt rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
				}
				if(allowupload){
					datahtml += insidesubdatahtmlrqfiledeposit;
				}
				if(localStorage._zp == "1"  && localStorage._zs == "B" && (localStorage._zmd).split(",").includes("6") && admcurrentfoldertype == admsharedtypeDB) {
					datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_drm_settings_"+i+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-lock rowdropdownitem' aria-hidden='true'></i>DRM Settings</a>";
				}
				if(localStorage._zp == "1"&& localStorage._zs == "B" && localStorage._zzs != "FILE") datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='padding:15px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
			}else{
				datahtml += insidesubdatahtmlshare;
				datahtml += insidesubdatahtmlrqfiledeposit;
			}
			datahtml += "</div>";
		}
	} else if(!admFolderRestoreInit(status) && localStorage._zp == "1" && !admFolderArchived(admcurrentfolderstatus) && status != "E") {
		datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
		datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu';>";
		if(!admFolderArchived(status) && !admFolderRestoreInit(status) && localStorage._zzs != "FILE"){
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_acrhive_"+i+"' "+datavar+" style='padding:15px;'><i class='fa fa-archive rowdropdownitem' aria-hidden='true'></i>Archive</a>";
		} else if(admFolderArchived(status)){
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='adm_send_to_infrequent_"+i+"' "+datavar+" style='padding:15px;'><i class='fas fa-redo rowdropdownitem' aria-hidden='true'></i>Retrieve</a>";
		}
		datahtml += "</div>";
	}
	datahtml += "</li>";
	datahtml += "</ul>";
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
		admDRMFolderSetting(i);
	}

	if(admFolderArchived(admcurrentfolderstatus) || admcurrentfolderstatus == "E"){
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
		if(sortfieldnm != "fileModifiedDate") admsearchpagenumber = admdisplaycounter;
		if(adm_search_progress){
			admDisplaySearchFilesService();
		}else{
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		}
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
		if(sortfieldnm != "fileModifiedDate") admsearchpagenumber = admdisplaycounter;
		if(adm_search_progress){
			admDisplaySearchFilesService();
		}else{
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		}
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
		admsearchpagefolderid = renamefolderid;
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
		admcurrentfolderstatus = data.currentFolderStatus;
		localStorage.setItem("_zshort", response.tempObject2);
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

			var parentidinfo = data.stringListDtoList;
			if(parentidinfo != null && parentidinfo.length > 0){
                parentidinfo.forEach(function(item) {
					adm_parentfolderpath[item.attribute1+"#"+admcurrentfoldertype] = item.attribute4+"#"+item.attribute3+"#"+item.attribute2+"#"+item.attribute1;
				});
			}

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
					admCommonLoopFolderList(folderfetch, data);
				}

				/*if(data.unIndexDocumentsList != null && data.unIndexDocumentsList.length > 0){
					$("#admallcheckboxlabel").show();
					admtotaldocs = data.noOfFiles;
					admLoopFileList(data.unIndexDocumentsList, admcurrentfoldertype);
				}*/
			} else {
				if(data.unIndexDocumentsList != null && data.unIndexDocumentsList.length > 0){
					admtotaldocs = data.totalDocumentCount;
					admLoopFileList(data.unIndexDocumentsList, foldertype);
				}
			}
		}
		admCheckSearchIndexService();
		admFetchdataSourceService();
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
		} else if(data.message == "DRMAPPLIEDERROR"){
			admShowconfirmmsg(adm_messages.drmappliedshareerror, confirm_Error, 5000, "", false, false);
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
	//url for metadata view
	var location = window.location.href;
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
				if(location.indexOf("viewmetadata.html") > 0){
					//callmethod set iframe for metadata
					var $iframe = $("#metadata_viewerboxid");
				 } else {
					var $iframe = $("#adm_viewerboxid");
				 }
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
						if(location.indexOf("viewmetadata.html") > 0){
							//callmethod in metadata_details.js to set iframe src to this url
							viewmetadatadocument(actURL);
			 			} else {
							window.open(actURL, "_blank");
			 			}
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

							if(location.indexOf("viewmetadata.html") > 0){
								//callmethod in metadata_details.js to set iframe src to this url
								viewmetadatadocument(actURL);
							} else {
								var w = window.open(actURL);
							}
							if(idm != "null") w.document.title = document.getElementById("adm_filenm_"+idm).getAttribute("data-filename");
						} else if(actURL.indexOf("adobe/#viewer/") > 0){
							if(location.indexOf("viewmetadata.html") > 0){
								//callmethod in metadata_details.js to set iframe src to this url
								viewmetadatadocument(actURL);
							} else {
								var w = window.open(actURL);
							}
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
							if(location.indexOf("viewmetadata.html") > 0){
								//callmethod in metadata_details.js to set iframe src to this url
								viewmetadatadocument(actURL);
							}else{
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
				}
			}else{
				admShowconfirmmsg(adm_messages.couldnotopenviewer, confirm_Error, 5000, "", false, false);
				hideActionPopup(adm_screenDimmer, "adm_viewer");
			}
		}else{
			if(data.message == "NOPERMISSION"){
				admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
			} else if(data.message == "FILEVIEWAGAIN"){
				admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
			} else if(data.message == "FILEERROR"){
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
		//admSingleDocumentFetch(docid, arr);
		admsearchpagefileid = docid;
		admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
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
					adm_doc_list.map(function (a, index) {
						if (a.id == docList[i].id) {
							a.fileName = docList[i].fileName;
							a.status = docList[i].status;
							a.fileSize = docList[i].fileSize;
							a.fileModifiedLongTime = docList[i].fileModifiedLongTime;
							a.fileLastModified = docList[i].fileLastModified;
							a.fileModifiedDate = docList[i].fileModifiedDate;
						}
    				});
    				var dcList = [];
    				dcList[0] = adm_doc_list[index];
					admLoopFileListCommon(dcList, index, true);
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
				if(i == 0) {
					docIds = keys[i];
					admsearchpagefileid = keys[i];
				} else {
					docIds = docIds + "," + keys[i];
					admsearchpagefileid = -1;
				}
			}
			if(admsearchpagefileid == -1) admsearchpagenumber = admdisplaycounter;
			if(adm_search_progress){
				admDisplaySearchFilesService();
			}else if(adm_ai_search){
				admFetchSearchIndexService();
			}else{
				admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
			} 
		} else if(permdel) {
			hideActionPopup("deleteconfirmmodal");
			admhideshowcreatefolderbuttons(true);
			admClearDeleteConfirmModal();
			admsearchpagenumber = admdisplaycounter;
			if(adm_search_progress){
				admDisplaySearchFilesService();
			}else if(adm_ai_search){
				admFetchSearchIndexService();
			}else{
				admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
			}
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
			if(i == 0) {
				docIds = keys[i];
				admsearchpagefileid = keys[i];
			} else {
				docIds = docIds + "," + keys[i];
				admsearchpagefileid = -1;
			}
		}
		if(admsearchpagefileid == -1) admsearchpagenumber = admdisplaycounter;
		if(adm_search_progress){
			admDisplaySearchFilesService();
		}else{
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		} 
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
		searchName = response.extrajsonparam.searchName;
		$("#ul_more").show();
		$("#admallcheckboxlabel").show();
		$("#tbldatarows").html("");

		var docList = response.object.unIndexDocumentsList;
		var foldrList = response.object.unIndexFoldersList;
		adm_doc_list = docList;
		adm_folder_list = foldrList;
		adm_doc_list = admListSortSort(adm_doc_list, "file");
		searchdocCount = 0;
		searchfolderCount = 0;
		if((adm_doc_list != null && adm_doc_list.length > 0) || (adm_folder_list != null && adm_folder_list.length > 0)){
			var data = {};
			var fetchFolder = false;
			if(adm_doc_list != null && adm_doc_list.length > 0){
				data.unIndexDocumentsList = adm_doc_list;
				searchdocCount = adm_doc_list.length;
			}else{
				data.unIndexDocumentsList = [];
			}
			if(adm_folder_list != null && adm_folder_list.length > 0){
				data.unIndexFoldersList = adm_folder_list;
				fetchFolder = true;
				searchfolderCount = adm_folder_list.length;
			}else{
				data.unIndexFoldersList = [];
			}
			admCommonLoopFolderList(fetchFolder, data);
		} else {
			admShowNoDataFoundTable();
		}
		
		$("#admfolderheader").html("<span id='admtotalfilesheader'>"+searchfolderCount+" folders "+searchdocCount+ " files</span>");
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
			var tagName = "";
			for(var i=0;i<=details.length-1;i++){
				var id = details[i].id + "";
				var tag = details[i].tag;
				if(tag.length > 30){
					tagName = tag.slice(0, 30).concat('...');
				}
				var fileId = details[i].fileId;
				var datavar = "data-id='"+id+"' data-fileid='"+fileId+"'";
				var taghtml = "";
				if(i > 0) taghtml += "<hr>";
				taghtml += "<div class='row' id='adm_div_TagsPopupIndex_"+i+"' "+datavar+">";
				taghtml += "	<div class='col-md-10'>";
				taghtml += "<div class='form-group custom-mt-form-group margin-bottom-0 font-18'>";
				if (tag.length > 30) {
					taghtml += "<label id='admtagtext_" + i + "' title='" + tag + "'>" + tagName + "</label>";
				} else {
					taghtml += "<label id='admtagtext_" + i + "' title='" + tag + "'>" + tag + "</label>";
				}
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

				var extension = "";
				if(actURL.indexOf(".") >= 0) {
					extension = actURL.substring(actURL.lastIndexOf(".")+1);
					extension = extension.toLowerCase();
				}

				if(extension.toLowerCase().indexOf("xls") == 0 || extension.toLowerCase().indexOf("xlsx") == 0){
					actURL = actURL.substring(0, actURL.indexOf("?p="));
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
		} else if(data.message == "FILEVIEWAGAIN"){
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
			$("#adm_version_filenm_progress_"+extraParam.idm).hide();
		} else if(data.message == "FILEERROR"){
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
			admsearchpagenumber = admdisplaycounter;
			admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
		}
		//admSaveFolderSizeSingleFolderIdService();
	} else {
		if(data.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
		} else if(data.message == "LOCKED"){
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		} else if(data.message == "DRMAPPLIEDERROR"){
			admShowconfirmmsg(adm_messages.drmappliedshareerror, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admUploadFileAfter(updatesize){
	var isVersion = false;
	var jsonInput = {listAttribute4:[]};
	var attribute10 = "";
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
		attribute10 = data.attribute10;
	}

	try{
		if(parseFloat(data.attribute8+"")> 0){
			isVersion = true;
			jsonInput.attribute5 = data.attribute8;
			jsonInput.attribute6 = updatesize;
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

		for(var i=0;i<admfolderpathupld.length;i++){
			if(i==0) attribute10 = admfolderpathupld[i];
			else attribute10 = admfolderpathupld[i]+"#"+attribute10;
		}

		jsonInput = admUploadjsonSizeUpdate(jsonInput, attribute10, updatesize);
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


		if (localStorage._zs == "I") {
			$("#btn_todolist").hide();
			$("#imgrmexe").hide();
			$("#metadataValueSearch").hide();
		}
		else {
			if((localStorage._zmd).split(",").includes("5")){
				$("#btn_todolist").show();
			}

			$("#imgrmexe").show();
			$("#metadataValueSearch").show()
		}


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

		if(data.type == "ADMIN" && localStorage._zs == "B"){
			localStorage._zp = "1";
			$("#dropdownMenuLink").show();
			$("#admin_module").show();
			$("#div_perm").attr("title", "Folder Access Controls");
			$("#div_admin_controls").show();
			$("#adm_rebuildindex").show();
		}else if(data.type == "USER"){
			localStorage._zp = "0"
			$("#admin_module").hide();
			$("#div_admin_controls").hide();
			$("#adm_rebuildindex").hide();
		}

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

		$("#adm_qrcode").hide();
		$("#adm_qrcode_hr").hide();
		if(data.userOTPDto.otpId==4){
			$("#adm_qrcode").show();
			$("#adm_qrcode_hr").show();
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
		$("#imgclassid_"+response.idm).removeClass("respons");
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
			$("#imgclassid_"+response.idm).removeClass("respons");
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

	globalvariable.admForumDBFetchDone = true;
	admFormBusy = false;
	admForumCheckNotif();
}

function admDeleteForumNotifServiceAfter(response){

}

function admOpenFilePermissionServiceAfter(response){
	admuserfilepermlist = [];
	$("#btn_save_file_perm_close").show();
	$("#btn_save_file_perm").show();
	$("#tbl_permission_header").show();
	if(response.error == false && response.object != null){
		var data = response.object;
		var count = 0;
		var countchecked = 0;
		for(var i=0;i<data.length;i++){
			if(data[i].loginId != localStorage._zy && data[i].loginId != ""){
				var loginid = (data[i].loginId).toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

				var status = false;
				var indeterminate = "-1";
				var show = false;
				var permclass = "";
				var permclass = "";

				if(data[i].status == 1){
					countchecked++;
					status = true;
					show = true;
				} else {
					status = false;
					show = true;
				}
				if(data[i].folderPerm == 2){
					show = false;
				} else {
					count++;
					show = true;
					permclass = "file_perm111";
				}

				if(data[i].status == 3){
					show = true;
					indeterminate = "0";
				}

				if(data[i].folderPerm == 2){
					show = false;
					permclass = "";
				}

				if(show == true){
					var sm = {"loginid":loginid,"loginidact":data[i].loginId,"status":data[i].status,"indeterminate":indeterminate,"permclass":permclass};
					admuserfilepermlist.push(sm);
				}
			}
		}
	}

	admfetchActiveLoginIdsFilePerm();
	ajaxindicatorstop();
}

function admfetchActiveLoginIdsFilePerm(data){
	$("#tbldocpermroes").html("");
	displaycounter = 0;
	userdetails = [];
	$("#divpages").html("");
	$("#tableHeadPages").hide();

	if(data == undefined){
		data = admuserfilepermlist;
	}

	if(data != null && data.length > 0){
		var str = "";
		str += "<table class='table table-sm' id='tbl_permission'>";
		str += "<thead id='tbl_permission_header'>";
		str += "<tr>";
		str += "<th scope='row'>Login Id</th>";
		str += "<th width='20%'>View<input type='checkbox' class='form-check-input' id='chk_selectall_view' style='margin-left:20px;position:initial'></th>";
		str += "</tr>";
		str += "</thead>";
		str += "<tbody>";
		str += "<tr class='tsclspermnouser' style='display:none;'>";
		str += "<td scope='row' style='word-break: break-word;font-weight:bold;font-size:18px;'>None of the users have permission on the folder</td>";
		//str += "<td width='20%' style='text-align:center;'>&nbsp;</td>";
		str += "</tr>";
		str += "<tr class='norecord' style='display:none;'>";
		str += "<td scope='row' style='word-break: break-word;font-weight:bold;font-size:18px;'>No Records Found</td>";
		str += "</tr>";
		str += "<tr id='tr_file_perm_List'>";
		str += "<td id='td_file_perm_List' scope='row' colspan='2'>";
		str += "</td>";
		str += "</tr>";

		var j = 0;
		pagecount = parseInt(data.length/maxrows) + 1;
		var count = 0;
		userlistarrar = [];
		userlistarrartemp = [];

		for(var i=0;i<data.length;i++){
			userlistarrartemp[j] = data[i];
			if((j == maxrows-1) || (count == pagecount-1 && i == data.length-1)) {
				j = 0;
				userlistarrar[count++] = userlistarrartemp;
				$("#divpages").append("<a href='javascript:void(0);' style='color:#9f9797;margin-right:10px;text-decoration:none;' class='pagecount' id='pagecount_"+count+"' onclick='admfetchActiveLoginIdsServiceUI("+(count-1)+")'>"+count+"</a>");
				userlistarrartemp = [];
			} else {
				j++;
			}
		}
		str += "</tbody>";
		str += "</table>";
		$("#tbldocpermroes").html(str);
		admfetchActiveLoginIdsServiceUI(displaycounter);
		if(pagecount > 1) $("#tableHeadPages").show();
	}else{
		admShowconfirmmsg(adm_messages.nopermission, confirm_Info, 5000, "", false, false);
	}
}

function admfetchActiveLoginIdsServiceUI(counter){
	displaycounter = counter;
	$(".pagecount").css("color", "#9f9797");
	$(".pagecount").css("font-size", "14px");
	$(".pagecount").css("font-weight", "normal");
	$(".pagecount").css("text-decoration", "none");

	$("#pagecount_"+(counter+1)).css("color", "#2abfc1");
	$("#pagecount_"+(counter+1)).css("font-size", "17px");
    $("#pagecount_"+(counter+1)).css("font-weight", "bold");
	$("#pagecount_" + (counter + 1)).css("text-decoration", "underline");

	$("#td_file_perm_List").html("");
	var str = "<table class='table table-sm table-hover'>";
	var data = userlistarrar[counter];
	for(var i=0;i<data.length;i++){
		if(data[i].loginidact != localStorage._zy){
			var id = data[i].loginid;
			str += "<tr class='tsclsperm' id='tr_file_perm_"+id+"' data-prvstatus='"+data[i].status+"'>";
			str += "<td scope='row' style='word-break: break-word;'>"+data[i].loginidact+"</td>";
			str += "<td width='20%' style='text-align:center;'>";

			str += "<input type='checkbox' class='form-check-input adm_file_perm_checkbox_mark_cls permcls "+data[i].permclass+"' ";
			str += "style='position:initial;display:"+(data[i].indeterminate=="-1"?"":"none")+";' id='adm_file_perm_popup_"+id+"' ";
			str += "data-id='"+data[i].loginidact+"' "+(data[i].status == 1 ? " checked ":" ");
			str += "data-indeterminate-click='"+data[i].indeterminate+"'>";

			str += "<div class='divpermcls' style='width:12px;height:12px;background:#007bff;margin-left:38%;margin-top:2%;";
			str += "cursor:pointer;border-radius:3px;display:"+(data[i].indeterminate=="0"?"":"none")+";' ";
			str += "id='div_adm_file_perm_popup_"+id+"'></div>";

			str += "</td>";
			str += "</tr>";
		}
	}
	str += "</table>";
	$("#td_file_perm_List").html(str);

	for(var i=0;i<data.length;i++){
		if(data[i].loginidact != localStorage._zy){
			admFilePermissionCheckBoxEvent("adm_file_perm_popup_"+data[i].loginid);
			admFilePermissionDivCheckBoxEvent("div_adm_file_perm_popup_"+data[i].loginid);
			//admSaveInitialFilePermissionStatus(data[i].loginid, data[i].status);
		}
	}

	var len = $('.file_perm111').length;
	var j = 0;

	$('.file_perm111').each(function () {
		if ($(this).is(":checked") == true) {
			j++;
		}

	});
	if (j == len) {
		$("#chk_selectall_view").prop("checked", true);
	} else {
		$("#chk_selectall_view").prop("checked", false);
	}

	if(len == 0){
		$(".tsclspermnouser").show();
		$("#btn_save_file_perm_close").hide();
		$("#btn_save_file_perm").hide();
		$("#tbl_permission_header").hide();
	}
	if(j == (data.length-1)){
		$("#chk_selectall_view").prop("checked", true);
	}else{
		$("#chk_selectall_view").prop("checked", false);
	}
	if($("#divmodaldocperm").css('display') == 'none') {
		showActionPopup("divmodaldocperm", false);
	}

	admFilePermViewAllEvent();
}

function admfetchActiveLoginIdsServiceAfter(response){
	/*$("#tbldocpermroes").html("");
	displaycounter = 0;
	userdetails = [];
	$("#divpages").html("");
	$("#tableHeadPages").hide();

	if(response.error == false && response.messageCode == 200 && response.object != null){
		admuserfilepermlist = response.object;
	}*/
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

function admDRMFetchServiceAfter(response){
	ajaxindicatorstop();
	admDefaultDRMpopup("File");
	if(response.error == false && response.object != null){
		var data = response.object[0];
		var expiryDate = moment(new Date(Date.parse(data.expiryDate))).format("YYYY-MM-DD HH:mm");
		$("#txt_drm_expiry_date").val(expiryDate);
		if(data.allowPrint == 1){
			$("#adm_drm_allow_print").prop("checked", true);
		}
		$("#adm_drm_allow_all").show();
		$("#adm_drm_block_all").show();
		$("#modaldrmfile").attr("data-id", data.id);
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		}
	}
}

function admDRMAddServiceAfter(response){
	hideActionPopup("modaldrmfile");
	$(".admcheckbox").prop("checked", false);
	$("#admallcheckbox").prop("checked", false);
	ajaxindicatorstop();
	if(response.error == false && response.object == true){
		admShowconfirmmsg(adm_messages.admdrmapplied, confirm_Success, 5000, "", false, false);
		if(response.extrajsonparam.length > 0){
			for(var i=0;i<response.extrajsonparam.length;i++){
				var drmAppliedindex = response.extrajsonparam[i].index;
				$("#adm_drm_span_"+drmAppliedindex).show();
				$("#admdocrowiconscopy_"+i).hide();
				$("#admdocrowiconsmove_"+i).hide();
				$("#admdocrowiconsshare_"+i).hide();
			}
		}
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else if(response.message == "NORECORDS"){
			admShowconfirmmsg(adm_messages.admdrmnorecordstoapply, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admDRMAddByFolderIdServiceAfter(response){
	hideActionPopup("modaldrmfile");
	$(".admcheckbox").prop("checked", false);
	$("#admallcheckbox").prop("checked", false);
	ajaxindicatorstop();
	if(response.error == false && response.object == true){
		admShowconfirmmsg(adm_messages.admdrmapplied, confirm_Success, 5000, "", false, false);
		$("#drm_folder_info_"+response.extrajsonparam.folderId).show();
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else if(response.message == "NORECORDS"){
			admShowconfirmmsg(adm_messages.admdrmnorecordstoapply, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function admDRMDeleteServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.object == true){
		admShowconfirmmsg(adm_messages.admdrmapplied, confirm_Success, 5000, "", false, false);
		$(".admcheckbox").prop("checked", false);
		$("#admallcheckbox").prop("checked", false);
		hideActionPopup("modaldrmfile");
		if(response.extrajsonparam.folderId != null && response.extrajsonparam.folderId != undefined && response.extrajsonparam.folderId > 0){
			$("#drm_folder_info_"+response.extrajsonparam.folderId).hide();
		} else if(response.extrajsonparam.indexes != null && response.extrajsonparam.indexes != undefined && response.extrajsonparam.indexes.length > 0){
			var sm = (response.extrajsonparam.indexes).split(",");
			for(var i=0;i<sm.length;i++){
				$("#adm_drm_span_"+sm[i]).hide();
				$("#admdocrowiconscopy_"+sm[i]).show();
				$("#admdocrowiconsmove_"+sm[i]).show();
				$("#admdocrowiconsshare_"+sm[i]).show();
			}
		}
	} else {
		if(response.message == "NOPERMISSION"){
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

//function to download all files with in an interval and populate on screen
var lastrow = 0;
var maxrow = 100;
var totalrowcount = 0;
function downloadAllFileServiceAfter(response){
	if(response.object != null){
		if(response.error == false && response.object.length > 0){
			var dto = response.object;
			var fileIds = "";
			for(var i=0;i<dto.length;i++){
				fileIds=fileIds+dto[i].id;if(i<(dto.length-1))fileIds=fileIds+",";
			}
			var jsonInput = {
				attribute1:fileIds,
				attribute2:1,
				attribute3:dto.length,
				attribute4:0,
				attribute5:"download",
				boolAttribute1:false
			};
			admDownloadZipFile(jsonInput);
			if(response != null && response.object != null){
				if(dto.length > 0) {
					totalrowcount = dto.length;
					lastrow = 0;
					loadData(dto);
				}
			}
			$("#tblfilerows").on("scroll", function() {
				var p1 = $(this).scrollTop();
				var p2 = $(this).innerHeight();
				var p3 = $(this)[0].scrollHeight;
				p3 = p3 - 100;
				if(lastrow < totalrowcount) {
					if((p1 + p2) >= p3) {
						loadData(dto);
					}
				}
			});
			var fileCount = window.location.href.split("&")[4].replace("count=","");
			if(fileCount != totalrowcount){
				admShowconfirmmsg("Some files may not exist or you do not have permission or files properties have been changed", confirm_Info, 1, "", false, true);
			}
		}else{
			document.getElementById("nodata").style.visibility="visible";
		}
	}else{
		document.getElementById("nodata").style.visibility="visible";
	}
}
//function to load row from data
function loadData(data){
	var len = lastrow + maxrow;
	for(var i=lastrow;i<len;i++){
		if(data[i] != null && data[i] != undefined) {
			buildRow(data[i]);
		}
	}
	lastrow = len;
}
//function to create tr and append to html file
function buildRow(dto){
	var datahtml = "";
	datahtml += "<tr>";
	datahtml += "<th style="+"width:50%;font-size:15px;padding-left:0px;"+"><span>"+dto.fileName+"</span></th>";
	datahtml += "<th style="+"width:30%;font-size:15px;padding-left:160px;"+" ><span>"+getdatefromtimestamp(dto.fileModifiedDate)+"</span></th>";
	datahtml += "<th style="+"width:30%;font-size:15px;padding-left:50px;"+" ><span>"+formatSizeUnits(dto.fileSize)+"</span></th>";
	datahtml += "<th><img src="+"assets/img/dcirrus_spins.gif?v=4 "+"width="+"20px"+"></th>";
	datahtml += "</tr>";
	$("#tblfilerows").append(datahtml);
}

function admCheckValidpassServiceAfter(response){
	ajaxindicatorstop();
	var logout = true;
	if(response.object != null && response.error == false && response.object == true){
		logout = false;
		admRegenerateQRCodeService();
	} else if(response.messageCode == 200){
		logout = false;
		admShowconfirmmsg(adm_messages.invalidcredentials, confirm_Error, 5000, "", false, false);
	} else if(response.messageCode == 400){
		admShowconfirmmsg(adm_messages.usernotactive, confirm_Error, 5000, "", false, false);
	} else if(response.messageCode == 421){
		showMessageErrorLogin(login_messages.deviceblockedexceedloginBussiness, confirm_Error, true);
	} else if(response.messageCode == 427){
		showMessageErrorLogin(login_messages.deviceblockedexceedloginBussiness, confirm_Error, true);
	}

	if(logout){
		clearauthinlocalstorage();
		setTimeout(function(){
			window.location.reload();
		}, 5000);
	}
}

function admRegenerateQRCodeServiceAfter(response){
	ajaxindicatorstop();
	if(response.object != null && response.error == false && response.object.length > 0){
		var data = response.object;
		if(data.indexOf("#") > 0){
			var qrcode = data.substring(data.indexOf("#")+2);
			$("#img_regenerate_auth_qr_code").attr("src", qrcode);
			data = data.substring(0, data.indexOf("#"));
			$("#span_regenerate_otp_message").html(adm_messages.newqrgenerated);
			admShowconfirmmsg(adm_messages.newqrgenerated, confirm_Success, 5000, "", false, false);
			$("#adm_regen_authenticator_pass").hide();
			$("#btn_regenerate_pass").hide();
			$("#adm_regen_authenticator_set").show();
			$("#btn_regenerate_auth").show();
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admCheckSearchIndexServiceAfter(response) {
	$("#dotloading").hide();
	$("#li_AI_enabled").hide();
	if(response.object != null && response.error == false){
		if(admshowAIPopup){
			showActionPopup("divcontentsearchmodal");
			$("#txt_search_index").val("");
		}
		$("#li_AI_enabled").show();
	} else if(response.object != null && (response.message == "INPROGRESS" || response.message == "NEWINDEX")){
		if(admshowAIPopup) admShowconfirmmsg(adm_messages.dcirrusaiinfomsg, confirm_Info, 5000, "", false, false);
		$("#dotloading").show();
	} else {
		$("#dotloading").hide();
		if(admshowAIPopup) {
			if (localStorage._zp == "1") {
				showActionPopup("divcontentsearchrequestmodal");
				$("#admcontenttextarea").val("");
			} else {
				admShowconfirmmsg(adm_messages.dcirrusairequestsentcorpadmin, confirm_Error, 5000, "", false, false);
			}
		}
	}
	admshowAIPopup =  false;
}

function admFetchSearchIndexServiceAfter(response) {
	ajaxindicatorstop();
	$("#dotloading").hide();
	if(response.object != null && response.error == false){
		adm_ai_search = true;
		var docList = response.object;
		adm_doc_list = docList;
		admsortoff = true;
		if(adm_doc_list != null && adm_doc_list.length > 0){

			var data = {};
			data.unIndexFoldersList = [];
			data.unIndexDocumentsList = adm_doc_list;
			admCommonLoopFolderList(false, data);
		} else {
			admShowNoDataFoundTable();
		}
		admtotaldocs = response.object.length;
		$("#admfolderheader").html("<span id='admtotalfilesheader'>"+admtotaldocs+ " files</span>");
		$("#admfolderheader").show();
	} else {
		admShowNoDataFoundTable();
		admShowconfirmmsg(adm_messages.admnorecordsfound, confirm_Info, 5000, "", false, false);
	}
}

function admSyncNowSearchIndexServiceAfter(response) {
	if(response.object != null && response.error == false){
		admShowconfirmmsg(adm_messages.searchsyncstarted, confirm_Info, 5000, "", false, false);
	} else if(response.message == "COPORATE ID AND IPADDRESS ARE NOT ALLOWED"){
		admShowconfirmmsg(response.message, confirm_Info, 5000, "", false, false);
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Info, 5000, "", false, false);
	}
	admFetchdataSourceService();
}

function admSearchIndexRequestServiceAfter(response) {
	hideActionPopup("divcontentsearchrequestmodal");
	admShowconfirmmsg(adm_messages.dcirrusairequestsent, confirm_Success, 5000, "", false, false);
}

function admFetchdataSourceServiceAfter(response) {
	ajaxindicatorstop();
	if (response.error == false && response.object != null) {
		if (response.object[0].status == "S") {
			$("#btn_content_sync_now").html("Syncing");
		} else if (response.object[0].status == "A") {
			$("#btn_content_sync_now").html("Sync Now");
		}
	}
}

function admFetchAIDocumentServiceAfter(response) {
	selectedFileId = response.extrajsonparam.docId;
	var idm = response.extrajsonparam.idm;
	$("#adm_filenm_"+idm).show();
	$("#adm_filenm_progress_"+idm).hide();
	if (response.error == false && response.object != null) {
		if(response.messageCode == 443){
			showActionPopup("divaskpdfpassword", false);
			$("#img_pdf_captcha").attr("src", response.object);
			$("#passwordIDM").val(idm);
		} else {
		window.open("aisplit.html?t="+response.object+"&d="+response.extrajsonparam.docId+"?"+response.extrajsonparam.filename, "_blank");
		}
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function admUnlockPdfServiceAfter(response){
	var idm = response.extrajsonparam.idm;
	$("#adm_filenm_"+idm).show();
	$("#adm_filenm_progress_"+idm).hide();
	if (response.error == false && response.object != null) {
		window.open("aisplit.html?t="+response.object+"&d="+response.extrajsonparam.docId, "_blank");
	} else {
		if(response.messageCode == 445){
			showActionPopup("divaskpdfpassword", false);
			$("#img_pdf_captcha").attr("src", response.object);
			admShowconfirmmsg(adm_messages.wrongpdfpassword, confirm_Error, 5000, "", false, false);
		} else if(response.messageCode == 446){
			showActionPopup("divaskpdfpassword", false);
			$("#img_pdf_captcha").attr("src", response.object);
			admShowconfirmmsg(adm_messages.wrongcaptcha, confirm_Error, 5000, "", false, false);
		} else if(response.messageCode == 444){
			showActionPopup("divaskpdfpassword", false);
			admShowconfirmmsg(adm_messages.wrongpdfpasswordexceed, confirm_Error, 5000, "", false, false);
			setTimeout(function(){
				clearauthinlocalstorage();
				window.location.href = "drive.html";
			}, 3000);
		} else {
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

