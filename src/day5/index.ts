import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (raw: Record<number, string[]>, instrs: Instruction[]) => {
    const input: Record<number, string[]> = {};
    for (const i in raw) {
        input[i] = [...raw[i]];
    }
    for (const instr of instrs) {
        for (let i = 0; i < instr.quantity; i++) {
            input[instr.to].unshift(input[instr.from].shift()!);
        }
    }
    return Object.values(input).reduce((acc, cur) => acc + cur[0], "");
};

const part2 = (raw: Record<number, string[]>, instrs: Instruction[]) => {
    const input: Record<number, string[]> = {};
    for (const i in raw) {
        input[i] = [...raw[i]];
    }
    for (const instr of instrs) {
        input[instr.to].unshift(...input[instr.from].slice(0, instr.quantity));
        for (let i = 0; i < instr.quantity; i++) {
            input[instr.from].shift();
        }
    }
    return Object.values(input).reduce((acc, cur) => acc + cur[0], "");
};

interface Instruction {
    quantity: number;
    from: number;
    to: number;
}

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);

    const initialState: Record<number, string[]> = {}
    const instrs: Instruction[] = [];

    let gettingInstrs = false;
    for (const row of input) {
        if (row === "") { gettingInstrs = true; continue; }
        if (!gettingInstrs) {
            for (let i = 0; i < row.length / 4; i++) {
                if (row[i * 4] === "[") {
                    if (initialState[+i + 1]) {
                        initialState[Number(i) + 1].push(row[i * 4 + 1]);
                    } else {
                        initialState[Number(i) + 1] = [row[i * 4 + 1]];
                    }
                }
            }
        } else {
            const first = +row.split(" from ")[0].slice(5);
            const second = +row.split(" from ")[1].split(" ")[0];
            const third = +row.split(" to ")[1].split(" ")[0];
            const instruction = {
                quantity: first,
                from: second,
                to: third
            }
            instrs.push(instruction);
        }
    }

    console.time("part1");

    console.log(part1(initialState, instrs));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(initialState, instrs));

    console.timeEnd("part2");
};

main();
