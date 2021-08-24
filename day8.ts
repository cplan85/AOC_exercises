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

const input = textInput;

let splitted = input.trim().split("\n");

const operaterAndNum = splitted.map((item) => {
  //return item.match(/((\+|\-)[0-9]{0,3})/);
  return item.split(" ");
});

// if arr[0] = nop, count = count;
// else if arr[0] == acc, count += arr[1]

const solver = (input) => {
  let count = 0;
  operaterAndNum.map((item, i) => {
    let operator = item[0];
    i = 2;
    if (operator === "acc") {
      count += parseInt(item[1]);
    }
  });
  return count;
};

//console.log("solver", solver(testData));

let count = 0;

for (let i = 0; i < operaterAndNum.length; i++) {
  let item = operaterAndNum[i];
  let operator = operaterAndNum[i][0];
  let num = parseInt(operaterAndNum[i][1]);

  if (operator === "jmp" && item.length == 2) {
    i = i + num - 1;
    item.push("visited");
  } else if (operator === "acc" && item.length == 2) {
    count += num;
    console.log(`count accumulate`, count);
    item.push("visited");
  } else if (operator === "nop" && item.length == 2) {
    count = count;
    operaterAndNum[i].push("visited");
  } else {
    i = operaterAndNum.length;
  }
}

console.log(`FINAL`, count);
// console.log(solver(operater_num));
