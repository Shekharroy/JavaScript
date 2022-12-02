var count = 0;
var cnt = 0;
var fileSize = 0;
var maxsinglefilesize = 5368709120;
var fNameWithSize = new Map();
var fNameAndId = new Map();
function setFileUploadURL(url){
	$('#fileupload').fileupload({
    	url: url,
    	autoUpload: true,
    	//maxRetries: 100,
    	retryTimeout: 500,
    	maxFileSize:5368709120,
    	//maxNumberOfFiles:20,
    	timeout:0,
    	dropZone: $(document),
    	pasteZone: $(document),
    	multipart:false,
    	limitMultiFileUploads:1,
    	limitConcurrentUploads:10,
    	/*beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + getauthtokenfromlocal());
		},*/
    	/*fail: function (e, data) {
			if(parent.currentscreen == "legistdrive"){}
        },*/
		progressall: function (e, data) {
			document.getElementById("btnfileuploadprogressbar").style.display="";
			document.getElementById("dragdropcaption").style.display="none";
			document.getElementById("addingdocumentscaption").style.display="none";
			document.getElementById("divuploadbuttons").style.display="";
			if (e.isDefaultPrevented()) {
				return false;
			}
			var $this = $(this),
				progress = Math.floor(data.loaded / data.total * 100),
				globalProgressNode = $this.find('.fileupload-progress'),
				extendedProgressNode = globalProgressNode.find('.progress-extended');
			if (extendedProgressNode.length) {
				var html = ($this.data('blueimp-fileupload') || $this.data('fileupload'))._renderExtendedProgress(data);
				if(progress >= 99) html = html + " Encrypting and Storing your files. please wait...";
				extendedProgressNode.html(html);
			}
			globalProgressNode
				.find('.progress')
				.attr('aria-valuenow', progress)
				.children().first().css(
					'width',
					progress + '%'
			);
			$(".canceleach").show();
        },
    	done: function (e, data) {
    		if (e.isDefaultPrevented()) {
				return false;
			}

			var objthis = $(this);
			var activeUploads = $(this).fileupload('active');

			var that = $(this).data('blueimp-fileupload') ||
					$(this).data('fileupload'),
				getFilesFromResponse = data.getFilesFromResponse ||
					that.options.getFilesFromResponse,
				files = getFilesFromResponse(data),
				template,
                deferred;

			if (data.context) {
				data.context.each(function (index) {
					deferred = that._addFinishedDeferreds();
					that._transition($(this)).done(
						function () {
						var node = $(this);
						$(node).remove();
						}
					);
				});
            }

			var fdp = data.folderPath;
			if(fdp.indexOf("/") > 0){
				fdp = fdp.substring(0, fdp.indexOf("/"));
			}
			var found = parent.admfolderpathupld.find(function (element) {
				return element == fdp;
			});
			if(!found) parent.admfolderpathupld.push(fdp);

			var fdtype = parent.admReturnFolderTypeDB(data.folderType);
			var sk = {attribute1:data.folderId, attribute2:data.files[0].name, attribute3:data.files[0].size,
						attribute4:data.files[0].lastModified, attribute5:fdtype, attribute6:data.parentFolderId,
						attribute7:data.isVersion, attribute8:data.fileId, attribute9:data.fileName, attribute10:fdp};
			parent.adm_folderPathList_URL_DONE.push(sk);
			parent.adm_folderPathList_URL_DONE_COUNT++;
			count++;
			var check1 = 300;
			var check2 = 299;
			if(count == check1){
				for(var il=0;il<check1;il++){
					parent.adm_folderPathList_URL_DONE_PROCESS.push(parent.adm_folderPathList_URL_DONE[il]);
					if(il == check2){
						ty();
					}
				}
				parent.adm_folderPathList_URL_DONE = parent.adm_folderPathList_URL_DONE.splice(check1, parent.adm_folderPathList_URL_DONE.length);
				count = 0;
			}

			parent.uploadbatchcount = parent.adm_folderPathList_URL_COUNT;

			//check if the file found uploaded which was registered at the time of preparing the file upload list
			var fileuploaded = parent.admuploadfilelist[data.folderPath+"#"+data.actFileName]+"";
			if(fileuploaded != "undefined" && fileuploaded != "null" && fileuploaded.length > 0 && fileuploaded == "U"){
				parent.admuploadfilelist[data.folderPath+"#"+data.actFileName] = "D";
			}

			//console.log("count : " + parent.adm_folderPathList_URL_DONE_COUNT +" :: count no : " + parent.adm_folderPathList_URL_COUNT);
			if(parent.adm_folderPathList_URL_DONE_COUNT == parent.adm_folderPathList_URL_COUNT){
				setTimeout(function(){
					var activeUploads = $(".template-upload").length;//$(objthis).fileupload('active');
					console.log("activeUploads : " + activeUploads);
					document.getElementById("dragdropcaption").style.display="";
					document.getElementById("btnfileuploadprogressbar").style.display="none";
					parent.hideActionPopup("uploadfilemodal");
					//parent.admSaveFolderSizeService();
					console.log("--------------------Upload--------------------");
					var obj = undefined;
					if(parent.currentscreen == "casedocument") {
						obj = window.parent.document.getElementById(parent.doc_fileuploadId);
						parent.fetchDocumentList();
					} else if(parent.currentscreen == "legistdrive") {
						console.log("admUploadFileAfter------------->1");
						parent.admUploadFileAfter(1);
						parent.adm_folderPathList_upload = [];
						cancelallfilesupload(true);
					} else if(parent.currentscreen == "email") {
						obj = window.parent.document.getElementById(parent.amsfileuploadId);
					}
				}, 1000);
			}
        }
	});
}

