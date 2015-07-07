function getMeat(item) {
  var materialArr = [
    '牛',
    '豚',
    '鶏',
    'しらす'
  ];

  var cid = window.assoc[item];

  if(!cid) {
    return;
  }

  $.ajax({
    type: 'GET',
    url: 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20121121',
    data: {
      format: 'json',
      categoryId: cid,
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
  var $twitterElm;
  var shareTxt;
  var tweetHtml;

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
    if(tempMaterial.indexOf('しらす') != -1) {
      result = 'しらす';
      break;
    }
  }

  var $img = $(".screen-result .image img");
  if(false) {
  } else if(result === '牛') {
    $img.attr('src', 'img/image_cow.png');
    shareTxt = '私は牛を0.04匹いただきました。';
  } else if(result === '豚') {
    $img.attr('src', 'img/image_pig.png');
    shareTxt = '私は豚を0.03匹いただきました。';
  } else if(result === '鶏') {
    $img.attr('src', 'img/image_bird.jpg');
    shareTxt = '私は鶏を0.3匹いただきました。';
  } else if(result === 'しらす') {
    $img.attr('src', 'img/image_shirasu.jpg');
    shareTxt = '私はしらすを2724匹いただきました。';
  } else {
    $img.attr('src', 'img/image_none.jpg');
    shareTxt = '私はたくさんの命をいただいてます。';
  }


  $twitterElm = $('.screen-result .share-twitter');
  tweetHtml = '<a href="https://twitter.com/share" class="twitter-share-button" data-text="私はたくさんの命をいただいてます。" data-hashtags="いただきます。,zenhack">Tweet</a>';

  setTweet();

  function setTweet() {
    $('.share-text').text(shareTxt + 'http://butchi.github.io/itadakimasu/ #いただきます。 #zenhack');;
    $twitterElm.html(tweetHtml);
    $twitterElm.find('.twitter-share-button').attr('data-text', shareTxt);
    twttr.widgets.load();
  }

}

var $screenTop = $('.screen-top');
var $screenLoading = $('.screen-loading');
var $screenResult = $('.screen-result');

swfobject.embedSWF("swf/loading_movie.swf", "swfContent", "960", "540", "9.0.0");

$('.btn-retry').on('click', function() {
  location.reload();
});

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
