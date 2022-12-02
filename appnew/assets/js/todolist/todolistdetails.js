function todolistSingleUserProfileServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 200 && response.object != null){
		$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
		setTimeout(function(){
			$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
		},10);
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

	$("#profIm").show();
	todolistClearPostFields();
	todolistResetFetch();
	todolistFetchService(0);
	duePaymentService();
}

function todolistOTPSettingsServiceAfter(response){
	if(response.error == false){
		otpsettiongs = response.object;
		for(var i=0;i<otpsettiongs.length;i++){
			if(otpsettiongs[i].id == 1){
				$("#chk_user_mobile_security_span").html("   " + otpsettiongs[i].name);
			} else if(otpsettiongs[i].id == 2){
				$("#chk_user_whatsapp_security_span").html("   " + otpsettiongs[i].name);
			} else if(otpsettiongs[i].id == 3){
				$("#chk_user_whatsapp_email_span").html("   " + otpsettiongs[i].name);
			}
		}
	}
}

function todolistAllGroupListServiceAfter(response){
	allgrouparrList = [];
	if(response != null && response.object != null){
		var data = response.object;
		for(var i=0;i<data.length;i++){
			allgrouparrList[allgrouparrList.length] = data[i].groupName;
		}
	}
}

function todolistFetchServiceAfter(response){
	ajaxindicatorstop();

	if(localStorage._zp == "1"){
		$("#btnaddnewtodolist").show();
	}

	$("#card-mb-2").html("");
	if(response != null && response.object != null){
		var data = response.object;
		if(data.length > 0) {
			todolisttotalcount = data.length;
			todolistdata = data;
			todolistlastRow = 0;
			todolistPopulateRecordsAfter();
		} else {
			todolistorecordsfound();
		}
	} else {
		todolistorecordsfound();
	}
}

function todolistPopulateRecordsAfter(){
	var data = todolistdata;
	var len = todolistlastRow + todolistmaxrow;
	for(var i=todolistlastRow;i<len;i++){
		if(data[i] != null && data[i] != undefined) {
			var id = data[i].id;
			if(highlightrowid==0) highlightrowid = id;
			var complete = data[i].complete + "";

			var str = "";
			str = "<div class='card mb-2' id='div_todolist_"+id+"' style='cursor:pointer;' data-complete='"+complete+"'>";
			str += "</div>";
			$("#card-mb-2").append(str);
			toodolistBuildRow(data[i]);
		}
	}

	if(highlightrowid > 0 && todolistlastRow <= todolistmaxrow) {
		todolistFetchService(highlightrowid);
		$("#div_todolist_"+highlightrowid).addClass("divboxshadow");
	}
	todolistlastRow = len;
	todoPageSize();
}

function todolistorecordsfound(){
	var str = "<div class='card mb-2'>";
	str += "	<div class='card-body p-2 p-sm-3'>";
	str += "		<div class='media forum-item'>";
	str += "			<div class='media-body'>";
	str += "				<h6><a href='#' data-toggle='collapse' data-target='.forum-content' class='text-body' id='todolistmainnorec'>No Records Found</a></h6>";
	str += "			</div>";
	str += "		</div>";
	str += "	</div>";
	str += "</div>";
	$("#card-mb-2").html(str);
	$("#div_single_todolist").html(str);
}

function toodolistBuildRow(data){
	var id = data.id;
	var description = data.description;
	var eventDesc = data.eventDesc;

	var processList = data.processMasterDtoList;
	/*processList.map(function (a) {
		if(a.userId == userid) found = true;
	});*/

	var status = data.processMasterDto.status;
	var groupId = data.processMasterDto.groupId;
	var statusText = data.statusText;
	var colorCode = data.colorCode;
	var curprocessid = data.processMasterDto.id;
	var curgroupid = data.processMasterDto.groupId;
	var currentUserProessId = data.currentUserProessId;

	var createdDate = getdatefromutcdata(handleNullValue(data.createdDate), true);
	var dueDate = getdatefromutcdata(handleNullValue(data.processMasterDto.dueDate), false);
	var taskdueDate = getdatefromutcdata(handleNullValue(processList[processList.length-1].dueDate), false);

	var remindOn = "N/A";
	if(processList[processList.length-1].remindOn != null){
		remindOn = getdatefromutcdata(handleNullValue(processList[processList.length-1].remindOn), false);
	}

	var eventDescstr = eventDesc;
	if(eventDescstr != null && eventDescstr.length > 50){
		eventDescstr = eventDescstr.substring(0, 50)+"...";
	}
	eventDescstr = linkify(eventDescstr);
	eventDescstr = eventDescstr.replace(/(?:\r\n|\r|\n)/g, '<br>');

	var descriptionstr = description;
	if(descriptionstr.length > 100){
		descriptionstr = descriptionstr.substring(0, 100)+"...";
	}
	descriptionstr = linkify(descriptionstr);
	descriptionstr = descriptionstr.replace(/(?:\r\n|\r|\n)/g, '<br>');

	var stylecolor = "color:" + colorCode + ";";
	var complete = data.complete + "";

	var serialkey = data.serialKey;
	if(todolistrefreshleftsinglerow){
		todolistrefreshleftsinglerow = false;
		serialkey = todolistserialkey.replace(".", "");
	}

	var canedit = data.processMasterDto.permEdit == 1 ? true : false;
	var canview = data.processMasterDto.permView == 1 ? true : false;
	var cancomment = data.processMasterDto.permFileComment == 1 ? true : false;
	var isFirstTask = processList[0].id == data.processMasterDto.id ? true : false;
	var isLastTask = processList[processList.length-1].id == data.processMasterDto.id ? true : false;
	var isPartOfgroup = todolistCheckIfUserpartOfgroup(localStorage._zv, groupId);

	var approvebtn = false;
	var markcompletebtn = false;
	var markincompletebtn = false;
	var rejectbtn = false;
	var isAdminView = data.permAdmin == 1 ? true : false;

	if(isPartOfgroup && status == todolistRunningTask){
		if(processList.length == 1){
			markcompletebtn = true;
		} else {
			if(isFirstTask){
				approvebtn = true;
				rejectbtn = false;
			} else if(isLastTask) {
				markcompletebtn = true;
				rejectbtn = true;
			} else {
				approvebtn = true;
				rejectbtn = true;
			}
		}
	} else if(isPartOfgroup && complete == todolistCompleteTask){
		markincompletebtn = true;
	}

	var str = "";
	str += "	<div class='card-body p-2 p-sm-3'>";
	str += "		<div class='media forum-item'>";
	str += "			<a href='javascript:void(0);' class='float-right' style='height:24px;margin-right:5px;font-weight:bold;'>";
	str += "				<span id='div_todolist_serial_key_"+id+"'>"+serialkey+".</span>";
	str += "			</a>";
	str += "			<div class='media-body'>";
	str += "				<h5><p class='text-secondary' id='div_todolist_event_"+id+"' title='"+eventDesc+"' style='color:black !important; margin-top: 2px;'>Task : "+eventDescstr+"</p></h5>";
	str += "				<p class='text-secondary' id='div_todolist_desc_"+id+"' title='"+description+"'>Description : "+descriptionstr+"</p>";
	str += "				<p class='text-muted'>";
	str += "					<span>Task Due Date : <span id='div_todolist_duedate_"+id+"'>"+taskdueDate+"</span></span>";
	if(remindOn != null) {
		str += "				<span> | Remind On : <span id='div_todolist_remind_"+id+"'>"+remindOn+"</span></span>";
	}
	str += "					<span> | <i class='fa fa-circle' style='"+stylecolor+"'></i> "+statusText+"</span>";

	



	if(canedit) {
		//str += "				<span> | <a id='div_todolist_delete_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Delete</a></span>";
	}

	if(canedit) {
		//str += "				<span> | <a id='div_todolist_edit_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Edit</a></span>";
	}

	if(isAdminView){
		str += "				<span> | As you are not part of the task, you are not able to do any action on this task</span>";
	}

	str += "				</p>";
	str += "				<p class='text-muted'>";
	str += "					<span>Created By <span>"+data.createdByLoginId+" on "+createdDate+" </span></span>";
	str += "				</p>";

	if(processList.length > 1){
		var len = 1;
		if(processList.length >= 4){
			len = parseInt(processList.length/4);
			len > 0 ? len++ : len;
		}
		var start = 0;
		for(var k=0;k<len;k++){
			
		
		}
	}

	str += "			</div>";
	str += "		</div>";

	str += "	</div>";
	$("#div_todolist_"+id).attr("data-complete", complete);
	$("#div_todolist_"+id).attr("data-processid", curprocessid);
	$("#div_todolist_"+id).attr("data-groupid", curgroupid);
	$("#div_todolist_"+id).attr("data-curuser-processid", currentUserProessId);
	$("#div_todolist_"+id).html(str);
	todoListRowEvents(id);
}

