$(document).ready(function() {
	$(function() {
		$("#Date").datepicker({
				  dateFormat: "yy-mm-dd",
				  minDate:1,
				  maxDate:14
		});
		$("#dialog").dialog({
			modal : true,
			autoOpen : false,
			title : "Data Validation",
			width : 'auto',
			height: 'auto'
		});
		$("#success").dialog({
			modal : true,
			autoOpen : false,
			title : "Success",
			width : 'auto',
			height: 'auto',
			buttons: {
		        'Ok': function() {
		        	location.href=window.location.origin;
		        }
		    }
		});
		$("#error").dialog({
			modal : true,
			autoOpen : false,
			title : "Error",
			width : 'auto',
			height: 'auto',
			buttons: {
		        'close': function() {
		        	$("#error").dialog("close");
		        }
		    }
		});
		$("#loader").dialog({
			dialogClass: "no-close",
			modal : true,
			autoOpen : false,
			width : 'auto',
			height: 'auto'
		});
	});
	disableAllSlots();
	var base_url = "https://konarkinteriorsapi.cfapps.io";
	$('#Date').change(function(){
		disableAllSlots();
		var d = $(this).val();
		$.ajax({
			url : base_url + '/getslots/'+d,
			type : "GET",
			beforeSend: function(){
				$("#loader").dialog("open");
				$(".no-close .ui-dialog-titlebar").attr("style","display:none;");
			},
			complete: function(){
				$("#loader").dialog("close");
			},
			error : function(xhr, status, thrownError) {
				$("#error").html("Failed to load slots");
				$("#error").dialog("open");
			},
			success : function(response) {
				if (response.slot1) {
					enableSlot("slot1");			
				}
				if(response.slot2){
					enableSlot("slot2");
				}
				if(response.slot3){
					enableSlot("slot3");
				}
				if(response.slot4){
					enableSlot("slot4")
				}
			}
		});
	});
	$('#submit').click(function() {
		$(".ui-dialog-titlebar-close").attr("class","ui-dialog-titlebar-close ui-button-icon-primary ui-icon ui-icon-closethick");
		var postData = {};
		var errorHtml = "";
		if ($('#inputServiceType').val() == '0') {
			errorHtml = errorHtml + "Please select a request type\n<br>";
		}
		var email = $('#inputEmail').val();
		var atposition=email.indexOf("@");  
		var dotposition=email.lastIndexOf(".");  
		if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
		  errorHtml = errorHtml + "Please enter valid email\n<br>";
		}
		if ($('#inputName').val() == '') {
			errorHtml = errorHtml + "Please enter valid name\n<br>";
		}
		if ($('#inputAddress').val() == '') {
			errorHtml = errorHtml + "Please enter address line1\n<br>";
		}
		if ($('#inputAddress2').val() == '') {
			errorHtml = errorHtml + "Please enter address line2\n<br>";
		}
		if ($('#inputCity').val() == '') {
			errorHtml = errorHtml + "Please enter city name\n<br>";
		}
		if ($('#Zipcode').val().length < 6) {
			errorHtml = errorHtml + "Please enter valid pincode\n<br>";
		}
		var userEntered = new Date($('#Date').val());
		var now = new Date();
		if(userEntered<now){
			errorHtml = errorHtml + "Please select a future date\n<br>";
		}
		if($('#inputSlot').val() == '0'){
			errorHtml = errorHtml + "Please select the slot\n<br>"
		}
		if (errorHtml != '') {
			$("#dialog").html(errorHtml);
			$("#dialog").dialog("open");
			return;
		}
		postData['customerRequestType'] = $('#inputServiceType').val();
		postData['customerEmail'] = $('#inputEmail').val();
		postData['customerName'] = $('#inputName').val();
		postData['customerAddressLine1'] = $('#inputAddress').val();
		postData['customerAddressLine2'] = $('#inputAddress2').val();
		postData['customerCity'] = $('#inputCity').val();
		postData['customerPincode'] = $('#Zipcode').val();
		postData['date'] = $('#Date').val();
		postData['slot'] = $('#inputSlot').val();
		console.log(postData);
		$.ajax({
			url : base_url + '/saveservicerequest',
			type : "POST",
			data : JSON.stringify(postData),
			dataType : "json",
			contentType : "application/json",
			beforeSend: function(){
				$("#loader").dialog("open");
				$(".no-close .ui-dialog-titlebar").attr("style","display:none;");
			},
			complete: function(){
				$("#loader").dialog("close");
			},
			error : function(xhr, status, thrownError) {
				$("#error").html("Error while processing request");
				$("#error").dialog("open");
			},
			success : function(response) {
				if (response > 0) {
					$("#success").html("Request Successfull Reference id #" + response);
					$("#success").dialog("open");
				} else {
					$("#error").html("Error while processing request");
					$("#error").dialog("open");
				}
			}
		});
	});
});
function disableAllSlots(){
	for (var i = 1; i <= 4; i++) {
		$('option[value="slot'+i+'"]').attr("style","display:none;");
	}
}
function enableSlot(option){
	$('option[value='+option+']').attr("style","");
}