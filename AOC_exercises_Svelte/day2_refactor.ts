import { textInput } from '../day2Data';
var list = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

const splitted = textInput.split('\n');
const pattern = /(\d+)-(\d+) (\w): (\S+)/;

const validPasswords = splitted.filter((entry) => {
  const parts = entry.match(pattern);
  const [_, min, max, char, password] = parts;
  const regexp = new RegExp(char, "gi");
  let numOfInstances;
  password.match(regexp)
    ? (numOfInstances = password.match(regexp).length)
    : (numOfInstances = 0);
  //return [min, max, char, password, numOfInstances]
  return min <= numOfInstances && numOfInstances <= max;
}).length;

const validPasswords2 = splitted.filter((entry) => {
  let parts = entry.match(pattern);
  const [_, index1, index2, char, password] = parts;
  //!== indicates opposite of 1st expression
  return (password[parseInt(index1) - 1] === char) !== (password[parseInt(index2) - 1] === char);
}).length;

console.log(`Part 1 valid passwords: ${validPasswords} , Part 2 valid passwords: ${validPasswords2}`);