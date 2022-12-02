
/**
method to click personal and data room
*/
function admTopFolderClick(){
	unbindobject("#adm_personal");
	unbindobject("#adm_dataroom");
	$("#adm_dataroom").bind("click", function(event){
		$("#divdrive").show();
		$("#divloginaccountslist").hide();
		$("#divlogin").hide();
		setTimeout(function(){
		inshareallowed = true;
		admCloseRowDropDown();
		if(localStorage._zs == "B") {
			$("#btnuploadfile").hide();
			$("#btnuploadfolder").show();
			//$("#btnuploadfolder").hide();
			$("#tbldatarows").empty();
			admcurrentfoldertype = "S";
			admFolderTreeLoaded = false;
			admTreeFolderSelectedId = 0;
			selectednodeid = -1;
			admListFolderIndexIdMain = [];
			ajaxindicatorstart('loading data.. please wait..');
			fetchAllFolderListDetails(admsharedtype, true);
			admHighlightDataroom();
			$("#admfolderheader").html("");
			$("#ul_more").hide();
			$("#searchpopup").slideUp();
			$("#btnuploadfile").hide();
			admtotaldocs = 0;
		} else if(localStorage._zs == "I") {
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		}
		}, 500);
		return false;
	});
	$("#adm_personal").bind("click", function(event){
		$("#divdrive").show();
		$("#divloginaccountslist").hide();
		$("#divlogin").hide();
		setTimeout(function(){
		inshareallowed = true;
		admCloseRowDropDown();
		$("#btnuploadfile").hide();
		$("#btnuploadfolder").show();
		$("#tbldatarows").empty();
		admcurrentfoldertype = "P";
		admFolderTreeLoaded = false;
		admTreeFolderSelectedId = 0;
		selectednodeid = -1;
		admListFolderIndexIdMain = [];
		ajaxindicatorstart('loading data.. please wait..');
		fetchAllFolderListDetails(admpersonaltype, true);
		admHighlightPersonalFolder();
		$("#admfolderheader").html("");
		$("#ul_more").hide();
		$("#searchpopup").slideUp();
		$("#btnuploadfile").hide();
		admtotaldocs = 0;
		admTreeFolderSelectedId = 0;
		}, 500);
		return false;
	});

	$('.rowdropdownmenu').bind("click", function(){
		$("#searchpopup").slideUp();
	});

	$('body').click(function(evt){
		if(evt.target.className == "moreall"){
			$("#searchpopup").slideUp();
		}
	});

	unbindobject("#adm_psignout");
	$("#adm_psignout").bind("click", function(event){
		corporatelistarr = JSON.parse(valdec(localStorage._zm));
		for(var i=corporatelistarr.length-1;i>=0;i--){
			if(corporatelistarr[i].value._zz != "" && corporatelistarr[i].id != (uniqueidentifieracclist())) {
				logOutServiceSingle(corporatelistarr[i].value._zz);
			}
		}

		loginRemoveAccount(-1, false);
		logOutService();
		clearauthinlocalstorage();
		loginCheckAndPopulateCachedAccount();
		return false;
	});

	unbindobject("#adm_checkboxselectallshare");
	$("#adm_checkboxselectallshare").bind("click", function(event){
		$(".adm_userpopupcheckboxcustom_Cls").prop("checked", $("#adm_checkboxselectallshare").is(":checked"));
		if($("#adm_checkboxselectallshare").is(":checked")){
			$(".secviewcheck").prop('checked', true);
			$(".secdownloadcheck").prop('checked', true);
			$(".secsharecheck").prop('checked', true);
			$(".secdepositcheck").prop('checked', true);
			$(".secdeletecheck").prop('checked', true);
			$(".seccopycheck").prop('checked', true);
			$(".secmovecheck").prop('checked', true);
			admPermissionIndexAddAll();
		} else {
			$(".secviewcheck").prop('checked', false);
			$(".secdownloadcheck").prop('checked', false);
			$(".secsharecheck").prop('checked', false);
			$(".secdepositcheck").prop('checked', false);
			$(".secdeletecheck").prop('checked', false);
			$(".seccopycheck").prop('checked', false);
			$(".secmovecheck").prop('checked', false);
			adm_var_permission = "";
		}
	});
}

function admHideSearchOnRowMenu(){
	/*unbindobject('.moreall');
	$('.moreall').bind("click", function(){
		$("#searchpopup").slideUp();
	});*/
}

/**
 * method to register delete folder event
 * @param id
 */
function admDeleteFolderEvent(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		if(localStorage._zu == "0020003" && admcurrentfoldertype == "shared_"){
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else {
			var folderid = document.getElementById(this.id).getAttribute("data-id");
			var folderType = document.getElementById(this.id).getAttribute("data-type");
			var params = {"folderid":folderid, "objid":"", "folderType":folderType, "deletecnf":false};
			admTempDeleteFolderService(params);
		}
		return false;
	});
}

function admRestoreFolder(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(event){
		admCloseRowDropDown();
		var folderId = document.getElementById(this.id).getAttribute("data-id");
		ajaxindicatorstart('processing request.. please wait..');
		admRestoreFolderService(folderId, "");
		return false;
	});
}

function admDeletePermanentFolder(id){
	unbindobject("#"+id);
	$("#"+id).click(function(event){
		admCloseRowDropDown();
		var folderid = document.getElementById(this.id).getAttribute("data-id");
		$("#deleteconfirmmodal").attr("folderid", folderid);
		$("#deleteconfirmmodal").attr("fileid", 0);
		$("#deleteconfirmmodal").attr("multifile", false);
		showActionPopup("deleteconfirmmodal");
	});
}

function admrowmouseover(id){
	unbindobject("#"+id);
	$("#"+id).mouseover(function(){
		var idm = (this.id).replace("adm_folderrow_", "");
		var idm1 = parseFloat(idm)+1;
		$(this).addClass("rowhighlight");
	});

	$("#"+id).mouseout(function(){
		var idm = (this.id).replace("adm_folderrow_", "");
		var idm1 = parseFloat(idm)+1;
		$(this).removeClass("rowhighlight");
	});
}

/**
 * method to register add new folder event
 * @param id
 */
function admAddNewFolderEvent(){
	unbindobject("#btncreatefolderpopup");
	$("#btncreatefolderpopup").bind("click", function(){
		admfoldersizeupdatecalled = false;
		admcanuploadclicked = false;
		admdefaultMessageUploadSuccess = "";
		$("#admfoldername").removeAttr('disabled');
		if(admcurrentfolderid == 0){
			var allowUpload = true;
			if(localStorage._zp == 0){
				allowUpload = false;
			}
			if(admcurrentfoldertype == "P"){
				var allowUpload = true;
			}

			if(!allowUpload){
				admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
				admCloseRowDropDown();
			}
		} else if(admfolderstatus[admcurrentfolderid] == "A"){
			permcheckactionafterparams = "";
			admCheckFolderSecurityService(admcurrentfolderid);
		} else {
			admShowconfirmmsg(adm_messages.admfolderintrash, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#btncreatefolder");
	$("#btncreatefolder").bind("click", function(){
		var allowUpload = true;
		if(admcurrentfolderid == 0){
			if(localStorage._zp == 0){
				allowUpload = false;
			}
			if(admcurrentfoldertype == "P"){
				var allowUpload = true;
			}

			if(!allowUpload){
				admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
			}
		}

		if(allowUpload){
			$("#admfoldername").focus();
			admCloseRowDropDown();
			addNewFolderSetup("Folder name");
			$("#admfoldername").attr("isfolder", true);
			$("#dropdownfolder").slideUp();
			showActionPopup("createfoldermodal");
		}
	});

	unbindobject("#btnnewfolderpopclose");
	$("#btnnewfolderpopclose").bind("click", function(){
		$("#btncreatefolderdone").removeAttr('disabled');
		$("#admfoldername").removeAttr('disabled');
		admCloseRowDropDown();
		addNewFolderSetup("Folder name");
		hideActionPopup("createfoldermodal");
	});

	unbindobject("#btncreatefolderdone");
	$("#btncreatefolderdone").bind("click", function(event){
		$(this).attr('disabled', true);
		$(this).prop('disabled', true);
		admCloseRowDropDown();
		var isfolder = document.getElementById("admfoldername").getAttribute("isfolder")+"";
		admPrepareFolderCreate();
		event.stopPropagation();
	});

	unbindobject("#admfoldername");
	$("#admfoldername").bind("keyup", function(){
		if(event.keyCode == 13){
			//admPrepareFolderCreate();
		}
	});

	unbindobject("#rename_btnnewfolderpopclose");
	$("#rename_btnnewfolderpopclose").bind("click", function(){
		$("#rename_btncreatefolderdone").removeAttr('disabled');
		$("#rename_admfoldername").removeAttr('disabled');
		addRenameFolderSetup("Folder name");
		hideActionPopup("rename_foldermodal");
	});


	unbindobject("#rename_btncreatefolderdone");
	$("#rename_btncreatefolderdone").bind("click", function(event){
		$(this).attr('disabled', true);
		$(this).prop('disabled', true);
		admCloseRowDropDown();
		admPrepareEditFolder();
		event.stopPropagation();
	});

	unbindobject("#rename_filepopclose");
	$("#rename_filepopclose").bind("click", function(){
		$("#rename_filedone").removeAttr('disabled');
		$("#rename_admfilename").removeAttr('disabled');
		admCloseRowDropDown();
		addRenameFileSetup();
		hideActionPopup("rename_filemodal");
	});

	unbindobject("#rename_filedone");
	$("#rename_filedone").bind("click", function(event){
		$(this).attr('disabled', true);
		$(this).prop('disabled', true);
		admCloseRowDropDown();
		admPrepareFileRename();
		event.stopPropagation();
	});
}

/**
* edit folder name
*/
function admEditFolderEvent(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		$("#rename_admfoldername").removeAttr('disabled');
		admCloseRowDropDown();
		permcheckactionafter = "rename";
		permcheckactionafterparams = this.id;
		var folderId = document.getElementById(permcheckactionafterparams).getAttribute("data-id");
		admCheckFolderSecurityService(folderId);
		return false;
	});
}

function admSearchEvents(){
	unbindobject("#searchlink");
	$("#searchlink").bind("click", function(){
		admCloseRowDropDown();
		$("#searchpopup").slideDown();
		admClearSearchFieldsNew();
		admHideSearchOnRowMenu();
	});

	unbindobject("#searchcancel");
	$("#searchcancel").bind("click", function(){
		admCloseRowDropDown();
		$("#searchpopup").slideUp();
		admClearSearchFieldsNew();
	});

	unbindobject("#searchdone");
	$("#searchdone").bind("click", function(){
		admCloseRowDropDown();
		adm_documentmaxlimit = 0;
		admtotaldocs = 0;
		adm_sorting = "DESC`date";
		adm_search_click = true;
		admUnSelectAllCheckBox();
		adm_doc_list = [];
		admDisplaySearchFilesService();
	});

	unbindobject("#admflagcheckbox");
	$("#admflagcheckbox").bind("click", function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admflaggedcheckbox").prop("checked", false);
		}
	});

	unbindobject("#admflaggedcheckbox");
	$("#admflaggedcheckbox").bind("click", function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admflagcheckbox").prop("checked", false);
		}
	});

	unbindobject("#admlockcheckbox");
	$("#admlockcheckbox").bind("click", function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admunlockcheckbox").prop("checked", false);
		}
	});

	unbindobject("#admunlockcheckbox");
	$("#admunlockcheckbox").bind("click", function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admlockcheckbox").prop("checked", false);
		}
	});

	unbindobject("#admmarkcheckbox");
	$("#admmarkcheckbox").bind("click", function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admmarkedcheckbox").prop("checked", false);
		}
	});

	unbindobject("#admmarkedcheckbox");
	$("#admmarkedcheckbox").bind("click", function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admmarkcheckbox").prop("checked", false);
		}
	});
}

