$(document).ready(function() {
  console.log(getArtistToQuery());
});

function getArtistToQuery() {
  var artist = location.search.substring(1).split("&");
  var temp = artist[0].split("=");
  var currentArtist = temp[1];

  return currentArtist;
}
