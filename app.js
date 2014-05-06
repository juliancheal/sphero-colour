var Cylon = require('cylon');
var colour = 0xFF0066;

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-BOO-RN-SPP' },
  device: {name: 'sphero', driver: 'sphero'},
  
	work: function(my) {
		io.sockets.on('connection', function (socket) {
		  socket.on('color', function (data) {
				colour = parseInt(data,10);
		    console.log(colour);
				
				my.sphero.setColor(colour);
				// console.log(my.sphero.getRGB());
		  });
		});
  }
}).start();


// for debugging when no sphero present
io.sockets.on('connection', function (socket) {
  socket.on('color', function (data) {
		colour = parseInt(data,10);
    console.log(colour);
	});	
});