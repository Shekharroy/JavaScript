function notesCommon(){
	admNoteTextEvent();
}

function textCounter(field1,field2,maxlimit){
	var countfield = document.getElementById(field2);
	var field = document.getElementById(field1);
	if ( field.value.length > maxlimit ) {
		field.value = field.value.substring( 0, maxlimit );
		return false;
	} else {
		countfield.value = (maxlimit - field.value.length) + " characters left";
	}
}

function notesPopulate(docId){
	$("#txtnotecontent").val("");
	admNotessFetchByDocIdService(docId);
}