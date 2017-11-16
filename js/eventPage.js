"use strict"

// set the meta data of the Webdough button
var webdoughMenuItem = {
	"id": "webdough",
	"title": "WebDough",
	"contexts": ["selection"]
};

// add the button into the contextMenus
chrome.contextMenus.create(webdoughMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	if (clickData.menuItemId == "webdough" && clickData.selectionText){
		alert("test");
	}
});



