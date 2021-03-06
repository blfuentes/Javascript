var express = require('express'), 
	config = require('./server/configure'),
	app = express(),
	mongoose = require('mongoose');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

// promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connection.on('open', function(){
	console.log('Mongoose connected.');
});

//app.get('/', function(req, res){
//	res.send('Hello World');
//});

app.listen(app.get('port'), function(){
	console.log('Server up: http://localhost:' + app.get('port'));
});