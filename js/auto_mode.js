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
var init = 0;
//Заполнить ответы
function auto_mode() { 
	var test,answers;
	answers = document.getElementsByTagName('b');
	//select box
	test = document.getElementsByClassName('selectBox');
	if(test&&answers) fill_selectbox(test,answers);
	//text input
	test = document.getElementsByTagName('input');
	if(test&&answers) fill_input(test,answers);
	
	//radio button
	test = document.getElementsByClassName('option_horizontal');
	answers = document.getElementsByClassName('correct-answers');
	if(test&&answers) fill_radio(test,answers);
}
//Заполнить задания, где есть selectBox
function fill_selectbox(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		var a = item.innerHTML;
		if(test_arr[i])
		Array.prototype.slice.call(test_arr[i].options).forEach(function(item) {
		//	alert(item.value);
			if(item.value.includes(a)) {
				var b = item.value.replace(a, '');
				if( b.search(/[a-zA-Z]/) === -1 ) test_arr[i].value = item.value;
			}
		});
	});
}
//Заполнить задания, где есть selectBox
function fill_input(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		if(test_arr[i].getAttribute("type")!=="radio"){
			test_arr[i].setAttribute("class","inputBox ng-scope ng-valid ng-dirty");
			test_arr[i].value = item.innerHTML + "-";
			if(init===0)alert("Не забудьте убрать знак '-' в каждом задании");
			init = 1;
		}
	});
}
//Заполнить задания, где есть radio buttons
function fill_radio(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		var radio_arr = Array.prototype.slice.call(test_arr[i].getElementsByTagName('input'));
		var text_answers_arr = Array.prototype.slice.call(answers_arr[i].getElementsByTagName('b'));
		var answer = "";
		if(text_answers_arr) text_answers_arr.forEach(function(item1) {answer+=item1.innerHTML});
		answer=answer.replace(/(^\s*)|(\s*)$/g, '');
		var text_test_arr = Array.prototype.slice.call(test_arr[i].getElementsByClassName('optionText'));
		if(text_test_arr) text_test_arr.forEach(function(item1,j) {
			if(item1.innerHTML.includes(answer)) {
				var c = item1.innerHTML.replace(answer, '');
				if( c.search(/[a-zA-Z]/) === -1 ) radio_arr[j].click();
			}
		});
	});
}