const net = require('net');
const colors = require('colors');
const cities = require('./zipCodeModule_v2');

const server = net.createServer((socket) => {

	console.log("Client connection...".red);

	socket.on('end', () => {
		console.log("Client disconnected...".red);
	});

	// HW Code - Write the following code to process data from client
	
	socket.on('data', (data) => {

		let input = data.toString();
		console.log(colors.blue('...Received %s'), input);

		// get search term
		let array = input.split(","); 
		let json = JSON.stringify(array); 
		json = JSON.parse(json);
		
		// call the correct functions and send results to the client
		let result;

		if (json[0].toLowerCase() === 'lookupbyzipcode') {
		 	result = JSON.stringify(cities.lookupByZipCode(json[1]));

		} else if (json[0].toLowerCase() === 'lookupbycitystate') {
			result = JSON.stringify(cities.lookupByCityState(json[1].toUpperCase(), json[2].toUpperCase()));

		} else if (json[0].toLowerCase() === 'getpopulationbystate') {
			result = JSON.stringify(cities.getPopulationByState(json[1]));

		} else {
			result = "invalid request";

		}
		
		socket.write(result);

	});

});

// listen for client connections
server.listen(3000, () => {
	console.log("Listening for connections on port 3000");
});
