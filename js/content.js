chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	if (request.todo == "changeColor") {
		var addColor = "#" + request.clickedColor;
		$("body").css("background-color", addColor);
	}
	
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
});

