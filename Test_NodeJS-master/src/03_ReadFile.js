var fs = require('fs');
fs.readFile('../data/resource.json', function(er, data){
	console.log(data.toString());
});