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

$(document).on('keydown', null, 'ctrl+s', function() {
  console.log('shortcut ctrl+s');
  $('#btn_summary').trigger('click');
});

$(document).on('keydown', null, 'ctrl+b', function() {
  console.log('shortcut ctrl+b');
  $('#btn_breakdown').trigger('click');
});

$(document).on('keydown', null, 'ctrl+r', function() {
  console.log('shortcut ctrl+r');
  $('#btn_receipt').trigger('click');
});

