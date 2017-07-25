var express = require('express');
var url = require("url");
var moment = require("moment");
var app = express();

app.set('port', (process.env.PORT || 5000));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', { time: null });
});

app.get('/:timestamp', function(request, response) {
  var params = request.params;
  var timeObject = moment.unix(params.timestamp).isValid() ? moment.unix(params.timestamp) : moment(params.timestamp);
  if(timeObject.isValid()) {
    var time = {
      unixtime: timeObject.format("x"),
      natural: timeObject.format("MMMM D,[ ]YYYY")
    };
    response.render('pages/index', { time: JSON.stringify(time) });
  }
  response.render('pages/index', { time: "Not a valid time"});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
