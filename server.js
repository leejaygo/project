var express = require('express');
var path = require('path');
//var proxy = require('express-http-proxy');
//const crypto = require('crypto');

var app = express();
// 设置静态资源路径
app.use(express.static(path.join(__dirname, 'build')));

app.get('/home',function (req, res){
	res.sendFile(path.join(__dirname, './build/index.html'));
});


var server = app.listen(3030, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("访问地址为 http://%s:%s", host, port)
 
});

