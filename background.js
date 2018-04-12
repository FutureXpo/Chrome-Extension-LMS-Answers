chrome.storage.sync.get(['choise','simple'], function(items) {
	var choise=items['choise'];
	if(choise == undefined) choise = true;
	if(choise) chrome.browserAction.setBadgeText({text: "on"});
	else chrome.browserAction.setBadgeText({text: "off"});
});

chrome.contextMenus.create({"title": "Показать ответы","onclick" : show});

function show(info) {
	var url = info.pageUrl;
	var url_ = "www.cambridgelms.org";
	if(JSON.stringify(url).includes(url_))
	{
		var query = { active: true, currentWindow: true };
		chrome.tabs.query(query, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "show"});
		});
	}
}