function admDeleteConfirmEvents() {
	unbindobject("#btndeleteconfirmdone");
	$("#btndeleteconfirmdone").bind("click", function(event){
		admCloseRowDropDown();
		var multifile = document.getElementById("deleteconfirmmodal").getAttribute("multifile");
		if(multifile == true || multifile == "true"){
			admDeleteDocsPermanent("");
		} else {
			var folderId = document.getElementById("deleteconfirmmodal").getAttribute("folderid");
			var fileid = document.getElementById("deleteconfirmmodal").getAttribute("fileid");
			var index = document.getElementById("deleteconfirmmodal").getAttribute("index");
			var arr = [];
			if(parseFloat(fileid) > 0){
				arr[fileid] = index;
				var jsonInput = {"attribute1":fileid, "ids":arr, "permdel":true, "attribute2":admcurrentfoldertype};
				admDeleteDocsPermanent(jsonInput);
				$(this).attr('disabled', true);
				$(this).prop('disabled', true);
			} else if(parseFloat(folderId) > 0){
				var params = {"folderid":folderId, "objid":"", "deletecnf":true, "folderType":admcurrentfoldertype};
				admDeleteFolderService(params);
				$(this).attr('disabled', true);
				$(this).prop('disabled', true);
			}
		}
		$("#btndeleteconfirmdone").removeAttr('disabled');
		event.stopPropagation();
	});

	unbindobject("#btndeleteconfirmcancel");
	$("#btndeleteconfirmcancel").bind("click", function(){
		admCloseRowDropDown();
		admClearDeleteConfirmModal();
		hideActionPopup("deleteconfirmmodal");
	});
}

function admFolderClickMoreEvent(id) {
	unbindobject("#"+id);
	$("#"+id).click(function(){
		inshareallowed = true;
		admCloseRowDropDown();
		adm_doc_list = [];
		admtotaldocs = 0;
		var idm = this.id;
		if(idm == "adm_header_-1"){
			admcurrentfolderstatus = "A";
			if(admcurrentfoldertype=="P"){
				$("#adm_personal").click();
			} else if(admcurrentfoldertype=="S"){
				$("#adm_dataroom").click();
			}
		} else {
			hideActionPopup("modalfoldertree");
			var folderType = document.getElementById(idm).getAttribute("data-type");
			var path = document.getElementById(idm).getAttribute("path");
			if(document.getElementById(idm) != null){
				var folderId = document.getElementById(idm).getAttribute("data-id");
				var status = document.getElementById(idm).getAttribute("data-status");
				admcurrentfolderstatus = status;
				if(status == "D" || status == "H" || status == "E" || status == "Q"){
					$("#btncreatefolderpopup").hide();
					$("#ulbtncreatefolderpopup").hide();
				} else {
					$("#btncreatefolderpopup").show();
					$("#ulbtncreatefolderpopup").show();
				}
				admSetSelectedNodeFromMain = true;
				selectednodeid = nodesList[folderId];
				admFolderClickCommon(path, folderType, folderId);
			}
		}
	});
}

/**
 * method to detect end of scroll reached
 */
function admDataScrollEnd(){
	$("#tbldatarows").on("scroll", function() {
		admCloseRowDropDown();
		var p1 = $(this).scrollTop();
		var p2 = $(this).innerHeight();
		var p3 = $(this)[0].scrollHeight;
		p3 = p3 - 10;
		if(adm_documentmaxlimit <= admtotaldocs) {
			if((p1 + p2) >= p3) {
				var noofrowsstart = parseInt(document.getElementById("tbldatarows").getAttribute("data-rowdispl"));
				var totalnooffiles = 0;
				try{
					var k = $("#admtotalfilesheader").html().substring($("#admtotalfilesheader").html().indexOf("|")+2);
					k = k.replace(" ", "").replace("files", "").replace("file", "");
					totalnooffiles = parseInt(k);
				}catch(error){

				}
				if(adm_documentfetchdone == true && !norecordsfound){
					adm_documentfetchdone = false;
					if(!adm_search_progress){
						if(noofrowsstart < admtotaldocs) {
							ajaxindicatorstart('loading data.. please wait..');
							admscrolldone = true;
							fetchAllFolderListLevelDetails(true, admcurrentfoldertype, admcurrentfolderid, false, true);
						}
					} else {
						admDisplaySearchFilesService();
					}
				}
			} else {
				norecordsfound = false;
			}
		}
	});
}

function admOpenShareRowModal(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		var idm = this.id;
		var isfolder = document.getElementById(idm).getAttribute("data-isfolder");
		var folderid = document.getElementById(idm).getAttribute("data-id");
		var folderType = document.getElementById(idm).getAttribute("data-type");
		var path = document.getElementById(idm).getAttribute("path");
		$("#sharemodal").attr("data-folderid", folderid);
		$("#sharemodal").attr("data-foldertype", folderType);
		$("#sharemodal").attr("data-folderpath", path);
		$("#sharemodal").attr("data-fileid", 0);
		$("#adm_mobileemailpoplist").data('maxid',0);
		admopenshare(isfolder);
	});


}

function admOpenShareCloseModal(){
	unbindobject("#admsharecancel");
	$("#admsharecancel").click(function(){
		admCloseRowDropDown();
		admShareClose();
	});
}

function admOpenShareDoneModal(){
	unbindobject("#admsharesend");
	$("#admsharesend").click(function(){
		admCloseRowDropDown();
		if( $("#admsharereadonly").is(":checked") == true ||
			$("#admshareinfinitedays").is(":checked") == true ||
			$("#admshareallowprint").is(":checked") == true ||
			$("#admshareallowupload").is(":checked") == true ||
			$("#admsharewatermark").is(":checked") == true ||
			$("#admallowsign").is(":checked") == true	)
		{
			if(validateShareEmailMobile()) {
				admShareURLsService(false);
			}
		}
	});
}

function admsharecopylinkevent(isfolder){
	unbindobject("#admsharecopylink");
	$("#admsharecopylink").click(function(){
		admCloseRowDropDown();
		admShareURLsService(true, isfolder);
	});
}

//inbound starts
function admOpenInboundRowModal(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		var idm = this.id;
		var folderid = document.getElementById(idm).getAttribute("data-id");
		var folderType = document.getElementById(idm).getAttribute("data-type");
		var path = document.getElementById(idm).getAttribute("path");
		$("#inbound_sharemodal").attr("data-folderid", folderid);
		$("#inbound_sharemodal").attr("data-foldertype", folderType);
		$("#inbound_sharemodal").attr("data-folderpath", path);
		$("#adm_mobileemailpoplist").data('maxid',0);
		admOpenInboundShare();
	});
}

//share security
function admopensharedsecurity(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		var idm = this.id;
		var foldername = document.getElementById(this.id).getAttribute("data-foldername");
		$("#div_user_permission_text").html("Set User Permission for " + foldername);
		admOpenShareSecurity(this.id);
	});
}

//Folder download
function admdownloadfolder(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		var idm = this.id;
		var folderid = document.getElementById(this.id).getAttribute("data-id");
		var foldername = document.getElementById(this.id).getAttribute("data-foldername");
		var allowdn = false;
		var v = admSharedFoldersPermission[folderid]+"";
		if(v != "null" && v != "undefined" && v.indexOf("Y#") == 0){
			allowdn = true;
		} else if(v == "null" || v == "undefined") {
			allowdn = true;
		} else if(admcurrentfoldertype == admpersonaltype) {
			allowdn = true;
		}

		if(allowdn) {
			if(dowloadfolderidsui[folderid] == undefined || dowloadfolderidsui[folderid] == null){
				idm = idm.replace("adm_download_folder_", "");
				folderdownloadids[folderdownloadids.length]=folderid;
				folderdownloadidms[folderdownloadidms.length]=idm;
				admFetchFolderSizeService(folderid, foldername, idm, false);
				$("#adm_download_folder_progress_"+idm).css("display", "");
				$("#adm_download_folder_progress_img_"+idm).css("display", "");
				$("#adm_download_folder_"+idm).css("display", "none");
			}else admShowconfirmmsg(adm_messages.folderalraedyindownloadlist, confirm_Error, 5000, "", false, false);
		} else {
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		}
	});
}

function admdownloadfolderOriginal(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		var idm = this.id;
		var folderid = document.getElementById(this.id).getAttribute("data-id");
		var foldername = document.getElementById(this.id).getAttribute("data-foldername");
		idm = idm.replace("adm_download_org_", "");
		folderdownloadids[folderdownloadids.length]=folderid;
		folderdownloadidms[folderdownloadidms.length]=idm;
		admFetchFolderSizeService(folderid, foldername, idm, true);
		$("#adm_download_folder_progress_"+idm).css("display", "");
		$("#adm_download_folder_progress_img_"+idm).css("display", "");
		$("#adm_download_org_"+idm).css("display", "none");
		$("#adm_download_folder_"+idm).css("display", "none");
	});
}

function admOpenInboundCloseModal(){
	unbindobject("#inbound_admsharecancel");
	$("#inbound_admsharecancel").click(function(){
		admCloseRowDropDown();
		admInboundClose();
	});
}

function admOpenInboundDoneModal(){
	unbindobject("#inbound_admsharesend");
	$("#inbound_admsharesend").click(function(){
		admCloseRowDropDown();
		admInboundShareURLsService();
	});
}
//inbound ends

function admOpenShareEmailModal(){
	unbindobject("#admaddreceiver,#inbound_admaddreceiver");
	$("#admaddreceiver,#inbound_admaddreceiver").click(function(){
		admCloseRowDropDown();
		admopenmobileemailshare();
	});
}

function admAddNewShareEmailRow(){
	unbindobject("#admnewemailbtn");
	$("#admnewemailbtn").click(function(){
		admCloseRowDropDown();
		setTimeout(function(){addsharemobileemailrow();},1000);
	});
}

function admShareMobileRowEvents(index){
	unbindobject("#adm_mobiledelete_"+index);
	$("#adm_mobiledelete_"+index).click(function(){
		admCloseRowDropDown();
		var idm = this.id;
		var id = idm.replace("adm_mobiledelete_", "amd_emaildetailsrow_");
		$("#"+id).html("");
		$("#"+id).remove();
		var datapresent = $("#adm_mobileemailpoplist").html().trim().length;
		if(datapresent == 0) addsharemobileemailrow();
	});

	unbindobject("#adm_mobileemailselectmobile_"+index);
	$("#adm_mobileemailselectmobile_"+index).click(function(){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_mobileemailselectmobile_", "");
		admSelectOneEmailSecurity(index, this.id);
	});

	unbindobject("#adm_mobileemailselectemail_"+index);
	$("#adm_mobileemailselectemail_"+index).click(function(){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_mobileemailselectemail_", "");
		admSelectOneEmailSecurity(index, this.id);
	});

	unbindobject("#adm_mobileemailselectno_"+index);
	$("#adm_mobileemailselectno_"+index).click(function(){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_mobileemailselectno_", "");
		admSelectOneEmailSecurity(index, this.id);
	});

	unbindobject("#adm_mobileemail_txt1_"+index);
	$("#adm_mobileemail_txt1_"+index).blur(function(){
		admCloseRowDropDown();
		var id = this.id;
		var email = $(this).val();
		var indx = adm_emailIdArray.indexOf(email);
	});
}

function admShareEmailCloseModal(){
	unbindobject("#btnshareemailclose");
	$("#btnshareemailclose").click(function(){
		admCloseRowDropDown();
		hideActionPopup("shareemailmodal");
		$("body").addClass("modal-open");
		$('#shareemailmodal').modal('handleUpdate');
	});
}

function admShareEmailDoneModal(){
	unbindobject("#btnshareemaildone");
	$("#btnshareemaildone").click(function(){
		admCloseRowDropDown();
		if(validateShareEmailMobile()) {
			hideActionPopup("shareemailmodal");
			$("body").addClass("modal-open");
			$('#shareemailmodal').modal('handleUpdate');
		}
	});
}

function admInfiniteDaysShare(){
	unbindobject("#admshareinfinitedays");
	$("#admshareinfinitedays").click(function(){
		admCloseRowDropDown();
		if($(this).is(":checked")){
			$("#admsharenoofdays").removeAttr("readonly");
			$("#admsharenoofdays").val("10 years");
		} else {
			$("#admsharenoofdays").removeAttr("readonly");
			$("#admsharenoofdays").val("30");
		}
	});
}
// Collaborate
function admShareAllowUpload(){
	unbindobject("#admshareallowupload");
	$("#admshareallowupload").click(function(){
		admCloseRowDropDown();
	});
}

// Watermark
function admShareWatermark(){
	unbindobject("#admsharewatermark");
	$("#admsharewatermark").click(function(){
		admCloseRowDropDown();
	});
}

// Sign button
function admShareAllowSign(){
	unbindobject("#admallowsign");
	$("#admallowsign").click(function(){
		admCloseRowDropDown();
	});
}

function admHeaderCheckboxChecked(){
	unbindobject("#admallcheckbox");
	$("#admallcheckbox").click(function(){
		admCloseRowDropDown();
		var strfiles = "";
		var totalfilesselected = 0;
		if($("#admallcheckbox").is(":checked")){
			$(".admcheckbox").prop("checked", true);
			totalfilesselected = $("input.admcheckbox:checked").length;
			strfiles = " | "+totalfilesselected+ " selected"+" | "+admtotaldocs+ " files";
		} else {
			$(".admcheckbox").prop("checked", false);
			if(admttotalfile == 1) {
				strfiles = " | "+admtotaldocs+ " file";
			} else {
				strfiles = " | "+admtotaldocs+ " files";
			}
		}
		$("#admtotalfilesheader").html(strfiles);
		admSetSearchHeader();
	});
}

