$(document).ready(function () {
});

// gets info from url parameters passed in from app.js functions 
// these will be used to query more APIs (split into arrays and grab params as elements of array)
function getArtistToQuery() {
  var params = location.search.substring(1).split("&");
  var song = params[0].split("=");
  var artist = params[1].split("=");

  return [song[1], artist[1]];
}
// replaces %20 with spaces for appearance sake
var currentArtist = getArtistToQuery()[1];
var currentSong = getArtistToQuery()[0];

// if (currentArtist.includes('feat.')) {
//   currentArtist = currentArtist.split("feat.")[0];

// }
console.log('currentArtist: ' + currentArtist.trim())
axios({
  url: `https://itunes.apple.com/search?term=${currentArtist}&limit=10`,
  method: "GET",
})
  .then(function (response) {
    console.log(response.data.results[0].artistViewUrl);
    var tempStore = response.data.results[0].artistViewUrl;
    $(".iLink").attr("href", tempStore);
    $(".iLink").attr("target", "_blank");
    $(".bandImg").attr("src", response.data.results[0].artworkUrl100);

    console.log(response);
  })
  .catch(function (err) {
    console.error(err);
  });

// ajax command to get band info from wiki
const getBandInformationFromWiki = function (band) {
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
    .then(function (response) {
      console.log(response);
      var artistInfoIndex = 0;
      var bandTemp = band.replace(/%20/g, ' ')
      console.log(bandTemp);
      // filters object response if too generic looking for band response from wiki
      if (response[2][0] === `${bandTemp} may refer to:`) {
        for (var i = 0; i < response[1].length; i++) {
          if (response[1][i].includes("(band)") || response[1][i].includes("(musician)") || response[1][i].includes("(artist)")) {
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
    .catch(function (err) {
      console.log(err);
    });
};

const getMusicInfo = function () {
  $.ajax({
    url:
      "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&apikey=04e49b29533147d52143a4ef842fa260",
    method: "GET",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json"
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

//youtube API here
function getMusicVideo () {
  console.log("begin youtube function")
  gapi.client.setApiKey("AIzaSyA7qkLvUXJLWyyZl97iOw5z7VNDjMzlh40");
  gapi.client.load("youtube", "v3", function () {
    // prepare the request
    var request = gapi.client.youtube.search.list({

      part: "snippet",
      type: "video",
      q: encodeURIComponent($(currentArtist).val()).replace(/%20/g, "+"),
      q: $(currentArtist),
      maxResults: 1,
      order: "viewCount"
    });
    //execute this request
    request.execute(function (response) {
      var results = response.result;
      console.log("in the youtube function")
      $.each(results.items, function (index, item) {
        console.log(item);
        $("#videos-display-here").html(
          "<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" +
          item.id.videoId + "?enablejsapi=1&origin=http://example.com' frameborder='0'></iframe>"
        );
      });
    });
  });
};
getMusicVideo();
// function init() {
//   gapi.client.setApiKey("AIzaSyA7qkLvUXJLWyyZl97iOw5z7VNDjMzlh40");
//   gapi.client.load("youtube", "v3", function() {
//     // yt api is ready
//   });
// }

// https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=Enter%20Sandman&q_artist=metallica&apikey=04e49b29533147d52143a4ef842fa260
function getLyrics(band, song) {
  $.ajax({
    type: "GET",
    data: {
      apikey: "04e49b29533147d52143a4ef842fa260",
      q_track: song,
      q_artist: band,
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json",
    success: function (data) {
      console.log(data.message.body.lyrics.lyrics_body);
      $("#musixTrack").attr('src', data.message.body.lyrics.script_tracking_url)
      $('<p>').text(data.message.body.lyrics.lyrics_body).appendTo('.wikiInfo');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}

// if clicked on artist gets artist page else gets lyrics for song page and displays song by band

if (currentSong === '_') {
  $(".artName").text(currentArtist.replace(/%20/g, ' '));
  getBandInformationFromWiki(currentArtist)
} else {
  var cArt = currentArtist.replace(/%20/g, ' ');
  var cSong = currentSong.replace(/%20/g, ' ');
  $(".artName").text(`${cSong} by ${cArt}`);
  getLyrics(currentArtist, currentSong);
}

$("#submit-song-search2").on('click', function (e) {
  e.preventDefault();
  // location.replace(`./profile.html?song=_&artist=${$('#textInput').val()}`)
});

$("#submit-artist-search").on('click', function (e) {
  e.preventDefault();
  location.replace(`./profile.html?song=_&artist=${$('#textInput').val()}`)
});