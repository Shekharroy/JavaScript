function admNotesAddService(jsonInput){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotesAddURL;
	var extraparamjson = {"docId":jsonInput.docId};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admNotesEditService(jsonInput){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotesEditURL;
	var extraparamjson = {"docId":jsonInput.docId};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admNotessDeleteByIdService(noteId, docId){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotesDeleteByIdURL;
	var extraparamjson = {"docId":docId};
	var jsonInput = {"id":noteId, "action":"admNotessDeleteByIdServiceAfter"};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function admNotessFetchByDocIdService(docId){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admNotesFetchByDocIdURL;
	var extraparamjson = {"docId":docId};
	var jsonInput = {"docIdList":docId, "action":"admNotessFetchByDocIdServiceAfter"};
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}