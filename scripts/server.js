'strict mode';
var express = require('express');
var app = express();

app.use(express.static('src'));

var server = app.listen(3000, function () {
});