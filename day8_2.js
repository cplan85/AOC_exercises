"use strict";
exports.__esModule = true;
var testData = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";
var input = testData;
var splitted = input.trim().split("\n");
var Solver = /** @class */ (function () {
    function Solver(lines) {
        this.accumulator = 0;
        this.code = lines.map(function (line) {
            var groups = /^(?<instruction>\D+) \+?(?<value>-?\d+)$/.exec(line).groups;
            // groups.value = parseInt(groups.value);
            return groups;
        });
    }
    Solver.prototype.run = function () {
        while (true) {
            var _a = this.code[this.pointer], instruction = _a.instruction, value = _a.value;
            console.log(instruction, value);
            switch (instruction) {
                case "nop":
                    this.pointer++;
                    break;
                case "acc":
                    this.accumulator += parseInt(value);
                    this.pointer++;
                    break;
                default:
                    throw new Error("not implemented");
            }
        }
    };
    return Solver;
}());
var p = new Solver(splitted);
console.log(p);
p.run;
