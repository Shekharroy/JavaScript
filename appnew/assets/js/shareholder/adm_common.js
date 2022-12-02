function admCommonEvents(){
	//personal/dataroom click
	admTopFolderClick();
	admAddNewFolderEvent();
	admSearchEvents();
	admDataScrollEnd();
	admOpenShareCloseModal();
	admOpenShareDoneModal();
	admOpenShareEmailModal();
	admAddNewShareEmailRow();
	admShareEmailCloseModal();
	admShareEmailDoneModal();
	admOpenInboundCloseModal();
	admOpenInboundDoneModal();
	admInfiniteDaysShare();
	admHeaderCheckboxChecked();
	admOpenShareCommon();
	admOpenCopyCommon();
	admOpenMoveCommon();
	admOpenDeleteCommon();
	admOpenChooseViewer();
	admOpenRestoreCommon();
	admOpenDeletePermanentCommon();
	admfetchprojectIndexEvent();
	admDeleteConfirmEvents();
	admMoreAllClickEvent();
	admRefreshData();
	admRefreshDataTree();
	admTagPopupClose();
	admtagAddRowAction();
	admVersionPopupClose();
	admCopyCloseEvent();
	admCopyTabClickEvent();
	admCopyDoneEvent();
	admOpenFileUploadModal();
	admDownloadCommon();
	openShareManagement();
	admChangeShareMgmtTabs();
	admSaveSharedSecurityDone();
	admCloseViewerPopup();
	admSortEvents();
	admDocumentViewerTypeClose();
	admDocumentViewerTypeSelect();
	admDeleteShareMgmtDeleteDone();
	admDownloadStatusEvent();
  	admShareAllowUpload();
	admShareWatermark();
	admShareAllowSign();
	admHistoryLogs();
	admchangePass();
	rebuildIndexOKModal();
	admcreateFolderEnterKey();
	admEnterKeyEventAddTag();
	admCursorPointInTextField();
	admProviderSelectEvent();
	admCommonConfirmationDialogEvents();
	admSwitchAccountScreen();
	notesCommon();
	admForumNotifEvent();
	admFilePermEvent();
	admDisplayCompanyName();
	admResetAllFilePermision();

	if(checkIEBrowser()){
		$("#btnuploadfolder").hide();
		$("#btnuploadfile").css("border-bottom-left-radius","18px;");
		$("#btnuploadfile").css("border-bottom-right-radius","18px;");
		$("#btnuploadfile").css("padding","15px;");
		$("#btnuploadfile").css("border-bottom:","0px;");
	}

	admUsernameClickTop();

	$.fn.extend({
		treed: function (o) {

		  var openedClass = 'glyphicon-minus-sign';
		  var closedClass = 'glyphicon-plus-sign';

		  if (typeof o != 'undefined'){
			if (typeof o.openedClass != 'undefined'){
			openedClass = o.openedClass;
			}
			if (typeof o.closedClass != 'undefined'){
			closedClass = o.closedClass;
			}
		  };

			//initialize each of the top levels
			var tree = $(this);
			tree.addClass("tree");
			tree.find('li').has("ul").each(function () {
				var branch = $(this); //li with children ul
				branch.prepend("<i class='indicator fa " + closedClass + "'></i>");
				branch.addClass('branch');
				branch.on('click', function (e) {
					if (this == e.target) {
						var icon = $(this).children('i:first');
						icon.toggleClass(openedClass + " " + closedClass);
						$(this).children().children().toggle("slow");
					}
				})
				branch.children().children().toggle("slow");
			});
			//fire event from the dynamically added icon
		  tree.find('.branch .indicator').each(function(){
			$(this).on('click', function () {
				$(this).closest('li').click();
				admTreeClick($(this).closest('li'));
			});
		  });
			//fire event to open branch if the li contains an anchor instead of text
			tree.find('.branch>a').each(function () {
				$(this).on('click', function (e) {
					$(this).closest('li').click();
					admTreeClick($(this).closest('li'));
					e.preventDefault();
				});
			});
			//fire event to open branch if the li contains a button instead of text
			tree.find('.branch>button').each(function () {
				$(this).on('click', function (e) {
					$(this).closest('li').click();
					admTreeClick($(this).closest('li'));
					e.preventDefault();
				});
			});
		}
	});

	var input = $("#mmobilenumber");
	input.intlTelInput(	{
		separateDialCode: true
	});

	input.on("countrychange", function() {
		input.val('')
	});

	$(".iti__selected-flag").css("max-width", "75px");
}

function admTreeClick(obj){
	var idm = obj[0].id;
	if(idm != "adm_foldertreeli"){
		admcurrentliid = idm;
		admTreeFolderSelectedId = document.getElementById(idm).getAttribute("data-id");
		$(".adm_ShowAdmoptionCls1").css("background", "white");
		$(".adm_ShowAdmoptionCls1").css("color", "#369");
		$("#"+admcurrentliid+".adm_ShowAdmoptionCls1").css("background", "#6699cc");
		$("#"+admcurrentliid+".adm_ShowAdmoptionCls1").css("color", "white");
		var lk = $("#"+admcurrentliid).children("ul")[0];
		if($(lk).html() == ""){
			setTimeout(function (){
				admFolderListAllService();
			}, 100);
		}
	}
}

/**
 * method to fetch idm from id
 * @param id
 * @returns
 */
function admGetIdm(id){
	var idm = id.substring(id.indexOf("_")+1);
	idm = idm.substring(idm.indexOf("_")+1);
	return idm;
}

/**
 * method to folder type from id
 * @param id
 * @returns
 */
function admGetFolderType(id){
	var folderType = id.substring(id.indexOf("_")+1);
	folderType = folderType.substring(0, folderType.indexOf("_")+1);
	return folderType;
}

/**
 * method to get second level from id
 * @param id
 * @returns
 */
function admGetSecondLevel(id){
	var level = id.substring(id.indexOf("_")+1);
	level = level.substring(level.indexOf("_")+1);
	level = level.substring(level.indexOf("_")+1);
	level = level.substring(0, level.indexOf("_"));
	return level;
}

/**
 * method to return folder type
 * @param folderType
 * @returns
 */
function admReturnFolderType(folderType){
	if(folderType == admsharedtypeDB) return admsharedtype;
	else if(folderType == admpersonaltypeDB) return admpersonaltype;
	else if(folderType == admarchivedtypeDB) return admarchivedtype;
}

/**
 * fetch db folder type
 * @returns
 */
function admReturnFolderTypeDB(folderType){
	if(folderType == admsharedtype) return admsharedtypeDB;
	else if(folderType == admpersonaltype) return admpersonaltypeDB;
	else if(folderType == admarchivedtype) return admarchivedtypeDB;
}

/**
 * fetch db folder type
 * @returns
 */
function admReturnFolderTypeCaption(folderType){
	if(folderType == admsharedtype) return "Data Room";
	else if(folderType == admpersonaltype) return "Personal Folders";
	else if(folderType == admarchivedtype) return "Archieved Folders";
}

/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromAdm(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);

	/*if(base64authheadernew == ""){
		base64authheadernew = getauthtokenfromlocal();
	}
	invokeAdapterCall(type,posturl,base64authheadernew,jsoninout,jsonextraparam);*/
}

/**
 * method to call show confirm message
 * @param txt
 * @param type
 * @param duration
 * @param targetdvid
 * @returns {Boolean}
 */
function admShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm)
{
	if(ispop) showconfirmmsgpopup(txt, type, duration, targetdvid, confirm);
	else {
		if(type == "ASK"){
			showconfirmmsgmain(txt, type, duration, targetdvid, confirm);
		} else {
			$('body').topAlertjs({
				type: type,
				message: txt,
				close: true,
				duration: 10
			});
			$(".rowdropdownmenu").removeClass("show");
		}
	}
}

function admShowNoDataFoundTable(){
	$("#tbldatarows").empty();
	var datahtml = "<tr>";
	datahtml += "<td>";
	datahtml += "<h2><i class='fa fa-folder' aria-hidden='true' style='font-size:42px;color:#01c0c8;margin-right:8px;'></i></h2>";
	datahtml += "<h2><a href='#' style='font-size:16px;'>No Records Found</a></h2>";
	datahtml += "</td>";
	datahtml += "<td>&nbsp;</td>";
	datahtml += "<td>&nbsp;</td>";
	datahtml += "<td>&nbsp;</td>";
	datahtml += "<td>&nbsp;</td>";
	datahtml += "</tr>";

	$("#tbldatarows").attr("data-rowdispl", 0);
	$("#tbldatarows").append(datahtml);
}

/**
 * method to reset
 */
function admResetSorting(folderhide, folderType, folderId, folderfetch){
	adm_documentmaxlimit = 0;
	admtotaldocs = 0;
	if(adm_sorting == "") adm_sorting = "DESC`date";
	if(admcurrentfolderid == "0"){
		admListFolderIndexIdMain = [];
		fetchAllFolderListDetails(admcurrentfoldertype);
	} else {
		fetchAllFolderListLevelDetails(folderhide, folderType, folderId, folderfetch, true);
	}
}

function admRefreshFunction(){
	admCloseRowDropDown();
	ajaxindicatorstart('loading data.. please wait..');
	admUnSelectAllCheckBox();
	admClearSearchFieldsNew();
	$("#searchpopup").slideUp();
	adm_documentmaxlimit = 0;
	admtotaldocs = 0;
	adm_sorting = "DESC`date";
	adm_search_click = false;
	admSetSelectedNodeFromMain = true;
	resetSortingArrow();
	$("#datesort").removeClass("fa-chevron-up");
	$("#datesort").addClass("fa-chevron-down");
	$("#datesort").css("color", "#009ce7");
	adm_doc_list = [];
	admResetSorting(true, admcurrentfoldertype, admcurrentfolderid, true);
	admFolderListAllService(admTreeFolderSelectedId);
	admForumDBFetchDone = false
	admFetchForumNotifService();
}

function resetSortingArrow(){
	adm_sorting = "DESC`date";
	$("#namesort").removeClass("fa-chevron-down");
	$("#namesort").addClass("fa-chevron-up");
	$("#datesort").removeClass("fa-chevron-down");
	$("#datesort").addClass("fa-chevron-up");
	$("#sizesort").removeClass("fa-chevron-down");
	$("#sizesort").addClass("fa-chevron-up");
	$("#namesort").css("color", "#000000");
	$("#datesort").css("color", "#000000");
	$("#sizesort").css("color", "#000000");
}

/**
* new folder popup screen open setup
*/
function addNewFolderSetup(placeholder){
	$("#admfoldername").removeAttr("editid");
	$("#admfoldername").removeAttr("folderType");
	$("#admfoldername").removeAttr("currentpath");
	$("#admfoldername").removeAttr("isfolder");
	$("#admfoldername").attr("placeholder", placeholder);
	$("#admfoldername").val("");
	admhideshowcreatefolderbuttons(true);
}

/**
* new folder popup screen open setup
*/
function addRenameFolderSetup(placeholder){
	$("#rename_admfoldername").removeAttr("editid");
	$("#rename_admfoldername").removeAttr("folderType");
	$("#rename_admfoldername").removeAttr("currentpath");
	$("#rename_admfoldername").removeAttr("isfolder");
	$("#rename_admfoldername").attr("placeholder", placeholder);
	$("#rename_admfoldername").val("");
	admhideshowcreatefolderbuttons(true);
}

/**
* new folder popup screen open setup
*/
function addRenameFileSetup(){
	$("#rename_admfilename").removeAttr("folderid");
	$("#rename_admfilename").removeAttr("fileid");
	$("#rename_admfilename").removeAttr("filetype");
	$("#rename_admfilename").removeAttr("index");
	admhideshowcreatefolderbuttons(true);
}

function admClearDeleteConfirmModal(){
	$("#deleteconfirmmodal").removeAttr("folderid");
	$("#deleteconfirmmodal").removeAttr("fileid");
	$("#deleteconfirmmodal").removeAttr("index");
	$("#deleteconfirmmodal").removeAttr("multifile");
	admhideshowcreatefolderbuttons(true);
}

/**
 * method to prepare folder create method
 */
function admPrepareFolderCreate(){
	admhideshowcreatefolderbuttons(false);
	var parentid = admcurrentfolderid;
	var parentpath = admcurrentpath;
	var folderType = admcurrentfoldertype;
	var finalfpath = "";
	var ptht = $("#admfoldername").val();
	if(ptht.trim().length > 0) {
		var checkFolderNameFormat = admCheckFolderNameFormat(ptht);
		if(checkFolderNameFormat == true) {
			if(parentpath == "" || parentpath == admsharedtype || parentpath == admpersonaltype){
				finalfpath = ptht;
			} else {
				finalfpath = parentpath + "/" + ptht;
			}

			var cancreate = admCanCreateFolder(finalfpath);
			if(cancreate == true){
				admAddNewFolderService(finalfpath, parentid,folderType);
			} else if(!cancreate) {
				admShowconfirmmsg(adm_messages.admfolderexists, confirm_Error, 5000, "", false, false);
				admhideshowcreatefolderbuttons(true);
				ajaxindicatorstop();
			}
		} else {
			var msg = adm_messages.admfoldernameformat;
			msg = msg.replace(/<FOLDERFILE>/g, "folder name");
			msg = msg.replace("<NAME>", '"'+$("#admfoldername").val()+'"');
			admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
			admhideshowcreatefolderbuttons(true);
			ajaxindicatorstop();
		}
	} else {
		admShowconfirmmsg(adm_messages.enterfoldername, confirm_Error, 5000, "", false, false);
		admhideshowcreatefolderbuttons(true);
		ajaxindicatorstop();
	}
	$("#btncreatefolderdone").removeAttr('disabled');
	$("#admfoldername").removeAttr('disabled');
}

function admhideshowcreatefolderbuttons(show){
	if(show){
		$("#btncreatefolderdone").show();
		$("#btnnewfolderpopclose").show();
		$("#rename_btncreatefolderdone").show();
		$("#rename_btnnewfolderpopclose").show();
		$("#rename_filedone").show();
		$("#rename_filepopclose").show();
		$("#btndeleteconfirmdone").show();
		$("#btndeleteconfirmcancel").show();
	} else {
		$("#btncreatefolderdone").hide();
		$("#btnnewfolderpopclose").hide();
		$("#rename_btncreatefolderdone").hide();
		$("#rename_btnnewfolderpopclose").hide();
		$("#rename_filedone").hide();
		$("#rename_filepopclose").hide();
		$("#btndeleteconfirmdone").hide();
		$("#btndeleteconfirmcancel").hide();
	}
}

/**
 * method to prepare folder rename
 */
function admPrepareEditFolder(){
	admhideshowcreatefolderbuttons(false);
	var folderid = document.getElementById("rename_admfoldername").getAttribute("editid");
	var currentpath = document.getElementById("rename_admfoldername").getAttribute("currentpath");
	var folderType = document.getElementById("rename_admfoldername").getAttribute("folderType");
	var newpath = $("#rename_admfoldername").val();

	if(newpath.trim().length > 0){
		var checkFolderNameFormat = admCheckFolderNameFormat(newpath);
		if(checkFolderNameFormat){
			var parentpath = currentpath.substring(0,currentpath.lastIndexOf("/"));
			if(parentpath != "") newpath = parentpath + "/" + newpath;

			var cancreate = admCanCreateFolder(newpath);
			if(cancreate == true){
				admRenameNewFolderService(newpath, currentpath, folderType, folderid);
			} else if(!cancreate) {
				admShowconfirmmsg(adm_messages.admfolderexists, confirm_Error, 5000, "", false, false);
				admhideshowcreatefolderbuttons(true);
				ajaxindicatorstop();
			}
		} else if(!checkFolderNameFormat) {
			var msg = adm_messages.admfoldernameformat;
			msg = msg.replace(/<FOLDERFILE>/g, "folder name");
			msg = msg.replace("<NAME>", '"'+$("#rename_admfoldername").val()+'"');
			admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
			admhideshowcreatefolderbuttons(true);
			ajaxindicatorstop();
		}
	} else {
		admShowconfirmmsg(adm_messages.enterfoldername, confirm_Error, 5000, "", false, false);
		admhideshowcreatefolderbuttons(true);
		ajaxindicatorstop();
	}
	$("#rename_btncreatefolderdone").removeAttr('disabled');
	$("#rename_admfoldername").removeAttr('disabled');

}