function todolistByIdServiceAfter(response){
	ajaxindicatorstop();
	$("#div_single_todolist").html("");
	$("#div_single_todolist").css("height", ($(window).height()-60)+"px");
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		for(var i=0;i<data.length;i++){
			var id = data[i].id;
			var description = data[i].description;
			var eventDesc = data[i].eventDesc;
			var status = data[i].processMasterDto.status;
			var groupId = data[i].processMasterDto.groupId;
			var statusText = data[i].statusText;
			var colorCode = data[i].colorCode;
			var processList = data[i].processMasterDtoList;
			var curprocessid = data[i].processMasterDto.id;
			var curgroupid = data[i].processMasterDto.groupId;
			var isAdminView = data[i].permAdmin == 1 ? true : false;

			var createdDate = getdatefromutcdata(handleNullValue(data[i].createdDate), true);
			var dueDate = getdatefromutcdata(handleNullValue(data[i].processMasterDto.dueDate), false);
			var taskdueDate = getdatefromutcdata(handleNullValue(processList[processList.length-1].dueDate), false);

			var remindOn = "N/A";
			if(processList[processList.length-1].remindOn != null){
				remindOn = getdatefromutcdata(handleNullValue(processList[processList.length-1].remindOn), false);
			}

			var eventDescstr = eventDesc;
			eventDescstr = linkify(eventDescstr);
			eventDescstr = eventDescstr.replace(/(?:\r\n|\r|\n)/g, '<br>');

			var descriptionstr = description;
			descriptionstr = linkify(descriptionstr);
			descriptionstr = descriptionstr.replace(/(?:\r\n|\r|\n)/g, '<br>');

			var stylecolor = "color:" + colorCode + ";";
			var complete = data[i].complete + "";

			if(todolistrefreshleftsinglerow) {
				toodolistBuildRow(data[i]);
			}

			var canedit = data[i].processMasterDto.permEdit == 1 ? true : false;
			var canview = data[i].processMasterDto.permView == 1 ? true : false;
			var cancomment = data[i].processMasterDto.permFileComment == 1 ? true : false;
			var isFirstTask = processList[0].id == data[i].processMasterDto.id ? true : false;
			var isLastTask = processList[processList.length-1].id == data[i].processMasterDto.id ? true : false;
			var isPartOfgroup = todolistCheckIfUserpartOfgroup(localStorage._zv, groupId);

			var approvebtn = false;
			var markcompletebtn = false;
			var markincompletebtn = false;
			var rejectbtn = false;

			if(isPartOfgroup && status == todolistRunningTask){
				if(processList.length == 1){
					markcompletebtn = true;
				} else {
					if(isFirstTask){
						approvebtn = true;
						rejectbtn = false;
					} else if(isLastTask) {
						markcompletebtn = true;
						rejectbtn = true;
					} else {
						approvebtn = true;
						rejectbtn = true;
					}
				}
			} else if(isPartOfgroup && complete == todolistCompleteTask){
				markincompletebtn = true;
			}

			var str = "";
			str = "<div class='card mb-2' id='div_single_todolist_"+id+"' data-complete='"+complete+"' data-processid='"+curprocessid+"' data-groupid='"+curgroupid+"'>";
			str += "	<div class='card-body p-2 p-sm-3'>";
			str += "		<div class='media forum-item'>";
			str += "			<a href='javascript:void(0);' style='height:24px;margin-right:5px;font-weight:bold;'>";
			str += "				<span id='div_single_todolist_serial_key_"+id+"'>"+$("#div_todolist_serial_key_"+id).html()+"</span>";
			str += "			</a>";
			str += "			<div class='media-body'>";
			str += "				<h5><p style='margin-top:2px !important;'><a href='#' class='text-body' id='div_single_todolist_event_"+id+"'>Task : "+eventDescstr+"</a></p></h5>";
			str += "				<p class='text-secondary' id='div_single_todolist_desc_"+id+"'>Description : "+descriptionstr+"</p>";
			str += "				<p class='text-muted'>";
			str += "					<span id='div_single_todolist_duedate_"+id+"'>Task Due Date : "+taskdueDate+"</span>";
			if(remindOn != null) {
				str += "				<span id='div_single_todolist_remind_"+id+"'> | Remind On : "+remindOn+"</span>";
			}
			str += "					<span> | <i class='fa fa-circle' style='"+stylecolor+"'></i> "+statusText+"</span>";

			if(!isAdminView){
				str += "					<span> | <a id='div_single_todolist_attachfile_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>";
				str += "						<img src='assets/img/attach_blue.png' style='width:17px;cursor:pointer;'> Files";
				str += "					</a></span>";
			}

			if(rejectbtn) {
				str += "				<span> | <a id='div_single_todolist_reject_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Move to previous stage</a></span>";
			} else if(markincompletebtn) {
				str += "				<span> | <a id='div_single_todolist_incomplete_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Mark as incomplete</a></span>";
			}

			if(approvebtn) {
				str += "				<span> | <a id='div_single_todolist_approve_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Move to next stage</a></span>";
			} else if(markcompletebtn) {
				str += "				<span> | <a id='div_single_todolist_complete_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Mark as complete</a></span>";
			}

			if(canedit){
				//str += "				<span> | <a id='div_single_todolist_delete_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Delete</a></span>";
			}
			if(canedit){
				//str += "				<span> | <a id='div_single_todolist_edit_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Edit</a></span>";
			}

			if(isAdminView){
				str += "				<span> | As you are not part of the task, you are not able to do any action on this task</span>";
			}

			str += "				</p>";
			str += "				<p class='text-muted'>";
			str += "					<span>Created By <span>"+data[i].createdByLoginId+" on "+createdDate+" </span></span>";

			if(isPartOfgroup && status == todolistRunningTask){
				str += "				<span> | <a id='div_single_todolist_addcomment_"+id+"' href='javascript:void(0);' style='text-decoration:none;'>Add Comments</a></span>";
			}

			str += "				</p>";

			if(processList.length > 1){
				var len = 1;
				if(processList.length >= 4){
					len = parseInt(processList.length/4);
					len > 0 ? len++ : len;
				}
				var start = 0;
				for(var k=0;k<len;k++){
					str += "<div class='progress p-5 d-flex align-items-center' style='background-color:white; margin-right:10% !important; padding:0px !important;height:80px;align-items:baseline !important;'>";
					for(var j=start;j<=(start+3);j++){
						if(processList[j] != undefined && processList[j] != null) {
							var pname = processList[j].processName;
							var color = "";
							if(pname.length > 10) pname = pname.substring(0, 8)+"...";
							if(processList[j].id == data[i].processMasterDto.id) color = colorCode;
							if(processList[j].id < data[i].processMasterDto.id) color = "green";
							if(processList[j].id > data[i].processMasterDto.id) color = "#ccc";

							var pdueDate = getlocaltimestampfromutcdata(handleNullValue(processList[j].dueDate));
							pdueDate = getdatefromtimestamp(pdueDate, false, "EN-US");

							str += "<div class='fa-stack fa-lg text-center' title='"+processList[j].processName+"-"+processList[j].groupName+"' data-id='"+processList[j].id+"' id='div_single_process_"+processList[j].id+"'>";
							str += "<i class='fa fa-circle-o fa-stack-2x' style='color:"+color+";'></i>";
							str += "<div class='' style=''><b>"+(j+1)+"</b></div>";
							str += "<div class='' style='width:90px;font-size:14px;margin-left:-5px;color:#6c757d!important'>"+pdueDate+"</div>";
							str += "<div class='' style='width:90px;font-size:12px;margin-left:-4px;color:#6c757d!important;line-height:1;'>Stage Due Date</div>";
							str += "</div>";
							if(processList[j+1] != undefined && processList[j+1] != null && j<(start+4)) str += "<div class='line-btw'></div>";
						}
					}
					str += "</div>";
					start = start+4;
				}
			}

			str += "			</div>";
			str += "		</div>";
			str += "	</div>";
			str += "</div>";
			str += "<div class='mb-3 has-icon' style='font-weight:bold;text-align:center;width:100%;border-bottom:2px solid #000;'>Comments</div>";
			str += "<div class='card mb-2' id='div_single_todolist_commentslist_"+id+"' style='background:#edf4ff;border:0px;box-shadow:none;'>";
			str += "</div>";
			$("#div_single_todolist").append(str);
			todoListSingleRowEvents(id);
			if(!isAdminView) todolistFetchCommentService(id);
		}
	} else {
		var str = "<div class='card mb-2'>";
		str += "	<div class='card-body p-2 p-sm-3'>";
		str += "		<div class='media forum-item'>";
		str += "			<div class='media-body'>";
		str += "				<h6><a href='#' data-toggle='collapse' data-target='.forum-content' class='text-body'>No Records Found</a></h6>";
		str += "			</div>";
		str += "		</div>";
		str += "	</div>";
		str += "</div>";
		$("#div_single_thread").html(str);
	}
}

