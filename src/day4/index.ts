import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Input = [[number, number], [number, number]][]

const part1 = (input: Input) => {
    let sum = 0;
    for (const row of input) {
        if (row[0][0] <= row[1][0] && row[0][1] >= row[1][1]) {
            sum++;
        } else if (row[1][0] <= row[0][0] && row[1][1] >= row[0][1]) {
            sum++;
        }
    }
    return sum;
};

const part2 = (input: Input) => {
    let sum = input.length;
    for (const row of input) {
        if (row[0][1] < row[1][0]) {
            sum--;
        }
        if (row[0][0] > row[1][1]) {
            sum--;
        }
    }
    return sum;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed: Input = input.map(l => l.split(",").map(j => j.split("-").map(Number) as [number, number]) as Input[0]);

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