/**
*check if the folder exists already
*/
function admCanCreateFolder(finalfpath){
	var cancreate = true;
	if(finalfpath.length > 0) {
		var p = finalfpath.trim().toLowerCase();
		if(p != "dcirrus" && p != "dcirrus sync" && p != "mymobile"){
			var keys = Object.keys(adm_parentfolderid);
			for(var i=0;i<keys.length;i++){
				var km = adm_parentfolderid[keys[i]].split("#");
				var kt = km[2];
				var kg = km[3];
				if(kt.toLowerCase() == finalfpath.toLowerCase() && admcurrentfoldertype == kg){
					cancreate = false;
				}
				if(cancreate == false){
					break;
				}
			}
		} else {
			cancreate = false;
		}
	} else {
		cancreate = false;
	}

	return cancreate;
}

/**
*check if the folder name format is correct
*/
function admCheckFolderNameFormat(finalpath, donotcompare){
	var cancreate = true;
	if(finalpath.length > 0){
		var ar = finalpath.split("/");
		if(ar.length >= 2 && donotcompare != "/"){
			cancreate = false;
		}

		ar = finalpath.split("\\");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split(":");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split("*");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split("?");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split("<");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split(">");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split("|");
		if(ar.length >= 2){
			cancreate = false;
		}

		ar = finalpath.split("#");
		if(ar.length >= 2){
			cancreate = false;
		}
	} else {
		cancreate = false;
	}

	if(cancreate && !stringcheckifnonascii(finalpath)){
		cancreate = false;
	}

	return cancreate;
}

/**
*check if the folder exists already
*/
function admDeleteFolderPathLocal(parentpath){
	var cancreate = true;
	if(parentpath.length > 0) {
		var p = parentpath.trim().toLowerCase();
		if(p != "dcirrus" && p != "dcirrus sync" && p != "mymobile"){
			var keys = Object.keys(adm_parentfolderid);
			for(var i=0;i<keys.length;i++){
				var km = adm_parentfolderid[keys[i]].split("#");
				var kt = km[2];
				var kg = km[3];
				if(kt.toLowerCase().indexOf(parentpath.toLowerCase()+"/") == 0 && admcurrentfoldertype == kg){
					delete adm_parentfolderid[keys[i]];
					break;
				}
			}
			//admResetTree();
		}
	}
}

function admPrepareFileRename(){
	admhideshowcreatefolderbuttons(false);
	var k = 0;
	var newpath = $("#rename_admfilename").val();
	var filetype = document.getElementById("rename_admfilename").getAttribute("filetype");
	newpath = newpath+"."+filetype;
	var docid = document.getElementById("rename_admfilename").getAttribute("fileid");

	var ln = newpath.length-1;
	if(newpath == "/" || newpath == "\\" || newpath == ":" || newpath == "*" || newpath == "?" || newpath == ">" || newpath == "<"){
		newpath = "";
	}
	if(newpath.lastIndexOf("/") == ln || newpath.lastIndexOf("\\") == ln || newpath.lastIndexOf(":") == ln
		|| newpath.lastIndexOf("*") == ln || newpath.lastIndexOf("?") == ln || newpath.lastIndexOf(">") == ln
		|| newpath.lastIndexOf("<") == ln){
		newpath = newpath.substring(0, newpath.length-1);
	}

	if(newpath.length > 0){
		var checkFolderNameFormat = admCheckFolderNameFormat(newpath);

		if(checkFolderNameFormat){
			if(newpath.trim().length == 0) {
				admShowconfirmmsg(adm_messages.enterfilename, confirm_Error, 5000, "", false, false);
				admhideshowcreatefolderbuttons(true);
			} else {
				//var ar = newpath.split(".");
				var folderid = document.getElementById("rename_admfilename").getAttribute("folderid");
				//newpath = ar[0] + "." + filetype;
				admRenameFileService(docid, newpath, folderid);
			}
		} else {
			var msg = adm_messages.admfoldernameformat;
			msg = msg.replace(/<FOLDERFILE>/g, "file name");
			msg = msg.replace("<NAME>", '"'+$("#rename_admfilename").val()+'"');
			admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
			admhideshowcreatefolderbuttons(true);
			ajaxindicatorstop();
		}
	} else {
		admShowconfirmmsg(adm_messages.enterfilename, confirm_Error, 5000, "", false, false);
		admhideshowcreatefolderbuttons(true);
		ajaxindicatorstop();
	}
	$("#rename_filedone").removeAttr('disabled');
	$("#rename_admfilename").removeAttr('disabled');
}

/**
 * method to rename folder path
 * @param folderpath
 * @returns {___anonymous6750_6826}
 */
function admFolderRenameJSON(currentFolderPath, newFolderPath, folderType, folderId){
	var sm = {
		currentFolderPath:currentFolderPath,
		newFolderPath:newFolderPath,
		folderType:folderType,
		folderId:folderId
	};
	return sm;
}

/**
 * method to rename file name
 * @param fileId
 * @param fileName
 * @returns {___anonymous6750_6826}
 */
function admFileRenameJSON(fileId, fileName, folderId){
	var sm = {
		fileId:fileId,
		fileName:fileName,
		folderId:folderId
	};
	return sm;
}

/**
 * method to prepare json from adm add folder json
 * @param fileinfo
 * @returns {___anonymous3999_4063}
 */
function admFolderAddJSON(folderpath, folderType, parentfolderid){
	if(folderpath.indexOf("/") == 0) folderpath = folderpath.substring(1);
	var sm = {
		folderPath:folderpath,
		status:"A",
		folderType:folderType,
		parentFolderId:parentfolderid,
		folderIndex:admListFolderIndexIdMain[admcurrentpath]
	};
	return sm;
}

function admSearchBackClick(){
	/*$("."+adm_checkboxcustomCls).prop('checked', false).checkboxradio('refresh');
	$("#"+adm_Search_BackIcon).hide();
	$("#"+adm_Search_BackIcon_New).show();
	$("#"+adm_SearchDivId).hide();
	$("#"+adm_admcontentMainTitle).show();
	adm_search_click = false;*/
}

function admSetFolderHeaderCaption(){
	$("#admfolderheader").hide();
	var currpath = admcurrentpath;
	if(currpath.toLowerCase().indexOf("dcirrus/") == 0){
		currpath = currpath.replace("DCirrus/", "DCirrus Sync/");
	}
	var xb = adm_parentfolderpath[currpath+"#"+admcurrentfoldertype];
	if((xb != undefined && xb != null) || currpath == ""){
		/*Reverted Code*/
		var mpathn = "<a href='javascript:void(0);' id='adm_header_-1'>Root >> </a> ";
		if(admcurrentfolderid == 0){
			mpathn = "<a href='javascript:void(0);' id='adm_header_-1'>Root </a> ";
		}
		$("#admfolderheader").html("<img src='assets/img/folder_tree.png?v=2' style='width:25px;cursor:pointer;' id='adm_foldertree'/>&nbsp;"+mpathn);
		var foldertype = admcurrentfoldertype;
		var folderfilecount = admttotalfile;
		var mpath = "";
		path = currpath;
		if(path.startsWith("Root/")){
			path = path.replace("Root/", "");
		}
		var arr = [];
		var len = 0;
		if(path.indexOf("/") > 0){
			try{
				var lpath = path;
				while(lpath.length > 0){
					var xs = adm_parentfolderpath[lpath+"#"+foldertype];
					var xm = xs.split("#");
					var datavar = "data-id='"+xm[2]+"' path=\""+lpath+"\" data-status='"+xm[3]+"' data-type=\""+foldertype+"\" data-count='"+xm[1]+"'";
					var pth = lpath.substring(lpath.lastIndexOf("/")+1);
					if(mpath.length > 0) mpath = "<a href='javascript:void(0);' id='adm_header_"+len+"' "+datavar+">"+pth+"</a>";

					else mpath = "<span>"+pth+"</span>";
					arr[len++] = mpath;

					if(lpath.indexOf("/") > 0){
						lpath = lpath.substring(0, lpath.lastIndexOf("/"));
					} else {
						lpath = "";
					}
				}
			}catch(error){}
		} else {
			try{
				var xs = adm_parentfolderpath[path+"#"+foldertype];
				var xm = xs.split("#");
				var datavar = "data-id='"+xm[2]+"' path=\""+path+"\" data-status='"+xm[3]+"' data-type=\""+foldertype+"\" data-count='"+xm[1]+"'";
				mpath = path;
				if(path.toLowerCase().trim() == "dcirrus"){
					mpath = "DCirrus Sync";
				} else if(path.toLowerCase().trim() == "mymobile"){
					mpath = "MyMobile";
				}
				mpath = "<span>"+mpath+"</span>";
				arr[len++] = mpath;
			}catch(error){}
		}

		admFolderClickMoreEvent("adm_header_-1");
		for(var i=len-1;i>=0;i--){
			if(i==len-1) $("#admfolderheader").append(arr[i]);
			else $("#admfolderheader").append(" >> " + arr[i]);
			admFolderClickMoreEvent("adm_header_"+i);
		}
		if(path.length > 0){
			if(folderfilecount > 1){
				$("#admfolderheader").append("<span id='admtotalfilesheader'></span>");
			} else {
				$("#admfolderheader").append("<span id='admtotalfilesheader'></span>");
			}
		}


		if($("#admallcheckbox").is(':checked')){
			totalfilesselected = $("input.admcheckbox:checked").length;
			if(totalfilesselected == 1) {
				$("#admtotalfilesheader").html(" | "+totalfilesselected+ " selected"+" | "+folderfilecount+" files");
			} else {
				$("#admtotalfilesheader").html(" | "+totalfilesselected+ " selected"+" | "+folderfilecount+" files");
			}
		}

		admSetSearchHeader();
		admTreeClickEvent();

		if($("#admfolderheader").html().indexOf("Root &gt;&gt;") > 0){
			$("#btnuploadfile").show();
		} else {
			$("#btnuploadfile").hide();
		}
		$("#admfolderheader").show();
	} else {
		$("#admfolderheader").hide();
	}
}

function admSetCopyFolderHeaderCaption(folderpath){
	$("#admcopyfolderheader").html("");
	var mpath = "";
	path = folderpath;
	var arr = [];
	var len = 0;
	if(path.indexOf("/") > 0){
		try{
			while(path.length > 0){
				var xs = adm_copy_parentfolderpath[path];
				var datavar = "data-id='"+xs+"' data-path=\""+path+"\"";
				var pth = path.substring(path.lastIndexOf("/")+1);
				if(mpath.length > 0) mpath = "<a href='javascript:void(0);' id='adm_copy_header_"+len+"' "+datavar+">"+pth+"</a>";
				else mpath = "<span>"+pth+"</span>";
				arr[len++] = mpath;

				if(path.indexOf("/") > 0){
					path = path.substring(0, path.lastIndexOf("/"));
				} else {
					path = "";
				}
			}
		}catch(error){}
	} else {
		$("#admcopyfolderheader").html(path);
		len = -1;
	}

	for(var i=len-1;i>=0;i--){
		if(i==len-1) $("#admcopyfolderheader").append(arr[i]);
		else $("#admcopyfolderheader").append(" >> " + arr[i]);
		admCopyFolderClickMoreRowEvent("adm_copy_header_"+i);
	}
	$("#admcopyfolderheader").prepend("Folder Selected : ");
}

/**
 * fetch db folder type
 * @returns
 */
function admReturnFolderTypeCaption(folderType){
	if(folderType == admsharedtypeDB) return "Data Room";
	else if(folderType == admpersonaltypeDB ) return "Personal Folders";
}

function admFolderClickCommon(path, folderType, folderId){
	$("#admallcheckbox").show();
	$("#admallcheckbox").prop('checked', false);
	adm_search_progress = false;
	admSearchBackClick();
	folderfetch = true;
	admcurrentpath = path;
	admcurrentfoldertype = folderType;
	admcurrentfolderid = folderId;

	$("#tbldatarows").html("");
	ajaxindicatorstart('loading data.. please wait..');
	admResetSorting(true, folderType, folderId, true);
}

function admopenshare(isfolder){
	try{document.getElementById("admsharecopytext").style.display="none";}catch(error){}
	if(isfolder){
		$("#lblallowupload").show();
	} else {
		$("#lblallowupload").hide();
	}
	$("#adm_mobileemailpoplist").html("");
	addsharemobileemailrowexecute();
	$("#admsharefooter").show();
	$("#admsharesubject").val("");
	$("#admsharenoofdays").val("30");
	$("#admshareinfinitedays").prop('checked', false);
	$("#admsharereadonly").prop('checked', false);
	$("#admshareallowprint").prop('checked', true);
	$("#admshareallowupload").prop('checked', false);
	$("#admsharemessage").val("");
	/*$('#admsharemessage').summernote({
			height: 200,
			minHeight: null,
			maxHeight: null,
			focus: false
		});*/

	$('.note-editor .note-editable').css("line-height", 1);

	var str = adm_share_message.replace("<DOCSHAREUSERNAME>", localStorage._zk);
	//$('#admsharemessage').summernote('code', str);
	$('#admsharemessage').val(str);

	if(!isfolder) {
		var stk = "<div style='display: flex;'>";
		stk += "<h4 style='margin-top: 8px;'>Files Selected</h4>";
		stk += "<button class='btn btn-primary btn-rounded float-right' style='cursor:pointer;width: 85px;margin-left: 20px;background: white;color: black;margin-top: 0px;height: 33px;font-size: 14px;' id='admsharecopylink'>Copy Link</button><span>&nbsp<i class='fa fa-info-circle mt-2' aria-hidden='true' title='No password required to access this link'></i></span>";
		stk += "</div>";
		stk += "<input type='text' id='admsharecopytext' style='display:none;width:100%;border-left:0px;border-top:0px;border-right:0px;border-bottom:1px;'/>";
		$("#share_selection").html(stk);
		var filefound = 0;
		var strg = "<p><div style='max-height:100px;overflow-y:auto;'>";
		$('input.admcheckbox:checked').each(function(i, obj) {
			var idm = (this.id).replace("adm_doc_checkbox_", "");
			var fnm = $("#adm_filenm_"+idm).html();
			strg += "<div style='width:100%;'>"+fnm+"</div>";
			filefound++;
		});
		strg += "</div></p>";

		if(filefound == 0){
			var fnm = document.getElementById("sharemodal").getAttribute("data-filename");
			strg = "<p><div style='max-height:100px;overflow-y:auto;'>";
			strg += "<div style='width:100%;'>"+fnm+"</div>";
			strg += "</div></p>";
		}

		$("#share_selection").append(strg);
	} else {
		var d = document.getElementById("sharemodal").getAttribute("data-folderid");
		var t = document.getElementById("sharemodal").getAttribute("data-foldertype");
		var y = document.getElementById("sharemodal").getAttribute("data-folderpath");
		var folderName = y;
		if(folderName.indexOf("/") > 0){
			folderName = folderName.substring(folderName.lastIndexOf("/")+1);
		}

		var stk = "";
		if(t == admsharedtype) {
			stk += "<div style='display: flex;'>";
			stk += "<h4 style='margin-top: 8px;'>Data Room Selected</h4>";
			stk += "<button class='btn btn-primary btn-rounded float-right' style='cursor:pointer;width: 85px;margin-left: 20px;background: white;color: black;margin-top: 0px;height: 33px;font-size: 14px;' id='admsharecopylink'>Copy Link</button><span>&nbsp<i class='fa fa-info-circle mt-2' aria-hidden='true' title='No password required to access this link'></i></span>";
			stk += "</div>";
			stk += "<input type='text' id='admsharecopytext' style='display:none;width:100%;border-left:0px;border-top:0px;border-right:0px;border-bottom:1px;'/>";
			stk += "<p>"+folderName+"</p>";
		} else if(t == admpersonaltype) {
			stk += "<div style='display: flex;'>";
			if(localStorage._zs == "I"){
				stk += "<h4 style='margin-top: 8px;'>Data Room Selected</h4>";
			}else{
				stk += "<h4 style='margin-top: 8px;'>Personal Folder Selected</h4>";
			}
			stk += "<button class='btn btn-primary btn-rounded float-right' style='cursor:pointer;width: 85px;margin-left: 20px;background: white;color: black;margin-top: 0px;height: 33px;font-size: 14px;' id='admsharecopylink'>Copy Link</button><span>&nbsp<i class='fa fa-info-circle mt-2' aria-hidden='true' title='No password required to access this link'></i></span>";
			stk += "<input type='text' id='admsharecopytext' style='display:none;'/>";
			stk += "</div>";
			stk += "<input type='text' id='admsharecopytext' style='display:none;width:100%;border-left:0px;border-top:0px;border-right:0px;border-bottom:1px;'/>";
			stk += "<p>"+folderName+"</p>";
		}
		$("#share_selection").html(stk);

		//if(t == admsharedtype) $("#share_selection").html("<h4>Data Room Selected</h4><p>"+folderName+"</p>");
		//else if(t == admpersonaltype) $("#share_selection").html("<h4>Personal Folder Selected</h4><p>"+folderName+"</p>");
	}

	showActionPopup("sharemodal");
	admsharecopylinkevent(isfolder);
}

