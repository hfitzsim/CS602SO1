const MongoClient = require('mongodb').MongoClient;
const { ResumeToken } = require('mongodb');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;

const getConnection = async () => {
	if (client == null)
		client = await MongoClient.connect(dbUrl,  { useNewUrlParser: true ,  useUnifiedTopology: true });
	return client;
}

module.exports.lookupByZipCode =  async (zip) => {
		
	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	let result = await collection.find({'_id': zip}).toArray();
	
	if (result.length > 0)
		return result[0];
	else
		return undefined;
};

// Complete the code for the following

module.exports.lookupByCityState = async (city, state) => {

	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	// re done from HW2 part 2 zipCodeModule_v2.js

	let result = { "city": city, "state": state };

	let zipPop = await collection.find({'city': city, 'state': state}).toArray();
	
	result.data = [];
	result.data = zipPop.map(data => 
		obj = obj = { "zip": data._id, "pop": data.pop }
	);
	return result;
};

module.exports.getPopulationByState = 
	async (state) => {

		let client = await getConnection();
		let collection = client.db(credentials.database).collection('zipcodes');
		
		// re done code from HW2 part 2 zipCodeModule_v2.js

		let statePop = await collection.aggregate ( [
			{
				$match: {'state': state}
			},
			{
				$group: {_id: null, 'population': {$sum: '$pop'}}
			}
		]).toArray();

		let result = { 'state': state, 'population': statePop[0].population };
		return result;
	};
