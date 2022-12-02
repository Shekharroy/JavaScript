let requestnotprocessed = "Request could not be processed";
let pleasechecktryagain = "Please check and try again";
let requestprocessd = "Request processed";
let ipaddressalreadyblocked = "This ip address is already blocked";
let emailhasbeensentcredential = "An email has been sent to your email id with your new credential details";
let ipaddressublocked = "This ip address is already unblocked";

let cssVarele1 = $("#ele1")
 	 cssVarele1.css({'font-size' : '70px'});
let cssVarele2 = $("#ele2")
 	 cssVarele2.css({'font-size' : '18px'});

function lSetTextIpBlockUnblock(parameter1, parameter2){
	$("#ele1").html(parameter1);
	$("#ele2").html(parameter2);
}

$(document).ready(function($) {
	var loc = window.location.href;
	try{
		var dm = loc;
		dm = dm.replace(cloudURLProtocol, "");
		dm = dm.substring(0, dm.indexOf("/"));
		dm = cloudURLProtocol + dm;
		loc = loc.split("?")[1];
		var params = loc.split("&");
		var key = params[1].replace("key=", "");
		var action = params[0].replace("a=", "");
		if(action == "abuse"){
			var url = dm + "/api.acms/v1/abuse/login/"+key+"/atc";
			$.ajax({
				url:url,
				type:"GET",
				contentType:"application/json",
				dataType:"json",
				success:function(result) {
					if(result.error == true){
						lSetTextIpBlockUnblock(requestnotprocessed, pleasechecktryagain);
					} else {
						if(result.message == "ALREADY"){
							lSetTextIpBlockUnblock(requestprocessd, ipaddressalreadyblocked);
						} else {
							lSetTextIpBlockUnblock(requestprocessd, emailhasbeensentcredential);
						}
					}
				},
				error:function(result) {
					lSetTextIpBlockUnblock(requestnotprocessed, pleasechecktryagain);
				}
			});
		} else if(action == "unblock"){
			var url = dm + "/api.acms/v1/abuse/login/unblock/"+key+"/atc";
			$.ajax({
				url:url,
				type:"GET",
				contentType:"application/json",
				dataType:"json",
				success:function(result) {
					if(result.error == true){
						lSetTextIpBlockUnblock(requestnotprocessed, pleasechecktryagain);
					} else {
						if(result.message == "ALREADY"){
							lSetTextIpBlockUnblock(requestprocessd, ipaddressublocked);
						} else {
							lSetTextIpBlockUnblock(requestprocessd, emailhasbeensentcredential);
						}
					}
				},
				error:function(result) {
					lSetTextIpBlockUnblock(requestnotprocessed, pleasechecktryagain);
				}
			});
		}
	} catch(error){
		console.log(error);
		lSetTextIpBlockUnblock(requestnotprocessed, pleasechecktryagain);
	}
});