// This script is executed when the popup.html is loaded;
// 1. Get the current tab;
// 2. Do statistics of font_size,font_color,font_family,line_spacing

// 'use strict';

$(function(){

  // var current_tab_id;
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // alert(tabs[0].id);
    chrome.tabs.executeScript(tabs[0].id, {file: "js/count_par.js"},function(font_results){
      //font_results[0] includes font_size,font_color,font_family,line_spacing and background-color in order.
      //font_size
      var font_size_rows = "";
      for(i=1;i<font_results[0][0].length;i++){

        font_size_rows = font_size_rows + '<tr class="font_size_row"> \
          <td>\
            <input type="text" value="'+font_results[0][0][i]+'" disabled="true"/>\
          </td>\
          <td>\
            <input type="text" value="'+font_results[0][0][i]+'"/>\
          </td>\
        </tr>';
      }
      font_size_rows = font_size_rows + "<tr></tr>";
      $("#font_size_row_first").children("td:first-child").attr("rowspan",String(font_results[0][0].length));
      $("#font_size_row_first").after(font_size_rows);

      //font_family(font_type)
      var font_family_rows="";
      for(i=1;i<font_results[0][1].length;i++){
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
      $("#font_family_row_first").children("td:first-child").attr("rowspan",String(font_results[0][1].length));
      $("#font_family_row_first").after(font_family_rows);

      //font_color
      var font_color_rows="";
      for(i=1;i<font_results[0][2].length;i++){
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

      $("#font_color_row_first").children("td:first-child").attr("rowspan",String(font_results[0][2].length));
      $("#font_color_row_first").after(font_color_rows);

      //line_spacing
      var line_spacing_rows = "";
      for(i=1;i<font_results[0][3].length;i++){
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

      $("#line_spacing_row_first").children("td:first-child").attr("rowspan",String(font_results[0][3].length));
      $("#line_spacing_row_first").after(line_spacing_rows);
      console.log(font_results[0]);
      // console.log(font_results[0].length);

      //background-color
      $("#bgcolor_before").val(font_results[0][4]);
      $("#bgcolor_after").val(font_results[0][4]);

      //background-image
      $("#bgimg_before").val(font_results[0][5]);
      $("#bgimg_after").val(font_results[0][5]);

    });
  });

  var color = $('#bgcolor_after').val();

  $("#bgcolor_after").on("change paste keyup", function(){
    color = $(this).val();
    log("haha");
  });

  $("#refresh").click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color});
    });
  });


});




