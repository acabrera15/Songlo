// $(function() {
//     $("form").on("submit", function(e) {
//       e.preventDefault();
//       // prepare the request
//       var request = gapi.client.youtube.search.list({
//         part: "snippet",
//         type: "video",
//         // q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
//         q: $("#search").val(),
//         maxResults: 1,
//         order: "viewCount"
//       });
//       //execute this request
//       request.execute(function(response) {
//         var results = response.result;
//         $.each(results.items, function(index, item) {
//           console.log(item);
//           $("#videos-display-here").html(
//             "<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" +
//             item.id.videoId + "?enablejsapi=1&origin=http://example.com' frameborder='0'></iframe>"
//             );
//         });
//       });
//     });
//   });

//   function init() {
//     gapi.client.setApiKey("AIzaSyA7qkLvUXJLWyyZl97iOw5z7VNDjMzlh40");
//     gapi.client.load("youtube", "v3", function() {
//       // yt api is ready
//     });
//   }

// http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&apikey=04e49b29533147d52143a4ef842fa260

$(document).ready(function() {
  getTopTenSongs();
  getTopArtists();
});
// gets top ten songs from musixmatch api
let getTopTenSongs = function() {
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
      $("#popular-songs").empty();
      for (var i = 0; i < 10; i++) {
        const trackObj = data.message.body.track_list[i].track;
        const trackName = trackObj.track_name;
        const trackArtist = trackObj.artist_name;

        // console.log(trackName);
        // console.log(trackArtist);
        // console.log("=========================");

        $(
          `<a href="./profile.html" class="list-group-item list-group-item-action popular-list">${trackName}<div class='popular-song-artist'>by ${trackArtist}</div</a>`
        ).appendTo("#popular-songs");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
};
// get top ten artists from musixmatch API
let getTopArtists = function() {
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
    url: "https://api.musixmatch.com/ws/1.1/chart.artists.get",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json",
    success: function(data) {
      $("#popular-artists").empty();
      for (var i = 0; i < 10; i++) {
        const artistObj = data.message.body.artist_list[i].artist;
        const artist = artistObj.artist_name;
        // console.log(artist);
        // console.log("----------------");

        $(
          `<a href="./profile.html?artist=${artist}" id='topArtistLink' class="list-group-item list-group-item-action popular-list" target="_blank">${artist}</a>`
        ).appendTo("#popular-artists");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
};

// on click search of artist gets top ten songs by that artists on itunes api
$("#submit").on("click", function(e) {
  e.preventDefault();
  console.log("clicked");
  const searchTerm = $("#search-input")
    .val()
    .trim();
  axios({
    url: `https://itunes.apple.com/search?term=${searchTerm}&limit=30`,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      var topTen = [];
      for (var i = 0; i < 10; i++) {
        topTen[i] = {
          title: response.data.results[i].trackName.replace("''", ""),
          link: response.data.results[i].trackViewUrl,
          album: response.data.results[i].collectionName
        };
        $(
          `<a href="./profile.html" class="list-group-item text-dark list-group-item-action popular-list">${
            topTen[i].title
          }</a>`
        ).appendTo("#search-results");
      }
      console.log(response);
      console.log(topTen);
      $("#search-input").val("");
    })
    .catch(function(err) {
      console.error(err);
    });
});
