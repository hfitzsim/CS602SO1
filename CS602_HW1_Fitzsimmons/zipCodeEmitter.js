const EventEmitter = require('events').EventEmitter;
const data = require('./zips.json');

// Custom class 
class ZipCodeEmitter  extends EventEmitter {
	
	// member functions

	lookupByZipCode(zip)  {
	
	}

	lookupByCityState(city, state)  {
	
	}

	getPopulationByState(state) {
	
	}

}

module.exports.ZipCodeEmitter = ZipCodeEmitter;