function admselectfilesevent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		var strfiles = "";
		var totalfilesselected = $("input.admcheckbox:checked").length;
		if(totalfilesselected == 1) {
			strfiles = " | "+totalfilesselected+ " selected"+" | "+admtotaldocs+ " files";
		} else {
			strfiles = " | "+totalfilesselected+ " selected"+" | "+admtotaldocs+ " files";
		}
		$("#admtotalfilesheader").html(strfiles);
		admSetSearchHeader();
	});
}

function admMoreAllClickEvent(){
	unbindobject("#moreall");
	$("#moreall").click(function() {
		$("#searchpopup").slideUp();
		if(admCheckTrashDocSelected()){
			$("#adm_share_file").hide();
			$("#adm_copy_file").hide();
			$("#adm_move_file").hide();
			$("#adm_delete_file").show();
			$("#adm_choose_viewer").hide();
			$("#adm_download_file").hide();
			$("#adm_download_file_org").hide();
			$("#adm_restore_file").show();
			$("#adm_deletepermanent_file").show();

		} else {
			admShowHideMoreMenu();
			$("#adm_choose_viewer").show();
			$("#adm_restore_file").hide();
		}
	});
}

function admDownloadCommon(){
	unbindobject("#adm_download_file");
	$("#adm_download_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			var dcids = admgetDocidsDownload();
			var jsonInput = {
				attribute1:dcids,
				attribute2:1,
				attribute3:1,
				attribute4:0,
				boolAttribute1:false
			};
			admDownloadZipFile(jsonInput);
			var dsfid=(jsonInput.attribute1).split(",");
				if(dsfid.length==1){
				admShowconfirmmsg(adm_messages.admdownloadstartedSingleFile, confirm_Success, 5000, "", false, false);
				}else{
				admShowconfirmmsg(adm_messages.admdownloadstartedzip, confirm_Success, 5000, "", false, false);
				}
			admUnSelectAllCheckBox();
		}
	});

	unbindobject("#adm_download_file_org");
	$("#adm_download_file_org").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			var dcids = admgetDocidsDownload();
			var jsonInput = {
				attribute1:dcids,
				attribute2:1,
				attribute3:1,
				attribute4:0,
				boolAttribute1:true
			};
			admDownloadZipFile(jsonInput);
			var dsfid=(jsonInput.attribute1).split(",");
				if(dsfid.length==1){
				admShowconfirmmsg(adm_messages.admdownloadstartedSingleFile, confirm_Success, 5000, "", false, false);
				}else{
				admShowconfirmmsg(adm_messages.admdownloadstartedzip, confirm_Success, 5000, "", false, false);
				}
			admUnSelectAllCheckBox();
		}
	});
}

function admOpenShareCommon(){
	unbindobject("#adm_share_file");
	$("#adm_share_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			admopenshare(false);
		}
	});

	unbindobject("#admsharereadonly");
	$("#admsharereadonly").click(function() {
		if($(this).is(":checked")){
			$("#admshareallowprint").prop("checked", false);
		}else{
			$("#admsharereadonly").prop("checked", true);
		}
	});

	unbindobject("#admshareallowprint");
	$("#admshareallowprint").click(function() {
		if($(this).is(":checked")){
			$("#admsharereadonly").prop("checked", false);
		}else{
			$("#admsharereadonly").prop("checked", true);
		}
	});
}

function admOpenCopyCommon(){
	unbindobject("#adm_copy_file");
	$("#adm_copy_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			$("#admcopyheader").html("COPY FILES");
			$("#copymodal").attr("action", "copy");
			admCopyCommonAction(this);
		}
	});
}

function admOpenMoveCommon(){
	unbindobject("#adm_move_file");
	$("#adm_move_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			$("#admcopyheader").html("MOVE FILES");
			$("#copymodal").attr("action", "move");
			admCopyCommonAction(this);
		}
	});
}

function admOpenDeleteCommon(){
	unbindobject("#adm_delete_file");
	$("#adm_delete_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			admDeleteDocs("");
		}
	});
}

function admOpenChooseViewer(){
	unbindobject("#adm_choose_viewer");
	$("#adm_choose_viewer").click(function() {
		if(localStorage.viewertype == "NORMAL_VIEWER"){
			$("#radio_viewer_type_1").attr("checked",true);
		}else if(localStorage.viewertype == "ADOBE_VIEWER"){
			$("#radio_viewer_type_2").attr("checked",true);
		}
		$("#adm_viewer_type_open").html("Done");
		showActionPopup("adm_viewer_type");
	});
}

function admOpenRestoreCommon(){
	unbindobject("#adm_restore_file");
	$("#adm_restore_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			admrestoreTrashedDocs("");
		}
	});
}

var temparrdel = [];
var temparrdelindex = "";
function admOpenDeletePermanentCommon(){
	unbindobject("#adm_deletepermanent_file");
	$("#adm_deletepermanent_file").click(function() {
		admCloseRowDropDown();
		if(admCheckIfOneDocumentSelected()){
			temparrdel = [];
			temparrdelindex = "";
			var x = $('input.admcheckbox:checked');
			for(i=0;i<x.length;i++){
				if($(x[i]).is(':checked')){
					var index = (x[i].id).replace("adm_doc_checkbox_", "");
					var dcid = document.getElementById(x[i].id).getAttribute("data-id");
					var status = document.getElementById(x[i].id).getAttribute("data-status");
					temparrdel[dcid] = index;
					if(temparrdelindex.length == 0 && status != "D") {
						temparrdelindex = dcid;
					} else if(temparrdelindex.length > 0 && status != "D"){
						temparrdelindex = temparrdelindex + "," + dcid;
					}
				}
			}
			$("#deleteconfirmmodal").attr("folderid", 0);
			$("#deleteconfirmmodal").attr("fileid", 0);
			$("#deleteconfirmmodal").attr("index", 0);
			$("#deleteconfirmmodal").attr("multifile", true);
			showActionPopup("deleteconfirmmodal");
		}
	});
}

