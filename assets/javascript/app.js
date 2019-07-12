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
          `<a href="./profile.html?song=${trackName}&artist=${trackArtist}" class="list-group-item list-group-item-action popular-list">${trackName}<div class='popular-song-artist'>by ${trackArtist}</div</a>`
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
          `<a href="./profile.html?song=_&artist=${artist}" id='topArtistLink' class="list-group-item list-group-item-action popular-list">${artist}</a>`
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
$("#submit-artist-search").on("click", function(e) {
  e.preventDefault();
  $('#search-results').empty();
  console.log("clicked");
  const searchTerm = $("#search-input")
    .val()
    .trim();
  axios({
    url: `https://itunes.apple.com/search?term=${searchTerm}&limit=10`,
    method: "GET"
  })
    .then(function(response) {
      var artist= response.data.results[0].artistName
     $(`<a href="./profile.html?song=_&artist=${artist}" style="text-decoration: underline;" class="list-group-item text-dark list-group-item-action popular-list">Artist:  ${
       artist
     }</a>`).appendTo('#search-results');
      console.log(response);
      var topTen = [];
      for (var i = 0; i < 10; i++) {
        topTen[i] = {
          title: response.data.results[i].trackName.replace("''", ""),
          link: response.data.results[i].trackViewUrl,
          album: response.data.results[i].collectionName,
          artworkUrl60 : response.data.results[i].artworkUrl60,
          artistName: response.data.results[i].artistName
        };
        // $(
        //   `<a href="./profile.html?song=${topTen[i].title}&artist=${topTen[i].artistName}" class="list-group-item text-dark list-group-item-action popular-list">${
        //     topTen[i].title
        //   }</a>`
        $(
          `<div class="row individual-search-result"><div class="col-md-1"><a href="./profile.html?song=${topTen[i].title}&artist=${topTen[i].artistName}">
          <img src="${topTen[i].artworkUrl60}" class="album-thumbnail"></a></div>
          <div class="col-md-10 text-dark"><a href="./profile.html?song=${topTen[i].title}&artist=${topTen[i].artistName}">${topTen[i].title}</a>
          <div>album : ${topTen[i].album}</div></div></div>`
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
// search itunes by song 
$("#submit-song-search").on("click", function(e) {
  $('#search-results').empty();
  e.preventDefault();
  console.log("clicked");
  const searchTerm = $("#search-input")
    .val()
    .trim();
  axios({
    url: `https://itunes.apple.com/search?term=${searchTerm}&entity=musicTrack&attribute=songTerm&limit=30`,
    method: "GET"
  })
    .then(function(response) {
      var topSongs = $('<p>').text('Songs with that title:')
      $('#search-results').prepend(topSongs);
      console.log(response);
      var topTen = [];
      for (var i = 0; i < 10; i++) {
        topTen[i] = {
          title: response.data.results[i].trackName.replace("''", ""),
          artist: response.data.results[i].artistName,
          album: response.data.results[i].collectionName,
          artworkUrl60 : response.data.results[i].artworkUrl60
        };
        $(
          `<div class="row individual-search-result"><div class="col-md-1"><a href="./profile.html?song=${topTen[i].title}&artist=${topTen[i].artist}">
          <img src="${topTen[i].artworkUrl60}" class="album-thumbnail"></a></div>
          <div class="col-md-10 text-dark"><a href="./profile.html?song=${topTen[i].title}&artist=${topTen[i].artist}">${topTen[i].title}</a>
          <div>by: ${topTen[i].artist}</div><div>album : ${topTen[i].album}</div></div></div>`
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
