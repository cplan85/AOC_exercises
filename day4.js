"use strict";
exports.__esModule = true;
var day4Data_1 = require("./day4Data");
var testData = "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm\n\niyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\nhcl:#cfa07d byr:1929\n\nhcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm\n\nhcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in";
var input = day4Data_1.textInput;
var splitted = input.split("\n");
var newArr = [];
splitted.forEach(function (item) {
    item === "" ? (item = "---") : (item = item);
    newArr.push(item);
});
var reformattedArr = newArr.join().split(",---,");
var finalArr = [];
var separators = [" ", ","];
reformattedArr.forEach(function (item) {
    finalArr.push(item.split(new RegExp(separators.join("|"), "g")));
});
var finalObj = finalArr.map(function (item, index) {
    var finalObj = {};
    item.map(function (entries) {
        var splitEntry = entries.split(":");
        finalObj[splitEntry[0]] = splitEntry[1];
    });
    return finalObj;
});
var checkInRange = function (numString, min, max) {
    var num = parseInt(numString);
    return min <= num && num <= max;
};
var requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
var completenessCheck = function (obj) { return requiredKeys.every(function (key) { return key in obj; }); };
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.
var validityCheck = function (obj) {
    var byrCheck = checkInRange(obj.byr, 1920, 2002);
    var iyrCheck = checkInRange(obj.iyr, 2010, 2020);
    var eyrCheck = checkInRange(obj.eyr, 2010, 2030);
    var hgtPat = /^(\d+)(cm|in)$/;
    var hgtCheck = false;
    if (hgtPat.test(obj.hgt)) {
        var _a = obj.hgt.match(hgtPat), _ = _a[0], num = _a[1], unit = _a[2];
        var intNum = parseInt(num);
        hgtCheck =
            (unit === "cm" && checkInRange(intNum, 150, 193)) ||
                (unit === "in" && checkInRange(intNum, 59, 76));
    }
    var hclCheck = /^#[0-9a-f]{6}$/.test(obj.hcl);
    var eclCheck = /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test(obj.ecl);
    var pidCheck = /^\d{9}$/.test(obj.pid);
    var results = {
        byrCheck: byrCheck,
        iyrCheck: iyrCheck,
        eyrCheck: eyrCheck,
        hgtCheck: hgtCheck,
        hclCheck: hclCheck,
        eclCheck: eclCheck,
        pidCheck: pidCheck
    };
    return Object.values(results).every(function (bool) { return bool; });
};
var part1PassportCheck = finalObj.filter(function (obj) {
    return completenessCheck(obj);
});
var part2PassportCheck = finalObj.filter(function (obj) {
    return completenessCheck(obj) && validityCheck(obj);
});
console.log("Part 1: Number of Valid Passports =>", part1PassportCheck.length);
console.log("Part 2: Number of Valid Passports =>", part2PassportCheck.length);