function ty(){
	var jsonInput = {listAttribute4:[], attribute5:0};
	var isVersion = false;
	var attribute10 = "";
	for(var i=0;i<parent.adm_folderPathList_URL_DONE_PROCESS.length;i++){
		try {
			var data = parent.adm_folderPathList_URL_DONE_PROCESS[i];

			var extension = "";
			if(data.attribute2.indexOf(".") >= 0) {
				extension = data.attribute2.substring(data.attribute2.lastIndexOf(".")+1);
			}
			var json = {
				userId:localStorage._zv,
				folderId:data.attribute1,
				parentFolderId:data.attribute6,
				storageFileName:data.attribute9,
				fileName:data.attribute2,
				fileSize:data.attribute3,
				fileType:extension,
				status:"A",
				deleteStatus:"",
				folderType:data.attribute5,
				fileUniqueId:"",
				fileId:data.attribute8
			};
			attribute10 = data.attribute10;
			jsonInput.listAttribute4.push(json);
			try{
				if(parseFloat(data.attribute8+"")> 0){
					isVersion = true;
					jsonInput.attribute5 = data.attribute8;
				}
			}catch(error){}
		} catch(error) {}
	}

	jsonInput = parent.admUploadjsonSizeUpdate(jsonInput, attribute10, 1);
	if(parent.adm_folderPathList_URL_DONE.length == 0){
		parent.admDocAddMetaDataService(jsonInput, true);
	} else {
		parent.admDocAddMetaDataService(jsonInput, false);
	}
	parent.adm_folderPathList_URL_DONE_PROCESS = [];
}

function openAtcPopup(){
	//if(parent.currentscreen == "casedocument")
	// window.parent.documenthideshowatcpop("");
//	else
	 document.getElementById('uploadFileId').click();
}

function fileUploadCheckParentPage(){
	document.getElementById("btnfileuploadaddfiles").style.display="";
	document.getElementById("btncancelallupload").style.display="none";
	if(parent.currentscreen == "email") {
		document.getElementById("btnfileuploadaddfiles").style.display="none";
		document.getElementById("btncancelallupload").style.display="none";
	}
}

function cancelallfilesupload(sendupload){
	document.getElementById("btnfileuploadprogressbar").style.display="none";
	document.getElementById("dragdropcaption").style.display="";
	document.getElementById("addingdocumentscaption").style.display="none";
	document.getElementById("divuploadbuttons").style.display="";
	$(".template-upload").remove();
	if(sendupload){
		parent.admUploadFileAfter(1);
		parent.adm_folderPathList_upload = [];
		parent.adm_folderPathList_URL_DONE_COUNT = 0;
		parent.adm_folderPathList_URL_COUNT = 0;
		console.log("3333333");
	}
}

function fileuploadcheckifnonascii(filenm){
	var hasMoreThanAscii = /^[\u0000-\u007f]*$/.test(filenm);
	return hasMoreThanAscii;
}
