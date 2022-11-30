function setDomainAppURL(){
	cloudURLACTDomain = window.location.href;
	cloudURLACTDomain = cloudURLACTDomain.replace(cloudURLProtocol, "");
	cloudURLACTDomain = cloudURLACTDomain.substring(0, cloudURLACTDomain.indexOf("/"));
	cloudURLACT = cloudURLProtocol + cloudURLACTDomain;
	cloudApiUrlACMS = cloudURLProtocol + cloudURLACTDomain + "/api.acms";
}

function getauthtokenfromlocal(){
	if(navigator.cookieEnabled){
		if(typeof(Storage) !== "undefined") return localStorage._zx;
		return "";
	} else {
		admShowconfirmmsg("Please enable cookies to proceed.", confirm_Error, 5000, "", false, false);
	}
}