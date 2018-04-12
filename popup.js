document.addEventListener('DOMContentLoaded', function() {
	loadOptions();
    var showButton = document.getElementById('showBtn');
    showButton.addEventListener('click', function() { 
        show();
    }, false);
	var showChecker = document.getElementById('choiser');
    showChecker.addEventListener('change', function() { 
		saveOptions();
        show();
    }, false);
}, false);

function loadOptions() {
	chrome.storage.sync.get(['choise'], function(items) {
		var choise=items['choise'];
		if(choise == undefined) choise = true;
		var select = document.getElementById("choiser");
		select.checked = choise;
		if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
		else chrome.browserAction.setBadgeText({text: "off"});
    });
}

function saveOptions() {
	var select = document.getElementById("choiser");
	chrome.storage.sync.set({'choise': select.checked});
	if(select.checked) chrome.browserAction.setBadgeText({text: "on"});
	else chrome.browserAction.setBadgeText({text: "off"});
}

function show() {
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command: "show"});
	});
}