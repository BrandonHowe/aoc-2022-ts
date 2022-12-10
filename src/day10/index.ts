import * as path from "path";
import { displayGridFuncConfig } from "../helpers/displayGrid";
import readInput, { InputMode } from "../helpers/readInput";

type Instruction = { type: "noop" } | { type: "addx"; val: number };

const part1 = (input: Instruction[]) => {
    let cycleNum = 0;
    let x = 1;
    let total = 0;
    const increaseCycle = () => {
        cycleNum++;
        if ((cycleNum - 20) % 40 === 0) {
            total += cycleNum * x;
        }
    }
    for (const instr of input) {
        if (instr.type === "noop") {
            increaseCycle();
        } else if (instr.type === "addx") {
            increaseCycle();
            increaseCycle();
            x += instr.val;
        }
    }
    return total;
};

const part2 = (input: Instruction[]) => {
    let grid: string[][] = [];
    for (let j = 0; j < 6; j++) {
        grid.push([]);
        for (let i = 0; i < 40; i++) {
            grid[grid.length - 1].push(".");
        }
    }
    let cycleNum = 0;
    let x = 1;
    let currentGridPos = 0;
    const increaseCycle = () => {
        cycleNum++;
        if (currentGridPos % 40 >= x - 1 && currentGridPos % 40 <= x + 1) {
            grid[Math.floor(currentGridPos / 40)][currentGridPos % 40] = "#";
        }
        currentGridPos++;
    }
    for (const instr of input) {
        if (instr.type === "noop") {
            increaseCycle();
        } else if (instr.type === "addx") {
            increaseCycle();
            increaseCycle();
            x += instr.val;
        }
    }
    return displayGridFuncConfig(grid);
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed: Instruction[] = [];
    for (const line of input) {
        if (line === "noop") {
            parsed.push({ type: "noop" });
        } else if (line.startsWith("addx")) {
            parsed.push({ type: "addx", val: Number(line.split(" ")[1]) });
        }
    }

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
