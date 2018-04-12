//По окончании загрузки документа вызывается функция
$(document).ready(function() {
	var timerId = setInterval(show, 2000);
	setTimeout(function() {
		clearInterval(timerId);
	}, 7000);
})

//При получении команды 'show' показывает ответы
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
	if(request.command==="show") show();
});

//Показать ответы
function show() { 
	$('*[class^="correct"]').show().removeClass("ng-hide").parent().show().removeClass("ng-hide"); 
	$("table.ng-hide").removeClass("ng-hide"); 
	$("section").css("user-select","initial");
}