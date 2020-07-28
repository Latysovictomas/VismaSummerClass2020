// Given an array with nested arrays of numbers (ex.: [10, 6, [4, 8], 3, [6, 5, [9]]]) create a
// function that would sum all numbers from provided array.

var nestedArray = [10, 6, [4, 8], 3, [6, 5, [9]]];

function flattenArray(nestedArray) {
    return nestedArray.flat(Infinity).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

console.log(flattenArray(nestedArray))