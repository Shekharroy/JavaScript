var corporateidarr = [];

function commonEvents(){
	totalNoOfUsersClick();
	totalUserListClick();
}

function totalNoOfUsersClick(){
	$("#btntotaluser").bind("click", function(){
		fetchTotalUser();
	});
}

function totalUserListClick(){
	$("#btnactivesession").bind("click", function(){
		fetchShowUserList();
	});
}

/**
 * method to convert date to US Format
 * @param dateVal
 * @returns
 */
function formatDateLocale() {
	var d = new Date();
	return d.toLocaleString();
}

/**
 * Method to format date to API server format
 * @param : obj
 */
function FormatDateToServer(val, time) {
	var returnDate = "";
	if(val !=""){
		if(time == true) returnDate = moment(val).format('YYYY-MM-DD HH:MM');
		else returnDate = moment(val).format('YYYY-MM-DD');
		returnDate = formatAddTZDate(returnDate, time);
	}
	return returnDate;
}

/**
 * method to convert date to US Format
 * @param dateVal
 * @returns
 */
function formatDateUS(dateVal, timepresent) {
	var formatUSg = "MM/DD/YYYY";
	var rettime = "";
	if(timepresent) {
		rettime = dateVal.substring(dateVal.indexOf(" ")+1);
		rettime = " " + convertTo12HourFormat(rettime);
		dateVal = dateVal.substring(0, dateVal.indexOf(" "));
	}
	if(dateVal !="") return dateVal = moment(dateVal).format(formatUSg) + rettime;
	return "";
}

function formatAddTZDate(dt, timepresenet){
	var rettime = "00:00";
	if(timepresenet){
		var time = dt.substring(dt.indexOf(" ")+1);
		dt = dt.substring(0, dt.indexOf(" "));
		time = time.toUpperCase();
		if(time.indexOf("AM") > 0 || time.indexOf("PM") > 0) rettime = convertTo24HourFormat(time);
	}

	dt = moment(dt).format("YYYY-MM-DD");
	dt = dt + "T" + rettime + ":00Z";
	return dt;
}

function formatUpdateTZDate(dt, timepresenet){
	if(timepresenet){
		dt = dt.replace("T", " ");
		dt = dt.substring(0, dt.lastIndexOf(":"));
	}else{
		dt = dt.substring(0, dt.indexOf("T"));
	}
	dt=formatDateUS(dt, timepresenet);

	if(timepresenet){
		var time = dt.substring(dt.indexOf(" ")+1);
		var rettime = convertTo12HourFormat(time);
		dt = dt.substring(0, dt.indexOf(" ")) + " " + rettime;
	}

	return dt;
}

/**
 * method to get time stamp in local from utc data like T Z format
 * @param	: datestring
 */
function getlocaltimestampfromutcdata(datestring)
{
	if(datestring != "")
	{
		var cloudlastupdated = Date.parse(datestring)- 7*60*60*1000;
		return cloudlastupdated;
	}
	else return 0;
}

/**
 * method to convert time to 12 hour format
 * @param time
 * @returns String
 */
function convertTo12HourFormat(time) {
	  // Check correct time format and split into components
	  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	  if (time.length > 1) { // If time format correct
	    time = time.slice (1);  // Remove full string match value
	    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
	    time[0] = +time[0] % 12 || 12; // Adjust hours
	    if((time[0]+"").length == 1) time[0] = "0" + time[0];
	    if((time[2]+"").length == 1) time[2] = "0" + time[2];
	  }
	  var timestr = time.join ('');
	  return timestr;
}

/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromUserStat(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
}

function fetchCorporateList(){
	ajaxindicatorstart('loading data.. please wait..');
	var type =updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/mkin/lscor/fetchCorporateListAfter";
	invokeAdapterCallFromUserStat(type, posturl, "", "", "");
}

function fetchCorporateListAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		if(data != null && data.length > 0){
			for(var i=0;i<data.length;i++){
				var arr = data[i].split("#");
				$('#selcorporatelist').append("<option value="+arr[0]+"> "+arr[1]+" </option>");
				corporateidarr[arr[0]] = arr[2];
			}
		}
	}
}

function fetchTotalUser(){
	var selval = $("#selcorporatelist").val();
	ajaxindicatorstart('loading data.. please wait..');
	var type =updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/mkin/nu/"+selval+"/fetchTotalUserAfter";
	invokeAdapterCallFromUserStat(type, posturl, "", "", "");
}

function fetchTotalUserAfter(response){
	ajaxindicatorstop();
	if((response.error+"") == "false" && response.object != null) {
		$("#txttotaluser").val(response.object+"");
	}
}

function fetchShowUserList(){
	var selval = $("#selcorporatelist").val();
	if(selval == "-1"){
		alert("select corporate");
	} else {
		var id = corporateidarr[selval];
		ajaxindicatorstart('loading data.. please wait..');
		var type =updateMethod;
		var posturl = cloudApiUrlACMS+"/v1/mkin/na/"+id+"/fetchShowUserListAfter";

		var dtfrom = null;
		try{
			if(($("#fromdt").val()).length > 0){
				dtfrom = FormatDateToServer($("#fromdt").val());
			}
		}catch(error){}

		var dtto = null;
		try{
			if(($("#todt").val()).length > 0){
				dtto = FormatDateToServer($("#todt").val());
			}
		}catch(error){}

		var json = {
			dateAttribute8:dtfrom,
			dateAttribute9:dtto
		};
		invokeAdapterCallFromUserStat(type, posturl, "", json, "");
	}
}

function fetchShowUserListAfter(response){
	ajaxindicatorstop();
	$("#txttotalactivesession").val("0");
	$("#tbluser").html("");
	if((response.error+"") == "false" && response.object != null) {
		var data = response.object;
		if(data != null && data.length > 0){
			var datahtml = "<tr>";
			datahtml += "<tr>";
			datahtml += "<th scope='col'>User Name</th>";
			datahtml += "<th scope='col'>Device Name</th>";
			datahtml += "<th scope='col'>User Browser</th>";
			datahtml += "<th scope='col'>Storage Used</th>";
			datahtml += "<th scope='col'>IpAddressV4</th>";
			datahtml += "<th scope='col'>GEO Location</th>";
			datahtml += "<th scope='col'>Loggedin Date</th>";
			datahtml += "</tr>";
			$("#tbluser").append(datahtml);
			for(var i=0;i<data.length;i++){
				datahtml = "";
				var fd = handleNullValue(data[i].dateAttribute8);
				var createddt = getlocaltimestampfromutcdata(fd);
				createddt = getdatefromtimestamp(createddt, false, "EN-US");
				datahtml += "<tr>";
				datahtml += "<td scope='row'>"+data[i].attribute1+"</td>";
				datahtml += "<td>"+data[i].attribute4+"</td>";
				datahtml += "<td>"+data[i].attribute7+"</td>";
				datahtml += "<td>"+data[i].attribute6+"</td>";
				datahtml += "<td>"+data[i].attribute8+"</td>";
				datahtml += "<td>"+data[i].attribute2+"</td>";
				datahtml += "<td>"+createddt+"</td>";
				$("#tbluser").append(datahtml);
			}
			$("#txttotalactivesession").val(data.length+"");
		}
	}
}