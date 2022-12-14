import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: [number, number][][]) => {
    const grid: Record<string, number> = {};
    let max = 0;
    for (const row of input) {
        for (let pairIdx = 0; pairIdx < row.length - 1; pairIdx++) {
            const thing1 = row[pairIdx];
            const thing2 = row[pairIdx + 1];
            for (let i = Math.min(thing1[0], thing2[0]); i <= Math.max(thing1[0], thing2[0]); i++) {
                for (let j = Math.min(thing1[1], thing2[1]); j <= Math.max(thing1[1], thing2[1]); j++) {
                    if (j > max) max = j;
                    grid[`${i}|${j}`] = 1;
                }
            }
        }
    }
    const highest = max + 2;
    const runSand = () => {
        const sandPos = [500, 0];
        while (true) {
            if (sandPos[1] >= highest) break;
            if (!grid[`${sandPos[0]}|${sandPos[1] + 1}`]) {
                sandPos[1]++;
            } else if (!grid[`${sandPos[0] - 1}|${sandPos[1] + 1}`]) {
                sandPos[1]++;
                sandPos[0]--;
            } else if (!grid[`${sandPos[0] + 1}|${sandPos[1] + 1}`]) {
                sandPos[1]++;
                sandPos[0]++;
            } else {
                grid[sandPos.join("|")] = 2;
                break;
            }
        }
    }
    let lastSandCount = -1;
    let currSandCount = 0;
    while (lastSandCount !== currSandCount) {
        runSand();
        lastSandCount = currSandCount;
        currSandCount = Object.values(grid).filter(l => l === 2).length;
    }

    return currSandCount;
};

const part2 = (input: [number, number][][]) => {
    const grid: Record<string, number> = {};
    let max = 0;
    for (const row of input) {
        for (let pairIdx = 0; pairIdx < row.length - 1; pairIdx++) {
            const thing1 = row[pairIdx];
            const thing2 = row[pairIdx + 1];
            for (let i = Math.min(thing1[0], thing2[0]); i <= Math.max(thing1[0], thing2[0]); i++) {
                for (let j = Math.min(thing1[1], thing2[1]); j <= Math.max(thing1[1], thing2[1]); j++) {
                    if (j > max) max = j;
                    grid[`${i}|${j}`] = 1;
                }
            }
        }
    }
    const highest = max + 2;
    const runSand = () => {
        const sandPos = [500, 0];
        while (true) {
            if (sandPos[1] >= highest - 1) {
                grid[sandPos.join("|")] = 2;
                break;
            }
            if (!grid[`${sandPos[0]}|${sandPos[1] + 1}`]) {
                sandPos[1]++;
            } else if (!grid[`${sandPos[0] - 1}|${sandPos[1] + 1}`]) {
                sandPos[1]++;
                sandPos[0]--;
            } else if (!grid[`${sandPos[0] + 1}|${sandPos[1] + 1}`]) {
                sandPos[1]++;
                sandPos[0]++;
            } else {
                grid[sandPos.join("|")] = 2;
                break;
            }
        }
    }
    let amount = 0;
    while (!("500|0" in grid)) {
        runSand();
        amount++;
    }

    return amount;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed = input.map(l => l.split(" -> ").map(j => j.split(",").map(Number) as [number, number]));

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
