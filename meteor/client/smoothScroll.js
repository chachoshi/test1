$(document).ready(function() {

  // guide
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash,
    $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top,
      'scrollLeft': $target.offset().left
    },
    500, 'swing', function() {
      window.location.hash = target;
    });
  });
});


///// ShortCut

var shortcutMonthly = function() {
  $('#btn_monthly').trigger('click');
}
var shortcutSummary = function() {
  $('#btn_summary').trigger('click');
}
var shortcutBreakdown = function() {
  $('#btn_breakdown').trigger('click');
}
var shortcutReceipt = function() {
  $('#btn_receipt').trigger('click');
}

$(document).on('keydown', null, 'ctrl+m', shortcutMonthly);
$(document).on('keydown', null, 'ctrl+q', shortcutMonthly);
$(document).on('keydown', null, 'ctrl+s', shortcutSummary);
$(document).on('keydown', null, 'ctrl+w', shortcutSummary);
$(document).on('keydown', null, 'ctrl+b', shortcutBreakdown);
$(document).on('keydown', null, 'ctrl+e', shortcutBreakdown);
$(document).on('keydown', null, 'ctrl+r', shortcutReceipt);


