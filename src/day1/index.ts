import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: number[][]) => {
    return Math.max(...input.map(l => l.reduce((acc, cur) => acc + cur, 0)));
};

const part2 = (input: number[][]) => {
    const sorted = input.map(l => l.reduce((acc, cur) => acc + cur, 0)).sort((a, b) => b - a);
    return sorted[0] + sorted[1] + sorted[2];
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed: number[][] = [[]];

    for (const line of input) {
        if (line === "") {
            parsed.push([]);
        } else {
            parsed[parsed.length - 1].push(Number(line));
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
