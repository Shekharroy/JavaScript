function keyPressed(event){
	if (event.keyCode === 8) {
		return false;
	}
}

function pollCommonEvents() {
	unbindobject("#btnaddnewpoll");
	$("#btnaddnewpoll").bind("click", function(event){
		pollOpenModal(0);
	});

	unbindobject("#btnnewpollsave");
	$("#btnnewpollsave").bind("click", function(event){
		pollValidateAddService();
	});

	unbindobject("#btnnewpollwmodalclose,#btnnewpollmodalcloseicon");
	$("#btnnewpollwmodalclose,#btnnewpollmodalcloseicon").bind("click", function(event){
		hideActionPopup("divNewPoll");
	});

	$('#startdaterange').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
		startdatefrom = picker.startDate.format('MM/DD/YYYY');
		startdateto = picker.endDate.format('MM/DD/YYYY');
		highlightrowid = 0;
		pollFetchList();
		return false;
	});

	$('#startdaterange').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
		startdatefrom = "";
		startdateto = "";
		highlightrowid = 0;
		pollFetchList();
		return false;
  	});

  	$('#enddaterange').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
		enddatefrom = picker.startDate.format('MM/DD/YYYY');
		enddateto = picker.endDate.format('MM/DD/YYYY');
		highlightrowid = 0;
		pollFetchList();
		return false;
	});

	$('#enddaterange').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
		enddatefrom = "";
		enddateto = "";
		highlightrowid = 0;
		pollFetchList();
		return false;
  	});

  	unbindobject("#txtsearch");
	$("#txtsearch").keypress(function(event){
		if(event.keyCode == 13) {
			highlightrowid = 0;
			pollFetchList();
			return false;
		}
	});

  	$("#img_search").click(function(event){
		highlightrowid = 0;
		pollFetchList();
		return false;
	});

	unbindobject("#btn_search_reset");
	$("#btn_search_reset").bind("click", function(event){
		$("#selectpollsfilter").val(0);
		$("#txtsearch").val("");
		$("#startdaterange").val('');
		$("#enddaterange").val('');
		startdatefrom = "";
		startdateto = "";
		enddatefrom = "";
		enddateto = "";
		highlightrowid = 0;
		pollFetchList();
	});

	unbindobject("#btn_refresh");
	$("#btn_refresh").bind("click", function(event){
		highlightrowid = 0;
		pollCommon();
	});

	unbindobject("#selectpollsfilter");
	$("#selectpollsfilter").on('change', function() {
		highlightrowid = 0;
		pollFetchList();
	});

	unbindobject("#btn_sort");
	$("#btn_sort").bind("click", function(event){
		if($("#img_sort").attr("data-sort") == "DESC"){
			$("#img_sort").attr("data-sort", "ASC");
			pollsortorder = 0;
			$("#img_sort").attr("src", "assets/img/sort_asc_white.png");
		} else if($("#img_sort").attr("data-sort") == "ASC"){
			$("#img_sort").attr("data-sort", "DESC");
			pollsortorder = 1;
			$("#img_sort").attr("src", "assets/img/sort_desc_white.png");
		}
		highlightrowid = 0;
		pollFetchList();
		return false;
	});

	unbindobject("#btn_poll_date_change_close_icon,#btn_poll_date_change_close");
	$("#btn_poll_date_change_close_icon,#btn_poll_date_change_close").bind("click", function(event){
		hideActionPopup("divpollchangedate");
		return false;
	});

	unbindobject("#btn_poll_date_change_update");
	$("#btn_poll_date_change_update").bind("click", function(event){
		var startDate = $("#txt_poll_start_date").val().trim();
		var endDate = $("#txt_poll_end_date").val().trim();
		var dtnow = new Date();
		if($("#divstartdate").is(":visible") && ($("#txt_poll_start_date").val().length == 0 || new Date(startDate) < dtnow)){
			pollShowconfirmmsg(pollmessage.startdate, confirm_Error, 5000, "", false, false);
		} else if($("#txt_poll_end_date").val().length == 0 || new Date(startDate) > new Date(endDate)){
			pollShowconfirmmsg(pollmessage.endtdate, confirm_Error, 5000, "", false, false);
		} else {
			var date = new Date();
			var jsonInput = {"action":"changePollDatesServiceAfter", "id":$("#divpollchangedate").attr("data-poll-id"),
				"startDate":formatAddTZDate(startDate.replace("T"," "),true),
				"endDate":formatAddTZDate(endDate.replace("T"," "),true),"timeZoneOffsetMinutes":date.getTimezoneOffset()};
			changePollDatesService(jsonInput);
		}
		return false;
	});

	unbindobject("#btn_voter_list_add");
	$("#btn_voter_list_add").bind("click", function(event){
		$("#txt_poll_voter_email_id").val("");
		$("#txt_poll_voter_mobile").val("");
		$("#txt_poll_voter_pssword").val("");
		$("#txt_poll_voter_percentage").val("0");
		$("#div_voter_percentage").hide();
		$("#span_poll_voter_percentage_required").html("");
		if($("#div_poll_"+highlightrowid).attr("data-weighedvotes")==1){
			$("#span_poll_voter_percentage_required").html("*");
			$("#div_voter_percentage").show();
		}
		if(voterPassProtect == ""){
			$("#poll_password").hide();
		}else{
			$("#poll_password").show();
		}
		showActionPopup("div_poll_voter_add", false);
		hideActionPopup("div_voter_list");
		return false;
	});

	unbindobject("#btn_poll_voter_add_close,#btn_poll_voter_add_close_icon");
	$("#btn_poll_voter_add_close,#btn_poll_voter_add_close_icon").bind("click", function(event){
		pollfetchTotalVoterCount(highlightrowid,"");
		hideActionPopup("div_poll_voter_add");
		showActionPopup("div_voter_list", false);
		return false;
	});

	unbindobject("#btn_voter_download_template");
	$("#btn_voter_download_template").bind("click", function(event){
		window.open("template/Voter_Template.csv");
		return false;
	});

	unbindobject("#btn_poll_voter_add_save");
	$("#btn_poll_voter_add_save").bind("click", function(event){
		var loginId = $("#txt_poll_voter_email_id").val();
		var mobileNumber = $("#txt_poll_voter_mobile").val();
		var countryCode = $("#txt_poll_voter_mobile").intlTelInput("getSelectedCountryData").dialCode;
		var voteWeightage = $("#txt_poll_voter_percentage").val();
		var password = $("#txt_poll_voter_pssword").val();
		if(loginId.trim().length == 0 || !validateEmail(loginId) || !stringcheckifnonascii(loginId)){
			pollShowconfirmmsg(pollmessage.error_voterloginid, confirm_Error, 5000, "", false, false);
		}  else if(mobileNumber.trim().length > 0 && ((mobileNumber.trim().length < 5 || mobileNumber.trim().length > 11) || (!isValidphone(mobileNumber) || !stringcheckifnonascii(mobileNumber)))){
			pollShowconfirmmsg(pollmessage.error_votermobilenumber, confirm_Error, 5000, "", false, false);
		} else if((voterPassProtect == 1) && (password == "" || password == null || password == undefined || password.toLowerCase() == "null" || password.toLowerCase() == "undefined")){
			pollShowconfirmmsg(pollmessage.enter_password, confirm_Error, 5000, "", false, false);
		} else {
			if(mobileNumber.trim().length > 0)
				mobileNumber = "+" + countryCode + " " + mobileNumber;
			else
				mobileNumber = "";
			var jsonInput = {
				"action": "pollAddVoterListServiceAfter", "pollId": highlightrowid,
				"pollVoterList": [{ "pollId": highlightrowid, "loginId": loginId, "mobileNumber": mobileNumber, "voteWeightage": voteWeightage, "otp": password }]
			};

			pollAddVoterListService(jsonInput);
		}
		return false;
	});

	unbindobject("#btn_poll_voter_select_all");
	$("#btn_poll_voter_select_all").bind("click", function(event){
		if($(".chk_poll_voter").is(":checked")){
			$(".chk_poll_voter").prop("checked", false);
		} else {
			$(".chk_poll_voter").prop("checked", true);
		}
		return false;
	});

	unbindobject("#btn_poll_voter_resend_invite_not_voted");
	$("#btn_poll_voter_resend_invite_not_voted").bind("click", function(event){
		if($(".chk_poll_voter").is(":checked")){
			$(".chk_poll_voter").prop("checked", false);
		} else {
			$(".clr_notvoted").prop("checked", true);
		}
		return false;
	});

	unbindobject("#btn_poll_voter_delete_all");
	$("#btn_poll_voter_delete_all").bind("click", function(event){
		pollDeleteVoterService();
		return false;
	});

	unbindobject("#btn_poll_agenda_add_close_icon,#btn_poll_agenda_add_close");
	$("#btn_poll_agenda_add_close_icon,#btn_poll_agenda_add_close").bind("click", function(event){
		$(".tox-tinymce-aux").hide();
		hideActionPopup("div_poll_agenda_add");
		return false;
	});

	unbindobject("#btn_poll_agenda_add_save");
	$("#btn_poll_agenda_add_save").bind("click", function(event){
		var agenda = tinymce.activeEditor.getContent(); // get the content of RichText editor
		if(agenda.length > 0){
			pollAddAgendaService(agenda);
			$(".tox-tinymce-aux").hide();
		} else {
			pollShowconfirmmsg(pollmessage.error_agendacommon, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#search_sec");
	$("#search_sec").bind("click", function (event) {
		$("#search_div").show();
		$('#txt_voter_search').val("");
		$('#txt_voter_search').focus();
	});

	unbindobject("#voter_search");
	$("#voter_search").bind("click", function (event) {
		pollVoterSearch();
	});

	unbindobject("#voter_search_cancle");
	$("#voter_search_cancle").bind("click", function (event) {
		$('#txt_voter_search').val("");
		$("#search_div").hide();
		pollfetchTotalVoterCount(highlightrowid,"");
	});


 	unbindobject("#btn_voter_list_close_icon,#btn_voter_list_close");
	$("#btn_voter_list_close_icon,#btn_voter_list_close").bind("click", function(event){
	    hideActionPopup("div_voter_list");
	    if(pollVoterScreen) showActionPopup("divNewPoll", false);
	    pollVoterScreen = false;
		pollFetchList();
 	});

	unbindobject("#profIm");
	$("#profIm").bind("click", function(event){
		ajaxindicatorstart('fetching profile.. please wait..');
		pollSingleUserProfileServiceNew(true);
		pollFetchStorageLeftService(false);
		showActionPopup("userprofilemodal");
	});

	unbindobject("#btn_voter_import");
	$("#btn_voter_import").bind("click", function(event){
		$("#btnvoterfilechoose").click();
		return false;
	});

	$("#btnvoterfilechoose").on('change', function () {
		currentfile = this.files[0];
		pollImportVoterService();
		return false;
	});

	unbindobject("#btn_voter_export_pdf");
	$("#btn_voter_export_pdf").click(function(){
		pollVoterExportService("PDF");
		return false;
	});

	unbindobject("#btn_voter_export_excel");
	$("#btn_voter_export_excel").click(function(){
		pollVoterExportService("EXCEL");
		return false;
	});

	var input = $("#txt_poll_voter_mobile");
	input.intlTelInput(	{
		separateDialCode: true
	});

	input.on("countrychange", function() {
		input.val('')
	});

	$(".iti--allow-dropdown").css("width", "100%");

	var input = $("#mmobilenumber");
	input.intlTelInput(	{
		separateDialCode: true
	});

	input.on("countrychange", function() {
		input.val('')
	});

	$(".iti__selected-flag").css("max-width", "75px");

}

function checkBoxEvent(){
	if(!$("#chkpassprotect").is(":checked")){
		$("#emailNotif").prop("checked", true);
	}
	if($("#chkpassprotect").is(":checked")){
		$("#pass_label_div").show();
	}else{
		$("#pass_label_div").hide();
	}
	if(!$("#emailNotif").is(":checked")){
		$("#chkvoterreceipt").prop("checked", false);
	}

	if($("#chk_poll_clone_voters").is(":checked")){
		$("#poll_clone_view_voter_span").show();
	}else{
		$("#poll_clone_view_voter_span").hide();
	}

	if ($("#div_poll_clone_new").is(':visible')) {
		if (($("#chk_poll_single_password_protect_" + highlightrowid).is(":checked") && $("#chkpassprotect").is(":checked"))
			|| (!$("#chk_poll_single_password_protect_" + highlightrowid).is(":checked") && !$("#chkpassprotect").is(":checked"))) {
			$("#clone_voter_span").show();
			$("#clone_voter_label").show();
		} else {
			$("#clone_voter_span").hide();
			$("#clone_voter_label").hide();
		}
	}
}

function pollRowEvents(id){
	unbindobject("#div_poll_publish_"+id);
	$("#div_poll_publish_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_publish_", "");
		pollPublishAction(idm);
		return false;
	});

	unbindobject("#div_poll_close_"+id);
	$("#div_poll_close_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_close_", "");
		if(confirm('This action will put an end to the poll and people will no longer be able to vote on it. Do you wish to close the poll seclcted with serial no '+$("#div_poll_serial_key_"+idm).html()+'?') == true) {
			changePollStatusService(idm, POLL_STATUS_CLOSED);
		}
		return false;
	});
	unbindobject("#div_poll_preview_"+id);
	$("#div_poll_preview_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_preview_", "");
		if(confirm('Sending Poll to preview state you will loose all votes casted. Do you wish to send the poll seclcted to preview with serial no '+$("#div_poll_serial_key_"+idm).html()+'?') == true) {
			changePollStatusService(idm, POLL_STATUS_PREVIEW);
		}
		return false;
	});

	unbindobject("#div_poll_"+id);
	$("#div_poll_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_", "");
		highlightrowid = idm;
		pollSingleFetch(false);
		return false;
	});

	unbindobject("#div_poll_change_date_"+id);
	$("#div_poll_change_date_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_change_date_", "");
		$("#divstartdate").hide();
		if($("#div_poll_"+idm).attr("data-status")==POLL_STATUS_PREVIEW){
			$("#divstartdate").show();
		}
		//$("#txt_poll_start_date").val($("#div_poll_"+idm).attr("data-startdate").replace("Z", ".000"));
		//$("#txt_poll_end_date").val($("#div_poll_"+idm).attr("data-enddate").replace("Z", ".000"));

		var startdate = $("#div_poll_"+idm).attr("data-startdate");
		document.getElementById("txt_poll_start_date").value = startdate.substring(0, startdate.indexOf("T"));
		var enddate = $("#div_poll_"+idm).attr("data-enddate");
		document.getElementById("txt_poll_end_date").value = enddate.substring(0, enddate.indexOf("T"));

		$("#divpollchangedate").attr("data-poll-id", idm);
		$("#divchangepolldatetitle").html("Change start date and end date - Serial No : " + $("#div_poll_serial_key_"+idm).html().replace(".", ""));
		showActionPopup("divpollchangedate", false);
		return false;
	});

	unbindobject("#div_poll_delete_"+id);
	$("#div_poll_delete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_delete_", "");
		if(confirm('Do you wish to delete the poll seclcted with serial no '+$("#div_poll_serial_key_"+idm).html()+'?') == true) {
			deletePollService(idm);
		}
		return false;
	});

	unbindobject("#span_poll_allow_vote_change_"+id);
	$("#span_poll_allow_vote_change_"+id).bind("click", function(event){
		var idm = (this.id).replace("span_poll_allow_vote_change_", "");
		if($("#div_poll_"+idm).attr("data-status") != 3){
			if($("#chk_poll_allow_vote_change_"+idm).is(":checked")){
				$("#chk_poll_allow_vote_change_"+idm).prop("checked", false);
				pollAllowVoteChangeService(idm, 2);
			} else {
				$("#chk_poll_allow_vote_change_"+idm).prop("checked", true);
				pollAllowVoteChangeService(idm, 1);
			}
		} else {
			pollShowconfirmmsg(pollmessage.error_pollclosed, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#span_poll_voter_receipt_email_"+id);
	$("#span_poll_voter_receipt_email_"+id).click(function(){
		var idm = (this.id).replace("span_poll_voter_receipt_email_", "");
		if($("#div_poll_"+idm).attr("data-status") != 3){
			if($("#chk_poll_voter_receipt_email_"+idm).is(":checked")){
				$("#chk_poll_voter_receipt_email_"+idm).prop("checked", false);
				pollChangeVoterReceiptService(idm, 2);
			} else {
				$("#chk_poll_voter_receipt_email_"+idm).prop("checked", true);
				pollChangeVoterReceiptService(idm, 1);
			}
		} else {
			pollShowconfirmmsg(pollmessage.error_pollclosed, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#span_poll_weighed_votes_"+id);
	$("#span_poll_weighed_votes_"+id).click(function(){
		var idm = (this.id).replace("span_poll_weighed_votes_", "");
		if($("#div_poll_"+idm).attr("data-status") == 1){
			if($("#chk_poll_weighed_votes_"+idm).is(":checked")){
				$("#chk_poll_weighed_votes_"+idm).prop("checked", false);
				pollChangeWeighedVotesService(idm, 2);
			} else {
				$("#chk_poll_weighed_votes_"+idm).prop("checked", true);
				pollChangeWeighedVotesService(idm, 1);
			}
		} else {
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#div_poll_voter_list_"+id);
	$("#div_poll_voter_list_"+id).click(function(){
		var idm = (this.id).replace("div_poll_voter_list_", "");
		$("#btn_voter_list_add").hide();
		$("#btn_voter_download_template").hide();
		$("#btn_voter_import").hide();
		$("#btn_poll_voter_select_all").hide();
		$("#btn_poll_voter_delete_all").hide();
		$("#btn_poll_voter_resend_invite_all").hide();
		$("#btn_poll_voter_resend_invite_not_voted").hide();
		$("#divpages_poll").empty();
		$(".trpollvoter").remove();
		var pollStatus = $("#div_poll_single_"+highlightrowid).attr("data-status");
		if(pollStatus == 1) {
			$("#btn_voter_list_add").show();
			$("#btn_voter_download_template").show();
			$("#btn_voter_import").show();
			$("#btn_poll_voter_select_all").show();
			$("#btn_poll_voter_delete_all").show();
		}

		if(pollStatus == 2) {
			if(sendNotifEmail != 0) $("#btn_poll_voter_resend_invite_all").show();
			$("#btn_poll_voter_resend_invite_not_voted").show();
		}
		pollfetchTotalVoterCount(highlightrowid,"");
		showActionPopup("div_voter_list", false);
		return false;
	});

	unbindobject("#div_poll_clone_"+id);
	$("#div_poll_clone_"+id).click(function(){
		pollClearPostFields();
		var idm = (this.id).replace("div_poll_clone_", "");
		highlightrowid = idm;
		showActionPopup("divNewPoll", false);
		$("#chk_poll_clone_agenda").prop("checked", false);
		$("#div_poll_clone_new").show();
		return false;
	});
}

function pollSingleRowEvents(id){
	unbindobject("#div_poll_single_publish_"+id);
	$("#div_poll_single_publish_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_single_publish_", "");
		pollPublishAction(idm);
		return false;
	});

	unbindobject("#div_poll_single_close_"+id);
	$("#div_poll_single_close_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_single_close_", "");
		if(confirm('Do you wish to close the poll selected with serial no '+$("#div_poll_serial_key_"+idm).html()+'?') == true) {
			changePollStatusService(idm, POLL_STATUS_CLOSED);
		}
		return false;
	});

	unbindobject("#div_poll_single_preview_"+id);
	$("#div_poll_single_preview_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_single_preview_", "");
		if(confirm('Sending Poll to preview state you will loose all votes casted. Do you wish to send the poll seclcted to preview with serial no '+$("#div_poll_serial_key_"+idm).html()+'?') == true) {
			changePollStatusService(idm, POLL_STATUS_PREVIEW);
		}
		return false;
	});

	unbindobject("#div_poll_single_"+id);
	$("#div_poll_single_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_single_", "");
		highlightrowid = idm;
		pollSingleFetch(false);
		return false;
	});

	unbindobject("#div_poll_single_change_date_"+id);
	$("#div_poll_single_change_date_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_single_change_date_", "");
		$("#divstartdate").hide();
		if($("#div_poll_single_"+idm).attr("data-status")==POLL_STATUS_PREVIEW){
			$("#divstartdate").show();
		}

		//$("#txt_poll_start_date").val($("#div_poll_single_"+idm).attr("data-startdate").replace("Z", ".000"));
		//$("#txt_poll_end_date").val($("#div_poll_single_"+idm).attr("data-enddate").replace("Z", ".000"));

		var startdate = $("#div_poll_single_"+idm).attr("data-startdate").replace("Z",".000");
		$("#txt_poll_start_date").val(startdate.replace("T"," "));
		var enddate = $("#div_poll_single_"+idm).attr("data-enddate").replace("Z",".000");
		$("#txt_poll_end_date").val(enddate.replace("T"," "));

		$("#divpollchangedate").attr("data-poll-id", idm);
		if($("#div_poll_single_"+idm).attr("data-status")==POLL_STATUS_PREVIEW){
			$("#divchangepolldatetitle").html("Change start date and end date - Serial No : " + $("#div_poll_single_serial_key_"+idm).html().replace(".", ""));
		}else{
			$("#divchangepolldatetitle").html("Change end date - Serial No : " + $("#div_poll_single_serial_key_"+idm).html().replace(".", ""));
		}
		showActionPopup("divpollchangedate", false);
		return false;
	});

	unbindobject("#div_poll_single_delete_"+id);
	$("#div_poll_single_delete_"+id).bind("click", function(event){
		var idm = (this.id).replace("div_poll_single_delete_", "");
		if(confirm('Do you wish to delete the poll selected with serial no '+$("#div_poll_single_serial_key_"+idm).html()+'?') == true) {
			deletePollService(idm);
		}
		return false;
	});

	unbindobject("#span_poll_single_allow_vote_change_"+id);
	$("#span_poll_single_allow_vote_change_"+id).bind("click", function(event){
		var idm = (this.id).replace("span_poll_single_allow_vote_change_", "");
		if($("#div_poll_single_"+idm).attr("data-status") != 3){
			if($("#chk_poll_single_allow_vote_change_"+idm).is(":checked")){
				$("#chk_poll_single_allow_vote_change_"+idm).prop("checked", false);
				pollAllowVoteChangeService(idm, 2);
			} else {
				$("#chk_poll_single_allow_vote_change_"+idm).prop("checked", true);
				pollAllowVoteChangeService(idm, 1);
			}
		} else {
			pollShowconfirmmsg(pollmessage.error_pollclosed, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#span_poll_single_voter_receipt_email_"+id);
	$("#span_poll_single_voter_receipt_email_"+id).click(function(){
		var idm = (this.id).replace("span_poll_single_voter_receipt_email_", "");
		if($("#div_poll_single_"+idm).attr("data-status") == 1){
			if($("#chk_poll_single_receipt_email_notification_"+idm).is(":checked")){
				if($("#chk_poll_single_voter_receipt_email_"+idm).is(":checked")){
					$("#chk_poll_single_voter_receipt_email_"+idm).prop("checked", false);
					pollChangeVoterReceiptService(idm, 2);
				} else {
					$("#chk_poll_single_voter_receipt_email_"+idm).prop("checked", true);
					pollChangeVoterReceiptService(idm, 1);
				}
			}else{
				$("#chk_poll_single_voter_receipt_email_"+idm).prop("checked", false);
				pollChangeVoterReceiptService(idm, 2);
			}
			
		} else {
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#span_poll_single_receipt_email_notification_"+id);
	$("#span_poll_single_receipt_email_notification_"+id).click(function(){
		var idm = (this.id).replace("span_poll_single_receipt_email_notification_", "");
		if($("#div_poll_single_"+idm).attr("data-status") == 1){
			if($("#chk_poll_single_password_protect_"+idm).is(":checked")){
				if($("#chk_poll_single_receipt_email_notification_"+idm).is(":checked")){
					$("#chk_poll_single_receipt_email_notification_"+idm).prop("checked", false);
					$("#chk_poll_single_voter_receipt_email_"+idm).prop("checked", false);
					pollChangeVoterReceiptService(idm, 2);
					pollChangeReceiptEmailNotificationService(idm, 2);
				}else{
					$("#chk_poll_single_receipt_email_notification_"+idm).prop("checked", true);
					pollChangeReceiptEmailNotificationService(idm, 1);
				}
				
			} else {
				$("#chk_poll_single_receipt_email_notification_"+idm).prop("checked", true);
				pollChangeReceiptEmailNotificationService(idm, 1);
			}
		} else {
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#span_poll_single_weighed_votes_"+id);
	$("#span_poll_single_weighed_votes_"+id).click(function(){
		var idm = (this.id).replace("span_poll_single_weighed_votes_", "");
		if($("#div_poll_"+idm).attr("data-status") == 1){
			if($("#chk_poll_single_weighed_votes_"+idm).is(":checked")){
				$("#chk_poll_single_weighed_votes_"+idm).prop("checked", false);
				pollChangeWeighedVotesService(idm, 2);
			} else {
				$("#chk_poll_single_weighed_votes_"+idm).prop("checked", true);
				pollChangeWeighedVotesService(idm, 1);
			}
		} else {
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		}
		return false;
	});

	unbindobject("#div_poll_single_voter_list_"+id);
	$("#div_poll_single_voter_list_"+id).click(function(){
		var idm = (this.id).replace("div_poll_single_voter_list_", "");
		$("#btn_voter_list_add").hide();
		$("#btn_voter_download_template").hide();
		$("#btn_voter_import").hide();
		$("#tr_voter_select_delete").hide();
		$("#btn_poll_voter_resend_invite_all").hide();
		$("#btn_poll_voter_resend_invite_not_voted").hide();
		$("#btn_poll_voter_delete_all").hide();
		$("#divpages_poll").empty();
		$(".trpollvoter").remove();
		$("#search_div").hide();
		var pollStatus = $("#div_poll_single_"+highlightrowid).attr("data-status");
		if(pollStatus == 1) {
			$("#btn_voter_list_add").show();
			$("#btn_voter_download_template").show();
			$("#btn_voter_import").show();
			$("#btn_poll_voter_delete_all").show();
		}
		if(pollStatus == 2) {
			$("#tr_voter_select_delete").show();
			if(sendNotifEmail != 0) $("#btn_poll_voter_resend_invite_all").show();
			$("#btn_poll_voter_resend_invite_not_voted").show();
		}
		pollfetchTotalVoterCount(highlightrowid,"");
		showActionPopup("div_voter_list", false);
		return false;
	});

	unbindobject("#div_poll_single_clone_"+id);
	$("#div_poll_single_clone_"+id).click(function(){
		pollClearPostFields();
		var idm = (this.id).replace("div_poll_single_clone_", "");
		highlightrowid = idm;
		showActionPopup("divNewPoll", false);
		$("#chk_poll_clone_agenda").prop("checked", false);
		$("#div_poll_clone_new").show();
		if($("#chk_poll_single_password_protect_" + highlightrowid).is(":checked")){
			$("#chkpassprotect").click();
		}
		if (($("#chk_poll_single_password_protect_" + highlightrowid).is(":checked") && $("#chkpassprotect").is(":checked"))
			|| (!$("#chk_poll_single_password_protect_" + highlightrowid).is(":checked") && !$("#chkpassprotect").is(":checked"))) {
			$("#clone_voter_span").show();
			$("#clone_voter_label").show();
		} else {
			$("#clone_voter_span").hide();
			$("#clone_voter_label").hide();
		}
		return false;
	});

	unbindobject("#div_poll_export_pdf_"+id);
	$("#div_poll_export_pdf_"+id).click(function(){
		pollExportService("PDF");
		return false;
	});

	unbindobject("#div_poll_export_excel_"+id);
	$("#div_poll_export_excel_"+id).click(function(){
		pollExportService("EXCEL");
		return false;
	});

	unbindobject("#div_poll_single_add_agenda_"+id);
	$("#div_poll_single_add_agenda_"+id).bind("click", function(event){
  	$("#txt_poll_agenda").val("");
		$(".tox-tinymce-aux").show();
		showActionPopup("div_poll_agenda_add", false);
		tinyRichTextEditor();
		tinymce.activeEditor.setContent('');
		tinymce.activeEditor.focus();
		$("#tinymce").focus();
		return false;
	});

	unbindobject("#vote_link_copy_"+id);
	$("#vote_link_copy_"+id).bind("click", function(event){
		var idm = (this.id).replace("vote_link_copy_", "");
		var voateLink = window.location.href;
		if(voateLink.indexOf("dcirrus.io") > -1){
			voateLink = voateLink.replace("://","://evoting.");
		}
		voateLink = voateLink.replace("pollmaster.html","poll_single.html?p="+idm+"&c="+localStorage._zw);
		navigator.clipboard.writeText(voateLink);
		pollShowconfirmmsg(pollmessage.link_copied, confirm_Success, 5000, "", false, false);
		return false;
	});

}

function pollVoterRowEvents(id) {
	unbindobject("#div_poll_voter_delete_"+id);
	$("#div_poll_voter_delete_"+id).click(function(){
		var idm = (this.id).replace("div_poll_voter_delete_", "");
		$(".chk_poll_voter").prop("checked", false);
		$("#chk_poll_voter_"+idm).prop("checked", true);
		pollDeleteVoterService();
		pollFetchList();
		return false;
	});

	unbindobject("#div_poll_voter_send_reminder_"+id);
	$("#div_poll_voter_send_reminder_"+id).click(function(){
		var idm = (this.id).replace("div_poll_voter_send_reminder_", "");
		$(".chk_poll_voter").prop("checked", false);
		$("#chk_poll_voter_"+idm).prop("checked", true);
		pollPrepareResendInviteJSON();
		return false;
	});
}

function pollAgendaRowEvents(id){
	unbindobject("#link_agenda_more_"+id);
	$("#link_agenda_more_"+id).click(function(){
		var idm = (this.id).replace("link_agenda_more_", "");
		$("#p_agenda_short_"+idm).hide();
		$("#p_agenda_"+idm).show();
		return false;
	});

	unbindobject("#link_agenda_less_"+id);
	$("#link_agenda_less_"+id).click(function(){
		var idm = (this.id).replace("link_agenda_less_", "");
		$("#p_agenda_"+idm).hide();
		$("#p_agenda_short_"+idm).show();
		return false;
	});

	unbindobject("#div_agenda_delete_"+id);
	$("#div_agenda_delete_"+id).click(function(){
		var idm = (this.id).replace("div_agenda_delete_", "");
		pollDeleteAgendaService(idm);
		return false;
	});
}

function pollPrevewCommonEvents(){
	unbindobject("#btn_poll_publish");
	$("#btn_poll_publish").bind("click", function(event){
		if(confirm('Do you wish to publish the poll')) {
			changePollStatusService(highlightrowid, POLL_STATUS_RUNNING);
		}
		return false;
	});
}

function pollPageEvents(id){
	unbindobject("#pagecount_poll_"+id);
	$("#pagecount_poll_"+id).bind("click", function(event){
		var pollId = $("#pagecount_poll_"+id).attr("data-pollId");
		var pageNo = $("#pagecount_poll_"+id).attr("data-pageno");
		var loginId = $("#pagecount_poll_"+id).attr("data-loginId");
		pollfetchVoterList(pollId, pageNo, loginId);
		return false;
	});
}

function pollViewPasswordEvent(){
	unbindobject("#password-field");
	$("#password-field").bind("click", '.toggle-password', function(event){
			$(this).toggleClass("fa-eye fa-eye-slash");
			var input = $("#txt_poll_voter_pssword");
			input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password')
	});
}

function tinyRichTextEditor() {
	tinymce.init({
		selector: '#txt_poll_agenda',
		plugins: 'textcolor anchor autolink charmap codesample emoticons image lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect',
		toolbar: 'undo redo | blocks fontfamily fontsize fontcolor | forecolor backcolor | bold italic underline strikethrough | table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent | removeformat',
		tinycomments_mode: 'embedded',
		tinycomments_author: 'Author name',
		mergetags_list: [{
				value: 'First.Name',
				title: 'First Name'
			},
			{
				value: 'Email',
				title: 'Email'
			},
		],
	});
}