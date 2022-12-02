/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromForum(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
}

function forumShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm){
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

function forumCommonEvents(){
	fetchLogo();
	forumPageSize();
	forumgetURL();
	duePaymentService();
}

function forumClearPostFields(){
	$("#txtpostusers").tagsinput('removeAll');
	var eids = "";
	for(var i=0;i<adminemailarr.length;i++){
		if(adminemailarr[i] != localStorage._zy) {
			if(eids.length == 0){
				eids = adminemailarr[i];
			} else {
				eids = eids + "," + adminemailarr[i];
			}
			$('#txtpostusers').tagsinput("add",adminemailarr[i]);
		}
	}
	$("#txtpostusers").val(eids);
	$(".bootstrap-tagsinput").css("border", "0px");
	$(".bootstrap-tagsinput").css("box-shadow", "none");
	$("#txtpostsubject").val("");
	$('#txtcontent').val('');
	$("#txtpostsubject").val("");
	$("#txtposttags").val("");
	$("#txtposttags").tagsinput('removeAll');
}

function forumPostValidate() {
	var content = $('#txtcontent').val();
	var subject = $("#txtpostsubject").val();
	var tags = $("#txtposttags").val();
	var emailids = $("#txtpostusers").val();
	var ret = true;

	if(emailids.length == 0){
		forumShowconfirmmsg(forum_messages.enteroneemailid, confirm_Error, 5000, "", false, false);
		ret = false;
	} else if(subject.length == 0) {
		forumShowconfirmmsg(forum_messages.entersubject, confirm_Error, 5000, "", false, false);
		ret = false;
	} else if(content.length == 0) {
		forumShowconfirmmsg(forum_messages.entercontent, confirm_Error, 5000, "", false, false);
		ret = false;
	}
	return ret;
}

function forumPostPrepare(){
	if(forumPostValidate()){
		var content = $('#txtcontent').val();
		var subject = $("#txtpostsubject").val();
		var tags = $("#txtposttags").val();
		var emailids = $("#txtpostusers").val().split(",");

		var discussionThreadCollaboratorDtoList = [{"loginId":localStorage._zy, "status":1}];
		for(var i=0;i<emailids.length;i++){
			discussionThreadCollaboratorDtoList.push({"loginId":emailids[i], "status":1});
		}
		var discussionThreadTagsDto = {"tags":tags};
		content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');

		var sm = {
			"subject":subject,
			"post":content,
			"status":1,
			"createdByEmailId":localStorage._zy,
			"discussionThreadCollaboratorDtoList":discussionThreadCollaboratorDtoList,
			"discussionThreadTagsDto":discussionThreadTagsDto,
			"action":"forumPostNewServiceAfter",
		};

		forumPostNewService(sm);
	}
}

function forumReplyPrepare(){
	if($("#txtreplycontent").val().trim().length == 0){
		forumShowconfirmmsg(forum_messages.enterreplycontent, confirm_Error, 5000, "", false, false);
	} else {
		var content = $("#txtreplycontent").val().trim();
		content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
		var sm = {
			"parentThreadId":selectedThread,
			"subject":$("#div_thread_subject_"+selectedThread).html(),
			"post":content,
			"status":1,
			"createdByEmailId":localStorage._zy,
			"action":"forumPostReplyServiceAfter"
		};

		forumPostReplyService(sm);
	}
}

function forumUpdateNoOfReplyUI(isadd){
	forumThreadByIdService(selectedThread);
	var nm = $("#div_thread_noofreplies_"+selectedThread).html();
	nm = nm.substring(nm.lastIndexOf(">")+1);
	var count = (isadd ? parseFloat(nm)+1:parseFloat(nm)-1);
	$("#div_thread_noofreplies_"+selectedThread).html("<i class='fa fa-comments-o ml-2'></i> "+count);
}

function forumgetURL(){
	var ret = false;
	var url = window.location.href;
	if(url.indexOf("?a=") > 0){
		var id = url.substring(url.lastIndexOf("?")+1);
		var idarr = id.split("&");
		selectedThread = -1;
		if(idarr.length > 1){
			var tempcorpid = idarr[1].replace("b=", "");
			if(tempcorpid == localStorage._zw){
				highlightcurthread = true;
				selectedThread = idarr[0].replace("a=", "");

				notifList = localStorage._ns;

				if(idarr.length > 3) mailreplyid = idarr[3].replace("d=", "");
				forumCommonLoad();
			}
		}

		if(selectedThread == -1){
			forumShowconfirmmsg(forum_messages.corpmismatch, confirm_Error, 5000, "", false, false);
			setTimeout(function(){
				window.location.href = "error.html";
			}, 3000);
		}
	} else {
		forumCommonLoad();
	}
	return ret;
}

function forumCommonLoad(){
	forumFetchUserListAdminService();
	checkPageCorpLogoChange();
	forumOTPSettingsService();
	forumFetchLatestThreadsService(true);
}

function forumServiceErroMessage(response){
	if(response.message == "NOPERMISSION"){
		forumShowconfirmmsg(forum_messages.nopermission, confirm_Error, 5000, "", false, false);
	} else {
		forumShowconfirmmsg(forum_messages.requestfailure, confirm_Error, 5000, "", false, false);
	}
}

function forumFillInLoginIds(response){
	var data = response.object;
	for(var i=0;i<data.length;i++){
		if(data[i].userStatus == "A"){
			if(data[i].userTypeId == "ADMIN"){
				adminemailarr[adminemailarr.length] = data[i].loginId;
			} else if(data[i].userTypeId == "USER"){
				useremailarr[useremailarr.length] = data[i].loginId;
			}
			if(localStorage._zp == 1){
				alluserarr[alluserarr.length] = data[i].loginId;
			} else {
				if(data[i].userTypeId == "ADMIN"){
					alluserarr[alluserarr.length] = data[i].loginId;
				}
			}
			if(data[i].picture != "") alluserarrList[data[i].loginId] = "/api.acms/"+(data[i].picture).replace("/images", "");
		}
	}
	alluserarr.sort();
}

function forumbuilduserList(response){
	var data = response.object;
	forumFillInLoginIds(response);
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

function forumFilterSearch(refreshrightside){
	if($("#seleforumfilter").val() == 0){
		forumFetchLatestThreadsService(refreshrightside);
	} else if($("#seleforumfilter").val() == 1){
		forumFetchClosedService(refreshrightside);
	} else if($("#seleforumfilter").val() == 2){
		forumFetchActiveService(refreshrightside);
	} else if($("#seleforumfilter").val() == 3){
		forumFetchPublicService(refreshrightside);
	} else if($("#seleforumfilter").val() == 4){
		forumFetchZerorepliesService(refreshrightside);
	} else if($("#seleforumfilter").val() == 5){
		forumFetchfetchSortByNoofRepliesService(refreshrightside);
	}
}

function forumprintthread(threadId){
	var vm = ($('#txt_single_thread_user_'+threadId).val()).split(",");
	if(vm.length > 3){
		$('#txt_single_thread_user_'+threadId).tagsinput("changeHeight","100%");
		$('#link_user_tag_View_more_'+threadId).hide();
	}

	var vm = ($('#txt_single_thread_tags_'+threadId).val()).split(",");
	if(vm.length > 3){
		$('#txt_single_thread_tags_'+threadId).tagsinput("changeHeight","100%");
		$('#link_tag_View_more_'+threadId).hide();
	}

	$(".thread_dots").hide();
	$(".thread_post_full").show();
	$(".thread_view_more").hide();
	$("#div_single_thread_close_"+threadId).hide();
	$(".thread_reply").hide();
	$("#div_single_thread_export_"+threadId).hide();
	$(".thread_reply_delete").hide();

	var printContents = document.getElementById("div_single_thread").innerHTML;
	$("#divmainprint").html(printContents);
	$("#divmain").hide();
	$("#divmainprint").show();

	setTimeout(function(){
		var beforePrint = function() {
			console.log('Functionality to run before printing.');
		};

		var afterPrint = function() {
			console.log('Functionality to run after printing');
			$(window).off('mousemove', window.onafterprint);
			console.log('Print Dialog Closed..');
			$("#divmainprint").hide();
			$("#divmain").show();
			$("#divmainprint").html("");
			var vm = ($('#txt_single_thread_user_'+threadId).val()).split(",");
			if(vm.length > 3){
				$('#txt_single_thread_user_'+threadId).tagsinput("changeHeight","43px");
				$('#link_user_tag_View_more_'+threadId).show();
			}

			var vm = ($('#txt_single_thread_tags_'+threadId).val()).split(",");
			if(vm.length > 3){
				$('#txt_single_thread_tags_'+threadId).tagsinput("changeHeight","43px");
				$('#link_tag_View_more_'+threadId).show();
			}

			$(".thread_dots").show();
			$(".thread_post_full").hide();
			$(".thread_view_more").show();
			$("#div_single_thread_close_"+threadId).show();
			$(".thread_reply").show();
			$("#div_single_thread_export_"+threadId).show();
			$(".thread_reply_delete").show();
		};

		if (window.matchMedia) {
			var mediaQueryList = window.matchMedia('print');
			mediaQueryList.addListener(function(mql) {
				if (mql.matches) {
					beforePrint();
				} else {
					afterPrint();
				}
			});
		}

		window.onbeforeprint = beforePrint;
    	window.onafterprint = afterPrint;
    	window.print();

	}, 1000);
}

function forumScrollInto(id, targetdivid){
	if(forumscroll){
		var pos = $("#"+id).offset().top-150;
		$("#"+targetdivid).animate({
			scrollTop: pos
		}, 2000);
	}
}

function forumPageSize(){
	var msgHeight = $(window).height() - 60;
	$('#divforumleft').css("height", msgHeight+"px");
	$('#divforumright').css("height", msgHeight+"px");
	$(".page-wrapper").css("height", msgHeight+"px");
	$("#card-mb-2").css("height", (msgHeight-40)+"px");
	$(window).resize(function() {
		var msgrHeight = $(window).height() - 10;
		$('#divforumleft').css("height", msgHeight+"px");
		$('#divforumright').css("height", msgHeight+"px");
		$(".page-wrapper").css("height", msgHeight+"px");
		$("#card-mb-2").css("height", (msgHeight-40)+"px");
	});
}

function storeNotification(data){

}

function forumAutoRefresh(){
	autorefreshtimer = setInterval(function(){
		try{
			var runnotif = false;
			var curnoitfstorage = localStorage._ns;
			if(notifList != curnoitfstorage){
				if(notifList.length > 0) singlethreadappend = true;
				notifList = curnoitfstorage;
				var json = JSON.parse(valdec(notifList));
				var data = json.slice(json.length-1);
				var arr = (data[0].name).split("#");
				showbusyicon = false;
				highlightcurthread = true;
				if(!forumfirstload) {
					forumscroll = false;
					if(arr[1] != "0"){
						singlethreadappend = false;
						if(selectedThread == arr[0]){
							forumFilterSearch(true);
						} else {
							forumFilterSearch(false);
						}
					} else {
						forumfetchSingleThread(arr[0]);
					}
				} else {
					forumfirstload = false;
				}
			}
		}catch(error){
			console.log("notif error : " + error);
		}
	}, 5000);

	setInterval(function(){
		if(forumuserfetchdone) {
			forumuserfetchdone = false;
			forumfetchActiveLoginIdsService(1);
		}
	}, 1000);
}



