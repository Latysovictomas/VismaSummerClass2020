// Write a program that uses console.log to print all the numbers from 1 to 100, with two
// exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for
// numbers divisible by 5 (and not 3), print "Buzz". For numbers that are divisible by both 3
// and 5 print "FizzBuzz"

var count = 1;
while (count <= 100) {
    let result = '';
    if (count % 3 == 0) {
        result = result + "Fizz";
    }
    if (count % 5 == 0) {
        result = result + "Buzz";
    }
    console.log(result || count);
    count++;
}