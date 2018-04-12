function injected_main() {
	$('*[class^="correct"]').show().removeClass("ng-hide").parent().show().removeClass("ng-hide"); 
	$("table.ng-hide").removeClass("ng-hide"); 
	$("section").css("user-select","initial");
}
