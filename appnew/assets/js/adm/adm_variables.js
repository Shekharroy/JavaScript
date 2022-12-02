/**
* <p>Title: adm_variables.js </p>
* <p>Module: ACMS</p>
* <p>Copyright: 2019-2020 DCirrus PVT LTD. All Rights Reserved.</p>
* <p>Company: DCirrus PVT LTD</p>
* <p>Date:25th July 2015<p>
* @version : 1.0
*/


/********************Global variable Starts***************/

var adm_FolderList=new Array();
var admUpdateAttachment = false;
var admids = 1;
var admcopyids = 1;
var admcurrentlevel = "";
var admcurrentpath = "";
var admcurrentliid = "adm_foldertreeli";
var admcurrentfolderid = "";
var admcurrentfolderstatus = "";
var admcurrentfoldertype = "";
var admcopyfolderid = "";
var admcopycurrentlevel = "";
var admcopycurrentpath = "";
var admcopycurrentliid = "";
var admcopycurrentfolderid = "";
var admcopycurrentfoldertype = "";
var admtotaldocs = 0;
var previousidm = "";
var admrowcount = 0;
var adm_emailIdTags = undefined;
var adm_emailIdArray = new Array();
var niceedithjy = undefined;
var niceedithjyinbound = undefined;
var admdidmx = "";
var admsharemgmtopened = false;
var admsharemgmtcurrentresendrow = 0;
var admziptargetselected = false;
var admsearchfoldername = "";
var copymoveaction = "copy";

var searchdocCount = 0;
var searchfolderCount = 0;
var searchName = "";

var adm_inboundshare_message = "Hi,";
adm_inboundshare_message += "\n<DOCSHAREUSERNAME> invites you to deposit your file(s).";
//adm_inboundshare_message += "\nPlease click on link below to upload your documents.";
adm_inboundshare_message += "\n\n";

var adm_share_message = "Hi,";
adm_share_message += "\n<DOCSHAREUSERNAME> has shared the files.";
//adm_share_message += "\nPlease click on links below to access the documents.";
adm_share_message += "\n\n";

var adm_documentmaxlimit = 0;
var adm_sorting = "DESC`date";
var adm_documentfetchdone = true;

var totalCopyMoveFolders = 0;
var admmoveids = undefined;
var admsharedtypeDB = "S";
var admpersonaltypeDB = "P";
var admarchivedtypeDB = "A";
var admdocidtoindex = 0;
var admNoteslength = 0;
var copydocidsoverwrite = {"docIds":[]};
var admDocumentJson = undefined;
var admFileCurrentSorting = true;
var adm_div_InboundShareCaption = "Request File Deposit for Folder : <FolderName>";
var adm_fileoverwrite = false;
var adm_casetags = undefined;

var admsharedtyperetrieved = false;
var admpersonaltyperetrieved = false;
var admarchivedtyperetrieved = false;
var copyadmsharedtyperetrieved = false;
var copyadmpersonaltyperetrieved = false;
var copyadmarchivedtyperetrieved = false;
var admRefreshDone = true;
var copyid = "copy";
var labelid = "label";
var admPersoanlFoldersList = undefined;
var admSharedFoldersList = undefined;
var admPersoanlFoldersFileCount = undefined;
var admSharedFoldersFileCount = undefined;

//added code for keeping folder permission
admPersoanlFoldersPermission = [];
admSharedFoldersPermission = [];

var admUserList = undefined;
var admMaxRows = 50;
var admsharemgmtmaxlimit = 0;
var admSelectedCaseId = 0;
var admSelectedIndexCheckbox = 0;
var admLegistDriveFolder = 0;
var norecordsfound = false;
var rearrangeAccountsList = false;
/*********************Global variable Ends****************/


/*************** AdmHTML html IDS starts *****************/
var adm_DivfixheaderId = "DivfixheaderId";
var adm_admHeader_left = "admHeader_left";
var adm_emailDashboardSettingId = "emailDashboardSettingId";
var adm_admHeader_Right = "admHeader_Right";
var adm_Search_BackIcon = "adm_Search_BackIcon";
var adm_admHeader_Right_IndexImg = "admHeader_Right_IndexImg";
var adm_admHeader_Right_DwnloadImg = "admHeader_Right_DwnloadImg";
var adm_admHeader_Right_ShareImg = "admHeader_Right_ShareImg";
var adm_admHeader_Right_trashImg = "admHeader_Right_trashImg";
var adm_admHeader_Right_PlusImg = "admHeader_Right_PlusImg";

var adm_admHeader_Right_RestoreImg = "adm_admHeader_Right_RestoreImg";
var adm_admHeader_Right_DeleteTrashImg = "adm_admHeader_Right_DeleteTrashImg";

var adm_admHeader_Right_RefreshImg = "adm_admHeader_Right_RefreshImg";
var adm_admHeader_Right_SearchImg = "adm_admHeader_Right_SearchImg";
var adm_admHeader_Right_shareImg ="openSharemanagement";
var adm_admcontentMain = "admcontentMain";
var adm_admcontentMainPage = "admcontentMainPage";
var adm_admcontentMainTitle = "admcontentMainTitle";
var adm_admAll = "admAll";
var adm_lbl="adm_lbl";
var adm_Searchlbl = "adm_Searchlbl";
var adm_admSearchAll = "adm_admSearchAll";
var adm_label="adm_label";
var adm_admWrapperId = "admWrapperId";
var adm_admWrapperTomId = "admWrapperTomId";
var adm_adm24 = "adm24";
var adm_setting_panel = "setting-panel";
var adm_admpanelPopupId = "admpanelPopupId";
var adm_admpanelPopupWrappr = "admpanelPopupWrappr";
var adm_folder1 = "folder1";
var adm_folder1l1 = "folder1l1";
var adm_folder1l2 = "folder1l2";
var adm_folder1l3 = "folder1l3";
var adm_folder2 = "folder2";
var adm_folder3 = "folder3";
var adm_folder4 = "folder4";
var adm_folder5 = "folder5";
var adm_folder6 = "folder6";
var adm_screenDimmer = "screenDimmer";
var adm_folderUL = "adm_folderUL";
var admFolderListlispan_ = "admFolderListlispan_";

var adm_admpanelWrappr = "adm_admpanelWrappr";
var adm_panelclass = "adm_panel";
var adm_panelId = "adm_panelId";
var adm_titleContnerCls = "adm_contaner";
var adm_titleContnerId = "adm_titleContnerId";

var admsharedfolderli = "admsharedfolderli";
var admpersonalfolderli = "admpersonalfolderli";
var admarchievedcasefolderli = "admarchievedcasefolderli";
var admdocviewimage_ = "admdocviewimage_";

var admaddpersonalfolderaction_ = "admaddpersonalfolderaction_";
var admeditpersonalfolderaction_ = "admeditpersonalfolderaction_";
var admdeletepersonalfolderaction_ = "admdeletepersonalfolderaction_";
var admdownloadpersonalfolderaction_ = "admdownloadpersonalfolderaction_";
var adminboundpersonalfolderaction_ = "adminboundpersonalfolderaction_";
var admtrashpersonalfolderaction_ = "admtrashpersonalfolderaction_";
var admsecurepersonalfolderaction_ = "admsecurepersonalfolderaction_";
var admindexpersonalfolderaction_ = "admindexpersonalfolderaction_";
var admoutboundfolderaction_ = "admoutboundfolderaction_";
var admrestorefolderaction_ = "admrestorefolderaction_";
var admdeletetrashfolderaction_ = "admdeletetrashfolderaction_";

var admaddsharedfolderaction_ = "admaddsharedfolderaction_";
var admeditsharedfolderaction_ = "admeditsharedfolderaction_";
var admdeletesharedfolderaction_ = "admdeletesharedfolderaction_";
var admdownloadsharedfolderaction_ = "admdownloadsharedfolderaction_";
var adminboundsharedfolderaction_ = "adminboundpersonalfolderaction_";
var admtrashsharedfolderaction_ = "admtrashpersonalfolderaction_";

