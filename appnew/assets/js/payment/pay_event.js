function ChoosePlan(){
    $('#btn_makepay').click(function(){
        $('#pay_history').hide();
        $('#payment_data_view').hide();
        $('#complete_payment').hide();
        $('#cont_box').show();
        $('#chooseplan_cont').show();
        $('#btn_makepay').css('background-color', '#edf4ff');
        $('#btn_payhistory').css('background-color', '#fff');
		//$("input[name=radioselectmode][value=2]").prop('checked', true);
    });
}
function PaymentHistory(){
    $('#btn_payhistory').click(function(){
        $('#cont_box').hide();
        $('#complete_payment').hide();
        $('#pay_history').show();
        $('#btn_payhistory').css('background-color', '#edf4ff');
        $('#btn_makepay').css('background-color', '#fff');
        payHistoryService();
    });
}
function ViewPayment(id){
    $('#'+id).click(function(){
		var idm = (this.id).replace("div_payrow_", "");
        paydisplaydetails(idm);
    });
}

function PaymentBusiness(){
    $('#select_plan').click(function(){
        $('#pay_history').hide();
        $('#chooseplan_cont').hide();
        $('#cont_box').show();
        $('#complete_payment').show();
        $('#payment_data_view').hide();
        $('#btn_makepay').css('background-color', '#fff');
        $('#btn_payhistory').css('background-color', '#fff');
        paymentShowAddDetails();
    });
}

function paymentModeSelect(){
	$("input[name = 'radioselectmode']").on('change', function(e) {
		var radioValue = $("input[name='radioselectmode']:checked").val();
		if(radioValue == 1){
			$("#bus_price_year").hide();
			$("#bus_price_month").show();
			$("#ind_price_year").hide();
			$("#ind_price_month").show();
			mode_selected = 1;
		} else if(radioValue == 2){
			$("#bus_price_month").hide();
			$("#bus_price_year").show();
			$("#ind_price_month").hide();
			$("#ind_price_year").show();
			mode_selected = 2;
		}
	});
}

function CompletePayment(){
    $('#btn_paysuccess').click(function(){
        if ( $('#pay_fname').val().length == 0) {
			paymentShowconfirmmsg(payment_messages.enterfirstname, confirm_Error, 5000, "", false, false);
	   }else if ( $('#pay_lname').val().length == 0) {
			paymentShowconfirmmsg(payment_messages.enterlastname, confirm_Error, 5000, "", false, false);
	   }else if(!validateEmail($('#pay_mail').val())){
			paymentShowconfirmmsg(payment_messages.enteremail, confirm_Error, 5000, "", false, false);
	   }else if ( $('#pay_pno').val().length == 0) {
			paymentShowconfirmmsg(payment_messages.enterphonenumber, confirm_Error, 5000, "", false, false);
	   }else if ( $('#pay_address').val().length == 0) {
			paymentShowconfirmmsg(payment_messages.enteraddress, confirm_Error, 5000, "", false, false);
	   } else {
		   	paymentSendService();
	   }
    });
}

function paymentCheckDiscount(){
	$('#btn_checkdiscount').click(function(){
		if($("#txtdiscountcoupon").val().trim().length > 0){
			paymentDiscountListService($("#txtdiscountcoupon").val());
		} else {
			paymentShowconfirmmsg(payment_messages.enterdiscountcode, confirm_Error, 5000, "", false, false);
		}
	});
}

//Dynamic logo
var img = new Image();
var div = document.getElementById('customerLogo');


img.onload = function () {

	div.innerHTML += '<img src="' + img.src + '" style = "width="88px;" height="78px;" />';

};


img.src = 'assets/img/Google.jpg';