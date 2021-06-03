"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var day6Data_1 = require("./day6Data");
var testData = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb";
var input = day6Data_1.textInput;
var splitted = input.split("\n");
var formattedArr = splitted.join(' ').split('  ');
//replace repeating characters, then replace blank spaces globally
var part1Array = formattedArr.map(function (str) {
    return str.replace(/(.)(?=.*\1)/g, "").replace(/\s/g, '');
});
//change array to length of strings then sum them together
var part2Array = formattedArr.map(function (item) {
    return item.split(' ');
});
var getFinalCount = function (array) {
    return array.map(function (item) { return item.length; }).reduce(function (sum, currItem) {
        return sum + currItem;
    });
};
//find common characters among different arrays
var commonChars = function (arr) {
    var output = [];
    var firstChars = __spreadArray([], arr[0]);
    var _loop_1 = function (char) {
        if (arr.every(function (entry) { return entry.includes(char); })) {
            output.push(char);
            arr = arr.map(function (entry) { return entry.replace(char, ''); });
        }
    };
    for (var _i = 0, firstChars_1 = firstChars; _i < firstChars_1.length; _i++) {
        var char = firstChars_1[_i];
        _loop_1(char);
    }
    return output;
};
var part2_FinalArray = part2Array.map(function (stringArr) {
    return commonChars(stringArr);
});
console.log("Part 1 Result ==>", getFinalCount(part1Array));
console.log("Part 2 Result ==>", getFinalCount(part2_FinalArray));
