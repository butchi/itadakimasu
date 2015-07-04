var $screenTop = $('.screen-top');
var $screenLoading = $('.screen-loading');
var $screenResult = $('.screen-result');

swfobject.embedSWF("swf/loading_movie.swf", "swfContent", "610", "377", "9.0.0");

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
  }, 1900);
  evt.preventDefault();
});
