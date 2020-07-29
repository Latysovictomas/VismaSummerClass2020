// Create a simple function wrapper that will log every call to the wrapped function.
// Example​:
// var spied = spy(myFunction);
// spied(1);
// var report = spied.report(); // returns { totalCalls: 1 }

function myFunction(a) {
    var b = 6;
    return parseInt(a) + parseInt(b);
}

var totalCount = 0;

function spy(someFunction) {
    var wrappedFunction = function() {
        var args = [...arguments].splice(0);
        console.log(someFunction.name + " is being called!");
        console.log(`You're about to run a function with these arguments: \n     ${args}`);
        totalCount = totalCount + 1;
        return someFunction(args);
    }
    return wrappedFunction;
}

var spied = spy(myFunction);
console.log("Function result: " + spied(5));
console.log("totalCalls: " + totalCount);