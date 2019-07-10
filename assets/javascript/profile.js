$(document).ready(function() {
  console.log(getArtistToQuery());
});

function getArtistToQuery() {
  var artist = location.search.substring(1).split("&");
  var temp = artist[0].split("=");
  var currentArtist = temp[1];

  return currentArtist;
}

var currentArtist = getArtistToQuery();
$('.artName').text(currentArtist);

axios({
    url: `https://itunes.apple.com/search?term=${currentArtist}&limit=30`,
    method: "GET"
  })
    .then(function(response) {
      console.log(response.data.results[0].artistViewUrl);  
      var tempStore = response.data.results[0].artistViewUrl;
      $('.iLink').attr('href',tempStore);
      $('.iLink').attr('target','_blank');

    })   
    .catch(function(err) {
      console.error(err);
    });