var admaddarcheivedfolderaction_ = "admaddarcheivedfolderaction_";
var admeditarcheivedfolderaction_ = "admeditarcheivedfolderaction_";
var admdeletearcheivedfolderaction_ = "admdeletearcheivedfolderaction_";
var admdownloadarcheivedfolderaction_ = "admdownloadarcheivedfolderaction_";

var admFolderListul_ = "admFolderListul_";
var admsharedfilesul_ = "admsharedfilesul_";
var admpersonalfilesul_ = "admpersonalfilesul_";
var admarchivedfilesul_ = "admarchivedfilesul_";
var adm_admHeader_Caption_Id = "adm_admHeader_Caption_Id";
var adm_admWrapperIframeId = "adm_admWrapperIframeId";
var adm_admWrapperIframeIdShow = "adm_admWrapperIframeIdShow";
var adm_fileuploadId = "adm_fileuploadId";
var admuploadtrid_ = "admuploadtrid_";
var adm_div_CreateFolderPopup = "adm_div_CreateFolderPopup";
var adm_img_CreateFolderPopClose = "adm_img_CreateFolderPopClose";
var adm_span_CreateFolder_popup = "adm_span_CreateFolder_popup";
var adm_CreateFolderBtnSave = "adm_CreateFolderBtnSave";
var adm_folder_name = "adm_folder_name";
var admfilelistname_ = "admfilelistname_";
var admfilesign_ = "admfilesign_";
var admfilelock_ = "admfilelock_";
var admfileversionname_ = "admfileversionname_";
var admspancopymove = "admspancopymove";
var adm_list_folder_checkbox_ = "adm_list_folder_checkbox_";
var adm_folder_div_name_ = "adm_folder_div_name_";
var admcopyfolder_ = "admcopyfolder_";
var admsharedtype = "S";
var admpersonaltype = "P";
var admarchivedtype = "archived_";
var admlistulid = "admlistulid";
var admlistfoldercheckbox_ = "admlistfoldercheckbox_";
var adm_IndexBtnSave = "adm_IndexBtnSave";
var adm_descriptiondiv = "adm_descriptiondiv";
var adm_tagsdiv_ = "adm_tagsdiv_";
var adm_tagsdiv_ = "adm_tagsdiv_";
var adm_tagsId = "adm_tagsId";
var adm_notesdiv_ = "adm_notesdiv_";
var adm_noteuserinfo_ = "adm_noteuserinfo_";
var adm_notesId_ = "adm_notesId_";
var adm_notesadd_ = "adm_notesadd_";
var adm_notestrash_ = "adm_notestrash_";
var adm_notesauthor_ = "adm_notesauthor_";
var adm_notesdate_ = "adm_notesdate_";
var adm_notesauthordiv_ = "adm_notesauthordiv_";
var adm_notesdatediv_ = "adm_notesdatediv_";
var admdocumenttype = "admdocumenttype";
var admvieweingrightsId = "admvieweingrightsId";
var adm_tagsselectdiv_ = "adm_tagsselectdiv_";
var adm_tagslist = "adm_tagslist";
var adm_sharedays = "adm_sharedays";
var adm_sharereadonly = "adm_sharereadonly";
var adm_shareprint = "adm_shareprint";
var adm_shareinfinite = "adm_shareinfinitet";
var adm_outboundwatermark = "adm_outboundwatermark";

var adm_sharemobile = "adm_sharemobile";
var adm_shareemail = "adm_shareemail";

var admbuckettypelist = "admbuckettypelist";
var admcaselist = "admcaselist";
var admFileNameCaptionId = "admFileNameCaptionId";
var admFileVersionCaptionId = "admFileVersionCaptionId";
var admFileTypeCaptionId = "admFileTypeCaptionId";
var admFileCreatedCaptionId = "admFileCreatedCaptionId";
var admFileModifiedCaptionId = "admFileModifiedCaptionId";
var admFileModifiedByCaptionId = "admFileModifiedByCaptionId";
var admFileSizeCaptionId = "admFileSizeCaptionId";
var admFileNameDescImg = "admFileNameDescImg";
var admFileVersionDescImg = "admFileVersionDescImg";
var admFileTypeDescImg = "admFileTypeDescImg";
var admFileCreatedDescImg = "admFileCreatedDescImg";
var admFileModifiedDescImg = "admFileModifiedDescImg";
var admFileModifiedByDescImg = "admFileModifiedByDescImg";
var admFileSizeDescImg = "admFileSizeDescImg";
var adm_div_HeaderShareCaptionId = "adm_div_HeaderShareCaptionId";

var adm_div_InboundDocPopup = "adm_div_InboundDocPopup";
var adm_img_InboundShareDocPopClose = "adm_img_InboundShareDocPopClose";
var adm_div_InboundShareCaptionId = "adm_div_InboundShareCaptionId";
var adm_img_InboundShareSave = "adm_img_InboundShareSave";
var adm_img_InboundShareSave_Resend = "adm_img_InboundShareSave_Resend";
var adm_Inboundsubject = "adm_Inboundsubject";
var adm_InboundShareDocTextEditor = "adm_InboundShareDocTextEditor";
var adm_InboundhtmlEditor = "adm_InboundhtmlEditor";
var adm_InboundShareComposeTo = "adm_InboundShareComposeTo";
var adm_InboundemailComposeTo = "adm_InboundemailComposeTo";
var adm_inboundfolderselected_span = "adm_inboundfolderselected_span";
var admdownloaddiv = "admdownloaddiv";
var admdownloadids_ = "admdownloadids_";
var admFolderImg_ = "admFolderImg_";
var admmaximizeviewer = "admmaximizeviewer";

var adm_div_InboundShareCaption = "Request File Deposit for Folder : <FolderName>";

var adm_sharedsecurityfolderpopup = "adm_sharedsecurityfolderpopup";
var adm_sharedsecurityfolderpopup_close = "adm_sharedsecurityfolderpopup_close";
var adm_sharedfoldersecdon = "adm_sharedfoldersecdone";
var adm_userpopuplist = "adm_userpopuplist";
var adm_userpopupcheckbox_ = "adm_userpopupcheckbox_";
var adm_userpopupdivlist_ = "adm_userpopupdivlist_";
var adm_userpopupselectall = "adm_userpopupselectall";
var adm_userpopupselectdownload_ = "adm_userpopupselectdownload_";
var adm_userpopupselectoutboundshare_ = "adm_userpopupselectoutboundshare_";
var adm_userpopupselectinboundshare_ = "adm_userpopupselectinboundshare_";
var adm_userpopupselectdelete_ = "adm_userpopupselectdelete_";
var adm_userpopupselectcopy_ = "adm_userpopupselectcopy_";
var adm_userpopupselectmove_ = "adm_userpopupselectmove_";

var adm_navpanel = "nav-panel";
var adm_sharedfoldersecdone = "adm_sharedfoldersecdone";

var adm_fixed_header = "fixed-header";
var adm_page_search_row = "page-search-row";

var adm_div_ZipListPopup = "adm_div_ZipListPopup";
var adm_navpanel_zip_index = "adm_navpanel_zip_index";
var adm_div_zip_FolderULList = "adm_div_zip_FolderULList";
var admpersonalfilesul_zip_= "admpersonalfilesul_zip_";
var adm_navpanel_zip_index_a = "adm_navpanel_zip_index_a";
var adm_img_ZipListPopClose = "adm_img_ZipListPopClose";
var admspanzip = "admspanzip";
var adm_ZipBtnSave = "adm_ZipBtnSave";
var adm_ZipExtractTo = "adm_ZipExtractTo";
var adm_ZipExtractClose = "adm_ZipExtractClose";
var adm_ZipExtractHere = "adm_ZipExtractHere";
var adm_ZipSelectFolder = "adm_ZipSelectFolder";
var adm_ZipPopupDetails = "adm_ZipPopupDetails";
var admlistulidzip = "admlistulidzip";
var adm_ZipTree = "adm_ZipTree";
var admZipFolderListlidl_ = "admZipFolderListlidl_";
var admZipFolderListlidlul_ = "admZipFolderListlidlul_";
var admZipFolderListlispan_ = "admZipFolderListlispan_";
var admZiplistfoldercheckbox_ = "admZiplistfoldercheckbox_";
var admlistulidzip_li = "admlistulidzip_li";
var adm_FolderListli_zip_ = "adm_FolderListli_zip_";
var admFolderListlispan_zip_ = "admFolderListlispan_zip_";
var admlistfoldercheckbox_zip_ = "admlistfoldercheckbox_zip_";
var adm_FolderUl_zip_ = "adm_FolderUl_zip_";
var adm_Zip_Checkbox = "adm_Zip_Checkbox";
var adm_Zip_Checkbox_lbl = "adm_Zip_Checkbox_lbl";
/************** Adm HTML html IDS ends *****************/


