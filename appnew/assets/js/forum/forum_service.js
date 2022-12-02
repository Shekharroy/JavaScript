function forumsearchfilter(action, threadId){
	var jsoninput = {
		"threadId":threadId,
		"subject":$("#txtsearch").val().replace(/  +/g, ' '),
		"tags":$("#txtsearch").val().replace(/  +/g, ' '),
		"action":action
	};
	return jsoninput;
}

function forumFetchUserListAdminService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+adminuserlistURL;
	posturl = posturl.replace("<ACTION>", "forumFetchUserListAdminServiceAfter");
	invokeAdapterCallFromForum(type, posturl, "", "", "");
}

function forumFetchUserListUserOnlyService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+adminuseronlylistURL;
	posturl = posturl.replace("<ACTION>", "forumFetchUserListUserOnlyServiceAfter");
	invokeAdapterCallFromForum(type, posturl, "", "", "");
}

function forumOTPSettingsService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/ots/0/fts/<OTPID>/<LAWFIRMID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "forumOTPSettingsServiceAfter");
	posturl = posturl.replace("<OTPID>", 0);
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	invokeAdapterCallFromForum(type, posturl, "", "", "");
}

function forumSaveOTPRecordService(){
	var carrier = "+"+$("#mmobilenumber").intlTelInput("getSelectedCountryData").dialCode+"-"+$("#mmobilenumber").val();
	var jsonInput = {"otpId":adminotpId,"userId":localStorage._zv,"status":"A","carrieIdentifier":carrier};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/uts/0/update/<ACTION>";
	posturl = posturl.replace("<ACTION>", "forumSaveOTPRecordServiceAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumPostNewService(jsoninput){
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumnewpostURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('saving data.. please wait..');
}

function forumfetchAllThreadsService(url, refreshrightside){
	forumPageSize();
	var type = createMethod;
	var posturl = cloudApiUrlACMS+url;
	var extraparamjson = {"refreshrightside":refreshrightside};
	invokeAdapterCallFromForum(type, posturl, "", forumsearchfilter("forumfetchAllThreadsServiceAfter", 0), extraparamjson);
	if(showbusyicon) ajaxindicatorstart('loading data.. please wait..');
}

function forumfetchSingleThread(threadId){
	var jsoninput = {
		"threadId":threadId,
		"action":"forumfetchAllThreadsServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumSingleThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	if(showbusyicon) ajaxindicatorstart('sending request.. please wait..');
}

function forumFetchLatestThreadsService(refreshrightside){
	forumfetchAllThreadsService(forumallpostURL, refreshrightside);
}

function forumFetchfetchSortByNoofRepliesService(refreshrightside){
	forumfetchAllThreadsService(forumSortByNoOfrepliesURL, refreshrightside);
}

function forumFetchZerorepliesService(refreshrightside){
	forumfetchAllThreadsService(forumZerorepliesURL, refreshrightside);
}

function forumFetchClosedService(refreshrightside){
	forumfetchAllThreadsService(forumClosedURL, refreshrightside);
}

function forumFetchActiveService(refreshrightside){
	forumfetchAllThreadsService(forumActiveURL, refreshrightside);
}

function forumFetchPublicService(refreshrightside){
	forumfetchAllThreadsService(forumPublicURL, refreshrightside);
}

function forumCloseThreadService(threadId, isSingle){
	var jsoninput = {
		"threadId":threadId,
		"subject":$("#div_thread_subject_"+threadId).html(),
		"post":$("#div_thread_post_"+threadId).html(),
		"action":"forumCloseThreadServiceAfter",
		"loginId":localStorage._zy
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumCloseThreadURL;
	var extraparamjson = {"isSingle":isSingle};
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, extraparamjson);
	ajaxindicatorstart('sending request.. please wait..');
}

function forumReopenThreadService(threadId, isSingle){
	var jsoninput = {
		"threadId":threadId,
		"subject":$("#div_thread_subject_"+threadId).html(),
		"post":$("#div_thread_post_"+threadId).html(),
		"action":"forumReopenThreadServiceAfter",
		"loginId":localStorage._zy
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumReopenThreadURL;
	var extraparamjson = {"isSingle":isSingle};
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, extraparamjson);
	ajaxindicatorstart('sending request.. please wait..');
}

function forumPublicThreadService(threadId, isPublic){
	var jsoninput = {
		"threadId":threadId,
		"isPublic":isPublic,
		"action":"forumPublicThreadServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumPublicThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('sending request.. please wait..');
}

function forumThreadByIdService(threadId){
	var jsoninput = {
		"threadId":threadId,
		"action":"forumThreadByIdServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumSingleThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	if(showbusyicon) ajaxindicatorstart('sending request.. please wait..');
}

function forumPostReplyService(jsoninput){
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumReplyThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('saving data.. please wait..');
}

function forumDeleteReplyService(threadid){
	var jsoninput = {
		"threadId":threadid,
		"action":"forumDeleteReplyServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumDeleteReplyThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('deleting reply.. please wait..');
}

function forumUpdateThreadTagsService(tags){
	var jsoninput = {
		"threadId":selectedThread,
		"tags":tags,
		"action":"forumUpdateThreadTagsServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumUpdateTagsThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('updating tags.. please wait..');
}

function forumAddThreadUserService(loginid){
	var jsoninput = {
		"threadId":selectedThread,
		"loginId":loginid,
		"action":"forumAddThreadUserServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumUserAddThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('Adding user.. please wait..');
}

function forumDeleteThreadUserService(loginid){
	var jsoninput = {
		"threadId":selectedThread,
		"loginId":loginid,
		"subject":$("#div_thread_subject_"+selectedThread).html(),
		"post":$("#div_thread_post_"+selectedThread).html(),
		"action":"forumDeleteThreadUserServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumUserDeleteThreadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	ajaxindicatorstart('Removing user.. please wait..');
}

function forumSingleUserProfileService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+forumSingleUserProfileURL;
	posturl = posturl.replace("<ACTION>", "forumSingleUserProfileServiceAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromForum(type, posturl, "", "", "");
}

function forumFetchStorageLeftService(openfile){
	var jsonInput = {"attribute1":"1"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/fetchstoragespace/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "forumFetchStorageLeftServiceAfter");
	var extraparamjson = {"openfile":openfile};
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, extraparamjson);
}

function forumSaveUserProfileService(jsonInput){
	ajaxindicatorstart('saving profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contactupdate/0/contactname/<ACTION>";
	posturl = posturl.replace("<ACTION>", "forumSaveUserProfileServiceAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumUpdateUserPicture(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/contactimgupd/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "forumUpdateUserPictureAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumAddUserPhone(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+forumSaveUserPhoneURL;
	posturl = posturl.replace("<ACTION>", "forumaddUserPhoneAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumUpdateUserPhone(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+forumSaveUserPhoneURL;
	posturl = posturl.replace("<ACTION>", "forumUpdateUserPhoneAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumAddUserFax(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+forumAddUserFaxURL;
	posturl = posturl.replace("<ACTION>", "forumAddUserFaxAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumUpdateUserFax(jsonInput){
	//ajaxindicatorstart('adding profile.. please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+forumSaveUserFaxURL;
	posturl = posturl.replace("<ACTION>", "forumUpdateUserFaxAfter");
	invokeAdapterCallFromForum(type, posturl, "", jsonInput, "");
}

function forumMarkThreadReadService(){
	var jsoninput = {
		"threadId":selectedThread,
		"action":"forumMarkThreadReadServiceAfter"
	};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumMarkThreadReadURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, "");
	$("#div_thread_subject_"+selectedThread).css("font-weight", "normal");
	$("#div_thread_post_"+selectedThread).css("font-weight", "normal");
}

function forumfetchActiveLoginIdsService(type){
	var jsoninput = {
		"attribute1":type,
		"attribute2":"forumfetchActiveLoginIdsServiceAfter"
	};
	var extraparamjson = {"type":type};
	var type = createMethod;
	var posturl = cloudApiUrlACMS+forumActiveLoginIdsURL;
	invokeAdapterCallFromForum(type, posturl, "", jsoninput, extraparamjson);
}