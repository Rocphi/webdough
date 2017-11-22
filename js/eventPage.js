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
		alert("test1");
		// var e = clickData.selectionText ? clickData.selectionText : window.event;
		// var tar = e.srcElement || e.target;
		// // var tarClass = tar.className;
		// // var tarId = tar.id;
		// alert("test2");
		// var fontSize = $(tar).css("font-size");
		// // console.log(tarClass);
		// // console.log(fontSize);
		// alert(fontSize);
		// // chrome.storage.sync.set({"mainSize": });
	}
});



