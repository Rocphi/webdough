$("body").css("background-color", "#68FFE1");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if ( request.todo == "changeColor"){
		var addColor = "#" + request.clickedColor;
		$("body").css("background-color", addColor);
	}
});