/************ Adm HTML html Classes starts *************/
var adm_tableCls = "table";
var adm_fixheaderCls = "fixheader";
var adm_headerLeftCls = "header-left";
var adm_uiLinkCls = "ui-link";
var adm_headerRightCls = "header-right";
var adm_uiContentCls = "ui-content";
var adm_pageAdmCls = "page-adm";
var adm_admTitleCls = "adm-title";
var adm_boldCls = "bold";
var adm_admitomCls = "admitom";
var adm_admCheckboxCls = "adm_checkbox";

var adm_flagnameCls = "adm_flagname";
var adm_tagnameCls = "adm_tagname";
var adm_versionnameCls = "adm_versionname";
var adm_admFilenameCls = "adm_filename";
var adm_ld_filename="ld_filename";
var adm_admFiletypeCls = "adm_filetype";
var adm_admDateCls = "adm_date";
var adm_admModifiedCls = "adm_modified";
var adm_admFilesizeCls = "adm_filesize";
var adm_admWrapperCls = "adm_wrapper";
var adm_contentMdCls = "content-md";
var adm_admpanelPopupCls = "admpanel-popup";
var adm_wrapperCls = "wrapper";
var adm_clearCls = "clear";
var adm_actionlinkcls = "adm_actionlink";
var adm_verion_controlCls = "version_control";
var adm_dockViewcheckCls = "dock_viewcheck";
var adm_chkboxCls = "chkbox";
var adm_checkboxcustomCls = "adm_checkboxcustom";
var adm_chklblCls = "chklbl";
var adm_docketaddCls = "docketadd";
var adm_nopaddingCls = "nopadding";
var adm_udv_versionCls = "udv_version";
var admlistulCls = "panel_scroll";
var admnotestxtcls = "admnotestxt";
var admsharesubjectpaddingCls = "admsharesubjectpadding";
var admsharenoofdayspaddingCls = "admsharenoofdayspadding";
var admsharecomposeCls = "admsharecompose";
var admnotemaindivCls = "admnotemaindiv";
var admmoreaddCls = "more_add";
var admcopycheckCls = "copy-check";
var admpoppadCls = "poppad";
var admviewerpopupboxCls = "viewer_popupbox";
var adm_copycheckboxcustomCls = "copycheckboxcustom";
/************ AdmHTML html Classes ends **************/

/*************Dynamica Html Id Starts****************/
var admFolderFileslispan_ = "admFolderFileslispan_";
var admFolderListli_="admFolderListli_";
var admFolderListlidl_ = "admFolderListlidl_";
var admFolderListlidldd_ = "admFolderListlidldd_";
var admDocListUL_ = "admDocListUL_";
var admDocListCheckBox_ = "admDocListCheckBox_";
var admcontentMainTitleTom_ = "admcontentMainTitleTom_";
var admdocdownload_ = "admdocdownload_";
var admtotalfilesheader = "admtotalfilesheader";
/***************Dynamica Html Id End*****************/

var admdocrowicons_ = "admdocrowicons_";
var admdocrowiconsedit_ = "admdocrowiconsedit_";
var admdocrowiconscopy_ = "admdocrowiconscopy_";
var admdocrowiconsmove_ = "admdocrowiconsmove_";
var admdocrowiconsdownload_ = "admdocrowiconsdownload_";
var admdocrowiconsshare_ = "admdocrowiconsshare_";
var admdocrowiconsdelete_ = "admdocrowiconsdelete_";
var admdocrowiconsrestore_ = "admdocrowiconsrestore_";
var admdocrowresticons_ = "admdocrowresticons_";
var admdocrowiconstrash_ = "admdocrowiconstrash_";
var copydocid = 0;
var copydids = "";

/************adm Popup class and Id Start************/
var adm_frCls = "fr";
var adm_flCls = "fl";
var adm_tagitCls = "tagit";
var adm_uiSortableCls = "ui-sortable";
var adm_popupboxCls = "popupbox";
var adm_popuphdCls = "popup-hd";
var adm_popup_boxCls = "adm-popup-box";
var adm_popup_box_overflowCls = "adm-popup-box-overflow";
var adm_form_popcontrolCls = "form-popcontrol";

var adm_imgBack1 ="adm_imgBack1";
var adm_div_ShareDocPopup ="adm_div_ShareDocPopup";
var adm_img_ShareDocPopClose = "adm_img_ShareDocPopClose";
var adm_div_HeaderShareCaption = "Share";
var adm_img_ShareDocSave = "adm_img_ShareDocSave";
var adm_span_ShareDocSave = "adm_span_ShareDocSave";
var adm_span_ShareDocSave_resend = "adm_span_ShareDocSave_resend";
var adm_img_ShareDocSave_resend = "adm_img_ShareDocSave_resend";
var adm_remove_scrollCls = "remove_scroll";
var adm_popupwrapCls = "popupwrap";
var adm_whitebackgroundtopbottommargin5Cls = "whitebackgroundtopbottommargin5";
var adm_ShareDocComposeTo = "adm_ShareDocComposeTo";
var adm_ShareDocAddNumber = "adm_ShareDocAddNumber";
var adm_ShareDocAddNumberList = "adm_ShareDocAddNumberList";
var adm_InboundShareDocAddNumber = "adm_InboundShareDocAddNumber";
var adm_InboundShareDocAddNumberList = "adm_InboundShareDocAddNumberList";
var adm_emailComposeTo ="adm_emailComposeTo";
var adm_subject = "adm_subject";
var adm_ShareDocTextEditor = "adm_ShareDocTextEditor";
var adm_htmlEditor ="adm_htmlEditor";
var admpersonalfilesul_share_ = "admpersonalfilesul_share_";
var adm_admWrapperId_share = "adm_admWrapperId_share";
var adm_admWrapperId_folder_share = "adm_admWrapperId_folder_share";
var adm_FolderListli_share_ = "adm_FolderListli_share_";
var admFolderListlispan_share_ = "admFolderListlispan_share_";
var adm_FolderUl_share_ = "adm_FolderUl_share_";
var adm_outbound_folder_selected = "adm_outbound_folder_selected";
var adm_outbound_file_selected = "adm_outbound_file_selected";

var adm_div_IndexDocPopup = "adm_div_IndexDocPopup";
var adm_img_IndexDocPopClose = "adm_img_IndexDocPopClose";
var adm_div_HeaderIndexCaption = "Index";
var adm_legistindexcopy = "adm_legistindexcopy";
var adm_legistindexmove = "adm_legistindexmove";
var adm_legistindexcopylbl = "adm_legistindexcopylbl";
var adm_legistindexmovelbl = "adm_legistindexmovelbl";
/***************adm Popup class and Id End****************/

/********************ADM Browse Id Start******************/
var adm_File_image = "contact_image";
var adm_browsecontactCls = "browsecontact";
var adm_my_file = "my_file";
var adm_galleryPopup = "adm_galleryPopup" ;
/********************ADM Browse Id End********************/

/***************Adm Header Icon Title Start****************/
var adm_inbound_Share_title ="Request File Deposit";
var adm_addNew_Folder_title ="Add Folder";
var adm_edit_title =  "Edit";
var adm_delete_title = "Delete";
var adm_Share_title = "Share";
var adm_Restore_title = "Restore";
var adm_Trash_Delete_title = "Delete Completely";
var adm_Share_secuirty_title ="User Permission";
var adm_Index_Folder_title = "Index Folder";
var adm_Share_Folder_title = "Share Folder";
var adm_Share_Mangement_title = "Share Management";
var adm_Attach_title = "Browse";
var adm_Download_title = "Download";
var adm_Inedx_title = "Move Document to Case";
var admLegistCaption = "";
var adm_Refresh_title = "Refresh";
var adm_Search_title = "Search";
/***************Adm Header Icon Title End*****************/

