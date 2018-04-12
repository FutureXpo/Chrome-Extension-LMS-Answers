chrome.storage.sync.get(['show_answers','true_answers'], function(items) {
	var choise=items['show_answers'];
	if(choise == undefined) choise = true;
	if(choise) chrome.browserAction.setBadgeText({text: "on"});
	else chrome.browserAction.setBadgeText({text: "off"});
	
	choise=items['true_answers'];
	if(choise == undefined) choise = false;
	if(choise) chrome.browserAction.setBadgeText({text: "on"});
});
//Создать контекстное меню
chrome.contextMenus.create({"title": "Показать ответы","onclick" : show});
//Показать ответы
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