function todolistAddServiceAfter(response){
	hideActionPopup("divworkflowmodal");
	ajaxindicatorstop();
	if(response != null && response.object != null){
		$("#tblprocesseditnew").attr("data-row", 0);
		$("#tblprocesseditnew").html("");
		var extraParam = response.extrajsonparam;
		if(extraParam != null && extraParam.id > 0) {
			todolistRefreshSingleRow(extraParam.id);
		} else {
			todolistResetFetch();
			todolistFetchService(0);
		}
	} else {
		todoListShowconfirmmsg(todolistmessage.eventexists, confirm_Error, 5000, "", false, false);
	}
}

function todolistChangeStatusServiceAfter(response) {
	ajaxindicatorstop();
	hideActionPopup("divcomments");
	if(response != null && response.error == false && response.object != null){
		todolistRefreshSingleRow( response.extrajsonparam.id);
	} else {
		todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
	}
}

function todolistDeleteServiceAfter(response) {
	ajaxindicatorstop();
	if(response != null && response.object != null){
		var extraParam = response.extrajsonparam;
		//if(extraParam.id == highlightrowid) {
			todolistResetFetch();
			//$("#div_single_todolist").html("");
		//}
		todolistFetchService(0);
	} else {
		todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
	}
}

function todolistAddCommentServiceAfter(response) {
	ajaxindicatorstop();
	hideActionPopup("divcomments");
	if(response != null && response.object != null){
		var extraParam = response.extrajsonparam;
		todolistFetchCommentService(extraParam.id);
	} else {
		todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
	}
}

function todolistFetchCommentServiceAfter(response){
	ajaxindicatorstop();
	var extraParam = response.extrajsonparam;
	$("#div_single_todolist_commentslist_"+extraParam.id).html("");
	if(response != null && response.object != null){
		var data = response.object;
		var size = data.length;
		for(var i=0;i<data.length;i++){
			var createdDate = getdatefromutcdata(handleNullValue(data[i].createdDate), true);

			var ispartofgroup = todolistCheckIfUserpartOfgroup(localStorage._zv, $("#div_todolist_"+data[i].todoListId).attr("data-groupid"));
			var issameprocess = data[i].processId == $("#div_todolist_"+data[i].todoListId).attr("data-processid") ? true : false;

			var commentstr = data[i].comment;
			commentstr = linkify(commentstr);
			commentstr = commentstr.replace(/(?:\r\n|\r|\n)/g, '<br>');

			var str = "";
			str = "<div class='card mb-2' id='div_single_todolist_comment_"+data[i].id+"'>";
			str += "	<div class='card-body p-2 p-sm-3'>";
			str += "		<div class='media forum-item'>";
			str += "			<a href='javascript:void(0);' style='height:24px;margin-right:5px;font-weight:bold;'>";
			str += "				<span>"+(size--)+".</span>";
			str += "			</a>";
			str += "			<div class='media-body'>";
			str += "				<p class='text-secondary'>"+commentstr+"</p>";
			str += "				<p class='text-muted'>";
			str += "					<span>"+data[i].createdByStr+"</span>";
			str += "					<span> Commented On : "+createdDate+"</span>";
			if($("#div_single_todolist_"+extraParam.id).attr("data-complete") != "C") {
				if((localStorage._zp == "1" || data[i].createdBy == localStorage._zv) && ispartofgroup && issameprocess) {
					str += "			<span> | <a id='div_single_todolist_comment_delete_"+data[i].id+"' href='javascript:void(0);' style='text-decoration:none;'>Delete</a></span>";
				}
				if(ispartofgroup){
					str += "				<span> | <a id='div_single_todolist_comment_addcomment_"+data[i].id+"' href='javascript:void(0);' style='text-decoration:none;' data-parent='"+extraParam.id+"'>Add Comments</a></span>";
				}
			}
			str += "				</p>";
			str += "			</div>";
			str += "		</div>";
			str += "	</div>";
			str += "</div>";
			$("#div_single_todolist_commentslist_"+extraParam.id).append(str);
			todoListCommentRowEvents(data[i].id);
		}
	}
}

