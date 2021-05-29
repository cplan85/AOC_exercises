import { textInput } from "./day2Data";

var correctPasswordCount = function (input: string) {
  let splitted = input.split("\n");
  let arr = [];
  let count = 0;
  //create an array of arrays with 2 items - 1st is the criteria; 2nd is the actual password
  splitted.forEach((item) => {
    arr.push(item.split(":"));
  });

  arr.forEach((item) => {
    let passwordCriteria = item[0];
    let password = item[1];
    let characterMatch = passwordCriteria[passwordCriteria.length - 1];
    //remove last 2 empty characters and divide array by - for low and high ranges
    let numbersRange = passwordCriteria
      .substring(0, passwordCriteria.length - 2)
      .split("-");
    var regexp = new RegExp(characterMatch, "gi");
    let matches = 0;
    password.match(regexp) ? (matches = password.match(regexp).length) : null;
    matches >= parseFloat(numbersRange[0]) &&
    matches <= parseFloat(numbersRange[1])
      ? count++
      : (count = count);
  });

  return count;
};

correctPasswordCount(textInput);

var modifiedPasswordCount = function (input: string) {
  let splitted = input.split("\n");
  let arr = [];
  let count = 0;
  //create an array of arrays with 2 items - 1st is the criteria; 2nd is the actual password
  splitted.forEach((item) => {
    arr.push(item.split(":"));
  });

  arr.forEach((item) => {
    let passwordCriteria = item[0];
    let password = item[1];
    let characterMatch = passwordCriteria[passwordCriteria.length - 1];
    //remove last 2 empty characters and divide array by - for low and high ranges
    let numbersRange = passwordCriteria
      .substring(0, passwordCriteria.length - 2)
      .split("-");
    let matches = 0;
    password[numbersRange[0]] == characterMatch ? matches++ : null;
    password[numbersRange[1]] == characterMatch ? matches++ : null;
    matches == 1 ? count++ : (count = count);
  });

  return count;
};

modifiedPasswordCount(textInput);
