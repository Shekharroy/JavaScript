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

function forumFetchUserListAdminServiceAfter(response){
	if((response.error+"") == "false" && response.object != null) {
		forumbuilduserList(response);
		forumFetchUserListUserOnlyService();
	}
}

function forumOTPSettingsServiceAfter(response){
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

function forumSaveOTPRecordServiceAfter(response){
	if(response.error == false){
		$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
		setTimeout(function(){
			$("#adm_user_security_carrier").intlTelInput("setNumber", "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+$("#mmobilenumber").val());
		},10);
	}
}

function forumFetchUserListUserOnlyServiceAfter(response){
	forumbuilduserList(response);
	//forumFetchLatestThreadsService(true);
	forumSingleUserProfileService();

	formPostModalEvents();
	formFetchThreadsEvents();

	if(notifList.length==0){
		forumAutoRefresh();
	}
}

function forumPostNewServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.newpost, confirm_Success, 5000, "", false, false);
		hideActionPopup("divpostmodal");
		forumFetchLatestThreadsService(true);
	} else {
		forumServiceErroMessage(response);
	}
}

function forumfetchAllThreadsServiceAfter(response){
	ajaxindicatorstop();
	showbusyicon = true;
	if(!singlethreadappend) $("#card-mb-2").html("");
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		for(var i=0;i<data.length;i++){
			var id = data[i].id;
			var post = data[i].post;
			var subject = data[i].subject;
			var isPublic = data[i].isPublic;
			var isPartOfThread = data[i].isPartOfThread;
			var status = data[i].status;
			var userReadStatus = data[i].userReadStatus;
			var closedByEmailId = data[i].closedByEmailId;
			var closedDate = getdatefromutcdata(handleNullValue(data[i].closedDate), true);

			var reopenedByEmailId = data[i].reopenedByEmailId;
			var reopenDate = getdatefromutcdata(handleNullValue(data[i].reopenDate), true);

			var createdByEmailId = data[i].createdByEmailId;
			var createdDate = getdatefromutcdata(handleNullValue(data[i].createdDate), true);

			var noofReplies = data[i].noofReplies;

			var subjectstr = subject;
			if(subjectstr.length > 50){
				subjectstr = subjectstr.substring(0, 50)+"...";
			}
			subjectstr = linkify( subjectstr );
			subjectstr = subjectstr.replace(/(?:\r\n|\r|\n)/g, '<br>');

			var poststr = post;
			if(poststr.length > 100){
				poststr = poststr.substring(0, 100)+"...";
			}
			poststr = linkify( poststr );
			poststr = poststr.replace(/(?:\r\n|\r|\n)/g, '<br>');

			var stylecolor = "";
			var styledivcolor = "";
			if(status == 2){
				stylecolor = "font-weight:normal;";
				styledivcolor = "background:#ccc !important;";
			} else if(userReadStatus == 1){
				stylecolor = "font-weight:bold;";
			} else if(userReadStatus == 2){
				stylecolor = "font-weight:normal;";
			}

			var userimg = "assets/img/user_image.png";

			if(window.location.href.indexOf("?a=") < 0 && i==0 && selectedThread != -1 && !highlightcurthread) selectedThread = id;

			var str = "";
			str = "<div class='card mb-2' id='div_thread_"+id+"' style='cursor:pointer;"+styledivcolor+"' data-createdby='"+createdByEmailId+"'>";
			str += "	<div class='card-body p-2 p-sm-3'>";
			str += "		<div class='media forum-item'>";
			str += "			<a href='#' id='div_thread_user_img_"+id+"'>";
			str += "				<img src='assets/img/user_image.png' class='mr-3 rounded-circle' width='50' height='50' alt='User' id='img_thread_user_"+id+"'>";
			str += "			</a>";
			str += "			<div class='media-body'>";
			str += "				<p class='text-secondary' id='div_thread_subject_"+id+"' title='"+subject+"' style='"+stylecolor+"'>"+subjectstr+"</p>";
			str += "				<p class='text-secondary' id='div_thread_post_"+id+"' title='"+post+"' style='"+stylecolor+"'>"+poststr+"</p>";
			str += "				<p class='text-muted'>";
			str += "					<span id='div_thread_noofreplies_"+id+"' style='margin-right:15px;color:#009ce7;'><i class='fa fa-comments-o ml-2'></i> "+noofReplies+"</span>";
			if(reopenedByEmailId.length > 0){
				str += 					"<span id='span_reopen_"+id+"'>reopened by <a href='javascript:void(0)'>"+reopenedByEmailId+"</a> on " + reopenDate + "</span>";
				if(alluserarrList[reopenedByEmailId] != undefined) userimg = alluserarrList[reopenedByEmailId];
			} else if(closedByEmailId.length > 0){
				str += 					"<span id='span_reopen_"+id+"'>closed by <a href='javascript:void(0)'>"+closedByEmailId+"</a> on " + closedDate + "</span>";
				if(alluserarrList[closedByEmailId] != undefined) userimg = alluserarrList[closedByEmailId];
			} else {
				str += 					"<span id='span_reopen_"+id+"'>posted by <a href='javascript:void(0)'>"+createdByEmailId+"</a> on " + createdDate + "</span>";
				if(alluserarrList[createdByEmailId] != undefined) userimg = alluserarrList[createdByEmailId];
			}
			str += "				</p>";
			str += "			</div>";
			str += "		</div>";
			str += "	</div>";
			str += "</div>";
			if(response.extrajsonparam.threadId != undefined && response.extrajsonparam.threadId != null && response.extrajsonparam.threadId > 0) {
				singlethreadappend = false;
			}
			if(singlethreadappend) {
				$("#card-mb-2").prepend(str);
			} else {
				$("#card-mb-2").append(str);
			}
			forumParentThreadEvents(id);
			$("#img_thread_user_"+id).attr("src",userimg);
		}

		cleanURLAtTop();
		if(singlethreadappend) {
			forumShowconfirmmsg(forum_messages.newpostnow, confirm_Success, 5000, "", false, false);
		}

		if(selectedThread != -1 && response.extrajsonparam.refreshrightside == true) {
			forumThreadByIdService(selectedThread);
			$("#div_thread_"+selectedThread).addClass("divboxshadow");
		}

		if(highlightcurthread && !singlethreadappend) {
			$("#div_thread_"+selectedThread).addClass("divboxshadow");
       	 	forumScrollInto("div_thread_"+selectedThread, "card-mb-2");
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
		$("#card-mb-2").html(str);
		mailreplyid = 0;
	}
	singlethreadappend = false;
	highlightcurthread = false;
	forumscroll = true;
	duePaymentService();
}

function forumCloseThreadServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.threadclosed, confirm_Success, 5000, "", false, false);
		if(response.extrajsonparam.isSingle) {
			forumThreadByIdService(selectedThread);
		} else {
			forumFetchLatestThreadsService(true);
		}
	} else {
		forumServiceErroMessage(response);
	}
}

function forumReopenThreadServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.threadreopened, confirm_Success, 5000, "", false, false);
		if(response.extrajsonparam.isSingle) {
			forumThreadByIdService(selectedThread);
		} else {
			forumFetchLatestThreadsService(true);
		}
	} else {
		forumServiceErroMessage(response);
	}
}

function forumPublicThreadServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.threadispublic, confirm_Success, 5000, "", false, false);
		forumFetchLatestThreadsService(true);
	} else {
		forumServiceErroMessage(response);
	}
}

function forumThreadByIdServiceAfter(response){
	showbusyicon = true;
	ajaxindicatorstop();
	$("#div_single_thread").html("");
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		var parentid = 0;
		var parentstatus = 0;
		var closedByEmailId = "";
		var closedDate = "";
		var reopenedByEmailId = "";
		var reopenDate = "";
		var noofReplies = 0;
		var userReadStatus = 0;
		var subjectstr = "";
		var subject = "";
		var isPartOfThread = 0;
		var mailidmatched = false;
		for(var i=0;i<data.length;i++){
			var id = data[i].id;
			var postchild = data[i].post;
			//var isPublic = data[i].isPublic;
			var status = data[i].status;

			var createdByEmailId = data[i].createdByEmailId;
			var createdDate = getdatefromutcdata(handleNullValue(data[i].createdDate), true);

			var postchildstr = linkify(postchild);
			var postchild = postchildstr;
			if(postchildstr.length > 230){
				postchild = postchild.substring(0, 230)+"<span id='dots_thread_"+id+"' class='thread_dots'>...</span>";
				postchild += "<span id='more_thread_"+id+"' style='display:none;' class='thread_post_full'>"+postchildstr.substring(231)+"</span>";
				postchild += "<a href='javascript:void(0)' id='viewmore_thread_"+id+"' style='padding-left:10px;' class='thread_view_more'>View More</a>";
			}
			postchild = postchild.replace(/(?:\r\n|\r|\n)/g, '<br>');

			var stylecolor = "";
			if(i==0) {
				subject = data[i].subject;
				subject = linkify(subject);
				subject = subject.replace(/(?:\r\n|\r|\n)/g, '<br>');
				stylecolor1 = "font-weight:400 !important;";
				stylecolor = "font-weight:"+$("#div_thread_subject_"+id).css("font-weight")+";color:"+$("#div_thread_subject_"+id).css("color")+" !important;";
				
				parentid = id;
				parentstatus = status;
				userReadStatus = data[i].userReadStatus;

				closedByEmailId = data[i].closedByEmailId;
				closedDate = getdatefromutcdata(handleNullValue(data[i].closedDate), true);

				reopenedByEmailId = data[i].reopenedByEmailId;
				reopenDate = getdatefromutcdata(handleNullValue(data[i].reopenDate), true);

				noofReplies = data[i].noofReplies;
				isPartOfThread = data[i].isPartOfThread;
			}
			
			var userimg = "assets/img/user_image.png";
			var str = "";
			str = "<div class='card mb-2' id='div_single_thread_"+id+"' data-parentid='"+parentid+"'>";
			str += "	<div class='card-body p-2 p-sm-3'>";
			str += "		<div class='media forum-item'>";
			str += "			<a href='#' id='div_single_thread_user_img_"+id+"'>";
			str += "				<img src='assets/img/user_image.png' class='mr-3 rounded-circle' width='50' height='50' alt='User' id='img_single_thread_user_"+id+"'>";
			str += "			</a>";
			str += "			<div class='media-body'>";
			if(i==0) {
				str += "			<h5><a href='#' class='text-body' id='div_single_thread_subject_"+id+"' style='"+stylecolor+"'>"+subject+"</a></h5>";
			}
			if(i==1) {
				str = "<div class='card mb-2' style='"+stylecolor1+"' id='div_single_thread_"+id+"' data-parentid='"+parentid+"'>";
				str += "	<div class='card-body p-2 p-sm-3'>";
			str += "		<div class='media forum-item'>";
			str += "			<a href='#' id='div_single_thread_user_img_"+id+"'>";
			str += "				<img src='assets/img/user_image.png' class='mr-3 rounded-circle' width='50' height='50' alt='User' id='img_single_thread_user_"+id+"'>";
			str += "			</a>";
			str += "			<div class='media-body'>";
			}
			str += 					"<p class='text-secondary' id='div_single_thread_post_"+id+"'>"+postchild+"</p>";
			if(i==0){
				str += "				<p class='text-secondary'>";
				str += "					<input type='text' id='txt_single_thread_user_"+id+"' data-id='"+parentid+"' placeholder='"+(localStorage._zp == 1 ? "Add email":"")+"' "+(localStorage._zp == 0 ? "disabled":"")+"  onkeydown='keyPressed(event)' data-eleid='"+"single_user_tag_"+id+"'>";
				str += "					<a href='javascript:void(0);' id='link_user_tag_View_more_"+id+"' style='display:none;'></a>";
				str += "				</p>";
				str += "				<p class='text-secondary'>";
				str += "					<input type='text' id='txt_single_thread_tags_"+id+"' data-id='"+parentid+"' placeholder='Tags' data-role='tagsinput' "+((localStorage._zp == 1 || localStorage._zy == createdByEmailId) ? "":"disabled")+"  onkeydown='keyPressed(event)' data-eleid='"+"single_tag_"+id+"'>";
				str += "					<a href='javascript:void(0);' id='link_tag_View_more_"+id+"' style='display:none;'></a>";
				str += "				</p>";
			}
			str += "				<p class='text-muted'>";
			if(reopenedByEmailId.length > 0 && i == 0){
				str += 					"<span id='span_reopen_single_"+id+"' data-status='"+data[0].status+"'>reopened by <a href='javascript:void(0)'>"+reopenedByEmailId+"</a> on " + reopenDate + "</span>";
				if(alluserarrList[reopenedByEmailId] != undefined) userimg = alluserarrList[reopenedByEmailId];
			} else if(closedByEmailId.length > 0 && i == 0){
				str += 					"<span id='span_reopen_single_"+id+"' data-status='"+data[0].status+"'>closed by <a href='javascript:void(0)'>"+closedByEmailId+"</a> on " + closedDate + "</span>";
				if(alluserarrList[closedByEmailId] != undefined) userimg = alluserarrList[closedByEmailId];
			} else {
				str += 					"<span id='span_reopen_single_"+id+"' data-status='"+data[0].status+"'>posted by <a href='javascript:void(0)'>"+createdByEmailId+"</a> on " + createdDate + "</span>";
				if(alluserarrList[createdByEmailId] != undefined) userimg = alluserarrList[createdByEmailId];
			}
			str += "				</p>";
			str += "				<p class='text-muted'>";
			if(i==0) str += "			<span style='color:#009ce7;'><i class='fa fa-comments-o ml-2'></i> "+noofReplies+"</span>";
			if(parentstatus == 1 && i > 0){
				str += 					"<a href='javascript:void(0)' style='margin-left:10px;' id='div_single_thread_reply_each_"+id+"' data-parentid='"+parentid+"' class='thread_reply'><i class='fa fa-reply' aria-hidden='true'></i>&nbsp;Reply</a>";
				str += 					"<a href='javascript:void(0)' style='margin-left:10px;' id='div_single_thread_replydelete_"+id+"' data-parentid='"+parentid+"' class='thread_reply_delete'>";
				if((isPartOfThread == 1 && localStorage._zp == 1) || createdByEmailId == localStorage._zy){
					str += 						"<i class='fa fa-trash' aria-hidden='true'></i>&nbsp;Delete";
				}
				str += 					"</a>";
			} else {
				str += 					"<a href='javascript:void(0)' style='margin-left:10px;cursor:pointer;' id='div_single_thread_close_"+id+"'  data-status='"+parentstatus+"'>";
				if(i == 0 && ((isPartOfThread == 1 && localStorage._zp == 1) || createdByEmailId == localStorage._zy)){
					if(status == 1) {
						str += 					"Close Thread";
					} else if(status == 2) {
						str += 					"Reopen Thread";
					}
				}
				str += "				</a>";
			}

			if(i==0 && parentstatus == 1){
				str += 					"<a href='javascript:void(0)' style='margin-left:10px;' id='div_single_thread_reply_"+parentid+"' data-parentid='"+parentid+"' class='thread_reply'><i class='fa fa-reply ml-2'></i>&nbsp;Reply</a>";
			}
			if(i==0){
				str += 					"<a href='javascript:void(0)' style='margin-left:10px;' id='div_single_thread_export_"+parentid+"' data-parentid='"+parentid+"'><i class='fa fa-file-export ml-2'></i>&nbsp;Export</a>";
			}
			str += "				</p>";

			str += "			</div>";
			str += "		</div>";
			str += "	</div>";
			str += "</div>";
			$("#div_single_thread").append(str);
			if(i==0){
				$("#div_single_thread").append("<div href='javascript:void(0);' class='mb-3 has-icon' style='font-weight:bold;text-align:center;width:100%;border-bottom:2px solid #000;'>Replies</div>");
				$('#txt_single_thread_user_'+parentid).tagsinput({
						typeaheadjs:({
						hint: true,
						highlight: true,
						minLength: 1
					},{
						name: 'adminemailarr',
						source: substringMatcher(alluserarr),
					})
				});

				var dtuser = data[i].discussionThreadCollaboratorDtoList;
				for(var j=0;j<dtuser.length;j++){
					if(dtuser[j].loginId != localStorage._zy) $('#txt_single_thread_user_'+parentid).tagsinput("add",dtuser[j].loginId);
				}

				var vm = ($('#txt_single_thread_user_'+parentid).val()).split(",");
				if(vm.length > 3){
					$('#txt_single_thread_user_'+parentid).tagsinput("changeHeight","43px");
					$('#link_user_tag_View_more_'+parentid).show();
					$('#link_user_tag_View_more_'+parentid).html("View More");
				}

				try{
					$('#txt_single_thread_tags_'+parentid).tagsinput("");
					if(data[i].discussionThreadTagsDto != null){
						var tags = data[i].discussionThreadTagsDto.tags;
						if(tags.length > 0){
							var tagsarr = tags.split(",");
							$('#txt_single_thread_tags_'+parentid).tagsinput("add",tagsarr[0]);
							for(var k=0;k<tagsarr.length;k++){
								$('#txt_single_thread_tags_'+parentid).tagsinput("add",tagsarr[k]);
							}
						}
					}
				}catch(error){console.log(error);}

				var vm = ($('#txt_single_thread_tags_'+parentid).val()).split(",");
				if(vm.length > 3){
					$('#txt_single_thread_tags_'+parentid).tagsinput("changeHeight","43px");
					$('#link_tag_View_more_'+parentid).show();
					$('#link_tag_View_more_'+parentid).html("View More");
				}

				$(".bootstrap-tagsinput").css("border", "0px");
				$(".bootstrap-tagsinput").css("box-shadow", "none");
				$(".bootstrap-tagsinput").css("border-bottom", "1px solid #ccc");
			}

			forumSingleParentThreadEvents(id);

			if(i==0){
				$("#span_reopen_"+id).html($("#span_reopen_single_"+id).html());
				var smstatus = $("#span_reopen_single_"+id).attr("data-status");
				if(smstatus == 1){
					$("#div_thread_"+id).css("background", "#fff");
				} else if(smstatus == 2){
					$("#div_thread_"+id).css("background", "#ccc");
				}
			}

			$("#img_single_thread_user_"+id).attr("src",userimg);

			if(mailreplyid == id) mailidmatched = true;
		}

		if(mailreplyid > 0){
			if(mailidmatched){
				$("#div_single_thread_"+mailreplyid).addClass("divboxshadow");
				forumScrollInto("div_single_thread_"+mailreplyid, "divforumright");
				forumScrollInto("div_thread_"+selectedThread, "card-mb-2");
			} else {
				forumShowconfirmmsg(forum_messages.replydeleted, confirm_Error, 5000, "", false, false);
			}
			mailreplyid = 0;
		}
		$("#div_thread_noofreplies_"+parentid).html("<i class='fa fa-comments-o ml-2'></i> "+(data.length-1));
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
		mailreplyid = 0;
	}
}

function forumPostReplyServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.replydone, confirm_Success, 5000, "", false, false);
		hideActionPopup("divreplymodal");
		forumUpdateNoOfReplyUI(true);
	} else {
		forumServiceErroMessage(response);
	}
}

function forumDeleteReplyServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.deletereplydone, confirm_Success, 5000, "", false, false);
		forumUpdateNoOfReplyUI(false);
	} else {
		forumServiceErroMessage(response);
	}
}

function autoRefreshTimer(){

}

function forumUpdateThreadTagsServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.tagupdated, confirm_Success, 5000, "", false, false);
	} else {
		forumServiceErroMessage(response);
	}
}

function forumAddThreadUserServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.useradded, confirm_Success, 5000, "", false, false);
	} else {
		forumServiceErroMessage(response);
	}
}

function forumDeleteThreadUserServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		forumShowconfirmmsg(forum_messages.userremoved, confirm_Success, 5000, "", false, false);
	} else {
		forumServiceErroMessage(response);
	}
}

function forumSingleUserProfileServiceAfter(response){
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

		/*if(name1.length > 20){
			name1 = name1.substring(0, 19);
		}*/
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
		//String website = Common.checkNull(obj.getString("website"), "");
		$("#mcompany").val(replacenullval(localStorage._zo));
		var imagePath = replacenullval(data.contactDto.picture);
		contact_id = data.contactDto.id;
		var mobileNumber = "";
		try {
			var arr = data.contactDto.contactPhoneList;
			if (arr != null && arr[0] != null && arr[0] != undefined) {
				//for (var i = 0; i < arr.length(); i++) {
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
							//break;
						}
					}
				//}
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
}

