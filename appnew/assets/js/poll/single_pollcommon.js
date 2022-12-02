/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromPoll(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
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
	var location = window.location.href;
	cloudprotocol = (location.indexOf("https://") == 0 ? "https://":"http://");
	location = location.replace(cloudprotocol, "");
	location = location.replace(cloudprotocol, "");
	serveraddr = cloudprotocol + location.substring(0,location.indexOf("/")) + pollbaseurl;

	var val = window.location.href;
	val = val.substring(val.indexOf("?")+1);
	var arr = val.split("&");
	highlightrowid = arr[0].replace("p=", "");
	lawFirmId = arr[1].replace("c=", "");

	var json = {"action":"fetchVoterProtectionTypeAfter","lawFirmId":lawFirmId,"pollId":highlightrowid};
	fetchVoterProtectionType(json);
}

function pollClearPostFields(){
	$("#loginid").val("");
	$("#otp").val("");
	$("#captcha").val("");
	$("#lblcaptcha").html("");
}

function pollOpenModal(id){
	pollClearPostFields();
	showActionPopup("divNewPoll", false);
}

function pollValidateGenrateOTP() {
	var loginId = $("#loginid").val().trim();
	if(loginId.length == 0 || !validateEmail(loginId)){
		pollShowconfirmmsg("Please enter valid login id", confirm_Error, 5000, "", false, false);
	} else {
		var jsonInput = {"lawFirmId":lawFirmId, "pollId":highlightrowid, "loginId":loginId};
		generateOTPService(jsonInput);
	}
}

function loginToCastVoteRefresh() {
	var loginId = $("#loginid").val().trim();
	var jsonInput = { "lawFirmId": lawFirmId, "pollId": highlightrowid, "loginId": loginId };
	if(voterProtectionType == 1){
		pollCommon();
	}else{
		generateOTPService(jsonInput);
	}
	
}

function loginToCastVote(){
	var loginId = $("#loginid").val().trim();
	verificationKey = $("#otp").val().trim();
	captcha = $("#captcha").val().trim();
	if(loginId.length == 0 || !validateEmail(loginId)){
		pollShowconfirmmsg("Please enter valid login id", confirm_Error, 5000, "", false, false);
	} else if(verificationKey.length == 0){
		pollShowconfirmmsg("Please enter otp", confirm_Error, 5000, "", false, false);
	} else if(captcha.length == 0){
		pollShowconfirmmsg("Please enter captcha", confirm_Error, 5000, "", false, false);
	} else {
		loginId = loginId.replace(/ /g, "");
		verificationKey = verificationKey.replace(/ /g, "");
		captcha = captcha.replace(/ /g, "");
		pollLoginId = loginId;
		var jsonInput = {"lawFirmId":lawFirmId, "pollId":highlightrowid, "loginId":loginId, "verificationKey":verificationKey, "captcha":captcha};
		loginService(jsonInput);
	}
}

function passLoginToCastVote(){
	var loginId = $("#emailId").val().trim();
	verificationKey = $("#password").val().trim();
	captcha = $("#paswcaptcha").val().trim();
	if(loginId.length == 0 || !validateEmail(loginId)){
		pollShowconfirmmsg("Please enter valid email id", confirm_Error, 5000, "", false, false);
	} else if(verificationKey.length == 0){
		pollShowconfirmmsg("Please enter password", confirm_Error, 5000, "", false, false);
	} else if(captcha.length == 0){
		pollShowconfirmmsg("Please enter captcha", confirm_Error, 5000, "", false, false);
	} else {
		loginId = loginId.replace(/ /g, "");
		verificationKey = verificationKey.replace(/ /g, "");
		captcha = captcha.replace(/ /g, "");
		pollLoginId = loginId;
		var jsonInput = {"lawFirmId":lawFirmId, "pollId":highlightrowid, "loginId":loginId, "verificationKey":verificationKey, "captcha":captcha};
		loginService(jsonInput);
	}
}

