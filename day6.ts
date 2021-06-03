import { textInput } from "./day6Data";

const testData = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const input = textInput;

let splitted = input.split("\n");

const formattedArr = splitted.join(' ').split('  ');
//replace repeating characters, then replace blank spaces globally
const part1Array = formattedArr.map(str => {
  return str.replace(/(.)(?=.*\1)/g, "").replace(/\s/g, '');
})
//change array to length of strings then sum them together

const part2Array = formattedArr.map(item => {
  return item.split(' ')
});

const getFinalCount = (array ) => {
 return array.map(item => {return item.length}).reduce((sum, currItem) => {
    return sum + currItem
  })
}
//find common characters among different arrays
const commonChars = (arr) => {
  const output = [];
  const firstChars = [...arr[0]];
  
  for (let char of firstChars) {
    if (arr.every(entry => entry.includes(char))) {
      output.push(char);
       arr = arr.map(entry => entry.replace(char, ''));
    }
  
  }
  
  return output;
};
//For each input of Array of array return common character..ie. input: [[a, b], [a, c]] output: [a]
const part2_FinalArray = part2Array.map(stringArr => {
 return commonChars(stringArr)
})


console.log(`Part 1 Result ==>`, getFinalCount(part1Array))
console.log(`Part 2 Result ==>`, getFinalCount(part2_FinalArray))