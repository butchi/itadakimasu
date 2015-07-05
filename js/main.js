function getMeat(item) {
  var materialArr = [
    '牛',
    '豚',
    '鶏'
  ];

  $.ajax({
    type: 'GET',
    url: 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20121121',
    data: {
      format: 'json',
      categoryId: window.assoc[item],
      applicationId: '1073052739207338361'
    },
    dataType: 'jsonp',
    jsonpCallback: 'hoge',
    success: function(json){
      getMeatHandler(json);
    }
  });
}

function getMeatHandler(json) {
  var result;
  var len = json.result.length;
  var i;
  for(i = 0; i < len; i++) {
    var tempMaterial = json.result[i].recipeMaterial.join('');
    if(tempMaterial.indexOf('牛') != -1) {
      result = '牛';
      break;
    }
    if(tempMaterial.indexOf('豚') != -1) {
      result = '豚';
      break;
    }
    if(tempMaterial.indexOf('鶏') != -1) {
      result = '鶏';
      break;
    }
  }

  var $img = $(".screen-result .image img");
  if(false) {
  } else if(result === '牛') {
    $img.attr('src', 'img/image_cow.png');
  } else if(result === '豚') {
    $img.attr('src', 'img/image_pig.png');
  } else if(result === '鶏') {
    $img.attr('src', 'img/image_bird.png');
  } else {
    $img.attr('src', 'img/image_none.png');
  }
}

var $screenTop = $('.screen-top');
var $screenLoading = $('.screen-loading');
var $screenResult = $('.screen-result');

swfobject.embedSWF("swf/loading_movie.swf", "swfContent", "960", "540", "9.0.0");

$('.form-search').on('submit', function(evt) {
  var input = $('.input-text').val();
  if(input === '') {
    evt.preventDefault();
    return;
  }

  evt.preventDefault();
  getMeat(input);

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
