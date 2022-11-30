/**
* method for all post new modal events
*/
function formPostModalEvents(){
	unbindobject("#btnopennewpostmodal");
	$("#btnopennewpostmodal").bind("click", function(event){
		forumClearPostFields();
		$("#divpostmodalheader").html("Post your query");
		showActionPopup("divpostmodal", false);
		$('#txtpostsubject').focus();
		$('.tt-input').focus();
	});

	unbindobject("#btnnewpostsave");
	$("#btnnewpostsave").bind("click", function(event){
		forumPostPrepare();
	});

	unbindobject("#btn_refresh");
	$("#btn_refresh").bind("click", function(event){
		fetchLogo();
		forumFilterSearch(false);
		highlightcurthread = true;
		forumThreadByIdService(selectedThread);
	});

	unbindobject("#btnnewreplysave");
	$("#btnnewreplysave").bind("click", function(event){
		forumReplyPrepare();
	});

	unbindobject("#profIm");
	$("#profIm").bind("click", function(event){
		ajaxindicatorstart('fetching profile.. please wait..');
		forumSingleUserProfileService(true);
		forumFetchStorageLeftService(false);
		showActionPopup("userprofilemodal");
	});

	unbindobject("#btn_admin_close_profile");
	$("#btn_admin_close_profile").bind("click",function(event){
		if(prvuserimg != ""){
			$("#muserimg").attr("src", prvuserimg);
			$("#userimg").attr("src", prvuserimg);
		}
	});

	unbindobject("#btn_save_profile");
	$("#btn_save_profile").bind("click",function(event){
		if($("#mfirstname").val().trim().length == 0){
			forumShowconfirmmsg("Please enter first name", confirm_Error, 5000, "", false, false);
			return false;
		} else if($("#mlastname").val().trim().length == 0){
			forumShowconfirmmsg("Please enter last name", confirm_Error, 5000, "", false, false);
			return false;
		}

		var jsonInput ="{";
		jsonInput += "\"firstName\":\""+$("#mfirstname").val()+"\"";
		jsonInput += ",\"lastName\":\""+$("#mlastname").val()+"\"";
		jsonInput += ",\"middleName\":\""+$("#mmiddlename").val()+"\"";
		jsonInput += ",\"companyName\":\""+$("#mcompany").val()+"\"";
		//jsonInput += ",\"website\":\""+website+"\"";
		jsonInput += ",\"id\":\""+contact_id+"\"";
		jsonInput += "}";
		forumSaveUserProfileService(JSON.parse(jsonInput));

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
			forumUpdateUserPhone(JSON.parse(jsonInput));
			if(adminotpId == 1 || adminotpId == 2) forumSaveOTPRecordService();
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
			forumAddUserPhone(JSON.parse(jsonInput));
			if(adminotpId == 1 || adminotpId == 2) forumSaveOTPRecordService();
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
			forumUpdateUserFax(JSON.parse(jsonInput));

		} else if(($("#mfaxnumber").val().trim()).length > 0 && fax_id == 0) {
			jsonInput = "{";
			jsonInput += "\"id\":\"0\"";
			jsonInput += ",\"contactId\":\""+contact_id+"\"";
			jsonInput += ",\"fax\":\""+$("#mfaxnumber").val()+"\"";
			jsonInput += ",\"primary\":\"1\"";
			jsonInput += ",\"status\":\"A\"";
			jsonInput += ",\"type\":\"1\"";
			jsonInput += "}";
			forumAddUserFax(JSON.parse(jsonInput));
		}

		if(userimgbase64 !=""){
			var jsonInput = "{\"id\":\"" + contact_id + "\"";
							jsonInput += ",\"picture\":\"" + userimgbase64 + "\"}";
			forumUpdateUserPicture(JSON.parse(jsonInput));
			prvuserimg = "";
		}
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
			$("#user-img").attr("src", userimgbase64);
		  }
		var maxSizeKB =100; //Size in KB
		var maxSize = maxSizeKB * 1024; //File size is returned in Bytes
		if (this.files[0].size > maxSize) {
			$(this).val("");
			forumShowconfirmmsg(forum_messages.profileimagesizeexceed, confirm_Error, 5000, "", false, false);
			return false;
		}
		reader.readAsDataURL(file);
    });

    $('body').on('blur', '.tt-input', function() {
		$(this).trigger(jQuery.Event('keypress', {which: 13}));
	});

	$("#txtpostusers").on('beforeItemAdd', function(event) {
		if(!alluserarr.includes(event.item)){
			forumShowconfirmmsg(forum_messages.notemailid, confirm_Error, 5000, "", false, false);
			event.cancel = true;
		}
	});

	$("#txtpostusers").on('beforeItemRemove', function(event) {
		var val = ($("#txtpostusers").val()).split(",");
		if(val.length == 1){
			forumShowconfirmmsg(forum_messages.oneemailidrequired, confirm_Error, 5000, "", false, false);
			event.cancel = true;
		}
	});
}

