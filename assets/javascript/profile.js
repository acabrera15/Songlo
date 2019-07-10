$(document).ready(function() {
});

function getArtistToQuery() {
  var artist = location.search.substring(1).split("&");
  var temp = artist[0].split("=");
  var currentArtist = temp[1];

  return currentArtist;
}

var currentArtist = getArtistToQuery();
$(".artName").text(currentArtist);

axios({
  url: `https://itunes.apple.com/search?term=${currentArtist}&limit=30`,
  method: "GET"
})
  .then(function(response) {
    console.log(response.data.results[0].artistViewUrl);
    var tempStore = response.data.results[0].artistViewUrl;
    $(".iLink").attr("href", tempStore);
    $(".iLink").attr("target", "_blank");
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
      console.log(response[2][0]);
      bandInfo = response[2][0];
    })
    .catch(function(err) {
      console.log(err);
    });
  return bandInfo;
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
