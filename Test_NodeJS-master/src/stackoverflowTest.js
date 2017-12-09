var fs = require('fs');
var content = fs.readFileSync('../data/file.txt', 'utf8').toString();
console.log(content);