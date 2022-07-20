// Solution copied for HW1B

let data = require('./zips.json');

module.exports.lookupByZipCode =  (zip) => {
        let result = data.find(city => city._id === zip);
        return result;
};

module.exports.lookupByCityState = (city, state) => {
    let result = { "city": city, "state": state };
    const filtered = data.filter(d => (d.state === state && d.city === city));

    const formatted = filtered.map(d =>
        obj = { "zip": d._id, "pop": d.pop });

    result["data"] = [];
    result.data = formatted;
    return result;
};

module.exports.getPopulationByState = (state) => {
    let initialValue = 0;

    let statePop = data
    .filter(d => (d.state === state))
    .reduce((sum, next) => sum + next.pop, initialValue);

    return `{state: '${state}', pop: ${statePop}}`;
};