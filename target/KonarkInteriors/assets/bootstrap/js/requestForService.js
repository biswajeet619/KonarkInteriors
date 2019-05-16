$(document).ready(function() {
	$('#submit').click(function() {
		var postData = {};
		postData['customerRequestType'] = $('#inputServiceType').val();
		postData['customerEmail']=$('#inputEmail').val();
		postData['customerName']=$('#inputName').val();
		postData['customerAddressLine1']=$('#inputAddress').val();
		postData['customerAddressLine2']=$('#inputAddress2').val();
		postData['customerCity']=$('#inputCity').val();
		postData['customerPincode']=$('#Zipcode').val();
		postData['customerReqAptDate']=$('#Date').val();
		postData['customerReqSlot']=$('#inputSlot').val();
		console.log(postData);
	});
});