// Create two versions of a calculator module:
// a) Do not use any ES6 functionality
// b) Use a ES6 class
// Calculator should have four methods: add, subtract, multiply and divide. All of calculator
// methods should be chainable.
// Example:
// var calc = new Calculator(0);
// amount = calc.add(5).multiply(2).add(20).divide(3); //should return 10

// Solutions:
// a) Do not use any ES6 functionality
function Calculator(num) {
    this.number = num;
}

Calculator.prototype.add = function(num) {
    this.number = this.number + num;
    return this;
}

Calculator.prototype.subtract = function(num) {
    this.number = this.number - num;
    return this;
}
Calculator.prototype.multiply = function(num) {
    this.number = this.number * num;
    return this;
}
Calculator.prototype.divide = function(num) {
    this.number = this.number / num;
    return this;
}
Calculator.prototype.valueOf = function() {
    return this.number;
}

var calc = new Calculator(0);
var amount = calc.add(5).multiply(2).add(20).divide(3); //should return 10
console.log("" + amount)


// b) Use a ES6 class
class CalculatorES6 {
    constructor(number) {
        this.number = number;
    }

    add(num) {
        this.number = this.number + num;
        return this;
    }

    subtract(num) {
        this.number = this.number - num;
        return this;
    }

    multiply(num) {
        this.number = this.number * num;
        return this;
    }

    divide(num) {
        this.number = this.number / num;
        return this;
    }

    valueOf() {
        return this.number;
    }
}

var calcES6 = new CalculatorES6(0);
let amountES6 = calcES6.add(5).multiply(2).add(20).divide(3); //should return 10
console.log("" + amountES6)