const data = require('./zips.json');

module.exports.lookupByZipCode = (zip) => {
    // Array find method only
    let result = data.find(city => city._id === zip);
    return result;
};

module.exports.lookupByCityState = (city, state) => {
    let result = { "city": city, "state": state };

    // Array filter method followed by map method only
    const filtered = data.filter(d => (d.state === state && d.city === city));

    const formatted = filtered.map(d =>
        obj = { "zip": d._id, "pop": d.pop });

    result["data"] = [];
    result.data = formatted;
    return result;
};

module.exports.getPopulationByState = (state) => {
    // Array reduce method only
    // with one conditional

    let initialValue = 0;

    let statePop = data
    .filter(d => (d.state === state))
    .reduce((sum, next) => sum + next.pop, initialValue);

    return `{state: '${state}', pop: ${statePop}}`;

};