/**
 * method to build json for share file list
 * @returns {___anonymous19567_19676}
 */
function admShareURLBuildJSON(){
	//var vMessage = $('#admsharemessage').summernote('code');
	var vMessage = $('#admsharemessage').val();
	vMessage = vMessage.replace(/\n/, "<br/>")
	var vSubject = $("#admsharesubject").val();
	var days = $("#admsharenoofdays").val();
	if(days.includes("10 years")){
		days=(10*365).toString();
	}
	var minutes = $("#admsharenoofminutes").val();
	var expiredate = 0;
	if(days.length > 0){
		if(days>0){
			// Show the date and time in expiredate
		expiredate = FormatDateToServer(addDays(new Date(), parseInt(days)), true);
		}else{
			// When day value is zero ,false the time value, not added in time, only show the date ,and share link will be expired
			expiredate = FormatDateToServer(addDays(new Date(), parseInt(days)), false);
		}
	} else if(minutes.length > 0){
		expiredate = addMinutes(new Date(), parseInt(minutes));
		expiredate.setMinutes(expiredate.getMinutes()-30);
		var time1 = expiredate.getHours() + ":" + expiredate.getMinutes();
		var dt = moment(expiredate).format('YYYY-MM-DD HH:MM');
		var time = dt.substring(dt.indexOf(" ")+1);
		dt = dt.substring(0, dt.indexOf(" "));
		time = time.toUpperCase();
		dt = moment(dt).format("YYYY-MM-DD");
		expiredate = dt + "T" + time1 + ":00Z";
	}

	var folderId = document.getElementById("sharemodal").getAttribute("data-folderid");
	var allowDownload = "Y";
	var allowPrint = "Y";
	var allowSign = 0;
	var watermark = 0;
	var allowUpload = 0;
	if($("#admsharereadonly").is(":checked")) {
		allowDownload = "N";
	}
	if($("#admshareallowprint").is(":checked") == false) {
		allowPrint = "N";
	}
	if($("#admsharewatermark").is(":checked") == true) {
		watermark = 1;
	}
	if($("#admshareallowupload").is(":checked") == true) {
		allowUpload = 1;
	}
	if($("#admallowsign").is(":checked") == true) {
		allowSign = 1;
	}

	var sm = {
		docId:[],
		emailidList:[],
		serverURL:cloudApiUrlACMS,
		subject:vSubject,
		message:vMessage,
		userName:localStorage._zk,
		expirationDate:expiredate,
		folderId:folderId,
		folderType:admcurrentfoldertype,
		allowDownload:allowDownload,
		allowPrint:allowPrint,
		addWaterMark:watermark,
		allowUpload:allowUpload,
		toSign:allowSign
	};

	var i = 0;
	while(i < 10000){
		if(document.getElementById("adm_doc_checkbox_"+i) != null){
			if($("#adm_doc_checkbox_"+i).is(":checked")){
				sm.docId.push(document.getElementById("adm_doc_checkbox_"+i).getAttribute("data-id"));
			}
		}
		i++;
	}

	if(sm.docId.length == 0){
		var fileid = document.getElementById("sharemodal").getAttribute("data-fileid");
		if(fileid > 0) {
			sm.docId.push(document.getElementById("sharemodal").getAttribute("data-fileid"));
		}
	}

	var mobilefound = true;
	var emailfound = false;
	if(vSubject.trim().length > 0 && (sm.docId.length > 0 || folderId != "0")){
		$(".adm_ld_user_name_Cls").each(function() {
			var id = $(this).attr("id");
			var emailid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_txt1_");
			if(!validateEmail($("#"+emailid).val())){
				admShowconfirmmsg(adm_messages.admvalidemail, confirm_Error, 5000, "", false, false);
				$("#"+emailid).focus();
				result = false;
			} else {
				emailfound = true;
				//check which of the security checked
				var mobilecheckedid = id.replace("amd_emaildetailsrow_", "adm_mobileemailselectmobile_");
				var emailcheckedid = id.replace("amd_emaildetailsrow_", "adm_mobileemailselectemail_");
				var mobiletxtid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_txt2_");
				var mobilewhatsapptxtid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_type2_");
				if($("#"+mobilecheckedid).is(':checked')){
					var mobileno = $("#"+mobiletxtid).val().trim();
					var code = $("#"+mobiletxtid).intlTelInput("getSelectedCountryData").dialCode;
					mobileno = "+" + code + mobileno;
					if(mobileno == ""){
						admShowconfirmmsg(adm_messages.admvalidmobile, confirm_Error, 5000, "", false, false);
						$("#"+mobiletxtid).focus();
						result = false;
						mobilefound = false;
					}
				}
				if(mobileno == undefined) mobileno = "";
				var isKeySMS = 0;
				var isKeyEmail = 0;
				if($("#"+mobilecheckedid).is(':checked')) {
					//isKeySMS = 1;
					if($("#"+mobilewhatsapptxtid).is(':checked')) {
						isKeySMS = 1;
					} else {
						isKeySMS = 2;
					}
				}
				if($("#"+emailcheckedid).is(':checked')) isKeyEmail = 1;

				sm.emailidList.push({"emailId":$("#"+emailid).val(), "phoneNumber":mobileno, "isKeySMS":isKeySMS, "isKeyEmail":isKeyEmail});
			}
		});

		if(!emailfound){
			admShowconfirmmsg(adm_messages.admvalidemail, confirm_Error, 5000, "", false, false);
			return false;
		} else if(!mobilefound){
			admShowconfirmmsg(adm_messages.admvalidmobile, confirm_Error, 5000, "", false, false);
			return false;
		} else {
			return sm;
		}
	} else if(vSubject.trim().length == 0) {
		admShowconfirmmsg(adm_messages.admentersubject, confirm_Error, 5000, "", false, false);
		return false;
	} else if(sm.docId.length == 0 && folderId == 0) {
		admShowconfirmmsg(adm_messages.admselectonedocument, confirm_Error, 5000, "", false, false);
		return false;
	}
}

/**
 * method to build json for share file list
 * @returns {___anonymous19567_19676}
 */
function admShareCopyLinkURLBuildJSON(){
	var days = $("#admsharenoofdays").val();
	if(days.includes("10 years")){
		days=(10*365).toString();
		}
	var minutes = $("#admsharenoofminutes").val();
	var expiredate = 0;
	if(days.length > 0){
		if(days>0){
			// Show the date and time in expiredate
			expiredate = FormatDateToServer(addDays(new Date(), parseInt(days)), true);
		}else{
			// When day value is zero ,false the time value, not added in time, only show the date ,and share link will be expired
			expiredate = FormatDateToServer(addDays(new Date(), parseInt(days)), false);
		}
	} else if(minutes.length > 0){
		expiredate = addMinutes(new Date(), parseInt(minutes));
		expiredate.setMinutes(expiredate.getMinutes()-30);
		var time1 = expiredate.getHours() + ":" + expiredate.getMinutes();
		var dt = moment(expiredate).format('YYYY-MM-DD HH:MM');
		var time = dt.substring(dt.indexOf(" ")+1);
		dt = dt.substring(0, dt.indexOf(" "));
		time = time.toUpperCase();
		dt = moment(dt).format("YYYY-MM-DD");
		expiredate = dt + "T" + time1 + ":00Z";
	}

	var folderId = document.getElementById("sharemodal").getAttribute("data-folderid");
	var allowDownload = "Y";
	var allowPrint = "Y";
	var allowSign = 0;
	var watermark = 0;
	var allowUpload = 0;
	if($("#admsharereadonly").is(":checked")) {
		allowDownload = "N";
	}
	if($("#admshareallowprint").is(":checked") == false) {
		allowPrint = "N";
	}
	if($("#admsharewatermark").is(":checked") == true) {
		watermark = 1;
	}
	if($("#admshareallowupload").is(":checked") == true) {
		allowUpload = 1;
	}
	if($("#admallowsign").is(":checked") == true) {
		allowSign = 1;
	}

	var sm = {
		docId:[],
		emailidList:[],
		serverURL:cloudApiUrlACMS,
		subject:"subject",
		message:"message",
		userName:localStorage._zk,
		expirationDate:expiredate,
		folderId:folderId,
		folderType:admcurrentfoldertype,
		allowDownload:allowDownload,
		allowPrint:allowPrint,
		addWaterMark:watermark,
		allowUpload:allowUpload,
		toSign:allowSign,
		copyLink:true
	};

	var i = 0;
	while(i < 10000){
		if(document.getElementById("adm_doc_checkbox_"+i) != null){
			if($("#adm_doc_checkbox_"+i).is(":checked")){
				sm.docId.push(document.getElementById("adm_doc_checkbox_"+i).getAttribute("data-id"));
			}
		}
		i++;
	}

	if(sm.docId.length == 0){
		var fileid = document.getElementById("sharemodal").getAttribute("data-fileid");
		if(fileid > 0) {
			sm.docId.push(document.getElementById("sharemodal").getAttribute("data-fileid"));
		}
	}

	sm.emailidList.push({"emailId":localStorage._zy, "phoneNumber":"", "isKeySMS":0, "isKeyEmail":0});
	return sm;
}

function admopenmobileemailshare(){
	//addsharemobileemailrow();
	if($("#adm_mobileemailpoplist").html().trim().length == 0){
		$("#adm_mobileemailpoplist").data('maxid',-1);
		//addsharemobileemailrow();
		addsharemobileemailrowexecute();
	}
	showActionPopup("shareemailmodal");
}

function addsharemobileemailrow(){
	var datapresent = $("#adm_mobileemailpoplist").html().trim().length;
	if(datapresent == 0){
		addsharemobileemailrowexecute();
	} else if(validateShareEmailMobile()){
		addsharemobileemailrowexecute();
	}
}

function addsharemobileemailrowexecute(){
	var datapresent = $("#adm_mobileemailpoplist").html().trim().length;
	var index = parseInt($("#adm_mobileemailpoplist").data('maxid'));

	var str = "<div class='row emailpopup adm_ld_user_name_Cls' id='amd_emaildetailsrow_"+index+"'>";
	str += "		<div class='col-md-3'>";
	str += "			<div class='form-group custom-mt-form-group' style='width:115%'>";
	str += "				<input type='email' id='adm_mobileemail_txt1_"+index+"' maxlength='50'/>";
	str += "				<label class='control-label'>Email id</label><i class='bar'></i>";
	str += "			</div>";
	str += "		</div>";
	str += "		<div class='col-md-3'>";
	str += "			<div class='form-group custom-mt-form-group' style='width:115%'>";
	str += "				<input type='number' id='adm_mobileemail_txt2_"+index+"' class='inputClass inputuser' maxlength='15' placeholder='Mobile' oninput='javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);'/>";
	str += "				<label class='switch_whatsapp' style='top:-50px;'><input type='checkbox' id='adm_mobileemail_type2_"+index+"'><div class='slider_whatsapp round_whatsapp'></div></label>";
	//str += "				</label>";
	str += "				<i class='bar' style='top:-33px;'></i>";
	str += "			</div>";
	str += "		</div>";
	str += "		<div class='col-md-6 chkaglin'>";
	str += "			<label class='contner' style='font-size:12px;margin-left:5px'>Mobile password";
	str += "				<input type='checkbox' id='adm_mobileemailselectmobile_"+index+"' style='font-size:13px;'>";
	str += "				<span class='checkmark'></span>";
	str += "			</label>";
	str += "			<label class='contner' style='font-size:12px;margin-left:5px'>Email password";
	str += "				<input type='checkbox' id='adm_mobileemailselectemail_"+index+"' style='font-size:13px;'>";
	str += "				<span class='checkmark'></span>";
	str += "			</label>";
	str += "			<label class='contner' style='font-size:12px;margin-left:5px'>No password";
	str += "				<input type='checkbox' checked='checked' id='adm_mobileemailselectno_"+index+"' style='font-size:13px;'>";
	str += "				<span class='checkmark'></span>";
	str += "			</label>";
	str += "			<img src='assets/img/Delete.png' alt='' style='float:right;cursor:pointer;' id='adm_mobiledelete_"+index+"'>";
	str += "		</div>";
	str += "</div>";

	if(datapresent == 0){
		$("#adm_mobileemailpoplist").html(str);
	} else {
		$("#adm_mobileemailpoplist").append(str);
	}

	var input = $("#adm_mobileemail_txt2_"+index);
	input.intlTelInput(	{
		separateDialCode: true
	});

	input.on("countrychange", function() {
		input.val('')
	});

	admAllowPhoneNumbersOnly("adm_mobileemail_txt2_"+index);
	$("#adm_mobileemailpoplist").data('maxid',(index+1));
	admShareMobileRowEvents(index);

	if(localStorage._zw != 3) {
		autocomplete(document.getElementById("adm_mobileemail_txt1_"+index), adm_emailIdArray);
	}
}

function admShareMobileDeleteRow(deleteiconid){
	var id1 = deleteiconid.replace("adm_mobiledelete_", "amd_emaildetailsrow_");
	$("#"+id1).html("");
	$("#"+id1).remove();

}

function validateShareEmailMobile(){
	var result = true;
	var emailpre = [];
	$(".adm_ld_user_name_Cls").each(function() {
	    var id = $(this).attr("id");
	    var emailid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_txt1_");
	    if($("#"+emailid).val().trim().length > 0){
			var mk = emailpre[$("#"+emailid).val().trim()]+"";
			if(mk != "undefined"){
				result = false;
				admShowconfirmmsg(adm_messages.admemailalreadyadded, confirm_Error, 5000, "", false, false);
			} else if(mk == "undefined"){
				emailpre[$("#"+emailid).val().trim()] = "";
			}
		}
	    if($("#"+emailid).val().trim().length == 0 || !validateEmail($("#"+emailid).val())){
	    	admShowconfirmmsg(adm_messages.admvalidemail, confirm_Error, 5000, "", false, false);
	    	$("#"+emailid).focus();
	    	result = false;
	    } else {
	    	//check which of the security checked
	    	var mobilecheckedid = id.replace("amd_emaildetailsrow_", "adm_mobileemailselectmobile_");
	    	var mobiletxtid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_txt2_");
	    	if($("#"+mobilecheckedid).is(':checked')){
	    		var mobileno = $("#"+mobiletxtid).val().trim();
	    		if(mobileno == ""){
	    			admShowconfirmmsg(adm_messages.admvalidmobile, confirm_Error, 5000, "", false, false);
	    			$("#"+mobiletxtid).focus();
	    			result = false;
	    		}
	    	}
	    }
	});
	emailpre = [];
	return result;
}

/**
 * method to un select all checkbox
 */
function admUnSelectAllCheckBox(){
	$("#admallcheckbox").prop('checked', false);
	$(".admcheckbox").prop('checked', false);
	admSetFolderHeaderCaption();
}

/**
 * method to process and display adm open share
 */
