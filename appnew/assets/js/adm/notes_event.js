function admNoteEvent(id){
	unbindobject("#"+id);
	$("#"+id).click(function(event){
		event.stopPropagation();
		var ibjid = this.id;
		if($(this).attr("data-status") == "D"){
			admShowconfirmmsg(adm_messages.admdocumentintrash, confirm_Error, 5000, "", false, false);
		} else {
			var index = (this.id).replace("adm_notes_", "");
			notesPopulate(index);
		}
		return false;
	});
}

function notesevents(){
	unbindobject("#btn_delete_notes");
	$("#btn_delete_notes").bind("click", function(event){
		var ibjid = this.id;
		var noteId = $("#lblnotecontent").attr("data-id");
		var docId = $("#lblnotecontent").attr("data-docid");
		admNotessDeleteByIdService(noteId, docId);
		return false;
	});

	unbindobject("#btn_edit_notes");
	$("#btn_edit_notes").bind("click", function(event){
		var noteId = $("#lblnotecontent").attr("data-id");
		var docId = $("#lblnotecontent").attr("data-docid");
		$("#txtnotecontent").show();
		$("#lblnotecontent").hide();
		$("#btn_delete_notes").hide();
		$("#btn_edit_notes").hide();
		$("#notescounter").show();
		$("#btn_save_notes").show();
		$("#btn_cancel_notes").show();
		$("#txtnotecontent").focus();
		return false;
	});
}

function admNoteTextEvent(){
	unbindobject("#txtnotecontent");
	$("#txtnotecontent").keyup(function(event) {
		textCounter("txtnotecontent","notescounter",1000);
	});

	unbindobject("#btn_save_notes");
	$("#btn_save_notes").bind("click", function(event){
		var docId = $("#lblnotecontent").attr("data-docid");
		var id = $("#lblnotecontent").attr("data-id");
		var content = $("#txtnotecontent").val();
		var note = content.replace(/<br\s*\/?>/gi,'');
		note = note.replace(/(?:\r\n|\r|\n)/g, '');
		if(note.trim().length > 0){
			content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
			if(id == 0){
				var jsonInput = {"docId":docId, "note":content, "action":"admNotesAddServiceAfter"};
				admNotesAddService(jsonInput);
			} else if(id > 0) {
				var jsonInput = {"id":id, "docId":docId, "note":content, "action":"admNotesAddServiceAfter"};
				admNotesEditService(jsonInput);
			}
		} else {
			admShowconfirmmsg(notes_messages.entercontent, confirm_Error, 5000, "", false, false);
		}
	});
}