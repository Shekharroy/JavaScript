/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromAdm(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	admbaseauth = getauthtokenfromlocal();
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
}

function permissionCommonEvents(){
	fetchLogo();

	if(localStorage._zp == 1){
		fetchAllFolderListDetails();
		admSaveSharedSecurityDone();
		permsearchEvent();
		permRefreshTree();
		permissionRedirectHomePage();
	} else {
		window.location.href = "error.html";
	}
	document.addEventListener('click', function (e) {
		permissionStorageCheckSessionService();
	});

	checkPageCorpLogoChange();
}

function admShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm){
	if(ispop) showconfirmmsgpopup(txt, type, duration, targetdvid, confirm);
	else {
		if(type == "ASK"){
			showconfirmmsgmain(txt, type, duration, targetdvid, confirm);
		} else {
			$('body').topAlertjs({
				type: type,
				message: txt,
				close: true,
				duration: 10
			});
			$(".rowdropdownmenu").removeClass("show");
		}
	}
}

function admSetFolderHeaderCaption(){
	var fdpath = adm_parentfolderid[admTreeFolderSelectedId];
	$("#div_header").html((fdpath.split("#")[2]).replace(/\//g, " >> "));
	$("#div_header").css("display", "block");
	$(".secttt-one").css("padding-bottom", "0");
}

function loadTreeResponseOnPageChange(response){
	if(!admFolderTreeLoaded){
		admFolderListAllServiceAfter(response);
	}
}

function admBuildJSONTree(list){
	var data = [];
	if(list != null && list.length > 0){
		for(var i = 0 ; i< list.length; i++)
		{
		    buildTree(list[i].split('/'),data);
		}
	}
	return data;
}

function buildTree(parts,treeNode) {
    if(parts.length === 0)
    {
    	return;
    }
    for(var i = 0 ; i < treeNode.length; i++)
    {
        if(parts[0] == treeNode[i].text)
        {
            buildTree(parts.splice(1,parts.length),treeNode[i].nodes);
            return;
        }
    }

    var vq = parts[0].substring(0,parts[0].lastIndexOf("#"));
    var fdid = parts[0].substring(parts[0].lastIndexOf("#")+1);
    var fdindex = admListFolderIndexId[fdid];
    var newNode = {'text': vq,'id':fdid,tags:[fdindex],'nodes':[]};
    treeNode.push(newNode);
    buildTree(parts.splice(1,parts.length),newNode.nodes);
}

var folderarr = [];
function admBuildUIFirst(dataobj, foldertype, level){
	nodesList= [];
	var treeid = "default-tree-"+admcurrentfoldertype;
	$('#'+treeid).treeview({
		data: dataobj,
		// expanded to 2 levels
		levels: 100,

		// custom icons
		// expandIcon: 'fa fa-plus',
		// collapseIcon: 'fa fa-minus',

		expandIcon: 'fa fa-folder',
		collapseIcon: 'fa fa-folder-open',
		emptyIcon: 'fa',
		nodeIcon: '',
		selectedIcon: '',
		checkedIcon: '',
		uncheckedIcon: '',

		// colors
		color: undefined, // '#000000',
		backColor: undefined, // '#FFFFFF',
		borderColor: undefined, // '#dddddd',
		onhoverColor: '#F5F5F5',
		selectedColor: '#FFFFFF',
		selectedBackColor: '#428bca',
		searchResultColor: '#D9534F',
		searchResultBackColor: undefined, //'#FFFFFF',

		// enables links
		enableLinks: false,

		// highlights selected items
		highlightSelected: true,

		// highlights search results
		highlightSearchResults: true,

		// shows borders
		showBorder: true,

		// shows icons
		showIcon: true,

		// shows checkboxes
		showCheckbox: false,

		// shows tags
		showTags: false,

		// enables multi select
		multiSelect: false,
		onNodeSelected: function(event, data) {
			//$m.nodeSelected(event,dataobj);
			admTreeFolderSelectedId = data.id;
			selectednodeid = data.nodeId;
			if(selectednodeid == 0){
				permdisableallactions();
			} else if(admTreeFolderSelectedId > 0){
				try{permresetall();}catch(error){}
				permselectall(false, false);
				admSetFolderHeaderCaption();
				alldisabled = 1;
				permenableallactions();
				admFetchFolderSharedSecurityService(admTreeFolderSelectedId);
				admFolderListAllService(admTreeFolderSelectedId);
			}
		},
		onNodeUnselected: function(event, data) {
			//$m.nodeSelected(event,dataobj);
			admTreeFolderSelectedId = -1;
			selectednodeid = -1;
		}
	});

	$('#'+treeid).on('nodeExpanded',function(event, data) {
		selectednodeid = data.nodeId;
		admTreeFolderSelectedId = data.id;
		var node = $('#'+treeid).treeview('getNode', data.nodeId);
		$('#'+treeid).treeview('selectNode', [ data.nodeId, { silent:false } ]);
		//var arr = $('#'+treeid).treeview('getSiblings', node);
		//if(arr == null || arr == undefined || arr.length == 0) {
			//admFolderListAllService(data.id);
		//}
		children=node['nodes'];
		if(children.length == 0){
			if(admTreeFolderSelectedId > 0){
				try{permresetall();}catch(error){}
				permselectall(false, false);
				admSetFolderHeaderCaption();
				permenableallactions();
				admFolderListAllService(data.id);
				admFetchFolderSharedSecurityService(admTreeFolderSelectedId);
			}
		}
	});

	/*var allNodes = $('#'+treeid).treeview('getNodes');
	$(allNodes).each(function(index, element) {
		$(this.$el[0]).attr('data-attribute-name', this.data-attribute-name);
	});*/
	var node = $('#'+treeid).treeview('getNode', 0);
	if(node != null){
		//admAllDescendants(node);
	}

	/*if(selectednodeid > -1){
		$('#'+treeid).treeview('selectNode', [ selectednodeid, { silent:true } ]);
		var node = $('#'+treeid).treeview('getNode', selectednodeid);
		admTreeFolderSelectedId = node.id;
    }*/

    //$(".list-group-item").css("padding", "5px 10px");
    $('#'+treeid).treeview('selectNode', [ 0, { silent:true } ]);
}

function buildList(data, isSub, admidxul, level, foldertype, pathm){
    var html = ""; // Wrap with div if true
    admidxul++;
    level++;
    var parentid = "admpersonalfilesul_"+foldertype+"_"+admidxul;
    html += "<ul id='"+parentid+"' level='"+level+"' path='"+pathm+"' class='"+adm_ShowAdmOptionsULCls+"'>";
    for(var item=0;item<=data.length-1;item++){
    	admids++;
    	admidxul++;
    	var folderId = 0;
    	var noOfFiles = "0";
    	var status = "A";
    	var folderp = data[item].text;
    	var chkfolder = pathm + "/" + folderp;
    	if(pathm == "") chkfolder = folderp;

    	var foldperm = null;
    	var tfolderperm = undefined;
    	var tk = undefined;
    	if(foldertype == admpersonaltype) {
    		tk = admPersoanlFoldersFileCount_local.filter(function(itemk){return itemk.hasOwnProperty(chkfolder);});
    	} else if(foldertype == admsharedtype) {
    		tk = admSharedFoldersFileCount_local.filter(function(itemk){return itemk.hasOwnProperty(chkfolder);});
    		//tfolderperm = admSharedFoldersPermission_local.filter(function(itemk){return itemk.hasOwnProperty(chkfolder);});
    	}

    	try{
    		var tmp = tk[0][chkfolder];
    		folderId = (tmp.split("#"))[0];
    		noOfFiles = (tmp.split("#"))[1];
    		status = (tmp.split("#"))[2];

    		if(admcurrentfolderid == folderId){
            	admcurrentliid = admFolderListlidl_+foldertype+"_"+admids;
            	admcurrentlevel = level;
        		//admcurrentfoldertype = foldertype;
            }

    	}catch(error){}

    	/*try{
    		var tmpk = tfolderperm[0][chkfolder];
    		foldperm = tmpk.split("#")+"";
    	}catch(error){}*/

    	var path = folderp;
    	if(pathm != "") path = pathm + "/" + path;

    	if(admcurrentfolderid == folderId){
    		admcurrentpath = path;
    	}

    	var stylefontfile = "";
    	if(status == "D"){
    		stylefontfile = "color:#B74A4A;";
    	}

		var fppath = path.split("/")[0];
        html += "<li class='"+adm_ShowAdmoptionCls+" "+ fppath +"' id='"+admFolderListlidl_+foldertype+"_"+admids+"' level='"+level+"' path='"+path+"' parentid='"+parentid+"' data-type='"+admcurrentfoldertype+"' data-id='"+folderId+"' data-nooffiles='"+noOfFiles+"' data-status='"+status+"'>";
     	if(typeof(data[item].children) === 'object'){ // An array will return 'object'
            if(isSub){
                html += "<a id='"+admFolderListlispan_+foldertype+"_"+admids+"' class='adm_ShowAdmoptionCls1' level='"+level+"' path='"+path+"' parentid='"+parentid+"' style='"+stylefontfile+"'>" + folderp + "<span id='"+admFolderFileslispan_+foldertype+"_"+admids+"'>("+noOfFiles+")<\/span><\/a>";
            } else {
            	html += "<a id='"+admFolderListlispan_+foldertype+"_"+admids+"' class='adm_ShowAdmoptionCls1' level='"+level+"' path='"+path+"' parentid='"+parentid+"' style='"+stylefontfile+"'>" + folderp + "<span id='"+admFolderFileslispan_+foldertype+"_"+admids+"'>("+noOfFiles+")<\/span></a>";
            }
            html += buildList(data[item].children, true, admidxul, level, foldertype, path); // Submenu found. Calling recursively same method (and wrapping it in a div)
        } else {
        	pathm = path + "/" + folderp;
        	html += "<a id='"+admFolderListlispan_+foldertype+"_"+admids+"' class='adm_ShowAdmoptionCls1' level='"+level+"' path='"+path+"' parentid='"+parentid+"' style='"+stylefontfile+"'>" + folderp + "<span id='"+admFolderFileslispan_+foldertype+"_"+admids+"'>("+noOfFiles+")<\/span></a>";
        }
        html += "</li>";
    }
    html += "</ul>";
    html += "";
    return html;
}

function admResetTree(){
	admFolderTreeLoaded = false;
	admFolderListAllService(0);
}

function admAllDescendants(node) {
	var children = node['nodes'];
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      allDescendants(child);
    }
}

function permselectrow(idm){
	$("#adm_security_row_"+idm).css("background-color", "lightskyblue");
	//$("#adm_security_row_"+idm).css("color", "#fff");
	$("#adm_sec_checkbox_reset_"+idm).css("display", "block");
	$("#adm_security_row_"+idm).addClass("rwselected");
	permenabledisablebutton();
}

function permdeselectrow(idm){
	$("#adm_security_row_"+idm).css("background-color", "#fff");
	//$("#adm_security_row_"+idm).css("color", "#009ce7");
	$("#adm_sec_checkbox_reset_"+idm).css("display", "none");
	var prvst = ($("#adm_security_row_"+idm).attr("data-prvstatus")).split("#");
	if(prvst[0] == "false"){
		$("#adm_sec_checkbox_view_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_view_" + idm).prop("checked", true);
	}
	if(prvst[1] == "false"){
		$("#adm_sec_checkbox_download_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_download_" + idm).prop("checked", true);
	}
	if(prvst[2] == "false"){
		$("#adm_sec_checkbox_share_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_share_" + idm).prop("checked", true);
	}
	if(prvst[3] == "false"){
		$("#adm_sec_checkbox_deposit_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_deposit_" + idm).prop("checked", true);
	}
	if(prvst[4] == "false"){
		$("#adm_sec_checkbox_delete_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_delete_" + idm).prop("checked", true);
	}
	if(prvst[5] == "false"){
		$("#adm_sec_checkbox_copy_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_copy_" + idm).prop("checked", true);
	}
	if(prvst[6] == "false"){
		$("#adm_sec_checkbox_move_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_move_" + idm).prop("checked", true);
	}
	if(prvst[7] == "false"){
		$("#adm_sec_checkbox_download_org_" + idm).prop("checked", false);
	} else {
		$("#adm_sec_checkbox_download_org_" + idm).prop("checked", true);
	}
	if(prvst[0] == "false"){
		$("#adm_security_checkbox_" + idm).prop("checked", false);
	} else {
		$("#adm_security_checkbox_" + idm).prop("checked", true);
	}
	$("#adm_security_row_"+idm).removeClass("rwselected");

	permenabledisablebutton();
}

function permresetall(){
	for(var i=permcurrentval;i<sharedsecuritylen;i++){
		permdeselectrow(i);
	}
	$("#chk_selectall").prop('checked', false);
	$("#chk_selectall_view").prop('checked', false);
	$("#chk_selectall_download").prop('checked', false);
	$("#chk_selectall_share").prop('checked', false);
	$("#chk_selectall_deposit").prop('checked', false);
	$("#chk_selectall_delete").prop('checked', false);
	$("#chk_selectall_copy").prop('checked', false);
	$("#chk_selectall_move").prop('checked', false);
}

function permselectall(val, addselect){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_security_checkbox_"+i).prop('checked', val);
			$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			$("#adm_sec_checkbox_download_"+i).prop('checked', val);
			$("#adm_sec_checkbox_download_org_"+i).prop('checked', val);
			$("#adm_sec_checkbox_share_"+i).prop('checked', val);
			$("#adm_sec_checkbox_deposit_"+i).prop('checked', val);
			$("#adm_sec_checkbox_delete_"+i).prop('checked', val);
			$("#adm_sec_checkbox_copy_"+i).prop('checked', val);
			$("#adm_sec_checkbox_move_"+i).prop('checked', val);
			if(addselect) permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	$("#chk_selectall_view").prop('checked', val);
	$("#chk_selectall_download").prop('checked', val);
	$("#chk_selectall_download_org").prop('checked', val);
	$("#chk_selectall_share").prop('checked', val);
	$("#chk_selectall_deposit").prop('checked', val);
	$("#chk_selectall_delete").prop('checked', val);
	$("#chk_selectall_copy").prop('checked', val);
	$("#chk_selectall_move").prop('checked', val);
}

function permselectallview(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_security_checkbox_"+i).prop('checked', val);
			$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			if(!val){
				$("#adm_sec_checkbox_download_"+i).prop('checked', val);
				$("#adm_sec_checkbox_download_org_"+i).prop('checked', val);
				$("#adm_sec_checkbox_share_"+i).prop('checked', val);
				$("#adm_sec_checkbox_deposit_"+i).prop('checked', val);
				$("#adm_sec_checkbox_delete_"+i).prop('checked', val);
				$("#adm_sec_checkbox_copy_"+i).prop('checked', val);
				$("#adm_sec_checkbox_move_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}

	$("#chk_selectall").prop('checked', val);
	$("#chk_selectall_view").prop('checked', val);
	if(!val){
		$("#chk_selectall_download").prop('checked', val);
		$("#chk_selectall_download_org").prop('checked', val);
		$("#chk_selectall_share").prop('checked', val);
		$("#chk_selectall_deposit").prop('checked', val);
		$("#chk_selectall_delete").prop('checked', val);
		$("#chk_selectall_copy").prop('checked', val);
		$("#chk_selectall_move").prop('checked', val);
	}
}

function permselectalldownload(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_download_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

function permselectalldownloadoriginal(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_download_org_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
				$("#adm_sec_checkbox_download_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

function permselectallshare(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_share_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

function permselectalldeposit(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_deposit_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

function permselectalldelete(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_delete_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

function permselectallcopy(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_copy_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

function permselectallmove(val){
	for(var i=0;i<sharedsecuritylen;i++){
		if($("#adm_security_row_"+i).is(":visible")){
			$("#adm_sec_checkbox_move_"+i).prop('checked', val);
			if(val){
				$("#adm_security_checkbox_"+i).prop('checked', val);
				$("#adm_sec_checkbox_view_"+i).prop('checked', val);
			}
			permselectrow(i);
		}
	}
	$("#chk_selectall").prop('checked', val);
	if(val){
		$("#chk_selectall_view").prop('checked', val);
	}
}

/**
 * method to create json to add shared folder security
 */
function admSaveSharedFolderSecurity(childInherit){
	var folderId = admTreeFolderSelectedId;
	var jsoninput = {"sharedSecurityList":[]};
	var collection = $(".rwselected");
	collection.each(function() {
		var id = $(this).attr("id");
	 	var idm = id.substring(id.lastIndexOf("_")+1);
		var dataid = $("#adm_security_row_"+idm).attr("data-pid")+"";
		var userid = $("#adm_security_row_"+idm).attr("data-userid");

		var viewcheckbox = $("#adm_sec_checkbox_view_"+idm).is(':checked') ;
		var downloadcheckbox = $("#adm_sec_checkbox_download_"+idm).is(':checked') ;
		var downloadcheckboxorg = $("#adm_sec_checkbox_download_org_"+idm).is(':checked') ;
		var outsharecheckbox = $("#adm_sec_checkbox_share_"+idm).is(':checked') ;
		var insharecheckbox = $("#adm_sec_checkbox_deposit_"+idm).is(':checked') ;
		var deletecheckbox = $("#adm_sec_checkbox_delete_"+idm).is(':checked') ;
		var copycheckbox = $("#adm_sec_checkbox_copy_"+idm).is(':checked') ;
		var movecheckbox = $("#adm_sec_checkbox_move_"+idm).is(':checked') ;

		var status = "A";
		var download = "Y";
		var downloadOriginal = "Y";
		var outboundShare = "Y";
		var inboundShare = "Y";
		var deletem = "Y";
		var copy = "Y";
		var move = "Y";

		if(!downloadcheckbox){
			download = "N";
		}
		if(!downloadcheckboxorg){
			downloadOriginal = "N";
		}
		if(!outsharecheckbox){
			outboundShare = "N";
		}
		if(!insharecheckbox){
			inboundShare = "N";
		}
		if(!deletecheckbox){
			deletem = "N";
		}
		if(!copycheckbox){
			copy = "N";
		}
		if(!movecheckbox){
			move = "N";
		}
		if(!viewcheckbox){
			status = "I";
		}

		var sm = {"id": 0, "folderId":folderId, "status":status, "userId":userid, "download":download, "outboundShare":outboundShare,
			"inboundShare":inboundShare, "delete":deletem, "copy":copy, "move":move, "downloadOriginal":downloadOriginal, "childInherit":childInherit};
		jsoninput.sharedSecurityList.push(sm);
	});

	admSaveSharedFolderSecurityService(jsoninput);
}

function permenableallactions(){
	if(alldisabled == 1){
		alldisabled = 0;
		$('input[type=checkbox]').removeAttr('disabled');
	}
}

function permdisableallactions(){
	$('input[type=checkbox]').prop('checked', false);
	$('input[type=checkbox]').attr('checked', false);
	$('input[type=checkbox]').attr('disabled', '');
	$(':button').attr('disabled', '');
	$("#btn_refresh").removeAttr("disabled");
}

function permenabledisablebutton(){
	var collection = $(".rwselected");
	if(collection.length > 0) {
		$(':button').removeAttr('disabled');
	} else {
		$(':button').attr('disabled', '');
		$("#btn_refresh").removeAttr("disabled");
	}
}

function LoopFolderListZeroLevel(folderls, copy){
	admids = 1;
	if(admcurrentfoldertype == admpersonaltype) {
		admPersoanlFoldersList = [];
		admPersoanlFoldersFileCount = [];
		if(folderls.length>0) $("#"+admpersonalfilesul_+admpersonaltype+"1_0xxx").remove();
	} else if(admcurrentfoldertype == admsharedtype) {
		admSharedFoldersList = [];
		if(folderls.length>0) $("#"+admpersonalfilesul_+admsharedtype+"1_0xxx").remove();
		admSharedFoldersFileCount = [];
	}

	adm_folder_list = folderls;
	adm_folder_list = folderListSortSort(adm_folder_list, "folder");
	for(var i=0;i<=adm_folder_list.length-1;i++){
		tempJSON = {};
		tempJSONPermission = {};
		var fpath = adm_folder_list[i].folderPath;
		folderparnetid = adm_folder_list[i].parentFolderId;
		admListFolderIndexIdMain[fpath] = adm_folder_list[i].folderIndex;
		admFolderSize[fpath] = adm_folder_list[i].folderSize;
		var modifiedddt = handleNullValue(adm_folder_list[i].fileModifiedDate);
		modifiedddt = getdatefromtimestamp(modifiedddt, true, "EN-US");
		admFolderDate[fpath] = modifiedddt;
		admfolderstatus[adm_folder_list[i].folderId] = adm_folder_list[i].status;

		var nooffilesinfo = adm_folder_list[i].folderId + "#" + adm_folder_list[i].noOfFiles + "#" + adm_folder_list[i].status;
		tempJSON[fpath] = nooffilesinfo;
		if(admcurrentfoldertype == admpersonaltype) {
			admPersoanlFoldersList.push(adm_folder_list[i].folderPath);
			admPersoanlFoldersFileCount.push(tempJSON);
		} else if(admcurrentfoldertype == admsharedtype) {
			admSharedFoldersList.push(adm_folder_list[i].folderPath);
			admSharedFoldersFileCount.push(tempJSON);
			admSharedFoldersPermission[adm_folder_list[i].folderId] = adm_folder_list[i].folderPermissions;
		}
	}

	if(!copy){
		if(admcurrentfoldertype == admpersonaltype ) {
			admLoopFolderList(folderparnetid, admcurrentfoldertype);
		} else if(admcurrentfoldertype == admsharedtype) {
			admLoopFolderList(folderparnetid, admcurrentfoldertype);
		}
	}
}

function folderListSortSort(data, type){
	datatosort = data;
	if(datatosort != null && datatosort.length > 0){
		if(type=="file"){
			if(datatosort[0].fileIndex != null && datatosort[0].fileIndex != "null" && datatosort[0].fileIndex != ""){
				admindexpresent = true;
			} else {
				admindexpresent = false;
			}
		} else if(type=="folder"){
			if(datatosort[0].folderIndex != null && datatosort[0].folderIndex != "null" && datatosort[0].folderIndex != ""){
				admindexpresent = true;
			} else {
				admindexpresent = false;
			}
		}

		var arr = adm_sorting.split("`");
		sortorder = (arr[0] == "DESC" ? -1 : 1);

		if(type=="copy") {
			sortfieldnm = "fileLastModifiedDate";
			sortorder = "DESC";
		} else if(arr[1]=="date") {
			sortfieldnm = (type == "folder" ? "fileLastModifiedDate" : "fileModifiedLongTime");
		} else if(arr[1]=="size") {
			sortfieldnm = (type == "folder" ? "folderSize" : "fileSize");
		} else if(arr[1]=="name") {
			sortfieldnm = (type == "folder" ? "folderPathLastChild" : "fileName");
		}

		alphaNumericSort(datatosort);
	}
	return datatosort;
}

function permcommonsearch() {
	var search = $('#example-search-input').val().trim().toLowerCase();
	if (admUserList != null) {
		var attributearr = [];
		var chkVal = false;
		console.log("admUserList == " + admUserList.length);
		if ((search.trim()).length > 0) {
			chkVal = true;
			attributearr[0] = "loginId<#HASH;>string<#HASH;>" + search;
		}
		var response = { "object": "", "error": false, "overwrite": 1 };
		if (chkVal == true) {
			response.object = searchJSONLowerCaseMatchMultiple(admUserList, attributearr);
			console.log("response.object 11 == " + response.object.length);
			if (response.object.length == 0) {
				attributearr[0] = "firstName<#HASH;>string<#HASH;>" + search;
				response.object = searchJSONLowerCaseMatchMultiple(admUserList, attributearr);
			}
			if (response.object.length == 0) {
				attributearr[0] = "lastName<#HASH;>string<#HASH;>" + search;
				response.object = searchJSONLowerCaseMatchMultiple(admUserList, attributearr);
			}
			console.log("response.object 22 == " + response.object.length);
		} else {
			response.object = admUserList;
		}
		searchdone = 1;
		displaycounter = -1;
		var userTypeId = $("#userSelect").val();
		if(userTypeId != "ALL"){
			attributearr = [];
			attributearr[0] = "userTypeId<#HASH;>string<#HASH;>" + userTypeId;
			response.object = searchJSONLowerCaseMatchMultiple(response.object, attributearr);
		}
		admUserListServiceAfter(response);
	}
}



