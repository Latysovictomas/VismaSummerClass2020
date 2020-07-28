// Write a function which takes a number x and returns a function, which takes another
// number y and returns the sum of numbers x and y.

function add(x) {
    return function(y) {
        return x + y;
    };
}
console.log(add(15)(15));