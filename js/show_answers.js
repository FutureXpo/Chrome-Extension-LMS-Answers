//По окончании загрузки документа вызывается функция
$(document).ready(function() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if(page === 'index.html') {
		//При получении команды 'show' показывает ответы
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
			if(request.command==="show") {
				show();
			}
		});
		//Если выбрана функция автоматического показа ответов заппускается функция показа ответов
		chrome.storage.sync.get(['show_answers'], function(items) {
			var choise=items['show_answers'];
			if(choise == undefined) choise = true;
			if(choise){
				var timerId = setInterval(show, 2000);
				setTimeout(function() {
					clearInterval(timerId);
				}, 7000);
			}
		});
	}
})

//Показать ответы
function show() { 
	$('*[class^="correct"]').show().removeClass('ng-hide').parent().show().removeClass('ng-hide'); 
	$('*[ng-show^="doShowAnswer"]').removeClass("ng-hide").has('input').find('input').remove();
	$('table.ng-hide').removeClass('ng-hide'); 
	$('section').css('user-select','initial');
}