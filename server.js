var express = require("express");
var app = express();
app.use(express.static(__dirname+"/dist"));
var getReqListener = (request,response) => {
response.send(200,'OK');
}
app.get("/",getReqListener);
var serverListener = (request,response) => {console.log('server listening');}
var server = app.listen(4300,serverListener);
