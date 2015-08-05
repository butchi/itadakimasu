window.materialLi = {
  beef: ["牛"],
  pork: ["豚","ブタ"],
  chicken: ["鶏","とり"],
  shirasu: ["しらす"],
  fish: ["鯏","鰺","鯇","鮎","鮑","鰒","鮟鱇","鮖","鯆","鰮","鰯","鯎","鱓","鰻","鱏","鱝","鱛","鮱","鰧","鰍","鰹","鱟","鮍","魳","鰈","鱚","鯨","鯉","鯒","鮲","鮗","鰶","鯯","鱅","鮴","鮏","鮭","鯖","鮫","鱵","鰆","鯢","鯱","鱸","鯐","鯛","鮹","魛","鱮","鱈","鯲","鰌","魹","鯰","魸","鯡","鰊","鮸","鯊","鰰","鱩","魬","鱧","鮠","鰙","鰉","鯷","鮃","鱶","鰒","鮒","鰤","鯔","鰡","鮪","鱒","鮲","鯧","鯥","鮴","鰙","鰐","あさり","あじ","あめのうお","あゆ","あわび","あんこう","いしもち","いるか","いわし","うぐい","うつぼ","うなぎ","えい","えそ","おおぼら","おこぜ","かじか","かつお","かぶとがに","かわはぎ","かます","かれい","きす","くじら","こい","こち","このしろ","ごり","さけ","さば","さめ","さより","さわら","さんしょううお","しゃち","すずき","すばしり","たい","たこ","たちうお","たなご","たら","どじょう","とど","なまず","にしん","にべ","はぜ","はたはた","はまち","はも","はや","ひがい","ひしこ","ひらめ","ふか","ふぐ","ふな","ぶり","ぼら","まぐろ","ます","まて","まながつお","むつ","めばる","わかさぎ","わに","アサリ","アジ","アメノウオ","アユ","アワビ","アンコウ","イシモチ","イルカ","イワシ","ウグイ","ウツボ","ウナギ","エイ","エソ","オオボラ","オコゼ","カジカ","カツオ","カブトガニ","カワハギ","カマス","カレイ","キス","クジラ","コイ","コチ","コノシロ","ゴリ","サケ","サバ","サメ","サヨリ","サワラ","サンショウウオ","シャチ","スズキ","スバシリ","タイ","タコ","タチウオ","タナゴ","タラ","ドジョウ","トド","ナマズ","ニシン","ニベ","ハゼ","ハタハタ","ハマチ","ハモ","ハヤ","ヒガイ","ヒシコ","ヒラメ","フカ","フグ","フナ","ブリ","ボラ","マグロ","マス","マテ","マナガツオ","ムツ","メバル","ワカサギ","ワニ","いわし","イワシ","鰯","さば","サバ","鯖","あじ","アジ","鯵","鰺","ぶり","ブリ","鰤","さんま","サンマ","秋刀魚","たい","タイ","鯛","まぐろ","マグロ","鮪","たら","タラ","鱈","さけ","サケ","鮭","しゃけ","シャケ","サーモン","スモークサーモン","鮭フレーク","カジキマグロ","めかじき","うなぎ","ウナギ","鰻","きす","キス","鱚","さわら","サワラ","鰆","干物","切り身","切身","一夜干し","西京漬","西京漬け"]
};


function getMeat(item) {
  var cid = window.assoc[item];
  // console.log(item, cid);

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
    var re;
    re = new RegExp(materialLi.shirasu.join('|'));
    if(tempMaterial.match(re)) {
      result = 'しらす';
      break;
    }
    re = new RegExp(materialLi.beef.join('|'));
    if(tempMaterial.match(re)) {
      result = '牛';
      break;
    }
    re = new RegExp(materialLi.pork.join('|'));
    if(tempMaterial.match(re)) {
      result = '豚';
      break;
    }
    re = new RegExp(materialLi.chicken.join('|'));
    if(tempMaterial.match(re)) {
      result = '鶏';
      break;
    }
    re = new RegExp(materialLi.fish.join('|'));
    if(tempMaterial.match(re)) {
      result = '魚';
      break;
    }
  }

  // console.log(result);
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
  } else if(result === '魚') {
    $img.attr('src', 'img/image_fish.jpg');
    shareTxt = '私は魚を0.5匹いただきました。';
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
  ga('send', 'event', 'button', 'click', 'retry');
});

$('.form-search').on('submit', function(evt) {
  var input = $('.input-text').val();
  if(input === '') {
    evt.preventDefault();
    return;
  }

  ga('send', 'event', 'button', 'search', input);
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