function admOpenInboundShare(){
	$("#adm_mobileemailpoplist").html("");
	addsharemobileemailrowexecute();
	$("#inbound_admsharefooter").show();
	$("#inbound_admsharesubject").val("");
	/*$('#inbound_admsharemessage').summernote({
			height: 200,
			minHeight: null,
			maxHeight: null,
			focus: false
		});

	$('.note-editor .note-editable').css("line-height", 1);*/
	$('#inbound_admsharemessage').val("");

	var str = adm_inboundshare_message.replace("<DOCSHAREUSERNAME>", localStorage._zk);
	//$('#inbound_admsharemessage').summernote('code', str);
	$('#inbound_admsharemessage').val(str);

	var d = document.getElementById("inbound_sharemodal").getAttribute("data-folderid");
	var t = document.getElementById("inbound_sharemodal").getAttribute("data-foldertype");
	var y = document.getElementById("inbound_sharemodal").getAttribute("data-folderpath");
	var folderName = y;
	if(folderName.indexOf("/") > 0){
		folderName = folderName.substring(folderName.lastIndexOf("/")+1);
	}
	if(t == admsharedtype) $("#inbound_share_selection").html("<h4>Data Room Selected</h4><p>"+folderName+"</p>");
	else if(t == admpersonaltype){
		if(localStorage._zs == "I") {
			$("#inbound_share_selection").html("<h4>Data Room Selected</h4><p>"+folderName+"</p>");
		}else{
			$("#inbound_share_selection").html("<h4>Personal Folder Selected</h4><p>"+folderName+"</p>");
		}
	}
	showActionPopup("inbound_sharemodal");
}

/**
 * method to prepare the inbound share login
 * @returns {___anonymous38106_38519}
 */
function admCreateJSONInboundShare(){
	//var vMessage = $('#inbound_admsharemessage').summernote('code');
	var vMessage = $('#inbound_admsharemessage').val();
	vMessage = vMessage.replace(/\n/, "<br/>")
	var vSubject = $("#inbound_admsharesubject").val();
	var sm = {
		"emailIds":[],
		"folderId": document.getElementById("inbound_sharemodal").getAttribute("data-folderid"),
		"serverURL": cloudApiUrlACMS,
		"message":vMessage,
		"subject":vSubject,
		"userName":localStorage._zk,
		"folderType":document.getElementById("inbound_sharemodal").getAttribute("data-foldertype")
	};

	var mobilefound = true;
	var emailfound = false;
	if(vSubject.trim().length > 0) {
		$(".adm_ld_user_name_Cls").each(function() {
			var id = $(this).attr("id");
			var emailid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_txt1_");
			if(!validateEmail($("#"+emailid).val())){
				admShowconfirmmsg(adm_messages.admvalidemail, confirm_Error, 5000, "", false, false);
				$("#"+emailid).focus();
				result = false;
			} else {
				emailfound = true;
				//check which of the security checked
				var mobilecheckedid = id.replace("amd_emaildetailsrow_", "adm_mobileemailselectmobile_");
				var emailcheckedid = id.replace("amd_emaildetailsrow_", "adm_mobileemailselectemail_");
				var mobiletxtid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_txt2_");
				var mobilewhatsapptxtid = id.replace("amd_emaildetailsrow_", "adm_mobileemail_type2_");
				if($("#"+mobilecheckedid).is(':checked')){
					var mobileno = $("#"+mobiletxtid).val().trim();
					var code = $("#"+mobiletxtid).intlTelInput("getSelectedCountryData").dialCode;
					mobileno = "+" + code + mobileno;
					if(mobileno == ""){
						//admShowconfirmmsg(adm_messages.admvalidmobile, confirm_Error, 5000, "", false, false);
						$("#"+mobiletxtid).focus();
						result = false;
						mobilefound = false;
					}
				}
				if(mobileno == undefined) mobileno = "";
				var isKeySMS = 0;
				var isKeyEmail = 0;
				if($("#"+mobilecheckedid).is(':checked')) {
					isKeySMS = 1;
					//isKeySMS = 1;
					if($("#"+mobilewhatsapptxtid).is(':checked')) {
						isKeySMS = 1;
					} else {
						isKeySMS = 2;
					}
				}
				if($("#"+emailcheckedid).is(':checked')) isKeyEmail = 1;

				sm.emailIds.push({"emailId":$("#"+emailid).val(), "phoneNumber":mobileno, "isKeySMS":isKeySMS, "isKeyEmail":isKeyEmail});
			}
		});
		if(!emailfound){
			admShowconfirmmsg(adm_messages.admvalidemail, confirm_Error, 5000, "", false, false);
			return false;
		} else if(!mobilefound){
			admShowconfirmmsg(adm_messages.admvalidmobile, confirm_Error, 5000, "", false, false);
			return false;
		} else {
			return sm;
		}
	} else {
		admShowconfirmmsg(adm_messages.admentersubject, confirm_Error, 5000, "", false, false);
		return false;
	}
}

function admInboundClose(){
	$("#inbound_sharemodal").removeAttr("data-folderid");
	$("#inbound_sharemodal").removeAttr("data-foldertype");
	$("#inbound_sharemodal").removeAttr("data-folderpath");
	$("#inbound_adm_mobileemailpoplist").html("");
	$("#adm_mobileemailpoplist").data('maxid',0);
	//$('#inbound_admsharemessage').summernote('destroy');
	$('#inbound_admsharemessage').val("");
	hideActionPopup("inbound_sharemodal");
}

function admShareClose(){
	$("#sharemodal").removeAttr("data-folderid");
	$("#sharemodal").removeAttr("data-foldertype");
	$("#sharemodal").removeAttr("data-folderpath");
	$("#adm_mobileemailpoplist").html("");
	$("#adm_mobileemailpoplist").data('maxid',0);
	//$('#admsharemessage').summernote('destroy');
	$('#admsharemessage').val("");
	hideActionPopup("sharemodal");
	admUnSelectAllCheckBox();
}

function admSelectOneEmailSecurity(index, id){
	$("#adm_mobileemailselectmobile_"+index).prop('checked', false);
	$("#adm_mobileemailselectemail_"+index).prop('checked', false);
	$("#adm_mobileemailselectno_"+index).prop('checked', false);
	$("#"+id).prop('checked', true);
}

/**
 * method to prepare json build input
 * @param folderType
 * @returns {___anonymous68589_68609}
 */
function admBuildDeleteDocsJSON(){
	var docids = "";
	var ids = "";
	var i = 0;
	var multifile = document.getElementById("deleteconfirmmodal").getAttribute("multifile")+"";
	if(multifile == "true"){
		var docids = "";
		var keys = Object.keys(temparrdel);
		for(var i=0;i<keys.length;i++){
			if(i==0) docids = keys[i];
			else docids = docids + "," + keys[i];
		}
		var jsonInput = {"attribute1":docids, "ids":temparrdel, "permdel":true, "attribute2":admcurrentfoldertype};
		temparrdel = [];
		return jsonInput;
	} else {
		var docids= "";
		var arr = [];
		var x = $('input.admcheckbox:checked');
		for(i=0;i<x.length;i++){
			var index = (x[i].id).replace("adm_doc_checkbox_", "");
			var dcid = document.getElementById(x[i].id).getAttribute("data-id");
			arr[dcid] = index;
			if(i==0) docids = dcid;
			else docids = docids + "," + dcid;
		}
		var jsonInput = {"attribute1":docids, "ids":arr, "attribute2":admcurrentfoldertype};
		return jsonInput;
	}
}

function admCheckIfOneDocumentSelected(){
	var totalfilesselected = $("input.admcheckbox:checked").length;
	if(totalfilesselected > 0){
		return true;
	} else {
		admShowconfirmmsg(adm_messages.admselectonedocument, confirm_Error, 5000, "", false, false);
		return false;
	}
}

function admCheckTrashDocSelected(){
	var ret = false;
	$('input.admcheckbox:checked').each(function(i, obj) {
		var status = document.getElementById(this.id).getAttribute("data-status");
		if(status == "D"){
			ret = true;
		}
	});
	return ret;
}

function admClearSearchFieldsNew(){
	$("#searchfname").val("");
	$("#searchtag").val("");
	$("#searchfiletype").val("");
	$("#dateform").val("");
	$("#dateto").val("");
	$("#sizefrom").val("");
	$("#searchfilefromsize").val("");
	$("#sizeto").val("");
	$("#searchfiletosize").val("");
	adm_search_progress = false;
	adm_documentmaxlimit = 0;
	$("#admflagcheckbox").prop("checked", false);
	$("#admflaggedcheckbox").prop("checked", false);
	$("#admlockcheckbox").prop("checked", false);
	$("#admunlockcheckbox").prop("checked", false);
	$("#admmarkcheckbox").prop("checked", false);
	$("#admmarkedcheckbox").prop("checked", false);

	$("#searchfname").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#searchtag");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});


	$("#searchtag").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#searchfiletype");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});

	$("#searchfiletype").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#dateform");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});

	$("#dateform").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#dateto");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});

	$("#dateto").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#searchfilefromsize");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});

	// $("#sizefrom").keyup(function (event) {
	//     if (event.keyCode == 13) {
	//         textboxes = $("#searchfilefromsize");
	//         currentBoxNumber = textboxes.index(this);
	//         if (textboxes[currentBoxNumber + 1] != null) {
	//             nextBox = textboxes[currentBoxNumber + 1];
	//             nextBox.focus();
	//             nextBox.select();
	//         }
	//         event.preventDefault();
	//         return false;
	//     }
	// });

	$("#searchfilefromsize").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#searchfiletosize");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});

	// $("#sizeto").keyup(function (event) {
	//     if (event.keyCode == 13) {
	//         textboxes = $("#searchfiletosize");
	//         currentBoxNumber = textboxes.index(this);
	//         if (textboxes[currentBoxNumber + 1] != null) {
	//             nextBox = textboxes[currentBoxNumber + 1];
	//             nextBox.focus();
	//             nextBox.select();
	//         }
	//         event.preventDefault();
	//         return false;
	//     }
	// });


	// $("#sizeto").keyup(function (event) {
	//     if (event.keyCode == 13) {
	//         textboxes = $("#searchfiletosize");
	//         currentBoxNumber = textboxes.index(this);
	//         if (textboxes[currentBoxNumber + 1] != null) {
	//             nextBox = textboxes[currentBoxNumber + 1];
	//             nextBox.focus();
	//             nextBox.select();
	//         }
	//         event.preventDefault();
	//         return false;
	//     }
	// });


	$("#searchfiletosize").keyup(function (event) {
	    if (event.keyCode == 13) {
	        textboxes = $("#searchdone");
	        currentBoxNumber = textboxes.index(this);
	        if (textboxes[currentBoxNumber + 1] != null) {
	            nextBox = textboxes[currentBoxNumber + 1];
	            nextBox.focus();
	            nextBox.select();
	        }
	        event.preventDefault();
	        return false;
	    }
	});
}

function admSetSearchHeader(){
	if(adm_search_progress){
		var totalfilesselected = $("input.admcheckbox:checked").length;
		if(totalfilesselected == 1) $("#admtotalfilesheader").html(totalfilesselected+ " selected file");
		else if(totalfilesselected > 1) $("#admtotalfilesheader").html(totalfilesselected+ " selected files");
		else $("#admtotalfilesheader").html(admtotaldocs+ " files");

		$("#ul_more").show();
		$("#admallcheckboxlabel").show();
	}
}

function admCopyCommonAction(obj){
	admCopyParentId = 0;
	var index = (obj.id).replace("admdocrowiconsedit_", "");
	var fileid = document.getElementById(obj.id).getAttribute("data-id");
	$("#copymodal").attr("data-id", fileid);
	$("#tblfolderrows").html("");
	admSetCopyFolderHeaderCaption("");
	admCopyFolderType = admpersonaltype;
	if(localStorage._zs == "I") {
		$("#acopypersonal").addClass("activetab").html("Data Room");
		$("#acopypersonal").css("border-top-right-radius", "16px", "border-bottom-right-radius", "16px", "text-align", "center");
		$("#acopydataroom").removeClass("activetab");
		$("#acopydataroom").hide();
	}else{
		$("#acopypersonal").addClass("activetab").html("Personal Folder");
		$("#acopydataroom").removeClass("activetab");
	}
	admFetchFoldersByParentId("admCopyFolderPopulate");
	showActionPopup("copymodal");
}

/**
 * method to prepare the json for
 */
function admCopyMoveDocListJSON(copyFolderType, action, overwrite){
	var docListCopy = {"docIds":[], "targetSharedFolderPath":[], "targetPersonalFolderPath":[], "action":action, "overWrite":overwrite, "sourceFolderId" : admcurrentfolderid};
	var docids = (document.getElementById("copymodal").getAttribute("data-id")).split(",");
	for(var i=0;i<docids.length;i++){
		docListCopy.docIds.push(docids[i]);
	}

	if(copyFolderType == admsharedtype){
		docListCopy.targetSharedFolderPath.push(admCopyParentId);
	} else if(copyFolderType == admpersonaltype){
		docListCopy.targetPersonalFolderPath.push(admCopyParentId);
	}

	if(admCopyParentId > 0){
		if(admCopyParentId != admcurrentfolderid){
			admUnSelectAllCheckBox();
			if(action == "move") {
				if(docListCopy.docIds.length > 1){
					admShowconfirmmsg(adm_messages.admmovestarted, confirm_Info, -1, "", false, false);
				} else if(docListCopy.docIds.length == 1){
					admShowconfirmmsg(adm_messages.admmovestartedsingle, confirm_Info, -1, "", false, false);
				}
			} else if(action == "copy") {
				if(docListCopy.docIds.length > 1){
					admShowconfirmmsg(adm_messages.admcopystarted, confirm_Info, -1, "", false, false);
				} else if(docListCopy.docIds.length == 1){
					admShowconfirmmsg(adm_messages.admcopystartedsingle, confirm_Info, -1, "", false, false);
				}
			}
			return docListCopy;
		} else {
			admShowconfirmmsg(adm_messages.sourcetargetfoldersamecopy, confirm_Error, -1, "", false, false);
			return null;
		}
	} else {
		admShowconfirmmsg(adm_messages.admselectonefolder, confirm_Error, -1, "", false, false);
		return null;
	}
}

/**
 * method to get the user
 * @param id
 */
function admOpenShareSecurity(id){
	var folderId = document.getElementById(id).getAttribute("data-id");
	$("#sharesecuritymodal").attr("data-folderid", folderId);
	admFetchFolderSharedSecurityService(folderId, true);
}

/**
 * method to create json to add shared folder security
 */
function admSaveSharedFolderSecurity(){
	var folderId = document.getElementById("sharesecuritymodal").getAttribute("data-folderid");
	var jsoninput = {"sharedSecurityList":[]};
	for(var idm=0;idm<sharedsecuritylen;idm++){
		var dataid = document.getElementById("adm_security_row_"+idm).getAttribute("data-pid")+"";
		var userid = document.getElementById("adm_security_row_"+idm).getAttribute("data-userid");

		//var maincheckbox = $("#adm_security_checkbox_"+idm).is(':checked') ;
		var viewcheckbox = $("#adm_sec_checkbox_view_"+idm).is(':checked') ;
		var downloadcheckbox = $("#adm_sec_checkbox_download_"+idm).is(':checked') ;
		var outsharecheckbox = $("#adm_sec_checkbox_share_"+idm).is(':checked') ;
		var insharecheckbox = $("#adm_sec_checkbox_deposit_"+idm).is(':checked') ;
		var deletecheckbox = $("#adm_sec_checkbox_delete_"+idm).is(':checked') ;
		var copycheckbox = $("#adm_sec_checkbox_copy_"+idm).is(':checked') ;
		var movecheckbox = $("#adm_sec_checkbox_move_"+idm).is(':checked') ;

		var status = "A";
		var download = "Y";
		var outboundShare = "Y";
		var inboundShare = "Y";
		var deletem = "Y";
		var copy = "Y";
		var move = "Y";
		var childInherit = false;
		if(!downloadcheckbox){
			download = "N";
		}
		if(!outsharecheckbox){
			outboundShare = "N";
		}
		if(!insharecheckbox){
			inboundShare = "N";
		}
		if(!deletecheckbox){
			deletem = "N";
		}
		if(!copycheckbox){
			copy = "N";
		}
		if(!movecheckbox){
			move = "N";
		}
		if(!viewcheckbox){
			status = "I";
		}

		if($("#adm_checkboxsharesecchild").is(":checked")){
			childInherit = true;
		}

		/*if(downloadcheckbox || outsharecheckbox || insharecheckbox || deletecheckbox || copycheckbox || movecheckbox){
			maincheckbox = true;
		} else if(!downloadcheckbox && !outsharecheckbox && !insharecheckbox && !deletecheckbox && !copycheckbox && !movecheckbox){
			maincheckbox = false;
		}*/

		var sm = {"id": 0, "folderId":folderId, "status":status, "userId":userid, "download":download, "outboundShare":outboundShare,
			"inboundShare":inboundShare, "delete":deletem, "copy":copy, "move":move, "childInherit":childInherit};
		/*if(!viewcheckbox){
			sm = {"id": 0, "folderId":folderId, "status":"I", "userId":userid, "download":"N", "outboundShare":"N", "inboundShare":"N", "delete":"N", "copy":"N", "copy":"N"};
		}*/
		jsoninput.sharedSecurityList.push(sm);
	}

	admSaveSharedFolderSecurityService(jsoninput);
}