function todolistDeleteCommentServiceAfter(response) {
	ajaxindicatorstop();
	var extraParam = response.extrajsonparam;
	if(response != null && response.object != null){
		$("#div_single_todolist_comment_"+extraParam.id).remove();
	} else {
		todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
	}
}

function todolistFetchStorageLeftServiceAfter(response){
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
			$("#mallocatedspacepersonal").html("Personal : " + formatBytesDecimal(personal));
			$("#mallocatedspacedataroom").html("Data Room : " + formatBytesDecimal(dataroom));
			$("#mallocatedspacepersonal").show();
			$("#mallocatedspacedataroom").show();
			allocatedStorage = parseFloat(attr2.split("#")[0]);
			used = parseFloat(attr2.split("#")[1]);
		} else if(localStorage._zs == "I") {
			allocatedStorage = parseFloat(attr1.split("#")[0]);
			used = parseFloat(attr1.split("#")[1]);
		}

		if(used > allocatedStorage){
			used = allocatedStorage;
		}
		sizeLeft = allocatedStorage - used;
		var perntageused = parseInt(Math.floor(used * 100/allocatedStorage));
		var perntageleft = 100 - perntageused;
		var v1 = formatBytesDecimal(used);
		var v2 = formatBytesDecimal(allocatedStorage);
		$("#mallocatedspace").html("Storage : " + v1 + " / " + v2);
		if(v1 == v2){
			perntageused = "100";
		}
		$("#mallocatedspace").html("Storage : " + formatBytesDecimal(used) + " / " + formatBytesDecimal(allocatedStorage));
		$(".counter").attr("data-cp-percentage", perntageused);
		progresscircledynamic();
	}
}

//drive details methods starts
function fetchAllAdmFolderListResponse(response){
	previousidm = "";
	var extraParam = response.extrajsonparam;
	var foldertype = extraParam.foldertype;
	if((response.error+"") == "false" && response.object != null) {
		var folderparnetid = 0;
		var data = response.object;
		if(data != null && data.length > 0 && data != "null") {
			var tempJSON = {};
			var tempJSONPermission = {};
			admLoopFolderList(data);
			$("#drm_folder_info_"+data.folderId).show();
		} else {
			admShowNoDataFoundTable();
		}
	}
}

/**
 * method to loop through file list
 */
function admLoopFolderList(data){
	$("#tblfolderrows").html("");
	data = admListSortSort(data, "folder");
	if(data != null && data.length > 0){
		var datahtml='';
		for(var i=0;i<data.length;i++) {
			var status = data[i].status;
			if(status != "D") {
				var fdId = data[i].folderId;
				var foldername = data[i].folderPath;
				var folderIndex = data[i].folderIndex;

				if(foldername.indexOf("/") > 0) {
					foldername = foldername.substring(foldername.lastIndexOf("/")+1);
				}

				adm_copy_parentfolderpath[data[i].folderPath] = fdId;

				datahtml="";
				var datavar = "data-id='"+fdId+"' path='"+data[i].folderPath+"' data-foldername='"+foldername+"'";
				if(i>0){
					datahtml += "<hr>";
				}

				var totalLength = 30;
				if((folderIndex + foldername).length >=totalLength){
					var charRemaining = totalLength - folderIndex.length;
					var lfolderLength = foldername.length;
					var fixedLength = "...".length;
					var displayChar = charRemaining - fixedLength;
					if(lfolderLength > displayChar){
						foldername = foldername.substring(0,displayChar)+"...";
					}
				}
				foldername = (handleNullValue(folderIndex).length > 0 ? (folderIndex+"-") : "" ) +foldername;

				datahtml += "<div class='row new-row copyrow' id='adm_copy_folderrow_"+fdId+"' "+datavar+" style='margin-right:0px;margin-left:0px;'>";
				datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;' id='adm_copy_foldername_"+fdId+"' "+datavar+">";
				datahtml += "		<div>";
				datahtml += "			<img class='respons' src='assets/img/folder.png' alt='' style='vertical-align:unset;'>";
				datahtml += "			<span style='margin-left: -43px;margin-top:28px;position:absolute;font-size:10px;color:white;letter-spacing:1px;display:"+(data[i].folderHasDRM=="1"?"":"none")+"'' id='drm_folder_info_"+fdId+"' title='Some folders/files have DRM applied'>DRM</span>";
				datahtml += "		</div>";
				datahtml += "		<div style='padding-top:12px;'>";
				datahtml += "			<h2 title='"+data[i].folderPath+"'>";
				datahtml += "				<a href='javascript:void(0);' style='height:18px;font-size:14px;font-weight:400;line-height:20px;color:#23bbf3;'>"+foldername+"</a>";
				datahtml += "			</h2>";
				datahtml += "		</div>";
				datahtml += "	</div>";
				datahtml += "</div>";

				$("#tblfolderrows").append(datahtml);
				admFolderClickMoreEvent("adm_copy_folderrow_"+fdId);
			}
		}
		ajaxindicatorstop();
	}
}

function admLoopFileList(data){
	data = admListSortSort(data, "file");
	if(data != null && data.length > 0){
		var datahtml='';
		for(var i=0;i<data.length;i++) {
			var status = data[i].status;
			if(status != "D") {
				var id = data[i].id;
				var fileName = data[i].fileName;
				var fileIndex = data[i].fileIndex;
				var filetype = data[i].fileType;

				datahtml="";
				var datavar = "data-id='"+id+"' data-name='"+fileName+"' data-type='"+filetype+"'";

				if(i>0) datahtml += "<hr>";
				else if($("#tblfolderrows").html().length > 0) datahtml += "<hr>";

				var totalLength = 30;
				if((fileIndex + fileName).length >=totalLength){
					var charRemaining = totalLength - fileIndex.length;
					var lfolderLength = fileName.length;
					var fixedLength = "...".length;
					var displayChar = charRemaining - fixedLength;
					if(lfolderLength > displayChar){
						fileName = fileName.substring(0,displayChar)+"...";
					}
				}
				fileName = (handleNullValue(fileIndex).length > 0 ? (fileIndex+"-") : "" ) +fileName;

				datahtml += "<div class='row new-row copyrow' id='adm_copy_filerow_"+id+"' "+datavar+" style='margin-right:0px;margin-left:0px;'>";
				datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;'>";
				datahtml += "		<div>";
				datahtml += "			<img class='respons' src='"+checkFileExtention(filetype)+"' alt='' style='vertical-align:unset;'>";
				datahtml += "		</div>";
				datahtml += "		<div style='padding-top:12px;'>";
				datahtml += "			<h2 title='"+data[i].fileName+"'>";
				datahtml += "				<a href='javascript:void(0);' style='height:18px;font-size:14px;font-weight:400;line-height:20px;color:#23bbf3;'>"+fileName+"</a>";
				datahtml += "			</h2>";
				var drmstyledisplay = (data[i].drmadded == 1 ? "" : "display:none;");
				datahtml += " <br><span style='cursor:pointer;" + drmstyledisplay + "' style='height: 18px; font-size: 14px; font-weight: 400; line-height: 20px;' class='flagcommon'> DRM Applied</span>";
				datahtml += "</span>"
				datahtml += "		</div>";
				datahtml += "	</div>";
				datahtml += "</div>";

				$("#tblfolderrows").append(datahtml);
				admFileClickEvent("adm_copy_filerow_"+id);
			}
		}
		ajaxindicatorstop();
	}
}

