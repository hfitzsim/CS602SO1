const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage

app.get('/',  (req, res) => {
	res.render('homeView');
});

app.get('/zip', (req, res) => {
	

});

app.post('/zip', (req, res) => {
	

});

// Implement the JSON, XML, & HTML formats

app.get('/zip/:id', (req, res) => {
	

});



app.get('/city', (req, res) => {
	
	
});

app.post('/city', (req, res) => {
	

});

// Implement the JSON, XML, & HTML formats

app.get('/city/:city/state/:state', (req, res) => {
	


});



app.get('/pop', (req, res) => {
	
	
});

// Implement the JSON, XML, & HTML formats

app.get('/pop/:state', (req, res) => {
	

});


app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});