function formFetchThreadsEvents(){
	unbindobject("#img_search");
	$("#img_search").bind("click", function(event){
		forumFilterSearch(true);
	});

	$("#txtsearch").keyup(function(event){
		event.stopImmediatePropagation();
		if(event.keyCode === 13){
			forumFilterSearch(true);
		}
	});

	$("#seleforumfilter").change(function(event){
		forumFilterSearch(true);
	});
}

function forumParentThreadEvents(threadId){
	unbindobject("#div_thread_public_"+threadId);
	$("#div_thread_public_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadId = id.replace("div_thread_public_", "");
		var isPublic = $(this).attr("data-public");
		isPublic = (isPublic == 1 ? 0:1);
		forumPublicThreadService(threadId, isPublic);
	});

	unbindobject("#div_thread_close_"+threadId);
	$("#div_thread_close_"+threadId).bind("click", function(event){
		event.preventDefault();
		event.stopPropagation();
		var id = this.id;
		var threadId = id.replace("div_thread_close_", "");
		var status = $(this).attr("data-status");
		selectedThread = -1;
		if(status == 1) {
			forumCloseThreadService(threadId, false);
		} else if(status == 2) {
			forumReopenThreadService(threadId, false);
		}
	});

	unbindobject("#div_thread_subject_"+threadId);
	$("#div_thread_subject_"+threadId).bind("click", function(event){
		var id = this.id;
		$("#div_thread_"+selectedThread).removeClass("divboxshadow");
		selectedThread = id.replace("div_thread_subject_", "");
		$("#div_thread_"+selectedThread).addClass("divboxshadow");
		forumThreadByIdService(selectedThread);
		forumMarkThreadReadService();
	});

	unbindobject("#div_thread_"+threadId);
	$("#div_thread_"+threadId).bind("click", function(event){
		var id = this.id;
		$("#div_thread_"+selectedThread).removeClass("divboxshadow");
		selectedThread = id.replace("div_thread_", "");
		$("#div_thread_"+selectedThread).addClass("divboxshadow");
		forumThreadByIdService(selectedThread);
		forumMarkThreadReadService();
	});
}

