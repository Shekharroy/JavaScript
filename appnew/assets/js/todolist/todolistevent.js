function keyPressed(event){
	if (event.keyCode === 8) {
		return false;
	}
}

function todoListCommonEvents() {
	unbindobject("#btnaddnewtodolist");
	$("#btnaddnewtodolist").bind("click", function(event){
		todolistOpenModal(0);
	});

	unbindobject("#btnworkflowsave");
	$("#btnworkflowsave").bind("click", function(event){
		todolistValidateAddService();
	});

	unbindobject("#btndivworkflowmodalclose,#btndivworkflowmodalcloseicon");
	$("#btndivworkflowmodalclose,#btndivworkflowmodalcloseicon").bind("click", function(event){
		hideActionPopup("divworkflowmodal");
		$("#tblprocesseditnew").attr("data-row", 0);
		$("#tblprocesseditnew").html("");
		$("#div_processtaskaddlist").hide();
	});

	unbindobject("#btn_refresh");
	$("#btn_refresh").bind("click", function(event){
		fetchLogo();
		todoListCommon();
		todoPageSize();
	});

	unbindobject("#btn_search_reset");
	$("#btn_search_reset").bind("click", function(event){
		$("#selecttodolistfilter").val("A");
		$("#txtsearch").val("");
		$("#daterange").val('');
		fromDueDate = "";
	    toDueDate = "";
		todolistResetFetch();
		todolistFetchService(0);
	});

	unbindobject("#btnworkflowsavefromexcel");
	$("#btnworkflowsavefromexcel").bind("click", function(event){
		hideActionPopup("divworkflowmodal");
		$("#tblprocesseditnew").html("");
		$("#div_processtaskaddlist").hide();
		$("#btnworkflowfilechoose").click();
		return false;
	});

	unbindobject("#btnworkflowdownloadtemplate");
	$("#btnworkflowdownloadtemplate").bind("click", function(event){
		todolistDownloadTemplate();
		return false;
	});

	$("#btnworkflowfilechoose").on('change', function () {
		currentfile = this.files[0];
		todolistImportWorkflowService();
		return false;
	});

	unbindobject("#btncommentsave");
	$("#btncommentsave").bind("click", function(event){
		var val = $("#txtcomment").val().trim();
		if(val.length == 0){
			todoListShowconfirmmsg(todolistmessage.entercomment, confirm_Error, 5000, "", false, false);
		} else if(!stringcheckifnonascii(val)){
			todoListShowconfirmmsg(todolistmessage.nonasciifound+" in comment.", confirm_Error, 5000, "", false, false);
		} else {
			if(todolistCurrentMethod!=""){
				window[todolistCurrentMethod](todolistCurrentMethodParams);
			} else {
				todolistAddCommentService($("#divcomments").attr("data-id"));
			}
		}
		return false;
	});

	unbindobject("#btnexport");
	$("#btnexport").bind("click", function(event){
		if($("#todolistmainnorec").is(":visible")) {
			todoListShowconfirmmsg(todolistmessage.noexport, confirm_Error, 5000, "", false, false);
		} else {
			todolistExportWorkflowService();
		}
		return false;
	});

	unbindobject("#btn_sort");
	$("#btn_sort").bind("click", function(event){
		if($("#img_sort").attr("data-sort") == "DESC"){
			$("#img_sort").attr("data-sort", "ASC");
			todolistsortorder = 0;
			$("#img_sort").attr("src", "assets/img/sort_asc_white.png");
		} else if($("#img_sort").attr("data-sort") == "ASC"){
			$("#img_sort").attr("data-sort", "DESC");
			todolistsortorder = 1;
			$("#img_sort").attr("src", "assets/img/sort_desc_white.png");
		}
		todolistResetFetch();
		todolistFetchService(0);
		return false;
	});

	unbindobject("#profIm");
	$("#profIm").bind("click", function(event){
		ajaxindicatorstart('fetching profile.. please wait..');
		todolistSingleUserProfileService(true);
		todolistFetchStorageLeftService(false);
		showActionPopup("userprofilemodal");
		return false;
	});

	unbindobject("#selecttodolistfilter");
	$("#selecttodolistfilter").on('change', function() {
		todolistResetFetch();
		todolistFetchService(0);
		return false;
	});
	
	unbindobject("#txtsearch");
	$("#txtsearch").keypress(function(event){
		if(event.keyCode == 13) {
			todolistSearchCommon();
			return false;
		}
		
	});
	$("#img_search").click(function(event){
		todolistSearchCommon();
	});

	$('#daterange').daterangepicker({
		autoUpdateInput: false,
		locale: {
			cancelLabel: 'Clear'
		}
	});

	$('#daterange').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
		fromDueDate = picker.startDate.format('MM/DD/YYYY');
		toDueDate = picker.endDate.format('MM/DD/YYYY');
		todolistResetFetch();
		todolistFetchService(0);
		return false;
	});

	$('#daterange').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
		fromDueDate = "";
	    toDueDate = "";
	    todolistResetFetch();
	    todolistFetchService(0);
	    return false;
  	});

  	todolistDataScrollEnd();
  	groupevents();
  	todolistworkflowevents();
}

