import { textInput } from "./day5Data";

const testData = `
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

const input = textInput;

let splitted = input.split("\n");

const processPass = (str: string) => {
  let rowMin = 0,
    rowMax = 127,
    colMin = 0,
    colMax = 7;
  for (let i = 0; i <= 6; i++) {
    str[i] === "F"
      ? (rowMax = Math.floor(rowMax - (rowMax - rowMin) / 2))
      : (rowMin = Math.ceil(rowMin + (rowMax - rowMin) / 2));
  }
  for (let i = 7; i <= 9; i++) {
    str[i] === "L"
      ? (colMax = Math.floor(colMax - (colMax - colMin) / 2))
      : (colMin = Math.ceil(colMin + (colMax - colMin) / 2));
  }
  return rowMin * 8 + colMin;
};

const idValues = splitted.map((string: string) => {
  return processPass(string);
});

console.log( Math.max(...idValues) )

const sortSeats = [...idValues].sort((a, b) => a - b)

const candidates = sortSeats.filter(
    (item, index) =>
    sortSeats[index+1] - item === 2
);

console.log(candidates[0] +1)