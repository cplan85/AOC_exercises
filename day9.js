var day9Data_1 = require("./day9Data");
var input = day9Data_1.textInput;

const testData = `35
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

var NumbersArr = input.split("\n").map((item) => {
  return parseInt(item);
});

const testPreamble = 5;
const preamble = 25;

const twoSum = (arr, S) => {
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

const result = NumbersArr.find((number, idx, numbers) => {
  if (idx < preamble) {
    return false;
  }
  const previousNumbers = numbers.slice(idx - preamble, idx);

  if (twoSum(previousNumbers, number).length > 0) {
    return false;
  } else if (twoSum(previousNumbers, number).length == 0) {
    return number;
  }
});

console.log(result);
