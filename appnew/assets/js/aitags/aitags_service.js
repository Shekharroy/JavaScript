function fetchAITagsService(){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var jsonInput = {"action":"fetchAITagsServiceAfter"};
	var posturl = cloudApiUrlACMS+"/v1/app/autotags/4/action/list";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function addAITagsService(name){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var jsonInput = {"action":"addAITagsServiceAfter", "name":name};
	var posturl = cloudApiUrlACMS+"/v1/app/autotags/4/action/add";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function deleteAITagsService(id){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var jsonInput = {"attribute1":"deleteAITagsServiceAfter", "attribute2":id};
	var posturl = cloudApiUrlACMS+"/v1/app/autotags/4/action/delete";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function TagsCustomAddService(tag){
	ajaxindicatorstart('processing request.. please wait..');
	var jsonInput = {
		fileId:docId,
		userId:localStorage._zv,
		tag:tag,
		status:"A"
	};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admAddTagsURL;
	posturl = posturl.replace("<ACTION>", "TagsCustomAddServiceAfter");
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,"");
}

function TagsCustomFetchService(){
	ajaxindicatorstart('processing request.. please wait..');
	var type = fetchMethod;
	var posturl = cloudApiUrlACMS+admFetchTagsURL;
	posturl = posturl.replace("<DOCID>", docId);
	posturl = posturl.replace("<ACTION>", "TagsCustomFetchServiceAfter");
	invokeAdapterCallFromAdm(type,posturl,"","","");
}

function TagsCustomDeleteService(id){
	ajaxindicatorstart('processing request.. please wait..');
	var type = updateMethod;
	var extraparamjson = {"id":id};
	var posturl = cloudApiUrlACMS+admDeleteTagsURL;
	posturl = posturl.replace("<TAGID>", id);
	posturl = posturl.replace("<ACTION>", "TagsCustomDeleteServiceAfter");
	invokeAdapterCallFromAdm(type,posturl,"","",extraparamjson);
}

function tagsFetchWaterMarkTextService(){
	var jsonInput = {"attribute1":"tagsFetchWaterMarkTextServiceAfter"};
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/app/unindexdocviewer/0/fetch/watermark/text";
	invokeAdapterCallFromAdm(type,posturl,"",jsonInput,"");
}