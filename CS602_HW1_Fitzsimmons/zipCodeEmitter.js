const EventEmitter = require('events').EventEmitter;
const data = require('./zips.json');

// Custom class 
class ZipCodeEmitter extends EventEmitter {

	constructor() {
		super();
	}

	// member functions

	lookupByZipCode(zip) {

		// find() from part 2
		let result = data.find(city => city._id === zip);
		this.emit('lookupByZipCode', result)
	}

	lookupByCityState(city, state) {

		// for and if from part 1
		let result = {"city" : city, "state" : state};
		let cities = [];
		for (let d of data) {
			if (d.city === city && d.state === state) {
				let obj = {"zip": d._id, "pop": d.pop}
				cities.push(obj);
			} 
		}
		result["data"] = [];
		result.data = cities;
		this.emit('lookupByCityState', result)
	}

	getPopulationByState(state) {
		let initialValue = 0;

		// reduce() from part 2
		let statePop = data
			.filter(d => (d.state === state))
			.reduce((sum, next) => sum + next.pop, initialValue);

		let result = `{state: '${state}', pop: ${statePop}}`;
		this.emit('getPopulationByState', result)
	}

}

module.exports.ZipCodeEmitter = ZipCodeEmitter;