function viewPoll(){
	hideActionPopup("divresultmodal");
	var jsonInput = {"lawFirmId":lawFirmId, "pollId":highlightrowid, "loginId":pollLoginId, "verificationKey":verificationKey, "captcha":captcha};
	loginService(jsonInput);
}

function pollCastVotePrepareJSON(){
	pollvoteclicked = 0;
	var loginId = $("#loginid").val().trim();
	var jsonInput = {"lawFirmId":lawFirmId,"pollId":highlightrowid,"loginId":pollLoginId,"pollAgendaVotesList":[]};
	var v= $('input[type=radio].radio_agenda_vote:checked');
	$(v).each(function(i){
		var replaceid = "radio_agenda_vote_"+$(this).val()+"_";
		var agendaId = (this.id).replace(replaceid, "");
		var serialKey = ($("#span_agenda_serial_no_"+agendaId).html()).replace(".", "");
		jsonInput.pollAgendaVotesList.push({"agenda":$("#p_agenda_short_"+agendaId).attr("title"),"pollId":highlightrowid,"agendaId":agendaId,
			"loginId":pollLoginId,"voteFor":$(this).val(),"voteWeightage":voteWeightage,"serialKey":serialKey});
		pollvoteclicked = 1;
	});
	if(pollvoteclicked == 1){
		pollCastVoteService(jsonInput);
	} else {
		pollShowconfirmmsg("Please select voting on atleast one agenda", confirm_Error, 5000, "", false, false);
	}
	pollvoteclicked = 0;
}

function pollCastVoteReset(){
	var v= $('input[type=radio].radio_agenda_vote:checked');
	$(v).each(function(i){
		if(!this.disabled){
			var id = (this.id).substring((this.id).lastIndexOf("_")+1);
			var str = "<label><input type='radio' name='radio_agenda_vote_"+id+"' value='1' id='radio_agenda_vote_1_"+id+"' class='radio_agenda_vote'>&nbsp;Accept/Yes</label>";
			str += "<label><input type='radio' name='radio_agenda_vote_"+id+"' value='0' id='radio_agenda_vote_0_"+id+"' class='radio_agenda_vote' style='margin-left:20px;'>&nbsp;Reject/No</label>";
			str += "<label><input type='radio' name='radio_agenda_vote_"+id+"' value='2' id='radio_agenda_vote_2_"+id+"' class='radio_agenda_vote' style='margin-left:20px;'>&nbsp;Abstain/No View</label>";
			$("#p_agenda_radio_"+id).html(str);
		}
	});
	pollvoteclicked = 0;
}




























































function todolistRefreshSingleRow(id){
	$(".divboxshadow").removeClass("divboxshadow");
	highlightrowid = id;
	$("#div_todolist_"+highlightrowid).addClass("divboxshadow");
	todolistrefreshleftsinglerow = true;
	todolistserialkey = $("#div_todolist_serial_key_"+id).html();
	todolistFetchService(id);
}

function todolistResetFetch(){
	highlightrowid = 0;
	todolistlastRow = 0;
	todolisttotalcount = 0;
	todolistdata = null;
	todolistrefreshleftsinglerow = false;
	todolistserialkey = 1;
	$("#card-mb-2").scrollTop(0);
}

//drive code starts
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

