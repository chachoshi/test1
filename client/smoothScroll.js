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

