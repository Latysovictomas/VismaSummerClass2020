// Create a function wordSearch(w) that searches to see whether a word w is present in
// the given text variable. Please note it has to be a full word.

function wordSearch(w, text) {
    return RegExp('\\b' + w).test(text);
}

var text = "this is javascript.";
console.log(wordSearch("javascript", text));