// Create a function which takes an array and returns an array with all duplicates removed.

function removeDuplicates(list) {
    return Array.from(new Set(list));
}

list = [1, 1, 1.2, 3, 4, 2, 2];
console.log(removeDuplicates(list));