/************** ADM html Index Popup IDS starts *************/
var adm_admIndexed = "admIndexed";
var adm_admIndexedpopupId = "admIndexedpopupId";
var adm_closeIndexed = "closeIndexed";
var adm_navpanel_index= "adm_navpanel_index";
var adm_navpanel_index_a = "adm_navpanel_index_a";
var amd_div_FolderULList = "amd_div_FolderULList";
var adm_admIndexedpopupboxId = "admIndexedpopupboxId";
var adm_docket_viewerwrapId = "docket_viewerwrapId";
var adm_docket_DetailewrapId = "docket_DetailewrapId";
var adm_documenttypeId = "documenttypeId";
var adm_vieweingrightsId = "vieweingrightsId";
var adm_sensityvityslctId = "sensityvityslctId";
var adm_sourceId = "sourceId";
var adm_descriptionId = "descriptionId";
var adm_AuthorId = "AuthorId";
var adm_CustodianId = "CustodianId";
var adm_fillingDateId = "fillingDateId";
var adm_meaningfullId = "meaningfullId";
var adm_notesId = "notesId";
var adm_fileTypeId = "fileTypeId";
var adm_fileSizeId = "fileSizeId";
var adm_indexDateId = "indexDateId";
var adm_indexdateById = "indexdateById";
var adm_UpdateId = "UpdateId";
var adm_updateById = "updateById";
var adm_admviewhd_id = "admviewhd_id";
var adm_viewhdArrowLeft_Id = "viewhdArrowLeft_Id";
var adm_viewhdArrowUp_Id = "viewhdArrowUp_Id";
var adm_viewhdArrowDelete_Id = "viewhdArrowDelete_Id";
var adm_viewhdUpload_Id = "viewhdUpload_Id";
var adm_viewhdDownload_Id = "viewhdDownload_Id";
var adm_docviewerboxId = "docviewerboxId";
var adm_move_title = "Move to another folder";
var adm_copy_title = "Copy to folder";
var adm_img_Copy = "adm_img_Copy";
var adm_img_edit_file = "adm_img_edit_file";
var adm_img_MoveToFolder = "adm_img_MoveToFolder";

//Move popup
var adm_div_MoveListPopup = "adm_div_MoveListPopup";
var adm_img_MoveListPopClose = "adm_img_MoveListPopClose";
var adm_span_Move_popup ="adm_span_Move_popup";
var adm_img_MoveListSave = "adm_img_MoveListSave";
var adm_MovePopupDetails = "adm_MovePopupDetails";
var adm_MoveBtnSave = "adm_MoveBtnSave";
//Copy popup
var adm_div_CopyListPopup = "adm_div_CopyListPopup";
var adm_img_CopyListPopClose = "adm_img_CopyListPopClose";
var doc_span_folder_popup ="doc_span_folder_popup";
var adm_img_CopyListSave = "adm_img_CopyListSave";
var adm_CopyPopupDetails = "adm_CopyPopupDetails";
var adm_CopyBtnSave = "adm_CopyBtnSave";

var adm_viewer_caption_popup = "adm_viewer_caption_popup";
var adm_Viewer = "adm_Viewer";
var adm_admViewerpopupId = "adm_admViewerpopupId";
var adm_closeViewer= "adm_closeViewer";
var adm_viewerboxid= "adm_viewerboxid";
var adm_viewerprogressbar = "adm_viewerprogressbar";
var admFilingDateCaption = "admFilingDateCaption";
var admindexpopupspantitle = "admindexpopupspantitle";

var adm_PanelPopupCls = "panel-popup";
var adm_TreeCls = "tree";
var adm_TreeCopyCls = "tree_copy";
var adm_TreeZipCls = "tree_zip";
var adm_ShowAdmoptionCls = "show_admoption";
var adm_ShowAdmOptionsULCls = "adm_ShowAdmOptionsUL";
var admfilelistnamek_ = "admfilelistnamek_";
var admfileversionnamek_ = "admfileversionnamek_";
var admfilelisttype_ = "admfilelisttype_";
var adm_FolderListli_ = "adm_FolderListli_";
var adm_FolderListlihref_ = "adm_FolderListlihref_";
var adm_FolderListlihrefspan_ = "adm_FolderListlihrefspan_";
var adm_FolderListlispan_ = "adm_FolderListlispan_";
var adm_FolderUl_= "adm_FolderUl_";
var adm_div_FolderULList = "adm_div_FolderULList";
var adm_navpanel_id = "adm_navpanel_id";
var adm_paging = "adm_paging";
var adm_firstpage = "adm_firstpage";
var adm_previouspage = "adm_previouspage";
var adm_nextpage = "adm_nextpage";
var adm_lastpage = "adm_lastpage";

var admfiletagname_ = "admfiletagname_";
var admfiletagnamek_ = "admfiletagnamek_";
var admfileflagname_ = "admfileflagname_";
var admfileflagnamek_ = "admfileflagnamek_";
/************** ADM html Index Popup IDS End ****************/


/*********** ADM html Index Popup Classes starts ***********/
var adm_mandatory_input="mandatory_input";//change by buddhi on 19 aug

// for search
var adm_SearchFileNameid = "adm_SearchFileNameid";
var adm_SearchFileTypeid = "adm_SearchFileTypeid";
var adm_SearchCreatedDateid = "adm_SearchCreatedDateid";
var adm_SearchModifiedDateId = "adm_SearchModifiedDateId";
var adm_SearchModifiedById = "adm_SearchModifiedById";
var adm_SearchFileSizeId = "adm_SearchFileSizeId";
var adm_SearchDivId = "adm_SearchDivId";


var adm_popbtnCls = "popbtn";
var adm_popupboxCls = "popupbox";
var adm_popupboxviewerinitCls = "popupboxviewerintt";
var adm_iframepopupCls = "iframepopup";
var adm_close_pop_Cls = "close_pop_Cls";
var adm_closeIframeCls = "closeIframe";
var adm_popupHdCls = "popup-hd";
var adm_flCls = "fl";
var adm_frCls = "fr";
var adm_popupBoxCls = "popup-box";
var adm_pt5Cls = "pt5";
var adm_docketViewerwrapCls = "docket_viewerwrap";
var adm_docketdetailWrapCls = "docketdetail_wrap";
var adm_formControlCls = "form-control";
var adm_cllCls = "cll";
var adm_captionallCls = "captionall";
var adm_tooltipCls = "tooltip";
var adm_mobcapCls = "mobcap";
var adm_calloutCls = "callout";
var adm_clrCls = "clr";
var adm_inpulableCls = "inpulable";
var adm_cellCls = "cell";
var adm_pb5Cls = "pb5";
var adm_docselectoptionCls = "docselectoption";
var adm_cllrCls = "cllr";
var adm_docketviewWrapCls = "docketview_wrap";
var adm_docviewhdCls = "docviewhd";
var adm_docbynameCls = "docbyname";
var adm_docviewerboxCls = "docviewerbox";
var adm_clearCls = "clear";

var adm_admbynameCls = "admbyname";
var adm_admview_wrap= "admview_wrap";
var adm_admviewerbox = "admviewerbox";
var adm_iframeCls = "iframeclass";
var adm_progressbarcls = "admprogressbar";

var adm_SlideLeftClassCls = "slide-left-class";
var adm_UiPanelFixedCls = "ui-panel-fixed";

var adm_notestxtcls = "admnotestxt";
var adm_ld_copy_checkCls = "ld_copy_check";
var adm_userlist_Cls = "adm_userlist_Cls";
var adm_copycheckboxzip_Cls = "copycheckboxzipCls";

var adm_hot_icon = "flag_red_new_cls";
var adm_unhot_icon = "flag_new_cls";

/*********** ADM html Index Popup Classes End ************/

