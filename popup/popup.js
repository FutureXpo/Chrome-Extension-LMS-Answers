document.addEventListener('DOMContentLoaded', function() {
	loadOptions();
    var showButton = document.getElementById('showBtn');
    showButton.addEventListener('click', function() { 
        show();
    }, false);
	var showChecker = document.getElementById('show_answers');
    showChecker.addEventListener('change', function() { 
		saveOptions();
        if(showChecker.checked)show();
    }, false);
	var simpleChecker = document.getElementById('simple_mode');
    simpleChecker.addEventListener('change', function() { 
		saveOptions();
		simple_mode();
    }, false);
	var trueChecker = document.getElementById('true_answers');
    trueChecker.addEventListener('change', function() { 		
		saveOptions();
		autotrue();
    }, false);
}, false);

function loadOptions() {
	chrome.storage.sync.get(['show_answers','simple_mode','true_answers'], function(items) {
		var choise=items['show_answers'];
		if(choise == undefined) choise = true;
		var select = document.getElementById("show_answers");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
		else chrome.browserAction.setBadgeText({text: "off"});
		
		choise=items['simple_mode'];
		if(choise == undefined) choise = false;
		var select = document.getElementById("simple_mode");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
		
		choise=items['true_answers'];
		if(choise == undefined) choise = false;
		var select = document.getElementById("true_answers");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
    });
}

function saveOptions() {
	var select = document.getElementById("show_answers");
	chrome.storage.sync.set({'show_answers': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
	else chrome.browserAction.setBadgeText({text: "off"});
	
	select = document.getElementById("simple_mode");
	chrome.storage.sync.set({'simple_mode': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
	
	select = document.getElementById("true_answers");
	chrome.storage.sync.set({'true_answers': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
}

function show() {
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command: "show"});
	});
}

function simple_mode() {
	var select = document.getElementById("simple_mode");
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, function(tabs) {
		if(select.checked===true) 
			chrome.tabs.sendMessage(tabs[0].id, {command: "simple_mode_on"})
		else
			chrome.tabs.sendMessage(tabs[0].id, {command: "simple_mode_off"})
	});
}

function autotrue() {
	alert("Чтобы обновления вступили в силу обновите страницу");
	var select = document.getElementById("true_answers");
	if(select.checked===true) 
		chrome.runtime.sendMessage({msg: "auto_on"})
	else
		chrome.runtime.sendMessage({msg: "auto_off"});
}