function todoListRowEvents(id) {
	unbindobject("#div_todolist_complete_"+id);
	$("#div_todolist_complete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_complete_", "");
		todoListCommentFromStageMove(idm, "C", false);
		return false;
	});

	unbindobject("#div_todolist_incomplete_"+id);
	$("#div_todolist_incomplete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_incomplete_", "");
		todoListCommentFromStageMove(idm, "R", false);
		return false;
	});

	unbindobject("#div_todolist_approve_"+id);
	$("#div_todolist_approve_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_approve_", "");
		todoListCommentFromStageMove(idm, "A", false);
		return false;
	});

	unbindobject("#div_todolist_reject_"+id);
	$("#div_todolist_reject_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_reject_", "");
		todoListCommentFromStageMove(idm, "R", false);
		return false;
	});

	unbindobject("#div_todolist_delete_"+id);
	$("#div_todolist_delete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_delete_", "");
		todolistDeleteService(idm);
		return false;
	});

	unbindobject("#div_todolist_"+id);
	$("#div_todolist_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_", "");
		todolistFetchService(idm);
		$(".divboxshadow").removeClass("divboxshadow");
		highlightrowid = idm;
		$("#div_todolist_"+idm).addClass("divboxshadow");
	});

	unbindobject("#div_todolist_edit_"+id);
	$("#div_todolist_edit_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_edit_", "");
		todolistOpenModal(idm);
		return false;
	});

	unbindobject("#div_todolist_attachfile_"+id);
	$("#div_todolist_attachfile_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_todolist_attachfile_", "");
		$("#drivemodal").attr("data-todolist-id", idm);
		admcurrentfolderid = 0;
		fetchAllFolderListDetails();
		todolistFetchFileService(idm);
		$("#admcopyfolderheader").html("Root");
		showActionPopup("drivemodal", false);
		return false;
	});
}

function todoListSingleRowEvents(id) {
	unbindobject("#div_single_todolist_complete_"+id);
	$("#div_single_todolist_complete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_complete_", "");
		todoListCommentFromStageMove(idm, "C", true);
		return false;
	});

	unbindobject("#div_single_todolist_incomplete_"+id);
	$("#div_single_todolist_incomplete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_incomplete_", "");
		todoListCommentFromStageMove(idm, "R", true);
		return false;
	});

	unbindobject("#div_single_todolist_approve_"+id);
	$("#div_single_todolist_approve_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_approve_", "");
		todoListCommentFromStageMove(idm, "A", true);
		$(".modalheader").html("Move to next/previous stage");
		return false;
	});

	unbindobject("#div_single_todolist_reject_"+id);
	$("#div_single_todolist_reject_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_reject_", "");
		todoListCommentFromStageMove(idm, "R", true);
		return false;
	});

	unbindobject("#div_single_todolist_delete_"+id);
	$("#div_single_todolist_delete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_delete_", "");
		todolistDeleteService(idm);
		return false;
	});

	unbindobject("#div_single_todolist_edit_"+id);
	$("#div_single_todolist_edit_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_edit_", "");
		todolistOpenModal(idm);
		return false;
	});

	unbindobject("#div_single_todolist_addcomment_"+id);
	$("#div_single_todolist_addcomment_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_addcomment_", "");
		todolistCurrentMethod = "";
		todolistCurrentMethodParams = [];
		$("#divcomments").attr("data-id", idm);
		$("#txtcomment").val("");
		showActionPopup("divcomments", false);
		$(".modalheader").html("Add Comments");
		return false;
	});

	unbindobject("#div_single_todolist_attachfile_"+id);
	$("#div_single_todolist_attachfile_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_attachfile_", "");
		$("#drivemodal").attr("data-todolist-id", idm);
		admcurrentfolderid = 0;
		fetchAllFolderListDetails();
		todolistFetchFileService(idm);
		$("#admcopyfolderheader").html("Root");
		showActionPopup("drivemodal", false);
		return false;
	});
}

function todoListCommentRowEvents(id) {
	unbindobject("#div_single_todolist_comment_delete_"+id);
	$("#div_single_todolist_comment_delete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_single_todolist_comment_delete_", "");
		todolistDeleteCommentService(idm);
		return false;
	});

	unbindobject("#div_single_todolist_comment_addcomment_"+id);
	$("#div_single_todolist_comment_addcomment_"+id).bind("click", function(event){
		todolistCurrentMethod = "";
		todolistCurrentMethodParams = [];
		var idm = $(this).attr("data-parent");
		$("#divcomments").attr("data-id", idm);
		$("#txtcomment").val("");
		showActionPopup("divcomments", false);
		return false;
	});
}

/**
 * method to detect end of scroll reached
 */
function todolistDataScrollEnd(){
	$("#card-mb-2").on("scroll", function() {
		var p1 = $(this).scrollTop();
		var p2 = $(this).innerHeight();
		var p3 = $(this)[0].scrollHeight;
		p3 = p3 - 10;
		if(todolistlastRow < todolisttotalcount) {
			if((p1 + p2) >= p3) {
				todolistPopulateRecordsAfter();
			} else {
				norecordsfound = false;
			}
		}
	});
}

