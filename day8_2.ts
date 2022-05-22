import { group } from "console";
import { runInContext } from "vm";
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

let splitted = input.trim().split("\n");

class Solver {
  accumulator: number;
  code: Array<Object>;
  pointer: number;
  constructor(lines) {
    this.accumulator = 0;

    this.code = lines.map((line) => {
      const { groups } = /^(?<instruction>\D+) \+?(?<value>-?\d+)$/.exec(line);
      // groups.value = parseInt(groups.value);
      return groups;
    });
  }

  run() {
    while (true) {
      const { instruction, value } = this.code[this.pointer];
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
  }
}

const p = new Solver(splitted);
console.log(p);

p.run;
