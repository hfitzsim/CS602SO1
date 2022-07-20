const express = require('express');
const app = express();
const js2xmlparser = require('js2xmlparser');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars',
	handlebars({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage
app.get('/', (req, res) => {
	res.render('homeView',
		{ message: "Welcome to module 2 assignment!" }
	);

});

function hasQueryParams(url) {
	return url.includes('?');
}

// http://localhost:3000/zip?id=02215

app.get('/zip', (req, res) => {
	let parsedUrl = require('url').parse(req.url, true);
	if (hasQueryParams(req.url)) {
		let result = cities.lookupByZipCode(parsedUrl.query.id);
		let obj = { zip: result._id, city: result.city, state: result.state, population: result.pop, cityStateURL: `/city/${result.city}/state/${result.state}` };
		res.render('lookupByZipView', obj);
	} else {
		res.render('lookupByZipForm');
	}
});

app.post('/zip', (req, res) => {
	let result = cities.lookupByZipCode(req.body.id);
	let obj = { zip: result._id, city: result.city, state: result.state, population: result.pop, cityStateURL: `/city/${result.city}/state/${result.state}` };
	res.render('lookupByZipView', obj);
});

app.get('/zip/:id', (req, res) => {
	let header = req.headers;
	header = JSON.parse(JSON.stringify(header));

	let params = req.params;
	let result = cities.lookupByZipCode(params.id);
	// if req application/json
	if (header.accept === 'application/json') {
		res.send(result)

	// if html req, render lookupByZipView
	} else if (header.accept.includes('text/html')) {
		let obj = { zip: result._id, city: result.city, state: result.state, population: result.pop, cityStateURL: `/city/${result.city}/state/${result.state}` };
		res.render('lookupByZipView', obj);
	}
	//  handle xml
	else if (header.accept === 'application/xml') {
		res.send(js2xmlparser.parse("zipCode", result));
	}
});

// http://localhost:3000/city?city=BOSTON&state=MA

app.get('/city', (req, res) => {
	let parsedUrl = require('url').parse(req.url, true);
	// if req query city param and state param present, render 'lookupByCityStateView'
	if (hasQueryParams(req.url)) {
		let result = cities.lookupByCityState(parsedUrl.query.city, parsedUrl.query.state);
		res.render('lookupByCityStateView', result)
	} else {
		res.render('lookupByCityStateForm');
	}
	
});

app.post('/city', (req, res) => {
	let result = cities.lookupByCityState(req.body.city, req.body.state);
	res.render('lookupByCityStateView', result)
});

app.get('/city/:city/state/:state', (req, res) => {
	let header = req.headers;
	header = JSON.parse(JSON.stringify(header));
	let params = req.params;
	let result = cities.lookupByCityState(params.city, params.state);
	// handle json req
	if (header.accept === 'application/json') {
		res.send(result);
	}
	// if html req, render 'lookupByCityStateView'
	else if (header.accept.includes('text/html')) {
		res.render('lookupByCityStateView', result);
	}
	// handle xml
	else if (header.accept === 'application/xml') {
		res.send(js2xmlparser.parse("city-state", result));
	}
});

// http://localhost:3000/pop?state=MA

app.get('/pop', (req, res) => {
	// if req state param present, lookup data, render 'populationView'
	let parsedUrl = require('url').parse(req.url, true);
	if (hasQueryParams(req.url)) {
		let result = cities.getPopulationByState(parsedUrl.query.state);
		result = JSON.parse(result);
		res.render('populationView', result);
	}
	// else res.render('populationForm');
	else {
		res.render('populationForm');
	}
});

app.get('/pop/:state', (req, res) => {
	let header = req.headers;
	header = JSON.parse(JSON.stringify(header));

	let result = cities.getPopulationByState(req.params.state);
	result = JSON.parse(result);
	if (header.accept === 'application/json') {
		res.send(result);

	// if html req, render 'populationView'
	} else if (header.accept.includes('text/html')) {
		res.render('populationView', result);
	}

	// handle xml
	else if (header.accept === 'application/xml') {
		res.send(js2xmlparser.parse("state-pop", result))
	}
});
	
app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
	console.log('http://localhost:3000');
});