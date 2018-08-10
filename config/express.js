var express = require('express');
var cors = require('cors');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var fileUpload = require('express-fileupload');
var errorHandle = require('./errorHandle');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(errorHandle.logErrors);

consign({cwd: 'app'})
	.include('models')
	.then('utils')
	.then('api')
	.then('routes')
	.into(app);

module.exports = app;