// Write a function sevenAte9 that removes each 9 that is in between 7s.
// sevenAte9('79712312') // returns '7712312'
// sevenAte9('79797') // returns '777

function sevenAte9(text) {
    var pattern = "79+7";
    var re = new RegExp(pattern, 'g');
    while (re.test(text) === true) {
        text = text.replace(re, '77');
    }
    return text;
}

console.log(sevenAte9('79712312'))
console.log(sevenAte9('79799997'))