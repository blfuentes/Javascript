var request = require('request');
var fs = require('fs');
// grab a page
request("http://www.bing.com", function(error, response, body){
    if(!error && response.statusCode == 200){
        console.log(body);
    }
});

// download file
var file = fs.createWriteStream('blfuentes.jpg');
request('https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/198/387/247bf7a.jpg').pipe(file);
file.on('finish', function(){
    console.log('Okay, finish!');
});