function forumSingleParentThreadEvents(threadId){
	unbindobject("#div_single_thread_reply_each_"+threadId);
	$("#div_single_thread_reply_each_"+threadId).bind("click", function(event){
		selectedThread = $(this).attr("data-parentid");
		$("#txtreplycontent").val("");
		showActionPopup("divreplymodal", false);
		$('#txtreplycontent').focus();
	});

	unbindobject("#div_single_thread_close_"+threadId);
	$("#div_single_thread_close_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadId = id.replace("div_single_thread_close_", "");
		var status = $(this).attr("data-status");
		if(status == 1) {
			forumCloseThreadService(threadId, true);
		} else if(status == 2) {
			forumReopenThreadService(threadId, true);
		}
	});

	unbindobject("#div_single_thread_reply_"+threadId);
	$("#div_single_thread_reply_"+threadId).bind("click", function(event){
		var id = this.id;
		selectedThread = id.replace("div_single_thread_reply_", "");
		$("#txtreplycontent").val("");
		showActionPopup("divreplymodal", false);
		$('#txtreplycontent').focus();
	});

	unbindobject("#div_single_thread_replydelete_"+threadId);
	$("#div_single_thread_replydelete_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadid = id.replace("div_single_thread_replydelete_", "");
		forumDeleteReplyService(threadid);
	});

	$("#txt_single_thread_tags_"+threadId).on('itemAdded', function(event) {
		var id = this.id;
		id = id.replace("txt_single_thread_tags_", "");
		forumUpdateThreadTagsService($("#txt_single_thread_tags_"+id).val());
	});

	$("#txt_single_thread_tags_"+threadId).on('itemRemoved', function(event) {
		var id = this.id;
		id = id.replace("txt_single_thread_tags_", "");
		forumUpdateThreadTagsService($("#txt_single_thread_tags_"+id).val());
	});

	$("#txt_single_thread_user_"+threadId).on('beforeItemAdd', function(event) {
		if(!alluserarr.includes(event.item)){
			forumShowconfirmmsg(forum_messages.notemailid, confirm_Error, 5000, "", false, false);
			event.cancel = true;
		}
	});

	$("#txt_single_thread_user_"+threadId).on('beforeItemRemove', function(event) {
		var id = this.id;
		id = id.replace("txt_single_thread_user_", "");
		var val = ($("#txt_single_thread_user_"+id).val()).split(",");
		if(val.length == 1){
			forumShowconfirmmsg(forum_messages.oneemailidrequired, confirm_Error, 5000, "", false, false);
			event.cancel = true;
		}
	});

	$("#txt_single_thread_user_"+threadId).on('itemAdded', function(event) {
		var id = this.id;
		id = id.replace("txt_single_thread_user_", "");
		forumAddThreadUserService(event.item);
	});

	$("#txt_single_thread_user_"+threadId).on('itemRemoved', function(event) {
		var id = this.id;
		id = id.replace("txt_single_thread_user_", "");
		forumDeleteThreadUserService(event.item);
	});

	unbindobject("#viewmore_thread_"+threadId);
	$("#viewmore_thread_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadid = id.replace("viewmore_thread_", "");
		if($("#viewmore_thread_"+threadId).html() == "View More"){
			$("#viewmore_thread_"+threadId).html("View Less");
			$("#dots_thread_"+threadId).hide();
			$("#more_thread_"+threadId).show();
		} else {
			$("#viewmore_thread_"+threadId).html("View More");
			$("#dots_thread_"+threadId).show();
			$("#more_thread_"+threadId).hide();
		}
	});

	unbindobject("#link_user_tag_View_more_"+threadId);
	$("#link_user_tag_View_more_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadid = id.replace("link_user_tag_View_more_", "");
		if($("#link_user_tag_View_more_"+threadId).html() == "View More"){
			$("#link_user_tag_View_more_"+threadId).html("View Less");
			$('#txt_single_thread_user_'+threadId).tagsinput("changeHeight","100%");
		} else {
			$("#viewmore_thread_"+threadId).html("View Less");
			$("#link_user_tag_View_more_"+threadId).html("View More");
			$('#txt_single_thread_user_'+threadId).tagsinput("changeHeight","43px");
		}
	});

	unbindobject("#link_tag_View_more_"+threadId);
	$("#link_tag_View_more_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadid = id.replace("link_tag_View_more_", "");
		if($("#link_tag_View_more_"+threadId).html() == "View More"){
			$("#link_tag_View_more_"+threadId).html("View Less");
			$('#txt_single_thread_tags_'+threadId).tagsinput("changeHeight","100%");
		} else {
			$("#viewmore_thread_"+threadId).html("View Less");
			$("#link_tag_View_more_"+threadId).html("View More");
			$('#txt_single_thread_tags_'+threadId).tagsinput("changeHeight","43px");
		}
	});

	unbindobject("#div_single_thread_export_"+threadId);
	$("#div_single_thread_export_"+threadId).bind("click", function(event){
		var id = this.id;
		var threadid = id.replace("div_single_thread_export_", "");
		forumprintthread(threadid);
	});
}

function keyPressed(event){
	if (event.keyCode === 8) {
		return false;
	}
}

