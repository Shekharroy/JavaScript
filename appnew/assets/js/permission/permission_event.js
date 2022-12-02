function permSharedSecuirtyRowEvent(idmk){
	unbindobject("#adm_security_checkbox_"+idmk);
	$("#adm_security_checkbox_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_download_org_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_share_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_deposit_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_delete_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_copy_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_move_"+idm).prop('checked', true);
		} else if($(this).is(':checked') == false){
			$("#adm_sec_checkbox_view_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_download_org_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_share_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_deposit_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_delete_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_copy_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_move_"+idm).prop('checked', false);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
    });

    unbindobject("#adm_sec_checkbox_view_"+idmk);
	$("#adm_sec_checkbox_view_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
		} else if($(this).is(':checked') == false){
			$("#adm_security_checkbox_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_download_org_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_share_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_deposit_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_delete_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_copy_"+idm).prop('checked', false);
			$("#adm_sec_checkbox_move_"+idm).prop('checked', false);
		}
		if(adm_var_permission=="") adm_var_permission = idm;
		else adm_var_permission = adm_var_permission + "," + idm;
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);

    });

	unbindobject("#adm_sec_checkbox_download_"+idmk);
	$("#adm_sec_checkbox_download_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		} else {
			$("#adm_sec_checkbox_download_org_"+idm).prop('checked', false);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#adm_sec_checkbox_download_org_"+idmk);
	$("#adm_sec_checkbox_download_org_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

    unbindobject("#adm_sec_checkbox_share_"+idmk);
    $("#adm_sec_checkbox_share_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
    });

	unbindobject("#adm_sec_checkbox_deposit_"+idmk);
	$("#adm_sec_checkbox_deposit_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_download_"+idm).prop('checked', true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#adm_sec_checkbox_delete_"+idmk);
	$("#adm_sec_checkbox_delete_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

    unbindobject("#adm_sec_checkbox_copy_"+idmk);
	$("#adm_sec_checkbox_copy_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
    });

    unbindobject("#adm_sec_checkbox_move_"+idmk);
	$("#adm_sec_checkbox_move_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permselectrow(idm);
		if($(this).is(':checked') == true){
			$("#adm_security_checkbox_"+idm).prop('checked', true);
			$("#adm_sec_checkbox_view_"+idm).prop('checked', true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
    });

    unbindobject("#adm_sec_checkbox_reset_"+idmk);
	$("#adm_sec_checkbox_reset_"+idmk).bind("click", function(event){
		var id = $(this).attr("id");
		var idm = id.substring(id.lastIndexOf("_")+1);
		permdeselectrow(idm);
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
    });
}

var applyconfirmmsrc = false;
function admSaveSharedSecurityDone(){
	unbindobject("#btnapplyallconfirmdone");
	$("#btnapplyallconfirmdone").bind("click", function(event){
		admSaveSharedFolderSecurity(applyconfirmmsrc);
		hideActionPopup("applyallconfirmmodal");
		return false;
	});

	unbindobject("#btnapplyallconfirmcancel");
	$("#btnapplyallconfirmcancel").bind("click", function(event){
		hideActionPopup("applyallconfirmmodal");
		return false;
	});

	unbindobject("#btn_resetall");
	$("#btn_resetall").bind("click", function(event){
		permresetall();
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
		return false;
	});

	unbindobject("#btn_applycurrent");
	$("#btn_applycurrent").bind("click", function(event){
		applyconfirmmsrc = false;
		//showActionPopup("applyallconfirmmodal");
		var r = confirm("All changes made will be applied to only the selected folder but not the subfolders, do you wish to continue?");
		if (r == true) {
			admSaveSharedFolderSecurity(false);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
		return false;
	});

	unbindobject("#btn_applyall");
	$("#btn_applyall").bind("click", function(event){
		applyconfirmmsrc = true;
		//showActionPopup("applyallconfirmmodal");
		var r = confirm("All changes made will be applied to selected folder and its sub folders, do you wish to continue?");
		if (r == true) {
			admSaveSharedFolderSecurity(true);
		}
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
		return false;
	});

	unbindobject("#chk_selectall");
	$("#chk_selectall").bind("click", function(event){
		permselectall($(this).is(':checked'), true);
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_view");
	$("#chk_selectall_view").bind("click", function(event){
		permselectallview($(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_download");
	$("#chk_selectall_download").bind("click", function(event){
		permselectalldownload($(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_download_org");
	$("#chk_selectall_download_org").bind("click", function(event){
		permselectalldownloadoriginal($(this).is(':checked'));
		if($(this).is(':checked')) $("#chk_selectall_download").prop('checked', $(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_share");
	$("#chk_selectall_share").bind("click", function(event){
		permselectallshare($(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_deposit");
	$("#chk_selectall_deposit").bind("click", function(event){
		permselectalldeposit($(this).is(':checked'));
		permselectalldownload($(this).is(':checked'));
		if($(this).is(':checked')) $("#chk_selectall_download").prop('checked', true);
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_delete");
	$("#chk_selectall_delete").bind("click", function(event){
		permselectalldelete($(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_copy");
	$("#chk_selectall_copy").bind("click", function(event){
		permselectallcopy($(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});

	unbindobject("#chk_selectall_move");
	$("#chk_selectall_move").bind("click", function(event){
		permselectallmove($(this).is(':checked'));
		fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
	});
}

function permsearchEvent(){
	// Search all columns
	$('#example-search-input').keyup(function(){
		permcommonsearch();
	});

  	unbindobject("#btnsearchperm");
	$("#btnsearchperm").bind("click", function(event){
		/*// Search Text
		var search = $("#example-search-input").val().toLowerCase();

		// Hide all table tbody rows
		$('#tbl_permission tbody tr').hide();

		// Count total search result
		var len = $('#tbl_permission tbody tr:not(.notfound) td:contains("'+search+'")').length;

		if(len > 0){
			// Searching text in columns and show match row
			$('#tbl_permission tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
				$("#example-search-input").closest('tr').show();
			});
		}else{
			$('.notfound').show();
		}*/
	});

  	unbindobject("#searchclear");
	$("#searchclear").bind("click", function(event){
		$(this).hide();
		$('#example-search-input').val("");
		// Search Text
		var search = $(this).val().toLowerCase();

		// Hide all table tbody rows
		$('#tbl_permission tbody tr').hide();

		// Count total search result
		var len = $('#tbl_permission tbody tr:not(.notfound) td:contains("'+search+'")').length;

		if(len > 0){
			// Searching text in columns and show match row
			$('#tbl_permission tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
				$(this).closest('tr').show();
			});
		}else{
			$('.notfound').show();
		}
	});
}

// Case-insensitive searching (Note - remove the below script for Case sensitive search )
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
   return function( elem ) {
     return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
   };
});


function permRefreshTree(){
	unbindobject("#btn_refresh");
	$("#btn_refresh").click(function() {
		fetchLogo();
		if(admTreeFolderSelectedId > -1){
			fetchAllFolderListLevelDetails(true, folderType, admTreeFolderSelectedId, false, true);
			admFolderListAllService(admTreeFolderSelectedId);
		} else {
			admShowconfirmmsg(adm_messages.selecttreefolder, confirm_Error, 5000, "", false, false);
		}
	});
}

function permissionRedirectHomePage(){
	unbindobject('#drive_link');
	$('#drive_link').bind("click", function(){
		var url ='drive.html';
			winRef = window.open(url, "_self");
	});
}

/* Admin User combo box*/
$('#userSelect').change(function () {
	permcommonsearch();

});

//Dynamic Logo
var img = new Image();
var div = document.getElementById('customerLogo');


img.onload = function () {

	div.innerHTML += '<img src="' + img.src + '" style = "width="88px;" height="78px;" />';

};


img.src = 'assets/img/Google.jpg';