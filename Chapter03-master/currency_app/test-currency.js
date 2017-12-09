var currency = require('./lib/currency');
var Currency = require('./lib/currencyObject');

// initialize currency object
var canadianDollar = 0.85;
var currencyObject = new Currency(canadianDollar);

console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.canadianToUS(50));
console.log(currencyObject.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));
console.log(currencyObject.USToCanadian(30));

