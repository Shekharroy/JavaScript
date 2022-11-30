var docId = "";
var docType = "";
var docSize = "";
var folderId = "";
function fetchMetadata(){
	var urlk = window.location.href.split("?")[1].split("&");
    docId = urlk[0].replace("k=","");
    docType = urlk[1].replace("i=","");
    docSize = urlk[2].replace("s=","");
	folderId = urlk[3].replace("f=","");
    selectAllCheckbox();
    fetchMetadataService(docId,folderId);

	if(checkViewerExtention(docType, docSize)) {
		if(docSize < 314572800){
			$(".document_view_div").css("display", "block");
			var viewertype = localStorage.viewertype;
			var extension = gup("i");
			if(extension == "xlsx" || extension == "xls") viewertype = "NORMAL_VIEWER";
			admDisplayDocViewer(docId, "", viewertype, folderId);
		} else {
			$(".document_error_size_div").css("display", "block");
			$(".document_view_div").css("display", "none");
		}
	} else {
		$(".document_error_div").css("display", "block");
		$(".document_view_div").css("display", "none");
	}

	unbindobject("#expand_arrow");
	$("#expand_arrow").click(function(event) {
		if($("#expand_arrow").hasClass("fa fa-window-maximize")){
			$(".metadata_expand_errow").removeClass("fa fa-window-maximize");
			$(".metadata_expand_errow").addClass("fa fa-window-restore");
			$(".metadata_document_div").css("width", "100%");
		}else if($("#expand_arrow").hasClass("fa fa-window-restore")){
			$(".metadata_expand_errow").removeClass("fa fa-window-restore");
			$(".metadata_expand_errow").addClass("fa fa-window-maximize");
			$(".metadata_document_div").css("width", "61%");
		}
	});

	unbindobject("#metadata_key_list");

	$("#metadata_key_list").click(function (event) {

		document.getElementById("metadataKey").value = document.getElementById("metadata_key_list").value;

	});
	
	
}


function admMetadataEvent(id) {
	unbindobject("#admmetadata_" + id);
	$("#admmetadata_" + id).click(function (event) {
		var id = $(this).attr("data-id");
		var fSize = $(this).attr("data-size");
		var fType = $(this).attr("data-filetype");
		var folderId = $(this).attr("data-folderid");;
		var urlk = window.location.href.split("/");
		urlk[urlk.length-1] = "viewmetadata.html";
		var link = urlk[0];
		for(var i=1;i<urlk.length;i++){link=link+"/"+urlk[i]}
		link += "?k="+id+"&i="+fType+"&s="+fSize+"&f="+folderId;
		window.open(link);
	});
}

function addMetadataEvent(){
	unbindobject("#add_metadata");
	$("#add_metadata").click(function(event) {
		var urlk = window.location.href.split("?")[1].split("&");
		var docId = urlk[0].replace("k=","");
		var key =  document.getElementById("metadataKey").value;
		var value = "";
		if($('#metadata_date_checkbox').is(":checked")){
			value =  document.getElementById("metadataDate").value;
		}else{
			value =  document.getElementById("metadataValue").value;
		}

		if(key.length <= 30 && value.length <= 70 && key.length > 0 && value.length > 0){
			if(noOfmetadata < 30){
				if(metadataKeyArr.indexOf(key)>-1)
				admShowconfirmmsg("Metadata Key is already exist.", confirm_Error, 5000, "", false, false);	
				else addMetadataService(key,value,docId,folderId);
			}
			else admShowconfirmmsg("Metadata list is full.", confirm_Error, 5000, "", false, false);
		}else if(key.length > 30)
			admShowconfirmmsg("Metadata key is greater then specified length.", confirm_Error, 5000, "", false, false);
		else if(value.length > 70)
			admShowconfirmmsg("Metadata value is greater then specified length.", confirm_Error, 5000, "", false, false);
		else if(key.length <= 0)
			admShowconfirmmsg("Please enter metadata key.", confirm_Error, 5000, "", false, false);
		else if(value.length <= 0)
			admShowconfirmmsg("Please enter metadata value.", confirm_Error, 5000, "", false, false);
	});
}
function deleteMetadataEvent(id){
	unbindobject("#deleteMetadata_"+id);
	$("#deleteMetadata_"+id).click(function(event) {
		var mId = (this.id).replace("deleteMetadata_", "");
		deleteMetadataService(mId,folderId,docId);
	});
}
function deleteMultipleDoc(){
	unbindobject("#deleteMetadata_all");
	$("#deleteMetadata_all").click(function(event) {
		var collection = $(".metadata_chackbox");
		var docIds = "";
		collection.each(function() {
			if($(this).is(":checked")){
				var id = $(this).attr("id").replace("metadata_checkbox_","");
				if(docIds.length>0) docIds += ","+id;
				else docIds += id;
			}
		});
		deleteMetadataService(docIds,folderId,docId);
	});
}

function selectAllCheckbox(){
	unbindobject("#metadataAllcheckbox");
	$("#metadataAllcheckbox").click(function() {
		if($('#metadataAllcheckbox').is(":checked")){
			$('.metadata_chackbox').prop('checked', true);
		}
		else{
			$('.metadata_chackbox').prop('checked', false);
		}
	});
	unbindobject("#metadata_date_checkbox");
	$("#metadata_date_checkbox").click(function() {
		if($('#metadata_date_checkbox').is(":checked")){
			$('.date_class').css("display","block");
			$('.metadata_value_class').css("display","none");
		}else{
			$('.date_class').css("display","none");
			$('.metadata_value_class').css("display","block");
		}
	});
}

function exportMetadata(){
    unbindobject("#exportMetadata");
	$("#exportMetadata").click(function(event) {
		downloadMetadataTemplateService();
	});
}
function importMetadata(){
    unbindobject("#importMetadata");
	$("#importMetadata").click(function(event) {
		$("#btnImportMetadata").click();
	});

    $("#btnImportMetadata").on('change', function () {
		currentfile = this.files[0];
		metadataImportService(docId,noOfmetadata,folderId);
		return false;
	});
}

function setDatepicker(_this) {

	/* Get the parent class name so we
		can show date picker */
	let className = $(_this).parent().parent().parent().attr('class');

	// Remove space and add '.'
	let removeSpace = className.replace(' ', '.');

	// jQuery class selector
	$("." + removeSpace).datepicker({
	//$("#metadataValue").datepicker({
		format: "dd-mm-yyyy",

		// Positioning where the calendar is placed
		orientation: "bottom auto",
		// Calendar closes when cursor is
		// clicked outside the calendar
		autoclose: true,
		showOnFocus: "false"
	});
}

function gup(name){
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	return decodeURIComponent(name[1]);
}