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

var NumbersArr = testData.split("\n").map((item) => {
  return parseInt(item);
});

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
  if (idx < 5) {
    return false;
  }
  const previousNumbers = numbers.slice(idx - 5, idx);
  console.log("Prevous numbers", previousNumbers);
  for (const number of NumbersArr) {
    return twoSum(previousNumbers, number);
  }
});

console.log(result);

//console.log(NumbersArr);