//drive code starts
function admFolderClickMoreEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		var folderpath = document.getElementById(this.id).getAttribute("path");
		admSetCopyFolderHeaderCaption(folderpath);
		admcurrentfolderid = document.getElementById(this.id).getAttribute("data-id");
		var folderpath = document.getElementById(this.id).getAttribute("data-path");
		adm_documentmaxlimit = 0;
		fetchAllFolderListLevelDetails(true);
		return false;
	});
}

function admFileClickEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		var fileId = document.getElementById(this.id).getAttribute("data-id");
		var todoListId = $("#drivemodal").attr("data-todolist-id");
		var curgroupid = $("#div_todolist_"+todoListId).attr("data-groupid");
		if($("#div_todolist_"+todoListId).attr("data-complete") == "C"){
			todoListShowconfirmmsg(todolistmessage.completestateactionerror, confirm_Error, 5000, "", false, false);
		} else if(!todolistCheckIfUserpartOfgroup(localStorage._zv, curgroupid)){
			todoListShowconfirmmsg(todolistmessage.notpartofcurprocess, confirm_Error, 5000, "", false, false);
		} else {
			todolistAddFileService(todoListId, fileId);
		}
	});
}

function admCopyFolderClickMoreRowEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(){
		admcurrentfolderid = document.getElementById(this.id).getAttribute("data-id");
		var folderpath = document.getElementById(this.id).getAttribute("data-path");
		admSetCopyFolderHeaderCaption(folderpath);
		adm_documentmaxlimit = 0;
		if(admcurrentfolderid == 0) {
			fetchAllFolderListDetails();
		} else {
			fetchAllFolderListLevelDetails(true);
		}
		return false;
	});
}

function admSelectedFileEvent(id){
	unbindobject("#span_filerow_del_"+id);
	$("#span_filerow_del_"+id).click(function(){
		var idm = (this.id).replace("span_filerow_del_", "");
		var todoListId = idm.split("-")[0];
		var curgroupid = $("#div_todolist_"+todoListId).attr("data-groupid");
		if($("#div_todolist_"+todoListId).attr("data-complete") == "C"){
			todoListShowconfirmmsg(todolistmessage.completestateactionerror, confirm_Error, 5000, "", false, false);
		} else if(!todolistCheckIfUserpartOfgroup(localStorage._zv, curgroupid)){
			todoListShowconfirmmsg(todolistmessage.notpartofcurprocess, confirm_Error, 5000, "", false, false);
		} else {
			var fileId = idm.split("-")[1];
			todolistDeleteFileService(todoListId, fileId);
		}
		return false;
	});

	unbindobject("#div_file_click_"+id);
	$("#div_file_click_"+id).click(function(){
		var idm = (this.id).replace("div_file_click_", "");
		var todoListId = idm.split("-")[0];
		var fileId = idm.split("-")[1];
		todolistCheckFileStatusService(fileId, "");
		return false;
	});

	unbindobject("#span_filerow_download_"+id);
	$("#span_filerow_download_"+id).click(function(){
		var idm = (this.id).replace("span_filerow_download_", "");
		var todoListId = idm.split("-")[0];
		var fileId = idm.split("-")[1];
		todolistCheckFileStatusService(fileId, "todolistDownloadZipFile");
		return false;
	});
}
//drive code ends

