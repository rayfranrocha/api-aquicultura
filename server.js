var http = require('http');
var app = require('./config/express');

var database = process.env.DEV ? 'mongodb://localhost:27017/aquicultura' : 'mongodb://icon:iconmain123@ds119442.mlab.com:19442/aquicultura';
require('./config/database')(database);

var port = process.env.PORT || 5000;

http.createServer(app)
.listen(port, function() {
	console.log('Servidor iniciado na Porta:'+ port);
});