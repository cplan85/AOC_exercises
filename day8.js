"use strict";
exports.__esModule = true;
var day8Data_1 = require("./day8Data");
var testData = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";
var input = day8Data_1.textInput;
var splitted = input.trim().split("\n");
var operaterAndNum = splitted.map(function (item) {
    //return item.match(/((\+|\-)[0-9]{0,3})/);
    return item.split(" ");
});
// if arr[0] = nop, count = count;
// else if arr[0] == acc, count += arr[1]
var solver = function (input) {
    var count = 0;
    operaterAndNum.map(function (item, i) {
        var operator = item[0];
        i = 2;
        if (operator === "acc") {
            count += parseInt(item[1]);
        }
    });
    return count;
};
//console.log("solver", solver(testData));
var count = 0;
for (var i = 0; i < operaterAndNum.length; i++) {
    var item = operaterAndNum[i];
    var operator = operaterAndNum[i][0];
    var num = parseInt(operaterAndNum[i][1]);
    if (operator === "jmp" && item.length == 2) {
        i = i + num - 1;
        item.push("visited");
    }
    else if (operator === "acc" && item.length == 2) {
        count += num;
        console.log("count accumulate", count);
        item.push("visited");
    }
    else if (operator === "nop" && item.length == 2) {
        count = count;
        operaterAndNum[i].push("visited");
    }
    else {
        i = operaterAndNum.length;
    }
}
console.log("FINAL", count);
// console.log(solver(operater_num));
