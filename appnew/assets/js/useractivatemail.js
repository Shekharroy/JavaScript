var dm = window.location.href;
dm = dm.replace(cloudURLProtocol, "");
dm = dm.substring(0, dm.indexOf("/"));
dm = cloudURLProtocol + dm;

let accountAlreadyactivated = "Account already activated";
let emailwasalreadysent = "An email was already sent to your email id with your credential details";
let errorinactivation = "Error In Activation";
let pleasecheckurl = "Please check the url and try again";
let accountactivated = "Account Activated";
let emailhasbeensent = "An email has been sent to your email id with your credential details";
let accountLinkExpired = "Account activation link has expired";
let resendactivationlink = "Please contact your administrator to resend the activation link";


let cssVareusrle1 = $("#ele1")
 	 cssVareusrle1.css({'font-size' : '70px'});
let cssVareusrle2 = $("#ele2")
 	 cssVareusrle2.css({'font-size' : '18px'});
let src ="";

function lSetTextUserActivateMail(parameter1, parameter2){
	$("#ele1").html(parameter1);
	$("#ele2").html(parameter2);
}

$(document).ready(function($) {
	var loc = window.location.href;
	try{
		var arr = loc.split("?")[1];
		loc = loc.split("#")[1];
		if(arr != undefined && arr.length > 0){
			arr = arr.split("&");
		}
		history.pushState("", document.title, window.location.pathname + window.location.search);
		var url = dm + "/api.acms/v1/public/user/0/reactivate/showmessage";
		var jsonInput="";
		jsonInput += "{";
		jsonInput += "\"attribute1\":\""+loc+"\"";
		if(arr != undefined && arr.length > 0){
			jsonInput += ",\"attribute2\":\""+arr[0].replace("a=", "")+"-"+arr[1].replace("b=", "")+"\"";
		}
		jsonInput += "}";
		$.ajax({
			url:url,
			type:"POST",
			contentType:"application/json",
			dataType:"json",
			data:jsonInput,
			success:function(result) {
				src=result.tempObject2;
				if(result.error == true){
					if(result.message == "USER_ACTIVATED"){
						lSetTextUserActivateMail(accountAlreadyactivated, emailwasalreadysent);
					}else if(result.message == "ACT_LINK_EXPIRED"){
						lSetTextUserActivateMail(accountLinkExpired, resendactivationlink);
					} else {
						lSetTextUserActivateMail(errorinactivation, pleasecheckurl);
					}
				} else {
					lSetTextUserActivateMail(accountactivated, emailhasbeensent);
				}
				var logopatgh = fetchLogo();
				document.getElementById("clogoimg").src = logopatgh;
			},
			error:function(result) {
				lSetTextUserActivateMail(errorinactivation, pleasecheckurl);
			}
		});
	} catch(error){
		lSetTextUserActivateMail(errorinactivation, pleasecheckurl);
	}
});

function fetchLogo(){
	if (handleNullValue(src) != ""){
		return dm +"/api.acms/" +src;
	}else{
		return "assets/img/Dlogobig.png"
	}
}

function handleNullValue(inputData){
	if(inputData =='null' || inputData=='NULL' || inputData==null || inputData == undefined || inputData == "undefined") return "";
	return inputData;
	}