const cities = require('./zipCodeModule_v1');

console.log("Look up by zip code (02215)");
console.log(cities.lookupByZipCode("02215"));
console.log("Look up by zip code (99999)");
console.log(cities.lookupByZipCode("99999"));

console.log("Look up by city (BOSTON, MA)");
console.log(cities.lookupByCityState("BOSTON", "MA"));
console.log("Look up by city (BOSTON, TX)");
console.log(cities.lookupByCityState("BOSTON", "TX"));
console.log("Look up by city (BOSTON, AK)");
console.log(cities.lookupByCityState("BOSTON", "AK"));

console.log("Get population by State (MA)");
console.log(cities.getPopulationByState("MA"));
console.log("Get population by State (TX)");
console.log(cities.getPopulationByState("TX"));
console.log("Get population by State (AA)");
console.log(cities.getPopulationByState("AA"));