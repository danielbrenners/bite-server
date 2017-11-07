var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

rid_ip_dict = {	
				'ABC': 123,
				'DEF': 456,
				'GHI': 789,
			};

/*
app.get('/ajax', function(request, response) {
  response.type('json');
  response.end(JSON.stringify());
});
*/

app.post('/ajax', function(request, response) {

  var roomID = request.body.roomID;
  var ip = null;

  if (roomID in rid_ip_dict) {
  	ip = rid_ip_dict[roomID];
  } 
  
  response.type('json');
  response.end(JSON.stringify(ip));
});




var server = app.listen(8080);

console.log("Listening on 8080");