//По окончании загрузки документа вызывается функция
$(document).ready(function() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if(page === 'index.html') {
		//При получении команды 'auto_mode' заполняет ответы
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
			if(request.command==="auto_mode") {
				auto_mode();
			}
		});
		//Если выбрана функция автоматического показа ответов запускается функция заполнения ответов
		chrome.storage.sync.get(['auto_mode'], function(items) {
			var choise=items['auto_mode'];
			if(choise == undefined) choise = true;
			if(choise){
				var timerId = setInterval(auto_mode, 2000);
				setTimeout(function() {
					clearInterval(timerId);
				}, 7000);
			}
		});
	}
})
//Заполнить ответы
function auto_mode() { 
	var test,answers;
	
	test = document.getElementsByClassName('selectBox');
	answers = document.getElementsByTagName('b');
	if(test&&answers) fill_selectbox(test,answers);
}
//Заполнить задания, где есть selectBox
function fill_selectbox(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(answers_arr)answers_arr.forEach(function(item, i) {
		var a = item.innerHTML;
		Array.prototype.slice.call(test_arr[i].options).forEach(function(item) {
		//	alert(item.value);
			if(item.value.includes(a)) {
				var b = item.value.replace(a, '');
				if( b.search(/[a-zA-Z]/) === -1 ) test_arr[i].value = item.value;
			}
		});
	});
}