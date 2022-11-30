function paymentSendService(){
	var pricePaid = $("#p6").html().replace(currency, "");
	pricePaid = parseFloat(pricePaid) * 100;
	var options = {
		"key": "rzp_test_E8XjMvysqIfXZV",
		"amount": pricePaid, // Example: 2000 paise = INR 20
		"name": "DCirrus PVT LTD.",
		"description": "description",
		"image": "assets/icons/DCirrus.png?v=1.0",// COMPANY LOGO
		"handler": function (response) {
			//console.log(response);
			ajaxindicatorstart('sending payment info.. please wait..');
			var jsonInput = paymentBuildJson(response.razorpay_payment_id);
			var type = updateMethod;
			var posturl = cloudApiUrlACMS+"/v1/lawfirm/payment/add/<ACTION>";
			posturl = posturl.replace("<ACTION>", "paymentSendServiceAfter");
			invokeAdapterCallFromPayment(type, posturl, "", jsonInput, "");
		},
		"prefill": {
			"name": $("#pay_fname").val(), // pass customer name
			"email": $("#pay_mail").val(),// customer email
			"contact": $("#pay_pno").val() //customer phone no.
		},
		"notes": {
			"address": $("#pay_address").val() //customer address
		},
		"theme": {
			"color": "#15b8f3" // screen color
		}
	};
	//console.log(options);
	var propay = new Razorpay(options);
	propay.open();
}

function paymentDiscountListService(discountcode){
	ajaxindicatorstart('validating discount code... please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/lawfirm/payment/discount/<DISCOUNT>/<ACTION>";
	posturl = posturl.replace("<ACTION>", "paymentDiscountListServiceAfter");
	posturl = posturl.replace("<DISCOUNT>", discountcode);
	invokeAdapterCallFromPayment(type, posturl, "", "", "");
}

function payHistoryService(){
	ajaxindicatorstart('fetching payment history... please wait..');
	var type = updateMethod;
	var posturl = cloudApiUrlACMS+"/v1/lawfirm/payment/history/<ACTION>";
	posturl = posturl.replace("<ACTION>", "payHistoryServiceAfter");
	invokeAdapterCallFromPayment(type, posturl, "", "", "");
}