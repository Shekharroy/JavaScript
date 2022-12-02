function pollSingleUserProfileService(){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "pollSingleUserProfileServiceAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromPoll(type, posturl, "", "", "");
}

function pollSingleUserProfileServiceNew(isshow){
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";;
	posturl = posturl.replace("<ACTION>", "pollSingleUserProfileServiceNewAfter");
	posturl = posturl.replace("<LAWFIRMID>", localStorage._zw);
	posturl = posturl.replace("<USERID>", localStorage._zv);
	invokeAdapterCallFromPoll(type, posturl, "", "", "");
}

function pollFetchStorageLeftService(openfile){
	var jsonInput = {"attribute1":"1"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/fetchstoragespace/0/<ACTION>";
	posturl = posturl.replace("<ACTION>", "pollFetchStorageLeftServiceAfter");
	var extraparamjson = {"openfile":openfile};
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to add poll*/
function pollAddService(jsoninput){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/add/poll/metadata";
	invokeAdapterCallFromPoll(type, posturl, "", jsoninput, "");
}

/**method to fetch poll list*/
function pollFetchList(){
	ajaxindicatorstart('please wait..processing request...');
	$("#card-mb-2").empty();
	var jsoninput = {"action":"pollFetchListAfter","status":$("#selectpollsfilter").val(),
		"pollStartDateFrom":FormatDateToServer(startdatefrom),"pollStartDateTo":FormatDateToServer(startdateto),
		"pollEndDateFrom":FormatDateToServer(enddatefrom),"pollEndDateTo":FormatDateToServer(enddateto),"sortOrder":pollsortorder,"pollTitle":$("#txtsearch").val()};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/fetch/poll/list";
	invokeAdapterCallFromPoll(type, posturl, "", jsoninput, "");
}

/**method to fetch single poll*/
function pollSingleFetch(isPreview){
	ajaxindicatorstart('please wait..processing request...');
	var jsoninput = {"action":"pollSingleFetchAfter","pollId":highlightrowid};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/fetch/poll/single";
	var extraparamjson = {"isPreview":isPreview};
	invokeAdapterCallFromPoll(type, posturl, "", jsoninput, extraparamjson);
}

/**method to change poll status*/
function changePollStatusService(id, status){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/change/poll/status";
	var jsoninput = {"action":"changePollStatusServiceAfter","id":id,"status":status};
	var extraparamjson = {"id":id,"status":status};
	invokeAdapterCallFromPoll(type, posturl, "", jsoninput, extraparamjson);
}

/**method to change poll dates*/
function changePollDatesService(jsonInput){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/change/poll/dates";
	var extraparamjson = {"id":jsonInput.id};
	pollupdateleft = true;
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to delete poll*/
function deletePollService(id){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/delete/poll";
	var extraparamjson = {"id":id};
	var jsonInput = {"action":"deletePollServiceAfter","id":id};
	pollupdateleft = true;
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to poll allow vote change*/
function pollAllowVoteChangeService(id, allowVoteChange){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/allow/vote/change";
	var extraparamjson = {"id":id};
	var jsonInput = {"action":"pollAllowVoteChangeServiceAfter","id":id,"allowVoteChange":allowVoteChange};
	pollupdateleft = true;
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to change voter receipt email*/
function pollChangeVoterReceiptService(id, voterReceiptEmail){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/change/voter/receipt/email";
	var extraparamjson = {"id":id};
	var jsonInput = {"action":"pollChangeVoterReceiptServiceAfter","id":id,"voterReceiptEmail":voterReceiptEmail};
	pollupdateleft = true;
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to change voter receipt email notification*/
function pollChangeReceiptEmailNotificationService(id, voterReceiptEmailNotification){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/change/poll/receipt/email/notification";
	var extraparamjson = {"id":id};
	var jsonInput = {"action":"pollChangeReceiptEmailNotificationServiceAfter","id":id,"sendCreateEmail":voterReceiptEmailNotification};
	pollupdateleft = true;
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to poll weighed vote*/
function pollChangeWeighedVotesService(id, weightageVotes){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/change/weighed/vote/measure";
	var extraparamjson = {"id":id};
	var jsonInput = {"action":"pollChangeWeighedVotesServiceAfter","id":id,"weightageVotes":weightageVotes};
	pollupdateleft = true;
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/**method to clone the poll**/
function pollCloneService(jsonInput) {
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/clone/poll";
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/**method to export the poll**/
function pollExportService(exportPollFormat) {
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/export/poll";
	var jsonInput = {"action":"pollExportServiceAfter","pollId":highlightrowid,"exportPollFormat":exportPollFormat};
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/** method to fetch total voter count*/
function pollfetchTotalVoterCount(pollId,loginId){
	if(loginId == undefined || loginId == "undefined") loginId = "";
	var type = updateMethod;
	var extraparamjson = {"loginId":loginId};
	var posturl = cloudApiUrlACMS+pollbaseurl+"/fetch/poll/voter/count";
	var jsonInput = {"action":"pollfetchTotalVoterCountAfter","pollId":pollId,"loginId":loginId};
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/** method to fetch voter list */
function pollfetchVoterList(pollId, pageNo, loginId){
	if(loginId == undefined || loginId == "undefined") loginId = "";
	currentVoterPage = Number(pageNo)+1;
	ajaxindicatorstart('please wait..processing request...');
	$(".trpollvoter").remove();
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/fetch/poll/voter/list";
	var jsonInput = {"action":"pollfetchVoterListAfter","pollId":pollId,"startCount":pageNo*10, "loginId":loginId};
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/** method to add voter */
function pollAddVoterListService(jsonInput){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/add/poll/voter/list";
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/** method to delete voter List*/
function pollDeleteVoterService(){
	var jsonInput = pollDeleteVotersJSON();
	if(jsonInput!=""){
		ajaxindicatorstart('please wait..processing request...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS+pollbaseurl+"/delete/poll/voter";
		invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
	}
}

/** method to import voter List*/
function pollImportVoterService(){
	var ext = currentfile.name.substring(currentfile.name.lastIndexOf(".")+1);
	if(ext.toLowerCase() == "csv"){
		ajaxindicatorstart('please wait..importing voter list...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS+pollbaseurl+"/import/poll/voter/list/"+highlightrowid;

		var bs = getauthtokenfromlocal();
		const a = document.createElement('a');
		a.style = 'display: none';
		document.body.appendChild(a);

		var formData = new FormData();
		formData.append("file", currentfile, currentfile.name);

		var xhr = new XMLHttpRequest();
		xhr.open(type, posturl, true);
		xhr.responseType = "blob";
		xhr.setRequestHeader("Authorization",  "Bearer " + bs);
		xhr.onreadystatechange = function (){
			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					$("#btnvoterfilechoose").val("");
					ajaxindicatorstop();

					var filename = getFileNameFromDispositioon(xhr.getResponseHeader('Content-Disposition'));
					var dateObj = new Date();
					var month = dateObj.getUTCMonth() + 1; //months from 1-12
					var day = dateObj.getUTCDate();
					var year = dateObj.getUTCFullYear();
					var hour = dateObj.getHours();
					var minute = dateObj.getMinutes();
					filename = filename.replace(".xlsx", "")+"_"+localStorage._zw+"_"+localStorage._zv+"_"+year+"_"+month+"_"+day+"_"+hour+"_"+minute+"_.xlsx";

					var blob = xhr.response;
					if (navigator.msSaveBlob) {
					  return navigator.msSaveBlob(blob, filename);
					}

					const url = URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					a.click();
					URL.revokeObjectURL(url);
					pollShowconfirmmsg(pollmessage.success_pollvoterimported, confirm_Info, 5000, "", false, false);
					pollfetchTotalVoterCount(highlightrowid,"");
				} else {
					ajaxindicatorstop();
					todoListShowconfirmmsg(pollmessage.requestnotprocessed, confirm_Error, 5000, "", false, false);
					$("#btnvoterfilechoose").val("");
				}
			}
		};
		xhr.send(formData);
	} else {
		pollShowconfirmmsg("Please upload csv file format only.", confirm_Error, 5000, "", false, false);
	}
}

/** method to add agenda */
function pollAddAgendaService(agenda){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var jsonInput = {"action":"pollAddAgendaServiceAfter","pollId":highlightrowid,"agenda":agenda};
	var posturl = cloudApiUrlACMS+pollbaseurl+"/add/poll/agenda";
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/** method to fetch agenda list */
function pollFetchAgendaService(isPreview){
	ajaxindicatorstart('please wait..processing request...');
	$("#div_poll_agenda_list").empty();
	var type = updateMethod;
	var jsonInput = {"action":"pollFetchAgendaServiceAfter","pollId":highlightrowid};
	var posturl = cloudApiUrlACMS+pollbaseurl+"/fetch/agenda/list";
	var extraparamjson = {"isPreview":isPreview};
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, extraparamjson);
}

/** method to delete poll agenda */
function pollDeleteAgendaService(id){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var jsonInput = {"action":"pollDeleteAgendaServiceAfter","id":id,"pollId":highlightrowid};
	var posturl = cloudApiUrlACMS+pollbaseurl+"/delete/agenda";
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/**method to resend voter invite service **/
function pollResendVoterService(jsonInput){
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/resend/poll/invite";
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}

/**method to export voter list**/
function pollVoterExportService(exportPollFormat) {
	ajaxindicatorstart('please wait..processing request...');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+pollbaseurl+"/export/poll/voter/list";
	var jsonInput = {"action":"pollVoterExportServiceAfter","pollId":highlightrowid,"exportPollFormat":exportPollFormat};
	invokeAdapterCallFromPoll(type, posturl, "", jsonInput, "");
}












