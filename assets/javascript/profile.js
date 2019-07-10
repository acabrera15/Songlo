$(document).ready(function() {
  geArtistToQuery();
  alert("test");
});

function geArtistToQuery() {
  var artist = location.search.substring(1).split("&");
  console.log(artist);
  var temp = artist[0].split("=");
  var currentArtist = temp[1];
  console.log(currentArtist);
}
