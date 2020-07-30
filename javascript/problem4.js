// Create two versions of a function called sum which takes a list of numbers and returns a
// sum of them.
// a) Do not use any ES6 methods
// b) Use a suitable ES6 method

function sum(list) {
    var sum = 0;
    for (i = 0; i < list.length; i++) {
        sum = sum + list[i];
    }
    return sum;
}

function sumES6(list) {
    return list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

var list = [3, 5, 9, 6.2, 0];
console.log(sum(list));
console.log(sumES6(list));