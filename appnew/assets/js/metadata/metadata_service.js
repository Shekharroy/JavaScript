
function fetchMetadataKeyService(){
	var type = updateMethod;
	var jsonInput = {"attribute1":"fetchMetadataKeyServiceAfter"};
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/0/master/fetch";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function fetchMetadataService(docId,folderId){
	setInterval(function(){
		if(getauthtokenfromlocal() == "" || admbaseauth != getauthtokenfromlocal()){
			window.location.href = "error.html";
		}
	}, 1000);
	var type = updateMethod;
	var jsonInput = {
		"attribute1":"fetchMetadataServiceAfter",
		"attribute2":docId,
		"attribute6":folderId
	};
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/7/action/fetch";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function addMetadataService(key,value,docId,folderId){
	var type = updateMethod;
	var jsonInput = {
		"attribute1":"addMetadataServiceAfter",
		"attribute2":key,
		"attribute3":value,
		"attribute4":docId,
		"attribute6":folderId
	};
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/7/action/add";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, "");
}

function deleteMetadataService(mId,folderId,docId){
	var type = updateMethod;
	var jsonInput = {
		"attribute1":"deleteMetadataServiceAfter",
		"attribute5":mId,
		"attribute6":folderId,
		"attribute4":docId
	};
	var extraparamjson = {"id":mId};
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/7/action/delete";
	invokeAdapterCallFromAdm(type, posturl, "", jsonInput, extraparamjson);
}

function metadataImportService(docId,noOfmetadata,folderId){
	var ext = currentfile.name.substring(currentfile.name.lastIndexOf(".")+1);
	if(ext.toLowerCase() == "csv"){
		ajaxindicatorstart('please wait..importing metadata...');
		var type = updateMethod;
		var posturl = cloudApiUrlACMS + "/v1/app/metatdata/7/action/import/"+docId+"/"+noOfmetadata+"/"+folderId

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
					$("#btnworkflowfilechoose").val("");
					ajaxindicatorstop();

					var filename = getFileNameFromDispositioon(xhr.getResponseHeader('Content-Disposition'));
					var dateObj = new Date();
					var month = dateObj.getUTCMonth() + 1; //months from 1-12
					var day = dateObj.getUTCDate();
					var year = dateObj.getUTCFullYear();
					var hour = dateObj.getHours();
					var minute = dateObj.getMinutes();
					filename = filename.replace(".csv", "")+"_"+localStorage._zw+"_"+localStorage._zv+"_"+year+"_"+month+"_"+day+"_"+hour+"_"+minute+"_.csv";

					var blob = xhr.response;
					if (navigator.msSaveBlob) {
					  return navigator.msSaveBlob(blob, filename);
					}

					const url = URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					a.click();
					URL.revokeObjectURL(url);
					admShowconfirmmsg("Request processed successfully.", confirm_Info, 5000, "", false, false);
					location.reload();
				} else {
					ajaxindicatorstop();
					admShowconfirmmsg("Request could not be processed", confirm_Error, 5000, "", false, false);
					$("#btnuserfilechoose").val("");
				}
			}
		};
		xhr.send(formData);
	} else {
		admShowconfirmmsg("Please upload csv file format only.", confirm_Error, 5000, "", false, false);
	}
}

function downloadMetadataTemplateService(){
	ajaxindicatorstart('request is being processed...');

	const a = document.createElement('a');
	a.style = 'display: none';
	document.body.appendChild(a);

	var type = updateMethod;
	var bs = getauthtokenfromlocal();
	var posturl = cloudApiUrlACMS+"/v1/app/metatdata/7/action/download/metadata/template";
	var xhr = new XMLHttpRequest();
	xhr.open(type, posturl, true);
	xhr.responseType = "blob";
	xhr.timeout = 0;
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader("Authorization",  "Bearer " + bs);
	xhr.onreadystatechange = function (){
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				ajaxindicatorstop();

				var filename = getFileNameFromDispositioon(xhr.getResponseHeader('Content-Disposition'));

				var blob = xhr.response;
				if (navigator.msSaveBlob) {
				  return navigator.msSaveBlob(blob, filename);
				}

				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = filename;
				a.click();
				URL.revokeObjectURL(url);
			}
		}
	};
	xhr.send();
}