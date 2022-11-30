var noOfmetadata = 0;
var metadataKeyArr = [];
var metadataUser = true;

function fetchMetadataKeyServiceAfter(response){
	if(response.error == false && response.object != null){
		for(var i=0;i<response.object.length;i++){
			var datahtml = "";
			datahtml += "<option>"+response.object[i].label+"</option>";
			$("#metadata_key_list").append(datahtml);
		}
	}
}

function fetchMetadataServiceAfter(response){
	if(response.error == false && response.object != null){
		if(localStorage._zs == "B" && response.tempObject2 == "A"){
			metadataUser = false;
		}
		noOfmetadata = response.object.length;
		for(var i=0;i<response.object.length;i++){
			addMetadataROW(response.object[i].id,response.object[i].label,response.object[i].label_value,i);
			metadataKeyArr.push(response.object[i].label);
		}
		var pHeight = $(window).height();
		var heightdeduct = 350;
		$('#metadatalist').css('height', (pHeight-heightdeduct));
	}
	if(localStorage._zs == "B" && response.tempObject2 == "A"){
		$(".input_div").css("display", "block");
		fetchMetadataKeyService();
		addMetadataEvent();
		deleteMultipleDoc();
		exportMetadata();
    	importMetadata();
	}else{
		$(".input_div").css("display", "none");
		$(".metadata_allcheckbox").css("display", "none");
		$(".row_check_box").css("display", "none");
		$(".delete_metadata_row").css("display", "none");
		$(".all_delete_icon").css("display", "none");
		$(".metadata_row_div_0").css("height", "540px");
	}
}
function addMetadataROW(id,label,label_value,i){
	var datahtml = "";
		if(i> 0) datahtml += "<hr id='metadata_hr_row_"+(id+1)+"' class='filesonlyrow_hr metadatList' style='margin-top:0px;margin-bottom:0px;display: ;width: 100%;float: left;margin-left: 12px;border-top: 1px solid #e0dbdb;'>";
		datahtml += "<div class='row new-row filesonlyrow' id='div_metadata_row_"+id+"' style='width:100%'>";
		datahtml += "	<div class='col-md-1 up' >";
		datahtml += "		<label class='contner row_check_box' style='margin-bottom:12px;margin-left:3px'>";
		datahtml += "			<input type='checkbox' id='metadata_checkbox_"+id+"' class='admcheckbox metadata_chackbox' name='check_docId'>";
		datahtml += "			<span class='checkmark'></span>";
		datahtml += "		</label>";
		datahtml += "	</div>";
		datahtml += "	<div class='col-md-4 up' style='cursor:pointer;margin-bottom:12px;margin-left:5px;'>";
		datahtml += "		<h2>";
		datahtml += "			<a href='javascript:void(0);' style='height:18px;font-size:16px;font-weight:400;line-height:20px;' class='noclick'>";
		datahtml += "				<span style='font-size:16px;word-break: break-word;'>"+label+"</span>";
		datahtml += "			</a>";
		datahtml += "		</h2>";
		datahtml += "	</div>";
		datahtml += "	<div class='col-md-4 up text-center'>";
		datahtml += "		<span class='sneha1' style='cursor:pointer;border:0px;background-color:transparent;font-size:16px;word-break: break-word;'>"+label_value+"</span>";
		datahtml += "	</div>";
		datahtml += "	<div class='col-md-1 up delete_metadata_row' style='margin-left: auto;'>";
		datahtml += "		<span class='sneha'><i id='deleteMetadata_"+id+"' class='fa fa-trash font-18 cursor-pointer' title='Delete' style='color:blue;'></i></span>";
		datahtml += "	</div>";
		datahtml += "</div>";
		if(i==-1){
			datahtml += "<hr metadata_hr_row_"+(id+1)+" class='filesonlyrow_hr metadatList' style='margin-top:0px;margin-bottom:0px;display: ;width: 100%;float: left;margin-left: 12px;border-top: 1px solid #e0dbdb;'>";
			$("#metadatalist").prepend(datahtml);
		}else
			$("#metadatalist").append(datahtml);
		deleteMetadataEvent(id);
}

function addMetadataServiceAfter(response){
	if(response.error == false && response.object != null){
		if($('#metadata_date_checkbox').is(":checked")){
			addMetadataROW(response.object,document.getElementById("metadataKey").value,document.getElementById("metadataDate").value,-1);
			metadataKeyArr.push(document.getElementById("metadataDate").value);
		}else{
			addMetadataROW(response.object,document.getElementById("metadataKey").value,document.getElementById("metadataValue").value,-1);
			metadataKeyArr.push(document.getElementById("metadataKey").value);
		}
		$('#metadata_date_checkbox').prop('checked', false);
		$('.date_class').css("display","none");
		$('.metadata_value_class').css("display","block");
		document.getElementById('metadataKey').value = '';
        document.getElementById('metadataValue').value = '';
		document.getElementById('metadataDate').value = '';
        admShowconfirmmsg("Metadata added Successfully.", confirm_Success, 5000, "", false, false);
		noOfmetadata++;
	}
}

function deleteMetadataServiceAfter(response){
	if(response.error == false && response.object != null){
		if(response.object.length > 0){
			if(response.extrajsonparam.id.indexOf(",")>0){
				var ids =  response.extrajsonparam.id.split(",");
				for(var i=0;i<ids.length;i++){
					$("#div_metadata_row_"+ids[i]).remove();
					$("#metadata_hr_row_"+ids[i]).remove();
					noOfmetadata--;
					metadataKeyArr.splice(metadataKeyArr.indexOf(response.object[i].label),1);
				}
				admShowconfirmmsg("Metadata deleted Successfully.", confirm_Success, 5000, "", false, false);
			}else{
				$("#div_metadata_row_"+response.extrajsonparam.id).remove();
				$("#metadata_hr_row_"+response.extrajsonparam.id).remove();
				admShowconfirmmsg("Metadata deleted Successfully.", confirm_Success, 5000, "", false, false);
				metadataKeyArr.splice(metadataKeyArr.indexOf(response.object[0].label),1);
				noOfmetadata--;
			}
		}
	}
}
function viewmetadatadocument(actURL){
	$("#metadata_viewerboxid").attr("src",actURL);
}