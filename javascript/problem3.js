// Create two versions of a function called range which takes two numbers x and y and
// returns an array filled with all numbers from x (inclusive) to y (exclusive)
// a) Do not use any ES6 methods
// b) Use a suitable ES6 method

function range(x, y) {
    var rangeArray = [];
    while (x < y) {
        rangeArray.push(x);
        x++;
    }
    return rangeArray;
}

function rangeES6(x, y) {
    return Array(y - x).fill(x).map((val, index) => val + index);
}

console.log(range(4, 10));
console.log(rangeES6(4, 10));