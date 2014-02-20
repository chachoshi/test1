$(document).ready(function() {

  $.fn.extend({
    center: function() {
      return this.each(function() {
        var top = ($(window).height() - $(this).outerHeight()) / 2;
        var left = ($(window).width() - $(this).outerWidth()) / 2;
        $(this).css({
          position: 'absolute',
          margin: 0,
          top: (top > 0 ? top: 0) + 'px',
          left: (left > 0 ? left: 0) + 'px'
        });
      });
    }
  });

  $('#login-buttons').bind('click', function() {
    console.log('login-buttons click');
    console.log($('#login-dropdown-list'));
    $('#login-dropdown-list').css({position: 'absolute',left:'-180px'});
  });
  $('#login-dropdown-list').bind('focus', function() {
    console.log('hello');
  });

});

