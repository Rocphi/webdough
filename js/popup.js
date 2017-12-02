// This script is executed when the popup.html is loaded;
// 1. Get the current tab;
// 2. Do statistics of font_size,font_color,font_family,line_spacing

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

// map to Json
function mapToJson(map) {
    return JSON.stringify(strMapToObj(map));
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

// change the fontsize to optimal values
function optimizedShuffle(map, mainSize, optimizer){
  console.log(mainSize);
  console.log(optimizer);

  // pick the diff value
  var diff = parseFloat(optimizer) - parseFloat(mainSize);
  
  // for every fontsize, change it according to the diff value
  for (var [key,value] of map) {
    value = parseFloat(value) + parseFloat(diff);

    // limit the Max Font size
    // if (value > 32) {value = 32;}
    
    // keep accuracy
    // value = value.toFixed(0) + "px";
    value = value + "px";
    map.set(key, value);
  }
  return map;
}





$(function(){

  var mainSize = "";
  var changeFontSize = new Map();
  // var safeTypes = ["Trebuchet MS", "Arial", "Calibri", "Candara", "Helvetica", "Optima"];
  var safeTypes = ["Comic Sans MS"];
  var safeSizes = ["18px", "17px", "19px", "20px"];
  // var safeSizes = ["16px", "19px", "22px", "24px","26px"];
  // var safeSizes = ["26px"];


  // var current_tab_id;
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

    // alert(tabs[0].id);
    chrome.tabs.executeScript(tabs[0].id, {file: "js/count_par.js"}, function(font_results){
      //font_results[0] includes font_size,font_color,font_family,line_spacing and background-color in order.
      //font_size

      safeTypes = shuffle(safeTypes);

      console.log(font_results[0][0]);


      var font_size_rows = "";

      for(i=0;i<font_results[0][0].length;i++){

        font_size_rows = font_size_rows + '<tr class="font_size_row"> \
          <td>\
            <input type="text" value="'+font_results[0][0][i]+'" disabled="true"/>\
          </td>\
          <td>\
            <input type="text" class="mySize" id="' + font_results[0][0][i] + '"value="'+font_results[0][0][i]+'"/>\
          </td>\
        </tr>';

        changeFontSize.set(font_results[0][0][i], font_results[0][0][i]);
      }
      font_size_rows = font_size_rows + "<tr></tr>";
      $("#font_size_row_first").children("td:first-child").attr("rowspan",String(font_results[0][0].length+1));
      $("#font_size_row_first").after(font_size_rows);

      //font_family(font_type)
      var font_family_rows="";
      for(i=0;i<font_results[0][1].length;i++){
        font_family_rows = font_family_rows + '<tr class="font_family_row"> \
          <td>\
            <input type="text" value=\''+font_results[0][1][i]+'\'disabled="true"/>\
          </td>\
          <td>\
            <input type="text" value=\''+font_results[0][1][i]+'\'/>\
          </td>\
        </tr>';
      }
      // console.log(font_family_rows);
      font_family_rows = font_family_rows + "<tr></tr>";
      $("#font_family_row_first").children("td:first-child").attr("rowspan",String(font_results[0][1].length+1));
      $("#font_family_row_first").after(font_family_rows);

      //font_color
      var font_color_rows="";
      for(i=0;i<font_results[0][2].length;i++){
        font_color_rows = font_color_rows + '<tr class="font_color_row"> \
          <td>\
            <input type="text" value=\''+font_results[0][2][i]+'\'disabled="true"/>\
          </td>\
          <td>\
            <input type="text" value=\''+font_results[0][2][i]+'\'/>\
          </td>\
        </tr> ';
      }
      font_color_rows = font_color_rows + "<tr></tr>";

      $("#font_color_row_first").children("td:first-child").attr("rowspan",String(font_results[0][2].length+1));
      $("#font_color_row_first").after(font_color_rows);

      //line_spacing
      var line_spacing_rows = "";
      for(i=0;i<font_results[0][3].length;i++){
        var line_spacing_rows = line_spacing_rows + '<tr class="line_spacing_row"> \
          <td>\
            <input type="text" value=\''+font_results[0][3][i]+'\'disabled="true"/>\
          </td>\
          <td>\
            <input type="text" value=\''+font_results[0][3][i]+'\'/>\
          </td>\
        </tr>';
        // console.log(font_results[0][3][i]);
      }

      $("#line_spacing_row_first").children("td:first-child").attr("rowspan",String(font_results[0][3].length+1));
      $("#line_spacing_row_first").after(line_spacing_rows);
      // console.log(font_results[0]);
      // console.log(font_results[0].length);

      //background-color
      $("#bgcolor_before").val(font_results[0][4]);
      if ($("#bgcolor_before").val() == "ffffff"){
        $("#bgcolor_after").val("transparent");
      } else {
        $("#bgcolor_after").val(font_results[0][4]);
      }

      //background-image
      $("#bgimg_before").val(font_results[0][5]);
      $("#bgimg_after").val(font_results[0][5]);

      var color = $('#bgcolor_after').val();
      $("#bgcolor_after").on("change paste keyup", function(){
        color = $(this).val();
      });

      // get the to be changed font-size
      $(".mySize").change(function(){
        if (changeFontSize.has($(this).attr("id"))) {
          changeFontSize.set($(this).attr("id"), $(this).val());
        }
      });


      chrome.storage.sync.get("mainSize", function(webdough){
        if (webdough.mainSize) {
          // console.log(webdough.mainSize);
          $(".mySize").each(function(){
            if ($(this).val() == webdough.mainSize) {
              $(this).css('background-color', "#E2FFB0");

              $("#refresh").click(function(){
                
                safeSizes = shuffle(safeSizes);
                console.log(mapToJson(changeFontSize));
                changeFontSize = optimizedShuffle(changeFontSize, webdough.mainSize, safeSizes[0]);
                console.log(mapToJson(changeFontSize));

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                  chrome.tabs.sendMessage(tabs[0].id, {todo: "FontSizeChange", newSize: mapToJson(changeFontSize)});
                });
              });

            }
          });
        }
      });



      $("#refresh").click(function(){
        safeTypes = shuffle(safeTypes);
        // console.log(safeTypes);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

          chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color});
          chrome.tabs.sendMessage(tabs[0].id, {todo: "changeFontType", safeTypes: safeTypes});
          // chrome.tabs.sendMessage(tabs[0].id, {todo: "changeFontSpacing", safeTypes: safeTypes});
        });

      });

    });
  });

  var imgFilters = $('#imgFilter').val();

  $("#imgFilter").on("change", function(){
    imgFilters = $(this).val();
  });

  $("#refresh").click(function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {todo: "filterImg", clickedImgFilters: imgFilters});
    });

    // sleep to wait for the modification of the website, then capture the screenShot
    sleep(1500).then(() => {
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
          chrome.downloads.download({url: screenshotUrl});
        });
    });

  });

  
});




