// Write the definition of the function "say" in such way that calling this:
// say("Hello,")("it’s me"); //Would return "Hello, it’s me";

function say(text1) {
    return function(text2) {
        return text1 + " " + text2;
    };
}

console.log(say("Hello,")("it’s me"));