function admfetchprojectIndexEvent(){
	unbindobject("#adm_projectindex");
	$("#adm_projectindex").click(function() {
		admCloseRowDropDown();
		if(admTreeFolderSelectedId > -1){
			ajaxindicatorstart('generating index.. please wait..');
			if(admTreeFolderSelectedId > -1){
				admfetchProjectIndexService(admTreeFolderSelectedId);
			}
		} else {
			admShowconfirmmsg(adm_messages.selecttreefolder, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#adm_rootprjindex");
	$("#adm_rootprjindex").click(function() {
		admCloseRowDropDown();
		ajaxindicatorstart('generating index.. please wait..');
		admfetchProjectIndexService(admcurrentfolderid);
	});

	unbindobject("#adm_rebuildindex");
	$("#adm_rebuildindex").click(function() {
		admCloseRowDropDown();
		showActionPopup("rebuildModal");
		var r = adm_messages.foldereebuildindex;
		var html = "";
		html += "<h5>"+r+"</h5>";
		$("#rebuildIndex").html(html);
		rebuildIndexOKModal();
	});

	unbindobject("#adm_refreshtree");
	$("#adm_refreshtree").click(function() {
		admCloseRowDropDown();
		if(admTreeFolderSelectedId > -1){
			if(admcurrentfolderid > 0){
				admSelectedFolderListAllService();
			} else {
				fetchAllFolderListDetails(admcurrentfoldertype);
			}
		} else {
			admShowconfirmmsg(adm_messages.selecttreefolder, confirm_Error, 5000, "", false, false);
		}
	});

	unbindobject("#adm_indexnavigate");
	$("#adm_indexnavigate").click(function() {
		admCloseRowDropDown();
		if(admTreeFolderSelectedId > -1){
			var folderId = admTreeFolderSelectedId;
			var path = admListDataId[folderId];
			path = path.replace("root/", "");
			path = path.replace("Root/", "");
			admFolderClickCommon(path, admcurrentfoldertype, folderId);
			hideActionPopup("modalfoldertree");
		} else {
			admShowconfirmmsg(adm_messages.selecttreefolder, confirm_Error, 5000, "", false, false);
		}
	});

}

function rebuildIndexOKModal(){
	unbindobject("#rebuildIndexmodalOK");
	$("#rebuildIndexmodalOK").bind("click",function(event) {
		ajaxindicatorstart('rebuilding index.. please wait..');
		admRebuildProjectIndexService();
	});
}

/**
 * method to make document important hot unhot
 * @param id
 */
function admmakeImportant(id){
	unbindobject("#"+id);
	$("#"+id).click(function() {
		admCloseRowDropDown();
		$(this).attr("disabled", true);
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				var docid = document.getElementById(this.id).getAttribute("data-id");
				var flag = 0;
				if($(this).hasClass("flagcommon")){
					flag = 1;
				} else {
					flag = 0;
				}

				admmakeImportanhtService(this.id, docid, flag);
			} else {
				admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
			}
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

/*
Mark the document for signing
*/
function admMarkToSignDocument(id){
	unbindobject("#"+id);
	$("#"+id).click(function(event){
		admCloseRowDropDown();
		var ibjid = this.id;
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			$(this).attr("disabled", true);
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				var docid = document.getElementById(this.id).getAttribute("data-id");
				var sign = 0;
				if($(this).hasClass("flagcommon")){
					sign = 1;
				} else {
					sign = 0;
				}
				admMarkForSignDocService(docid, sign, ibjid);
			} else {
				admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
			}
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

/*
lock the document
*/
function admLockDocument(id){
	unbindobject("#"+id);
	$("#"+id).click(function(event){
		admCloseRowDropDown();
		var ibjid = this.id;
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			$(this).attr("disabled", true);
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				var docid = document.getElementById(this.id).getAttribute("data-id");
				if($(this).hasClass("flagred")){
					admMarkForLockDocService(docid, 0, ibjid);
				} else if($(this).hasClass("flagunlocked")){
					admMarkForLockDocService(docid, 1, ibjid);
				}
			} else {
				admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
			}
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admDocumentViewerTypeClose(){
	unbindobject("#viewer_type_close");
	$("#viewer_type_close").click(function(event){
		admViewerOpened = 0;
		hideActionPopup("adm_viewer_type");
		if(adm_viewer_docid_versionid > -1){
			showActionPopup("versionmodal");
		}
	});
}

function admDocumentViewerTypeSelect(){
	unbindobject("#adm_viewer_type_open");
	$("#adm_viewer_type_open").click(function(event){
		var radioValue = $("input[name='radio_viewer_type']:checked").val()+"";
		if(radioValue != "undefined"){
			if($("#adm_viewer_type_open").html() == "Open"){
				$("#adm_viewer").attr("viewertype", radioValue);
				hideActionPopup("adm_viewer_type");
				if(adm_viewer_docid_versionid == -1){
					localStorage.viewertype = radioValue;
					var storedviewertype = localStorage.viewertype+"";
					if(adm_viewer_docid_idm == -1 || adm_viewer_docid_idm == "-1"){
						admDisplayDocViewer(adm_viewer_docid, "null", radioValue, adm_viewer_folderid);
					} else {
						admDisplayDocViewer(document.getElementById("adm_filenm_"+adm_viewer_docid_idm).getAttribute("data-id"), adm_viewer_docid_idm, radioValue, adm_viewer_folderid);
					}

					$("#adm_filenm_"+adm_viewer_docid_idm).hide();
					$("#adm_filenm_progress_"+adm_viewer_docid_idm).show();
				} else {
					showActionPopup("versionmodal");
					var extraparamjson = {"idm":adm_viewer_docid_idm};
					admDisplayDocViewerVersion(adm_viewer_docid, adm_viewer_docid_versionid, extraparamjson, radioValue);
					$("#adm_version_filenm_progress_"+adm_viewer_docid_idm).show();
					$("#adm_version_filenm_"+adm_viewer_docid_idm).hide();
				}
			} else if($("#adm_viewer_type_open").html() == "Done"){
				localStorage.viewertype = radioValue;
				hideActionPopup("adm_viewer_type");
			}
		} else {
			admShowconfirmmsg(adm_messages.viewerchoosetype, confirm_Error, 5000, "", false, false);
		}
	});
}

function admViewDocument(id,showviewer,isLocked){
	unbindobject("#"+id);
	$("#"+id).click(function(event){
		admCloseRowDropDown();
		if(admViewerOpened == 0){
			var ibjid = this.id;
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
			if(showviewer) {
				try {
					adm_viewer_locked = isLocked;
					admViewerOpened = 1;
					
						var filesize = document.getElementById(this.id).getAttribute("data-size");
						if(filesize > 314572800){
							admViewerOpened = 0;
							admShowconfirmmsg(adm_messages.viewermorethan300MB, confirm_Error, 5000, "", false, false);
						} else {
							var idm = (this.id).replace("adm_filenm_", "");
							var fileType = document.getElementById(this.id).getAttribute("data-filetype");
							var versionNumber = $("#admfileversionname_"+idm).html();
							var filenm = document.getElementById(this.id).getAttribute("data-filename");
							var docid = document.getElementById(this.id).getAttribute("data-id");
							if(filenm.indexOf(".") > 0){
								adm_viewer_docid = docid;
								adm_viewer_doc_version = versionNumber;
								adm_viewer_folderpath = "";
								adm_viewer_foldertype = admcurrentfoldertype;
								adm_viewer_filetype = fileType;
								adm_viewer_folderid = admcurrentfolderid;
								adm_viewer_docid_idm = idm;
								adm_viewer_docid_versionid = -1;
								var $iframe = $("#adm_viewerboxid");
								$iframe.attr("src","about:blank");
								var radioValue = $("input[name='radio_viewer_type']:checked").val()+"";
								localStorage.viewertype = radioValue;
								var viewtype = localStorage.viewertype+"";
								fileType = fileType.toLowerCase();
								if(fileType != "doc" && fileType != "docx" && fileType != "docm" && fileType != "ppt" && fileType != "pptx" && fileType != "pptm" && fileType != "pdf"
								 	&& fileType != "jpeg" && fileType != "jpg" && fileType != "png" && fileType != "gif" && fileType != "tif" && fileType != "tiff" && fileType != "txt"
									&& fileType != "xml" && fileType != "js" && fileType != "eml" && fileType != "msg" && fileType != "rtf"){
									viewtype = "NORMAL_VIEWER";
								}
								if(viewtype == "undefined" && (fileType == "doc" || fileType == "docx" || fileType == "docm"
										|| fileType == "ppt" || fileType == "pptx" || fileType == "pptm" || fileType == "pdf" || fileType == "rtf"
										|| fileType == "tif" || fileType == "tiff")){
									$("#adm_viewer_type_open").html("Open");
									showActionPopup("adm_viewer_type");
								} else {
									admDisplayDocViewer(document.getElementById(this.id).getAttribute("data-id"), idm, viewtype, adm_viewer_folderid);
									$(this).hide();
									$("#adm_filenm_progress_"+idm).show();
								}
							} else {
								admViewerOpened = 0;
								admShowconfirmmsg(adm_messages.couldnotopenFile, confirm_Error, 5000, "", false, false);
							}
						}
					
				} catch(error){
					admViewerOpened = 0;
				}
			} else {
				admViewerOpened = 0;
				admShowconfirmmsg(adm_messages.couldnotopenFile, confirm_Error, 5000, "", false, false);
			}

			} else {
						admViewerOpened = 0;
						admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
					}
		} else {
			admShowconfirmmsg(adm_messages.viewerrequestinprocess, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admViewversion(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		if(admViewerOpened == 0){
			admViewerOpened = 1;
			incrtag = 0;
			var idm = (this.id).replace("adm_download_Version_View_Popup_", "");
			var id = document.getElementById(this.id).getAttribute("data-id");
			var docid = document.getElementById(this.id).getAttribute("data-fileid");
			var fileType = document.getElementById(this.id).getAttribute("data-filetype");

			adm_viewer_docid = docid;
			adm_viewer_docid_versionid = id;
			adm_viewer_filetype = fileType;
			adm_viewer_docid_idm = idm;

			var extraparamjson = {"idm":idm};
			var $iframe = $("#adm_viewerboxid");
			if ($iframe.length) {
				$iframe.attr("src","about:blank");
			}

			var viewtype = localStorage.viewertype+"";
			if(viewtype == "undefined" && (fileType == "doc" || fileType == "docx" || fileType == "docm"
					|| fileType == "ppt" || fileType == "pptx" || fileType == "pptm" || fileType == "pdf" || fileType == "rtf")){
				hideActionPopup("versionmodal");
				$("#adm_viewer_type_open").html("Open");
				showActionPopup("adm_viewer_type");
			} else {
				admDisplayDocViewerVersion(docid, id, extraparamjson, viewtype);
				$("#adm_version_filenm_progress_"+idm).show();
				$("#adm_version_filenm_"+idm).hide();
			}
		} else {
			admShowconfirmmsg(adm_messages.viewerrequestinprocess, confirm_Error, 5000, "", false, false);
		}
	});
}

function admDownloadDocument(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(event){
		admCloseRowDropDown();
		var ibjid = this.id;
		var idm = (this.id).replace("admdownloadfile_", "");
		var status = document.getElementById(this.id).getAttribute("data-status");
		if(status != "D"){
			var docid = document.getElementById(this.id).getAttribute("data-id");
			admStartDefaultDownload(docid, false);
		} else {
			admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admDownloadOriginal(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(event){
		admCloseRowDropDown();
		var ibjid = this.id;
		var idm = (this.id).replace("admdocrowiconsorg_", "");
		var status = document.getElementById(this.id).getAttribute("data-status");
		if(status != "D"){
			var docid = document.getElementById(this.id).getAttribute("data-id");
			admStartDefaultDownload(docid, true);
		} else {
			admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admRowEdit(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		$("#rename_admfilename").removeAttr('disabled');
		admCloseRowDropDown();
		permcheckactionafter = "renamefile";
		permcheckactionafterparams = this.id;
		var folderid = document.getElementById(this.id).getAttribute("data-folderid");
		admCheckFolderSecurityService(folderid);
		return false;
	});
}

function admRowShare(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				$("#sharemodal").attr("data-folderid", 0);
				var fileid = document.getElementById(this.id).getAttribute("data-id");
				var filename = document.getElementById(this.id).getAttribute("data-filename");
				$("#sharemodal").attr("data-fileid", fileid);
				$("#sharemodal").attr("data-filename", filename);
				admUnSelectAllCheckBox();
				admopenshare(false);
			} else {
				admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
			}
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admRowDelete(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				admUnSelectAllCheckBox();
				var index = (this.id).replace("admdocrowiconsdelete_", "");
				var fileid = document.getElementById(this.id).getAttribute("data-id");
				var folderid = document.getElementById(this.id).getAttribute("data-folderid");
				var arr = [];
				arr[fileid] = index;
				var jsonInput = {"attribute1":fileid,"ids":arr,"permdel":false, "attribute2":admcurrentfoldertype};
				admDeleteDocs(jsonInput);
			}
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admRowRestore(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			var status = document.getElementById(this.id).getAttribute("data-status");
			admUnSelectAllCheckBox();
			var fileid = document.getElementById(this.id).getAttribute("data-id");
			ajaxindicatorstart('processing request.. please wait..');
			var index = (this.id).replace("admdocrowiconsrestore_", "");
			var fileid = document.getElementById(this.id).getAttribute("data-id");
			var folderid = document.getElementById(this.id).getAttribute("data-folderid");
			var arr = [];
			arr[fileid] = index;
			var jsonInput = {"attribute1":fileid, "ids":arr};
			admrestoreTrashedDocs(jsonInput);
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admRowPermanentDelete(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			admUnSelectAllCheckBox();
			var index = (this.id).replace("admdocrowiconstrash_", "");
			var fileid = document.getElementById(this.id).getAttribute("data-id");
			$("#deleteconfirmmodal").attr("folderid", 0);
			$("#deleteconfirmmodal").attr("fileid", fileid);
			$("#deleteconfirmmodal").attr("index", index);
			$("#deleteconfirmmodal").attr("multifile", false);
			showActionPopup("deleteconfirmmodal");
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admRefreshData(){
	unbindobject("#btnrefresh");
	$("#btnrefresh").bind("click", function(){
		admRefreshFunction();
		return false;
	});
}
/* Tree refresh button*/
function admRefreshDataTree(){
	unbindobject("#adm_refreshtree");
	$("#adm_refreshtree").bind("click", function(){
		admRefreshFunction();
		return false;
	});
}

/**
 * method to open tag popup
 * @param id
 */
function admaddtagpopupopen(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		incrtag = 0;
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			var idm = (this.id).replace("admfiletagname_", "");
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				var docid = document.getElementById(this.id).getAttribute("data-id");
				$("#tbltagrows").html("");
				$("#admtagnewtxt").val("");
				admFetchTags(docid);
				$("#tagmodal").attr("data-fileid", docid);
				showActionPopup("tagmodal");
			} else {
				admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
			}
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admTagPopupClose(){
	unbindobject("#admtagcancel");
	$("#admtagcancel").bind("click", function() {
		admCloseRowDropDown();
		$("#admtagnewtxt").val("");
		hideActionPopup("tagmodal");
		return false;
	});
}

function admDeleteTag(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		var idk = $(this).attr("id");
		incrtag = 0;
		var idm = (idk).replace("adm_del_Tags_Popup_", "");
		var id = document.getElementById(idk).getAttribute("data-id");
		var docid = document.getElementById(idk).getAttribute("data-fileid");
		ajaxindicatorstart('processing request.. please wait..');
		admDeleteTags(id,docid);
		return false;
	});
}

function admtagAddRowAction(){
	unbindobject("#admtagsave");
	$("#admtagsave").click(function() {
		admCloseRowDropDown();
		var str = $("#admtagnewtxt").val();
		if(($.trim(str)).length >= 3){
			var docid = document.getElementById("tagmodal").getAttribute("data-fileid");
			var tagexists = admCheckTagExists(str.toLowerCase());
			if(admCheckFolderNameFormat(str)){
				if(!tagexists){
					ajaxindicatorstart('processing request.. please wait..');
					admAddTags(str, docid);
				}
			} else {
				admShowconfirmmsg(adm_messages.admtagnameformat, confirm_Error, 5000, "", false, false);
			}
		} else {
			admShowconfirmmsg(adm_messages.admtagnamelength, confirm_Error, 5000, "", false, false);
		}
	});
}

function admaddversionpopupopen(id){
	unbindobject("#"+id);
	$("#"+id).click(function() {
		admCloseRowDropDown();
		if(admopenversionpopupstatus == false){
			admopenversionpopupstatus = true;
			incrtag = 0;
			var status = document.getElementById(this.id).getAttribute("data-status");
			if(status != "D"){
				var idm = (this.id).replace("admfileversionname_", "");
				var docid = document.getElementById(this.id).getAttribute("data-id");
				$("#tblversionrows").html("");
				$("#versionmodal").attr("data-fileid", docid);
				$("#versionmodal").attr("data-index", idm);
				admFetchVersion(docid);
				showActionPopup("versionmodal");
			} else {
				admopenversionpopupstatus = false;
				admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
			}
		}
	});
}

function admVersionPopupClose(){
	unbindobject("#admversioncancel");
	$("#admversioncancel").bind("click", function() {
		admCloseRowDropDown();
		hideActionPopup("versionmodal");
		admViewerOpened = 0;
		return false;
	});
}

function admDeleteVersion(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		incrtag = 0;
		var fileidm = document.getElementById("versionmodal").getAttribute("data-index");
		var locked = document.getElementById("adm_doc_row_"+fileidm).getAttribute("data-locked");
		if(locked == 0){
			var idm = (this.id).replace(adm_del_Version_Popup_, "");
			var id = document.getElementById(this.id).getAttribute("data-id");
			var docid = document.getElementById(this.id).getAttribute("data-fileid");
			admDeleteVersionService(id,docid);
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admCloseViewerPopup(){
	unbindobject("#admviewerfooter");
	$("#admviewerfooter").bind("click", function() {
		var $iframe = $("#adm_viewerboxid");
		if ($iframe.length) {
			$iframe.attr("src","about:blank");
			hideActionPopup("adm_Viewer");
		}
	});
}

function admDownloadversion(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		incrtag = 0;
		var id = document.getElementById(this.id).getAttribute("data-id");
		var docid = document.getElementById(this.id).getAttribute("data-fileid");
		var jsonInput = {
				attribute1:docid,
				attribute2:1,
				attribute3:1,
				attribute4:id
		};

		admDownloadZipFile(jsonInput);
		var dsfid=(jsonInput.attribute1).split(",");
			if(dsfid.length==1){
			admShowconfirmmsg(adm_messages.admdownloadstartedSingleFile, confirm_Success, 5000, "", false, false);
			}else{
			admShowconfirmmsg(adm_messages.admdownloadstartedzip, confirm_Success, 5000, "", false, false);
			}
		return false;
	});
}

function admVersionAddAction(){
	unbindobject("#"+adm_div_addVersionField);
	$("#"+adm_div_addVersionField).bind("click", function() {
		admCloseRowDropDown();
		document.getElementById("adm_fileuploadId").contentWindow.openAtcPopup();
		return false;
	});
}

function admCopyTabClickEvent(){
	unbindobject("#acopypersonal");
	$("#acopypersonal").bind("click", function() {
		admCloseRowDropDown();
		$("#acopypersonal").addClass("activetab");
		$("#acopydataroom").removeClass("activetab");
		admCopyParentId = 0;
		admCopyFolderType = admpersonaltype;
		admSetCopyFolderHeaderCaption("");
		admFetchFoldersByParentId("admCopyFolderPopulate");
	});

	unbindobject("#acopydataroom");
	$("#acopydataroom").bind("click", function() {
		admCloseRowDropDown();
		if(localStorage._zs == "B") {
			$("#acopydataroom").addClass("activetab");
			$("#acopypersonal").removeClass("activetab");
			admCopyParentId = 0;
			admCopyFolderType = admsharedtype;
			admSetCopyFolderHeaderCaption("");
			admFetchFoldersByParentId("admCopyFolderPopulate");
		} else {
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		}
	});
}

function admRowCopy(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		$("#copymodal").removeAttr("data-id");
		var status = document.getElementById(this.id).getAttribute("data-status");
		if(status != "D"){
			$("#admcopyheader").html("COPY FILES");
			var index = this.id.replace("admdocrowiconscopy_", "");
			$("#adm_doc_checkbox_"+index).prop("checked", true);
			$("#copymodal").attr("data-id", this.id);
			$("#copymodal").attr("action", "copy");
			admCopyCommonAction(this);
		} else {
			admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admRowMove(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function(){
		admCloseRowDropDown();
		$("#copymodal").removeAttr("data-id");
		var status = document.getElementById(this.id).getAttribute("data-status");
		if(status != "D"){
			$("#admcopyheader").html("MOVE FOLDERS");
			var index = this.id.replace("admdocrowiconsmove_", "");
			$("#adm_doc_checkbox_"+index).prop("checked", true);
			$("#copymodal").attr("data-id", this.id);
			$("#copymodal").attr("action", "move");
			admCopyCommonAction(this);
		} else {
			admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admCopyFolderClickMoreEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		if($(this).hasClass("rowhighlight")){
			var folderpath = document.getElementById(this.id).getAttribute("path");
			admSetCopyFolderHeaderCaption(folderpath);
			admFetchFoldersByParentId("admCopyFolderPopulate");
		} else {
			$(".copyrow").removeClass("rowhighlight");
			$(this).addClass("rowhighlight");
			admCopyParentId = document.getElementById(this.id).getAttribute("data-id");
		}
	});
}

function admCopyFolderClickMoreRowEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admCloseRowDropDown();
		admCopyParentId = document.getElementById(this.id).getAttribute("data-id");
		var folderpath = document.getElementById(this.id).getAttribute("data-path");
		admSetCopyFolderHeaderCaption(folderpath);
		admFetchFoldersByParentId("admCopyFolderPopulate");
	});
}

function admCopyCloseEvent(){
	unbindobject("#admcopycancel");
	$("#admcopycancel").click(function(){
		admCloseRowDropDown();
		hideActionPopup("copymodal");
		admUnSelectAllCheckBox();
	});
}

function admCopyDoneEvent(){
	unbindobject("#btncopydone");
	$("#btncopydone").click(function(){
		admCloseRowDropDown();
		tempTotalSize = 0;
		var id = document.getElementById("copymodal").getAttribute("data-id");
		var action = document.getElementById("copymodal").getAttribute("action");
		var x = $('input.admcheckbox:checked');
		var dcids = "";
		for(i=0;i<x.length;i++){
			if($(x[i]).is(':checked')){
				var index = (x[i].id).replace("adm_doc_checkbox_", "");
				var dcid = document.getElementById(x[i].id).getAttribute("data-id");
				var vrs = parseFloat($("#admfileversionname_" + index).html());
				tempTotalSize += parseFloat(document.getElementById(x[i].id).getAttribute("data-size"))*vrs;
				if(i==0){
					dcids = dcid;
				}else{
					dcids = dcids+","+dcid;
				}
			}
		}
		$("#copymodal").attr("data-id", dcids);
		admCopyMoveService(admCopyFolderType, action, true);
	});
}

function admOpenFileUploadModal(){
	unbindobject("#btnuploadfile");
	$("#btnuploadfile").click(function(){
		isFileUpload = true;
		ajaxindicatorstart('checking allocated size... please wait..');
		admFetchStorageLeftService(true);
	});

	unbindobject("#btnuploadfolder");
	$("#btnuploadfolder").click(function(){
		var allowUpload = true;
		if(admcurrentfolderid == 0){
			if(localStorage._zp == 0){
				allowUpload = false;
			}
			if(admcurrentfoldertype == "P"){
				var allowUpload = true;
			}

			if(!allowUpload){
				admShowconfirmmsg(adm_messages.permissiondenied, confirm_Error, 5000, "", false, false);
				admCloseRowDropDown();
			}
		}

		if(allowUpload){
			isFileUpload = false;
			ajaxindicatorstart('checking allocated size... please wait..');
			fileuploadspecialchrfound = false;
			admFetchStorageLeftService(true);
		}
	});

	unbindobject("#admuploadfileclose");
	$("#admuploadfileclose").click(function(){
		admCloseRowDropDown();
		hideActionPopup("uploadfilemodal");
		adm_FolderId_FileName = [];
	});

	unbindobject("#admuploadfilecancel");
	$("#admuploadfilecancel").click(function(){
		admCloseRowDropDown();
		adm_FolderId_FileName = [];
		admcanuploadclicked = true;
		var obj = document.getElementById("adm_fileuploadId");
		obj.contentWindow.document.getElementById("btnuploadcancel").click();
	});
}

function admAllowNumbersOnly(id){
	$("#"+id).keypress(function(e){
		var keyCode = e.which;
		if ( (keyCode != 8 || keyCode ==32 ) && (keyCode < 48 || keyCode > 57)) {
			return false;
		}
  	});

  	$("#"+id).keyup(function(e){
		if(!isValidphone($(this).val())){
			$(this).val("");
		}
	});
}

function admAllowPhoneNumbersOnly(id){
	$("#"+id).keypress(function(e){
		var keyCode = e.which;
		if(keyCode == 43 || keyCode == 45){
			return true;
		} else if ( (keyCode != 8 || keyCode ==32 ) && (keyCode < 48 || keyCode > 57)) {
			return false;
		}
	});
}

function admAddUpdateSharedSecuirtyRow(idmk){
	unbindobject("#adm_security_checkbox_"+idmk);
	$("#adm_security_checkbox_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_share_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_deposit_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_delete_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_copy_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_move_"+idm).prop('checked', true);
		} else if($(this).is(':checked') == false){
			$("#adm_sec_checkbox_view_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_share_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_deposit_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_delete_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_copy_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_move_"+idm).prop('checked', false);
		}
		admPermissionIndexAdd(idm);
    });

    unbindobject("#adm_sec_checkbox_view_"+idmk);
	$("#adm_sec_checkbox_view_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
		} else if($(this).is(':checked') == false){
			$("#adm_security_checkbox_"+idm).prop('checked', false);
		}
		if(adm_var_permission=="") adm_var_permission = idm;
		else adm_var_permission = adm_var_permission + "," + idm;
		admPermissionIndexAdd(idm);
    });

	unbindobject("#adm_sec_checkbox_download_"+idmk);
	$("#adm_sec_checkbox_download_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		admPermissionIndexAdd(idm);
	});

    unbindobject("#adm_sec_checkbox_share_"+idmk);
    $("#adm_sec_checkbox_share_"+idmk).bind("click", function(event){
    	admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		admPermissionIndexAdd(idm);
    });

	unbindobject("#adm_sec_checkbox_deposit_"+idmk);
	$("#adm_sec_checkbox_deposit_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		admPermissionIndexAdd(idm);
	});

	unbindobject("#adm_sec_checkbox_delete_"+idmk);
	$("#adm_sec_checkbox_delete_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		admPermissionIndexAdd(idm);
	});

    unbindobject("#adm_sec_checkbox_copy_"+idmk);
	$("#adm_sec_checkbox_copy_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		admPermissionIndexAdd(idm);
    });

    unbindobject("#adm_sec_checkbox_move_"+idmk);
	$("#adm_sec_checkbox_move_"+idmk).bind("click", function(event){
		admCloseRowDropDown();
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		admPermissionIndexAdd(idm);
    });
}

function admSaveSharedSecurityDone(){
	unbindobject("#btn_save_shared_security");
	$("#btn_save_shared_security").bind("click", function(event){
		admCloseRowDropDown();
		admSaveSharedFolderSecurity();
		return false;
	});

	unbindobject("#admsecuritycancel");
	$("#admsecuritycancel").bind("click", function(event){
		admCloseRowDropDown();
		hideActionPopup("sharesecuritymodal");
		adm_var_permission = "";
		return false;
	});
}

function openShareManagement(){
	unbindobject("#imgsharemgmt");
	$("#imgsharemgmt").bind('click', function () {
		admCloseRowDropDown();
		if(localStorage._zu == "0020003" && admcurrentfoldertype == "shared_"){
			admShowconfirmmsg(adm_messages.notpaiduser, confirm_Error, 5000, "", false, false);
		} else {
			admOpenShareMgmt();
			showActionPopup("sharemgmtmodal");
			$("#searchpopup").slideUp();
		}
	});
}

function admChangeShareMgmtTabs(){
	unbindobject("#adm_sharemgmt_share");
	$("#adm_sharemgmt_share").bind('click', function () {
		admCloseRowDropDown();
		admOpenShareMgmt();
	});

	unbindobject("#adm_sharemgmt_deposit");
	$("#adm_sharemgmt_deposit").bind('click', function () {
		admCloseRowDropDown();
		$(this).addClass("activetab");
		$("#adm_sharemgmt_share").removeClass("activetab");
		$("#tblsharemgmtrows").empty();
		$("#tblinboundrows").empty();
		$("#outboundsharemgmt").hide();
		$("#inboundsharemgmt").show();
		admsharemgmtopened = true;
		admsharemgmtmaxlimit = 0;
		admShareMgmtInboundListService();
	});

	unbindobject("#admsharemgmtcancel");
	$("#admsharemgmtcancel").bind('click', function () {
		admCloseRowDropDown();
		$("#sharemgmtmodal").modal("hide");
	});
}

function admDeleteFileNameClick(id){
	unbindobject("#"+id);
	$("#"+id).bind("click",function(event){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_del_sgmt_", "");
		var loginid = document.getElementById("adm_del_sgmt_"+index).getAttribute("data-id");
		$("#shrdeleteconfirm").attr("loginid", loginid);
		$("#shrdeleteconfirm").attr("index", index);
		$("#shrdeleteconfirm").attr("type", "OUT");
		showActionPopup("shrdeleteconfirm");
		return false;
	});
}

function admShareDownloadChange(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		var idm = this.id;
		idm = idm.replace("adm_smgmt_read_checkbox_", "");
		var shareLoginId = document.getElementById(this.id).getAttribute("data-id");
		if($(this).is(':checked')) {
			admAllowDownloadOutboundShare(shareLoginId, "N");
			$("#adm_smgmt_print_checkbox_"+idm).attr("checked", false);
			$("#adm_smgmt_print_checkbox_"+idm).prop('checked', false);
			admAllowPrintOutboundShare(shareLoginId, "N", "false");
		} else {
			admAllowDownloadOutboundShare(shareLoginId, "Y");
		}
	});
}

function admSharePrintChange(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		var idm = this.id;
		idm = idm.replace("adm_smgmt_print_checkbox_", "");
		var shareLoginId = document.getElementById(this.id).getAttribute("data-id");
		if($(this).is(':checked')) {
			if($("#adm_smgmt_read_checkbox_"+idm).is(':checked') == false){
				admAllowPrintOutboundShare(shareLoginId, "Y", "true");
			} else {
				$("#adm_smgmt_print_checkbox_"+idm).attr("checked", false);
				return false;
			}
		} else {
			admAllowPrintOutboundShare(shareLoginId, "N", "true");
		}
	});
}

function admShareUploadChange(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		var shareLoginId = document.getElementById(this.id).getAttribute("data-id");
		if($(this).is(':checked')) {
			admAllowUploadOutboundShare(shareLoginId, 1);
		} else {
			admAllowUploadOutboundShare(shareLoginId, 0);
		}
	});
}

