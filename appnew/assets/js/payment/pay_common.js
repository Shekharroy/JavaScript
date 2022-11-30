/**
* method to invoke the adapter call
*/
function invokeAdapterCallFromPayment(type,posturl,base64authheader,jsoninout,jsonextraparam) {
	invokeAdapterCall(type,posturl,base64authheader,jsoninout,jsonextraparam);
	//var base64authheadernew = getauthtokenfromlocal();
	//invokeAdapterCall(type,posturl,base64authheadernew,jsoninout,jsonextraparam);
}

/**
 * method to call show confirm message
 * @param txt
 * @param type
 * @param duration
 * @param targetdvid
 * @returns {Boolean}
 */
function paymentShowconfirmmsg(txt, type, duration, targetdvid, ispop, confirm)
{
	if(ispop) showconfirmmsgpopup(txt, type, duration, targetdvid, confirm);
	else {
		if(type == "ASK"){
			showconfirmmsgmain(txt, type, duration, targetdvid, confirm);
		} else {
			$('body').topAlertjs({
				type: type,
				message: txt,
				close: true,
				duration: 10
			});
		}
	}
}

function DashboardCommonEvents(){
	var src = fetchLogo();

    $("#clogoimg").attr("src", src);
	currency = "RS.";
	if(localStorage._zs == "B") {
		$("#div_individual_first").remove();
		$("#div_business_first").show();
		max_users = 20;
		priceanual = "37559";
		pricemonth = "3266";
		plan_Selected = 2;
		$("#div_bus_feature").show();
		$("#div_bus_feature_edit").show();
	} else {
		$("#div_business_first").remove();
		$("#div_individual_first").show();
		max_users = 1;
		priceanual = "20306";
		pricemonth = "1846";
		plan_Selected = 1;
		$("#div_ind_feature").show();
		$("#div_ind_feature_edit").show();
	}

    ChoosePlan();
    PaymentHistory();
    ViewPayment();
    PaymentBusiness();
    CompletePayment();
    paymentModeSelect();
    paymentCheckDiscount();
    $("input[name=radioselectmode][value=2]").prop('checked', true);

	language = window.navigator.userLanguage || window.navigator.language;
	selectedformat = formats[language.toLowerCase()];
	timezone = (jstz.determine()).name();

	$(".inputClass,.inputClass1,.form-control").attr("autocomplete", "off");
}

function paymentShowAddDetails(){
	$("#txtstorage").val($("#span_storage").html());
	if(mode_selected == 1){
		$("#txtprice").val(currency+pricemonth);
		$("#txtmode").val("MONTHLY");
		$("#p5").html("1 Month");
	} else if(mode_selected == 2){
		$("#txtprice").val(currency+priceanual);
		$("#txtmode").val("ANNUAL");
		$("#p5").html("12 Months");
	}

	$("#p1").html($("#txtprice").val());
	$("#p2").html(0);
	$("#p3").html($("#txtstorage").val());
	$("#p4").html(max_users);
	$("#p6").html($("#txtprice").val());

	$("#txtdiscountcoupon").val("");
	$("#pay_fname").val("");
	$("#pay_lname").val("");
	$("#pay_mail").val("");
	$("#pay_pno").val("");
	$("#pay_address").val("");
}

function paymentBuildJson(transactionId){
	var invoiceNumber = "INV_" + transactionId;
	var pricePaid = $("#p6").html().replace(currency, "");
	var actualPrice = $("#txtprice").val().replace(currency, "");
	var discount = $("#p2").html().replace("%", "");
	var sm = {
		transactionId:transactionId,
		invoiceNumber:invoiceNumber,
		planId:plan_Selected,
		discountCoupon:$("#txtdiscountcoupon").val(),
		discount:discount,
		actualPrice:actualPrice,
		pricePaid:pricePaid,
		firstName:$("#pay_fname").val(),
		lastName:$("#pay_lname").val(),
		emailAddress:$("#pay_mail").val(),
		phoneNumber:$("#pay_pno").val(),
		userId:localStorage._zv,
		address:$("#pay_address").val(),
		mode:mode_selected
	};
	return sm;
}

function paydisplaydetails(index){
	$('#pay_history').hide();
	$('#chooseplan_cont').hide();
	$('#cont_box').show();
	$('#payment_data_view').show();
	$('#btn_makepay').css('background-color', '#fff');
    $('#btn_payhistory').css('background-color', '#fff');
    var data = paydetails[index];
	$("#txtpriceview").val(currency+data.actualPrice);
	var data = paydetails[index];
	var planName = data.planName;
	var storage = "3 TB";
	var nousers = "20";
	if(planName == "INDIVIDUAL") {
		storage = "1 TB";
		nousers = "1";
	}
	$("#txtstorageview").val(storage);
	var mode = "Annually";
	var duration = "12 Months";
	if(data.mode == "1") {
		mode = "Monthly";
		duration = "1 Month";
	}
	$("#txtmodeview").val(mode);
	$("#txtfirstnameview").val(data.firstName);
	$("#txtlastnameview").val(data.lastName);
	$("#txtemailview").val(data.emailAddress);
	$("#txtpnoview").val(data.phoneNumber);
	$("#txtaddressview").val(data.address);
	var nextDueDate = "";
	try{
		nextDueDate = Date.parse(data.nextDueDate);
		var d = new Date(nextDueDate);
		nextDueDate = getdatefromtimestamp(d);
	}catch(error){}
	$("#txtnextduedate").val(nextDueDate);
	$("#p1view").html(currency+data.actualPrice);
	$("#p2view").html(data.discount+"%");
	$("#p3view").html(storage);
	$("#p4view").html(nousers);
	$("#p5view").html(duration);
	$("#p6view").html(currency+data.pricePaid);
	$("#txtdiscountcouponview").val(data.discountCoupon);
}