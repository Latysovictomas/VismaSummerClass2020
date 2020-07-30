// Create a simple function wrapper that will log every call to the wrapped function.
// Example​:
// var spied = spy(myFunction);
// spied(1);
// var report = spied.report(); // returns { totalCalls: 1 }

function myFunction(a, b) {
    return parseInt(a) + parseInt(b);
}

function spy(someFunction) {
    var totalCalls = 0;
    var wrappedFunction = function() {
        console.log(someFunction.name + " is being called!");
        totalCalls = totalCalls + 1;
        wrappedFunction.report = function() {
            return totalCalls;
        };
        return someFunction(...arguments);
    }
    return wrappedFunction;
}

var spied = spy(myFunction);
var spied2 = spy(myFunction);
spied(4, 5);
spied(6, 7);
spied2(7, 6);
console.log("totalCalls: " + spied.report());
console.log("totalCalls2: " + spied2.report());