var adm_ContnerHdrInfoCls = "adm_info";
var adm_pl10Cls = "pl10";
var adm_mCSimgloadedCls = "mCS_img_loaded";
var adm_share_to_caption = "To";
var adm_header_caption = "DCirrus Drive";

var adm_popfix_title_Cls = "popfix-title";
var adm_popup_title_Cls = "popup-title";
var adm_ld_user_check_Cls = "ld_user_check";
var adm_chkbox_white_Cls = "chkbox_white";
var adm_chklbl_white_Cls = "chklbl_white";
var adm_ld_user_name_Cls = "ld_user_name";
var adm_ld_user_email_Cls = "ld_user_email";
var adm_ld_userlist_Cls = "ld_userlist";
var adm_ld_user_check_Cls = "ld_user_check";
var adm_userpopupcheckboxcustom_Cls = "adm_userpopupcheckboxcustom";
var adm_sharedsecuirtycustomadmin_Cls = "adm_sharedsecuirtycustomadmin_Cls";

/************* Service URL starts *****************/
var admFolder_FolderListURL = "/v1/app/unindexfolderlistg/0/<MAXLIMIT>/<FOLDERTYPE>/<ACTION>";
var admFolder_FolderFullListURL = "/v1/app/unindexdoclist/0/<MAXLIMIT>/<FOLDERID>/<SORTING>/<ACTION>";
//var admDeleteDocsURL = "/v1/app/unindexdocdel/0/<DOCID>/<ACTION>";
var admDeleteDocsURL = "/v1/app/unindexdocdellist/0/<ACTION>";
var admDeleteDocsPermanentURL = "/v1/app/unindexdocdellist/0/permanent/<ACTION>";
var admDownloadDocsURL = "/v1/app/unindexdocdownload/0/<DOCID>/<ACTION>";
var admDownloadDocsFromURL = "/v1/app/docdownloadlist/0/downloadFile/";
var admViewerDocsURL = "/v1/app/unindexdocviewer/0/<DOCID>/<ACTION>";
var admViewerDocsNewURL = "/v1/app/unindexdocviewer/0/<DOCID>/<VIEWERTYPE>/<ACTION>";
var admViewerDocsVersionURL = "/v1/app/unindexdocviewer/0/version/<DOCID>/<VERSIONID>/<VIEWERTYPE>/<ACTION>";
//var admFolderAddURL = "/v1/app/unindexdocauthadd/<ACTION>";
var admFolderAddURL = "/v1/app/unindexfolderaddauth/0/web/<ACTION>";
var admFolderRenameURL = "/v1/app/unindexdocfolderrename/0/<ACTION>";
var admFileRenameURL = "/v1/app/unindexdocfolderrename/0/file/<ACTION>";
var admFolderDeleteURL = "/v1/app/unindexfolderdel/0/<FOLDERID>/<ACTION>";
var admFolderActDeleteURL = "/v1/app/unindexfolderdeleteg/0/<FOLDERID>/<ACTION>";
var admTempFolderActDeleteURL = "/v1/app/unindexfolderdeleteg/0/temp/<ACTION>";
var admFolderRestoreURL = "/v1/app/unindexfolderrestorelist/0/<FOLDERID>/<ACTION>";
var admUploadFileURL = "/v1/app/unindexdocupload/0/<LAWFIRMID>/<UERID>/<DEVICEID>/<ID>/<LEVEL>/<UPLOADTRID>/<FOLDERID>/<FOLDERTYPE>/<FOLDERPATH>/<ACTION>";
var admContactListURL = "/v1/app/shareemaillistcache/0/<ACTION>";
var admShareDocAddURL = "/v1/app/unindexdocshare/0/<DATENEW>/<ACTION>";
var admCopyMoveDocURL = "/v1/app/unindexdoccpmv/0/<ACTION>";
var admTypeListURL = "/v1/app/doctypelist/0/<ACTION>";
var admCaseListURL = "/v1/app/csls/0/<ACTION>";
var admBucketListURL = "/v1/app/csfolderls/0/<CASEID>/<ACTION>";
var admSensityvityListURL = "/v1/app/cssensitivity/0/<ACTION>";
var admViewingRightsListtURL = "/v1/app/csviewingrights/0/<ACTION>";
var admCaseTagListURL = "/v1/app/cstagls/0/<CASEID>/<ACTION>";
var admDocumentIndexURL = "/v1/app/unindexatttocase/0/<ACTION>";
var admCaseTagListURL = "/v1/app/cstagls/0/<CASEID>/<ACTION>";
var admCheckFileExistsInDriveURL = "/v1/app/unindexfilecopycheck/0/<ACTION>";
var admCreateInboundURL = "/v1/app/unindexotpadd/0/<ACTION>";
//var admSearchURL = "/v1/app/unindexdocsearch/<ACTION>";
var admShareEmailAddURL = "/v1/app/shareemailaddcache/0/<ACTION>";
var admCountFolderDocuments = "/v1/app/unindexfolderdoccount/0/<FOLDERID>/<ACTION>";
var admVersionFileDateUpdate = "/v1/app/unindexdocfileupdatedate/0/<ACTION>";
var admfetchContactListBySync = "/v1/app/user/0/list/<LAWFIRMID>/<ACTION>";
var admAddSharedFolderSecurity = "/v1/app/unindexfoldersecurityadd/0/<ACTION>";
var admUpdateSharedFolderSecurity = "/v1/app/unindexfoldersecurityupdate/0/<ACTION>";
var admDeleteSharedFolderSecurity = "/v1/app/unindexfoldersecurityadd/0/delete/<ACTION>";
var admFetchSharedFolderSecurity = "/v1/app/unindexfoldersecurityfetch/0/<FOLDERID>/<ACTION>";
var admFetchSharedFolderUserSecurity = "/v1/app/unindexfoldersecurityfetch/0/user/<FOLDERID>/<ACTION>";
var admFetchOutboundShareList = "/v1/app/unindexoutboundharemgmt/0/<CASEID>/<MAXLIMIT>/<SORTBY>/<SORTTYPE>/<ACTION>";
var admDeleteOutboundShareList = "/v1/app/sharelogindelete/0/<CASEID>/<ID>/<ACTION>";
var admResendOutboundShareRequest = "/v1/app/unindexoutboundshareresend/0/<CASEID>/<SHARELOGINID>/<ACTION>";
var admfetchSingleDocument = "/v1/app/unindexdoclist/0/<DOCID>/<ACTION>";
var admfetchSingleCPDocument = "/v1/app/unindexdoclist/0/<DOCID>/<CPID>/<ACTION>";

var admFetchInboundShareList = "/v1/app/unindexinboundharemgmt/0/<MAXLIMIT>/<SORTBY>/<SORTTYPE>/<ACTION>";
var admDeleteInboundShareList = "/v1/app/unindexinboundharemgmtdelete/0/<ID>/<ACTION>";
var admResendInboundShareRequest = "/v1/app/unindexinboundshareresend/0/<SHARELOGINID>/<ACTION>";
var admDocumentCaseFoldersURL = "/v1/app/csfolderls/0/<CASEID>/<PARENTFOLDERID>/<ACTION>";
var admDocumentFoldersListURL = "/v1/app/unindexfolderlistg/0/<SHARELOGINID>/<ACTION>";
var admOutboundShareAllowDownloadURL = "/v1/app/updateallowdownloadshare/0/<CASEID>/<SHARELOGINID>/<ALLOWDOWNLOAD>/<ACTION>";
var admOutboundShareAllowUploadURL = "/v1/app/updateallowdownloadshare/0/allowUpload/<CASEID>/<SHARELOGINID>/<ALLOWUPLOAD>/<ACTION>";
var admOutboundShareToSignURL = "/v1/app/updateallowdownloadshare/0/toSign/<CASEID>/<SHARELOGINID>/<TOSIGN>/<ACTION>";
var admOutboundShareAllowPrintURL = "/v1/app/updateallowprintshare/0/<CASEID>/<SHARELOGINID>/<ALLOWDOWNLOAD>/<ACTION>";
var admFetchOutboundShareInfoURL = "/v1/app/outboundhsredetailsbyid/0/<CASEID>/<SHARELOGINID>/<ACTION>";
var admFetchInboundShareInfoURL = "/v1/app/unindexshareaccessbyid/0/<SHARELOGINID>/<ACTION>";
var admFetchZipFileInfoURL = "/v1/app/unindexzipfetchcontent/0/<DOCID>/<ACTION>";
var admZipFileExtractURL = "/v1/app/unindexzipextract/0/<DOCID>/<ACTION>";
var admFetchFolderListByParentURL = "/v1/app/unindexfolderlistbyparentid/0/<PARENTFOLDERID>/<FOLDERTYPE>/<ACTION>";

