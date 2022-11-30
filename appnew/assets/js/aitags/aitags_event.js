function tagCommonEvent(){
	unbindobject("#add_auto_tags");
	$("#add_auto_tags").click(function(event) {
		var val = $("#txt_auto_tag_name").val().trim();
		var found = false;
		$(".metaname").each(function() {
			if($(this).html().toLowerCase()==val.toLowerCase()) found = true;

		});
		if(val.length==0){
			admShowconfirmmsg("Please enter tag content.", confirm_Error, 5000, "", false, false);
		} else if(val.length<3){
			admShowconfirmmsg("Please enter tag content minimum of 3 letters.", confirm_Error, 5000, "", false, false);
		} else if(found){
			admShowconfirmmsg("Tag entered exists.", confirm_Error, 5000, "", false, false);
		} else{
			var found = false;
			var collection = $("#metadata_viewerboxid").contents().find(".stl_01");
			collection.each(function() {
				var sm = $(this).html().replace( /(<([^>]+)>)/ig, '');
				sm = sm.replace("&nbsp;", "");
				//sm = sm.replace("\n", "");
				if(sm.toLowerCase().indexOf(val.toLowerCase()) >= 0){
					found = true;
				}
			});

			if(found){
				addAITagsService(val);
			} else {
				TagsCustomAddService(val);
			}
		}
	});

	unbindobject("#txt_auto_tag_name_search");
	$("#txt_auto_tag_name_search").bind("keyup", function(){
		var val = $(this).val().trim();
		if(val.length > 0){
			if($("#sel_tags").val() == 1) {
				var res = tagSearch(val, "name");
				fetchAITagsServiceAfter(res);
			} else if($("#sel_tags").val() == 2) {
				var res = tagSearch(val, "tag");
				TagsCustomFetchServiceAfter(res);
			}
		} else {
			var res = { "object": tagarr, "error": false};
			if($("#sel_tags").val() == 1) {
				fetchAITagsServiceAfter(res);
			} else if($("#sel_tags").val() == 2) {
				TagsCustomFetchServiceAfter(res);
			}
		}
	});

	unbindobject("#icon_refresh_tags");
	$("#icon_refresh_tags").click(function(event) {
		$("#txt_auto_tag_name_search").val("");
		tagResetHighlights();
		fetchTagsInfo();
	});

	unbindobject("#sel_tags");
	$("#sel_tags").on('change', function (e) {
		fetchTagsInfo();
	});

	unbindobject("#expand_arrow");
	$("#expand_arrow").click(function(event) {
		if($("#expand_arrow").hasClass("fa fa-window-maximize")){
			$(".gutter").hide();
			$(".cell, .a").css({"width":"106%"})
			$(".b").hide()
			$(".metadata_expand_errow").removeClass("fa fa-window-maximize");
			$(".metadata_expand_errow").addClass("fa fa-window-restore");
			$(".metadata_document_div").css("width", "100%");
			$("#metadata_viewerboxid").contents().find(".stl_02").css("font-size","1.8em");
			$("#metadata_viewerboxid").addClass("text-justify");
		} else if ($("#expand_arrow").hasClass("fa fa-window-restore")) {
			setTimeout((function () {
				window.location.reload();
				$(".metadata_expand_errow").removeClass("fa fa-window-restore");
				$(".metadata_expand_errow").addClass("fa fa-window-maximize");
				$(".metadata_document_div").css("width", "75%");
				$("#metadata_viewerboxid").contents().find(".stl_02").css("font-size", "1em");
				$("#metadata_viewerboxid").addClass("text-justify ");
			}), 5);
		}
	});
}

function tagMultipleEvent(id){
	unbindobject("#metadata_"+id);
	$("#metadata_"+id).click(function(event) {
		lastIndexArr = [];
		var stringtosearch = $(this).html().toLowerCase();
		tagResetHighlights();
		$(".metaname").css("color", "#009ce7");
		$(".metaname").css("font-weight", "normal");
		$(".metaname").removeClass("textbold");
		$(this).css("font-weight", "bold");
		$(this).css("color", "black");
		$("#metadata_"+id).addClass("textbold");
		

		var collection = $("#metadata_viewerboxid").contents().find(".stl_01");
		collection.each(function() {
			var sm = $(this).html().replace( /(<([^>]+)>)/ig, '');
			sm = sm.replace("&nbsp;", "");
			//sm = sm.replace("\n", "");
			if(sm.toLowerCase().indexOf(stringtosearch) >= 0){
				$(this).attr("id", "meta_value_"+lastIndexArr.length);
				lastIndexArr[lastIndexArr.length] = "meta_value_"+lastIndexArr.length;
				$(this).css("background", "#FFFF00");
				$(this).css("border", "3px solid #00000");
				$(this).addClass("idclass1");
			}
		});

		lastIndex = 0;
		tagsFocus();
		$('.resettingcounts').html(0);
		$('#occurence_'+id).html(lastIndex+1);
	});

	unbindobject("#icon_tags_prv_" + id);
	$("#icon_tags_prv_" + id).click(function (event) {
		if (!$("#metadata_" + id).hasClass("textbold")) {
			$("#metadata_" + id).click();
			lastIndex = 0;
		} else {
			lastIndex--;
			if (lastIndex < 0) {
				lastIndex = lastIndexArr.length - 1;
			}
		}
		$('#occurence_' + id).html(lastIndex + 1);
		tagsFocus();
	});
	
	unbindobject("#icon_tags_next_" + id);
	$("#icon_tags_next_" + id).click(function (event) {
		if (!$("#metadata_" + id).hasClass("textbold")) {
			$("#metadata_" + id).click();
			lastIndex = 0;
		} else {
			lastIndex++;
			if (lastIndex >= lastIndexArr.length) {
				lastIndex = 0;
			}
		}
		$('#occurence_' + id).html(lastIndex + 1);
		tagsFocus();
	});

	unbindobject("#icon_auto_tags_delete_"+id);
	$("#icon_auto_tags_delete_"+id).click(function(event) {
		var idm = (this.id).replace("icon_auto_tags_delete_", "");
		deleteAITagsService(idm);
	});
}

function tagCustomMultipleEvent(id){
	unbindobject("#icon_auto_tags_delete_"+id);
	$("#icon_auto_tags_delete_"+id).click(function(event) {
		var idm = (this.id).replace("icon_auto_tags_delete_", "");
		TagsCustomDeleteService(idm);
	});
}





