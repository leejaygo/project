var express = require('express');
var bodyParser = require('body-parser');

var app= express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8091);
console.log('listening 8091');

var data = require('./mock/data.json');
app.get('/api/*', function (req,res){
	res.send(data);
});