var admMakeImportantURL = "/v1/app/unindexdocupdateflagimp/0/<DOCID>/<FLAG>/<ACTION>";
var admFetchTagsURL = "/v1/app/unindexdoctaglist/0/<DOCID>/<ACTION>";
var admDeleteTagsURL = "/v1/app/unindexdoctagdelete/0/<TAGID>/<ACTION>";
var admAddTagsURL = "/v1/app/unindexdoctagadd/0/<ACTION>";

var admVersionAddURL = "/v1/app/unindexdocupload/0/addversion/<LAWFIRMID>/<UERID>/<DEVICEID>/<ID>/<LEVEL>/<UPLOADTRID>/<FOLDERID>/<FOLDERTYPE>/<FOLDERPATH>/<FILEID>/<ACTION>";
var admFetchVersionsURL = "/v1/app/unindexdocversionlist/0/<DOCID>/<ACTION>";
var admVersionsDeleteURL = "/v1/app/unindexdocversiondelete/0/<VERSIONID>/<ACTION>";
var admSearchURL = "/v1/app/unindexdocadvsearch/0/<ACTION>";

var admrestoreTrashedDocsURL = "/v1/app/unindexdocrestorelist/0/<ACTION>";
var admPermanentDeleteDocsURL = "/v1/app/unindexdocdelperm/0/<ACTION>";

var admdownloadzip = "/v1/app/unindexdocdownload/0/zip/<ACTION>";
var admdownloadfolderzip = "/v1/app/unindexdocdownload/0/zipfolder/<FOLDERID>/<ACTION>";
var admdownloaddeletefolderzip = "/v1/app/unindexdocdownload/0/zipfolderdelete/<ACTION>";
var admUploadAnnnotatedDocsURL = "/v1/app/unindexdocupload/0/web/savedocchanges/<ACTION>";
var admUploadDocumentToLockURL = "/v1/app/unindexdocupdate/0/lock/<ACTION>";
var admUploadDocumentToSignURL = "/v1/app/unindexdocupdate/0/signed/<ACTION>";
var admDocFolderUpdateURL = "/v1/app/unindexdocfolderupdate/0/<ACTION>";
var admUploadNewFileURL = "/v1/app/unindexdocupload/0/newauth/<FOLDERID>/<FOLDERPATH>/<FOLDERTYPE>/<ACTION>";
var admFolderCreateNestedURL = "/v1/app/unindexfolderaddauth/0/check/web/new/atc";
var admDocMetaAddURL = "/v1/app/unindexdocadd/0/desktop/<ACTION>";
var admDocMetaAddVersionURL = "/v1/app/unindexdocversionadd/0/desktop/<ACTION>";
var admFolderListOnlyURL = "/v1/app/unindexfolderlistg/0/byparent/<PARENTID>/<FOLDERTYPE>/<ACTION>";
var admShareInfoURL = "/v1/app/unindexshareinfo/0/<ID>/<ACTION>";

var admZeroFolderListOnlyURL = "/v1/app/unindexfolderlistg/0/zerolevel/web";
var admSingleUserProfileURL = "/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";
var admSaveUserProfileURL = "/v1/app/contactupdate/0/contactname/<ACTION>";
var admSaveUserPhoneURL = "/v1/app/contactphoneupd/0/<ACTION>";
var admSaveUserFaxURL = "/v1/app/contactfaxupd/0/<ACTION>";
var admAddUserPhoneURL = "/v1/app/contactphoneadd/0/<ACTION>";
var admAddUserFaxURL = "/v1/app/contactfaxadd/0/<ACTION>";
var admAddUserPictureURL = "/v1/app/contactimgupd/0/<ACTION>";
var admStorageLeftURL = "/v1/app/fetchstoragespace/0/<ACTION>";
var admFetchProjectIndexURL = "/v1/app/gen/0/projectindex/<FOLDERID>/<FOLDERTYPE>/<TIMEZONE>/<ACTION>";
var admRebuildProjectIndexURL = "/v1/app/gen/0/projectindex/rebuild/<FOLDERTYPE>/<ACTION>";
var admTreeListURL = "/v1/app/unindexfolderlistg/0/allfolderbytype/<FOLDERID>/<FOLDERTYPE>/<ACTION>";
var admTreeListSelectedFolderURL = "/v1/app/unindexfolderlistg/0/folderbypaths/<ACTION>";
var admfetchFolderSizeURL = "/v1/app/unindexdocdownload/0/fetchfoldersize/<FOLDERID>/<ACTION>";
var admNotifOptionsURL = "/v1/app/notifmaster/0/fetch/<ACTION>";
var admNotifSettingsURL = "/v1/app/notifsettings/0/fetch/<ACTION>";
var admNotifSettingsAddURL = "/v1/app/notifsettings/0/add/<ACTION>";
var admNotifSettingsUpdateURL = "/v1/app/notifsettings/0/update/<ACTION>";
var admFolder_Security_CheckURL = "/v1/app/unindexfoldersecurityfetch/0/byuser/<FOLDERID>/<ACTION>";
var admSingleFolderInfoURL = "/v1/app/unindexfolderlistg/0/folderbyid/<ACTION>";
var admOTPSaveRecord = "/v1/app/uts/0/update/<ACTION>";
var admUpdateNoofFileFolderRecord = "/v1/app/unindexfolderupdatenooffiles/0/<ACTION>";
var admUpdateStorageProvider = "/v1/app/lawfirmstorage/0/save/<ACTION>";
var admSaveFolderSizeSingleFolderIdURL = "/v1/app/updatefoldersize/0/singlefolder/<ACTION>";
var admDownloadFolderLinkURL = "/v1/app/unindexdocdownload/0/downloadzipfolder/<FILEANME>";
var admgenerateDownloadFolderLinkURL = "/v1/app/unindexdocdownload/0/async/gendownloadfolderlink/<FOLDERID>/<ACTION>";
var admfetchFilePermissionURL = "/v1/app/unindexdoclist/0/fetch/doc/permission";
var admActiveLoginIdsURL = "/v1/app/user/0/fetch/loginid/active/list";
var admAddFilePermissionURL = "/v1/app/unindexdoclist/0/add/delete/doc/permission";
var admDocChangeStorageClasseURL = "/v1/app/unindexdoclist/0/change/storage/class";
var admAllUserURL = "/v1/app/user/0/list/<LAWFIRMID>/<ACTION>";

//Notes
var admNotesAddURL = "/v1/app/document/0/notes/add";
var admNotesmakePublicURL = "/v1/app/document/0/notes/make/public";
var admNotesmakePrivateURL = "/v1/app/document/0/notes/make/private";
var admNotesDeleteByIdURL = "/v1/app/document/0/notes/delete/by/id";
var admNotesFetchByDocIdURL = "/v1/app/document/0/notes/fetch/by/docid";
var admNotesEditURL = "/v1/app/document/0/notes/edit";

//forum
var admforumFetchNotifURL = "/v1/app/forum/1/thread/fetch/notifications";
var admforumDeleteNotifURL = "/v1/app/forum/1/thread/delete/notifications";

//DRM
var admDRMFetchURL = "/v1/app/drm/6/action/fetch/records";
var admDRMAddURL = "/v1/app/drm/6/action/add";
var admDRMByFolderAddURL = "/v1/app/drm/6/action/add/by/folder";
var admUpdateDRMAddURL = "/v1/app/drm/6/action/update";
var admDeleteDRMAddURL = "/v1/app/drm/6/action/delete/records";
var admDeleteDRMFolderURL = "/v1/app/drm/6/action/delete/records/by/folder";

