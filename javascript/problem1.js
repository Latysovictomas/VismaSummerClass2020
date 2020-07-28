// Write a loop that makes seven calls to console.log to output the following triangle:
// ##
// #
// ###
// ####
// #####
// ######
// #######
// Print Every line in random color every time (choose from colors red, green, yellow, blue).
// There should not be two lines of the same color next to each other.

var colors = require('colors/safe');
var myColors = [colors.green, colors.yellow, colors.red, colors.blue]

function getRandom(min, max) {
    return Math.floor((Math.random() * max) + min);;
}

var hashtag = "#";
var prevNumber = -1;
var i;
for (i = 0; i < 7; i++) {
    let same = false;
    let randColorNumber = getRandom(0, 4);
    while (randColorNumber == prevNumber) {
        randColorNumber = getRandom(0, 4);
    }
    prevNumber = randColorNumber;
    if (i == 0) {
        console.log(myColors[randColorNumber](hashtag));
    } else {
        hashtag = hashtag.concat("#");
        console.log(myColors[randColorNumber](hashtag));
    }
};