function admSetCopyFolderHeaderCaption(folderpath){
	$("#admcopyfolderheader").html("");
	var mpath = "";
	if(folderpath == "Root") {
		path = "Root";
	} else if(folderpath.indexOf("Root/") < 0) {
		path = "Root/"+folderpath;
	} else {
		path = folderpath;
	}
	var arr = [];
	var len = 0;
	if(path.indexOf("/") > 0){
		try{
			while(path.length > 0){
				var xs = 0;
				if(path.indexOf("Root/") == 0) {
					xs = adm_copy_parentfolderpath[path.substring(path.indexOf("/")+1)];
				}
				if(path=="Root") xs = 0;
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
	//$("#admcopyfolderheader").prepend("Folder Selected : ");
}

function todolistaddselectedfiles(fileId, fileName, filetype){
	if(admcopyfileid[fileId] == null || admcopyfileid[fileId] == undefined) {
		admcopyfileid[fileId] = fileName;
		var actfilename = fileName;
		if(fileName.length > 30){
			fileName = fileName.substring(0, 27)+"...";
		}
		var str = "";
		str = "<div class='card mb-2 div_filerow_selected' style='border:0px;border-radius:0px;' id='div_filerow_"+fileId+"' title='"+actfilename+"'>";
		str += "	<div class='card-body p-2 p-sm-3'>";
		str += "		<div class='media forum-item'>";
		str += "			<div class='media-body'>";
		str += "				<p class='text-secondary'>"+fileId+" | "+fileName+" <span style='float:right;cursor:pointer;' id='span_filerow_del_"+fileId+"'><i class='fa fa-trash'></i></span></p>";
		str += "			</div>";
		str += "		</div>";
		str += "	</div>";
		str += "</div>";

		$("#tblselectedrows").append(str);
		admSelectedFileDeleteEvent(fileId);
	}
}
//drive code ends

function todolistaddprocessrow(divname){
	var index = parseFloat($("#"+divname).attr("data-row"));
	var extraid = "";
	var extraclass = "";
	if(divname == "tblprocesseditnew"){
		extraid = "new_";
		extraclass = "_new";
		index = parseFloat($("#tblprocesseditnew").attr("data-row"));
	}
	var addnewclass = "";
	if(divname == "tblprocessedit"){
		addnewclass = "add_process_new";
	}
	if(index == 0){
		$("#"+divname).html("");
		if(divname == "tblprocesseditnew"){
			$("#div_processtaskaddlist").show();
			var datahtml = "";
			datahtml += "<div style='display:flex;width:100%;margin-top:5px;'>";
			datahtml += "	<div style='width:30%;float:left;font-weight:bold;'>";
			datahtml += "		<span><span style='color:red;'>*</span> Stage Name</span>";
			datahtml += "	</div>";
			datahtml += "	<div style='width:30%;float:left;font-weight:bold;'>";
			datahtml += "		<span><span style='color:red;'>*</span> Group Name</span>";
			datahtml += "	</div>"
			datahtml += "	<div style='width:15%;float:left;font-weight:bold;'>";
			datahtml += "		<span><span style='color:red;'>*</span> Due Date</span>";
			datahtml += "	</div>";
			datahtml += "	<div style='width:15%;float:left;font-weight:bold;'>";
			datahtml += "		<span>Remind On</span>";
			datahtml += "	</div>";
			datahtml += "	<div style='width:10%;float:left;'>&nbsp;</div>"
			datahtml += "</div>";
			$("#"+divname).append(datahtml);
		}
	}
	var w1 = (divname == "tblprocesseditnew" ? "30%":"45%");
	var w2 = (divname == "tblprocesseditnew" ? "30%":"45%");
	var datahtml = "";
	datahtml += "<div style='display:flex;width:100%;margin-top:5px;' id='div_process_edit_"+extraid+index+"' class='add_process "+addnewclass+"' data-id='0' data-flow-id='0'>";
	datahtml += "	<div style='width:"+w1+";float:left;'>";
	datahtml += "		<input type='text' class='form-control inputClass inputuser txt_adduser_loginid"+extraclass+"' id='txt_adduser_loginid_"+extraid+index+"' placeholder='Stage Name' maxlength='50' style='border:1px solid #ccc; border-radius:0.25rem; padding:5px; width:95%;'>";
	datahtml += "	</div>";
	datahtml += "	<div style='width:"+w2+";float:left;'>";
	datahtml += "		<select class='custom-select w-auto mr-1 sel_group"+extraclass+"' id='sel_group_"+extraid+index+"' style='font-size:14px;color:#6c757d !important;width:95% !important;'>";
	datahtml += "			<option selected value='0'>Select Group</option>";
	if(groupsdetails != null && groupsdetails.length > 0){
		for(var i=0;i<groupsdetails.length;i++){
			datahtml += "	<option value='"+groupsdetails[i].id+"'>"+groupsdetails[i].groupName+"</option>";
		}
	}
	datahtml += "		</select>";
	datahtml += "	</div>"
	if(divname == "tblprocesseditnew"){
		datahtml += "	<div style='width:22%;float:right;'>";
		datahtml += "		<input type='date' id='txtduedate_"+extraid+index+"' value='form' class='txtduedate"+extraclass+"'/>";
		datahtml += "	</div>";
		datahtml += "	<div style='width:15%;float:right;'>";
		datahtml += "		<input type='date' id='txtremindon_"+extraid+index+"' value='form'  class='txtremindon"+extraclass+"'/>";
		datahtml += "	</div>";
	}
	datahtml += "	<div style='width:4%;float:right; margin-left : 3%; cursor:pointer;' title='View Group'>";
	datahtml += "		<span><i class='fa fa-eye' id='div_process_edit_view_group_"+extraid+index+"' style='font-size:18px;padding-top:5px;'></i></span>";
	datahtml += "	</div>"
	datahtml += "	<div style='width:6%;float:right; margin-left : 2%; cursor:pointer;'>";
	datahtml += "		<span><i class='fa fa-trash' id='div_process_edit_trash_"+extraid+index+"' style='font-size:18px;padding-top:5px;'></i></span>";
	datahtml += "	</div>"
	datahtml += "</div>";
	$("#"+divname).append(datahtml);
	todolistprocesseditrow(index);
	//if(divname == "tblprocesseditnew") $("#tblprocesseditnew").attr("data-row", (++index));
	$("#"+divname).attr("data-row", (++index));
}

function todolistShowProcess(val){
	todolistflowobject.map(function (a) {
		if(a.id == val){
			if(a.processTemplateList != null && a.processTemplateList.length > 0){
				$("#tblprocesseditnew").html("");
				$("#tblprocesseditnew").attr("data-row", 0);
				var dt = a.processTemplateList;
				for(var index=0;index<dt.length;index++){
					todolistaddprocessrow("tblprocesseditnew");
					//$("#div_process_edit_new_"+index).attr("data-id", dt[index].id);
					//$("#div_process_edit_new_"+index).attr("data-flow-id", dt[index].flowId);
					$("#txt_adduser_loginid_new_"+index).val(dt[index].processName);
					$("#sel_group_new_"+index).val(dt[index].groupId);
					$("#div_processtaskadd").show();
					$("#div_processtaskaddlist").show();
				}
			}
		}
	});
}

function todolistCheckIfUserpartOfgroup(userid, groupid){
	var found = false;
	if(groupsdetails != null) {
		groupsdetails.map(function (a) {
			if (a.id == groupid) {
				if(a.userGroupList != null && a.userGroupList.length > 0){
					var userGroupList = a.userGroupList;
					userGroupList.map(function (a) {
						if(a.userId == userid) found = true;
					});
				}
			}
		});
	}
	return found;
}

function todoListCommentFromStageMove(idm, status, refreshsingle){
	todolistCurrentMethod = "todolistChangeStatusService";
	todolistCurrentMethodParams[0] = idm;
	todolistCurrentMethodParams[1] = status;
	todolistCurrentMethodParams[2] = refreshsingle;
	$("#divcomments").attr("data-id", idm);
	$("#txtcomment").val("");
	showActionPopup("divcomments", false);
}

function todolistEmptyGroup(classname){
	var emptyGroupName = "";
	$("."+classname).each(function () {
		var groupId = parseFloat($(this).val());
		var group = groupsdetails.find(item => item.id === groupId);
		if(group.userGroupList == undefined || group.userGroupList == null || group.userGroupList.length == 0){
			emptyGroupName = group.groupName;
		}
	});
    return emptyGroupName;
}

function todolistSearchCommon() {
	todolistResetFetch();
	todolistFetchService(0);
}