//group code starts
function groupevents(){
	unbindobject("#btngroup");
	$("#btngroup").click(function(){
		$("#tblgroups").animate({scrollTop:0},10);
		$(".usergroupcheckbox").prop("checked", false);
		$(".usergroupcheckbox").attr("disabled", true);
		$(".highlightedgrouprow").removeClass("highlightedgrouprow");
		$(".usersrow").css("background", "white");
		$(".usersrow").attr("data-edited", 0);
		$("#btnresetgroupselection").hide();
		$("#resetsearchgroup").click();
		$("#resetsearchuser").click();
		selectidgroup = 0;
		var len = $(".groupsrow").length;
		if(len > 0){
			var grp = $(".groupsrow")[1];
			var id = $(grp).attr("id");
			selectidgroup = id;
			$(grp).click();
		}
		showActionPopup("groupmodal", false);
		$('#txtsearchgroup').focus();
		return false;
	});

	unbindobject("#btntaskgroup");
	$("#btntaskgroup").click(function(){
		$("#tblgroups").animate({scrollTop:0},10);
		$(".usergroupcheckbox").prop("checked", false);
		$(".usergroupcheckbox").attr("disabled", true);
		$(".highlightedgrouprow").removeClass("highlightedgrouprow");
		$(".usersrow").css("background", "white");
		$(".usersrow").attr("data-edited", 0);
		$("#btnresetgroupselection").hide();
		$("#resetsearchgroup").click();
		$("#resetsearchuser").click();
		selectidgroup = 0;
		var len = $(".groupsrow").length;
		if(len > 0){
			var grp = $(".groupsrow")[1];
			var id = $(grp).attr("id");
			selectidgroup = id;
			$(grp).click();
		}

		showActionPopup("groupmodal", false);
		$('#txtsearchgroup').focus();
		groupopenfromtask = true;
		hideActionPopup("divworkflowmodal");
		return false;
	});

	unbindobject("#btntaskflowtemplate");
	$("#btntaskflowtemplate").click(function(){
		selectedflowid = 0;
		selectedprvflowid = 0;
		$("#resetsearchflow").click();
		$(".flowsrow").removeClass("highlightedgrouprow");
		showActionPopup("flowtemplatemodal", false);
		$('#txtsearchflow').focus();
		
		templateopenfromtask = true;
		hideActionPopup("divworkflowmodal");
		return false;
	});

	unbindobject("#txtsearchgroup");
	$("#txtsearchgroup").keyup(function(){
		var search = $(this).val().trim().toLowerCase();
		if(search.length > 0){
			$("#resetsearchgroup").show();
		} else {
			$("#resetsearchgroup").hide();
		}

		if(search.length > 0){
			$(".hr_row_group_class").hide();
			$('.groupsrow').hide();
			var len = 0;
			if(groupsdetails != null) {
				groupsdetails.map(function (a) {
					var id = a.id;
					if ((a.groupName).toLowerCase().indexOf(search) >= 0) {
						$("#div_group_row_"+id).show();
						$("#hr_row_group_"+id).show();
						len++;
					} else {
						$("#div_group_row_"+id).hide();
						$("#hr_row_group_"+id).hide();
					}
				});
			}

			if(len == 0){
				$('.groupnotfound').show();
			}
		} else {
			$(".hr_row_group_class").show();
			$('.groupsrow').show();
			$('.groupnotfound').hide();
		}
		return false;
	});

	unbindobject("#resetsearchgroup");
	$("#resetsearchgroup").click(function(){
		$("#txtsearchgroup").val("");
		$('.groupsrow').show();
		$('.groupnotfound').hide();
		$(".hr_row_group_class").show();
		return false;
	});

	unbindobject("#txtsearchuser");
	$("#txtsearchuser").keyup(function(){
		var search = $(this).val().trim().toLowerCase();
		if(search.length > 0){
			$("#resetsearchuser").show();
		} else {
			$("#resetsearchuser").hide();
		}

		if(search.length > 0){
			$(".hr_row_user_class").hide();
			$('.usersrow').hide();
			var len = 0;
			admUserList.map(function (a) {
				var id = a.id;
				var username = a.firstName;
				if((a.middleName + "") != "null" && (a.middleName + "") != ""){
					username += " " + a.middleName;
				}
				if((a.lastName + "") != "null" && (a.lastName + "") != ""){
					username += " " + a.lastName;
				}
				if (username.toLowerCase().indexOf(search) >= 0 || (a.loginId).toLowerCase().indexOf(search) >= 0) {
					$("#div_user_group_row_"+id).show();
					$("#hr_row_user_"+id).show();
					len++;
				} else {
					$("#div_user_group_row_"+id).hide();
					$("#hr_row_user_"+id).hide();
				}
			});

			if(len == 0){
				$('.userrownotfound').show();
			}
		} else {
			$(".hr_row_user_class").show();
			$('.usersrow').show();
			$('.userrownotfound').hide();
		}
		return false;
	});

	unbindobject("#resetsearchuser");
	$("#resetsearchuser").click(function(){
		$("#txtsearchuser").val("");
		$('.usersrow').show();
		$('.userrownotfound').hide();
		$(".hr_row_user_class").show();
		return false;
	});

	unbindobject("#btnrefreshgroup");
	$("#btnrefreshgroup").click(function(){
		$("#resetsearchuser").click();
		$("#resetsearchgroup").click();
		todolistUserListService();
		fetchAllGroupsService();
		return false;
	});

	unbindobject("#btnaddgroup");
	$("#btnaddgroup").click(function(){
		$("#txtgroup").val("");
		$("#divnewgroupmodal").attr("data-id", 0);
		$("#divnewgroupmodal").attr("data-name", "");
		$("#divaddgroupmodalheader").html("Create New Group");
		hideActionPopup("groupmodal");
		showActionPopup("divnewgroupmodal", false);
		$('#txtgroup').focus();
		return false;
	});

	unbindobject("#btngroupmodalclose,#btngroupmodalcloseicon");
	$("#btngroupmodalclose,#btngroupmodalcloseicon").click(function(){
		hideActionPopup("groupmodal");
		if(grooupopenedfrom == "workflowtemplate"){
			grooupopenedfrom = "";
			hideActionPopup("groupmodal");
			showActionPopup("divnewflowmodal", false);
			$('#txtworkflow').focus();
		} else if(groupopenfromtask){
			groupopenfromtask = false;
			hideActionPopup("groupmodal");
			showActionPopup("divworkflowmodal", false);
			$('#txtevent').focus();
		}
		return false;
	});

	unbindobject("#div_user_group_row_checkbox");
	$("#div_user_group_row_checkbox").click(function(){
		if($(this).is(":checked")){
			//todolistDeleteUserGroupByIdService(-2);
			$(".usergroupcheckbox").prop("checked", true);
		} else {
			//todolistDeleteUserGroupByIdService(-1);
			$(".usergroupcheckbox").prop("checked", false);
		}
		$(".usersrow").css("background", "lightskyblue");
		$(".usersrow").attr("data-edited", 1);
		$("#btnresetgroupselection").show();
		$("#btnupdategroup").show();
	});

	unbindobject("#btnsavegroup");
	$("#btnsavegroup").click(function(){
		var val = $("#txtgroup").val().trim();
		if(val.length == 0){
			todoListShowconfirmmsg(todolistmessage.entergroupname, confirm_Error, 5000, "", false, false);
		} else if(!stringcheckifnonascii(val)){
			todoListShowconfirmmsg(todolistmessage.nonasciifound+" in group name", confirm_Error, 5000, "", false, false);
		} else {
			var exists = false;
			if(groupsdetails != null) {
				groupsdetails.map(function (a) {
					if (a.groupName.toLowerCase() == val.toLowerCase()) {
						exists = true;
					}
				});
			}
			if(exists){
				todoListShowconfirmmsg(todolistmessage.groupexists, confirm_Error, 5000, "", false, false);
			} else {
				todolistAddGroupService();
			}
		}
		return false;
	});

	unbindobject("#btnclosegroup,#btnclosegroupicon");
	$("#btnclosegroup,#btnclosegroupicon").click(function(){
		hideActionPopup("divnewgroupmodal");
		showActionPopup("groupmodal", false);
		return false;
	});

	unbindobject("#btncreatenewtemplate");
	$("#btncreatenewtemplate").click(function(){
		templatecreatefromtask = true;
		$("#txtworkflow").val("");
		$("#tblprocessedit").html("No stage attached");
		$("#divnewflowmodal").attr("data-id", 0);
		hideActionPopup("divworkflowmodal");
		showActionPopup("divnewflowmodal", false);
		$('#txtworkflow').focus();
		return false;
	});

	unbindobject("#btnchoosetemplate");
	$("#btnchoosetemplate").click(function(){
		templateopenfromtask = true;
		selectedflowid = 0;
		$("#btnflowtemplatechoose").show();
		hideActionPopup("divworkflowmodal");
		$("#resetsearchflow").click();
		$(".flowsrow").removeClass("highlightedgrouprow");
		showActionPopup("flowtemplatemodal", false);
		$('#txtsearchflow').focus();
		
		return false;
	});

	unbindobject("#btnflowtemplatechoose");
	$("#btnflowtemplatechoose").click(function(){
		templateopenfromtask = false;
		$("#btnflowtemplatechoose").hide();
		hideActionPopup("flowtemplatemodal");
		showActionPopup("divworkflowmodal", false);
		$('#txtevent').focus();
		todolistShowProcess(selectedflowid);
		return false;
	});

	unbindobject("#btnresetgroupselection");
	$("#btnresetgroupselection").click(function(){
		$(".usergroupcheckbox").prop("checked", false);
		$(".usersrow").css("background", "white");
		$(".usersrow").attr("data-edited", 0);
		$("#btnresetgroupselection").hide();
		$("#btnupdategroup").hide();
		var collection = $(".usersrow");
		console.log(" collection : " + collection.length);
		collection.each(function() {
			var idm = (this.id).replace("div_user_group_row_", "");
			var idchecked = $(this).attr("data-checked");
			if(idchecked == "true"){
				$("#div_user_group_row_checkbox_"+idm).prop("checked", true);
			} else if(idchecked == "false"){
				$("#div_user_group_row_checkbox_"+idm).prop("checked", false);
			}
		});
		return false;
	});

	unbindobject("#btnupdategroup");
	$("#btnupdategroup").click(function(){
		$("#btnupdategroup").hide();
		$("#btnresetgroupselection").hide();
		todolistAddUserGroupByUserIdService();
		return false;
	});
}

