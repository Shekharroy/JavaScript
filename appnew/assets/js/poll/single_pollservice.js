/** method to get captcha and generate OTP */
function generateOTPService(jsonInput){
	ajaxindicatorstart('please wait..processing request...');
	var url = serveraddr + "/generate/poll/OTP";
	$.ajax({
		url:url,
		type:"POST",
		contentType:"application/json",
		dataType:"json",
		data:JSON.stringify(jsonInput),
		success:function(result) {
			generateOTPServiceAfter(result);
			$("#idRferesh").show();
		},
		error:function(result) {
			pollShowconfirmmsg("Could not process your request. please click on the link again from your mail.", confirm_Error, 5000, "", false, false);
		}
	});
}

/** method to get login validate ith captcha and OTP */
function loginService(jsonInput){
	ajaxindicatorstart('please wait..processing request...');
	var url = serveraddr + "/validate/otp/fetch/poll/single";
	$.ajax({
		url:url,
		type:"POST",
		contentType:"application/json",
		dataType:"json",
		data:JSON.stringify(jsonInput),
		success:function(result) {
			loginServiceAfter(result);
		},
		error:function(result) {
			pollShowconfirmmsg("Could not process your request. please click on the link again from your mail.", confirm_Error, 5000, "", false, false);
		}
	});
}

function pollCastVoteService(jsonInput){
	ajaxindicatorstart('please wait..processing request...');
	var url = serveraddr + "/cast/vote";
	$.ajax({
		url:url,
		type:"POST",
		contentType:"application/json",
		dataType:"json",
		data:JSON.stringify(jsonInput),
		success:function(result) {
			pollCastVoteServiceAfter(result);
		},
		error:function(result) {
			pollShowconfirmmsg("Could not process your request. please try again.", confirm_Error, 5000, "", false, false);
		}
	});
}

function fetchVoterProtectionType(jsonInput){
	var url = serveraddr + "/fetch/voter/protection/type";
	$.ajax({
		url:url,
		type:"POST",
		contentType:"application/json",
		dataType:"json",
		data:JSON.stringify(jsonInput),
		success:function(result) {
			fetchVoterProtectionTypeAfter(result);
		},
		error:function(result) {
			pollShowconfirmmsg("Could not process your request. please try again.", confirm_Error, 5000, "", false, false);
		}
	});
}














