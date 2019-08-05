
import $ from 'jquery'
$("a[data-toggle=tab]").on("click", function(e) {
    if ($(this).hasClass("disabled")) {
      e.preventDefault();
      return false;
    }
  });


