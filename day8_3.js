"use strict";
exports.__esModule = true;
var testData = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";
var input = testData;
//let splitted = input.trim().split("\n");
var instructions = input
    //.trim()
    .split("\n")
    .map(function (instructions) {
    var _a = instructions.split(" "), opCode = _a[0], opArgument = _a[1];
    return {
        opCode: opCode,
        opArgument: 1 * parseInt(opArgument),
        executed: false
    };
});
var executors = {
    nop: function (argument, context) {
        context.instructionsIndex++;
    },
    acc: function (argument, context) {
        context.accumulator += argument;
        context.instructionsIndex++;
    },
    jmp: function (argument, context) {
        context.instructionsIndex += argument;
    }
};
var execute = function (instructions) {
    var context = {
        instructions: instructions,
        instructionsIndex: 0,
        accumulator: 0
    };
    var instruction = context.instructions[context.instructionsIndex];
    while (!instruction.executed) {
        if (!(instruction.opCode in executors)) {
            throw new Error("Unknown opcode " + instruction.opCode);
        }
        executors[instruction.opCode](instruction.opArgument, context);
        instruction.executed = true;
        instruction = context.instructions[context.instructionsIndex];
    }
    console.log(context.accumulator);
};
execute(instructions);
