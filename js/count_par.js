// Function of calculating parameters

// Test the item is in array or not, if not push it to the array

function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

// function hex(x) {
//   var hexDigits = new Array；
//   ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
//   return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
// }
//
// function rgb2hex(rgb) {
//   rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//   return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
// }



/* text/words */
var font_size = [];
var font_color = [];
var font_type = [];
var line_spacing = [];

$("*").each(function(index){
  var size = $(this).css('font-size');
  if(! isInArray(font_size,size)){
    font_size.push(size);
  }


  var color = $(this).css('color');
  if(! isInArray(font_color,color)){
    font_color.push(color);
  }

  var type = $(this).css('font-family');
  if(! isInArray(font_type,type)){
    font_type.push(type);
  }

  var spacing = $(this).css('line-height');
  if(! isInArray(line_spacing,spacing)){
    line_spacing.push(spacing);
  }


  // font_size = testIsInArray(font_size,size);
  // alert(size+color+type+spacing);
});

var results = [];
results.push(font_size);
results.push(font_type);
results.push(font_color);
results.push(line_spacing);

results
