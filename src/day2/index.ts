import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: [string, string][]) => {
    let sum = 0;
    for (const row of input) {
        if (row[1] === "X") sum++;
        if (row[1] === "Y") sum += 2;
        if (row[1] === "Z") sum += 3;
        if (row[1] === "X" && row[0] === "A") sum += 3;
        if (row[1] === "Y" && row[0] === "B") sum += 3;
        if (row[1] === "Z" && row[0] === "C") sum += 3;
        if (row[1] === "X" && row[0] === "C") sum += 6;
        if (row[1] === "Y" && row[0] === "A") sum += 6;
        if (row[1] === "Z" && row[0] === "B") sum += 6;
    }
    return sum;
};

const part2 = (input: [string, string][]) => {
    for (const row of input) {
        if (row[1] === "Y") {
            if (row[0] === "A") row[1] = "X";
            if (row[0] === "B") row[1] = "Y";
            if (row[0] === "C") row[1] = "Z";
        } else if (row[1] === "X") {
            if (row[0] === "A") row[1] = "Z";
            if (row[0] === "B") row[1] = "X";
            if (row[0] === "C") row[1] = "Y";
        } else if (row[1] === "Z") {
            if (row[0] === "A") row[1] = "Y";
            if (row[0] === "B") row[1] = "Z";
            if (row[0] === "C") row[1] = "X";
        }
    }
    console.log(input);
    return part1(input);
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed: [string, string][] = input.map(l => l.split(" ") as [string, string]);

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
