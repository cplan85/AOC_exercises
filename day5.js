"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var day5Data_1 = require("./day5Data");
var testData = "\nBFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL";
var input = day5Data_1.textInput;
var splitted = input.split("\n");
var processPass = function (str) {
    var rowMin = 0, rowMax = 127, colMin = 0, colMax = 7;
    for (var i = 0; i <= 6; i++) {
        str[i] === "F"
            ? (rowMax = Math.floor(rowMax - (rowMax - rowMin) / 2))
            : (rowMin = Math.ceil(rowMin + (rowMax - rowMin) / 2));
    }
    for (var i = 7; i <= 9; i++) {
        str[i] === "L"
            ? (colMax = Math.floor(colMax - (colMax - colMin) / 2))
            : (colMin = Math.ceil(colMin + (colMax - colMin) / 2));
    }
    return rowMin * 8 + colMin;
};
var idValues = splitted.map(function (string) {
    return processPass(string);
});
console.log(Math.max.apply(Math, idValues));
var sortSeats = __spreadArray([], idValues).sort(function (a, b) { return a - b; });
var candidates = sortSeats.filter(function (item, index) {
    return sortSeats[index + 1] - item === 2;
});
console.log(candidates[0] + 1);
