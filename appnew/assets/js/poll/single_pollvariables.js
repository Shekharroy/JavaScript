//URL starts
var adminuserlistURL = "/v1/app/user/0/list/admin/<ACTION>";
var adminuseronlylistURL = "/v1/app/user/0/list/user/<ACTION>";
var alluserListURL = "/v1/app/user/0/list/111/<ACTION>"

//drive erls
var admZeroFolderListOnlyURL = "/v1/app/unindexfolderlistg/0/zerolevel/web";
var admFolder_FolderFullListURL = "/v1/app/unindexdoclist/0/<MAXLIMIT>/<FOLDERID>/<SORTING>/<ACTION>";
var admdownloadzip = "/v1/app/unindexdocdownload/0/zip/<ACTION>";
var admfilestatusURL = "/v1/app/unindexdoclist/0/fetch/status";
//URL ends

var allgrouparrList = [];
var currentfile = null;
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

var lawFirmId = 0;
var highlightrowid = 0;
var admUserList = [];
var admbaseauth = "";
var pollbaseurl = "/api.acms/v1/public/poll";
var startdatefrom = "";
var startdateto = "";
var enddatefrom = "";
var enddateto = "";
var pollsortorder = 0;
var pollupdateleft = false;
var voteWeightage = 0;
var pollAllowVoteChange = 0;
var pollLoginId = "";
var pollvoteclicked = 0;

var POLL_STATUS_PREVIEW = 1;
var POLL_STATUS_RUNNING = 2;
var POLL_STATUS_CLOSED = 3;

var serveraddr = "";
var cloudprotocol = "";

var voterProtectionType = 0;
var captcha = "";
var verificationKey = "";
var voterReceiptEmail = "";