"use strict";
exports.__esModule = true;
var testData = "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm\n\niyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\nhcl:#cfa07d byr:1929\n\nhcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm\n\nhcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in";
var input = testData;
var splitted = input.split("\n");
var newArr = [];
var lineBreak = splitted.forEach(function (item) {
    item === '' ? item = '---' : item = item;
    newArr.push(item);
});
var reformattedArr = newArr.join().split(',---,');
var finalArr = [];
var separators = [' ', ','];
var finalFormat = reformattedArr.forEach(function (item) {
    finalArr.push(item.split(new RegExp(separators.join('|'), 'g')));
});
console.log(finalArr);
var count = 0;
finalArr.forEach(function (item, index) {
    item.length === 8 ? count++ : item.length === 7 ? item.join().includes('cid:') ? null : count++ : null;
});
console.log(count);
