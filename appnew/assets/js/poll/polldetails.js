function pollAddServiceAfter(response){
	ajaxindicatorstop();
	if(response != null && response.object != null){
		hideActionPopup("divNewPoll");
		var extraParam = response.extrajsonparam;
		if(extraParam != null && extraParam.id > 0) {
			//do nothing
		} else {
			pollsortorder = 1;
			highlightrowid = 0;
			pollFetchList();
		}
	} else {
		if(response.message == "NOPERMISSION"){
			hideActionPopup("divNewPoll");
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLPRESENT"){
			pollShowconfirmmsg(pollmessage.error_pollexists, confirm_Error, 5000, "", false, false);
		}else if(response.message == "POLLEXCEEDLIMIT"){
			pollShowconfirmmsg(pollmessage.error_poll_exceed_limit, confirm_Error, 5000, "", false, false);
		}else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollFetchListAfter(response){
	$("#card-mb-2").empty();
	$("#div_single_poll").empty();
	$("#div_poll_agenda_list").empty();

	ajaxindicatorstop();
	if(response != null && !response.error && response.object != null){
		for(var i=0;i<response.object.length;i++){
			pollDataPrepare(response.object[i], false);
		}

		if(highlightrowid==0){
			highlightrowid = response.object[0].id;
		}

		pollSingleFetch(false);
		pollPageSize();
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollSingleFetchAfter(response){
	$("#div_single_poll").empty();
	$("#div_poll_agenda_list").empty();
	ajaxindicatorstop();
	if(response != null && !response.error && response.object != null){
		sendNotifEmail = response.object.sendCreateEmail;
		if(pollupdateleft) {
			pollupdateleft = false;
			pollDataPrepare(response.object, true);
		}
		var extraParam = response.extrajsonparam;
		if(extraParam.isPreview){
			pollPreviewSingleDataPrepare(response.object);
		} else {
			pollSingleDataPrepare(response.object);
			pollHighlightRow();
		}
		if(response.object.status == 3){
			$("#poll_vote_row").hide();
		}
		pollFetchAgendaService(extraParam.isPreview);
	}
}

function pollDataPrepare(data, issingle){
	var id = data.id;
	var pollTitle = data.name;

	var startDate = getdatefromutcdata(handleNullValue(data.startDate), true);
	var endDate = getdatefromutcdata(handleNullValue(data.endDate), true);
	var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);

	var noOfVoters = data.noOfVoters;
	var noOfAgenda = data.noOfAgenda;
	var createdBy = data.createdByStr;
	var allowVoteChange = (data.allowVoteChange == 1 ? "checked":"");
	var voterReceiptEmail = (data.voterReceiptEmail == 1 ? "checked":"");
	var weightageVotes = (data.weightageVotes == 1 ? "checked":"");
	var status = data.status;
	var serialKey = data.serialKey;
	if(issingle){
		serialKey = $("#div_poll_serial_key_"+id).html().replaceAll(".","");
	}
	var statusText = "";
	var statusColor = "";
	var allowVoteChangedisabled = "";
	var voterReceiptEmailDisabled = "";
	var weightageVotesDisabled = "";
	if(status == 1){
		statusText = "Preview";
		statusColor = "orange";
	} else if(status == 2){
		statusText = "Running";
		statusColor = "green";
		weightageVotesDisabled = "disabled";
	} else if(status == 3){
		statusText = "Closed";
		statusColor = "grey";
		allowVoteChangedisabled = "disabled";
		voterReceiptEmailDisabled = "disabled";
		weightageVotesDisabled = "disabled";
	}

	pollTitle = linkify(pollTitle);
	pollTitle = pollTitle.replace(/(?:\r\n|\r|\n)/g, '<br>');

	var str = "";
	if(!issingle){
		str += "<div class='card mb-2' id='div_poll_"+id+"' style='cursor:pointer;' data-status='"+status+"' data-id="+id+" ";
		str += "data-startdate='"+data.startDate+"' data-enddate='"+data.endDate+"' data-weighedvotes="+data.weightageVotes+" ";
		str += "data-noofagendas='"+noOfAgenda+"' data-noofvoters='"+noOfVoters+"'>";
		str += "</div>";
		$("#card-mb-2").append(str);
		str = "";
	}
	str += "	<div class='card-body p-2 p-sm-3'>";
	str += "		<div class='media forum-item'>";
	str += "			<a href='javascript:void(0);' class='float-right' style='height:24px;margin-right:5px;font-weight:bold;'>";
	str += "				<span id='div_poll_serial_key_"+id+"'>"+serialKey+".</span>";
	str += "			</a>";
	str += "			<div class='media-body'>";
	str += "				<h5>";
	str += "					<p class='text-secondary' id='div_poll_title_"+id+"' title='"+pollTitle+"' ";
	str += "						style='color:black !important;margin-top:2px;margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;'>Poll : "+pollTitle+"</p>";
	str += "				</h5>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>Poll Start Date : <span id='div_poll_startdate_"+id+"'>"+startDate+"</span></span>";
	str += "					<span> | Poll End Date : <span id='div_poll_enddate_"+id+"'>"+endDate+"</span></span>";
	str += "					<span> | <i class='fa fa-circle' style='color:"+statusColor+";'></i> "+statusText+"</span>";
	str += "				</p>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>Created By <span>"+createdBy+" on "+createdDate+" </span></span>";
	str += "				</p>";
	str += "			</div>";
	str += "		</div>";
	str += "	</div>";
	$("#div_poll_"+id).html(str);
	pollRowEvents(id);
}

function pollSingleDataPrepare(data){
	var id = data.id;
	var pollTitle = data.name;

	var startDate = getdatefromutcdata(handleNullValue(data.startDate), true);
	var endDate = getdatefromutcdata(handleNullValue(data.endDate), true);
	var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);

	var noOfVoters = data.noOfVoters;
	var noOfAgenda = data.noOfAgenda;
	var createdBy = data.createdByStr;
	var allowVoteChange = (data.allowVoteChange == 1 ? "checked":"");
	var voterReceiptEmail = (data.voterReceiptEmail == 1 ? "checked":"");
	var weightageVotes = (data.weightageVotes == 1 ? "checked":"");
	var status = data.status;
	var serialKey = data.serialKey;
	var statusText = "";
	var statusColor = "";
	var allowVoteChangedisabled = "";
	var voterReceiptEmailDisabled = "";
	var weightageVotesDisabled = "";
	var voterReceiptEmailNotif = (data.sendCreateEmail == 1 ? "checked":"");
	voterPassProtect = (data.passLogin == 1 ? "checked":"");
	if(status == 1){
		statusText = "Preview";
		statusColor = "orange";
	} else if(status == 2){
		statusText = "Running";
		statusColor = "green";
		weightageVotesDisabled = "disabled";
	} else if(status == 3){
		statusText = "Closed";
		statusColor = "grey";
		allowVoteChangedisabled = "disabled";
		voterReceiptEmailDisabled = "disabled";
		weightageVotesDisabled = "disabled";
	}

	$("#div_add_agenda_row").hide();
	if(status == 1) {
		$("#div_add_agenda_row").show();
	}

	pollTitle = linkify(pollTitle);
	pollTitle = pollTitle.replace(/(?:\r\n|\r|\n)/g, '<br>');

	var str = "";
	str += "<div class='card mb-2' id='div_poll_single_"+id+"' style='cursor:pointer;' data-status='"+status+"' data-id="+id+" ";
	str += "data-startdate='"+moment(new Date(Date.parse(data.startDate))).format("YYYY-MM-DD HH:mm:ss")+"' data-enddate='"+moment(new Date(Date.parse(data.endDate))).format("YYYY-MM-DD HH:mm:ss")+"' data-weighedvotes="+data.weightageVotes+">";
	str += "	<div class='card-body p-2'>";
	str += "		<div class='media forum-item'>";
	str += "			<a href='javascript:void(0);' class='float-right' style='height:24px;margin-right:5px;font-weight:bold;'>";
	str += "				<span id='div_poll_single_serial_key_"+id+"'>"+serialKey+".</span>";
	str += "			</a>";
	str += "			<div class='media-body'>";
	str += "				<h5>";
	str += "					<p class='text-secondary' id='div_poll_single_title_"+id+"' title='"+pollTitle+"' style='color:black !important;margin-top:2px;margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;'>Poll : "+pollTitle+"</p>";
	str += "				</h5>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>Poll Start Date : <span id='div_poll_single_startdate_"+id+"'>"+startDate+"</span></span>";
	str += "					<span> | Poll End Date : <span id='div_poll_single_enddate_"+id+"'>"+endDate+"</span></span>";
	str += "					<span> | <i class='fa fa-circle' style='color:"+statusColor+";'></i> "+statusText+"</span>";
	str += "				</p>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>Created By <span>"+createdBy+" on "+createdDate+" </span></span>";
	str += "					<span id='div_poll_export_pdf_"+id+"' style='cursor:pointer; margin-left: 3px;'> | <a href='javascript:void(0);' style='text-decoration:none;'>Export Poll</a> <img style='margin-top:0px;width:22px;' class='respons' src='"+checkFileExtention("pdf")+"' alt=''></span>";
	str += "					<span id='div_poll_export_excel_"+id+"' style='cursor:pointer;'> | <a href='javascript:void(0);' style='text-decoration:none;'>Export Poll</a> <img style='margin-top:0px;width:22px;' class='respons' src='"+checkFileExtention("xlsx")+"' alt=''></span>";
	str += "				</p>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>No of voters : <span id='div_single_noofvoters_"+id+"'>"+noOfVoters+" </span></span>";
	str += "					<span> | No of agendas : <span id='div_single_noofagendas_"+id+"'>"+noOfAgenda+" </span></span>";
	if(status == 2) {
	str += "					<span style='display:none;'> | <a id='div_poll_single_preview_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Amend Poll</a></span>";
	} else if(status == 3) {
	str += "					<span style='display:none;'> | <a id='div_poll_single_preview_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Amend Poll</a></span>";
	}
	if(status == 2) {
	str += "					<span> | <a id='div_poll_single_close_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Close Poll</a></span>";
	}
	if(status == 1 || status == 2) {
	str += "					<span> | <a id='div_poll_single_change_date_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>"+(status == 1?"Change Dates":"Change End Date")+"</a></span>";
	}
	str += "					<span> | <a id='div_poll_single_clone_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Clone</a></span>";
	if(status == 1 || status == 3) {
	str += "					<span> | <a id='div_poll_single_delete_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Delete</a></span>";
	}
	str += "				</p>";
	str += "				<p id='poll_vote_row' class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span id='span_poll_single_allow_vote_change_"+id+"'>Allow Vote Change";
	str += "						<span>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' "+allowVoteChangedisabled+"  id='chk_poll_single_allow_vote_change_"+id+"' "+allowVoteChange+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span id='span_poll_single_voter_receipt_email_"+id+"'> | Voter Receipt Email";
	str += "						<span>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' "+voterReceiptEmailDisabled+"  id='chk_poll_single_voter_receipt_email_"+id+"' "+voterReceiptEmail+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span id='span_poll_single_weighed_votes_"+id+"'> | Weighed Votes";
	str += "						<span>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' "+weightageVotesDisabled+"  id='chk_poll_single_weighed_votes_"+id+"' "+weightageVotes+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "				</p>";
	str += "				<p>";
	str += "					<span id='span_poll_single_receipt_email_notification_"+id+"'> Email Notification";
	str += "						<span>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input id='chk_poll_single_receipt_email_notification_"+id+"' type='checkbox'"+voterReceiptEmailNotif+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span> | Password Protect ";
	str += "						<span>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input id='chk_poll_single_password_protect_"+id+"' type='checkbox' disabled "+voterPassProtect+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "				</p>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span><button id='div_poll_single_voter_list_"+id+"' style='cursor:pointer;background:#3bc4c6;color:white;border-radius:23px;border:0px;padding: 2px 15px 2px 15px;'>Voters List</button></span>";
	if(status == 1 || status == 2) {
	str += "					<span> | <button id='div_poll_single_publish_"+id+"' style='cursor:pointer;background:#3bc4c6;color:white;border-radius:23px;border:0px;padding: 2px 15px 2px 15px;'>"+(status==1?"Publish Poll":"Preview Poll")+"</button></span>";
	}
	if(status == 1) {
	str += "					<span> | <button id='div_poll_single_add_agenda_"+id+"' style='cursor:pointer;background:#3bc4c6;color:white;border-radius:23px;border:0px;padding: 2px 15px 2px 15px;'>Add Agenda</button></span>";
	}
	if(status == 2) {
	str += "					<span> | <button id='vote_link_copy_"+id+"' style='cursor:pointer;background:#3bc4c6;color:white;border-radius:23px;border:0px;padding: 2px 15px 2px 15px;'>Copy Voting Link</button></span>";
	}
	str += "				</p>";
	str += "			</div>";
	str += "		</div>";
	str += "	</div>";
	str += "</div>";

	$("#div_single_poll").html(str);
	pollSingleHtml();
	pollSingleRowEvents(id);
}

function pollSingleHtml(){
	$("#div_poll_single_serial_key_"+highlightrowid).html($("#div_poll_serial_key_"+highlightrowid).html());
}

function changePollStatusServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		var extraParam = response.extrajsonparam;
		if(extraParam.status == POLL_STATUS_RUNNING){
			window.opener.pollupdateleft = true;
			window.opener.highlightrowid = extraParam.id;
			window.opener.pollSingleFetch(false);
			window.close();
		} else {
			highlightrowid = extraParam.id;
			var status = extraParam.status;
			if(status == POLL_STATUS_RUNNING){
				pollShowconfirmmsg(pollmessage.success_pollpublished, confirm_Success, 5000, "", false, false);
			} else if(status == POLL_STATUS_PREVIEW){
				pollShowconfirmmsg(pollmessage.success_pollpreview, confirm_Success, 5000, "", false, false);
			} else if(status == POLL_STATUS_CLOSED){
				pollShowconfirmmsg(pollmessage.success_pollclosed, confirm_Success, 5000, "", false, false);
			}
			pollupdateleft = true;
			pollSingleFetch(false);
		}
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLPRESENT"){
			pollShowconfirmmsg(pollmessage.error_pollexists, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOAGENDAPRESENT"){
			pollShowconfirmmsg(pollmessage.error_pollagendanotpresent, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOVOTERPRESENT"){
			pollShowconfirmmsg(pollmessage.error_pollvotersnotpresent, confirm_Error, 5000, "", false, false);
		} else if(response.message == "ENDDATEGREATERTHANTODAY"){
			pollShowconfirmmsg(pollmessage.error_enddategreaterthantoday, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function changePollDatesServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		hideActionPopup("divpollchangedate");
		var extraParam = response.extrajsonparam;
		highlightrowid = extraParam.id;
		pollShowconfirmmsg(pollmessage.success_polldatechanged, confirm_Success, 5000, "", false, false);
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLCLOSED"){
			pollShowconfirmmsg(pollmessage.error_pollclosed, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function deletePollServiceAfter(response) {
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		highlightrowid = 0;
		pollShowconfirmmsg(pollmessage.success_polldeleted, confirm_Success, 5000, "", false, false);
		pollFetchList();
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLACTIVE"){
			pollShowconfirmmsg(pollmessage.error_pollactive, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollAllowVoteChangeServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		var extraParam = response.extrajsonparam;
		highlightrowid = extraParam.id;
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLCLOSED"){
			pollShowconfirmmsg(pollmessage.success_pollclosed, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollChangeVoterReceiptServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		var extraParam = response.extrajsonparam;
		highlightrowid = extraParam.id;
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLCLOSED"){
			pollShowconfirmmsg(pollmessage.success_pollclosed, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollChangeReceiptEmailNotificationServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		var extraParam = response.extrajsonparam;
		highlightrowid = extraParam.id;
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLCLOSED"){
			pollShowconfirmmsg(pollmessage.success_pollclosed, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollChangeWeighedVotesServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		var extraParam = response.extrajsonparam;
		highlightrowid = extraParam.id;
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollfetchVoterListAfter(response){
	ajaxindicatorstop();
	$("#tr_voter_select_delete").hide();
	$(".trpollvoter").remove();
	if(response.overwrite != 1){
		pollvoterlist = response;
	}
	$("#btn_voter_export_pdf").hide();
	$("#btn_voter_export_excel").hide();

	$('#divpages_drive').css("overflow", "auto");
	$(".pagecount_poll").css("color", "#9f9797");
	$(".pagecount_poll").css("font-size", "14px");
	$(".pagecount_poll").css("font-weight", "normal");
	$(".pagecount_poll").css("text-decoration", "none");

	$("#pagecount_poll_" + currentVoterPage).css("color", "#2abfc1");
	$("#pagecount_poll_" + currentVoterPage).css("font-size", "17px");
	$("#pagecount_poll_" + currentVoterPage).css("font-weight", "bold");
	$("#pagecount_poll_" + currentVoterPage).css("text-decoration", "underline");

	if(!response.error){
		if(response.object != null){
			var pollStatus = $("#div_poll_single_"+highlightrowid).attr("data-status");
			var enddate = new Date(Date.parse($("#div_poll_single_"+highlightrowid).attr("data-enddate")));
			var now = new Date().setHours(0, 0, 0, 0);
			enddate = enddate.setHours(0, 0, 0, 0);
			var daydiff = (enddate - now)/ (1000 * 3600 * 24);

			var notvoted = 0;
			for(var i=0;i<response.object.length;i++){
				var data = response.object[i];
				if(data.voted==0) notvoted++;
				var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);
				var mobileNumber = ((data.mobileNumber+"") == "null" || (data.mobileNumber+"") == "undefined" || (data.mobileNumber+"") == "" ? "N/A" : data.mobileNumber);
				var str = "";
				str += "<tr id='tr_voter_list_"+data.id+"' data-id="+data.id+" data-loginid="+data.loginId+" class='trpollvoter'>";
				str += "	<td scope='row'>";
				str += "		<div class='media forum-item'>";
				str += "			<div class='media-body'>";

				if(!pollVoterScreen && pollStatus != 3) {
				str += "				<p class='text-secondary' style='margin:0px;'>";
				str += "					<input type='checkbox' class='chk_poll_voter "+(data.voted==1?"clr_voted":"clr_notvoted")+"' id='chk_poll_voter_"+data.id+"'>&nbsp;&nbsp;&nbsp;"+data.loginId;
				str += "				</p>";
				} else {
				str += "				<p class='text-secondary' style='margin:0px;'>"+data.loginId+"</p>";
				}
				str += "				<p class='text-muted' style='margin-bottom:0px;'>";
				str += "					<span> Added On : "+createdDate+"</span>";
				str += "					<span> | Mobile Number : "+mobileNumber+"</span>";
				if($("#div_poll_"+highlightrowid).attr("data-weighedvotes")==1){
				str += "					<span> | Vote Percentage : "+data.voteWeightage+"%</span>";
				}
				str += "				</p>";
				str += "				<p class='text-muted' style='margin-bottom:0px;'>";
				if(!pollVoterScreen && pollStatus == 2) {
				str += "					<span>"+(data.voted==1?"Voted":"Not Voted")+"</span>";
				if(sendNotifEmail != 0){
				str += "					<span class='votersendreminder'> | <span id='div_poll_voter_send_reminder_"+data.id+"' style='color:#01c0c8;cursor:pointer;'>Send Reminder</span></span>";
				}
				}
				if(!pollVoterScreen && pollStatus == 1) {
				str += "					<span><a id='div_poll_voter_delete_"+data.id+"' href='javascript:void(0);' style='text-decoration:none;'>Delete</a></span>";
				}
				str += "				</p>";
				str += "			</div>";
				str += "		</div>";
				str += "	</td>";
				str += "</tr>";
				$("#table_voter_list").find('tbody').append(str);
				pollVoterRowEvents(data.id);
			}

			var hidetr = false;
			if(pollStatus==2) {
				$("#btn_poll_voter_delete_all").hide();
				if(daydiff>=0){
					if(sendNotifEmail != 0) $("#btn_poll_voter_resend_invite_all").show();
					if(notvoted > 0) $("#btn_poll_voter_resend_invite_not_voted").show();
				} else {
					hidetr = true;
					$("#tr_voter_select_delete").hide();
					$(".votersendreminder").hide();
				}
			}
			if(pollStatus != 3 && !pollVoterScreen && !hidetr) $("#tr_voter_select_delete").show();

			if(response.object.length > 0){
				$("#btn_voter_export_pdf").show();
				$("#btn_voter_export_excel").show();
			}
		}
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollAddVoterListServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		pollShowconfirmmsg(pollmessage.success_pollvoteradded, confirm_Success, 5000, "", false, false);
		pollupdateleft = true;
		pollSingleFetch(false);
		pollfetchTotalVoterCount(highlightrowid);
		hideActionPopup("div_poll_voter_add");
		showActionPopup("div_voter_list", false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLVOTERPERCENTAGEMORETHAN100"){
			pollShowconfirmmsg(pollmessage.error_pollpercentagemorethan100, confirm_Error, 5000, "", false, false);
		}else if(response.message == "VOTERSEXCEEDLIMIT"){
			pollShowconfirmmsg(pollmessage.error_voter_exceed_limit, confirm_Error, 5000, "", false, false);
		}else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollDeleteVoterServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		pollShowconfirmmsg(pollmessage.success_pollvoterdeleted, confirm_Success, 5000, "", false, false);
		pollfetchTotalVoterCount(highlightrowid);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollAddAgendaServiceAfter(response) {
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		pollShowconfirmmsg(pollmessage.success_pollagendaadded, confirm_Success, 5000, "", false, false);
		hideActionPopup("div_poll_agenda_add");
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "STRINGCOMMONERROR"){
			pollShowconfirmmsg(pollmessage.error_agendacommon, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		}else if(response.message == "AGENDAEXCEEDLIMIT"){
			pollShowconfirmmsg(pollmessage.error_agenda_exceed_limit, confirm_Error, 5000, "", false, false);
		}else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollFetchAgendaServiceAfter(response) {
	ajaxindicatorstop();
	if(!response.error){
		if(response.object != null){
			var extraParam = response.extrajsonparam;
			if(extraParam.isPreview){
				pollPreviewAgendaServiceAfter(response.object);
			} else {
				var pollStatus = $("#div_poll_single_"+highlightrowid).attr("data-status");

				for(var i=0;i<response.object.length;i++){
					var data = response.object[i];
					var id = data.id;
					var agenda = data.agenda;
					agenda = agenda.replace("<p>","<p style='word-break: break-all;'>");
					
					//var agendaShort = agenda.length>250?agenda.substring(0, 243)+"...<a href='javascript:void(0);' id='link_agenda_more_"+id+"'>more</a>":agenda;
					//agenda = agenda.length>250?(agenda+"...<a href='javascript:void(0);' id='link_agenda_less_"+id+"'>less</a>"):agenda;
					var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);
					agenda = agenda.replace(/(?:\r\n|\r|\n)/g, '\n');
					agenda = linkify(agenda);

					var noOfVotesAbstained = data.noOfVotesAbstained;
					var noOfVotesAgainst = data.noOfVotesAgainst;
					var noOfVotesFor = data.noOfVotesFor;
					var totalNoOfVotes = parseInt(noOfVotesAbstained)+parseInt(noOfVotesAgainst)+parseInt(noOfVotesFor);

					if($("#div_poll_"+highlightrowid).attr("data-weighedvotes")==1){
						noOfVotesAbstained = data.voteAbstainedPercentage+"% - " + data.noOfVotesAbstained;
						noOfVotesAgainst = data.voteAgainstPercentage+"% - " + data.noOfVotesAgainst;
						noOfVotesFor = data.voteForPercentage+"% - " + data.noOfVotesFor;
					}

					var str = "";
					str += "<div class='card mb-2'>";
					str += "<div class='card-body p-2 p-sm-3'>";
					str += "	<div class='media forum-item'>";
					str += "		<a href='javascript:void(0);' style='height:24px;margin-right:5px;font-weight:bold;'>";
					str += "			<span>"+(i+1)+".</span>";
					str += "		</a>";
					str += "		<div class='media-body'>";
					//str += "			<p class='text-secondary' id='p_agenda_short_"+id+"' style='margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;'>"+agendaShort+"</p>";
					str += "			<div class='text-secondary' id='p_agenda_"+id+"' style='margin-bottom: 0px; word-break: break-all;overflow-wrap:break-word;'>"+agenda+"</div>"; 
					str += "			<p class='text-muted' style='margin-bottom:10px;'><span> Created On : "+createdDate+"</span></p>";
					str += "			<p class='text-muted' style='margin-bottom:10px;'>";
					str += "				<span>Total No of Votes : "+totalNoOfVotes+"</span>";
					str += "				<span> | Votes For : "+noOfVotesFor+"</span>";
					str += "				<span> | Votes Against : "+noOfVotesAgainst+"</span>";
					str += "				<span> | Votes Abstained : "+noOfVotesAbstained+"</span>";
					if(pollStatus == 1){
					str += "				<span> | <a id='div_agenda_delete_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Delete</a></span>";
					}
					str += "			</p>";
					str += "		</div>";
					str += "	</div>";
					str += "</div>";
					str += "</div>";
					$("#div_poll_agenda_list").append(str);
					pollAgendaRowEvents(id);
				}
			}
		}
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollDeleteAgendaServiceAfter(response) {
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		pollShowconfirmmsg(pollmessage.success_pollagendadeleted, confirm_Success, 5000, "", false, false);
		pollupdateleft = true;
		pollSingleFetch(false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}


function pollPreviewSingleDataPrepare(data){
	ajaxindicatorstop();
	var id = data.id;
	var pollTitle = data.name;
	var startDate = getdatefromutcdata(handleNullValue(data.startDate), true);
	var endDate = getdatefromutcdata(handleNullValue(data.endDate), true);
	var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);
	var noOfVoters = data.noOfVoters;
	var noOfAgenda = data.noOfAgenda;
	var createdBy = data.createdByStr;
	pollAllowVoteChange = data.allowVoteChange;
	var allowVoteChange = (data.allowVoteChange == 1 ? "checked":"");
	var voterReceiptEmail = (data.voterReceiptEmail == 1 ? "checked":"");
	var weightageVotes = (data.weightageVotes == 1 ? "checked":"");
	var status = data.status;
	var serialKey = data.serialKey;
	var statusText = "";
	var statusColor = "";
	var voterReceiptEmailNotif = (data.sendCreateEmail == 1 ? "checked":"");
	voterPassProtect = (data.passLogin == 1 ? "checked":"");
	if(status == 1){
		statusText = "Preview";
		statusColor = "orange";
	} else if(status == 2){
		statusText = "Running";
		statusColor = "green";
	} else if(status == 3){
		statusText = "Closed";
		statusColor = "grey";
	}

	var str = "";
	str += "<div class='card mb-2' id='div_poll_single_"+id+"' style='cursor:pointer;' data-status='"+status+"' data-id="+id+" ";
	str += "data-startdate='"+data.startDate+"' data-enddate='"+data.endDate+"' data-weighedvotes="+data.weightageVotes+">";
	str += "	<div class='card-body p-2 p-sm-3'>";
	str += "		<div class='media forum-item'>";
	str += "			<div class='media-body'>";
	str += "				<h5>";
	str += "					<p class='text-secondary' id='div_poll_single_title_"+id+"' title='"+pollTitle+"' style='color:black !important;margin-top:2px;margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;'>Poll : "+pollTitle+"</p>";
	str += "				</h5>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>Poll Start Date : <span id='div_poll_single_startdate_"+id+"'>"+startDate+"</span></span>";
	str += "					<span> | Poll End Date : <span id='div_poll_single_enddate_"+id+"'>"+endDate+"</span></span>";
	str += "					<span> | <i class='fa fa-circle' style='color:"+statusColor+";'></i> "+statusText+"</span>";
	str += "				</p>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span>Created By <span>"+createdBy+" on "+createdDate+" </span></span>";
	str += "				</p>";
	str += "				<p class='text-muted' style='margin-bottom:10px;'>";
	str += "					<span class='cls_voter_poll_options'>Allow Vote Change";
	str += "						<span class='cls_voter_poll_switch'>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' disabled id='chk_poll_single_allow_vote_change_"+id+"' "+allowVoteChange+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span class='cls_voter_poll_options'> <span class='cls_voter_sidebar'>|</span> Voter Receipt Email";
	str += "						<span class='cls_voter_poll_switch'>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' disabled id='chk_poll_single_voter_receipt_email_"+id+"' "+voterReceiptEmail+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span class='cls_voter_poll_options'> <span class='cls_voter_sidebar'>|</span> Weighed Votes";
	str += "						<span class='cls_voter_poll_switch'>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' disabled id='chk_poll_single_weighed_votes_"+id+"' "+weightageVotes+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span class='cls_voter_poll_options'> <span class='cls_voter_sidebar'>|</span> Email Notification";
	str += "						<span class='cls_voter_poll_switch'>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' disabled "+voterReceiptEmailNotif+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "					<span class='cls_voter_poll_options'> <span class='cls_voter_sidebar'>|</span> Password Protect";
	str += "						<span class='cls_voter_poll_switch'>";
	str += "							<label style='margin-bottom:-6px;' class='switchpoll'>";
	str += "								<input type='checkbox' disabled "+voterPassProtect+" style='z-index:999999;'><span class='sliderpoll round'></span>";
	str += "							</label>";
	str += "						</span>";
	str += "					</span>";
	str += "				</p>";
	str += "			</div>";
	str += "		</div>";
	str += "	</div>";
	str += "</div>";

	$("#div_single_poll").html(str);
}

function pollPreviewAgendaServiceAfter(result) {
	ajaxindicatorstop();
	if (window.matchMedia('(max-width: 768px)').matches) {
		$("#div_poll_agenda_list").css("max-height", (window.outerHeight * .45) + "px");
	} else {
		$("#div_poll_agenda_list").css("max-height", (window.outerHeight * .60) + "px");
	}
	for(var i=0;i<result.length;i++){
		var data = result[i];
		var id = data.id;
		var agenda = data.agenda;
		agenda = agenda.replace("<p>","<p style='word-break: break-all;'>");
		//var agendaShort = agenda.length>250?agenda.substring(0, 243)+"...<a href='javascript:void(0);' id='link_agenda_more_"+id+"'>more</a>":agenda;
		//agenda = agenda.length>250?(agenda+"...<a href='javascript:void(0);' id='link_agenda_less_"+id+"'>less</a>"):agenda;
		var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);
		
		voteWeightage = data.voteWeightage;
		var vote = data.vote;

		agenda = agenda.replace(/(?:\r\n|\r|\n)/g, '\n');
		agenda = linkify(agenda);
		//agendaShort = agendaShort.replace(/(?:\r\n|\r|\n)/g, '<br>');
		//agendaShort = linkify(agendaShort);

		var str = "";
		str += "<div class='card mb-2' style='box-shadow:0px 26px 150px #eaeef3;'>";
		str += "<div class='card-body p-2 p-sm-3'>";
		str += "	<div class='media forum-item'>";
		str += "		<a href='javascript:void(0);' style='height:24px;margin-right:5px;font-weight:bold;'>";
		str += "			<span>"+(i+1)+".</span>";
		str += "		</a>";
		str += "		<div class='media-body'>";
		//str += "			<p class='text-secondary' id='p_agenda_short_"+id+"' style='margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;' title='"+data.agenda+"'>"+agendaShort+"</p>";
		str += "			<div class='text-secondary' id='p_agenda_"+id+"' style='margin-bottom:0px;word-break: break-all;overflow-wrap:break-word;'>"+agenda+"</div>";
		str += "			<p class='text-muted' style='margin-bottom:10px;font-weight:bold;'>";
		str += "				<label class='cls_voter_agenda_option'><input type='radio' name='radio_agenda_vote_"+id+"' disabled>&nbsp;Accept/Yes</label>";
		str += "				<label class='cls_voter_agenda_option'><input type='radio' name='radio_agenda_vote_"+id+"' disabled class='cls_voter_agenda_option_label'>&nbsp;Reject/No</label>";
		str += "				<label class='cls_voter_agenda_option'><input type='radio' name='radio_agenda_vote_"+id+"' disabled class='cls_voter_agenda_option_label'>&nbsp;Abstain/No View</label>";
		str += "			</p>";
		str += "		</div>";
		str += "	</div>";
		str += "</div>";
		str += "</div>";
		$("#div_poll_agenda_list").append(str);
		$(".radio_agenda_vote_"+id).val(vote);
		$("input[name=radio_agenda_vote_"+id+"][value=" + vote + "]").attr('checked', 'checked');
		pollAgendaRowEvents(id);

		if(vote != -1 && pollAllowVoteChange != 1) {
			$("#radio_agenda_vote_1_"+id).attr('disabled',true);
			$("#radio_agenda_vote_0_"+id).attr('disabled',true);
			$("#radio_agenda_vote_2_"+id).attr('disabled',true);
		}
	}
}

function pollExportServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object != null && response.object == true){
		pollShowconfirmmsg(pollmessage.export_poll_message, confirm_Success, 5000, "", false, false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollSingleUserProfileServiceAfter(response){
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		var firstname = data.contactDto.firstName;
		var lastname = replacenullval(data.contactDto.lastName)
		$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(firstname + " " + lastname))));
		$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(firstname + " " + lastname)));
		var imagePath = data.contactDto.picture;
		if(imagePath.indexOf("resources/images/") >= 0){
			imagePath = cloudApiUrlACMS + imagePath.replace("resources/images/","/resources/");
		}

		if(imagePath != null && (imagePath+"").length > 0){
			var d = new Date();
  			imagePath = imagePath + "?timestamp=" + d.getTime();
			$("#userimg").attr("src", imagePath);
		} else {
			$("#userimg").attr("src", "assets/img/user_image.png");
		}
		$("#profIm").show();
	}
	fetchLogoService();
}

function pollSingleUserProfileServiceNewAfter(response){
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
		$("#museremail").html(data.loginId);
		$("#muserType").val(data.type);

		if(data.syncType == "P"){
			if(localStorage._zs == "I"){
				$("#msynctype").val("Dataroom Sync");
			}else{
				$("#msynctype").val("Personal Folder Sync");
			}
		} else if(data.syncType == "S"){
			$("#msynctype").val("Shared Folder Sync");
		}

		$("#mfirstname").val(firstname);
		$("#mmiddlename").val(middlename);
		$("#mlastname").val(lastname);
		$("#musercorp").html(localStorage._zu);
		$("#mcompany").val(replacenullval(localStorage._zo));
		var imagePath = replacenullval(data.contactDto.picture);
		contact_id = data.contactDto.id;
		var mobileNumber = "";
		try {
			var arr = data.contactDto.contactPhoneList;
			if (arr != null && arr[0] != null && arr[0] != undefined) {
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
					}
				}
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
			$("#userimg").attr("src", imagePath + "?timestamp=" + new Date().getTime());
			prvuserimg = imagePath + "?timestamp=" + new Date().getTime();
		} else {
			$("#muserimg").attr("src", "assets/img/user_image.png");
			$("#userimg").attr("src", "assets/img/user_image.png");
			prvuserimg = "assets/img/user_image.png";
		}
		$("#profIm").show();
		if(localStorage._zs == "B") {
			$("#musercorp").show();
			$("#pcompany").show();
		} else if(localStorage._zs == "I") {
			$("#musercorp").hide();
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
					$("#div_otpcontaineradmin").html('<span style="color: rgb(13, 36, 110); width: 25%; margin-top: 5px; padding-left: 0px;" id="adm_user_security_name">   Mobile Phone : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width: 75%; color: black; font-size: 13px;  padding-left: 82px;" autocomplete="off">');
				}else if(data.userOTPDto.otpId == 2){
					$("#div_otpcontaineradmin").html('<span style="color: rgb(13, 36, 110); width: 25%; margin-top: 5px; padding-left: 0px;" id="adm_user_security_name">   WhatsApp : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width: 75%; color: black; font-size: 13px;  padding-left: 82px;" autocomplete="off">');
				}
				adminotpId = data.userOTPDto.otpId;
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
				$("#iti--allow-dropdown").remove();
				$("#div_otpcontaineradmin").html('<span style="color: rgb(13, 36, 110); width: 25%; margin-top: 6px; padding-left: 0px;" id="adm_user_security_name">   Email : </span> <input type="text" id="adm_user_security_carrier" class="inputClass inputuser disablepasteonly" readonly="" style="width: 75%;color: black;font-size: 13px;margin-left: -126px;padding-left: 82px;" autocomplete="off">');
				$("#adm_user_security_carrier").val(data.userOTPDto.carrieIdentifier);
				$("#adm_2_fact_enabled").prop("checked", true);
				$("#adm_user_security_name").css("padding-left", "0px");
				$("#adm_user_security_name").css("margin-top", "6px");
				adminotpId = 0;
			}else {
				adminotpId = 0;
			}
		} else {
			$("#pcompany").hide();
		}
	}
}

function pollFetchStorageLeftServiceAfter(response){
	ajaxindicatorstop();
	var extraParam = response.extrajsonparam;
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		//allocatedStorage = parseFloat(data.split("#")[0]);
		//var used = parseFloat(data.split("#")[1]);
		var attr1 = data.attribute1;
		var attr2 = data.attribute2;
		var used = 0;
		if(localStorage._zs == "B") {
			var personal = parseFloat(attr1.split("#")[1]);
			var dataroom = parseFloat(attr1.split("#")[2]);
			$("#mallocatedspacepersonal").html("User Personal Storage : " + formatBytesDecimal(personal));
			$("#mallocatedspacedataroom").html("User Dataroom Storage : " + formatBytesDecimal(dataroom));
			$("#mallocatedspacepersonal").show();
			$("#mallocatedspacedataroom").show();
			allocatedStorage = parseFloat(attr2.split("#")[0]);
			used = parseFloat(attr2.split("#")[1]);
		} else if(localStorage._zs == "I") {
			allocatedStorage = parseFloat(attr1.split("#")[0]);
			used = parseFloat(attr1.split("#")[1]);
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
		var v1 = formatBytesDecimal(used);
		var v2 = formatBytesDecimal(allocatedStorage);
		$("#mallocatedspace").html("Total Dataroom Storage : " + v1 + " / " + v2);
		if(v1 == v2){
			perntageused = "100";
		}
		$("#mallocatedspace").html("Total Dataroom Storage : " + formatBytesDecimal(used) + " / " + formatBytesDecimal(allocatedStorage));
		$(".counter").attr("data-cp-percentage", perntageused);
		progresscircledynamic();
	}
}

function pollResendVoterServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error){
		pollShowconfirmmsg(pollmessage.success_pollremindersent, confirm_Success, 5000, "", false, false);
		$(".chk_poll_voter").prop("checked", false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else if(response.message == "ENDDATEGREATERTHANTODAY"){
			pollShowconfirmmsg(pollmessage.error_enddategreaterthantoday, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollVoterExportServiceAfter(response) {
	ajaxindicatorstop();
	if(!response.error && response.object != null && response.object == true){
		pollShowconfirmmsg(pollmessage.export_voter_list_message, confirm_Success, 5000, "", false, false);
	} else {
		if(response.message == "NOPERMISSION"){
			pollShowconfirmmsg(pollmessage.error_noperm, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLNOTPREVIEW"){
			pollShowconfirmmsg(pollmessage.error_pollnotinpreview, confirm_Error, 5000, "", false, false);
		} else if(response.message == "POLLDELETED"){
			pollShowconfirmmsg(pollmessage.error_pollnotpresent, confirm_Error, 5000, "", false, false);
		} else {
			pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
		}
	}
}

function pollfetchTotalVoterCountAfter(response){
	$("#divpages_poll").empty();
	$("#tableHeadPages").hide();
	if(!response.error && response.object != null){
		$("#no_record_found").hide();
		totalNoOfPages = response.object;
		var loginId = response.extrajsonparam.loginId;
		if (totalNoOfPages > 0) {
			for(var i=1;i<=totalNoOfPages;i++) {
				$("#divpages_poll").append("<a href='javascript:void(0);' style='color:#9f9797;margin-right:10px;text-decoration:none;' class='pagecount_poll' id='pagecount_poll_"+i+"' data-pollId='"+highlightrowid+"' data-pageno='"+(i-1)+"' data-loginId='"+loginId+"'>"+i+"</a>");
				pollPageEvents(i);
			}
			$("#pagecount_poll_1").click();
			if (totalNoOfPages > 1) {
				$("#tableHeadPages").show();
			}
		}else{
			$("#tableHeadPages").hide();
			$(".trpollvoter").remove();
			$("#no_record_found").show();
		}
	} 
}















