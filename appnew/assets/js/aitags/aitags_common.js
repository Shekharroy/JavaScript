
function hightlightText(){
	checkUserswitchAccount();
	urlparam = (window.location.href).split("?")[1];
	docId = urlparam.split("&")[1];
	docId = docId.replace("d=", "");
	urlparam = urlparam.split("&")[0];
	urlparam = urlparam.replace("t=", "");
	cloudURLACTDomain = window.location.href;
	cloudURLACTDomain = cloudURLACTDomain.replace(cloudURLProtocol, "");
	cloudURLACTDomain = cloudURLACTDomain.substring(0, cloudURLACTDomain.indexOf("/"));
	cloudApiUrlACMS = cloudURLProtocol + cloudURLACTDomain + "/api.acms";
	urlparam = cloudApiUrlACMS+"/pages/"+urlparam;
	tagCommonEvent();
	fetchTagsInfo();
	tagsFetchWaterMarkTextService();
}

function siteLoaded(){
	$("#icon_refresh_tags").click();
	if(watermarktext.length > 0){
		var body = $("#metadata_viewerboxid").contents().find("body");


		if (watermarkmulti.split(",").length == 3) {
			if (watermarkmulti == "2,0,1") {
				$(body).append("<div class='watermarked_multi_accross' data-watermark='" + watermarktext + "' style='color:" + watermarkcolor + "'; id='watermarked'></div>");
			} else if (watermarkmulti == "2,1,0") {
				$(body).append("<div class='watermark_single_cross' style='color:" + watermarkcolor + "';>" + watermarktext + "</div>");
			}
		} else if (watermarkmulti.split(",").length == 5) {
			if (watermarkmulti.split(",")[1] == 1) {
				$(body).append("<div class='watermark_single_cross_left' style='color:" + watermarkcolor + "';>" + watermarktext + "</div>");
			}
			if (watermarkmulti.split(",")[2] == 1) {
				$(body).append("<div class='watermark_single_cross_top' style='color:" + watermarkcolor + "';>" + watermarktext + "</div>");
			}
			if (watermarkmulti.split(",")[3] == 1) {
				$(body).append("<div class='watermark_single_cross_right' style='color:" + watermarkcolor + "';>" + watermarktext + "</div>");
			}
			if (watermarkmulti.split(",")[4] == 1) {
				$(body).append("<div class='watermark_single_cross_bottom' style='color:" + watermarkcolor + "';>" + watermarktext + "</div>");
			}
		}

		var iframe = document.getElementById('metadata_viewerboxid');
		var innerDoc = 	(iframe.contentDocument) ? iframe.contentDocument:iframe.contentWindow.document;

		var cssLink = document.createElement("link");
		cssLink.href = cloudURLProtocol+cloudURLACTDomain+"/appnew/assets/css/aicss/aisplit.css?v=1.7";
		cssLink.rel = "stylesheet";
		cssLink.type = "text/css";
		innerDoc.head.appendChild(cssLink);

		if(watermarkmulti == "2,0,1"){
			Array.from(innerDoc.getElementsByClassName('watermarked_multi_accross')).forEach(function(el) {
				el.dataset.watermark = (el.dataset.watermark + ' ').repeat(multilinewatermark);
			});
		}
	}
}

function tagSearch(tag, fieldname){
	var attributearr = [];
	attributearr[0] = fieldname+"<#HASH;>string<#HASH;>" + tag;
	var response = { "object": "", "error": false, "overwrite": 1 };
	response.object = searchJSONLowerCaseMatchMultiple(tagarr, attributearr);
	return response;
}

function tagsFocus(){
	$("#metadata_viewerboxid").contents().find(".idclass1").css("border", "0px");
	var iframe = document.getElementById('metadata_viewerboxid');
	var innerDoc = 	(iframe.contentDocument) ? iframe.contentDocument:iframe.contentWindow.document;

	var ulObj = innerDoc.getElementById(lastIndexArr[lastIndex]);
	ulObj.style.border = "20px solid #000";
	var tp = $(ulObj).offset().top;
	iframe.contentWindow.scrollTo(0, tp);
}

function tagsaisort(array, order) {
    return array.sort(order === 'DESC'
        ? function (b, a) {
            a = a.name.slice(0, 3);
            b = b.name.slice(0, 3);
            return isNaN(b) - isNaN(a) || a > b || -(a < b);
        }
        : function (a, b) {
            a = a.name.slice(0, 3);
            b = b.name.slice(0, 3);
            return isNaN(a) - isNaN(b) || a > b || -(a < b);
        });
}

function tagscustomsort(array, order) {
    return array.sort(order === 'DESC'
        ? function (b, a) {
            a = a.tag.slice(0, 3);
            b = b.tag.slice(0, 3);
            return isNaN(b) - isNaN(a) || a > b || -(a < b);
        }
        : function (a, b) {
            a = a.tag.slice(0, 3);
            b = b.tag.slice(0, 3);
            return isNaN(a) - isNaN(b) || a > b || -(a < b);
        });
}

function fetchTagsInfo() {
	var url = window.location.href;
	url = url.replace(/%20/g, " ");
	$('#fileName').html(url.split("?")[2]);
	$("#txt_auto_tag_name").val("");
	if($("#sel_tags").val() == 1){
		tagoccr.length = 0;
		fetchAITagsService();
	} 
	else if($("#sel_tags").val() == 2) TagsCustomFetchService();
}

function tagResetHighlights() {
	$("#metadata_viewerboxid").contents().find(".idclass1").css("background", "none");
	$("#metadata_viewerboxid").contents().find(".idclass1").css("border", "0px");
	$("#metadata_viewerboxid").contents().find(".idclass1").removeAttr("id");
	$("#metadata_viewerboxid").contents().find(".idclass1").removeClass("idclass1");
}


function checkUserswitchAccount(){
	tagBaseauth = getauthtokenfromlocal();
	setInterval(function(){
		if (tagBaseauth != getauthtokenfromlocal()) {
			window.location.href = "error.html";
		}
	}, 1000);
}

