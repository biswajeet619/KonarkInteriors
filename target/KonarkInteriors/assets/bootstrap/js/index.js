$(document).ready(function() {
	var base_url = "https://konarkinteriorsapi.cfapps.io";
	$.ajax({
		url : base_url,
		type : "GET",
		error : function(xhr, status, thrownError) {
			$("#serverStatusDisplay").attr("style","");
		},
		success : function(response) {
			$("#serverStatusDisplay").attr("style","display:none;");
		}
	});
});