function todolistGroupClickEvent(id){
	unbindobject("#div_group_row_"+id);
	$("#div_group_row_"+id).click(function(){
		var idm = (this.id).replace("div_group_row_", "");
		selectidgroup = idm;
		$(".highlightedgrouprow").removeClass("highlightedgrouprow");
		$(this).addClass("highlightedgrouprow");
		fetchAllUserGroupsByIdService();
		return false;
	});

	unbindobject("#div_group_trash_"+id);
	$("#div_group_trash_"+id).click(function(){
		var idm = (this.id).replace("div_group_trash_", "");
		todolistDeleteGroupService(idm);
		return false;
	});

	unbindobject("#div_group_edit_"+id);
	$("#div_group_edit_"+id).click(function(){
		var idm = (this.id).replace("div_group_edit_", "");
		$("#txtgroup").val($("#div_group_name_"+id).html());
		$("#divnewgroupmodal").attr("data-id", idm);
		$("#divnewgroupmodal").attr("data-name", $("#txtgroup").val());
		$("#divaddgroupmodalheader").html("Edit Group Name");
		hideActionPopup("groupmodal");
		showActionPopup("divnewgroupmodal", false);
		$('#txtgroup').focus();
		return false;
	});
}

function todolistUserGroupsEvent(id){
	unbindobject("#div_user_group_row_checkbox_"+id);
	$("#div_user_group_row_checkbox_"+id).click(function(){
		var idm =  (this.id).replace("div_user_group_row_checkbox_", "");
		if($(this).is(":checked")){
			//todolistAddUserGroupByUserIdService($(this).attr("data-userid"));
		} else {
			//todolistDeleteUserGroupByIdService($(this).attr("data-userid"));
		}
		$("#div_user_group_row_"+idm).attr("data-edited", 1);
		$("#div_user_group_row_"+idm).css("background", "lightskyblue");
		$("#btnresetgroupselection").show();
		$("#btnupdategroup").show();
	});
}
//group code ends

