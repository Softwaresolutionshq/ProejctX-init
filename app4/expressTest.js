

var express = require('express');
 var app = express();
 app.get('/', function(req, res) {
     res.sendFile('/home/ubuntu/workspace/abc.html');
 });
 app.listen(8081);