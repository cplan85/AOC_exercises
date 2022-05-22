"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var day8Data_1 = require("./day8Data");
var testData = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";
var input = day8Data_1.textInput;
var splitted = input.trim().split("\n");
var instructions = input
    .trim()
    .split("\n")
    .map(function (instructions) {
    var _a = instructions.match(/(acc|jmp|nop) ([+-]\d+)/), fullMatch = _a[0], type = _a[1], numString = _a[2];
    var num = parseInt(numString);
    return { type: type, num: num };
});
console.log("23432", instructions);
var operaterAndNum = splitted.map(function (item) {
    //return item.match(/((\+|\-)[0-9]{0,3})/);
    return item.split(" ");
});
/*

const longSolver = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let operator = arr[i][0];
    let num = parseInt(arr[i][1]);

    if (operator === "jmp" && item.length == 2) {
      i = i + num - 1;
      item.push("visited");
    } else if (operator === "acc" && item.length == 2) {
      count += num;
      // console.log(`LONG count accumulate`, count);
      item.push("visited");
    } else if (operator === "nop" && item.length == 2) {
      count = count;
      item.push("visited");
    } else {
      i = arr.length;
    }
  }
  return count;
};
longSolver(operaterAndNum);

let visited = operaterAndNum.filter((item) => {
  return item.length == 3;
});

let lastItem = visited[visited.length - 1];

//console.log(`LAST ITEM`, lastItem);
const newArray = operaterAndNum.map((item, i) => {
  let operator = item[0];
  if (item == lastItem) {
    operator === "jmp"
      ? (operaterAndNum[i][0] = "nop")
      : (operaterAndNum[i][0] = "jmp");
  }
  return item;
});

const shortSolver = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let operator = arr[i][0];
    let num = parseInt(arr[i][1]);

    if (operator === "jmp") {
      i = i + num - 1;
      item.push("visited");
    } else if (operator === "acc") {
      count += num;
      // console.log(`SHORT count accumulate`, count);
      item.push("visited");
    } else if (operator === "nop") {
      count = count;
      item.push("visited");
    } else {
      i = arr.length;
    }
  }
  return count;
};


const runProgram = (instructions) => {
  let index = 0;
  let accumulator = 0;
  const visited = new Set();
  while (!visited.has(index)) {
    visited.add(index);
    const { operator, num } = instructions[index];
    if (operator === "acc") {
      accumulator += num;
      index++;
    } else if (operator === "jump") {
      index += num;
    } else {
      index++;
    }
  }

  return accumulator;
};
*/
var runProgram = function (instructions, accumulator, index, visited) {
    if (accumulator === void 0) { accumulator = 0; }
    if (index === void 0) { index = 0; }
    if (visited === void 0) { visited = new Set(); }
    if (visited.has(index))
        return accumulator;
    visited.add(index);
    var _a = instructions[index], type = _a.type, num = _a.num;
    var nextVisited = new Set(__spreadArray(__spreadArray([], visited), [index]));
    if (type === "acc") {
        return runProgram(instructions, accumulator + num, index + 1, nextVisited);
        accumulator += num;
        index++;
    }
    else if (type === "jump") {
        return runProgram(instructions, accumulator, index + num, nextVisited);
        index += num;
    }
    else {
        return runProgram(instructions, accumulator, index + 1, nextVisited);
    }
};
console.log("aehroeahe", runProgram(instructions));
//console.log(`HOPEFULLY CORRECT`, shortSolver(newArray));