function admOpenShareMgmt(){
	$("#adm_sharemgmt_share").addClass("activetab");
	$("#adm_sharemgmt_deposit").removeClass("activetab");
	$("#tblsharemgmtrows").empty();
	$("#tblinboundrows").empty();
	$("#inboundsharemgmt").hide();
	$("#outboundsharemgmt").show();
	admsharemgmtopened = true;
	admsharemgmtmaxlimit = 0;
	admShareMgmtOutboundListService();
}

function admCheckTagExists(tagname){
	var exists = false;
	var i = 0;
	while(i<100){
		if(document.getElementById("admtagtext_"+i) != null){
			var tagtext = $("#admtagtext_"+i).html();
			if(tagtext.toLowerCase() == tagname){
				exists = true;
			}
		}
		i++;
	}
	if(exists){
		admShowconfirmmsg(adm_messages.admtagnameexists, confirm_Error, 5000, "", false, false);
	}
	return exists;
}

function admSpaceAllocatedOverMessage(){
	var msg = adm_messages.allocatedspaceover.replace("<&ALLOCATEDSPACE;>", bytesToSize(allocatedStorage));
	admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
}

function admUploadExceedsAllocatedSpace(CURUPLOADSPACE){
	var msg = adm_messages.uploadexceedssizeleft.replace("<&LEFTSPACE;>", bytesToSize(sizeLeft));
	msg = msg.replace("<&CURUPLOADSPACE;>", bytesToSize(CURUPLOADSPACE));
	admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
}

function admUploadFileFail(){
	var msg = adm_messages.fileuploadingfail;
	admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
}

function admUploadFileDomException(){
	var msg = adm_messages.folderuploaddomexception;
	admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
}

function admdownloadFolderQueue(){
	if(!downloadrunning){
		if(downloadfolderarr.length > 0){
			$("#downloadingperc").show();
			var fd = (downloadfolderarr.shift()).split("#");
			admDownloadFolderService(fd[0], fd[1], fd[2], fd[3]);
			//admFetchFolderSizeService(fd[0], fd[1], fd[2]);
			downloadrunning = true;
		}
	}
}

function admAddFolderDownloadDetails(fddetails){
	var fd = fddetails.split("#");
	var datahtml = "";
	var fdnm = fd[1];
	var actfdnm = fdnm;
	var fdid = fd[0];
	var fdsize = fd[3];
	var index = fdid;
	var idm = fd[2];
	var org = fd[4];
	if(actfdnm.length > 18){
		fdnm = actfdnm.substring(0, 16) + "...";
	}

	var datavar = " data-id='"+fdid+"' data-name=\""+actfdnm+"\" data-rn='"+idm+"' dtid='' data-org='"+org+"'";
	if(($("#tbldownloaddetails").html()).length > 0) datahtml += "<hr id='hr_download_"+index+"'>";
	datahtml += "<div class='row new-row' id='adm_download_row_"+index+"' "+datavar+" style='padding-top:10px;'>";
	//datahtml += "	<div class='col-md-2 up downloadstatus' id='downloadingstatus_"+index+"'>"+dowload_status_queued+"</div>";
	datahtml += "	<div class='col-md-4 up' title=\""+actfdnm+"\">"+fdnm+"</div>";
	datahtml += "	<div class='col-md-4 up' id='downloadingsize_"+index+"'>"+fdsize+"</div>";
	datahtml += "	<div class='col-md-2 up downloadstatus' id='downloadingperc_"+index+"' style='padding-left:31px;' "+datavar+">&nbsp;</div>";
	datahtml += "	<div class='col-md-2 up' style='padding-left:31px;'>&nbsp;<span id='downloadclose_"+index+"' "+datavar+"><i class='fa fa-times' aria-hidden='true'></i><span></div>";
	datahtml += "</div>";
	$("#tbldownloaddetails").append(datahtml);
	admDownloadDetailsRemoveRow(index);
	dowloadfolderidsui[fdid] = "";
}

function admHideFileDownloadProgress(indexes, show){
	var k = indexes.split(",");
	for(var i=0;i<k.length;i++){
		$("#adm_filenm_download_progress_"+k[i]).css("display", show);
		$("#adm_filenm_progress_img_"+k[i]).css("display", show);
		if(show == "") $("#admdownloadfile_"+k[i]).css("display", "none");
		else if(show == "none") $("#admdownloadfile_"+k[i]).css("display", "");
		if(show == "none"){
			delete currentdownloadfiles[k[i]];
		} else {
			currentdownloadfiles[k[i]] = "";
		}
	}
}

/**
* method to remove download row
* @param : idm->folderId
*/
function admremovdownloadrow(idm){
	var datarn = $("#downloadclose_"+idm).attr("data-rn");
	var fdid = $("#downloadclose_"+idm).attr("data-id");
	var fdname = $("#downloadclose_"+idm).attr("data-name");
	var org = $("#downloadclose_"+idm).attr("data-org");
	var parentFolderId = $("#adm_download_folder_"+datarn).attr("parentid");
	if(admcurrentfolderid == parentFolderId){
		$("#adm_download_folder_"+datarn).show();
		if(org) $("#adm_download_org_"+datarn).show();
		$("#adm_download_folder_progress_img_"+datarn).hide();
		$("#adm_download_folder_progress_"+datarn).hide();
	}
	$("#adm_download_row_"+idm).remove();
	$("#hr_download_"+idm).remove();
	var indx = $.inArray(fdid+"#"+fdname+"#"+datarn, downloadfolderarr);
	if(indx > -1) downloadfolderarr.splice(indx, 1);
	delete currentdownloadfolders[idm];
	delete dowloadfolderidsui[idm];
	admdownloadFolderQueue();
}

function admCheckQueryParam(){
	var urlk = window.location.href.split("?");
	if(urlk.length > 1 && urlk[1].indexOf("a=view")){
		var arr = urlk[1].split("&");
		if(arr.length == 3){
			if(arr[1] == "folder"){
				admcurrentfoldertype = arr[2];
				admcurrentfolderid = arr[3];
			}
		}
	}
}

function admgetDocidsDownload(){
	var x = $('input.admcheckbox:checked');
	var dcids = "";
	var indexids = "";
	for(i=0;i<x.length;i++){
		if($(x[i]).is(':checked')){
			var index = (x[i].id).replace("adm_doc_checkbox_", "");
			var dcid = document.getElementById(x[i].id).getAttribute("data-id");
			if(i==0) dcids = dcid;
			else dcids = dcids + "," + dcid;
		}
	}
	return dcids;
}

function admStartDefaultDownload(docId, downloadorg){
	var jsonInput = {
		attribute1:docId,
		attribute2:1,
		attribute3:1,
		attribute4:0,
		boolAttribute1:downloadorg
	};
	admDownloadZipFile(jsonInput);
	var dsfid=(jsonInput.attribute1).split(",");
		if(dsfid.length==1){
		admShowconfirmmsg(adm_messages.admdownloadstartedSingleFile, confirm_Success, 5000, "", false, false);
		}else{
		admShowconfirmmsg(adm_messages.admdownloadstartedzip, confirm_Success, 5000, "", false, false);
		}
}

function admUploadEmptyFolders(showmessage){
	var restrictfolderpresent = false;
	var restrictfoldername = "";
	var j = 0;
	try{
		var sm = {"listAttribute5":[],"attribute1":""};
		var fdt = admcurrentfoldertype;
		sm.attribute1 = fdt;
		var jsonInput = {"listAttribute1":[],"attribute1":fdt,"attribute2":admListFolderIndexIdMain[admcurrentpath]};

  		for (var fdnm in emptyFolderEntrries) {
			if(fdnm.charAt(0) == "/"){
				fdnm = fdnm.substring(1);
			}
			if(fdnm.length > 0){
				var match = admCheckFolderNameFormat(fdnm, "/");
				if(!(fdnm in adm_folderPathList_upload) && match) {
					adm_folderPathList_upload[fdnm] = "";
					var stk = fdnm;
					if(jsonInput.listAttribute1.length==0) stk += "#" + admcurrentfolderid;
					else stk += "#0";
					jsonInput.listAttribute1.push(stk);
				}
				if (!match) {
					restrictfolderpresent = true;
					if (restrictfoldername.length == 0) {
						restrictfoldername = fdnm;
					} else {
						j++;
					}
				}
			}
		 }
	}catch(error){}
	emptyFolderEntrries = [];
	if ((jsonInput.listAttribute1.length == 0 || restrictfolderpresent == true) && fileuploadspecialchrfound == true) {
		var art = restrictfoldername.split("/");
		for(var k = 0; k < art.length; k++){
			var match = admCheckFolderNameFormat(art[k], "/");
			if(!match){
				restrictfoldername = art[k];
				break;
			}
		}
		if(j > 0 ){
			restrictfoldername += " and more folders";
		}
		var msg = adm_messages.folderuploadnotallow.replace("<restrictfoldername>",restrictfoldername);
		admShowconfirmmsg(msg, confirm_Error, 5000, "", false, false);
		console.log("cancelled called # found in _onDrop...");
		adm_FolderId_FileName = [];
	} else if (jsonInput.listAttribute1.length > 0 && restrictfolderpresent == false && fileuploadspecialchrfound == false) {
		var url = cloudApiUrlACMS + admFolderCreateNestedURL;
		jsonInput = JSON.stringify(jsonInput);
		$.ajax({
			url:url,
			type:"POST",
			contentType:"application/json",
			dataType:"json",
			data:jsonInput,
			beforeSend: function (xhr){
				xhr.setRequestHeader("Authorization", "Bearer " + getauthtokenfromlocal());
			},
			success:function(result) {
				if(result.error == true){
					console.log("2222222222222222");
				} else {
					if(showmessage) {
						var nm = result.objectD;
						for(i=0;i<nm.length;i++){
							var arr = nm[i].split("#");
							if(i==0 && arr[5].indexOf("NOTEXISTS")==0){
								parent.root_access_folder_notexists="NOTEXISTS"+arr[6];
							}
							parent.adm_folderPathList_upload[arr[0]] = arr[1];
							delete parent.emptyFolderEntrries[arr[0]];
						}

						var ldefaultmsgfileupload = adm_messages.filesuploadedprocess;
						if(localStorage._zp == "1" && admcurrentpath == ""){
							if(localStorage._zs == "B"){
								if(root_access_folder_notexists == "NOTEXISTS1"){
									ldefaultmsgfileupload = adm_messages.filesuploadedprocessvisibletoalladmins;
								}else if(root_access_folder_notexists == "NOTEXISTS0"){
									ldefaultmsgfileupload = adm_messages.filesuploadedprocessnotvisibletoothers;
								}
							}//if uploading folder in root for the second time and individual user as well
							admShowconfirmmsg(ldefaultmsgfileupload, confirm_Info, 5000, "", false, false);
						}else{
							admShowconfirmmsg(ldefaultmsgfileupload, confirm_Info, 5000, "", false, false);
						}
						root_access_folder_notexists = "";
						admRefreshFunction();
					}
				}
				ajaxindicatorstop();
			},
			error:function(result) {
				console.log("111111111111111111");
				ajaxindicatorstop();
			}
		});
	} else {
		ajaxindicatorstop();
	}
	fileuploadspecialchrfound = false;
}

function checkButtonPermission(permValue, position){
    var allowed = false;
    var permissions = permValue.split("#");
    if(localStorage._zs == "B"){
        if((permissions == "null") || (permissions == "undefined")
            ||(admcurrentfoldertype == admpersonaltype)){
                allowed = true;
        }else if(admcurrentfoldertype == admsharedtype){
            if(permissions[position] == "Y"){
                allowed = true;
            }
        }
    }else if(localStorage._zs == "I"){
    	allowed = true;
    }
    return allowed;
}

function setVisibility(boolval, id){
	if(boolval){
		$("#"+id).show();
	}else{
		$("#"+id).hide();
	}
}

function admShowHideMoreMenu(){
	var v = admSharedFoldersPermission[admcurrentfolderid]+"";
	var allowdnorg = checkButtonPermission(v,6);
	var allowdn = checkButtonPermission(v,0);;
	var allowshare = checkButtonPermission(v,1);
	var allowdelete = checkButtonPermission(v,3);
	var allowcopy = checkButtonPermission(v,4);
	var allowmove = checkButtonPermission(v,5);

	if(localStorage._zs == "I"){
		setVisibility(false, "adm_download_file_org");
	}else{
		setVisibility(allowdnorg, "adm_download_file_org");
	}
	setVisibility(allowdn, "adm_download_file");
	setVisibility(allowshare, "adm_share_file");
	setVisibility(allowdelete, "adm_delete_file");
	setVisibility(allowdelete, "adm_deletepermanent_file");
	setVisibility(allowcopy, "adm_copy_file");
	setVisibility(allowmove, "adm_move_file");

}

function admLoopFoldeListZeroLevel(folderls, copy){
	admids = 1;
	if(admcurrentfoldertype == admpersonaltype) {
		admPersoanlFoldersList = [];
		admPersoanlFoldersFileCount = [];
		if(folderls.length>0) $("#"+admpersonalfilesul_+admpersonaltype+"1_0xxx").remove();
	} else if(admcurrentfoldertype == admsharedtype) {
		admSharedFoldersList = [];
		if(folderls.length>0) $("#"+admpersonalfilesul_+admsharedtype+"1_0xxx").remove();
		admSharedFoldersFileCount = [];
	}

	adm_folder_list = folderls;
	adm_folder_list = admListSortSort(adm_folder_list, "folder");
	for(var i=0;i<=adm_folder_list.length-1;i++){
		tempJSON = {};
		tempJSONPermission = {};
		var fpath = adm_folder_list[i].folderPath;
		folderparnetid = adm_folder_list[i].parentFolderId;
		admListFolderIndexIdMain[fpath] = adm_folder_list[i].folderIndex;
		admFolderSize[fpath] = adm_folder_list[i].folderSize;
		var modifiedddt = handleNullValue(adm_folder_list[i].fileModifiedDate);
		modifiedddt = getdatefromtimestamp(modifiedddt, true, "EN-US");
		admFolderDate[fpath] = modifiedddt;
		admfolderstatus[adm_folder_list[i].folderId] = adm_folder_list[i].status;

		var nooffilesinfo = adm_folder_list[i].folderId + "#" + adm_folder_list[i].noOfFiles + "#" + adm_folder_list[i].status;
		tempJSON[fpath] = nooffilesinfo;
		if(admcurrentfoldertype == admpersonaltype) {
			admPersoanlFoldersList.push(adm_folder_list[i].folderPath);
			admPersoanlFoldersFileCount.push(tempJSON);
		} else if(admcurrentfoldertype == admsharedtype) {
			admSharedFoldersList.push(adm_folder_list[i].folderPath);
			admSharedFoldersFileCount.push(tempJSON);
			admSharedFoldersPermission[adm_folder_list[i].folderId] = adm_folder_list[i].folderPermissions;
		}
	}

	if(!copy){
		if(admcurrentfoldertype == admpersonaltype ) {
			admLoopFolderList(folderparnetid, admcurrentfoldertype);
		} else if(admcurrentfoldertype == admsharedtype) {
			admLoopFolderList(folderparnetid, admcurrentfoldertype);
		}
	}
}

