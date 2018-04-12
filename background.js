chrome.storage.sync.get(['choise'], function(items) {
	var choise=items['choise'];
	if(choise == undefined) choise = true;
	if(choise) chrome.browserAction.setBadgeText({text: "on"});
	else chrome.browserAction.setBadgeText({text: "off"});
});