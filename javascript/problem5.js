// Given a list of the following major Houses of Westeros and their respective mottos
// Write two versions of a function that, when passed the name of a House, returns its
// motto.
// a) Do not use any ES6 methods
// b) Use a suitable ES6 method
// Example​:
// motto("Tyrell") // returns "Growing strong"

const houses = [
    { name: "Targaryen", motto: "Fire and Blood" },
    { name: "Stark", motto: "Winter is Coming" },
    { name: "Bolton", motto: "Our Blades Are Sharp" },
    { name: "Greyjoy", motto: "We Do Not Sow" },
    { name: "Tully", motto: "Family, Duty, Honor" },
    { name: "Arryn", motto: "As High as Honor" },
    { name: "Lannister", motto: "Hear Me Roar!" },
    { name: "Tyrell", motto: "Growing Strong" },
    { name: "Baratheon", motto: "Ours is the Fury" },
    { name: "Martell", motto: "Unbowed, Unbent, Unbroken" }
];

function motto(nameKey, houses) {
    var i;
    for (i = 0; i < houses.length; i++) {
        if (houses[i].name === nameKey) {
            return houses[i].motto;
        }
    }
}

function mottoES6(nameKey, houses) {
    var obj = houses.find(obj => obj.name === nameKey, undefined);
    if (obj !== undefined) {
        return obj.motto;
    } else {
        return obj;
    }
}

console.log(motto("Tyrell", houses))
console.log(mottoES6("Tyrell", houses))