function admCommonLoopFolderList(folderls, folderfetch){
	try{
		if(folderls != null && folderfetch == true){
			var folderType = admcurrentfoldertype;
			var parentid = admcurrentfolderid;
			var datafolder = folderls;

			datafolder = admListSortSort(datafolder, "folder");
			adm_folder_list = datafolder;
			for(var i=0;i<datafolder.length;i++){
				var folderPath = datafolder[i].folderPath;
				var foldername = folderPath;
				var folderSize = datafolder[i].folderSize;
				admListFolderIndexIdMain[folderPath] = datafolder[i].folderIndex;

				admFolderSize[folderPath] = datafolder[i].folderSize;
				var modifiedddt = handleNullValue(datafolder[i].fileModifiedDate);
				modifiedddt = getdatefromtimestamp(modifiedddt, true, "EN-US");
				admFolderDate[folderPath] = modifiedddt;
				admfolderstatus[datafolder[i].folderId] = datafolder[i].status;

				if(folderPath.indexOf("/") > 0) foldername = folderPath.substring(folderPath.lastIndexOf("/")+1);
				admLoopFolderListAddMore(parentid, foldername, folderPath, folderType, datafolder[i].folderId, datafolder[i].noOfFiles, datafolder[i].folderPermissions, datafolder[i].status, i);
			}
			if(fetchtreeindex){
				var dtobj = {error:false, object:folderls};
				admFolderListAllServiceAfter(dtobj);
			}
			if(admsetfolderpathnow){
				admFolderTreeLoaded = false;
				admTreeFolderSelectedId = 0;
				selectednodeid = -1;
				admSelectedFolderListAllService();
				showheaderbefore = false;
			}
			fetchtreeindex = true;
		}
	}catch(error){
		console.log(error);
	}
}

function admLoopFileListCommon(docList, index, indivisualrow){
	var datahtml = "";
	var createddt = getlocaltimestampfromutcdata(handleNullValue(docList.fileCreatedDate));
	createddt = getdatefromtimestamp(createddt, false, "EN-US");
	var modifiedddt = handleNullValue(docList.fileModifiedDate);
	modifiedddt = getdatefromtimestamp(modifiedddt, true, "EN-US");
	var filename = docList.fileName+"";
	if(filename.indexOf(".") == 0) filename = filename.substring(1);
	//else if(filename.indexOf(".") >= 0) filename = filename.substring(0, filename.lastIndexOf("."));

	var fileIndex = docList.fileIndex;
	if(fileIndex != null && fileIndex != undefined && fileIndex.length > 0){
		fileIndex = fileIndex + "-";
	} else {
		fileIndex = "";
	}

	var filetype = docList.fileType;
	var size = parseInt(docList.fileSize);
	var showviewer = checkViewerExtention(filetype, size);
	var sign = parseInt(docList.toSign);
	var isLocked = parseInt(docList.isLocked);
	var lockedBy = docList.lockedBy;
	size = formatBytesDecimal(size);

	var tag = "View Tags...";
	var flag = docList.flagImp + "";
	var status = docList.status + "";

	var archived = false;
	if(admFolderArchived(admcurrentfolderstatus) || admFolderArchived(status) || admFolderRestoreInit(admcurrentfolderstatus) || admFolderRestoreInit(status)){
		archived = true;
	}

	var stylefontfile = "";
	if(status == "D"){
		stylefontfile = "color:#B74A4A;";
	} else if(archived){
		stylefontfile = "color:#7e7878;";
	}

	var filetitle = encondeSplCharToHtml(filename);
	if(adm_search_progress == true){
		filetitle = docList.folderPath;
	}

	var rowLocked = 1;
	if(isLocked == 0 || (isLocked == 1 && lockedBy == localStorage._zv)){
		rowLocked = 0;
	}
	var datavar = "data-id='"+docList.id+"' data-folderid='"+docList.folderId+"' data-status='"+status+"' ";
	datavar += "data-isfolder='false' data-foldertype='"+admcurrentfoldertype+"' data-size='"+docList.fileSize+"' ";
	datavar += "data-filetype='"+filetype+"' data-filename=\""+encondeSplCharToHtml(docList.fileName)+"\" data-locked='"+rowLocked+"'";

	var fileURL = "javascript:void(0);";
	if(status != "D" && !archived) {
		fileURL = cloudURLProtocol+cloudURLACTDomain+"/appnew/drive.html?a=view&b=file&c="+admcurrentfoldertype+"&d="+docList.id+"&e="+localStorage._zw;
	}
	if(admcurrentfoldertype == admpersonaltype) admHighlightPersonalFolder();
	else admHighlightDataroom();

	var allowdnorg = true;
	var allowdn = true;
	var allowshare = true;
	var allowupload = true;
	var allowdelete = true;
	var allowcopy = true;
	var allowmove = true;
	var v = docList.folderPermissions;
	if(v != null && v.length > 0){
		v = v.substring(2);
		v = v.replace(/,/g, "#")
		allowdnorg = false;
		if(localStorage._zs == "I"){
			allowdnorg = false;
		}else{
			allowdnorg = checkButtonPermission(v, 6);
		}
		allowdn = checkButtonPermission(v, 5);
		allowshare = checkButtonPermission(v, 0);
		allowupload = checkButtonPermission(v, 1);
		allowdelete = checkButtonPermission(v, 2);
		allowcopy = checkButtonPermission(v, 3);
		allowmove = checkButtonPermission(v, 4);
	} else {
		v = admSharedFoldersPermission[docList.folderId]+"";
		allowdnorg = false;
		if(localStorage._zs == "I"){
			allowdnorg = false;
		}else{
			allowdnorg = checkButtonPermission(v, 6);
		}
		allowdn = checkButtonPermission(v, 0);
		allowshare = checkButtonPermission(v, 1);
		allowupload = checkButtonPermission(v, 2);
		allowdelete = checkButtonPermission(v, 3);
		allowcopy = checkButtonPermission(v, 4);
		allowmove = checkButtonPermission(v, 5);
	}

	var filenameact = filename;
 	var lfileName = filename.substring(0, filename.lastIndexOf("."));
	var lfileType = filename.substring(filename.lastIndexOf(".")+1);
	var totalLength = 30;

	if((fileIndex+filename).length >= totalLength){
		var charRemaining = totalLength - fileIndex.length;
		var lfileTypelength = lfileType.length;
		var lfileNamelength = lfileName.length;
		var fixedLength = "...".length;
		if(lfileTypelength < (charRemaining - fixedLength)){
			var leftCharRemaing = charRemaining - lfileTypelength;
			var displayfilechar = leftCharRemaing - fixedLength;
			filenameact = fileIndex + lfileName.substring(0,displayfilechar)+"..."+lfileType;
		}else{
			if(lfileNamelength <  (charRemaining - fixedLength)){
				var leftCharRemaing = charRemaining - lfileNamelength;
				var displayTypeChar = leftCharRemaing - fixedLength;

				filenameact = fileIndex + lfileName+"."+lfileType.substring(0,displayTypeChar)+"...";
			}
			else{
				var displayFileTypeLength = 10;
				var disFileNameLength = charRemaining  - (displayFileTypeLength + fixedLength);

				filenameact = fileIndex + lfileName.substring(0,disFileNameLength-fixedLength)+"..."+lfileType.substring(0,displayFileTypeLength)+"...";
			}
		}
	}else{
		filenameact = fileIndex + filenameact;
	}
	if(!indivisualrow){
		if(($("#tbldatarows").html()).length > 0) datahtml += "<hr id='hr_doc_"+index+"' class='filesonlyrow_hr' style='margin-top:0px;margin-bottom:0px;'>";
		//datahtml += "<div class='row new-row' id='adm_doc_row_"+index+"' "+datavar+" style='margin-bottom:7px;'>";
		datahtml += "<div class='row new-row filesonlyrow' id='adm_doc_row_"+index+"' "+datavar+">";
	}
	datahtml += "<div class='col-md-4 up' "+datavar+" style='cursor:pointer;' id='adm_doc_name_"+index+"' title=\""+filetitle+"\">";
	/*datahtml += "<label class='contner'>";
	if($("#admallcheckbox").is(":checked")){
		datahtml += "<input type='checkbox' id='adm_doc_checkbox_"+index+"' class='admcheckbox' "+datavar+" checked='true'>";
	} else {
		datahtml += "<input type='checkbox' id='adm_doc_checkbox_"+index+"' class='admcheckbox' "+datavar+">";
	}
	datahtml += "<span class='checkmark'></span>";
	datahtml += "</label>";*/
	datahtml += "<img class='respons' src='"+checkFileExtention(filetype)+"' alt=''>";
	datahtml += "<h2><a href='"+fileURL+"' style='height:18px;font-size:14px;font-weight:400;line-height:20px;' class='noclick'>";
	datahtml += "<span id='adm_filenm_"+index+"' style='"+stylefontfile+"' "+datavar+">"+filenameact+"</span>";
	datahtml += "<img src='assets/img/dcirrus_spin.gif?v=3' width='30px' height='30px' id='adm_filenm_progress_"+index+"' style='display:none;margin-top:10px;' class='fileviewprogressbar'/>";
	datahtml += "<br><span style='font-size:14px;'>";
	/*if(flag == "1"){
		datahtml += "<span style='cursor:pointer;' id='admfileflagname_"+index+"' "+datavar+">Flagged</span>";
	} else {
		datahtml += "<span style='cursor:pointer;' class='flagcommon' id='admfileflagname_"+index+"' "+datavar+">Flag</span>";
	}*/

	if(currentdownloadfiles[docList.id] != null && currentdownloadfiles[docList.id] != undefined) {
		datahtml += "<span style='display:;cursor:pointer;color:#ffba02;' id='adm_filenm_download_progress_"+docList.id+"'>&nbsp;|&nbsp;Downloading File...</span>";
	} else {
		datahtml += "<span style='display:none;cursor:pointer;color:#ffba02;' id='adm_filenm_download_progress_"+docList.id+"'>&nbsp;|&nbsp;Downloading File...</span>";
	}

	datahtml += "</span>";

	/*if(!archived){
		datahtml += "<span class='flagcommon'> | </span>";
		datahtml += "<span style='cursor:pointer;' id='adm_notes_"+docList.id+"' data-index='"+index+"' data-status='"+status+"' ";
		datahtml += "class='"+(docList.notePresent ? "" : "flagcommon")+"'>"+(docList.notePresent ? "View Note" : "Add Note")+"</span>";
	}*/

	datahtml += "</a></h2>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up text-center' "+datavar+" >";
	datahtml += "<p class='sneha1' style='cursor:pointer;border:0px;background-color:transparent;' "+datavar+" id='admfileversionname_"+index+"'>"+docList.versionNumber+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-2 up'>";
	datahtml += "<p class='sneha' style='width:120%;'>"+modifiedddt+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up text-center' style='text-align:center;'>";
	datahtml += "<p class='sneha'>"+size+"</p>";
	datahtml += "</div>";
	datahtml += "<div class='col-md-2 up text-center' id='admfiletagname_"+index+"' "+datavar+">";
	/*if(!archived){
		datahtml += "<p class='sneha1' style='cursor:pointer;'>View Tags</p>";
	}*/
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up'>";
	/*if(allowdn && status != "D" && allowdn == true && !archived) {
		datahtml += "<img class='down' style='cursor:pointer;' src='assets/img/lay.png' alt='' "+datavar+" id='admdownloadfile_"+docList.id+"' + class='filedownloadclass'>";
		datahtml += "<img src='assets/img/dcirrus_spin.gif?v=3' width='30px' height='30px' id='adm_filenm_progress_img_"+docList.id+"' style='display:none; margin-top: 25%;' class='fileviewprogressbar'/>";
	} else {
		datahtml += "<p class='sneha text-center'>&nbsp;</p>";
	}*/
	datahtml += "</div>";
	datahtml += "<div class='col-md-1 up'>";

	/*if(archived){
		//nothing should be there
	} else if(status == "D" && allowdelete){
		datahtml += "<ul class='nav  float-right'>";
		datahtml += "<li class='new-li' data-toggle='dropdown'>";
		datahtml += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
		datahtml += "<div class='dropdown-menu new-menu rowdropdownmenu' style='pointer-events: all;'>";
		datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsrestore_"+index+"' "+datavar+" style='border-top-left-radius:18px;border-top-right-radius:18px;padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-undo rowdropdownitem' aria-hidden='true'></i>Restore</a>";
		if(localStorage._zp == "1" && localStorage._zs == "B"){
			datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsfileperm_"+index+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa fa-users rowdropdownitem' aria-hidden='true'></i>File Permissions</a>";
		}
		datahtml += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconstrash_"+index+"' "+datavar+" style='border-bottom-left-radius: 18px;border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
		datahtml += "</div>";
		datahtml += "</li>";
		datahtml += "</ul>";
	} else if(status != "D"){
		var stractive = "";
		stractive += "<ul class='nav  float-right'>";
		stractive += "<li class='new-li' data-toggle='dropdown'>";
		stractive += "<img class='moreall' src='assets/img/layer.png' alt='' style='cursor:pointer;'>";
		stractive += "<div class='dropdown-menu new-menu rowdropdownmenu' style='pointer-events: all;'>";
		var stractiveappend = false;
		if(allowupload){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsedit_"+index+"' "+datavar+" style='border-top-left-radius: 18px;border-top-right-radius:18px;padding:15px;border-bottom:1px solid #ccc;'><i class='fa fa-pencil rowdropdownitem' aria-hidden='true'></i>Rename</a>";
			stractiveappend = true;
		}
		if(allowshare){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsshare_"+index+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-share-alt rowdropdownitem' aria-hidden='true'></i>Share</a>";
			stractiveappend = true;
		}
		if(allowcopy){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconscopy_"+index+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-clone rowdropdownitem' aria-hidden='true'></i>Copy</a>";
			stractiveappend = true;
		}
		if(allowmove){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsmove_"+index+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-arrow-right rowdropdownitem' aria-hidden='true'></i>Move</a>";
			stractiveappend = true;
		}
		if(localStorage._zp == "1" && localStorage._zs == "B" && admcurrentfoldertype == "S"){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsfileperm_"+index+"' "+datavar+"' style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa fa-users rowdropdownitem' aria-hidden='true'></i>File Permissions</a>";
			stractiveappend = true;
		}
		if(allowdnorg){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsorg_"+index+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-download rowdropdownitem' aria-hidden='true'></i>Download Original</a>";
			stractiveappend = true;
		}
		if(allowdelete){
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconsdelete_"+index+"' "+datavar+" style='border-bottom:1px solid #ccc;padding:15px;'><i class='fa fa-trash rowdropdownitem' aria-hidden='true'></i>Delete</a>";
			stractive += "<a class='dropdown-item new-item' href='javascript:void(0);' id='admdocrowiconstrash_"+index+"' "+datavar+" style='border-bottom-left-radius: 18px;border-bottom-right-radius:18px;padding:15px;'><i class='fa fa-remove rowdropdownitem' aria-hidden='true'></i>Delete Permanently</a>";
			stractiveappend = true;
		}
		stractive += "</div>";
		stractive += "</li>";
		stractive += "</ul>";

		if(stractiveappend) datahtml += stractive;
	}

	datahtml += "</div>";*/
	datahtml += "</div>";

	if(indivisualrow){
		$("#adm_doc_row_"+index).html(datahtml);
	} else {
		$("#tbldatarows").append(datahtml);
	}

	if(!archived){
		if(currentdownloadfiles[docList.id] != null && currentdownloadfiles[docList.id] != undefined) {
			$("#admdownloadfile_"+docList.id).css("display", "none");
			$("#adm_filenm_progress_img_"+docList.id).css("display", "");
		} else {
			$("#admdownloadfile_"+docList.id).css("display", "");
			$("#adm_filenm_progress_img_"+docList.id).css("display", "none");
		}
		admselectfilesevent("adm_doc_checkbox_"+index);
		admrowmouseover("adm_doc_row_"+index);

		admmakeImportant("admfileflagname_"+index);
		admMarkToSignDocument("admfilesign_"+index);
		admLockDocument("admfilelock_"+index);
		admRowEdit("admdocrowiconsedit_"+index);
		admRowCopy("admdocrowiconscopy_"+index);
		admRowMove("admdocrowiconsmove_"+index);
		admRowShare("admdocrowiconsshare_"+index);
		admRowDelete("admdocrowiconsdelete_"+index);
		admRowRestore("admdocrowiconsrestore_"+index);
		admRowPermanentDelete("admdocrowiconstrash_"+index);
		admaddtagpopupopen("admfiletagname_"+index);
		admaddversionpopupopen("admfileversionname_"+index);

		admViewDocument("adm_filenm_"+index,showviewer, isLocked);
		admDownloadDocument("admdownloadfile_"+docList.id);
		admDownloadOriginal("admdocrowiconsorg_"+index);
		admNoteEvent("adm_notes_"+docList.id);
		admFilePermissionEvent("admdocrowiconsfileperm_"+index);
	}
}

