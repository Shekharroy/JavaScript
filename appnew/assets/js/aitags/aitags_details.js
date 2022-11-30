function fetchAITagsServiceAfter(response) {
	ajaxindicatorstop();
	$("#auto_tags_list").empty();
	if(response.error == false && response.object != null){
		var data = tagsaisort(response.object, "ASC");
		if(response.overwrite == null || response.overwrite == undefined || response.overwrite != "1") tagarr = data;
		var j = 0;
		for(var i=0;i<data.length;i++){
			j = addTagRow(data[i], j, true);
		}
	} else {
		$("#auto_tags_list").html("No Tags Found");
	}
}

function addTagRow(data, j, aiTag) {
	var add = false;
	var count = 0;
	var name = "";

	if (aiTag && $("#txt_auto_tag_name_search").val() == "") {
		name = data.name;
		var collection = $("#metadata_viewerboxid").contents().find(".stl_01");
		collection.each(function () {
			var sm = $(this).html().replace(/(<([^>]+)>)/ig, '');
			sm = sm.replace("&nbsp;", "");
			//sm = sm.replace("\n", "");
			if (sm.toLowerCase().indexOf((data.name).toLowerCase()) >= 0) {
				add = true;
				count++;
				tagoccr[data.id] = count;
			}
		});
	}else{
		
		if($("#sel_tags").val() == 1){
			name = data.name;
		}else{
			name = data.tag;
		}
		
		add = true;
	}

	if (add) {
		var datahtml = "";
		if ((j++) > 0) datahtml += "<hr id='metadata_hr_row_" + data.id + "' class='filesonlyrow_hr metadatList' style='margin-top:0px;margin-bottom:0px;width:100%;float:left;border-top:1px solid #ccc;'>";
		datahtml += "<div class='row' id='div_metadata_row_" + data.id + "'>";
		datahtml += "	<div class='col-md-7'>";
		datahtml += "		<h2>";
		datahtml += "			<a href='javascript:void(0);' style='font-size:16px;font-weight:400;' class='noclick'>";
		datahtml += "				<span style='font-size:16px;word-break: break-word;' class='metaname' id='metadata_" + data.id + "'>" + name + "</span>";
		if(aiTag){
			datahtml += "				<span style='font-size:16px;word-break: break-word; color: #009ce7;'>(<span class='resettingcounts' id='occurence_" + data.id + "'>0</span> of " + tagoccr[data.id] + ")</span>";
		}
		datahtml += "			</a>";
		datahtml += "		</h2>";
		datahtml += "	</div>";
		datahtml += "	<div class='col-md-3'>";
		datahtml += "	<div class='row'>";
		if (aiTag) {
			datahtml += "	<div class='col-md-6 col-sm-6 pt-2'>";
			datahtml += "		<a id='icon_tags_prv_" + data.id + "' class='font-18 cursor-pointer all_delete_icon' title='Previous' style='color:#23bbf3;margin-top:13px;'>prev</a>";
			datahtml += "	</div>";
			datahtml += "	<div class='col-md-6 col-sm-6 pt-2'>";
			datahtml += "		<a id='icon_tags_next_" + data.id + "' class='font-18 cursor-pointer all_delete_icon' title='Next' style='color:#23bbf3;margin-top:13px;'>next</a>";
			datahtml += "	</div>";
		}
		datahtml += "	</div>";
		datahtml += "	</div>";
		datahtml += "	<div class='col-md-2'>";
		if (localStorage._zp == "1") {
			datahtml += "	<i id='icon_auto_tags_delete_" + data.id + "' class='fa fa-trash font-18 cursor-pointer' title='Delete' style='color:#23bbf3;margin-top:10px;'></i>";
		}
		datahtml += "	</div>";
		datahtml += "</div>";

		$("#auto_tags_list").append(datahtml);
		if (aiTag) {
			tagMultipleEvent(data.id);
		}else{
			tagCustomMultipleEvent(data.id);
		}
	}
	return j;
}


