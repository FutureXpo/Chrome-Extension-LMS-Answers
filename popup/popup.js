document.addEventListener('DOMContentLoaded', function() {
	loadOptions();
    var showButton = document.getElementById('showBtn');
    showButton.addEventListener('click', function() { 
        show();
    }, false);
	var autoChecker = document.getElementById('auto_mode');
    autoChecker.addEventListener('change', function() { 		
		saveOptions();
		auto_mode();
    }, false);
	var showChecker = document.getElementById('show_mode');
    showChecker.addEventListener('change', function() { 
		saveOptions();
        if(showChecker.checked)show();
    }, false);
	var simpleChecker = document.getElementById('simple_mode');
    simpleChecker.addEventListener('change', function() { 
		saveOptions();
		simple_mode();
    }, false);
	var trueChecker = document.getElementById('true_mode');
    trueChecker.addEventListener('change', function() { 		
		saveOptions();
		true_mode();
    }, false);
}, false);

function loadOptions() {
	chrome.storage.sync.get(['show_mode','simple_mode','true_mode','auto_mode'], function(items) {
		var choise=items['show_mode'];
		if(choise == undefined) choise = true;
		var select = document.getElementById("show_mode");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
		else chrome.browserAction.setBadgeText({text: "off"});
		
		choise=items['simple_mode'];
		if(choise == undefined) choise = false;
		var select = document.getElementById("simple_mode");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
		
		choise=items['true_mode'];
		if(choise == undefined) choise = false;
		var select = document.getElementById("true_mode");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
		
		choise=items['auto_mode'];
		if(choise == undefined) choise = false;
		var select = document.getElementById("auto_mode");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
    });
}

function saveOptions() {
	var select = document.getElementById("show_mode");
	chrome.storage.sync.set({'show_mode': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
	else chrome.browserAction.setBadgeText({text: "off"});
	
	select = document.getElementById("simple_mode");
	chrome.storage.sync.set({'simple_mode': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
	
	select = document.getElementById("true_mode");
	chrome.storage.sync.set({'true_mode': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
	
	select = document.getElementById("auto_mode");
	chrome.storage.sync.set({'auto_mode': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
}

function show() {
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command: "show"});
	});
}

function auto_mode() {
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command: "auto_mode"});
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

function true_mode() {
	alert("Чтобы обновления вступили в силу обновите страницу");
	var select = document.getElementById("true_mode");
	if(select.checked===true) 
		chrome.runtime.sendMessage({msg: "auto_on"})
	else
		chrome.runtime.sendMessage({msg: "auto_off"});
}