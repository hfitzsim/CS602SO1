const ZipCodeEmitter = require('./zipCodeEmitter').ZipCodeEmitter;
const colors = require('colors');

const cities = new ZipCodeEmitter();

// listeners
cities.on('lookupByZipCode', (arg) => {
    console.log(colors.magenta("Event lookupByZipCode raised!\n", 
    arg));
})

cities.on('lookupByCityState', (arg) => {
    console.log(colors.green("Event lookupByCityState raised! (Handler1)", 
    arg));
})

cities.on('lookupByCityState', (args) => {
    console.log(colors.blue("Event lookupByCityState raised! (Handler2)\n", 
    `City: ${args.city}, State: ${args.state}`));
    for (d of args.data) {
        console.log(colors.blue(d.zip, 'has a population of', d.pop))
    }
    })

cities.on('getPopulationByState', (arg) => {
    console.log(colors.cyan("Event getPopulationByState raised!\n", arg));
})

// call events
console.log(colors.red('Lookup by zip code (02215)'));
cities.lookupByZipCode('02215');
console.log(colors.red('Lookup by city (BOSTON, MA'));
cities.lookupByCityState('BOSTON', 'MA');
console.log(colors.red('Get Population by State (MA)'));
cities.getPopulationByState('MA');