function loadTreeResponseOnPageChange(response){
	if(!admFolderTreeLoaded){
		admFolderListAllServiceAfter(response);
	}
}

function admBuildJSONTree(list){
	var data = [];
	if(list != null && list.length > 0){
		for(var i = 0 ; i< list.length; i++)
		{
		    buildTree(list[i].split('/'),data);
		}
		//console.log(JSON.stringify(data));
	}
	return data;
}

function buildTree(parts,treeNode) {
    if(parts.length === 0)
    {
    	return;
    }
    for(var i = 0 ; i < treeNode.length; i++)
    {
        if(parts[0] == treeNode[i].text)
        {
            buildTree(parts.splice(1,parts.length),treeNode[i].nodes);
            return;
        }
    }

    var vq = parts[0].substring(0,parts[0].lastIndexOf("#"));
    var fdid = parts[0].substring(parts[0].lastIndexOf("#")+1);
    var fdindex = admListFolderIndexId[fdid];
    var newNode = {'text': vq,'id':fdid,tags:[fdindex],'nodes':[]};
    treeNode.push(newNode);
    buildTree(parts.splice(1,parts.length),newNode.nodes);
}

var folderarr = [];
function admBuildUIFirst(dataobj, foldertype, level){
	/*treeincr++;
	admidxul = 0;
	level = 0;
	admids = 0;

	$("#treebody").html("<ul class='panel_scroll' id='admlistulid_"+treeincr+"' style='max-height:300px;overflow-y:auto;'><li id='adm_foldertreeli'>Root</li></ul>");

	var html1 = buildList(dataobj, false, 0, level, foldertype, "");
	$("#adm_foldertreeli").append(html1);
	$('#admlistulid_'+treeincr).treed({openedClass : 'fa-folder-open', closedClass : 'fa-folder'});*/

	nodesList= [];
	var treeid = "default-tree-"+admcurrentfoldertype;
	$('#'+treeid).treeview({
		data: dataobj,
		// expanded to 2 levels
		levels: 100,

		// custom icons
		// expandIcon: 'fa fa-plus',
		// collapseIcon: 'fa fa-minus',

		expandIcon: 'fa fa-folder',
		collapseIcon: 'fa fa-folder-open',
		emptyIcon: 'fa',
		nodeIcon: '',
		selectedIcon: '',
		checkedIcon: '',
		uncheckedIcon: '',

		// colors
		color: undefined, // '#000000',
		backColor: undefined, // '#FFFFFF',
		borderColor: undefined, // '#dddddd',
		onhoverColor: '#F5F5F5',
		selectedColor: '#FFFFFF',
		selectedBackColor: '#428bca',
		searchResultColor: '#D9534F',
		searchResultBackColor: undefined, //'#FFFFFF',

		// enables links
		enableLinks: false,

		// highlights selected items
		highlightSelected: true,

		// highlights search results
		highlightSearchResults: true,

		// shows borders
		showBorder: true,

		// shows icons
		showIcon: true,

		// shows checkboxes
		showCheckbox: false,

		// shows tags
		showTags: false,

		// enables multi select
		multiSelect: false,
		onNodeSelected: function(event, data) {
			//$m.nodeSelected(event,dataobj);
			admTreeFolderSelectedId = data.id;
			selectednodeid = data.nodeId;
		},
		onNodeUnselected: function(event, data) {
			//$m.nodeSelected(event,dataobj);
			//admTreeFolderSelectedId = -1;
			//selectednodeid = -1;
		}
	});

	$('#'+treeid).on('nodeExpanded',function(event, data) {
		prvselectednodeid = selectednodeid;
		/*if(selectednodeid != -1 && selectednodeid != data.nodeId){
			$('#'+treeid).treeview('collapseNode', [ selectednodeid, { silent: true, ignoreChildren: false } ]);
		}*/
		selectednodeid = data.nodeId;
		admTreeFolderSelectedId = data.id;
		var node = $('#'+treeid).treeview('getNode', data.nodeId);
		$('#'+treeid).treeview('selectNode', [ data.nodeId, { silent:false } ]);
		//$('#'+treeid).treeview('expandNode', [ data.nodeId, { silent: true } ]);
		//var arr = $('#'+treeid).treeview('getSiblings', node);
		//if(arr == null || arr == undefined || arr.length == 0) {
			//admFolderListAllService(data.id);
		//}
		children=node['nodes'];
		if(children.length == 0){
			admFolderListAllService(data.id);
		}
	});

	$('#'+treeid).on('nodeCollapsed',function(event, data) {
		prvselectednodeid = selectednodeid;
		selectednodeid = data.nodeId;
		admTreeFolderSelectedId = data.id;
		var node = $('#'+treeid).treeview('getNode', data.nodeId);
		$('#'+treeid).treeview('selectNode', [ data.nodeId, { silent:false } ]);
	});

	/*var allNodes = $('#'+treeid).treeview('getNodes');
	$(allNodes).each(function(index, element) {
		$(this.$el[0]).attr('data-attribute-name', this.data-attribute-name);
	});*/
	var node = $('#'+treeid).treeview('getNode', 0);
	if(node != null){
		//admAllDescendants(node);
	}

	/*if(selectednodeid > -1){
		$('#'+treeid).treeview('selectNode', [ selectednodeid, { silent:true } ]);
		var node = $('#'+treeid).treeview('getNode', selectednodeid);
		admTreeFolderSelectedId = node.id;
    }*/
}

function buildList(data, isSub, admidxul, level, foldertype, pathm){
    var html = ""; // Wrap with div if true
    admidxul++;
    level++;
    var parentid = "admpersonalfilesul_"+foldertype+"_"+admidxul;
    html += "<ul id='"+parentid+"' level='"+level+"' path='"+pathm+"' class='"+adm_ShowAdmOptionsULCls+"'>";
    for(var item=0;item<=data.length-1;item++){
    	admids++;
    	admidxul++;
    	var folderId = 0;
    	var noOfFiles = "0";
    	var status = "A";
    	var folderp = data[item].text;
    	var chkfolder = pathm + "/" + folderp;
    	if(pathm == "") chkfolder = folderp;

    	var foldperm = null;
    	var tfolderperm = undefined;
    	var tk = undefined;
    	if(foldertype == admpersonaltype) {
    		tk = admPersoanlFoldersFileCount_local.filter(function(itemk){return itemk.hasOwnProperty(chkfolder);});
    	} else if(foldertype == admsharedtype) {
    		tk = admSharedFoldersFileCount_local.filter(function(itemk){return itemk.hasOwnProperty(chkfolder);});
    		//tfolderperm = admSharedFoldersPermission_local.filter(function(itemk){return itemk.hasOwnProperty(chkfolder);});
    	}

    	try{
    		var tmp = tk[0][chkfolder];
    		folderId = (tmp.split("#"))[0];
    		noOfFiles = (tmp.split("#"))[1];
    		status = (tmp.split("#"))[2];

    		if(admcurrentfolderid == folderId){
            	admcurrentliid = admFolderListlidl_+foldertype+"_"+admids;
            	admcurrentlevel = level;
        		//admcurrentfoldertype = foldertype;
            }

    	}catch(error){}

    	/*try{
    		var tmpk = tfolderperm[0][chkfolder];
    		foldperm = tmpk.split("#")+"";
    	}catch(error){}*/

    	var path = folderp;
    	if(pathm != "") path = pathm + "/" + path;

    	if(admcurrentfolderid == folderId){
    		admcurrentpath = path;
    	}

    	var stylefontfile = "";
    	if(status == "D"){
    		stylefontfile = "color:#B74A4A;";
    	}

    	if(folderp.length > 53){
			folderp = folderp.substring(0, 52)+"...";
		}

		var fppath = path.split("/")[0];
        html += "<li class='"+adm_ShowAdmoptionCls+" "+ fppath +"' id='"+admFolderListlidl_+foldertype+"_"+admids+"' level='"+level+"' path=\""+path+"\" parentid='"+parentid+"' data-type='"+admcurrentfoldertype+"' data-id='"+folderId+"' data-nooffiles='"+noOfFiles+"' data-status='"+status+"'>";
     	if(typeof(data[item].children) === 'object'){ // An array will return 'object'
            if(isSub){
                html += "<a id='"+admFolderListlispan_+foldertype+"_"+admids+"' class='adm_ShowAdmoptionCls1' level='"+level+"' path=\""+path+"\" parentid='"+parentid+"' style='"+stylefontfile+"'>" + folderp + "<span id='"+admFolderFileslispan_+foldertype+"_"+admids+"'>("+noOfFiles+")<\/span><\/a>";
            } else {
            	html += "<a id='"+admFolderListlispan_+foldertype+"_"+admids+"' class='adm_ShowAdmoptionCls1' level='"+level+"' path=\""+path+"\" parentid='"+parentid+"' style='"+stylefontfile+"'>" + folderp + "<span id='"+admFolderFileslispan_+foldertype+"_"+admids+"'>("+noOfFiles+")<\/span></a>";
            }
            html += buildList(data[item].children, true, admidxul, level, foldertype, path); // Submenu found. Calling recursively same method (and wrapping it in a div)
        } else {
        	pathm = path + "/" + folderp;
        	html += "<a id='"+admFolderListlispan_+foldertype+"_"+admids+"' class='adm_ShowAdmoptionCls1' level='"+level+"' path=\""+path+"\" parentid='"+parentid+"' style='"+stylefontfile+"'>" + folderp + "<span id='"+admFolderFileslispan_+foldertype+"_"+admids+"'>("+noOfFiles+")<\/span></a>";
        }
        html += "</li>";
    }
    html += "</ul>";
    html += "";
    return html;
}

function admResetTree(){
	admFolderTreeLoaded = false;
	admFolderListAllService(0);
}

function admAllDescendants(node) {
	var children = node['nodes'];
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      allDescendants(child);
    }
}

function admPermissionIndexAdd(idm){
	if(adm_var_permission.indexOf(","+idm+"",) < 0){
		if(adm_var_permission=="") adm_var_permission = "," +idm + ",";
		else adm_var_permission = adm_var_permission + idm + ",";
	}
}

function admPermissionIndexAddAll(idm){
	adm_var_permission = "";
	for(var idm=0;idm<sharedsecuritylen;idm++){
		if(adm_var_permission=="") adm_var_permission = "," +idm + ",";
		else adm_var_permission = adm_var_permission + idm + ",";
	}
}

function admHighlightPersonalFolder(){
	$("#adm_personal").addClass("active");
	$("#adm_personal a").addClass("active");
	if(localStorage._zs == "I"){
		$("#imgpersonalfolder").attr("src", "assets/img/data_room_active.png");
		$("#pertxt").html("Data Room");
		$("#adm_dataroom").removeClass("active").hide();
	}else{
		$("#imgpersonalfolder").attr("src", "assets/img/personal_folder_active.png");
		$("#adm_dataroom").removeClass("active");
		$("#adm_dataroom a").removeClass("active");
		$("#imgdataroom").attr("src", "assets/img/data_room_inactive.png");
		$("#adm_dataroom").show();
	}
}

function admHighlightDataroom(){
	$("#adm_dataroom").show();
	$("#adm_dataroom").addClass("active");
	$("#adm_dataroom a").addClass("active");
	$("#imgdataroom").attr("src", "assets/img/data_room_active.png");
	$("#adm_personal").removeClass("active");
	$("#adm_personal a").removeClass("active");
	$("#pertxt").html("Personal Folder");
	$("#imgpersonalfolder").attr("src", "assets/img/personal_folder_inactive.png");
}

function admcheckiffromurl(){
	try{
		var urli = window.location.href;
		var urlk = urli.split("?");
		if(urlk.length > 1 && urlk[1].indexOf("a=view") == 0){
			var arr = urlk[1].split("&");
			if(arr.length == 5){
				if(arr[1].replace("b=", "") == "file"){
					//admcurrentfoldertype = arr[2].replace("c=", "");
					var docid = arr[3].replace("d=", "");
					var corpid = arr[4].replace("e=", "");
					if(corpid == localStorage._zw){
						urli = urli.replace("drive.html", "viewfile.html");
						window.location.href=urli;
					} else {
						admShowconfirmmsg(adm_messages.filenotpresentcorporate, confirm_Error, 5000, "", false, false);
					}
				}
			}
		}
	}catch(error){
	}
}

function admStorageProviderValidate() {
	var valid = true;
	var region = $("#sel_add_corp_region").val();
	if(!$("#ckbdefkeys").is(":checked") && $("#sel_storage_provider").val() == 1){
		if($("#txt_s3_access_key").val().trim().length == 0){
			admShowconfirmmsg(adm_messages.s3accesskeyenter, confirm_Error, 5000, "", false, false);
			valid = false;
		} else if($("#txt_s3_secret_key").val().trim().length == 0){
			admShowconfirmmsg(adm_messages.s3secretkeyenter, confirm_Error, 5000, "", false, false);
			valid = false;
		} else if($("#txt_s3_identitypool").val().trim().length == 0){
			admShowconfirmmsg(adm_messages.s3identitypoolenter, confirm_Error, 5000, "", false, false);
			valid = false;
		} else if(region == -1){
			admShowconfirmmsg(adm_messages.selectregion, confirm_Error, 5000, "", false, false);
			valid = false;
		}
	} else if(!$("#ckbdefkeys").is(":checked") && $("#sel_storage_provider").val() == 2){
		if($("#txt_azure_account_name").val().trim().length == 0){
			admShowconfirmmsg(adm_messages.storageaccountnameenter, confirm_Error, 5000, "", false, false);
			valid = false;
		} else if($("#txt_azure_account_key").val().trim().length == 0){
			admShowconfirmmsg(adm_messages.storageaccountkeyenter, confirm_Error, 5000, "", false, false);
			valid = false;
		}
	} else if($("#ckbdefkeys").is(":checked") && $("#sel_storage_provider").val() == 1 && region == -1){
		admShowconfirmmsg(adm_messages.selectregion, confirm_Error, 5000, "", false, false);
		valid = false;
	}

	return valid;
}

function admStorageProviderJson(){
	var region = $("#sel_add_corp_region").val();
	var isDefault = 0;
	var createStorage = true;
	if($("#ckbdefkeys").is(":checked")){
		isDefault = 1;
	}

	var sm = {};
	if($("#sel_storage_provider").val() == 1){
		sm = {"attribute1":$("#sel_storage_provider option:selected").text(),
									   "attribute2":$("#sel_storage_provider").val(),
									   "attribute3":"{\"region\":\""+awsregionList[region]+"\", \"accessKey\":\""+$("#txt_s3_access_key").val()+"\", \"secretKey\":\""+$("#txt_s3_secret_key").val()+"\", \"identityPoolId\":\""+$("#txt_s3_identitypool").val()+"\", \"maxPriority\":3, \"connectionTimeout\":50000, \"socketTimeout\":50000}",
									   "attribute4":isDefault,
									   "attribute5":region}
	} else if($("#sel_storage_provider").val() == 2){
		sm = {"attribute1":$("#sel_storage_provider option:selected").text(),
									   "attribute2":$("#sel_storage_provider").val(),
									   "attribute3":"{\"accountName\":\""+$("#txt_azure_account_name").val()+"\", \"accountKey\":\""+$("#txt_azure_account_key").val()+"\"}",
									   "attribute4":isDefault}
	}
	return sm;
}

function admDownloadFolderQueryParam(){
	try{
		var urlk = window.location.href.split("?");
		if(urlk.length > 1 && urlk[1].indexOf("dfd=")==0){
			window.open(cloudURLACT+"/appnew/downloadlink.html?"+urlk[1]);
		}
	}catch(error){

	}

}

function admswitch(id){
	switchcalled = true;
	var corplist = null;
	var record = null;
	if(localStorage._zm != null && (localStorage._zm).length > 0 && localStorage._zm != "null"){
		corplist = JSON.parse(valdec(localStorage._zm));
		for(var i=corplist.length-1;i>=0;i--){
			if(id == corplist[i].id){
				record = corplist[i];
				acclistcurrlogin = i;
				break;
			}
		}
	}

	loginstaysignedinevent();
	admFolderDownloadcancelAllPrevious();
	refreshToken();
	if(record != null && record.value._zz != null && (record.value._zz).length > 0 && record.value._zz != "null"){
		fetchdeviceid(record.value._zz);
	} else {
		loginPrepareAccounts(id);
	}
}

