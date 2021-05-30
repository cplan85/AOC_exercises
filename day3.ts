import {formattedInput} from "./day3Data";
const field = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#"
]


const width = formattedInput[0].length;
//this is a function to find the number of trees on the field;
const traverser = (row =0, col = 0) => {
  return row < formattedInput.length ? traverser(row + 1, (col + 3) % width) + (formattedInput[row][col] === "#" ? 1 : 0) : 0
}

traverser()