var admUploadTempURL = "";
var admUploadVersionTempURL = "";

//path for backend to get file ids
var allFileDownloadURL = "/v1/app/unindexdoclist/0/fetch/docs/by/interval";

/************* Service URL ends *****************/

/********** Document html  Image Classes Start *************/
var adm_back_icon_1_Cls = "back_icon_1_Cls";
var adm_refresh_mob_1_Cls = "refresh_1_Cls";
var adm_search_icon_Cls = "search_icon_Cls";
var adm_dataroom_icon_Cls = "dataroom_icon_Cls";
var adm_personal_folder_icon_Cls = "personal_folder_icon_Cls";
var adm_add_1_Cls = "add_1_Cls";
var adm_acl_d_Cls = "shorting_Cls";
var adm_select_btn_Cls = "select_btn_Cls";
var adm_remove_Cls = "remove_Cls";
var adm_trash_Cls = "trash_Cls";
//var adm_bar_iconCls = "bar_icon_Cls";
var adm_moveto_folder_1 = "moveto_folder_1_Cls";
var adm_copy_1_Cls = "copy_1_Cls";
var adm_share_1_Cls = "share_1_Cls";
var adm_share_2_Cls = "share_2_Cls";
var adm_download_1_Cls = "download_1_Cls";
var adm_unverified_icon_Cls = "unverified_icon_Cls";
var adm_verified_icon_Cls = "verified_icon_Cls";
var adm_enable_Cls = "enable_Cls";
var adm_block_device_Cls = "block_device_Cls";
//var adm_advance_arrow_Cls = "advance_arrow_Cls";
//var adm_inbound_share_1_Cls = "inbound_share_1_Cls";
var adm_inbound_share_Cls = "inbound_share_Cls";
//var adm_arrow_left = "arrow_left_Cls";
var adm_maximize = "maximize_1_Cls";
//var adm_arrow_right = "arrow_right_Cls";
//var adm_upload = "upload_Cls";
//var adm_search = "search_Cls";
var adm_send_mail_white = "send_mail_white_Cls";
//var adm_hot_icon = "hot_icon_Cls";
//var adm_unhot_icon = "unhot_icon_Cls";
//var adm_doc_folder = "doc_folder_Cls";
var adm_add = "add_Cls";
var adm_trash_1_Cls = "trash_1_Cls";
var adm_plus_icon_Cls = "plus_icon_Cls";
var adm_acm_icon_1_Cls = "acm_icon_1_Cls";
var adm_acm_icon_2_Cls = "acm_icon_2_Cls";
var adm_tree_icon_1_Cls = "tree_icon_1_Cls";
var adm_plus_Cls = "plus_Cls";
var adm_edit_page_Cls = "edit_page_Cls";
var adm_view_Cls = "view_Cls";
var adm_share_manage_Cls = "share_manage_Cls";
/********** Document html  Image Classes End *************/

/*******ldrive share variable Start   ********/

var ldrive_Sharemanagement = "ldrive_Sharemanagement";
var ldrive_popupbox_full = "popupbox-full";
var ldrive_closeSharemanagement = "closeSharemanagement";
var ldrive_back_icon_1_Cls = "back_icon_1_Cls";
var ldrive_fr = "fr";
var ldrive_popbtn = "popbtn";
var ldrive_popup_box_full = "popup-box-full";
var ldrive_popupwrap = "popupwrap";
var ldrive_ld_managesharelist = "ld_managesharelist";
var ldrive_popfix_title_full = "popfix-title-full";
var ldrive_ld_sm_check = "ld_sm_check";
var ldrive_chkbox_white = "chkbox_white";


var ldrive_ld_sm_name = "ld_sm_name";
var ldrive_ld_sm_folder = "ld_sm_folder";
var ldrive_ld_sm_shareto = "ld_sm_shareto";
var ldrive_ld_sm_type = "ld_sm_type";
var ldrive_ld_sm_action = "ld_sm_action";
var ldrive_popup_hd_full ="popup-hd-full";
var ldrive_resend_Cls = "resend_Cls";
var ldriveOutbondShareList ="OutBoundShareList";
var ldriveInShareList ="OutbondShareList";
var ldrivePopUpBtn = "ldrivePopUpBtn";
var ldrive_Share_Delete = "ldrive_Share_Delete_";
var ldrive_Share_mail = "ldrive_Share_mail_";
var ldrive_ShareIn_Checkox = "ldrive_ShareIn_Checkox_";
var ldrive_ShareOut_Checkox = "ldrive_ShareOut_Checkox_";
var ldrive_shareInbond_checkAll ="shareInbond_checkAll";
var ldrive_shareOutbond_checkAll ="shareOutbond_checkAll";
var ldrive_shareIn_docTotal =0;
var ldrive_shareOut_docTotal =0;
var shareOutboundShareClck ="OutboundShareOption";
var shareInboundShareClck ="InboundShareOption";
var shareInboundOutboundSelect ="shareInboundOutboundSelect";
var outbound_sharelist_title = "outbound_sharelist_title";
var inbound_sharelist_title = "inbound_sharelist_title";
var sharedepositpopup = "depositpopup_";
var sharedepositpopupul = "sharedepositpopupul_";
var shareOutbondRemove = "OutbondRemove_";
var shareOutbondResend = "OutbondResend_";
var Sharefilenamelist  = "Sharefilenamelist_";
var shareIndepositpopup = "shareIndepositpopup_";
var ShareInfilenamelist = "ShareInfilenamelist_";

var ShareOutShareToCaptionId   ="ShareOutShareToCaptionId";
var ShareOutNameCaptionId   ="ShareOutNameCaptionId";
var  ShareOutFolderNameDateCaptionId ="ShareOutFolderNameDateCaptionId";
var  ShareOutExpireDateCaptionId ="ShareOutExpireDateCaptionId";
var  ShareOutShareOnCaptionId ="ShareOutShareOnCaptionId";

var  ShareOutShareToDescImg ="ShareOutShareToDescImg";
var  ShareOutNameDateDescImg ="ShareOutNameDateDescImg";
var  ShareOutFolderNameDescImg ="ShareOutFolderNameDescImg";
var  ShareOutShareOnDateDescImg ="ShareOutShareOnDateDescImg";
var  ShareOutExpireDateDescImg ="ShareOutExpireDateDescImg";


var ShareInFileNameDescImg  ="ShareInFileNameDescImg";
var ShareInStatusDescImg  ="ShareInStatusDescImg";
var ShareInDateDescImg = "ShareInDateDescImg";
var ShareInDepositDescImg = "ShareInDepositDescImg";
var ShareInShareToDescImg = "ShareInShareToDescImg";

var ShareInStatusCaptionId = "ShareInStatusCaptionId";
var ShareInDepositCaptionId = "ShareInDepositCaptionId";
var ShareInDateCaptionId = "ShareInDateCaptionId";
var ShareInShareToCaptionId = "ShareInShareToCaptionId";
var ShareInFolderNameCaptionId = "ShareInShareToCaptionId";
var search_outbound_sharelist_icon = "search_outbound_sharelist_icon";
var share_closeSharemanagement ="closeSharemanagement";
var share_search_outbound_list = "share_search_outbound_list";
var share_search_inbound_list = "share_search_inbound_list";
var inbond_Name_Search    = "inbond_Name_Search";
var inbond_ShareTo_Search  = "inbond_ShareTo_Search";
var inbond_Date_Search    = "inbond_Date_Search";
var inbond_Deposit_Search   = "inbond_Deposit_Search";
var inbond_Status_Search = "inbond_Status_Search";
var outbond_ExpireDate_Search = "outbond_ExpireDate_Search";
var outbond_ShareOn_Search  = "outbond_ShareOn_Search";
var outbond_Folder_Search   = "outbond_Folder_Search";
var outbond_Name_Search  = "outbond_Name_Search";
var outbond_ShareTo_Search = "outbond_ShareTo_Search";

var adm_busyindicatorshow = "adm_busyindicatorshow";
var adm_busyindicatorhide = "adm_busyindicatorhide";

/*******ldrive share variable End   ********/