/**
 * method to display folders and files from second level onwards
 * @param response
 */
function fetchAllAdmFolderChildListResponse(response){
	if(adm_documentmaxlimit == 0){
		$("#tblfolderrows").html("");
		admtotaldocs = 0;
	}

	if((response.error+"") == "false" && response.object != null) {
		adm_documentmaxlimit = adm_documentmaxlimit + maxlimitlistadd;
		var data = response.object;
		var extraParam = response.extrajsonparam;
		var folderfetch = extraParam.folderfetch;

		if(data != null && data != "null") {
			admttotalfile = data.noOfFiles;
			if(folderfetch == true) $("#tblfolderrows").html("");

			if(data.unIndexFoldersList != null && folderfetch == true){
				admLoopFolderList(data.unIndexFoldersList);
			}

			if(data.unIndexDocumentsList != null && data.unIndexDocumentsList.length > 0){
				admtotaldocs = data.noOfFiles;
				admLoopFileList(data.unIndexDocumentsList);
			}
		}
	}

	if($("#tblfolderrows").html() == ""){
		$("#tblfolderrows").html("<span style='font-size:14px;'>No folder/files found</span>");
	}

	ajaxindicatorstop();
}

//drive ends

function todolistFetchFileServiceAfter(response){
	ajaxindicatorstop();
	$("#tblselectedrows").html("");
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		for(var i=0;i<data.length;i++){
			var datahtml = "";
			var id = data[i].todoListId + "-" + data[i].fileId;
			var fileName = data[i].fileName;
			var ispartofgroup = todolistCheckIfUserpartOfgroup(localStorage._zv, $("#div_todolist_"+data[i].todoListId).attr("data-groupid"));
			var issameprocess = data[i].processId == $("#div_todolist_"+data[i].todoListId).attr("data-processid") ? true : false;

			if(fileName.length > 30){
				fileName = fileName.substring(0, 27)+"...";
			}

			var color = "color:#23bbf3;";
			if(data[i].fileStatus == "D"){
				color = "color:#FF0000";
			}

			var createdDate = getdatefromutcdata(handleNullValue(data[i].createdDate), true);

			datahtml += "<div class='row new-row copyrow' id='adm_copy_filerow_"+id+"' style='margin-right:0px;margin-left:0px;'>";
			datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;'>";
			datahtml += "		<div style='width:6%;float:left;' title='"+data[i].fileType+"'>";
			datahtml += "			<img class='respons' src='"+checkFileExtention(data[i].fileType)+"' alt='' style='vertical-align:unset;width:24px;'>";
			datahtml += "		</div>";
			datahtml += "		<div style='padding-top:12px;width:80%;float:left;cursor:pointer;' id='div_file_click_"+id+"'>";
			datahtml += "			<h2  title='"+data[i].folderPath+"/"+data[i].fileName+"'>";
			datahtml += "				<a href='javascript:void(0);' style='height:18px;font-size:14px;font-weight:400;line-height:20px;"+color+"'>"+fileName+"</a>";
			datahtml += "			</h2>";
			datahtml += "		</div>";
			if(data[i].fileStatus == "A"){
				datahtml += "		<div style='padding-top:12px;width:5%;'>";
				datahtml += "			<span style='cursor:pointer;float:right;' id='span_filerow_download_"+id+"' title='Download'><i class='fa fa-download'></i></span>";
				datahtml += "		</div>";
			}
			datahtml += "		<div style='padding-top:12px;width:5%;'>";
			if(ispartofgroup && issameprocess){
				datahtml += "			<span style='cursor:pointer;float:right;' id='span_filerow_del_"+id+"' title='delete'><i class='fa fa-trash'></i></span>";
			}
			datahtml += "		</div>";
			datahtml += "	</div>";
			datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;'>";
			datahtml += "		<div style='float:left;font-size:14px;'>";
			datahtml += "			Created by " + createdDate + " on " + data[i].createdLoginId;
			datahtml += "		</div>";
			datahtml += "	</div>";
			datahtml += "</div>";
			datahtml += "<hr>";
			$("#tblselectedrows").append(datahtml);
			admSelectedFileEvent(id);
		}
	} else {
		$("#tblselectedrows").html("No records Found");
	}
}

function todolistDeleteFileServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		todolistFetchFileService(extraParam.id);
	} else {
		todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
	}
}

function todolistAddFileServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var extraParam = response.extrajsonparam;
		todolistFetchFileService(extraParam.id);
	} else {
		todoListShowconfirmmsg(todolistmessage.fileattached, confirm_Error, 5000, "", false, false);
	}
}

