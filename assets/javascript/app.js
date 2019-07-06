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

// http://api.musixmatch.com/ws/1.1/track.search?q_artist=justinbieber&page_size=3&page=1&s_track_rating=desc&apikey=04e49b29533147d52143a4ef842fa260

$(document).ready(function() {
  getTopTenSongs("dsa");
});

let getTopTenSongs = function(band) {
  const APIKey = "04e49b29533147d52143a4ef842fa260";
  let URL = "https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin%20bieber&page_size=3&page=1&s_track_rating=desc&apikey=04e49b29533147d52143a4ef842fa260";
  console.log(URL)

  $.ajax({
    url: URL,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
};
