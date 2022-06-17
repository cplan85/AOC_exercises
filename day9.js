"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var day9Data_1 = require("./day9Data");
var day9TestData = "35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576";
var NumbersArr = day9Data_1.textInput.split("\n").map(function (item) {
    return parseInt(item);
});
var testPreamble = 5;
var preamble = 25;
var day9twoSum = function (arr, S) {
    var sums = [];
    var hashTable = {};
    // check each element in array
    for (var i = 0; i < arr.length; i++) {
        // calculate S - current element
        var sumMinusElement = S - arr[i];
        // check if this number exists in hash table
        // if so then we found a pair of numbers that sum to S
        if (hashTable[sumMinusElement.toString()] !== undefined) {
            sums.push([arr[i], sumMinusElement]);
        }
        // add the current number to the hash table
        hashTable[arr[i].toString()] = arr[i];
    }
    // return all pairs of integers that sum to S
    return sums;
};
var day9Result = NumbersArr.find(function (number, idx, numbers) {
    if (idx < preamble) {
        return false;
    }
    var previousNumbers = numbers.slice(idx - preamble, idx);
    if (day9twoSum(previousNumbers, number).length > 0) {
        return false;
    }
    else if (day9twoSum(previousNumbers, number).length == 0) {
        return number;
    }
});
console.log(day9Result);
// part 2
subArraySum(NumbersArr, NumbersArr.length, day9Result);
function subArraySum(arr, n, sum) {
    var curr_sum = arr[0], start = 0, i;
    // Pick a starting point
    for (i = 1; i <= n; i++) {
        // If curr_sum exceeds the sum,
        // then remove the starting elements
        while (curr_sum > sum && start < i - 1) {
            curr_sum = curr_sum - arr[start];
            start++;
        }
        // If curr_sum becomes equal to sum,
        // then return true
        if (curr_sum == sum) {
            var p = i - 1;
            console.log("Sum found between indexes " + start + " and " + p);
            var contigousArr = __spreadArray([], arr).slice(start, p + 1);
            console.log("Final Contigous sum:", Math.min.apply(Math, contigousArr) + Math.max.apply(Math, contigousArr));
            return 1;
        }
        // Add this element to curr_sum
        if (i < n)
            curr_sum = curr_sum + arr[i];
    }
    console.log("No subarray found");
    return 0;
}
