var $screenTop = $('.screen-top');
var $screenLoading = $('.screen-loading');
var $screenResult = $('.screen-result');

swfobject.embedSWF("swf/loading_movie.swf", "swfContent", "960", "540", "9.0.0");

$('.form-search').on('submit', function(evt) {
  if($('.input-text').val() === '') {
    evt.preventDefault();
    // return;
  }

  $screenTop.removeClass('active');
  $screenLoading.addClass('active');

  setTimeout(function() {
    $screenLoading.removeClass('active');
    $screenResult.addClass('active');
    $screenResult.css({
      opacity: 0
    });
    $screenResult.animate({
      opacity: 1
    }, {
      duration: 1000
    });
  }, 5900);
  evt.preventDefault();
});
