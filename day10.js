"use strict";
exports.__esModule = true;
var day10Data_1 = require("./day10Data");
var day10TestString = "16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4";
var numbersArr = day10Data_1.textInput.split("\n").map(function (item) {
    return parseInt(item);
});
var sortedNums = numbersArr.sort(function (a, b) {
    return a - b;
});
var currentJolt = 0;
var adapterCount = 0;
var oneJoltDiff = 0;
var threeJoltDiff = 0;
while (adapterCount < sortedNums.length) {
    var compatibleAdapters = sortedNums.filter(function (a) { return a <= currentJolt + 3 && a > currentJolt; });
    var nextAdapter = compatibleAdapters[0];
    if (nextAdapter - currentJolt === 1)
        oneJoltDiff += 1;
    if (nextAdapter - currentJolt === 3)
        threeJoltDiff += 1;
    currentJolt = nextAdapter;
    adapterCount += 1;
}
console.log(oneJoltDiff);
console.log(threeJoltDiff);
console.log(oneJoltDiff * (threeJoltDiff + 1));
