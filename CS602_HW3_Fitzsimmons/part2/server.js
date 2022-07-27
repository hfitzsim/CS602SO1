var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var path = require('path'); // needed to resolve "Error: failed to look up view ... in views directory ..."

var app = express();

// setup handlebars view engine
app.set('views', path.join(__dirname, 'views')); // needed to resolve "Error: failed to look up view ... in views directory ... "
app.engine('handlebars', 
    handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./hw3_routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});

