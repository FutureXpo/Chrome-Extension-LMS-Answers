function injected_main() {
	var timerId = setInterval(show, 2000);
	setTimeout(function() {
	  clearInterval(timerId);
	}, 7000);
}
function show() {
	$('*[class^="correct"]').show().removeClass("ng-hide").parent().show().removeClass("ng-hide"); 
	$("table.ng-hide").removeClass("ng-hide"); 
	$("section").css("user-select","initial");
}