//group code starts
function fetchAllGroupsServiceAfter(response){
	ajaxindicatorstop();
	$("#tblgroups").html("");
	$(".usergroupcheckbox").prop("checked", false);
	$(".usergroupcheckbox").attr("disabled", true);
	$(".highlightedgrouprow").removeClass("highlightedgrouprow");
	selectidgroup = 0;
	groupsdetails = [];

	var datahtml="";
	datahtml += "<div class='row new-row copyrow groupsrow groupnotfound' style='margin-right:5px;margin-left:0px;cursor:pointer;padding-left:10px;padding-right:10px;display:none;'>";
	datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
	datahtml += "		<div style='padding-top:12px;width:87%;float:left;cursor:pointer;'>";
	datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;'>No groups found</div>";
	datahtml += "		</div>";
	datahtml += "		<div style='padding-top:12px;width:5%;'>&nbsp;</div>";
	datahtml += "		<div style='padding-top:12px;width:5%;'>&nbsp;</div>";
	datahtml += "	</div>";
	datahtml += "</div>";
	$("#tblgroups").append(datahtml);

	if((response.error+"") == "false" && response.object != null) {
		data = response.object;
		groupsdetails = data;
		if(data != null && data.length > 0){
			var datahtml='';
			for(var i=0;i<data.length;i++) {
				var status = data[i].status;
				if(status != "D") {
					var id = data[i].id;
					var groupName = data[i].groupName;
					var createdDate = getlocaltimestampfromutcdata(handleNullValue(data[i].createdDate));
					createdDate = getdatefromtimestamp(createdDate, false, "EN-US");

					datahtml="";
					datahtml += "<div class='row new-row copyrow groupsrow' id='div_group_row_"+id+"' style='margin-right:5px;margin-left:0px;cursor:pointer;padding-left:10px;padding-right:10px;'>";
					datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
					datahtml += "		<div style='padding-top:12px;width:87%;float:left;cursor:pointer;'>";
					datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;' class='groupnamerow' id='div_group_name_"+id+"'>"+groupName+"</div>";
					datahtml += "		</div>";
					datahtml += "		<div style='padding-top:12px;width:5%;'>";
					datahtml += "			<span style='cursor:pointer;float:right;' id='div_group_edit_"+id+"' title='edit name'><i class='fa fa-edit'></i></span>";
					datahtml += "		</div>";
					datahtml += "		<div style='padding-top:12px;width:5%;'>";
					datahtml += "			<span style='cursor:pointer;float:right;' id='div_group_trash_"+id+"' title='delete'><i class='fa fa-trash'></i></span>";
					datahtml += "		</div>";
					datahtml += "	</div>";
					datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
					datahtml += "		<div style='float:left;font-size:14px;'>";
					datahtml += "			Created by " + data[i].createdByLoginId + " on " + createdDate;
					datahtml += "		</div>";
					datahtml += "	</div>";
					datahtml += "</div>";
					datahtml += "<hr id='hr_row_group_"+id+"' class='hr_row_group_class'>";

					$("#tblgroups").append(datahtml);
					todolistGroupClickEvent(id);

					var userfound = false;
					//groupsdetails.find(item => item.id === parseFloat(id)).userGroupList = data;
					var dt = groupsdetails.find(item => item.id === parseFloat(id));
					var userGroupList = dt.userGroupList;
					userGroupList.forEach(function(result, index) {
						if(result.userId == localStorage._zv) userfound = true;
					});
					if(!userfound){
						$("#div_group_edit_"+id).remove();
						$("#div_group_trash_"+id).remove();
					}
				}
			}
			$(".sel_group_new").each(function () {
				var val = $(this).val();
				$(this).empty();
				var grpid = 0;
				$(this).append("<option "+(grpid==val?"selected":"")+" value='0'>Select Group</option>");
				for(var i=0;i<groupsdetails.length;i++){
					grpid = groupsdetails[i].id;
					$(this).append("<option "+(grpid==val?"selected":"")+" value='"+grpid+"'>"+groupsdetails[i].groupName+"</option>");
				}
  			});
  			var len = $(".groupsrow").length;
			if(len > 0){
				var grp = $(".groupsrow")[1];
				var id = $(grp).attr("id");
				selectidgroup = id;
				$(grp).click();
			}
		}
	} else {
		$(".groupnotfound").show();
	}
}

function todolistUserListServiceAfter(response){
	ajaxindicatorstop();
	groupheaderRowAdd();

	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		admUserList = sortJSONByAttribute(data, "firstName", true, "string");
		groupListUsers();
	} else {
		$(".userrownotfound").show();
	}
}

function groupheaderRowAdd(){
	$("#tblgroupuserlist").html("");
	var datahtml="";
	datahtml += "<div class='row new-row copyrow usersrow userrownotfound' style='display:none;margin-right:0px;margin-left:0px;' id='divgroupnouser'>";
	datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;padding-top:12px;'>";
	datahtml += "		<div style='width:6%;float:left;'>&nbsp;</div>";
	datahtml += "		<div style='width:80%;float:left;cursor:pointer;'>";
	datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;'>No users found</div>";
	datahtml += "		</div>";
	datahtml += "	</div>";
	datahtml += "</div>";
	$("#tblgroupuserlist").append(datahtml);
}

function groupListUsers(){
	groupheaderRowAdd();

	if(admUserList != null && admUserList != undefined && admUserList.length > 0) {
		for(var i=0;i<=admUserList.length-1;i++){
			var id = admUserList[i].id;
			if(id != localStorage._zv){
				var username = admUserList[i].firstName;

				if((admUserList[i].middleName + "") != "null" && (admUserList[i].middleName + "") != ""){
					username += " " + admUserList[i].middleName;
				}
				if((admUserList[i].lastName + "") != "null" && (admUserList[i].lastName + "") != ""){
					username += " " + admUserList[i].lastName;
				}

				datahtml="";
				datahtml += "<div class='row new-row copyrow usersrow' id='div_user_group_row_"+id+"' style='margin-right:0px;margin-left:0px;' data-edited='0' data-checked='false'>";
				datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;padding-top:6px;padding-left:5px;'>";
				datahtml += "		<div style='width:3%;float:left;margin-bottom:0px;' class='custom-mt-form-group'>";
				datahtml += "			<input type='checkbox' data-toggle='tooltip' class='usergroupcheckbox u1 allusergroupcheckbox' id='div_user_group_row_checkbox_"+id+"' data-userid='"+id+"'/>";
				datahtml += "		</div>";
				datahtml += "		<div style='width:80%;float:left;cursor:pointer;padding-left:5px;padding-top:3px;'>";
				datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;'>"+username+", "+admUserList[i].loginId+", "+admUserList[i].userTypeId.toLowerCase()+"</div>";
				datahtml += "		</div>";
				datahtml += "	</div>";
				datahtml += "</div>";
				datahtml += "<hr id='hr_row_user_"+id+"' class='hr_row_user_class'>";
				$("#tblgroupuserlist").append(datahtml);
				todolistUserGroupsEvent(id);
			}
		}
		$(".usergroupcheckbox").prop("checked", false);
		$(".usergroupcheckbox").attr("disabled", true);
	} else {
		$(".userrownotfound").show();
	}
}

function fetchAllUserGroupsByIdServiceAfter(response) {
	ajaxindicatorstop();
	groupListUsers();

	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		$("#btnresetgroupselection").click();
		var userfound = false;
		groupsdetails.find(item => item.id === parseFloat(selectidgroup)).userGroupList = data;
		var userGroupList = data;
		userGroupList.forEach(function(result, index) {
			if(result.userId == localStorage._zv) userfound = true;
		});

		$(".usergroupcheckbox").attr("disabled", true);
		$(".usergroupcheckbox").prop("checked", false);
		if(userfound) $(".usergroupcheckbox").removeAttr("disabled");

		var arr = [];
		var arrid = [];
		var j = 0;
		for(var i=0;i<data.length;i++){
			if(data[i].userId != localStorage._zv) {
				arr[j] = $("#div_user_group_row_"+data[i].userId).html();
				arrid[j++] = data[i].userId;
				$("#div_user_group_row_checkbox_"+data[i].userId).prop("checked", true);
				$("#div_user_group_row_"+data[i].userId).remove();
				$("#hr_row_user_"+data[i].userId).remove();
			}
		}

		for(var i=arr.length-1;i>=0;i--){
			var str = "<div class='row new-row copyrow usersrow' id='div_user_group_row_"+arrid[i]+"' style='margin-right:0px;margin-left:0px;' data-edited='0' data-checked='true'>";
			str += arr[i];
			str += "</div>";
			str += "<hr id='hr_row_user_"+arrid[i]+"' class='hr_row_user_class'>";
			$(str).insertAfter("#divgroupnouser");
			$("#div_user_group_row_checkbox_"+arrid[i]).prop("checked", true);
			todolistUserGroupsEvent(arrid[i]);
		}

		if(data.length == admUserList.length){
			$(".usergroupcheckbox").prop("checked", true);
		}
	}
}

function todolistAddUserGroupServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		/*todoListShowconfirmmsg(todolistmessage.useraddedtogroup, confirm_Success, 5000, "", false, false);
		if(response.extrajsonparam.userId == -2 || $('.u1:checkbox:checked').length == admUserList.length){
			$(".usergroupcheckbox").prop("checked", true);
		} else {
			var group = groupsdetails.find(item => item.id === parseFloat(selectidgroup));
			var sm = {"action":null,"groupId":selectidgroup,"groupName":group.groupName,"permAI":0,"permCopy":0,"permDelete":0,"permDownload":0,
					"permDownloadOrg":0,"permLock":0,"permShare":0,"permUpload":0,"permView":0,"status":1,"userId":response.extrajsonparam.userId};
			if(group.userGroupList == undefined || group.userGroupList == null){
				group.userGroupList = [];
			}
			group.userGroupList.push(sm);
		}*/

		todoListShowconfirmmsg(todolistmessage.usergroupupdated, confirm_Success, 5000, "", false, false);
		$("#div_group_row_"+selectidgroup).click();
	} else {
		if(response.message == "NOPERMISSION"){
			todoListShowconfirmmsg(todolistmessage.nopermission, confirm_Error, 5000, "", false, false);
		} else {
			todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
		}
	}
}

function todolistDeleteUserGroupByIdServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		if(response.extrajsonparam.userId == -1){
			todoListShowconfirmmsg(todolistmessage.userremovedfromgroup, confirm_Success, 5000, "", false, false);
			$(".usergroupcheckbox").prop("checked", false);
		} else if(response.extrajsonparam.userId == -2){
			todolistAddUserGroupByUserIdService(-2);
		} else {
			if($('.u1:checkbox:not(":checked")').length == admUserList.length) {
				$(".usergroupcheckbox").prop("checked", false);
			}
			var userfound = true;
			var userGroupList = groupsdetails.find(item => item.id === parseFloat(selectidgroup)).userGroupList;
			userGroupList.forEach(function(result, index) {
			    if(result.userId == response.extrajsonparam.userId) {
			      	userGroupList.splice(index, 1);
			    }
			    if(response.extrajsonparam.userId == localStorage._zv) userfound = false;
  			});

  			if(!userfound){
				$(".usergroupcheckbox").attr("disabled", true);
			}
		}
	} else {
		if(response.message == "NOPERMISSION"){
			todoListShowconfirmmsg(todolistmessage.nopermission, confirm_Error, 5000, "", false, false);
		} else {
			todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
		}
	}
}

function todolistDeleteGroupServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		todoListShowconfirmmsg(todolistmessage.groupdeleted, confirm_Success, 5000, "", false, false);
		if(selectidgroup == response.extrajsonparam.id){
			$(".highlightedgrouprow").removeClass("highlightedgrouprow");
			$(".usergroupcheckbox").prop("checked", false);
		}
		$("#div_group_row_"+response.extrajsonparam.id).remove();
		$("#hr_row_group_"+response.extrajsonparam.id).remove();
		fetchAllGroupsService();
	} else {
		if(response.message == "NOPERMISSION"){
			todoListShowconfirmmsg(todolistmessage.nopermission, confirm_Error, 5000, "", false, false);
		} else if(response.message == "PROCESSATTACHED"){
			todoListShowconfirmmsg(todolistmessage.groupprocessattached, confirm_Error, 5000, "", false, false);
		} else {
			todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
		}
	}
}

function todolistAddGroupServiceAfter(response) {
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		hideActionPopup("divnewgroupmodal");
		showActionPopup("groupmodal", false);
		todoListShowconfirmmsg(todolistmessage.groupadded, confirm_Success, 5000, "", false, false);
		if(response.extrajsonparam.id > 0){
			$("#div_group_name_"+response.extrajsonparam.id).html($("#txtgroup").val());
			var groupId = parseFloat(response.extrajsonparam.id);
			var group = groupsdetails.find(item => item.id === groupId);
			group.groupName = $("#txtgroup").val();
			//repopulate add create screen and add flow template screen
			$(".sel_group_new").each(function () {
				var val = $(this).val();
				$(this).empty();
				var grpid = 0;
				$(this).append("<option "+(grpid==val?"selected":"")+" value='0'>Select Group</option>");
				for(var i=0;i<groupsdetails.length;i++){
					grpid = groupsdetails[i].id;
					$(this).append("<option "+(grpid==val?"selected":"")+" value='"+grpid+"'>"+groupsdetails[i].groupName+"</option>");
				}
  			});
		} else {
			fetchAllGroupsService();
		}
		$("#txtgroup").val("");
	} else {
		if(response.message == "NOPERMISSION"){
			todoListShowconfirmmsg(todolistmessage.nopermission, confirm_Error, 5000, "", false, false);
		} else {
			todoListShowconfirmmsg(todolistmessage.requestprocesserror, confirm_Error, 5000, "", false, false);
		}
	}
}
//group code ends

//workflow template code starts
function todolistAddFlowServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		hideActionPopup("divnewflowmodal");
		$("#tblprocessedit").html("");
		if(templatecreatefromtask == true){
			todolistflowobjectcreated = response.object;
		} else {
			showActionPopup("flowtemplatemodal", false);
			$('#txtsearchflow').focus();
		}
		$("#btnrefreshworkflow").click();
	} else {
		todoListShowconfirmmsg(todolistmessage.workflownameexists, confirm_Error, 5000, "", false, false);
	}
}

