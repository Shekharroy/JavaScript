function admNotesAddServiceAfter(response){
	if(response != null && response.error == false && response.object != null){
		hideActionPopup("divnotesmodal");
		$("#adm_notes_"+response.extrajsonparam.docId).html("View Note");
		$("#adm_notes_"+response.extrajsonparam.docId).removeClass("flagcommon");
		admShowconfirmmsg(notes_messages.noteadded, confirm_Success, 5000, "", false, false);
	} else {
		admShowconfirmmsg(notes_messages.requestcouldnotprocess, confirm_Error, 5000, "", false, false);
	}
}

function admNotessDeleteByIdServiceAfter(response){
	if(response != null && response.error == false && response.object != null){
		hideActionPopup("divnotesmodal");
		$("#adm_notes_"+response.extrajsonparam.docId).html("Add Note");
		$("#adm_notes_"+response.extrajsonparam.docId).addClass("flagcommon");
		admShowconfirmmsg(notes_messages.notedeleted, confirm_Success, 5000, "", false, false);
	} else {
		admShowconfirmmsg(notes_messages.requestcouldnotprocess, confirm_Error, 5000, "", false, false);
	}
}

function admNotessFetchByDocIdServiceAfter(response){
	var extraParam = response.extrajsonparam;
	var docId = extraParam.docId;

	if(response != null && response.error == false && response.object != null){
		var data = response.object[0];
		var note = linkify(data.note);

		$("#txtnotecontent").val(note.replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g, ''));
		$("#txtnotecontent").attr("data-id", data.id);
		$("#txtnotecontent").attr("data-docid", docId);
		$("#txtnotecontent").hide();

		$("#lblnotecontent").html(note.replace(/(?:\r\n|\r|\n)/g, '<br>'));
		$("#lblnotecontent").attr("data-id", data.id);
		$("#lblnotecontent").attr("data-docid", docId);
		$("#lblnotecontent").show();

		$("#btn_delete_notes").show();
		$("#notescounter").hide();
		$("#btn_save_notes").hide();
		$("#btn_edit_notes").show();
		$("#notescounter").val((1000-$("#txtnotecontent").val().length) + " characters left");
		notesevents();
	} else {
		$("#btn_delete_notes").hide();
		$("#notescounter").show();
		$("#btn_save_notes").show();
		$("#btn_edit_notes").hide();

		$("#txtnotecontent").val("");
		$("#txtnotecontent").attr("data-id", 0);
		$("#txtnotecontent").attr("data-docid", docId);
		$("#txtnotecontent").show();

		$("#lblnotecontent").html("");
		$("#lblnotecontent").attr("data-id", 0);
		$("#lblnotecontent").attr("data-docid", docId);
		$("#lblnotecontent").hide();

		$("#notescounter").val("1000 characters left");
	}
	admNoteTextEvent();
	showActionPopup("divnotesmodal");
}