//flow code starts
function todolistworkflowevents(){
	unbindobject("#btnflow");
	$("#btnflow").click(function(){
		selectedflowid = 0;
		selectedprvflowid = 0;
		$("#resetsearchflow").click();
		$(".flowsrow").removeClass("highlightedgrouprow");
		showActionPopup("flowtemplatemodal", false);
		$('#txtsearchflow').focus();
		return false;
	});

	unbindobject("#btnrefreshworkflow");
	$("#btnrefreshworkflow").click(function(){
		todolistFetchFlowService();
		return false;
	});

	unbindobject("#btnaddworflow");
	$("#btnaddworflow").click(function(){
		$("#txtworkflow").val("");
		$("#tblprocessedit").html("No stage attached");
		$("#divnewflowmodal").attr("data-id", 0);
		hideActionPopup("flowtemplatemodal");
		showActionPopup("divnewflowmodal", false);
		$('#txtworkflow').focus();
		return false;
	});

	unbindobject("#btnsavetemplate");
	$("#btnsavetemplate").click(function(){
		var flowName = $("#txtworkflow").val().trim();
		var flowId = $("#divnewflowmodal").attr("data-id");
		if(flowName.length == 0 || flowName.length > 50){
			todoListShowconfirmmsg(todolistmessage.enterflowname, confirm_Error, 5000, "", false, false);
		} else if(!stringcheckifnonascii(flowName)) {
			todoListShowconfirmmsg(todolistmessage.nonasciifound+" in workflow template name.", confirm_Error, 5000, "", false, false);
			exists = true;
		} else {
			var exists = false;
			if(flowId > 0 && flowName.toLowerCase() == $("#div_flow_name_"+flowId).html().toLowerCase()){
				exists = false;
			} else {
				if(todolistflowobject != null) {
					todolistflowobject.map(function (a) {
						if (a.flowName.toLowerCase() == flowName.toLowerCase()) {
							exists = true;
						}
					});
				}
			}
			if(!exists){
				var jsonInput = {"action":"todolistAddFlowServiceAfter", "id":flowId, "flowName":flowName, "status":1, "processTemplateList":[]};
				var i = $(".txt_adduser_loginid").length;
				if(i > 0){
					if(haveBlankTextboxValues("txt_adduser_loginid")){
						todoListShowconfirmmsg(todolistmessage.enterprocessname, confirm_Error, 5000, "", false, false);
					} else if(!haveTextOnlyAscii("txt_adduser_loginid")){
						todoListShowconfirmmsg(todolistmessage.nonasciifound+" in stage name.", confirm_Error, 5000, "", false, false);
					} else if(haveSelectDefaultvalue("sel_group")){
						todoListShowconfirmmsg(todolistmessage.selectgroup, confirm_Error, 5000, "", false, false);
					} else if(haveDuplicateTextboxValues("txt_adduser_loginid")){
						todoListShowconfirmmsg(todolistmessage.enteruniqueprocessname, confirm_Error, 5000, "", false, false);
					} else if(haveDuplicateTextboxValues("sel_group")){
						todoListShowconfirmmsg(todolistmessage.uniquegroup, confirm_Error, 5000, "", false, false);
					} else {
						var i = 0;
						var collection = $(".add_process_new");
						collection.each(function() {
							var rowid = (this.id).replace("div_process_edit_", "");
							var val = $("#txt_adduser_loginid_"+rowid).val().trim();
							var selgrp = $("#sel_group_"+rowid).val();
							if(val.length > 0 && selgrp != 0){
								var processid = $("#div_process_edit_"+rowid).attr("data-id");
								var status = 1;
								if($("#div_process_edit_"+rowid).attr("data-delete") == "0") status = 2;
								var sm = {"flowId":flowId, "groupId":selgrp, "processName":val, "level":(++i), "status":status, id:processid};
								jsonInput.processTemplateList.push(sm);
							}
						});
						todolistAddFlowService(jsonInput);
					}
				} else {
					todolistAddFlowService(jsonInput);
				}
			} else {
				todoListShowconfirmmsg(todolistmessage.workflownameexists, confirm_Error, 5000, "", false, false);
			}
		}
		return false;
	});

	unbindobject("#btnclosetemplate,#btnclosetemplateicon");
	$("#btnclosetemplate,#btnclosetemplateicon").click(function(){
		$("#divnewflowmodal").attr("data-id", 0);
		hideActionPopup("divnewflowmodal");
		$("#tblprocessedit").html("");
		$("#resetsearchflow").click();
		$(".flowsrow").removeClass("highlightedgrouprow");
		if(templatecreatefromtask){
			templatecreatefromtask = false;
			showActionPopup("divworkflowmodal", false);
			$('#txtevent').focus();
		} else {
			showActionPopup("flowtemplatemodal", false);
			$('#txtsearchflow').focus();
			
		}
		return false;
	});

	unbindobject("#span_add_process");
	$("#span_add_process").click(function(){
		var i = $(".add_process_new").length;
		if(i > 0){
			if(haveBlankTextboxValues("txt_adduser_loginid")){
				todoListShowconfirmmsg(todolistmessage.enterprocessname, confirm_Error, 5000, "", false, false);
			} else if(haveSelectDefaultvalue("sel_group")){
				todoListShowconfirmmsg(todolistmessage.selectgroup, confirm_Error, 5000, "", false, false);
			} else if(haveDuplicateTextboxValues("txt_adduser_loginid")){
				todoListShowconfirmmsg(todolistmessage.enteruniqueprocessname, confirm_Error, 5000, "", false, false);
			} else {
				todolistaddprocessrow("tblprocessedit");
			}
		} else {
			todolistaddprocessrow("tblprocessedit");
		}
		return false;
	});

	unbindobject("#span_add_process_new");
	$("#span_add_process_new").click(function(){
		var i = $(".add_process").length;
		if(i > 0){
			if(haveBlankTextboxValues("txt_adduser_loginid")){
				todoListShowconfirmmsg(todolistmessage.enterprocessname, confirm_Error, 5000, "", false, false);
			} else if(haveSelectDefaultvalue("sel_group")){
				todoListShowconfirmmsg(todolistmessage.selectgroup, confirm_Error, 5000, "", false, false);
			} else if(haveDuplicateTextboxValues("txt_adduser_loginid")){
				todoListShowconfirmmsg(todolistmessage.enteruniqueprocessname, confirm_Error, 5000, "", false, false);
			} else {
				todolistaddprocessrow("tblprocesseditnew");
			}
		} else {
			todolistaddprocessrow("tblprocesseditnew");
		}
		return false;
	});

	unbindobject("#txtsearchflow");
	$("#txtsearchflow").keyup(function(){
		var search = $(this).val().trim().toLowerCase();
		if(search.length > 0){
			$("#resetsearchflow").show();
		} else {
			$("#resetsearchflow").hide();
		}

		if(search.length > 0){
			if($(".flowrownotfound").length == 0) {
				$("#tblflows").append("<div class='row new-row copyrow flowsrow flowrownotfound' style='display:none;color:#6c757d !important;margin-right:0px;margin-left:0px;'>No workflow templates found</div>");
			}
			$(".hr_row_flow_class").hide();
			$('.flowsrow').hide();
			var len = 0;
			if(todolistflowobject != null) {
				todolistflowobject.map(function (a) {
					var id = a.id;
					if ((a.flowName).toLowerCase().indexOf(search) >= 0) {
						$("#div_flow_row_"+id).show();
						$("#hr_row_flow_"+id).show();
						len++;
					} else {
						$("#div_flow_row_"+id).hide();
						$("#hr_row_flow_"+id).hide();
					}
				});
			}

			if(len == 0){
				$(".flowrownotfound").show();
			}
		} else {
			$(".hr_row_flow_class").show();
			$('.flowsrow').show();
			$(".flowrownotfound").hide();
		}
		return false;
	});

	unbindobject("#resetsearchflow");
	$("#resetsearchflow").click(function(){
		$("#txtsearchflow").val("");
		$('.flowrownotfound').remove();
		$('.flowsrow').show();
		$(".hr_row_flow_class").show();
		return false;
	});

	unbindobject("#btndivflowtemplateclose,#btndivflowtemplatecloseicon");
	$("#btndivflowtemplateclose,#btndivflowtemplatecloseicon").click(function(){
		if(templateopenfromtask){
			templateopenfromtask = false;
			showActionPopup("divworkflowmodal", false);
			$('#txtevent').focus();
		}
		hideActionPopup("flowtemplatemodal");
		$("#btnflowtemplatechoose").hide();
		return false;
	});
}