function todolistFetchFlowServiceAfter(response){
	ajaxindicatorstop();
	$("#tblflows").html("");
	$('#txtsearchflow').focus();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		if(data.length > 0){
			todolistflowobject = data;
			var datahtml='';
			for(var i=0;i<data.length;i++) {
				var id = data[i].id;
				var flowName = data[i].flowName;
				var createdDate = getlocaltimestampfromutcdata(handleNullValue(data[i].createdDate));
				createdDate = getdatefromtimestamp(createdDate, false, "EN-US");

				datahtml="";
				datahtml += "<div class='row new-row copyrow flowsrow' id='div_flow_row_"+id+"' style='color:#6c757d !important;margin-right:5px;margin-left:0px;cursor:pointer;padding-left:10px;padding-right:10px;'>";
				datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
				datahtml += "		<div style='padding-top:12px;width:87%;float:left;cursor:pointer;'>";
				datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;' class='flownamerow'>Workflow Name : <span id='div_flow_name_"+id+"'>"+flowName+"</span></div>";
				datahtml += "		</div>";
				datahtml += "		<div style='padding-top:12px;width:5%;'>";
				datahtml += "			<span style='cursor:pointer;float:right;' id='div_flow_edit_"+id+"' title='edit name and stage list'><i class='fa fa-edit'></i></span>";
				datahtml += "		</div>";
				datahtml += "		<div style='padding-top:12px;width:5%;'>";
				datahtml += "			<span style='cursor:pointer;float:right;' id='div_flow_trash_"+id+"' title='delete'><i class='fa fa-trash'></i></span>";
				datahtml += "		</div>";
				datahtml += "	</div>";
				datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
				datahtml += "		<div style='float:left;font-size:14px;'>";
				datahtml += "			Created by " + createdDate + " on " + data[i].createdLoginId;
				datahtml += "		</div>";
				datahtml += "	</div>";
				datahtml += "</div>";
				datahtml += "<hr id='hr_row_flow_"+id+"' class='hr_row_flow_class'>";

				$("#tblflows").append(datahtml);
				todolistFlowClickEvent(id);
			}
			if(templatecreatefromtask == true){
				templatecreatefromtask = false;
				todolistShowProcess(todolistflowobjectcreated);
				showActionPopup("divworkflowmodal", false);
			}
		} else {
			flownorecfoundrow();
		}
	} else {
		flownorecfoundrow();
	}
}

function flownorecfoundrow(){
	$("#tblflows").html("");
	var datahtml="";
	datahtml += "<div class='row new-row copyrow flowsrow flowrownotfound' style='color:#6c757d !important;margin-right:0px;margin-left:0px;'>";
	datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;padding-top:12px;'>";
	datahtml += "		<div style='width:80%;float:left;cursor:pointer;'>";
	datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;'>No workflow found</div>";
	datahtml += "		</div>";
	datahtml += "	</div>";
	datahtml += "</div>";
	$("#tblflows").append(datahtml);
	flowprocessnorecfoundrow("tblprocesslist");
}

function todolistShowProcessList(data){
	$("#tblprocesslist").html("");
	if(data != null && data.length > 0){
		for(var i=0;i<data.length;i++) {
			var id = data[i].id;
			var processName = data[i].processName;
			var groupName = data[i].groupName;
			var groupId = data[i].groupId;
			var level = data[i].level;

			var datahtml="";
			datahtml += "<div class='row new-row copyrow processrow' id='div_process_row_"+id+"' style='color:#6c757d !important;margin-right:5px;margin-left:0px;cursor:pointer;padding-left:10px;padding-right:10px;'>";
			datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
			datahtml += "		<div style='padding-top:12px;width:100%;float:left;cursor:pointer;'>";
			datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;' class='flownamerow' id='div_process_name_"+id+"'>Stage Name : "+processName+"</div>";
			datahtml += "		</div>";
			datahtml += "	</div>";
			datahtml += "	<div class='col-md-12' style='cursor:pointer;display:inline-flex;padding-left:0px;padding-right:0px;'>";
			datahtml += "		<div style='float:left;font-size:14px;'>";
			datahtml += "			Group : " + groupName + " | Level : " + level;
			datahtml += "		</div>";
			datahtml += "	</div>";
			datahtml += "</div>";
			datahtml += "<hr id='hr_row_flow_"+id+"' class='hr_row_group_class'>";

			$("#tblprocesslist").append(datahtml);
		}
	} else {
		flowprocessnorecfoundrow("tblprocesslist");
	}
}

function todolistEditProcessList(data){
	$("#tblprocesslist").html("");
	if(data.length > 0){
		for(var i=0;i<data.length;i++){
			var id = data[i].id;
			var datahtml = "";
			datahtml = "<div class=;'form-group custom-mt-form-group' id='txtprocess_"+id+"'>";
			datahtml = "	<input type='text' id='txtprocessname_"+id+"' maxlength='50' style='color:#6c757d !important;width:50%;float:left;' placeholder='Stage Name'/>";
			datahtml = "	<select class='custom-select custom-select-sm w-auto mr-1' id='selectprocess_"+id+"' style='font-size:14px;color:#6c757d!important;width:50% !important;float:left;'>";
			datahtml = "		<option selected value=0'>Select</option>";
			for(var j=0;j<groupsdetails.length;j++){
				datahtml = "		<option value='"+groupsdetails[j].id+"'>"+groupsdetails[j].groupName+"</option>";
			}
			datahtml = "	</select>";
			datahtml = "	<i class='bar'></i>";
			datahtml = "</div>";
			$("#tblprocesslist").append(datahtml);
		}
	} else {
		flowprocessnorecfoundrow("tblprocesslist");
	}
}

function flowprocessnorecfoundrow(tableid){
	$("#"+tableid).html("");
	var datahtml="";
	datahtml += "<div class='row new-row copyrow processrow processrownotfound' id='processrownotfound' style='color:#6c757d !important;margin-right:0px;margin-left:0px;'>";
	datahtml += "	<div class='col-md-12 up' style='cursor:pointer;display:inline-flex;padding-top:12px;'>";
	datahtml += "		<div style='width:80%;float:left;cursor:pointer;'>";
	datahtml += "			<div style='height:18px;font-size:14px;font-weight:400;line-height:20px;'>No stage found</div>";
	datahtml += "		</div>";
	datahtml += "	</div>";
	datahtml += "</div>";
	$("#"+tableid).append(datahtml);
}

function todolistDeleteFlowServiceAfter(response){
	ajaxindicatorstop();

	if((response.error+"") == "false" && response.object != null) {
		$("#div_flow_row_"+response.extrajsonparam.id).remove();
		$("#hr_row_flow_"+response.extrajsonparam.id).remove();
		var index = -1;
		for(var i=0;i<todolistflowobject.length;i++){
			if(todolistflowobject[i].id == response.extrajsonparam.id){
				index = i;
			}
		}
		todolistflowobject.splice(index, 1);
		if(response.extrajsonparam.id == selectedflowid){
			$(".highlightedgrouprow").removeClass("highlightedgrouprow");
		}
		if($(".flowsrow").length == 0){
			flownorecfoundrow();
			flowprocessnorecfoundrow("tblprocesslist");
		}
	}
}
//workflow template code ends

function todolistCheckFileStatusServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var status = (response.object[0]).split("-")[1];
		if(status == "D"){
			todoListShowconfirmmsg(todolistmessage.filetrash, confirm_Error, 5000, "", false, false);
		} else if(status == "H"){
			todoListShowconfirmmsg(todolistmessage.filearchive, confirm_Error, 5000, "", false, false);
		} else if(status == "A"){
			if(response.extrajsonparam.methodname != ""){
				window[response.extrajsonparam.methodname](response.extrajsonparam.docId);
			} else {
				var fileURL = cloudURLProtocol+cloudURLACTDomain+"/appnew/drive.html?a=view&b=file&c="+admcurrentfoldertype+"&d="+response.extrajsonparam.docId+"&e="+localStorage._zw;
				window.open(fileURL, "_blank");
			}
		}
	} else {
		todoListShowconfirmmsg(todolistmessage.filedeleted, confirm_Error, 5000, "", false, false);
	}
}