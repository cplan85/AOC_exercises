import { textInput } from "./day9Data";

const day9TestData: string = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

var NumbersArr = textInput.split("\n").map((item) => {
  return parseInt(item);
});

const testPreamble = 5;
const preamble = 25;

const day9twoSum = (arr: number[], S: number): any[] => {
  var sums = [];
  var hashTable: any = {};

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

const day9Result = NumbersArr.find((number, idx, numbers) => {
  if (idx < preamble) {
    return false;
  }
  const previousNumbers = numbers.slice(idx - preamble, idx);

  if (day9twoSum(previousNumbers, number).length > 0) {
    return false;
  } else if (day9twoSum(previousNumbers, number).length == 0) {
    return number;
  }
});

console.log(day9Result);

// part 2
subArraySum(NumbersArr, NumbersArr.length, day9Result);

function subArraySum(arr: number[], n: number, sum: number) {
  let curr_sum = arr[0],
    start = 0,
    i;

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
      let p = i - 1;
      console.log("Sum found between indexes " + start + " and " + p);
      let contigousArr = [...arr].slice(start, p + 1);
      console.log(
        `Final Contigous sum:`,
        Math.min(...contigousArr) + Math.max(...contigousArr)
      );
      return 1;
    }

    // Add this element to curr_sum
    if (i < n) curr_sum = curr_sum + arr[i];
  }

  console.log("No subarray found");
  return 0;
}
