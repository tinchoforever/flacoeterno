var mb = require('musicbrainz');

mb.searchArtists('Spinetta', {}, function(err, artists){
    console.log(artists);
});