function forumFetchStorageLeftServiceAfter(response){
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

function forumSaveUserProfileServiceAfter(response){
	ajaxindicatorstop();
	var firstname = $("#mfirstname").val();
	var lastname = $("#mlastname").val();
	var middlename = $("#mmiddlename").val();
	var name = firstname;
	var name1 = firstname + " " + lastname
	if(middlename.length > 0){
		name = name + " " + middlename;
	}
	if(lastname.length > 0){
		name = name + " " + lastname;
	}

	/*if(name1.length > 20){
		name1 = name1.substring(0, 19);
	}*/
	$("#username").html(trimOverFlowCharacters(capitalizefirstletterfromallword(checkscreenwidthdesc(name1))));
	$("#username").attr("title", capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
	$("#musername").html(capitalizefirstletterfromallword(checkscreenwidthdesc(name1)));
	forumShowconfirmmsg("Profile saved successfully.", confirm_Success, 5000, "", false, false);
}

function forumUpdateUserPictureAfter(response){
	$("#muserimg").attr("src", userimgbase64);
	$("#userimg").attr("src", userimgbase64);
}

function forumfetchActiveLoginIdsServiceAfter(response){
	if(response.error == false && response.messageCode == 201 && response.object != null){
		var add = false;
		if(response.extrajsonparam.type == "1") {
			if(JSON.stringify(adminemailarr) != JSON.stringify(response.object)) {
				add = true;
				adminemailarr = response.object;
				forumadminchanged = true;
			} else {
				forumadminchanged = false;
			}
			forumfetchActiveLoginIdsService(2);
		} else if(response.extrajsonparam.type == "2") {
			if(JSON.stringify(useremailarr) != JSON.stringify(response.object) || forumadminchanged){
				useremailarr = response.object;
				if(localStorage._zp == "1"){
					alluserarr = adminemailarr.concat(useremailarr);
					alluserarr = alluserarr.filter((item,index)=>{
					   return (alluserarr.indexOf(item) == index)
					});
				} else {
					alluserarr = adminemailarr;
				}
				alluserarr.sort();
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

				$('#txt_single_thread_user_'+selectedThread).tagsinput({
						typeaheadjs:({
						hint: true,
						highlight: true,
						minLength: 1
					},{
						name: 'adminemailarr',
						source: substringMatcher(alluserarr),
					})
				});

				$(".bootstrap-tagsinput").css("border", "0px");
				$(".bootstrap-tagsinput").css("box-shadow", "none");
				$(".bootstrap-tagsinput").css("border-bottom", "1px solid #ccc");
			}
			forumuserfetchdone = true;
		}
	}
}






