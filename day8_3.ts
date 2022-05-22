import { group } from "console";
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

let instructions = input
  //.trim()
  .split("\n")
  .map((instructions) => {
    const [opCode, opArgument] = instructions.split(" ");
    return {
      opCode,
      opArgument: 1 * parseInt(opArgument),
      executed: false,
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
  };

  let instruction = context.instructions[context.instructionsIndex];
  while (!instruction.executed) {
    if (!(instruction.opCode in executors)) {
      throw new Error(`Unknown opcode ${instruction.opCode}`);
    }
    executors[instruction.opCode](instruction.opArgument, context);
    instruction.executed = true;
    instruction = context.instructions[context.instructionsIndex];
  }

  console.log(context.accumulator);
};

execute(instructions);
