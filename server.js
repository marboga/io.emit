var express = require('express');
var path  = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index');
})

var newCount = 0;
var server = app.listen(8000, function(){
	console.log('we are up and running on port 8000');
})
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	console.log('socket engaged, id = '+socket.id);
	socket.on('button_click', function(){
		console.log('button click received by server.');
		newCount += 1;
		console.log(newCount)
		io.emit('update_count', {count: newCount})
	})
	socket.on('reset', function(){
		console.log('reset request received by server.');
		newCount = 0;
		console.log(newCount)
		io.emit('update_count', {count: newCount})
	})
})
