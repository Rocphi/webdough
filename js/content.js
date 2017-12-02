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

// click to get the main element in the web-page
document.onmousedown = function(e) {
	var e = e ? e : window.event;
	var tar = e.srcElement || e.target;
	// var tarClass = tar.className;
	// var tarId = tar.id;
	var fontSize = $(tar).css("font-size");
	// fontSize = parseFloat(fontSize).toFixed(0) + "px";
	// console.log(tarClass);
	console.log(fontSize);
	console.log($(tar).css("font-family"));
	chrome.storage.sync.set({"mainSize": fontSize});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	// change the Background color
	// if (request.todo == "changeColor") {
	// 	var addColor = "#" + request.clickedColor;
	// 	console.log(addColor);
	// 	$("body").css("background-color", addColor);
	// }
	
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

		// for (var [key,value] of changeFontSize) {
		//     if (key == value){
		//         changeFontSize.delete(key);
		//     }
		// }

		// for (var [key,value] of changeFontSize) {
		//     if (parseFloat(value) > 32){
		//         console.log("bbbbbbbb");
		//     }
		// }

		console.log("hello");

		$("*").each(function(){
			var curSize = $(this).css('font-size');
			// curSize = parseFloat(curSize).toFixed(0) + "px";

			if(changeFontSize.has(curSize)) {
				var targetSize = changeFontSize.get(curSize);
				// if(curSize == "26px"){
				    // $(this).css('font-size', "19px");
					// console.log(targetSize);
				$(this).css("font-size", targetSize);
				// console.log(targetSize);
				// console.log($(this).css("font-size"));
				// console.log($(this).css("font-size"));
				    // $(this).css('font-size', targetSize);
	  			// } 
			    // $(this).css('font-size', changeFontSize.get(curSize));
  			} 
  			// else {
  			// 	// console.log(curSize);
  			// 	console.log("Some Font-sizes are not captured!");
  			// }
  			// if(curSize == "14px"){
			  //   $(this).css('font-size', "26px");
  			// }
  			// console.log($(this).css("font-size"));
  			// console.log("\n\n");
		});

		// $("*").each(function(){
		// 	var curSize = $(this).css('font-size');
		// 	curSize = parseFloat(curSize).toFixed(0) + "px";
		// 	console.log(curSize);
		// });
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
		// console.log(request.safeTypes);
		// var fontType = "'" + request.safeTypes[0] + "', 'sans-serif'";
		

		$("*").each(function(){
			var fontType = "'" + request.safeTypes[0] + "', 'sans-serif'";
			var curType = $(this).css("font-family");
			var preferedType = curType.split(",")[0];
			if (request.safeTypes.indexOf(preferedType) < 0) {
				$(this).css("font-family", fontType);
			}
		});

		// $("*").css("font-family", fontType);

		// console.log($("*").css("font-family"));
	}

 	// chrome.runtime.sendMessage({}, function(response) { console.log("farewell"); });

});


