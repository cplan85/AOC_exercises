"use strict";
exports.__esModule = true;
var day2Data_1 = require("./day2Data");
var list = ["1-3 a: abcde",
    "1-3 b: cdefg",
    "2-9 c: ccccccccc",];
var pattern = /(\d+)-(\d+) (\w): (\S+)/;
console.log("reg check", list.map(function (pw) {
    pw.match(pattern);
}));
var correctPasswordCount = function (input) {
    var splitted = input.split("\n");
    var arr = [];
    var count = 0;
    splitted.forEach(function (item) {
        arr.push(item.split(":"));
    });
    arr.forEach(function (item) {
        var passwordCriteria = item[0];
        var password = item[1];
        var characterMatch = passwordCriteria[passwordCriteria.length - 1];
        //remove last 2 empty characters and divide array by - for low and high ranges
        var numbersRange = passwordCriteria
            .substring(0, passwordCriteria.length - 2)
            .split("-");
        var regexp = new RegExp(characterMatch, "gi");
        var matches = 0;
        password.match(regexp) ? (matches = password.match(regexp).length) : null;
        matches >= parseFloat(numbersRange[0]) &&
            matches <= parseFloat(numbersRange[1])
            ? count++
            : (count = count);
    });
    return count;
};
correctPasswordCount(day2Data_1.textInput);
var modifiedPasswordCount = function (input) {
    var splitted = input.split("\n");
    var arr = [];
    var count = 0;
    //create an array of arrays with 2 items - 1st is the criteria; 2nd is the actual password
    splitted.forEach(function (item) {
        arr.push(item.split(":"));
    });
    arr.forEach(function (item) {
        var passwordCriteria = item[0];
        var password = item[1];
        var characterMatch = passwordCriteria[passwordCriteria.length - 1];
        //remove last 2 empty characters and divide array by - for low and high ranges
        var numbersRange = passwordCriteria
            .substring(0, passwordCriteria.length - 2)
            .split("-");
        var matches = 0;
        password[numbersRange[0]] == characterMatch ? matches++ : null;
        password[numbersRange[1]] == characterMatch ? matches++ : null;
        matches == 1 ? count++ : (count = count);
    });
    return count;
};
modifiedPasswordCount(day2Data_1.textInput);
