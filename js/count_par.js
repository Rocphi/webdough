// Function of calculating parameters

// Test the item is in array or not, if not push it to the array

'use strict';

// import {rgb2hex, hex} from "./utility.js";

function isInArray(arr,value){
    if (arr.length == 0){
      return false;
    }
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

// function rgb2hex(rgb) {
//   rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)\)$/);
//   return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
// }

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)*/);
  return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  var hexDigits = new Array
  ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}


/* text/words */
var font_size = [];
var font_color = [];
var font_type = [];
var font_spacing = [];

$("*").each(function(){
  var size = $(this).css('font-size');
  // size = parseFloat(size).toFixed(0) + "px";
  if(! isInArray(font_size,size)){
    font_size.push(size);
  }

  var color = $(this).css('color');
  color = rgb2hex(color);
  if(! isInArray(font_color,color)){
    font_color.push(color);
  }

  var type = $(this).css('font-family');
  // console.log(typeof(type));
  if(! isInArray(font_type,type)){
    font_type.push(type);
  }

  var spacing = $(this).css('line-height');
  if (! isNaN(parseFloat(spacing))){
    var space = parseFloat(spacing) / parseFloat(size);
    if(! isInArray(font_spacing,space)){
      font_spacing.push(space);
    }
  }

});



var results = [];
// alert(font_size);
results.push(font_size);
results.push(font_type);
results.push(font_color);
results.push(font_spacing);
results.push(rgb2hex($("body").css("background-color")));
results.push($("body").css("background-image"));


// var bgcolor = rgb2hex($("body").css("background-color"));
// console.log(bgcolor);
// if (bgcolor == "ffffff"){
//   $("body").css("background-color", "none");
//   // $("body").css("background-image", "url(https://img1.doubanio.com/img/musician/large/22817.jpg)").css("background-repeat", "no-repeat").css("background-position", "right").css("background-attachment", "fixed");
// }



results;



