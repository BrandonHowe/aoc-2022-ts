import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const interStrings = (s1: string, s2: string) => {
    for (const char of s1) {
        if (s2.includes(char)) {
            return char;
        }
    }
    return "";
}

const interStringsArr = (s1: string | string[], s2: string | string[]) => {
    const common: string[] = [];
    for (const char of s1) {
        if (s2.includes(char)) {
            common.push(char);
        }
    }
    return common;
}

const part1 = (input: [string, string][]) => {
    const common = input.map(l => interStrings(...l)).map(l => {
        if (l.toUpperCase() === l) {
            return l.charCodeAt(0) - 65 + 26 + 1;
        } else {
            return l.charCodeAt(0) - 97 + 1;
        }
    });
    return common.reduce((acc, cur) => acc + cur);
};

const part2 = (input: string[]) => {
    const grouped: string[][] = [];
    for (let i = 0; i < input.length; i++) {
        if (i % 3 === 0) {
            grouped.push([]);
        }
        grouped[grouped.length - 1].push(input[i]);
    }
    const mapped = grouped.map(l => interStringsArr(interStringsArr(l[0], l[1]), l[2])).map(l => l[0]).map(l => {
        if (l.toUpperCase() === l) {
            return l.charCodeAt(0) - 65 + 26 + 1;
        } else {
            return l.charCodeAt(0) - 97 + 1;
        }
    });
    return mapped.reduce((acc, cur) => acc + cur);
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    input.pop();
    const parsed = input.map(l => [l.slice(0, l.length / 2), l.slice(l.length / 2)]) as [string, string][];

    console.log(parsed);

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
