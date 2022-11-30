function paymentSendServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 200 && response.object != null){
		paymentShowconfirmmsg(payment_messages.paymentdone, confirm_Success, 5000, "", false, false);
		$('#btn_payhistory').click();
	} else {
		paymentShowconfirmmsg(payment_messages.paymenterror, confirm_Error, 5000, "", false, false);
	}
}

function paymentDiscountListServiceAfter(response){
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		if(data != null && data.length == 1){
			var discount = data[0].description;
			var price = $("#txtprice").val().replace(currency, "");
			var pricetobepaid = parseFloat(price) * (parseFloat(discount)/100);
			pricetobepaid = price - pricetobepaid;
			$("#p2").html(discount+"%");
			$("#txtprice").val(currency+price);
			$("#p6").html(currency+pricetobepaid);
		} else {
			paymentShowconfirmmsg(payment_messages.invaliddiscountcode, confirm_Error, 5000, "", false, false);
		}
	} else {
		paymentShowconfirmmsg(payment_messages.invaliddiscountcode, confirm_Error, 5000, "", false, false);
	}
}

function payHistoryServiceAfter(response){
	$("#divpayhistory").html("");
	paydetails = [];
	ajaxindicatorstop();
	if(response.error == false && response.messageCode == 200 && response.object != null){
		var data = response.object;
		if(data != null && data.length > 0){
			paydetails = data;
			for(var i=0;i<data.length;i++){
				var transid = data[i].transactionId;
				var planName = data[i].planName;
				var mode = "Annually";
				if(data[i].mode == "1") mode = "Monthly";
				var pricePaid = data[i].pricePaid;
				var paymentDate = Date.parse(data[i].paymentDate);
				var d = new Date(paymentDate);
				paymentDate = getdatefromtimestamp(d);
				var storage = "3 TB";
				if(planName == "INDIVIDUAL") storage = "1 TB";
				var payhtml = "";
				payhtml += "<div class=\"row cur_p pay_view\" id=\"div_payrow_"+i+"\" style=\"padding-top: 15px; padding-bottom: 10px; padding-left: 14px;\">";
				payhtml += "<div class=\"col-md-3\" style=\"font-size: 14px;\">"+transid+"</div>";
				payhtml += "<div class=\"col-md-2\" style=\"font-size: 14px;\">"+planName+"</div>";
				payhtml += "<div class=\"col-md-2\" style=\"font-size: 14px;\">"+mode+"</div>";
				payhtml += "<div class=\"col-md-2\" style=\"font-size: 14px;\">"+currency+pricePaid+"</div>";
				payhtml += "<div class=\"col-md-2\" style=\"font-size: 14px;\">"+paymentDate+"</div>";
				payhtml += "<div class=\"col-md-1\" style=\"font-size: 14px;\">"+storage+"</div>";
				payhtml += "</div>";
				payhtml += "<hr style=\"border-top: 1px solid rgba(0,0,0,.1);margin-top: 5px;margin-bottom: 0px;\">";
				$("#divpayhistory").append(payhtml);
				ViewPayment("div_payrow_"+i);
				//paydetails.push(data[i]);
			}
		}
	}
}