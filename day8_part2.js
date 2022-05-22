"use strict";
exports.__esModule = true;
var testData = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";
var input = testData;
//let splitted = input.trim().split("\n");
var instructionIndex = 0;
var instructionsInput = input
    //.trim()
    .split("\n")
    .filter(function (line) { return line; })
    .map(function (instructionsEncoded) {
    var _a = instructionsEncoded.split(" "), opCode = _a[0], opArgument = _a[1];
    var index = instructionIndex;
    instructionIndex++;
    return {
        opCode: opCode,
        opArgument: 1 * parseInt(opArgument),
        executed: false,
        index: index
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
        accumulator: 0,
        infiniteLoop: false,
        erroneous: false
    };
    //I CHANGED THIS LINE
    var instruction = context.instructions[context.instructionsIndex][context.instructionsIndex];
    console.log("error is here", context.instructions);
    console.log("I AM CONTETZ", instruction.opCode);
    while (!instruction.executed) {
        // console.log(`instruction.opCodeBABY`, instruction);
        if (!(instruction.opCode in executors)) {
            throw new Error("Unknown opcode is " + instruction.opCode);
        }
        executors[instruction.opCode](instruction.opArgument, context);
        instruction.executed = true;
        instruction = context.instructions[context.instructionsIndex];
        // console.log(context.accumulator);
        if (context.instructionsIndex === context.instructions.length) {
            break;
        }
        if (!instruction) {
            context.erroneous = true;
            break;
        }
        if (instruction.executed) {
            context.infiniteLoop = true;
        }
    }
    return context;
};
var clone = function (instructions) {
    return instructions.map(function (instruction) {
        return Object.assign({}, instructions, {
            executed: false
        });
    });
};
instructionsInput
    .filter(function (instruction) {
    return instruction.opCode === "jmp" || instruction.opCode === "nop";
})
    .filter(function (modifiable) {
    var cloned = clone(instructionsInput);
    cloned[modifiable.index].opCode = {
        jmp: "nop",
        nop: "jmp"
    }[modifiable.opCode];
    var context = execute(cloned);
    var fixed = !context.infiniteLoop && !context.erroneous;
    if (fixed) {
        console.log(context.accumulator);
    }
    return fixed;
});
//console.log(instructions);
console.log(execute(instructionsInput));
execute(instructionsInput);
