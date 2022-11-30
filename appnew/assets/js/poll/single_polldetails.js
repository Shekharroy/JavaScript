var timer;
function pollSingleFetchAfter(response){
	clearInterval(timer);
	ajaxindicatorstop();
	if(response != null && !response.error && response.object != null){
		pollSingleDataPrepare(response.object);
	} else {
		pollShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
	}
}

function pollSingleDataPrepare(data){
	ajaxindicatorstop();
	$("#divpollheader").html("E-Voting for " + data.companyName);
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
	voterReceiptEmail = (data.voterReceiptEmail == 1 ? "checked":"");
	var weightageVotes = (data.weightageVotes == 1 ? "checked":"");
	var status = data.status;
	var serialKey = data.serialKey;
	var statusText = "";
	var statusColor = "";
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

	pollTitle = linkify(pollTitle);
	pollTitle = pollTitle.replace(/(?:\r\n|\r|\n)/g, '<br>');

	var str = "";
	str += "<div class='card mb-2 mt-2' id='div_poll_single_"+id+"' style='cursor:pointer;' data-status='"+status+"' data-id="+id+" ";
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
	str += "				</p>";
	str += "			</div>";
	str += "		</div>";
	str += "	</div>";
	str += "</div>";

	$("#div_single_poll").html(str);
	pollFetchAgendaServiceAfter(data.pollAgendaList);
}

function pollFetchAgendaServiceAfter(result) {
	ajaxindicatorstop();
	$("#div_poll_agenda_list").empty();
	var j = 0;
	for(var i=0;i<result.length;i++){
		var data = result[i];
		var id = data.id;
		var agenda = data.agenda;
		//var agendaShort = agenda.length>250?agenda.substring(0, 243)+"...<a href='javascript:void(0);' id='link_agenda_more_"+id+"'>more</a>":agenda;
		//agenda = agenda.length>250?(agenda+"...<a href='javascript:void(0);' id='link_agenda_less_"+id+"'>less</a>"):agenda;
		var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);
		voteWeightage = data.voteWeightage;
		var vote = data.vote;

		agenda = agenda.replace(/(?:\r\n|\r|\n)/g, '<br>');
		agenda = linkify(agenda);
		//agendaShort = agendaShort.replace(/(?:\r\n|\r|\n)/g, '<br>');
		//agendaShort = linkify(agendaShort);

		var str = "";
		str += "<div class='card mb-2' style='box-shadow:0px 26px 150px #eaeef3;'>";
		str += "<div class='card-body p-2 p-sm-3'>";
		str += "	<div class='media forum-item'>";
		str += "		<a href='javascript:void(0);' style='height:24px;margin-right:5px;font-weight:bold;'>";
		str += "			<span id='span_agenda_serial_no_"+id+"'>"+(i+1)+".</span>";
		str += "		</a>";
		str += "		<div class='media-body'>";
		//str += "			<p class='text-secondary' id='p_agenda_short_"+id+"' style='margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;' title='"+data.agenda+"'>"+agendaShort+"</p>";
		str += "			<p class='text-secondary' id='p_agenda_"+id+"' style='margin-bottom:10px;word-break: break-all;overflow-wrap:break-word;'>"+agenda+"</p>";
		str += "			<p class='text-muted' style='margin-bottom:10px;font-weight:bold;' id='p_agenda_radio_"+id+"'>";
		str += "				<label class='cls_voter_agenda_option'><input type='radio' name='radio_agenda_vote_"+id+"' value='1' id='radio_agenda_vote_1_"+id+"' class='radio_agenda_vote'>&nbsp;Accept/Yes</label>";
		str += "				<label class='cls_voter_agenda_option'><input type='radio' name='radio_agenda_vote_"+id+"' value='0' id='radio_agenda_vote_0_"+id+"' class='radio_agenda_vote cls_voter_agenda_option_label'>&nbsp;Reject/No</label>";
		str += "				<label class='cls_voter_agenda_option'><input type='radio' name='radio_agenda_vote_"+id+"' value='2' id='radio_agenda_vote_2_"+id+"' class='radio_agenda_vote cls_voter_agenda_option_label'>&nbsp;Abstain/No View</label>";
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
			j++;
			$("#radio_agenda_vote_1_"+id).attr('disabled',true);
			$("#radio_agenda_vote_0_"+id).attr('disabled',true);
			$("#radio_agenda_vote_2_"+id).attr('disabled',true);
		}
	}

	$("#btn_poll_cast_vote").show();
	$("#btn_poll_cast_vote_reset").show();
	if(j >= result.length){
		$("#btn_poll_cast_vote").hide();
		$("#btn_poll_cast_vote_reset").hide();
	}
}

