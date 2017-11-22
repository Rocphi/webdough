function objToStrMap(obj){
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k,obj[k]);
  }
  return strMap;
}

// Json to Map
function jsonToMap(jsonStr){
    return  objToStrMap(JSON.parse(jsonStr));
}

document.onmousedown = function(e) {
	var e = e ? e : window.event;
	var tar = e.srcElement || e.target;
	// var tarClass = tar.className;
	// var tarId = tar.id;
	var fontSize = $(tar).css("font-size");
	// console.log(tarClass);
	console.log(fontSize);
	chrome.storage.sync.set({"mainSize": fontSize});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	// change the Background color
	if (request.todo == "changeColor") {
		var addColor = "#" + request.clickedColor;
		console.log(addColor);
		$("body").css("background-color", addColor);
	}
	
	// change the image filter
	if ( request.todo == "filterImg"){

		if (request.clickedImgFilters == "saturate"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("saturate");
		} else if (request.clickedImgFilters == "blur"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("blur");
		}  else if (request.clickedImgFilters == "grayscale"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("grayscale");
		} else if (request.clickedImgFilters == "hue-rotate"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("hue-rotate");
		} else if (request.clickedImgFilters == "invert"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("invert");
		} else if (request.clickedImgFilters == "opacity"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("opacity");
		} else if (request.clickedImgFilters == "drop-shadow"){
			$("img").removeClass("grayscale saturate hue-rotate invert blur opacity drop-shadow");
			$("img").addClass("drop-shadow");
		}
	}

	// change the font size
	if (request.todo == "FontSizeChange") {
		var changeFontSize = new Map();
		changeFontSize = jsonToMap(request.newSize);
		console.log(changeFontSize);

		for (var [key,value] of changeFontSize) {
		    if (key == value){
		        changeFontSize.delete(key);
		    }
		}

		console.log(changeFontSize);
		$("*").each(function(){
			var curSize = $(this).css('font-size');
			if(changeFontSize.has(curSize)){
			    $(this).css('font-size', changeFontSize.get(curSize));
			    // console.log("hello world");
  			}
		});
	}

	// change the font type
	// if (request.todo == "changeFontType") {
	// 	console.log(request.safeTypes);
	// 	$("*").each(function(){
	// 		// console.log(typeof($(this).css("font-family")));
	// 		// console.log($(this).css("font-family"));
	// 		// console.log("haha");
	// 		// judge whether $(this).css("font-family") includes the type in request.safeTypes
	// 		var currentFont = $(this).css("font-family").split(",");
	// 		// console.log(currentFont);
	// 		if ( (! request.safeTypes.filter(v => currentFont.includes(v))) && request.safeTypes.length > 0 ) {
	// 			$(this).css("font-family", request.safeTypes.pop());
	// 			console.log("haha");
	// 			console.log("haha", $(this).css("font-family"));
	// 		}
	// 	});
	// }

	if (request.todo == "changeFontType") {
		$("*").css("font-family", request.safeTypes);
	}

	// 	// $(this).css("font-family", request.safeTypes.pop());
	// 	console.log(request.safeTypes);
	// }


});

