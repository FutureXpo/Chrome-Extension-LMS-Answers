chrome.browserAction.setBadgeText({text: "on"});
//При нажатии иконки расширения вызывается данная функция
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "show"});
    });
});
