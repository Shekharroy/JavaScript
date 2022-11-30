var admDownloadFolderLinkURL = "/v1/app/unindexdocdownload/0/downloadzipfolder/<FILEANME>/<ACTION>";
var download_messages ={
	"downloadfolderexpired":"Download folder link has expired. Please download again.",
	"downloadfolderunauthorized":"The download folder link could not be authenticated. Please <a style='cursor:pointer;color: #1e88e5;font-weight: bold;' onclick='userLogin();'>login</a> with proper credentials.",
	"downloadfoldernopermission":"You don't have rights to download this folder."
};

function downloadFolderQueryParam(){
	setDomainAppURL();
	try{
		var urlk = window.location.href.split("?");
		if(urlk.length > 1 && urlk[1].indexOf("dfd=")==0){
			var filenm = urlk[1].replace("dfd=", "");
			generateDynamicLinkService(filenm);
		}
	}catch(error){

	}
}

function showError(msg){
	$("#diverror").show();
	$("#pmsg").html(msg);
}

function generateDynamicLinkService(filename){
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+admDownloadFolderLinkURL;
	posturl = posturl.replace("<FILEANME>", filename);
	posturl = posturl.replace("<ACTION>", "generateDynamicLinkServiceAfter");
	invokeAdapterCall(type,posturl,"","","");
}
function generateDynamicLinkServiceAfter(response){
	var resCode = response.messageCode;
	if(response.error == false && response.object.length > 0){
		var url = response.object;
		var filenm = url.split("-")[1];
		var a = document.createElement('a');
		a.setAttribute('href',url);
		a.setAttribute('download',filenm);
		a.click();
		$("#downloadsuccess").show();
	}else{
		if(resCode == 403){
			showError(download_messages.downloadfoldernopermission);
		} else if(resCode == 401){
			showError(download_messages.downloadfolderunauthorized);
		} else if(resCode == 404){
			showError(download_messages.downloadfolderexpired);
		}	
	}
}

function userLogin(){
	clearauthinlocalstorage();
	window.open("drive.html");
}