function generateOTPServiceAfter(response) {
	ajaxindicatorstop();
	if(!response.error || response.message == "OTPSENTALREADY"){
		$("#imgcaptcha").attr("src", response.object);
		$("#lblcaptcha").html("A verification code is sent to " + $("#loginid").val().trim()+". Verification code is valid for 3 minutes.");
		$("#btngencaptcha").hide();
		$("#divotp").show();
		$("#divcaptcha").show();
		$("#divcaptchaimg").show();
		$("#divloginerrorlabel").show();
		$("#btnlogin").show();

		// The data/time we want to countdown to
		//var countDownDate = new Date(new Date().getTime() - 1000).getTime();
		var countDownDate = new Date(new Date().getTime() + 180000);
		if(response.message == "OTPSENTALREADY") {
			countDownDate = new Date(Date.parse(response.object.otpdateTime) + 180000);
			console.log(" :: now : " + new Date() + " :: response.object.otpdateTime  : " + new Date(Date.parse(response.object.otpdateTime)));
			$("#imgcaptcha").attr("src", response.object.captchaStr);
			$("#lblcaptcha").html("A verification code was already sent to " + $("#loginid").val().trim()+". In case you attempted 3 times wrong OTP or captcha then please wait for 3 minutes to refresh and retry login.");
			$("#divloginerrorlabel").show();
		}

   	 	// Set the date we're counting down to
		// Update the count down every 1 second
		var timer = setInterval(function() {
			// Get today's date and time
			var now = new Date().getTime();

			// Find the distance between now and the count down date
			var distance = countDownDate.getTime() - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Display the result in the element with id="demo"
			$("#lbltimer").html(minutes + ":" + seconds);

			// If the count down is finished, write some text
			if (minutes == 0 && seconds == 0) {
				clearInterval(timer);
				window.location.reload();
			}
		}, 1000);


	} else if(response.message == "POLLNOTSTARTED"){
		pollShowconfirmmsg("Poll has not started yet. Please check your email to check the poll start date and time.", confirm_Error, 5000, "", false, false);
	} else {
		pollShowconfirmmsg("The poll you were attempting to access has either ended or your login information is invalid.", confirm_Error, 5000, "", false, false);
	}
}

function loginServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error){
		if(response.message == "NEWOTP"){
			$("#imgcaptcha").attr("src", response.object);
			$("#lblcaptcha").html("A new verification code is sent to " + $("#loginid").val().trim());
			pollShowconfirmmsg("You have exceeded maximum no of attempts.", confirm_Error, 5000, "", false, false);
		} else {
			hideActionPopup("loginmodal1");
			hideActionPopup("loginmodal2");
			$("#divmain").show();
			pollSingleFetchAfter(response);
		}
	} else if(response.message == "WRONGOTP"){
		if(voterProtectionType == 1){
			pollShowconfirmmsg("Identification Number and captcha mismatch.", confirm_Error, 5000, "", false, false);
		}else{
			pollShowconfirmmsg("OTP and captcha mismatch.", confirm_Error, 5000, "", false, false);
		}
	} else if(response.message == "NEWOTP"){
		generateOTPServiceAfter();
		pollShowconfirmmsg("You have exceeded maximum no of attempts.A new verification code is sent to " + $("#loginid").val().trim(), confirm_Error, 5000, "", false, false);
	} else if(response.message == "POLLNOTSTARTED"){
		pollShowconfirmmsg("Poll has not started yet. Please check your email to check the poll start date and time.", confirm_Error, 5000, "", false, false);
	} else{
		pollShowconfirmmsg("The poll you were attempting to access has either ended or your login information is invalid.", confirm_Error, 5000, "", false, false);
	}
}

function pollCastVoteServiceAfter(response){
	ajaxindicatorstop();
	if(!response.error && response.object == true){
		if (voterReceiptEmail == "") {
			$("#lblopinion").html("Thanks you for participating in the poll.");
		} else {
			$("#lblopinion").html("Thanks you for participating in the poll. A confirmation mail has been sent to your email id " + $("#loginid").val().trim());
		}
		$("#divmain").hide();
		showActionPopup("divresultmodal", false);
	} else if(response.message == "POLLNOTVOTER"){
		pollShowconfirmmsg("Sorry, You no longer part of the poll.", confirm_Error, 5000, "", false, false);
	} else if(response.message == "POLLNOTACTIVE"){
		pollShowconfirmmsg("Poll is not active", confirm_Error, 5000, "", false, false);
	} else if(response.message == "POLLDELETED"){
		pollShowconfirmmsg("Poll does not exist.", confirm_Error, 5000, "", false, false);
	} else if(response.message == "INVALIDAUTH"){
		pollCommon();
		pollShowconfirmmsg("Authorization failed. Please login again.", confirm_Error, 5000, "", false, false);
	} else {
		pollShowconfirmmsg("Request could not be processed. Please try again.", confirm_Error, 5000, "", false, false);
	}
}

function fetchVoterProtectionTypeAfter(response){
	if(response != null && !response.error && response.object != null){
		voterProtectionType = response.object.passLogin;
		$("#divmain").hide();
		if(voterProtectionType == 1){
			showActionPopup("loginmodal2", false);
			$("#passimgcaptcha").attr("src", response.tempObject2);
			$("#divpasscaptchaimg").show();
			$("#pass_login_label").html(response.object.passLoginLabel);
			$('#pass_login_label').prop('title', response.object.passLoginLabel);
			$("#pass_login_id_label").html(response.object.passLoginIdLabel);
			$('#pass_login_id_label').prop('title', response.object.passLoginIdLabel);
			$('#emailId').focus();
			if(response.object.passLoginNote.length > 0){
				$("#poll_note1").append(response.object.passLoginNote);
				$("#note1").show();
			}else{
				$("#note1").hide();
			}
		}else{
			showActionPopup("loginmodal1", false);
			$('#loginid').focus();
			if(response.object.passLoginNote.length > 0){
				$("#poll_note2").append(response.object.passLoginNote);
				$("#note2").show();
			}else{
				$("#note2").hide();
			}
		}
		
		
		pollClearPostFields();
		pollPageSize();	
	}else{
		pollShowconfirmmsg("The poll you were attempting to access has either ended or your login information is invalid.", confirm_Error, 5000, "", false, false);
	}
}