function admShareSignChange(id){
	unbindobject("#"+id);
	$("#"+id).bind("click", function() {
		admCloseRowDropDown();
		var shareLoginId = document.getElementById(this.id).getAttribute("data-id");
		if($(this).is(':checked')) {
			admAllowSignOutboundShare(shareLoginId, 1);
		} else {
			admAllowSignOutboundShare(shareLoginId, 0);
		}
	});
}

function admDeleteInBoundShareClick(id){
	unbindobject("#"+id);
	$("#"+id).bind("click",function(event){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_del_inboundsgmt_", "");
		var loginid = document.getElementById(this.id).getAttribute("data-id");
		$("#shrdeleteconfirm").attr("loginid", loginid);
		$("#shrdeleteconfirm").attr("index", index);
		$("#shrdeleteconfirm").attr("type", "IN");
		showActionPopup("shrdeleteconfirm");
		return false;
	});
}

function admDeleteShareMgmtDeleteDone(){
	unbindobject("#shrbtndeleteconfirmdone");
	$("#shrbtndeleteconfirmdone").bind("click",function(event){
		admCloseRowDropDown();
		var index = document.getElementById("shrdeleteconfirm").getAttribute("index");
		var loginid = document.getElementById("shrdeleteconfirm").getAttribute("loginid");
		var type = document.getElementById("shrdeleteconfirm").getAttribute("type");
		if(type == "IN"){
			admDeleteInboundShare(loginid, index);
		} else if(type == "OUT"){
			admDeleteOutboundShare(loginid, index);
		}
		hideActionPopup("shrdeleteconfirm");
		return false;
	});
}

