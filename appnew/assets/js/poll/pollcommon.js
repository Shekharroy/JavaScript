/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromPoll(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	if(admbaseauth != ""){
		invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
	} else {
		window.location.href = "error.html";
	}
}

function pollShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm){
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

var substringMatcher = function(strs) {
	return function findMatches(q, cb) {
		var matches, substringRegex;

		// an array that will be populated with substring matches
		matches = [];
		strs = alluserarr;

		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');

		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(strs, function(i, str) {
			if (substrRegex.test(str)) {
				matches.push(str);
			}
		});

		cb(matches);
	};
};

function pollPageSize(){
	var msgHeight = $(window).height() - 60;
	$('#divforumleft').css("height", msgHeight+"px");
	$('#divforumright').css("height", msgHeight+"px");
	$(".page-wrapper").css("height", msgHeight+"px");
	$("#card-mb-2").css("height", (msgHeight-95)+"px");
	$(window).resize(function() {
		$('#divforumleft').css("height", msgHeight+"px");
		$('#divforumright').css("height", msgHeight+"px");
		$(".page-wrapper").css("height", msgHeight+"px");
		$("#card-mb-2").css("height", (msgHeight-95)+"px");
	});
}

function pollCommon(){
	$("#divpagetitle").html("E-Voting for " + localStorage._zo);
	admbaseauth = getauthtokenfromlocal();
	fetchLogo();
	pollPageSize();
	pollCommonLoad();
	pollCommonEvents();
	pollSingleUserProfileService();
	pollViewPasswordEvent();

	$('#startdaterange').daterangepicker({
		autoUpdateInput: false,
		locale: {
			cancelLabel: 'Clear'
		}
	});
	$('#enddaterange').daterangepicker({
		autoUpdateInput: false,
		locale: {
			cancelLabel: 'Clear'
		}
	});

	var today = new Date().toISOString();
	document.getElementById("txtstartdate").min = today;
	document.getElementById("txtenddate").min = today;
}

function pollCommonLoad(){
	checkPageCorpLogoChange();
	pollFetchList();
}

function pollClearPostFields(){
	$("#divNewPoll").removeAttr("data-id");
	$("#txtPollTitle").val("");
	$("#txtstartdate").val("");
	$('#txtenddate').val('');
	$("#txtPollPassLabel").val("");
	$("#txtPollPassLabelId").val("");
	$("#txtPollNote").val("");
	$("#chkallowvotechange").prop("checked", false);
	$("#chkvoterreceipt").prop("checked", true);
	$("#chkweighedvotes").prop("checked", true);
	$("#emailNotif").prop("checked", true);
	$("#chkpassprotect").prop("checked", false);
	$("#pass_label_div").hide();
	$("#chk_poll_clone_voters").prop("checked", false);
	$("#poll_clone_view_voter_span").hide();
}

function pollOpenModal(id){
	pollClearPostFields();
	$("#div_poll_clone_new").hide();
	showActionPopup("divNewPoll", false);
	$('#txtPollTitle').focus();

}

function pollValidateAddService() {
	var dtnow = new Date();
	var polltitle = $("#txtPollTitle").val().trim();
	var startDate = $("#txtstartdate").val().trim();
	var endDate = $("#txtenddate").val().trim();
	var allowVoteChange = ($("#chkallowvotechange").is(":checked") ? 1 : 2)+"";
	var voterReceiptEmail = ($("#chkvoterreceipt").is(":checked") ? 1 : 2)+"";
	var weightageVotes = ($("#chkweighedvotes").is(":checked") ? 1 : 2)+"";
	var passProtect = ($("#chkpassprotect").is(":checked") ? 1 : 0)+"";
	var emailNotif = ($("#emailNotif").is(":checked") ? 1 : 0)+"";
	var pollPassLabel = "";
	var passLoginIdLabel = "";
	var passLoginNote = "";
	if(passProtect == 1 && $("#txtPollPassLabel").val().trim().length > 0){
		pollPassLabel = $("#txtPollPassLabel").val().trim();
	}else{
		pollPassLabel = "Password";
	}
	if(passProtect == 1 && $("#txtPollPassLabelId").val().trim().length > 0){
		passLoginIdLabel = $("#txtPollPassLabelId").val().trim();
	}else{
		passLoginIdLabel = "Email Id";
	}
	if($("#txtPollNote").val().trim().length > 0){
		passLoginNote = $("#txtPollNote").val().trim();
	}

	if(polltitle.length == 0){
		pollShowconfirmmsg(pollmessage.entertitle, confirm_Error, 5000, "", false, false);
	} else if(!stringcheckifnonascii(polltitle)){
		pollShowconfirmmsg(pollmessage.error_poll_title_nonasciifound, confirm_Error, 5000, "", false, false);
	} else if (new Date(startDate) < dtnow) {
		pollShowconfirmmsg(pollmessage.startdate, confirm_Error, 5000, "", false, false);
	} else if(new Date(startDate) > new Date(endDate)){
		pollShowconfirmmsg(pollmessage.endtdate, confirm_Error, 5000, "", false, false);
	} else if (startDate.length == 0 || endDate.length == 0) {
		pollShowconfirmmsg(pollmessage.enterstartdate, confirm_Error, 5000, "", false, false);
	} else {
		var date = new Date();
		var jsonInput = {"name":polltitle, "startDate":formatAddTZDate(startDate.replace("T"," "),true),
			"endDate":formatAddTZDate(endDate.replace("T"," "),true), "allowVoteChange":allowVoteChange, "voterReceiptEmail":voterReceiptEmail, "weightageVotes":weightageVotes,
			"sendCreateEmail":emailNotif,"passLogin":passProtect,"passLoginLabel":pollPassLabel, "timeZoneOffsetMinutes":date.getTimezoneOffset(),
			"passLoginIdLabel":passLoginIdLabel,"passLoginNote":passLoginNote
		};
		if(!$("#div_poll_clone_new").is(":visible")){
			jsonInput.action = "pollAddServiceAfter";
			pollAddService(jsonInput);
		} else {
			jsonInput.addVotersFromClone = $("#chk_poll_clone_voters").is(":checked")?1:0;
			jsonInput.addAgendasFromClone = $("#chk_poll_clone_agenda").is(":checked")?1:0;
			jsonInput.id = highlightrowid;
			jsonInput.action = "pollAddServiceAfter";
			pollCloneService(jsonInput);
		}
	}
}

function pollHighlightRow(){
	$(".divboxshadow").removeClass("divboxshadow");
	$("#div_poll_"+highlightrowid).addClass("divboxshadow");
	$("#div_poll_single_"+highlightrowid).addClass("divboxshadow");
	$("#card-mb-2").scrollTo("#div_poll_"+highlightrowid);
}

function pollDeleteVotersJSON(){
	var loginIds = "";
	var voterIds = "";
	$('.chk_poll_voter:checkbox:checked').each(function () {
		var idm = (this.id).replace("chk_poll_voter_", "");
		if(loginIds.length > 0) {
			loginIds += ",";
			voterIds += ",";
		}
		loginIds += $("#tr_voter_list_"+idm).attr("data-loginid");
		voterIds += $("#tr_voter_list_"+idm).attr("data-id");
	});
	if(voterIds.length > 0){
		var jsonInput = {"attribute1":"pollDeleteVoterServiceAfter","attribute2":highlightrowid,"attribute3":voterIds,"attribute4":loginIds};
		return jsonInput;
	} else {
		pollShowconfirmmsg(pollmessage.error_voterloginidselect, confirm_Error, 5000, "", false, false);
		return "";
	}
}

function pollPublishAction(idm){
	var width = window.outerWidth*0.9;
	var height = window.outerHeight*0.9;
	highlightrowid = idm;
	pollSingleFetch(false);
	//window.open("pollpreview.html?p="+idm);
	var popUpObj = window.open("pollpreview.html?p="+idm,
		"ModalPopUp",
		"toolbar=no," +
		"scrollbars=no," +
		"location=no," +
		"statusbar=no," +
		"menubar=no," +
		"resizable=0," +
		"width="+width+"," +
		"height="+height+"," +
		"left=30," +
		"top=30"
	);
	popUpObj.focus();
}

function pollVoterSearch(){
	var voteremailid = $("#txt_voter_search").val();
	if(voteremailid.trim().length > 0){
		pollfetchTotalVoterCount(highlightrowid,voteremailid);
	}else{
		pollShowconfirmmsg(pollmessage.enter_emailid, confirm_Error, 5000, "", false, false);
	}
}

function pollPreviewCommon(){
	$("#divpagetitle").html("E-Voting for " + localStorage._zo);
	var val = window.location.href;
	val = val.substring(val.indexOf("?")+1);
	highlightrowid = val.replace("p=", "");
	pollPrevewCommonEvents();
	$("#btn_poll_publish").hide();
	if(window.opener.$("#div_poll_single_"+highlightrowid).attr("data-status")==1){
		$("#btn_poll_publish").show();
	}
	pollSingleFetch(true);
}

function  pollCloneVoterListOpen() {
	pollVoterScreen = true;
	$("#btn_voter_list_add").hide();
	$("#btn_voter_download_template").hide();
	$("#btn_voter_import").hide();
	$("#tr_voter_select_delete").hide();
	$("#tr_voter_select_delete").css("display", "none");
	pollfetchTotalVoterCount(highlightrowid,"");
	pollfetchVoterList(highlightrowid, false);
	hideActionPopup("divNewPoll");
	showActionPopup("div_voter_list", false);
}

function pollPrepareResendInviteJSON(sendnotvoted){
	var jsonInput = {"action":"pollResendVoterServiceAfter", "pollVoterList":[]};
	$('.chk_poll_voter:checkbox:checked').each(function () {
		var idm = (this.id).replace("chk_poll_voter_", "");
		jsonInput.pollVoterList.push({"pollId":highlightrowid, "loginId":$("#tr_voter_list_"+idm).attr("data-loginid")});

	});
	if(jsonInput.pollVoterList.length > 0){
		pollResendVoterService(jsonInput);
	} else {
		pollShowconfirmmsg(pollmessage.error_voterloginidselect, confirm_Error, 5000, "", false, false);
	}
}






































