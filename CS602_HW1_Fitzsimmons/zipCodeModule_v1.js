const data = require('./zips.json');

module.exports.lookupByZipCode = (zip) => {
    let result = undefined;
		for (let d in data) {
            if (data[d]._id === zip) {
                result = data[d];
        }
    }
    return result;
};

module.exports.lookupByCityState = (city, state) => {
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
    return result;
};

module.exports.getPopulationByState = (state) => {
    let statePop = 0;
		for (const d in data) {
            if (data[d].state === state) {
                statePop += data[d].pop;
            }
        }
        if (statePop === 0) {
            return undefined;
        } else {
            return `{state: '${state}', pop: ${statePop}}`;
        }
    };