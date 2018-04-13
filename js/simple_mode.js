chrome.storage.sync.get(['simple_mode'], function(items) {
	var choise=items['simple_mode'];
	if(choise == undefined) choise = false;
	if(choise) simple_mode_on();
});
//id и class ненужных элементов
var massiv_id = ['header','dashboard-toogle','skip-link','tools-iframe','cboxOverlay','colorbox','autologout-cache-check'];
var massiv_name = ['content-page-header','header-content scorm-header clearfix','region region-footer','left-nav hide','ipad-popup','top-btn save ipad-pos f-right disableMultipleClick-processed'];
//Включить простого вида
function simple_mode_on() {	
	var a;
	a = document.getElementsByClassName('header-content scorm-header clearfix addBorder-top')[0];
	if(a) a.setAttribute("class", "header-content scorm-header clearfix");
	a = document.getElementsByClassName('main-content remove-pad hide clearfix')[0];
	if(a) a.setAttribute("style", "display:block;");
	a = document.getElementsByClassName('header-content scorm-header clearfix addBorder-top')[0];
	if(a) a.setAttribute("class", "header-content scorm-header clearfix");
	a = document.getElementById('content');
	if(a) a.setAttribute('id','content_');
	a = document.getElementsByClassName("scromoverlaydiv")[0];
	if(a) a.remove();
	a = document.getElementById('content-iframe');
	if(a) a.setAttribute("style", "position:relative;display:block;height:93vh;visibility: visible;margin-left:-0.7%")
	//Убираем отображение всех элементов из массивов
	massiv_id.forEach(function(item, i, arr) {
		a = document.getElementById(item);
		if(a) a.setAttribute("style","transform: scale(0);margin-top:-9%");
	});
	massiv_name.forEach(function(item, i, arr) {
		a = document.getElementsByClassName(item)[0];
		if(a) a.setAttribute("style","transform: scale(0);");
	});
}
//Выключить простого вида
function simple_mode_off() {
	var a;
	a = document.getElementsByClassName('dashboard-toggle-bg')[0];
	if(a) a.innerHTML = "Hide Dashboard";	
	a = document.getElementById('content_');
	if(a) a.setAttribute('id','content');
	if(a) a.removeAttribute("style");
	a = document.getElementById('content-iframe');
	if(a) a.setAttribute("style", "position:relative;display:block;height:93vh;visibility: visible;");
	//Возвращаем отображение всех элементов из массивов
	massiv_id.forEach(function(item, i, arr) {
		a = document.getElementById(item);
		if(a) a.removeAttribute("style");
	});
	massiv_name.forEach(function(item, i, arr) {
		a = document.getElementsByClassName(item)[0];
		if(a) a.removeAttribute("style");
	});
}
//Ожидание команд
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
	if(request.command==="simple_mode_on") {
		simple_mode_on();
	}
	if(request.command==="simple_mode_off") {
		simple_mode_off();
	}
});