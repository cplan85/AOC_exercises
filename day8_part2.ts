import { group } from "console";
import { isContext } from "vm";
import { textInput } from "./day8Data";

const testData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const input = testData;

//let splitted = input.trim().split("\n");
let instructionIndex = 0;
let instructionsInput = input
  //.trim()
  .split("\n")
  .filter((line) => line)
  .map((instructionsEncoded) => {
    const [opCode, opArgument] = instructionsEncoded.split(" ");
    const index = instructionIndex;
    instructionIndex++;
    return {
      opCode,
      opArgument: 1 * parseInt(opArgument),
      executed: false,
      index,
    };
  });
const executors = {
  nop(argument, context) {
    context.instructionsIndex++;
  },
  acc(argument, context) {
    context.accumulator += argument;
    context.instructionsIndex++;
  },
  jmp(argument, context) {
    context.instructionsIndex += argument;
  },
};

const execute = (instructions) => {
  const context = {
    instructions,
    instructionsIndex: 0,
    accumulator: 0,
    infiniteLoop: false,
    erroneous: false,
  };
  //I CHANGED THIS LINE
  let instruction =
    context.instructions[context.instructionsIndex][context.instructionsIndex];

  while (!instruction.executed) {
    // console.log(`instruction.opCodeBABY`, instruction);
    if (!(instruction.opCode in executors)) {
      throw new Error(`Unknown opcode is ${instruction.opCode}`);
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

const clone = (instructions) => {
  return instructions.map((instruction) => {
    return Object.assign({}, instructions, {
      executed: false,
    });
  });
};

instructionsInput
  .filter((instruction) => {
    return instruction.opCode === "jmp" || instruction.opCode === "nop";
  })
  .filter((modifiable) => {
    const cloned = clone(instructionsInput);
    cloned[modifiable.index].opCode = {
      jmp: "nop",
      nop: "jmp",
    }[modifiable.opCode];

    const context = execute(cloned);
    const fixed = !context.infiniteLoop && !context.erroneous;

    if (fixed) {
      console.log(context.accumulator);
    }

    return fixed;
  });

//console.log(instructions);
console.log(execute(instructionsInput));
execute(instructionsInput);
