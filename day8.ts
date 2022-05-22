import { group } from "console";
import { textInput } from "./day8Data";

const testData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

class Program {
  constructor(lines) {
    this.accumulator = 0;
    this.code = lines.map((line) => {
      const { groups } = /^(?<instruction>\D+) \+?(?<value>-?\d+)$/.exec(line);
      return group;
    });
  }
}

const input = textInput;

let splitted = input.trim().split("\n");

let instructions = input
  .trim()
  .split("\n")
  .map((instructions) => {
    const [fullMatch, type, numString] = instructions.match(
      /(acc|jmp|nop) ([+-]\d+)/
    );
    const num = parseInt(numString);
    return { type, num };
  });
console.log("23432", instructions);
const operaterAndNum = splitted.map((item) => {
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
const runProgram = (
  instructions,
  accumulator = 0,
  index = 0,
  visited = new Set()
) => {
  if (visited.has(index)) return accumulator;

  visited.add(index);
  const { type, num } = instructions[index];
  const nextVisited = new Set([...visited, index]);
  if (type === "acc") {
    return runProgram(instructions, accumulator + num, index + 1, nextVisited);
    accumulator += num;
    index++;
  } else if (type === "jump") {
    return runProgram(instructions, accumulator, index + num, nextVisited);
    index += num;
  } else {
    return runProgram(instructions, accumulator, index + 1, nextVisited);
  }
};
console.log("aehroeahe", runProgram(instructions));
//console.log(`HOPEFULLY CORRECT`, shortSolver(newArray));
