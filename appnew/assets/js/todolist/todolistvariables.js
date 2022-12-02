//URL starts
var adminuserlistURL = "/v1/app/user/0/list/admin/<ACTION>";
var adminuseronlylistURL = "/v1/app/user/0/list/user/<ACTION>";
var alluserListURL = "/v1/app/user/0/list/111/<ACTION>"

var todolistcommonURL = "/v1/app/todolist/5/action";

var todolistfetchURL = todolistcommonURL + "/fetch";
var todolistsearchURL = todolistcommonURL + "/search";
var todolistnewURL = todolistcommonURL + "/add";
var todolistdeleteURL = todolistcommonURL + "/delete";
var todolistchangestatusURL = todolistcommonURL + "/change/status";
var todolistupdateURL = todolistcommonURL + "/update";
var todolistimportURL = todolistcommonURL + "/import/workflow";
var todolistaddcommentURL = todolistcommonURL + "/comments/add";
var todolistdeletecommentURL = todolistcommonURL + "/comments/delete";
var todolistfetchcommentURL = todolistcommonURL + "/comments/fetch";
var todolistExportURL = todolistcommonURL + "/export/workflow";
var todolistaddFileURL = todolistcommonURL + "/files/add";
var todolistdeleteFileURL = todolistcommonURL + "/files/delete";
var todolistfetchFileURL = todolistcommonURL + "/files/fetch";

var todolistSingleUserProfileURL = "/v1/app/user/0/list/<LAWFIRMID>/<USERID>/<ACTION>";
var todolistSaveUserPhoneURL = "/v1/app/contactphoneupd/0/<ACTION>";
var todolistSaveUserFaxURL = "/v1/app/contactfaxupd/0/<ACTION>";
var todolistAddUserPhoneURL = "/v1/app/contactphoneadd/0/<ACTION>";
var todolistAddUserFaxURL = "/v1/app/contactfaxadd/0/<ACTION>";
var todolistMarkThreadReadURL = todolistcommonURL + "/update/read/notifications";
var todolistActiveLoginIdsURL = "/v1/app/user/0/fetch/loginid/active/list";

var groupscommonURL = "/v1/app/groups/0";
var addGroupURL = groupscommonURL + "/add";
var updateGroupURL = groupscommonURL + "/update";
var deleteGroupURL = groupscommonURL + "/delete";
var fetchGroupURL = groupscommonURL + "/fetch";
var addUserGroupURL = groupscommonURL + "/user/add";
var updateUserGroupURL = groupscommonURL + "/user/update";
var deleteUserGroupURL = groupscommonURL + "/user/delete";
var fetchUserGroupURL = groupscommonURL + "/user/fetch";
var admfetchContactListBySync = "/v1/app/user/0/list/<LAWFIRMID>/<ACTION>";

var flowTemplateAddURL = todolistcommonURL + "/workflow/template/add";
var flowTemplateUpdateURL = todolistcommonURL + "/workflow/template/update";
var flowTemplateDeleteURL = todolistcommonURL + "/workflow/template/delete";
var flowTemplateFetchURL = todolistcommonURL + "/workflow/template/fetch";

var downloadTemplateURL = todolistcommonURL + "/download/workflow/template";

//drive erls
var admZeroFolderListOnlyURL = "/v1/app/unindexfolderlistg/0/zerolevel/web";
var admFolder_FolderFullListURL = "/v1/app/unindexdoclist/0/<MAXLIMIT>/<FOLDERID>/<SORTING>/<ACTION>";
var admdownloadzip = "/v1/app/unindexdocdownload/0/zip/<ACTION>";
var admfilestatusURL = "/v1/app/unindexdoclist/0/fetch/status";
//URL ends

var allgrouparrList = [];
var currentfile = null;
var todolistsortorder = 1;
var fromDueDate = "";
var toDueDate = "";

var admcurrentfoldertype = "S";
var	admcurrentfolderid = 0;
var adm_sorting = "DESC`date";
var adm_documentmaxlimit = 0;
var admtotaldocs = 0;
var admttotalfile = 0;
var adm_copy_parentfolderpath = [];
var admcopyfileid = [];

var todolistlastRow = 0;
var todolistmaxrow = 10;
var todolisttotalcount = 0;
var todolistdata = null;
var todolistrefreshleftsinglerow = false;
var todolistserialkey = 1;
var highlightrowid = 0;

var groupsdetails = [];
var admUserList = [];
var selectidgroup = 0;
var groupopenfromtask = false;
var templateopenfromtask = false;
var templatecreatefromtask = false;
var todolistflowobjectcreated = 0;

var selectedflowid = 0;
var todolistflowobject = [];

var todolistRunningTask = "R";
var todolistWaitingTask = "W";
var todolistCompleteTask = "C";

var todolistCurrentMethod = "";
var todolistCurrentMethodParams = [];
var todoListProcessId = 0;

var grooupopenedfrom = "";