function admAddAccount(id){
	if(id.length > 0){
		loginRemoveAccount(id, true);
		if(localStorage._zt == "1"){
			corporatelistarr.push({"id":id, "value":{"_zu":localStorage._zu, "_zo":localStorage._zo, "_zy":localStorage._zy, "_zw":localStorage._zw,
				"_zz":localStorage._zz, "_zs":localStorage._zs,"_zk":localStorage._zk}});
		} else {
			corporatelistarr.push({"id":id, "value":{"_zu":localStorage._zu, "_zo":localStorage._zo, "_zy":localStorage._zy, "_zw":localStorage._zw,
				"_zz":"", "_zs":localStorage._zs,"_zk":localStorage._zk}});
		}

		localStorage.setItem("_zm", valenc(JSON.stringify(corporatelistarr)));
	}
}

function admListAccountDisplay(){
	if(rearrangeAccountsList){
		rearrangeAccountsList = false;
		if(localStorage._zm != null && localStorage._zm.length>0){
			var signedincount = 0;
			corporatelistarr = JSON.parse(valdec(localStorage._zm));
			admremoveaccountrows();
			for(var i=corporatelistarr.length-1;i>=0;i--){
				if(corporatelistarr[i].id != (uniqueidentifieracclist())){
					//add account list to sweitch account display list
					var str = "<span href='javascript:void(0);' class='nohover dropdown-item divuseraccountlist_account' style='color: #fff;cursor: pointer; margin-bottom: 4px; margin-top: 10px;height:62px;' id='divuseraccountlist_"+corporatelistarr[i].id+"'>";
						str += "<div style='float:left;width:100%;'>";
							str += "<div style='float:left;width:10%;'>";
								if(corporatelistarr[i].value._zz != "") str += "<img src='assets/img/signout.png' alt='' title='Sign Out' style='height:20px; width:20px; margin-right: 5px;cursor:pointer;' id='divuseraccount_signout_"+corporatelistarr[i].id+"'> ";
								else str += "&nbsp;";
							str += "</div>";
							var dm = corporatelistarr[i].value._zo;
							dm = (dm.length > 20 ? dm.substring(0, 20) : dm);
							str += "<div style='float:left;width:70%;' id='divuseraccount_"+corporatelistarr[i].id+"' title='"+corporatelistarr[i].value._zo+"'>";
								if(corporatelistarr[i].value._zs == "I"){
									if(corporatelistarr[i].value._zk != undefined && corporatelistarr[i].value._zk != null &&
										corporatelistarr[i].value._zk != "null" && corporatelistarr[i].value._zk != "") {
										str += corporatelistarr[i].value._zk+"<br>";
									} else {
										str += corporatelistarr[i].value._zy+"<br>";
									}
								} else {
									str += corporatelistarr[i].value._zy+"<br>";
								}
								if(corporatelistarr[i].value._zs == "I"){
									str += "&nbsp;<br>";
									str += "&nbsp;<br>";
								} else {
									str += dm+"<br>";
									str += corporatelistarr[i].value._zu+"<br>";
								}
							str += "</div>";
							str += "<div style='float:left;width:20%;text-align:end;'>";
								str += "<img src='assets/img/minus_icon.png' alt='' title='remove account' style='float:right;height:20px;width:20px;margin-right:5px;cursor:pointer;' id='divuseraccount_remove_"+corporatelistarr[i].id+"'> ";
								if(corporatelistarr[i].value._zz == "") {
									str += "<br><br>Signed Out";
								} else {
									signedincount++;
								}
							str += "</div>";
						str += "</div>";
					str += "</span>";
					str += "<hr style='background-color: #fff !important;' class='divuseraccount_hr__account' id='divuseraccount_hr_"+corporatelistarr[i].id+"'>";
					$("#divaccountlist").append(str);
					admSwitchAccountEvent(corporatelistarr[i].id);
				}
			}

			if(corporatelistarr.length > 1){
				if(signedincount > 0){
					$("#adm_psignout_span").html("Sign out from all accounts");
				} else {
					$("#adm_psignout_span").html("Sign out");
				}
				$("#adm_switchaccount_span").html("Switch account");
				$("#adm_switchaccount_img").attr("src", "assets/img/toggle_icon.png");
			} else {
				$("#adm_psignout_span").html("Sign out");
				$("#adm_switchaccount_span").html("Add account");
				$("#adm_switchaccount_img").attr("src", "assets/img/plus_icon.png");
			}
		}
	}
}

function admremoveaccountrows(){
	$(".divuseraccountlist_account").remove();
	$(".divuseraccount_hr__account").remove();
}

function admremoveaccountfromlist(idm, force){
	admremoveaccountrows();
	loginRemoveAccount(idm, force);
	rearrangeAccountsList = true;
	admListAccountDisplay();
}

function admShowLoginScreen(){
	loginpopulateaccountlist();
	$("#login_linkallacccounts").show();
	$("#btnlogin").css("margin-left", "15%");
	admswitch(-1);
}

function admForumCheckNotif(){
	setInterval(function(){
		if(getauthtokenfromlocal() != "" && admbaseauth == getauthtokenfromlocal()){
			//admFetchForumNotifService();
			if(localStorage._ns != null && localStorage._ns != undefined && localStorage._ns != "" && localStorage._ns != admFormNotifList && !admFormBusy){
				admFormBusy = true;
				admFormNotifList = localStorage._ns;
				var data = JSON.parse(valdec(localStorage._ns));
				console.log("length : " + data.length);
				if(!$("#divforumnotiflist").is(":visible")) $("#icon_dot_forum_notif").show();
				$("#divforumnotiflist").html("");
				var minus = 0;
				try{
					for(var i=data.length-1;i>=0;i--){
						var nm = (data[i].name).split("#");
						try{
							if(nm[1].length > 0){
								admForumNotifListPrep(nm[1], nm[0], data[i].title, data[i].body, "", data[i].action);
							} else {
								admForumNotifListPrep(nm[0], nm[1], data[i].title, data[i].body, "", data[i].action);
							}
						}catch(error){
							minus++;
						}
					}
				}catch(error){}
				$("#icon_dot_forum_notif").html(data.length-minus);
				admFormNotifListCount = data.length-minus;
				admFormBusy = false;
			}
		}
	}, 1000);
}

function admForumNotifListPrep(threadId, parentThreadId, subject, post, date, action){
	var subjectStr = subject;
	var postStr = post;
	var datavar = " data-subject='"+subject+"' data-post='"+post+"' data-action='"+action+"' data-id='"+threadId+"' data-pid='"+parentThreadId+"' ";
	post = (post.length > 100 ? post.substring(0, 100)+"..." : post);
	subject = (subject.length > 100 ? subject.substring(0, 100)+"..." : subject);
	post = linkify(post);
	post = post.replace(/(?:\r\n|\r|\n)/g, ' ');
	post = post.replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g, '');
	var str = "";
	str += "<div class='card mb-2' id='div_thread_"+threadId+"-"+parentThreadId+"'  "+datavar+" style='cursor:pointer;border-radius:24px;padding:0px;box-shadow:none;'>";
	str += "<div class='card-body p-2 p-sm-3'>";
	str += "<div class='media forum-item'>";
	str += "<div class='media-body'>";
	str += "<p class='text-secondary' title='"+subjectStr+"' style='margin:0px;color:#0d8ad0 !important;width:96%;float:left;font-weight:bold;'>";
	str += subject;
	str += "</p>";
	str += "<button type='button' class='btn' aria-label='Close' id='btn_notif_delete_"+threadId+"-"+parentThreadId+"' style='background:none;color:#555252;font-size:18px;opacity:0.7;font-weight:normal;margin-right:4px;padding:0px;line-height:0px;'>";
	str += "<span aria-hidden='true'>&times;</span>";
	str += "</button>";
	str += "<p class='text-secondary' title='"+postStr+"' style='margin:0px;color:#0d8ad0 !important;font-weight:bold;'>"+post+"</p>";
	str += "<p class='text-muted' style='margin:0px;color:#979595 !important;'>";
	//str += "<span>"+action+" on "+date+"</span>";
	str += "<span>"+action+"</span>";
	str += "</p>";
	str += "</div>";
	str += "</div>";
	str += "</div>";
	str += "</div>";
	$("#divforumnotiflist").append(str);
	admForumNotifClick(threadId+"-"+parentThreadId);
}

function forumRemNotiLocalStorage(id){
	if(localStorage._ns != null && localStorage._ns != undefined && localStorage._ns != ""){
		console.log("forumRemNotiLocalStorage id : " + id);
		var data = JSON.parse(valdec(localStorage._ns));
		var name = id.split("-")[0]+"#"+id.split("-")[1];
		var subject = $("#div_thread_"+id).attr("data-subject");
		var post = $("#div_thread_"+id).attr("data-post");
		var action = $("#div_thread_"+id).attr("data-action");
		var sm = {"name":name,"action":action,"body":post,"title":subject};
		var index = -1;
		for (var i = 0; i < data.length; i++) {
			if(data[i] != null && data[i].body == post && data[i].title == subject && data[i].action == action && data[i].name == name) {
				index = i;
			}
		}
		if(index >= 0) delete data[index];
		if(data.length == 0){
			localStorage.setItem("_ns", "");
			$("#icon_dot_forum_notif").hide();
			$("#icon_dot_forum_notif").html("");
		} else {
			localStorage.setItem("_ns", valenc(JSON.stringify(data)));
		}
		admFormNotifList = localStorage._ns;
		admFormBusy = false;
	}
}

function storeNotification(data){
	storenotiflocalactive = true;
	console.log("storeNotification drive : " + JSON.stringify(data) + " :: " + window.location.href);
	var notificartionarr = [];
	if(localStorage._ns != null && localStorage._ns != undefined && (localStorage._ns).length > 0){
		notificartionarr = JSON.parse(valdec(localStorage._ns));
	}
	var hs = null;
	try{
		hs = JSON.parse(data);
	}catch(error){
		hs = data;
	}

	if(data.data != null){
		hs = data.data;
		console.log("data.data : " + JSON.stringify(hs));
	}

	if(notificartionarr.length > 50){
		notificartionarr = notificartionarr.slice(0, 50);
	}
	if(hs != null){
		notificartionarr.push(hs);
		localStorage.setItem("_ns", valenc(JSON.stringify(notificartionarr)));
	}
	storenotiflocalactive = false;
}

function admFilePermClosePopup(){
	admselecteddocids = "";
	hideActionPopup("divmodaldocperm");
	$(".adm_file_perm_checkbox_cls").closest('tr').removeClass("highlight_row");
	$(".adm_file_perm_checkbox_cls").closest('tr').css("background-color", "#ffffff");
	$(".admcheckbox").prop("checked", false);
	$("#admallcheckbox").prop("checked", false);
}

function admFolderDownloadcancelAllPrevious(){
	//folder download if running canceling
	try{
		abortingajax = true;
		abortAllAjaxXhrRequest();
		downloadfolderarr = [];
		folderdownloadids.forEach(function(item, index){
			$("#adm_download_folder_progress_"+folderdownloadidms[index]).css("display", "none");
			$("#adm_download_folder_progress_img_"+folderdownloadidms[index]).css("display", "none");
			$("#adm_download_org_"+folderdownloadidms[index]).css("display", "");
			$("#adm_download_folder_"+folderdownloadidms[index]).css("display", "");
			if(folderdownloadidms[index] != undefined && folderdownloadidms[index] != null) admremovdownloadrow(folderdownloadidms[index]);
			if(folderdownloadft[item] != undefined && folderdownloadft[item] != null) clearInterval(folderdownloadft[item]);
		});
		folderdownloadids = [];
		folderdownloadft = [];
		folderdownloadidms = [];
		currentdownloadfolders = [];
		dowloadfolderidsui = [];
		$("#tbldownloaddetails").html("");
		hideActionPopup("modalfolderdownload");
		$("#downloadingperc").hide();
		$(".fileviewprogressbar").hide();
		$(".filedownloadclass").show();
	}catch(error){
		console.log("error switch : " + error);
	}
}

function admFolderArchived(status){
	if(status == "H"|| status == "E"){
		return true;
	} else {
		return false;
	}
}

function admFolderRestoreInit(status){
	if(status == "Q"){
		return true;
	} else {
		return false;
	}
}

//build the report of files uploaded
//prepare the csv file from file upload list
function admBuildUploadReport(){
	var str = "Folder Path, File Name, Success\r\n";
	for(var dt in admuploadfilelist) {
		var fdp = dt.split("#")[0];
		var flp = dt.split("#")[1];
		var success = (admuploadfilelist[dt] == "D" ? "Yes" : "No");
		str += "\""+fdp+"\","+"\""+flp+"\","+"\""+success+"\"\r\n";
	}

	var name = "Upload_Report";
	if(localStorage._zs == "B") {
		name = localStorage._zw+"_"+name;
	}
	var dt= new Date();
	dt = moment(dt, 'MM/DD/YYYY HH:MM').format();
	dt = dt.replace(/T/g, "_").replace(/-/g, "_").replace(/:/g, "_");
	dt = dt.substr(0, dt.indexOf('+'));
	dt = dt.substr(0, dt.lastIndexOf('_'));
	name += "_" + dt;
	name += ".csv";
	name = name.replace(/,/g, "");
	name = name.replace(/ /g, "_");
	name = name.replace(/:/g, "_");
	name = name.replace(/\//g, "_");
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(str);
	hiddenElement.target = '_blank';
	hiddenElement.download = name;
	hiddenElement.click();
	admuploadfilelist = [];
}

function admForumClearAll(){
	admDeleteForumNotifService(-1);
	admFormNotifListCount = 0;
	$("#divforumnotiflist").html("");
	hideActionPopup("divforumnotiflistmodal");
	localStorage._ns = "";
	admFormNotifList = localStorage._ns;
}

function admListSortSort(data, type){
	datatosort = data;
	if(datatosort != null && datatosort.length > 0){
		if(type=="file"){
			if(datatosort[0].fileIndex != null && datatosort[0].fileIndex != "null" && datatosort[0].fileIndex != ""){
				admindexpresent = true;
			} else {
				admindexpresent = false;
			}
		} else if(type=="folder"){
			if(datatosort[0].folderIndex != null && datatosort[0].folderIndex != "null" && datatosort[0].folderIndex != ""){
				admindexpresent = true;
			} else {
				admindexpresent = false;
			}
		}

		localStorage.setItem("_zshort", adm_sorting);
		var arr = adm_sorting.split("`");
		sortorder = (arr[0] == "DESC" ? -1 : 1);

		if(type=="copy") {
			sortfieldnm = "fileLastModifiedDate";
			sortorder = "DESC";
		} else if(arr[1]=="date") {
			sortfieldnm = (type == "folder" ? "fileLastModifiedDate" : "fileModifiedLongTime");
		} else if(arr[1]=="size") {
			sortfieldnm = (type == "folder" ? "folderSize" : "fileSize");
		} else if(arr[1]=="name") {
			sortfieldnm = (type == "folder" ? "folderPathLastChild" : "fileName");
		}

		alphaNumericSort(datatosort);
	}
	return datatosort;
}

function admClearFolderFileCache(){
	adm_doc_list = [];
	adm_folder_list = [];
}

function admSaveInitialFilePermissionStatus(id, status){
	$("#tr_file_perm_"+id).attr("data-prvstatus",status);
}
/* for sorting */

function admDefaultSortCheck(){
	if(localStorage._zshort != null && localStorage._zshort != undefined && localStorage._zshort.length > 0){
	adm_sorting = localStorage._zshort;
	var splsort = adm_sorting.split("`");



	$("#sizesort").css("color", "#000000");
	$("#datesort").css("color", "#000000");
	$("#namesort").css("color", "#000000");



	var idsort = "namesort";
	if(splsort[1]=="date") idsort = "datesort";
	else if(splsort[1]=="size") idsort = "sizesort";



	$("#"+idsort).css("color", "#009ce7");
	if(splsort[0] == "DESC"){
	$("#"+idsort).removeClass("fa-chevron-up");
	$("#"+idsort).addClass("fa-chevron-down");
	} else {
	$("#"+idsort).removeClass("fa-chevron-down");
	$("#"+idsort).addClass("fa-chevron-up");
	}
	//$("#"+idsort).click();
	}
	}