/*******email sms popup starts ***********/
var adm_mobileemaillistpopup = "adm_mobileemaillistpopup";
var adm_mobileemaillistpopup_close = "adm_mobileemaillistpopup_close";
var adm_mobileemaillist = "adm_mobileemaillist";
var adm_mobileemaillistdone = "adm_mobileemaillistdone";
var adm_mobileemaillistadd = "adm_mobileemaillistadd";
var adm_mobileemailselectmobile_ = "adm_mobileemailselectmobile_";
var adm_mobileemailselectmobilelabel_ = "adm_mobileemailselectmobilelabel_";
var adm_mobileemailselectemail_ = "adm_mobileemailselectemail_";
var adm_mobileemailselectemaillabel_ = "adm_mobileemailselectemaillabel_";
var adm_mobileemailselectno_ = "adm_mobileemailselectno_";
var adm_mobileemailselectnolabel_ = "adm_mobileemailselectnolabel_";
var adm_mobileadd_ = "adm_mobileadd_";
var adm_mobiledelete_ = "adm_mobiledelete_";
var adm_mobileemail_txt1_ = "adm_mobileemail_txt1_";
var adm_mobileemail_txt2_ = "adm_mobileemail_txt2_";
var adm_mobileemaildiv_ = "adm_mobileemaildiv_";
var adm_mobileemaildivcls = "adm_mobileemaildivcls";
var adm_mobileemailpoplist = "adm_mobileemailpoplist";
var adm_sharemobileemailli_1_ = "adm_sharemobileemailli_1_";
var adm_sharemobileemailli_2_ = "adm_sharemobileemailli_2_";
var adm_sharemobileemailli_3_ = "adm_sharemobileemailli_3_";
var adm_sharemobileemailli_4_ = "adm_sharemobileemailli_4_";
var adm_sharemobileemailli_5_ = "adm_sharemobileemailli_5_";
var adm_sharemobileemailli_6_ = "adm_sharemobileemailli_6_";
/*******email sms popup ends ***********/

/**** boolean values starts *****/
var downloadallowed = true;
var outshareallowed = true;
var inshareallowed = true;
var deleteallowed = true;
var copyallowed = true;
var moveallowed = true;
var statusdeleteselected = false;
var admdocviewerrequested = false;
var admopenversionpopupstatus = false;
var adm_viewer_docid_idm = -1;
var adm_viewer_docid_versionid = -1;
var adm_viewer_docid = 0;
var adm_viewer_doc_version = 0;
var adm_viewer_folderid = 0;
var adm_viewer_folderpath = "";
var adm_viewer_foldertype = "";
var adm_viewer_filetype = "";
var adm_viewer_locked = 0;
var adm_viewer_lockedby = 0;
var admuserid = 0;
var adm_search_click = false;
var adm_parentfolderid = [];
var adm_parentfolderpath = [];
var adm_copy_parentfolderpath = [];
var adm_folderPathList_upload = {};
var admttotalfile = 0;
var adm_folderPathList_URL = [];
var adm_folderPathList_URL_DONE = [];
var adm_folderPathList_URL_DONE_PROCESS = [];
var adm_folderPathList_URL_DONE_COUNT = 0;
var adm_folderPathList_URL_COUNT = 0;
var adm_FolderId_FileName = [];
var adm_User_Array = [];
var adm_Folder_Size_Array = [];
var adm_Folder_Size_JSON = {"listAttribute1":[]};
var root_access_folder_notexists = "";

/**** boolean values ends *****/

var incrtag = 0;
var versionincrtag = 0;
var versiondocidxopen = 0;
var adm_search_progress = false;
var downloadids = 0;
var admCopyParentId = 0;
var admCopyFolderType = "P";
var admViewerOpened = 0;
var sharedsecuritylen = 0;
var uploadbatchcount = 0;
var uploadinboundcount = 0;

var contact_id = 0;
var phone_id = 0;
var fax_id = 0;
var userimgbase64 = "";
var prvuserimg = "";

var base64authheadernew = "";
var sizeLeft = -1;
var isFileUpload = true;
var allocatedStorage = -1;
var folderPermissions = "";

//tree variables
var admidxul = 0;
var admPersoanlFoldersList_local = [];
var admPersoanlFoldersFileCount_local = [];
var admSharedFoldersList_local = [];
var admSharedFoldersFileCount_local = [];
var admSharedFoldersPermission_local = [];
var admFolderTreeLoaded = false;
var admTreeFolderSelectedId = 0;
var treeincr = 0;
var admListData = [];
var admListDataId = [];
var selectednodeid = -1;
var prvselectednodeid = -1;
var admListFolderIndexId = [];
var admListFolderIndexIdMain = [];
var nodesList = [];
var admSetSelectedNodeFromMain = false;
var admFolderSize = [];
var admFolderDate = [];
var amdrenamefolderindex = -1;
var fetchtreeindex = true;
var admfolderstatus = [];
var admcurrenttreeselectedfolderlist = null;
var admrebuildvar = [];

//permission
var adm_var_permission = "";
var currentdownloadfolders = [];
var currentdownloadfiles = [];
var renamefolderid = 0;
var renamefolderpath = "";
var renameprvfolderpath = "";
var downloadfolderarr = [];
var downloadrunning = false;
var dowload_status_queued="Queued";
var dowload_status_completed="Downloaded";
var dowload_status_running="Running";
var dowload_status_preparing="Preparing";
var dowloadfolderidsui=[];
var notificationsettingsval = 1;
var notificationsettingspresent = false;
var noInternet = "nointernet";

var permcheckactionafter = "";
var permcheckactionafterparams = "";

var isFolderUpload = false;
var admsetfolderpathnow = false;
var admopenfilelink = false;
var folderdownloadft = [];
var emptyFolderEntrries = [];

var otpsettiongs = null;
var admotpId = 0;

var fileuploadspecialchrfound = false;
var filefolderspecialcharactername = "";

var awsregionList = {"1":"US_EAST_2","2":"US_EAST_1","3":"US_WEST_1","4":"US_WEST_2","5":"CA_CENTRAL_1","6":"AP_SOUTH_1","7":"SA_EAST_1","8":"AP_NORTHEAST_2","9":"AP_SOUTHEAST_1","10":"AP_SOUTHEAST_2","11":"AP_NORTHEAST_1","12":"EU_CENTRAL_1","13":"EU_WEST_1","14":"EU_WEST_2","15":"AF_SOUTH_1","16":"AP_EAST_1","17":"CN_NORTH_1","18":"CN_NORTHWEST_1","19":"EU_NORTH_1","20":"EU_SOUTH_1","21":"EU_WEST_3","22":"ME_SOUTH_1"};

var tempTotalSize = 0;
var nextMethodToBeCalled = "";
var nextMethodParams=[];

var admdefaultMessageUploadSuccess = "";

var admFormNotifList = [];
var admFormNotifListCount = 0;
var admbaseauth = "";
var admFormBusy = false;
var admuseremailarr = [];
var admselecteddocids = 0;
var folderdownloadids = [];
var folderdownloadidms = [];
var folderdownloadcuruserid = 0;
var switchcalled = false;
var maxfilepermissiondoccount = 100;
var parentFolderStatus = "";

var admuploadfilelist = [];
var admfoldersizeupdatecalled = false;
var admcanuploadclicked = false;

var adm_folder_list = [];
var adm_doc_list = [];
var adm_prv_folder_id = 0;
var corpModules = [];
var admscrolldone = false;

var admFolderDRM = [];

//paging variables
var userlistarrar = [];
var liveuserlistarrar = [];
var displaycounter = -1;
var maxrows = 50;
var pagecount = 1;
var admuserfilepermlist = [];
var liveuserpagecount = 1;
var admfolderpathupld = [];

//pages drive variables
var admdisplaycounter = -1;
var admmaxrows = 50;
var admmaxrowslast = 50;
var admpagecount = 1;
var admdrivelist = [];
var admsearchpagefolderid = -1;
var admsearchpagefileid = -1;
var admsearchpagenumber = -1;
var admsortoff = false;
var admshowAIPopup = false;
var adm_ai_search = false;
