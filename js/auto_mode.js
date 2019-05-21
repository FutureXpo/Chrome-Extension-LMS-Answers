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
			if(choise == undefined) choise = false;
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
	//select box
	test = document.getElementsByClassName('selectBox');
	answers = document.getElementsByTagName('b');
	if(test&&answers) fill_selectbox(test,answers);
	//phrases
	test = document.getElementsByClassName('all-items-drop');
	answers = document.getElementsByClassName('correctAnswer');
	if(test&&answers) fill_phrases(test,answers);
	//radio_columns
	test = document.getElementsByTagName('input');
	if(test) fill_columns(test);
	//radio button
	test = document.getElementsByClassName('option_horizontal');
	answers = document.getElementsByClassName('correct-answers');
	if(test&&answers) fill_radio(test,answers);
	//crossword
	test = document.getElementsByClassName('word-Box')[0];
	answers = document.getElementsByClassName('all-words-Answer')[0];
	if(test&&answers) fill_crossword(test,answers);
	//pronunciation
	test = document.getElementsByClassName('categories')[0];
	answers = document.getElementsByClassName('categories')[1];
	if(test&&answers) fill_pronunciation(test,answers);
	//text input
	test = document.getElementsByClassName('inputBox');
	answers = document.getElementsByClassName('correctAnsDiv');
	if(test&&answers) fill_input(test,answers);
	//editDiv
	test = document.getElementsByClassName('editableDiv');
	answers = document.getElementsByClassName('correctAnsDiv');
	if(test&&answers) fill_editable(test,answers);
	//moveToken
	test = document.getElementsByClassName('moveToken');
	answers = document.getElementsByClassName('answerSentClass');
	if(test&&answers) fill_sorting(test,answers);
}
//Заполнить задания, где есть selectBox
function fill_selectbox(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		var a = item.innerHTML.replace(/(^\s*)|(\s*)$/g, '');;
		if(test_arr[i])
		Array.prototype.slice.call(test_arr[i].options).forEach(function(item) {
			if(item.value.includes(a)) {
				var b = item.value.replace(a, '');
				if( b.search(/[a-zA-Z]/) === -1 ) test_arr[i].value = item.value;
			}
		});
	});
}
//Заполнить задания, где есть inputBox
function fill_input(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	var txt_answers_arr = [];
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		txt_answers_arr = push_answer_b(item.getElementsByClassName("showAnswersentenseClass"),txt_answers_arr);
	});
	if(answers_arr&&test_arr)test_arr.forEach(function(item, i) {
		if(item.getAttribute("type")!=="radio"&&item.getAttribute("class")!=="inputBox ng-scope ng-valid ng-dirty"){
			item.setAttribute("class","inputBox ng-scope ng-valid ng-dirty");
			item.value = txt_answers_arr[i]+"-";//.innerHTML + "-";
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
		if(text_answers_arr) text_answers_arr.forEach(function(item1) {
			if(item1.innerHTML.search(/[a-zA-Z]/)===-1)answer=answer.substring(0,answer.length-1);
			answer+=item1.innerHTML.replace(/(^\s*)|(\s*)$/g, '');
			if(item1.innerHTML!=='-')answer+=' ';
		});
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
//Заполнить кроссворд
function fill_crossword(test,answers) { 
	var table_test = test.getElementsByTagName('table')[0];
	var answers_test = answers.getElementsByTagName('table')[0];
	var table_test_arr = Array.prototype.slice.call(table_test.getElementsByTagName('div'));
	var answers_test_arr = Array.prototype.slice.call(answers_test.getElementsByTagName('div'));
	if(table_test_arr&&answers_test_arr) table_test_arr.forEach(function(item,i) {
		item.innerHTML = answers_test_arr[i].innerHTML;
	});
}
//Заполнить произношение
function fill_pronunciation(test,answers) { 
	var test_choises = document.getElementsByClassName('all-items-container')[0].getElementsByClassName('dragger');
	var text_test_choises = Array.prototype.slice.call(document.getElementsByClassName('all-items-container')[0].getElementsByClassName('ng-binding'));
	var table_test = test.getElementsByClassName('category-box');
	var table_answers = answers.getElementsByClassName('category-correctans-box');
	var table_test_arr = Array.prototype.slice.call(table_test);
	var answers_test_arr = Array.prototype.slice.call(table_answers);
	if(answers_test_arr&&table_test_arr) answers_test_arr.forEach(function(item,i) {
		var answers = Array.prototype.slice.call(item.getElementsByClassName('dragger'));
		if(answers) answers.forEach(function(item) {
			var a = item.getElementsByClassName('ng-binding')[0].innerHTML;
			if(text_test_choises) text_test_choises.forEach(function(item,j) {
				if(item.innerHTML === a&&test_choises[j].getAttribute("class")!=="dragger draggable ng-scope ui-draggable cloneDropped opacityDiv") {
					test_choises[j].setAttribute("class","dragger draggable ng-scope ui-draggable cloneDropped opacityDiv");
					var b = test_choises[j].cloneNode(true);
					b.setAttribute("class","dragger draggable ng-scope ui-draggable cloneDropped clone");
					table_test_arr[i].getElementsByClassName('all-items-drop dropped-items drop-dest')[0].append(b);
				}
			});
		});
	});
}
//Заполнить фразы словами
function fill_phrases(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	var test_choises = document.getElementsByClassName('all-items-container')[0];
	var txt_answers_arr = [];
	if(test_choises){
		var text_test_choises = Array.prototype.slice.call(test_choises.getElementsByClassName('ng-binding'));
		test_choises=test_choises.getElementsByClassName('dragger');
	}
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		txt_answers_arr = push_answer_b(answers,txt_answers_arr);
	});
	if(answers_arr&&test_arr)answers_arr.forEach(function(item, i) {
		var lil = 0;
		/*var text_answers_arr = Array.prototype.slice.call(answers_arr[i].getElementsByTagName('b'));
		var a = "";
		if(text_answers_arr) text_answers_arr.forEach(function(item1) {
			if(item1.innerHTML.search(/[a-zA-Z]/)===-1)a=a.substring(0,a.length-1);
			a+=item1.innerHTML.replace(/(^\s*)|(\s*)$/g, '');
			if(item1.innerHTML!=='-')a+=' ';
		});
		a=a.replace(/(^\s*)|(\s*)$/g, '');*/
		var a = txt_answers_arr[i];
		if(text_test_choises) text_test_choises.forEach(function(item,j) {
			if(item.innerHTML.includes(a)) {
				var b = item.innerHTML.replace(a, '');
				if( b.search(/[a-zA-Z]/) === -1 ) 
					if(lil===0&&test_choises[j].getAttribute("class")!=="dragger draggable ng-scope ui-draggable cloneDropped opacityDiv") {
						test_choises[j].setAttribute("class","dragger draggable ng-scope ui-draggable cloneDropped opacityDiv");
						var b = test_choises[j].cloneNode(true);
						test_arr[i].append(b);
						test_arr[i].setAttribute("style",b.getAttribute("style"));
						test_arr[i].setAttribute("class","drop-dest droppable-Item all-items-drop dropped-items ui-droppable droppableWhiteBG droppableTransparentBG");
						b.setAttribute("class","dragger draggable ng-scope ui-draggable cloneDropped clone");
						b.setAttribute("style",b.getAttribute("style")+"position: relative; left: 0px; top: 0px;");
						lil=1;
					}
			}
			
		});
	});
}
//Заполнить задания, где есть radio columns
function fill_columns(test) { 
	var test_arr = Array.prototype.slice.call(test);
	if(test_arr)test_arr.forEach(function(item, i) {
		if(test_arr[i+test_arr.length/2])if(test_arr[i+test_arr.length/2].checked)item.click();
	});
}
//Заполнить задания, где надо перемещать
function fill_sorting(test,answers) { 
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(test_arr&&answers_arr)test_arr.forEach(function(item, i) {
		var text_test_choises = Array.prototype.slice.call(item.getElementsByClassName('ng-binding'));
		var test_choises = Array.prototype.slice.call(item.getElementsByClassName('sorting_li ng-scope'));
		var answer = answers_arr[i].innerHTML.replace(/<[^>]+>/g,'').replace(/(^\s*)|(\s*)$/g, '');
		var size = text_test_choises.length;
		var a = answer;
		var b = "";
		while (size > 0){
			text_test_choises.forEach(function(item1, i) {
				if(item1.innerHTML.toUpperCase().includes(a.toUpperCase())){
					size--;
					answer=answer.substring(a.length,answer.length).replace(/(^\s*)|(\s*)$/g, '');
					a=answer;
					b = b + test_choises[i].outerHTML;
				}
			});
			a = a.substring(0,a.length-1);
		}
		item.innerHTML = b;
	});
}
//Заполнить задания, где надо исправить ошибки
function fill_editable(test,answers) { 
	var test_buttons = document.getElementsByClassName('buttonContainer');
	var test_arr = Array.prototype.slice.call(test);
	var answers_arr = Array.prototype.slice.call(answers);
	if(test_arr&&answers_arr)test_arr.forEach(function(item, i) {
		test_buttons[i].getElementsByTagName('button')[0].click();
		if(!answers_arr[i].innerHTML.includes("No change"))
			item.innerHTML=answers_arr[i].innerHTML.replace(/<[^>]+>/g,'');
	});
}
//Найти ответы в строке(для inputBox)
function push_answer_b(answer_arr,answers_arr){
	var answers = Array.prototype.slice.call(answer_arr);
	if(answers)answers.forEach(function(answers) {
		if(answers){
			var txt = answers.innerHTML+" ";
			var answer = "";
			var mode = 0;
			var i = 0;
			for(var i=0; i<txt.length;i++) {
				var a = txt[i];
				switch(mode){
					case 0:
						if(a === "<"){
							var b = txt.substring(i,txt.length);
							if(b.startsWith("<b>")){
								mode = 2;
							}
						}
						break;
					case 1:
						if(a === "<"){
							var b = txt.substring(i,txt.length);
							if(b.startsWith("</b>")){
								mode = 0;
								if(!b.startsWith("</b><b>")){
									answer=answer.replace(/(^\s*)|(\s*)$/g, '');
									answers_arr.push(answer);
									answer = "";
								}
							}
						}
						else answer += a;
						break;
					case 2:
						if(a === ">"){
							mode = 1;
						}
						break;
				}
			}
		}
	});
	return answers_arr;
}