function todolistFlowClickEvent(id){
	unbindobject("#div_flow_row_"+id);
	$("#div_flow_row_"+id).click(function(){
		var idm = (this.id).replace("div_flow_row_", "");
		$(".highlightedgrouprow").removeClass("highlightedgrouprow");
		$(this).addClass("highlightedgrouprow");
		if(todolistflowobject != null) {
			todolistflowobject.map(function (a) {
				if (a.id == idm) {
					selectedflowid = a.id;
					todolistShowProcessList(a.processTemplateList);
				}
			});
		}
		return false;
	});

	unbindobject("#div_flow_trash_"+id);
	$("#div_flow_trash_"+id).click(function(){
		var idm = (this.id).replace("div_flow_trash_", "");
		todolistDeleteFlowService(idm);
		return false;
	});

	unbindobject("#div_flow_edit_"+id);
	$("#div_flow_edit_"+id).click(function(){
		$("#tblprocessedit").html("No stage attached");
		var idm = (this.id).replace("div_flow_edit_", "");
		$("#txtworkflow").val($("#div_flow_name_"+id).html());
		$("#tblprocessedit").html("No stage attached");
		$("#divnewflowmodal").attr("data-id", idm);
		$("#tblprocessedit").html("");
		$("#tblprocesslist").attr("data-row", 0);
		if(todolistflowobject != null) {
			todolistflowobject.map(function (a) {
				if(a.id == idm){
					if(a.processTemplateList != null && a.processTemplateList.length > 0){
						var dt = a.processTemplateList;
						$("#tblprocessedit").attr("data-row", 0);
						for(var i=0;i<dt.length;i++){
							todolistaddprocessrow("tblprocessedit");
							$("#div_process_edit_"+i).attr("data-id", dt[i].id);
							$("#div_process_edit_"+i).attr("data-flow-id", dt[i].flowId);
							$("#txt_adduser_loginid_"+i).val(dt[i].processName);
							$("#sel_group_"+i).val(dt[i].groupId);
						}
					}
				}
			});
		}

		hideActionPopup("flowtemplatemodal");
		showActionPopup("divnewflowmodal", false);
		$('#txtworkflow').focus();
		return false;
	});
}

