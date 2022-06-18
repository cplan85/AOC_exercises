import { textInput } from "./day10Data";

let day10TestString = `16
10
15
5
1
11
7
19
6
12
4`;

let numbersArr = textInput.split("\n").map((item) => {
  return parseInt(item);
});

const sortedNums = numbersArr.sort(function (a, b) {
  return a - b;
});

let currentJolt = 0;
let adapterCount = 0;
let oneJoltDiff = 0;
let threeJoltDiff = 0;

while (adapterCount < sortedNums.length) {
  const compatibleAdapters = sortedNums.filter(
    (a) => a <= currentJolt + 3 && a > currentJolt
  );
  const nextAdapter = compatibleAdapters[0];
  if (nextAdapter - currentJolt === 1) oneJoltDiff += 1;
  if (nextAdapter - currentJolt === 3) threeJoltDiff += 1;
  currentJolt = nextAdapter;
  adapterCount += 1;
}

console.log(oneJoltDiff);
console.log(threeJoltDiff);

console.log(oneJoltDiff * (threeJoltDiff + 1));
