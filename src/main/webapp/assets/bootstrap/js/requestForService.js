$(document).ready(function() {
	$(function() {
		$("#dialog").dialog({
			modal : true,
			autoOpen : false,
			title : "Data Validation",
			width : 300
		});
	});
	var base_url = "https://konarkinteriorsapi.cfapps.io";
	$('#submit').click(function() {
		var postData = {};
		var errorHtml = "";
		if ($('#inputServiceType').val() == '0') {
			errorHtml = errorHtml + "Please select a request type\n<br>";
		}
		var email = $('#inputEmail').val();
		var atposition=email.indexOf("@");  
		var dotposition=email.lastIndexOf(".");  
		if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
		  errorhtml = errorhtml + "Please enter valid email\n<br>";
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
		postData['customerReqAptDate'] = $('#Date').val();
		postData['customerReqSlot'] = $('#inputSlot').val();
		console.log(postData);
		$.ajax({
			url : base_url + '/saveservicerequest',
			type : "POST",
			data : JSON.stringify(postData),
			dataType : "json",
			contentType : "application/json",
			error : function(xhr, status, thrownError) {
				alert("Error while processing request");
			},
			success : function(response) {
				if (response > 0) {
					alert("Request Successfull Reference id #" + response);
				} else {
					alert("Error while processing request");
				}
			}
		});
	});
});