function todolistprocesseditrow(id){
	unbindobject("#div_process_edit_trash_"+id);
	$("#div_process_edit_trash_"+id).click(function(){
		var idm = (this.id).replace("div_process_edit_trash_", "");
		if($("#div_process_edit_"+id).attr("data-id") == "0") {
			$("#div_process_edit_"+id).remove();
		} else {
			$("#div_process_edit_"+id).hide();
			$("#div_process_edit_"+id).attr("data-delete", "0");
		}
		var index = $(".add_process_new").length;
		if(index == 0){
			todolistaddprocessrow("tblprocessedit");
		}
		return false;
	});

	unbindobject("#div_process_edit_trash_new_"+id);
	$("#div_process_edit_trash_new_"+id).click(function(){
		var idm = (this.id).replace("div_process_edit_trash_new_", "");
		if($("#div_process_edit_new_"+id).attr("data-id") == "0") {
			$("#div_process_edit_new_"+id).remove();
		} else {
			$("#div_process_edit_new_"+id).hide();
			$("#div_process_edit_new_"+id).attr("data-delete", "0");
		}

		var index = $(".add_process").length;
		if(index == 0){
			todolistaddprocessrow("tblprocesseditnew");
		}
		return false;
	});

	unbindobject("#div_process_edit_view_group_"+id);
	$("#div_process_edit_view_group_"+id).click(function(){
		var idm = (this.id).replace("div_process_edit_view_group_", "");
		selectidgroup = parseFloat($("#sel_group_"+idm).val());
		if(selectidgroup > 0){
			grooupopenedfrom = "workflowtemplate";
			$("#tblgroups").animate({scrollTop:100},10);
			showActionPopup("groupmodal", false);
			$('#txtsearchgroup').focus();
			$(".usergroupcheckbox").prop("checked", false);
			$(".highlightedgrouprow").removeClass("highlightedgrouprow");
			groupopenfromtask = true;
			hideActionPopup("divnewflowmodal");
			$("#div_group_row_"+selectidgroup).click();
			var pos = $("#div_group_row_"+selectidgroup).offset().top-150;
			$("#tblgroups").animate({scrollTop:pos},2000);
		}
		return false;
	});

	unbindobject("#div_process_edit_view_group_new_"+id);
	$("#div_process_edit_view_group_new_"+id).click(function(){
		var idm = (this.id).replace("div_process_edit_view_group_new_", "");
		selectidgroup = parseFloat($("#sel_group_new_"+idm).val());
		if(selectidgroup > 0){
			$("#tblgroups").animate({scrollTop:100},10);
			showActionPopup("groupmodal", false);
			$('#txtsearchgroup').focus();
			$(".usergroupcheckbox").prop("checked", false);
			$(".highlightedgrouprow").removeClass("highlightedgrouprow");
			groupopenfromtask = true;
			hideActionPopup("divworkflowmodal");
			$("#div_group_row_"+selectidgroup).click();
			var pos = $("#div_group_row_"+selectidgroup).offset().top-150;
			$("#tblgroups").animate({scrollTop:pos},2000);
		} else {
			todoListShowconfirmmsg(todolistmessage.selectgroupnormal, confirm_Error, 5000, "", false, false);
		}
		return false;
	});
}
//flow code ends

