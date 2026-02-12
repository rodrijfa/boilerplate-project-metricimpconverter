function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    let num = input.match(/^[\d.\/]+/); 
    if (!num) return 1;
    
    num = num[0];

    if((num.match(/\//g) || []).length > 1) {
      return undefined;
    }
  
  if(num.includes('/')) {
    let [numerator, denominator] = num.split('/');
    result = parseFloat(numerator) / parseFloat(denominator);
  } else {
    result = parseFloat(num);
  }
  if (isNaN(result)) return undefined;

  return result;
};
  
  
  this.getUnit = function(input) {
    let result;

    let unit = input.match(/[a-zA-Z]+$/);
    if (!unit) return undefined;

    unit = unit[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) {
      return undefined;
    }
     
    if(unit === 'l') {
      return 'L';
    }
    
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    
    return map[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    
    return map[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
