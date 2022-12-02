var logoutAfterMin = 45;
var checklogoutAfterMin = 5;
var intervalcheck = 300000;
var timelast = 0;
var pointerX = -1;
var pointerY = -1;
var xtimer = null;
var ytimer = null;
var ztimer = null;
var ttimer = null;

localStorage.timerpopup = "false";

document.onmousemove = function(event) {
	if(localStorage.timerpopup == "false"){
	    pointerX = event.pageX;
	    pointerY = event.pageY;
	    localStorage.timelast = new Date().getTime();
	}
}
ytimer = setInterval(pointerCheck, intervalcheck);
function pointerCheck() {
	if(getauthtokenfromlocal()!=""){
		if(localStorage.timelast == 0) localStorage.timelast = new Date().getTime();
		var timediff = new Date().getTime()-localStorage.timelast;
		var diffMins = Math.round(((timediff % 86400000) % 3600000) / 60000);

		if(diffMins == (logoutAfterMin-checklogoutAfterMin)){
			var str = "<div class='modal-dialog modal-lg' style='width:25%;max-width:90%;overflow:hidden;border-top-left-radius:36px;border-top-right-radius:36px;'>";
			str += "<div class='modal-content' style='border-radius: 36px;'>";
			str += "<div class='modal-header' style='display:block;background-color:#23bbf3;border-top-left-radius:36px;border-top-right-radius:36px;padding:0px;'>";
			str += "<h4 class='confirmheadercss' id='confirmheader'>Confirmation</h4>";
			str += "<h4 class='sessiontimercss' id='sessiontimer'></h4>";
			str += "</div>";
			str += "<div class='modal-body'>";
			str += "<div class='' id='modalconfirmmsg' style='max-height:350px;overflow-y:auto;overflow-x:hidden;font-weight:bold;'>Due to inactivity the session is going to close. Do you wish to remain logged in?</div>";
			str += "</div>";
			str += "<div class='modal-footer'>";
			str += "<button id='btnyes' class='btn btn-primary btn-rounded navigate-ref-exp-btn text--center font-weight-bold' onclick='sessionactive();'>Yes</button>";
			str += "<button id='btnno' class='btn btn-primary btn-rounded navigate-ref-exp-btn text--center font-weight-bold' onclick='inactivitysession();'>No</button>";
			str += "</div>";
			str += "</div>";
			str += "</div>";
			$("#divtimeout").html(str);
			showActionPopup("divtimeout", false);
			localStorage.timerpopup = "true";
			clearInterval(ytimer);
			inactivitysessionchecktimer();
		}
	}
}

function sessionactive(){
	pointerX = event.pageX;
	pointerY = event.pageY;
	localStorage.timelast = new Date().getTime();
	resetxtimer();
	hideActionPopup("divtimeout");
	localStorage.timerpopup = "false";
}

function inactivitysession(){
	try{
		var loginId = localStorage._zy;
		if (loginId.length > 0) {
			corporatelistarr = JSON.parse(valdec(localStorage._zm));
			for (var i = corporatelistarr.length - 1; i >= 0; i--) {
				if (corporatelistarr[i].value._zz != "" && corporatelistarr[i].id != (uniqueidentifieracclist())) {
					try {
						logOutServiceSingle(corporatelistarr[i].value._zz);
					} catch (error) { console.log(error); }
				}
			}
			hideAllModalPopUp();
			loginRemoveAccount(-1, false);
			logOutService();
			clearauthinlocalstorage();
			if((window.location.href).indexOf("pollpreview.html") > 0){
				window.location.href = "error.html";
			}else{
				loginCheckAndPopulateCachedAccount();
			}
		}else{
			if((window.location.href).indexOf("pollpreview.html") > 0){
				window.location.href = "error.html";
			}else{
				window.location.reload();
			}
		}
	}catch(error){console.log(error);}

	resetxtimer();
	hideActionPopup("divtimeout");
	localStorage.countDownDate = -1;
	localStorage.timerpopup = "false";
	window.location.reload();
}

function inactivitysessionchecktimer(){
	var timtoadd = checklogoutAfterMin*60*1000;
	localStorage.countDownDate = new Date().getTime() + timtoadd;
	xtimer = setInterval(function() {
		// Get today's date and time
		if(localStorage.countDownDate >= -1){
			var now = new Date().getTime();
			var distance = new Date(parseFloat(localStorage.countDownDate)).getTime() - now;

			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (minutes <= 0 && seconds <= 0) {
				hideAllModalPopUp();
				localStorage.timerpopup = "false";
				resetxtimer();
				inactivitysession();
			} else {
				$("#sessiontimer").html(minutes + ":" + seconds);
				showHideModalPopUp();
			}
		} else {
			window.location.reload();
		}
    }, 1000);
}

function resetxtimer(){
	clearInterval(xtimer);
	ytimer = setInterval(pointerCheck, intervalcheck);
}

ztimer = setInterval(disablePageTimer, (intervalcheck-100));
function disablePageTimer() {
	if((window.location.href).indexOf("downloadlink.html") > 0){
		localStorage.timelast = new Date().getTime();
		clearInterval(ytimer);
	}
}

ttimer = setInterval(invalidateSessionTimer, 1000);
function invalidateSessionTimer() {
	if((window.location.href).indexOf("downloadlink.html") < 0 && (window.location.href).indexOf("drive.html") > 0
		&& getauthtokenfromlocal()=="" && $("#divdrive").is(":visible")){
		/*localStorage.timelast = new Date().getTime();
		clearInterval(ytimer);
		ytimer = setInterval(pointerCheck, intervalcheck);*/
	}
}
function showHideModalPopUp(){

	unbindobject("#btnyes");
	$("#btnyes").bind("click", function(){
		$("element").data('modal').isShown;
		$(".modal").modal('show');
	});

	unbindobject("#btnno");
	$("#btnno").bind("click", function(){
		hideAllModalPopUp();
	});
}

function hideAllModalPopUp(){
	var uploadmodalOpen = $('#uploadfilemodal').is(':visible');
	if(uploadmodalOpen){
		$("#admuploadfilecancel").click();
	}
	$(".modal").modal('hide');
	try { admCloseRowDropDown(); } catch (error) { console.log(error); }
}