function admInfoInBoundShareClick(id){
	unbindobject("#"+id);
	$("#"+id).bind("click",function(event){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_info_inboundsgmt_", "");
		var loginid = document.getElementById(this.id).getAttribute("data-id");
		admInfoInboundShare(loginid);
		return false;
	});
}

function admShowFolderFileListInfo(id){
	unbindobject("#"+id);
	$("#"+id).bind("click",function(event){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_info_sgmt_", "");
		var loginid = document.getElementById(this.id).getAttribute("data-id");
		ajaxindicatorstart('loading data.. please wait..');
		admShowFolderFileListInfoService(loginid);
		return false;
	});
}

function admInfoInBoundShareInfoClick(id){
	unbindobject("#"+id);
	$("#"+id).bind("click",function(event){
		admCloseRowDropDown();
		var index = (this.id).replace("adm_info_inbound_sgmt_", "");
		var folderName = document.getElementById(this.id).getAttribute("data-name");
		var folderType = document.getElementById(this.id).getAttribute("data-foldertype");
		if(folderType == "P"){
			if(localStorage._zs == "I"){
				$("#tblsharemgmtinforows").html("Folder Type : Data Room<br>Folder Path : " + folderName);
			}else{
				$("#tblsharemgmtinforows").html("Folder Type : Personal Folder<br>Folder Path : " + folderName);
			}
		} else {
			$("#tblsharemgmtinforows").html("Folder Type : Data Room<br>Folder Path : " + folderName);
		}
		showActionPopup("sharemgmtfileinfo");
		return false;
	});
}

function admSortEvents(){
	unbindobject("#thnamesort,#namesort");
	$("#thnamesort,#namesort").bind("click",function(event){
		admCloseRowDropDown();
		var sorting = "";
		if($("#namesort").hasClass("fa-chevron-down")){
			sortingTypeDESC = "ASC";
			sorting = sortingTypeDESC+"`name";
		} else if($("#namesort").hasClass("fa-chevron-up")){
			sortingTypeDESC = "DESC";
			sorting = sortingTypeDESC+"`name";
		}
		resetSortingArrow();
		if(sortingTypeDESC == "ASC"){
			$("#namesort").removeClass("fa-chevron-down");
			$("#namesort").addClass("fa-chevron-up");
		} else if(sortingTypeDESC == "DESC"){
			$("#namesort").removeClass("fa-chevron-up");
			$("#namesort").addClass("fa-chevron-down");
		}
		$("#namesort").css("color", "#009ce7");
		$("#datesort").css("color", "#000000");
		adm_sorting = sorting;
		admUnSelectAllCheckBox();
		$("#searchpopup").slideUp();
		$("#tbldatarows").html("");
		ajaxindicatorstart('processing data.. please wait..');
		setTimeout(function(){
			if(!adm_search_progress){
				//check for folders
				adm_folder_list = admListSortSort(adm_folder_list, "folder");
				admcurrentfolderid == 0 ? admLoopFoldeListZeroLevel(adm_folder_list, false) : admCommonLoopFolderList(adm_folder_list, true);
			}

			adm_doc_list = admListSortSort(adm_doc_list, "file");
			for(var i=0;i<adm_doc_list.length;i++) {
				admLoopFileListCommon(adm_doc_list[i], i, false);
			}
			ajaxindicatorstop();
		}, 3000);

		return false;
	});

	unbindobject("#thdatesort,#datesort");
	$("#thdatesort,#datesort").bind("click",function(event){
		admCloseRowDropDown();
		var sorting = "";
		if($("#datesort").hasClass("fa-chevron-down")){
			sortingTypeDESC = "ASC";
			sorting = sortingTypeDESC+"`date";
		} else if($("#datesort").hasClass("fa-chevron-up")){
			sortingTypeDESC = "DESC";
			sorting = sortingTypeDESC+"`date";
		}
		resetSortingArrow();
		if(sortingTypeDESC == "ASC"){
			$("#datesort").removeClass("fa-chevron-down");
			$("#datesort").addClass("fa-chevron-up");
		} else if(sortingTypeDESC == "DESC"){
			$("#datesort").removeClass("fa-chevron-up");
			$("#datesort").addClass("fa-chevron-down");
		}
		$("#datesort").css("color", "#009ce7");
		adm_sorting = sorting;
		admUnSelectAllCheckBox();
		$("#searchpopup").slideUp();
		$("#tbldatarows").html("");
		ajaxindicatorstart('processing data.. please wait..');
		setTimeout(function(){
			if(!adm_search_progress){
				//check for folders
				adm_folder_list = admListSortSort(adm_folder_list, "folder");
				admcurrentfolderid == 0 ? admLoopFoldeListZeroLevel(adm_folder_list, false) : admCommonLoopFolderList(adm_folder_list, true);
			}

			adm_doc_list = admListSortSort(adm_doc_list, "file");
			for(var i=0;i<adm_doc_list.length;i++) {
				admLoopFileListCommon(adm_doc_list[i], i, false);
			}
		}, 3000);
		return false;
	});

	unbindobject("#thsizesort,#sizesort");
	$("#thsizesort,#sizesort").bind("click",function(event){
		admCloseRowDropDown();
		var sorting = "";
		if($("#sizesort").hasClass("fa-chevron-down")){
			sortingTypeDESC = "ASC";
			sorting = sortingTypeDESC+"`size";
		} else if($("#sizesort").hasClass("fa-chevron-up")){
			sortingTypeDESC = "DESC";
			sorting = sortingTypeDESC+"`size";
		}
		resetSortingArrow();
		if(sortingTypeDESC == "ASC"){
			$("#sizesort").removeClass("fa-chevron-down");
			$("#sizesort").addClass("fa-chevron-up");
		} else if(sortingTypeDESC == "DESC"){
			$("#sizesort").removeClass("fa-chevron-up");
			$("#sizesort").addClass("fa-chevron-down");
		}
		$("#sizesort").css("color", "#009ce7");
		$("#datesort").css("color", "#000000");
		adm_sorting = sorting;
		admUnSelectAllCheckBox();
		$("#searchpopup").slideUp();
		$("#tbldatarows").html("");
		ajaxindicatorstart('processing data.. please wait..');
		setTimeout(function(){
			if(!adm_search_progress){
				//check for folders
				adm_folder_list = admListSortSort(adm_folder_list, "folder");
				admcurrentfolderid == 0 ? admLoopFoldeListZeroLevel(adm_folder_list, false) : admCommonLoopFolderList(adm_folder_list, true);
			}

			adm_doc_list = admListSortSort(adm_doc_list, "file");
			for(var i=0;i<adm_doc_list.length;i++) {
				admLoopFileListCommon(adm_doc_list[i], i, false);
			}
		}, 3000);
		return false;
	});
}

