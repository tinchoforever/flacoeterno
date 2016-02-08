var scrapy = require('node-scrapy');
var async = require('async');
var fs     = require('fs');

var url     = 'https://www.letras.com/luis-alberto-spinetta/'

var model   =
    {
        links: 
        { selector: 'ul.cnt-list li a',
                get: 'href',
                prefix: 'https://www.letras.com' 
              } 

      };

var todasLetras = [];

var mainScrape = function(){
  scrapy.scrape(url, model, function(err, data) {
      if (err) return console.error(err);
      



      async.forEachOf(data.links, function (value, key, callback) {
        lyricsScrape(value,callback);           
      }, function (err) {
          if (err) console.error(err.message);
          // configs is now a map of JSON data
          var result = JSON.stringify(todasLetras);
          fs.writeFile("letras.com-flaco.json", result, function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
      })


      
      

  });
}

var lyricsScrape  = function(currentUrl,cb){
  var currentModel = {
    titulo : 'title',
    letras : 'div.cnt-letra p'
  }
  
  scrapy.scrape(currentUrl, currentModel, function(err, data) {
      if (err) {
         cb(err);
         return ;
      }
      todasLetras.push(data);
      cb();
      return;
  }); 
    
};

mainScrape();