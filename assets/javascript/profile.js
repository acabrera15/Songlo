$(document).ready(function() {
});

function getArtistToQuery() {
  var params = location.search.substring(1).split("&");
  var song = params[0].split("=");
  var artist = params[1].split("=");

  return [song[1],artist[1]];
}

var currentArtist = getArtistToQuery()[1];
$(".artName").text(currentArtist.replace(/%20/g,' '));

axios({
  url: `https://itunes.apple.com/search?term=${currentArtist}&limit=30`,
  method: "GET"
})
  .then(function(response) {
    console.log(response.data.results[0].artistViewUrl);
    var tempStore = response.data.results[0].artistViewUrl;
    $(".iLink").attr("href", tempStore);
    $(".iLink").attr("target", "_blank");
    $(".bandImg").attr("src", response.data.results[0].artworkUrl100);
    
    console.log(response)
  })
  .catch(function(err) {
    console.error(err);
  });

  
const getBandInformationFromWiki = function(band) {
    console.log('test')
  let URL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${band}&format=json&callback=?`;
  let bandInfo = "";

  $.ajax({
    url: URL,
    method: "GET",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json"
  })
    .then(function(response) {
      console.log(response);
      var artistInfoIndex = 0;

      if (response[2][0] === `${band} may refer to:`) {
        for (var i = 0; i < response[1].length; i++) {
            if (response[1][i].includes("(band)")) {
                artistInfoIndex = i;
                break;
            }
        }
        bandInfo = response[2][artistInfoIndex];
        console.log(response[2][artistInfoIndex])
        $('<p>').text(bandInfo).appendTo('.wikiInfo');
      } else {
        bandInfo = response[2][0];
        console.log(bandInfo)
        $('<p>').text(bandInfo).appendTo('.wikiInfo');
      }

    })
    .catch(function(err) {
      console.log(err);
    });
};

console.log(getBandInformationFromWiki(currentArtist));

const getMusicInfo = function() {
  $.ajax({
    url:
      "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&apikey=04e49b29533147d52143a4ef842fa260",
    method: "GET",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json"
  })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    });
};

function getLyrics() {
  $.ajax({
    type: "GET",
    data: {
      apikey: "04e49b29533147d52143a4ef842fa260",
      chart_name: "top",
      page: "1",
      page_size: "10",
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/chart.tracks.get",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json",
    success: function(data) {
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}