function admUsernameClickTop(){
	unbindobject("#adm_myprofile");
	$("#adm_myprofile").bind("click",function(event){
		showActionPopup("userprofilemodal");
	});
	unbindobject("#user-img,#username");
	$("#user-img,#username").bind("click",function(event){
		ajaxindicatorstart('fetching profile.. please wait..');
		admSingleUserProfileService(true);
		admFetchStorageLeftService(false);
		admFetchNotifSettingsService();
		userimgbase64 = "";
	});

	unbindobject("#btn_profile_close");
	$("#btn_profile_close").bind("click",function(event){
		if(prvuserimg != ""){
			$("#muserimg").attr("src", prvuserimg);
			$("#muserimg_first").attr("src", prvuserimg);
			$("#user-img").attr("src", prvuserimg);
		}
	});

	unbindobject("#btn_save_profile");
	$("#btn_save_profile").bind("click",function(event){
		if($("#mfirstname").val().trim().length == 0){
			admShowconfirmmsg("Please enter first name", confirm_Error, 5000, "", false, false);
			return false;
		} else if($("#mlastname").val().trim().length == 0){
			admShowconfirmmsg("Please enter last name", confirm_Error, 5000, "", false, false);
			return false;
		}

		var jsonInput ="{";
		jsonInput += "\"firstName\":\""+$("#mfirstname").val()+"\"";
		jsonInput += ",\"lastName\":\""+$("#mlastname").val()+"\"";
		jsonInput += ",\"middleName\":\""+$("#mmiddlename").val()+"\"";
		jsonInput += ",\"companyName\":\""+$("#mcompany").val()+"\"";
		jsonInput += ",\"id\":\""+contact_id+"\"";
		jsonInput += "}";
		admSaveUserProfileService(JSON.parse(jsonInput));

		if(($("#mmobilenumber").val().trim()).length > 0 && phone_id > 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"" + phone_id + "\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"countryCode\":\""+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"\"";
			jsonInput += ",\"phone\":\""+$("#mmobilenumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			admUpdateUserPhone(JSON.parse(jsonInput));
			if(admotpId == 1 || admotpId == 2) admSaveOTPRecordService();
		} else if(($("#mmobilenumber").val().trim()).length > 0 && phone_id == 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"0\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"countryCode\":\""+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"\"";
			jsonInput += ",\"phone\":\""+$("#mmobilenumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			admAddUserPhone(JSON.parse(jsonInput));
			if(admotpId == 1 || admotpId == 2) admSaveOTPRecordService();
		}

		if(($("#mfaxnumber").val().trim()).length > 0 && fax_id > 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"" + fax_id + "\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"fax\":\""+$("#mfaxnumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			admUpdateUserFax(JSON.parse(jsonInput));
		} else if(($("#mfaxnumber").val().trim()).length > 0 && fax_id == 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"0\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"fax\":\""+$("#mfaxnumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			admAddUserFax(JSON.parse(jsonInput));
		}

		if(userimgbase64 !=""){
			var jsonInput = "{\"id\":\"" + contact_id + "\"";
							jsonInput += ",\"picture\":\"" + userimgbase64 + "\"}";
			admUpdateUserPicture(JSON.parse(jsonInput));
		}
		prvuserimg = "";
	});

	unbindobject("#muserimg");
	$("#muserimg").bind("click",function(event){
		$("#pickuserimg").val("");
		$("#pickuserimg").click();
	});

	$("#pickuserimg").change(function() {
		var file = document.getElementById("pickuserimg").files[0];
		var reader = new FileReader();
		  reader.onloadend = function() {
		    userimgbase64 = reader.result;
			$("#muserimg").attr("src", userimgbase64);
			$("#muserimg_first").attr("src", userimgbase64);
			$("#user-img").attr("src", userimgbase64);
		  }
		var maxSizeKB = 100; //Size in KB
		var maxSize = maxSizeKB * 1024; //File size is returned in Bytes
		if (this.files[0].size > maxSize) {
			$(this).val("");
			admShowconfirmmsg(adm_messages.profileimagesizeexceed, confirm_Error, 5000, "", false, false);
			return false;
		}
  		reader.readAsDataURL(file);
    });

    unbindobject("#adm_notifications");
	$("#adm_notifications").bind("click",function(event){
		showActionPopup("notifmodal");
	});

    unbindobject("#adm_download_desktop");
	$("#adm_download_desktop").bind("click",function(event){
		if (navigator.appVersion.indexOf("Win") != -1) {
			document.getElementById('download_iframe').src = cloudURLACT + "/DCirrus.msi";
		} else if (navigator.appVersion.indexOf("Mac") != -1) {
			window.open("https://itunes.apple.com/us/app/dcirrus/id1308163657?ls=1&mt=12", "_blank");
		}

	});
}

function admTreeClickEvent(){
	unbindobject("#adm_foldertree");
	$("#adm_foldertree").bind("click",function(event){
		if(admFolderTreeLoaded == false){
			$("#adm_foldertreeli").html("Loading folder tree... please wait..");
			admFolderListAllService(0);
		} else {
			selectednodeid = nodesList[admcurrentfolderid];
			var treeid = "default-tree-"+admcurrentfoldertype;
			$('#'+treeid).treeview('collapseAll', {silent: true});
			try{
				$('#'+treeid).treeview('revealNode', [ selectednodeid, { silent:true } ]);
				$('#'+treeid).treeview('expandNode', [ selectednodeid, { silent:true } ]);
				$('#'+treeid).treeview('selectNode', [ selectednodeid, { silent:true } ]);
			}catch(error){
				$('#'+treeid).treeview('revealNode', [ 0, { silent:true } ]);
				$('#'+treeid).treeview('expandNode', [ 0, { silent:true } ]);
				$('#'+treeid).treeview('selectNode', [ 0, { silent:true } ]);
			}
		}
		showActionPopup("modalfoldertree");
		var $container;
		if(localStorage._zs == "B"){
			$container = $("#default-tree-S");
		}else{
			$container = $("#default-tree-P");
		}
		var $scrollTo = $('.node-'+treeid+'.node-selected');
		$container.animate({scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300);
	});
}

function admDownloadStatusEvent(){
	unbindobject("#downloadingperc");
	$("#downloadingperc").bind("click",function(event){
		$("#divdownloadheader").html("Running Download Details");
		showActionPopup("modalfolderdownload");
	});

	unbindobject("#downloadmodalclose");
	$("#downloadmodalclose").bind("click",function(event){
		var cleared = true;
		$(".downloadstatus").each(function() {
			if($(this).html() != "100%"){
				cleared = false;
			}
		});
		if(cleared) {
			$("#tbldownloaddetails").html("");
			$("#downloadingperc").hide();
			dowloadfolderidsui = [];
		}
		hideActionPopup("modalfolderdownload");
	});
}

function admDownloadDetailsRemoveRow(index){
	unbindobject("#downloadclose_"+index);
	$("#downloadclose_"+index).bind("click",function(event){
		if($(this).html().indexOf("gif") < 0){
			var idm = this.id.replace("downloadclose_", "");
			admremovdownloadrow(idm);
		}
	});
}

function admNotifRadioButtonClickEvent(){
	unbindobject("#notifmodalsave");
	$("#notifmodalsave").bind("click",function(event){
		var json = {"userId":localStorage._zv, "notificationType":$("input[name='notifradio']:checked").val()};
		if(!notificationsettingspresent){
			admInsertNotifSettingsService(json);
			if(localStorage._za != 1){
				admChangeNotifStatusService();
				localStorage._za = 1;
			}
		} else {
			admUpdateNotifSettingsService(json);
		}
	});

	unbindobject("#notifmodalclose");
	$("#notifmodalclose").bind("click",function(event){
		hideActionPopup("notifmodal");
		if(localStorage._zs == "B" && localStorage._za != 1) {
			admChangeNotifStatusService();
			localStorage._za = 1;
		}
	});
}

function admHistoryLogs(){
	$('#datetimepicker1').datetimepicker({
		format: 'MM/DD/YYYY',
		debug:false,
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down",
			next: "fa fa-arrow-right",
			previous: "fa fa-arrow-left"
		}
	});
	$('#datetimepicker2').datetimepicker({
		format: 'MM/DD/YYYY',
		debug:false,
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down",
			next: "fa fa-arrow-right",
			previous: "fa fa-arrow-left"
		}
	});

	unbindobject("#btnhistory");
	$("#btnhistory").bind("click", function(event){
		showActionPopup("modaluserlogs");
	});

	unbindobject("#btnlogsexport");
	$("#btnlogsexport").bind("click", function(event){
		var val1 = $("#selectlogs").val();

		var time1 = $("#selstarttime").val();
		var now = new Date($("#datetimepicker1").data('date'));
		now.setHours(time1.split(":")[0], time1.split(":")[1], 0);
		var utc = new Date(now.getTime() - parseInt(localStorage._zr) * 60000);

		var time2 = $("#selendtime").val();
		var next = new Date($("#datetimepicker2").data('date'));
		next.setHours(time2.split(":")[0], time2.split(":")[1], 0);
		var utcnext = new Date(next.getTime() - parseInt(localStorage._zr) * 60000);

		var time3 = $("#selstarttime").val();
		var time4 = $("#selendtime").val();

		if(Number.isNaN(utc.getFullYear()) || Number.isNaN(utcnext.getFullYear())){
			admShowconfirmmsg("Enter Start and End Date Time", confirm_Error, 5000, "", false, false);
		} else if(utc > utcnext){
			admShowconfirmmsg("Enter End Date and Time greater than Start Date Time", confirm_Error, 5000, "", false, false);
		} else {
			var dtval1 = $("#datetimepicker1").data('date').replace('/', '_');
			dtval1 = dtval1.replace('/', '_');
			var dtval2 = $("#datetimepicker2").data('date').replace('/', '_');
			dtval2 = dtval2.replace('/', '_');
			if(val1.indexOf("-") > 0){
				var jsonInput ="{";
				jsonInput += "\"attribute1\":\""+val1.split("-")[0]+"\"";
				jsonInput += ",\"attribute2\":\""+val1.split("-")[1]+"\"";
				jsonInput += ",\"attribute3\":\""+timezone+"\"";
				jsonInput += ",\"dateAttribute8\":\""+utc.getFullYear()+"-"+(utc.getMonth()+1)+"-"+utc.getDate()+"T"+utc.getHours()+":"+utc.getMinutes()+":00Z\"";
				jsonInput += ",\"dateAttribute9\":\""+utcnext.getFullYear()+"-"+(utcnext.getMonth()+1)+"-"+utcnext.getDate()+"T"+utcnext.getHours()+":"+utcnext.getMinutes()+":00Z\"";
				jsonInput += "}";
				admDownloadLogsService(JSON.parse(jsonInput), val1, dtval1, time3, dtval2, time4);
			} else {
				var jsonInput ="{";
				jsonInput += "\"attribute1\":\""+val1.split("-")[0]+"\"";
				jsonInput += ",\"attribute3\":\""+timezone+"\"";
				jsonInput += ",\"dateAttribute8\":\""+utc.getFullYear()+"-"+(utc.getMonth()+1)+"-"+utc.getDate()+"T"+utc.getHours()+":"+utc.getMinutes()+":00Z\"";
				jsonInput += ",\"dateAttribute9\":\""+utcnext.getFullYear()+"-"+(utcnext.getMonth()+1)+"-"+utcnext.getDate()+"T"+utcnext.getHours()+":"+utcnext.getMinutes()+":00Z\"";
				jsonInput += "}";
				admDownloadLogsService(JSON.parse(jsonInput), val1, dtval1, time3, dtval2, time4);
			}
		}
	});

	unbindobject("#btnlogscancel");
	$("#btnlogscancel").bind("click", function(event){
		hideActionPopup("modaluserlogs");
	});
}
function admchangePass(){
	unbindobject("#adm_changepass");
	$("#adm_changepass").bind("click", function(event){
		window.location.href='changepassword.html?t='+ localStorage._zs;
	});
}
function admcreateFolderEnterKey(){
	// For create folder on enter key press
	unbindobject("admfoldername");
	$("#admfoldername").keyup(function(event){
		event.stopImmediatePropagation();
		if(event.keyCode === 13){
			$(this).attr("disabled", true);
			$(this).prop("disabled", true);
			$("#btncreatefolderdone").trigger("focus").effect('highlight',{color: '#2abfc1', border:'2px solid #2abfc1'}, 3000);
			$("#btncreatefolderdone").click();
			event.returnValue = false;
		}
		event.stopPropagation();
	});

	// For rename folder on enter key press
	unbindobject("rename_admfoldername");
	$("#rename_admfoldername").keyup(function(event){
		event.stopImmediatePropagation();
		if(event.keyCode === 13){
			$(this).attr("disabled", true);
			$(this).prop("disabled", true);
			$("#rename_btncreatefolderdone").trigger("focus").effect('highlight',{color: '#2abfc1', border:'2px solid #2abfc1'}, 3000);
			$("#rename_btncreatefolderdone").click();
			event.returnValue = false;
		}
		event.stopPropagation();
	});

	// For rename file on enter key press
	unbindobject("rename_admfilename");
	$("#rename_admfilename").keyup(function(event){
		event.stopImmediatePropagation();
		if(event.keyCode === 13){
			$(this).attr("disabled", true);
			$(this).prop("disabled", true);
			$("#rename_filedone").trigger("focus").effect('highlight',{color: '#2abfc1', border:'2px solid #2abfc1'}, 3000);
			$("#rename_filedone").click();
			event.returnValue = false;
		}
		event.stopPropagation();
	});
}

function admEnterKeyEventAddTag(){
	$("#admtagnewtxt").on('keyup', function(event){
		if (event.keyCode === 13) {
		   	event.preventDefault();
		   	$("#admtagsave").trigger("focus");
		   	$("#admtagsave").click();
		}
	});
}

function admCursorPointInTextField(){
//cursor pint inside create folder text field;
  	$('#createfoldermodal').on('shown.bs.modal', function() {
		$('#admfoldername').trigger('focus');
  	});

//cursor pint inside rename folder text field;
  	$('#rename_foldermodal').on('shown.bs.modal', function() {
		$('#rename_admfoldername').trigger('focus');
  	});

//cursor pint inside rename file text field;
  	$('#rename_filemodal').on('shown.bs.modal', function() {
		$('#rename_admfilename').trigger('focus');
  	});

//cursor pint inside tage file text field;
  	$('#tagmodal').on('shown.bs.modal', function() {
		$('#admtagnewtxt').trigger('focus');
  	});
}

function admProviderSelectEvent(){
	unbindobject("#btn_close_storage");
	$("#btn_close_storage").on('click', function (e) {
		hideActionPopup("updatestoragemodal");
	});

	unbindobject("#btn_save_storage");
	$("#btn_save_storage").on('click', function (e) {
		if(admStorageProviderValidate()){
			admSaveStorageProviderService();
		}
	});

	unbindobject("#sel_storage_provider");
	$("#sel_storage_provider").on('change', function (e) {
		if($("#ckbdefkeys").is(":checked")) {
			if($(this).val() == 2){
				$("#pid_aws_1").hide();
				$("#pid_aws_2").hide();
				$("#pid_aws_4").hide();
				$("#pid_aws_3").hide();
				$("#pid_azure_1").hide();
				$("#pid_azure_2").hide();
			} else if($(this).val() == 1){
				$("#pid_azure_1").hide();
				$("#pid_azure_2").hide();
				$("#pid_aws_1").hide();
				$("#pid_aws_2").hide();
				$("#pid_aws_4").show();
				$("#pid_aws_3").show();
			}
		} else {
			if($(this).val() == 2){
				$("#pid_aws_1").hide();
				$("#pid_aws_2").hide();
				$("#pid_aws_4").hide();
				$("#pid_aws_3").hide();
				$("#pid_azure_1").show();
				$("#pid_azure_2").show();
			} else if($(this).val() == 1){
				$("#pid_azure_1").hide();
				$("#pid_azure_2").hide();
				$("#pid_aws_1").show();
				$("#pid_aws_2").show();
				$("#pid_aws_4").show();
				$("#pid_aws_3").show();
			}
		}
	});

	unbindobject("#ckbdefkeys");
	$("#ckbdefkeys").on('click', function (e) {
		if(!$(this).is(":checked")) {
			if($("#sel_storage_provider").val() == 2){
				$("#pid_aws_1").hide();
				$("#pid_aws_2").hide();
				$("#pid_aws_4").hide();
				$("#pid_aws_3").hide();
				$("#pid_azure_1").show();
				$("#pid_azure_2").show();
			} else if($("#sel_storage_provider").val() == 1){
				$("#pid_azure_1").hide();
				$("#pid_azure_2").hide();
				$("#pid_aws_1").show();
				$("#pid_aws_2").show();
				$("#pid_aws_3").show();
				$("#pid_aws_4").show();
			}
		} else {
			$("txt_s3_access_key").val("");
			$("txt_s3_secret_key").val("");
			$("txt_azure_account_name").val("");
			$("txt_azure_account_key").val("");
			$("#pid_aws_1").hide();
			$("#pid_aws_2").hide();
			$("#pid_aws_4").hide();
			if($("#sel_storage_provider").val() == 1) $("#pid_aws_3").show();
			$("#pid_azure_1").hide();
			$("#pid_azure_2").hide();
		}
	});
}

function admCommonConfirmationDialogEvents(){
	unbindobject("#btnmodalconfirmdone");
	$("#btnmodalconfirmdone").on('click', function (e) {
		window[nextMethodToBeCalled](nextMethodParams);
		hideActionPopup("confirmmodal");
		admShowconfirmmsg(adm_messages.morethanallowedfolderdownload, confirm_Success, 5000, "", false, false);
	});

	unbindobject("#btnmodalconfirmcancel");
	$("#btnmodalconfirmcancel").on('click', function (e) {
		hideActionPopup("confirmmodal");
	});

	unbindobject("#btnchangepassmodalconfirmdone");
	$("#btnchangepassmodalconfirmdone").on('click', function (e) {
		window.location.href = "changepassword.html";
	});

	unbindobject("#btnchangepassconfirmcancel");
	$("#btnchangepassconfirmcancel").on('click', function (e) {
		hideActionPopup("changepassconfirmmodal");
		chagepassstatuschange();
		admFetchNotifSettingsService();
	});
}

function admSwitchAccountScreen(){
	unbindobject("#adm_switchaccount");
	$("#adm_switchaccount").bind("click",function(event){
		if($("#adm_switchaccount_span").html() == "Add account"){
			admShowLoginScreen();
		} else {
			rearrangeAccountsList = true;
			admListAccountDisplay();
			$("#divaccountlist").show();
			$("#divuserprofile").hide();
		}
	});

	unbindobject("#adm_addaccount");
	$("#adm_addaccount").bind("click",function(event){
		admShowLoginScreen();
	});

	unbindobject("#divuserdropdownmenu");
	$('#divuserdropdownmenu').on('click', function(event){
	    event.stopPropagation();
	});

	unbindobject("#adm_account_back_profile");
	$('#adm_account_back_profile').on('click', function(event){
	    $("#divaccountlist").hide();
		$("#divuserprofile").show();
	});
}

function admSwitchAccountEvent(id){
	unbindobject("#divuseraccount_"+id);
	$("#divuseraccount_"+id).bind("click",function(event){
		var id = $(this).attr("id");
		var idm = id.replace("divuseraccount_", "");
		admswitch(idm);
	});

	unbindobject("#divuseraccount_signout_"+id);
	$("#divuseraccount_signout_"+id).bind("click",function(event){
		var token = "";
		var id = $(this).attr("id");
		var idm = id.replace("divuseraccount_signout_", "");
		admShowconfirmmsg(adm_messages.selectaccountsignout, confirm_Success, 5000, "", false, false);
		var corpls = JSON.parse(valdec(localStorage._zm));
		for (var i = corpls.length - 1; i >= 0; i--) {
			if (idm == corpls[i].id) {
				token = corpls[i].value._zz;
				acclistcurrlogin = i;
				break;
			}
		}
		logOutServiceSingle(token);
		admremoveaccountfromlist(idm, false);
	});

	unbindobject("#divuseraccount_remove_"+id);
	$("#divuseraccount_remove_"+id).bind("click",function(event){
		var id = $(this).attr("id");
		var idm = id.replace("divuseraccount_remove_", "");
		admremoveaccountfromlist(idm, true);
	});
}

function admForumNotifEvent(){
	/*document.addEventListener("visibilitychange", function(){
		if(document.visibilityState == 'hidden') {
		} else {
			admFetchForumNotifService();
   		}
	});*/

	unbindobject("#btn_forum");
	$("#btn_forum").bind("click",function(event){
		$("#icon_dot_forum_notif").hide();
		$("#divforumnotiflist").html().replace(/(?:\r\n\t|\r|\n|\t)/g, '');
		admForumClearAll();
		window.open('forum.html','_blank');
	});

	unbindobject("#btn_forum_notif_clear_all");
	$("#btn_forum_notif_clear_all").bind("click",function(event){
		admForumClearAll();
	});
}

function admForumNotifClick(id){
	unbindobject("#div_thread_"+id);
	$("#div_thread_"+id).bind("click",function(event){
		admFormBusy = true;
		var id = $(this).attr("data-id");
		var idm = (this.id).replace("div_thread_", "");
		var dataid = $(this).attr("data-pid");
		var url = cloudURLACT+"/appnew/forum.html?a=";
		if(parseFloat(dataid) > 0){
			url += dataid+"&b="+localStorage._zw+"&c=forum&d="+id;
			admDeleteForumNotifService(dataid);
		} else {
			url += id+"&b="+localStorage._zw+"&c=forum";
			admDeleteForumNotifService(id);
		}
		forumRemNotiLocalStorage(idm);
		if(admFormNotifListCount > 0) admFormNotifListCount--;
		$("#div_thread_"+idm).remove();
		window.open(url, "_blank");
		if($("#divforumnotiflist").html()==""){
			hideActionPopup("divforumnotiflistmodal");
		}
	});

	unbindobject("#btn_notif_delete_"+id);
	$("#btn_notif_delete_"+id).bind("click",function(event){
		admFormBusy = true;
		var idm = (this.id).replace("btn_notif_delete_", "");
		var id = $(this).attr("data-id");
		admDeleteForumNotifService(id);
		forumRemNotiLocalStorage(idm);
		if(admFormNotifListCount > 0) admFormNotifListCount--;
		$("#div_thread_"+idm).remove();
		if($("#divforumnotiflist").html()==""){
			hideActionPopup("divforumnotiflistmodal");
		}
	});
}

/**
 * method to open file permission window
 * @param id
 */
function admFilePermissionEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function() {
		admCloseRowDropDown();
		var locked = document.getElementById(this.id).getAttribute("data-locked");
		if(locked == 0){
			var status = document.getElementById(this.id).getAttribute("data-status");
			admselecteddocids = document.getElementById(this.id).getAttribute("data-id");
			var folderId = document.getElementById(this.id).getAttribute("data-folderid");
			var strg = "<div style='max-height:100px;overflow-y:auto;'>";
			strg += "<div style='width:100%;'>"+$(this).attr("data-filename")+"</div>";
			strg += "</div>";
			$("#adm_file_perm_selection").html(strg);
			admOpenFilePermissionService(folderId);
		} else {
			admShowconfirmmsg(adm_messages.lockeddoc, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}

function admFilePermissionCheckBoxEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function() {
		var idm = (this.id).replace("adm_file_perm_popup_", "");
		var clickcount = parseInt($(this).attr("data-indeterminate-click"));
		if(clickcount > -1) {
			clickcount++;
			if(clickcount == 3){
				$("#div_adm_file_perm_popup_"+idm).show();
				$(this).hide();
				$(this).prop("checked", true);
				clickcount = 0;
			}
			$(this).attr("data-indeterminate-click", clickcount);
		}
		$("#tr_file_perm_"+idm).addClass("highlight_row");
		$("#tr_file_perm_"+idm).css("background-color", "lightskyblue");
	});
}

function admFilePermissionDivCheckBoxEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function() {
		var idm = (this.id).replace("div_adm_file_perm_popup_", "");
		$(this).hide();
		$("#adm_file_perm_popup_"+idm).show();
		$("#adm_file_perm_popup_"+idm).prop("checked", true);
		$("#adm_file_perm_popup_"+idm).attr("data-indeterminate-click", 1);

		$("#tr_file_perm_"+idm).addClass("highlight_row");
		$("#tr_file_perm_"+idm).css("background-color", "lightskyblue");
	});
}

function admFilePermEvent(){
	unbindobject("#btn_save_file_perm");
	$("#btn_save_file_perm").click(function() {
		var objectData = {"UnIndexDocPermDtoList": [], "action":"admSaveFilePermissionServiceAfter"};
		$(".adm_file_perm_checkbox_cls").each(function(){
			var inderminate = ($(this).css('display') !== 'none');
			var status = 2;
			if($(this).is(":checked") == true){
				status = 1;
			}
			if(inderminate){
				var loginId = $(this).attr("data-id");
				var vmdocids = "";
				var arr = admselecteddocids.split(",");
				for(var i=0;i<arr.length;i++){
					if(i==0) vmdocids = arr[i]+"-"+status;
					else vmdocids = vmdocids + "," + arr[i]+"-"+status;
				}

				objectData.UnIndexDocPermDtoList.push({
					"loginId":loginId,
					"fileIdStr":vmdocids,
				});
			}
    	});
		admSaveFilePermissionService(objectData);
		return false;
	});

	unbindobject("#adm_file_permission");
	$("#adm_file_permission").click(function() {
		admselecteddocids = "";
		var strg = "<div style='max-height:100px;overflow-y:auto;'>";
		var i = 0;
		$(".admcheckbox").each(function(){
			if($(this).is(":checked")){
				if(admselecteddocids.length == 0){
					admselecteddocids = $(this).attr("data-id");
				} else {
					admselecteddocids = admselecteddocids + "," + $(this).attr("data-id");
				}
				strg += "<div style='width:100%;'>"+$(this).attr("data-filename")+"</div>";
				i++;
			}
		});
		strg += "</div>";
		if(i <= maxfilepermissiondoccount){
			if(admselecteddocids.length > 0) {
				admOpenFilePermissionService(admcurrentfolderid);
				$("#adm_file_perm_selection").html(strg);
			} else {
				admShowconfirmmsg(adm_messages.admselectonedocument, confirm_Error, 5000, "", false, false);
			}
		} else {
			admselecteddocids = "";
			admShowconfirmmsg(adm_messages.admselectonedocumentcount.replace("<ACTION>", "file permissions").replace("<COUNT>", maxfilepermissiondoccount), confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#btn_save_file_perm_close");
	$("#btn_save_file_perm_close").click(function() {
		admFilePermClosePopup();
		return false;
	});

	unbindobject("#btn_save_file_perm_close_icon");
	$("#btn_save_file_perm_close_icon").click(function() {
		admFilePermClosePopup();
		return false;
	});
}

function admFilePermViewAllEvent(){
	unbindobject("#chk_selectall_view");
	$("#chk_selectall_view").click(function() {
		$(".permcls").show();
		$(".divpermcls").hide();
		if($(this).is(":checked")){
			$(".adm_file_perm_checkbox_cls").prop("checked", true);
		} else {
			$(".adm_file_perm_checkbox_cls").prop("checked", false);
		}
		$(".adm_file_perm_checkbox_cls").closest('tr').addClass("highlight_row");
		$(".adm_file_perm_checkbox_cls").closest('tr').css("background-color", "lightskyblue");
	});
}

function admChangeStorageClass(id){
	unbindobject("#adm_send_to_acrhive_"+id);
	$("#adm_send_to_acrhive_"+id).click(function(event){
		admCloseRowDropDown();
		var folderId = document.getElementById(this.id).getAttribute("data-id");
		admChangeStorageClassService(folderId, 1);
	});

	unbindobject("#adm_send_to_infrequent_"+id);
	$("#adm_send_to_infrequent_"+id).click(function(event){
		admCloseRowDropDown();
		var folderId = document.getElementById(this.id).getAttribute("data-id");
		admChangeStorageClassService(folderId, 2);
	});
}

function admResetAllFilePermision() {
	unbindobject("#btn_resetall_file_permission");
  	$("#btn_resetall_file_permission").click(function () {
		$(".adm_file_perm_checkbox_cls").map((index,element)=>{
			var id = element.id;
			id = id.substring(id.lastIndexOf("_")+1);
			var prvstatus = document.getElementById("tr_file_perm_"+id).getAttribute("data-prvstatus");
			if(prvstatus == 1){
				$("#adm_file_perm_popup_"+id).prop("checked", true);
			} else if(prvstatus == 2){
				$("#adm_file_perm_popup_"+id).prop("checked", false);
			} else if(prvstatus == 3){
				$("#adm_file_perm_popup_"+id).hide();
				$("#div_adm_file_perm_popup_"+id).show();
			}
		});
		$(".adm_file_perm_checkbox_cls").closest('tr').removeClass("highlight_row");
		$(".adm_file_perm_checkbox_cls").closest('tr').css("background-color", "white");
	});
}
				

