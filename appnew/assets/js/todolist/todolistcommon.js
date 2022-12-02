/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromTodoList(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
}

function todoListShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm){
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

function todoPageSize(){
	var msgHeight = $(window).height() - 60;
	$('#divforumleft').css("height", msgHeight+"px");
	$('#divforumright').css("height", msgHeight+"px");
	$(".page-wrapper").css("height", msgHeight+"px");
	$("#card-mb-2").css("height", (msgHeight-60)+"px");
	$(window).resize(function() {
		var msgrHeight = $(window).height();
		$('#divforumleft').css("height", msgHeight+"px");
		$('#divforumright').css("height", msgHeight+"px");
		$(".page-wrapper").css("height", msgHeight+"px");
		$("#card-mb-2").css("height", (msgHeight-60)+"px");
	});
}

function todoListCommon(){
	fetchLogo();
	todoPageSize();
	todoListCommonLoad();
	todoListCommonEvents();
}

function todoListCommonLoad(){
	checkPageCorpLogoChange();
	todolistOTPSettingsService();
	todolistSingleUserProfileService();
	todolistUserListService();
	fetchAllGroupsService();
	todolistFetchFlowService();

	if(localStorage._zp == "1"){
		$("#btngroup").show();
		$("#btnflow").show();
	} else {
		$("#btngroup").hide();
		$("#btnflow").hide();
	}
}

function todolistbuilduserList(response){
	var data = response.object;
	todolistFillInLoginIds(response);
	$('#txtpostusers').tagsinput({
			typeaheadjs:({
			hint: true,
			highlight: true,
			minLength: 1,
			freeInput:false
		},{
			name: 'adminemailarr',
			source: substringMatcher(alluserarr)
		})
	});
}

function todolistClearPostFields(){
	$("#divworkflowmodal").removeAttr("data-id");
	$("#txtgroups").tagsinput('removeAll');
	var eids = "";
	for(var i=0;i<allgrouparrList.length;i++){
		if(allgrouparrList[i]) {
			if(eids.length == 0){
				eids = alluserarrList[i];
			} else {
				eids = eids + "," + alluserarrList[i];
			}
			$('#txtgroups').tagsinput("add",alluserarrList[i]);
		}
	}
	if(eids.length > 0) $("#txtgroups").val(eids);
	$(".bootstrap-tagsinput").css("border", "0px");
	$(".bootstrap-tagsinput").css("box-shadow", "none");
	$("#txtevent").val("");
	$('#txtdescription').val('');
	$("#txtduedate").val('');
	$("#txtremindon").val('');
}

function todolistOpenModal(id){
	todolistClearPostFields();
	$("#btnworkflowsavefromexcel").show();
	$("#btnworkflowdownloadtemplate").show();

	if(id > 0){
		$("#btnworkflowsavefromexcel").hide();
		$("#btnworkflowdownloadtemplate").hide();
		$("#divworkflowmodal").attr("data-id", id);
		$("#txtevent").val($("#div_todolist_event_"+id).attr("title"));
		$('#txtdescription').val($("#div_todolist_desc_"+id).attr("title"));

		var arr = ($("#div_todolist_duedate_"+id).html()).split("/");
		$("#txtduedate").val(arr[2]+"-"+arr[0]+"-"+arr[1]);

		try{
			arr = ($("#div_todolist_remind_"+id).html()).split("/");
			$("#txtremindon").val(arr[2]+"-"+arr[0]+"-"+arr[1]);
		}catch(error){
		}
	}
	if(groupsdetails == null || groupsdetails.length == 0){
		todoListShowconfirmmsg(todolistmessage.creategroupaddusers, confirm_Info, 5000, "", false, false);
		hideActionPopup("divworkflowmodal");
		showActionPopup("groupmodal", false);
		groupopenfromtask = true;
	} else {
		showActionPopup("divworkflowmodal", false);
		$('#txtevent').focus();
	}
}

function todolistaddduedateglessthantoday(classname) {
    var hasduedatelessthantoday = false;
    $('.'+classname).each(function () {
        var inputsWithSameValue = $(this).val();
        hasduedatelessthantoday = $('.'+classname).not(this).filter(function () {
			var duedate = $(this).val();
			var duedt = new Date(duedate);
			duedt.setHours(23,59,59,0);
			var datenow = new Date();
			datenow.setHours(0,0,0,0);
            return duedate < datenow;
        });
        return hasduedatelessthantoday;
    });
    return hasduedatelessthantoday;
}

function todolistValidateAddService() {
	var event = $("#txtevent").val().trim();
	var desc = $("#txtdescription").val().trim();
	var datenow = new Date();
	datenow.setHours(0,0,0,0);

	if(event.length == 0 || event.length > 100){
		todoListShowconfirmmsg(todolistmessage.enterevent, confirm_Error, 5000, "", false, false);
	} else if(!stringcheckifnonascii(event)){
		todoListShowconfirmmsg(todolistmessage.nonasciifound+" in task name", confirm_Error, 5000, "", false, false);
	} else if(desc.length == 0){
		todoListShowconfirmmsg(todolistmessage.enterdesc, confirm_Error, 5000, "", false, false);
	} else if(!stringcheckifnonascii(desc)){
		todoListShowconfirmmsg(todolistmessage.nonasciifound+" in description", confirm_Error, 5000, "", false, false);
	} else {
		var jsonInput = {"action":"todolistAddServiceAfter", "description":desc, "eventDesc":event, "status":"A", "processMasterDtoList":[]};
		var i = $(".txt_adduser_loginid_new").length;
		if(i > 0){
			if(haveBlankTextboxValues("txt_adduser_loginid_new")){
				todoListShowconfirmmsg(todolistmessage.enterprocessname, confirm_Error, 5000, "", false, false);
			} else if(!haveTextOnlyAscii("txt_adduser_loginid_new")){
				todoListShowconfirmmsg(todolistmessage.nonasciifound+" in stage name.", confirm_Error, 5000, "", false, false);
			} else if(haveDuplicateTextboxValues("txt_adduser_loginid_new")){
				todoListShowconfirmmsg(todolistmessage.enteruniqueprocessname, confirm_Error, 5000, "", false, false);
			} else if(haveSelectDefaultvalue("sel_group_new")){
				todoListShowconfirmmsg(todolistmessage.selectgroup, confirm_Error, 5000, "", false, false);
			} else if(haveBlankTextboxValues("txtduedate_new")){
				todoListShowconfirmmsg(todolistmessage.enterduedate, confirm_Error, 5000, "", false, false);
			} else {
				var emptygroupname = todolistEmptyGroup("sel_group_new");
				if(emptygroupname.length > 0){
					todoListShowconfirmmsg(todolistmessage.addingemptygroup.replace("<GROUPNAME>", emptygroupname), confirm_Error, 5000, "", false, false);
				} else {
					var duedatelessthantoday = false;
					var prvduedatelessthantoday = false;
					var reminddateissue = false;
					var prvduedate = "";
					var collection = $(".txtduedate_new");
					collection.each(function() {
						var rowid = (this.id).replace("txtduedate_new_", "");
						var duedate = $("#txtduedate_new_"+rowid).val().trim();
						var remindon = $("#txtremindon_new_"+rowid).val().trim();
						var duedt = new Date(duedate);
						duedt.setHours(23,59,59,0);
						var reminddt = new Date(remindon);
						reminddt.setHours(23,59,59,0);
						if(duedt < datenow){
							duedatelessthantoday = true;
						} else if(prvduedate != "" && duedt < prvduedate){
							prvduedatelessthantoday = true;
						} else  if(remindon.trim().length > 0){
							if(reminddt > duedt || reminddt < datenow){
								reminddateissue = true;
							}
						}
						prvduedate = duedt;
					});

					if(duedatelessthantoday){
						todoListShowconfirmmsg(todolistmessage.enterduedate, confirm_Error, 5000, "", false, false);
					} else if(prvduedatelessthantoday){
						todoListShowconfirmmsg(todolistmessage.prventerduedate, confirm_Error, 5000, "", false, false);
					} else if(reminddateissue){
						todoListShowconfirmmsg(todolistmessage.enterdreminder, confirm_Error, 5000, "", false, false);
					} else {
						var i = 0;
						var collection = $(".add_process");
						collection.each(function() {
							var rowid = (this.id).replace("div_process_edit_new_", "");
							var val = $("#txt_adduser_loginid_new_"+rowid).val().trim();
							var selgrp = $("#sel_group_new_"+rowid).val();
							var duedate = $("#txtduedate_new_"+rowid).val();
							var remindon = $("#txtremindon_new_"+rowid).val();
							var status = "W";
							var dataid = $("#div_process_edit_new_"+rowid).attr("data-id");
							var flowid = $("#div_process_edit_new_"+rowid).attr("data-flow-id");
							if(i==0 && dataid==0) status = "R";
							var sm = {"id":dataid, "processName":val, "flowId":flowid, "groupId":selgrp, "level":(++i),
								"dueDate":FormatDateToServer(duedate), "status":status};
							if(remindon.length > 0){
								sm.remindOn = FormatDateToServer(remindon);
							}
							jsonInput.processMasterDtoList.push(sm);
						});
						todolistAddService(jsonInput);
					}
				}
			}
		} else {
			todoListShowconfirmmsg(todolistmessage.addprocess, confirm_Error, 5000, "", false, false);
		}
	}
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