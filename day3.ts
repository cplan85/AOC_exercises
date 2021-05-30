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

const directions = [[1,1],[1,3],[1,5],[1,7],[2,1]]
const width = formattedInput[0].length;
//this is a function to find the number of trees on the field;
const traverser = (changeRow: number, changeCol: number, row =0, col = 0) => {
  return row < formattedInput.length ? traverser(changeRow, changeCol, row + changeRow, (col + changeCol) % width) + (formattedInput[row][col] === "#" ? 1 : 0) : 0
}
const treeCounts = directions.map(([changeRow, changeCol]) => 
  traverser(changeRow, changeCol)
)
console.log(treeCounts.reduce((product, next) =>  product * next))
