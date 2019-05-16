$(document).ready(function() {
	var base_url = "https://konarkinteriorsapi.cfapps.io";
	$('#submit').click(function() {
		var postData = {};
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