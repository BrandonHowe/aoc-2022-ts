import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const rocksRaw = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`;

const rocks: number[][][] = rocksRaw.split("\n\n").map(l => l.split("\n").map(j => j.split("").map(k => k === "#" ? 1 : 0)));

type Input = (1 | -1)[];

const part1 = (input: Input) => {
    const grid: Record<number, Record<number, number>> = {};
    let jetIdx = 0;

    const addRock = (rockIdx: number) => {
        let highestGrid = Math.max(...Object.keys(grid).map(Number));
        if (highestGrid === -Infinity) highestGrid = -1;

        const rock = rocks[rockIdx];
        const newPositions: [number, number][] = [];
        for (let i = 0; i < rock.length; i++) {
            for (let j = 0; j < rock[i].length; j++) {
                if (rock[i][j] === 0) continue;
                newPositions.push([rock.length - i + 3 + highestGrid, j + 2]);
            }
        }

        let shiftedPositions: [number, number][] = newPositions;
        while (true) {
            const action = input[jetIdx++ % input.length];
            let potentialShift: [number, number][] = [];
            if (action === 1) {
                potentialShift = shiftedPositions.map(l => [l[0], l[1] + 1]);
            } else {
                potentialShift = shiftedPositions.map(l => [l[0], l[1] - 1]);
            }
            if (!potentialShift.some(l => l[1] < 0 || l[1] > 6) && !potentialShift.some(l => grid[l[0]]?.[l[1]] === 1)) {
                shiftedPositions = potentialShift;
            }
            for (const thing of shiftedPositions) {
                thing[0]--;
            }
            if (shiftedPositions.some(l => l[0] === -1)
                || shiftedPositions.some(l => grid[l[0]]?.[l[1]] === 1)) {
                    for (const position of shiftedPositions) {
                        if (grid[position[0] + 1]) {
                            grid[position[0] + 1][position[1]] = 1;
                        } else {
                            grid[position[0] + 1] = { [position[1]]: 1 };
                        }
                    }
                    break;
            }
        }
    }

    for (let i = 0; i < 2022; i++) {
        addRock(i % rocks.length);
    }

    return Math.max(...Object.keys(grid).map(Number)) + 1;
};

const part2 = (input: Input) => {
    let grid: Record<number, Record<number, number>> = {};
    let jetIdx = 0;

    const previousPairs: [number, number, number, number][] = [];
    const previousScores: number[] = [];
    let done = 0;

    const addRock = (rockIdx: number) => {
        const startingJetIdx = jetIdx % input.length;
        let highestGrid = Math.max(...Object.keys(grid).map(Number));
        if (highestGrid === -Infinity) highestGrid = -1;

        const rock = rocks[rockIdx];
        const newPositions: [number, number][] = [];
        for (let i = 0; i < rock.length; i++) {
            for (let j = 0; j < rock[i].length; j++) {
                if (rock[i][j] === 0) continue;
                newPositions.push([rock.length - i + 3 + highestGrid, j + 2]);
            }
        }

        let shiftedPositions: [number, number][] = newPositions;
        while (true) {
            const action = input[jetIdx++ % input.length];
            let potentialShift: [number, number][] = [];
            if (action === 1) {
                potentialShift = shiftedPositions.map(l => [l[0], l[1] + 1]);
            } else {
                potentialShift = shiftedPositions.map(l => [l[0], l[1] - 1]);
            }
            if (!potentialShift.some(l => l[1] < 0 || l[1] > 6) && !potentialShift.some(l => grid[l[0]]?.[l[1]] === 1)) {
                shiftedPositions = potentialShift;
            }
            for (const thing of shiftedPositions) {
                thing[0]--;
            }
            if (shiftedPositions.some(l => l[0] === -1)
                || shiftedPositions.some(l => grid[l[0]]?.[l[1]] === 1)) {
                    const leftmostIdx = Math.min(...shiftedPositions.map(l => l[1]));
                    if (previousPairs.some(l => l[0] === rockIdx && l[1] === startingJetIdx && l[2] === leftmostIdx) && shiftedPositions.map(l => l[0]).includes(highestGrid)) done++;
                    for (const position of shiftedPositions) {
                        if (grid[position[0] + 1]) {
                            grid[position[0] + 1][position[1]] = 1;
                        } else {
                            grid[position[0] + 1] = { [position[1]]: 1 };
                        }
                    }
                    const highest = Math.max(...shiftedPositions.map(l => l[0] + 1));
                    previousPairs.push([rockIdx, startingJetIdx, leftmostIdx, highest - Math.max(...Object.keys(grid).map(Number))]);
                    break;
            }
        }
    }

    let interval = 0;
    let repeatAmt = 0;
    let firstTime = 0;
    for (let i = 0; i < 10000; i++) {
        addRock(i % rocks.length);
        previousScores.push(Math.max(...Object.keys(grid).map(Number)));
        if (done >= 10) {
            const last = previousPairs[previousPairs.length - 1];
            firstTime = previousPairs.findIndex(l => l[0] === last[0] && l[1] === last[1] && l[2] === last[2] && l[3] === last[3]);
            interval = previousPairs.length - 1 - firstTime;
            repeatAmt = previousScores[previousScores.length - 1] - previousScores[firstTime];
            break;
        }
    }

    let total = Math.floor(1000000000000 / interval) * repeatAmt;
    let remaining = 1000000000000 - (Math.floor(1000000000000 / interval) * interval);

    return total + previousScores[remaining];
};

const main = async () => {
    const input = (await readInput(path.join(__dirname, "./input.txt"), InputMode.Raw)).split("").map(l => l === ">" ? 1 : -1);
    input.pop();

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
