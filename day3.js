"use strict";
exports.__esModule = true;
var day3Data_1 = require("./day3Data");
var field = [
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
];
var directions = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
var width = day3Data_1.formattedInput[0].length;
//this is a function to find the number of trees on the field;
var traverser = function (changeRow, changeCol, row, col) {
    if (row === void 0) { row = 0; }
    if (col === void 0) { col = 0; }
    return row < day3Data_1.formattedInput.length ? traverser(changeRow, changeCol, row + changeRow, (col + changeCol) % width) + (day3Data_1.formattedInput[row][col] === "#" ? 1 : 0) : 0;
};
var treeCounts = directions.map(function (_a) {
    var changeRow = _a[0], changeCol = _a[1];
    return traverser(changeRow, changeCol);
});
console.log(treeCounts.reduce(function (product, next) { return product * next; }));