function addAITagsServiceAfter(response) {
	ajaxindicatorstop();
	$("#txt_auto_tag_name").val("");
	if (response.error == false && response.object != null) {
		if ($("#sel_tags").val() == 1) {
			var sm = response.object;
			var data = {
				"id": sm.id,
				"name": sm.name,
				"status": "A",
				"action": null
			}
			addTagRow(data, tagarr.length, true);
			tagarr.push(data);
		}
		admShowconfirmmsg(adm_messages.tagadded, confirm_Success, 5000, "", false, false);
	} else {
		if(response.messageCode == 432){
			admShowconfirmmsg(adm_messages.tagexists, confirm_Error, 5000, "", false, false);
		}else{
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
		
	}
}

function deleteAITagsServiceAfter(response) {
	ajaxindicatorstop();
	if(response.error == false && response.object != null){
		if ($("#sel_tags").val() == 1){
			$("#div_metadata_row_"+response.object).remove();
			$("#metadata_hr_row_"+response.object).remove();
		}
		admShowconfirmmsg(adm_messages.tagdeleted, confirm_Success, 5000, "", false, false);
	}else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function TagsCustomAddServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		if ($("#sel_tags").val() == 2){
			var sm = response.object;
			var data = {
				"id":sm.id,
				"fileId":sm.fileId,
				"status":"A",
				"tag":sm.tag,
				"tagId":sm.tagId,
				"userId":sm.userId
			}
			addTagRow(data, tagarr.length, false);
			tagarr.push(data);
		}
		admShowconfirmmsg(adm_messages.tagadded, confirm_Success, 5000, "", false, false);
	} else {
		ajaxindicatorstop();
		if(response.messageCode == 432){
			admShowconfirmmsg(adm_messages.tagexists, confirm_Error, 5000, "", false, false);
		}else{
			admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
		}
	}
}

function TagsCustomFetchServiceAfter(response){
	ajaxindicatorstop();
	$("#metadata_viewerboxid").contents().find(".idclass1").css("background", "none");
	$("#metadata_viewerboxid").contents().find(".idclass1").css("border", "0px");
	$("#metadata_viewerboxid").contents().find(".idclass1").removeAttr("id");
	$("#metadata_viewerboxid").contents().find(".idclass1").removeClass("idclass1");

	$("#auto_tags_list").empty();
	if(response.error == false && response.object != null){
		var data = tagscustomsort(response.object, "ASC");
		if(response.overwrite == null || response.overwrite == undefined || response.overwrite != "1") tagarr = data;
		var j = 0;
		for(var i=0;i<data.length;i++){
			j = addTagRow(data[i], j, false);
		}
	} else {
		$("#auto_tags_list").html("No Tags Found");
	}
}

function TagsCustomDeleteServiceAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		admShowconfirmmsg(adm_messages.tagdeleted, confirm_Success, 5000, "", false, false);
		if ($("#sel_tags").val() == 2){
			$("#div_metadata_row_"+response.extrajsonparam.id).remove();
			$("#metadata_hr_row_"+response.extrajsonparam.id).remove();
		}
	} else {
		admShowconfirmmsg(adm_messages.couldnotprocessrequest, confirm_Error, 5000, "", false, false);
	}
}

function tagsFetchWaterMarkTextServiceAfter(response) {
	watermarktext = "";
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		watermarktext = data.attribute1;
		if(data.attribute3 == 0){
			watermarkcolor = "blue";
		} else if(data.attribute3 == 1){
			watermarkcolor = "cyan";
		} else if(data.attribute3 == 2){
			watermarkcolor = "gray";
		} else if(data.attribute3 == 3){
			watermarkcolor = "green";
		} else if(data.attribute3 == 4){
			watermarkcolor = "magenta";
		} else if(data.attribute3 == 5){
			watermarkcolor = "orange";
		} else if(data.attribute3 == 6){
			watermarkcolor = "red";
		} else if(data.attribute3 == 7){
			watermarkcolor = "lightgray";
		} else if(data.attribute3 == 8){
			watermarkcolor = "yellow";
		}

		watermarkmulti = data.attribute4;
		
	}
	$("#iframviewbox").append("<iframe class='document_view_div' name='adm_viewerboxid' id='metadata_viewerboxid' src='"+urlparam+"' width='100%' height='100%' style='overflow:auto;border:0px;margin-left:-5px;height:93%;' onload='siteLoaded()'></iframe>");
}




















